import { useForm } from "react-hook-form";
import { Input, Stack, Typography } from "@mui/material";
import { createClient } from "@supabase/supabase-js";
import { useStore } from "../../store";
import { Link, useNavigate } from "react-router-dom";
import styleForm from '../../css/loginform.css'
import { useState } from "react";
import Error from "../Error"
const LoginForm = () => {
  const supabase = createClient(
    "https://ofbromqumcvsmqxbrkrn.supabase.co",
    process.env.REACT_APP_SUPABASE_ANON_KEY
  );
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [loginError, setLoginError] = useState("");
  const onSubmit = async (data) => {
    await supabase.auth
      .signIn({
        email: data.email,
        password: data.password,
      })
      .then((data) => {
        if (data.data !== null) {
          console.log(data);
          localStorage.setItem("access_token", data.data.access_token);
          localStorage.setItem("user_id", data.user.id);
          localStorage.setItem("name", data.user.user_metadata.name);
          console.log("success");
          navigate("/");
        } else {
          //console.log(data.error.message);
          setLoginError(data.error.message)
        }
      });
  };

  return (
    <>
      <form className="login__form" onSubmit={handleSubmit(onSubmit)}>
        <Stack
          className="login__form--div"
          direction={"column"}
          width="100%"
          alignItems={"center"}
        >
          <div className="formRow">
            <label htmlFor="email">e-mail</label>
            <Input
              disableUnderline={true}
              id="email"
              className="login__form--input"
              {...register("email")}
              placeholder={"your@mail.com"}
              type="email"
            ></Input>
          </div>
          <div className="formRow">
            <label htmlFor="password">password</label>
            <Input
              disableUnderline={true}
              id="password"
              className="login__form--input"
              {...register("password")}
              placeholder={"*******"}
              type="password"
            ></Input>
          </div>
          {loginError !== "" ? <Error message={loginError}></Error> : ""}
        </Stack>
        <input style={{marginTop:"1rem"}} className="login__button" type="submit" value="I'm back!" />
        <Typography className="login__signupLink" component={Link} to="/join">
          I don't have an account yet
        </Typography>
      </form>
    </>
  );
};
export default LoginForm;
