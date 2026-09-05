import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  // Validate password whenever password changes
  useEffect(() => {
    if (password.length === 0) {
      setPasswordError("");
      return;
    }

    if (!passwordRegex.test(password)) {
      setPasswordError(
        "Password must contain at least 8 characters, uppercase, lowercase, number and special character."
      );
    } else {
      setPasswordError("");
    }
  }, [password]);

  // Check password match whenever either password changes
  useEffect(() => {
    if (confirmPassword.length === 0) {
      setConfirmPasswordError("");
      return;
    }

    if (password !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match.");
    } else {
      setConfirmPasswordError("");
    }
  }, [password, confirmPassword]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");

    // Final validations before API call
    if (!username.trim()) {
      setMessage("Username is required.");
      return;
    }

    if (!email.trim()) {
      setMessage("Email is required.");
      return;
    }

    if (!passwordRegex.test(password)) {
      setMessage("Please enter a valid password.");
      return;
    }

    if (password !== confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    const user = {
      username,
      email,
      password,
    };

    try {
      setLoading(true);

      const response = await axios.post(
        "http://localhost:8000/auth/register/",
        user
      );

      console.log(response.data);
      setMessage("Registration successful.");

      // Redirect to login after registration
      navigate("/login");
    } catch (error) {
      console.error(error);

      if (error.response) {
        setMessage(
          error.response.data.message ||
            "Registration failed. Please try again."
        );
      } else {
        setMessage("Cannot connect to server.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register">
      <div className="login">
        <div className="flex min-h-screen flex-col justify-center px-6 py-12 lg:px-8">

          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="mt-10 text-center text-2xl font-bold tracking-tight text-gray-900">
              Create your account
            </h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">

            {message && (
              <div className="mb-4 rounded-md bg-red-50 p-3 text-sm text-red-600">
                {message}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">

              {/* Username */}
              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-900"
                >
                  Username
                </label>

                <div className="mt-2">
                  <input
                    id="username"
                    type="text"
                    name="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 outline-gray-300 focus:outline-2 focus:outline-indigo-600"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-900"
                >
                  Email
                </label>

                <div className="mt-2">
                  <input
                    id="email"
                    type="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    autoComplete="email"
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 outline-gray-300 focus:outline-2 focus:outline-indigo-600"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-900"
                >
                  Password
                </label>

                <div className="mt-2">
                  <input
                    id="password"
                    type="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    autoComplete="new-password"
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 outline-gray-300 focus:outline-2 focus:outline-indigo-600"
                  />
                </div>

                {passwordError && (
                  <p className="mt-2 text-sm text-red-500">
                    {passwordError}
                  </p>
                )}
              </div>

              {/* Confirm Password */}
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-gray-900"
                >
                  Confirm Password
                </label>

                <div className="mt-2">
                  <input
                    id="confirmPassword"
                    type="password"
                    name="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    autoComplete="new-password"
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 outline-gray-300 focus:outline-2 focus:outline-indigo-600"
                  />
                </div>

                {confirmPasswordError && (
                  <p className="mt-2 text-sm text-red-500">
                    {confirmPasswordError}
                  </p>
                )}
              </div>

              {/* Submit */}
              <div>
                <button
                  type="submit"
                  disabled={
                    loading ||
                    passwordError !== "" ||
                    confirmPasswordError !== ""
                  }
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 disabled:cursor-not-allowed disabled:bg-gray-400"
                >
                  {loading ? "Creating account..." : "Sign Up"}
                </button>
              </div>
            </form>

            <p className="mt-10 text-center text-sm text-gray-500">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-semibold text-indigo-600 hover:text-indigo-500"
              >
                Sign In
              </Link>
            </p>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;