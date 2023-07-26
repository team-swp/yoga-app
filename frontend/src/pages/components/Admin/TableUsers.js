import Table from "react-bootstrap/Table";
import { useState, useEffect } from "react";
import Switch from "@mui/material/Switch";
import { getMember, getRoles } from "../../../helper/loginAPI";
import { updateUserForAdmin } from "../../../helper/adminAPI";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import _, { debounce } from "lodash";
import { FaArrowDownLong, FaArrowUpLong } from "react-icons/fa6";
import { getAvatarToAWS } from "../../../helper/loginAPI";
import styles from "../../../styles/Username.module.css";
import classNames from "classnames/bind";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const cx = classNames.bind(styles);

function BasicExample() {
  const moment = require("moment");
  const [roles, setRoles] = useState([]);
  const [listUser, setListUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [sortBy, setSortBy] = useState("asc");
  const [sortField, setSortField] = useState("id");
  const [originalListUsers, setOriginalListUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [number, setNumber] = useState(0);
  const [idActive, setIdActive] = useState("");
  const [currentRole, setCurrentRole] = useState("");

  const [avatarURLs, setAvatarURLs] = useState([]);
  const [selectedRole, setSelectedRole] = useState("");

  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [userIdToUpdate, setUserIdToUpdate] = useState("");
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [statusUserIdToUpdate, setStatusUserIdToUpdate] = useState("");

  const handleRoleChange = (event, item) => {
    setSelectedRole(event.target.value);
    Object.assign(item, { role: event.target.value });
    setIdActive(item._id);
    setCurrentRole(selectedRole);
  };

  const defaultAvatarURL =
    "https://vnn-imgs-f.vgcloud.vn/2020/03/23/11/trend-avatar-1.jpg";

  async function fetchUsers() {
    try {
      const response = await getMember();
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
      console.log("Failed to fetch users");
    }
  }

  async function fetchRoles() {
    try {
      const response = await getRoles();
      const data = response.data.filter((obj) => obj.rolename !== "admin");
      setRoles(data);
    } catch {
      console.log("Failed to fetch roles");
    }
  }
  useEffect(() => {
    fetchRoles();
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

  const handleUpdateRole = (userId) => {
    setUserIdToUpdate(userId);
    setShowConfirmModal(true);
  };

  const handleStatusToggle = (userId) => {
    setStatusUserIdToUpdate(userId);
    setShowStatusModal(true);
  };

  const confirmUpdateRole = async () => {
    try {
      await updateUserForAdmin({
        _id: userIdToUpdate,
        role: selectedRole,
      });
      setNumber((preNum) => preNum + 1);
      const updatedUsers = listUser.map((user) => {
        if (user._id === userIdToUpdate) {
          return { ...user, role: selectedRole };
        }
        return user;
      });
      setListUsers(updatedUsers);
      setIdActive("");
      setSelectedRole("");
      setShowConfirmModal(false);

      toast.success("Role updated successfully!", {
        position: toast.POSITION.TOP_RIGHT,
      });
      fetchUsers();
    } catch (error) {
      console.log(error);
    }
  };

  const confirmUpdateStatus = async () => {
    try {
      const updatedList = [...listUser];
      const userIndex = updatedList.findIndex(
        (user) => user._id === statusUserIdToUpdate
      );
      if (userIndex > -1) {
        updatedList[userIndex].status = !updatedList[userIndex].status;
        setListUsers(updatedList);

        await updateUserForAdmin({
          _id: statusUserIdToUpdate,
          status: updatedList[userIndex].status,
        });

        toast.success("Status updated successfully!", {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setShowStatusModal(false);
    }
  };

  useEffect(() => {}, [number]);

  const imgStyle = `${styles.profile_img} object-cover h-12 w-12 rounded-full`;
  const imageContainerStyle = "flex items-center justify-center h-12 w-12";
  const idColumnStyle = { width: "50px" };
  const emailColumnStyle = { width: "300px" };
  const avatarColumnStyle = { width: "80px" };

  return (
    <div className={cx("table-container")}>
      <ToastContainer />
      <div className="table-responsive ">
        <div className="py-7 col w">
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
              <th className="text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {listUser &&
              listUser.length > 0 &&
              listUser.slice(startIndex, endIndex).map((item, index) => {
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
                            onError={(e) => loadImageAgain(e, item.avatar)}
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
                    <td className="text-left">
                      <select
                        value={item.role}
                        onChange={(event) => handleRoleChange(event, item)}
                      >
                        {roles.length > 0 &&
                          roles.map((role) => (
                            <option key={role} value={role.rolename}>
                              {role.rolename}
                            </option>
                          ))}
                      </select>
                    </td>
                    <td className="text-left">
                      <Switch
                        checked={item.status}
                        onChange={() => handleStatusToggle(item._id)}
                        color="primary"
                      />
                    </td>
                    <td className="text-left">
                      {moment(item.createdAt).format("DD/MM/YY")}
                    </td>
                    <td className="text-left">
                      <Button
                        disabled={idActive === item._id ? false : true}
                        onClick={() => handleUpdateRole(item._id)}
                        variant="warning"
                      >
                        Update
                      </Button>
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

      <Modal show={showConfirmModal} onHide={() => setShowConfirmModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Update Role</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to update the role?</Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowConfirmModal(false)}
          >
            Cancel
          </Button>
          <Button variant="primary" onClick={confirmUpdateRole}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showStatusModal} onHide={() => setShowStatusModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Update Status</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to update the status?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowStatusModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={confirmUpdateStatus}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default BasicExample;
