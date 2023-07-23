import React, { useEffect, useState } from 'react';
import Navbar from "../pages/navbar";
import Footer from "../pages/footer";
import { Divider, Center, Input, FormControl, FormLabel, Flex, Button, CardFooter, Text, Heading, Card, CardBody, SimpleGrid, ButtonGroup, Stack, Image, Select } from '@chakra-ui/react';
import styles from "../pages/hotel.module.css";


function Hotel() {
 
   async function booking(item)
   {
    let token=JSON.parse(sessionStorage.getItem("token"));
    if(token==undefined)
    {
      alert("Please login first");
    }
    else{
    let obj={name:item.name,image:item.images[0],beds:item.beds,bathroom:item.bathrooms,price:item.price,rating:item.rating,userid:JSON.parse(localStorage.getItem("id")),address:item.address}
    const url = `${process.env.REACT_APP_BASEURL}/bookHotel`;
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
  const [Checkin, setCheckin] = useState("");
  const [Checkout, setCheckout] = useState("");
  const [Adults, setAdults] = useState(0);
  const [Hotels, setHotels] = useState([]);
//   const [sort,setsort]=useState("");

  async function handleSrch() {
    let obj = { location: Place, checkin: Checkin, checkout: Checkout, adults: Adults };
    console.log(obj);
    let arr=[];
    const url = `https://airbnb13.p.rapidapi.com/search-location?location=${Place}&checkin=${Checkin}&checkout=${Checkout}&adults=${Adults}`;
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': `${process.env.REACT_APP_hotel_RapidAPI_Key}`,
        'X-RapidAPI-Host': 'airbnb13.p.rapidapi.com'
      }
    };

    try {
      const response = await fetch(url, options);
      const result = await response.json();
      let hot=result.results;
       arr = hot.map((item) => (
        <Card key={item._id} maxW='sm'>
          <CardBody className={styles.cardbody}>
            <Image
              src={item.images[0]}
              alt='Hotel'
              borderRadius='lg' className={styles.pht}
            />
            <Stack mt='6' spacing='3'>
              <Heading size='md'>{item.name}</Heading>
                <Text> No. of beds: {item.beds}</Text>
               <Text> No. of bathrooms: {item.bathrooms}</Text>
               <Text>Adress: {item.address}</Text>
             <Flex justifyContent={"space-between"}>
              <Text color='green.600' fontSize='2xl'>Price: ${item.price.total}</Text>
              <Text color='green.600' fontSize='2xl'>Rating: {item.rating}</Text>
              </Flex>
            </Stack>
          </CardBody>
          <Center height='50px'>
        <Divider />
      </Center>
          <CardFooter>
            <Button variant='solid' colorScheme='green' onClick={()=>
            {
               booking(item);
            }}>
              Book now
            </Button>
          </CardFooter>
        </Card>

      ));
      setHotels(arr)
      
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      <Navbar />
      <Heading color={"green"} marginTop={"50px"}>Hotels</Heading>
      <Center height='100px'>
        <Divider />
      </Center>
     
      <div className={styles.srch}>
        <Flex justifyContent="space-around" alignItems="center" direction={{ base: 'column', md: 'column',lg:"row" }}  >
          <FormControl isRequired  w={{base:"80%",md:"80%",lg:"17%"}}>
            <FormLabel>Hotel Location</FormLabel>
            <Input placeholder='Enter Hotel Location' onChange={(e) => setPlace(e.target.value)} />
          </FormControl>
          <FormControl isRequired w={{base:"80%",md:"80%",lg:"17%"}}>
            <FormLabel>CheckIn</FormLabel>
            <Input placeholder="Checkin Date and Time" size="md" type="date" onChange={(e) => setCheckin(e.target.value)} />
          </FormControl>
          <FormControl isRequired w={{base:"80%",md:"80%",lg:"17%"}}>
            <FormLabel>CheckOut</FormLabel>
            <Input placeholder="Checkout Date and Time" size="md" type="date" onChange={(e) => setCheckout(e.target.value)} />
          </FormControl>
          <FormControl isRequired w={{base:"80%",md:"80%",lg:"17%"}}>
            <FormLabel>Number of Adults</FormLabel>
            <Input placeholder='Number of Adults' type="number" onChange={(e) => setAdults(e.target.value)} />
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

export default Hotel;
