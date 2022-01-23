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
})({"src/js/model.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.transactionType = exports.Transaction = void 0;

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }

function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }

function _classPrivateFieldGet(receiver, privateMap) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get"); return _classApplyDescriptorGet(receiver, descriptor); }

function _classExtractFieldDescriptor(receiver, privateMap, action) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to " + action + " private field on non-instance"); } return privateMap.get(receiver); }

function _classApplyDescriptorGet(receiver, descriptor) { if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }

// exporting to controller view.
var transactionType = {
  INCOME: "INCOME",
  EXPENSE: "EXPENSE"
}; // transaction class 1.

exports.transactionType = transactionType;

var _secret = /*#__PURE__*/new WeakMap();

var Transaction = /*#__PURE__*/_createClass(function Transaction(type, value) {
  _classCallCheck(this, Transaction);

  _classPrivateFieldInitSpec(this, _secret, {
    writable: true,
    value: "adsad".concat(Math.random() * 100)
  });

  if (typeof value !== "number" || isNaN(value)) throw new TypeError("value must be number");
  if (!(type in transactionType)) throw new Error("type must be INCOME or EXPENSE only");
  this._type = type;
  this._value = value; // creating an unique id for each transation 2.

  this.id = "".concat(type, "-").concat(value, "-").concat(_classPrivateFieldGet(this, _secret));
  this.timestamp = Date.now();
});

exports.Transaction = Transaction;
; // console.log(this.id);
},{}],"src/js/Views/AddTransactionView.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var AddTransactionView = /*#__PURE__*/function () {
  function AddTransactionView() {
    _classCallCheck(this, AddTransactionView);

    _defineProperty(this, "_form", document.querySelector(".add_transaction_form"));

    _defineProperty(this, "_amount", this._form.querySelector(".amount"));

    _defineProperty(this, "_type", this._form.querySelector(".transaction_type"));
  }

  _createClass(AddTransactionView, [{
    key: "addSubmitHandler",
    value: function addSubmitHandler(handler) {
      var self = this;

      this._form.addEventListener("submit", function (e) {
        handler(e);
        self.clearForm();
      });
    }
  }, {
    key: "clearForm",
    value: function clearForm() {
      this._amount.value = "";
    }
  }, {
    key: "amount",
    get: function get() {
      return parseFloat(this._amount.value);
    }
  }, {
    key: "type",
    get: function get() {
      return this._type.value;
    }
  }]);

  return AddTransactionView;
}();

var _default = new AddTransactionView();

exports.default = _default;
},{}],"src/js/config.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CURRENCY_UNIT = void 0;
var CURRENCY_UNIT = "Rs";
exports.CURRENCY_UNIT = CURRENCY_UNIT;
},{}],"src/js/Views/ShowBalanceView.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _config = require("../config");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _classPrivateMethodInitSpec(obj, privateSet) { _checkPrivateRedeclaration(obj, privateSet); privateSet.add(obj); }

function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classPrivateMethodGet(receiver, privateSet, fn) { if (!privateSet.has(receiver)) { throw new TypeError("attempted to get private field on non-instance"); } return fn; }

var _generateHTMLString = /*#__PURE__*/new WeakSet();

var ShowBalanceView = /*#__PURE__*/function () {
  function ShowBalanceView() {
    _classCallCheck(this, ShowBalanceView);

    _classPrivateMethodInitSpec(this, _generateHTMLString);

    _defineProperty(this, "_container", document.querySelector(".balance_container"));
  }

  _createClass(ShowBalanceView, [{
    key: "render",
    value: function render(data) {
      this.data = data;
      var balance = this.getTotalBalance();
      console.log("balance is ", this.balance);
      this._container.innerHTML = _classPrivateMethodGet(this, _generateHTMLString, _generateHTMLString2).call(this);
    }
  }, {
    key: "getTotalBalance",
    value: function getTotalBalance() {
      var totalIncome = 0;
      this.data.income.forEach(function (inc) {
        totalIncome += inc._value;
      });
      var totalExpense = 0;
      this.data.expense.forEach(function (exp) {
        totalExpense += exp._value;
      });
      this.balance = totalIncome - totalExpense;
    }
  }, {
    key: "getFormatedBalance",
    value: function getFormatedBalance() {
      return Number(parseFloat(this.balance).toFixed(2)).toLocaleString('en', {
        minimumFractionDigits: 2
      });
    }
  }]);

  return ShowBalanceView;
}();

function _generateHTMLString2() {
  return "\n        <div style=\"display:flex;flex-direction:column;align-items:center;\"> \n            <h5>Your Balance</h5>\n           <div class=\"balance bold ".concat(this.balance > 0 ? "green" : "red", "\">\n             ").concat(_config.CURRENCY_UNIT, " ").concat(this.getFormatedBalance(), "\n           </div>\n        </div>\n        ");
}

