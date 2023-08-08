import Layout from "@/components/layouts/admin_layout";
import PageHeader from "@/components/globals/page_header";
import { useQueryClient, useQuery } from "@tanstack/react-query";
import DataTable from "@/components/globals/datagrid";
import useAxios from "@/axios";
import { useState } from "react";

export default function Appointments() {
  const { axiosInstance } = useAxios();
  const [pageState, setPageState] = useState({
    page: 0,
    pageSize: 5,
  });

  const columns = [
    { field: "name", headerName: "Nombre", width: 150 },
    {
      field: "branch.name",
      headerName: "Sucursal",
      width: 250,
      renderCell: (cells) => {
        return <span>{cells.row.branch.name}</span>;
      },
    },
    {
      field: "service.name",
      headerName: "Servicio",
      width: 250,
      renderCell: (cells) => {
        return <span>{cells.row.service.name}</span>;
      },
    },
    { field: "phone", headerName: "Telefono", width: 250 },
    { field: "email", headerName: "Email", width: 250 },
    {
      field: "status",
      headerName: "Estatus",
      width: 140,
      renderCell: (cells) => {
        return cells.row.status !== "Activo" ? (
          <span className="bg-red-200 rounded-2xl px-1 pr-3 py-1 flex items-center">
            <span className="w-2 h-2 rounded-full mx-2 bg-red-700 animate-pulse  "></span>
            Desactivado
          </span>
        ) : (
          <span className="bg-green-200 rounded-2xl px-1 pr-3 py-1 flex items-center">
            <span className="w-2 h-2 rounded-full mx-2 bg-green-700 animate-pulse  "></span>
            Activo
          </span>
        );
      },
    },
  ];

  const getAsyncAppointments = async (params) =>
    await axiosInstance.get(
      `/appointments?Page=${params?.page + 1 ?? 1}&Limit=${
        params?.pageSize ?? 5
      }`
    );

  const getAppointments = useQuery({
    queryKey: ["appointments", pageState],
    queryFn: () => getAsyncAppointments(pageState),
  });

  return (
    <Layout>
      <section>
        <div className="flex w-full justify-between items-center  mb-5 ">
          <PageHeader Icon={"/assets/invoices.svg"} header={"Citas"} />
          <div className="flex"></div>
        </div>

        <DataTable
          columns={columns}
          setPageState={setPageState}
          rows={getAppointments.data?.data?.data}
          rowCount={getAppointments.data?.data?.dataQuantity}
          loading={getAppointments.isLoading}
          header={"Citas disponibles"}
        />
      </section>
    </Layout>
  );
}
