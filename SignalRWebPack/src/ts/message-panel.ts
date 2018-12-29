import * as signalR from "@aspnet/signalr";
import * as signalRMsgPack from "@aspnet/signalr-protocol-msgpack";

interface MessageDto {
    UserName: string;
    Message: string;
}

export class MessagePanel {
    private divMessages: HTMLDivElement;
    private tbMessage: HTMLInputElement;
    private btnSend: HTMLButtonElement;
    private doc: Document;
    private readonly userID = new Date().getTime();
    private readonly connection = new signalR.HubConnectionBuilder()
        .withUrl("/hub")
        .withHubProtocol(new signalRMsgPack.MessagePackHubProtocol())
        .build();

    constructor(document: Document) {

        this.doc = document;
        this.divMessages = document.querySelector("#divMessages");
        this.tbMessage = document.querySelector("#tbMessage");
        this.btnSend = document.querySelector("#btnSend");

        this.connection.start().catch(err => this.doc.write(err));

        this.connection.on("messageToClient", (data: MessageDto) => {
            console.log('connection.on START');

            let messageContainer = this.doc.createElement("div");

            messageContainer.innerHTML =
                `<div class="message-author">${data.UserName}</div><div>${data.Message}</div>`;

            this.divMessages.appendChild(messageContainer);
            this.divMessages.scrollTop = this.divMessages.scrollHeight;

            console.log('connection.on END');

        });

        this.tbMessage.addEventListener("keyup", (e: KeyboardEvent) => {
            if (e.keyCode === 13) {
                this.sendMessage();
            }
        });

        this.btnSend.addEventListener("click", this.sendMessage.bind(this));
    }

    private sendMessage() {
        this.connection.send("messageToServer", this.userID, this.tbMessage.value)
        .then(() => this.tbMessage.value = "");

}

}

