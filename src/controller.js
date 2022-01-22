import { ContactPerson, state } from "./model";
// importing addcontact view 9.
import AddContactView from "./Views/AddContactView";
import ContactContainerView from "./Views/ContactContainerView";
import searchView from "./Views/searchView";

const getContactsFromLS = () => {
  return JSON.parse(localStorage.getItem("contacts") || "[]");
};

// to delete the contact
const controlContactDelete = (id) => {
  let list = getContactsFromLS();
  if (Array.isArray(list)) {
    list = list.filter((contact) => {
      if (contact.id === id) return false;
      else return true;
    });
    ContactContainerView.render(list);
    if(state.isSearching) handleSearchClear();
    list = JSON.stringify(list);
    localStorage.setItem("contacts", list);
  }
};

const controlAddContact = (event) => {
  event.preventDefault();
  const { Name, Email, Phone } = AddContactView;

  // making an new contact 2.
  const newContact = new ContactPerson(Name, Phone, Email);
  console.log("saving", newContact);
  // saving the new contact 5.
  newContact.saveContactInLS();
  AddContactView.clearForm();
  ContactContainerView.pushContactIntoContainer(newContact);
};

const handleSearch = (event) => {
  state.isSearching = true;
  event.preventDefault();
  const { query } = searchView;
  location.hash = `#q=${query}`;
};

const search = (query) => {
  const list = getContactsFromLS();
  let results = [];
  if (Array.isArray(list)) {
    list.forEach((contact) => {
      if (
        contact.name.includes(query) ||
        contact.phone.toString().includes(query) ||
        contact.email.includes(query)
      ) {
        results.push(contact);
      }
    });
  }
  return results;
};

const controlHashChange = () => {
  const query = location.hash.split("=")[1];
  console.log("query is ", query);
  const results = search(query);
  if (typeof query !== "undefined" && query.length > 0)
    ContactContainerView.render(results);
  else ContactContainerView.render(getContactsFromLS());
};

const handleSearchClear = (e) => {
  state.isSearching = false;
  if(e)e.preventDefault();
  searchView.toggleButtons();
  searchView.clearForm();
  location.hash = "";
};

const init = () => {
  AddContactView.addContactSubmitListner(controlAddContact);
  ContactContainerView.addDeleteListner(controlContactDelete);
  ContactContainerView.render(getContactsFromLS());
  searchView.addSubmitEvent(handleSearch);
  searchView.addHandleClear(handleSearchClear);
  window.onhashchange = controlHashChange;
};

init();
