import Layout from "@/components/layouts/admin_layout";
import { Button } from "@mui/material";
import PageHeader from "@/components/globals/page_header";
import { Add } from "@mui/icons-material";

export default function Branches() {
  return (
    <Layout>
      <section>
        <div className="flex w-full justify-between items-center ">
          <PageHeader Icon={"/assets/users.svg"} header={"Empleados"} />
          <div className="flex">
            <Button
              variant="contained"
              size="large"
              color="primary"
              startIcon={<Add className="text-white ml-3 sm:ml-0" />}
            >
              <span className="text-sm hidden sm:block whitespace-nowrap text-neutral-50 capitalize font-bold">
                Nuevo Empleado
              </span>
            </Button>
          </div>
        </div>
        <h1>Empleados's page</h1>
      </section>
    </Layout>
  );
}
