
namespace CunTestApi.Models
{
   public class UpdateUserRequestDto
    {
        public int UsersId { get; set; }
        public string UserName { get; set; }
        public string UserEmail { get; set; }
        public string UserPassword { get; set; }
        public bool ShouldEncryptPassword { get; set; }
    }
}