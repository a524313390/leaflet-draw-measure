### 使用说明：

leaflet-draw-measure 依赖于 leaflet-measure-path 这个测量插件，此插件添加了点击绘制园，多线段，矩形，多边形动态测量，根据传递的参数显示测量结果。

### 使用方法：

1.需要先安装 leaflet-measure-path 与 leaflet-draw-measure

```js
npm i leaflet-measure-path
npm i leaflet-draw-measure
```

2.引入插件

```js
import L from "leaflet";
import 'leaflet-measure-path'
import 'leaflet-measure-path/leaflet-measure-path.css';

<body>
    <div id="map"></div>
    <div class="tools">
        <li>园</li>
        <li>线</li>、
        <li>矩形</li>
        <li>面</li>

        <li>清除</li>
    </div>
</body>
 measure  是否显示面积，默认为true
<script type="module">
    import MeasureDraw from '../src/index.js'


    var map = L.map('map').setView([37.75, -122.23], 10);

    L.esri.basemapLayer('Topographic').addTo(map);



    const draw = new MeasureDraw({ map });




    let dom = document.getElementsByClassName('tools')[0].getElementsByTagName('li');
    dom[0].onclick = function () {
        draw.createCricle();
    }
    dom[1].onclick = function () {
        draw.createLine();
    }
    dom[2].onclick = function () {
        draw.createRectangle();
    }
    dom[3].onclick = function () {
        draw.createPolygon();
    }
    dom[4].onclick = function () {
        draw.remove();
    }
</script>

</html>
具体请查看example文件夹下面的index.html
```
