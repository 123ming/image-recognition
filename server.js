const cv = require('opencv4nodejs');

// cv.imreadAsync('./static/img/white-black-6.jpg', (err, img) => {
//     if (err) {
//         console.log(err)
//     }
//     console.log(JSON.stringify(img))
//
//     const garyImg = img.bgrToGray()         // 灰度处理
//     const blurImg = garyImg.medianBlur(5)   // 中值滤波操作
//
//     const thresholdImg = blurImg.canny(130, 50, 3, false)
//     cv.imwrite('./static/img/colors-change-1.jpg', thresholdImg)
// })

function imgCut (url) {
    const initMat = cv.imread(url)
    const garyMat = initMat.bgrToGray()   // 灰度化
    const blurMat = garyMat.medianBlur(5)    // 中值滤波操作
    // const thrMat = blurMat.canny(150, 50, 3, false)   // canny边缘检测
    return blurMat
}

const thrMat = imgCut('./static/init/gary-5.jpg')

// const thresholdImg = blurImg.canny(130, 50, 3, false)
// cv.imwrite('./static/build/new-img.jpg', thrMat)

const detector = new cv.SIFTDetector()

const keyPoints = detector.detect(thrMat)

// const descriptors = detector.compute(thrMat, keyPoints)

const index = Math.floor(keyPoints.length / 2)

console.log(keyPoints[index].point)

const img = cv.drawKeyPoints(thrMat, keyPoints)

// img.drawCircle(keyPoints[index].point, 15, new cv.Vec(255, 255, 255) , cv.LINE_8 , 1 , 0)
// // cv.circle(img,(200,200),50,(55,255,155),8)
//
cv.imshow('test', img);
cv.waitKey(1000000)
