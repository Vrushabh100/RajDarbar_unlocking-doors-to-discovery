const listing = require("../models/listing");

// Renders the main index page, handling search and category filtering.
module.exports.index = async (req, res) => {
    // Destructure category and search query from the request URL.
    const { category, q: searchQuery } = req.query;
    let allListings;

    if (category) {
        // Scenario 1: If a category is selected, find all listings matching it.
        allListings = await listing.find({ category: category });

    } else if (searchQuery && searchQuery.trim() !== "") {
        // Scenario 2: If a text search is performed.
        // Find all listings where the search query matches the title, location, or country.
        // The search is case-insensitive ($options: "i").
        const matchedListings = await listing.find({
            $or: [
                { title: { $regex: searchQuery, $options: "i" } },
                { location: { $regex: searchQuery, $options: "i" } },
                { country: { $regex: searchQuery, $options: "i" } }
            ]
        });

        // If no listings match the search, flash an error and redirect.
        if (matchedListings.length === 0) {
            req.flash("error", "No listings found for your search!");
            return res.redirect("/listings");
        }

        // To display matched results first, get their IDs.
        const matchedIds = matchedListings.map(l => l._id);
        // Find all other listings by excluding the matched ones.
        const otherListings = await listing.find({ _id: { $nin: matchedIds } });
        // Combine the arrays, placing the matched listings at the top.
        allListings = [...matchedListings, ...otherListings];

    } else {
        // Scenario 3: If no category or search, fetch all listings.
        allListings = await listing.find({});
    }

    res.render("./listings/index.ejs", { alllisting: allListings });
};

// Renders the form to create a new listing.
module.exports.rendernewform = (req, res) => {
    res.render("./listings/newlisting.ejs");
};

// Displays the details for a single listing.
module.exports.showlistings = async (req, res) => {
    let { id } = req.params;
    // Find the listing by its ID and populate related data.
    // This fetches the full review documents and the listing's owner document.
    // It also performs a nested populate to get the author of each review.
    const listingg = await listing.findById(id)
        .populate({
            path: "reviews",
            populate: {
                path: "author",
            },
        })
        .populate("owner");

    // If no listing is found, flash an error and redirect.
    if (!listingg) {
        req.flash("error", "The listing you requested does not exist!");
        return res.redirect("/listings");
    }
    res.render("./listings/show.ejs", { listingg });
};

// Handles the creation of a new listing.
module.exports.createnewlisting = async (req, res) => {
    // Use the OpenCage Geocoding API to convert the location into coordinates.
    const apiKey = process.env.OPENCAGE_API_KEY;
    const location = req.body.listing.location;
    const geocodingUrl = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(location)}&key=${apiKey}`;
    const response = await fetch(geocodingUrl);
    const data = await response.json();

    const updatelist = new listing(req.body.listing);

    // If geocoding is successful, save the coordinates.
    if (data.results && data.results.length > 0) {
        const { lng, lat } = data.results[0].geometry;
        updatelist.geometry = { type: 'Point', coordinates: [lng, lat] };
    } else {
        // Handle cases where the location cannot be found.
        req.flash('error', 'Location could not be found. Please enter a valid address.');
        return res.redirect('/listings/new');
    }

    // Assign the currently logged-in user as the owner of the new listing.
    updatelist.owner = req.user._id;
    // Add the image URL and filename from the Cloudinary upload.
    updatelist.image = { url: req.file.path, filename: req.file.filename };

    await updatelist.save();
    req.flash("success", "New Listing Created!");
    res.redirect("/listings");
};

// Renders the form to edit an existing listing.
module.exports.editlisting = async (req, res) => {
    const { id } = req.params;
    const listingg = await listing.findById(id);

    // If the listing to be edited doesn't exist, handle the error.
    if (!listingg) {
        req.flash("error", "The listing you requested to edit does not exist!");
        return res.redirect("/listings");
    }
    
    // Create a modified image URL for a smaller preview image in the edit form.
    // This uses Cloudinary's transformation feature to set the width to 250px.
    let orgimg = listingg.image.url;
    orgimg = orgimg.replace("/upload", "/upload/w_250");
    res.render("./listings/updateuser.ejs", { listingg, orgimg });
};

// Handles the update of an existing listing.
module.exports.editedlisting = async (req, res) => {
    let { id } = req.params;
    
    // Start with the text data from the form.
    const updateData = { ...req.body.listing };

    // If a new file was uploaded, add the new image data to the update object.
    // Otherwise, the original image will be kept.
    if (req.file) {
        updateData.image = {
            url: req.file.path,
            filename: req.file.filename
        };
    }

    // Find the listing by ID and update it with the new data.
    // 'runValidators: true' ensures Mongoose schema rules are applied on update.
    await listing.findByIdAndUpdate(id, updateData, { runValidators: true });
    req.flash("success", "Listing Updated!");
    res.redirect(`/listings/${id}`);
};

// Handles the deletion of a listing.
module.exports.deletelisting = async (req, res) => {
    let { id } = req.params;
    await listing.findByIdAndDelete(id);
    req.flash("success", "Listing Deleted!");
    res.redirect("/listings");
};
