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
    // const blurMat = initMat.medianBlur(1)    // 中值滤波操作  // 数值越大图像越模糊
    // const lapMat = blurMat.laplacian(-1, 1)
    /*
        拉普拉斯算子锐化

        第一个参数是图像的深度，-1表示采用的是与原图像相同的深度。
        目标图像的深度必须大于等于原图像的深度

        第二个参数，越大锐化结果越清晰
    */
    const garyMat = initMat.bgrToGray()   // 灰度化
    // const eqMat = garyMat.equalizeHist()   // 灰度直方图均衡化 （效果很不好）

    // const thresholdMat = garyMat.adaptiveThreshold(35, 1, 1, 3, 0)  //这种阈值分割方法是根据灰度差异
    /*
        第一个参数，const maxVal = 255    // 阈值化后的非零值<br/>

        第二个参数， 自适应阈值算法种类，
        0：ADAPTIVE_THRESH_MEAN_C
        1: ADAPTIVE_THRESH_GAUSSIAN_C
        const adaptiveMethod = 0

        第三个参数，阈值类型，
        0: THRESH_BINARY
        1: THRESH_BINARY_INV
        const thresholdType = 0

        第四个参数，const blockSize = 9
        用来计算阈值的象素邻域大小: 3, 5, 7, ...

        第五个参数，const constValue = 0
        阈值偏移值，函数最终使用的阈值为使用adaptiveMethod计算出的阈值减去C。
    */
    const thrMat = garyMat.canny(200, 150, 3, false)   // canny边缘检测

    return thrMat
}

// const thresholdImg = blurImg.canny(130, 50, 3, false)
// cv.imwrite('./static/build/new-img.jpg', thrMat)

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

    const keyPoints = detector.detect(thrMat)  // 得到特征点数组集合

    // console.log(keyPoints[0].point)

    const img = cv.drawKeyPoints(initMat, keyPoints)   // 画出特征点

    // img.drawCircle(keyPoints[index].point, 15, new cv.Vec(255, 255, 255) , cv.LINE_8 , 1 , 0)

    // save image
    cv.imwrite(`./static/build/new-${i}.png`, img);

    // cv.imshow('t', img)
    // cv.waitKey(1000)
}
