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
        private readonly IHubContext<ChatHub> _hubContext;
        private readonly ILogger<Scavenger> _logger;
        public Scavenger(IHubContext<ChatHub> hubContext, ILogger<Scavenger> logger)
        {
            _hubContext = hubContext;
            _logger = logger;
        }
        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            while (!stoppingToken.IsCancellationRequested)
            {
                string hello = "hello";
                string buddy = "buddy";
                await _hubContext.Clients.All.SendAsync("messageReceived", hello, buddy);

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