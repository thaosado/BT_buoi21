function Staff(account, name, email, password, dayOfWork, wage, position, timeOfWork ){
    this.account = account;
    this.name = name;
    this.email = email;
    this.password = password;
    this.dayOfWork = dayOfWork;
    this.wage = wage;
    this.position = position;
    this.timeOfWork = timeOfWork;
}
Staff.prototype.totalWage = function(){
    if(this.position === "Sếp"){
        return (this.wage * 3);
    };
    if(this.position === "Trưởng phòng"){
        return (this.wage * 2);
    }
    if(this.position === "Nhân viên"){
        return this.wage;
    }
}
Staff.prototype.type = function(){
    if(this.timeOfWork >= 192){
        return "Xuất sắc"
    }
    if(this.timeOfWork >= 176){
        return "Giỏi"
    }
    if(this.timeOfWork >= 160){
        return "Khá"
    }
    if(this.timeOfWork < 160){
        return "Trung bình"
    }
}