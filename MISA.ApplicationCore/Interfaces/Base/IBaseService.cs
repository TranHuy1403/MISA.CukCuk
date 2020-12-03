using MISA.ApplicationCore.Entities.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace MISA.ApplicationCore.Interfaces.Base
{
    public interface IBaseService<TModel>
    {
        /// <summary>
        /// lấy toàn bộ dữ liệu
        /// </summary>
        /// <returns>MethodResult<List<TModel>></returns>
        IMethodResult<List<TModel>> GetAll();
        /// <summary>
        /// lấy số lượng bản ghi theo từng trang
        /// </summary>
        /// <param name="page">chỉ số trang</param>
        /// <param name="countRecord">số lượng bản ghi của trang</param>
        /// <returns>IMethodResult<List<TModel>></returns>
        IMethodResult<List<TModel>> GetLimit(int page, int countRecord);
        /// <summary>
        /// lấy dữ liệu theo id
        /// </summary>
        /// <param name="id">id của object</param>
        /// <returns>MethodResult<TModel></returns>
        IMethodResult<TModel> GetById(Guid id);
        /// <summary>
        /// Thêm dữ liệu
        /// </summary>
        /// <param name="model">object</param>
        /// <returns>MethodResult</returns>
        IMethodResult Insert(TModel model);
        /// <summary>
        /// sửa dữ liệu
        /// </summary>
        /// <param name="model">object cần sửa</param>
        /// <returns>MethodResult</returns>
        IMethodResult Update(Guid id,TModel model);
        /// <summary>
        /// xóa dữ liệu
        /// </summary>
        /// <param name="id">id của object</param>
        /// <returns>MethodResult</returns>
        IMethodResult Delete(Guid id);
        /// <summary>
        /// validate dũ liệu
        /// </summary>
        /// <param name="model">object</param>
        /// <returns>MethodResult</returns>
        IMethodResult Validate(TModel model);
    }
}
