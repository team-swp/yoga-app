import { Container } from "@mui/material";
import { useInView } from "react-intersection-observer";
import { Link } from "react-router-dom";
import yoga2 from "../../../assets/yoga2.jpg";
import classNames from "classnames/bind";
import styles from "./StaffManage.css"
import Header from "../Header/Header";
import Footer from "../Footer/Footer";



const cx = classNames.bind(styles);

function StaffManage() {

    return (<div>
        <Header />
        <div class="bg-gray-400">
            <div class="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8 py-2">
                <h1 class="text-black-100 text-center font-bold text-md sm:text-xs md:text-md lg:text-xl">
                    WELL COME BACK STAFF MANAGE
                </h1>
            </div>
        </div>
        <Container className={cx("class-container")}>
            <div
                className={cx("nav")}
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                <h1 className={cx("li")} style={{ margin: "0" }}>
                    <Link to="/manageclass">Manage Class</Link>
                </h1>
                <h1 className={cx("li")} style={{ margin: "0", marginLeft: "20px" }}>
                    <Link to="/manage-schedule">Manage Schedule</Link>
                </h1>
                <h1 className={cx("li")} style={{ margin: "0", marginLeft: "20px" }}>
                    <Link to="/managecourse">Manage Course</Link>
                </h1>
            </div>
        </Container>

        <div className={cx("courses-img-yoga2")}>
            <img src={yoga2} alt="yoga2" />
        </div>
        <Footer />
    </div>);
}

export default StaffManage;