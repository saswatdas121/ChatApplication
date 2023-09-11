import {React,useEffect} from 'react'
import { Container,Box,Text} from '@chakra-ui/react'
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import Login from '../Components/Authentication/Login.js'
import Signup from '../Components/Authentication/Signup.js'

function HomePage() {

  
  //Box acts like a div and we dont need to write style= this type of thing.Just we can style directly..
  return (
    <Container maxW="xl" centerContent>
    <Box p={3} bg="white" w="100%" m="40px 0 15px 0" borderRadius="lg" borderWidth="1px">
      <Text display="flex" justifyContent="center" fontSize="4xl" fontFamily= 'Maven Pro'>JustChat</Text>
    </Box>
    <Box p={3} bg="white" w="100%" m="40px 0 15px 0" borderRadius="lg" borderWidth="1px" fontFamily= 'Maven Pro'>
    <Tabs variant='soft-rounded' colorScheme='green'>
  <TabList>
    <Tab width="50%">Login</Tab>
    <Tab width="50%">Signup</Tab>
  </TabList>
  <TabPanels>
    <TabPanel>
      <Login/>
    </TabPanel>
    <TabPanel>
    <Signup/>
    </TabPanel>
  </TabPanels>
</Tabs>

</Box>

    </Container>
  )
}

export default HomePage;
