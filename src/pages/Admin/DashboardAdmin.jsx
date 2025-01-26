import { useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import jsPDF from "jspdf";
import * as XLSX from "xlsx";

function AdminDashboard() {
  const totalTasks = 100;
  const completedTasks = 75;
  const volunteerHours = 500;
  const totalVolunteers = 50;
  const upcomingEvents = 10;

  const taskCompletionData = [
    { name: "Completed", value: completedTasks },
    { name: "Remaining", value: totalTasks - completedTasks },
  ];

  const COLORS = ["#4CAF50", "#FF7043"];

  const volunteerHoursData = [
    { name: "John", hours: 40 },
    { name: "Alice", hours: 35 },
    { name: "Bob", hours: 25 },
    { name: "Jane", hours: 30 },
  ];

  const recentActivityLogs = [
    { id: 1, activity: "John completed task: Decorations", date: "2025-02-01" },
    {
      id: 2,
      activity: "Alice registered for event: Tech Talk",
      date: "2025-02-02",
    },
    {
      id: 3,
      activity: "Bob updated availability to Part-time",
      date: "2025-02-03",
    },
  ];

  const notifications = [
    { id: 1, message: "New volunteer registration: David", type: "info" },
    { id: 2, message: "Task overdue: Technical Support", type: "warning" },
    { id: 3, message: "Upcoming event: College Fest", type: "alert" },
  ];

  const [topVolunteer] = useState(
    volunteerHoursData.reduce(
      (max, volunteer) => (volunteer.hours > max.hours ? volunteer : max),
      volunteerHoursData[0]
    )
  );

  // Generate and Download PDF Report
  const generatePDFReport = () => {
    const doc = new jsPDF();
    doc.text("Volunteer Report", 20, 10);
    doc.text(`Total Volunteers: ${totalVolunteers}`, 20, 20);
    doc.text(`Total Tasks: ${totalTasks}`, 20, 30);
    doc.text(`Upcoming Events: ${upcomingEvents}`, 20, 40);
    doc.text(`Top Volunteer: ${topVolunteer.name}`, 20, 50);
    doc.text(`Total Volunteer Hours: ${volunteerHours}`, 20, 60);
    doc.save("Volunteer_Report.pdf");
  };

  // Generate and Download Excel Report
  const generateExcelReport = () => {
    const ws = XLSX.utils.json_to_sheet(volunteerHoursData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Volunteer Hours");
    XLSX.writeFile(wb, "Volunteer_Report.xlsx");
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-800 to-blue-900 p-4 md:p-8 text-white">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <header className="flex justify-between items-center mb-10">
            <div>
              <h1 className="text-4xl font-extrabold text-white mb-2">
                Admin Dashboard
              </h1>
              <p className="text-indigo-200">Overview of Volunteer Management</p>
            </div>
          </header>

          {/* Quick Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6">
              <h2 className="text-lg font-semibold text-white">Total Volunteers</h2>
              <p className="text-3xl font-bold">{totalVolunteers}</p>
            </div>
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6">
              <h2 className="text-lg font-semibold text-white">Total Tasks</h2>
              <p className="text-3xl font-bold">{totalTasks}</p>
            </div>
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6">
              <h2 className="text-lg font-semibold text-white">Upcoming Events</h2>
              <p className="text-3xl font-bold">{upcomingEvents}</p>
            </div>
          </div>

          {/* Top Volunteer Badge */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 mb-10">
            <h2 className="text-lg font-semibold text-white">Top Volunteer of the Month</h2>
            <p className="text-3xl font-bold">{topVolunteer.name}</p>
            <p className="text-sm text-indigo-200">Logged Hours: {topVolunteer.hours}</p>
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
            {/* Task Completion Chart */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6">
              <h2 className="text-lg font-semibold text-white mb-4">Task Completion Rates</h2>
              <PieChart width={300} height={200}>
                <Pie
                  data={taskCompletionData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  label
                >
                  {taskCompletionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </div>

            {/* Volunteer Hours Chart */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6">
              <h2 className="text-lg font-semibold text-white mb-4">Volunteer Hours Logged</h2>
              <BarChart
                width={400}
                height={300}
                data={volunteerHoursData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="hours" fill="#4CAF50" />
              </BarChart>
            </div>
          </div>

          {/* Recent Activity Logs */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 mb-10">
            <h2 className="text-lg font-semibold text-white mb-4">Recent Activity Logs</h2>
            <ul>
              {recentActivityLogs.map((log) => (
                <li key={log.id} className="mb-4">
                  <p className="text-sm text-indigo-200">{log.date}</p>
                  <p>{log.activity}</p>
                </li>
              ))}
            </ul>
          </div>

          {/* Notifications */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 mb-10">
            <h2 className="text-lg font-semibold text-white mb-4">Notifications</h2>
            <ul>
              {notifications.map((notification) => (
                <li
                  key={notification.id}
                  className={`mb-4 p-4 rounded-xl ${
                    notification.type === "info"
                      ? "bg-blue-600/20"
                      : notification.type === "warning"
                      ? "bg-yellow-600/20"
                      : "bg-red-600/20"
                  }`}
                >
                  <p>{notification.message}</p>
                </li>
              ))}
            </ul>
          </div>

          {/* Export Buttons */}
          <div className="flex gap-4 mb-10">
            <button
              onClick={generatePDFReport}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-blue-700 transition duration-200"
            >
              Download PDF Report
            </button>
            <button
              onClick={generateExcelReport}
              className="bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-green-700 transition duration-200"
            >
              Download Excel Report
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminDashboard;
