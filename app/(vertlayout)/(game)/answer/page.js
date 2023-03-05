'use client';

import {
	Input,
	Button,
	Heading,
	Text,
	Box,
	Stack
} from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useStateContext } from '../../../context/userAuthFunctions';
import { db } from '../../../firebase/config';
import { getDoc, doc, setDoc, updateDoc } from 'firebase/firestore';
import Swal from "sweetalert2";
import { openai, openai_interact } from '../../../ai_models/ai_models';


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

function stripURL(url) {
	const index = url.indexOf("room") + 5;
	const strippedURL = url.substring(index);
	return strippedURL;
}

function parseQuestions(input) {
	const questions = input.split('\n').map((question) => question.trim().replace(/^\d+\.\s+/, ''));
	const result = {};
  
	for (let i = 1; i < questions.length; i++) {
	  result[`q${i - 1}`] = questions[i];
	}
	
	console.log(result)
  
	return result;
}


const send_answers = async (roomID, answers, id, email) => {
	// update second user state to active
	const docRef = doc(db, "chatRooms", roomID);
	const docData = await getDoc(docRef)
	console.log(docData.data().answered);
	console.log(docData.data()[`questions_${docData.data().first_id}`]);
	if (docData.data().answered) {
		const _update = await updateDoc(docRef, { [`answers_${id}`]: answers, [`answered_${id}`]: email, answered: docData.data().answered + 1 });
		if (docData.data().second_user == "Open Ai") {
			let qs = docData.data()[`questions_${docData.data().first_id}`];
			let ai_questions = await openai_interact(`answer the following three questions and number your answers:
			1. ${qs[1].value}
			2. ${qs[2].value}
			3. ${qs[3].value}
			`, 0);

			const q_ai = parseQuestions(ai_questions);
	
			const res = [
				{ sender: "Open Ai" },
				{ text: "Answer 1", value: q_ai.q0 },
				{ text: "Answer 2", value: q_ai.q1 },
				{ text: "Answer 3", value: q_ai.q2 },
			]
			const docData = await getDoc(docRef)

	
			const _update = await updateDoc(docRef, { [`answers_OpenAi`]: res, [`answered_OpenAi`]: "Open Ai", answered: docData.data().answered + 1 });
		}
	} else {
		console.log("I'm here")
		const _update = await updateDoc(docRef, { [`answers_${id}`]: answers, [`answered_${id}`]: email, answered: +1 });
		if (docData.data().second_user == "Open Ai") {
			let qs = docData.data()[`questions_${docData.data().first_id}`];
			let ai_questions = await openai_interact(`answer the following three questions and number your answers:
			1. ${qs[1].value}
			2. ${qs[2].value}
			3. ${qs[3].value}
			`, 0);

			const q_ai = parseQuestions(ai_questions);
	
			const res = [
				{ sender: "Open Ai" },
				{ text: "Answer 1", value: q_ai.q0 },
				{ text: "Answer 2", value: q_ai.q1 },
				{ text: "Answer 3", value: q_ai.q2 },
			]
	
			const _update = await updateDoc(docRef, { [`answers_OpenAi`]: res, [`answered_OpenAi`]: "Open Ai", answered: 2 });
		}
	}
}

