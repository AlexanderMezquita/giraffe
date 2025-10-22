import Nav from "../globals/navbar";
import PrivateRouter from "@/auth/privateRoute";
import Head from "next/head";

export default function Layout({ children }) {
  return (
    <PrivateRouter>
      <Head>
        <title>Rizos Afros y Más - Admin </title>
        <meta
          property="og:title"
          content="Rizos Afros y Más || Administrador"
          key="title"
        />
      </Head>
      <Nav>{children}</Nav>
    </PrivateRouter>
  );
}
