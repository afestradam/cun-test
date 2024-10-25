using CunTestApi.Data;
using CunTestApi.Models;
using CunTestApi.Helpers;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;
using Microsoft.Data.SqlClient;
using Microsoft.AspNetCore.Cors;

namespace CunTestApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]

    public class UsersController : ControllerBase
    {
        private readonly AppDbContext _context;

        public UsersController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/users
        [HttpGet]
        public async Task<IActionResult> GetUsers()
        {
            var users = await _context.Database
            .SqlQueryRaw<UsersRequestDto>("EXEC GetUsers")
            .ToListAsync();

            if (users == null || users.Count == 0)
            {
                return Ok(new { response = 0, message = "No data found!" });
            }

            return Ok(new { response = users, message = "Data retrieved successfully!" });
        }

        // GET: api/users/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<Users>> GetUser(int id)
        {
            var user = _context.Users
            .FromSqlRaw("EXEC GetUserById @UserId", new SqlParameter("@UserId", id))
            .AsEnumerable() 
            .FirstOrDefault();

            if (user == null)
            {
                return Ok(new { response = 0, message = "User not found!" });
            }

            return Ok(new { response = user, message = "User retrieved successfully!" });
        }

        // POST: api/users
        [EnableCors("AllowAllOrigins")]
        [HttpPost]
        public async Task<ActionResult<Users>> CreateUser(Users user)
        {

            await _context.Database.ExecuteSqlRawAsync(
               "EXEC InsertUser @UserName, @UserEmail, @UserPassword",
               new SqlParameter("@UserName", user.UserName),
               new SqlParameter("@UserEmail", user.UserEmail),
               new SqlParameter("@UserPassword", PasswordHasher.HashPasswordSHA256(user.UserPassword))
           );

            return Ok(new { response = 1, message = "User created successfully!" });
        }

        // PUT: api/users/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUser(int id, [FromBody] UpdateUserRequestDto userRequest)
        {
            if (id != userRequest.UsersId)
            {
                return BadRequest(new { response = 0, message = "User ID mismatch!" });
            }

            var existingUser = await _context.Users.FindAsync(id);
            if (existingUser == null)
            {
                return Ok(new { response = 0, message = "User not found!" });
            }

            string passwordToSave = userRequest.ShouldEncryptPassword ?
            PasswordHasher.HashPasswordSHA256(userRequest.UserPassword) :
            userRequest.UserPassword;

            await _context.Database.ExecuteSqlRawAsync(
                "EXEC UpdateUser @UsersId, @UserName, @UserEmail, @UserPassword",
                new SqlParameter("@UsersId", userRequest.UsersId),
                new SqlParameter("@UserName", userRequest.UserName),
                new SqlParameter("@UserEmail", userRequest.UserEmail),
                new SqlParameter("@UserPassword", passwordToSave)
            );

            return Ok(new { response = 1, message = "User updated successfully!" });
        }

        // DELETE: api/users/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            var product = await _context.Users.FindAsync(id);
            if (product == null)
            {
                return Ok(new { response = 0, message = "User not found!" });
            }

            await _context.Database.ExecuteSqlRawAsync(
                "EXEC DeleteUser @UsersId",
                new SqlParameter("@UsersId", id)
            );

            return Ok(new { response = 1, message = "User deleted successfully!" });
        }

        public async Task<ActionResult<UsersRequestDto>> Login(string userEmail, string userPassword)
        {
            var users = await _context.Database
            .SqlQueryRaw<UsersRequestDto>("EXEC UserLogin @UserEmail, @UserPassword",
            new SqlParameter("@UserEmail", userEmail),
            new SqlParameter("@UserPassword", PasswordHasher.HashPasswordSHA256(userPassword)))
            .ToListAsync();

            if (users == null || users.Count == 0)
            {
                return Unauthorized();
            }

            var user = users.FirstOrDefault();

            return Ok(user); 
        }
    }
}