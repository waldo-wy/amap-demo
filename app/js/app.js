/**
 * Created by wangyin on 2017/6/8.
 */

var circle = new AMap.Circle({
//            center: new AMap.LngLat("116.403322", "39.920255"),// 圆心位置
    radius: 1000, //半径
    strokeColor: "#F33", //线颜色
    strokeOpacity: 1, //线透明度
    strokeWeight: 3, //线粗细度
    fillColor: "#ee2200", //填充颜色
    fillOpacity: 0.35//填充透明度
});
//        circle.setMap(map);

AMapUI.loadUI(['misc/PositionPicker'], function (PositionPicker) {
    var map = new AMap.Map('container', {
        zoom: 16,
        scrollWheel: false
    });
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
        // circle.setCenter(new AMap.LngLat(positionResult.position));
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


    map.addControl(new AMap.ToolBar({
        liteStyle: true
    }))
});