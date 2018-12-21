/// <reference path="./references.ts" />

import "./css/main.css";
import { SuperGrid, ISuperGridConfig, ICellContent } from "./ts/grid";
import { MessagePanel } from "./ts/message-panel";
import { VirtualList } from "./js/vlist";

const TOTAL_ROWS: number = 100000;


let panel = new MessagePanel(document);

let grid = new SuperGrid(buildGridConfig());
document.body.appendChild(grid.getContainer());


function buildGridConfig(): ISuperGridConfig {
    let config = <ISuperGridConfig>{};
    config.gridWidth = window.innerWidth;
    config.gridHeight = window.innerHeight;
    config.rowHeight = 30;
    config.cells = new Array<ICellContent>(TOTAL_ROWS);

    for (let i: number = 0; i < TOTAL_ROWS; i++) {
        config.cells[i] = <ICellContent>{ text: "row " + String(i) };
    }

    return config;
}



