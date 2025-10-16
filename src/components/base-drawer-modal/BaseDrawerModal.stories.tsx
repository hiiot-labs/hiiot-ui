import type { Meta, StoryObj } from '@storybook/react';
import { useRef } from 'react';
import { BaseDrawerModal } from './index';
import type { DrawerRefType, DrawerModalProps } from './index';

const meta: Meta<typeof BaseDrawerModal> = {
  title: 'Components/BaseDrawerModal',
  component: BaseDrawerModal,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '一个可配置的抽屉模态框组件，支持四个方向的滑出效果。'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    placement: {
      control: { type: 'select' },
      options: ['left', 'right', 'bottom', 'top'],
      description: '抽屉出现的位置'
    },
    width: {
      control: { type: 'text' },
      description: '抽屉宽度（水平方向时生效）'
    },
    height: {
      control: { type: 'text' },
      description: '抽屉高度（垂直方向时生效）'
    },
    title: {
      control: { type: 'text' },
      description: '抽屉标题'
    },
    closeIcon: {
      control: { type: 'boolean' },
      description: '是否显示关闭图标'
    },
    disableBackdropClick: {
      control: { type: 'boolean' },
      description: '是否禁用点击背景关闭'
    },
    className: {
      control: { type: 'text' },
      description: '自定义样式类名'
    }
  },
  args: {
    placement: 'right',
    width: '400px',
    height: '60vh',
    title: '抽屉标题',
    closeIcon: true,
    disableBackdropClick: false,
    className: ''
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

// 默认故事
export const Default: Story = {
  args: {
    buttonProps: (
      <button className="px-4 py-2 bg-blue-500 text-gray-800 rounded hover:bg-blue-600 hover:text-white shadow-md">
        打开抽屉
      </button>
    ),
    children: (
      <div className="p-4 text-white">
        <h3 className="text-lg font-semibold mb-4 text-white">抽屉内容</h3>
        <p className="mb-4 text-gray-200">这是抽屉的默认内容。你可以在这里放置任何组件或内容。</p>
        <div className="space-y-2">
          <div className="p-3 bg-gray-700 text-white rounded">内容项 1</div>
          <div className="p-3 bg-gray-700 text-white rounded">内容项 2</div>
          <div className="p-3 bg-gray-700 text-white rounded">内容项 3</div>
        </div>
      </div>
    )
  },
  parameters: {
    docs: {
      source: {
        code: `
<BaseDrawerModal
  placement="right"
  width="400px"
  title="抽屉标题"
  closeIcon={true}
  buttonProps={
    <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
      打开抽屉
    </button>
  }
>
  <div className="p-4">
    <h3 className="text-lg font-semibold mb-4">抽屉内容</h3>
    <p className="mb-4">这是抽屉的默认内容。</p>
  </div>
</BaseDrawerModal>`
      }
    }
  }
};

// 左侧抽屉
export const LeftDrawer: Story = {
  args: {
    placement: 'left',
    width: '350px',
    title: '左侧抽屉',
    buttonProps: (
      <button className="px-4 py-2 bg-green-500 text-gray-800 rounded hover:bg-green-600 hover:text-white shadow-md">
        从左侧打开
      </button>
    ),
    children: (
      <div className="p-4 text-white">
        <h3 className="text-lg font-semibold mb-4 text-white">导航菜单</h3>
        <nav className="space-y-2">
          <a href="#" className="block p-2 hover:bg-gray-600 rounded text-gray-200 hover:text-white">首页</a>
          <a href="#" className="block p-2 hover:bg-gray-600 rounded text-gray-200 hover:text-white">产品</a>
          <a href="#" className="block p-2 hover:bg-gray-600 rounded text-gray-200 hover:text-white">服务</a>
          <a href="#" className="block p-2 hover:bg-gray-600 rounded text-gray-200 hover:text-white">关于我们</a>
          <a href="#" className="block p-2 hover:bg-gray-600 rounded text-gray-200 hover:text-white">联系我们</a>
        </nav>
      </div>
    )
  },
  parameters: {
    docs: {
      source: {
        code: `
<BaseDrawerModal
  placement="left"
  width="350px"
  title="左侧抽屉"
  buttonProps={
    <button className="px-4 py-2 bg-green-500 text-white rounded">
      从左侧打开
    </button>
  }
>
  <div className="p-4">
    <h3 className="text-lg font-semibold mb-4">导航菜单</h3>
    <nav className="space-y-2">
      <a href="#" className="block p-2 hover:bg-gray-100 rounded">首页</a>
      {/* 更多菜单项... */}
    </nav>
  </div>
</BaseDrawerModal>`
      }
    }
  }
};

// 底部抽屉
export const BottomDrawer: Story = {
  args: {
    placement: 'bottom',
    height: '50vh',
    title: '底部抽屉',
    buttonProps: (
      <button className="px-4 py-2 bg-purple-500 text-gray-800 rounded hover:bg-purple-600 hover:text-white shadow-md">
        从底部打开
      </button>
    ),
    children: (
      <div className="p-4 text-white">
        <h3 className="text-lg font-semibold mb-4 text-white">操作面板</h3>
        <div className="grid grid-cols-2 gap-4">
          <button className="p-3 bg-blue-600 text-white rounded hover:bg-blue-700">操作 1</button>
          <button className="p-3 bg-green-600 text-white rounded hover:bg-green-700">操作 2</button>
          <button className="p-3 bg-yellow-600 text-white rounded hover:bg-yellow-700">操作 3</button>
          <button className="p-3 bg-red-600 text-white rounded hover:bg-red-700">操作 4</button>
        </div>
      </div>
    )
  },
  parameters: {
    docs: {
      source: {
        code: `
<BaseDrawerModal
  placement="bottom"
  height="50vh"
  title="底部抽屉"
  buttonProps={
    <button className="px-4 py-2 bg-purple-500 text-white rounded">
      从底部打开
    </button>
  }
>
  <div className="p-4">
    <h3 className="text-lg font-semibold mb-4">操作面板</h3>
    <div className="grid grid-cols-2 gap-4">
      <button className="p-3 bg-blue-100 rounded">操作 1</button>
      {/* 更多操作按钮... */}
    </div>
  </div>
</BaseDrawerModal>`
      }
    }
  }
};

// 顶部抽屉
export const TopDrawer: Story = {
  args: {
    placement: 'top',
    height: '40vh',
    title: '顶部抽屉',
    buttonProps: (
      <button className="px-4 py-2 bg-orange-500 text-gray-800 rounded hover:bg-orange-600 hover:text-white shadow-md">
        从顶部打开
      </button>
    ),
    children: (
      <div className="p-4 text-white">
        <h3 className="text-lg font-semibold mb-4 text-white">通知中心</h3>
        <div className="space-y-3">
          <div className="p-3 border-l-4 border-blue-400 bg-blue-900/30 rounded">
            <p className="font-medium text-blue-200">系统通知</p>
            <p className="text-sm text-blue-300">您有新的系统更新可用</p>
          </div>
          <div className="p-3 border-l-4 border-green-400 bg-green-900/30 rounded">
            <p className="font-medium text-green-200">操作成功</p>
            <p className="text-sm text-green-300">数据保存成功</p>
          </div>
          <div className="p-3 border-l-4 border-yellow-400 bg-yellow-900/30 rounded">
            <p className="font-medium text-yellow-200">警告</p>
            <p className="text-sm text-yellow-300">存储空间不足</p>
          </div>
        </div>
      </div>
    )
  },
  parameters: {
    docs: {
      source: {
        code: `
<BaseDrawerModal
  placement="top"
  height="40vh"
  title="顶部抽屉"
  buttonProps={
    <button className="px-4 py-2 bg-orange-500 text-white rounded">
      从顶部打开
    </button>
  }
>
  <div className="p-4">
    <h3 className="text-lg font-semibold mb-4">通知中心</h3>
    <div className="space-y-3">
      <div className="p-3 border-l-4 border-blue-500 bg-blue-50 rounded">
        <p className="font-medium">系统通知</p>
        <p className="text-sm text-gray-600">您有新的系统更新可用</p>
      </div>
      {/* 更多通知... */}
    </div>
  </div>
</BaseDrawerModal>`
      }
    }
  }
};

// 无关闭图标
export const NoCloseIcon: Story = {
  args: {
    closeIcon: false,
    title: '无关闭图标',
    buttonProps: (
      <button className="px-4 py-2 bg-red-500 text-gray-800 rounded hover:bg-red-600 hover:text-white shadow-md">
        打开（无关闭图标）
      </button>
    ),
    children: (
      <div className="p-4 text-white">
        <h3 className="text-lg font-semibold mb-4 text-white">重要信息</h3>
        <p className="mb-4 text-gray-200">这个抽屉没有关闭图标，只能通过点击背景或程序控制关闭。</p>
        <p className="text-sm text-gray-300">点击背景区域可以关闭抽屉</p>
      </div>
    )
  },
  parameters: {
    docs: {
      source: {
        code: `
<BaseDrawerModal
  closeIcon={false}
  title="无关闭图标"
  buttonProps={
    <button className="px-4 py-2 bg-red-500 text-white rounded">
      打开（无关闭图标）
    </button>
  }
>
  <div className="p-4">
    <h3 className="text-lg font-semibold mb-4">重要信息</h3>
    <p>这个抽屉没有关闭图标，只能通过点击背景或程序控制关闭。</p>
  </div>
</BaseDrawerModal>`
      }
    }
  }
};

// 禁用背景点击关闭
export const DisableBackdropClick: Story = {
  args: {
    disableBackdropClick: true,
    title: '禁用背景点击',
    buttonProps: (
      <button className="px-4 py-2 bg-gray-500 text-gray-800 rounded hover:bg-gray-600 hover:text-white shadow-md">
        打开（禁用背景点击）
      </button>
    ),
    children: (
      <div className="p-4 text-white">
        <h3 className="text-lg font-semibold mb-4 text-white">强制确认</h3>
        <p className="mb-4 text-gray-200">这个抽屉禁用了背景点击关闭，只能通过关闭图标关闭。</p>
        <div className="p-3 bg-yellow-900/30 border border-yellow-400 rounded">
          <p className="text-sm text-yellow-200">⚠️ 点击背景无法关闭此抽屉</p>
        </div>
      </div>
    )
  },
  parameters: {
    docs: {
      source: {
        code: `
<BaseDrawerModal
  disableBackdropClick={true}
  title="禁用背景点击"
  buttonProps={
    <button className="px-4 py-2 bg-gray-500 text-white rounded">
      打开（禁用背景点击）
    </button>
  }
>
  <div className="p-4">
    <h3 className="text-lg font-semibold mb-4">强制确认</h3>
    <p>这个抽屉禁用了背景点击关闭，只能通过关闭图标关闭。</p>
  </div>
</BaseDrawerModal>`
      }
    }
  }
};

// 自定义标题
export const CustomTitle: Story = {
  args: {
    title: (
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
            <span className="text-white text-sm font-bold">U</span>
          </div>
          <div>
            <h3 className="font-semibold">用户信息</h3>
            <p className="text-sm text-gray-500">管理您的个人资料</p>
          </div>
        </div>
      </div>
    ),
    closeIcon: true,
    buttonProps: (
      <button className="px-4 py-2 bg-indigo-500 text-gray-800 rounded hover:bg-indigo-600 hover:text-white shadow-md">
        打开自定义标题
      </button>
    ),
    children: (
      <div className="p-4">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">姓名</label>
            <input type="text" className="w-full p-2 border rounded" placeholder="请输入姓名" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">邮箱</label>
            <input type="email" className="w-full p-2 border rounded" placeholder="请输入邮箱" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">电话</label>
            <input type="tel" className="w-full p-2 border rounded" placeholder="请输入电话" />
          </div>
          <div className="flex space-x-2 pt-4">
            <button className="flex-1 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
              保存
            </button>
            <button className="flex-1 px-4 py-2 border border-gray-300 rounded hover:bg-gray-50">
              取消
            </button>
          </div>
        </div>
      </div>
    )
  },
  parameters: {
    docs: {
      source: {
        code: `
<BaseDrawerModal
  title={
    <div className="flex items-center justify-between p-4 border-b">
      <div className="flex items-center space-x-2">
        <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
          <span className="text-white text-sm font-bold">U</span>
        </div>
        <div>
          <h3 className="font-semibold">用户信息</h3>
          <p className="text-sm text-gray-500">管理您的个人资料</p>
        </div>
      </div>
    </div>
  }
  buttonProps={
    <button className="px-4 py-2 bg-indigo-500 text-white rounded">
      自定义标题
    </button>
  }
>
  <div className="p-4">
    {/* 表单内容... */}
  </div>
</BaseDrawerModal>`
      }
    }
  }
};

// 程序控制
export const ProgrammaticControl: Story = {
  render: (args) => {
    const drawerRef = useRef<DrawerRefType>(null);

    const handleOpen = () => {
      drawerRef.current?.open();
    };

    const handleClose = () => {
      drawerRef.current?.close();
    };

    return (
      <div className="space-x-4">
        <button 
            onClick={handleOpen}
            className="px-4 py-2 bg-blue-500 text-gray-800 rounded hover:bg-blue-600 hover:text-white shadow-md"
          >
            程序打开
          </button>
          <button 
            onClick={handleClose}
            className="px-4 py-2 bg-red-500 text-gray-800 rounded hover:bg-red-600 hover:text-white shadow-md"
          >
            程序关闭
        </button>
        <BaseDrawerModal
          ref={drawerRef}
          {...args}
        >
          <div className="p-4 text-white">
            <h3 className="text-lg font-semibold mb-4 text-white">程序控制演示</h3>
            <p className="mb-4 text-gray-200">这个抽屉通过程序控制开关状态。</p>
            <div className="space-y-3">
              <div className="p-3 bg-blue-900/30 border border-blue-400 rounded">
                <p className="text-sm font-medium text-blue-200">当前状态</p>
                <p className="text-xs text-blue-300">抽屉已打开</p>
              </div>
              <div className="flex gap-2">
                <button 
                  className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                  onClick={() => {
                    const drawerRef = (args as any).ref?.current;
                    if (drawerRef) {
                      drawerRef.close();
                    }
                  }}
                >
                  关闭抽屉
                </button>
                <button 
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                  onClick={() => {
                    const drawerRef = (args as any).ref?.current;
                    if (drawerRef) {
                      drawerRef.toggle();
                    }
                  }}
                >
                  切换状态
                </button>
              </div>
            </div>
          </div>
        </BaseDrawerModal>
      </div>
    );
  },
  args: {
    title: '程序控制抽屉'
  },
  parameters: {
    docs: {
      source: {
        code: `
const drawerRef = useRef<DrawerRefType>(null);

const handleOpen = () => {
  drawerRef.current?.open();
};

const handleClose = () => {
  drawerRef.current?.close();
};

return (
  <div className="space-x-4">
    <button onClick={handleOpen}>程序打开</button>
    <button onClick={handleClose}>程序关闭</button>
    <BaseDrawerModal ref={drawerRef} title="程序控制抽屉">
      <div className="p-4">
        <h3>程序控制示例</h3>
        <p>这个抽屉通过 ref 进行程序控制。</p>
      </div>
    </BaseDrawerModal>
  </div>
);`
      }
    }
  }
};