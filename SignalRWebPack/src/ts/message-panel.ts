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
    private readonly userID = new Date().getTime().toString();
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

        this.connection.on("panelUserActionAck", (data: MessageDto) => {
            console.log('panelUserActionAck START');

            let messageContainer = this.doc.createElement("div");

            messageContainer.innerHTML =
                `<div class="message-author">${data.UserName}</div><div>${data.Message}</div>`;

            this.divMessages.appendChild(messageContainer);
            this.divMessages.scrollTop = this.divMessages.scrollHeight;

            console.log('panelUserActionAck END');

        });

        this.connection.on("serverDataUpdate", (data: MessageDto) => {
            console.log('serverDataUpdate START');

            let messageContainer = this.doc.createElement("div");

            messageContainer.innerHTML =
                `<div class="message-author">${data.UserName}</div><div>${data.Message}</div>`;

            this.divMessages.appendChild(messageContainer);
            this.divMessages.scrollTop = this.divMessages.scrollHeight;

            console.log('serverDataUpdate END');

        });

        this.tbMessage.addEventListener("keyup", (e: KeyboardEvent) => {
            if (e.keyCode === 13) {
                this.sendMessage();
            }
        });

        this.btnSend.addEventListener("click", this.sendMessage.bind(this));
    }

    private sendMessage() {
        this.connection.send("panelUserAction", this.userID, this.tbMessage.value)
        .then(() => this.tbMessage.value = "");

}

}

