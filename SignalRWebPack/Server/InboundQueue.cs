using System.Collections.Concurrent;

namespace SignalRWebPack
{
    public class InboundMessage 
    {
        public string Message  { get; set; } 
    }

    public class InboundQueue : ConcurrentQueue<InboundMessage>
    {
        public InboundQueue()
        {
        }
    }
}
