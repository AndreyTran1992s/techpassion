import { Schema, model, Document } from 'mongoose';

export interface IEbook extends Document {
  title: string;
  slug: string;
  author: string;
  description: string;
  cover_image: string;
  pdf_stream_url: string;
  is_official_link: boolean;
  license_type: string;
  file_size: string;
  category_tag: string;
  download_count: number;
  created_at: Date;
}

const EbookSchema = new Schema<IEbook>(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    author: { type: String, required: true },
    description: { type: String, required: true },
    cover_image: { type: String, required: true },
    pdf_stream_url: { type: String, required: true },
    is_official_link: { type: Boolean, default: true },
    license_type: { type: String, default: 'Free Reference' },
    file_size: { type: String, default: '5 MB' },
    category_tag: { type: String, index: true },
    download_count: { type: Number, default: 0 },
  },
  { timestamps: { createdAt: 'created_at' } }
);

export const EbookModel = model<IEbook>('Ebook', EbookSchema);
