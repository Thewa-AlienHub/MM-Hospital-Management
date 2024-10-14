import AngiographyReportService from "../../services/IT22084668_services/AngiographyReportService.js";

// Create a new angiography report
export const CreateReport = async (req, res, next) => {
    const { ID, Name, PAB, BVD, BFV, FFR, BPA, EF, Aneurysm } = req.body;

    try {
        const savedReport = await AngiographyReportService.createReport({
            ID,
            Name,
            PAB,
            BVD,
            BFV,
            FFR,
            BPA,
            EF,
            Aneurysm,
        });
        return res.status(201).json(savedReport);
    } catch (error) {
        next(error); // Pass error to the next middleware
    }
};

// Get the latest angiography report for a user
export const getLatestAngiographyReport = async (req, res) => {
    const userId = req.params.id;

    try {
        const lastReport = await AngiographyReportService.getLatestReport(userId);

        if (!lastReport) {
            return res.status(404).json({ message: 'No report found for the user.' });
        }

        res.json(lastReport);
    } catch (error) {
        console.error('Error fetching the last report:', error);
        res.status(500).json({ message: 'Failed to fetch the report.' });
    }
};

// Delete an angiography report
export const deleteAngiographyReport = async (req, res, next) => {
    const { id } = req.params;

    try {
        const deletedAngiographyReport = await AngiographyReportService.deleteReport(id);

        if (deletedAngiographyReport) {
            res.status(200).json({ message: 'Report deleted successfully' });
        } else {
            res.status(404).json({ message: 'Report not found' });
        }
    } catch (error) {
        next(error);
    }
};

// Edit/Update an existing angiography report
export const updateAngiographyReport = async (req, res) => {
    const reportId = req.params.id;
    const { PAB, BVD, BFV, FFR, BPA, EF, Aneurysm } = req.body;

    try {
        const updatedReport = await AngiographyReportService.updateReport(reportId, {
            PAB,
            BVD,
            BFV,
            FFR,
            BPA,
            EF,
            Aneurysm,
        });

        if (!updatedReport) {
            return res.status(404).json({ message: 'Angiography report not found.' });
        }

        res.status(200).json({
            message: 'Angiography report updated successfully!',
            updatedReport,
        });
    } catch (error) {
        console.error('Error updating report:', error);
        res.status(500).json({ message: 'Failed to update the Angiography report.' });
    }
};

export const getAllReportsById = async (req, res) => {
    const { id } = req.params; // Assuming ID is passed as a URL parameter

    try {
        const reports = await AngiographyReportService.getAllReportsById(id); // Call the service method to get reports

        if (reports.length === 0) {
            return res.status(404).json({ message: 'No reports found for this ID.' });
        }

        res.status(200).json(reports); // Return the found reports
    } catch (error) {
        console.error('Error fetching reports by ID:', error);
        res.status(500).json({ message: 'Failed to fetch reports.' });
    }
};
export const getAllAngiographyReports = async (req, res) => {
    try {
        const reports = await AngiographyReportService.getAllReports(); // Call the service method to get all reports

        if (reports.length === 0) {
            return res.status(404).json({ message: 'No reports found.' });
        }

        res.status(200).json(reports); // Return the found reports
    } catch (error) {
        console.error('Error fetching all reports:', error);
        res.status(500).json({ message: 'Failed to fetch all reports.' });
    }
};