using MISA.ApplicationCore.Class;
using MISA.ApplicationCore.Entities.Models;
using MISA.ApplicationCore.Interfaces.Base;
using System;
using System.Collections.Generic;
using System.Text;

namespace MISA.ApplicationCore.Interfaces.IModelServices
{
    public interface IEmployeeService: IBaseService<Employee>
    {
        /// <summary>
        /// lấy danh sách nhân viên theo tên, sđt, mã nv
        /// </summary>
        /// <param name="propertyValue">giá trị đầu vào</param>
        /// <returns>IMethodResult<List<Employee>></returns>
        public IMethodResult<List<Employee>> GetEmployeeByPropertyValue(String propertyValue);
        /// <summary>
        /// lấy danh sách nhân viên theo phòng ban và chức vụ
        /// </summary>
        /// <param name="DepartmentID">ID phòng ban</param>
        /// <param name="PossitionID">ID chức vụ</param>
        /// <returns>IMethodResult<List<Employee>></returns>
        /// createdby: tqhuy(2/12/2020)
        public IMethodResult<List<Employee>> GetEmployeeByDepartPossition(string DepartmentID, string PossitionID);
        /// <summary>
        /// hàm lấy mã nhân viên lớn nhất
        /// </summary>
        /// <returns>IMethodResult<string></returns>
        public IMethodResult<string> GetMaxEmployeeCode();
    }
}
