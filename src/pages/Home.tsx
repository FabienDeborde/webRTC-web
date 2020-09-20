import React, { memo } from 'react'
import { RouteComponentProps } from '@reach/router'
// import {} from '@chakra-ui/core'

interface Props {
    alt?: string;
}
// import PropTypes from 'prop-types'

const Home = ({ alt }: Props & RouteComponentProps) => {
  console.log('alt props', alt)

  return (
    <p>home</p>
  )
}

export default memo(Home)

Home.propTypes = {}
