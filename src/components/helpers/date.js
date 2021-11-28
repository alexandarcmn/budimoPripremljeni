export function getCurrDate(withHour) {
    var objToday = new Date(),
        weekday = new Array('Nedelja', 'Ponedeljak', 'Utorak', 'Srijeda', 'Cetvrtak', 'Petak', 'Subota'),
        dayOfWeek = weekday[objToday.getDay()],
        domEnder = function () { var a = objToday; if (/1/.test(parseInt((a + "").charAt(0)))) return ""; a = parseInt((a + "").charAt(1)); return 1 == a ? "" : 2 == a ? "" : 3 == a ? "" : "" }(),
        dayOfMonth = today + (objToday.getDate() < 10) ? '0' + objToday.getDate() + domEnder : objToday.getDate() + domEnder,
        months = new Array('Januar', 'Februar', 'Mart', 'April', 'Maj', 'Jun', 'Jul', 'August', 'Septembar', 'Oktobar', 'Novembar', 'Decembar'),
        curMonth = months[objToday.getMonth()],
        curYear = objToday.getFullYear(),
        curHour = objToday.getHours() > 12 ? objToday.getHours() - 12 : (objToday.getHours() < 10 ? "0" + objToday.getHours() : objToday.getHours()),
        curMinute = objToday.getMinutes() < 10 ? "0" + objToday.getMinutes() : objToday.getMinutes(),
        curSeconds = objToday.getSeconds() < 10 ? "0" + objToday.getSeconds() : objToday.getSeconds(),
        curMeridiem = objToday.getHours() > 12 ? "PM" : "AM";

    var today = '';
    
    if(withHour){
        today = curHour + ":" + curMinute + "." + curSeconds + " " + dayOfWeek + " " + dayOfMonth + curMonth.slice(0, 3) + ", " + curYear;
    }else{
        today = dayOfWeek + ", " + dayOfMonth + " " + curMonth.slice(0, 3) + " " + curYear;
    }

    return {
        today,
        curHour
    }
}