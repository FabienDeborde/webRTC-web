import React, { memo } from 'react'
import { RouteComponentProps } from '@reach/router'
// import PropTypes from 'prop-types'

const NotFound: React.FC<RouteComponentProps> = () => {
  return <div>NotFound</div>
}

export default memo(NotFound)

NotFound.propTypes = {}
