import Table from "react-bootstrap/Table";
import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Switch from "@mui/material/Switch";
import { getMember, updateUser } from "../../../helper/loginAPI";
import { updateUserForAdmin } from "../../../helper/adminAPI";
import { Container } from "@mui/system";
import _, { debounce } from "lodash";

function BasicExample() {
  const moment = require("moment");

  const [listUser, setListUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await getMember();
        setListUsers(response.data);
      } catch {
        console.log("fail");
      }
    }

    fetchUsers();
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

  const handleSearch = debounce((event) => {
    let term = event.target.value;
    if (term) {
      let cloneListUsers = _.cloneDeep(listUser);
      cloneListUsers = cloneListUsers.filter((item) =>
        item.email.includes(term)
      );
      setListUsers(cloneListUsers);
    } else {
      async function fetchUsers() {
        try {
          const response = await getMember();
          setListUsers(response.data);
        } catch {
          console.log("fail");
        }
      }
      fetchUsers();
    }
  }, 500);

  const totalPages = Math.ceil(listUser.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  return (
    <div>
      {" "}
      <div className=" py-7 col">
        <input
          placeholder="Search by email"
          className="border-solid border-2 border-black p-2"
          onChange={(event) => handleSearch(event)}
        />
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Email</th>
            <th>UserName</th>
            <th>Phone</th>
            <th>Role</th>
            <th>Status</th>
            <th>Create At</th>
          </tr>
        </thead>
        <tbody>
          {listUser &&
            listUser.length > 0 &&
            listUser.slice(startIndex, endIndex).map((item, index) => {
              const handleStatusToggle = async () => {
                const updatedList = [...listUser];
                updatedList[startIndex + index].status = !item.status;
                setListUsers(updatedList);
                try {
                  await updateUserForAdmin({
                    _id: item._id,
                    status: updatedList[startIndex + index].status,
                  });
                  console.log("Status updated successfully.");
                  console.log(updatedList);
                } catch {
                  console.log("error");
                }
              };

              return (
                <tr key={`users=${index}`}>
                  <td>{startIndex + index + 1}</td>
                  <td className="text-left">{item.email}</td>
                  <td className="text-left">{item.username}</td>
                  <td className="text-left">{item.phone}</td>
                  <td className="text-left">{item.role}</td>
                  <td className="text-left">
                    <Switch
                      checked={item.status}
                      onChange={handleStatusToggle}
                      color="primary"
                    />
                  </td>
                  <td className="text-left">
                    {moment(item.createdAt).format("DD/MM/YY")}
                  </td>
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
}

export default BasicExample;
