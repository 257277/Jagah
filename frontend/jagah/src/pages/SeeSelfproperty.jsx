import React, { useEffect, useState } from 'react';

import { Divider, Center, Text, Card, CardBody, Stack, Heading,  Image, CardFooter, Button, SimpleGrid } from '@chakra-ui/react';
import Navbar from "../pages/navbar";
import Footer from "../pages/footer";
import styles from "../pages/hotel.module.css";

export default function SeeSelfproperty() {
    async function DeleteProperty(item) {
        
        const url = `${process.env.REACT_APP_BASEURL}/DeleteProperty?propertyId=${item}`;
        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            if (!response.ok) {
                alert('Request failed ');
            }
            const result = await response.json();
            alert(result.message);
            
        }
        catch (error) {
            alert(error);
        }


    }
    const [arr, setarr] = useState([])

    useEffect(() => {
        async function fetchData() {
            if(JSON.parse(sessionStorage.getItem("token"))==undefined)
            {
                alert("Please Login First")
            }
            else{
            try {
                let userId = JSON.parse(sessionStorage.getItem('id'));
                let response = await fetch(`${process.env.REACT_APP_BASEURL}/selfProperty?userId=${userId}`, {
                    method: "GET",
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                if (!response.ok) {
                    throw new Error("Request failed");
                }
                const result = await response.json();

                // Check if result.message is a string and parse it if necessary
                let dt = typeof result.message === "string" ? JSON.parse(result.message) : result.message;
               
                let data = dt.map((item) => (
                    <Card key={item._id} maxW='sm'>
                        <CardBody className={styles.cardbody}>
                            <Image
                                src={item.image}
                                alt='Hotel'
                                borderRadius='lg' className={styles.pht}
                            />
                            <Stack mt='6' spacing='3'>
                                <Heading size='md'>{item.name}</Heading>
                                <Text> No. of beds: {item.bed}</Text>
                                <Text> No. of bathrooms: {item.bathroom}</Text>
                                <Text>Adress: {item.address}</Text>
                             
                                    <Text color='green.600' fontSize='2xl'>Price: ${item.price}</Text>
                               
                                <Text color='green.600' fontSize='2xl'>Status: {item.status}</Text>
                            </Stack>
                        </CardBody>

                        <CardFooter>
                            <Button variant='solid' colorScheme='green' onClick={() => {
                                DeleteProperty(item._id.$oid);
                            }} marginLeft={"20%"} marginTop={"20px"}>
                                Delete Property
                            </Button>
                        </CardFooter>
                    </Card>

                ));

                setarr(data);
            } catch (error) {
                console.error(error);
                console.log("Error occurred while fetching data");
            }
        }
    }

        fetchData();
    }, []);

    return (
        <div>
            <Navbar />
            <Center height='100px'>
                <Divider />
            </Center>

            <SimpleGrid spacing={4} templateColumns='repeat(auto-fill, minmax(300px, 1fr))'>
                {arr}
            </SimpleGrid>

            <Center height='100px'>
                <Divider />
            </Center>
            <Footer />
        </div>
    );
}
