import React, { Component } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
class Main extends Component {
  state = {};

  render() {
    return (
      <div>
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validationSchema={Yup.object().shape({
            email: Yup.string()
              .email("Not a Valid Email")
              .required("Email cannot be empty"),
            password: Yup.string()
              .min(6, "Please enter atleast 7 character")
              .required("password cannot be Empty"),
          })}
          onSubmit={async (fields) => {
            console.log(fields);
            try {
              let response = await axios.post(
                "http://localhost:2410/login",
                fields
              );
              console.log(response);
              console.log(response.data.role);
              // if (response.data.role === "customer") {
              this.props.history.push({
                pathname: "/",
              });
              // }
              this.props.onLoginDetails(response.data);
            } catch (ex) {
              if (ex.response && ex.response.status === 500) {
                window.alert("Envalid email and password");
              }
            }
          }}
          render={({ errors, touched }) => (
            <Form className="container mt-3">
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <Field
                  name="email"
                  type="text"
                  placeholder="Please Enter your Email"
                  className={
                    "form-control" +
                    (errors.email && touched.email ? " is-invalid" : "")
                  }
                />
                <ErrorMessage
                  component="div"
                  name="email"
                  className="invalid-feedback"
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <Field
                  name="password"
                  type="password"
                  placeholder="Please Enter your password"
                  className={
                    "form-control" +
                    (errors.password && touched.password ? " is-invalid" : "")
                  }
                />
                <ErrorMessage
                  component="div"
                  name="password"
                  className="invalid-feedback"
                />
              </div>
              <div className="form-group">
                <button className="btn btn-primary">Submit</button>
              </div>
            </Form>
          )}
        />
      </div>
    );
  }
}

export default Main;
