import { Stack, Typography, Box } from "@mui/material";
import GoBackButton from "../components/GoBackButton";
const TopProfile = () => {
    const name = localStorage.getItem("name");

  return (
    <Stack direction="column" justifyContent={"space-between"} width={"100%"}>
      <Box
        sx={{ backgroundColor: "#FFA97C" }}
        width="5rem"
        height="5rem"
        borderRadius={"50%"}
        marginTop="-.7rem"
        marginLeft="-.7rem"
        display="flex"
        flexDirection={"column"}
        alignItems="center"
        justifyContent={"center"}
      >
        <GoBackButton to={"/"} color="#fff"></GoBackButton>
      </Box>
      <Stack width="100%" direction="row" alignItems={"baseline"} justifyContent="center">
        <Typography
          color="#14656B"
          fontSize={"24px"}
          marginRight=".5rem"
          fontFamily="Lato"
          fontWeight={"800"}
        >
          hi
        </Typography>
        <Typography
          color="#FA8794"
          fontSize="40px"
          fontFamily={"Lato"}
          fontWeight={"800"}
        >
          {name ? name+"!" : "stranger!"}
        </Typography>
      </Stack>
    </Stack>
  );
};
export default TopProfile;
