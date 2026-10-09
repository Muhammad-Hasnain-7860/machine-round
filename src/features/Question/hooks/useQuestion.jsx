import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { questionUpdate } from "../state/questionState";
import { useDispatch, useSelector } from "react-redux";
import { nanoid } from "nanoid";
import {update as updateFNC} from '../state/questionState'

const useQuestion = () => {

  const {update} = useSelector((store)=>store.questionSlice)

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues : update
  });

  const [credentials, setCredentials] = useState({
    category: "",
    status: "",
    difficulty: "",
  });

  useEffect(()=>{
    if(update){
     const obj = {...update}
      setCredentials({status : obj.status, category : obj.category , difficulty : obj.difficulty})
    }
  },[])

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const onError = (errors) => {
    console.log(errors);
    const error = Object.keys(errors)[0];
    toast.error(errors[error].message);
  };

  const handleAddQuestion = (data) => {
    if (
      !credentials.category ||
      !credentials.status ||
      !credentials.difficulty
    ) {
      return toast.error(
        "Please fill in all required fields: Category, Status, and Difficulty",
      );
    }

    data.difficulty = credentials.difficulty;
    data.status = credentials.status;
    data.category = credentials.category;
    const questions = JSON.parse(localStorage.getItem("questions")) || [];
    
    if(update){
     const arr = questions.map((qs)=>{
        return qs.id === update.id ? {...data , id : update.id} : qs
      })

    dispatch(questionUpdate([...arr]));
    localStorage.setItem("questions", JSON.stringify(arr));
    dispatch(updateFNC(null))
    }else{
      data.id = nanoid()
      questions.push(data);
      dispatch(questionUpdate([...questions]));
      localStorage.setItem("questions", JSON.stringify(questions));
    }

    setCredentials({ category: "", status: "", difficulty: "" });
    reset();
  };

  return {
    register,
    reset,
    handleSubmit,
    errors,
    navigate,
    onError,
    handleAddQuestion,
    setCredentials,
    credentials,
    dispatch
  };
};

export default useQuestion;
