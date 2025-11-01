export function Footer() {
	return (
		<footer className="border-t">
			<div className="mx-auto max-w-6xl px-4 py-8 text-sm text-muted-foreground flex items-center justify-between">
				<p>© {new Date().getFullYear()} SkyTeam</p>
				<p>Built with Next.js, Tailwind, and shadcn/ui</p>
			</div>
		</footer>
	);
}
