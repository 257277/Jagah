import React, { useEffect, useState } from 'react';
import Navbar from "../pages/navbar";
import Footer from "../pages/footer";
import { Divider, Center, Input, FormControl, FormLabel, Flex, Button, CardFooter, Text, CardHeader, Heading, Card, CardBody, SimpleGrid, ButtonGroup, Stack, Image, Select } from '@chakra-ui/react';
import styles from "../pages/hotel.module.css";
import { Link } from 'react-router-dom'

function Property() {
 
   async function buyNow(item)
   {
    let token=JSON.parse(sessionStorage.getItem("token"));
    if(token==undefined)
    {
      alert("Please login first");
    }
    else{
    let obj={image:item.photos[0].href,name:item.branding[0].name,bed:item.description.beds,bathroom:item.description.baths,price:item.list_price,address:`${item.location.address.line} ${item.location.address.city} ${item.location.address.state}`,userid:JSON.parse(localStorage.getItem("id"))}
    const url = `${process.env.REACT_APP_BASEURL}/buyProperty`;
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
        alert(result.message);
      } catch (error) {
        alert(error);
      }
   }
  }

  const [Place, setPlace] = useState("");

  const [Hotels, setHotels] = useState([]);


  async function handleSrch() {
    let arr=[];
    let url = `https://realtor16.p.rapidapi.com/forsale?location=${Place}`;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': `${process.env.REACT_APP_property_rapidAPI_Key}`,
            'X-RapidAPI-Host': 'realtor16.p.rapidapi.com'
        }
    };
    try {
      const response = await fetch(url, options);
      const result = await response.json();
      let hot=result.home_search.results;
         console.log(hot)
       arr = hot.map((item) => (
        
        <Card key={item.property_id} maxW='sm'>
          <CardBody className={styles.cardbody}>
            <Image
              src={item.photos[0].href}
              alt='Hotel'
              borderRadius='lg' className={styles.pht}
            />
            <Stack mt='6' spacing='3'>
              <Heading size='md'>{item.branding[0].name}</Heading>
                <Text> No. of beds: {item.description.beds}</Text>
               <Text> No. of bathrooms: {item.description.baths}</Text>
               <Text>Adress: {item.location.address.line} {item.location.address.city} {item.location.address.state}</Text>
             {/* <Flex justifyContent={"space-between"}> */}
              <Text color='green.600' fontSize='2xl'>Listing Price: ${item.list_price}</Text>
              {/* <Text color='green.600' fontSize='2xl'>Agent: {item.source.agents[0].office_name}</Text> */}
              {/* </Flex> */}
            </Stack>
          </CardBody>
        
          <CardFooter >
            <Button variant='solid' colorScheme='green' onClick={()=>
            {
               buyNow(item);
            }} marginLeft={"35%"}>
              Buy now
            </Button>
          </CardFooter>
        </Card>

      ));
      setHotels(arr)
      
    } catch (error) {
      alert(error);
    }
  }

  return (
    <div>
      <Navbar />
      <Heading color={"green"} marginTop={"50px"}>Properties</Heading>
      <Flex justifyContent={"space-around"} direction={{ base: 'column', md: 'row',lg:"row" }}>
     <Link to="/addProperty"> <Heading color={"green"} marginTop={"50px"}>Add Property</Heading></Link>
      <Link to="/SeeSelfproperty"> <Heading color={"green"} marginTop={"50px"}>Your Property</Heading></Link>
      </Flex>
      <Center height='100px'>
        <Divider />
      </Center>
      <div className={styles.srch}>
        <Flex justifyContent="space-around" alignItems="center" direction={{ base: 'column', md: 'column',lg:"row" }}>
          <FormControl isRequired w={{base:"80%",md:"80%",lg:"25%"}}>
            <FormLabel>Property Location</FormLabel>
            <Input placeholder='Enter Property Location' onChange={(e) => setPlace(e.target.value)} />
          </FormControl>
        
          <Button colorScheme='teal' size='lg' marginTop="2%" onClick={handleSrch}>Search</Button>
      
        </Flex>
        <Center height='50px'>
          <Divider />
        </Center>
      </div>
      <div className={styles.hotels}>
        <SimpleGrid spacing={4} templateColumns='repeat(auto-fill, minmax(300px, 1fr))'>
          {Hotels}
        </SimpleGrid>
      </div>
      <Center height='100px'>
        <Divider />
      </Center>
      <Footer />
    </div>
  );
}

export default Property;
