/// <reference path="./references.ts" />

import "./css/main.css";
import { SuperGrid, ISuperGridConfig, ICellContent } from "./ts/grid";
import { MessagePanel } from "./ts/message-panel";
import { VirtualList } from "./js/vlist";

const TOTAL_ROWS: number = 100000;


let panel = new MessagePanel(document);

let grid = new SuperGrid(SuperGrid.setupConfig());
document.body.appendChild(grid.getContainer());


