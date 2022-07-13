import { useForm } from "react-hook-form";
import { Input, Stack, Typography } from "@mui/material";
import { createClient } from "@supabase/supabase-js";
import {useStore} from "../../store"
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import style from "../../css/signup.css"
import { useState } from "react";
import Error from "../Error";

const SignupForm = () => {
       const name = useStore((state)=> state.name)
    const navigate = useNavigate()
    const supabase = createClient('https://ofbromqumcvsmqxbrkrn.supabase.co', process.env.REACT_APP_SUPABASE_ANON_KEY)
  const [error, setError] = useState("")

      const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm();

      const onSubmit = async(data) => {
        
        if (
          data.password === data.repeatPassword &&
          data.password.length > 6
        ) {
          const { user, session, error } = await supabase.auth.signUp(
            {
              email: data.email,
              password: data.password,
            },
            {
              data: {
                name: name,
              },
            }
          );
          sessionStorage.setItem("signupEmail", data.email);
          sessionStorage.setItem("signupPassword", data.password);
          navigate("/confirmEmail");
        } else {
          if(data.password.length <=6){
            setError("passwords should be at least 6 character long");
          }
          else if(data.password !== data.repeatPassword){
            setError("passwords don't match");
          }
        }
      };
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack direction={"column"} width="100%">
          <Stack direction="column" marginBottom={"1.5rem"}>
            <label htmlFor="email">e-mail</label>
            <Input
              className="signup__input"
              disableUnderline={true}
              id="email"
              {...register("email")}
              placeholder={"your@mail.com"}
              type="email"
            ></Input>
          </Stack>
          <Stack directon="column" marginBottom={"1.5rem"}>
            <label htmlFor="email">password</label>
            <Input
              className="signup__input"
              disableUnderline={true}
              id="password"
              {...register("password")}
              placeholder={"*****"}
              type="password"
            ></Input>
          </Stack>
          <Stack direction="column" marginBottom={"1.5rem"}>
            <label htmlFor="repeatPassword">repeat password</label>
            <Input
              className="signup__input"
              disableUnderline={true}
              id="repeatPassword"
              type="password"
              {...register("repeatPassword")}
              placeholder={"*****"}
            ></Input>
          </Stack>
        </Stack>
        <Error message={error}></Error>
        <input style={{marginTop:"2rem"}} type="submit" value="join byciGo" />
      </form>
    </>
  );
};
export default SignupForm;
