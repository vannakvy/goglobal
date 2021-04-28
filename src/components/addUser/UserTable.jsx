import React from "react";
import { Table, Spinner } from "react-bootstrap";
import { FaTrashAlt, FaEdit } from "react-icons/fa";
function UserTable({ userList, onUpdate, onDelete }) {
  let order = 1;
  return (
    <div className="productTable mt-1">
      {userList.length === 0 ? (
        <Spinner animation="border" />
      ) : (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <th>លេខរៀង</th>
            <th>ឈ្មោះ</th>
            <th>ឈ្មោះស្ថាប័ន</th>
            <th>អាស័យដ្ធាន</th>
            <th>ទូរស័ព្ធ</th>
            <th colSpan="2">ផ្សេងៗ</th>
          </thead>
          <tbody>
            {userList &&
              userList.map((item) => (
                <tr key={item.id}>
                  <td>{order++}</td>
                  {/* <td>{item.donor ? "True" : "False"}</td> */}
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
