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
  const [answer1, setAnswer1] = useState('');
  const [answer2, setAnswer2] = useState('');
  const [answer3, setAnswer3] = useState('');

  useEffect(() => {
    console.log(answer1, answer2, answer3);
  }, [answer1, answer2, answer3]);

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
        Answer these questions
      </Heading>
      <Card>
        <Card>
          <CardBody>
            <FormLabel>Question 1:</FormLabel>
            <Text py='2'>
              Caffè latte is a coffee beverage of Italian origin made with
              espresso and steamed milk.
            </Text>
            <FormControl pb='8px'>
              <Input
                value={answer1}
                onChange={(event) => setAnswer1(event.target.value)}
                placeholder='Type your answer to q1'
                w='800px'
                type='answer1'
              />
            </FormControl>
          </CardBody>
        </Card>
        <Divider color={'#2B6CB0'} />
        <Card>
          <CardBody>
            <FormControl pb='8px'>
              <FormLabel>Question 2</FormLabel>
              <Text py='2'>
                Caffè latte is a coffee beverage of Italian origin made with
                espresso and steamed milk.
              </Text>
              <Input
                value={answer2}
                onChange={(event) => setAnswer2(event.target.value)}
                placeholder='Type your answer to q2'
                w='800px'
                type='answer2'
              />
            </FormControl>
          </CardBody>
        </Card>
        <Divider color={'#2B6CB0'} />
        <Card>
          <CardBody>
            <FormControl pb='8px'>
              <FormLabel>Question 3</FormLabel>
              <Text py='2'>
                Caffè latte is a coffee beverage of Italian origin made with
                espresso and steamed milk.
              </Text>
              <Input
                value={answer3}
                onChange={(event) => setAnswer3(event.target.value)}
                placeholder='Type your answer to q3'
                w='800px'
                type='answer3'
              />
            </FormControl>
          </CardBody>
        </Card>
        <Divider color={'#2B6CB0'} />
        <Button variant='ghost' colorScheme='blue' color={'#2B6CB0'}>
          Submit your responses
        </Button>
      </Card>
    </Box>
  );
}
