import React, { useEffect, useState } from "react";
import Navigation from "../Header/Navigation/Navigation";
import Footer from "../Footer/Footer";
import yogaGif from "../../../assets/yoga-2.gif";
import styles from "./premium.module.css";
import { Box, Typography } from "@mui/material";
import SelfImprovementIcon from "@mui/icons-material/SelfImprovement";
import PremiumOption from "./PremiumOption";
import { getPremium } from "../../../helper/premiumAPI";
import toast from "react-hot-toast";
import { getUserByToken } from "../../../helper/loginAPI";
import { useDispatch } from "react-redux";
import { setPremiumData } from "../../../redux/actions";
import { useNavigate } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";
import SelfImprovementRoundedIcon from "@mui/icons-material/SelfImprovementRounded";
import SportsKabaddiRoundedIcon from "@mui/icons-material/SportsKabaddiRounded";
import CalendarMonthTwoToneIcon from "@mui/icons-material/CalendarMonthTwoTone";
import VolunteerActivismTwoToneIcon from "@mui/icons-material/VolunteerActivismTwoTone";
function Premium() {
  const [premiums, setPremiums] = useState([]);
  const [premiumStart, setPremiumStart] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    let arr = [];
    const premiumPromise = getPremium();
    premiumPromise
      .then((result) => {
        result.data.map((item) => {
          if (item.status) {
            arr.push(item);
            if (item.premiumname === "Half Love") {
              setPremiumStart(item);
            }
          }
        });
        setPremiums(arr);
        window.scrollTo(0, 0);
      })
      .catch(() => {
        toast.error("No premium option to show");
      });
  }, []);

  const handleSubmitStart = async () => {
    const getUserToken = getUserByToken();
    getUserToken
      .then(() => {
        dispatch(
          setPremiumData({
            premium_id: premiumStart._id,
            paymentAmount:
              premiumStart.priceDiscount || premiumStart.priceOriginal,
            duration: premiumStart.duration,
            premiumname: premiumStart.premiumname,
          })
        );
        navigate("/checkout");
      })
      .catch(() => {
        toast.error("Please Login Before To Be A Member");
        // navigate("/login");
      });
  };
  return (
    <>
      <Navigation />
      <div
        style={{ height: "500px" }}
        className="w-full bg-stone-400 flex justify-center justify-items-center items-center gap-20"
      >
        <div className="w-4/12 h-full text-white flex flex-col flex-wrap justify-center gap-6">
          <div>
            <Typography
              style={{ fontWeight: "900" }}
              className="font-extrabold"
              nowrap={false}
              variant="h4"
            ></Typography>
          </div>
          <div>
            <Typography
              style={{ fontWeight: "900" }}
              className="font-bold"
              nowrap={true}
              variant="h5"
            >
              Half Love Premium Package
            </Typography>
            <Typography className="font-bold" variant="subtitle1">
              ✓ You will get all the benefits from Spring Flower package
            </Typography>
            <Typography className="font-bold" variant="subtitle1">
              ✓ You will able to join our special yoga class at saturday weekly
            </Typography>
            <Typography className="font-bold" variant="subtitle1">
              ✓ You will only pay 1.690.000VND for this package instead of the
<<<<<<< HEAD
              4.500.000VND.
=======
              3.700.000VND.
>>>>>>> thienNH
            </Typography>
          </div>
          <div className="flex items-center gap-3 font-bold">
            <div onClick={handleSubmitStart} className={styles.startBtn}>
<<<<<<< HEAD
              Enroll
=======
              Enroll now
>>>>>>> thienNH
            </div>
            <a href="#premium_packet">
              <div className={styles.moreBtn}>Packages</div>
            </a>
          </div>
          <div>
            <Typography className="text-[10px]" variant="caption">
              Note: this special offers will end in 1/7/2023
            </Typography>
          </div>
        </div>
        <div className="w-96">
          <img src={yogaGif} alt="Yoga" />
        </div>
      </div>

      <div
        style={{ padding: "80px", color: "white" }}
        className="bg-stone-950 flex flex-col justify-center justify-items-center items-center gap-10"
      >
        <div>
          <Typography
            style={{ fontWeight: "900" }}
            className="font-bold"
            nowrap={true}
            variant="h4"
          >
<<<<<<< HEAD
            MINI PREMIUM PACKAGES
=======
            Premium Mini
>>>>>>> thienNH
          </Typography>
        </div>
        <div>
          <Typography className="font-bold" variant="h5">
<<<<<<< HEAD
          Able to learn all yoga classes for just 0$

          </Typography>
        </div>
        <div className="flex  justify-center justify-items-center items-center gap-2">
          <a href="#premium_packet">
            <div className={styles.tryByDay}>Free trial</div>
          </a>

          <a href="#premium_packet">
            <div className={styles.tryByDay}>Spring Flower</div>
          </a>
=======
            Able to learn all yoga classes for just 10$
          </Typography>
        </div>
        <div className="flex  justify-center justify-items-center items-center gap-2">
          <div className={styles.tryByDay}>
            <a href="#premium_packet">
              <div>Free trial</div>
            </a>
          </div>
          <div className={styles.tryByWeek}>
            <a href="#premium_packet">
              <div>Spring Flower</div>
            </a>
          </div>
>>>>>>> thienNH
        </div>
        <div>
          {/* <a>
            <Typography className="underline" variant="caption">
              Áp dụng điều khoản và điều kiện
            </Typography>
          </a> */}
        </div>
      </div>

      <div className="bg-white flex flex-col justify-center justify-items-center items-center py-20">
        <div style={{ marginBottom: "5%" }}>
          <Typography style={{ fontWeight: "900" }} variant="h4">
            The reason why you need to become our yoga center member
          </Typography>
        </div>
        <div className="flex justify-center justify-items-center items-center gap-40">
          <div className="flex flex-col justify-center justify-items-center items-center gap-4">
            <div className={styles.iconWhy}>
              <SelfImprovementRoundedIcon style={{ fontSize: "100px" }} />
            </div>
            <div>
              <Typography className={styles.title1}>
                Always available class
              </Typography>
            </div>
            <div>
              <Typography className={styles.title2}></Typography>
            </div>
          </div>
          <div className="flex flex-col justify-center justify-items-center items-center gap-4">
            <div className={styles.iconWhy}>
              <VolunteerActivismTwoToneIcon style={{ fontSize: "100px" }} />
            </div>
            <div>
              <Typography className={styles.title1}>
                Many special offers
              </Typography>
            </div>
            <div>
              <Typography className={styles.title2}></Typography>
            </div>
          </div>
          <div className="flex flex-col justify-center justify-items-center items-center gap-4">
            <div className={styles.iconWhy}>
              <SportsKabaddiRoundedIcon style={{ fontSize: "100px" }} />
            </div>
            <div>
              <Typography className={styles.title1}>
                Instructor passionate
              </Typography>
            </div>
            <div>
              <Typography className={styles.title2}></Typography>
            </div>
          </div>
          <div className="flex flex-col justify-center justify-items-center items-center gap-4">
            <div className={styles.iconWhy}>
              <CalendarMonthTwoToneIcon style={{ fontSize: "100px" }} />
            </div>
            <div>
              <Typography className={styles.title1}>
                Flexible schedule
              </Typography>
            </div>
            <div>
              {/* <Typography
                className={styles.title2}
              >{`Lịch Học (Flex)ible`}</Typography> */}
            </div>
          </div>
        </div>
      </div>

      <div
        id="premium_packet"
        className="py-20 flex flex-col justify-center justify-items-center items-center"
      >
        <div>
          <Typography style={{ fontWeight: 700 }} variant="h4">
            Select your Package to join us now
          </Typography>
        </div>
        <div>
          <Typography variant="body1"></Typography>
        </div>
        <div className="flex gap-2" style={{ marginBottom: "4%" }}>
          <div style={{ width: "40px" }}>
            <img
              src="https://play-lh.googleusercontent.com/o-_z132f10zwrco4NXk4sFqmGylqXBjfcwR8-wK0lO1Wk4gzRXi4IZJdhwVlEAtpyQ"
              alt="VNPAY"
            />
          </div>
          <div style={{ width: "40px" }}>
            <img
              src="data:image/png;base64,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"
              alt="VNPAY"
            />
          </div>
        </div>
        <div className="flex justify-between justify-items-center items-center flex-wrap gap-2">
          {premiums.map((premium, index) => (
            <PremiumOption premium={premium} />
          ))}
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Premium;
