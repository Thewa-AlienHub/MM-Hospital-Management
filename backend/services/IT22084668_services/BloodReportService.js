import BloodReport from "../../models/IT22084668_Models/BloodReport.Model.js";

class BloodReportService {
    // Create a new blood report
    async createReport(data) {
        const newReport = new BloodReport(data);
        return await newReport.save();
    }

    // Get all blood reports
    async getAllReports() {
        return await BloodReport.find();
    }

    // Get a blood report by custom ID
    async getReportById(customId) {
        return await BloodReport.findOne({ ID: customId });
    }

    async getAllReportsById(reportId) {
        try {
            const reports = await BloodReport.find({ ID: reportId });
            return reports;
        } catch (error) {
            throw new Error('Error fetching reports: ' + error.message);
        }
    }
}

export default new BloodReportService();
