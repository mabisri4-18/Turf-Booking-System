import React from 'react';

const Pagination = ({ currentPage, totalPages, setPage }) => {
  return (
    <div className="flex justify-center mt-4">
      <button
        disabled={currentPage === 0}
        onClick={() => setPage(currentPage - 1)}
        className="bg-green-600 text-white px-3 py-1 mx-1 rounded disabled:opacity-50 hover:bg-green-700"
      >
        Prev
      </button>
      <span className="px-3 py-1">{currentPage + 1} / {totalPages}</span>
      <button
        disabled={currentPage === totalPages - 1}
        onClick={() => setPage(currentPage + 1)}
        className="bg-green-600 text-white px-3 py-1 mx-1 rounded disabled:opacity-50 hover:bg-green-700"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
