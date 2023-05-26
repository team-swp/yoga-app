import "./App.css";
import { RouterProvider } from "react-router-dom";
import routers from "./components/routes/routes";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
function App() {
  return (
    <main>
      <Header />
      <RouterProvider router={routers}></RouterProvider>
      <Footer />
    </main>
  );
}

export default App;
