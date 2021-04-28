import React from "react";

import { Table } from "react-bootstrap";
import { FaExternalLinkSquareAlt } from "react-icons/fa";
import { useHistory } from "react-router-dom";

const DoneeAndDonor = ({ userList }) => {
  let order = 1;
  const history = useHistory();
  console.log(history.location.pathname);
  return (
    <div className="doneeAndDonor">
      <Table striped bordered hover responsive className="table-sm">
        <thead>
          <th>លេខរៀង</th>
          <th>ឈ្មោះ</th>
          <th>ឈ្មោះស្ថាប័ន</th>
          <th>អាស័យដ្ធាន</th>
          <th>ទូរស័ព្ធ</th>
          <th>ផ្សេងៗ</th>
        </thead>
        <tbody>
          {userList &&
            userList.map((item) => (
              <tr key={item.id}>
                <td>{order++}</td>
                <td>{item.name}</td>
                <td>{item.company}</td>
                <td>{item.address}</td>
                <td>{item.tel}</td>
                <td>
                  <FaExternalLinkSquareAlt
                    className="text-success mr-1"
                    onClick={() =>
                      history.push(
                        `/userdetail/${item.name}?pre=${history.location.pathname}`
                      )
                    }
                  />
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
