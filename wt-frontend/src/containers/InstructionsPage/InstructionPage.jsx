import { Grid, Typography, Button, Hidden } from "@mui/material";
import VideoPlayers from "../../components/VideoPlayers/VideoPlayers"


const InstructionPage = () => {
    return (
        <Grid className="container" container spacing={2}>
            <Grid item xs={4} />
            <Grid item xs={4} md={8} alignItems="center">
                <VideoPlayers />
            </Grid>
            <Grid item xs={4} />
            <Grid item xs={12}/>
            <Typography variant="h5">Instructions</Typography>
            <Grid item xs={4} />
            <Grid item xs={4} md={8} alignItems="center">
                <ul>
                    <li>
                        Go to your Google Account
                    </li>
                    <li>
                        Go to Security and scroll down to find "Signing in to Google"
                    </li>
                    <li>
                        Make sure you have 2-Step verification enabled
                    </li>
                    <li>
                        Go to "App passwords" and enter "Work and Travel" in the "Select app" field
                    </li>
                    <li>
                        Click on generate and use the provided password to complete your registration
                    </li>
                </ul>
            </Grid>
            <Grid item xs={4} />
        </Grid>

    );
};

export default InstructionPage;
