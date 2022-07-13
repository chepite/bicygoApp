import { Typography, Stack, Divider } from "@mui/material";
import LoginForm from "../components/onboarding/LoginForm";
import { Link } from "react-router-dom";
import { createClient } from "@supabase/supabase-js";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import BackButton from "../components/onboarding/Backbutton";
import style from "../css/loginform.css"

const Login = ()=>{
    const navigate= useNavigate()
     const supabase = createClient(
       "https://ofbromqumcvsmqxbrkrn.supabase.co",
       process.env.REACT_APP_SUPABASE_ANON_KEY
     );
     const session = supabase.auth.session();

     useEffect(() => {
       if (session) {
         //navigate("/");
       }
     });
    
    return (
      <>
        <Stack
          className="buttons"
          direction="row"
          height={"10vh"}
          position="relative"
          alignItems={"center"}
          justifyContent={"center"}
          paddingTop={"1.5rem"}
          paddingBottom=".5rem"
        >
          <Typography
            color={"rgba(250, 135, 148,.5)"}
            marginRight={"2rem"}
            fontWeight={600}
            fontSize={"20px"}
            fontFamily={"Poppins"}
            component={Link}
            to="/join"
            sx={{ textDecoration: "none" }}
          >
            sign up
          </Typography>
          <Divider
            orientation="vertical"
            variant="middle"
            flexItem
            light={true}
            sx={{ height: "50px" }}
          />

          <Typography
            fontFamily={"Poppins"}
            marginLeft={"2rem"}
            fontWeight={600}
            fontSize={"20px"}
            color={"#FA8794"}
          >
            sign in
          </Typography>
        </Stack>
        <Stack
          sx={{ backgroundColor: "white", borderRadius: "50px 50px 0px 0px" }}
          direction="column"
          height={"90vh"}
          alignItems={"center"}
          className="login_roundedWhite"
        >
          <Stack>
            <Typography
              marginTop={"2rem"}
              fontFamily={"Lato"}
              fontWeight={700}
              fontSize={"30px"}
              className="login__title"
            >
              Welcome back, <br></br> You've been missed!
            </Typography>
            <Typography
              sx={{ marginBottom: "2rem", fontSize: "16px" }}
              fontFamily={"Poppins"}
              className="login__subtitle"
            >
              now this is going somewhere...
            </Typography>
          </Stack>
          <LoginForm></LoginForm>
        </Stack>
      </>
    );
}
export default Login;