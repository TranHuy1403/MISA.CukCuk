﻿
/**
 * class các chức năng sử dụng chung
 * createdby: tqhuy (12-11-2020)
 * */
class Base {

    constructor() {
        this.getUrl = null;
        this.setUrl();
        this.buildSelects();
        this.functionsBuildTable(1);
        //this.getData(this.getUrl);
        this.initEvents();
        this.functionsValidate();
    }

    /**
     * set url để gọi api trả về dữ liệu cho hàm getData
     * createdby: tqhuy(15/11/2020)
     * */
    setUrl() {}

    /**
     * hàm gọi api trả về dữ liệu rồi đẩy lên table
     * tqhuy 12/11/2020 
     */
    getData(url) {
        var me = this;
        $('.load-data-modal').addClass("load-modal-opacity");
        $('.load-data').show();
        $.ajax({
            url: url,
            method: "GET",
            dataType: "JSON",
            success: function (reponse) {
                // xóa dữ liệu của bảng
                $('table tbody').empty();
                var data = reponse.Data;
                // lấy tất cả các cột của table
                var columns = $('table thead th');
                var primaryKey = $('table thead tr').attr("fieldPK");
                $.each(data, function (index, item) {
                    var rowtable = $("<tr></tr>");
                    
                    rowtable.data(primaryKey, item[primaryKey]);
                    $.each(columns, function (i, column) {
                        var td = $("<td></td>");
                        var fieldName = $(column).attr("fieldName");
                        var formatType = $(column).attr("formatType");
                        
                        if (formatType == "ddmmyyyy") {
                            td.addClass("text-align-center");
                            td.append(formatDate(item[fieldName]));
                        }
                        else if (formatType == "Money") {
                            td.addClass("text-align-right");
                            td.append(formatMoney(item[fieldName]));
                        }
                        else {
                            td.append(item[fieldName]);
                        }
                        td.addClass("max-with");
                        td.attr("title", item[fieldName]);
                        rowtable = rowtable.append(td);

                    });
                    $("tbody").append(rowtable);
                });

                $('.load-data-modal').removeClass("load-modal-opacity");
                $('.load-data').hide();
            },
            error: function (err) {
                me.snackError("Có lỗi khi load dữ liệu!");
            }
        });
    }


