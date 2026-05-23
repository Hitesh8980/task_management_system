import { motion } from "framer-motion";

const AuthLayout = ({ children, title, subtitle }) => {

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center px-4">

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl p-8"
      >

        <div className="text-center mb-8">

          <h1 className="text-4xl font-bold text-white mb-2">
            {title}
          </h1>

          <p className="text-slate-400">
            {subtitle}
          </p>

        </div>

        {children}

      </motion.div>
    </div>
  );
};

export default AuthLayout;