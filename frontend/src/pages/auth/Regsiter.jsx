import { useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import toast from "react-hot-toast";

import API from "../../api/axios";

import AuthLayout from "../../layouts/AuthLayouts";

import InputField from "../../components/forms/InputField";


const Register = () => {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
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

      await API.post(
        "/auth/register",
        formData
      );

      toast.success("Registration successful");

      navigate("/login");

    } catch (error) {

      toast.error(
        error.response?.data?.message ||
        "Registration failed"
      );

    } finally {

      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Create Account"
      subtitle="Start managing your tasks professionally"
    >

      <form
        onSubmit={handleSubmit}
        className="space-y-5"
      >

        <InputField
          type="text"
          name="name"
          placeholder="Enter your name"
          value={formData.name}
          onChange={handleChange}
        />

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
          placeholder="Create password"
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
              ? "Creating account..."
              : "Register"
          }
        </button>

      </form>

      <p className="text-slate-400 text-center mt-6">
        Already have an account?{" "}

        <Link
          to="/login"
          className="text-indigo-400 hover:text-indigo-300"
        >
          Login
        </Link>
      </p>

    </AuthLayout>
  );
};

export default Register;