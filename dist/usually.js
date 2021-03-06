(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.U = factory());
}(this, (function () { 'use strict';

	function createCommonjsModule(fn, module) {
		return module = { exports: {} }, fn(module, module.exports), module.exports;
	}

	var _global = createCommonjsModule(function (module) {
	  // https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	  var global = module.exports = typeof window != 'undefined' && window.Math == Math ? window : typeof self != 'undefined' && self.Math == Math ? self // eslint-disable-next-line no-new-func
	  : Function('return this')();
	  if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef
	});

	var _core = createCommonjsModule(function (module) {
	  var core = module.exports = {
	    version: '2.6.9'
	  };
	  if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef
	});
	var _core_1 = _core.version;

	var _aFunction = function (it) {
	  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
	  return it;
	};

	var _ctx = function (fn, that, length) {
	  _aFunction(fn);
	  if (that === undefined) return fn;

	  switch (length) {
	    case 1:
	      return function (a) {
	        return fn.call(that, a);
	      };

	    case 2:
	      return function (a, b) {
	        return fn.call(that, a, b);
	      };

	    case 3:
	      return function (a, b, c) {
	        return fn.call(that, a, b, c);
	      };
	  }

	  return function ()
	  /* ...args */
	  {
	    return fn.apply(that, arguments);
	  };
	};

	var _isObject = function (it) {
	  return typeof it === 'object' ? it !== null : typeof it === 'function';
	};

	var _anObject = function (it) {
	  if (!_isObject(it)) throw TypeError(it + ' is not an object!');
	  return it;
	};

	var _fails = function (exec) {
	  try {
	    return !!exec();
	  } catch (e) {
	    return true;
	  }
	};

	var _descriptors = !_fails(function () {
	  return Object.defineProperty({}, 'a', {
	    get: function () {
	      return 7;
	    }
	  }).a != 7;
	});

	var document = _global.document; // typeof document.createElement is 'object' in old IE

	var is = _isObject(document) && _isObject(document.createElement);

	var _domCreate = function (it) {
	  return is ? document.createElement(it) : {};
	};

	var _ie8DomDefine = !_descriptors && !_fails(function () {
	  return Object.defineProperty(_domCreate('div'), 'a', {
	    get: function () {
	      return 7;
	    }
	  }).a != 7;
	});

	// instead of the ES6 spec version, we didn't implement @@toPrimitive case
	// and the second argument - flag - preferred type is a string

	var _toPrimitive = function (it, S) {
	  if (!_isObject(it)) return it;
	  var fn, val;
	  if (S && typeof (fn = it.toString) == 'function' && !_isObject(val = fn.call(it))) return val;
	  if (typeof (fn = it.valueOf) == 'function' && !_isObject(val = fn.call(it))) return val;
	  if (!S && typeof (fn = it.toString) == 'function' && !_isObject(val = fn.call(it))) return val;
	  throw TypeError("Can't convert object to primitive value");
	};

	var dP = Object.defineProperty;
	var f = _descriptors ? Object.defineProperty : function defineProperty(O, P, Attributes) {
	  _anObject(O);
	  P = _toPrimitive(P, true);
	  _anObject(Attributes);
	  if (_ie8DomDefine) try {
	    return dP(O, P, Attributes);
	  } catch (e) {
	    /* empty */
	  }
	  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
	  if ('value' in Attributes) O[P] = Attributes.value;
	  return O;
	};
	var _objectDp = {
	  f: f
	};

	var _propertyDesc = function (bitmap, value) {
	  return {
	    enumerable: !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable: !(bitmap & 4),
	    value: value
	  };
	};

	var _hide = _descriptors ? function (object, key, value) {
	  return _objectDp.f(object, key, _propertyDesc(1, value));
	} : function (object, key, value) {
	  object[key] = value;
	  return object;
	};

	var hasOwnProperty = {}.hasOwnProperty;

	var _has = function (it, key) {
	  return hasOwnProperty.call(it, key);
	};

	var PROTOTYPE = 'prototype';

	var $export = function (type, name, source) {
	  var IS_FORCED = type & $export.F;
	  var IS_GLOBAL = type & $export.G;
	  var IS_STATIC = type & $export.S;
	  var IS_PROTO = type & $export.P;
	  var IS_BIND = type & $export.B;
	  var IS_WRAP = type & $export.W;
	  var exports = IS_GLOBAL ? _core : _core[name] || (_core[name] = {});
	  var expProto = exports[PROTOTYPE];
	  var target = IS_GLOBAL ? _global : IS_STATIC ? _global[name] : (_global[name] || {})[PROTOTYPE];
	  var key, own, out;
	  if (IS_GLOBAL) source = name;

	  for (key in source) {
	    // contains in native
	    own = !IS_FORCED && target && target[key] !== undefined;
	    if (own && _has(exports, key)) continue; // export native or passed

	    out = own ? target[key] : source[key]; // prevent global pollution for namespaces

	    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key] // bind timers to global for call from export context
	    : IS_BIND && own ? _ctx(out, _global) // wrap global constructors for prevent change them in library
	    : IS_WRAP && target[key] == out ? function (C) {
	      var F = function (a, b, c) {
	        if (this instanceof C) {
	          switch (arguments.length) {
	            case 0:
	              return new C();

	            case 1:
	              return new C(a);

	            case 2:
	              return new C(a, b);
	          }

	          return new C(a, b, c);
	        }

	        return C.apply(this, arguments);
	      };

	      F[PROTOTYPE] = C[PROTOTYPE];
	      return F; // make static versions for prototype methods
	    }(out) : IS_PROTO && typeof out == 'function' ? _ctx(Function.call, out) : out; // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%

	    if (IS_PROTO) {
	      (exports.virtual || (exports.virtual = {}))[key] = out; // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%

	      if (type & $export.R && expProto && !expProto[key]) _hide(expProto, key, out);
	    }
	  }
	}; // type bitmap


	$export.F = 1; // forced

	$export.G = 2; // global

	$export.S = 4; // static

	$export.P = 8; // proto

	$export.B = 16; // bind

	$export.W = 32; // wrap

	$export.U = 64; // safe

	$export.R = 128; // real proto method for `library`

	var _export = $export;

	_export(_export.S + _export.F * !_descriptors, 'Object', {
	  defineProperty: _objectDp.f
	});

	var $Object = _core.Object;

	var defineProperty = function defineProperty(it, key, desc) {
	  return $Object.defineProperty(it, key, desc);
	};

	var defineProperty$1 = defineProperty;

	var toString = {}.toString;

	var _cof = function (it) {
	  return toString.call(it).slice(8, -1);
	};

	// eslint-disable-next-line no-prototype-builtins

	var _iobject = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
	  return _cof(it) == 'String' ? it.split('') : Object(it);
	};

	// 7.2.1 RequireObjectCoercible(argument)
	var _defined = function (it) {
	  if (it == undefined) throw TypeError("Can't call method on  " + it);
	  return it;
	};

	var _toIobject = function (it) {
	  return _iobject(_defined(it));
	};

	// 7.1.4 ToInteger
	var ceil = Math.ceil;
	var floor = Math.floor;

	var _toInteger = function (it) {
	  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
	};

	var min = Math.min;

	var _toLength = function (it) {
	  return it > 0 ? min(_toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
	};

	var max = Math.max;
	var min$1 = Math.min;

	var _toAbsoluteIndex = function (index, length) {
	  index = _toInteger(index);
	  return index < 0 ? max(index + length, 0) : min$1(index, length);
	};

	// true  -> Array#includes

	var _arrayIncludes = function (IS_INCLUDES) {
	  return function ($this, el, fromIndex) {
	    var O = _toIobject($this);
	    var length = _toLength(O.length);
	    var index = _toAbsoluteIndex(fromIndex, length);
	    var value; // Array#includes uses SameValueZero equality algorithm
	    // eslint-disable-next-line no-self-compare

	    if (IS_INCLUDES && el != el) while (length > index) {
	      value = O[index++]; // eslint-disable-next-line no-self-compare

	      if (value != value) return true; // Array#indexOf ignores holes, Array#includes - not
	    } else for (; length > index; index++) if (IS_INCLUDES || index in O) {
	      if (O[index] === el) return IS_INCLUDES || index || 0;
	    }
	    return !IS_INCLUDES && -1;
	  };
	};

	var _library = true;

	var _shared = createCommonjsModule(function (module) {
	  var SHARED = '__core-js_shared__';
	  var store = _global[SHARED] || (_global[SHARED] = {});
	  (module.exports = function (key, value) {
	    return store[key] || (store[key] = value !== undefined ? value : {});
	  })('versions', []).push({
	    version: _core.version,
	    mode: _library ? 'pure' : 'global',
	    copyright: '© 2019 Denis Pushkarev (zloirock.ru)'
	  });
	});

	var id = 0;
	var px = Math.random();

	var _uid = function (key) {
	  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
	};

	var shared = _shared('keys');

	var _sharedKey = function (key) {
	  return shared[key] || (shared[key] = _uid(key));
	};

	var arrayIndexOf = _arrayIncludes(false);
	var IE_PROTO = _sharedKey('IE_PROTO');

	var _objectKeysInternal = function (object, names) {
	  var O = _toIobject(object);
	  var i = 0;
	  var result = [];
	  var key;

	  for (key in O) if (key != IE_PROTO) _has(O, key) && result.push(key); // Don't enum bug & hidden keys


	  while (names.length > i) if (_has(O, key = names[i++])) {
	    ~arrayIndexOf(result, key) || result.push(key);
	  }

	  return result;
	};

	// IE 8- don't enum bug keys
	var _enumBugKeys = 'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'.split(',');

	var _objectKeys = Object.keys || function keys(O) {
	  return _objectKeysInternal(O, _enumBugKeys);
	};

	var _objectDps = _descriptors ? Object.defineProperties : function defineProperties(O, Properties) {
	  _anObject(O);
	  var keys = _objectKeys(Properties);
	  var length = keys.length;
	  var i = 0;
	  var P;

	  while (length > i) _objectDp.f(O, P = keys[i++], Properties[P]);

	  return O;
	};

	_export(_export.S + _export.F * !_descriptors, 'Object', {
	  defineProperties: _objectDps
	});

	var $Object$1 = _core.Object;

	var defineProperties = function defineProperties(T, D) {
	  return $Object$1.defineProperties(T, D);
	};

	var defineProperties$1 = defineProperties;

	var hiddenKeys = _enumBugKeys.concat('length', 'prototype');

	var f$1 = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
	  return _objectKeysInternal(O, hiddenKeys);
	};

	var _objectGopn = {
	  f: f$1
	};

	var f$2 = Object.getOwnPropertySymbols;
	var _objectGops = {
	  f: f$2
	};

	var Reflect$1 = _global.Reflect;

	var _ownKeys = Reflect$1 && Reflect$1.ownKeys || function ownKeys(it) {
	  var keys = _objectGopn.f(_anObject(it));
	  var getSymbols = _objectGops.f;
	  return getSymbols ? keys.concat(getSymbols(it)) : keys;
	};

	var f$3 = {}.propertyIsEnumerable;
	var _objectPie = {
	  f: f$3
	};

	var gOPD = Object.getOwnPropertyDescriptor;
	var f$4 = _descriptors ? gOPD : function getOwnPropertyDescriptor(O, P) {
	  O = _toIobject(O);
	  P = _toPrimitive(P, true);
	  if (_ie8DomDefine) try {
	    return gOPD(O, P);
	  } catch (e) {
	    /* empty */
	  }
	  if (_has(O, P)) return _propertyDesc(!_objectPie.f.call(O, P), O[P]);
	};
	var _objectGopd = {
	  f: f$4
	};

	var _createProperty = function (object, index, value) {
	  if (index in object) _objectDp.f(object, index, _propertyDesc(0, value));else object[index] = value;
	};

	_export(_export.S, 'Object', {
	  getOwnPropertyDescriptors: function getOwnPropertyDescriptors(object) {
	    var O = _toIobject(object);
	    var getDesc = _objectGopd.f;
	    var keys = _ownKeys(O);
	    var result = {};
	    var i = 0;
	    var key, desc;

	    while (keys.length > i) {
	      desc = getDesc(O, key = keys[i++]);
	      if (desc !== undefined) _createProperty(result, key, desc);
	    }

	    return result;
	  }
	});

	var getOwnPropertyDescriptors = _core.Object.getOwnPropertyDescriptors;

	var getOwnPropertyDescriptors$1 = getOwnPropertyDescriptors;

	var _objectSap = function (KEY, exec) {
	  var fn = (_core.Object || {})[KEY] || Object[KEY];
	  var exp = {};
	  exp[KEY] = exec(fn);
	  _export(_export.S + _export.F * _fails(function () {
	    fn(1);
	  }), 'Object', exp);
	};

	var $getOwnPropertyDescriptor = _objectGopd.f;
	_objectSap('getOwnPropertyDescriptor', function () {
	  return function getOwnPropertyDescriptor(it, key) {
	    return $getOwnPropertyDescriptor(_toIobject(it), key);
	  };
	});

	var $Object$2 = _core.Object;

	var getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key) {
	  return $Object$2.getOwnPropertyDescriptor(it, key);
	};

	var getOwnPropertyDescriptor$1 = getOwnPropertyDescriptor;

	var _redefine = _hide;

	var _meta = createCommonjsModule(function (module) {
	  var META = _uid('meta');
	  var setDesc = _objectDp.f;
	  var id = 0;

	  var isExtensible = Object.isExtensible || function () {
	    return true;
	  };

	  var FREEZE = !_fails(function () {
	    return isExtensible(Object.preventExtensions({}));
	  });

	  var setMeta = function (it) {
	    setDesc(it, META, {
	      value: {
	        i: 'O' + ++id,
	        // object ID
	        w: {} // weak collections IDs

	      }
	    });
	  };

	  var fastKey = function (it, create) {
	    // return primitive with prefix
	    if (!_isObject(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;

	    if (!_has(it, META)) {
	      // can't set metadata to uncaught frozen object
	      if (!isExtensible(it)) return 'F'; // not necessary to add metadata

	      if (!create) return 'E'; // add missing metadata

	      setMeta(it); // return object ID
	    }

	    return it[META].i;
	  };

	  var getWeak = function (it, create) {
	    if (!_has(it, META)) {
	      // can't set metadata to uncaught frozen object
	      if (!isExtensible(it)) return true; // not necessary to add metadata

	      if (!create) return false; // add missing metadata

	      setMeta(it); // return hash weak collections IDs
	    }

	    return it[META].w;
	  }; // add metadata on freeze-family methods calling


	  var onFreeze = function (it) {
	    if (FREEZE && meta.NEED && isExtensible(it) && !_has(it, META)) setMeta(it);
	    return it;
	  };

	  var meta = module.exports = {
	    KEY: META,
	    NEED: false,
	    fastKey: fastKey,
	    getWeak: getWeak,
	    onFreeze: onFreeze
	  };
	});
	var _meta_1 = _meta.KEY;
	var _meta_2 = _meta.NEED;
	var _meta_3 = _meta.fastKey;
	var _meta_4 = _meta.getWeak;
	var _meta_5 = _meta.onFreeze;

	var _wks = createCommonjsModule(function (module) {
	  var store = _shared('wks');
	  var Symbol = _global.Symbol;
	  var USE_SYMBOL = typeof Symbol == 'function';

	  var $exports = module.exports = function (name) {
	    return store[name] || (store[name] = USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : _uid)('Symbol.' + name));
	  };

	  $exports.store = store;
	});

	var def = _objectDp.f;
	var TAG = _wks('toStringTag');

	var _setToStringTag = function (it, tag, stat) {
	  if (it && !_has(it = stat ? it : it.prototype, TAG)) def(it, TAG, {
	    configurable: true,
	    value: tag
	  });
	};

	var f$5 = _wks;
	var _wksExt = {
	  f: f$5
	};

	var defineProperty$2 = _objectDp.f;

	var _wksDefine = function (name) {
	  var $Symbol = _core.Symbol || (_core.Symbol = _library ? {} : _global.Symbol || {});
	  if (name.charAt(0) != '_' && !(name in $Symbol)) defineProperty$2($Symbol, name, {
	    value: _wksExt.f(name)
	  });
	};

	var _enumKeys = function (it) {
	  var result = _objectKeys(it);
	  var getSymbols = _objectGops.f;

	  if (getSymbols) {
	    var symbols = getSymbols(it);
	    var isEnum = _objectPie.f;
	    var i = 0;
	    var key;

	    while (symbols.length > i) if (isEnum.call(it, key = symbols[i++])) result.push(key);
	  }

	  return result;
	};

	var _isArray = Array.isArray || function isArray(arg) {
	  return _cof(arg) == 'Array';
	};

	var _toObject = function (it) {
	  return Object(_defined(it));
	};

	var document$1 = _global.document;

	var _html = document$1 && document$1.documentElement;

	var IE_PROTO$1 = _sharedKey('IE_PROTO');

	var Empty = function () {
	  /* empty */
	};

	var PROTOTYPE$1 = 'prototype'; // Create object with fake `null` prototype: use iframe Object with cleared prototype

	var createDict = function () {
	  // Thrash, waste and sodomy: IE GC bug
	  var iframe = _domCreate('iframe');
	  var i = _enumBugKeys.length;
	  var lt = '<';
	  var gt = '>';
	  var iframeDocument;
	  iframe.style.display = 'none';
	  _html.appendChild(iframe);
	  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
	  // createDict = iframe.contentWindow.Object;
	  // html.removeChild(iframe);

	  iframeDocument = iframe.contentWindow.document;
	  iframeDocument.open();
	  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
	  iframeDocument.close();
	  createDict = iframeDocument.F;

	  while (i--) delete createDict[PROTOTYPE$1][_enumBugKeys[i]];

	  return createDict();
	};

	var _objectCreate = Object.create || function create(O, Properties) {
	  var result;

	  if (O !== null) {
	    Empty[PROTOTYPE$1] = _anObject(O);
	    result = new Empty();
	    Empty[PROTOTYPE$1] = null; // add "__proto__" for Object.getPrototypeOf polyfill

	    result[IE_PROTO$1] = O;
	  } else result = createDict();

	  return Properties === undefined ? result : _objectDps(result, Properties);
	};

	var gOPN = _objectGopn.f;
	var toString$1 = {}.toString;
	var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames ? Object.getOwnPropertyNames(window) : [];

	var getWindowNames = function (it) {
	  try {
	    return gOPN(it);
	  } catch (e) {
	    return windowNames.slice();
	  }
	};

	var f$6 = function getOwnPropertyNames(it) {
	  return windowNames && toString$1.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(_toIobject(it));
	};

	var _objectGopnExt = {
	  f: f$6
	};

	var META = _meta.KEY;
	var gOPD$1 = _objectGopd.f;
	var dP$1 = _objectDp.f;
	var gOPN$1 = _objectGopnExt.f;
	var $Symbol = _global.Symbol;
	var $JSON = _global.JSON;

	var _stringify = $JSON && $JSON.stringify;

	var PROTOTYPE$2 = 'prototype';
	var HIDDEN = _wks('_hidden');
	var TO_PRIMITIVE = _wks('toPrimitive');
	var isEnum = {}.propertyIsEnumerable;
	var SymbolRegistry = _shared('symbol-registry');
	var AllSymbols = _shared('symbols');
	var OPSymbols = _shared('op-symbols');
	var ObjectProto = Object[PROTOTYPE$2];
	var USE_NATIVE = typeof $Symbol == 'function' && !!_objectGops.f;
	var QObject = _global.QObject; // Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173

	var setter = !QObject || !QObject[PROTOTYPE$2] || !QObject[PROTOTYPE$2].findChild; // fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687

	var setSymbolDesc = _descriptors && _fails(function () {
	  return _objectCreate(dP$1({}, 'a', {
	    get: function () {
	      return dP$1(this, 'a', {
	        value: 7
	      }).a;
	    }
	  })).a != 7;
	}) ? function (it, key, D) {
	  var protoDesc = gOPD$1(ObjectProto, key);
	  if (protoDesc) delete ObjectProto[key];
	  dP$1(it, key, D);
	  if (protoDesc && it !== ObjectProto) dP$1(ObjectProto, key, protoDesc);
	} : dP$1;

	var wrap = function (tag) {
	  var sym = AllSymbols[tag] = _objectCreate($Symbol[PROTOTYPE$2]);

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
	  _anObject(it);
	  key = _toPrimitive(key, true);
	  _anObject(D);

	  if (_has(AllSymbols, key)) {
	    if (!D.enumerable) {
	      if (!_has(it, HIDDEN)) dP$1(it, HIDDEN, _propertyDesc(1, {}));
	      it[HIDDEN][key] = true;
	    } else {
	      if (_has(it, HIDDEN) && it[HIDDEN][key]) it[HIDDEN][key] = false;
	      D = _objectCreate(D, {
	        enumerable: _propertyDesc(0, false)
	      });
	    }

	    return setSymbolDesc(it, key, D);
	  }

	  return dP$1(it, key, D);
	};

	var $defineProperties = function defineProperties(it, P) {
	  _anObject(it);
	  var keys = _enumKeys(P = _toIobject(P));
	  var i = 0;
	  var l = keys.length;
	  var key;

	  while (l > i) $defineProperty(it, key = keys[i++], P[key]);

	  return it;
	};

	var $create = function create(it, P) {
	  return P === undefined ? _objectCreate(it) : $defineProperties(_objectCreate(it), P);
	};

	var $propertyIsEnumerable = function propertyIsEnumerable(key) {
	  var E = isEnum.call(this, key = _toPrimitive(key, true));
	  if (this === ObjectProto && _has(AllSymbols, key) && !_has(OPSymbols, key)) return false;
	  return E || !_has(this, key) || !_has(AllSymbols, key) || _has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
	};

	var $getOwnPropertyDescriptor$1 = function getOwnPropertyDescriptor(it, key) {
	  it = _toIobject(it);
	  key = _toPrimitive(key, true);
	  if (it === ObjectProto && _has(AllSymbols, key) && !_has(OPSymbols, key)) return;
	  var D = gOPD$1(it, key);
	  if (D && _has(AllSymbols, key) && !(_has(it, HIDDEN) && it[HIDDEN][key])) D.enumerable = true;
	  return D;
	};

	var $getOwnPropertyNames = function getOwnPropertyNames(it) {
	  var names = gOPN$1(_toIobject(it));
	  var result = [];
	  var i = 0;
	  var key;

	  while (names.length > i) {
	    if (!_has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META) result.push(key);
	  }

	  return result;
	};

	var $getOwnPropertySymbols = function getOwnPropertySymbols(it) {
	  var IS_OP = it === ObjectProto;
	  var names = gOPN$1(IS_OP ? OPSymbols : _toIobject(it));
	  var result = [];
	  var i = 0;
	  var key;

	  while (names.length > i) {
	    if (_has(AllSymbols, key = names[i++]) && (IS_OP ? _has(ObjectProto, key) : true)) result.push(AllSymbols[key]);
	  }

	  return result;
	}; // 19.4.1.1 Symbol([description])


	if (!USE_NATIVE) {
	  $Symbol = function Symbol() {
	    if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor!');
	    var tag = _uid(arguments.length > 0 ? arguments[0] : undefined);

	    var $set = function (value) {
	      if (this === ObjectProto) $set.call(OPSymbols, value);
	      if (_has(this, HIDDEN) && _has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
	      setSymbolDesc(this, tag, _propertyDesc(1, value));
	    };

	    if (_descriptors && setter) setSymbolDesc(ObjectProto, tag, {
	      configurable: true,
	      set: $set
	    });
	    return wrap(tag);
	  };

	  _redefine($Symbol[PROTOTYPE$2], 'toString', function toString() {
	    return this._k;
	  });
	  _objectGopd.f = $getOwnPropertyDescriptor$1;
	  _objectDp.f = $defineProperty;
	  _objectGopn.f = _objectGopnExt.f = $getOwnPropertyNames;
	  _objectPie.f = $propertyIsEnumerable;
	  _objectGops.f = $getOwnPropertySymbols;

	  if (_descriptors && !_library) {
	    _redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
	  }

	  _wksExt.f = function (name) {
	    return wrap(_wks(name));
	  };
	}

	_export(_export.G + _export.W + _export.F * !USE_NATIVE, {
	  Symbol: $Symbol
	});

	for (var es6Symbols = // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
	'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'.split(','), j = 0; es6Symbols.length > j;) _wks(es6Symbols[j++]);

	for (var wellKnownSymbols = _objectKeys(_wks.store), k = 0; wellKnownSymbols.length > k;) _wksDefine(wellKnownSymbols[k++]);

	_export(_export.S + _export.F * !USE_NATIVE, 'Symbol', {
	  // 19.4.2.1 Symbol.for(key)
	  'for': function (key) {
	    return _has(SymbolRegistry, key += '') ? SymbolRegistry[key] : SymbolRegistry[key] = $Symbol(key);
	  },
	  // 19.4.2.5 Symbol.keyFor(sym)
	  keyFor: function keyFor(sym) {
	    if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol!');

	    for (var key in SymbolRegistry) if (SymbolRegistry[key] === sym) return key;
	  },
	  useSetter: function () {
	    setter = true;
	  },
	  useSimple: function () {
	    setter = false;
	  }
	});
	_export(_export.S + _export.F * !USE_NATIVE, 'Object', {
	  // 19.1.2.2 Object.create(O [, Properties])
	  create: $create,
	  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
	  defineProperty: $defineProperty,
	  // 19.1.2.3 Object.defineProperties(O, Properties)
	  defineProperties: $defineProperties,
	  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
	  getOwnPropertyDescriptor: $getOwnPropertyDescriptor$1,
	  // 19.1.2.7 Object.getOwnPropertyNames(O)
	  getOwnPropertyNames: $getOwnPropertyNames,
	  // 19.1.2.8 Object.getOwnPropertySymbols(O)
	  getOwnPropertySymbols: $getOwnPropertySymbols
	}); // Chrome 38 and 39 `Object.getOwnPropertySymbols` fails on primitives
	// https://bugs.chromium.org/p/v8/issues/detail?id=3443

	var FAILS_ON_PRIMITIVES = _fails(function () {
	  _objectGops.f(1);
	});
	_export(_export.S + _export.F * FAILS_ON_PRIMITIVES, 'Object', {
	  getOwnPropertySymbols: function getOwnPropertySymbols(it) {
	    return _objectGops.f(_toObject(it));
	  }
	}); // 24.3.2 JSON.stringify(value [, replacer [, space]])

	$JSON && _export(_export.S + _export.F * (!USE_NATIVE || _fails(function () {
	  var S = $Symbol(); // MS Edge converts symbol values to JSON as {}
	  // WebKit converts symbol values to JSON as null
	  // V8 throws on boxed symbols

	  return _stringify([S]) != '[null]' || _stringify({
	    a: S
	  }) != '{}' || _stringify(Object(S)) != '{}';
	})), 'JSON', {
	  stringify: function stringify(it) {
	    var args = [it];
	    var i = 1;
	    var replacer, $replacer;

	    while (arguments.length > i) args.push(arguments[i++]);

	    $replacer = replacer = args[1];
	    if (!_isObject(replacer) && it === undefined || isSymbol(it)) return; // IE8 returns string on undefined

	    if (!_isArray(replacer)) replacer = function (key, value) {
	      if (typeof $replacer == 'function') value = $replacer.call(this, key, value);
	      if (!isSymbol(value)) return value;
	    };
	    args[1] = replacer;
	    return _stringify.apply($JSON, args);
	  }
	}); // 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)

	$Symbol[PROTOTYPE$2][TO_PRIMITIVE] || _hide($Symbol[PROTOTYPE$2], TO_PRIMITIVE, $Symbol[PROTOTYPE$2].valueOf); // 19.4.3.5 Symbol.prototype[@@toStringTag]

	_setToStringTag($Symbol, 'Symbol'); // 20.2.1.9 Math[@@toStringTag]

	_setToStringTag(Math, 'Math', true); // 24.3.3 JSON[@@toStringTag]

	_setToStringTag(_global.JSON, 'JSON', true);

	var getOwnPropertySymbols = _core.Object.getOwnPropertySymbols;

	var getOwnPropertySymbols$1 = getOwnPropertySymbols;

	_objectSap('keys', function () {
	  return function keys(it) {
	    return _objectKeys(_toObject(it));
	  };
	});

	var keys = _core.Object.keys;

	var keys$1 = keys;

	function _defineProperty(obj, key, value) {
	  if (key in obj) {
	    defineProperty$1(obj, key, {
	      value: value,
	      enumerable: true,
	      configurable: true,
	      writable: true
	    });
	  } else {
	    obj[key] = value;
	  }

	  return obj;
	}

	var defineProperty$3 = _defineProperty;

	var version = "3.2.1";

	_export(_export.S, 'Array', {
	  isArray: _isArray
	});

	var isArray = _core.Array.isArray;

	var isArray$1 = isArray;

	// false -> String#codePointAt

	var _stringAt = function (TO_STRING) {
	  return function (that, pos) {
	    var s = String(_defined(that));
	    var i = _toInteger(pos);
	    var l = s.length;
	    var a, b;
	    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
	    a = s.charCodeAt(i);
	    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff ? TO_STRING ? s.charAt(i) : a : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
	  };
	};

	var _iterators = {};

	var IteratorPrototype = {}; // 25.1.2.1.1 %IteratorPrototype%[@@iterator]()

	_hide(IteratorPrototype, _wks('iterator'), function () {
	  return this;
	});

	var _iterCreate = function (Constructor, NAME, next) {
	  Constructor.prototype = _objectCreate(IteratorPrototype, {
	    next: _propertyDesc(1, next)
	  });
	  _setToStringTag(Constructor, NAME + ' Iterator');
	};

	var IE_PROTO$2 = _sharedKey('IE_PROTO');
	var ObjectProto$1 = Object.prototype;

	var _objectGpo = Object.getPrototypeOf || function (O) {
	  O = _toObject(O);
	  if (_has(O, IE_PROTO$2)) return O[IE_PROTO$2];

	  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
	    return O.constructor.prototype;
	  }

	  return O instanceof Object ? ObjectProto$1 : null;
	};

	var ITERATOR = _wks('iterator');
	var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`

	var FF_ITERATOR = '@@iterator';
	var KEYS = 'keys';
	var VALUES = 'values';

	var returnThis = function () {
	  return this;
	};

	var _iterDefine = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
	  _iterCreate(Constructor, NAME, next);

	  var getMethod = function (kind) {
	    if (!BUGGY && kind in proto) return proto[kind];

	    switch (kind) {
	      case KEYS:
	        return function keys() {
	          return new Constructor(this, kind);
	        };

	      case VALUES:
	        return function values() {
	          return new Constructor(this, kind);
	        };
	    }

	    return function entries() {
	      return new Constructor(this, kind);
	    };
	  };

	  var TAG = NAME + ' Iterator';
	  var DEF_VALUES = DEFAULT == VALUES;
	  var VALUES_BUG = false;
	  var proto = Base.prototype;
	  var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
	  var $default = $native || getMethod(DEFAULT);
	  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
	  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
	  var methods, key, IteratorPrototype; // Fix native

	  if ($anyNative) {
	    IteratorPrototype = _objectGpo($anyNative.call(new Base()));

	    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
	      // Set @@toStringTag to native iterators
	      _setToStringTag(IteratorPrototype, TAG, true); // fix for some old engines

	      if (!_library && typeof IteratorPrototype[ITERATOR] != 'function') _hide(IteratorPrototype, ITERATOR, returnThis);
	    }
	  } // fix Array#{values, @@iterator}.name in V8 / FF


	  if (DEF_VALUES && $native && $native.name !== VALUES) {
	    VALUES_BUG = true;

	    $default = function values() {
	      return $native.call(this);
	    };
	  } // Define iterator


	  if ((!_library || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
	    _hide(proto, ITERATOR, $default);
	  } // Plug for library


	  _iterators[NAME] = $default;
	  _iterators[TAG] = returnThis;

	  if (DEFAULT) {
	    methods = {
	      values: DEF_VALUES ? $default : getMethod(VALUES),
	      keys: IS_SET ? $default : getMethod(KEYS),
	      entries: $entries
	    };
	    if (FORCED) for (key in methods) {
	      if (!(key in proto)) _redefine(proto, key, methods[key]);
	    } else _export(_export.P + _export.F * (BUGGY || VALUES_BUG), NAME, methods);
	  }

	  return methods;
	};

	var $at = _stringAt(true); // 21.1.3.27 String.prototype[@@iterator]()

	_iterDefine(String, 'String', function (iterated) {
	  this._t = String(iterated); // target

	  this._i = 0; // next index
	  // 21.1.5.2.1 %StringIteratorPrototype%.next()
	}, function () {
	  var O = this._t;
	  var index = this._i;
	  var point;
	  if (index >= O.length) return {
	    value: undefined,
	    done: true
	  };
	  point = $at(O, index);
	  this._i += point.length;
	  return {
	    value: point,
	    done: false
	  };
	});

	var _iterStep = function (done, value) {
	  return {
	    value: value,
	    done: !!done
	  };
	};

	// 22.1.3.13 Array.prototype.keys()
	// 22.1.3.29 Array.prototype.values()
	// 22.1.3.30 Array.prototype[@@iterator]()


	var es6_array_iterator = _iterDefine(Array, 'Array', function (iterated, kind) {
	  this._t = _toIobject(iterated); // target

	  this._i = 0; // next index

	  this._k = kind; // kind
	  // 22.1.5.2.1 %ArrayIteratorPrototype%.next()
	}, function () {
	  var O = this._t;
	  var kind = this._k;
	  var index = this._i++;

	  if (!O || index >= O.length) {
	    this._t = undefined;
	    return _iterStep(1);
	  }

	  if (kind == 'keys') return _iterStep(0, index);
	  if (kind == 'values') return _iterStep(0, O[index]);
	  return _iterStep(0, [index, O[index]]);
	}, 'values'); // argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)

	_iterators.Arguments = _iterators.Array;

	var TO_STRING_TAG = _wks('toStringTag');
	var DOMIterables = ('CSSRuleList,CSSStyleDeclaration,CSSValueList,ClientRectList,DOMRectList,DOMStringList,' + 'DOMTokenList,DataTransferItemList,FileList,HTMLAllCollection,HTMLCollection,HTMLFormElement,HTMLSelectElement,' + 'MediaList,MimeTypeArray,NamedNodeMap,NodeList,PaintRequestList,Plugin,PluginArray,SVGLengthList,SVGNumberList,' + 'SVGPathSegList,SVGPointList,SVGStringList,SVGTransformList,SourceBufferList,StyleSheetList,TextTrackCueList,' + 'TextTrackList,TouchList').split(',');

	for (var i = 0; i < DOMIterables.length; i++) {
	  var NAME = DOMIterables[i];
	  var Collection = _global[NAME];
	  var proto = Collection && Collection.prototype;
	  if (proto && !proto[TO_STRING_TAG]) _hide(proto, TO_STRING_TAG, NAME);
	  _iterators[NAME] = _iterators.Array;
	}

	var iterator = _wksExt.f('iterator');

	var iterator$1 = iterator;

	_wksDefine('asyncIterator');

	_wksDefine('observable');

	var symbol = _core.Symbol;

	var symbol$1 = symbol;

	var _typeof_1 = createCommonjsModule(function (module) {
	  function _typeof2(obj) {
	    if (typeof symbol$1 === "function" && typeof iterator$1 === "symbol") {
	      _typeof2 = function _typeof2(obj) {
	        return typeof obj;
	      };
	    } else {
	      _typeof2 = function _typeof2(obj) {
	        return obj && typeof symbol$1 === "function" && obj.constructor === symbol$1 && obj !== symbol$1.prototype ? "symbol" : typeof obj;
	      };
	    }

	    return _typeof2(obj);
	  }

	  function _typeof(obj) {
	    if (typeof symbol$1 === "function" && _typeof2(iterator$1) === "symbol") {
	      module.exports = _typeof = function _typeof(obj) {
	        return _typeof2(obj);
	      };
	    } else {
	      module.exports = _typeof = function _typeof(obj) {
	        return obj && typeof symbol$1 === "function" && obj.constructor === symbol$1 && obj !== symbol$1.prototype ? "symbol" : _typeof2(obj);
	      };
	    }

	    return _typeof(obj);
	  }

	  module.exports = _typeof;
	});

	/** @module Type */

	/**
	 * 返回val的类型。
	 * @function getType
	 * @param {*} val - 需要检查的值。
	 * @return {string}
	 * @example
	 * U.getType(new Set([1, 2]))
	 * // => 'set'
	 */
	var getType = function getType(val) {
	  return isUndefined(val) ? 'undefined' : isNull(val) ? 'null' : val.constructor.name.toLowerCase();
	};
	/**
	 * 检查value是否为number类型。使用typeof来检查，返回布尔值。
	 * @function isNumber
	 * @param {*} value - 需要检查的值。
	 * @return {boolean}
	 * @example
	 * U.isNumber(3)
	 * // => true
	 *
	 * U.isNumber(Number.MIN_VALUE)
	 * // => true
	 *
	 * U.isNumber(Infinity)
	 * // => true
	 *
	 * U.isNumber('3')
	 * // => false 
	 */

	var isNumber = function isNumber(value) {
	  return typeof value === 'number';
	};
	/**
	 * 检查值是否为字符串。使用typeof来检查，返回布尔值。
	 * @function isString
	 * @param {*} value - 需要检查的值。
	 * @return {boolean}
	 * @example
	 * U.isString(3)
	 * // => false
	 *
	 * U.isString('3')
	 * // => true
	 */

	var isString = function isString(value) {
	  return typeof value === 'string';
	};
	/**
	 * 检查值是否为null对象。使用typeof来检查，返回布尔值。
	 * @function isNull
	 * @param {*} value - 需要检查的值。
	 * @return {boolean}
	 * @example
	 * U.isNull(3)
	 * // => false
	 *
	 * U.isNull(null)
	 * // => true
	 */

	var isNull = function isNull(value) {
	  return value === null;
	};
	/**
	 * 检查值是否为undefined对象。使用typeof来检查，返回布尔值。
	 * @function isUndefined
	 * @param {*} value - 需要检查的值。
	 * @return {boolean}
	 * @example
	 * U.isUndefined(undefined)
	 * // => true
	 *
	 * U.isUndefined(null)
	 * // => false
	 */

	var isUndefined = function isUndefined(value) {
	  return value === undefined;
	};
	/**
	 * 检查值是否为布尔值。使用typeof来检查，返回布尔值。
	 * @function isBoolean
	 * @param {*} value - 需要检查的值。
	 * @return {boolean}
	 * @example
	 * U.isBoolean(false)
	 * // => true
	 *
	 * U.isBoolean(null)
	 * // => false
	 */

	var isBoolean = function isBoolean(value) {
	  return typeof value === 'boolean';
	};
	/**
	 * 检查值是否为symbol类型。使用typeof来检查，返回布尔值。
	 * @function isSymbol
	 * @param {*} value - 需要检查的值。
	 * @return {boolean}
	 * @example
	 * U.isSymbol(Symbol('x'))
	 * // => true
	 */

	var isSymbol$1 = function isSymbol(value) {
	  return _typeof_1(value) === 'symbol';
	};
	/**
	 * 检查值是否为function类型。使用typeof来检查，返回布尔值。
	 * @function isFunction
	 * @param {*} value - 需要检查的值。
	 * @return {boolean}
	 * @example
	 * U.isFunction(3)
	 * // => false
	 *
	 * U.isFunction(function () {})
	 * // => true
	 */

	var isFunction = function isFunction(value) {
	  return typeof value === 'function';
	};
	/**
	 * 使用Array.isArray方法检查arr是否为数组类型，返回布尔值。
	 * @function isArray
	 * @param {*} arr - 需要检查的值。
	 * @return {boolean}
	 * @example
	 * U.isArray([])
	 * // => true
	 *
	 * U.isArray(null)
	 * // => false
	 */

	var isArray$2 = function isArray(arr) {
	  return isArray$1(arr);
	};
	/**
	 * 检查alue是否为对象类型，返回布尔值。
	 * @function isObject
	 * @param {*} value - 需要检查的值。
	 * @return {boolean}
	 * @example
	 * U.isObject(null)
	 * // => false
	 *
	 * U.isObject([1, 2])
	 * // => false
	 *
	 * U.isObject({})
	 * // => true
	 */

	var isObject = function isObject(value) {
	  return value instanceof Object && !isArray$2(value);
	};

	var floor$1 = Math.floor;

	var _isInteger = function isInteger(it) {
	  return !_isObject(it) && isFinite(it) && floor$1(it) === it;
	};

	_export(_export.S, 'Number', {
	  isInteger: _isInteger
	});

	var isInteger = _core.Number.isInteger;

	var isInteger$1 = isInteger;

	/**
	 * 检查给定值是否为整数，返回布尔值。
	 * @function isInt
	 * @param {*} val - 需要检查的值。
	 * @return {boolean}
	 * @example
	 * U.isInt(0)
	 * // => true
	 *
	 * U.isInt(1.15)
	 * // => false
	 * 
	 * U.isInt('3')
	 * // => false
	 */

	var isInt = function isInt(val) {
	  return isInteger$1(val);
	};
	/**
	 * 将数字value格式化为千位符数字字符串。如果value是数字，则返回格式化后的字符串，否则报错。
	 * @function toThousands
	 * @param {number|string} value - 需要千位符格式化的值。
	 * @param {string} [separator=','] - 可选，分隔符。
	 * @returns {string|NaN}
	 * @example
	 * U.toThousands(-1545454)
	 * // => '-1,545,454'
	 *
	 * U.toThousands(1545454.1545)
	 * // => '1,545,454.1545'
	 * 
	 * U.toThousands('1545454.1545', '-')
	 * // => '1-545-454.1545'
	 *
	 * U.toThousands(0)
	 * // => '0'
	 *
	 * U.toThousands(null)
	 * // => '0'
	 *
	 * U.toThousands(undefined)
	 * // => NaN
	 */

	var toThousands = function toThousands(value) {
	  var separator = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : ',';
	  return isNull(value) ? '0' : isNaN(Number(value)) ? NaN : "".concat(value).split('.').map(function (v, i) {
	    return i === 0 ? v.replace(/([-|+]?\d)(?=(\d{3})+$)/g, "$1".concat(separator)) : v;
	  }).join('.');
	};
	/**
	 * 数字value是否在两个数之间。如果不设置end，则start默认为0，判断value是否在0与start之间。
	 * @function inRange
	 * @param {number} value - 需要判断的数值。
	 * @param {number} [start=0] - 起点值，只提供两个参数时start默认为0。
	 * @param {number} end - 终点值，只提供两个参数时取第二个参数值为该值，且起点值为0。
	 * @return {boolean}
	 * @example
	 * U.inRange(5, 4)
	 * // => false
	 *
	 * U.inRange(5, 7)
	 * // => true
	 *
	 * U.inRange(5, 4, 7)
	 * // => true
	 *
	 * U.inRange(5, 7, 10)
	 * // => false
	 *
	 * U.inRange(5, 10, 7)
	 * // => false
	 */

	var inRange = function inRange(value, start) {
	  var end = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

	  if (end && start > end) {
	    var _ref = [start, end];
	    end = _ref[0];
	    start = _ref[1];
	  }

	  return isNull(end) ? value >= 0 && value < start : value >= start && value < end;
	};
	/**
	 * 四舍五入函数
	 * @function round
	 * @param {number} val - 数字。
	 * @param {number} [decimals=0] - 可选，保留的数字精度，默认为0。
	 * @return {number}
	 * @example
	 * U.round(1.2006, 3)
	 * // => 1.201
	 *
	 * U.round(1.2006)
	 * // => 1
	 */

	var round = function round(val) {
	  var decimals = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
	  return Number("".concat(Math.round("".concat(val, "e").concat(decimals)), "e-").concat(decimals));
	};
	/**
	 * 生成一个start～end之间随机数字
	 * @function random
	 * @param {number} start - 可选，数字。
	 * @param {number} end - 可选，数字。
	 * @return {number}
	 * @example
	 * const a = U.random()
	 * // => 0 < a < 1
	 *
	 * const b = U.random(3)
	 * // => 0 < b < 3
	 * 
	 * const c = U.random(3, 5)
	 * // => 3 < c < 5
	 * 
	 * const d = U.random(5, 3)
	 * // => 3 < d < 5
	 * 
	 * const e = U.random(-1)
	 * // => -1 < e < 0
	 * 
	 * const f = U.random(-1, 1)
	 * // => -1 < f < 1
	 */

	var random = function random(start, end) {
	  return start && end ? Math.random() * Math.abs(start - end) + Math.min(start, end) : Math.random() * (start || end || 1);
	};
	/**
	 * 保留小数位数
	 * @function keepFixed
	 * @param {number|string} val - 数值
	 * @param {number} precision - 非负整数，保留小数的位数
	 * @param {boolean} [useFiller=true] - 可选，小数位数不足时是否使用0填充，默认为true
	 * @return {string}
	 * @example
	 * U.keepFixed(-15.12, 4)
	 * // => -15.1200
	 * 
	 * U.keepFixed(15.1234, 2)
	 * // => -15.12
	 */

	var keepFixed = function keepFixed(val, precision) {
	  var useFiller = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
	  var i = "".concat(val).indexOf('.');

	  if (i < 0) {
	    return useFiller ? "".concat(val, ".").concat('0'.repeat(precision)) : "".concat(val);
	  }

	  i += precision + 1;
	  val = "".concat(val).substring(0, i);
	  return useFiller ? val.padEnd(i, '0') : val;
	};
	/**
	 * 求平均值函数
	 * @function average
	 * @param {number} args - 参数列表，数值类型
	 * @return {number}
	 * @example
	 * U.average(10, 20)
	 * // => 15
	 * 
	 * U.average(-10, -20, 30, 40)
	 * // => 10
	 */

	var average = function average() {
	  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
	    args[_key] = arguments[_key];
	  }

	  return args.reduce(function (acc, v) {
	    return acc + v;
	  }, 0) / args.length;
	};

	_export(_export.S, 'Date', {
	  now: function () {
	    return new Date().getTime();
	  }
	});

	var now = _core.Date.now;

	var now$1 = now;

	/** @module Function */

	/**
	 * 将函数fn转为一次函数。返回函数，函数只能执行一次。
	 * @function noce
	 * @param {function} fn - 执行的函数。
	 * @return {function}
	 * @example
	 * const fn = once(() => '5')
	 * console.log([fn(), fn()])
	 * // => ['5', undefined]
	 */
	var once = function once(fn) {
	  var called = false;
	  return function () {
	    if (called) return;
	    called = true;

	    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }

	    return fn.apply(this, args);
	  };
	};
	/**
	 * 将函数fn转为防抖函数。返回防抖函数。
	 * @function debounce
	 * @param {function} fn - 函数。
	 * @param {number} [delay=0] - 可选，防抖动延迟时长，单位为ms，默认为0。
	 * @returns {function}
	 * @example
	 * window.addEventListener('resize', U.debounce(() => {
	 *   console.log(window.innerWidth);
	 *   console.log(window.innerHeight);
	 * }, 250));
	 * // => 调整浏览器窗口尺寸，在250ms后控制台将打印一次窗口尺寸
	 */

	var debounce = function debounce(fn) {
	  var delay = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
	  var timeoutId;
	  return function () {
	    var _this = this;

	    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
	      args[_key2] = arguments[_key2];
	    }

	    clearTimeout(timeoutId);
	    timeoutId = setTimeout(function () {
	      return fn.apply(_this, args);
	    }, delay);
	  };
	};
	/**
	 * 将函数fn转为节流函数。返回节流函数。
	 * @function throttle
	 * @param {function} fn - 函数。
	 * @param {number} wait - 节流时长，单位为ms。
	 * @return {function}
	 * @example
	 * window.addEventListener('resize', U.throttle(function(evt) {
	 *   console.log(window.innerWidth);
	 *   console.log(window.innerHeight);
	 * }, 250));
	 * // 调整浏览器窗口尺寸，没间隔250ms控制台将打印一次窗口尺寸
	 */

	var throttle = function throttle(fn, wait) {
	  var inThrottle, lastFn, lastTime;
	  return function () {
	    var context = this,
	        args = arguments;

	    if (!inThrottle) {
	      fn.apply(context, args);
	      lastTime = now$1();
	      inThrottle = true;
	    } else {
	      clearTimeout(lastFn);
	      lastFn = setTimeout(function () {
	        if (now$1() - lastTime >= wait) {
	          fn.apply(context, args);
	          lastTime = now$1();
	        }
	      }, Math.max(wait - (now$1() - lastTime), 0));
	    }
	  };
	};
	/**
	 * 管道函数，占位符“$”为上一个函数的运算结果，如：pipe(x, `a |> b($, y)`) 等价于 b(a(x), y)。
	 * @function pipe
	 * @param {*} param - 函数参数。
	 * @param {string} line - 管道线。
	 * @return {*}
	 * @example
	 * const x = 1;
	 * const y = 3;
	 * 
	 * const a = n => n + 1;
	 * const b = (x, y)=> x * y;
	 * const c = n => n * n;
	 * 
	 * pipe(x, `a |> b($, y)`)
	 * // => 6
	 * 
	 * pipe(x, `a |> c`)
	 * // => 4
	 */

	var pipe = function pipe(param, line) {
	  return line.split('|>').reduce(function (acc, fn) {
	    fn = fn.indexOf('(') > -1 ? fn.replace(/[\(|,]\s*\$\s*[\)|,]/g, function (w) {
	      return w.replace('$', 'acc');
	    }) : "".concat(fn, "(acc)");
	    return acc = new Function('acc', 'return ' + fn)(acc);
	  }, param);
	};

	/** @module Date */

	/**
	 * 格式化日期。如果value无法被new Date()转换为日期对象，返回空字符串。
	 * @function dateFormat
	 * @param {date} [date=new Date()] - 可选，需要格式化的日期，默认是当前时间。
	 * @param {string} [format='YYYY-MM-DD']- 可选，格式化的格式，默认是`YYYY-MM-DD`格式。
	 * @return {string}
	 * @example
	 * U.dateFormat(new Date(2018, 11, 10))
	 * // => '2018-12-10'
	 *
	 * U.dateFormat(new Date(2018, 11, 10, 10, 29, 36), 'YYYY-MM-DD hh:mm:ss')
	 * // => '2018-12-10 10:29:36'
	 *
	 * U.dateFormat(1545484848484, 'YYYY-MM-DD hh:mm:ss')
	 * // => '2018-12-22 21:20:48'
	 */
	var dateFormat = function dateFormat() {
	  var date = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new Date();
	  var format = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'YYYY-MM-DD';
	  var d = new Date(date);

	  var zeroize = function zeroize(val) {
	    return val < 10 ? "0".concat(val) : "".concat(val);
	  };

	  return format.replace(/YYYY|MM|DD|hh|mm|ss/g, function (word) {
	    return {
	      'YYYY': d.getFullYear(),
	      'MM': zeroize(d.getMonth() + 1),
	      'DD': zeroize(d.getDate()),
	      'hh': zeroize(d.getHours()),
	      'mm': zeroize(d.getMinutes()),
	      'ss': zeroize(d.getSeconds())
	    }[word] || word;
	  });
	};
	/**
	 * 获取某月的总天数，date可以是任意能被new Date()格式化为日期对象的值。
	 * @function getMonthDays
	 * @param {date} [date=new Date()] - 可选，日期，默认是当前时间。
	 * @return {number}
	 * @example
	 * U.getMonthDays(new Date(2018, 1))
	 * // => 28
	 *
	 * U.getMonthDays(153454878787)
	 * // => 30
	 */

	var getMonthDays = function getMonthDays() {
	  var date = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new Date();
	  var d = new Date(date);
	  d.setMonth(d.getMonth() + 1);
	  d.setDate(0);
	  return d.getDate();
	};
	/**
	 * 获取星期名称，lang代表输出语言。date为日期，可以是任意能被new Date()格式化为日期对象的值。
	 * @function getWeekday
	 * @param {string} [lang='zh'] - 可选，输出语言，默认为'zh'，当该值为undefined时取'zh'——表示中文，'en'——表示英文。
	 * @param {data} [date=new Date()] - 可选，日期，默认为当前日期。
	 * @return {string}
	 * @example
	 * U.getWeekday('zh', new Date(2018, 1, 1))
	 * // => '星期四'
	 *
	 * * U.getWeekday('zh', '2018/2/1')
	 * // => '星期四'
	 * 
	 * U.getWeekday('en', 153454878787)
	 * // => 'Tuesday'
	 */

	var getWeekday = function getWeekday() {
	  var lang = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'zh';
	  var date = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : new Date();
	  var day = new Date(date).getDay();
	  return lang === 'en' ? ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][day] : '星期' + '日一二三四五六'.charAt(day);
	};
	/**
	 * 获取上一个月份
	 * @function prevMonth
	 * @param {*} [date=new Date()]- 可选，日期，默认是当前时间。
	 * @return {date}
	 * @example
	 * U.prevMonth()
	 * // => 2018-11-20T17:07:37.937Z (当前时间为2018-12)
	 *
	 * U.prevMonth(new Date(2018, 10, 9))
	 * // => 2018-10-08T16:00:00.000Z
	 * 
	 * U.prevMonth(153454878787)
	 * // => 1974-10-12T02:21:18.787Z
	 * 
	 * U.prevMonth('2018/12/3')
	 * // => 2018-11-02T16:00:00.000Z
	 */

	var prevMonth = function prevMonth() {
	  var date = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new Date();
	  var d = new Date(date);
	  d.setMonth(d.getMonth() - 1);
	  return d;
	};
	/**
	 * 获取下一个月份
	 * @function nextMonth
	 * @param {date} [date=new Date()] - 可选，日期，默认是当前时间。
	 * @return {date}
	 * @example
	 * U.nextMonth()
	 * // => 2019-01-20T17:13:15.179Z (当前时间为2018-12)
	 *
	 * U.nextMonth(new Date(2018, 10, 9))
	 * // => 2018-10-08T16:00:00.000Z
	 * 
	 * U.nextMonth(153454878787)
	 * // => 1974-12-12T02:21:18.787Z
	 * 
	 * U.nextMonth('2018/12/3')
	 * // => 2018-11-02T16:00:00.000Z
	 */

	var nextMonth = function nextMonth() {
	  var date = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new Date();
	  var d = new Date(date);
	  d.setMonth(d.getMonth() + 1);
	  return d;
	};
	/**
	 * 比较日期dateA是否是dateB之后的日期，返回布尔值
	 * @function isAfterDate
	 * @param {date} dateA - 较后的日期。
	 * @param {date} dateB - 较前的日期。
	 * @return {boolean}
	 * @example
	 * U.isAfterDate('2018/11/1', '2018/11/30')
	 * // => false
	 *
	 * U.isAfterDate(new Date(2018, 12, 11), new Date(2018, 12, 10))
	 * // => true
	 */

	var isAfterDate = function isAfterDate(dateA, dateB) {
	  return new Date(dateA) > new Date(dateB);
	};
	/**
	 * 返回距离date为n天的日期
	 * @function spreadDate
	 * @param {number} n - 天数。当n为负数，返回过去的日期；当n为正数，返回未来的日期。
	 * @param {date} [date=new Date()] - 可选，日期，默认为当前日期。
	 * @return {date}
	 * @example
	 * U.spreadDate(1)
	 * // => Thu Feb 21 2019 21:01:53 GMT+0800 (当前时间：Wed Feb 20 2019 21:01:53 GMT+0800 )
	 *
	 * U.spreadDate(1)
	 * // => Thu Feb 19 2019 21:01:53 GMT+0800 (当前时间：Wed Feb 20 2019 21:01:53 GMT+0800 )
	 * 
	 * U.spreadDate(7, new Date(2018, 9, 10))
	 * // => Wed Oct 17 2018 00:00:00 GMT+0800 (中国标准时间)
	 */

	var spreadDate = function spreadDate(n) {
	  var date = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : new Date();
	  return new Date(+date + n * 24 * 60 * 60 * 1000);
	};

	var _iterCall = function (iterator, fn, value, entries) {
	  try {
	    return entries ? fn(_anObject(value)[0], value[1]) : fn(value); // 7.4.6 IteratorClose(iterator, completion)
	  } catch (e) {
	    var ret = iterator['return'];
	    if (ret !== undefined) _anObject(ret.call(iterator));
	    throw e;
	  }
	};

	var ITERATOR$1 = _wks('iterator');
	var ArrayProto = Array.prototype;

	var _isArrayIter = function (it) {
	  return it !== undefined && (_iterators.Array === it || ArrayProto[ITERATOR$1] === it);
	};

	var TAG$1 = _wks('toStringTag'); // ES3 wrong here

	var ARG = _cof(function () {
	  return arguments;
	}()) == 'Arguments'; // fallback for IE11 Script Access Denied error

	var tryGet = function (it, key) {
	  try {
	    return it[key];
	  } catch (e) {
	    /* empty */
	  }
	};

	var _classof = function (it) {
	  var O, T, B;
	  return it === undefined ? 'Undefined' : it === null ? 'Null' // @@toStringTag case
	  : typeof (T = tryGet(O = Object(it), TAG$1)) == 'string' ? T // builtinTag case
	  : ARG ? _cof(O) // ES3 arguments fallback
	  : (B = _cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
	};

	var ITERATOR$2 = _wks('iterator');

	var core_getIteratorMethod = _core.getIteratorMethod = function (it) {
	  if (it != undefined) return it[ITERATOR$2] || it['@@iterator'] || _iterators[_classof(it)];
	};

	var ITERATOR$3 = _wks('iterator');
	var SAFE_CLOSING = false;

	try {
	  var riter = [7][ITERATOR$3]();

	  riter['return'] = function () {
	    SAFE_CLOSING = true;
	  }; // eslint-disable-next-line no-throw-literal
	} catch (e) {
	  /* empty */
	}

	var _iterDetect = function (exec, skipClosing) {
	  if (!skipClosing && !SAFE_CLOSING) return false;
	  var safe = false;

	  try {
	    var arr = [7];
	    var iter = arr[ITERATOR$3]();

	    iter.next = function () {
	      return {
	        done: safe = true
	      };
	    };

	    arr[ITERATOR$3] = function () {
	      return iter;
	    };

	    exec(arr);
	  } catch (e) {
	    /* empty */
	  }

	  return safe;
	};

	_export(_export.S + _export.F * !_iterDetect(function (iter) {
	}), 'Array', {
	  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
	  from: function from(arrayLike
	  /* , mapfn = undefined, thisArg = undefined */
	  ) {
	    var O = _toObject(arrayLike);
	    var C = typeof this == 'function' ? this : Array;
	    var aLen = arguments.length;
	    var mapfn = aLen > 1 ? arguments[1] : undefined;
	    var mapping = mapfn !== undefined;
	    var index = 0;
	    var iterFn = core_getIteratorMethod(O);
	    var length, result, step, iterator;
	    if (mapping) mapfn = _ctx(mapfn, aLen > 2 ? arguments[2] : undefined, 2); // if object isn't iterable or it's array with default iterator - use simple case

	    if (iterFn != undefined && !(C == Array && _isArrayIter(iterFn))) {
	      for (iterator = iterFn.call(O), result = new C(); !(step = iterator.next()).done; index++) {
	        _createProperty(result, index, mapping ? _iterCall(iterator, mapfn, [step.value, index], true) : step.value);
	      }
	    } else {
	      length = _toLength(O.length);

	      for (result = new C(length); length > index; index++) {
	        _createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);
	      }
	    }

	    result.length = index;
	    return result;
	  }
	});

	var from_1 = _core.Array.from;

	var from_1$1 = from_1;

	var _redefineAll = function (target, src, safe) {
	  for (var key in src) {
	    if (safe && target[key]) target[key] = src[key];else _hide(target, key, src[key]);
	  }

	  return target;
	};

	var _anInstance = function (it, Constructor, name, forbiddenField) {
	  if (!(it instanceof Constructor) || forbiddenField !== undefined && forbiddenField in it) {
	    throw TypeError(name + ': incorrect invocation!');
	  }

	  return it;
	};

	var _forOf = createCommonjsModule(function (module) {
	  var BREAK = {};
	  var RETURN = {};

	  var exports = module.exports = function (iterable, entries, fn, that, ITERATOR) {
	    var iterFn = ITERATOR ? function () {
	      return iterable;
	    } : core_getIteratorMethod(iterable);
	    var f = _ctx(fn, that, entries ? 2 : 1);
	    var index = 0;
	    var length, step, iterator, result;
	    if (typeof iterFn != 'function') throw TypeError(iterable + ' is not iterable!'); // fast case for arrays with default iterator

	    if (_isArrayIter(iterFn)) for (length = _toLength(iterable.length); length > index; index++) {
	      result = entries ? f(_anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
	      if (result === BREAK || result === RETURN) return result;
	    } else for (iterator = iterFn.call(iterable); !(step = iterator.next()).done;) {
	      result = _iterCall(iterator, f, step.value, entries);
	      if (result === BREAK || result === RETURN) return result;
	    }
	  };

	  exports.BREAK = BREAK;
	  exports.RETURN = RETURN;
	});

	var SPECIES = _wks('species');

	var _setSpecies = function (KEY) {
	  var C = typeof _core[KEY] == 'function' ? _core[KEY] : _global[KEY];
	  if (_descriptors && C && !C[SPECIES]) _objectDp.f(C, SPECIES, {
	    configurable: true,
	    get: function () {
	      return this;
	    }
	  });
	};

	var _validateCollection = function (it, TYPE) {
	  if (!_isObject(it) || it._t !== TYPE) throw TypeError('Incompatible receiver, ' + TYPE + ' required!');
	  return it;
	};

	var dP$2 = _objectDp.f;
	var fastKey = _meta.fastKey;
	var SIZE = _descriptors ? '_s' : 'size';

	var getEntry = function (that, key) {
	  // fast case
	  var index = fastKey(key);
	  var entry;
	  if (index !== 'F') return that._i[index]; // frozen object case

	  for (entry = that._f; entry; entry = entry.n) {
	    if (entry.k == key) return entry;
	  }
	};

	var _collectionStrong = {
	  getConstructor: function (wrapper, NAME, IS_MAP, ADDER) {
	    var C = wrapper(function (that, iterable) {
	      _anInstance(that, C, NAME, '_i');
	      that._t = NAME; // collection type

	      that._i = _objectCreate(null); // index

	      that._f = undefined; // first entry

	      that._l = undefined; // last entry

	      that[SIZE] = 0; // size

	      if (iterable != undefined) _forOf(iterable, IS_MAP, that[ADDER], that);
	    });
	    _redefineAll(C.prototype, {
	      // 23.1.3.1 Map.prototype.clear()
	      // 23.2.3.2 Set.prototype.clear()
	      clear: function clear() {
	        for (var that = _validateCollection(this, NAME), data = that._i, entry = that._f; entry; entry = entry.n) {
	          entry.r = true;
	          if (entry.p) entry.p = entry.p.n = undefined;
	          delete data[entry.i];
	        }

	        that._f = that._l = undefined;
	        that[SIZE] = 0;
	      },
	      // 23.1.3.3 Map.prototype.delete(key)
	      // 23.2.3.4 Set.prototype.delete(value)
	      'delete': function (key) {
	        var that = _validateCollection(this, NAME);
	        var entry = getEntry(that, key);

	        if (entry) {
	          var next = entry.n;
	          var prev = entry.p;
	          delete that._i[entry.i];
	          entry.r = true;
	          if (prev) prev.n = next;
	          if (next) next.p = prev;
	          if (that._f == entry) that._f = next;
	          if (that._l == entry) that._l = prev;
	          that[SIZE]--;
	        }

	        return !!entry;
	      },
	      // 23.2.3.6 Set.prototype.forEach(callbackfn, thisArg = undefined)
	      // 23.1.3.5 Map.prototype.forEach(callbackfn, thisArg = undefined)
	      forEach: function forEach(callbackfn
	      /* , that = undefined */
	      ) {
	        _validateCollection(this, NAME);
	        var f = _ctx(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3);
	        var entry;

	        while (entry = entry ? entry.n : this._f) {
	          f(entry.v, entry.k, this); // revert to the last existing entry

	          while (entry && entry.r) entry = entry.p;
	        }
	      },
	      // 23.1.3.7 Map.prototype.has(key)
	      // 23.2.3.7 Set.prototype.has(value)
	      has: function has(key) {
	        return !!getEntry(_validateCollection(this, NAME), key);
	      }
	    });
	    if (_descriptors) dP$2(C.prototype, 'size', {
	      get: function () {
	        return _validateCollection(this, NAME)[SIZE];
	      }
	    });
	    return C;
	  },
	  def: function (that, key, value) {
	    var entry = getEntry(that, key);
	    var prev, index; // change existing entry

	    if (entry) {
	      entry.v = value; // create new entry
	    } else {
	      that._l = entry = {
	        i: index = fastKey(key, true),
	        // <- index
	        k: key,
	        // <- key
	        v: value,
	        // <- value
	        p: prev = that._l,
	        // <- previous entry
	        n: undefined,
	        // <- next entry
	        r: false // <- removed

	      };
	      if (!that._f) that._f = entry;
	      if (prev) prev.n = entry;
	      that[SIZE]++; // add to index

	      if (index !== 'F') that._i[index] = entry;
	    }

	    return that;
	  },
	  getEntry: getEntry,
	  setStrong: function (C, NAME, IS_MAP) {
	    // add .keys, .values, .entries, [@@iterator]
	    // 23.1.3.4, 23.1.3.8, 23.1.3.11, 23.1.3.12, 23.2.3.5, 23.2.3.8, 23.2.3.10, 23.2.3.11
	    _iterDefine(C, NAME, function (iterated, kind) {
	      this._t = _validateCollection(iterated, NAME); // target

	      this._k = kind; // kind

	      this._l = undefined; // previous
	    }, function () {
	      var that = this;
	      var kind = that._k;
	      var entry = that._l; // revert to the last existing entry

	      while (entry && entry.r) entry = entry.p; // get next entry


	      if (!that._t || !(that._l = entry = entry ? entry.n : that._t._f)) {
	        // or finish the iteration
	        that._t = undefined;
	        return _iterStep(1);
	      } // return step by kind


	      if (kind == 'keys') return _iterStep(0, entry.k);
	      if (kind == 'values') return _iterStep(0, entry.v);
	      return _iterStep(0, [entry.k, entry.v]);
	    }, IS_MAP ? 'entries' : 'values', !IS_MAP, true); // add [@@species], 23.1.2.2, 23.2.2.2

	    _setSpecies(NAME);
	  }
	};

	var SPECIES$1 = _wks('species');

	var _arraySpeciesConstructor = function (original) {
	  var C;

	  if (_isArray(original)) {
	    C = original.constructor; // cross-realm fallback

	    if (typeof C == 'function' && (C === Array || _isArray(C.prototype))) C = undefined;

	    if (_isObject(C)) {
	      C = C[SPECIES$1];
	      if (C === null) C = undefined;
	    }
	  }

	  return C === undefined ? Array : C;
	};

	var _arraySpeciesCreate = function (original, length) {
	  return new (_arraySpeciesConstructor(original))(length);
	};

	// 1 -> Array#map
	// 2 -> Array#filter
	// 3 -> Array#some
	// 4 -> Array#every
	// 5 -> Array#find
	// 6 -> Array#findIndex

	var _arrayMethods = function (TYPE, $create) {
	  var IS_MAP = TYPE == 1;
	  var IS_FILTER = TYPE == 2;
	  var IS_SOME = TYPE == 3;
	  var IS_EVERY = TYPE == 4;
	  var IS_FIND_INDEX = TYPE == 6;
	  var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
	  var create = $create || _arraySpeciesCreate;
	  return function ($this, callbackfn, that) {
	    var O = _toObject($this);
	    var self = _iobject(O);
	    var f = _ctx(callbackfn, that, 3);
	    var length = _toLength(self.length);
	    var index = 0;
	    var result = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined;
	    var val, res;

	    for (; length > index; index++) if (NO_HOLES || index in self) {
	      val = self[index];
	      res = f(val, index, O);

	      if (TYPE) {
	        if (IS_MAP) result[index] = res; // map
	        else if (res) switch (TYPE) {
	            case 3:
	              return true;
	            // some

	            case 5:
	              return val;
	            // find

	            case 6:
	              return index;
	            // findIndex

	            case 2:
	              result.push(val);
	            // filter
	          } else if (IS_EVERY) return false; // every
	      }
	    }

	    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : result;
	  };
	};

	var dP$3 = _objectDp.f;
	var each = _arrayMethods(0);

	var _collection = function (NAME, wrapper, methods, common, IS_MAP, IS_WEAK) {
	  var Base = _global[NAME];
	  var C = Base;
	  var ADDER = IS_MAP ? 'set' : 'add';
	  var proto = C && C.prototype;
	  var O = {};

	  if (!_descriptors || typeof C != 'function' || !(IS_WEAK || proto.forEach && !_fails(function () {
	    new C().entries().next();
	  }))) {
	    // create collection constructor
	    C = common.getConstructor(wrapper, NAME, IS_MAP, ADDER);
	    _redefineAll(C.prototype, methods);
	    _meta.NEED = true;
	  } else {
	    C = wrapper(function (target, iterable) {
	      _anInstance(target, C, NAME, '_c');
	      target._c = new Base();
	      if (iterable != undefined) _forOf(iterable, IS_MAP, target[ADDER], target);
	    });
	    each('add,clear,delete,forEach,get,has,set,keys,values,entries,toJSON'.split(','), function (KEY) {
	      var IS_ADDER = KEY == 'add' || KEY == 'set';
	      if (KEY in proto && !(IS_WEAK && KEY == 'clear')) _hide(C.prototype, KEY, function (a, b) {
	        _anInstance(this, C, KEY);
	        if (!IS_ADDER && IS_WEAK && !_isObject(a)) return KEY == 'get' ? undefined : false;

	        var result = this._c[KEY](a === 0 ? 0 : a, b);

	        return IS_ADDER ? this : result;
	      });
	    });
	    IS_WEAK || dP$3(C.prototype, 'size', {
	      get: function () {
	        return this._c.size;
	      }
	    });
	  }

	  _setToStringTag(C, NAME);
	  O[NAME] = C;
	  _export(_export.G + _export.W + _export.F, O);
	  if (!IS_WEAK) common.setStrong(C, NAME, IS_MAP);
	  return C;
	};

	var SET = 'Set'; // 23.2 Set Objects

	var es6_set = _collection(SET, function (get) {
	  return function Set() {
	    return get(this, arguments.length > 0 ? arguments[0] : undefined);
	  };
	}, {
	  // 23.2.3.1 Set.prototype.add(value)
	  add: function add(value) {
	    return _collectionStrong.def(_validateCollection(this, SET), value = value === 0 ? 0 : value, value);
	  }
	}, _collectionStrong);

	var _arrayFromIterable = function (iter, ITERATOR) {
	  var result = [];
	  _forOf(iter, false, result.push, result, ITERATOR);
	  return result;
	};

	var _collectionToJson = function (NAME) {
	  return function toJSON() {
	    if (_classof(this) != NAME) throw TypeError(NAME + "#toJSON isn't generic");
	    return _arrayFromIterable(this);
	  };
	};

	_export(_export.P + _export.R, 'Set', {
	  toJSON: _collectionToJson('Set')
	});

	var _setCollectionOf = function (COLLECTION) {
	  _export(_export.S, COLLECTION, {
	    of: function of() {
	      var length = arguments.length;
	      var A = new Array(length);

	      while (length--) A[length] = arguments[length];

	      return new this(A);
	    }
	  });
	};

	_setCollectionOf('Set');

	var _setCollectionFrom = function (COLLECTION) {
	  _export(_export.S, COLLECTION, {
	    from: function from(source
	    /* , mapFn, thisArg */
	    ) {
	      var mapFn = arguments[1];
	      var mapping, A, n, cb;
	      _aFunction(this);
	      mapping = mapFn !== undefined;
	      if (mapping) _aFunction(mapFn);
	      if (source == undefined) return new this();
	      A = [];

	      if (mapping) {
	        n = 0;
	        cb = _ctx(mapFn, arguments[2], 2);
	        _forOf(source, false, function (nextItem) {
	          A.push(cb(nextItem, n++));
	        });
	      } else {
	        _forOf(source, false, A.push, A);
	      }

	      return new this(A);
	    }
	  });
	};

	_setCollectionFrom('Set');

	var set = _core.Set;

	var set$1 = set;

	function _arrayWithoutHoles(arr) {
	  if (isArray$1(arr)) {
	    for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) {
	      arr2[i] = arr[i];
	    }

	    return arr2;
	  }
	}

	var arrayWithoutHoles = _arrayWithoutHoles;

	var ITERATOR$4 = _wks('iterator');

	var core_isIterable = _core.isIterable = function (it) {
	  var O = Object(it);
	  return O[ITERATOR$4] !== undefined || '@@iterator' in O // eslint-disable-next-line no-prototype-builtins
	  || _iterators.hasOwnProperty(_classof(O));
	};

	var isIterable = core_isIterable;

	var isIterable$1 = isIterable;

	function _iterableToArray(iter) {
	  if (isIterable$1(Object(iter)) || Object.prototype.toString.call(iter) === "[object Arguments]") return from_1$1(iter);
	}

	var iterableToArray = _iterableToArray;

	function _nonIterableSpread() {
	  throw new TypeError("Invalid attempt to spread non-iterable instance");
	}

	var nonIterableSpread = _nonIterableSpread;

	function _toConsumableArray(arr) {
	  return arrayWithoutHoles(arr) || iterableToArray(arr) || nonIterableSpread();
	}

	var toConsumableArray = _toConsumableArray;

	/**
	 * 获取数组的最后一个值
	 * @function lastItem
	 * @param {array} arr - 源数组
	 * @return {*}
	 * @example
	 * let value = U.lastItem([1, 1, 2, 3])
	 * // => 3
	 *
	 * let value = U.lastItem([])
	 * // => undefined
	 */

	var lastItem = function lastItem(arr) {
	  return arr[arr.length - 1];
	};
	/**
	 * 数组去重，返回无重复值的新数组。
	 * @function uniqueItems
	 * @param {array} arr - 需要去重的源数组
	 * @return {array}
	 * @example
	 * let arr = [1, 1, 2, 3, 3, 4, 5]
	 * arr = U.uniqueItems(arr)
	 * // => [1, 2, 3, 4, 5]
	 */

	var uniqueItems = function uniqueItems(arr) {
	  return toConsumableArray(new set$1(arr));
	};
	/**
	 * 根据提供的比较器函数返回数组的所有唯一值。
	 * @function uniqueItemsBy
	 * @param {array} arr - 数组
	 * @param {function} fn - 比较器函数
	 * @param {*} fn.a - 比较元素
	 * @param {*} fn.b - 比较元素
	 * @param {boolean} [isRight=false] - 可选，默认false，是否从数组最后一个元素开始比较
	 * @return {array}
	 * @example
	 * U.uniqueItemsBy([
	 *  { id: 0, value: 'a' },
	 *  { id: 1, value: 'b' },
	 *  { id: 2, value: 'c' },
	 *  { id: 0, value: 'd' }
	 * ],
	 * (a, b) => a.id == b.id)
	 * // => [{ id: 0, value: 'a' }, { id: 1, value: 'b' }, { id: 2, value: 'c' }]
	 * 
	 * U.uniqueItemsBy([
	 *  { id: 0, value: 'a' },
	 *  { id: 1, value: 'b' },
	 *  { id: 2, value: 'c' },
	 *  { id: 0, value: 'd' }
	 * ],
	 * (a, b) => a.id == b.id,
	 * true)
	 * // => [{ id: 0, value: 'd' }, { id: 2, value: 'c' }, { id: 1, value: 'b' }]
	 */

	var uniqueItemsBy = function uniqueItemsBy(arr, fn, isRight) {
	  return arr[isRight ? 'reduceRight' : 'reduce'](function (acc, x) {
	    if (!acc.some(function (y) {
	      return fn(x, y);
	    })) acc.push(x);
	    return acc;
	  }, []);
	};
	/**
	 * 检索数组重复元素，返回新数组。
	 * @function repeatItems
	 * @param {array} arr - 数组
	 * @return {array}
	 * @example
	 * U.repeatItems([1, 1, 2, 3, 3, 4, 5])
	 * // => [1, 3]
	 */

	var repeatItems = function repeatItems(arr) {
	  return arr.filter(function (item, i) {
	    return arr.indexOf(item) === i && arr.indexOf(item) !== arr.lastIndexOf(item);
	  });
	};
	/**
	 * 初始化一个给定长度以及值的数组。当映射是一个函数时提供迭代的i和数组长度len两个参数。
	 * @function initArray
	 * @param {number} len - 数组长度
	 * @param {*|function} [val|fn=null] - 可选，数组元素的映射值，默认为null；当映射是一个函数时，该函数参数如下表：
	 * @param {number} fn.index - 可选，数组中正在处理的当前元素的索引
	 * @param {number} fn.length - 可选，数组的长度
	 * @return {array}
	 * @example
	 * console.log(U.initArray(3))
	 * // => [null, null, null]
	 *
	 * const arr = U.initArray(3, {a: 1, b: 2})
	 * // => [ { a: 1, b: 2 }, { a: 1, b: 2 }, { a: 1, b: 2 } ]
	 *
	 * const arr = U.initArray(3, (i) => i * 2)
	 * // => [ 0, 2, 4 ]
	 */

	var initArray = function initArray(len) {
	  var val = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
	  return isFunction(val) ? from_1$1({
	    length: len
	  }, function (item, i) {
	    return val(i, len);
	  }) : from_1$1({
	    length: len
	  }).fill(val);
	};
	/**
	 * 使用函数将数组的值映射到对象，其中键 - 值对由数组原始值作为键和映射值组成。
	 * @function mapObject
	 * @param {array} arr - 对象键名的数组
	 * @param {function(currentValue, index, array)} fn - 生成对象值的映射函数
	 * @param {*} fn.currentValue - 数组中正在处理的当前元素
	 * @param {number} fn.index - 可选，数组中正在处理的当前元素的索引
	 * @param {array} fn.array - 可选，当前正在处理的数组
	 * @return {object}
	 * @example
	 * const obj = U.mapObject([1, 2, 3], i => i * 2)
	 * // => {1: 2, 2: 4, 3: 6}
	 */

	var mapObject = function mapObject(arr, fn) {
	  arr = [arr, arr.map(fn)];
	  return arr[0].reduce(function (acc, val, i) {
	    acc[val] = arr[1][i];
	    return acc;
	  }, {});
	};
	/**
	 * 求数组内元素特定键或键映射的平均值
	 * @function averageBy
	 * @param {array} arr - 求值数组
	 * @param {function|string} fn - 键值运算映射函数或键名
	 * @return {number}
	 * @example
	 * const arr = [{a: 1, b: 2}, {a: 2, b: 4}]
	 * 
	 * U.averageBy(arr, 'a')
	 * // => 1.5
	 * 
	 * U.averageBy(arr, o => o.a * o.b)
	 * // => 5
	 */

	var averageBy = function averageBy(arr, fn) {
	  return arr.map(isFunction(fn) ? fn : function (val) {
	    return val[fn];
	  }).reduce(function (acc, v) {
	    return acc + v;
	  }, 0) / arr.length;
	};
	/**
	 * 求数组内元素特定键或键映射的最大值
	 * @function maxBy
	 * @param {array} arr - 求值数组
	 * @param {function|string} fn - 键值运算映射函数或键名
	 * @return {number}
	 * @example
	 * const arr = [{a: 1, b: 2}, {a: 2, b: 4}]
	 * 
	 * U.max(arr, 'a')
	 * // => 2
	 * 
	 * U.maxBy(arr, o => o.a * o.b)
	 * // => 8
	 */

	var maxBy = function maxBy(arr, fn) {
	  return Math.max.apply(Math, toConsumableArray(arr.map(isFunction(fn) ? fn : function (v) {
	    return v[fn];
	  })));
	};
	/**
	 * 求数组内元素特定键或键映射的最小值
	 * @function minBy
	 * @param {array} arr - 求值数组
	 * @param {function|string} fn - 键值运算映射函数或键名
	 * @return {number}
	 * @example
	 * const arr = [{a: 1, b: 2}, {a: 2, b: 4}]
	 * 
	 * U.minBy(arr, 'a')
	 * // => 1
	 * 
	 * U.minBy(arr, o => o.a * o.b)
	 * // => 2
	 */

	var minBy = function minBy(arr, fn) {
	  return Math.min.apply(Math, toConsumableArray(arr.map(isFunction(fn) ? fn : function (v) {
	    return v[fn];
	  })));
	};
	/**
	 * 将数组切割分组函数
	 * @function chunk
	 * @param {array} arr - 切割的数组
	 * @param {number} size - 切割数组的长度
	 * @return {array}
	 * @example
	 * chunk([1, 2, 3, 4, 5], 2)
	 * => [[1,2],[3,4],[5]]
	 */

	var chunk = function chunk(arr, size) {
	  return from_1$1({
	    length: Math.ceil(arr.length / size)
	  }, function (v, i) {
	    return arr.slice(i * size, i * size + size);
	  });
	};

	var meta = _meta.onFreeze;
	_objectSap('freeze', function ($freeze) {
	  return function freeze(it) {
	    return $freeze && _isObject(it) ? $freeze(meta(it)) : it;
	  };
	});

	var freeze = _core.Object.freeze;

	var freeze$1 = freeze;

	var $assign = Object.assign; // should work with symbols and should have deterministic property order (V8 bug)

	var _objectAssign = !$assign || _fails(function () {
	  var A = {};
	  var B = {}; // eslint-disable-next-line no-undef

	  var S = Symbol();
	  var K = 'abcdefghijklmnopqrst';
	  A[S] = 7;
	  K.split('').forEach(function (k) {
	    B[k] = k;
	  });
	  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
	}) ? function assign(target, source) {
	  // eslint-disable-line no-unused-vars
	  var T = _toObject(target);
	  var aLen = arguments.length;
	  var index = 1;
	  var getSymbols = _objectGops.f;
	  var isEnum = _objectPie.f;

	  while (aLen > index) {
	    var S = _iobject(arguments[index++]);
	    var keys = getSymbols ? _objectKeys(S).concat(getSymbols(S)) : _objectKeys(S);
	    var length = keys.length;
	    var j = 0;
	    var key;

	    while (length > j) {
	      key = keys[j++];
	      if (!_descriptors || isEnum.call(S, key)) T[key] = S[key];
	    }
	  }

	  return T;
	} : $assign;

	_export(_export.S + _export.F, 'Object', {
	  assign: _objectAssign
	});

	var assign = _core.Object.assign;

	var assign$1 = assign;

	function ownKeys(object, enumerableOnly) { var keys = keys$1(object); if (getOwnPropertySymbols$1) { keys.push.apply(keys, getOwnPropertySymbols$1(object)); } if (enumerableOnly) keys = keys.filter(function (sym) { return getOwnPropertyDescriptor$1(object, sym).enumerable; }); return keys; }

	function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { defineProperty$3(target, key, source[key]); }); } else if (getOwnPropertyDescriptors$1) { defineProperties$1(target, getOwnPropertyDescriptors$1(source)); } else { ownKeys(source).forEach(function (key) { defineProperty$1(target, key, getOwnPropertyDescriptor$1(source, key)); }); } } return target; }
	/**
	 * 对象深复制函数
	 * @function deepClone
	 * @param {object} obj - 深复制的源对象
	 * @return {object}
	 * @example
	 * var a = { foo: 'bar', obj: { a: 1, b: 2 } }
	 * var b = U.deepClone(a)
	 * b.foo = 'foo'
	 * // => a = { foo: 'bar', obj: { a: 1, b: 2 } }, b = { foo: 'foo', obj: { a: 1, b: 2 } }
	 */

	var deepClone = function deepClone(obj) {
	  var clone = assign$1({}, obj);

	  keys$1(clone).forEach(function (k) {
	    clone[k] = isObject(obj[k]) ? deepClone(obj[k]) : obj[k];
	  });

	  return isArray$1(obj) ? (clone.length = obj.length) && from_1$1(clone) : clone;
	};
	/**
	 * 对象深冻结函数
	 * @function deepFreeze
	 * @param {object} obj - 深冻结的源对象
	 * @return {object}
	 * @example
	 * let arr = [1, [2, 3]]
	 * const o = U.deepFreeze(arr)
	 * o[0] = 3
	 * o[1][0] = 4
	 * // => arr = [1, [2, 3]], o = [1, [2, 3]]
	 */

	var deepFreeze = function deepFreeze(obj) {
	  keys$1(obj).forEach(function (prop) {
	    if (obj[prop] instanceof Object && obj[prop] !== null) {
	      deepFreeze(obj[prop]);
	    }
	  });

	  return freeze$1(obj);
	};
	/**
	 * 重命名对象的key名称。
	 * @function renameKeys
	 * @param {object} map - 由oldKey：newKey键值对组成的对象
	 * @param {object} obj - 目标对象
	 * @return {object}
	 * @example
	 * let obj = {name: 'john', job: 'fonts', detail: [1, 2]}
	 * U.renameKeys({job: 'possion'}, obj)
	 * // => { name: 'john', possion: 'fonts', detail: [ 1, 2 ] }
	 */

	var renameKeys = function renameKeys(map, obj) {
	  return keys$1(obj).reduce(function (acc, key) {
	    return _objectSpread({}, acc, {}, defineProperty$3({}, map[key] || key, obj[key]));
	  }, {});
	};
	/**
	 * 从对象中省略与给定键对应的键值对。
	 * @function omit
	 * @param {object} obj - 目标对象
	 * @param {array} arr - 省略的键名数组
	 * @return {object}
	 * @example
	 * U.omit({ a: 1, b: '2', c: 3 }, ['b'])
	 * // => { a: 1, c: 3 }
	 */

	var omit = function omit(obj, arr) {
	  return keys$1(obj).filter(function (k) {
	    return !arr.includes(k);
	  }).reduce(function (acc, key) {
	    return acc[key] = obj[key], acc;
	  }, {});
	};
	/**
	 * 判断val是否是空对象。
	 * @function isEmpty
	 * @param {*} val - 检查的对象
	 * @return {boolean}
	 * @example
	 * U.isEmpty(new Map()) // => true
	 * U.isEmpty(new Set()) // => true
	 * U.isEmpty({}) // => true
	 * U.isEmpty([]) // => true
	 * U.isEmpty('') // => true
	 * U.isEmpty({a: 1}) // => false
	 * U.isEmpty([2]) // => false
	 * U.isEmpty('text') // => false
	 * U.isEmpty(123) // => true
	 * U.isEmpty(true) // => true
	 * U.isEmpty(false) // => true
	 */

	var isEmpty = function isEmpty(val) {
	  return !(keys$1(val) || val).length;
	};
	/**
	 * 根据obj对象的path路径获取值。
	 * @function get
	 * @param {object} obj - 要检索的对象
	 * @param {string} path - 要获取属性的路径
	 * @return {*}
	 * @example
	 * const obj = {name: 'joe', child: [{name: 'john', child: null}]}
	 * U.get(obj, 'child[0].name')
	 * // => 'john'
	 */

	var get = function get(obj, path) {
	  return new Function('obj', 'return obj.' + path)(obj);
	};

	// fast apply, http://jsperf.lnkit.com/fast-apply/5
	var _invoke = function (fn, args, that) {
	  var un = that === undefined;

	  switch (args.length) {
	    case 0:
	      return un ? fn() : fn.call(that);

	    case 1:
	      return un ? fn(args[0]) : fn.call(that, args[0]);

	    case 2:
	      return un ? fn(args[0], args[1]) : fn.call(that, args[0], args[1]);

	    case 3:
	      return un ? fn(args[0], args[1], args[2]) : fn.call(that, args[0], args[1], args[2]);

	    case 4:
	      return un ? fn(args[0], args[1], args[2], args[3]) : fn.call(that, args[0], args[1], args[2], args[3]);
	  }

	  return fn.apply(that, args);
	};

	var arraySlice = [].slice;
	var factories = {};

	var construct = function (F, len, args) {
	  if (!(len in factories)) {
	    for (var n = [], i = 0; i < len; i++) n[i] = 'a[' + i + ']'; // eslint-disable-next-line no-new-func


	    factories[len] = Function('F,a', 'return new F(' + n.join(',') + ')');
	  }

	  return factories[len](F, args);
	};

	var _bind = Function.bind || function bind(that
	/* , ...args */
	) {
	  var fn = _aFunction(this);
	  var partArgs = arraySlice.call(arguments, 1);

	  var bound = function ()
	  /* args... */
	  {
	    var args = partArgs.concat(arraySlice.call(arguments));
	    return this instanceof bound ? construct(fn, args.length, args) : _invoke(fn, args, that);
	  };

	  if (_isObject(fn.prototype)) bound.prototype = fn.prototype;
	  return bound;
	};

	var rConstruct = (_global.Reflect || {}).construct; // MS Edge supports only 2 arguments and argumentsList argument is optional
	// FF Nightly sets third argument as `new.target`, but does not create `this` from it

	var NEW_TARGET_BUG = _fails(function () {
	  function F() {
	    /* empty */
	  }

	  return !(rConstruct(function () {
	    /* empty */
	  }, [], F) instanceof F);
	});
	var ARGS_BUG = !_fails(function () {
	  rConstruct(function () {
	    /* empty */
	  });
	});
	_export(_export.S + _export.F * (NEW_TARGET_BUG || ARGS_BUG), 'Reflect', {
	  construct: function construct(Target, args
	  /* , newTarget */
	  ) {
	    _aFunction(Target);
	    _anObject(args);
	    var newTarget = arguments.length < 3 ? Target : _aFunction(arguments[2]);
	    if (ARGS_BUG && !NEW_TARGET_BUG) return rConstruct(Target, args, newTarget);

	    if (Target == newTarget) {
	      // w/o altered newTarget, optimization for 0-4 arguments
	      switch (args.length) {
	        case 0:
	          return new Target();

	        case 1:
	          return new Target(args[0]);

	        case 2:
	          return new Target(args[0], args[1]);

	        case 3:
	          return new Target(args[0], args[1], args[2]);

	        case 4:
	          return new Target(args[0], args[1], args[2], args[3]);
	      } // w/o altered newTarget, lot of arguments case


	      var $args = [null];
	      $args.push.apply($args, args);
	      return new (_bind.apply(Target, $args))();
	    } // with altered newTarget, not support built-in constructors


	    var proto = newTarget.prototype;
	    var instance = _objectCreate(_isObject(proto) ? proto : Object.prototype);
	    var result = Function.apply.call(Target, instance, args);
	    return _isObject(result) ? result : instance;
	  }
	});

	var construct$1 = _core.Reflect.construct;

	var construct$2 = construct$1;

	/* eslint-disable no-proto */

	var check = function (O, proto) {
	  _anObject(O);
	  if (!_isObject(proto) && proto !== null) throw TypeError(proto + ": can't set as prototype!");
	};

	var _setProto = {
	  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
	  function (test, buggy, set) {
	    try {
	      set = _ctx(Function.call, _objectGopd.f(Object.prototype, '__proto__').set, 2);
	      set(test, []);
	      buggy = !(test instanceof Array);
	    } catch (e) {
	      buggy = true;
	    }

	    return function setPrototypeOf(O, proto) {
	      check(O, proto);
	      if (buggy) O.__proto__ = proto;else set(O, proto);
	      return O;
	    };
	  }({}, false) : undefined),
	  check: check
	};

	_export(_export.S, 'Object', {
	  setPrototypeOf: _setProto.set
	});

	var setPrototypeOf = _core.Object.setPrototypeOf;

	var setPrototypeOf$1 = setPrototypeOf;

	var setPrototypeOf$2 = createCommonjsModule(function (module) {
	  function _setPrototypeOf(o, p) {
	    module.exports = _setPrototypeOf = setPrototypeOf$1 || function _setPrototypeOf(o, p) {
	      o.__proto__ = p;
	      return o;
	    };

	    return _setPrototypeOf(o, p);
	  }

	  module.exports = _setPrototypeOf;
	});

	var construct$3 = createCommonjsModule(function (module) {
	  function isNativeReflectConstruct() {
	    if (typeof Reflect === "undefined" || !construct$2) return false;
	    if (construct$2.sham) return false;
	    if (typeof Proxy === "function") return true;

	    try {
	      Date.prototype.toString.call(construct$2(Date, [], function () {}));
	      return true;
	    } catch (e) {
	      return false;
	    }
	  }

	  function _construct(Parent, args, Class) {
	    if (isNativeReflectConstruct()) {
	      module.exports = _construct = construct$2;
	    } else {
	      module.exports = _construct = function _construct(Parent, args, Class) {
	        var a = [null];
	        a.push.apply(a, args);
	        var Constructor = Function.bind.apply(Parent, a);
	        var instance = new Constructor();
	        if (Class) setPrototypeOf$2(instance, Class.prototype);
	        return instance;
	      };
	    }

	    return _construct.apply(null, arguments);
	  }

	  module.exports = _construct;
	});

	var _stringWs = '\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003' + '\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';

	var space = '[' + _stringWs + ']';
	var non = '\u200b\u0085';
	var ltrim = RegExp('^' + space + space + '*');
	var rtrim = RegExp(space + space + '*$');

	var exporter = function (KEY, exec, ALIAS) {
	  var exp = {};
	  var FORCE = _fails(function () {
	    return !!_stringWs[KEY]() || non[KEY]() != non;
	  });
	  var fn = exp[KEY] = FORCE ? exec(trim) : _stringWs[KEY];
	  if (ALIAS) exp[ALIAS] = fn;
	  _export(_export.P + _export.F * FORCE, 'String', exp);
	}; // 1 -> String#trimLeft
	// 2 -> String#trimRight
	// 3 -> String#trim


	var trim = exporter.trim = function (string, TYPE) {
	  string = String(_defined(string));
	  if (TYPE & 1) string = string.replace(ltrim, '');
	  if (TYPE & 2) string = string.replace(rtrim, '');
	  return string;
	};

	var _stringTrim = exporter;

	var $parseInt = _global.parseInt;
	var $trim = _stringTrim.trim;
	var hex = /^[-+]?0[xX]/;

	var _parseInt = $parseInt(_stringWs + '08') !== 8 || $parseInt(_stringWs + '0x16') !== 22 ? function parseInt(str, radix) {
	  var string = $trim(String(str), 3);
	  return $parseInt(string, radix >>> 0 || (hex.test(string) ? 16 : 10));
	} : $parseInt;

	_export(_export.G + _export.F * (parseInt != _parseInt), {
	  parseInt: _parseInt
	});

	var _parseInt$1 = _core.parseInt;

	var _parseInt$2 = _parseInt$1;

	/**
	 * 获取字符串的字节长度
	 * @function byteSize
	 * @param {string} str - 字符串
	 * @return {number}
	 * @example
	 * U.byteSize('日')
	 * // => 3
	 *
	 * U.byteSize('12')
	 * // => 2
	 *
	 * U.byteSize('hello')
	 * // => 5
	 */

	var byteSize = function byteSize(str) {
	  return new Blob([str]).size;
	};
	/**
	 * 反转字符串
	 * @function reverseString
	 * @param {string} str - 字符串
	 * @return {str}
	 * @example
	 * U.reverseString('hello!')
	 * // => '!olleh'
	 */

	var reverseString = function reverseString(str) {
	  return toConsumableArray(str).reverse().join('');
	};
	/**
	 * 向URL追加参数
	 * @function stringifyURL
	 * @param {string} url - URL路径
	 * @param {object} params - 参数对象
	 * @return {string}
	 * @example
	 * U.stringifyURL('https://www.google.com/', {name: 'john', age: 30})
	 * // => 'https://www.google.com/?name=john&age=30'
	 */

	var stringifyURL = function stringifyURL(url, params) {
	  url += /\?/.test(url) ? '&' : '?';
	  return url += keys$1(params).map(function (key) {
	    return "".concat(key, "=").concat(params[key]);
	  }).join('&');
	};
	/**
	 * 解析URL参数
	 * @function parseURL
	 * @param {string} url - 字符串
	 * @return {object}
	 * @example
	 * U.parseURL('http://url.com/page?name=Adam&surname=Smith')
	 * // => {name: 'Adam', surname: 'Smith'}
	 *
	 * U.parseURL('https://www.google.com/')
	 * // => {}
	 */

	var parseURL = function parseURL(url) {
	  var arr = url.match(/([^?=&]+)(=([^&]*))/g) || [];
	  return arr.reduce(function (a, v) {
	    return a[v.slice(0, v.indexOf('='))] = v.slice(v.indexOf('=') + 1), a;
	  }, {});
	};
	/**
	 * 移除字符串中的HTML标签
	 * @function removeHTML
	 * @param {string} str - 字符串
	 * @return {string}
	 * @example
	 * const str = '<p>这是<em>一个</em>段落。</p>'
	 * U.removeHTML(str)
	 * // => '这是一个段落。'
	 */

	var removeHTML = function removeHTML(str) {
	  return str.replace(/<[^>]*>/g, '');
	};
	/**
	 * 转义特殊字符
	 * @function escapeHTML
	 * @param {string} str - 字符串
	 * @return {string}
	 * @example
	 * const str = '<a href="#">you & me</a>'
	 * U.escapeHTML(str)
	 * // => '&lt;a href=&quot;#&quot;&gt;you &amp; me&lt;/a&gt;'
	 */

	var escapeHTML = function escapeHTML(str) {
	  return str.replace(/[&<>"]/g, function (tag) {
	    return {
	      '&': '&amp;',
	      '<': '&lt;',
	      '>': '&gt;',
	      '"': '&quot;'
	    }[tag] || tag;
	  });
	};
	/**
	 * 反转义特殊字符
	 * @function unescapeHTML
	 * @param {string} str - 字符串
	 * @return {string}
	 * @example
	 * const str = '&lt;a href=&quot;#&quot;&gt;you &amp; me&lt;/a&gt;'
	 * U.unescapeHTML(str)
	 * // => '<a href="#">you & me</a>'
	 */

	var unescapeHTML = function unescapeHTML(str) {
	  return str.replace(/&amp;|&lt;|&gt;|&quot;/g, function (tag) {
	    return {
	      '&amp;': '&',
	      '&lt;': '<',
	      '&gt;': '>',
	      '&quot;': '"'
	    }[tag] || tag;
	  });
	};
	/**
	 * 使用指定的掩码字符替换start~end之间的所有字符
	 * @function mask
	 * @param {string|number} str - 字符串
	 * @param {number} [start=0] - 可选，开始位置，默认为0（即字符串开头）
	 * @param {number} [end=0] - 可选，结束位置，默认为0（即字符串结尾）
	 * @param {string} [mask='*'] - 可选，掩码字符，默认为'*'号
	 * @return {string}
	 * @example
	 * U.mask(123456789) // => *********
	 * U.mask(123456789, 3) // => 123******
	 * U.mask(str, 0, 4) // => *****6789
	 * U.mask(str, 3, 4) // => 123**6789
	 * U.mask(str, 3, 4, '&') // => 123&&6789
	 */

	var mask = function mask(str) {
	  var start = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
	  var end = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
	  var mask = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '*';
	  return toConsumableArray("".concat(str)).map(function (v, i) {
	    return i >= start && i < "".concat(str).length - end ? mask : v;
	  }).join('');
	};
	/**
	 * 随机生成16进制色值
	 * @function randomHex
	 * @return {string}
	 * @example
	 * U.randomHex()
	 * // => "#f13ba7"
	 */

	var randomHex = function randomHex() {
	  return '#' + (Math.random() * 0xfffff * 1000000).toString(16).slice(0, 6);
	};
	/**
	 * 随机生成rgba色值
	 * @function randomRgba
	 * @param {number} [min=0] - 可选，最小色阶
	 * @param {number} [max=256] - 可选，最大色阶
	 * @param {number} [alpha=1] - 可选，透明度
	 * @return {string}
	 * @example
	 * U.randomRgba()
	 * // => rgba(223,135,252,1)
	 * 
	 * U.randomRgba(154, 211, 0.5)
	 * // => rgba(191,178,179,0.5)
	 */

	var randomRgba = function randomRgba() {
	  var min = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
	  var max = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 256;
	  var alpha = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;

	  var color = from_1$1({
	    length: 3
	  }).reduce(function (acc) {
	    return [].concat(toConsumableArray(acc), [Math.floor(random(min, max))]);
	  }, []).concat(alpha ? [alpha] : [0]).join(',');

	  return "rgba(".concat(color, ")");
	};
	/**
	 * 将3位16进制色值转为6位
	 * @function extendHex
	 * @param {string} shortHex - 字符串
	 * @return {string}
	 * @example
	 * U.extendHex('#03f')
	 * // => '#0033ff'
	 * 
	 * U.extendHex('05a')
	 * // => '#0055aa'
	 */

	var extendHex = function extendHex(shortHex) {
	  return '#' + shortHex.slice(shortHex.startsWith('#') ? 1 : 0).split('').map(function (x) {
	    return x + x;
	  }).join('');
	};
	/**
	 * 将16进制hex色值转为rgb（或rgba）色值
	 * @function hexToRGB
	 * @param {string} hex - 字符串，16进制hex色值
	 * @param {number} alpha - 可选，色彩透明度
	 * @return {string}
	 * @example
	 * U.hexToRGB('#e5f')
	 * // => rgb(238,85,255)
	 * 
	 * U.hexToRGB('e5f')
	 * // => rgb(238,85,255)
	 * 
	 * U.hexToRGB('#e5f', 0.5)
	 * // => rgba(238,85,255,0.5)
	 */

	var hexToRGB = function hexToRGB(hex, alpha) {
	  var hasAlpha = !isUndefined(alpha);
	  var result = hex.slice(hex.startsWith('#') ? 1 : 0);
	  if (result.length === 3) result = toConsumableArray(result).map(function (s) {
	    return s + s;
	  }).join('');
	  result = result.match(/[0-9a-f]{2}/gi).map(function (s) {
	    return _parseInt$2(s, 16);
	  }).concat(hasAlpha ? [alpha] : []).join(',');
	  return "rgb".concat(hasAlpha ? 'a' : '', "(").concat(result, ")");
	};
	/**
	 * 将rgb（或rgba）色值转为16进制hex色值
	 * @function RGBToHex
	 * @param {string} rgb - 字符串，rgb（或rgba）色值
	 * @return {string}
	 * @example
	 * U.RGBToHex('rgb(238,85,255)')
	 * // => #ee55ff
	 * 
	 * U.RGBToHex('rgba(238,85,255,0.5)')
	 * // => #ee55ff
	 */

	var RGBToHex = function RGBToHex(rgb) {
	  return '#' + rgb.match(/\d{1,3}/g).slice(0, 3).map(function (s) {
	    return Number(s).toString(16).padStart(2, '0');
	  }).join('');
	};
	/**
	 * 解析cookie字符串
	 * @function parseCookie
	 * @param {string} str - 字符串
	 * @return {object}
	 * @example
	 * U.parseCookie('taken=bar; equation=E%3Dmc%5E2')
	 * // => {taken: 'bar', equation: 'E=mc^2'}
	 */

	var parseCookie = function parseCookie(str) {
	  return str.split(';').map(function (v) {
	    return v.split('=');
	  }).reduce(function (acc, v) {
	    acc[decodeURIComponent(v[0].trim())] = decodeURIComponent(v[1].trim());
	    return acc;
	  }, {});
	};
	/**
	 * 字符串转日期对象
	 * @function stringToDate
	 * @param {string} str - 字符串
	 * @return {date}
	 * @example
	 * U.stringToDate('2019/5-06').toString()
	 * // => Mon May 06 2019 00:00:00 GMT+0800 (中国标准时间)
	 * 
	 * U.stringToDate('2019-5-06 20:21:22:500').toString()
	 * // => Mon May 06 2019 20:21:22 GMT+0800 (中国标准时间)
	 */

	var stringToDate = function stringToDate(str) {
	  var defs = [0, 1, 1, 0, 0, 0];
	  var args = str.split(/[^0-9]+/).map(function (v, i) {
	    var val = Number(v) || defs[i];
	    return i === 1 ? val - 1 : val;
	  });
	  return construct$3(Date, toConsumableArray(args));
	};
	/**
	 * 驼峰字符串转横线连接字符串
	 * @function camelToDash
	 * @param {string} str - 驼峰字符串
	 * @return {string}
	 * @example 
	 * U.camelToDash('camelCase')
	 * => 'camel-case'
	 */

	var camelToDash = function camelToDash(str) {
	  return str.replace(/([A-Z])/g, "-$1").toLowerCase();
	};
	/**
	 * 横线连接字符串转驼峰字符串
	 * @function dashToCamel
	 * @param {string} str - 横线连接字符串
	 * @return {string}
	 * @example 
	 * U.camelToDash('dash-case')
	 * => 'dashCase'
	 */

	var dashToCamel = function dashToCamel(str) {
	  return str.replace(/\-(\w)/g, function (a, l) {
	    return l.toUpperCase();
	  });
	};



	var usually = /*#__PURE__*/Object.freeze({
		getType: getType,
		isNumber: isNumber,
		isString: isString,
		isNull: isNull,
		isUndefined: isUndefined,
		isBoolean: isBoolean,
		isSymbol: isSymbol$1,
		isFunction: isFunction,
		isArray: isArray$2,
		isObject: isObject,
		isInt: isInt,
		toThousands: toThousands,
		inRange: inRange,
		round: round,
		random: random,
		keepFixed: keepFixed,
		average: average,
		once: once,
		debounce: debounce,
		throttle: throttle,
		pipe: pipe,
		dateFormat: dateFormat,
		getMonthDays: getMonthDays,
		getWeekday: getWeekday,
		prevMonth: prevMonth,
		nextMonth: nextMonth,
		isAfterDate: isAfterDate,
		spreadDate: spreadDate,
		lastItem: lastItem,
		uniqueItems: uniqueItems,
		uniqueItemsBy: uniqueItemsBy,
		repeatItems: repeatItems,
		initArray: initArray,
		mapObject: mapObject,
		averageBy: averageBy,
		maxBy: maxBy,
		minBy: minBy,
		chunk: chunk,
		deepClone: deepClone,
		deepFreeze: deepFreeze,
		renameKeys: renameKeys,
		omit: omit,
		isEmpty: isEmpty,
		get: get,
		byteSize: byteSize,
		reverseString: reverseString,
		stringifyURL: stringifyURL,
		parseURL: parseURL,
		removeHTML: removeHTML,
		escapeHTML: escapeHTML,
		unescapeHTML: unescapeHTML,
		mask: mask,
		randomHex: randomHex,
		randomRgba: randomRgba,
		extendHex: extendHex,
		hexToRGB: hexToRGB,
		RGBToHex: RGBToHex,
		parseCookie: parseCookie,
		stringToDate: stringToDate,
		camelToDash: camelToDash,
		dashToCamel: dashToCamel
	});

	function ownKeys$1(object, enumerableOnly) { var keys = keys$1(object); if (getOwnPropertySymbols$1) { keys.push.apply(keys, getOwnPropertySymbols$1(object)); } if (enumerableOnly) keys = keys.filter(function (sym) { return getOwnPropertyDescriptor$1(object, sym).enumerable; }); return keys; }

	function _objectSpread$1(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$1(source, true).forEach(function (key) { defineProperty$3(target, key, source[key]); }); } else if (getOwnPropertyDescriptors$1) { defineProperties$1(target, getOwnPropertyDescriptors$1(source)); } else { ownKeys$1(source).forEach(function (key) { defineProperty$1(target, key, getOwnPropertyDescriptor$1(source, key)); }); } } return target; }
	var usually$1 = _objectSpread$1({
	  version: version
	}, usually);

	return usually$1;

})));
