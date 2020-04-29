import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import FormError from "./FormError";
import FormSubmitted from "./FormSubmitted";
const schema = yup.object().shape({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  email: yup
    .string()
    .email("Please enter a valid email")
    .required("Email is required"),
  message: yup
    .string()
    .required("Message is required")
    .min(10, "Message must contain atleast 10 letters"),
});

function Contact() {
  const [validated, setValidated] = useState(false);
  const { register, handleSubmit, errors } = useForm({
    validationSchema: schema,
  });

  function onSubmit(data, event) {
    console.log("data", data);
    event.target.reset();

    setValidated(true);

    setTimeout(() => setValidated(false), 3000);
  }

  return (
    <>
      <FormSubmitted displayMessage={validated} />
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group>
          <Form.Label>First Name</Form.Label>
          <Form.Control
            name="firstName"
            placeholder="Enter your First name"
            ref={register}
          />
          {errors.firstName && (
            <FormError>{errors.firstName.message}</FormError>
          )}
        </Form.Group>
        <Form.Group>
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            name="lastName"
            placeholder="Enter your Last name"
            ref={register}
          />
          {errors.lastName && <FormError>{errors.lastName.message}</FormError>}
        </Form.Group>
        <Form.Group>
          <Form.Label>Email</Form.Label>
          <Form.Control
            name="email"
            placeholder="Enter your email"
            ref={register}
          />
          {errors.email && <FormError>{errors.email.message}</FormError>}
        </Form.Group>

        <Form.Group>
          <Form.Label>Message</Form.Label>
          <Form.Control
            type="message"
            name="message"
            placeholder="Write a message"
            ref={register}
          />
          {errors.message && <FormError>{errors.message.message}</FormError>}
        </Form.Group>

        <Button type="submit">Submit</Button>
      </Form>
    </>
  );
}

export default Contact;
