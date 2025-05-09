<template>
  <div class="admin-management">
    <el-card style="margin-bottom: 12px">
      <el-form ref="ruleFormRef" :model="searchForm">
        <el-row :gutter="10">
          <el-col :span="6">
            <el-form-item label="用户名">
              <el-input
                v-model="searchForm.operCode"
                placeholder="请输入用户名"
                clearable
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="用户姓名">
              <el-input
                v-model="searchForm.operName"
                placeholder="请输入用户姓名"
                clearable
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="用户状态">
              <el-select v-model="searchForm.operStatus" placeholder="请选择用户状态" clearable>
                <el-option label="正常" value="1"></el-option>
                <el-option label="密码重置" value="2"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item>
              <el-button type="primary" @click="onSearch">查询</el-button>
              <el-button @click="resetForm(ruleFormRef)">重置</el-button>
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
        <el-table-column prop="operCode" label="用户名" width="150"> </el-table-column>
        <el-table-column prop="operName" label="用户姓名" width="150"></el-table-column>
        <el-table-column prop="operStatus" label="用户状态" width="150"></el-table-column>
        <el-table-column prop="remark" label="备注" width="200"></el-table-column>
        <el-table-column prop="inputOperName" label="录入人" width="180"></el-table-column>
        <el-table-column prop="inputTm" label="录入时间" width="200"></el-table-column>
        <el-table-column prop="updateOperName" label="更新人" width="180"></el-table-column>
        <el-table-column prop="updateTm" label="更新时间" width="200"></el-table-column>
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
              @click="onResetPassword(scope.$index, scope.row)"
            >
              重置密码
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- 新增用户 -->
    <add-dialog
      v-model:visible="dialogVisible"
      :dialogType="dialogType"
      :backfillData="backfillData"
      @submit-after="submitAfter"
    ></add-dialog>
  </div>
</template>

<script setup lang="ts">
import type { FormInstance } from 'element-plus'
import { ref, onMounted, computed } from 'vue'
import type { AdminUserInfo } from '@/types/admin'
import AddDialog from './components/admin/addDialog.vue'
import { useAdminStore } from '@/stores/admin'

const adminStore = useAdminStore()
const dialogVisible = ref(false)
const dialogType = ref('add')
const ruleFormRef = ref<FormInstance>()

// 查询表单数据
const searchForm = ref({
  operCode: '',
  operName: '',
  operStatus: null,
})
const backfillData = ref({
  deptId: null,
  operId: null,
  operCode: '',
  operName: '',
  officeTel: '',
  mobile: '',
  operType: '',
  operStatus: '',
  remark: '',
})

const tableData: AdminUserInfo[] = computed(() => adminStore.table.tableData)

const queryTableData = async () => {
  const { pageSize, pageNum } = adminStore.table
  await adminStore.adminQueryReq({
    pageSize,
    pageNum,
    ...searchForm.value,
  })
}

onMounted(async () => {
  await queryTableData()
})

const submitAfter = async () => {
  await queryTableData()
}

// 查询方法
const onSearch = () => {
  console.log('搜索:', searchForm.value)
  queryTableData()
}

// 重置
const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
  searchForm.value = {
    operCode: '',
    operName: '',
    operStatus: null,
  }
  queryTableData()
}

// 新增方法
const onAdd = () => {
  console.log('新增')
  dialogVisible.value = true
  dialogType.value = 'add'
  backfillData.value = {
    deptId: null,
    operId: null,
    operCode: '',
    operName: '',
    officeTel: '',
    mobile: '',
    operType: '',
    operStatus: '',
    remark: '',
  }
}

const adminDetailReq = async ({ operId }) => {
  console.log('typeof operId', typeof operId, operId)
  await adminStore.adminDetailReq({ operId })
  const detailData = adminStore.detailData
  backfillData.value = {
    deptId: detailData.deptId,
    operId: detailData.operId,
    operCode: detailData.operCode,
    operName: detailData.operName,
    officeTel: detailData.officeTel,
    mobile: detailData.mobile,
    operType: detailData.operType,
    operStatus: detailData.operStatus,
    remark: detailData.remark,
  }
  dialogVisible.value = true
}

// 详情方法
const onDetail = async (index: number, row: AdminUserInfo) => {
  await adminDetailReq({ operId: row.operId })
  dialogType.value = 'detail'
}

// 修改方法
const onEdit = async (index: number, row: AdminUserInfo) => {
  await adminDetailReq({ operId: row.operId })
  dialogType.value = 'edit'
}

// 删除方法
const onDelete = async (index: number, row: AdminUserInfo) => {
  console.log('删除', 'index::', index, 'row:', row)
  await adminStore.adminRemoveReq({ operId: row.operId })
  await queryTableData()
}

// 重置密码
const onResetPassword = async (index: number, row: AdminUserInfo) => {
  console.log('用户查询', 'index::', index, 'row:', row)
  await adminStore.adminResetPasswordReq({ operId: row.operId })
  await queryTableData()
}

// 下载方法
const onDownload = async () => {
  console.log('下载')
  await adminStore.adminDownloadReq()
}
</script>

<style scoped></style>
