import BloodPressureReportService from "../../services/IT22084668_services/BloodPressureReportService.js";

// Create a new blood pressure report
export const CreateReport = async (req, res, next) => {
    const { ID, Name, Systolic, Diastolic } = req.body;

    try {
        const savedReport = await BloodPressureReportService.createReport({
            ID,
            Name,
            Systolic,
            Diastolic,
        });
        return res.status(201).json({
            message: 'Report created successfully',
            report: savedReport, // Include the created report in the response
        });
    } catch (error) {
        next(error);
    }
};

// Get the latest blood pressure report for a user
export const getLatestReport = async (req, res, next) => {
    const { ID } = req.params;

    try {
        const latestReport = await BloodPressureReportService.getLatestReport(ID);
        if (latestReport) {
            res.status(200).json(latestReport);
        } else {
            res.status(404).json({ message: 'No report found for this ID' });
        }
    } catch (error) {
        next(error);
    }
};

// Update an existing blood pressure report
// Update an existing blood pressure report
export const updateReport = async (req, res, next) => {
    const { ID } = req.params; // Ensure this matches the MongoDB _id if using _id for updates
    const { Systolic, Diastolic } = req.body;

    try {
        const updatedReport = await BloodPressureReportService.updateReport(ID, {
            Systolic,
            Diastolic,
        });

        if (updatedReport) {
            res.status(200).json({
                message: 'Report updated successfully',
                report: updatedReport, // Include the updated report in the response
            });
        } else {
            res.status(404).json({ message: 'Report not found' });
        }
    } catch (error) {
        console.error('Error updating report:', error); // Log the error
        next(error);
    }
};

// Delete a blood pressure report
export const deleteReport = async (req, res, next) => {
    const { ID } = req.params;

    try {
        const deletedReport = await BloodPressureReportService.deleteReport(ID);
        if (deletedReport) {
            res.status(200).json({ message: 'Report deleted successfully' });
        } else {
            res.status(404).json({ message: 'Report not found' });
        }
    } catch (error) {
        console.error('Error deleting report:', error); // Log the error
        next(error);
    }
};


// Get all reports by user ID
export const getAllReportsById = async (req, res) => {
    const { id } = req.params;

    try {
        const reports = await BloodPressureReportService.getAllReportsById(id);

        if (reports.length === 0) {
            return res.status(404).json({ message: 'No reports found for this ID.' });
        }

        res.status(200).json(reports);
    } catch (error) {
        console.error('Error fetching reports by ID:', error);
        res.status(500).json({ message: 'Failed to fetch reports.' });
    }
};

// Get all blood pressure reports
export const getAllBloodPressurReports = async (req, res) => {
    try {
        const reports = await BloodPressureReportService.getAllReports();

        if (reports.length === 0) {
            return res.status(404).json({ message: 'No reports found.' });
        }

        res.status(200).json(reports);
    } catch (error) {
        console.error('Error fetching all reports:', error);
        res.status(500).json({ message: 'Failed to fetch all reports.' });
    }
};
