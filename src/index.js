import React from "react";
import ReactDOM from "react-dom";
import { Formik, useField, Form } from "formik";
import "./styles.css";
import * as Yup from 'yup'

const MyTextInput = ({ label, ...props }) => {
    // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
    // which we can spread on <input>. We can use field meta to show an error
    // message if the field is invalid and it has been touched (i.e. visited)
    const [field, meta] = useField(props);
    return (
      <>
        <label htmlFor={props.id || props.name}>{label}</label>
        <input className="text-input" {...field} {...props} />
        {meta.touched && meta.error ? (
          <div className="error">{meta.error}</div>
        ) : null}
      </>
    );
};

const MyCheckbox = ({ children, ...props }) => {
    // React treats radios and checkbox inputs differently other input types, select, and textarea.
    // Formik does this too! When you specify `type` to useField(), it will
    // return the correct bag of props for you -- a `checked` prop will be included
    // in `field` alongside `name`, `value`, `onChange`, and `onBlur`
    const [field, meta] = useField({ ...props, type: 'checkbox' });
    return (
      <div>
        <label className="checkbox-input">
          <input type="checkbox" {...field} {...props} />
          {children}
        </label>
        {meta.touched && meta.error ? (
          <div className="error">{meta.error}</div>
        ) : null}
      </div>
    );
};

const MySelect = ({ label, ...props }) => {
    const [field, meta] = useField(props);
    return (
      <div>
        <label htmlFor={props.id || props.name}>{label}</label>
        <select {...field} {...props} />
        {meta.touched && meta.error ? (
          <div className="error">{meta.error}</div>
        ) : null}
      </div>
    );
};
  

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
                acceptedTerms: Yup.boolean()
                    .required('Campo Obrigatório!')
                    .oneOf([true], 'Você precisa aceitar os termos e condições.'),
                jobType: Yup.string()
                    .oneOf(
                    ['Designer', 'Desenvolvedor', 'Produtor', 'Outro'],
                    'Tipo de trabalho inválido'
                    )
                    .required('Campo Obrigatório!'),
            })}
            onSubmit={(values, { setSubmitting }) => {
                setTimeout(() => {
                  alert(JSON.stringify(values, null, 2));
                  setSubmitting(false);
                }, 400);
            }}
        >
            
            <Form>
                <MyTextInput
                    label="Primeiro Nome"
                    name="firstName"
                    type="text"
                    placeholder="Steve"
                />
    
                <MyTextInput
                    label="Último Nome"
                    name="lastName"
                    type="text"
                    placeholder="Nascimento"
                />
    
                <MyTextInput
                    label="Endereço de Email"
                    name="email"
                    type="email"
                    placeholder="steve@aptools.com.br"
                />
    
                <MySelect label="Tipo de Trabalho" name="jobType">
                    <option value="">Selecione um tipo de trabalho</option>
                    <option value="Designer">Designer</option>
                    <option value="Desenvolvedor">Desenvolvedor</option>
                    <option value="Produtor">Produtor</option>
                    <option value="Outros">Outros</option>
                </MySelect>
    
                <MyCheckbox name="acceptedTerms">
                    Eu aceito os termos e condições
                </MyCheckbox>

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
