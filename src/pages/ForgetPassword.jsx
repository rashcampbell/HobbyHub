// import React, { useEffect, useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import Swal from "sweetalert2";

// const ForgetPassword = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const queryParams = new URLSearchParams(location.search);
//   const emailParam = queryParams.get("email") || "";
  
//   const [email, setEmail] = useState(emailParam);

//   useEffect(() => {
//     if (emailParam) {
//       setEmail(emailParam);
//     }
//   }, [emailParam]);

//   const handleResetPassword = (e) => {
//     e.preventDefault();

//     if (!email) {
//       Swal.fire("Error", "Please enter your email address.", "error");
//       return;
//     }
//     Swal.fire({
//       title: "Success",
//       text: "A password reset link has been sent to your email.",
//       icon: "success",
//       confirmButtonText: "OK"
//     }).then(() => {
//       navigate("/");
//     });
//   };

//   return (
//     <div className="flex justify-center min-h-screen items-center">
//       <div className="card bg-base-100 w-full max-w-sm shadow-2xl p-8 rounded-lg">
//         <h2 className="font-semibold text-3xl text-center">Reset Password</h2>
//         <form onSubmit={handleResetPassword} className="card-body">
//           <label className="label">Email</label>
//           <input
//             name="email"
//             type="email"
//             className="input w-full"
//             placeholder="Enter your email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />
//           <button type="submit" className="btn btn-neutral mt-4 w-full">
//             Reset Password
//           </button>
//           <p className="font-semibold text-center mt-4">
//             Remembered your password?{" "}
//             <button
//               className="link link-secondary"
//               onClick={() => navigate("/auth/login")}
//             >
//               Login
//             </button>
//           </p>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default ForgetPassword;
