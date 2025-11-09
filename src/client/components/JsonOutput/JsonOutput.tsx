import { TSchema } from "@/client/features/MainForm/_types";


type TJSONOutput = {
	data: TSchema;
}

export function JSONOutput({ data }: TJSONOutput) {
	if (!data) return null;
  
	return (
		<>
			<h3 className="font-bold text-lg">Generated Query JSON</h3>

			<div className="flex flex-col gap-3 p-3 rounded-md border bg-gray-800 text-white">
				<pre>{JSON.stringify(data, null, 4)}</pre>
			</div>
		</>
	);
}
