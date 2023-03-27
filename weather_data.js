function getWeatherData() {
    let weekData= document.getElementById("week").value;
    var week = weekData.slice(-2);
    let year = weekData.slice(4);
    
    var dateRanges = getDateRangeOfWeek(week, year);
    
    let startDate = dateRanges[0];
    let endDate = dateRanges[1];

    let url = 'https://api.open-meteo.com/v1/forecast?';
    let params = 'latitude=40.71&longitude=-74.01&timezone=America/New_York&daily=temperature_2m_max,temperature_2m_min&start_date='+startDate+'&end_date='+endDate;

    $.ajax({

        // Our sample url to make request 
        url: url + params,

        // Type of Request
        type: "GET",

        // Function to call when to
        // request is ok 
        success: function (data) {
            var x = JSON.stringify(data);
            console.log(x);
        },

        // Error handling 
        error: function (error) {
            console.log(`Error ${error}`);
        }
    });
}
Date.prototype.getWeek = function () {
    var target  = new Date(this.valueOf());
    var dayNr   = (this.getDay() + 6) % 7;
    target.setDate(target.getDate() - dayNr + 3);
    var firstThursday = target.valueOf();
    target.setMonth(0, 1);
    if (target.getDay() != 4) {
        target.setMonth(0, 1 + ((4 - target.getDay()) + 7) % 7);
    }
    return 1 + Math.ceil((firstThursday - target) / 604800000);
}
function getDateRangeOfWeek(weekNo, year){
    var d1 = new Date();
    numOfdaysPastSinceLastMonday = eval(d1.getDay()- 1);
    d1.setDate(d1.getDate() - numOfdaysPastSinceLastMonday);
    var weekNoToday = d1.getWeek();
    var weeksInTheFuture = eval( weekNo - weekNoToday );

    d1.setDate(d1.getDate() + eval( 7 * weeksInTheFuture ));
    let month = eval(d1.getMonth()+1) < 10 ? '0' + eval(d1.getMonth()+1) : eval(d1.getMonth()+1);
    var rangeIsFrom = d1.getFullYear() + '-' + month +"-" + d1.getDate();
    
    d1.setDate(d1.getDate() + 6);
    month = eval(d1.getMonth()+1) < 10 ? '0' + eval(d1.getMonth()+1) : eval(d1.getMonth()+1);
    var rangeIsTo = d1.getFullYear() + '-' + month + "-" + d1.getDate();
    return [rangeIsFrom, rangeIsTo];
};
