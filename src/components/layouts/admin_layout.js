import Nav from "../globals/navbar";
import PrivateRouter from "@/auth/private_route";

export default function Layout({ children }) {
  return (
    <PrivateRouter>
      <Nav>{children}</Nav>
    </PrivateRouter>
  );
}
