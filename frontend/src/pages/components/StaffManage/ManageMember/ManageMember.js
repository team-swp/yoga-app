import {
  Box,
  Button,
  Container,
  MenuItem,
  Paper,
  Select,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useEffect, useState } from "react";
import {
  getBooking,
  getBookingWithPaging,
} from "../../../../helper/bookingAPI";
import {
  getPayment,
  getPaymentWithPaging,
} from "../../../../helper/paymentAPI";
import { getMember, updateUserForStaff } from "../../../../helper/loginAPI";
import StatusButton from "./CustomeStatus";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import Search from "./Search";
import { Toaster, toast } from "react-hot-toast";

function ManageMember() {
  const moment = require("moment");

  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const [payments, setPayments] = useState([]);
  const [newTotalPage, setNewTotalPage] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(5);
  const [page, setPage] = useState(0);

  async function fetchData() {
    try {
      const [paymentsResponse, bookingsResponse, membersResponse] =
        await Promise.all([
          getPaymentWithPaging(currentPage, perPage),
          getBooking(),
          getMember(),
        ]);

      const { pageCount, pageNum } = paymentsResponse.data.pagination;

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
      setPayments(updatedPayments);
      setPage(pageNum);
      setTotalPage(pageCount);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchData();
  }, [currentPage, perPage]);

  const newPayments = payments

    .filter((payments) => {
      return payments.bookings && payments.member;
    })
    .map((payments) => {
      const metaData = JSON.parse(payments.member.meta_data);
      const isMember = metaData.isMember;
      const MemberDuration = metaData.MemberDuration;
      const startDateMember = moment(metaData.startDateMember).format(
        "DD/MM/YY"
      );

      let expiredDate;

      if (
        typeof MemberDuration !== "undefined" &&
        typeof MemberDuration !== "string"
      ) {
        expiredDate = moment(startDateMember, "DD/MM/YY")
          .add(MemberDuration, "months")
          .format("DD/MM/YY");
      } else {
        expiredDate = "Not Yet";
      }

      const memberId = payments.member._id;
      const bookingDate = moment(payments.booking_date).format("DD/MM/YY");
      const status = payments.status;
      const { username, email } = payments.member;

      return {
        username,
        email,
        status,
        bookingDate,
        isMember,
        startDateMember,
        expiredDate,
        memberId,
      };
    });
  function handleToggle(isMember, memberId, expiredDate, statusPaymented) {
    if (statusPaymented !== 10) {
      toast.error("Update failed");
      return;
    }
    const payment = payments.find((payment) => payment.member._id === memberId);
    console.log(payment);
    const oldMetaData = JSON.parse(payment.member.meta_data);
    const newMetaData = { ...oldMetaData, isMember };
    const response = { _id: memberId, meta_data: JSON.stringify(newMetaData) };
    updateUserForStaff(response)
      .then((res) => {
        console.log(res.data);
        toast.success("Update succesfully");
        const updatedPayments = payments.map((paymentItem) =>
          paymentItem.member._id === memberId
            ? {
                ...paymentItem,
                member: {
                  ...paymentItem.member,
                  meta_data: response.meta_data,
                },
              }
            : paymentItem
        );
        setPayments(updatedPayments);
        //     if (isSearching) {
        //       const updatedSearchResults = searchResults.map((searchResultItem) =>
        //         searchResultItem.memberId === memberId
        //           ? { ...searchResultItem, isMember }
        //           : searchResultItem
        //       );
        //       setSearchResults(updatedSearchResults);
        //     }
      })
      .catch((error) => {
        console.error(error);
        toast.error("Update failed");
      });
  }

  function handlePrevious() {
    setCurrentPage((p) => {
      if (p === 1) {
        return p;
      }
      return p - 1;
    });
  }

  function handleNext() {
    setCurrentPage((p) => {
      if (p === totalPage) {
        return p;
      }
      return parseInt(p) + 1;
    });
  }

  function handlePageChange(event) {
    setCurrentPage(parseInt(event.target.value));
  }

  // const searchProps = {
  //   newBookings,
  //   setSearchResults,
  //   setNewTotalPage,
  //   setCurrentPage,
  //   perPage,
  //   setIsSearching,
  // };

  return (
    <div>
      <Container>
        {/* <Search {...searchProps} /> */}

        <Toaster position="top-center" reverseOrder={false} />
        <TableContainer component={Paper} sx={{ height: "500px", my: 2 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
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
              {(searchResults.length > 0 ? searchResults : newPayments).map(
                (payment, index) => (
                  <TableRow key={index}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{payment.username}</TableCell>
                    <TableCell>{payment.email}</TableCell>
                    <TableCell>{payment.bookingDate}</TableCell>
                    <TableCell>{payment.startDateMember}</TableCell>
                    <TableCell>{payment.expiredDate}</TableCell>
                    <TableCell>
                      <StatusButton status={payment.status} />
                    </TableCell>
                    <TableCell>
                      <Switch
                        checked={payment.isMember}
                        onChange={(event) => {
                          handleToggle(
                            event.target.checked,
                            payment.memberId,
                            payment.expiredDate,
                            payment.status
                          );
                        }}
                      />
                    </TableCell>
                  </TableRow>
                )
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <Box>
          <Button
            onClick={handlePrevious}
            disabled={page === 1}
            endIcon={<KeyboardArrowLeftIcon />}
          />
          <Select
            value={searchResults.length > 0 ? currentPage : currentPage}
            onChange={handlePageChange}
            sx={{}}
          >
            {[
              ...Array(searchResults.length > 0 ? newTotalPage : totalPage),
            ].map((_, index) => (
              <MenuItem key={index + 1} value={index + 1}>
                {index + 1}
              </MenuItem>
            ))}
          </Select>
          <Button
            onClick={handleNext}
            disabled={
              page === (searchResults.length > 0 ? newTotalPage : totalPage)
            }
            startIcon={<KeyboardArrowRightIcon />}
          />
        </Box>
      </Container>
    </div>
  );
}

export default ManageMember;
