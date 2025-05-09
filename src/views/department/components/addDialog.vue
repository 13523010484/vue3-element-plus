<template>
  <el-dialog
    v-model="localVisible"
    :title="`${{ add: '新增', edit: '修改', detail: '详情' }[dialogType]}`"
    @close="handleClose"
    width="80vw"
  >
    <el-row :gutter="12">
      <el-col :span="8">
        <el-card>
          <template #header>
            <div>基本信息</div>
          </template>
          <el-form
            :model="form"
            ref="formRef"
            label-width="80px"
            :rules="rules"
            :disabled="dialogType == 'detail'"
          >
            <el-form-item label="部门名称" prop="deptName">
              <el-input v-model="form.deptName" placeholder="请输入部门名称"></el-input>
            </el-form-item>
            <el-form-item label="备注" prop="remark">
              <el-input v-model="form.remark" placeholder="请输入备注"></el-input>
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card>
          <template #header>
            <div>操作权限</div>
          </template>
          <el-tree
            ref="reviewTreeRef"
            node-key="id"
            :data="permissions"
            show-checkbox
            :props="{
              disabled: () => disabled(),
            }"
            :default-checked-keys="operDefaultCheckedKeys"
            @check-change="handlePermissionCheckChange"
          ></el-tree>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card>
          <template #header>
            <div>授权权限</div>
          </template>
          <el-tree
            ref="authTreeRef"
            node-key="id"
            :data="authorizations"
            show-checkbox
            :props="{
              disabled: () => disabled(),
            }"
            :default-checked-keys="authDefaultCheckedKeys"
            @check-change="handleAuthorizationCheckChange"
          ></el-tree>
        </el-card>
      </el-col>
    </el-row>
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
import { ElTree } from 'element-plus'
import { useMenuStore } from '@/stores/menu'
import { useDepartmentStore } from '@/stores/department'

const menuStore = useMenuStore()
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
const permissions = ref([]) // 操作权限
const authorizations = ref([]) // 授权权限
const reviewTreeRef = ref<InstanceType<typeof ElTree> | null>(null)
const authTreeRef = ref<InstanceType<typeof ElTree> | null>(null)
const operDefaultCheckedKeys = ref([])
const authDefaultCheckedKeys = ref([])

// 表单数据
const form = ref({
  deptName: '',
  remark: '',
  authRight: [],
  reviewRight: [],
})

// 校验规则
const rules = reactive({
  deptName: [{ required: true, message: '部门名称不能为空', trigger: 'blur' }],
})
const disabled = () => {
  return props.dialogType === 'detail'
}

// 处理菜单树结构
const processMenuTree = (tree: any[]): any[] => {
  return tree.map((node) => {
    if (node.actions) {
      node.children = node.actions.map((item) => ({
        ...item,
        id: item.btnCode,
        menuId: node.menuId,
        menuName: node.menuName,
        label: item.btnName,
        value: item.btnId,
      }))
    }
    if (node.children && node.children.length > 0) {
      node.children = processMenuTree(node.children)
      node.label = node.menuName
      node.value = node.menuId
      node.id = node.menuCode
    }
    return node
  })
}

// 监听 visible 属性变化
watch(
  () => props.visible,
  async (newVal) => {
    localVisible.value = newVal
    if (newVal) {
      await menuStore.menuQueryReq()
      const menuTree = menuStore.getMenuTree
      permissions.value = processMenuTree(menuTree)
      authorizations.value = processMenuTree(menuTree)
      resetForm()
      form.value.reviewRight = props.backfillData.reviewRight.map((node: any) => ({
        btnId: node.btnId,
        menuId: node.menuId,
      }))
      form.value.authRight = props.backfillData.authRight.map((node: any) => ({
        btnId: node.btnId,
        menuId: node.menuId,
      }))
      console.log('form.value::', form.value)

      if (props.backfillData) {
        form.value.deptName = props.backfillData.deptName || ''
        form.value.remark = props.backfillData.remark || ''
        operDefaultCheckedKeys.value = props.backfillData.authRight.map((item: any) => item.btnCode)
        authDefaultCheckedKeys.value = props.backfillData.reviewRight.map(
          (item: any) => item.btnCode,
        )
      }
    }
  },
)

// 重置表单方法
const resetForm = () => {
  if (formRef.value) {
    formRef.value.resetFields()
  }
  if (reviewTreeRef.value) {
    reviewTreeRef.value.setCheckedKeys([])
  }
  if (authTreeRef.value) {
    authTreeRef.value.setCheckedKeys([])
  }

  form.value.authRight = []
  form.value.reviewRight = []
}

// 树节点选中状态变化时的处理
const handlePermissionCheckChange = () => {
  const treeInstance = reviewTreeRef.value
  if (!treeInstance) return
  const checkedNodes = treeInstance.getCheckedNodes(true, true)
  form.value.authRight = checkedNodes.map((node: any) => ({
    btnId: node.btnId,
    menuId: node.menuId,
  }))
}

const handleAuthorizationCheckChange = () => {
  const treeInstance = authTreeRef.value
  if (!treeInstance) return
  const checkedNodes = treeInstance.getCheckedNodes(true, true)
  form.value.reviewRight = checkedNodes.map((node: any) => ({
    btnId: node.btnId,
    menuId: node.menuId,
  }))
}

// 提交表单
const handleSubmit = () => {
  if (!formRef.value) return
  formRef.value.validate(async (valid: boolean) => {
    if (valid) {
      console.log('提交 form.value::', form.value)
      console.log('props.dialogType::', props.dialogType)
      if (!form.value.reviewRight.length) {
        return ElMessage.warning('操作权限为必填字段。')
      }
      if (!form.value.authRight.length) {
        return ElMessage.warning('授权权限为必填字段。')
      }

      if (props.dialogType == 'add') {
        await departmentStore.departmentAddReq(form.value)
      } else {
        await departmentStore.departmentUpdateReq({
          deptId: props.backfillData.deptId,
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
