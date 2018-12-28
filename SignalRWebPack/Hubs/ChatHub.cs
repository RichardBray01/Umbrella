using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;

namespace SignalRWebPack.Hubs
{
    public class ChatHub : Hub
    {
        private readonly InboundQueue _inboundQueue;

        public ChatHub(InboundQueue queue)
        {
            _inboundQueue = queue;
        }

        public async Task NewMessage(string username, string message)
        {
            await Clients.All.SendAsync("messageReceived", username, message);
        }

        public async Task GridScrolled(string topRow)
        {
            _inboundQueue.Enqueue(new InboundMessage{ Message=topRow});
            await Clients.All.SendAsync("gridUpdate", 1, 1, "value");
        }
    }
}