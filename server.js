const cv = require('opencv4nodejs');

const url = [
    './static/init/colors-1.jpg',
    './static/init/colors-2.jpg',
    './static/init/colors-3.jpg',
    './static/init/colors-4.jpg',
    './static/init/colors-5.jpg',
    './static/init/colors-6.jpg',
    './static/init/gary-1.jpg',
    './static/init/gary-2.jpg',
    './static/init/gary-3.jpg',
    './static/init/gary-4.jpg',
    './static/init/gary-5.jpg',
    './static/init/gary-6.jpg'
]

function imgCut (url) {
    const initMat = cv.imread(url)

    const garyMat = initMat.cvtColor(cv.COLOR_BGR2GRAY)   // 灰度化

    const blurMat = garyMat.gaussianBlur(new cv.Size(1, 1), 0)

    const thrMat = blurMat.canny(150, 200)   // canny边缘检测

    const thresholdMat = thrMat.adaptiveThreshold(100, 1, 0, 21, 0) // 阈值分割

    return thresholdMat
}

function drawRect (targetMat, i) {
    const garyMat = targetMat.cvtColor(cv.COLOR_BGR2GRAY)   // 灰度化

    const thresholdMat = garyMat.threshold(100, 255, cv.THRESH_BINARY)

    const contours = thresholdMat.findContours(cv.RETR_EXTERNAL, cv.CHAIN_APPROX_SIMPLE)

    console.log(contours)

    targetMat.drawContours(contours, new cv.Vec(255, 255, 255))

    const Rects = contours[0].boundingRect()

    targetMat.drawRectangle(
        new cv.Point(Rects.x, Rects.y),
        new cv.Point(Rects.x+Rects.width, Rects.y+Rects.height),
        new cv.Vec(0, 0, 255)
    )

    cv.imwrite(`./static/build/new-${i}.png`, targetMat);
}

function findCoordinate (points, sizeX = 0, sizeY = 0) {
  if (points.length <= 1) {
    return 0
  }
  let x1 = points[0].point.x
  let y1 = points[0].point.y
  let x2 = points[1].point.x
  let y2 = points[1].point.y
  for (let val of points) {
    if (val.point.x < x1) {
      x1 = val.point.x
    }
    if (val.point.x > x2) {
      x2 = val.point.x
    }
    if (val.point.y < y1) {
      y1 = val.point.y
    }
    if (val.point.y > y2) {
      y2 = val.point.y
    }
  }
  return [[x1 - sizeX, y1 - sizeY], [x2 + sizeX, y2 + sizeY]]
}

function draw (img, points, i) {
    let x1 = 0
    let y1 = 0
    let x2 = 0
    let y2 = 0
    if (points.length === 1) {
      x1 = points[0].point.x
      y1 = points[0].point.y
      img.drawCircle(new cv.Point(x1, y1), 10, new cv.Vec(0, 0, 255))
      return 0
    } else {
      let coor = []
      if (points.length < 15) {
        coor = findCoordinate(points, 10, 10)
      } else {
        coor = findCoordinate(points)
      }
      img.drawRectangle(
          new cv.Point(...coor[0]),
          new cv.Point(...coor[1]),
          new cv.Vec(0, 0, 255)
      )
    }

    cv.imwrite(`./static/build/new-${i}.png`, img);
    // else if (points.length < 5) {
    //     let index = Math.floor(points.length/2)
    //     x1 = points[index].point.x
    //     y1 = points[index].point.y
    //     img.drawCircle(new cv.Point(x1, y1), 15, new cv.Vec(0, 0, 255))
    // } else if (points[points.length-1].point.x - points[0].point.x > 100) { // 针对裂缝型瑕疵
    //     x1 = points[0].point.x
    //     y1 = points[0].point.y
    //     x2 = points[points.length-1].point.x
    //     y2 = points[points.length-1].point.y-3
    //     img.drawRectangle(
    //         new cv.Point(x1, y1),
    //         new cv.Point(x2, y2),
    //         new cv.Vec(0, 0, 255)
    //     )
    // } else {
    //     x1 = points[0].point.x-10
    //     y1 = points[0].point.y-10
    //     x2 = points[points.length-1].point.x+10
    //     y2 = points[points.length-1].point.y+10
    //     img.drawRectangle(
    //         new cv.Point(x1, y1),
    //         new cv.Point(x2, y2),
    //         new cv.Vec(0, 0, 255)
    //     )
    // }
}

/*
    int nfeatures = 0,
    int nOctaveLayers = 3 ,
    number contrastThreshold = 0.04 ,
    number edgeThreshold = 10 ,
    number sigma = 1.6
*/

//0, 3, 0.05, 50, 1.6
const detector = new cv.SIFTDetector(0, 3, 0.04, 50, 1.6)  // 构造一个sift检测器

for (let i=0; i<url.length; i++) {
    const initMat = cv.imread(url[i])

    const thrMat = imgCut(url[i])

    const keyPoints = detector.detect(thrMat)

    const descriptors = detector.compute(thrMat, keyPoints)

    let img = cv.drawKeyPoints(thrMat, keyPoints)   // 画出特征点

    // cv.imwrite(`./static/build/new-${i}.png`, img);

    draw(initMat, keyPoints, i)
}
