import { Typography, Input, Stack, Divider } from "@mui/material";
import {useStore} from "../store";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import style from "../css/join.css"

const Join = ()=>{
    const setName= useStore((state)=> state.setName);
    const navigate= useNavigate();
     const {
       register,
       handleSubmit,
       formState: { errors },
     } = useForm();

     const onSubmit = (data)=>{
        setName(data.name);
        navigate("/signup");
     }

    return (
      <>
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
              color={"#FA8794"}
              marginRight={"2rem"}
              fontWeight={600}
              fontSize={"20px"}
              fontFamily={"Poppins"}
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
              color={"rgba(250, 135, 148,.5)"}
              component={Link}
              to="/login"
              sx={{ textDecoration: "none" }}
            >
              sign in
            </Typography>
          </Stack>
          <Stack
            paddingTop={"5rem"}
            sx={{ backgroundColor: "white", borderRadius: "50px 50px 0px 0px" }}
            direction="column"
            height={"73vh"}
            alignItems={"center"}
            className="login_roundedWhite"
          >
            <Typography
              marginTop={"2rem"}
              fontFamily={"Lato"}
              fontWeight={700}
              fontSize={"30px"}
              className="login__title"
            >
              Welcome!
            </Typography>
            <Typography
              sx={{ marginBottom: "2rem", fontSize: "16px" }}
              fontFamily={"Poppins"}
              className="login__subtitle"
            >
              What's your name, friend?
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Input
                disableUnderline={true}
                {...register("name")}
                placeholder="your name"
                sx={{
                  backgroundColor: "#F0F8F9",
                  borderRadius: "50px",
                  padding: ".5rem",
                  width: "222px",
                }}
              ></Input>
              <Input
                disableUnderline={true}
                type="submit"
                value={"Join byciGO!"}
              ></Input>
            </form>
            <Typography
              color={"#535353"}
              sx={{ textDecoration: "none" }}
              component={Link}
              to={"/"}
            >
              Continue without an account
            </Typography>
          </Stack>
        </>
      </>
    );
}
export default Join;