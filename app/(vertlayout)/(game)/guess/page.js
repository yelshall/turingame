'use client';

import {
	Button,
	Heading,
	Text,
	Divider,
	Box,
	AlertDialog,
	AlertDialogBody,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogContent,
	AlertDialogOverlay,
	useDisclosure
} from '@chakra-ui/react';
import { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import EmojiRandomizer from '../../../(components)/emojiRandomizer'
import { useStateContext } from '../../../context/userAuthFunctions';
import { db } from '../../../firebase/config';
import { getDoc, doc, setDoc, updateDoc } from 'firebase/firestore';
import Swal from "sweetalert2";
import { openai, openai_interact } from '../../../ai_models/ai_models';

// const AnswerItem = ({ question, answer }) => {
// 	return (
// 		<Box
// 			display='flex'
// 			flexDir={'column'}
// 			w='100%'
// 		>
// 			<Heading fontSize={"2xl"} alignSelf={"flex-start"} pb="8px">You asked...</Heading>
// 			<Text pb="4px">{question}</Text>
// 			<Heading fontSize={"2xl"} alignSelf={"flex-start"} pb="8px">They answered...</Heading>
// 			<Text pb="4px">{answer}</Text>
// 		</Box>
// 	)
// };

const setupYouAsked = async(roomID, user) => {
	const docRef = doc(db, "chatRooms", roomID);
	const docData = await getDoc(docRef)
	if (user.uid == docData.data().first_id  && docData.data().second_user != "Open Ai") {
		// set up the questions for the second
		console.log(docData.data()[`questions_${docData.data().first_id}`]);
		const qs = docData.data()[`questions_${docData.data().first_id}`];
		console.log(qs[1].value)
		Swal.fire({text:`${qs[1].value} ${qs[2].value}, ${qs[3].value}`})
		return [qs[1].value, qs[2].value, qs[3].value];
	

	} else if (user.uid == docData.data().second_id) {
		// set up the questions for the first
		console.log(docData.data()[`questions_${docData.data().second_id}`]);
		const qs = docData.data()[`questions_${docData.data().second_id}`];
		console.log(qs[1].value)
		Swal.fire({text:`${qs[1].value} ${qs[2].value}, ${qs[3].value}`})
		return [qs[1].value, qs[2].value, qs[3].value];

	} else {
		// set up the question from ai
		console.log(docData.data()[`questions_OpenAi`]);
		const qs = docData.data()[`questions_${docData.data().first_id}`];
		console.log(qs[1].value)
		Swal.fire({html:`Question 1: ${qs[1].value}<br> Question 2: ${qs[2].value}<br> Question3: ${qs[3].value}`})
		return [qs[1].value, qs[2].value, qs[3].value];

	}
}

const setupTheyAnswered = async(roomID, user) => {
	const docRef = doc(db, "chatRooms", roomID);
	const docData = await getDoc(docRef)
	if (user.uid == docData.data().first_id  && docData.data().second_user != "Open Ai") {
		// set up the questions for the second
		console.log(docData.data()[`answers_${docData.data().second_id}`]);
		const qs = docData.data()[`answers_${docData.data().second_id}`];
		console.log(qs[1].value)
		Swal.fire({text:`${qs[1].value} ${qs[2].value}, ${qs[3].value}`})
		return [qs[1].value, qs[2].value, qs[3].value];
	

	} else if (user.uid == docData.data().second_id) {
		// set up the questions for the first
		console.log(docData.data()[`answers_${docData.data().first_id}`]);
		const qs = docData.data()[`answers_${docData.data().first_id}`];
		console.log(qs[1].value)
		Swal.fire({text:`${qs[1].value} ${qs[2].value}, ${qs[3].value}`})
		return [qs[1].value, qs[2].value, qs[3].value];

	} else {
		// set up the question from ai
		console.log(docData.data()[`answers_OpenAi`]);
		const qs = docData.data()[`answers_OpenAi`];
		console.log(qs[1].value)
		Swal.fire({html:`answer 1: ${qs[1].value}<br> answer 2: ${qs[2].value}<br> answer 3: ${qs[3].value}`})
		return [qs[1].value, qs[2].value, qs[3].value];

	}
}

const isAi = async(roomID) => {
	const docRef = doc(db, "chatRooms", roomID);
	const docData = await getDoc(docRef)

	if (docData.data().second_user == "Open Ai") {
		console.log(docData.data().second_user == "Open Ai")
		return true;
	} else {
		console.log(docData.data().second_user == "Open Ai")
		return false;
	}
	
}

const PlayAgain = ({ isCorrect, isOpen, cancelRef, router }) => {
	//Skynet is real
	return (
		<AlertDialog
			isOpen={isOpen}
			leastDestructiveRef={cancelRef}
		>
			<AlertDialogOverlay>
				<AlertDialogContent>
					<AlertDialogHeader fontSize='4xl' fontWeight='bold' color={isCorrect ? "green" : "red"}>
						{isCorrect ? "You guessed correctly!" : "Skynet is real..."}
					</AlertDialogHeader>

					<AlertDialogBody fontSize={'xl'}>
						Do you want to play again?
					</AlertDialogBody>

					<AlertDialogFooter>
						<Button ref={cancelRef} onClick={() => { router.push("/load") }}>
							Play again
						</Button>
						<Button colorScheme='red' onClick={() => { router.push("/") }} ml={3}>
							Home
						</Button>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialogOverlay>
		</AlertDialog>
	)
};

const handleClick = async ( roomID, onOpen, setCorrectness) => {
	const isHuman = await isAi(roomID);
	console.log(isHuman)
	if (!isHuman) {
		setCorrectness(true)
		onOpen()
		return
	}
	setCorrectness(false)
	onOpen()
};

const handleClickAi = async ( roomID, onOpen, setCorrectness) => {
	const isHuman = await isAi(roomID);
	console.log(isHuman)

	if (isHuman) {
		setCorrectness(true)
		onOpen()

		return
	}
	setCorrectness(false)
	onOpen()
};

function stripURL(url) {
	const index = url.indexOf("room") + 5;
	const strippedURL = url.substring(index);
	return strippedURL;
}


export default function Page() {

	const roomID = stripURL(window.location.href);

	const answers = [
		{ question: "Question 1?", answer: "Answer 1" },
		{ question: "Question 2?", answer: "Answer 2" },
		{ question: "Question 3?", answer: "Answer 3" },
	]

	const {user} = useStateContext();

	const { isOpen, onOpen, onClose } = useDisclosure()
	const [correctness, setCorrectness] = useState(false)
	const cancelRef = useRef()
	const router = useRouter()

	return (
		<Box
			display='flex'
			flexDir={'column'}
			w='100%'
			h='100%'
			justifyContent='center'
			alignItems={'center'}
		>
			<Box
				display='flex'
				flexDir={'row'}
				w='100%'
				fontSize={'4xl'}
				justifyContent={"center"}
				alignItems={"center"}
				pb="16px"
				fontWeight={"medium"}
			>
				<Button
					h="60px"
					w="200px"
					fontSize={'4xl'}
					onClick={() => handleClick(roomID, onOpen, setCorrectness)}
				>
					Human&nbsp;<EmojiRandomizer isHuman={true} />
				</Button>
				&nbsp;or&nbsp;
				<Button
					h="60px"
					w="200px"
					fontSize={'4xl'}
					onClick={() => handleClickAi(roomID, onOpen, setCorrectness)}
				>
					AI&nbsp;<EmojiRandomizer isHuman={false} />
				</Button>
			</Box>
			<Button w="500px" bg='#2A4365' onClick={() => {setupYouAsked(roomID, user)}}>You Asked</Button>
			<Button w="500px" bg='#2A4365' onClick={() => {setupTheyAnswered(roomID, user)}}>They Answered</Button>

			
			<PlayAgain
				isCorrect={correctness}
				isOpen={isOpen}
				cancelRef={cancelRef}
				router={router}
			/>
		</Box>
	);
}
