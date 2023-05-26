import "./App.css";
import { RouterProvider } from "react-router-dom";
import routers from "./components/routes/routes";
function App() {
  return (
    <main>
      <RouterProvider router={routers}></RouterProvider>
    </main>
  );
}

export default App;
