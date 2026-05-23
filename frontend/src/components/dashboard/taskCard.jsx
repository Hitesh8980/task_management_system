const TaskCard = ({
  task,
  onDelete,
  onStatusChange,
}) => {

  return (
    <div className="
      bg-slate-900
      border
      border-slate-800
      rounded-2xl
      p-5
      transition-all
      hover:border-indigo-500
    ">

      <div className="flex justify-between items-start">

        <div>
          <h2 className="text-xl font-semibold text-white">
            {task.title}
          </h2>

          <p className="text-slate-400 mt-2">
            {task.description}
          </p>
        </div>

        <span className={`
          px-3
          py-1
          rounded-full
          text-sm
          font-semibold
          ${
            task.status === "Completed"
              ? "bg-green-500/20 text-green-400"
              : "bg-yellow-500/20 text-yellow-400"
          }
        `}>
          {task.status}
        </span>

      </div>


      <div className="flex gap-3 mt-6">

        <button
          onClick={() => onStatusChange(task)}
          className="
            px-4
            py-2
            rounded-xl
            bg-indigo-600
            hover:bg-indigo-700
            transition-all
          "
        >
          Mark Complete
        </button>

        <button
          onClick={() => onDelete(task._id)}
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

      </div>

    </div>
  );
};

export default TaskCard;