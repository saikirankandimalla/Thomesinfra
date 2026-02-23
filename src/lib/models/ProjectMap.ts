import mongoose from "mongoose";

const ProjectMapSchema = new mongoose.Schema(
  {
    projectName: String,
    geojson: Object,          // from KML
    imageUrl: String          // uploaded layout image
  },
  { timestamps: true }
);

export default mongoose.models.ProjectMap ||
  mongoose.model("ProjectMap", ProjectMapSchema);
