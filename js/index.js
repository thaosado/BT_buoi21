let staffs = [];

init();

let isSubmited = false;

let domId = function (id) {
    return document.getElementById(id)
}



function init() {
    staffs = JSON.parse(localStorage.getItem("staffs")) || [];
    staffs = staffs.map((value) => {
        return new Staff(
            value.account, value.name, value.email, value.password, value.dayOfWork, value.wage, value.position, value.timeOfWork,
        )
    })
    display(staffs);
}

//create
function addStaff() {
    isSubmited = true;
    let staff = validate();
    if(!staff){
        return
    }
    staffs.push(staff);

        localStorage.setItem("staffs", JSON.stringify(staffs))
    display(staffs);

    resetForm();
}

//display
function display(staffs) {
    let html = staffs.reduce((result, value) => {
        return (result + `
        <tr>
            <td>${value.account}</td>
            <td>${value.name}</td>
            <td>${value.email}</td>
            <td>${value.dayOfWork}</td>
            <td>${value.position}</td>
            <td>${value.totalWage()}</td>
            <td id="type">${value.type()}</td>
            <td>
                <button data-toggle="modal"
                data-target="#myModal" class="btn btn-warning" onclick="selectStaff('${value.account}')">Sửa</button>
                <button class="btn btn-danger" onclick="deleteStaff('${value.account}')">Xóa</button>
            </td>

        </tr>`)
    }, "")
    document.getElementById("tableDanhSach").innerHTML = html;
}

//delete
function deleteStaff(account){
    let index = staffs.findIndex((value) =>{
        return value.account === account;
    });
    if(index != -1){
        staffs.splice(index, 1);
    }
    localStorage.setItem("staffs", JSON.stringify(staffs));
    display(staffs);
    
}

//seclect
function selectStaff(account){
    
    let staff = staffs.find((value) =>{
        return value.account === account;
    });
    if(staff != -1){
        domId("tknv").value = staff.account;
        domId("name").value = staff.name;
        domId("email").value = staff.email;
        domId("password").value = staff.password;
        domId("datepicker").value = staff.dayOfWork;
        domId("luongCB").value = staff.wage;
        domId("chucvu").value = staff.position;
        domId("gioLam").value = staff.timeOfWork;

        domId("tknv").disabled = true;
        domId("btnThemNV").disabled = true;

    }
}
//update
function updateStaff(){
    isSubmited = true;
    let staff = validate();
    if(!staff){
        return;
    }
    let index = staffs.findIndex((value)=>{
        return value.account === staff.account;
    });
    staffs[index] = staff;
    localStorage.setItem("staffs", JSON.stringify(staffs));

    display(staffs);

}

//find
function findStaff(){
    let typeExcelient = "xuất sắc";
    let typeGood = "giỏi";
    let typePrettyGood = "khá";
    let typeMedium = "trung bình";

    let search = domId("searchName").value;
    search = search.trim().toLowerCase();

    console.log(typeGood.includes(search))

    if(typeExcelient.includes(search)){
        let newStaffs = staffs.filter((value)=>{
            return value.timeOfWork >= 192
        })
        display(newStaffs)
    }
    if(typeGood.includes(search)){
        let newStaffs = staffs.filter((value)=>{
            return value.timeOfWork >= 176 && value.timeOfWork < 192;
        })
        display(newStaffs);
    }
    if(typePrettyGood.includes(search)){
        let newStaffs = staffs.filter((value)=>{
            return value.timeOfWork >= 160 && value.timeOfWork < 176
        })
        display(newStaffs)
    }
    if(typeMedium.includes(search)){
        let newStaffs = staffs.filter((value)=>{
            return value.timeOfWork < 160
        })
        display(newStaffs)
    }

}
domId("searchName").oninput = (event)=>{
    if(isRequired(event.target.value)){
        findStaff();
    }else{
        display(staffs)
    }
}


//REGEX

