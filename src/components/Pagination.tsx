import React from 'react';

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
        pageNumbers.push(<span key="ellipsis-start">...</span>);
      }
    }

    for (let i = start; i < end; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => handlePageSelect(i)}
          style={{
            margin: '0 2px',
            padding: '5px 10px',
            background: i === pageNumber ? '#007bff' : '#fff',
            color: i === pageNumber ? '#fff' : '#000',
            border: '1px solid #ccc',
            cursor: 'pointer',
          }}
        >
          {i + 1}
        </button>
      );
    }

    if (end < totalPages) {
      if (end < totalPages - 1) {
        pageNumbers.push(<span key="ellipsis-end">...</span>);
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
    <div style={{ display: 'flex', alignItems: 'center', marginTop: '20px' }}>
      <button
        onClick={handlePrevious}
        disabled={pageNumber === 0}
        style={{ marginRight: '10px' }}
      >
        Previous
      </button>
      {renderPageNumbers()}
      <button
        onClick={handleNext}
        disabled={pageNumber === totalPages - 1}
        style={{ marginLeft: '10px' }}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
