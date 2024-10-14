import CholesterolReport from "../../models/IT22084668_Models/CholesterolReport.Model.js";

class CholesterolReportService {
    // Create a new cholesterol report
    async createReport(data) {
        const newReport = new CholesterolReport(data);
        return await newReport.save();
    }

    // Get the latest cholesterol report for a user
    async getLatestReport(userId) {
        return await CholesterolReport.findOne({ ID: userId })
            .sort({ createdAt: -1 })
            .limit(1);
    }

    // Delete a cholesterol report by ID
    async deleteReport(reportId) {
        return await CholesterolReport.findOneAndDelete({ _id: reportId });
    }

    // Update an existing cholesterol report by ID
    async updateReport(reportId, data) {
        return await CholesterolReport.findByIdAndUpdate(reportId, data, { new: true });
    }

    async getAllReportsById(reportId) {
        try {
            const reports = await CholesterolReport.find({ ID: reportId });
            return reports;
        } catch (error) {
            throw new Error('Error fetching reports: ' + error.message);
        }
    }

    async getAllReports() {
        try {
            const reports = await CholesterolReport.find(); // Fetch all reports
            return reports;
        } catch (error) {
            throw new Error('Error fetching all reports: ' + error.message);
        }
    }
}

export default new CholesterolReportService();
