import { EFieldType, EOperation } from "@/client/features/MainForm/_types";

export type TFieldDefinition = {
	label: string;
	value: string;
	type: EFieldType;
	operations: EOperation[];
};
