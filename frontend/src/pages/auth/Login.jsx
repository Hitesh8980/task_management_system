import { useContext, useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import toast from "react-hot-toast";

import API from "../../api/axios";

import AuthLayout from "../../layouts/AuthLayouts";

import InputField from "../../components/forms/InputField";

import { AuthContext } from "../../context/AuthContext";


const Login = () => {

  const navigate = useNavigate();

  const { setUser } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);

      const { data } = await API.post(
        "/auth/login",
        formData
      );

      localStorage.setItem(
        "userInfo",
        JSON.stringify(data)
      );

      setUser(data);

      toast.success("Login successful");

      if (data.role === "Admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }

    } catch (error) {

      toast.error(
        error.response?.data?.message ||
        "Login failed"
      );

    } finally {

      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Welcome Back"
      subtitle="Login to continue managing tasks"
    >

      <form
        onSubmit={handleSubmit}
        className="space-y-5"
      >

        <InputField
          type="email"
          name="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={handleChange}
        />

        <InputField
          type="password"
          name="password"
          placeholder="Enter your password"
          value={formData.password}
          onChange={handleChange}
        />

        <button
          type="submit"
          disabled={loading}
          className="
            w-full
            py-3
            rounded-xl
            bg-indigo-600
            hover:bg-indigo-700
            transition-all
            text-white
            font-semibold
          "
        >
          {
            loading
              ? "Logging in..."
              : "Login"
          }
        </button>

      </form>

      <p className="text-slate-400 text-center mt-6">
        Don't have an account?{" "}

        <Link
          to="/register"
          className="text-indigo-400 hover:text-indigo-300"
        >
          Register
        </Link>
      </p>

    </AuthLayout>
  );
};

export default Login;