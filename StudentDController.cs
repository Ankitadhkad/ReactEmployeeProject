using Microsoft.AspNetCore.Mvc;
using ReactStudentProject.Server.Models;
using ReactStudentProject.Server.ViewModels;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace ReactStudentProject.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StudentDController : ControllerBase
    {
        private readonly StudentRepository _studentRepository;

        public StudentDController(StudentRepository studentRepository)
        {
            _studentRepository = studentRepository;
        }

        [HttpPost]
        public async Task<ActionResult> AddStudentD([FromBody] StudentRequest studentRequest)
        {
            if (string.IsNullOrWhiteSpace(studentRequest.FullName))
            {
                return BadRequest("Invalid Fullname+");
            }
            if (string.IsNullOrWhiteSpace(studentRequest.Address))
            {
                return BadRequest("Invalid Address+");
            }
            var res =await _studentRepository.AddStudentAsync(studentRequest);
            if(res != null)
            {
                return Ok(res);
            }
            return BadRequest("Student data is required");
        }

        [HttpGet]

        public async Task<ActionResult> GetStudentDList()
        {

            var StudentDList = await _studentRepository.GetAllStudentDsAsync();
            if (StudentDList != null)
            {
                return Ok(StudentDList);
            }
            return BadRequest("Student data is required");
        }

        [HttpGet("{id}")]
        public async Task<ActionResult> GetEmployeeById([FromRoute] int id)
        {
            if (id >= 0) {
                return BadRequest("invalid Id");
            }
            var StudentD = await _studentRepository.GetStudentDByIdAsync(id);
            if (StudentD != null)
            {
                return Ok(StudentD);
            }
            return BadRequest("Student required Id");
        }
        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateStudentD([FromRoute] int id, [FromBody] ViewModels.StudentRequest studentRequest)
        {
            if (string.IsNullOrWhiteSpace(studentRequest.FullName))
            {
                return BadRequest("Invalid Fullname+");
            }
            if (string.IsNullOrWhiteSpace(studentRequest.Address))
            {
                return BadRequest("Invalid Address+");
            }
            await _studentRepository.UpdateStudentDAsync(id, studentRequest);
            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteStudentD(int id)
        {
            if (id >=0)
            {
                return BadRequest("Invalid Id");
            }
            await _studentRepository.DeleteStudentDAsync(id);
            return Ok();
        }

    }
}
