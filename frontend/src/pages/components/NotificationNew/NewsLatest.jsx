import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Card from "react-bootstrap/Card";
import { AiFillEye } from "react-icons/ai";
import { MdDateRange } from "react-icons/md";
import Navigation from "../Header/Navigation/Navigation";
// import newsImg from "../assets/img/news.jpg";
import newsImg from "../../../assets/news.jpg";

function NewsLatest() {
  const location = useLocation();
  const items = location.state.items.slice(0, 3);
  const itemOri = location.state.items;
  const navigate = useNavigate();
  const handleDetail = (item) => {
    navigate("/detail", { state: { item, items: itemOri } });
  };
  return (
   
    <>
   
    <div
      style={{ display: "flex", flexDirection: "column", width: "35%", gap: 4 }}
    >
      
      <p className="text-start" style={{ fontWeight: "900", fontSize: "30px" }}>
        Lastest News
      </p>
      {items.map((item) => (
        <Card
          style={{
            display: "flex",
            flexDirection: "row",
            height: "150px",
          }}
        >
          <Card.Body
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-start",
            }}
          >
            <Card.Img
              onClick={() => handleDetail(item)}
              style={{
                width: "40%",
                height: "auto",
                cursor: "pointer",
              }}
              variant="top"
              src={item.image || newsImg}
            />
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                marginLeft: "20px",
                
              }}
            >
              <Card.Title
                style={{
                  cursor: "pointer",
                  ":hover": {
                    color:'blue',
                  }
                }}
                onClick={() => handleDetail(item)}
              >
                {item.subject}
              </Card.Title>
              {/* <p className="text-start" style={{ height: "120px" }}>
                {item.subject}
              </p> */}
            </div>
          </Card.Body>
        </Card>
      ))}
    </div></>
   
  );
}

export default NewsLatest;
