/// <reference path="./references.ts" />

import "./css/main.css";
import * as signalR from "@aspnet/signalr";
import { SuperGrid, ISuperGridConfig, ICellContent } from "./ts/grid";
import { VirtualList } from "./js/vlist";

const TOTAL_ROWS: number = 100000;

var list = new VirtualList({
    h: window.innerHeight,
    itemHeight: 30,
    totalRows: 100000,
    generatorFn: function (row) {
        var el = document.createElement("div");
        el.innerHTML = "<p>ITEM " + row + "</p>";
        return el;
    }
});

let grid = new SuperGrid(buildGridConfig());
document.body.appendChild(grid.getContainer());

list.container.classList.add("container");
document.body.appendChild(list.container);


const divMessages: HTMLDivElement = document.querySelector("#divMessages");
const tbMessage: HTMLInputElement = document.querySelector("#tbMessage");
const btnSend: HTMLButtonElement = document.querySelector("#btnSend");

const username = new Date().getTime();

const connection = new signalR.HubConnectionBuilder()
    .withUrl("/hub")
    .build();

connection.start().catch(err => document.write(err));




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

connection.on("messageReceived", (username: string, message: string) => {
    console.log('connection.on START');

    let messageContainer = document.createElement("div");

    messageContainer.innerHTML =
        `<div class="message-author">${username}</div><div>${message}</div>`;

    divMessages.appendChild(messageContainer);
    divMessages.scrollTop = divMessages.scrollHeight;

    console.log('connection.on END');

});


tbMessage.addEventListener("keyup", (e: KeyboardEvent) => {
    if (e.keyCode === 13) {
        send();
    }
});

btnSend.addEventListener("click", send);

function send() {
    connection.send("newMessage", username, tbMessage.value)
        .then(() => tbMessage.value = "");
}

