const mongoose = require("mongoose");

const TechnologySchema = new mongoose.Schema({
    class: String,
    name: String,
});

const Technology = new mongoose.model("Technology", TechnologySchema);

module.exports = Technology;