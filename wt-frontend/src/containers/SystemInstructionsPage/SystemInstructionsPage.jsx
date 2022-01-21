import { Grid, Typography } from "@mui/material";


const SystemInstructionsPage = () => {
    return (
        <Grid className="container" container spacing={2}>
            <Grid item xs={12}>
                <Typography variant="h4">System Instructions</Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography variant="h5">How it works?</Typography>
            </Grid>
            <Grid item xs={12} md={4} alignItems="center">
                <Typography variant="h6">Tasks</Typography>
                <ul>
                    <li>Go to tasks.</li>
                    <li>You will see all the task that you created and also button for creating new task </li>
                    <li>Header is the name of your task</li>
                    <li>Email count is number of emails that have been sent</li>
                    <li>Company count is the number of companies that were selected</li>
                    <li>Status: If is CREATED that means that your emails are still not sent, IN PROGRESS means that they are sending
                        and DONE means that they are sent</li>
                </ul>
            </Grid>
            <Grid item xs={12} md={4} alignItems="center">
                <Typography variant="h6">Create New Task</Typography>
                <ul>
                    <li>If you want to create new task click on CREATE NEW TASK button</li>
                    <li>You have header place where you need to write the SUBJECT of the mail</li>
                    <li>Beyond you have field for writing the body of your mail </li>
                    <li>You can decide if you want first to send your email to yourself first by pressing TEST EMAIL button </li>
                    <li>You have NEXT button, that will lead you to Companies selection page</li>
                </ul>
            </Grid>
            <Grid item xs={12} md={4} alignItems="center">
                <Typography variant="h6">Companies selection</Typography>
                <ul>
                    <li>In Companies selection page you can see the list of all comanies</li>
                    <li>You can select </li>
                    <li>Beyond you have field for writing the body of your mail </li>
                    <li>You can decide if you want first to send your email to yourself first by pressing TEST EMAIL button </li>
                    <li></li>
                </ul>
            </Grid>
            <Grid item xs={4} />
        </Grid>


    );
};

export default SystemInstructionsPage;