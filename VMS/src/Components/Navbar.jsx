import { Link, useNavigate } from "react-router-dom";
import { BarChart2, LogOut } from 'lucide-react'; // Import icons

function Navbar() {
  const navigate = useNavigate();

  const routes = [
    { path: '/login', name: 'Logout', icon: LogOut } // Add Logout link
  ];

  const handleLogout = () => {
    // Clear localStorage to log the user out
    localStorage.clear();
    
    // Redirect the user to the login page
    navigate('/login');
  };

  return (
    <nav className="sticky top-0 max-h-max left-0 w-full bg-gradient-to-br from-indigo-900 to-purple-800 shadow-lg z-40">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo with hover animation */}
        <Link 
          to="/dashboard" 
          className="text-white text-2xl font-bold flex items-center space-x-2 transform transition duration-300 hover:scale-105"
        >
          <span className="bg-white/20 p-2 rounded-full">
            <BarChart2 className="text-white" />
          </span>
          <span>Event Hub</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="flex items-center space-x-6">
          {routes.map((route) => (
            <Link
              key={route.path}
              to={route.path}
              onClick={route.name === 'Logout' ? handleLogout : undefined}  // Trigger logout on clicking Logout
              className="group flex items-center space-x-2 text-white hover:text-indigo-200 transition duration-300 transform hover:scale-105"
            >
              <route.icon 
                className="text-white/70 group-hover:text-white transition duration-300" 
                size={20} 
              />
              <span className="font-medium">{route.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
