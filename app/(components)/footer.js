'use client';

import { Box } from '@chakra-ui/react'

export default function Footer() {
	return (
		<Box align="center" fontSize="sm">
			&copy; {new Date().getFullYear()} Youssuf Elshall. All Rights Reserved.
		</Box>
	);
};
