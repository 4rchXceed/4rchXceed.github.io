"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhpCgiBase = void 0;
var _config = require("./config");
var _parseResponse = require("./parseResponse");
var _breakoutRequest = require("./breakoutRequest");
var _fsOps = require("./fsOps");
var _resolveDependencies3 = require("./resolveDependencies");
var _excluded = ["docroot", "prefix", "exclude", "rewrite", "entrypoint", "cookies", "types", "onRequest", "notFound", "sharedLibs", "actions", "files"];
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var s = Object.getOwnPropertySymbols(e); for (r = 0; r < s.length; r++) o = s[r], t.includes(o) || {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (e.includes(n)) continue; t[n] = r[n]; } return t; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
/**
 * An object representing a dynamically loaded data file.
 * @typedef {string|object} FileDef
 * @property {string} url
 * @property {string} path
 * @property {string} parent
 */

/**
 * A string or object representing a dynamically loaded shared library.
 * @typedef {string|object} LibDef
 * @property {string} name
 * @property {string} url
 * @property {boolean} ini
 * @property {function():libDef[]} getLibs
 * @property {function():fileDef[]} getFiles
 */

var STR = 'string';
var NUM = 'number';

//*/
var putEnv = function putEnv(php, key, value) {
  return php.ccall('wasm_sapi_cgi_putenv', 'number', ['string', 'string'], [key, value]);
};
/*/
const putEnv = (php, key, value) => {
	value = value ?? "";
	const len = php.lengthBytesUTF8(value) + 1;
	const loc = php._malloc(len);
	php.stringToUTF8(value, loc, len);

	const result = php.ccall(
		'wasm_sapi_cgi_putenv'
		, 'number'
		, ['string', 'number']
		, [key, loc]
	);

	php._free(loc);

	return result;
}
//*/

