import React, { useEffect, useState } from "react";
import { getPaymentUserByID } from "../../../helper/paymentAPI";

const PurchaseHistory = () => {
  const [listPayment, setListPayment] = useState([]);
  useEffect(() => {
    async function fetchPaymentUser() {
      try {
        const respone = await getPaymentUserByID();
        setListPayment(respone.data);
        console.log(listPayment);
      } catch {
        console.log("fail");
      }
    }

    fetchPaymentUser();
  }, []);

  return <div>PurchaseHistory</div>;
};

export default PurchaseHistory;
