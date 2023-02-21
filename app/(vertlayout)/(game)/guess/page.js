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
import EmojiRandomizer from '@/app/(components)/emojiRandomizer'

const AnswerItem = ({ question, answer }) => {
	return (
		<Box
			display='flex'
			flexDir={'column'}
			w='100%'
		>
			<Heading fontSize={"2xl"} alignSelf={"flex-start"} pb="8px">You asked...</Heading>
			<Text pb="4px">{question}</Text>
			<Heading fontSize={"2xl"} alignSelf={"flex-start"} pb="8px">They answered...</Heading>
			<Text pb="4px">{answer}</Text>
		</Box>
	)
};

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
						<Button ref={cancelRef} onClick={() => { router.push("/ask") }}>
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

const handleClick = (isHuman, onOpen, setCorrectness) => {
	if (isHuman) {
		setCorrectness(true)
		onOpen()
		return
	}
	setCorrectness(false)
	onOpen()
};

export default function Page() {
	const answers = [
		{ question: "Question 1?", answer: "Answer 1" },
		{ question: "Question 2?", answer: "Answer 2" },
		{ question: "Question 3?", answer: "Answer 3" },
	]

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
					onClick={() => handleClick(true, onOpen, setCorrectness)}
				>
					Human&nbsp;<EmojiRandomizer isHuman={true} />
				</Button>
				&nbsp;or&nbsp;
				<Button
					h="60px"
					w="200px"
					fontSize={'4xl'}
					onClick={() => handleClick(false, onOpen, setCorrectness)}
				>
					AI&nbsp;<EmojiRandomizer isHuman={false} />
				</Button>
			</Box>
			{answers.map((answer, index) => {
				if (index === answers.length - 1) {
					return (
						<AnswerItem
							question={answer.question}
							answer={answer.answer}
						/>
					)
				}
				return (
					<>
						<AnswerItem
							question={answer.question}
							answer={answer.answer}
						/>
						<Divider m="16px" />
					</>
				)
			})}
			<PlayAgain
				isCorrect={correctness}
				isOpen={isOpen}
				cancelRef={cancelRef}
				router={router}
			/>
		</Box>
	);
}
