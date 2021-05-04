import React from "react";
import { useFormik } from "formik";
import "./signup.css";
import { Form, Col, Button, Modal } from "react-bootstrap";
import { FaPlus } from "react-icons/fa";
import * as Yup from "yup";
import { signUp, getUserAccount } from "../../action/authAction";
import { useDispatch, useSelector } from "react-redux";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import UserAccountTable from "./UserAccountTable";
import { deleteUserAccount } from "../../action/authAction";

const initialValues = {
  firstname: "",
  lastname: "",
  email: "",
  password: "",
  confirmPassword: "",
  role: "",
  isAdmin: false,
};

const validationSchema = Yup.object({
  firstname: Yup.string().required("អ្នកចំាបាច់ត្រូងបញ្ចូលនាមខ្លួន"),
  lastname: Yup.string().required("អ្នកចំាបាច់ត្រូងបញ្ចូលនាមត្រកូល"),
  email: Yup.string()
    .email("អុីមែលអ្នកអត់ត្រូវទំរង់")
    .required("អ្នកចំាបាច់ត្រូងបញ្ចូលអុីមែល"),
  password: Yup.string().required("អ្នកកចំាបាច់ត្រូងបញ្ចូលលេខសម្ងាត់"),
  confirmPassword: Yup.string().when("password", {
    is: (val) => (val && val.length > 0 ? true : false),
    then: Yup.string().oneOf(
      [Yup.ref("password")],
      "លេខសម្ងាត់អ្នកមុនដូចគ្នាទេ"
    ),
  }),
  role: Yup.string().required("សូមបញ្ចូលតួនាទី"),
});

function SignIn() {
  const [account, setAccount] = React.useState(false);
  const dispatch = useDispatch();

  const accountCreate = useSelector((state) => state.userRegisterCreate);
  const { loading: createLoading, error: createError } = accountCreate;

  const { userAccounts, loading, error } = useSelector(
    (state) => state.userAccountList
  );
  const userAccountDelete = useSelector((state) => state.userAccountDelete);

  // const { loading: deleteLoading, error: deleteError } = userAccountDelete;

  React.useEffect(() => {
    dispatch(getUserAccount());
  }, [accountCreate, userAccountDelete]);

  //pending
  const onUpdate = (id) => {
    const index = userAccounts.findIndex((el) => el.id === id);
    const data = userAccounts[index];

    setAccount(true);
  };

  const onDelete = (id, uid) => {
    dispatch(deleteUserAccount(id, uid));
  };

  const onSubmit = (values) => {
    dispatch(signUp(values));
    setAccount(false);
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
  });

  return (
    <div className="container">
      <div style={{ marginTop: "70px" }}></div>
      {createError && <Message variant="danger">{createError}</Message>}
      {error && <Message variant="danger">{error}</Message>}
      {loading && <Loader wd={30} hg={30} />}
      <Button onClick={() => setAccount(true)}>
        {" "}
        <FaPlus />
        បង្កើតគណនីថ្មី
      </Button>
      <UserAccountTable
        userAccounts={userAccounts}
        onUpdate={onUpdate}
        onDelete={onDelete}
      />

      <Modal
        style={{ Zindex: "1000", marginTop: "50px", marginLeft: "30px" }}
        size="lg"
        show={account}
        onHide={() => setAccount(false)}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
            បង្កើតគណនីថ្មី
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={formik.handleSubmit}>
            <Form.Row></Form.Row>
            <Form.Row>
              <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label>នាមខ្លួន</Form.Label>
                <Form.Control
                  size="sm"
                  name="firstname"
                  onChange={formik.handleChange}
                  value={formik.values.firstname}
                  type="text"
                  placeholder="Enter firstname"
                  onBlur={formik.handleBlur}
                />
                {formik.touched.firstname && formik.errors.firstname ? (
                  <p>{formik.errors.firstname}</p>
                ) : null}
              </Form.Group>

              <Form.Group as={Col} controlId="formGridPassworde">
                <Form.Label>នាមត្រកូល</Form.Label>
                <Form.Control
                  size="sm"
                  name="lastname"
                  onChange={formik.handleChange}
                  value={formik.values.lastname}
                  type="text"
                  placeholder="Enter lastname"
                  onBlur={formik.handleBlur}
                />
                {formik.touched.lastname && formik.errors.lastname ? (
                  <p>{formik.errors.lastname}</p>
                ) : null}
              </Form.Group>
            </Form.Row>

            <Form.Group controlId="formGridAddress1">
              <Form.Label>អុីមែល</Form.Label>
              <Form.Control
                size="sm"
                name="email"
                onChange={formik.handleChange}
                value={formik.values.email}
                placeholder="Enter E-mail"
                onBlur={formik.handleBlur}
              />
              {formik.touched.email && formik.errors.email ? (
                <p>{formik.errors.email}</p>
              ) : null}
            </Form.Group>

            <Form.Row>
              <Form.Group as={Col} controlId="formGridPassword">
                <Form.Label>លេខសម្ងាត់</Form.Label>
                <Form.Control
                  size="sm"
                  name="password"
                  onChange={formik.handleChange}
                  value={formik.values.password}
                  type="password"
                  placeholder="Enter password"
                  onBlur={formik.handleBlur}
                />
                {formik.touched.password && formik.errors.password ? (
                  <p>{formik.errors.password}</p>
                ) : null}
              </Form.Group>
              <Form.Group as={Col} controlId="formGridPasswords">
                <Form.Label>បញ្ចាក់លេខសម្ងាត់</Form.Label>
                <Form.Control
                  size="sm"
                  name="confirmPassword"
                  onChange={formik.handleChange}
                  value={formik.values.confirmPassword}
                  type="password"
                  placeholder="comfirmpassword"
                  onBlur={formik.handleBlur}
                />
                {formik.touched.confirmPassword &&
                formik.errors.confirmPassword ? (
                  <p>{formik.errors.confirmPassword}</p>
                ) : null}
              </Form.Group>
            </Form.Row>

            <Form.Row>
              <Form.Group as={Col} controlId="formGridState">
                <Form.Label>តួនាទី</Form.Label>
                <Form.Control
                  size="sm"
                  name="role"
                  onChange={formik.handleChange}
                  value={formik.values.role}
                  as="select"
                  defaultValue="ជ្រើសរើស..."
                  onBlur={formik.handleBlur}
                >
                  <option>Choose...</option>
                  <option>accounting</option>
                  <option>IT</option>
                </Form.Control>
                {formik.touched.role && formik.errors.role ? (
                  <p style={{ color: "red" }}>{formik.errors.role}</p>
                ) : null}
              </Form.Group>
            </Form.Row>

            <Form.Group id="formGridCheckbox">
              <Form.Check
                size="sm"
                type="checkbox"
                name="isAdmin"
                onChange={formik.handleChange}
                value={formik.values.isAdmin}
                label="Is admin"
              />
            </Form.Group>

            <Button
              size="sm"
              variant="primary"
              type="submit"
              style={{ width: "100%" }}
            >
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default SignIn;
