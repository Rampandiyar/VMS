import { useState } from "react";
import {
  MoreVertical,
  X,
  Filter,
  ListChecks,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

function TaskManagement() {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      name: "Event Decorations",
      description: "Coordinate and set up comprehensive event decorations.",
      status: "Not Started",
      priority: "High",
      dueDate: "2025-02-10",
      assignedTo: "Emily Johnson",
    },
    {
      id: 2,
      name: "Registration Management",
      description: "Oversee attendee registration and check-in processes.",
      status: "In Progress",
      priority: "Medium",
      dueDate: "2025-02-12",
      assignedTo: "Michael Chen",
    },
    {
      id: 3,
      name: "Technical Support Coordination",
      description: "Manage technical equipment and provide on-site support.",
      status: "Not Started",
      priority: "Low",
      dueDate: "2025-02-08",
      assignedTo: "Sarah Rodriguez",
    },
  ]);

  const [selectedTask, setSelectedTask] = useState(null);
  const [filter, setFilter] = useState("All");
  const [search] = useState("");

  const filteredTasks = tasks.filter(
    (task) =>
      (filter === "All" || task.status === filter) &&
      task.name.toLowerCase().includes(search.toLowerCase())
  );

  const statusColors = {
    "Not Started": "bg-red-100 text-red-800",
    "In Progress": "bg-yellow-100 text-yellow-800",
    Completed: "bg-green-100 text-green-800",
  };

  const priorityColors = {
    High: "border-red-500",
    Medium: "border-yellow-500",
    Low: "border-green-500",
  };

  const handleUpdateTask = (updatedTask) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
    setSelectedTask(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-800 to-blue-900 p-4 md:p-8 text-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-4xl font-extrabold text-white mb-2">
              Task Management
            </h1>
            <p className="text-indigo-200">Manage your team&apos;s tasks efficiently</p>
          </div>


        </header>

        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Task List */}
          <div className="md:col-span-2 bg-white/10 backdrop-blur-lg rounded-2xl p-6">
            {/* Filter Section */}
            <div className="flex justify-between items-center mb-6">
              <div className="flex space-x-4">
                {["All", "Not Started", "In Progress", "Completed"].map((status) => (
                  <button
                    key={status}
                    onClick={() => setFilter(status)}
                    className={`px-4 py-2 rounded-full text-sm transition ${
                      filter === status
                        ? "bg-blue-600 text-white"
                        : "bg-white/10 text-white/70 hover:bg-white/20"
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>
              <button className="flex items-center text-white/70 hover:text-white">
                <Filter className="mr-2" size={18} /> Filter
              </button>
            </div>

            {/* Task List */}
            <div className="space-y-4">
              {filteredTasks.map((task) => (
                <motion.div
                  key={task.id}
                  whileHover={{ scale: 1.02 }}
                  className={`bg-white/10 backdrop-blur-lg rounded-xl p-4 border-l-4 ${priorityColors[task.priority]} cursor-pointer hover:bg-white/20 transition-all`}
                  onClick={() => setSelectedTask(task)}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-semibold text-white">{task.name}</h3>
                      <p className="text-sm text-indigo-200 truncate">
                        {task.description}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${statusColors[task.status]}`}
                      >
                        {task.status}
                      </span>
                      <MoreVertical className="text-white/50" size={18} />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Task Statistics */}
          <div className="space-y-6">
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center">
                <ListChecks className="mr-2" /> Task Overview
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-600/20 p-4 rounded-xl text-center">
                  <h4 className="text-sm text-blue-200">Total Tasks</h4>
                  <p className="text-4xl font-bold text-white">{tasks.length}</p>
                </div>
                <div className="bg-green-600/20 p-4 rounded-xl text-center">
                  <h4 className="text-sm text-green-200">Completed</h4>
                  <p className="text-4xl font-bold text-white">
                    {tasks.filter((t) => t.status === "Completed").length}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

{/* Task Details Modal */}
<AnimatePresence>
  {selectedTask && (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white shadow-2xl rounded-2xl p-6 max-w-lg w-full backdrop-blur-lg text-gray-900 border border-gray-100"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-semibold text-gray-900">Task Details</h2>
          <button
            onClick={() => setSelectedTask(null)}
            className="text-gray-600 hover:text-gray-500 transition"
          >
            <X />
          </button>
        </div>

        <div className="space-y-6">
          <div className="bg-gray-50 p-5 rounded-xl shadow-sm">
            <h3 className="font-semibold text-xl text-gray-900">{selectedTask.name}</h3>
            <p className="text-gray-600">{selectedTask.description}</p>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm mb-2 text-gray-700">Priority</label>
              <select
                className="w-full bg-white border border-gray-300 rounded-lg p-3 text-gray-700 focus:ring-2 focus:ring-blue-500"
                value={selectedTask.priority}
                onChange={(e) =>
                  setSelectedTask({
                    ...selectedTask,
                    priority: e.target.value,
                  })
                }
              >
                <option>High</option>
                <option>Medium</option>
                <option>Low</option>
              </select>
            </div>
            <div>
              <label className="block text-sm mb-2 text-gray-700">Status</label>
              <select
                className="w-full bg-white border border-gray-300 rounded-lg p-3 text-gray-700 focus:ring-2 focus:ring-blue-500"
                value={selectedTask.status}
                onChange={(e) =>
                  setSelectedTask({
                    ...selectedTask,
                    status: e.target.value,
                  })
                }
              >
                <option>Not Started</option>
                <option>In Progress</option>
                <option>Completed</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm mb-2 text-gray-700">Due Date</label>
            <input
              type="date"
              className="w-full bg-white border border-gray-300 rounded-lg p-3 text-gray-700 focus:ring-2 focus:ring-blue-500"
              value={selectedTask.dueDate}
              onChange={(e) =>
                setSelectedTask({
                  ...selectedTask,
                  dueDate: e.target.value,
                })
              }
            />
          </div>
        </div>

        <button
          onClick={() => handleUpdateTask(selectedTask)}
          className="mt-6 w-full bg-blue-600 hover:bg-blue-700 rounded-lg py-3 transition text-white font-semibold"
        >
          Update Task
        </button>
      </motion.div>
    </motion.div>
  )}
</AnimatePresence>


    </div>
  );
}

export default TaskManagement;
