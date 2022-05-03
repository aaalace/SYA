import React from "react";
import VideoJS from './videoJS';


export default function Video ({src}) {
  const playerRef = React.useRef(null);

  const videoJsOptions = {
    controls: true,
    responsive: true,
    fluid: true,
    sources: [{
      src: src,
      type: 'video/mp4'
    }]
  }

  const handlePlayerReady = (player) => {
    playerRef.current = player;

    player.on('waiting', () => {
    });

    player.on('dispose', () => {
    });
  };
  
  return (
    <div>
      <VideoJS options={videoJsOptions} onReady={handlePlayerReady} />
    </div>
  );
}
