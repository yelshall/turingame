'use client';

import {
	Stack,
	Heading,
	Box,
    Stat,
    StatLabel,
    StatNumber,
    StatHelpText,
    StatArrow,
    StatGroup,
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
			<Heading fontSize={'6xl'} pb='16px'>Profile</Heading>
			<Stack
				justifyContent='center'
				alignItems={'center'}>
                    <br />
                    <Stat>
                        <StatLabel>Games Won</StatLabel>
                        <StatNumber>10</StatNumber>
                        </Stat>
			</Stack>
		</Box>
	);
}