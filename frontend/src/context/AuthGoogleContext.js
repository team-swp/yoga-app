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
import { Howl } from "howler";

const AuthContext = createContext(); //tạo ra 1 cái kho
export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [checkLogin, setCheckLogin] = useState(false);
  const googleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
  };
  const dispatch = useDispatch();
  const logOut = async () => {
    // if(user){
    signOut(auth);
    // }else{
    dispatch(logOutNormal(""));
  };

  const soundPlay = (src) => {
    const sound = new Howl({
      src,
      html5: true,
    });
    sound.play();
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        const token = await currentUser.getIdToken();
        const data =  verifyTokenGoogle(token);
        data.then((data)=>{
          setCheckLogin(true)
          dispatch(setDataLogin(data));
        })
        .catch((error)=>{
          setCheckLogin(false)
          console.log(checkLogin);
          signOut(auth);
          dispatch(logOutNormal(""));
        })
      }
    });
    return () => {
      unsubscribe();
    };
  }, [user]);

  return (
    <AuthContext.Provider value={{ googleSignIn, logOut,soundPlay, checkLogin}}>
      {children}
    </AuthContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(AuthContext); //sử dụng kho
};
