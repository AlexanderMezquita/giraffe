import Layout from "@/components/layouts/adminLayout";
import PageHeader from "@/components/globals/pageHeader";
import { Button, Avatar } from "@mui/material";
import { Add } from "@mui/icons-material";
import { useMutation } from "@tanstack/react-query";
import { EditOutlined, DeleteOutline } from "@mui/icons-material";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import IconButton from "@mui/material/IconButton";
import DeleteDialog from "@/components/globals/dialogs/deleteDialog";
import useAxios from "@/axios";
import { useState } from "react";
import { toast } from "react-toastify";
import DataTable from "@/components/globals/datagrid";
import { formatCurrency } from "@/utils/methods";
import ServiceForm from "@/components/forms/serviceForm";

export default function Services() {
  const { axiosInstance } = useAxios();
  const queryClient = useQueryClient();
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState();
  const [formOpen, setFormOpen] = useState(false);
  const [data, setData] = useState({});
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
            alt={cells.row.name}
            src={cells.row.img[0]}
            sx={{ width: 60, height: 60 }}
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
      renderCell: (cells) => {
        return <span>{formatCurrency(cells.row.price)}</span>;
      },
    },
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
    {
      field: "Acciones",
      sortable: false,
      width: 100,
      renderCell: (cells) => {
        return (
          <div className="flex space-x-2">
            <IconButton
              onClick={() => {
                handleEdit(cells.row);
              }}
            >
              <EditOutlined className="text-green-400" />
            </IconButton>

            <IconButton
              onClick={() => {
                handleDelete(cells.row.id);
              }}
            >
              <DeleteOutline className="text-red-500" />
            </IconButton>
          </div>
        );
      },
    },
  ];

  const handleCreate = () => {
    setData({});
    setFormOpen(true);
  };

  const handleDelete = (id) => {
    setItemToDelete(id);
    setConfirmOpen(true);
  };

  const handleEdit = (data) => {
    setData(data);
    setFormOpen(true);
  };

  const cellClick = (params) => {
    setData(params.row);
    setFormOpen(true);
  };

  const getServices = useQuery({
    queryKey: ["services", pageState],
    queryFn: () => {
      return axiosInstance.get(
        `/services?Page=${pageState?.page + 1 ?? 1}&Limit=${
          pageState?.pageSize ?? 5
        }`
      );
    },
  });

  const deleteService = useMutation({
    mutationFn: (id) => {
      return axiosInstance.delete(`/service/${id}`);
    },
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
              onClick={() => {
                handleCreate();
              }}
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
        <ServiceForm
          service={data}
          open={formOpen}
          handleClose={setFormOpen}
          toast={toast}
        />
        <DataTable
          columns={columns}
          setPageState={setPageState}
          rows={getServices.data?.data?.data}
          rowCount={getServices.data?.data?.dataQuantity}
          loading={getServices.isLoading}
          header={"Servicios disponibles"}
          onCellClick={cellClick}
        />
      </section>
    </Layout>
  );
}
