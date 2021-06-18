import React from "react";
import ReactDOM from "react-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import "./styles.css";
import * as Yup from 'yup'


// Validação utilizando apenas o formik
/* const validate = values => {
    const errors = {};
    if (!values.firstName) {
      errors.firstName = 'Campo Obrigatório!';
    } else if (values.firstName.length > 15) {
      errors.firstName = 'Apenas 15 caracteres ou menos!';
    }
  
    if (!values.lastName) {
      errors.lastName = 'Campo Obrigatório!';
    } else if (values.lastName.length > 20) {
      errors.lastName = 'Apenas 20 caracteres ou menos!';
    }
  
    if (!values.email) {
      errors.email = 'Campo Obrigatório!';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
      errors.email = 'Endereço de Email Inválido!';
    }
  
    return errors;
}; */

const SignupForm = () => {
    return (
        <Formik
            initialValues= { {
                email: "" ,
                firstName: "",
                lastName: "",
            }}
            validationSchema= {Yup.object({
                firstName: Yup.string()
                    .max(15, "Apenas 15 caracteres ou menos!")
                    .required('Campo Obrigatório!'),
                lastName: Yup.string()
                    .max(20, 'Apenas 20 caracteres ou menos!')
                    .required('Campo Obrigatório!'),
                email: Yup.string().email('Endereço de Email Inválido').required('Campo Obrigatório!'),
            })}
            onSubmit={(values, { setSubmitting }) => {
                setTimeout(() => {
                  alert(JSON.stringify(values, null, 2));
                  setSubmitting(false);
                }, 400);
            }}
        >
            
            <Form>
                <label htmlFor="firstName">First Name</label>
                <Field name="firstName" type="text" />
                <ErrorMessage name="firstName" />
        
                <label htmlFor="lastName">Last Name</label>
                <Field name="lastName" type="text" />
                <ErrorMessage name="lastName" />
        
                <label htmlFor="email">Email Address</label>
                <Field name="email" type="email" />
                <ErrorMessage name="email" />
        
                <button type="submit">Submit</button>
            </Form>
            
        </Formik>
    )
};

function App() {
  return <SignupForm />;
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
