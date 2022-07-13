import { Card, CardContent, Stack, SvgIcon, Typography } from "@mui/material";
// import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
// import FavoriteIcon from "@mui/icons-material/Favorite";
import { HeartIcon, HomeIcon, SchoolIcon } from "../img/svg/Icons";
import style from "../css/style.css";
import { useNavigate } from "react-router-dom";
import { useStore } from "../store";
// import SchoolIcon from "@mui/icons-material/School";
const SavedAddressCard = (savedAddress)=>{
  const navigate = useNavigate();
  const setHome = useStore((state)=>state.setHome);

    return (
      <Stack
        onClick={() => {
          console.log("click");
          setHome({
            lat: savedAddress.address.lat,
            lon: savedAddress.address.lon,
          });
          navigate("/search");
        }}
        //className="scroll"
        sx={{
          borderRadius: "16px",
          marginLeft: ".7rem",
          width: "182px",
          backgroundColor: "#FA8794",
          height: "48px",
          paddingLeft: ".5rem",
        }}
        display="flex"
        overflow={"scroll"}
        direction={"row"}
        spacing={2}
        // width={"12rem"}
        marginRight="1rem"
        alignItems="center"
        alignContent={"center"}
        height={"2rem"}
        flexShrink={0}
      >
        {savedAddress.address.type === "Home" && (
          <SvgIcon sx={{ fill: "#FFF" }}>{HomeIcon}</SvgIcon>
        )}
        {savedAddress.address.type === "School" && (
          <SvgIcon sx={{ fill: "#FFF" }}>{SchoolIcon}</SvgIcon>
        )}
        {savedAddress.address.type === "Loved one" && (
          <SvgIcon sx={{ fill: "#FFF" }}>{HeartIcon}</SvgIcon>
        )}
        <Stack direction={"column"}>
          <Typography variant="body1" color={"#fff"}>
            {savedAddress.address.name}
          </Typography>
        </Stack>
      </Stack>
    );
}
export default SavedAddressCard;