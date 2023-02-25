'use client';

import {
	Button,
	Heading,
	Box,
	Input
} from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useStateContext } from '../../../context/userAuthFunctions';
import { db } from '../../../firebase/config';
import { getDoc, doc, setDoc, updateDoc } from 'firebase/firestore';
import Swal from "sweetalert2";
import { openai, openai_interact } from '../../../ai_models/ai_models';


const QuestionItem = ({ text, onChange }) => {
	return (
		<Box
			display='flex'
			flexDir={'column'}
			w='100%'
			pb="16px"
			justifyContent={"center"}
			alignItems={"center"}
		>
			<Heading fontSize={"2xl"} alignSelf={"flex-start"} pb="16px">{text}</Heading>
			<Input
				placeholder={"Type your question..."}
				onChange={onChange}
				w='100%'
			/>
		</Box>
	)
};

// a function to strip the url to get the roomID

function stripURL(url) {
	const index = url.indexOf("room") + 5;
	const strippedURL = url.substring(index);
	return strippedURL;
}

function parseQuestions(input) {
	const questions = input.split('\n').map((question) => question.trim().replace(/^\d+\.\s+/, ''));
	const result = {};
  
	for (let i = 2; i < questions.length; i++) {
	  result[`q${i - 1}`] = questions[i];
	}
  
	return result;
}


const send_questions = async (roomID, questions, id, email) => {
	// update second user state to active
	console.log(roomID)
	const docRef = doc(db, "chatRooms", roomID);
	const docData = await getDoc(docRef)
	console.log(docData.data().asked);
	if (docData.data().asked) {
		const _update = await updateDoc(docRef, { [`questions_${id}`]: questions, [`asked_${id}`]: email, asked: docData.data().asked + 1 });
		if (docData.data().second_user == "Open Ai") {
		
			let ai_questions = await openai_interact(`write me three generic questions about life`, 0);
			const q_ai = parseQuestions(ai_questions);
	
			const res = [
				{ sender: "Open Ai" },
				{ text: "Question 1", value: q_ai.q1 },
				{ text: "Question 2", value: q_ai.q2 },
				{ text: "Question 3", value: q_ai.q3 },
			]
	
			const _update = await updateDoc(docRef, { [`questions_OpenAi`]: res, [`asked_OpenAi`]: "Open Ai", asked: docData.data().asked + 2 });
	
		}
	} else {
		if (docData.data().second_user == "Open Ai") {
		
			let ai_questions = await openai_interact(`write me three generic questions about life`, 0);
			const q_ai = parseQuestions(ai_questions);
	
			const res = [
				{ sender: "Open Ai" },
				{ text: "Question 1", value: q_ai.q1 },
				{ text: "Question 2", value: q_ai.q2 },
				{ text: "Question 3", value: q_ai.q3 },
			]
	
			const _update = await updateDoc(docRef, { [`questions_OpenAi`]: res, [`asked_OpenAi`]: "Open Ai", asked: 1 });
	
		}
		const _update = await updateDoc(docRef, { [`questions_${id}`]: questions, [`asked_${id}`]: email, asked: 2 });
	}

	
}

const getAsked = async (roomID) => {
	const docRef = doc(db, "chatRooms", roomID);
	const docData = await getDoc(docRef)
	console.log(docData.data().asked);
	if (docData.data().asked) {
		return docData.data().asked;
	} else {
		return 0;
	}
}

export default function Page() {

	const router = useRouter();
	const roomID = stripURL(window.location.href);

	const { user } = useStateContext();
	const [question1, setQuestion1] = useState('');
	const [question2, setQuestion2] = useState('');
	const [question3, setQuestion3] = useState('');
	const [sender, setSender] = useState(user.email);


	async function checkAndUpdate() {
		let asked = await getAsked(roomID);
		const interval = setInterval(async () => {
			asked = await getAsked(roomID);
			console.log(asked)
			if (asked >= 2) {
				Swal.close()
				clearInterval(interval);
				router.push(`/answer?room=${roomID}`)
			}
		}, 5000);

		
		Swal.fire({
				title: 'Please Wait...',
				text: "Waiting for other user to submit questions",
				icon: 'info',
				showCancelButton: false,
				showConfirmButton: false,
				showDenyButton: false,
				showLoaderOnConfirm: true,
				allowEscapeKey: false,
				allowOutsideClick: false,				
		})
		
	}

	const handleSubmit = async () => {
		setSender(user.email)
		const res = [
			{ sender: user.email },
			{ text: "Question 1", value: question1 },
			{ text: "Question 2", value: question2 },
			{ text: "Question 3", value: question3 },
		]
		console.log(user);
		console.log(res)
		try {
			await send_questions(roomID, res, user.uid, user.email);
			//setQuestionsSent(true);
			//console.log(await getAsked(roomID))
			checkAndUpdate()

		} catch (err) {
			console.log(err);
		}
	}

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
			{questions.map((question) => (
				<QuestionItem text={question.text} onChange={(event) => { question.setQuestion(event.target.value) }} />
			))}
			<Button w="500px" bg='#2A4365' onClick={() => { handleSubmit()}}>Submit</Button>
		</Box>
	);
}
