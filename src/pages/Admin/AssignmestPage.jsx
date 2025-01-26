import  { useState } from "react";
import Swal from "sweetalert2"; // Import SweetAlert2

const AssignmentsPage = () => {
  // Hardcoded assignment data
  const [assignments] = useState([
    {
      assignment_id: 1,
      task_id: 101,
      user_id: 1001,
      status: "In Progress",
      assigned_at: "2025-01-20",
    },
    {
      assignment_id: 2,
      task_id: 102,
      user_id: 1002,
      status: "Pending",
      assigned_at: "2025-01-21",
    },
    {
      assignment_id: 3,
      task_id: 103,
      user_id: 1003,
      status: "Completed",
      assigned_at: "2025-01-22",
    },
  ]);

  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [feedback, setFeedback] = useState("");
  const [hoursLogged, setHoursLogged] = useState(0);

  // Handle feedback submission
  const handleFeedbackSubmit = (assignmentId) => {
    Swal.fire({
      title: "Feedback Submitted",
      text: `Assignment ID: ${assignmentId}\nFeedback: ${feedback}\nHours Logged: ${hoursLogged}`,
      icon: "success",
      confirmButtonText: "OK",
    });

    // Logic to award badge and certificate
    const assignment = assignments.find(
      (assign) => assign.assignment_id === assignmentId
    );
    if (assignment.status === "Completed") {
      awardBadgeAndCertificate(assignment.user_id);
    }

    // Reset inputs
    setFeedback("");
    setHoursLogged(0);
    setSelectedAssignment(null);
  };

  // Function to award badge and certificate
  const awardBadgeAndCertificate = (userId) => {
    Swal.fire({
      title: "Awarding Badge & Certificate",
      text: `Awarding badge and certificate to User ID: ${userId}`,
      icon: "info",
      showConfirmButton: false,
      timer: 2000,
    });

    // Simulate database update or call to backend
    updateUserStatus(userId);

    // Simulate sending a certificate via email (placeholder)
    sendCertificateByEmail(userId);
  };

  // Function to simulate updating the user's status in the database
  const updateUserStatus = (userId) => {
    console.log(`Updating user ${userId} status in the database.`);
    // Replace with actual backend call to update the user's status (e.g., 'Awarded' or 'Certified')
  };

  // Function to simulate sending a certificate email
  const sendCertificateByEmail = (userId) => {
    console.log(`Sending certificate to User ID: ${userId}`);
    // Replace with actual email sending logic or API call
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-800 to-blue-900 p-6">
      <h1 className="text-5xl font-extrabold text-white mb-12 text-center drop-shadow-lg">
        Assignments Management
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {assignments.map((assignment) => (
          <div
            key={assignment.assignment_id}
            className="p-6 bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
          >
            <h2 className="text-xl font-semibold text-indigo-800">
              Task ID: {assignment.task_id}
            </h2>
            <p className="text-sm text-gray-700">User ID: {assignment.user_id}</p>
            <p className="text-sm text-gray-700">Status: {assignment.status}</p>
            <p className="text-sm text-gray-700">
              Assigned At:{" "}
              {new Date(assignment.assigned_at).toLocaleDateString()}
            </p>
            <button
              className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-300"
              onClick={() => setSelectedAssignment(assignment)}
            >
              Submit Feedback
            </button>
          </div>
        ))}
      </div>

      {selectedAssignment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full">
            <h2 className="text-xl font-bold mb-4 text-indigo-600">
              Submit Feedback for Task ID: {selectedAssignment.task_id}
            </h2>
            <textarea
              className="w-full border p-2 rounded-md mb-4"
              placeholder="Enter your feedback here..."
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
            ></textarea>
            <input
              type="number"
              className="w-full border p-2 rounded-md mb-4"
              placeholder="Hours logged"
              value={hoursLogged}
              onChange={(e) => setHoursLogged(e.target.value)}
            />
            <div className="flex justify-end gap-4">
              <button
                className="bg-gray-500 text-white px-6 py-2 rounded-md hover:bg-gray-600 transition-all"
                onClick={() => setSelectedAssignment(null)}
              >
                Cancel
              </button>
              <button
                className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition-all"
                onClick={() =>
                  handleFeedbackSubmit(selectedAssignment.assignment_id)
                }
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AssignmentsPage;
