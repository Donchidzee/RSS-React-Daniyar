import React from 'react';
import './Pagination.css';

interface PaginationProps {
  pageNumber: number;
  totalPages: number;
  onPageChange: (pageNumber: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  pageNumber,
  totalPages,
  onPageChange,
}) => {
  const handlePrevious = () => {
    if (pageNumber > 0) {
      onPageChange(pageNumber - 1);
    }
  };

  const handleNext = () => {
    if (pageNumber < totalPages - 1) {
      onPageChange(pageNumber + 1);
    }
  };

  const handlePageSelect = (page: number) => {
    if (page !== pageNumber) {
      onPageChange(page);
    }
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const maxVisibleButtons = 5;
    const start = Math.max(0, pageNumber - Math.floor(maxVisibleButtons / 2));
    const end = Math.min(totalPages, start + maxVisibleButtons);

    if (start > 0) {
      pageNumbers.push(
        <button key={0} onClick={() => handlePageSelect(0)}>
          1
        </button>
      );
      if (start > 1) {
        pageNumbers.push(
          <span key="ellipsis-start" className="ellipsis">
            ...
          </span>
        );
      }
    }

    for (let i = start; i < end; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => handlePageSelect(i)}
          style={{
            background: i === pageNumber ? '#5567f0' : '#5567f020',
            color: i === pageNumber ? '#fff' : '#fff',
          }}
          className="pagination__button"
        >
          {i + 1}
        </button>
      );
    }

    if (end < totalPages) {
      if (end < totalPages - 1) {
        pageNumbers.push(
          <span key="ellipsis-end" className="ellipsis">
            ...
          </span>
        );
      }
      pageNumbers.push(
        <button
          key={totalPages - 1}
          onClick={() => handlePageSelect(totalPages - 1)}
        >
          {totalPages}
        </button>
      );
    }

    return pageNumbers;
  };

  return (
    <div className="pagination">
      <button
        onClick={handlePrevious}
        disabled={pageNumber === 0}
        className="pagination__first"
      >
        Previous
      </button>
      {renderPageNumbers()}
      <button
        onClick={handleNext}
        disabled={pageNumber === totalPages - 1}
        className="pagination__last"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
