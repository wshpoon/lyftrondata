function getWeatherData() {
    let weekData= document.getElementById("week").value;
    let week = weekData.slice(-2);
    let year = weekData.slice(4);
    
    let dateRanges = getDateRangeOfWeek(week, year);
    
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
            createTable(x);
        },

        // Error handling 
        error: function (error) {
            $('#error').append(
                'An error Occurred',
            ).appendTo('#error');
            $('#weather_data_table').empty();
        }
    });
}

Date.prototype.getWeek = function () {
    let target  = new Date(this.valueOf());
    let dayNr   = (this.getDay() + 6) % 7;
    target.setDate(target.getDate() - dayNr + 3);
    let firstThursday = target.valueOf();
    target.setMonth(0, 1);
    if (target.getDay() != 4) {
        target.setMonth(0, 1 + ((4 - target.getDay()) + 7) % 7);
    }
    return 1 + Math.ceil((firstThursday - target) / 604800000);
}

function getDateRangeOfWeek(weekNo, year) {
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

function createTable(data) {
    let response = $.parseJSON(data);
    $('<tr>').append(
        $('<th>').text('Day'),
        $('<th>').text('Date'),
        $('<th>').text('Min Temperature'),
        $('<th>').text('Max Temperature'),
    ).appendTo('#weather_data_table');

    for(let i = 0; i < 7; i++) {
        let maxTemp = response.daily.temperature_2m_max[i];
        let minTemp = response.daily.temperature_2m_min[i];
        let date = response.daily.time[i];
        let dayName = getDayName(date);
        $('<tr>').append(
            $('<td>').text(dayName),
            $('<td>').text(date),
            $('<td>').text(minTemp),
            $('<td>').text(maxTemp)
        ).appendTo('#weather_data_table');
    }
    $('#topright').show();
    console.log(response);
}

function getDayName(dateStr, locale) {
    let date = new Date(dateStr);
    return date.toLocaleDateString(locale, { weekday: 'long' });        
}

function generateXML() {
    let xml = "<weatherData>\n";
    $("#weather_data_table")
    .find("tr").each(function() {
        if($(this).find("td").eq(0).html()) {
            xml += "<temperature>\n";
            xml += "<day>"; 
            xml += $(this).find("td").eq(0).html();  
            xml += "</day>"; 
            xml += "\n<date>"; 
            xml += "\n<dateValue>"; 
            xml += $(this).find("td").eq(1).html();  
            xml += "</dateValue>"; 
            xml += "\n<dateFormat>"; 
            xml += "YYYY-MM-DD";
            xml += "</dateFormat>"; 
            xml += "\n</date>"; 
            xml += "\n<min>"; 
            xml += $(this).find("td").eq(2).html();  
            xml += "</min>";
            xml += "\n<max>"; 
            xml += $(this).find("td").eq(3).html();   
            xml += "</max>";
            xml += "\n</temperature>";
        }
    } );
    xml += "\n</weatherData>";
    xml = jQuery.parseXML(xml);
    xml = new XMLSerializer().serializeToString(xml);
    saveFile(xml, 'weatherdata.xml', 'xml');
    };
    
function saveFile(data, filename, type) {
    var file = new Blob([data], {type: type});
    if (window.navigator.msSaveOrOpenBlob) // IE10+
        window.navigator.msSaveOrOpenBlob(file, filename);
    else { // Others
        var a = document.createElement("a"),
                url = URL.createObjectURL(file);
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        setTimeout(function() {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);  
        }, 0); 
    }
}