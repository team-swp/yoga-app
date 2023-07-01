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
export default function ModalConfirm({
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

  console.log(memberPayment);

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
            Are you sure you want to update this user ?
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
