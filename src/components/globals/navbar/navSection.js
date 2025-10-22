import {
  Box,
  Collapse,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  styled,
} from "@mui/material";
import palette from "@/styles/theme/palette";
import { useRouter } from "next/router";
import { useState } from "react";
import { ExpandLess, ExpandMore, FiberManualRecord } from "@mui/icons-material";

// ----------------------------------------------------------------------

const StyledNavItem = styled((props) => (
  <ListItemButton disableGutters {...props} />
))(({ theme }) => ({
  ...theme.typography.body2,
  height: 48,
  margin: 3,
  position: "relative",
  textTransform: "capitalize",
  color: theme.palette.text.secondary,
  //   borderRadius: theme.shape.borderRadius,
}));

const StyledNavItemIcon = styled(ListItemIcon)({
  width: 22,
  height: 22,
  color: "inherit",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const StyledSubNavItemIcon = styled(ListItemIcon)({
  fontSize: 2,
  color: "inherit",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

export default function NavSection({ onClose }) {
  const { pathname, push } = useRouter();

  const config = [
    {
      groupTitle: "Administracion",
      items: [
        {
          title: "Inicio",
          path: "/admin",
          icon: Icon("apps"),
          info: "",
        },
        {
          title: "Sucursales",
          path: "/admin/sucursales",
          icon: Icon("branches"),
          info: "",
        },
        {
          title: "Citas",
          path: "/admin/citas",
          icon: Icon("invoices"),
          info: "",
        },
      ],
    },
    {
      groupTitle: "Colaboradores",
      items: [
        {
          title: "Servicios",
          path: "/admin/servicios",
          icon: Icon("services"),
          info: "",
        },
        {
          title: "Empleados",
          path: "/admin/empleados",
          icon: Icon("users"),
          info: "",
        },
        {
          title: "Horarios",
          path: "/admin/horarios",
          icon: Icon("schedule"),
          info: "",
        },
      ],
    },
  ];

  function SvgColor({ src, sx, ...other }) {
    return (
      <Box
        component="span"
        className="svg-color"
        sx={{
          width: 24,
          height: 24,
          display: "inline-block",
          bgcolor: "currentColor",
          mask: `url(${src}) no-repeat center / contain`,
          WebkitMask: `url(${src}) no-repeat center / contain`,
          ...sx,
        }}
        {...other}
      />
    );
  }

  function Icon(name) {
    return (
      <SvgColor src={`/assets/${name}.svg`} sx={{ width: 1, height: 1 }} />
    );
  }

  return (
    <Box>
      <List disablePadding sx={{ p: 2 }}>
        {config.map((groupItem, index) => (
          <div key={index}>
            <h2 className="p-2 text-lg">{groupItem.groupTitle}</h2>
            {groupItem.items.map((child, index) => (
              <NavItem
                key={index}
                currentPath={pathname}
                item={child}
                redirect={push}
                onClose={onClose}
              />
            ))}
          </div>
        ))}
        <i className="fi fi-ro-user"></i>
      </List>
    </Box>
  );
}

function NavItem({ item, currentPath, redirect, onClose }) {
  const [open, setOpen] = useState(false);
  const { icon, title, items, info, path } = item;

  return (
    <Box>
      <StyledNavItem
        //   component={RouterLink}
        onClick={() => {
          items ? setOpen(!open) : (redirect(path), onClose?.() ?? null);
        }}
        selected={currentPath === path}
        sx={{
          "&.active": {
            color: "text.primary",
            bgcolor: "action.selected",
            fontWeight: "fontWeightBold",
          },
        }}
        className="rounded-xl"
      >
        <StyledNavItemIcon
          sx={{ color: currentPath === path && palette.primary.main }}
        >
          {icon && icon}
        </StyledNavItemIcon>
        <ListItemText
          disableTypography
          primary={title}
          sx={{ color: currentPath === path && palette.primary.main }}
        />
        {info && info}
        {items && (open ? <ExpandLess /> : <ExpandMore />)}
      </StyledNavItem>

      <Collapse
        in={open || items?.find((d) => d.path == currentPath) != undefined}
      >
        {items?.map((child, index) => (
          <StyledNavItem
            key={index}
            // component={RouterLink}
            onClick={() => {
              redirect(child.path);
              onClose?.() ?? null;
            }}
            // to={child.path}
            sx={{ m: 1 }}
          >
            {" "}
            <StyledSubNavItemIcon
              sx={{ color: currentPath === child.path && palette.primary.main }}
            >
              <FiberManualRecord
                sx={{
                  fontSize: currentPath === child.path ? 14 : 8,
                  color: currentPath === child.path && palette.primary.main,
                }}
              />
            </StyledSubNavItemIcon>
            <ListItemText
              disableTypography
              sx={{ color: currentPath === child.path && palette.text.main }}
              primary={child.title}
            />
          </StyledNavItem>
        ))}
      </Collapse>
    </Box>
  );
}
// ----------------------------------------------------------------------
