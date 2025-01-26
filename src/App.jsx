import { BrowserRouter as Router, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";  // Import useEffect
import Home from "./pages/Home.jsx";
import Navbar from "./Components/Navbar.jsx";
import Login from "./pages/Auth/login.jsx";
import Signup from "./pages/Auth/Signup.jsx";
import ForgotPassword from "./pages/Auth/ForgetPassword.jsx";
import TaskManagement from "./pages/Admin/TaskManagement.jsx";
import Reports from "./pages/Admin/Reports.jsx";
import VolunteerTracking from "./pages/Admin/VolunteerTracking.jsx";
import Dashboard from "./pages/Admin/Dashboard.jsx";
import Sidebar from "./Components/Sidebar.jsx";
import Profile from "./pages/Admin/Profile.jsx";
import VolunteerManagement from "./pages/Admin/VolunteerManagement.jsx";
import EventS from "./pages/Admin/EventS.jsx";
import AssignmentsPage from "./pages/Admin/AssignmestPage.jsx";
import AdminTasks from "./pages/Admin/TaskAdmin.jsx";
import VolunteerLogViewer from "./pages/Admin/VolunteerLogViewer.jsx";
import SendNotification from "./pages/Admin/SendNotification.jsx";
import AdminDashboard from "./pages/Admin/DashboardAdmin.jsx";

function App() {
  const location = useLocation();
  const navigate = useNavigate();

  // Check if there's a value in localStorage (e.g., a logged-in user's token or session)
  const isLoggedIn = localStorage.getItem("userRole"); // Replace "userToken" with your actual key

  useEffect(() => {
    // If no value exists in localStorage, navigate to login page
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [isLoggedIn, navigate]);  // This will run the check whenever `isLoggedIn` changes

  // Determine if Navbar and Footer should be hidden on certain pages
  const hideNavAndFooter = ["/", "/login", "/signup"].includes(location.pathname);
  
  // Determine if Sidebar should be shown on Admin-related routes
  const showSidebar = ["/dashboard", "/task", "/reports", "/volun","/profile","/volunteermanage","/events","/assignmentspage","/admintasks","/admindashboard","/volunteerlogviewer","/sendnotification"].includes(location.pathname);

  return (
    <div className="flex flex-col h-screen">
      {/* Navbar - Full width on mobile, separate space on laptop */}
      {!hideNavAndFooter && (
        <header className="w-full">
          <Navbar />
        </header>
      )}

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar - Only on laptop screens */}
        {showSidebar && (
          <div className="hidden md:block w-64 bg-gray-200">
            <Sidebar />
          </div>
        )}

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col overflow-auto">
          {/* Mobile Sidebar (if needed) */}
          {showSidebar && (
            <div className="md:hidden">
              <Sidebar />
            </div>
          )}

          {/* Main content */}
          <main className="flex-1 overflow-y-auto">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/task" element={<TaskManagement />} />
              <Route path="/reports" element={<Reports />} />
              <Route path="/volun" element={<VolunteerTracking />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/volunteermanage" element={<VolunteerManagement/>}/>
              <Route path="/events" element={<EventS/>}/>
              <Route path="/assignmentspage" element={<AssignmentsPage/>}/>
              <Route path="/admintasks" element={<AdminTasks/>}/>
              <Route path="/volunteerlogviewer" element={<VolunteerLogViewer/>}/>
              <Route path="/sendnotification" element={<SendNotification/>}/>
              <Route path="/admindashboard" element={<AdminDashboard/>}/>
            </Routes>
          </main>

        </div>
      </div>
    </div>
  );
}

export default function WrappedApp() {
  return (
    <Router>
      <App />
    </Router>
  );
}
