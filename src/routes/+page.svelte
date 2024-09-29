<script lang="ts">
	import { onMount } from 'svelte';
	import { SvelteToast, toast } from '@zerodevx/svelte-toast';

	let equationValue = '';
	let equationInput: HTMLInputElement;
	let answer: number | undefined | string;
	let showCopyBtns = false;

	function setCharacters(value: string | number): void {
		if (answer !== undefined) {
			equationValue = '';
			answer = undefined;
			showCopyBtns = false;
		}
		if (value === 'C') {
			equationValue = '';
			return;
		}
		if (value === 'DEL') {
			equationValue = equationValue.slice(0, -1);
			return;
		}
		equationValue += value.toString();
	}

	async function getEquation() {
		const equation = equationValue.replace(/×/g, '*').replace(/÷/g, '/');

		if (equationValue === '') {
			return false;
		}

		if (!/^(\d*\.?\d*)([+\-*/](\d*\.?\d*))*$/.test(equation)) {
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
				showCopyBtns = false;
			} else {
				showCopyBtns = true;
			}

			return;
		} else {
			return false;
		}
	}

	function handleCopyEquation() {
		if (typeof equationValue === 'string') {
			navigator.clipboard.writeText(equationValue);
			toast.pop();
			toast.push('Equation Copied Successfully!', {
				theme: {
					'--toastColor': '#000000',
					'--toastBackground': '#FFFFFF',
					'--toastBarHeight': 0,
					'--toastBorderRadius': '10px'
				},
				classes: ['toast'],
				dismissable: false
			});
		}
	}

	function handleCopyAnswer() {
		if (typeof answer === 'number') {
			navigator.clipboard.writeText(answer.toString());
			toast.pop();
			toast.push('Answer Copied Successfully!', {
				theme: {
					'--toastColor': '#000000',
					'--toastBackground': '#FFFFFF',
					'--toastBarHeight': 0,
					'--toastBorderRadius': '10px'
				},
				classes: ['toast'],
				dismissable: false
			});
		}
	}

	onMount(() => {
		const currentYear = new Date().getFullYear();
		const copyright = document.getElementById('copyright');
		if (copyright) {
			copyright.innerText = `Crafted with Love by Jomar Granada © ${currentYear}. All Rights Reserved.`;
		}
	});

	function scrollToEnd(equationValue: string) {
		if (equationInput && equationValue) {
			equationInput.scrollLeft = equationInput.scrollWidth;
		}
	}

	$: scrollToEnd(equationValue);
</script>

<SvelteToast options={{ intro: { y: -192 } }} />
<div class="calculator">
	<div id="output-div">
		<input
			type="text"
			bind:value={equationValue}
			readonly={true}
			name="equation"
			style="overflow: hidden; white-space: nowrap; text-align: left;"
			bind:this={equationInput}
		/>
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
					setCharacters('×');
				}}
			>
				&times;
			</button>
			<button
				on:click={() => {
					setCharacters('÷');
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
		<div class="equal" class:equal-hide={showCopyBtns}>
			<button on:click={getEquation}> = </button>
		</div>
		<div class="copy-btns" class:copy-btns-show={showCopyBtns}>
			<button on:click={handleCopyEquation}>Copy Equation</button>
			<button on:click={handleCopyAnswer}>Copy Answer</button>
		</div>
	</div>
	<footer>
		<div>
			<div>
				<a href="https://granada-jt.github.io/web-developer-portfolio/" target="_blank">
					<img src="assets/images/jg-brand-nobg.png" alt="logo" id="logo" />
				</a>
				<a href="https://github.com/Granada-JT" target="_blank">
					<img src="assets/images/github2.svg" alt="github" />
				</a>
				<a href="https://www.linkedin.com/in/jomar-granada-a33604191/" target="_blank">
					<img src="assets/images/linkedin2.svg" class="w-100 socialsPics" alt="linkedin" />
				</a>
				<a href="mailto:jomart.granada@gmail.com" target="_blank" id="email">
					<img src="assets/images/envelope.svg" alt="email" />
				</a>
			</div>
			<p id="copyright">Crafted with Love by Jomar Granada © 2024. All Rights Reserved.</p>
		</div>
	</footer>
</div>

<style>
	:root {
		--toastContainerTop: 0;
		--toastContainerRight: auto;
		--toastContainerBottom: auto;
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

	:global(.toast) {
		box-shadow: 6px 6px 6px #000000;
		margin-top: 300px;
		border-radius: 10px;
		font-family: Arial, sans-serif;
		font-weight: 600;
		text-align: center;
	}

	.calculator {
		width: 100%;
		max-width: 600px;
		max-height: 500px;
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

	.equal-hide {
		display: none;
	}

	footer {
		display: flex;
		align-items: center;
		justify-content: center;
		margin-top: auto;
		position: absolute;
		bottom: 0;
		left: 0;
		width: 100%;
		text-align: center;
	}

	#logo {
		width: 40px;
		height: 40px;
		padding-right: 16px;
		border-right: 2px solid black;
	}

	#email {
		margin-top: 9px;
	}

	footer > div {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		width: 100%;
		max-width: 600px;
		height: 100px;
		margin: 20px;
		border-radius: 10px;
		font-family: Arial, sans-serif;
		font-size: 14px;
	}

	footer > div > div {
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 100%;
		max-width: 200px;
	}

	a > img {
		width: 30px;
		height: 30px;
		margin-top: 2px;
	}

	.copy-btns {
		display: none;
		width: 100%;
		height: 100%;
		font-size: 30px;
		margin: 0;
		padding: 0;
	}

	.copy-btns button {
		width: 100%;
		height: 76px;
		box-shadow: 1px 1px 1px #000000;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.copy-btns-show {
		display: flex;
	}

	@media (width <= 480px) {
		#output-div input {
			width: 90%;
		}

		footer {
			display: flex;
			align-items: center;
			justify-content: center;
			position: static;
			width: 100%;
			text-align: center;
			margin-top: 50px;
		}
	}

	@media (height <= 800px) {
		:global(.toast) {
			margin-top: 20px;
		}
	}

	@media (height >= 801px) and (height <= 1023px) {
		:global(.toast) {
			margin-top: 65px;
		}
	}

	@media (height >= 1024px) and (height <= 1280px) {
		:global(.toast) {
			margin-top: 180px;
		}
	}
</style>
