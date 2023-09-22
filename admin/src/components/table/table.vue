<template>
    <div class="mt-4">
        <div class="searchBar">
            <Search :classProps="classProps" @search="onSearch" />
        </div>
        <table id="tableComponent" class="table table-bordered table-striped">
            <thead>
                <tr>
                    <th v-for="field in fields" :key="field" @click="sortTable(field)" class="p-1">
                        {{ field }} <i class="fa-solid fa-sort"></i>
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in filteredData" :key="item">
                    <td v-for="(field, index) in fieldsMap" :key="field">
                        <div v-if="field == 'Address'">
                            <p class="my-1">{{ item[field].phone }}</p>
                            <p class="m-0">{{ item[field].address }}</p>
                        </div>

                        <div v-if="isOrder && field == 'Product'">
                            <div v-for="(product, index) in item[field]" class="order-product-containter">
                                <img :src="product.img" alt="" height="60" width="100" />

                                <span class="ms-3"
                                    >{{ product.name }} <span class="ms-3">{{ product.oldprice }} ₫</span> x
                                    <b>{{ product.ordernumber }}</b></span
                                >
                                <div v-if="product.name == null">
                                    <p>Sản phẩm không tồn tại</p>
                                </div>
                            </div>
                            <div v-if="item[field].length == 0 || product === null">
                                <p>Sản phẩm không tồn tại</p>
                            </div>
                        </div>

                        <div v-if="field == 'edit'">
                            <div class="update-icon">
                                <router-link :to="'/' + categoryname + '/' + item.id">
                                    <i class="fas fa-edit"></i>
                                </router-link>
                                <i @click="() => deleteProduct(item.id)" class="fa-solid fa-trash"></i>
                            </div>
                        </div>
                        <div v-if="field == 'confirm'">
                            <button
                                @click="handleChangeStatePurchase(item._id, item.Status)"
                                :disabled="item.Status == 4 || item.Status == 2"
                                class="btn btn-secondary"
                            >
                                {{ getTitleConfirm(item.Status) }}
                            </button>
                        </div>
                        <div v-else>
                            <div v-if="field == 'img'">
                                <img :src="item[field]" alt="" height="60" width="100" />
                            </div>
                            <div v-else>
                                <div v-if="field != 'Product' && field != 'Address'">
                                    {{ item[field] }}
                                </div>
                            </div>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import { sortBy } from 'lodash';

import Search from '@/components/search/search.vue';

export default {
    name: 'TableComponent',
    props: {
        Data: {
            type: Array,
        },
        fields: {
            type: Array,
        },
        isOrder: {
            type: Boolean,
        },
        fieldsMap: {
            type: Array,
        },
        categoryname: {
            type: String,
        },
    },
    components: {
        Search,
    },
    data() {
        return {
            // Create a copy of Data for sorting
            sortedData: this.Data,
            classProps: 'w-50 mx-auto  border m-1 p-2',
            searchQuery: '',
            sortedField: '',
        };
    },
    computed: {
        filteredData() {
            if (typeof this.searchQuery === 'string') {
                const query = this.searchQuery.toLowerCase().trim();
                return this.Data.filter((item) => {
                    // Initialize a flag to check if the query matches any field
                    let match = false;
                    // Loop through all fields in the item
                    for (const field of this.fieldsMap) {
                        let value = null;
                        if (field == 'Product') {
                            // check for all name in product
                            for (const product of item[field]) {
                                value = product.name;
                                if (typeof value === 'string' && value.toLowerCase().includes(query)) {
                                    match = true;
                                    break; // If a match is found in any field, break out of the loop
                                }
                            }
                        } else {
                            value = item[field];
                        }

                        // Check if the value of the field contains the query
                        if (typeof value === 'string' && value.toLowerCase().includes(query)) {
                            match = true;
                            break; // If a match is found in any field, break out of the loop
                        }
                    }

                    // If a match is found in any field, include the item in the filtered data
                    return match;
                });
            } else {
                // If searchQuery is not a string, return the original data
                return this.Data;
            }
        },
        sortedAndFilteredData() {
            // First, apply filtering to the data
            const filteredData = this.filteredData;

            // Then, apply sorting to the filtered data
            if (this.sortedField) {
                return sortBy(filteredData, [this.sortedField]);
            } else {
                // If no sorting field is selected, return the filtered data as is
                return filteredData;
            }
        },
    },

    methods: {
        sortTable(field) {
            // Toggle sorting direction if the same field is clicked again
            if (field === this.sortedField) {
                this.sortedData.reverse();
            } else {
                this.sortedField = field;
                this.sortedData = sortBy(this.sortedData, [field]);
            }
        },
        onSearch(query) {
            // Update the searchQuery when the search event is emitted by the Search component
            this.searchQuery = query;
        },
        async deleteProduct(id) {
            this.$emit('deleteProduct', id);
        },
        getTitleConfirm(status) {
            let title = '';
            if (status == 0) {
                title = 'Duyệt';
            }
            if (status == 1 || status == 2) {
                title = 'Giao';
            }
            if (status == 3) {
                title = 'Hoàn Tất';
            }
            if (status == 4) {
                title = 'Đã huỷ';
            }
            return title;
        },
        handleChangeStatePurchase(id, status) {
            this.$emit('handleChangeStatePurchase', id, status);
        },
    },
};
</script>

<style lang="scss" scoped>
.order-product-containter {
    display: flex;
    justify-content: space-between;
}
</style>