const setup_questions = async(roomID, id, user) => {
	const docRef = doc(db, "chatRooms", roomID);
	const docData = await getDoc(docRef)
	if (user.uid == docData.data().first_id  && docData.data().second_user != "Open Ai") {
		// set up the questions for the second
		console.log(docData.data()[`questions_${docData.data().second_id}`]);
		const qs = docData.data()[`questions_${docData.data().second_id}`];
		console.log(qs[1].value)
		Swal.fire({text:`${qs[1].value} ${qs[2].value}, ${qs[3].value}`})
		return [qs[1].value, qs[2].value, qs[3].value];
	

	} else if (user.uid == docData.data().second_id) {
		// set up the questions for the first
		console.log(docData.data()[`questions_${docData.data().first_id}`]);
		const qs = docData.data()[`questions_${docData.data().first_id}`];
		console.log(qs[1].value)
		Swal.fire({text:`${qs[1].value} ${qs[2].value}, ${qs[3].value}`})
		return [qs[1].value, qs[2].value, qs[3].value];

	} else {
		// set up the question from ai
		console.log(docData.data()[`questions_OpenAi`]);
		const qs = docData.data()[`questions_OpenAi`];
		console.log(qs[1].value)
		Swal.fire({html:`Question 1: ${qs[1].value}<br> Question 2: ${qs[2].value}<br> Question3: ${qs[3].value}`})
		return [qs[1].value, qs[2].value, qs[3].value];

	}
}

const getAnswered = async (roomID) => {
	const docRef = doc(db, "chatRooms", roomID);
	const docData = await getDoc(docRef)
	console.log(docData.data().answered);
	return docData.data().answered;
	
}

export default function Page() {
	const router = useRouter();
	const roomID = stripURL(window.location.href);
	const { user } = useStateContext();

	const [answer1, setAnswer1] = useState('');
	const [answer2, setAnswer2] = useState('');
	const [answer3, setAnswer3] = useState('');

	const answers = [
		{ text: "Answer question 1", setAnswer: setAnswer1 },
		{ text: "Answer question 2", setAnswer: setAnswer2 },
		{ text: "Answer question 3", setAnswer: setAnswer3 },
	]


	const [sender, setSender] = useState(user.email);
	const [answersSent, setAnswersSent] = useState(false);


	async function checkAndUpdate() {
		let answered = await getAnswered(roomID);
		const interval = setInterval(async () => {
			answered = await getAnswered(roomID);
			console.log(answered)
			if (answered >= 2) {
				Swal.close()
				clearInterval(interval);
				router.push(`/guess?room=${roomID}`)
			}

		}, 5000);

		Swal.fire({
				position: 'top-end',
				title: 'Please Wait...',
				text: "Waiting for other user to submit answers",
				icon: 'info',
				showCancelButton: false,
				showConfirmButton: false,
				showDenyButton: false,
				allowEscapeKey: false,
				allowOutsideClick: false				
				
		})
	}

	const handleSubmit = async () => {
		setSender(user.email)
		const res = [
			{sender: user.email},
			{text: "Answer 1", value:answer1},
			{text: "Answer 2", value:answer2},
			{text: "Answer 3", value:answer3},
		]
		console.log(user);
		console.log(res)
		try {
			await send_answers(roomID, res, user.uid, user.email);
			setAnswersSent(true);
			console.log(await getAnswered(roomID))
			//router.push(`/guess?room=${roomID}`)
			checkAndUpdate()

		} catch (err) {
			console.log(err);
		}
	}
	
	var count=60;
	var counter=setInterval(timer, 1000);
	function timer() {
		count=count-1;
		if (count < 0) {
			clearInterval(counter);
			handleSubmit();
			return;
		}
		document.getElementById("timer").innerHTML=count + " seconds";
	}


	return (
		<Box
			display='flex'
			flexDir={'column'}
			w='100%'
			h='100%'
			justifyContent='center'
			alignItems={'center'}
		>
			<Button p="10" w="500px" bg='#2A4365' onClick={() => {
					setup_questions(roomID, user.uid, user)}} >
						View Questions
			</Button>
			<Heading fontSize={'4xl'} pb='16px'>
				Answer the 3 questions
			</Heading>
			{answers.map((answer, index) => (
				<AnswerItem
					text={answer.text}
					onChange={(event) => { answer.setAnswer(event.target.value) }}
				/>
			))}
			<Button w="500px" bg='#2A4365' onClick={() => {
					handleSubmit()}} >
						Submit
			</Button>
			<span id="timer"></span>

			
		</Box>

	);

}
