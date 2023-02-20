'use client';

import {
	Stack,
	Button,
	Heading,
	Box,
	Checkbox,
	Text,
} from '@chakra-ui/react';
import { useRouter } from 'next/navigation';

export default function Page() {
	const router = useRouter();
	return (
		<Box
			display='flex'
			flexDir={'column'}
			w='100%'
			h='100%'
			justifyContent='center'
			alignItems={'center'}
		>
			<Heading fontSize={'4xl'} pb='16px'>Terms of Service</Heading>
			<Stack
				justifyContent='center'
				alignItems={'center'}>
				<Box p='16px' w='500px'>
						<Text fontSize='md'>Our aim with turingame.ai is to create a novel way for users to engage both with emerging AI technologies and other players. We have created a set of guidelines for user conduct when sending messages to ensure that turingame.ai remains an enjoyable experience for our users.</Text>
                       	<br />
						<Text as='b' fontSize='lg'>Be Respectful</Text>
                       	<Text fontSize='md'>We want to keep the turingame.ai experience fun and inviting for all. That is why we do not allow your in-game messages to contain explicit, harassing, or offensive content of any kind. We do not allow swearing, hateful conduct, harassment, or trolling.</Text>
                       	<br />
						<Text as='b' fontSize='lg'>Be Safe</Text>
                       	<Text fontSize='md'>We want our users to protect their personal security while using our service. We do not allow users to share personally identifying information such as full name or exact location.</Text>
                       	<br />
						<Text as='b' fontSize='lg'>No Spam or Advertising</Text>
                       	<Text fontSize='md'>We want users to be able to enjoy an engaging experience free from advertisements and irrelevant spam messages. We do not allow users to send advertising messages, links to outside sources, or repetitive spam.</Text>
						<br />
                       	<Text fontSize='md'>Violating these community guidelines may result in account suspension or deletion.</Text>
				</Box>
				<Checkbox>I agree to the terms of service.</Checkbox>
				<Button onClick={() => {router.push('/')}} w='300px' bg='#2A4365'>Create account</Button>
			</Stack>
		</Box>
	);
}