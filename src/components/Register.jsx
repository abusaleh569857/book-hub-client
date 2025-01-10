// import { useContext, useState } from "react";
// import { IoEye } from "react-icons/io5";
// import { IoMdEyeOff } from "react-icons/io";
// import { Link, useNavigate } from "react-router-dom";
// import { AuthContext } from "./Provider/AuthProvider";
// import UseTitle from "./Title/UseTitle";

// const Register = () => {
//   UseTitle();
//   const { registerUser, updateUserProfile, googleLogin } =
//     useContext(AuthContext); // Added googleLogin
//   const navigate = useNavigate();

//   const [errorMessage, setErrorMessage] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [error, setError] = useState({});

//   const handleSignInForm = async (e) => {
//     e.preventDefault();
//     setErrorMessage("");

//     const name = e.target.name.value;
//     const photo = e.target.photo.value;
//     const email = e.target.email.value;
//     const password = e.target.password.value;
//     const checkBox = e.target.terms.checked;

//     if (name.length < 5) {
//       setError({ ...error, name: "Name should be more than 5 characters." });
//       return;
//     }

//     if (password.length < 6) {
//       setErrorMessage("Password must be at least 6 characters long.");
//       return;
//     }

//     const passwordRegex =
//       /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+[\]{}|;:'",.<>?/\\`~]).{6,}$/;

//     if (!passwordRegex.test(password)) {
//       setErrorMessage(
//         "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character."
//       );
//       return;
//     }

//     if (!checkBox) {
//       setErrorMessage("Please accept our terms & conditions!");
//       return;
//     }

//     try {
//       const result = await registerUser(email, password);
//       if (result?.user) {
//         const firebaseUser = result.user;

//         await updateUserProfile({ displayName: name, photoURL: photo });

//         const userData = {
//           name,
//           photo,
//           email,
//           uid: firebaseUser.uid,
//           borrowedBooks: [],
//         };

//         const response = await fetch("https://library-management-system-server-sand.vercel.app/users", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(userData),
//         });

//         const data = await response.json();
//         if (data.insertedId) {
//           console.log("User data saved to MongoDB:", data);
//           navigate("/");
//         } else {
//           console.error("Failed to save user data to MongoDB.");
//         }
//       } else {
//         setErrorMessage("User registration failed. Please try again.");
//       }
//     } catch (error) {
//       console.error("Error during registration:", error.message);
//       setErrorMessage(error.message);
//     }
//   };

//   // Handle Google Login
//   const handleGoogleLogin = async () => {
//     try {
//       const result = await googleLogin(); // Google Login
//       const firebaseUser = result.user;

//       const userData = {
//         name: firebaseUser.displayName,
//         photo: firebaseUser.photoURL,
//         email: firebaseUser.email,
//         uid: firebaseUser.uid,
//         borrowedBooks: [],
//       };

//       const response = await fetch("https://library-management-system-server-sand.vercel.app/users", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(userData),
//       });

//       const data = await response.json();
//       if (data.insertedId) {
//         console.log("User data saved to MongoDB:", data);
//         navigate("/");
//       } else {
//         console.error("Failed to save user data to MongoDB.");
//       }
//     } catch (error) {
//       console.error("Google login error:", error.message);
//       setErrorMessage(error.message);
//     }
//   };

//   return (
//     <div>
//       <div className="hero bg-pink-200 min-h-screen">
//         <div className="hero-content flex-col lg:flex ">
//           <h2 className="text-2xl font-semibold text-center">
//             Register your account
//           </h2>
//           <div className="card bg-pink-100 w-[500px] min-h-[400px]">
//             <form className="card-body" onSubmit={handleSignInForm}>
//               <div className="form-control">
//                 <label className="label">
//                   <span className="label-text">Name</span>
//                 </label>
//                 <input
//                   name="name"
//                   type="text"
//                   placeholder="Name"
//                   className="input input-bordered"
//                   required
//                 />
//               </div>
//               {error.name && (
//                 <label className="label text-sx text-red-500">
//                   {error.name}
//                 </label>
//               )}
//               <div className="form-control">
//                 <label className="label">
//                   <span className="label-text">Photo URL</span>
//                 </label>
//                 <input
//                   type="text"
//                   name="photo"
//                   placeholder="Photo URL"
//                   className="input input-bordered"
//                   required
//                 />
//               </div>
//               <div className="form-control">
//                 <label className="label">
//                   <span className="label-text">Email</span>
//                 </label>
//                 <input
//                   type="email"
//                   name="email"
//                   placeholder="Email"
//                   className="input input-bordered"
//                   required
//                 />
//               </div>
//               <div className="form-control relative">
//                 <label className="label">
//                   <span className="label-text">Password</span>
//                 </label>
//                 <input
//                   type={showPassword ? "text" : "password"}
//                   name="password"
//                   placeholder="Password"
//                   className="input input-bordered"
//                   required
//                 />
//                 <span
//                   className="text-2xl absolute right-2 top-12"
//                   onClick={() => setShowPassword(!showPassword)}
//                 >
//                   {showPassword ? <IoEye /> : <IoMdEyeOff />}
//                 </span>
//                 <label className=" flex gap-2 items-center my-3">
//                   <input
//                     type="checkbox"
//                     name="terms"
//                     className="checkbox checkbox-secondary"
//                   />
//                   <a
//                     href="#"
//                     className="label-text-alt link link-hover text-lg"
//                   >
//                     Accept Our Terms & Conditions
//                   </a>
//                 </label>
//               </div>
//               {errorMessage && (
//                 <p className="text-red-400 text-center">{errorMessage}</p>
//               )}
//               <div className="form-control mt-6">
//                 <button className="btn btn-primary">Register</button>
//               </div>
//               <div className="mt-4 text-center">
//                 <p>Or Register With:</p>
//                 <button
//                   type="button"
//                   className="btn btn-outline btn-secondary mt-2"
//                   onClick={handleGoogleLogin}
//                 >
//                   Google
//                 </button>
//               </div>
//               <div className="flex mt-3">
//                 <p className="text-xl text-left">Already have an account?</p>
//                 <span>
//                   <Link
//                     to="/login"
//                     className=" py-2 px-3 text-white bg-black rounded mt-3 mr-3"
//                   >
//                     Login Now
//                   </Link>
//                 </span>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Register;

