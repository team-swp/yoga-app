import React, { useRef } from "react";
import emailjs from "@emailjs/browser";
import styled from "styled-components";
import { Card, Container, Typography } from "@mui/material";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import toast, { Toaster } from "react-hot-toast";

function Contact() {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_yogacenter",
        "template_yrleqf2",
        form.current,
        "-YAFmNEruf5IhQQTk"
      )
      .then(
        (result) => {
          console.log(result.text);
          toast.success("Message sent!");
        },
        (error) => {
          console.log(error.text);
        }
      );
  };

  return (
    <div>
      <Toaster />
      <Header />
      <Container
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          my: 10,
        }}
      >
        <Card raised sx={{ p: 5 }}>
          <StyledContactForm>
            <Typography variant="h4" align="center">
              Contact Us
            </Typography>
            <form ref={form} onSubmit={sendEmail}>
              <label>Name</label>
              <input type="text" name="user_name" />
              <label>Email</label>
              <input type="email" name="user_email" />
              <label>Message</label>
              <textarea name="message" />
              <input type="submit" value="Send" />
            </form>
          </StyledContactForm>
        </Card>
      </Container>
      <Footer />
    </div>
  );
}

export default Contact;

// Styles
const StyledContactForm = styled.div`
  width: 400px;

  form {
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    width: 100%;
    font-size: 16px;

    input {
      width: 100%;
      height: 35px;
      padding: 7px;
      outline: none;
      border-radius: 5px;
      border: 1px solid rgb(220, 220, 220);

      &:focus {
        border: 2px solid rgba(0, 206, 158, 1);
      }
    }

    textarea {
      max-width: 100%;
      min-width: 100%;
      width: 100%;
      max-height: 100px;
      min-height: 100px;
      padding: 7px;
      outline: none;
      border-radius: 5px;
      border: 1px solid rgb(220, 220, 220);

      &:focus {
        border: 2px solid rgba(0, 206, 158, 1);
      }
    }

    label {
      margin-top: 1rem;
    }

    input[type="submit"] {
      margin-top: 2rem;
      cursor: pointer;
      background: rgb(45, 85, 255);
      color: white;
      border: none;
    }
  }
`;
