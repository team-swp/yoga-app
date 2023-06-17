import {
  Container,
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
import { getBooking } from "../../../../helper/bookingAPI";
import { getPayment } from "../../../../helper/paymentAPI";
import { getMember, updateUserForStaff } from "../../../../helper/loginAPI";
import StatusButton from "./CustomeStatus";
import Search from "./Search";
import { Toaster, toast } from "react-hot-toast";

function ManageMember() {
  const moment = require("moment");

  const [bookings, setBookings] = useState([]);
  const [memberId, setMemberId] = useState("");

  async function fetchData() {
    try {
      const [bookingsResponse, paymentsResponse, membersResponse] =
        await Promise.all([getBooking(), getPayment(), getMember()]);

      const updatedBookings = bookingsResponse.data.map((booking) => {
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
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

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
    console.log(statusPaymented);

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
      })
      .catch((error) => {
        console.error(error);
        toast.error("Update failed");
      });
  }

  const [searchResults, setSearchResults] = useState([]);

  return (
    <div>
      <Container>
        <Search newBookings={newBookings} setSearchResults={setSearchResults} />
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
                          setMemberId(booking.memberId);
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
      </Container>
    </div>
  );
}

export default ManageMember;
