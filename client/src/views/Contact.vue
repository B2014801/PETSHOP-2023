<template>
    <div id="lienhe-header">
        <h5 class="text-white positon-relative"><i class="fa-solid fa-phone"></i> LIÊN HỆ PET SHOP</h5>
        <p class="text-white"><i class="fa-solid fa-location-dot"></i> Địa chỉ shop: Long Tuyền, Bình Thủy, Cần Thơ</p>
        <p class="text-white"><i class="fa-regular fa-envelope"></i> Email : trungb2014801@student.ctu.edu.vn</p>
        <button class="btn btn-danger"><i class="fa-solid fa-phone"></i> 0925.086.811</button>
    </div>
    <hr />
    <div>
        <p class="mt-2 text-center">
            Chúng Tôi sẽ rất vui lòng nếu nhận được sự phản hồi của các bạn. Nếu có bất kỳ điều gì chưa hài thì hãy gửi
            yêu cầu đến chúng tôi. Chúng tôi sẽ cố gắng phản hồi nhanh nhất có thể
        </p>
    </div>
    <hr />
    <div>
        <a href="#">
            <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d31431.17147607504!2d105.7437779!3d10.0254046!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31a0895a51d60719%3A0x9d76b0035f6d53d0!2zVHLGsOG7nW5nIMSQ4bqhaSBo4buNYyBD4bqnbiBUaMah!5e0!3m2!1svi!2s!4v1677681023019!5m2!1svi!2s"
                height="450"
                style="border: 0"
                allowfullscreen=""
                width="100%"
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
            ></iframe>
        </a>
    </div>
</template>

<script>
export default {
    mounted() {
        document.title = 'Contact';
    },
};
</script>

<style lang="scss" scoped>
#lienhe-header {
    position: relative;
    padding: 100px 0;
    text-align: center;
    margin: 2px 10px 0;
    /* //thay the hinh nen */
    // isolation: isolate;
}
#lienhe-header::after {
    content: '';
    position: absolute;
    /* di chuyen ra phia sau text */
    z-index: -1;
    background-image: linear-gradient(rgba(94, 88, 88, 0.5), rgba(104, 98, 98, 0.5)),
        url('@/assets/imgs/contact/contact-bia1.jpg');
    background-size: 100% 100%;
    // background-repeat: no-repeat;
    /* position :0*/
    inset: 0;
}
</style>
