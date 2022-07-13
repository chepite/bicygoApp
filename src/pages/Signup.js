import { Typography, Divider, Stack } from "@mui/material";
import { Link } from "react-router-dom";
import BackButton from "../components/onboarding/Backbutton";
import { useStore } from "../store";
import SignupForm from "../components/onboarding/SignupForm";
import GoBackButton from "../components/GoBackButton";
const Signup = ()=>{
    const name = useStore((state)=> state.name)
     return (
       //<>
       // <BackButton></BackButton>
       // <Typography>It's a pleasure to meet you, {name}! </Typography>
       // <Typography>a few clicks away from home!</Typography>
       // <SignupForm></SignupForm>
       // </>
       <>
         <Stack
           className="buttons"
           direction="row"
           height={"5vh"}
           position="relative"
           alignItems={"center"}
           justifyContent={"left"}
           paddingTop={"1.5rem"}
           paddingBottom=".5rem"
         >
           {/* <Typography
             color={"#45524A"}
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
             color={"#9AA5A1"}
             component={Link}
             to="/login"
             sx={{ textDecoration: "none" }}
           >
             sign in
           </Typography> */}
           <GoBackButton></GoBackButton>
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
               fontSize={"20px"}
               className="login__title"
             >
               Nice to meet you, <span className="highlightName">{name}</span>! :&#41;
             </Typography>
             <Typography
               sx={{ marginBottom: "2rem", fontSize: "16px" }}
               fontFamily={"Poppins"}
               className="login__subtitle"
             >
               a few clicks away from home.
             </Typography>
           </Stack>
           <SignupForm></SignupForm>
         </Stack>
       </>
     );
}
export default Signup;