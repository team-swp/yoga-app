import React, { useState, useEffect } from "react";
import { InputAdornment, TextField } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import SearchIcon from "@mui/icons-material/Search";
import { Toaster, toast } from "react-hot-toast";

function Search({ newBookings, setSearchResults }) {
  const [searchKeyword, setSearchKeyword] = useState("");

  const handleSearchChange = (event) => {
    setSearchKeyword(event.target.value);
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

    setSearchResults(searchBookings);

    if (searchBookings.length === 0) {
      toast.error("Can't found!");
    }
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
                  onClick={() => setSearchKeyword("")}
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
