import type { RequestHandler } from './$types';

// Helper function to check if a character is an operator
function isOperator(char: string): boolean {
	return ['+', '-', '*', '/'].includes(char);
}

// Helper function to get the precedence of an operator
function getPrecedence(operator: string): number {
	if (operator === '+' || operator === '-') return 1;
	if (operator === '*' || operator === '/') return 2;
	return 0;
}

// Helper function to perform arithmetic operations
function applyOperator(operator: string, operand1: number, operand2: number): number {
	switch (operator) {
		case '+':
			return operand1 + operand2;
		case '-':
			return operand1 - operand2;
		case '*':
			return operand1 * operand2;
		case '/':
			return operand1 / operand2;
		default:
			throw new Error(`Invalid operator: ${operator}`);
	}
}

// Helper function to normalize multiple consecutive + and - signs
function normalizeSigns(expression: string): string {
	return expression.replace(/([+-]){2,}/g, (match) => {
		const minusCount = [...match].filter((char) => char === '-').length;

		return minusCount % 2 === 0 ? '+' : '-';
	});
}

// Function to evaluate a mathematical expression
function evaluateExpression(expression: string): number {
	expression = normalizeSigns(expression);

	const outputStack: number[] = [];
	const operatorStack: string[] = [];

	const tokens = expression.match(/(?:\d+(?:\.\d*)?|\.\d+|[+\-*/()])/g);

	if (tokens) {
		for (let i = 0; i < tokens.length; i++) {
			let token = tokens[i];

			if (!isNaN(parseFloat(token))) {
				outputStack.push(parseFloat(token));
			} else if (isOperator(token)) {
				if (
					(token === '+' || token === '-') &&
					(i === 0 || isOperator(tokens[i - 1]) || tokens[i - 1] === '(')
				) {
					if (i + 1 < tokens.length && !isNaN(parseFloat(tokens[i + 1]))) {
						token = token + tokens[i + 1];
						outputStack.push(parseFloat(token));
						i++;
					}
				} else {
					while (
						operatorStack.length > 0 &&
						getPrecedence(operatorStack[operatorStack.length - 1]) >= getPrecedence(token)
					) {
						const operator = operatorStack.pop() as string;
						const operand2 = outputStack.pop() as number;
						const operand1 = outputStack.pop() as number;
						const result = applyOperator(operator, operand1, operand2);
						outputStack.push(result);
					}
					operatorStack.push(token);
				}
			}
		}
	}

	while (operatorStack.length > 0) {
		const operator = operatorStack.pop() as string;
		const operand2 = outputStack.pop() as number;
		const operand1 = outputStack.pop() as number;
		const result = applyOperator(operator, operand1, operand2);
		outputStack.push(result);
	}

	const finalResult = outputStack[0];
	const roundedResult = parseFloat(finalResult.toFixed(10));
	return roundedResult;
}

export const POST: RequestHandler = async (event) => {
	try {
		const data = await event.request.json();
		const equation = data.equation;
		const result = evaluateExpression(equation);

		return new Response(
			JSON.stringify({
				success: true,
				result
			}),
			{
				headers: {
					'Content-Type': 'application/json'
				}
			}
		);
	} catch (error) {
		return new Response(
			JSON.stringify({
				success: false
			}),
			{
				headers: {
					'Content-Type': 'application/json'
				},
				status: 400
			}
		);
	}
};
