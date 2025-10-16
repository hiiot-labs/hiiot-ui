import type { Meta, StoryObj } from '@storybook/react'
import Button from './Button'

// Mock function for onClick
const fn = () => {
  console.log('Button clicked')
}

const meta = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'HiiotUI Button组件 - 支持多种变体、尺寸和状态的按钮组件。'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link'],
      description: '按钮的视觉变体'
    },
    size: {
      control: { type: 'select' },
      options: ['default', 'sm', 'lg', 'icon'],
      description: '按钮的尺寸'
    },
    disabled: {
      control: { type: 'boolean' },
      description: '是否禁用按钮'
    },
    loading: {
      control: { type: 'boolean' },
      description: '是否显示加载状态'
    },
    children: {
      control: { type: 'text' },
      description: '按钮内容'
    }
  },
  args: { onClick: fn },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

// 基础示例
export const Default: Story = {
  args: {
    children: '默认按钮',
  },
}

export const Destructive: Story = {
  args: {
    variant: 'destructive',
    children: '危险按钮',
  },
}

export const Outline: Story = {
  args: {
    variant: 'outline',
    children: '轮廓按钮',
  },
}

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: '次要按钮',
  },
}

export const Ghost: Story = {
  args: {
    variant: 'ghost',
    children: '幽灵按钮',
  },
}

export const Link: Story = {
  args: {
    variant: 'link',
    children: '链接按钮',
  },
}

// 尺寸变体
export const Small: Story = {
  args: {
    size: 'sm',
    children: '小按钮',
  },
}

export const Large: Story = {
  args: {
    size: 'lg',
    children: '大按钮',
  },
}

export const Icon: Story = {
  args: {
    size: 'icon',
    children: '🚀',
  },
}

// 状态变体
export const Disabled: Story = {
  args: {
    disabled: true,
    children: '禁用按钮',
  },
}

export const Loading: Story = {
  args: {
    loading: true,
    children: '加载中...',
  },
}

// 组合示例
export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">变体</h3>
        <div className="flex flex-wrap gap-2">
          <Button>默认</Button>
          <Button variant="destructive">危险</Button>
          <Button variant="outline">轮廓</Button>
          <Button variant="secondary">次要</Button>
          <Button variant="ghost">幽灵</Button>
          <Button variant="link">链接</Button>
        </div>
      </div>
      
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">尺寸</h3>
        <div className="flex flex-wrap gap-2 items-center">
          <Button size="sm">小</Button>
          <Button>默认</Button>
          <Button size="lg">大</Button>
          <Button size="icon">🎯</Button>
        </div>
      </div>
      
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">状态</h3>
        <div className="flex flex-wrap gap-2">
          <Button>正常</Button>
          <Button disabled>禁用</Button>
          <Button loading>加载中</Button>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '展示Button组件的所有变体、尺寸和状态组合。'
      }
    }
  }
}