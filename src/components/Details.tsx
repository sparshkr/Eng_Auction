import React from "react";

export default function Details({
  ProductName,
  BasePrice,
}: {
  ProductName: string;
  BasePrice: Number;
}) {
  return (
    <div className="relative w-full">
      <div className="flex w-full justify-between md:text-[15px] md:mb-1 msx:text-xs">
        <div className="mu:text-lg">{ProductName}</div>
        <div className="mu:text-lg mu:relative mu:right-2">
          ${BasePrice.toString()}.00
        </div>
      </div>

      <div className="absolute font-bold w-2 top-0 text-lg left-[50%]">|</div>
    </div>
  );
}
