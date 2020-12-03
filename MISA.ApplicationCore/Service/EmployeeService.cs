using MISA.ApplicationCore.Class;
using MISA.ApplicationCore.Entities.Models;
using MISA.ApplicationCore.Interfaces.Base;
using MISA.ApplicationCore.Interfaces.IModelRepos;
using MISA.ApplicationCore.Interfaces.IModelServices;
using System;
using System.Collections.Generic;
using System.Text;

namespace MISA.ApplicationCore.Service
{
    public class EmployeeService: BaseService<Employee>, IEmployeeService
    {
        IEmployeeRepos _employeeRepos;
        public EmployeeService(IEmployeeRepos employeeRepos): base(employeeRepos)
        {
            _employeeRepos = employeeRepos;
        }

        public IMethodResult<List<Employee>> GetEmployeesFilter(string specs, string DepartmentID, string PossitionID)
        {
            var result = _employeeRepos.GetEmployeesFilter(specs, DepartmentID, PossitionID);
            return result;
        }

        public IMethodResult<string> GetMaxEmployeeCode()
        {
            var result = _employeeRepos.GetMaxEmployeeCode();
            return result;
        }
    }
}
