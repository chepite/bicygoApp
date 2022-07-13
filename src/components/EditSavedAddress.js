import { Stack, Typography, Button, Link, SvgIcon } from "@mui/material";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import FavoriteIcon from "@mui/icons-material/Favorite";
import SchoolIcon from "@mui/icons-material/School";import { createClient } from "@supabase/supabase-js";
import { useNavigate } from "react-router-dom";
import { EditIcon } from "../img/svg/Icons";
//routes to pinpage to edit existing saved address
const EditSavedAddress = (address)=>{
  console.log("address: ", address)
  const navigate= useNavigate()
      const supabase = createClient(
        "https://ofbromqumcvsmqxbrkrn.supabase.co",
        process.env.REACT_APP_SUPABASE_ANON_KEY
      );
    return (
      <>
        <Stack
          direction={"row"}
          spacing={2}
          alignItems={"center"}
          sx={{
            backgroundColor: "#FA8794",
            color: "white",
            width: "80%",
            borderRadius: "12px",
            padding: ".5rem",
          }}
        >
          <Stack width="10%">
            {address.address.type === "Home" && (
              <HomeRoundedIcon></HomeRoundedIcon>
            )}
            {address.address.type === "School" && <SchoolIcon></SchoolIcon>}
            {address.address.type === "Loved one" && (
              <FavoriteIcon></FavoriteIcon>
            )}{" "}
          </Stack>
          <Stack direction={"column"} spacing={0.5} width="80%">
            <Typography color="#0C2D30">{address.address.name}</Typography>
            <Typography fontWeight={600} fontSize="14px">
              {address.address.address_line1},{address.address.address_line2}
            </Typography>
            {/* <Typography fontSize="14px" fontWeight={600}>
              {address.address.address_line2}
            </Typography> */}
          </Stack>
          <Button
            startIcon={<SvgIcon sx={{ backgroundColor: "#CB3949",padding:".8rem", borderRadius: "30px", color:"#fff", overflow:"visible" }}>{EditIcon}</SvgIcon>}
            onClick={() => {
              // navigate("/pinpage", { state: { address: address } });
              navigate("/pinpage", {
                state: { mode: "edit", address: address },
              });
            }}
          ></Button>
        </Stack>
      </>
    );
}
export default EditSavedAddress;