import { useState } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";
import { Typography } from "@mui/material";
function MenuForm({ isSearch = true, list, setList, listOrigin }) {
  const navigate = useNavigate();
  const location = useLocation();

  const [search, setSearch] = useState("");
  const handleSearch = () => {
    console.log();
    let listSearch = list;
    if (search === "") {
      setList(listOrigin);
    } else {
      listSearch = list.filter((item) =>
        item.subject.toLowerCase().includes(search.toLowerCase())
      );
      if (listSearch.length <= 0) {
        toast.error(`Cannot Found News Have Title With '${search}'`);
      }
      setList(listSearch);
    }
  };

  return (
    
    <Navbar expand="lg" className="bg-body-tertiary">
      <Toaster></Toaster>
      <Container fluid>
    
      
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              maxHeight: "100px"
            }}
           
            navbarScroll
          >
            {/* <Button
              active={
                location.pathname === "" || location.pathname === "/"
                  ? true
                  : false
              }
              variant="outline-primary"
              className="mx-2"
              onClick={() => navigate("/")}
            >
              Home
            </Button>
            <Button
              active={location.pathname === "/news" ? true : false}
              variant="outline-primary"
              className="mx-2"
              onClick={() => navigate("/news")}
            >
              News
            </Button>
            <Button
              active={location.pathname === "/contact" ? true : false}
              variant="outline-primary"
              className="mx-2"
              onClick={() => navigate("/contact")}
            >
              Contact
            </Button> */}
            {/* <NavDropdown title="Link" id="navbarScrollingDropdown">
              <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action4">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action5">
                Something else here
              </NavDropdown.Item>
            </NavDropdown> */}
          </Nav>
          {isSearch && (
            <Form  style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              maxHeight: "100px"
            }}>
              <Form.Control
                value={search}
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
                onChange={(e) => {
                  if (
                    e.target.value === "" &&
                    list.length !== listOrigin.length
                  ) {
                    toast.success("Please Click Search To See All News", {
                      icon: "🔍",
                      style: {
                        borderRadius: "10px",
                        background: "#333",
                        color: "#fff",
                      },
                    });
                  }
                  setSearch(e.target.value);
                }}
              />
              <Button onClick={handleSearch} variant="outline-success">
                Search
              </Button>
            </Form>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MenuForm;