function isRequired(value) {
    if (!value.trim()) {
        return false;
    }
    return true;
}
function isAccount(value) {
    let regex = /^[0-9]{4,6}$/;
    return regex.test(value);
}
function isPassword(value) {
    let regex = /^(?=.*[A-Z])(?=.*[!&%\/()=\?\^\*\+\]\[#><;:,\._-|@])(?=.*[0-9])(?=.*[a-z]).{6,10}$/;

    return regex.test(value);
}
function isEmail(value) {
    let regex = /^[a-zA-Z0-9.!#$%&’*+/=?^_` {|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$/;

    return regex.test(value);
}
function isDate(value) {
    let regex = /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/;

    return regex.test(value);
}
function isWage(value) {
    if (isNaN(value)) {
        return false;
    }
    if (value < 1000000 || value > 20000000) {
        return false;
    }
    return true;
}
function isTimeOfWork(value) {
    if (isNaN(value)) {
        return false;
    }
    if (value < 80 || value > 200) {
        return false;
    }
    return true;
}

//VALIDATE

function validate() {
    let account = domId("tknv").value;
    let name = domId("name").value;
    let email = domId("email").value;
    let password = domId("password").value;
    let dayOfWork = domId("datepicker").value;
    let wage = domId("luongCB").value;
    let position = domId("chucvu").value;
    let timeOfWork = domId("gioLam").value;

    let isValid = true;
    
    //acount
    if (!isRequired(account)) {
        isValid = false;
        domId("tbTKNV").innerHTML = "Tài khoản không được để trống";
        domId("tbTKNV").style.display = "block";
    } else if (!isAccount(account)) {
        isValid = false;
        domId("tbTKNV").innerHTML = "Tài khoản phải nhập từ 4-6 ký số";
        domId("tbTKNV").style.display = "block";
    }
    //name
    if (!isRequired(name)) {
        isValid = false;
        domId("tbTen").innerHTML = "Tên không được để trống";
        domId("tbTen").style.display = "block";
    }
    //email
    if (!isRequired(email)) {
        isValid = false;
        domId("tbEmail").innerHTML = "Tên không được để trống";
        domId("tbEmail").style.display = "block";
    } else if (!isEmail(email)) {
        isValid = false;
        domId("tbEmail").innerHTML = "Email không đúng định dạng";
        domId("tbEmail").style.display = "block";
    }
    //password
    if (!isRequired(password)) {
        isValid = false;
        domId("tbMatKhau").innerHTML = "Mật khẩu không được để trống";
        domId("tbMatKhau").style.display = "block";
    } else if (!isPassword(password)) {
        isValid = false;
        domId("tbMatKhau").innerHTML = "Mật khẩu từ 6-10 ký tự (chứa ít nhất 1 ký tự số, 1 ký tự in hoa, 1 ký tự đặc biệt)";
        domId("tbMatKhau").style.display = "block";
    }
    //dayOfWork
    if (!isRequired(dayOfWork)) {
        isValid = false;
        domId("tbNgay").innerHTML = "Ngày làm không được để trống";
        domId("tbNgay").style.display = "block";
    } else if (!isDate(dayOfWork)) {
        isValid = false;
        domId("tbNgay").innerHTML = "Định dạng ngày không hợp lệ (dd/mm/yyyy)";
        domId("tbNgay").style.display = "block";
    }
    //wage
    if (!isRequired(wage)) {
        isValid = false;
        domId("tbLuongCB").innerHTML = "Lương cơ bản không được để trống";
        domId("tbLuongCB").style.display = "block";
    } else if (!isWage(wage)) {
        isValid = false;
        domId("tbLuongCB").innerHTML = "Lương cơ bản phải từ 1,000,000 đến 20,000,000";
        domId("tbLuongCB").style.display = "block";
    }
    //position
    if (!isRequired(position)) {
        isValid = false;
        domId("tbChucVu").innerHTML = "Vui lòng chọn chức vụ";
        domId("tbChucVu").style.display = "block";
    }
    //timeOfWork
    if (!isRequired(timeOfWork)) {
        isValid = false;
        domId("tbGiolam").innerHTML = "Giờ làm không được để trống";
        domId("tbGiolam").style.display = "block";
    } else if (!isTimeOfWork(timeOfWork)) {
        isValid = false;
        domId("tbGiolam").innerHTML = "Giờ làm phải từ 80 đến 200 giờ";
        domId("tbGiolam").style.display = "block";
    }

    if (isValid) {
        let staff = new Staff(account, name, email, password, dayOfWork, +wage, position, +timeOfWork);
        return staff;
    }
    return undefined;
}



function resetForm() {
    domId("tknv").value = "";
    domId("name").value = "";
    domId("email").value = "";
    domId("password").value = "";
    domId("datepicker").value = "";
    domId("luongCB").value = "";
    domId("chucvu").value = "";
    domId("gioLam").value = "";

    domId("tbTKNV").innerHTML = "";
    domId("tbTen").innerHTML = "";
    domId("tbEmail").innerHTML = "";
    domId("tbMatKhau").innerHTML = "";
    domId("tbNgay").innerHTML = "";
    domId("tbLuongCB").innerHTML = "";
    domId("tbChucVu").innerHTML = "";
    domId("tbGiolam").innerHTML = "";

}

function resetError(id,span,error){
    domId(id).oninput = (event) => {
        if(!isSubmited){
            return;
        }
        if(isRequired(event.target.value)){
            domId(span).innerHTML = "";
        }else{
            domId(span).innerHTML = error;
        }
    }
}
resetError("tknv", "tbTKNV", "Tài khoản không được để trống");
resetError("name", "tbTen", "Tên không được để trống");
resetError("email", "tbEmail", "Email không được để trống");
resetError("password", "tbMatKhau", "Mật khẩu không được để trống");
resetError("datepicker", "tbNgay", "Ngày làm không được để trống");
resetError("luongCB", "tbLuongCB", "Lương cơ bản không được để trống");
resetError("chucvu", "tbChucVu", "Vui lòng chọn chức vụ");
resetError("gioLam", "tbGiolam", "Giờ làm không được để trống");