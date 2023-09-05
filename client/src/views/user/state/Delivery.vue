<template>
    <div class="container">
        <hr />
        <h3 class="text-center text-uppercase">Đang giao hàng</h3>

        <table class="table table-bordered table-responsive-sm shadow w-75 mx-auto">
            <tbody>
                <tr>
                    <td colspan="2">
                        <p class="mb-0 text-success">
                            <i class="fa-solid fa-truck"></i> Đơn hàng đang trên đường giao đến bạn
                        </p>
                    </td>
                </tr>

                <tr>
                    <td class="col-2">
                        <img
                            class="ml-2"
                            width="130"
                            height="100"
                            src="admincp/modules/quanlysp/uploads/<?php echo $row['hinhanhsp'] ?>"
                            alt=""
                        />
                    </td>
                    <td>
                        <span>tensp <b>x soluong</b></span>
                        <p class="text-danger">gia luc mua</p>
                        <p class="mb-0">Thành tiền: <b class="text-danger"> tamtinh</b></p>
                    </td>
                </tr>

                <tr>
                    <td colspan="2">Tổng đơn : <span class="text-danger font-weight-bold">tong tien</span></td>
                </tr>
            </tbody>
        </table>
        <p class="text-center m-0">"Bạn chưa đặt đơn hàng nào gần đây"</p>
    </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped></style>
