using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace SignalRWebPack.Models
{
    public partial class UmbrellaContext : DbContext
    {
        public UmbrellaContext()
        {
        }

        public UmbrellaContext(DbContextOptions<UmbrellaContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Asset> Asset { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseSqlServer("Server=NUC-RICHARD;Database=Umbrella;Trusted_Connection=True;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasAnnotation("ProductVersion", "2.2.0-rtm-35687");

            modelBuilder.Entity<Asset>(entity =>
            {
                entity.HasKey(e => e.AssetId)
                    .HasName("PK__Asset__43492353EB26DC6B")
                    .ForSqlServerIsClustered(false);

                entity.HasAnnotation("SqlServer:MemoryOptimized", true);

                entity.Property(e => e.AvgVolume3m)
                    .HasMaxLength(8)
                    .IsUnicode(false);

                entity.Property(e => e.Beta).HasColumnType("smallmoney");

                entity.Property(e => e.Exchange)
                    .IsRequired()
                    .HasMaxLength(14)
                    .IsUnicode(false);

                entity.Property(e => e.MarketCap)
                    .HasMaxLength(10)
                    .IsUnicode(false);

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Peratio)
                    .HasColumnName("PEratio")
                    .HasColumnType("smallmoney");

                entity.Property(e => e.PriceChange).HasColumnType("smallmoney");

                entity.Property(e => e.PriceChangePercent)
                    .HasMaxLength(8)
                    .IsUnicode(false);

                entity.Property(e => e.PriceHigh).HasColumnType("smallmoney");

                entity.Property(e => e.PriceLast).HasColumnType("smallmoney");

                entity.Property(e => e.PriceLow).HasColumnType("smallmoney");

                entity.Property(e => e.Revenue)
                    .HasMaxLength(10)
                    .IsUnicode(false);

                entity.Property(e => e.Symbol)
                    .IsRequired()
                    .HasMaxLength(10)
                    .IsUnicode(false);

                entity.Property(e => e.Updated).HasColumnType("datetime");

                entity.Property(e => e.Volume)
                    .HasMaxLength(8)
                    .IsUnicode(false);
            });
        }
    }
}
