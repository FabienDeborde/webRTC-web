export const HEADER_HEIGHT = 48
export const CAPTURE_OPTIONS = {
  audio: true,
  video: true
}

export const SERVER_URL = process.env.REACT_APP_MAIN_API_URL || ''
export const PEER_URL = process.env.REACT_APP_PEER_URL || ''
export const PEER_PORT = process.env.REACT_APP_PEER_PORT ? Number(process.env.REACT_APP_PEER_PORT) : undefined
