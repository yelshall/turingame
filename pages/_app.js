import '@/styles/globals.css'
import Layout from '../components/layouts/main'
import Fonts from '../components/fonts'
import Chakra from '@/components/chakra'

export default function App({ Component, pageProps, router }) {
	return (
		<Chakra cookies={pageProps.cookies}>
			<Fonts />
			<Layout router={router}>
				<Component {...pageProps} key={router.route} />
			</Layout>
		</Chakra>
	)
}
