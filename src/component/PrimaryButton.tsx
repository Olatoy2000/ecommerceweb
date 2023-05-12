import React from "react";

function PrimaryButton(props: { [x: string]: any; text: any; }) {
    const { text, ...rest } = props;
    return (
        <button
            className="py-2 px-4 font-medium shadow-md rounded-lg text-white bg-[#3851DD]"
            {...rest}>
            <span className=" text-hrPortal-foundation-xds-eneutral-2">{text}</span>
        </button>
    );
}

export default PrimaryButton;