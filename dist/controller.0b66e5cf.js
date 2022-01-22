// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"src/model.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.state = exports.ContactPerson = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

// it contains datastructure for person details...
var state = {
  isSearching: false
}; //  fetching contact person details 1.

exports.state = state;

var ContactPerson = /*#__PURE__*/function () {
  function ContactPerson(name, phone, email) {
    _classCallCheck(this, ContactPerson);

    this.name = name;
    this.phone = phone;
    this.email = email; // for getting the unique id number for each person,create it.

    this.id = "".concat(name, "-").concat(phone, "-").concat(Math.random().toFixed(2));
  } // saving the list of contacts 3.


  _createClass(ContactPerson, [{
    key: "saveContactInLS",
    value: function saveContactInLS() {
      var contact = {
        name: this.name,
        phone: this.phone,
        email: this.email,
        id: this.id
      }; // getting the conctacts from ls 4.

      var list = JSON.parse(localStorage.getItem("contacts") || "[]");
      list.push(contact);
      localStorage.setItem("contacts", JSON.stringify(list));
    }
  }]);

  return ContactPerson;
}();

exports.ContactPerson = ContactPerson;
},{}],"src/Views/AddContactView.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// add the contact to view 6.
var AddContactView = /*#__PURE__*/function () {
  // making the toggle value  to overlay or hidden 11.
  function AddContactView() {
    _classCallCheck(this, AddContactView);

    _defineProperty(this, "_modal", document.querySelector(".add_contact_modal"));

    _defineProperty(this, "_formContainer", document.querySelector(".add_contact_form"));

    _defineProperty(this, "_inputName", this._formContainer.querySelector(".name_input"));

    _defineProperty(this, "_inputPhone", this._formContainer.querySelector(".phone_input"));

    _defineProperty(this, "_inputEmail", this._formContainer.querySelector(".email_input"));

    _defineProperty(this, "_addContactBtn", document.querySelector(".add_contact_btn"));

    this._addContactBtn.addEventListener("click", this.toggleModal.bind(this));

    this._formContainer.querySelector(".close").addEventListener("click", this.toggleModal.bind(this));
  }

  _createClass(AddContactView, [{
    key: "toggleModal",
    value: function toggleModal(event) {
      event.preventDefault();
      console.log(this._modal);

      this._modal.classList.toggle("hidden");
    } // we here creating the all handler function must be a function 7.

  }, {
    key: "addContactSubmitListner",
    value: function addContactSubmitListner(handler) {
      if (typeof handler !== "function") throw new TypeError("handler must be a function");

      this._formContainer.addEventListener("submit", handler.bind(this));
    } // clearing the form after user saved the input 10.

  }, {
    key: "clearForm",
    value: function clearForm() {
      this._inputName.value = "";
      this._inputEmail.value = "";
      this._inputPhone.value = "";
    } // getting the value of name,phone,email 8.

  }, {
    key: "Name",
    get: function get() {
      return this._inputName.value;
    }
  }, {
    key: "Phone",
    get: function get() {
      return this._inputPhone.value;
    }
  }, {
    key: "Email",
    get: function get() {
      return this._inputEmail.value;
    }
  }]);

  return AddContactView;
}(); // exporting it 7.


var _default = new AddContactView();

exports.default = _default;
},{}],"src/Views/ContactContainerView.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _classPrivateMethodInitSpec(obj, privateSet) { _checkPrivateRedeclaration(obj, privateSet); privateSet.add(obj); }

function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classPrivateMethodGet(receiver, privateSet, fn) { if (!privateSet.has(receiver)) { throw new TypeError("attempted to get private field on non-instance"); } return fn; }

var _generateHTMLString = /*#__PURE__*/new WeakSet();

var _generatCardContactHTML = /*#__PURE__*/new WeakSet();

var ContactContainerView = /*#__PURE__*/function () {
  function ContactContainerView() {
    _classCallCheck(this, ContactContainerView);

    _classPrivateMethodInitSpec(this, _generatCardContactHTML);

    _classPrivateMethodInitSpec(this, _generateHTMLString);

    _defineProperty(this, "_container", document.querySelector(".contacts_container"));
  }

  _createClass(ContactContainerView, [{
    key: "render",
    value: // to ui to make contact list 11.
    function render(data) {
      this.data = data;

      var html = _classPrivateMethodGet(this, _generateHTMLString, _generateHTMLString2).call(this);

      this._container.innerHTML = html;
      this.applyDeleteEvent();
    }
  }, {
    key: "applyDeleteEvent",
    value: function applyDeleteEvent() {
      var _this = this;

      var deleteBtns = document.querySelectorAll(".delete_contact");
      deleteBtns.forEach(function (btn) {
        btn.addEventListener("click", function () {
          _this.onDelete(btn.id);
        });
      });
    }
  }, {
    key: "addDeleteListner",
    value: function addDeleteListner(handler) {
      this.onDelete = handler;
    } // pushig an contact to container

  }, {
    key: "pushContactIntoContainer",
    value: function pushContactIntoContainer(contact) {
      var html = _classPrivateMethodGet(this, _generatCardContactHTML, _generatCardContactHTML2).call(this, contact);

      this._container.insertAdjacentHTML("afterbegin", html);

      this.applyDeleteEvent();
    }
  }]);

  return ContactContainerView;
}();

