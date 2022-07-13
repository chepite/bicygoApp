import { Button, Stack, Typography, SvgIcon } from "@mui/material";
import TopProfile from "../components/TopProfile";
import { createClient } from "@supabase/supabase-js";
import { useNavigate } from "react-router-dom";
import AddSavedAddress from "../components/AddSavedAddress";
import EditSavedAddress from "../components/EditSavedAddress";

import { useEffect, useState } from "react";
import { fontFamily } from "@mui/system";
import { useQuery } from "react-query";
import SavedAddresses from "../components/SavedAddresses";
import SavedAddressCard from "../components/SavedAddressCard";
import Error from "../components/Error"
import { LogoutIcon } from "../img/svg/Icons";
const Profile = ()=>{
  const navigate = useNavigate();
  const supabase = createClient(
        "https://ofbromqumcvsmqxbrkrn.supabase.co",
        process.env.REACT_APP_SUPABASE_ANON_KEY
      );
  const session = supabase.auth.session();

// const address= {
//   address_line1: "Hekkestraat 26",
//   address_line2:"8750 Wingene"
// }

// const fetch = async () => {
//   let saved;
//    await supabase
//      .from("savedAddresses")
//      .select()
//      .eq("user", localStorage.getItem("user_id"))
//      .then((data) => (saved = data.data));
//      console.log(saved)
//      setSavedAddresses(saved)
// };
// const [savedAddresses, setSavedAddresses] =  useState([]);

// useEffect(()=>{
//   if(session){
//     fetch();
//   }
// },[]);

//react query code for fetch
  const { isLoading, error, data } = useQuery("savedAddresses", async () => {
    if(session){
      const saved = await supabase
        .from("savedAddresses")
        .select()
        .eq("user", localStorage.getItem("user_id"));
      console.log(saved)
      return saved;
    }
  });



  const logout = async()=>{
        const { error } = await supabase.auth.signOut();
        localStorage.clear()
        navigate("/login");
  }
    return (
      <>
        {error && (
          <Error
            message={"there was an error loading your saved addresses"}
          ></Error>
        )}
        <TopProfile></TopProfile>
        <Stack width="100vw" justifyContent={"center"} alignItems="center">
          {isLoading && (
            <img
              style={{ width: "60%", height: "auto" }}
              src={require("../img/loading.gif")}
              alt="loading animation"
            ></img>
          )}
        </Stack>
        {session && data && (
          <Stack
            direction={"column"}
            alignItems={"center"}
            spacing={2}
            height="70vh"
            justifyContent={"space-around"}
          >
            <Stack direction="column" alignItems={"center"} spacing={2}>
              {data &&
                data.data.map((element) => (
                  <EditSavedAddress
                    key={element.id}
                    address={element}
                  ></EditSavedAddress>
                ))}
              <AddSavedAddress></AddSavedAddress>
            </Stack>
            <button
              style={{
                border: "none",
                backgroundColor: "rgba(18,107,114, .2)",
                color: "#126B72",
                width: "70%",
                padding: ".5rem",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: "50px",
              }}
              onClick={logout}
            >
              <SvgIcon sx={{ marginRight: ".5rem" }}>{LogoutIcon}</SvgIcon>
              Logout
            </button>
          </Stack>
        )}
        {!session && (
          <Stack direction="column" alignItems={"center"}>
            <Typography
              fontFamily={"Poppins"}
              fontSize="16px"
              marginTop="3rem"
              color="#FFA97C"
            >
              sign up to make your account
            </Typography>
            <img
              style={{ margin: "2rem 2rem 4rem 2rem" }}
              src={require("../img/join.png")}
              alt="join bicygo illustration"
            ></img>
            <Button
              sx={{
                textTransform: "none",
                height: "54px",
                backgroundColor: "#126B72",
                color: "#FFF",
                borderRadius: "50px",
                padding: ".5rem",
                width: "70%",
                fontSize: "18px",
                fontFamily: "Poppins",
              }}
              onClick={() => navigate("/join")}
            >
              join bicyGO!
            </Button>
          </Stack>
        )}
      </>
    );
}
export default Profile;