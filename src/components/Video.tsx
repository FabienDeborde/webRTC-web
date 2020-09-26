import React, { useEffect, useRef } from 'react'

interface IVideo {
  stream: MediaStream | null;
  muted?: boolean;
}

const Video: React.FC<IVideo> = ({ stream, muted }) => {
  const videoRef = useRef<HTMLVideoElement>(null)
  useEffect(() => {
    const video = videoRef && videoRef.current
    if (video && stream) {
      video.srcObject = stream
      video.play()
    }
  }, [stream])

  console.log('stream', stream)

  return (
    <video
      ref={videoRef}
      muted={!!muted}
      style={{
        width: 'auto',
        height: '100%'
      }}
    />
  )
}

export default Video
