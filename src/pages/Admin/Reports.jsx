// src/pages/Admin/Reports.js
import  { useState, useEffect } from 'react';
import { generateReport } from '../../services/taskService';

function Reports() {
  const [reportData, setReportData] = useState(null);

  useEffect(() => {
    const fetchReport = async () => {
      const data = await generateReport();
      setReportData(data);
    };
    fetchReport();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Reports</h1>
      {reportData ? (
        <div className="bg-white shadow-md rounded p-4">
          <h2 className="text-xl font-semibold mb-2">Summary</h2>
          <p>Total Volunteers: {reportData.totalVolunteers}</p>
          <p>Total Hours Logged: {reportData.totalHours}</p>
          <p>Total Tasks Completed: {reportData.totalTasksCompleted}</p>
        </div>
      ) : (
        <p>Loading report data...</p>
      )}
    </div>
  );
}

export default Reports;

