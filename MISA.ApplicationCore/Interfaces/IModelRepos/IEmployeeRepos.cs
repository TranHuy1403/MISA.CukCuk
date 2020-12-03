using MISA.ApplicationCore.Class;
using MISA.ApplicationCore.Entities.Models;
using MISA.ApplicationCore.Interfaces.Base;
using System;
using System.Collections.Generic;
using System.Text;

namespace MISA.ApplicationCore.Interfaces.IModelRepos
{
    public interface IEmployeeRepos: IBaseRepos<Employee>
    {    
        /// <summary>
        /// lấy danh sách nhân viên theo phòng ban và chức vụ
        /// </summary>
        /// <param name="DepartmentID">ID phòng ban</param>
        /// <param name="PossitionID">ID chức vụ</param>
        /// <param name="specs">ho tên, số điện thoại, mã nv</param>
        /// <returns>IMethodResult<List<Employee>></returns>
        /// createdby: tqhuy(2/12/2020)
        public IMethodResult<List<Employee>> GetEmployeesFilter(string specs , string DepartmentID, string PossitionID);
        /// <summary>
        /// hàm lấy mã nhân viên lớn nhất
        /// </summary>
        /// <returns>IMethodResult<string></returns>
        public IMethodResult<string> GetMaxEmployeeCode();
    }    
}
