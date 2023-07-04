import {
  Box,
  Button,
  Container,
  IconButton,
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
import _, { debounce } from "lodash";
import { getBooking } from "../../../../helper/bookingAPI";
import { getPaymentWithPaging } from "../../../../helper/paymentAPI";
import { getMember, updateUserForStaff } from "../../../../helper/loginAPI";
import StatusButton, { statusOptions } from "./CustomeStatus";
import RestartAltOutlinedIcon from "@mui/icons-material/RestartAltOutlined";
import { Toaster, toast } from "react-hot-toast";
import classNames from "classnames/bind";
import styles from "./ManageMember.module.css";
import { ModalConfirmMember, ModalConfirmPending } from "./ModalConfirm";

const cx = classNames.bind(styles);

const moment = require("moment");

function ManageMember() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const [updatePendingId, setUpdatePendingId] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [openModalMember, setOpenModalMember] = useState(false);

  const [statusFilter, setStatusFilter] = useState(null);
  const [payments, setPayments] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  const [isMember, setIsMember] = useState(null);
  const [memberId, setMemberId] = useState(null);
  const [statusPaymented, setStatusPaymented] = useState(null);

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
        item.member.username.toLowerCase().includes(term.toLowerCase())
      );
      setSearchResults(cloneListPayment);
    } else {
      setSearchResults(payments);
    }
  }, 500);

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
      const { username, email } = payments.member;
      const status = payments.status;
      const MemberDuration = metaData.MemberDuration;

      let startDateMember;

      if (status === 5) {
        startDateMember = "Not Yet";
      } else {
        startDateMember = moment(metaData.startDateMember).format("DD/MM/YY");
      }

      let expiredDate;

      if (typeof MemberDuration !== "undefined" && status !== 5) {
        if (status === 4) {
          const durationArray = MemberDuration.split(" ");
          const durationValue = parseInt(durationArray[0]);

          expiredDate = moment(startDateMember, "DD/MM/YY")
            .add(durationValue, "days")
            .format("DD/MM/YY");
        } else {
          expiredDate = moment(startDateMember, "DD/MM/YY")
            .add(MemberDuration, "months")
            .format("DD/MM/YY");
        }
      } else {
        expiredDate = "Not Yet";
      }

      const memberId = payments.member._id;
      const bookingDate = moment(payments.bookings.booking_date).format(
        "DD/MM/YY"
      );

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

  const handleResetSearch = () => {
    setSearchResults(payments);
    document.getElementById("searchInput").value = "";
  };

  const handleOpenModal = (status, memberId) => {
    if (status === 5) {
      setUpdatePendingId(memberId);
      setOpenModal(true);
    } else {
      toast.error(
        "Update failed! Only the user with the Pending status could be updated!"
      );
    }
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setOpenModalMember(false);
  };

  const handleOpenModalWithToggle = (isMember, memberId, statusPaymented) => {
    if (statusPaymented !== 10 && statusPaymented !== 4) {
      toast.error(
        "Update failed! Only the user with Completed status and Trial status could be updated"
      );
      return;
    } else {
      setOpenModalMember(true);
      setIsMember(isMember);
      setMemberId(memberId);
      setStatusPaymented(statusPaymented);
    }
  };

  const handleUpdateSuccess = async () => {
    await fetchData();
    handleCloseModal();
  };

  const displayedStatusValue = statusFilter === null ? "" : statusFilter;

  const totalPages = Math.ceil(filteredPayments.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  return (
    <div>
      <Container>
        <Toaster position="top-center" reverseOrder={false} />
        <TableContainer component={Paper} sx={{ my: 2 }}>
          <div className="flex justify-between mx-5">
            <div className="py-4">
              <input
                placeholder="Search by username"
                className="border-solid border-2 border-black p-2"
                onChange={(event) => handleSearch(event)}
              />
            </div>
            <Box sx={{ mt: 1 }}>
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
                        <button
                          onClick={() =>
                            handleOpenModal(payment.status, payment.memberId)
                          }
                        >
                          <StatusButton status={payment.status} />
                        </button>
                      </TableCell>
                      <TableCell>
                        <Switch
                          checked={payment.isMember}
                          onChange={(event) => {
                            handleOpenModalWithToggle(
                              event.target.checked,
                              payment.memberId,
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
                className={`page-button ${currentPage === page ? "active" : ""
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

        <ModalConfirmPending
          open={openModal}
          handleClose={handleCloseModal}
          updatePendingId={updatePendingId}
          setOpenModal={setOpenModal}
          handleUpdateSuccess={handleUpdateSuccess}
        />
        <ModalConfirmMember
          open={openModalMember}
          handleClose={handleCloseModal}
          isMember={isMember}
          memberId={memberId}
          statusPaymented={statusPaymented}
          payments={payments}
          searchResults={searchResults}
          setSearchResults={setSearchResults}
          setPayments={setPayments}
          setOpenModalMember={setOpenModalMember}
        />
      </Container>
    </div>
  );
}

export default ManageMember;
