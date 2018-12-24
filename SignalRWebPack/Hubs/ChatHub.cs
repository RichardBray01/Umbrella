using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;

namespace SignalRWebPack.Hubs
{
    public class ChatHub : Hub
    {
        public async Task NewMessage(string username, string message)
        {
            await Clients.All.SendAsync("messageReceived", username, message);
        }

        public async Task GridScrolled(string topRow)
        {
            await Clients.All.SendAsync("gridUpdate", 1, 1, "value");
        }
    }
}