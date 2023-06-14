import "./App.css";
import { Navigate, RouterProvider } from "react-router-dom";
import routers from "./routes/routes";
import ScrollToTop from "./ScrollToTop";
import { AuthContextProvider } from "./context/AuthGoogleContext";
import { CheckTokenAccess } from "./middleware/auth";
import { useEffect } from "react";
import { getUserByToken } from "./helper/loginAPI";
import { useDispatch } from "react-redux";
import { addUserLogin, setDataLogin } from "./redux/actions";
function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    const checkToken = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token && token !== "undefined") {
          const getUserToken = await getUserByToken(); // Assuming this is an asynchronous function that returns a promise
          getUserToken
            .then((res) => {
              res.data.data = Object.assign(res.data.data, { token });
              dispatch(addUserLogin(res.data.data));
              dispatch(setDataLogin(res.data.data));
            })
            .catch((res) => {
              localStorage.removeItem("token");
              return <Navigate to={"/login"} replace={true}></Navigate>;
            });
        }
      } catch (error) {
        localStorage.removeItem("token");
        return <Navigate to={"/login"} replace={true} />;
      }
    };

    checkToken();
  }, []);

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
