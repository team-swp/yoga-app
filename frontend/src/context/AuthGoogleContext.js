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
import { Howl } from "howler";
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
  const [checkLogin, setCheckLogin] = useState(true);
  const googleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (error) {
     console.log('error'); 
    }
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
              console.log('123');
            });
        });
      }
    });
    return () => {
      unsubscribe();
    };
  }, [user]);

  
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

  const soundPlay = (src) => {
    const sound = new Howl({
      src,
      html5: true,
    });
    sound.play();
  };

  const handleClick = (clicked) => setIsClicked({ ...initialState, [clicked]: true });

  return (
    <AuthContext.Provider
      value={{ googleSignIn, logOut, soundPlay, checkLogin,currentColor, currentMode, activeMenu, screenSize, setScreenSize, handleClick, isClicked, initialState, setIsClicked, setActiveMenu, setCurrentColor, setCurrentMode, setMode, setColor, themeSettings, setThemeSettings }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(AuthContext); //sử dụng kho
};  
