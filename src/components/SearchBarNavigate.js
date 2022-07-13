import { Input, InputAdornment,SvgIcon} from "@mui/material";
import { useNavigate } from "react-router-dom";
// import SearchIcon from "@mui/icons-material/Search";
import {SearchIcon} from "../img/svg/Icons";
const SearchBarNavigate = () => {
    const navigate = useNavigate();

  return (
    <form
      style={{ display: "flex", justifyContent: "start", width: "90%" }}
      onFocus={() => {
        navigate("/search");
      }}
    >
      {" "}
      <Input
        className="SearchBar"
        type="text"
        placeholder="where'd do you wanna go?"
        sx={{
          width: "100%",
          padding: ".5rem",
          borderRadius: "50px",
        }}
        startAdornment={
          <InputAdornment position="start">
            <SvgIcon sx={{ fill: "#FFA97C", marginRight:".5rem" ,marginLeft:".5rem"}}>{SearchIcon}</SvgIcon>
          </InputAdornment>
        }
        disableUnderline={true}
      ></Input>
    </form>
  );
};
export default SearchBarNavigate;
