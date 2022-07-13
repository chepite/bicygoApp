import { requirePropFactory, Stack, Typography } from "@mui/material";

const DriverCard = ({name, img}) => {
  return (
    <Stack
      width="50%"
      height={"auto"}
      padding=".25rem"
      backgroundColor="#FFF"
      borderRadius="50px"
      direction="row"
      alignItems={"center"}
      justifyContent="space-between"
      boxShadow={"3px 3px 5px 0px rgba(240, 248, 249)"}
    >
      {/* rgba(240, 248, 249) */}
      <img src={require("../img/driver.png")} alt="driver profile"></img>
      <Typography marginRight={"25%"} fontFamily="Poppins" color="#828282">
        {name}
      </Typography>
    </Stack>
  );
};
export default DriverCard;
