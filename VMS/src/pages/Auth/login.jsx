import { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Eye, EyeOff } from 'lucide-react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate(); // Initialize the navigate function

  // Predefined credentials for admin and volunteer
  const predefinedUsers = [
    { email: 'admin@example.com', password: 'admin123', role: 'admin' },
    { email: 'volunteer@example.com', password: 'volunteer123', role: 'volunteer' },
  ];

  // Clear localStorage when the Login component mounts
  useEffect(() => {
    localStorage.clear();
  }, []);

  const formik = useFormik({
    initialValues: { email: '', password: '' },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email').required('Required'),
      password: Yup.string().required('Required'),
    }),
    onSubmit: (values) => {
      // Check if the entered credentials match any predefined user
      const matchedUser = predefinedUsers.find(
        (user) => user.email === values.email && user.password === values.password
      );

      if (matchedUser) {
        console.log(`Logging in as ${matchedUser.role}:`, values);
        
        // Save the role in localStorage
        localStorage.setItem('userRole', matchedUser.role);

        // Navigate to the respective dashboard based on the role
        if (matchedUser.role === 'admin') {
          navigate('/admindashboard');
        } else if (matchedUser.role === 'volunteer') {
          navigate('/dashboard');
        }
      } else {
        console.log('Invalid credentials');
        alert('Invalid email or password');
      }
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-800 to-pink-900 p-4">
      <div className="bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-2xl w-full max-w-md border border-white/20">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-pink-600 mb-2">
            Welcome Back!
          </h1>
          <p className="text-gray-600">Login to your account</p>
        </div>

        <form onSubmit={formik.handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="you@example.com"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none transition duration-300 ease-in-out"
            />
            {formik.touched.email && formik.errors.email && (
              <p className="text-red-500 text-sm mt-1 animate-pulse">{formik.errors.email}</p>
            )}
          </div>

          <div>
            <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                id="password"
                placeholder="Enter your password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full p-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none transition duration-300 ease-in-out"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-indigo-600"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {formik.touched.password && formik.errors.password && (
              <p className="text-red-500 text-sm mt-1 animate-pulse">{formik.errors.password}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-indigo-600 to-pink-600 text-white font-semibold rounded-lg hover:from-indigo-700 hover:to-pink-700 transition duration-300 ease-in-out"
          >
            Login
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-6">
          Don&apos;t have an account?{' '}
          <a href="/signup" className="text-indigo-600 hover:text-indigo-800 font-semibold transition duration-300">
            Sign up here
          </a>
        </p>
      </div>
    </div>
  );
}

export default Login;
