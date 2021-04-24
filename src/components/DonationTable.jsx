import React from "react";
import { Table, Spinner } from "react-bootstrap";
import { FaTrashAlt, FaEdit } from "react-icons/fa";
function DonationTable({ donationList }) {
  let order = 1;

  return (
    <div className="productTable mt-1">
      {donationList.length == 0 ? (
        <Spinner animation="border" />
      ) : (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <th>NO</th>
            <th>DATE</th>
            <th>USER NAME</th>
            <th>CASH</th>
            <th>TOTAL ITEM</th>
            <th>ACTION</th>
          </thead>
          <tbody>
            {donationList &&
              donationList.map((item) => (
                <tr key={item.id}>
                  <td>{order++}</td>
                  <td>{item.date}</td>
                  <td>{item.userId}</td>
                  <td>{item.cash}</td>

                  <td>{item.numberOfItem}</td>
                  <td>
                    <FaEdit className="text-info" /> <span>Detail</span>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      )}
    </div>
  );
}

export default DonationTable;
