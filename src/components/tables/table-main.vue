<template>
    <div class="table-main">
        <collapse :text="tipText" :content_text="tipContentText"/>
        <div v-if="searchable && searchPlace === 'top'" class="search-con search-con-top">
            <Select v-model="searchKey" class="search-col">
                <Option v-for="item in columns" v-if="item.key !== 'handle'" :value="item.key" :key="`search-col-${item.key}`">{{ item.title }}</Option>
            </Select>
            <Input @on-change="handleClear" clearable placeholder="输入关键字搜索" class="search-input" v-model="searchValue"/>
            <Button @click="handleSearch" class="search-btn" type="primary"><Icon type="search"/>&nbsp;&nbsp;搜索</Button>
        </div>
        <Table
                ref="tablesMain"
                :stripe="stripe"
                :columns="tableColumns"
                :data="tableData"
                :loading="loading"
                :border="border"
                :show-header="showHeader"
                :width="width"
                :height="height"
                :max-height="maxHeight"
                :disabled-hover="disabledHover"
                :highlight-row="highlightRow"
                :row-class-name="rowClassName"
                :size="size"
                :no-data-text="noDataText"
                :no-filtered-data-text="noFilteredDataText"
                :draggable="draggable"
                :tooltip-theme="tooltipTheme"
                :row-key="rowKey"
                @on-current-change="onCurrentChange"
                @on-select="onSelect"
                @on-select-cancel="onSelectCancel"
                @on-select-all="onSelectAll"
                @on-select-all-cancel="onSelectAllCancel"
                @on-selection-change="onSelectionChange"
                @on-sort-change="onSortChange"
                @on-filter-change="onFilterChange"
                @on-row-click="onRowClick"
                @on-row-dblclick="onRowDblclick"
                @on-expand="onExpand"
                @on-drag-drop="onDragDrop"
        >
            <!--表头-->
            <slot name="header" slot="header"></slot>
            <!--页脚-->
            <slot name="footer" slot="footer"></slot>
            <!--加载中-->
            <slot name="loading" slot="loading"></slot>
        </Table>
        <div style="margin: 10px;overflow: hidden">
            <div style="float: right;">
                <Page :total="100" :current="1" @on-change="changePage"></Page>
            </div>
        </div>
    </div>
</template>

