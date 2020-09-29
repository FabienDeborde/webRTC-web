// eslint-disable-next-line no-undef
export async function getUserMedia (requestedMedia: MediaStreamConstraints): Promise<MediaStream|null> {
  if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    try {
      const stream = await navigator.mediaDevices.getUserMedia(requestedMedia)
      return stream
    } catch (error) {
      console.warn(error)
      return null
    }
  }
  return null
}
