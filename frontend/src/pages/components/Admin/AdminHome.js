import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Header from "./Header";
import TableUsers from "./TableUsers";
import { Container } from "@mui/material";
import Loading from "./Loading";
import styles from './admin.module.css'
import Navigation from '../Header/Navigation/Navigation'
const AdminHome = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  return (
    <div className="Container">
<<<<<<< HEAD
      <Header />
      <div></div>
=======
      <Navigation/>
      <div style={{marginTop:'30px'}}>
        <Container>
          <div className="d-flex align-items-center">
            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
              />
              <Button variant="outline-success" className=" pb-2">
                Search
              </Button>
            </Form>
          </div>
        </Container>
      </div>
>>>>>>> 81728f1b3cc487713eedb3e9faf578d154005c9d
      <Container>{isLoading ? <Loading /> : <TableUsers />}</Container>
    </div>
  );
};

export default AdminHome;
