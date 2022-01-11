import { useState, useEffect } from "react";
import { Logo, FormRow, Alert } from "../Components";

import Wrapper from "../assets/wrappers/LandingPage";

const initialState = {
  name: "",
  email: "",
  password: "",
  isMemeber: true,
  showAlert: false,
};

const Register = () => {
  const [values, setValues] = useState(initialState);

  const toggleMember = () => {
    setValues({ ...values, isMemeber: !values.isMemeber });
  };

  const handleChange = (e) => {
    console.log(e.target);
  };
  const onSubmit = (e) => {
    e.preventDefault();
    console.log(e.target);
  };

  return (
    <Wrapper className="full-page">
      <form action="" className="form" onSubmit={onSubmit}>
        <Logo />
        <h3>{values.isMember ? "Login" : "Register"}</h3>
        {values.showAlert && <Alert />}
        {/*name*/}
        {!values.isMemeber && (
          <FormRow
            type="text"
            name="name"
            value={values.name}
            handleChange={handleChange}
          />
        )}

        {/*email*/}
        <FormRow
          type="email"
          name="email"
          value={values.email}
          handleChange={handleChange}
        />
        {/*password*/}
        <FormRow
          type="password"
          name="password"
          value={values.password}
          handleChange={handleChange}
        />

        <button type="submit" className="btn btn-block">
          submit
        </button>
        <p>
          {values.isMemeber ? "Not a member yet" : "Already a Member?"}
          <button type="button" onClick={toggleMember} className="member-btn">
            {values.isMemeber ? "Register" : "Login"}
          </button>
        </p>
      </form>
    </Wrapper>
  );
};

export default Register;
