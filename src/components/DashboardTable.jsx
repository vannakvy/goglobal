import React from "react";
import { Table, Spinner } from "react-bootstrap";
function DashboardTable({ itemList }) {
  let order = 1;
  return (
    <div className="productTable mt-1">
      {itemList.length === 0 ? (
        <Spinner animation="border" />
      ) : (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <th>លេខរៀង</th>
            <th>មុខទំនិញ់</th>
            <th>ចំនួន</th>
            <th colSpan="2">ផ្សេងៗ</th>
          </thead>
          <tbody>
            {itemList &&
              itemList.map((item) => (
                <tr key={item.id}>
                  <td>{order++}</td>
                  <td>{item.item}</td>
                  <td>{item.countInStock}</td>
                  <td>{item.description}</td>
                </tr>
              ))}
          </tbody>
        </Table>
      )}
    </div>
  );
}

export default DashboardTable;
