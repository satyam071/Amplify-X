import { Formik } from "formik";
import React, { useState } from "react";
import { loginUser, registerUser } from "../Api/User.auth"
import { useDispatch } from "react-redux";
import { loginFailure, loginStart, loginSuccess } from "../Redux/slices/loginSlice";
import { useSelector } from "react-redux";
import type { RootState } from "../Redux/store";
import { useNavigate } from "react-router-dom";

const AuthPage: React.FC = () => {
  const [authOption, setAuthOption] = useState("login");
  const [role, setRole] = useState<"user" | "artist">("user");
  const dispatch = useDispatch();
  const { user, isLoggedIn, loading } = useSelector(
    (state: RootState) => state.login
  );
  const [showSuccess, setShowSuccess] = useState(false);
  const navigate = useNavigate();


  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-[#0f0f0f] via-[#171717] to-[#0a0a0a] px-4">

      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl p-8">

        {/* Heading */}
        <div className="mb-8">
          {authOption === "login" ? (
            <>
              <h1 className="text-3xl font-bold text-white">
                Get back to work!
              </h1>
              <p className="text-sm text-gray-400 mt-2">
                Login to continue to your account.
              </p>
            </>
          ) : (
            <>
              <h1 className="text-3xl font-bold text-white">
                Register here!
              </h1>
              <p className="text-sm text-gray-400 mt-2">
                Create your account and get started.
              </p>
            </>
          )}
        </div>

        <Formik
          initialValues={{
            username: "",
            email: "",
            password: "",
            role: ""
          }}
          validate={(values) => {
            const errors: {
              email?: string;
              username?: string;
              password?: string;
              role?: string;
            } = {};
            
            if (!values.username) {
              errors.username = "Required";
            }

            // Password — required for both login and register
            if (!values.password) {
              errors.password = "Required";
            }

            // Email — only required during registration
            if (authOption === "register") {
              if (!values.email) {
                errors.email = "Required";
              } else if (
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
              ) {
                errors.email = "Invalid email address";
              }

              // Role — only required during registration
              if (!values.role) {
                errors.role = "Required";
              }
            }


            return errors;
          }}
          onSubmit={async (values, { setFieldValue }) => {

            if (authOption === "login") {
              try {
                dispatch(loginStart());
                const response = await loginUser(values)
                dispatch(loginSuccess(response.user));
                let result = response.user
                console.log({
                  message: "login success",
                  result,
                })
                navigate("/")


              } catch (error) {
                dispatch(loginFailure());
              }

            } else if (authOption === "register") {
              try {
                const response = await registerUser(values)
                let result = response.user
                console.log({
                  message: "register success",
                  result,
                })
                setAuthOption("login")
                setShowSuccess(true);

                setTimeout(() => {
                  setShowSuccess(false);
                }, 5000);

              } catch (error) {
                console.log(error)
              }
            }


          }}

        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            setFieldValue,
          }) => (
            <form
              className="flex flex-col gap-5"
              onSubmit={handleSubmit}
            >

              {/* Username */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-gray-200">
                  Username
                </label>

                <input
                  className={`w-full rounded-lg border bg-black/30 px-2 py-1 text-white outline-none transition-all placeholder:text-gray-600
                    ${errors.username && touched.username
                      ? "border-red-500 focus:ring-2 focus:ring-red-500/20"
                      : "border-white/10 focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20"
                    }`}
                  type="text"
                  name="username"
                  placeholder="Enter your username"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.username}
                />

                {errors.username && touched.username && (
                  <p className="text-xs text-red-400">
                    {errors.username}
                  </p>
                )}
              </div>

              {/* Email */}
              {authOption === "register" ? (<div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-gray-200">
                  Email
                </label>

                <input
                  className={`w-full rounded-lg border bg-black/30 px-2 py-1 text-white outline-none transition-all placeholder:text-gray-600
                    ${errors.email && touched.email
                      ? "border-red-500 focus:ring-2 focus:ring-red-500/20"
                      : "border-white/10 focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20"
                    }`}
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                />

                {errors.email && touched.email && (
                  <p className="text-xs text-red-400">
                    {errors.email}
                  </p>
                )}
              </div>) : (
                <div></div>
              )}

              {/* Password */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-gray-200">
                  Password
                </label>

                <input
                  className={`w-full rounded-lg border bg-black/30 px-2 py-1 text-white outline-none transition-all placeholder:text-gray-600
                    ${errors.password && touched.password
                      ? "border-red-500 focus:ring-2 focus:ring-red-500/20"
                      : "border-white/10 focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20"
                    }`}
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                />

                {errors.password && touched.password && (
                  <p className="text-xs text-red-400">
                    {errors.password}
                  </p>
                )}
              </div>

              {/* role */}
              {authOption === "register" ? (<div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-gray-200">
                  Artist / User?
                </label>

                <div className="flex w-full rounded-lg border border-white/10 bg-black/30 p-1">
                  <button
                    type="button"
                    onClick={() => setFieldValue("role", "user")}
                    className={`w-1/2 rounded-md py-2 text-sm transition-all duration-300 ${values.role === "user"
                      ? "bg-amber-400 text-black"
                      : "text-gray-400 hover:text-white"
                      }`}
                  >
                    User
                  </button>

                  <button
                    type="button"
                    onClick={() => setFieldValue("role", "artist")}
                    className={`w-1/2 rounded-md py-2 text-sm transition-all duration-300 ${values.role === "artist"
                      ? "bg-amber-400 text-black"
                      : "text-gray-400 hover:text-white"
                      }`}
                  >
                    Artist
                  </button>
                </div>

                {errors.role && touched.role && (
                  <p className="text-xs text-red-400">
                    {errors.role}
                  </p>
                )}
              </div>) : (
                <div></div>
              )}

              {/* Submit */}
              <button

                type="submit"
                disabled={isSubmitting}
                className="mt-2 w-full rounded-lg bg-amber-400 py-3 font-semibold text-black transition-all duration-200 hover:bg-amber-300 hover:shadow-lg hover:shadow-amber-400/20 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading ? (<div className="flex items-center justify-center gap-1">
                  <span className="animate-bounce [animation-delay:-0.3s]">.</span>
                  <span className="animate-bounce [animation-delay:-0.15s]">.</span>
                  <span className="animate-bounce">.</span>
                </div>) : (authOption === "login" ? "Login" : "Create Account")}
              </button>
            </form>
          )}
        </Formik>

        {/* Switch Login/Register */}
        <div className="mt-7 text-center text-sm text-gray-400">
          {authOption === "login" ? (
            <>
              Don't have an account?{" "}
              <button
                type="button"
                onClick={() => setAuthOption("register")}
                className="font-medium text-amber-400 underline underline-offset-4 transition-colors hover:text-amber-300"
              >
                Register instead
              </button>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => setAuthOption("login")}
                className="font-medium text-amber-400 underline underline-offset-4 transition-colors hover:text-amber-300"
              >
                Login instead
              </button>
            </>
          )}
        </div>



      </div>
      {showSuccess && (
        <div className="fixed top-5 right-5 z-50 transition-all ease-in-out delay-500">
          <div className="rounded-lg border border-green-500/30 bg-black/90 px-5 py-4 text-white shadow-lg backdrop-blur-md">
            <p className="font-medium">✓ Account created!</p>
            <p className="text-sm text-gray-400">
              Your account has been created successfully.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AuthPage;