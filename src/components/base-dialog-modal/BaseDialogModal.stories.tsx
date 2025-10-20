import type { Meta, StoryObj } from "@storybook/react-vite";
import { useRef } from "react";
import { BaseDialogModal } from "./index";
import type { DialogModalProps, ModalRefType } from "./index";

const meta: Meta<typeof BaseDialogModal> = {
  title: "Components/BaseDialogModal",
  component: BaseDialogModal,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "基础对话框模态组件，支持自定义标题、内容、关闭按钮等功能。基于 Headless UI 构建，提供灵活的配置选项。",
      },
    },
  },
  argTypes: {
    id: {
      control: "text",
      description: "对话框的唯一标识符",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "scroll-dialog-title" },
      },
    },
    title: {
      control: "text",
      description: "对话框标题，可以是字符串或 React 节点",
      table: {
        type: { summary: "string | React.ReactNode" },
        defaultValue: { summary: '""' },
      },
    },
    className: {
      control: "text",
      description: "自定义 CSS 类名",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: '""' },
      },
    },
    closeIcon: {
      control: "boolean",
      description: "是否显示关闭图标",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "true" },
      },
    },
    disableBackdropClick: {
      control: "boolean",
      description: "是否禁用点击背景关闭对话框",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    bgUrl: {
      control: "text",
      description: "背景图片 URL",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: '""' },
      },
    },
    externalClose: {
      control: "boolean",
      description: "是否显示外部关闭按钮",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    children: {
      control: false,
      description: "对话框内容",
      table: {
        type: { summary: "React.ReactNode" },
      },
    },
    buttonProps: {
      control: false,
      description: "触发对话框的按钮组件",
      table: {
        type: { summary: "React.ReactNode" },
      },
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

// 默认对话框
export const Default: Story = {
  args: {
    title: "默认对话框",
    closeIcon: true,
    buttonProps: (
      <button className="px-4 py-2 bg-blue-500 text-gray-800 rounded hover:bg-blue-600 hover:text-white shadow-md">
        打开对话框
      </button>
    ),
    children: (
      <div className="text-white space-y-4">
        <p className="text-gray-200">这是一个基础的对话框示例。</p>
        <p className="text-gray-200">
          您可以在这里放置任何内容，比如表单、图片或其他组件。
        </p>
        <div className="flex justify-end space-x-2 mt-4">
          <button className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700">
            取消
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            确认
          </button>
        </div>
      </div>
    ),
  },
};

// 无关闭图标
export const NoCloseIcon: Story = {
  args: {
    title: "无关闭图标",
    closeIcon: false,
    buttonProps: (
      <button className="px-4 py-2 bg-red-500 text-gray-800 rounded hover:bg-red-600 hover:text-white shadow-md">
        打开（无关闭图标）
      </button>
    ),
    children: (
      <div className="text-white space-y-4">
        <p className="text-gray-200">这个对话框没有关闭图标。</p>
        <p className="text-gray-200">用户只能通过点击背景或内部按钮来关闭。</p>
        <div className="flex justify-center mt-4">
          <button className="px-6 py-2 bg-red-600 text-white rounded hover:bg-red-700">
            关闭对话框
          </button>
        </div>
      </div>
    ),
  },
};

// 禁用背景点击
export const DisableBackdropClick: Story = {
  args: {
    title: "禁用背景点击",
    closeIcon: true,
    disableBackdropClick: true,
    buttonProps: (
      <button className="px-4 py-2 bg-orange-500 text-gray-800 rounded hover:bg-orange-600 hover:text-white shadow-md">
        打开（禁用背景点击）
      </button>
    ),
    children: (
      <div className="text-white space-y-4">
        <p className="text-gray-200">这个对话框禁用了背景点击关闭功能。</p>
        <p className="text-gray-200">只能通过关闭图标或内部按钮来关闭。</p>
        <div className="flex justify-center mt-4">
          <button className="px-6 py-2 bg-orange-600 text-white rounded hover:bg-orange-700">
            内部关闭按钮
          </button>
        </div>
      </div>
    ),
  },
};

// 外部关闭按钮
export const ExternalClose: Story = {
  args: {
    title: "外部关闭按钮",
    closeIcon: true,
    externalClose: true,
    buttonProps: (
      <button className="px-4 py-2 bg-purple-500 text-gray-800 rounded hover:bg-purple-600 hover:text-white shadow-md">
        打开（外部关闭）
      </button>
    ),
    children: (
      <div className="text-white space-y-4">
        <p className="text-gray-200">这个对话框显示了外部关闭按钮。</p>
        <p className="text-gray-200">
          除了右上角的关闭图标，还有一个外部的关闭按钮。
        </p>
        <div className="text-center mt-4">
          <p className="text-sm text-gray-400">查看对话框底部的外部关闭按钮</p>
        </div>
      </div>
    ),
  },
};

// 自定义标题
export const CustomTitle: Story = {
  args: {
    title: (
      <div className="text-center mb-4">
        <h2 className="text-2xl font-bold text-white mb-2">🎉 自定义标题</h2>
        <p className="text-gray-300 text-sm">
          这是一个带有图标和副标题的自定义标题
        </p>
      </div>
    ),
    closeIcon: true,
    buttonProps: (
      <button className="px-4 py-2 bg-green-500 text-gray-800 rounded hover:bg-green-600 hover:text-white shadow-md">
        打开自定义标题
      </button>
    ),
    children: (
      <div className="text-white space-y-4">
        <p className="text-gray-200">
          标题可以是任何 React 组件，不仅仅是文本。
        </p>
        <p className="text-gray-200">您可以添加图标、样式或其他元素。</p>
      </div>
    ),
  },
};

// 表单对话框
export const FormDialog: Story = {
  args: {
    title: "表单对话框",
    closeIcon: true,
    buttonProps: (
      <button className="px-4 py-2 bg-indigo-500 text-gray-800 rounded hover:bg-indigo-600 hover:text-white shadow-md">
        打开表单
      </button>
    ),
    children: (
      <div className="text-white space-y-4">
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-200 mb-1">
              用户名
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="请输入用户名"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-200 mb-1">
              邮箱
            </label>
            <input
              type="email"
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="请输入邮箱"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-200 mb-1">
              消息
            </label>
            <textarea
              rows={3}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="请输入消息内容"
            />
          </div>
          <div className="flex justify-end space-x-2 pt-4">
            <button
              type="button"
              className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
            >
              取消
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
            >
              提交
            </button>
          </div>
        </form>
      </div>
    ),
  },
};

// 程序化控制
export const ProgrammaticControl: Story = {
  render: (args) => {
    const modalRef = useRef<ModalRefType>(null);

    const handleOpen = () => {
      modalRef.current?.open();
    };

    const handleClose = () => {
      modalRef.current?.close();
    };

    return (
      <div className="space-y-4">
        <div className="space-x-4">
          <button
            onClick={handleOpen}
            className="px-4 py-2 bg-teal-500 text-gray-800 rounded hover:bg-teal-600 hover:text-white shadow-md"
          >
            程序打开
          </button>
          <button
            onClick={handleClose}
            className="px-4 py-2 bg-red-500 text-gray-800 rounded hover:bg-red-600 hover:text-white shadow-md"
          >
            程序关闭
          </button>
        </div>
        <BaseDialogModal ref={modalRef} title="程序化控制" closeIcon={true}>
          <div className="text-white space-y-4">
            <p className="text-gray-200">这个对话框通过 ref 进行程序化控制。</p>
            <p className="text-gray-200">
              您可以通过外部按钮来打开和关闭对话框。
            </p>
            <div className="bg-gray-800 p-3 rounded text-sm">
              <p className="text-gray-300">使用方法：</p>
              <code className="text-green-400">
                modalRef.current?.open() {/* 打开 */}
                <br />
                modalRef.current?.close() {/* 关闭 */}
              </code>
            </div>
          </div>
        </BaseDialogModal>
      </div>
    );
  },
  args: {},
};

// 长内容对话框
export const LongContent: Story = {
  args: {
    title: "长内容对话框",
    closeIcon: true,
    buttonProps: (
      <button className="px-4 py-2 bg-yellow-500 text-gray-800 rounded hover:bg-yellow-600 hover:text-white shadow-md">
        打开长内容
      </button>
    ),
    children: (
      <div className="text-white space-y-4 max-h-96 overflow-y-auto">
        <h3 className="text-lg font-semibold text-gray-200">长内容示例</h3>
        <p className="text-gray-200">
          这是一个包含大量内容的对话框示例。当内容超出对话框高度时，会自动显示滚动条。
        </p>
        {Array.from({ length: 10 }, (_, i) => (
          <div key={i} className="bg-gray-800 p-3 rounded">
            <h4 className="font-medium text-gray-200 mb-2">段落 {i + 1}</h4>
            <p className="text-gray-300 text-sm">
              这是第 {i + 1} 个段落的内容。Lorem ipsum dolor sit amet,
              consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut
              labore et dolore magna aliqua. Ut enim ad minim veniam, quis
              nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
              consequat.
            </p>
          </div>
        ))}
        <div className="flex justify-center pt-4">
          <button className="px-6 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700">
            确认阅读
          </button>
        </div>
      </div>
    ),
  },
};
