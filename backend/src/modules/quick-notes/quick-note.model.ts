import { Schema, model, Document } from 'mongoose';

export interface IQuickNote extends Document {
  type: 'TRICK' | 'TIP';
  title: string;
  code_snippet?: string;
  language?: string;
  explanation: string;
  target_tool?: string;
  tags: string[];
  likes_count: number;
  created_at: Date;
}

const QuickNoteSchema = new Schema<IQuickNote>(
  {
    type: { type: String, enum: ['TRICK', 'TIP'], required: true, index: true },
    title: { type: String, required: true },
    code_snippet: { type: String },
    language: { type: String, default: 'bash' },
    explanation: { type: String, required: true },
    target_tool: { type: String, index: true },
    tags: [{ type: String }],
    likes_count: { type: Number, default: 0 },
  },
  { timestamps: { createdAt: 'created_at' } }
);

export const QuickNoteModel = model<IQuickNote>('QuickNote', QuickNoteSchema);
