import React from "react";
import { Table, Modal } from "react-bootstrap";
import { useParams, useLocation } from "react-router-dom";
import db from "../config/db";
import { FaEllipsisH } from "react-icons/fa";

const UserDetial = () => {
  const { id } = useParams();
  const { search } = useLocation();
  const a = search.split("=")[1].substring(1);

  const [donationList, setDonationList] = React.useState([]);
  const [itemList, setItemList] = React.useState([]);
  const [donationId, setDonationId] = React.useState("");
  const [modal, setModal] = React.useState(false);
  let order = 1;
  console.log(itemList);
  const collection = a === "donors" ? "donation_in" : "donation_out";

  React.useEffect(() => {
    const fetchData = async () => {
      const data = await db
        .collection(collection)
        .where("userId", "==", id)
        .get();
      setDonationList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    fetchData();
  });

  React.useEffect(() => {
    const fetchData = async () => {
      const data = await db
        .collection("donate_item")
        .where("donationInId", "==", donationId)
        .get();
      setItemList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    fetchData();
  }, [donationId]);

  const showItem = (item_id) => {
    setModal(true);
    setDonationId(item_id);
  };
  return (
    <div style={{ marginTop: "65px" }}>
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
            donationList.map((donate) => (
              <tr key={donate.id}>
                <td>{order++}</td>
                <td>{donate.date}</td>
                <td>{donate.userId}</td>
                <td>{donate.cash}</td>

                <td>{donate.numberOfItem}</td>
                <td>
                  <span>
                    {" "}
                    <FaEllipsisH
                      className="text-primary"
                      size="20px"
                      onClick={() => showItem(donate.id)}
                    />
                  </span>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
      <div className="modal">
        <Modal
          style={{ Zindex: "1000", marginTop: "50px", marginLeft: "30px" }}
          size="md"
          show={modal}
          onHide={() => setModal(false)}
          aria-labelledby="example-modal-sizes-title-lg"
        >
          <Modal.Header closeButton>
            <Modal.Title id="example-modal-sizes-title-lg">
              មុខទំនិញ់
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Table striped bordered hover responsive className="table-sm">
              <thead>
                <th>លេខរៀង</th>

                <th>ឈ្មោះទំនិញ់</th>
                <th>ចំនួនបរិមាណ</th>
                <th>តម្លៃ</th>
                <th>ផ្សេងៗ</th>
              </thead>
              <tbody>
                {itemList &&
                  itemList.map((item) => (
                    <tr key={item.id}>
                      <td>{order++}</td>
                      <td>{item.item}</td>
                      <td>{item.qty}</td>
                      <td>{item.pric}</td>

                      <td></td>
                    </tr>
                  ))}
              </tbody>
            </Table>
          </Modal.Body>
        </Modal>
      </div>
    </div>
  );
};

export default UserDetial;
