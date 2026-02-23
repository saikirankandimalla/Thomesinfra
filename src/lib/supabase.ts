import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Project = {
  google_embed_url: URL;
  id: string;
  name: string;
  slug: string;
  location: string;
  approval_type: string;
  status: string;
  total_plots: number;
  available_plots: number;
  price_per_sqyd: number;
  total_acres: number;
  description: string;
  amenities: string[];
  hero_image: string | null;
  layout_image: string | null;
  brochure_url: string | null;
  is_featured: boolean;
  created_at: string;
};

export type Plot = {
  id: string;
  project_id: string;
  plot_number: string;
  area_sqyds: number;
  facing: string;
  price: number;
  status: string;
  category: string;
  position_x: number;
  position_y: number;
};

export type Booking = {
  id: string;
  plot_id: string;
  customer_name: string;
  customer_phone: string;
  customer_email: string;
  status: string;
  admin_notes: string;
  created_at: string;
};

export type ProjectImage = {
  id: string;
  project_id: string;
  image_url: string;
  caption: string;
  display_order: number;
};

export type Inquiry = {
  id: string;
  name: string;
  phone: string;
  email: string;
  project_id: string | null;
  message: string;
  status: string;
  created_at: string;
};
