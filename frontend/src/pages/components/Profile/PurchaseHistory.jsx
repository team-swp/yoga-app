import {
  Box,
  Button,
  Container,
  InputLabel,
  Paper,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useEffect, useState } from "react";
import { getBooking } from "../../../../src/helper/bookingAPI";
import { getPaymentWithPaging } from "../../../../src/helper/paymentAPI";
import { getMember } from "../../../../src/helper/loginAPI";
import { Toaster, toast } from "react-hot-toast";
import axios from "axios";
import { useSelector } from "react-redux";
import { userSelector } from "../../../redux/selectors";
// import classNames from "classnames/bind";
// import _, { debounce } from "lodash";

const moment = require("moment");

const statusOptions = [
  { value: "", label: "All" },
  { value: "0", label: "Failed" },
  { value: "4", label: "Trial" },
  { value: "5", label: "Pending" },
  { value: "10", label: "Completed" },
];

function PurchaseHistory() {
  const user = useSelector(userSelector);

  const userId = sessionStorage.getItem("user.id");

  const [currentPage, setCurrentPage] = useState(1);
  const [searchResults, setSearchResults] = useState([]);
  const [userSearch, setUserSearch] = useState([]);
  async function fetchData() {
    try {
      const [paymentsResponse, bookingsResponse, membersResponse] =
        await Promise.all([getPaymentWithPaging(), getBooking(), getMember()]);
      const updatedPayments = paymentsResponse.data.items.map((payment) => {
        const bookings = bookingsResponse.data.find(
          (booking) => payment.booking_id === booking._id
        );
        if (bookings) {
          const member = membersResponse.data.find(
            (member) => member._id === bookings.member_id
          );
          if (member) {
            return { ...payment, bookings, member };
          }
        }
        return payment;
      });

      setSearchResults(updatedPayments);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const userSearchId = searchResults.find(
      (result) => result.member._id === userId
    );
    setUserSearch(userSearchId);
    console.log(userSearch);
  }, [searchResults]);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // const handleNextPage = () => {
  //   if (currentPage < totalPages) {
  //     setCurrentPage(currentPage + 1);
  //   }
  // };

  // const totalPages = Math.ceil(filteredPayments.length / itemsPerPage);

  console.log(userSearch);
  const ArrayUser = [userSearch];

  return (
    <div>
      <Container>
        <div className="flex justify-between">
          <div className="py-4">
            <input
              placeholder="Search by username"
              className="border-solid border-2 border-black p-2"
              // onChange={(event) => handleSearch(event)}
            />
          </div>
        </div>
        <Toaster position="top-center" reverseOrder={false} />
        <TableContainer component={Paper} sx={{ my: 2 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID payment</TableCell>
                <TableCell>User Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Booking Date</TableCell>
                <TableCell>startDate Member</TableCell>
                <TableCell>Expired Date</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Enable/Disable</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {ArrayUser &&
                ArrayUser.length > 0 &&
                ArrayUser.map((payment, index) => (
                  <TableRow key={index}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{payment.member.username}</TableCell>
                    <TableCell>{payment.email}</TableCell>
                    <TableCell>{payment.bookingDate}</TableCell>
                    <TableCell>{payment.startDateMember}</TableCell>
                    <TableCell>{payment.expiredDate}</TableCell>
                    <TableCell></TableCell>
                    <TableCell>
                      {/* <Switch
                          checked={payment.isMember}
                          onChange={(event)  => {
                            handleToggle(
                              event.target.checked,
                              payment.memberId,
                              payment.expiredDate,
                              payment.status
                            );
                          }}
                        /> */}
                    </TableCell>
                  </TableRow>
                ))}
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
          {/* <Button
            className="next-button border"
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            color="primary"
          >
            Next
          </Button> */}
        </div>
      </Container>
    </div>
  );
}

export default PurchaseHistory;
