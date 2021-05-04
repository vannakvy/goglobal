import React from "react";
import { Table, Spinner } from "react-bootstrap";
import { FaEdit } from "react-icons/fa";
import moment from "moment";
function DonationTable({ donationList }) {
  let order = 1;

  return (
    <div className="productTable mt-1">
      <Table striped bordered hover responsive className="table-sm">
        <thead>
          <th>លេខរៀង</th>
          <th>កាលបរិច្ឆេទ</th>
          <th>ឈ្មោះ</th>
          <th>ចំនួនលុយ</th>
          <th>ចំនួនទំនិញ់</th>
          <th>ផ្សេងៗ</th>
        </thead>
        <tbody>
          {donationList &&
            donationList.map((item) => (
              <tr key={item.id}>
                <td>{order++}</td>
                <td>{moment(item.date).format("YYYY-MM-DD HH:mm:ss")}</td>
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
    </div>
  );
}

export default DonationTable;
