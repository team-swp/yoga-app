import "./App.css";
import { RouterProvider } from "react-router-dom";
import routers from "./components/routes/routes";
import Navigation from "./components/Navigation/Navigation";

function App() {
  return (
    <main>
      <Navigation />
      <RouterProvider router={routers}></RouterProvider>
    </main>
  );
}

export default App;
