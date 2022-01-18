import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { createTask } from "../../api/Api";
import URI from "../../constants/URI";
import EmailerPage from "../EmailerPage/EmailerPage";
import LookupPage from "../LookupPage/LookupPage";

const TasksManagerPage = ({ isCreating }) => {
  const navigate = useNavigate();
  const [onSecondPage, setOnSecondPage] = useState(false);
  const [emailerData, setEmailerData] = useState(null);
  const [lookupData, setLookupData] = useState(null);

  const navigateBack = () => {
    setOnSecondPage(false);
  };

  const navigateForward = (data) => {
    setOnSecondPage(true);
    setEmailerData(data);
  };

  const onTaskSubmit = (data) => {
    setLookupData(data);
    const task = {
      header: emailerData.header,
      body: emailerData.body,
      companies: data,
    };
    createTask(task).then((response) => {
      console.log(response);
      navigate(URI.TASKS);
    });
  };

  useEffect(() => {
    if (!isCreating) {
      //call for data
    }
  }, [isCreating]);

  return (
    <>
      {!onSecondPage ? (
        <EmailerPage onNext={navigateForward} data={emailerData} />
      ) : (
        <LookupPage onPrevious={navigateBack} onNext={onTaskSubmit} />
      )}
    </>
  );
};

export default TasksManagerPage;
