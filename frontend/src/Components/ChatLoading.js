import { Skeleton} from '@chakra-ui/react'
import { Stack } from "@chakra-ui/layout";


import React from 'react'

function ChatLoading() {
  return (
    
<Stack>
  <Skeleton height='45px' />
  <Skeleton height='45px' />
  <Skeleton height='45px' />
  <Skeleton height='45px' />
  <Skeleton height='45px' />
  <Skeleton height='45px' />
  <Skeleton height='45px' />
  <Skeleton height='45px' />
  <Skeleton height='45px' />
  <Skeleton height='45px' />
  <Skeleton height='45px' />
  <Skeleton height='45px' />
</Stack>
   
  )
}

export default ChatLoading
