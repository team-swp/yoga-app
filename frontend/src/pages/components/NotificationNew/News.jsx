import { AiFillEye } from "react-icons/ai";
import { MdDateRange } from "react-icons/md";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
// import newsImg from '../assets/img/news.jpg'
import { useNavigate } from "react-router-dom";
import yogaGif from "../../../assets/yoga-2.gif";
import Navigation from "../Header/Navigation/Navigation";
import moment from "moment";
function News({ item, items }) {
 
  const navigate = useNavigate();
  const handleDetail = () => {
    navigate("/detail", { state: { item, items } });
  };
  return (
    <>
      <Card style={{ width: "20%", marginBottom: "60px" }}>
        <Card.Img
          style={{ width: "100%", height: "300px" }}
          variant="top"
          src={yogaGif}
        />
        <Card.Body>
          <h3 className="text-lg font-semibold mb-2">{item.subject}</h3>
          <p className="text-gray-500" style={{
              display: "flex",
              justifyContent: "left",
              alignItems: "left",
            }}>
          <MdDateRange style={{marginRight:'10px'}}></MdDateRange> {moment(item.createdAt).format("DD/MM/YY")}</p>
          <Card.Text style={{ height: "120px" }} className="text-gray-500 mb-2">
            {item.content}
          </Card.Text>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop:'20px'
            }}
          >
            
            <Button onClick={handleDetail} variant="primary" style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}>
            <AiFillEye style={{marginRight:'5px'}}/>  Xem chi tiết
            </Button>
          </div>
        </Card.Body>
      </Card>
    </>
  );
}

export default News;
