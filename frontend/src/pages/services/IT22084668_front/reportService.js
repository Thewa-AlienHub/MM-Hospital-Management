const API_BASE_URL = '/api';

export const fetchAllBloodReports = async () => {
  try {
    const res = await fetch(`${API_BASE_URL}/bloodreport/getAllReports`);
    if (!res.ok) {
      throw new Error('Failed to fetch reports');
    }
    return await res.json();
  } catch (error) {
    console.error('Error fetching reports:', error);
    throw error; // Rethrow to handle it in the component
  }
};
export const fetchAllAngiographyReports = async () => {
  try {
    const res = await fetch(`${API_BASE_URL}/angiographyreport/All`);
    if (!res.ok) {
      throw new Error('Failed to fetch reports');
    }
    return await res.json();
  } catch (error) {
    console.error('Error fetching reports:', error);
    throw error; // Rethrow to handle it in the component
  }
};
export const fetchAllCholesterolReports = async () => {
  try {
    const res = await fetch(`${API_BASE_URL}/cholesterolreport/All`);
    if (!res.ok) {
      throw new Error('Failed to fetch reports');
    }
    return await res.json();
  } catch (error) {
    console.error('Error fetching reports:', error);
    throw error; // Rethrow to handle it in the component
  }
};
export const fetchAllBloodPressureReports = async () => {
  try {
    const res = await fetch(`${API_BASE_URL}/bloodpressurereport/All`);
    if (!res.ok) {
      throw new Error('Failed to fetch reports');
    }
    return await res.json();
  } catch (error) {
    console.error('Error fetching reports:', error);
    throw error; // Rethrow to handle it in the component
  }
};
export const fetchAllUrinalReports = async () => {
  try {
    const res = await fetch(`${API_BASE_URL}/urinalreport/All`);
    if (!res.ok) {
      throw new Error('Failed to fetch reports');
    }
    return await res.json();
  } catch (error) {
    console.error('Error fetching reports:', error);
    throw error; // Rethrow to handle it in the component
  }
};

export const fetchBloodReportById = async (id) => {
  try {
    const res = await fetch(`${API_BASE_URL}/bloodreport/getReportById/${id}`);
    if (!res.ok) {
      throw new Error('Failed to fetch report by ID');
    }
    return await res.json();
  } catch (error) {
    console.error('Error fetching report by ID:', error);
    throw error; // Rethrow to handle it in the component
  }
};

export const fetchAllUrinalReportsById = async (id) => {
  try {
    const res = await fetch(`${API_BASE_URL}/urinalreport/Allreports/${id}`);
    if (!res.ok) {
      throw new Error('Failed to fetch reports by ID');
    }
    return await res.json();
  } catch (error) {
    console.error('Error fetching reports by ID:', error);
    throw error; // Rethrow to handle it in the component
  }
};
export const fetchAllBloodReportsById = async (id) => {
  try {
    const res = await fetch(`${API_BASE_URL}/bloodreport/Allreports/${id}`);
    if (!res.ok) {
      throw new Error('Failed to fetch reports by ID');
    }
    return await res.json();
  } catch (error) {
    console.error('Error fetching reports by ID:', error);
    throw error; // Rethrow to handle it in the component
  }
};
export const fetchAllAngiographyReportsById = async (id) => {
  try {
    const res = await fetch(`${API_BASE_URL}/angiographyreport/Allreports/${id}`);
    if (!res.ok) {
      throw new Error('Failed to fetch reports by ID');
    }
    return await res.json();
  } catch (error) {
    console.error('Error fetching reports by ID:', error);
    throw error; // Rethrow to handle it in the component
  }
};
export const fetchAllCholesterolReportsById = async (id) => {
  try {
    const res = await fetch(`${API_BASE_URL}/cholesterolreport/Allreports/${id}`);
    if (!res.ok) {
      throw new Error('Failed to fetch reports by ID');
    }
    return await res.json();
  } catch (error) {
    console.error('Error fetching reports by ID:', error);
    throw error; // Rethrow to handle it in the component
  }
};
export const fetchAllBloodPressureReportsById = async (id) => {
  try {
    const res = await fetch(`${API_BASE_URL}/bloodpressurereport/Allreports/${id}`);
    if (!res.ok) {
      throw new Error('Failed to fetch reports by ID');
    }
    return await res.json();
  } catch (error) {
    console.error('Error fetching reports by ID:', error);
    throw error; // Rethrow to handle it in the component
  }
};
