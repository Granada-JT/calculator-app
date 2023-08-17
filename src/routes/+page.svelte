<script lang="ts">
  let consoleValue: string = "";
  let answer: number | undefined;

  function setCharacters(value: string | number): void {
    if (consoleValue === "0" || answer !== undefined) {
      // Clear the consoleValue and answer variables
      consoleValue = "";
      answer = undefined;
    }
    if (value === "C") {
      consoleValue = "";
      return;
    }
    if (value === "DEL") {
      consoleValue = consoleValue.slice(0, -1);
      return;
    }
    consoleValue += value.toString();
    console.log(consoleValue);
  }

  async function getEquation() {
    const equation = consoleValue;

    const response = await fetch('api/calculate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ equation })
    });

    if (response.ok) {
      const data = await response.json();
      const result = data.result; // Extract the result from the response
      answer = result;
      console.log(answer);
      console.log(result); // Display the result in the console or update your UI
    } else {
      console.log('Error:', response.statusText);
    }
  }
</script>
  
<style>
  .calculator {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 600px;
    height: 400px;
    border: 1px solid #eee;
    box-shadow: 2px 2px 2px #eee;
    padding: 10px;
  }
  .calculator input {
    width: 93.8%;
    padding: 20px 20px 20px -5px;
    margin: 20px 0px -20px 15px;
    outline: none;
    text-align: right;
    font-size: 20px;
    border: none;
  }

  #input1 {
    text-align: left;
  }

  .calculator .buttons {
    display: flex;
    flex-wrap: wrap;
    margin-top: 50px;
  }
  .calculator .buttons .operations {
    display: flex;
    justify-content: space-evenly;
    width: 100%;
    margin: 0 10px 0 10px;
  }
  .calculator .buttons .operations button {
    width: 25%;
    height: 40px; /* Adjust the height as needed */
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 5px 5px 5px 5px;
  }
  .calculator .buttons .numbers {
    width: 75%;
  }
  .calculator .buttons .numbers > div {
    display: flex;
    justify-content: space-evenly;
    margin: 0 10px 0 10px;
  }
  .calculator .buttons .numbers > div button {
    width: 32%;
    height: 40px; /* Adjust the height as needed */
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 5px 5px 5px 5px;
  }

  .calculator .buttons .clear > div {
    display: flex;
    flex-direction: column; /* Stack the buttons vertically */
    align-items: center; /* Center the buttons horizontally */
    margin: 0 5px 0 0px;
  }

  .calculator .buttons .clear > div button {
    display: inline-block;
    width: 100%;
    height: 100px; /* Adjust the height as needed */
    display: flex;
    align-items: center;
    justify-content: center;
  }


  .calculator .equal {
    flex: 1;
    margin: 0 10px 0 10px;
  }
  .calculator .equal button {
    width: 100%;
    height: 100%;
    color: #000000;
    margin: 0 0px 0 -5px;
  }

</style>
  
<div class="calculator">
  <input id="input1" type="text" bind:value="{consoleValue}" readonly={true} name="equation" />
  <input id="input2" type="text" bind:value="{answer}" readonly={true} name="equation" />
  <div class="buttons">
    <div class="operations">
      <button on:click={() => { setCharacters('+'); }}>
        +
      </button>
      <button on:click={() => { setCharacters('-'); }}>
        -
      </button>
      <button on:click={() => { setCharacters('*'); }}>
        &times;
      </button>
      <button on:click={() => { setCharacters('/'); }}>
        &divide;
      </button>
    </div>
    <div class="numbers">
      <div>
        <button on:click={() => { setCharacters(7); }}>
          7
        </button>
        <button on:click={() => { setCharacters(8); }}>
          8
        </button>
        <button on:click={() => { setCharacters(9); }}>
          9
        </button>
      </div>
      <div>
        <button on:click={() => { setCharacters(4); }}>
          4
        </button>
        <button on:click={() => { setCharacters(5); }}>
          5
        </button>
        <button on:click={() => { setCharacters(6); }}>
          6
        </button>
      </div>
      <div>
        <button on:click={() => { setCharacters(1); }}>
          1
        </button>
        <button on:click={() => { setCharacters(2); }}>
          2
        </button>
        <button on:click={() => { setCharacters(3); }}>
          3
        </button>
      </div>
      <div>
        <button on:click={() => { setCharacters(0); }}>
          0
        </button>
        <button on:click={() => { setCharacters('.'); }}>
          .
        </button>
      </div>
    </div>
    <div class="clear">
      <div>
        <button on:click={() => { setCharacters('C'); }}>
          AC
        </button>
        <button on:click={() => { setCharacters('DEL'); }}>
          DEL
        </button>
      </div>
    </div>
    <div class="equal">
      <button on:click={getEquation}>
        =
      </button>
    </div>
  </div>
</div>