import Image from "next/image";
import {
	Description,
	Field,
	Fieldset,
	Input,
	Label,
	Button,
	Legend,
	Select,
	Textarea,
} from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";

export default function Home() {
	return (
		<div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
			<main className="flex flex-col gap-[32px] row-start-2 sm:items-start">
				<h1 className="text-3xl font-bold underlined">
					SkyTeam Connect
				</h1>
				<Fieldset className="space-y-6 rounded-xl bg-white/5 p-6 sm:p-10">
					{/* <Legend className="text-base/7 font-semibold text-white">
						Access Portal
					</Legend> */}
					<Field>
						<Label className="text-sm/6 font-medium text-white">
							Passcode
						</Label>
						<Description className="text-sm/6 text-white/50">
							If you have a tiger, we'd like to know about it.
						</Description>
						<Input
							className={clsx(
								"mt-3 block w-full rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white",
								"focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25",
							)}
						/>
					</Field>
					<Button className="inline-flex items-center gap-2 rounded-md bg-white/10 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-white/5 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white">
						Login
					</Button>
				</Fieldset>
			</main>
			<footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center"></footer>
		</div>
	);
}
