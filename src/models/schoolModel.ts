import mongoose from "mongoose";
import { ISchool } from "../types/ISchool";
import Counter from "./counterModel";

const schoolSchema = new mongoose.Schema<ISchool>(
  {
    school_unique_id: { type: String, unique: true, require: true },
    name: { type: String, require: false },
    email: { type: String, unique: true, require: true },
    password: { type: String },
    address: { type: String },
    city: String,
    state: String,
    country: String,
    postal_code: String,
    phone_number: String,
    website: String,
    logo_original_name: String,
    createdAt: Date,
    updatedAt: Date,
    storage_logo_name: {
      type: String,
    },
  },
  {
    timestamps: true,
    methods: {
      getUniqueSchoolId: async function () {
        let updatedSchoolCount = await Counter.findOneAndUpdate(
          { name: "school" },
          { $inc: { count: 1 } },
          { new: true, upsert: true }
        );

        //Padding with Zeros
        const incrementedSchoolNum = updatedSchoolCount.count
          .toString()
          .padStart(4, "0");

        return incrementedSchoolNum;
      },
    },
  }
);

schoolSchema.methods.checkPassword = async function (
  password: string,
  dbPassword: string
) {
  //return await bcrypt.compare(password, dbPassword);

  return password.trim() === dbPassword.trim();
};

//Transforming the data to JSON
schoolSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: (doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
    return ret;
  },
});

// Alternatively, if you're converting to plain JavaScript objects:
schoolSchema.set("toObject", {
  virtuals: true,
  versionKey: false,
  transform: (doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
    return ret;
  },
});

//Converting file storage name to URL
schoolSchema.virtual("logo_url").get(function () {
  return this.storage_logo_name
    ? `${process.env.BASE_URL}/${this.storage_logo_name}`
    : null;
});

//Schema Middleware
schoolSchema.pre("save", async function (next) {
  if (!this.school_unique_id) {
    this.school_unique_id = `SKL-${await this.getUniqueSchoolId()}`;
  }
  next();
});

// schoolSchema.pre("update", async function (next) {
//   if (!this.school_unique_id) {
//     this.school_unique_id = `SKL-${await this.getUniqueSchoolId()}`;
//   }
//   next();
// });

const School = mongoose.model<ISchool>("School", schoolSchema);

export default School;
