import React, { useEffect, useState } from "react";
import { getPaymentUserByID } from "../../../helper/paymentAPI";
import Table from "react-bootstrap/esm/Table";
import { Button } from "@mui/material";
import { getPremium } from "../../../helper/premiumAPI";

const PurchaseHistory = () => {
  const moment = require("moment");
  const [listPayment, setListPayment] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(listPayment.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  useEffect(() => {
    async function fetchPaymentUser() {
      try {
        const [respone, packageRespone] = await Promise.all([
          getPaymentUserByID(),
          getPremium(),
        ]);
        const PaymentUserByID = respone.data
          .map((paymentItem) => {
            const filteredPackageItems = packageRespone.data.filter(
              (packageItem) => paymentItem.premium_id === packageItem._id
            );
            return {
              ...paymentItem,
              packageItems: filteredPackageItems,
            };
          });
        setListPayment(PaymentUserByID);
      } catch {
        console.log("fail");
      }
    }

    fetchPaymentUser();
  }, []);

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

  return (
    <div className=" p-5 table-responsive">
      <Table striped bordered hover>
        <thead>
          <tr>
            <th className=" text-left">Number</th>
            <th className="text-left fixed-column">Payment Amount</th>
            <th className="text-left">Date of payment</th>
            <th className="text-left">Premium Name</th>
            <th className="text-left">Payment Method</th>
          </tr>
        </thead>
        <tbody>
          {listPayment &&
            listPayment.length > 0 &&
            listPayment.slice(startIndex, endIndex).map((item, index) => {
              return (
                <tr key={`users=${index}`}>
                  <td className="text-left">{startIndex + index + 1}</td>

                  <td className="text-left">{item.paymentAmount?.toLocaleString('en') + " "}VND</td>
                  <td className="text-left">
                    {moment(item.createdAt).format("DD/MM/YY")}
                  </td>
                  <td className="text-left">
                    {item.packageItems.map((o) => o.premiumname)}
                  </td>
                  <td className="text-left">{item.meta_data}</td>
                </tr>
              );
            })}
        </tbody>
      </Table>
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
              className={`page-button ${currentPage === page ? "active" : ""}`}
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
    </div>
  );
};

export default PurchaseHistory;
