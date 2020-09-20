
import React, { memo } from 'react'
import { useForm } from 'react-hook-form'
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Input
} from '@chakra-ui/core'

const HomeJoin = memo(function HomeCreate () {
  const { handleSubmit, register, formState } = useForm({
    mode: 'onBlur',
    defaultValues: {
      roomName: '',
      roomPassword: ''
    }
  })

  function onSubmit (values: any) {
    setTimeout(() => {
      console.log(JSON.stringify(values, null, 2))
    }, 1000)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl>
        <FormLabel htmlFor="roomName">Room name</FormLabel>
        <Input
          name="roomName"
          placeholder="example: 3sa54c6rdtv7yfui"
          size="lg"
          variant="flushed"
          ref={register}
        />
      </FormControl>
      <FormControl mt={6}>
        <FormLabel htmlFor="roomName">Room password</FormLabel>
        <Input
          name="roomPassword"
          placeholder=""
          size="lg"
          variant="flushed"
          ref={register}
          type="password"
        />
        <FormHelperText>
          Enter a password here if the room is protected.
        </FormHelperText>
      </FormControl>
      <Box>
        <Button
          mt={6}
          variantColor="brand"
          isLoading={formState.isSubmitting}
          type="submit"
          w="100%"
        >
        Join
        </Button>
      </Box>
    </form>
  )
})

export default HomeJoin
