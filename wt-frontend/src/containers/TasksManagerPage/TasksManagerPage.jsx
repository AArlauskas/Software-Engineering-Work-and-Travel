import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { createTask, getTaskById } from "../../api/Api";
import URI from "../../constants/URI";
import EmailerPage from "../EmailerPage/EmailerPage";
import LookupPage from "../LookupPage/LookupPage";

const TasksManagerPage = ({ isCreating }) => {
  const navigate = useNavigate();
  const params = useParams();
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
    const { id } = params;
    const task = {
      id,
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
      const { id } = params;
      getTaskById(id)
        .then((response) => {
          const { header, body, companies } = response.data;
          setEmailerData({
            header,
            body,
          });
          setLookupData(companies);
        })
        .catch(() => navigate(-1));
    }
  }, [isCreating, params, navigate]);

  return (
    <>
      {!onSecondPage ? (
        <EmailerPage onNext={navigateForward} data={emailerData} />
      ) : (
        <LookupPage
          onPrevious={navigateBack}
          onNext={onTaskSubmit}
          data={lookupData}
        />
      )}
    </>
  );
};

export default TasksManagerPage;
