import { Schema, model, Document } from 'mongoose';

export interface IPost extends Document {
  title: string;
  slug: string;
  category_id: number;
  sub_category_id?: number | null;
  category_slug: string;
  sub_category_slug?: string | null;
  category_path: string[]; // Mảng Silo query: ["testing", "auto-testing"]
  summary: string;
  content: string;
  cover_image?: string;
  author_id: string;
  author_name: string;
  is_breaking: boolean;
  tags: string[];
  seo: {
    meta_title: string;
    meta_description: string;
    canonical_url?: string;
  };
  metrics: {
    views: number;
    likes: number;
    reading_time_minutes: number;
  };
  status: 'DRAFT' | 'IN_REVIEW' | 'PUBLISHED' | 'ARCHIVED';
  published_at?: Date;
  created_at: Date;
  updated_at: Date;
}

const PostSchema = new Schema<IPost>(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true, index: true },
    category_id: { type: Number, required: true, index: true },
    sub_category_id: { type: Number, default: null, index: true },
    category_slug: { type: String, required: true, index: true },
    sub_category_slug: { type: String, default: null, index: true },
    category_path: [{ type: String, index: true }],
    summary: { type: String, required: true },
    content: { type: String, required: true },
    cover_image: { type: String },
    author_id: { type: String, required: true },
    author_name: { type: String, required: true, default: 'Tech Passion Lead' },
    is_breaking: { type: Boolean, default: false, index: true },
    tags: [{ type: String, index: true }],
    seo: {
      meta_title: { type: String },
      meta_description: { type: String },
      canonical_url: { type: String },
    },
    metrics: {
      views: { type: Number, default: 0 },
      likes: { type: Number, default: 0 },
      reading_time_minutes: { type: Number, default: 5 },
    },
    status: {
      type: String,
      enum: ['DRAFT', 'IN_REVIEW', 'PUBLISHED', 'ARCHIVED'],
      default: 'PUBLISHED',
      index: true,
    },
    published_at: { type: Date, default: Date.now },
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);

export const PostModel = model<IPost>('Post', PostSchema);
