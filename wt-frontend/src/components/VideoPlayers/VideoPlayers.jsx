import instructions from "../../assets/instructions.wmv";
import VideoPlayer from "react-video-js-player"



const VideoPlayers = () => {
    const videoSrc=instructions
        return (
           <div className="App">
               <h2>Tutorial</h2>
               <VideoPlayer
               src={videoSrc}
               widht="720"
               height="420"/>
           </div>
        )
}

export default VideoPlayers;