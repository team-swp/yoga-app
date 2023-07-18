import React from "react";
import { AiFillEye } from "react-icons/ai";
import { MdDateRange } from "react-icons/md";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import newsImg from "../../../assets/news.jpg";
import { useNavigate } from "react-router-dom";
import moment from "moment";
function NewsRead({ item,size="50%" }) {
  const navigate = useNavigate()

  if(!item){
    navigate('/news')
  }
  return (
    <Card style={{ width: size, height: "auto", marginBottom: "10px" }}>
      <Card.Body
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "flex-start",
          gap: 20,
        }}
      >
        <h1 className="text-lg font-semibold mb-2">{item.subject}</h1>
        <Card.Img
          style={{ width: "80%", height: "auto" }}
          variant="top"
          src={item.image || newsImg}
        />
        <Card.Text>
        <p className="text-gray-500" style={{
              display: "flex",
              justifyContent: "left",
              alignItems: "left",
            }}>
          <MdDateRange style={{marginRight:'10px'}}></MdDateRange> {moment(item.createdAt).format("DD/MM/YY")}</p>
        </Card.Text>
        <p className="text-gray-500 mb-2">{item.content}</p>
      </Card.Body>
    </Card>
  );
}

export default NewsRead;
