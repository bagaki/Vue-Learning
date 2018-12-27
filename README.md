# 這是一個webpack加vue的項目

## 主流開源協議之間的異同：https://www.zhihu.com/question/19568895

## 用命令行把修改后的代碼上傳到github
1. git add .
2. git commit -m "submit message"
3. git push

## 製作首頁App組件
1. 完成 Header, 使用 Mint-UI 中的 Header組件
2. 製作底部的 Tabbar，使用 MUI 的 Tabbar.html
 + 在製作 購物車 小圖標的時候，操作會相對多一些：
 + 先把擴展圖標 css 樣式，copy到項目中
 + copy擴展字體庫 ttf 文件，到項目中
 + 為購物車 小圖標，添加如下樣式 `mui-icon mui-icon-extra mui-icon-extra-cart`
3. 要在中間區域防止一個router-view來展示路由匹配到的組件

## 改造 tabbar 為 router-link

## 設置路由高亮

## 點擊 tabbar 中的路由連接，展示對應的路由組件

## 加載首頁輪播圖數據
1. 獲取數據，如何獲取，使用 vue-resource
2. 使用 vue-resource 的 this.$http.get 獲取數據
3. 獲取到的數據，要保存到data身上
4. 使用 v-for 循環渲染每個 item 項

## 改造九宮格樣式

## 改造 NewsList 路由鏈接

## NewsList 頁面製作
1. 繪製界面，使用 MUI 中的media-list.html
2. 使用 vue-resource 獲取數據
3. 渲染真是數據


## 實現 NewsList 點擊跳轉到 新聞詳情
1. 吧列表中的每一項改造為 router-link，同時，在跳轉的時候應該提供唯一的ID標識符
2. 創建辛未年詳情的組建頁面， NewsInfo.vue
3. 在路由模塊中，將 新聞詳情的路由地址和組建頁面對應起來

## 實現 新聞詳情 的頁面佈局 和 數據渲染

## 單獨封裝一個 commnet.vue 評論自組件
1. 先創建一個單獨的 comment.vue 組件模板
2. 在需要使用comment組件的頁面中，先手動導入comment組件
  + `import comment from './comment.vue'`
3. 在父組件中，使用 `components` 屬性，將剛才導入 comment 組件，注冊為自己的子組件
4. 將注冊子組件時候的，注冊名稱，以 標簽形式，在頁面中引用即可

## 獲取所有的評論數據顯示到頁面中
1. getComments

## 實現點擊加載更多評論的功能
1. 為加載更多按鈕，綁定點擊時間，在事件中，請求下一頁數據
2. 點擊加載更多，讓 pageIndex++，然後重新調用 this.getComments() 方法重新獲取最新一頁的數據
3. 爲了防止 新數據 覆蓋老數據的情況，在點擊加載更多的時候，每儅獲取到新數據，應該讓 老數據調用數組的 concat 方法，拼接上新數組

## 發表評論
1. 把文本框做雙向數據綁定
2. 為發表按鈕綁定一個事件
3.校驗評論内容是否爲空，如果爲空，則Toast提示用戶，評論不能爲空
4. 通過 vue-resource 發送一個請求，吧評論内容提交給 服務器
5. 儅發表評論OK后，重新刷新列表，以查看最新評論
  + 如果調用 getComments 方法重新刷新評論列表的話，可能只得到最後一頁的評論，前幾頁的評論獲取不到
  + 如果，儅評論成功后，在客戶端，手動拼接一個最新的評論對象，然後 調用數組的 unshift 方法，把最新的評論，追加到 data 中 comments 的開頭,便可以更新評論列表

## 改造圖片分析，按鈕為路由的鏈接並顯示對應的組件頁面

## 繪製 圖片列表 組件頁面結構並美化樣式
1. 頂部的滑動條
2. 製作 底部的圖片列表
### 製作頂部滑動條
1. 需要借助於MUI中的 tab-top-webview-main.html
2. 需要把 sslider區域的 mui-fullscreen 類去掉
3. 滑動條無法正常出發滑動，通過檢查官方文檔，這是JS組件，需要被初始化：
  + 導入 mui.js
  + 調用官方提供的 方式 初始化
  ```
  mui('.mui-scroll-wrapper').scroll({
	  deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
  });
  ```
4. 在初始化 滑動條的時候，導入的 mio.js，報錯
  + 据推測，可能mui.js中用到的 'caller', 'callee', and  'arguments' ，但 webpack 打包好的bundle.js中，默認啓用嚴格模式， 所以兩者衝突
  + 解決方案： 1. 吧mui.js中的非嚴格模式代碼改掉，不現實；
              2. 把 webpack 打包時候的嚴格模式禁用
  + 移除嚴格模式：npm install  babel-plugin-transform-remove-strict-mode -D
5. 剛進入圖片分享頁面時，滑動條無法正常執行，因爲如果要初始化 滑動  條，必須等 DOM 元素加載完畢，所以，把初始化 滑動條代碼移至 mounted生命周期函數
6. 儅滑動條ok后，tabbar無法正常執行時，便需要把每個tabbar按鈕的樣式    `mui-tab-item` 更改名字為 `mui-tab-item`,重新定義樣式，便可正常執行
7. 獲取所有分類，並渲染 分類列表

### 製作圖片列表區域
1. 圖片列表需要使用嬾加載技術，可以使用 Mint-UI 提供的現成的組件， `lazy-load`
2. 根據 `lazy-load` 的使用文檔
3. 渲染圖片列表數據


### 實現了圖片列表的嬾加載改造和樣式美化

## 實現了 點擊圖片跳轉大 圖片詳情頁面
1. 在改造 li 成 router-link 的時候，需要使用tag屬性指定要渲染為那種元素

## 實現詳情頁面的佈局和美化，同時獲取數據渲染頁面

## 實現圖片詳情中 縮略圖的功能
1. 使用 插件 vue-preview 這個縮略圖插件
2. 獲取到所有的圖片列表，然後使用 v-for  指令渲染數據
3. 注意： img標簽上的class不能去掉
4. 注意： 每個 圖片數據對象中，必須有 w 和 h 屬性


## 繪製 商品列表 頁面基本結構並美化

## 嘗試在手機上去進行項目的預覽和測試
1. 要保證手機可以正常運行
2. 要保證手機和開發項目的電腦 處於同一個 wifi 環境中，也就是說手機可以訪問到電腦的IP
3. 打開自己的項目中 package.js 文件，在 dev脚本中，添加一個 --host 指令，把當前電腦的wifi IP 地址，設置為 --host的指令值
  + 如何查看自己電腦所處 WIFI 的 IP 呢，在 cmd 終端中運行 `ipconfig`，查看無綫網的 ip 網址