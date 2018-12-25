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