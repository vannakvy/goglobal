import * as React from "react";
import { DataGrid } from "@material-ui/data-grid";

const columns = [
  { field: "លេខរៀង", headerName: "លេខរៀង", width: 70 },
  { field: "ឈ្មោះ", headerName: "ឈ្មោះ", width: 130 },
  { field: "ស្ថាប័ន", headerName: "ស្ថាប័ន", width: 130 },
  {
    field: "អស័យដ្ធាន",
    headerName: "អស័យដ្ធាន",
    width: 90,
  },
  {
    field: "ទូរស័ព្ធ",
    headerName: "ទូរស័ព្ធ",
    sortable: false,
    width: 160,
    type: "number",
  },
  {
    field: "ផ្សេងៗ",
    headerName: "ផ្សេងៗ",
    sortable: false,
    width: 160,
  },
];

// const rows = [
//   { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
//   { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
//   { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
//   { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
//   { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
//   { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
//   { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
//   { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
//   { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
// ];

export default function DataTable({ rows }) {
  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid rows={rows} columns={columns} pageSize={5} checkboxSelection />
    </div>
  );
}
