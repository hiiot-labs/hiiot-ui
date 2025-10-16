# useMutation 与 useFetch 兼容性解决方案

## 问题描述

原来的 `useMutation` 中的 `options.revalidateKeys?.forEach(key => mutate(key))` 不会影响到 `useFetch` 的缓存，因为两个 hook 使用不同的缓存 key 格式：

- `useFetch` 使用 `[key, body]` 作为缓存 key
- `useMutation` 的 `revalidateKeys` 只支持简单的字符串 key

## 解决方案

### 1. 新增 `revalidateFetchKeys` 选项

专门用于刷新 `useFetch` 的缓存：

```typescript
const { trigger } = useMutation('/api/update-plant', 'POST', {
  revalidateFetchKeys: [
    { key: '/api/plant-data', body: {} },
    { key: '/api/plant-stats', body: { type: 'summary' } }
  ]
})
```

### 2. 新增 `revalidatePattern` 选项

使用模式匹配刷新所有相关缓存：

```typescript
const { trigger } = useMutation('/api/update-plant', 'POST', {
  revalidatePattern: '/api/plant' // 会刷新所有包含 '/api/plant' 的缓存
})
```

### 3. 组合使用

```typescript
const { trigger } = useMutation('/api/update-plant', 'POST', {
  // 刷新普通 SWR 缓存
  revalidateKeys: ['/api/simple-data'],

  // 刷新 useFetch 缓存
  revalidateFetchKeys: [
    { key: '/api/plant-data', body: {} },
    { key: '/api/plant-stats', body: { type: 'summary' } }
  ],

  // 模式匹配刷新
  revalidatePattern: '/api/plant',

  onSuccess: data => {
    console.log('更新成功', data)
  }
})
```

## 使用场景示例

### 场景1：更新植物数据后刷新相关页面

```typescript
// 在组件中
const { data: plantData } = useFetch('/api/plant-data', {})
const { data: plantStats } = useFetch('/api/plant-stats', { type: 'summary' })

const { trigger: updatePlant } = useMutation('/api/update-plant', 'POST', {
  revalidateFetchKeys: [
    { key: '/api/plant-data', body: {} },
    { key: '/api/plant-stats', body: { type: 'summary' } }
  ],
  toastSuccess: '植物数据更新成功！'
})

const handleUpdate = async () => {
  await updatePlant({ plantId: 123, newData: {...} })
  // 此时 plantData 和 plantStats 会自动刷新
}
```

### 场景2：使用模式匹配批量刷新

```typescript
const { trigger: batchUpdate } = useMutation('/api/batch-update', 'POST', {
  revalidatePattern: '/api/plant', // 刷新所有植物相关的缓存
  toastSuccess: '批量更新成功！'
})
```

## 技术实现

修改后的 `useMutation` 支持三种缓存刷新方式：

1. **revalidateKeys**: 刷新普通的 SWR 缓存（字符串 key）
2. **revalidateFetchKeys**: 刷新 useFetch 的缓存（[key, body] 格式）
3. **revalidatePattern**: 使用模式匹配刷新所有相关缓存

这样就完美解决了两个 hook 之间的缓存同步问题。
