import { useInView } from "react-intersection-observer";
import { Container, Box, Button, Typography, Grid } from "@mui/material";
import classNames from "classnames/bind";
import styles from "./Home.module.css";
import { itemData, itemData2 } from "./ClassList";

const cx = classNames.bind(styles);

function Home() {
  const [refFirts, inViewFirst] = useInView({
    threshold: 0,
    rootMargin: "-100px",
  });

  const [refSecond, inViewSecond] = useInView({
    threshold: 0,
    rootMargin: "-100px",
  });

  return (
    <div>
      <div className={cx("video-main")} style={{ position: "relative" }}>
        <video autoPlay muted loop playsInline>
          <source src="/video.mp4" type="video/mp4" />
        </video>
        <div className={cx("text-in-video")}>
          <h1 className={cx("text-in-video_header")}> IN STUDIO</h1>
          <p>
            Transform your body, mind and heart with Reformer Pilates & Mat
            classes at one of our seven London studios.
          </p>
          <Button
            color="inherit"
            variant="outlined"
            sx={{ borderRadius: "50px", mt: "50px" }}
          >
            JOIN US NOW
          </Button>
        </div>
      </div>
      <Container>
        <Grid container spacing={2} sx={{ my: 10 }}>
          <Grid
            item
            md={4}
            sx={{
              p: 2,
            }}
          >
            <div className={cx("sticky")}>
              <Typography
                variant="h4"
                sx={{ letterSpacing: "1px", fontWeight: "bold" }}
              >
                OUR CLASS
                <Typography variant="subtitle1" sx={{ mt: 3 }}>
                  Inspired by the core principles of Pilates and the love of
                  movement, our classes are designed to shift your energy and
                  create long-lasting strength from within.
                </Typography>
                <Button
                  color="inherit"
                  variant="outlined"
                  sx={{ borderRadius: "50px" }}
                >
                  Discovery more
                </Button>
              </Typography>
            </div>
          </Grid>
          <Grid item md={8}>
            <div
              className={cx("class-container", { "in-view": inViewFirst })}
              ref={refFirts}
            >
              {itemData.map((item) => (
                <div key={item.id} className={cx("class-item")}>
                  <div className={cx("class-img")}>
                    <img src={item.img} alt={item.title} />
                  </div>
                  <div className={cx("class-info")}>
                    <h3>{item.title}</h3>
                  </div>
                  <div className={cx("class-place")}>
                    <p>{item.place}</p>
                  </div>
                </div>
              ))}
            </div>
          </Grid>
        </Grid>
      </Container>
      <Grid sx={{ py: 10 }}>
        <Box
          sx={{
            p: 2,
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
            backgroundColor: "#9EABA6",
            color: "#000",
            borderRadius: "2px",
          }}
        >
          <Typography variant="h5">BECOME A HEARTBEAT WARRIOR</Typography>
          <Button
            color="inherit"
            variant="outlined"
            sx={{ borderRadius: "50px" }}
          >
            JOIN US NOW
          </Button>
        </Box>
        <div className={cx("background-img")}>
          <div class="relative h-screen bg-cover bg-center flex flex-col justify-center items-center sm:p-10 lg:p-20 xl:p-32 2xl:p-40">
            <div class="max-w-3xl w-full mx-auto text-center text-black">
              <h4 class="text-4xl font-bold mb-8">
                THE POWER OF POSITIVE MOVEMENT
              </h4>
              <p class="text-lg mb-8">
                We believe that when we move our bodies with intention,
                positivity and gratitude, we have the power to change our flow
                of energy and state of mind. Connecting every cell, every
                muscle, every breath, every heartbeat through focused dynamic
                movement – we’re able to push through what we think we are
                capable of.
              </p>
              <p class="text-lg mb-8">
                Transforming our mind as much as our body, our relationship with
                ourselves and the world around us to feel true strength from
                within. This, is the power of positive movement.
              </p>
              <p class="text-lg mb-12">
                Every time you step on to the mat, or the Coreformer, we’ll take
                you there. One move, one breath, one heartbeat at a time.
              </p>
              <Button
                color="inherit"
                variant="outlined"
                sx={{ borderRadius: "50px" }}
              >
                OUR STORY
              </Button>
            </div>
          </div>
        </div>
      </Grid>
      <Container>
        <Grid container spacing={2} sx={{ my: 10 }}>
          <Grid
            item
            md={4}
            sx={{
              p: 2,
            }}
          >
            <div className={cx("sticky")}>
              <Typography
                variant="h4"
                sx={{ letterSpacing: "1px", fontWeight: "bold" }}
              >
                IN OUR GUESTS’ WORDS
              </Typography>
            </div>
          </Grid>
          <Grid item md={8}>
            <div
              className={cx("class-container", { "in-view": inViewSecond })}
              ref={refSecond}
            >
              {itemData2.map((item) => (
                <div key={item.id} className={cx("class-item-second")}>
                  <div className={cx("class-img-second")}>
                    <img src={item.img} alt={item.title} />
                  </div>
                  <div className={cx("class-date")}>{item.date}</div>
                  <div className={cx("class-content")}>
                    <p>"{item.content}"</p>
                  </div>
                  <div className={cx("class-author")}>
                    <cite>_{item.author}</cite>
                  </div>
                </div>
              ))}
            </div>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default Home;
