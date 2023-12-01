import * as model from "./model.js";

// // import icons from '../img/icons.svg'; //Parcel 1
// //Parcel 2

import "core-js/stable";
import "regenerator-runtime/runtime";
//The  two above are for old browsers and polyfilling

import RecipeView from "./Views/recipeView.js";
import SearchView from "./Views/searchView.js";
import ResultsView from "./Views/resultsView.js";
import PaginationView from "./Views/paginationView.js";
import BookmarksView from "./Views/bookmarksView.js";
import AddRecipeView from "./Views/addRecipeView.js";
import { async } from "regenerator-runtime";
import { MODAL_CLOSE_SEC } from "../config";

///////////////////////////////////////

if (module.hot) {
  module.hot.accept();
}

const controlRecipe = async function () {
  try {
    const id = window.location.hash.slice(1);

    if (!id) return;

    RecipeView.renderSpinner();

    //0. Update results of marked recipe chosen
    ResultsView.update(model.getSearchResultsPage());

    //1. Loading recipe

    await model.loadRecipe(id);

    let { recipe } = model.state;

    //2. Show Recipe Slide on Mobile
    RecipeView.slideView();

    //3. rendering recipe

    RecipeView.render(recipe);
  } catch (err) {
    RecipeView.renderError();
  }
};

const controlSearchResults = async function () {
  try {
    ResultsView.renderSpinner();

    // Show Recipe Slide on Mobile
    SearchView.slideView();

    //1 Get search query
    const query = SearchView.getQuery();

    if (!query) return;

    //2 Load search results
    await model.loadSearchResults(query);

    //3 Render results

    ResultsView.render(model.getSearchResultsPage());

    //4 Render initial pagination buttons

    PaginationView.render(model.state.search);
  } catch (err) {}
};

const controlPagination = function (goToPage) {
  //1 Render new results

  ResultsView.render(model.getSearchResultsPage(goToPage));

  //4 Render new pagination buttons

  PaginationView.render(model.state.search);
};

const controlServings = function (newServings) {
  // 1 Update the Recipe Servings in state
  model.updateServings(newServings);

  //2 Update the recipe view
  RecipeView.update(model.state.recipe);
};

const controlAddBookmark = function () {
  //1. Add or Remove Bookmark
  if (model.state.recipe.bookmarked === false) {
    model.addBookmark(model.state.recipe);
  } else {
    model.removeBookmark(model.state.recipe.id);
  }
  // //
  // RecipeView.slideView();

  //2. Update recipe View
  RecipeView.update(model.state.recipe);

  //3. Render Bookmarks
  BookmarksView.render(model.state.bookmarks);
};

const controlBookmarks = function () {
  BookmarksView.render(model.state.bookmarks);
};

const controlAddRecipe = async function (newRecipe) {
  //Show loading spinner
  AddRecipeView.renderSpinner();
  try {
    //Upload new recipe data

    await model.uploadRecipe(newRecipe);

    //Render recipe
    RecipeView.render(model.state.recipe);

    //Display success message
    AddRecipeView.renderMessage();

    //Render bookmark view
    BookmarksView.render(model.state.bookmarks);

    // Change ID in the URL

    window.history.pushState(null, "", `#${model.state.recipe.id}`);

    //Close form Window
    setTimeout(function () {
      addrecipeView.toggleWindow();
    }, MODAL_CLOSE_SEC * 1000);
  } catch (err) {
    addrecipeView.renderError(err.message);
  }

  //Render New Form
};

const init = function () {
  ResultsView.renderMessage();
  RecipeView.addHandlerRender(controlRecipe);
  RecipeView.addHandlerUpdateServings(controlServings);
  RecipeView.addHandlerAddBookmark(controlAddBookmark);
  SearchView.addHandlerSearch(controlSearchResults);
  PaginationView.addHandlerClick(controlPagination);
  BookmarksView.addHandlerRender(controlBookmarks);
  AddRecipeView.addHandlerUpload(controlAddRecipe);
};

init();