<script>
    import Collapse from './collapse-tip' //操作提示框组件
    export default {
        name: "table-main",
        components: {Collapse},
        props: {
            tipText:{
                type: String,
            },
            tipContentText:{
                type: String,
            },
            /*数据*/
            value: {
                type: Array,
                default() {
                    return []
                }
            },
            /*列*/
            columns: {
                type: Array,
                default() {
                    return []
                }
            },
            /*表格是否加载中	*/
            loading: {
                type: Boolean,
                default: false
            },
            /*是否显示间隔斑马纹	*/
            stripe: {
                type: Boolean,
                default: false
            },
            /*是否显示纵向边框	*/
            border: {
                type: Boolean,
                default: true
            },
            /*是否显示表头	*/
            showHeader: {
                type: Boolean,
                default: true
            },
            /*表格宽度，单位 px*/
            width: {
                type: [Number, String]
            },
            /*表格高度，单位 px，设置后，如果表格内容大于此值，会固定表头	*/
            height: {
                type: [Number, String]
            },
            /*表格最大高度，单位 px，设置后，如果表格内容大于此值，会固定表头	*/
            maxHeight: {
                type: [Number, String]
            },
            /*禁用鼠标悬停时的高亮	*/
            disabledHover: {
                type: Boolean,
                default: false
            },
            /*是否支持高亮选中的行，即单选	*/
            highlightRow: {
                type: Boolean,
                default: false
            },
            /*行的 className 的回调方法，传入参数：row：当前行数据 index：当前行的索引*/
            rowClassName: {
                type: Function,
                default() {
                    return ''
                }
            },
            /*表格尺寸，可选值为 large、small、default 或者不填	*/
            size: String,
            /*数据为空时显示的提示内容	*/
            noDataText: {
                type: String,
            },
            /*查询为空时*/
            noFilteredDataText: {
                type: String,
            },
            /*是否开启拖拽调整行顺序，需配合 @on-drag-drop 事件使用	*/
            draggable: {
                type: Boolean,
                default: false
            },
            /*列使用 tooltip 时，配置它的主题，可选值为 dark 或 light*/
            tooltipTheme: {
                type: String,
                default: 'dark'
            },
            /*是否强制使用内置的 row-key，开启后可能会影响性能*/
            rowKey: {
                type: Boolean,
                default: false
            },
            /**
             * @description 全局设置是否可编辑
             */
            editable: {
                type: Boolean,
                default: false
            },
            /**
             * @description 是否可搜索
             */
            searchable: {
                type: Boolean,
                default: false
            },
            /**
             * @description 搜索控件所在位置，'top' / 'bottom'
             */
            searchPlace: {
                type: String,
                default: 'top'
            }
        },
        /**
         * Events
         * @on-start-edit 返回值 {Object} ：同iview中render函数中的params对象 { row, index, column }
         * @on-cancel-edit 返回值 {Object} 同上
         * @on-save-edit 返回值 {Object} ：除上面三个参数外，还有一个value: 修改后的数据
         */
        data() {
            return {
                tableColumns: [],
                tableData: [],
                edittingCellId: '',
                edittingText: '',
                searchValue: '',
                searchKey: ''
            }
        },
        computed: {},
        methods: {
            /*查询框*/
            setDefaultSearchKey () {
                this.searchKey = this.columns[0].key !== 'handle' ? this.columns[0].key : (this.columns.length > 1 ? this.columns[1].key : '')
                // console.log(this.searchKey)
            },
            //indexOf方法一定要是一个字符串才能匹配 如若是数字会报错   //TODO 后期换成查询数据库
            handleSearch () {
                this.tableData = this.value.filter(item => item[this.searchKey].toString().indexOf(this.searchValue) > -1)
            },
            //当输入框中内容为空时 还原数据内容
            handleClear (e) {
                if (e.target.value === '') this.tableData = this.value
            },
            //**********************************************************//
            /*data数据处理 表数据*/
            handleTableData () {
                this.tableData = this.value.map((item, index) => {
                    // console.log(item.action)
                    let res = item
                    res.initRowIndex = index
                    return res
                })
            },
            /*拆分columns 表头*/
            handleColumns (columns) {
                this.tableColumns = columns.map((item, index) => {
                    let res = item
                    // console.log(res)
                    return res
                })
            },
            //***********************************************************************
            /*开启 highlight-row 后有效，当表格的当前行发生变化的时候会触发*/
            onCurrentChange(currentRow, oldCurrentRow) {
                this.$emit('on-current-change', currentRow, oldCurrentRow)
            },
            /*在多选模式下有效，选中某一项时触发	*/
            onSelect(selection, row) {
                this.$emit('on-select', selection, row)
            },
            /*在多选模式下有效，取消选中某一项时触发	*/
            onSelectCancel(selection, row) {
                this.$emit('on-select-cancel', selection, row)
            },
            /*在多选模式下有效，点击全选时触发	*/
            onSelectAll(selection) {
                this.$emit('on-select-all', selection)
            },
            /*在多选模式下有效，点击取消全选时触发	*/
            onSelectAllCancel(selection) {
                this.$emit('on-select-all-cancel', selection)
            },
            /*在多选模式下有效，只要选中项发生变化时就会触发*/
            onSelectionChange(selection) {
                this.$emit('on-selection-change', selection)
            },
            /* 排序时有效，当点击排序时触发*/
            onSortChange(column, key, order) {
                this.$emit('on-sort-change', column, key, order)
            },
            /*筛选时有效，筛选条件发生变化时触发	*/
            onFilterChange(row) {
                this.$emit('on-filter-change', row)
            },
            /*单击某一行时触发	*/
            onRowClick(row, index) {
                this.$emit('on-row-click', row, index)
            },
            /*双击某一行时触发	*/
            onRowDblclick(row, index) {
                this.$emit('on-row-dblclick', row, index)
            },
            /*展开或收起某一行时触发*/
            onExpand(row, status) {
                this.$emit('on-expand', row, status)
            },
            /*拖拽排序松开时触发，返回置换的两行数据索引	*/
            onDragDrop(index1, index2) {
                this.$emit('on-drag-drop', index1, index2)
            },
            //************************************************************
            /*数据处理（模拟数据）*/
            mockTableData1() {
                let data = [];
                for (let i = 0; i < 10; i++) {
                    data.push({
                        name: 'Business' + Math.floor(Math.random() * 100 + 1),
                        status: Math.floor(Math.random() * 3 + 1),
                        portrayal: ['City', 'People', 'Cost', 'Life', 'Entertainment'],
                        people: [
                            {
                                n: 'People' + Math.floor(Math.random() * 100 + 1),
                                c: Math.floor(Math.random() * 1000000 + 100000)
                            },
                            {
                                n: 'People' + Math.floor(Math.random() * 100 + 1),
                                c: Math.floor(Math.random() * 1000000 + 100000)
                            },
                            {
                                n: 'People' + Math.floor(Math.random() * 100 + 1),
                                c: Math.floor(Math.random() * 1000000 + 100000)
                            }
                        ],
                        time: Math.floor(Math.random() * 7 + 1),
                        update: new Date()
                    })
                }
                return data;
            },
            /*日期转换*/
            /*formatDate(date) {
                const y = date.getFullYear();
                let m = date.getMonth() + 1;
                m = m < 10 ? '0' + m : m;
                let d = date.getDate();
                d = d < 10 ? ('0' + d) : d;
                return y + '-' + m + '-' + d;
            },*/
            // 这里直接更改模拟数据，实际使用场景应该从服务器获取数据
            changePage() {
                this.tableData = this.mockTableData1();
            }
        },
        watch: {
            columns (columns) {
                this.handleColumns(columns)
                this.setDefaultSearchKey()
            },
            value (val) {
                this.handleTableData()
                if (this.searchable) this.handleSearch()
            }
        },
        mounted () {
            this.handleColumns(this.columns)
            this.setDefaultSearchKey()
            this.handleTableData()
        }
    }
</script>

<style lang="less">
    @import "./table-main";
</style>