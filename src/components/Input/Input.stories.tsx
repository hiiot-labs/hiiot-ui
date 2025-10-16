import type { Meta, StoryObj } from '@storybook/react'
import Input from './Input'

const meta = {
  title: 'Components/Input',
  component: Input,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'HiiotUI Input组件 - 支持多种变体、尺寸和状态的输入框组件，包含标签、错误提示和帮助文本。'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'filled', 'outlined'],
      description: '输入框的视觉变体'
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: '输入框的尺寸'
    },
    label: {
      control: { type: 'text' },
      description: '输入框标签'
    },
    placeholder: {
      control: { type: 'text' },
      description: '占位符文本'
    },
    error: {
      control: { type: 'text' },
      description: '错误信息'
    },
    helperText: {
      control: { type: 'text' },
      description: '帮助文本'
    },
    disabled: {
      control: { type: 'boolean' },
      description: '是否禁用输入框'
    }
  },
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>

// 基础示例
export const Default: Story = {
  args: {
    placeholder: '请输入内容...',
  },
}

export const WithLabel: Story = {
  args: {
    label: '用户名',
    placeholder: '请输入用户名',
  },
}

export const WithHelperText: Story = {
  args: {
    label: '邮箱地址',
    placeholder: '请输入邮箱地址',
    helperText: '我们不会分享您的邮箱地址',
  },
}

export const WithError: Story = {
  args: {
    label: '密码',
    placeholder: '请输入密码',
    error: '密码长度至少8位',
    value: '123',
  },
}

// 变体示例
export const Filled: Story = {
  args: {
    variant: 'filled',
    label: '填充样式',
    placeholder: '填充样式输入框',
  },
}

export const Outlined: Story = {
  args: {
    variant: 'outlined',
    label: '轮廓样式',
    placeholder: '轮廓样式输入框',
  },
}

// 尺寸示例
export const Small: Story = {
  args: {
    size: 'sm',
    label: '小尺寸',
    placeholder: '小尺寸输入框',
  },
}

export const Medium: Story = {
  args: {
    size: 'md',
    label: '中等尺寸',
    placeholder: '中等尺寸输入框',
  },
}

export const Large: Story = {
  args: {
    size: 'lg',
    label: '大尺寸',
    placeholder: '大尺寸输入框',
  },
}

// 状态示例
export const Disabled: Story = {
  args: {
    label: '禁用状态',
    placeholder: '禁用的输入框',
    disabled: true,
    value: '不可编辑的内容',
  },
}

// 组合示例
export const AllVariants: Story = {
  render: () => (
    <div className="space-y-8 w-96">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">变体</h3>
        <Input 
          variant="default" 
          label="默认样式" 
          placeholder="默认样式输入框" 
        />
        <Input 
          variant="filled" 
          label="填充样式" 
          placeholder="填充样式输入框" 
        />
        <Input 
          variant="outlined" 
          label="轮廓样式" 
          placeholder="轮廓样式输入框" 
        />
      </div>
      
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">尺寸</h3>
        <Input 
          size="sm" 
          label="小尺寸" 
          placeholder="小尺寸输入框" 
        />
        <Input 
          size="md" 
          label="中等尺寸" 
          placeholder="中等尺寸输入框" 
        />
        <Input 
          size="lg" 
          label="大尺寸" 
          placeholder="大尺寸输入框" 
        />
      </div>
      
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">状态</h3>
        <Input 
          label="正常状态" 
          placeholder="正常状态输入框" 
        />
        <Input 
          label="带帮助文本" 
          placeholder="带帮助文本的输入框" 
          helperText="这是帮助文本"
        />
        <Input 
          label="错误状态" 
          placeholder="错误状态输入框" 
          error="这是错误信息"
          value="错误的输入"
        />
        <Input 
          label="禁用状态" 
          placeholder="禁用状态输入框" 
          disabled
          value="禁用的内容"
        />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '展示Input组件的所有变体、尺寸和状态组合。'
      }
    }
  }
}