const modules = import.meta.glob(['./**/*.ts'], { eager: true })

const routerConfigArray = Object.values(modules).flatMap((module) => {
  if (Array.isArray(module.default)) {
    return module.default
  } else {
    console.warn(`模块 ${module} 的默认导出不是数组，已跳过加载`)
    return []
  }
})

export default routerConfigArray
