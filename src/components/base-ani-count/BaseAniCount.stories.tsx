import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import BaseAniCount from './BaseAniCount'

// Mock function for callbacks
const fn = () => {
  console.log('Animation callback triggered')
}

const meta = {
  title: 'Components/BaseAniCount',
  component: BaseAniCount,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'HiiotUI BaseAniCount组件 - 支持数字滚动动画的计数器组件，基于react-countup和Headless UI Transition实现。'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    end: {
      control: { type: 'number' },
      description: '目标数值'
    },
    start: {
      control: { type: 'number' },
      description: '起始数值，默认为 0'
    },
    duration: {
      control: { type: 'number', min: 0.1, max: 10, step: 0.1 },
      description: '动画持续时间（秒），默认为 2'
    },
    decimals: {
      control: { type: 'number', min: 0, max: 5, step: 1 },
      description: '小数位数，默认为 0'
    },
    separator: {
      control: { type: 'text' },
      description: '数字分隔符，默认为 ","'
    },
    decimal: {
      control: { type: 'text' },
      description: '小数点符号，默认为 "."'
    },
    prefix: {
      control: { type: 'text' },
      description: '前缀'
    },
    suffix: {
      control: { type: 'text' },
      description: '后缀'
    },
    useEasing: {
      control: { type: 'boolean' },
      description: '是否启用缓动动画，默认为 true'
    },
    autoStart: {
      control: { type: 'boolean' },
      description: '是否自动开始动画，默认为 true'
    },
    className: {
      control: { type: 'text' },
      description: '自定义样式类名'
    }
  },
  args: { 
    end: 100,
    start: 0,
    duration: 2,
    decimals: 0,
    separator: ",",
    decimal: ".",
    prefix: "",
    suffix: "",
    useEasing: true,
    autoStart: true,
    className: "",
    onEnd: fn,
    onStart: fn 
  },
} satisfies Meta<typeof BaseAniCount>

export default meta
type Story = StoryObj<typeof meta>

// 基础示例
export const Default: Story = {
  args: {
    end: 1234,
  },
  parameters: {
    docs: {
      source: {
        code: `<BaseAniCount end={1234} />`
      }
    }
  }
}

// 货币格式
export const Currency: Story = {
  args: {
    end: 99999,
    prefix: '$',
    separator: ',',
    className: 'text-green-600 text-2xl',
  },
  parameters: {
    docs: {
      source: {
        code: `<BaseAniCount 
  end={99999}
  prefix="$"
  separator=","
  className="text-green-600 text-2xl"
/>`
      }
    }
  }
}

// 百分比
export const Percentage: Story = {
  args: {
    end: 85.6,
    decimals: 1,
    suffix: '%',
    className: 'text-purple-600 text-2xl',
  },
  parameters: {
    docs: {
      source: {
        code: `<BaseAniCount 
  end={85.6}
  decimals={1}
  suffix="%"
  className="text-purple-600 text-2xl"
/>`
      }
    }
  }
}

// 慢速动画
export const SlowAnimation: Story = {
  args: {
    end: 500,
    duration: 5,
    className: 'text-red-600 text-2xl',
  },
  parameters: {
    docs: {
      source: {
        code: `<BaseAniCount 
  end={500}
  duration={5}
  className="text-red-600 text-2xl"
/>`
      }
    }
  }
}

// 快速动画
export const FastAnimation: Story = {
  args: {
    end: 1000,
    duration: 0.5,
    className: 'text-blue-600 text-2xl',
  },
  parameters: {
    docs: {
      source: {
        code: `<BaseAniCount 
  end={1000}
  duration={0.5}
  className="text-blue-600 text-2xl"
/>`
      }
    }
  }
}

// 大数字
export const LargeNumber: Story = {
  args: {
    end: 1000000,
    start: 500000,
    duration: 3,
    separator: ',',
    className: 'text-indigo-600 text-3xl',
  },
  parameters: {
    docs: {
      source: {
        code: `<BaseAniCount 
  end={1000000}
  start={500000}
  duration={3}
  separator=","
  className="text-indigo-600 text-3xl"
/>`
      }
    }
  }
}

