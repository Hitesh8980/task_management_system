const InputField = ({
  type = "text",
  name,
  placeholder,
  value,
  onChange,
}) => {

  return (
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="
        w-full
        px-4
        py-3
        rounded-xl
        bg-slate-900/80
        border
        border-slate-700
        text-white
        placeholder-slate-400
        outline-none
        focus:ring-2
        focus:ring-indigo-500
        transition-all
      "
    />
  );
};

export default InputField;