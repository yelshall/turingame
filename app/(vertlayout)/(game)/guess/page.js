'use client';

import {
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Heading,
  Text,
  Divider,
  Box,
  InputRightElement,
  InputGroup,
  CardBody,
  Card,
  CardHeader,
  CardFooter,
} from '@chakra-ui/react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Page() {
  const [question1, setAnswer1] = useState('');
  const [question2, setAnswer2] = useState('');
  const [question3, setAnswer3] = useState('');

  useEffect(() => {
    console.log(question1, question2, question3);
  }, [question1, question2, question3]);

  return (
    <Box
      display='flex'
      flexDir={'column'}
      w='100%'
      h='100%'
      justifyContent='center'
      alignItems={'center'}
    >
      <Heading fontSize={'4xl'} pb='16px'>
        Man or Manlike?
      </Heading>
      <Card w='800px' border='solid' color={'#2B6CB0'}>
        <Card>
          <CardBody>
            <FormLabel>Question 1:</FormLabel>
            <Text> This is answer 1</Text>
          </CardBody>
        </Card>
        <Divider color={'#2B6CB0'} />
        <Card>
          <CardBody>
            <FormControl pb='8px'>
              <FormLabel>Question 2</FormLabel>
              <Text> This is answer 2</Text>
            </FormControl>
          </CardBody>
        </Card>
        <Divider color={'#2B6CB0'} />
        <Card>
          <CardBody>
            <FormControl pb='8px'>
              <FormLabel>Question 3</FormLabel>
              <Text> This is answer 3</Text>
            </FormControl>
          </CardBody>
        </Card>
      </Card>
      <Stack
        direction='row'
        spacing='0.5'
        align='center'
        border={'1.5px solid transparent'}
      >
        <Button
          w='400px'
          size='lg'
          height='48px'
          variant='solid'
          color={'#2B6CB0'}
          border='solid'
        >
          Man
        </Button>
        <Button
          w='400px'
          size='lg'
          height='48px'
          variant='ghost'
          color={'#2B6CB0'}
          border='solid'
        >
          Manlike
        </Button>
      </Stack>
    </Box>
  );
}
