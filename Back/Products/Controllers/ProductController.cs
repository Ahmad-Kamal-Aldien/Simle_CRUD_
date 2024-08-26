using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Products.Data;
using Products.Models;

namespace Products.Controllers
{
    //192.168.56.1/api/Product/GetAll

    [Route("api/Product")]
    [ApiController]

    [EnableCors("CRSPLO")]
    public class ProductController : ControllerBase
    {
        private readonly ApplicationDbContext applicationDbContext;

        public ProductController(ApplicationDbContext _applicationDbContext)
        {
            this.applicationDbContext = _applicationDbContext;
        }
        [HttpGet("GetAll")]
        public IActionResult GetAll()
        {
            try
            {
                //Include To Get Name

                return Ok(applicationDbContext.Products.Include(x=>x.Category).ToList());
            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }
        }
        [HttpGet("GetOne/{id:int}")]
        public IActionResult GetOne(int id)
        {
            try
            {
                //var result = applicationDbContext.Products.Include(x=>x.Category).Find(id);
                var result = applicationDbContext.Products.Include(x => x.Category).FirstOrDefault(x=>x.Id==id);

                return Ok(result);
            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }
        }

        [HttpPost("Add")]
        public IActionResult Add([FromBody]Product pro)
        {
            try
            {
                if(pro != null) {
                    applicationDbContext.Products.Add(pro);
                    applicationDbContext.SaveChanges();

                }
                return Ok();

            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }
        }


        [HttpPut("Edit/{id:int}")]
        public IActionResult Edit(int id, [FromBody] Product pro)
        {
            try
            {
                //var result = applicationDbContext.Products.Find(id);
                var result = applicationDbContext.Products.FirstOrDefault(x=>x.Id==id);
                if(result != null)
                {
                    result.Name = pro.Name;
                    result.Total = pro.Total;
                    result.price = pro.price;
                    result.Quantity = pro.Quantity;
                    result.Discount = pro.Discount;
                    result.CategoryId = pro.CategoryId;
                    applicationDbContext.Products.Update(result);
                    applicationDbContext.SaveChanges();

                    //applicationDbContext.Entry(cat).State=Microsoft.EntityFrameworkCore.EntityState.Modified;
                    //applicationDbContext.SaveChanges();
                    return Ok(result);

                }
                return BadRequest();
            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }
        }

        [HttpDelete("Delete/{id:int}")]
        public IActionResult Delete(int id)
        {
            try
            {
                var pro = applicationDbContext.Products.FirstOrDefault(i => i.Id == id);
                if (pro != null)
                {
                    applicationDbContext.Products.Remove(pro);
                    applicationDbContext.SaveChanges();
                    return Ok();

                }
                return BadRequest();
            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }
        }
    }
}
