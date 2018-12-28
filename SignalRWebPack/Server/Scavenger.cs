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
        }
        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            while (!stoppingToken.IsCancellationRequested)
            {
                string hello = "timer";
                string buddy = "ticked";
                InboundMessage inbound;
                await _hubContext.Clients.All.SendAsync("messageReceived", hello, buddy);
                while(_inboundQueue.TryDequeue(out inbound))
                {
                    await _hubContext.Clients.All.SendAsync("messageReceived", inbound.Message);
                }

                await Task.Delay(5000);

                using (var context = new UmbrellaContext())
                {
                    var assets = context.Asset.ToList();
                    foreach (Asset a in assets)
                    {
                        Console.Write($"{a.Name}, {a.PriceLast}, {a.Volume}");
                    }
                }
            }
        }
    }
}