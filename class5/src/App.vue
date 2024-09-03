<script>
export default {
    onLaunch: function () {
        console.log('App Launch')
        uni.loadFontFace({
            global: true,
            family: 'dakai',
            source: 'url("https://funny233.xyz/almm.ttf")',
            success: (result) => {console.log(result);},
            fail: (error) => {console.log(error);}
        })
    },
    onShow: function () {
        console.log('App Show')
    },
    onHide: function () {
        console.log('App Hide')
    }
}
</script>

<style>
/*每个页面公共css */
@font-face {
    font-family: 'zhihuibiantaoti';
    src: url('./static/zihunbiantaoti.ttf');
}

/* @font-face {
	font-family: 'dakai';
	src: url('./static/Alimama_DongFangDaKai_Regular.otf') format('opentype');
	font-weight: normal;
	font-style: normal;
} */
</style>
