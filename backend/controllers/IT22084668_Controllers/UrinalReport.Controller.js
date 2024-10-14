import UrinalReportService from "../../services/IT22084668_services/UrinalReportService.js";

// Create a new urinal report
export const CreateReport = async (req, res, next) => {
    const { ID, Name, color, PH, SpecificGravity, protein, Glucose, Ketones, LE, Nitrites, Bilirubin, Urobilinogen, RBC, WBC, Casts, Crystals, Bacteria, EC } = req.body;

    try {
        const newUrinalReport = await UrinalReportService.createReport({
            ID,
            Name,
            color,
            PH,
            SpecificGravity,
            protein,
            Glucose,
            Ketones,
            LE,
            Nitrites,
            Bilirubin,
            Urobilinogen,
            RBC,
            WBC,
            Casts,
            Crystals,
            Bacteria,
            EC,
        });
        return res.status(201).json(newUrinalReport);
    } catch (error) {
        next(error);
    }
};

// Get the latest urinal report
export const getLatestUrinalReport = async (req, res) => {
    const userId = req.params.id;

    try {
        const lastReport = await UrinalReportService.getLatestReport(userId);

        if (!lastReport) {
            return res.status(404).json({ message: 'No report found for the user.' });
        }

        res.json(lastReport);
    } catch (error) {
        console.error('Error fetching the last report:', error);
        res.status(500).json({ message: 'Failed to fetch the report.' });
    }
};

// Delete a urinal report
export const deleteUrinalReport = async (req, res, next) => {
    const { id } = req.params;

    try {
        const deletedUrinalReport = await UrinalReportService.deleteReport(id);

        if (deletedUrinalReport) {
            res.status(200).json({ message: 'Report deleted successfully' });
        } else {
            res.status(404).json({ message: 'Report not found' });
        }
    } catch (error) {
        next(error);
    }
};

// Update an existing urinal report
export const updateUrinalReport = async (req, res) => {
    const reportId = req.params.id;
    const { color, PH, SpecificGravity, protein, Glucose, Ketones, LE, Nitrites, Bilirubin, Urobilinogen, RBC, WBC, Casts, Crystals, Bacteria, EC } = req.body;

    try {
        const updatedReport = await UrinalReportService.updateReport(reportId, {
            color,
            PH,
            SpecificGravity,
            protein,
            Glucose,
            Ketones,
            LE,
            Nitrites,
            Bilirubin,
            Urobilinogen,
            RBC,
            WBC,
            Casts,
            Crystals,
            Bacteria,
            EC,
        });

        if (!updatedReport) {
            return res.status(404).json({ message: 'Urinal report not found.' });
        }

        res.status(200).json({
            message: 'Urinal report updated successfully!',
            updatedReport,
        });
    } catch (error) {
        console.error('Error updating report:', error);
        res.status(500).json({ message: 'Failed to update the urinal report.' });
    }
};

export const getAllReportsById = async (req, res) => {
    const { id } = req.params; // Assuming ID is passed as a URL parameter

    try {
        const reports = await UrinalReportService.getAllReportsById(id); // Call the service method to get reports

        if (reports.length === 0) {
            return res.status(404).json({ message: 'No reports found for this ID.' });
        }

        res.status(200).json(reports); // Return the found reports
    } catch (error) {
        console.error('Error fetching reports by ID:', error);
        res.status(500).json({ message: 'Failed to fetch reports.' });
    }
};

export const getAllUrinalReports = async (req, res) => {
    try {
        const reports = await UrinalReportService.getAllReports(); // Call the service method to get all reports

        if (reports.length === 0) {
            return res.status(404).json({ message: 'No reports found.' });
        }

        res.status(200).json(reports); // Return the found reports
    } catch (error) {
        console.error('Error fetching all reports:', error);
        res.status(500).json({ message: 'Failed to fetch all reports.' });
    }
};
