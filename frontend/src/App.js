import "./App.css";
import { RouterProvider } from "react-router-dom";
import routers from "./routes/routes";
import ScrollToTop from "./ScrollToTop";
import { AuthContextProvider } from "./context/AuthGoogleContext";
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

export default App;
