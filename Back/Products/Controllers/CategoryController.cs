using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Products.Data;
using Products.Models;

namespace Products.Controllers
{
    
    [Route("api/Category")]
    [ApiController]
    [EnableCors("CRSPLO")]
    public class CategoryController : ControllerBase
    {
        private readonly ApplicationDbContext applicationDbContext;

        public CategoryController(ApplicationDbContext _applicationDbContext)
        {
            this.applicationDbContext = _applicationDbContext;
        }
        [HttpGet("GetAll")]
        public IActionResult GetAll()
        {
            try
            {
              
                return Ok(applicationDbContext.Categories.ToList());
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
                var result = applicationDbContext.Categories.Find(id);
                return Ok(result);
            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }
        }
        [HttpPost("Add")]
        public IActionResult Add([FromBody]Category cat)
        {
            try
            {
                applicationDbContext.Categories.Add(cat);
                applicationDbContext.SaveChanges();
                return Ok();
            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }
        }

        [HttpPut("Edit/{id:int}")]
        public IActionResult Edit(int id,[FromBody]Category cat)
        {
            try
            {
                var result = applicationDbContext.Categories.Find(id);
                result.Name= cat.Name;
                applicationDbContext.Categories.Update(result);
                applicationDbContext.SaveChanges();

                //applicationDbContext.Entry(cat).State=Microsoft.EntityFrameworkCore.EntityState.Modified;
                //applicationDbContext.SaveChanges();
                return Ok();
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
                var cat = applicationDbContext.Categories.Find(id);
                applicationDbContext.Categories.Remove(cat);
                applicationDbContext.SaveChanges();
                return Ok();
            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }
        }
    }
}
