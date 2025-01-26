import { useState } from "react";

// Sample data for logs
const volunteerLogs = [
  {
    id: 1,
    date: "2025-01-10",
    task: "Tree Plantation",
    volunteer: "John Doe",
    hours: 5,
  },
  {
    id: 2,
    date: "2025-01-15",
    task: "Beach Cleanup",
    volunteer: "Jane Smith",
    hours: 3,
  },
  {
    id: 3,
    date: "2025-01-18",
    task: "Food Donation",
    volunteer: "John Doe",
    hours: 4,
  },
  // Add more sample logs as needed
];

function VolunteerLogViewer() {
  const [logs] = useState(volunteerLogs);
  const [filter, setFilter] = useState({
    date: "",
    task: "",
    volunteer: "",
  });

  // Filter logs based on input fields
  const filteredLogs = logs.filter((log) => {
    return (
      (filter.date ? log.date.includes(filter.date) : true) &&
      (filter.task
        ? log.task.toLowerCase().includes(filter.task.toLowerCase())
        : true) &&
      (filter.volunteer
        ? log.volunteer.toLowerCase().includes(filter.volunteer.toLowerCase())
        : true)
    );
  });

  // Generate report of total hours logged
  const totalHours = filteredLogs.reduce((total, log) => total + log.hours, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-800 to-blue-900 p-4 md:p-8 text-white">
      <div className="max-w-7xl mx-auto">
        <header className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-4xl font-extrabold text-white mb-2">
              Volunteer Activity Logs
            </h1>
            <p className="text-indigo-200">Track volunteer hours and activities</p>
          </div>
        </header>

        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 mb-6">
          {/* Filter Inputs */}
          <div className="flex space-x-4 mb-4">
            <input
              type="date"
              value={filter.date}
              onChange={(e) => setFilter({ ...filter, date: e.target.value })}
              className="border px-4 py-2 rounded-lg bg-white/10 text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Filter by date"
            />
            <input
              type="text"
              value={filter.task}
              onChange={(e) => setFilter({ ...filter, task: e.target.value })}
              className="border px-4 py-2 rounded-lg bg-white/10 text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Filter by task"
            />
            <input
              type="text"
              value={filter.volunteer}
              onChange={(e) => setFilter({ ...filter, volunteer: e.target.value })}
              className="border px-4 py-2 rounded-lg bg-white/10 text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Filter by volunteer"
            />
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 mb-6">
          {/* Logs Table */}
          <table className="table-auto w-full border-collapse border text-white">
            <thead>
              <tr>
                <th className="border px-4 py-2">Date</th>
                <th className="border px-4 py-2">Task</th>
                <th className="border px-4 py-2">Volunteer</th>
                <th className="border px-4 py-2">Hours</th>
              </tr>
            </thead>
            <tbody>
              {filteredLogs.length > 0 ? (
                filteredLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-white/10 transition-all">
                    <td className="border px-4 py-2">{log.date}</td>
                    <td className="border px-4 py-2">{log.task}</td>
                    <td className="border px-4 py-2">{log.volunteer}</td>
                    <td className="border px-4 py-2">{log.hours}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center border px-4 py-2">
                    No matching logs found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Report */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6">
          <h2 className="text-xl font-semibold mb-4">Report</h2>
          <p className="text-lg">Total Hours Logged: {totalHours}</p>
        </div>
      </div>
    </div>
  );
}

export default VolunteerLogViewer;
