<template>
  <el-dialog v-model="localVisible" title="所属用户" @close="handleClose" width="80vw">
    <el-table :data="userTable.tableData" border style="width: 100%">
      <el-table-column prop="operCode" label="用户名"></el-table-column>
      <el-table-column prop="operName" label="用户姓名"></el-table-column>
      <el-table-column prop="operType" label="用户类型"></el-table-column>
      <el-table-column prop="operStatus" label="用户状态"></el-table-column>
    </el-table>
    <div class="pagination-wrap">
      <div class="total">共 {{ userTable.total }} 条数据</div>
      <el-pagination
        background
        :current-page="userTable.pageNum"
        :page-size="userTable.pageSize"
        :page-sizes="[10, 20, 30, 40]"
        :pager-count="5"
        layout="sizes, prev, pager, next, jumper"
        :total="userTable.total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      >
        <!-- 自定义每页显示条目数的文案 -->
        <template #size="{ size }">
          {{ `${size} 条/页` }}
        </template>
      </el-pagination>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleCancel">取 消</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useDepartmentStore } from '@/stores/department'
import type { UserInfo } from '@/types/user'
import type { DeptUserTable } from '@/types/department'
import { useTable } from 'element-plus/es/components/table-v2/src/use-table.mjs'

const departmentStore = useDepartmentStore()

// 定义 props 和 emits
const props = defineProps({
  visible: Boolean,
  deptId: Number,
})
const emit = defineEmits(['update:visible'])
const userTable: DeptUserTable = ref({})

// 定义变量
const localVisible = ref(props.visible)

// 监听 visible 属性变化
watch(
  () => props.visible,
  async (newVal) => {
    localVisible.value = newVal
    if (newVal) {
      console.log('props::', props)
      queryTableData()
    }
  },
)

const queryTableData = async () => {
  const table = departmentStore.userTable
  await departmentStore.departmentQueryDeptUserReq({
    deptId: props.deptId,
    pageSize: table.pageSize,
    pageNum: table.pageNum,
  })
  userTable.value = table
}

// 取消操作
const handleCancel = () => {
  emit('update:visible', false)
}

// 关闭对话框
const handleClose = () => {
  emit('update:visible', false)
}

const handleSizeChange = (val: number) => {
  userTable.value.pageSize = val
  userTable.value.currentPage = 1
  queryTableData()
}

const handleCurrentChange = (val: number) => {
  useTable.value.currentPage = val
  queryTableData()
}
</script>

<style scoped lang="scss">
.pagination-wrap {
  display: flex;
  align-items: center;
  justify-content: end;
  margin-top: 12px;
  .total {
    margin-right: 10px;
  }
}
</style>
