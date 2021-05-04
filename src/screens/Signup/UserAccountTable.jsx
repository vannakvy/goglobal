import React from "react";
import { Table, Spinner } from "react-bootstrap";
import { FaTrashAlt, FaEdit } from "react-icons/fa";
import moment from "moment";

function UserAccountTable({ userAccounts, onUpdate, onDelete }) {
  let order = 1;
  return (
    <div className="productTable mt-1">
      <Table striped bordered hover responsive className="table-sm">
        <thead>
          <th>លេខរៀង</th>
          <th>ឈ្មោះ</th>
          <th>តួនាទី</th>
          <th>បង្កើតថ្ងៃទី</th>

          <th colSpan="2">ផ្សេងៗ</th>
        </thead>
        <tbody>
          {userAccounts &&
            userAccounts.map((user) => (
              <tr key={user.id}>
                <td>{order++}</td>
                <td>
                  {user.firstName} {user.lastName}
                </td>
                <td>{user.role}</td>
                <td>
                  {moment
                    .unix(user.createAt.seconds / 1000)
                    .format("DD MMM YYYY hh:mm a")}
                </td>
                <td>
                  <FaEdit
                    className="text-info"
                    onClick={(e) => onUpdate(user.id)}
                  />{" "}
                </td>
                <td>
                  <FaTrashAlt
                    className="text-danger"
                    onClick={(e) => onDelete(user.id, user.uid)}
                  />{" "}
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </div>
  );
}

export default UserAccountTable;
