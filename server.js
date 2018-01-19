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
    const thrMat = blurMat.canny(130, 50, 3, false)   // canny边缘检测
    return thrMat
}

const thrMat = imgCut('./static/init/gary-1.jpg')

// const thresholdImg = blurImg.canny(130, 50, 3, false)
cv.imwrite('./static/build/new-img.jpg', thrMat)

const detector = new cv.SIFTDetector({ nFeatures: 2000 })

const keyPoints = detector.detect(thrMat)

const descriptors = detector.compute(thrMat, keyPoints)

console.log(descriptors)
