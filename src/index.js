import React from "react";
import ReactDOM from "react-dom";
import { useFormik } from "formik";
import "./styles.css";

const validate = values => {
    const errors = {};
    if (!values.firstName) {
      errors.firstName = 'Obrigatório!';
    } else if (values.firstName.length > 15) {
      errors.firstName = 'Apenas 15 caracteres ou menos!';
    }
  
    if (!values.lastName) {
      errors.lastName = 'Obrigatório!';
    } else if (values.lastName.length > 20) {
      errors.lastName = 'Apenas 20 caracteres ou menos!';
    }
  
    if (!values.email) {
      errors.email = 'Obrigatório!';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
      errors.email = 'Endereço de Email Inválido!';
    }
  
    return errors;
};

const SignupForm = () => {
    const formik = useFormik({
    initialValues: { 
        email: "" ,
        firstName: "",
        lastName: "",
    },
    validate,
    onSubmit: values => {
      alert(JSON.stringify(values, null, 2));
    }
  });
  return (
    <form onSubmit={formik.handleSubmit}>
        <label htmlFor="email">Email Address</label>
        <input
            id="email"
            name="email"
            type="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
        />
        {formik.errors.email && formik.touched.email ? <div>{formik.errors.email}</div> : null}
        <label htmlFor="firstName"> First Name </label>
        <input
            id="firstName"
            name="firstName"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.firstName}
        />
        {formik.errors.firstName && formik.touched.firstName ? <div>{formik.errors.firstName}</div> : null}
        <label htmlFor="lastName"> Last Name </label>
        <input
            id="lastName"
            name="lastName"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.lastName}
        />
        {formik.errors.lastName && formik.touched.lastName ? <div>{formik.errors.lastName}</div> : null}
        <button type="submit">Submit</button>
    </form>
  );
};

function App() {
  return <SignupForm />;
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
