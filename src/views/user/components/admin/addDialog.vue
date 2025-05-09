<template>
  <el-dialog
    v-model="localVisible"
    :title="`${{ add: '新增', edit: '修改', detail: '详情' }[dialogType]}`"
    @close="handleClose"
    width="80vw"
  >
    <el-form
      :model="form"
      ref="formRef"
      label-width="80px"
      :rules="rules"
      :disabled="dialogType == 'detail'"
    >
      <el-row :gutter="10">
        <el-col :span="12">
          <el-form-item label="所属部门" prop="deptId">
            <el-select v-model="form.deptId" placeholder="请选择部门">
              <el-option
                v-for="item in deptName"
                :key="item.deptId"
                :label="item.deptName"
                :value="item.deptId"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="用户名" prop="operCode">
            <el-input v-model="form.operCode" placeholder="请输入用户名"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="用户姓名" prop="operName">
            <el-input v-model="form.operName" placeholder="请输入用户姓名"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="办公电话" prop="officeTel">
            <el-input v-model="form.officeTel" placeholder="请输入办公电话"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="手机" prop="mobile">
            <el-input v-model="form.mobile" placeholder="请输入手机"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="用户类型" prop="operType">
            <el-select v-model="form.operType" placeholder="请选择用户类型" disabled>
              <el-option
                v-for="item in operType"
                :key="item.code"
                :label="item.name"
                :value="item.code"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="用户状态" prop="operStatus">
            <el-select v-model="form.operStatus" placeholder="请选择用户状态" disabled>
              <el-option
                v-for="item in operStatus"
                :key="item.code"
                :label="item.name"
                :value="item.code"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="备注" prop="remark">
            <el-input v-model="form.remark" placeholder="请输入备注"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleCancel">取 消</el-button>
        <el-button type="primary" @click="handleSubmit">确 定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, watch, reactive } from 'vue'
import { ElMessage } from 'element-plus'
import { useAdminStore } from '@/stores/admin'
import { useDepartmentStore } from '@/stores/department'

const adminStore = useAdminStore()
const departmentStore = useDepartmentStore()

// 定义 props 和 emits
const props = defineProps({
  visible: Boolean,
  backfillData: Object as PropType<any>,
  dialogType: {
    type: String,
    default: 'add',
  },
})
const emit = defineEmits(['submit', 'update:visible', 'submit-after'])

// 定义变量
const localVisible = ref(props.visible)
const formRef = ref(null)
const operType = ref([
  {
    code: 1,
    name: '超级管理员',
  },
  {
    code: 2,
    name: '部门管理员',
  },
  {
    code: 3,
    name: '部门操作员',
  },
])
const operStatus = ref([
  {
    code: 1,
    name: '正常',
  },
  {
    code: 2,
    name: '密码重置',
  },
])
const deptName = ref([])

// 表单数据
const form = ref({
  deptId: null,
  operCode: '',
  operName: '',
  officeTel: '',
  mobile: '',
  operType: 2,
  operStatus: 1,
  remark: '',
})

// 校验规则
const rules = reactive({
  deptId: [{ required: true, message: '部门名称不能为空', trigger: 'blur' }],
  operCode: [{ required: true, message: '用户名不能为空', trigger: 'blur' }],
  operName: [{ required: true, message: '用户姓名不能为空', trigger: 'blur' }],
})

// 监听 visible 属性变化
watch(
  () => props.visible,
  async (newVal) => {
    localVisible.value = newVal
    if (newVal) {
      await departmentStore.departmentDeptNameReq()
      deptName.value = departmentStore.deptName

      resetForm()
      if (props.backfillData) {
        console.log('props.backfillData::', props.backfillData)
        form.value.deptId = props.backfillData.deptId
        form.value.operId = props.backfillData.operId
        form.value.operCode = props.backfillData.operCode
        form.value.operName = props.backfillData.operName
        form.value.officeTel = props.backfillData.officeTel
        form.value.mobile = props.backfillData.mobile
        form.value.officeTel = props.backfillData.officeTel
        form.value.remark = props.backfillData.remark
      }
    }
  },
)

// 重置表单方法
const resetForm = () => {
  if (formRef.value) {
    formRef.value.resetFields()
  }
}

// 提交表单
const handleSubmit = () => {
  if (!formRef.value) return
  formRef.value.validate(async (valid: boolean) => {
    if (valid) {
      console.log('提交 form.value::', form.value, 'adminStore::', adminStore)
      if (props.dialogType == 'add') {
        await adminStore.adminAddReq(form.value)
      } else {
        await adminStore.adminUpdateReq({
          operId: props.backfillData.operId,
          ...form.value,
        })
      }
      handleCancel()
      emit('submit-after')
    } else {
      ElMessage.error('请填写必填项')
      return false
    }
  })
}

// 取消操作
const handleCancel = () => {
  emit('update:visible', false)
}

// 关闭对话框
const handleClose = () => {
  emit('update:visible', false)
}
</script>

<style scoped>
/* Add any scoped styles here */
</style>
