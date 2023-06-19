import React from 'react';

function Pagination({ currentPage, recipesPerPage, totalRecipes, paginate }) {
  const pageNumbers = Math.ceil(totalRecipes / recipesPerPage);
  const buttons = [];

  for (let i = 1; i <= pageNumbers; i++) {
    buttons.push(
      <button
        key={i}
        className={`page-button ${currentPage === i ? 'active' : ''}`}
        onClick={() => paginate(i)}
      >
        {i}
      </button>
    );
  }

  return (
  <div className="pagination-container">
  <div className="pagination">{buttons}</div>;
  </div>
  )
}

export default Pagination;