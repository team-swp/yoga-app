import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useFormik } from "formik";
import { getPayment, updatePayment } from "../../../../helper/paymentAPI";
import {
  getMember,
  updateHoliday,
  updateUserForStaff,
} from "../../../../helper/loginAPI";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
export function ModalConfirmPending({
  open,
  handleClose,
  updatePendingId,
  setOpenModal,
  handleUpdateSuccess,
}) {
  const [memberPending, setMemberPending] = useState(null);
  const [memberPayment, setMemberPayemnt] = useState(null);

  async function fetchData() {
    try {
      const [paymentsResponse, membersResponse] = await Promise.all([
        getPayment(),
        getMember(),
      ]);

      const member = membersResponse.data.find(
        (member) => member._id === updatePendingId
      );

      const { meta_data } = member;

      const memberData = JSON.parse(meta_data);

      const newMemberData = paymentsResponse.data.find(
        (payment) => payment._id === memberData.payment_id
      );

      setMemberPending(memberData);
      setMemberPayemnt(newMemberData);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (open) {
      fetchData();
    }
  }, [open]);

  const handleUpdatePending = async () => {
    try {
      const date = new Date();
      const dateString = date.toISOString();
      if (memberPending.isMember === false && memberPayment.status !== 10) {
        const statusPayment = await updatePayment({
          ...memberPayment,
          status: 10,
        });

        const memberData = await updateUserForStaff({
          _id: updatePendingId,
          meta_data: `{"isMember":true,"MemberDuration":${memberPending.MemberDuration},"startDateMember":"${dateString}"} `,
        });

        if (memberData && statusPayment) {
          toast.success("Update member successful!");
          setOpenModal(false);
          handleUpdateSuccess();
        } else {
          toast.error("Failed to update");
        }
      }
    } catch (error) {
      toast.error("Failed to update");
      console.error("Failed to update user:", error);
    }
  };

  return (
    <div>
      <Toaster></Toaster>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Confirm Update
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Are you sure you want to update the status of this user ?
          </Typography>
          <Box
            sx={{
              mt: 2,
              display: "flex",
              justifyContent: "space-between",
              alignContent: "center",
            }}
          >
            <Button variant="contained" onClick={handleUpdatePending}>
              Update
            </Button>
            <Button variant="text" onClick={handleClose}>
              Cancel
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}

export function ModalConfirmMember({
  open,
  handleClose,
  isMember,
  memberId,
  statusPaymented,
  payments,
  searchResults,
  setSearchResults,
  setPayments,
  setOpenModalMember,
}) {
  useEffect(() => {
    if (open) {
    }
  }, [open]);

  function handleToggle() {
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
        setOpenModalMember(false);
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

  return (
    <div>
      <Toaster></Toaster>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Confirm Update
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Are you sure you want to update this user become a member ?
          </Typography>
          <Box
            sx={{
              mt: 2,
              display: "flex",
              justifyContent: "space-between",
              alignContent: "center",
            }}
          >
            <Button variant="contained" onClick={handleToggle}>
              Update
            </Button>
            <Button variant="text" onClick={handleClose}>
              Cancel
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}

export function ModalAddDayOff({ open, handleClose, handleUpdateSuccess }) {
  // // Hàm sinh ra khoảng ngày
  // function generateDateRange(startDate, endDate) {
  //   const dateRange = [];
  //   let currentDate = new Date(startDate);
  //   currentDate.setHours(0, 0, 0, 0);

  //   while (currentDate <= endDate) {
  //     dateRange.push(new Date(currentDate));
  //     currentDate.setDate(currentDate.getDate() + 1);
  //   }

  //   return dateRange;
  // }

  // const dateRangeArray = [];

  // metaData.forEach((member) => {
  //   const memberId = member._id;
  //   const meta_data = JSON.parse(member.meta_data);
  //   const startDateMember = moment(meta_data.startDateMember).format(
  //     "MM/DD/YYYY"
  //   );

  //   const MemberDuration = meta_data.MemberDuration;
  //   let expiredDate;

  //   if (meta_data.isTry) {
  //     const durationArray = MemberDuration.split(" ");
  //     const durationValue = parseInt(durationArray[0]);

  //     expiredDate = moment(startDateMember)
  //       .add(durationValue, "days")
  //       .format("MM/DD/YYYY");
  //   } else {
  //     expiredDate = moment(startDateMember)
  //       .add(MemberDuration, "months")
  //       .format("MM/DD/YYYY");
  //   }
  //
  //   const formatedStartDate = new Date(startDateMember);
  //   const formatedExpiredDate = new Date(expiredDate);

  //   const dateRange = generateDateRange(formatedStartDate, formatedExpiredDate);
  //   dateRange.memberId = memberId;
  //   dateRangeArray.push(dateRange);
  // });

  // const dayOffArray = [];
  // const formatStartDate = new Date(startDate);
  // const formatEndDate = new Date(endDate);

  // const dateRange = generateDateRange(formatStartDate, formatEndDate);

  // dayOffArray.push(dateRange);

  // const resultArray = [];

  // dateRangeArray.forEach((dateRange) => {
  //   const memberId = dateRange.memberId;
  //   const isMemberOnLeave = dateRange.some((date) =>
  //     dayOffArray[0].some((offDate) => offDate.getTime() === date.getTime())
  //   );

  //   if (isMemberOnLeave) {
  //     resultArray.push(memberId);
  //   }
  // });

  // const newDataMember = metaData.filter((data) =>
  //   resultArray.includes(data._id)
  // );

  const [isValue, setIsValue] = useState(null);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();

  const adapter = new AdapterDayjs();
  const currentDate = adapter.date(new Date());

  const formik = useFormik({
    initialValues: {},
    validateOnBlur: false,
    validateOnChange: false,

    onSubmit: async (values) => {
      const currentDate = new Date();
      const selectedStartDate = new Date(startDate);

      if (selectedStartDate.toDateString() !== currentDate.toDateString()) {
        toast.error("Start date must be equal to the current date");
        return;
      }

      if (startDate && endDate) {
        if (new Date(endDate) < new Date(startDate)) {
          toast.error("The end date must be greater the start date");
          return;
        }
      }

      const timeDiff =
        new Date(endDate).getTime() - new Date(startDate).getTime();
      const holiday = Math.ceil(timeDiff / (1000 * 3600 * 24) + 1);

      try {
        await updateHoliday(holiday);
        if (holiday) {
          toast.success("Add new holiday successful!");
          handleUpdateSuccess();
        }
      } catch (error) {
        console.error(error);
        toast.error("Add failed!");
      }
    },
  });

  const handleChange = (e) => {
    setIsValue(e.target.value);
  };

  const resetForm = () => {
    setStartDate(null);
    setEndDate(null);
  };

  const closeModal = () => {
    resetForm();
    handleClose();
  };

  return (
    <div>
      <Toaster></Toaster>
      <Modal
        open={open}
        onClose={closeModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add Holiday
          </Typography>
          <form onChange={handleChange} onSubmit={formik.handleSubmit}>
            <div style={{ marginTop: "1em" }}>
              <LocalizationProvider dateAdapter={AdapterDayjs} locale="en">
                <DatePicker
                  label="Start Date"
                  inputFormat="MM/DD/YYYY"
                  animateYearScrolling
                  fullWidth
                  required
                  minDate={currentDate}
                  value={startDate}
                  onChange={(newValue) =>
                    setStartDate(dayjs(newValue).format("MM/DD/YYYY"))
                  }
                />
              </LocalizationProvider>
            </div>
            <div style={{ marginTop: "1em" }}>
              <LocalizationProvider dateAdapter={AdapterDayjs} locale="en">
                <DatePicker
                  label="End Date"
                  inputFormat="MM/DD/YYYY"
                  animateYearScrolling
                  fullWidth
                  required
                  minDate={currentDate}
                  value={endDate}
                  onChange={(newValue) =>
                    setEndDate(dayjs(newValue).format("MM/DD/YYYY"))
                  }
                />
              </LocalizationProvider>
            </div>

            <Box
              sx={{
                mt: 2,
                display: "flex",
                justifyContent: "space-between",
                alignContent: "center",
              }}
            >
              <Button color="success" variant="contained" type="submit">
                Add
              </Button>
              <Button variant="text" onClick={closeModal}>
                Cancel
              </Button>
            </Box>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
