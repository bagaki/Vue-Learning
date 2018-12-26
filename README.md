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

## 實現點擊加載更多評論的功能
1. 為加載更多按鈕，綁定點擊時間，在事件中，請求下一頁數據
2. 點擊加載更多，讓 pageIndex++，然後重新調用 this.getComments() 方法重新獲取最新一頁的數據
3. 爲了防止 新數據 覆蓋老數據的情況，在點擊加載更多的時候，每儅獲取到新數據，應該讓 老數據調用數組的 concat 方法，拼接上新數組