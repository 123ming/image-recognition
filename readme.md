### canny 函数

>第三个参数，double类型的threshold1，第一个滞后性阈值。
第四个参数，double类型的threshold2，第二个滞后性阈值。
第五个参数，int类型的apertureSize，表示应用Sobel算子的孔径大小，其有默认值3。
第六个参数，bool类型的L2gradient，一个计算图像梯度幅值的标识，有默认值false。

###### 滞后阈值。Canny 使用了滞后阈值，滞后阈值需要两个阈值(高阈值和低阈值):

>Ⅰ.如果某一像素位置的幅值超过 高 阈值, 该像素被保留为边缘像素。
Ⅱ.如果某一像素位置的幅值小于 低 阈值, 该像素被排除。
Ⅲ.如果某一像素位置的幅值在两个阈值之间,该像素仅仅在连接到一个高于 高 阈值的像素时被保留。


### thresholdImg 函数

>   // const blockSize = 9   //计算局部阈值时的每个小窗口(每个局部)的大小,只能为奇数，最小值为3；
    // const constValue = 0  // 阈值偏移值，函数最终使用的阈值为使用adaptiveMethod计算出的阈值减去C。
    // const maxVal = 255    // 阈值化后的非零值
    //
    // 自适应阈值算法
    // 0：ADAPTIVE_THRESH_MEAN_C
    // 1: ADAPTIVE_THRESH_GAUSSIAN_C
    // const adaptiveMethod = 0
    //
    // 阈值类型
    // 0: THRESH_BINARY
    // 1: THRESH_BINARY_INV
    // const thresholdType = 0
    //
    // const  thresholdImg = blurImg.adaptiveThreshold(maxVal, adaptiveMethod, thresholdType, blockSize, constValue)


### medianBlur 中值滤波函数

> 一个数字参数， 必须为奇数
