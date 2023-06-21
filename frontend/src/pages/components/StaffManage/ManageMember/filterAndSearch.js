import _, { debounce } from "lodash";
const moment = require("moment");
export function filterPayments(searchResults, payments, statusFilter) {
  return searchResults
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
}

export function searchPayments(event, payments, setSearchResults) {
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
}
