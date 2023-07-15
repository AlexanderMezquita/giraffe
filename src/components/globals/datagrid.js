import { Card } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

export default function DataTable({ columns, header, loading, rows }) {
  // const onDataGridPageChange = (newPage) => {
  //   setPageState({
  //     ...pageState,
  //     page: newPage + 1,
  //     pageSize: pageState.pageSize,
  //   });
  // };

  // const onDataGridPageSizeChange = (newPageSize) => {
  //   setPageState({
  //     ...pageState,
  //     page: pageState.page,
  //     pageSize: newPageSize,
  //   });
  // };

  return (
    <div className=" border p-2 max-w-5xl w-full mx-auto h-full bg-white rounded-lg">
      <h2 className="py-5 px-2 text-xl text-primary">{header}</h2>
      <DataGrid
        getRowId={(row) => row.id}
        rows={rows ?? []}
        loading={loading}
        columns={columns}
        className="h-96"
        getRowClassName={(params) =>
          params.indexRelativeToCurrentPage % 2 === 0 ? "" : "bg-slate-50"
        }
        localeText={{
          noRowsLabel: "No hay datos disponibles",
          noResultsOverlayLabel: "No se encontraron resultados",
        }}
        pagination
        rowHeight={70}
        // onPageChange={onDataGridPageChange}
        // onPageSizeChange={onDataGridPageSizeChange}
        paginationMode="server"
        // rowCount={10}
        pageSizeOptions={[5, 10, 25]}
        disableColumnFilter
        hideFooterSelectedRowCount
        disableColumnSelector
        disableColumnMenu
        disableRowSelectionOnClick
      />
    </div>
  );
}
