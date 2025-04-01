import mongoose from "mongoose";
import { Gender, Status } from "../types/Enums";
import { IStudent } from "../types/IStudent";

const studentSchema = new mongoose.Schema<IStudent>(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      enum: Gender,
      required: true,
    },
    dateOfBirth: {
      type: Date,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    enrollmentDate: {
      type: Date,
      required: true,
    },
    enrollmentStatus: {
      type: String,
      enum: Status,
      default: Status.Active,
    },
    school: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "School",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

studentSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform(doc, record) {
    record.id = record._id;
    delete record._id;
    return record;
  },
});

const Student = mongoose.model<IStudent>("Student", studentSchema);

export default Student;