    /**
     * các event hay dùng: 
     * createdby: tqhuy (15/11/2020)
     * */
    initEvents() {

        var me = this;
        // event load lại dữ liệu table
        $('.btn-refresh').click(function () {
            me.getData(me.getUrl);
        });

        // event click vào buttom xóa để xóa dữ liệu được chọn
        $('.btn-delete').click(function () {
            try {
                $.ajax({
                    url: me.getUrl + `/${me.valuePrimaryKey}`,
                    method: "GET",
                    success: function (reponse) {
                        var infos = me.setInfoForPopup(reponse.Data);
                        var mesenger = `Bạn có chắc chắn muốn xóa nhân viên ${infos[0]} (Mã nhân viên ${infos[1]}) không?`
                        me.showPopUp(mesenger);
                    },
                    error: function (err) {
                        me.snackError("Phải chọn bản ghi cần xóa!");
                    }
                });

                $(".btn-confirm").click(function () {
                    if (me.valuePrimaryKey) {
                        $.ajax({
                            url: me.getUrl + `/${me.valuePrimaryKey}`,
                            method: "DELETE",
                            success: function () {
                                me.getData(me.getUrl);
                                me.snackbarSuccess("Xóa dữ liệu thành công.");
                            },
                            error: function () {
                                me.snackError("Có lỗi xảy ra! Vui lòng thực hiện lại!");
                            }
                        });
                    }
                    else {
                        me.snackError("Chọn dữ liệu cần xóa!");
                    }
                    me.hidePopup();
                    me.hideDialog();
                });
            }
            catch (err) {
                console.log("Có lỗi xảy ra!");
            }
        });

        // envent click vào buttom thêm mới
        $('.button-insert').click(function () {
            try {
                me.method = "POST";
                $("input[type=text], input[type=date], input[type=email]").val(null);
                me.showDialog();
                me.buildSelects();
            }
            catch (err) {
                console.log("Có lỗi xảy ra!");
            }
        })

        // event ẩn dialog
        $(".dialog .btn-cancel").click(function () {
            try {
                me.hideDialog();
                $("input[type=text], input[type=date], input[type=email]").val(null);
            }
            catch (err) {
                console.log("Có lỗi xảy ra!");
            }
        });

        // event ẩn pop-up
        $(".pop-up .btn-cancel").click(function () {
            try {
                me.hidePopup();
            }
            catch (err) {
                console.log("Có lỗi xảy ra!");
            }
        })


        // event chọn trang dữ liệu của table
        $('.page-table').click(function () {
            try {
                $(this).addClass("page-selected");
                var page = $(this).html();
                var check = $(this).attr("nextPage");
                if (check == "right") {
                    var pages = $('button.page-table');
                    $.each(pages, function (index, item) {
                        var vale = $(item).html();
                        $(item).html(parseInt(vale) +1)
                    })
                }
                else if (check == "left") {
                    var pages = $('button.page-table');
                    $.each(pages, function (index, item) {
                        var vale = $(item).html();
                        if (parseInt(vale) -1 != index) {
                            $(item).html(parseInt(vale) - 1)
                        }                        
                    })
                }
                me.functionsBuildTable(page);
                $(this).siblings().removeClass("page-selected");
            }
            catch (err) {
                console.log("Có lỗi xảy ra!");
            }
        });

        // event click button chuyern trang 
        $('.next-page').click(function () {
            try {
                
                
                var pageVale = $('.page-selected').val()
                var check = $(this).attr("nextPage");
                if (check == "right") {
                    if (pageVale == "5") {
                        var pages = $('button.page-table');
                        $.each(pages, function (index, item) {
                            var vale = $(item).html();
                            $(item).html(parseInt(vale) + 1)
                        })
                        
                    }
                    else {
                        var pageNext = parseInt(pageVale) + 1;
                        $(`.page${pageNext}`).addClass("page-selected");
                        $(`.page${pageNext}`).siblings().removeClass("page-selected");
                    }
                    
                }
                else if (check == "left") {
                    if (pageVale == "1") {
                        var pages = $('button.page-table');
                        $.each(pages, function (index, item) {
                            var vale = $(item).html();
                            if (parseInt(vale) - 1 != index) {
                                $(item).html(parseInt(vale) - 1)
                            }
                        });
                        
                    }
                    else {
                        var pageNext = parseInt(pageVale) - 1;
                        $(`.page${pageNext}`).addClass("page-selected");
                        $(`.page${pageNext}`).siblings().removeClass("page-selected");
                    }
                    
                }
                var page = $('.page-selected').html();
                me.functionsBuildTable(page);                
            }
            catch (err) {
                console.log("Có lỗi xảy ra!");
            }
        });

        // sự kiện dbclick vào row table hiển thị thông tin chi tiết
        $('table tbody').on('dblclick', 'tr', function () {
            try {
                var tr = this;
                me.eventDbclickRowTable(tr);
            }
            catch (err) {
                console.log("Có lỗi xảy ra!");
            }
        });

        // sự kiện click chọn dòng của table 
        $('table tbody').on('click', 'tr', function () {
            try {
                var tr = this;
                me.eventSelectRowTable(tr);
            }
            catch (err) {
                console.log("Có lỗi xảy ra!");
            }
        })

        // sự kiện click buttom save lưu dữ liệu
        $('.btn-save').click(function () {
            try {
                me.envetSaveData();                
            }
            catch (err) {
                console.log("Có lỗi xảy ra!");
            }
            
        });


        // envent build tfoot table
        $('.select-count-record').change(function () {
            try {
                me.functionsBuildTable(1);             
            }
            catch (err) {
                console.log(err);
            }
        })
    }

    functionsBuildTable(page) {
        var me = this;
        var countRecord = $('.select-count-record option:selected').val();
        $('.shows-record').html(`Hiển thị  ${page * countRecord - countRecord +1}-${page * countRecord}/`)
        $.ajax({
            url: me.getUrl,
            method: 'GET',
            dataType: 'JSON',
            success: function (response) {
                var totalRecord = response.TotalRecord;
                $('.total-record').html(`${totalRecord} bản ghi.`);
                me.getData(me.getUrl + `/limit?page=${page}&countrecord=${countRecord}`);
            },
            error: function (response) {

            }
        })
    }

    functionSelectPage() {
        try {
            $(this).addClass("page-selected");
            $(this).siblings().removeClass("page-selected");
        }
        catch (err) {
            console.log("Có lỗi xảy ra!");
        }
    }
    

