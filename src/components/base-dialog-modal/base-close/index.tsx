/**
 * @description 请添加组件描述
 * @author Elen
 */
import React, {memo} from "react";

interface Props {
    closeModal: () => void;
}

const Index: React.FC<Props> = props => {
  const {closeModal} = props;
  return <div className="flex justify-center absolute bottom-[-53px] left-0 right-0 cursor-pointer" onClick={() => {
    closeModal()
}}>
    <svg width="40" height="40" viewBox="0 0 40 40" fill="#041820" xmlns="http://www.w3.org/2000/svg">
        <path d="M0 20C0 8.95431 8.95431 0 20 0C31.0457 0 40 8.95431 40 20C40 31.0457 31.0457 40 20 40C8.95431 40 0 31.0457 0 20Z" fill="white" fillOpacity="0.08" />
        <path d="M20 0.5C30.7696 0.5 39.5 9.23045 39.5 20C39.5 30.7696 30.7696 39.5 20 39.5C9.23045 39.5 0.5 30.7696 0.5 20C0.5 9.23045 9.23045 0.5 20 0.5Z" stroke="url(#paint0_linear_626_2577)" strokeOpacity="0.04" />
        <path d="M14.1667 14.1667L25.8334 25.8334M25.8334 14.1667L14.1667 25.8334" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
        <defs>
            <linearGradient id="paint0_linear_626_2577" x1="20" y1="0" x2="20" y2="40" gradientUnits="userSpaceOnUse">
                <stop stopColor="white" />
                <stop offset="1" stopColor="white" stopOpacity="0" />
            </linearGradient>
        </defs>
    </svg>
</div>;
};

export default memo(Index);
