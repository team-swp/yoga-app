import "./App.css";
<<<<<<< HEAD
import{ RouterProvider } from "react-router-dom";
import routers from "./routes/routes";
import ScrollToTop from "./ScrollToTop";
=======
import { RouterProvider } from "react-router-dom";
import routers from "./routes/routes";
import ScrollToTop from "./ScrollToTop";

>>>>>>> b1a9988000110706692bcf3578a81dd5dc7dfe8f
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
