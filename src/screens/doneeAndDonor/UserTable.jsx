import React from "react";
import { Table, Spinner } from "react-bootstrap";
import { FaTrashAlt, FaEdit } from "react-icons/fa";
import { FaExternalLinkSquareAlt } from "react-icons/fa";
import { useHistory } from "react-router-dom";
function UserTable({ userList, onUpdate, onDelete }) {
  const history = useHistory();
  let order = 1;
  return (
    <div className="productTable mt-1">
      <Table striped bordered hover responsive className="table-sm">
        <thead>
          <th>លេខរៀង</th>
          <th>ឈ្មោះ</th>
          <th>ឈ្មោះស្ថាប័ន</th>
          <th>អាស័យដ្ធាន</th>
          <th>ទូរស័ព្ធ</th>
          <th colSpan="3">ផ្សេងៗ</th>
        </thead>
        <tbody>
          {userList &&
            userList.map((user) => (
              <tr key={user.id}>
                <td>{order++}</td>
                <td>{user.userName}</td>
                <td>{user.company}</td>
                <td>{user.address}</td>
                <td>{user.tel}</td>
                <td>
                  <FaEdit
                    className="text-info"
                    onClick={(e) => onUpdate(user.id)}
                  />{" "}
                  <span>Edit</span>
                </td>
                <td>
                  <FaTrashAlt
                    className="text-danger"
                    onClick={(e) => onDelete(user.id)}
                  />{" "}
                  <span>Delete</span>
                </td>
                <td>
                  <FaExternalLinkSquareAlt
                    className="text-success mr-1"
                    onClick={() => history.push(`/userdetail/${user.userName}`)}
                  />
                  <span>More</span>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </div>
  );
}

export default UserTable;