import { useContext, useState } from "react";
import { IoEye } from "react-icons/io5";
import { IoMdEyeOff } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "./Provider/AuthProvider";
import UseTitle from "./Title/UseTitle";

const Register = () => {
  UseTitle();
  const { registerUser, updateUserProfile, googleLogin } =
    useContext(AuthContext); // Added googleLogin
  const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState({});

  const handleSignInForm = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    const name = e.target.name.value;
    const photo = e.target.photo.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const checkBox = e.target.terms.checked;

    if (name.length < 5) {
      setError({ ...error, name: "Name should be more than 5 characters." });
      return;
    }

    if (password.length < 6) {
      setErrorMessage("Password must be at least 6 characters long.");
      return;
    }

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+[\]{}|;:'",.<>?/\\`~]).{6,}$/;

    if (!passwordRegex.test(password)) {
      setErrorMessage(
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character."
      );
      return;
    }

    if (!checkBox) {
      setErrorMessage("Please accept our terms & conditions!");
      return;
    }

    try {
      const result = await registerUser(email, password);
      if (result?.user) {
        const firebaseUser = result.user;

        await updateUserProfile({ displayName: name, photoURL: photo });

        const userData = {
          name,
          photo,
          email,
          uid: firebaseUser.uid,
          borrowedBooks: [],
        };

        const response = await fetch(
          "https://library-management-system-server-sand.vercel.app/users",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
          }
        );

        const data = await response.json();
        if (data.insertedId) {
          console.log("User data saved to MongoDB:", data);
          navigate("/");
        } else {
          console.error("Failed to save user data to MongoDB.");
        }
      } else {
        setErrorMessage("User registration failed. Please try again.");
      }
    } catch (error) {
      console.error("Error during registration:", error.message);
      setErrorMessage(error.message);
    }
  };

  // Handle Google Login
  const handleGoogleLogin = async () => {
    try {
      const result = await googleLogin(); // Google Login
      const firebaseUser = result.user;

      const userData = {
        name: firebaseUser.displayName,
        photo: firebaseUser.photoURL,
        email: firebaseUser.email,
        uid: firebaseUser.uid,
        borrowedBooks: [],
      };

      const response = await fetch(
        "https://library-management-system-server-sand.vercel.app/users",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        }
      );

      const data = await response.json();
      if (data.insertedId) {
        console.log("User data saved to MongoDB:", data);
        navigate("/");
      } else {
        console.error("Failed to save user data to MongoDB.");
      }
    } catch (error) {
      console.error("Google login error:", error.message);
      setErrorMessage(error.message);
    }
  };

  return (
    <div>
      <div className="hero bg-pink-200 min-h-screen px-4 sm:px-8">
        <div className="hero-content flex-col lg:flex-row">
          <h2 className="text-2xl font-semibold text-center mb-6 lg:mb-0">
            Register your account
          </h2>
          <div className="card bg-pink-100 w-full max-w-xs sm:max-w-sm lg:max-w-lg min-h-[400px] mx-auto">
            <form className="card-body" onSubmit={handleSignInForm}>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  name="name"
                  type="text"
                  placeholder="Name"
                  className="input input-bordered"
                  required
                />
              </div>
              {error.name && (
                <label className="label text-sx text-red-500">
                  {error.name}
                </label>
              )}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Photo URL</span>
                </label>
                <input
                  type="text"
                  name="photo"
                  placeholder="Photo URL"
                  className="input input-bordered"
                  required
                />
              </div>
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
                <label className=" flex gap-2 items-center my-3">
                  <input
                    type="checkbox"
                    name="terms"
                    className="checkbox checkbox-secondary"
                  />
                  <a
                    href="#"
                    className="label-text-alt link link-hover text-lg"
                  >
                    Accept Our Terms & Conditions
                  </a>
                </label>
              </div>
              {errorMessage && (
                <p className="text-red-400 text-center">{errorMessage}</p>
              )}
              <div className="form-control mt-6">
                <button className="btn btn-primary">Register</button>
              </div>
              <div className="mt-4 text-center">
                <p>Or Register With:</p>
                <button
                  type="button"
                  className="btn btn-outline btn-secondary mt-2"
                  onClick={handleGoogleLogin}
                >
                  Google
                </button>
              </div>
              <div className="flex flex-col sm:flex-row sm:justify-between mt-3">
                <p className="text-xl">Already have an account?</p>
                <Link
                  to="/login"
                  className="py-2 px-3 text-white text-center bg-black rounded mt-3 sm:mt-0"
                >
                  Login Now
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
