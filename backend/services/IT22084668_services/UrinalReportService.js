import UrinalReport from "../../models/IT22084668_Models/UrinalReport.Model.js";

class UrinalReportService {
    // Create a new urinal report
    async createReport(data) {
        const newReport = new UrinalReport(data);
        return await newReport.save();
    }

    // Get the latest urinal report for a user
    async getLatestReport(userId) {
        return await UrinalReport.findOne({ ID: userId })
            .sort({ createdAt: -1 })
            .exec();
    }

    // Update an existing urinal report by ID
    async updateReport(reportId, data) {
        return await UrinalReport.findByIdAndUpdate(
            reportId,
            data,
            { new: true }
        );
    }

    // Delete a urinal report by ID
    async deleteReport(reportId) {
        return await UrinalReport.findOneAndDelete({ _id: reportId });
    }

    // Get all urinal reports (optional, if needed)
    async getAllReports() {
        return await UrinalReport.find();
    }

    // Get a report by ID (optional, if needed)
    async getReportById(id) {
        return await UrinalReport.findOne({ ID: id });
    }
    async getAllReportsById(reportId) {
        try {
            const reports = await UrinalReport.find({ ID: reportId });
            return reports;
        } catch (error) {
            throw new Error('Error fetching reports: ' + error.message);
        }
    }

    async getAllReports() {
        try {
            const reports = await UrinalReport.find(); // Fetch all reports
            return reports;
        } catch (error) {
            throw new Error('Error fetching all reports: ' + error.message);
        }
    }
}

export default new UrinalReportService();
