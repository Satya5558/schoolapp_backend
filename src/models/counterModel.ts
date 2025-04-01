import mongoose from "mongoose";

const counterSchema = new mongoose.Schema({
  name: { type: String, unique: true, require: true },
  count: { type: Number, default: 0 },
});

const Counter = mongoose.model("Counter", counterSchema);

export default Counter;
