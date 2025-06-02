import mongoose from "mongoose";

const scheduleSchema = new mongoose.Schema({
  doctorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Doctor",
    required: true,
  },
  day: {
    type: String,
    required: true,
  },
  timeStart: {
    type: String,
    required: true,
  },
  timeFinish: {
    type: String,
    required: true,
  },
  quota: {
    type: Number,
    required: true,
  },
  status: {
    type: Boolean,
    default: true,
  },
  date: {
    type: Date,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const Schedule = mongoose.model("Schedule", scheduleSchema);
export default Schedule;
