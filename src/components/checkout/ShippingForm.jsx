import { useState } from "react";
import { Row, Col, Form } from "react-bootstrap";
import { formValue } from "../../constants";

const ShippingForm = () => {
  const [useSavedInfo, setUseSavedInfo] = useState(false);

  const handleCheckboxChange = () => {
    setUseSavedInfo((prev) => !prev);
  };
  return (
    <>
      <div className="mx-0 mb-3 px-0 px-lg-3 fs-4 fw-semibold text-uppercase">
        Delivery address
      </div>
      <Form className="px-lg-3">
        <div className="mb-3">
          <Form.Group className="mb-2" controlId="formEmail">
            <Form.Control
              type="email"
              placeholder="Email"
              defaultValue={useSavedInfo ? formValue.email : null}
            />
          </Form.Group>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: "0.5rem",
            }}
          >
            <Form.Group className="mb-2" controlId="formFirstName">
              <Form.Control
                type="text"
                placeholder="First name"
                defaultValue={useSavedInfo ? formValue.first : null}
              />
            </Form.Group>

            <Form.Group className="mb-2" controlId="formLastName">
              <Form.Control
                type="text"
                placeholder="Last name"
                defaultValue={useSavedInfo ? formValue.last : null}
              />
            </Form.Group>
          </div>

          <Form.Group className="mb-2" controlId="formPhone">
            <Form.Control
              type="tel"
              placeholder="Phone number"
              defaultValue={useSavedInfo ? formValue.phone : null}
            />
          </Form.Group>
        </div>

        <div className="mb-3">
          <Form.Group className="mb-2" controlId="formStAddress">
            <Form.Control
              type="text"
              placeholder="Street address"
              defaultValue={useSavedInfo ? formValue.street : null}
            />
          </Form.Group>

          <Form.Group className="mb-2" controlId="formDetailAddress">
            <Form.Control
              type="text"
              placeholder="Apartment, suite, etc (optional)"
              defaultValue={useSavedInfo ? formValue.detail : null}
            />
          </Form.Group>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              columnGap: "0.5rem",
              boxSizing: "border-box",
            }}
          >
            <Form.Group className="mb-2" controlId="formCity">
              <Form.Control
                type="text"
                placeholder="City"
                defaultValue={useSavedInfo ? formValue.city : null}
              />
            </Form.Group>

            <Form.Group className="mb-2" controlId="formPostalCode">
              <Form.Control
                type="number"
                placeholder="ZIP Code"
                defaultValue={useSavedInfo ? formValue.postal : null}
                className="border border-1"
              />
            </Form.Group>
          </div>

          <Form.Group className="mb-2" controlId="formCountry">
            <Form.Control
              type="text"
              placeholder="Country"
              defaultValue={useSavedInfo ? formValue.country : null}
            />
          </Form.Group>
        </div>

        <Form.Group className="mb-3" controlId="formNotes">
          <Form.Control
            type="text"
            placeholder="Additional notes (optional)"
            defaultValue={useSavedInfo ? formValue.notes : null}
          />
        </Form.Group>

        <Form.Check
          type="checkbox"
          label="Fill with my saved info"
          id="saved-info"
          checked={useSavedInfo}
          onChange={handleCheckboxChange}
        />
      </Form>
    </>
  );
};

export default ShippingForm;
