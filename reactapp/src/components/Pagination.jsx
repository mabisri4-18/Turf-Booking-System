import React from "react";
import { Pagination as BPagination } from "react-bootstrap";

/**
 * currentPage: 1-based
 * totalPages: integer
 * onPageChange: (pageNumber) => void
 */
export default function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  const visible = [];
  const start = Math.max(1, currentPage - 2);
  const end = Math.min(totalPages, currentPage + 2);

  for (let i = start; i <= end; i++) visible.push(i);

  return (
    <BPagination>
      <BPagination.Prev disabled={currentPage === 1} onClick={() => onPageChange(currentPage - 1)} />
      {start > 1 && <BPagination.Item onClick={() => onPageChange(1)}>1</BPagination.Item>}
      {start > 2 && <BPagination.Ellipsis disabled />}
      {visible.map((p) => (
        <BPagination.Item key={p} active={p === currentPage} onClick={() => onPageChange(p)}>
          {p}
        </BPagination.Item>
      ))}
      {end < totalPages - 1 && <BPagination.Ellipsis disabled />}
      {end < totalPages && <BPagination.Item onClick={() => onPageChange(totalPages)}>{totalPages}</BPagination.Item>}
      <BPagination.Next disabled={currentPage === totalPages} onClick={() => onPageChange(currentPage + 1)} />
    </BPagination>
  );
}
