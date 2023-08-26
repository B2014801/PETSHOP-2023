<template>
    <div class="container row mx-auto mt-2">
        <div class="col-md-6 col-12 mb-2">
            <form action="" method="POST" onsubmit="return ValidateFromThanhToanThongTin()">
                <h3 class="col-12 pl-0">Thông tin thanh toán</h3>
                <div class="form-inline">
                    <div class="form-group my-1 col-sm-6 pl-md-0 pl-0">
                        <label for="form-check-label"><b>Tên </b>(<strong class="text-danger">*</strong>)</label>
                        <input
                            type="text"
                            name="hoten"
                            value="hoten"
                            class="form-control w-100 mt-1"
                            placeholder="Nhập tên của bạn"
                        />
                    </div>
                    <div class="form-group my-1 col-sm-6 pr-md-0 pr-sm-0 pl-0">
                        <label for="form-check-label"
                            ><b>Số điện thoại </b> (<strong class="text-danger">*</strong>)</label
                        >
                        <input
                            type="text"
                            id="sdt"
                            name="sodienthoai"
                            value="sodienthoai"
                            class="form-control w-100 mt-1"
                            placeholder="Nhập Email của bạn"
                        />
                    </div>
                </div>
                <div class="form-group my-1 col-sm-12 pr-md-0 pr-sm-0 pl-0">
                    <label for="form-check-label"><b>Email</b>(<strong class="text-danger">*</strong>)</label>
                    <input
                        type="text"
                        name="email"
                        value="email"
                        class="form-control w-100 mt-1"
                        placeholder="Nhập Email của bạn"
                    />
                </div>
                <div class="form-group my-1 col-sm-12 pr-md-0 pr-sm-0 pl-0">
                    <label for="form-check-label"
                        ><b>Địa chỉ nhận hàng </b>(<strong class="text-danger">*</strong>)</label
                    >
                    <input
                        type="text"
                        id="diachi"
                        name="diachi"
                        value="diachi"
                        class="form-control w-100 mt-1"
                        placeholder="Nhập địa chỉ của bạn"
                    />
                </div>

                <div><button class="btn btn-danger mt-2" name="capnhatthongtin" type="submit">Cập nhật</button></div>
            </form>
        </div>

        <div class="col-md-6 col-12 mb-2 col" style="border: 2px solid blue">
            <div style="padding: 20px">
                <h3 class="text-upercase">Đơn hàng của bạn</h3>
                <table class="table table-bordered">
                    <tr>
                        <th>Sản phẩm</th>
                        <th>Tạm tính</th>
                    </tr>

                    <tr>
                        <td>tensp <b> x2</b></td>
                        <td class="text-right"><b>100d</b></td>
                    </tr>
                    <tr>
                        <td>Tạm tính</td>
                        <td class="text-right"><b>100d</b></td>
                    </tr>
                    <tr>
                        <td>Tổng</td>
                        <td class="text-right"><b>100d</b></td>
                    </tr>
                </table>
                <div class="form-inline">
                    <form
                        action="pages/main/xulygiohang.php?action=dathang"
                        method="POST"
                        onsubmit="return ValidateFromThanhToanDonhang()"
                    >
                        <div class="accordion form-group col-12 pl-md-0" id="accordionPayment">
                            <div>
                                <div class="form-group" id="headingOne">
                                    <input
                                        class="form-check-input"
                                        type="checkbox"
                                        id="checkboxOne"
                                        data-toggle="collapse"
                                        data-target="#collapsetwo"
                                        aria-expanded="true"
                                        aria-controls="collapseOne"
                                    />
                                    <label class="form-check-label" for="checkboxOne">Hình thức thanh toán</label>
                                </div>

                                <div
                                    id="collapsetwo"
                                    class="collapse p-3 bg-light"
                                    aria-labelledby="headingOne"
                                    data-parent="#accordionPayment"
                                >
                                    <div>
                                        <div class="form-group" id="headingTwo">
                                            <input
                                                class="form-check-input"
                                                value="khi nhận hàng"
                                                type="radio"
                                                name="paymentMethod"
                                                id="checkboxTwo"
                                            />
                                            <label class="form-check-label" for="checkboxTwo"
                                                >Thanh toán khi nhận hàng</label
                                            >
                                        </div>
                                    </div>
                                    <div>
                                        <div class="form-group" id="headingThree">
                                            <input
                                                class="form-check-input"
                                                value="trực tuyến"
                                                type="radio"
                                                name="paymentMethod"
                                                id="checkboxThree"
                                                data-toggle="collapse"
                                                data-target="#collapseThree"
                                                aria-expanded="true"
                                            />
                                            <label class="form-check-label" for="checkboxThree"
                                                >Thanh toán online</label
                                            >
                                        </div>
                                        <div id="collapseThree" class="collapse p-3 bg-light">
                                            <p>
                                                Thông tin tài khoản thụ hưởng của Pet shop. Sau khi chuyển khoản, xin
                                                vui lòng thông báo cho chúng tôi qua số điên thoại 0925 086 811 để được
                                                phục vụ nhanh nhất.
                                            </p>
                                            <p>Ngân hàng: <b>Agribank</b></p>
                                            <p>Số tài khoản: <b>076582640</b></p>
                                            <p>Tên tài khoản: <b>NGUYỄN QUỐC TRUNG</b></p>
                                            <div class="text-center">
                                                <img src="img/thanhtoan/qr.jpg" alt="" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
                <div>
                    <button class="btn btn-danger mt-2" type="submit">Đặt hàng</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped></style>
