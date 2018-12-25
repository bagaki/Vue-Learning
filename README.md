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