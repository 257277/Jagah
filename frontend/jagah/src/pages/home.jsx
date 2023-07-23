import React from 'react'
import styles from "../pages/home.module.css"
import { Flex, Spacer, Box, Divider, Center } from '@chakra-ui/react'
import Navbar from "../pages/navbar"
import Footer from "../pages/footer"
import { Link } from 'react-router-dom'
// import SectionPage from './SectionPage'
export default function Home() {

    return (
        <div>
            <Navbar></Navbar>
            <Center height='100px'>
                <Divider />
            </Center>
            <Flex direction={{ base: 'column', md: 'column',lg:"row" }} alignItems={"center"}>
                <Spacer />
               <Link to="/hotel"> <Box w='500px' h="300px" className={styles.box1}>
                    <h1>Hotels</h1>
                </Box></Link>

                <Spacer />
                <Link to="/property"><Box w='500px' h="300px" className={styles.box2}>
                    <h1>Properties</h1>
                </Box></Link>
                <Spacer />

            </Flex>
            <Center height='100px'>
                <Divider />
            </Center>
            <Footer></Footer>
            


        </div>
    )
}
