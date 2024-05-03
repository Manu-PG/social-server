import mongoose, { Model } from 'mongoose';
import { Post } from './interfaces';

interface PostDocument extends Post, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
}

const Schema = mongoose.Schema;

const postSchema = new Schema<PostDocument, Model<PostDocument>>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true, minlength: 2, maxlength: 20 },
    body: { type: String, required: true, minlength: 2, maxlength: 200 },
  },
  {
    timestamps: true,
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

const postModel = mongoose.model<PostDocument>('Post', postSchema);
export default postModel;
