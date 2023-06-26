import React from "react";
import Navigation from "../Header/Navigation/Navigation";
import Footer from "../Footer/Footer";
import yogaGif from "../../../assets/yoga-2.gif";
import styles from "./premium.module.css";
import { Typography } from "@mui/material";
import SelfImprovementIcon from '@mui/icons-material/SelfImprovement';
function Premium() {
  return (
    <>
      <Navigation />
      <div
        style={{ height: "500px" }}
        className="w-full bg-current flex justify-center justify-items-center items-center gap-20"
      >
        <div className="w-4/12 h-full text-white flex flex-col flex-wrap justify-center gap-6">
          <div>
            <Typography className="font-bold" nowrap={false} variant="h4">
              59,000₫ cho 4 tháng dùng gói Premium
            </Typography>
          </div>
          <div>
            <Typography className="font-bold" variant="subtitle1">
              Ưu đãi kết thúc vào ngày 18/06/2023. Nghe nhạc không quảng cáo và
              không cần kết nối mạng. Sau đó chỉ 59,000₫/tháng. Hủy bất cứ lúc
              nào.
            </Typography>
          </div>
          <div className="flex items-center gap-3 font-bold">
            <div className={styles.startBtn}>Bắt đầu</div>
            <a href="#premium_packet">
              <div className={styles.moreBtn}>Xem các gói</div>
            </a>
          </div>
          <div>
            <Typography className="text-[10px]" variant="caption">
              Chỉ áp dụng cho gói Individual. Sau đó là 59,000₫/tháng. Ưu đãi
              kết thúc vào ngày 18/06/2023. Có áp dụng các điều khoản và điều
              kiện. Ưu đãi không dành cho người đã dùng thử gói Premium.
            </Typography>
          </div>
        </div>
        <div className="w-96">
          <img src={yogaGif} alt="Yoga" />
        </div>
      </div>

      <div className="flex flex-col justify-center justify-items-center items-center">
        <div>
          <Typography className="font-bold" nowrap={true} variant="h4">
            Giới thiệu gói Premium Mini
          </Typography>
        </div>
        <div>
          {" "}
          <Typography className="font-bold" variant="h5">
            Tải 30 bài hát và nghe nhạc thỏa thích, không quảng cáo trên 1 thiết
            bị di động
          </Typography>
        </div>
        <div className="flex  justify-center justify-items-center items-center gap-2">
          <div className={styles.tryByDay}>Dùng 1 ngày chỉ với 2,300đ</div>
          <div className={styles.tryByWeek}>Dùng 1 tuần chỉ với 8,800đ</div>
        </div>
        <div>
          <a>
            <Typography variant="caption">Áp dụng điều khoản và điều kiện</Typography>
          </a>
        </div>
      </div>

      <div className="bg-cyan-600 flex flex-col justify-center justify-items-center items-center">
        <div><Typography variant="h4">Lý do dùng gói Premium?</Typography></div>
        <div className="flex justify-center justify-items-center items-center">
          <div>
              <div className=""><SelfImprovementIcon  style={{fontSize:'100px'}}/></div>
              <div><Typography>title</Typography></div>
          </div>
          <div>2</div>
          <div>3</div>
          <div>4</div>
        </div>
      </div>
      <div className="flex flex-col justify-center justify-items-center items-center">
        <div>1</div>
        <div>2</div>
        <div>3</div>
        <div
          id="premium_packet"
          className="flex justify-center justify-items-center items-center"
        >
          <div>1</div>
          <div>2</div>
          <div>3</div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Premium;
