import Nav from "../globals/navbar";
import PrivateRouter from "@/auth/private-route";

export default function Layout({ children }) {
  return (
    <PrivateRouter>
      <Nav>{children}</Nav>
    </PrivateRouter>
  );
}
