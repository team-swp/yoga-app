import { useEffect, useState } from "react";
import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Switch,
} from "@mui/material";
import { Link } from "react-router-dom";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import StatusButton from "./Statusbutton2";
import { updatePremium } from "../../../../helper/premiumAPI";

function ManagePremium() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const [packages, setPackages] = useState([]);
  const [updatedPackages, setUpdatedPackages] = useState({});

  const handleToggle = async (event, course) => {
    try {
      const updatedPackagesData = { ...course, status: event.target.checked };
      const response = await updatePremium(updatedPackagesData);
      if (response && response.data) {
        const updatedpackages = packages.map(
          (courseItem) =>
            courseItem._id === response.data._id ? response.data : courseItem,
          toast.success(
            `${response.data.data.premiumname} status updated success`
          )
        );
        setUpdatedPackages(updatedpackages);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchPackages();
  }, [updatedPackages]);

  async function fetchPackages() {
    const response = await axios.get(`http://localhost:3001/api/premium/get`);
    const coureseData = response.data;
    setPackages(coureseData);
  }

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

  const totalPages = Math.ceil(packages.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  return (
    <div>
      <Container>
        <Toaster position="top-center" reverseOrder={false} />
        <TableContainer component={Paper}>
          <div
            style={{
              float: "right",
              marginTop: "15px",
              marginRight: "10px",
              marginBottom: "15px",
            }}
          >
            <Button
              variant="contained"
              color="success"
              component={Link}
              to="/addnewpremium"
            >
              Add New Premium
            </Button>
          </div>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell style={{ textAlign: "center" }}>ID</TableCell>
                <TableCell style={{ textAlign: "center" }}>
                  Premium Name
                </TableCell>
                <TableCell style={{ textAlign: "center" }}>
                  Price origin
                </TableCell>
                <TableCell style={{ textAlign: "center" }}>
                  Price Discount
                </TableCell>
                <TableCell style={{ textAlign: "center" }}>
                  Duration by month
                </TableCell>
                <TableCell style={{ textAlign: "center" }}>
                  Disable/Enable{" "}
                </TableCell>
                <TableCell style={{ textAlign: "center" }}>Status </TableCell>
                <TableCell style={{ textAlign: "center" }}>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {packages.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} align="center">
                    No package premium available
                  </TableCell>
                </TableRow>
              ) : (
                packages &&
                packages.length > 0 &&
                packages
                  .slice(startIndex, endIndex)
                  .map((courseItem, index) => {
                    return (
                      <TableRow key={index}>
                        <TableCell style={{ textAlign: "center" }}>
                          {index + 1}
                        </TableCell>
                        <TableCell style={{ textAlign: "center" }}>
                          {courseItem.premiumname}
                        </TableCell>
                        <TableCell style={{ textAlign: "center" }}>
                          {courseItem.priceOriginal}
                        </TableCell>
                        <TableCell style={{ textAlign: "center" }}>
                          {courseItem.priceDiscount}
                        </TableCell>
                        <TableCell style={{ textAlign: "center" }}>
                          {courseItem.durationByMonth}
                        </TableCell>
                        <TableCell style={{ textAlign: "center" }}>
                          <Switch
                            checked={courseItem.status}
                            onChange={(event) =>
                              handleToggle(event, courseItem)
                            }
                            color={courseItem.status ? "success" : "error"}
                          />
                        </TableCell>
                        <TableCell style={{ textAlign: "center" }}>
                          <StatusButton status={courseItem.status} />
                        </TableCell>
                        <TableCell style={{ textAlign: "center" }}>
                          <Button
                            variant="contained"
                            color="warning"
                            component={Link}
                            to={`/updatepremiumpack/${courseItem._id}`}
                            style={{ fontSize: "10px" }}
                          >
                            Update and Detail
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <div className="pagination gap-7">
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

export default ManagePremium;
