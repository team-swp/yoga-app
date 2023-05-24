import "./App.css";
import { RouterProvider } from "react-router-dom";
import routers from "./components/routes/routes";
import Navigation from "./components/Navigation/Navigation";
import Footer from "./components/Footer/Footer";
function App() {
  return (
    <main>
      <Navigation />
      <RouterProvider router={routers}></RouterProvider>
      <Footer />
    </main>
  );
}

export default App;
