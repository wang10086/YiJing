$(function () {
    //初始化
    $('#spBirthDate').mobiscroll().datePicker({
        theme: "ios",
        mode: "scroller",
        display: "bottom",
        lang: "zh",
        isSolar: 1,
        enableSolarLunar: 1,
        showSolarLunar: 0,
        enableIgnore: 0,
        onSelect: function (r, t) { }

    });
    $('#spBirthDate').mobiscroll("setArrayVal", ['1990', '01', '01'], 1, !1, !1, 0);
    $("#submits").on("click", function () {
        var name = $("#yname").val();
        var ydate = $("#spBirthDate").text();
        if (name == "") {
            alert("请输入你的名字！");
            return;
        } else if (ydate == "" || ydate == "点击选择") {
            $("#spBirthDate").click();
            return;
        }
        var sex = $('input[name="isex"]:checked').val();
        var rili = ydate.match(/\d+/g);
        var shi = $("#ddlBirthHour").val();
        var userstring = name + "|" + sex + "|公历|" + rili[0] + "|" + rili[1] + "|" + rili[2] + "|" + shi + "|0|否";
        var url = "BaZi_Result.aspx?m_string=" + userstring;
        var couCode = $("#hfcouCode").val();
        if ($.trim($("#matxt").val()).length != 0) {
            couCode = $("#matxt").val();
        }
        if (couCode.length != 0) {
            url += "&couCode=" + couCode;
        }
        localStorage.setItem("Cooperation_UserString", userstring);
        location = url;
    });
});