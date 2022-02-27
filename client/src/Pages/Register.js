import { useState, useEffect } from "react";
import { Logo, FormRow, Alert } from "../Components/Index";
import Wrapper from "../assets/wrappers/LandingPage";
import { useAppContext } from "../Context/appContext";
import { useNavigate } from 'react-router-dom'

const initialState = {
  name: "",
  email: "",
  password: "",
  isMember: true,
};

const Register = () => {
  const navigate = useNavigate()
  const [values, setValues] = useState(initialState);
  const { user, isLoading, showAlert, displayAlert, registerUser,loginUser } = useAppContext();

  const toggleMember = () => {
    setValues({ ...values, isMember: !values.isMember });
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const { name, email, password, isMember } = values;
    if (!email || !password || (!isMember && !name)) {
      displayAlert();
      return;
    }
    const currentUser = { name, email, password }
    if (isMember) {
      loginUser(currentUser)

    }
    else {
      registerUser(currentUser)
    }
  };

  useEffect(() => {
    if (user) {
      setTimeout(() => {
        navigate('/')

      })

    }

  }, [user, navigate]
  )

  return (
    <Wrapper className="full-page">
      <form action="" className="form" onSubmit={onSubmit}>
        <Logo />
        <h3>{values.isMember ? "Login" : "Register"}</h3>
        {showAlert && <Alert />}
        {/*name*/}
        {!values.isMember && (
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

        <button type="submit" className="btn btn-block" disabled={isLoading}>
          submit
        </button>
        <p>
          {values.isMember ? "Not a member yet" : "Already a Member?"}
          <button type="button" onClick={toggleMember} className="member-btn">
            {values.isMember ? "Register" : "Login"}
          </button>
        </p>
      </form>
    </Wrapper>
  );
};

export default Register;
