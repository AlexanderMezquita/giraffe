import Layout from "@/components/layouts/admin_layout";
import { Button, Avatar, IconButton } from "@mui/material";
import { EditOutlined, DeleteOutline } from "@mui/icons-material";
import PageHeader from "@/components/globals/page_header";
import { Add } from "@mui/icons-material";
import useAxios from "@/axios";
import { useQueryClient, useQuery } from "@tanstack/react-query";
import DeleteDialog from "@/components/globals/delete-dialog";
import DataTable from "@/components/globals/datagrid";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import EmployeeForm from "@/components/forms/employee-form";

export default function Employees() {
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
            src={cells.row.img}
            sx={{ width: 60, height: 60 }}
          />
        );
      },
    },
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

  const getAsyncBranchId = async (id) =>
    await axiosInstance.get(`/branch/${id}`);

  const getEmployees = useQuery({
    queryKey: ["employees", pageState],
    queryFn: () =>
      axiosInstance.get(
        `/employees?Page=${pageState?.page + 1 ?? 1}&Limit=${
          pageState?.pageSize ?? 5
        }`
      ),
  });

  const deleteEmployee = useMutation({
    mutationFn: (id) => {
      return axiosInstance.delete(`/employee/${id}`);
    },
    onSettled: async () => {
      setConfirmOpen(false);
    },
    onSuccess: () => {
      queryClient.invalidateQueries("employees");
      toast.success("Empleado eliminado exitosamente");
    },
    onError: () => {
      toast.error("Error eliminando empleado");
    },
  });

  return (
    <Layout>
      <section>
        <div className="flex w-full justify-between items-center  mb-5 ">
          <PageHeader Icon={"/assets/users.svg"} header={"Empleados"} />
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
                Nuevo Empleado
              </span>
            </Button>
          </div>
        </div>
        <DeleteDialog
          open={confirmOpen}
          setOpen={setConfirmOpen}
          onConfirm={() => {
            deleteEmployee.mutate(itemToDelete);
          }}
          loading={deleteEmployee.isLoading}
        />
        <EmployeeForm
          employee={data}
          open={formOpen}
          handleClose={setFormOpen}
          toast={toast}
        />
        <DataTable
          columns={columns}
          setPageState={setPageState}
          rows={getEmployees.data?.data?.data}
          rowCount={getEmployees.data?.data?.dataQuantity}
          loading={getEmployees.isLoading}
          header={"Empleados disponibles"}
        />
      </section>
    </Layout>
  );
}
