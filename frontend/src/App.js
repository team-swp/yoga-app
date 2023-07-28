import "./App.css";
import { Navigate, RouterProvider } from "react-router-dom";
import routers from "./routes/routes";
import ScrollToTop from "./ScrollToTop";
import { AuthContextProvider } from "./context/AuthGoogleContext";


import * as Sentry from "@sentry/react";
function App() {
  return (
    <main>
      <AuthContextProvider>
        <RouterProvider router={routers}>
          <ScrollToTop />
        </RouterProvider>
      </AuthContextProvider>
    </main>
  );
}

export default Sentry.withProfiler(App);
