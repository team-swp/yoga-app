import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Header from "./Header";
import TableUsers from "./TableUsers";
import { Container } from "@mui/material";
import Loading from "./Loading";

const AdminHome = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  return (
    <div className="Container">
      <Header />
      <div></div>
      <Container>{isLoading ? <Loading /> : <TableUsers />}</Container>
    </div>
  );
};

export default AdminHome;
