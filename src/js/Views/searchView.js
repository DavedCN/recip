class SearchView {
  #parentEl = document.querySelector(".search");
  _slideView = document.querySelector(".search-results");
  _recipeSlideView = document.querySelector(".recipe");
  _header = document.querySelector(".header");

  getQuery() {
    const query = this.#parentEl.querySelector(".search__field ").value;
    this.#clearInput();
    return query;
  }

  #clearInput() {
    this.#parentEl.querySelector(".search__field ").value = "";
  }

  addHandlerSearch(handler) {
    this.#parentEl.addEventListener("submit", function (e) {
      e.preventDefault();
      handler();
    });
  }

  slideView() {
    if (window.matchMedia("(max-width: 600px)").matches) {
      this._slideView.classList.remove("slideView");
      this._recipeSlideView.style.display = "none";
      this._header.style.gridArea = "head";
    }
  }
}

export default new SearchView();
