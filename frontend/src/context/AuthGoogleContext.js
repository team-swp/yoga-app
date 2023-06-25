import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { useContext, createContext } from "react";
import { auth } from "../firebases/firebase";
import { useEffect } from "react";
import { useState } from "react";
import {
  addUserLogin,
  setDataLogin,
  logOut,
  logOutNormal,
} from "../redux/actions";
import { useDispatch } from "react-redux";
import { verifyTokenGoogle } from "../helper/loginAPI";

const AuthContext = createContext(); //tạo ra 1 cái kho
const initialState = {
  chat: false,
  cart: false,
  userProfile: false,
  notification: false,
};
export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState({});
<<<<<<< HEAD
  const [checkLogin, setCheckLogin] = useState(true);
=======
>>>>>>> 2a44cf877dc5be9bc304ee6200ffa14b2023c744
  const googleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
  };
  const dispatch = useDispatch();
  const logOut = async () => {
    // if(user){
    signOut(auth);
    // }else{
    dispatch(logOutNormal(""));
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
<<<<<<< HEAD
        const tokenPromise = currentUser.getIdToken();
        tokenPromise.then((token) => {
          if(!checkLogin){
            return
          }
          setCheckLogin(false)
          const data = verifyTokenGoogle(token);
          data
            .then((data) => {
              dispatch(setDataLogin(data));
              setCheckLogin(true)
            })
            .catch((error) => {
              setCheckLogin(true)
              signOut(auth);
              dispatch(logOutNormal(""));
            });
        });
=======
        const token = await currentUser.getIdToken();
        const data = await verifyTokenGoogle(token);
        if (data) {
          dispatch(setDataLogin(data));
        }
>>>>>>> 2a44cf877dc5be9bc304ee6200ffa14b2023c744
      }
    });
    return () => {
      unsubscribe();
    };
  }, [user]);
<<<<<<< HEAD

  
  const [screenSize, setScreenSize] = useState(undefined);
  const [currentColor, setCurrentColor] = useState('#03C9D7');
  const [currentMode, setCurrentMode] = useState('Light');
  const [themeSettings, setThemeSettings] = useState(false);
  const [activeMenu, setActiveMenu] = useState(false);
  const [isClicked, setIsClicked] = useState(initialState);

  const setMode = (e) => {
    setCurrentMode(e.target.value);
    localStorage.setItem('themeMode', e.target.value);
  };

  const setColor = (color) => {
    setCurrentColor(color);
    localStorage.setItem('colorMode', color);
  };

  const handleClick = (clicked) => setIsClicked({ ...initialState, [clicked]: true });

  return (
    <AuthContext.Provider
      value={{ googleSignIn, logOut, soundPlay, checkLogin,currentColor, currentMode, activeMenu, screenSize, setScreenSize, handleClick, isClicked, initialState, setIsClicked, setActiveMenu, setCurrentColor, setCurrentMode, setMode, setColor, themeSettings, setThemeSettings }}
    >
=======

  return (
    <AuthContext.Provider value={{ googleSignIn, logOut }}>
>>>>>>> 2a44cf877dc5be9bc304ee6200ffa14b2023c744
      {children}
    </AuthContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(AuthContext); //sử dụng kho
};  
