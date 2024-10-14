import { Schema, model } from "mongoose";

const LabTestSchema = new Schema({
  patientId: {
    type: Schema.Types.ObjectId,
    ref: "Patient", // Reference to the Patient model
    required: true,
  },
  doctorId: {
    type: Schema.Types.ObjectId,
    ref: "Doctor", // Reference to the Doctor model
    required: true,
  },
  requestDate: {
    type: Date,
    default: Date.now,
  },
  tests: [
    {
      testType: {
        type: String,
        required: true,
      },
      priority: {
        type: String,
        enum: ["Urgent", "Normal", "Routine"],
        default: "Normal",
      },
    },
  ],
});

// Export the model
export default model("LabTest", LabTestSchema);
