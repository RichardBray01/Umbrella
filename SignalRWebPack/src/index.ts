import "./css/main.css";
import * as signalR from "@aspnet/signalr";
import * as Konva from "konva";

const divMessages: HTMLDivElement = document.querySelector("#divMessages");
const tbMessage: HTMLInputElement = document.querySelector("#tbMessage");
const btnSend: HTMLButtonElement = document.querySelector("#btnSend");
const divCanvas: HTMLDivElement = document.querySelector("#divCanvas");

const username = new Date().getTime();

const connection = new signalR.HubConnectionBuilder()
    .withUrl("/hub")
    .build();

connection.start().catch(err => document.write(err));

connection.on("messageReceived", (username: string, message: string) => {
    console.log('connection.on START');

    let messageContainer = document.createElement("div");

    messageContainer.innerHTML =
        `<div class="message-author">${username}</div><div>${message}</div>`;

    divMessages.appendChild(messageContainer);
    divMessages.scrollTop = divMessages.scrollHeight;
    showGrid();

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

function showGrid() {
    var WIDTH = 3000;
    var HEIGHT = 3000;
    var NUMBER = 200;

    var stage = new Konva.Stage({
        container: 'container',
        width: window.innerWidth,
        height: window.innerHeight,
    });

    var layer = new Konva.Layer();
    stage.add(layer);

    function generateNode() {
        return new Konva.Circle({
            x: WIDTH * Math.random(),
            y: HEIGHT * Math.random(),
            radius: 50,
            fill: 'red',
            stroke: 'black'
        });
    }

    for (var i = 0; i < NUMBER; i++) {
        layer.add(generateNode());
    }
    layer.draw();

    var scrollContainer = document.getElementById('scroll-container');
    scrollContainer.addEventListener('scroll', function () {
        var dx = scrollContainer.scrollLeft;
        var dy = scrollContainer.scrollTop;
        stage.container().style.transform = 'translate(' + dx + 'px, ' + dy + 'px)';
        stage.x(-dx);
        stage.y(-dy);
        stage.batchDraw();
    });
}

function paintCanvas() {
    // first we need to create a stage
    var stage = new Konva.Stage({
        container: 'divCanvas',   // id of container <div>
        width: 500,
        height: 500
    });

    // then create layer
    var layer = new Konva.Layer();

    // create our shape
    var circle = new Konva.Circle({
        x: stage.getWidth() / 2,
        y: stage.getHeight() / 2,
        radius: 70,
        fill: 'yellow',
        stroke: 'black',
        strokeWidth: 4
    });

    // add the shape to the layer
    layer.add(circle);

    // add the layer to the stage
    stage.add(layer);

    // draw the image
    layer.draw();
}