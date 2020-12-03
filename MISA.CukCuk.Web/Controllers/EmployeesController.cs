using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MISA.ApplicationCore.Class;
using MISA.ApplicationCore.Interfaces.IModelServices;

namespace MISA.CukCuk.Web.Controllers
{
    public class EmployeesController : BaseController<IEmployeeService, Employee>
    {
        IEmployeeService _employeeService;
        public EmployeesController(IEmployeeService employeeService) : base(employeeService)
        {
            _employeeService = employeeService;
        }

        //[Route("search")]
        [HttpGet("filter")]
        public IActionResult SearchByProperty([FromQuery]string propertyValue, [FromQuery] string DepartmentID, [FromQuery] string PossitionID)
        {
            var result = _employeeService.GetEmployeesFilter(propertyValue, DepartmentID, PossitionID);
            return Ok(result);
        }


        [Route("GetMaxEmployeeCode")]
        [HttpGet()]
        public IActionResult GetMaxEmployeeCode()
        {
            var result = _employeeService.GetMaxEmployeeCode();
            return Ok(result);
        }
    }
}
