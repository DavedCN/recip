import View from "./View.js";
import PreviewView from "./previewView.js";

import icons from "url:../../img/icons.svg";

class ResultsView extends View {
  _parentEl = document.querySelector(".results");

  _errorMessage = "No recipes found for query. Please try again";
  _message = "Search for a recipe of your choice";

  _generateMarkup() {
    return this._data
      .map(result => PreviewView._generateMarkup(result, false))
      .join("");
  }
}
export default new ResultsView();
