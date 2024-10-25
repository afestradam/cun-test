using CunTestApi.Data;
using CunTestApi.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace CunTestApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly UsersController _usersController;
        private readonly AppDbContext _context;

        public AuthController(AppDbContext context)
        {
            _context = context;
            _usersController = new UsersController(context);
        }

        // POST: api/auth/login
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequestDto loginRequest)
        {
            Users user;

            // Verifica si las credenciales coinciden con el usuario quemado (para pruebas)
            if (loginRequest.UserEmail == "devuser@mail.com" && loginRequest.UserPassword == "user12345")
            {
                // Usuario quemado para pruebas
                user = new Users
                {
                    UsersId = 1,  // ID quemado
                    UserName = "Dev User",  // Nombre quemado
                    UserEmail = "devuser@mail.com",
                    UserPassword = "user12345"
                };
            }
            else
            {
                var result = await _usersController.Login(loginRequest.UserEmail, loginRequest.UserPassword);

                if (result is UnauthorizedResult)
                {
                    return Unauthorized(new { response = 0, message = "Invalid email or password" });
                }

                if (result.Result is OkObjectResult okResult)
                {
                    var userResult = okResult.Value as UsersRequestDto;

                    if (userResult == null)
                    {
                        return Unauthorized(new { response = 0, message = "Invalid email or password" });
                    }

                    user = new Users
                    {
                        UsersId = userResult.UsersId,
                        UserName = userResult.UserName,
                        UserEmail = userResult.UserEmail
                    };
                }
                else
                {
                    return Unauthorized(new { response = 0, message = "Invalid email or password" });
                }
            }

            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes("58c1133e91c0f167d33520bd48c54084");  // Clave secreta
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
            new Claim(ClaimTypes.Name, user.UsersId.ToString())
                }),
                Expires = DateTime.UtcNow.AddHours(24),  // El token expira en 1 hora
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            var tokenString = tokenHandler.WriteToken(token);

            return Ok(new
            {
                response = new
                {
                    User = new
                    {
                        user.UsersId,
                        user.UserName,
                        user.UserEmail
                    }
                },
                message = "Login successful",
                token = tokenString
            });
        }



    }
}
