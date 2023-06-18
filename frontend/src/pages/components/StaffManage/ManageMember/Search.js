import React, { useState, useEffect } from "react";
import { InputAdornment, TextField } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import SearchIcon from "@mui/icons-material/Search";
import { Toaster, toast } from "react-hot-toast";

function Search(props) {
  const {
    newBookings,
    setSearchResults,
    setNewTotalPage,
    setCurrentPage,
    perPage,
    setIsSearching,
  } = props;

  const [searchKeyword, setSearchKeyword] = useState("");

  const handleSearchChange = (event) => {
    setSearchKeyword(event.target.value);
  };

  const handleClearSearch = () => {
    setSearchKeyword("");
    setSearchResults([]);
  };

  const handleKeyDown = (event) => {
    if (event.keyCode === 13) {
      handleSearch();
    }
  };

  const handleSearch = () => {
    if (searchKeyword.trim() === "") {
      return;
    }

    const searchBookings = newBookings.filter(
      (booking) =>
        booking.username.toLowerCase().includes(searchKeyword.toLowerCase()) ||
        booking.email.toLowerCase().includes(searchKeyword.toLowerCase())
    );
    setIsSearching(true);
    setSearchResults(searchBookings);

    if (searchBookings.length === 0) {
      toast.error("Can't found!");
    }

    // Tính toán lại totalPage dựa trên kết quả tìm kiếm
    const newTotalPage = Math.ceil(searchBookings.length / perPage);
    setNewTotalPage(newTotalPage);
    setCurrentPage(1);

    // Thông báo về giá trị mới của totalPage
    setNewTotalPage(newTotalPage);
  };

  useEffect(() => {
    if (searchKeyword === "") {
      setSearchResults([]);
    }
  }, []);

  return (
    <div
      style={{
        marginTop: "10px",
        marginBottom: "16px",
        display: "flex",
        alignItems: "center",
      }}
    >
      <Toaster position="top-center" reverseOrder={false} />
      <TextField
        id="standard-basic"
        label="Search"
        variant="standard"
        value={searchKeyword}
        onChange={handleSearchChange}
        onKeyDown={handleKeyDown}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon onClick={handleSearch} sx={{ cursor: "pointer" }} />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              {searchKeyword && (
                <ClearIcon
                  onClick={handleClearSearch}
                  sx={{ cursor: "pointer" }}
                />
              )}
            </InputAdornment>
          ),
        }}
        style={{ marginRight: "8px" }}
      />
    </div>
  );
}

export default Search;
