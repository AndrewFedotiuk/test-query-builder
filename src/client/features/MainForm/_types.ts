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
	GREATER_THAN = "GREATER_THAN",
	LESS_THAN = "LESS_THAN",
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

export type TRule = {
	id: string;
	operation: EOperation;
} & ({
	fieldName: EFieldName.AMOUNT;
	value: TAmountValue;
} | {
	fieldName: EFieldName.NAME;
	value: string;
} | {
	fieldName: EFieldName.ID;
	value: string;
} | {
	fieldName: EFieldName.TRANSACTION_STATE;
	value: ETransactionState;
} | {
	fieldName: EFieldName.DEVICE_IP;
	value: string;
} | {
	fieldName: EFieldName.INSTALLMENTS;
	value: number;
})

export type TRuleGroup = {
	id: string;
	combinator: ECombinator;
	rules: TRule[];
	subGroups: TRuleGroup[];
}

export enum EFieldType {
	TEXT = "text",
	NUMBER = "number",
	ENUM = "enum"
}

export enum ETransactionState {
	SUCCEEDED = "SUCCEEDED",
	REJECTED = "REJECTED",
	ERROR = "ERROR",
	TIMEOUT = "TIMEOUT",
	CANCELLED = "CANCELLED",
	FAILED = "FAILED",
	ABORTED = "ABORTED"
}

export type TSchema = {
	combinator: ECombinator;
	conditions?: Omit<TRule, "id">[];
	subConditions?: TSchema[];
}
