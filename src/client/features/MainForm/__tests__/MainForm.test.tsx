import { describe, it, expect, vi, beforeEach, Mocked } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MainForm } from "../MainForm";
import { ECombinator, EFieldName, EOperation, ETransactionState, TSchema } from "../_types";
import axios from "axios";

vi.mock("axios");
const mockedAxios = axios as Mocked<typeof axios>;

describe("Query Builder - Part 1 Requirements", () => {
	describe("1. Combinator", () => {
		it("should render combinator dropdown with AND and OR options", () => {
			render(<MainForm />);
			const combinator = screen.getByRole("combobox", { name: /combinator/i });

			expect(combinator).toBeInTheDocument();
			expect(combinator).toHaveValue(ECombinator.AND);

			// Check both options exist
			const options = combinator.querySelectorAll("option");
			expect(options).toHaveLength(2);
			expect(options[0]).toHaveValue(ECombinator.AND);
			expect(options[1]).toHaveValue(ECombinator.OR);
			expect(options[0]).toHaveTextContent("And");
			expect(options[1]).toHaveTextContent("Or");
		});

		it("should allow changing combinator from AND to OR", () => {
			render(<MainForm />);
			const combinator = screen.getAllByRole("combobox")[0];

			fireEvent.change(combinator, { target: { value: "OR" } });
			expect(combinator).toHaveValue("OR");
		});

		it("should allow nested groups to have their own combinators", () => {
			render(<MainForm />);

			// Add a group
			const addGroupBtn = screen.getByRole("button", { name: /add group/i });
			fireEvent.click(addGroupBtn);

			const combinators = screen.getAllByRole("combobox", { name: /combinator/i });

			expect(combinators.length).toBe(2);
		});
	});

	describe("2. Add Rule Button", () => {
		it('should render "Add Rule" button', () => {
			render(<MainForm />);
			const addRuleBtn = screen.getByRole("button", { name: /add rule/i });
			expect(addRuleBtn).toBeInTheDocument();
		});

		it("should add a new rule when clicked", () => {
			render(<MainForm />);
			const addRuleBtn = screen.getByRole("button", { name: /add rule/i });

			fireEvent.click(addRuleBtn);

			const rules = screen.getAllByRole("textbox", { name: EFieldName.NAME });

			expect(rules.length).toBe(2);
		});

		it("should append new rules to the end of the rule group", () => {
			render(<MainForm />);
			const addRuleBtn = screen.getByRole("button", { name: /add rule/i });

			fireEvent.click(addRuleBtn);
			fireEvent.click(addRuleBtn);

			const rules = screen.getAllByRole("textbox", { name: EFieldName.NAME });
			expect(rules.length).toBe(3);
		});

		it("should render rule with field name, operation, and value fields", () => {
			render(<MainForm />);
			const addRuleBtn = screen.getByRole("button", { name: /add rule/i });

			fireEvent.click(addRuleBtn);

			// Check for all three dropdowns/inputs in a rule
			const selects = screen.getAllByRole("combobox");
			expect(selects.length).toBeGreaterThanOrEqual(3); // combinator + field + operation
		});
	});


	describe("3. Add Group Button", () => {
		it('should render "Add Group" button', () => {
			render(<MainForm />);
			const addGroupBtn = screen.getByRole("button", { name: /add group/i });
			expect(addGroupBtn).toBeInTheDocument();
		});

		it("should create a new nested group when clicked", () => {
			render(<MainForm />);
			const addGroupBtn = screen.getByRole("button", { name: /add group/i });

			fireEvent.click(addGroupBtn);

			const addRuleBtns = screen.getAllByRole("button", { name: /add rule/i });
			expect(addRuleBtns.length).toBe(2);
		});

		it("should allow nested group to have its own combinator", () => {
			render(<MainForm />);

			fireEvent.click(screen.getByRole("button", { name: /add group/i }));

			const combinators = screen.getAllByRole("combobox", { name: /combinator/i });
			expect(combinators.length).toBe(2); // root + nested
		});

		it("should allow nested group to have delete button (not root)", () => {
			render(<MainForm />);

			fireEvent.click(screen.getByRole("button", { name: /add group/i }));

			const deleteGroupBtns = screen.getAllByRole("button", { name: /combinator-remove-group/i });
			expect(deleteGroupBtns.length).toBe(1); // nested only
		});
	});

	describe("4. Field Name Dropdown", () => {
		it("should display all field options", () => {
			render(<MainForm />);

			expect(screen.getByRole("option", { name: /amount/i })).toBeInTheDocument();
			expect(screen.getByRole("option", { name: /name/i })).toBeInTheDocument();
			expect(screen.getByRole("option", { name: /id/i })).toBeInTheDocument();
			expect(screen.getByRole("option", { name: /transaction state/i })).toBeInTheDocument();
			expect(screen.getByRole("option", { name: /device ip/i })).toBeInTheDocument();
			expect(screen.getByRole("option", { name: /installments/i })).toBeInTheDocument();
		});

		it("should have correct backend values for fields", () => {
			render(<MainForm />);

			const options = screen.getByRole("option", { name: "Amount" });
			expect(options).toHaveValue(EFieldName.AMOUNT);
		});
	});

	describe("5. Operation Dropdown", () => {
		it("should show EQUAL and NOT_EQUAL for text fields", () => {
			render(<MainForm />);
			fireEvent.click(screen.getByRole("button", { name: /add rule/i }));

			const selects = screen.getAllByRole("combobox");
			const fieldSelect = selects[selects.length - 2];

			fireEvent.change(fieldSelect, { target: { value: "name" } });

			const operationSelect = selects[selects.length - 1];
			const options = Array.from((operationSelect as HTMLSelectElement).options);

			expect(options.some(opt => opt.value === "EQUAL")).toBe(true);
			expect(options.some(opt => opt.value === "NOT_EQUAL")).toBe(true);
			expect(options.some(opt => opt.value === "LESS_THAN")).toBe(false);
		});

		it("should show all four operations for number fields", () => {
			render(<MainForm />);
			const selects = screen.getAllByRole("combobox");
			const fieldSelect = selects[selects.length - 2];

			fireEvent.change(fieldSelect, { target: { value: "amount" } });

			const operationSelect = selects[selects.length - 1];
			const options = Array.from((operationSelect as HTMLSelectElement).options);

			expect(options.some(opt => opt.value === "EQUAL")).toBe(true);
			expect(options.some(opt => opt.value === "NOT_EQUAL")).toBe(true);
			expect(options.some(opt => opt.value === "LESS_THAN")).toBe(true);
			expect(options.some(opt => opt.value === "GREATER_THAN")).toBe(true);
		});
	});

	describe("6. Value Field - Amount", () => {
		it("should render numeric input and currency dropdown for amount", () => {
			render(<MainForm />);
			const selects = screen.getAllByRole("combobox");
			const fieldSelect = selects[selects.length - 2];
			fireEvent.change(fieldSelect, { target: { value: "amount" } });

			const numberInput = screen.getByRole("spinbutton", { name: EFieldName.AMOUNT });

			expect(numberInput).toHaveAttribute("type", "number");
			expect(numberInput).toBeInTheDocument();

			// Currency dropdown should exist
			const currencySelects = screen.getAllByRole("combobox");
			const hasCurrency = currencySelects.some(select => {
				const options = Array.from((select as HTMLSelectElement).options);
				return options.some(opt => opt.value === "USD");
			});
			expect(hasCurrency).toBe(true);
		});
	});

	describe("6. Value Field - Text Fields", () => {
		it("should render text input for name field", () => {
			render(<MainForm />);

			const selects = screen.getAllByRole("combobox");
			const fieldSelect = selects[selects.length - 2];
			fireEvent.change(fieldSelect, { target: { value: "name" } });

			const textInput = screen.getByPlaceholderText(/Name/i);
			expect(textInput).toBeInTheDocument();
			expect(textInput).toHaveAttribute("type", "text");
		});
	});

	describe("6. Value Field - Transaction State", () => {
		it("should render dropdown with predefined states", () => {
			render(<MainForm />);

			const selects = screen.getAllByRole("combobox");
			const fieldSelect = selects[selects.length - 2];
			fireEvent.change(fieldSelect, { target: { value: EFieldName.TRANSACTION_STATE } });

			const stateSelects = screen.getAllByRole("combobox");
			const stateSelect = stateSelects[stateSelects.length - 1];

			const options = Array.from((stateSelect as HTMLSelectElement).options);
			expect(options.some(opt => opt.value === ETransactionState.SUCCEEDED)).toBe(true);
			expect(options.some(opt => opt.value === ETransactionState.REJECTED)).toBe(true);
			expect(options.some(opt => opt.value === ETransactionState.ERROR)).toBe(true);
		});
	});

	describe("6. Value Field - Number Fields", () => {
		it("should render numeric input for installments", () => {
			render(<MainForm />);
			fireEvent.click(screen.getByRole("button", { name: /add rule/i }));

			const selects = screen.getAllByRole("combobox");
			const fieldSelect = selects[selects.length - 2];
			fireEvent.change(fieldSelect, { target: { value: "installments" } });

			const numberInput = screen.getByRole("spinbutton", { name: EFieldName.INSTALLMENTS });
			expect(numberInput).toBeInTheDocument();
			expect(numberInput).toHaveAttribute("type", "number");
		});
	});

	describe("7. Nested Conditions", () => {
		it("should support multiple levels of nesting", () => {
			render(<MainForm />);

			// Add first level group
			fireEvent.click(screen.getByRole("button", { name: /add group/i }));

			// Add second level group
			const addGroupBtns = screen.getAllByRole("button", { name: /add group/i });
			fireEvent.click(addGroupBtns[1]);

			expect(screen.getAllByRole("combobox").length).toBeGreaterThanOrEqual(3); // root + 2 nested
		});

		it("should allow nested groups to have their own rules", () => {
			render(<MainForm />);

			fireEvent.click(screen.getByRole("button", { name: /add group/i }));

			const addRuleBtns = screen.getAllByRole("button", { name: /add rule/i });
			fireEvent.click(addRuleBtns[1]); // Add rule to nested group

			const deleteRuleBtns = screen.getAllByRole("button", { name: /combinator-remove-rule/i });
			expect(deleteRuleBtns.length).toBe(2);
		});
	});

	describe("8. Schema Generation", () => {
		beforeEach(() => {
			vi.clearAllMocks();
			mockedAxios.post.mockResolvedValue({ data: {} });
		});

		it("should generate correct schema for simple rule", async () => {
			render(<MainForm />);

			const selects = screen.getAllByRole("combobox");
			const fieldSelect = selects[selects.length - 2];
			const operationSelect = selects[selects.length - 1];

			fireEvent.change(fieldSelect, { target: { value: EFieldName.TRANSACTION_STATE } });
			fireEvent.change(operationSelect, { target: { value: EOperation.EQUAL } });

			const stateSelect = screen.getAllByRole("combobox")[selects.length];
			fireEvent.change(stateSelect, { target: { value: ETransactionState.SUCCEEDED } });

			fireEvent.click(screen.getByRole("button", { name: /submit/i }));

			await waitFor(() => {
				expect(mockedAxios.post).toHaveBeenCalled();
				const [url, requestData] = mockedAxios.post.mock.calls[0] as [string, TSchema];

				expect(url).toBe("/api/save-rules");
				expect(requestData).toHaveProperty("combinator", "AND");
				expect(requestData).toHaveProperty("conditions");
				expect(Array.isArray(requestData.conditions)).toBe(true);
				expect(requestData.conditions![0]).toMatchObject({
					fieldName: EFieldName.TRANSACTION_STATE,
					operation: EOperation.EQUAL,
					value: ETransactionState.SUCCEEDED
				});
			});
		});

		it("should generate schema with nested subConditions", async () => {
			render(<MainForm />);
			fireEvent.click(screen.getByRole("button", { name: /add group/i }));

			const allNameInputs = screen.getAllByRole("textbox", { name: EFieldName.NAME });

			allNameInputs.forEach(input=>{
				fireEvent.change(input, { target: { value: "test" } });
			});

			fireEvent.click(screen.getByRole("button", { name: /submit/i }));

			await waitFor(() => {
				expect(mockedAxios.post).toHaveBeenCalled();
				const [url, requestData] = mockedAxios.post.mock.calls[0] as [string, TSchema];

				expect(url).toBe("/api/save-rules");
				expect(requestData).toHaveProperty("subConditions");
			});
		});

		it("should show validation errors for empty fields", async () => {
			render(<MainForm />);
			fireEvent.click(screen.getByRole("button", { name: /submit/i }));
      
			await waitFor(() => {
				expect(mockedAxios.post).not.toHaveBeenCalled();
			});
		});
	});

	describe("9. Display JSON", () => {
		it("should display JSON output after submission", async () => {
			render(<MainForm />);
      
			const selects = screen.getAllByRole("combobox");
			const fieldSelect = selects[selects.length - 2];
			fireEvent.change(fieldSelect, { target: { value: "name" } });
      
			const textInput = screen.getByPlaceholderText(/name/i);
			fireEvent.change(textInput, { target: { value: "John Doe" } });
      
			fireEvent.click(screen.getByRole("button", { name: /submit/i }));
      
			await waitFor(() => {
				expect(screen.getByText(/generated query json/i)).toBeInTheDocument();
			});
		});
	});

	describe("Delete Functionality", () => {
		it("should delete rules when delete button clicked", () => {
			render(<MainForm />);
      
			fireEvent.click(screen.getByRole("button", { name: /add rule/i }));
			fireEvent.click(screen.getByRole("button", { name: /add rule/i }));
      
			let deleteButtons = screen.getAllByRole("button", { name: /combinator-remove-rule/i });
			expect(deleteButtons.length).toBe(3);
      
			fireEvent.click(deleteButtons[0]);
      
			deleteButtons = screen.queryAllByRole("button", { name: /combinator-remove-rule/i });
			expect(deleteButtons.length).toBe(2);
		});

		it("should delete nested groups when delete button clicked", () => {
			render(<MainForm />);
      
			fireEvent.click(screen.getByRole("button", { name: /add group/i }));
      
			let deleteGroupButtons = screen.queryAllByRole("button", { name: /combinator-remove-group/i })
			expect(deleteGroupButtons.length).toBe(1);
			
			fireEvent.click(deleteGroupButtons[0]);
      
			deleteGroupButtons = screen.queryAllByRole("button", { name: /combinator-remove-group/i });
			expect(deleteGroupButtons.length).toBe(0);
		});

		it("should not show delete button on root group", () => {
			render(<MainForm />);
      
			const deleteGroupButtons = screen.queryAllByRole("button", { name: /combinator-remove-group/i });
			expect(deleteGroupButtons.length).toBe(0);
		});
	});
});
