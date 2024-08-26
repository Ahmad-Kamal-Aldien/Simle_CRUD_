using Microsoft.EntityFrameworkCore;
using Products.Data;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.


builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<ApplicationDbContext>(options=>options.UseSqlServer(builder.Configuration.GetConnectionString("ConnPro")));




builder.Services.AddCors(cors => cors.AddPolicy("CRSPLO", b =>
{
    b.AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin();
    //b.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader();

}));




var app = builder.Build();


// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseAuthorization();
app.UseDeveloperExceptionPage();

app.UseCors("CRSPLO");
app.MapControllers();

app.Run();
