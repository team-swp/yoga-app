import * as React from "react";
import {
  Container,
  Box,
  Button,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Typography,
  Grid,
} from "@mui/material";
import { itemData } from "./ClassList";
function Home() {
  return (
    <Container maxWidth="lg">
      <video autoPlay muted loop playsInline>
        <source src="/video.mp4" type="video/mp4" />
      </video>
      <main>
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
            <Box sx={{ width: "100%", height: 450 }}>
              <ImageList
                variant="standard"
                cols={2}
                gap={8}
                sx={{ position: "relative" }}
              >
                {itemData.map((item) => (
                  <ImageListItem key={item.id}>
                    <img
                      src={`${item.img}?w=250&fit=crop&auto=format`}
                      srcSet={`${item.img}?w=250&fit=crop&auto=format&dpr=2 2x`}
                      alt={item.title}
                      loading="lazy"
                      style={{ filter: "brightness(70%)" }}
                    />
                    <ImageListItemBar
                      title={item.title}
                      sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%,-50%)",
                        background: "none",
                        textAlign: "center",
                        fontWeight: 500,
                      }}
                    />
                  </ImageListItem>
                ))}
              </ImageList>
            </Box>
          </Grid>
        </Grid>
      </main>
    </Container>
  );
}

export default Home;
