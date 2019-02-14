import React from "react";
export default function Pagination({
  previous,
  next,
  pagination: { totalRecords, offset, limit }
}) {
  const isPrevBtnDisabled = offset === 0;
  const isNextBtnDisabled = !(offset + limit < totalRecords);
  const prevBtnCls = `btn pagination-btn ${
    isPrevBtnDisabled ? "disabled" : ""
  }`;
  const nextBtnCls = `btn pagination-btn ${
    isNextBtnDisabled ? "disabled" : ""
  }`;
  return (
    <div className="footer">
      <button
        className={prevBtnCls}
        onClick={() => !isPrevBtnDisabled && previous()}
      >
        {"<"}
      </button>
      <button
        className={nextBtnCls}
        onClick={() => !isNextBtnDisabled && next()}
      >
        {">"}
      </button>
    </div>
  );
}
