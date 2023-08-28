<template>
    <div>
        <UpdateProductFrom @submit:create="create" :Add="add" :isShowUpdateSuccess="isShowUpdateSuccess" />
    </div>
</template>

<script>
import UpdateProductFrom from '@/components/form/UpdateProductFrom.vue';
import ProductService from '@/services/product.service';

export default {
    components: { UpdateProductFrom },
    data() {
        return {
            add: true,
            isShowUpdateSuccess: false,
        };
    },
    methods: {
        async create(data) {
            try {
                const result = await ProductService.add(data);
                if (result) {
                    // console.log(result);
                    this.isShowUpdateSuccess = true;
                }
            } catch (error) {
                console.log(error);
            }
        },
    },
};
</script>

<style lang="scss" scoped></style>