function _generateHTMLString2() {
  var _this2 = this;

  var data = this.data;
  var html = "";

  if (Array.isArray(data)) {
    data.forEach(function (contact) {
      html += _classPrivateMethodGet(_this2, _generatCardContactHTML, _generatCardContactHTML2).call(_this2, contact);
    });
    return html;
  }
}

function _generatCardContactHTML2(contact) {
  return " <div class=\"contact_card\">\n            <div class=\"contact_info\">\n              <div style=\"font-size:x-large\">".concat(contact.name, "</div>\n              <div>").concat(contact.phone, "</div>\n              <div>").concat(contact.email, "</div>\n            </div>\n            <button class=\"delete_contact\" id=\"").concat(contact.id, "\">delete</button>\n        </div>");
}

var _default = new ContactContainerView();

exports.default = _default;
},{}],"src/Views/searchView.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var SearchView = /*#__PURE__*/function () {
  function SearchView() {
    _classCallCheck(this, SearchView);

    _defineProperty(this, "container", document.querySelector(".search_form"));

    _defineProperty(this, "inputQuery", document.querySelector(".search_input"));
  }

  _createClass(SearchView, [{
    key: "addHandleClear",
    value: function addHandleClear(handler) {
      this.container.querySelector(".clear_search").addEventListener("click", handler.bind(this));
    }
  }, {
    key: "addSubmitEvent",
    value: function addSubmitEvent(handler) {
      var _this = this;

      this.container.addEventListener("submit", function (ev) {
        handler(ev);

        _this.toggleButtons();
      });
    }
  }, {
    key: "toggleButtons",
    value: function toggleButtons() {
      this.container.querySelector(".clear_search").classList.toggle("remove");
      this.container.querySelector(".search_btn").classList.toggle("remove");
    }
  }, {
    key: "query",
    get: function get() {
      return this.inputQuery.value;
    }
  }, {
    key: "clearForm",
    value: function clearForm() {
      this.inputQuery.value = "";
    }
  }]);

  return SearchView;
}();

var _default = new SearchView();

exports.default = _default;
},{}],"src/controller.js":[function(require,module,exports) {
"use strict";

var _model = require("./model");

var _AddContactView = _interopRequireDefault(require("./Views/AddContactView"));

var _ContactContainerView = _interopRequireDefault(require("./Views/ContactContainerView"));

var _searchView = _interopRequireDefault(require("./Views/searchView"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// importing addcontact view 9.
var getContactsFromLS = function getContactsFromLS() {
  return JSON.parse(localStorage.getItem("contacts") || "[]");
}; // to delete the contact


var controlContactDelete = function controlContactDelete(id) {
  var list = getContactsFromLS();

  if (Array.isArray(list)) {
    list = list.filter(function (contact) {
      if (contact.id === id) return false;else return true;
    });

    _ContactContainerView.default.render(list);

    if (_model.state.isSearching) handleSearchClear();
    list = JSON.stringify(list);
    localStorage.setItem("contacts", list);
  }
};

var controlAddContact = function controlAddContact(event) {
  event.preventDefault();
  var Name = _AddContactView.default.Name,
      Email = _AddContactView.default.Email,
      Phone = _AddContactView.default.Phone; // making an new contact 2.

  var newContact = new _model.ContactPerson(Name, Phone, Email);
  console.log("saving", newContact); // saving the new contact 5.

  newContact.saveContactInLS();

  _AddContactView.default.clearForm();

  _ContactContainerView.default.pushContactIntoContainer(newContact);
};

var handleSearch = function handleSearch(event) {
  _model.state.isSearching = true;
  event.preventDefault();
  var query = _searchView.default.query;
  location.hash = "#q=".concat(query);
};

var search = function search(query) {
  var list = getContactsFromLS();
  var results = [];

  if (Array.isArray(list)) {
    list.forEach(function (contact) {
      if (contact.name.includes(query) || contact.phone.toString().includes(query) || contact.email.includes(query)) {
        results.push(contact);
      }
    });
  }

  return results;
};

var controlHashChange = function controlHashChange() {
  var query = location.hash.split("=")[1];
  console.log("query is ", query);
  var results = search(query);
  if (typeof query !== "undefined" && query.length > 0) _ContactContainerView.default.render(results);else _ContactContainerView.default.render(getContactsFromLS());
};

var handleSearchClear = function handleSearchClear(e) {
  _model.state.isSearching = false;
  if (e) e.preventDefault();

  _searchView.default.toggleButtons();

  _searchView.default.clearForm();

  location.hash = "";
};

var init = function init() {
  _AddContactView.default.addContactSubmitListner(controlAddContact);

  _ContactContainerView.default.addDeleteListner(controlContactDelete);

  _ContactContainerView.default.render(getContactsFromLS());

  _searchView.default.addSubmitEvent(handleSearch);

  _searchView.default.addHandleClear(handleSearchClear);

  window.onhashchange = controlHashChange;
};

init();
},{"./model":"src/model.js","./Views/AddContactView":"src/Views/AddContactView.js","./Views/ContactContainerView":"src/Views/ContactContainerView.js","./Views/searchView":"src/Views/searchView.js"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "49717" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","src/controller.js"], null)
//# sourceMappingURL=/controller.0b66e5cf.js.map