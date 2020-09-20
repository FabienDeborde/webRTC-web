
import React, { memo, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import {
  Box,
  Button,
  ControlBox,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Icon,
  Input
} from '@chakra-ui/core'

const HomeCreate = memo(function HomeCreate () {
  const { handleSubmit, errors, register, formState, watch, setValue } = useForm({
    mode: 'onBlur',
    defaultValues: {
      roomName: '',
      withPassword: false,
      roomPassword: ''
    }
  })
  const { withPassword } = watch()

  useEffect(() => {
    if (!withPassword) {
      setValue('roomPassword', '')
    }
  }, [withPassword, setValue])

  function validateRoomName (value: string) {
    let error
    if (!value) {
      error = 'A room name is required'
    } else if (value === 'wertyuio') {
      error = 'Room name invalid'
    }
    return error || true
  }

  function onSubmit (values: any) {
    setTimeout(() => {
      console.log(JSON.stringify(values, null, 2))
    }, 1000)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl isInvalid={errors.roomName}>
        <FormLabel htmlFor="roomName">Room name</FormLabel>
        <Input
          name="roomName"
          placeholder="Choose a room name"
          size="lg"
          variant="flushed"
          ref={register({ validate: validateRoomName })}
        />
        <FormErrorMessage>
          {errors.roomName && errors.roomName.message}
        </FormErrorMessage>
      </FormControl>
      <FormControl isInvalid={errors.roomPassword} mt={6}>
        <label>
          <input
            name="withPassword"
            type="checkbox"
            ref={register}
            style={{ display: 'none' }}
          />
          <ControlBox
            borderWidth="1px"
            size="24px"
            rounded="sm"
            _checked={{ bg: 'brand.500', color: 'white', borderColor: 'brand.500' }}
            _focus={{ borderColor: 'brand.600', boxShadow: 'none' }}
          >
            <Icon name="check" size="16px" />
          </ControlBox>
          <Box as="span" verticalAlign="top" ml={3}>
          Protect the room with a password?
          </Box>
        </label>

        <Input
          name="roomPassword"
          placeholder="Enter a password here..."
          size="lg"
          variant="flushed"
          ref={register}
          type="password"
          isDisabled={!withPassword}
        />

        <FormErrorMessage>
          {errors.roomPassword && errors.roomPassword.message}
        </FormErrorMessage>
      </FormControl>
      <Box>
        <Button
          mt={6}
          variantColor="brand"
          isLoading={formState.isSubmitting}
          type="submit"
          w="100%"
        >
        Create
        </Button>
      </Box>
    </form>
  )
})

export default HomeCreate
