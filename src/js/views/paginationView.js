import View from './View.js';
import icons from '../../img/icons.svg';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;

      const goToPage = +btn.dataset.goto;
      handler(goToPage);
    });
  }

  _generateMarkup() {
    const currentPage = this._data.page;

    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    console.log(numPages);

    const prevButton = function () {
      return `
      <button data-goto="${
        currentPage - 1
      }" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${currentPage - 1}</span>
      </button>
      `;
    };

    const nextButton = function () {
      return `
      <button data-goto="${
        currentPage + 1
      }" class="btn--inline pagination__btn--next">
          <span>Page ${currentPage + 1} / ${numPages}</span>
          <svg class="search__icon">
            <use href="${icons}}#icon-arrow-right"></use>
          </svg>
      </button>
      `;
    };
    // Page 01, there are others pages
    if (currentPage === 1 && numPages > 1) {
      return nextButton();
    }
    // Last page
    if (currentPage === numPages && numPages > 1) {
      return prevButton();
    }
    // Other page
    if (currentPage < numPages) {
      return prevButton() + nextButton();
    }
    // Page 01, there are NO others pages
    return '';
  }
}

export default new PaginationView();
