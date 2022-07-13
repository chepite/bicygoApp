import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import style from "../../css/onboarding.css"
const Skipbutton = () => {
      const navigate = useNavigate();  

  return (
    <>
      <Typography
        className="onboarding__skipbutton"
        sx={{ margin: "2rem" }}
        onClick={() => navigate("/login")}
      >
        skip
      </Typography>
    </>
  );
};
export default Skipbutton;
