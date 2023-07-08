import { Avatar, Box, Link, Typography } from "@mui/material";

export default function ProfileCard() {
  return (
    <Box sx={{ mx: 2.5, mt: 2 }}>
      <div className=" flex items-center p-2 rounded-md bg-tertiary">
        <Avatar src="/assets/adminIcon.svg" alt="photoURL" />
        <Box sx={{ ml: 2 }}>
          <h2>Admin</h2>

          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            Administrador
          </Typography>
        </Box>
      </div>
    </Box>
  );
}
