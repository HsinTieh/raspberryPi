
function highcharsinit() {
   // $('#container').highcharts({
    var chart = new Highcharts.Chart({
        chart: {
            renderTo: "container",
            type: 'line'
        },
        title: {
            text: 'Sensor data from MySQL to Highcharts',
            x: -20
        },
        subtitle: {
            text: 'Data Value',
            x: -20
        },
        xAxis: {
            title: {
                text: 'Time'
            },
            categories: time,
            labels: { //隱藏X軸的標籤
                enabled: false,
            }
        },
        yAxis: {
            title: {
                text: 'value',
            }
        },
        //圖表的資料
        series: [{
            name: 'Sensor-Light',
            data: light
        },
        {
            name: 'Sensor-Humi',
            data: humi
        },
        {
            name: 'Sensor-Temp',
            data: temp
        }
        ]
    });
    var chart = new Highcharts.Chart({
        chart: {
            renderTo: "data-bar",
            type: 'column', //column 直的 bar 平的
        },
        title: {
            text: 'Sensor data from MySQL to Highcharts',
        },
        subtitle: {
            text: 'Data Value',
        },
        xAxis: {
            title: {
                text: 'time'
            },
            crosshair: true,
            labels: { //隱藏X軸的標籤
                enabled: false,
            }
        },
        yAxis: {
            title: {
                text: 'value',
            }
        },
        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0
            }
        },
        //圖表的資料
        series: [{
            name: 'Sensor-Light',
            data: light
        },
        {
            name: 'Sensor-Humi',
            data: humi
        },
        {
            name: 'Sensor-Temp',
            data: temp
        }
        ],
        
    });
   

}

$(function () {
    var table_data = $('#tb_data');
    var str = "<thead>< tr ><th>#</th>"+
                        "<th>Time</th>"+
                        " <th>Light</th>"+
                        "<th>Humidity</th>"+
                        "<th>Temperature</th>"+
                        "<th>Satuts</th>"+
                        "</tr ></thead ><tbody>";
    $.ajax({
        url: 'database.php',//連接的URL	  
        data: "{}",//夾帶的參數
        dataType: 'json', //資料格式 
        success: function (data)	//傳送成功的function
        {
            light = [];
            humi = [];
            temp = [];
            time = [];

            for (var i = 0; i < data.length; i++) {
                if (parseInt(data[i]['status']) == 0) {
                    light.push({ y: parseInt(data[i]['light']), color: '#191970' });
                    humi.push({ y: parseInt(data[i]['humi']), color: '#ff1493' });
                    temp.push({ y: parseInt(data[i]['temp']), color: '#006400' });

                } else {
                    light.push({ y: parseInt(data[i]['light']), color: '#4682b4' });
                    humi.push({ y: parseInt(data[i]['humi']), color: '#f08080' });
                    temp.push({ y: parseInt(data[i]['temp']), color: '#90ee90' });
                }
                time.push(data[i]['time']);
                //for table
                str += "<tr><td>" + data[i]['id'] + "</td>" +
                    "<td>" + data[i]['time'] + "</td>" +
                    "<td>" + data[i]['light'] + "</td>" +
                    "<td>" + data[i]['humi'] + "</td>" +
                    "<td>" + data[i]['temp'] + "</td>" +
                    "<td>" + data[i]['status'] + "</td></tr>" 
            }
            str += "</tr></tbody>";
            table_data.append(str);
            highcharsinit();
     
        }
    });
});
