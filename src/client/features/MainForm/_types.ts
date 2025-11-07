export enum ECombinator {
	AND = "AND",
	OR = "OR"
}

export enum EFieldName {
	AMOUNT = "amount",
	NAME = "name",
	ID = "id",
	TRANSACTION_STATE = "transaction_state",
	DEVICE_IP = "device_ip",
	INSTALLMENTS = "installments",
}

export enum EOperation {
	EQUAL = "EQUAL",
	NOT_EQUAL = "NOT_EQUAL",
}

export enum ECurrency {
	USD = "USD",
	EUR = "EUR",
	GBP = "GBP",
	JPY = "JPY",
	CAD = "CAD",
	AUD = "AUD"
}

export type TAmountValue = {
	amount: number;
	currency: ECurrency;
}

export type RuleValue = string | number | TAmountValue;

export type TRule = {
	id: string;
	fieldName: EFieldName | "";
	operation: EOperation;
	value: RuleValue;
}

export type TRuleGroup = {
	id: string;
	combinator: ECombinator;
	rules: TRule[];
	subGroups: TRuleGroup[];
}
