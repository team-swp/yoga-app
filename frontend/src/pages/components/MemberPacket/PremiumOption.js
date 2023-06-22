import React, { useEffect, useState } from "react";
import DoneIcon from "@mui/icons-material/Done";
import { Box, Typography } from "@mui/material";
import styles from "./premium.module.css";
import { useDispatch, useSelector } from "react-redux";
import { setPremiumData } from "../../../redux/actions";
import { useNavigate } from "react-router-dom";
import { getUserByToken, updateUser } from "../../../helper/loginAPI";
import { Toaster, toast } from "react-hot-toast";
import { addBooking } from "../../../helper/bookingAPI";
import { userSelector } from "../../../redux/selectors";
import { addPayment } from "../../../helper/paymentAPI";
import { sendMail } from "../../../helper/mailAPI";
import { Modal } from "@mui/base";
import zIndex from "@mui/material/styles/zIndex";
import Loader from "../Loading/Loader";
import { UserAuth } from "../../../context/AuthGoogleContext";
function PremiumOption({ premium }) {
  const [benefit, setBenefit] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(userSelector);
  var priceOriginalFormat = premium.priceOriginal.toLocaleString("en", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
  if (premium.priceDiscount) {
    var priceDiscountFormat = premium.priceDiscount.toLocaleString("en", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
  }
  const [check, setCheck] = useState(true);

  useEffect(() => {
    const benefitArray = premium.benefit.split(",");
    setBenefit(benefitArray);
  }, []);
  const handleSubmit = () => {
    if (!check) {
      return;
    }
    setCheck(false);
    const getUserToken = getUserByToken();
    getUserToken
      .then(() => {
        dispatch(
          setPremiumData({
            premium_id: premium._id,
            paymentAmount: premium.priceDiscount || premium.priceOriginal,
            duration: premium.durationByMonth,
            premiumname: premium.premiumname,
          })
        );
        if (premium.priceOriginal === 0 || premium.priceDiscount === 0) {
          const bookingPromise = addBooking({
            member_id: user._id,
            meta_data: `"isTry":true`,
            isTry: true,
          });
          toast.promise(bookingPromise, {
            loading: "Checking...",
            success: <b>Register Member Successfully...!</b>,
            error: <b>Your Trial Has Expired!</b>,
          });
          bookingPromise
            .then((result) => {
              const date = new Date();
              const dateString = date.toISOString();
              const bookingData = result.data.data.result;
              const paymentPromise = addPayment({
                recipient: "Yoga HeartBeat",
                paymentDate: dateString,
                paymentAmount: 0,
                paymentMethod_id: "647496600eeb65cda05ee191",
                booking_id: bookingData._id,
                premium_id: premium._id,
                status: 4,
              });
              paymentPromise.then((result) => {
                toast.success("Successful");
                const urlID = result.data.data.result._id;
                const updateUserPromise = updateUser({
                  meta_data: `{"isMember":true,"isTry":true}`,
                });
                sendMail({
                  username: user.username,
                  userEmail: user.email,
                  text: `We are pleased to inform you that your payment (id; ${urlID}) for ${premium.premiumname} package has been successfully processed, please go to yoga center to complete your payment. Thank you for your purchase and for choosing our services. If you have any questions or need further assistance, please don't hesitate to contact our support team.`,
                });
                setCheck(true);
                navigate(`/paymentstatus?pmid=${urlID}`);
              });
            })
            .catch(() => {
              setCheck(true);
            });
        } else {
          setCheck(true);
          navigate("/checkout");
        }
      })
      .catch(() => {
        setCheck(true);
        toast.error("Please Login Before To Be A Member");
        // navigate("/login");
      });
  };
  return (
    <>
      <div>
        <Box
          key={premium._id}
          className={styles.premiumOption}
          sx={{
            width: 350,
            height: 500,
            // backgroundColor: "primary.dark",
            // '&:hover': {
            //   backgroundColor: 'primary.main',
            //   opacity: [0.9, 0.8, 0.7],
            // },
          }}
        >
          <Toaster></Toaster>
          <div className="p-5 py-3">
            <div
              className="flex flex-col "
              style={{
                borderBottom: "1px solid black",
                paddingBottom: "10%",
                marginBottom: "5%",
              }}
            >
              <div className="w-fit">
                <Typography
                  className="p-1 px-2"
                  style={{
                    fontWeight: 900,
                    fontSize: "14px",
                    borderRadius: "5px",
                    backgroundColor: "#0d72ea",
                    color: "#ffffff",
                    marginBottom: "8px",
                  }}
                >
                  {priceDiscountFormat === 0
                    ? "Try Now"
                    : "" || priceOriginalFormat}{" "}
                  VND
                </Typography>
              </div>
              <div>
                <Typography style={{ fontWeight: 700 }} variant="h5">
                  {premium.premiumname}
                </Typography>
              </div>
              <div style={{ height: "60px" }}>
                <Typography nowrap={true}>{premium.description}</Typography>
              </div>
            </div>
            <Box sx={{ height: 180 }}>
              {benefit.map((item) => (
                <div className="flex flex-wrap mb-2">
                  <Typography
                    style={{ lineHeight: "22px" }}
                    className="break-all flex gap-2"
                  >
                    <DoneIcon />
                    {item}
                  </Typography>
                </div>
              ))}
            </Box>
            <div
              onClick={handleSubmit}
              className={`${styles.startBuyBtn} flex justify-center mb-4`}
            >
              <Typography style={{ fontWeight: 700 }}>BẮT ĐẦU</Typography>
            </div>
            <div>
              <Typography className="underline" variant="caption">
                {premium.rules}
              </Typography>
            </div>
          </div>
        </Box>
      </div>
    </>
  );
}

export default PremiumOption;
