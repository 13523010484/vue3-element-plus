<template>
  <div class="department-management">
    <!-- 查询条件 -->
    <el-card style="margin-bottom: 12px">
      <el-form :model="searchForm">
        <el-row :gutter="10">
          <el-col :span="6">
            <el-form-item label="部门名称">
              <el-input v-model="searchForm.name" placeholder="部门名称"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="部门状态">
              <el-select v-model="searchForm.status" placeholder="请选择状态">
                <el-option label="启用" value="active"></el-option>
                <el-option label="禁用" value="inactive"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item>
              <el-button type="primary" @click="onSearch">查询</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-card>

    <!-- 操作按钮 -->
    <el-card>
      <div style="margin-bottom: 20px">
        <el-button type="primary" @click="onAdd">新增</el-button>
        <el-button type="info" @click="onDownload">下载</el-button>
      </div>

      <el-table :data="tableData" border style="width: 100%">
        <el-table-column type="selection" width="55" />
        <el-table-column prop="deptId" label="部门id" width="90"></el-table-column>
        <el-table-column prop="deptName" label="部门名称" width="100"></el-table-column>
        <el-table-column prop="remark" label="备注" width="120"></el-table-column>
        <el-table-column prop="deptStatus" label="部门状态" width="90">
          <template #default="scope">{{ scope.row.deptStatus == 1 ? '正常' : '注销' }} </template>
        </el-table-column>
        <el-table-column prop="inputOperName" label="录入人" width="150"></el-table-column>
        <el-table-column prop="inputTime" label="录入时间" width="200"></el-table-column>
        <el-table-column prop="updateOperName" label="更新人" width="180"></el-table-column>
        <el-table-column prop="updateTime" label="更新时间" width="200"></el-table-column>
        <el-table-column fixed="right" label="Operations" min-width="250">
          <template #default="scope">
            <el-button link type="primary" size="small" @click="onDetail(scope.$index, scope.row)">
              详情
            </el-button>
            <el-button link type="primary" size="small" @click="onEdit(scope.$index, scope.row)">
              修改
            </el-button>
            <el-button link type="primary" size="small" @click="onDelete(scope.$index, scope.row)">
              删除
            </el-button>
            <el-button
              link
              type="primary"
              size="small"
              @click="onDeptUser(scope.$index, scope.row)"
            >
              所属用户
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- 新增部门 -->
    <add-dialog
      v-model:visible="dialogVisible"
      :dialogType="dialogType"
      :permissions="permissions"
      :backfillData="backfillData"
      :authorizations="authorizations"
      @submit-after="submitAfter"
    ></add-dialog>

    <!-- 查询当前部门下的所属用户 -->
    <dept-user-dialog v-model:visible="deptUserDialogVisible" :dept-id="deptId"></dept-user-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import type { DeptInfo } from '@/types/department'
import AddDialog from './components/addDialog.vue'
import DeptUserDialog from './components/deptUserDialog.vue'
import { useDepartmentStore } from '@/stores/department'
import type { UserInfo } from '@/types/user'

const departmentStore = useDepartmentStore()
const dialogVisible = ref(false)
const dialogType = ref('add')
const permissions = ref([])
const authorizations = ref([])
const deptUserDialogVisible = ref(false)
const deptId = ref(-1)

// 查询表单数据
const searchForm = ref({
  name: '',
  status: '',
})
const backfillData = ref({
  deptId: -1,
  deptName: '',
  remark: '',
  authRight: [],
  reviewRight: [],
})

const tableData: DeptInfo[] = computed(() => departmentStore.table.tableData)

const queryTableData = async () => {
  await departmentStore.departmentQueryReq({})
}

onMounted(async () => {
  await queryTableData()
})

const submitAfter = async () => {
  await departmentStore.departmentQueryReq({})
}

// 查询方法
const onSearch = () => {
  console.log('搜索:', searchForm.value)
  queryTableData()
}

// 新增方法
const onAdd = () => {
  console.log('新增')
  dialogVisible.value = true
  dialogType.value = 'add'
}

const departmentDetailReq = async ({ deptId }) => {
  await departmentStore.departmentDetailReq({ deptId })
  const detailData = departmentStore.detailData
  backfillData.value = {
    deptId: detailData.deptId,
    deptName: detailData.deptName,
    remark: detailData.remark,
    authRight: detailData.authRight,
    reviewRight: detailData.reviewRight,
  }
  dialogVisible.value = true
}

// 详情方法
const onDetail = async (index: number, row: DeptInfo) => {
  await departmentDetailReq({ deptId: row.deptId })
  dialogType.value = 'detail'
}

// 修改方法
const onEdit = async (index: number, row: DeptInfo) => {
  await departmentDetailReq({ deptId: row.deptId })
  dialogType.value = 'edit'
}

// 删除方法
const onDelete = async (index: number, row: DeptInfo) => {
  console.log('删除', 'index::', index, 'row:', row)
  await departmentStore.departmentRemoveReq({ deptId: row.deptId })
  await queryTableData()
}

// 用户查询方法
const onDeptUser = async (index: number, row: UserInfo) => {
  console.log('用户查询', 'index::', index, 'row:', row)
  deptUserDialogVisible.value = true
  deptId.value = row.deptId
  console.log(
    'deptUserDialogVisible.value::',
    deptUserDialogVisible,
    'deptId.value::',
    deptId.value,
  )
}

// 下载方法
const onDownload = async () => {
  console.log('下载')
  await departmentStore.departmentDownloadReq()
}
</script>

<style scoped>
.department-management {
}
</style>