// 小数
export const Decimal: Story = {
  args: {
    end: 123.456,
    decimals: 3,
    className: 'text-orange-600 text-2xl',
  },
  parameters: {
    docs: {
      source: {
        code: `<BaseAniCount 
  end={123.456}
  decimals={3}
  className="text-orange-600 text-2xl"
/>`
      }
    }
  }
}

// 无缓动
export const NoEasing: Story = {
  args: {
    end: 777,
    useEasing: false,
    className: 'text-gray-600 text-2xl',
  },
  parameters: {
    docs: {
      source: {
        code: `<BaseAniCount 
  end={777}
  useEasing={false}
  className="text-gray-600 text-2xl"
/>`
      }
    }
  }
}

// 手动触发
export const ManualTrigger: Story = {
  args: {
    end: 888,
    start: 0,
    autoStart: false,
    className: 'text-pink-600 text-2xl',
  },
  render: (args) => {
    const [isAnimating, setIsAnimating] = useState(false)
    const [key, setKey] = useState(0)
    
    const handleTrigger = () => {
      // 重置组件并开始动画
      setKey(prev => prev + 1)
      setIsAnimating(true)
    }
    
    const handleReset = () => {
      // 重置到初始状态
      setKey(prev => prev + 1)
      setIsAnimating(false)
    }
    
    return (
      <div className="flex flex-col items-center gap-4">
        <div className="text-center">
          <div className="mb-2 text-sm text-gray-600">
            当前状态: {isAnimating ? '动画中' : '等待触发'}
          </div>
          <BaseAniCount 
            {...args} 
            key={key}
            autoStart={isAnimating}
          />
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleTrigger}
            disabled={isAnimating}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            开始动画
          </button>
          <button
            onClick={handleReset}
            className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors"
          >
            重置
          </button>
        </div>
      </div>
    )
  },
  parameters: {
    docs: {
      source: {
        code: `// 手动触发动画示例
const [isAnimating, setIsAnimating] = useState(false)
const [key, setKey] = useState(0)

const handleTrigger = () => {
  setKey(prev => prev + 1)
  setIsAnimating(true)
}

const handleReset = () => {
  setKey(prev => prev + 1)
  setIsAnimating(false)
}

<BaseAniCount 
  end={888}
  start={0}
  autoStart={isAnimating}
  key={key}
  className="text-pink-600 text-2xl"
/>`
      }
    }
  }
}