;

var _default = new ShowBalanceView();

exports.default = _default;
},{"../config":"src/js/config.js"}],"src/js/Views/ListView.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ListView = void 0;

var _config = require("../config");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _classPrivateMethodInitSpec(obj, privateSet) { _checkPrivateRedeclaration(obj, privateSet); privateSet.add(obj); }

function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }

function _classPrivateMethodGet(receiver, privateSet, fn) { if (!privateSet.has(receiver)) { throw new TypeError("attempted to get private field on non-instance"); } return fn; }

var _getDateByTimeStamp = /*#__PURE__*/new WeakSet();

var ListView = /*#__PURE__*/function () {
  function ListView() {
    _classCallCheck(this, ListView);

    _classPrivateMethodInitSpec(this, _getDateByTimeStamp);
  }

  _createClass(ListView, [{
    key: "render",
    value: function render(data) {
      this.data = data;
      var html = this.generateHTMLString();
      this._container.innerHTML = html;
    }
  }, {
    key: "addFilterEventHandler",
    value: function addFilterEventHandler(handler) {
      this._filterSelect.addEventListener("change", function (e) {
        handler(e);
      });
    }
  }, {
    key: "pushTransactionCard",
    value: function pushTransactionCard(transaction) {
      this._container.insertAdjacentHTML("afterbegin", this.getCardHTMLString(transaction));
    }
  }, {
    key: "getCardHTMLString",
    value: function getCardHTMLString(el) {
      return " <div class=\"card transaction_card\" style=\"display:flex; justify-content:space-between\">\n        <div class=".concat(el._type === "EXPENSE" ? "red" : "green", "\n         style=\"font-weight:bolder;\"> ").concat(el._type === "EXPENSE" ? "-" : "", "\n          ").concat(el._value, " ").concat(_config.CURRENCY_UNIT, "</div>\n        <div>").concat(_classPrivateMethodGet(this, _getDateByTimeStamp, _getDateByTimeStamp2).call(this, el.timestamp), "</div>\n      </div>");
    }
  }, {
    key: "generateHTMLString",
    value: function generateHTMLString() {
      var _this = this;

      var html = "";

      if (Array.isArray(this.data)) {
        this.data.forEach(function (el) {
          html += _this.getCardHTMLString(el);
        });
      }

      return html;
    }
  }]);

  return ListView;
}();

exports.ListView = ListView;

function _getDateByTimeStamp2(timestamp) {
  var date = new Date(timestamp);
  return date.toDateString();
}
},{"../config":"src/js/config.js"}],"src/js/Views/ExpenseTrackerView.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _config = require("../config");

var _ListView2 = require("./ListView");

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var ExpenseTrackerView = /*#__PURE__*/function (_ListView) {
  _inherits(ExpenseTrackerView, _ListView);

  var _super = _createSuper(ExpenseTrackerView);

  function ExpenseTrackerView() {
    var _this;

    _classCallCheck(this, ExpenseTrackerView);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this), "_container", document.querySelector(".expenses_container"));

    _defineProperty(_assertThisInitialized(_this), "_filterSelect", document.querySelector(".expense_filter"));

    return _this;
  }

  return _createClass(ExpenseTrackerView);
}(_ListView2.ListView);

;

var _default = new ExpenseTrackerView();

exports.default = _default;
},{"../config":"src/js/config.js","./ListView":"src/js/Views/ListView.js"}],"src/js/Views/IncomeTrackerView.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _ListView2 = require("./ListView");

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var IncomeTrackerView = /*#__PURE__*/function (_ListView) {
  _inherits(IncomeTrackerView, _ListView);

  var _super = _createSuper(IncomeTrackerView);

  function IncomeTrackerView() {
    var _this;

    _classCallCheck(this, IncomeTrackerView);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this), "_container", document.querySelector(".income_container"));

    _defineProperty(_assertThisInitialized(_this), "_filterSelect", document.querySelector(".income_filter"));

    return _this;
  }

  return _createClass(IncomeTrackerView);
}(_ListView2.ListView);

;

var _default = new IncomeTrackerView();

exports.default = _default;
},{"./ListView":"src/js/Views/ListView.js"}],"src/js/Views/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "AddTransactionView", {
  enumerable: true,
  get: function () {
    return _AddTransactionView.default;
  }
});
Object.defineProperty(exports, "ExpenseTrackerView", {
  enumerable: true,
  get: function () {
    return _ExpenseTrackerView.default;
  }
});
Object.defineProperty(exports, "IncomeTrackerView", {
  enumerable: true,
  get: function () {
    return _IncomeTrackerView.default;
  }
});
Object.defineProperty(exports, "ShowBalanceView", {
  enumerable: true,
  get: function () {
    return _ShowBalanceView.default;
  }
});

var _AddTransactionView = _interopRequireDefault(require("./AddTransactionView"));

