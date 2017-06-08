/**
 * Created by wangyin on 2017/6/8.
 */



const map = new AMap.Map('container', {
    zoom: 13,
    scrollWheel: false,
    resizeEnable: true
});


const circle = new AMap.Circle({
    // center: new AMap.LngLat("120.153576", "30.287478"),// 圆心位置
    radius: 5000, //半径
    strokeColor: "#F33", //线颜色
    strokeOpacity: 0.8, //线透明度
    strokeWeight: 2, //线粗细度
    fillColor: "#ee2200", //填充颜色
    fillOpacity: 0.3//填充透明度
});
circle.setMap(map);

AMapUI.loadUI(['misc/PositionPicker'], function (PositionPicker) {
    var positionPicker = new PositionPicker({
        mode: 'dragMap',
        map: map
    });

    positionPicker.on('success', function (positionResult) {
        document.getElementById('lnglat').innerHTML = positionResult.position;
        document.getElementById('address').innerHTML = positionResult.address;
        document.getElementById('nearestJunction').innerHTML = positionResult.nearestJunction;
        document.getElementById('nearestRoad').innerHTML = positionResult.nearestRoad;
        document.getElementById('nearestPOI').innerHTML = positionResult.nearestPOI;
        circle.setCenter(positionResult.position);
        circle.show();
        // circle.setMap(map);
    });
    positionPicker.on('fail', function (positionResult) {
        document.getElementById('lnglat').innerHTML = ' ';
        document.getElementById('address').innerHTML = ' ';
        document.getElementById('nearestJunction').innerHTML = ' ';
        document.getElementById('nearestRoad').innerHTML = ' ';
        document.getElementById('nearestPOI').innerHTML = ' ';
    });
    var onModeChange = function (e) {
        positionPicker.setMode(e.target.value)
    };
    var startButton = document.getElementById('start');
    var stopButton = document.getElementById('stop');
    var dragMapMode = document.getElementsByName('mode')[0];
    var dragMarkerMode = document.getElementsByName('mode')[1];
    AMap.event.addDomListener(startButton, 'click', function () {
        positionPicker.start(map.getBounds().getSouthWest())
    });
    AMap.event.addDomListener(stopButton, 'click', function () {
        positionPicker.stop();
    });
    AMap.event.addDomListener(dragMapMode, 'change', onModeChange)
    AMap.event.addDomListener(dragMarkerMode, 'change', onModeChange);
    positionPicker.start();
    map.panBy(0, 1);

    // 添加控件
    map.addControl(new AMap.ToolBar({
        liteStyle: true
    }));
});


//设置城市
AMap.event.addDomListener(document.getElementById('goCity'), 'click', function () {
    var cityName = document.getElementById('cityName').value;
    if (!cityName) {
        cityName = '杭州市';
    }
    map.setCity(cityName);
});

AMap.event.addDomListener(document.getElementById('zoom'), 'click', function () {
    var zoomLevel = document.getElementById('zoomLevel').value;
    // 在PC上，默认为[3,18]，取值范围[3-18]
    if (!zoomLevel || zoomLevel < 3 || zoomLevel > 18) {
        zoomLevel = 10;
    }
    map.setZoom(zoomLevel);
});

// 可以限制地图显示范围，   拉出去后，会被拽回来

// 有  城市下拉列表  的DEMO

// 地图操作时事件触发
map.on('movestart', function() {
    circle.hide();
});

map.on('moveend', getCity);
function getCity() {
    map.getCity(function (data) {
        if (data['province'] && typeof data['province'] === 'string') {
            document.getElementById('pca').innerHTML = (data['province'] + '&nbsp;' + data['city'] + '&nbsp;' + data['district']);
        }
    });
}