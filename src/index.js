//@ts-ignore
export default class MeasureDraw {
  constructor(options) {
    this.map = options.map
    //@ts-ignore
    this.layerGroup = L.layerGroup()
    this.layerGroup.addTo(this.map)
    this.measure = options.measure ? options.measure : true
  }
  createCricle() {
    this.map.on('click', (e) => {
      this.map.doubleClickZoom.disable()
      const { latlng } = e
      this.map.on('mousemove', (event) => {
        this._circleMousemove(event, latlng)
      })
      this.map.on('contextmenu', () => {
        this.contextmenu()
      })
    })
  }
  _circleMousemove(event, center) {
    if (this.circle) this.circle.remove()
    //鼠标移动的位置
    const { latlng } = event
    //求出半径
    const radius = center.distanceTo(latlng)
    //@ts-ignore
    this.circle = L.circle(center, { radius, showMeasurements: this.measure })
    this.layerGroup.addLayer(this.circle)
    this._toolTip(latlng)
  }
  //结束绘制
  contextmenu() {
    this.map.off('click mousemove contextmenu')
    if (this.markerTip) {
      this.markerTip.remove()
    }
    this.polyline = null
    this.polygon = null
  }
  //提示框
  _toolTip(latlng) {
    if (this.markerTip) {
      this.markerTip.remove()
    }
    if (latlng) {
      //@ts-ignore
      this.markerTip = L.marker(latlng, { opacity: 0 }).addTo(this.layerGroup)
      this.markerTip
        .bindTooltip('右击结束', {
          className: 'draw-leaflet-tip',
          offset: [0, 20],
        })
        .openTooltip()
    }
  }
  //创建线
  createLine() {
    this.contextmenu()
    const positionArr = [] //存储线的位置
    this.map.on('click', (e) => {
      this.map.doubleClickZoom.disable()
      const { latlng } = e
      const { lat, lng } = latlng
      positionArr.push([lat, lng])
      this.map.on('mousemove', (event) => {
        this._lineMousemove(event, positionArr)
      })
    })
  }
  _lineMousemove(event, positionArr) {
    const { latlng } = event
    const length = positionArr.length
    //两点画一条线，每次移动替换最后一个位置
    const { lat, lng } = latlng
    if (length <= 1) {
      positionArr.push([lat, lng])
    } else {
      positionArr[length - 1] = [lat, lng]
      this._toolTip(latlng)
      if (this.polyline) {
        this.polyline.setLatLngs(positionArr)
      } else {
        //@ts-ignore
        this.polyline = L.polyline(positionArr, {
          showMeasurements: this.measure,
        })
        this.layerGroup.addLayer(this.polyline)
      }
    }
    this.map.on('contextmenu', () => {
      this.contextmenu()
    })
  }
  //创建矩形
  createRectangle() {
    this.contextmenu()
    const positionArr = [] //存储线的位置
    this.map.on('click', (e) => {
      this.map.doubleClickZoom.disable()
      const { latlng } = e
      const { lat, lng } = latlng
      positionArr.push([lat, lng])
      this.map.on('mousemove', (event) => {
        this._rectangleMousemove(event, positionArr)
      })
    })
  }
  _rectangleMousemove(event, positionArr) {
    const length = positionArr.length
    const { latlng } = event
    if (this.rectangle) this.rectangle.remove()
    const { lat, lng } = latlng
    if (length <= 1) {
      positionArr.push([lat, lng])
    } else {
      positionArr[length - 1] = [lat, lng]
      this._toolTip(latlng)
      //@ts-ignore
      this.rectangle = L.rectangle(positionArr, { showMeasurements: true })
      this.layerGroup.addLayer(this.rectangle)
    }
    this.map.on('contextmenu', () => {
      this.contextmenu()
    })
  }
  //创建多边形
  createPolygon() {
    this.contextmenu()
    const positionArr = [] //存储线的位置
    this.map.on('click', (e) => {
      this.map.doubleClickZoom.disable()
      const { latlng } = e
      const { lat, lng } = latlng
      positionArr.push([lat, lng])
      this.map.on('mousemove', (event) => {
        this._polygonMousemove(event, positionArr)
      })
    })
  }
  _polygonMousemove(event, positionArr) {
    const { latlng } = event
    const length = positionArr.length
    //两点画一条线，每次移动替换最后一个位置
    const { lat, lng } = latlng
    if (length <= 1) {
      positionArr.push([lat, lng])
    } else {
      positionArr[length - 1] = [lat, lng]
      this._toolTip(latlng)
      if (this.polygon) {
        this.polygon.setLatLngs(positionArr)
      } else {
        //@ts-ignore
        this.polygon = L.polygon(positionArr, {
          showMeasurements: this.measure,
        })
        this.layerGroup.addLayer(this.polygon)
      }
    }
    this.map.on('contextmenu', () => {
      this.contextmenu()
    })
  }
  remove() {
    this.layerGroup.clearLayers()
    if (this.markerTip) {
      this.markerTip.remove()
    }
    this.contextmenu()
  }
}
