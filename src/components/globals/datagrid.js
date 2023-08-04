import { DataGrid } from "@mui/x-data-grid";

export default function DataTable({
  columns,
  rowCount,
  header,
  loading,
  rows,
  setPageState,
}) {
  return (
    <div className=" border p-2 max-w-5xl w-full mx-auto h-full bg-white rounded-lg">
      <h2 className="py-5 px-2 text-xl text-primary">{header}</h2>

      <DataGrid
        getRowId={(row) => row.id}
        rowCount={rowCount ?? 0}
        rows={rows ?? []}
        loading={loading}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { pageSize: 5, page: 0 },
          },
        }}
        className="h-96"
        getRowClassName={(params) =>
          params.indexRelativeToCurrentPage % 2 === 0 ? "" : "bg-slate-100"
        }
        localeText={{
          noRowsLabel: "No hay datos disponibles",
          noResultsOverlayLabel: "No se encontraron resultados",
        }}
        rowHeight={70}
        onPaginationModelChange={(params) => {
          setPageState(params);
        }}
        paginationMode="server"
        pageSizeOptions={[5, 10, 25]}
        pagination
        disableColumnFilter
        hideFooterSelectedRowCount
        disableColumnSelector
        disableColumnMenu
        disableRowSelectionOnClick
      />
    </div>
  );
}
