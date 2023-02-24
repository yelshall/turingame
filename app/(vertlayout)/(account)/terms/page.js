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
import { useState } from 'react';
import Swal from 'sweetalert2'

export default function Page() {
	const router = useRouter();
	const [agree, setAgree] = useState(false);
	return (
		<div className=''> 
		<div className='border p-5 overflow-scroll'> 
			<p fontSize={'4xl'} pb='16px'>Terms of Service </p>
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
		</div>

		<div className='p-10 flex-col'> 
			<div className='m-auto'> 
			<Checkbox onChange={(e) => {setAgree(e.target.checked); console.log(e.target.checked)}} mb='16px'>I agree to the terms of service.</Checkbox>
			</div>
			<div className='inline-block rounded bg-blue-900 px-6 pt-2.5 pb-2 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-blue-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]'
			onClick={() => { agree ? router.push('/signup') : Swal.fire('Warning', 'You need to accept the terms & conditions','error')}}> 
			<button className='text-xl'>Create account</button>
		</div>
		</div>

	

		</div>
	);
}