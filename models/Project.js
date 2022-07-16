const mongoose = require("mongoose");
const { Schema } = mongoose;

const projectSchema = new Schema({
    key: String,
    name: { type: String },
    shortDescription: { type: String },
    demoUrl: { type: String },
    githubUrl: { type: String },
    imgSrc: { type: String },
    modalType: { type: String },
    modalPath: { type: String },
    category: [{ type: Schema.Types.ObjectId, ref: 'Category', default: "" }],
    technologies: [{ type: Schema.Types.ObjectId, ref: 'Category', default: [] }],
});

const Project = new mongoose.model("Project", projectSchema);

module.exports = Project;