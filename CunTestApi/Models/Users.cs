using System.ComponentModel.DataAnnotations;

namespace CunTestApi.Models
{
    public class Users
    {
        public int UsersId { get; set; }
        public string UserName { get; set; }
        public string UserEmail { get; set; }
        public string UserPassword { get; set; }
    }
}

