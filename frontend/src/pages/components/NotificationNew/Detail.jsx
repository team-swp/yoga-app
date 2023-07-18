import React from "react";
// import MenuForm from "../components/MenuForm";
import NewsRead from "../NotificationNew/NewsRead";
import { useLocation } from "react-router-dom";

import NewsLatest  from "../NotificationNew/NewsLatest"
import Navigation from "../Header/Navigation/Navigation";
import Footer from "../Footer/Footer";
function Detail({ item }) {
  const location = useLocation();
  const itemGet = item || location.state.item;
  return (
    <div
    style={{
      backgroundImage:
        "url('https://assets.entrepreneur.com/content/3x2/2000/20200429211042-GettyImages-1164615296.jpeg')",
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
    }}
    >
      <Navigation/>
      {/* <MenuForm /> */}
      <div style={{ marginTop: "30px", display: "flex",justifyContent:'space-between' }}>
        <NewsRead item={itemGet} size={"60%"} />
        <NewsLatest />
      </div>
      <Footer/>
    </div>
  );
}

export default Detail;
