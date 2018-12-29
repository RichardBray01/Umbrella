using SignalRWebPack.Hubs;
using SignalRWebPack.Models;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using System.Linq;
using System;

namespace SignalRWebPack
{
    public class Scavenger : BackgroundService
    {
        private readonly InboundQueue _inboundQueue;
        private readonly IHubContext<ChatHub> _hubContext;
        private readonly ILogger<Scavenger> _logger;
        public Scavenger(IHubContext<ChatHub> hubContext, ILogger<Scavenger> logger, InboundQueue queue)
        {
            _hubContext = hubContext;
            _logger = logger;
            _inboundQueue = queue;

            using (var context = new UmbrellaContext())
            {
                var assets = context.Asset.ToList();
                foreach (Asset a in assets)
                {
                    Console.Write($"{a.Name}, {a.PriceLast}, {a.Volume}");
                }
            }

        }

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            while (!stoppingToken.IsCancellationRequested)
            {
                while (_inboundQueue.TryDequeue(out InboundMessage inbound))
                {
                    await _hubContext.Clients.All.SendAsync("messageToClient", new MessageDto { UserName = "username", Message = inbound.Message });
                }

                await Task.Delay(5000);

                await _hubContext.Clients.All.SendAsync("messageToClient", new MessageDto { UserName = "username", Message = "message" });

            }
        }
    }
}