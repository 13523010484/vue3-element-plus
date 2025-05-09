<template>
  <el-dialog v-model="localVisible" title="权限分配" @close="handleClose" width="80vw">
    <el-row :gutter="12">
      <el-col :span="8">
        <el-card>
          <template #header>
            <div>基本信息</div>
          </template>
          <el-form :model="form" ref="formRef" label-width="80px" :rules="rules">
            <el-form-item label="部门名称" prop="deptId">
              <el-select v-model="form.deptId" placeholder="请选择部门" disabled>
                <el-option
                  v-for="item in deptName"
                  :key="item.deptId"
                  :label="item.deptName"
                  :value="item.deptId"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="用户名" prop="operCode">
              <el-input v-model="form.operCode" placeholder="请输入用户名" disabled></el-input>
            </el-form-item>
            <el-form-item label="用户姓名" prop="operName">
              <el-input v-model="form.operName" placeholder="请输入用户姓名" disabled></el-input>
            </el-form-item>
            <el-form-item label="办公电话" prop="officeTel">
              <el-input v-model="form.officeTel" placeholder="请输入办公电话" disabled></el-input>
            </el-form-item>
            <el-form-item label="手机" prop="mobile">
              <el-input v-model="form.mobile" placeholder="请输入手机" disabled></el-input>
            </el-form-item>
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
            <el-form-item label="备注" prop="remark">
              <el-input v-model="form.remark" placeholder="请输入备注" disabled></el-input>
            </el-form-item>
            <el-card shadow="never">
              <template v-slot:header>
                <div>岗位设置（至少选择一项）</div>
              </template>
              <div>
                <el-checkbox-group v-model="form.postIds" class="post-item-group">
                  <el-checkbox
                    class="post-item"
                    v-for="item in postList"
                    :label="item.postName"
                    :value="item.postId"
                    :key="item.postId"
                  >
                    {{ item.postName }}
                  </el-checkbox>
                </el-checkbox-group>
              </div>
            </el-card>
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
              disabled: () => true,
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
              disabled: () => true,
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
        <el-button type="primary" @click="handleRefreshAuth">刷新权限</el-button>
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
import { usePostStore } from '@/stores/post'
import { useUserStore } from '@/stores/user'
import { useDepartmentStore } from '@/stores/department'
import type { PostAuthData } from '@/types/post'

const menuStore = useMenuStore()
const postStore = usePostStore()
const userStore = useUserStore()
const departmentStore = useDepartmentStore()
const props = defineProps({
  visible: Boolean,
  backfillData: Object as PropType<any>,
})
const emit = defineEmits(['submit', 'update:visible', 'submit-after'])
const localVisible = ref(props.visible)
const formRef = ref(null)
const permissions = ref([])
const authorizations = ref([])
const reviewTreeRef = ref<InstanceType<typeof ElTree> | null>(null)
const authTreeRef = ref<InstanceType<typeof ElTree> | null>(null)
const operDefaultCheckedKeys = ref([])
const authDefaultCheckedKeys = ref([])
const deptName = ref([])
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
const form = ref({
  operId: null,
  deptId: null,
  operCode: '',
  operName: '',
  officeTel: '',
  mobile: '',
  operStatus: 1,
  remark: '',
  postIds: [],
})
const postList = ref([])
const rules = reactive({
  postName: [{ required: true, message: '岗位名称不能为空', trigger: 'blur' }],
})
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

watch(
  () => props.visible,
  async (newVal) => {
    localVisible.value = newVal
    if (newVal) {
      await menuStore.menuQueryReq()
      await departmentStore.departmentDeptNameReq()
      await postStore.postNameReq()

      const menuTree = menuStore.getMenuTree
      deptName.value = departmentStore.deptName
      permissions.value = processMenuTree(menuTree)
      authorizations.value = processMenuTree(menuTree)
      postList.value = postStore.postList
      resetForm()

      if (props.backfillData) {
        form.value.operId = props.backfillData.operId
        form.value.deptId = props.backfillData.deptId
        form.value.operCode = props.backfillData.operCode
        form.value.operName = props.backfillData.operName
        form.value.officeTel = props.backfillData.officeTel
        form.value.mobile = props.backfillData.mobile
        form.value.operType = props.backfillData.operType
        form.value.remark = props.backfillData.remark
        form.value.postIds = props.backfillData.postIds
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
  console.log('treeInstance::', treeInstance)
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

// 刷新权限
const handleRefreshAuth = async () => {
  const { postIds } = form.value
  if (!postIds || !postIds.length) {
    return ElMessage.warning('请选择需要绑定的岗位。')
  }
  await postStore.queryPostAuthReq({ postIds })
  operDefaultCheckedKeys.value = postStore.authList.authRight.map(
    (item: PostAuthData) => item.btnCode,
  )
  authDefaultCheckedKeys.value = postStore.authList.reviewRight.map(
    (item: PostAuthData) => item.btnCode,
  )
}

// 提交表单
const handleSubmit = () => {
  if (!formRef.value) return
  formRef.value.validate(async (valid: boolean) => {
    if (valid) {
      if (!form.value.postIds.length) {
        return ElMessage.warning('请选择需要绑定的岗位。')
      }

      await userStore.userBindPostReq({
        operId: form.value.operId,
        postIds: form.value.postIds,
      })
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

<style scoped lang="scss">
.post-item-group {
  display: flex;
  flex-wrap: wrap;
  .post-item {
    margin-bottom: 12px;
  }
}
</style>
