

import {
    useState,
    useRef,
    forwardRef,
    useImperativeHandle,
    Fragment
} from "react";
import { Dialog, DialogPanel, DialogTitle, Transition } from "@headlessui/react";
import { CloseIcon } from "@/components/svg-icon";
import { generateId } from "@/utils/index";
import style from "./index.module.scss";

export type DrawerRefType = { open: () => void; close: () => void };

export type DrawerModalProps = {
    id?: string;
    buttonProps?: React.ReactNode;
    children?: React.ReactNode;
    title?: any;
    className?: string;
    closeIcon?: boolean;
    width?: string | number;
    height?: string | number;
    minWidth?: string | number;
    minHeight?: string | number;
    disableBackdropClick?: boolean;
    placement?: "left" | "right" | "bottom" | "top";
};

const Drawer = forwardRef(function Drawer(props: DrawerModalProps, ref) {
    const {
        id = "drawer-title",
        title = "",
        className = "",
        closeIcon = true,
        disableBackdropClick = false,
        placement = "right",
        width = "400px",
        height = "60vh"
    } = props;

    const [open, setOpen] = useState(false);
    const modalRef = useRef(null);

    const handleClickOpen = () => setOpen(true);
    const handleClose = () => {
        if (disableBackdropClick) return;
        setOpen(false);
    };

    const handleCloseDrawer = () => {
        setOpen(false);
    };


    const idLabel = `${id}-${generateId()}`;

    useImperativeHandle(
        ref,
        () => ({
            open: () => setOpen(true),
            close: () => setOpen(false)
        }),
        []
    );

    const getPositionClass = () => {
        switch (placement) {
            case "left":
                return "items-start";
            case "right":
                return "items-end";
            case "bottom":
                return "items-end justify-center";
            case "top":
                return "items-start justify-center";
            default:
                return "items-end";
        }
    };

    const getSlideIn = () => {
        switch (placement) {
            case "left":
            case "right":
                return "translate-x-0";
            case "bottom":
            case "top":
                return "translate-y-0";
            default:
                return "translate-x-0";
        }
    };

    const getSlideOut = () => {
        switch (placement) {
            case "left":
                return "-translate-x-full";
            case "right":
                return "translate-x-full";
            case "bottom":
                return "translate-y-full";
            case "top":
                return "-translate-y-full";
            default:
                return "translate-x-full";
        }
    };

    const isVertical = placement === "bottom" || placement === "top";

    return (
        <>
            {props.buttonProps && (
                <div onClick={handleClickOpen}>{props.buttonProps}</div>
            )}
            <Transition show={open} as={Fragment}>
                <Dialog
                    ref={modalRef}
                    onClose={handleClose}
                    className={`relative z-[9999] ${className}`}
                >
                    {/* 背景遮罩 */}
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-[rgba(0,0,0,0.6)]" />
                    </Transition.Child>

                    {/* Drawer 容器 */}
                    <div className={`fixed inset-0 flex ${getPositionClass()}`}>
                        <Transition.Child
                            as={Fragment}
                            enter="transform transition ease-in-out duration-300"
                            enterFrom={getSlideOut()}
                            enterTo={getSlideIn()}
                            leave="transform transition ease-in-out duration-200"
                            leaveFrom={getSlideIn()}
                            leaveTo={getSlideOut()}
                        >
                            <DialogPanel
                                className={`${style["app-bg"]} ${className} shadow-xl relative w-full`}
                                style={{
                                    width: isVertical
                                        ? "100%"
                                        : typeof width === "number"
                                            ? `${width}px`
                                            : width,
                                    height: isVertical
                                        ? typeof height === "number"
                                            ? `${height}px`
                                            : height
                                        : "100vh",
                                    borderTopLeftRadius: placement === "bottom" ? "20px" : undefined,
                                    borderTopRightRadius: placement === "bottom" ? "20px" : undefined,
                                    borderBottomLeftRadius: placement === "top" ? "20px" : undefined,
                                    borderBottomRightRadius: placement === "top" ? "20px" : undefined
                                }}
                            >
                                {/* Title */}
                                {typeof title === "string" ? (
                                    <DialogTitle id={idLabel}>
                                        <div className="text-[20px] text-center font-semibold pb-[8px] text-[var(--agri-text-color)]">
                                            {title}
                                        </div>
                                    </DialogTitle>
                                ) : (
                                    title
                                )}

                                {/* Close Icon */}
                                {closeIcon && (
                                    <CloseIcon
                                        width={20}
                                        height={20}
                                        className="absolute top-4 right-4 z-[100] cursor-pointer"
                                        onClick={handleCloseDrawer}
                                    />
                                )}

                                {/* Content */}
                                <div className="overflow-y-auto h-full text-[var(--agri-text-color)]">{props.children}</div>
                            </DialogPanel>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition>
        </>
    );
});

Drawer.displayName = 'BaseDrawerModal';

export default Drawer;
