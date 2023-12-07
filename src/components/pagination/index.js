import React from "react";
import "./style.css";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  // Определение диапазона страниц для отображения
  const range = (start, end) => {
    return Array.from({ length: end - start + 1 }, (_, index) => start + index);
  };
  const visiblePages = () => {
    // Максимальное количество отображаемых страниц
    let maxVisiblePages = 5;
    currentPage < 3 ? maxVisiblePages = 3 : maxVisiblePages = 4
    if (totalPages <= maxVisiblePages) {
      return range(1, totalPages);
    }

    let startPage = Math.max(1, currentPage - 1);
    let endPage = Math.min(totalPages, currentPage + 1);

    if (currentPage <= 3) {
      endPage = maxVisiblePages;
    } else if (currentPage >= totalPages - 2) {
      startPage = totalPages - maxVisiblePages + 1;
    }

    return range(startPage, endPage);
  };
  return (
    <ul className="pagination">
      {/* Кнопка для первой страницы */}
      {currentPage > 2 && (
        <li>
          <button className="pagination-button" onClick={() => onPageChange(1)}>
            1
          </button>
        </li>
      )}
      {/* Кнопки для соседних страниц слева от текущей страницы */}
      {currentPage > 3 && <li>...</li>}
      {visiblePages().map((page) => (
        <li key={page}>
          <button
            onClick={() => onPageChange(page)}
            className={`pagination-button ${
              currentPage === page ? "active" : ""
            }`}
          >
            {page}
          </button>
        </li>
      ))}
      {/* Кнопки для соседних страниц справа от текущей страницы */}
      {currentPage < totalPages - 2 && <li>...</li>}

      {/* Кнопка для последней страницы */}
      {currentPage < totalPages - 1 && (
        <li>
          <button
            className="pagination-button"
            onClick={() => onPageChange(totalPages)}
          >
            {totalPages}
          </button>
        </li>
      )}
    </ul>
  );
};

Pagination.propTypes = {
  currentPage: PropTypes.number,
  totalPages: PropTypes.number,
  onPageChange: PropTypes.func,
};

Pagination.defaultProps = {
  onPageChange: () => {},
}

export default Pagination;