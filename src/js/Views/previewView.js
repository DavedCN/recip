import View from "./View.js";
import icons from "url:../../img/icons.svg"; // Parcel 2

class PreviewView extends View {
  _parentElement = "";

  _generateMarkup(data) {
    const id = window.location.hash.slice(1);

    return `
    <li class="preview">
      <a class="preview__link ${
        data.id === id ? "preview__link--active" : ""
      }" href="#${data.id}">
        <figure class="preview__fig">
          <img src="${data.image}" alt="${data.title}" />
        </figure>
        <div class="preview_data">
          <h4 class="preview__title">${data.title}</h4>
          <p class="preview__publisher">${data.publisher}</p>
         
        </div>
        <div class="recipe__user-generated ${data.key ? "" : "hidden"}">
        <svg>

        <use href="${icons}..svg#icon-user"></use>  
  
       </svg>
       </div>
      </a>
    </li>
  `;
  }
}

export default new PreviewView();
