
import React, { memo, useState, useEffect } from "react";
import { Transition } from "@headlessui/react";
import CountUp from "react-countup";

export interface AniCountProps {
    /** 目标数值 */
    end: number;
    /** 起始数值，默认为 0 */
    start?: number;
    /** 动画持续时间（秒），默认为 2 */
    duration?: number;
    /** 小数位数，默认为 0 */
    decimals?: number;
    /** 数字分隔符，默认为 "," */
    separator?: string;
    /** 小数点符号，默认为 "." */
    decimal?: string;
    /** 前缀 */
    prefix?: string;
    /** 后缀 */
    suffix?: string;
    /** 是否启用缓动动画，默认为 true */
    useEasing?: boolean;
    /** 自定义样式类名 */
    className?: string;
    /** 是否自动开始动画，默认为 true */
    autoStart?: boolean;
    /** 动画完成回调 */
    onEnd?: () => void;
    /** 动画开始回调 */
    onStart?: () => void;
}

const Index: React.FC<AniCountProps> = props => {
    const {
        end,
        start = 0,
        duration = 2,
        decimals = 0,
        separator = ",",
        decimal = ".",
        prefix = "",
        suffix = "",
        useEasing = true,
        className = "",
        autoStart = true,
        onEnd,
        onStart
    } = props;

    const [isVisible, setIsVisible] = useState(autoStart);
    const [shouldStart, setShouldStart] = useState(autoStart);

    useEffect(() => {
        if (autoStart) {
            // 延迟一点时间让 Transition 组件准备好
            const timer = setTimeout(() => {
                setIsVisible(true);
            }, 50);
            return () => clearTimeout(timer);
        }
    }, [autoStart]);

    const handleStart = () => {
        if (!autoStart) {
            setIsVisible(true);
            setShouldStart(true);
        }
        onStart?.();
    };

    const handleEnd = () => {
        onEnd?.();
    };

    useEffect(() => {
        if (shouldStart) {
            handleStart();
        }
    }, [shouldStart]);

    return (
        <div className={`inline-block ${className}`}>
            <Transition
                show={isVisible}
                enter="transition-opacity duration-300 ease-out"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-opacity duration-200 ease-in"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
            >
                <div className="font-mono font-bold tabular-nums min-w-0">
                    <CountUp
                        start={start}
                        end={end}
                        duration={duration}
                        decimals={decimals}
                        separator={separator}
                        decimal={decimal}
                        prefix={prefix}
                        suffix={suffix}
                        useEasing={useEasing}
                        onEnd={handleEnd}
                    />
                </div>
            </Transition>
        </div>
    );
};
Index.displayName = 'BaseAniCount';

export default memo(Index);
