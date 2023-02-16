'use client';

import Hero from '@/app/(components)/hero'
import Featuers from '@/app/(components)/features'
import WithLargeQuote from '@/app/(components)/largeQuote'


export default function Home() {
	return (
		<>
			<Hero />
			<Featuers />
			<WithLargeQuote />
		</>
	)
}
