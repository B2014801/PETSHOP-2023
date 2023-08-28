<template>
    <div>
        <ul class="navbar-nav">
            <li class="nav-item dropdown">
                <router-link
                    class="nav-link dropdown-toggle"
                    href="index.php"
                    id="navbarDropdownMenuLink"
                    role="button"
                    aria-haspopup="true"
                    aria-expanded="false"
                    to="/"
                >
                    Trang chủ
                </router-link>
                <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                    <router-link to="/about" class="dropdown-item">Giới thiệu</router-link>
                    <router-link to="/contact" class="dropdown-item">Liên hệ</router-link>
                </div>
            </li>
            <li class="nav-item dropdown">
                <router-link
                    class="nav-link"
                    href="index.php"
                    id="navbarDropdownMenuLink"
                    role="button"
                    aria-haspopup="true"
                    aria-expanded="false"
                    to="/product"
                >
                    Sản phẩm
                </router-link>
            </li>
            <li class="nav-item dropdown">
                <router-link
                    class="nav-link"
                    href="index.php"
                    id="navbarDropdownMenuLink"
                    role="button"
                    aria-haspopup="true"
                    aria-expanded="false"
                    to="/category"
                >
                    Danh mục
                </router-link>
            </li>
        </ul>
    </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped></style>
