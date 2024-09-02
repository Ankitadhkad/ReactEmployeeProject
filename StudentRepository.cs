using Microsoft.EntityFrameworkCore;
using ReactStudentProject.Server.ViewModels;
using System;
using System.Net;
using System.Reflection;

namespace ReactStudentProject.Server.Models
{
    public class StudentRepository
    {

        private readonly AppDBContext _appDBContext;
     

        public StudentRepository(AppDBContext appDBContext)
        {
            _appDBContext = appDBContext;
        }

        public async Task<StudentD> AddStudentAsync(StudentRequest studentRequest)
        {
            var studentD = new StudentD
            {
                FullName = studentRequest.FullName,
                Mobile = studentRequest.Mobile,
                Email = studentRequest.Email,
                Age = studentRequest.Age,
                Bloodgroup=studentRequest.Bloodgroup,
                Address = studentRequest.Address,
                Gender= studentRequest.Gender,

            };
            await _appDBContext.StudentDs.AddAsync(studentD);
            await _appDBContext.SaveChangesAsync();
            return studentD;
        }
        public async Task<List<StudentD>> GetAllStudentDsAsync()
        {
            return await _appDBContext.StudentDs.ToListAsync();
        }
        public async Task<StudentD> GetStudentDByIdAsync(int id)
        {
            return await _appDBContext.StudentDs.FindAsync(id);
        }
        public async Task UpdateStudentDAsync(int id, StudentRequest studentRequest)
        {
            var studentD = await _appDBContext.StudentDs.FindAsync(id);
            if (studentD == null)
            {
                throw new Exception("studentD not found");
            }
            studentD.FullName = studentRequest.FullName;
            studentD.Mobile = studentRequest.Mobile;
            studentD.Email = studentRequest.Email;
            studentD.Age = studentRequest.Age;
            studentD.Bloodgroup = studentRequest.Bloodgroup;
            studentD.Address = studentRequest.Address;
            studentD.Gender = studentRequest.Gender;

            await _appDBContext.SaveChangesAsync();
        }

        public async Task DeleteStudentDAsync(int id)
        {
            try
            {
                var studentD = await _appDBContext.StudentDs.FindAsync(id);
                if (studentD == null)
                {
                    throw new Exception("studentD not found");
                }
                _appDBContext.StudentDs.Remove(studentD);
                await _appDBContext.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw new NotImplementedException(ex.Message);
            }


        }
        public async Task<StudentD> GetStudentDByEmailAsync(string email)
        {
            return await _appDBContext.StudentDs.FirstOrDefaultAsync(e => e.Email == email);
        }

        internal Task AddEmployeeAsync(StudentD model)
        {
            throw new NotImplementedException();
        }


    }
}
