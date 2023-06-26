
import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Switch from "@mui/material/Switch";
import toast, { Toaster } from "react-hot-toast";

import _, { debounce } from "lodash";
import { getPremium, updatePremium } from "../../../../helper/premiumAPI";
import {
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import StatusButton from "./Statusbutton2";
import {  Link } from "react-router-dom";

function BasicExample() {
  const moment = require("moment");

  const [listUser, setListUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await getPremium();
        setListUsers(response.data);
      } catch {
        console.log("fail");
      }
    }

    fetchUsers();
  }, []);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleSearch = debounce((event) => {
    let term = event.target.value;
    if (term) {
      let cloneListUsers = _.cloneDeep(listUser);
      cloneListUsers = cloneListUsers.filter((item) =>
        item.premiumname.toLowerCase().includes(term)
      );
      setCurrentPage(1)
      setListUsers(cloneListUsers);
    } else {
      async function fetchUsers() {
        try {
          const response = await getPremium();
          setListUsers(response.data);
        } catch {
          console.log("fail");
        }
      }
      fetchUsers();
    }
  }, 500);

  const totalPages = Math.ceil(listUser.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  return (
    <div>
      <Container>
        <Toaster></Toaster>
        <TableContainer component={Paper} >
        
        <div
            style={{ float: "right", marginTop: "15px", marginRight: "10px" ,marginBottom:'10px'}}
          >
            <Button
              variant="contained"
              color="success"
              component={Link}
              to="/addnewpremium"
            >
              Add new package
            </Button>
          </div>
       <form  style={{
            
              padding: "15px",
              maxWidth: "800px",
              display: "flex",
              alignItems: "end",
              justifyContent: "left",
            }}
            onSubmit={handleSearch}>  
               <input
              placeholder="Search by name"
              className="border-solid border-2 border-black p-2"
              onChange={(event) => handleSearch(event)}
            />
            </form>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Premium name</TableCell>
                <TableCell>Original price</TableCell>
                <TableCell>Discount price</TableCell>
                <TableCell>Duration by months</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Disable/Enable</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {listUser &&
                listUser.length > 0 &&
                listUser.slice(startIndex, endIndex).map((item, index) => {
                  const handleStatusToggle = async () => {
                    const updatedList = [...listUser];
                    updatedList[startIndex + index].status = !item.status;
                    setListUsers(updatedList);
                    try {
                      await updatePremium({
                        _id: item._id,
                        status: updatedList[startIndex + index].status,
                      });
                      console.log("Status updated successfully.");
                      toast.success(`${item.premiumname} ` + " status updated success")
                      console.log(updatedList);
                    } catch {
                      console.log("error");
                    }
                  };

                  return (
                    <TableRow key={index}>
                      <TableCell>{startIndex + index + 1}</TableCell>
                      <TableCell >
                        {item.premiumname}
                      </TableCell>
                      <TableCell >
                        {item.priceOriginal}
                      </TableCell>
                      <TableCell >
                        {item.priceDiscount}
                      </TableCell>
                      <TableCell >
                        {item.durationByMonth}
                      </TableCell>
                      <TableCell >  <StatusButton status={item.status} /></TableCell>
                      <TableCell>
                        <Switch
                          checked={item.status}
                          onChange={handleStatusToggle}
                          color="primary"
                        />
                      </TableCell>
                      <TableCell style={{ textAlign: "center" }}>
                        <Button
                          variant="contained"
                          color="warning"
                          component={Link}
                          to={`/updatepremiumpack/${item._id}`}
                          style={{ fontSize: "10px" }}
                        >
                          Update & Detail
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <div className="pagination gap-7" style={{marginTop :'10px'}}>
          <Button
            disabled={currentPage === 1}
            onClick={handlePreviousPage}
            className="previous-button border"
            color="primary"
          >
            Previous
          </Button>

          {Array.from({ length: totalPages }, (_, index) => index + 1).map(
            (page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`page-button ${
                  currentPage === page ? "active" : ""
                }`}
              >
                {page}
              </button>
            )
          )}
          <Button
            className="next-button border"
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            color="primary"
          >
            Next
          </Button>
        </div>
      </Container>
    </div>
  );
}

export default BasicExample;
