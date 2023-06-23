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
import { getBooking } from "../../../../helper/bookingAPI";
import { getPaymentWithPaging } from "../../../../helper/paymentAPI";
import { getMember, updateUserForStaff } from "../../../../helper/loginAPI";
import StatusButton from "./CustomeStatus";
import { Toaster, toast } from "react-hot-toast";
import classNames from "classnames/bind";
import styles from "./ManageMember.module.css";
import _, { debounce } from "lodash";
import { filterPayments, searchPayments } from "./filterAndSearch";

const cx = classNames.bind(styles);

const moment = require("moment");

const statusOptions = [
  { value: "", label: "All" },
  { value: "0", label: "Failed" },
  { value: "4", label: "Trial" },
  { value: "5", label: "Pending" },
  { value: "10", label: "Completed" },
];

function ManageMember() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [statusFilter, setStatusFilter] = useState(null);
  const [payments, setPayments] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

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

      setPayments(updatedPayments);
      setSearchResults(updatedPayments);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  const handleSearch = debounce((event) => {
    let term = event.target.value;
    if (term) {
      let cloneListPayment = _.cloneDeep(payments);
      cloneListPayment = cloneListPayment.filter((item) =>
        item.member.username.includes(term)
      );
      setSearchResults(cloneListPayment);
    } else {
      setSearchResults(payments);
    }
  }, 500);

  function handleToggle(isMember, memberId, expiredDate, statusPaymented) {
    if (statusPaymented !== 10 && statusPaymented !== 4) {
      toast.error("Update failed");
      return;
    }
    const paymentIndex = payments.findIndex(
      (payment) => payment.member._id === memberId
    );

    const oldMetaData = JSON.parse(payments[paymentIndex].member.meta_data);
    const newMetaData = { ...oldMetaData, isMember };

    const response = { _id: memberId, meta_data: JSON.stringify(newMetaData) };
    updateUserForStaff(response)
      .then((res) => {
        console.log(res.data);
        toast.success("Update successfully");
        const updatedPayments = payments.map((payment) => {
          if (payment.member._id === memberId) {
            return {
              ...payment,
              member: { ...payment.member, meta_data: response.meta_data },
            };
          }
          return payment;
        });

        setPayments(updatedPayments);

        const updatedSearchResults = searchResults.map((payment) => {
          if (payment.member._id === memberId) {
            return {
              ...payment,
              member: { ...payment.member, meta_data: response.meta_data },
            };
          }
          return payment;
        });

        setSearchResults(updatedSearchResults);
      })

      .catch((error) => {
        console.error(error);
        toast.error("Update failed");
      });
  }

  const filteredPayments = searchResults
    .filter((payment) => {
      if (statusFilter === null || statusFilter === "") {
        return true;
      } else {
        return payment.status == statusFilter;
      }
    })
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
      const bookingDate = moment(payments.bookings.booking_date).format(
        "DD/MM/YY"
      );
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

  const handleStatusFilterChange = (event) => {
    setStatusFilter(event.target.value);
    setCurrentPage(1);
  };

  const handleResetStatusFilter = () => {
    setStatusFilter(null);
  };

  const displayedStatusValue = statusFilter === null ? "" : statusFilter;

  const totalPages = Math.ceil(filteredPayments.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  return (
    <div>
      <Container>
        <div className="flex justify-between">
          <div className="py-4">
            <input
              placeholder="Search by username"
              className="border-solid border-2 border-black p-2"
              onChange={(event) => handleSearch(event)}
            />
          </div>
          <Box>
            <InputLabel htmlFor="status-filter">Filter status:</InputLabel>
            <select
              id="status-filter"
              onChange={handleStatusFilterChange}
              value={displayedStatusValue}
              className={cx("select-status")}
            >
              {statusOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <Button variant="outlined" onClick={handleResetStatusFilter}>
              Reset
            </Button>
          </Box>
        </div>
        <Toaster position="top-center" reverseOrder={false} />
        <TableContainer component={Paper} sx={{ my: 2 }}>
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
              {filteredPayments &&
                filteredPayments.length > 0 &&
                filteredPayments
                  .slice(startIndex, endIndex)
                  .map((payment, index) => (
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

export default ManageMember;
