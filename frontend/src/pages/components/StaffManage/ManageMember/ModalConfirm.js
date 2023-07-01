import { Box, Button, Modal, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { getPayment, updatePayment } from "../../../../helper/paymentAPI";
import { getMember, updateUserForStaff } from "../../../../helper/loginAPI";

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
