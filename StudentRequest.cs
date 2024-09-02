namespace ReactStudentProject.Server.ViewModels
{
    public class StudentRequest
    {
        public string FullName { get; set; }
        public string Mobile { get; set; }
        public string Email { get; set; }
        public string Age { get; set; }
        public string Bloodgroup { get; set; }
        public string Address { get; set; }
        public int Id { get; internal set; }
        public string Gender { get; set; }
    }
}
