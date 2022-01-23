// intializing the state
class State {
  state = {
    loading: false,
    number: "random",
    type: "math",
  };
  // updating the state
  updateState(props) {
    this.state = {
      ...this.state,
      ...props,
    };
  }
}
// for new state
const state = new State();

// for dom object of variables
const DOM = {
  okBtn: document.querySelector(".okBtn"),
  randomBtn: document.querySelector(".randomBtn"),
  typeSelector: document.querySelector(".type"),
  number: document.querySelector(".number"),
  factbox: document.querySelector(".factbox"),
};

// getting the input from user
DOM.number.addEventListener("input", (e) => {
  state.updateState({
    number: e.target.value,
  });
  console.log(state.state);
});

// get the type of output from user
DOM.typeSelector.addEventListener("change", (e) => {
  state.updateState({
    type: e.target.value,
  });
  console.log(state.state);
});

// event for oky btn
DOM.okBtn.addEventListener("click", () => {
  state.updateState({ loading: true });
  console.log("loading..");
  showSpinner();
  getFact(state.state.number, state.state.type)
    .then(fact => {
      console.log(fact);
      state.updateState({ loading: true });
    })
    .catch(err => {
      console.error(err);
    })
});

// event for type btn
DOM.randomBtn.addEventListener("click", () => {
  state.updateState({ loading: true });
  console.log("loading..")
  showSpinner();
  getFact("random", state.state.type)
    .then(fact => {
      console.log(fact);
      state.updateState({ loading: true });
    })
    .catch(err => {
      console.error(err);
    })
})

// fetching the data from APIs
const getFact = (number = "random", type = "math") => {
  state.updateState({ loading: true });
  return new Promise((resolve, reject) => {
    fetch(`http://numbersapi.com/${number}/${type}`)
      .then((res) => res.text())
      .then((data) => {
        showFact(data)
        state.updateState({ loading: false });
        resolve(data);
      })
      .catch((err) => {
        state.updateState({ loading: false });
        reject(err);
      });
  });
};

const showFact = (fact) => {
  DOM.factbox.innerHTML = fact;
};

const showSpinner = () => {
  DOM.factbox.innerHTML = `<div class="lds-ring"><div></div><div></div><div></div><div></div></div>`;
}

//getFact().then(data=>console.log(data))
