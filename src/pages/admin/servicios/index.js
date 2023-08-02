import Layout from "@/components/layouts/admin_layout";
import PageHeader from "@/components/globals/page_header";
import { Button, Avatar } from "@mui/material";
import { Add } from "@mui/icons-material";
import { useMutation } from "@tanstack/react-query";
import { EditOutlined, DeleteOutline } from "@mui/icons-material";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import IconButton from "@mui/material/IconButton";
import DeleteDialog from "@/components/globals/delete-dialog";
import useAxios from "@/axios";
import { useState } from "react";
import { toast } from "react-toastify";
import DataTable from "@/components/globals/datagrid";

export default function Services() {
  const { axiosInstance } = useAxios();
  const queryClient = useQueryClient();
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState();
  const [pageState, setPageState] = useState({
    page: 0,
    pageSize: 5,
  });

  const columns = [
    {
      field: "img",
      headerName: "Imagen",
      width: 120,
      renderCell: (cells) => {
        return (
          <Avatar
            alt={cells.row.img}
            // src="/static/images/avatar/1.jpg"
            sx={{ width: 30, height: 30 }}
          />
        );
      },
    },
    { field: "name", headerName: "Nombre", width: 150 },
    { field: "description", headerName: "Descripción", width: 250 },
    {
      field: "price",
      headerName: "Precio",
      width: 200,
      // renderCell: (cells) => {
      //   return <span>{formatNumber(cells.row.phone)}</span>;
      // },
    },
    {
      field: "status",
      headerName: "Estatus",
      width: 140,
      renderCell: (cells) => {
        return cells.row.status !== "Activo" ? (
          <span className="bg-red-200 rounded-2xl px-2 py-1 flex items-center">
            <span className="w-2 h-2 rounded-full mx-2 bg-red-700 animate-pulse  "></span>
            Desactivado
          </span>
        ) : (
          <span className="bg-green-200 rounded-2xl px-2 py-1 flex items-center">
            <span className="w-2 h-2 rounded-full mx-2 bg-green-700 animate-pulse  "></span>
            Activo
          </span>
        );
      },
    },
    {
      field: "Acciones",
      sortable: false,
      width: 100,
      renderCell: (cells) => {
        return (
          <div className="flex space-x-2">
            <IconButton>
              <EditOutlined className="text-green-400" />
            </IconButton>

            <IconButton
              onClick={() => {
                setConfirmOpen(true);
                setItemToDelete(cells.row.id);
              }}
            >
              <DeleteOutline className="text-red-500" />
            </IconButton>
          </div>
        );
      },
    },
  ];

  const getAsyncServices = async (params) =>
    await axiosInstance.get(
      `/services?Page=${params?.page + 1 ?? 1}&Limit=${params?.pageSize ?? 5}`
    );

  const deleteAsyncService = async (id) =>
    await axiosInstance.delete(`/service/${id}`);

  const getServices = useQuery({
    queryKey: ["services", pageState],
    queryFn: () => getAsyncServices(pageState),
  });

  const deleteService = useMutation({
    mutationFn: (id) => deleteAsyncService(id),
    onSettled: async () => {
      setConfirmOpen(false);
    },
    onSuccess: () => {
      queryClient.invalidateQueries("services");
      toast.success("Servicio eliminado exitosamente");
    },
    onError: () => {
      toast.error("Error eliminando servicio");
    },
  });

  return (
    <Layout>
      <section>
        <div className="flex w-full justify-between items-center  mb-5 ">
          <PageHeader Icon={"/assets/services.svg"} header={"Servicios"} />
          <div className="flex">
            <Button
              variant="contained"
              size="large"
              color="primary"
              startIcon={<Add className="text-white ml-3 sm:ml-0" />}
            >
              <span className="text-sm hidden sm:block whitespace-nowrap text-neutral-50 capitalize font-bold">
                Nuevo Servicio
              </span>
            </Button>
          </div>
        </div>
        <DeleteDialog
          open={confirmOpen}
          setOpen={setConfirmOpen}
          onConfirm={() => {
            deleteService.mutate(itemToDelete);
          }}
          loading={deleteService.isLoading}
          // setOpen={true}
        />
        <DataTable
          columns={columns}
          setPageState={setPageState}
          rows={getServices.data?.data?.data}
          rowCount={getServices.data?.data?.dataQuantity}
          loading={getServices.isLoading}
          header={"Servicios disponibles"}
        />
      </section>
    </Layout>
  );
}