    /**
     * hàm dbclick vào rowtable để hiển thị thông tin chi tiết
     * createdBy: tqhuy(19/11/2020)
     * */
    eventDbclickRowTable(tr) {
        var me = this;
        // event dblclick vào row table hiển thị dialog thông tin chi tiết
        // gán cho method là PUT
        me.method = "PUT";
        me.buildSelects();
        var primaryKey = $('table thead tr').attr("fieldPK");
        var id = $(tr).data(primaryKey);
        me.fieldPrimaryKey = primaryKey;
        me.valuePrimaryKey = id;
        // đẩy dữ liệu lên dialog hiển thị thông tin chi tiết
        $.ajax({
            url: me.getUrl + `/${id}`,
            method: "GET",
            success: function (reponse) {
                var inputs = $(".input-info");
                $.each(inputs, function (index, input) {
                    var fieldName = $(input).attr("fieldName");
                    var value = reponse.Data[fieldName];
                    if (input.type == "date") {
                        var date = new Date(value);
                        var year = date.getFullYear();
                        var month = date.getMonth() + 1;
                        month = month < 10 ? "0" + month : month;
                        var day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
                        value = year + '-' + month + '-' + day;
                        $(input).val(value);
                    }
                    else if (input.type == "select-one") {
                        var fieldValue = $(input).attr("fieldValue");
                        value = reponse.Data[fieldValue];
                        $(input).val(value);
                    }
                    else {
                        $(input).val(value);
                    }
                });
            },
            error: function (err) {
                me.snackError("Có lỗi khi load dữ liệu!");
            }
        });

        me.showDialog();
    }
   
    /**
     * hàm chọn row table
     * createdBy: tqhuy(19/11/2020)
     * */
    eventSelectRowTable(tr) {
        var me = this;
        $('table tbody tr').removeClass('row-selected');
        $(tr).addClass("row-selected");
        var primaryKey = $('table thead tr').attr("fieldPK");
        var id = $(tr).data(primaryKey);
        me.fieldPrimaryKey = primaryKey;
        me.valuePrimaryKey = id;
    }

    /**
     * hàm lưu dũ liệu khi thêm hoặc sửa dữ liệu
     * * createdBy: tqhuy(19/11/2020)
     * */
    envetSaveData() {
        var me = this;
        // envent click vào buttom lưu của dialog
        // validate dữ liệu:
        var inputVaidates = $('input[required], input[type="email"]');
        $.each(inputVaidates, function (index, input) {
            $(input).trigger('blur');
        })
        var inputNotValids = $('input[validate="false"]');
        if (inputNotValids && inputNotValids.length > 0) {
            me.snackError("Dữ liệu không hợp lệ!");
            inputNotValids[0].focus();
            return;
        }

        var infos = $(".input-info");
        var item = {};
        $.each(infos, function (index, info) {
            var key = $(info).attr("fieldName");
            var value = $(info).val();
            if (this.type == "radio") {
                if (this.checked) {
                    item[key] = value;
                }
            }
            else if (this.type == "select-one") {
                var fieldValue = $(info).attr("fieldValue");
                item[fieldValue] = $(info).val();
            }
            else {
                item[key] = value;
            }
        });

        var url = me.getUrl;
        if (me.method == "PUT") {
            item[me.fieldPrimaryKey] = me.valuePrimaryKey;
            url = url + `/${me.valuePrimaryKey}`;
        }
     
        $.ajax({
            url: url,
            method: me.method,
            data: JSON.stringify(item),
            contentType: 'application/json',
            success: function (response) {
                me.hideDialog();
                me.getData(me.getUrl);
                me.snackbarSuccess(response.Message);
            },
            error: function (response) {
                //me.hideDialog();
                var mesengers = response.responseJSON.Message;
                $.each(mesengers, function (index, mesenger) {
                    me.snackError(mesenger);
                });
                
            }
            //statusCode: {
            //    400: function (response) {
            //        me.hideDialog();
            //        me.snackError(response.Message);
            //    }
            //}
        });
        
    }   

    /**
     * hàm show dialog hiển thị thông tin chi tiết, form thêm mới
     * createdBy: tqhuy(19/11/2020)
     * */
    showDialog() {
        $(".dialog-modal").addClass("dialog-modal-opacity");
        $(".dialog").show();
        $('.input-info')[0].focus();
    }

    /**
     * hàm hide dialog hiển thị thông tin chi tiết, form thêm mới
     * createdBy: tqhuy(19/11/2020)
     * */
    hideDialog() {
        $(".dialog-modal").removeClass("dialog-modal-opacity");
        $(".dialog").hide();
    }

