import React from "react";
import { Table, Spinner } from "react-bootstrap";
import { FaTrashAlt, FaEdit } from "react-icons/fa";
function UserTable({ userList, onUpdate, onDelete }) {
  let order = 1;
  return (
    <div className="productTable mt-1">
      {userList.length == 0 ? (
        <Spinner animation="border" />
      ) : (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <th>NO</th>
            <th>USER ID</th>
            <th>DONOR</th>
            <th>USER NAME</th>
            <th>COMPANY</th>
            <th>ADDRESS</th>
            <th>TEL</th>
            <th colSpan="2">ACTION</th>
          </thead>
          <tbody>
            {userList &&
              userList.map((item) => (
                <tr key={item.id}>
                  <td>{order++}</td>
                  <td>{item.id}</td>
                  <td>{item.donor ? "True" : "False"}</td>
                  <td>{item.name}</td>
                  <td>{item.company}</td>
                  <td>{item.address}</td>
                  <td>{item.tel}</td>
                  <td>
                    <FaEdit
                      className="text-info"
                      onClick={(e) => onUpdate(item.id)}
                    />{" "}
                    <span>Edit</span>
                  </td>
                  <td>
                    <FaTrashAlt
                      className="text-danger"
                      onClick={(e) => onDelete(item.id)}
                    />{" "}
                    <span>Delete</span>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      )}
    </div>
  );
}

export default UserTable;
