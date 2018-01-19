const cv = require('opencv4nodejs');

cv.imreadAsync('./static/img/colors-4.jpg', (err, img) => {
    if (err) {
        console.log(err)
    }
    console.log(JSON.stringify(img))

    const garyImg = img.bgrToGray()         // 灰度处理
    const blurImg = garyImg.medianBlur(5)   // 中值滤波操作

    // const blockSize = 9   //计算局部阈值时的每个小窗口(每个局部)的大小,只能为奇数，最小值为3；
    // const constValue = 0  // 阈值偏移值，函数最终使用的阈值为使用adaptiveMethod计算出的阈值减去C。
    // const maxVal = 255    // 阈值化后的非零值
    //
    // /* 自适应阈值算法
    // 0：ADAPTIVE_THRESH_MEAN_C
    // 1: ADAPTIVE_THRESH_GAUSSIAN_C */
    //
    // const adaptiveMethod = 0
    //
    // /*阈值类型
    // 0: THRESH_BINARY
    // 1: THRESH_BINARY_INV */
    // const thresholdType = 0
    //
    // const  thresholdImg = blurImg.adaptiveThreshold(maxVal, adaptiveMethod, thresholdType, blockSize, constValue)

    const thresholdImg = blurImg.canny(10, 30, false)
    cv.imwrite('./static/img/colors-change-1.jpg', thresholdImg)
})
