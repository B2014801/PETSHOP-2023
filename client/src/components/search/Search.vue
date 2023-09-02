<template>
    <div>
        <Form @submit="goToSearchResult" class="form-inline m-2 bg-white border-0 rounded p-1">
            <div class="input-group">
                <Field
                    class="border-0"
                    type="search"
                    placeholder="Tìm kiếm..."
                    aria-label="Search"
                    style="outline: none; width: 90%"
                    name="search_query"
                    v-model="KeySearch"
                />
                <ErrorMessage />
                <button type="submit" class="border-0 bg-white">
                    <i class="fa-solid fa-magnifying-glass"></i>
                </button>
            </div>
        </Form>
    </div>
</template>

<script>
import { Form, Field, ErrorMessage } from 'vee-validate';
import PetshopService from '@/services/petshop.service';
export default {
    components: {
        Form,
        Field,
        ErrorMessage,
    },
    data() {
        return {
            KeySearch: '',
        };
    },
    methods: {
        // async findByName() {
        //     const result = await PetshopService.findByName(this.KeySearch);
        //     if (result) {
        //         console.log(result);
        //     }
        // },
        goToSearchResult() {
            this.$router.push({
                name: 'search',
                query: {
                    keySearch: this.KeySearch, // 'keySearch' is the query parameter name
                },
            });
        },
    },
};
</script>

<style lang="scss" scoped>
.input-group {
    flex-wrap: nowrap;
}
</style>
