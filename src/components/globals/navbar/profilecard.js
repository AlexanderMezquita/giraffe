import { alpha, Avatar, Box, Link, styled, Typography } from "@mui/material";

const StyledAccount = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(2, 2.5),
  borderRadius: Number(theme.shape.borderRadius) * 1.5,
  backgroundColor: alpha(theme.palette.grey[500], 0.12),
}));
export default function ProfileCard() {
  return (
    <Box sx={{ mx: 2.5, mt: 2 }}>
      <Link underline="none">
        <div className="flex items-center p-2 rounded-md bg-slate-200 ">
          <Avatar src="/assets/adminIcon.svg" alt="photoURL" />

          <Box sx={{ ml: 2 }}>
            <Typography variant="subtitle2" sx={{ color: "text.primary" }}>
              Admin
            </Typography>

            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              Administrador
            </Typography>
          </Box>
        </div>
      </Link>
    </Box>
  );
}
