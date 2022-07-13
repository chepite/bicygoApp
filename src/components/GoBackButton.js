import { Button } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import style from "../css/style.css";
import { useNavigate } from "react-router";
const GoBackButton = ({color, to}) => {
  const navigate = useNavigate()
  const handleBack = () => {
    if(!to){
      navigate(-1);
    }
    else{
      navigate(to);
    }
  };
  return (
    <>
      {color && (
        <Button
          sx={{ color: `${color}`, 
          // marginLeft: "1rem" 
        }}
          className="backbutton"
          onClick={handleBack}
        >
          <ArrowBackIosNewIcon />
        </Button>
      )}
      {!color && (
        <Button
          sx={{ color: "var(--grey)", marginLeft: "1rem" }}
          className="backbutton"
          onClick={handleBack}
        >
          <ArrowBackIosNewIcon />
        </Button>
      )}
    </>
  );
};

export default GoBackButton;