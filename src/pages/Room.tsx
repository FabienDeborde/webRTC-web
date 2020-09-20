import React, { memo } from 'react'
import { RouteComponentProps } from '@reach/router'
// import PropTypes from 'prop-types'

const Room: React.FC<RouteComponentProps> = () => {
  return <div>Room</div>
}

export default memo(Room)

Room.propTypes = {}
