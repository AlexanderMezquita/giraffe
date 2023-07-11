import Layout from "@/components/layouts/admin_layout";
import PageHeader from "@/components/globals/page_header";
import { Button } from "@mui/material";
import { Add } from "@mui/icons-material";

export default function Branches() {
  return (
    <Layout>
      <div className="flex w-full justify-between items-center ">
        <PageHeader Icon={"/assets/schedule.svg"} header={"Horarios"} />
        <div className="flex">
          <Button
            variant="contained"
            size="large"
            color="primary"
            startIcon={<Add className="text-white ml-3 sm:ml-0" />}
          >
            <span className="text-sm hidden sm:block whitespace-nowrap text-neutral-50 capitalize font-bold">
              Nuevo Horario
            </span>
          </Button>
        </div>
      </div>
      <h1>Horarios's page</h1>
    </Layout>
  );
}
