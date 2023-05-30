import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
/*import all component*/
// import PageNotFound from "./components/Login/PageNotFound";
// import Password from "./components/Login/Password";
// import Recovery from "./components/Login/Recovery";
// import Register from "./components/Login/Register";
// import Reset from "./components/Login/Reset";
// import Username from "./components/Login/Username";
// import Profile from "./components/Profile/Profile";
import routers from './components/routes/routes'
// import {
//   AuthorizeUser,
//   ProtectRoute,
//   ProtectRouteOTP,
// } from "./middleware/auth.js";
//root Routes
// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <Username></Username>,
//   },
//   {
//     path: "/register",
//     element: <Register></Register>,
//   },
//   {
//     path: "/password",
//     element: (
//       <ProtectRoute>
//         <Password />
//       </ProtectRoute>
//     ),
//   },
//   {
//     path: "/profile",
//     element: (
//       <AuthorizeUser>
//         <Profile />
//       </AuthorizeUser>
//     ),
//   },
//   {
//     path: "/reset",
//     element: (
//       <ProtectRouteOTP>
//         <Reset />
//       </ProtectRouteOTP>
//     ),
//   },
//   {
//     path: "/recovery",
//     element: <Recovery></Recovery>,
//   },
//   {
//     path: "*",
//     element: <PageNotFound></PageNotFound>,
//   },
// ]);

function App() {
  return (
    <main>
      <RouterProvider router={routers}></RouterProvider>
    </main>
  );
}

export default App;
