import React, { useState } from 'react';
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';
import { Input, InputGroup, InputRightElement, Button, Divider, Center, Stack } from '@chakra-ui/react';
import Styles from "../pages/login-signup.module.css";
import Navbar from "../pages/navbar";
import Footer from "../pages/footer";
import { useNavigate } from "react-router-dom";

export default function LoginSignup() {
  const navigate = useNavigate();
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [registerName, setRegisterName] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPhone, setRegisterPhone] = useState('');
  const [registerAddress, setRegisterAddress] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');

  async function handleLogin() {
    const loginData = {
      email: loginEmail,
      password: loginPassword
    };
    try{
      const res = await fetch(`${process.env.REACT_APP_BASEURL}/login`, {
        method: "POST",
        body: JSON.stringify(loginData),
        headers: {
          "Content-Type": "application/json"
        }
      });
  
      if (res.ok) {
        const data = await res.json();
      
       let id=data.id;
       let token=data.token;
       let name=data.name;
       sessionStorage.setItem("id",JSON.stringify(id));
       sessionStorage.setItem("token",JSON.stringify(token));
       sessionStorage.setItem("name",JSON.stringify(name));
        alert( data.message);
        navigate("/");

      } else {
        const errorData = await res.json();
        alert(errorData);
      }
    }
    catch(error)
    {
      let e=await error.json();
      alert( e);
    }
  }

 async function handleRegister() {
    
    const registerData = {
      name: registerName,
      email: registerEmail,
      phone: registerPhone,
      address: registerAddress,
      password: registerPassword
    };
   
    try {
      const res = await fetch(`${process.env.REACT_APP_BASEURL}/register`, {
        method: "POST",
        body: JSON.stringify(registerData),
        headers: {
          "Content-Type": "application/json"
        }
      });
  
      if (res.ok) {
        const data = await res.json();
       
        alert( data.message);
      } else {
        const errorData = await res.json();
        alert(errorData);
      }
    } catch (error) {
      let e=await error.json();
      alert( e);
    }
  
    
  }

  return (
    <div>
      <Navbar />
      <Center height='100px'>
        <Divider />
      </Center>
      <div className={Styles.container}>
        <Tabs variant='soft-rounded' colorScheme='green'>
          <TabList>
            <Tab>LogIn</Tab>
            <Tab>SignUp</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <form>
                <Stack spacing={4}>
                  <Input placeholder='Enter Email' size='lg' value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)}     fontSize={{base:"12px",md:"20px"}}/>
                  {PasswordInput(loginPassword, setLoginPassword)}
                  <Button colorScheme='green' size='lg' onClick={handleLogin}>Login</Button>
                </Stack>
              </form>
            </TabPanel>
            <TabPanel>
              <form>
                <Stack spacing={4}>
                  <Input placeholder='Enter Name' size='lg' value={registerName} onChange={(e) => setRegisterName(e.target.value)}    fontSize={{base:"12px",md:"20px"}} />
                  <Input placeholder='Enter Email' size='lg' value={registerEmail} onChange={(e) => setRegisterEmail(e.target.value)}    fontSize={{base:"12px",md:"20px"}} />
                  {PasswordInput(registerPassword, setRegisterPassword)}
                  <Input placeholder='Enter Phone Number' type="number" size='lg' value={registerPhone} onChange={(e) => setRegisterPhone(e.target.value)}   fontSize={{base:"12px",md:"20px"}} />
                  <Input placeholder='Enter Address' size='lg' value={registerAddress} onChange={(e) => setRegisterAddress(e.target.value)}     fontSize={{base:"12px",md:"20px"}}/>
                  <Button colorScheme='green' size='lg' onClick={handleRegister}>Signup</Button>
                </Stack>
              </form>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </div>
      <Center height='100px'>
        <Divider />
      </Center>
      <Footer />
    </div>
  );
}

function PasswordInput(value, setValue) {
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);

  return (
    <InputGroup size='md'>
      <Input
        pr='4.5rem'
        type={show ? 'text' : 'password'}
        placeholder='Enter password'
        value={value}
        onChange={(e) => setValue(e.target.value)}
        fontSize={{base:"12px",md:"20px"}}
      />
      <InputRightElement width='4.5rem'>
        <Button h='1.75rem' size='sm' onClick={handleClick}>
          {show ? 'Hide' : 'Show'}
        </Button>
      </InputRightElement>
    </InputGroup>
  );
}
