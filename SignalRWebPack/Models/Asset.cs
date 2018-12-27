using System;
using System.Collections.Generic;

namespace SignalRWebPack.Models
{
    public partial class Asset
    {
        public int AssetId { get; set; }
        public string Name { get; set; }
        public string Symbol { get; set; }
        public string Exchange { get; set; }
        public decimal? PriceLast { get; set; }
        public decimal? PriceHigh { get; set; }
        public decimal? PriceLow { get; set; }
        public decimal? PriceChange { get; set; }
        public string PriceChangePercent { get; set; }
        public string Volume { get; set; }
        public DateTime Updated { get; set; }
        public string AvgVolume3m { get; set; }
        public string MarketCap { get; set; }
        public string Revenue { get; set; }
        public decimal? Peratio { get; set; }
        public decimal? Beta { get; set; }
    }
}
