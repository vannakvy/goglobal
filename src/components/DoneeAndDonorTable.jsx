import React from "react";
import { Table, Spinner } from "react-bootstrap";
import { FaExternalLinkSquareAlt } from "react-icons/fa";

const DoneeAndDonor = ({ userList }) => {
  let order = 1;

  return (
    <div className="doneeAndDonor">
      <Table striped bordered hover responsive className="table-sm">
        <thead>
          <th>NO</th>
          <th>USER ID</th>
          <th>USER NAME</th>
          <th>COMPANY</th>
          <th>ADDRESS</th>
          <th>TEL</th>
          <th>DETAIL</th>
        </thead>
        <tbody>
          {userList &&
            userList.map((item) => (
              <tr key={item.id}>
                <td>{order++}</td>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.company}</td>
                <td>{item.address}</td>
                <td>{item.tel}</td>
                <td>
                  <FaExternalLinkSquareAlt className="text-success mr-1" />{" "}
                  <span>More</span>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </div>
  );
};

export default DoneeAndDonor;
