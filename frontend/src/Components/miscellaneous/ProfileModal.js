import {useDisclosure} from '@chakra-ui/hooks';
import { IconButton,Button,Image} from '@chakra-ui/react';
import {ViewIcon} from '@chakra-ui/icons';
import React from 'react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
  } from '@chakra-ui/react'

function ProfileModal({user,children}) {
    const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <>
    {
        children?( <span onClick={onOpen}>{children}</span>):<IconButton display={{base:"flex"}} icon={<ViewIcon/>} onClick={onOpen}></IconButton>
    }

<Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontSize="40px" fontFamily="Work sans" display="flex" justifyContent="center">Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody display="flex" justifyContent="space-between">
           <Image borderRadius="fill" boxSize="150px" src='https://bit.ly/dan-abramov' alt="Saswat">
           </Image>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant='ghost'>Secondary Action</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    
    </>
  )
}

export default ProfileModal
