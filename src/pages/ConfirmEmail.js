import { Stack, Typography,Button } from "@mui/material";
import { useQuery } from "react-query";
import { createClient } from "@supabase/supabase-js";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useStore } from "../store";
import {style} from "../css/loginform.css"

const ConfirmEmail = () => {
    const name = useStore((state)=> state.name);
    const [error, setError]= useState("");
    const navigate = useNavigate()
      const supabase = createClient(
        "https://ofbromqumcvsmqxbrkrn.supabase.co",
        process.env.REACT_APP_SUPABASE_ANON_KEY
      );

      const tryLogin = async()=>{
       const tryUser=  await supabase.auth.signIn({
          email: sessionStorage.getItem("signupEmail"),
          password: sessionStorage.getItem("signupPassword"),
        })
        if(!tryUser.error){
          localStorage.setItem("name", tryUser.user.user_metadata.name);
          localStorage.setItem("access_token", tryUser.data.access_token);
          localStorage.setItem("user_id", tryUser.user.id);
          localStorage.setItem("name", tryUser.user.user_metadata.name);
            navigate("/onboarding");
        }
        else{
            setError("You still need to confirm your email =)");
        }
      }


  return (
    <Stack
      width="100vw"
      height="100vh"
      direction="column"
      alignItems={"center"}
    >
      <Stack
        direction="column"
        alignItems="center"
        marginTop={"4rem"}
        paddingTop="1rem"
        borderRadius="30px 30px 0 0"
        width={"100vw"}
        height="100vh"
        sx={{ backgroundColor: "#fff", bottom: "0" }}
      >
        <Typography fontFamily={"Lato"} fontSize="20px" color="#45524A">
          Almost there <span style={{ color: "#FA8794" }}>{name}</span>{" "}
        </Typography>
        <Typography color="#535353">a few clicks away from home</Typography>
        <img
          src={require("../img/confirm.png")}
          alt="confirm email illustration"
          height={"auto"}
          width="90%"
          style={{ marginRight: "1rem", marginTop: "2rem" }}
        ></img>
        {error !== "" ? error : ""}

        <button
          className="login__button"
          style={{ width: "18rem", marginTop: "2rem" }}
          onClick={() => {
            tryLogin();
          }}
        >
          I have confirmed my email
        </button>
      </Stack>
    </Stack>
  );
};
export default ConfirmEmail;
