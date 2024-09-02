
using Microsoft.EntityFrameworkCore;

namespace ReactStudentProject.Server.Models
{
    public class AppDBContext : DbContext
    {
        public AppDBContext(DbContextOptions<AppDBContext> options) : base(options)
        {

        }

        public DbSet<StudentD> StudentDs { get; set; }
    }
}
