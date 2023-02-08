'use client';

import { IconButton, useColorModeValue, Icon } from '@chakra-ui/react'
import { VscAccount } from 'react-icons/vsc'
import theme from '../(lib)/theme';

export default function ProfileButton() {
	const color = useColorModeValue(theme.colors.dark, theme.colors.light)
	const oppositeColor = useColorModeValue(theme.colors.light, theme.colors.dark)

	return (
		<IconButton
			aria-label="Toggle theme"
			bg={color}
			icon={<Icon style={{color: oppositeColor}} as={VscAccount} />}
			onClick={() => {}}
		></IconButton>
	);
};