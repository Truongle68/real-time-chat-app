import React from "react";
import { formatMessageDate } from "../../lib/utils";

const MessageTooltip = ({content}) => {
  return (
    <div
      className="whitespace-nowrap z-50 bg-gray-900/90 text-white p-2 rounded-[14px] text-[13px]"
    >
      {formatMessageDate(content)}  
    </div>
  );
};

export default MessageTooltip;
