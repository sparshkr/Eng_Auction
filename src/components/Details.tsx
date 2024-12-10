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
      <div className="flex w-full justify-between">
        <div>{ProductName}</div>
        <div>${BasePrice.toString()}</div>
      </div>

      <div className="absolute font-bold w-2 top-0 text-lg left-[50%]">|</div>
    </div>
  );
}
