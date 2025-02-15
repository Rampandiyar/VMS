import { useState, useEffect } from "react";
import TaskCard from "../../Components/TaskCard";

function TaskList() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    // Simulate API call
    setTasks([
      {
        task_name: "Decorations",
        description: "Help set up decorations",
        required_skills: "Creativity",
        status: "pending",
      },
      {
        task_name: "Registration Desk",
        description: "Manage registrations",
        required_skills: "Communication",
        status: "completed",
      },
    ]);
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Available Tasks</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {tasks.map((task, index) => (
          <TaskCard key={index} task={task} />
        ))}
      </div>
    </div>
  );
}

export default TaskList;
