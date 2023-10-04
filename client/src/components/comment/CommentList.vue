<template>
    <div class="card-comment w-100">
        <div v-for="(comment, index) in comments" class="d-flex">
            <div>
                <img :src="comment.user_data.img" width="40" height="40" class="rounded-circle mt-2" />
            </div>
            <div class="col-10">
                <div class="comment-box">
                    <h6>{{ comment.user_data.name }}</h6>

                    <div class="rating-other-user d-inline-block w-100">
                        <i v-for="star in parseInt(comment.star)" class="fa-solid fa-star" style="color: #ff0000"></i>

                        <i
                            v-for="star in 5 - parseInt(comment.star)"
                            class="fa-sharp fa-regular fa-star"
                            style="color: #ff0000"
                        ></i>
                    </div>
                    <p class="mb-0">{{ comment.comment_date }}</p>
                    <p class="mb-0">{{ comment.content }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: { comments: { type: Array } },
};
</script>

<style lang="scss" scoped>
.card-comment {
    position: relative;
    display: flex;
    flex-direction: column;
    min-width: 0;
    padding: 20px;
    word-wrap: break-word;
    background-color: #fff;
    background-clip: border-box;
    border-radius: 6px;
}

.comment-box {
    padding: 5px;
}

.comment-area textarea {
    resize: none;
    border: 1px solid #ad9f9f;
}
</style>