var requestTimes = new WeakMap();
var PhpCgiBase = exports.PhpCgiBase = /*#__PURE__*/function () {
  /**
   * Creates a new PHP instance (async)
   * @param {*} PHP
   * @param {string} options.prefix The URL path prefix to look for when routing to PHP.
   * @param {string} options.docroot The internal directory to use as the public document root.
   * @param {string[]} options.exclude Array of URL prefixes to exclude from routing to PHP.
   * @param {Array.<{pathPrefix: string, directory: string, entrypoint: string}>} options.vHosts A list of prefixes, directories and entrypoints to serve multiple PHP applications by URL prefix.
   * @param {string} options.entrypoint Path to PHP file under docroot to serve as an entrypoint
   * @param {function(string):string} options.rewrite Function to rewrite URLs
   * @param {object<string, string>} options.types Mapping of file extensions to mime types to populate the `Content-type` header.
   * @param {function()} options.onRequest Function to be executed on each request.
   * @param {function(Request):Response|string} options.notFound Function to handle 404s.
   * @param {LibDef[]} options.sharedLibs Dynamically load shared libraries with LibDefs
   * @param {FileDef[]} options.files Dynamically load files with FileDefs
   * @param {boolean} options.autoTransaction Automatically handle FS transactions on each request
   * @param {number} options.maxRequestAge Oldest request to process (ms)
   * @param {number} options.staticCacheTime Static cache time (ms)
   * @param {number} options.dynamicCacheTime Dynamic cache time (ms)
   * @param {object<string, string}>} options.env Mapping of environment variable names to values to set inside the server.
   */
  function PhpCgiBase(PHP) {
    var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      docroot = _ref.docroot,
      prefix = _ref.prefix,
      exclude = _ref.exclude,
      rewrite = _ref.rewrite,
      entrypoint = _ref.entrypoint,
      cookies = _ref.cookies,
      types = _ref.types,
      onRequest = _ref.onRequest,
      notFound = _ref.notFound,
      sharedLibs = _ref.sharedLibs,
      actions = _ref.actions,
      files = _ref.files,
      args = _objectWithoutProperties(_ref, _excluded);
    _classCallCheck(this, PhpCgiBase);
    _defineProperty(this, "docroot", null);
    _defineProperty(this, "prefix", '/php-wasm');
    _defineProperty(this, "exclude", []);
    _defineProperty(this, "rewrite", function (path) {
      return path;
    });
    _defineProperty(this, "cookies", null);
    _defineProperty(this, "types", {});
    _defineProperty(this, "onRequest", function () {});
    _defineProperty(this, "notFound", function () {});
    _defineProperty(this, "sharedLibs", []);
    _defineProperty(this, "files", []);
    _defineProperty(this, "phpArgs", {});
    _defineProperty(this, "maxRequestAge", 0);
    _defineProperty(this, "staticCacheTime", 60000);
    _defineProperty(this, "dynamicCacheTime", 0);
    _defineProperty(this, "vHosts", []);
    _defineProperty(this, "php", null);
    _defineProperty(this, "input", []);
    _defineProperty(this, "output", []);
    _defineProperty(this, "error", []);
    _defineProperty(this, "count", 0);
    _defineProperty(this, "queue", []);
    this.PHP = PHP;
    this.docroot = docroot || this.docroot;
    this.prefix = prefix || this.prefix;
    this.exclude = exclude || this.exclude;
    this.rewrite = rewrite || this.rewrite;
    this.entrypoint = entrypoint || this.entrypoint;
    this.cookies = cookies || new Map();
    this.types = types || this.types;
    this.onRequest = onRequest || this.onRequest;
    this.notFound = notFound || this.notFound;
    this.sharedLibs = sharedLibs || this.sharedLibs;
    this.files = files || this.files;
    this.extraActions = actions || {};
    this.phpArgs = args;
    this.autoTransaction = 'autoTransaction' in args ? args.autoTransaction : true;
    this.transactionStarted = false;
    this.maxRequestAge = args.maxRequestAge || this.maxRequestAge;
    this.staticCacheTime = args.staticCacheTime || this.staticCacheTime;
    this.dynamicCacheTime = args.dynamicCacheTime || this.dynamicCacheTime;
    this.vHosts = args.vHosts || [];
    this.env = {};
    Object.assign(this.env, args.env || {});
    this.refresh();
  }
  return _createClass(PhpCgiBase, [{
    key: "handleInstallEvent",
    value: function handleInstallEvent(event) {
      return event.waitUntil(self.skipWaiting());
    }
  }, {
    key: "handleActivateEvent",
    value: function handleActivateEvent(event) {
      return event.waitUntil(self.clients.claim());
    }
  }, {
    key: "handleMessageEvent",
    value: function () {
      var _handleMessageEvent = _asyncToGenerator(function* (event) {
        var data = event.data,
          source = event.source;
        var action = data.action,
          token = data.token,
          _data$params = data.params,
          params = _data$params === void 0 ? [] : _data$params;
        var actions = ['analyzePath', 'readdir', 'readFile', 'stat', 'mkdir', 'rmdir', 'writeFile', 'rename', 'unlink', 'putEnv', 'refresh', 'getSettings', 'setSettings', 'getEnvs', 'setEnvs', 'storeInit'];
        if (actions.includes(action)) {
          var result, error;
          try {
            result = yield this[action].apply(this, _toConsumableArray(params));
          } catch (_error) {
            error = JSON.parse(JSON.stringify(_error));
            console.warn(_error);
          } finally {
            source.postMessage({
              re: token,
              result: result,
              error: error
            });
          }
        } else if (action in this.extraActions) {
          var _result, _error2;
          try {
            var _this$extraActions;
            _result = yield (_this$extraActions = this.extraActions)[action].apply(_this$extraActions, [this].concat(_toConsumableArray(params)));
          } catch (_error) {
            _error2 = JSON.parse(JSON.stringify(_error));
            console.warn(_error);
          } finally {
            source.postMessage({
              re: token,
              result: _result,
              error: _error2
            });
          }
        }
      });
      function handleMessageEvent(_x) {
        return _handleMessageEvent.apply(this, arguments);
      }
      return handleMessageEvent;
    }()
  }, {
    key: "handleFetchEvent",
    value: function handleFetchEvent(event) {
      var url = new URL(event.request.url);
      var prefix = this.prefix;
      var _resolveDependencies = (0, _resolveDependencies3.resolveDependencies)(this.sharedLibs, this),
        files = _resolveDependencies.files,
        urlLibs = _resolveDependencies.urlLibs;
      var isWhitelisted = false;
      var isBlacklisted = false;
      if (globalThis.location) {
        var staticUrls = [self.location.pathname].concat(_toConsumableArray(files.map(function (file) {
          return file.url;
        })), _toConsumableArray(Object.values(urlLibs))).map(function (url) {
          return new URL(url, self.location.origin);
        }).filter(function (url) {
          return url.origin === self.location.origin;
        }).map(function (url) {
          return url.pathname;
        });
        isWhitelisted = url.pathname.substr(0, prefix.length) === prefix && url.hostname === self.location.hostname;
        isBlacklisted = url.pathname.match(/\.wasm$/i) || staticUrls.includes(url.pathname) || this.exclude.findIndex(function (exclude) {
          return url.pathname.substr(0, exclude.length) === exclude;
        }) > -1 || false;
      } else {
        isWhitelisted = url.pathname.substr(0, prefix.length) === prefix;
        isBlacklisted = url.pathname.match(/\.wasm$/i) || this.exclude.findIndex(function (exclude) {
          return url.pathname.substr(0, exclude.length) === exclude;
        }) > -1 || false;
      }
      if (isWhitelisted && !isBlacklisted) {
        requestTimes.set(event.request, Date.now());
        var response = this.request(event.request);
        return event.respondWith(response);
      }
    }
  }, {
    key: "_enqueue",
    value: function () {
      var _enqueue2 = _asyncToGenerator(function* (callback) {
        var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
        var readOnly = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
        var accept, reject;
        var coordinator = new Promise(function (a, r) {
          var _ref2;
          return _ref2 = [a, r], accept = _ref2[0], reject = _ref2[1], _ref2;
        });
        this.queue.push([callback, params, accept, reject]);
        if (!this.queue.length) {
          return;
        }
        while (this.queue.length) {
          var _this$queue$shift = this.queue.shift(),
            _this$queue$shift2 = _slicedToArray(_this$queue$shift, 4),
            _callback = _this$queue$shift2[0],
            _params = _this$queue$shift2[1],
            _accept = _this$queue$shift2[2],
            _reject = _this$queue$shift2[3];
          yield _callback.apply(void 0, _toConsumableArray(_params)).then(_accept)["catch"](_reject);
        }
        return coordinator;
      });
      function _enqueue(_x2) {
        return _enqueue2.apply(this, arguments);
      }
      return _enqueue;
    }()
  }, {
    key: "refresh",
    value: function refresh() {
      var _this = this;
      var _resolveDependencies2 = (0, _resolveDependencies3.resolveDependencies)(this.sharedLibs, this),
        files = _resolveDependencies2.files,
        libs = _resolveDependencies2.libs,
        urlLibs = _resolveDependencies2.urlLibs;
      var userLocateFile = this.phpArgs.locateFile || function () {
        return undefined;
      };
      var locateFile = function locateFile(path, directory) {
        var located = userLocateFile(path, directory);
        if (located !== undefined) {
          return located;
        }
        if (urlLibs[path]) {
          if (urlLibs[path].protocol === 'file:') {
            return urlLibs[path].pathname;
          }
          return String(urlLibs[path]);
        }
      };
      var phpArgs = _objectSpread(_objectSpread({
        persist: [{
          mountPath: '/persist'
        }, {
          mountPath: '/config'
        }]
      }, this.phpArgs), {}, {
        stdin: function stdin() {
          return _this.input ? String(_this.input.shift()).charCodeAt(0) : null;
        },
        stdout: function stdout(x) {
          return _this.output.push(x);
        },
        stderr: function stderr(x) {
          return _this.error.push(x);
        },
        locateFile: locateFile
      });
      return this.binary = new this.PHP(phpArgs).then(/*#__PURE__*/function () {
        var _ref3 = _asyncToGenerator(function* (php) {
          yield php.ccall('pib_storage_init', NUM, [], [], {
            async: true
          });
          if (!php.FS.analyzePath('/preload').exists) {
            php.FS.mkdir('/preload');
          }
          yield Promise.all(_this.files.concat(files).map(function (fileDef) {
            var _userLocateFile;
            return php.FS.createPreloadedFile(fileDef.parent, fileDef.name, (_userLocateFile = userLocateFile(fileDef.url)) !== null && _userLocateFile !== void 0 ? _userLocateFile : fileDef.url, true, false);
          }));
          var iniLines = libs.map(function (lib) {
            if (typeof lib === 'string' || lib instanceof URL) {
              return "extension=".concat(lib);
            } else if (_typeof(lib) === 'object' && lib.ini) {
              return "extension=".concat(String(lib.url).split('/').pop());
            }
          });
          _this.phpArgs.ini && iniLines.push(_this.phpArgs.ini.replace(/\n\s+/g, '\n'));
          php.FS.writeFile('/php.ini', iniLines.join("\n") + "\n", {
            encoding: 'utf8'
          });
          yield php.ccall('wasm_sapi_cgi_init', 'number', [], [], {
            async: true
          });
          yield _this.loadInit(php);
          return php;
        });
        return function (_x3) {
          return _ref3.apply(this, arguments);
        };
      }());
    }
  }, {
    key: "_beforeRequest",
    value: function () {
      var _beforeRequest2 = _asyncToGenerator(function* () {});
      function _beforeRequest() {
        return _beforeRequest2.apply(this, arguments);
      }
      return _beforeRequest;
    }()
  }, {
    key: "_afterRequest",
    value: function () {
      var _afterRequest2 = _asyncToGenerator(function* () {});
      function _afterRequest() {
        return _afterRequest2.apply(this, arguments);
      }
      return _afterRequest;
    }()
  }, {
    key: "request",
    value: function () {
      var _request2 = _asyncToGenerator(function* (_request) {
        var _yield$breakoutReques = yield (0, _breakoutRequest.breakoutRequest)(_request),
          url = _yield$breakoutReques.url,
          _yield$breakoutReques2 = _yield$breakoutReques.method,
          method = _yield$breakoutReques2 === void 0 ? 'GET' : _yield$breakoutReques2,
          get = _yield$breakoutReques.get,
          post = _yield$breakoutReques.post,
          contentType = _yield$breakoutReques.contentType;
        if (globalThis.caches) {
          var cache = yield caches.open('static-v1');
          var cached = yield cache.match(url);

          // this.maxRequestAge

          if (cached) {
            var cacheTime = Number(cached.headers.get('x-php-wasm-cache-time'));
            if (this.staticCacheTime > 0 && this.staticCacheTime > Date.now() - cacheTime) {
              this.onRequest(_request, cached);
              return cached;
            }
          }
        }
        var php = yield this.binary;
        yield this._beforeRequest();
        var docroot = this.docroot;
        var vHostEntrypoint,
          vHostPrefix = this.prefix;
        var _iterator = _createForOfIteratorHelper(this.vHosts),
          _step;
        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var _step$value = _step.value,
              pathPrefix = _step$value.pathPrefix,
              directory = _step$value.directory,
              entrypoint = _step$value.entrypoint;
            if (pathPrefix === url.pathname.substr(0, pathPrefix.length)) {
              docroot = directory;
              vHostEntrypoint = entrypoint;
              vHostPrefix = pathPrefix;
              break;
            }
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
        var rewrite = this.rewrite(url.pathname);
        var scriptName, path;
        if (_typeof(rewrite) === 'object') {
          scriptName = rewrite.scriptName;
          path = docroot + rewrite.path;
        } else {
          path = docroot + '/' + rewrite.substr((vHostPrefix || this.prefix).length);
          scriptName = path;
        }
        if (vHostEntrypoint) {
          scriptName = vHostPrefix + '/' + vHostEntrypoint;
        }
        var originalPath = url.pathname;
        var extension = path.split('.').pop();
        if (extension !== 'php' && extension !== 'phar') {
          var _aboutPath = php.FS.analyzePath(path);

          // Return static file
          if (_aboutPath.exists && php.FS.isFile(_aboutPath.object.mode)) {
            var _response = new Response(php.FS.readFile(path, {
              encoding: 'binary',
              url: url
            }), {});
            _response.headers.append('x-php-wasm-cache-time', new Date().getTime());
            if (extension in this.types) {
              _response.headers.append('Content-type', this.types[extension]);
            }
            if (globalThis.caches) {
              var _cache = yield caches.open('static-v1');
              _cache.put(url, _response.clone());
            }
            this.onRequest(_request, _response);
            return _response;
          } else if (_aboutPath.exists && php.FS.isDir(_aboutPath.object.mode) && '/' !== originalPath[-1 + originalPath.length]) {
            originalPath += '/';
          }

          // Rewrite to index
          path = docroot + '/index.php';
        }

        // Ensure query parameters are preserved.
        originalPath += url.search;
        if (this.maxRequestAge > 0 && Date.now() - requestTimes.get(_request) > this.maxRequestAge) {
          var _response2 = new Response('408: Request Timed Out.', {
            status: 408
          });
          this.onRequest(_request, _response2);
          return _response2;
        }
        var aboutPath = php.FS.analyzePath(path);
        if (!aboutPath.exists) {
          var rawResponse = this.notFound ? this.notFound(_request) : '404 - Not Found.';
          if (rawResponse) {
            return rawResponse instanceof Response ? rawResponse : new Response(rawResponse, {
              status: 404
            });
          }
        }
        this.input = ['POST', 'PUT', 'PATCH'].includes(method) ? post.split('') : [];
        this.output = [];
        this.error = [];
        var selfUrl = new URL(globalThis.location || _request.url);
        putEnv(php, 'PHP_VERSION', _config.phpVersion);
        putEnv(php, 'PHP_INI_SCAN_DIR', "/config:/preload:".concat(docroot));
        putEnv(php, 'PHPRC', '/php.ini');
        for (var _i = 0, _Object$entries = Object.entries(this.env); _i < _Object$entries.length; _i++) {
          var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2),
            name = _Object$entries$_i[0],
            value = _Object$entries$_i[1];
          putEnv(php, name, value);
        }
        var protocol = selfUrl.protocol.substr(0, selfUrl.protocol.length - 1);
        putEnv(php, 'SERVER_SOFTWARE', globalThis.navigator ? globalThis.navigator.userAgent : globalThis.process ? 'Node ' + globalThis.process.version : 'Javascript - Unknown');
        putEnv(php, 'REQUEST_METHOD', method);
        putEnv(php, 'REMOTE_ADDR', '127.0.0.1');
        putEnv(php, 'HTTP_HOST', selfUrl.host);
        putEnv(php, 'REQUEST_SCHEME', protocol);
        putEnv(php, 'HTTPS', protocol === 'https' ? 'on' : 'off');
        putEnv(php, 'DOCUMENT_ROOT', docroot);
        putEnv(php, 'REQUEST_URI', originalPath);
        putEnv(php, 'SCRIPT_NAME', scriptName);
        putEnv(php, 'SCRIPT_FILENAME', path);
        putEnv(php, 'PATH_TRANSLATED', path);
        putEnv(php, 'QUERY_STRING', get);
        putEnv(php, 'HTTP_COOKIE', _toConsumableArray(this.cookies.entries()).map(function (e) {
          return "".concat(e[0], "=").concat(e[1]);
        }).join(';'));
        putEnv(php, 'REDIRECT_STATUS', '200');
        putEnv(php, 'CONTENT_TYPE', contentType);
        putEnv(php, 'CONTENT_LENGTH', String(this.input.length));
        var exitCode = -1;
        try {
          exitCode = yield php.ccall('main', 'number', ['number', 'string'], [], {
            async: true
          });
        } catch (error) {
          console.error(error);
          var _response3 = new Response("500: Internal Server Error.\n" + "=".repeat(80) + "\n\n" + "Stacktrace:\n".concat(error.stack, "\n") + "=".repeat(80) + "\n\n" + "STDERR:\n".concat(new TextDecoder().decode(new Uint8Array(this.error).buffer), "\n") + "=".repeat(80) + "\n\n" + "STDOUT:\n".concat(new TextDecoder().decode(new Uint8Array(this.output).buffer), "\n") + "=".repeat(80) + "\n\n", {
            status: 500
          });
          this.onRequest(_request, _response3);
          this.refresh();
          return _response3;
        } finally {
          if (exitCode === 0) {
            this._afterRequest();
          } else {
            console.warn(new TextDecoder().decode(new Uint8Array(this.output).buffer));
            console.error(new TextDecoder().decode(new Uint8Array(this.error).buffer));
            this.refresh();
          }
        }
        ++this.count;
        var parsedResponse = (0, _parseResponse.parseResponse)(this.output);
        var status = 200;
        for (var _i2 = 0, _Object$entries2 = Object.entries(parsedResponse.headers); _i2 < _Object$entries2.length; _i2++) {
          var _Object$entries2$_i = _slicedToArray(_Object$entries2[_i2], 2),
            _name = _Object$entries2$_i[0],
            _value = _Object$entries2$_i[1];
          if (_name === 'Status') {
            status = _value.substr(0, 3);
          }
        }
        if (parsedResponse.headers['Set-Cookie']) {
          var raw = parsedResponse.headers['Set-Cookie'];
          var semi = raw.indexOf(';');
          var equal = raw.indexOf('=');
          var key = raw.substr(0, equal);
          var _value2 = raw.substr(1 + equal, -1 + semi - equal);
          this.cookies.set(key, _value2);
        }
        var headers = _objectSpread({}, parsedResponse.headers);

        // delete headers['Set-Cookie'];

        if (extension in this.types) {
          // headers["Content-type"] = this.types[extension];
        } else {
          var _headers$ContentType;
          headers["Content-type"] = (_headers$ContentType = headers["Content-type"]) !== null && _headers$ContentType !== void 0 ? _headers$ContentType : 'text/html; charset=utf-8';
        }
        if (parsedResponse.headers.Location) {
          headers.Location = parsedResponse.headers.Location;
        }
        var response = new Response(parsedResponse.body || '', {
          headers: headers,
          status: status,
          url: url
        });
        this.onRequest(_request, response);
        return response;
      });
      function request(_x4) {
        return _request2.apply(this, arguments);
      }
      return request;
    }()
  }, {
    key: "analyzePath",
    value: function analyzePath(path) {
      return this._enqueue(_fsOps.fsOps.analyzePath, [this.binary, path]);
    }
  }, {
    key: "readdir",
    value: function readdir(path) {
      return this._enqueue(_fsOps.fsOps.readdir, [this.binary, path]);
    }
  }, {
    key: "readFile",
    value: function readFile(path, options) {
      return this._enqueue(_fsOps.fsOps.readFile, [this.binary, path, options]);
    }
  }, {
    key: "stat",
    value: function stat(path) {
      return this._enqueue(_fsOps.fsOps.stat, [this.binary, path]);
    }
  }, {
    key: "mkdir",
    value: function mkdir(path) {
      return this._enqueue(_fsOps.fsOps.mkdir, [this.binary, path]);
    }
  }, {
    key: "rmdir",
    value: function rmdir(path) {
      return this._enqueue(_fsOps.fsOps.rmdir, [this.binary, path]);
    }
  }, {
    key: "rename",
    value: function rename(path, newPath) {
      return this._enqueue(_fsOps.fsOps.rename, [this.binary, path, newPath]);
    }
  }, {
    key: "writeFile",
    value: function writeFile(path, data, options) {
      return this._enqueue(_fsOps.fsOps.writeFile, [this.binary, path, data, options]);
    }
  }, {
    key: "unlink",
    value: function unlink(path) {
      return this._enqueue(_fsOps.fsOps.unlink, [this.binary, path]);
    }
  }, {
    key: "putEnv",
    value: function () {
      var _putEnv = _asyncToGenerator(function* (name, value) {
        return (yield this.binary).ccall('wasm_sapi_cgi_putenv', 'number', ['string', 'string'], [name, value]);
      });
      function putEnv(_x5, _x6) {
        return _putEnv.apply(this, arguments);
      }
      return putEnv;
    }()
  }, {
    key: "getSettings",
    value: function () {
      var _getSettings = _asyncToGenerator(function* () {
        return {
          docroot: this.docroot,
          maxRequestAge: this.maxRequestAge,
          staticCacheTime: this.staticCacheTime,
          dynamicCacheTime: this.dynamicCacheTime,
          vHosts: this.vHosts
        };
      });
      function getSettings() {
        return _getSettings.apply(this, arguments);
      }
      return getSettings;
    }()
  }, {
    key: "setSettings",
    value: function setSettings(_ref4) {
      var docroot = _ref4.docroot,
        maxRequestAge = _ref4.maxRequestAge,
        staticCacheTime = _ref4.staticCacheTime,
        dynamicCacheTime = _ref4.dynamicCacheTime,
        vHosts = _ref4.vHosts;
      this.docroot = docroot !== null && docroot !== void 0 ? docroot : this.docroot;
      this.maxRequestAge = maxRequestAge !== null && maxRequestAge !== void 0 ? maxRequestAge : this.maxRequestAge;
      this.staticCacheTime = staticCacheTime !== null && staticCacheTime !== void 0 ? staticCacheTime : this.staticCacheTime;
      this.dynamicCacheTime = dynamicCacheTime !== null && dynamicCacheTime !== void 0 ? dynamicCacheTime : this.dynamicCacheTime;
      this.vHosts = vHosts !== null && vHosts !== void 0 ? vHosts : this.vHosts;
    }
  }, {
    key: "getEnvs",
    value: function () {
      var _getEnvs = _asyncToGenerator(function* () {
        return _objectSpread({}, this.env);
      });
      function getEnvs() {
        return _getEnvs.apply(this, arguments);
      }
      return getEnvs;
    }()
  }, {
    key: "setEnvs",
    value: function setEnvs(env) {
      for (var _i3 = 0, _Object$keys = Object.keys(this.env); _i3 < _Object$keys.length; _i3++) {
        var key = _Object$keys[_i3];
        this.env[key] = undefined;
      }
      Object.assign(this.env, env);
    }
  }, {
    key: "storeInit",
    value: function () {
      var _storeInit = _asyncToGenerator(function* () {
        var settings = yield this.getSettings();
        var env = yield this.getEnvs();
        yield this.writeFile('/config/init.json', JSON.stringify({
          settings: settings,
          env: env
        }, null, 4), {
          encoding: 'utf8'
        });
      });
      function storeInit() {
        return _storeInit.apply(this, arguments);
      }
      return storeInit;
    }()
  }, {
    key: "loadInit",
    value: function () {
      var _loadInit = _asyncToGenerator(function* (binary) {
        var initPath = '/config/init.json';
        var check = yield _fsOps.fsOps.analyzePath(binary, initPath);
        if (!check.exists) {
          return;
        }
        var initJson = yield _fsOps.fsOps.readFile(binary, initPath, {
          encoding: 'utf8'
        });
        var init = JSON.parse(initJson || '{}');
        var settings = init.settings,
          env = init.env;
        this.setSettings(settings);
        this.setEnvs(env);
      });
      function loadInit(_x7) {
        return _loadInit.apply(this, arguments);
      }
      return loadInit;
    }()
  }]);
}();
PhpCgiBase.phpVersion = _config.phpVersion;
PhpCgiBase.phpVersionFull = _config.phpVersionFull;