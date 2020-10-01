import React, { useEffect, useRef } from 'react'

interface IVideo {
  stream: MediaStream | null;
  muted?: boolean;
}

const Video: React.FC<IVideo> = ({ stream, muted }) => {
  const videoRef = useRef<HTMLVideoElement>(null)
  useEffect(() => {
    const video = videoRef && videoRef.current
    console.log('stream', stream, muted)
    if (video && stream) {
      video.srcObject = stream
      video.play()
    }
  }, [stream])

  return (
    <video
      ref={videoRef}
      muted={!!muted}
      style={{
        minWidth: 0,
        minHeight: 0,
        width: '100%',
        height: '100%',
        objectFit: 'contain',
        objectPosition: 'center',
        overflow: 'hidden'
      }}
    />
  )
}

export default Video
