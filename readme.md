# 设计步骤

### 图像预处理
2222222222222
- 中值滤波处理
>  medianBlur() 中值滤波函数<br/>
   参数是一个数字， 必须为奇数，数值越大越模糊<br/>

- 拉普拉斯算法锐化
>laplacian(-1, 1)， 第一个参数代表图像层级，第二个参数代表锐化程度

- 灰度化处理
> bgrToGray() 灰度化处理

### 动态阈值分割


### canny 函数  (边缘检测算法)

double threshold1：低阈值

double threshold2：高阈值

Sobel算子的Window大小 默认是3

bool L2gradient： false表示只用L1 Norm， true表示同时用L1和L2 Norm， True的时候精度更高。

###### 滞后阈值。Canny 使用了滞后阈值，滞后阈值需要两个阈值(高阈值和低阈值):

>Ⅰ.如果某一像素位置的幅值超过 高 阈值, 该像素被保留为边缘像素。<br/>
Ⅱ.如果某一像素位置的幅值小于 低 阈值, 该像素被排除。<br/>
Ⅲ.如果某一像素位置的幅值在两个阈值之间,该像素仅仅在连接到一个高于 高 阈值的像素时被保留。<br/>


### thresholdImg 函数

>    const blockSize = 9   //计算局部阈值时的每个小窗口(每个局部)的大小,只能为奇数，最小值为3；<br/>
     const constValue = 0  // 阈值偏移值，函数最终使用的阈值为使用adaptiveMethod计算出的阈值减去C。<br/>
     const maxVal = 255    // 阈值化后的非零值<br/>
    <br/>
     自适应阈值算法<br/>
     0：ADAPTIVE_THRESH_MEAN_C<br/>
     1: ADAPTIVE_THRESH_GAUSSIAN_C<br/>
     const adaptiveMethod = 0<br/>
    <br/>
     阈值类型<br/>
     0: THRESH_BINARY<br/>
     1: THRESH_BINARY_INV<br/>
     const thresholdType = 0<br/>
    <br/>
     const  thresholdImg = blurImg.adaptiveThreshold(maxVal, adaptiveMethod, thresholdType, blockSize, constValue)<br/>



### 特征点提取
> const detector = new cv.SIFTDetector()

这里采用的是SIFT检测算法<br/>

nfeatures：特征点数目（算法对检测出的特征点排名，返回最好的nfeatures个特征点）。
nOctaveLayers：金字塔中每组的层数。
contrastThreshold：过滤掉较差的特征点的对阈值。contrastThreshold越大，返回的特征点越少。
edgeThreshold：过滤掉边缘效应的阈值。edgeThreshold越大，特征点越多（被过滤掉的越少）。
sigma：金字塔第0层图像高斯滤波系数，也就是σ。

### drawKeyPoints 画特征点
> const img = cv.drawKeyPoints(thrMat, keyPoints)

thrMat      就是一个预处理后的mat类型图像<br/>
keyPoints   由detector 的detect方法得出<br/>

### drawCircle 画圈
>img.drawCircle(keyPoints[index].point, 15, new cv.Vec(255, 255, 255) , cv.LINE_8 , 1 , 0)

img    需要处理的mat类型图像 <br/>
15     半径<br/>
point  圆心坐标，point类型 { x: ..., y: ... } <br/>
new cv.Vec(255, 255, 255)  画笔颜色<br/>
后面参数都是默认值


````js
const blurMat = initMat.medianBlur(3)    // 中值滤波操作  // 数值越大图像越模糊  中值滤波是一种典型的低通滤波器，主要目的是在去除噪声的同时能够保护图像边缘。
const lapMat = blurMat.laplacian(-1, 5)

const blurMat = initMat.gaussianBlur(new cv.Size(9, 9), 0)  // 高斯滤波操作
const lapMat = blurMat.laplacian(-1, 3)
/*
	拉普拉斯算子锐化

	第一个参数是图像的深度，-1表示采用的是与原图像相同的深度。
	目标图像的深度必须大于等于原图像的深度

	第二个参数，越大锐化结果越清晰
*/

const thresholdMat = garyMat.adaptiveThreshold(255, 1, 0, 49, 0) // 动态阈值分割

const blurMat = thresholdMat.blur(new cv.Size(3, 3))  // 均值滤波

const eqMat = garyMat.equalizeHist()   // 灰度直方图均衡化 （效果很不好）


const keyPoints = detector.detect(thrMat)  // 得到特征点数组集合

console.log(keyPoints[0].point)

const img = cv.drawKeyPoints(initMat, keyPoints)   // 画出特征点

initMat.drawContours(counters, new cv.Vec(0, 0, 0))  // 画出轮廓

img.drawCircle(keyPoints[index].point, 15, new cv.Vec(255, 255, 255))
````
