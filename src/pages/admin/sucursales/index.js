import DataTable from "@/components/globals/datagrid";
import PageHeader from "@/components/globals/page_header";
import Layout from "@/components/layouts/admin_layout";
import { useEffect, useState } from "react";
import { Add } from "@mui/icons-material";
import { Button } from "@mui/material";
import useAxios from "@/axios";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function Branches() {
  const { axiosInstance } = useAxios();
  const [pageState, setPageState] = useState({
    isLoading: true,
    data: [],
    pageSize: 5,
    page: 1,
    // filter: {
    //   value: "",
    //   status: "all",
    // },
    totalData: 0,
  });
  const columns = [
    { field: "img", headerName: "Imagen", width: 120 },
    { field: "name", headerName: "Nombre", width: 150 },
    { field: "address", headerName: "Dirección", width: 250 },
    { field: "phone", headerName: "Teléfono", width: 200 },
    { field: "status", headerName: "Estatus", width: 110 },
  ];

  const getAsyncBranches = async () =>
    await axiosInstance.get("/branches?Page=1&Limit=10");

  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["branches"],
    queryFn: () => getAsyncBranches(),
  });

  // useEffect(() => {
  //   console.log(data.data.data, isLoading, "React Query");
  // }, []);

  return (
    <Layout>
      <section className="w-full flex flex-col">
        <div className="flex w-full justify-between items-center mb-5 ">
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

        <DataTable
          pageState={pageState}
          setPageState={setPageState}
          columns={columns}
          rows={data?.data?.data}
          loading={isLoading}
          header={"Sucursales disponibles"}
        />
      </section>
    </Layout>
  );
}
