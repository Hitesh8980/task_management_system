import { useEffect, useState } from "react";

import toast from "react-hot-toast";

import DashboardLayout from "../../layouts/DashboardLayout";

import API from "../../api/axios";

import AnalyticsChart from "../../components/dashboard/AnalyticsChart";


const AdminDashboard = () => {

  const [users, setUsers] = useState([]);

  const [tasks, setTasks] = useState([]);


  const fetchAnalytics = async () => {

    try {

      const usersResponse =
        await API.get("/admin/users");

      const tasksResponse =
        await API.get("/admin/tasks");

      setUsers(usersResponse.data);

      setTasks(tasksResponse.data);

    } catch (error) {

      toast.error("Failed to load analytics");
    }
  };


  useEffect(() => {

    fetchAnalytics();

  }, []);


  const completedTasks =
    tasks.filter(
      (task) => task.status === "Completed"
    ).length;

  const pendingTasks =
    tasks.filter(
      (task) => task.status === "Pending"
    ).length;


  return (
    <DashboardLayout>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
          <h3 className="text-slate-400 mb-2">
            Total Users
          </h3>

          <h1 className="text-4xl font-bold">
            {users.length}
          </h1>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
          <h3 className="text-slate-400 mb-2">
            Total Tasks
          </h3>

          <h1 className="text-4xl font-bold">
            {tasks.length}
          </h1>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
          <h3 className="text-slate-400 mb-2">
            Completed
          </h3>

          <h1 className="text-4xl font-bold text-green-400">
            {completedTasks}
          </h1>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
          <h3 className="text-slate-400 mb-2">
            Pending
          </h3>

          <h1 className="text-4xl font-bold text-yellow-400">
            {pendingTasks}
          </h1>
        </div>

      </div>


      {/* CHART */}
      <AnalyticsChart
        completed={completedTasks}
        pending={pendingTasks}
      />

    </DashboardLayout>
  );
};

export default AdminDashboard;