import React, { useRef, useState } from 'react'
import {
  Button,
  Flex,
  FormHelperText,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Tag,
  TagCloseButton,
  TagLabel,
  Text,
  useColorMode,
  useToast
} from '@chakra-ui/core'
import { useMutation } from 'react-query'
import { RiMailSendLine } from 'react-icons/ri'

import { sendInvitation } from '../../services/room'
import { validateEmail } from '../../utils/validation'

interface IInvitationModal {
  isOpen: boolean;
  onClose: () => void;
  roomID?: string;
}

const InvitationModal: React.FC<IInvitationModal> = ({ isOpen, onClose, roomID }) => {
  const toast = useToast()
  const { colorMode } = useColorMode()
  const [email, setEmail] = useState<string>('')
  const [emails, setEmails] = useState<string[]>()
  const [error, setError] = useState<string>()
  const initialRef = useRef<HTMLInputElement>(null)

  const _closeModal = () => {
    setEmails([])
    setEmail('')
    setError('')
    onClose()
  }

  const [invitePeople, { isLoading }] = useMutation(sendInvitation, {
    onSuccess: (res) => {
      if (res && res.status === 200) {
        toast({
          position: 'top-right',
          title: 'Invitation sent.',
          description: 'An invitation email has been sent to the email addresses you provided.',
          status: 'success',
          duration: 3000,
          isClosable: true
        })
      }
    },
    onError: (error: Error) => {
      console.warn(error)
      toast({
        position: 'top-right',
        title: 'An error occured.',
        description: "The invitation couldn't be sent. Try again later...",
        status: 'error',
        duration: 3000,
        isClosable: true
      })
    }
  })

  const updateEmails = (): string[]|void => {
    const newEmails = []
    if (email) {
      if (validateEmail(email)) {
        if (emails && !emails.includes(email)) {
          newEmails.push(...emails, email)
        } else {
          newEmails.push(email)
        }
        setEmails(newEmails)
        setEmail('')
        return newEmails
      } else {
        setError('Oops! It seems you typed a wrong email address')
      }
    }
    return emails
  }
  const _handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim()
    if (value.includes(' ')) {
      const values = value.split(' ')
      const allowedValues = []
      const wrongEmails = []
      for (const val of values) {
        if (validateEmail(val)) {
          allowedValues.push(val)
        } else {
          wrongEmails.push(val)
        }
      }
      emails ? setEmails([...emails, ...allowedValues]) : setEmails([...allowedValues])
      if (wrongEmails.length > 0) {
        setError(`Some email addresses were not correct (${wrongEmails})`)
      }
    } else {
      setEmail(value)
    }
    setError('')
  }
  const _handleEmailKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === ' ') {
      e.preventDefault()
      updateEmails()
    }
  }

  const _handleRemoveEmail = (email: string) => {
    if (emails) {
      setEmails(emails.filter(item => item !== email))
    }
  }

  const _handleSendInvitation = () => {
    const updatedEmails = updateEmails()
    if (updatedEmails && roomID) {
      invitePeople({
        id: roomID,
        emails: updatedEmails
      }, {
        onSuccess: (res) => {
          if (res && res.status === 200) {
            _closeModal()
          }
        }
      })
    }
  }

  const _renderTags = () => {
    return emails && emails.map((email, index) => (
      <Tag
        size="sm"
        rounded="full"
        variant="solid"
        variantColor="accent"
        key={index}
        m={1}
      >
        <TagLabel>{email}</TagLabel>
        <TagCloseButton onClick={() => _handleRemoveEmail(email)}/>
      </Tag>
    ))
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={_closeModal}
      isCentered
      size="lg"
      initialFocusRef={initialRef}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader px={3} py={2}>
          <Text
            as="h2"
            color={colorMode === 'light' ? 'primary.500' : 'primary.200'}
            fontWeight="normal"
          >
              Invite people to join your room!
          </Text>
          <ModalCloseButton />
        </ModalHeader>
        <ModalBody>
          <Flex align="center" wrap="wrap" >
            { _renderTags() }
            <Input
              display="inline-flex"
              w="auto"
              minW="200px"
              flex={1}
              value={email}
              onChange={_handleEmailChange}
              onKeyDown={_handleEmailKeyPress}
              ml={2}
              mt={1}
              name="emails"
              placeholder="email@example.com"
              size="md"
              variant="unstyled"
              data-lpignore="true"
              autoFocus
              ref={initialRef}
            />
          </Flex>
          <FormHelperText>
          (separate addresses with spaces)
          </FormHelperText>
          <Text mt={2} color="red.300" fontSize="sm">
            {error}
          </Text>
        </ModalBody>
        <ModalFooter>
          <Button
            mr={3}
            onClick={_closeModal}
            variantColor="gray"
            variant="outline"
            size="sm"
            isDisabled={isLoading}
          >
            <Text
              as="span"
              color={colorMode === 'light' ? 'black.500' : 'black.200'}
              fontWeight="normal"
            >
              Cancel
            </Text>
          </Button>
          <Button
            aria-label="Send invitation"
            onClick={_handleSendInvitation}
            variantColor="accent"
            variant="outline"
            size="sm"
            isLoading={isLoading}
            isDisabled={!email && (!emails || emails.length === 0)}
            leftIcon={RiMailSendLine}
          >
            Send
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default InvitationModal
