import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "./BookingForm.module.css";
import { useRef, useEffect } from "react";

const BookingForm = ({ carName, withTitle = true }) => {
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const initialValues = {
    name: "",
    email: "",
    dateFrom: "",
    dateTo: "",
    comment: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string()
      .matches(/^[a-zA-Zа-яА-ЯіІїЇєЄґҐ\s'-]+$/, "Invalid name")
      .min(2, "Too short")
      .required("Required"),

    email: Yup.string().email("Invalid email").required("Required"),

    dateFrom: Yup.string()
      .required("Required")
      .test(
        "valid",
        "Invalid date",
        (value) => !value || !isNaN(Date.parse(value))
      )
      .test("notPast", "Date cannot be in the past", (value) => {
        if (!value) return true;
        const date = new Date(value);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return date >= today;
      }),

    dateTo: Yup.string()
      .required("Required")
      .test(
        "valid",
        "Invalid date",
        (value) => !value || !isNaN(Date.parse(value))
      )
      .when("dateFrom", (dateFrom, schema) =>
        schema.test(
          "afterStart",
          "Must be after start date",
          function (dateTo) {
            if (!dateFrom || !dateTo) return true;
            return new Date(dateTo) >= new Date(dateFrom);
          }
        )
      ),

    comment: Yup.string().max(300, "Max 300 characters"),
  });

  const handleSubmit = (values, { resetForm }) => {
    toast.success(`🚗 You successfully booked ${carName || "a car"}!`, {
      position: "top-center",
      autoClose: 3000,
    });
    resetForm();
  };

  return (
    <div className={styles.wrapper}>
      {withTitle && (
        <>
          <h3 className={styles.title}>Book your car now</h3>
          <p className={styles.subtitle}>
            Stay connected! We are always ready to help you.
          </p>
        </>
      )}

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
              placeholder="Name*"
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
              placeholder="Email*"
              className={styles.input}
            />
            <ErrorMessage
              name="email"
              component="div"
              className={styles.error}
            />
          </div>

          <div className={styles.dateRangeWrapper}>
            <div className={styles.dateField}>
              <label className={styles.dateLabel} htmlFor="dateFrom">
                From
              </label>
              <Field
                id="dateFrom"
                name="dateFrom"
                type="date"
                className={styles.input}
              />
              <ErrorMessage
                name="dateFrom"
                component="div"
                className={styles.error}
              />
            </div>

            <div className={styles.dateField}>
              <label className={styles.dateLabel} htmlFor="dateTo">
                To
              </label>
              <Field
                id="dateTo"
                name="dateTo"
                type="date"
                className={styles.input}
              />
              <ErrorMessage
                name="dateTo"
                component="div"
                className={styles.error}
              />
            </div>
          </div>

          <div className={styles.inputGroup}>
            <Field
              name="comment"
              as="textarea"
              placeholder="Comment"
              className={`${styles.input} ${styles.textarea}`}
            />
          </div>

          <button type="submit" className={styles.button}>
            Send
          </button>
        </Form>
      </Formik>

      <ToastContainer />
    </div>
  );
};

export default BookingForm;
