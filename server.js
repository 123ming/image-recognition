const cv = require('opencv4nodejs');

cv.imreadAsync('./static/img/colors-1.jpg', (err, img) => {
    if (err) {
        console.log(err)
    }
    console.log(JSON.stringify(img))

    const garyImg = img.bgrToGray()         // 灰度处理
    const blurImg = garyImg.medianBlur(5)   // 中值滤波操作
    // const blurred = garyImg.blur(new cv.Size(10, 10))
    // const thresholded = blurred.threshold(
    //     97,
    //     143,
    //     cv.THRESH_BINARY
    // );

    // detect.detectAsync(garyImg, (err, res) => {
    //     console.log(res)
    // })

    cv.imwrite('./static/img/colors-change-1.jpg', garyImg)
})
