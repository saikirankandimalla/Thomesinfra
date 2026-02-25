import mongoose, { Schema, Document } from "mongoose";

export interface IProject extends Document {
  name: string;
  slug: string;
  description: string;
  location: string;
  price_per_sqyd: number;
  total_plots: number;
  available_plots: number;
  status: "ongoing" | "completed";
  approval_type: string;
  is_featured: boolean;
  hero_image?: string;
  amenities: string[];
  proximity: { label: string; value: string }[];
  layout_image?: string;
  createdAt: Date;
  updatedAt: Date;
  google_embed_url: string;
  Highlights: string[];
  Totalacres: number;
  gallery_images: { label: string; value: string }[];
  commercial_plots:number;
  residential_plots:number;
  WhychooseUs: string;
  WhychooseUspoints: string [];
  
}

const ProjectSchema: Schema = new Schema(
  {
    name: { type: String, required: true },

    slug: { type: String, required: true, unique: true },

    description: { type: String },

    location: { type: String, required: true },

    price_per_sqyd: { type: Number },

    total_plots: { type: Number },

    available_plots: { type: Number },

    status: {
      type: String,
      enum: ["ongoing", "completed"],
      default: "ongoing",
    },

    approval_type: { type: String },

    is_featured: {
      type: Boolean,
      default: false,
    },

    hero_image: { type: String },

    layout_image: { type: String },

    google_embed_url: { type: String },

    // ───────── EXISTING ARRAYS ─────────
    amenities: [{ type: String }],

    proximity: [
      {
        label: { type: String },
        value: { type: String },
      },
    ],

    Highlights: [{ type: String }],

    gallery_images: [
      {
        label: { type: String },
        value: { type: String },
      },
    ],

    // ───────── NEW FIELDS ADDED ─────────

    youtube_videos: [
      {
        type: String,
      },
    ],

    brochure_url: {
      type: String,
    },

    commercial_plots: {
      type: Number,
    },

    residential_plots: {
      type: Number,
    },

    WhychooseUs: {
      type: String,
    },

    WhychooseUspoints: [
      {
        type: String,
      },
    ],

    // modern version of Totalacres (recommended)
    

    // keep old field for compatibility
    Totalacres: {
      type: Number,
    },

    // easier gallery format for frontend
   
  },

  {
    timestamps: true,
  }
);

export default mongoose.models.Project || mongoose.model<IProject>("Project", ProjectSchema);
