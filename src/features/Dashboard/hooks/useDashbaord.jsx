import { useNavigate } from "react-router";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
const useDashboard = () => {
  const navigate = useNavigate();

  const { allQuestions } = useSelector((store) => store.questionSlice);
  const [DSA, setDSA] = useState([]);

  const [interview, setInterview] = useState([]);
  const [machine, setMachine] = useState([]);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (allQuestions.length === 0) {
      return setProgress({
        progress: 0,
        length: 0,
      });
    }

    const DSACategory = allQuestions.filter((qs) => {
      return qs.category === "DSA";
    });

    const interview = allQuestions.filter((qs) => {
      return qs.category === "Technical Interview";
    });

    const machine = allQuestions.filter((qs) => {
      return qs.category === "Machine Coding";
    });

    const progress = allQuestions.filter((qs) => qs.status === "Complete");

    setProgress({
      progress: (progress.length / allQuestions.length) * 100,
      length: progress.length,
    });

    setMachine(machine);
    setDSA(DSACategory);
    setInterview(interview);
  }, [allQuestions]);

  return {
    navigate,
    allQuestions,
    interview,
    DSA,
    progress,
    machine
  };
};

export default useDashboard;
