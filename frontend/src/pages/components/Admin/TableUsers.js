import Table from "react-bootstrap/Table";
import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Switch from "@mui/material/Switch";
import { getMember } from "../../../helper/loginAPI";
import { updateUserForAdmin } from "../../../helper/adminAPI";

import _, { debounce } from "lodash";
import { FaArrowDownLong, FaArrowUpLong } from "react-icons/fa6";
import { getAvatarToAWS } from "../../../helper/loginAPI";

import styles from "../../../styles/Username.module.css";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

function BasicExample() {
  const moment = require("moment");

  const [listUser, setListUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [sortBy, setSortBy] = useState("asc");
  const [sortField, setSortField] = useState("id");
  const [originalListUsers, setOriginalListUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const [avatarURLs, setAvatarURLs] = useState([]);
  const defaultAvatarURL =
    "https://vnn-imgs-f.vgcloud.vn/2020/03/23/11/trend-avatar-1.jpg";

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await getMember();
        // const response = await getMember();
        // const response = await fetch("https://api.example.com/users");
        setListUsers(response.data);
        setOriginalListUsers(response.data);
        const avatarURLList = await Promise.all(
          response.data.map(async (item) => {
            const { url } = await getAvatarToAWS({ imageName: item._id });
            return url;
          })
        );
        setAvatarURLs(avatarURLList);
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
      let filteredListUsers = originalListUsers.filter((item) =>
        item.email.includes(term)
      );
      setCurrentPage(1);
      setListUsers(filteredListUsers);
    } else {
      setListUsers(originalListUsers);
    }

    setSearchTerm(term);
  }, 500);

  const totalPages = Math.ceil(listUser.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const handleSort = (sortBy, sortField) => {
    setSortBy(sortBy);
    setSortField(sortField);

    let cloneListUsers = _.cloneDeep(listUser);
    cloneListUsers = _.orderBy(
      cloneListUsers,
      [(item) => _.toLower(item[sortField])],
      [sortBy]
    );
    setListUsers(cloneListUsers);
    console.log(cloneListUsers);
  };

  const loadImageAgain = async (e, avatar) => {
    if (!avatar) {
      e.target.src = defaultAvatarURL;
      return;
    }

    try {
      const { url } = await getAvatarToAWS(avatar);
      e.target.src = url;
    } catch (error) {
      console.log(error);
    }
  };

  const imgStyle = `${styles.profile_img} object-cover h-12 w-12 rounded-full`; // Thêm lớp CSS "rounded-full" để tạo hình tròn
  const imageContainerStyle = "flex items-center justify-center h-12 w-12";
  const idColumnStyle = { width: "50px" };
  const emailColumnStyle = { width: "300px" };
  const avatarColumnStyle = { width: "80px" }; // Dùng để căn giữa nội dung trong hình tròn

  return (
    <div className={cx("table-container")}>
      <div className="table-responsive ">
        {" "}
        <div className=" py-7 col w">
          <input
            placeholder="Search by email"
            className="border-solid border-2 border-black p-2"
            onChange={(event) => handleSearch(event)}
          />
        </div>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th className="text-left fixed-column" style={idColumnStyle}>
                ID
              </th>
              <th className="text-left fixed-column" style={avatarColumnStyle}>
                Avatar
              </th>
              <th className="text-left fixed-column" style={emailColumnStyle}>
                Email
              </th>
              <th className="text-left">
                <div className=" flex justify-between items-center">
                  <span>Username</span>
                  <span className="flex cursor-pointer py-1">
                    <FaArrowDownLong
                      onClick={() => handleSort("desc", "username")}
                    />
                    <FaArrowUpLong
                      onClick={() => handleSort("asc", "username")}
                    />
                  </span>
                </div>
              </th>
              <th className="text-left">Phone</th>
              <th className="text-left">Role</th>
              <th className="text-left">Status</th>
              <th className="text-left">Create At</th>
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
                const avatarURL = item.avatar || defaultAvatarURL;
                return (
                  <tr key={`users=${index}`}>
                    <td className="text-left fixed-column">
                      {startIndex + index + 1}
                    </td>
                    <td className="text-left fixed-column">
                      {avatarURL ? (
                        <div className={imageContainerStyle}>
                          <img
                            src={avatarURL}
                            className={imgStyle}
                            alt="avatar"
                            onError={loadImageAgain}
                          />
                        </div>
                      ) : (
                        <div className={imageContainerStyle}>
                          <img
                            src={defaultAvatarURL}
                            className={imgStyle}
                            alt="default avatar"
                          />
                        </div>
                      )}
                    </td>
                    <td className="text-left fixed-column">{item.email}</td>
                    <td className="text-left ">{item.username}</td>
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
      </div>
    </div>
  );
}

export default BasicExample;
