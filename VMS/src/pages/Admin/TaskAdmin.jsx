import { useState } from "react";
import { MoreVertical, X, Filter, ListChecks } from "lucide-react";
import Swal from "sweetalert2";
import {
  Button,
  TextField,
  Select,
  MenuItem,
} from "@mui/material";

const AdminTasks = () => {
  const [tasks, setTasks] = useState([
    {
      task_id: 1,
      event_id: 101,
      task_name: "Set up stage",
      description: "Arrange and decorate the stage for the event",
      required_skills: "High",
      status: "In Progress",
      dueDate: "", 
    },
    {
      task_id: 2,
      event_id: 101,
      task_name: "Coordinate catering",
      description: "Ensure food is delivered and served on time",
      required_skills: "Medium",
      status: "Assigned",
      dueDate: "",
    },
  ]);

  const [openDialog, setOpenDialog] = useState(false);
  const [currentTask, setCurrentTask] = useState({
    task_id: "",
    event_id: 101,
    task_name: "",
    description: "",
    required_skills: "Low",
    status: "Assigned",
    dueDate: "", 
  });

  const [filter, setFilter] = useState("All");

  const handleSave = () => {
    // Validation
    if (!currentTask.task_name.trim()) {
      Swal.fire({
        icon: "error",
        title: "Task Name Required",
        text: "Please enter a task name",
      });
      return;
    }

    if (!currentTask.description.trim()) {
      Swal.fire({
        icon: "error", 
        title: "Description Required",
        text: "Please enter a task description",
      });
      return;
    }

    if (currentTask.task_id) {
      // Editing existing task
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.task_id === currentTask.task_id ? currentTask : task
        )
      );
    } else {
      // Adding new task
      setTasks((prevTasks) => [
        ...prevTasks,
        { 
          ...currentTask, 
          task_id: Date.now(),
        }
      ]);
    }

    // Reset and close dialog
    setOpenDialog(false);
    setCurrentTask({
      task_id: "",
      event_id: 101,
      task_name: "",
      description: "",
      required_skills: "Low",
      status: "Assigned",
      dueDate: "",
    });

    Swal.fire({
      icon: "success",
      title: "Task Saved",
      text: "Your task has been successfully saved",
      timer: 1500
    });
  };

  const handleEdit = (task) => {
    setCurrentTask({...task});
    setOpenDialog(true);
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will not be able to recover this task!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        setTasks((prevTasks) => prevTasks.filter((task) => task.task_id !== id));
        Swal.fire("Deleted!", "Your task has been deleted.", "success");
      }
    });
  };

  const filteredTasks = tasks.filter(
    (task) => filter === "All" || task.status === filter
  );

  const requiredSkillsColors = {
    High: "border-l-4 border-red-600", 
    Medium: "border-l-4 border-yellow-600", 
    Low: "border-l-4 border-green-600", 
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-800 to-blue-900 p-4 md:p-8 text-white">
      <div className="max-w-7xl mx-auto">
        <header className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-4xl font-extrabold text-white mb-2">
              Admin Task Management
            </h1>
            <p className="text-indigo-200">Manage event tasks with ease</p>
          </div>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              setCurrentTask({
                task_id: "",
                event_id: 101,
                task_name: "",
                description: "",
                required_skills: "Low",
                status: "Assigned",
                dueDate: "",
              });
              setOpenDialog(true);
            }}
          >
            Add Task
          </Button>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 bg-white/10 backdrop-blur-lg rounded-2xl p-6">
            <div className="flex justify-between items-center mb-6">
              <div className="flex space-x-4">
                {["All", "Assigned", "In Progress", "Completed"].map(
                  (status) => (
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
                  )
                )}
              </div>
              <button className="flex items-center text-white/70 hover:text-white">
                <Filter className="mr-2" size={18} /> Filter
              </button>
            </div>

            <div className="space-y-4">
              {filteredTasks.map((task) => (
                <div
                  key={task.task_id}
                  className={`bg-white/10 backdrop-blur-lg rounded-xl p-4 ${requiredSkillsColors[task.required_skills]} cursor-pointer hover:bg-white/20 transition-all`}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-semibold text-white">{task.task_name}</h3>
                      <p className="text-sm text-indigo-200 truncate">
                        {task.description}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span
                        className={`px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800`}
                      >
                        {task.status}
                      </span>
                      <MoreVertical className="text-white/50" size={18} />
                    </div>
                  </div>
                  <div className="mt-4 flex justify-between items-center">
                    <button onClick={() => handleEdit(task)} className="text-white hover:text-blue-300">
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(task.task_id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

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

      {openDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="bg-white/20 backdrop-blur-lg w-full max-w-md rounded-2xl shadow-2xl p-6 border border-white/20 text-white">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Task Details</h2>
              <button
                onClick={() => setOpenDialog(false)}
                className="text-white/70 hover:text-white"
              >
                <X />
              </button>
            </div>

            <div className="space-y-4">
              <TextField
                label="Task Name"
                value={currentTask.task_name}
                onChange={(e) =>
                  setCurrentTask({ ...currentTask, task_name: e.target.value })
                }
                fullWidth
                variant="outlined"
                className="bg-white/10"
              />

              <TextField
                label="Description"
                value={currentTask.description}
                onChange={(e) =>
                  setCurrentTask({ ...currentTask, description: e.target.value })
                }
                fullWidth
                multiline
                rows={3}
                variant="outlined"
                className="bg-white/10"
              />

              <div className="grid grid-cols-2 gap-4">
                <Select
                  label="Priority"
                  value={currentTask.required_skills}
                  onChange={(e) =>
                    setCurrentTask({
                      ...currentTask,
                      required_skills: e.target.value,
                    })
                  }
                  fullWidth
                  variant="outlined"
                >
                  <MenuItem value="High">High</MenuItem>
                  <MenuItem value="Medium">Medium</MenuItem>
                  <MenuItem value="Low">Low</MenuItem>
                </Select>

                <Select
                  label="Status"
                  value={currentTask.status}
                  onChange={(e) =>
                    setCurrentTask({
                      ...currentTask,
                      status: e.target.value,
                    })
                  }
                  fullWidth
                  variant="outlined"
                >
                  <MenuItem value="Assigned">Assigned</MenuItem>
                  <MenuItem value="In Progress">In Progress</MenuItem>
                  <MenuItem value="Completed">Completed</MenuItem>
                </Select>
              </div>

              <TextField
                label="Due Date"
                type="date"
                value={currentTask.dueDate}
                onChange={(e) =>
                  setCurrentTask({
                    ...currentTask,
                    dueDate: e.target.value,
                  })
                }
                fullWidth
                variant="outlined"
                InputLabelProps={{ shrink: true }}
                className="bg-white/10"
              />
            </div>

            <button
              onClick={handleSave}
              className="mt-6 w-full bg-blue-600 hover:bg-blue-700 rounded-lg py-2 transition text-white font-semibold"
            >
              {currentTask.task_id ? "Update Task" : "Save Task"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminTasks;