    /**
     * hàm set thông tin cho pop-up, hàm trả về một mảng gồm các thông tin cần lấy được sắp xếp theo thứ tự ưu tiên tăng dần
     * @param {any} reponse: thông tin api trả về để lấy thông tin cần set cho pop-up
     * createdBy: tqhuy(19/22/2020)
     */
    setInfoForPopup(reponse) {
        var infos =[]
        var getInfos = $(".pop-up-info");
        $.each(getInfos, function (index, getInfo) {
            var fieldName = $(`.pop-up-info-${index}`).attr("fieldName");
            var info = reponse[fieldName];
            infos.push(info);
        })
        return infos;
    }

    /**
     * hàm show pop-up
     * @param {any} mesenger: thông báo sẽ được hiển thị trên pop-up
     * createdBy: tqhuy(19/11/2020)
     */
    showPopUp(mesenger) {
        $(".pop-up-modal").addClass("pop-up-modal-opacity");
        $(".pop-up .pop-up-mesenger").html(mesenger);
        $(".pop-up").show();
    }

    /**
     * hàm ẩn pop-up
     * createdby: tqhuy(19/11/2020)
     * */
    hidePopup() {
        $(".pop-up-modal").removeClass("pop-up-modal-opacity");
        $(".pop-up").hide();
    }

    /**
     * hàm thông báo thành công
     * @param {any} mesenger : nội dung thông báo
     * createdby: tqhuy (18/11/2020)
     */
    snackbarSuccess(mesenger) {
        var mes = $(".snackbar-success")
        $(".snackbar-success .snackbar-mesenger").html(mesenger);
        mes.addClass("show-snackbar");
        setTimeout(function () {
            mes.removeClass("show-snackbar");
        }, 3000);
    }

    /**
     * hàm thông báo lỗi
     * @param {any} mesenger :nội dung thông báo
     * createdby: tqhuy(18/11/2020)
     */
    snackError(mesenger) {
        var mes = $(".snackbar-err")
        $(".snackbar-err .snackbar-mesenger").html(mesenger);
        mes.addClass("show-snackbar");
        setTimeout(function () {
            mes.removeClass("show-snackbar");
        }, 3000);
    }

    /**
     * hàm build options cho các select
     * createdBy: tqhuy(17/11/2020)
     * */
    buildSelects() {
        $(".build-select").empty();
        var selects = $(".build-select")
        $.each(selects, function (index, select) {
            var api = $(select).attr("api");
            var fieldName = $(select).attr("fieldName");
            var fieldValue = $(select).attr("fieldValue");
            $.ajax({
                url: "/api/v1/" + api,
                method: "GET",
                success: function (reponse) {
                    $.each(reponse.Data, function (index, rep) {
                        var option = $(`<option value="${rep[fieldValue]}">${rep[fieldName]}</option>`);
                        $(select).append(option);
                    })
                }
            })
        });
    }

    /**
     *hàm gồm chức năng validate các yêu cầu bắt buộc khi tương tác với các chức năng của người dùng
     * createdby: tqhuy (15/11/2020)
     * */
    functionsValidate() {
        // validate bắt buộc nhập, kiểm tra chống thì sẽ cảnh báo
        $('input[required]').blur(function () {
            var value = $(this).val();
            if (!value | value == "") {
                $(this).addClass("border-red");
                $(this).attr('title', 'Trường này không được phép để trống');
                $(this).attr("validate", false);
            } else {
                $(this).removeClass('border-red');
                $(this).attr("validate", true);
            }
        });

        // validate email đúng định dạng
        $('input[type="email"]').blur(function () {
            var value = $(this).val();
            var testEmail = /^[A-Z0-9._%+-]+@([A-Z0-9-]+\.)+[A-Z]{2,4}$/i;
            if (!testEmail.test(value)) {
                $(this).addClass('border-red');
                $(this).attr('title', 'Email không đúng định dạng.');
                $(this).attr("validate", false);
            } else {
                $(this).removeClass('border-red');
                $(this).attr("validate", true);
            }
        })

        // validate số điện thoại phải là chữ số
        $('#PhoneNumber').blur(function () {
            var value = $(this).val();
            var testEmail = /[a-zA-Z\W]+/g;
            if (!testEmail.test(value)) {
                $(this).removeClass('border-red');
                $(this).attr("validate", true);
                
            } else {
                $(this).addClass('border-red');
                $(this).attr('title', 'Số điện thoại phải là chữ số.');
                $(this).attr("validate", false);
            }
        })
    }
}