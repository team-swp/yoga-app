import React, { useEffect, useState } from "react";
import styles from "./paymentstatus.module.css";
import { Link, useSearchParams } from "react-router-dom";
import { getPaymentByID } from "../../../helper/paymentAPI";

function PaymentStatus() {
  const [idParams, setIdParams] = useSearchParams();
  const [check, setCheck] = useState(false);
  const [dataPayment, setDataPayment] = useState({});
  const idResult = idParams.get("pmid");
  idResult?.replace("pmid", "");
  useEffect(() => {
    const paymentPromise = getPaymentByID({ id: idResult });
    paymentPromise
      .then((result) => {
        console.log(result.data);
        setCheck(true);
      })
      .catch((result) => {
        setCheck(false);
      });
  }, []);
  return (
    <div class="bg-gray-100 h-screen">
      <div class="bg-white p-6  md:mx-auto">
        {check ? (
          <svg
            viewBox="0 0 24 24"
            class="text-green-600 w-16 h-16 mx-auto my-6"
          >
            <path
              fill="currentColor"
              d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z"
            ></path>
          </svg>
        ) : (
          <svg
            viewBox="0 0 24 24"
            class="text-red-800 w-20 h-20 mx-auto my-6"
            style={{marginBottom:'-10px',marginLeft:'48%'}}
          >
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
          </svg>
        )}
        <div class="text-center">
          {check ? (
            <h3 class="md:text-2xl text-base text-gray-900 font-semibold text-center">
              Payment Done!
            </h3>
          ) : (
            <h3 class="md:text-2xl text-base text-red-900 font-semibold text-center">
              Payment Fail!
            </h3>
          )}
          {check ? (
            <p class="text-gray-600 my-2">
              Thank you for completing your {idResult} online payment.
            </p>
          ) : (
            <p class="text-gray-600 my-2">
              Sorry your payment has been corrupted
            </p>
          )}
          {check ? (
            <p> Have a great day! Check Your Mail About Payment </p>
          ) : (
            <p>please retry your payment! Have a great day</p>
          )}
          <div class="py-10 text-center">
            <Link
              to="/"
              class="px-12 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3"
            >
              GO BACK
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PaymentStatus;
