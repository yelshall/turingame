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
        Ask your 3 questions
      </Heading>
      <Card>
        <Card>
          <CardBody>
            <FormLabel>Question 1:</FormLabel>
            <FormControl pb='8px'>
              <Input
                value={question1}
                onChange={(event) => setAnswer1(event.target.value)}
                placeholder='Type your question'
                w='800px'
                type='question1'
              />
            </FormControl>
          </CardBody>
        </Card>
        <Divider color={'#2B6CB0'} />
        <Card>
          <CardBody>
            <FormControl pb='8px'>
              <FormLabel>Question 2</FormLabel>
              <Input
                value={question2}
                onChange={(event) => setAnswer2(event.target.value)}
                placeholder='Type your question'
                w='800px'
                type='question2'
              />
            </FormControl>
          </CardBody>
        </Card>
        <Divider color={'#2B6CB0'} />
        <Card>
          <CardBody>
            <FormControl pb='8px'>
              <FormLabel>Question 3</FormLabel>
              <Input
                value={question3}
                onChange={(event) => setAnswer3(event.target.value)}
                placeholder='Type your question'
                w='800px'
                type='question3'
              />
            </FormControl>
          </CardBody>
        </Card>
        <Divider color={'#2B6CB0'} />
        <Button variant='ghost' colorScheme='blue' color={'#2B6CB0'}>
          Submit your questions
        </Button>
      </Card>
    </Box>
  );
}
