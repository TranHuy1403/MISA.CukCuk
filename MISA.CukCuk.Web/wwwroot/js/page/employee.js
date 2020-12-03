
$(document).ready(function () {

    new Employee();

});

/**
 * khởi tạo lớp employee kế thừa lớp base
 * createby: tquy(15/11/2020)
 * */
class Employee extends Base {
    constructor() {
        super();
        this.buildSelectsEmployee();
        this.search();
        this.getMaxEmployeeCode();
    }

    setUrl() {
        this.getUrl = "/api/v1/employees";
    }

    /**
     * hàm tìm kiếm
     * */
    search() {
        var me = this;
        $('.search-select').change(function () {
            var propertyValue = $('.search').val();
            var departmentID = $('.search-select-department option:selected').val();
            var possitionID = $('.search-select-possition option:selected').val();
            var url = `${me.getUrl}/filter?propertyValue=${propertyValue}&departmentID=${departmentID}&PossitionID=${possitionID}`;          
            me.getData(url);
        });

        $('.search').on('keypress', function (e) {
            if (e.which == 13) {
                var propertyValue = $('.search').val();
                var departmentID = $('.search-select-department option:selected').val();
                var possitionID = $('.search-select-possition option:selected').val();
                propertyValue = propertyValue.toLowerCase().replace(/^\w|\s\w/g, function (letter) {
                    return letter.toUpperCase();
                })

                var url = `${me.getUrl}/filter?propertyValue=${propertyValue}&departmentID=${departmentID}&PossitionID=${possitionID}`;
                me.getData(url);
            }
        });
    }

    // build combobox 
    buildSelectsEmployee() {
        $('#DepartmentName').append($('<option value="" selected>Tất cả phòng ban</option>'));
        $('#PossitionName').append($('<option value="" selected>Tất cả vị trí</option>'));       
    }

    // lấy mã nhân viên lớn nhất khi thực hiện thêm mới
    getMaxEmployeeCode() {
        var me = this;
        $('.button-insert').click(function () {
            try {
                $.ajax({
                    url: me.getUrl + "/GetMaxEmployeeCode",
                    dataType: "JSON",
                    method: "GET",
                    success: function (response) {
                        var employeeCode = response.Data;
                        employeeCode = employeeCode.replace(/\d+/g, function (latter) {
                            var length = latter.toString().length;
                            latter = parseInt(latter) + 1;
                            var length1 = latter.toString().length;
                            var string = "";
                            for (var i = 0; i < length - length1; i++) {
                                string = string + "0"
                            }
                            return string + latter;
                        })
                        $('#EmployeeCode').val(employeeCode);
                    }
                })
            }
            catch (err) {
                console.log("Có lỗi xảy ra!");
            }
        })
        
    }
}



