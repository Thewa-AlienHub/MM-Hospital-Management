import BloodReportService from "../../services/IT22084668_services/BloodReportService.js";

// Create a new blood report
export const CreateReport = async (req, res, next) => {
    const {
        ID,
        Name,
        hemoglobin,
        rbcCount,
        pcv,
        mcv,
        mch,
        mchc,
        rdw,
        wbcCount,
        neutrophils,
        lymphocytes,
        eosinophils,
        monocytes,
        basophils,
        absNeutrophils,
        absLymphocytes,
        absEosinophils,
        absMonocytes,
        absBasophils,
        platelets,
    } = req.body;

    try {
        const newBloodReport = await BloodReportService.createReport({
            ID,
            Name,
            hemoglobin,
            rbcCount,
            pcv,
            mcv,
            mch,
            mchc,
            rdw,
            wbcCount,
            neutrophils,
            lymphocytes,
            eosinophils,
            monocytes,
            basophils,
            absNeutrophils,
            absLymphocytes,
            absEosinophils,
            absMonocytes,
            absBasophils,
            platelets,
        });
        return res.status(201).json(newBloodReport);
    } catch (error) {
        next(error);
    }
};

// Get all blood reports
export const getAllReports = async (req, res, next) => {
    try {
        const bloodReports = await BloodReportService.getAllReports();
        return res.status(200).json(bloodReports);
    } catch (error) {
        next(error);
    }
};

// Get a blood report by ID
export const getReportById = async (req, res, next) => {
    const customId = req.params.id;

    try {
        const bloodReport = await BloodReportService.getReportById(customId);

        if (!bloodReport) {
            return res.status(404).json({ message: "Blood report not found" });
        }

        return res.status(200).json(bloodReport);
    } catch (error) {
        next(error);
    }
};

export const getAllReportsById = async (req, res) => {
    const { id } = req.params; // Assuming ID is passed as a URL parameter

    try {
        const reports = await BloodReportService.getAllReportsById(id); // Call the service method to get reports

        if (reports.length === 0) {
            return res.status(404).json({ message: 'No reports found for this ID.' });
        }

        res.status(200).json(reports); // Return the found reports
    } catch (error) {
        console.error('Error fetching reports by ID:', error);
        res.status(500).json({ message: 'Failed to fetch reports.' });
    }
};
