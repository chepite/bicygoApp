import { SvgIcon } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { AddIcon } from "../img/svg/Icons";
//routes to pinpage to make a new pin
const AddSavedAddress = ()=>{
    const navigate = useNavigate();
    return (
      <SvgIcon 
      className="dropShadow"
        onClick={() => {
           navigate("/pinpage", { state: { mode: "add" } });
        }}
        sx={{
          color:"#FFA97C",
          borderRadius: "47px",
          backgroundColor: "#FFF",
          padding: ".75rem",
        }}
      >
        {AddIcon}
      </SvgIcon>
    );
}
export default AddSavedAddress;