import moment from "moment";
import Doctor from "../models/Doctor.js";
import Schedule from "../models/Schedule.js";

export const createSchedule = async (req, res) => {
  try {
    const { doctorId, day, timeStart, timeFinish, quota, status, dateRange } =
      req.body;

    if (
      !doctorId ||
      !day ||
      !timeStart ||
      !timeFinish ||
      !quota ||
      typeof status !== "boolean" ||
      !dateRange
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const doctor = await Doctor.findById(doctorId);
    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    const [startString, endString] = dateRange.split(" - ");
    if (
      !startString ||
      !endString ||
      startString.trim() === "" ||
      endString.trim() === ""
    ) {
      return res.status(400).json({
        message:
          'Invalid dateRange format. Expected: "YYYY-MM-DD - YYYY-MM-DD"',
      });
    }

    const startDate = moment(startString, "YYYY-MM-DD", true);
    const endDate = moment(endString, "YYYY-MM-DD", true);

    if (!startDate.isValid() || !endDate.isValid()) {
      return res.status(400).json({
        message:
          'Invalid dateRange format. Expected: "YYYY-MM-DD - YYYY-MM-DD"',
      });
    }

    if (startDate.isAfter(endDate)) {
      return res
        .status(400)
        .json({ message: "Start date cannot be after end date" });
    }

    const schedules = [];
    let currentDate = moment(startDate);

    while (currentDate.isSameOrBefore(endDate)) {
      if (currentDate.format("dddd").toLowerCase() === day.toLowerCase()) {
        schedules.push({
          doctorId,
          day: day.toLowerCase(),
          timeStart,
          timeFinish,
          quota,
          status,
          date: currentDate.toDate(),
        });
      }
      currentDate.add(1, "day");
    }

    if (schedules.length === 0) {
      return res.status(400).json({
        message: `No ${day.toLowerCase()} found in the date range ${dateRange}`,
      });
    }

    const createdSchedules = await Schedule.insertMany(schedules);

    const formattedSchedules = createdSchedules.map((schedule) => ({
      id: schedule._id,
      doctorId: schedule.doctorId,
      day: schedule.day,
      timeStart: schedule.timeStart,
      timeFinish: schedule.timeFinish,
      quota: schedule.quota,
      status: schedule.status,
      date: moment(schedule.date).format("YYYY-MM-DD"),
    }));

    res.status(201).json({
      message: "Schedules created successfully",
      schedules: formattedSchedules,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getSchedules = async (req, res) => {
  try {
    const schedules = await Schedule.find().populate("doctorId", "name");

    const formattedSchedules = schedules.map((schedule) => ({
      id: schedule._id,
      doctor_id: schedule.doctorId._id,
      doctor_name: schedule.doctorId.name,
      day: schedule.day,
      time_start: schedule.timeStart,
      time_finish: schedule.timeFinish,
      quota: schedule.quota,
      status: schedule.status,
      date: moment(schedule.date).format("YYYY-MM-DD"),
    }));

    res.status(200).json({
      message: "Success",
      body: formattedSchedules,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
