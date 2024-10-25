using System.Security.Cryptography;
using System.Text;

namespace CunTestApi.Helpers
{
    public class PasswordHasher
    {
        public static string HashPasswordSHA256(string password)
        {
            using (SHA256 sha256Hash = SHA256.Create())
            {
                byte[] bytes = sha256Hash.ComputeHash(Encoding.UTF8.GetBytes(password));

                StringBuilder builder = new StringBuilder();
                foreach (var byteValue in bytes)
                {
                    builder.Append(byteValue.ToString("x2"));
                }
                return builder.ToString();
            }
        }

        public static bool VerifyPasswordSHA256(string enteredPassword, string storedHash)
        {
            string hashOfInput = HashPasswordSHA256(enteredPassword);

            return StringComparer.OrdinalIgnoreCase.Compare(hashOfInput, storedHash) == 0;
        }
    }
}
