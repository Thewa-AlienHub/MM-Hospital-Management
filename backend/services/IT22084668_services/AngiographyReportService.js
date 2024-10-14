import AngiographyReport from "../../models/IT22084668_Models/AngiographyReport.Model.js";

class AngiographyReportService {
    // Create a new angiography report
    async createReport(data) {
        const newReport = new AngiographyReport(data);
        return await newReport.save();
    }

    // Get the latest angiography report for a user
    async getLatestReport(userId) {
        return await AngiographyReport.findOne({ ID: userId })
            .sort({ createdAt: -1 })
            .exec();
    }

    // Update an existing angiography report by ID
    async updateReport(reportId, data) {
        return await AngiographyReport.findByIdAndUpdate(
            reportId,
            data,
            { new: true }
        );
    }

    // Delete an angiography report by ID
    async deleteReport(reportId) {
        return await AngiographyReport.findByIdAndDelete(reportId);
    }

    async getAllReportsById(reportId) {
        try {
            const reports = await AngiographyReport.find({ ID: reportId });
            return reports;
        } catch (error) {
            throw new Error('Error fetching reports: ' + error.message);
        }
    }

    async getAllReports() {
        try {
            const reports = await AngiographyReport.find(); // Fetch all reports
            return reports;
        } catch (error) {
            throw new Error('Error fetching all reports: ' + error.message);
        }
    }
    
}

export default new AngiographyReportService();
