import * as React from "react";
import { Container, Box, Button, Typography, Grid } from "@mui/material";
import classNames from "classnames/bind";
import styles from "./Home.module.css";
import { itemData } from "./ClassList";

const cx = classNames.bind(styles);

function Home() {
  return (
    <>
      <div style={{ position: "relative" }}>
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
        <Grid container spacing={2} sx={{ my: 4 }}>
          <Grid
            item
            md={4}
            sx={{
              p: 2,
            }}
          >
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
          </Grid>
          <Grid item md={8}>
            <div className={cx("class-container")}>
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
      <Grid>
        <Box
          sx={{
            p: 2,
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
            backgroundColor: "#9EABA6",
            color: "#000",
            borderRadius: "5px",
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
          <Typography variant="h4" align="center" sx={{ p: 10, mx: 20 }}>
            THE POWER OF POSITIVE MOVEMENT
            <Typography variant="h5">
              <br />
              We believe that when we move our bodies with intention, positivity
              and gratitude, we have the power to change our flow of energy and
              state of mind. Connecting every cell, every muscle, every breath,
              every heartbeat through focused dynamic movement – we’re able to
              push through what we think we are capable of.
            </Typography>
            <br />
            <Typography variant="h5">
              Transforming our mind as much as our body, our relationship with
              ourselves and the world around us to feel true strength from
              within. This, is the power of positive movement.
            </Typography>
            <br />
            <Typography variant="h5">
              Every time you step on to the mat, or the Coreformer, we’ll take
              you there. One move, one breath, one heartbeat at a time.
            </Typography>
            <Button
              color="inherit"
              variant="outlined"
              sx={{ borderRadius: "50px", my: "50px" }}
            >
              OUR STORY
            </Button>
          </Typography>
        </div>
      </Grid>
    </>
  );
}

export default Home;
