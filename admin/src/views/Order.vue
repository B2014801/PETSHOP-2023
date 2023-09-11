<template>
    <div class="mx-2">
        <h4 class="text-center my-3">Đơn hàng</h4>
        <Table
            v-if="Invoices.length != 0"
            :fields="fields"
            :Data="getDataTable()"
            :isOrder="true"
            :fieldsMap="fieldsMap"
        ></Table>
    </div>
</template>

<script>
import InvoiceService from '@/services/invoice.service';
import Table from '@/components/table/table.vue';
export default {
    components: {
        Table,
    },
    data() {
        // const studentData = [
        //     { ID: '01', Name: 'Abiola Esther', Course: 'Computer Science', Gender: 'Female', Age: '17' },
        //     { ID: '02', Name: 'Robert V. Kratz', Course: 'Philosophy', Gender: 'Male', Age: '19' },
        //     { ID: '03', Name: 'Kristen Anderson', Course: 'Economics', Gender: 'Female', Age: '20' },
        //     { ID: '04', Name: 'Adam Simon', Course: 'Food science', Gender: 'Male', Age: '21' },
        //     { ID: '05', Name: 'Daisy Katherine', Course: 'Business studies', Gender: 'Female', Age: '22' },
        // ];
        // const fieldss = ['ID', 'Name', 'Course', 'Gender', 'Age'];
        return {
            // fieldss,
            // studentData,
            Invoices: [],
            fields: ['STT', 'Phone', 'Product', 'Total', 'Orderdate', 'Deliverydate'],
            fieldsMap: ['ID', 'Phone', 'Product', 'Total', 'Orderdate', 'Deliverydate'],
        };
    },
    methods: {
        async getAllInvoice() {
            try {
                this.Invoices = await InvoiceService.getAllInvoice();
            } catch (error) {
                console.log(error);
            }
        },
        getDataTable() {
            let datas = [];

            this.Invoices.forEach(async (item, index) => {
                let data = {};
                data.ID = index;
                data.Phone = item.user.phone;
                data.Product = item.detail;
                data.Orderdate = item.orderdate;
                data.Deliverydate = item.deliverydate;
                data.Total = this.getTemporaryPrice(item.detail);
                datas.push(data);
            });
            return datas;
        },
        formatNumberWithDot(number) {
            return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.') + ' ₫'; //1000 to 1.000
        },
        getTemporaryPrice(products) {
            if (products.length != 0) {
                const temporary_price = products.reduce(
                    (total, item) => total + item.ordernumber * item.oldprice.replace(/\./g, ''),
                    0,
                );
                // if (temporary_price) {
                return this.formatNumberWithDot(temporary_price);
                // }
            }
        },
    },
    created() {
        this.getAllInvoice();
    },
};
</script>

<style lang="scss" scoped></style>
