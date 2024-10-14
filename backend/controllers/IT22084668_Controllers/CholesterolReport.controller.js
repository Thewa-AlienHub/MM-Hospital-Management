import CholesterolReportService from "../../services/IT22084668_services/CholesterolReportService.js";

// Create a new cholesterol report
export const CreateReport = async (req, res, next) => {
    const { ID, Name, totalCholesterol, hdl, ldl, triglycerides, vldl } = req.body;

    try {
        const newCholesterolReport = await CholesterolReportService.createReport({
            ID,
            Name,
            totalCholesterol,
            hdl,
            ldl,
            triglycerides,
            vldl,
        });
        return res.status(201).json(newCholesterolReport);
    } catch (error) {
        next(error);
    }
};

// Get the latest cholesterol report
export const getLatestCholesterolReport = async (req, res) => {
    const userId = req.params.id;

    try {
        const lastReport = await CholesterolReportService.getLatestReport(userId);

        if (!lastReport) {
            return res.status(404).json({ message: 'No report found for the user.' });
        }

        res.json(lastReport);
    } catch (error) {
        console.error('Error fetching the last report:', error);
        res.status(500).json({ message: 'Failed to fetch the report.' });
    }
};

// Delete a cholesterol report
export const deleteCholesterolReport = async (req, res, next) => {
    const { id } = req.params;

    try {
        const deletedCholesterolReport = await CholesterolReportService.deleteReport(id);

        if (deletedCholesterolReport) {
            res.status(200).json({ message: 'Report deleted successfully' });
        } else {
            res.status(404).json({ message: 'Report not found' });
        }
    } catch (error) {
        next(error);
    }
};

// Update an existing cholesterol report
export const updateCholesterolReport = async (req, res) => {
    const reportId = req.params.id;
    const { totalCholesterol, hdl, ldl, triglycerides, vldl } = req.body;

    try {
        const updatedReport = await CholesterolReportService.updateReport(reportId, {
            totalCholesterol,
            hdl,
            ldl,
            triglycerides,
            vldl,
        });

        if (!updatedReport) {
            return res.status(404).json({ message: 'Cholesterol report not found.' });
        }

        res.status(200).json({
            message: 'Cholesterol report updated successfully!',
            updatedReport,
        });
    } catch (error) {
        console.error('Error updating report:', error);
        res.status(500).json({ message: 'Failed to update the cholesterol report.' });
    }
};


export const getAllReportsById = async (req, res) => {
    const { id } = req.params; // Assuming ID is passed as a URL parameter

    try {
        const reports = await CholesterolReportService.getAllReportsById(id); // Call the service method to get reports

        if (reports.length === 0) {
            return res.status(404).json({ message: 'No reports found for this ID.' });
        }

        res.status(200).json(reports); // Return the found reports
    } catch (error) {
        console.error('Error fetching reports by ID:', error);
        res.status(500).json({ message: 'Failed to fetch reports.' });
    }
};

export const getAllCholesterolReports = async (req, res) => {
    try {
        const reports = await CholesterolReportService.getAllReports(); // Call the service method to get all reports

        if (reports.length === 0) {
            return res.status(404).json({ message: 'No reports found.' });
        }

        res.status(200).json(reports); // Return the found reports
    } catch (error) {
        console.error('Error fetching all reports:', error);
        res.status(500).json({ message: 'Failed to fetch all reports.' });
    }
};