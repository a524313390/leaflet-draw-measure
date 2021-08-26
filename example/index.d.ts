import L from 'leaflet'
interface MeasureDraeOptions {
    map: L.Map;
    measure?: boolean;
}
export default class MeasureDraw {
    map: L.Map;
    layerGroup: L.LayerGroup<any>;
    circle: L.Circle<any>;
    markerTip: any;
    measure: boolean;
    polyline: L.Polyline;
    rectangle: L.Rectangle;
    polygon: L.Polyline;
    constructor(options: MeasureDraeOptions);
    createCricle(): void;
    private _circleMousemove;
    private contextmenu;
    private _toolTip;
    createLine(): void;
    private _lineMousemove;
    createRectangle(): void;
    private _rectangleMousemove;
    createPolygon(): void;
    private _polygonMousemove;
    remove(): void;
}
export { };
