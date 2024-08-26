using System.ComponentModel.DataAnnotations.Schema;

namespace Products.Models
{
    public class Product
    {
        public int Id { get; set; }
        public string Name { get; set; }=string.Empty;

        public int Quantity { get; set; }

        public decimal Discount { get; set; }
        public decimal price { get; set; }
        public decimal Total { get; set; }

        //ask Quesion
        public int CategoryId { get; set; }
        [ForeignKey("CategoryId")]
        public Category? Category { get; set; }
    }
}
