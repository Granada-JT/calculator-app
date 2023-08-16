<script lang="ts">
    let total: number = 0;
    let consoleValue: string = "";
    let state: string | null = null;

    function setCharacters(value: string | number): void {
        if (consoleValue === "0" || state === "equal") {
        consoleValue = "";
        }
        if (state === "equal") {
        state = null;
        }
        if (value === "C") {
        total = 0;
        state = null;
        consoleValue = "";
        return;
        }
        consoleValue += value.toString();
        console.log(consoleValue)
    }

    async function getEquation() {

        const equation = consoleValue
        console.log(equation)

        await fetch('api/calculate', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ equation })
        });

    }

</script>
  
  <style>
    .calculator {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 300px;
      border: 1px solid #eee;
      box-shadow: 2px 2px 2px #eee;
      padding: 10px;
      background-color: black;
    }
    .calculator input {
      width: 100%;
      padding: 20px 20px 20px -1px;
      outline: none;
      text-align: right;
      font-size: 20px;
    }
    .calculator .buttons {
      display: flex;
      flex-wrap: wrap;
    }
    .calculator .buttons .operations {
      display: flex;
      justify-content: space-between;
      width: 100%;
    }
    .calculator .buttons .operations button {
      width: 24%;
    }
    .calculator .buttons .numbers {
      width: 75%;
    }
    .calculator .buttons .numbers > div {
      display: flex;
      justify-content: space-between;
    }
    .calculator .buttons .numbers > div button {
      width: 32%;
    }
    .calculator .equal {
      flex: 1;
    }
    .calculator .equal button {
      margin-left: 5%;
      width: 95%;
      height: 95%;
      background: #00acee;
      color: #eee;
    }
    .calculator button {
      outline: none;
    }
  </style>
  
  <div class="calculator">
    <input type="text" bind:value="{consoleValue}" readonly={true} name="equation" />
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
          <button on:click={() => { setCharacters('C'); }}>
            C
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
  