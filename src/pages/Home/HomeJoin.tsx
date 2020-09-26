
import React, { memo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { motion } from 'framer-motion'
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  Text
} from '@chakra-ui/core'
import { useMutation } from 'react-query'
import { useNavigate } from '@reach/router'

import { RoomAccessResponse, RoomAccess } from '../../typings'
import { accessRoom } from '../../services/room'

const MotionButton = motion.custom(Button)
const MOTION_AMPLITUDE = 24

interface IHomeJoin {
  defaultID?: string;
}

const HomeJoin: React.FC<IHomeJoin> = ({ defaultID }) => {
  const navigate = useNavigate()
  const [formError, setFormError] = useState('')

  const { handleSubmit, register, errors } = useForm({
    mode: 'onBlur',
    defaultValues: {
      id: defaultID || '',
      password: ''
    }
  })

  const [joinRoom, { isLoading }] = useMutation(accessRoom, {
    onSuccess: (res) => {
      const data = res.data as RoomAccessResponse
      setFormError('')
      if (data.access) {
        navigate(`/room/${data.id}`, {
          state: {
            access: true,
            name: data.name || data.id
          }
        })
      } else {
        setFormError('Sorry but you do not have access to this room.\n Either the room does not exists anymore, or your password is not correct.')
      }
    },
    onError: (error: Error) => {
      setFormError(error && error.message)
    }
  })

  const onSubmit = async (data: RoomAccess) => {
    if (!isLoading) {
      joinRoom(data)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl>
        <FormLabel htmlFor="id">Room ID</FormLabel>
        <Input
          name="id"
          placeholder="example: 3sa54c6rdtv7yfui"
          size="lg"
          variant="flushed"
          ref={register}
          data-lpignore="true"
          autoFocus
        />
        <FormErrorMessage>
          {errors.id && errors.id.message}
        </FormErrorMessage>
      </FormControl>
      <FormControl mt={6}>
        <FormLabel htmlFor="password">Room password</FormLabel>
        <Input
          name="password"
          placeholder=""
          size="lg"
          variant="flushed"
          ref={register}
          type="password"
          data-lpignore="true"
        />
        <FormErrorMessage>
          {errors.password && errors.password.message}
        </FormErrorMessage>
        <FormHelperText>
          Enter a password here if the room is protected.
        </FormHelperText>
      </FormControl>
      <Box>
        <MotionButton
          mt={6}
          variantColor="primary"
          isLoading={isLoading}
          type="submit"
          w="100%"
          animate={formError ? { x: [-MOTION_AMPLITUDE, MOTION_AMPLITUDE, -MOTION_AMPLITUDE, MOTION_AMPLITUDE, -MOTION_AMPLITUDE, MOTION_AMPLITUDE, 0] } : undefined}
        >
        Join
        </MotionButton>
      </Box>
      <Text mt={2} color="red.300">{formError}</Text>
    </form>
  )
}

export default memo(HomeJoin)
