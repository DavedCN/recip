//Importing View

import View from "./View.js";

//icons
import icons from "url:../../img/icons.svg";

class PaginationView extends View {
  _parentEl = document.querySelector(".pagination");

  addHandlerClick(handler) {
    this._parentEl.addEventListener("click", function (e) {
      const btn = e.target.closest(".btn--inline");
      

      if (!btn) return;

      const goToPage = +btn.dataset.goto;

      handler(goToPage);
    });
  }

  _generateMarkup() {
    const curPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );

    // Page 1 and there are other pages

    if (curPage === 1 && numPages > 1) {
      return this._generateMarkupButton(curPage, "next");
    }

    //On the last page
    if (curPage === numPages && numPages > 1) {
      return this._generateMarkupButton(curPage, "prev");
    }

    //On some other page

    if (curPage < numPages) {
      const markup = [
        this._generateMarkupButton(curPage, "next"),
        this._generateMarkupButton(curPage, "prev"),
      ];
      return markup;
    }

    //Page 1 and there are no other pages

    return ``;
  }

  _generateMarkupButton(curPage, direction) {
    return ` 
      <button data-goto="${
        direction === "next" ? curPage + 1 : curPage - 1
      }" class="btn--inline pagination__btn--${direction}">
      <span>Page ${direction === "next" ? curPage + 1 : curPage - 1}</span>
      <svg class="search__icon">
        <use href=${icons}#icon-arrow-right"></use>
      </svg>
    </button>
    `;
  }
}

export default new PaginationView();
