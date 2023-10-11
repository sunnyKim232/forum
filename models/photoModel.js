import { Schema, model, models } from "mongoose";

const photoSchema = new Schema({
  public_id: String,
  secure_url: String,
  author: String,
  createdDate: String,
  width: String,
  height: String,
});

const Photo = models.photos || model("photos", photoSchema);

export default Photo;
