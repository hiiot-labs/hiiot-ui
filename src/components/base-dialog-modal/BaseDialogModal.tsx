/**
 * @description 请添加组件描述
 * @author Elen
 */
"use client";
import { useState, useRef, useEffect, forwardRef, useImperativeHandle } from 'react';

import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import { CloseIcon } from "@/components/svg-icon";
import { generateId } from "@/utils/index";
import BaseClose from "./base-close";


export type ModalRefType = { open: () => void, close: () => void }

export type DialogModalProps = {
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
    bgUrl?: string;
    externalClose?: boolean
}
const ScrollDialog = forwardRef(function ScrollDialog(props: DialogModalProps, ref) {
    const { id = "scroll-dialog-title", title = "", className = "", closeIcon = true, disableBackdropClick = false, bgUrl = "", externalClose = false } = props;
    const [open, setOpen] = useState(false)
    const modalRef = useRef(null);
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        if (disableBackdropClick) return;
        setOpen(false);
    };

    const descriptionElementRef = useRef<HTMLElement>(null);
    useEffect(() => {
        if (open) {
            const { current: descriptionElement } = descriptionElementRef;
            if (descriptionElement !== null) {
                descriptionElement.focus();
            }
        }
    }, [open]);

    useImperativeHandle(ref, () => ({
        open: () => {
            setOpen(true);
        },
        close: () => {
            setOpen(false);
        },
    }), []);


    const handleCloseDialog = () => {
        setOpen(false);
    }

    const idLabel = `${id}-${generateId()}`;

    return (
        <>

            {
                props.buttonProps && <div onClick={handleClickOpen}>
                    {props.buttonProps}
                </div>
            }
            <Dialog
                ref={modalRef}
                open={open}
                onClose={handleClose}
                className={`${className} relative z-10 focus:outline-none`}

            >
                <div className="fixed inset-0 z-10 w-screen bg-[rgba(0,0,0,0.8)] overflow-y-auto">

                    <div className="flex flex-col mb-[100px] min-h-full items-center justify-center p-4">
                        {
                            Object.prototype.toString.call(title) === "[object String]" ? <DialogTitle id={idLabel}>
                                <div className="text-center">{title}</div>
                            </DialogTitle> : title
                        }
                        <DialogPanel className={`max-w-lg bg-[#1A211F] w-[95%] ${bgUrl ? "bg-[url('/home/modal-bg.png')]" : ''} rounded-[16px] bg-center bg-no-repeat bg-cover p-[24px] relative`}>

                            {
                                closeIcon ? (
                                  <CloseIcon width={24} height={24} className="absolute top-[24px] right-[24px] cursor-pointer  z-50" onClick={handleCloseDialog}  color="#FFFFFF99"/>
                                ) : null
                            }
                            {
                                props.children
                            }
                            {
                                externalClose && <BaseClose closeModal={handleCloseDialog} />
                            }


                        </DialogPanel>
                    </div>
                </div>

            </Dialog>
        </>
    );
});

ScrollDialog.displayName = 'BaseDialogModal';

export default ScrollDialog;
