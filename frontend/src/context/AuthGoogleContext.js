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
export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const googleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    let test = await signInWithPopup(auth, provider);
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
        const token = await currentUser.getIdToken();
        console.log(token);
        const data = await verifyTokenGoogle(token);
        if (data) {
          dispatch(addUserLogin(data));
          dispatch(setDataLogin(data));
        }
      }
    });
    return () => {
      unsubscribe();
    };
  }, [user]);

  return (
    <AuthContext.Provider value={{ googleSignIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(AuthContext); //sử dụng kho
};
