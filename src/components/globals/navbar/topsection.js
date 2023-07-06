import { Box, Avatar, Popover, Divider } from "@mui/material";

import { useState } from "react";

export default function TopSection() {
  const account = {
    photoURL: "https://cdn-icons-png.flaticon.com/512/2202/2202112.png",
    displayName: "Admin user",
    role: "admin",
    email: "testuser@gmail.com",
  };
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const id = open ? "profile-popover" : undefined;

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <nav className="flex w-full items-center justify-between ">
      <div className={`flex justify-center text-black items-center   p-2`}>
        search
      </div>
      <div className="flex  p-4 items-center justify-center space-x-4">
        <Avatar
          src="/assets/adminIcon.svg"
          aria-describedby={id}
          onClick={handleClick}
          alt="admin"
          sx={{
            width: 50,
            height: 50,
            "&:hover": {
              cursor: "pointer",
              transform: "scale(1.1)",
              transitionDuration: "200ms",
              transitionProperty: "all",
            },
          }}
        />
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
        >
          <div className="flex flex-col text-sm rounded-2xl">
            <div className="flex flex-col px-4 py-2 mt-1">
              <span className="font-semibold">{account.displayName}</span>
              <span className=" text-neutral-400">{account.email}</span>
            </div>
            <Divider className="px-0" />
            <div className="flex flex-col mx-2 my-2 ">
              <span className="px-2 py-2 cursor-pointer hover:bg-slate-100 rounded-lg duration-200">
                Inicio
              </span>
              <span className="px-2 py-2 cursor-pointer hover:bg-slate-100 rounded-lg duration-200">
                Perfil
              </span>
              <span className="px-2 py-2 cursor-pointer hover:bg-slate-100 rounded-lg duration-200">
                Ajustes
              </span>
            </div>
            <Divider className="px-0" />
            <div className="flex flex-col mx-2 py-2 ">
              <span
                className="px-2 py-2 cursor-pointer hover:bg-slate-100 rounded-lg duration-200"
                // onClick={() => LogOut()}
              >
                Cerrar sesion
              </span>
            </div>
          </div>
        </Popover>
      </div>
    </nav>
  );
}
