import instructions from "../../assets/instructions1.mp4";
import VideoPlayer from "react-video-js-player"
import posterpic from "../../assets/apppass.jpg";


const VideoPlayers = () => {
    const videoSrc=instructions
    const pic=posterpic
        return (
           <div className="App">
               <h2>Tutorial</h2>
               <VideoPlayer
               src={videoSrc}
               poster={pic}
               widht="520"
               height="220"/>
           </div>
        )
}

export default VideoPlayers;