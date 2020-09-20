import React from 'react'
import { Box, Icon } from '@chakra-ui/core'

interface ICustomIcon {
  iconName: string;
}

const CustomIcon: React.FC<ICustomIcon> = ({ iconName }) => {
  return (
    <Box
      as="em"
      lineHeight="1.2rem"
      marginLeft="-.25rem"
      marginRight="0.5rem"
      verticalAlign="middle"
      display="block"
    >
      <Icon name={iconName} />
    </Box>
  )
}

export const CreateIcon: React.FC = () => {
  return (
    <CustomIcon iconName="create" />
  )
}
export const JoinIcon: React.FC = () => {
  return (
    <CustomIcon iconName="join" />
  )
}

export default CustomIcon
