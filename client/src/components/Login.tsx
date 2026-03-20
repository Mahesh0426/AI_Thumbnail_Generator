import { useEffect, useState } from "react";
import SoftBackdrop from "./SoftBackdrop";
import { Lock, Mail, User } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { user, login, signUp } = useAuth();
  const navigate = useNavigate();

  const [state, setState] = useState("login");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (state === "login") {
      login(formData);
    } else {
      signUp(formData);
    }
  };

  // if user is logged in then navigate to home page
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <>
      <div className="min-h-screen flex flex-col items-center justify-center px-4 pt-31 pb-20">
        <form
          onSubmit={handleSubmit}
          className="w-full sm:w-96 text-center bg-white/6 border border-white/10 rounded-2xl px-8 pb-8"
        >
          <h1 className="text-white text-2xl mt-8 font-medium">
            {state === "login" ? "Login" : "Sign up"}
          </h1>

          <p className="text-gray-400 text-sm mt-2">
            Please sign in to continue
          </p>

          {state !== "login" && (
            <div className="flex items-center mt-5 w-full bg-white/5 ring-1 ring-white/10 focus-within:ring-indigo-500/60 h-10 rounded-full overflow-hidden pl-5 gap-3 transition-all">
              <User className="text-gray-400" size={16} />
              <input
                type="text"
                name="name"
                placeholder="Name"
                className="w-full bg-transparent text-white placeholder-white/40 border-none outline-none text-sm"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
          )}

          <div className="flex items-center w-full mt-3 bg-white/5 ring-1 ring-white/10 focus-within:ring-indigo-500/60 h-10 rounded-full overflow-hidden pl-5 gap-3 transition-all">
            <Mail className="text-gray-400" size={16} />
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="w-full bg-transparent text-white placeholder-white/40 border-none outline-none text-sm"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="flex items-center mt-3 w-full bg-white/5 ring-1 ring-white/10 focus-within:ring-indigo-500/60 h-10 rounded-full overflow-hidden pl-5 gap-3 transition-all">
            <Lock className="text-gray-400" size={16} />
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="w-full bg-transparent text-white placeholder-white/40 border-none outline-none text-sm"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mt-4 text-left">
            <button
              type="button"
              className="text-sm text-indigo-400 hover:underline"
            >
              Forget password?
            </button>
          </div>

          <button
            type="submit"
            className="mt-2 w-full h-9 rounded-full text-white bg-indigo-600 hover:bg-indigo-500 transition"
          >
            {state === "login" ? "Login" : "Sign up"}
          </button>

          <p
            onClick={() =>
              setState((prev) => (prev === "login" ? "register" : "login"))
            }
            className="text-gray-400 text-sm mt-3 cursor-pointer"
          >
            {state === "login"
              ? "Don't have an account?"
              : "Already have an account?"}
            <span className="text-indigo-400 hover:underline ml-1">
              click here
            </span>
          </p>
          <div className="flex items-center my-6">
            <div className="flex-1 h-px bg-white/10"></div>
            <span className="px-3 text-gray-500 text-xs font-medium uppercase tracking-wider">
              Or continue with
            </span>
            <div className="flex-1 h-px bg-white/10"></div>
          </div>

          <div className="flex flex-col gap-3">
            {/* Apple Login */}
            <button
              type="button"
              className="w-full flex items-center gap-3 justify-center bg-black hover:bg-zinc-900 py-3 rounded-full text-white text-sm font-medium transition-colors"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M16.365 1.43c.01.14.01.28.01.42 0 .41-.06.83-.18 1.24a4.38 4.38 0 0 1-1.01 1.78 3.93 3.93 0 0 1-1.58.99c-.23.07-.47.11-.71.11a1.16 1.16 0 0 1-.19-.01c.01-.15.02-.3.02-.46 0-.4.06-.82.19-1.23.13-.41.32-.79.57-1.13.25-.34.57-.63.96-.85.39-.22.84-.34 1.36-.36.1 0 .21-.01.31-.01.15 0 .3.01.45.03zM20.26 17.73c-.21.46-.45.89-.71 1.3-.37.6-.72 1.1-1.06 1.5-.43.51-.88.98-1.38 1.4-.56.47-1.06.8-1.51 1-.39.16-.8.24-1.23.24-.32 0-.63-.05-.92-.14-.33-.11-.67-.17-1-.17-.35 0-.7.06-1.05.17-.29.09-.59.14-.9.14-.44 0-.86-.08-1.26-.25-.47-.2-.96-.52-1.49-.97-.53-.45-1.03-.98-1.5-1.6-.4-.56-.78-1.15-1.14-1.78-.4-.72-.72-1.48-.94-2.28-.24-.9-.36-1.77-.36-2.6 0-.96.2-1.79.6-2.48.32-.56.74-1.03 1.27-1.39.53-.36 1.1-.55 1.72-.57.34 0 .76.06 1.25.19.49.13.86.19 1.11.19.2 0 .55-.07 1.07-.21.53-.14.98-.22 1.36-.23.66-.03 1.28.15 1.84.54.56.39 1 .86 1.31 1.41-.52.32-.95.73-1.27 1.24-.41.64-.62 1.37-.62 2.19 0 .88.23 1.67.69 2.37.46.7 1.07 1.18 1.84 1.44.48.15.91.23 1.3.23.27 0 .6-.05.98-.14.38-.09.72-.21 1.01-.36-.08.28-.18.56-.3.83z" />
              </svg>
              Apple
            </button>

            {/* Google Login */}
            <button
              type="button"
              className="w-full flex items-center gap-3 justify-center bg-white border border-gray-200/10 hover:bg-gray-50 py-3 rounded-full text-gray-800 text-sm font-medium transition-colors"
            >
              <svg width="18" height="18" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M21.35 11.1h-9.17v2.98h5.27c-.23 1.3-.93 2.4-1.98 3.14v2.6h3.2c1.88-1.73 2.95-4.28 2.95-7.32 0-.62-.06-1.22-.17-1.8z"
                />
                <path
                  fill="#34A853"
                  d="M12.18 22c2.7 0 4.96-.9 6.61-2.44l-3.2-2.6c-.9.6-2.05.96-3.41.96-2.62 0-4.84-1.77-5.63-4.16H3.27v2.62C4.9 19.82 8.28 22 12.18 22z"
                />
                <path
                  fill="#FBBC05"
                  d="M6.55 13.76c-.2-.6-.3-1.24-.3-1.92s.11-1.32.3-1.92V7.3H3.27A9.79 9.79 0 0 0 2 11.84c0 1.68.4 3.26 1.27 4.53l3.28-2.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12.18 6.14c1.47 0 2.8.5 3.82 1.5l2.85-2.85A9.68 9.68 0 0 0 12.18 2c-3.9 0-7.28 2.18-8.9 5.3l3.28 2.62c.8-2.4 3.02-4.16 5.64-4.16z"
                />
              </svg>
              Google
            </button>
          </div>
        </form>
      </div>

      <SoftBackdrop />
    </>
  );
};

export default Login;
