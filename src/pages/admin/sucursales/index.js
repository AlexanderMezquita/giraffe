import PageHeader from "@/components/globals/page_header";
import Layout from "@/components/layouts/admin_layout";
import { Add } from "@mui/icons-material";
import { Button } from "@mui/material";

export default function Branches() {
  return (
    <Layout>
      <section className="w-full flex flex-col">
        <div className="flex w-full justify-between items-center ">
          <PageHeader Icon={"/assets/branches.svg"} header={"Sucursales"} />
          <div className="flex">
            <Button
              variant="contained"
              size="large"
              color="primary"
              startIcon={<Add className="text-white ml-3 sm:ml-0" />}
            >
              <span className="text-sm hidden sm:block whitespace-nowrap text-neutral-50 capitalize font-bold">
                Nueva Sucursal
              </span>
            </Button>
          </div>
        </div>
        <h1>Sucursales's page</h1>
      </section>
    </Layout>
  );
}
