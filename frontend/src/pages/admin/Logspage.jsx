import { useEffect, useState } from "react";

import toast from "react-hot-toast";

import DashboardLayout from "../../layouts/DashboardLayout";

import API from "../../api/axios";


const LogsPage = () => {

  const [logs, setLogs] = useState([]);

  const [loading, setLoading] = useState(true);


  // FETCH LOGS
  const fetchLogs = async () => {

    try {

      const { data } = await API.get(
        "/admin/logs"
      );

      setLogs(data);

    } catch (error) {

      toast.error("Failed to fetch logs");

    } finally {

      setLoading(false);
    }
  };


  useEffect(() => {

    fetchLogs();

  }, []);


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
            Activity Logs
          </h1>

        </div>


        {
          loading ? (

            <p className="p-6 text-slate-400">
              Loading logs...
            </p>

          ) : (

            <table className="w-full">

              <thead className="bg-slate-800">

                <tr>

                  <th className="text-left p-4">
                    User
                  </th>

                  <th className="text-left p-4">
                    Action
                  </th>

                  <th className="text-left p-4">
                    Details
                  </th>

                  <th className="text-left p-4">
                    Time
                  </th>

                </tr>

              </thead>


              <tbody>

                {
                  logs.map((log) => (

                    <tr
                      key={log._id}
                      className="border-t border-slate-800"
                    >

                      <td className="p-4">
                        {log.user?.name}
                      </td>

                      <td className="p-4">
                        {log.action}
                      </td>

                      <td className="p-4">
                        {log.details}
                      </td>

                      <td className="p-4 text-slate-400">
                        {
                          new Date(
                            log.createdAt
                          ).toLocaleString()
                        }
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

export default LogsPage;