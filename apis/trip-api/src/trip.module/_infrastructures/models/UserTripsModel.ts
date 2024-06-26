import mongoose, { Model, Document } from "mongoose";
import { IUserTripsModel } from "./IUserTripsModel";

const Schema = mongoose.Schema;

export interface IUserTripsDocument extends IUserTripsModel, Document {}

//schema definition, similar to db model
const TripsSchema = new Schema({
  tripId: String,
  name: String,
  fromDate: Date,
  toDate: Date,
  locationImages: [
    {
      name: String,
      address: String,
      imageUrl: String,
      description: String,
    },
  ],
  isDeleted: Boolean,
  isPublic: Boolean,
  createdDate: Date,
});

export const UserTripsSchema = new Schema({
  userId: String,
  trips: [TripsSchema],
});
