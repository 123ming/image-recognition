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

    const garyMat = initMat.bgrToGray()   // 灰度化

    const thrMat = garyMat.canny(200, 150)   // canny边缘检测

    const thresholdMat = thrMat.adaptiveThreshold(100, 0, 0, 21, 0)  //这种阈值分割方法是根据灰度差异

    return thresholdMat
}

function drawRect (targetMat) {
    const counters = targetMat.findContours(cv.RETR_EXTERNAL, cv.CHAIN_APPROX_SIMPLE)

    const Rects = counters[1].boundingRect()

    targetMat.drawRectangle(
        new cv.Point(Rects.x, Rects.y),
        new cv.Point(Rects.x+Rects.width, Rects.y+Rects.height),
        new cv.Vec(255, 255, 255)
    )
}

function draw (img, points, i) {
    let x1 = 0
    let y1 = 0
    let x2 = 0
    let y2 = 0
    if (points.length < 5) {
        let index = Math.floor(points.length/2)
        x1 = points[index].point.x
        y1 = points[index].point.y
        img.drawCircle(new cv.Point(x1, y1), 15, new cv.Vec(0, 0, 255))
    } else if (points[points.length-1].point.x - points[0].point.x > 100) { // 针对裂缝型瑕疵
        x1 = points[0].point.x
        y1 = points[0].point.y
        x2 = points[points.length-1].point.x
        y2 = points[points.length-1].point.y-3
        img.drawRectangle(
            new cv.Point(x1, y1),
            new cv.Point(x2, y2),
            new cv.Vec(0, 0, 255)
        )
    } else {
        x1 = points[0].point.x-10
        y1 = points[0].point.y-10
        x2 = points[points.length-1].point.x+10
        y2 = points[points.length-1].point.y+10
        img.drawRectangle(
            new cv.Point(x1, y1),
            new cv.Point(x2, y2),
            new cv.Vec(0, 0, 255)
        )
    }

    cv.imwrite(`./static/build/new-${i}.png`, img);
}

/*
    int nfeatures = 0,
    int nOctaveLayers = 3 ,
    number contrastThreshold = 0.04 ,
    number edgeThreshold = 10 ,
    number sigma = 1.6
*/

const detector = new cv.SIFTDetector(0, 3, 0.04, 50, 1.6)  // 构造一个sift检测器

for (let i=0; i<url.length; i++) {
    const initMat = cv.imread(url[i])

    const thrMat = imgCut(url[i])

    const keyPoints = detector.detect(thrMat)

    let img = cv.drawKeyPoints(initMat, keyPoints)   // 画出特征点

    draw(initMat, keyPoints, i)
}
