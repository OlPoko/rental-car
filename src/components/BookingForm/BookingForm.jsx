// src/components/BookingForm/BookingForm.jsx
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "./BookingForm.module.css";
import { useRef, useEffect } from "react";

const phoneRegExp = /^\+?[0-9\s\-()]{7,20}$/;

const BookingForm = ({ carName }) => {
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const initialValues = {
    name: "",
    email: "",
    phone: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string().min(2, "Too short").required("Required"),
    email: Yup.string().email("Invalid email").required("Required"),
    phone: Yup.string()
      .matches(phoneRegExp, "Invalid phone")
      .required("Required"),
  });

  const handleSubmit = (values, { resetForm }) => {
    toast.success(`🚗 You successfully booked ${carName}!`, {
      position: "top-center",
      autoClose: 3000,
    });
    resetForm();
  };

  return (
    <div className={styles.wrapper}>
      <h3>Book this car</h3>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        validateOnBlur
        validateOnChange
      >
        <Form className={styles.form}>
          <div className={styles.inputGroup}>
            <Field
              innerRef={inputRef}
              name="name"
              placeholder="Your name"
              className={styles.input}
            />
            <ErrorMessage
              name="name"
              component="div"
              className={styles.error}
            />
          </div>

          <div className={styles.inputGroup}>
            <Field
              name="email"
              type="email"
              placeholder="Email"
              className={styles.input}
            />
            <ErrorMessage
              name="email"
              component="div"
              className={styles.error}
            />
          </div>

          <div className={styles.inputGroup}>
            <Field
              name="phone"
              placeholder="Phone number"
              className={styles.input}
            />
            <ErrorMessage
              name="phone"
              component="div"
              className={styles.error}
            />
          </div>

          <button type="submit" className={styles.button}>
            Book Now
          </button>
        </Form>
      </Formik>
      <ToastContainer />
    </div>
  );
};

export default BookingForm;
