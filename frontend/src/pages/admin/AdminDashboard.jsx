import DashboardLayout from "../../layouts/Dashboardlayout";

const AdminDashboard = () => {

  return (
    <DashboardLayout>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
          <h3 className="text-slate-400 mb-2">
            Total Users
          </h3>

          <h1 className="text-4xl font-bold">
            25
          </h1>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
          <h3 className="text-slate-400 mb-2">
            Total Tasks
          </h3>

          <h1 className="text-4xl font-bold">
            120
          </h1>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
          <h3 className="text-slate-400 mb-2">
            Completed
          </h3>

          <h1 className="text-4xl font-bold text-green-400">
            95
          </h1>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
          <h3 className="text-slate-400 mb-2">
            Pending
          </h3>

          <h1 className="text-4xl font-bold text-yellow-400">
            25
          </h1>
        </div>

      </div>

    </DashboardLayout>
  );
};

export default AdminDashboard;