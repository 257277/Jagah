import React, { useState } from 'react';
import {
  Input,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Button,
  Divider,
  Center,
  Stack
} from '@chakra-ui/react';
import Navbar from '../pages/navbar';
import Footer from '../pages/footer';

import styles from '../pages/addProperty.module.css';

function AddProperty() {
  const [propertyImage, setPropertyImage] = useState('');
  const [propertyName, setPropertyName] = useState('');
  const [beds, setBeds] = useState();
  const [bathroom, setBathroom] = useState();
  const [propertyAddress, setPropertyAddress] = useState('');
  const [propertyPrice, setPropertyPrice] = useState();

  async function addingProperty()
  {
    if(JSON.parse(sessionStorage.getItem("token"))==undefined)
    {
      alert("Please login first!")
    }
    else{
    const propertyDetail={"image":propertyImage,"name":propertyName,"bathroom":bathroom,"bed":beds,"address":propertyAddress,"price":propertyPrice,"userId":JSON.parse(sessionStorage.getItem("id"))}
    try {
        const res = await fetch(`${process.env.REACT_APP_BASEURL}/addproperty`, {
          method: "POST",
          body: JSON.stringify(propertyDetail),
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
}

  return (
    <div>
      <Navbar />
      <Center height='100px'>
        <Divider />
      </Center>
      <div className={styles.container}>
        <Tabs variant='soft-rounded' colorScheme='green'>
          <TabList>
            <Tab>Add Property Details</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <form>
                <Stack spacing={4}>
                  <Input
                    placeholder='Enter Property image url'
                    size='lg'
                    value={propertyImage}
                    onChange={(e) => setPropertyImage(e.target.value)}
                    fontSize={{base:"12px",md:"20px"}}
                 />
                  <Input
                    placeholder='Enter Property Name'
                    size='lg'
                    value={propertyName}
                    onChange={(e) => setPropertyName(e.target.value)}
                    fontSize={{base:"12px",md:"20px"}}
                  />
                  <Input
                    placeholder='Enter Number Of Beds'
                    size='lg'
                    value={beds}
                    onChange={(e) => setBeds(e.target.value)}
                    fontSize={{base:"12px",md:"20px"}}
                    type='number'
                  />
                  <Input
                    placeholder='Enter Number of Bathrooms'
                    size='lg'
                    value={bathroom}
                    onChange={(e) => setBathroom(e.target.value)}
                    fontSize={{base:"12px",md:"20px"}}
                    type='number'
                  />
                  <Input
                    placeholder='Enter Property Address'
                    size='lg'
                    value={propertyAddress}
                    onChange={(e) => setPropertyAddress(e.target.value)}
                    fontSize={{base:"12px",md:"20px"}}
                  />
                  <Input
                    placeholder='Enter Property Price'
                    size='lg'
                    value={propertyPrice}
                    onChange={(e) => setPropertyPrice(e.target.value)}
                    fontSize={{base:"12px",md:"20px"}}
                  />
                  <Button colorScheme='green' size='lg' onClick={addingProperty}>
                    Add Property
                  </Button>
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

export default AddProperty;
