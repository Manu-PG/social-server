import mongoose, { Model } from 'mongoose';
import { Comment } from './interfaces';

interface CommentDocument extends Comment, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
}

const Schema = mongoose.Schema;

const commentSchema = new Schema<CommentDocument, Model<CommentDocument>>(
  {
    postId: { type: Schema.Types.ObjectId, ref: 'Post', required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    body: { type: String, minlength: 2, maxlength: 200 },
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

const commentModel = mongoose.model<CommentDocument>('Comments', commentSchema);
export default commentModel;
