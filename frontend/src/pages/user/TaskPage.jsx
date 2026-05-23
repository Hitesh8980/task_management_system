import { useEffect, useState } from "react";

import toast from "react-hot-toast";

import DashboardLayout from "../../layouts/DashboardLayout";

import API from "../../api/axios";

import TaskCard from "../../components/dashboard/TaskCard";


const TasksPage = () => {

  const [tasks, setTasks] = useState([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });


  // FETCH TASKS
  const fetchTasks = async () => {

    try {

      const { data } = await API.get("/tasks");

      setTasks(data);

    } catch (error) {

      toast.error("Failed to fetch tasks");

    } finally {

      setLoading(false);
    }
  };


  useEffect(() => {

    fetchTasks();

  }, []);


  // HANDLE INPUT
  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };


  // CREATE TASK
  const handleCreateTask = async (e) => {

    e.preventDefault();

    try {

      const { data } = await API.post(
        "/tasks",
        formData
      );

      setTasks([data, ...tasks]);

      setFormData({
        title: "",
        description: "",
      });

      toast.success("Task created");

    } catch (error) {

      toast.error("Task creation failed");
    }
  };


  // DELETE TASK
  const handleDeleteTask = async (id) => {

    try {

      await API.delete(`/tasks/${id}`);

      setTasks(
        tasks.filter((task) => task._id !== id)
      );

      toast.success("Task deleted");

    } catch (error) {

      toast.error("Delete failed");
    }
  };


  // UPDATE STATUS
 // UPDATE STATUS
const handleStatusChange = async (task) => {
  try {
    const updatedStatus = task.status === "Pending" ? "Completed" : "Pending";

    console.log("🔄 Updating task:", task._id, "→", updatedStatus);

    const { data } = await API.put(`/tasks/${task._id}`, {
      status: updatedStatus,
    });

    setTasks(tasks.map((t) => (t._id === task._id ? data : t)));
    toast.success("Task updated");
  } catch (error) {
    console.error("❌ Full Error:", error);
    console.error("Response Data:", error.response?.data);
    console.error("Status Code:", error.response?.status);
    
    toast.error(error.response?.data?.message || "Update failed");
  }
};


  return (
    <DashboardLayout>

      {/* CREATE TASK */}
      <div className="
        bg-slate-900
        border
        border-slate-800
        rounded-2xl
        p-6
        mb-8
      ">

        <h2 className="text-2xl font-bold mb-5">
          Create Task
        </h2>

        <form
          onSubmit={handleCreateTask}
          className="grid md:grid-cols-3 gap-4"
        >

          <input
            type="text"
            name="title"
            placeholder="Task title"
            value={formData.title}
            onChange={handleChange}
            className="
              px-4
              py-3
              rounded-xl
              bg-slate-950
              border
              border-slate-700
              outline-none
              text-white
            "
          />

          <input
            type="text"
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            className="
              px-4
              py-3
              rounded-xl
              bg-slate-950
              border
              border-slate-700
              outline-none
              text-white
            "
          />

          <button
            type="submit"
            className="
              bg-indigo-600
              hover:bg-indigo-700
              rounded-xl
              px-6
              py-3
              font-semibold
              transition-all
            "
          >
            Create Task
          </button>

        </form>

      </div>


      {/* SEARCH */}
      <input
        type="text"
        placeholder="Search tasks..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="
          w-full
          mb-6
          px-4
          py-3
          rounded-xl
          bg-slate-900
          border
          border-slate-800
          outline-none
          text-white
        "
      />


      {/* TASKS */}
      {
        loading ? (

          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">

            {
              [...Array(6)].map((_, index) => (

                <div
                  key={index}
                  className="
                    h-52
                    rounded-2xl
                    bg-slate-900
                    border
                    border-slate-800
                    animate-pulse
                  "
                />
              ))
            }

          </div>

        ) : tasks.length === 0 ? (

          <div className="
            bg-slate-900
            border
            border-slate-800
            rounded-2xl
            p-10
            text-center
          ">

            <h2 className="text-2xl font-bold mb-2">
              No Tasks Yet
            </h2>

            <p className="text-slate-400">
              Create your first task to begin productivity tracking.
            </p>

          </div>

        ) : (

          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">

            {
              tasks
                .filter((task) =>
                  task.title
                    .toLowerCase()
                    .includes(search.toLowerCase())
                )
                .map((task) => (

                  <TaskCard
                    key={task._id}
                    task={task}
                    onDelete={handleDeleteTask}
                    onStatusChange={handleStatusChange}
                  />
                ))
            }

          </div>
        )
      }

    </DashboardLayout>
  );
};

export default TasksPage;