// 组合示例
export const AllVariants: Story = {
  args: {
    end: 1234,
  },
  render: () => {
    const [key, setKey] = useState(0)
    
    const resetAnimation = () => {
      setKey(prev => prev + 1)
    }
    
    return (
      <div className="max-w-4xl mx-auto p-6">
        <h2 className="text-2xl font-bold text-center mb-8 text-gray-800">
          数字滚动动画组件演示
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* 基础示例 */}
          <div className="bg-white rounded-lg shadow-md p-4 border">
            <h3 className="text-lg font-semibold mb-3 text-gray-700">基础数字滚动</h3>
            <div className="text-center">
              <BaseAniCount
                key={`basic-${key}`}
                end={1234}
                className="text-blue-600 text-3xl font-bold"
              />
            </div>
            <p className="text-sm text-gray-500 mt-2 text-center">从 0 滚动到 1,234</p>
          </div>

          {/* 货币格式 */}
          <div className="bg-white rounded-lg shadow-md p-4 border">
            <h3 className="text-lg font-semibold mb-3 text-gray-700">货币格式</h3>
            <div className="text-center">
              <BaseAniCount
                key={`currency-${key}`}
                end={99999}
                prefix="$"
                separator=","
                className="text-green-600 text-3xl font-bold"
              />
            </div>
            <p className="text-sm text-gray-500 mt-2 text-center">美元格式显示</p>
          </div>

          {/* 百分比 */}
          <div className="bg-white rounded-lg shadow-md p-4 border">
            <h3 className="text-lg font-semibold mb-3 text-gray-700">百分比</h3>
            <div className="text-center">
              <BaseAniCount
                key={`percentage-${key}`}
                end={85.6}
                decimals={1}
                suffix="%"
                className="text-purple-600 text-3xl font-bold"
              />
            </div>
            <p className="text-sm text-gray-500 mt-2 text-center">带小数的百分比</p>
          </div>

          {/* 慢速动画 */}
          <div className="bg-white rounded-lg shadow-md p-4 border">
            <h3 className="text-lg font-semibold mb-3 text-gray-700">慢速动画</h3>
            <div className="text-center">
              <BaseAniCount
                key={`slow-${key}`}
                end={500}
                duration={5}
                className="text-red-600 text-3xl font-bold"
              />
            </div>
            <p className="text-sm text-gray-500 mt-2 text-center">5秒动画时长</p>
          </div>

          {/* 大数字 */}
          <div className="bg-white rounded-lg shadow-md p-4 border">
            <h3 className="text-lg font-semibold mb-3 text-gray-700">大数字</h3>
            <div className="text-center">
              <BaseAniCount
                key={`large-${key}`}
                end={1000000}
                start={500000}
                duration={3}
                separator=","
                className="text-indigo-600 text-3xl font-bold"
              />
            </div>
            <p className="text-sm text-gray-500 mt-2 text-center">从 500,000 到 1,000,000</p>
          </div>

          {/* 小数示例 */}
          <div className="bg-white rounded-lg shadow-md p-4 border">
            <h3 className="text-lg font-semibold mb-3 text-gray-700">精确小数</h3>
            <div className="text-center">
              <BaseAniCount
                key={`decimal-${key}`}
                end={123.456}
                decimals={3}
                className="text-orange-600 text-3xl font-bold"
              />
            </div>
            <p className="text-sm text-gray-500 mt-2 text-center">三位小数精度</p>
          </div>
        </div>

        {/* 控制按钮 */}
        <div className="text-center mt-8">
          <button
            onClick={resetAnimation}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold shadow-md"
          >
            重新播放所有动画
          </button>
        </div>

        {/* 特性说明 */}
        <div className="bg-gray-50 rounded-lg p-6 mt-8 border">
          <h3 className="text-lg font-semibold mb-4 text-gray-700">组件特性</h3>
          <ul className="space-y-2 text-gray-600 text-sm">
            <li>• 使用 Headless UI 的 Transition 组件实现入场动画</li>
            <li>• 使用 react-countup 实现数字滚动效果</li>
            <li>• 支持自定义前缀、后缀、小数位数等</li>
            <li>• 支持自动开始或手动触发动画</li>
            <li>• 提供动画开始和结束的回调函数</li>
            <li>• 完全可定制的样式和动画时长</li>
            <li>• 支持缓动动画和线性动画</li>
          </ul>
        </div>
      </div>
    )
  },
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: '展示BaseAniCount组件的所有功能特性和使用场景的综合示例。'
      },
      source: {
        code: `// 基础使用
<BaseAniCount end={1234} />

// 货币格式
<BaseAniCount 
  end={99999}
  prefix="$"
  separator=","
  className="text-green-600 text-2xl"
/>

// 百分比
<BaseAniCount 
  end={85.6}
  decimals={1}
  suffix="%"
  className="text-purple-600 text-2xl"
/>

// 自定义动画时长
<BaseAniCount 
  end={500}
  duration={5}
  className="text-red-600 text-2xl"
/>

// 大数字格式
<BaseAniCount 
  end={1000000}
  start={500000}
  duration={3}
  separator=","
  className="text-indigo-600 text-3xl"
/>`
      }
    }
  }
}