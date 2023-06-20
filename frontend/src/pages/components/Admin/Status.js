import Form from "react-bootstrap/Form";

function getStatusString(status) {
  if (status === true) {
    return "Active";
  } else if (status === false) {
    return "Inactive";
  }
}

function SwitchExample(props) {
  const { status } = props;
  const statusString = getStatusString(status);
  return (
    <Form>
      <Form.Check // prettier-ignore
        type="switch"
        id="custom-switch"
        label="Check this switch"
      />
    </Form>
  );
}

export default SwitchExample;
