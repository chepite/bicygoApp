import {Button} from "@mui/material"
import style from "../../css/onboarding.css"
import { useStore } from "../../store"
import {useNavigate} from "react-router-dom"
import { useEffect } from "react";

const NextButton = ()=>{
    const navigate = useNavigate()
    const index = useStore((state)=> state.index);
    const setIndex= useStore((state)=> state.setIndex)
    useEffect(() => {
      if (index === 4) {
        navigate("/login");
      }
    }, [index, navigate]);

      const handleNext = () => {
        setIndex(index + 1);
      };
    return(
        <button className="onboarding__button" onClick={handleNext}>next</button>
    )
}
export default NextButton;