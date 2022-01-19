import instructions from "../../assets/instructions.wmv";

const VideoPlayer = () => {
    return (
    <video width="100%" height="100%" preload="auto">
        <source src={instructions} type="video/wmv" />
    </video>
    )
}

export default VideoPlayer;