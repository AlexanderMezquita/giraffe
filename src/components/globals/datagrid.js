import { Card } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

export default function DataTable({ pageState, setPageState, columns }) {
  const rows = [
    {
      name: "asdasd 3",
      address: "1233",
      phone: "980980",
      isDeleted: false,
      img: "string",
      status: "active",
      id: 3,
    },
    {
      name: "Cerros de gurabo",
      address: "Calle #1 gurabo club",
      phone: "9809801232",
      isDeleted: false,
      img: "string",
      status: "active",
      id: 4,
    },
    {
      name: "asdasd 3",
      address: "1233",
      phone: "980980",
      isDeleted: false,
      img: "string",
      status: "active",
      id: 5,
    },
  ];

  const onDataGridPageChange = (newPage) => {
    setPageState({
      ...pageState,
      page: newPage + 1,
      pageSize: pageState.pageSize,
    });
  };

  const onDataGridPageSizeChange = (newPageSize) => {
    setPageState({
      ...pageState,
      page: pageState.page,
      pageSize: newPageSize,
    });
  };

  return (
    <div className=" border p-2 max-w-5xl w-full mx-auto h-full bg-white rounded-lg">
      <h2 className="py-5 px-2 text-xl text-primary">Sucursales disponibles</h2>
      <DataGrid
        rows={rows}
        columns={columns}
        className="h-96"
        getRowClassName={(params) =>
          params.indexRelativeToCurrentPage % 2 === 0 ? "" : "bg-slate-50"
        }
        localeText={{
          noRowsLabel: "No hay datos disponibles",
        }}
        pagination
        rowHeight={60}
        onPageChange={onDataGridPageChange}
        onPageSizeChange={onDataGridPageSizeChange}
        paginationMode="server"
        disableColumnFilter
        hideFooterSelectedRowCount
        disableColumnSelector
        disableColumnMenu
        disableRowSelectionOnClick
      />
    </div>
  );
}
