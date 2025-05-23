import { Link, useNavigate } from "react-router-dom";
import { IoEye } from "react-icons/io5";
import { IoMdEyeOff } from "react-icons/io";
import { useContext, useState } from "react";
import { AuthContext } from "./Provider/AuthProvider";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "./Firebase/Firebase_init";
import axios from "axios";
import UseTitle from "./Title/UseTitle";

const Login = () => {
  UseTitle();
  const { loginUser, loading, error, setError } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();
    setError("");

    const email = e.target.email.value;
    const password = e.target.password.value;
    e.target.reset();

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    try {
      const result = await loginUser(email, password);
      if (result && result.user) {
        const user = { email: result.user.email };
        const res = await axios.post(
          "https://library-management-system-server-sand.vercel.app/login",
          user,
          {
            withCredentials: true,
          }
        );
        console.log("Login successful:", res.data);
        navigate("/");
      } else {
        setError("Login failed. Please try again.");
      }
    } catch (error) {
      console.error("Login error:", error.message);
      setError(error.message);
    }
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      if (user) {
        const userData = { email: user.email, name: user.displayName };
        const res = await axios.post(
          "https://library-management-system-server-sand.vercel.app/google-login",
          userData,
          {
            withCredentials: true,
          }
        );
        console.log("Google login successful:", res.data);
        navigate("/");
      }
    } catch (error) {
      console.error("Google login error:", error.message);
      setError("Failed to log in with Google. Please try again later.");
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold text-center">Login Now</h2>
      <div className="w-4/5 md:w-2/3 lg:w-1/2 mx-auto border card bg-base-100 my-5">
        <form className="card-body" onSubmit={handleSignIn}>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control relative">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              className="input input-bordered"
              required
            />
            <span
              className="text-2xl absolute right-2 top-12 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <IoEye /> : <IoMdEyeOff />}
            </span>
            <label className="label">
              <Link
                to={`/forgot-password?email=${
                  document.querySelector('input[name="email"]')?.value || ""
                }`}
                className="label-text-alt link link-hover"
              >
                Forgot password?
              </Link>
            </label>
          </div>
          {error && !loading && (
            <p className="text-center text-red-600">{error}</p>
          )}
          <div className="form-control mt-6">
            <button className="btn btn-primary" disabled={loading}>
              Login
            </button>
          </div>
          <div className="flex flex-col gap-5 md:flex-row mt-4">
            <p className="text-xl text-left">Don’t have an account?</p>
            <span>
              <Link
                to="/register"
                className="py-2 px-3 text-white bg-black rounded"
              >
                Register Now
              </Link>
            </span>
          </div>
        </form>

        <div className="mb-5 text-center">
          <button
            className="btn btn-outline btn-primary"
            onClick={handleGoogleLogin}
            disabled={loading}
          >
            Login with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
