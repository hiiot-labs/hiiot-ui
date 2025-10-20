import type { Meta, StoryObj } from '@storybook/react-vite';
import { useMediaQuery } from './index';

// 示例组件
function UseMediaQueryDemo() {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const isTablet = useMediaQuery('(min-width: 769px) and (max-width: 1024px)');
  const isDesktop = useMediaQuery('(min-width: 1025px)');
  const isDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const isLandscape = useMediaQuery('(orientation: landscape)');
  const isPortrait = useMediaQuery('(orientation: portrait)');
  const isHighDPI = useMediaQuery('(min-resolution: 2dppx)');
  const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');

  const getDeviceType = () => {
    if (isMobile) return '📱 移动设备';
    if (isTablet) return '📱 平板设备';
    if (isDesktop) return '💻 桌面设备';
    return '❓ 未知设备';
  };

  return (
    <div style={{ 
      padding: '20px', 
      fontFamily: 'Arial, sans-serif',
      backgroundColor: isDarkMode ? '#1a1a1a' : '#ffffff',
      color: isDarkMode ? '#ffffff' : '#000000',
      minHeight: '100vh'
    }}>
      <h2>useMediaQuery Hook 演示</h2>
      
      {/* 设备类型检测 */}
      <div style={{ 
        marginBottom: '30px', 
        padding: '20px', 
        backgroundColor: isDarkMode ? '#2a2a2a' : '#f8f9fa',
        borderRadius: '8px',
        border: `2px solid ${isMobile ? '#dc3545' : isTablet ? '#ffc107' : '#28a745'}`
      }}>
        <h3>📱 设备类型检测</h3>
        <div style={{ fontSize: '24px', marginBottom: '15px' }}>
          {getDeviceType()}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px' }}>
          <div style={{ 
            padding: '10px', 
            backgroundColor: isMobile ? '#d4edda' : '#f8d7da',
            borderRadius: '4px',
            color: '#000'
          }}>
            移动设备 (≤768px): {isMobile ? '✅' : '❌'}
          </div>
          <div style={{ 
            padding: '10px', 
            backgroundColor: isTablet ? '#d4edda' : '#f8d7da',
            borderRadius: '4px',
            color: '#000'
          }}>
            平板设备 (769-1024px): {isTablet ? '✅' : '❌'}
          </div>
          <div style={{ 
            padding: '10px', 
            backgroundColor: isDesktop ? '#d4edda' : '#f8d7da',
            borderRadius: '4px',
            color: '#000'
          }}>
            桌面设备 (≥1025px): {isDesktop ? '✅' : '❌'}
          </div>
        </div>
      </div>

      {/* 主题和偏好设置 */}
      <div style={{ 
        marginBottom: '30px', 
        padding: '20px', 
        backgroundColor: isDarkMode ? '#2a2a2a' : '#f8f9fa',
        borderRadius: '8px'
      }}>
        <h3>🎨 系统偏好设置</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '15px' }}>
          <div style={{ 
            padding: '15px', 
            backgroundColor: isDarkMode ? '#d4edda' : '#f8d7da',
            borderRadius: '4px',
            color: '#000',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '24px', marginBottom: '5px' }}>
              {isDarkMode ? '🌙' : '☀️'}
            </div>
            <div>主题偏好: {isDarkMode ? '深色模式' : '浅色模式'}</div>
          </div>
          <div style={{ 
            padding: '15px', 
            backgroundColor: prefersReducedMotion ? '#d4edda' : '#f8d7da',
            borderRadius: '4px',
            color: '#000',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '24px', marginBottom: '5px' }}>
              {prefersReducedMotion ? '🐌' : '🚀'}
            </div>
            <div>动画偏好: {prefersReducedMotion ? '减少动画' : '正常动画'}</div>
          </div>
          <div style={{ 
            padding: '15px', 
            backgroundColor: isHighDPI ? '#d4edda' : '#f8d7da',
            borderRadius: '4px',
            color: '#000',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '24px', marginBottom: '5px' }}>
              {isHighDPI ? '🔍' : '👁️'}
            </div>
            <div>屏幕密度: {isHighDPI ? '高分辨率' : '标准分辨率'}</div>
          </div>
        </div>
      </div>

      {/* 屏幕方向 */}
      <div style={{ 
        marginBottom: '30px', 
        padding: '20px', 
        backgroundColor: isDarkMode ? '#2a2a2a' : '#f8f9fa',
        borderRadius: '8px'
      }}>
        <h3>📐 屏幕方向</h3>
        <div style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
          <div style={{ 
            padding: '20px', 
            backgroundColor: isLandscape ? '#d4edda' : '#f8d7da',
            borderRadius: '4px',
            color: '#000',
            textAlign: 'center',
            minWidth: '120px'
          }}>
            <div style={{ fontSize: '32px', marginBottom: '10px' }}>📱</div>
            <div>横屏: {isLandscape ? '✅' : '❌'}</div>
          </div>
          <div style={{ 
            padding: '20px', 
            backgroundColor: isPortrait ? '#d4edda' : '#f8d7da',
            borderRadius: '4px',
            color: '#000',
            textAlign: 'center',
            minWidth: '120px'
          }}>
            <div style={{ fontSize: '32px', marginBottom: '10px' }}>📱</div>
            <div>竖屏: {isPortrait ? '✅' : '❌'}</div>
          </div>
        </div>
      </div>

      {/* 响应式布局示例 */}
      <div style={{ 
        marginBottom: '30px', 
        padding: '20px', 
        backgroundColor: isDarkMode ? '#2a2a2a' : '#f8f9fa',
        borderRadius: '8px'
      }}>
        <h3>📐 响应式布局示例</h3>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: isMobile ? '1fr' : isTablet ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)',
          gap: '15px'
        }}>
          {[1, 2, 3, 4, 5, 6].map(num => (
            <div key={num} style={{
              padding: '20px',
              backgroundColor: isDarkMode ? '#3a3a3a' : '#ffffff',
              border: '1px solid #ddd',
              borderRadius: '4px',
              textAlign: 'center',
              color: isDarkMode ? '#ffffff' : '#000000'
            }}>
              卡片 {num}
            </div>
          ))}
        </div>
        <p style={{ marginTop: '15px', fontSize: '14px', color: '#666' }}>
          布局会根据屏幕大小自动调整：移动端1列，平板2列，桌面3列
        </p>
      </div>

      <div style={{ 
        backgroundColor: isDarkMode ? '#2a2a2a' : '#f8f9fa', 
        padding: '15px', 
        borderRadius: '4px' 
      }}>
        <h4>💡 使用提示</h4>
        <ul style={{ margin: 0, paddingLeft: '20px' }}>
          <li>调整浏览器窗口大小查看响应式效果</li>
          <li>切换系统主题模式查看主题检测</li>
          <li>旋转设备（移动端）查看方向检测</li>
          <li>支持所有标准 CSS 媒体查询语法</li>
        </ul>
      </div>
    </div>
  );
}

