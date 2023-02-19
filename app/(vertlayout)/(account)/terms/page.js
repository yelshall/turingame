'use client';

import {
	Stack,
	Button,
	Heading,
	SkeletonText,
	Box,
	Checkbox,
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
				<Box p='16px' w='400px'>
					<SkeletonText noOfLines={13} spacing='4' skeletonHeight='2' />
				</Box>
				<Checkbox>I agree to the terms of service.</Checkbox>
				<Button onClick={() => {router.push('/')}} w='300px' bg='#2A4365'>Create account</Button>
			</Stack>
		</Box>
	);
}