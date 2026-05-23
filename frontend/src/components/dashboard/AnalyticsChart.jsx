import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";


const COLORS = [
  "#22c55e",
  "#eab308",
];


const AnalyticsChart = ({
  completed,
  pending,
}) => {

  const data = [
    {
      name: "Completed",
      value: completed || 0,
    },
    {
      name: "Pending",
      value: pending || 0,
    },
  ];


  return (
    <div className="
      bg-slate-900
      border
      border-slate-800
      rounded-2xl
      p-6
      w-full
      h-[420px]
    ">

      <h2 className="text-2xl font-bold mb-6">
        Task Analytics
      </h2>

      <div className="w-full h-[320px]">

        <ResponsiveContainer>

          <PieChart>

            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label
            >

              {
                data.map((entry, index) => (

                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))
              }

            </Pie>

            <Tooltip />

          </PieChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
};

export default AnalyticsChart;