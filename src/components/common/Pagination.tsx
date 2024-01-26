import React, { useState, useEffect } from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  pageLimit: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, pageLimit, onPageChange,}) => {
  const getVisiblePages = () => {
    const start = Math.max(1, currentPage - Math.floor(pageLimit / 2));
    const end = Math.min(totalPages, start + pageLimit - 1);
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

  return (
    <nav className="pagination">
      <button
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
      >
        &#60;
      </button>
      {getVisiblePages().map((pageNumber: number) => (
        <button
          key={pageNumber}
          onClick={() => onPageChange(pageNumber)}
          disabled={currentPage === pageNumber}
        >
          {pageNumber}
        </button>
      ))}
      <button
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
      >
        &#62;
      </button>
    </nav>
  );
};

export default Pagination;
