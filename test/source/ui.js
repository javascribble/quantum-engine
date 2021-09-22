export class UI extends Quantum {

}

const ui = `
<style>
    .ui {
        position: absolute;
    }

    #menuUI {
        top: 0;
        right: 0;
    }

    #gameUI {
        top: 0;
        left: 0;
    }
</style>
<button id="menuUI" class="ui">menu</button>
<button id="gameUI" class="ui">game</button>
`;

UI.define('game-ui', ui);