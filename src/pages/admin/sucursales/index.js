import DataTable from "@/components/globals/datagrid";
import PageHeader from "@/components/globals/page_header";
import Layout from "@/components/layouts/admin_layout";
import { useState } from "react";
import { Add } from "@mui/icons-material";
import { Button } from "@mui/material";
import useAxios from "@/axios";
import Avatar from "@mui/material/Avatar";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { formatNumber } from "@/utils/methods";
import { EditOutlined, DeleteOutline } from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import DeleteDialog from "@/components/globals/delete-dialog";
import { useMutation } from "@tanstack/react-query";

export default function Branches() {
  const { axiosInstance } = useAxios();
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState();

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
    { field: "address", headerName: "Dirección", width: 250 },
    {
      field: "phone",
      headerName: "Teléfono",
      width: 200,
      renderCell: (cells) => {
        return <span>{formatNumber(cells.row.phone)}</span>;
      },
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

  const getAsyncBranches = async () =>
    await axiosInstance.get("/branches?Page=1&Limit=10");

  const deleteAsyncBranch = async (id) =>
    await axiosInstance.delete(`/branch/${id}`);

  const queryClient = useQueryClient();
  const getBranches = useQuery({
    queryKey: ["branches"],
    queryFn: () => getAsyncBranches(),
  });

  const deleteBranch = useMutation({
    mutationFn: (id) => deleteAsyncBranch(id),
    onSettled: async () => setConfirmOpen(false),
    onSuccess: () => {
      queryClient.invalidateQueries("branches");
    },
  });

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

        <DeleteDialog
          open={confirmOpen}
          setOpen={setConfirmOpen}
          onConfirm={() => {
            deleteBranch.mutate(itemToDelete);
          }}
          loading={deleteBranch.isLoading}
          // setOpen={true}
        />

        <DataTable
          columns={columns}
          rows={getBranches.data?.data?.data}
          loading={getBranches.isLoading}
          header={"Sucursales disponibles"}
        />
      </section>
    </Layout>
  );
}
