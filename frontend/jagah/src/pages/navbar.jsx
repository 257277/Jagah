import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './navbar.module.css';
import { useDisclosure } from '@chakra-ui/react';
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  Input,
  Box,
  Flex,
} from '@chakra-ui/react';

export default function Navbar() {
  const [name, setName] = useState('');
  const [id, setId] = useState('');
  const [token, setToken] = useState('');

  useEffect(() => {
    // Check if there's a token in sessionStorage
    const storedToken = JSON.parse(sessionStorage.getItem('token'));
    if (storedToken) {
      setName(JSON.parse(sessionStorage.getItem('name')));
      setId(JSON.parse(sessionStorage.getItem('id')));
      setToken(storedToken);
    }
  }, []);

  // Function to handle logout
  const handleLogout = () => {
    // Clear sessionStorage
    sessionStorage.clear();
    // Reset the state values
    setName('');
    setId('');
    setToken('');
    // Navigate to the home page after logout
    navigate("/");
  };

  // Use the useNavigate hook to get the navigate function
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();
  const [msg, setmsg] = useState('');
  const [list, setlist] = useState("");

 async function showAddress() {
    let obj={address:msg}
    console.log(obj)
    const url = `http://127.0.0.1:5002/chatbot`;
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body:JSON.stringify(obj)
    };
    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            alert('Request failed ');
          }
      
        const result = await response.json();
        setlist(result.list[1])
      } catch (error) {
        alert(error);
      }
  }
  return (
    <div className={styles.navbar}>
      <Link to="/">
        <img src={require('../image/logo.png')} alt="Company Logo" className={styles.imge} />
      </Link>
      <Link to="/hotel" className={styles.link}>
        <h4 className={styles.mystery}>Hotels</h4>
      </Link>
      <h4 className={styles.history}>
        <Link to="/property" className={styles.link}>
          Properties
        </Link>
      </h4>
      <h4 className={styles.technology}>
        <Link to="/booking" className={styles.link}>
          Hotel Bookings
        </Link>
      </h4>
      {token ? (
        <h4 className={styles.technology} onClick={handleLogout}>
          Logout
        </h4>
      ) : (
        <h4 className={styles.technology}>
          <Link to="/login" className={styles.link}>
            Login/Signup
          </Link>
        </h4>
      )}
       <div>
      <Button ref={btnRef} colorScheme='teal' onClick={onOpen}>
        Atithi Guide
      </Button>
      <Drawer isOpen={isOpen} placement='right' onClose={onClose} finalFocusRef={btnRef}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>
            Hello there! I am here to  guide you to tourist places. Please enter your Address.
          </DrawerHeader>

          <DrawerBody>
            <Input
              placeholder='Type here...'
              onChange={(e) => {
                setmsg(e.target.value);
              }}
            />
          </DrawerBody>
          <Box
            height="55%" // Set the fixed height of the container
            overflowY="scroll" // Enable vertical scrolling for overflowed content
            border="1px solid #ccc" // Optional: Add a border for better visualization
          >
            <Flex direction="column" p="4">
              {/* You can also use VStack instead of Flex */}
              <Box className={styles.box1} >
              Your Address : {msg}{/* Replace this with the actual content of your messages */}
              </Box>
              <Box className={styles.box2} marginTop={"10px"}>
               {list}
              </Box>
              {/* Add more messages as needed */}
            </Flex>
          </Box>
          <DrawerFooter>
            <Button variant='outline' mr={3} onClick={onClose}>
              Close me!
            </Button>
            <Button colorScheme='blue' onClick={showAddress}>
              Send
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
    </div>
  );
}
