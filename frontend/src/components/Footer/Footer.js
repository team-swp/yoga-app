import * as React from "react";
import classNames from "classnames/bind";
import styles from "./Footer.module.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Box, Typography, Container } from "@mui/material";
import Link from "@mui/material/Link";
import sun from "../../assets/logo-heartcore-icon-gold.png";

const cx = classNames.bind(styles);

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        HEARTBEAT
      </Link>
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function Footer() {
  return (
    <div className={cx("footer")}>
      <ThemeProvider theme={defaultTheme}>
        <Box
          component="footer"
          sx={{
            py: 3,
            px: 2,
            mt: "auto",
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[200]
                : theme.palette.grey[800],
          }}
        >
          <Container maxWidth="lg">
            <div className={cx("icon")}>
              <img src={sun} alt="sun-logo" />
            </div>
            <Copyright />
          </Container>
        </Box>
      </ThemeProvider>
    </div>
  );
}
