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
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  useColorMode
} from '@chakra-ui/core'
import {
  useMutation
} from 'react-query'
import { useNavigate } from '@reach/router'

import { RoomData, RoomCreateResponse } from '../../typings'
import { createRoom } from '../../services/room'

const MotionButton = motion.custom(Button)
const MOTION_AMPLITUDE = 24

const HomeCreate = memo(function HomeCreate () {
  const { colorMode } = useColorMode()
  const navigate = useNavigate()
  const [show, setShow] = useState(false)
  const [formError, setFormError] = useState('')
  const togglePassword = () => setShow(!show)

  const { register, handleSubmit, errors } = useForm({
    mode: 'onBlur',
    defaultValues: {
      name: '',
      password: ''
    }
  })
  const [addRoom, { isLoading }] = useMutation(createRoom, {
    onSuccess: (res) => {
      const data = res.data as RoomCreateResponse
      setFormError('')
      navigate(`/room/${data.id}`, {
        state: {
          access: true,
          name: data.name || data.id
        }
      })
    },
    onError: (error: Error) => {
      setFormError(error && error.message)
    }
  })

  const onSubmit = async (data: RoomData) => {
    if (!isLoading) {
      addRoom(data)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl isInvalid={errors.name}>
        <FormLabel htmlFor="name">Room name</FormLabel>
        <Input
          name="name"
          placeholder="Choose a room name"
          size="lg"
          variant="flushed"
          ref={register}
          data-lpignore="true"
          autoFocus
        />
        <FormErrorMessage>
          {errors.name && errors.name.message}
        </FormErrorMessage>
        <FormHelperText>
        If you don't choose a room name, the room ID will be used instead.
        </FormHelperText>
      </FormControl>
      <FormControl isInvalid={errors.password} mt={4}>
        <FormLabel htmlFor="password">Room Password <Text as="span" color={colorMode === 'light' ? 'gray.500' : 'whiteAlpha.600'}>(optional)</Text></FormLabel>
        <InputGroup size="md">
          <Input
            pr="4.5rem"
            type={show ? 'text' : 'password'}
            name="password"
            placeholder="Enter a password here..."
            size="lg"
            variant="flushed"
            ref={register}
            data-lpignore="true"
          />
          <InputRightElement width="2.5rem">
            <IconButton
              h="1.75rem"
              size="sm"
              onClick={togglePassword}
              icon={show ? 'view-off' : 'view'}
              aria-label={show ? 'Hide password' : 'Show password'}
            />
          </InputRightElement>
        </InputGroup>
        <FormErrorMessage>
          {errors.password && errors.password.message}
        </FormErrorMessage>
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
        Create
        </MotionButton>
      </Box>
      <Text mt={2} color="red.300">{formError}</Text>
    </form>
  )
})

export default HomeCreate
