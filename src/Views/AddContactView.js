// add the contact to view 6.
class AddContactView {
  _modal = document.querySelector(".add_contact_modal");
  _formContainer = document.querySelector(".add_contact_form");
  _inputName = this._formContainer.querySelector(".name_input");
  _inputPhone = this._formContainer.querySelector(".phone_input");
  _inputEmail = this._formContainer.querySelector(".email_input");
  _addContactBtn = document.querySelector(".add_contact_btn");

  // making the toggle value  to overlay or hidden 11.
  constructor() {
    this._addContactBtn.addEventListener("click", this.toggleModal.bind(this));
    this._formContainer
      .querySelector(".close")
      .addEventListener("click", this.toggleModal.bind(this));
  }
  toggleModal(event) {
    event.preventDefault();
    console.log(this._modal);
    this._modal.classList.toggle("hidden");
  }

  // we here creating the all handler function must be a function 7.
  addContactSubmitListner(handler) {
    if (typeof handler !== "function")
      throw new TypeError("handler must be a function");
    this._formContainer.addEventListener("submit", handler.bind(this));
  }

// clearing the form after user saved the input 10.
  clearForm() {
    this._inputName.value = "";
    this._inputEmail.value = "";
    this._inputPhone.value = "";
  }

  // getting the value of name,phone,email 8.
  get Name() {
    return this._inputName.value;
  }
  get Phone() {
    return this._inputPhone.value;
  }
  get Email() {
    return this._inputEmail.value;
  }
}

// exporting it 7.
export default new AddContactView();
