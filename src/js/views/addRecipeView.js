import View from './View.js';
import { state } from '../model.js';

export class AddRecipeView extends View {
  _parentElement = document.querySelector('.upload');
  _overlay = document.querySelector('.overlay');
  _recipeWindow = document.querySelector('.add-recipe-window');
  _btnOpen = document.querySelector('.nav__btn--add-recipe');
  _btnClose = document.querySelector('.btn--close-modal');
  _btnUpload = document.querySelector('.upload__btn');
  _successMessage = 'Recipe was successfully uploaded :)';

  constructor() {
    super();
    this._addHandlerShowWindow();
    this._addHandlerCloseWindow();
  }

  toggleWindow() {
    this._recipeWindow.classList.toggle('hidden');
    this._overlay.classList.toggle('hidden');

    if (!this._recipeWindow.classList.contains('hidden'))
      this._parentElement = document.querySelector('.upload');
  }

  _addHandlerShowWindow() {
    this._btnOpen.addEventListener('click', this.toggleWindow.bind(this));
  }

  _addHandlerCloseWindow() {
    this._btnClose.addEventListener('click', this.toggleWindow.bind(this));
    this._overlay.addEventListener('click', this.toggleWindow.bind(this));
  }

  addHandlerUpload(handler) {
    this._parentElement.addEventListener('submit', function (e) {
      e.preventDefault();

      const data = [...new FormData(this)];
      const objectData = Object.fromEntries(data);
      handler(objectData);
    });
  }
  _generateMarkup() {}
}

export default new AddRecipeView();
