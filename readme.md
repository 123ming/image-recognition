# 设计步骤

### 图像预处理

- 中值滤波处理
>  medianBlur() 中值滤波函数<br/>
   参数是一个数字， 必须为奇数<br/>

- 拉普拉斯算法锐化
>laplacian(-1, 1)

- 灰度化处理
> bgrToGray() 灰度化处理

### 动态阈值分割


### canny 函数  (边缘检测算法)

>第三个参数，double类型的threshold1，第一个滞后性阈值。<br/>
第四个参数，double类型的threshold2，第二个滞后性阈值。<br/>
第五个参数，int类型的apertureSize，表示应用Sobel算子的孔径大小，其有默认值3。<br/>
第六个参数，bool类型的L2gradient，一个计算图像梯度幅值的标识，有默认值false。<br/>

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

我这里采用的是SIFT检测算法<br/>

### drawKeyPoints 特征点
> const img = cv.drawKeyPoints(thrMat, keyPoints)

thrMat      就是一个预处理后的mat类型图像<br/>
keyPoints   由detector 的detect方法得出<br/>

### drawCircle 画圆圈
>img.drawCircle(keyPoints[index].point, 15, new cv.Vec(255, 255, 255) , cv.LINE_8 , 1 , 0)

img    需要处理的mat类型图像 <br/>
15     半径<br/>
point  圆心坐标，point类型 { x: ..., y: ... } <br/>
new cv.Vec(255, 255, 255)  画笔颜色<br/>
后面参数都是默认值
