<template>
    <div>
        <UpdateProductFrom
            v-if="Product != null"
            @submit:update="update"
            :isShowUpdateSuccess="isShowUpdateSuccess"
            :Edit="edit"
            :Product="Product"
        />
    </div>
</template>

<script>
import UpdateProductFrom from '@/components/form/UpdateProductFrom.vue';
import ProductService from '@/services/product.service';
export default {
    components: {
        UpdateProductFrom,
    },
    props: {
        id: { type: String },
    },
    data() {
        return { isShowUpdateSuccess: false, edit: true, Product: null };
    },
    methods: {
        async update(data) {
            try {
                const result = await ProductService.update(this.id, data);
                if (result) {
                    this.isShowUpdateSuccess = true;
                }
            } catch (er) {
                console.log(er);
            }
        },
        async findById() {
            try {
                this.Product = await ProductService.findProductById(this.id);
            } catch (error) {
                console.log(error);
            }
        },
    },
    created() {
        this.findById();
    },
};
</script>

<style lang="scss" scoped></style>
