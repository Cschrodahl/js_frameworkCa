import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

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
    .min(10, "Message must contain atleast 10 letters")
});

function Contact() {
  const { register, handleSubmit, errors } = useForm({
    validationSchema: schema
  });

  function onSubmit(data) {
    console.log("data", data);
  }

  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group>
          <Form.Label>First Name</Form.Label>
          <Form.Control
            name="firstName"
            placeholder="Enter your First name"
            ref={register}
          />
          {errors.firstName && <p>{errors.firstName.message}</p>}
        </Form.Group>
        <Form.Group>
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            name="lastName"
            placeholder="Enter your Last name"
            ref={register}
          />
          {errors.lastName && <p>{errors.lastName.message}</p>}
        </Form.Group>
        <Form.Group>
          <Form.Label>Email</Form.Label>
          <Form.Control
            name="email"
            placeholder="Enter your email"
            ref={register}
          />
          {errors.email && <p>{errors.email.message}</p>}
        </Form.Group>

        <Form.Group>
          <Form.Label>Message</Form.Label>
          <Form.Control
            type="message"
            name="message"
            placeholder="Write a message"
            ref={register}
          />
          {errors.message && <p>{errors.message.message}</p>}
        </Form.Group>

        <Button type="submit">Submit</Button>
      </Form>
    </>
  );
}

export default Contact;
