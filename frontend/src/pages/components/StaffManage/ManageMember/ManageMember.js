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
import { getBookingWithPaging } from "../../../../helper/bookingAPI";
import { getPayment } from "../../../../helper/paymentAPI";
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

  const [bookings, setBookings] = useState([]);

  const [newTotalPage, setNewTotalPage] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(5);
  const [page, setPage] = useState(0);

  async function fetchData() {
    try {
      const [bookingsResponse, paymentsResponse, membersResponse] =
        await Promise.all([
          getBookingWithPaging(currentPage, perPage),
          getPayment(),
          getMember(),
        ]);

      const { pageCount, pageNum } = bookingsResponse.data.pagination;

      const updatedBookings = bookingsResponse.data.items.map((booking) => {
        const payment = paymentsResponse.data.find(
          (payment) => payment.booking_id === booking._id
        );

        const member = membersResponse.data.find(
          (member) => member._id === booking.member_id
        );

        if (payment) {
          return { ...booking, payment, member };
        }
        return booking;
      });

      setBookings(updatedBookings);
      setPage(pageNum);
      setTotalPage(pageCount);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchData();
  }, [currentPage, perPage]);

  const newBookings = bookings
    .filter((booking) => {
      return booking.payment && booking.member;
    })
    .map((booking) => {
      const metaData = JSON.parse(booking.member.meta_data);
      const isMember = metaData.isMember;
      const memberId = booking.member._id;
      const bookingDate = moment(booking.booking_date).format("DD/MM/YY");
      const { status } = booking.payment;
      const { username, email } = booking.member;

      return { username, email, status, bookingDate, isMember, memberId };
    });

  function handleToggle(isMember, memberId, statusPaymented) {
    if (statusPaymented !== 10) {
      toast.error("Update failed");
      return;
    }

    const booking = bookings.find((booking) => booking.member._id === memberId);
    const oldMetaData = JSON.parse(booking.member.meta_data);
    const newMetaData = { ...oldMetaData, isMember };
    const response = { _id: memberId, meta_data: JSON.stringify(newMetaData) };

    updateUserForStaff(response)
      .then((res) => {
        console.log(res.data);
        toast.success("Update succesfully");
        const updatedBookings = bookings.map((bookingItem) =>
          bookingItem.member._id === memberId
            ? {
                ...bookingItem,
                member: {
                  ...bookingItem.member,
                  meta_data: response.meta_data,
                },
              }
            : bookingItem
        );
        setBookings(updatedBookings);

        if (isSearching) {
          const updatedSearchResults = searchResults.map((searchResultItem) =>
            searchResultItem.memberId === memberId
              ? { ...searchResultItem, isMember }
              : searchResultItem
          );
          setSearchResults(updatedSearchResults);
        }
      })
      .catch((error) => {
        console.error(error);
        toast.error("Update failed");
      });
  }

  function handlePrevious() {
    setCurrentPage((p) => {
      if (p === 1) return p;
      return p - 1;
    });
  }

  function handleNext() {
    setCurrentPage((p) => {
      if (p === totalPage) return p;
      return parseInt(p) + 1;
    });
  }

  function handlePageChange(event) {
    setCurrentPage(parseInt(event.target.value));
  }

  const searchProps = {
    newBookings,
    setSearchResults,
    setNewTotalPage,
    setCurrentPage,
    perPage,
    setIsSearching,
  };

  return (
    <div>
      <Container>
        <Search {...searchProps} />

        <Toaster position="top-center" reverseOrder={false} />
        <TableContainer component={Paper} sx={{ height: "500px", my: 2 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>User Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Booking Date</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Enable/Disable</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(searchResults.length > 0 ? searchResults : newBookings).map(
                (booking, index) => (
                  <TableRow key={index}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{booking.username}</TableCell>
                    <TableCell>{booking.email}</TableCell>
                    <TableCell>{booking.bookingDate}</TableCell>
                    <TableCell>
                      <StatusButton status={booking.status} />
                    </TableCell>
                    <TableCell>
                      <Switch
                        checked={booking.isMember}
                        onChange={(event) => {
                          handleToggle(
                            event.target.checked,
                            booking.memberId,
                            booking.status
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
