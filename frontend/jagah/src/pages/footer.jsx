import React from 'react'
import { Flex, Spacer, Box, Divider, Center, Container,  ListItem, UnorderedList } from '@chakra-ui/react'


export default function Footer()
{
    return (
        <div>
            <Container maxW='100%' minH="400px" bg="lightgreen" centerContent fontSize="17px">
                <Flex direction={{ base: 'column', md: 'column',lg:"row" }}>
                    <Spacer />
                    <Box w="500px"  paddingTop="50px">
                        <UnorderedList listStyleType="none" >
                            <ListItem fontWeight="bold" paddingTop="15px">Support</ListItem>
                            <ListItem paddingTop="15px">Help Centre</ListItem>
                            <ListItem paddingTop="15px">Supporting people with disabilities</ListItem>
                            <ListItem paddingTop="15px">Cancellation options</ListItem>
                            <ListItem paddingTop="15px">Report a neighbourhood concern</ListItem>
                        </UnorderedList>
                    </Box>
                    <Center paddingTop="50px">
                        <Divider orientation='vertical' />
                    </Center>
                    <Spacer />
                    <Box w="500px" paddingTop="50px">
                        <UnorderedList listStyleType="none" paddingTop="15px">
                            <ListItem fontWeight="bold" paddingTop="15px">Community</ListItem>
                            <ListItem paddingTop="15px">Atithi.org: disaster relief housing</ListItem>
                            <ListItem paddingTop="15px">Combating discrimination</ListItem>
                           
                        </UnorderedList>
                    </Box>
                    <Spacer />
                    <Center paddingTop="50px">
                        <Divider orientation='vertical' />
                    </Center>
                    <Box w="500px" paddingTop="50px">
                        <UnorderedList listStyleType="none" >
                            <ListItem fontWeight="bold" paddingTop="15px">Hosting</ListItem>
                            <ListItem paddingTop="15px">Atithi your home</ListItem>
                            <ListItem paddingTop="15px">AirCover for Hosts</ListItem>
                            <ListItem paddingTop="15px">Explore hosting resources</ListItem>
                            <ListItem paddingTop="15px">Visit our community forum</ListItem>
                            <ListItem paddingTop="15px">How to host responsibly</ListItem>
                        </UnorderedList>
                    </Box>
                    <Spacer />

                </Flex>

            </Container>
        </div>
    )
}






