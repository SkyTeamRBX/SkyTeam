import { Inter } from 'next/font/google'
import "./globals.css";

export const metadata = {
	title: 'SkyTeam Admin',
	description: 'secret stuff',
};

const inter = Inter({
	subsets: ['latin'],
	display: 'swap',
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en" className={inter.className}>
			<body>{children}</body>
		</html>
	);
}
