import type { RequestHandler } from './$types';
// Helper function to check if a character is an operator
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

// Function to evaluate a mathematical expression
function evaluateExpression(expression: string): number {
    const outputStack: number[] = [];
    const operatorStack: string[] = [];

    const tokens = expression.split(' ');

    tokens.forEach((token) => {
        if (!isNaN(parseFloat(token))) {
            outputStack.push(parseFloat(token));
        } else if (isOperator(token)) {
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
    });

    while (operatorStack.length > 0) {
        const operator = operatorStack.pop() as string;
        const operand2 = outputStack.pop() as number;
        const operand1 = outputStack.pop() as number;
        const result = applyOperator(operator, operand1, operand2);
        outputStack.push(result);
    }

    return outputStack[0];
}

// Request handler
export const POST: RequestHandler = async (event) => {
    try {
        const data = await event.request.json();
        const equation = data.equation;
        const result = evaluateExpression(equation);

        console.log(result);

        return new Response(JSON.stringify({
            success: true,
            result
        }), {
            headers: {
                'Content-Type': 'application/json'
            }
        });
    } catch (error) {
        return new Response(JSON.stringify({
            success: false,
        }), {
            headers: {
                'Content-Type': 'application/json'
            },
            status: 400 // Bad request status
        });
    }
};