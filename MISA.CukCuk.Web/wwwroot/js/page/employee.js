
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
        this.search();
        this.getMaxEmployeeCode();
    }

    setUrl() {
        this.getUrl = "/api/v1/employees";
    }

    search() {
        var me = this;
        $('.search-select').change(function () {
            var departmentID = $('.search-select-department option:selected').val();
            var possitionID = $('.search-select-possition option:selected').val();
            var url = "";
            if (departmentID == null) {
                url = me.getUrl + `/filter?propertyValue=${departmentID}`;
            }
            else if (possitionID == null) {
                url = me.getUrl + `/filter?propertyValue=${possitionID}`;
            }
            else {
                url = me.getUrl + `/filters?DepartmentID=${departmentID}&PossitionID=${possitionID}`;
            }
            me.getData(url);
        });
    }

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



