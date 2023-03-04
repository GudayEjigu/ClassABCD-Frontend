import React, { useState } from "react";
import { useNavigate } from "react-router-dom/dist";
import { useAuth } from "../context/auth";
import Logo from "../assets/Logo";
import { FaUser, FaUserAlt } from "react-icons/fa";
import Dropdown from "muicss/lib/react/dropdown";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import DropdownItem from "muicss/lib/react/dropdown-item";
import { Button, Fade, IconButton, Menu, MenuItem } from "@mui/material";

const NavBar = () => {
  const [open, setOpen] = useState(false);
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open1 = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div className="flex flex-row">
      <div className="w-11/12 flex flex-row ">
        <div>
          <h2 class="  text-xl  pl-6 pt-8 font-extrabold leading-none tracking-tight text-black md:text-xl">
            Yeabrak Pregnancy Managment
          </h2>
        </div>
      </div>

      <div className="flex justify-end w-1/12 mr-4 mt-4">
        <div>
          <Button
            variant="text"
            style={{
              color: "black",
              borderRadius: 64,

              padding: "16px ",
              margin: "0px",
            }}
            aria-controls={open1 ? "fade-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open1 ? "true" : undefined}
            onClick={handleClick}
          >
            <FaUser className=" text-2xl " />
          </Button>

          <Menu
            id="fade-menu"
            MenuListProps={{
              "aria-labelledby": "fade-button",
            }}
            anchorEl={anchorEl}
            open={open1}
            onClose={handleClose}
            TransitionComponent={Fade}
          >
            <MenuItem onClick={handleClose}>Profile</MenuItem>
            <MenuItem onClick={handleClose}>My account</MenuItem>
            <MenuItem onClick={logout}>Logout</MenuItem>
          </Menu>
        </div>

        {/* <button
          onClick={logout}
          type="submit"
          className="text-white  bg-[#636ab1] hover:bg-red-800 rounded shadow-sm px-4 pt-1 mt-4 pb-2  mr-4"
        >
          Logout
        </button> */}
      </div>
    </div>
  );
};

export default NavBar;
