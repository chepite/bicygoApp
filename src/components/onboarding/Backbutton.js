import { Button } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useStore } from "../../store";
import style from "../../css/style.css"
const BackButton = ({to}) => {
    const setIndex = useStore((state) => state.setIndex);
    const index = useStore((state) => state.index);

  const handleBack = () => {
    setIndex(index - 1);
  };
  return <Button sx={{color: "var(--grey)"}} className="backbutton" onClick={handleBack}><ArrowBackIosNewIcon/></Button>;
};

export default BackButton;
