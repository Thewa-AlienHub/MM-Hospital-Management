import BloodPressureReport from "../../models/IT22084668_Models/BloodPressureReport.Model.js";

class BloodPressureReportService {
    // Create a new blood pressure report
    async createReport(data) {
        const newReport = new BloodPressureReport(data);
        return await newReport.save();
    }

    // Get the latest blood pressure report for a user
    async getLatestReport(userId) {
        return await BloodPressureReport.findOne({ ID: userId })
            .sort({ createdAt: -1 })
            .exec();
    }

    // Update an existing blood pressure report by ID
    async updateReport(reportId, data) {
        return await BloodPressureReport.findOneAndUpdate(
            { _id: reportId }, 
            data, 
            { new: true }
        );
    }

    // Delete a blood pressure report by ID
    async deleteReport(reportId) {
        return await BloodPressureReport.findOneAndDelete({ _id: reportId });
    }

    async getAllReportsById(reportId) {
        try {
            const reports = await BloodPressureReport.find({ ID: reportId });
            return reports;
        } catch (error) {
            throw new Error('Error fetching reports: ' + error.message);
        }
    }

    async getAllReports() {
        try {
            const reports = await BloodPressureReport.find(); // Fetch all reports
            return reports;
        } catch (error) {
            throw new Error('Error fetching all reports: ' + error.message);
        }
    }
}

export default new BloodPressureReportService();
