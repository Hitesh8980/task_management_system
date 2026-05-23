import { useEffect, useState } from "react";

import toast from "react-hot-toast";

import DashboardLayout from "../../layouts/DashboardLayout";

import API from "../../api/axios";


const UsersPage = () => {

  const [users, setUsers] = useState([]);

  const [loading, setLoading] = useState(true);


  // FETCH USERS
  const fetchUsers = async () => {

    try {

      const { data } = await API.get(
        "/admin/users"
      );

      setUsers(data);

    } catch (error) {

      toast.error("Failed to fetch users");

    } finally {

      setLoading(false);
    }
  };


  useEffect(() => {

    fetchUsers();

  }, []);


  // DELETE USER
  const handleDeleteUser = async (id) => {

    try {

      await API.delete(`/admin/users/${id}`);

      setUsers(
        users.filter((user) => user._id !== id)
      );

      toast.success("User deleted");

    } catch (error) {

      toast.error("Delete failed");
    }
  };


  return (
    <DashboardLayout>

      <div className="
        bg-slate-900
        border
        border-slate-800
        rounded-2xl
        overflow-hidden
      ">

        <div className="p-6 border-b border-slate-800">

          <h1 className="text-2xl font-bold">
            User Management
          </h1>

        </div>


        {
          loading ? (

            <p className="p-6 text-slate-400">
              Loading users...
            </p>

          ) : (

            <table className="w-full">

              <thead className="bg-slate-800">

                <tr>

                  <th className="text-left p-4">
                    Name
                  </th>

                  <th className="text-left p-4">
                    Email
                  </th>

                  <th className="text-left p-4">
                    Role
                  </th>

                  <th className="text-left p-4">
                    Action
                  </th>

                </tr>

              </thead>


              <tbody>

                {
                  users.map((user) => (

                    <tr
                      key={user._id}
                      className="border-t border-slate-800"
                    >

                      <td className="p-4">
                        {user.name}
                      </td>

                      <td className="p-4">
                        {user.email}
                      </td>

                      <td className="p-4">

                        <span className={`
                          px-3
                          py-1
                          rounded-full
                          text-sm
                          ${
                            user.role === "Admin"
                              ? "bg-indigo-500/20 text-indigo-400"
                              : "bg-slate-700 text-slate-300"
                          }
                        `}>

                          {user.role}

                        </span>

                      </td>

                      <td className="p-4">

                        <button
                          onClick={() => handleDeleteUser(user._id)}
                          className="
                            px-4
                            py-2
                            rounded-xl
                            bg-red-500/20
                            hover:bg-red-500/30
                            text-red-400
                            transition-all
                          "
                        >
                          Delete
                        </button>

                      </td>

                    </tr>
                  ))
                }

              </tbody>

            </table>
          )
        }

      </div>

    </DashboardLayout>
  );
};

export default UsersPage;