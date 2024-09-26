<script lang="ts">
	let consoleValue = '';
	let answer: number | undefined | string;

	function setCharacters(value: string | number): void {
		if (answer !== undefined) {
			consoleValue = '';
			answer = undefined;
		}
		if (value === 'C') {
			consoleValue = '';
			return;
		}
		if (value === 'DEL') {
			consoleValue = consoleValue.slice(0, -1);
			return;
		}
		consoleValue += value.toString();
	}

	async function getEquation() {
		const equation = consoleValue;

		if (consoleValue === '') {
			return false;
		}

		if (!/^(\d*\.?\d*)([+\-*/](\d*\.?\d*))*$/.test(consoleValue)) {
			answer = 'Syntax Error';
			return;
		}

		const response = await fetch('api/calculate', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ equation })
		});

		if (response.ok) {
			const data = await response.json();
			const result = data.result;
			answer = result;

			if (answer === null) {
				answer = 'Syntax Error';
			}

			return;
		} else {
			return false;
		}
	}
</script>

<div class="calculator">
	<div id="output-div">
		<input type="text" bind:value={consoleValue} readonly={true} name="equation" />
		<input
			id="answer"
			type="text"
			bind:value={answer}
			readonly={true}
			name="equation"
			style={answer === 'Syntax Error'
				? 'font-family: "Courier New", monospace; font-size: 18px; color: red; height: 34px;'
				: ''}
		/>
	</div>
	<div class="buttons">
		<div class="operations">
			<button
				on:click={() => {
					setCharacters('+');
				}}
			>
				+
			</button>
			<button
				on:click={() => {
					setCharacters('-');
				}}
			>
				-
			</button>
			<button
				on:click={() => {
					setCharacters('*');
				}}
			>
				&times;
			</button>
			<button
				on:click={() => {
					setCharacters('/');
				}}
			>
				&divide;
			</button>
		</div>
		<div class="button-row">
			<div class="numbers">
				<div>
					<button
						on:click={() => {
							setCharacters(7);
						}}
					>
						7
					</button>
					<button
						on:click={() => {
							setCharacters(8);
						}}
					>
						8
					</button>
					<button
						on:click={() => {
							setCharacters(9);
						}}
					>
						9
					</button>
				</div>
				<div>
					<button
						on:click={() => {
							setCharacters(4);
						}}
					>
						4
					</button>
					<button
						on:click={() => {
							setCharacters(5);
						}}
					>
						5
					</button>
					<button
						on:click={() => {
							setCharacters(6);
						}}
					>
						6
					</button>
				</div>
				<div>
					<button
						on:click={() => {
							setCharacters(1);
						}}
					>
						1
					</button>
					<button
						on:click={() => {
							setCharacters(2);
						}}
					>
						2
					</button>
					<button
						on:click={() => {
							setCharacters(3);
						}}
					>
						3
					</button>
				</div>
				<div>
					<button
						on:click={() => {
							setCharacters(0);
						}}
					>
						0
					</button>
					<button
						on:click={() => {
							setCharacters('.');
						}}
					>
						.
					</button>
				</div>
			</div>
			<div class="clear">
				<button
					on:click={() => {
						setCharacters('C');
					}}
				>
					AC
				</button>
				<button
					on:click={() => {
						setCharacters('DEL');
					}}
				>
					DEL
				</button>
			</div>
		</div>
		<div class="equal">
			<button on:click={getEquation}> = </button>
		</div>
	</div>
</div>

<style>
	:root {
		--toastContainerTop: auto;
		--toastContainerRight: auto;
		--toastContainerBottom: 8rem;
		--toastContainerLeft: calc(50vw - 8rem);
	}

	:global(body) {
		background-color: #1a4a89;
		transition: background-color 0.3s;
		display: flex;
		align-items: center;
		justify-content: center;
		height: 100vh;
		margin: 0;
		padding: 0;
	}

	.calculator {
		width: 100%;
		max-width: 600px;
		height: 500px;
		box-shadow: 6px 6px 6px #000000;
		padding: 10px;
		margin: 10px;
		background-color: white;
		border-radius: 10px;
	}

	#output-div {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		width: 100%;
		text-align: right;
		border: 1px solid #000000;
		border-radius: 10px;
		box-shadow: 1px 1px 1px #000000;
	}

	#output-div input {
		width: 95%;
		height: 34px;
		outline: none;
		font-size: 30px;
		border: none;
		border-radius: 10px;
		padding: 10px;
	}

	#answer {
		text-align: right;
	}

	.buttons {
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-top: 10px;
	}

	.buttons button {
		background-color: #f7f7f7;
		border-radius: 10px;
		padding: 20px;
		margin: 10px;
		font-size: 18px;
		font-weight: bold;
		cursor: pointer;
		box-shadow: 1px 1px 1px #dbdbdb;
		border: 1px solid black;
		transition: background-color 0.2s ease;
	}

	.buttons button:hover {
		background-color: #e5e5e5;
	}

	.buttons button:active {
		background-color: #d5d5d5;
	}

	.button-row {
		display: flex;
		flex-direction: row;
		width: 100%;
	}

	.operations {
		display: flex;
		justify-content: space-evenly;
		width: 100%;
	}

	.operations button {
		width: 25%;
		height: 40px;
		display: flex;
		align-items: center;
		justify-content: center;
		margin: 5px;
		font-size: 30px;
	}

	.numbers {
		width: 75%;
	}

	.numbers > div {
		display: flex;
		justify-content: space-evenly;
	}

	.numbers button {
		width: 32%;
		height: 40px;
		display: flex;
		align-items: center;
		justify-content: center;
		margin: 5px 5px 5px 5px;
		font-size: 30px;
	}

	.clear {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		width: 25%;
	}

	.clear button {
		display: flex;
		width: 100%;
		height: 100px;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 20px;
	}

	.equal {
		width: 100%;
		display: flex;
		margin: 0;
		padding: 0;
	}

	.equal > button {
		width: 100%;
		height: 100%;
		color: #000000;
		font-size: 30px;
		box-shadow: 1px 1px 1px #000000;
	}

	@media (width <= 480px) {
		#output-div input {
			width: 90%;
		}
	}
</style>
