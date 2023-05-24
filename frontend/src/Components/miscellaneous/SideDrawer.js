import {React,useState} from 'react'
import { Box,Tooltip,Button,Text,Input,useToast} from '@chakra-ui/react'
import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuItemOption,
    MenuGroup,
    MenuOptionGroup,
    MenuDivider,
  } from '@chakra-ui/react'

  import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
  } from '@chakra-ui/react'

  import { BellIcon, ChevronDownIcon} from '@chakra-ui/icons'
  import { Avatar, AvatarBadge, AvatarGroup } from '@chakra-ui/react'
  import ProfileModal from './ProfileModal';
  import {useDisclosure} from '@chakra-ui/hooks';
  import axios from 'axios';

  import ChatLoading from '../ChatLoading';
  import UserListItem from '../UserListItem'

function SideDrawer() {
const [search,setSearch]=useState("");//For Searching the user for name and email
const [searchResult,setSearchResult]=useState([]);
const [loading,setLoading]=useState(false);
const [loadingChat,setLoadingChat]=useState();
const { isOpen, onOpen, onClose } = useDisclosure();
const toast = useToast();

async function handleSearch()
{
    if(!search)
    {
        toast({
            title: 'Please enter something',
            status: 'warning',
            duration: 5000,
            isClosable: true,
            position:'top'
          })
       return;
    }

    setLoading(true);
    try
    {
        const res=await axios.get(`/api/user?search=${search}`);
        console.log(res.data);
        setLoading(false);
        setSearchResult(res.data);
    }
    catch(error)
    {
      toast({
        title: 'Failed to Load the Search Results',
        status: 'error',
        duration: 5000,
        isClosable: true,
        position:'top-left'
        
      })

      return;
    }
    
}
  
return (
    <>
    
      <Box display="flex"
      justifyContent="space-between"
      alignItems="center"
      bg="white"
      w="100%"
      p="5px 10px 5px 10px"
      borderWidth="5px">
     <Tooltip label="Search Users to Chat" hasArrow placement="bottom-end">
        <Button variant="ghost"><i className="fa fa-search" style={{"fontSize":"24px"}} onClick={onOpen}></i>
        <Text d={{base:"none",md:"flex"}} px="4">Search User</Text>
        </Button>
     </Tooltip>
     <Text fontSize="2xl" fontFamily="Work sans">
        JustChat
     </Text>
     <div>
     
     <Menu>
  <MenuButton p={1}>
   <BellIcon fontSize="2xl" m={1}/>
  </MenuButton>
  <MenuList>
    <MenuItem>Download</MenuItem>
    <MenuItem>Create a Copy</MenuItem>
    <MenuItem>Mark as Draft</MenuItem>
    <MenuItem>Delete</MenuItem>
    <MenuItem>Attend a Workshop</MenuItem>
  </MenuList>
</Menu>
<Menu>
<MenuButton as={Button}  rightIcon={<ChevronDownIcon/>}>
    <Avatar size="sm" cursor="pointer" name='Dan Abrahmov' src='https://bit.ly/dan-abramov' />
  </MenuButton>
  <MenuList>
    <ProfileModal>
    <MenuItem>My Profile</MenuItem>
    </ProfileModal>
    <MenuDivider/>
    <MenuItem>Logout</MenuItem>
    
  </MenuList>
    </Menu>
</div>
      </Box>

<Drawer placement="left" onClose={onClose} isOpen={isOpen}>
<DrawerOverlay />
<DrawerContent>
  <DrawerHeader borderBottomWidth='1px'>Search Users</DrawerHeader>
  <DrawerBody>
    <Box display="flex" pb={2}></Box>
    <Input placeholder="Search user by its name or email"  value={search} onChange={(e)=>setSearch(e.target.value)}/>
    <Button onClick={handleSearch}>Go</Button>
    {
      loading?(<ChatLoading/>):(
        searchResult.map((user)=>
        {
           return <UserListItem key={user._id} user={user}/>
        })
      )
    }
  </DrawerBody>
</DrawerContent>
</Drawer>

</>
  )
}

export default SideDrawer
