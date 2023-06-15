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
import {
  getMember,
  updateMember,
  updateUser,
} from "../../../../helper/loginAPI";
import StatusButton from "./CustomeStatus";
import Search from "./Search";

function ManageMember() {
  const moment = require("moment");

  const [bookings, setBookings] = useState([]);
  const [isMember, setIsMember] = useState(false);

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

  const handleToggle = (memberId) => {
    const updatedData = {
      meta_data: JSON.stringify({ isMember: !isMember }),
    };
    // updateMember(memberId, updatedData)
    //   .then(() => {
    //     setIsMember(!isMember);
    //     fetchData();
    //   })
    //   .catch((error) => console.log(error));
  };

  const newBookings = bookings
    .filter((booking) => {
      return booking.payment && booking.member;
    })
    .map((booking) => {
      const metaData = JSON.parse(booking.member.meta_data);
      const isMember = metaData.isMember;
      const memberId = booking.member_id;
      const bookingDate = moment(booking.booking_date).format("DD/MM/YY");
      const { status } = booking.payment;
      const { username, email } = booking.member;

      return { username, email, status, bookingDate, isMember, memberId };
    });

  const [searchResults, setSearchResults] = useState([]);

  return (
    <div>
      <Container>
        <Search newBookings={newBookings} setSearchResults={setSearchResults} />
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
                        checked={isMember}
                        // onChange={handleToggle}
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
