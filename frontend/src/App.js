import "./App.css";
import{ RouterProvider } from "react-router-dom";
import routers from "./routes/routes";
import ScrollToTop from "./ScrollToTop";
function App() {
  return (
    <main>
      <RouterProvider router={routers}>
        <ScrollToTop />
      </RouterProvider>
    </main>
  );
}

export default App;
