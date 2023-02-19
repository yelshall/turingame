'use client';

import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
  Spinner,
} from '@chakra-ui/react';
import { useState } from 'react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { Center } from '@chakra-ui/react';

export default function Page() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.900')}
    >
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Spinner
            thickness='10px'
            speed='0.8s'
            emptyColor='gray.200'
            color='blue.500'
            size='xl'
            variant='bold'
            w={24}
            h={24}
          />
          <Heading fontSize={'4xl'} textAlign={'center'}>
            Waiting in queue
          </Heading>
          <Text fontSize={'lg'} color={'gray.600'}>
            to join a match ✌️
          </Text>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}
        >
          <Stack spacing={4}>
            <Button w={'full'} maxW={'md'} variant={'outline'}>
              <Center>
                <Text>Finding another player</Text>
              </Center>
            </Button>
            <Button w={'full'} maxW={'md'} variant={'outline'}>
              <Center>
                <Text>Waiting for opponent guesses</Text>
              </Center>
            </Button>
            <Button w={'full'} maxW={'md'} variant={'outline'}>
              <Center>
                <Text>Waiting for opponent responses</Text>
              </Center>
            </Button>
            <Stack pt={6}>
              <Text align={'center'}>
                Back to homepage? <Link color={'blue.400'}>Homepage</Link>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