const meta: Meta<typeof UseMediaQueryDemo> = {
  title: 'Hooks/useMediaQuery',
  component: UseMediaQueryDemo,
  parameters: {
    docs: {
      description: {
        component: `
## useMediaQuery

媒体查询 Hook，用于响应式设计和系统偏好检测。

### 特性
- 📱 **响应式检测**: 实时检测屏幕尺寸变化
- 🔄 **实时更新**: 媒体查询状态变化时自动更新
- 🎯 **标准语法**: 支持所有标准 CSS 媒体查询语法
- 🚀 **性能优化**: 使用原生 matchMedia API

### API

\`\`\`typescript
function useMediaQuery(query: string): boolean
\`\`\`

**参数:**
- \`query\`: 媒体查询字符串

**返回值:**
- 是否匹配媒体查询条件

### 使用示例

\`\`\`typescript
import { useMediaQuery } from '@hiiot/ui';

function ResponsiveComponent() {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const isDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const isLandscape = useMediaQuery('(orientation: landscape)');

  return (
    <div>
      <p>设备类型: {isMobile ? '移动端' : '桌面端'}</p>
      <p>主题偏好: {isDarkMode ? '深色' : '浅色'}</p>
      <p>屏幕方向: {isLandscape ? '横屏' : '竖屏'}</p>
    </div>
  );
}
\`\`\`

### 常见媒体查询

#### 屏幕尺寸
- \`(max-width: 768px)\` - 移动设备
- \`(min-width: 769px) and (max-width: 1024px)\` - 平板设备
- \`(min-width: 1025px)\` - 桌面设备

#### 系统偏好
- \`(prefers-color-scheme: dark)\` - 深色模式
- \`(prefers-reduced-motion: reduce)\` - 减少动画
- \`(prefers-contrast: high)\` - 高对比度

#### 设备特性
- \`(orientation: landscape)\` - 横屏
- \`(orientation: portrait)\` - 竖屏
- \`(min-resolution: 2dppx)\` - 高分辨率屏幕
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof UseMediaQueryDemo>;

export const Default: Story = {
  name: '综合示例',
};

// 断点检测示例组件
function BreakpointDetectionExample() {
  const isXS = useMediaQuery('(max-width: 575px)');
  const isSM = useMediaQuery('(min-width: 576px) and (max-width: 767px)');
  const isMD = useMediaQuery('(min-width: 768px) and (max-width: 991px)');
  const isLG = useMediaQuery('(min-width: 992px) and (max-width: 1199px)');
  const isXL = useMediaQuery('(min-width: 1200px)');

  const getCurrentBreakpoint = () => {
    if (isXS) return { name: 'XS', color: '#dc3545', desc: '超小屏幕' };
    if (isSM) return { name: 'SM', color: '#fd7e14', desc: '小屏幕' };
    if (isMD) return { name: 'MD', color: '#ffc107', desc: '中等屏幕' };
    if (isLG) return { name: 'LG', color: '#28a745', desc: '大屏幕' };
    if (isXL) return { name: 'XL', color: '#007bff', desc: '超大屏幕' };
    return { name: 'Unknown', color: '#6c757d', desc: '未知' };
  };

  const current = getCurrentBreakpoint();

  return (
    <div style={{ padding: '20px' }}>
      <h3>Bootstrap 断点检测</h3>
      <div style={{ 
        padding: '20px', 
        backgroundColor: current.color, 
        color: 'white', 
        borderRadius: '8px',
        textAlign: 'center',
        marginBottom: '20px'
      }}>
        <h2>{current.name}</h2>
        <p>{current.desc}</p>
      </div>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '10px' }}>
        {[
          { name: 'XS', active: isXS, range: '< 576px' },
          { name: 'SM', active: isSM, range: '576-767px' },
          { name: 'MD', active: isMD, range: '768-991px' },
          { name: 'LG', active: isLG, range: '992-1199px' },
          { name: 'XL', active: isXL, range: '≥ 1200px' }
        ].map(bp => (
          <div key={bp.name} style={{
            padding: '10px',
            backgroundColor: bp.active ? '#d4edda' : '#f8d7da',
            borderRadius: '4px',
            textAlign: 'center',
            color: '#000'
          }}>
            <div style={{ fontWeight: 'bold' }}>{bp.name}</div>
            <div style={{ fontSize: '12px' }}>{bp.range}</div>
            <div>{bp.active ? '✅' : '❌'}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export const BreakpointDetection: Story = {
  name: '断点检测',
  render: () => <BreakpointDetectionExample />,
  parameters: {
    docs: {
      source: {
        code: `import { useMediaQuery } from '@hiiot/ui';

function BreakpointDetectionExample() {
  const isXS = useMediaQuery('(max-width: 575px)');
  const isSM = useMediaQuery('(min-width: 576px) and (max-width: 767px)');
  const isMD = useMediaQuery('(min-width: 768px) and (max-width: 991px)');
  const isLG = useMediaQuery('(min-width: 992px) and (max-width: 1199px)');
  const isXL = useMediaQuery('(min-width: 1200px)');

  const getCurrentBreakpoint = () => {
    if (isXS) return { name: 'XS', color: '#dc3545', desc: '超小屏幕' };
    if (isSM) return { name: 'SM', color: '#fd7e14', desc: '小屏幕' };
    if (isMD) return { name: 'MD', color: '#ffc107', desc: '中等屏幕' };
    if (isLG) return { name: 'LG', color: '#28a745', desc: '大屏幕' };
    if (isXL) return { name: 'XL', color: '#007bff', desc: '超大屏幕' };
    return { name: 'Unknown', color: '#6c757d', desc: '未知' };
  };

  const current = getCurrentBreakpoint();

  return (
    <div>
      <div style={{ 
        backgroundColor: current.color, 
        color: 'white', 
        padding: '20px',
        borderRadius: '8px'
      }}>
        <h2>{current.name}</h2>
        <p>{current.desc}</p>
      </div>
      
      {/* 断点状态显示 */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '10px' }}>
        {[
          { name: 'XS', active: isXS, range: '< 576px' },
          { name: 'SM', active: isSM, range: '576-767px' },
          { name: 'MD', active: isMD, range: '768-991px' },
          { name: 'LG', active: isLG, range: '992-1199px' },
          { name: 'XL', active: isXL, range: '≥ 1200px' }
        ].map(bp => (
          <div key={bp.name} style={{
            padding: '10px',
            backgroundColor: bp.active ? '#d4edda' : '#f8d7da',
            borderRadius: '4px',
            textAlign: 'center'
          }}>
            <div>{bp.name}</div>
            <div>{bp.range}</div>
            <div>{bp.active ? '✅' : '❌'}</div>
          </div>
        ))}
      </div>
    </div>
  );
}`,
        language: 'tsx',
      },
    },
  },
};

// 系统偏好示例组件
function SystemPreferencesExample() {
  const isDark = useMediaQuery('(prefers-color-scheme: dark)');
  const reducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');
  const highContrast = useMediaQuery('(prefers-contrast: high)');

  return (
    <div style={{ 
      padding: '20px',
      backgroundColor: isDark ? '#1a1a1a' : '#ffffff',
      color: isDark ? '#ffffff' : '#000000',
      minHeight: '300px'
    }}>
      <h3>系统偏好检测</h3>
      
      <div style={{ marginBottom: '20px' }}>
        <h4>🎨 颜色主题</h4>
        <div style={{ 
          padding: '15px', 
          backgroundColor: isDark ? '#2a2a2a' : '#f8f9fa',
          borderRadius: '4px'
        }}>
          当前主题: {isDark ? '🌙 深色模式' : '☀️ 浅色模式'}
        </div>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h4>🎬 动画偏好</h4>
        <div style={{ 
          padding: '15px', 
          backgroundColor: isDark ? '#2a2a2a' : '#f8f9fa',
          borderRadius: '4px'
        }}>
          动画设置: {reducedMotion ? '🐌 减少动画' : '🚀 正常动画'}
        </div>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h4>🔍 对比度偏好</h4>
        <div style={{ 
          padding: '15px', 
          backgroundColor: isDark ? '#2a2a2a' : '#f8f9fa',
          borderRadius: '4px'
        }}>
          对比度设置: {highContrast ? '🔆 高对比度' : '👁️ 标准对比度'}
        </div>
      </div>

      <div style={{ 
        padding: '15px', 
        backgroundColor: isDark ? '#2a2a2a' : '#e9ecef',
        borderRadius: '4px',
        fontSize: '14px'
      }}>
        💡 这些设置反映了用户的系统偏好，可以用来提供更好的用户体验
      </div>
    </div>
  );
}

// 屏幕方向示例组件
function ScreenOrientationExample() {
  const isPortrait = useMediaQuery('(orientation: portrait)');
  const isLandscape = useMediaQuery('(orientation: landscape)');

  return (
    <div style={{ 
      padding: '20px',
      backgroundColor: '#f8f9fa',
      minHeight: '300px'
    }}>
      <h3>屏幕方向检测</h3>
      
      <div style={{ 
        display: 'flex', 
        gap: '20px', 
        marginBottom: '20px',
        flexDirection: isPortrait ? 'column' : 'row'
      }}>
        <div style={{ 
          padding: '20px', 
          backgroundColor: isPortrait ? '#28a745' : '#6c757d',
          color: 'white',
          borderRadius: '8px',
          textAlign: 'center',
          flex: 1
        }}>
          📱 竖屏模式
          <div style={{ fontSize: '14px', marginTop: '5px' }}>
            {isPortrait ? '✅ 当前状态' : '❌ 非当前状态'}
          </div>
        </div>
        
        <div style={{ 
          padding: '20px', 
          backgroundColor: isLandscape ? '#28a745' : '#6c757d',
          color: 'white',
          borderRadius: '8px',
          textAlign: 'center',
          flex: 1
        }}>
          🖥️ 横屏模式
          <div style={{ fontSize: '14px', marginTop: '5px' }}>
            {isLandscape ? '✅ 当前状态' : '❌ 非当前状态'}
          </div>
        </div>
      </div>

      <div style={{ 
        padding: '15px', 
        backgroundColor: '#e9ecef',
        borderRadius: '4px',
        fontSize: '14px'
      }}>
        💡 旋转设备或调整浏览器窗口大小来测试方向检测
      </div>
    </div>
  );
}

export const ScreenOrientation: Story = {
  name: '屏幕方向',
  render: () => <ScreenOrientationExample />,
  parameters: {
    docs: {
      source: {
        code: `import { useMediaQuery } from '@hiiot/ui';

function ScreenOrientationExample() {
  const isPortrait = useMediaQuery('(orientation: portrait)');
  const isLandscape = useMediaQuery('(orientation: landscape)');

  return (
    <div style={{ padding: '20px', backgroundColor: '#f8f9fa' }}>
      <h3>屏幕方向检测</h3>
      
      <div style={{ 
        display: 'flex', 
        gap: '20px',
        flexDirection: isPortrait ? 'column' : 'row'
      }}>
        <div style={{ 
          padding: '20px', 
          backgroundColor: isPortrait ? '#28a745' : '#6c757d',
          color: 'white',
          borderRadius: '8px',
          textAlign: 'center',
          flex: 1
        }}>
          📱 竖屏模式
          <div style={{ fontSize: '14px', marginTop: '5px' }}>
            {isPortrait ? '✅ 当前状态' : '❌ 非当前状态'}
          </div>
        </div>
        
        <div style={{ 
          padding: '20px', 
          backgroundColor: isLandscape ? '#28a745' : '#6c757d',
          color: 'white',
          borderRadius: '8px',
          textAlign: 'center',
          flex: 1
        }}>
          🖥️ 横屏模式
          <div style={{ fontSize: '14px', marginTop: '5px' }}>
            {isLandscape ? '✅ 当前状态' : '❌ 非当前状态'}
          </div>
        </div>
      </div>
    </div>
  );
}`,
        language: 'tsx',
      },
    },
  },
};

// 响应式布局示例组件
function ResponsiveLayoutExample() {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const isTablet = useMediaQuery('(min-width: 769px) and (max-width: 1024px)');
  const isDesktop = useMediaQuery('(min-width: 1025px)');

  const getLayoutStyle = () => {
    if (isMobile) {
      return {
        display: 'flex',
        flexDirection: 'column' as const,
        gap: '10px'
      };
    }
    if (isTablet) {
      return {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '15px'
      };
    }
    return {
      display: 'grid',
      gridTemplateColumns: '1fr 2fr 1fr',
      gap: '20px'
    };
  };

  const getCurrentDevice = () => {
    if (isMobile) return '📱 手机';
    if (isTablet) return '📱 平板';
    if (isDesktop) return '🖥️ 桌面';
    return '❓ 未知';
  };

  return (
    <div style={{ padding: '20px', backgroundColor: '#f8f9fa' }}>
      <h3>响应式布局示例</h3>
      
      <div style={{ 
        padding: '15px', 
        backgroundColor: '#007bff',
        color: 'white',
        borderRadius: '4px',
        marginBottom: '20px',
        textAlign: 'center'
      }}>
        当前设备类型: {getCurrentDevice()}
      </div>

      <div style={getLayoutStyle()}>
        <div style={{ 
          padding: '20px', 
          backgroundColor: '#28a745',
          color: 'white',
          borderRadius: '8px',
          textAlign: 'center'
        }}>
          内容区域 1
          <div style={{ fontSize: '12px', marginTop: '5px' }}>
            {isMobile ? '全宽显示' : isTablet ? '50% 宽度' : '33% 宽度'}
          </div>
        </div>
        
        <div style={{ 
          padding: '20px', 
          backgroundColor: '#dc3545',
          color: 'white',
          borderRadius: '8px',
          textAlign: 'center'
        }}>
          内容区域 2
          <div style={{ fontSize: '12px', marginTop: '5px' }}>
            {isMobile ? '全宽显示' : isTablet ? '50% 宽度' : '66% 宽度'}
          </div>
        </div>
        
        {!isMobile && (
          <div style={{ 
            padding: '20px', 
            backgroundColor: '#ffc107',
            color: '#212529',
            borderRadius: '8px',
            textAlign: 'center'
          }}>
            内容区域 3
            <div style={{ fontSize: '12px', marginTop: '5px' }}>
              {isTablet ? '隐藏在手机上' : '33% 宽度'}
            </div>
          </div>
        )}
      </div>

      <div style={{ 
        padding: '15px', 
        backgroundColor: '#e9ecef',
        borderRadius: '4px',
        fontSize: '14px',
        marginTop: '20px'
      }}>
        💡 调整浏览器窗口大小来查看不同的布局效果
      </div>
    </div>
  );
}

export const ResponsiveLayout: Story = {
  name: '响应式布局',
  render: () => <ResponsiveLayoutExample />,
  parameters: {
    docs: {
      source: {
        code: `import { useMediaQuery } from '@hiiot/ui';

function ResponsiveLayoutExample() {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const isTablet = useMediaQuery('(min-width: 769px) and (max-width: 1024px)');
  const isDesktop = useMediaQuery('(min-width: 1025px)');

  const getLayoutStyle = () => {
    if (isMobile) {
      return {
        display: 'flex',
        flexDirection: 'column' as const,
        gap: '10px'
      };
    }
    if (isTablet) {
      return {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '15px'
      };
    }
    return {
      display: 'grid',
      gridTemplateColumns: '1fr 2fr 1fr',
      gap: '20px'
    };
  };

  const getCurrentDevice = () => {
    if (isMobile) return '📱 手机';
    if (isTablet) return '📱 平板';
    if (isDesktop) return '🖥️ 桌面';
    return '❓ 未知';
  };

  return (
    <div style={{ padding: '20px', backgroundColor: '#f8f9fa' }}>
      <h3>响应式布局示例</h3>
      
      <div style={{ 
        padding: '15px', 
        backgroundColor: '#007bff',
        color: 'white',
        borderRadius: '4px',
        marginBottom: '20px',
        textAlign: 'center'
      }}>
        当前设备类型: {getCurrentDevice()}
      </div>

      <div style={getLayoutStyle()}>
        <div style={{ 
          padding: '20px', 
          backgroundColor: '#28a745',
          color: 'white',
          borderRadius: '8px',
          textAlign: 'center'
        }}>
          内容区域 1
        </div>
        
        <div style={{ 
          padding: '20px', 
          backgroundColor: '#dc3545',
          color: 'white',
          borderRadius: '8px',
          textAlign: 'center'
        }}>
          内容区域 2
        </div>
        
        {!isMobile && (
          <div style={{ 
            padding: '20px', 
            backgroundColor: '#ffc107',
            color: '#212529',
            borderRadius: '8px',
            textAlign: 'center'
          }}>
            内容区域 3
          </div>
        )}
      </div>
    </div>
  );
}`,
        language: 'tsx',
      },
    },
  },
};

export const SystemPreferences: Story = {
  name: '系统偏好',
  render: () => <SystemPreferencesExample />,
  parameters: {
    docs: {
      source: {
        code: `import { useMediaQuery } from '@hiiot/ui';

function SystemPreferencesExample() {
  const isDark = useMediaQuery('(prefers-color-scheme: dark)');
  const reducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');
  const highContrast = useMediaQuery('(prefers-contrast: high)');

  return (
    <div style={{ 
      backgroundColor: isDark ? '#1a1a1a' : '#ffffff',
      color: isDark ? '#ffffff' : '#000000',
      padding: '20px'
    }}>
      <h3>系统偏好检测</h3>
      
      <div>
        <h4>🎨 颜色主题</h4>
        <div style={{ 
          padding: '15px', 
          backgroundColor: isDark ? '#2a2a2a' : '#f8f9fa',
          borderRadius: '4px'
        }}>
          当前主题: {isDark ? '🌙 深色模式' : '☀️ 浅色模式'}
        </div>
      </div>

      <div>
        <h4>🎬 动画偏好</h4>
        <div style={{ 
          padding: '15px', 
          backgroundColor: isDark ? '#2a2a2a' : '#f8f9fa',
          borderRadius: '4px'
        }}>
          动画设置: {reducedMotion ? '🐌 减少动画' : '🚀 正常动画'}
        </div>
      </div>

      <div>
        <h4>🔍 对比度偏好</h4>
        <div style={{ 
          padding: '15px', 
          backgroundColor: isDark ? '#2a2a2a' : '#f8f9fa',
          borderRadius: '4px'
        }}>
          对比度设置: {highContrast ? '🔆 高对比度' : '👁️ 标准对比度'}
        </div>
      </div>
    </div>
  );
}`,
        language: 'tsx',
      },
    },
  },
};