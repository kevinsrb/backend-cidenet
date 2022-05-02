import { Schema, model } from 'mongoose'

const employeeSchema = new Schema(
  {
    name: { type: String, required: true },
    otherNames: { type: String, required: false },
    firtsLastName: { type: String, required: true },
    secondLastName: { type: String, required: false },
    country: { type: String, required: true },
    document: { type: String, required: true },
    documentType: { type: String, required: true },
    email: { type: String, required: false },
    admissionDate: { type: String, required: true },
    area: { type: String, required: true },
    status: { type: String, required: false },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = model("Employee", employeeSchema, "employee");
