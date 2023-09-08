<template>
    <div class="User-Home-Container">
        <div class="container">
            <div>
                <ul class="User-Home-Nav">
                    <li>
                        <router-link to="/user/profile">TÀI KHOẢN</router-link>
                    </li>
                    <li>
                        <router-link :to="{ name: 'state' }">TẤT CẢ</router-link>
                    </li>
                    <li>
                        <router-link :to="{ name: 'state', query: { state: 0 } }">CHỜ XÁC NHẬN</router-link>
                    </li>
                    <li>
                        <router-link :to="{ name: 'state', query: { state: 2 } }">ĐANG GIAO HÀNG</router-link>
                    </li>
                    <li>
                        <router-link :to="{ name: 'state', query: { state: 3 } }">HOÀN THÀNH</router-link>
                    </li>
                    <li>
                        <router-link :to="{ name: 'state', query: { state: 4 } }">ĐÃ HỦY</router-link>
                    </li>
                </ul>
            </div>
            <div><router-view></router-view></div>
        </div>
    </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.User-Home-Container {
    background: #f5f5f5;
    padding: 10px 0;
}
.User-Home-Nav {
    display: flex;
    justify-content: space-between;

    background-color: #fff;
    padding: 0;
    li {
        text-align: center;
        flex-grow: 1;
        flex-shrink: 0;
        flex-basis: 0%;
        // background-color: aqua;
        padding: 16px 0;
        border-bottom: 2px solid rgb(240 210 255);

        a:hover {
            color: red;
        }
        a {
            // font-size: 2vh;
            font-weight: 400;
            color: #000;
            padding: 16px 0;
        }
    }
}
</style>
