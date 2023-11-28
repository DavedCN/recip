import View from "./View.js";

import icons from "url:../../img/icons.svg";
import previewView from "./previewView.js";

class BookmarksView extends View {
  _parentEl = document.querySelector(".bookmarks__list");

  _errorMessage = "No bookmarks yet. Bookmark a recipe first ";
  _message = "";

  _generateMarkup() {
    return this._data.map(this._generateMarkupPreview).join("");
  }

  addHandlerRender(handler) {
    window.addEventListener("load", handler);
  }

  
  _generateMarkupPreview(result) {
    const id = window.location.hash.slice(1);
    return previewView._generateMarkup(result, false);
  }
}

export default new BookmarksView();
