import React from "react";

export default function Details({
  ProductName,
  BasePrice,
}: {
  ProductName: string;
  BasePrice: Number;
}) {
  return (
    <div className="flex w-full justify-between">
      <div>{ProductName}</div>
      <div>${BasePrice.toString()}</div>
    </div>
  );
}
