import { useState, useEffect } from "react";
import { Modal, Button, Fade } from "@mui/material";
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
import { Link } from "react-router-dom";

function BasicExample() {
  const [listUser, setListUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);

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
      setCurrentPage(1);
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

  const handleToggleStatus = (itemId) => {
    setSelectedItemId(itemId);
    setShowConfirmModal(true);
  };
  const handleCancel = async () =>{
    setShowConfirmModal(false)
  }

  const handleStatusToggleConfirm = async () => {
    setShowConfirmModal(false);

    const updatedList = [...listUser];
    const selectedItem = updatedList.find((item) => item._id === selectedItemId);
    selectedItem.status = !selectedItem.status;

    setListUsers(updatedList);

    try {
      await updatePremium({
        _id: selectedItemId,
        status: selectedItem.status,
      });

      console.log("Status updated successfully.");
      toast.success(`${selectedItem.premiumname} status updated successfully.`);
      console.log(updatedList);
    } catch {
      console.log("error");
    }
  };

  return (
    <div>
      <Container>
        <Toaster></Toaster>
        <TableContainer component={Paper}>
          <div
            style={{ float: "right", marginTop: "15px", marginRight: "10px", marginBottom: "10px" }}
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
          <form
            style={{
              padding: "15px",
              maxWidth: "800px",
              display: "flex",
              alignItems: "end",
              justifyContent: "left",
            }}
            onSubmit={handleSearch}
          >
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
              {listUser.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={9}
                    align="center"
                    style={{ fontSize: "30px" }}
                  >
                    The result is not available !!!
                  </TableCell>
                </TableRow>
              ) : (
                listUser &&
                listUser.length > 0 &&
                listUser.slice(startIndex, endIndex).map((item, index) => {
                  return (
                    <TableRow key={index}>
                      <TableCell>{startIndex + index + 1}</TableCell>
                      <TableCell>{item.premiumname}</TableCell>
                      <TableCell>{item.priceOriginal}</TableCell>
                      <TableCell>{item.priceDiscount}</TableCell>
                      <TableCell>{item.durationByMonth}</TableCell>
                      <TableCell>
                        <StatusButton status={item.status} />
                      </TableCell>
                      <TableCell>
                        <Switch
                          checked={item.status}
                          onChange={() => handleToggleStatus(item._id)}
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
                })
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <div className="pagination gap-7" style={{ marginTop: "10px" }}>
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
        <Modal
        open={showConfirmModal}
        onClose={handleCancel}
        closeAfterTransition
      >
        <Fade in={showConfirmModal}>
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}>
            <Paper style={{ width: "400px", padding: "2em", backgroundColor: "#fff", borderRadius: "8px", boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)", textAlign: "center" }} elevation={3}>
              <h3 style={{ marginBottom: "1em", fontSize: "1.5em", fontWeight: "bold" }}>
                Confirmation
              </h3>
              <p>Are you sure you want to change the status of this Course?</p>
              <div style={{ display: "flex", justifyContent: "center", marginTop: "2rem" }}>
                <Button variant="contained" onClick={handleStatusToggleConfirm} style={{ marginRight: "1rem", backgroundColor: "black" }}>
                  Confirm
                </Button>
                <Button variant="outlined" onClick={handleCancel} style={{ backgroundColor: "#fff", color: "#000", border: "2px solid #000" }}>
                  Cancel
                </Button>
              </div>
            </Paper>
          </div>
        </Fade>
      </Modal>
      </Container>
    </div>
  );
}

export default BasicExample;