var _ShowBalanceView = _interopRequireDefault(require("./ShowBalanceView"));

var _ExpenseTrackerView = _interopRequireDefault(require("./ExpenseTrackerView"));

var _IncomeTrackerView = _interopRequireDefault(require("./IncomeTrackerView"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
},{"./AddTransactionView":"src/js/Views/AddTransactionView.js","./ShowBalanceView":"src/js/Views/ShowBalanceView.js","./ExpenseTrackerView":"src/js/Views/ExpenseTrackerView.js","./IncomeTrackerView":"src/js/Views/IncomeTrackerView.js"}],"src/js/controller.js":[function(require,module,exports) {
"use strict";

var _model = require("./model");

var _Views = require("./Views");

// import from model 3.
// getting the data from ls 7.
var getTransactionsFromLS = function getTransactionsFromLS(type) {
  return JSON.parse(localStorage.getItem(type) || '[]');
}; // storing the data to ls 6.


var saveTransactionInLS = function saveTransactionInLS(type, transaction) {
  var list = getTransactionsFromLS(type);
  list.push(transaction);
  list = JSON.stringify(list);
  localStorage.setItem(type, list);
};

var controlAddTransaction = function controlAddTransaction(event) {
  event.preventDefault();
  var amount = _Views.AddTransactionView.amount,
      type = _Views.AddTransactionView.type;
  console.log(amount, type);
  var transaction = new _model.Transaction(type, amount);
  saveTransactionInLS(type, transaction);

  _Views.AddTransactionView.clearForm();

  if (type === _model.transactionType.EXPENSE) {
    _Views.ExpenseTrackerView.pushTransactionCard(transaction);
  } else {
    _Views.IncomeTrackerView.pushTransactionCard(transaction);
  }

  controlShowBalance();
}; // total balance


var controlShowBalance = function controlShowBalance() {
  console.log("StorageChangeListener triggered");
  var income = getTransactionsFromLS(_model.transactionType.INCOME);
  var expense = getTransactionsFromLS(_model.transactionType.EXPENSE);

  _Views.ShowBalanceView.render({
    income: income,
    expense: expense
  });
};

var compareAmountFn = function compareAmountFn(a, b, flag) {
  if (flag) {
    if (a._value < b._value) {
      return -1;
    }

    if (a._value > b._value) {
      return 1;
    } // a must be equal to b


    return 0;
  } else {
    if (a._value > b._value) {
      return -1;
    }

    if (a._value < b._value) {
      return 1;
    } // a must be equal to b


    return 0;
  }
};

var controlSortByAmount = function controlSortByAmount(list, view, flag, shouldReverse) {
  if (Array.isArray(list)) {
    list.sort(function (a, b) {
      return compareAmountFn(a, b, flag);
    });
    console.log("sorted list is", list);
    if (shouldReverse) list = list.reverse();
    view.render(list);
  }
};

var controlFilterChange = function controlFilterChange(ev) {
  console.log(ev.target.value);

  if (ev.target.id === "income_filter") {
    if (ev.target.value === "Amount+") {
      controlSortByAmount(getTransactionsFromLS(_model.transactionType.INCOME), _Views.IncomeTrackerView, false);
    }

    if (ev.target.value === "Amount-") {
      controlSortByAmount(getTransactionsFromLS(_model.transactionType.INCOME), _Views.IncomeTrackerView, true);
    }

    if (ev.target.value === "none") {
      _Views.IncomeTrackerView.render(getTransactionsFromLS(_model.transactionType.INCOME));
    }
  } else {
    if (ev.target.value === "Amount+") {
      controlSortByAmount(getTransactionsFromLS(_model.transactionType.EXPENSE), _Views.ExpenseTrackerView, false, true);
    }

    if (ev.target.value === "Amount-") {
      controlSortByAmount(getTransactionsFromLS(_model.transactionType.EXPENSE), _Views.ExpenseTrackerView, true, true);
    }

    if (ev.target.value === "none") {
      _Views.ExpenseTrackerView.render(getTransactionsFromLS(_model.transactionType.EXPENSE));
    }
  }
};

var init = function init() {
  _Views.AddTransactionView.addSubmitHandler(controlAddTransaction);

  controlShowBalance();

  _Views.ExpenseTrackerView.render(getTransactionsFromLS(_model.transactionType.EXPENSE));

  _Views.ExpenseTrackerView.addFilterEventHandler(controlFilterChange);

  _Views.IncomeTrackerView.render(getTransactionsFromLS(_model.transactionType.INCOME));

  _Views.IncomeTrackerView.addFilterEventHandler(controlFilterChange);
};

init();
},{"./model":"src/js/model.js","./Views":"src/js/Views/index.js"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "49701" + '/');

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
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","src/js/controller.js"], null)
//# sourceMappingURL=/controller.e87f5190.js.map