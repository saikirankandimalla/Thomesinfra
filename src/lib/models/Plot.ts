import mongoose, { Schema, Document } from "mongoose";

export interface IPlot extends Document {
  project_id: mongoose.Types.ObjectId;
  plot_number: string;
  area_sqyds: number;
  facing: string;
  price: number;
  category: string;
  status: "available" | "sold" | "partially_sold" | "registered" | "pending";
  position_x: number;
  position_y: number;
  path_data?: string;
  vertices?: { x: number; y: number }[];
  createdAt: Date;
  updatedAt: Date;
}

const PlotSchema: Schema = new Schema(
  {
    project_id: { type: Schema.Types.ObjectId, ref: "Project", required: true },
    plot_number: { type: String, required: true },
    area_sqyds: { type: Number },
    facing: { type: String },
    price: { type: Number },
    category: { type: String },
    status: { 
      type: String, 
      enum: ["available", "sold", "partially_sold", "registered", "pending"],
      default: "available" 
    },
    position_x: { type: Number },
    position_y: { type: Number },
    path_data: { type: String },
    vertices: [{ x: Number, y: Number }],
  },
  { timestamps: true }
);

export default mongoose.models.Plot || mongoose.model<IPlot>("Plot", PlotSchema);
