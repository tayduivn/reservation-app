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
})({"node_modules/vue/dist/vue.runtime.esm.js":[function(require,module,exports) {
var global = arguments[3];
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/*!
 * Vue.js v2.6.10
 * (c) 2014-2019 Evan You
 * Released under the MIT License.
 */

/*  */
var emptyObject = Object.freeze({}); // These helpers produce better VM code in JS engines due to their
// explicitness and function inlining.

function isUndef(v) {
  return v === undefined || v === null;
}

function isDef(v) {
  return v !== undefined && v !== null;
}

function isTrue(v) {
  return v === true;
}

function isFalse(v) {
  return v === false;
}
/**
 * Check if value is primitive.
 */


function isPrimitive(value) {
  return typeof value === 'string' || typeof value === 'number' || // $flow-disable-line
  typeof value === 'symbol' || typeof value === 'boolean';
}
/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */


function isObject(obj) {
  return obj !== null && typeof obj === 'object';
}
/**
 * Get the raw type string of a value, e.g., [object Object].
 */


var _toString = Object.prototype.toString;

function toRawType(value) {
  return _toString.call(value).slice(8, -1);
}
/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */


function isPlainObject(obj) {
  return _toString.call(obj) === '[object Object]';
}

function isRegExp(v) {
  return _toString.call(v) === '[object RegExp]';
}
/**
 * Check if val is a valid array index.
 */


function isValidArrayIndex(val) {
  var n = parseFloat(String(val));
  return n >= 0 && Math.floor(n) === n && isFinite(val);
}

function isPromise(val) {
  return isDef(val) && typeof val.then === 'function' && typeof val.catch === 'function';
}
/**
 * Convert a value to a string that is actually rendered.
 */


function toString(val) {
  return val == null ? '' : Array.isArray(val) || isPlainObject(val) && val.toString === _toString ? JSON.stringify(val, null, 2) : String(val);
}
/**
 * Convert an input value to a number for persistence.
 * If the conversion fails, return original string.
 */


function toNumber(val) {
  var n = parseFloat(val);
  return isNaN(n) ? val : n;
}
/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */


function makeMap(str, expectsLowerCase) {
  var map = Object.create(null);
  var list = str.split(',');

  for (var i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }

  return expectsLowerCase ? function (val) {
    return map[val.toLowerCase()];
  } : function (val) {
    return map[val];
  };
}
/**
 * Check if a tag is a built-in tag.
 */


var isBuiltInTag = makeMap('slot,component', true);
/**
 * Check if an attribute is a reserved attribute.
 */

var isReservedAttribute = makeMap('key,ref,slot,slot-scope,is');
/**
 * Remove an item from an array.
 */

function remove(arr, item) {
  if (arr.length) {
    var index = arr.indexOf(item);

    if (index > -1) {
      return arr.splice(index, 1);
    }
  }
}
/**
 * Check whether an object has the property.
 */


var hasOwnProperty = Object.prototype.hasOwnProperty;

function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key);
}
/**
 * Create a cached version of a pure function.
 */


function cached(fn) {
  var cache = Object.create(null);
  return function cachedFn(str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
}
/**
 * Camelize a hyphen-delimited string.
 */


var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) {
    return c ? c.toUpperCase() : '';
  });
});
/**
 * Capitalize a string.
 */

var capitalize = cached(function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
});
/**
 * Hyphenate a camelCase string.
 */

var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cached(function (str) {
  return str.replace(hyphenateRE, '-$1').toLowerCase();
});
/**
 * Simple bind polyfill for environments that do not support it,
 * e.g., PhantomJS 1.x. Technically, we don't need this anymore
 * since native bind is now performant enough in most browsers.
 * But removing it would mean breaking code that was able to run in
 * PhantomJS 1.x, so this must be kept for backward compatibility.
 */

/* istanbul ignore next */

function polyfillBind(fn, ctx) {
  function boundFn(a) {
    var l = arguments.length;
    return l ? l > 1 ? fn.apply(ctx, arguments) : fn.call(ctx, a) : fn.call(ctx);
  }

  boundFn._length = fn.length;
  return boundFn;
}

function nativeBind(fn, ctx) {
  return fn.bind(ctx);
}

var bind = Function.prototype.bind ? nativeBind : polyfillBind;
/**
 * Convert an Array-like object to a real Array.
 */

function toArray(list, start) {
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);

  while (i--) {
    ret[i] = list[i + start];
  }

  return ret;
}
/**
 * Mix properties into target object.
 */


function extend(to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }

  return to;
}
/**
 * Merge an Array of Objects into a single Object.
 */


function toObject(arr) {
  var res = {};

  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }

  return res;
}
/* eslint-disable no-unused-vars */

/**
 * Perform no operation.
 * Stubbing args to make Flow happy without leaving useless transpiled code
 * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/).
 */


function noop(a, b, c) {}
/**
 * Always return false.
 */


var no = function (a, b, c) {
  return false;
};
/* eslint-enable no-unused-vars */

/**
 * Return the same value.
 */


var identity = function (_) {
  return _;
};
/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */


function looseEqual(a, b) {
  if (a === b) {
    return true;
  }

  var isObjectA = isObject(a);
  var isObjectB = isObject(b);

  if (isObjectA && isObjectB) {
    try {
      var isArrayA = Array.isArray(a);
      var isArrayB = Array.isArray(b);

      if (isArrayA && isArrayB) {
        return a.length === b.length && a.every(function (e, i) {
          return looseEqual(e, b[i]);
        });
      } else if (a instanceof Date && b instanceof Date) {
        return a.getTime() === b.getTime();
      } else if (!isArrayA && !isArrayB) {
        var keysA = Object.keys(a);
        var keysB = Object.keys(b);
        return keysA.length === keysB.length && keysA.every(function (key) {
          return looseEqual(a[key], b[key]);
        });
      } else {
        /* istanbul ignore next */
        return false;
      }
    } catch (e) {
      /* istanbul ignore next */
      return false;
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b);
  } else {
    return false;
  }
}
/**
 * Return the first index at which a loosely equal value can be
 * found in the array (if value is a plain object, the array must
 * contain an object of the same shape), or -1 if it is not present.
 */


function looseIndexOf(arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val)) {
      return i;
    }
  }

  return -1;
}
/**
 * Ensure a function is called only once.
 */


function once(fn) {
  var called = false;
  return function () {
    if (!called) {
      called = true;
      fn.apply(this, arguments);
    }
  };
}

var SSR_ATTR = 'data-server-rendered';
var ASSET_TYPES = ['component', 'directive', 'filter'];
var LIFECYCLE_HOOKS = ['beforeCreate', 'created', 'beforeMount', 'mounted', 'beforeUpdate', 'updated', 'beforeDestroy', 'destroyed', 'activated', 'deactivated', 'errorCaptured', 'serverPrefetch'];
/*  */

var config = {
  /**
   * Option merge strategies (used in core/util/options)
   */
  // $flow-disable-line
  optionMergeStrategies: Object.create(null),

  /**
   * Whether to suppress warnings.
   */
  silent: false,

  /**
   * Show production mode tip message on boot?
   */
  productionTip: "development" !== 'production',

  /**
   * Whether to enable devtools
   */
  devtools: "development" !== 'production',

  /**
   * Whether to record perf
   */
  performance: false,

  /**
   * Error handler for watcher errors
   */
  errorHandler: null,

  /**
   * Warn handler for watcher warns
   */
  warnHandler: null,

  /**
   * Ignore certain custom elements
   */
  ignoredElements: [],

  /**
   * Custom user key aliases for v-on
   */
  // $flow-disable-line
  keyCodes: Object.create(null),

  /**
   * Check if a tag is reserved so that it cannot be registered as a
   * component. This is platform-dependent and may be overwritten.
   */
  isReservedTag: no,

  /**
   * Check if an attribute is reserved so that it cannot be used as a component
   * prop. This is platform-dependent and may be overwritten.
   */
  isReservedAttr: no,

  /**
   * Check if a tag is an unknown element.
   * Platform-dependent.
   */
  isUnknownElement: no,

  /**
   * Get the namespace of an element
   */
  getTagNamespace: noop,

  /**
   * Parse the real tag name for the specific platform.
   */
  parsePlatformTagName: identity,

  /**
   * Check if an attribute must be bound using property, e.g. value
   * Platform-dependent.
   */
  mustUseProp: no,

  /**
   * Perform updates asynchronously. Intended to be used by Vue Test Utils
   * This will significantly reduce performance if set to false.
   */
  async: true,

  /**
   * Exposed for legacy reasons
   */
  _lifecycleHooks: LIFECYCLE_HOOKS
};
/*  */

/**
 * unicode letters used for parsing html tags, component names and property paths.
 * using https://www.w3.org/TR/html53/semantics-scripting.html#potentialcustomelementname
 * skipping \u10000-\uEFFFF due to it freezing up PhantomJS
 */

var unicodeRegExp = /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/;
/**
 * Check if a string starts with $ or _
 */

function isReserved(str) {
  var c = (str + '').charCodeAt(0);
  return c === 0x24 || c === 0x5F;
}
/**
 * Define a property.
 */


function def(obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}
/**
 * Parse simple path.
 */


var bailRE = new RegExp("[^" + unicodeRegExp.source + ".$_\\d]");

function parsePath(path) {
  if (bailRE.test(path)) {
    return;
  }

  var segments = path.split('.');
  return function (obj) {
    for (var i = 0; i < segments.length; i++) {
      if (!obj) {
        return;
      }

      obj = obj[segments[i]];
    }

    return obj;
  };
}
/*  */
// can we use __proto__?


var hasProto = '__proto__' in {}; // Browser environment sniffing

var inBrowser = typeof window !== 'undefined';
var inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform;
var weexPlatform = inWeex && WXEnvironment.platform.toLowerCase();
var UA = inBrowser && window.navigator.userAgent.toLowerCase();
var isIE = UA && /msie|trident/.test(UA);
var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
var isEdge = UA && UA.indexOf('edge/') > 0;
var isAndroid = UA && UA.indexOf('android') > 0 || weexPlatform === 'android';
var isIOS = UA && /iphone|ipad|ipod|ios/.test(UA) || weexPlatform === 'ios';
var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;
var isPhantomJS = UA && /phantomjs/.test(UA);
var isFF = UA && UA.match(/firefox\/(\d+)/); // Firefox has a "watch" function on Object.prototype...

var nativeWatch = {}.watch;
var supportsPassive = false;

if (inBrowser) {
  try {
    var opts = {};
    Object.defineProperty(opts, 'passive', {
      get: function get() {
        /* istanbul ignore next */
        supportsPassive = true;
      }
    }); // https://github.com/facebook/flow/issues/285

    window.addEventListener('test-passive', null, opts);
  } catch (e) {}
} // this needs to be lazy-evaled because vue may be required before
// vue-server-renderer can set VUE_ENV


var _isServer;

var isServerRendering = function () {
  if (_isServer === undefined) {
    /* istanbul ignore if */
    if (!inBrowser && !inWeex && typeof global !== 'undefined') {
      // detect presence of vue-server-renderer and avoid
      // Webpack shimming the process
      _isServer = global['process'] && global['process'].env.VUE_ENV === 'server';
    } else {
      _isServer = false;
    }
  }

  return _isServer;
}; // detect devtools


var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;
/* istanbul ignore next */

function isNative(Ctor) {
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString());
}

var hasSymbol = typeof Symbol !== 'undefined' && isNative(Symbol) && typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);

var _Set;
/* istanbul ignore if */
// $flow-disable-line


if (typeof Set !== 'undefined' && isNative(Set)) {
  // use native Set when available.
  _Set = Set;
} else {
  // a non-standard Set polyfill that only works with primitive keys.
  _Set =
  /*@__PURE__*/
  function () {
    function Set() {
      this.set = Object.create(null);
    }

    Set.prototype.has = function has(key) {
      return this.set[key] === true;
    };

    Set.prototype.add = function add(key) {
      this.set[key] = true;
    };

    Set.prototype.clear = function clear() {
      this.set = Object.create(null);
    };

    return Set;
  }();
}
/*  */


var warn = noop;
var tip = noop;
var generateComponentTrace = noop; // work around flow check

var formatComponentName = noop;

if ("development" !== 'production') {
  var hasConsole = typeof console !== 'undefined';
  var classifyRE = /(?:^|[-_])(\w)/g;

  var classify = function (str) {
    return str.replace(classifyRE, function (c) {
      return c.toUpperCase();
    }).replace(/[-_]/g, '');
  };

  warn = function (msg, vm) {
    var trace = vm ? generateComponentTrace(vm) : '';

    if (config.warnHandler) {
      config.warnHandler.call(null, msg, vm, trace);
    } else if (hasConsole && !config.silent) {
      console.error("[Vue warn]: " + msg + trace);
    }
  };

  tip = function (msg, vm) {
    if (hasConsole && !config.silent) {
      console.warn("[Vue tip]: " + msg + (vm ? generateComponentTrace(vm) : ''));
    }
  };

  formatComponentName = function (vm, includeFile) {
    if (vm.$root === vm) {
      return '<Root>';
    }

    var options = typeof vm === 'function' && vm.cid != null ? vm.options : vm._isVue ? vm.$options || vm.constructor.options : vm;
    var name = options.name || options._componentTag;
    var file = options.__file;

    if (!name && file) {
      var match = file.match(/([^/\\]+)\.vue$/);
      name = match && match[1];
    }

    return (name ? "<" + classify(name) + ">" : "<Anonymous>") + (file && includeFile !== false ? " at " + file : '');
  };

  var repeat = function (str, n) {
    var res = '';

    while (n) {
      if (n % 2 === 1) {
        res += str;
      }

      if (n > 1) {
        str += str;
      }

      n >>= 1;
    }

    return res;
  };

  generateComponentTrace = function (vm) {
    if (vm._isVue && vm.$parent) {
      var tree = [];
      var currentRecursiveSequence = 0;

      while (vm) {
        if (tree.length > 0) {
          var last = tree[tree.length - 1];

          if (last.constructor === vm.constructor) {
            currentRecursiveSequence++;
            vm = vm.$parent;
            continue;
          } else if (currentRecursiveSequence > 0) {
            tree[tree.length - 1] = [last, currentRecursiveSequence];
            currentRecursiveSequence = 0;
          }
        }

        tree.push(vm);
        vm = vm.$parent;
      }

      return '\n\nfound in\n\n' + tree.map(function (vm, i) {
        return "" + (i === 0 ? '---> ' : repeat(' ', 5 + i * 2)) + (Array.isArray(vm) ? formatComponentName(vm[0]) + "... (" + vm[1] + " recursive calls)" : formatComponentName(vm));
      }).join('\n');
    } else {
      return "\n\n(found in " + formatComponentName(vm) + ")";
    }
  };
}
/*  */


var uid = 0;
/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */

var Dep = function Dep() {
  this.id = uid++;
  this.subs = [];
};

Dep.prototype.addSub = function addSub(sub) {
  this.subs.push(sub);
};

Dep.prototype.removeSub = function removeSub(sub) {
  remove(this.subs, sub);
};

Dep.prototype.depend = function depend() {
  if (Dep.target) {
    Dep.target.addDep(this);
  }
};

Dep.prototype.notify = function notify() {
  // stabilize the subscriber list first
  var subs = this.subs.slice();

  if ("development" !== 'production' && !config.async) {
    // subs aren't sorted in scheduler if not running async
    // we need to sort them now to make sure they fire in correct
    // order
    subs.sort(function (a, b) {
      return a.id - b.id;
    });
  }

  for (var i = 0, l = subs.length; i < l; i++) {
    subs[i].update();
  }
}; // The current target watcher being evaluated.
// This is globally unique because only one watcher
// can be evaluated at a time.


Dep.target = null;
var targetStack = [];

function pushTarget(target) {
  targetStack.push(target);
  Dep.target = target;
}

function popTarget() {
  targetStack.pop();
  Dep.target = targetStack[targetStack.length - 1];
}
/*  */


var VNode = function VNode(tag, data, children, text, elm, context, componentOptions, asyncFactory) {
  this.tag = tag;
  this.data = data;
  this.children = children;
  this.text = text;
  this.elm = elm;
  this.ns = undefined;
  this.context = context;
  this.fnContext = undefined;
  this.fnOptions = undefined;
  this.fnScopeId = undefined;
  this.key = data && data.key;
  this.componentOptions = componentOptions;
  this.componentInstance = undefined;
  this.parent = undefined;
  this.raw = false;
  this.isStatic = false;
  this.isRootInsert = true;
  this.isComment = false;
  this.isCloned = false;
  this.isOnce = false;
  this.asyncFactory = asyncFactory;
  this.asyncMeta = undefined;
  this.isAsyncPlaceholder = false;
};

var prototypeAccessors = {
  child: {
    configurable: true
  }
}; // DEPRECATED: alias for componentInstance for backwards compat.

/* istanbul ignore next */

prototypeAccessors.child.get = function () {
  return this.componentInstance;
};

Object.defineProperties(VNode.prototype, prototypeAccessors);

var createEmptyVNode = function (text) {
  if (text === void 0) text = '';
  var node = new VNode();
  node.text = text;
  node.isComment = true;
  return node;
};

function createTextVNode(val) {
  return new VNode(undefined, undefined, undefined, String(val));
} // optimized shallow clone
// used for static nodes and slot nodes because they may be reused across
// multiple renders, cloning them avoids errors when DOM manipulations rely
// on their elm reference.


function cloneVNode(vnode) {
  var cloned = new VNode(vnode.tag, vnode.data, // #7975
  // clone children array to avoid mutating original in case of cloning
  // a child.
  vnode.children && vnode.children.slice(), vnode.text, vnode.elm, vnode.context, vnode.componentOptions, vnode.asyncFactory);
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.isComment = vnode.isComment;
  cloned.fnContext = vnode.fnContext;
  cloned.fnOptions = vnode.fnOptions;
  cloned.fnScopeId = vnode.fnScopeId;
  cloned.asyncMeta = vnode.asyncMeta;
  cloned.isCloned = true;
  return cloned;
}
/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */


var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto);
var methodsToPatch = ['push', 'pop', 'shift', 'unshift', 'splice', 'sort', 'reverse'];
/**
 * Intercept mutating methods and emit events
 */

methodsToPatch.forEach(function (method) {
  // cache original method
  var original = arrayProto[method];
  def(arrayMethods, method, function mutator() {
    var args = [],
        len = arguments.length;

    while (len--) args[len] = arguments[len];

    var result = original.apply(this, args);
    var ob = this.__ob__;
    var inserted;

    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args;
        break;

      case 'splice':
        inserted = args.slice(2);
        break;
    }

    if (inserted) {
      ob.observeArray(inserted);
    } // notify change


    ob.dep.notify();
    return result;
  });
});
/*  */

var arrayKeys = Object.getOwnPropertyNames(arrayMethods);
/**
 * In some cases we may want to disable observation inside a component's
 * update computation.
 */

var shouldObserve = true;

function toggleObserving(value) {
  shouldObserve = value;
}
/**
 * Observer class that is attached to each observed
 * object. Once attached, the observer converts the target
 * object's property keys into getter/setters that
 * collect dependencies and dispatch updates.
 */


var Observer = function Observer(value) {
  this.value = value;
  this.dep = new Dep();
  this.vmCount = 0;
  def(value, '__ob__', this);

  if (Array.isArray(value)) {
    if (hasProto) {
      protoAugment(value, arrayMethods);
    } else {
      copyAugment(value, arrayMethods, arrayKeys);
    }

    this.observeArray(value);
  } else {
    this.walk(value);
  }
};
/**
 * Walk through all properties and convert them into
 * getter/setters. This method should only be called when
 * value type is Object.
 */


Observer.prototype.walk = function walk(obj) {
  var keys = Object.keys(obj);

  for (var i = 0; i < keys.length; i++) {
    defineReactive$$1(obj, keys[i]);
  }
};
/**
 * Observe a list of Array items.
 */


Observer.prototype.observeArray = function observeArray(items) {
  for (var i = 0, l = items.length; i < l; i++) {
    observe(items[i]);
  }
}; // helpers

/**
 * Augment a target Object or Array by intercepting
 * the prototype chain using __proto__
 */


function protoAugment(target, src) {
  /* eslint-disable no-proto */
  target.__proto__ = src;
  /* eslint-enable no-proto */
}
/**
 * Augment a target Object or Array by defining
 * hidden properties.
 */

/* istanbul ignore next */


function copyAugment(target, src, keys) {
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    def(target, key, src[key]);
  }
}
/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 */


function observe(value, asRootData) {
  if (!isObject(value) || value instanceof VNode) {
    return;
  }

  var ob;

  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else if (shouldObserve && !isServerRendering() && (Array.isArray(value) || isPlainObject(value)) && Object.isExtensible(value) && !value._isVue) {
    ob = new Observer(value);
  }

  if (asRootData && ob) {
    ob.vmCount++;
  }

  return ob;
}
/**
 * Define a reactive property on an Object.
 */


function defineReactive$$1(obj, key, val, customSetter, shallow) {
  var dep = new Dep();
  var property = Object.getOwnPropertyDescriptor(obj, key);

  if (property && property.configurable === false) {
    return;
  } // cater for pre-defined getter/setters


  var getter = property && property.get;
  var setter = property && property.set;

  if ((!getter || setter) && arguments.length === 2) {
    val = obj[key];
  }

  var childOb = !shallow && observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter() {
      var value = getter ? getter.call(obj) : val;

      if (Dep.target) {
        dep.depend();

        if (childOb) {
          childOb.dep.depend();

          if (Array.isArray(value)) {
            dependArray(value);
          }
        }
      }

      return value;
    },
    set: function reactiveSetter(newVal) {
      var value = getter ? getter.call(obj) : val;
      /* eslint-disable no-self-compare */

      if (newVal === value || newVal !== newVal && value !== value) {
        return;
      }
      /* eslint-enable no-self-compare */


      if ("development" !== 'production' && customSetter) {
        customSetter();
      } // #7981: for accessor properties without setter


      if (getter && !setter) {
        return;
      }

      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }

      childOb = !shallow && observe(newVal);
      dep.notify();
    }
  });
}
/**
 * Set a property on an object. Adds the new property and
 * triggers change notification if the property doesn't
 * already exist.
 */


function set(target, key, val) {
  if ("development" !== 'production' && (isUndef(target) || isPrimitive(target))) {
    warn("Cannot set reactive property on undefined, null, or primitive value: " + target);
  }

  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val;
  }

  if (key in target && !(key in Object.prototype)) {
    target[key] = val;
    return val;
  }

  var ob = target.__ob__;

  if (target._isVue || ob && ob.vmCount) {
    "development" !== 'production' && warn('Avoid adding reactive properties to a Vue instance or its root $data ' + 'at runtime - declare it upfront in the data option.');
    return val;
  }

  if (!ob) {
    target[key] = val;
    return val;
  }

  defineReactive$$1(ob.value, key, val);
  ob.dep.notify();
  return val;
}
/**
 * Delete a property and trigger change if necessary.
 */


function del(target, key) {
  if ("development" !== 'production' && (isUndef(target) || isPrimitive(target))) {
    warn("Cannot delete reactive property on undefined, null, or primitive value: " + target);
  }

  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.splice(key, 1);
    return;
  }

  var ob = target.__ob__;

  if (target._isVue || ob && ob.vmCount) {
    "development" !== 'production' && warn('Avoid deleting properties on a Vue instance or its root $data ' + '- just set it to null.');
    return;
  }

  if (!hasOwn(target, key)) {
    return;
  }

  delete target[key];

  if (!ob) {
    return;
  }

  ob.dep.notify();
}
/**
 * Collect dependencies on array elements when the array is touched, since
 * we cannot intercept array element access like property getters.
 */


function dependArray(value) {
  for (var e = void 0, i = 0, l = value.length; i < l; i++) {
    e = value[i];
    e && e.__ob__ && e.__ob__.dep.depend();

    if (Array.isArray(e)) {
      dependArray(e);
    }
  }
}
/*  */

/**
 * Option overwriting strategies are functions that handle
 * how to merge a parent option value and a child option
 * value into the final value.
 */


var strats = config.optionMergeStrategies;
/**
 * Options with restrictions
 */

if ("development" !== 'production') {
  strats.el = strats.propsData = function (parent, child, vm, key) {
    if (!vm) {
      warn("option \"" + key + "\" can only be used during instance " + 'creation with the `new` keyword.');
    }

    return defaultStrat(parent, child);
  };
}
/**
 * Helper that recursively merges two data objects together.
 */


function mergeData(to, from) {
  if (!from) {
    return to;
  }

  var key, toVal, fromVal;
  var keys = hasSymbol ? Reflect.ownKeys(from) : Object.keys(from);

  for (var i = 0; i < keys.length; i++) {
    key = keys[i]; // in case the object is already observed...

    if (key === '__ob__') {
      continue;
    }

    toVal = to[key];
    fromVal = from[key];

    if (!hasOwn(to, key)) {
      set(to, key, fromVal);
    } else if (toVal !== fromVal && isPlainObject(toVal) && isPlainObject(fromVal)) {
      mergeData(toVal, fromVal);
    }
  }

  return to;
}
/**
 * Data
 */


function mergeDataOrFn(parentVal, childVal, vm) {
  if (!vm) {
    // in a Vue.extend merge, both should be functions
    if (!childVal) {
      return parentVal;
    }

    if (!parentVal) {
      return childVal;
    } // when parentVal & childVal are both present,
    // we need to return a function that returns the
    // merged result of both functions... no need to
    // check if parentVal is a function here because
    // it has to be a function to pass previous merges.


    return function mergedDataFn() {
      return mergeData(typeof childVal === 'function' ? childVal.call(this, this) : childVal, typeof parentVal === 'function' ? parentVal.call(this, this) : parentVal);
    };
  } else {
    return function mergedInstanceDataFn() {
      // instance merge
      var instanceData = typeof childVal === 'function' ? childVal.call(vm, vm) : childVal;
      var defaultData = typeof parentVal === 'function' ? parentVal.call(vm, vm) : parentVal;

      if (instanceData) {
        return mergeData(instanceData, defaultData);
      } else {
        return defaultData;
      }
    };
  }
}

strats.data = function (parentVal, childVal, vm) {
  if (!vm) {
    if (childVal && typeof childVal !== 'function') {
      "development" !== 'production' && warn('The "data" option should be a function ' + 'that returns a per-instance value in component ' + 'definitions.', vm);
      return parentVal;
    }

    return mergeDataOrFn(parentVal, childVal);
  }

  return mergeDataOrFn(parentVal, childVal, vm);
};
/**
 * Hooks and props are merged as arrays.
 */


function mergeHook(parentVal, childVal) {
  var res = childVal ? parentVal ? parentVal.concat(childVal) : Array.isArray(childVal) ? childVal : [childVal] : parentVal;
  return res ? dedupeHooks(res) : res;
}

function dedupeHooks(hooks) {
  var res = [];

  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }

  return res;
}

LIFECYCLE_HOOKS.forEach(function (hook) {
  strats[hook] = mergeHook;
});
/**
 * Assets
 *
 * When a vm is present (instance creation), we need to do
 * a three-way merge between constructor options, instance
 * options and parent options.
 */

function mergeAssets(parentVal, childVal, vm, key) {
  var res = Object.create(parentVal || null);

  if (childVal) {
    "development" !== 'production' && assertObjectType(key, childVal, vm);
    return extend(res, childVal);
  } else {
    return res;
  }
}

ASSET_TYPES.forEach(function (type) {
  strats[type + 's'] = mergeAssets;
});
/**
 * Watchers.
 *
 * Watchers hashes should not overwrite one
 * another, so we merge them as arrays.
 */

strats.watch = function (parentVal, childVal, vm, key) {
  // work around Firefox's Object.prototype.watch...
  if (parentVal === nativeWatch) {
    parentVal = undefined;
  }

  if (childVal === nativeWatch) {
    childVal = undefined;
  }
  /* istanbul ignore if */


  if (!childVal) {
    return Object.create(parentVal || null);
  }

  if ("development" !== 'production') {
    assertObjectType(key, childVal, vm);
  }

  if (!parentVal) {
    return childVal;
  }

  var ret = {};
  extend(ret, parentVal);

  for (var key$1 in childVal) {
    var parent = ret[key$1];
    var child = childVal[key$1];

    if (parent && !Array.isArray(parent)) {
      parent = [parent];
    }

    ret[key$1] = parent ? parent.concat(child) : Array.isArray(child) ? child : [child];
  }

  return ret;
};
/**
 * Other object hashes.
 */


strats.props = strats.methods = strats.inject = strats.computed = function (parentVal, childVal, vm, key) {
  if (childVal && "development" !== 'production') {
    assertObjectType(key, childVal, vm);
  }

  if (!parentVal) {
    return childVal;
  }

  var ret = Object.create(null);
  extend(ret, parentVal);

  if (childVal) {
    extend(ret, childVal);
  }

  return ret;
};

strats.provide = mergeDataOrFn;
/**
 * Default strategy.
 */

var defaultStrat = function (parentVal, childVal) {
  return childVal === undefined ? parentVal : childVal;
};
/**
 * Validate component names
 */


function checkComponents(options) {
  for (var key in options.components) {
    validateComponentName(key);
  }
}

function validateComponentName(name) {
  if (!new RegExp("^[a-zA-Z][\\-\\.0-9_" + unicodeRegExp.source + "]*$").test(name)) {
    warn('Invalid component name: "' + name + '". Component names ' + 'should conform to valid custom element name in html5 specification.');
  }

  if (isBuiltInTag(name) || config.isReservedTag(name)) {
    warn('Do not use built-in or reserved HTML elements as component ' + 'id: ' + name);
  }
}
/**
 * Ensure all props option syntax are normalized into the
 * Object-based format.
 */


function normalizeProps(options, vm) {
  var props = options.props;

  if (!props) {
    return;
  }

  var res = {};
  var i, val, name;

  if (Array.isArray(props)) {
    i = props.length;

    while (i--) {
      val = props[i];

      if (typeof val === 'string') {
        name = camelize(val);
        res[name] = {
          type: null
        };
      } else if ("development" !== 'production') {
        warn('props must be strings when using array syntax.');
      }
    }
  } else if (isPlainObject(props)) {
    for (var key in props) {
      val = props[key];
      name = camelize(key);
      res[name] = isPlainObject(val) ? val : {
        type: val
      };
    }
  } else if ("development" !== 'production') {
    warn("Invalid value for option \"props\": expected an Array or an Object, " + "but got " + toRawType(props) + ".", vm);
  }

  options.props = res;
}
/**
 * Normalize all injections into Object-based format
 */


function normalizeInject(options, vm) {
  var inject = options.inject;

  if (!inject) {
    return;
  }

  var normalized = options.inject = {};

  if (Array.isArray(inject)) {
    for (var i = 0; i < inject.length; i++) {
      normalized[inject[i]] = {
        from: inject[i]
      };
    }
  } else if (isPlainObject(inject)) {
    for (var key in inject) {
      var val = inject[key];
      normalized[key] = isPlainObject(val) ? extend({
        from: key
      }, val) : {
        from: val
      };
    }
  } else if ("development" !== 'production') {
    warn("Invalid value for option \"inject\": expected an Array or an Object, " + "but got " + toRawType(inject) + ".", vm);
  }
}
/**
 * Normalize raw function directives into object format.
 */


function normalizeDirectives(options) {
  var dirs = options.directives;

  if (dirs) {
    for (var key in dirs) {
      var def$$1 = dirs[key];

      if (typeof def$$1 === 'function') {
        dirs[key] = {
          bind: def$$1,
          update: def$$1
        };
      }
    }
  }
}

function assertObjectType(name, value, vm) {
  if (!isPlainObject(value)) {
    warn("Invalid value for option \"" + name + "\": expected an Object, " + "but got " + toRawType(value) + ".", vm);
  }
}
/**
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 */


function mergeOptions(parent, child, vm) {
  if ("development" !== 'production') {
    checkComponents(child);
  }

  if (typeof child === 'function') {
    child = child.options;
  }

  normalizeProps(child, vm);
  normalizeInject(child, vm);
  normalizeDirectives(child); // Apply extends and mixins on the child options,
  // but only if it is a raw options object that isn't
  // the result of another mergeOptions call.
  // Only merged options has the _base property.

  if (!child._base) {
    if (child.extends) {
      parent = mergeOptions(parent, child.extends, vm);
    }

    if (child.mixins) {
      for (var i = 0, l = child.mixins.length; i < l; i++) {
        parent = mergeOptions(parent, child.mixins[i], vm);
      }
    }
  }

  var options = {};
  var key;

  for (key in parent) {
    mergeField(key);
  }

  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key);
    }
  }

  function mergeField(key) {
    var strat = strats[key] || defaultStrat;
    options[key] = strat(parent[key], child[key], vm, key);
  }

  return options;
}
/**
 * Resolve an asset.
 * This function is used because child instances need access
 * to assets defined in its ancestor chain.
 */


function resolveAsset(options, type, id, warnMissing) {
  /* istanbul ignore if */
  if (typeof id !== 'string') {
    return;
  }

  var assets = options[type]; // check local registration variations first

  if (hasOwn(assets, id)) {
    return assets[id];
  }

  var camelizedId = camelize(id);

  if (hasOwn(assets, camelizedId)) {
    return assets[camelizedId];
  }

  var PascalCaseId = capitalize(camelizedId);

  if (hasOwn(assets, PascalCaseId)) {
    return assets[PascalCaseId];
  } // fallback to prototype chain


  var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];

  if ("development" !== 'production' && warnMissing && !res) {
    warn('Failed to resolve ' + type.slice(0, -1) + ': ' + id, options);
  }

  return res;
}
/*  */


function validateProp(key, propOptions, propsData, vm) {
  var prop = propOptions[key];
  var absent = !hasOwn(propsData, key);
  var value = propsData[key]; // boolean casting

  var booleanIndex = getTypeIndex(Boolean, prop.type);

  if (booleanIndex > -1) {
    if (absent && !hasOwn(prop, 'default')) {
      value = false;
    } else if (value === '' || value === hyphenate(key)) {
      // only cast empty string / same name to boolean if
      // boolean has higher priority
      var stringIndex = getTypeIndex(String, prop.type);

      if (stringIndex < 0 || booleanIndex < stringIndex) {
        value = true;
      }
    }
  } // check default value


  if (value === undefined) {
    value = getPropDefaultValue(vm, prop, key); // since the default value is a fresh copy,
    // make sure to observe it.

    var prevShouldObserve = shouldObserve;
    toggleObserving(true);
    observe(value);
    toggleObserving(prevShouldObserve);
  }

  if ("development" !== 'production' && // skip validation for weex recycle-list child component props
  !false) {
    assertProp(prop, key, value, vm, absent);
  }

  return value;
}
/**
 * Get the default value of a prop.
 */


function getPropDefaultValue(vm, prop, key) {
  // no default, return undefined
  if (!hasOwn(prop, 'default')) {
    return undefined;
  }

  var def = prop.default; // warn against non-factory defaults for Object & Array

  if ("development" !== 'production' && isObject(def)) {
    warn('Invalid default value for prop "' + key + '": ' + 'Props with type Object/Array must use a factory function ' + 'to return the default value.', vm);
  } // the raw prop value was also undefined from previous render,
  // return previous default value to avoid unnecessary watcher trigger


  if (vm && vm.$options.propsData && vm.$options.propsData[key] === undefined && vm._props[key] !== undefined) {
    return vm._props[key];
  } // call factory function for non-Function types
  // a value is Function if its prototype is function even across different execution context


  return typeof def === 'function' && getType(prop.type) !== 'Function' ? def.call(vm) : def;
}
/**
 * Assert whether a prop is valid.
 */


function assertProp(prop, name, value, vm, absent) {
  if (prop.required && absent) {
    warn('Missing required prop: "' + name + '"', vm);
    return;
  }

  if (value == null && !prop.required) {
    return;
  }

  var type = prop.type;
  var valid = !type || type === true;
  var expectedTypes = [];

  if (type) {
    if (!Array.isArray(type)) {
      type = [type];
    }

    for (var i = 0; i < type.length && !valid; i++) {
      var assertedType = assertType(value, type[i]);
      expectedTypes.push(assertedType.expectedType || '');
      valid = assertedType.valid;
    }
  }

  if (!valid) {
    warn(getInvalidTypeMessage(name, value, expectedTypes), vm);
    return;
  }

  var validator = prop.validator;

  if (validator) {
    if (!validator(value)) {
      warn('Invalid prop: custom validator check failed for prop "' + name + '".', vm);
    }
  }
}

var simpleCheckRE = /^(String|Number|Boolean|Function|Symbol)$/;

function assertType(value, type) {
  var valid;
  var expectedType = getType(type);

  if (simpleCheckRE.test(expectedType)) {
    var t = typeof value;
    valid = t === expectedType.toLowerCase(); // for primitive wrapper objects

    if (!valid && t === 'object') {
      valid = value instanceof type;
    }
  } else if (expectedType === 'Object') {
    valid = isPlainObject(value);
  } else if (expectedType === 'Array') {
    valid = Array.isArray(value);
  } else {
    valid = value instanceof type;
  }

  return {
    valid: valid,
    expectedType: expectedType
  };
}
/**
 * Use function string name to check built-in types,
 * because a simple equality check will fail when running
 * across different vms / iframes.
 */


function getType(fn) {
  var match = fn && fn.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : '';
}

function isSameType(a, b) {
  return getType(a) === getType(b);
}

function getTypeIndex(type, expectedTypes) {
  if (!Array.isArray(expectedTypes)) {
    return isSameType(expectedTypes, type) ? 0 : -1;
  }

  for (var i = 0, len = expectedTypes.length; i < len; i++) {
    if (isSameType(expectedTypes[i], type)) {
      return i;
    }
  }

  return -1;
}

function getInvalidTypeMessage(name, value, expectedTypes) {
  var message = "Invalid prop: type check failed for prop \"" + name + "\"." + " Expected " + expectedTypes.map(capitalize).join(', ');
  var expectedType = expectedTypes[0];
  var receivedType = toRawType(value);
  var expectedValue = styleValue(value, expectedType);
  var receivedValue = styleValue(value, receivedType); // check if we need to specify expected value

  if (expectedTypes.length === 1 && isExplicable(expectedType) && !isBoolean(expectedType, receivedType)) {
    message += " with value " + expectedValue;
  }

  message += ", got " + receivedType + " "; // check if we need to specify received value

  if (isExplicable(receivedType)) {
    message += "with value " + receivedValue + ".";
  }

  return message;
}

function styleValue(value, type) {
  if (type === 'String') {
    return "\"" + value + "\"";
  } else if (type === 'Number') {
    return "" + Number(value);
  } else {
    return "" + value;
  }
}

function isExplicable(value) {
  var explicitTypes = ['string', 'number', 'boolean'];
  return explicitTypes.some(function (elem) {
    return value.toLowerCase() === elem;
  });
}

function isBoolean() {
  var args = [],
      len = arguments.length;

  while (len--) args[len] = arguments[len];

  return args.some(function (elem) {
    return elem.toLowerCase() === 'boolean';
  });
}
/*  */


function handleError(err, vm, info) {
  // Deactivate deps tracking while processing error handler to avoid possible infinite rendering.
  // See: https://github.com/vuejs/vuex/issues/1505
  pushTarget();

  try {
    if (vm) {
      var cur = vm;

      while (cur = cur.$parent) {
        var hooks = cur.$options.errorCaptured;

        if (hooks) {
          for (var i = 0; i < hooks.length; i++) {
            try {
              var capture = hooks[i].call(cur, err, vm, info) === false;

              if (capture) {
                return;
              }
            } catch (e) {
              globalHandleError(e, cur, 'errorCaptured hook');
            }
          }
        }
      }
    }

    globalHandleError(err, vm, info);
  } finally {
    popTarget();
  }
}

function invokeWithErrorHandling(handler, context, args, vm, info) {
  var res;

  try {
    res = args ? handler.apply(context, args) : handler.call(context);

    if (res && !res._isVue && isPromise(res) && !res._handled) {
      res.catch(function (e) {
        return handleError(e, vm, info + " (Promise/async)");
      }); // issue #9511
      // avoid catch triggering multiple times when nested calls

      res._handled = true;
    }
  } catch (e) {
    handleError(e, vm, info);
  }

  return res;
}

function globalHandleError(err, vm, info) {
  if (config.errorHandler) {
    try {
      return config.errorHandler.call(null, err, vm, info);
    } catch (e) {
      // if the user intentionally throws the original error in the handler,
      // do not log it twice
      if (e !== err) {
        logError(e, null, 'config.errorHandler');
      }
    }
  }

  logError(err, vm, info);
}

function logError(err, vm, info) {
  if ("development" !== 'production') {
    warn("Error in " + info + ": \"" + err.toString() + "\"", vm);
  }
  /* istanbul ignore else */


  if ((inBrowser || inWeex) && typeof console !== 'undefined') {
    console.error(err);
  } else {
    throw err;
  }
}
/*  */


var isUsingMicroTask = false;
var callbacks = [];
var pending = false;

function flushCallbacks() {
  pending = false;
  var copies = callbacks.slice(0);
  callbacks.length = 0;

  for (var i = 0; i < copies.length; i++) {
    copies[i]();
  }
} // Here we have async deferring wrappers using microtasks.
// In 2.5 we used (macro) tasks (in combination with microtasks).
// However, it has subtle problems when state is changed right before repaint
// (e.g. #6813, out-in transitions).
// Also, using (macro) tasks in event handler would cause some weird behaviors
// that cannot be circumvented (e.g. #7109, #7153, #7546, #7834, #8109).
// So we now use microtasks everywhere, again.
// A major drawback of this tradeoff is that there are some scenarios
// where microtasks have too high a priority and fire in between supposedly
// sequential events (e.g. #4521, #6690, which have workarounds)
// or even between bubbling of the same event (#6566).


var timerFunc; // The nextTick behavior leverages the microtask queue, which can be accessed
// via either native Promise.then or MutationObserver.
// MutationObserver has wider support, however it is seriously bugged in
// UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
// completely stops working after triggering a few times... so, if native
// Promise is available, we will use it:

/* istanbul ignore next, $flow-disable-line */

if (typeof Promise !== 'undefined' && isNative(Promise)) {
  var p = Promise.resolve();

  timerFunc = function () {
    p.then(flushCallbacks); // In problematic UIWebViews, Promise.then doesn't completely break, but
    // it can get stuck in a weird state where callbacks are pushed into the
    // microtask queue but the queue isn't being flushed, until the browser
    // needs to do some other work, e.g. handle a timer. Therefore we can
    // "force" the microtask queue to be flushed by adding an empty timer.

    if (isIOS) {
      setTimeout(noop);
    }
  };

  isUsingMicroTask = true;
} else if (!isIE && typeof MutationObserver !== 'undefined' && (isNative(MutationObserver) || // PhantomJS and iOS 7.x
MutationObserver.toString() === '[object MutationObserverConstructor]')) {
  // Use MutationObserver where native Promise is not available,
  // e.g. PhantomJS, iOS7, Android 4.4
  // (#6466 MutationObserver is unreliable in IE11)
  var counter = 1;
  var observer = new MutationObserver(flushCallbacks);
  var textNode = document.createTextNode(String(counter));
  observer.observe(textNode, {
    characterData: true
  });

  timerFunc = function () {
    counter = (counter + 1) % 2;
    textNode.data = String(counter);
  };

  isUsingMicroTask = true;
} else if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  // Fallback to setImmediate.
  // Techinically it leverages the (macro) task queue,
  // but it is still a better choice than setTimeout.
  timerFunc = function () {
    setImmediate(flushCallbacks);
  };
} else {
  // Fallback to setTimeout.
  timerFunc = function () {
    setTimeout(flushCallbacks, 0);
  };
}

function nextTick(cb, ctx) {
  var _resolve;

  callbacks.push(function () {
    if (cb) {
      try {
        cb.call(ctx);
      } catch (e) {
        handleError(e, ctx, 'nextTick');
      }
    } else if (_resolve) {
      _resolve(ctx);
    }
  });

  if (!pending) {
    pending = true;
    timerFunc();
  } // $flow-disable-line


  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(function (resolve) {
      _resolve = resolve;
    });
  }
}
/*  */

/* not type checking this file because flow doesn't play well with Proxy */


var initProxy;

if ("development" !== 'production') {
  var allowedGlobals = makeMap('Infinity,undefined,NaN,isFinite,isNaN,' + 'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' + 'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' + 'require' // for Webpack/Browserify
  );

  var warnNonPresent = function (target, key) {
    warn("Property or method \"" + key + "\" is not defined on the instance but " + 'referenced during render. Make sure that this property is reactive, ' + 'either in the data option, or for class-based components, by ' + 'initializing the property. ' + 'See: https://vuejs.org/v2/guide/reactivity.html#Declaring-Reactive-Properties.', target);
  };

  var warnReservedPrefix = function (target, key) {
    warn("Property \"" + key + "\" must be accessed with \"$data." + key + "\" because " + 'properties starting with "$" or "_" are not proxied in the Vue instance to ' + 'prevent conflicts with Vue internals' + 'See: https://vuejs.org/v2/api/#data', target);
  };

  var hasProxy = typeof Proxy !== 'undefined' && isNative(Proxy);

  if (hasProxy) {
    var isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta,exact');
    config.keyCodes = new Proxy(config.keyCodes, {
      set: function set(target, key, value) {
        if (isBuiltInModifier(key)) {
          warn("Avoid overwriting built-in modifier in config.keyCodes: ." + key);
          return false;
        } else {
          target[key] = value;
          return true;
        }
      }
    });
  }

  var hasHandler = {
    has: function has(target, key) {
      var has = key in target;
      var isAllowed = allowedGlobals(key) || typeof key === 'string' && key.charAt(0) === '_' && !(key in target.$data);

      if (!has && !isAllowed) {
        if (key in target.$data) {
          warnReservedPrefix(target, key);
        } else {
          warnNonPresent(target, key);
        }
      }

      return has || !isAllowed;
    }
  };
  var getHandler = {
    get: function get(target, key) {
      if (typeof key === 'string' && !(key in target)) {
        if (key in target.$data) {
          warnReservedPrefix(target, key);
        } else {
          warnNonPresent(target, key);
        }
      }

      return target[key];
    }
  };

  initProxy = function initProxy(vm) {
    if (hasProxy) {
      // determine which proxy handler to use
      var options = vm.$options;
      var handlers = options.render && options.render._withStripped ? getHandler : hasHandler;
      vm._renderProxy = new Proxy(vm, handlers);
    } else {
      vm._renderProxy = vm;
    }
  };
}
/*  */


var seenObjects = new _Set();
/**
 * Recursively traverse an object to evoke all converted
 * getters, so that every nested property inside the object
 * is collected as a "deep" dependency.
 */

function traverse(val) {
  _traverse(val, seenObjects);

  seenObjects.clear();
}

function _traverse(val, seen) {
  var i, keys;
  var isA = Array.isArray(val);

  if (!isA && !isObject(val) || Object.isFrozen(val) || val instanceof VNode) {
    return;
  }

  if (val.__ob__) {
    var depId = val.__ob__.dep.id;

    if (seen.has(depId)) {
      return;
    }

    seen.add(depId);
  }

  if (isA) {
    i = val.length;

    while (i--) {
      _traverse(val[i], seen);
    }
  } else {
    keys = Object.keys(val);
    i = keys.length;

    while (i--) {
      _traverse(val[keys[i]], seen);
    }
  }
}

var mark;
var measure;

if ("development" !== 'production') {
  var perf = inBrowser && window.performance;
  /* istanbul ignore if */

  if (perf && perf.mark && perf.measure && perf.clearMarks && perf.clearMeasures) {
    mark = function (tag) {
      return perf.mark(tag);
    };

    measure = function (name, startTag, endTag) {
      perf.measure(name, startTag, endTag);
      perf.clearMarks(startTag);
      perf.clearMarks(endTag); // perf.clearMeasures(name)
    };
  }
}
/*  */


var normalizeEvent = cached(function (name) {
  var passive = name.charAt(0) === '&';
  name = passive ? name.slice(1) : name;
  var once$$1 = name.charAt(0) === '~'; // Prefixed last, checked first

  name = once$$1 ? name.slice(1) : name;
  var capture = name.charAt(0) === '!';
  name = capture ? name.slice(1) : name;
  return {
    name: name,
    once: once$$1,
    capture: capture,
    passive: passive
  };
});

function createFnInvoker(fns, vm) {
  function invoker() {
    var arguments$1 = arguments;
    var fns = invoker.fns;

    if (Array.isArray(fns)) {
      var cloned = fns.slice();

      for (var i = 0; i < cloned.length; i++) {
        invokeWithErrorHandling(cloned[i], null, arguments$1, vm, "v-on handler");
      }
    } else {
      // return handler return value for single handlers
      return invokeWithErrorHandling(fns, null, arguments, vm, "v-on handler");
    }
  }

  invoker.fns = fns;
  return invoker;
}

function updateListeners(on, oldOn, add, remove$$1, createOnceHandler, vm) {
  var name, def$$1, cur, old, event;

  for (name in on) {
    def$$1 = cur = on[name];
    old = oldOn[name];
    event = normalizeEvent(name);

    if (isUndef(cur)) {
      "development" !== 'production' && warn("Invalid handler for event \"" + event.name + "\": got " + String(cur), vm);
    } else if (isUndef(old)) {
      if (isUndef(cur.fns)) {
        cur = on[name] = createFnInvoker(cur, vm);
      }

      if (isTrue(event.once)) {
        cur = on[name] = createOnceHandler(event.name, cur, event.capture);
      }

      add(event.name, cur, event.capture, event.passive, event.params);
    } else if (cur !== old) {
      old.fns = cur;
      on[name] = old;
    }
  }

  for (name in oldOn) {
    if (isUndef(on[name])) {
      event = normalizeEvent(name);
      remove$$1(event.name, oldOn[name], event.capture);
    }
  }
}
/*  */


function mergeVNodeHook(def, hookKey, hook) {
  if (def instanceof VNode) {
    def = def.data.hook || (def.data.hook = {});
  }

  var invoker;
  var oldHook = def[hookKey];

  function wrappedHook() {
    hook.apply(this, arguments); // important: remove merged hook to ensure it's called only once
    // and prevent memory leak

    remove(invoker.fns, wrappedHook);
  }

  if (isUndef(oldHook)) {
    // no existing hook
    invoker = createFnInvoker([wrappedHook]);
  } else {
    /* istanbul ignore if */
    if (isDef(oldHook.fns) && isTrue(oldHook.merged)) {
      // already a merged invoker
      invoker = oldHook;
      invoker.fns.push(wrappedHook);
    } else {
      // existing plain hook
      invoker = createFnInvoker([oldHook, wrappedHook]);
    }
  }

  invoker.merged = true;
  def[hookKey] = invoker;
}
/*  */


function extractPropsFromVNodeData(data, Ctor, tag) {
  // we are only extracting raw values here.
  // validation and default values are handled in the child
  // component itself.
  var propOptions = Ctor.options.props;

  if (isUndef(propOptions)) {
    return;
  }

  var res = {};
  var attrs = data.attrs;
  var props = data.props;

  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);

      if ("development" !== 'production') {
        var keyInLowerCase = key.toLowerCase();

        if (key !== keyInLowerCase && attrs && hasOwn(attrs, keyInLowerCase)) {
          tip("Prop \"" + keyInLowerCase + "\" is passed to component " + formatComponentName(tag || Ctor) + ", but the declared prop name is" + " \"" + key + "\". " + "Note that HTML attributes are case-insensitive and camelCased " + "props need to use their kebab-case equivalents when using in-DOM " + "templates. You should probably use \"" + altKey + "\" instead of \"" + key + "\".");
        }
      }

      checkProp(res, props, key, altKey, true) || checkProp(res, attrs, key, altKey, false);
    }
  }

  return res;
}

function checkProp(res, hash, key, altKey, preserve) {
  if (isDef(hash)) {
    if (hasOwn(hash, key)) {
      res[key] = hash[key];

      if (!preserve) {
        delete hash[key];
      }

      return true;
    } else if (hasOwn(hash, altKey)) {
      res[key] = hash[altKey];

      if (!preserve) {
        delete hash[altKey];
      }

      return true;
    }
  }

  return false;
}
/*  */
// The template compiler attempts to minimize the need for normalization by
// statically analyzing the template at compile time.
//
// For plain HTML markup, normalization can be completely skipped because the
// generated render function is guaranteed to return Array<VNode>. There are
// two cases where extra normalization is needed:
// 1. When the children contains components - because a functional component
// may return an Array instead of a single root. In this case, just a simple
// normalization is needed - if any child is an Array, we flatten the whole
// thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
// because functional components already normalize their own children.


function simpleNormalizeChildren(children) {
  for (var i = 0; i < children.length; i++) {
    if (Array.isArray(children[i])) {
      return Array.prototype.concat.apply([], children);
    }
  }

  return children;
} // 2. When the children contains constructs that always generated nested Arrays,
// e.g. <template>, <slot>, v-for, or when the children is provided by user
// with hand-written render functions / JSX. In such cases a full normalization
// is needed to cater to all possible types of children values.


function normalizeChildren(children) {
  return isPrimitive(children) ? [createTextVNode(children)] : Array.isArray(children) ? normalizeArrayChildren(children) : undefined;
}

function isTextNode(node) {
  return isDef(node) && isDef(node.text) && isFalse(node.isComment);
}

function normalizeArrayChildren(children, nestedIndex) {
  var res = [];
  var i, c, lastIndex, last;

  for (i = 0; i < children.length; i++) {
    c = children[i];

    if (isUndef(c) || typeof c === 'boolean') {
      continue;
    }

    lastIndex = res.length - 1;
    last = res[lastIndex]; //  nested

    if (Array.isArray(c)) {
      if (c.length > 0) {
        c = normalizeArrayChildren(c, (nestedIndex || '') + "_" + i); // merge adjacent text nodes

        if (isTextNode(c[0]) && isTextNode(last)) {
          res[lastIndex] = createTextVNode(last.text + c[0].text);
          c.shift();
        }

        res.push.apply(res, c);
      }
    } else if (isPrimitive(c)) {
      if (isTextNode(last)) {
        // merge adjacent text nodes
        // this is necessary for SSR hydration because text nodes are
        // essentially merged when rendered to HTML strings
        res[lastIndex] = createTextVNode(last.text + c);
      } else if (c !== '') {
        // convert primitive to vnode
        res.push(createTextVNode(c));
      }
    } else {
      if (isTextNode(c) && isTextNode(last)) {
        // merge adjacent text nodes
        res[lastIndex] = createTextVNode(last.text + c.text);
      } else {
        // default key for nested array children (likely generated by v-for)
        if (isTrue(children._isVList) && isDef(c.tag) && isUndef(c.key) && isDef(nestedIndex)) {
          c.key = "__vlist" + nestedIndex + "_" + i + "__";
        }

        res.push(c);
      }
    }
  }

  return res;
}
/*  */


function initProvide(vm) {
  var provide = vm.$options.provide;

  if (provide) {
    vm._provided = typeof provide === 'function' ? provide.call(vm) : provide;
  }
}

function initInjections(vm) {
  var result = resolveInject(vm.$options.inject, vm);

  if (result) {
    toggleObserving(false);
    Object.keys(result).forEach(function (key) {
      /* istanbul ignore else */
      if ("development" !== 'production') {
        defineReactive$$1(vm, key, result[key], function () {
          warn("Avoid mutating an injected value directly since the changes will be " + "overwritten whenever the provided component re-renders. " + "injection being mutated: \"" + key + "\"", vm);
        });
      } else {
        defineReactive$$1(vm, key, result[key]);
      }
    });
    toggleObserving(true);
  }
}

function resolveInject(inject, vm) {
  if (inject) {
    // inject is :any because flow is not smart enough to figure out cached
    var result = Object.create(null);
    var keys = hasSymbol ? Reflect.ownKeys(inject) : Object.keys(inject);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i]; // #6574 in case the inject object is observed...

      if (key === '__ob__') {
        continue;
      }

      var provideKey = inject[key].from;
      var source = vm;

      while (source) {
        if (source._provided && hasOwn(source._provided, provideKey)) {
          result[key] = source._provided[provideKey];
          break;
        }

        source = source.$parent;
      }

      if (!source) {
        if ('default' in inject[key]) {
          var provideDefault = inject[key].default;
          result[key] = typeof provideDefault === 'function' ? provideDefault.call(vm) : provideDefault;
        } else if ("development" !== 'production') {
          warn("Injection \"" + key + "\" not found", vm);
        }
      }
    }

    return result;
  }
}
/*  */

/**
 * Runtime helper for resolving raw children VNodes into a slot object.
 */


function resolveSlots(children, context) {
  if (!children || !children.length) {
    return {};
  }

  var slots = {};

  for (var i = 0, l = children.length; i < l; i++) {
    var child = children[i];
    var data = child.data; // remove slot attribute if the node is resolved as a Vue slot node

    if (data && data.attrs && data.attrs.slot) {
      delete data.attrs.slot;
    } // named slots should only be respected if the vnode was rendered in the
    // same context.


    if ((child.context === context || child.fnContext === context) && data && data.slot != null) {
      var name = data.slot;
      var slot = slots[name] || (slots[name] = []);

      if (child.tag === 'template') {
        slot.push.apply(slot, child.children || []);
      } else {
        slot.push(child);
      }
    } else {
      (slots.default || (slots.default = [])).push(child);
    }
  } // ignore slots that contains only whitespace


  for (var name$1 in slots) {
    if (slots[name$1].every(isWhitespace)) {
      delete slots[name$1];
    }
  }

  return slots;
}

function isWhitespace(node) {
  return node.isComment && !node.asyncFactory || node.text === ' ';
}
/*  */


function normalizeScopedSlots(slots, normalSlots, prevSlots) {
  var res;
  var hasNormalSlots = Object.keys(normalSlots).length > 0;
  var isStable = slots ? !!slots.$stable : !hasNormalSlots;
  var key = slots && slots.$key;

  if (!slots) {
    res = {};
  } else if (slots._normalized) {
    // fast path 1: child component re-render only, parent did not change
    return slots._normalized;
  } else if (isStable && prevSlots && prevSlots !== emptyObject && key === prevSlots.$key && !hasNormalSlots && !prevSlots.$hasNormal) {
    // fast path 2: stable scoped slots w/ no normal slots to proxy,
    // only need to normalize once
    return prevSlots;
  } else {
    res = {};

    for (var key$1 in slots) {
      if (slots[key$1] && key$1[0] !== '$') {
        res[key$1] = normalizeScopedSlot(normalSlots, key$1, slots[key$1]);
      }
    }
  } // expose normal slots on scopedSlots


  for (var key$2 in normalSlots) {
    if (!(key$2 in res)) {
      res[key$2] = proxyNormalSlot(normalSlots, key$2);
    }
  } // avoriaz seems to mock a non-extensible $scopedSlots object
  // and when that is passed down this would cause an error


  if (slots && Object.isExtensible(slots)) {
    slots._normalized = res;
  }

  def(res, '$stable', isStable);
  def(res, '$key', key);
  def(res, '$hasNormal', hasNormalSlots);
  return res;
}

function normalizeScopedSlot(normalSlots, key, fn) {
  var normalized = function () {
    var res = arguments.length ? fn.apply(null, arguments) : fn({});
    res = res && typeof res === 'object' && !Array.isArray(res) ? [res] // single vnode
    : normalizeChildren(res);
    return res && (res.length === 0 || res.length === 1 && res[0].isComment // #9658
    ) ? undefined : res;
  }; // this is a slot using the new v-slot syntax without scope. although it is
  // compiled as a scoped slot, render fn users would expect it to be present
  // on this.$slots because the usage is semantically a normal slot.


  if (fn.proxy) {
    Object.defineProperty(normalSlots, key, {
      get: normalized,
      enumerable: true,
      configurable: true
    });
  }

  return normalized;
}

function proxyNormalSlot(slots, key) {
  return function () {
    return slots[key];
  };
}
/*  */

/**
 * Runtime helper for rendering v-for lists.
 */


function renderList(val, render) {
  var ret, i, l, keys, key;

  if (Array.isArray(val) || typeof val === 'string') {
    ret = new Array(val.length);

    for (i = 0, l = val.length; i < l; i++) {
      ret[i] = render(val[i], i);
    }
  } else if (typeof val === 'number') {
    ret = new Array(val);

    for (i = 0; i < val; i++) {
      ret[i] = render(i + 1, i);
    }
  } else if (isObject(val)) {
    if (hasSymbol && val[Symbol.iterator]) {
      ret = [];
      var iterator = val[Symbol.iterator]();
      var result = iterator.next();

      while (!result.done) {
        ret.push(render(result.value, ret.length));
        result = iterator.next();
      }
    } else {
      keys = Object.keys(val);
      ret = new Array(keys.length);

      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[i] = render(val[key], key, i);
      }
    }
  }

  if (!isDef(ret)) {
    ret = [];
  }

  ret._isVList = true;
  return ret;
}
/*  */

/**
 * Runtime helper for rendering <slot>
 */


function renderSlot(name, fallback, props, bindObject) {
  var scopedSlotFn = this.$scopedSlots[name];
  var nodes;

  if (scopedSlotFn) {
    // scoped slot
    props = props || {};

    if (bindObject) {
      if ("development" !== 'production' && !isObject(bindObject)) {
        warn('slot v-bind without argument expects an Object', this);
      }

      props = extend(extend({}, bindObject), props);
    }

    nodes = scopedSlotFn(props) || fallback;
  } else {
    nodes = this.$slots[name] || fallback;
  }

  var target = props && props.slot;

  if (target) {
    return this.$createElement('template', {
      slot: target
    }, nodes);
  } else {
    return nodes;
  }
}
/*  */

/**
 * Runtime helper for resolving filters
 */


function resolveFilter(id) {
  return resolveAsset(this.$options, 'filters', id, true) || identity;
}
/*  */


function isKeyNotMatch(expect, actual) {
  if (Array.isArray(expect)) {
    return expect.indexOf(actual) === -1;
  } else {
    return expect !== actual;
  }
}
/**
 * Runtime helper for checking keyCodes from config.
 * exposed as Vue.prototype._k
 * passing in eventKeyName as last argument separately for backwards compat
 */


function checkKeyCodes(eventKeyCode, key, builtInKeyCode, eventKeyName, builtInKeyName) {
  var mappedKeyCode = config.keyCodes[key] || builtInKeyCode;

  if (builtInKeyName && eventKeyName && !config.keyCodes[key]) {
    return isKeyNotMatch(builtInKeyName, eventKeyName);
  } else if (mappedKeyCode) {
    return isKeyNotMatch(mappedKeyCode, eventKeyCode);
  } else if (eventKeyName) {
    return hyphenate(eventKeyName) !== key;
  }
}
/*  */

/**
 * Runtime helper for merging v-bind="object" into a VNode's data.
 */


function bindObjectProps(data, tag, value, asProp, isSync) {
  if (value) {
    if (!isObject(value)) {
      "development" !== 'production' && warn('v-bind without argument expects an Object or Array value', this);
    } else {
      if (Array.isArray(value)) {
        value = toObject(value);
      }

      var hash;

      var loop = function (key) {
        if (key === 'class' || key === 'style' || isReservedAttribute(key)) {
          hash = data;
        } else {
          var type = data.attrs && data.attrs.type;
          hash = asProp || config.mustUseProp(tag, type, key) ? data.domProps || (data.domProps = {}) : data.attrs || (data.attrs = {});
        }

        var camelizedKey = camelize(key);
        var hyphenatedKey = hyphenate(key);

        if (!(camelizedKey in hash) && !(hyphenatedKey in hash)) {
          hash[key] = value[key];

          if (isSync) {
            var on = data.on || (data.on = {});

            on["update:" + key] = function ($event) {
              value[key] = $event;
            };
          }
        }
      };

      for (var key in value) loop(key);
    }
  }

  return data;
}
/*  */

/**
 * Runtime helper for rendering static trees.
 */


function renderStatic(index, isInFor) {
  var cached = this._staticTrees || (this._staticTrees = []);
  var tree = cached[index]; // if has already-rendered static tree and not inside v-for,
  // we can reuse the same tree.

  if (tree && !isInFor) {
    return tree;
  } // otherwise, render a fresh tree.


  tree = cached[index] = this.$options.staticRenderFns[index].call(this._renderProxy, null, this // for render fns generated for functional component templates
  );
  markStatic(tree, "__static__" + index, false);
  return tree;
}
/**
 * Runtime helper for v-once.
 * Effectively it means marking the node as static with a unique key.
 */


function markOnce(tree, index, key) {
  markStatic(tree, "__once__" + index + (key ? "_" + key : ""), true);
  return tree;
}

function markStatic(tree, key, isOnce) {
  if (Array.isArray(tree)) {
    for (var i = 0; i < tree.length; i++) {
      if (tree[i] && typeof tree[i] !== 'string') {
        markStaticNode(tree[i], key + "_" + i, isOnce);
      }
    }
  } else {
    markStaticNode(tree, key, isOnce);
  }
}

function markStaticNode(node, key, isOnce) {
  node.isStatic = true;
  node.key = key;
  node.isOnce = isOnce;
}
/*  */


function bindObjectListeners(data, value) {
  if (value) {
    if (!isPlainObject(value)) {
      "development" !== 'production' && warn('v-on without argument expects an Object value', this);
    } else {
      var on = data.on = data.on ? extend({}, data.on) : {};

      for (var key in value) {
        var existing = on[key];
        var ours = value[key];
        on[key] = existing ? [].concat(existing, ours) : ours;
      }
    }
  }

  return data;
}
/*  */


function resolveScopedSlots(fns, // see flow/vnode
res, // the following are added in 2.6
hasDynamicKeys, contentHashKey) {
  res = res || {
    $stable: !hasDynamicKeys
  };

  for (var i = 0; i < fns.length; i++) {
    var slot = fns[i];

    if (Array.isArray(slot)) {
      resolveScopedSlots(slot, res, hasDynamicKeys);
    } else if (slot) {
      // marker for reverse proxying v-slot without scope on this.$slots
      if (slot.proxy) {
        slot.fn.proxy = true;
      }

      res[slot.key] = slot.fn;
    }
  }

  if (contentHashKey) {
    res.$key = contentHashKey;
  }

  return res;
}
/*  */


function bindDynamicKeys(baseObj, values) {
  for (var i = 0; i < values.length; i += 2) {
    var key = values[i];

    if (typeof key === 'string' && key) {
      baseObj[values[i]] = values[i + 1];
    } else if ("development" !== 'production' && key !== '' && key !== null) {
      // null is a speical value for explicitly removing a binding
      warn("Invalid value for dynamic directive argument (expected string or null): " + key, this);
    }
  }

  return baseObj;
} // helper to dynamically append modifier runtime markers to event names.
// ensure only append when value is already string, otherwise it will be cast
// to string and cause the type check to miss.


function prependModifier(value, symbol) {
  return typeof value === 'string' ? symbol + value : value;
}
/*  */


function installRenderHelpers(target) {
  target._o = markOnce;
  target._n = toNumber;
  target._s = toString;
  target._l = renderList;
  target._t = renderSlot;
  target._q = looseEqual;
  target._i = looseIndexOf;
  target._m = renderStatic;
  target._f = resolveFilter;
  target._k = checkKeyCodes;
  target._b = bindObjectProps;
  target._v = createTextVNode;
  target._e = createEmptyVNode;
  target._u = resolveScopedSlots;
  target._g = bindObjectListeners;
  target._d = bindDynamicKeys;
  target._p = prependModifier;
}
/*  */


function FunctionalRenderContext(data, props, children, parent, Ctor) {
  var this$1 = this;
  var options = Ctor.options; // ensure the createElement function in functional components
  // gets a unique context - this is necessary for correct named slot check

  var contextVm;

  if (hasOwn(parent, '_uid')) {
    contextVm = Object.create(parent); // $flow-disable-line

    contextVm._original = parent;
  } else {
    // the context vm passed in is a functional context as well.
    // in this case we want to make sure we are able to get a hold to the
    // real context instance.
    contextVm = parent; // $flow-disable-line

    parent = parent._original;
  }

  var isCompiled = isTrue(options._compiled);
  var needNormalization = !isCompiled;
  this.data = data;
  this.props = props;
  this.children = children;
  this.parent = parent;
  this.listeners = data.on || emptyObject;
  this.injections = resolveInject(options.inject, parent);

  this.slots = function () {
    if (!this$1.$slots) {
      normalizeScopedSlots(data.scopedSlots, this$1.$slots = resolveSlots(children, parent));
    }

    return this$1.$slots;
  };

  Object.defineProperty(this, 'scopedSlots', {
    enumerable: true,
    get: function get() {
      return normalizeScopedSlots(data.scopedSlots, this.slots());
    }
  }); // support for compiled functional template

  if (isCompiled) {
    // exposing $options for renderStatic()
    this.$options = options; // pre-resolve slots for renderSlot()

    this.$slots = this.slots();
    this.$scopedSlots = normalizeScopedSlots(data.scopedSlots, this.$slots);
  }

  if (options._scopeId) {
    this._c = function (a, b, c, d) {
      var vnode = createElement(contextVm, a, b, c, d, needNormalization);

      if (vnode && !Array.isArray(vnode)) {
        vnode.fnScopeId = options._scopeId;
        vnode.fnContext = parent;
      }

      return vnode;
    };
  } else {
    this._c = function (a, b, c, d) {
      return createElement(contextVm, a, b, c, d, needNormalization);
    };
  }
}

installRenderHelpers(FunctionalRenderContext.prototype);

function createFunctionalComponent(Ctor, propsData, data, contextVm, children) {
  var options = Ctor.options;
  var props = {};
  var propOptions = options.props;

  if (isDef(propOptions)) {
    for (var key in propOptions) {
      props[key] = validateProp(key, propOptions, propsData || emptyObject);
    }
  } else {
    if (isDef(data.attrs)) {
      mergeProps(props, data.attrs);
    }

    if (isDef(data.props)) {
      mergeProps(props, data.props);
    }
  }

  var renderContext = new FunctionalRenderContext(data, props, children, contextVm, Ctor);
  var vnode = options.render.call(null, renderContext._c, renderContext);

  if (vnode instanceof VNode) {
    return cloneAndMarkFunctionalResult(vnode, data, renderContext.parent, options, renderContext);
  } else if (Array.isArray(vnode)) {
    var vnodes = normalizeChildren(vnode) || [];
    var res = new Array(vnodes.length);

    for (var i = 0; i < vnodes.length; i++) {
      res[i] = cloneAndMarkFunctionalResult(vnodes[i], data, renderContext.parent, options, renderContext);
    }

    return res;
  }
}

function cloneAndMarkFunctionalResult(vnode, data, contextVm, options, renderContext) {
  // #7817 clone node before setting fnContext, otherwise if the node is reused
  // (e.g. it was from a cached normal slot) the fnContext causes named slots
  // that should not be matched to match.
  var clone = cloneVNode(vnode);
  clone.fnContext = contextVm;
  clone.fnOptions = options;

  if ("development" !== 'production') {
    (clone.devtoolsMeta = clone.devtoolsMeta || {}).renderContext = renderContext;
  }

  if (data.slot) {
    (clone.data || (clone.data = {})).slot = data.slot;
  }

  return clone;
}

function mergeProps(to, from) {
  for (var key in from) {
    to[camelize(key)] = from[key];
  }
}
/*  */

/*  */

/*  */

/*  */
// inline hooks to be invoked on component VNodes during patch


var componentVNodeHooks = {
  init: function init(vnode, hydrating) {
    if (vnode.componentInstance && !vnode.componentInstance._isDestroyed && vnode.data.keepAlive) {
      // kept-alive components, treat as a patch
      var mountedNode = vnode; // work around flow

      componentVNodeHooks.prepatch(mountedNode, mountedNode);
    } else {
      var child = vnode.componentInstance = createComponentInstanceForVnode(vnode, activeInstance);
      child.$mount(hydrating ? vnode.elm : undefined, hydrating);
    }
  },
  prepatch: function prepatch(oldVnode, vnode) {
    var options = vnode.componentOptions;
    var child = vnode.componentInstance = oldVnode.componentInstance;
    updateChildComponent(child, options.propsData, // updated props
    options.listeners, // updated listeners
    vnode, // new parent vnode
    options.children // new children
    );
  },
  insert: function insert(vnode) {
    var context = vnode.context;
    var componentInstance = vnode.componentInstance;

    if (!componentInstance._isMounted) {
      componentInstance._isMounted = true;
      callHook(componentInstance, 'mounted');
    }

    if (vnode.data.keepAlive) {
      if (context._isMounted) {
        // vue-router#1212
        // During updates, a kept-alive component's child components may
        // change, so directly walking the tree here may call activated hooks
        // on incorrect children. Instead we push them into a queue which will
        // be processed after the whole patch process ended.
        queueActivatedComponent(componentInstance);
      } else {
        activateChildComponent(componentInstance, true
        /* direct */
        );
      }
    }
  },
  destroy: function destroy(vnode) {
    var componentInstance = vnode.componentInstance;

    if (!componentInstance._isDestroyed) {
      if (!vnode.data.keepAlive) {
        componentInstance.$destroy();
      } else {
        deactivateChildComponent(componentInstance, true
        /* direct */
        );
      }
    }
  }
};
var hooksToMerge = Object.keys(componentVNodeHooks);

function createComponent(Ctor, data, context, children, tag) {
  if (isUndef(Ctor)) {
    return;
  }

  var baseCtor = context.$options._base; // plain options object: turn it into a constructor

  if (isObject(Ctor)) {
    Ctor = baseCtor.extend(Ctor);
  } // if at this stage it's not a constructor or an async component factory,
  // reject.


  if (typeof Ctor !== 'function') {
    if ("development" !== 'production') {
      warn("Invalid Component definition: " + String(Ctor), context);
    }

    return;
  } // async component


  var asyncFactory;

  if (isUndef(Ctor.cid)) {
    asyncFactory = Ctor;
    Ctor = resolveAsyncComponent(asyncFactory, baseCtor);

    if (Ctor === undefined) {
      // return a placeholder node for async component, which is rendered
      // as a comment node but preserves all the raw information for the node.
      // the information will be used for async server-rendering and hydration.
      return createAsyncPlaceholder(asyncFactory, data, context, children, tag);
    }
  }

  data = data || {}; // resolve constructor options in case global mixins are applied after
  // component constructor creation

  resolveConstructorOptions(Ctor); // transform component v-model data into props & events

  if (isDef(data.model)) {
    transformModel(Ctor.options, data);
  } // extract props


  var propsData = extractPropsFromVNodeData(data, Ctor, tag); // functional component

  if (isTrue(Ctor.options.functional)) {
    return createFunctionalComponent(Ctor, propsData, data, context, children);
  } // extract listeners, since these needs to be treated as
  // child component listeners instead of DOM listeners


  var listeners = data.on; // replace with listeners with .native modifier
  // so it gets processed during parent component patch.

  data.on = data.nativeOn;

  if (isTrue(Ctor.options.abstract)) {
    // abstract components do not keep anything
    // other than props & listeners & slot
    // work around flow
    var slot = data.slot;
    data = {};

    if (slot) {
      data.slot = slot;
    }
  } // install component management hooks onto the placeholder node


  installComponentHooks(data); // return a placeholder vnode

  var name = Ctor.options.name || tag;
  var vnode = new VNode("vue-component-" + Ctor.cid + (name ? "-" + name : ''), data, undefined, undefined, undefined, context, {
    Ctor: Ctor,
    propsData: propsData,
    listeners: listeners,
    tag: tag,
    children: children
  }, asyncFactory);
  return vnode;
}

function createComponentInstanceForVnode(vnode, // we know it's MountedComponentVNode but flow doesn't
parent // activeInstance in lifecycle state
) {
  var options = {
    _isComponent: true,
    _parentVnode: vnode,
    parent: parent
  }; // check inline-template render functions

  var inlineTemplate = vnode.data.inlineTemplate;

  if (isDef(inlineTemplate)) {
    options.render = inlineTemplate.render;
    options.staticRenderFns = inlineTemplate.staticRenderFns;
  }

  return new vnode.componentOptions.Ctor(options);
}

function installComponentHooks(data) {
  var hooks = data.hook || (data.hook = {});

  for (var i = 0; i < hooksToMerge.length; i++) {
    var key = hooksToMerge[i];
    var existing = hooks[key];
    var toMerge = componentVNodeHooks[key];

    if (existing !== toMerge && !(existing && existing._merged)) {
      hooks[key] = existing ? mergeHook$1(toMerge, existing) : toMerge;
    }
  }
}

function mergeHook$1(f1, f2) {
  var merged = function (a, b) {
    // flow complains about extra args which is why we use any
    f1(a, b);
    f2(a, b);
  };

  merged._merged = true;
  return merged;
} // transform component v-model info (value and callback) into
// prop and event handler respectively.


function transformModel(options, data) {
  var prop = options.model && options.model.prop || 'value';
  var event = options.model && options.model.event || 'input';
  (data.attrs || (data.attrs = {}))[prop] = data.model.value;
  var on = data.on || (data.on = {});
  var existing = on[event];
  var callback = data.model.callback;

  if (isDef(existing)) {
    if (Array.isArray(existing) ? existing.indexOf(callback) === -1 : existing !== callback) {
      on[event] = [callback].concat(existing);
    }
  } else {
    on[event] = callback;
  }
}
/*  */


var SIMPLE_NORMALIZE = 1;
var ALWAYS_NORMALIZE = 2; // wrapper function for providing a more flexible interface
// without getting yelled at by flow

function createElement(context, tag, data, children, normalizationType, alwaysNormalize) {
  if (Array.isArray(data) || isPrimitive(data)) {
    normalizationType = children;
    children = data;
    data = undefined;
  }

  if (isTrue(alwaysNormalize)) {
    normalizationType = ALWAYS_NORMALIZE;
  }

  return _createElement(context, tag, data, children, normalizationType);
}

function _createElement(context, tag, data, children, normalizationType) {
  if (isDef(data) && isDef(data.__ob__)) {
    "development" !== 'production' && warn("Avoid using observed data object as vnode data: " + JSON.stringify(data) + "\n" + 'Always create fresh vnode data objects in each render!', context);
    return createEmptyVNode();
  } // object syntax in v-bind


  if (isDef(data) && isDef(data.is)) {
    tag = data.is;
  }

  if (!tag) {
    // in case of component :is set to falsy value
    return createEmptyVNode();
  } // warn against non-primitive key


  if ("development" !== 'production' && isDef(data) && isDef(data.key) && !isPrimitive(data.key)) {
    {
      warn('Avoid using non-primitive value as key, ' + 'use string/number value instead.', context);
    }
  } // support single function children as default scoped slot


  if (Array.isArray(children) && typeof children[0] === 'function') {
    data = data || {};
    data.scopedSlots = {
      default: children[0]
    };
    children.length = 0;
  }

  if (normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children);
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    children = simpleNormalizeChildren(children);
  }

  var vnode, ns;

  if (typeof tag === 'string') {
    var Ctor;
    ns = context.$vnode && context.$vnode.ns || config.getTagNamespace(tag);

    if (config.isReservedTag(tag)) {
      // platform built-in elements
      vnode = new VNode(config.parsePlatformTagName(tag), data, children, undefined, undefined, context);
    } else if ((!data || !data.pre) && isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
      // component
      vnode = createComponent(Ctor, data, context, children, tag);
    } else {
      // unknown or unlisted namespaced elements
      // check at runtime because it may get assigned a namespace when its
      // parent normalizes children
      vnode = new VNode(tag, data, children, undefined, undefined, context);
    }
  } else {
    // direct component options / constructor
    vnode = createComponent(tag, data, context, children);
  }

  if (Array.isArray(vnode)) {
    return vnode;
  } else if (isDef(vnode)) {
    if (isDef(ns)) {
      applyNS(vnode, ns);
    }

    if (isDef(data)) {
      registerDeepBindings(data);
    }

    return vnode;
  } else {
    return createEmptyVNode();
  }
}

function applyNS(vnode, ns, force) {
  vnode.ns = ns;

  if (vnode.tag === 'foreignObject') {
    // use default namespace inside foreignObject
    ns = undefined;
    force = true;
  }

  if (isDef(vnode.children)) {
    for (var i = 0, l = vnode.children.length; i < l; i++) {
      var child = vnode.children[i];

      if (isDef(child.tag) && (isUndef(child.ns) || isTrue(force) && child.tag !== 'svg')) {
        applyNS(child, ns, force);
      }
    }
  }
} // ref #5318
// necessary to ensure parent re-render when deep bindings like :style and
// :class are used on slot nodes


function registerDeepBindings(data) {
  if (isObject(data.style)) {
    traverse(data.style);
  }

  if (isObject(data.class)) {
    traverse(data.class);
  }
}
/*  */


function initRender(vm) {
  vm._vnode = null; // the root of the child tree

  vm._staticTrees = null; // v-once cached trees

  var options = vm.$options;
  var parentVnode = vm.$vnode = options._parentVnode; // the placeholder node in parent tree

  var renderContext = parentVnode && parentVnode.context;
  vm.$slots = resolveSlots(options._renderChildren, renderContext);
  vm.$scopedSlots = emptyObject; // bind the createElement fn to this instance
  // so that we get proper render context inside it.
  // args order: tag, data, children, normalizationType, alwaysNormalize
  // internal version is used by render functions compiled from templates

  vm._c = function (a, b, c, d) {
    return createElement(vm, a, b, c, d, false);
  }; // normalization is always applied for the public version, used in
  // user-written render functions.


  vm.$createElement = function (a, b, c, d) {
    return createElement(vm, a, b, c, d, true);
  }; // $attrs & $listeners are exposed for easier HOC creation.
  // they need to be reactive so that HOCs using them are always updated


  var parentData = parentVnode && parentVnode.data;
  /* istanbul ignore else */

  if ("development" !== 'production') {
    defineReactive$$1(vm, '$attrs', parentData && parentData.attrs || emptyObject, function () {
      !isUpdatingChildComponent && warn("$attrs is readonly.", vm);
    }, true);
    defineReactive$$1(vm, '$listeners', options._parentListeners || emptyObject, function () {
      !isUpdatingChildComponent && warn("$listeners is readonly.", vm);
    }, true);
  } else {
    defineReactive$$1(vm, '$attrs', parentData && parentData.attrs || emptyObject, null, true);
    defineReactive$$1(vm, '$listeners', options._parentListeners || emptyObject, null, true);
  }
}

var currentRenderingInstance = null;

function renderMixin(Vue) {
  // install runtime convenience helpers
  installRenderHelpers(Vue.prototype);

  Vue.prototype.$nextTick = function (fn) {
    return nextTick(fn, this);
  };

  Vue.prototype._render = function () {
    var vm = this;
    var ref = vm.$options;
    var render = ref.render;
    var _parentVnode = ref._parentVnode;

    if (_parentVnode) {
      vm.$scopedSlots = normalizeScopedSlots(_parentVnode.data.scopedSlots, vm.$slots, vm.$scopedSlots);
    } // set parent vnode. this allows render functions to have access
    // to the data on the placeholder node.


    vm.$vnode = _parentVnode; // render self

    var vnode;

    try {
      // There's no need to maintain a stack becaues all render fns are called
      // separately from one another. Nested component's render fns are called
      // when parent component is patched.
      currentRenderingInstance = vm;
      vnode = render.call(vm._renderProxy, vm.$createElement);
    } catch (e) {
      handleError(e, vm, "render"); // return error render result,
      // or previous vnode to prevent render error causing blank component

      /* istanbul ignore else */

      if ("development" !== 'production' && vm.$options.renderError) {
        try {
          vnode = vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e);
        } catch (e) {
          handleError(e, vm, "renderError");
          vnode = vm._vnode;
        }
      } else {
        vnode = vm._vnode;
      }
    } finally {
      currentRenderingInstance = null;
    } // if the returned array contains only a single node, allow it


    if (Array.isArray(vnode) && vnode.length === 1) {
      vnode = vnode[0];
    } // return empty vnode in case the render function errored out


    if (!(vnode instanceof VNode)) {
      if ("development" !== 'production' && Array.isArray(vnode)) {
        warn('Multiple root nodes returned from render function. Render function ' + 'should return a single root node.', vm);
      }

      vnode = createEmptyVNode();
    } // set parent


    vnode.parent = _parentVnode;
    return vnode;
  };
}
/*  */


function ensureCtor(comp, base) {
  if (comp.__esModule || hasSymbol && comp[Symbol.toStringTag] === 'Module') {
    comp = comp.default;
  }

  return isObject(comp) ? base.extend(comp) : comp;
}

function createAsyncPlaceholder(factory, data, context, children, tag) {
  var node = createEmptyVNode();
  node.asyncFactory = factory;
  node.asyncMeta = {
    data: data,
    context: context,
    children: children,
    tag: tag
  };
  return node;
}

function resolveAsyncComponent(factory, baseCtor) {
  if (isTrue(factory.error) && isDef(factory.errorComp)) {
    return factory.errorComp;
  }

  if (isDef(factory.resolved)) {
    return factory.resolved;
  }

  var owner = currentRenderingInstance;

  if (owner && isDef(factory.owners) && factory.owners.indexOf(owner) === -1) {
    // already pending
    factory.owners.push(owner);
  }

  if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
    return factory.loadingComp;
  }

  if (owner && !isDef(factory.owners)) {
    var owners = factory.owners = [owner];
    var sync = true;
    var timerLoading = null;
    var timerTimeout = null;
    owner.$on('hook:destroyed', function () {
      return remove(owners, owner);
    });

    var forceRender = function (renderCompleted) {
      for (var i = 0, l = owners.length; i < l; i++) {
        owners[i].$forceUpdate();
      }

      if (renderCompleted) {
        owners.length = 0;

        if (timerLoading !== null) {
          clearTimeout(timerLoading);
          timerLoading = null;
        }

        if (timerTimeout !== null) {
          clearTimeout(timerTimeout);
          timerTimeout = null;
        }
      }
    };

    var resolve = once(function (res) {
      // cache resolved
      factory.resolved = ensureCtor(res, baseCtor); // invoke callbacks only if this is not a synchronous resolve
      // (async resolves are shimmed as synchronous during SSR)

      if (!sync) {
        forceRender(true);
      } else {
        owners.length = 0;
      }
    });
    var reject = once(function (reason) {
      "development" !== 'production' && warn("Failed to resolve async component: " + String(factory) + (reason ? "\nReason: " + reason : ''));

      if (isDef(factory.errorComp)) {
        factory.error = true;
        forceRender(true);
      }
    });
    var res = factory(resolve, reject);

    if (isObject(res)) {
      if (isPromise(res)) {
        // () => Promise
        if (isUndef(factory.resolved)) {
          res.then(resolve, reject);
        }
      } else if (isPromise(res.component)) {
        res.component.then(resolve, reject);

        if (isDef(res.error)) {
          factory.errorComp = ensureCtor(res.error, baseCtor);
        }

        if (isDef(res.loading)) {
          factory.loadingComp = ensureCtor(res.loading, baseCtor);

          if (res.delay === 0) {
            factory.loading = true;
          } else {
            timerLoading = setTimeout(function () {
              timerLoading = null;

              if (isUndef(factory.resolved) && isUndef(factory.error)) {
                factory.loading = true;
                forceRender(false);
              }
            }, res.delay || 200);
          }
        }

        if (isDef(res.timeout)) {
          timerTimeout = setTimeout(function () {
            timerTimeout = null;

            if (isUndef(factory.resolved)) {
              reject("development" !== 'production' ? "timeout (" + res.timeout + "ms)" : null);
            }
          }, res.timeout);
        }
      }
    }

    sync = false; // return in case resolved synchronously

    return factory.loading ? factory.loadingComp : factory.resolved;
  }
}
/*  */


function isAsyncPlaceholder(node) {
  return node.isComment && node.asyncFactory;
}
/*  */


function getFirstComponentChild(children) {
  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      var c = children[i];

      if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
        return c;
      }
    }
  }
}
/*  */

/*  */


function initEvents(vm) {
  vm._events = Object.create(null);
  vm._hasHookEvent = false; // init parent attached events

  var listeners = vm.$options._parentListeners;

  if (listeners) {
    updateComponentListeners(vm, listeners);
  }
}

var target;

function add(event, fn) {
  target.$on(event, fn);
}

function remove$1(event, fn) {
  target.$off(event, fn);
}

function createOnceHandler(event, fn) {
  var _target = target;
  return function onceHandler() {
    var res = fn.apply(null, arguments);

    if (res !== null) {
      _target.$off(event, onceHandler);
    }
  };
}

function updateComponentListeners(vm, listeners, oldListeners) {
  target = vm;
  updateListeners(listeners, oldListeners || {}, add, remove$1, createOnceHandler, vm);
  target = undefined;
}

function eventsMixin(Vue) {
  var hookRE = /^hook:/;

  Vue.prototype.$on = function (event, fn) {
    var vm = this;

    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        vm.$on(event[i], fn);
      }
    } else {
      (vm._events[event] || (vm._events[event] = [])).push(fn); // optimize hook:event cost by using a boolean flag marked at registration
      // instead of a hash lookup

      if (hookRE.test(event)) {
        vm._hasHookEvent = true;
      }
    }

    return vm;
  };

  Vue.prototype.$once = function (event, fn) {
    var vm = this;

    function on() {
      vm.$off(event, on);
      fn.apply(vm, arguments);
    }

    on.fn = fn;
    vm.$on(event, on);
    return vm;
  };

  Vue.prototype.$off = function (event, fn) {
    var vm = this; // all

    if (!arguments.length) {
      vm._events = Object.create(null);
      return vm;
    } // array of events


    if (Array.isArray(event)) {
      for (var i$1 = 0, l = event.length; i$1 < l; i$1++) {
        vm.$off(event[i$1], fn);
      }

      return vm;
    } // specific event


    var cbs = vm._events[event];

    if (!cbs) {
      return vm;
    }

    if (!fn) {
      vm._events[event] = null;
      return vm;
    } // specific handler


    var cb;
    var i = cbs.length;

    while (i--) {
      cb = cbs[i];

      if (cb === fn || cb.fn === fn) {
        cbs.splice(i, 1);
        break;
      }
    }

    return vm;
  };

  Vue.prototype.$emit = function (event) {
    var vm = this;

    if ("development" !== 'production') {
      var lowerCaseEvent = event.toLowerCase();

      if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
        tip("Event \"" + lowerCaseEvent + "\" is emitted in component " + formatComponentName(vm) + " but the handler is registered for \"" + event + "\". " + "Note that HTML attributes are case-insensitive and you cannot use " + "v-on to listen to camelCase events when using in-DOM templates. " + "You should probably use \"" + hyphenate(event) + "\" instead of \"" + event + "\".");
      }
    }

    var cbs = vm._events[event];

    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
      var args = toArray(arguments, 1);
      var info = "event handler for \"" + event + "\"";

      for (var i = 0, l = cbs.length; i < l; i++) {
        invokeWithErrorHandling(cbs[i], vm, args, vm, info);
      }
    }

    return vm;
  };
}
/*  */


var activeInstance = null;
var isUpdatingChildComponent = false;

function setActiveInstance(vm) {
  var prevActiveInstance = activeInstance;
  activeInstance = vm;
  return function () {
    activeInstance = prevActiveInstance;
  };
}

function initLifecycle(vm) {
  var options = vm.$options; // locate first non-abstract parent

  var parent = options.parent;

  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent;
    }

    parent.$children.push(vm);
  }

  vm.$parent = parent;
  vm.$root = parent ? parent.$root : vm;
  vm.$children = [];
  vm.$refs = {};
  vm._watcher = null;
  vm._inactive = null;
  vm._directInactive = false;
  vm._isMounted = false;
  vm._isDestroyed = false;
  vm._isBeingDestroyed = false;
}

function lifecycleMixin(Vue) {
  Vue.prototype._update = function (vnode, hydrating) {
    var vm = this;
    var prevEl = vm.$el;
    var prevVnode = vm._vnode;
    var restoreActiveInstance = setActiveInstance(vm);
    vm._vnode = vnode; // Vue.prototype.__patch__ is injected in entry points
    // based on the rendering backend used.

    if (!prevVnode) {
      // initial render
      vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false
      /* removeOnly */
      );
    } else {
      // updates
      vm.$el = vm.__patch__(prevVnode, vnode);
    }

    restoreActiveInstance(); // update __vue__ reference

    if (prevEl) {
      prevEl.__vue__ = null;
    }

    if (vm.$el) {
      vm.$el.__vue__ = vm;
    } // if parent is an HOC, update its $el as well


    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
      vm.$parent.$el = vm.$el;
    } // updated hook is called by the scheduler to ensure that children are
    // updated in a parent's updated hook.

  };

  Vue.prototype.$forceUpdate = function () {
    var vm = this;

    if (vm._watcher) {
      vm._watcher.update();
    }
  };

  Vue.prototype.$destroy = function () {
    var vm = this;

    if (vm._isBeingDestroyed) {
      return;
    }

    callHook(vm, 'beforeDestroy');
    vm._isBeingDestroyed = true; // remove self from parent

    var parent = vm.$parent;

    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
      remove(parent.$children, vm);
    } // teardown watchers


    if (vm._watcher) {
      vm._watcher.teardown();
    }

    var i = vm._watchers.length;

    while (i--) {
      vm._watchers[i].teardown();
    } // remove reference from data ob
    // frozen object may not have observer.


    if (vm._data.__ob__) {
      vm._data.__ob__.vmCount--;
    } // call the last hook...


    vm._isDestroyed = true; // invoke destroy hooks on current rendered tree

    vm.__patch__(vm._vnode, null); // fire destroyed hook


    callHook(vm, 'destroyed'); // turn off all instance listeners.

    vm.$off(); // remove __vue__ reference

    if (vm.$el) {
      vm.$el.__vue__ = null;
    } // release circular reference (#6759)


    if (vm.$vnode) {
      vm.$vnode.parent = null;
    }
  };
}

function mountComponent(vm, el, hydrating) {
  vm.$el = el;

  if (!vm.$options.render) {
    vm.$options.render = createEmptyVNode;

    if ("development" !== 'production') {
      /* istanbul ignore if */
      if (vm.$options.template && vm.$options.template.charAt(0) !== '#' || vm.$options.el || el) {
        warn('You are using the runtime-only build of Vue where the template ' + 'compiler is not available. Either pre-compile the templates into ' + 'render functions, or use the compiler-included build.', vm);
      } else {
        warn('Failed to mount component: template or render function not defined.', vm);
      }
    }
  }

  callHook(vm, 'beforeMount');
  var updateComponent;
  /* istanbul ignore if */

  if ("development" !== 'production' && config.performance && mark) {
    updateComponent = function () {
      var name = vm._name;
      var id = vm._uid;
      var startTag = "vue-perf-start:" + id;
      var endTag = "vue-perf-end:" + id;
      mark(startTag);

      var vnode = vm._render();

      mark(endTag);
      measure("vue " + name + " render", startTag, endTag);
      mark(startTag);

      vm._update(vnode, hydrating);

      mark(endTag);
      measure("vue " + name + " patch", startTag, endTag);
    };
  } else {
    updateComponent = function () {
      vm._update(vm._render(), hydrating);
    };
  } // we set this to vm._watcher inside the watcher's constructor
  // since the watcher's initial patch may call $forceUpdate (e.g. inside child
  // component's mounted hook), which relies on vm._watcher being already defined


  new Watcher(vm, updateComponent, noop, {
    before: function before() {
      if (vm._isMounted && !vm._isDestroyed) {
        callHook(vm, 'beforeUpdate');
      }
    }
  }, true
  /* isRenderWatcher */
  );
  hydrating = false; // manually mounted instance, call mounted on self
  // mounted is called for render-created child components in its inserted hook

  if (vm.$vnode == null) {
    vm._isMounted = true;
    callHook(vm, 'mounted');
  }

  return vm;
}

function updateChildComponent(vm, propsData, listeners, parentVnode, renderChildren) {
  if ("development" !== 'production') {
    isUpdatingChildComponent = true;
  } // determine whether component has slot children
  // we need to do this before overwriting $options._renderChildren.
  // check if there are dynamic scopedSlots (hand-written or compiled but with
  // dynamic slot names). Static scoped slots compiled from template has the
  // "$stable" marker.


  var newScopedSlots = parentVnode.data.scopedSlots;
  var oldScopedSlots = vm.$scopedSlots;
  var hasDynamicScopedSlot = !!(newScopedSlots && !newScopedSlots.$stable || oldScopedSlots !== emptyObject && !oldScopedSlots.$stable || newScopedSlots && vm.$scopedSlots.$key !== newScopedSlots.$key); // Any static slot children from the parent may have changed during parent's
  // update. Dynamic scoped slots may also have changed. In such cases, a forced
  // update is necessary to ensure correctness.

  var needsForceUpdate = !!(renderChildren || // has new static slots
  vm.$options._renderChildren || // has old static slots
  hasDynamicScopedSlot);
  vm.$options._parentVnode = parentVnode;
  vm.$vnode = parentVnode; // update vm's placeholder node without re-render

  if (vm._vnode) {
    // update child tree's parent
    vm._vnode.parent = parentVnode;
  }

  vm.$options._renderChildren = renderChildren; // update $attrs and $listeners hash
  // these are also reactive so they may trigger child update if the child
  // used them during render

  vm.$attrs = parentVnode.data.attrs || emptyObject;
  vm.$listeners = listeners || emptyObject; // update props

  if (propsData && vm.$options.props) {
    toggleObserving(false);
    var props = vm._props;
    var propKeys = vm.$options._propKeys || [];

    for (var i = 0; i < propKeys.length; i++) {
      var key = propKeys[i];
      var propOptions = vm.$options.props; // wtf flow?

      props[key] = validateProp(key, propOptions, propsData, vm);
    }

    toggleObserving(true); // keep a copy of raw propsData

    vm.$options.propsData = propsData;
  } // update listeners


  listeners = listeners || emptyObject;
  var oldListeners = vm.$options._parentListeners;
  vm.$options._parentListeners = listeners;
  updateComponentListeners(vm, listeners, oldListeners); // resolve slots + force update if has children

  if (needsForceUpdate) {
    vm.$slots = resolveSlots(renderChildren, parentVnode.context);
    vm.$forceUpdate();
  }

  if ("development" !== 'production') {
    isUpdatingChildComponent = false;
  }
}

function isInInactiveTree(vm) {
  while (vm && (vm = vm.$parent)) {
    if (vm._inactive) {
      return true;
    }
  }

  return false;
}

function activateChildComponent(vm, direct) {
  if (direct) {
    vm._directInactive = false;

    if (isInInactiveTree(vm)) {
      return;
    }
  } else if (vm._directInactive) {
    return;
  }

  if (vm._inactive || vm._inactive === null) {
    vm._inactive = false;

    for (var i = 0; i < vm.$children.length; i++) {
      activateChildComponent(vm.$children[i]);
    }

    callHook(vm, 'activated');
  }
}

function deactivateChildComponent(vm, direct) {
  if (direct) {
    vm._directInactive = true;

    if (isInInactiveTree(vm)) {
      return;
    }
  }

  if (!vm._inactive) {
    vm._inactive = true;

    for (var i = 0; i < vm.$children.length; i++) {
      deactivateChildComponent(vm.$children[i]);
    }

    callHook(vm, 'deactivated');
  }
}

function callHook(vm, hook) {
  // #7573 disable dep collection when invoking lifecycle hooks
  pushTarget();
  var handlers = vm.$options[hook];
  var info = hook + " hook";

  if (handlers) {
    for (var i = 0, j = handlers.length; i < j; i++) {
      invokeWithErrorHandling(handlers[i], vm, null, vm, info);
    }
  }

  if (vm._hasHookEvent) {
    vm.$emit('hook:' + hook);
  }

  popTarget();
}
/*  */


var MAX_UPDATE_COUNT = 100;
var queue = [];
var activatedChildren = [];
var has = {};
var circular = {};
var waiting = false;
var flushing = false;
var index = 0;
/**
 * Reset the scheduler's state.
 */

function resetSchedulerState() {
  index = queue.length = activatedChildren.length = 0;
  has = {};

  if ("development" !== 'production') {
    circular = {};
  }

  waiting = flushing = false;
} // Async edge case #6566 requires saving the timestamp when event listeners are
// attached. However, calling performance.now() has a perf overhead especially
// if the page has thousands of event listeners. Instead, we take a timestamp
// every time the scheduler flushes and use that for all event listeners
// attached during that flush.


var currentFlushTimestamp = 0; // Async edge case fix requires storing an event listener's attach timestamp.

var getNow = Date.now; // Determine what event timestamp the browser is using. Annoyingly, the
// timestamp can either be hi-res (relative to page load) or low-res
// (relative to UNIX epoch), so in order to compare time we have to use the
// same timestamp type when saving the flush timestamp.
// All IE versions use low-res event timestamps, and have problematic clock
// implementations (#9632)

if (inBrowser && !isIE) {
  var performance = window.performance;

  if (performance && typeof performance.now === 'function' && getNow() > document.createEvent('Event').timeStamp) {
    // if the event timestamp, although evaluated AFTER the Date.now(), is
    // smaller than it, it means the event is using a hi-res timestamp,
    // and we need to use the hi-res version for event listener timestamps as
    // well.
    getNow = function () {
      return performance.now();
    };
  }
}
/**
 * Flush both queues and run the watchers.
 */


function flushSchedulerQueue() {
  currentFlushTimestamp = getNow();
  flushing = true;
  var watcher, id; // Sort queue before flush.
  // This ensures that:
  // 1. Components are updated from parent to child. (because parent is always
  //    created before the child)
  // 2. A component's user watchers are run before its render watcher (because
  //    user watchers are created before the render watcher)
  // 3. If a component is destroyed during a parent component's watcher run,
  //    its watchers can be skipped.

  queue.sort(function (a, b) {
    return a.id - b.id;
  }); // do not cache length because more watchers might be pushed
  // as we run existing watchers

  for (index = 0; index < queue.length; index++) {
    watcher = queue[index];

    if (watcher.before) {
      watcher.before();
    }

    id = watcher.id;
    has[id] = null;
    watcher.run(); // in dev build, check and stop circular updates.

    if ("development" !== 'production' && has[id] != null) {
      circular[id] = (circular[id] || 0) + 1;

      if (circular[id] > MAX_UPDATE_COUNT) {
        warn('You may have an infinite update loop ' + (watcher.user ? "in watcher with expression \"" + watcher.expression + "\"" : "in a component render function."), watcher.vm);
        break;
      }
    }
  } // keep copies of post queues before resetting state


  var activatedQueue = activatedChildren.slice();
  var updatedQueue = queue.slice();
  resetSchedulerState(); // call component updated and activated hooks

  callActivatedHooks(activatedQueue);
  callUpdatedHooks(updatedQueue); // devtool hook

  /* istanbul ignore if */

  if (devtools && config.devtools) {
    devtools.emit('flush');
  }
}

function callUpdatedHooks(queue) {
  var i = queue.length;

  while (i--) {
    var watcher = queue[i];
    var vm = watcher.vm;

    if (vm._watcher === watcher && vm._isMounted && !vm._isDestroyed) {
      callHook(vm, 'updated');
    }
  }
}
/**
 * Queue a kept-alive component that was activated during patch.
 * The queue will be processed after the entire tree has been patched.
 */


function queueActivatedComponent(vm) {
  // setting _inactive to false here so that a render function can
  // rely on checking whether it's in an inactive tree (e.g. router-view)
  vm._inactive = false;
  activatedChildren.push(vm);
}

function callActivatedHooks(queue) {
  for (var i = 0; i < queue.length; i++) {
    queue[i]._inactive = true;
    activateChildComponent(queue[i], true
    /* true */
    );
  }
}
/**
 * Push a watcher into the watcher queue.
 * Jobs with duplicate IDs will be skipped unless it's
 * pushed when the queue is being flushed.
 */


function queueWatcher(watcher) {
  var id = watcher.id;

  if (has[id] == null) {
    has[id] = true;

    if (!flushing) {
      queue.push(watcher);
    } else {
      // if already flushing, splice the watcher based on its id
      // if already past its id, it will be run next immediately.
      var i = queue.length - 1;

      while (i > index && queue[i].id > watcher.id) {
        i--;
      }

      queue.splice(i + 1, 0, watcher);
    } // queue the flush


    if (!waiting) {
      waiting = true;

      if ("development" !== 'production' && !config.async) {
        flushSchedulerQueue();
        return;
      }

      nextTick(flushSchedulerQueue);
    }
  }
}
/*  */


var uid$2 = 0;
/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 */

var Watcher = function Watcher(vm, expOrFn, cb, options, isRenderWatcher) {
  this.vm = vm;

  if (isRenderWatcher) {
    vm._watcher = this;
  }

  vm._watchers.push(this); // options


  if (options) {
    this.deep = !!options.deep;
    this.user = !!options.user;
    this.lazy = !!options.lazy;
    this.sync = !!options.sync;
    this.before = options.before;
  } else {
    this.deep = this.user = this.lazy = this.sync = false;
  }

  this.cb = cb;
  this.id = ++uid$2; // uid for batching

  this.active = true;
  this.dirty = this.lazy; // for lazy watchers

  this.deps = [];
  this.newDeps = [];
  this.depIds = new _Set();
  this.newDepIds = new _Set();
  this.expression = "development" !== 'production' ? expOrFn.toString() : ''; // parse expression for getter

  if (typeof expOrFn === 'function') {
    this.getter = expOrFn;
  } else {
    this.getter = parsePath(expOrFn);

    if (!this.getter) {
      this.getter = noop;
      "development" !== 'production' && warn("Failed watching path: \"" + expOrFn + "\" " + 'Watcher only accepts simple dot-delimited paths. ' + 'For full control, use a function instead.', vm);
    }
  }

  this.value = this.lazy ? undefined : this.get();
};
/**
 * Evaluate the getter, and re-collect dependencies.
 */


Watcher.prototype.get = function get() {
  pushTarget(this);
  var value;
  var vm = this.vm;

  try {
    value = this.getter.call(vm, vm);
  } catch (e) {
    if (this.user) {
      handleError(e, vm, "getter for watcher \"" + this.expression + "\"");
    } else {
      throw e;
    }
  } finally {
    // "touch" every property so they are all tracked as
    // dependencies for deep watching
    if (this.deep) {
      traverse(value);
    }

    popTarget();
    this.cleanupDeps();
  }

  return value;
};
/**
 * Add a dependency to this directive.
 */


Watcher.prototype.addDep = function addDep(dep) {
  var id = dep.id;

  if (!this.newDepIds.has(id)) {
    this.newDepIds.add(id);
    this.newDeps.push(dep);

    if (!this.depIds.has(id)) {
      dep.addSub(this);
    }
  }
};
/**
 * Clean up for dependency collection.
 */


Watcher.prototype.cleanupDeps = function cleanupDeps() {
  var i = this.deps.length;

  while (i--) {
    var dep = this.deps[i];

    if (!this.newDepIds.has(dep.id)) {
      dep.removeSub(this);
    }
  }

  var tmp = this.depIds;
  this.depIds = this.newDepIds;
  this.newDepIds = tmp;
  this.newDepIds.clear();
  tmp = this.deps;
  this.deps = this.newDeps;
  this.newDeps = tmp;
  this.newDeps.length = 0;
};
/**
 * Subscriber interface.
 * Will be called when a dependency changes.
 */


Watcher.prototype.update = function update() {
  /* istanbul ignore else */
  if (this.lazy) {
    this.dirty = true;
  } else if (this.sync) {
    this.run();
  } else {
    queueWatcher(this);
  }
};
/**
 * Scheduler job interface.
 * Will be called by the scheduler.
 */


Watcher.prototype.run = function run() {
  if (this.active) {
    var value = this.get();

    if (value !== this.value || // Deep watchers and watchers on Object/Arrays should fire even
    // when the value is the same, because the value may
    // have mutated.
    isObject(value) || this.deep) {
      // set new value
      var oldValue = this.value;
      this.value = value;

      if (this.user) {
        try {
          this.cb.call(this.vm, value, oldValue);
        } catch (e) {
          handleError(e, this.vm, "callback for watcher \"" + this.expression + "\"");
        }
      } else {
        this.cb.call(this.vm, value, oldValue);
      }
    }
  }
};
/**
 * Evaluate the value of the watcher.
 * This only gets called for lazy watchers.
 */


Watcher.prototype.evaluate = function evaluate() {
  this.value = this.get();
  this.dirty = false;
};
/**
 * Depend on all deps collected by this watcher.
 */


Watcher.prototype.depend = function depend() {
  var i = this.deps.length;

  while (i--) {
    this.deps[i].depend();
  }
};
/**
 * Remove self from all dependencies' subscriber list.
 */


Watcher.prototype.teardown = function teardown() {
  if (this.active) {
    // remove self from vm's watcher list
    // this is a somewhat expensive operation so we skip it
    // if the vm is being destroyed.
    if (!this.vm._isBeingDestroyed) {
      remove(this.vm._watchers, this);
    }

    var i = this.deps.length;

    while (i--) {
      this.deps[i].removeSub(this);
    }

    this.active = false;
  }
};
/*  */


var sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
};

function proxy(target, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter() {
    return this[sourceKey][key];
  };

  sharedPropertyDefinition.set = function proxySetter(val) {
    this[sourceKey][key] = val;
  };

  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function initState(vm) {
  vm._watchers = [];
  var opts = vm.$options;

  if (opts.props) {
    initProps(vm, opts.props);
  }

  if (opts.methods) {
    initMethods(vm, opts.methods);
  }

  if (opts.data) {
    initData(vm);
  } else {
    observe(vm._data = {}, true
    /* asRootData */
    );
  }

  if (opts.computed) {
    initComputed(vm, opts.computed);
  }

  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch);
  }
}

function initProps(vm, propsOptions) {
  var propsData = vm.$options.propsData || {};
  var props = vm._props = {}; // cache prop keys so that future props updates can iterate using Array
  // instead of dynamic object key enumeration.

  var keys = vm.$options._propKeys = [];
  var isRoot = !vm.$parent; // root instance props should be converted

  if (!isRoot) {
    toggleObserving(false);
  }

  var loop = function (key) {
    keys.push(key);
    var value = validateProp(key, propsOptions, propsData, vm);
    /* istanbul ignore else */

    if ("development" !== 'production') {
      var hyphenatedKey = hyphenate(key);

      if (isReservedAttribute(hyphenatedKey) || config.isReservedAttr(hyphenatedKey)) {
        warn("\"" + hyphenatedKey + "\" is a reserved attribute and cannot be used as component prop.", vm);
      }

      defineReactive$$1(props, key, value, function () {
        if (!isRoot && !isUpdatingChildComponent) {
          warn("Avoid mutating a prop directly since the value will be " + "overwritten whenever the parent component re-renders. " + "Instead, use a data or computed property based on the prop's " + "value. Prop being mutated: \"" + key + "\"", vm);
        }
      });
    } else {
      defineReactive$$1(props, key, value);
    } // static props are already proxied on the component's prototype
    // during Vue.extend(). We only need to proxy props defined at
    // instantiation here.


    if (!(key in vm)) {
      proxy(vm, "_props", key);
    }
  };

  for (var key in propsOptions) loop(key);

  toggleObserving(true);
}

function initData(vm) {
  var data = vm.$options.data;
  data = vm._data = typeof data === 'function' ? getData(data, vm) : data || {};

  if (!isPlainObject(data)) {
    data = {};
    "development" !== 'production' && warn('data functions should return an object:\n' + 'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function', vm);
  } // proxy data on instance


  var keys = Object.keys(data);
  var props = vm.$options.props;
  var methods = vm.$options.methods;
  var i = keys.length;

  while (i--) {
    var key = keys[i];

    if ("development" !== 'production') {
      if (methods && hasOwn(methods, key)) {
        warn("Method \"" + key + "\" has already been defined as a data property.", vm);
      }
    }

    if (props && hasOwn(props, key)) {
      "development" !== 'production' && warn("The data property \"" + key + "\" is already declared as a prop. " + "Use prop default value instead.", vm);
    } else if (!isReserved(key)) {
      proxy(vm, "_data", key);
    }
  } // observe data


  observe(data, true
  /* asRootData */
  );
}

function getData(data, vm) {
  // #7573 disable dep collection when invoking data getters
  pushTarget();

  try {
    return data.call(vm, vm);
  } catch (e) {
    handleError(e, vm, "data()");
    return {};
  } finally {
    popTarget();
  }
}

var computedWatcherOptions = {
  lazy: true
};

function initComputed(vm, computed) {
  // $flow-disable-line
  var watchers = vm._computedWatchers = Object.create(null); // computed properties are just getters during SSR

  var isSSR = isServerRendering();

  for (var key in computed) {
    var userDef = computed[key];
    var getter = typeof userDef === 'function' ? userDef : userDef.get;

    if ("development" !== 'production' && getter == null) {
      warn("Getter is missing for computed property \"" + key + "\".", vm);
    }

    if (!isSSR) {
      // create internal watcher for the computed property.
      watchers[key] = new Watcher(vm, getter || noop, noop, computedWatcherOptions);
    } // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.


    if (!(key in vm)) {
      defineComputed(vm, key, userDef);
    } else if ("development" !== 'production') {
      if (key in vm.$data) {
        warn("The computed property \"" + key + "\" is already defined in data.", vm);
      } else if (vm.$options.props && key in vm.$options.props) {
        warn("The computed property \"" + key + "\" is already defined as a prop.", vm);
      }
    }
  }
}

function defineComputed(target, key, userDef) {
  var shouldCache = !isServerRendering();

  if (typeof userDef === 'function') {
    sharedPropertyDefinition.get = shouldCache ? createComputedGetter(key) : createGetterInvoker(userDef);
    sharedPropertyDefinition.set = noop;
  } else {
    sharedPropertyDefinition.get = userDef.get ? shouldCache && userDef.cache !== false ? createComputedGetter(key) : createGetterInvoker(userDef.get) : noop;
    sharedPropertyDefinition.set = userDef.set || noop;
  }

  if ("development" !== 'production' && sharedPropertyDefinition.set === noop) {
    sharedPropertyDefinition.set = function () {
      warn("Computed property \"" + key + "\" was assigned to but it has no setter.", this);
    };
  }

  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function createComputedGetter(key) {
  return function computedGetter() {
    var watcher = this._computedWatchers && this._computedWatchers[key];

    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate();
      }

      if (Dep.target) {
        watcher.depend();
      }

      return watcher.value;
    }
  };
}

function createGetterInvoker(fn) {
  return function computedGetter() {
    return fn.call(this, this);
  };
}

function initMethods(vm, methods) {
  var props = vm.$options.props;

  for (var key in methods) {
    if ("development" !== 'production') {
      if (typeof methods[key] !== 'function') {
        warn("Method \"" + key + "\" has type \"" + typeof methods[key] + "\" in the component definition. " + "Did you reference the function correctly?", vm);
      }

      if (props && hasOwn(props, key)) {
        warn("Method \"" + key + "\" has already been defined as a prop.", vm);
      }

      if (key in vm && isReserved(key)) {
        warn("Method \"" + key + "\" conflicts with an existing Vue instance method. " + "Avoid defining component methods that start with _ or $.");
      }
    }

    vm[key] = typeof methods[key] !== 'function' ? noop : bind(methods[key], vm);
  }
}

function initWatch(vm, watch) {
  for (var key in watch) {
    var handler = watch[key];

    if (Array.isArray(handler)) {
      for (var i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i]);
      }
    } else {
      createWatcher(vm, key, handler);
    }
  }
}

function createWatcher(vm, expOrFn, handler, options) {
  if (isPlainObject(handler)) {
    options = handler;
    handler = handler.handler;
  }

  if (typeof handler === 'string') {
    handler = vm[handler];
  }

  return vm.$watch(expOrFn, handler, options);
}

function stateMixin(Vue) {
  // flow somehow has problems with directly declared definition object
  // when using Object.defineProperty, so we have to procedurally build up
  // the object here.
  var dataDef = {};

  dataDef.get = function () {
    return this._data;
  };

  var propsDef = {};

  propsDef.get = function () {
    return this._props;
  };

  if ("development" !== 'production') {
    dataDef.set = function () {
      warn('Avoid replacing instance root $data. ' + 'Use nested data properties instead.', this);
    };

    propsDef.set = function () {
      warn("$props is readonly.", this);
    };
  }

  Object.defineProperty(Vue.prototype, '$data', dataDef);
  Object.defineProperty(Vue.prototype, '$props', propsDef);
  Vue.prototype.$set = set;
  Vue.prototype.$delete = del;

  Vue.prototype.$watch = function (expOrFn, cb, options) {
    var vm = this;

    if (isPlainObject(cb)) {
      return createWatcher(vm, expOrFn, cb, options);
    }

    options = options || {};
    options.user = true;
    var watcher = new Watcher(vm, expOrFn, cb, options);

    if (options.immediate) {
      try {
        cb.call(vm, watcher.value);
      } catch (error) {
        handleError(error, vm, "callback for immediate watcher \"" + watcher.expression + "\"");
      }
    }

    return function unwatchFn() {
      watcher.teardown();
    };
  };
}
/*  */


var uid$3 = 0;

function initMixin(Vue) {
  Vue.prototype._init = function (options) {
    var vm = this; // a uid

    vm._uid = uid$3++;
    var startTag, endTag;
    /* istanbul ignore if */

    if ("development" !== 'production' && config.performance && mark) {
      startTag = "vue-perf-start:" + vm._uid;
      endTag = "vue-perf-end:" + vm._uid;
      mark(startTag);
    } // a flag to avoid this being observed


    vm._isVue = true; // merge options

    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options);
    } else {
      vm.$options = mergeOptions(resolveConstructorOptions(vm.constructor), options || {}, vm);
    }
    /* istanbul ignore else */


    if ("development" !== 'production') {
      initProxy(vm);
    } else {
      vm._renderProxy = vm;
    } // expose real self


    vm._self = vm;
    initLifecycle(vm);
    initEvents(vm);
    initRender(vm);
    callHook(vm, 'beforeCreate');
    initInjections(vm); // resolve injections before data/props

    initState(vm);
    initProvide(vm); // resolve provide after data/props

    callHook(vm, 'created');
    /* istanbul ignore if */

    if ("development" !== 'production' && config.performance && mark) {
      vm._name = formatComponentName(vm, false);
      mark(endTag);
      measure("vue " + vm._name + " init", startTag, endTag);
    }

    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
}

function initInternalComponent(vm, options) {
  var opts = vm.$options = Object.create(vm.constructor.options); // doing this because it's faster than dynamic enumeration.

  var parentVnode = options._parentVnode;
  opts.parent = options.parent;
  opts._parentVnode = parentVnode;
  var vnodeComponentOptions = parentVnode.componentOptions;
  opts.propsData = vnodeComponentOptions.propsData;
  opts._parentListeners = vnodeComponentOptions.listeners;
  opts._renderChildren = vnodeComponentOptions.children;
  opts._componentTag = vnodeComponentOptions.tag;

  if (options.render) {
    opts.render = options.render;
    opts.staticRenderFns = options.staticRenderFns;
  }
}

function resolveConstructorOptions(Ctor) {
  var options = Ctor.options;

  if (Ctor.super) {
    var superOptions = resolveConstructorOptions(Ctor.super);
    var cachedSuperOptions = Ctor.superOptions;

    if (superOptions !== cachedSuperOptions) {
      // super option changed,
      // need to resolve new options.
      Ctor.superOptions = superOptions; // check if there are any late-modified/attached options (#4976)

      var modifiedOptions = resolveModifiedOptions(Ctor); // update base extend options

      if (modifiedOptions) {
        extend(Ctor.extendOptions, modifiedOptions);
      }

      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);

      if (options.name) {
        options.components[options.name] = Ctor;
      }
    }
  }

  return options;
}

function resolveModifiedOptions(Ctor) {
  var modified;
  var latest = Ctor.options;
  var sealed = Ctor.sealedOptions;

  for (var key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified) {
        modified = {};
      }

      modified[key] = latest[key];
    }
  }

  return modified;
}

function Vue(options) {
  if ("development" !== 'production' && !(this instanceof Vue)) {
    warn('Vue is a constructor and should be called with the `new` keyword');
  }

  this._init(options);
}

initMixin(Vue);
stateMixin(Vue);
eventsMixin(Vue);
lifecycleMixin(Vue);
renderMixin(Vue);
/*  */

function initUse(Vue) {
  Vue.use = function (plugin) {
    var installedPlugins = this._installedPlugins || (this._installedPlugins = []);

    if (installedPlugins.indexOf(plugin) > -1) {
      return this;
    } // additional parameters


    var args = toArray(arguments, 1);
    args.unshift(this);

    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args);
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args);
    }

    installedPlugins.push(plugin);
    return this;
  };
}
/*  */


function initMixin$1(Vue) {
  Vue.mixin = function (mixin) {
    this.options = mergeOptions(this.options, mixin);
    return this;
  };
}
/*  */


function initExtend(Vue) {
  /**
   * Each instance constructor, including Vue, has a unique
   * cid. This enables us to create wrapped "child
   * constructors" for prototypal inheritance and cache them.
   */
  Vue.cid = 0;
  var cid = 1;
  /**
   * Class inheritance
   */

  Vue.extend = function (extendOptions) {
    extendOptions = extendOptions || {};
    var Super = this;
    var SuperId = Super.cid;
    var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});

    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId];
    }

    var name = extendOptions.name || Super.options.name;

    if ("development" !== 'production' && name) {
      validateComponentName(name);
    }

    var Sub = function VueComponent(options) {
      this._init(options);
    };

    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;
    Sub.cid = cid++;
    Sub.options = mergeOptions(Super.options, extendOptions);
    Sub['super'] = Super; // For props and computed properties, we define the proxy getters on
    // the Vue instances at extension time, on the extended prototype. This
    // avoids Object.defineProperty calls for each instance created.

    if (Sub.options.props) {
      initProps$1(Sub);
    }

    if (Sub.options.computed) {
      initComputed$1(Sub);
    } // allow further extension/mixin/plugin usage


    Sub.extend = Super.extend;
    Sub.mixin = Super.mixin;
    Sub.use = Super.use; // create asset registers, so extended classes
    // can have their private assets too.

    ASSET_TYPES.forEach(function (type) {
      Sub[type] = Super[type];
    }); // enable recursive self-lookup

    if (name) {
      Sub.options.components[name] = Sub;
    } // keep a reference to the super options at extension time.
    // later at instantiation we can check if Super's options have
    // been updated.


    Sub.superOptions = Super.options;
    Sub.extendOptions = extendOptions;
    Sub.sealedOptions = extend({}, Sub.options); // cache constructor

    cachedCtors[SuperId] = Sub;
    return Sub;
  };
}

function initProps$1(Comp) {
  var props = Comp.options.props;

  for (var key in props) {
    proxy(Comp.prototype, "_props", key);
  }
}

function initComputed$1(Comp) {
  var computed = Comp.options.computed;

  for (var key in computed) {
    defineComputed(Comp.prototype, key, computed[key]);
  }
}
/*  */


function initAssetRegisters(Vue) {
  /**
   * Create asset registration methods.
   */
  ASSET_TYPES.forEach(function (type) {
    Vue[type] = function (id, definition) {
      if (!definition) {
        return this.options[type + 's'][id];
      } else {
        /* istanbul ignore if */
        if ("development" !== 'production' && type === 'component') {
          validateComponentName(id);
        }

        if (type === 'component' && isPlainObject(definition)) {
          definition.name = definition.name || id;
          definition = this.options._base.extend(definition);
        }

        if (type === 'directive' && typeof definition === 'function') {
          definition = {
            bind: definition,
            update: definition
          };
        }

        this.options[type + 's'][id] = definition;
        return definition;
      }
    };
  });
}
/*  */


function getComponentName(opts) {
  return opts && (opts.Ctor.options.name || opts.tag);
}

function matches(pattern, name) {
  if (Array.isArray(pattern)) {
    return pattern.indexOf(name) > -1;
  } else if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1;
  } else if (isRegExp(pattern)) {
    return pattern.test(name);
  }
  /* istanbul ignore next */


  return false;
}

function pruneCache(keepAliveInstance, filter) {
  var cache = keepAliveInstance.cache;
  var keys = keepAliveInstance.keys;
  var _vnode = keepAliveInstance._vnode;

  for (var key in cache) {
    var cachedNode = cache[key];

    if (cachedNode) {
      var name = getComponentName(cachedNode.componentOptions);

      if (name && !filter(name)) {
        pruneCacheEntry(cache, key, keys, _vnode);
      }
    }
  }
}

function pruneCacheEntry(cache, key, keys, current) {
  var cached$$1 = cache[key];

  if (cached$$1 && (!current || cached$$1.tag !== current.tag)) {
    cached$$1.componentInstance.$destroy();
  }

  cache[key] = null;
  remove(keys, key);
}

var patternTypes = [String, RegExp, Array];
var KeepAlive = {
  name: 'keep-alive',
  abstract: true,
  props: {
    include: patternTypes,
    exclude: patternTypes,
    max: [String, Number]
  },
  created: function created() {
    this.cache = Object.create(null);
    this.keys = [];
  },
  destroyed: function destroyed() {
    for (var key in this.cache) {
      pruneCacheEntry(this.cache, key, this.keys);
    }
  },
  mounted: function mounted() {
    var this$1 = this;
    this.$watch('include', function (val) {
      pruneCache(this$1, function (name) {
        return matches(val, name);
      });
    });
    this.$watch('exclude', function (val) {
      pruneCache(this$1, function (name) {
        return !matches(val, name);
      });
    });
  },
  render: function render() {
    var slot = this.$slots.default;
    var vnode = getFirstComponentChild(slot);
    var componentOptions = vnode && vnode.componentOptions;

    if (componentOptions) {
      // check pattern
      var name = getComponentName(componentOptions);
      var ref = this;
      var include = ref.include;
      var exclude = ref.exclude;

      if ( // not included
      include && (!name || !matches(include, name)) || // excluded
      exclude && name && matches(exclude, name)) {
        return vnode;
      }

      var ref$1 = this;
      var cache = ref$1.cache;
      var keys = ref$1.keys;
      var key = vnode.key == null // same constructor may get registered as different local components
      // so cid alone is not enough (#3269)
      ? componentOptions.Ctor.cid + (componentOptions.tag ? "::" + componentOptions.tag : '') : vnode.key;

      if (cache[key]) {
        vnode.componentInstance = cache[key].componentInstance; // make current key freshest

        remove(keys, key);
        keys.push(key);
      } else {
        cache[key] = vnode;
        keys.push(key); // prune oldest entry

        if (this.max && keys.length > parseInt(this.max)) {
          pruneCacheEntry(cache, keys[0], keys, this._vnode);
        }
      }

      vnode.data.keepAlive = true;
    }

    return vnode || slot && slot[0];
  }
};
var builtInComponents = {
  KeepAlive: KeepAlive
};
/*  */

function initGlobalAPI(Vue) {
  // config
  var configDef = {};

  configDef.get = function () {
    return config;
  };

  if ("development" !== 'production') {
    configDef.set = function () {
      warn('Do not replace the Vue.config object, set individual fields instead.');
    };
  }

  Object.defineProperty(Vue, 'config', configDef); // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.

  Vue.util = {
    warn: warn,
    extend: extend,
    mergeOptions: mergeOptions,
    defineReactive: defineReactive$$1
  };
  Vue.set = set;
  Vue.delete = del;
  Vue.nextTick = nextTick; // 2.6 explicit observable API

  Vue.observable = function (obj) {
    observe(obj);
    return obj;
  };

  Vue.options = Object.create(null);
  ASSET_TYPES.forEach(function (type) {
    Vue.options[type + 's'] = Object.create(null);
  }); // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.

  Vue.options._base = Vue;
  extend(Vue.options.components, builtInComponents);
  initUse(Vue);
  initMixin$1(Vue);
  initExtend(Vue);
  initAssetRegisters(Vue);
}

initGlobalAPI(Vue);
Object.defineProperty(Vue.prototype, '$isServer', {
  get: isServerRendering
});
Object.defineProperty(Vue.prototype, '$ssrContext', {
  get: function get() {
    /* istanbul ignore next */
    return this.$vnode && this.$vnode.ssrContext;
  }
}); // expose FunctionalRenderContext for ssr runtime helper installation

Object.defineProperty(Vue, 'FunctionalRenderContext', {
  value: FunctionalRenderContext
});
Vue.version = '2.6.10';
/*  */
// these are reserved for web because they are directly compiled away
// during template compilation

var isReservedAttr = makeMap('style,class'); // attributes that should be using props for binding

var acceptValue = makeMap('input,textarea,option,select,progress');

var mustUseProp = function (tag, type, attr) {
  return attr === 'value' && acceptValue(tag) && type !== 'button' || attr === 'selected' && tag === 'option' || attr === 'checked' && tag === 'input' || attr === 'muted' && tag === 'video';
};

var isEnumeratedAttr = makeMap('contenteditable,draggable,spellcheck');
var isValidContentEditableValue = makeMap('events,caret,typing,plaintext-only');

var convertEnumeratedValue = function (key, value) {
  return isFalsyAttrValue(value) || value === 'false' ? 'false' // allow arbitrary string value for contenteditable
  : key === 'contenteditable' && isValidContentEditableValue(value) ? value : 'true';
};

var isBooleanAttr = makeMap('allowfullscreen,async,autofocus,autoplay,checked,compact,controls,declare,' + 'default,defaultchecked,defaultmuted,defaultselected,defer,disabled,' + 'enabled,formnovalidate,hidden,indeterminate,inert,ismap,itemscope,loop,multiple,' + 'muted,nohref,noresize,noshade,novalidate,nowrap,open,pauseonexit,readonly,' + 'required,reversed,scoped,seamless,selected,sortable,translate,' + 'truespeed,typemustmatch,visible');
var xlinkNS = 'http://www.w3.org/1999/xlink';

var isXlink = function (name) {
  return name.charAt(5) === ':' && name.slice(0, 5) === 'xlink';
};

var getXlinkProp = function (name) {
  return isXlink(name) ? name.slice(6, name.length) : '';
};

var isFalsyAttrValue = function (val) {
  return val == null || val === false;
};
/*  */


function genClassForVnode(vnode) {
  var data = vnode.data;
  var parentNode = vnode;
  var childNode = vnode;

  while (isDef(childNode.componentInstance)) {
    childNode = childNode.componentInstance._vnode;

    if (childNode && childNode.data) {
      data = mergeClassData(childNode.data, data);
    }
  }

  while (isDef(parentNode = parentNode.parent)) {
    if (parentNode && parentNode.data) {
      data = mergeClassData(data, parentNode.data);
    }
  }

  return renderClass(data.staticClass, data.class);
}

function mergeClassData(child, parent) {
  return {
    staticClass: concat(child.staticClass, parent.staticClass),
    class: isDef(child.class) ? [child.class, parent.class] : parent.class
  };
}

function renderClass(staticClass, dynamicClass) {
  if (isDef(staticClass) || isDef(dynamicClass)) {
    return concat(staticClass, stringifyClass(dynamicClass));
  }
  /* istanbul ignore next */


  return '';
}

function concat(a, b) {
  return a ? b ? a + ' ' + b : a : b || '';
}

function stringifyClass(value) {
  if (Array.isArray(value)) {
    return stringifyArray(value);
  }

  if (isObject(value)) {
    return stringifyObject(value);
  }

  if (typeof value === 'string') {
    return value;
  }
  /* istanbul ignore next */


  return '';
}

function stringifyArray(value) {
  var res = '';
  var stringified;

  for (var i = 0, l = value.length; i < l; i++) {
    if (isDef(stringified = stringifyClass(value[i])) && stringified !== '') {
      if (res) {
        res += ' ';
      }

      res += stringified;
    }
  }

  return res;
}

function stringifyObject(value) {
  var res = '';

  for (var key in value) {
    if (value[key]) {
      if (res) {
        res += ' ';
      }

      res += key;
    }
  }

  return res;
}
/*  */


var namespaceMap = {
  svg: 'http://www.w3.org/2000/svg',
  math: 'http://www.w3.org/1998/Math/MathML'
};
var isHTMLTag = makeMap('html,body,base,head,link,meta,style,title,' + 'address,article,aside,footer,header,h1,h2,h3,h4,h5,h6,hgroup,nav,section,' + 'div,dd,dl,dt,figcaption,figure,picture,hr,img,li,main,ol,p,pre,ul,' + 'a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,rtc,ruby,' + 's,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,' + 'embed,object,param,source,canvas,script,noscript,del,ins,' + 'caption,col,colgroup,table,thead,tbody,td,th,tr,' + 'button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,' + 'output,progress,select,textarea,' + 'details,dialog,menu,menuitem,summary,' + 'content,element,shadow,template,blockquote,iframe,tfoot'); // this map is intentionally selective, only covering SVG elements that may
// contain child elements.

var isSVG = makeMap('svg,animate,circle,clippath,cursor,defs,desc,ellipse,filter,font-face,' + 'foreignObject,g,glyph,image,line,marker,mask,missing-glyph,path,pattern,' + 'polygon,polyline,rect,switch,symbol,text,textpath,tspan,use,view', true);

var isReservedTag = function (tag) {
  return isHTMLTag(tag) || isSVG(tag);
};

function getTagNamespace(tag) {
  if (isSVG(tag)) {
    return 'svg';
  } // basic support for MathML
  // note it doesn't support other MathML elements being component roots


  if (tag === 'math') {
    return 'math';
  }
}

var unknownElementCache = Object.create(null);

function isUnknownElement(tag) {
  /* istanbul ignore if */
  if (!inBrowser) {
    return true;
  }

  if (isReservedTag(tag)) {
    return false;
  }

  tag = tag.toLowerCase();
  /* istanbul ignore if */

  if (unknownElementCache[tag] != null) {
    return unknownElementCache[tag];
  }

  var el = document.createElement(tag);

  if (tag.indexOf('-') > -1) {
    // http://stackoverflow.com/a/28210364/1070244
    return unknownElementCache[tag] = el.constructor === window.HTMLUnknownElement || el.constructor === window.HTMLElement;
  } else {
    return unknownElementCache[tag] = /HTMLUnknownElement/.test(el.toString());
  }
}

var isTextInputType = makeMap('text,number,password,search,email,tel,url');
/*  */

/**
 * Query an element selector if it's not an element already.
 */

function query(el) {
  if (typeof el === 'string') {
    var selected = document.querySelector(el);

    if (!selected) {
      "development" !== 'production' && warn('Cannot find element: ' + el);
      return document.createElement('div');
    }

    return selected;
  } else {
    return el;
  }
}
/*  */


function createElement$1(tagName, vnode) {
  var elm = document.createElement(tagName);

  if (tagName !== 'select') {
    return elm;
  } // false or null will remove the attribute but undefined will not


  if (vnode.data && vnode.data.attrs && vnode.data.attrs.multiple !== undefined) {
    elm.setAttribute('multiple', 'multiple');
  }

  return elm;
}

function createElementNS(namespace, tagName) {
  return document.createElementNS(namespaceMap[namespace], tagName);
}

function createTextNode(text) {
  return document.createTextNode(text);
}

function createComment(text) {
  return document.createComment(text);
}

function insertBefore(parentNode, newNode, referenceNode) {
  parentNode.insertBefore(newNode, referenceNode);
}

function removeChild(node, child) {
  node.removeChild(child);
}

function appendChild(node, child) {
  node.appendChild(child);
}

function parentNode(node) {
  return node.parentNode;
}

function nextSibling(node) {
  return node.nextSibling;
}

function tagName(node) {
  return node.tagName;
}

function setTextContent(node, text) {
  node.textContent = text;
}

function setStyleScope(node, scopeId) {
  node.setAttribute(scopeId, '');
}

var nodeOps =
/*#__PURE__*/
Object.freeze({
  createElement: createElement$1,
  createElementNS: createElementNS,
  createTextNode: createTextNode,
  createComment: createComment,
  insertBefore: insertBefore,
  removeChild: removeChild,
  appendChild: appendChild,
  parentNode: parentNode,
  nextSibling: nextSibling,
  tagName: tagName,
  setTextContent: setTextContent,
  setStyleScope: setStyleScope
});
/*  */

var ref = {
  create: function create(_, vnode) {
    registerRef(vnode);
  },
  update: function update(oldVnode, vnode) {
    if (oldVnode.data.ref !== vnode.data.ref) {
      registerRef(oldVnode, true);
      registerRef(vnode);
    }
  },
  destroy: function destroy(vnode) {
    registerRef(vnode, true);
  }
};

function registerRef(vnode, isRemoval) {
  var key = vnode.data.ref;

  if (!isDef(key)) {
    return;
  }

  var vm = vnode.context;
  var ref = vnode.componentInstance || vnode.elm;
  var refs = vm.$refs;

  if (isRemoval) {
    if (Array.isArray(refs[key])) {
      remove(refs[key], ref);
    } else if (refs[key] === ref) {
      refs[key] = undefined;
    }
  } else {
    if (vnode.data.refInFor) {
      if (!Array.isArray(refs[key])) {
        refs[key] = [ref];
      } else if (refs[key].indexOf(ref) < 0) {
        // $flow-disable-line
        refs[key].push(ref);
      }
    } else {
      refs[key] = ref;
    }
  }
}
/**
 * Virtual DOM patching algorithm based on Snabbdom by
 * Simon Friis Vindum (@paldepind)
 * Licensed under the MIT License
 * https://github.com/paldepind/snabbdom/blob/master/LICENSE
 *
 * modified by Evan You (@yyx990803)
 *
 * Not type-checking this because this file is perf-critical and the cost
 * of making flow understand it is not worth it.
 */


var emptyNode = new VNode('', {}, []);
var hooks = ['create', 'activate', 'update', 'remove', 'destroy'];

function sameVnode(a, b) {
  return a.key === b.key && (a.tag === b.tag && a.isComment === b.isComment && isDef(a.data) === isDef(b.data) && sameInputType(a, b) || isTrue(a.isAsyncPlaceholder) && a.asyncFactory === b.asyncFactory && isUndef(b.asyncFactory.error));
}

function sameInputType(a, b) {
  if (a.tag !== 'input') {
    return true;
  }

  var i;
  var typeA = isDef(i = a.data) && isDef(i = i.attrs) && i.type;
  var typeB = isDef(i = b.data) && isDef(i = i.attrs) && i.type;
  return typeA === typeB || isTextInputType(typeA) && isTextInputType(typeB);
}

function createKeyToOldIdx(children, beginIdx, endIdx) {
  var i, key;
  var map = {};

  for (i = beginIdx; i <= endIdx; ++i) {
    key = children[i].key;

    if (isDef(key)) {
      map[key] = i;
    }
  }

  return map;
}

function createPatchFunction(backend) {
  var i, j;
  var cbs = {};
  var modules = backend.modules;
  var nodeOps = backend.nodeOps;

  for (i = 0; i < hooks.length; ++i) {
    cbs[hooks[i]] = [];

    for (j = 0; j < modules.length; ++j) {
      if (isDef(modules[j][hooks[i]])) {
        cbs[hooks[i]].push(modules[j][hooks[i]]);
      }
    }
  }

  function emptyNodeAt(elm) {
    return new VNode(nodeOps.tagName(elm).toLowerCase(), {}, [], undefined, elm);
  }

  function createRmCb(childElm, listeners) {
    function remove$$1() {
      if (--remove$$1.listeners === 0) {
        removeNode(childElm);
      }
    }

    remove$$1.listeners = listeners;
    return remove$$1;
  }

  function removeNode(el) {
    var parent = nodeOps.parentNode(el); // element may have already been removed due to v-html / v-text

    if (isDef(parent)) {
      nodeOps.removeChild(parent, el);
    }
  }

  function isUnknownElement$$1(vnode, inVPre) {
    return !inVPre && !vnode.ns && !(config.ignoredElements.length && config.ignoredElements.some(function (ignore) {
      return isRegExp(ignore) ? ignore.test(vnode.tag) : ignore === vnode.tag;
    })) && config.isUnknownElement(vnode.tag);
  }

  var creatingElmInVPre = 0;

  function createElm(vnode, insertedVnodeQueue, parentElm, refElm, nested, ownerArray, index) {
    if (isDef(vnode.elm) && isDef(ownerArray)) {
      // This vnode was used in a previous render!
      // now it's used as a new node, overwriting its elm would cause
      // potential patch errors down the road when it's used as an insertion
      // reference node. Instead, we clone the node on-demand before creating
      // associated DOM element for it.
      vnode = ownerArray[index] = cloneVNode(vnode);
    }

    vnode.isRootInsert = !nested; // for transition enter check

    if (createComponent(vnode, insertedVnodeQueue, parentElm, refElm)) {
      return;
    }

    var data = vnode.data;
    var children = vnode.children;
    var tag = vnode.tag;

    if (isDef(tag)) {
      if ("development" !== 'production') {
        if (data && data.pre) {
          creatingElmInVPre++;
        }

        if (isUnknownElement$$1(vnode, creatingElmInVPre)) {
          warn('Unknown custom element: <' + tag + '> - did you ' + 'register the component correctly? For recursive components, ' + 'make sure to provide the "name" option.', vnode.context);
        }
      }

      vnode.elm = vnode.ns ? nodeOps.createElementNS(vnode.ns, tag) : nodeOps.createElement(tag, vnode);
      setScope(vnode);
      /* istanbul ignore if */

      {
        createChildren(vnode, children, insertedVnodeQueue);

        if (isDef(data)) {
          invokeCreateHooks(vnode, insertedVnodeQueue);
        }

        insert(parentElm, vnode.elm, refElm);
      }

      if ("development" !== 'production' && data && data.pre) {
        creatingElmInVPre--;
      }
    } else if (isTrue(vnode.isComment)) {
      vnode.elm = nodeOps.createComment(vnode.text);
      insert(parentElm, vnode.elm, refElm);
    } else {
      vnode.elm = nodeOps.createTextNode(vnode.text);
      insert(parentElm, vnode.elm, refElm);
    }
  }

  function createComponent(vnode, insertedVnodeQueue, parentElm, refElm) {
    var i = vnode.data;

    if (isDef(i)) {
      var isReactivated = isDef(vnode.componentInstance) && i.keepAlive;

      if (isDef(i = i.hook) && isDef(i = i.init)) {
        i(vnode, false
        /* hydrating */
        );
      } // after calling the init hook, if the vnode is a child component
      // it should've created a child instance and mounted it. the child
      // component also has set the placeholder vnode's elm.
      // in that case we can just return the element and be done.


      if (isDef(vnode.componentInstance)) {
        initComponent(vnode, insertedVnodeQueue);
        insert(parentElm, vnode.elm, refElm);

        if (isTrue(isReactivated)) {
          reactivateComponent(vnode, insertedVnodeQueue, parentElm, refElm);
        }

        return true;
      }
    }
  }

  function initComponent(vnode, insertedVnodeQueue) {
    if (isDef(vnode.data.pendingInsert)) {
      insertedVnodeQueue.push.apply(insertedVnodeQueue, vnode.data.pendingInsert);
      vnode.data.pendingInsert = null;
    }

    vnode.elm = vnode.componentInstance.$el;

    if (isPatchable(vnode)) {
      invokeCreateHooks(vnode, insertedVnodeQueue);
      setScope(vnode);
    } else {
      // empty component root.
      // skip all element-related modules except for ref (#3455)
      registerRef(vnode); // make sure to invoke the insert hook

      insertedVnodeQueue.push(vnode);
    }
  }

  function reactivateComponent(vnode, insertedVnodeQueue, parentElm, refElm) {
    var i; // hack for #4339: a reactivated component with inner transition
    // does not trigger because the inner node's created hooks are not called
    // again. It's not ideal to involve module-specific logic in here but
    // there doesn't seem to be a better way to do it.

    var innerNode = vnode;

    while (innerNode.componentInstance) {
      innerNode = innerNode.componentInstance._vnode;

      if (isDef(i = innerNode.data) && isDef(i = i.transition)) {
        for (i = 0; i < cbs.activate.length; ++i) {
          cbs.activate[i](emptyNode, innerNode);
        }

        insertedVnodeQueue.push(innerNode);
        break;
      }
    } // unlike a newly created component,
    // a reactivated keep-alive component doesn't insert itself


    insert(parentElm, vnode.elm, refElm);
  }

  function insert(parent, elm, ref$$1) {
    if (isDef(parent)) {
      if (isDef(ref$$1)) {
        if (nodeOps.parentNode(ref$$1) === parent) {
          nodeOps.insertBefore(parent, elm, ref$$1);
        }
      } else {
        nodeOps.appendChild(parent, elm);
      }
    }
  }

  function createChildren(vnode, children, insertedVnodeQueue) {
    if (Array.isArray(children)) {
      if ("development" !== 'production') {
        checkDuplicateKeys(children);
      }

      for (var i = 0; i < children.length; ++i) {
        createElm(children[i], insertedVnodeQueue, vnode.elm, null, true, children, i);
      }
    } else if (isPrimitive(vnode.text)) {
      nodeOps.appendChild(vnode.elm, nodeOps.createTextNode(String(vnode.text)));
    }
  }

  function isPatchable(vnode) {
    while (vnode.componentInstance) {
      vnode = vnode.componentInstance._vnode;
    }

    return isDef(vnode.tag);
  }

  function invokeCreateHooks(vnode, insertedVnodeQueue) {
    for (var i$1 = 0; i$1 < cbs.create.length; ++i$1) {
      cbs.create[i$1](emptyNode, vnode);
    }

    i = vnode.data.hook; // Reuse variable

    if (isDef(i)) {
      if (isDef(i.create)) {
        i.create(emptyNode, vnode);
      }

      if (isDef(i.insert)) {
        insertedVnodeQueue.push(vnode);
      }
    }
  } // set scope id attribute for scoped CSS.
  // this is implemented as a special case to avoid the overhead
  // of going through the normal attribute patching process.


  function setScope(vnode) {
    var i;

    if (isDef(i = vnode.fnScopeId)) {
      nodeOps.setStyleScope(vnode.elm, i);
    } else {
      var ancestor = vnode;

      while (ancestor) {
        if (isDef(i = ancestor.context) && isDef(i = i.$options._scopeId)) {
          nodeOps.setStyleScope(vnode.elm, i);
        }

        ancestor = ancestor.parent;
      }
    } // for slot content they should also get the scopeId from the host instance.


    if (isDef(i = activeInstance) && i !== vnode.context && i !== vnode.fnContext && isDef(i = i.$options._scopeId)) {
      nodeOps.setStyleScope(vnode.elm, i);
    }
  }

  function addVnodes(parentElm, refElm, vnodes, startIdx, endIdx, insertedVnodeQueue) {
    for (; startIdx <= endIdx; ++startIdx) {
      createElm(vnodes[startIdx], insertedVnodeQueue, parentElm, refElm, false, vnodes, startIdx);
    }
  }

  function invokeDestroyHook(vnode) {
    var i, j;
    var data = vnode.data;

    if (isDef(data)) {
      if (isDef(i = data.hook) && isDef(i = i.destroy)) {
        i(vnode);
      }

      for (i = 0; i < cbs.destroy.length; ++i) {
        cbs.destroy[i](vnode);
      }
    }

    if (isDef(i = vnode.children)) {
      for (j = 0; j < vnode.children.length; ++j) {
        invokeDestroyHook(vnode.children[j]);
      }
    }
  }

  function removeVnodes(parentElm, vnodes, startIdx, endIdx) {
    for (; startIdx <= endIdx; ++startIdx) {
      var ch = vnodes[startIdx];

      if (isDef(ch)) {
        if (isDef(ch.tag)) {
          removeAndInvokeRemoveHook(ch);
          invokeDestroyHook(ch);
        } else {
          // Text node
          removeNode(ch.elm);
        }
      }
    }
  }

  function removeAndInvokeRemoveHook(vnode, rm) {
    if (isDef(rm) || isDef(vnode.data)) {
      var i;
      var listeners = cbs.remove.length + 1;

      if (isDef(rm)) {
        // we have a recursively passed down rm callback
        // increase the listeners count
        rm.listeners += listeners;
      } else {
        // directly removing
        rm = createRmCb(vnode.elm, listeners);
      } // recursively invoke hooks on child component root node


      if (isDef(i = vnode.componentInstance) && isDef(i = i._vnode) && isDef(i.data)) {
        removeAndInvokeRemoveHook(i, rm);
      }

      for (i = 0; i < cbs.remove.length; ++i) {
        cbs.remove[i](vnode, rm);
      }

      if (isDef(i = vnode.data.hook) && isDef(i = i.remove)) {
        i(vnode, rm);
      } else {
        rm();
      }
    } else {
      removeNode(vnode.elm);
    }
  }

  function updateChildren(parentElm, oldCh, newCh, insertedVnodeQueue, removeOnly) {
    var oldStartIdx = 0;
    var newStartIdx = 0;
    var oldEndIdx = oldCh.length - 1;
    var oldStartVnode = oldCh[0];
    var oldEndVnode = oldCh[oldEndIdx];
    var newEndIdx = newCh.length - 1;
    var newStartVnode = newCh[0];
    var newEndVnode = newCh[newEndIdx];
    var oldKeyToIdx, idxInOld, vnodeToMove, refElm; // removeOnly is a special flag used only by <transition-group>
    // to ensure removed elements stay in correct relative positions
    // during leaving transitions

    var canMove = !removeOnly;

    if ("development" !== 'production') {
      checkDuplicateKeys(newCh);
    }

    while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
      if (isUndef(oldStartVnode)) {
        oldStartVnode = oldCh[++oldStartIdx]; // Vnode has been moved left
      } else if (isUndef(oldEndVnode)) {
        oldEndVnode = oldCh[--oldEndIdx];
      } else if (sameVnode(oldStartVnode, newStartVnode)) {
        patchVnode(oldStartVnode, newStartVnode, insertedVnodeQueue, newCh, newStartIdx);
        oldStartVnode = oldCh[++oldStartIdx];
        newStartVnode = newCh[++newStartIdx];
      } else if (sameVnode(oldEndVnode, newEndVnode)) {
        patchVnode(oldEndVnode, newEndVnode, insertedVnodeQueue, newCh, newEndIdx);
        oldEndVnode = oldCh[--oldEndIdx];
        newEndVnode = newCh[--newEndIdx];
      } else if (sameVnode(oldStartVnode, newEndVnode)) {
        // Vnode moved right
        patchVnode(oldStartVnode, newEndVnode, insertedVnodeQueue, newCh, newEndIdx);
        canMove && nodeOps.insertBefore(parentElm, oldStartVnode.elm, nodeOps.nextSibling(oldEndVnode.elm));
        oldStartVnode = oldCh[++oldStartIdx];
        newEndVnode = newCh[--newEndIdx];
      } else if (sameVnode(oldEndVnode, newStartVnode)) {
        // Vnode moved left
        patchVnode(oldEndVnode, newStartVnode, insertedVnodeQueue, newCh, newStartIdx);
        canMove && nodeOps.insertBefore(parentElm, oldEndVnode.elm, oldStartVnode.elm);
        oldEndVnode = oldCh[--oldEndIdx];
        newStartVnode = newCh[++newStartIdx];
      } else {
        if (isUndef(oldKeyToIdx)) {
          oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx);
        }

        idxInOld = isDef(newStartVnode.key) ? oldKeyToIdx[newStartVnode.key] : findIdxInOld(newStartVnode, oldCh, oldStartIdx, oldEndIdx);

        if (isUndef(idxInOld)) {
          // New element
          createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm, false, newCh, newStartIdx);
        } else {
          vnodeToMove = oldCh[idxInOld];

          if (sameVnode(vnodeToMove, newStartVnode)) {
            patchVnode(vnodeToMove, newStartVnode, insertedVnodeQueue, newCh, newStartIdx);
            oldCh[idxInOld] = undefined;
            canMove && nodeOps.insertBefore(parentElm, vnodeToMove.elm, oldStartVnode.elm);
          } else {
            // same key but different element. treat as new element
            createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm, false, newCh, newStartIdx);
          }
        }

        newStartVnode = newCh[++newStartIdx];
      }
    }

    if (oldStartIdx > oldEndIdx) {
      refElm = isUndef(newCh[newEndIdx + 1]) ? null : newCh[newEndIdx + 1].elm;
      addVnodes(parentElm, refElm, newCh, newStartIdx, newEndIdx, insertedVnodeQueue);
    } else if (newStartIdx > newEndIdx) {
      removeVnodes(parentElm, oldCh, oldStartIdx, oldEndIdx);
    }
  }

  function checkDuplicateKeys(children) {
    var seenKeys = {};

    for (var i = 0; i < children.length; i++) {
      var vnode = children[i];
      var key = vnode.key;

      if (isDef(key)) {
        if (seenKeys[key]) {
          warn("Duplicate keys detected: '" + key + "'. This may cause an update error.", vnode.context);
        } else {
          seenKeys[key] = true;
        }
      }
    }
  }

  function findIdxInOld(node, oldCh, start, end) {
    for (var i = start; i < end; i++) {
      var c = oldCh[i];

      if (isDef(c) && sameVnode(node, c)) {
        return i;
      }
    }
  }

  function patchVnode(oldVnode, vnode, insertedVnodeQueue, ownerArray, index, removeOnly) {
    if (oldVnode === vnode) {
      return;
    }

    if (isDef(vnode.elm) && isDef(ownerArray)) {
      // clone reused vnode
      vnode = ownerArray[index] = cloneVNode(vnode);
    }

    var elm = vnode.elm = oldVnode.elm;

    if (isTrue(oldVnode.isAsyncPlaceholder)) {
      if (isDef(vnode.asyncFactory.resolved)) {
        hydrate(oldVnode.elm, vnode, insertedVnodeQueue);
      } else {
        vnode.isAsyncPlaceholder = true;
      }

      return;
    } // reuse element for static trees.
    // note we only do this if the vnode is cloned -
    // if the new node is not cloned it means the render functions have been
    // reset by the hot-reload-api and we need to do a proper re-render.


    if (isTrue(vnode.isStatic) && isTrue(oldVnode.isStatic) && vnode.key === oldVnode.key && (isTrue(vnode.isCloned) || isTrue(vnode.isOnce))) {
      vnode.componentInstance = oldVnode.componentInstance;
      return;
    }

    var i;
    var data = vnode.data;

    if (isDef(data) && isDef(i = data.hook) && isDef(i = i.prepatch)) {
      i(oldVnode, vnode);
    }

    var oldCh = oldVnode.children;
    var ch = vnode.children;

    if (isDef(data) && isPatchable(vnode)) {
      for (i = 0; i < cbs.update.length; ++i) {
        cbs.update[i](oldVnode, vnode);
      }

      if (isDef(i = data.hook) && isDef(i = i.update)) {
        i(oldVnode, vnode);
      }
    }

    if (isUndef(vnode.text)) {
      if (isDef(oldCh) && isDef(ch)) {
        if (oldCh !== ch) {
          updateChildren(elm, oldCh, ch, insertedVnodeQueue, removeOnly);
        }
      } else if (isDef(ch)) {
        if ("development" !== 'production') {
          checkDuplicateKeys(ch);
        }

        if (isDef(oldVnode.text)) {
          nodeOps.setTextContent(elm, '');
        }

        addVnodes(elm, null, ch, 0, ch.length - 1, insertedVnodeQueue);
      } else if (isDef(oldCh)) {
        removeVnodes(elm, oldCh, 0, oldCh.length - 1);
      } else if (isDef(oldVnode.text)) {
        nodeOps.setTextContent(elm, '');
      }
    } else if (oldVnode.text !== vnode.text) {
      nodeOps.setTextContent(elm, vnode.text);
    }

    if (isDef(data)) {
      if (isDef(i = data.hook) && isDef(i = i.postpatch)) {
        i(oldVnode, vnode);
      }
    }
  }

  function invokeInsertHook(vnode, queue, initial) {
    // delay insert hooks for component root nodes, invoke them after the
    // element is really inserted
    if (isTrue(initial) && isDef(vnode.parent)) {
      vnode.parent.data.pendingInsert = queue;
    } else {
      for (var i = 0; i < queue.length; ++i) {
        queue[i].data.hook.insert(queue[i]);
      }
    }
  }

  var hydrationBailed = false; // list of modules that can skip create hook during hydration because they
  // are already rendered on the client or has no need for initialization
  // Note: style is excluded because it relies on initial clone for future
  // deep updates (#7063).

  var isRenderedModule = makeMap('attrs,class,staticClass,staticStyle,key'); // Note: this is a browser-only function so we can assume elms are DOM nodes.

  function hydrate(elm, vnode, insertedVnodeQueue, inVPre) {
    var i;
    var tag = vnode.tag;
    var data = vnode.data;
    var children = vnode.children;
    inVPre = inVPre || data && data.pre;
    vnode.elm = elm;

    if (isTrue(vnode.isComment) && isDef(vnode.asyncFactory)) {
      vnode.isAsyncPlaceholder = true;
      return true;
    } // assert node match


    if ("development" !== 'production') {
      if (!assertNodeMatch(elm, vnode, inVPre)) {
        return false;
      }
    }

    if (isDef(data)) {
      if (isDef(i = data.hook) && isDef(i = i.init)) {
        i(vnode, true
        /* hydrating */
        );
      }

      if (isDef(i = vnode.componentInstance)) {
        // child component. it should have hydrated its own tree.
        initComponent(vnode, insertedVnodeQueue);
        return true;
      }
    }

    if (isDef(tag)) {
      if (isDef(children)) {
        // empty element, allow client to pick up and populate children
        if (!elm.hasChildNodes()) {
          createChildren(vnode, children, insertedVnodeQueue);
        } else {
          // v-html and domProps: innerHTML
          if (isDef(i = data) && isDef(i = i.domProps) && isDef(i = i.innerHTML)) {
            if (i !== elm.innerHTML) {
              /* istanbul ignore if */
              if ("development" !== 'production' && typeof console !== 'undefined' && !hydrationBailed) {
                hydrationBailed = true;
                console.warn('Parent: ', elm);
                console.warn('server innerHTML: ', i);
                console.warn('client innerHTML: ', elm.innerHTML);
              }

              return false;
            }
          } else {
            // iterate and compare children lists
            var childrenMatch = true;
            var childNode = elm.firstChild;

            for (var i$1 = 0; i$1 < children.length; i$1++) {
              if (!childNode || !hydrate(childNode, children[i$1], insertedVnodeQueue, inVPre)) {
                childrenMatch = false;
                break;
              }

              childNode = childNode.nextSibling;
            } // if childNode is not null, it means the actual childNodes list is
            // longer than the virtual children list.


            if (!childrenMatch || childNode) {
              /* istanbul ignore if */
              if ("development" !== 'production' && typeof console !== 'undefined' && !hydrationBailed) {
                hydrationBailed = true;
                console.warn('Parent: ', elm);
                console.warn('Mismatching childNodes vs. VNodes: ', elm.childNodes, children);
              }

              return false;
            }
          }
        }
      }

      if (isDef(data)) {
        var fullInvoke = false;

        for (var key in data) {
          if (!isRenderedModule(key)) {
            fullInvoke = true;
            invokeCreateHooks(vnode, insertedVnodeQueue);
            break;
          }
        }

        if (!fullInvoke && data['class']) {
          // ensure collecting deps for deep class bindings for future updates
          traverse(data['class']);
        }
      }
    } else if (elm.data !== vnode.text) {
      elm.data = vnode.text;
    }

    return true;
  }

  function assertNodeMatch(node, vnode, inVPre) {
    if (isDef(vnode.tag)) {
      return vnode.tag.indexOf('vue-component') === 0 || !isUnknownElement$$1(vnode, inVPre) && vnode.tag.toLowerCase() === (node.tagName && node.tagName.toLowerCase());
    } else {
      return node.nodeType === (vnode.isComment ? 8 : 3);
    }
  }

  return function patch(oldVnode, vnode, hydrating, removeOnly) {
    if (isUndef(vnode)) {
      if (isDef(oldVnode)) {
        invokeDestroyHook(oldVnode);
      }

      return;
    }

    var isInitialPatch = false;
    var insertedVnodeQueue = [];

    if (isUndef(oldVnode)) {
      // empty mount (likely as component), create new root element
      isInitialPatch = true;
      createElm(vnode, insertedVnodeQueue);
    } else {
      var isRealElement = isDef(oldVnode.nodeType);

      if (!isRealElement && sameVnode(oldVnode, vnode)) {
        // patch existing root node
        patchVnode(oldVnode, vnode, insertedVnodeQueue, null, null, removeOnly);
      } else {
        if (isRealElement) {
          // mounting to a real element
          // check if this is server-rendered content and if we can perform
          // a successful hydration.
          if (oldVnode.nodeType === 1 && oldVnode.hasAttribute(SSR_ATTR)) {
            oldVnode.removeAttribute(SSR_ATTR);
            hydrating = true;
          }

          if (isTrue(hydrating)) {
            if (hydrate(oldVnode, vnode, insertedVnodeQueue)) {
              invokeInsertHook(vnode, insertedVnodeQueue, true);
              return oldVnode;
            } else if ("development" !== 'production') {
              warn('The client-side rendered virtual DOM tree is not matching ' + 'server-rendered content. This is likely caused by incorrect ' + 'HTML markup, for example nesting block-level elements inside ' + '<p>, or missing <tbody>. Bailing hydration and performing ' + 'full client-side render.');
            }
          } // either not server-rendered, or hydration failed.
          // create an empty node and replace it


          oldVnode = emptyNodeAt(oldVnode);
        } // replacing existing element


        var oldElm = oldVnode.elm;
        var parentElm = nodeOps.parentNode(oldElm); // create new node

        createElm(vnode, insertedVnodeQueue, // extremely rare edge case: do not insert if old element is in a
        // leaving transition. Only happens when combining transition +
        // keep-alive + HOCs. (#4590)
        oldElm._leaveCb ? null : parentElm, nodeOps.nextSibling(oldElm)); // update parent placeholder node element, recursively

        if (isDef(vnode.parent)) {
          var ancestor = vnode.parent;
          var patchable = isPatchable(vnode);

          while (ancestor) {
            for (var i = 0; i < cbs.destroy.length; ++i) {
              cbs.destroy[i](ancestor);
            }

            ancestor.elm = vnode.elm;

            if (patchable) {
              for (var i$1 = 0; i$1 < cbs.create.length; ++i$1) {
                cbs.create[i$1](emptyNode, ancestor);
              } // #6513
              // invoke insert hooks that may have been merged by create hooks.
              // e.g. for directives that uses the "inserted" hook.


              var insert = ancestor.data.hook.insert;

              if (insert.merged) {
                // start at index 1 to avoid re-invoking component mounted hook
                for (var i$2 = 1; i$2 < insert.fns.length; i$2++) {
                  insert.fns[i$2]();
                }
              }
            } else {
              registerRef(ancestor);
            }

            ancestor = ancestor.parent;
          }
        } // destroy old node


        if (isDef(parentElm)) {
          removeVnodes(parentElm, [oldVnode], 0, 0);
        } else if (isDef(oldVnode.tag)) {
          invokeDestroyHook(oldVnode);
        }
      }
    }

    invokeInsertHook(vnode, insertedVnodeQueue, isInitialPatch);
    return vnode.elm;
  };
}
/*  */


var directives = {
  create: updateDirectives,
  update: updateDirectives,
  destroy: function unbindDirectives(vnode) {
    updateDirectives(vnode, emptyNode);
  }
};

function updateDirectives(oldVnode, vnode) {
  if (oldVnode.data.directives || vnode.data.directives) {
    _update(oldVnode, vnode);
  }
}

function _update(oldVnode, vnode) {
  var isCreate = oldVnode === emptyNode;
  var isDestroy = vnode === emptyNode;
  var oldDirs = normalizeDirectives$1(oldVnode.data.directives, oldVnode.context);
  var newDirs = normalizeDirectives$1(vnode.data.directives, vnode.context);
  var dirsWithInsert = [];
  var dirsWithPostpatch = [];
  var key, oldDir, dir;

  for (key in newDirs) {
    oldDir = oldDirs[key];
    dir = newDirs[key];

    if (!oldDir) {
      // new directive, bind
      callHook$1(dir, 'bind', vnode, oldVnode);

      if (dir.def && dir.def.inserted) {
        dirsWithInsert.push(dir);
      }
    } else {
      // existing directive, update
      dir.oldValue = oldDir.value;
      dir.oldArg = oldDir.arg;
      callHook$1(dir, 'update', vnode, oldVnode);

      if (dir.def && dir.def.componentUpdated) {
        dirsWithPostpatch.push(dir);
      }
    }
  }

  if (dirsWithInsert.length) {
    var callInsert = function () {
      for (var i = 0; i < dirsWithInsert.length; i++) {
        callHook$1(dirsWithInsert[i], 'inserted', vnode, oldVnode);
      }
    };

    if (isCreate) {
      mergeVNodeHook(vnode, 'insert', callInsert);
    } else {
      callInsert();
    }
  }

  if (dirsWithPostpatch.length) {
    mergeVNodeHook(vnode, 'postpatch', function () {
      for (var i = 0; i < dirsWithPostpatch.length; i++) {
        callHook$1(dirsWithPostpatch[i], 'componentUpdated', vnode, oldVnode);
      }
    });
  }

  if (!isCreate) {
    for (key in oldDirs) {
      if (!newDirs[key]) {
        // no longer present, unbind
        callHook$1(oldDirs[key], 'unbind', oldVnode, oldVnode, isDestroy);
      }
    }
  }
}

var emptyModifiers = Object.create(null);

function normalizeDirectives$1(dirs, vm) {
  var res = Object.create(null);

  if (!dirs) {
    // $flow-disable-line
    return res;
  }

  var i, dir;

  for (i = 0; i < dirs.length; i++) {
    dir = dirs[i];

    if (!dir.modifiers) {
      // $flow-disable-line
      dir.modifiers = emptyModifiers;
    }

    res[getRawDirName(dir)] = dir;
    dir.def = resolveAsset(vm.$options, 'directives', dir.name, true);
  } // $flow-disable-line


  return res;
}

function getRawDirName(dir) {
  return dir.rawName || dir.name + "." + Object.keys(dir.modifiers || {}).join('.');
}

function callHook$1(dir, hook, vnode, oldVnode, isDestroy) {
  var fn = dir.def && dir.def[hook];

  if (fn) {
    try {
      fn(vnode.elm, dir, vnode, oldVnode, isDestroy);
    } catch (e) {
      handleError(e, vnode.context, "directive " + dir.name + " " + hook + " hook");
    }
  }
}

var baseModules = [ref, directives];
/*  */

function updateAttrs(oldVnode, vnode) {
  var opts = vnode.componentOptions;

  if (isDef(opts) && opts.Ctor.options.inheritAttrs === false) {
    return;
  }

  if (isUndef(oldVnode.data.attrs) && isUndef(vnode.data.attrs)) {
    return;
  }

  var key, cur, old;
  var elm = vnode.elm;
  var oldAttrs = oldVnode.data.attrs || {};
  var attrs = vnode.data.attrs || {}; // clone observed objects, as the user probably wants to mutate it

  if (isDef(attrs.__ob__)) {
    attrs = vnode.data.attrs = extend({}, attrs);
  }

  for (key in attrs) {
    cur = attrs[key];
    old = oldAttrs[key];

    if (old !== cur) {
      setAttr(elm, key, cur);
    }
  } // #4391: in IE9, setting type can reset value for input[type=radio]
  // #6666: IE/Edge forces progress value down to 1 before setting a max

  /* istanbul ignore if */


  if ((isIE || isEdge) && attrs.value !== oldAttrs.value) {
    setAttr(elm, 'value', attrs.value);
  }

  for (key in oldAttrs) {
    if (isUndef(attrs[key])) {
      if (isXlink(key)) {
        elm.removeAttributeNS(xlinkNS, getXlinkProp(key));
      } else if (!isEnumeratedAttr(key)) {
        elm.removeAttribute(key);
      }
    }
  }
}

function setAttr(el, key, value) {
  if (el.tagName.indexOf('-') > -1) {
    baseSetAttr(el, key, value);
  } else if (isBooleanAttr(key)) {
    // set attribute for blank value
    // e.g. <option disabled>Select one</option>
    if (isFalsyAttrValue(value)) {
      el.removeAttribute(key);
    } else {
      // technically allowfullscreen is a boolean attribute for <iframe>,
      // but Flash expects a value of "true" when used on <embed> tag
      value = key === 'allowfullscreen' && el.tagName === 'EMBED' ? 'true' : key;
      el.setAttribute(key, value);
    }
  } else if (isEnumeratedAttr(key)) {
    el.setAttribute(key, convertEnumeratedValue(key, value));
  } else if (isXlink(key)) {
    if (isFalsyAttrValue(value)) {
      el.removeAttributeNS(xlinkNS, getXlinkProp(key));
    } else {
      el.setAttributeNS(xlinkNS, key, value);
    }
  } else {
    baseSetAttr(el, key, value);
  }
}

function baseSetAttr(el, key, value) {
  if (isFalsyAttrValue(value)) {
    el.removeAttribute(key);
  } else {
    // #7138: IE10 & 11 fires input event when setting placeholder on
    // <textarea>... block the first input event and remove the blocker
    // immediately.

    /* istanbul ignore if */
    if (isIE && !isIE9 && el.tagName === 'TEXTAREA' && key === 'placeholder' && value !== '' && !el.__ieph) {
      var blocker = function (e) {
        e.stopImmediatePropagation();
        el.removeEventListener('input', blocker);
      };

      el.addEventListener('input', blocker); // $flow-disable-line

      el.__ieph = true;
      /* IE placeholder patched */
    }

    el.setAttribute(key, value);
  }
}

var attrs = {
  create: updateAttrs,
  update: updateAttrs
};
/*  */

function updateClass(oldVnode, vnode) {
  var el = vnode.elm;
  var data = vnode.data;
  var oldData = oldVnode.data;

  if (isUndef(data.staticClass) && isUndef(data.class) && (isUndef(oldData) || isUndef(oldData.staticClass) && isUndef(oldData.class))) {
    return;
  }

  var cls = genClassForVnode(vnode); // handle transition classes

  var transitionClass = el._transitionClasses;

  if (isDef(transitionClass)) {
    cls = concat(cls, stringifyClass(transitionClass));
  } // set the class


  if (cls !== el._prevClass) {
    el.setAttribute('class', cls);
    el._prevClass = cls;
  }
}

var klass = {
  create: updateClass,
  update: updateClass
};
/*  */

/*  */

/*  */

/*  */
// in some cases, the event used has to be determined at runtime
// so we used some reserved tokens during compile.

var RANGE_TOKEN = '__r';
var CHECKBOX_RADIO_TOKEN = '__c';
/*  */
// normalize v-model event tokens that can only be determined at runtime.
// it's important to place the event as the first in the array because
// the whole point is ensuring the v-model callback gets called before
// user-attached handlers.

function normalizeEvents(on) {
  /* istanbul ignore if */
  if (isDef(on[RANGE_TOKEN])) {
    // IE input[type=range] only supports `change` event
    var event = isIE ? 'change' : 'input';
    on[event] = [].concat(on[RANGE_TOKEN], on[event] || []);
    delete on[RANGE_TOKEN];
  } // This was originally intended to fix #4521 but no longer necessary
  // after 2.5. Keeping it for backwards compat with generated code from < 2.4

  /* istanbul ignore if */


  if (isDef(on[CHECKBOX_RADIO_TOKEN])) {
    on.change = [].concat(on[CHECKBOX_RADIO_TOKEN], on.change || []);
    delete on[CHECKBOX_RADIO_TOKEN];
  }
}

var target$1;

function createOnceHandler$1(event, handler, capture) {
  var _target = target$1; // save current target element in closure

  return function onceHandler() {
    var res = handler.apply(null, arguments);

    if (res !== null) {
      remove$2(event, onceHandler, capture, _target);
    }
  };
} // #9446: Firefox <= 53 (in particular, ESR 52) has incorrect Event.timeStamp
// implementation and does not fire microtasks in between event propagation, so
// safe to exclude.


var useMicrotaskFix = isUsingMicroTask && !(isFF && Number(isFF[1]) <= 53);

function add$1(name, handler, capture, passive) {
  // async edge case #6566: inner click event triggers patch, event handler
  // attached to outer element during patch, and triggered again. This
  // happens because browsers fire microtask ticks between event propagation.
  // the solution is simple: we save the timestamp when a handler is attached,
  // and the handler would only fire if the event passed to it was fired
  // AFTER it was attached.
  if (useMicrotaskFix) {
    var attachedTimestamp = currentFlushTimestamp;
    var original = handler;

    handler = original._wrapper = function (e) {
      if ( // no bubbling, should always fire.
      // this is just a safety net in case event.timeStamp is unreliable in
      // certain weird environments...
      e.target === e.currentTarget || // event is fired after handler attachment
      e.timeStamp >= attachedTimestamp || // bail for environments that have buggy event.timeStamp implementations
      // #9462 iOS 9 bug: event.timeStamp is 0 after history.pushState
      // #9681 QtWebEngine event.timeStamp is negative value
      e.timeStamp <= 0 || // #9448 bail if event is fired in another document in a multi-page
      // electron/nw.js app, since event.timeStamp will be using a different
      // starting reference
      e.target.ownerDocument !== document) {
        return original.apply(this, arguments);
      }
    };
  }

  target$1.addEventListener(name, handler, supportsPassive ? {
    capture: capture,
    passive: passive
  } : capture);
}

function remove$2(name, handler, capture, _target) {
  (_target || target$1).removeEventListener(name, handler._wrapper || handler, capture);
}

function updateDOMListeners(oldVnode, vnode) {
  if (isUndef(oldVnode.data.on) && isUndef(vnode.data.on)) {
    return;
  }

  var on = vnode.data.on || {};
  var oldOn = oldVnode.data.on || {};
  target$1 = vnode.elm;
  normalizeEvents(on);
  updateListeners(on, oldOn, add$1, remove$2, createOnceHandler$1, vnode.context);
  target$1 = undefined;
}

var events = {
  create: updateDOMListeners,
  update: updateDOMListeners
};
/*  */

var svgContainer;

function updateDOMProps(oldVnode, vnode) {
  if (isUndef(oldVnode.data.domProps) && isUndef(vnode.data.domProps)) {
    return;
  }

  var key, cur;
  var elm = vnode.elm;
  var oldProps = oldVnode.data.domProps || {};
  var props = vnode.data.domProps || {}; // clone observed objects, as the user probably wants to mutate it

  if (isDef(props.__ob__)) {
    props = vnode.data.domProps = extend({}, props);
  }

  for (key in oldProps) {
    if (!(key in props)) {
      elm[key] = '';
    }
  }

  for (key in props) {
    cur = props[key]; // ignore children if the node has textContent or innerHTML,
    // as these will throw away existing DOM nodes and cause removal errors
    // on subsequent patches (#3360)

    if (key === 'textContent' || key === 'innerHTML') {
      if (vnode.children) {
        vnode.children.length = 0;
      }

      if (cur === oldProps[key]) {
        continue;
      } // #6601 work around Chrome version <= 55 bug where single textNode
      // replaced by innerHTML/textContent retains its parentNode property


      if (elm.childNodes.length === 1) {
        elm.removeChild(elm.childNodes[0]);
      }
    }

    if (key === 'value' && elm.tagName !== 'PROGRESS') {
      // store value as _value as well since
      // non-string values will be stringified
      elm._value = cur; // avoid resetting cursor position when value is the same

      var strCur = isUndef(cur) ? '' : String(cur);

      if (shouldUpdateValue(elm, strCur)) {
        elm.value = strCur;
      }
    } else if (key === 'innerHTML' && isSVG(elm.tagName) && isUndef(elm.innerHTML)) {
      // IE doesn't support innerHTML for SVG elements
      svgContainer = svgContainer || document.createElement('div');
      svgContainer.innerHTML = "<svg>" + cur + "</svg>";
      var svg = svgContainer.firstChild;

      while (elm.firstChild) {
        elm.removeChild(elm.firstChild);
      }

      while (svg.firstChild) {
        elm.appendChild(svg.firstChild);
      }
    } else if ( // skip the update if old and new VDOM state is the same.
    // `value` is handled separately because the DOM value may be temporarily
    // out of sync with VDOM state due to focus, composition and modifiers.
    // This  #4521 by skipping the unnecesarry `checked` update.
    cur !== oldProps[key]) {
      // some property updates can throw
      // e.g. `value` on <progress> w/ non-finite value
      try {
        elm[key] = cur;
      } catch (e) {}
    }
  }
} // check platforms/web/util/attrs.js acceptValue


function shouldUpdateValue(elm, checkVal) {
  return !elm.composing && (elm.tagName === 'OPTION' || isNotInFocusAndDirty(elm, checkVal) || isDirtyWithModifiers(elm, checkVal));
}

function isNotInFocusAndDirty(elm, checkVal) {
  // return true when textbox (.number and .trim) loses focus and its value is
  // not equal to the updated value
  var notInFocus = true; // #6157
  // work around IE bug when accessing document.activeElement in an iframe

  try {
    notInFocus = document.activeElement !== elm;
  } catch (e) {}

  return notInFocus && elm.value !== checkVal;
}

function isDirtyWithModifiers(elm, newVal) {
  var value = elm.value;
  var modifiers = elm._vModifiers; // injected by v-model runtime

  if (isDef(modifiers)) {
    if (modifiers.number) {
      return toNumber(value) !== toNumber(newVal);
    }

    if (modifiers.trim) {
      return value.trim() !== newVal.trim();
    }
  }

  return value !== newVal;
}

var domProps = {
  create: updateDOMProps,
  update: updateDOMProps
};
/*  */

var parseStyleText = cached(function (cssText) {
  var res = {};
  var listDelimiter = /;(?![^(]*\))/g;
  var propertyDelimiter = /:(.+)/;
  cssText.split(listDelimiter).forEach(function (item) {
    if (item) {
      var tmp = item.split(propertyDelimiter);
      tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return res;
}); // merge static and dynamic style data on the same vnode

function normalizeStyleData(data) {
  var style = normalizeStyleBinding(data.style); // static style is pre-processed into an object during compilation
  // and is always a fresh object, so it's safe to merge into it

  return data.staticStyle ? extend(data.staticStyle, style) : style;
} // normalize possible array / string values into Object


function normalizeStyleBinding(bindingStyle) {
  if (Array.isArray(bindingStyle)) {
    return toObject(bindingStyle);
  }

  if (typeof bindingStyle === 'string') {
    return parseStyleText(bindingStyle);
  }

  return bindingStyle;
}
/**
 * parent component style should be after child's
 * so that parent component's style could override it
 */


function getStyle(vnode, checkChild) {
  var res = {};
  var styleData;

  if (checkChild) {
    var childNode = vnode;

    while (childNode.componentInstance) {
      childNode = childNode.componentInstance._vnode;

      if (childNode && childNode.data && (styleData = normalizeStyleData(childNode.data))) {
        extend(res, styleData);
      }
    }
  }

  if (styleData = normalizeStyleData(vnode.data)) {
    extend(res, styleData);
  }

  var parentNode = vnode;

  while (parentNode = parentNode.parent) {
    if (parentNode.data && (styleData = normalizeStyleData(parentNode.data))) {
      extend(res, styleData);
    }
  }

  return res;
}
/*  */


var cssVarRE = /^--/;
var importantRE = /\s*!important$/;

var setProp = function (el, name, val) {
  /* istanbul ignore if */
  if (cssVarRE.test(name)) {
    el.style.setProperty(name, val);
  } else if (importantRE.test(val)) {
    el.style.setProperty(hyphenate(name), val.replace(importantRE, ''), 'important');
  } else {
    var normalizedName = normalize(name);

    if (Array.isArray(val)) {
      // Support values array created by autoprefixer, e.g.
      // {display: ["-webkit-box", "-ms-flexbox", "flex"]}
      // Set them one by one, and the browser will only set those it can recognize
      for (var i = 0, len = val.length; i < len; i++) {
        el.style[normalizedName] = val[i];
      }
    } else {
      el.style[normalizedName] = val;
    }
  }
};

var vendorNames = ['Webkit', 'Moz', 'ms'];
var emptyStyle;
var normalize = cached(function (prop) {
  emptyStyle = emptyStyle || document.createElement('div').style;
  prop = camelize(prop);

  if (prop !== 'filter' && prop in emptyStyle) {
    return prop;
  }

  var capName = prop.charAt(0).toUpperCase() + prop.slice(1);

  for (var i = 0; i < vendorNames.length; i++) {
    var name = vendorNames[i] + capName;

    if (name in emptyStyle) {
      return name;
    }
  }
});

function updateStyle(oldVnode, vnode) {
  var data = vnode.data;
  var oldData = oldVnode.data;

  if (isUndef(data.staticStyle) && isUndef(data.style) && isUndef(oldData.staticStyle) && isUndef(oldData.style)) {
    return;
  }

  var cur, name;
  var el = vnode.elm;
  var oldStaticStyle = oldData.staticStyle;
  var oldStyleBinding = oldData.normalizedStyle || oldData.style || {}; // if static style exists, stylebinding already merged into it when doing normalizeStyleData

  var oldStyle = oldStaticStyle || oldStyleBinding;
  var style = normalizeStyleBinding(vnode.data.style) || {}; // store normalized style under a different key for next diff
  // make sure to clone it if it's reactive, since the user likely wants
  // to mutate it.

  vnode.data.normalizedStyle = isDef(style.__ob__) ? extend({}, style) : style;
  var newStyle = getStyle(vnode, true);

  for (name in oldStyle) {
    if (isUndef(newStyle[name])) {
      setProp(el, name, '');
    }
  }

  for (name in newStyle) {
    cur = newStyle[name];

    if (cur !== oldStyle[name]) {
      // ie9 setting to null has no effect, must use empty string
      setProp(el, name, cur == null ? '' : cur);
    }
  }
}

var style = {
  create: updateStyle,
  update: updateStyle
};
/*  */

var whitespaceRE = /\s+/;
/**
 * Add class with compatibility for SVG since classList is not supported on
 * SVG elements in IE
 */

function addClass(el, cls) {
  /* istanbul ignore if */
  if (!cls || !(cls = cls.trim())) {
    return;
  }
  /* istanbul ignore else */


  if (el.classList) {
    if (cls.indexOf(' ') > -1) {
      cls.split(whitespaceRE).forEach(function (c) {
        return el.classList.add(c);
      });
    } else {
      el.classList.add(cls);
    }
  } else {
    var cur = " " + (el.getAttribute('class') || '') + " ";

    if (cur.indexOf(' ' + cls + ' ') < 0) {
      el.setAttribute('class', (cur + cls).trim());
    }
  }
}
/**
 * Remove class with compatibility for SVG since classList is not supported on
 * SVG elements in IE
 */


function removeClass(el, cls) {
  /* istanbul ignore if */
  if (!cls || !(cls = cls.trim())) {
    return;
  }
  /* istanbul ignore else */


  if (el.classList) {
    if (cls.indexOf(' ') > -1) {
      cls.split(whitespaceRE).forEach(function (c) {
        return el.classList.remove(c);
      });
    } else {
      el.classList.remove(cls);
    }

    if (!el.classList.length) {
      el.removeAttribute('class');
    }
  } else {
    var cur = " " + (el.getAttribute('class') || '') + " ";
    var tar = ' ' + cls + ' ';

    while (cur.indexOf(tar) >= 0) {
      cur = cur.replace(tar, ' ');
    }

    cur = cur.trim();

    if (cur) {
      el.setAttribute('class', cur);
    } else {
      el.removeAttribute('class');
    }
  }
}
/*  */


function resolveTransition(def$$1) {
  if (!def$$1) {
    return;
  }
  /* istanbul ignore else */


  if (typeof def$$1 === 'object') {
    var res = {};

    if (def$$1.css !== false) {
      extend(res, autoCssTransition(def$$1.name || 'v'));
    }

    extend(res, def$$1);
    return res;
  } else if (typeof def$$1 === 'string') {
    return autoCssTransition(def$$1);
  }
}

var autoCssTransition = cached(function (name) {
  return {
    enterClass: name + "-enter",
    enterToClass: name + "-enter-to",
    enterActiveClass: name + "-enter-active",
    leaveClass: name + "-leave",
    leaveToClass: name + "-leave-to",
    leaveActiveClass: name + "-leave-active"
  };
});
var hasTransition = inBrowser && !isIE9;
var TRANSITION = 'transition';
var ANIMATION = 'animation'; // Transition property/event sniffing

var transitionProp = 'transition';
var transitionEndEvent = 'transitionend';
var animationProp = 'animation';
var animationEndEvent = 'animationend';

if (hasTransition) {
  /* istanbul ignore if */
  if (window.ontransitionend === undefined && window.onwebkittransitionend !== undefined) {
    transitionProp = 'WebkitTransition';
    transitionEndEvent = 'webkitTransitionEnd';
  }

  if (window.onanimationend === undefined && window.onwebkitanimationend !== undefined) {
    animationProp = 'WebkitAnimation';
    animationEndEvent = 'webkitAnimationEnd';
  }
} // binding to window is necessary to make hot reload work in IE in strict mode


var raf = inBrowser ? window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : setTimeout :
/* istanbul ignore next */
function (fn) {
  return fn();
};

function nextFrame(fn) {
  raf(function () {
    raf(fn);
  });
}

function addTransitionClass(el, cls) {
  var transitionClasses = el._transitionClasses || (el._transitionClasses = []);

  if (transitionClasses.indexOf(cls) < 0) {
    transitionClasses.push(cls);
    addClass(el, cls);
  }
}

function removeTransitionClass(el, cls) {
  if (el._transitionClasses) {
    remove(el._transitionClasses, cls);
  }

  removeClass(el, cls);
}

function whenTransitionEnds(el, expectedType, cb) {
  var ref = getTransitionInfo(el, expectedType);
  var type = ref.type;
  var timeout = ref.timeout;
  var propCount = ref.propCount;

  if (!type) {
    return cb();
  }

  var event = type === TRANSITION ? transitionEndEvent : animationEndEvent;
  var ended = 0;

  var end = function () {
    el.removeEventListener(event, onEnd);
    cb();
  };

  var onEnd = function (e) {
    if (e.target === el) {
      if (++ended >= propCount) {
        end();
      }
    }
  };

  setTimeout(function () {
    if (ended < propCount) {
      end();
    }
  }, timeout + 1);
  el.addEventListener(event, onEnd);
}

var transformRE = /\b(transform|all)(,|$)/;

function getTransitionInfo(el, expectedType) {
  var styles = window.getComputedStyle(el); // JSDOM may return undefined for transition properties

  var transitionDelays = (styles[transitionProp + 'Delay'] || '').split(', ');
  var transitionDurations = (styles[transitionProp + 'Duration'] || '').split(', ');
  var transitionTimeout = getTimeout(transitionDelays, transitionDurations);
  var animationDelays = (styles[animationProp + 'Delay'] || '').split(', ');
  var animationDurations = (styles[animationProp + 'Duration'] || '').split(', ');
  var animationTimeout = getTimeout(animationDelays, animationDurations);
  var type;
  var timeout = 0;
  var propCount = 0;
  /* istanbul ignore if */

  if (expectedType === TRANSITION) {
    if (transitionTimeout > 0) {
      type = TRANSITION;
      timeout = transitionTimeout;
      propCount = transitionDurations.length;
    }
  } else if (expectedType === ANIMATION) {
    if (animationTimeout > 0) {
      type = ANIMATION;
      timeout = animationTimeout;
      propCount = animationDurations.length;
    }
  } else {
    timeout = Math.max(transitionTimeout, animationTimeout);
    type = timeout > 0 ? transitionTimeout > animationTimeout ? TRANSITION : ANIMATION : null;
    propCount = type ? type === TRANSITION ? transitionDurations.length : animationDurations.length : 0;
  }

  var hasTransform = type === TRANSITION && transformRE.test(styles[transitionProp + 'Property']);
  return {
    type: type,
    timeout: timeout,
    propCount: propCount,
    hasTransform: hasTransform
  };
}

function getTimeout(delays, durations) {
  /* istanbul ignore next */
  while (delays.length < durations.length) {
    delays = delays.concat(delays);
  }

  return Math.max.apply(null, durations.map(function (d, i) {
    return toMs(d) + toMs(delays[i]);
  }));
} // Old versions of Chromium (below 61.0.3163.100) formats floating pointer numbers
// in a locale-dependent way, using a comma instead of a dot.
// If comma is not replaced with a dot, the input will be rounded down (i.e. acting
// as a floor function) causing unexpected behaviors


function toMs(s) {
  return Number(s.slice(0, -1).replace(',', '.')) * 1000;
}
/*  */


function enter(vnode, toggleDisplay) {
  var el = vnode.elm; // call leave callback now

  if (isDef(el._leaveCb)) {
    el._leaveCb.cancelled = true;

    el._leaveCb();
  }

  var data = resolveTransition(vnode.data.transition);

  if (isUndef(data)) {
    return;
  }
  /* istanbul ignore if */


  if (isDef(el._enterCb) || el.nodeType !== 1) {
    return;
  }

  var css = data.css;
  var type = data.type;
  var enterClass = data.enterClass;
  var enterToClass = data.enterToClass;
  var enterActiveClass = data.enterActiveClass;
  var appearClass = data.appearClass;
  var appearToClass = data.appearToClass;
  var appearActiveClass = data.appearActiveClass;
  var beforeEnter = data.beforeEnter;
  var enter = data.enter;
  var afterEnter = data.afterEnter;
  var enterCancelled = data.enterCancelled;
  var beforeAppear = data.beforeAppear;
  var appear = data.appear;
  var afterAppear = data.afterAppear;
  var appearCancelled = data.appearCancelled;
  var duration = data.duration; // activeInstance will always be the <transition> component managing this
  // transition. One edge case to check is when the <transition> is placed
  // as the root node of a child component. In that case we need to check
  // <transition>'s parent for appear check.

  var context = activeInstance;
  var transitionNode = activeInstance.$vnode;

  while (transitionNode && transitionNode.parent) {
    context = transitionNode.context;
    transitionNode = transitionNode.parent;
  }

  var isAppear = !context._isMounted || !vnode.isRootInsert;

  if (isAppear && !appear && appear !== '') {
    return;
  }

  var startClass = isAppear && appearClass ? appearClass : enterClass;
  var activeClass = isAppear && appearActiveClass ? appearActiveClass : enterActiveClass;
  var toClass = isAppear && appearToClass ? appearToClass : enterToClass;
  var beforeEnterHook = isAppear ? beforeAppear || beforeEnter : beforeEnter;
  var enterHook = isAppear ? typeof appear === 'function' ? appear : enter : enter;
  var afterEnterHook = isAppear ? afterAppear || afterEnter : afterEnter;
  var enterCancelledHook = isAppear ? appearCancelled || enterCancelled : enterCancelled;
  var explicitEnterDuration = toNumber(isObject(duration) ? duration.enter : duration);

  if ("development" !== 'production' && explicitEnterDuration != null) {
    checkDuration(explicitEnterDuration, 'enter', vnode);
  }

  var expectsCSS = css !== false && !isIE9;
  var userWantsControl = getHookArgumentsLength(enterHook);
  var cb = el._enterCb = once(function () {
    if (expectsCSS) {
      removeTransitionClass(el, toClass);
      removeTransitionClass(el, activeClass);
    }

    if (cb.cancelled) {
      if (expectsCSS) {
        removeTransitionClass(el, startClass);
      }

      enterCancelledHook && enterCancelledHook(el);
    } else {
      afterEnterHook && afterEnterHook(el);
    }

    el._enterCb = null;
  });

  if (!vnode.data.show) {
    // remove pending leave element on enter by injecting an insert hook
    mergeVNodeHook(vnode, 'insert', function () {
      var parent = el.parentNode;
      var pendingNode = parent && parent._pending && parent._pending[vnode.key];

      if (pendingNode && pendingNode.tag === vnode.tag && pendingNode.elm._leaveCb) {
        pendingNode.elm._leaveCb();
      }

      enterHook && enterHook(el, cb);
    });
  } // start enter transition


  beforeEnterHook && beforeEnterHook(el);

  if (expectsCSS) {
    addTransitionClass(el, startClass);
    addTransitionClass(el, activeClass);
    nextFrame(function () {
      removeTransitionClass(el, startClass);

      if (!cb.cancelled) {
        addTransitionClass(el, toClass);

        if (!userWantsControl) {
          if (isValidDuration(explicitEnterDuration)) {
            setTimeout(cb, explicitEnterDuration);
          } else {
            whenTransitionEnds(el, type, cb);
          }
        }
      }
    });
  }

  if (vnode.data.show) {
    toggleDisplay && toggleDisplay();
    enterHook && enterHook(el, cb);
  }

  if (!expectsCSS && !userWantsControl) {
    cb();
  }
}

function leave(vnode, rm) {
  var el = vnode.elm; // call enter callback now

  if (isDef(el._enterCb)) {
    el._enterCb.cancelled = true;

    el._enterCb();
  }

  var data = resolveTransition(vnode.data.transition);

  if (isUndef(data) || el.nodeType !== 1) {
    return rm();
  }
  /* istanbul ignore if */


  if (isDef(el._leaveCb)) {
    return;
  }

  var css = data.css;
  var type = data.type;
  var leaveClass = data.leaveClass;
  var leaveToClass = data.leaveToClass;
  var leaveActiveClass = data.leaveActiveClass;
  var beforeLeave = data.beforeLeave;
  var leave = data.leave;
  var afterLeave = data.afterLeave;
  var leaveCancelled = data.leaveCancelled;
  var delayLeave = data.delayLeave;
  var duration = data.duration;
  var expectsCSS = css !== false && !isIE9;
  var userWantsControl = getHookArgumentsLength(leave);
  var explicitLeaveDuration = toNumber(isObject(duration) ? duration.leave : duration);

  if ("development" !== 'production' && isDef(explicitLeaveDuration)) {
    checkDuration(explicitLeaveDuration, 'leave', vnode);
  }

  var cb = el._leaveCb = once(function () {
    if (el.parentNode && el.parentNode._pending) {
      el.parentNode._pending[vnode.key] = null;
    }

    if (expectsCSS) {
      removeTransitionClass(el, leaveToClass);
      removeTransitionClass(el, leaveActiveClass);
    }

    if (cb.cancelled) {
      if (expectsCSS) {
        removeTransitionClass(el, leaveClass);
      }

      leaveCancelled && leaveCancelled(el);
    } else {
      rm();
      afterLeave && afterLeave(el);
    }

    el._leaveCb = null;
  });

  if (delayLeave) {
    delayLeave(performLeave);
  } else {
    performLeave();
  }

  function performLeave() {
    // the delayed leave may have already been cancelled
    if (cb.cancelled) {
      return;
    } // record leaving element


    if (!vnode.data.show && el.parentNode) {
      (el.parentNode._pending || (el.parentNode._pending = {}))[vnode.key] = vnode;
    }

    beforeLeave && beforeLeave(el);

    if (expectsCSS) {
      addTransitionClass(el, leaveClass);
      addTransitionClass(el, leaveActiveClass);
      nextFrame(function () {
        removeTransitionClass(el, leaveClass);

        if (!cb.cancelled) {
          addTransitionClass(el, leaveToClass);

          if (!userWantsControl) {
            if (isValidDuration(explicitLeaveDuration)) {
              setTimeout(cb, explicitLeaveDuration);
            } else {
              whenTransitionEnds(el, type, cb);
            }
          }
        }
      });
    }

    leave && leave(el, cb);

    if (!expectsCSS && !userWantsControl) {
      cb();
    }
  }
} // only used in dev mode


function checkDuration(val, name, vnode) {
  if (typeof val !== 'number') {
    warn("<transition> explicit " + name + " duration is not a valid number - " + "got " + JSON.stringify(val) + ".", vnode.context);
  } else if (isNaN(val)) {
    warn("<transition> explicit " + name + " duration is NaN - " + 'the duration expression might be incorrect.', vnode.context);
  }
}

function isValidDuration(val) {
  return typeof val === 'number' && !isNaN(val);
}
/**
 * Normalize a transition hook's argument length. The hook may be:
 * - a merged hook (invoker) with the original in .fns
 * - a wrapped component method (check ._length)
 * - a plain function (.length)
 */


function getHookArgumentsLength(fn) {
  if (isUndef(fn)) {
    return false;
  }

  var invokerFns = fn.fns;

  if (isDef(invokerFns)) {
    // invoker
    return getHookArgumentsLength(Array.isArray(invokerFns) ? invokerFns[0] : invokerFns);
  } else {
    return (fn._length || fn.length) > 1;
  }
}

function _enter(_, vnode) {
  if (vnode.data.show !== true) {
    enter(vnode);
  }
}

var transition = inBrowser ? {
  create: _enter,
  activate: _enter,
  remove: function remove$$1(vnode, rm) {
    /* istanbul ignore else */
    if (vnode.data.show !== true) {
      leave(vnode, rm);
    } else {
      rm();
    }
  }
} : {};
var platformModules = [attrs, klass, events, domProps, style, transition];
/*  */
// the directive module should be applied last, after all
// built-in modules have been applied.

var modules = platformModules.concat(baseModules);
var patch = createPatchFunction({
  nodeOps: nodeOps,
  modules: modules
});
/**
 * Not type checking this file because flow doesn't like attaching
 * properties to Elements.
 */

/* istanbul ignore if */

if (isIE9) {
  // http://www.matts411.com/post/internet-explorer-9-oninput/
  document.addEventListener('selectionchange', function () {
    var el = document.activeElement;

    if (el && el.vmodel) {
      trigger(el, 'input');
    }
  });
}

var directive = {
  inserted: function inserted(el, binding, vnode, oldVnode) {
    if (vnode.tag === 'select') {
      // #6903
      if (oldVnode.elm && !oldVnode.elm._vOptions) {
        mergeVNodeHook(vnode, 'postpatch', function () {
          directive.componentUpdated(el, binding, vnode);
        });
      } else {
        setSelected(el, binding, vnode.context);
      }

      el._vOptions = [].map.call(el.options, getValue);
    } else if (vnode.tag === 'textarea' || isTextInputType(el.type)) {
      el._vModifiers = binding.modifiers;

      if (!binding.modifiers.lazy) {
        el.addEventListener('compositionstart', onCompositionStart);
        el.addEventListener('compositionend', onCompositionEnd); // Safari < 10.2 & UIWebView doesn't fire compositionend when
        // switching focus before confirming composition choice
        // this also fixes the issue where some browsers e.g. iOS Chrome
        // fires "change" instead of "input" on autocomplete.

        el.addEventListener('change', onCompositionEnd);
        /* istanbul ignore if */

        if (isIE9) {
          el.vmodel = true;
        }
      }
    }
  },
  componentUpdated: function componentUpdated(el, binding, vnode) {
    if (vnode.tag === 'select') {
      setSelected(el, binding, vnode.context); // in case the options rendered by v-for have changed,
      // it's possible that the value is out-of-sync with the rendered options.
      // detect such cases and filter out values that no longer has a matching
      // option in the DOM.

      var prevOptions = el._vOptions;
      var curOptions = el._vOptions = [].map.call(el.options, getValue);

      if (curOptions.some(function (o, i) {
        return !looseEqual(o, prevOptions[i]);
      })) {
        // trigger change event if
        // no matching option found for at least one value
        var needReset = el.multiple ? binding.value.some(function (v) {
          return hasNoMatchingOption(v, curOptions);
        }) : binding.value !== binding.oldValue && hasNoMatchingOption(binding.value, curOptions);

        if (needReset) {
          trigger(el, 'change');
        }
      }
    }
  }
};

function setSelected(el, binding, vm) {
  actuallySetSelected(el, binding, vm);
  /* istanbul ignore if */

  if (isIE || isEdge) {
    setTimeout(function () {
      actuallySetSelected(el, binding, vm);
    }, 0);
  }
}

function actuallySetSelected(el, binding, vm) {
  var value = binding.value;
  var isMultiple = el.multiple;

  if (isMultiple && !Array.isArray(value)) {
    "development" !== 'production' && warn("<select multiple v-model=\"" + binding.expression + "\"> " + "expects an Array value for its binding, but got " + Object.prototype.toString.call(value).slice(8, -1), vm);
    return;
  }

  var selected, option;

  for (var i = 0, l = el.options.length; i < l; i++) {
    option = el.options[i];

    if (isMultiple) {
      selected = looseIndexOf(value, getValue(option)) > -1;

      if (option.selected !== selected) {
        option.selected = selected;
      }
    } else {
      if (looseEqual(getValue(option), value)) {
        if (el.selectedIndex !== i) {
          el.selectedIndex = i;
        }

        return;
      }
    }
  }

  if (!isMultiple) {
    el.selectedIndex = -1;
  }
}

function hasNoMatchingOption(value, options) {
  return options.every(function (o) {
    return !looseEqual(o, value);
  });
}

function getValue(option) {
  return '_value' in option ? option._value : option.value;
}

function onCompositionStart(e) {
  e.target.composing = true;
}

function onCompositionEnd(e) {
  // prevent triggering an input event for no reason
  if (!e.target.composing) {
    return;
  }

  e.target.composing = false;
  trigger(e.target, 'input');
}

function trigger(el, type) {
  var e = document.createEvent('HTMLEvents');
  e.initEvent(type, true, true);
  el.dispatchEvent(e);
}
/*  */
// recursively search for possible transition defined inside the component root


function locateNode(vnode) {
  return vnode.componentInstance && (!vnode.data || !vnode.data.transition) ? locateNode(vnode.componentInstance._vnode) : vnode;
}

var show = {
  bind: function bind(el, ref, vnode) {
    var value = ref.value;
    vnode = locateNode(vnode);
    var transition$$1 = vnode.data && vnode.data.transition;
    var originalDisplay = el.__vOriginalDisplay = el.style.display === 'none' ? '' : el.style.display;

    if (value && transition$$1) {
      vnode.data.show = true;
      enter(vnode, function () {
        el.style.display = originalDisplay;
      });
    } else {
      el.style.display = value ? originalDisplay : 'none';
    }
  },
  update: function update(el, ref, vnode) {
    var value = ref.value;
    var oldValue = ref.oldValue;
    /* istanbul ignore if */

    if (!value === !oldValue) {
      return;
    }

    vnode = locateNode(vnode);
    var transition$$1 = vnode.data && vnode.data.transition;

    if (transition$$1) {
      vnode.data.show = true;

      if (value) {
        enter(vnode, function () {
          el.style.display = el.__vOriginalDisplay;
        });
      } else {
        leave(vnode, function () {
          el.style.display = 'none';
        });
      }
    } else {
      el.style.display = value ? el.__vOriginalDisplay : 'none';
    }
  },
  unbind: function unbind(el, binding, vnode, oldVnode, isDestroy) {
    if (!isDestroy) {
      el.style.display = el.__vOriginalDisplay;
    }
  }
};
var platformDirectives = {
  model: directive,
  show: show
};
/*  */

var transitionProps = {
  name: String,
  appear: Boolean,
  css: Boolean,
  mode: String,
  type: String,
  enterClass: String,
  leaveClass: String,
  enterToClass: String,
  leaveToClass: String,
  enterActiveClass: String,
  leaveActiveClass: String,
  appearClass: String,
  appearActiveClass: String,
  appearToClass: String,
  duration: [Number, String, Object]
}; // in case the child is also an abstract component, e.g. <keep-alive>
// we want to recursively retrieve the real component to be rendered

function getRealChild(vnode) {
  var compOptions = vnode && vnode.componentOptions;

  if (compOptions && compOptions.Ctor.options.abstract) {
    return getRealChild(getFirstComponentChild(compOptions.children));
  } else {
    return vnode;
  }
}

function extractTransitionData(comp) {
  var data = {};
  var options = comp.$options; // props

  for (var key in options.propsData) {
    data[key] = comp[key];
  } // events.
  // extract listeners and pass them directly to the transition methods


  var listeners = options._parentListeners;

  for (var key$1 in listeners) {
    data[camelize(key$1)] = listeners[key$1];
  }

  return data;
}

function placeholder(h, rawChild) {
  if (/\d-keep-alive$/.test(rawChild.tag)) {
    return h('keep-alive', {
      props: rawChild.componentOptions.propsData
    });
  }
}

function hasParentTransition(vnode) {
  while (vnode = vnode.parent) {
    if (vnode.data.transition) {
      return true;
    }
  }
}

function isSameChild(child, oldChild) {
  return oldChild.key === child.key && oldChild.tag === child.tag;
}

var isNotTextNode = function (c) {
  return c.tag || isAsyncPlaceholder(c);
};

var isVShowDirective = function (d) {
  return d.name === 'show';
};

var Transition = {
  name: 'transition',
  props: transitionProps,
  abstract: true,
  render: function render(h) {
    var this$1 = this;
    var children = this.$slots.default;

    if (!children) {
      return;
    } // filter out text nodes (possible whitespaces)


    children = children.filter(isNotTextNode);
    /* istanbul ignore if */

    if (!children.length) {
      return;
    } // warn multiple elements


    if ("development" !== 'production' && children.length > 1) {
      warn('<transition> can only be used on a single element. Use ' + '<transition-group> for lists.', this.$parent);
    }

    var mode = this.mode; // warn invalid mode

    if ("development" !== 'production' && mode && mode !== 'in-out' && mode !== 'out-in') {
      warn('invalid <transition> mode: ' + mode, this.$parent);
    }

    var rawChild = children[0]; // if this is a component root node and the component's
    // parent container node also has transition, skip.

    if (hasParentTransition(this.$vnode)) {
      return rawChild;
    } // apply transition data to child
    // use getRealChild() to ignore abstract components e.g. keep-alive


    var child = getRealChild(rawChild);
    /* istanbul ignore if */

    if (!child) {
      return rawChild;
    }

    if (this._leaving) {
      return placeholder(h, rawChild);
    } // ensure a key that is unique to the vnode type and to this transition
    // component instance. This key will be used to remove pending leaving nodes
    // during entering.


    var id = "__transition-" + this._uid + "-";
    child.key = child.key == null ? child.isComment ? id + 'comment' : id + child.tag : isPrimitive(child.key) ? String(child.key).indexOf(id) === 0 ? child.key : id + child.key : child.key;
    var data = (child.data || (child.data = {})).transition = extractTransitionData(this);
    var oldRawChild = this._vnode;
    var oldChild = getRealChild(oldRawChild); // mark v-show
    // so that the transition module can hand over the control to the directive

    if (child.data.directives && child.data.directives.some(isVShowDirective)) {
      child.data.show = true;
    }

    if (oldChild && oldChild.data && !isSameChild(child, oldChild) && !isAsyncPlaceholder(oldChild) && // #6687 component root is a comment node
    !(oldChild.componentInstance && oldChild.componentInstance._vnode.isComment)) {
      // replace old child transition data with fresh one
      // important for dynamic transitions!
      var oldData = oldChild.data.transition = extend({}, data); // handle transition mode

      if (mode === 'out-in') {
        // return placeholder node and queue update when leave finishes
        this._leaving = true;
        mergeVNodeHook(oldData, 'afterLeave', function () {
          this$1._leaving = false;
          this$1.$forceUpdate();
        });
        return placeholder(h, rawChild);
      } else if (mode === 'in-out') {
        if (isAsyncPlaceholder(child)) {
          return oldRawChild;
        }

        var delayedLeave;

        var performLeave = function () {
          delayedLeave();
        };

        mergeVNodeHook(data, 'afterEnter', performLeave);
        mergeVNodeHook(data, 'enterCancelled', performLeave);
        mergeVNodeHook(oldData, 'delayLeave', function (leave) {
          delayedLeave = leave;
        });
      }
    }

    return rawChild;
  }
};
/*  */

var props = extend({
  tag: String,
  moveClass: String
}, transitionProps);
delete props.mode;
var TransitionGroup = {
  props: props,
  beforeMount: function beforeMount() {
    var this$1 = this;
    var update = this._update;

    this._update = function (vnode, hydrating) {
      var restoreActiveInstance = setActiveInstance(this$1); // force removing pass

      this$1.__patch__(this$1._vnode, this$1.kept, false, // hydrating
      true // removeOnly (!important, avoids unnecessary moves)
      );

      this$1._vnode = this$1.kept;
      restoreActiveInstance();
      update.call(this$1, vnode, hydrating);
    };
  },
  render: function render(h) {
    var tag = this.tag || this.$vnode.data.tag || 'span';
    var map = Object.create(null);
    var prevChildren = this.prevChildren = this.children;
    var rawChildren = this.$slots.default || [];
    var children = this.children = [];
    var transitionData = extractTransitionData(this);

    for (var i = 0; i < rawChildren.length; i++) {
      var c = rawChildren[i];

      if (c.tag) {
        if (c.key != null && String(c.key).indexOf('__vlist') !== 0) {
          children.push(c);
          map[c.key] = c;
          (c.data || (c.data = {})).transition = transitionData;
        } else if ("development" !== 'production') {
          var opts = c.componentOptions;
          var name = opts ? opts.Ctor.options.name || opts.tag || '' : c.tag;
          warn("<transition-group> children must be keyed: <" + name + ">");
        }
      }
    }

    if (prevChildren) {
      var kept = [];
      var removed = [];

      for (var i$1 = 0; i$1 < prevChildren.length; i$1++) {
        var c$1 = prevChildren[i$1];
        c$1.data.transition = transitionData;
        c$1.data.pos = c$1.elm.getBoundingClientRect();

        if (map[c$1.key]) {
          kept.push(c$1);
        } else {
          removed.push(c$1);
        }
      }

      this.kept = h(tag, null, kept);
      this.removed = removed;
    }

    return h(tag, null, children);
  },
  updated: function updated() {
    var children = this.prevChildren;
    var moveClass = this.moveClass || (this.name || 'v') + '-move';

    if (!children.length || !this.hasMove(children[0].elm, moveClass)) {
      return;
    } // we divide the work into three loops to avoid mixing DOM reads and writes
    // in each iteration - which helps prevent layout thrashing.


    children.forEach(callPendingCbs);
    children.forEach(recordPosition);
    children.forEach(applyTranslation); // force reflow to put everything in position
    // assign to this to avoid being removed in tree-shaking
    // $flow-disable-line

    this._reflow = document.body.offsetHeight;
    children.forEach(function (c) {
      if (c.data.moved) {
        var el = c.elm;
        var s = el.style;
        addTransitionClass(el, moveClass);
        s.transform = s.WebkitTransform = s.transitionDuration = '';
        el.addEventListener(transitionEndEvent, el._moveCb = function cb(e) {
          if (e && e.target !== el) {
            return;
          }

          if (!e || /transform$/.test(e.propertyName)) {
            el.removeEventListener(transitionEndEvent, cb);
            el._moveCb = null;
            removeTransitionClass(el, moveClass);
          }
        });
      }
    });
  },
  methods: {
    hasMove: function hasMove(el, moveClass) {
      /* istanbul ignore if */
      if (!hasTransition) {
        return false;
      }
      /* istanbul ignore if */


      if (this._hasMove) {
        return this._hasMove;
      } // Detect whether an element with the move class applied has
      // CSS transitions. Since the element may be inside an entering
      // transition at this very moment, we make a clone of it and remove
      // all other transition classes applied to ensure only the move class
      // is applied.


      var clone = el.cloneNode();

      if (el._transitionClasses) {
        el._transitionClasses.forEach(function (cls) {
          removeClass(clone, cls);
        });
      }

      addClass(clone, moveClass);
      clone.style.display = 'none';
      this.$el.appendChild(clone);
      var info = getTransitionInfo(clone);
      this.$el.removeChild(clone);
      return this._hasMove = info.hasTransform;
    }
  }
};

function callPendingCbs(c) {
  /* istanbul ignore if */
  if (c.elm._moveCb) {
    c.elm._moveCb();
  }
  /* istanbul ignore if */


  if (c.elm._enterCb) {
    c.elm._enterCb();
  }
}

function recordPosition(c) {
  c.data.newPos = c.elm.getBoundingClientRect();
}

function applyTranslation(c) {
  var oldPos = c.data.pos;
  var newPos = c.data.newPos;
  var dx = oldPos.left - newPos.left;
  var dy = oldPos.top - newPos.top;

  if (dx || dy) {
    c.data.moved = true;
    var s = c.elm.style;
    s.transform = s.WebkitTransform = "translate(" + dx + "px," + dy + "px)";
    s.transitionDuration = '0s';
  }
}

var platformComponents = {
  Transition: Transition,
  TransitionGroup: TransitionGroup
};
/*  */
// install platform specific utils

Vue.config.mustUseProp = mustUseProp;
Vue.config.isReservedTag = isReservedTag;
Vue.config.isReservedAttr = isReservedAttr;
Vue.config.getTagNamespace = getTagNamespace;
Vue.config.isUnknownElement = isUnknownElement; // install platform runtime directives & components

extend(Vue.options.directives, platformDirectives);
extend(Vue.options.components, platformComponents); // install platform patch function

Vue.prototype.__patch__ = inBrowser ? patch : noop; // public mount method

Vue.prototype.$mount = function (el, hydrating) {
  el = el && inBrowser ? query(el) : undefined;
  return mountComponent(this, el, hydrating);
}; // devtools global hook

/* istanbul ignore next */


if (inBrowser) {
  setTimeout(function () {
    if (config.devtools) {
      if (devtools) {
        devtools.emit('init', Vue);
      } else if ("development" !== 'production' && "development" !== 'test') {
        console[console.info ? 'info' : 'log']('Download the Vue Devtools extension for a better development experience:\n' + 'https://github.com/vuejs/vue-devtools');
      }
    }

    if ("development" !== 'production' && "development" !== 'test' && config.productionTip !== false && typeof console !== 'undefined') {
      console[console.info ? 'info' : 'log']("You are running Vue in development mode.\n" + "Make sure to turn on production mode when deploying for production.\n" + "See more tips at https://vuejs.org/guide/deployment.html");
    }
  }, 0);
}
/*  */


var _default = Vue;
exports.default = _default;
},{}],"node_modules/parcel-bundler/src/builtins/bundle-url.js":[function(require,module,exports) {
var bundleURL = null;

function getBundleURLCached() {
  if (!bundleURL) {
    bundleURL = getBundleURL();
  }

  return bundleURL;
}

function getBundleURL() {
  // Attempt to find the URL of the current script and use that as the base URL
  try {
    throw new Error();
  } catch (err) {
    var matches = ('' + err.stack).match(/(https?|file|ftp|chrome-extension|moz-extension):\/\/[^)\n]+/g);

    if (matches) {
      return getBaseURL(matches[0]);
    }
  }

  return '/';
}

function getBaseURL(url) {
  return ('' + url).replace(/^((?:https?|file|ftp|chrome-extension|moz-extension):\/\/.+)\/[^/]+$/, '$1') + '/';
}

exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;
},{}],"node_modules/parcel-bundler/src/builtins/css-loader.js":[function(require,module,exports) {
var bundle = require('./bundle-url');

function updateLink(link) {
  var newLink = link.cloneNode();

  newLink.onload = function () {
    link.remove();
  };

  newLink.href = link.href.split('?')[0] + '?' + Date.now();
  link.parentNode.insertBefore(newLink, link.nextSibling);
}

var cssTimeout = null;

function reloadCSS() {
  if (cssTimeout) {
    return;
  }

  cssTimeout = setTimeout(function () {
    var links = document.querySelectorAll('link[rel="stylesheet"]');

    for (var i = 0; i < links.length; i++) {
      if (bundle.getBaseURL(links[i].href) === bundle.getBundleURL()) {
        updateLink(links[i]);
      }
    }

    cssTimeout = null;
  }, 50);
}

module.exports = reloadCSS;
},{"./bundle-url":"node_modules/parcel-bundler/src/builtins/bundle-url.js"}],"node_modules/vue-hot-reload-api/dist/index.js":[function(require,module,exports) {
var Vue // late bind
var version
var map = Object.create(null)
if (typeof window !== 'undefined') {
  window.__VUE_HOT_MAP__ = map
}
var installed = false
var isBrowserify = false
var initHookName = 'beforeCreate'

exports.install = function (vue, browserify) {
  if (installed) { return }
  installed = true

  Vue = vue.__esModule ? vue.default : vue
  version = Vue.version.split('.').map(Number)
  isBrowserify = browserify

  // compat with < 2.0.0-alpha.7
  if (Vue.config._lifecycleHooks.indexOf('init') > -1) {
    initHookName = 'init'
  }

  exports.compatible = version[0] >= 2
  if (!exports.compatible) {
    console.warn(
      '[HMR] You are using a version of vue-hot-reload-api that is ' +
        'only compatible with Vue.js core ^2.0.0.'
    )
    return
  }
}

/**
 * Create a record for a hot module, which keeps track of its constructor
 * and instances
 *
 * @param {String} id
 * @param {Object} options
 */

exports.createRecord = function (id, options) {
  if(map[id]) { return }

  var Ctor = null
  if (typeof options === 'function') {
    Ctor = options
    options = Ctor.options
  }
  makeOptionsHot(id, options)
  map[id] = {
    Ctor: Ctor,
    options: options,
    instances: []
  }
}

/**
 * Check if module is recorded
 *
 * @param {String} id
 */

exports.isRecorded = function (id) {
  return typeof map[id] !== 'undefined'
}

/**
 * Make a Component options object hot.
 *
 * @param {String} id
 * @param {Object} options
 */

function makeOptionsHot(id, options) {
  if (options.functional) {
    var render = options.render
    options.render = function (h, ctx) {
      var instances = map[id].instances
      if (ctx && instances.indexOf(ctx.parent) < 0) {
        instances.push(ctx.parent)
      }
      return render(h, ctx)
    }
  } else {
    injectHook(options, initHookName, function() {
      var record = map[id]
      if (!record.Ctor) {
        record.Ctor = this.constructor
      }
      record.instances.push(this)
    })
    injectHook(options, 'beforeDestroy', function() {
      var instances = map[id].instances
      instances.splice(instances.indexOf(this), 1)
    })
  }
}

/**
 * Inject a hook to a hot reloadable component so that
 * we can keep track of it.
 *
 * @param {Object} options
 * @param {String} name
 * @param {Function} hook
 */

function injectHook(options, name, hook) {
  var existing = options[name]
  options[name] = existing
    ? Array.isArray(existing) ? existing.concat(hook) : [existing, hook]
    : [hook]
}

function tryWrap(fn) {
  return function (id, arg) {
    try {
      fn(id, arg)
    } catch (e) {
      console.error(e)
      console.warn(
        'Something went wrong during Vue component hot-reload. Full reload required.'
      )
    }
  }
}

function updateOptions (oldOptions, newOptions) {
  for (var key in oldOptions) {
    if (!(key in newOptions)) {
      delete oldOptions[key]
    }
  }
  for (var key$1 in newOptions) {
    oldOptions[key$1] = newOptions[key$1]
  }
}

exports.rerender = tryWrap(function (id, options) {
  var record = map[id]
  if (!options) {
    record.instances.slice().forEach(function (instance) {
      instance.$forceUpdate()
    })
    return
  }
  if (typeof options === 'function') {
    options = options.options
  }
  if (record.Ctor) {
    record.Ctor.options.render = options.render
    record.Ctor.options.staticRenderFns = options.staticRenderFns
    record.instances.slice().forEach(function (instance) {
      instance.$options.render = options.render
      instance.$options.staticRenderFns = options.staticRenderFns
      // reset static trees
      // pre 2.5, all static trees are cached together on the instance
      if (instance._staticTrees) {
        instance._staticTrees = []
      }
      // 2.5.0
      if (Array.isArray(record.Ctor.options.cached)) {
        record.Ctor.options.cached = []
      }
      // 2.5.3
      if (Array.isArray(instance.$options.cached)) {
        instance.$options.cached = []
      }

      // post 2.5.4: v-once trees are cached on instance._staticTrees.
      // Pure static trees are cached on the staticRenderFns array
      // (both already reset above)

      // 2.6: temporarily mark rendered scoped slots as unstable so that
      // child components can be forced to update
      var restore = patchScopedSlots(instance)
      instance.$forceUpdate()
      instance.$nextTick(restore)
    })
  } else {
    // functional or no instance created yet
    record.options.render = options.render
    record.options.staticRenderFns = options.staticRenderFns

    // handle functional component re-render
    if (record.options.functional) {
      // rerender with full options
      if (Object.keys(options).length > 2) {
        updateOptions(record.options, options)
      } else {
        // template-only rerender.
        // need to inject the style injection code for CSS modules
        // to work properly.
        var injectStyles = record.options._injectStyles
        if (injectStyles) {
          var render = options.render
          record.options.render = function (h, ctx) {
            injectStyles.call(ctx)
            return render(h, ctx)
          }
        }
      }
      record.options._Ctor = null
      // 2.5.3
      if (Array.isArray(record.options.cached)) {
        record.options.cached = []
      }
      record.instances.slice().forEach(function (instance) {
        instance.$forceUpdate()
      })
    }
  }
})

exports.reload = tryWrap(function (id, options) {
  var record = map[id]
  if (options) {
    if (typeof options === 'function') {
      options = options.options
    }
    makeOptionsHot(id, options)
    if (record.Ctor) {
      if (version[1] < 2) {
        // preserve pre 2.2 behavior for global mixin handling
        record.Ctor.extendOptions = options
      }
      var newCtor = record.Ctor.super.extend(options)
      record.Ctor.options = newCtor.options
      record.Ctor.cid = newCtor.cid
      record.Ctor.prototype = newCtor.prototype
      if (newCtor.release) {
        // temporary global mixin strategy used in < 2.0.0-alpha.6
        newCtor.release()
      }
    } else {
      updateOptions(record.options, options)
    }
  }
  record.instances.slice().forEach(function (instance) {
    if (instance.$vnode && instance.$vnode.context) {
      instance.$vnode.context.$forceUpdate()
    } else {
      console.warn(
        'Root or manually mounted instance modified. Full reload required.'
      )
    }
  })
})

// 2.6 optimizes template-compiled scoped slots and skips updates if child
// only uses scoped slots. We need to patch the scoped slots resolving helper
// to temporarily mark all scoped slots as unstable in order to force child
// updates.
function patchScopedSlots (instance) {
  if (!instance._u) { return }
  // https://github.com/vuejs/vue/blob/dev/src/core/instance/render-helpers/resolve-scoped-slots.js
  var original = instance._u
  instance._u = function (slots) {
    try {
      // 2.6.4 ~ 2.6.6
      return original(slots, true)
    } catch (e) {
      // 2.5 / >= 2.6.7
      return original(slots, null, true)
    }
  }
  return function () {
    instance._u = original
  }
}

},{}],"src/App.vue":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
var _default = {
  data: function data() {
    return {
      steps: [{
        active: true,
        disabled: false,
        icon: 'info circle',
        title: 'Welcome!',
        description: 'Start here!'
      }, {
        active: false,
        disabled: true,
        icon: 'users',
        title: 'Attendance',
        description: 'Who is coming?'
      }, {
        active: false,
        disabled: true,
        icon: 'star',
        title: 'How many shows?',
        description: 'Most groups go with two!'
      }, {
        active: false,
        disabled: true,
        icon: 'calendar alternate',
        title: 'Dates',
        description: 'When is your group coming?'
      }, {
        active: false,
        disabled: true,
        icon: 'users',
        title: 'Attendance',
        description: 'Who is coming?'
      }, {
        active: false,
        disabled: true,
        icon: 'film',
        title: 'Shows',
        description: "What's your group watching?"
      }, {
        active: false,
        disabled: true,
        icon: 'star outline',
        title: 'Post Show',
        description: 'Stars or Planets?'
      }, {
        active: false,
        disabled: true,
        icon: 'university',
        title: 'School Info',
        description: 'We need your school info'
      }, {
        active: false,
        disabled: true,
        icon: 'user',
        title: 'Teacher Info',
        description: 'We need your info'
      }],
      transition: 'slide-right'
    };
  },
  watch: {
    '$route': function $route(to, from) {
      this.transition = to.meta.step < from.meta.step ? 'slide-right' : 'slide-left';
    }
  }
};
exports.default = _default;
        var $cc123d = exports.default || module.exports;
      
      if (typeof $cc123d === 'function') {
        $cc123d = $cc123d.options;
      }
    
        /* template */
        Object.assign($cc123d, (function () {
          var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "ui fluid container" }, [
    _c("div", { staticClass: "ui grid" }, [
      _c(
        "div",
        { staticClass: "four wide column" },
        [
          _c("sui-step-group", {
            attrs: { size: "small", vertical: "", steps: _vm.steps }
          })
        ],
        1
      ),
      _vm._v(" "),
      _c(
        "div",
        { staticClass: "twelve wide column" },
        [
          _c(
            "transition",
            { attrs: { name: _vm.transition, mode: "out-in" } },
            [_c("router-view")],
            1
          )
        ],
        1
      )
    ])
  ])
}
var staticRenderFns = []
render._withStripped = true

          return {
            render: render,
            staticRenderFns: staticRenderFns,
            _compiled: true,
            _scopeId: null,
            functional: undefined
          };
        })());
      
    /* hot reload */
    (function () {
      if (module.hot) {
        var api = require('vue-hot-reload-api');
        api.install(require('vue'));
        if (api.compatible) {
          module.hot.accept();
          if (!module.hot.data) {
            api.createRecord('$cc123d', $cc123d);
          } else {
            api.reload('$cc123d', $cc123d);
          }
        }

        
        var reloadCSS = require('_css_loader');
        module.hot.dispose(reloadCSS);
        module.hot.accept(reloadCSS);
      
      }
    })();
},{"_css_loader":"node_modules/parcel-bundler/src/builtins/css-loader.js","vue-hot-reload-api":"node_modules/vue-hot-reload-api/dist/index.js","vue":"node_modules/vue/dist/vue.runtime.esm.js"}],"node_modules/core-js/library/modules/_global.js":[function(require,module,exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef

},{}],"node_modules/core-js/library/modules/_core.js":[function(require,module,exports) {
var core = module.exports = { version: '2.6.9' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef

},{}],"node_modules/core-js/library/modules/_a-function.js":[function(require,module,exports) {
module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};

},{}],"node_modules/core-js/library/modules/_ctx.js":[function(require,module,exports) {
// optional / simple context binding
var aFunction = require('./_a-function');
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};

},{"./_a-function":"node_modules/core-js/library/modules/_a-function.js"}],"node_modules/core-js/library/modules/_is-object.js":[function(require,module,exports) {
module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};

},{}],"node_modules/core-js/library/modules/_an-object.js":[function(require,module,exports) {
var isObject = require('./_is-object');
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};

},{"./_is-object":"node_modules/core-js/library/modules/_is-object.js"}],"node_modules/core-js/library/modules/_fails.js":[function(require,module,exports) {
module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};

},{}],"node_modules/core-js/library/modules/_descriptors.js":[function(require,module,exports) {
// Thank's IE8 for his funny defineProperty
module.exports = !require('./_fails')(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});

},{"./_fails":"node_modules/core-js/library/modules/_fails.js"}],"node_modules/core-js/library/modules/_dom-create.js":[function(require,module,exports) {
var isObject = require('./_is-object');
var document = require('./_global').document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};

},{"./_is-object":"node_modules/core-js/library/modules/_is-object.js","./_global":"node_modules/core-js/library/modules/_global.js"}],"node_modules/core-js/library/modules/_ie8-dom-define.js":[function(require,module,exports) {
module.exports = !require('./_descriptors') && !require('./_fails')(function () {
  return Object.defineProperty(require('./_dom-create')('div'), 'a', { get: function () { return 7; } }).a != 7;
});

},{"./_descriptors":"node_modules/core-js/library/modules/_descriptors.js","./_fails":"node_modules/core-js/library/modules/_fails.js","./_dom-create":"node_modules/core-js/library/modules/_dom-create.js"}],"node_modules/core-js/library/modules/_to-primitive.js":[function(require,module,exports) {
// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = require('./_is-object');
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (it, S) {
  if (!isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};

},{"./_is-object":"node_modules/core-js/library/modules/_is-object.js"}],"node_modules/core-js/library/modules/_object-dp.js":[function(require,module,exports) {
var anObject = require('./_an-object');
var IE8_DOM_DEFINE = require('./_ie8-dom-define');
var toPrimitive = require('./_to-primitive');
var dP = Object.defineProperty;

exports.f = require('./_descriptors') ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};

},{"./_an-object":"node_modules/core-js/library/modules/_an-object.js","./_ie8-dom-define":"node_modules/core-js/library/modules/_ie8-dom-define.js","./_to-primitive":"node_modules/core-js/library/modules/_to-primitive.js","./_descriptors":"node_modules/core-js/library/modules/_descriptors.js"}],"node_modules/core-js/library/modules/_property-desc.js":[function(require,module,exports) {
module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};

},{}],"node_modules/core-js/library/modules/_hide.js":[function(require,module,exports) {
var dP = require('./_object-dp');
var createDesc = require('./_property-desc');
module.exports = require('./_descriptors') ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};

},{"./_object-dp":"node_modules/core-js/library/modules/_object-dp.js","./_property-desc":"node_modules/core-js/library/modules/_property-desc.js","./_descriptors":"node_modules/core-js/library/modules/_descriptors.js"}],"node_modules/core-js/library/modules/_has.js":[function(require,module,exports) {
var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};

},{}],"node_modules/core-js/library/modules/_export.js":[function(require,module,exports) {

var global = require('./_global');
var core = require('./_core');
var ctx = require('./_ctx');
var hide = require('./_hide');
var has = require('./_has');
var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var IS_WRAP = type & $export.W;
  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
  var expProto = exports[PROTOTYPE];
  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE];
  var key, own, out;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    if (own && has(exports, key)) continue;
    // export native or passed
    out = own ? target[key] : source[key];
    // prevent global pollution for namespaces
    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
    // bind timers to global for call from export context
    : IS_BIND && own ? ctx(out, global)
    // wrap global constructors for prevent change them in library
    : IS_WRAP && target[key] == out ? (function (C) {
      var F = function (a, b, c) {
        if (this instanceof C) {
          switch (arguments.length) {
            case 0: return new C();
            case 1: return new C(a);
            case 2: return new C(a, b);
          } return new C(a, b, c);
        } return C.apply(this, arguments);
      };
      F[PROTOTYPE] = C[PROTOTYPE];
      return F;
    // make static versions for prototype methods
    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
    if (IS_PROTO) {
      (exports.virtual || (exports.virtual = {}))[key] = out;
      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
      if (type & $export.R && expProto && !expProto[key]) hide(expProto, key, out);
    }
  }
};
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library`
module.exports = $export;

},{"./_global":"node_modules/core-js/library/modules/_global.js","./_core":"node_modules/core-js/library/modules/_core.js","./_ctx":"node_modules/core-js/library/modules/_ctx.js","./_hide":"node_modules/core-js/library/modules/_hide.js","./_has":"node_modules/core-js/library/modules/_has.js"}],"node_modules/core-js/library/modules/_cof.js":[function(require,module,exports) {
var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};

},{}],"node_modules/core-js/library/modules/_iobject.js":[function(require,module,exports) {
// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = require('./_cof');
// eslint-disable-next-line no-prototype-builtins
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};

},{"./_cof":"node_modules/core-js/library/modules/_cof.js"}],"node_modules/core-js/library/modules/_defined.js":[function(require,module,exports) {
// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};

},{}],"node_modules/core-js/library/modules/_to-iobject.js":[function(require,module,exports) {
// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = require('./_iobject');
var defined = require('./_defined');
module.exports = function (it) {
  return IObject(defined(it));
};

},{"./_iobject":"node_modules/core-js/library/modules/_iobject.js","./_defined":"node_modules/core-js/library/modules/_defined.js"}],"node_modules/core-js/library/modules/_to-integer.js":[function(require,module,exports) {
// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
module.exports = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};

},{}],"node_modules/core-js/library/modules/_to-length.js":[function(require,module,exports) {
// 7.1.15 ToLength
var toInteger = require('./_to-integer');
var min = Math.min;
module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};

},{"./_to-integer":"node_modules/core-js/library/modules/_to-integer.js"}],"node_modules/core-js/library/modules/_to-absolute-index.js":[function(require,module,exports) {
var toInteger = require('./_to-integer');
var max = Math.max;
var min = Math.min;
module.exports = function (index, length) {
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};

},{"./_to-integer":"node_modules/core-js/library/modules/_to-integer.js"}],"node_modules/core-js/library/modules/_array-includes.js":[function(require,module,exports) {
// false -> Array#indexOf
// true  -> Array#includes
var toIObject = require('./_to-iobject');
var toLength = require('./_to-length');
var toAbsoluteIndex = require('./_to-absolute-index');
module.exports = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
      if (O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};

},{"./_to-iobject":"node_modules/core-js/library/modules/_to-iobject.js","./_to-length":"node_modules/core-js/library/modules/_to-length.js","./_to-absolute-index":"node_modules/core-js/library/modules/_to-absolute-index.js"}],"node_modules/core-js/library/modules/_library.js":[function(require,module,exports) {
module.exports = true;

},{}],"node_modules/core-js/library/modules/_shared.js":[function(require,module,exports) {

var core = require('./_core');
var global = require('./_global');
var SHARED = '__core-js_shared__';
var store = global[SHARED] || (global[SHARED] = {});

(module.exports = function (key, value) {
  return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: core.version,
  mode: require('./_library') ? 'pure' : 'global',
  copyright: '© 2019 Denis Pushkarev (zloirock.ru)'
});

},{"./_core":"node_modules/core-js/library/modules/_core.js","./_global":"node_modules/core-js/library/modules/_global.js","./_library":"node_modules/core-js/library/modules/_library.js"}],"node_modules/core-js/library/modules/_uid.js":[function(require,module,exports) {
var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};

},{}],"node_modules/core-js/library/modules/_shared-key.js":[function(require,module,exports) {
var shared = require('./_shared')('keys');
var uid = require('./_uid');
module.exports = function (key) {
  return shared[key] || (shared[key] = uid(key));
};

},{"./_shared":"node_modules/core-js/library/modules/_shared.js","./_uid":"node_modules/core-js/library/modules/_uid.js"}],"node_modules/core-js/library/modules/_object-keys-internal.js":[function(require,module,exports) {
var has = require('./_has');
var toIObject = require('./_to-iobject');
var arrayIndexOf = require('./_array-includes')(false);
var IE_PROTO = require('./_shared-key')('IE_PROTO');

module.exports = function (object, names) {
  var O = toIObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) if (key != IE_PROTO) has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};

},{"./_has":"node_modules/core-js/library/modules/_has.js","./_to-iobject":"node_modules/core-js/library/modules/_to-iobject.js","./_array-includes":"node_modules/core-js/library/modules/_array-includes.js","./_shared-key":"node_modules/core-js/library/modules/_shared-key.js"}],"node_modules/core-js/library/modules/_enum-bug-keys.js":[function(require,module,exports) {
// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');

},{}],"node_modules/core-js/library/modules/_object-keys.js":[function(require,module,exports) {
// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys = require('./_object-keys-internal');
var enumBugKeys = require('./_enum-bug-keys');

module.exports = Object.keys || function keys(O) {
  return $keys(O, enumBugKeys);
};

},{"./_object-keys-internal":"node_modules/core-js/library/modules/_object-keys-internal.js","./_enum-bug-keys":"node_modules/core-js/library/modules/_enum-bug-keys.js"}],"node_modules/core-js/library/modules/_object-gops.js":[function(require,module,exports) {
exports.f = Object.getOwnPropertySymbols;

},{}],"node_modules/core-js/library/modules/_object-pie.js":[function(require,module,exports) {
exports.f = {}.propertyIsEnumerable;

},{}],"node_modules/core-js/library/modules/_to-object.js":[function(require,module,exports) {
// 7.1.13 ToObject(argument)
var defined = require('./_defined');
module.exports = function (it) {
  return Object(defined(it));
};

},{"./_defined":"node_modules/core-js/library/modules/_defined.js"}],"node_modules/core-js/library/modules/_object-assign.js":[function(require,module,exports) {
'use strict';
// 19.1.2.1 Object.assign(target, source, ...)
var DESCRIPTORS = require('./_descriptors');
var getKeys = require('./_object-keys');
var gOPS = require('./_object-gops');
var pIE = require('./_object-pie');
var toObject = require('./_to-object');
var IObject = require('./_iobject');
var $assign = Object.assign;

// should work with symbols and should have deterministic property order (V8 bug)
module.exports = !$assign || require('./_fails')(function () {
  var A = {};
  var B = {};
  // eslint-disable-next-line no-undef
  var S = Symbol();
  var K = 'abcdefghijklmnopqrst';
  A[S] = 7;
  K.split('').forEach(function (k) { B[k] = k; });
  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
}) ? function assign(target, source) { // eslint-disable-line no-unused-vars
  var T = toObject(target);
  var aLen = arguments.length;
  var index = 1;
  var getSymbols = gOPS.f;
  var isEnum = pIE.f;
  while (aLen > index) {
    var S = IObject(arguments[index++]);
    var keys = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S);
    var length = keys.length;
    var j = 0;
    var key;
    while (length > j) {
      key = keys[j++];
      if (!DESCRIPTORS || isEnum.call(S, key)) T[key] = S[key];
    }
  } return T;
} : $assign;

},{"./_descriptors":"node_modules/core-js/library/modules/_descriptors.js","./_object-keys":"node_modules/core-js/library/modules/_object-keys.js","./_object-gops":"node_modules/core-js/library/modules/_object-gops.js","./_object-pie":"node_modules/core-js/library/modules/_object-pie.js","./_to-object":"node_modules/core-js/library/modules/_to-object.js","./_iobject":"node_modules/core-js/library/modules/_iobject.js","./_fails":"node_modules/core-js/library/modules/_fails.js"}],"node_modules/core-js/library/modules/es6.object.assign.js":[function(require,module,exports) {
// 19.1.3.1 Object.assign(target, source)
var $export = require('./_export');

$export($export.S + $export.F, 'Object', { assign: require('./_object-assign') });

},{"./_export":"node_modules/core-js/library/modules/_export.js","./_object-assign":"node_modules/core-js/library/modules/_object-assign.js"}],"node_modules/core-js/library/fn/object/assign.js":[function(require,module,exports) {
require('../../modules/es6.object.assign');
module.exports = require('../../modules/_core').Object.assign;

},{"../../modules/es6.object.assign":"node_modules/core-js/library/modules/es6.object.assign.js","../../modules/_core":"node_modules/core-js/library/modules/_core.js"}],"node_modules/babel-runtime/core-js/object/assign.js":[function(require,module,exports) {
module.exports = { "default": require("core-js/library/fn/object/assign"), __esModule: true };
},{"core-js/library/fn/object/assign":"node_modules/core-js/library/fn/object/assign.js"}],"node_modules/babel-runtime/helpers/extends.js":[function(require,module,exports) {
"use strict";

exports.__esModule = true;

var _assign = require("../core-js/object/assign");

var _assign2 = _interopRequireDefault(_assign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _assign2.default || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};
},{"../core-js/object/assign":"node_modules/babel-runtime/core-js/object/assign.js"}],"node_modules/babel-helper-vue-jsx-merge-props/index.js":[function(require,module,exports) {
var nestRE = /^(attrs|props|on|nativeOn|class|style|hook)$/

module.exports = function mergeJSXProps (objs) {
  return objs.reduce(function (a, b) {
    var aa, bb, key, nestedKey, temp
    for (key in b) {
      aa = a[key]
      bb = b[key]
      if (aa && nestRE.test(key)) {
        // normalize class
        if (key === 'class') {
          if (typeof aa === 'string') {
            temp = aa
            a[key] = aa = {}
            aa[temp] = true
          }
          if (typeof bb === 'string') {
            temp = bb
            b[key] = bb = {}
            bb[temp] = true
          }
        }
        if (key === 'on' || key === 'nativeOn' || key === 'hook') {
          // merge functions
          for (nestedKey in bb) {
            aa[nestedKey] = mergeFn(aa[nestedKey], bb[nestedKey])
          }
        } else if (Array.isArray(aa)) {
          a[key] = aa.concat(bb)
        } else if (Array.isArray(bb)) {
          a[key] = [aa].concat(bb)
        } else {
          for (nestedKey in bb) {
            aa[nestedKey] = bb[nestedKey]
          }
        }
      } else {
        a[key] = b[key]
      }
    }
    return a
  }, {})
}

function mergeFn (a, b) {
  return function () {
    a && a.apply(this, arguments)
    b && b.apply(this, arguments)
  }
}

},{}],"node_modules/core-js/library/modules/_string-at.js":[function(require,module,exports) {
var toInteger = require('./_to-integer');
var defined = require('./_defined');
// true  -> String#at
// false -> String#codePointAt
module.exports = function (TO_STRING) {
  return function (that, pos) {
    var s = String(defined(that));
    var i = toInteger(pos);
    var l = s.length;
    var a, b;
    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};

},{"./_to-integer":"node_modules/core-js/library/modules/_to-integer.js","./_defined":"node_modules/core-js/library/modules/_defined.js"}],"node_modules/core-js/library/modules/_redefine.js":[function(require,module,exports) {
module.exports = require('./_hide');

},{"./_hide":"node_modules/core-js/library/modules/_hide.js"}],"node_modules/core-js/library/modules/_iterators.js":[function(require,module,exports) {
module.exports = {};

},{}],"node_modules/core-js/library/modules/_object-dps.js":[function(require,module,exports) {
var dP = require('./_object-dp');
var anObject = require('./_an-object');
var getKeys = require('./_object-keys');

module.exports = require('./_descriptors') ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = getKeys(Properties);
  var length = keys.length;
  var i = 0;
  var P;
  while (length > i) dP.f(O, P = keys[i++], Properties[P]);
  return O;
};

},{"./_object-dp":"node_modules/core-js/library/modules/_object-dp.js","./_an-object":"node_modules/core-js/library/modules/_an-object.js","./_object-keys":"node_modules/core-js/library/modules/_object-keys.js","./_descriptors":"node_modules/core-js/library/modules/_descriptors.js"}],"node_modules/core-js/library/modules/_html.js":[function(require,module,exports) {
var document = require('./_global').document;
module.exports = document && document.documentElement;

},{"./_global":"node_modules/core-js/library/modules/_global.js"}],"node_modules/core-js/library/modules/_object-create.js":[function(require,module,exports) {
// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject = require('./_an-object');
var dPs = require('./_object-dps');
var enumBugKeys = require('./_enum-bug-keys');
var IE_PROTO = require('./_shared-key')('IE_PROTO');
var Empty = function () { /* empty */ };
var PROTOTYPE = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = require('./_dom-create')('iframe');
  var i = enumBugKeys.length;
  var lt = '<';
  var gt = '>';
  var iframeDocument;
  iframe.style.display = 'none';
  require('./_html').appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while (i--) delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty();
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};

},{"./_an-object":"node_modules/core-js/library/modules/_an-object.js","./_object-dps":"node_modules/core-js/library/modules/_object-dps.js","./_enum-bug-keys":"node_modules/core-js/library/modules/_enum-bug-keys.js","./_shared-key":"node_modules/core-js/library/modules/_shared-key.js","./_dom-create":"node_modules/core-js/library/modules/_dom-create.js","./_html":"node_modules/core-js/library/modules/_html.js"}],"node_modules/core-js/library/modules/_wks.js":[function(require,module,exports) {
var store = require('./_shared')('wks');
var uid = require('./_uid');
var Symbol = require('./_global').Symbol;
var USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;

},{"./_shared":"node_modules/core-js/library/modules/_shared.js","./_uid":"node_modules/core-js/library/modules/_uid.js","./_global":"node_modules/core-js/library/modules/_global.js"}],"node_modules/core-js/library/modules/_set-to-string-tag.js":[function(require,module,exports) {
var def = require('./_object-dp').f;
var has = require('./_has');
var TAG = require('./_wks')('toStringTag');

module.exports = function (it, tag, stat) {
  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
};

},{"./_object-dp":"node_modules/core-js/library/modules/_object-dp.js","./_has":"node_modules/core-js/library/modules/_has.js","./_wks":"node_modules/core-js/library/modules/_wks.js"}],"node_modules/core-js/library/modules/_iter-create.js":[function(require,module,exports) {
'use strict';
var create = require('./_object-create');
var descriptor = require('./_property-desc');
var setToStringTag = require('./_set-to-string-tag');
var IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
require('./_hide')(IteratorPrototype, require('./_wks')('iterator'), function () { return this; });

module.exports = function (Constructor, NAME, next) {
  Constructor.prototype = create(IteratorPrototype, { next: descriptor(1, next) });
  setToStringTag(Constructor, NAME + ' Iterator');
};

},{"./_object-create":"node_modules/core-js/library/modules/_object-create.js","./_property-desc":"node_modules/core-js/library/modules/_property-desc.js","./_set-to-string-tag":"node_modules/core-js/library/modules/_set-to-string-tag.js","./_hide":"node_modules/core-js/library/modules/_hide.js","./_wks":"node_modules/core-js/library/modules/_wks.js"}],"node_modules/core-js/library/modules/_object-gpo.js":[function(require,module,exports) {
// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has = require('./_has');
var toObject = require('./_to-object');
var IE_PROTO = require('./_shared-key')('IE_PROTO');
var ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};

},{"./_has":"node_modules/core-js/library/modules/_has.js","./_to-object":"node_modules/core-js/library/modules/_to-object.js","./_shared-key":"node_modules/core-js/library/modules/_shared-key.js"}],"node_modules/core-js/library/modules/_iter-define.js":[function(require,module,exports) {
'use strict';
var LIBRARY = require('./_library');
var $export = require('./_export');
var redefine = require('./_redefine');
var hide = require('./_hide');
var Iterators = require('./_iterators');
var $iterCreate = require('./_iter-create');
var setToStringTag = require('./_set-to-string-tag');
var getPrototypeOf = require('./_object-gpo');
var ITERATOR = require('./_wks')('iterator');
var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
var FF_ITERATOR = '@@iterator';
var KEYS = 'keys';
var VALUES = 'values';

var returnThis = function () { return this; };

module.exports = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
  $iterCreate(Constructor, NAME, next);
  var getMethod = function (kind) {
    if (!BUGGY && kind in proto) return proto[kind];
    switch (kind) {
      case KEYS: return function keys() { return new Constructor(this, kind); };
      case VALUES: return function values() { return new Constructor(this, kind); };
    } return function entries() { return new Constructor(this, kind); };
  };
  var TAG = NAME + ' Iterator';
  var DEF_VALUES = DEFAULT == VALUES;
  var VALUES_BUG = false;
  var proto = Base.prototype;
  var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
  var $default = $native || getMethod(DEFAULT);
  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
  var methods, key, IteratorPrototype;
  // Fix native
  if ($anyNative) {
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base()));
    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if (!LIBRARY && typeof IteratorPrototype[ITERATOR] != 'function') hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if (DEF_VALUES && $native && $native.name !== VALUES) {
    VALUES_BUG = true;
    $default = function values() { return $native.call(this); };
  }
  // Define iterator
  if ((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG] = returnThis;
  if (DEFAULT) {
    methods = {
      values: DEF_VALUES ? $default : getMethod(VALUES),
      keys: IS_SET ? $default : getMethod(KEYS),
      entries: $entries
    };
    if (FORCED) for (key in methods) {
      if (!(key in proto)) redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};

},{"./_library":"node_modules/core-js/library/modules/_library.js","./_export":"node_modules/core-js/library/modules/_export.js","./_redefine":"node_modules/core-js/library/modules/_redefine.js","./_hide":"node_modules/core-js/library/modules/_hide.js","./_iterators":"node_modules/core-js/library/modules/_iterators.js","./_iter-create":"node_modules/core-js/library/modules/_iter-create.js","./_set-to-string-tag":"node_modules/core-js/library/modules/_set-to-string-tag.js","./_object-gpo":"node_modules/core-js/library/modules/_object-gpo.js","./_wks":"node_modules/core-js/library/modules/_wks.js"}],"node_modules/core-js/library/modules/es6.string.iterator.js":[function(require,module,exports) {
'use strict';
var $at = require('./_string-at')(true);

// 21.1.3.27 String.prototype[@@iterator]()
require('./_iter-define')(String, 'String', function (iterated) {
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var index = this._i;
  var point;
  if (index >= O.length) return { value: undefined, done: true };
  point = $at(O, index);
  this._i += point.length;
  return { value: point, done: false };
});

},{"./_string-at":"node_modules/core-js/library/modules/_string-at.js","./_iter-define":"node_modules/core-js/library/modules/_iter-define.js"}],"node_modules/core-js/library/modules/_add-to-unscopables.js":[function(require,module,exports) {
module.exports = function () { /* empty */ };

},{}],"node_modules/core-js/library/modules/_iter-step.js":[function(require,module,exports) {
module.exports = function (done, value) {
  return { value: value, done: !!done };
};

},{}],"node_modules/core-js/library/modules/es6.array.iterator.js":[function(require,module,exports) {
'use strict';
var addToUnscopables = require('./_add-to-unscopables');
var step = require('./_iter-step');
var Iterators = require('./_iterators');
var toIObject = require('./_to-iobject');

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = require('./_iter-define')(Array, 'Array', function (iterated, kind) {
  this._t = toIObject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var kind = this._k;
  var index = this._i++;
  if (!O || index >= O.length) {
    this._t = undefined;
    return step(1);
  }
  if (kind == 'keys') return step(0, index);
  if (kind == 'values') return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');

},{"./_add-to-unscopables":"node_modules/core-js/library/modules/_add-to-unscopables.js","./_iter-step":"node_modules/core-js/library/modules/_iter-step.js","./_iterators":"node_modules/core-js/library/modules/_iterators.js","./_to-iobject":"node_modules/core-js/library/modules/_to-iobject.js","./_iter-define":"node_modules/core-js/library/modules/_iter-define.js"}],"node_modules/core-js/library/modules/web.dom.iterable.js":[function(require,module,exports) {

require('./es6.array.iterator');
var global = require('./_global');
var hide = require('./_hide');
var Iterators = require('./_iterators');
var TO_STRING_TAG = require('./_wks')('toStringTag');

var DOMIterables = ('CSSRuleList,CSSStyleDeclaration,CSSValueList,ClientRectList,DOMRectList,DOMStringList,' +
  'DOMTokenList,DataTransferItemList,FileList,HTMLAllCollection,HTMLCollection,HTMLFormElement,HTMLSelectElement,' +
  'MediaList,MimeTypeArray,NamedNodeMap,NodeList,PaintRequestList,Plugin,PluginArray,SVGLengthList,SVGNumberList,' +
  'SVGPathSegList,SVGPointList,SVGStringList,SVGTransformList,SourceBufferList,StyleSheetList,TextTrackCueList,' +
  'TextTrackList,TouchList').split(',');

for (var i = 0; i < DOMIterables.length; i++) {
  var NAME = DOMIterables[i];
  var Collection = global[NAME];
  var proto = Collection && Collection.prototype;
  if (proto && !proto[TO_STRING_TAG]) hide(proto, TO_STRING_TAG, NAME);
  Iterators[NAME] = Iterators.Array;
}

},{"./es6.array.iterator":"node_modules/core-js/library/modules/es6.array.iterator.js","./_global":"node_modules/core-js/library/modules/_global.js","./_hide":"node_modules/core-js/library/modules/_hide.js","./_iterators":"node_modules/core-js/library/modules/_iterators.js","./_wks":"node_modules/core-js/library/modules/_wks.js"}],"node_modules/core-js/library/modules/_wks-ext.js":[function(require,module,exports) {
exports.f = require('./_wks');

},{"./_wks":"node_modules/core-js/library/modules/_wks.js"}],"node_modules/core-js/library/fn/symbol/iterator.js":[function(require,module,exports) {
require('../../modules/es6.string.iterator');
require('../../modules/web.dom.iterable');
module.exports = require('../../modules/_wks-ext').f('iterator');

},{"../../modules/es6.string.iterator":"node_modules/core-js/library/modules/es6.string.iterator.js","../../modules/web.dom.iterable":"node_modules/core-js/library/modules/web.dom.iterable.js","../../modules/_wks-ext":"node_modules/core-js/library/modules/_wks-ext.js"}],"node_modules/babel-runtime/core-js/symbol/iterator.js":[function(require,module,exports) {
module.exports = { "default": require("core-js/library/fn/symbol/iterator"), __esModule: true };
},{"core-js/library/fn/symbol/iterator":"node_modules/core-js/library/fn/symbol/iterator.js"}],"node_modules/core-js/library/modules/_meta.js":[function(require,module,exports) {
var META = require('./_uid')('meta');
var isObject = require('./_is-object');
var has = require('./_has');
var setDesc = require('./_object-dp').f;
var id = 0;
var isExtensible = Object.isExtensible || function () {
  return true;
};
var FREEZE = !require('./_fails')(function () {
  return isExtensible(Object.preventExtensions({}));
});
var setMeta = function (it) {
  setDesc(it, META, { value: {
    i: 'O' + ++id, // object ID
    w: {}          // weak collections IDs
  } });
};
var fastKey = function (it, create) {
  // return primitive with prefix
  if (!isObject(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return 'F';
    // not necessary to add metadata
    if (!create) return 'E';
    // add missing metadata
    setMeta(it);
  // return object ID
  } return it[META].i;
};
var getWeak = function (it, create) {
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return true;
    // not necessary to add metadata
    if (!create) return false;
    // add missing metadata
    setMeta(it);
  // return hash weak collections IDs
  } return it[META].w;
};
// add metadata on freeze-family methods calling
var onFreeze = function (it) {
  if (FREEZE && meta.NEED && isExtensible(it) && !has(it, META)) setMeta(it);
  return it;
};
var meta = module.exports = {
  KEY: META,
  NEED: false,
  fastKey: fastKey,
  getWeak: getWeak,
  onFreeze: onFreeze
};

},{"./_uid":"node_modules/core-js/library/modules/_uid.js","./_is-object":"node_modules/core-js/library/modules/_is-object.js","./_has":"node_modules/core-js/library/modules/_has.js","./_object-dp":"node_modules/core-js/library/modules/_object-dp.js","./_fails":"node_modules/core-js/library/modules/_fails.js"}],"node_modules/core-js/library/modules/_wks-define.js":[function(require,module,exports) {

var global = require('./_global');
var core = require('./_core');
var LIBRARY = require('./_library');
var wksExt = require('./_wks-ext');
var defineProperty = require('./_object-dp').f;
module.exports = function (name) {
  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
  if (name.charAt(0) != '_' && !(name in $Symbol)) defineProperty($Symbol, name, { value: wksExt.f(name) });
};

},{"./_global":"node_modules/core-js/library/modules/_global.js","./_core":"node_modules/core-js/library/modules/_core.js","./_library":"node_modules/core-js/library/modules/_library.js","./_wks-ext":"node_modules/core-js/library/modules/_wks-ext.js","./_object-dp":"node_modules/core-js/library/modules/_object-dp.js"}],"node_modules/core-js/library/modules/_enum-keys.js":[function(require,module,exports) {
// all enumerable object keys, includes symbols
var getKeys = require('./_object-keys');
var gOPS = require('./_object-gops');
var pIE = require('./_object-pie');
module.exports = function (it) {
  var result = getKeys(it);
  var getSymbols = gOPS.f;
  if (getSymbols) {
    var symbols = getSymbols(it);
    var isEnum = pIE.f;
    var i = 0;
    var key;
    while (symbols.length > i) if (isEnum.call(it, key = symbols[i++])) result.push(key);
  } return result;
};

},{"./_object-keys":"node_modules/core-js/library/modules/_object-keys.js","./_object-gops":"node_modules/core-js/library/modules/_object-gops.js","./_object-pie":"node_modules/core-js/library/modules/_object-pie.js"}],"node_modules/core-js/library/modules/_is-array.js":[function(require,module,exports) {
// 7.2.2 IsArray(argument)
var cof = require('./_cof');
module.exports = Array.isArray || function isArray(arg) {
  return cof(arg) == 'Array';
};

},{"./_cof":"node_modules/core-js/library/modules/_cof.js"}],"node_modules/core-js/library/modules/_object-gopn.js":[function(require,module,exports) {
// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
var $keys = require('./_object-keys-internal');
var hiddenKeys = require('./_enum-bug-keys').concat('length', 'prototype');

exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return $keys(O, hiddenKeys);
};

},{"./_object-keys-internal":"node_modules/core-js/library/modules/_object-keys-internal.js","./_enum-bug-keys":"node_modules/core-js/library/modules/_enum-bug-keys.js"}],"node_modules/core-js/library/modules/_object-gopn-ext.js":[function(require,module,exports) {
// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
var toIObject = require('./_to-iobject');
var gOPN = require('./_object-gopn').f;
var toString = {}.toString;

var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
  ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function (it) {
  try {
    return gOPN(it);
  } catch (e) {
    return windowNames.slice();
  }
};

module.exports.f = function getOwnPropertyNames(it) {
  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
};

},{"./_to-iobject":"node_modules/core-js/library/modules/_to-iobject.js","./_object-gopn":"node_modules/core-js/library/modules/_object-gopn.js"}],"node_modules/core-js/library/modules/_object-gopd.js":[function(require,module,exports) {
var pIE = require('./_object-pie');
var createDesc = require('./_property-desc');
var toIObject = require('./_to-iobject');
var toPrimitive = require('./_to-primitive');
var has = require('./_has');
var IE8_DOM_DEFINE = require('./_ie8-dom-define');
var gOPD = Object.getOwnPropertyDescriptor;

exports.f = require('./_descriptors') ? gOPD : function getOwnPropertyDescriptor(O, P) {
  O = toIObject(O);
  P = toPrimitive(P, true);
  if (IE8_DOM_DEFINE) try {
    return gOPD(O, P);
  } catch (e) { /* empty */ }
  if (has(O, P)) return createDesc(!pIE.f.call(O, P), O[P]);
};

},{"./_object-pie":"node_modules/core-js/library/modules/_object-pie.js","./_property-desc":"node_modules/core-js/library/modules/_property-desc.js","./_to-iobject":"node_modules/core-js/library/modules/_to-iobject.js","./_to-primitive":"node_modules/core-js/library/modules/_to-primitive.js","./_has":"node_modules/core-js/library/modules/_has.js","./_ie8-dom-define":"node_modules/core-js/library/modules/_ie8-dom-define.js","./_descriptors":"node_modules/core-js/library/modules/_descriptors.js"}],"node_modules/core-js/library/modules/es6.symbol.js":[function(require,module,exports) {

'use strict';
// ECMAScript 6 symbols shim
var global = require('./_global');
var has = require('./_has');
var DESCRIPTORS = require('./_descriptors');
var $export = require('./_export');
var redefine = require('./_redefine');
var META = require('./_meta').KEY;
var $fails = require('./_fails');
var shared = require('./_shared');
var setToStringTag = require('./_set-to-string-tag');
var uid = require('./_uid');
var wks = require('./_wks');
var wksExt = require('./_wks-ext');
var wksDefine = require('./_wks-define');
var enumKeys = require('./_enum-keys');
var isArray = require('./_is-array');
var anObject = require('./_an-object');
var isObject = require('./_is-object');
var toObject = require('./_to-object');
var toIObject = require('./_to-iobject');
var toPrimitive = require('./_to-primitive');
var createDesc = require('./_property-desc');
var _create = require('./_object-create');
var gOPNExt = require('./_object-gopn-ext');
var $GOPD = require('./_object-gopd');
var $GOPS = require('./_object-gops');
var $DP = require('./_object-dp');
var $keys = require('./_object-keys');
var gOPD = $GOPD.f;
var dP = $DP.f;
var gOPN = gOPNExt.f;
var $Symbol = global.Symbol;
var $JSON = global.JSON;
var _stringify = $JSON && $JSON.stringify;
var PROTOTYPE = 'prototype';
var HIDDEN = wks('_hidden');
var TO_PRIMITIVE = wks('toPrimitive');
var isEnum = {}.propertyIsEnumerable;
var SymbolRegistry = shared('symbol-registry');
var AllSymbols = shared('symbols');
var OPSymbols = shared('op-symbols');
var ObjectProto = Object[PROTOTYPE];
var USE_NATIVE = typeof $Symbol == 'function' && !!$GOPS.f;
var QObject = global.QObject;
// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
var setSymbolDesc = DESCRIPTORS && $fails(function () {
  return _create(dP({}, 'a', {
    get: function () { return dP(this, 'a', { value: 7 }).a; }
  })).a != 7;
}) ? function (it, key, D) {
  var protoDesc = gOPD(ObjectProto, key);
  if (protoDesc) delete ObjectProto[key];
  dP(it, key, D);
  if (protoDesc && it !== ObjectProto) dP(ObjectProto, key, protoDesc);
} : dP;

var wrap = function (tag) {
  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
  sym._k = tag;
  return sym;
};

var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  return it instanceof $Symbol;
};

var $defineProperty = function defineProperty(it, key, D) {
  if (it === ObjectProto) $defineProperty(OPSymbols, key, D);
  anObject(it);
  key = toPrimitive(key, true);
  anObject(D);
  if (has(AllSymbols, key)) {
    if (!D.enumerable) {
      if (!has(it, HIDDEN)) dP(it, HIDDEN, createDesc(1, {}));
      it[HIDDEN][key] = true;
    } else {
      if (has(it, HIDDEN) && it[HIDDEN][key]) it[HIDDEN][key] = false;
      D = _create(D, { enumerable: createDesc(0, false) });
    } return setSymbolDesc(it, key, D);
  } return dP(it, key, D);
};
var $defineProperties = function defineProperties(it, P) {
  anObject(it);
  var keys = enumKeys(P = toIObject(P));
  var i = 0;
  var l = keys.length;
  var key;
  while (l > i) $defineProperty(it, key = keys[i++], P[key]);
  return it;
};
var $create = function create(it, P) {
  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
};
var $propertyIsEnumerable = function propertyIsEnumerable(key) {
  var E = isEnum.call(this, key = toPrimitive(key, true));
  if (this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return false;
  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
};
var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key) {
  it = toIObject(it);
  key = toPrimitive(key, true);
  if (it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return;
  var D = gOPD(it, key);
  if (D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key])) D.enumerable = true;
  return D;
};
var $getOwnPropertyNames = function getOwnPropertyNames(it) {
  var names = gOPN(toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META) result.push(key);
  } return result;
};
var $getOwnPropertySymbols = function getOwnPropertySymbols(it) {
  var IS_OP = it === ObjectProto;
  var names = gOPN(IS_OP ? OPSymbols : toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true)) result.push(AllSymbols[key]);
  } return result;
};

// 19.4.1.1 Symbol([description])
if (!USE_NATIVE) {
  $Symbol = function Symbol() {
    if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor!');
    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
    var $set = function (value) {
      if (this === ObjectProto) $set.call(OPSymbols, value);
      if (has(this, HIDDEN) && has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
      setSymbolDesc(this, tag, createDesc(1, value));
    };
    if (DESCRIPTORS && setter) setSymbolDesc(ObjectProto, tag, { configurable: true, set: $set });
    return wrap(tag);
  };
  redefine($Symbol[PROTOTYPE], 'toString', function toString() {
    return this._k;
  });

  $GOPD.f = $getOwnPropertyDescriptor;
  $DP.f = $defineProperty;
  require('./_object-gopn').f = gOPNExt.f = $getOwnPropertyNames;
  require('./_object-pie').f = $propertyIsEnumerable;
  $GOPS.f = $getOwnPropertySymbols;

  if (DESCRIPTORS && !require('./_library')) {
    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
  }

  wksExt.f = function (name) {
    return wrap(wks(name));
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, { Symbol: $Symbol });

for (var es6Symbols = (
  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
).split(','), j = 0; es6Symbols.length > j;)wks(es6Symbols[j++]);

for (var wellKnownSymbols = $keys(wks.store), k = 0; wellKnownSymbols.length > k;) wksDefine(wellKnownSymbols[k++]);

$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
  // 19.4.2.1 Symbol.for(key)
  'for': function (key) {
    return has(SymbolRegistry, key += '')
      ? SymbolRegistry[key]
      : SymbolRegistry[key] = $Symbol(key);
  },
  // 19.4.2.5 Symbol.keyFor(sym)
  keyFor: function keyFor(sym) {
    if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol!');
    for (var key in SymbolRegistry) if (SymbolRegistry[key] === sym) return key;
  },
  useSetter: function () { setter = true; },
  useSimple: function () { setter = false; }
});

$export($export.S + $export.F * !USE_NATIVE, 'Object', {
  // 19.1.2.2 Object.create(O [, Properties])
  create: $create,
  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
  defineProperty: $defineProperty,
  // 19.1.2.3 Object.defineProperties(O, Properties)
  defineProperties: $defineProperties,
  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
  // 19.1.2.7 Object.getOwnPropertyNames(O)
  getOwnPropertyNames: $getOwnPropertyNames,
  // 19.1.2.8 Object.getOwnPropertySymbols(O)
  getOwnPropertySymbols: $getOwnPropertySymbols
});

// Chrome 38 and 39 `Object.getOwnPropertySymbols` fails on primitives
// https://bugs.chromium.org/p/v8/issues/detail?id=3443
var FAILS_ON_PRIMITIVES = $fails(function () { $GOPS.f(1); });

$export($export.S + $export.F * FAILS_ON_PRIMITIVES, 'Object', {
  getOwnPropertySymbols: function getOwnPropertySymbols(it) {
    return $GOPS.f(toObject(it));
  }
});

// 24.3.2 JSON.stringify(value [, replacer [, space]])
$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function () {
  var S = $Symbol();
  // MS Edge converts symbol values to JSON as {}
  // WebKit converts symbol values to JSON as null
  // V8 throws on boxed symbols
  return _stringify([S]) != '[null]' || _stringify({ a: S }) != '{}' || _stringify(Object(S)) != '{}';
})), 'JSON', {
  stringify: function stringify(it) {
    var args = [it];
    var i = 1;
    var replacer, $replacer;
    while (arguments.length > i) args.push(arguments[i++]);
    $replacer = replacer = args[1];
    if (!isObject(replacer) && it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
    if (!isArray(replacer)) replacer = function (key, value) {
      if (typeof $replacer == 'function') value = $replacer.call(this, key, value);
      if (!isSymbol(value)) return value;
    };
    args[1] = replacer;
    return _stringify.apply($JSON, args);
  }
});

// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
$Symbol[PROTOTYPE][TO_PRIMITIVE] || require('./_hide')($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
// 19.4.3.5 Symbol.prototype[@@toStringTag]
setToStringTag($Symbol, 'Symbol');
// 20.2.1.9 Math[@@toStringTag]
setToStringTag(Math, 'Math', true);
// 24.3.3 JSON[@@toStringTag]
setToStringTag(global.JSON, 'JSON', true);

},{"./_global":"node_modules/core-js/library/modules/_global.js","./_has":"node_modules/core-js/library/modules/_has.js","./_descriptors":"node_modules/core-js/library/modules/_descriptors.js","./_export":"node_modules/core-js/library/modules/_export.js","./_redefine":"node_modules/core-js/library/modules/_redefine.js","./_meta":"node_modules/core-js/library/modules/_meta.js","./_fails":"node_modules/core-js/library/modules/_fails.js","./_shared":"node_modules/core-js/library/modules/_shared.js","./_set-to-string-tag":"node_modules/core-js/library/modules/_set-to-string-tag.js","./_uid":"node_modules/core-js/library/modules/_uid.js","./_wks":"node_modules/core-js/library/modules/_wks.js","./_wks-ext":"node_modules/core-js/library/modules/_wks-ext.js","./_wks-define":"node_modules/core-js/library/modules/_wks-define.js","./_enum-keys":"node_modules/core-js/library/modules/_enum-keys.js","./_is-array":"node_modules/core-js/library/modules/_is-array.js","./_an-object":"node_modules/core-js/library/modules/_an-object.js","./_is-object":"node_modules/core-js/library/modules/_is-object.js","./_to-object":"node_modules/core-js/library/modules/_to-object.js","./_to-iobject":"node_modules/core-js/library/modules/_to-iobject.js","./_to-primitive":"node_modules/core-js/library/modules/_to-primitive.js","./_property-desc":"node_modules/core-js/library/modules/_property-desc.js","./_object-create":"node_modules/core-js/library/modules/_object-create.js","./_object-gopn-ext":"node_modules/core-js/library/modules/_object-gopn-ext.js","./_object-gopd":"node_modules/core-js/library/modules/_object-gopd.js","./_object-gops":"node_modules/core-js/library/modules/_object-gops.js","./_object-dp":"node_modules/core-js/library/modules/_object-dp.js","./_object-keys":"node_modules/core-js/library/modules/_object-keys.js","./_object-gopn":"node_modules/core-js/library/modules/_object-gopn.js","./_object-pie":"node_modules/core-js/library/modules/_object-pie.js","./_library":"node_modules/core-js/library/modules/_library.js","./_hide":"node_modules/core-js/library/modules/_hide.js"}],"node_modules/core-js/library/modules/es6.object.to-string.js":[function(require,module,exports) {

},{}],"node_modules/core-js/library/modules/es7.symbol.async-iterator.js":[function(require,module,exports) {
require('./_wks-define')('asyncIterator');

},{"./_wks-define":"node_modules/core-js/library/modules/_wks-define.js"}],"node_modules/core-js/library/modules/es7.symbol.observable.js":[function(require,module,exports) {
require('./_wks-define')('observable');

},{"./_wks-define":"node_modules/core-js/library/modules/_wks-define.js"}],"node_modules/core-js/library/fn/symbol/index.js":[function(require,module,exports) {
require('../../modules/es6.symbol');
require('../../modules/es6.object.to-string');
require('../../modules/es7.symbol.async-iterator');
require('../../modules/es7.symbol.observable');
module.exports = require('../../modules/_core').Symbol;

},{"../../modules/es6.symbol":"node_modules/core-js/library/modules/es6.symbol.js","../../modules/es6.object.to-string":"node_modules/core-js/library/modules/es6.object.to-string.js","../../modules/es7.symbol.async-iterator":"node_modules/core-js/library/modules/es7.symbol.async-iterator.js","../../modules/es7.symbol.observable":"node_modules/core-js/library/modules/es7.symbol.observable.js","../../modules/_core":"node_modules/core-js/library/modules/_core.js"}],"node_modules/babel-runtime/core-js/symbol.js":[function(require,module,exports) {
module.exports = { "default": require("core-js/library/fn/symbol"), __esModule: true };
},{"core-js/library/fn/symbol":"node_modules/core-js/library/fn/symbol/index.js"}],"node_modules/babel-runtime/helpers/typeof.js":[function(require,module,exports) {
"use strict";

exports.__esModule = true;

var _iterator = require("../core-js/symbol/iterator");

var _iterator2 = _interopRequireDefault(_iterator);

var _symbol = require("../core-js/symbol");

var _symbol2 = _interopRequireDefault(_symbol);

var _typeof = typeof _symbol2.default === "function" && typeof _iterator2.default === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = typeof _symbol2.default === "function" && _typeof(_iterator2.default) === "symbol" ? function (obj) {
  return typeof obj === "undefined" ? "undefined" : _typeof(obj);
} : function (obj) {
  return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
};
},{"../core-js/symbol/iterator":"node_modules/babel-runtime/core-js/symbol/iterator.js","../core-js/symbol":"node_modules/babel-runtime/core-js/symbol.js"}],"node_modules/semantic-ui-vue/dist/commonjs/lib/isBrowser.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

var hasDocument = (typeof document === 'undefined' ? 'undefined' : (0, _typeof3.default)(document)) === 'object' && document !== null;
var hasWindow = (typeof window === 'undefined' ? 'undefined' : (0, _typeof3.default)(window)) === 'object' && window !== null && window.self === window;
exports.default = hasDocument && hasWindow;
},{"babel-runtime/helpers/typeof":"node_modules/babel-runtime/helpers/typeof.js"}],"node_modules/core-js/library/modules/es6.object.define-property.js":[function(require,module,exports) {
var $export = require('./_export');
// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
$export($export.S + $export.F * !require('./_descriptors'), 'Object', { defineProperty: require('./_object-dp').f });

},{"./_export":"node_modules/core-js/library/modules/_export.js","./_descriptors":"node_modules/core-js/library/modules/_descriptors.js","./_object-dp":"node_modules/core-js/library/modules/_object-dp.js"}],"node_modules/core-js/library/fn/object/define-property.js":[function(require,module,exports) {
require('../../modules/es6.object.define-property');
var $Object = require('../../modules/_core').Object;
module.exports = function defineProperty(it, key, desc) {
  return $Object.defineProperty(it, key, desc);
};

},{"../../modules/es6.object.define-property":"node_modules/core-js/library/modules/es6.object.define-property.js","../../modules/_core":"node_modules/core-js/library/modules/_core.js"}],"node_modules/babel-runtime/core-js/object/define-property.js":[function(require,module,exports) {
module.exports = { "default": require("core-js/library/fn/object/define-property"), __esModule: true };
},{"core-js/library/fn/object/define-property":"node_modules/core-js/library/fn/object/define-property.js"}],"node_modules/babel-runtime/helpers/defineProperty.js":[function(require,module,exports) {
"use strict";

exports.__esModule = true;

var _defineProperty = require("../core-js/object/define-property");

var _defineProperty2 = _interopRequireDefault(_defineProperty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (obj, key, value) {
  if (key in obj) {
    (0, _defineProperty2.default)(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
};
},{"../core-js/object/define-property":"node_modules/babel-runtime/core-js/object/define-property.js"}],"node_modules/core-js/library/modules/_classof.js":[function(require,module,exports) {
// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = require('./_cof');
var TAG = require('./_wks')('toStringTag');
// ES3 wrong here
var ARG = cof(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (e) { /* empty */ }
};

module.exports = function (it) {
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
    // builtinTag case
    : ARG ? cof(O)
    // ES3 arguments fallback
    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};

},{"./_cof":"node_modules/core-js/library/modules/_cof.js","./_wks":"node_modules/core-js/library/modules/_wks.js"}],"node_modules/core-js/library/modules/core.is-iterable.js":[function(require,module,exports) {
var classof = require('./_classof');
var ITERATOR = require('./_wks')('iterator');
var Iterators = require('./_iterators');
module.exports = require('./_core').isIterable = function (it) {
  var O = Object(it);
  return O[ITERATOR] !== undefined
    || '@@iterator' in O
    // eslint-disable-next-line no-prototype-builtins
    || Iterators.hasOwnProperty(classof(O));
};

},{"./_classof":"node_modules/core-js/library/modules/_classof.js","./_wks":"node_modules/core-js/library/modules/_wks.js","./_iterators":"node_modules/core-js/library/modules/_iterators.js","./_core":"node_modules/core-js/library/modules/_core.js"}],"node_modules/core-js/library/fn/is-iterable.js":[function(require,module,exports) {
require('../modules/web.dom.iterable');
require('../modules/es6.string.iterator');
module.exports = require('../modules/core.is-iterable');

},{"../modules/web.dom.iterable":"node_modules/core-js/library/modules/web.dom.iterable.js","../modules/es6.string.iterator":"node_modules/core-js/library/modules/es6.string.iterator.js","../modules/core.is-iterable":"node_modules/core-js/library/modules/core.is-iterable.js"}],"node_modules/babel-runtime/core-js/is-iterable.js":[function(require,module,exports) {
module.exports = { "default": require("core-js/library/fn/is-iterable"), __esModule: true };
},{"core-js/library/fn/is-iterable":"node_modules/core-js/library/fn/is-iterable.js"}],"node_modules/core-js/library/modules/core.get-iterator-method.js":[function(require,module,exports) {
var classof = require('./_classof');
var ITERATOR = require('./_wks')('iterator');
var Iterators = require('./_iterators');
module.exports = require('./_core').getIteratorMethod = function (it) {
  if (it != undefined) return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};

},{"./_classof":"node_modules/core-js/library/modules/_classof.js","./_wks":"node_modules/core-js/library/modules/_wks.js","./_iterators":"node_modules/core-js/library/modules/_iterators.js","./_core":"node_modules/core-js/library/modules/_core.js"}],"node_modules/core-js/library/modules/core.get-iterator.js":[function(require,module,exports) {
var anObject = require('./_an-object');
var get = require('./core.get-iterator-method');
module.exports = require('./_core').getIterator = function (it) {
  var iterFn = get(it);
  if (typeof iterFn != 'function') throw TypeError(it + ' is not iterable!');
  return anObject(iterFn.call(it));
};

},{"./_an-object":"node_modules/core-js/library/modules/_an-object.js","./core.get-iterator-method":"node_modules/core-js/library/modules/core.get-iterator-method.js","./_core":"node_modules/core-js/library/modules/_core.js"}],"node_modules/core-js/library/fn/get-iterator.js":[function(require,module,exports) {
require('../modules/web.dom.iterable');
require('../modules/es6.string.iterator');
module.exports = require('../modules/core.get-iterator');

},{"../modules/web.dom.iterable":"node_modules/core-js/library/modules/web.dom.iterable.js","../modules/es6.string.iterator":"node_modules/core-js/library/modules/es6.string.iterator.js","../modules/core.get-iterator":"node_modules/core-js/library/modules/core.get-iterator.js"}],"node_modules/babel-runtime/core-js/get-iterator.js":[function(require,module,exports) {
module.exports = { "default": require("core-js/library/fn/get-iterator"), __esModule: true };
},{"core-js/library/fn/get-iterator":"node_modules/core-js/library/fn/get-iterator.js"}],"node_modules/babel-runtime/helpers/slicedToArray.js":[function(require,module,exports) {
"use strict";

exports.__esModule = true;

var _isIterable2 = require("../core-js/is-iterable");

var _isIterable3 = _interopRequireDefault(_isIterable2);

var _getIterator2 = require("../core-js/get-iterator");

var _getIterator3 = _interopRequireDefault(_getIterator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  function sliceIterator(arr, i) {
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = (0, _getIterator3.default)(arr), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"]) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  return function (arr, i) {
    if (Array.isArray(arr)) {
      return arr;
    } else if ((0, _isIterable3.default)(Object(arr))) {
      return sliceIterator(arr, i);
    } else {
      throw new TypeError("Invalid attempt to destructure non-iterable instance");
    }
  };
}();
},{"../core-js/is-iterable":"node_modules/babel-runtime/core-js/is-iterable.js","../core-js/get-iterator":"node_modules/babel-runtime/core-js/get-iterator.js"}],"node_modules/lodash/_freeGlobal.js":[function(require,module,exports) {
var global = arguments[3];
/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

module.exports = freeGlobal;

},{}],"node_modules/lodash/_root.js":[function(require,module,exports) {
var freeGlobal = require('./_freeGlobal');

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

module.exports = root;

},{"./_freeGlobal":"node_modules/lodash/_freeGlobal.js"}],"node_modules/lodash/_Symbol.js":[function(require,module,exports) {
var root = require('./_root');

/** Built-in value references. */
var Symbol = root.Symbol;

module.exports = Symbol;

},{"./_root":"node_modules/lodash/_root.js"}],"node_modules/lodash/_arrayMap.js":[function(require,module,exports) {
/**
 * A specialized version of `_.map` for arrays without support for iteratee
 * shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the new mapped array.
 */
function arrayMap(array, iteratee) {
  var index = -1,
      length = array == null ? 0 : array.length,
      result = Array(length);

  while (++index < length) {
    result[index] = iteratee(array[index], index, array);
  }
  return result;
}

module.exports = arrayMap;

},{}],"node_modules/lodash/isArray.js":[function(require,module,exports) {
/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(document.body.children);
 * // => false
 *
 * _.isArray('abc');
 * // => false
 *
 * _.isArray(_.noop);
 * // => false
 */
var isArray = Array.isArray;

module.exports = isArray;

},{}],"node_modules/lodash/_getRawTag.js":[function(require,module,exports) {
var Symbol = require('./_Symbol');

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/** Built-in value references. */
var symToStringTag = Symbol ? Symbol.toStringTag : undefined;

/**
 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the raw `toStringTag`.
 */
function getRawTag(value) {
  var isOwn = hasOwnProperty.call(value, symToStringTag),
      tag = value[symToStringTag];

  try {
    value[symToStringTag] = undefined;
    var unmasked = true;
  } catch (e) {}

  var result = nativeObjectToString.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag] = tag;
    } else {
      delete value[symToStringTag];
    }
  }
  return result;
}

module.exports = getRawTag;

},{"./_Symbol":"node_modules/lodash/_Symbol.js"}],"node_modules/lodash/_objectToString.js":[function(require,module,exports) {
/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/**
 * Converts `value` to a string using `Object.prototype.toString`.
 *
 * @private
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 */
function objectToString(value) {
  return nativeObjectToString.call(value);
}

module.exports = objectToString;

},{}],"node_modules/lodash/_baseGetTag.js":[function(require,module,exports) {
var Symbol = require('./_Symbol'),
    getRawTag = require('./_getRawTag'),
    objectToString = require('./_objectToString');

/** `Object#toString` result references. */
var nullTag = '[object Null]',
    undefinedTag = '[object Undefined]';

/** Built-in value references. */
var symToStringTag = Symbol ? Symbol.toStringTag : undefined;

/**
 * The base implementation of `getTag` without fallbacks for buggy environments.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function baseGetTag(value) {
  if (value == null) {
    return value === undefined ? undefinedTag : nullTag;
  }
  return (symToStringTag && symToStringTag in Object(value))
    ? getRawTag(value)
    : objectToString(value);
}

module.exports = baseGetTag;

},{"./_Symbol":"node_modules/lodash/_Symbol.js","./_getRawTag":"node_modules/lodash/_getRawTag.js","./_objectToString":"node_modules/lodash/_objectToString.js"}],"node_modules/lodash/isObjectLike.js":[function(require,module,exports) {
/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return value != null && typeof value == 'object';
}

module.exports = isObjectLike;

},{}],"node_modules/lodash/isSymbol.js":[function(require,module,exports) {
var baseGetTag = require('./_baseGetTag'),
    isObjectLike = require('./isObjectLike');

/** `Object#toString` result references. */
var symbolTag = '[object Symbol]';

/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */
function isSymbol(value) {
  return typeof value == 'symbol' ||
    (isObjectLike(value) && baseGetTag(value) == symbolTag);
}

module.exports = isSymbol;

},{"./_baseGetTag":"node_modules/lodash/_baseGetTag.js","./isObjectLike":"node_modules/lodash/isObjectLike.js"}],"node_modules/lodash/_baseToString.js":[function(require,module,exports) {
var Symbol = require('./_Symbol'),
    arrayMap = require('./_arrayMap'),
    isArray = require('./isArray'),
    isSymbol = require('./isSymbol');

/** Used as references for various `Number` constants. */
var INFINITY = 1 / 0;

/** Used to convert symbols to primitives and strings. */
var symbolProto = Symbol ? Symbol.prototype : undefined,
    symbolToString = symbolProto ? symbolProto.toString : undefined;

/**
 * The base implementation of `_.toString` which doesn't convert nullish
 * values to empty strings.
 *
 * @private
 * @param {*} value The value to process.
 * @returns {string} Returns the string.
 */
function baseToString(value) {
  // Exit early for strings to avoid a performance hit in some environments.
  if (typeof value == 'string') {
    return value;
  }
  if (isArray(value)) {
    // Recursively convert values (susceptible to call stack limits).
    return arrayMap(value, baseToString) + '';
  }
  if (isSymbol(value)) {
    return symbolToString ? symbolToString.call(value) : '';
  }
  var result = (value + '');
  return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
}

module.exports = baseToString;

},{"./_Symbol":"node_modules/lodash/_Symbol.js","./_arrayMap":"node_modules/lodash/_arrayMap.js","./isArray":"node_modules/lodash/isArray.js","./isSymbol":"node_modules/lodash/isSymbol.js"}],"node_modules/lodash/toString.js":[function(require,module,exports) {
var baseToString = require('./_baseToString');

/**
 * Converts `value` to a string. An empty string is returned for `null`
 * and `undefined` values. The sign of `-0` is preserved.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 * @example
 *
 * _.toString(null);
 * // => ''
 *
 * _.toString(-0);
 * // => '-0'
 *
 * _.toString([1, 2, 3]);
 * // => '1,2,3'
 */
function toString(value) {
  return value == null ? '' : baseToString(value);
}

module.exports = toString;

},{"./_baseToString":"node_modules/lodash/_baseToString.js"}],"node_modules/lodash/_baseSlice.js":[function(require,module,exports) {
/**
 * The base implementation of `_.slice` without an iteratee call guard.
 *
 * @private
 * @param {Array} array The array to slice.
 * @param {number} [start=0] The start position.
 * @param {number} [end=array.length] The end position.
 * @returns {Array} Returns the slice of `array`.
 */
function baseSlice(array, start, end) {
  var index = -1,
      length = array.length;

  if (start < 0) {
    start = -start > length ? 0 : (length + start);
  }
  end = end > length ? length : end;
  if (end < 0) {
    end += length;
  }
  length = start > end ? 0 : ((end - start) >>> 0);
  start >>>= 0;

  var result = Array(length);
  while (++index < length) {
    result[index] = array[index + start];
  }
  return result;
}

module.exports = baseSlice;

},{}],"node_modules/lodash/_castSlice.js":[function(require,module,exports) {
var baseSlice = require('./_baseSlice');

/**
 * Casts `array` to a slice if it's needed.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {number} start The start position.
 * @param {number} [end=array.length] The end position.
 * @returns {Array} Returns the cast slice.
 */
function castSlice(array, start, end) {
  var length = array.length;
  end = end === undefined ? length : end;
  return (!start && end >= length) ? array : baseSlice(array, start, end);
}

module.exports = castSlice;

},{"./_baseSlice":"node_modules/lodash/_baseSlice.js"}],"node_modules/lodash/_hasUnicode.js":[function(require,module,exports) {
/** Used to compose unicode character classes. */
var rsAstralRange = '\\ud800-\\udfff',
    rsComboMarksRange = '\\u0300-\\u036f',
    reComboHalfMarksRange = '\\ufe20-\\ufe2f',
    rsComboSymbolsRange = '\\u20d0-\\u20ff',
    rsComboRange = rsComboMarksRange + reComboHalfMarksRange + rsComboSymbolsRange,
    rsVarRange = '\\ufe0e\\ufe0f';

/** Used to compose unicode capture groups. */
var rsZWJ = '\\u200d';

/** Used to detect strings with [zero-width joiners or code points from the astral planes](http://eev.ee/blog/2015/09/12/dark-corners-of-unicode/). */
var reHasUnicode = RegExp('[' + rsZWJ + rsAstralRange  + rsComboRange + rsVarRange + ']');

/**
 * Checks if `string` contains Unicode symbols.
 *
 * @private
 * @param {string} string The string to inspect.
 * @returns {boolean} Returns `true` if a symbol is found, else `false`.
 */
function hasUnicode(string) {
  return reHasUnicode.test(string);
}

module.exports = hasUnicode;

},{}],"node_modules/lodash/_asciiToArray.js":[function(require,module,exports) {
/**
 * Converts an ASCII `string` to an array.
 *
 * @private
 * @param {string} string The string to convert.
 * @returns {Array} Returns the converted array.
 */
function asciiToArray(string) {
  return string.split('');
}

module.exports = asciiToArray;

},{}],"node_modules/lodash/_unicodeToArray.js":[function(require,module,exports) {
/** Used to compose unicode character classes. */
var rsAstralRange = '\\ud800-\\udfff',
    rsComboMarksRange = '\\u0300-\\u036f',
    reComboHalfMarksRange = '\\ufe20-\\ufe2f',
    rsComboSymbolsRange = '\\u20d0-\\u20ff',
    rsComboRange = rsComboMarksRange + reComboHalfMarksRange + rsComboSymbolsRange,
    rsVarRange = '\\ufe0e\\ufe0f';

/** Used to compose unicode capture groups. */
var rsAstral = '[' + rsAstralRange + ']',
    rsCombo = '[' + rsComboRange + ']',
    rsFitz = '\\ud83c[\\udffb-\\udfff]',
    rsModifier = '(?:' + rsCombo + '|' + rsFitz + ')',
    rsNonAstral = '[^' + rsAstralRange + ']',
    rsRegional = '(?:\\ud83c[\\udde6-\\uddff]){2}',
    rsSurrPair = '[\\ud800-\\udbff][\\udc00-\\udfff]',
    rsZWJ = '\\u200d';

/** Used to compose unicode regexes. */
var reOptMod = rsModifier + '?',
    rsOptVar = '[' + rsVarRange + ']?',
    rsOptJoin = '(?:' + rsZWJ + '(?:' + [rsNonAstral, rsRegional, rsSurrPair].join('|') + ')' + rsOptVar + reOptMod + ')*',
    rsSeq = rsOptVar + reOptMod + rsOptJoin,
    rsSymbol = '(?:' + [rsNonAstral + rsCombo + '?', rsCombo, rsRegional, rsSurrPair, rsAstral].join('|') + ')';

/** Used to match [string symbols](https://mathiasbynens.be/notes/javascript-unicode). */
var reUnicode = RegExp(rsFitz + '(?=' + rsFitz + ')|' + rsSymbol + rsSeq, 'g');

/**
 * Converts a Unicode `string` to an array.
 *
 * @private
 * @param {string} string The string to convert.
 * @returns {Array} Returns the converted array.
 */
function unicodeToArray(string) {
  return string.match(reUnicode) || [];
}

module.exports = unicodeToArray;

},{}],"node_modules/lodash/_stringToArray.js":[function(require,module,exports) {
var asciiToArray = require('./_asciiToArray'),
    hasUnicode = require('./_hasUnicode'),
    unicodeToArray = require('./_unicodeToArray');

/**
 * Converts `string` to an array.
 *
 * @private
 * @param {string} string The string to convert.
 * @returns {Array} Returns the converted array.
 */
function stringToArray(string) {
  return hasUnicode(string)
    ? unicodeToArray(string)
    : asciiToArray(string);
}

module.exports = stringToArray;

},{"./_asciiToArray":"node_modules/lodash/_asciiToArray.js","./_hasUnicode":"node_modules/lodash/_hasUnicode.js","./_unicodeToArray":"node_modules/lodash/_unicodeToArray.js"}],"node_modules/lodash/_createCaseFirst.js":[function(require,module,exports) {
var castSlice = require('./_castSlice'),
    hasUnicode = require('./_hasUnicode'),
    stringToArray = require('./_stringToArray'),
    toString = require('./toString');

/**
 * Creates a function like `_.lowerFirst`.
 *
 * @private
 * @param {string} methodName The name of the `String` case method to use.
 * @returns {Function} Returns the new case function.
 */
function createCaseFirst(methodName) {
  return function(string) {
    string = toString(string);

    var strSymbols = hasUnicode(string)
      ? stringToArray(string)
      : undefined;

    var chr = strSymbols
      ? strSymbols[0]
      : string.charAt(0);

    var trailing = strSymbols
      ? castSlice(strSymbols, 1).join('')
      : string.slice(1);

    return chr[methodName]() + trailing;
  };
}

module.exports = createCaseFirst;

},{"./_castSlice":"node_modules/lodash/_castSlice.js","./_hasUnicode":"node_modules/lodash/_hasUnicode.js","./_stringToArray":"node_modules/lodash/_stringToArray.js","./toString":"node_modules/lodash/toString.js"}],"node_modules/lodash/upperFirst.js":[function(require,module,exports) {
var createCaseFirst = require('./_createCaseFirst');

/**
 * Converts the first character of `string` to upper case.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category String
 * @param {string} [string=''] The string to convert.
 * @returns {string} Returns the converted string.
 * @example
 *
 * _.upperFirst('fred');
 * // => 'Fred'
 *
 * _.upperFirst('FRED');
 * // => 'FRED'
 */
var upperFirst = createCaseFirst('toUpperCase');

module.exports = upperFirst;

},{"./_createCaseFirst":"node_modules/lodash/_createCaseFirst.js"}],"node_modules/lodash/capitalize.js":[function(require,module,exports) {
var toString = require('./toString'),
    upperFirst = require('./upperFirst');

/**
 * Converts the first character of `string` to upper case and the remaining
 * to lower case.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category String
 * @param {string} [string=''] The string to capitalize.
 * @returns {string} Returns the capitalized string.
 * @example
 *
 * _.capitalize('FRED');
 * // => 'Fred'
 */
function capitalize(string) {
  return upperFirst(toString(string).toLowerCase());
}

module.exports = capitalize;

},{"./toString":"node_modules/lodash/toString.js","./upperFirst":"node_modules/lodash/upperFirst.js"}],"node_modules/lodash/_arrayReduce.js":[function(require,module,exports) {
/**
 * A specialized version of `_.reduce` for arrays without support for
 * iteratee shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @param {*} [accumulator] The initial value.
 * @param {boolean} [initAccum] Specify using the first element of `array` as
 *  the initial value.
 * @returns {*} Returns the accumulated value.
 */
function arrayReduce(array, iteratee, accumulator, initAccum) {
  var index = -1,
      length = array == null ? 0 : array.length;

  if (initAccum && length) {
    accumulator = array[++index];
  }
  while (++index < length) {
    accumulator = iteratee(accumulator, array[index], index, array);
  }
  return accumulator;
}

module.exports = arrayReduce;

},{}],"node_modules/lodash/_basePropertyOf.js":[function(require,module,exports) {
/**
 * The base implementation of `_.propertyOf` without support for deep paths.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Function} Returns the new accessor function.
 */
function basePropertyOf(object) {
  return function(key) {
    return object == null ? undefined : object[key];
  };
}

module.exports = basePropertyOf;

},{}],"node_modules/lodash/_deburrLetter.js":[function(require,module,exports) {
var basePropertyOf = require('./_basePropertyOf');

/** Used to map Latin Unicode letters to basic Latin letters. */
var deburredLetters = {
  // Latin-1 Supplement block.
  '\xc0': 'A',  '\xc1': 'A', '\xc2': 'A', '\xc3': 'A', '\xc4': 'A', '\xc5': 'A',
  '\xe0': 'a',  '\xe1': 'a', '\xe2': 'a', '\xe3': 'a', '\xe4': 'a', '\xe5': 'a',
  '\xc7': 'C',  '\xe7': 'c',
  '\xd0': 'D',  '\xf0': 'd',
  '\xc8': 'E',  '\xc9': 'E', '\xca': 'E', '\xcb': 'E',
  '\xe8': 'e',  '\xe9': 'e', '\xea': 'e', '\xeb': 'e',
  '\xcc': 'I',  '\xcd': 'I', '\xce': 'I', '\xcf': 'I',
  '\xec': 'i',  '\xed': 'i', '\xee': 'i', '\xef': 'i',
  '\xd1': 'N',  '\xf1': 'n',
  '\xd2': 'O',  '\xd3': 'O', '\xd4': 'O', '\xd5': 'O', '\xd6': 'O', '\xd8': 'O',
  '\xf2': 'o',  '\xf3': 'o', '\xf4': 'o', '\xf5': 'o', '\xf6': 'o', '\xf8': 'o',
  '\xd9': 'U',  '\xda': 'U', '\xdb': 'U', '\xdc': 'U',
  '\xf9': 'u',  '\xfa': 'u', '\xfb': 'u', '\xfc': 'u',
  '\xdd': 'Y',  '\xfd': 'y', '\xff': 'y',
  '\xc6': 'Ae', '\xe6': 'ae',
  '\xde': 'Th', '\xfe': 'th',
  '\xdf': 'ss',
  // Latin Extended-A block.
  '\u0100': 'A',  '\u0102': 'A', '\u0104': 'A',
  '\u0101': 'a',  '\u0103': 'a', '\u0105': 'a',
  '\u0106': 'C',  '\u0108': 'C', '\u010a': 'C', '\u010c': 'C',
  '\u0107': 'c',  '\u0109': 'c', '\u010b': 'c', '\u010d': 'c',
  '\u010e': 'D',  '\u0110': 'D', '\u010f': 'd', '\u0111': 'd',
  '\u0112': 'E',  '\u0114': 'E', '\u0116': 'E', '\u0118': 'E', '\u011a': 'E',
  '\u0113': 'e',  '\u0115': 'e', '\u0117': 'e', '\u0119': 'e', '\u011b': 'e',
  '\u011c': 'G',  '\u011e': 'G', '\u0120': 'G', '\u0122': 'G',
  '\u011d': 'g',  '\u011f': 'g', '\u0121': 'g', '\u0123': 'g',
  '\u0124': 'H',  '\u0126': 'H', '\u0125': 'h', '\u0127': 'h',
  '\u0128': 'I',  '\u012a': 'I', '\u012c': 'I', '\u012e': 'I', '\u0130': 'I',
  '\u0129': 'i',  '\u012b': 'i', '\u012d': 'i', '\u012f': 'i', '\u0131': 'i',
  '\u0134': 'J',  '\u0135': 'j',
  '\u0136': 'K',  '\u0137': 'k', '\u0138': 'k',
  '\u0139': 'L',  '\u013b': 'L', '\u013d': 'L', '\u013f': 'L', '\u0141': 'L',
  '\u013a': 'l',  '\u013c': 'l', '\u013e': 'l', '\u0140': 'l', '\u0142': 'l',
  '\u0143': 'N',  '\u0145': 'N', '\u0147': 'N', '\u014a': 'N',
  '\u0144': 'n',  '\u0146': 'n', '\u0148': 'n', '\u014b': 'n',
  '\u014c': 'O',  '\u014e': 'O', '\u0150': 'O',
  '\u014d': 'o',  '\u014f': 'o', '\u0151': 'o',
  '\u0154': 'R',  '\u0156': 'R', '\u0158': 'R',
  '\u0155': 'r',  '\u0157': 'r', '\u0159': 'r',
  '\u015a': 'S',  '\u015c': 'S', '\u015e': 'S', '\u0160': 'S',
  '\u015b': 's',  '\u015d': 's', '\u015f': 's', '\u0161': 's',
  '\u0162': 'T',  '\u0164': 'T', '\u0166': 'T',
  '\u0163': 't',  '\u0165': 't', '\u0167': 't',
  '\u0168': 'U',  '\u016a': 'U', '\u016c': 'U', '\u016e': 'U', '\u0170': 'U', '\u0172': 'U',
  '\u0169': 'u',  '\u016b': 'u', '\u016d': 'u', '\u016f': 'u', '\u0171': 'u', '\u0173': 'u',
  '\u0174': 'W',  '\u0175': 'w',
  '\u0176': 'Y',  '\u0177': 'y', '\u0178': 'Y',
  '\u0179': 'Z',  '\u017b': 'Z', '\u017d': 'Z',
  '\u017a': 'z',  '\u017c': 'z', '\u017e': 'z',
  '\u0132': 'IJ', '\u0133': 'ij',
  '\u0152': 'Oe', '\u0153': 'oe',
  '\u0149': "'n", '\u017f': 's'
};

/**
 * Used by `_.deburr` to convert Latin-1 Supplement and Latin Extended-A
 * letters to basic Latin letters.
 *
 * @private
 * @param {string} letter The matched letter to deburr.
 * @returns {string} Returns the deburred letter.
 */
var deburrLetter = basePropertyOf(deburredLetters);

module.exports = deburrLetter;

},{"./_basePropertyOf":"node_modules/lodash/_basePropertyOf.js"}],"node_modules/lodash/deburr.js":[function(require,module,exports) {
var deburrLetter = require('./_deburrLetter'),
    toString = require('./toString');

/** Used to match Latin Unicode letters (excluding mathematical operators). */
var reLatin = /[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g;

/** Used to compose unicode character classes. */
var rsComboMarksRange = '\\u0300-\\u036f',
    reComboHalfMarksRange = '\\ufe20-\\ufe2f',
    rsComboSymbolsRange = '\\u20d0-\\u20ff',
    rsComboRange = rsComboMarksRange + reComboHalfMarksRange + rsComboSymbolsRange;

/** Used to compose unicode capture groups. */
var rsCombo = '[' + rsComboRange + ']';

/**
 * Used to match [combining diacritical marks](https://en.wikipedia.org/wiki/Combining_Diacritical_Marks) and
 * [combining diacritical marks for symbols](https://en.wikipedia.org/wiki/Combining_Diacritical_Marks_for_Symbols).
 */
var reComboMark = RegExp(rsCombo, 'g');

/**
 * Deburrs `string` by converting
 * [Latin-1 Supplement](https://en.wikipedia.org/wiki/Latin-1_Supplement_(Unicode_block)#Character_table)
 * and [Latin Extended-A](https://en.wikipedia.org/wiki/Latin_Extended-A)
 * letters to basic Latin letters and removing
 * [combining diacritical marks](https://en.wikipedia.org/wiki/Combining_Diacritical_Marks).
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category String
 * @param {string} [string=''] The string to deburr.
 * @returns {string} Returns the deburred string.
 * @example
 *
 * _.deburr('déjà vu');
 * // => 'deja vu'
 */
function deburr(string) {
  string = toString(string);
  return string && string.replace(reLatin, deburrLetter).replace(reComboMark, '');
}

module.exports = deburr;

},{"./_deburrLetter":"node_modules/lodash/_deburrLetter.js","./toString":"node_modules/lodash/toString.js"}],"node_modules/lodash/_asciiWords.js":[function(require,module,exports) {
/** Used to match words composed of alphanumeric characters. */
var reAsciiWord = /[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g;

/**
 * Splits an ASCII `string` into an array of its words.
 *
 * @private
 * @param {string} The string to inspect.
 * @returns {Array} Returns the words of `string`.
 */
function asciiWords(string) {
  return string.match(reAsciiWord) || [];
}

module.exports = asciiWords;

},{}],"node_modules/lodash/_hasUnicodeWord.js":[function(require,module,exports) {
/** Used to detect strings that need a more robust regexp to match words. */
var reHasUnicodeWord = /[a-z][A-Z]|[A-Z]{2}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/;

/**
 * Checks if `string` contains a word composed of Unicode symbols.
 *
 * @private
 * @param {string} string The string to inspect.
 * @returns {boolean} Returns `true` if a word is found, else `false`.
 */
function hasUnicodeWord(string) {
  return reHasUnicodeWord.test(string);
}

module.exports = hasUnicodeWord;

},{}],"node_modules/lodash/_unicodeWords.js":[function(require,module,exports) {
/** Used to compose unicode character classes. */
var rsAstralRange = '\\ud800-\\udfff',
    rsComboMarksRange = '\\u0300-\\u036f',
    reComboHalfMarksRange = '\\ufe20-\\ufe2f',
    rsComboSymbolsRange = '\\u20d0-\\u20ff',
    rsComboRange = rsComboMarksRange + reComboHalfMarksRange + rsComboSymbolsRange,
    rsDingbatRange = '\\u2700-\\u27bf',
    rsLowerRange = 'a-z\\xdf-\\xf6\\xf8-\\xff',
    rsMathOpRange = '\\xac\\xb1\\xd7\\xf7',
    rsNonCharRange = '\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf',
    rsPunctuationRange = '\\u2000-\\u206f',
    rsSpaceRange = ' \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000',
    rsUpperRange = 'A-Z\\xc0-\\xd6\\xd8-\\xde',
    rsVarRange = '\\ufe0e\\ufe0f',
    rsBreakRange = rsMathOpRange + rsNonCharRange + rsPunctuationRange + rsSpaceRange;

/** Used to compose unicode capture groups. */
var rsApos = "['\u2019]",
    rsBreak = '[' + rsBreakRange + ']',
    rsCombo = '[' + rsComboRange + ']',
    rsDigits = '\\d+',
    rsDingbat = '[' + rsDingbatRange + ']',
    rsLower = '[' + rsLowerRange + ']',
    rsMisc = '[^' + rsAstralRange + rsBreakRange + rsDigits + rsDingbatRange + rsLowerRange + rsUpperRange + ']',
    rsFitz = '\\ud83c[\\udffb-\\udfff]',
    rsModifier = '(?:' + rsCombo + '|' + rsFitz + ')',
    rsNonAstral = '[^' + rsAstralRange + ']',
    rsRegional = '(?:\\ud83c[\\udde6-\\uddff]){2}',
    rsSurrPair = '[\\ud800-\\udbff][\\udc00-\\udfff]',
    rsUpper = '[' + rsUpperRange + ']',
    rsZWJ = '\\u200d';

/** Used to compose unicode regexes. */
var rsMiscLower = '(?:' + rsLower + '|' + rsMisc + ')',
    rsMiscUpper = '(?:' + rsUpper + '|' + rsMisc + ')',
    rsOptContrLower = '(?:' + rsApos + '(?:d|ll|m|re|s|t|ve))?',
    rsOptContrUpper = '(?:' + rsApos + '(?:D|LL|M|RE|S|T|VE))?',
    reOptMod = rsModifier + '?',
    rsOptVar = '[' + rsVarRange + ']?',
    rsOptJoin = '(?:' + rsZWJ + '(?:' + [rsNonAstral, rsRegional, rsSurrPair].join('|') + ')' + rsOptVar + reOptMod + ')*',
    rsOrdLower = '\\d*(?:1st|2nd|3rd|(?![123])\\dth)(?=\\b|[A-Z_])',
    rsOrdUpper = '\\d*(?:1ST|2ND|3RD|(?![123])\\dTH)(?=\\b|[a-z_])',
    rsSeq = rsOptVar + reOptMod + rsOptJoin,
    rsEmoji = '(?:' + [rsDingbat, rsRegional, rsSurrPair].join('|') + ')' + rsSeq;

/** Used to match complex or compound words. */
var reUnicodeWord = RegExp([
  rsUpper + '?' + rsLower + '+' + rsOptContrLower + '(?=' + [rsBreak, rsUpper, '$'].join('|') + ')',
  rsMiscUpper + '+' + rsOptContrUpper + '(?=' + [rsBreak, rsUpper + rsMiscLower, '$'].join('|') + ')',
  rsUpper + '?' + rsMiscLower + '+' + rsOptContrLower,
  rsUpper + '+' + rsOptContrUpper,
  rsOrdUpper,
  rsOrdLower,
  rsDigits,
  rsEmoji
].join('|'), 'g');

/**
 * Splits a Unicode `string` into an array of its words.
 *
 * @private
 * @param {string} The string to inspect.
 * @returns {Array} Returns the words of `string`.
 */
function unicodeWords(string) {
  return string.match(reUnicodeWord) || [];
}

module.exports = unicodeWords;

},{}],"node_modules/lodash/words.js":[function(require,module,exports) {
var asciiWords = require('./_asciiWords'),
    hasUnicodeWord = require('./_hasUnicodeWord'),
    toString = require('./toString'),
    unicodeWords = require('./_unicodeWords');

/**
 * Splits `string` into an array of its words.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category String
 * @param {string} [string=''] The string to inspect.
 * @param {RegExp|string} [pattern] The pattern to match words.
 * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
 * @returns {Array} Returns the words of `string`.
 * @example
 *
 * _.words('fred, barney, & pebbles');
 * // => ['fred', 'barney', 'pebbles']
 *
 * _.words('fred, barney, & pebbles', /[^, ]+/g);
 * // => ['fred', 'barney', '&', 'pebbles']
 */
function words(string, pattern, guard) {
  string = toString(string);
  pattern = guard ? undefined : pattern;

  if (pattern === undefined) {
    return hasUnicodeWord(string) ? unicodeWords(string) : asciiWords(string);
  }
  return string.match(pattern) || [];
}

module.exports = words;

},{"./_asciiWords":"node_modules/lodash/_asciiWords.js","./_hasUnicodeWord":"node_modules/lodash/_hasUnicodeWord.js","./toString":"node_modules/lodash/toString.js","./_unicodeWords":"node_modules/lodash/_unicodeWords.js"}],"node_modules/lodash/_createCompounder.js":[function(require,module,exports) {
var arrayReduce = require('./_arrayReduce'),
    deburr = require('./deburr'),
    words = require('./words');

/** Used to compose unicode capture groups. */
var rsApos = "['\u2019]";

/** Used to match apostrophes. */
var reApos = RegExp(rsApos, 'g');

/**
 * Creates a function like `_.camelCase`.
 *
 * @private
 * @param {Function} callback The function to combine each word.
 * @returns {Function} Returns the new compounder function.
 */
function createCompounder(callback) {
  return function(string) {
    return arrayReduce(words(deburr(string).replace(reApos, '')), callback, '');
  };
}

module.exports = createCompounder;

},{"./_arrayReduce":"node_modules/lodash/_arrayReduce.js","./deburr":"node_modules/lodash/deburr.js","./words":"node_modules/lodash/words.js"}],"node_modules/lodash/camelCase.js":[function(require,module,exports) {
var capitalize = require('./capitalize'),
    createCompounder = require('./_createCompounder');

/**
 * Converts `string` to [camel case](https://en.wikipedia.org/wiki/CamelCase).
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category String
 * @param {string} [string=''] The string to convert.
 * @returns {string} Returns the camel cased string.
 * @example
 *
 * _.camelCase('Foo Bar');
 * // => 'fooBar'
 *
 * _.camelCase('--foo-bar--');
 * // => 'fooBar'
 *
 * _.camelCase('__FOO_BAR__');
 * // => 'fooBar'
 */
var camelCase = createCompounder(function(result, word, index) {
  word = word.toLowerCase();
  return result + (index ? capitalize(word) : word);
});

module.exports = camelCase;

},{"./capitalize":"node_modules/lodash/capitalize.js","./_createCompounder":"node_modules/lodash/_createCompounder.js"}],"node_modules/semantic-ui-vue/dist/commonjs/lib/mixins/SemanticUIVueMixin/getChildProps.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _extends3 = require('babel-runtime/helpers/extends');

var _extends4 = _interopRequireDefault(_extends3);

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

exports.default = getChildProps;

var _camelCase = require('lodash/camelCase');

var _camelCase2 = _interopRequireDefault(_camelCase);

var _upperFirst = require('lodash/upperFirst');

var _upperFirst2 = _interopRequireDefault(_upperFirst);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

function getChildProps() {
  if (!(this.$vnode && this.$vnode.data.attrs)) return {};
  var el = this.getElementType();
  var childProps = void 0;

  if (typeof el === 'string') {
    var components = this.$options.components;
    var camelizedEl = void 0;
    var component = components[el] || components[camelizedEl = (0, _camelCase2.default)(el)] || components[(0, _upperFirst2.default)(camelizedEl)];
    if (!component) return {};
    childProps = component.options.props;
  } else if ((typeof el === 'undefined' ? 'undefined' : (0, _typeof3.default)(el)) === 'object') {
    childProps = el.props;
  } else {
    return {};
  }

  var obj = Object.entries(this.$vnode.data.attrs).filter(function (_ref) {
    var _ref2 = (0, _slicedToArray3.default)(_ref, 1),
        name = _ref2[0];

    return (0, _camelCase2.default)(name) in childProps;
  }).map(function (_ref3) {
    var _ref4 = (0, _slicedToArray3.default)(_ref3, 2),
        name = _ref4[0],
        value = _ref4[1];

    var ccName = (0, _camelCase2.default)(name);

    if (childProps[ccName].type === Boolean) {
      if (value === false) return [ccName, false];
      return [ccName, true];
    }

    return [ccName, value];
  }).reduce(function (acc, _ref5) {
    var _ref6 = (0, _slicedToArray3.default)(_ref5, 2),
        name = _ref6[0],
        value = _ref6[1];

    return (0, _extends4.default)({}, acc, (0, _defineProperty3.default)({}, name, value));
  }, {});
  return obj;
}
},{"babel-runtime/helpers/defineProperty":"node_modules/babel-runtime/helpers/defineProperty.js","babel-runtime/helpers/extends":"node_modules/babel-runtime/helpers/extends.js","babel-runtime/helpers/slicedToArray":"node_modules/babel-runtime/helpers/slicedToArray.js","babel-runtime/helpers/typeof":"node_modules/babel-runtime/helpers/typeof.js","lodash/camelCase":"node_modules/lodash/camelCase.js","lodash/upperFirst":"node_modules/lodash/upperFirst.js"}],"node_modules/semantic-ui-vue/dist/commonjs/lib/mixins/SemanticUIVueMixin/getChildListeners.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray2 = require("babel-runtime/helpers/slicedToArray");

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

exports.default = getChildListeners;

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

function getChildListeners() {
  var listeners = (0, _extends3.default)({}, this.$listeners);
  Object.entries(this.$options.events || {}).forEach(function (_ref) {
    var _ref2 = (0, _slicedToArray3.default)(_ref, 2),
        name = _ref2[0],
        custom = _ref2[1].custom;

    if (custom) {
      delete listeners[name];
    }
  });
  return listeners;
}
},{"babel-runtime/helpers/slicedToArray":"node_modules/babel-runtime/helpers/slicedToArray.js","babel-runtime/helpers/extends":"node_modules/babel-runtime/helpers/extends.js"}],"node_modules/lodash/kebabCase.js":[function(require,module,exports) {
var createCompounder = require('./_createCompounder');

/**
 * Converts `string` to
 * [kebab case](https://en.wikipedia.org/wiki/Letter_case#Special_case_styles).
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category String
 * @param {string} [string=''] The string to convert.
 * @returns {string} Returns the kebab cased string.
 * @example
 *
 * _.kebabCase('Foo Bar');
 * // => 'foo-bar'
 *
 * _.kebabCase('fooBar');
 * // => 'foo-bar'
 *
 * _.kebabCase('__FOO_BAR__');
 * // => 'foo-bar'
 */
var kebabCase = createCompounder(function(result, word, index) {
  return result + (index ? '-' : '') + word.toLowerCase();
});

module.exports = kebabCase;

},{"./_createCompounder":"node_modules/lodash/_createCompounder.js"}],"node_modules/semantic-ui-vue/dist/commonjs/lib/mixins/SemanticUIVueMixin/getElementType.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

exports.default = getElementType;

var _kebabCase = require('lodash/kebabCase');

var _kebabCase2 = _interopRequireDefault(_kebabCase);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

function getElementType() {
  var defaultEl = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'div';
  var tag = this.$vnode && this.$vnode.data.tag;
  if (!tag || tag === 'component') return defaultEl;
  var context = this.$vnode.context;
  var entry = Object.entries(context.$options.components || {}).find(function (_ref) {
    var _ref2 = (0, _slicedToArray3.default)(_ref, 1),
        name = _ref2[0];

    return (0, _kebabCase2.default)(name) === tag;
  });

  if (entry) {
    return entry[1];
  }

  return tag;
}
},{"babel-runtime/helpers/slicedToArray":"node_modules/babel-runtime/helpers/slicedToArray.js","lodash/kebabCase":"node_modules/lodash/kebabCase.js"}],"node_modules/semantic-ui-vue/dist/commonjs/lib/mixins/SemanticUIVueMixin/utils.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var classes = exports.classes = function classes() {
  for (var _len = arguments.length, classList = Array(_len), _key = 0; _key < _len; _key++) {
    classList[_key] = arguments[_key];
  }

  return classList.filter(function (c) {
    return c && c !== true;
  }).join(' ');
};

var numbers = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen'];

var num = exports.num = function num(i) {
  return typeof i === 'number' ? numbers[i - 1] : i;
};
},{}],"node_modules/semantic-ui-vue/dist/commonjs/lib/mixins/SemanticUIVueMixin/index.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SemanticUIVueMixin = undefined;

var _getChildProps = require('./getChildProps');

var _getChildProps2 = _interopRequireDefault(_getChildProps);

var _getChildListeners = require('./getChildListeners');

var _getChildListeners2 = _interopRequireDefault(_getChildListeners);

var _getElementType = require('./getElementType');

var _getElementType2 = _interopRequireDefault(_getElementType);

var _utils = require('./utils');

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

var SemanticUIVueMixin = exports.SemanticUIVueMixin = {
  methods: {
    num: _utils.num,
    classes: _utils.classes,
    getElementType: _getElementType2.default,
    getChildProps: _getChildProps2.default,
    getChildListeners: _getChildListeners2.default,
    getChildPropsAndListeners: function getChildPropsAndListeners() {
      var props = this.getChildProps();
      var listeners = this.getChildListeners();
      return {
        props: props,
        attrs: props,
        on: listeners
      };
    }
  }
};
},{"./getChildProps":"node_modules/semantic-ui-vue/dist/commonjs/lib/mixins/SemanticUIVueMixin/getChildProps.js","./getChildListeners":"node_modules/semantic-ui-vue/dist/commonjs/lib/mixins/SemanticUIVueMixin/getChildListeners.js","./getElementType":"node_modules/semantic-ui-vue/dist/commonjs/lib/mixins/SemanticUIVueMixin/getElementType.js","./utils":"node_modules/semantic-ui-vue/dist/commonjs/lib/mixins/SemanticUIVueMixin/utils.js"}],"node_modules/semantic-ui-vue/dist/commonjs/lib/mixins/classMixin.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var classMixin = exports.classMixin = {
  methods: {
    getUIClass: function getUIClass() {
      var ownName = this.constructor.options && this.constructor.options.name;
      var parentName = this.$parent && this.$parent.constructor.options && this.$parent.constructor.options.name;
      var inGroup = ownName && parentName && parentName.match(new RegExp('^' + ownName + '.*Group$'));
      return inGroup ? '' : 'ui';
    }
  }
};
},{}],"node_modules/semantic-ui-vue/dist/commonjs/lib/mixins/index.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _SemanticUIVueMixin = require('./SemanticUIVueMixin');

Object.keys(_SemanticUIVueMixin).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _SemanticUIVueMixin[key];
    }
  });
});

var _classMixin = require('./classMixin');

Object.keys(_classMixin).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _classMixin[key];
    }
  });
});
},{"./SemanticUIVueMixin":"node_modules/semantic-ui-vue/dist/commonjs/lib/mixins/SemanticUIVueMixin/index.js","./classMixin":"node_modules/semantic-ui-vue/dist/commonjs/lib/mixins/classMixin.js"}],"node_modules/semantic-ui-vue/dist/commonjs/lib/animationHelper.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var getEventAnimationEnd = function getEventAnimationEnd() {
  return window && window.webkitAnimationEnd ? 'webkitAnimationEnd' : 'animationend';
};

exports.getEventAnimationEnd = getEventAnimationEnd;
},{}],"node_modules/semantic-ui-vue/dist/commonjs/lib/textAlign.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.textAlign = textAlign;

function textAlign(align) {
  return align && (align === 'justify' ? 'justified' : align + ' aligned');
}
},{}],"node_modules/semantic-ui-vue/dist/commonjs/lib/index.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _isBrowser = require('./isBrowser');

Object.defineProperty(exports, 'isBrowser', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_isBrowser).default;
  }
});

var _mixins = require('./mixins');

Object.keys(_mixins).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _mixins[key];
    }
  });
});

var _animationHelper = require('./animationHelper');

Object.keys(_animationHelper).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _animationHelper[key];
    }
  });
});

var _textAlign = require('./textAlign');

Object.keys(_textAlign).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _textAlign[key];
    }
  });
});

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}
},{"./isBrowser":"node_modules/semantic-ui-vue/dist/commonjs/lib/isBrowser.js","./mixins":"node_modules/semantic-ui-vue/dist/commonjs/lib/mixins/index.js","./animationHelper":"node_modules/semantic-ui-vue/dist/commonjs/lib/animationHelper.js","./textAlign":"node_modules/semantic-ui-vue/dist/commonjs/lib/textAlign.js"}],"node_modules/semantic-ui-vue/dist/commonjs/collections/Breadcrumb/BreadcrumbSection.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _babelHelperVueJsxMergeProps = require('babel-helper-vue-jsx-merge-props');

var _babelHelperVueJsxMergeProps2 = _interopRequireDefault(_babelHelperVueJsxMergeProps);

var _lib = require('../../lib');

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

exports.default = {
  name: 'SuiBreadcrumbSection',
  mixins: [_lib.SemanticUIVueMixin],
  props: {
    active: Boolean,
    link: Boolean
  },
  render: function render() {
    var h = arguments[0];
    var ElementType = this.getElementType(this.link ? 'a' : 'div');
    return h(ElementType, (0, _babelHelperVueJsxMergeProps2.default)([this.getChildPropsAndListeners(), {
      'class': this.classes(this.active && 'active', this.link && 'link', 'section')
    }]), [this.$slots.default]);
  },
  meta: {
    parent: 'SuiBreadcrumb'
  }
};
},{"babel-helper-vue-jsx-merge-props":"node_modules/babel-helper-vue-jsx-merge-props/index.js","../../lib":"node_modules/semantic-ui-vue/dist/commonjs/lib/index.js"}],"node_modules/semantic-ui-vue/dist/commonjs/collections/Breadcrumb/BreadcrumbDivider.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _babelHelperVueJsxMergeProps = require('babel-helper-vue-jsx-merge-props');

var _babelHelperVueJsxMergeProps2 = _interopRequireDefault(_babelHelperVueJsxMergeProps);

var _lib = require('../../lib');

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

exports.default = {
  name: 'SuiBreadcrumbDivider',
  mixins: [_lib.SemanticUIVueMixin],
  props: {
    icon: String
  },
  render: function render() {
    var h = arguments[0];
    var ElementType = this.getElementType(this.icon ? 'i' : 'div');
    return h(ElementType, (0, _babelHelperVueJsxMergeProps2.default)([this.getChildPropsAndListeners(), {
      'class': this.classes(this.icon, this.icon && 'icon', 'divider')
    }]), [!this.icon && (this.$slots.default || '/')]);
  },
  meta: {
    parent: 'SuiBreadcrumb'
  }
};
},{"babel-helper-vue-jsx-merge-props":"node_modules/babel-helper-vue-jsx-merge-props/index.js","../../lib":"node_modules/semantic-ui-vue/dist/commonjs/lib/index.js"}],"node_modules/semantic-ui-vue/dist/commonjs/collections/Breadcrumb/Breadcrumb.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _babelHelperVueJsxMergeProps = require('babel-helper-vue-jsx-merge-props');

var _babelHelperVueJsxMergeProps2 = _interopRequireDefault(_babelHelperVueJsxMergeProps);

var _lib = require('../../lib');

var _BreadcrumbSection = require('./BreadcrumbSection');

var _BreadcrumbSection2 = _interopRequireDefault(_BreadcrumbSection);

var _BreadcrumbDivider = require('./BreadcrumbDivider');

var _BreadcrumbDivider2 = _interopRequireDefault(_BreadcrumbDivider);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

exports.default = {
  name: 'SuiBreadcrumb',
  components: {
    SuiBreadcrumbDivider: _BreadcrumbDivider2.default,
    SuiBreadcrumbSection: _BreadcrumbSection2.default
  },
  mixins: [_lib.SemanticUIVueMixin],
  props: {
    icon: String,
    sections: Array
  },
  render: function render() {
    var _this = this;

    var h = arguments[0];
    var ElementType = this.getElementType();
    return h(ElementType, (0, _babelHelperVueJsxMergeProps2.default)([this.getChildPropsAndListeners(), {
      'class': this.classes('ui', 'breadcrumb')
    }]), [this.$slots.default || this.sections.map(function (_ref, index) {
      var active = _ref.active,
          content = _ref.content,
          key = _ref.key,
          link = _ref.link;
      var sectionEl = h(_BreadcrumbSection2.default, {
        key: key,
        attrs: {
          active: active,
          link: link
        }
      }, [content]);
      if (index === 0) return sectionEl;
      return [' ', h(_BreadcrumbDivider2.default, {
        attrs: {
          icon: _this.icon
        }
      }, []), ' ', sectionEl];
    })]);
  }
};
},{"babel-helper-vue-jsx-merge-props":"node_modules/babel-helper-vue-jsx-merge-props/index.js","../../lib":"node_modules/semantic-ui-vue/dist/commonjs/lib/index.js","./BreadcrumbSection":"node_modules/semantic-ui-vue/dist/commonjs/collections/Breadcrumb/BreadcrumbSection.js","./BreadcrumbDivider":"node_modules/semantic-ui-vue/dist/commonjs/collections/Breadcrumb/BreadcrumbDivider.js"}],"node_modules/semantic-ui-vue/dist/commonjs/collections/Breadcrumb/index.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Breadcrumb = require('./Breadcrumb');

Object.defineProperty(exports, 'Breadcrumb', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_Breadcrumb).default;
  }
});

var _BreadcrumbDivider = require('./BreadcrumbDivider');

Object.defineProperty(exports, 'BreadcrumbDivider', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_BreadcrumbDivider).default;
  }
});

var _BreadcrumbSection = require('./BreadcrumbSection');

Object.defineProperty(exports, 'BreadcrumbSection', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_BreadcrumbSection).default;
  }
});

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}
},{"./Breadcrumb":"node_modules/semantic-ui-vue/dist/commonjs/collections/Breadcrumb/Breadcrumb.js","./BreadcrumbDivider":"node_modules/semantic-ui-vue/dist/commonjs/collections/Breadcrumb/BreadcrumbDivider.js","./BreadcrumbSection":"node_modules/semantic-ui-vue/dist/commonjs/collections/Breadcrumb/BreadcrumbSection.js"}],"node_modules/core-js/library/modules/_iter-call.js":[function(require,module,exports) {
// call something on iterator step with safe closing on error
var anObject = require('./_an-object');
module.exports = function (iterator, fn, value, entries) {
  try {
    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
  // 7.4.6 IteratorClose(iterator, completion)
  } catch (e) {
    var ret = iterator['return'];
    if (ret !== undefined) anObject(ret.call(iterator));
    throw e;
  }
};

},{"./_an-object":"node_modules/core-js/library/modules/_an-object.js"}],"node_modules/core-js/library/modules/_is-array-iter.js":[function(require,module,exports) {
// check on default Array iterator
var Iterators = require('./_iterators');
var ITERATOR = require('./_wks')('iterator');
var ArrayProto = Array.prototype;

module.exports = function (it) {
  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
};

},{"./_iterators":"node_modules/core-js/library/modules/_iterators.js","./_wks":"node_modules/core-js/library/modules/_wks.js"}],"node_modules/core-js/library/modules/_create-property.js":[function(require,module,exports) {
'use strict';
var $defineProperty = require('./_object-dp');
var createDesc = require('./_property-desc');

module.exports = function (object, index, value) {
  if (index in object) $defineProperty.f(object, index, createDesc(0, value));
  else object[index] = value;
};

},{"./_object-dp":"node_modules/core-js/library/modules/_object-dp.js","./_property-desc":"node_modules/core-js/library/modules/_property-desc.js"}],"node_modules/core-js/library/modules/_iter-detect.js":[function(require,module,exports) {
var ITERATOR = require('./_wks')('iterator');
var SAFE_CLOSING = false;

try {
  var riter = [7][ITERATOR]();
  riter['return'] = function () { SAFE_CLOSING = true; };
  // eslint-disable-next-line no-throw-literal
  Array.from(riter, function () { throw 2; });
} catch (e) { /* empty */ }

module.exports = function (exec, skipClosing) {
  if (!skipClosing && !SAFE_CLOSING) return false;
  var safe = false;
  try {
    var arr = [7];
    var iter = arr[ITERATOR]();
    iter.next = function () { return { done: safe = true }; };
    arr[ITERATOR] = function () { return iter; };
    exec(arr);
  } catch (e) { /* empty */ }
  return safe;
};

},{"./_wks":"node_modules/core-js/library/modules/_wks.js"}],"node_modules/core-js/library/modules/es6.array.from.js":[function(require,module,exports) {
'use strict';
var ctx = require('./_ctx');
var $export = require('./_export');
var toObject = require('./_to-object');
var call = require('./_iter-call');
var isArrayIter = require('./_is-array-iter');
var toLength = require('./_to-length');
var createProperty = require('./_create-property');
var getIterFn = require('./core.get-iterator-method');

$export($export.S + $export.F * !require('./_iter-detect')(function (iter) { Array.from(iter); }), 'Array', {
  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
  from: function from(arrayLike /* , mapfn = undefined, thisArg = undefined */) {
    var O = toObject(arrayLike);
    var C = typeof this == 'function' ? this : Array;
    var aLen = arguments.length;
    var mapfn = aLen > 1 ? arguments[1] : undefined;
    var mapping = mapfn !== undefined;
    var index = 0;
    var iterFn = getIterFn(O);
    var length, result, step, iterator;
    if (mapping) mapfn = ctx(mapfn, aLen > 2 ? arguments[2] : undefined, 2);
    // if object isn't iterable or it's array with default iterator - use simple case
    if (iterFn != undefined && !(C == Array && isArrayIter(iterFn))) {
      for (iterator = iterFn.call(O), result = new C(); !(step = iterator.next()).done; index++) {
        createProperty(result, index, mapping ? call(iterator, mapfn, [step.value, index], true) : step.value);
      }
    } else {
      length = toLength(O.length);
      for (result = new C(length); length > index; index++) {
        createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);
      }
    }
    result.length = index;
    return result;
  }
});

},{"./_ctx":"node_modules/core-js/library/modules/_ctx.js","./_export":"node_modules/core-js/library/modules/_export.js","./_to-object":"node_modules/core-js/library/modules/_to-object.js","./_iter-call":"node_modules/core-js/library/modules/_iter-call.js","./_is-array-iter":"node_modules/core-js/library/modules/_is-array-iter.js","./_to-length":"node_modules/core-js/library/modules/_to-length.js","./_create-property":"node_modules/core-js/library/modules/_create-property.js","./core.get-iterator-method":"node_modules/core-js/library/modules/core.get-iterator-method.js","./_iter-detect":"node_modules/core-js/library/modules/_iter-detect.js"}],"node_modules/core-js/library/fn/array/from.js":[function(require,module,exports) {
require('../../modules/es6.string.iterator');
require('../../modules/es6.array.from');
module.exports = require('../../modules/_core').Array.from;

},{"../../modules/es6.string.iterator":"node_modules/core-js/library/modules/es6.string.iterator.js","../../modules/es6.array.from":"node_modules/core-js/library/modules/es6.array.from.js","../../modules/_core":"node_modules/core-js/library/modules/_core.js"}],"node_modules/babel-runtime/core-js/array/from.js":[function(require,module,exports) {
module.exports = { "default": require("core-js/library/fn/array/from"), __esModule: true };
},{"core-js/library/fn/array/from":"node_modules/core-js/library/fn/array/from.js"}],"node_modules/babel-runtime/helpers/toConsumableArray.js":[function(require,module,exports) {
"use strict";

exports.__esModule = true;

var _from = require("../core-js/array/from");

var _from2 = _interopRequireDefault(_from);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
      arr2[i] = arr[i];
    }

    return arr2;
  } else {
    return (0, _from2.default)(arr);
  }
};
},{"../core-js/array/from":"node_modules/babel-runtime/core-js/array/from.js"}],"node_modules/lodash/isObject.js":[function(require,module,exports) {
/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return value != null && (type == 'object' || type == 'function');
}

module.exports = isObject;

},{}],"node_modules/lodash/isFunction.js":[function(require,module,exports) {
var baseGetTag = require('./_baseGetTag'),
    isObject = require('./isObject');

/** `Object#toString` result references. */
var asyncTag = '[object AsyncFunction]',
    funcTag = '[object Function]',
    genTag = '[object GeneratorFunction]',
    proxyTag = '[object Proxy]';

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction(value) {
  if (!isObject(value)) {
    return false;
  }
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in Safari 9 which returns 'object' for typed arrays and other constructors.
  var tag = baseGetTag(value);
  return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
}

module.exports = isFunction;

},{"./_baseGetTag":"node_modules/lodash/_baseGetTag.js","./isObject":"node_modules/lodash/isObject.js"}],"node_modules/lodash/_coreJsData.js":[function(require,module,exports) {
var root = require('./_root');

/** Used to detect overreaching core-js shims. */
var coreJsData = root['__core-js_shared__'];

module.exports = coreJsData;

},{"./_root":"node_modules/lodash/_root.js"}],"node_modules/lodash/_isMasked.js":[function(require,module,exports) {
var coreJsData = require('./_coreJsData');

/** Used to detect methods masquerading as native. */
var maskSrcKey = (function() {
  var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');
  return uid ? ('Symbol(src)_1.' + uid) : '';
}());

/**
 * Checks if `func` has its source masked.
 *
 * @private
 * @param {Function} func The function to check.
 * @returns {boolean} Returns `true` if `func` is masked, else `false`.
 */
function isMasked(func) {
  return !!maskSrcKey && (maskSrcKey in func);
}

module.exports = isMasked;

},{"./_coreJsData":"node_modules/lodash/_coreJsData.js"}],"node_modules/lodash/_toSource.js":[function(require,module,exports) {
/** Used for built-in method references. */
var funcProto = Function.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/**
 * Converts `func` to its source code.
 *
 * @private
 * @param {Function} func The function to convert.
 * @returns {string} Returns the source code.
 */
function toSource(func) {
  if (func != null) {
    try {
      return funcToString.call(func);
    } catch (e) {}
    try {
      return (func + '');
    } catch (e) {}
  }
  return '';
}

module.exports = toSource;

},{}],"node_modules/lodash/_baseIsNative.js":[function(require,module,exports) {
var isFunction = require('./isFunction'),
    isMasked = require('./_isMasked'),
    isObject = require('./isObject'),
    toSource = require('./_toSource');

/**
 * Used to match `RegExp`
 * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
 */
var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

/** Used to detect host constructors (Safari). */
var reIsHostCtor = /^\[object .+?Constructor\]$/;

/** Used for built-in method references. */
var funcProto = Function.prototype,
    objectProto = Object.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/** Used to detect if a method is native. */
var reIsNative = RegExp('^' +
  funcToString.call(hasOwnProperty).replace(reRegExpChar, '\\$&')
  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
);

/**
 * The base implementation of `_.isNative` without bad shim checks.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a native function,
 *  else `false`.
 */
function baseIsNative(value) {
  if (!isObject(value) || isMasked(value)) {
    return false;
  }
  var pattern = isFunction(value) ? reIsNative : reIsHostCtor;
  return pattern.test(toSource(value));
}

module.exports = baseIsNative;

},{"./isFunction":"node_modules/lodash/isFunction.js","./_isMasked":"node_modules/lodash/_isMasked.js","./isObject":"node_modules/lodash/isObject.js","./_toSource":"node_modules/lodash/_toSource.js"}],"node_modules/lodash/_getValue.js":[function(require,module,exports) {
/**
 * Gets the value at `key` of `object`.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {string} key The key of the property to get.
 * @returns {*} Returns the property value.
 */
function getValue(object, key) {
  return object == null ? undefined : object[key];
}

module.exports = getValue;

},{}],"node_modules/lodash/_getNative.js":[function(require,module,exports) {
var baseIsNative = require('./_baseIsNative'),
    getValue = require('./_getValue');

/**
 * Gets the native function at `key` of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the method to get.
 * @returns {*} Returns the function if it's native, else `undefined`.
 */
function getNative(object, key) {
  var value = getValue(object, key);
  return baseIsNative(value) ? value : undefined;
}

module.exports = getNative;

},{"./_baseIsNative":"node_modules/lodash/_baseIsNative.js","./_getValue":"node_modules/lodash/_getValue.js"}],"node_modules/lodash/_nativeCreate.js":[function(require,module,exports) {
var getNative = require('./_getNative');

/* Built-in method references that are verified to be native. */
var nativeCreate = getNative(Object, 'create');

module.exports = nativeCreate;

},{"./_getNative":"node_modules/lodash/_getNative.js"}],"node_modules/lodash/_hashClear.js":[function(require,module,exports) {
var nativeCreate = require('./_nativeCreate');

/**
 * Removes all key-value entries from the hash.
 *
 * @private
 * @name clear
 * @memberOf Hash
 */
function hashClear() {
  this.__data__ = nativeCreate ? nativeCreate(null) : {};
  this.size = 0;
}

module.exports = hashClear;

},{"./_nativeCreate":"node_modules/lodash/_nativeCreate.js"}],"node_modules/lodash/_hashDelete.js":[function(require,module,exports) {
/**
 * Removes `key` and its value from the hash.
 *
 * @private
 * @name delete
 * @memberOf Hash
 * @param {Object} hash The hash to modify.
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function hashDelete(key) {
  var result = this.has(key) && delete this.__data__[key];
  this.size -= result ? 1 : 0;
  return result;
}

module.exports = hashDelete;

},{}],"node_modules/lodash/_hashGet.js":[function(require,module,exports) {
var nativeCreate = require('./_nativeCreate');

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED = '__lodash_hash_undefined__';

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Gets the hash value for `key`.
 *
 * @private
 * @name get
 * @memberOf Hash
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function hashGet(key) {
  var data = this.__data__;
  if (nativeCreate) {
    var result = data[key];
    return result === HASH_UNDEFINED ? undefined : result;
  }
  return hasOwnProperty.call(data, key) ? data[key] : undefined;
}

module.exports = hashGet;

},{"./_nativeCreate":"node_modules/lodash/_nativeCreate.js"}],"node_modules/lodash/_hashHas.js":[function(require,module,exports) {
var nativeCreate = require('./_nativeCreate');

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Checks if a hash value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Hash
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function hashHas(key) {
  var data = this.__data__;
  return nativeCreate ? (data[key] !== undefined) : hasOwnProperty.call(data, key);
}

module.exports = hashHas;

},{"./_nativeCreate":"node_modules/lodash/_nativeCreate.js"}],"node_modules/lodash/_hashSet.js":[function(require,module,exports) {
var nativeCreate = require('./_nativeCreate');

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED = '__lodash_hash_undefined__';

/**
 * Sets the hash `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Hash
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the hash instance.
 */
function hashSet(key, value) {
  var data = this.__data__;
  this.size += this.has(key) ? 0 : 1;
  data[key] = (nativeCreate && value === undefined) ? HASH_UNDEFINED : value;
  return this;
}

module.exports = hashSet;

},{"./_nativeCreate":"node_modules/lodash/_nativeCreate.js"}],"node_modules/lodash/_Hash.js":[function(require,module,exports) {
var hashClear = require('./_hashClear'),
    hashDelete = require('./_hashDelete'),
    hashGet = require('./_hashGet'),
    hashHas = require('./_hashHas'),
    hashSet = require('./_hashSet');

/**
 * Creates a hash object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Hash(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

// Add methods to `Hash`.
Hash.prototype.clear = hashClear;
Hash.prototype['delete'] = hashDelete;
Hash.prototype.get = hashGet;
Hash.prototype.has = hashHas;
Hash.prototype.set = hashSet;

module.exports = Hash;

},{"./_hashClear":"node_modules/lodash/_hashClear.js","./_hashDelete":"node_modules/lodash/_hashDelete.js","./_hashGet":"node_modules/lodash/_hashGet.js","./_hashHas":"node_modules/lodash/_hashHas.js","./_hashSet":"node_modules/lodash/_hashSet.js"}],"node_modules/lodash/_listCacheClear.js":[function(require,module,exports) {
/**
 * Removes all key-value entries from the list cache.
 *
 * @private
 * @name clear
 * @memberOf ListCache
 */
function listCacheClear() {
  this.__data__ = [];
  this.size = 0;
}

module.exports = listCacheClear;

},{}],"node_modules/lodash/eq.js":[function(require,module,exports) {
/**
 * Performs a
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * comparison between two values to determine if they are equivalent.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'a': 1 };
 * var other = { 'a': 1 };
 *
 * _.eq(object, object);
 * // => true
 *
 * _.eq(object, other);
 * // => false
 *
 * _.eq('a', 'a');
 * // => true
 *
 * _.eq('a', Object('a'));
 * // => false
 *
 * _.eq(NaN, NaN);
 * // => true
 */
function eq(value, other) {
  return value === other || (value !== value && other !== other);
}

module.exports = eq;

},{}],"node_modules/lodash/_assocIndexOf.js":[function(require,module,exports) {
var eq = require('./eq');

/**
 * Gets the index at which the `key` is found in `array` of key-value pairs.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} key The key to search for.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function assocIndexOf(array, key) {
  var length = array.length;
  while (length--) {
    if (eq(array[length][0], key)) {
      return length;
    }
  }
  return -1;
}

module.exports = assocIndexOf;

},{"./eq":"node_modules/lodash/eq.js"}],"node_modules/lodash/_listCacheDelete.js":[function(require,module,exports) {
var assocIndexOf = require('./_assocIndexOf');

/** Used for built-in method references. */
var arrayProto = Array.prototype;

/** Built-in value references. */
var splice = arrayProto.splice;

/**
 * Removes `key` and its value from the list cache.
 *
 * @private
 * @name delete
 * @memberOf ListCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function listCacheDelete(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    return false;
  }
  var lastIndex = data.length - 1;
  if (index == lastIndex) {
    data.pop();
  } else {
    splice.call(data, index, 1);
  }
  --this.size;
  return true;
}

module.exports = listCacheDelete;

},{"./_assocIndexOf":"node_modules/lodash/_assocIndexOf.js"}],"node_modules/lodash/_listCacheGet.js":[function(require,module,exports) {
var assocIndexOf = require('./_assocIndexOf');

/**
 * Gets the list cache value for `key`.
 *
 * @private
 * @name get
 * @memberOf ListCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function listCacheGet(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  return index < 0 ? undefined : data[index][1];
}

module.exports = listCacheGet;

},{"./_assocIndexOf":"node_modules/lodash/_assocIndexOf.js"}],"node_modules/lodash/_listCacheHas.js":[function(require,module,exports) {
var assocIndexOf = require('./_assocIndexOf');

/**
 * Checks if a list cache value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf ListCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function listCacheHas(key) {
  return assocIndexOf(this.__data__, key) > -1;
}

module.exports = listCacheHas;

},{"./_assocIndexOf":"node_modules/lodash/_assocIndexOf.js"}],"node_modules/lodash/_listCacheSet.js":[function(require,module,exports) {
var assocIndexOf = require('./_assocIndexOf');

/**
 * Sets the list cache `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf ListCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the list cache instance.
 */
function listCacheSet(key, value) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    ++this.size;
    data.push([key, value]);
  } else {
    data[index][1] = value;
  }
  return this;
}

module.exports = listCacheSet;

},{"./_assocIndexOf":"node_modules/lodash/_assocIndexOf.js"}],"node_modules/lodash/_ListCache.js":[function(require,module,exports) {
var listCacheClear = require('./_listCacheClear'),
    listCacheDelete = require('./_listCacheDelete'),
    listCacheGet = require('./_listCacheGet'),
    listCacheHas = require('./_listCacheHas'),
    listCacheSet = require('./_listCacheSet');

/**
 * Creates an list cache object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function ListCache(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

// Add methods to `ListCache`.
ListCache.prototype.clear = listCacheClear;
ListCache.prototype['delete'] = listCacheDelete;
ListCache.prototype.get = listCacheGet;
ListCache.prototype.has = listCacheHas;
ListCache.prototype.set = listCacheSet;

module.exports = ListCache;

},{"./_listCacheClear":"node_modules/lodash/_listCacheClear.js","./_listCacheDelete":"node_modules/lodash/_listCacheDelete.js","./_listCacheGet":"node_modules/lodash/_listCacheGet.js","./_listCacheHas":"node_modules/lodash/_listCacheHas.js","./_listCacheSet":"node_modules/lodash/_listCacheSet.js"}],"node_modules/lodash/_Map.js":[function(require,module,exports) {
var getNative = require('./_getNative'),
    root = require('./_root');

/* Built-in method references that are verified to be native. */
var Map = getNative(root, 'Map');

module.exports = Map;

},{"./_getNative":"node_modules/lodash/_getNative.js","./_root":"node_modules/lodash/_root.js"}],"node_modules/lodash/_mapCacheClear.js":[function(require,module,exports) {
var Hash = require('./_Hash'),
    ListCache = require('./_ListCache'),
    Map = require('./_Map');

/**
 * Removes all key-value entries from the map.
 *
 * @private
 * @name clear
 * @memberOf MapCache
 */
function mapCacheClear() {
  this.size = 0;
  this.__data__ = {
    'hash': new Hash,
    'map': new (Map || ListCache),
    'string': new Hash
  };
}

module.exports = mapCacheClear;

},{"./_Hash":"node_modules/lodash/_Hash.js","./_ListCache":"node_modules/lodash/_ListCache.js","./_Map":"node_modules/lodash/_Map.js"}],"node_modules/lodash/_isKeyable.js":[function(require,module,exports) {
/**
 * Checks if `value` is suitable for use as unique object key.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
 */
function isKeyable(value) {
  var type = typeof value;
  return (type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean')
    ? (value !== '__proto__')
    : (value === null);
}

module.exports = isKeyable;

},{}],"node_modules/lodash/_getMapData.js":[function(require,module,exports) {
var isKeyable = require('./_isKeyable');

/**
 * Gets the data for `map`.
 *
 * @private
 * @param {Object} map The map to query.
 * @param {string} key The reference key.
 * @returns {*} Returns the map data.
 */
function getMapData(map, key) {
  var data = map.__data__;
  return isKeyable(key)
    ? data[typeof key == 'string' ? 'string' : 'hash']
    : data.map;
}

module.exports = getMapData;

},{"./_isKeyable":"node_modules/lodash/_isKeyable.js"}],"node_modules/lodash/_mapCacheDelete.js":[function(require,module,exports) {
var getMapData = require('./_getMapData');

/**
 * Removes `key` and its value from the map.
 *
 * @private
 * @name delete
 * @memberOf MapCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function mapCacheDelete(key) {
  var result = getMapData(this, key)['delete'](key);
  this.size -= result ? 1 : 0;
  return result;
}

module.exports = mapCacheDelete;

},{"./_getMapData":"node_modules/lodash/_getMapData.js"}],"node_modules/lodash/_mapCacheGet.js":[function(require,module,exports) {
var getMapData = require('./_getMapData');

/**
 * Gets the map value for `key`.
 *
 * @private
 * @name get
 * @memberOf MapCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function mapCacheGet(key) {
  return getMapData(this, key).get(key);
}

module.exports = mapCacheGet;

},{"./_getMapData":"node_modules/lodash/_getMapData.js"}],"node_modules/lodash/_mapCacheHas.js":[function(require,module,exports) {
var getMapData = require('./_getMapData');

/**
 * Checks if a map value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf MapCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function mapCacheHas(key) {
  return getMapData(this, key).has(key);
}

module.exports = mapCacheHas;

},{"./_getMapData":"node_modules/lodash/_getMapData.js"}],"node_modules/lodash/_mapCacheSet.js":[function(require,module,exports) {
var getMapData = require('./_getMapData');

/**
 * Sets the map `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf MapCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the map cache instance.
 */
function mapCacheSet(key, value) {
  var data = getMapData(this, key),
      size = data.size;

  data.set(key, value);
  this.size += data.size == size ? 0 : 1;
  return this;
}

module.exports = mapCacheSet;

},{"./_getMapData":"node_modules/lodash/_getMapData.js"}],"node_modules/lodash/_MapCache.js":[function(require,module,exports) {
var mapCacheClear = require('./_mapCacheClear'),
    mapCacheDelete = require('./_mapCacheDelete'),
    mapCacheGet = require('./_mapCacheGet'),
    mapCacheHas = require('./_mapCacheHas'),
    mapCacheSet = require('./_mapCacheSet');

/**
 * Creates a map cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function MapCache(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

// Add methods to `MapCache`.
MapCache.prototype.clear = mapCacheClear;
MapCache.prototype['delete'] = mapCacheDelete;
MapCache.prototype.get = mapCacheGet;
MapCache.prototype.has = mapCacheHas;
MapCache.prototype.set = mapCacheSet;

module.exports = MapCache;

},{"./_mapCacheClear":"node_modules/lodash/_mapCacheClear.js","./_mapCacheDelete":"node_modules/lodash/_mapCacheDelete.js","./_mapCacheGet":"node_modules/lodash/_mapCacheGet.js","./_mapCacheHas":"node_modules/lodash/_mapCacheHas.js","./_mapCacheSet":"node_modules/lodash/_mapCacheSet.js"}],"node_modules/lodash/_setCacheAdd.js":[function(require,module,exports) {
/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED = '__lodash_hash_undefined__';

/**
 * Adds `value` to the array cache.
 *
 * @private
 * @name add
 * @memberOf SetCache
 * @alias push
 * @param {*} value The value to cache.
 * @returns {Object} Returns the cache instance.
 */
function setCacheAdd(value) {
  this.__data__.set(value, HASH_UNDEFINED);
  return this;
}

module.exports = setCacheAdd;

},{}],"node_modules/lodash/_setCacheHas.js":[function(require,module,exports) {
/**
 * Checks if `value` is in the array cache.
 *
 * @private
 * @name has
 * @memberOf SetCache
 * @param {*} value The value to search for.
 * @returns {number} Returns `true` if `value` is found, else `false`.
 */
function setCacheHas(value) {
  return this.__data__.has(value);
}

module.exports = setCacheHas;

},{}],"node_modules/lodash/_SetCache.js":[function(require,module,exports) {
var MapCache = require('./_MapCache'),
    setCacheAdd = require('./_setCacheAdd'),
    setCacheHas = require('./_setCacheHas');

/**
 *
 * Creates an array cache object to store unique values.
 *
 * @private
 * @constructor
 * @param {Array} [values] The values to cache.
 */
function SetCache(values) {
  var index = -1,
      length = values == null ? 0 : values.length;

  this.__data__ = new MapCache;
  while (++index < length) {
    this.add(values[index]);
  }
}

// Add methods to `SetCache`.
SetCache.prototype.add = SetCache.prototype.push = setCacheAdd;
SetCache.prototype.has = setCacheHas;

module.exports = SetCache;

},{"./_MapCache":"node_modules/lodash/_MapCache.js","./_setCacheAdd":"node_modules/lodash/_setCacheAdd.js","./_setCacheHas":"node_modules/lodash/_setCacheHas.js"}],"node_modules/lodash/_baseFindIndex.js":[function(require,module,exports) {
/**
 * The base implementation of `_.findIndex` and `_.findLastIndex` without
 * support for iteratee shorthands.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {Function} predicate The function invoked per iteration.
 * @param {number} fromIndex The index to search from.
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function baseFindIndex(array, predicate, fromIndex, fromRight) {
  var length = array.length,
      index = fromIndex + (fromRight ? 1 : -1);

  while ((fromRight ? index-- : ++index < length)) {
    if (predicate(array[index], index, array)) {
      return index;
    }
  }
  return -1;
}

module.exports = baseFindIndex;

},{}],"node_modules/lodash/_baseIsNaN.js":[function(require,module,exports) {
/**
 * The base implementation of `_.isNaN` without support for number objects.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is `NaN`, else `false`.
 */
function baseIsNaN(value) {
  return value !== value;
}

module.exports = baseIsNaN;

},{}],"node_modules/lodash/_strictIndexOf.js":[function(require,module,exports) {
/**
 * A specialized version of `_.indexOf` which performs strict equality
 * comparisons of values, i.e. `===`.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} value The value to search for.
 * @param {number} fromIndex The index to search from.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function strictIndexOf(array, value, fromIndex) {
  var index = fromIndex - 1,
      length = array.length;

  while (++index < length) {
    if (array[index] === value) {
      return index;
    }
  }
  return -1;
}

module.exports = strictIndexOf;

},{}],"node_modules/lodash/_baseIndexOf.js":[function(require,module,exports) {
var baseFindIndex = require('./_baseFindIndex'),
    baseIsNaN = require('./_baseIsNaN'),
    strictIndexOf = require('./_strictIndexOf');

/**
 * The base implementation of `_.indexOf` without `fromIndex` bounds checks.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} value The value to search for.
 * @param {number} fromIndex The index to search from.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function baseIndexOf(array, value, fromIndex) {
  return value === value
    ? strictIndexOf(array, value, fromIndex)
    : baseFindIndex(array, baseIsNaN, fromIndex);
}

module.exports = baseIndexOf;

},{"./_baseFindIndex":"node_modules/lodash/_baseFindIndex.js","./_baseIsNaN":"node_modules/lodash/_baseIsNaN.js","./_strictIndexOf":"node_modules/lodash/_strictIndexOf.js"}],"node_modules/lodash/_arrayIncludes.js":[function(require,module,exports) {
var baseIndexOf = require('./_baseIndexOf');

/**
 * A specialized version of `_.includes` for arrays without support for
 * specifying an index to search from.
 *
 * @private
 * @param {Array} [array] The array to inspect.
 * @param {*} target The value to search for.
 * @returns {boolean} Returns `true` if `target` is found, else `false`.
 */
function arrayIncludes(array, value) {
  var length = array == null ? 0 : array.length;
  return !!length && baseIndexOf(array, value, 0) > -1;
}

module.exports = arrayIncludes;

},{"./_baseIndexOf":"node_modules/lodash/_baseIndexOf.js"}],"node_modules/lodash/_arrayIncludesWith.js":[function(require,module,exports) {
/**
 * This function is like `arrayIncludes` except that it accepts a comparator.
 *
 * @private
 * @param {Array} [array] The array to inspect.
 * @param {*} target The value to search for.
 * @param {Function} comparator The comparator invoked per element.
 * @returns {boolean} Returns `true` if `target` is found, else `false`.
 */
function arrayIncludesWith(array, value, comparator) {
  var index = -1,
      length = array == null ? 0 : array.length;

  while (++index < length) {
    if (comparator(value, array[index])) {
      return true;
    }
  }
  return false;
}

module.exports = arrayIncludesWith;

},{}],"node_modules/lodash/_cacheHas.js":[function(require,module,exports) {
/**
 * Checks if a `cache` value for `key` exists.
 *
 * @private
 * @param {Object} cache The cache to query.
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function cacheHas(cache, key) {
  return cache.has(key);
}

module.exports = cacheHas;

},{}],"node_modules/lodash/_Set.js":[function(require,module,exports) {
var getNative = require('./_getNative'),
    root = require('./_root');

/* Built-in method references that are verified to be native. */
var Set = getNative(root, 'Set');

module.exports = Set;

},{"./_getNative":"node_modules/lodash/_getNative.js","./_root":"node_modules/lodash/_root.js"}],"node_modules/lodash/noop.js":[function(require,module,exports) {
/**
 * This method returns `undefined`.
 *
 * @static
 * @memberOf _
 * @since 2.3.0
 * @category Util
 * @example
 *
 * _.times(2, _.noop);
 * // => [undefined, undefined]
 */
function noop() {
  // No operation performed.
}

module.exports = noop;

},{}],"node_modules/lodash/_setToArray.js":[function(require,module,exports) {
/**
 * Converts `set` to an array of its values.
 *
 * @private
 * @param {Object} set The set to convert.
 * @returns {Array} Returns the values.
 */
function setToArray(set) {
  var index = -1,
      result = Array(set.size);

  set.forEach(function(value) {
    result[++index] = value;
  });
  return result;
}

module.exports = setToArray;

},{}],"node_modules/lodash/_createSet.js":[function(require,module,exports) {
var Set = require('./_Set'),
    noop = require('./noop'),
    setToArray = require('./_setToArray');

/** Used as references for various `Number` constants. */
var INFINITY = 1 / 0;

/**
 * Creates a set object of `values`.
 *
 * @private
 * @param {Array} values The values to add to the set.
 * @returns {Object} Returns the new set.
 */
var createSet = !(Set && (1 / setToArray(new Set([,-0]))[1]) == INFINITY) ? noop : function(values) {
  return new Set(values);
};

module.exports = createSet;

},{"./_Set":"node_modules/lodash/_Set.js","./noop":"node_modules/lodash/noop.js","./_setToArray":"node_modules/lodash/_setToArray.js"}],"node_modules/lodash/_baseUniq.js":[function(require,module,exports) {
var SetCache = require('./_SetCache'),
    arrayIncludes = require('./_arrayIncludes'),
    arrayIncludesWith = require('./_arrayIncludesWith'),
    cacheHas = require('./_cacheHas'),
    createSet = require('./_createSet'),
    setToArray = require('./_setToArray');

/** Used as the size to enable large array optimizations. */
var LARGE_ARRAY_SIZE = 200;

/**
 * The base implementation of `_.uniqBy` without support for iteratee shorthands.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {Function} [iteratee] The iteratee invoked per element.
 * @param {Function} [comparator] The comparator invoked per element.
 * @returns {Array} Returns the new duplicate free array.
 */
function baseUniq(array, iteratee, comparator) {
  var index = -1,
      includes = arrayIncludes,
      length = array.length,
      isCommon = true,
      result = [],
      seen = result;

  if (comparator) {
    isCommon = false;
    includes = arrayIncludesWith;
  }
  else if (length >= LARGE_ARRAY_SIZE) {
    var set = iteratee ? null : createSet(array);
    if (set) {
      return setToArray(set);
    }
    isCommon = false;
    includes = cacheHas;
    seen = new SetCache;
  }
  else {
    seen = iteratee ? [] : result;
  }
  outer:
  while (++index < length) {
    var value = array[index],
        computed = iteratee ? iteratee(value) : value;

    value = (comparator || value !== 0) ? value : 0;
    if (isCommon && computed === computed) {
      var seenIndex = seen.length;
      while (seenIndex--) {
        if (seen[seenIndex] === computed) {
          continue outer;
        }
      }
      if (iteratee) {
        seen.push(computed);
      }
      result.push(value);
    }
    else if (!includes(seen, computed, comparator)) {
      if (seen !== result) {
        seen.push(computed);
      }
      result.push(value);
    }
  }
  return result;
}

module.exports = baseUniq;

},{"./_SetCache":"node_modules/lodash/_SetCache.js","./_arrayIncludes":"node_modules/lodash/_arrayIncludes.js","./_arrayIncludesWith":"node_modules/lodash/_arrayIncludesWith.js","./_cacheHas":"node_modules/lodash/_cacheHas.js","./_createSet":"node_modules/lodash/_createSet.js","./_setToArray":"node_modules/lodash/_setToArray.js"}],"node_modules/lodash/uniq.js":[function(require,module,exports) {
var baseUniq = require('./_baseUniq');

/**
 * Creates a duplicate-free version of an array, using
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * for equality comparisons, in which only the first occurrence of each element
 * is kept. The order of result values is determined by the order they occur
 * in the array.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Array
 * @param {Array} array The array to inspect.
 * @returns {Array} Returns the new duplicate free array.
 * @example
 *
 * _.uniq([2, 1, 2]);
 * // => [2, 1]
 */
function uniq(array) {
  return (array && array.length) ? baseUniq(array) : [];
}

module.exports = uniq;

},{"./_baseUniq":"node_modules/lodash/_baseUniq.js"}],"node_modules/semantic-ui-vue/dist/commonjs/lib/PropTypes.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

exports.Enum = Enum;

var _uniq = require('lodash/uniq');

var _uniq2 = _interopRequireDefault(_uniq);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

function Enum() {
  var values = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var obj = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var type = void 0;
  var choices = [].concat((0, _toConsumableArray3.default)(values));

  if (Array.isArray(obj.choices)) {
    choices.push.apply(choices, (0, _toConsumableArray3.default)(obj.choices));
  }

  var types = (0, _uniq2.default)(values.map(function (value) {
    return value.constructor;
  }));

  if (obj.type) {
    if (Array.isArray(obj.type)) {
      if (obj.type.includes(Boolean)) choices.unshift(true);
      type = (0, _uniq2.default)([].concat((0, _toConsumableArray3.default)(obj.type), (0, _toConsumableArray3.default)(types)));
    } else {
      if (obj.type === Boolean) choices.unshift(true);
      type = (0, _uniq2.default)([obj.type].concat((0, _toConsumableArray3.default)(types)));
    }
  } else {
    type = types.length === 1 ? types[0] : types;
  }

  return (0, _extends3.default)({}, obj, {
    choices: choices,
    type: type,
    validator: function validator(value) {
      return !types.includes(value.constructor) || choices.includes(value);
    }
  });
}

Object.defineProperty(Enum, 'Extend', {
  value: function value(values) {
    return function () {
      var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      return Enum(values, obj);
    };
  }
});
Enum.State = Enum.Extend(['active', 'disabled', 'error', 'warning', 'success']);
Enum.Size = Enum.Extend(['mini', 'tiny', 'small', 'standard', 'medium', 'large', 'big', 'huge', 'massive']);
Enum.Color = Enum.Extend(['red', 'orange', 'yellow', 'olive', 'green', 'teal', 'blue', 'violet', 'purple', 'pink', 'brown', 'grey', 'black']);
Enum.Attached = Enum.Extend(['top', 'bottom']);
Enum.TextAlign = Enum.Extend(['left', 'right', 'center', 'justify']);
Enum.VerticalAlign = Enum.Extend(['top', 'middle', 'bottom']);
Enum.Social = Enum.Extend(['facebook', 'twitter', 'google', 'google plus', 'vk', 'instagram', 'linkedin', 'youtube']);
Enum.Number = Enum.Extend([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen']);
Enum.Padded = Enum.Extend(['very']);
Enum.Emphasis = Enum.Extend(['secondary', 'tertiary']);
Enum.Floated = Enum.Extend(['right', 'left']);
},{"babel-runtime/helpers/extends":"node_modules/babel-runtime/helpers/extends.js","babel-runtime/helpers/toConsumableArray":"node_modules/babel-runtime/helpers/toConsumableArray.js","lodash/uniq":"node_modules/lodash/uniq.js"}],"node_modules/semantic-ui-vue/dist/commonjs/collections/Form/Form.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _babelHelperVueJsxMergeProps = require('babel-helper-vue-jsx-merge-props');

var _babelHelperVueJsxMergeProps2 = _interopRequireDefault(_babelHelperVueJsxMergeProps);

var _lib = require('../../lib');

var _PropTypes = require('../../lib/PropTypes');

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

exports.default = {
  name: 'SuiForm',
  mixins: [_lib.SemanticUIVueMixin],
  props: {
    size: _PropTypes.Enum.Size({
      description: 'A form can vary in size.'
    }),
    loading: {
      type: Boolean,
      description: 'If a form is in loading state, it will automatically show a loading indicator.'
    },
    success: {
      type: Boolean,
      description: 'Automatically show any success Message children.'
    },
    warning: {
      type: Boolean,
      description: 'Automatically show any warning Message children.'
    },
    error: {
      type: Boolean,
      description: 'Automatically show any error Message children.'
    },
    state: (0, _PropTypes.Enum)(['success', 'warning', 'error'], {
      description: 'You can set the state of form using one variable'
    }),
    inverted: {
      type: Boolean,
      description: 'A form can have its color inverted for contrast.'
    },
    equalWidth: {
      type: Boolean,
      description: 'Forms can automatically divide fields to be equal width.'
    },
    unstackable: {
      type: Boolean,
      description: 'A form can prevent itself from stacking on mobile.'
    }
  },
  render: function render() {
    var h = arguments[0];
    var ElementType = this.getElementType('form');
    return h(ElementType, (0, _babelHelperVueJsxMergeProps2.default)([this.getChildPropsAndListeners(), {
      'class': this.classes('ui', this.unstackable && 'unstackable', this.equalWidth && 'equal width', this.inverted && 'inverted', this.size, this.loading && 'loading', 'form', this.success && 'success', this.warning && 'warning', this.error && 'error', this.state)
    }]), [this.$slots.default]);
  }
};
},{"babel-helper-vue-jsx-merge-props":"node_modules/babel-helper-vue-jsx-merge-props/index.js","../../lib":"node_modules/semantic-ui-vue/dist/commonjs/lib/index.js","../../lib/PropTypes":"node_modules/semantic-ui-vue/dist/commonjs/lib/PropTypes.js"}],"node_modules/semantic-ui-vue/dist/commonjs/collections/Form/FormField.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _babelHelperVueJsxMergeProps = require('babel-helper-vue-jsx-merge-props');

var _babelHelperVueJsxMergeProps2 = _interopRequireDefault(_babelHelperVueJsxMergeProps);

var _lib = require('../../lib');

var _PropTypes = require('../../lib/PropTypes');

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

exports.default = {
  name: 'SuiFormField',
  mixins: [_lib.SemanticUIVueMixin],
  props: {
    width: _PropTypes.Enum.Number({
      description: 'A field can specify its width in grid columns'
    }),
    inline: {
      type: Boolean,
      description: 'A field can have its label next to instead of above it.'
    },
    required: {
      type: Boolean,
      description: 'A field can show that input is mandatory.'
    },
    disabled: {
      type: Boolean,
      description: 'Individual fields may be disabled.'
    },
    error: {
      type: Boolean,
      description: 'Individual fields may display an error state.'
    }
  },
  render: function render() {
    var h = arguments[0];
    var ElementType = this.getElementType();
    return h(ElementType, (0, _babelHelperVueJsxMergeProps2.default)([this.getChildPropsAndListeners(), {
      'class': this.classes(this.width && this.num(this.width) + ' wide', this.inline && 'inline', this.required && 'required', this.disabled && 'disabled', 'field', this.error && 'error')
    }]), [this.$slots.default]);
  },
  meta: {
    parent: 'SuiForm'
  }
};
},{"babel-helper-vue-jsx-merge-props":"node_modules/babel-helper-vue-jsx-merge-props/index.js","../../lib":"node_modules/semantic-ui-vue/dist/commonjs/lib/index.js","../../lib/PropTypes":"node_modules/semantic-ui-vue/dist/commonjs/lib/PropTypes.js"}],"node_modules/semantic-ui-vue/dist/commonjs/collections/Form/FormFields.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _babelHelperVueJsxMergeProps = require('babel-helper-vue-jsx-merge-props');

var _babelHelperVueJsxMergeProps2 = _interopRequireDefault(_babelHelperVueJsxMergeProps);

var _lib = require('../../lib');

var _PropTypes = require('../../lib/PropTypes');

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

exports.default = {
  name: 'SuiFormFields',
  mixins: [_lib.SemanticUIVueMixin],
  props: {
    inline: {
      type: Boolean,
      description: 'Multiple fields may be inline in a row.'
    },
    grouped: {
      type: Boolean,
      description: 'Fields can show related choices.'
    },
    fields: _PropTypes.Enum.Number({
      choices: ['equal'],
      description: 'Represents number of fields in group'
    }),
    unstackable: {
      type: Boolean,
      description: 'A form group can prevent itself from stacking on mobile.'
    }
  },
  render: function render() {
    var h = arguments[0];
    var ElementType = this.getElementType();
    return h(ElementType, (0, _babelHelperVueJsxMergeProps2.default)([this.getChildPropsAndListeners(), {
      'class': this.classes(this.unstackable && 'unstackable', this.inline && 'inline', this.grouped && 'grouped', this.num(this.fields), 'fields')
    }]), [this.$slots.default]);
  },
  meta: {
    parent: 'SuiForm'
  }
};
},{"babel-helper-vue-jsx-merge-props":"node_modules/babel-helper-vue-jsx-merge-props/index.js","../../lib":"node_modules/semantic-ui-vue/dist/commonjs/lib/index.js","../../lib/PropTypes":"node_modules/semantic-ui-vue/dist/commonjs/lib/PropTypes.js"}],"node_modules/semantic-ui-vue/dist/commonjs/collections/Form/index.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Form = require('./Form');

Object.defineProperty(exports, 'Form', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_Form).default;
  }
});

var _FormField = require('./FormField');

Object.defineProperty(exports, 'FormField', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_FormField).default;
  }
});

var _FormFields = require('./FormFields');

Object.defineProperty(exports, 'FormFields', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_FormFields).default;
  }
});

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}
},{"./Form":"node_modules/semantic-ui-vue/dist/commonjs/collections/Form/Form.js","./FormField":"node_modules/semantic-ui-vue/dist/commonjs/collections/Form/FormField.js","./FormFields":"node_modules/semantic-ui-vue/dist/commonjs/collections/Form/FormFields.js"}],"node_modules/semantic-ui-vue/dist/commonjs/collections/Grid/Grid.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _babelHelperVueJsxMergeProps = require('babel-helper-vue-jsx-merge-props');

var _babelHelperVueJsxMergeProps2 = _interopRequireDefault(_babelHelperVueJsxMergeProps);

var _lib = require('../../lib');

var _PropTypes = require('../../lib/PropTypes');

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

exports.default = {
  name: 'SuiGrid',
  mixins: [_lib.SemanticUIVueMixin],
  description: 'A grid is used to harmonize negative space in a layout.',
  props: {
    celled: (0, _PropTypes.Enum)(['internally'], {
      type: Boolean,
      description: 'A grid can have rows divided into cells.'
    }),
    centered: {
      type: Boolean,
      description: 'A grid can have its columns centered.'
    },
    columns: _PropTypes.Enum.Number({
      choices: ['equal'],
      description: 'Represents column count per row in Grid.'
    }),
    container: {
      type: Boolean,
      description: 'A grid can be combined with a container to use the available layout and alignment.'
    },
    divided: (0, _PropTypes.Enum)(['vertically'], {
      type: Boolean,
      description: 'A grid can have dividers between its columns.'
    }),
    doubling: {
      type: Boolean,
      description: 'A grid can double its column width on tablet and mobile sizes.'
    },
    padded: (0, _PropTypes.Enum)(['horizontally', 'vertically'], {
      type: Boolean,
      description: 'A grid can preserve its vertical and horizontal gutters on first and last columns.'
    }),
    relaxed: (0, _PropTypes.Enum)(['very'], {
      type: Boolean,
      description: 'A grid can increase its gutters to allow for more negative space.'
    }),
    reversed: (0, _PropTypes.Enum)(['mobile', 'tablet', 'computer'], {
      description: 'A grid can specify that its columns should reverse order at different device types.'
    }),
    stackable: {
      type: Boolean,
      description: 'A grid can have its columns stack on-top of each other after reaching mobile breakpoints.'
    },
    stretched: {
      type: Boolean,
      description: 'A grid can stretch its contents to take up the entire grid height.'
    },
    textAlign: _PropTypes.Enum.TextAlign({
      description: 'A grid can specify its text alignment.'
    }),
    verticalAlign: _PropTypes.Enum.VerticalAlign({
      description: 'A grid can specify its vertical alignment to have all its columns vertically centered.'
    }),
    verticallyReversed: (0, _PropTypes.Enum)(['mobile', 'tablet', 'computer'], {
      description: 'A grid can specify that its rows should reverse order at different device types.'
    })
  },
  render: function render() {
    var h = arguments[0];
    var ElementType = this.getElementType();
    return h(ElementType, (0, _babelHelperVueJsxMergeProps2.default)([this.getChildPropsAndListeners(), {
      'class': this.classes('ui', this.reversed && this.reversed + ' reversed', this.verticallyReversed && this.verticallyReversed + ' vertically reversed', this.columns && this.num(this.columns) + ' column', this.stackable && 'stackable', this.stretched && 'stretched', this.doubling && 'doubling', this.padded, this.padded && 'padded', this.verticalAlign, this.verticalAlign && 'aligned', (0, _lib.textAlign)(this.textAlign), this.centered && 'centered', this.divided, this.divided && 'divided', this.celled, this.celled && 'celled', this.relaxed, this.relaxed && 'relaxed', 'grid', this.container && 'container')
    }]), [this.$slots.default]);
  }
};
},{"babel-helper-vue-jsx-merge-props":"node_modules/babel-helper-vue-jsx-merge-props/index.js","../../lib":"node_modules/semantic-ui-vue/dist/commonjs/lib/index.js","../../lib/PropTypes":"node_modules/semantic-ui-vue/dist/commonjs/lib/PropTypes.js"}],"node_modules/semantic-ui-vue/dist/commonjs/collections/Grid/GridColumn.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _babelHelperVueJsxMergeProps = require('babel-helper-vue-jsx-merge-props');

var _babelHelperVueJsxMergeProps2 = _interopRequireDefault(_babelHelperVueJsxMergeProps);

var _lib = require('../../lib');

var _PropTypes = require('../../lib/PropTypes');

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

exports.default = {
  name: 'SuiGridColumn',
  mixins: [_lib.SemanticUIVueMixin],
  description: 'A column sub-component for Grid.',
  props: {
    color: _PropTypes.Enum.Color({
      description: 'A grid column can be colored.'
    }),
    centered: Boolean,
    width: _PropTypes.Enum.Number({
      description: 'Represents width of column.'
    }),
    mobile: _PropTypes.Enum.Number({
      description: 'A column can specify a width for a mobile device.'
    }),
    tablet: _PropTypes.Enum.Number({
      description: 'A column can specify a width for a tablet device.'
    }),
    computer: _PropTypes.Enum.Number({
      description: 'A column can specify a width for a computer.'
    }),
    largeScreen: _PropTypes.Enum.Number({
      description: 'A column can specify a width for a large screen device.'
    }),
    widescreen: _PropTypes.Enum.Number({
      description: 'A column can specify a width for a widescreen device.'
    }),
    floated: (0, _PropTypes.Enum)(['left', 'right'], {
      description: 'A column can sit flush against the left or right edge of a row.'
    }),
    textAlign: _PropTypes.Enum.TextAlign({
      description: 'A column can specify its text alignment.'
    }),
    verticalAlign: _PropTypes.Enum.VerticalAlign({
      description: 'A column can specify its vertical alignment to have all its columns vertically centered.'
    }),
    only: (0, _PropTypes.Enum)(['mobile', 'tablet', 'computer', 'widescreen', 'large screen'], {
      description: 'A column can appear only for a specific device, or screen sizes.'
    }),
    stretched: {
      type: Boolean,
      description: 'A column can stretch its contents to take up the entire grid or row height.'
    }
  },
  render: function render() {
    var h = arguments[0];
    var ElementType = this.getElementType();
    return h(ElementType, (0, _babelHelperVueJsxMergeProps2.default)([this.getChildPropsAndListeners(), {
      'class': this.classes(this.floated && this.floated + ' floated', (0, _lib.textAlign)(this.textAlign), this.verticalAlign && this.verticalAlign + ' aligned', this.width && this.num(this.width) + ' wide', this.mobile && this.num(this.mobile) + ' wide mobile', this.tablet && this.num(this.tablet) + ' wide tablet', this.computer && this.num(this.computer) + ' wide computer', this.widescreen && this.num(this.widescreen) + ' wide widescreen', this.largeScreen && this.num(this.largeScreen) + ' wide large screen', this.only && this.only + ' only', this.centered && 'centered', this.stretched && 'stretched', this.color, 'column')
    }]), [this.$slots.default]);
  },
  meta: {
    parent: 'SuiGrid'
  }
};
},{"babel-helper-vue-jsx-merge-props":"node_modules/babel-helper-vue-jsx-merge-props/index.js","../../lib":"node_modules/semantic-ui-vue/dist/commonjs/lib/index.js","../../lib/PropTypes":"node_modules/semantic-ui-vue/dist/commonjs/lib/PropTypes.js"}],"node_modules/semantic-ui-vue/dist/commonjs/collections/Grid/GridRow.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _babelHelperVueJsxMergeProps = require('babel-helper-vue-jsx-merge-props');

var _babelHelperVueJsxMergeProps2 = _interopRequireDefault(_babelHelperVueJsxMergeProps);

var _lib = require('../../lib');

var _PropTypes = require('../../lib/PropTypes');

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

exports.default = {
  name: 'SuiGridRow',
  mixins: [_lib.SemanticUIVueMixin],
  description: 'A row sub-component for Grid',
  props: {
    columns: _PropTypes.Enum.Number({
      description: 'Represents column count per line in Row.'
    }),
    centered: {
      type: Boolean,
      description: 'A row can have its columns centered.'
    },
    only: (0, _PropTypes.Enum)(['mobile', 'tablet', 'computer', 'widescreen', 'large screen'], {
      description: 'A row can appear only for a specific device, or screen sizes.'
    }),
    divided: {
      type: Boolean,
      description: 'A row can have dividers between its columns.'
    },
    color: _PropTypes.Enum.Color({
      description: 'A grid row can be colored.'
    }),
    reversed: (0, _PropTypes.Enum)(['mobile', 'tablet', 'computer'], {
      description: 'A row can specify that its columns should reverse order at different device types.'
    }),
    stretched: {
      type: Boolean,
      description: 'A row can stretch its contents to take up the entire column height.'
    },
    textAlign: _PropTypes.Enum.TextAlign({
      description: 'A row can specify its text alignment.'
    }),
    verticalAlign: _PropTypes.Enum.VerticalAlign({
      description: 'A row can specify its vertical alignment to have all its columns vertically centered.'
    })
  },
  render: function render() {
    var h = arguments[0];
    var ElementType = this.getElementType();
    return h(ElementType, (0, _babelHelperVueJsxMergeProps2.default)([this.getChildPropsAndListeners(), {
      'class': this.classes(this.reversed && this.reversed + ' reversed', this.only && this.only + ' only', this.divided && 'divided', (0, _lib.textAlign)(this.textAlign), this.verticalAlign && this.verticalAlign + ' aligned', this.centered && 'centered', this.stretched && 'stretched', this.color, this.columns && this.num(this.columns) + ' column', 'row')
    }]), [this.$slots.default]);
  },
  meta: {
    parent: 'SuiGrid'
  }
};
},{"babel-helper-vue-jsx-merge-props":"node_modules/babel-helper-vue-jsx-merge-props/index.js","../../lib":"node_modules/semantic-ui-vue/dist/commonjs/lib/index.js","../../lib/PropTypes":"node_modules/semantic-ui-vue/dist/commonjs/lib/PropTypes.js"}],"node_modules/semantic-ui-vue/dist/commonjs/collections/Grid/index.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Grid = require('./Grid');

Object.defineProperty(exports, 'Grid', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_Grid).default;
  }
});

var _GridColumn = require('./GridColumn');

Object.defineProperty(exports, 'GridColumn', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_GridColumn).default;
  }
});

var _GridRow = require('./GridRow');

Object.defineProperty(exports, 'GridRow', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_GridRow).default;
  }
});

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}
},{"./Grid":"node_modules/semantic-ui-vue/dist/commonjs/collections/Grid/Grid.js","./GridColumn":"node_modules/semantic-ui-vue/dist/commonjs/collections/Grid/GridColumn.js","./GridRow":"node_modules/semantic-ui-vue/dist/commonjs/collections/Grid/GridRow.js"}],"node_modules/semantic-ui-vue/dist/commonjs/elements/Icon/Icon.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _babelHelperVueJsxMergeProps = require('babel-helper-vue-jsx-merge-props');

var _babelHelperVueJsxMergeProps2 = _interopRequireDefault(_babelHelperVueJsxMergeProps);

var _lib = require('../../lib');

var _PropTypes = require('../../lib/PropTypes');

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

exports.default = {
  name: 'SuiIcon',
  mixins: [_lib.SemanticUIVueMixin],
  props: {
    circular: Boolean,
    color: _PropTypes.Enum.Color(),
    disabled: Boolean,
    fitted: Boolean,
    name: {
      type: String,
      required: true
    },
    loading: Boolean,
    size: _PropTypes.Enum.Size()
  },
  render: function render() {
    var h = arguments[0];
    var ElementType = this.getElementType('i');
    return h(ElementType, (0, _babelHelperVueJsxMergeProps2.default)([this.getChildPropsAndListeners(), {
      'class': this.classes(this.color, this.name, this.size, this.disabled && 'disabled', this.circular && 'circular', this.fitted && 'fitted', this.loading && 'loading', 'icon')
    }]), []);
  }
};
},{"babel-helper-vue-jsx-merge-props":"node_modules/babel-helper-vue-jsx-merge-props/index.js","../../lib":"node_modules/semantic-ui-vue/dist/commonjs/lib/index.js","../../lib/PropTypes":"node_modules/semantic-ui-vue/dist/commonjs/lib/PropTypes.js"}],"node_modules/semantic-ui-vue/dist/commonjs/collections/Menu/MenuItem.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _babelHelperVueJsxMergeProps = require('babel-helper-vue-jsx-merge-props');

var _babelHelperVueJsxMergeProps2 = _interopRequireDefault(_babelHelperVueJsxMergeProps);

var _lib = require('../../lib');

var _PropTypes = require('../../lib/PropTypes');

var _Icon = require('../../elements/Icon/Icon');

var _Icon2 = _interopRequireDefault(_Icon);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

exports.default = {
  name: 'SuiMenuItem',
  mixins: [_lib.SemanticUIVueMixin],
  props: {
    active: {
      type: Boolean,
      description: 'A menu item can be active.'
    },
    color: _PropTypes.Enum.Color({
      description: 'Additional colors can be specified.'
    }),
    content: {
      type: String,
      description: 'Shorthand for primary content.'
    },
    header: {
      type: Boolean,
      description: 'A menu item may include a header or may itself be a header.'
    },
    icon: {
      type: [Boolean, String],
      description: 'MenuItem can be only icon.'
    },
    link: {
      type: Boolean,
      description: 'A menu item can be link.'
    },
    position: (0, _PropTypes.Enum)(['left', 'right'], {
      description: 'A menu item can take left or right position.'
    }),
    disabled: {
      type: Boolean,
      description: 'A menu item can be disabled.'
    },
    fitted: (0, _PropTypes.Enum)(['horizontally', 'vertically'], {
      type: Boolean,
      description: 'A menu item or menu can remove element padding, vertically or horizontally..'
    })
  },
  render: function render() {
    var h = arguments[0];
    var ElementType = this.getElementType(this.link ? 'a' : 'div');
    return h(ElementType, (0, _babelHelperVueJsxMergeProps2.default)([this.getChildPropsAndListeners(), {
      'class': this.classes(this.disabled && 'disabled', this.active && 'active', this.fitted, this.fitted && 'fitted', this.header && 'header', this.link && 'link', this.position, 'item')
    }]), [this.icon && h(_Icon2.default, {
      attrs: {
        name: this.icon
      }
    }, []), this.$slots.default || this.content]);
  },
  meta: {
    parent: 'SuiMenu'
  }
};
},{"babel-helper-vue-jsx-merge-props":"node_modules/babel-helper-vue-jsx-merge-props/index.js","../../lib":"node_modules/semantic-ui-vue/dist/commonjs/lib/index.js","../../lib/PropTypes":"node_modules/semantic-ui-vue/dist/commonjs/lib/PropTypes.js","../../elements/Icon/Icon":"node_modules/semantic-ui-vue/dist/commonjs/elements/Icon/Icon.js"}],"node_modules/semantic-ui-vue/dist/commonjs/collections/Menu/Menu.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _babelHelperVueJsxMergeProps = require('babel-helper-vue-jsx-merge-props');

var _babelHelperVueJsxMergeProps2 = _interopRequireDefault(_babelHelperVueJsxMergeProps);

var _lib = require('../../lib');

var _PropTypes = require('../../lib/PropTypes');

var _MenuItem = require('./MenuItem');

var _MenuItem2 = _interopRequireDefault(_MenuItem);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

exports.default = {
  name: 'SuiMenu',
  components: {
    SuiMenuItem: _MenuItem2.default
  },
  mixins: [_lib.SemanticUIVueMixin],
  props: {
    activeIndex: {
      type: Number,
      description: 'Index of the currently active item.'
    },
    attached: _PropTypes.Enum.Attached({
      type: Boolean,
      description: 'A menu may be attached to other content segments.'
    }),
    color: _PropTypes.Enum.Color({
      description: 'Additional colors can be specified.'
    }),
    compact: {
      type: Boolean,
      description: 'A menu can take up only the space necessary to fit its content.'
    },
    fixed: (0, _PropTypes.Enum)(['right', 'left', 'bottom', 'top'], {
      description: 'A menu can be fixed to a side of its context.',
      type: Boolean
    }),
    icon: (0, _PropTypes.Enum)(['labeled'], {
      type: Boolean,
      description: 'A menu may have just icons (bool) or labeled icons'
    }),
    inverted: {
      type: Boolean,
      description: 'A menu may have its colors inverted to show greater contrast.'
    },
    items: {
      type: Array,
      description: 'Shorthand array of props for Menu items.'
    },
    floated: (0, _PropTypes.Enum)(['right'], {
      type: Boolean,
      description: 'A menu can be floated.'
    }),
    fluid: {
      type: Boolean,
      default: false,
      description: 'A vertical menu may take the size of its container.'
    },
    secondary: {
      type: Boolean,
      description: 'A menu can adjust its appearance to de-emphasize its contents.'
    },
    pointing: {
      type: Boolean,
      description: 'A menu can point to show its relationship to nearby content.'
    },
    tabular: (0, _PropTypes.Enum)(['right'], {
      type: Boolean,
      description: 'A menu can be formatted to show tabs of information'
    }),
    text: {
      type: Boolean,
      description: 'A menu can be formatted for text content.'
    },
    vertical: {
      type: Boolean,
      description: 'A vertical menu displays elements vertically.'
    },
    widths: _PropTypes.Enum.Number({
      description: 'A menu can have its items divided evenly.'
    }),
    borderless: {
      type: Boolean,
      default: false,
      description: 'A menu item or menu can have no borders.'
    },
    pagination: {
      type: Boolean,
      description: 'A pagination menu is specially formatted to present links to pages of content.'
    }
  },
  render: function render() {
    var _this = this;

    var h = arguments[0];
    var ElementType = this.getElementType();
    return h(ElementType, (0, _babelHelperVueJsxMergeProps2.default)([this.getChildPropsAndListeners(), {
      'class': this.classes('ui', this.attached && this.attached + ' attached', this.vertical && 'vertical', this.fluid && 'fluid', this.compact && 'compact', this.fixed && this.fixed + ' fixed', this.text && 'text', this.icon, this.icon && 'icon', this.inverted && 'inverted', this.pagination && 'pagination', this.borderless && 'borderless', this.floated, this.floated && 'floated', this.widths && this.num(this.widths) + ' item', this.secondary && 'secondary', this.pointing && 'pointing', this.tabular, this.tabular && 'tabular', this.color, 'menu')
    }]), [this.$slots.default || this.items && this.items.map(function (item, index) {
      return h(_MenuItem2.default, (0, _babelHelperVueJsxMergeProps2.default)([{
        props: item
      }, {
        attrs: {
          active: item.active || _this.activeIndex === index
        }
      }]), []);
    })]);
  }
};
},{"babel-helper-vue-jsx-merge-props":"node_modules/babel-helper-vue-jsx-merge-props/index.js","../../lib":"node_modules/semantic-ui-vue/dist/commonjs/lib/index.js","../../lib/PropTypes":"node_modules/semantic-ui-vue/dist/commonjs/lib/PropTypes.js","./MenuItem":"node_modules/semantic-ui-vue/dist/commonjs/collections/Menu/MenuItem.js"}],"node_modules/semantic-ui-vue/dist/commonjs/collections/Menu/MenuHeader.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _babelHelperVueJsxMergeProps = require('babel-helper-vue-jsx-merge-props');

var _babelHelperVueJsxMergeProps2 = _interopRequireDefault(_babelHelperVueJsxMergeProps);

var _lib = require('../../lib');

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

exports.default = {
  name: 'SuiMenuHeader',
  mixins: [_lib.SemanticUIVueMixin],
  props: {
    content: {
      type: String,
      description: 'Shorthand for primary content.'
    }
  },
  render: function render() {
    var h = arguments[0];
    var ElementType = this.getElementType();
    return h(ElementType, (0, _babelHelperVueJsxMergeProps2.default)([this.getChildPropsAndListeners(), {
      'class': 'header'
    }]), [this.$slots.default || this.content]);
  },
  meta: {
    parent: 'SuiMenu'
  }
};
},{"babel-helper-vue-jsx-merge-props":"node_modules/babel-helper-vue-jsx-merge-props/index.js","../../lib":"node_modules/semantic-ui-vue/dist/commonjs/lib/index.js"}],"node_modules/semantic-ui-vue/dist/commonjs/collections/Menu/MenuMenu.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _babelHelperVueJsxMergeProps = require('babel-helper-vue-jsx-merge-props');

var _babelHelperVueJsxMergeProps2 = _interopRequireDefault(_babelHelperVueJsxMergeProps);

var _lib = require('../../lib');

var _PropTypes = require('../../lib/PropTypes');

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

exports.default = {
  name: 'SuiMenuMenu',
  mixins: [_lib.SemanticUIVueMixin],
  props: {
    position: (0, _PropTypes.Enum)(['left', 'right'], {
      description: 'A sub menu can take left or right position'
    })
  },
  render: function render() {
    var h = arguments[0];
    var ElementType = this.getElementType();
    return h(ElementType, (0, _babelHelperVueJsxMergeProps2.default)([this.getChildPropsAndListeners(), {
      'class': this.classes(this.position, 'menu')
    }]), [this.$slots.default]);
  },
  meta: {
    parent: 'SuiMenu'
  }
};
},{"babel-helper-vue-jsx-merge-props":"node_modules/babel-helper-vue-jsx-merge-props/index.js","../../lib":"node_modules/semantic-ui-vue/dist/commonjs/lib/index.js","../../lib/PropTypes":"node_modules/semantic-ui-vue/dist/commonjs/lib/PropTypes.js"}],"node_modules/semantic-ui-vue/dist/commonjs/collections/Menu/index.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Menu = require('./Menu');

Object.defineProperty(exports, 'Menu', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_Menu).default;
  }
});

var _MenuHeader = require('./MenuHeader');

Object.defineProperty(exports, 'MenuHeader', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_MenuHeader).default;
  }
});

var _MenuItem = require('./MenuItem');

Object.defineProperty(exports, 'MenuItem', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_MenuItem).default;
  }
});

var _MenuMenu = require('./MenuMenu');

Object.defineProperty(exports, 'MenuMenu', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_MenuMenu).default;
  }
});

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}
},{"./Menu":"node_modules/semantic-ui-vue/dist/commonjs/collections/Menu/Menu.js","./MenuHeader":"node_modules/semantic-ui-vue/dist/commonjs/collections/Menu/MenuHeader.js","./MenuItem":"node_modules/semantic-ui-vue/dist/commonjs/collections/Menu/MenuItem.js","./MenuMenu":"node_modules/semantic-ui-vue/dist/commonjs/collections/Menu/MenuMenu.js"}],"node_modules/semantic-ui-vue/dist/commonjs/collections/Message/MessageContent.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _babelHelperVueJsxMergeProps = require('babel-helper-vue-jsx-merge-props');

var _babelHelperVueJsxMergeProps2 = _interopRequireDefault(_babelHelperVueJsxMergeProps);

var _lib = require('../../lib');

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

exports.default = {
  name: 'SuiMessageContent',
  mixins: [_lib.SemanticUIVueMixin],
  render: function render() {
    var h = arguments[0];
    var ElementType = this.getElementType();
    return h(ElementType, (0, _babelHelperVueJsxMergeProps2.default)([this.getChildPropsAndListeners(), {
      'class': this.classes('content')
    }]), [this.$slots.default]);
  },
  meta: {
    parent: 'SuiMessage'
  }
};
},{"babel-helper-vue-jsx-merge-props":"node_modules/babel-helper-vue-jsx-merge-props/index.js","../../lib":"node_modules/semantic-ui-vue/dist/commonjs/lib/index.js"}],"node_modules/semantic-ui-vue/dist/commonjs/collections/Message/MessageHeader.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _babelHelperVueJsxMergeProps = require('babel-helper-vue-jsx-merge-props');

var _babelHelperVueJsxMergeProps2 = _interopRequireDefault(_babelHelperVueJsxMergeProps);

var _lib = require('../../lib');

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

exports.default = {
  name: 'SuiMessageHeader',
  mixins: [_lib.SemanticUIVueMixin],
  render: function render() {
    var h = arguments[0];
    var ElementType = this.getElementType();
    return h(ElementType, (0, _babelHelperVueJsxMergeProps2.default)([this.getChildPropsAndListeners(), {
      'class': this.classes('header')
    }]), [this.$slots.default]);
  },
  meta: {
    parent: 'SuiMessage'
  }
};
},{"babel-helper-vue-jsx-merge-props":"node_modules/babel-helper-vue-jsx-merge-props/index.js","../../lib":"node_modules/semantic-ui-vue/dist/commonjs/lib/index.js"}],"node_modules/semantic-ui-vue/dist/commonjs/collections/Message/MessageItem.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lib = require('../../lib');

exports.default = {
  name: 'SuiMessageItem',
  mixins: [_lib.SemanticUIVueMixin],
  render: function render() {
    var h = arguments[0];
    var ElementType = this.getElementType('li');
    return h(ElementType, this.getChildPropsAndListeners(), [this.$slots.default]);
  },
  meta: {
    parent: 'SuiMessage'
  }
};
},{"../../lib":"node_modules/semantic-ui-vue/dist/commonjs/lib/index.js"}],"node_modules/semantic-ui-vue/dist/commonjs/collections/Message/MessageList.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _babelHelperVueJsxMergeProps = require('babel-helper-vue-jsx-merge-props');

var _babelHelperVueJsxMergeProps2 = _interopRequireDefault(_babelHelperVueJsxMergeProps);

var _lib = require('../../lib');

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

exports.default = {
  name: 'SuiMessageList',
  mixins: [_lib.SemanticUIVueMixin],
  render: function render() {
    var h = arguments[0];
    var ElementType = this.getElementType('ul');
    return h(ElementType, (0, _babelHelperVueJsxMergeProps2.default)([this.getChildPropsAndListeners(), {
      'class': this.classes('list')
    }]), [this.$slots.default]);
  },
  meta: {
    parent: 'SuiMessage'
  }
};
},{"babel-helper-vue-jsx-merge-props":"node_modules/babel-helper-vue-jsx-merge-props/index.js","../../lib":"node_modules/semantic-ui-vue/dist/commonjs/lib/index.js"}],"node_modules/semantic-ui-vue/dist/commonjs/collections/Message/Message.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _babelHelperVueJsxMergeProps = require('babel-helper-vue-jsx-merge-props');

var _babelHelperVueJsxMergeProps2 = _interopRequireDefault(_babelHelperVueJsxMergeProps);

var _lib = require('../../lib');

var _PropTypes = require('../../lib/PropTypes');

var _Icon = require('../../elements/Icon/Icon');

var _Icon2 = _interopRequireDefault(_Icon);

var _MessageContent = require('./MessageContent');

var _MessageContent2 = _interopRequireDefault(_MessageContent);

var _MessageHeader = require('./MessageHeader');

var _MessageHeader2 = _interopRequireDefault(_MessageHeader);

var _MessageItem = require('./MessageItem');

var _MessageItem2 = _interopRequireDefault(_MessageItem);

var _MessageList = require('./MessageList');

var _MessageList2 = _interopRequireDefault(_MessageList);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

exports.default = {
  name: 'SuiMessage',
  components: {
    SuiIcon: _Icon2.default,
    SuiMessageContent: _MessageContent2.default,
    SuiMessageHeader: _MessageHeader2.default,
    SuiMessageItem: _MessageItem2.default,
    SuiMessageList: _MessageList2.default
  },
  mixins: [_lib.SemanticUIVueMixin],
  props: {
    content: {
      type: String,
      description: 'Shorthand for primary content.'
    },
    dismissable: {
      type: Boolean,
      description: 'A message can be dismissable'
    },
    header: {
      type: String,
      description: 'Shorthand for SuiMessageHeader.'
    },
    icon: {
      type: [Boolean, String],
      description: 'A message can contain an icon.'
    },
    list: {
      type: Array,
      description: 'Array shorthand items for the SuiMessageList'
    },
    size: (0, _PropTypes.Enum)(['mini', 'tiny', 'small', 'large', 'big', 'huge', 'massive'], {
      description: 'A message can have different sizes.'
    }),
    attached: (0, _PropTypes.Enum)(['bottom', 'top'], {
      type: Boolean,
      description: 'A message can be formatted to attach itself to other content.'
    }),
    color: _PropTypes.Enum.Color({
      description: 'A message can be formatted to be different colors.'
    }),
    compact: {
      type: Boolean,
      description: 'A message can only take up the width of its content.'
    },
    floating: {
      type: Boolean,
      description: 'A message can float above content that it is related to.'
    },
    info: {
      type: Boolean,
      description: 'A message may be formatted to display information.'
    },
    warning: {
      type: Boolean,
      description: 'A message may be formatted to display warning messages.'
    },
    error: {
      type: Boolean,
      description: 'A message may be formatted to display a negative message. Same as `negative`.'
    },
    negative: {
      type: Boolean,
      description: 'A message may be formatted to display a negative message. Same as `error`.'
    },
    success: {
      type: Boolean,
      description: 'A message may be formatted to display a positive message. Same as `positive`.'
    },
    positive: {
      type: Boolean,
      description: 'A message may be formatted to display a positive message. Same as `success`.'
    }
  },
  events: {
    dismiss: {
      custom: true
    }
  },
  methods: {
    handleDismiss: function handleDismiss() {
      this.$emit('dismiss');
    }
  },
  render: function render() {
    var h = arguments[0];
    var content = [this.header && h(_MessageHeader2.default, null, [this.header]), this.content, this.$slots.default, this.list && h(_MessageList2.default, null, [this.list.map(function (item) {
      return h(_MessageItem2.default, null, [item]);
    })])];
    var ElementType = this.getElementType();
    return h(ElementType, (0, _babelHelperVueJsxMergeProps2.default)([this.getChildPropsAndListeners(), {
      'class': this.classes('ui', this.color, this.size, this.floating && 'floating', this.info && 'info', this.warning && 'warning', this.success && 'success', this.positive && 'positive', this.error && 'error', this.negative && 'negative', this.attached, this.attached && 'attached', this.icon && 'icon', this.compact && 'compact', 'message')
    }]), [this.dismissable && h(_Icon2.default, {
      attrs: {
        name: 'close'
      },
      nativeOn: {
        'click': this.handleDismiss
      }
    }, []), this.icon && h(_Icon2.default, {
      attrs: {
        name: this.icon
      }
    }, []), this.icon && h(_MessageContent2.default, null, [content]), !this.icon && content]);
  }
};
},{"babel-helper-vue-jsx-merge-props":"node_modules/babel-helper-vue-jsx-merge-props/index.js","../../lib":"node_modules/semantic-ui-vue/dist/commonjs/lib/index.js","../../lib/PropTypes":"node_modules/semantic-ui-vue/dist/commonjs/lib/PropTypes.js","../../elements/Icon/Icon":"node_modules/semantic-ui-vue/dist/commonjs/elements/Icon/Icon.js","./MessageContent":"node_modules/semantic-ui-vue/dist/commonjs/collections/Message/MessageContent.js","./MessageHeader":"node_modules/semantic-ui-vue/dist/commonjs/collections/Message/MessageHeader.js","./MessageItem":"node_modules/semantic-ui-vue/dist/commonjs/collections/Message/MessageItem.js","./MessageList":"node_modules/semantic-ui-vue/dist/commonjs/collections/Message/MessageList.js"}],"node_modules/semantic-ui-vue/dist/commonjs/collections/Message/index.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Message = require('./Message');

Object.defineProperty(exports, 'Message', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_Message).default;
  }
});

var _MessageContent = require('./MessageContent');

Object.defineProperty(exports, 'MessageContent', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_MessageContent).default;
  }
});

var _MessageHeader = require('./MessageHeader');

Object.defineProperty(exports, 'MessageHeader', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_MessageHeader).default;
  }
});

var _MessageItem = require('./MessageItem');

Object.defineProperty(exports, 'MessageItem', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_MessageItem).default;
  }
});

var _MessageList = require('./MessageList');

Object.defineProperty(exports, 'MessageList', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_MessageList).default;
  }
});

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}
},{"./Message":"node_modules/semantic-ui-vue/dist/commonjs/collections/Message/Message.js","./MessageContent":"node_modules/semantic-ui-vue/dist/commonjs/collections/Message/MessageContent.js","./MessageHeader":"node_modules/semantic-ui-vue/dist/commonjs/collections/Message/MessageHeader.js","./MessageItem":"node_modules/semantic-ui-vue/dist/commonjs/collections/Message/MessageItem.js","./MessageList":"node_modules/semantic-ui-vue/dist/commonjs/collections/Message/MessageList.js"}],"node_modules/semantic-ui-vue/dist/commonjs/collections/Table/Table.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _babelHelperVueJsxMergeProps = require('babel-helper-vue-jsx-merge-props');

var _babelHelperVueJsxMergeProps2 = _interopRequireDefault(_babelHelperVueJsxMergeProps);

var _lib = require('../../lib');

var _PropTypes = require('../../lib/PropTypes');

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

exports.default = {
  name: 'SuiTable',
  mixins: [_lib.SemanticUIVueMixin],
  description: 'A table displays a collections of data grouped into rows.',
  props: {
    basic: (0, _PropTypes.Enum)(['very'], {
      type: Boolean,
      description: 'A table can reduce its complexity to increase readability.'
    }),
    celled: Boolean,
    padded: (0, _PropTypes.Enum)(['very'], {
      type: Boolean
    }),
    collapsing: Boolean,
    compact: (0, _PropTypes.Enum)(['very'], {
      type: Boolean,
      description: 'A table may sometimes need to be more compact to make more rows visible at a time.'
    }),
    definition: Boolean,
    striped: Boolean,
    textAlign: (0, _PropTypes.Enum)(['left', 'right', 'center']),
    fixed: Boolean,
    unstackable: Boolean,
    stackable: Boolean,
    selectable: Boolean,
    inverted: Boolean,
    color: _PropTypes.Enum.Color(),
    size: (0, _PropTypes.Enum)(['small', 'large']),
    singleLine: Boolean,
    columns: _PropTypes.Enum.Number()
  },
  render: function render() {
    var h = arguments[0];
    var ElementType = this.getElementType('table');
    return h(ElementType, (0, _babelHelperVueJsxMergeProps2.default)([this.getChildPropsAndListeners(), {
      'class': this.classes('ui', this.textAlign, this.textAlign && 'aligned', this.basic, this.basic && 'basic', this.celled && 'celled', this.padded, this.padded && 'padded', this.collapsing && 'collapsing', this.compact, this.compact && 'compact', this.definition && 'definition', this.striped && 'striped', this.fixed && 'fixed', this.unstackable && 'unstackable', this.stackable && 'tablet stackable', this.selectable && 'selectable', this.inverted && 'inverted', this.color, this.size, this.singleLine && 'single line', this.columns && this.num(this.columns) + ' column', 'table')
    }]), [this.$slots.default]);
  }
};
},{"babel-helper-vue-jsx-merge-props":"node_modules/babel-helper-vue-jsx-merge-props/index.js","../../lib":"node_modules/semantic-ui-vue/dist/commonjs/lib/index.js","../../lib/PropTypes":"node_modules/semantic-ui-vue/dist/commonjs/lib/PropTypes.js"}],"node_modules/semantic-ui-vue/dist/commonjs/collections/Table/TableBody.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lib = require('../../lib');

exports.default = {
  name: 'SuiTableBody',
  mixins: [_lib.SemanticUIVueMixin],
  render: function render() {
    var h = arguments[0];
    var ElementType = this.getElementType('tbody');
    return h(ElementType, this.getChildPropsAndListeners(), [this.$slots.default]);
  },
  meta: {
    parent: 'SuiTable'
  }
};
},{"../../lib":"node_modules/semantic-ui-vue/dist/commonjs/lib/index.js"}],"node_modules/semantic-ui-vue/dist/commonjs/collections/Table/TableCell.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _babelHelperVueJsxMergeProps = require('babel-helper-vue-jsx-merge-props');

var _babelHelperVueJsxMergeProps2 = _interopRequireDefault(_babelHelperVueJsxMergeProps);

var _lib = require('../../lib');

var _PropTypes = require('../../lib/PropTypes');

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

exports.default = {
  name: 'SuiTableCell',
  mixins: [_lib.SemanticUIVueMixin],
  props: {
    negative: Boolean,
    positive: Boolean,
    selected: Boolean,
    textAlign: (0, _PropTypes.Enum)(['left', 'right', 'center']),
    warning: Boolean,
    singleLine: Boolean,
    collapsing: Boolean,
    disabled: Boolean,
    selectable: Boolean,
    width: _PropTypes.Enum.Number(),
    state: _PropTypes.Enum.State(),
    verticalAlign: _PropTypes.Enum.VerticalAlign()
  },
  render: function render() {
    var h = arguments[0];
    var ElementType = this.getElementType('td');
    return h(ElementType, (0, _babelHelperVueJsxMergeProps2.default)([this.getChildPropsAndListeners(), {
      'class': this.classes(this.textAlign && this.textAlign + ' aligned', this.verticalAlign && this.verticalAlign + ' aligned', this.negative && 'negative', this.positive && 'positive', this.warning && 'warning', this.singleLine && 'single line', this.collapsing && 'collapsing', this.disabled && 'disabled', this.selectable && 'selectable', this.width && this.num(this.width) + ' wide', this.state)
    }]), [this.$slots.default]);
  },
  meta: {
    parent: 'SuiTable'
  }
};
},{"babel-helper-vue-jsx-merge-props":"node_modules/babel-helper-vue-jsx-merge-props/index.js","../../lib":"node_modules/semantic-ui-vue/dist/commonjs/lib/index.js","../../lib/PropTypes":"node_modules/semantic-ui-vue/dist/commonjs/lib/PropTypes.js"}],"node_modules/semantic-ui-vue/dist/commonjs/collections/Table/TableFooter.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _babelHelperVueJsxMergeProps = require('babel-helper-vue-jsx-merge-props');

var _babelHelperVueJsxMergeProps2 = _interopRequireDefault(_babelHelperVueJsxMergeProps);

var _lib = require('../../lib');

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

exports.default = {
  name: 'SuiTableFooter',
  mixins: [_lib.SemanticUIVueMixin],
  props: {
    fullWidth: Boolean
  },
  render: function render() {
    var h = arguments[0];
    var ElementType = this.getElementType('tfoot');
    return h(ElementType, (0, _babelHelperVueJsxMergeProps2.default)([this.getChildPropsAndListeners(), {
      'class': this.classes(this.fullWidth && 'full-width')
    }]), [this.$slots.default]);
  },
  meta: {
    parent: 'SuiTable'
  }
};
},{"babel-helper-vue-jsx-merge-props":"node_modules/babel-helper-vue-jsx-merge-props/index.js","../../lib":"node_modules/semantic-ui-vue/dist/commonjs/lib/index.js"}],"node_modules/semantic-ui-vue/dist/commonjs/collections/Table/TableHeader.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _babelHelperVueJsxMergeProps = require('babel-helper-vue-jsx-merge-props');

var _babelHelperVueJsxMergeProps2 = _interopRequireDefault(_babelHelperVueJsxMergeProps);

var _lib = require('../../lib');

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

exports.default = {
  name: 'SuiTableHeader',
  mixins: [_lib.SemanticUIVueMixin],
  props: {
    fullWidth: Boolean
  },
  render: function render() {
    var h = arguments[0];
    var ElementType = this.getElementType('thead');
    return h(ElementType, (0, _babelHelperVueJsxMergeProps2.default)([this.getChildPropsAndListeners(), {
      'class': this.classes(this.fullWidth && 'full-width')
    }]), [this.$slots.default]);
  },
  meta: {
    parent: 'SuiTable'
  }
};
},{"babel-helper-vue-jsx-merge-props":"node_modules/babel-helper-vue-jsx-merge-props/index.js","../../lib":"node_modules/semantic-ui-vue/dist/commonjs/lib/index.js"}],"node_modules/semantic-ui-vue/dist/commonjs/collections/Table/TableHeaderCell.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _babelHelperVueJsxMergeProps = require('babel-helper-vue-jsx-merge-props');

var _babelHelperVueJsxMergeProps2 = _interopRequireDefault(_babelHelperVueJsxMergeProps);

var _lib = require('../../lib');

var _PropTypes = require('../../lib/PropTypes');

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

exports.default = {
  name: 'SuiTableHeaderCell',
  mixins: [_lib.SemanticUIVueMixin],
  props: {
    negative: Boolean,
    positive: Boolean,
    selected: Boolean,
    textAlign: (0, _PropTypes.Enum)(['left', 'right', 'center']),
    warning: Boolean,
    singleLine: Boolean,
    collapsing: Boolean,
    disabled: Boolean,
    selectable: Boolean,
    width: _PropTypes.Enum.Number(),
    verticalAlign: _PropTypes.Enum.VerticalAlign()
  },
  render: function render() {
    var h = arguments[0];
    var ElementType = this.getElementType('th');
    return h(ElementType, (0, _babelHelperVueJsxMergeProps2.default)([this.getChildPropsAndListeners(), {
      'class': this.classes(this.textAlign && this.textAlign + ' aligned', this.verticalAlign && this.verticalAlign + ' aligned', this.negative && 'negative', this.positive && 'positive', this.warning && 'warning', this.singleLine && 'single line', this.collapsing && 'collapsing', this.disabled && 'disabled', this.selectable && 'selectable', this.width && this.num(this.width) + ' wide')
    }]), [this.$slots.default]);
  },
  meta: {
    parent: 'SuiTable'
  }
};
},{"babel-helper-vue-jsx-merge-props":"node_modules/babel-helper-vue-jsx-merge-props/index.js","../../lib":"node_modules/semantic-ui-vue/dist/commonjs/lib/index.js","../../lib/PropTypes":"node_modules/semantic-ui-vue/dist/commonjs/lib/PropTypes.js"}],"node_modules/semantic-ui-vue/dist/commonjs/collections/Table/TableRow.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _babelHelperVueJsxMergeProps = require('babel-helper-vue-jsx-merge-props');

var _babelHelperVueJsxMergeProps2 = _interopRequireDefault(_babelHelperVueJsxMergeProps);

var _lib = require('../../lib');

var _PropTypes = require('../../lib/PropTypes');

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

exports.default = {
  name: 'SuiTableRow',
  mixins: [_lib.SemanticUIVueMixin],
  props: {
    active: {
      description: 'A row can be active or selected by a user.',
      type: Boolean
    },
    disabled: {
      description: 'A row can be disabled.',
      type: Boolean
    },
    error: {
      description: 'A row may call attention to an error or a negative value.',
      type: Boolean
    },
    negative: {
      description: 'A row may let a user know whether a value is bad.',
      type: Boolean
    },
    positive: {
      description: 'A row may let a user know whether a value is good.',
      type: Boolean
    },
    selected: {
      description: 'DEPRECATED A row can be active or selected by a user.',
      type: Boolean
    },
    state: _PropTypes.Enum.State({
      description: 'DEPRECATED'
    }),
    textAlign: (0, _PropTypes.Enum)(['left', 'right', 'center'], {
      description: 'A table row can adjust its text alignment.'
    }),
    verticalAlign: _PropTypes.Enum.VerticalAlign({
      description: 'A row may warn a user.'
    }),
    warning: {
      description: 'A row may warn a user.',
      type: Boolean
    }
  },
  render: function render() {
    var h = arguments[0];
    var ElementType = this.getElementType('tr');
    return h(ElementType, (0, _babelHelperVueJsxMergeProps2.default)([this.getChildPropsAndListeners(), {
      'class': this.classes(this.textAlign && this.textAlign + ' aligned', this.verticalAlign && this.verticalAlign + ' aligned', this.disabled && 'disabled', this.error && 'error', this.negative && 'negative', this.positive && 'positive', (this.selected || this.active) && 'active', this.warning && 'warning', this.state)
    }]), [this.$slots.default]);
  },
  meta: {
    parent: 'SuiTable'
  }
};
},{"babel-helper-vue-jsx-merge-props":"node_modules/babel-helper-vue-jsx-merge-props/index.js","../../lib":"node_modules/semantic-ui-vue/dist/commonjs/lib/index.js","../../lib/PropTypes":"node_modules/semantic-ui-vue/dist/commonjs/lib/PropTypes.js"}],"node_modules/semantic-ui-vue/dist/commonjs/collections/Table/index.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Table = require('./Table');

Object.defineProperty(exports, 'Table', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_Table).default;
  }
});

var _TableBody = require('./TableBody');

Object.defineProperty(exports, 'TableBody', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_TableBody).default;
  }
});

var _TableCell = require('./TableCell');

Object.defineProperty(exports, 'TableCell', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_TableCell).default;
  }
});

var _TableFooter = require('./TableFooter');

Object.defineProperty(exports, 'TableFooter', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_TableFooter).default;
  }
});

var _TableHeader = require('./TableHeader');

Object.defineProperty(exports, 'TableHeader', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_TableHeader).default;
  }
});

var _TableHeaderCell = require('./TableHeaderCell');

Object.defineProperty(exports, 'TableHeaderCell', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_TableHeaderCell).default;
  }
});

var _TableRow = require('./TableRow');

Object.defineProperty(exports, 'TableRow', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_TableRow).default;
  }
});

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}
},{"./Table":"node_modules/semantic-ui-vue/dist/commonjs/collections/Table/Table.js","./TableBody":"node_modules/semantic-ui-vue/dist/commonjs/collections/Table/TableBody.js","./TableCell":"node_modules/semantic-ui-vue/dist/commonjs/collections/Table/TableCell.js","./TableFooter":"node_modules/semantic-ui-vue/dist/commonjs/collections/Table/TableFooter.js","./TableHeader":"node_modules/semantic-ui-vue/dist/commonjs/collections/Table/TableHeader.js","./TableHeaderCell":"node_modules/semantic-ui-vue/dist/commonjs/collections/Table/TableHeaderCell.js","./TableRow":"node_modules/semantic-ui-vue/dist/commonjs/collections/Table/TableRow.js"}],"node_modules/semantic-ui-vue/dist/commonjs/collections/index.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Breadcrumb = require('./Breadcrumb');

Object.keys(_Breadcrumb).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _Breadcrumb[key];
    }
  });
});

var _Form = require('./Form');

Object.keys(_Form).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _Form[key];
    }
  });
});

var _Grid = require('./Grid');

Object.keys(_Grid).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _Grid[key];
    }
  });
});

var _Menu = require('./Menu');

Object.keys(_Menu).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _Menu[key];
    }
  });
});

var _Message = require('./Message');

Object.keys(_Message).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _Message[key];
    }
  });
});

var _Table = require('./Table');

Object.keys(_Table).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _Table[key];
    }
  });
});
},{"./Breadcrumb":"node_modules/semantic-ui-vue/dist/commonjs/collections/Breadcrumb/index.js","./Form":"node_modules/semantic-ui-vue/dist/commonjs/collections/Form/index.js","./Grid":"node_modules/semantic-ui-vue/dist/commonjs/collections/Grid/index.js","./Menu":"node_modules/semantic-ui-vue/dist/commonjs/collections/Menu/index.js","./Message":"node_modules/semantic-ui-vue/dist/commonjs/collections/Message/index.js","./Table":"node_modules/semantic-ui-vue/dist/commonjs/collections/Table/index.js"}],"node_modules/semantic-ui-vue/dist/commonjs/directives/floated.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = suiFloated;
var floated = 'floated';
var left = 'left';
var right = 'right';

function suiFloated(el, _ref) {
  var arg = _ref.arg;
  el.classList.remove(left);
  el.classList.remove(right);
  el.classList.remove(floated);
  el.classList.add(arg);
  el.classList.add(floated);
}
},{}],"node_modules/semantic-ui-vue/dist/commonjs/directives/index.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _floated = require('./floated');

Object.defineProperty(exports, 'floated', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_floated).default;
  }
});

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}
},{"./floated":"node_modules/semantic-ui-vue/dist/commonjs/directives/floated.js"}],"node_modules/semantic-ui-vue/dist/commonjs/elements/Button/Button.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _babelHelperVueJsxMergeProps = require('babel-helper-vue-jsx-merge-props');

var _babelHelperVueJsxMergeProps2 = _interopRequireDefault(_babelHelperVueJsxMergeProps);

var _lib = require('../../lib');

var _PropTypes = require('../../lib/PropTypes');

var _Icon = require('../Icon/Icon');

var _Icon2 = _interopRequireDefault(_Icon);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

exports.default = {
  name: 'SuiButton',
  mixins: [_lib.SemanticUIVueMixin],
  props: {
    active: {
      type: Boolean,
      description: 'A button can show it is currently the active user selection.'
    },
    animated: (0, _PropTypes.Enum)(['fade', 'vertical'], {
      type: Boolean,
      description: 'A button can animate to show hidden content.'
    }),
    attached: (0, _PropTypes.Enum)(['left', 'right', 'top', 'bottom'], {
      description: 'A button can be attached to the top or bottom of other content.'
    }),
    basic: {
      type: Boolean,
      description: 'A basic button is less pronounced.'
    },
    circular: {
      type: Boolean,
      description: 'A button can be circular.'
    },
    className: {
      type: String,
      description: 'Additional classes.'
    },
    color: _PropTypes.Enum.Color(),
    compact: {
      type: Boolean,
      description: 'A button can reduce its padding to fit into tighter spaces.'
    },
    content: {
      type: String,
      description: 'Shorthand for primary content.'
    },
    disabled: {
      type: Boolean,
      description: 'A button can show it is currently unable to be interacted with.'
    },
    floated: (0, _PropTypes.Enum)(['left', 'right'], {
      description: 'A button can be aligned to the left or right of its container.'
    }),
    fluid: {
      type: Boolean,
      description: 'A button can take the width of its container.'
    },
    icon: String,
    inverted: {
      type: Boolean,
      description: 'A button can be formatted to appear on dark backgrounds.'
    },
    // label: {
    //   type: String,
    //   description: 'Add a Label by text, props object, or pass a <Label />.',
    // },
    labelPosition: (0, _PropTypes.Enum)(['left', 'right'], {
      description: 'A labeled button can format a Label or Icon to appear on the left or right.'
    }),
    loading: {
      type: Boolean,
      description: 'A button can show a loading indicator.'
    },
    negative: {
      type: Boolean,
      description: 'A button can hint towards a negative consequence.'
    },
    positive: {
      type: Boolean,
      description: 'A button can hint towards a positive consequence.'
    },
    primary: {
      type: Boolean,
      description: 'A button can be formatted to show different levels of emphasis.'
    },
    secondary: {
      type: Boolean,
      description: 'A button can be formatted to show different levels of emphasis.'
    },
    size: _PropTypes.Enum.Size(),
    tabIndex: {
      type: [Number, String],
      description: 'A button can receive focus.'
    },
    toggle: {
      // TODO: Add props and functional for toggle buttons
      type: Boolean,
      description: 'A button can be formatted to toggle on and off.'
    },
    social: _PropTypes.Enum.Social()
  },
  events: {
    click: {
      description: 'Click event passed to the button'
    }
  },
  render: function render() {
    var h = arguments[0];
    var ElementType = this.getElementType('button');
    var label = this.$slots.label;
    var classList = this.classes('ui', this.active && 'active', this.attached && this.attached + ' attached', this.animated, this.animated && 'animated', this.basic && 'basic', this.circular && 'circular', this.className, this.color, this.compact && 'compact', this.disabled && 'disabled', this.floated && this.floated + ' floated', this.fluid && 'fluid', this.icon && !(this.content || this.$slots.default) && 'icon', !label && this.icon && this.labelPosition && 'icon', this.inverted && 'inverted', !label && this.labelPosition && this.labelPosition, !label && this.labelPosition && 'labeled', this.loading && 'loading', this.negative && 'negative', this.positive && 'positive', this.primary && 'primary', this.secondary && 'secondary', this.social, this.size, 'button');
    var button = h(ElementType, (0, _babelHelperVueJsxMergeProps2.default)([this.getChildPropsAndListeners(), {
      'class': classList,
      attrs: {
        role: 'button'
      }
    }]), [this.icon && h(_Icon2.default, {
      attrs: {
        name: this.icon
      }
    }, []), this.content || this.$slots.default]);

    if (label) {
      return h('div', {
        'class': this.classes('ui', this.labelPosition, 'labeled', 'button')
      }, [this.labelPosition === 'left' && label, button, this.labelPosition !== 'left' && label]);
    }

    return button;
  }
};
},{"babel-helper-vue-jsx-merge-props":"node_modules/babel-helper-vue-jsx-merge-props/index.js","../../lib":"node_modules/semantic-ui-vue/dist/commonjs/lib/index.js","../../lib/PropTypes":"node_modules/semantic-ui-vue/dist/commonjs/lib/PropTypes.js","../Icon/Icon":"node_modules/semantic-ui-vue/dist/commonjs/elements/Icon/Icon.js"}],"node_modules/semantic-ui-vue/dist/commonjs/elements/Button/ButtonContent.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _babelHelperVueJsxMergeProps = require('babel-helper-vue-jsx-merge-props');

var _babelHelperVueJsxMergeProps2 = _interopRequireDefault(_babelHelperVueJsxMergeProps);

var _lib = require('../../lib');

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

exports.default = {
  name: 'SuiButtonContent',
  mixins: [_lib.SemanticUIVueMixin],
  props: {
    visible: {
      type: Boolean,
      description: 'Visible content of button'
    },
    hidden: {
      type: Boolean,
      description: 'Hidden content of button'
    }
  },
  render: function render() {
    var h = arguments[0];
    var ElementType = this.getElementType('div');
    var classList = this.classes(this.visible && 'visible', this.hidden && 'hidden', 'content');
    return h(ElementType, (0, _babelHelperVueJsxMergeProps2.default)([this.getChildPropsAndListeners(), {
      'class': classList
    }]), [this.content || this.$slots.default]);
  },
  meta: {
    parent: 'SuiButton'
  }
};
},{"babel-helper-vue-jsx-merge-props":"node_modules/babel-helper-vue-jsx-merge-props/index.js","../../lib":"node_modules/semantic-ui-vue/dist/commonjs/lib/index.js"}],"node_modules/semantic-ui-vue/dist/commonjs/elements/Button/ButtonGroup.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _babelHelperVueJsxMergeProps = require('babel-helper-vue-jsx-merge-props');

var _babelHelperVueJsxMergeProps2 = _interopRequireDefault(_babelHelperVueJsxMergeProps);

var _lib = require('../../lib');

var _PropTypes = require('../../lib/PropTypes');

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

exports.default = {
  name: 'SuiButtonGroup',
  mixins: [_lib.SemanticUIVueMixin],
  props: {
    attached: (0, _PropTypes.Enum)(['top', 'bottom']),
    widths: _PropTypes.Enum.Number(),
    vertical: Boolean,
    labeled: Boolean,
    icons: Boolean,
    color: _PropTypes.Enum.Color(),
    basic: Boolean,
    size: _PropTypes.Enum.Size()
  },
  render: function render() {
    var h = arguments[0];
    var ElementType = this.getElementType();
    return h(ElementType, (0, _babelHelperVueJsxMergeProps2.default)([this.getChildPropsAndListeners(), {
      'class': this.classes('ui', this.size, this.color, this.attached, this.attached && 'attached', this.num(this.widths), this.vertical && 'vertical', this.labeled && 'labeled', this.icons && 'icon', this.basic && 'basic', 'buttons')
    }]), [this.$slots.default]);
  },
  meta: {
    parent: 'SuiButton'
  }
};
},{"babel-helper-vue-jsx-merge-props":"node_modules/babel-helper-vue-jsx-merge-props/index.js","../../lib":"node_modules/semantic-ui-vue/dist/commonjs/lib/index.js","../../lib/PropTypes":"node_modules/semantic-ui-vue/dist/commonjs/lib/PropTypes.js"}],"node_modules/semantic-ui-vue/dist/commonjs/elements/Button/ButtonOr.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _babelHelperVueJsxMergeProps = require('babel-helper-vue-jsx-merge-props');

var _babelHelperVueJsxMergeProps2 = _interopRequireDefault(_babelHelperVueJsxMergeProps);

var _lib = require('../../lib');

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

exports.default = {
  name: 'SuiButtonOr',
  mixins: [_lib.SemanticUIVueMixin],
  props: {
    text: String
  },
  render: function render() {
    var h = arguments[0];
    var ElementType = this.getElementType();
    var attrs = {};
    if (this.text) attrs['data-text'] = this.text;
    return h(ElementType, (0, _babelHelperVueJsxMergeProps2.default)([this.getChildPropsAndListeners(), {
      'class': 'or'
    }, {
      attrs: attrs
    }]), []);
  },
  meta: {
    parent: 'SuiButton'
  }
};
},{"babel-helper-vue-jsx-merge-props":"node_modules/babel-helper-vue-jsx-merge-props/index.js","../../lib":"node_modules/semantic-ui-vue/dist/commonjs/lib/index.js"}],"node_modules/semantic-ui-vue/dist/commonjs/elements/Button/index.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Button = require('./Button');

Object.defineProperty(exports, 'Button', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_Button).default;
  }
});

var _ButtonContent = require('./ButtonContent');

Object.defineProperty(exports, 'ButtonContent', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_ButtonContent).default;
  }
});

var _ButtonGroup = require('./ButtonGroup');

Object.defineProperty(exports, 'ButtonGroup', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_ButtonGroup).default;
  }
});

var _ButtonOr = require('./ButtonOr');

Object.defineProperty(exports, 'ButtonOr', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_ButtonOr).default;
  }
});

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}
},{"./Button":"node_modules/semantic-ui-vue/dist/commonjs/elements/Button/Button.js","./ButtonContent":"node_modules/semantic-ui-vue/dist/commonjs/elements/Button/ButtonContent.js","./ButtonGroup":"node_modules/semantic-ui-vue/dist/commonjs/elements/Button/ButtonGroup.js","./ButtonOr":"node_modules/semantic-ui-vue/dist/commonjs/elements/Button/ButtonOr.js"}],"node_modules/semantic-ui-vue/dist/commonjs/elements/Container/Container.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _babelHelperVueJsxMergeProps = require('babel-helper-vue-jsx-merge-props');

var _babelHelperVueJsxMergeProps2 = _interopRequireDefault(_babelHelperVueJsxMergeProps);

var _lib = require('../../lib');

var _PropTypes = require('../../lib/PropTypes');

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

exports.default = {
  name: 'SuiContainer',
  mixins: [_lib.SemanticUIVueMixin],
  props: {
    fluid: {
      type: Boolean,
      description: 'Container has no maximum width.'
    },
    text: {
      type: Boolean,
      description: 'Reduce maximum width to more naturally accommodate text.'
    },
    textAlign: _PropTypes.Enum.TextAlign({
      description: 'Align container text.'
    })
  },
  render: function render() {
    var h = arguments[0];
    var ElementType = this.getElementType();
    return h(ElementType, (0, _babelHelperVueJsxMergeProps2.default)([this.getChildPropsAndListeners(), {
      'class': this.classes('ui', (0, _lib.textAlign)(this.textAlign), this.text && 'text', this.fluid && 'fluid', 'container')
    }]), [this.$slots.default]);
  }
};
},{"babel-helper-vue-jsx-merge-props":"node_modules/babel-helper-vue-jsx-merge-props/index.js","../../lib":"node_modules/semantic-ui-vue/dist/commonjs/lib/index.js","../../lib/PropTypes":"node_modules/semantic-ui-vue/dist/commonjs/lib/PropTypes.js"}],"node_modules/semantic-ui-vue/dist/commonjs/elements/Container/index.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Container = require('./Container');

Object.defineProperty(exports, 'Container', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_Container).default;
  }
});

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}
},{"./Container":"node_modules/semantic-ui-vue/dist/commonjs/elements/Container/Container.js"}],"node_modules/semantic-ui-vue/dist/commonjs/elements/Divider/Divider.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _babelHelperVueJsxMergeProps = require('babel-helper-vue-jsx-merge-props');

var _babelHelperVueJsxMergeProps2 = _interopRequireDefault(_babelHelperVueJsxMergeProps);

var _lib = require('../../lib');

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

exports.default = {
  name: 'SuiDivider',
  mixins: [_lib.SemanticUIVueMixin],
  props: {
    clearing: Boolean,
    fitted: Boolean,
    hidden: Boolean,
    horizontal: Boolean,
    inverted: Boolean,
    vertical: Boolean
  },
  render: function render() {
    var h = arguments[0];
    var ElementType = this.getElementType();
    return h(ElementType, (0, _babelHelperVueJsxMergeProps2.default)([this.getChildPropsAndListeners(), {
      'class': this.classes('ui', this.clearing && 'clearing', this.fitted && 'fitted', this.hidden && 'hidden', this.horizontal && 'horizontal', this.vertical && 'vertical', this.inverted && 'inverted', 'divider')
    }]), [this.$slots.default]);
  }
};
},{"babel-helper-vue-jsx-merge-props":"node_modules/babel-helper-vue-jsx-merge-props/index.js","../../lib":"node_modules/semantic-ui-vue/dist/commonjs/lib/index.js"}],"node_modules/semantic-ui-vue/dist/commonjs/elements/Divider/index.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Divider = require('./Divider');

Object.defineProperty(exports, 'Divider', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_Divider).default;
  }
});

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}
},{"./Divider":"node_modules/semantic-ui-vue/dist/commonjs/elements/Divider/Divider.js"}],"node_modules/semantic-ui-vue/dist/commonjs/elements/Flag/Flag.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _babelHelperVueJsxMergeProps = require('babel-helper-vue-jsx-merge-props');

var _babelHelperVueJsxMergeProps2 = _interopRequireDefault(_babelHelperVueJsxMergeProps);

var _lib = require('../../lib');

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

exports.default = {
  name: 'SuiFlag',
  mixins: [_lib.SemanticUIVueMixin],
  props: {
    name: String
  },
  render: function render() {
    var h = arguments[0];
    var ElementType = this.getElementType('i');
    return h(ElementType, (0, _babelHelperVueJsxMergeProps2.default)([this.getChildPropsAndListeners(), {
      'class': this.classes('flag', this.name)
    }]), []);
  }
};
},{"babel-helper-vue-jsx-merge-props":"node_modules/babel-helper-vue-jsx-merge-props/index.js","../../lib":"node_modules/semantic-ui-vue/dist/commonjs/lib/index.js"}],"node_modules/semantic-ui-vue/dist/commonjs/elements/Flag/index.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Flag = require('./Flag');

Object.defineProperty(exports, 'Flag', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_Flag).default;
  }
});

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}
},{"./Flag":"node_modules/semantic-ui-vue/dist/commonjs/elements/Flag/Flag.js"}],"node_modules/semantic-ui-vue/dist/commonjs/elements/Header/Header.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _babelHelperVueJsxMergeProps = require('babel-helper-vue-jsx-merge-props');

var _babelHelperVueJsxMergeProps2 = _interopRequireDefault(_babelHelperVueJsxMergeProps);

var _lib = require('../../lib');

var _PropTypes = require('../../lib/PropTypes');

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

exports.default = {
  name: 'SuiHeader',
  mixins: [_lib.SemanticUIVueMixin],
  props: {
    color: _PropTypes.Enum.Color(),
    content: String,
    dividing: Boolean,
    disabled: Boolean,
    floated: (0, _PropTypes.Enum)(['left', 'right']),
    icon: {
      type: [Boolean, String],
      default: false
    },
    image: {
      type: String,
      description: 'Add an image by img src or pass an Image.'
    },
    size: _PropTypes.Enum.Size(),
    sub: Boolean,
    textAlign: (0, _PropTypes.Enum)(['left', 'right', 'center', 'justify']),
    block: Boolean,
    attached: (0, _PropTypes.Enum)(['top', 'bottom'], {
      type: Boolean
    }),
    inverted: Boolean
  },
  render: function render() {
    var h = arguments[0];
    var ElementType = this.getElementType();
    return h(ElementType, (0, _babelHelperVueJsxMergeProps2.default)([this.getChildPropsAndListeners(), {
      'class': this.classes('ui', this.floated && this.floated + ' floated', (0, _lib.textAlign)(this.textAlign), this.attached, this.attached && 'attached', this.color, this.size, this.icon && 'icon', this.block && 'block', this.dividing && 'dividing', this.image && 'image', this.sub && 'sub', this.disabled && 'disabled', this.inverted && 'inverted', 'header')
    }]), [this.icon !== !!this.icon && h('sui-icon', {
      attrs: {
        name: this.icon
      }
    }, []), this.image && h('img', {
      attrs: {
        src: this.image
      },
      'class': 'ui image'
    }, []), this.$slots.default || this.content]);
  }
};
},{"babel-helper-vue-jsx-merge-props":"node_modules/babel-helper-vue-jsx-merge-props/index.js","../../lib":"node_modules/semantic-ui-vue/dist/commonjs/lib/index.js","../../lib/PropTypes":"node_modules/semantic-ui-vue/dist/commonjs/lib/PropTypes.js"}],"node_modules/semantic-ui-vue/dist/commonjs/elements/Header/HeaderContent.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _babelHelperVueJsxMergeProps = require('babel-helper-vue-jsx-merge-props');

var _babelHelperVueJsxMergeProps2 = _interopRequireDefault(_babelHelperVueJsxMergeProps);

var _lib = require('../../lib');

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

exports.default = {
  name: 'SuiHeaderContent',
  mixins: [_lib.SemanticUIVueMixin],
  render: function render() {
    var h = arguments[0];
    var ElementType = this.getElementType();
    return h(ElementType, (0, _babelHelperVueJsxMergeProps2.default)([this.getChildPropsAndListeners(), {
      'class': 'content'
    }]), [this.$slots.default]);
  },
  meta: {
    parent: 'SuiHeader'
  }
};
},{"babel-helper-vue-jsx-merge-props":"node_modules/babel-helper-vue-jsx-merge-props/index.js","../../lib":"node_modules/semantic-ui-vue/dist/commonjs/lib/index.js"}],"node_modules/semantic-ui-vue/dist/commonjs/elements/Header/HeaderSubheader.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _babelHelperVueJsxMergeProps = require('babel-helper-vue-jsx-merge-props');

var _babelHelperVueJsxMergeProps2 = _interopRequireDefault(_babelHelperVueJsxMergeProps);

var _lib = require('../../lib');

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

exports.default = {
  name: 'SuiHeaderSubheader',
  mixins: [_lib.SemanticUIVueMixin],
  render: function render() {
    var h = arguments[0];
    var ElementType = this.getElementType();
    return h(ElementType, (0, _babelHelperVueJsxMergeProps2.default)([this.getChildPropsAndListeners(), {
      'class': 'sub header'
    }]), [this.$slots.default]);
  },
  meta: {
    parent: 'SuiHeader'
  }
};
},{"babel-helper-vue-jsx-merge-props":"node_modules/babel-helper-vue-jsx-merge-props/index.js","../../lib":"node_modules/semantic-ui-vue/dist/commonjs/lib/index.js"}],"node_modules/semantic-ui-vue/dist/commonjs/elements/Header/index.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Header = require('./Header');

Object.defineProperty(exports, 'Header', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_Header).default;
  }
});

var _HeaderContent = require('./HeaderContent');

Object.defineProperty(exports, 'HeaderContent', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_HeaderContent).default;
  }
});

var _HeaderSubheader = require('./HeaderSubheader');

Object.defineProperty(exports, 'HeaderSubheader', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_HeaderSubheader).default;
  }
});

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}
},{"./Header":"node_modules/semantic-ui-vue/dist/commonjs/elements/Header/Header.js","./HeaderContent":"node_modules/semantic-ui-vue/dist/commonjs/elements/Header/HeaderContent.js","./HeaderSubheader":"node_modules/semantic-ui-vue/dist/commonjs/elements/Header/HeaderSubheader.js"}],"node_modules/semantic-ui-vue/dist/commonjs/elements/Icon/index.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Icon = require('./Icon');

Object.defineProperty(exports, 'Icon', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_Icon).default;
  }
});

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}
},{"./Icon":"node_modules/semantic-ui-vue/dist/commonjs/elements/Icon/Icon.js"}],"node_modules/semantic-ui-vue/dist/commonjs/elements/Image/Image.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lib = require('../../lib');

var _PropTypes = require('../../lib/PropTypes');

exports.default = {
  name: 'SuiImage',
  mixins: [_lib.SemanticUIVueMixin],
  props: {
    avatar: {
      type: Boolean,
      description: 'An image may be formatted to appear inline with text as an avatar.'
    },
    bordered: {
      type: Boolean,
      description: 'An image may include a border to emphasize the edges of white or transparent content.'
    },
    circular: {
      type: Boolean,
      description: 'An image may appear circular.'
    },
    rounded: {
      type: Boolean,
      description: 'An image may appear rounded.'
    },
    disabled: Boolean,
    hidden: Boolean,
    size: _PropTypes.Enum.Size(),
    spaced: (0, _PropTypes.Enum)(['left', 'right'], {
      type: Boolean
    }),
    shape: (0, _PropTypes.Enum)(['rounded', 'circular']),
    src: {
      type: String,
      required: true
    },
    floated: (0, _PropTypes.Enum)(['left', 'right']),
    centered: Boolean,
    verticalAlign: _PropTypes.Enum.VerticalAlign({
      description: 'An image can specify its vertical alignment.'
    }),
    wrapped: Boolean
  },
  render: function render() {
    var h = arguments[0];
    var ElementType = this.getElementType('div');
    var classNames = this.classes('ui', this.avatar && 'avatar', this.size, this.shape, this.verticalAlign && this.verticalAlign + ' aligned', this.floated && this.floated + ' floated', this.centered && 'centered', this.bordered && 'bordered', this.rounded && 'rounded', this.circular && 'circular', this.spaced, this.spaced && 'spaced', this.hidden && 'hidden', this.disabled && 'disabled', 'image');

    if (this.wrapped || this.$slots.corner || this.$slots.label) {
      return h(ElementType, {
        'class': classNames
      }, [this.$slots.corner, h('img', {
        attrs: {
          src: this.src
        }
      }, []), this.$slots.label]);
    }

    return h('img', {
      'class': classNames,
      attrs: {
        src: this.src
      }
    }, []);
  }
};
},{"../../lib":"node_modules/semantic-ui-vue/dist/commonjs/lib/index.js","../../lib/PropTypes":"node_modules/semantic-ui-vue/dist/commonjs/lib/PropTypes.js"}],"node_modules/semantic-ui-vue/dist/commonjs/elements/Image/ImageGroup.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lib = require('../../lib');

var _PropTypes = require('../../lib/PropTypes');

exports.default = {
  name: 'SuiImageGroup',
  mixins: [_lib.SemanticUIVueMixin],
  props: {
    size: _PropTypes.Enum.Size()
  },
  render: function render() {
    var h = arguments[0];
    var ElementType = this.getElementType('div');
    return h(ElementType, {
      'class': this.classes('ui', this.size, 'images')
    }, [this.$slots.default]);
  },
  meta: {
    parent: 'SuiImage'
  }
};
},{"../../lib":"node_modules/semantic-ui-vue/dist/commonjs/lib/index.js","../../lib/PropTypes":"node_modules/semantic-ui-vue/dist/commonjs/lib/PropTypes.js"}],"node_modules/semantic-ui-vue/dist/commonjs/elements/Image/index.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Image = require('./Image');

Object.defineProperty(exports, 'Image', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_Image).default;
  }
});

var _ImageGroup = require('./ImageGroup');

Object.defineProperty(exports, 'ImageGroup', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_ImageGroup).default;
  }
});

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}
},{"./Image":"node_modules/semantic-ui-vue/dist/commonjs/elements/Image/Image.js","./ImageGroup":"node_modules/semantic-ui-vue/dist/commonjs/elements/Image/ImageGroup.js"}],"node_modules/semantic-ui-vue/dist/commonjs/elements/Input/Input.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _babelHelperVueJsxMergeProps = require('babel-helper-vue-jsx-merge-props');

var _babelHelperVueJsxMergeProps2 = _interopRequireDefault(_babelHelperVueJsxMergeProps);

var _lib = require('../../lib');

var _PropTypes = require('../../lib/PropTypes');

var _Button = require('../../elements/Button/Button');

var _Button2 = _interopRequireDefault(_Button);

var _Icon = require('../../elements/Icon/Icon');

var _Icon2 = _interopRequireDefault(_Icon);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

exports.default = {
  name: 'SuiInput',
  components: {
    SuiButton: _Button2.default,
    SuiIcon: _Icon2.default
  },
  mixins: [_lib.SemanticUIVueMixin],
  props: {
    action: String,
    disabled: Boolean,
    error: Boolean,
    focus: Boolean,
    icon: String,
    iconPosition: (0, _PropTypes.Enum)(['left', 'right']),
    inverted: Boolean,
    loading: Boolean,
    transparent: Boolean,
    type: {
      description: 'The HTML input type.',
      default: 'text',
      type: String
    },
    value: [String, Number]
  },
  events: {
    input: {
      custom: true
    },
    blur: {
      custom: true
    }
  },
  methods: {
    handleChange: function handleChange(event) {
      var eventValue = event.target.value;
      var value = this.type === 'number' ? Number(eventValue) : eventValue;
      this.$emit('input', value);
    }
  },
  render: function render() {
    var _this = this;

    var h = arguments[0];
    var ElementType = this.getElementType();
    var icon = void 0;

    if (this.loading || this.icon) {
      icon = h(_Icon2.default, {
        attrs: {
          name: this.loading ? 'loading' : this.icon
        }
      }, []);
    }

    return h(ElementType, (0, _babelHelperVueJsxMergeProps2.default)([this.getChildPropsAndListeners(), {
      'class': this.classes('ui', this.action && 'action', this.disabled && 'disabled', this.error && 'error', this.focus && 'focus', this.transparent && 'transparent', this.inverted && 'inverted', this.loading && 'loading', this.iconPosition === 'left' && 'left', (this.loading || this.icon) && 'icon', 'input')
    }]), [h('input', (0, _babelHelperVueJsxMergeProps2.default)([{
      domProps: {
        'value': this.value
      },
      on: {
        'input': this.handleChange,
        'blur': function blur(e) {
          return _this.$emit('blur', e);
        }
      },
      ref: 'input',
      attrs: {
        type: this.type
      }
    }, {
      attrs: this.$attrs
    }]), []), icon, this.action && h(_Button2.default, {
      attrs: {
        content: this.action
      }
    }, [])]);
  }
};
},{"babel-helper-vue-jsx-merge-props":"node_modules/babel-helper-vue-jsx-merge-props/index.js","../../lib":"node_modules/semantic-ui-vue/dist/commonjs/lib/index.js","../../lib/PropTypes":"node_modules/semantic-ui-vue/dist/commonjs/lib/PropTypes.js","../../elements/Button/Button":"node_modules/semantic-ui-vue/dist/commonjs/elements/Button/Button.js","../../elements/Icon/Icon":"node_modules/semantic-ui-vue/dist/commonjs/elements/Icon/Icon.js"}],"node_modules/semantic-ui-vue/dist/commonjs/elements/Input/index.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Input = require('./Input');

Object.defineProperty(exports, 'Input', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_Input).default;
  }
});

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}
},{"./Input":"node_modules/semantic-ui-vue/dist/commonjs/elements/Input/Input.js"}],"node_modules/semantic-ui-vue/dist/commonjs/elements/Label/Label.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _babelHelperVueJsxMergeProps = require('babel-helper-vue-jsx-merge-props');

var _babelHelperVueJsxMergeProps2 = _interopRequireDefault(_babelHelperVueJsxMergeProps);

var _lib = require('../../lib');

var _PropTypes = require('../../lib/PropTypes');

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

exports.default = {
  name: 'SuiLabel',
  mixins: [_lib.SemanticUIVueMixin],
  props: {
    attached: (0, _PropTypes.Enum)(['top', 'bottom', 'top right', 'top left', 'bottom left', 'bottom right'], {
      description: 'A label can attach to a content segment.'
    }),
    basic: {
      type: Boolean,
      description: 'A label can reduce its complexity.'
    },
    circular: {
      type: Boolean,
      description: 'A label can be circular.'
    },
    color: _PropTypes.Enum.Color(),
    corner: (0, _PropTypes.Enum)(['left', 'right'], {
      description: 'A label can position itself in the corner of an element.'
    }),
    empty: {
      type: Boolean,
      description: 'Formats the label as a dot.'
    },
    floating: {
      type: Boolean,
      description: 'Float above another element in the upper right corner.'
    },
    image: Boolean,
    pointing: (0, _PropTypes.Enum)(['left', 'right', 'above', 'below'], {
      description: 'A label can point to content next to it.',
      type: Boolean
    }),
    icon: String,
    ribbon: (0, _PropTypes.Enum)(['left', 'right'], {
      description: 'A label can appear as a ribbon attaching itself to an element.',
      type: Boolean
    }),
    size: _PropTypes.Enum.Size({
      description: 'A label can have different sizes.'
    }),
    tag: _PropTypes.Enum.Color({
      description: 'A label can appear as a tag.',
      type: Boolean
    })
  },
  computed: {
    pointingClass: function pointingClass() {
      if (!this.pointing) {
        return '';
      }

      var className = '';
      if (['left', 'right'].includes(this.pointing)) className += this.pointing + ' ';
      className += 'pointing';
      if (['above', 'below'].includes(this.pointing)) className += ' ' + this.pointing;
      return className;
    }
  },
  render: function render() {
    var h = arguments[0];
    var ElementType = this.getElementType();
    return h(ElementType, (0, _babelHelperVueJsxMergeProps2.default)([this.getChildPropsAndListeners(), {
      'class': this.classes('ui', this.pointingClass, this.color, this.size, this.circular && 'circular', this.empty && 'empty', this.floating && 'floating', this.basic && 'basic', this.image && 'image', this.attached && this.attached + ' attached', this.ribbon && this.ribbon + ' ribbon', this.corner && this.corner + ' corner', this.tag && this.tag + ' tag', 'label')
    }]), [this.icon && h('sui-icon', {
      attrs: {
        name: this.icon
      }
    }, []), this.$slots.default]);
  }
};
},{"babel-helper-vue-jsx-merge-props":"node_modules/babel-helper-vue-jsx-merge-props/index.js","../../lib":"node_modules/semantic-ui-vue/dist/commonjs/lib/index.js","../../lib/PropTypes":"node_modules/semantic-ui-vue/dist/commonjs/lib/PropTypes.js"}],"node_modules/semantic-ui-vue/dist/commonjs/elements/Label/LabelDetail.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _babelHelperVueJsxMergeProps = require('babel-helper-vue-jsx-merge-props');

var _babelHelperVueJsxMergeProps2 = _interopRequireDefault(_babelHelperVueJsxMergeProps);

var _lib = require('../../lib');

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

exports.default = {
  name: 'SuiLabelDetail',
  mixins: [_lib.SemanticUIVueMixin],
  render: function render() {
    var h = arguments[0];
    var ElementType = this.getElementType();
    return h(ElementType, (0, _babelHelperVueJsxMergeProps2.default)([this.getChildPropsAndListeners(), {
      'class': 'detail'
    }]), [this.$slots.default]);
  },
  meta: {
    parent: 'SuiLabel'
  }
};
},{"babel-helper-vue-jsx-merge-props":"node_modules/babel-helper-vue-jsx-merge-props/index.js","../../lib":"node_modules/semantic-ui-vue/dist/commonjs/lib/index.js"}],"node_modules/semantic-ui-vue/dist/commonjs/elements/Label/index.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Label = require('./Label');

Object.defineProperty(exports, 'Label', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_Label).default;
  }
});

var _LabelDetail = require('./LabelDetail');

Object.defineProperty(exports, 'LabelDetail', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_LabelDetail).default;
  }
});

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}
},{"./Label":"node_modules/semantic-ui-vue/dist/commonjs/elements/Label/Label.js","./LabelDetail":"node_modules/semantic-ui-vue/dist/commonjs/elements/Label/LabelDetail.js"}],"node_modules/semantic-ui-vue/dist/commonjs/elements/List/ListIcon.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _lib = require('../../lib');

var _Icon = require('../Icon/Icon');

var _Icon2 = _interopRequireDefault(_Icon);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

exports.default = (0, _extends3.default)({}, _Icon2.default, {
  name: 'SuiListIcon',
  mixins: [_lib.SemanticUIVueMixin],
  meta: {
    parent: 'SuiList'
  }
});
},{"babel-runtime/helpers/extends":"node_modules/babel-runtime/helpers/extends.js","../../lib":"node_modules/semantic-ui-vue/dist/commonjs/lib/index.js","../Icon/Icon":"node_modules/semantic-ui-vue/dist/commonjs/elements/Icon/Icon.js"}],"node_modules/semantic-ui-vue/dist/commonjs/elements/List/ListContent.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _babelHelperVueJsxMergeProps = require('babel-helper-vue-jsx-merge-props');

var _babelHelperVueJsxMergeProps2 = _interopRequireDefault(_babelHelperVueJsxMergeProps);

var _lib = require('../../lib');

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

exports.default = {
  name: 'SuiListContent',
  mixins: [_lib.SemanticUIVueMixin],
  render: function render() {
    var h = arguments[0];
    var ElementType = this.getElementType();
    return h(ElementType, (0, _babelHelperVueJsxMergeProps2.default)([this.getChildPropsAndListeners(), {
      'class': 'content'
    }]), [this.$slots.default]);
  },
  meta: {
    parent: 'SuiList'
  }
};
},{"babel-helper-vue-jsx-merge-props":"node_modules/babel-helper-vue-jsx-merge-props/index.js","../../lib":"node_modules/semantic-ui-vue/dist/commonjs/lib/index.js"}],"node_modules/semantic-ui-vue/dist/commonjs/elements/List/ListItem.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _babelHelperVueJsxMergeProps = require('babel-helper-vue-jsx-merge-props');

var _babelHelperVueJsxMergeProps2 = _interopRequireDefault(_babelHelperVueJsxMergeProps);

var _lib = require('../../lib');

var _ListIcon = require('./ListIcon');

var _ListIcon2 = _interopRequireDefault(_ListIcon);

var _ListContent = require('./ListContent');

var _ListContent2 = _interopRequireDefault(_ListContent);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

exports.default = {
  name: 'SuiListItem',
  components: {
    SuiListContent: _ListContent2.default,
    SuiListIcon: _ListIcon2.default
  },
  mixins: [_lib.SemanticUIVueMixin],
  props: {
    active: {
      type: Boolean,
      description: 'A list item can be active.'
    },
    content: String,
    icon: String
  },
  render: function render() {
    var h = arguments[0];
    var ElementType = this.getElementType();
    return h(ElementType, (0, _babelHelperVueJsxMergeProps2.default)([this.getChildPropsAndListeners(), {
      'class': this.classes('item', this.active && 'active'),
      attrs: {
        role: 'listitem'
      }
    }]), [this.icon && h(_ListIcon2.default, {
      attrs: {
        name: this.icon
      }
    }, []), this.content ? h(_ListContent2.default, null, [this.content]) : this.$slots.default]);
  },
  meta: {
    parent: 'SuiList'
  }
};
},{"babel-helper-vue-jsx-merge-props":"node_modules/babel-helper-vue-jsx-merge-props/index.js","../../lib":"node_modules/semantic-ui-vue/dist/commonjs/lib/index.js","./ListIcon":"node_modules/semantic-ui-vue/dist/commonjs/elements/List/ListIcon.js","./ListContent":"node_modules/semantic-ui-vue/dist/commonjs/elements/List/ListContent.js"}],"node_modules/semantic-ui-vue/dist/commonjs/elements/List/List.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _babelHelperVueJsxMergeProps = require('babel-helper-vue-jsx-merge-props');

var _babelHelperVueJsxMergeProps2 = _interopRequireDefault(_babelHelperVueJsxMergeProps);

var _lib = require('../../lib');

var _PropTypes = require('../../lib/PropTypes');

var _ListItem = require('./ListItem');

var _ListItem2 = _interopRequireDefault(_ListItem);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

exports.default = {
  name: 'SuiList',
  mixins: [_lib.SemanticUIVueMixin],
  props: {
    bulleted: {
      type: Boolean,
      description: 'A list can mark items with a bullet.'
    },
    divided: Boolean,
    horizontal: Boolean,
    items: Array,
    link: Boolean,
    relaxed: Boolean,
    inverted: {
      type: Boolean,
      description: 'A list can be inverted to appear on a dark background.'
    },
    ordered: {
      type: Boolean,
      description: 'A list can be ordered numerically.'
    },
    size: _PropTypes.Enum.Size()
  },
  render: function render() {
    var h = arguments[0];
    var ElementType = this.getElementType();
    var children = void 0;

    if (this.items) {
      children = this.items.map(function (item) {
        return h(_ListItem2.default, null, [item]);
      });
    } else {
      children = this.$slots.default;
    }

    return h(ElementType, (0, _babelHelperVueJsxMergeProps2.default)([this.getChildPropsAndListeners(), {
      'class': this.classes('ui', this.size, this.bulleted && 'bulleted', this.divided && 'divided', this.ordered && 'ordered', this.horizontal && 'horizontal', this.link && 'link', this.relaxed && 'relaxed', this.inverted && 'inverted', 'list'),
      attrs: {
        role: 'list'
      }
    }]), [children]);
  }
};
},{"babel-helper-vue-jsx-merge-props":"node_modules/babel-helper-vue-jsx-merge-props/index.js","../../lib":"node_modules/semantic-ui-vue/dist/commonjs/lib/index.js","../../lib/PropTypes":"node_modules/semantic-ui-vue/dist/commonjs/lib/PropTypes.js","./ListItem":"node_modules/semantic-ui-vue/dist/commonjs/elements/List/ListItem.js"}],"node_modules/semantic-ui-vue/dist/commonjs/elements/List/ListDescription.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _babelHelperVueJsxMergeProps = require('babel-helper-vue-jsx-merge-props');

var _babelHelperVueJsxMergeProps2 = _interopRequireDefault(_babelHelperVueJsxMergeProps);

var _lib = require('../../lib');

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

exports.default = {
  name: 'SuiListDescription',
  mixins: [_lib.SemanticUIVueMixin],
  render: function render() {
    var h = arguments[0];
    var ElementType = this.getElementType();
    return h(ElementType, (0, _babelHelperVueJsxMergeProps2.default)([this.getChildPropsAndListeners(), {
      'class': 'description'
    }]), [this.$slots.default]);
  },
  meta: {
    parent: 'SuiList'
  }
};
},{"babel-helper-vue-jsx-merge-props":"node_modules/babel-helper-vue-jsx-merge-props/index.js","../../lib":"node_modules/semantic-ui-vue/dist/commonjs/lib/index.js"}],"node_modules/semantic-ui-vue/dist/commonjs/elements/List/ListHeader.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _babelHelperVueJsxMergeProps = require('babel-helper-vue-jsx-merge-props');

var _babelHelperVueJsxMergeProps2 = _interopRequireDefault(_babelHelperVueJsxMergeProps);

var _lib = require('../../lib');

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

exports.default = {
  name: 'SuiListHeader',
  mixins: [_lib.SemanticUIVueMixin],
  render: function render() {
    var h = arguments[0];
    var ElementType = this.getElementType();
    return h(ElementType, (0, _babelHelperVueJsxMergeProps2.default)([this.getChildPropsAndListeners(), {
      'class': 'header'
    }]), [this.$slots.default]);
  },
  meta: {
    parent: 'SuiList'
  }
};
},{"babel-helper-vue-jsx-merge-props":"node_modules/babel-helper-vue-jsx-merge-props/index.js","../../lib":"node_modules/semantic-ui-vue/dist/commonjs/lib/index.js"}],"node_modules/semantic-ui-vue/dist/commonjs/elements/List/ListList.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _babelHelperVueJsxMergeProps = require('babel-helper-vue-jsx-merge-props');

var _babelHelperVueJsxMergeProps2 = _interopRequireDefault(_babelHelperVueJsxMergeProps);

var _lib = require('../../lib');

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

exports.default = {
  name: 'SuiListList',
  mixins: [_lib.SemanticUIVueMixin],
  render: function render() {
    var h = arguments[0];
    var ElementType = this.getElementType();
    return h(ElementType, (0, _babelHelperVueJsxMergeProps2.default)([this.getChildPropsAndListeners(), {
      'class': 'list'
    }]), [this.$slots.default]);
  },
  meta: {
    parent: 'SuiList'
  }
};
},{"babel-helper-vue-jsx-merge-props":"node_modules/babel-helper-vue-jsx-merge-props/index.js","../../lib":"node_modules/semantic-ui-vue/dist/commonjs/lib/index.js"}],"node_modules/semantic-ui-vue/dist/commonjs/elements/List/index.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _List = require('./List');

Object.defineProperty(exports, 'List', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_List).default;
  }
});

var _ListContent = require('./ListContent');

Object.defineProperty(exports, 'ListContent', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_ListContent).default;
  }
});

var _ListDescription = require('./ListDescription');

Object.defineProperty(exports, 'ListDescription', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_ListDescription).default;
  }
});

var _ListHeader = require('./ListHeader');

Object.defineProperty(exports, 'ListHeader', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_ListHeader).default;
  }
});

var _ListIcon = require('./ListIcon');

Object.defineProperty(exports, 'ListIcon', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_ListIcon).default;
  }
});

var _ListItem = require('./ListItem');

Object.defineProperty(exports, 'ListItem', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_ListItem).default;
  }
});

var _ListList = require('./ListList');

Object.defineProperty(exports, 'ListList', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_ListList).default;
  }
});

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}
},{"./List":"node_modules/semantic-ui-vue/dist/commonjs/elements/List/List.js","./ListContent":"node_modules/semantic-ui-vue/dist/commonjs/elements/List/ListContent.js","./ListDescription":"node_modules/semantic-ui-vue/dist/commonjs/elements/List/ListDescription.js","./ListHeader":"node_modules/semantic-ui-vue/dist/commonjs/elements/List/ListHeader.js","./ListIcon":"node_modules/semantic-ui-vue/dist/commonjs/elements/List/ListIcon.js","./ListItem":"node_modules/semantic-ui-vue/dist/commonjs/elements/List/ListItem.js","./ListList":"node_modules/semantic-ui-vue/dist/commonjs/elements/List/ListList.js"}],"node_modules/semantic-ui-vue/dist/commonjs/elements/Loader/Loader.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _babelHelperVueJsxMergeProps = require('babel-helper-vue-jsx-merge-props');

var _babelHelperVueJsxMergeProps2 = _interopRequireDefault(_babelHelperVueJsxMergeProps);

var _lib = require('../../lib');

var _PropTypes = require('../../lib/PropTypes');

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

exports.default = {
  name: 'SuiLoader',
  mixins: [_lib.SemanticUIVueMixin],
  props: {
    active: Boolean,
    content: String,
    indeterminate: Boolean,
    disabled: Boolean,
    inline: Boolean,
    centered: Boolean,
    size: _PropTypes.Enum.Size({
      type: String
    }),
    inverted: Boolean
  },
  render: function render() {
    var h = arguments[0];
    var ElementType = this.getElementType();
    return h(ElementType, (0, _babelHelperVueJsxMergeProps2.default)([this.getChildPropsAndListeners(), {
      'class': this.classes('ui', this.indeterminate && 'indeterminate', this.active && 'active', this.disabled && 'disabled', this.inline && 'inline', this.centered && 'centered', this.inverted && 'inverted', this.size, (this.content || this.$slots.default) && 'text', 'loader')
    }]), [this.content || this.$slots.default]);
  }
};
},{"babel-helper-vue-jsx-merge-props":"node_modules/babel-helper-vue-jsx-merge-props/index.js","../../lib":"node_modules/semantic-ui-vue/dist/commonjs/lib/index.js","../../lib/PropTypes":"node_modules/semantic-ui-vue/dist/commonjs/lib/PropTypes.js"}],"node_modules/semantic-ui-vue/dist/commonjs/elements/Loader/index.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Loader = require('./Loader');

Object.defineProperty(exports, 'Loader', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_Loader).default;
  }
});

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}
},{"./Loader":"node_modules/semantic-ui-vue/dist/commonjs/elements/Loader/Loader.js"}],"node_modules/semantic-ui-vue/dist/commonjs/elements/Rail/Rail.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _babelHelperVueJsxMergeProps = require('babel-helper-vue-jsx-merge-props');

var _babelHelperVueJsxMergeProps2 = _interopRequireDefault(_babelHelperVueJsxMergeProps);

var _lib = require('../../lib');

var _PropTypes = require('../../lib/PropTypes');

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

exports.default = {
  name: 'SuiRail',
  mixins: [_lib.SemanticUIVueMixin],
  props: {
    attached: Boolean,
    dividing: Boolean,
    internal: Boolean,
    position: (0, _PropTypes.Enum)(['left', 'right'])
  },
  render: function render() {
    var h = arguments[0];
    var ElementType = this.getElementType();
    return h(ElementType, (0, _babelHelperVueJsxMergeProps2.default)([this.getChildPropsAndListeners(), {
      'class': this.classes('ui', this.dividing && 'dividing', this.attached && 'attached', this.internal && 'internal', this.position, 'rail')
    }]), [this.$slots.default]);
  }
};
},{"babel-helper-vue-jsx-merge-props":"node_modules/babel-helper-vue-jsx-merge-props/index.js","../../lib":"node_modules/semantic-ui-vue/dist/commonjs/lib/index.js","../../lib/PropTypes":"node_modules/semantic-ui-vue/dist/commonjs/lib/PropTypes.js"}],"node_modules/semantic-ui-vue/dist/commonjs/elements/Rail/index.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Rail = require('./Rail');

Object.defineProperty(exports, 'Rail', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_Rail).default;
  }
});

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}
},{"./Rail":"node_modules/semantic-ui-vue/dist/commonjs/elements/Rail/Rail.js"}],"node_modules/semantic-ui-vue/dist/commonjs/elements/Reveal/Reveal.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _babelHelperVueJsxMergeProps = require('babel-helper-vue-jsx-merge-props');

var _babelHelperVueJsxMergeProps2 = _interopRequireDefault(_babelHelperVueJsxMergeProps);

var _lib = require('../../lib');

var _PropTypes = require('../../lib/PropTypes');

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

exports.default = {
  name: 'SuiReveal',
  mixins: [_lib.SemanticUIVueMixin],
  props: {
    active: {
      type: Boolean,
      description: 'An active reveal displays its hidden content.'
    },
    animated: (0, _PropTypes.Enum)(['fade', 'small fade', 'move', 'move right', 'move up', 'move down', 'rotate', 'rotate left']),
    disabled: {
      type: Boolean,
      description: 'A disabled reveal will not animate when hovered.'
    },
    instant: {
      type: Boolean,
      description: 'An element can show its content without delay.'
    }
  },
  render: function render() {
    var h = arguments[0];
    var ElementType = this.getElementType();
    return h(ElementType, (0, _babelHelperVueJsxMergeProps2.default)([this.getChildPropsAndListeners(), {
      'class': this.classes('ui', this.animated, this.disabled && 'disabled', this.instant && 'instant', this.active && 'active', 'reveal')
    }]), [this.$slots.default]);
  }
};
},{"babel-helper-vue-jsx-merge-props":"node_modules/babel-helper-vue-jsx-merge-props/index.js","../../lib":"node_modules/semantic-ui-vue/dist/commonjs/lib/index.js","../../lib/PropTypes":"node_modules/semantic-ui-vue/dist/commonjs/lib/PropTypes.js"}],"node_modules/semantic-ui-vue/dist/commonjs/elements/Reveal/RevealContent.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _babelHelperVueJsxMergeProps = require('babel-helper-vue-jsx-merge-props');

var _babelHelperVueJsxMergeProps2 = _interopRequireDefault(_babelHelperVueJsxMergeProps);

var _lib = require('../../lib');

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

exports.default = {
  name: 'SuiRevealContent',
  mixins: [_lib.SemanticUIVueMixin],
  props: {
    visible: Boolean,
    hidden: Boolean
  },
  render: function render() {
    var h = arguments[0];
    var ElementType = this.getElementType();
    return h(ElementType, (0, _babelHelperVueJsxMergeProps2.default)([this.getChildPropsAndListeners(), {
      'class': this.classes('ui', this.hidden && 'hidden', this.visible && 'visible', 'content')
    }]), [this.$slots.default]);
  },
  meta: {
    parent: 'SuiReveal'
  }
};
},{"babel-helper-vue-jsx-merge-props":"node_modules/babel-helper-vue-jsx-merge-props/index.js","../../lib":"node_modules/semantic-ui-vue/dist/commonjs/lib/index.js"}],"node_modules/semantic-ui-vue/dist/commonjs/elements/Reveal/index.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Reveal = require('./Reveal');

Object.defineProperty(exports, 'Reveal', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_Reveal).default;
  }
});

var _RevealContent = require('./RevealContent');

Object.defineProperty(exports, 'RevealContent', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_RevealContent).default;
  }
});

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}
},{"./Reveal":"node_modules/semantic-ui-vue/dist/commonjs/elements/Reveal/Reveal.js","./RevealContent":"node_modules/semantic-ui-vue/dist/commonjs/elements/Reveal/RevealContent.js"}],"node_modules/semantic-ui-vue/dist/commonjs/elements/Segment/Segment.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _babelHelperVueJsxMergeProps = require('babel-helper-vue-jsx-merge-props');

var _babelHelperVueJsxMergeProps2 = _interopRequireDefault(_babelHelperVueJsxMergeProps);

var _lib = require('../../lib');

var _PropTypes = require('../../lib/PropTypes');

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

exports.default = {
  name: 'SuiSegment',
  mixins: [_lib.SemanticUIVueMixin],
  props: {
    attached: _PropTypes.Enum.Attached({
      type: Boolean,
      description: 'Attach segment to other content, like a header.'
    }),
    basic: Boolean,
    clearing: {
      type: Boolean,
      description: 'A segment can clear floated content.'
    },
    inverted: Boolean,
    padded: _PropTypes.Enum.Padded({
      type: Boolean,
      description: 'A segment can increase its padding'
    }),
    piled: Boolean,
    raised: Boolean,
    stacked: (0, _PropTypes.Enum)(['tall'], {
      type: Boolean
    }),
    vertical: Boolean,
    disabled: Boolean,
    loading: Boolean,
    compact: Boolean,
    color: _PropTypes.Enum.Color({
      type: String
    }),
    emphasis: _PropTypes.Enum.Emphasis({
      type: String
    }),
    circular: Boolean,
    floated: _PropTypes.Enum.Floated({
      type: String
    }),
    aligned: _PropTypes.Enum.TextAlign({
      type: String
    })
  },
  render: function render() {
    var h = arguments[0];
    var ElementType = this.getElementType();
    return h(ElementType, (0, _babelHelperVueJsxMergeProps2.default)([this.getChildPropsAndListeners(), {
      'class': this.classes('ui', this.attached, this.attached && 'attached', this.basic && 'basic', this.clearing && 'clearing', this.padded, this.padded && 'padded', this.inverted && 'inverted', this.stacked, this.stacked && 'stacked', this.piled && 'piled', this.raised && 'raised', this.vertical && 'vertical', this.disabled && 'disabled', this.loading && 'loading', this.compact && 'compact', this.color, this.emphasis, this.circular && 'circular', this.floated, this.floated && 'floated', this.aligned, this.aligned && 'aligned', 'segment')
    }]), [this.$slots.default]);
  }
};
},{"babel-helper-vue-jsx-merge-props":"node_modules/babel-helper-vue-jsx-merge-props/index.js","../../lib":"node_modules/semantic-ui-vue/dist/commonjs/lib/index.js","../../lib/PropTypes":"node_modules/semantic-ui-vue/dist/commonjs/lib/PropTypes.js"}],"node_modules/semantic-ui-vue/dist/commonjs/elements/Segment/Segments.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _babelHelperVueJsxMergeProps = require('babel-helper-vue-jsx-merge-props');

var _babelHelperVueJsxMergeProps2 = _interopRequireDefault(_babelHelperVueJsxMergeProps);

var _lib = require('../../lib');

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

exports.default = {
  name: 'SuiSegments',
  mixins: [_lib.SemanticUIVueMixin],
  props: {
    piled: Boolean,
    raised: Boolean,
    stacked: Boolean,
    horizontal: Boolean,
    vertical: Boolean
  },
  meta: {
    parent: 'SuiSegment'
  },
  render: function render() {
    var h = arguments[0];
    var ElementType = this.getElementType();
    return h(ElementType, (0, _babelHelperVueJsxMergeProps2.default)([this.getChildPropsAndListeners(), {
      'class': this.classes('ui', this.piled && 'piled', this.raised && 'raised', this.stacked && 'stacked', this.horizontal && 'horizontal', this.vertical && 'vertical', 'segments')
    }]), [this.$slots.default]);
  }
};
},{"babel-helper-vue-jsx-merge-props":"node_modules/babel-helper-vue-jsx-merge-props/index.js","../../lib":"node_modules/semantic-ui-vue/dist/commonjs/lib/index.js"}],"node_modules/semantic-ui-vue/dist/commonjs/elements/Segment/index.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Segment = require('./Segment');

Object.defineProperty(exports, 'Segment', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_Segment).default;
  }
});

var _Segments = require('./Segments');

Object.defineProperty(exports, 'Segments', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_Segments).default;
  }
});

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}
},{"./Segment":"node_modules/semantic-ui-vue/dist/commonjs/elements/Segment/Segment.js","./Segments":"node_modules/semantic-ui-vue/dist/commonjs/elements/Segment/Segments.js"}],"node_modules/semantic-ui-vue/dist/commonjs/elements/Step/StepDescription.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _babelHelperVueJsxMergeProps = require('babel-helper-vue-jsx-merge-props');

var _babelHelperVueJsxMergeProps2 = _interopRequireDefault(_babelHelperVueJsxMergeProps);

var _lib = require('../../lib');

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

exports.default = {
  name: 'SuiStepDescription',
  mixins: [_lib.SemanticUIVueMixin],
  render: function render() {
    var h = arguments[0];
    var ElementType = this.getElementType();
    return h(ElementType, (0, _babelHelperVueJsxMergeProps2.default)([this.getChildPropsAndListeners(), {
      'class': 'description'
    }]), [this.$slots.default]);
  },
  meta: {
    parent: 'SuiStep'
  }
};
},{"babel-helper-vue-jsx-merge-props":"node_modules/babel-helper-vue-jsx-merge-props/index.js","../../lib":"node_modules/semantic-ui-vue/dist/commonjs/lib/index.js"}],"node_modules/semantic-ui-vue/dist/commonjs/elements/Step/StepTitle.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _babelHelperVueJsxMergeProps = require('babel-helper-vue-jsx-merge-props');

var _babelHelperVueJsxMergeProps2 = _interopRequireDefault(_babelHelperVueJsxMergeProps);

var _lib = require('../../lib');

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

exports.default = {
  name: 'SuiStepTitle',
  mixins: [_lib.SemanticUIVueMixin],
  render: function render() {
    var h = arguments[0];
    var ElementType = this.getElementType();
    return h(ElementType, (0, _babelHelperVueJsxMergeProps2.default)([this.getChildPropsAndListeners(), {
      'class': 'title'
    }]), [this.$slots.default]);
  },
  meta: {
    parent: 'SuiStep'
  }
};
},{"babel-helper-vue-jsx-merge-props":"node_modules/babel-helper-vue-jsx-merge-props/index.js","../../lib":"node_modules/semantic-ui-vue/dist/commonjs/lib/index.js"}],"node_modules/semantic-ui-vue/dist/commonjs/elements/Step/StepContent.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _babelHelperVueJsxMergeProps = require('babel-helper-vue-jsx-merge-props');

var _babelHelperVueJsxMergeProps2 = _interopRequireDefault(_babelHelperVueJsxMergeProps);

var _lib = require('../../lib');

var _StepDescription = require('./StepDescription');

var _StepDescription2 = _interopRequireDefault(_StepDescription);

var _StepTitle = require('./StepTitle');

var _StepTitle2 = _interopRequireDefault(_StepTitle);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

exports.default = {
  name: 'SuiStepContent',
  components: {
    SuiStepDescription: _StepDescription2.default,
    SuiStepTitle: _StepTitle2.default
  },
  mixins: [_lib.SemanticUIVueMixin],
  props: {
    description: String,
    title: String
  },
  render: function render() {
    var h = arguments[0];
    var ElementType = this.getElementType();
    return h(ElementType, (0, _babelHelperVueJsxMergeProps2.default)([this.getChildPropsAndListeners(), {
      'class': 'content'
    }]), [this.title && h(_StepTitle2.default, null, [this.title]), this.description && h(_StepDescription2.default, null, [this.description]), this.$slots.default]);
  },
  meta: {
    parent: 'SuiStep'
  }
};
},{"babel-helper-vue-jsx-merge-props":"node_modules/babel-helper-vue-jsx-merge-props/index.js","../../lib":"node_modules/semantic-ui-vue/dist/commonjs/lib/index.js","./StepDescription":"node_modules/semantic-ui-vue/dist/commonjs/elements/Step/StepDescription.js","./StepTitle":"node_modules/semantic-ui-vue/dist/commonjs/elements/Step/StepTitle.js"}],"node_modules/semantic-ui-vue/dist/commonjs/elements/Step/Step.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _babelHelperVueJsxMergeProps = require('babel-helper-vue-jsx-merge-props');

var _babelHelperVueJsxMergeProps2 = _interopRequireDefault(_babelHelperVueJsxMergeProps);

var _lib = require('../../lib');

var _Icon = require('../Icon/Icon');

var _Icon2 = _interopRequireDefault(_Icon);

var _StepContent = require('./StepContent');

var _StepContent2 = _interopRequireDefault(_StepContent);

var _StepTitle = require('./StepTitle');

var _StepTitle2 = _interopRequireDefault(_StepTitle);

var _StepDescription = require('./StepDescription');

var _StepDescription2 = _interopRequireDefault(_StepDescription);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

exports.default = {
  name: 'SuiStep',
  components: {
    SuiIcon: _Icon2.default,
    SuiStepContent: _StepContent2.default,
    SuiStepTitle: _StepTitle2.default,
    SuiStepDescription: _StepDescription2.default
  },
  mixins: [_lib.SemanticUIVueMixin],
  props: {
    active: Boolean,
    completed: Boolean,
    description: String,
    disabled: Boolean,
    icon: String,
    title: String,
    link: Boolean
  },
  render: function render() {
    var h = arguments[0];
    var ElementType = this.getElementType();
    return h(ElementType, (0, _babelHelperVueJsxMergeProps2.default)([this.getChildPropsAndListeners(), {
      'class': this.classes('ui', this.active && 'active', this.completed && 'completed', this.disabled && 'disabled', this.link && 'link', 'step')
    }]), [this.icon && h(_Icon2.default, {
      attrs: {
        name: this.icon
      }
    }, []), this.title || this.description ? h(_StepContent2.default, null, [this.title && h(_StepTitle2.default, null, [this.title]), this.description && h(_StepDescription2.default, null, [this.description])]) : this.$slots.default]);
  }
};
},{"babel-helper-vue-jsx-merge-props":"node_modules/babel-helper-vue-jsx-merge-props/index.js","../../lib":"node_modules/semantic-ui-vue/dist/commonjs/lib/index.js","../Icon/Icon":"node_modules/semantic-ui-vue/dist/commonjs/elements/Icon/Icon.js","./StepContent":"node_modules/semantic-ui-vue/dist/commonjs/elements/Step/StepContent.js","./StepTitle":"node_modules/semantic-ui-vue/dist/commonjs/elements/Step/StepTitle.js","./StepDescription":"node_modules/semantic-ui-vue/dist/commonjs/elements/Step/StepDescription.js"}],"node_modules/semantic-ui-vue/dist/commonjs/elements/Step/StepGroup.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _babelHelperVueJsxMergeProps = require('babel-helper-vue-jsx-merge-props');

var _babelHelperVueJsxMergeProps2 = _interopRequireDefault(_babelHelperVueJsxMergeProps);

var _Step = require('./Step');

var _Step2 = _interopRequireDefault(_Step);

var _lib = require('../../lib');

var _PropTypes = require('../../lib/PropTypes');

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

exports.default = {
  name: 'SuiStepGroup',
  components: {
    SuiStep: _Step2.default
  },
  mixins: [_lib.SemanticUIVueMixin],
  props: {
    ordered: Boolean,
    steps: Array,
    vertical: Boolean,
    stackable: Boolean,
    unstackable: Boolean,
    fluid: Boolean,
    attached: _PropTypes.Enum.Attached({
      type: Boolean
    }),
    stepNumber: _PropTypes.Enum.Number({
      type: String,
      description: 'Defined number of steps'
    }),
    size: _PropTypes.Enum.Size({
      type: String
    })
  },
  render: function render() {
    var h = arguments[0];
    var ElementType = this.getElementType();
    return h(ElementType, (0, _babelHelperVueJsxMergeProps2.default)([this.getChildPropsAndListeners(), {
      'class': this.classes('ui', this.stepNumber && this.num(this.stepNumber), this.ordered && 'ordered', this.vertical && 'vertical', this.fluid && 'fluid', this.stackable && 'tablet stackable', this.unstackable && 'unstackable', this.attached, this.attached && 'attached', this.size, 'steps')
    }]), [this.steps ? this.steps.map(function (props) {
      return h(_Step2.default, {
        props: props
      }, []);
    }) : this.$slots.default]);
  },
  meta: {
    parent: 'SuiStep'
  }
};
},{"babel-helper-vue-jsx-merge-props":"node_modules/babel-helper-vue-jsx-merge-props/index.js","./Step":"node_modules/semantic-ui-vue/dist/commonjs/elements/Step/Step.js","../../lib":"node_modules/semantic-ui-vue/dist/commonjs/lib/index.js","../../lib/PropTypes":"node_modules/semantic-ui-vue/dist/commonjs/lib/PropTypes.js"}],"node_modules/semantic-ui-vue/dist/commonjs/elements/Step/index.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Step = require('./Step');

Object.defineProperty(exports, 'Step', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_Step).default;
  }
});

var _StepContent = require('./StepContent');

Object.defineProperty(exports, 'StepContent', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_StepContent).default;
  }
});

var _StepDescription = require('./StepDescription');

Object.defineProperty(exports, 'StepDescription', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_StepDescription).default;
  }
});

var _StepGroup = require('./StepGroup');

Object.defineProperty(exports, 'StepGroup', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_StepGroup).default;
  }
});

var _StepTitle = require('./StepTitle');

Object.defineProperty(exports, 'StepTitle', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_StepTitle).default;
  }
});

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}
},{"./Step":"node_modules/semantic-ui-vue/dist/commonjs/elements/Step/Step.js","./StepContent":"node_modules/semantic-ui-vue/dist/commonjs/elements/Step/StepContent.js","./StepDescription":"node_modules/semantic-ui-vue/dist/commonjs/elements/Step/StepDescription.js","./StepGroup":"node_modules/semantic-ui-vue/dist/commonjs/elements/Step/StepGroup.js","./StepTitle":"node_modules/semantic-ui-vue/dist/commonjs/elements/Step/StepTitle.js"}],"node_modules/semantic-ui-vue/dist/commonjs/elements/index.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Button = require('./Button');

Object.keys(_Button).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _Button[key];
    }
  });
});

var _Container = require('./Container');

Object.keys(_Container).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _Container[key];
    }
  });
});

var _Divider = require('./Divider');

Object.keys(_Divider).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _Divider[key];
    }
  });
});

var _Flag = require('./Flag');

Object.keys(_Flag).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _Flag[key];
    }
  });
});

var _Header = require('./Header');

Object.keys(_Header).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _Header[key];
    }
  });
});

var _Icon = require('./Icon');

Object.keys(_Icon).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _Icon[key];
    }
  });
});

var _Image = require('./Image');

Object.keys(_Image).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _Image[key];
    }
  });
});

var _Input = require('./Input');

Object.keys(_Input).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _Input[key];
    }
  });
});

var _Label = require('./Label');

Object.keys(_Label).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _Label[key];
    }
  });
});

var _List = require('./List');

Object.keys(_List).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _List[key];
    }
  });
});

var _Loader = require('./Loader');

Object.keys(_Loader).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _Loader[key];
    }
  });
});

var _Rail = require('./Rail');

Object.keys(_Rail).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _Rail[key];
    }
  });
});

var _Reveal = require('./Reveal');

Object.keys(_Reveal).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _Reveal[key];
    }
  });
});

var _Segment = require('./Segment');

Object.keys(_Segment).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _Segment[key];
    }
  });
});

var _Step = require('./Step');

Object.keys(_Step).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _Step[key];
    }
  });
});
},{"./Button":"node_modules/semantic-ui-vue/dist/commonjs/elements/Button/index.js","./Container":"node_modules/semantic-ui-vue/dist/commonjs/elements/Container/index.js","./Divider":"node_modules/semantic-ui-vue/dist/commonjs/elements/Divider/index.js","./Flag":"node_modules/semantic-ui-vue/dist/commonjs/elements/Flag/index.js","./Header":"node_modules/semantic-ui-vue/dist/commonjs/elements/Header/index.js","./Icon":"node_modules/semantic-ui-vue/dist/commonjs/elements/Icon/index.js","./Image":"node_modules/semantic-ui-vue/dist/commonjs/elements/Image/index.js","./Input":"node_modules/semantic-ui-vue/dist/commonjs/elements/Input/index.js","./Label":"node_modules/semantic-ui-vue/dist/commonjs/elements/Label/index.js","./List":"node_modules/semantic-ui-vue/dist/commonjs/elements/List/index.js","./Loader":"node_modules/semantic-ui-vue/dist/commonjs/elements/Loader/index.js","./Rail":"node_modules/semantic-ui-vue/dist/commonjs/elements/Rail/index.js","./Reveal":"node_modules/semantic-ui-vue/dist/commonjs/elements/Reveal/index.js","./Segment":"node_modules/semantic-ui-vue/dist/commonjs/elements/Segment/index.js","./Step":"node_modules/semantic-ui-vue/dist/commonjs/elements/Step/index.js"}],"node_modules/semantic-ui-vue/dist/commonjs/modules/Accordion/Accordion.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _babelHelperVueJsxMergeProps = require('babel-helper-vue-jsx-merge-props');

var _babelHelperVueJsxMergeProps2 = _interopRequireDefault(_babelHelperVueJsxMergeProps);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _extends3 = require('babel-runtime/helpers/extends');

var _extends4 = _interopRequireDefault(_extends3);

var _lib = require('../../lib');

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

exports.default = {
  name: 'SuiAccordion',
  mixins: [_lib.SemanticUIVueMixin],
  props: {
    activeIndex: [Number, Array],
    exclusive: Boolean,
    fluid: Boolean,
    inverted: Boolean,
    panels: Array,
    styled: Boolean
  },
  data: function data() {
    var active = void 0;

    if (this.exclusive) {
      if (Array.isArray(this.activeIndex)) {
        active = this.activeIndex[0];
      } else {
        active = this.activeIndex;
      }
    } else if (!Array.isArray(this.activeIndex)) {
      active = [this.activeIndex];
    } else {
      active = this.activeIndex;
    }

    return {
      active: active,
      panelElms: []
    };
  },
  methods: {
    register: function register(el) {
      var _this = this;

      var panelIndex = -1;
      var found = void 0;

      var walkChildren = function walkChildren(children) {
        children.some(function (child) {
          if (child.$options.name === 'SuiAccordion') return false;
          if (child.$options.name === 'SuiAccordionTitle') panelIndex += 1;

          if (child === el) {
            _this.panelElms[panelIndex] = (0, _extends4.default)({}, _this.panelElms[panelIndex] || {}, (0, _defineProperty3.default)({}, child.$options.name, child));
            found = true;
            return true;
          }

          walkChildren(child.$children);
          return found;
        });
      };

      walkChildren(this.$children);
    },
    toggleEl: function toggleEl(el) {
      var _this2 = this;

      this.panelElms.some(function (panel, index) {
        if (panel.SuiAccordionTitle === el || panel.SuiAccordionContent === el) {
          _this2.toggle(index);

          return true;
        }

        return false;
      });
    },
    toggle: function toggle(index) {
      if (this.exclusive) {
        if (this.active === index) this.active = null;else this.active = index;
      } else if (this.active.includes(index)) {
        this.active = this.active.filter(function (i) {
          return i !== index;
        });
      } else {
        this.active = this.active.concat([index]);
      }

      if (this.panelElms) this.toggleChildren();
    },
    toggleChildren: function toggleChildren() {
      var _this3 = this;

      this.panelElms.forEach(function (panel, i) {
        var active = _this3.isPanelActive(i);

        if (panel.SuiAccordionTitle) {
          panel.SuiAccordionTitle.setActive(active);
        }

        if (panel.SuiAccordionContent) {
          panel.SuiAccordionContent.setActive(active);
        }
      });
    },
    isPanelActive: function isPanelActive(index) {
      if (Array.isArray(this.active)) {
        return this.active.includes(index);
      }

      return this.active === index;
    }
  },
  render: function render() {
    var _this4 = this;

    var h = arguments[0];
    var ElementType = this.getElementType();
    return h(ElementType, (0, _babelHelperVueJsxMergeProps2.default)([this.getChildPropsAndListeners(), {
      'class': this.classes('ui', this.inverted && 'inverted', this.fluid && 'fluid', this.styled && 'styled', 'accordion')
    }]), [this.panels ? this.panels.map(function (_ref, index) {
      var title = _ref.title,
          content = _ref.content;
      return h('template', null, [h('div', {
        'class': _this4.classes('title', _this4.isPanelActive(index) && 'active'),
        on: {
          'click': function click() {
            return _this4.toggle(index);
          }
        }
      }, [title]), h('div', {
        'class': _this4.classes('content', _this4.isPanelActive(index) && 'active')
      }, [content])]);
    }) : this.$slots.default]);
  }
};
},{"babel-helper-vue-jsx-merge-props":"node_modules/babel-helper-vue-jsx-merge-props/index.js","babel-runtime/helpers/defineProperty":"node_modules/babel-runtime/helpers/defineProperty.js","babel-runtime/helpers/extends":"node_modules/babel-runtime/helpers/extends.js","../../lib":"node_modules/semantic-ui-vue/dist/commonjs/lib/index.js"}],"node_modules/semantic-ui-vue/dist/commonjs/modules/Accordion/mixin.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  props: {
    active: Boolean
  },
  data: function data() {
    return {
      dataActive: this.active,
      currentIndex: null,
      accordion: null
    };
  },
  methods: {
    setActive: function setActive(value) {
      this.dataActive = value;
    },
    toggle: function toggle() {
      this.accordion.toggleEl(this);
    }
  },
  mounted: function mounted() {
    var parent = this.$parent;

    while (parent && !this.accordion) {
      if (parent.$options.name === 'SuiAccordion') {
        this.accordion = parent;
      }

      parent = parent.$parent;
    }

    if (!this.accordion) {
      throw new Error(this.$options.name + ' must be place as a child of a SuiAccordion');
    }

    this.accordion.register(this);
  },
  watch: {
    active: function active(value) {
      this.dataActive = value;
    }
  },
  meta: {
    parent: 'SuiAccordion'
  }
};
},{}],"node_modules/semantic-ui-vue/dist/commonjs/modules/Accordion/AccordionContent.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _babelHelperVueJsxMergeProps = require('babel-helper-vue-jsx-merge-props');

var _babelHelperVueJsxMergeProps2 = _interopRequireDefault(_babelHelperVueJsxMergeProps);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _lib = require('../../lib');

var _mixin = require('./mixin');

var _mixin2 = _interopRequireDefault(_mixin);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

exports.default = (0, _extends3.default)({
  name: 'SuiAccordionContent',
  mixins: [_lib.SemanticUIVueMixin]
}, _mixin2.default, {
  render: function render() {
    var h = arguments[0];
    var ElementType = this.getElementType();
    return h(ElementType, (0, _babelHelperVueJsxMergeProps2.default)([this.getChildPropsAndListeners(), {
      'class': this.classes('content', this.dataActive && 'active')
    }]), [this.$slots.default]);
  }
});
},{"babel-helper-vue-jsx-merge-props":"node_modules/babel-helper-vue-jsx-merge-props/index.js","babel-runtime/helpers/extends":"node_modules/babel-runtime/helpers/extends.js","../../lib":"node_modules/semantic-ui-vue/dist/commonjs/lib/index.js","./mixin":"node_modules/semantic-ui-vue/dist/commonjs/modules/Accordion/mixin.js"}],"node_modules/semantic-ui-vue/dist/commonjs/modules/Accordion/AccordionTitle.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _babelHelperVueJsxMergeProps = require('babel-helper-vue-jsx-merge-props');

var _babelHelperVueJsxMergeProps2 = _interopRequireDefault(_babelHelperVueJsxMergeProps);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _lib = require('../../lib');

var _mixin = require('./mixin');

var _mixin2 = _interopRequireDefault(_mixin);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

exports.default = (0, _extends3.default)({
  name: 'SuiAccordionTitle',
  mixins: [_lib.SemanticUIVueMixin]
}, _mixin2.default, {
  render: function render() {
    var h = arguments[0];
    var ElementType = this.getElementType();
    return h(ElementType, (0, _babelHelperVueJsxMergeProps2.default)([this.getChildPropsAndListeners(), {
      'class': this.classes('title', this.dataActive && 'active'),
      on: {
        'click': this.toggle
      }
    }]), [this.$slots.default]);
  }
});
},{"babel-helper-vue-jsx-merge-props":"node_modules/babel-helper-vue-jsx-merge-props/index.js","babel-runtime/helpers/extends":"node_modules/babel-runtime/helpers/extends.js","../../lib":"node_modules/semantic-ui-vue/dist/commonjs/lib/index.js","./mixin":"node_modules/semantic-ui-vue/dist/commonjs/modules/Accordion/mixin.js"}],"node_modules/semantic-ui-vue/dist/commonjs/modules/Accordion/index.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Accordion = require('./Accordion');

Object.defineProperty(exports, 'Accordion', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_Accordion).default;
  }
});

var _AccordionContent = require('./AccordionContent');

Object.defineProperty(exports, 'AccordionContent', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_AccordionContent).default;
  }
});

var _AccordionTitle = require('./AccordionTitle');

Object.defineProperty(exports, 'AccordionTitle', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_AccordionTitle).default;
  }
});

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}
},{"./Accordion":"node_modules/semantic-ui-vue/dist/commonjs/modules/Accordion/Accordion.js","./AccordionContent":"node_modules/semantic-ui-vue/dist/commonjs/modules/Accordion/AccordionContent.js","./AccordionTitle":"node_modules/semantic-ui-vue/dist/commonjs/modules/Accordion/AccordionTitle.js"}],"node_modules/semantic-ui-vue/dist/commonjs/modules/Checkbox/Checkbox.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _babelHelperVueJsxMergeProps = require('babel-helper-vue-jsx-merge-props');

var _babelHelperVueJsxMergeProps2 = _interopRequireDefault(_babelHelperVueJsxMergeProps);

var _lib = require('../../lib');

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

exports.default = {
  name: 'SuiCheckbox',
  model: {
    prop: 'inputValue',
    event: 'change'
  },
  mixins: [_lib.SemanticUIVueMixin],
  props: {
    disabled: Boolean,
    inputValue: [Array, Boolean, Number, String, Object],
    label: String,
    radio: Boolean,
    toggle: Boolean,
    name: String,
    value: [String, Object],
    required: Boolean
  },
  events: {
    change: {
      custom: true
    }
  },
  computed: {
    isArray: function isArray() {
      return Array.isArray(this.inputValue);
    },
    isChecked: function isChecked() {
      if (this.radio && this.value) {
        return this.inputValue === this.value;
      }

      if (this.isArray) {
        return this.inputValue.includes(this.value);
      }

      return !!this.inputValue;
    }
  },
  methods: {
    setValue: function setValue(e) {
      var _this = this;

      var checked = e.target.checked;

      if (this.radio && this.value) {
        this.$emit('change', this.value);
      } else if (this.isArray) {
        if (checked) {
          this.$emit('change', this.inputValue.concat([this.value]));
        } else {
          this.$emit('change', this.inputValue.filter(function (v) {
            return v !== _this.value;
          }));
        }
      } else {
        this.$emit('change', checked);
      }
    }
  },
  render: function render() {
    var _this2 = this;

    var h = arguments[0];
    var ElementType = this.getElementType();
    return h(ElementType, (0, _babelHelperVueJsxMergeProps2.default)([this.getChildPropsAndListeners(), {
      'class': this.classes('ui', !(this.label || this.$slots.default) && 'fitted', this.radio && 'radio', this.toggle && 'toggle', this.disabled && 'disabled', 'checkbox')
    }]), [h('input', {
      ref: 'input',
      'class': 'hidden',
      attrs: {
        readonly: '',
        tabindex: '0',
        name: this.name,
        type: this.radio ? 'radio' : 'checkbox',
        disabled: this.disabled,
        required: this.required
      },
      domProps: {
        'checked': this.isChecked
      },
      on: {
        'change': this.setValue
      }
    }, []), h('label', {
      on: {
        'click': function click() {
          return _this2.$refs.input.click();
        }
      },
      attrs: {
        'for': this.name
      }
    }, [this.label || this.$slots.default])]);
  }
};
},{"babel-helper-vue-jsx-merge-props":"node_modules/babel-helper-vue-jsx-merge-props/index.js","../../lib":"node_modules/semantic-ui-vue/dist/commonjs/lib/index.js"}],"node_modules/semantic-ui-vue/dist/commonjs/modules/Checkbox/index.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Checkbox = require('./Checkbox');

Object.defineProperty(exports, 'Checkbox', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_Checkbox).default;
  }
});

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}
},{"./Checkbox":"node_modules/semantic-ui-vue/dist/commonjs/modules/Checkbox/Checkbox.js"}],"node_modules/semantic-ui-vue/dist/commonjs/modules/Dimmer/Dimmer.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _babelHelperVueJsxMergeProps = require('babel-helper-vue-jsx-merge-props');

var _babelHelperVueJsxMergeProps2 = _interopRequireDefault(_babelHelperVueJsxMergeProps);

var _lib = require('../../lib');

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

exports.default = {
  name: 'SuiDimmer',
  mixins: [_lib.SemanticUIVueMixin],
  props: {
    active: Boolean,
    inverted: Boolean
  },
  render: function render() {
    var h = arguments[0];
    var ElementType = this.getElementType();
    return h(ElementType, (0, _babelHelperVueJsxMergeProps2.default)([this.getChildPropsAndListeners(), {
      'class': this.classes('ui', this.active && 'active', this.inverted && 'inverted', 'dimmer')
    }]), [h('div', {
      'class': 'content'
    }, [h('div', {
      'class': 'center'
    }, [this.$slots.default])])]);
  }
};
},{"babel-helper-vue-jsx-merge-props":"node_modules/babel-helper-vue-jsx-merge-props/index.js","../../lib":"node_modules/semantic-ui-vue/dist/commonjs/lib/index.js"}],"node_modules/semantic-ui-vue/dist/commonjs/modules/Dimmer/DimmerDimmable.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _babelHelperVueJsxMergeProps = require('babel-helper-vue-jsx-merge-props');

var _babelHelperVueJsxMergeProps2 = _interopRequireDefault(_babelHelperVueJsxMergeProps);

var _lib = require('../../lib');

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

exports.default = {
  name: 'SuiDimmerDimmable',
  mixins: [_lib.SemanticUIVueMixin],
  props: {},
  render: function render() {
    var h = arguments[0];
    var ElementType = this.getElementType();
    return h(ElementType, (0, _babelHelperVueJsxMergeProps2.default)([this.getChildPropsAndListeners(), {
      'class': this.classes('dimmable')
    }]), [this.$slots.default]);
  },
  meta: {
    parent: 'SuiDimmer'
  }
};
},{"babel-helper-vue-jsx-merge-props":"node_modules/babel-helper-vue-jsx-merge-props/index.js","../../lib":"node_modules/semantic-ui-vue/dist/commonjs/lib/index.js"}],"node_modules/semantic-ui-vue/dist/commonjs/modules/Dimmer/index.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Dimmer = require('./Dimmer');

Object.defineProperty(exports, 'Dimmer', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_Dimmer).default;
  }
});

var _DimmerDimmable = require('./DimmerDimmable');

Object.defineProperty(exports, 'DimmerDimmable', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_DimmerDimmable).default;
  }
});

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}
},{"./Dimmer":"node_modules/semantic-ui-vue/dist/commonjs/modules/Dimmer/Dimmer.js","./DimmerDimmable":"node_modules/semantic-ui-vue/dist/commonjs/modules/Dimmer/DimmerDimmable.js"}],"node_modules/lodash/escapeRegExp.js":[function(require,module,exports) {
var toString = require('./toString');

/**
 * Used to match `RegExp`
 * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
 */
var reRegExpChar = /[\\^$.*+?()[\]{}|]/g,
    reHasRegExpChar = RegExp(reRegExpChar.source);

/**
 * Escapes the `RegExp` special characters "^", "$", "\", ".", "*", "+",
 * "?", "(", ")", "[", "]", "{", "}", and "|" in `string`.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category String
 * @param {string} [string=''] The string to escape.
 * @returns {string} Returns the escaped string.
 * @example
 *
 * _.escapeRegExp('[lodash](https://lodash.com/)');
 * // => '\[lodash\]\(https://lodash\.com/\)'
 */
function escapeRegExp(string) {
  string = toString(string);
  return (string && reHasRegExpChar.test(string))
    ? string.replace(reRegExpChar, '\\$&')
    : string;
}

module.exports = escapeRegExp;

},{"./toString":"node_modules/lodash/toString.js"}],"node_modules/semantic-ui-vue/dist/commonjs/modules/Dropdown/DropdownItem.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _babelHelperVueJsxMergeProps = require('babel-helper-vue-jsx-merge-props');

var _babelHelperVueJsxMergeProps2 = _interopRequireDefault(_babelHelperVueJsxMergeProps);

var _lib = require('../../lib');

var _Flag = require('../../elements/Flag/Flag');

var _Flag2 = _interopRequireDefault(_Flag);

var _Image = require('../../elements/Image/Image');

var _Image2 = _interopRequireDefault(_Image);

var _Icon = require('../../elements/Icon/Icon');

var _Icon2 = _interopRequireDefault(_Icon);

var _Label = require('../../elements/Label/Label');

var _Label2 = _interopRequireDefault(_Label);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

exports.default = {
  name: 'SuiDropdownItem',
  mixins: [_lib.SemanticUIVueMixin],
  props: {
    flag: {
      type: String,
      description: 'Shorthand for sui-flag.'
    },
    image: {
      type: Object,
      description: 'Shorthand for sui-image.'
    },
    icon: {
      type: String,
      description: 'Shorthand for sui-icon.'
    },
    label: {
      type: Object,
      description: 'Shorthand for sui-label'
    },
    text: {
      type: String,
      description: 'Display text.'
    },
    value: {
      type: null,
      description: 'Stored value.'
    },
    active: {
      type: Boolean,
      default: false,
      description: 'Style as the currently chosen item.'
    },
    selected: {
      type: Boolean,
      default: false,
      description: 'Is item selected'
    },
    disabled: {
      type: Boolean,
      default: false,
      description: 'A dropdown item can be disabled.'
    }
  },
  events: {
    select: {
      custom: true
    }
  },
  methods: {
    select: function select() {
      this.$emit('select', this.value);
    }
  },
  render: function render() {
    var h = arguments[0];
    var ElementType = this.getElementType();
    return h(ElementType, (0, _babelHelperVueJsxMergeProps2.default)([this.getChildPropsAndListeners(), {
      attrs: {
        role: 'option'
      },
      'class': this.classes(this.disabled && 'disabled', this.active && 'active', this.selected && 'selected', 'item'),
      on: {
        'click': this.select
      }
    }]), [this.icon && h(_Icon2.default, {
      attrs: {
        name: this.icon
      }
    }, []), this.image && h(_Image2.default, {
      props: this.image
    }, []), this.flag && h(_Flag2.default, {
      attrs: {
        name: this.flag
      }
    }, []), this.label && h(_Label2.default, {
      props: this.label
    }, []), this.text || this.$slots.default]);
  },
  meta: {
    parent: 'SuiDropdown'
  }
};
},{"babel-helper-vue-jsx-merge-props":"node_modules/babel-helper-vue-jsx-merge-props/index.js","../../lib":"node_modules/semantic-ui-vue/dist/commonjs/lib/index.js","../../elements/Flag/Flag":"node_modules/semantic-ui-vue/dist/commonjs/elements/Flag/Flag.js","../../elements/Image/Image":"node_modules/semantic-ui-vue/dist/commonjs/elements/Image/Image.js","../../elements/Icon/Icon":"node_modules/semantic-ui-vue/dist/commonjs/elements/Icon/Icon.js","../../elements/Label/Label":"node_modules/semantic-ui-vue/dist/commonjs/elements/Label/Label.js"}],"node_modules/semantic-ui-vue/dist/commonjs/modules/Dropdown/DropdownMenu.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _babelHelperVueJsxMergeProps = require('babel-helper-vue-jsx-merge-props');

var _babelHelperVueJsxMergeProps2 = _interopRequireDefault(_babelHelperVueJsxMergeProps);

var _lib = require('../../lib');

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

var visualStates = {
  closed: 'closed',
  opening: 'opening',
  open: 'open',
  closing: 'closing'
};
exports.default = {
  name: 'SuiDropdownMenu',
  mixins: [_lib.SemanticUIVueMixin],
  data: function data() {
    return {
      open: false,
      visualState: visualStates.closed
    };
  },
  computed: {
    animation: function animation() {
      var animation = this.$parent.animation;

      switch (this.visualState) {
        case visualStates.opening:
          return 'animating ' + animation + ' in visible';

        case visualStates.closing:
          return 'animating ' + animation + ' out visible';

        default:
          return '';
      }
    }
  },
  watch: {
    open: function open(newValue) {
      this.visualState = newValue ? visualStates.opening : visualStates.closing;
    }
  },
  mounted: function mounted() {
    var parent = this.$parent;

    while (parent && !this.accordion) {
      if (/^SuiDropdown(WithRequired)?$/.test(parent.$options.name)) {
        this.dropdown = parent;
      }

      parent = parent.$parent;
    }

    if (!this.dropdown) {
      throw new Error('SuiDropdownMenu must be place as a child of a SuiDropdown');
    }

    this.dropdown.register(this);
    this.$el.addEventListener((0, _lib.getEventAnimationEnd)(), this.onAnimationEnded, false);
  },
  methods: {
    onAnimationEnded: function onAnimationEnded() {
      this.visualState = this.open ? visualStates.open : visualStates.closed;
    },
    setOpen: function setOpen(open) {
      this.open = open;
    }
  },
  render: function render() {
    var h = arguments[0];
    var ElementType = this.getElementType();
    return h(ElementType, (0, _babelHelperVueJsxMergeProps2.default)([{
      attrs: {
        tabindex: '-1'
      }
    }, this.getChildPropsAndListeners(), {
      'class': this.classes('menu', this.open && 'visible active', 'transition', this.animation)
    }]), [this.$slots.default]);
  },
  meta: {
    parent: 'SuiDropdown'
  }
};
},{"babel-helper-vue-jsx-merge-props":"node_modules/babel-helper-vue-jsx-merge-props/index.js","../../lib":"node_modules/semantic-ui-vue/dist/commonjs/lib/index.js"}],"node_modules/semantic-ui-vue/dist/commonjs/modules/Dropdown/Dropdown.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _babelHelperVueJsxMergeProps = require('babel-helper-vue-jsx-merge-props');

var _babelHelperVueJsxMergeProps2 = _interopRequireDefault(_babelHelperVueJsxMergeProps);

var _escapeRegExp = require('lodash/escapeRegExp');

var _escapeRegExp2 = _interopRequireDefault(_escapeRegExp);

var _lib = require('../../lib');

var _PropTypes = require('../../lib/PropTypes');

var _Icon = require('../../elements/Icon/Icon');

var _Icon2 = _interopRequireDefault(_Icon);

var _Input = require('../../elements/Input/Input');

var _Input2 = _interopRequireDefault(_Input);

var _Divider = require('../../elements/Divider/Divider');

var _Divider2 = _interopRequireDefault(_Divider);

var _Label = require('../../elements/Label/Label');

var _Label2 = _interopRequireDefault(_Label);

var _DropdownItem = require('./DropdownItem');

var _DropdownItem2 = _interopRequireDefault(_DropdownItem);

var _DropdownMenu = require('./DropdownMenu');

var _DropdownMenu2 = _interopRequireDefault(_DropdownMenu);

var _Flag = require('../../elements/Flag/Flag');

var _Flag2 = _interopRequireDefault(_Flag);

var _Image = require('../../elements/Image/Image');

var _Image2 = _interopRequireDefault(_Image);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

var directions = {
  auto: 'auto',
  autoUpward: 'auto-upward',
  upward: 'upward',
  downward: 'downward'
};
var animations = {
  name: 'slide',
  down: 'down',
  up: 'up'
};

function getOffset(el) {
  var rect = el.getBoundingClientRect();
  var scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
  var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  return {
    top: rect.top + scrollTop,
    left: rect.left + scrollLeft
  };
}

exports.default = {
  name: 'SuiDropdown',
  mixins: [_lib.SemanticUIVueMixin],
  props: {
    allowAdditions: {
      type: Boolean,
      description: 'A dropdown can allow user additions.'
    },
    button: {
      type: Boolean,
      description: 'A dropdown button style.'
    },
    icon: {
      type: String,
      description: 'Change default button to other button.'
    },
    item: {
      type: Boolean,
      description: 'A dropdown can be formatted as a Menu item.'
    },
    floating: {
      type: Boolean,
      description: 'A dropdown menu can appear to be floating below an element.'
    },
    fluid: {
      type: Boolean,
      description: 'A dropdown can take the full width of its parent.'
    },
    labeled: {
      type: Boolean,
      description: 'A dropdown can be labeled.'
    },
    multiple: {
      type: Boolean,
      description: 'A selection dropdown can allow multiple selections.'
    },
    loading: {
      type: Boolean,
      description: 'A dropdown can show that it is currently loading data.'
    },
    maxSelections: {
      type: Number,
      default: Infinity,
      description: 'Maximum possible selections when using multiple selection'
    },
    options: {
      type: Array,
      default: function _default() {
        return [];
      },
      description: "Array of SuiDropdownItem props e.g. `{ text: '', value: '' }`"
    },
    placeholder: {
      type: String,
      description: 'Placeholder text.'
    },
    pointing: {
      type: String,
      description: 'A dropdown can be formatted so that its menu is pointing.'
    },
    search: {
      type: Boolean,
      description: 'A dropdown can have a search field to filter options.'
    },
    searchInMenu: {
      type: Object,
      description: 'A dropdown can have a search input in dropdown menu. Should be passed an Object with SuiInput props.'
    },
    selection: {
      type: Boolean,
      description: 'A dropdown can be used to select between choices in a form.'
    },
    text: {
      type: String,
      description: 'Text of dropdown'
    },
    value: {
      type: [Array, String, Number],
      description: 'Value of the dropdown.'
    },
    direction: (0, _PropTypes.Enum)(Object.values(directions), {
      default: directions.auto,
      description: 'A dropdown can have a direction to open'
    }),
    openOnFocus: {
      type: Boolean,
      default: true,
      description: 'Whether or not the menu should open when the dropdown is focused.'
    },
    closeOnBlur: {
      type: Boolean,
      default: true,
      description: 'Whether or not the menu should close when the dropdown is blurred.'
    },
    noResultsMessage: {
      type: String,
      default: 'No results found',
      description: 'Message to display when there are no results.'
    },
    maxSelectionsMessage: {
      type: String,
      default: 'Max {selections} selections',
      description: 'Message to display when the maximum amount of selections is reached.'
    }
  },
  events: {
    input: {
      custom: true
    }
  },
  data: function data() {
    return {
      filter: '',
      menu: null,
      open: false,
      menuDirection: null,
      focused: false,
      isMouseDown: false,
      selectedIndex: -1
    };
  },
  computed: {
    maximumValuesSelected: function maximumValuesSelected() {
      return this.multipleValue.length >= this.maxSelections;
    },
    downward: function downward() {
      if (this.direction !== directions.auto && this.direction !== directions.autoUpward) {
        return this.direction === directions.downward;
      }

      this.calculateMenuDirection();

      if (this.menuDirection === null) {
        return true;
      }

      if (this.menuDirection.below && this.menuDirection.above || !this.menuDirection.below && !this.menuDirection.above) {
        // Dropdown can or cannot fit in either direction favoring specified
        return this.direction === directions.auto;
      } else if (this.menuDirection.below) {
        // Dropdown can fit in context downward
        return true;
      } // Dropdown cannot fit below, opening upward


      return false;
    },
    animation: function animation() {
      return animations.name + ' ' + (this.downward ? animations.down : animations.up);
    },
    filteredOptions: function filteredOptions() {
      var _this = this;

      if (!this.search && !this.multiple && !this.searchInMenu) {
        return this.options;
      }

      var re = new RegExp((0, _escapeRegExp2.default)(this.filter), 'i');
      return this.options.filter(function (option) {
        if (_this.filter && !re.test(option.text)) {
          return false;
        }

        if (_this.multiple && (_this.maximumValuesSelected || _this.multipleValue.indexOf(option.value) > -1)) {
          return false;
        }

        return true;
      });
    },
    message: function message() {
      if (this.filteredOptions.length === 0) {
        if (this.multiple) {
          if (this.maximumValuesSelected) {
            return this.maxSelectionsMessage.replace('{selections}', this.maxSelections);
          }
        }

        if (this.filter && !this.allowAdditions) {
          return this.noResultsMessage;
        }
      }

      return '';
    },
    menuNode: function menuNode() {
      var _this2 = this;

      var h = this.$createElement;
      return h(_DropdownMenu2.default, null, [[this.searchInMenu && [h(_Input2.default, (0, _babelHelperVueJsxMergeProps2.default)([{
        props: this.searchInMenu,
        ref: 'searchInMenu'
      }, {
        on: {
          'input': this.updateFilter,
          'keydown': this.handleSearchKeyDown
        },
        attrs: {
          value: this.filter
        }
      }]), []), h(_Divider2.default, null, [])], this.message ? h('div', {
        'class': 'message'
      }, [this.message]) : this.filteredOptions.map(function (option, index) {
        return h(_DropdownItem2.default, (0, _babelHelperVueJsxMergeProps2.default)([{
          props: option
        }, {
          attrs: {
            active: _this2.multiple ? _this2.multipleValue.indexOf(option.value) !== -1 : _this2.value === option.value,
            selected: _this2.selectedIndex === index
          },
          on: {
            'select': _this2.selectItem
          }
        }]), []);
      })]]);
    },
    multipleValue: function multipleValue() {
      return Array.isArray(this.value) ? this.value : [];
    },
    searchNode: function searchNode() {
      var h = this.$createElement;
      return this.search && h('input', {
        attrs: {
          type: 'text',
          'aria-autocomplete': 'list',
          autoComplete: 'off',
          tabindex: '0'
        },
        'class': 'search',
        on: {
          'input': this.updateFilter,
          'keydown': this.handleSearchKeyDown
        },
        ref: 'search',
        domProps: {
          'value': this.filter
        }
      }, []);
    },
    selectedNodes: function selectedNodes() {
      var _this3 = this;

      var h = this.$createElement;

      if (!this.multiple) {
        return null;
      }

      return this.multipleValue.map(function (value) {
        var existingOption = _this3.findOption(value);

        var option = _this3.allowAdditions && !existingOption ? {
          text: value
        } : existingOption;
        return h(_Label2.default, {
          nativeOn: {
            'click': _this3.handleClickOnSelectedNode
          }
        }, [option.icon && h(_Icon2.default, {
          attrs: {
            name: option.icon
          }
        }, []), option.image && h(_Image2.default, {
          props: option.image
        }, []), option.flag && h(_Flag2.default, {
          attrs: {
            name: option.flag
          }
        }, []), option.text, h(_Icon2.default, {
          attrs: {
            name: 'delete'
          },
          nativeOn: {
            'click': function click() {
              return _this3.deselectItem(value);
            }
          }
        }, [])]);
      });
    },
    textNode: function textNode() {
      var h = this.$createElement;
      var defaultText = this.text || this.placeholder;
      var shouldHideText = this.multiple && this.value && this.value.length || !this.multiple && [null, undefined].indexOf(this.value) === -1;
      var shouldShowSelectedItem = !this.multiple && this.open && typeof this.filteredOptions[this.selectedIndex] !== 'undefined' && this.filteredOptions[this.selectedIndex].value === this.value;
      var text = shouldHideText ? this.findOption(this.value) : defaultText;

      if (!text) {
        return null;
      }

      var className = this.classes(this.placeholder && !shouldHideText && 'default', !this.searchInMenu && this.filter && !shouldShowSelectedItem && 'filtered', 'text');
      var value = (typeof text === 'undefined' ? 'undefined' : (0, _typeof3.default)(text)) === 'object' ? text : {
        text: text
      };
      return h('div', {
        ref: 'text',
        'class': className,
        attrs: {
          role: 'alert',
          'aria-live': 'polite'
        }
      }, [value.icon && h(_Icon2.default, {
        attrs: {
          name: value.icon
        }
      }, []), value.image && h(_Image2.default, {
        props: value.image
      }, []), value.flag && h(_Flag2.default, {
        attrs: {
          name: value.flag
        }
      }, []), value.label && h(_Label2.default, {
        props: value.label
      }, []), value.text]);
    }
  },
  watch: {
    filteredOptions: function filteredOptions() {
      this.updateSelectedIndex();
    },
    filter: function filter() {
      if (this.search) {
        this.resizeInput();
      }
    }
  },
  mounted: function mounted() {
    document.body.addEventListener('click', this.closeMenu);
  },
  destroyed: function destroyed() {
    document.body.removeEventListener('click', this.closeMenu);
  },
  methods: {
    setOpen: function setOpen() {
      var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
      this.open = value;

      if (this.search && this.filteredOptions.length >= 0) {
        this.selectedIndex = 0;
      }

      if (this.menu) {
        this.menu.setOpen(value);
      }
    },
    closeMenu: function closeMenu() {
      if (!this.closeOnBlur) return;
      this.setOpen(false);
    },
    deselectItem: function deselectItem(selectedValue) {
      this.$emit('input', this.multipleValue.filter(function (value) {
        return value !== selectedValue;
      }));
    },
    findOption: function findOption(value) {
      return this.options.find(function (option) {
        return option.value === value;
      });
    },
    handleMouseDown: function handleMouseDown() {
      var _this4 = this;

      this.isMouseDown = true;
      document.body.addEventListener('mouseup', function () {
        _this4.isMouseDown = false;
      }, {
        capture: true,
        once: true
      });
    },
    handleClick: function handleClick(e) {
      var _this5 = this;

      e.stopPropagation();

      if (this.open) {
        if (this.search && e.target === this.$refs.search) return;
        var path = e.path || e.composedPath && e.composedPath();

        if (!path) {
          this.addEventPath();
        }

        if (this.searchInMenu && e.target === this.$refs.searchInMenu.$refs.input) return;

        if (this.multiple && path.indexOf(this.menu.$el) !== -1) {
          this.$nextTick(function () {
            return _this5.focusSearch();
          });
          return;
        }
      }

      this.focusSearch();
      this.setOpen(!this.open);
    },
    addEventPath: function addEventPath() {
      if (!('path' in Event.prototype)) {
        Object.defineProperty(Event.prototype, 'path', {
          get: function get() {
            var path = [];
            var currentElem = this.target;

            while (currentElem) {
              path.push(currentElem);
              currentElem = currentElem.parentElement;
            }

            if (path.indexOf(window) === -1 && path.indexOf(document) === -1) {
              path.push(document);
            }

            if (path.indexOf(window) === -1) {
              path.push(window);
            }

            return path;
          }
        });
      }
    },
    handleFocus: function handleFocus() {
      if (this.focused) return;
      this.focused = true;

      if (!this.isMouseDown && this.openOnFocus) {
        this.setOpen(true);
      }
    },
    handleBlur: function handleBlur(e) {
      if (this.isMouseDown || e.relatedTarget === this.$refs.search) {
        return;
      }

      this.focused = false;

      if (this.open && this.closeOnBlur) {
        this.setOpen(false);
      }
    },
    handleClickOnSelectedNode: function handleClickOnSelectedNode(e) {
      e.stopPropagation();
    },
    toggleFilteredText: function toggleFilteredText(filteredText, filter) {
      if (!this.searchInMenu && !this.multiple && !filteredText.classList.contains('filtered') && filter.trim() !== '') {
        filteredText.classList.add('filtered');
      }

      if (!this.multiple && filter.trim() === '') filteredText.classList.remove('filtered');
    },
    handleKeyDown: function handleKeyDown(e) {
      if (this.$refs.text) {
        this.toggleFilteredText(this.$refs.text, this.filter);
      }

      var KEYS = {
        ENTER: 13,
        ESCAPE: 27,
        UP_ARROW: 38,
        DOWN_ARROW: 40
      };

      if (!this.open) {
        if (e.keyCode !== KEYS.ENTER) {
          this.setOpen(true);
          e.preventDefault();
        }

        return;
      }

      var direction = 1;

      switch (e.keyCode) {
        case KEYS.ENTER:
          {
            var filter = this.filter;
            if (!this.multiple && this.selectedIndex !== -1) this.filter = '';

            if (this.allowAdditions && this.selectedIndex === -1 && filter.trim() !== '') {
              e.preventDefault();
              this.selectItem(filter);
            } else if (this.selection || this.searchInMenu || this.search) {
              if (this.selectedIndex === -1) return;
              e.preventDefault();

              if (!this.multiple) {
                this.setOpen(false);
                this.$refs.text.classList.remove('filtered');
              } else {
                this.selectItem(this.filteredOptions[this.selectedIndex].value);
              }
            }

            return;
          }

        case KEYS.ESCAPE:
          if (this.open) this.setOpen(false);
          return;

        case KEYS.UP_ARROW:
          direction = -1;
          break;

        case KEYS.DOWN_ARROW:
          break;

        default:
          return;
      }

      e.preventDefault();
      if (this.filteredOptions.length === 0) return;
      var newValue = this.selectedIndex + direction;

      if (this.filteredOptions.length <= newValue) {
        this.selectedIndex = 0;
      } else if (newValue < 0) {
        this.selectedIndex = this.filteredOptions.length - 1;
      } else {
        this.selectedIndex = newValue;
      }

      if ((this.selection || this.searchInMenu || this.search) && !this.multiple) {
        this.$emit('input', this.filteredOptions[this.selectedIndex].value);
      }
    },
    register: function register(menu) {
      this.menu = menu;
    },
    selectItem: function selectItem(selectedValue) {
      if (this.multiple && this.maximumValuesSelected) return;
      var newValue = this.multiple ? this.multipleValue.filter(function (value) {
        return value !== selectedValue;
      }).concat(selectedValue) : selectedValue;
      this.$emit('input', newValue);
      this.filter = '';

      if (!this.multiple) {
        this.$nextTick(this.updateSelectedIndex);
      }
    },
    updateSelectedIndex: function updateSelectedIndex() {
      var _this6 = this;

      if (this.multiple) {
        this.selectedIndex = this.filteredOptions.length > this.selectedIndex ? this.selectedIndex : this.selectedIndex - 1;
      } else {
        this.selectedIndex = this.filteredOptions.findIndex(function (item) {
          return item.value === _this6.value;
        });
      }
    },
    resizeInput: function resizeInput() {
      var sizer = this.$refs.sizer;
      sizer.innerText = this.filter;
      var width = sizer.offsetWidth;
      sizer.style.display = '';
      sizer.style.padding = '';
      this.$refs.search.style.minWidth = Math.ceil(width + 1) + 'px';
    },
    updateFilter: function updateFilter(event) {
      this.filter = typeof event === 'string' ? event : event.target.value;
    },
    focusSearch: function focusSearch() {
      if (this.search) this.$refs.search.focus();
    },
    handleSearchKeyDown: function handleSearchKeyDown(e) {
      if (!this.multiple || e.keyCode !== 8 || this.filter !== '') return;
      this.multipleValue.pop();
      this.$emit('input', this.multipleValue);
    },
    calculateMenuDirection: function calculateMenuDirection() {
      if (typeof window === 'undefined' || !this.menu || !this.menu.$el || !this.open) return;
      this.menu.$el.classList.add('loading');
      this.$el.classList.remove('upward');
      var c = {
        context: {
          offset: {
            top: 0,
            left: 0
          },
          scrollTop: document.body.scrollTop,
          height: document.body.offsetHeight
        },
        menu: {
          offset: getOffset(this.menu.$el),
          height: this.menu.$el.offsetHeight
        }
      };
      this.menu.$el.classList.remove('loading');
      this.menuDirection = {
        above: c.menu.offset.top - c.menu.height - this.$el.clientHeight >= 0,
        below: c.menu.offset.top + c.menu.height < c.context.height
      };
    }
  },
  render: function render() {
    var h = arguments[0];
    var ElementType = this.getElementType(this.button ? 'button' : 'div');
    var eventHandlers = {
      '!mousedown': this.handleMouseDown,
      click: this.handleClick,
      '!focus': this.handleFocus,
      '!blur': this.handleBlur,
      '!keydown': this.handleKeyDown
    };
    return h(ElementType, (0, _babelHelperVueJsxMergeProps2.default)([{
      attrs: {
        role: 'listbox',
        'aria-expanded': this.open,
        tabindex: '0'
      }
    }, this.getChildPropsAndListeners(), {
      'class': this.classes('ui', this.button && 'button', this.item && 'item', this.floating && 'floating', this.fluid && 'fluid', this.pointing && 'pointing ' + this.pointing, this.loading && 'loading', this.labeled && 'labeled', this.multiple && 'multiple', this.selection && 'selection', this.search && 'search', this.open && 'active visible', !this.downward && directions.upward, 'dropdown')
    }, {
      on: eventHandlers,
      nativeOn: eventHandlers
    }]), [this.selectedNodes, this.searchNode, this.textNode, this.icon !== null && h('i', {
      ref: 'icon',
      attrs: {
        'aria-hidden': 'true'
      },
      'class': (this.icon || 'dropdown') + ' icon'
    }, []), h('span', {
      'class': 'sizer',
      ref: 'sizer'
    }, []), this.$slots.default || this.menuNode]);
  }
};
},{"babel-runtime/helpers/typeof":"node_modules/babel-runtime/helpers/typeof.js","babel-helper-vue-jsx-merge-props":"node_modules/babel-helper-vue-jsx-merge-props/index.js","lodash/escapeRegExp":"node_modules/lodash/escapeRegExp.js","../../lib":"node_modules/semantic-ui-vue/dist/commonjs/lib/index.js","../../lib/PropTypes":"node_modules/semantic-ui-vue/dist/commonjs/lib/PropTypes.js","../../elements/Icon/Icon":"node_modules/semantic-ui-vue/dist/commonjs/elements/Icon/Icon.js","../../elements/Input/Input":"node_modules/semantic-ui-vue/dist/commonjs/elements/Input/Input.js","../../elements/Divider/Divider":"node_modules/semantic-ui-vue/dist/commonjs/elements/Divider/Divider.js","../../elements/Label/Label":"node_modules/semantic-ui-vue/dist/commonjs/elements/Label/Label.js","./DropdownItem":"node_modules/semantic-ui-vue/dist/commonjs/modules/Dropdown/DropdownItem.js","./DropdownMenu":"node_modules/semantic-ui-vue/dist/commonjs/modules/Dropdown/DropdownMenu.js","../../elements/Flag/Flag":"node_modules/semantic-ui-vue/dist/commonjs/elements/Flag/Flag.js","../../elements/Image/Image":"node_modules/semantic-ui-vue/dist/commonjs/elements/Image/Image.js"}],"node_modules/semantic-ui-vue/dist/commonjs/modules/Dropdown/DropdownDivider.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _babelHelperVueJsxMergeProps = require('babel-helper-vue-jsx-merge-props');

var _babelHelperVueJsxMergeProps2 = _interopRequireDefault(_babelHelperVueJsxMergeProps);

var _lib = require('../../lib');

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

exports.default = {
  name: 'SuiDropdownDivider',
  mixins: [_lib.SemanticUIVueMixin],
  render: function render() {
    var h = arguments[0];
    var ElementType = this.getElementType();
    return h(ElementType, (0, _babelHelperVueJsxMergeProps2.default)([this.getChildPropsAndListeners(), {
      attrs: {
        role: 'option'
      },
      'class': this.classes('divider')
    }]), []);
  },
  meta: {
    parent: 'SuiDropdown'
  }
};
},{"babel-helper-vue-jsx-merge-props":"node_modules/babel-helper-vue-jsx-merge-props/index.js","../../lib":"node_modules/semantic-ui-vue/dist/commonjs/lib/index.js"}],"node_modules/semantic-ui-vue/dist/commonjs/modules/Dropdown/DropdownHeader.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _babelHelperVueJsxMergeProps = require('babel-helper-vue-jsx-merge-props');

var _babelHelperVueJsxMergeProps2 = _interopRequireDefault(_babelHelperVueJsxMergeProps);

var _lib = require('../../lib');

var _Icon = require('../../elements/Icon/Icon');

var _Icon2 = _interopRequireDefault(_Icon);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

exports.default = {
  name: 'SuiDropdownHeader',
  mixins: [_lib.SemanticUIVueMixin],
  props: {
    content: {
      type: String,
      description: 'Shorthand for primary content.'
    },
    icon: {
      type: String,
      description: 'Shorthand for `sui-icon`.'
    }
  },
  render: function render() {
    var h = arguments[0];
    var ElementType = this.getElementType();
    return h(ElementType, (0, _babelHelperVueJsxMergeProps2.default)([this.getChildPropsAndListeners(), {
      'class': this.classes('header')
    }]), [this.icon && h(_Icon2.default, {
      attrs: {
        name: this.icon
      }
    }, []), this.content || this.$slots.default]);
  },
  meta: {
    parent: 'SuiDropdown'
  }
};
},{"babel-helper-vue-jsx-merge-props":"node_modules/babel-helper-vue-jsx-merge-props/index.js","../../lib":"node_modules/semantic-ui-vue/dist/commonjs/lib/index.js","../../elements/Icon/Icon":"node_modules/semantic-ui-vue/dist/commonjs/elements/Icon/Icon.js"}],"node_modules/semantic-ui-vue/dist/commonjs/modules/Dropdown/index.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Dropdown = require('./Dropdown');

Object.defineProperty(exports, 'Dropdown', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_Dropdown).default;
  }
});

var _DropdownDivider = require('./DropdownDivider');

Object.defineProperty(exports, 'DropdownDivider', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_DropdownDivider).default;
  }
});

var _DropdownHeader = require('./DropdownHeader');

Object.defineProperty(exports, 'DropdownHeader', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_DropdownHeader).default;
  }
});

var _DropdownItem = require('./DropdownItem');

Object.defineProperty(exports, 'DropdownItem', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_DropdownItem).default;
  }
});

var _DropdownMenu = require('./DropdownMenu');

Object.defineProperty(exports, 'DropdownMenu', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_DropdownMenu).default;
  }
});

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}
},{"./Dropdown":"node_modules/semantic-ui-vue/dist/commonjs/modules/Dropdown/Dropdown.js","./DropdownDivider":"node_modules/semantic-ui-vue/dist/commonjs/modules/Dropdown/DropdownDivider.js","./DropdownHeader":"node_modules/semantic-ui-vue/dist/commonjs/modules/Dropdown/DropdownHeader.js","./DropdownItem":"node_modules/semantic-ui-vue/dist/commonjs/modules/Dropdown/DropdownItem.js","./DropdownMenu":"node_modules/semantic-ui-vue/dist/commonjs/modules/Dropdown/DropdownMenu.js"}],"node_modules/semantic-ui-vue/dist/commonjs/modules/Embed/Embed.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _babelHelperVueJsxMergeProps = require('babel-helper-vue-jsx-merge-props');

var _babelHelperVueJsxMergeProps2 = _interopRequireDefault(_babelHelperVueJsxMergeProps);

var _lib = require('../../lib');

var _PropTypes = require('../../lib/PropTypes');

var _elements = require('../../elements');

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

exports.default = {
  name: 'SuiEmbed',
  mixins: [_lib.SemanticUIVueMixin],
  props: {
    active: {
      type: Boolean,
      description: 'An embed can be active'
    },
    aspectRatio: (0, _PropTypes.Enum)(['4:3', '16:9', '21:9'], {
      description: 'An embed can specify an alternative aspect ratio (4:3 | 16:9 | 21:9)'
    }),
    icon: {
      type: String,
      description: 'Specifies an icon to use with placeholder content',
      default: 'video play'
    },
    placeholder: {
      type: String,
      description: 'A placeholder image for embed'
    },
    source: (0, _PropTypes.Enum)(['youtube', 'vimeo'], {
      description: 'Specifies a source to use. Cannot be used together with url'
    }),
    url: {
      type: String,
      description: 'Specifies a url to use for embed. Cannot be used together with source'
    },
    autoplay: {
      type: Boolean,
      description: 'Setting to true or false will force autoplay',
      default: true
    },
    brandedUI: {
      type: Boolean,
      description: 'Whether to show networks branded UI like title cards, or after video calls to action'
    },
    color: {
      type: String,
      description: 'Specifies what default chrome color with Vimeo or YouTube',
      default: '#444444'
    },
    hd: {
      type: Boolean,
      description: 'Specifies whether to display YouTuber/Vimeo video in high-definition',
      default: true
    },
    id: {
      type: String,
      description: 'Specifies an id for source'
    },
    iframe: {
      type: Object,
      description: 'Shorthand for HTML iframe'
    }
  },
  data: function data() {
    return {
      isActive: false
    };
  },
  computed: {
    isActiveState: function isActiveState() {
      return this.active || this.isActive;
    }
  },
  methods: {
    setActive: function setActive() {
      this.isActive = true;
    }
  },
  render: function render() {
    var h = arguments[0];
    var self = this;

    function getSrc() {
      var source = !self.url && self.source;
      var url = !self.source && self.url;
      var autoplay = source && self.autoplay;
      var brandedUI = source && self.brandedUI;
      var color = source && self.color;
      var hd = source && self.hd;
      var id = source && self.id;

      if (source === 'youtube') {
        return ['//www.youtube.com/embed/' + id, '?autohide=true', '&amp;autoplay=' + autoplay, '&amp;color=' + encodeURIComponent(color), '&amp;hq=' + hd, '&amp;jsapi=false', '&amp;modestbranding=' + brandedUI].join('');
      }

      if (source === 'vimeo') {
        return ['//player.vimeo.com/video/' + id, '?api=false', '&amp;autoplay=' + autoplay, '&amp;byline=false', '&amp;color=' + encodeURIComponent(color), '&amp;portrait=false', '&amp;title=false'].join('');
      }

      return url;
    }

    function getStyleString(styleObj) {
      return Object.entries(styleObj).reduce(function (styleString, entry) {
        return '' + styleString + entry[0] + ':' + entry[1] + ';';
      }, '');
    }

    function renderEmbed() {
      if (!self.isActiveState) return null;
      if (self.$slots.default) return self.$slots.default;
      var iframe = self.iframe || {};
      var embedSrc = getSrc();
      var style = iframe.style ? getStyleString(iframe.style) : '';
      return h('div', {
        'class': 'embed'
      }, [h('iframe', {
        attrs: {
          src: iframe.src || embedSrc,
          allowFullScreen: iframe.allowFullScreen || false,
          frameBorder: iframe.frameBorder || 0,
          width: iframe.width || '100%',
          height: iframe.height || '100%',
          scrolling: iframe.scrolling || 'no',
          title: iframe.title || 'Embedded content from ' + (self.source || 'custom host')
        },
        style: style
      }, [])]);
    }

    var ElementType = this.getElementType();
    return h(ElementType, (0, _babelHelperVueJsxMergeProps2.default)([{
      on: {
        'click': this.setActive
      }
    }, this.getChildPropsAndListeners(), {
      'class': this.classes('ui', this.aspectRatio, this.isActiveState && 'active', 'embed')
    }]), [this.icon && h(_elements.Icon, {
      attrs: {
        name: this.icon
      }
    }, []), this.placeholder && h('img', {
      'class': 'placeholder',
      attrs: {
        src: this.placeholder
      }
    }, []), renderEmbed()]);
  }
};
},{"babel-helper-vue-jsx-merge-props":"node_modules/babel-helper-vue-jsx-merge-props/index.js","../../lib":"node_modules/semantic-ui-vue/dist/commonjs/lib/index.js","../../lib/PropTypes":"node_modules/semantic-ui-vue/dist/commonjs/lib/PropTypes.js","../../elements":"node_modules/semantic-ui-vue/dist/commonjs/elements/index.js"}],"node_modules/semantic-ui-vue/dist/commonjs/modules/Embed/index.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Embed = require('./Embed');

Object.defineProperty(exports, 'Embed', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_Embed).default;
  }
});

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}
},{"./Embed":"node_modules/semantic-ui-vue/dist/commonjs/modules/Embed/Embed.js"}],"node_modules/semantic-ui-vue/dist/commonjs/modules/Modal/Modal.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _events;
/**
 * Code taken form https://github.com/David-Desmaisons/Vue-Semantic-Modal
 * Thanks to [David Desmaisons](https://github.com/David-Desmaisons)
 */


var _lib = require('../../lib');

var _PropTypes = require('../../lib/PropTypes');

var _Icon = require('../../elements/Icon/Icon');

var _Icon2 = _interopRequireDefault(_Icon);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

var visualStates = {
  closed: 'closed',
  opening: 'opening',
  open: 'open',
  closing: 'closing'
};
var changedEvent = 'changed';

function animationWithDirections(animation) {
  return [animation + ' up', animation + ' down', animation + ' left', animation + ' right'];
}

var animations = ['scale', 'drop', 'horizontal flip', 'vertical flip', 'fade'].concat((0, _toConsumableArray3.default)(animationWithDirections('fade')), (0, _toConsumableArray3.default)(animationWithDirections('fly')), (0, _toConsumableArray3.default)(animationWithDirections('swing')));

function buildAnimation(name, direction) {
  return 'animating ' + name + ' ' + (direction ? 'in' : 'out');
}

function buildClass(visualState, animation) {
  switch (visualState) {
    case visualStates.opening:
      return buildAnimation(animation, true);

    case visualStates.open:
      return 'visible active';

    case visualStates.closing:
      return 'visible active ' + buildAnimation(animation, false);

    case visualStates.close:
      return 'hidden';

    default:
      return '';
  }
}

exports.default = {
  name: 'SuiModal',
  model: {
    prop: 'open',
    event: changedEvent
  },
  mixins: [_lib.SemanticUIVueMixin],
  props: {
    animation: (0, _PropTypes.Enum)(animations, {
      default: animations[0]
    }),
    animationDuration: {
      type: Number,
      default: 500
    },
    aligned: (0, _PropTypes.Enum)(['top']),
    closeIcon: {
      type: Boolean,
      default: false
    },
    dimmer: (0, _PropTypes.Enum)(['inverted']),
    image: {
      type: Boolean,
      default: false
    },
    open: {
      type: Boolean,
      default: false
    },
    size: (0, _PropTypes.Enum)(['standard', 'fullscreen', 'small', 'large', 'mini', 'tiny'], {
      default: 'standard'
    }),
    basic: {
      type: Boolean
    },
    closable: {
      type: Boolean,
      default: true
    }
  },
  events: (_events = {
    displayChanged: {
      custom: true
    }
  }, (0, _defineProperty3.default)(_events, changedEvent, {
    custom: true
  }), (0, _defineProperty3.default)(_events, 'clickAwayModal', {
    custom: true
  }), _events),
  data: function data() {
    return {
      visualState: this.open ? visualStates.open : visualStates.closed
    };
  },
  computed: {
    dimmerClass: function dimmerClass() {
      return buildClass(this.visualState, 'fade');
    },
    modalClass: function modalClass() {
      return buildClass(this.visualState, this.animation);
    },
    visible: function visible() {
      return this.visualState !== visualStates.closed;
    },
    dimmerStyle: function dimmerStyle() {
      return {
        display: this.visible ? 'flex !important' : 'none !important',
        animationDuration: this.animationDuration + 'ms'
      };
    },
    modalStyle: function modalStyle() {
      return {
        display: this.visible ? 'block !important' : 'none !important',
        animationDuration: this.animationDuration + 'ms'
      };
    }
  },
  watch: {
    open: function open(newValue) {
      this.visualState = newValue ? visualStates.opening : visualStates.closing;
    },
    visualState: function visualState(newValue) {
      this.$emit('displayChanged', newValue);
    }
  },
  mounted: function mounted() {
    this.$el.addEventListener((0, _lib.getEventAnimationEnd)(), this.onAnimationEnd, true);
  },
  beforeDestroy: function beforeDestroy() {
    this.$el.removeEventListener((0, _lib.getEventAnimationEnd)(), this.onAnimationEnd, true);
  },
  methods: {
    close: function close() {
      this.$emit(changedEvent, false);
    },
    dimmerClick: function dimmerClick(event) {
      if (this.closable && event.target === event.currentTarget && this.visualState === visualStates.open) {
        this.$emit('clickAwayModal');
        this.close();
      }
    },
    onAnimationEnd: function onAnimationEnd() {
      this.visualState = this.open ? visualStates.open : visualStates.closed;
    }
  },
  render: function render() {
    var _this = this;

    var h = arguments[0];
    return h('div', {
      ref: 'dimmer',
      'class': this.classes('ui', this.dimmer, 'dimmer modals page transition', this.dimmerClass),
      style: this.dimmerStyle,
      on: {
        'click': this.dimmerClick
      }
    }, [h('div', {
      ref: 'modal',
      style: this.modalStyle,
      'class': this.classes('ui', this.size, this.basic && 'basic', this.aligned && this.aligned + ' aligned', 'modal', 'transition', this.modalClass)
    }, [this.closeIcon && h(_Icon2.default, {
      attrs: {
        name: 'close'
      },
      nativeOn: {
        'click': function click() {
          return _this.close();
        }
      }
    }, []), this.$slots.default])]);
  }
};
},{"babel-runtime/helpers/defineProperty":"node_modules/babel-runtime/helpers/defineProperty.js","babel-runtime/helpers/toConsumableArray":"node_modules/babel-runtime/helpers/toConsumableArray.js","../../lib":"node_modules/semantic-ui-vue/dist/commonjs/lib/index.js","../../lib/PropTypes":"node_modules/semantic-ui-vue/dist/commonjs/lib/PropTypes.js","../../elements/Icon/Icon":"node_modules/semantic-ui-vue/dist/commonjs/elements/Icon/Icon.js"}],"node_modules/semantic-ui-vue/dist/commonjs/modules/Modal/ModalActions.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _babelHelperVueJsxMergeProps = require('babel-helper-vue-jsx-merge-props');

var _babelHelperVueJsxMergeProps2 = _interopRequireDefault(_babelHelperVueJsxMergeProps);

var _lib = require('../../lib');

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

exports.default = {
  name: 'SuiModalActions',
  mixins: [_lib.SemanticUIVueMixin],
  render: function render() {
    var h = arguments[0];
    var ElementType = this.getElementType();
    return h(ElementType, (0, _babelHelperVueJsxMergeProps2.default)([this.getChildPropsAndListeners(), {
      'class': this.classes('actions')
    }]), [this.$slots.default]);
  },
  meta: {
    parent: 'SuiModal'
  }
};
},{"babel-helper-vue-jsx-merge-props":"node_modules/babel-helper-vue-jsx-merge-props/index.js","../../lib":"node_modules/semantic-ui-vue/dist/commonjs/lib/index.js"}],"node_modules/semantic-ui-vue/dist/commonjs/modules/Modal/ModalContent.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _babelHelperVueJsxMergeProps = require('babel-helper-vue-jsx-merge-props');

var _babelHelperVueJsxMergeProps2 = _interopRequireDefault(_babelHelperVueJsxMergeProps);

var _lib = require('../../lib');

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

exports.default = {
  name: 'SuiModalContent',
  mixins: [_lib.SemanticUIVueMixin],
  props: {
    image: Boolean,
    scrolling: {
      type: Boolean,
      default: false,
      description: 'A modal can use the entire size of the screen.'
    }
  },
  render: function render() {
    var h = arguments[0];
    var ElementType = this.getElementType();
    return h(ElementType, (0, _babelHelperVueJsxMergeProps2.default)([this.getChildPropsAndListeners(), {
      'class': this.classes('content', this.image && 'image', this.scrolling && 'scrolling')
    }]), [this.$slots.default]);
  },
  meta: {
    parent: 'SuiModal'
  }
};
},{"babel-helper-vue-jsx-merge-props":"node_modules/babel-helper-vue-jsx-merge-props/index.js","../../lib":"node_modules/semantic-ui-vue/dist/commonjs/lib/index.js"}],"node_modules/semantic-ui-vue/dist/commonjs/modules/Modal/ModalDescription.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _babelHelperVueJsxMergeProps = require('babel-helper-vue-jsx-merge-props');

var _babelHelperVueJsxMergeProps2 = _interopRequireDefault(_babelHelperVueJsxMergeProps);

var _lib = require('../../lib');

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

exports.default = {
  name: 'SuiModalDescription',
  mixins: [_lib.SemanticUIVueMixin],
  props: {},
  render: function render() {
    var h = arguments[0];
    var ElementType = this.getElementType();
    return h(ElementType, (0, _babelHelperVueJsxMergeProps2.default)([this.getChildPropsAndListeners(), {
      'class': this.classes('description')
    }]), [this.$slots.default]);
  },
  meta: {
    parent: 'SuiModal'
  }
};
},{"babel-helper-vue-jsx-merge-props":"node_modules/babel-helper-vue-jsx-merge-props/index.js","../../lib":"node_modules/semantic-ui-vue/dist/commonjs/lib/index.js"}],"node_modules/semantic-ui-vue/dist/commonjs/modules/Modal/ModalHeader.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _babelHelperVueJsxMergeProps = require('babel-helper-vue-jsx-merge-props');

var _babelHelperVueJsxMergeProps2 = _interopRequireDefault(_babelHelperVueJsxMergeProps);

var _lib = require('../../lib');

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

exports.default = {
  name: 'SuiModalHeader',
  mixins: [_lib.SemanticUIVueMixin],
  props: {},
  render: function render() {
    var h = arguments[0];
    var ElementType = this.getElementType();
    return h(ElementType, (0, _babelHelperVueJsxMergeProps2.default)([this.getChildPropsAndListeners(), {
      'class': this.classes('header')
    }]), [this.$slots.default]);
  },
  meta: {
    parent: 'SuiModal'
  }
};
},{"babel-helper-vue-jsx-merge-props":"node_modules/babel-helper-vue-jsx-merge-props/index.js","../../lib":"node_modules/semantic-ui-vue/dist/commonjs/lib/index.js"}],"node_modules/semantic-ui-vue/dist/commonjs/modules/Modal/index.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Modal = require('./Modal');

Object.defineProperty(exports, 'Modal', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_Modal).default;
  }
});

var _ModalActions = require('./ModalActions');

Object.defineProperty(exports, 'ModalActions', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_ModalActions).default;
  }
});

var _ModalContent = require('./ModalContent');

Object.defineProperty(exports, 'ModalContent', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_ModalContent).default;
  }
});

var _ModalDescription = require('./ModalDescription');

Object.defineProperty(exports, 'ModalDescription', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_ModalDescription).default;
  }
});

var _ModalHeader = require('./ModalHeader');

Object.defineProperty(exports, 'ModalHeader', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_ModalHeader).default;
  }
});

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}
},{"./Modal":"node_modules/semantic-ui-vue/dist/commonjs/modules/Modal/Modal.js","./ModalActions":"node_modules/semantic-ui-vue/dist/commonjs/modules/Modal/ModalActions.js","./ModalContent":"node_modules/semantic-ui-vue/dist/commonjs/modules/Modal/ModalContent.js","./ModalDescription":"node_modules/semantic-ui-vue/dist/commonjs/modules/Modal/ModalDescription.js","./ModalHeader":"node_modules/semantic-ui-vue/dist/commonjs/modules/Modal/ModalHeader.js"}],"node_modules/semantic-ui-vue/dist/commonjs/modules/Rating/Rating.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _babelHelperVueJsxMergeProps = require('babel-helper-vue-jsx-merge-props');

var _babelHelperVueJsxMergeProps2 = _interopRequireDefault(_babelHelperVueJsxMergeProps);

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _lib = require('../../lib');

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

exports.default = {
  name: 'SuiRating',
  mixins: [_lib.SemanticUIVueMixin],
  binding: {
    prop: 'rating',
    event: 'changed'
  },
  props: {
    icon: String,
    maxRating: Number,
    rating: Number
  },
  events: {
    rate: {
      custom: true
    }
  },
  data: function data() {
    return {
      selected: 0
    };
  },
  methods: {
    getCurrentValue: function getCurrentValue(evt) {
      return Number(evt.target.getAttribute('aria-posinset'));
    },
    onRate: function onRate(evt) {
      var rating = this.getCurrentValue(evt);
      this.$emit('rate', evt, (0, _extends3.default)({}, this.$props, {
        rating: rating
      }));
    },
    onMouseleave: function onMouseleave() {
      this.selected = 0;
    },
    onMouseover: function onMouseover(evt) {
      this.selected = this.getCurrentValue(evt);
    }
  },
  render: function render() {
    var _this = this;

    var h = arguments[0];
    var ElementType = this.getElementType();
    return h(ElementType, (0, _babelHelperVueJsxMergeProps2.default)([this.getChildPropsAndListeners(), {
      'class': this.classes('ui', this.icon, 'rating'),
      attrs: {
        role: 'radiogroup'
      }
    }]), [[].concat((0, _toConsumableArray3.default)(new Array(this.maxRating))).map(function (v, i) {
      var elementValue = i + 1;
      var active = _this.rating > i;
      var selected = _this.selected > i;
      return h('i', {
        attrs: {
          'aria-checked': active.toString(),
          'aria-posinset': elementValue,
          'aria-setsize': _this.maxRating,
          tabindex: '0',
          role: 'radio'
        },
        'class': _this.classes(active && 'active', selected && 'selected', 'icon'),
        on: {
          'click': _this.onRate,
          'mouseover': _this.onMouseover,
          'mouseleave': _this.onMouseleave
        }
      }, []);
    })]);
  }
};
},{"babel-helper-vue-jsx-merge-props":"node_modules/babel-helper-vue-jsx-merge-props/index.js","babel-runtime/helpers/toConsumableArray":"node_modules/babel-runtime/helpers/toConsumableArray.js","babel-runtime/helpers/extends":"node_modules/babel-runtime/helpers/extends.js","../../lib":"node_modules/semantic-ui-vue/dist/commonjs/lib/index.js"}],"node_modules/semantic-ui-vue/dist/commonjs/modules/Rating/index.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Rating = require('./Rating');

Object.defineProperty(exports, 'Rating', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_Rating).default;
  }
});

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}
},{"./Rating":"node_modules/semantic-ui-vue/dist/commonjs/modules/Rating/Rating.js"}],"node_modules/semantic-ui-vue/dist/commonjs/modules/Sidebar/Sidebar.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _babelHelperVueJsxMergeProps = require('babel-helper-vue-jsx-merge-props');

var _babelHelperVueJsxMergeProps2 = _interopRequireDefault(_babelHelperVueJsxMergeProps);

var _lib = require('../../lib');

var _PropTypes = require('../../lib/PropTypes');

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

exports.default = {
  name: 'SuiSidebar',
  mixins: [_lib.SemanticUIVueMixin],
  props: {
    animation: (0, _PropTypes.Enum)(['overlay', 'push', 'scale down', 'uncover', 'slide out', 'slide along']),
    direction: (0, _PropTypes.Enum)(['top', 'right', 'bottom', 'left'], {
      default: 'left'
    }),
    visible: Boolean,
    width: (0, _PropTypes.Enum)(['very thin', 'thin', 'wide', 'very wide'])
  },
  data: function data() {
    return {
      animating: false
    };
  },
  watch: {
    visible: function visible() {
      var _this = this;

      this.animating = true;
      setTimeout(function () {
        _this.animating = false;
      }, 500);
    }
  },
  render: function render() {
    var h = arguments[0];
    var ElementType = this.getElementType();
    return h(ElementType, (0, _babelHelperVueJsxMergeProps2.default)([this.getChildPropsAndListeners(), {
      'class': 'ui sidebar vertical menu ' + this.direction + ' ' + (this.animation || '') + (this.visible ? ' visible' : '') + (this.animating ? ' animating' : '')
    }]), [this.$slots.default]);
  }
};
},{"babel-helper-vue-jsx-merge-props":"node_modules/babel-helper-vue-jsx-merge-props/index.js","../../lib":"node_modules/semantic-ui-vue/dist/commonjs/lib/index.js","../../lib/PropTypes":"node_modules/semantic-ui-vue/dist/commonjs/lib/PropTypes.js"}],"node_modules/semantic-ui-vue/dist/commonjs/modules/Sidebar/SidebarPushable.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _babelHelperVueJsxMergeProps = require('babel-helper-vue-jsx-merge-props');

var _babelHelperVueJsxMergeProps2 = _interopRequireDefault(_babelHelperVueJsxMergeProps);

var _lib = require('../../lib');

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

exports.default = {
  name: 'SuiSidebarPushable',
  mixins: [_lib.SemanticUIVueMixin],
  render: function render() {
    var h = arguments[0];
    var ElementType = this.getElementType();
    return h(ElementType, (0, _babelHelperVueJsxMergeProps2.default)([this.getChildPropsAndListeners(), {
      'class': 'pushable'
    }]), [this.$slots.default]);
  },
  meta: {
    parent: 'SuiSidebar'
  }
};
},{"babel-helper-vue-jsx-merge-props":"node_modules/babel-helper-vue-jsx-merge-props/index.js","../../lib":"node_modules/semantic-ui-vue/dist/commonjs/lib/index.js"}],"node_modules/semantic-ui-vue/dist/commonjs/modules/Sidebar/SidebarPusher.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _babelHelperVueJsxMergeProps = require('babel-helper-vue-jsx-merge-props');

var _babelHelperVueJsxMergeProps2 = _interopRequireDefault(_babelHelperVueJsxMergeProps);

var _lib = require('../../lib');

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

exports.default = {
  name: 'SuiSidebarPusher',
  mixins: [_lib.SemanticUIVueMixin],
  props: {
    dimmed: Boolean
  },
  render: function render() {
    var h = arguments[0];
    var ElementType = this.getElementType();
    return h(ElementType, (0, _babelHelperVueJsxMergeProps2.default)([this.getChildPropsAndListeners(), {
      'class': this.classes('pusher', this.dimmed && 'dimmed')
    }]), [this.$slots.default]);
  },
  meta: {
    parent: 'SuiSidebar'
  }
};
},{"babel-helper-vue-jsx-merge-props":"node_modules/babel-helper-vue-jsx-merge-props/index.js","../../lib":"node_modules/semantic-ui-vue/dist/commonjs/lib/index.js"}],"node_modules/semantic-ui-vue/dist/commonjs/modules/Sidebar/index.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Sidebar = require('./Sidebar');

Object.defineProperty(exports, 'Sidebar', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_Sidebar).default;
  }
});

var _SidebarPushable = require('./SidebarPushable');

Object.defineProperty(exports, 'SidebarPushable', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_SidebarPushable).default;
  }
});

var _SidebarPusher = require('./SidebarPusher');

Object.defineProperty(exports, 'SidebarPusher', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_SidebarPusher).default;
  }
});

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}
},{"./Sidebar":"node_modules/semantic-ui-vue/dist/commonjs/modules/Sidebar/Sidebar.js","./SidebarPushable":"node_modules/semantic-ui-vue/dist/commonjs/modules/Sidebar/SidebarPushable.js","./SidebarPusher":"node_modules/semantic-ui-vue/dist/commonjs/modules/Sidebar/SidebarPusher.js"}],"node_modules/semantic-ui-vue/dist/commonjs/lib/VFragment.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
}); // Taken from https://github.com/y-nk/vue-fragment
// Not using a dependency because it was breaking the umd build

/* eslint-disable */

var directive = {
  inserted: function inserted(element) {
    /*
      This hack is a bit strong, but it works great.
      The fragment feature cannot be made with Vue.js vDOM, so we use regular DOM instead. We just transport the DOM nodes after vDOM rendering from one DOM node (the fragment's node) to its parent node.
    */
    var fragment = document.createDocumentFragment();
    var children = Array.from(element.childNodes);
    var parent = element.parentNode;
    var tail = document.createComment('fragment tail');
    fragment.appendChild(tail);
    children.forEach(function (child) {
      return fragment.appendChild(child);
    });
    parent.insertBefore(fragment, element);
    parent.removeChild(element);
    /*
      There's a problem though.
      In Vue.js diff algorithm, there will be a test on parent node at the time of DOM node insertion, this to make sure that the new nodes belong to where they should go ; because we modify the DOM structure, this test fails and new nodes are not inserted/appended (https://github.com/vuejs/vue/blob/dev/src/core/vdom/patch.js#L275).
      The solution is to fool Vue.js in believing that the children are still in the fragment's DOM node.
      To do so :
      1. we're gonna turn parentNode property readable only using defineProperty APi, so the parentNode won't be updated and the test will pass.
      2. new nodes will be appended/inserted into fragment's DOM node, but we want them into the parent's, so we're gonna override fragment's DOM node's functions responsible for DOM manipulation which are used in the Vue.js node-ops for the web platform (https://github.com/vuejs/vue/blob/dev/src/platforms/web/runtime/node-ops.js) and redirect the call to the parent.
    */

    children.forEach(function (child) {
      return freeze(child, element);
    }); // backup of original functions to put them back in place later.

    element.__hooks__ = {
      appendChild: element.appendChild,
      insertBefore: element.insertBefore,
      removeChild: element.removeChild
    }; // override of node ops 1/3

    element.appendChild = function (child) {
      var op = parent.insertBefore(child, tail);
      if (child.parentNode !== element) freeze(child, element);
      return op;
    }; // override of node ops 2/3


    element.insertBefore = function (child, reference) {
      var op = parent.insertBefore(child, reference);
      if (child.parentNode !== element) freeze(child, element);
      return op;
    }; // override of node ops 3/3


    element.removeChild = function (child) {
      unfreeze(child);
      return parent.removeChild(child);
    };
  },
  unbind: function unbind(element) {
    if (element.__hooks__) {
      Object.keys(element.__hooks__).forEach(function (hook) {
        element[hook] = element.__hooks__[hook];
      });
      delete element.__hooks__;
    }
  }
}; // we keep the configurable flag on, so we can delete the property later to bring it back to normal

var freeze = function freeze(child, parent) {
  Object.defineProperty(child, 'parentNode', {
    configurable: true,
    writable: false,
    value: parent
  });
}; // we force-delete for unfreeze, and recreate parent as null


var unfreeze = function unfreeze(child) {
  Object.defineProperty(child, 'parentNode', {
    configurable: true,
    writable: true,
    value: null
  });
};

exports.default = {
  abstract: true,
  directives: {
    'fragment': directive
  },
  render: function render(h) {
    return h('div', {
      attrs: {
        class: 'v-fragment'
      },
      directives: [{
        name: 'fragment'
      }]
    }, [this.$slots.default]);
  }
};
},{}],"node_modules/lodash/_defineProperty.js":[function(require,module,exports) {
var getNative = require('./_getNative');

var defineProperty = (function() {
  try {
    var func = getNative(Object, 'defineProperty');
    func({}, '', {});
    return func;
  } catch (e) {}
}());

module.exports = defineProperty;

},{"./_getNative":"node_modules/lodash/_getNative.js"}],"node_modules/lodash/_baseAssignValue.js":[function(require,module,exports) {
var defineProperty = require('./_defineProperty');

/**
 * The base implementation of `assignValue` and `assignMergeValue` without
 * value checks.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {string} key The key of the property to assign.
 * @param {*} value The value to assign.
 */
function baseAssignValue(object, key, value) {
  if (key == '__proto__' && defineProperty) {
    defineProperty(object, key, {
      'configurable': true,
      'enumerable': true,
      'value': value,
      'writable': true
    });
  } else {
    object[key] = value;
  }
}

module.exports = baseAssignValue;

},{"./_defineProperty":"node_modules/lodash/_defineProperty.js"}],"node_modules/lodash/_createBaseFor.js":[function(require,module,exports) {
/**
 * Creates a base function for methods like `_.forIn` and `_.forOwn`.
 *
 * @private
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {Function} Returns the new base function.
 */
function createBaseFor(fromRight) {
  return function(object, iteratee, keysFunc) {
    var index = -1,
        iterable = Object(object),
        props = keysFunc(object),
        length = props.length;

    while (length--) {
      var key = props[fromRight ? length : ++index];
      if (iteratee(iterable[key], key, iterable) === false) {
        break;
      }
    }
    return object;
  };
}

module.exports = createBaseFor;

},{}],"node_modules/lodash/_baseFor.js":[function(require,module,exports) {
var createBaseFor = require('./_createBaseFor');

/**
 * The base implementation of `baseForOwn` which iterates over `object`
 * properties returned by `keysFunc` and invokes `iteratee` for each property.
 * Iteratee functions may exit iteration early by explicitly returning `false`.
 *
 * @private
 * @param {Object} object The object to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @param {Function} keysFunc The function to get the keys of `object`.
 * @returns {Object} Returns `object`.
 */
var baseFor = createBaseFor();

module.exports = baseFor;

},{"./_createBaseFor":"node_modules/lodash/_createBaseFor.js"}],"node_modules/lodash/_baseTimes.js":[function(require,module,exports) {
/**
 * The base implementation of `_.times` without support for iteratee shorthands
 * or max array length checks.
 *
 * @private
 * @param {number} n The number of times to invoke `iteratee`.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the array of results.
 */
function baseTimes(n, iteratee) {
  var index = -1,
      result = Array(n);

  while (++index < n) {
    result[index] = iteratee(index);
  }
  return result;
}

module.exports = baseTimes;

},{}],"node_modules/lodash/_baseIsArguments.js":[function(require,module,exports) {
var baseGetTag = require('./_baseGetTag'),
    isObjectLike = require('./isObjectLike');

/** `Object#toString` result references. */
var argsTag = '[object Arguments]';

/**
 * The base implementation of `_.isArguments`.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 */
function baseIsArguments(value) {
  return isObjectLike(value) && baseGetTag(value) == argsTag;
}

module.exports = baseIsArguments;

},{"./_baseGetTag":"node_modules/lodash/_baseGetTag.js","./isObjectLike":"node_modules/lodash/isObjectLike.js"}],"node_modules/lodash/isArguments.js":[function(require,module,exports) {
var baseIsArguments = require('./_baseIsArguments'),
    isObjectLike = require('./isObjectLike');

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/** Built-in value references. */
var propertyIsEnumerable = objectProto.propertyIsEnumerable;

/**
 * Checks if `value` is likely an `arguments` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 *  else `false`.
 * @example
 *
 * _.isArguments(function() { return arguments; }());
 * // => true
 *
 * _.isArguments([1, 2, 3]);
 * // => false
 */
var isArguments = baseIsArguments(function() { return arguments; }()) ? baseIsArguments : function(value) {
  return isObjectLike(value) && hasOwnProperty.call(value, 'callee') &&
    !propertyIsEnumerable.call(value, 'callee');
};

module.exports = isArguments;

},{"./_baseIsArguments":"node_modules/lodash/_baseIsArguments.js","./isObjectLike":"node_modules/lodash/isObjectLike.js"}],"node_modules/lodash/stubFalse.js":[function(require,module,exports) {
/**
 * This method returns `false`.
 *
 * @static
 * @memberOf _
 * @since 4.13.0
 * @category Util
 * @returns {boolean} Returns `false`.
 * @example
 *
 * _.times(2, _.stubFalse);
 * // => [false, false]
 */
function stubFalse() {
  return false;
}

module.exports = stubFalse;

},{}],"node_modules/lodash/isBuffer.js":[function(require,module,exports) {

var root = require('./_root'),
    stubFalse = require('./stubFalse');

/** Detect free variable `exports`. */
var freeExports = typeof exports == 'object' && exports && !exports.nodeType && exports;

/** Detect free variable `module`. */
var freeModule = freeExports && typeof module == 'object' && module && !module.nodeType && module;

/** Detect the popular CommonJS extension `module.exports`. */
var moduleExports = freeModule && freeModule.exports === freeExports;

/** Built-in value references. */
var Buffer = moduleExports ? root.Buffer : undefined;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeIsBuffer = Buffer ? Buffer.isBuffer : undefined;

/**
 * Checks if `value` is a buffer.
 *
 * @static
 * @memberOf _
 * @since 4.3.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a buffer, else `false`.
 * @example
 *
 * _.isBuffer(new Buffer(2));
 * // => true
 *
 * _.isBuffer(new Uint8Array(2));
 * // => false
 */
var isBuffer = nativeIsBuffer || stubFalse;

module.exports = isBuffer;

},{"./_root":"node_modules/lodash/_root.js","./stubFalse":"node_modules/lodash/stubFalse.js"}],"node_modules/lodash/_isIndex.js":[function(require,module,exports) {
/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER = 9007199254740991;

/** Used to detect unsigned integer values. */
var reIsUint = /^(?:0|[1-9]\d*)$/;

/**
 * Checks if `value` is a valid array-like index.
 *
 * @private
 * @param {*} value The value to check.
 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
 */
function isIndex(value, length) {
  var type = typeof value;
  length = length == null ? MAX_SAFE_INTEGER : length;

  return !!length &&
    (type == 'number' ||
      (type != 'symbol' && reIsUint.test(value))) &&
        (value > -1 && value % 1 == 0 && value < length);
}

module.exports = isIndex;

},{}],"node_modules/lodash/isLength.js":[function(require,module,exports) {
/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER = 9007199254740991;

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This method is loosely based on
 * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 * @example
 *
 * _.isLength(3);
 * // => true
 *
 * _.isLength(Number.MIN_VALUE);
 * // => false
 *
 * _.isLength(Infinity);
 * // => false
 *
 * _.isLength('3');
 * // => false
 */
function isLength(value) {
  return typeof value == 'number' &&
    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}

module.exports = isLength;

},{}],"node_modules/lodash/_baseIsTypedArray.js":[function(require,module,exports) {
var baseGetTag = require('./_baseGetTag'),
    isLength = require('./isLength'),
    isObjectLike = require('./isObjectLike');

/** `Object#toString` result references. */
var argsTag = '[object Arguments]',
    arrayTag = '[object Array]',
    boolTag = '[object Boolean]',
    dateTag = '[object Date]',
    errorTag = '[object Error]',
    funcTag = '[object Function]',
    mapTag = '[object Map]',
    numberTag = '[object Number]',
    objectTag = '[object Object]',
    regexpTag = '[object RegExp]',
    setTag = '[object Set]',
    stringTag = '[object String]',
    weakMapTag = '[object WeakMap]';

var arrayBufferTag = '[object ArrayBuffer]',
    dataViewTag = '[object DataView]',
    float32Tag = '[object Float32Array]',
    float64Tag = '[object Float64Array]',
    int8Tag = '[object Int8Array]',
    int16Tag = '[object Int16Array]',
    int32Tag = '[object Int32Array]',
    uint8Tag = '[object Uint8Array]',
    uint8ClampedTag = '[object Uint8ClampedArray]',
    uint16Tag = '[object Uint16Array]',
    uint32Tag = '[object Uint32Array]';

/** Used to identify `toStringTag` values of typed arrays. */
var typedArrayTags = {};
typedArrayTags[float32Tag] = typedArrayTags[float64Tag] =
typedArrayTags[int8Tag] = typedArrayTags[int16Tag] =
typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] =
typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] =
typedArrayTags[uint32Tag] = true;
typedArrayTags[argsTag] = typedArrayTags[arrayTag] =
typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] =
typedArrayTags[dataViewTag] = typedArrayTags[dateTag] =
typedArrayTags[errorTag] = typedArrayTags[funcTag] =
typedArrayTags[mapTag] = typedArrayTags[numberTag] =
typedArrayTags[objectTag] = typedArrayTags[regexpTag] =
typedArrayTags[setTag] = typedArrayTags[stringTag] =
typedArrayTags[weakMapTag] = false;

/**
 * The base implementation of `_.isTypedArray` without Node.js optimizations.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 */
function baseIsTypedArray(value) {
  return isObjectLike(value) &&
    isLength(value.length) && !!typedArrayTags[baseGetTag(value)];
}

module.exports = baseIsTypedArray;

},{"./_baseGetTag":"node_modules/lodash/_baseGetTag.js","./isLength":"node_modules/lodash/isLength.js","./isObjectLike":"node_modules/lodash/isObjectLike.js"}],"node_modules/lodash/_baseUnary.js":[function(require,module,exports) {
/**
 * The base implementation of `_.unary` without support for storing metadata.
 *
 * @private
 * @param {Function} func The function to cap arguments for.
 * @returns {Function} Returns the new capped function.
 */
function baseUnary(func) {
  return function(value) {
    return func(value);
  };
}

module.exports = baseUnary;

},{}],"node_modules/lodash/_nodeUtil.js":[function(require,module,exports) {
var freeGlobal = require('./_freeGlobal');

/** Detect free variable `exports`. */
var freeExports = typeof exports == 'object' && exports && !exports.nodeType && exports;

/** Detect free variable `module`. */
var freeModule = freeExports && typeof module == 'object' && module && !module.nodeType && module;

/** Detect the popular CommonJS extension `module.exports`. */
var moduleExports = freeModule && freeModule.exports === freeExports;

/** Detect free variable `process` from Node.js. */
var freeProcess = moduleExports && freeGlobal.process;

/** Used to access faster Node.js helpers. */
var nodeUtil = (function() {
  try {
    // Use `util.types` for Node.js 10+.
    var types = freeModule && freeModule.require && freeModule.require('util').types;

    if (types) {
      return types;
    }

    // Legacy `process.binding('util')` for Node.js < 10.
    return freeProcess && freeProcess.binding && freeProcess.binding('util');
  } catch (e) {}
}());

module.exports = nodeUtil;

},{"./_freeGlobal":"node_modules/lodash/_freeGlobal.js"}],"node_modules/lodash/isTypedArray.js":[function(require,module,exports) {
var baseIsTypedArray = require('./_baseIsTypedArray'),
    baseUnary = require('./_baseUnary'),
    nodeUtil = require('./_nodeUtil');

/* Node.js helper references. */
var nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;

/**
 * Checks if `value` is classified as a typed array.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 * @example
 *
 * _.isTypedArray(new Uint8Array);
 * // => true
 *
 * _.isTypedArray([]);
 * // => false
 */
var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;

module.exports = isTypedArray;

},{"./_baseIsTypedArray":"node_modules/lodash/_baseIsTypedArray.js","./_baseUnary":"node_modules/lodash/_baseUnary.js","./_nodeUtil":"node_modules/lodash/_nodeUtil.js"}],"node_modules/lodash/_arrayLikeKeys.js":[function(require,module,exports) {
var baseTimes = require('./_baseTimes'),
    isArguments = require('./isArguments'),
    isArray = require('./isArray'),
    isBuffer = require('./isBuffer'),
    isIndex = require('./_isIndex'),
    isTypedArray = require('./isTypedArray');

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Creates an array of the enumerable property names of the array-like `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @param {boolean} inherited Specify returning inherited property names.
 * @returns {Array} Returns the array of property names.
 */
function arrayLikeKeys(value, inherited) {
  var isArr = isArray(value),
      isArg = !isArr && isArguments(value),
      isBuff = !isArr && !isArg && isBuffer(value),
      isType = !isArr && !isArg && !isBuff && isTypedArray(value),
      skipIndexes = isArr || isArg || isBuff || isType,
      result = skipIndexes ? baseTimes(value.length, String) : [],
      length = result.length;

  for (var key in value) {
    if ((inherited || hasOwnProperty.call(value, key)) &&
        !(skipIndexes && (
           // Safari 9 has enumerable `arguments.length` in strict mode.
           key == 'length' ||
           // Node.js 0.10 has enumerable non-index properties on buffers.
           (isBuff && (key == 'offset' || key == 'parent')) ||
           // PhantomJS 2 has enumerable non-index properties on typed arrays.
           (isType && (key == 'buffer' || key == 'byteLength' || key == 'byteOffset')) ||
           // Skip index properties.
           isIndex(key, length)
        ))) {
      result.push(key);
    }
  }
  return result;
}

module.exports = arrayLikeKeys;

},{"./_baseTimes":"node_modules/lodash/_baseTimes.js","./isArguments":"node_modules/lodash/isArguments.js","./isArray":"node_modules/lodash/isArray.js","./isBuffer":"node_modules/lodash/isBuffer.js","./_isIndex":"node_modules/lodash/_isIndex.js","./isTypedArray":"node_modules/lodash/isTypedArray.js"}],"node_modules/lodash/_isPrototype.js":[function(require,module,exports) {
/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Checks if `value` is likely a prototype object.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
 */
function isPrototype(value) {
  var Ctor = value && value.constructor,
      proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto;

  return value === proto;
}

module.exports = isPrototype;

},{}],"node_modules/lodash/_overArg.js":[function(require,module,exports) {
/**
 * Creates a unary function that invokes `func` with its argument transformed.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {Function} transform The argument transform.
 * @returns {Function} Returns the new function.
 */
function overArg(func, transform) {
  return function(arg) {
    return func(transform(arg));
  };
}

module.exports = overArg;

},{}],"node_modules/lodash/_nativeKeys.js":[function(require,module,exports) {
var overArg = require('./_overArg');

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeKeys = overArg(Object.keys, Object);

module.exports = nativeKeys;

},{"./_overArg":"node_modules/lodash/_overArg.js"}],"node_modules/lodash/_baseKeys.js":[function(require,module,exports) {
var isPrototype = require('./_isPrototype'),
    nativeKeys = require('./_nativeKeys');

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * The base implementation of `_.keys` which doesn't treat sparse arrays as dense.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function baseKeys(object) {
  if (!isPrototype(object)) {
    return nativeKeys(object);
  }
  var result = [];
  for (var key in Object(object)) {
    if (hasOwnProperty.call(object, key) && key != 'constructor') {
      result.push(key);
    }
  }
  return result;
}

module.exports = baseKeys;

},{"./_isPrototype":"node_modules/lodash/_isPrototype.js","./_nativeKeys":"node_modules/lodash/_nativeKeys.js"}],"node_modules/lodash/isArrayLike.js":[function(require,module,exports) {
var isFunction = require('./isFunction'),
    isLength = require('./isLength');

/**
 * Checks if `value` is array-like. A value is considered array-like if it's
 * not a function and has a `value.length` that's an integer greater than or
 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
 * @example
 *
 * _.isArrayLike([1, 2, 3]);
 * // => true
 *
 * _.isArrayLike(document.body.children);
 * // => true
 *
 * _.isArrayLike('abc');
 * // => true
 *
 * _.isArrayLike(_.noop);
 * // => false
 */
function isArrayLike(value) {
  return value != null && isLength(value.length) && !isFunction(value);
}

module.exports = isArrayLike;

},{"./isFunction":"node_modules/lodash/isFunction.js","./isLength":"node_modules/lodash/isLength.js"}],"node_modules/lodash/keys.js":[function(require,module,exports) {
var arrayLikeKeys = require('./_arrayLikeKeys'),
    baseKeys = require('./_baseKeys'),
    isArrayLike = require('./isArrayLike');

/**
 * Creates an array of the own enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects. See the
 * [ES spec](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
 * for more details.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keys(new Foo);
 * // => ['a', 'b'] (iteration order is not guaranteed)
 *
 * _.keys('hi');
 * // => ['0', '1']
 */
function keys(object) {
  return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
}

module.exports = keys;

},{"./_arrayLikeKeys":"node_modules/lodash/_arrayLikeKeys.js","./_baseKeys":"node_modules/lodash/_baseKeys.js","./isArrayLike":"node_modules/lodash/isArrayLike.js"}],"node_modules/lodash/_baseForOwn.js":[function(require,module,exports) {
var baseFor = require('./_baseFor'),
    keys = require('./keys');

/**
 * The base implementation of `_.forOwn` without support for iteratee shorthands.
 *
 * @private
 * @param {Object} object The object to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Object} Returns `object`.
 */
function baseForOwn(object, iteratee) {
  return object && baseFor(object, iteratee, keys);
}

module.exports = baseForOwn;

},{"./_baseFor":"node_modules/lodash/_baseFor.js","./keys":"node_modules/lodash/keys.js"}],"node_modules/lodash/_stackClear.js":[function(require,module,exports) {
var ListCache = require('./_ListCache');

/**
 * Removes all key-value entries from the stack.
 *
 * @private
 * @name clear
 * @memberOf Stack
 */
function stackClear() {
  this.__data__ = new ListCache;
  this.size = 0;
}

module.exports = stackClear;

},{"./_ListCache":"node_modules/lodash/_ListCache.js"}],"node_modules/lodash/_stackDelete.js":[function(require,module,exports) {
/**
 * Removes `key` and its value from the stack.
 *
 * @private
 * @name delete
 * @memberOf Stack
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function stackDelete(key) {
  var data = this.__data__,
      result = data['delete'](key);

  this.size = data.size;
  return result;
}

module.exports = stackDelete;

},{}],"node_modules/lodash/_stackGet.js":[function(require,module,exports) {
/**
 * Gets the stack value for `key`.
 *
 * @private
 * @name get
 * @memberOf Stack
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function stackGet(key) {
  return this.__data__.get(key);
}

module.exports = stackGet;

},{}],"node_modules/lodash/_stackHas.js":[function(require,module,exports) {
/**
 * Checks if a stack value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Stack
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function stackHas(key) {
  return this.__data__.has(key);
}

module.exports = stackHas;

},{}],"node_modules/lodash/_stackSet.js":[function(require,module,exports) {
var ListCache = require('./_ListCache'),
    Map = require('./_Map'),
    MapCache = require('./_MapCache');

/** Used as the size to enable large array optimizations. */
var LARGE_ARRAY_SIZE = 200;

/**
 * Sets the stack `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Stack
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the stack cache instance.
 */
function stackSet(key, value) {
  var data = this.__data__;
  if (data instanceof ListCache) {
    var pairs = data.__data__;
    if (!Map || (pairs.length < LARGE_ARRAY_SIZE - 1)) {
      pairs.push([key, value]);
      this.size = ++data.size;
      return this;
    }
    data = this.__data__ = new MapCache(pairs);
  }
  data.set(key, value);
  this.size = data.size;
  return this;
}

module.exports = stackSet;

},{"./_ListCache":"node_modules/lodash/_ListCache.js","./_Map":"node_modules/lodash/_Map.js","./_MapCache":"node_modules/lodash/_MapCache.js"}],"node_modules/lodash/_Stack.js":[function(require,module,exports) {
var ListCache = require('./_ListCache'),
    stackClear = require('./_stackClear'),
    stackDelete = require('./_stackDelete'),
    stackGet = require('./_stackGet'),
    stackHas = require('./_stackHas'),
    stackSet = require('./_stackSet');

/**
 * Creates a stack cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Stack(entries) {
  var data = this.__data__ = new ListCache(entries);
  this.size = data.size;
}

// Add methods to `Stack`.
Stack.prototype.clear = stackClear;
Stack.prototype['delete'] = stackDelete;
Stack.prototype.get = stackGet;
Stack.prototype.has = stackHas;
Stack.prototype.set = stackSet;

module.exports = Stack;

},{"./_ListCache":"node_modules/lodash/_ListCache.js","./_stackClear":"node_modules/lodash/_stackClear.js","./_stackDelete":"node_modules/lodash/_stackDelete.js","./_stackGet":"node_modules/lodash/_stackGet.js","./_stackHas":"node_modules/lodash/_stackHas.js","./_stackSet":"node_modules/lodash/_stackSet.js"}],"node_modules/lodash/_arraySome.js":[function(require,module,exports) {
/**
 * A specialized version of `_.some` for arrays without support for iteratee
 * shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {boolean} Returns `true` if any element passes the predicate check,
 *  else `false`.
 */
function arraySome(array, predicate) {
  var index = -1,
      length = array == null ? 0 : array.length;

  while (++index < length) {
    if (predicate(array[index], index, array)) {
      return true;
    }
  }
  return false;
}

module.exports = arraySome;

},{}],"node_modules/lodash/_equalArrays.js":[function(require,module,exports) {
var SetCache = require('./_SetCache'),
    arraySome = require('./_arraySome'),
    cacheHas = require('./_cacheHas');

/** Used to compose bitmasks for value comparisons. */
var COMPARE_PARTIAL_FLAG = 1,
    COMPARE_UNORDERED_FLAG = 2;

/**
 * A specialized version of `baseIsEqualDeep` for arrays with support for
 * partial deep comparisons.
 *
 * @private
 * @param {Array} array The array to compare.
 * @param {Array} other The other array to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} stack Tracks traversed `array` and `other` objects.
 * @returns {boolean} Returns `true` if the arrays are equivalent, else `false`.
 */
function equalArrays(array, other, bitmask, customizer, equalFunc, stack) {
  var isPartial = bitmask & COMPARE_PARTIAL_FLAG,
      arrLength = array.length,
      othLength = other.length;

  if (arrLength != othLength && !(isPartial && othLength > arrLength)) {
    return false;
  }
  // Assume cyclic values are equal.
  var stacked = stack.get(array);
  if (stacked && stack.get(other)) {
    return stacked == other;
  }
  var index = -1,
      result = true,
      seen = (bitmask & COMPARE_UNORDERED_FLAG) ? new SetCache : undefined;

  stack.set(array, other);
  stack.set(other, array);

  // Ignore non-index properties.
  while (++index < arrLength) {
    var arrValue = array[index],
        othValue = other[index];

    if (customizer) {
      var compared = isPartial
        ? customizer(othValue, arrValue, index, other, array, stack)
        : customizer(arrValue, othValue, index, array, other, stack);
    }
    if (compared !== undefined) {
      if (compared) {
        continue;
      }
      result = false;
      break;
    }
    // Recursively compare arrays (susceptible to call stack limits).
    if (seen) {
      if (!arraySome(other, function(othValue, othIndex) {
            if (!cacheHas(seen, othIndex) &&
                (arrValue === othValue || equalFunc(arrValue, othValue, bitmask, customizer, stack))) {
              return seen.push(othIndex);
            }
          })) {
        result = false;
        break;
      }
    } else if (!(
          arrValue === othValue ||
            equalFunc(arrValue, othValue, bitmask, customizer, stack)
        )) {
      result = false;
      break;
    }
  }
  stack['delete'](array);
  stack['delete'](other);
  return result;
}

module.exports = equalArrays;

},{"./_SetCache":"node_modules/lodash/_SetCache.js","./_arraySome":"node_modules/lodash/_arraySome.js","./_cacheHas":"node_modules/lodash/_cacheHas.js"}],"node_modules/lodash/_Uint8Array.js":[function(require,module,exports) {
var root = require('./_root');

/** Built-in value references. */
var Uint8Array = root.Uint8Array;

module.exports = Uint8Array;

},{"./_root":"node_modules/lodash/_root.js"}],"node_modules/lodash/_mapToArray.js":[function(require,module,exports) {
/**
 * Converts `map` to its key-value pairs.
 *
 * @private
 * @param {Object} map The map to convert.
 * @returns {Array} Returns the key-value pairs.
 */
function mapToArray(map) {
  var index = -1,
      result = Array(map.size);

  map.forEach(function(value, key) {
    result[++index] = [key, value];
  });
  return result;
}

module.exports = mapToArray;

},{}],"node_modules/lodash/_equalByTag.js":[function(require,module,exports) {
var Symbol = require('./_Symbol'),
    Uint8Array = require('./_Uint8Array'),
    eq = require('./eq'),
    equalArrays = require('./_equalArrays'),
    mapToArray = require('./_mapToArray'),
    setToArray = require('./_setToArray');

/** Used to compose bitmasks for value comparisons. */
var COMPARE_PARTIAL_FLAG = 1,
    COMPARE_UNORDERED_FLAG = 2;

/** `Object#toString` result references. */
var boolTag = '[object Boolean]',
    dateTag = '[object Date]',
    errorTag = '[object Error]',
    mapTag = '[object Map]',
    numberTag = '[object Number]',
    regexpTag = '[object RegExp]',
    setTag = '[object Set]',
    stringTag = '[object String]',
    symbolTag = '[object Symbol]';

var arrayBufferTag = '[object ArrayBuffer]',
    dataViewTag = '[object DataView]';

/** Used to convert symbols to primitives and strings. */
var symbolProto = Symbol ? Symbol.prototype : undefined,
    symbolValueOf = symbolProto ? symbolProto.valueOf : undefined;

/**
 * A specialized version of `baseIsEqualDeep` for comparing objects of
 * the same `toStringTag`.
 *
 * **Note:** This function only supports comparing values with tags of
 * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {string} tag The `toStringTag` of the objects to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} stack Tracks traversed `object` and `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function equalByTag(object, other, tag, bitmask, customizer, equalFunc, stack) {
  switch (tag) {
    case dataViewTag:
      if ((object.byteLength != other.byteLength) ||
          (object.byteOffset != other.byteOffset)) {
        return false;
      }
      object = object.buffer;
      other = other.buffer;

    case arrayBufferTag:
      if ((object.byteLength != other.byteLength) ||
          !equalFunc(new Uint8Array(object), new Uint8Array(other))) {
        return false;
      }
      return true;

    case boolTag:
    case dateTag:
    case numberTag:
      // Coerce booleans to `1` or `0` and dates to milliseconds.
      // Invalid dates are coerced to `NaN`.
      return eq(+object, +other);

    case errorTag:
      return object.name == other.name && object.message == other.message;

    case regexpTag:
    case stringTag:
      // Coerce regexes to strings and treat strings, primitives and objects,
      // as equal. See http://www.ecma-international.org/ecma-262/7.0/#sec-regexp.prototype.tostring
      // for more details.
      return object == (other + '');

    case mapTag:
      var convert = mapToArray;

    case setTag:
      var isPartial = bitmask & COMPARE_PARTIAL_FLAG;
      convert || (convert = setToArray);

      if (object.size != other.size && !isPartial) {
        return false;
      }
      // Assume cyclic values are equal.
      var stacked = stack.get(object);
      if (stacked) {
        return stacked == other;
      }
      bitmask |= COMPARE_UNORDERED_FLAG;

      // Recursively compare objects (susceptible to call stack limits).
      stack.set(object, other);
      var result = equalArrays(convert(object), convert(other), bitmask, customizer, equalFunc, stack);
      stack['delete'](object);
      return result;

    case symbolTag:
      if (symbolValueOf) {
        return symbolValueOf.call(object) == symbolValueOf.call(other);
      }
  }
  return false;
}

module.exports = equalByTag;

},{"./_Symbol":"node_modules/lodash/_Symbol.js","./_Uint8Array":"node_modules/lodash/_Uint8Array.js","./eq":"node_modules/lodash/eq.js","./_equalArrays":"node_modules/lodash/_equalArrays.js","./_mapToArray":"node_modules/lodash/_mapToArray.js","./_setToArray":"node_modules/lodash/_setToArray.js"}],"node_modules/lodash/_arrayPush.js":[function(require,module,exports) {
/**
 * Appends the elements of `values` to `array`.
 *
 * @private
 * @param {Array} array The array to modify.
 * @param {Array} values The values to append.
 * @returns {Array} Returns `array`.
 */
function arrayPush(array, values) {
  var index = -1,
      length = values.length,
      offset = array.length;

  while (++index < length) {
    array[offset + index] = values[index];
  }
  return array;
}

module.exports = arrayPush;

},{}],"node_modules/lodash/_baseGetAllKeys.js":[function(require,module,exports) {
var arrayPush = require('./_arrayPush'),
    isArray = require('./isArray');

/**
 * The base implementation of `getAllKeys` and `getAllKeysIn` which uses
 * `keysFunc` and `symbolsFunc` to get the enumerable property names and
 * symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Function} keysFunc The function to get the keys of `object`.
 * @param {Function} symbolsFunc The function to get the symbols of `object`.
 * @returns {Array} Returns the array of property names and symbols.
 */
function baseGetAllKeys(object, keysFunc, symbolsFunc) {
  var result = keysFunc(object);
  return isArray(object) ? result : arrayPush(result, symbolsFunc(object));
}

module.exports = baseGetAllKeys;

},{"./_arrayPush":"node_modules/lodash/_arrayPush.js","./isArray":"node_modules/lodash/isArray.js"}],"node_modules/lodash/_arrayFilter.js":[function(require,module,exports) {
/**
 * A specialized version of `_.filter` for arrays without support for
 * iteratee shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {Array} Returns the new filtered array.
 */
function arrayFilter(array, predicate) {
  var index = -1,
      length = array == null ? 0 : array.length,
      resIndex = 0,
      result = [];

  while (++index < length) {
    var value = array[index];
    if (predicate(value, index, array)) {
      result[resIndex++] = value;
    }
  }
  return result;
}

module.exports = arrayFilter;

},{}],"node_modules/lodash/stubArray.js":[function(require,module,exports) {
/**
 * This method returns a new empty array.
 *
 * @static
 * @memberOf _
 * @since 4.13.0
 * @category Util
 * @returns {Array} Returns the new empty array.
 * @example
 *
 * var arrays = _.times(2, _.stubArray);
 *
 * console.log(arrays);
 * // => [[], []]
 *
 * console.log(arrays[0] === arrays[1]);
 * // => false
 */
function stubArray() {
  return [];
}

module.exports = stubArray;

},{}],"node_modules/lodash/_getSymbols.js":[function(require,module,exports) {
var arrayFilter = require('./_arrayFilter'),
    stubArray = require('./stubArray');

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Built-in value references. */
var propertyIsEnumerable = objectProto.propertyIsEnumerable;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeGetSymbols = Object.getOwnPropertySymbols;

/**
 * Creates an array of the own enumerable symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of symbols.
 */
var getSymbols = !nativeGetSymbols ? stubArray : function(object) {
  if (object == null) {
    return [];
  }
  object = Object(object);
  return arrayFilter(nativeGetSymbols(object), function(symbol) {
    return propertyIsEnumerable.call(object, symbol);
  });
};

module.exports = getSymbols;

},{"./_arrayFilter":"node_modules/lodash/_arrayFilter.js","./stubArray":"node_modules/lodash/stubArray.js"}],"node_modules/lodash/_getAllKeys.js":[function(require,module,exports) {
var baseGetAllKeys = require('./_baseGetAllKeys'),
    getSymbols = require('./_getSymbols'),
    keys = require('./keys');

/**
 * Creates an array of own enumerable property names and symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names and symbols.
 */
function getAllKeys(object) {
  return baseGetAllKeys(object, keys, getSymbols);
}

module.exports = getAllKeys;

},{"./_baseGetAllKeys":"node_modules/lodash/_baseGetAllKeys.js","./_getSymbols":"node_modules/lodash/_getSymbols.js","./keys":"node_modules/lodash/keys.js"}],"node_modules/lodash/_equalObjects.js":[function(require,module,exports) {
var getAllKeys = require('./_getAllKeys');

/** Used to compose bitmasks for value comparisons. */
var COMPARE_PARTIAL_FLAG = 1;

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * A specialized version of `baseIsEqualDeep` for objects with support for
 * partial deep comparisons.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} stack Tracks traversed `object` and `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function equalObjects(object, other, bitmask, customizer, equalFunc, stack) {
  var isPartial = bitmask & COMPARE_PARTIAL_FLAG,
      objProps = getAllKeys(object),
      objLength = objProps.length,
      othProps = getAllKeys(other),
      othLength = othProps.length;

  if (objLength != othLength && !isPartial) {
    return false;
  }
  var index = objLength;
  while (index--) {
    var key = objProps[index];
    if (!(isPartial ? key in other : hasOwnProperty.call(other, key))) {
      return false;
    }
  }
  // Assume cyclic values are equal.
  var stacked = stack.get(object);
  if (stacked && stack.get(other)) {
    return stacked == other;
  }
  var result = true;
  stack.set(object, other);
  stack.set(other, object);

  var skipCtor = isPartial;
  while (++index < objLength) {
    key = objProps[index];
    var objValue = object[key],
        othValue = other[key];

    if (customizer) {
      var compared = isPartial
        ? customizer(othValue, objValue, key, other, object, stack)
        : customizer(objValue, othValue, key, object, other, stack);
    }
    // Recursively compare objects (susceptible to call stack limits).
    if (!(compared === undefined
          ? (objValue === othValue || equalFunc(objValue, othValue, bitmask, customizer, stack))
          : compared
        )) {
      result = false;
      break;
    }
    skipCtor || (skipCtor = key == 'constructor');
  }
  if (result && !skipCtor) {
    var objCtor = object.constructor,
        othCtor = other.constructor;

    // Non `Object` object instances with different constructors are not equal.
    if (objCtor != othCtor &&
        ('constructor' in object && 'constructor' in other) &&
        !(typeof objCtor == 'function' && objCtor instanceof objCtor &&
          typeof othCtor == 'function' && othCtor instanceof othCtor)) {
      result = false;
    }
  }
  stack['delete'](object);
  stack['delete'](other);
  return result;
}

module.exports = equalObjects;

},{"./_getAllKeys":"node_modules/lodash/_getAllKeys.js"}],"node_modules/lodash/_DataView.js":[function(require,module,exports) {
var getNative = require('./_getNative'),
    root = require('./_root');

/* Built-in method references that are verified to be native. */
var DataView = getNative(root, 'DataView');

module.exports = DataView;

},{"./_getNative":"node_modules/lodash/_getNative.js","./_root":"node_modules/lodash/_root.js"}],"node_modules/lodash/_Promise.js":[function(require,module,exports) {
var getNative = require('./_getNative'),
    root = require('./_root');

/* Built-in method references that are verified to be native. */
var Promise = getNative(root, 'Promise');

module.exports = Promise;

},{"./_getNative":"node_modules/lodash/_getNative.js","./_root":"node_modules/lodash/_root.js"}],"node_modules/lodash/_WeakMap.js":[function(require,module,exports) {
var getNative = require('./_getNative'),
    root = require('./_root');

/* Built-in method references that are verified to be native. */
var WeakMap = getNative(root, 'WeakMap');

module.exports = WeakMap;

},{"./_getNative":"node_modules/lodash/_getNative.js","./_root":"node_modules/lodash/_root.js"}],"node_modules/lodash/_getTag.js":[function(require,module,exports) {
var DataView = require('./_DataView'),
    Map = require('./_Map'),
    Promise = require('./_Promise'),
    Set = require('./_Set'),
    WeakMap = require('./_WeakMap'),
    baseGetTag = require('./_baseGetTag'),
    toSource = require('./_toSource');

/** `Object#toString` result references. */
var mapTag = '[object Map]',
    objectTag = '[object Object]',
    promiseTag = '[object Promise]',
    setTag = '[object Set]',
    weakMapTag = '[object WeakMap]';

var dataViewTag = '[object DataView]';

/** Used to detect maps, sets, and weakmaps. */
var dataViewCtorString = toSource(DataView),
    mapCtorString = toSource(Map),
    promiseCtorString = toSource(Promise),
    setCtorString = toSource(Set),
    weakMapCtorString = toSource(WeakMap);

/**
 * Gets the `toStringTag` of `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
var getTag = baseGetTag;

// Fallback for data views, maps, sets, and weak maps in IE 11 and promises in Node.js < 6.
if ((DataView && getTag(new DataView(new ArrayBuffer(1))) != dataViewTag) ||
    (Map && getTag(new Map) != mapTag) ||
    (Promise && getTag(Promise.resolve()) != promiseTag) ||
    (Set && getTag(new Set) != setTag) ||
    (WeakMap && getTag(new WeakMap) != weakMapTag)) {
  getTag = function(value) {
    var result = baseGetTag(value),
        Ctor = result == objectTag ? value.constructor : undefined,
        ctorString = Ctor ? toSource(Ctor) : '';

    if (ctorString) {
      switch (ctorString) {
        case dataViewCtorString: return dataViewTag;
        case mapCtorString: return mapTag;
        case promiseCtorString: return promiseTag;
        case setCtorString: return setTag;
        case weakMapCtorString: return weakMapTag;
      }
    }
    return result;
  };
}

module.exports = getTag;

},{"./_DataView":"node_modules/lodash/_DataView.js","./_Map":"node_modules/lodash/_Map.js","./_Promise":"node_modules/lodash/_Promise.js","./_Set":"node_modules/lodash/_Set.js","./_WeakMap":"node_modules/lodash/_WeakMap.js","./_baseGetTag":"node_modules/lodash/_baseGetTag.js","./_toSource":"node_modules/lodash/_toSource.js"}],"node_modules/lodash/_baseIsEqualDeep.js":[function(require,module,exports) {
var Stack = require('./_Stack'),
    equalArrays = require('./_equalArrays'),
    equalByTag = require('./_equalByTag'),
    equalObjects = require('./_equalObjects'),
    getTag = require('./_getTag'),
    isArray = require('./isArray'),
    isBuffer = require('./isBuffer'),
    isTypedArray = require('./isTypedArray');

/** Used to compose bitmasks for value comparisons. */
var COMPARE_PARTIAL_FLAG = 1;

/** `Object#toString` result references. */
var argsTag = '[object Arguments]',
    arrayTag = '[object Array]',
    objectTag = '[object Object]';

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * A specialized version of `baseIsEqual` for arrays and objects which performs
 * deep comparisons and tracks traversed objects enabling objects with circular
 * references to be compared.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} [stack] Tracks traversed `object` and `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function baseIsEqualDeep(object, other, bitmask, customizer, equalFunc, stack) {
  var objIsArr = isArray(object),
      othIsArr = isArray(other),
      objTag = objIsArr ? arrayTag : getTag(object),
      othTag = othIsArr ? arrayTag : getTag(other);

  objTag = objTag == argsTag ? objectTag : objTag;
  othTag = othTag == argsTag ? objectTag : othTag;

  var objIsObj = objTag == objectTag,
      othIsObj = othTag == objectTag,
      isSameTag = objTag == othTag;

  if (isSameTag && isBuffer(object)) {
    if (!isBuffer(other)) {
      return false;
    }
    objIsArr = true;
    objIsObj = false;
  }
  if (isSameTag && !objIsObj) {
    stack || (stack = new Stack);
    return (objIsArr || isTypedArray(object))
      ? equalArrays(object, other, bitmask, customizer, equalFunc, stack)
      : equalByTag(object, other, objTag, bitmask, customizer, equalFunc, stack);
  }
  if (!(bitmask & COMPARE_PARTIAL_FLAG)) {
    var objIsWrapped = objIsObj && hasOwnProperty.call(object, '__wrapped__'),
        othIsWrapped = othIsObj && hasOwnProperty.call(other, '__wrapped__');

    if (objIsWrapped || othIsWrapped) {
      var objUnwrapped = objIsWrapped ? object.value() : object,
          othUnwrapped = othIsWrapped ? other.value() : other;

      stack || (stack = new Stack);
      return equalFunc(objUnwrapped, othUnwrapped, bitmask, customizer, stack);
    }
  }
  if (!isSameTag) {
    return false;
  }
  stack || (stack = new Stack);
  return equalObjects(object, other, bitmask, customizer, equalFunc, stack);
}

module.exports = baseIsEqualDeep;

},{"./_Stack":"node_modules/lodash/_Stack.js","./_equalArrays":"node_modules/lodash/_equalArrays.js","./_equalByTag":"node_modules/lodash/_equalByTag.js","./_equalObjects":"node_modules/lodash/_equalObjects.js","./_getTag":"node_modules/lodash/_getTag.js","./isArray":"node_modules/lodash/isArray.js","./isBuffer":"node_modules/lodash/isBuffer.js","./isTypedArray":"node_modules/lodash/isTypedArray.js"}],"node_modules/lodash/_baseIsEqual.js":[function(require,module,exports) {
var baseIsEqualDeep = require('./_baseIsEqualDeep'),
    isObjectLike = require('./isObjectLike');

/**
 * The base implementation of `_.isEqual` which supports partial comparisons
 * and tracks traversed objects.
 *
 * @private
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @param {boolean} bitmask The bitmask flags.
 *  1 - Unordered comparison
 *  2 - Partial comparison
 * @param {Function} [customizer] The function to customize comparisons.
 * @param {Object} [stack] Tracks traversed `value` and `other` objects.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 */
function baseIsEqual(value, other, bitmask, customizer, stack) {
  if (value === other) {
    return true;
  }
  if (value == null || other == null || (!isObjectLike(value) && !isObjectLike(other))) {
    return value !== value && other !== other;
  }
  return baseIsEqualDeep(value, other, bitmask, customizer, baseIsEqual, stack);
}

module.exports = baseIsEqual;

},{"./_baseIsEqualDeep":"node_modules/lodash/_baseIsEqualDeep.js","./isObjectLike":"node_modules/lodash/isObjectLike.js"}],"node_modules/lodash/_baseIsMatch.js":[function(require,module,exports) {
var Stack = require('./_Stack'),
    baseIsEqual = require('./_baseIsEqual');

/** Used to compose bitmasks for value comparisons. */
var COMPARE_PARTIAL_FLAG = 1,
    COMPARE_UNORDERED_FLAG = 2;

/**
 * The base implementation of `_.isMatch` without support for iteratee shorthands.
 *
 * @private
 * @param {Object} object The object to inspect.
 * @param {Object} source The object of property values to match.
 * @param {Array} matchData The property names, values, and compare flags to match.
 * @param {Function} [customizer] The function to customize comparisons.
 * @returns {boolean} Returns `true` if `object` is a match, else `false`.
 */
function baseIsMatch(object, source, matchData, customizer) {
  var index = matchData.length,
      length = index,
      noCustomizer = !customizer;

  if (object == null) {
    return !length;
  }
  object = Object(object);
  while (index--) {
    var data = matchData[index];
    if ((noCustomizer && data[2])
          ? data[1] !== object[data[0]]
          : !(data[0] in object)
        ) {
      return false;
    }
  }
  while (++index < length) {
    data = matchData[index];
    var key = data[0],
        objValue = object[key],
        srcValue = data[1];

    if (noCustomizer && data[2]) {
      if (objValue === undefined && !(key in object)) {
        return false;
      }
    } else {
      var stack = new Stack;
      if (customizer) {
        var result = customizer(objValue, srcValue, key, object, source, stack);
      }
      if (!(result === undefined
            ? baseIsEqual(srcValue, objValue, COMPARE_PARTIAL_FLAG | COMPARE_UNORDERED_FLAG, customizer, stack)
            : result
          )) {
        return false;
      }
    }
  }
  return true;
}

module.exports = baseIsMatch;

},{"./_Stack":"node_modules/lodash/_Stack.js","./_baseIsEqual":"node_modules/lodash/_baseIsEqual.js"}],"node_modules/lodash/_isStrictComparable.js":[function(require,module,exports) {
var isObject = require('./isObject');

/**
 * Checks if `value` is suitable for strict equality comparisons, i.e. `===`.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` if suitable for strict
 *  equality comparisons, else `false`.
 */
function isStrictComparable(value) {
  return value === value && !isObject(value);
}

module.exports = isStrictComparable;

},{"./isObject":"node_modules/lodash/isObject.js"}],"node_modules/lodash/_getMatchData.js":[function(require,module,exports) {
var isStrictComparable = require('./_isStrictComparable'),
    keys = require('./keys');

/**
 * Gets the property names, values, and compare flags of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the match data of `object`.
 */
function getMatchData(object) {
  var result = keys(object),
      length = result.length;

  while (length--) {
    var key = result[length],
        value = object[key];

    result[length] = [key, value, isStrictComparable(value)];
  }
  return result;
}

module.exports = getMatchData;

},{"./_isStrictComparable":"node_modules/lodash/_isStrictComparable.js","./keys":"node_modules/lodash/keys.js"}],"node_modules/lodash/_matchesStrictComparable.js":[function(require,module,exports) {
/**
 * A specialized version of `matchesProperty` for source values suitable
 * for strict equality comparisons, i.e. `===`.
 *
 * @private
 * @param {string} key The key of the property to get.
 * @param {*} srcValue The value to match.
 * @returns {Function} Returns the new spec function.
 */
function matchesStrictComparable(key, srcValue) {
  return function(object) {
    if (object == null) {
      return false;
    }
    return object[key] === srcValue &&
      (srcValue !== undefined || (key in Object(object)));
  };
}

module.exports = matchesStrictComparable;

},{}],"node_modules/lodash/_baseMatches.js":[function(require,module,exports) {
var baseIsMatch = require('./_baseIsMatch'),
    getMatchData = require('./_getMatchData'),
    matchesStrictComparable = require('./_matchesStrictComparable');

/**
 * The base implementation of `_.matches` which doesn't clone `source`.
 *
 * @private
 * @param {Object} source The object of property values to match.
 * @returns {Function} Returns the new spec function.
 */
function baseMatches(source) {
  var matchData = getMatchData(source);
  if (matchData.length == 1 && matchData[0][2]) {
    return matchesStrictComparable(matchData[0][0], matchData[0][1]);
  }
  return function(object) {
    return object === source || baseIsMatch(object, source, matchData);
  };
}

module.exports = baseMatches;

},{"./_baseIsMatch":"node_modules/lodash/_baseIsMatch.js","./_getMatchData":"node_modules/lodash/_getMatchData.js","./_matchesStrictComparable":"node_modules/lodash/_matchesStrictComparable.js"}],"node_modules/lodash/_isKey.js":[function(require,module,exports) {
var isArray = require('./isArray'),
    isSymbol = require('./isSymbol');

/** Used to match property names within property paths. */
var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
    reIsPlainProp = /^\w*$/;

/**
 * Checks if `value` is a property name and not a property path.
 *
 * @private
 * @param {*} value The value to check.
 * @param {Object} [object] The object to query keys on.
 * @returns {boolean} Returns `true` if `value` is a property name, else `false`.
 */
function isKey(value, object) {
  if (isArray(value)) {
    return false;
  }
  var type = typeof value;
  if (type == 'number' || type == 'symbol' || type == 'boolean' ||
      value == null || isSymbol(value)) {
    return true;
  }
  return reIsPlainProp.test(value) || !reIsDeepProp.test(value) ||
    (object != null && value in Object(object));
}

module.exports = isKey;

},{"./isArray":"node_modules/lodash/isArray.js","./isSymbol":"node_modules/lodash/isSymbol.js"}],"node_modules/lodash/memoize.js":[function(require,module,exports) {
var MapCache = require('./_MapCache');

/** Error message constants. */
var FUNC_ERROR_TEXT = 'Expected a function';

/**
 * Creates a function that memoizes the result of `func`. If `resolver` is
 * provided, it determines the cache key for storing the result based on the
 * arguments provided to the memoized function. By default, the first argument
 * provided to the memoized function is used as the map cache key. The `func`
 * is invoked with the `this` binding of the memoized function.
 *
 * **Note:** The cache is exposed as the `cache` property on the memoized
 * function. Its creation may be customized by replacing the `_.memoize.Cache`
 * constructor with one whose instances implement the
 * [`Map`](http://ecma-international.org/ecma-262/7.0/#sec-properties-of-the-map-prototype-object)
 * method interface of `clear`, `delete`, `get`, `has`, and `set`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to have its output memoized.
 * @param {Function} [resolver] The function to resolve the cache key.
 * @returns {Function} Returns the new memoized function.
 * @example
 *
 * var object = { 'a': 1, 'b': 2 };
 * var other = { 'c': 3, 'd': 4 };
 *
 * var values = _.memoize(_.values);
 * values(object);
 * // => [1, 2]
 *
 * values(other);
 * // => [3, 4]
 *
 * object.a = 2;
 * values(object);
 * // => [1, 2]
 *
 * // Modify the result cache.
 * values.cache.set(object, ['a', 'b']);
 * values(object);
 * // => ['a', 'b']
 *
 * // Replace `_.memoize.Cache`.
 * _.memoize.Cache = WeakMap;
 */
function memoize(func, resolver) {
  if (typeof func != 'function' || (resolver != null && typeof resolver != 'function')) {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  var memoized = function() {
    var args = arguments,
        key = resolver ? resolver.apply(this, args) : args[0],
        cache = memoized.cache;

    if (cache.has(key)) {
      return cache.get(key);
    }
    var result = func.apply(this, args);
    memoized.cache = cache.set(key, result) || cache;
    return result;
  };
  memoized.cache = new (memoize.Cache || MapCache);
  return memoized;
}

// Expose `MapCache`.
memoize.Cache = MapCache;

module.exports = memoize;

},{"./_MapCache":"node_modules/lodash/_MapCache.js"}],"node_modules/lodash/_memoizeCapped.js":[function(require,module,exports) {
var memoize = require('./memoize');

/** Used as the maximum memoize cache size. */
var MAX_MEMOIZE_SIZE = 500;

/**
 * A specialized version of `_.memoize` which clears the memoized function's
 * cache when it exceeds `MAX_MEMOIZE_SIZE`.
 *
 * @private
 * @param {Function} func The function to have its output memoized.
 * @returns {Function} Returns the new memoized function.
 */
function memoizeCapped(func) {
  var result = memoize(func, function(key) {
    if (cache.size === MAX_MEMOIZE_SIZE) {
      cache.clear();
    }
    return key;
  });

  var cache = result.cache;
  return result;
}

module.exports = memoizeCapped;

},{"./memoize":"node_modules/lodash/memoize.js"}],"node_modules/lodash/_stringToPath.js":[function(require,module,exports) {
var memoizeCapped = require('./_memoizeCapped');

/** Used to match property names within property paths. */
var rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;

/** Used to match backslashes in property paths. */
var reEscapeChar = /\\(\\)?/g;

/**
 * Converts `string` to a property path array.
 *
 * @private
 * @param {string} string The string to convert.
 * @returns {Array} Returns the property path array.
 */
var stringToPath = memoizeCapped(function(string) {
  var result = [];
  if (string.charCodeAt(0) === 46 /* . */) {
    result.push('');
  }
  string.replace(rePropName, function(match, number, quote, subString) {
    result.push(quote ? subString.replace(reEscapeChar, '$1') : (number || match));
  });
  return result;
});

module.exports = stringToPath;

},{"./_memoizeCapped":"node_modules/lodash/_memoizeCapped.js"}],"node_modules/lodash/_castPath.js":[function(require,module,exports) {
var isArray = require('./isArray'),
    isKey = require('./_isKey'),
    stringToPath = require('./_stringToPath'),
    toString = require('./toString');

/**
 * Casts `value` to a path array if it's not one.
 *
 * @private
 * @param {*} value The value to inspect.
 * @param {Object} [object] The object to query keys on.
 * @returns {Array} Returns the cast property path array.
 */
function castPath(value, object) {
  if (isArray(value)) {
    return value;
  }
  return isKey(value, object) ? [value] : stringToPath(toString(value));
}

module.exports = castPath;

},{"./isArray":"node_modules/lodash/isArray.js","./_isKey":"node_modules/lodash/_isKey.js","./_stringToPath":"node_modules/lodash/_stringToPath.js","./toString":"node_modules/lodash/toString.js"}],"node_modules/lodash/_toKey.js":[function(require,module,exports) {
var isSymbol = require('./isSymbol');

/** Used as references for various `Number` constants. */
var INFINITY = 1 / 0;

/**
 * Converts `value` to a string key if it's not a string or symbol.
 *
 * @private
 * @param {*} value The value to inspect.
 * @returns {string|symbol} Returns the key.
 */
function toKey(value) {
  if (typeof value == 'string' || isSymbol(value)) {
    return value;
  }
  var result = (value + '');
  return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
}

module.exports = toKey;

},{"./isSymbol":"node_modules/lodash/isSymbol.js"}],"node_modules/lodash/_baseGet.js":[function(require,module,exports) {
var castPath = require('./_castPath'),
    toKey = require('./_toKey');

/**
 * The base implementation of `_.get` without support for default values.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Array|string} path The path of the property to get.
 * @returns {*} Returns the resolved value.
 */
function baseGet(object, path) {
  path = castPath(path, object);

  var index = 0,
      length = path.length;

  while (object != null && index < length) {
    object = object[toKey(path[index++])];
  }
  return (index && index == length) ? object : undefined;
}

module.exports = baseGet;

},{"./_castPath":"node_modules/lodash/_castPath.js","./_toKey":"node_modules/lodash/_toKey.js"}],"node_modules/lodash/get.js":[function(require,module,exports) {
var baseGet = require('./_baseGet');

/**
 * Gets the value at `path` of `object`. If the resolved value is
 * `undefined`, the `defaultValue` is returned in its place.
 *
 * @static
 * @memberOf _
 * @since 3.7.0
 * @category Object
 * @param {Object} object The object to query.
 * @param {Array|string} path The path of the property to get.
 * @param {*} [defaultValue] The value returned for `undefined` resolved values.
 * @returns {*} Returns the resolved value.
 * @example
 *
 * var object = { 'a': [{ 'b': { 'c': 3 } }] };
 *
 * _.get(object, 'a[0].b.c');
 * // => 3
 *
 * _.get(object, ['a', '0', 'b', 'c']);
 * // => 3
 *
 * _.get(object, 'a.b.c', 'default');
 * // => 'default'
 */
function get(object, path, defaultValue) {
  var result = object == null ? undefined : baseGet(object, path);
  return result === undefined ? defaultValue : result;
}

module.exports = get;

},{"./_baseGet":"node_modules/lodash/_baseGet.js"}],"node_modules/lodash/_baseHasIn.js":[function(require,module,exports) {
/**
 * The base implementation of `_.hasIn` without support for deep paths.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {Array|string} key The key to check.
 * @returns {boolean} Returns `true` if `key` exists, else `false`.
 */
function baseHasIn(object, key) {
  return object != null && key in Object(object);
}

module.exports = baseHasIn;

},{}],"node_modules/lodash/_hasPath.js":[function(require,module,exports) {
var castPath = require('./_castPath'),
    isArguments = require('./isArguments'),
    isArray = require('./isArray'),
    isIndex = require('./_isIndex'),
    isLength = require('./isLength'),
    toKey = require('./_toKey');

/**
 * Checks if `path` exists on `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Array|string} path The path to check.
 * @param {Function} hasFunc The function to check properties.
 * @returns {boolean} Returns `true` if `path` exists, else `false`.
 */
function hasPath(object, path, hasFunc) {
  path = castPath(path, object);

  var index = -1,
      length = path.length,
      result = false;

  while (++index < length) {
    var key = toKey(path[index]);
    if (!(result = object != null && hasFunc(object, key))) {
      break;
    }
    object = object[key];
  }
  if (result || ++index != length) {
    return result;
  }
  length = object == null ? 0 : object.length;
  return !!length && isLength(length) && isIndex(key, length) &&
    (isArray(object) || isArguments(object));
}

module.exports = hasPath;

},{"./_castPath":"node_modules/lodash/_castPath.js","./isArguments":"node_modules/lodash/isArguments.js","./isArray":"node_modules/lodash/isArray.js","./_isIndex":"node_modules/lodash/_isIndex.js","./isLength":"node_modules/lodash/isLength.js","./_toKey":"node_modules/lodash/_toKey.js"}],"node_modules/lodash/hasIn.js":[function(require,module,exports) {
var baseHasIn = require('./_baseHasIn'),
    hasPath = require('./_hasPath');

/**
 * Checks if `path` is a direct or inherited property of `object`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Object
 * @param {Object} object The object to query.
 * @param {Array|string} path The path to check.
 * @returns {boolean} Returns `true` if `path` exists, else `false`.
 * @example
 *
 * var object = _.create({ 'a': _.create({ 'b': 2 }) });
 *
 * _.hasIn(object, 'a');
 * // => true
 *
 * _.hasIn(object, 'a.b');
 * // => true
 *
 * _.hasIn(object, ['a', 'b']);
 * // => true
 *
 * _.hasIn(object, 'b');
 * // => false
 */
function hasIn(object, path) {
  return object != null && hasPath(object, path, baseHasIn);
}

module.exports = hasIn;

},{"./_baseHasIn":"node_modules/lodash/_baseHasIn.js","./_hasPath":"node_modules/lodash/_hasPath.js"}],"node_modules/lodash/_baseMatchesProperty.js":[function(require,module,exports) {
var baseIsEqual = require('./_baseIsEqual'),
    get = require('./get'),
    hasIn = require('./hasIn'),
    isKey = require('./_isKey'),
    isStrictComparable = require('./_isStrictComparable'),
    matchesStrictComparable = require('./_matchesStrictComparable'),
    toKey = require('./_toKey');

/** Used to compose bitmasks for value comparisons. */
var COMPARE_PARTIAL_FLAG = 1,
    COMPARE_UNORDERED_FLAG = 2;

/**
 * The base implementation of `_.matchesProperty` which doesn't clone `srcValue`.
 *
 * @private
 * @param {string} path The path of the property to get.
 * @param {*} srcValue The value to match.
 * @returns {Function} Returns the new spec function.
 */
function baseMatchesProperty(path, srcValue) {
  if (isKey(path) && isStrictComparable(srcValue)) {
    return matchesStrictComparable(toKey(path), srcValue);
  }
  return function(object) {
    var objValue = get(object, path);
    return (objValue === undefined && objValue === srcValue)
      ? hasIn(object, path)
      : baseIsEqual(srcValue, objValue, COMPARE_PARTIAL_FLAG | COMPARE_UNORDERED_FLAG);
  };
}

module.exports = baseMatchesProperty;

},{"./_baseIsEqual":"node_modules/lodash/_baseIsEqual.js","./get":"node_modules/lodash/get.js","./hasIn":"node_modules/lodash/hasIn.js","./_isKey":"node_modules/lodash/_isKey.js","./_isStrictComparable":"node_modules/lodash/_isStrictComparable.js","./_matchesStrictComparable":"node_modules/lodash/_matchesStrictComparable.js","./_toKey":"node_modules/lodash/_toKey.js"}],"node_modules/lodash/identity.js":[function(require,module,exports) {
/**
 * This method returns the first argument it receives.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Util
 * @param {*} value Any value.
 * @returns {*} Returns `value`.
 * @example
 *
 * var object = { 'a': 1 };
 *
 * console.log(_.identity(object) === object);
 * // => true
 */
function identity(value) {
  return value;
}

module.exports = identity;

},{}],"node_modules/lodash/_baseProperty.js":[function(require,module,exports) {
/**
 * The base implementation of `_.property` without support for deep paths.
 *
 * @private
 * @param {string} key The key of the property to get.
 * @returns {Function} Returns the new accessor function.
 */
function baseProperty(key) {
  return function(object) {
    return object == null ? undefined : object[key];
  };
}

module.exports = baseProperty;

},{}],"node_modules/lodash/_basePropertyDeep.js":[function(require,module,exports) {
var baseGet = require('./_baseGet');

/**
 * A specialized version of `baseProperty` which supports deep paths.
 *
 * @private
 * @param {Array|string} path The path of the property to get.
 * @returns {Function} Returns the new accessor function.
 */
function basePropertyDeep(path) {
  return function(object) {
    return baseGet(object, path);
  };
}

module.exports = basePropertyDeep;

},{"./_baseGet":"node_modules/lodash/_baseGet.js"}],"node_modules/lodash/property.js":[function(require,module,exports) {
var baseProperty = require('./_baseProperty'),
    basePropertyDeep = require('./_basePropertyDeep'),
    isKey = require('./_isKey'),
    toKey = require('./_toKey');

/**
 * Creates a function that returns the value at `path` of a given object.
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Util
 * @param {Array|string} path The path of the property to get.
 * @returns {Function} Returns the new accessor function.
 * @example
 *
 * var objects = [
 *   { 'a': { 'b': 2 } },
 *   { 'a': { 'b': 1 } }
 * ];
 *
 * _.map(objects, _.property('a.b'));
 * // => [2, 1]
 *
 * _.map(_.sortBy(objects, _.property(['a', 'b'])), 'a.b');
 * // => [1, 2]
 */
function property(path) {
  return isKey(path) ? baseProperty(toKey(path)) : basePropertyDeep(path);
}

module.exports = property;

},{"./_baseProperty":"node_modules/lodash/_baseProperty.js","./_basePropertyDeep":"node_modules/lodash/_basePropertyDeep.js","./_isKey":"node_modules/lodash/_isKey.js","./_toKey":"node_modules/lodash/_toKey.js"}],"node_modules/lodash/_baseIteratee.js":[function(require,module,exports) {
var baseMatches = require('./_baseMatches'),
    baseMatchesProperty = require('./_baseMatchesProperty'),
    identity = require('./identity'),
    isArray = require('./isArray'),
    property = require('./property');

/**
 * The base implementation of `_.iteratee`.
 *
 * @private
 * @param {*} [value=_.identity] The value to convert to an iteratee.
 * @returns {Function} Returns the iteratee.
 */
function baseIteratee(value) {
  // Don't store the `typeof` result in a variable to avoid a JIT bug in Safari 9.
  // See https://bugs.webkit.org/show_bug.cgi?id=156034 for more details.
  if (typeof value == 'function') {
    return value;
  }
  if (value == null) {
    return identity;
  }
  if (typeof value == 'object') {
    return isArray(value)
      ? baseMatchesProperty(value[0], value[1])
      : baseMatches(value);
  }
  return property(value);
}

module.exports = baseIteratee;

},{"./_baseMatches":"node_modules/lodash/_baseMatches.js","./_baseMatchesProperty":"node_modules/lodash/_baseMatchesProperty.js","./identity":"node_modules/lodash/identity.js","./isArray":"node_modules/lodash/isArray.js","./property":"node_modules/lodash/property.js"}],"node_modules/lodash/mapValues.js":[function(require,module,exports) {
var baseAssignValue = require('./_baseAssignValue'),
    baseForOwn = require('./_baseForOwn'),
    baseIteratee = require('./_baseIteratee');

/**
 * Creates an object with the same keys as `object` and values generated
 * by running each own enumerable string keyed property of `object` thru
 * `iteratee`. The iteratee is invoked with three arguments:
 * (value, key, object).
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Object
 * @param {Object} object The object to iterate over.
 * @param {Function} [iteratee=_.identity] The function invoked per iteration.
 * @returns {Object} Returns the new mapped object.
 * @see _.mapKeys
 * @example
 *
 * var users = {
 *   'fred':    { 'user': 'fred',    'age': 40 },
 *   'pebbles': { 'user': 'pebbles', 'age': 1 }
 * };
 *
 * _.mapValues(users, function(o) { return o.age; });
 * // => { 'fred': 40, 'pebbles': 1 } (iteration order is not guaranteed)
 *
 * // The `_.property` iteratee shorthand.
 * _.mapValues(users, 'age');
 * // => { 'fred': 40, 'pebbles': 1 } (iteration order is not guaranteed)
 */
function mapValues(object, iteratee) {
  var result = {};
  iteratee = baseIteratee(iteratee, 3);

  baseForOwn(object, function(value, key, object) {
    baseAssignValue(result, key, iteratee(value, key, object));
  });
  return result;
}

module.exports = mapValues;

},{"./_baseAssignValue":"node_modules/lodash/_baseAssignValue.js","./_baseForOwn":"node_modules/lodash/_baseForOwn.js","./_baseIteratee":"node_modules/lodash/_baseIteratee.js"}],"node_modules/lodash/_baseDifference.js":[function(require,module,exports) {
var SetCache = require('./_SetCache'),
    arrayIncludes = require('./_arrayIncludes'),
    arrayIncludesWith = require('./_arrayIncludesWith'),
    arrayMap = require('./_arrayMap'),
    baseUnary = require('./_baseUnary'),
    cacheHas = require('./_cacheHas');

/** Used as the size to enable large array optimizations. */
var LARGE_ARRAY_SIZE = 200;

/**
 * The base implementation of methods like `_.difference` without support
 * for excluding multiple arrays or iteratee shorthands.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {Array} values The values to exclude.
 * @param {Function} [iteratee] The iteratee invoked per element.
 * @param {Function} [comparator] The comparator invoked per element.
 * @returns {Array} Returns the new array of filtered values.
 */
function baseDifference(array, values, iteratee, comparator) {
  var index = -1,
      includes = arrayIncludes,
      isCommon = true,
      length = array.length,
      result = [],
      valuesLength = values.length;

  if (!length) {
    return result;
  }
  if (iteratee) {
    values = arrayMap(values, baseUnary(iteratee));
  }
  if (comparator) {
    includes = arrayIncludesWith;
    isCommon = false;
  }
  else if (values.length >= LARGE_ARRAY_SIZE) {
    includes = cacheHas;
    isCommon = false;
    values = new SetCache(values);
  }
  outer:
  while (++index < length) {
    var value = array[index],
        computed = iteratee == null ? value : iteratee(value);

    value = (comparator || value !== 0) ? value : 0;
    if (isCommon && computed === computed) {
      var valuesIndex = valuesLength;
      while (valuesIndex--) {
        if (values[valuesIndex] === computed) {
          continue outer;
        }
      }
      result.push(value);
    }
    else if (!includes(values, computed, comparator)) {
      result.push(value);
    }
  }
  return result;
}

module.exports = baseDifference;

},{"./_SetCache":"node_modules/lodash/_SetCache.js","./_arrayIncludes":"node_modules/lodash/_arrayIncludes.js","./_arrayIncludesWith":"node_modules/lodash/_arrayIncludesWith.js","./_arrayMap":"node_modules/lodash/_arrayMap.js","./_baseUnary":"node_modules/lodash/_baseUnary.js","./_cacheHas":"node_modules/lodash/_cacheHas.js"}],"node_modules/lodash/_apply.js":[function(require,module,exports) {
/**
 * A faster alternative to `Function#apply`, this function invokes `func`
 * with the `this` binding of `thisArg` and the arguments of `args`.
 *
 * @private
 * @param {Function} func The function to invoke.
 * @param {*} thisArg The `this` binding of `func`.
 * @param {Array} args The arguments to invoke `func` with.
 * @returns {*} Returns the result of `func`.
 */
function apply(func, thisArg, args) {
  switch (args.length) {
    case 0: return func.call(thisArg);
    case 1: return func.call(thisArg, args[0]);
    case 2: return func.call(thisArg, args[0], args[1]);
    case 3: return func.call(thisArg, args[0], args[1], args[2]);
  }
  return func.apply(thisArg, args);
}

module.exports = apply;

},{}],"node_modules/lodash/_overRest.js":[function(require,module,exports) {
var apply = require('./_apply');

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max;

/**
 * A specialized version of `baseRest` which transforms the rest array.
 *
 * @private
 * @param {Function} func The function to apply a rest parameter to.
 * @param {number} [start=func.length-1] The start position of the rest parameter.
 * @param {Function} transform The rest array transform.
 * @returns {Function} Returns the new function.
 */
function overRest(func, start, transform) {
  start = nativeMax(start === undefined ? (func.length - 1) : start, 0);
  return function() {
    var args = arguments,
        index = -1,
        length = nativeMax(args.length - start, 0),
        array = Array(length);

    while (++index < length) {
      array[index] = args[start + index];
    }
    index = -1;
    var otherArgs = Array(start + 1);
    while (++index < start) {
      otherArgs[index] = args[index];
    }
    otherArgs[start] = transform(array);
    return apply(func, this, otherArgs);
  };
}

module.exports = overRest;

},{"./_apply":"node_modules/lodash/_apply.js"}],"node_modules/lodash/constant.js":[function(require,module,exports) {
/**
 * Creates a function that returns `value`.
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Util
 * @param {*} value The value to return from the new function.
 * @returns {Function} Returns the new constant function.
 * @example
 *
 * var objects = _.times(2, _.constant({ 'a': 1 }));
 *
 * console.log(objects);
 * // => [{ 'a': 1 }, { 'a': 1 }]
 *
 * console.log(objects[0] === objects[1]);
 * // => true
 */
function constant(value) {
  return function() {
    return value;
  };
}

module.exports = constant;

},{}],"node_modules/lodash/_baseSetToString.js":[function(require,module,exports) {
var constant = require('./constant'),
    defineProperty = require('./_defineProperty'),
    identity = require('./identity');

/**
 * The base implementation of `setToString` without support for hot loop shorting.
 *
 * @private
 * @param {Function} func The function to modify.
 * @param {Function} string The `toString` result.
 * @returns {Function} Returns `func`.
 */
var baseSetToString = !defineProperty ? identity : function(func, string) {
  return defineProperty(func, 'toString', {
    'configurable': true,
    'enumerable': false,
    'value': constant(string),
    'writable': true
  });
};

module.exports = baseSetToString;

},{"./constant":"node_modules/lodash/constant.js","./_defineProperty":"node_modules/lodash/_defineProperty.js","./identity":"node_modules/lodash/identity.js"}],"node_modules/lodash/_shortOut.js":[function(require,module,exports) {
/** Used to detect hot functions by number of calls within a span of milliseconds. */
var HOT_COUNT = 800,
    HOT_SPAN = 16;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeNow = Date.now;

/**
 * Creates a function that'll short out and invoke `identity` instead
 * of `func` when it's called `HOT_COUNT` or more times in `HOT_SPAN`
 * milliseconds.
 *
 * @private
 * @param {Function} func The function to restrict.
 * @returns {Function} Returns the new shortable function.
 */
function shortOut(func) {
  var count = 0,
      lastCalled = 0;

  return function() {
    var stamp = nativeNow(),
        remaining = HOT_SPAN - (stamp - lastCalled);

    lastCalled = stamp;
    if (remaining > 0) {
      if (++count >= HOT_COUNT) {
        return arguments[0];
      }
    } else {
      count = 0;
    }
    return func.apply(undefined, arguments);
  };
}

module.exports = shortOut;

},{}],"node_modules/lodash/_setToString.js":[function(require,module,exports) {
var baseSetToString = require('./_baseSetToString'),
    shortOut = require('./_shortOut');

/**
 * Sets the `toString` method of `func` to return `string`.
 *
 * @private
 * @param {Function} func The function to modify.
 * @param {Function} string The `toString` result.
 * @returns {Function} Returns `func`.
 */
var setToString = shortOut(baseSetToString);

module.exports = setToString;

},{"./_baseSetToString":"node_modules/lodash/_baseSetToString.js","./_shortOut":"node_modules/lodash/_shortOut.js"}],"node_modules/lodash/_baseRest.js":[function(require,module,exports) {
var identity = require('./identity'),
    overRest = require('./_overRest'),
    setToString = require('./_setToString');

/**
 * The base implementation of `_.rest` which doesn't validate or coerce arguments.
 *
 * @private
 * @param {Function} func The function to apply a rest parameter to.
 * @param {number} [start=func.length-1] The start position of the rest parameter.
 * @returns {Function} Returns the new function.
 */
function baseRest(func, start) {
  return setToString(overRest(func, start, identity), func + '');
}

module.exports = baseRest;

},{"./identity":"node_modules/lodash/identity.js","./_overRest":"node_modules/lodash/_overRest.js","./_setToString":"node_modules/lodash/_setToString.js"}],"node_modules/lodash/isArrayLikeObject.js":[function(require,module,exports) {
var isArrayLike = require('./isArrayLike'),
    isObjectLike = require('./isObjectLike');

/**
 * This method is like `_.isArrayLike` except that it also checks if `value`
 * is an object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array-like object,
 *  else `false`.
 * @example
 *
 * _.isArrayLikeObject([1, 2, 3]);
 * // => true
 *
 * _.isArrayLikeObject(document.body.children);
 * // => true
 *
 * _.isArrayLikeObject('abc');
 * // => false
 *
 * _.isArrayLikeObject(_.noop);
 * // => false
 */
function isArrayLikeObject(value) {
  return isObjectLike(value) && isArrayLike(value);
}

module.exports = isArrayLikeObject;

},{"./isArrayLike":"node_modules/lodash/isArrayLike.js","./isObjectLike":"node_modules/lodash/isObjectLike.js"}],"node_modules/lodash/without.js":[function(require,module,exports) {
var baseDifference = require('./_baseDifference'),
    baseRest = require('./_baseRest'),
    isArrayLikeObject = require('./isArrayLikeObject');

/**
 * Creates an array excluding all given values using
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * for equality comparisons.
 *
 * **Note:** Unlike `_.pull`, this method returns a new array.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Array
 * @param {Array} array The array to inspect.
 * @param {...*} [values] The values to exclude.
 * @returns {Array} Returns the new array of filtered values.
 * @see _.difference, _.xor
 * @example
 *
 * _.without([2, 1, 2, 3], 1, 2);
 * // => [3]
 */
var without = baseRest(function(array, values) {
  return isArrayLikeObject(array)
    ? baseDifference(array, values)
    : [];
});

module.exports = without;

},{"./_baseDifference":"node_modules/lodash/_baseDifference.js","./_baseRest":"node_modules/lodash/_baseRest.js","./isArrayLikeObject":"node_modules/lodash/isArrayLikeObject.js"}],"node_modules/semantic-ui-vue/dist/commonjs/modules/Popup/private/popupConstants.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var POSITIONS = exports.POSITIONS = ['top left', 'top right', 'bottom right', 'bottom left', 'right center', 'left center', 'top center', 'bottom center'];
},{}],"node_modules/semantic-ui-vue/dist/commonjs/modules/Popup/private/PopupContainer.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mapValues = require('lodash/mapValues');

var _mapValues2 = _interopRequireDefault(_mapValues);

var _without = require('lodash/without');

var _without2 = _interopRequireDefault(_without);

var _lib = require('../../../lib');

var _popupConstants = require('./popupConstants');

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

exports.default = {
  name: 'SuiPrivatePopupContainer',
  mixins: [_lib.SemanticUIVueMixin],
  props: {
    popupClass: String,
    triggerCoords: _lib.isBrowser ? [window.DOMRect, Object] : Object,
    position: String
  },
  data: function data() {
    return {
      mountedPosition: this.position,
      mountedStyle: null
    };
  },
  mounted: function mounted() {
    var _this = this;

    this.$nextTick(function () {
      _this.popupCoords = _this.$refs.container.getBoundingClientRect();

      _this.setPopupStyle();
    });
  },
  methods: {
    computePopupStyle: function computePopupStyle(positions) {
      var style = {
        position: 'absolute'
      }; // Do not access window/document when server side rendering

      if (!_lib.isBrowser) return style;
      var offset = this.offset;
      var _window = window,
          pageYOffset = _window.pageYOffset,
          pageXOffset = _window.pageXOffset;
      var _document$documentEle = document.documentElement,
          clientWidth = _document$documentEle.clientWidth,
          clientHeight = _document$documentEle.clientHeight;

      if (positions.includes('right')) {
        style.right = Math.round(clientWidth - (this.triggerCoords.right + pageXOffset));
        style.left = 'auto';
      } else if (positions.includes('left')) {
        style.left = Math.round(this.triggerCoords.left + pageXOffset);
        style.right = 'auto';
      } else {
        // if not left nor right, we are horizontally centering the element
        var xOffset = (this.triggerCoords.width - this.popupCoords.width) / 2;
        style.left = Math.round(this.triggerCoords.left + xOffset + pageXOffset);
        style.right = 'auto';
      }

      if (positions.includes('top')) {
        style.bottom = Math.round(clientHeight - (this.triggerCoords.top + pageYOffset));
        style.top = 'auto';
      } else if (positions.includes('bottom')) {
        style.top = Math.round(this.triggerCoords.bottom + pageYOffset);
        style.bottom = 'auto';
      } else {
        // if not top nor bottom, we are vertically centering the element
        var yOffset = (this.triggerCoords.height + this.popupCoords.height) / 2;
        style.top = Math.round(this.triggerCoords.bottom + pageYOffset - yOffset);
        style.bottom = 'auto';

        var _xOffset = this.popupCoords.width + 8;

        if (positions.includes('right')) {
          style.right -= _xOffset;
        } else {
          style.left -= _xOffset;
        }
      }

      if (offset) {
        if (typeof style.right === 'number') {
          style.right -= offset;
        } else {
          style.left -= offset;
        }
      }

      return style;
    },
    isStyleInViewport: function isStyleInViewport(style) {
      var _window2 = window,
          pageYOffset = _window2.pageYOffset,
          pageXOffset = _window2.pageXOffset;
      var _document$documentEle2 = document.documentElement,
          clientWidth = _document$documentEle2.clientWidth,
          clientHeight = _document$documentEle2.clientHeight;
      var element = {
        top: style.top,
        left: style.left,
        width: this.popupCoords.width,
        height: this.popupCoords.height
      };

      if (typeof style.right === 'number') {
        element.left = clientWidth - style.right - element.width;
      }

      if (typeof style.bottom === 'number') {
        element.top = clientHeight - style.bottom - element.height;
      } // hidden on top


      if (element.top < pageYOffset) return false; // hidden on the bottom

      if (element.top + element.height > pageYOffset + clientHeight) return false; // hidden the left

      if (element.left < pageXOffset) return false; // hidden on the right

      if (element.left + element.width > pageXOffset + clientWidth) return false;
      return true;
    },
    setPopupStyle: function setPopupStyle() {
      if (!this.triggerCoords || !this.popupCoords) return;
      var position = this.position;
      var style = this.computePopupStyle(position); // Lets detect if the popup is out of the viewport and adjust
      // the position accordingly

      var positions = (0, _without2.default)(_popupConstants.POSITIONS, position).concat([position]);

      for (var i = 0; !this.isStyleInViewport(style) && i < positions.length; i += 1) {
        style = this.computePopupStyle(positions[i]);
        position = positions[i];
      } // Append 'px' to every numerical values in the style


      style = (0, _mapValues2.default)(style, function (value) {
        return typeof value === 'number' ? value + 'px' : value;
      });
      this.mountedStyle = style;
      this.mountedPosition = position;
    }
  },
  render: function render() {
    var _this2 = this;

    var h = arguments[0];
    var className = this.classes('ui', this.mountedPosition, this.popupClass, 'popup', 'transition visible');
    return h('portal', {
      attrs: {
        to: 'semantic-ui-vue'
      }
    }, [h('div', {
      ref: 'container',
      'class': className,
      style: this.mountedStyle,
      on: {
        'mouseover': function mouseover() {
          return _this2.$emit('mouseover');
        },
        'mouseleave': function mouseleave() {
          return _this2.$emit('mouseleave');
        }
      }
    }, [this.$slots.default])]);
  }
};
},{"lodash/mapValues":"node_modules/lodash/mapValues.js","lodash/without":"node_modules/lodash/without.js","../../../lib":"node_modules/semantic-ui-vue/dist/commonjs/lib/index.js","./popupConstants":"node_modules/semantic-ui-vue/dist/commonjs/modules/Popup/private/popupConstants.js"}],"node_modules/semantic-ui-vue/dist/commonjs/modules/Popup/PopupHeader.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _babelHelperVueJsxMergeProps = require('babel-helper-vue-jsx-merge-props');

var _babelHelperVueJsxMergeProps2 = _interopRequireDefault(_babelHelperVueJsxMergeProps);

var _lib = require('../../lib');

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

exports.default = {
  name: 'SuiPopupHeader',
  mixins: [_lib.SemanticUIVueMixin],
  render: function render() {
    var h = arguments[0];
    var ElementType = this.getElementType();
    return h(ElementType, (0, _babelHelperVueJsxMergeProps2.default)([this.getChildPropsAndListeners(), {
      'class': 'header'
    }]), [this.$slots.default]);
  },
  meta: {
    parent: 'SuiPopup'
  }
};
},{"babel-helper-vue-jsx-merge-props":"node_modules/babel-helper-vue-jsx-merge-props/index.js","../../lib":"node_modules/semantic-ui-vue/dist/commonjs/lib/index.js"}],"node_modules/semantic-ui-vue/dist/commonjs/modules/Popup/PopupContent.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _babelHelperVueJsxMergeProps = require('babel-helper-vue-jsx-merge-props');

var _babelHelperVueJsxMergeProps2 = _interopRequireDefault(_babelHelperVueJsxMergeProps);

var _lib = require('../../lib');

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

exports.default = {
  name: 'SuiPopupContent',
  mixins: [_lib.SemanticUIVueMixin],
  render: function render() {
    var h = arguments[0];
    var ElementType = this.getElementType();
    return h(ElementType, (0, _babelHelperVueJsxMergeProps2.default)([this.getChildPropsAndListeners(), {
      'class': 'content'
    }]), [this.$slots.default]);
  },
  meta: {
    parent: 'SuiPopup'
  }
};
},{"babel-helper-vue-jsx-merge-props":"node_modules/babel-helper-vue-jsx-merge-props/index.js","../../lib":"node_modules/semantic-ui-vue/dist/commonjs/lib/index.js"}],"node_modules/semantic-ui-vue/dist/commonjs/modules/Popup/Popup.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _VFragment = require('../../lib/VFragment');

var _VFragment2 = _interopRequireDefault(_VFragment);

var _lib = require('../../lib');

var _PropTypes = require('../../lib/PropTypes');

var _PopupContainer = require('./private/PopupContainer');

var _PopupContainer2 = _interopRequireDefault(_PopupContainer);

var _popupConstants = require('./private/popupConstants');

var _PopupHeader = require('./PopupHeader');

var _PopupHeader2 = _interopRequireDefault(_PopupHeader);

var _PopupContent = require('./PopupContent');

var _PopupContent2 = _interopRequireDefault(_PopupContent);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

var HOVERABLE_BLUR_DELAY = 300;
exports.default = {
  name: 'SuiPopup',
  description: 'A popup displays additional information on top of a page.',
  mixins: [_lib.SemanticUIVueMixin],
  props: {
    basic: {
      type: Boolean,
      description: 'Display the popup without the pointing arrow.'
    },
    content: {
      type: String,
      description: 'Simple text content for the popover.'
    },
    flowing: {
      type: Boolean,
      description: 'A flowing Popup has no maximum width and continues to flow to fit its content.'
    },
    header: {
      type: String,
      description: 'Header displayed above the content in bold.'
    },
    hoverable: {
      type: Boolean,
      description: 'Whether the popup should not close on hover.'
    },
    inverted: {
      type: Boolean,
      description: 'Invert the colors of the Popup.'
    },
    position: (0, _PropTypes.Enum)(_popupConstants.POSITIONS, {
      description: 'Position for the popover.',
      default: 'top left'
    }),
    size: (0, _PropTypes.Enum)(['mini', 'tiny', 'small', 'large', 'huge'], {
      description: 'Popup size.'
    }),
    wide: (0, _PropTypes.Enum)(['wide'], {
      type: Boolean,
      description: 'Popup width.'
    })
  },
  data: function data() {
    return {
      coords: null,
      open: false
    };
  },
  mounted: function mounted() {
    this.$slots.trigger[0].elm.addEventListener('mouseenter', this.handleOpen);
    this.$slots.trigger[0].elm.addEventListener('mouseleave', this.handleBlur);
  },
  methods: {
    handleOpen: function handleOpen() {
      this.coords = this.$slots.trigger[0].elm.getBoundingClientRect();
      this.open = true;
    },
    handleBlur: function handleBlur() {
      if (this.hoverable) {
        this.blurTimeout = setTimeout(this.close, HOVERABLE_BLUR_DELAY);
      } else {
        this.close();
      }
    },
    handleContainerHover: function handleContainerHover() {
      if (this.hoverable && this.blurTimeout) {
        clearTimeout(this.blurTimeout);
      }
    },
    close: function close() {
      this.open = false;
    }
  },
  render: function render() {
    var h = arguments[0];
    return h(_VFragment2.default, null, [this.$slots.trigger, this.open && h(_PopupContainer2.default, {
      on: {
        'mouseover': this.handleContainerHover,
        'mouseleave': this.handleBlur
      },
      attrs: {
        popupClass: this.classes(this.basic && 'basic', this.flowing && 'flowing', this.inverted && 'inverted', this.size, this.wide, this.wide && 'wide'),
        triggerCoords: this.coords,
        position: this.position
      }
    }, [this.header && h(_PopupHeader2.default, null, [this.header]), this.content && h(_PopupContent2.default, null, [this.content]), this.$slots.default])]);
  }
};
},{"../../lib/VFragment":"node_modules/semantic-ui-vue/dist/commonjs/lib/VFragment.js","../../lib":"node_modules/semantic-ui-vue/dist/commonjs/lib/index.js","../../lib/PropTypes":"node_modules/semantic-ui-vue/dist/commonjs/lib/PropTypes.js","./private/PopupContainer":"node_modules/semantic-ui-vue/dist/commonjs/modules/Popup/private/PopupContainer.js","./private/popupConstants":"node_modules/semantic-ui-vue/dist/commonjs/modules/Popup/private/popupConstants.js","./PopupHeader":"node_modules/semantic-ui-vue/dist/commonjs/modules/Popup/PopupHeader.js","./PopupContent":"node_modules/semantic-ui-vue/dist/commonjs/modules/Popup/PopupContent.js"}],"node_modules/semantic-ui-vue/dist/commonjs/modules/Popup/index.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Popup = require('./Popup');

Object.defineProperty(exports, 'Popup', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_Popup).default;
  }
});

var _PopupContent = require('./PopupContent');

Object.defineProperty(exports, 'PopupContent', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_PopupContent).default;
  }
});

var _PopupHeader = require('./PopupHeader');

Object.defineProperty(exports, 'PopupHeader', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_PopupHeader).default;
  }
});

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}
},{"./Popup":"node_modules/semantic-ui-vue/dist/commonjs/modules/Popup/Popup.js","./PopupContent":"node_modules/semantic-ui-vue/dist/commonjs/modules/Popup/PopupContent.js","./PopupHeader":"node_modules/semantic-ui-vue/dist/commonjs/modules/Popup/PopupHeader.js"}],"node_modules/semantic-ui-vue/dist/commonjs/modules/Progress/Progress.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _babelHelperVueJsxMergeProps = require('babel-helper-vue-jsx-merge-props');

var _babelHelperVueJsxMergeProps2 = _interopRequireDefault(_babelHelperVueJsxMergeProps);

var _PropTypes = require('../../lib/PropTypes');

var _lib = require('../../lib');

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

exports.default = {
  name: 'SuiProgress',
  mixins: [_lib.SemanticUIVueMixin],
  props: {
    label: String,
    content: String,
    top: Boolean,
    bottom: Boolean,
    attached: Boolean,
    inverted: Boolean,
    progress: Boolean,
    indicating: Boolean,
    indeterminate: Boolean,
    size: _PropTypes.Enum.Size(),
    color: _PropTypes.Enum.Color(),
    state: _PropTypes.Enum.State(),
    percent: {
      type: [Number, String],
      default: 50,
      validator: function validator(value) {
        return value >= 0 && value <= 100;
      }
    }
  },
  computed: {
    percentString: function percentString() {
      return this.percent + '%';
    }
  },
  render: function render() {
    var h = arguments[0];
    var ElementType = this.getElementType();
    return h(ElementType, (0, _babelHelperVueJsxMergeProps2.default)([this.getChildPropsAndListeners(), {
      'class': this.classes('ui', 'progress', this.state, this.color, this.size, this.top && 'top', this.bottom && 'bottom', this.inverted && 'inverted', this.attached && 'attached', this.indicating && 'indicating', this.indeterminate && 'indeterminate'),
      attrs: {
        'data-percent': this.percent
      }
    }]), [h('div', {
      'class': 'bar',
      style: {
        width: this.percentString,
        'transition-duration': '300ms'
      }
    }, [this.progress && h('div', {
      'class': 'progress'
    }, [' ', this.percentString, ' '])]), this.label && h('div', {
      'class': 'label'
    }, [this.label])]);
  }
};
},{"babel-helper-vue-jsx-merge-props":"node_modules/babel-helper-vue-jsx-merge-props/index.js","../../lib/PropTypes":"node_modules/semantic-ui-vue/dist/commonjs/lib/PropTypes.js","../../lib":"node_modules/semantic-ui-vue/dist/commonjs/lib/index.js"}],"node_modules/semantic-ui-vue/dist/commonjs/modules/Progress/index.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Progress = require('./Progress');

Object.defineProperty(exports, 'Progress', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_Progress).default;
  }
});

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}
},{"./Progress":"node_modules/semantic-ui-vue/dist/commonjs/modules/Progress/Progress.js"}],"node_modules/semantic-ui-vue/dist/commonjs/modules/Tab/Tab.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _PropTypes = require('../../lib/PropTypes');

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

exports.default = {
  name: 'SuiTab',
  props: {
    menu: {
      type: Object,
      default: function _default() {
        return {
          attached: true,
          tabular: true
        };
      }
    },
    menuPosition: (0, _PropTypes.Enum)(['left', 'right'], {
      description: 'Menu Position'
    }),
    activeIndex: {
      type: [String, Number],
      default: 0
    }
  },
  data: function data() {
    return {
      tabs: [],
      activeTab: null
    };
  },
  computed: {
    tabMenu: function tabMenu() {
      var _this = this;

      var h = this.$createElement;
      return h('sui-menu', {
        props: this.menu
      }, [this.tabs.map(function (tab) {
        return h('a', {
          'class': ['item', {
            active: tab.active,
            disabled: tab.disabled
          }],
          on: {
            'click': function click(e) {
              return _this.openTab(e, tab);
            }
          }
        }, [tab.icon && h('sui-icon', {
          attrs: {
            name: tab.icon
          }
        }, []), h('span', null, [tab.title]), tab.label && h('sui-label', null, [tab.label])]);
      })]);
    }
  },
  watch: {
    activeIndex: function activeIndex(newIndex) {
      this.openTab(null, this.tabs[+newIndex]);
    }
  },
  mounted: function mounted() {
    if (!this.tabs.length) {
      throw new Error('tab used without tab-pane');
    }

    var pane = this.tabs[this.activeIndex] || this.tabs[0];
    pane.open();
    this.activeTab = pane;
  },
  methods: {
    addTab: function addTab(tab) {
      this.tabs.push(tab);
    },
    openTab: function openTab(e, tab) {
      if (tab.disabled) {
        return;
      }

      this.activeTab.close();
      tab.open();
      var index = this.tabs.indexOf(tab);
      this.$emit('change', e, tab, index);
      this.$emit('update:activeIndex', index);
      this.activeTab = tab;
    }
  },
  render: function render() {
    var h = arguments[0];
    var slot = this.$slots.default;
    var renderable = [this.tabMenu, slot];

    if (this.menu.attached === 'bottom') {
      renderable.reverse();
    }

    if (this.menu.vertical) {
      renderable = [h('sui-grid-column', {
        attrs: {
          width: 4
        }
      }, [this.tabMenu]), h('sui-grid-column', {
        attrs: {
          width: 12
        },
        'class': 'stretched'
      }, [slot])];

      if (this.menu.tabular === 'right' || this.menuPosition === 'right') {
        renderable.reverse();
      }

      renderable = h('sui-grid', null, [h('sui-grid-row', null, [renderable])]);
    }

    return h('div', null, [Array.isArray(renderable) ? [].concat((0, _toConsumableArray3.default)(renderable)) : renderable]);
  }
};
},{"babel-runtime/helpers/toConsumableArray":"node_modules/babel-runtime/helpers/toConsumableArray.js","../../lib/PropTypes":"node_modules/semantic-ui-vue/dist/commonjs/lib/PropTypes.js"}],"node_modules/semantic-ui-vue/dist/commonjs/modules/Tab/TabPane.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Tab = require('./Tab');

var _Tab2 = _interopRequireDefault(_Tab);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

exports.default = {
  name: 'SuiTabPane',
  meta: {
    parent: 'SuiTab'
  },
  props: {
    title: {
      type: String,
      required: true
    },
    icon: {
      type: String
    },
    label: {
      type: String
    },
    attached: {
      type: [Boolean, String],
      default: true
    },
    loading: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data: function data() {
    return {
      active: false
    };
  },
  computed: {
    classList: function classList() {
      var list = ['ui', 'tab', 'segment', {
        loading: this.active && this.loading
      }, {
        attached: this.attached
      }, {
        active: this.active
      }];

      if (typeof this.attached === 'string') {
        list.push(this.attached);
      }

      return list;
    }
  },
  mounted: function mounted() {
    try {
      this.findParent().addTab(this);
    } catch (e) {
      throw new Error('tab-pane was placed outside of tab component');
    }
  },
  methods: {
    findParent: function findParent() {
      var parent = this.$parent;
      var name = _Tab2.default.name;

      while (parent.$options.name !== name) {
        parent = parent.$parent;
      }

      return parent;
    },
    open: function open() {
      this.active = true;
    },
    close: function close() {
      this.active = false;
    }
  },
  render: function render() {
    var h = arguments[0];
    return this.active && h('div', {
      'class': this.classList
    }, [this.$slots.default]);
  }
};
},{"./Tab":"node_modules/semantic-ui-vue/dist/commonjs/modules/Tab/Tab.js"}],"node_modules/semantic-ui-vue/dist/commonjs/modules/Tab/index.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _TabPane = require('./TabPane');

Object.defineProperty(exports, 'TabPane', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_TabPane).default;
  }
});

var _Tab = require('./Tab');

Object.defineProperty(exports, 'Tab', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_Tab).default;
  }
});

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}
},{"./TabPane":"node_modules/semantic-ui-vue/dist/commonjs/modules/Tab/TabPane.js","./Tab":"node_modules/semantic-ui-vue/dist/commonjs/modules/Tab/Tab.js"}],"node_modules/semantic-ui-vue/dist/commonjs/modules/index.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Accordion = require('./Accordion');

Object.keys(_Accordion).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _Accordion[key];
    }
  });
});

var _Checkbox = require('./Checkbox');

Object.keys(_Checkbox).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _Checkbox[key];
    }
  });
});

var _Dimmer = require('./Dimmer');

Object.keys(_Dimmer).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _Dimmer[key];
    }
  });
});

var _Dropdown = require('./Dropdown');

Object.keys(_Dropdown).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _Dropdown[key];
    }
  });
});

var _Embed = require('./Embed');

Object.keys(_Embed).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _Embed[key];
    }
  });
});

var _Modal = require('./Modal');

Object.keys(_Modal).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _Modal[key];
    }
  });
});

var _Rating = require('./Rating');

Object.keys(_Rating).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _Rating[key];
    }
  });
});

var _Sidebar = require('./Sidebar');

Object.keys(_Sidebar).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _Sidebar[key];
    }
  });
});

var _Popup = require('./Popup');

Object.keys(_Popup).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _Popup[key];
    }
  });
});

var _Progress = require('./Progress');

Object.keys(_Progress).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _Progress[key];
    }
  });
});

var _Tab = require('./Tab');

Object.keys(_Tab).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _Tab[key];
    }
  });
});
},{"./Accordion":"node_modules/semantic-ui-vue/dist/commonjs/modules/Accordion/index.js","./Checkbox":"node_modules/semantic-ui-vue/dist/commonjs/modules/Checkbox/index.js","./Dimmer":"node_modules/semantic-ui-vue/dist/commonjs/modules/Dimmer/index.js","./Dropdown":"node_modules/semantic-ui-vue/dist/commonjs/modules/Dropdown/index.js","./Embed":"node_modules/semantic-ui-vue/dist/commonjs/modules/Embed/index.js","./Modal":"node_modules/semantic-ui-vue/dist/commonjs/modules/Modal/index.js","./Rating":"node_modules/semantic-ui-vue/dist/commonjs/modules/Rating/index.js","./Sidebar":"node_modules/semantic-ui-vue/dist/commonjs/modules/Sidebar/index.js","./Popup":"node_modules/semantic-ui-vue/dist/commonjs/modules/Popup/index.js","./Progress":"node_modules/semantic-ui-vue/dist/commonjs/modules/Progress/index.js","./Tab":"node_modules/semantic-ui-vue/dist/commonjs/modules/Tab/index.js"}],"node_modules/semantic-ui-vue/dist/commonjs/views/Card/Card.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _babelHelperVueJsxMergeProps = require('babel-helper-vue-jsx-merge-props');

var _babelHelperVueJsxMergeProps2 = _interopRequireDefault(_babelHelperVueJsxMergeProps);

var _lib = require('../../lib');

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

exports.default = {
  name: 'SuiCard',
  mixins: [_lib.SemanticUIVueMixin],
  props: {},
  render: function render() {
    var h = arguments[0];
    var ElementType = this.getElementType();
    return h(ElementType, (0, _babelHelperVueJsxMergeProps2.default)([this.getChildPropsAndListeners(), {
      'class': this.classes('ui', 'card')
    }]), [this.$slots.default]);
  }
};
},{"babel-helper-vue-jsx-merge-props":"node_modules/babel-helper-vue-jsx-merge-props/index.js","../../lib":"node_modules/semantic-ui-vue/dist/commonjs/lib/index.js"}],"node_modules/semantic-ui-vue/dist/commonjs/views/Card/CardContent.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _babelHelperVueJsxMergeProps = require('babel-helper-vue-jsx-merge-props');

var _babelHelperVueJsxMergeProps2 = _interopRequireDefault(_babelHelperVueJsxMergeProps);

var _lib = require('../../lib');

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

exports.default = {
  name: 'SuiCardContent',
  mixins: [_lib.SemanticUIVueMixin],
  props: {
    extra: Boolean
  },
  render: function render() {
    var h = arguments[0];
    var ElementType = this.getElementType();
    return h(ElementType, (0, _babelHelperVueJsxMergeProps2.default)([this.getChildPropsAndListeners(), {
      'class': this.classes(this.extra && 'extra', 'content')
    }]), [this.$slots.default, this.$slots.right && h('div', {
      'class': 'right floated'
    }, [this.$slots.right])]);
  },
  meta: {
    parent: 'SuiCard'
  }
};
},{"babel-helper-vue-jsx-merge-props":"node_modules/babel-helper-vue-jsx-merge-props/index.js","../../lib":"node_modules/semantic-ui-vue/dist/commonjs/lib/index.js"}],"node_modules/semantic-ui-vue/dist/commonjs/views/Card/CardDescription.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _babelHelperVueJsxMergeProps = require('babel-helper-vue-jsx-merge-props');

var _babelHelperVueJsxMergeProps2 = _interopRequireDefault(_babelHelperVueJsxMergeProps);

var _lib = require('../../lib');

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

exports.default = {
  name: 'SuiCardDescription',
  mixins: [_lib.SemanticUIVueMixin],
  render: function render() {
    var h = arguments[0];
    var ElementType = this.getElementType();
    return h(ElementType, (0, _babelHelperVueJsxMergeProps2.default)([this.getChildPropsAndListeners(), {
      'class': this.classes('description')
    }]), [this.$slots.default]);
  },
  meta: {
    parent: 'SuiCard'
  }
};
},{"babel-helper-vue-jsx-merge-props":"node_modules/babel-helper-vue-jsx-merge-props/index.js","../../lib":"node_modules/semantic-ui-vue/dist/commonjs/lib/index.js"}],"node_modules/semantic-ui-vue/dist/commonjs/views/Card/CardGroup.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _babelHelperVueJsxMergeProps = require('babel-helper-vue-jsx-merge-props');

var _babelHelperVueJsxMergeProps2 = _interopRequireDefault(_babelHelperVueJsxMergeProps);

var _lib = require('../../lib');

var _PropTypes = require('../../lib/PropTypes');

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

exports.default = {
  name: 'SuiCardGroup',
  mixins: [_lib.SemanticUIVueMixin],
  props: {
    itemsPerRow: _PropTypes.Enum.Number(),
    stackable: Boolean
  },
  render: function render() {
    var h = arguments[0];
    var ElementType = this.getElementType();
    return h(ElementType, (0, _babelHelperVueJsxMergeProps2.default)([this.getChildPropsAndListeners(), {
      'class': this.classes('ui', this.num(this.itemsPerRow), this.stackable && 'stackable', 'cards')
    }]), [this.$slots.default]);
  },
  meta: {
    parent: 'SuiCard'
  }
};
},{"babel-helper-vue-jsx-merge-props":"node_modules/babel-helper-vue-jsx-merge-props/index.js","../../lib":"node_modules/semantic-ui-vue/dist/commonjs/lib/index.js","../../lib/PropTypes":"node_modules/semantic-ui-vue/dist/commonjs/lib/PropTypes.js"}],"node_modules/semantic-ui-vue/dist/commonjs/views/Card/CardHeader.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _babelHelperVueJsxMergeProps = require('babel-helper-vue-jsx-merge-props');

var _babelHelperVueJsxMergeProps2 = _interopRequireDefault(_babelHelperVueJsxMergeProps);

var _lib = require('../../lib');

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

exports.default = {
  name: 'SuiCardHeader',
  mixins: [_lib.SemanticUIVueMixin],
  render: function render() {
    var h = arguments[0];
    var ElementType = this.getElementType();
    return h(ElementType, (0, _babelHelperVueJsxMergeProps2.default)([this.getChildPropsAndListeners(), {
      'class': this.classes('header')
    }]), [this.$slots.default]);
  },
  meta: {
    parent: 'SuiCard'
  }
};
},{"babel-helper-vue-jsx-merge-props":"node_modules/babel-helper-vue-jsx-merge-props/index.js","../../lib":"node_modules/semantic-ui-vue/dist/commonjs/lib/index.js"}],"node_modules/semantic-ui-vue/dist/commonjs/views/Card/CardMeta.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _babelHelperVueJsxMergeProps = require('babel-helper-vue-jsx-merge-props');

var _babelHelperVueJsxMergeProps2 = _interopRequireDefault(_babelHelperVueJsxMergeProps);

var _lib = require('../../lib');

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

exports.default = {
  name: 'SuiCardMeta',
  mixins: [_lib.SemanticUIVueMixin],
  render: function render() {
    var h = arguments[0];
    var ElementType = this.getElementType();
    return h(ElementType, (0, _babelHelperVueJsxMergeProps2.default)([this.getChildPropsAndListeners(), {
      'class': this.classes('meta')
    }]), [this.$slots.default]);
  },
  meta: {
    parent: 'SuiCard'
  }
};
},{"babel-helper-vue-jsx-merge-props":"node_modules/babel-helper-vue-jsx-merge-props/index.js","../../lib":"node_modules/semantic-ui-vue/dist/commonjs/lib/index.js"}],"node_modules/semantic-ui-vue/dist/commonjs/views/Card/index.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Card = require('./Card');

Object.defineProperty(exports, 'Card', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_Card).default;
  }
});

var _CardContent = require('./CardContent');

Object.defineProperty(exports, 'CardContent', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_CardContent).default;
  }
});

var _CardDescription = require('./CardDescription');

Object.defineProperty(exports, 'CardDescription', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_CardDescription).default;
  }
});

var _CardGroup = require('./CardGroup');

Object.defineProperty(exports, 'CardGroup', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_CardGroup).default;
  }
});

var _CardHeader = require('./CardHeader');

Object.defineProperty(exports, 'CardHeader', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_CardHeader).default;
  }
});

var _CardMeta = require('./CardMeta');

Object.defineProperty(exports, 'CardMeta', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_CardMeta).default;
  }
});

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}
},{"./Card":"node_modules/semantic-ui-vue/dist/commonjs/views/Card/Card.js","./CardContent":"node_modules/semantic-ui-vue/dist/commonjs/views/Card/CardContent.js","./CardDescription":"node_modules/semantic-ui-vue/dist/commonjs/views/Card/CardDescription.js","./CardGroup":"node_modules/semantic-ui-vue/dist/commonjs/views/Card/CardGroup.js","./CardHeader":"node_modules/semantic-ui-vue/dist/commonjs/views/Card/CardHeader.js","./CardMeta":"node_modules/semantic-ui-vue/dist/commonjs/views/Card/CardMeta.js"}],"node_modules/semantic-ui-vue/dist/commonjs/views/Comment/Comment.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _babelHelperVueJsxMergeProps = require('babel-helper-vue-jsx-merge-props');

var _babelHelperVueJsxMergeProps2 = _interopRequireDefault(_babelHelperVueJsxMergeProps);

var _lib = require('../../lib');

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

exports.default = {
  name: 'SuiComment',
  mixins: [_lib.SemanticUIVueMixin],
  render: function render() {
    var h = arguments[0];
    var ElementType = this.getElementType();
    return h(ElementType, (0, _babelHelperVueJsxMergeProps2.default)([this.getChildPropsAndListeners(), {
      'class': this.classes('ui', 'comment')
    }]), [this.$slots.default]);
  }
};
},{"babel-helper-vue-jsx-merge-props":"node_modules/babel-helper-vue-jsx-merge-props/index.js","../../lib":"node_modules/semantic-ui-vue/dist/commonjs/lib/index.js"}],"node_modules/semantic-ui-vue/dist/commonjs/views/Comment/CommentAction.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lib = require('../../lib');

exports.default = {
  name: 'SuiCommentAction',
  mixins: [_lib.SemanticUIVueMixin],
  render: function render() {
    var h = arguments[0];
    var ElementType = this.getElementType('a');
    return h(ElementType, this.getChildPropsAndListeners(), [this.$slots.default]);
  },
  meta: {
    parent: 'SuiComment'
  }
};
},{"../../lib":"node_modules/semantic-ui-vue/dist/commonjs/lib/index.js"}],"node_modules/semantic-ui-vue/dist/commonjs/views/Comment/CommentActions.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _babelHelperVueJsxMergeProps = require('babel-helper-vue-jsx-merge-props');

var _babelHelperVueJsxMergeProps2 = _interopRequireDefault(_babelHelperVueJsxMergeProps);

var _lib = require('../../lib');

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

exports.default = {
  name: 'SuiCommentActions',
  mixins: [_lib.SemanticUIVueMixin],
  render: function render() {
    var h = arguments[0];
    var ElementType = this.getElementType();
    return h(ElementType, (0, _babelHelperVueJsxMergeProps2.default)([this.getChildPropsAndListeners(), {
      'class': this.classes('actions')
    }]), [this.$slots.default]);
  },
  meta: {
    parent: 'SuiComment'
  }
};
},{"babel-helper-vue-jsx-merge-props":"node_modules/babel-helper-vue-jsx-merge-props/index.js","../../lib":"node_modules/semantic-ui-vue/dist/commonjs/lib/index.js"}],"node_modules/semantic-ui-vue/dist/commonjs/views/Comment/CommentAuthor.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _babelHelperVueJsxMergeProps = require('babel-helper-vue-jsx-merge-props');

var _babelHelperVueJsxMergeProps2 = _interopRequireDefault(_babelHelperVueJsxMergeProps);

var _lib = require('../../lib');

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

exports.default = {
  name: 'SuiCommentAuthor',
  mixins: [_lib.SemanticUIVueMixin],
  render: function render() {
    var h = arguments[0];
    var ElementType = this.getElementType();
    return h(ElementType, (0, _babelHelperVueJsxMergeProps2.default)([this.getChildPropsAndListeners(), {
      'class': this.classes('author')
    }]), [this.$slots.default]);
  },
  meta: {
    parent: 'SuiComment'
  }
};
},{"babel-helper-vue-jsx-merge-props":"node_modules/babel-helper-vue-jsx-merge-props/index.js","../../lib":"node_modules/semantic-ui-vue/dist/commonjs/lib/index.js"}],"node_modules/semantic-ui-vue/dist/commonjs/views/Comment/CommentAvatar.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _babelHelperVueJsxMergeProps = require('babel-helper-vue-jsx-merge-props');

var _babelHelperVueJsxMergeProps2 = _interopRequireDefault(_babelHelperVueJsxMergeProps);

var _lib = require('../../lib');

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

exports.default = {
  name: 'SuiCommentAvatar',
  mixins: [_lib.SemanticUIVueMixin],
  props: {
    src: String
  },
  render: function render() {
    var h = arguments[0];
    var ElementType = this.getElementType();
    return h(ElementType, (0, _babelHelperVueJsxMergeProps2.default)([this.getChildPropsAndListeners(), {
      'class': this.classes('avatar')
    }]), [h('img', {
      attrs: {
        src: this.src
      }
    }, [])]);
  },
  meta: {
    parent: 'SuiComment'
  }
};
},{"babel-helper-vue-jsx-merge-props":"node_modules/babel-helper-vue-jsx-merge-props/index.js","../../lib":"node_modules/semantic-ui-vue/dist/commonjs/lib/index.js"}],"node_modules/semantic-ui-vue/dist/commonjs/views/Comment/CommentContent.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _babelHelperVueJsxMergeProps = require('babel-helper-vue-jsx-merge-props');

var _babelHelperVueJsxMergeProps2 = _interopRequireDefault(_babelHelperVueJsxMergeProps);

var _lib = require('../../lib');

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

exports.default = {
  name: 'SuiCommentContent',
  mixins: [_lib.SemanticUIVueMixin],
  render: function render() {
    var h = arguments[0];
    var ElementType = this.getElementType();
    return h(ElementType, (0, _babelHelperVueJsxMergeProps2.default)([this.getChildPropsAndListeners(), {
      'class': this.classes('content')
    }]), [this.$slots.default]);
  },
  meta: {
    parent: 'SuiComment'
  }
};
},{"babel-helper-vue-jsx-merge-props":"node_modules/babel-helper-vue-jsx-merge-props/index.js","../../lib":"node_modules/semantic-ui-vue/dist/commonjs/lib/index.js"}],"node_modules/semantic-ui-vue/dist/commonjs/views/Comment/CommentGroup.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _babelHelperVueJsxMergeProps = require('babel-helper-vue-jsx-merge-props');

var _babelHelperVueJsxMergeProps2 = _interopRequireDefault(_babelHelperVueJsxMergeProps);

var _lib = require('../../lib');

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

exports.default = {
  name: 'SuiCommentGroup',
  mixins: [_lib.SemanticUIVueMixin],
  render: function render() {
    var h = arguments[0];
    var ElementType = this.getElementType();
    return h(ElementType, (0, _babelHelperVueJsxMergeProps2.default)([this.getChildPropsAndListeners(), {
      'class': this.classes('ui', 'comments')
    }]), [this.$slots.default]);
  },
  meta: {
    parent: 'SuiComment'
  }
};
},{"babel-helper-vue-jsx-merge-props":"node_modules/babel-helper-vue-jsx-merge-props/index.js","../../lib":"node_modules/semantic-ui-vue/dist/commonjs/lib/index.js"}],"node_modules/semantic-ui-vue/dist/commonjs/views/Comment/CommentMetadata.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _babelHelperVueJsxMergeProps = require('babel-helper-vue-jsx-merge-props');

var _babelHelperVueJsxMergeProps2 = _interopRequireDefault(_babelHelperVueJsxMergeProps);

var _lib = require('../../lib');

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

exports.default = {
  name: 'SuiCommentMetadata',
  mixins: [_lib.SemanticUIVueMixin],
  render: function render() {
    var h = arguments[0];
    var ElementType = this.getElementType();
    return h(ElementType, (0, _babelHelperVueJsxMergeProps2.default)([this.getChildPropsAndListeners(), {
      'class': this.classes('metadata')
    }]), [this.$slots.default]);
  },
  meta: {
    parent: 'SuiComment'
  }
};
},{"babel-helper-vue-jsx-merge-props":"node_modules/babel-helper-vue-jsx-merge-props/index.js","../../lib":"node_modules/semantic-ui-vue/dist/commonjs/lib/index.js"}],"node_modules/semantic-ui-vue/dist/commonjs/views/Comment/CommentText.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _babelHelperVueJsxMergeProps = require('babel-helper-vue-jsx-merge-props');

var _babelHelperVueJsxMergeProps2 = _interopRequireDefault(_babelHelperVueJsxMergeProps);

var _lib = require('../../lib');

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

exports.default = {
  name: 'SuiCommentText',
  mixins: [_lib.SemanticUIVueMixin],
  render: function render() {
    var h = arguments[0];
    var ElementType = this.getElementType();
    return h(ElementType, (0, _babelHelperVueJsxMergeProps2.default)([this.getChildPropsAndListeners(), {
      'class': this.classes('text')
    }]), [this.$slots.default]);
  },
  meta: {
    parent: 'SuiComment'
  }
};
},{"babel-helper-vue-jsx-merge-props":"node_modules/babel-helper-vue-jsx-merge-props/index.js","../../lib":"node_modules/semantic-ui-vue/dist/commonjs/lib/index.js"}],"node_modules/semantic-ui-vue/dist/commonjs/views/Comment/index.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Comment = require('./Comment');

Object.defineProperty(exports, 'Comment', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_Comment).default;
  }
});

var _CommentAction = require('./CommentAction');

Object.defineProperty(exports, 'CommentAction', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_CommentAction).default;
  }
});

var _CommentActions = require('./CommentActions');

Object.defineProperty(exports, 'CommentActions', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_CommentActions).default;
  }
});

var _CommentAuthor = require('./CommentAuthor');

Object.defineProperty(exports, 'CommentAuthor', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_CommentAuthor).default;
  }
});

var _CommentAvatar = require('./CommentAvatar');

Object.defineProperty(exports, 'CommentAvatar', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_CommentAvatar).default;
  }
});

var _CommentContent = require('./CommentContent');

Object.defineProperty(exports, 'CommentContent', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_CommentContent).default;
  }
});

var _CommentGroup = require('./CommentGroup');

Object.defineProperty(exports, 'CommentGroup', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_CommentGroup).default;
  }
});

var _CommentMetadata = require('./CommentMetadata');

Object.defineProperty(exports, 'CommentMetadata', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_CommentMetadata).default;
  }
});

var _CommentText = require('./CommentText');

Object.defineProperty(exports, 'CommentText', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_CommentText).default;
  }
});

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}
},{"./Comment":"node_modules/semantic-ui-vue/dist/commonjs/views/Comment/Comment.js","./CommentAction":"node_modules/semantic-ui-vue/dist/commonjs/views/Comment/CommentAction.js","./CommentActions":"node_modules/semantic-ui-vue/dist/commonjs/views/Comment/CommentActions.js","./CommentAuthor":"node_modules/semantic-ui-vue/dist/commonjs/views/Comment/CommentAuthor.js","./CommentAvatar":"node_modules/semantic-ui-vue/dist/commonjs/views/Comment/CommentAvatar.js","./CommentContent":"node_modules/semantic-ui-vue/dist/commonjs/views/Comment/CommentContent.js","./CommentGroup":"node_modules/semantic-ui-vue/dist/commonjs/views/Comment/CommentGroup.js","./CommentMetadata":"node_modules/semantic-ui-vue/dist/commonjs/views/Comment/CommentMetadata.js","./CommentText":"node_modules/semantic-ui-vue/dist/commonjs/views/Comment/CommentText.js"}],"node_modules/semantic-ui-vue/dist/commonjs/views/Feed/FeedEvent.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _babelHelperVueJsxMergeProps = require('babel-helper-vue-jsx-merge-props');

var _babelHelperVueJsxMergeProps2 = _interopRequireDefault(_babelHelperVueJsxMergeProps);

var _lib = require('../../lib');

var _ = require('./');

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

exports.default = {
  name: 'SuiFeedEvent',
  mixins: [_lib.SemanticUIVueMixin],
  description: 'A feed contains an event',
  props: {
    content: {
      type: String,
      description: 'Shorthand for SuiFeedContent'
    },
    image: {
      type: String,
      description: 'An event can contain image label'
    },
    icon: {
      type: String,
      description: 'An event can contain icon label'
    },
    date: {
      type: String,
      description: 'Shorthand for SuiFeedDate'
    },
    summary: {
      type: String,
      description: 'Shorthand for SuiFeedSummary'
    },
    extraImages: {
      type: Array,
      description: 'Shorthand for SuiFeedExtra with images'
    },
    extraText: {
      type: String,
      description: 'Shorthand for SuiFeedExtra with text'
    },
    meta: {
      type: String,
      description: 'Shorthand for SuiFeedMeta'
    }
  },
  render: function render() {
    var h = arguments[0];
    var ElementType = this.getElementType();
    var hasContent = this.content || this.date || this.summary || this.extraImages || this.extraText || this.meta;
    return h(ElementType, (0, _babelHelperVueJsxMergeProps2.default)([this.getChildPropsAndListeners(), {
      'class': this.classes('event')
    }]), [this.image && h(_.FeedLabel, {
      attrs: {
        image: this.image
      }
    }, []), this.icon && h(_.FeedLabel, {
      attrs: {
        icon: this.icon
      }
    }, []), hasContent && h(_.FeedContent, {
      attrs: {
        content: this.content,
        date: this.date,
        summary: this.summary,
        extraImages: this.extraImages,
        extraText: this.extraText,
        meta: this.meta
      }
    }, []), this.$slots.default]);
  },
  meta: {
    parent: 'SuiFeed'
  }
};
},{"babel-helper-vue-jsx-merge-props":"node_modules/babel-helper-vue-jsx-merge-props/index.js","../../lib":"node_modules/semantic-ui-vue/dist/commonjs/lib/index.js","./":"node_modules/semantic-ui-vue/dist/commonjs/views/Feed/index.js"}],"node_modules/semantic-ui-vue/dist/commonjs/views/Feed/Feed.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _babelHelperVueJsxMergeProps = require('babel-helper-vue-jsx-merge-props');

var _babelHelperVueJsxMergeProps2 = _interopRequireDefault(_babelHelperVueJsxMergeProps);

var _lib = require('../../lib');

var _PropTypes = require('../../lib/PropTypes');

var _FeedEvent = require('./FeedEvent');

var _FeedEvent2 = _interopRequireDefault(_FeedEvent);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

exports.default = {
  name: 'SuiFeed',
  mixins: [_lib.SemanticUIVueMixin],
  description: 'A feed presents user activity chronologically',
  props: {
    size: (0, _PropTypes.Enum)(['small', 'large'], {
      description: 'A feed can have different sizes (small | large)'
    }),
    events: {
      type: Array,
      description: 'Shorthand array of props for FeedEvent'
    }
  },
  render: function render() {
    var h = arguments[0];
    var ElementType = this.getElementType();
    return h(ElementType, (0, _babelHelperVueJsxMergeProps2.default)([this.getChildPropsAndListeners(), {
      'class': this.classes('ui', this.size, 'feed')
    }]), [this.$slots.default || this.events && this.events.map(function (event) {
      return h(_FeedEvent2.default, {
        props: event
      }, []);
    })]);
  }
};
},{"babel-helper-vue-jsx-merge-props":"node_modules/babel-helper-vue-jsx-merge-props/index.js","../../lib":"node_modules/semantic-ui-vue/dist/commonjs/lib/index.js","../../lib/PropTypes":"node_modules/semantic-ui-vue/dist/commonjs/lib/PropTypes.js","./FeedEvent":"node_modules/semantic-ui-vue/dist/commonjs/views/Feed/FeedEvent.js"}],"node_modules/semantic-ui-vue/dist/commonjs/views/Feed/FeedContent.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _babelHelperVueJsxMergeProps = require('babel-helper-vue-jsx-merge-props');

var _babelHelperVueJsxMergeProps2 = _interopRequireDefault(_babelHelperVueJsxMergeProps);

var _lib = require('../../lib');

var _ = require('./');

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

exports.default = {
  name: 'SuiFeedContent',
  mixins: [_lib.SemanticUIVueMixin],
  props: {
    content: {
      type: String,
      description: 'Shorthand for primary content'
    },
    date: {
      type: String,
      description: 'Shorthand for SuiFeedDate'
    },
    summary: {
      type: String,
      description: 'Shorthand for SuiFeedSummary'
    },
    extraImages: {
      type: Array,
      description: 'Shorthand for SuiFeedExtra with images'
    },
    extraText: {
      type: String,
      description: 'Shorthand for SuiFeedExtra with text'
    },
    meta: {
      type: String,
      description: 'Shorthand for SuiFeedMeta'
    }
  },
  render: function render() {
    var h = arguments[0];
    var ElementType = this.getElementType();
    return h(ElementType, (0, _babelHelperVueJsxMergeProps2.default)([this.getChildPropsAndListeners(), {
      'class': this.classes('content')
    }]), [this.$slots.default || [this.date && h(_.FeedDate, {
      attrs: {
        content: this.date
      }
    }, []), this.content, this.summary && h(_.FeedSummary, {
      attrs: {
        content: this.summary
      }
    }, []), this.extraText && h(_.FeedExtra, {
      attrs: {
        text: true,
        content: this.extraText
      }
    }, []), this.extraImages && h(_.FeedExtra, {
      attrs: {
        images: this.extraImages
      }
    }, []), this.meta && h(_.FeedMeta, {
      attrs: {
        content: this.meta
      }
    }, [])]]);
  },
  meta: {
    parent: 'SuiFeed'
  }
};
},{"babel-helper-vue-jsx-merge-props":"node_modules/babel-helper-vue-jsx-merge-props/index.js","../../lib":"node_modules/semantic-ui-vue/dist/commonjs/lib/index.js","./":"node_modules/semantic-ui-vue/dist/commonjs/views/Feed/index.js"}],"node_modules/semantic-ui-vue/dist/commonjs/views/Feed/FeedDate.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _babelHelperVueJsxMergeProps = require('babel-helper-vue-jsx-merge-props');

var _babelHelperVueJsxMergeProps2 = _interopRequireDefault(_babelHelperVueJsxMergeProps);

var _lib = require('../../lib');

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

exports.default = {
  name: 'SuiFeedDate',
  mixins: [_lib.SemanticUIVueMixin],
  description: 'An event or an event summary can contain a date',
  props: {
    content: {
      type: String,
      description: 'Shorthand for primary content'
    }
  },
  render: function render() {
    var h = arguments[0];
    var ElementType = this.getElementType();
    return h(ElementType, (0, _babelHelperVueJsxMergeProps2.default)([this.getChildPropsAndListeners(), {
      'class': this.classes('date')
    }]), [this.$slots.default || this.content]);
  },
  meta: {
    parent: 'SuiFeed'
  }
};
},{"babel-helper-vue-jsx-merge-props":"node_modules/babel-helper-vue-jsx-merge-props/index.js","../../lib":"node_modules/semantic-ui-vue/dist/commonjs/lib/index.js"}],"node_modules/semantic-ui-vue/dist/commonjs/views/Feed/FeedExtra.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _babelHelperVueJsxMergeProps = require('babel-helper-vue-jsx-merge-props');

var _babelHelperVueJsxMergeProps2 = _interopRequireDefault(_babelHelperVueJsxMergeProps);

var _lib = require('../../lib');

var _elements = require('../../elements');

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

exports.default = {
  name: 'SuiFeedExtra',
  mixins: [_lib.SemanticUIVueMixin],
  description: 'A feed can contain an extra content',
  props: {
    content: {
      type: String,
      description: 'Shorthand for primary content'
    },
    images: {
      type: [Array, Boolean],
      description: 'An event can contain additional information like a set of images'
    },
    text: {
      type: Boolean,
      description: 'An event can contain additional text information'
    }
  },
  render: function render() {
    var h = arguments[0];
    var ElementType = this.getElementType();
    var defaultContentImage = Array.isArray(this.images) && this.images.map(function (image) {
      return h(_elements.Image, {
        attrs: {
          src: image
        }
      }, []);
    });
    var defaultContent = [this.content, defaultContentImage];
    return h(ElementType, (0, _babelHelperVueJsxMergeProps2.default)([this.getChildPropsAndListeners(), {
      'class': this.classes(this.images && 'images', (this.text || this.content) && 'text', 'extra')
    }]), [this.$slots.default || defaultContent]);
  },
  meta: {
    parent: 'SuiFeed'
  }
};
},{"babel-helper-vue-jsx-merge-props":"node_modules/babel-helper-vue-jsx-merge-props/index.js","../../lib":"node_modules/semantic-ui-vue/dist/commonjs/lib/index.js","../../elements":"node_modules/semantic-ui-vue/dist/commonjs/elements/index.js"}],"node_modules/semantic-ui-vue/dist/commonjs/views/Feed/FeedLabel.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _babelHelperVueJsxMergeProps = require('babel-helper-vue-jsx-merge-props');

var _babelHelperVueJsxMergeProps2 = _interopRequireDefault(_babelHelperVueJsxMergeProps);

var _lib = require('../../lib');

var _elements = require('../../elements');

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

exports.default = {
  name: 'SuiFeedLabel',
  mixins: [_lib.SemanticUIVueMixin],
  description: 'An event can contain an image or icon label',
  props: {
    content: {
      type: String,
      description: 'Shorthand for primary content'
    },
    image: {
      type: String,
      description: 'An event can contain image label'
    },
    icon: {
      type: String,
      description: 'An event can contain icon label'
    }
  },
  render: function render() {
    var h = arguments[0];
    var ElementType = this.getElementType();
    return h(ElementType, (0, _babelHelperVueJsxMergeProps2.default)([this.getChildPropsAndListeners(), {
      'class': this.classes('label')
    }]), [this.$slots.default || [this.content, this.icon && h(_elements.Icon, {
      attrs: {
        name: this.icon
      }
    }, []), this.image && h(_elements.Image, {
      attrs: {
        src: this.image
      }
    }, [])]]);
  },
  meta: {
    parent: 'SuiFeed'
  }
};
},{"babel-helper-vue-jsx-merge-props":"node_modules/babel-helper-vue-jsx-merge-props/index.js","../../lib":"node_modules/semantic-ui-vue/dist/commonjs/lib/index.js","../../elements":"node_modules/semantic-ui-vue/dist/commonjs/elements/index.js"}],"node_modules/semantic-ui-vue/dist/commonjs/views/Feed/FeedLike.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _babelHelperVueJsxMergeProps = require('babel-helper-vue-jsx-merge-props');

var _babelHelperVueJsxMergeProps2 = _interopRequireDefault(_babelHelperVueJsxMergeProps);

var _lib = require('../../lib');

var _elements = require('../../elements');

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

exports.default = {
  name: 'SuiFeedLike',
  mixins: [_lib.SemanticUIVueMixin],
  description: 'A feed can contain a like element',
  props: {
    content: {
      type: String,
      description: 'Shorthand for primary content'
    },
    icon: {
      type: String,
      description: 'Shorthand for icon. Mutually exclusive with children'
    }
  },
  render: function render() {
    var h = arguments[0];
    var ElementType = this.getElementType('a');
    return h(ElementType, (0, _babelHelperVueJsxMergeProps2.default)([this.getChildPropsAndListeners(), {
      'class': this.classes('like')
    }]), [this.$slots.default || [this.icon && h(_elements.Icon, {
      attrs: {
        name: this.icon
      }
    }, []), this.content]]);
  },
  meta: {
    parent: 'SuiFeed'
  }
};
},{"babel-helper-vue-jsx-merge-props":"node_modules/babel-helper-vue-jsx-merge-props/index.js","../../lib":"node_modules/semantic-ui-vue/dist/commonjs/lib/index.js","../../elements":"node_modules/semantic-ui-vue/dist/commonjs/elements/index.js"}],"node_modules/semantic-ui-vue/dist/commonjs/views/Feed/FeedMeta.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _babelHelperVueJsxMergeProps = require('babel-helper-vue-jsx-merge-props');

var _babelHelperVueJsxMergeProps2 = _interopRequireDefault(_babelHelperVueJsxMergeProps);

var _lib = require('../../lib');

var _ = require('./');

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

exports.default = {
  name: 'SuiFeedMeta',
  mixins: [_lib.SemanticUIVueMixin],
  description: 'A feed can contain a meta',
  props: {
    content: {
      type: String,
      description: 'Shorthand for primary content'
    },
    like: {
      type: String,
      description: 'Shorthand for SuiFeedLike'
    }
  },
  render: function render() {
    var h = arguments[0];
    var ElementType = this.getElementType();
    return h(ElementType, (0, _babelHelperVueJsxMergeProps2.default)([this.getChildPropsAndListeners(), {
      'class': this.classes('meta')
    }]), [this.$slots.default || [this.like && h(_.FeedLike, {
      attrs: {
        content: this.like
      }
    }, []), this.content]]);
  },
  meta: {
    parent: 'SuiFeed'
  }
};
},{"babel-helper-vue-jsx-merge-props":"node_modules/babel-helper-vue-jsx-merge-props/index.js","../../lib":"node_modules/semantic-ui-vue/dist/commonjs/lib/index.js","./":"node_modules/semantic-ui-vue/dist/commonjs/views/Feed/index.js"}],"node_modules/semantic-ui-vue/dist/commonjs/views/Feed/FeedSummary.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _babelHelperVueJsxMergeProps = require('babel-helper-vue-jsx-merge-props');

var _babelHelperVueJsxMergeProps2 = _interopRequireDefault(_babelHelperVueJsxMergeProps);

var _lib = require('../../lib');

var _ = require('./');

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

exports.default = {
  name: 'SuiFeedSummary',
  mixins: [_lib.SemanticUIVueMixin],
  description: 'A feed can contain a summary',
  props: {
    content: {
      type: String,
      description: 'Shorthand for primary content'
    },
    date: {
      type: String,
      description: 'Shorthand for SuiFeedDate'
    },
    user: {
      type: String,
      description: 'Shorthand for SuiFeedUser'
    }
  },
  render: function render() {
    var h = arguments[0];
    var ElementType = this.getElementType();
    return h(ElementType, (0, _babelHelperVueJsxMergeProps2.default)([this.getChildPropsAndListeners(), {
      'class': this.classes('summary')
    }]), [this.$slots.default || [this.user && h(_.FeedUser, {
      attrs: {
        content: this.user
      }
    }, []), this.content, this.date && h(_.FeedDate, {
      attrs: {
        content: this.date
      }
    }, [])]]);
  },
  meta: {
    parent: 'SuiFeed'
  }
};
},{"babel-helper-vue-jsx-merge-props":"node_modules/babel-helper-vue-jsx-merge-props/index.js","../../lib":"node_modules/semantic-ui-vue/dist/commonjs/lib/index.js","./":"node_modules/semantic-ui-vue/dist/commonjs/views/Feed/index.js"}],"node_modules/semantic-ui-vue/dist/commonjs/views/Feed/FeedUser.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _babelHelperVueJsxMergeProps = require('babel-helper-vue-jsx-merge-props');

var _babelHelperVueJsxMergeProps2 = _interopRequireDefault(_babelHelperVueJsxMergeProps);

var _lib = require('../../lib');

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

exports.default = {
  name: 'SuiFeedUser',
  mixins: [_lib.SemanticUIVueMixin],
  description: 'A feed can contain a user element',
  props: {
    content: {
      type: String,
      description: 'Shorthand for primary content'
    }
  },
  render: function render() {
    var h = arguments[0];
    var ElementType = this.getElementType('a');
    return h(ElementType, (0, _babelHelperVueJsxMergeProps2.default)([this.getChildPropsAndListeners(), {
      'class': this.classes('user')
    }]), [this.$slots.default || this.content]);
  },
  meta: {
    parent: 'SuiFeed'
  }
};
},{"babel-helper-vue-jsx-merge-props":"node_modules/babel-helper-vue-jsx-merge-props/index.js","../../lib":"node_modules/semantic-ui-vue/dist/commonjs/lib/index.js"}],"node_modules/semantic-ui-vue/dist/commonjs/views/Feed/index.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Feed = require('./Feed');

Object.defineProperty(exports, 'Feed', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_Feed).default;
  }
});

var _FeedContent = require('./FeedContent');

Object.defineProperty(exports, 'FeedContent', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_FeedContent).default;
  }
});

var _FeedDate = require('./FeedDate');

Object.defineProperty(exports, 'FeedDate', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_FeedDate).default;
  }
});

var _FeedEvent = require('./FeedEvent');

Object.defineProperty(exports, 'FeedEvent', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_FeedEvent).default;
  }
});

var _FeedExtra = require('./FeedExtra');

Object.defineProperty(exports, 'FeedExtra', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_FeedExtra).default;
  }
});

var _FeedLabel = require('./FeedLabel');

Object.defineProperty(exports, 'FeedLabel', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_FeedLabel).default;
  }
});

var _FeedLike = require('./FeedLike');

Object.defineProperty(exports, 'FeedLike', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_FeedLike).default;
  }
});

var _FeedMeta = require('./FeedMeta');

Object.defineProperty(exports, 'FeedMeta', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_FeedMeta).default;
  }
});

var _FeedSummary = require('./FeedSummary');

Object.defineProperty(exports, 'FeedSummary', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_FeedSummary).default;
  }
});

var _FeedUser = require('./FeedUser');

Object.defineProperty(exports, 'FeedUser', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_FeedUser).default;
  }
});

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}
},{"./Feed":"node_modules/semantic-ui-vue/dist/commonjs/views/Feed/Feed.js","./FeedContent":"node_modules/semantic-ui-vue/dist/commonjs/views/Feed/FeedContent.js","./FeedDate":"node_modules/semantic-ui-vue/dist/commonjs/views/Feed/FeedDate.js","./FeedEvent":"node_modules/semantic-ui-vue/dist/commonjs/views/Feed/FeedEvent.js","./FeedExtra":"node_modules/semantic-ui-vue/dist/commonjs/views/Feed/FeedExtra.js","./FeedLabel":"node_modules/semantic-ui-vue/dist/commonjs/views/Feed/FeedLabel.js","./FeedLike":"node_modules/semantic-ui-vue/dist/commonjs/views/Feed/FeedLike.js","./FeedMeta":"node_modules/semantic-ui-vue/dist/commonjs/views/Feed/FeedMeta.js","./FeedSummary":"node_modules/semantic-ui-vue/dist/commonjs/views/Feed/FeedSummary.js","./FeedUser":"node_modules/semantic-ui-vue/dist/commonjs/views/Feed/FeedUser.js"}],"node_modules/semantic-ui-vue/dist/commonjs/views/Item/Item.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lib = require('../../lib');

exports.default = {
  name: 'SuiItem',
  mixins: [_lib.SemanticUIVueMixin],
  description: 'An item view presents large collections of site content for display',
  props: {
    href: {
      type: String,
      description: 'Specifies a linked document, resource, or location. Only useful if the ItemGroup contains the "link" class.'
    }
  },
  render: function render() {
    var h = arguments[0];
    var ElementType = this.href ? 'a' : this.getElementType();
    return h(ElementType, {
      attrs: {
        href: this.href
      },
      'class': this.classes('item')
    }, [this.$slots.default]);
  }
};
},{"../../lib":"node_modules/semantic-ui-vue/dist/commonjs/lib/index.js"}],"node_modules/semantic-ui-vue/dist/commonjs/views/Item/ItemGroup.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lib = require('../../lib');

var _PropTypes = require('../../lib/PropTypes');

exports.default = {
  name: 'SuiItemGroup',
  mixins: [_lib.SemanticUIVueMixin],
  description: 'A group of items',
  props: {
    unstackable: {
      type: Boolean,
      description: 'A table can specify how it stacks items responsively'
    },
    divided: {
      type: Boolean,
      description: 'Items can be divided to better distinguish between grouped content'
    },
    relaxed: (0, _PropTypes.Enum)(['very'], {
      type: Boolean,
      description: 'A group of items can relax its padding to provide more negative space'
    }),
    link: {
      type: Boolean,
      description: 'An item can be formatted so that the entire contents link to another page'
    }
  },
  render: function render() {
    var h = arguments[0];
    var ElementType = this.getElementType();
    return h(ElementType, {
      'class': this.classes('ui', this.unstackable && 'unstackable', this.divided && 'divided', this.relaxed, this.relaxed && 'relaxed', this.link && 'link', 'items')
    }, [this.$slots.default]);
  },
  meta: {
    parent: 'SuiItem'
  }
};
},{"../../lib":"node_modules/semantic-ui-vue/dist/commonjs/lib/index.js","../../lib/PropTypes":"node_modules/semantic-ui-vue/dist/commonjs/lib/PropTypes.js"}],"node_modules/semantic-ui-vue/dist/commonjs/views/Item/ItemContent.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lib = require('../../lib');

var _PropTypes = require('../../lib/PropTypes');

exports.default = {
  name: 'SuiItemContent',
  mixins: [_lib.SemanticUIVueMixin],
  description: 'An item can contain content',
  props: {
    verticalAlign: _PropTypes.Enum.VerticalAlign({
      description: 'Content can specify its vertical alignment'
    })
  },
  render: function render() {
    var h = arguments[0];
    var ElementType = this.getElementType();
    return h(ElementType, {
      'class': this.classes(this.verticalAlign && this.verticalAlign + ' aligned', 'content')
    }, [this.$slots.default]);
  },
  meta: {
    parent: 'SuiItem'
  }
};
},{"../../lib":"node_modules/semantic-ui-vue/dist/commonjs/lib/index.js","../../lib/PropTypes":"node_modules/semantic-ui-vue/dist/commonjs/lib/PropTypes.js"}],"node_modules/semantic-ui-vue/dist/commonjs/views/Item/ItemImage.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lib = require('../../lib');

var _PropTypes = require('../../lib/PropTypes');

exports.default = {
  name: 'SuiItemImage',
  mixins: [_lib.SemanticUIVueMixin],
  description: 'An item can contain an image',
  props: {
    src: {
      type: String,
      required: true,
      description: 'Specifies the URL of the image'
    },
    size: (0, _PropTypes.Enum)(['mini', 'tiny', 'small', 'medium', 'large', 'big', 'huge', 'massive'], {
      type: String,
      description: 'An image may appear at different sizes (mini, tiny, small, medium, large, big, huge, massive)'
    }),
    href: {
      type: String,
      description: 'Specifies a linked document, resource, or location'
    }
  },
  render: function render() {
    var h = arguments[0];
    var ElementType = this.href ? 'a' : this.getElementType();
    return h(ElementType, {
      attrs: {
        href: this.href
      },
      'class': this.classes(this.size && 'ui ' + this.size, 'image')
    }, [h('img', {
      attrs: {
        src: this.src
      }
    }, [])]);
  },
  meta: {
    parent: 'SuiItem'
  }
};
},{"../../lib":"node_modules/semantic-ui-vue/dist/commonjs/lib/index.js","../../lib/PropTypes":"node_modules/semantic-ui-vue/dist/commonjs/lib/PropTypes.js"}],"node_modules/semantic-ui-vue/dist/commonjs/views/Item/ItemHeader.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lib = require('../../lib');

exports.default = {
  name: 'SuiItemHeader',
  mixins: [_lib.SemanticUIVueMixin],
  description: 'An item can contain a header',
  props: {
    href: {
      type: String,
      description: 'Specifies a linked document, resource, or location'
    }
  },
  render: function render() {
    var h = arguments[0];
    var ElementType = this.href ? 'a' : this.getElementType();
    return h(ElementType, {
      attrs: {
        href: this.href
      },
      'class': this.classes('header')
    }, [this.$slots.default]);
  },
  meta: {
    parent: 'SuiItem'
  }
};
},{"../../lib":"node_modules/semantic-ui-vue/dist/commonjs/lib/index.js"}],"node_modules/semantic-ui-vue/dist/commonjs/views/Item/ItemMeta.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lib = require('../../lib');

exports.default = {
  name: 'SuiItemMeta',
  mixins: [_lib.SemanticUIVueMixin],
  description: 'An item can contain content metadata',
  props: {},
  render: function render() {
    var h = arguments[0];
    var ElementType = this.getElementType();
    return h(ElementType, {
      'class': this.classes('meta')
    }, [this.$slots.default]);
  },
  meta: {
    parent: 'SuiItem'
  }
};
},{"../../lib":"node_modules/semantic-ui-vue/dist/commonjs/lib/index.js"}],"node_modules/semantic-ui-vue/dist/commonjs/views/Item/ItemDescription.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lib = require('../../lib');

exports.default = {
  name: 'SuiItemDescription',
  mixins: [_lib.SemanticUIVueMixin],
  description: 'An item can contain a description with a single or multiple paragraphs',
  render: function render() {
    var h = arguments[0];
    var ElementType = this.getElementType();
    return h(ElementType, {
      'class': this.classes('description')
    }, [this.$slots.default]);
  },
  meta: {
    parent: 'SuiItem'
  }
};
},{"../../lib":"node_modules/semantic-ui-vue/dist/commonjs/lib/index.js"}],"node_modules/semantic-ui-vue/dist/commonjs/views/Item/ItemExtra.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lib = require('../../lib');

exports.default = {
  name: 'SuiItemExtra',
  mixins: [_lib.SemanticUIVueMixin],
  description: 'An item can contain extra content meant to be formatted separately from the main content',
  props: {},
  render: function render() {
    var h = arguments[0];
    var ElementType = this.getElementType();
    return h(ElementType, {
      'class': this.classes('extra')
    }, [this.$slots.default]);
  },
  meta: {
    parent: 'SuiItem'
  }
};
},{"../../lib":"node_modules/semantic-ui-vue/dist/commonjs/lib/index.js"}],"node_modules/semantic-ui-vue/dist/commonjs/views/Item/index.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Item = require('./Item');

Object.defineProperty(exports, 'Item', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_Item).default;
  }
});

var _ItemGroup = require('./ItemGroup');

Object.defineProperty(exports, 'ItemGroup', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_ItemGroup).default;
  }
});

var _ItemContent = require('./ItemContent');

Object.defineProperty(exports, 'ItemContent', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_ItemContent).default;
  }
});

var _ItemImage = require('./ItemImage');

Object.defineProperty(exports, 'ItemImage', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_ItemImage).default;
  }
});

var _ItemHeader = require('./ItemHeader');

Object.defineProperty(exports, 'ItemHeader', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_ItemHeader).default;
  }
});

var _ItemMeta = require('./ItemMeta');

Object.defineProperty(exports, 'ItemMeta', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_ItemMeta).default;
  }
});

var _ItemDescription = require('./ItemDescription');

Object.defineProperty(exports, 'ItemDescription', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_ItemDescription).default;
  }
});

var _ItemExtra = require('./ItemExtra');

Object.defineProperty(exports, 'ItemExtra', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_ItemExtra).default;
  }
});

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}
},{"./Item":"node_modules/semantic-ui-vue/dist/commonjs/views/Item/Item.js","./ItemGroup":"node_modules/semantic-ui-vue/dist/commonjs/views/Item/ItemGroup.js","./ItemContent":"node_modules/semantic-ui-vue/dist/commonjs/views/Item/ItemContent.js","./ItemImage":"node_modules/semantic-ui-vue/dist/commonjs/views/Item/ItemImage.js","./ItemHeader":"node_modules/semantic-ui-vue/dist/commonjs/views/Item/ItemHeader.js","./ItemMeta":"node_modules/semantic-ui-vue/dist/commonjs/views/Item/ItemMeta.js","./ItemDescription":"node_modules/semantic-ui-vue/dist/commonjs/views/Item/ItemDescription.js","./ItemExtra":"node_modules/semantic-ui-vue/dist/commonjs/views/Item/ItemExtra.js"}],"node_modules/semantic-ui-vue/dist/commonjs/views/Statistic/Statistic.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _babelHelperVueJsxMergeProps = require('babel-helper-vue-jsx-merge-props');

var _babelHelperVueJsxMergeProps2 = _interopRequireDefault(_babelHelperVueJsxMergeProps);

var _lib = require('../../lib');

var _PropTypes = require('../../lib/PropTypes');

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

exports.default = {
  name: 'SuiStatistic',
  mixins: [_lib.classMixin, _lib.SemanticUIVueMixin],
  props: {
    horizontal: {
      type: Boolean,
      description: 'Present measurement horizontally'
    },
    color: _PropTypes.Enum.Color(),
    size: _PropTypes.Enum.Size(),
    floated: (0, _PropTypes.Enum)(['left', 'right']),
    inverted: {
      type: Boolean,
      description: 'Should the colors be inverted'
    }
  },
  render: function render() {
    var h = arguments[0];
    var ElementType = this.getElementType();
    return h(ElementType, (0, _babelHelperVueJsxMergeProps2.default)([this.getChildPropsAndListeners(), {
      'class': this.classes(this.getUIClass(), 'statistic', this.color, this.size, this.floated && this.floated + ' floated', this.inverted && 'inverted', this.horizontal && 'horizontal')
    }]), [this.$slots.default]);
  }
};
},{"babel-helper-vue-jsx-merge-props":"node_modules/babel-helper-vue-jsx-merge-props/index.js","../../lib":"node_modules/semantic-ui-vue/dist/commonjs/lib/index.js","../../lib/PropTypes":"node_modules/semantic-ui-vue/dist/commonjs/lib/PropTypes.js"}],"node_modules/semantic-ui-vue/dist/commonjs/views/Statistic/StatisticValue.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _babelHelperVueJsxMergeProps = require('babel-helper-vue-jsx-merge-props');

var _babelHelperVueJsxMergeProps2 = _interopRequireDefault(_babelHelperVueJsxMergeProps);

var _lib = require('../../lib');

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

exports.default = {
  name: 'SuiStatisticValue',
  mixins: [_lib.SemanticUIVueMixin],
  props: {
    text: Boolean
  },
  render: function render() {
    var h = arguments[0];
    var ElementType = this.getElementType();
    return h(ElementType, (0, _babelHelperVueJsxMergeProps2.default)([this.getChildPropsAndListeners(), {
      'class': this.classes(this.text && 'text', 'value')
    }]), [this.$slots.default]);
  },
  meta: {
    parent: 'SuiStatistic'
  }
};
},{"babel-helper-vue-jsx-merge-props":"node_modules/babel-helper-vue-jsx-merge-props/index.js","../../lib":"node_modules/semantic-ui-vue/dist/commonjs/lib/index.js"}],"node_modules/semantic-ui-vue/dist/commonjs/views/Statistic/StatisticLabel.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _babelHelperVueJsxMergeProps = require('babel-helper-vue-jsx-merge-props');

var _babelHelperVueJsxMergeProps2 = _interopRequireDefault(_babelHelperVueJsxMergeProps);

var _lib = require('../../lib');

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

exports.default = {
  name: 'SuiStatisticLabel',
  mixins: [_lib.SemanticUIVueMixin],
  render: function render() {
    var h = arguments[0];
    var ElementType = this.getElementType();
    return h(ElementType, (0, _babelHelperVueJsxMergeProps2.default)([this.getChildPropsAndListeners(), {
      'class': this.classes('label')
    }]), [this.$slots.default]);
  },
  meta: {
    parent: 'SuiStatistic'
  }
};
},{"babel-helper-vue-jsx-merge-props":"node_modules/babel-helper-vue-jsx-merge-props/index.js","../../lib":"node_modules/semantic-ui-vue/dist/commonjs/lib/index.js"}],"node_modules/semantic-ui-vue/dist/commonjs/views/Statistic/StatisticGroup.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _babelHelperVueJsxMergeProps = require('babel-helper-vue-jsx-merge-props');

var _babelHelperVueJsxMergeProps2 = _interopRequireDefault(_babelHelperVueJsxMergeProps);

var _lib = require('../../lib');

var _PropTypes = require('../../lib/PropTypes');

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

exports.default = {
  name: 'SuiStatisticsGroup',
  mixins: [_lib.SemanticUIVueMixin],
  props: {
    horizontal: Boolean,
    columns: _PropTypes.Enum.Number()
  },
  render: function render() {
    var h = arguments[0];
    var ElementType = this.getElementType();
    return h(ElementType, (0, _babelHelperVueJsxMergeProps2.default)([this.getChildPropsAndListeners(), {
      'class': this.classes(this.num(this.columns), 'ui', 'statistics', this.horizontal && 'horizontal')
    }]), [this.$slots.default]);
  },
  meta: {
    parent: 'SuiStatistic'
  }
};
},{"babel-helper-vue-jsx-merge-props":"node_modules/babel-helper-vue-jsx-merge-props/index.js","../../lib":"node_modules/semantic-ui-vue/dist/commonjs/lib/index.js","../../lib/PropTypes":"node_modules/semantic-ui-vue/dist/commonjs/lib/PropTypes.js"}],"node_modules/semantic-ui-vue/dist/commonjs/views/Statistic/index.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Statistic = require('./Statistic');

Object.defineProperty(exports, 'Statistic', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_Statistic).default;
  }
});

var _StatisticValue = require('./StatisticValue');

Object.defineProperty(exports, 'StatisticValue', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_StatisticValue).default;
  }
});

var _StatisticLabel = require('./StatisticLabel');

Object.defineProperty(exports, 'StatisticLabel', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_StatisticLabel).default;
  }
});

var _StatisticGroup = require('./StatisticGroup');

Object.defineProperty(exports, 'StatisticGroup', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_StatisticGroup).default;
  }
});

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}
},{"./Statistic":"node_modules/semantic-ui-vue/dist/commonjs/views/Statistic/Statistic.js","./StatisticValue":"node_modules/semantic-ui-vue/dist/commonjs/views/Statistic/StatisticValue.js","./StatisticLabel":"node_modules/semantic-ui-vue/dist/commonjs/views/Statistic/StatisticLabel.js","./StatisticGroup":"node_modules/semantic-ui-vue/dist/commonjs/views/Statistic/StatisticGroup.js"}],"node_modules/semantic-ui-vue/dist/commonjs/views/Advertisement/Advertisement.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _babelHelperVueJsxMergeProps = require('babel-helper-vue-jsx-merge-props');

var _babelHelperVueJsxMergeProps2 = _interopRequireDefault(_babelHelperVueJsxMergeProps);

var _lib = require('../../lib');

var _PropTypes = require('../../lib/PropTypes');

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

exports.default = {
  name: 'SuiAdvertisement',
  description: 'An advertisement view presents thrif-party promotional content',
  mixins: [_lib.SemanticUIVueMixin],
  props: {
    centered: {
      type: Boolean,
      description: 'Center the advertisement',
      default: false
    },
    test: {
      type: [String, Number],
      description: 'Text to be displayed on the advertisement.'
    },
    unit: (0, _PropTypes.Enum)(['medium rectangle', 'large rectangle', 'small rectangle', 'vertical rectangle', 'leaderboard', 'half page', 'mobile leaderboard', 'mobile banner', 'button', 'square button', 'small button', 'skyscraper', 'wide skyscraper', 'banner', 'vertical banner', 'top banner', 'half banner', 'leaderboard', 'large leaderboard', 'billboard', 'panorama', 'netboard'], {
      description: 'Define the size of the advertisement',
      type: String,
      required: true
    })
  },
  render: function render() {
    var h = arguments[0];
    var ElementType = this.getElementType();
    return h(ElementType, (0, _babelHelperVueJsxMergeProps2.default)([this.getChildPropsAndListeners(), {
      'class': this.classes('ui', this.centered ? 'centered' : null, this.unit, this.test ? 'test' : null, 'ad'),
      attrs: {
        'data-text': this.test
      }
    }]), [this.$slots.default]);
  }
};
},{"babel-helper-vue-jsx-merge-props":"node_modules/babel-helper-vue-jsx-merge-props/index.js","../../lib":"node_modules/semantic-ui-vue/dist/commonjs/lib/index.js","../../lib/PropTypes":"node_modules/semantic-ui-vue/dist/commonjs/lib/PropTypes.js"}],"node_modules/semantic-ui-vue/dist/commonjs/views/Advertisement/index.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Advertisement = require('./Advertisement');

Object.defineProperty(exports, 'Advertisement', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_Advertisement).default;
  }
});

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}
},{"./Advertisement":"node_modules/semantic-ui-vue/dist/commonjs/views/Advertisement/Advertisement.js"}],"node_modules/semantic-ui-vue/dist/commonjs/views/index.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Card = require('./Card');

Object.keys(_Card).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _Card[key];
    }
  });
});

var _Comment = require('./Comment');

Object.keys(_Comment).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _Comment[key];
    }
  });
});

var _Feed = require('./Feed');

Object.keys(_Feed).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _Feed[key];
    }
  });
});

var _Item = require('./Item');

Object.keys(_Item).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _Item[key];
    }
  });
});

var _Statistic = require('./Statistic');

Object.keys(_Statistic).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _Statistic[key];
    }
  });
});

var _Advertisement = require('./Advertisement');

Object.keys(_Advertisement).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _Advertisement[key];
    }
  });
});
},{"./Card":"node_modules/semantic-ui-vue/dist/commonjs/views/Card/index.js","./Comment":"node_modules/semantic-ui-vue/dist/commonjs/views/Comment/index.js","./Feed":"node_modules/semantic-ui-vue/dist/commonjs/views/Feed/index.js","./Item":"node_modules/semantic-ui-vue/dist/commonjs/views/Item/index.js","./Statistic":"node_modules/semantic-ui-vue/dist/commonjs/views/Statistic/index.js","./Advertisement":"node_modules/semantic-ui-vue/dist/commonjs/views/Advertisement/index.js"}],"node_modules/semantic-ui-vue/dist/commonjs/index.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _collections = require('./collections');

Object.keys(_collections).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _collections[key];
    }
  });
});

var _directives = require('./directives');

Object.keys(_directives).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _directives[key];
    }
  });
});

var _elements = require('./elements');

Object.keys(_elements).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _elements[key];
    }
  });
});

var _modules = require('./modules');

Object.keys(_modules).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _modules[key];
    }
  });
});

var _views = require('./views');

Object.keys(_views).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _views[key];
    }
  });
});

var collections = _interopRequireWildcard(_collections);

var directives = _interopRequireWildcard(_directives);

var elements = _interopRequireWildcard(_elements);

var modules = _interopRequireWildcard(_modules);

var views = _interopRequireWildcard(_views);

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  } else {
    var newObj = {};

    if (obj != null) {
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
      }
    }

    newObj.default = obj;
    return newObj;
  }
}

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

exports.default = function (Vue) {
  Object.values((0, _extends3.default)({}, collections, elements, modules, views)).forEach(function (Comp) {
    return Vue.component(Comp.name, Comp);
  });
  Object.values(directives).forEach(function (directive) {
    return Vue.directive(directive.name, directive);
  });
};
},{"babel-runtime/helpers/extends":"node_modules/babel-runtime/helpers/extends.js","./collections":"node_modules/semantic-ui-vue/dist/commonjs/collections/index.js","./directives":"node_modules/semantic-ui-vue/dist/commonjs/directives/index.js","./elements":"node_modules/semantic-ui-vue/dist/commonjs/elements/index.js","./modules":"node_modules/semantic-ui-vue/dist/commonjs/modules/index.js","./views":"node_modules/semantic-ui-vue/dist/commonjs/views/index.js"}],"node_modules/vue-router/dist/vue-router.esm.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/*!
  * vue-router v3.0.7
  * (c) 2019 Evan You
  * @license MIT
  */

/*  */
function assert(condition, message) {
  if (!condition) {
    throw new Error("[vue-router] " + message);
  }
}

function warn(condition, message) {
  if ("development" !== 'production' && !condition) {
    typeof console !== 'undefined' && console.warn("[vue-router] " + message);
  }
}

function isError(err) {
  return Object.prototype.toString.call(err).indexOf('Error') > -1;
}

function extend(a, b) {
  for (var key in b) {
    a[key] = b[key];
  }

  return a;
}

var View = {
  name: 'RouterView',
  functional: true,
  props: {
    name: {
      type: String,
      default: 'default'
    }
  },
  render: function render(_, ref) {
    var props = ref.props;
    var children = ref.children;
    var parent = ref.parent;
    var data = ref.data; // used by devtools to display a router-view badge

    data.routerView = true; // directly use parent context's createElement() function
    // so that components rendered by router-view can resolve named slots

    var h = parent.$createElement;
    var name = props.name;
    var route = parent.$route;
    var cache = parent._routerViewCache || (parent._routerViewCache = {}); // determine current view depth, also check to see if the tree
    // has been toggled inactive but kept-alive.

    var depth = 0;
    var inactive = false;

    while (parent && parent._routerRoot !== parent) {
      var vnodeData = parent.$vnode && parent.$vnode.data;

      if (vnodeData) {
        if (vnodeData.routerView) {
          depth++;
        }

        if (vnodeData.keepAlive && parent._inactive) {
          inactive = true;
        }
      }

      parent = parent.$parent;
    }

    data.routerViewDepth = depth; // render previous view if the tree is inactive and kept-alive

    if (inactive) {
      return h(cache[name], data, children);
    }

    var matched = route.matched[depth]; // render empty node if no matched route

    if (!matched) {
      cache[name] = null;
      return h();
    }

    var component = cache[name] = matched.components[name]; // attach instance registration hook
    // this will be called in the instance's injected lifecycle hooks

    data.registerRouteInstance = function (vm, val) {
      // val could be undefined for unregistration
      var current = matched.instances[name];

      if (val && current !== vm || !val && current === vm) {
        matched.instances[name] = val;
      }
    } // also register instance in prepatch hook
    // in case the same component instance is reused across different routes
    ;

    (data.hook || (data.hook = {})).prepatch = function (_, vnode) {
      matched.instances[name] = vnode.componentInstance;
    }; // register instance in init hook
    // in case kept-alive component be actived when routes changed


    data.hook.init = function (vnode) {
      if (vnode.data.keepAlive && vnode.componentInstance && vnode.componentInstance !== matched.instances[name]) {
        matched.instances[name] = vnode.componentInstance;
      }
    }; // resolve props


    var propsToPass = data.props = resolveProps(route, matched.props && matched.props[name]);

    if (propsToPass) {
      // clone to prevent mutation
      propsToPass = data.props = extend({}, propsToPass); // pass non-declared props as attrs

      var attrs = data.attrs = data.attrs || {};

      for (var key in propsToPass) {
        if (!component.props || !(key in component.props)) {
          attrs[key] = propsToPass[key];
          delete propsToPass[key];
        }
      }
    }

    return h(component, data, children);
  }
};

function resolveProps(route, config) {
  switch (typeof config) {
    case 'undefined':
      return;

    case 'object':
      return config;

    case 'function':
      return config(route);

    case 'boolean':
      return config ? route.params : undefined;

    default:
      if ("development" !== 'production') {
        warn(false, "props in \"" + route.path + "\" is a " + typeof config + ", " + "expecting an object, function or boolean.");
      }

  }
}
/*  */


var encodeReserveRE = /[!'()*]/g;

var encodeReserveReplacer = function (c) {
  return '%' + c.charCodeAt(0).toString(16);
};

var commaRE = /%2C/g; // fixed encodeURIComponent which is more conformant to RFC3986:
// - escapes [!'()*]
// - preserve commas

var encode = function (str) {
  return encodeURIComponent(str).replace(encodeReserveRE, encodeReserveReplacer).replace(commaRE, ',');
};

var decode = decodeURIComponent;

function resolveQuery(query, extraQuery, _parseQuery) {
  if (extraQuery === void 0) extraQuery = {};
  var parse = _parseQuery || parseQuery;
  var parsedQuery;

  try {
    parsedQuery = parse(query || '');
  } catch (e) {
    "development" !== 'production' && warn(false, e.message);
    parsedQuery = {};
  }

  for (var key in extraQuery) {
    parsedQuery[key] = extraQuery[key];
  }

  return parsedQuery;
}

function parseQuery(query) {
  var res = {};
  query = query.trim().replace(/^(\?|#|&)/, '');

  if (!query) {
    return res;
  }

  query.split('&').forEach(function (param) {
    var parts = param.replace(/\+/g, ' ').split('=');
    var key = decode(parts.shift());
    var val = parts.length > 0 ? decode(parts.join('=')) : null;

    if (res[key] === undefined) {
      res[key] = val;
    } else if (Array.isArray(res[key])) {
      res[key].push(val);
    } else {
      res[key] = [res[key], val];
    }
  });
  return res;
}

function stringifyQuery(obj) {
  var res = obj ? Object.keys(obj).map(function (key) {
    var val = obj[key];

    if (val === undefined) {
      return '';
    }

    if (val === null) {
      return encode(key);
    }

    if (Array.isArray(val)) {
      var result = [];
      val.forEach(function (val2) {
        if (val2 === undefined) {
          return;
        }

        if (val2 === null) {
          result.push(encode(key));
        } else {
          result.push(encode(key) + '=' + encode(val2));
        }
      });
      return result.join('&');
    }

    return encode(key) + '=' + encode(val);
  }).filter(function (x) {
    return x.length > 0;
  }).join('&') : null;
  return res ? "?" + res : '';
}
/*  */


var trailingSlashRE = /\/?$/;

function createRoute(record, location, redirectedFrom, router) {
  var stringifyQuery$$1 = router && router.options.stringifyQuery;
  var query = location.query || {};

  try {
    query = clone(query);
  } catch (e) {}

  var route = {
    name: location.name || record && record.name,
    meta: record && record.meta || {},
    path: location.path || '/',
    hash: location.hash || '',
    query: query,
    params: location.params || {},
    fullPath: getFullPath(location, stringifyQuery$$1),
    matched: record ? formatMatch(record) : []
  };

  if (redirectedFrom) {
    route.redirectedFrom = getFullPath(redirectedFrom, stringifyQuery$$1);
  }

  return Object.freeze(route);
}

function clone(value) {
  if (Array.isArray(value)) {
    return value.map(clone);
  } else if (value && typeof value === 'object') {
    var res = {};

    for (var key in value) {
      res[key] = clone(value[key]);
    }

    return res;
  } else {
    return value;
  }
} // the starting route that represents the initial state


var START = createRoute(null, {
  path: '/'
});

function formatMatch(record) {
  var res = [];

  while (record) {
    res.unshift(record);
    record = record.parent;
  }

  return res;
}

function getFullPath(ref, _stringifyQuery) {
  var path = ref.path;
  var query = ref.query;
  if (query === void 0) query = {};
  var hash = ref.hash;
  if (hash === void 0) hash = '';
  var stringify = _stringifyQuery || stringifyQuery;
  return (path || '/') + stringify(query) + hash;
}

function isSameRoute(a, b) {
  if (b === START) {
    return a === b;
  } else if (!b) {
    return false;
  } else if (a.path && b.path) {
    return a.path.replace(trailingSlashRE, '') === b.path.replace(trailingSlashRE, '') && a.hash === b.hash && isObjectEqual(a.query, b.query);
  } else if (a.name && b.name) {
    return a.name === b.name && a.hash === b.hash && isObjectEqual(a.query, b.query) && isObjectEqual(a.params, b.params);
  } else {
    return false;
  }
}

function isObjectEqual(a, b) {
  if (a === void 0) a = {};
  if (b === void 0) b = {}; // handle null value #1566

  if (!a || !b) {
    return a === b;
  }

  var aKeys = Object.keys(a);
  var bKeys = Object.keys(b);

  if (aKeys.length !== bKeys.length) {
    return false;
  }

  return aKeys.every(function (key) {
    var aVal = a[key];
    var bVal = b[key]; // check nested equality

    if (typeof aVal === 'object' && typeof bVal === 'object') {
      return isObjectEqual(aVal, bVal);
    }

    return String(aVal) === String(bVal);
  });
}

function isIncludedRoute(current, target) {
  return current.path.replace(trailingSlashRE, '/').indexOf(target.path.replace(trailingSlashRE, '/')) === 0 && (!target.hash || current.hash === target.hash) && queryIncludes(current.query, target.query);
}

function queryIncludes(current, target) {
  for (var key in target) {
    if (!(key in current)) {
      return false;
    }
  }

  return true;
}
/*  */
// work around weird flow bug


var toTypes = [String, Object];
var eventTypes = [String, Array];
var Link = {
  name: 'RouterLink',
  props: {
    to: {
      type: toTypes,
      required: true
    },
    tag: {
      type: String,
      default: 'a'
    },
    exact: Boolean,
    append: Boolean,
    replace: Boolean,
    activeClass: String,
    exactActiveClass: String,
    event: {
      type: eventTypes,
      default: 'click'
    }
  },
  render: function render(h) {
    var this$1 = this;
    var router = this.$router;
    var current = this.$route;
    var ref = router.resolve(this.to, current, this.append);
    var location = ref.location;
    var route = ref.route;
    var href = ref.href;
    var classes = {};
    var globalActiveClass = router.options.linkActiveClass;
    var globalExactActiveClass = router.options.linkExactActiveClass; // Support global empty active class

    var activeClassFallback = globalActiveClass == null ? 'router-link-active' : globalActiveClass;
    var exactActiveClassFallback = globalExactActiveClass == null ? 'router-link-exact-active' : globalExactActiveClass;
    var activeClass = this.activeClass == null ? activeClassFallback : this.activeClass;
    var exactActiveClass = this.exactActiveClass == null ? exactActiveClassFallback : this.exactActiveClass;
    var compareTarget = location.path ? createRoute(null, location, null, router) : route;
    classes[exactActiveClass] = isSameRoute(current, compareTarget);
    classes[activeClass] = this.exact ? classes[exactActiveClass] : isIncludedRoute(current, compareTarget);

    var handler = function (e) {
      if (guardEvent(e)) {
        if (this$1.replace) {
          router.replace(location);
        } else {
          router.push(location);
        }
      }
    };

    var on = {
      click: guardEvent
    };

    if (Array.isArray(this.event)) {
      this.event.forEach(function (e) {
        on[e] = handler;
      });
    } else {
      on[this.event] = handler;
    }

    var data = {
      class: classes
    };

    if (this.tag === 'a') {
      data.on = on;
      data.attrs = {
        href: href
      };
    } else {
      // find the first <a> child and apply listener and href
      var a = findAnchor(this.$slots.default);

      if (a) {
        // in case the <a> is a static node
        a.isStatic = false;
        var aData = a.data = extend({}, a.data);
        aData.on = on;
        var aAttrs = a.data.attrs = extend({}, a.data.attrs);
        aAttrs.href = href;
      } else {
        // doesn't have <a> child, apply listener to self
        data.on = on;
      }
    }

    return h(this.tag, data, this.$slots.default);
  }
};

function guardEvent(e) {
  // don't redirect with control keys
  if (e.metaKey || e.altKey || e.ctrlKey || e.shiftKey) {
    return;
  } // don't redirect when preventDefault called


  if (e.defaultPrevented) {
    return;
  } // don't redirect on right click


  if (e.button !== undefined && e.button !== 0) {
    return;
  } // don't redirect if `target="_blank"`


  if (e.currentTarget && e.currentTarget.getAttribute) {
    var target = e.currentTarget.getAttribute('target');

    if (/\b_blank\b/i.test(target)) {
      return;
    }
  } // this may be a Weex event which doesn't have this method


  if (e.preventDefault) {
    e.preventDefault();
  }

  return true;
}

function findAnchor(children) {
  if (children) {
    var child;

    for (var i = 0; i < children.length; i++) {
      child = children[i];

      if (child.tag === 'a') {
        return child;
      }

      if (child.children && (child = findAnchor(child.children))) {
        return child;
      }
    }
  }
}

var _Vue;

function install(Vue) {
  if (install.installed && _Vue === Vue) {
    return;
  }

  install.installed = true;
  _Vue = Vue;

  var isDef = function (v) {
    return v !== undefined;
  };

  var registerInstance = function (vm, callVal) {
    var i = vm.$options._parentVnode;

    if (isDef(i) && isDef(i = i.data) && isDef(i = i.registerRouteInstance)) {
      i(vm, callVal);
    }
  };

  Vue.mixin({
    beforeCreate: function beforeCreate() {
      if (isDef(this.$options.router)) {
        this._routerRoot = this;
        this._router = this.$options.router;

        this._router.init(this);

        Vue.util.defineReactive(this, '_route', this._router.history.current);
      } else {
        this._routerRoot = this.$parent && this.$parent._routerRoot || this;
      }

      registerInstance(this, this);
    },
    destroyed: function destroyed() {
      registerInstance(this);
    }
  });
  Object.defineProperty(Vue.prototype, '$router', {
    get: function get() {
      return this._routerRoot._router;
    }
  });
  Object.defineProperty(Vue.prototype, '$route', {
    get: function get() {
      return this._routerRoot._route;
    }
  });
  Vue.component('RouterView', View);
  Vue.component('RouterLink', Link);
  var strats = Vue.config.optionMergeStrategies; // use the same hook merging strategy for route hooks

  strats.beforeRouteEnter = strats.beforeRouteLeave = strats.beforeRouteUpdate = strats.created;
}
/*  */


var inBrowser = typeof window !== 'undefined';
/*  */

function resolvePath(relative, base, append) {
  var firstChar = relative.charAt(0);

  if (firstChar === '/') {
    return relative;
  }

  if (firstChar === '?' || firstChar === '#') {
    return base + relative;
  }

  var stack = base.split('/'); // remove trailing segment if:
  // - not appending
  // - appending to trailing slash (last segment is empty)

  if (!append || !stack[stack.length - 1]) {
    stack.pop();
  } // resolve relative path


  var segments = relative.replace(/^\//, '').split('/');

  for (var i = 0; i < segments.length; i++) {
    var segment = segments[i];

    if (segment === '..') {
      stack.pop();
    } else if (segment !== '.') {
      stack.push(segment);
    }
  } // ensure leading slash


  if (stack[0] !== '') {
    stack.unshift('');
  }

  return stack.join('/');
}

function parsePath(path) {
  var hash = '';
  var query = '';
  var hashIndex = path.indexOf('#');

  if (hashIndex >= 0) {
    hash = path.slice(hashIndex);
    path = path.slice(0, hashIndex);
  }

  var queryIndex = path.indexOf('?');

  if (queryIndex >= 0) {
    query = path.slice(queryIndex + 1);
    path = path.slice(0, queryIndex);
  }

  return {
    path: path,
    query: query,
    hash: hash
  };
}

function cleanPath(path) {
  return path.replace(/\/\//g, '/');
}

var isarray = Array.isArray || function (arr) {
  return Object.prototype.toString.call(arr) == '[object Array]';
};
/**
 * Expose `pathToRegexp`.
 */


var pathToRegexp_1 = pathToRegexp;
var parse_1 = parse;
var compile_1 = compile;
var tokensToFunction_1 = tokensToFunction;
var tokensToRegExp_1 = tokensToRegExp;
/**
 * The main path matching regexp utility.
 *
 * @type {RegExp}
 */

var PATH_REGEXP = new RegExp([// Match escaped characters that would otherwise appear in future matches.
// This allows the user to escape special characters that won't transform.
'(\\\\.)', // Match Express-style parameters and un-named parameters with a prefix
// and optional suffixes. Matches appear as:
//
// "/:test(\\d+)?" => ["/", "test", "\d+", undefined, "?", undefined]
// "/route(\\d+)"  => [undefined, undefined, undefined, "\d+", undefined, undefined]
// "/*"            => ["/", undefined, undefined, undefined, undefined, "*"]
'([\\/.])?(?:(?:\\:(\\w+)(?:\\(((?:\\\\.|[^\\\\()])+)\\))?|\\(((?:\\\\.|[^\\\\()])+)\\))([+*?])?|(\\*))'].join('|'), 'g');
/**
 * Parse a string for the raw tokens.
 *
 * @param  {string}  str
 * @param  {Object=} options
 * @return {!Array}
 */

function parse(str, options) {
  var tokens = [];
  var key = 0;
  var index = 0;
  var path = '';
  var defaultDelimiter = options && options.delimiter || '/';
  var res;

  while ((res = PATH_REGEXP.exec(str)) != null) {
    var m = res[0];
    var escaped = res[1];
    var offset = res.index;
    path += str.slice(index, offset);
    index = offset + m.length; // Ignore already escaped sequences.

    if (escaped) {
      path += escaped[1];
      continue;
    }

    var next = str[index];
    var prefix = res[2];
    var name = res[3];
    var capture = res[4];
    var group = res[5];
    var modifier = res[6];
    var asterisk = res[7]; // Push the current path onto the tokens.

    if (path) {
      tokens.push(path);
      path = '';
    }

    var partial = prefix != null && next != null && next !== prefix;
    var repeat = modifier === '+' || modifier === '*';
    var optional = modifier === '?' || modifier === '*';
    var delimiter = res[2] || defaultDelimiter;
    var pattern = capture || group;
    tokens.push({
      name: name || key++,
      prefix: prefix || '',
      delimiter: delimiter,
      optional: optional,
      repeat: repeat,
      partial: partial,
      asterisk: !!asterisk,
      pattern: pattern ? escapeGroup(pattern) : asterisk ? '.*' : '[^' + escapeString(delimiter) + ']+?'
    });
  } // Match any characters still remaining.


  if (index < str.length) {
    path += str.substr(index);
  } // If the path exists, push it onto the end.


  if (path) {
    tokens.push(path);
  }

  return tokens;
}
/**
 * Compile a string to a template function for the path.
 *
 * @param  {string}             str
 * @param  {Object=}            options
 * @return {!function(Object=, Object=)}
 */


function compile(str, options) {
  return tokensToFunction(parse(str, options));
}
/**
 * Prettier encoding of URI path segments.
 *
 * @param  {string}
 * @return {string}
 */


function encodeURIComponentPretty(str) {
  return encodeURI(str).replace(/[\/?#]/g, function (c) {
    return '%' + c.charCodeAt(0).toString(16).toUpperCase();
  });
}
/**
 * Encode the asterisk parameter. Similar to `pretty`, but allows slashes.
 *
 * @param  {string}
 * @return {string}
 */


function encodeAsterisk(str) {
  return encodeURI(str).replace(/[?#]/g, function (c) {
    return '%' + c.charCodeAt(0).toString(16).toUpperCase();
  });
}
/**
 * Expose a method for transforming tokens into the path function.
 */


function tokensToFunction(tokens) {
  // Compile all the tokens into regexps.
  var matches = new Array(tokens.length); // Compile all the patterns before compilation.

  for (var i = 0; i < tokens.length; i++) {
    if (typeof tokens[i] === 'object') {
      matches[i] = new RegExp('^(?:' + tokens[i].pattern + ')$');
    }
  }

  return function (obj, opts) {
    var path = '';
    var data = obj || {};
    var options = opts || {};
    var encode = options.pretty ? encodeURIComponentPretty : encodeURIComponent;

    for (var i = 0; i < tokens.length; i++) {
      var token = tokens[i];

      if (typeof token === 'string') {
        path += token;
        continue;
      }

      var value = data[token.name];
      var segment;

      if (value == null) {
        if (token.optional) {
          // Prepend partial segment prefixes.
          if (token.partial) {
            path += token.prefix;
          }

          continue;
        } else {
          throw new TypeError('Expected "' + token.name + '" to be defined');
        }
      }

      if (isarray(value)) {
        if (!token.repeat) {
          throw new TypeError('Expected "' + token.name + '" to not repeat, but received `' + JSON.stringify(value) + '`');
        }

        if (value.length === 0) {
          if (token.optional) {
            continue;
          } else {
            throw new TypeError('Expected "' + token.name + '" to not be empty');
          }
        }

        for (var j = 0; j < value.length; j++) {
          segment = encode(value[j]);

          if (!matches[i].test(segment)) {
            throw new TypeError('Expected all "' + token.name + '" to match "' + token.pattern + '", but received `' + JSON.stringify(segment) + '`');
          }

          path += (j === 0 ? token.prefix : token.delimiter) + segment;
        }

        continue;
      }

      segment = token.asterisk ? encodeAsterisk(value) : encode(value);

      if (!matches[i].test(segment)) {
        throw new TypeError('Expected "' + token.name + '" to match "' + token.pattern + '", but received "' + segment + '"');
      }

      path += token.prefix + segment;
    }

    return path;
  };
}
/**
 * Escape a regular expression string.
 *
 * @param  {string} str
 * @return {string}
 */


function escapeString(str) {
  return str.replace(/([.+*?=^!:${}()[\]|\/\\])/g, '\\$1');
}
/**
 * Escape the capturing group by escaping special characters and meaning.
 *
 * @param  {string} group
 * @return {string}
 */


function escapeGroup(group) {
  return group.replace(/([=!:$\/()])/g, '\\$1');
}
/**
 * Attach the keys as a property of the regexp.
 *
 * @param  {!RegExp} re
 * @param  {Array}   keys
 * @return {!RegExp}
 */


function attachKeys(re, keys) {
  re.keys = keys;
  return re;
}
/**
 * Get the flags for a regexp from the options.
 *
 * @param  {Object} options
 * @return {string}
 */


function flags(options) {
  return options.sensitive ? '' : 'i';
}
/**
 * Pull out keys from a regexp.
 *
 * @param  {!RegExp} path
 * @param  {!Array}  keys
 * @return {!RegExp}
 */


function regexpToRegexp(path, keys) {
  // Use a negative lookahead to match only capturing groups.
  var groups = path.source.match(/\((?!\?)/g);

  if (groups) {
    for (var i = 0; i < groups.length; i++) {
      keys.push({
        name: i,
        prefix: null,
        delimiter: null,
        optional: false,
        repeat: false,
        partial: false,
        asterisk: false,
        pattern: null
      });
    }
  }

  return attachKeys(path, keys);
}
/**
 * Transform an array into a regexp.
 *
 * @param  {!Array}  path
 * @param  {Array}   keys
 * @param  {!Object} options
 * @return {!RegExp}
 */


function arrayToRegexp(path, keys, options) {
  var parts = [];

  for (var i = 0; i < path.length; i++) {
    parts.push(pathToRegexp(path[i], keys, options).source);
  }

  var regexp = new RegExp('(?:' + parts.join('|') + ')', flags(options));
  return attachKeys(regexp, keys);
}
/**
 * Create a path regexp from string input.
 *
 * @param  {string}  path
 * @param  {!Array}  keys
 * @param  {!Object} options
 * @return {!RegExp}
 */


function stringToRegexp(path, keys, options) {
  return tokensToRegExp(parse(path, options), keys, options);
}
/**
 * Expose a function for taking tokens and returning a RegExp.
 *
 * @param  {!Array}          tokens
 * @param  {(Array|Object)=} keys
 * @param  {Object=}         options
 * @return {!RegExp}
 */


function tokensToRegExp(tokens, keys, options) {
  if (!isarray(keys)) {
    options =
    /** @type {!Object} */
    keys || options;
    keys = [];
  }

  options = options || {};
  var strict = options.strict;
  var end = options.end !== false;
  var route = ''; // Iterate over the tokens and create our regexp string.

  for (var i = 0; i < tokens.length; i++) {
    var token = tokens[i];

    if (typeof token === 'string') {
      route += escapeString(token);
    } else {
      var prefix = escapeString(token.prefix);
      var capture = '(?:' + token.pattern + ')';
      keys.push(token);

      if (token.repeat) {
        capture += '(?:' + prefix + capture + ')*';
      }

      if (token.optional) {
        if (!token.partial) {
          capture = '(?:' + prefix + '(' + capture + '))?';
        } else {
          capture = prefix + '(' + capture + ')?';
        }
      } else {
        capture = prefix + '(' + capture + ')';
      }

      route += capture;
    }
  }

  var delimiter = escapeString(options.delimiter || '/');
  var endsWithDelimiter = route.slice(-delimiter.length) === delimiter; // In non-strict mode we allow a slash at the end of match. If the path to
  // match already ends with a slash, we remove it for consistency. The slash
  // is valid at the end of a path match, not in the middle. This is important
  // in non-ending mode, where "/test/" shouldn't match "/test//route".

  if (!strict) {
    route = (endsWithDelimiter ? route.slice(0, -delimiter.length) : route) + '(?:' + delimiter + '(?=$))?';
  }

  if (end) {
    route += '$';
  } else {
    // In non-ending mode, we need the capturing groups to match as much as
    // possible by using a positive lookahead to the end or next path segment.
    route += strict && endsWithDelimiter ? '' : '(?=' + delimiter + '|$)';
  }

  return attachKeys(new RegExp('^' + route, flags(options)), keys);
}
/**
 * Normalize the given path string, returning a regular expression.
 *
 * An empty array can be passed in for the keys, which will hold the
 * placeholder key descriptions. For example, using `/user/:id`, `keys` will
 * contain `[{ name: 'id', delimiter: '/', optional: false, repeat: false }]`.
 *
 * @param  {(string|RegExp|Array)} path
 * @param  {(Array|Object)=}       keys
 * @param  {Object=}               options
 * @return {!RegExp}
 */


function pathToRegexp(path, keys, options) {
  if (!isarray(keys)) {
    options =
    /** @type {!Object} */
    keys || options;
    keys = [];
  }

  options = options || {};

  if (path instanceof RegExp) {
    return regexpToRegexp(path,
    /** @type {!Array} */
    keys);
  }

  if (isarray(path)) {
    return arrayToRegexp(
    /** @type {!Array} */
    path,
    /** @type {!Array} */
    keys, options);
  }

  return stringToRegexp(
  /** @type {string} */
  path,
  /** @type {!Array} */
  keys, options);
}

pathToRegexp_1.parse = parse_1;
pathToRegexp_1.compile = compile_1;
pathToRegexp_1.tokensToFunction = tokensToFunction_1;
pathToRegexp_1.tokensToRegExp = tokensToRegExp_1;
/*  */
// $flow-disable-line

var regexpCompileCache = Object.create(null);

function fillParams(path, params, routeMsg) {
  params = params || {};

  try {
    var filler = regexpCompileCache[path] || (regexpCompileCache[path] = pathToRegexp_1.compile(path)); // Fix #2505 resolving asterisk routes { name: 'not-found', params: { pathMatch: '/not-found' }}

    if (params.pathMatch) {
      params[0] = params.pathMatch;
    }

    return filler(params, {
      pretty: true
    });
  } catch (e) {
    if ("development" !== 'production') {
      warn(false, "missing param for " + routeMsg + ": " + e.message);
    }

    return '';
  } finally {
    // delete the 0 if it was added
    delete params[0];
  }
}
/*  */


function createRouteMap(routes, oldPathList, oldPathMap, oldNameMap) {
  // the path list is used to control path matching priority
  var pathList = oldPathList || []; // $flow-disable-line

  var pathMap = oldPathMap || Object.create(null); // $flow-disable-line

  var nameMap = oldNameMap || Object.create(null);
  routes.forEach(function (route) {
    addRouteRecord(pathList, pathMap, nameMap, route);
  }); // ensure wildcard routes are always at the end

  for (var i = 0, l = pathList.length; i < l; i++) {
    if (pathList[i] === '*') {
      pathList.push(pathList.splice(i, 1)[0]);
      l--;
      i--;
    }
  }

  return {
    pathList: pathList,
    pathMap: pathMap,
    nameMap: nameMap
  };
}

function addRouteRecord(pathList, pathMap, nameMap, route, parent, matchAs) {
  var path = route.path;
  var name = route.name;

  if ("development" !== 'production') {
    assert(path != null, "\"path\" is required in a route configuration.");
    assert(typeof route.component !== 'string', "route config \"component\" for path: " + String(path || name) + " cannot be a " + "string id. Use an actual component instead.");
  }

  var pathToRegexpOptions = route.pathToRegexpOptions || {};
  var normalizedPath = normalizePath(path, parent, pathToRegexpOptions.strict);

  if (typeof route.caseSensitive === 'boolean') {
    pathToRegexpOptions.sensitive = route.caseSensitive;
  }

  var record = {
    path: normalizedPath,
    regex: compileRouteRegex(normalizedPath, pathToRegexpOptions),
    components: route.components || {
      default: route.component
    },
    instances: {},
    name: name,
    parent: parent,
    matchAs: matchAs,
    redirect: route.redirect,
    beforeEnter: route.beforeEnter,
    meta: route.meta || {},
    props: route.props == null ? {} : route.components ? route.props : {
      default: route.props
    }
  };

  if (route.children) {
    // Warn if route is named, does not redirect and has a default child route.
    // If users navigate to this route by name, the default child will
    // not be rendered (GH Issue #629)
    if ("development" !== 'production') {
      if (route.name && !route.redirect && route.children.some(function (child) {
        return /^\/?$/.test(child.path);
      })) {
        warn(false, "Named Route '" + route.name + "' has a default child route. " + "When navigating to this named route (:to=\"{name: '" + route.name + "'\"), " + "the default child route will not be rendered. Remove the name from " + "this route and use the name of the default child route for named " + "links instead.");
      }
    }

    route.children.forEach(function (child) {
      var childMatchAs = matchAs ? cleanPath(matchAs + "/" + child.path) : undefined;
      addRouteRecord(pathList, pathMap, nameMap, child, record, childMatchAs);
    });
  }

  if (route.alias !== undefined) {
    var aliases = Array.isArray(route.alias) ? route.alias : [route.alias];
    aliases.forEach(function (alias) {
      var aliasRoute = {
        path: alias,
        children: route.children
      };
      addRouteRecord(pathList, pathMap, nameMap, aliasRoute, parent, record.path || '/' // matchAs
      );
    });
  }

  if (!pathMap[record.path]) {
    pathList.push(record.path);
    pathMap[record.path] = record;
  }

  if (name) {
    if (!nameMap[name]) {
      nameMap[name] = record;
    } else if ("development" !== 'production' && !matchAs) {
      warn(false, "Duplicate named routes definition: " + "{ name: \"" + name + "\", path: \"" + record.path + "\" }");
    }
  }
}

function compileRouteRegex(path, pathToRegexpOptions) {
  var regex = pathToRegexp_1(path, [], pathToRegexpOptions);

  if ("development" !== 'production') {
    var keys = Object.create(null);
    regex.keys.forEach(function (key) {
      warn(!keys[key.name], "Duplicate param keys in route with path: \"" + path + "\"");
      keys[key.name] = true;
    });
  }

  return regex;
}

function normalizePath(path, parent, strict) {
  if (!strict) {
    path = path.replace(/\/$/, '');
  }

  if (path[0] === '/') {
    return path;
  }

  if (parent == null) {
    return path;
  }

  return cleanPath(parent.path + "/" + path);
}
/*  */


function normalizeLocation(raw, current, append, router) {
  var next = typeof raw === 'string' ? {
    path: raw
  } : raw; // named target

  if (next._normalized) {
    return next;
  } else if (next.name) {
    return extend({}, raw);
  } // relative params


  if (!next.path && next.params && current) {
    next = extend({}, next);
    next._normalized = true;
    var params = extend(extend({}, current.params), next.params);

    if (current.name) {
      next.name = current.name;
      next.params = params;
    } else if (current.matched.length) {
      var rawPath = current.matched[current.matched.length - 1].path;
      next.path = fillParams(rawPath, params, "path " + current.path);
    } else if ("development" !== 'production') {
      warn(false, "relative params navigation requires a current route.");
    }

    return next;
  }

  var parsedPath = parsePath(next.path || '');
  var basePath = current && current.path || '/';
  var path = parsedPath.path ? resolvePath(parsedPath.path, basePath, append || next.append) : basePath;
  var query = resolveQuery(parsedPath.query, next.query, router && router.options.parseQuery);
  var hash = next.hash || parsedPath.hash;

  if (hash && hash.charAt(0) !== '#') {
    hash = "#" + hash;
  }

  return {
    _normalized: true,
    path: path,
    query: query,
    hash: hash
  };
}
/*  */


function createMatcher(routes, router) {
  var ref = createRouteMap(routes);
  var pathList = ref.pathList;
  var pathMap = ref.pathMap;
  var nameMap = ref.nameMap;

  function addRoutes(routes) {
    createRouteMap(routes, pathList, pathMap, nameMap);
  }

  function match(raw, currentRoute, redirectedFrom) {
    var location = normalizeLocation(raw, currentRoute, false, router);
    var name = location.name;

    if (name) {
      var record = nameMap[name];

      if ("development" !== 'production') {
        warn(record, "Route with name '" + name + "' does not exist");
      }

      if (!record) {
        return _createRoute(null, location);
      }

      var paramNames = record.regex.keys.filter(function (key) {
        return !key.optional;
      }).map(function (key) {
        return key.name;
      });

      if (typeof location.params !== 'object') {
        location.params = {};
      }

      if (currentRoute && typeof currentRoute.params === 'object') {
        for (var key in currentRoute.params) {
          if (!(key in location.params) && paramNames.indexOf(key) > -1) {
            location.params[key] = currentRoute.params[key];
          }
        }
      }

      location.path = fillParams(record.path, location.params, "named route \"" + name + "\"");
      return _createRoute(record, location, redirectedFrom);
    } else if (location.path) {
      location.params = {};

      for (var i = 0; i < pathList.length; i++) {
        var path = pathList[i];
        var record$1 = pathMap[path];

        if (matchRoute(record$1.regex, location.path, location.params)) {
          return _createRoute(record$1, location, redirectedFrom);
        }
      }
    } // no match


    return _createRoute(null, location);
  }

  function redirect(record, location) {
    var originalRedirect = record.redirect;
    var redirect = typeof originalRedirect === 'function' ? originalRedirect(createRoute(record, location, null, router)) : originalRedirect;

    if (typeof redirect === 'string') {
      redirect = {
        path: redirect
      };
    }

    if (!redirect || typeof redirect !== 'object') {
      if ("development" !== 'production') {
        warn(false, "invalid redirect option: " + JSON.stringify(redirect));
      }

      return _createRoute(null, location);
    }

    var re = redirect;
    var name = re.name;
    var path = re.path;
    var query = location.query;
    var hash = location.hash;
    var params = location.params;
    query = re.hasOwnProperty('query') ? re.query : query;
    hash = re.hasOwnProperty('hash') ? re.hash : hash;
    params = re.hasOwnProperty('params') ? re.params : params;

    if (name) {
      // resolved named direct
      var targetRecord = nameMap[name];

      if ("development" !== 'production') {
        assert(targetRecord, "redirect failed: named route \"" + name + "\" not found.");
      }

      return match({
        _normalized: true,
        name: name,
        query: query,
        hash: hash,
        params: params
      }, undefined, location);
    } else if (path) {
      // 1. resolve relative redirect
      var rawPath = resolveRecordPath(path, record); // 2. resolve params

      var resolvedPath = fillParams(rawPath, params, "redirect route with path \"" + rawPath + "\""); // 3. rematch with existing query and hash

      return match({
        _normalized: true,
        path: resolvedPath,
        query: query,
        hash: hash
      }, undefined, location);
    } else {
      if ("development" !== 'production') {
        warn(false, "invalid redirect option: " + JSON.stringify(redirect));
      }

      return _createRoute(null, location);
    }
  }

  function alias(record, location, matchAs) {
    var aliasedPath = fillParams(matchAs, location.params, "aliased route with path \"" + matchAs + "\"");
    var aliasedMatch = match({
      _normalized: true,
      path: aliasedPath
    });

    if (aliasedMatch) {
      var matched = aliasedMatch.matched;
      var aliasedRecord = matched[matched.length - 1];
      location.params = aliasedMatch.params;
      return _createRoute(aliasedRecord, location);
    }

    return _createRoute(null, location);
  }

  function _createRoute(record, location, redirectedFrom) {
    if (record && record.redirect) {
      return redirect(record, redirectedFrom || location);
    }

    if (record && record.matchAs) {
      return alias(record, location, record.matchAs);
    }

    return createRoute(record, location, redirectedFrom, router);
  }

  return {
    match: match,
    addRoutes: addRoutes
  };
}

function matchRoute(regex, path, params) {
  var m = path.match(regex);

  if (!m) {
    return false;
  } else if (!params) {
    return true;
  }

  for (var i = 1, len = m.length; i < len; ++i) {
    var key = regex.keys[i - 1];
    var val = typeof m[i] === 'string' ? decodeURIComponent(m[i]) : m[i];

    if (key) {
      // Fix #1994: using * with props: true generates a param named 0
      params[key.name || 'pathMatch'] = val;
    }
  }

  return true;
}

function resolveRecordPath(path, record) {
  return resolvePath(path, record.parent ? record.parent.path : '/', true);
}
/*  */


var positionStore = Object.create(null);

function setupScroll() {
  // Fix for #1585 for Firefox
  // Fix for #2195 Add optional third attribute to workaround a bug in safari https://bugs.webkit.org/show_bug.cgi?id=182678
  // Fix for #2774 Support for apps loaded from Windows file shares not mapped to network drives: replaced location.origin with
  // window.location.protocol + '//' + window.location.host
  // location.host contains the port and location.hostname doesn't
  var protocolAndPath = window.location.protocol + '//' + window.location.host;
  var absolutePath = window.location.href.replace(protocolAndPath, '');
  window.history.replaceState({
    key: getStateKey()
  }, '', absolutePath);
  window.addEventListener('popstate', function (e) {
    saveScrollPosition();

    if (e.state && e.state.key) {
      setStateKey(e.state.key);
    }
  });
}

function handleScroll(router, to, from, isPop) {
  if (!router.app) {
    return;
  }

  var behavior = router.options.scrollBehavior;

  if (!behavior) {
    return;
  }

  if ("development" !== 'production') {
    assert(typeof behavior === 'function', "scrollBehavior must be a function");
  } // wait until re-render finishes before scrolling


  router.app.$nextTick(function () {
    var position = getScrollPosition();
    var shouldScroll = behavior.call(router, to, from, isPop ? position : null);

    if (!shouldScroll) {
      return;
    }

    if (typeof shouldScroll.then === 'function') {
      shouldScroll.then(function (shouldScroll) {
        scrollToPosition(shouldScroll, position);
      }).catch(function (err) {
        if ("development" !== 'production') {
          assert(false, err.toString());
        }
      });
    } else {
      scrollToPosition(shouldScroll, position);
    }
  });
}

function saveScrollPosition() {
  var key = getStateKey();

  if (key) {
    positionStore[key] = {
      x: window.pageXOffset,
      y: window.pageYOffset
    };
  }
}

function getScrollPosition() {
  var key = getStateKey();

  if (key) {
    return positionStore[key];
  }
}

function getElementPosition(el, offset) {
  var docEl = document.documentElement;
  var docRect = docEl.getBoundingClientRect();
  var elRect = el.getBoundingClientRect();
  return {
    x: elRect.left - docRect.left - offset.x,
    y: elRect.top - docRect.top - offset.y
  };
}

function isValidPosition(obj) {
  return isNumber(obj.x) || isNumber(obj.y);
}

function normalizePosition(obj) {
  return {
    x: isNumber(obj.x) ? obj.x : window.pageXOffset,
    y: isNumber(obj.y) ? obj.y : window.pageYOffset
  };
}

function normalizeOffset(obj) {
  return {
    x: isNumber(obj.x) ? obj.x : 0,
    y: isNumber(obj.y) ? obj.y : 0
  };
}

function isNumber(v) {
  return typeof v === 'number';
}

function scrollToPosition(shouldScroll, position) {
  var isObject = typeof shouldScroll === 'object';

  if (isObject && typeof shouldScroll.selector === 'string') {
    var el = document.querySelector(shouldScroll.selector);

    if (el) {
      var offset = shouldScroll.offset && typeof shouldScroll.offset === 'object' ? shouldScroll.offset : {};
      offset = normalizeOffset(offset);
      position = getElementPosition(el, offset);
    } else if (isValidPosition(shouldScroll)) {
      position = normalizePosition(shouldScroll);
    }
  } else if (isObject && isValidPosition(shouldScroll)) {
    position = normalizePosition(shouldScroll);
  }

  if (position) {
    window.scrollTo(position.x, position.y);
  }
}
/*  */


var supportsPushState = inBrowser && function () {
  var ua = window.navigator.userAgent;

  if ((ua.indexOf('Android 2.') !== -1 || ua.indexOf('Android 4.0') !== -1) && ua.indexOf('Mobile Safari') !== -1 && ua.indexOf('Chrome') === -1 && ua.indexOf('Windows Phone') === -1) {
    return false;
  }

  return window.history && 'pushState' in window.history;
}(); // use User Timing api (if present) for more accurate key precision


var Time = inBrowser && window.performance && window.performance.now ? window.performance : Date;

var _key = genKey();

function genKey() {
  return Time.now().toFixed(3);
}

function getStateKey() {
  return _key;
}

function setStateKey(key) {
  _key = key;
}

function pushState(url, replace) {
  saveScrollPosition(); // try...catch the pushState call to get around Safari
  // DOM Exception 18 where it limits to 100 pushState calls

  var history = window.history;

  try {
    if (replace) {
      history.replaceState({
        key: _key
      }, '', url);
    } else {
      _key = genKey();
      history.pushState({
        key: _key
      }, '', url);
    }
  } catch (e) {
    window.location[replace ? 'replace' : 'assign'](url);
  }
}

function replaceState(url) {
  pushState(url, true);
}
/*  */


function runQueue(queue, fn, cb) {
  var step = function (index) {
    if (index >= queue.length) {
      cb();
    } else {
      if (queue[index]) {
        fn(queue[index], function () {
          step(index + 1);
        });
      } else {
        step(index + 1);
      }
    }
  };

  step(0);
}
/*  */


function resolveAsyncComponents(matched) {
  return function (to, from, next) {
    var hasAsync = false;
    var pending = 0;
    var error = null;
    flatMapComponents(matched, function (def, _, match, key) {
      // if it's a function and doesn't have cid attached,
      // assume it's an async component resolve function.
      // we are not using Vue's default async resolving mechanism because
      // we want to halt the navigation until the incoming component has been
      // resolved.
      if (typeof def === 'function' && def.cid === undefined) {
        hasAsync = true;
        pending++;
        var resolve = once(function (resolvedDef) {
          if (isESModule(resolvedDef)) {
            resolvedDef = resolvedDef.default;
          } // save resolved on async factory in case it's used elsewhere


          def.resolved = typeof resolvedDef === 'function' ? resolvedDef : _Vue.extend(resolvedDef);
          match.components[key] = resolvedDef;
          pending--;

          if (pending <= 0) {
            next();
          }
        });
        var reject = once(function (reason) {
          var msg = "Failed to resolve async component " + key + ": " + reason;
          "development" !== 'production' && warn(false, msg);

          if (!error) {
            error = isError(reason) ? reason : new Error(msg);
            next(error);
          }
        });
        var res;

        try {
          res = def(resolve, reject);
        } catch (e) {
          reject(e);
        }

        if (res) {
          if (typeof res.then === 'function') {
            res.then(resolve, reject);
          } else {
            // new syntax in Vue 2.3
            var comp = res.component;

            if (comp && typeof comp.then === 'function') {
              comp.then(resolve, reject);
            }
          }
        }
      }
    });

    if (!hasAsync) {
      next();
    }
  };
}

function flatMapComponents(matched, fn) {
  return flatten(matched.map(function (m) {
    return Object.keys(m.components).map(function (key) {
      return fn(m.components[key], m.instances[key], m, key);
    });
  }));
}

function flatten(arr) {
  return Array.prototype.concat.apply([], arr);
}

var hasSymbol = typeof Symbol === 'function' && typeof Symbol.toStringTag === 'symbol';

function isESModule(obj) {
  return obj.__esModule || hasSymbol && obj[Symbol.toStringTag] === 'Module';
} // in Webpack 2, require.ensure now also returns a Promise
// so the resolve/reject functions may get called an extra time
// if the user uses an arrow function shorthand that happens to
// return that Promise.


function once(fn) {
  var called = false;
  return function () {
    var args = [],
        len = arguments.length;

    while (len--) args[len] = arguments[len];

    if (called) {
      return;
    }

    called = true;
    return fn.apply(this, args);
  };
}
/*  */


var History = function History(router, base) {
  this.router = router;
  this.base = normalizeBase(base); // start with a route object that stands for "nowhere"

  this.current = START;
  this.pending = null;
  this.ready = false;
  this.readyCbs = [];
  this.readyErrorCbs = [];
  this.errorCbs = [];
};

History.prototype.listen = function listen(cb) {
  this.cb = cb;
};

History.prototype.onReady = function onReady(cb, errorCb) {
  if (this.ready) {
    cb();
  } else {
    this.readyCbs.push(cb);

    if (errorCb) {
      this.readyErrorCbs.push(errorCb);
    }
  }
};

History.prototype.onError = function onError(errorCb) {
  this.errorCbs.push(errorCb);
};

History.prototype.transitionTo = function transitionTo(location, onComplete, onAbort) {
  var this$1 = this;
  var route = this.router.match(location, this.current);
  this.confirmTransition(route, function () {
    this$1.updateRoute(route);
    onComplete && onComplete(route);
    this$1.ensureURL(); // fire ready cbs once

    if (!this$1.ready) {
      this$1.ready = true;
      this$1.readyCbs.forEach(function (cb) {
        cb(route);
      });
    }
  }, function (err) {
    if (onAbort) {
      onAbort(err);
    }

    if (err && !this$1.ready) {
      this$1.ready = true;
      this$1.readyErrorCbs.forEach(function (cb) {
        cb(err);
      });
    }
  });
};

History.prototype.confirmTransition = function confirmTransition(route, onComplete, onAbort) {
  var this$1 = this;
  var current = this.current;

  var abort = function (err) {
    if (isError(err)) {
      if (this$1.errorCbs.length) {
        this$1.errorCbs.forEach(function (cb) {
          cb(err);
        });
      } else {
        warn(false, 'uncaught error during route navigation:');
        console.error(err);
      }
    }

    onAbort && onAbort(err);
  };

  if (isSameRoute(route, current) && // in the case the route map has been dynamically appended to
  route.matched.length === current.matched.length) {
    this.ensureURL();
    return abort();
  }

  var ref = resolveQueue(this.current.matched, route.matched);
  var updated = ref.updated;
  var deactivated = ref.deactivated;
  var activated = ref.activated;
  var queue = [].concat( // in-component leave guards
  extractLeaveGuards(deactivated), // global before hooks
  this.router.beforeHooks, // in-component update hooks
  extractUpdateHooks(updated), // in-config enter guards
  activated.map(function (m) {
    return m.beforeEnter;
  }), // async components
  resolveAsyncComponents(activated));
  this.pending = route;

  var iterator = function (hook, next) {
    if (this$1.pending !== route) {
      return abort();
    }

    try {
      hook(route, current, function (to) {
        if (to === false || isError(to)) {
          // next(false) -> abort navigation, ensure current URL
          this$1.ensureURL(true);
          abort(to);
        } else if (typeof to === 'string' || typeof to === 'object' && (typeof to.path === 'string' || typeof to.name === 'string')) {
          // next('/') or next({ path: '/' }) -> redirect
          abort();

          if (typeof to === 'object' && to.replace) {
            this$1.replace(to);
          } else {
            this$1.push(to);
          }
        } else {
          // confirm transition and pass on the value
          next(to);
        }
      });
    } catch (e) {
      abort(e);
    }
  };

  runQueue(queue, iterator, function () {
    var postEnterCbs = [];

    var isValid = function () {
      return this$1.current === route;
    }; // wait until async components are resolved before
    // extracting in-component enter guards


    var enterGuards = extractEnterGuards(activated, postEnterCbs, isValid);
    var queue = enterGuards.concat(this$1.router.resolveHooks);
    runQueue(queue, iterator, function () {
      if (this$1.pending !== route) {
        return abort();
      }

      this$1.pending = null;
      onComplete(route);

      if (this$1.router.app) {
        this$1.router.app.$nextTick(function () {
          postEnterCbs.forEach(function (cb) {
            cb();
          });
        });
      }
    });
  });
};

History.prototype.updateRoute = function updateRoute(route) {
  var prev = this.current;
  this.current = route;
  this.cb && this.cb(route);
  this.router.afterHooks.forEach(function (hook) {
    hook && hook(route, prev);
  });
};

function normalizeBase(base) {
  if (!base) {
    if (inBrowser) {
      // respect <base> tag
      var baseEl = document.querySelector('base');
      base = baseEl && baseEl.getAttribute('href') || '/'; // strip full URL origin

      base = base.replace(/^https?:\/\/[^\/]+/, '');
    } else {
      base = '/';
    }
  } // make sure there's the starting slash


  if (base.charAt(0) !== '/') {
    base = '/' + base;
  } // remove trailing slash


  return base.replace(/\/$/, '');
}

function resolveQueue(current, next) {
  var i;
  var max = Math.max(current.length, next.length);

  for (i = 0; i < max; i++) {
    if (current[i] !== next[i]) {
      break;
    }
  }

  return {
    updated: next.slice(0, i),
    activated: next.slice(i),
    deactivated: current.slice(i)
  };
}

function extractGuards(records, name, bind, reverse) {
  var guards = flatMapComponents(records, function (def, instance, match, key) {
    var guard = extractGuard(def, name);

    if (guard) {
      return Array.isArray(guard) ? guard.map(function (guard) {
        return bind(guard, instance, match, key);
      }) : bind(guard, instance, match, key);
    }
  });
  return flatten(reverse ? guards.reverse() : guards);
}

function extractGuard(def, key) {
  if (typeof def !== 'function') {
    // extend now so that global mixins are applied.
    def = _Vue.extend(def);
  }

  return def.options[key];
}

function extractLeaveGuards(deactivated) {
  return extractGuards(deactivated, 'beforeRouteLeave', bindGuard, true);
}

function extractUpdateHooks(updated) {
  return extractGuards(updated, 'beforeRouteUpdate', bindGuard);
}

function bindGuard(guard, instance) {
  if (instance) {
    return function boundRouteGuard() {
      return guard.apply(instance, arguments);
    };
  }
}

function extractEnterGuards(activated, cbs, isValid) {
  return extractGuards(activated, 'beforeRouteEnter', function (guard, _, match, key) {
    return bindEnterGuard(guard, match, key, cbs, isValid);
  });
}

function bindEnterGuard(guard, match, key, cbs, isValid) {
  return function routeEnterGuard(to, from, next) {
    return guard(to, from, function (cb) {
      if (typeof cb === 'function') {
        cbs.push(function () {
          // #750
          // if a router-view is wrapped with an out-in transition,
          // the instance may not have been registered at this time.
          // we will need to poll for registration until current route
          // is no longer valid.
          poll(cb, match.instances, key, isValid);
        });
      }

      next(cb);
    });
  };
}

function poll(cb, // somehow flow cannot infer this is a function
instances, key, isValid) {
  if (instances[key] && !instances[key]._isBeingDestroyed // do not reuse being destroyed instance
  ) {
      cb(instances[key]);
    } else if (isValid()) {
    setTimeout(function () {
      poll(cb, instances, key, isValid);
    }, 16);
  }
}
/*  */


var HTML5History =
/*@__PURE__*/
function (History$$1) {
  function HTML5History(router, base) {
    var this$1 = this;
    History$$1.call(this, router, base);
    var expectScroll = router.options.scrollBehavior;
    var supportsScroll = supportsPushState && expectScroll;

    if (supportsScroll) {
      setupScroll();
    }

    var initLocation = getLocation(this.base);
    window.addEventListener('popstate', function (e) {
      var current = this$1.current; // Avoiding first `popstate` event dispatched in some browsers but first
      // history route not updated since async guard at the same time.

      var location = getLocation(this$1.base);

      if (this$1.current === START && location === initLocation) {
        return;
      }

      this$1.transitionTo(location, function (route) {
        if (supportsScroll) {
          handleScroll(router, route, current, true);
        }
      });
    });
  }

  if (History$$1) HTML5History.__proto__ = History$$1;
  HTML5History.prototype = Object.create(History$$1 && History$$1.prototype);
  HTML5History.prototype.constructor = HTML5History;

  HTML5History.prototype.go = function go(n) {
    window.history.go(n);
  };

  HTML5History.prototype.push = function push(location, onComplete, onAbort) {
    var this$1 = this;
    var ref = this;
    var fromRoute = ref.current;
    this.transitionTo(location, function (route) {
      pushState(cleanPath(this$1.base + route.fullPath));
      handleScroll(this$1.router, route, fromRoute, false);
      onComplete && onComplete(route);
    }, onAbort);
  };

  HTML5History.prototype.replace = function replace(location, onComplete, onAbort) {
    var this$1 = this;
    var ref = this;
    var fromRoute = ref.current;
    this.transitionTo(location, function (route) {
      replaceState(cleanPath(this$1.base + route.fullPath));
      handleScroll(this$1.router, route, fromRoute, false);
      onComplete && onComplete(route);
    }, onAbort);
  };

  HTML5History.prototype.ensureURL = function ensureURL(push) {
    if (getLocation(this.base) !== this.current.fullPath) {
      var current = cleanPath(this.base + this.current.fullPath);
      push ? pushState(current) : replaceState(current);
    }
  };

  HTML5History.prototype.getCurrentLocation = function getCurrentLocation() {
    return getLocation(this.base);
  };

  return HTML5History;
}(History);

function getLocation(base) {
  var path = decodeURI(window.location.pathname);

  if (base && path.indexOf(base) === 0) {
    path = path.slice(base.length);
  }

  return (path || '/') + window.location.search + window.location.hash;
}
/*  */


var HashHistory =
/*@__PURE__*/
function (History$$1) {
  function HashHistory(router, base, fallback) {
    History$$1.call(this, router, base); // check history fallback deeplinking

    if (fallback && checkFallback(this.base)) {
      return;
    }

    ensureSlash();
  }

  if (History$$1) HashHistory.__proto__ = History$$1;
  HashHistory.prototype = Object.create(History$$1 && History$$1.prototype);
  HashHistory.prototype.constructor = HashHistory; // this is delayed until the app mounts
  // to avoid the hashchange listener being fired too early

  HashHistory.prototype.setupListeners = function setupListeners() {
    var this$1 = this;
    var router = this.router;
    var expectScroll = router.options.scrollBehavior;
    var supportsScroll = supportsPushState && expectScroll;

    if (supportsScroll) {
      setupScroll();
    }

    window.addEventListener(supportsPushState ? 'popstate' : 'hashchange', function () {
      var current = this$1.current;

      if (!ensureSlash()) {
        return;
      }

      this$1.transitionTo(getHash(), function (route) {
        if (supportsScroll) {
          handleScroll(this$1.router, route, current, true);
        }

        if (!supportsPushState) {
          replaceHash(route.fullPath);
        }
      });
    });
  };

  HashHistory.prototype.push = function push(location, onComplete, onAbort) {
    var this$1 = this;
    var ref = this;
    var fromRoute = ref.current;
    this.transitionTo(location, function (route) {
      pushHash(route.fullPath);
      handleScroll(this$1.router, route, fromRoute, false);
      onComplete && onComplete(route);
    }, onAbort);
  };

  HashHistory.prototype.replace = function replace(location, onComplete, onAbort) {
    var this$1 = this;
    var ref = this;
    var fromRoute = ref.current;
    this.transitionTo(location, function (route) {
      replaceHash(route.fullPath);
      handleScroll(this$1.router, route, fromRoute, false);
      onComplete && onComplete(route);
    }, onAbort);
  };

  HashHistory.prototype.go = function go(n) {
    window.history.go(n);
  };

  HashHistory.prototype.ensureURL = function ensureURL(push) {
    var current = this.current.fullPath;

    if (getHash() !== current) {
      push ? pushHash(current) : replaceHash(current);
    }
  };

  HashHistory.prototype.getCurrentLocation = function getCurrentLocation() {
    return getHash();
  };

  return HashHistory;
}(History);

function checkFallback(base) {
  var location = getLocation(base);

  if (!/^\/#/.test(location)) {
    window.location.replace(cleanPath(base + '/#' + location));
    return true;
  }
}

function ensureSlash() {
  var path = getHash();

  if (path.charAt(0) === '/') {
    return true;
  }

  replaceHash('/' + path);
  return false;
}

function getHash() {
  // We can't use window.location.hash here because it's not
  // consistent across browsers - Firefox will pre-decode it!
  var href = window.location.href;
  var index = href.indexOf('#'); // empty path

  if (index < 0) {
    return '';
  }

  href = href.slice(index + 1); // decode the hash but not the search or hash
  // as search(query) is already decoded
  // https://github.com/vuejs/vue-router/issues/2708

  var searchIndex = href.indexOf('?');

  if (searchIndex < 0) {
    var hashIndex = href.indexOf('#');

    if (hashIndex > -1) {
      href = decodeURI(href.slice(0, hashIndex)) + href.slice(hashIndex);
    } else {
      href = decodeURI(href);
    }
  } else {
    if (searchIndex > -1) {
      href = decodeURI(href.slice(0, searchIndex)) + href.slice(searchIndex);
    }
  }

  return href;
}

function getUrl(path) {
  var href = window.location.href;
  var i = href.indexOf('#');
  var base = i >= 0 ? href.slice(0, i) : href;
  return base + "#" + path;
}

function pushHash(path) {
  if (supportsPushState) {
    pushState(getUrl(path));
  } else {
    window.location.hash = path;
  }
}

function replaceHash(path) {
  if (supportsPushState) {
    replaceState(getUrl(path));
  } else {
    window.location.replace(getUrl(path));
  }
}
/*  */


var AbstractHistory =
/*@__PURE__*/
function (History$$1) {
  function AbstractHistory(router, base) {
    History$$1.call(this, router, base);
    this.stack = [];
    this.index = -1;
  }

  if (History$$1) AbstractHistory.__proto__ = History$$1;
  AbstractHistory.prototype = Object.create(History$$1 && History$$1.prototype);
  AbstractHistory.prototype.constructor = AbstractHistory;

  AbstractHistory.prototype.push = function push(location, onComplete, onAbort) {
    var this$1 = this;
    this.transitionTo(location, function (route) {
      this$1.stack = this$1.stack.slice(0, this$1.index + 1).concat(route);
      this$1.index++;
      onComplete && onComplete(route);
    }, onAbort);
  };

  AbstractHistory.prototype.replace = function replace(location, onComplete, onAbort) {
    var this$1 = this;
    this.transitionTo(location, function (route) {
      this$1.stack = this$1.stack.slice(0, this$1.index).concat(route);
      onComplete && onComplete(route);
    }, onAbort);
  };

  AbstractHistory.prototype.go = function go(n) {
    var this$1 = this;
    var targetIndex = this.index + n;

    if (targetIndex < 0 || targetIndex >= this.stack.length) {
      return;
    }

    var route = this.stack[targetIndex];
    this.confirmTransition(route, function () {
      this$1.index = targetIndex;
      this$1.updateRoute(route);
    });
  };

  AbstractHistory.prototype.getCurrentLocation = function getCurrentLocation() {
    var current = this.stack[this.stack.length - 1];
    return current ? current.fullPath : '/';
  };

  AbstractHistory.prototype.ensureURL = function ensureURL() {// noop
  };

  return AbstractHistory;
}(History);
/*  */


var VueRouter = function VueRouter(options) {
  if (options === void 0) options = {};
  this.app = null;
  this.apps = [];
  this.options = options;
  this.beforeHooks = [];
  this.resolveHooks = [];
  this.afterHooks = [];
  this.matcher = createMatcher(options.routes || [], this);
  var mode = options.mode || 'hash';
  this.fallback = mode === 'history' && !supportsPushState && options.fallback !== false;

  if (this.fallback) {
    mode = 'hash';
  }

  if (!inBrowser) {
    mode = 'abstract';
  }

  this.mode = mode;

  switch (mode) {
    case 'history':
      this.history = new HTML5History(this, options.base);
      break;

    case 'hash':
      this.history = new HashHistory(this, options.base, this.fallback);
      break;

    case 'abstract':
      this.history = new AbstractHistory(this, options.base);
      break;

    default:
      if ("development" !== 'production') {
        assert(false, "invalid mode: " + mode);
      }

  }
};

var prototypeAccessors = {
  currentRoute: {
    configurable: true
  }
};

VueRouter.prototype.match = function match(raw, current, redirectedFrom) {
  return this.matcher.match(raw, current, redirectedFrom);
};

prototypeAccessors.currentRoute.get = function () {
  return this.history && this.history.current;
};

VueRouter.prototype.init = function init(app
/* Vue component instance */
) {
  var this$1 = this;
  "development" !== 'production' && assert(install.installed, "not installed. Make sure to call `Vue.use(VueRouter)` " + "before creating root instance.");
  this.apps.push(app); // set up app destroyed handler
  // https://github.com/vuejs/vue-router/issues/2639

  app.$once('hook:destroyed', function () {
    // clean out app from this.apps array once destroyed
    var index = this$1.apps.indexOf(app);

    if (index > -1) {
      this$1.apps.splice(index, 1);
    } // ensure we still have a main app or null if no apps
    // we do not release the router so it can be reused


    if (this$1.app === app) {
      this$1.app = this$1.apps[0] || null;
    }
  }); // main app previously initialized
  // return as we don't need to set up new history listener

  if (this.app) {
    return;
  }

  this.app = app;
  var history = this.history;

  if (history instanceof HTML5History) {
    history.transitionTo(history.getCurrentLocation());
  } else if (history instanceof HashHistory) {
    var setupHashListener = function () {
      history.setupListeners();
    };

    history.transitionTo(history.getCurrentLocation(), setupHashListener, setupHashListener);
  }

  history.listen(function (route) {
    this$1.apps.forEach(function (app) {
      app._route = route;
    });
  });
};

VueRouter.prototype.beforeEach = function beforeEach(fn) {
  return registerHook(this.beforeHooks, fn);
};

VueRouter.prototype.beforeResolve = function beforeResolve(fn) {
  return registerHook(this.resolveHooks, fn);
};

VueRouter.prototype.afterEach = function afterEach(fn) {
  return registerHook(this.afterHooks, fn);
};

VueRouter.prototype.onReady = function onReady(cb, errorCb) {
  this.history.onReady(cb, errorCb);
};

VueRouter.prototype.onError = function onError(errorCb) {
  this.history.onError(errorCb);
};

VueRouter.prototype.push = function push(location, onComplete, onAbort) {
  this.history.push(location, onComplete, onAbort);
};

VueRouter.prototype.replace = function replace(location, onComplete, onAbort) {
  this.history.replace(location, onComplete, onAbort);
};

VueRouter.prototype.go = function go(n) {
  this.history.go(n);
};

VueRouter.prototype.back = function back() {
  this.go(-1);
};

VueRouter.prototype.forward = function forward() {
  this.go(1);
};

VueRouter.prototype.getMatchedComponents = function getMatchedComponents(to) {
  var route = to ? to.matched ? to : this.resolve(to).route : this.currentRoute;

  if (!route) {
    return [];
  }

  return [].concat.apply([], route.matched.map(function (m) {
    return Object.keys(m.components).map(function (key) {
      return m.components[key];
    });
  }));
};

VueRouter.prototype.resolve = function resolve(to, current, append) {
  current = current || this.history.current;
  var location = normalizeLocation(to, current, append, this);
  var route = this.match(location, current);
  var fullPath = route.redirectedFrom || route.fullPath;
  var base = this.history.base;
  var href = createHref(base, fullPath, this.mode);
  return {
    location: location,
    route: route,
    href: href,
    // for backwards compat
    normalizedTo: location,
    resolved: route
  };
};

VueRouter.prototype.addRoutes = function addRoutes(routes) {
  this.matcher.addRoutes(routes);

  if (this.history.current !== START) {
    this.history.transitionTo(this.history.getCurrentLocation());
  }
};

Object.defineProperties(VueRouter.prototype, prototypeAccessors);

function registerHook(list, fn) {
  list.push(fn);
  return function () {
    var i = list.indexOf(fn);

    if (i > -1) {
      list.splice(i, 1);
    }
  };
}

function createHref(base, fullPath, mode) {
  var path = mode === 'hash' ? '#' + fullPath : fullPath;
  return base ? cleanPath(base + '/' + path) : path;
}

VueRouter.install = install;
VueRouter.version = '3.0.7';

if (inBrowser && window.Vue) {
  window.Vue.use(VueRouter);
}

var _default = VueRouter;
exports.default = _default;
},{}],"src/components/Home.vue":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
var _default = {};
exports.default = _default;
        var $8525b5 = exports.default || module.exports;
      
      if (typeof $8525b5 === 'function') {
        $8525b5 = $8525b5.options;
      }
    
        /* template */
        Object.assign($8525b5, (function () {
          var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "ui basic center aligned segment" }, [
    _vm._m(0),
    _vm._v(" "),
    _c(
      "div",
      {
        staticClass: "ui huge primary button",
        on: {
          click: function($event) {
            return _vm.$router.push({ name: "attendance" })
          }
        }
      },
      [
        _c("i", { staticClass: "thumbs up icon" }),
        _vm._v("\n    I am ready to start!\n  ")
      ]
    )
  ])
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("h1", { staticClass: "ui huge header" }, [
      _vm._v("\n    Welcome to our universe!\n    "),
      _c("br"),
      _c("br"),
      _vm._v(" "),
      _c("div", { staticClass: "sub header" }, [
        _vm._v(
          "\n      We'll ask you few questions about your field trip in order to get all the information we \n      need to provide the best experience for you and your group. Thank you for choosing us!\n      "
        ),
        _c("i", { staticClass: "smile outline icon" }),
        _vm._v(" "),
        _c("i", { staticClass: "thumbs up icon" }),
        _vm._v(" "),
        _c("i", { staticClass: "heart outline icon" })
      ])
    ])
  }
]
render._withStripped = true

          return {
            render: render,
            staticRenderFns: staticRenderFns,
            _compiled: true,
            _scopeId: null,
            functional: undefined
          };
        })());
      
    /* hot reload */
    (function () {
      if (module.hot) {
        var api = require('vue-hot-reload-api');
        api.install(require('vue'));
        if (api.compatible) {
          module.hot.accept();
          if (!module.hot.data) {
            api.createRecord('$8525b5', $8525b5);
          } else {
            api.reload('$8525b5', $8525b5);
          }
        }

        
      }
    })();
},{"vue-hot-reload-api":"node_modules/vue-hot-reload-api/dist/index.js","vue":"node_modules/vue/dist/vue.runtime.esm.js"}],"src/components/Attendance.vue":[function(require,module,exports) {

        var $fb0a22 = exports.default || module.exports;
      
      if (typeof $fb0a22 === 'function') {
        $fb0a22 = $fb0a22.options;
      }
    
        /* template */
        Object.assign($fb0a22, (function () {
          var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "ui basic center aligned segment" }, [
    _c("h1", [_vm._v("Attendance")]),
    _vm._v(" "),
    _c(
      "div",
      {
        staticClass: "ui huge basic primary button",
        on: {
          click: function($event) {
            return _vm.$router.push({ name: "home" })
          }
        }
      },
      [_c("i", { staticClass: "left chevron icon" }), _vm._v("\n    Back\n  ")]
    ),
    _vm._v(" "),
    _vm._m(0),
    _vm._v(" "),
    _vm._m(1)
  ])
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "ui huge basic black button" }, [
      _c("i", { staticClass: "refresh icon" }),
      _vm._v("\n    Start Over\n  ")
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "ui huge primary button" }, [
      _vm._v("\n    Next\n    "),
      _c("i", { staticClass: "right chevron icon" })
    ])
  }
]
render._withStripped = true

          return {
            render: render,
            staticRenderFns: staticRenderFns,
            _compiled: true,
            _scopeId: null,
            functional: undefined
          };
        })());
      
    /* hot reload */
    (function () {
      if (module.hot) {
        var api = require('vue-hot-reload-api');
        api.install(require('vue'));
        if (api.compatible) {
          module.hot.accept();
          if (!module.hot.data) {
            api.createRecord('$fb0a22', $fb0a22);
          } else {
            api.reload('$fb0a22', $fb0a22);
          }
        }

        
      }
    })();
},{"vue-hot-reload-api":"node_modules/vue-hot-reload-api/dist/index.js","vue":"node_modules/vue/dist/vue.runtime.esm.js"}],"src/routes.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Home = _interopRequireDefault(require("./components/Home.vue"));

var _Attendance = _interopRequireDefault(require("./components/Attendance.vue"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = {
  mode: 'history',
  routes: [{
    path: '/',
    name: 'home',
    component: _Home.default,
    meta: {
      step: 1
    }
  }, {
    path: '/attendance',
    name: 'attendance',
    component: _Attendance.default,
    meta: {
      step: 2
    }
  }]
};
exports.default = _default;
},{"./components/Home.vue":"src/components/Home.vue","./components/Attendance.vue":"src/components/Attendance.vue"}],"src/app.js":[function(require,module,exports) {
"use strict";

var _vue = _interopRequireDefault(require("vue"));

var _App = _interopRequireDefault(require("./App.vue"));

var _semanticUiVue = _interopRequireDefault(require("semantic-ui-vue"));

var _vueRouter = _interopRequireDefault(require("vue-router"));

var _routes = _interopRequireDefault(require("./routes.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_vue.default.use(_semanticUiVue.default);

_vue.default.use(_vueRouter.default);

var router = new _vueRouter.default(_routes.default);
new _vue.default({
  router: router,
  render: function render(h) {
    return h(_App.default);
  }
}).$mount('#app');
},{"vue":"node_modules/vue/dist/vue.runtime.esm.js","./App.vue":"src/App.vue","semantic-ui-vue":"node_modules/semantic-ui-vue/dist/commonjs/index.js","vue-router":"node_modules/vue-router/dist/vue-router.esm.js","./routes.js":"src/routes.js"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "45415" + '/');

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
      } else {
        window.location.reload();
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
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","src/app.js"], null)
//# sourceMappingURL=/app.a6a4d504.js.map