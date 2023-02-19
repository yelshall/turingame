import '@/app/globals.css';

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<head>
				<title>turingame.ai</title>
			</head>

			<body>
				{children}
			</body>
		</html>
	);
};