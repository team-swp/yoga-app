import React, { useEffect, useState } from "react";

import TableUsers from "./TableUsers";
import { Container } from "@mui/material";
import Loading from "./Loading";

import Navigation from "../Header/Navigation/Navigation";
const AdminHome = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1300);
  }, []);

  return (
    <div className="Container">
      <Navigation />
      <div className="bg-gray-400">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8 py-2">
          <h1 className="text-black-100 text-center font-bold text-md sm:text-xs md:text-md lg:text-xl">
            ADMIN MANAGER
          </h1>
        </div>
      </div>
      <div style={{ marginTop: "10px" }}>
        <Container>
          <div className="d-flex align-items-center"></div>
        </Container>
      </div>
      <Container>{isLoading ? <Loading /> : <TableUsers />}</Container>
    </div>
  );
};

export default AdminHome;
