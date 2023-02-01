const formatDate = function (date) {
    console.log(date)
    var d = new Date(date),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    console.log([year, month, day].join('-'));
    return [year, month, day].join('-');
}