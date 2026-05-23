const TaskCard = ({ task, onDelete, onStatusChange }) => {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 transition-all hover:border-indigo-500">
      
      {/* Owner Info - Only shows for Admin */}
      {task.createdBy && (
        <div className="flex items-center gap-3 mb-4 pb-4 border-b border-slate-700">
          <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
            {task.createdBy.name ? task.createdBy.name[0].toUpperCase() : "U"}
          </div>
          <div>
            <p className="font-medium text-white">
              {task.createdBy.name || "Unknown User"}
            </p>
            <p className="text-slate-400 text-sm">
              {task.createdBy.email}
            </p>
          </div>
        </div>
      )}

      {/* Task Content */}
      <div className="flex justify-between items-start">
        <div className="flex-1 pr-4">
          <h2 className="text-xl font-semibold text-white mb-2">
            {task.title}
          </h2>
          <p className="text-slate-400 text-sm line-clamp-3">
            {task.description || "No description provided."}
          </p>
        </div>

        <span
          className={`px-3 py-1 rounded-full text-sm font-semibold shrink-0 ${
            task.status === "Completed"
              ? "bg-green-500/20 text-green-400"
              : "bg-yellow-500/20 text-yellow-400"
          }`}
        >
          {task.status}
        </span>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 mt-6">
        <button
          onClick={() => onStatusChange(task)}
          className="flex-1 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 transition-all font-medium"
        >
          {task.status === "Completed" ? "Mark as Pending" : "Mark Complete"}
        </button>

        <button
          onClick={() => onDelete(task._id)}
          className="px-5 py-2.5 rounded-xl bg-red-500/20 hover:bg-red-500/30 text-red-400 transition-all"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskCard;