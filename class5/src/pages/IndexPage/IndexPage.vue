<template>
    <view>
        <IndexPage v-show="ShowSkeleton"></IndexPage>

        <view v-show="!ShowSkeleton">
            <view class="banner">
                <swiper indicator-dots circular class="banner-swiper">
                    <swiper-item>
                        <image :webp="true" src="https://funny233.xyz/static/index/组 794.webp" mode="scaleToFill" />
                    </swiper-item>
                    <swiper-item>
                        <image :webp="true" src="https://funny233.xyz/static/index/组 795.webp" mode="scaleToFill" />
                    </swiper-item>
                </swiper>
                <view class="banner-bg">
                    <image src="https://funny233.xyz/static/index/banner2.webp" mode="widthFix" />
                </view>
                <view class="banner-time">
                    <view class="banner-time-1">中国海洋大学百年校庆倒计时</view>
                    <view class="banner-time-2">{{ Math.floor((new Date('2024-10-25') - new Date()) / (1000 * 60 * 60 *
            24)) }}</view>
                    <!-- <view class="banner-time-1">天</view> -->

                </view>
            </view>

            <view class="module">
                <image src="https://funny233.xyz/static/index/1.webp" mode="scaleToFill" class="nav-bg" />
                <view class="buttons">
                    <view class="buttons-button" @click="NavTo('/pages/IndexPage/Map')">
                        <image
                            src="data:image/svg+xml;base64,PHN2ZyBpZD0iaWNvbl8xIiBkYXRhLW5hbWU9Imljb24gMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB3aWR0aD0iNDAuMTM0IiBoZWlnaHQ9IjQwLjEzNCIgdmlld0JveD0iMCAwIDQwLjEzNCA0MC4xMzQiPjxkZWZzPjxzdHlsZT4uY2xzLTJ7ZmlsbDojZmZmO2ZpbGwtcnVsZTpldmVub2RkfTwvc3R5bGU+PGxpbmVhckdyYWRpZW50IGlkPSJsaW5lYXItZ3JhZGllbnQiIHgxPSIuMzI2IiB4Mj0iLjY4OSIgeTI9IjEiIGdyYWRpZW50VW5pdHM9Im9iamVjdEJvdW5kaW5nQm94Ij48c3RvcCBvZmZzZXQ9IjAiIHN0b3AtY29sb3I9IiMwMzg1ZmYiLz48c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiM4MGMxZmYiLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48cmVjdCBpZD0i55+p5b2iXzU5IiBkYXRhLW5hbWU9IuefqeW9oiA1OSIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiByeD0iMjAiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC4xMzQpIiBmaWxsPSIjZmZmIi8+PGcgaWQ9Iue7hF8xOSIgZGF0YS1uYW1lPSLnu4QgMTkiPjxnIGlkPSLnu4RfMTYiIGRhdGEtbmFtZT0i57uEIDE2Ij48cGF0aCBpZD0iYmciIGNsYXNzPSJjbHMtMiIgZD0iTTQwLjEzNCAyMC4wNjdhMjAuMDY3IDIwLjA2NyAwIDEgMC0yMC4wNjcgMjAuMDY3IDIwLjEgMjAuMSAwIDAgMCAyMC4wNjctMjAuMDY3eiIvPjxwYXRoIGlkPSJiZy0yIiBkYXRhLW5hbWU9ImJnIiBkPSJNNDAuMTM0IDIwLjA2N2EyMC4wNjcgMjAuMDY3IDAgMSAwLTIwLjA2NyAyMC4wNjcgMjAuMSAyMC4xIDAgMCAwIDIwLjA2Ny0yMC4wNjd6IiBmaWxsPSJ1cmwoI2xpbmVhci1ncmFkaWVudCkiIGZpbGwtcnVsZT0iZXZlbm9kZCIvPjwvZz48cGF0aCBpZD0iY2lyY2xlIiBkPSJNNC4wNTQtMTJBMTYuMDU0IDE2LjA1NCAwIDEgMCAyMC4xMDcgNC4wNTQgMTYuMDQ5IDE2LjA0OSAwIDAgMCA0LjA1NC0xMnoiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDEzLjAwMyAxMy4wMDMpIiBvcGFjaXR5PSIuMTIiIGZpbGwtcnVsZT0iZXZlbm9kZCIgZmlsbD0iI2ZmZiIvPjxwYXRoIGlkPSJjaXJjbGUtMiIgZGF0YS1uYW1lPSJjaXJjbGUiIGQ9Ik0zNi4wNTQgMjBhMTYuMDU0IDE2LjA1NCAwIDEgMCAxNi4wNTMgMTYuMDU0QTE2LjA0OSAxNi4wNDkgMCAwIDAgMzYuMDU0IDIweiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTEyLjk3NyAtMTIuOTc3KSIgb3BhY2l0eT0iLjA4IiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGZpbGw9IiNmZmYiLz48ZyBpZD0i57uEXzE4IiBkYXRhLW5hbWU9Iue7hCAxOCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTEuMDM3IDExLjAzNykiPjxnIGlkPSLnu4RfMTciIGRhdGEtbmFtZT0i57uEIDE3Ij48cGF0aCBpZD0i6Lev5b6EXzEiIGRhdGEtbmFtZT0i6Lev5b6EIDEiIGNsYXNzPSJjbHMtMiIgZD0iTTE3LjcwOSA4LjE2N0w5LjcuMjUxQS45NjMuOTYzIDAgMCAwIDkuMDQgMGEuODcuODcgMCAwIDAtLjY5Mi4yODFMLjMxMSA4LjE2N0ExLjIwNiAxLjIwNiAwIDAgMCAwIDkuMDFhMS4wNiAxLjA2IDAgMCAwIDEgMS4xMzRoMXY2LjVhMS4zNDEgMS4zNDEgMCAwIDAgMS4yNjEgMS40MTZoLjVhLjM3Ni4zNzYgMCAwIDAgLjExLS4wMS43MTEuNzExIDAgMCAwIC4xNC4wMWgxLjc1OGExLjM0MSAxLjM0MSAwIDAgMCAxLjI1NC0xLjQxNXYtMy4xYTEuMDc5IDEuMDc5IDAgMCAxIDEtMS4xMzRoMi4wMDdhMS4wNzkgMS4wNzkgMCAwIDEgMSAxLjEzNHYzLjFhMS4zNDEgMS4zNDEgMCAwIDAgMS4yNTQgMS40MTVIMTQuOGExLjM0MSAxLjM0MSAwIDAgMCAxLjI1NC0xLjQxNXYtLjU2MmEyLjgzNCAyLjgzNCAwIDAgMCAuMDItLjI5MWwtLjAzLTUuNjQ5aDFhMS4wNzkgMS4wNzkgMCAwIDAgMS0xLjEzNCAxLjAxNCAxLjAxNCAwIDAgMC0uMzM1LS44NDJ6Ii8+PC9nPjwvZz48L2c+PC9zdmc+"
                            mode="aspectFit" />
                        <span>云回家</span>
                    </view>
                    <view class="buttons-button" @click="NavTo('/pages/BlessPage/BlessPage')">
                        <image
                            src="data:image/svg+xml;base64,PHN2ZyBpZD0iXzAwMiIgZGF0YS1uYW1lPSIyIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MS4zNDciIGhlaWdodD0iNDEuMzQ3IiB2aWV3Qm94PSIwIDAgNDEuMzQ3IDQxLjM0NyI+PGRlZnM+PHN0eWxlPi5jbHMtMntmaWxsOiNmZmY7ZmlsbC1ydWxlOmV2ZW5vZGR9PC9zdHlsZT48bGluZWFyR3JhZGllbnQgaWQ9ImxpbmVhci1ncmFkaWVudCIgeDE9Ii4zMjYiIHgyPSIuNjg5IiB5Mj0iMSIgZ3JhZGllbnRVbml0cz0ib2JqZWN0Qm91bmRpbmdCb3giPjxzdG9wIG9mZnNldD0iMCIgc3RvcC1jb2xvcj0iI2ZmOGFhZCIvPjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iI2ZmMzY1ZSIvPjwvbGluZWFyR3JhZGllbnQ+PC9kZWZzPjxnIGlkPSJpY29uXzEiIGRhdGEtbmFtZT0iaWNvbiAxIj48cmVjdCBpZD0i55+p5b2iXzU5IiBkYXRhLW5hbWU9IuefqeW9oiA1OSIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiByeD0iMjAiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC44MzMpIiBmaWxsPSIjZmZmIi8+PGcgaWQ9Iue7hF8xOSIgZGF0YS1uYW1lPSLnu4QgMTkiPjxnIGlkPSLnu4RfMTYiIGRhdGEtbmFtZT0i57uEIDE2Ij48cGF0aCBpZD0iYmciIGNsYXNzPSJjbHMtMiIgZD0iTTQxLjM0NyAyMC42NzNhMjAuNjczIDIwLjY3MyAwIDEgMC0yMC42NzQgMjAuNjc0IDIwLjcwNyAyMC43MDcgMCAwIDAgMjAuNjc0LTIwLjY3NHoiLz48cGF0aCBpZD0iYmctMiIgZGF0YS1uYW1lPSJiZyIgZD0iTTQxLjM0NyAyMC42NzNhMjAuNjczIDIwLjY3MyAwIDEgMC0yMC42NzQgMjAuNjc0IDIwLjcwNyAyMC43MDcgMCAwIDAgMjAuNjc0LTIwLjY3NHoiIGZpbGw9InVybCgjbGluZWFyLWdyYWRpZW50KSIgZmlsbC1ydWxlPSJldmVub2RkIi8+PC9nPjxwYXRoIGlkPSJjaXJjbGUiIGQ9Ik00LTEyQTE2IDE2IDAgMSAwIDIwIDQgMTYgMTYgMCAwIDAgNC0xMnoiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDEzIDEzKSIgb3BhY2l0eT0iLjEyIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGZpbGw9IiNmZmYiLz48cGF0aCBpZD0iY2lyY2xlLTIiIGRhdGEtbmFtZT0iY2lyY2xlIiBkPSJNMzYgMjBhMTYgMTYgMCAxIDAgMTYgMTYgMTYgMTYgMCAwIDAtMTYtMTZ6IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMTMgLTEzKSIgb3BhY2l0eT0iLjA4IiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGZpbGw9IiNmZmYiLz48L2c+PC9nPjxwYXRoIGlkPSJWZWN0b3IiIGNsYXNzPSJjbHMtMiIgZD0iTTEyLjIyIDYuMDQyYTEuODQ3IDEuODQ3IDAgMCAxLTIuMDQtLjhsLTEuNTQtMi41OGgtLjA2bC0xLjU0IDIuNThhMS44NDcgMS44NDcgMCAwIDEtMi4wNC44bC0zLjU5LTEuMDJ2NC42OWExLjM0OCAxLjM0OCAwIDAgMCAxLjAyIDEuMzFsNS43NCAxLjQ0YTEuODcgMS44NyAwIDAgMCAuODggMGw1Ljc0LTEuNDRhMS4zNDggMS4zNDggMCAwIDAgMS4wMi0xLjMxdi00LjY5ek04LjYxLjg0MkwxLjczIDBhLjQ1Ny40NTcgMCAwIDAtLjQ2LjI1TC4xIDIuNTkyYS44OTIuODkyIDAgMCAwIC41NSAxLjI3bDQuNiAxLjMyYS44NzUuODc1IDAgMCAwIDEuMDEtLjQzem0wIDBsMi4zNSAzLjkxYS44NzUuODc1IDAgMCAwIDEuMDEuNDNsNC42LTEuMzJhLjkuOSAwIDAgMCAuNTYtMS4yN0wxNS45NS4yNTJBLjQ1Ny40NTcgMCAwIDAgMTUuNDkgMHoiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDExLjM4OCAxMy45MDcpIi8+PC9zdmc+"
                            mode="aspectFit" />
                        <span>云祝福</span>
                    </view>
                    <view class="buttons-button" @click="NavTo('/pages/IndexPage/CloudVisit')">
                        <image
                            src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MC4zMTkiIGhlaWdodD0iNDAuMzE5IiB2aWV3Qm94PSIwIDAgNDAuMzE5IDQwLjMxOSI+PGRlZnM+PHN0eWxlPi5jbHMtMXtmaWxsOiNmZmZ9PC9zdHlsZT48bGluZWFyR3JhZGllbnQgaWQ9ImxpbmVhci1ncmFkaWVudCIgeDE9Ii4zMjYiIHgyPSIuNjg5IiB5Mj0iMSIgZ3JhZGllbnRVbml0cz0ib2JqZWN0Qm91bmRpbmdCb3giPjxzdG9wIG9mZnNldD0iMCIgc3RvcC1jb2xvcj0iIzNkZjI3ZiIvPjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iIzM3YzM3ZCIvPjwvbGluZWFyR3JhZGllbnQ+PC9kZWZzPjxnIGlkPSLnu4RfNzg3IiBkYXRhLW5hbWU9Iue7hCA3ODciIHRyYW5zZm9ybT0idHJhbnNsYXRlKC4wNTQpIj48ZyBpZD0iaWNvbl8xIiBkYXRhLW5hbWU9Imljb24gMSI+PHJlY3QgaWQ9IuefqeW9ol81OSIgZGF0YS1uYW1lPSLnn6nlvaIgNTkiIGNsYXNzPSJjbHMtMSIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiByeD0iMjAiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0uMDU0KSIvPjxnIGlkPSLnu4RfMTkiIGRhdGEtbmFtZT0i57uEIDE5IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtLjA1NCkiIGZpbGwtcnVsZT0iZXZlbm9kZCI+PGcgaWQ9Iue7hF8xNiIgZGF0YS1uYW1lPSLnu4QgMTYiPjxwYXRoIGlkPSJiZyIgZD0iTTQwLjMxOSAyMC4xNTlhMjAuMTU5IDIwLjE1OSAwIDEgMC0yMC4xNiAyMC4xNiAyMC4xOTMgMjAuMTkzIDAgMCAwIDIwLjE2LTIwLjE2eiIgZmlsbD0iI2ZmZiIvPjxwYXRoIGlkPSJiZy0yIiBkYXRhLW5hbWU9ImJnIiBkPSJNNDAuMzE5IDIwLjE1OWEyMC4xNTkgMjAuMTU5IDAgMSAwLTIwLjE2IDIwLjE2IDIwLjE5MyAyMC4xOTMgMCAwIDAgMjAuMTYtMjAuMTZ6IiBmaWxsPSJ1cmwoI2xpbmVhci1ncmFkaWVudCkiLz48L2c+PHBhdGggaWQ9ImNpcmNsZSIgZD0iTTQuMTI4LTEyQTE2LjEyOCAxNi4xMjggMCAxIDAgMjAuMjU1IDQuMTI4IDE2LjEyMyAxNi4xMjMgMCAwIDAgNC4xMjgtMTJ6IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxMy4wMDggMTMuMDA4KSIgb3BhY2l0eT0iLjEyIiBmaWxsPSIjZmZmIi8+PHBhdGggaWQ9ImNpcmNsZS0yIiBkYXRhLW5hbWU9ImNpcmNsZSIgZD0iTTM2LjEyOCAyMGExNi4xMjggMTYuMTI4IDAgMSAwIDE2LjEyNyAxNi4xMjhBMTYuMTIzIDE2LjEyMyAwIDAgMCAzNi4xMjggMjB6IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMTIuOTQ0IC0xMi45NDQpIiBvcGFjaXR5PSIuMDgiIGZpbGw9IiNmZmYiLz48L2c+PC9nPjxwYXRoIGlkPSLmuLjop4giIGNsYXNzPSJjbHMtMSIgZD0iTTEzNy4zMjEgMTAwLjcxNmw1Ljc3My0zLjQ2Mi01Ljc3My0zLjY1NC01Ljc3MyAzLjY1NnptLTcuNDM3LTQuNjUxbDYuNjc3LTQuMjI3YTEuNDIxIDEuNDIxIDAgMCAxIDEuNTIgMGw2LjY3NiA0LjIyN2ExLjQyMSAxLjQyMSAwIDAgMS0uMDI5IDIuNDE5bC02LjY3NiA0YTEuNDIxIDEuNDIxIDAgMCAxLTEuNDYyIDBsLTYuNjc2LTRhMS40MjEgMS40MjEgMCAwIDEtLjAyOS0yLjQxOXptNy40MzcgOC4zNzlsNy4wOTItNC4yNTNhLjk0Ny45NDcgMCAxIDEgLjk3NCAxLjYyNWwtNy41NzkgNC41NDRhLjk0Ny45NDcgMCAwIDEtLjk3NCAwbC03LjU3OS00LjU0NGEuOTQ3Ljk0NyAwIDAgMSAuOTc0LTEuNjI1em0yLjY2IDIuMTk0YS45NDcuOTQ3IDAgMSAxIC45NzQgMS42MjVsLTMuMTQ3IDEuODg3YS45NDcuOTQ3IDAgMCAxLS45NzQgMGwtNy41NzktNC41NDRhLjk0Ny45NDcgMCAwIDEgLjk3NC0xLjYyNWw3LjA5MiA0LjI1MyAyLjY2LTEuNnptNC40NDQtLjMyNHYxLjMyNmgxLjEzNmEuMjg0LjI4NCAwIDAgMSAuMjE3LjQ2N2wtMS42MSAxLjlhLjI4NC4yODQgMCAwIDEtLjQzMyAwbC0xLjYxLTEuOWEuMjg0LjI4NCAwIDAgMSAuMjE4LS40NjhoMS4xMzV2LTEuMzI2aC0xLjEzNmEuMjg0LjI4NCAwIDAgMS0uMjE3LS40NjdsMS42MS0xLjlhLjI4NC4yODQgMCAwIDEgLjQzMyAwbDEuNjEgMS45YS4yODQuMjg0IDAgMCAxLS4yMTguNDY4aC0xLjEzNHoiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0xMTcuMDc1IC04MC45NTEpIi8+PC9nPjwvc3ZnPg=="
                            mode="aspectFit" />
                        <span>云游览</span>
                    </view>
                    <view class="buttons-button" @click="NavTo('/pages/CulturePage/CulturePage')">
                        <image
                            src="data:image/svg+xml;base64,PHN2ZyBpZD0i57uEXzc4OCIgZGF0YS1uYW1lPSLnu4QgNzg4IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MC42MiIgaGVpZ2h0PSI0MC42MiIgdmlld0JveD0iMCAwIDQwLjYyIDQwLjYyIj48ZGVmcz48c3R5bGU+LmNscy0ye2ZpbGw6I2ZmZjtmaWxsLXJ1bGU6ZXZlbm9kZH08L3N0eWxlPjxsaW5lYXJHcmFkaWVudCBpZD0ibGluZWFyLWdyYWRpZW50IiB4MT0iLjMyNiIgeDI9Ii42ODkiIHkyPSIxIiBncmFkaWVudFVuaXRzPSJvYmplY3RCb3VuZGluZ0JveCI+PHN0b3Agb2Zmc2V0PSIwIiBzdG9wLWNvbG9yPSIjZjI4MjFmIi8+PHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjZjJiZDZkIi8+PC9saW5lYXJHcmFkaWVudD48L2RlZnM+PGcgaWQ9Imljb25fMSIgZGF0YS1uYW1lPSJpY29uIDEiPjxyZWN0IGlkPSLnn6nlvaJfNTkiIGRhdGEtbmFtZT0i55+p5b2iIDU5IiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHJ4PSIyMCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLjM4MikiIGZpbGw9IiNmZmYiLz48ZyBpZD0i57uEXzE5IiBkYXRhLW5hbWU9Iue7hCAxOSI+PGcgaWQ9Iue7hF8xNiIgZGF0YS1uYW1lPSLnu4QgMTYiPjxwYXRoIGlkPSJiZyIgY2xhc3M9ImNscy0yIiBkPSJNNDAgMjBhMjAgMjAgMCAxIDAtMjAgMjAgMjAuMDMzIDIwLjAzMyAwIDAgMCAyMC0yMHoiLz48cGF0aCBpZD0iYmctMiIgZGF0YS1uYW1lPSJiZyIgZD0iTTQwLjYyIDIwLjMxYTIwLjMxIDIwLjMxIDAgMSAwLTIwLjMxIDIwLjMxIDIwLjM0NCAyMC4zNDQgMCAwIDAgMjAuMzEtMjAuMzF6IiBmaWxsPSJ1cmwoI2xpbmVhci1ncmFkaWVudCkiIGZpbGwtcnVsZT0iZXZlbm9kZCIvPjwvZz48cGF0aCBpZD0iY2lyY2xlIiBkPSJNNC0xMkExNiAxNiAwIDEgMCAyMCA0IDE2IDE2IDAgMCAwIDQtMTJ6IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxMyAxMykiIG9wYWNpdHk9Ii4xMiIgZmlsbC1ydWxlPSJldmVub2RkIiBmaWxsPSIjZmZmIi8+PHBhdGggaWQ9ImNpcmNsZS0yIiBkYXRhLW5hbWU9ImNpcmNsZSIgZD0iTTM2IDIwYTE2IDE2IDAgMSAwIDE2IDE2IDE2IDE2IDAgMCAwLTE2LTE2eiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTEzIC0xMykiIG9wYWNpdHk9Ii4wOCIgZmlsbC1ydWxlPSJldmVub2RkIiBmaWxsPSIjZmZmIi8+PC9nPjwvZz48cGF0aCBpZD0iVmVjdG9yIiBjbGFzcz0iY2xzLTIiIGQ9Ik0yLjc4IDE0LjI5YTEuNjkgMS42OSAwIDAgMCAwIDMuMzggMS42OSAxLjY5IDAgMCAwIDAtMy4zOHptOC40NyAxLjY5YTEuNjg1IDEuNjg1IDAgMSAwIDEuNjktMS42OSAxLjY5NCAxLjY5NCAwIDAgMC0xLjY5IDEuNjl6bS02LjM5LTIuMmE4Ljk3NiA4Ljk3NiAwIDAgMCAyLjk4LjUxIDkuMDgyIDkuMDgyIDAgMCAwIDMuMDUtLjUxIDguMjM0IDguMjM0IDAgMCAwIDIuNTUtMS40NiA2LjYyMyA2LjYyMyAwIDAgMCAxLjcxLTIuMTkgNS44ODYgNS44ODYgMCAwIDAgLjYtMi41OVY1LjI5aDEuMTNhMS4xMjUgMS4xMjUgMCAwIDAgMC0yLjI1aC0xLjEzYTIuMjUzIDIuMjUzIDAgMCAwLTIuMjUgMi4yNXYyLjI1SDBhNS44ODYgNS44ODYgMCAwIDAgLjYgMi41OSA2LjkgNi45IDAgMCAwIDEuNzEgMi4xOSA4LjIzNCA4LjIzNCAwIDAgMCAyLjU1IDEuNDZ6TTMuNDguMTZBNy45IDcuOSAwIDAgMCAwIDYuNDJoOC45N0w0Ljg4LjQ3YTEuMDIzIDEuMDIzIDAgMCAwLTEuNC0uMzF6IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxMS41IDExLjMzKSIvPjwvc3ZnPg=="
                            mode="aspectFit" />
                        <span>学部文创</span>
                    </view>
                </view>
            </view>


            <view class="module module-bg">
                <view class="module-title">
                    <view class="module-title-qwq title-news">
                        <image src="https://funny233.xyz/static/index/title.webp" mode="aspectFit" />
                        <view>新闻</view>
                    </view>
                    <view class="module-title-qaq" @click="SwitchTab('/pages/NewsPage/NewsPage')">
                        <image src="https://funny233.xyz/static/index/Export.webp" mode="aspectFit" />
                        <view>查看更多</view>
                    </view>
                </view>
                <uni-swiper-dot :info="News" field="content" :current="NewsCurrent" mode="round" :dotsStyles="{
            backgroundColor: '#fff',
            border: '1px solid #fff',
            selectedBackgroundColor: '#2699FB',
            selectedBorder: '1px solid #2699FB',
        }">
                    <swiper class="swiper-box" @change="NewsChange" :autoplay="true" :interval="6000" :duration="300"
                        circular>
                        <swiper-item class="swiper-item" v-for="(item, index) in News" :key="index"
                            @click="NavTo(`/pages/NewsPage/News?id=${item.id}`)">
                            <!-- <view class="swiper"> -->
                            <image :src="item.image || 'https://funny233.xyz/static/news/default.webp'" mode="aspectFill" />
                            <view class="swiper-item-ghost"></view>
                            <view class="swiper-item-title">
                                <view class="swiper-item-title-time">{{ new Date(item.published).getFullYear() + "/" +
            (new
                Date(item.published).getMonth() + 1) + "/" + new Date(item.published).getDate() }}
                                </view>
                                <view class="swiper-item-title-content">{{ item.title }}</view>
                            </view>
                            <!-- </view> -->
                        </swiper-item>
                    </swiper>
                </uni-swiper-dot>
            </view>


            <view class="module module-bg2">
                <view class="module-title">
                    <view class="module-title-qwq title-events">
                        <image src="https://funny233.xyz/static/index/title.webp" mode="aspectFit" />
                        <view>活动</view>
                    </view>
                    <view @click="SwitchTab('/pages/ActivitivesPage/ActivitivesPage')" class="module-title-qaq"
                        style="border-bottom: 2rpx solid #F29C9F;">
                        <image src="https://funny233.xyz/static/index/Export.webp" mode="aspectFit" />
                        <view style="color: #F29C9F;">查看更多</view>
                    </view>
                </view>

                <view class="ac" v-for="(i, index) in Activitives"
                    @click="NavTo(`/pages/ActivitivesPage/AcDetailPage?id=${i.id}`)">
                    <view class="ac-image">
                        <image :src="BaseUrl + i.photos[i.photos.length - 1].picture" mode="aspectFill" />
                    </view>
                    <view class="ac-right">
                        <view class="ac-title">{{ i.title }}</view>
                        <view class="ac-desc">{{ i.description }}</view>
                        <view class="ac-msg">
                            <view class="ac-time">{{ new Date(i.start_time).getFullYear() }}/{{ new
            Date(i.start_time).getMonth() }}/{{ new Date(i.start_time).getDate() }}</view>
                            <!-- <view class="ac-author">发布人：{{ i.author }}</view> -->
                        </view>
                    </view>
                </view>
            </view>

            <view style="height: 30rpx;"></view>
        </view>


    </view>
</template>

<script>
import IndexPage from '../../components/skeleton/IndexPage.vue'
import { request, BaseUrl } from '../../js/request'
export default {
    components: {
        IndexPage
    },
    data() {
        return {
            BaseUrl,

            NewsCurrent: 0,
            News: [],

            ActivitivesCurrent: 0,
            Activitives: [],

            ShowSkeleton: true
        }
    },
    methods: {
        NewsChange(e) {
            this.NewsCurrent = e.detail.current
        },
        ActivitivesChange(e) {
            this.ActivitivesCurrent = e.detail.current
        },
        SwitchTab(url) {
            uni.switchTab({ url })
        },
        NavTo(url) {
            uni.navigateTo({ url })
        },
        GetNews() {

        }
    },
    mounted() {
        request('/api/news/news/', "GET", {}, {}, false).then(res => {
            this.News = res.data.splice(0, 5)
            this.ShowSkeleton = false
            console.log(this.News);
        }).catch(err => {
            console.log(err)
            this.ShowSkeleton = false
        })
        request('/api/news/activity/', "GET", {}, {}, false).then(res => {
            this.Activitives = res.data.splice(0, 3)
            this.ShowSkeleton = false
            console.log(this.Activitives);
        }).catch(err => {
            console.log(err)
            this.ShowSkeleton = false
        })
    },
}
</script>

<style scoped>
.banner {
    width: 100%;
    height: 350rpx;
    position: relative;
    /* height: 300rpx; */
}

.banner-swiper {
    height: 100%;
}

.banner-swiper image {
    width: 100%;
    height: 100%;
}

.banner-bg {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 20rpx;
    left: 0;
    pointer-events: none;
}

.banner-bg image {
    width: 100%;
    height: 100%;
}

.banner-time {
    position: absolute;
    bottom: 30rpx;
    right: 50rpx;
    color: white;
    font-family: 'zhihuibiantaoti';
    display: flex;
    align-items: flex-end;
    pointer-events: none;
}

.banner-time-1 {
    font-size: 44rpx;
    margin-bottom: 16rpx;
}

.banner-time-2 {
    font-size: 108rpx;
    margin-left: 20rpx;
}

.module {
    margin: 32rpx;
    box-shadow: 0rpx 0rpx 12rpx 2rpx rgba(0, 0, 0, 0.16);
    padding: 36rpx;
    background-color: #FFFFFF;
    position: relative;
    overflow: hidden;
}

.buttons {
    display: flex;
    justify-content: space-between;
    font-size: 28rpx;
}

.buttons-button {
    /* width: 25%; */
    color: #4A4A4A;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0;
    background-color: transparent;
    border: none;
}

.buttons-button image {
    width: 64rpx;
    height: 64rpx;
    margin-bottom: 12rpx;
}

.module-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 40rpx;
    color: #4A4A4A;
    margin-top: -10rpx;
    margin-bottom: 10rpx;
}

.module-title-qwq {
    display: flex;
    align-items: center;
    z-index: 10;
    font-family: "dakai";
}

.module-title-qwq::after {
    font-family: Times New Roman, Times New Roman;
    font-size: 40rpx;
    color: #c9c9c9;
    transform: translate(-10rpx, -20rpx);
    z-index: 9;
}

.title-news::after {
    content: 'NEWS';
}

.title-events::after {
    content: 'EVENTS';
}

.module-title-qwq image {
    width: 70rpx;
    height: 70rpx;
    margin-left: -16rpx;
    margin-top: 3rpx;
}

.module-title-qwq view {
    margin-top: -14rpx;
    font-weight: 600;
    letter-spacing: 2rpx;

}

.module-title-qaq {
    border-bottom: 2rpx solid #2699FB;
    display: flex;
    align-items: center;
}

.module-title-qaq image {
    width: 25rpx;
    height: 29rpx;
    /* margin-left: -16rpx; */
}

.module-title-qaq view {
    margin-left: 8rpx;
    font-size: 24rpx;
    /* margin-top: -14rpx; */
    letter-spacing: 2rpx;
    color: #2699FB;
    margin-top: -6rpx;
}

.module-bg {
    background: linear-gradient(180deg, #FFFFFF 0%, #CFEDFA 100%);
}

.module-bg2 {
    background: linear-gradient(180deg, #FFFFFF 0%, #F9D5D6 11%, #F29C9F 100%);
}

.swiper-box {
    width: 100%;
    height: 388rpx;

}

.swiper-item {
    width: 100%;
    position: relative;
}

.swiper-item image {
    width: 100%;
    position: absolute;
    top: 0;
    z-index: 3;
}

.swiper-item-title {
    z-index: 5;
    color: #FFFFFF;
    position: absolute;
    bottom: 44rpx;
    left: 34rpx;
    width: 100%;
}

.swiper-item-title-time {
    font-size: 24rpx;
    font-family: Times New Roman, Times New Roman;
}

.swiper-item-title-content {
    font-size: 26rpx;
    font-weight: bold;
    /* 不换行自动显示省略号 */
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: calc(100% - 68rpx);
}

.swiper-item-ghost {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    z-index: 4;
    background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.5) 100%);
}

.ac {
    background: rgba(255, 255, 255, 0.4);
    box-shadow: 0rpx 0rpx 12rpx 2rpx rgba(0, 0, 0, 0.16);
    display: flex;
    padding: 28rpx;
    margin-bottom: 24rpx;
}

.ac-image image {
    width: 200rpx;
    height: 200rpx;
}

.ac-right {
    margin-left: 28rpx;
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
}

.ac-title {
    font-size: 32rpx;
    color: #4A4A4A;
    font-family: 'dakai';
}

.ac-desc {
    font-size: 24rpx;
    color: #858585;
    height: 120rpx;
    overflow: hidden;
    -webkit-line-clamp: 2;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
}


.ac-msg {
    display: flex;
    justify-content: space-between;
    font-family: 'dakai';

}

.ac-time {
    font-size: 20rpx;
    color: #4A4A4A;
}

.ac-author {
    font-size: 20rpx;
    color: #4A4A4A;
}

.nav-bg {
    position: absolute;
    width: 100%;
    height: 100%;
    bottom: -50rpx;
    left: 0;
    pointer-events: none;
}
</style>

<style>
page {
    background-color: #F8F8F8;
}
</style>