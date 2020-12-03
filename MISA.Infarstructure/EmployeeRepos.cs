using Microsoft.Extensions.Configuration;
using MISA.ApplicationCore.Class;
using MISA.ApplicationCore.Entities.Models;
using MISA.ApplicationCore.Interfaces.IModelRepos;
using System;
using System.Collections.Generic;
using System.Text;
using Dapper;
using System.Data;
using System.Linq;
using MySql.Data.MySqlClient;

namespace MISA.Infarstructure
{
    public class EmployeeRepos: BaseRepos<Employee>,IEmployeeRepos
    {
        public EmployeeRepos(IConfiguration configuration): base(configuration)
        {
            
        }

        public IMethodResult<List<Employee>> GetEmployeesFilter(string specs, string DepartmentID, string PossitionID)
        {
            var parameter = new DynamicParameters();
            parameter.Add("PropertyValue", specs!=null? specs: String.Empty, DbType.String);
            parameter.Add("DepartmentID", DepartmentID, DbType.String);
            parameter.Add("PossitionID", PossitionID, DbType.String);
            var result = conn.Query<Employee>($"Proc_Get{_tableName}sFilter", parameter, commandType: CommandType.StoredProcedure).ToList();
            return MethodResult<List<Employee>>.ResultWithData(result, totalRecord: result.Count);
        }

        public IMethodResult<string> GetMaxEmployeeCode()
        {
            var result = conn.ExecuteScalar<string>("SELECT MAX(e.EmployeeCode) FROM Employee e;", commandType: CommandType.Text);
            return MethodResult<string>.ResultWithData(result);
        }
    }
}
