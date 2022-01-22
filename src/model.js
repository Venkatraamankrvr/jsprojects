// it contains datastructure for person details...
export let state = {
  isSearching: false,
};
//  fetching contact person details 1.
export class ContactPerson {
  constructor(name, phone, email) {
    this.name = name;
    this.phone = phone;
    this.email = email;
    // for getting the unique id number for each person,create it.
    this.id = `${name}-${phone}-${Math.random().toFixed(2)}`;
  }

  // saving the list of contacts 3.
  saveContactInLS() {
    const contact = {
      name: this.name,
      phone: this.phone,
      email: this.email,
      id: this.id,
    };
    // getting the conctacts from ls 4.
    let list = JSON.parse(localStorage.getItem("contacts") || "[]");
    list.push(contact);
    localStorage.setItem("contacts", JSON.stringify(list));
  }
}
