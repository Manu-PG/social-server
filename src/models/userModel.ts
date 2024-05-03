import mongoose, { Model } from 'mongoose';
import { Address, Company, Geo, User } from './interfaces';

interface UserDocument extends User, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
}

const Schema = mongoose.Schema;

const userSchema = new Schema<UserDocument, Model<UserDocument>>(
  {
    name: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    address: new Schema<Address, Model<Address>>({
      street: { type: String, required: true },
      suite: { type: String, required: true },
      city: { type: String, required: true },
      zipcode: { type: String, required: true },
      geo: new Schema<Geo, Model<Geo>>({
        lat: { type: String, required: true },
        lng: { type: String, required: true },
      }),
    }),
    phone: String,
    website: String,
    company: new Schema<Company, Model<Company>>({
      name: { type: String, required: true },
      catchPhrase: { type: String, required: true },
      bs: { type: String, required: true },
    }),
  },
  {
    timestamps: true,
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.address._id;
        delete ret.address.geo._id;
        delete ret.company._id;
        delete ret.__v;
      },
    },
  }
);

const userModel = mongoose.model<UserDocument>('User', userSchema);
export default userModel;
