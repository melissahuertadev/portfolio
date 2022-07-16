const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema({
    class: String,
    name: String,
});

const Category = new mongoose.model("Category", CategorySchema);

module.exports = Category;