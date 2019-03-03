using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;

namespace SignalRWebPack.Hubs
{
    public class MessageDto
    {
        public string UserName { get; set; }
        public string Message { get; set; }
    }

    public class ChatHub : Hub
    {
        private readonly InboundQueue _inboundQueue;

        public ChatHub(InboundQueue queue)
        {
            _inboundQueue = queue;
        }

        public async Task PanelUserAction(string username, string message)
        {
            await Clients.All.SendAsync("panelUserActionAck", new MessageDto { UserName = username, Message = message } );
        }

        public async Task GridScrolled(string topRow)
        {
            _inboundQueue.Enqueue(new InboundMessage{ Message=topRow});
            await Clients.All.SendAsync("gridScrolledAck", 1, 1, "value");
        }
    }
}