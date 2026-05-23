import { useContext, useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import {
  HiViewGrid,
  HiClipboardCheck,
  HiUsers,
  HiCollection,
  HiLogout,
  HiMenu,
  HiX,
} from "react-icons/hi";

import { AuthContext } from "../context/AuthContext";


const DashboardLayout = ({ children }) => {

  const { user, logout } = useContext(AuthContext);

  const navigate = useNavigate();

  const [sidebarOpen, setSidebarOpen] =
    useState(false);


  const handleLogout = () => {

    logout();

    navigate("/login");
  };


  return (
    <div className="min-h-screen bg-slate-950 text-white flex">

      {/* MOBILE OVERLAY */}
      {
        sidebarOpen && (
          <div
            className="
              fixed
              inset-0
              bg-black/50
              z-40
              md:hidden
            "
            onClick={() => setSidebarOpen(false)}
          />
        )
      }


      {/* SIDEBAR */}
      <aside className={`
        fixed
        md:static
        z-50
        top-0
        left-0
        h-screen
        w-72
        bg-slate-900
        border-r
        border-slate-800
        p-6
        flex
        flex-col
        transition-transform
        duration-300
        ${
          sidebarOpen
            ? "translate-x-0"
            : "-translate-x-full md:translate-x-0"
        }
      `}>

        {/* TOP */}
        <div className="flex items-center justify-between mb-10">

          <div>
            <h1 className="text-3xl font-bold text-indigo-400">
              TaskFlow
            </h1>

            <p className="text-slate-400 text-sm mt-1">
              Enterprise Task Manager
            </p>
          </div>


          <button
            className="md:hidden"
            onClick={() => setSidebarOpen(false)}
          >
            <HiX size={28} />
          </button>

        </div>


        {/* NAV */}
        <nav className="flex flex-col gap-3 flex-1">

          <Link
            to="/"
            className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-800 transition-all"
          >
            <HiViewGrid size={20} />
            Dashboard
          </Link>

          <Link
            to="/tasks"
            className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-800 transition-all"
          >
            <HiClipboardCheck size={20} />
            Tasks
          </Link>

          {
            user?.role === "Admin" && (
              <>
                <Link
                  to="/admin/users"
                  className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-800 transition-all"
                >
                  <HiUsers size={20} />
                  Users
                </Link>

                <Link
                  to="/admin/logs"
                  className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-800 transition-all"
                >
                  <HiCollection size={20} />
                  Activity Logs
                </Link>
              </>
            )
          }

        </nav>


        {/* LOGOUT */}
        <button
          onClick={handleLogout}
          className="
            flex
            items-center
            gap-3
            px-4
            py-3
            rounded-xl
            bg-red-500/20
            hover:bg-red-500/30
            text-red-400
            transition-all
          "
        >
          <HiLogout size={20} />
          Logout
        </button>

      </aside>


      {/* MAIN */}
      <main className="flex-1 p-4 md:p-6 overflow-y-auto w-full">

        {/* MOBILE TOPBAR */}
        <div className="flex items-center justify-between mb-8 md:hidden">

          <button
            onClick={() => setSidebarOpen(true)}
          >
            <HiMenu size={28} />
          </button>

          <div className="
            bg-indigo-500/20
            text-indigo-400
            px-4
            py-2
            rounded-xl
            font-semibold
          ">
            {user?.role}
          </div>

        </div>


        {/* DESKTOP TOPBAR */}
        <div className="hidden md:flex mb-8 justify-between items-center">

          <div>
            <h2 className="text-3xl font-bold">
              Welcome, {user?.name}
            </h2>

            <p className="text-slate-400 mt-1">
              Manage your productivity efficiently
            </p>
          </div>

          <div className="
            bg-indigo-500/20
            text-indigo-400
            px-4
            py-2
            rounded-xl
            font-semibold
          ">
            {user?.role}
          </div>

        </div>

        {children}

      </main>

    </div>
  );
};

export default DashboardLayout;