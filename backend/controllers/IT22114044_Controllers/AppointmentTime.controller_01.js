import AppointmentTime from "../../models/IT22114044_Models/AppointmentTime.model_01.js";


//get all data
export const getAppointments = async (req,res, next) => {
    try{
        const appointmentTime = await AppointmentTime.find();
        res.status(200).send(appointmentTime);
        
    } catch (error) {
        next(error);
    }
}

export const getAppointmentsByHour = async (req, res, next) => {
    const { selectedDate } = req.query; // Get the selected date from query params

    try {
      const appointmentTimes = await AppointmentTime.aggregate([
        {
          $match: {
            AppointmentDate: selectedDate, // Filter by the selected date
          },
        },
        {
          $project: {
            hour: { $hour: "$AppointmentTime" }, // Extract the hour from the appointment time
          },
        },
        {
          $group: {
            _id: "$hour",  // Group by hour
            count: { $sum: 1 }, // Count how many appointments per hour
          },
        },
        {
          $sort: { _id: 1 }, // Sort by hour in ascending order
        },
      ]);
  
      res.status(200).send(appointmentTimes);
    } catch (error) {
      next(error);
    }
};
