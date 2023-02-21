'use client';

import {
	Button,
	Heading,
	Box,
	Stack,
	Input
} from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const QuestionItem = ({ text, onChange }) => {
	return (
		<Box
			display='flex'
			flexDir={'column'}
			w='100%'
			pb="16px"
		>
			<Heading fontSize={"2xl"} alignSelf={"flex-start"} pb="16px">{text}</Heading>
			<Input
				placeholder={"Type your question..."}
				onChange={onChange}
				w='500px'
			/>
		</Box>
	)
};

export default function Page() {
	const router = useRouter();

	const [question1, setQuestion1] = useState('');
	const [question2, setQuestion2] = useState('');
	const [question3, setQuestion3] = useState('');

	const questions = [
		{ text: "Question 1", setQuestion: setQuestion1 },
		{ text: "Question 2", setQuestion: setQuestion2 },
		{ text: "Question 3", setQuestion: setQuestion3 },
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
				Ask your 3 questions
			</Heading>
			<Stack>
				{questions.map((question) => (
					<QuestionItem text={question.text} onChange={(event) => { question.setQuestion(event.target.value) }} />
				))}
				<Button bg='#2A4365' onClick={() => { router.push('/answer') }}>Submit</Button>
			</Stack>
		</Box>
	);
}
