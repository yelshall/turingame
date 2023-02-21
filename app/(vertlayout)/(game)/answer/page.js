'use client';

import {
	Input,
	Button,
	Heading,
	Text,
	Box,
	Stack
} from '@chakra-ui/react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const AnswerItem = ({ text, question, onChange }) => {
	return (
		<Box
			display='flex'
			flexDir={'column'}
			w='100%'
			pb="16px"
			justifyContent={"center"}
			alignItems={"center"}
		>
			<Heading fontSize={"2xl"} alignSelf={"flex-start"} pb="8px">{text}</Heading>
			<Text alignSelf={"flex-start"} pb="4px">{question}</Text>
			<Input
				placeholder={"Type your answer..."}
				onChange={onChange}
				w='100%'
			/>
		</Box>
	)
};

export default function Page() {
	const router = useRouter();

	const [answer1, setAnswer1] = useState('');
	const [answer2, setAnswer2] = useState('');
	const [answer3, setAnswer3] = useState('');

	const answers = [
		{ text: "Answer question 1", setAnswer: setAnswer1 },
		{ text: "Answer question 1", setAnswer: setAnswer2 },
		{ text: "Answer question 1", setAnswer: setAnswer3 },
	]
	const questions = [
		"question 1?",
		"question 2?",
		"question 3?"
	]

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
				Answer the 3 questions
			</Heading>
			{answers.map((answer, index) => (
				<AnswerItem
					text={answer.text}
					question={questions[index]}
					onChange={(event) => { answer.setAnswer(event.target.value) }}
				/>
			))}
			<Button w="500px" bg='#2A4365' onClick={() => { router.push('/view') }}>Submit</Button>
		</Box>
	);
}
