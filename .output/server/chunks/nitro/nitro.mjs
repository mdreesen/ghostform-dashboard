import process from 'node:process';globalThis._importMeta_=globalThis._importMeta_||{url:"file:///_entry.js",env:process.env};import mongoose, { Schema } from 'mongoose';
import OpenAI from 'openai';
import { Resend } from 'resend';
import http, { Server as Server$1 } from 'node:http';
import https, { Server } from 'node:https';
import nodeCrypto, { createHash } from 'node:crypto';
import { EventEmitter } from 'node:events';
import { Buffer as Buffer$1 } from 'node:buffer';
import { promises, existsSync } from 'node:fs';
import { resolve as resolve$1, dirname as dirname$1, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { getIcons } from '@iconify/utils';
import { consola } from 'consola';
import { ipxFSStorage, ipxHttpStorage, createIPX, createIPXH3Handler } from 'ipx';

const subtle = nodeCrypto.webcrypto?.subtle || {};
const randomUUID = () => {
  return nodeCrypto.randomUUID();
};
const getRandomValues = (array) => {
  return nodeCrypto.webcrypto.getRandomValues(array);
};
const _crypto = {
  randomUUID,
  getRandomValues,
  subtle
};

const suspectProtoRx = /"(?:_|\\u0{2}5[Ff]){2}(?:p|\\u0{2}70)(?:r|\\u0{2}72)(?:o|\\u0{2}6[Ff])(?:t|\\u0{2}74)(?:o|\\u0{2}6[Ff])(?:_|\\u0{2}5[Ff]){2}"\s*:/;
const suspectConstructorRx = /"(?:c|\\u0063)(?:o|\\u006[Ff])(?:n|\\u006[Ee])(?:s|\\u0073)(?:t|\\u0074)(?:r|\\u0072)(?:u|\\u0075)(?:c|\\u0063)(?:t|\\u0074)(?:o|\\u006[Ff])(?:r|\\u0072)"\s*:/;
const JsonSigRx = /^\s*["[{]|^\s*-?\d{1,16}(\.\d{1,17})?([Ee][+-]?\d+)?\s*$/;
function jsonParseTransform(key, value) {
  if (key === "__proto__" || key === "constructor" && value && typeof value === "object" && "prototype" in value) {
    warnKeyDropped(key);
    return;
  }
  return value;
}
function warnKeyDropped(key) {
  console.warn(`[destr] Dropping "${key}" key to prevent prototype pollution.`);
}
function destr(value, options = {}) {
  if (typeof value !== "string") {
    return value;
  }
  if (value[0] === '"' && value[value.length - 1] === '"' && value.indexOf("\\") === -1) {
    return value.slice(1, -1);
  }
  const _value = value.trim();
  if (_value.length <= 9) {
    switch (_value.toLowerCase()) {
      case "true": {
        return true;
      }
      case "false": {
        return false;
      }
      case "undefined": {
        return void 0;
      }
      case "null": {
        return null;
      }
      case "nan": {
        return Number.NaN;
      }
      case "infinity": {
        return Number.POSITIVE_INFINITY;
      }
      case "-infinity": {
        return Number.NEGATIVE_INFINITY;
      }
    }
  }
  if (!JsonSigRx.test(value)) {
    if (options.strict) {
      throw new SyntaxError("[destr] Invalid JSON");
    }
    return value;
  }
  try {
    if (suspectProtoRx.test(value) || suspectConstructorRx.test(value)) {
      if (options.strict) {
        throw new Error("[destr] Possible prototype pollution");
      }
      return JSON.parse(value, jsonParseTransform);
    }
    return JSON.parse(value);
  } catch (error) {
    if (options.strict) {
      throw error;
    }
    return value;
  }
}

const HASH_RE = /#/g;
const AMPERSAND_RE = /&/g;
const SLASH_RE = /\//g;
const EQUAL_RE = /=/g;
const IM_RE = /\?/g;
const PLUS_RE = /\+/g;
const ENC_CARET_RE = /%5e/gi;
const ENC_BACKTICK_RE = /%60/gi;
const ENC_PIPE_RE = /%7c/gi;
const ENC_SPACE_RE = /%20/gi;
const ENC_SLASH_RE = /%2f/gi;
const ENC_ENC_SLASH_RE = /%252f/gi;
function encode(text) {
  return encodeURI("" + text).replace(ENC_PIPE_RE, "|");
}
function encodeQueryValue(input) {
  return encode(typeof input === "string" ? input : JSON.stringify(input)).replace(PLUS_RE, "%2B").replace(ENC_SPACE_RE, "+").replace(HASH_RE, "%23").replace(AMPERSAND_RE, "%26").replace(ENC_BACKTICK_RE, "`").replace(ENC_CARET_RE, "^").replace(SLASH_RE, "%2F");
}
function encodeQueryKey(text) {
  return encodeQueryValue(text).replace(EQUAL_RE, "%3D");
}
function encodePath(text) {
  return encode(text).replace(HASH_RE, "%23").replace(IM_RE, "%3F").replace(ENC_ENC_SLASH_RE, "%2F").replace(AMPERSAND_RE, "%26").replace(PLUS_RE, "%2B");
}
function encodeParam(text) {
  return encodePath(text).replace(SLASH_RE, "%2F");
}
function decode$1(text = "") {
  try {
    return decodeURIComponent("" + text);
  } catch {
    return "" + text;
  }
}
function decodePath(text) {
  return decode$1(text.replace(ENC_SLASH_RE, "%252F"));
}
function decodeQueryKey(text) {
  return decode$1(text.replace(PLUS_RE, " "));
}
function decodeQueryValue(text) {
  return decode$1(text.replace(PLUS_RE, " "));
}

function parseQuery(parametersString = "") {
  const object = /* @__PURE__ */ Object.create(null);
  if (parametersString[0] === "?") {
    parametersString = parametersString.slice(1);
  }
  for (const parameter of parametersString.split("&")) {
    const s = parameter.match(/([^=]+)=?(.*)/) || [];
    if (s.length < 2) {
      continue;
    }
    const key = decodeQueryKey(s[1]);
    if (key === "__proto__" || key === "constructor") {
      continue;
    }
    const value = decodeQueryValue(s[2] || "");
    if (object[key] === void 0) {
      object[key] = value;
    } else if (Array.isArray(object[key])) {
      object[key].push(value);
    } else {
      object[key] = [object[key], value];
    }
  }
  return object;
}
function encodeQueryItem(key, value) {
  if (typeof value === "number" || typeof value === "boolean") {
    value = String(value);
  }
  if (!value) {
    return encodeQueryKey(key);
  }
  if (Array.isArray(value)) {
    return value.map(
      (_value) => `${encodeQueryKey(key)}=${encodeQueryValue(_value)}`
    ).join("&");
  }
  return `${encodeQueryKey(key)}=${encodeQueryValue(value)}`;
}
function stringifyQuery(query) {
  return Object.keys(query).filter((k) => query[k] !== void 0).map((k) => encodeQueryItem(k, query[k])).filter(Boolean).join("&");
}

const PROTOCOL_STRICT_REGEX = /^[\s\w\0+.-]{2,}:([/\\]{1,2})/;
const PROTOCOL_REGEX = /^[\s\w\0+.-]{2,}:([/\\]{2})?/;
const PROTOCOL_RELATIVE_REGEX = /^([/\\]\s*){2,}[^/\\]/;
const PROTOCOL_SCRIPT_RE = /^[\s\0]*(blob|data|javascript|vbscript):$/i;
const TRAILING_SLASH_RE = /\/$|\/\?|\/#/;
const JOIN_LEADING_SLASH_RE = /^\.?\//;
function hasProtocol(inputString, opts = {}) {
  if (typeof opts === "boolean") {
    opts = { acceptRelative: opts };
  }
  if (opts.strict) {
    return PROTOCOL_STRICT_REGEX.test(inputString);
  }
  return PROTOCOL_REGEX.test(inputString) || (opts.acceptRelative ? PROTOCOL_RELATIVE_REGEX.test(inputString) : false);
}
function isScriptProtocol(protocol) {
  return !!protocol && PROTOCOL_SCRIPT_RE.test(protocol);
}
function hasTrailingSlash(input = "", respectQueryAndFragment) {
  if (!respectQueryAndFragment) {
    return input.endsWith("/");
  }
  return TRAILING_SLASH_RE.test(input);
}
function withoutTrailingSlash(input = "", respectQueryAndFragment) {
  if (!respectQueryAndFragment) {
    return (hasTrailingSlash(input) ? input.slice(0, -1) : input) || "/";
  }
  if (!hasTrailingSlash(input, true)) {
    return input || "/";
  }
  let path = input;
  let fragment = "";
  const fragmentIndex = input.indexOf("#");
  if (fragmentIndex !== -1) {
    path = input.slice(0, fragmentIndex);
    fragment = input.slice(fragmentIndex);
  }
  const [s0, ...s] = path.split("?");
  const cleanPath = s0.endsWith("/") ? s0.slice(0, -1) : s0;
  return (cleanPath || "/") + (s.length > 0 ? `?${s.join("?")}` : "") + fragment;
}
function withTrailingSlash(input = "", respectQueryAndFragment) {
  if (!respectQueryAndFragment) {
    return input.endsWith("/") ? input : input + "/";
  }
  if (hasTrailingSlash(input, true)) {
    return input || "/";
  }
  let path = input;
  let fragment = "";
  const fragmentIndex = input.indexOf("#");
  if (fragmentIndex !== -1) {
    path = input.slice(0, fragmentIndex);
    fragment = input.slice(fragmentIndex);
    if (!path) {
      return fragment;
    }
  }
  const [s0, ...s] = path.split("?");
  return s0 + "/" + (s.length > 0 ? `?${s.join("?")}` : "") + fragment;
}
function hasLeadingSlash(input = "") {
  return input.startsWith("/");
}
function withLeadingSlash(input = "") {
  return hasLeadingSlash(input) ? input : "/" + input;
}
function withBase(input, base) {
  if (isEmptyURL(base) || hasProtocol(input)) {
    return input;
  }
  const _base = withoutTrailingSlash(base);
  if (input.startsWith(_base)) {
    const nextChar = input[_base.length];
    if (!nextChar || nextChar === "/" || nextChar === "?") {
      return input;
    }
  }
  return joinURL(_base, input);
}
function withoutBase(input, base) {
  if (isEmptyURL(base)) {
    return input;
  }
  const _base = withoutTrailingSlash(base);
  if (!input.startsWith(_base)) {
    return input;
  }
  const nextChar = input[_base.length];
  if (nextChar && nextChar !== "/" && nextChar !== "?") {
    return input;
  }
  const trimmed = input.slice(_base.length).replace(/^\/+/, "");
  return "/" + trimmed;
}
function withQuery(input, query) {
  const parsed = parseURL(input);
  const mergedQuery = { ...parseQuery(parsed.search), ...query };
  parsed.search = stringifyQuery(mergedQuery);
  return stringifyParsedURL(parsed);
}
function getQuery$1(input) {
  return parseQuery(parseURL(input).search);
}
function isEmptyURL(url) {
  return !url || url === "/";
}
function isNonEmptyURL(url) {
  return url && url !== "/";
}
function joinURL(base, ...input) {
  let url = base || "";
  for (const segment of input.filter((url2) => isNonEmptyURL(url2))) {
    if (url) {
      const _segment = segment.replace(JOIN_LEADING_SLASH_RE, "");
      url = withTrailingSlash(url) + _segment;
    } else {
      url = segment;
    }
  }
  return url;
}
function joinRelativeURL(..._input) {
  const JOIN_SEGMENT_SPLIT_RE = /\/(?!\/)/;
  const input = _input.filter(Boolean);
  const segments = [];
  let segmentsDepth = 0;
  for (const i of input) {
    if (!i || i === "/") {
      continue;
    }
    for (const [sindex, s] of i.split(JOIN_SEGMENT_SPLIT_RE).entries()) {
      if (!s || s === ".") {
        continue;
      }
      if (s === "..") {
        if (segments.length === 1 && hasProtocol(segments[0])) {
          continue;
        }
        segments.pop();
        segmentsDepth--;
        continue;
      }
      if (sindex === 1 && segments[segments.length - 1]?.endsWith(":/")) {
        segments[segments.length - 1] += "/" + s;
        continue;
      }
      segments.push(s);
      segmentsDepth++;
    }
  }
  let url = segments.join("/");
  if (segmentsDepth >= 0) {
    if (input[0]?.startsWith("/") && !url.startsWith("/")) {
      url = "/" + url;
    } else if (input[0]?.startsWith("./") && !url.startsWith("./")) {
      url = "./" + url;
    }
  } else {
    url = "../".repeat(-1 * segmentsDepth) + url;
  }
  if (input[input.length - 1]?.endsWith("/") && !url.endsWith("/")) {
    url += "/";
  }
  return url;
}

const protocolRelative = Symbol.for("ufo:protocolRelative");
function parseURL(input = "", defaultProto) {
  const _specialProtoMatch = input.match(
    /^[\s\0]*(blob:|data:|javascript:|vbscript:)(.*)/i
  );
  if (_specialProtoMatch) {
    const [, _proto, _pathname = ""] = _specialProtoMatch;
    return {
      protocol: _proto.toLowerCase(),
      pathname: _pathname,
      href: _proto + _pathname,
      auth: "",
      host: "",
      search: "",
      hash: ""
    };
  }
  if (!hasProtocol(input, { acceptRelative: true })) {
    return parsePath(input);
  }
  const [, protocol = "", auth, hostAndPath = ""] = input.replace(/\\/g, "/").match(/^[\s\0]*([\w+.-]{2,}:)?\/\/([^/@]+@)?(.*)/) || [];
  let [, host = "", path = ""] = hostAndPath.match(/([^#/?]*)(.*)?/) || [];
  if (protocol === "file:") {
    path = path.replace(/\/(?=[A-Za-z]:)/, "");
  }
  const { pathname, search, hash } = parsePath(path);
  return {
    protocol: protocol.toLowerCase(),
    auth: auth ? auth.slice(0, Math.max(0, auth.length - 1)) : "",
    host,
    pathname,
    search,
    hash,
    [protocolRelative]: !protocol
  };
}
function parsePath(input = "") {
  const [pathname = "", search = "", hash = ""] = (input.match(/([^#?]*)(\?[^#]*)?(#.*)?/) || []).splice(1);
  return {
    pathname,
    search,
    hash
  };
}
function stringifyParsedURL(parsed) {
  const pathname = parsed.pathname || "";
  const search = parsed.search ? (parsed.search.startsWith("?") ? "" : "?") + parsed.search : "";
  const hash = parsed.hash || "";
  const auth = parsed.auth ? parsed.auth + "@" : "";
  const host = parsed.host || "";
  const proto = parsed.protocol || parsed[protocolRelative] ? (parsed.protocol || "") + "//" : "";
  return proto + auth + host + pathname + search + hash;
}

const NullObject = /* @__PURE__ */ (() => {
  const C = function() {
  };
  C.prototype = /* @__PURE__ */ Object.create(null);
  return C;
})();
function parse(str, options) {
  if (typeof str !== "string") {
    throw new TypeError("argument str must be a string");
  }
  const obj = new NullObject();
  const opt = {};
  const dec = opt.decode || decode;
  let index = 0;
  while (index < str.length) {
    const eqIdx = str.indexOf("=", index);
    if (eqIdx === -1) {
      break;
    }
    let endIdx = str.indexOf(";", index);
    if (endIdx === -1) {
      endIdx = str.length;
    } else if (endIdx < eqIdx) {
      index = str.lastIndexOf(";", eqIdx - 1) + 1;
      continue;
    }
    const key = str.slice(index, eqIdx).trim();
    if (opt?.filter && !opt?.filter(key)) {
      index = endIdx + 1;
      continue;
    }
    if (void 0 === obj[key]) {
      let val = str.slice(eqIdx + 1, endIdx).trim();
      if (val.codePointAt(0) === 34) {
        val = val.slice(1, -1);
      }
      obj[key] = tryDecode(val, dec);
    }
    index = endIdx + 1;
  }
  return obj;
}
function decode(str) {
  return str.includes("%") ? decodeURIComponent(str) : str;
}
function tryDecode(str, decode2) {
  try {
    return decode2(str);
  } catch {
    return str;
  }
}

const fieldContentRegExp = /^[\u0009\u0020-\u007E\u0080-\u00FF]+$/;
function serialize$2(name, value, options) {
  const opt = options || {};
  const enc = opt.encode || encodeURIComponent;
  if (typeof enc !== "function") {
    throw new TypeError("option encode is invalid");
  }
  if (!fieldContentRegExp.test(name)) {
    throw new TypeError("argument name is invalid");
  }
  const encodedValue = enc(value);
  if (encodedValue && !fieldContentRegExp.test(encodedValue)) {
    throw new TypeError("argument val is invalid");
  }
  let str = name + "=" + encodedValue;
  if (void 0 !== opt.maxAge && opt.maxAge !== null) {
    const maxAge = opt.maxAge - 0;
    if (Number.isNaN(maxAge) || !Number.isFinite(maxAge)) {
      throw new TypeError("option maxAge is invalid");
    }
    str += "; Max-Age=" + Math.floor(maxAge);
  }
  if (opt.domain) {
    if (!fieldContentRegExp.test(opt.domain)) {
      throw new TypeError("option domain is invalid");
    }
    str += "; Domain=" + opt.domain;
  }
  if (opt.path) {
    if (!fieldContentRegExp.test(opt.path)) {
      throw new TypeError("option path is invalid");
    }
    str += "; Path=" + opt.path;
  }
  if (opt.expires) {
    if (!isDate(opt.expires) || Number.isNaN(opt.expires.valueOf())) {
      throw new TypeError("option expires is invalid");
    }
    str += "; Expires=" + opt.expires.toUTCString();
  }
  if (opt.httpOnly) {
    str += "; HttpOnly";
  }
  if (opt.secure) {
    str += "; Secure";
  }
  if (opt.priority) {
    const priority = typeof opt.priority === "string" ? opt.priority.toLowerCase() : opt.priority;
    switch (priority) {
      case "low": {
        str += "; Priority=Low";
        break;
      }
      case "medium": {
        str += "; Priority=Medium";
        break;
      }
      case "high": {
        str += "; Priority=High";
        break;
      }
      default: {
        throw new TypeError("option priority is invalid");
      }
    }
  }
  if (opt.sameSite) {
    const sameSite = typeof opt.sameSite === "string" ? opt.sameSite.toLowerCase() : opt.sameSite;
    switch (sameSite) {
      case true: {
        str += "; SameSite=Strict";
        break;
      }
      case "lax": {
        str += "; SameSite=Lax";
        break;
      }
      case "strict": {
        str += "; SameSite=Strict";
        break;
      }
      case "none": {
        str += "; SameSite=None";
        break;
      }
      default: {
        throw new TypeError("option sameSite is invalid");
      }
    }
  }
  if (opt.partitioned) {
    str += "; Partitioned";
  }
  return str;
}
function isDate(val) {
  return Object.prototype.toString.call(val) === "[object Date]" || val instanceof Date;
}

function parseSetCookie(setCookieValue, options) {
  const parts = (setCookieValue || "").split(";").filter((str) => typeof str === "string" && !!str.trim());
  const nameValuePairStr = parts.shift() || "";
  const parsed = _parseNameValuePair(nameValuePairStr);
  const name = parsed.name;
  let value = parsed.value;
  try {
    value = options?.decode === false ? value : (options?.decode || decodeURIComponent)(value);
  } catch {
  }
  const cookie = {
    name,
    value
  };
  for (const part of parts) {
    const sides = part.split("=");
    const partKey = (sides.shift() || "").trimStart().toLowerCase();
    const partValue = sides.join("=");
    switch (partKey) {
      case "expires": {
        cookie.expires = new Date(partValue);
        break;
      }
      case "max-age": {
        cookie.maxAge = Number.parseInt(partValue, 10);
        break;
      }
      case "secure": {
        cookie.secure = true;
        break;
      }
      case "httponly": {
        cookie.httpOnly = true;
        break;
      }
      case "samesite": {
        cookie.sameSite = partValue;
        break;
      }
      default: {
        cookie[partKey] = partValue;
      }
    }
  }
  return cookie;
}
function _parseNameValuePair(nameValuePairStr) {
  let name = "";
  let value = "";
  const nameValueArr = nameValuePairStr.split("=");
  if (nameValueArr.length > 1) {
    name = nameValueArr.shift();
    value = nameValueArr.join("=");
  } else {
    value = nameValuePairStr;
  }
  return { name, value };
}

const NODE_TYPES = {
  NORMAL: 0,
  WILDCARD: 1,
  PLACEHOLDER: 2
};

function createRouter$1(options = {}) {
  const ctx = {
    options,
    rootNode: createRadixNode(),
    staticRoutesMap: {}
  };
  const normalizeTrailingSlash = (p) => options.strictTrailingSlash ? p : p.replace(/\/$/, "") || "/";
  if (options.routes) {
    for (const path in options.routes) {
      insert(ctx, normalizeTrailingSlash(path), options.routes[path]);
    }
  }
  return {
    ctx,
    lookup: (path) => lookup(ctx, normalizeTrailingSlash(path)),
    insert: (path, data) => insert(ctx, normalizeTrailingSlash(path), data),
    remove: (path) => remove(ctx, normalizeTrailingSlash(path))
  };
}
function lookup(ctx, path) {
  const staticPathNode = ctx.staticRoutesMap[path];
  if (staticPathNode) {
    return staticPathNode.data;
  }
  const sections = path.split("/");
  const params = {};
  let paramsFound = false;
  let wildcardNode = null;
  let node = ctx.rootNode;
  let wildCardParam = null;
  for (let i = 0; i < sections.length; i++) {
    const section = sections[i];
    if (node.wildcardChildNode !== null) {
      wildcardNode = node.wildcardChildNode;
      wildCardParam = sections.slice(i).join("/");
    }
    const nextNode = node.children.get(section);
    if (nextNode === void 0) {
      if (node && node.placeholderChildren.length > 1) {
        const remaining = sections.length - i;
        node = node.placeholderChildren.find((c) => c.maxDepth === remaining) || null;
      } else {
        node = node.placeholderChildren[0] || null;
      }
      if (!node) {
        break;
      }
      if (node.paramName) {
        params[node.paramName] = section;
      }
      paramsFound = true;
    } else {
      node = nextNode;
    }
  }
  if ((node === null || node.data === null) && wildcardNode !== null) {
    node = wildcardNode;
    params[node.paramName || "_"] = wildCardParam;
    paramsFound = true;
  }
  if (!node) {
    return null;
  }
  if (paramsFound) {
    return {
      ...node.data,
      params: paramsFound ? params : void 0
    };
  }
  return node.data;
}
function insert(ctx, path, data) {
  let isStaticRoute = true;
  const sections = path.split("/");
  let node = ctx.rootNode;
  let _unnamedPlaceholderCtr = 0;
  const matchedNodes = [node];
  for (const section of sections) {
    let childNode;
    if (childNode = node.children.get(section)) {
      node = childNode;
    } else {
      const type = getNodeType(section);
      childNode = createRadixNode({ type, parent: node });
      node.children.set(section, childNode);
      if (type === NODE_TYPES.PLACEHOLDER) {
        childNode.paramName = section === "*" ? `_${_unnamedPlaceholderCtr++}` : section.slice(1);
        node.placeholderChildren.push(childNode);
        isStaticRoute = false;
      } else if (type === NODE_TYPES.WILDCARD) {
        node.wildcardChildNode = childNode;
        childNode.paramName = section.slice(
          3
          /* "**:" */
        ) || "_";
        isStaticRoute = false;
      }
      matchedNodes.push(childNode);
      node = childNode;
    }
  }
  for (const [depth, node2] of matchedNodes.entries()) {
    node2.maxDepth = Math.max(matchedNodes.length - depth, node2.maxDepth || 0);
  }
  node.data = data;
  if (isStaticRoute === true) {
    ctx.staticRoutesMap[path] = node;
  }
  return node;
}
function remove(ctx, path) {
  let success = false;
  const sections = path.split("/");
  let node = ctx.rootNode;
  for (const section of sections) {
    node = node.children.get(section);
    if (!node) {
      return success;
    }
  }
  if (node.data) {
    const lastSection = sections.at(-1) || "";
    node.data = null;
    if (Object.keys(node.children).length === 0 && node.parent) {
      node.parent.children.delete(lastSection);
      node.parent.wildcardChildNode = null;
      node.parent.placeholderChildren = [];
    }
    success = true;
  }
  return success;
}
function createRadixNode(options = {}) {
  return {
    type: options.type || NODE_TYPES.NORMAL,
    maxDepth: 0,
    parent: options.parent || null,
    children: /* @__PURE__ */ new Map(),
    data: options.data || null,
    paramName: options.paramName || null,
    wildcardChildNode: null,
    placeholderChildren: []
  };
}
function getNodeType(str) {
  if (str.startsWith("**")) {
    return NODE_TYPES.WILDCARD;
  }
  if (str[0] === ":" || str === "*") {
    return NODE_TYPES.PLACEHOLDER;
  }
  return NODE_TYPES.NORMAL;
}

function toRouteMatcher(router) {
  const table = _routerNodeToTable("", router.ctx.rootNode);
  return _createMatcher(table, router.ctx.options.strictTrailingSlash);
}
function _createMatcher(table, strictTrailingSlash) {
  return {
    ctx: { table },
    matchAll: (path) => _matchRoutes(path, table, strictTrailingSlash)
  };
}
function _createRouteTable() {
  return {
    static: /* @__PURE__ */ new Map(),
    wildcard: /* @__PURE__ */ new Map(),
    dynamic: /* @__PURE__ */ new Map()
  };
}
function _matchRoutes(path, table, strictTrailingSlash) {
  if (strictTrailingSlash !== true && path.endsWith("/")) {
    path = path.slice(0, -1) || "/";
  }
  const matches = [];
  for (const [key, value] of _sortRoutesMap(table.wildcard)) {
    if (path === key || path.startsWith(key + "/")) {
      matches.push(value);
    }
  }
  for (const [key, value] of _sortRoutesMap(table.dynamic)) {
    if (path.startsWith(key + "/")) {
      const subPath = "/" + path.slice(key.length).split("/").splice(2).join("/");
      matches.push(..._matchRoutes(subPath, value));
    }
  }
  const staticMatch = table.static.get(path);
  if (staticMatch) {
    matches.push(staticMatch);
  }
  return matches.filter(Boolean);
}
function _sortRoutesMap(m) {
  return [...m.entries()].sort((a, b) => a[0].length - b[0].length);
}
function _routerNodeToTable(initialPath, initialNode) {
  const table = _createRouteTable();
  function _addNode(path, node) {
    if (path) {
      if (node.type === NODE_TYPES.NORMAL && !(path.includes("*") || path.includes(":"))) {
        if (node.data) {
          table.static.set(path, node.data);
        }
      } else if (node.type === NODE_TYPES.WILDCARD) {
        table.wildcard.set(path.replace("/**", ""), node.data);
      } else if (node.type === NODE_TYPES.PLACEHOLDER) {
        const subTable = _routerNodeToTable("", node);
        if (node.data) {
          subTable.static.set("/", node.data);
        }
        table.dynamic.set(path.replace(/\/\*|\/:\w+/, ""), subTable);
        return;
      }
    }
    for (const [childPath, child] of node.children.entries()) {
      _addNode(`${path}/${childPath}`.replace("//", "/"), child);
    }
  }
  _addNode(initialPath, initialNode);
  return table;
}

function isPlainObject(value) {
  if (value === null || typeof value !== "object") {
    return false;
  }
  const prototype = Object.getPrototypeOf(value);
  if (prototype !== null && prototype !== Object.prototype && Object.getPrototypeOf(prototype) !== null) {
    return false;
  }
  if (Symbol.iterator in value) {
    return false;
  }
  if (Symbol.toStringTag in value) {
    return Object.prototype.toString.call(value) === "[object Module]";
  }
  return true;
}

function _defu(baseObject, defaults, namespace = ".", merger) {
  if (!isPlainObject(defaults)) {
    return _defu(baseObject, {}, namespace, merger);
  }
  const object = { ...defaults };
  for (const key of Object.keys(baseObject)) {
    if (key === "__proto__" || key === "constructor") {
      continue;
    }
    const value = baseObject[key];
    if (value === null || value === void 0) {
      continue;
    }
    if (merger && merger(object, key, value, namespace)) {
      continue;
    }
    if (Array.isArray(value) && Array.isArray(object[key])) {
      object[key] = [...value, ...object[key]];
    } else if (isPlainObject(value) && isPlainObject(object[key])) {
      object[key] = _defu(
        value,
        object[key],
        (namespace ? `${namespace}.` : "") + key.toString(),
        merger
      );
    } else {
      object[key] = value;
    }
  }
  return object;
}
function createDefu(merger) {
  return (...arguments_) => (
    // eslint-disable-next-line unicorn/no-array-reduce
    arguments_.reduce((p, c) => _defu(p, c, "", merger), {})
  );
}
const defu = createDefu();
const defuFn = createDefu((object, key, currentValue) => {
  if (object[key] !== void 0 && typeof currentValue === "function") {
    object[key] = currentValue(object[key]);
    return true;
  }
});

// src/utils.ts
var alphabetByEncoding = {};
var alphabetByValue = Array.from({ length: 64 });
for (let i = 0, start = "A".charCodeAt(0), limit = "Z".charCodeAt(0); i + start <= limit; i++) {
  const char = String.fromCharCode(i + start);
  alphabetByEncoding[char] = i;
  alphabetByValue[i] = char;
}
for (let i = 0, start = "a".charCodeAt(0), limit = "z".charCodeAt(0); i + start <= limit; i++) {
  const char = String.fromCharCode(i + start);
  const index = i + 26;
  alphabetByEncoding[char] = index;
  alphabetByValue[index] = char;
}
for (let i = 0; i < 10; i++) {
  alphabetByEncoding[i.toString(10)] = i + 52;
  const char = i.toString(10);
  const index = i + 52;
  alphabetByEncoding[char] = index;
  alphabetByValue[index] = char;
}
alphabetByEncoding["-"] = 62;
alphabetByValue[62] = "-";
alphabetByEncoding["_"] = 63;
alphabetByValue[63] = "_";
var bitsPerLetter = 6;
var bitsPerByte = 8;
var maxLetterValue = 63;
var stringToBuffer = (value) => {
  return new TextEncoder().encode(value);
};
var bufferToString = (value) => {
  return new TextDecoder().decode(value);
};
var base64urlDecode = (_input) => {
  const input = _input + "=".repeat((4 - _input.length % 4) % 4);
  let totalByteLength = input.length / 4 * 3;
  if (input.endsWith("==")) {
    totalByteLength -= 2;
  } else if (input.endsWith("=")) {
    totalByteLength--;
  }
  const out = new ArrayBuffer(totalByteLength);
  const dataView = new DataView(out);
  for (let i = 0; i < input.length; i += 4) {
    let bits = 0;
    let bitLength = 0;
    for (let j = i, limit = i + 3; j <= limit; j++) {
      if (input[j] === "=") {
        bits >>= bitsPerLetter;
      } else {
        if (!(input[j] in alphabetByEncoding)) {
          throw new TypeError(`Invalid character ${input[j]} in base64 string.`);
        }
        bits |= alphabetByEncoding[input[j]] << (limit - j) * bitsPerLetter;
        bitLength += bitsPerLetter;
      }
    }
    const chunkOffset = i / 4 * 3;
    bits >>= bitLength % bitsPerByte;
    const byteLength = Math.floor(bitLength / bitsPerByte);
    for (let k = 0; k < byteLength; k++) {
      const offset = (byteLength - k - 1) * bitsPerByte;
      dataView.setUint8(chunkOffset + k, (bits & 255 << offset) >> offset);
    }
  }
  return new Uint8Array(out);
};
var base64urlEncode = (_input) => {
  const input = typeof _input === "string" ? stringToBuffer(_input) : _input;
  let str = "";
  for (let i = 0; i < input.length; i += 3) {
    let bits = 0;
    let bitLength = 0;
    for (let j = i, limit = Math.min(i + 3, input.length); j < limit; j++) {
      bits |= input[j] << (limit - j - 1) * bitsPerByte;
      bitLength += bitsPerByte;
    }
    const bitClusterCount = Math.ceil(bitLength / bitsPerLetter);
    bits <<= bitClusterCount * bitsPerLetter - bitLength;
    for (let k = 1; k <= bitClusterCount; k++) {
      const offset = (bitClusterCount - k) * bitsPerLetter;
      str += alphabetByValue[(bits & maxLetterValue << offset) >> offset];
    }
  }
  return str;
};

// src/index.ts
var defaults = {
  encryption: { saltBits: 256, algorithm: "aes-256-cbc", iterations: 1, minPasswordlength: 32 },
  integrity: { saltBits: 256, algorithm: "sha256", iterations: 1, minPasswordlength: 32 },
  ttl: 0,
  timestampSkewSec: 60,
  localtimeOffsetMsec: 0
};
var clone = (options) => ({
  ...options,
  encryption: { ...options.encryption },
  integrity: { ...options.integrity }
});
var algorithms = {
  "aes-128-ctr": { keyBits: 128, ivBits: 128, name: "AES-CTR" },
  "aes-256-cbc": { keyBits: 256, ivBits: 128, name: "AES-CBC" },
  sha256: { keyBits: 256, name: "SHA-256" }
};
var macPrefix = "Fe26.2";
var randomBytes = (_crypto, size) => {
  const bytes = new Uint8Array(size);
  _crypto.getRandomValues(bytes);
  return bytes;
};
var randomBits = (_crypto, bits) => {
  if (bits < 1)
    throw new Error("Invalid random bits count");
  const bytes = Math.ceil(bits / 8);
  return randomBytes(_crypto, bytes);
};
var pbkdf2 = async (_crypto, password, salt, iterations, keyLength, hash) => {
  const passwordBuffer = stringToBuffer(password);
  const importedKey = await _crypto.subtle.importKey(
    "raw",
    passwordBuffer,
    { name: "PBKDF2" },
    false,
    ["deriveBits"]
  );
  const saltBuffer = stringToBuffer(salt);
  const params = { name: "PBKDF2", hash, salt: saltBuffer, iterations };
  const derivation = await _crypto.subtle.deriveBits(params, importedKey, keyLength * 8);
  return derivation;
};
var generateKey = async (_crypto, password, options) => {
  var _a;
  if (!(password == null ? void 0 : password.length))
    throw new Error("Empty password");
  if (options == null || typeof options !== "object")
    throw new Error("Bad options");
  if (!(options.algorithm in algorithms))
    throw new Error(`Unknown algorithm: ${options.algorithm}`);
  const algorithm = algorithms[options.algorithm];
  const result = {};
  const hmac = (_a = options.hmac) != null ? _a : false;
  const id = hmac ? { name: "HMAC", hash: algorithm.name } : { name: algorithm.name };
  const usage = hmac ? ["sign", "verify"] : ["encrypt", "decrypt"];
  if (typeof password === "string") {
    if (password.length < options.minPasswordlength)
      throw new Error(
        `Password string too short (min ${options.minPasswordlength} characters required)`
      );
    let { salt = "" } = options;
    if (!salt) {
      const { saltBits = 0 } = options;
      if (!saltBits)
        throw new Error("Missing salt and saltBits options");
      const randomSalt = randomBits(_crypto, saltBits);
      salt = [...new Uint8Array(randomSalt)].map((x) => x.toString(16).padStart(2, "0")).join("");
    }
    const derivedKey = await pbkdf2(
      _crypto,
      password,
      salt,
      options.iterations,
      algorithm.keyBits / 8,
      "SHA-1"
    );
    const importedEncryptionKey = await _crypto.subtle.importKey(
      "raw",
      derivedKey,
      id,
      false,
      usage
    );
    result.key = importedEncryptionKey;
    result.salt = salt;
  } else {
    if (password.length < algorithm.keyBits / 8)
      throw new Error("Key buffer (password) too small");
    result.key = await _crypto.subtle.importKey("raw", password, id, false, usage);
    result.salt = "";
  }
  if (options.iv)
    result.iv = options.iv;
  else if ("ivBits" in algorithm)
    result.iv = randomBits(_crypto, algorithm.ivBits);
  return result;
};
var getEncryptParams = (algorithm, key, data) => {
  return [
    algorithm === "aes-128-ctr" ? { name: "AES-CTR", counter: key.iv, length: 128 } : { name: "AES-CBC", iv: key.iv },
    key.key,
    typeof data === "string" ? stringToBuffer(data) : data
  ];
};
var encrypt = async (_crypto, password, options, data) => {
  const key = await generateKey(_crypto, password, options);
  const encrypted = await _crypto.subtle.encrypt(...getEncryptParams(options.algorithm, key, data));
  return { encrypted: new Uint8Array(encrypted), key };
};
var decrypt = async (_crypto, password, options, data) => {
  const key = await generateKey(_crypto, password, options);
  const decrypted = await _crypto.subtle.decrypt(...getEncryptParams(options.algorithm, key, data));
  return bufferToString(new Uint8Array(decrypted));
};
var hmacWithPassword = async (_crypto, password, options, data) => {
  const key = await generateKey(_crypto, password, { ...options, hmac: true });
  const textBuffer = stringToBuffer(data);
  const signed = await _crypto.subtle.sign({ name: "HMAC" }, key.key, textBuffer);
  const digest = base64urlEncode(new Uint8Array(signed));
  return { digest, salt: key.salt };
};
var normalizePassword = (password) => {
  if (typeof password === "string" || password instanceof Uint8Array)
    return { encryption: password, integrity: password };
  if ("secret" in password)
    return { id: password.id, encryption: password.secret, integrity: password.secret };
  return { id: password.id, encryption: password.encryption, integrity: password.integrity };
};
var seal = async (_crypto, object, password, options) => {
  if (!password)
    throw new Error("Empty password");
  const opts = clone(options);
  const now = Date.now() + (opts.localtimeOffsetMsec || 0);
  const objectString = JSON.stringify(object);
  const pass = normalizePassword(password);
  const { id = "", encryption, integrity } = pass;
  if (id && !/^\w+$/.test(id))
    throw new Error("Invalid password id");
  const { encrypted, key } = await encrypt(_crypto, encryption, opts.encryption, objectString);
  const encryptedB64 = base64urlEncode(new Uint8Array(encrypted));
  const iv = base64urlEncode(key.iv);
  const expiration = opts.ttl ? now + opts.ttl : "";
  const macBaseString = `${macPrefix}*${id}*${key.salt}*${iv}*${encryptedB64}*${expiration}`;
  const mac = await hmacWithPassword(_crypto, integrity, opts.integrity, macBaseString);
  const sealed = `${macBaseString}*${mac.salt}*${mac.digest}`;
  return sealed;
};
var fixedTimeComparison = (a, b) => {
  let mismatch = a.length === b.length ? 0 : 1;
  if (mismatch)
    b = a;
  for (let i = 0; i < a.length; i += 1)
    mismatch |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return mismatch === 0;
};
var unseal = async (_crypto, sealed, password, options) => {
  if (!password)
    throw new Error("Empty password");
  const opts = clone(options);
  const now = Date.now() + (opts.localtimeOffsetMsec || 0);
  const parts = sealed.split("*");
  if (parts.length !== 8)
    throw new Error("Incorrect number of sealed components");
  const prefix = parts[0];
  let passwordId = parts[1];
  const encryptionSalt = parts[2];
  const encryptionIv = parts[3];
  const encryptedB64 = parts[4];
  const expiration = parts[5];
  const hmacSalt = parts[6];
  const hmac = parts[7];
  const macBaseString = `${prefix}*${passwordId}*${encryptionSalt}*${encryptionIv}*${encryptedB64}*${expiration}`;
  if (macPrefix !== prefix)
    throw new Error("Wrong mac prefix");
  if (expiration) {
    if (!/^\d+$/.test(expiration))
      throw new Error("Invalid expiration");
    const exp = Number.parseInt(expiration, 10);
    if (exp <= now - opts.timestampSkewSec * 1e3)
      throw new Error("Expired seal");
  }
  let pass = "";
  passwordId = passwordId || "default";
  if (typeof password === "string" || password instanceof Uint8Array)
    pass = password;
  else if (passwordId in password) {
    pass = password[passwordId];
  } else {
    throw new Error(`Cannot find password: ${passwordId}`);
  }
  pass = normalizePassword(pass);
  const macOptions = opts.integrity;
  macOptions.salt = hmacSalt;
  const mac = await hmacWithPassword(_crypto, pass.integrity, macOptions, macBaseString);
  if (!fixedTimeComparison(mac.digest, hmac))
    throw new Error("Bad hmac value");
  const encrypted = base64urlDecode(encryptedB64);
  const decryptOptions = opts.encryption;
  decryptOptions.salt = encryptionSalt;
  decryptOptions.iv = base64urlDecode(encryptionIv);
  const decrypted = await decrypt(_crypto, pass.encryption, decryptOptions, encrypted);
  if (decrypted)
    return JSON.parse(decrypted);
  return null;
};

function o$1(n){throw new Error(`${n} is not implemented yet!`)}let i$2 = class i extends EventEmitter{__unenv__={};readableEncoding=null;readableEnded=true;readableFlowing=false;readableHighWaterMark=0;readableLength=0;readableObjectMode=false;readableAborted=false;readableDidRead=false;closed=false;errored=null;readable=false;destroyed=false;static from(e,t){return new i(t)}constructor(e){super();}_read(e){}read(e){}setEncoding(e){return this}pause(){return this}resume(){return this}isPaused(){return  true}unpipe(e){return this}unshift(e,t){}wrap(e){return this}push(e,t){return  false}_destroy(e,t){this.removeAllListeners();}destroy(e){return this.destroyed=true,this._destroy(e),this}pipe(e,t){return {}}compose(e,t){throw new Error("Method not implemented.")}[Symbol.asyncDispose](){return this.destroy(),Promise.resolve()}async*[Symbol.asyncIterator](){throw o$1("Readable.asyncIterator")}iterator(e){throw o$1("Readable.iterator")}map(e,t){throw o$1("Readable.map")}filter(e,t){throw o$1("Readable.filter")}forEach(e,t){throw o$1("Readable.forEach")}reduce(e,t,r){throw o$1("Readable.reduce")}find(e,t){throw o$1("Readable.find")}findIndex(e,t){throw o$1("Readable.findIndex")}some(e,t){throw o$1("Readable.some")}toArray(e){throw o$1("Readable.toArray")}every(e,t){throw o$1("Readable.every")}flatMap(e,t){throw o$1("Readable.flatMap")}drop(e,t){throw o$1("Readable.drop")}take(e,t){throw o$1("Readable.take")}asIndexedPairs(e){throw o$1("Readable.asIndexedPairs")}};let l$2 = class l extends EventEmitter{__unenv__={};writable=true;writableEnded=false;writableFinished=false;writableHighWaterMark=0;writableLength=0;writableObjectMode=false;writableCorked=0;closed=false;errored=null;writableNeedDrain=false;writableAborted=false;destroyed=false;_data;_encoding="utf8";constructor(e){super();}pipe(e,t){return {}}_write(e,t,r){if(this.writableEnded){r&&r();return}if(this._data===void 0)this._data=e;else {const s=typeof this._data=="string"?Buffer$1.from(this._data,this._encoding||t||"utf8"):this._data,a=typeof e=="string"?Buffer$1.from(e,t||this._encoding||"utf8"):e;this._data=Buffer$1.concat([s,a]);}this._encoding=t,r&&r();}_writev(e,t){}_destroy(e,t){}_final(e){}write(e,t,r){const s=typeof t=="string"?this._encoding:"utf8",a=typeof t=="function"?t:typeof r=="function"?r:void 0;return this._write(e,s,a),true}setDefaultEncoding(e){return this}end(e,t,r){const s=typeof e=="function"?e:typeof t=="function"?t:typeof r=="function"?r:void 0;if(this.writableEnded)return s&&s(),this;const a=e===s?void 0:e;if(a){const u=t===s?void 0:t;this.write(a,u);}return this.writableEnded=true,this.writableFinished=true,this.emit("close"),this.emit("finish"),s&&s(),this}cork(){}uncork(){}destroy(e){return this.destroyed=true,delete this._data,this.removeAllListeners(),this}compose(e,t){throw new Error("Method not implemented.")}[Symbol.asyncDispose](){return Promise.resolve()}};const c=class{allowHalfOpen=true;_destroy;constructor(e=new i$2,t=new l$2){Object.assign(this,e),Object.assign(this,t),this._destroy=m$2(e._destroy,t._destroy);}};function _$1(){return Object.assign(c.prototype,i$2.prototype),Object.assign(c.prototype,l$2.prototype),c}function m$2(...n){return function(...e){for(const t of n)t(...e);}}const g$1=_$1();let A$2 = class A extends g$1{__unenv__={};bufferSize=0;bytesRead=0;bytesWritten=0;connecting=false;destroyed=false;pending=false;localAddress="";localPort=0;remoteAddress="";remoteFamily="";remotePort=0;autoSelectFamilyAttemptedAddresses=[];readyState="readOnly";constructor(e){super();}write(e,t,r){return  false}connect(e,t,r){return this}end(e,t,r){return this}setEncoding(e){return this}pause(){return this}resume(){return this}setTimeout(e,t){return this}setNoDelay(e){return this}setKeepAlive(e,t){return this}address(){return {}}unref(){return this}ref(){return this}destroySoon(){this.destroy();}resetAndDestroy(){const e=new Error("ERR_SOCKET_CLOSED");return e.code="ERR_SOCKET_CLOSED",this.destroy(e),this}};class y extends i$2{aborted=false;httpVersion="1.1";httpVersionMajor=1;httpVersionMinor=1;complete=true;connection;socket;headers={};trailers={};method="GET";url="/";statusCode=200;statusMessage="";closed=false;errored=null;readable=false;constructor(e){super(),this.socket=this.connection=e||new A$2;}get rawHeaders(){const e=this.headers,t=[];for(const r in e)if(Array.isArray(e[r]))for(const s of e[r])t.push(r,s);else t.push(r,e[r]);return t}get rawTrailers(){return []}setTimeout(e,t){return this}get headersDistinct(){return p$2(this.headers)}get trailersDistinct(){return p$2(this.trailers)}}function p$2(n){const e={};for(const[t,r]of Object.entries(n))t&&(e[t]=(Array.isArray(r)?r:[r]).filter(Boolean));return e}let w$1 = class w extends l$2{statusCode=200;statusMessage="";upgrading=false;chunkedEncoding=false;shouldKeepAlive=false;useChunkedEncodingByDefault=false;sendDate=false;finished=false;headersSent=false;strictContentLength=false;connection=null;socket=null;req;_headers={};constructor(e){super(),this.req=e;}assignSocket(e){e._httpMessage=this,this.socket=e,this.connection=e,this.emit("socket",e),this._flush();}_flush(){this.flushHeaders();}detachSocket(e){}writeContinue(e){}writeHead(e,t,r){e&&(this.statusCode=e),typeof t=="string"&&(this.statusMessage=t,t=void 0);const s=r||t;if(s&&!Array.isArray(s))for(const a in s)this.setHeader(a,s[a]);return this.headersSent=true,this}writeProcessing(){}setTimeout(e,t){return this}appendHeader(e,t){e=e.toLowerCase();const r=this._headers[e],s=[...Array.isArray(r)?r:[r],...Array.isArray(t)?t:[t]].filter(Boolean);return this._headers[e]=s.length>1?s:s[0],this}setHeader(e,t){return this._headers[e.toLowerCase()]=t,this}setHeaders(e){for(const[t,r]of Object.entries(e))this.setHeader(t,r);return this}getHeader(e){return this._headers[e.toLowerCase()]}getHeaders(){return this._headers}getHeaderNames(){return Object.keys(this._headers)}hasHeader(e){return e.toLowerCase()in this._headers}removeHeader(e){delete this._headers[e.toLowerCase()];}addTrailers(e){}flushHeaders(){}writeEarlyHints(e,t){typeof t=="function"&&t();}};const E$2=(()=>{const n=function(){};return n.prototype=Object.create(null),n})();function R$1(n={}){const e=new E$2,t=Array.isArray(n)||H(n)?n:Object.entries(n);for(const[r,s]of t)if(s){if(e[r]===void 0){e[r]=s;continue}e[r]=[...Array.isArray(e[r])?e[r]:[e[r]],...Array.isArray(s)?s:[s]];}return e}function H(n){return typeof n?.entries=="function"}function v$2(n={}){if(n instanceof Headers)return n;const e=new Headers;for(const[t,r]of Object.entries(n))if(r!==void 0){if(Array.isArray(r)){for(const s of r)e.append(t,String(s));continue}e.set(t,String(r));}return e}const S$1=new Set([101,204,205,304]);async function b$1(n,e){const t=new y,r=new w$1(t);t.url=e.url?.toString()||"/";let s;if(!t.url.startsWith("/")){const d=new URL(t.url);s=d.host,t.url=d.pathname+d.search+d.hash;}t.method=e.method||"GET",t.headers=R$1(e.headers||{}),t.headers.host||(t.headers.host=e.host||s||"localhost"),t.connection.encrypted=t.connection.encrypted||e.protocol==="https",t.body=e.body||null,t.__unenv__=e.context,await n(t,r);let a=r._data;(S$1.has(r.statusCode)||t.method.toUpperCase()==="HEAD")&&(a=null,delete r._headers["content-length"]);const u={status:r.statusCode,statusText:r.statusMessage,headers:r._headers,body:a};return t.destroy(),r.destroy(),u}async function C$1(n,e,t={}){try{const r=await b$1(n,{url:e,...t});return new Response(r.body,{status:r.status,statusText:r.statusText,headers:v$2(r.headers)})}catch(r){return new Response(r.toString(),{status:Number.parseInt(r.statusCode||r.code)||500,statusText:r.statusText})}}

function useBase(base, handler) {
  base = withoutTrailingSlash(base);
  if (!base || base === "/") {
    return handler;
  }
  return eventHandler(async (event) => {
    event.node.req.originalUrl = event.node.req.originalUrl || event.node.req.url || "/";
    const _path = event._path || event.node.req.url || "/";
    event._path = withoutBase(event.path || "/", base);
    event.node.req.url = event._path;
    try {
      return await handler(event);
    } finally {
      event._path = event.node.req.url = _path;
    }
  });
}

function hasProp(obj, prop) {
  try {
    return prop in obj;
  } catch {
    return false;
  }
}

class H3Error extends Error {
  static __h3_error__ = true;
  statusCode = 500;
  fatal = false;
  unhandled = false;
  statusMessage;
  data;
  cause;
  constructor(message, opts = {}) {
    super(message, opts);
    if (opts.cause && !this.cause) {
      this.cause = opts.cause;
    }
  }
  toJSON() {
    const obj = {
      message: this.message,
      statusCode: sanitizeStatusCode(this.statusCode, 500)
    };
    if (this.statusMessage) {
      obj.statusMessage = sanitizeStatusMessage(this.statusMessage);
    }
    if (this.data !== void 0) {
      obj.data = this.data;
    }
    return obj;
  }
}
function createError$1(input) {
  if (typeof input === "string") {
    return new H3Error(input);
  }
  if (isError(input)) {
    return input;
  }
  const err = new H3Error(input.message ?? input.statusMessage ?? "", {
    cause: input.cause || input
  });
  if (hasProp(input, "stack")) {
    try {
      Object.defineProperty(err, "stack", {
        get() {
          return input.stack;
        }
      });
    } catch {
      try {
        err.stack = input.stack;
      } catch {
      }
    }
  }
  if (input.data) {
    err.data = input.data;
  }
  if (input.statusCode) {
    err.statusCode = sanitizeStatusCode(input.statusCode, err.statusCode);
  } else if (input.status) {
    err.statusCode = sanitizeStatusCode(input.status, err.statusCode);
  }
  if (input.statusMessage) {
    err.statusMessage = input.statusMessage;
  } else if (input.statusText) {
    err.statusMessage = input.statusText;
  }
  if (err.statusMessage) {
    const originalMessage = err.statusMessage;
    const sanitizedMessage = sanitizeStatusMessage(err.statusMessage);
    if (sanitizedMessage !== originalMessage) {
      console.warn(
        "[h3] Please prefer using `message` for longer error messages instead of `statusMessage`. In the future, `statusMessage` will be sanitized by default."
      );
    }
  }
  if (input.fatal !== void 0) {
    err.fatal = input.fatal;
  }
  if (input.unhandled !== void 0) {
    err.unhandled = input.unhandled;
  }
  return err;
}
function sendError(event, error, debug) {
  if (event.handled) {
    return;
  }
  const h3Error = isError(error) ? error : createError$1(error);
  const responseBody = {
    statusCode: h3Error.statusCode,
    statusMessage: h3Error.statusMessage,
    stack: [],
    data: h3Error.data
  };
  if (debug) {
    responseBody.stack = (h3Error.stack || "").split("\n").map((l) => l.trim());
  }
  if (event.handled) {
    return;
  }
  const _code = Number.parseInt(h3Error.statusCode);
  setResponseStatus(event, _code, h3Error.statusMessage);
  event.node.res.setHeader("content-type", MIMES.json);
  event.node.res.end(JSON.stringify(responseBody, void 0, 2));
}
function isError(input) {
  return input?.constructor?.__h3_error__ === true;
}

async function validateData(data, fn) {
  try {
    const res = await fn(data);
    if (res === false) {
      throw createValidationError();
    }
    if (res === true) {
      return data;
    }
    return res ?? data;
  } catch (error) {
    throw createValidationError(error);
  }
}
function createValidationError(validateError) {
  throw createError$1({
    status: 400,
    statusMessage: "Validation Error",
    message: validateError?.message || "Validation Error",
    data: validateError
  });
}

function getQuery(event) {
  return getQuery$1(event.path || "");
}
function getRouterParams(event, opts = {}) {
  let params = event.context.params || {};
  if (opts.decode) {
    params = { ...params };
    for (const key in params) {
      params[key] = decode$1(params[key]);
    }
  }
  return params;
}
function getRouterParam(event, name, opts = {}) {
  const params = getRouterParams(event, opts);
  return params[name];
}
function isMethod(event, expected, allowHead) {
  if (typeof expected === "string") {
    if (event.method === expected) {
      return true;
    }
  } else if (expected.includes(event.method)) {
    return true;
  }
  return false;
}
function assertMethod(event, expected, allowHead) {
  if (!isMethod(event, expected)) {
    throw createError$1({
      statusCode: 405,
      statusMessage: "HTTP method is not allowed."
    });
  }
}
function getRequestHeaders(event) {
  const _headers = {};
  for (const key in event.node.req.headers) {
    const val = event.node.req.headers[key];
    _headers[key] = Array.isArray(val) ? val.filter(Boolean).join(", ") : val;
  }
  return _headers;
}
function getRequestHeader(event, name) {
  const headers = getRequestHeaders(event);
  const value = headers[name.toLowerCase()];
  return value;
}
const getHeader = getRequestHeader;
function getRequestHost(event, opts = {}) {
  if (opts.xForwardedHost) {
    const _header = event.node.req.headers["x-forwarded-host"];
    const xForwardedHost = (_header || "").split(",").shift()?.trim();
    if (xForwardedHost) {
      return xForwardedHost;
    }
  }
  return event.node.req.headers.host || "localhost";
}
function getRequestProtocol(event, opts = {}) {
  if (opts.xForwardedProto !== false && event.node.req.headers["x-forwarded-proto"] === "https") {
    return "https";
  }
  return event.node.req.connection?.encrypted ? "https" : "http";
}
function getRequestURL(event, opts = {}) {
  const host = getRequestHost(event, opts);
  const protocol = getRequestProtocol(event, opts);
  const path = (event.node.req.originalUrl || event.path).replace(
    /^[/\\]+/g,
    "/"
  );
  return new URL(path, `${protocol}://${host}`);
}

const RawBodySymbol = Symbol.for("h3RawBody");
const ParsedBodySymbol = Symbol.for("h3ParsedBody");
const PayloadMethods$1 = ["PATCH", "POST", "PUT", "DELETE"];
function readRawBody(event, encoding = "utf8") {
  assertMethod(event, PayloadMethods$1);
  const _rawBody = event._requestBody || event.web?.request?.body || event.node.req[RawBodySymbol] || event.node.req.rawBody || event.node.req.body;
  if (_rawBody) {
    const promise2 = Promise.resolve(_rawBody).then((_resolved) => {
      if (Buffer.isBuffer(_resolved)) {
        return _resolved;
      }
      if (typeof _resolved.pipeTo === "function") {
        return new Promise((resolve, reject) => {
          const chunks = [];
          _resolved.pipeTo(
            new WritableStream({
              write(chunk) {
                chunks.push(chunk);
              },
              close() {
                resolve(Buffer.concat(chunks));
              },
              abort(reason) {
                reject(reason);
              }
            })
          ).catch(reject);
        });
      } else if (typeof _resolved.pipe === "function") {
        return new Promise((resolve, reject) => {
          const chunks = [];
          _resolved.on("data", (chunk) => {
            chunks.push(chunk);
          }).on("end", () => {
            resolve(Buffer.concat(chunks));
          }).on("error", reject);
        });
      }
      if (_resolved.constructor === Object) {
        return Buffer.from(JSON.stringify(_resolved));
      }
      if (_resolved instanceof URLSearchParams) {
        return Buffer.from(_resolved.toString());
      }
      if (_resolved instanceof FormData) {
        return new Response(_resolved).bytes().then((uint8arr) => Buffer.from(uint8arr));
      }
      return Buffer.from(_resolved);
    });
    return encoding ? promise2.then((buff) => buff.toString(encoding)) : promise2;
  }
  if (!Number.parseInt(event.node.req.headers["content-length"] || "") && !/\bchunked\b/i.test(
    String(event.node.req.headers["transfer-encoding"] ?? "")
  )) {
    return Promise.resolve(void 0);
  }
  const promise = event.node.req[RawBodySymbol] = new Promise(
    (resolve, reject) => {
      const bodyData = [];
      event.node.req.on("error", (err) => {
        reject(err);
      }).on("data", (chunk) => {
        bodyData.push(chunk);
      }).on("end", () => {
        resolve(Buffer.concat(bodyData));
      });
    }
  );
  const result = encoding ? promise.then((buff) => buff.toString(encoding)) : promise;
  return result;
}
async function readBody(event, options = {}) {
  const request = event.node.req;
  if (hasProp(request, ParsedBodySymbol)) {
    return request[ParsedBodySymbol];
  }
  const contentType = request.headers["content-type"] || "";
  const body = await readRawBody(event);
  let parsed;
  if (contentType === "application/json") {
    parsed = _parseJSON(body, options.strict ?? true);
  } else if (contentType.startsWith("application/x-www-form-urlencoded")) {
    parsed = _parseURLEncodedBody(body);
  } else if (contentType.startsWith("text/")) {
    parsed = body;
  } else {
    parsed = _parseJSON(body, options.strict ?? false);
  }
  request[ParsedBodySymbol] = parsed;
  return parsed;
}
async function readValidatedBody(event, validate) {
  const _body = await readBody(event, { strict: true });
  return validateData(_body, validate);
}
function getRequestWebStream(event) {
  if (!PayloadMethods$1.includes(event.method)) {
    return;
  }
  const bodyStream = event.web?.request?.body || event._requestBody;
  if (bodyStream) {
    return bodyStream;
  }
  const _hasRawBody = RawBodySymbol in event.node.req || "rawBody" in event.node.req || "body" in event.node.req || "__unenv__" in event.node.req;
  if (_hasRawBody) {
    return new ReadableStream({
      async start(controller) {
        const _rawBody = await readRawBody(event, false);
        if (_rawBody) {
          controller.enqueue(_rawBody);
        }
        controller.close();
      }
    });
  }
  return new ReadableStream({
    start: (controller) => {
      event.node.req.on("data", (chunk) => {
        controller.enqueue(chunk);
      });
      event.node.req.on("end", () => {
        controller.close();
      });
      event.node.req.on("error", (err) => {
        controller.error(err);
      });
    }
  });
}
function _parseJSON(body = "", strict) {
  if (!body) {
    return void 0;
  }
  try {
    return destr(body, { strict });
  } catch {
    throw createError$1({
      statusCode: 400,
      statusMessage: "Bad Request",
      message: "Invalid JSON body"
    });
  }
}
function _parseURLEncodedBody(body) {
  const form = new URLSearchParams(body);
  const parsedForm = /* @__PURE__ */ Object.create(null);
  for (const [key, value] of form.entries()) {
    if (hasProp(parsedForm, key)) {
      if (!Array.isArray(parsedForm[key])) {
        parsedForm[key] = [parsedForm[key]];
      }
      parsedForm[key].push(value);
    } else {
      parsedForm[key] = value;
    }
  }
  return parsedForm;
}

function handleCacheHeaders(event, opts) {
  const cacheControls = ["public", ...opts.cacheControls || []];
  let cacheMatched = false;
  if (opts.maxAge !== void 0) {
    cacheControls.push(`max-age=${+opts.maxAge}`, `s-maxage=${+opts.maxAge}`);
  }
  if (opts.modifiedTime) {
    const modifiedTime = new Date(opts.modifiedTime);
    const ifModifiedSince = event.node.req.headers["if-modified-since"];
    event.node.res.setHeader("last-modified", modifiedTime.toUTCString());
    if (ifModifiedSince && new Date(ifModifiedSince) >= modifiedTime) {
      cacheMatched = true;
    }
  }
  if (opts.etag) {
    event.node.res.setHeader("etag", opts.etag);
    const ifNonMatch = event.node.req.headers["if-none-match"];
    if (ifNonMatch === opts.etag) {
      cacheMatched = true;
    }
  }
  event.node.res.setHeader("cache-control", cacheControls.join(", "));
  if (cacheMatched) {
    event.node.res.statusCode = 304;
    if (!event.handled) {
      event.node.res.end();
    }
    return true;
  }
  return false;
}

const MIMES = {
  html: "text/html",
  json: "application/json"
};

const DISALLOWED_STATUS_CHARS = /[^\u0009\u0020-\u007E]/g;
function sanitizeStatusMessage(statusMessage = "") {
  return statusMessage.replace(DISALLOWED_STATUS_CHARS, "");
}
function sanitizeStatusCode(statusCode, defaultStatusCode = 200) {
  if (!statusCode) {
    return defaultStatusCode;
  }
  if (typeof statusCode === "string") {
    statusCode = Number.parseInt(statusCode, 10);
  }
  if (statusCode < 100 || statusCode > 999) {
    return defaultStatusCode;
  }
  return statusCode;
}

function getDistinctCookieKey(name, opts) {
  return [name, opts.domain || "", opts.path || "/"].join(";");
}
function setCookie(event, name, value, serializeOptions = {}) {
  if (!serializeOptions.path) {
    serializeOptions = { path: "/", ...serializeOptions };
  }
  const newCookie = serialize$2(name, value, serializeOptions);
  const currentCookies = splitCookiesString(
    event.node.res.getHeader("set-cookie")
  );
  if (currentCookies.length === 0) {
    event.node.res.setHeader("set-cookie", newCookie);
    return;
  }
  const newCookieKey = getDistinctCookieKey(name, serializeOptions);
  event.node.res.removeHeader("set-cookie");
  for (const cookie of currentCookies) {
    const parsed = parseSetCookie(cookie);
    const key = getDistinctCookieKey(parsed.name, parsed);
    if (key === newCookieKey) {
      continue;
    }
    event.node.res.appendHeader("set-cookie", cookie);
  }
  event.node.res.appendHeader("set-cookie", newCookie);
}
function splitCookiesString(cookiesString) {
  if (Array.isArray(cookiesString)) {
    return cookiesString.flatMap((c) => splitCookiesString(c));
  }
  if (typeof cookiesString !== "string") {
    return [];
  }
  const cookiesStrings = [];
  let pos = 0;
  let start;
  let ch;
  let lastComma;
  let nextStart;
  let cookiesSeparatorFound;
  const skipWhitespace = () => {
    while (pos < cookiesString.length && /\s/.test(cookiesString.charAt(pos))) {
      pos += 1;
    }
    return pos < cookiesString.length;
  };
  const notSpecialChar = () => {
    ch = cookiesString.charAt(pos);
    return ch !== "=" && ch !== ";" && ch !== ",";
  };
  while (pos < cookiesString.length) {
    start = pos;
    cookiesSeparatorFound = false;
    while (skipWhitespace()) {
      ch = cookiesString.charAt(pos);
      if (ch === ",") {
        lastComma = pos;
        pos += 1;
        skipWhitespace();
        nextStart = pos;
        while (pos < cookiesString.length && notSpecialChar()) {
          pos += 1;
        }
        if (pos < cookiesString.length && cookiesString.charAt(pos) === "=") {
          cookiesSeparatorFound = true;
          pos = nextStart;
          cookiesStrings.push(cookiesString.slice(start, lastComma));
          start = pos;
        } else {
          pos = lastComma + 1;
        }
      } else {
        pos += 1;
      }
    }
    if (!cookiesSeparatorFound || pos >= cookiesString.length) {
      cookiesStrings.push(cookiesString.slice(start));
    }
  }
  return cookiesStrings;
}

const defer = typeof setImmediate === "undefined" ? (fn) => fn() : setImmediate;
function send(event, data, type) {
  if (type) {
    defaultContentType(event, type);
  }
  return new Promise((resolve) => {
    defer(() => {
      if (!event.handled) {
        event.node.res.end(data);
      }
      resolve();
    });
  });
}
function sendNoContent(event, code) {
  if (event.handled) {
    return;
  }
  if (!code && event.node.res.statusCode !== 200) {
    code = event.node.res.statusCode;
  }
  const _code = sanitizeStatusCode(code, 204);
  if (_code === 204) {
    event.node.res.removeHeader("content-length");
  }
  event.node.res.writeHead(_code);
  event.node.res.end();
}
function setResponseStatus(event, code, text) {
  if (code) {
    event.node.res.statusCode = sanitizeStatusCode(
      code,
      event.node.res.statusCode
    );
  }
  if (text) {
    event.node.res.statusMessage = sanitizeStatusMessage(text);
  }
}
function getResponseStatus(event) {
  return event.node.res.statusCode;
}
function getResponseStatusText(event) {
  return event.node.res.statusMessage;
}
function defaultContentType(event, type) {
  if (type && event.node.res.statusCode !== 304 && !event.node.res.getHeader("content-type")) {
    event.node.res.setHeader("content-type", type);
  }
}
function sendRedirect(event, location, code = 302) {
  event.node.res.statusCode = sanitizeStatusCode(
    code,
    event.node.res.statusCode
  );
  event.node.res.setHeader("location", location);
  const encodedLoc = location.replace(/"/g, "%22");
  const html = `<!DOCTYPE html><html><head><meta http-equiv="refresh" content="0; url=${encodedLoc}"></head></html>`;
  return send(event, html, MIMES.html);
}
function getResponseHeader(event, name) {
  return event.node.res.getHeader(name);
}
function setResponseHeaders(event, headers) {
  for (const [name, value] of Object.entries(headers)) {
    event.node.res.setHeader(
      name,
      value
    );
  }
}
const setHeaders = setResponseHeaders;
function setResponseHeader(event, name, value) {
  event.node.res.setHeader(name, value);
}
const setHeader = setResponseHeader;
function appendResponseHeader(event, name, value) {
  let current = event.node.res.getHeader(name);
  if (!current) {
    event.node.res.setHeader(name, value);
    return;
  }
  if (!Array.isArray(current)) {
    current = [current.toString()];
  }
  event.node.res.setHeader(name, [...current, value]);
}
function removeResponseHeader(event, name) {
  return event.node.res.removeHeader(name);
}
function isStream(data) {
  if (!data || typeof data !== "object") {
    return false;
  }
  if (typeof data.pipe === "function") {
    if (typeof data._read === "function") {
      return true;
    }
    if (typeof data.abort === "function") {
      return true;
    }
  }
  if (typeof data.pipeTo === "function") {
    return true;
  }
  return false;
}
function isWebResponse(data) {
  return typeof Response !== "undefined" && data instanceof Response;
}
function sendStream(event, stream) {
  if (!stream || typeof stream !== "object") {
    throw new Error("[h3] Invalid stream provided.");
  }
  event.node.res._data = stream;
  if (!event.node.res.socket) {
    event._handled = true;
    return Promise.resolve();
  }
  if (hasProp(stream, "pipeTo") && typeof stream.pipeTo === "function") {
    return stream.pipeTo(
      new WritableStream({
        write(chunk) {
          event.node.res.write(chunk);
        }
      })
    ).then(() => {
      event.node.res.end();
    });
  }
  if (hasProp(stream, "pipe") && typeof stream.pipe === "function") {
    return new Promise((resolve, reject) => {
      stream.pipe(event.node.res);
      if (stream.on) {
        stream.on("end", () => {
          event.node.res.end();
          resolve();
        });
        stream.on("error", (error) => {
          reject(error);
        });
      }
      event.node.res.on("close", () => {
        if (stream.abort) {
          stream.abort();
        }
      });
    });
  }
  throw new Error("[h3] Invalid or incompatible stream provided.");
}
function sendWebResponse(event, response) {
  for (const [key, value] of response.headers) {
    if (key === "set-cookie") {
      event.node.res.appendHeader(key, splitCookiesString(value));
    } else {
      event.node.res.setHeader(key, value);
    }
  }
  if (response.status) {
    event.node.res.statusCode = sanitizeStatusCode(
      response.status,
      event.node.res.statusCode
    );
  }
  if (response.statusText) {
    event.node.res.statusMessage = sanitizeStatusMessage(response.statusText);
  }
  if (response.redirected) {
    event.node.res.setHeader("location", response.url);
  }
  if (!response.body) {
    event.node.res.end();
    return;
  }
  return sendStream(event, response.body);
}

const PayloadMethods = /* @__PURE__ */ new Set(["PATCH", "POST", "PUT", "DELETE"]);
const ignoredHeaders = /* @__PURE__ */ new Set([
  "transfer-encoding",
  "accept-encoding",
  "connection",
  "keep-alive",
  "upgrade",
  "expect",
  "host",
  "accept"
]);
async function proxyRequest(event, target, opts = {}) {
  let body;
  let duplex;
  if (PayloadMethods.has(event.method)) {
    if (opts.streamRequest) {
      body = getRequestWebStream(event);
      duplex = "half";
    } else {
      body = await readRawBody(event, false).catch(() => void 0);
    }
  }
  const method = opts.fetchOptions?.method || event.method;
  const fetchHeaders = mergeHeaders$1(
    getProxyRequestHeaders(event, { host: target.startsWith("/") }),
    opts.fetchOptions?.headers,
    opts.headers
  );
  return sendProxy(event, target, {
    ...opts,
    fetchOptions: {
      method,
      body,
      duplex,
      ...opts.fetchOptions,
      headers: fetchHeaders
    }
  });
}
async function sendProxy(event, target, opts = {}) {
  let response;
  try {
    response = await _getFetch(opts.fetch)(target, {
      headers: opts.headers,
      ignoreResponseError: true,
      // make $ofetch.raw transparent
      ...opts.fetchOptions
    });
  } catch (error) {
    throw createError$1({
      status: 502,
      statusMessage: "Bad Gateway",
      cause: error
    });
  }
  event.node.res.statusCode = sanitizeStatusCode(
    response.status,
    event.node.res.statusCode
  );
  event.node.res.statusMessage = sanitizeStatusMessage(response.statusText);
  const cookies = [];
  for (const [key, value] of response.headers.entries()) {
    if (key === "content-encoding") {
      continue;
    }
    if (key === "content-length") {
      continue;
    }
    if (key === "set-cookie") {
      cookies.push(...splitCookiesString(value));
      continue;
    }
    event.node.res.setHeader(key, value);
  }
  if (cookies.length > 0) {
    event.node.res.setHeader(
      "set-cookie",
      cookies.map((cookie) => {
        if (opts.cookieDomainRewrite) {
          cookie = rewriteCookieProperty(
            cookie,
            opts.cookieDomainRewrite,
            "domain"
          );
        }
        if (opts.cookiePathRewrite) {
          cookie = rewriteCookieProperty(
            cookie,
            opts.cookiePathRewrite,
            "path"
          );
        }
        return cookie;
      })
    );
  }
  if (opts.onResponse) {
    await opts.onResponse(event, response);
  }
  if (response._data !== void 0) {
    return response._data;
  }
  if (event.handled) {
    return;
  }
  if (opts.sendStream === false) {
    const data = new Uint8Array(await response.arrayBuffer());
    return event.node.res.end(data);
  }
  if (response.body) {
    for await (const chunk of response.body) {
      event.node.res.write(chunk);
    }
  }
  return event.node.res.end();
}
function getProxyRequestHeaders(event, opts) {
  const headers = /* @__PURE__ */ Object.create(null);
  const reqHeaders = getRequestHeaders(event);
  for (const name in reqHeaders) {
    if (!ignoredHeaders.has(name) || name === "host" && opts?.host) {
      headers[name] = reqHeaders[name];
    }
  }
  return headers;
}
function fetchWithEvent(event, req, init, options) {
  return _getFetch(options?.fetch)(req, {
    ...init,
    context: init?.context || event.context,
    headers: {
      ...getProxyRequestHeaders(event, {
        host: typeof req === "string" && req.startsWith("/")
      }),
      ...init?.headers
    }
  });
}
function _getFetch(_fetch) {
  if (_fetch) {
    return _fetch;
  }
  if (globalThis.fetch) {
    return globalThis.fetch;
  }
  throw new Error(
    "fetch is not available. Try importing `node-fetch-native/polyfill` for Node.js."
  );
}
function rewriteCookieProperty(header, map, property) {
  const _map = typeof map === "string" ? { "*": map } : map;
  return header.replace(
    new RegExp(`(;\\s*${property}=)([^;]+)`, "gi"),
    (match, prefix, previousValue) => {
      let newValue;
      if (previousValue in _map) {
        newValue = _map[previousValue];
      } else if ("*" in _map) {
        newValue = _map["*"];
      } else {
        return match;
      }
      return newValue ? prefix + newValue : "";
    }
  );
}
function mergeHeaders$1(defaults, ...inputs) {
  const _inputs = inputs.filter(Boolean);
  if (_inputs.length === 0) {
    return defaults;
  }
  const merged = new Headers(defaults);
  for (const input of _inputs) {
    const entries = Array.isArray(input) ? input : typeof input.entries === "function" ? input.entries() : Object.entries(input);
    for (const [key, value] of entries) {
      if (value !== void 0) {
        merged.set(key, value);
      }
    }
  }
  return merged;
}

const getSessionPromise = Symbol("getSession");
const DEFAULT_NAME = "h3";
const DEFAULT_COOKIE = {
  path: "/",
  secure: true,
  httpOnly: true
};
async function useSession(event, config) {
  const sessionName = config.name || DEFAULT_NAME;
  await getSession(event, config);
  const sessionManager = {
    get id() {
      return event.context.sessions?.[sessionName]?.id;
    },
    get data() {
      return event.context.sessions?.[sessionName]?.data || {};
    },
    update: async (update) => {
      if (!isEvent(event)) {
        throw new Error("[h3] Cannot update read-only session.");
      }
      await updateSession(event, config, update);
      return sessionManager;
    },
    clear: () => {
      if (!isEvent(event)) {
        throw new Error("[h3] Cannot clear read-only session.");
      }
      clearSession(event, config);
      return Promise.resolve(sessionManager);
    }
  };
  return sessionManager;
}
async function getSession(event, config) {
  const sessionName = config.name || DEFAULT_NAME;
  if (!event.context.sessions) {
    event.context.sessions = /* @__PURE__ */ Object.create(null);
  }
  const existingSession = event.context.sessions[sessionName];
  if (existingSession) {
    return existingSession[getSessionPromise] || existingSession;
  }
  const session = {
    id: "",
    createdAt: 0,
    data: /* @__PURE__ */ Object.create(null)
  };
  event.context.sessions[sessionName] = session;
  let sealedSession;
  if (config.sessionHeader !== false) {
    const headerName = typeof config.sessionHeader === "string" ? config.sessionHeader.toLowerCase() : `x-${sessionName.toLowerCase()}-session`;
    const headerValue = _getReqHeader(event, headerName);
    if (typeof headerValue === "string") {
      sealedSession = headerValue;
    }
  }
  if (!sealedSession) {
    const cookieHeader = _getReqHeader(event, "cookie");
    if (cookieHeader) {
      sealedSession = parse(cookieHeader + "")[sessionName];
    }
  }
  if (sealedSession) {
    const promise = unsealSession(event, config, sealedSession).catch(() => {
    }).then((unsealed) => {
      Object.assign(session, unsealed);
      delete event.context.sessions[sessionName][getSessionPromise];
      return session;
    });
    event.context.sessions[sessionName][getSessionPromise] = promise;
    await promise;
  }
  if (!session.id) {
    if (!isEvent(event)) {
      throw new Error(
        "Cannot initialize a new session. Make sure using `useSession(event)` in main handler."
      );
    }
    session.id = config.generateId?.() ?? (config.crypto || _crypto).randomUUID();
    session.createdAt = Date.now();
    await updateSession(event, config);
  }
  return session;
}
function _getReqHeader(event, name) {
  if (event.node) {
    return event.node?.req.headers[name];
  }
  if (event.request) {
    return event.request.headers?.get(name);
  }
  if (event.headers) {
    return event.headers.get(name);
  }
}
async function updateSession(event, config, update) {
  const sessionName = config.name || DEFAULT_NAME;
  const session = event.context.sessions?.[sessionName] || await getSession(event, config);
  if (typeof update === "function") {
    update = update(session.data);
  }
  if (update) {
    Object.assign(session.data, update);
  }
  if (config.cookie !== false) {
    const sealed = await sealSession(event, config);
    setCookie(event, sessionName, sealed, {
      ...DEFAULT_COOKIE,
      expires: config.maxAge ? new Date(session.createdAt + config.maxAge * 1e3) : void 0,
      ...config.cookie
    });
  }
  return session;
}
async function sealSession(event, config) {
  const sessionName = config.name || DEFAULT_NAME;
  const session = event.context.sessions?.[sessionName] || await getSession(event, config);
  const sealed = await seal(
    config.crypto || _crypto,
    session,
    config.password,
    {
      ...defaults,
      ttl: config.maxAge ? config.maxAge * 1e3 : 0,
      ...config.seal
    }
  );
  return sealed;
}
async function unsealSession(_event, config, sealed) {
  const unsealed = await unseal(
    config.crypto || _crypto,
    sealed,
    config.password,
    {
      ...defaults,
      ttl: config.maxAge ? config.maxAge * 1e3 : 0,
      ...config.seal
    }
  );
  if (config.maxAge) {
    const age = Date.now() - (unsealed.createdAt || Number.NEGATIVE_INFINITY);
    if (age > config.maxAge * 1e3) {
      throw new Error("Session expired!");
    }
  }
  return unsealed;
}
function clearSession(event, config) {
  const sessionName = config.name || DEFAULT_NAME;
  if (event.context.sessions?.[sessionName]) {
    delete event.context.sessions[sessionName];
  }
  setCookie(event, sessionName, "", {
    ...DEFAULT_COOKIE,
    ...config.cookie
  });
  return Promise.resolve();
}

class H3Event {
  "__is_event__" = true;
  // Context
  node;
  // Node
  web;
  // Web
  context = {};
  // Shared
  // Request
  _method;
  _path;
  _headers;
  _requestBody;
  // Response
  _handled = false;
  // Hooks
  _onBeforeResponseCalled;
  _onAfterResponseCalled;
  constructor(req, res) {
    this.node = { req, res };
  }
  // --- Request ---
  get method() {
    if (!this._method) {
      this._method = (this.node.req.method || "GET").toUpperCase();
    }
    return this._method;
  }
  get path() {
    return this._path || this.node.req.url || "/";
  }
  get headers() {
    if (!this._headers) {
      this._headers = _normalizeNodeHeaders(this.node.req.headers);
    }
    return this._headers;
  }
  // --- Respoonse ---
  get handled() {
    return this._handled || this.node.res.writableEnded || this.node.res.headersSent;
  }
  respondWith(response) {
    return Promise.resolve(response).then(
      (_response) => sendWebResponse(this, _response)
    );
  }
  // --- Utils ---
  toString() {
    return `[${this.method}] ${this.path}`;
  }
  toJSON() {
    return this.toString();
  }
  // --- Deprecated ---
  /** @deprecated Please use `event.node.req` instead. */
  get req() {
    return this.node.req;
  }
  /** @deprecated Please use `event.node.res` instead. */
  get res() {
    return this.node.res;
  }
}
function isEvent(input) {
  return hasProp(input, "__is_event__");
}
function createEvent(req, res) {
  return new H3Event(req, res);
}
function _normalizeNodeHeaders(nodeHeaders) {
  const headers = new Headers();
  for (const [name, value] of Object.entries(nodeHeaders)) {
    if (Array.isArray(value)) {
      for (const item of value) {
        headers.append(name, item);
      }
    } else if (value) {
      headers.set(name, value);
    }
  }
  return headers;
}

function defineEventHandler(handler) {
  if (typeof handler === "function") {
    handler.__is_handler__ = true;
    return handler;
  }
  const _hooks = {
    onRequest: _normalizeArray(handler.onRequest),
    onBeforeResponse: _normalizeArray(handler.onBeforeResponse)
  };
  const _handler = (event) => {
    return _callHandler(event, handler.handler, _hooks);
  };
  _handler.__is_handler__ = true;
  _handler.__resolve__ = handler.handler.__resolve__;
  _handler.__websocket__ = handler.websocket;
  return _handler;
}
function _normalizeArray(input) {
  return input ? Array.isArray(input) ? input : [input] : void 0;
}
async function _callHandler(event, handler, hooks) {
  if (hooks.onRequest) {
    for (const hook of hooks.onRequest) {
      await hook(event);
      if (event.handled) {
        return;
      }
    }
  }
  const body = await handler(event);
  const response = { body };
  if (hooks.onBeforeResponse) {
    for (const hook of hooks.onBeforeResponse) {
      await hook(event, response);
    }
  }
  return response.body;
}
const eventHandler = defineEventHandler;
function isEventHandler(input) {
  return hasProp(input, "__is_handler__");
}
function toEventHandler(input, _, _route) {
  return input;
}
function defineLazyEventHandler(factory) {
  let _promise;
  let _resolved;
  const resolveHandler = () => {
    if (_resolved) {
      return Promise.resolve(_resolved);
    }
    if (!_promise) {
      _promise = Promise.resolve(factory()).then((r) => {
        const handler2 = r.default || r;
        if (typeof handler2 !== "function") {
          throw new TypeError(
            "Invalid lazy handler result. It should be a function:",
            handler2
          );
        }
        _resolved = { handler: toEventHandler(r.default || r) };
        return _resolved;
      });
    }
    return _promise;
  };
  const handler = eventHandler((event) => {
    if (_resolved) {
      return _resolved.handler(event);
    }
    return resolveHandler().then((r) => r.handler(event));
  });
  handler.__resolve__ = resolveHandler;
  return handler;
}
const lazyEventHandler = defineLazyEventHandler;

function createApp(options = {}) {
  const stack = [];
  const handler = createAppEventHandler(stack, options);
  const resolve = createResolver(stack);
  handler.__resolve__ = resolve;
  const getWebsocket = cachedFn(() => websocketOptions(resolve, options));
  const app = {
    // @ts-expect-error
    use: (arg1, arg2, arg3) => use(app, arg1, arg2, arg3),
    resolve,
    handler,
    stack,
    options,
    get websocket() {
      return getWebsocket();
    }
  };
  return app;
}
function use(app, arg1, arg2, arg3) {
  if (Array.isArray(arg1)) {
    for (const i of arg1) {
      use(app, i, arg2, arg3);
    }
  } else if (Array.isArray(arg2)) {
    for (const i of arg2) {
      use(app, arg1, i, arg3);
    }
  } else if (typeof arg1 === "string") {
    app.stack.push(
      normalizeLayer({ ...arg3, route: arg1, handler: arg2 })
    );
  } else if (typeof arg1 === "function") {
    app.stack.push(normalizeLayer({ ...arg2, handler: arg1 }));
  } else {
    app.stack.push(normalizeLayer({ ...arg1 }));
  }
  return app;
}
function createAppEventHandler(stack, options) {
  const spacing = options.debug ? 2 : void 0;
  return eventHandler(async (event) => {
    event.node.req.originalUrl = event.node.req.originalUrl || event.node.req.url || "/";
    const _rawReqUrl = event.node.req.url || "/";
    const _reqPath = _decodePath(event._path || _rawReqUrl);
    event._path = _reqPath;
    const _needsRawUrl = _reqPath !== _rawReqUrl;
    let _layerPath;
    if (options.onRequest) {
      await options.onRequest(event);
    }
    for (const layer of stack) {
      if (layer.route.length > 1) {
        if (!_reqPath.startsWith(layer.route)) {
          continue;
        }
        _layerPath = _reqPath.slice(layer.route.length) || "/";
      } else {
        _layerPath = _reqPath;
      }
      if (layer.match && !layer.match(_layerPath, event)) {
        continue;
      }
      event._path = _layerPath;
      event.node.req.url = _needsRawUrl ? layer.route.length > 1 ? _rawReqUrl.slice(layer.route.length) || "/" : _rawReqUrl : _layerPath;
      const val = await layer.handler(event);
      const _body = val === void 0 ? void 0 : await val;
      if (_body !== void 0) {
        const _response = { body: _body };
        if (options.onBeforeResponse) {
          event._onBeforeResponseCalled = true;
          await options.onBeforeResponse(event, _response);
        }
        await handleHandlerResponse(event, _response.body, spacing);
        if (options.onAfterResponse) {
          event._onAfterResponseCalled = true;
          await options.onAfterResponse(event, _response);
        }
        return;
      }
      if (event.handled) {
        if (options.onAfterResponse) {
          event._onAfterResponseCalled = true;
          await options.onAfterResponse(event, void 0);
        }
        return;
      }
    }
    if (!event.handled) {
      throw createError$1({
        statusCode: 404,
        statusMessage: `Cannot find any path matching ${event.path || "/"}.`
      });
    }
    if (options.onAfterResponse) {
      event._onAfterResponseCalled = true;
      await options.onAfterResponse(event, void 0);
    }
  });
}
function createResolver(stack) {
  return async (path) => {
    let _layerPath;
    for (const layer of stack) {
      if (layer.route === "/" && !layer.handler.__resolve__) {
        continue;
      }
      if (!path.startsWith(layer.route)) {
        continue;
      }
      _layerPath = path.slice(layer.route.length) || "/";
      if (layer.match && !layer.match(_layerPath, void 0)) {
        continue;
      }
      let res = { route: layer.route, handler: layer.handler };
      if (res.handler.__resolve__) {
        const _res = await res.handler.__resolve__(_layerPath);
        if (!_res) {
          continue;
        }
        res = {
          ...res,
          ..._res,
          route: joinURL(res.route || "/", _res.route || "/")
        };
      }
      return res;
    }
  };
}
function normalizeLayer(input) {
  let handler = input.handler;
  if (handler.handler) {
    handler = handler.handler;
  }
  if (input.lazy) {
    handler = lazyEventHandler(handler);
  } else if (!isEventHandler(handler)) {
    handler = toEventHandler(handler, void 0, input.route);
  }
  return {
    route: withoutTrailingSlash(input.route),
    match: input.match,
    handler
  };
}
function handleHandlerResponse(event, val, jsonSpace) {
  if (val === null) {
    return sendNoContent(event);
  }
  if (val) {
    if (isWebResponse(val)) {
      return sendWebResponse(event, val);
    }
    if (isStream(val)) {
      return sendStream(event, val);
    }
    if (val.buffer) {
      return send(event, val);
    }
    if (val.arrayBuffer && typeof val.arrayBuffer === "function") {
      return val.arrayBuffer().then((arrayBuffer) => {
        return send(event, Buffer.from(arrayBuffer), val.type);
      });
    }
    if (val instanceof Error) {
      throw createError$1(val);
    }
    if (typeof val.end === "function") {
      return true;
    }
  }
  const valType = typeof val;
  if (valType === "string") {
    return send(event, val, MIMES.html);
  }
  if (valType === "object" || valType === "boolean" || valType === "number") {
    return send(event, JSON.stringify(val, void 0, jsonSpace), MIMES.json);
  }
  if (valType === "bigint") {
    return send(event, val.toString(), MIMES.json);
  }
  throw createError$1({
    statusCode: 500,
    statusMessage: `[h3] Cannot send ${valType} as response.`
  });
}
function cachedFn(fn) {
  let cache;
  return () => {
    if (!cache) {
      cache = fn();
    }
    return cache;
  };
}
function _decodePath(url) {
  const qIndex = url.indexOf("?");
  const path = qIndex === -1 ? url : url.slice(0, qIndex);
  const query = qIndex === -1 ? "" : url.slice(qIndex);
  const decodedPath = path.includes("%25") ? decodePath(path.replace(/%25/g, "%2525")) : decodePath(path);
  return decodedPath + query;
}
function websocketOptions(evResolver, appOptions) {
  return {
    ...appOptions.websocket,
    async resolve(info) {
      const url = info.request?.url || info.url || "/";
      const { pathname } = typeof url === "string" ? parseURL(url) : url;
      const resolved = await evResolver(pathname);
      return resolved?.handler?.__websocket__ || {};
    }
  };
}

const RouterMethods = [
  "connect",
  "delete",
  "get",
  "head",
  "options",
  "post",
  "put",
  "trace",
  "patch"
];
function createRouter(opts = {}) {
  const _router = createRouter$1({});
  const routes = {};
  let _matcher;
  const router = {};
  const addRoute = (path, handler, method) => {
    let route = routes[path];
    if (!route) {
      routes[path] = route = { path, handlers: {} };
      _router.insert(path, route);
    }
    if (Array.isArray(method)) {
      for (const m of method) {
        addRoute(path, handler, m);
      }
    } else {
      route.handlers[method] = toEventHandler(handler);
    }
    return router;
  };
  router.use = router.add = (path, handler, method) => addRoute(path, handler, method || "all");
  for (const method of RouterMethods) {
    router[method] = (path, handle) => router.add(path, handle, method);
  }
  const matchHandler = (path = "/", method = "get") => {
    const qIndex = path.indexOf("?");
    if (qIndex !== -1) {
      path = path.slice(0, Math.max(0, qIndex));
    }
    const matched = _router.lookup(path);
    if (!matched || !matched.handlers) {
      return {
        error: createError$1({
          statusCode: 404,
          name: "Not Found",
          statusMessage: `Cannot find any route matching ${path || "/"}.`
        })
      };
    }
    let handler = matched.handlers[method] || matched.handlers.all;
    if (!handler) {
      if (!_matcher) {
        _matcher = toRouteMatcher(_router);
      }
      const _matches = _matcher.matchAll(path).reverse();
      for (const _match of _matches) {
        if (_match.handlers[method]) {
          handler = _match.handlers[method];
          matched.handlers[method] = matched.handlers[method] || handler;
          break;
        }
        if (_match.handlers.all) {
          handler = _match.handlers.all;
          matched.handlers.all = matched.handlers.all || handler;
          break;
        }
      }
    }
    if (!handler) {
      return {
        error: createError$1({
          statusCode: 405,
          name: "Method Not Allowed",
          statusMessage: `Method ${method} is not allowed on this route.`
        })
      };
    }
    return { matched, handler };
  };
  const isPreemptive = opts.preemptive || opts.preemtive;
  router.handler = eventHandler((event) => {
    const match = matchHandler(
      event.path,
      event.method.toLowerCase()
    );
    if ("error" in match) {
      if (isPreemptive) {
        throw match.error;
      } else {
        return;
      }
    }
    event.context.matchedRoute = match.matched;
    const params = match.matched.params || {};
    event.context.params = params;
    return Promise.resolve(match.handler(event)).then((res) => {
      if (res === void 0 && isPreemptive) {
        return null;
      }
      return res;
    });
  });
  router.handler.__resolve__ = async (path) => {
    path = withLeadingSlash(path);
    const match = matchHandler(path);
    if ("error" in match) {
      return;
    }
    let res = {
      route: match.matched.path,
      handler: match.handler
    };
    if (match.handler.__resolve__) {
      const _res = await match.handler.__resolve__(path);
      if (!_res) {
        return;
      }
      res = { ...res, ..._res };
    }
    return res;
  };
  return router;
}
function toNodeListener(app) {
  const toNodeHandle = async function(req, res) {
    const event = createEvent(req, res);
    try {
      await app.handler(event);
    } catch (_error) {
      const error = createError$1(_error);
      if (!isError(_error)) {
        error.unhandled = true;
      }
      setResponseStatus(event, error.statusCode, error.statusMessage);
      if (app.options.onError) {
        await app.options.onError(error, event);
      }
      if (event.handled) {
        return;
      }
      if (error.unhandled || error.fatal) {
        console.error("[h3]", error.fatal ? "[fatal]" : "[unhandled]", error);
      }
      if (app.options.onBeforeResponse && !event._onBeforeResponseCalled) {
        await app.options.onBeforeResponse(event, { body: error });
      }
      await sendError(event, error, !!app.options.debug);
      if (app.options.onAfterResponse && !event._onAfterResponseCalled) {
        await app.options.onAfterResponse(event, { body: error });
      }
    }
  };
  return toNodeHandle;
}

function flatHooks$1(configHooks, hooks = {}, parentName) {
  for (const key in configHooks) {
    const subHook = configHooks[key];
    const name = parentName ? `${parentName}:${key}` : key;
    if (typeof subHook === "object" && subHook !== null) {
      flatHooks$1(subHook, hooks, name);
    } else if (typeof subHook === "function") {
      hooks[name] = subHook;
    }
  }
  return hooks;
}
const defaultTask = { run: (function_) => function_() };
const _createTask = () => defaultTask;
const createTask$1 = typeof console.createTask !== "undefined" ? console.createTask : _createTask;
function serialTaskCaller$1(hooks, args) {
  const name = args.shift();
  const task = createTask$1(name);
  return hooks.reduce(
    (promise, hookFunction) => promise.then(() => task.run(() => hookFunction(...args))),
    Promise.resolve()
  );
}
function parallelTaskCaller$1(hooks, args) {
  const name = args.shift();
  const task = createTask$1(name);
  return Promise.all(hooks.map((hook) => task.run(() => hook(...args))));
}
function callEachWith$1(callbacks, arg0) {
  for (const callback of [...callbacks]) {
    callback(arg0);
  }
}

let Hookable$1 = class Hookable {
  constructor() {
    this._hooks = {};
    this._before = void 0;
    this._after = void 0;
    this._deprecatedMessages = void 0;
    this._deprecatedHooks = {};
    this.hook = this.hook.bind(this);
    this.callHook = this.callHook.bind(this);
    this.callHookWith = this.callHookWith.bind(this);
  }
  hook(name, function_, options = {}) {
    if (!name || typeof function_ !== "function") {
      return () => {
      };
    }
    const originalName = name;
    let dep;
    while (this._deprecatedHooks[name]) {
      dep = this._deprecatedHooks[name];
      name = dep.to;
    }
    if (dep && !options.allowDeprecated) {
      let message = dep.message;
      if (!message) {
        message = `${originalName} hook has been deprecated` + (dep.to ? `, please use ${dep.to}` : "");
      }
      if (!this._deprecatedMessages) {
        this._deprecatedMessages = /* @__PURE__ */ new Set();
      }
      if (!this._deprecatedMessages.has(message)) {
        console.warn(message);
        this._deprecatedMessages.add(message);
      }
    }
    if (!function_.name) {
      try {
        Object.defineProperty(function_, "name", {
          get: () => "_" + name.replace(/\W+/g, "_") + "_hook_cb",
          configurable: true
        });
      } catch {
      }
    }
    this._hooks[name] = this._hooks[name] || [];
    this._hooks[name].push(function_);
    return () => {
      if (function_) {
        this.removeHook(name, function_);
        function_ = void 0;
      }
    };
  }
  hookOnce(name, function_) {
    let _unreg;
    let _function = (...arguments_) => {
      if (typeof _unreg === "function") {
        _unreg();
      }
      _unreg = void 0;
      _function = void 0;
      return function_(...arguments_);
    };
    _unreg = this.hook(name, _function);
    return _unreg;
  }
  removeHook(name, function_) {
    if (this._hooks[name]) {
      const index = this._hooks[name].indexOf(function_);
      if (index !== -1) {
        this._hooks[name].splice(index, 1);
      }
      if (this._hooks[name].length === 0) {
        delete this._hooks[name];
      }
    }
  }
  deprecateHook(name, deprecated) {
    this._deprecatedHooks[name] = typeof deprecated === "string" ? { to: deprecated } : deprecated;
    const _hooks = this._hooks[name] || [];
    delete this._hooks[name];
    for (const hook of _hooks) {
      this.hook(name, hook);
    }
  }
  deprecateHooks(deprecatedHooks) {
    Object.assign(this._deprecatedHooks, deprecatedHooks);
    for (const name in deprecatedHooks) {
      this.deprecateHook(name, deprecatedHooks[name]);
    }
  }
  addHooks(configHooks) {
    const hooks = flatHooks$1(configHooks);
    const removeFns = Object.keys(hooks).map(
      (key) => this.hook(key, hooks[key])
    );
    return () => {
      for (const unreg of removeFns.splice(0, removeFns.length)) {
        unreg();
      }
    };
  }
  removeHooks(configHooks) {
    const hooks = flatHooks$1(configHooks);
    for (const key in hooks) {
      this.removeHook(key, hooks[key]);
    }
  }
  removeAllHooks() {
    for (const key in this._hooks) {
      delete this._hooks[key];
    }
  }
  callHook(name, ...arguments_) {
    arguments_.unshift(name);
    return this.callHookWith(serialTaskCaller$1, name, ...arguments_);
  }
  callHookParallel(name, ...arguments_) {
    arguments_.unshift(name);
    return this.callHookWith(parallelTaskCaller$1, name, ...arguments_);
  }
  callHookWith(caller, name, ...arguments_) {
    const event = this._before || this._after ? { name, args: arguments_, context: {} } : void 0;
    if (this._before) {
      callEachWith$1(this._before, event);
    }
    const result = caller(
      name in this._hooks ? [...this._hooks[name]] : [],
      arguments_
    );
    if (result instanceof Promise) {
      return result.finally(() => {
        if (this._after && event) {
          callEachWith$1(this._after, event);
        }
      });
    }
    if (this._after && event) {
      callEachWith$1(this._after, event);
    }
    return result;
  }
  beforeEach(function_) {
    this._before = this._before || [];
    this._before.push(function_);
    return () => {
      if (this._before !== void 0) {
        const index = this._before.indexOf(function_);
        if (index !== -1) {
          this._before.splice(index, 1);
        }
      }
    };
  }
  afterEach(function_) {
    this._after = this._after || [];
    this._after.push(function_);
    return () => {
      if (this._after !== void 0) {
        const index = this._after.indexOf(function_);
        if (index !== -1) {
          this._after.splice(index, 1);
        }
      }
    };
  }
};
function createHooks$1() {
  return new Hookable$1();
}

const s=globalThis.Headers,i$1=globalThis.AbortController,l$1=globalThis.fetch||(()=>{throw new Error("[node-fetch-native] Failed to fetch: `globalThis.fetch` is not available!")});

class FetchError extends Error {
  constructor(message, opts) {
    super(message, opts);
    this.name = "FetchError";
    if (opts?.cause && !this.cause) {
      this.cause = opts.cause;
    }
  }
}
function createFetchError(ctx) {
  const errorMessage = ctx.error?.message || ctx.error?.toString() || "";
  const method = ctx.request?.method || ctx.options?.method || "GET";
  const url = ctx.request?.url || String(ctx.request) || "/";
  const requestStr = `[${method}] ${JSON.stringify(url)}`;
  const statusStr = ctx.response ? `${ctx.response.status} ${ctx.response.statusText}` : "<no response>";
  const message = `${requestStr}: ${statusStr}${errorMessage ? ` ${errorMessage}` : ""}`;
  const fetchError = new FetchError(
    message,
    ctx.error ? { cause: ctx.error } : void 0
  );
  for (const key of ["request", "options", "response"]) {
    Object.defineProperty(fetchError, key, {
      get() {
        return ctx[key];
      }
    });
  }
  for (const [key, refKey] of [
    ["data", "_data"],
    ["status", "status"],
    ["statusCode", "status"],
    ["statusText", "statusText"],
    ["statusMessage", "statusText"]
  ]) {
    Object.defineProperty(fetchError, key, {
      get() {
        return ctx.response && ctx.response[refKey];
      }
    });
  }
  return fetchError;
}

const payloadMethods = new Set(
  Object.freeze(["PATCH", "POST", "PUT", "DELETE"])
);
function isPayloadMethod(method = "GET") {
  return payloadMethods.has(method.toUpperCase());
}
function isJSONSerializable(value) {
  if (value === void 0) {
    return false;
  }
  const t = typeof value;
  if (t === "string" || t === "number" || t === "boolean" || t === null) {
    return true;
  }
  if (t !== "object") {
    return false;
  }
  if (Array.isArray(value)) {
    return true;
  }
  if (value.buffer) {
    return false;
  }
  if (value instanceof FormData || value instanceof URLSearchParams) {
    return false;
  }
  return value.constructor && value.constructor.name === "Object" || typeof value.toJSON === "function";
}
const textTypes = /* @__PURE__ */ new Set([
  "image/svg",
  "application/xml",
  "application/xhtml",
  "application/html"
]);
const JSON_RE = /^application\/(?:[\w!#$%&*.^`~-]*\+)?json(;.+)?$/i;
function detectResponseType(_contentType = "") {
  if (!_contentType) {
    return "json";
  }
  const contentType = _contentType.split(";").shift() || "";
  if (JSON_RE.test(contentType)) {
    return "json";
  }
  if (contentType === "text/event-stream") {
    return "stream";
  }
  if (textTypes.has(contentType) || contentType.startsWith("text/")) {
    return "text";
  }
  return "blob";
}
function resolveFetchOptions(request, input, defaults, Headers) {
  const headers = mergeHeaders(
    input?.headers ?? request?.headers,
    defaults?.headers,
    Headers
  );
  let query;
  if (defaults?.query || defaults?.params || input?.params || input?.query) {
    query = {
      ...defaults?.params,
      ...defaults?.query,
      ...input?.params,
      ...input?.query
    };
  }
  return {
    ...defaults,
    ...input,
    query,
    params: query,
    headers
  };
}
function mergeHeaders(input, defaults, Headers) {
  if (!defaults) {
    return new Headers(input);
  }
  const headers = new Headers(defaults);
  if (input) {
    for (const [key, value] of Symbol.iterator in input || Array.isArray(input) ? input : new Headers(input)) {
      headers.set(key, value);
    }
  }
  return headers;
}
async function callHooks$1(context, hooks) {
  if (hooks) {
    if (Array.isArray(hooks)) {
      for (const hook of hooks) {
        await hook(context);
      }
    } else {
      await hooks(context);
    }
  }
}

const retryStatusCodes = /* @__PURE__ */ new Set([
  408,
  // Request Timeout
  409,
  // Conflict
  425,
  // Too Early (Experimental)
  429,
  // Too Many Requests
  500,
  // Internal Server Error
  502,
  // Bad Gateway
  503,
  // Service Unavailable
  504
  // Gateway Timeout
]);
const nullBodyResponses = /* @__PURE__ */ new Set([101, 204, 205, 304]);
function createFetch(globalOptions = {}) {
  const {
    fetch = globalThis.fetch,
    Headers = globalThis.Headers,
    AbortController = globalThis.AbortController
  } = globalOptions;
  async function onError(context) {
    const isAbort = context.error && context.error.name === "AbortError" && !context.options.timeout || false;
    if (context.options.retry !== false && !isAbort) {
      let retries;
      if (typeof context.options.retry === "number") {
        retries = context.options.retry;
      } else {
        retries = isPayloadMethod(context.options.method) ? 0 : 1;
      }
      const responseCode = context.response && context.response.status || 500;
      if (retries > 0 && (Array.isArray(context.options.retryStatusCodes) ? context.options.retryStatusCodes.includes(responseCode) : retryStatusCodes.has(responseCode))) {
        const retryDelay = typeof context.options.retryDelay === "function" ? context.options.retryDelay(context) : context.options.retryDelay || 0;
        if (retryDelay > 0) {
          await new Promise((resolve) => setTimeout(resolve, retryDelay));
        }
        return $fetchRaw(context.request, {
          ...context.options,
          retry: retries - 1
        });
      }
    }
    const error = createFetchError(context);
    if (Error.captureStackTrace) {
      Error.captureStackTrace(error, $fetchRaw);
    }
    throw error;
  }
  const $fetchRaw = async function $fetchRaw2(_request, _options = {}) {
    const context = {
      request: _request,
      options: resolveFetchOptions(
        _request,
        _options,
        globalOptions.defaults,
        Headers
      ),
      response: void 0,
      error: void 0
    };
    if (context.options.method) {
      context.options.method = context.options.method.toUpperCase();
    }
    if (context.options.onRequest) {
      await callHooks$1(context, context.options.onRequest);
      if (!(context.options.headers instanceof Headers)) {
        context.options.headers = new Headers(
          context.options.headers || {}
          /* compat */
        );
      }
    }
    if (typeof context.request === "string") {
      if (context.options.baseURL) {
        context.request = withBase(context.request, context.options.baseURL);
      }
      if (context.options.query) {
        context.request = withQuery(context.request, context.options.query);
        delete context.options.query;
      }
      if ("query" in context.options) {
        delete context.options.query;
      }
      if ("params" in context.options) {
        delete context.options.params;
      }
    }
    if (context.options.body && isPayloadMethod(context.options.method)) {
      if (isJSONSerializable(context.options.body)) {
        const contentType = context.options.headers.get("content-type");
        if (typeof context.options.body !== "string") {
          context.options.body = contentType === "application/x-www-form-urlencoded" ? new URLSearchParams(
            context.options.body
          ).toString() : JSON.stringify(context.options.body);
        }
        if (!contentType) {
          context.options.headers.set("content-type", "application/json");
        }
        if (!context.options.headers.has("accept")) {
          context.options.headers.set("accept", "application/json");
        }
      } else if (
        // ReadableStream Body
        "pipeTo" in context.options.body && typeof context.options.body.pipeTo === "function" || // Node.js Stream Body
        typeof context.options.body.pipe === "function"
      ) {
        if (!("duplex" in context.options)) {
          context.options.duplex = "half";
        }
      }
    }
    let abortTimeout;
    if (!context.options.signal && context.options.timeout) {
      const controller = new AbortController();
      abortTimeout = setTimeout(() => {
        const error = new Error(
          "[TimeoutError]: The operation was aborted due to timeout"
        );
        error.name = "TimeoutError";
        error.code = 23;
        controller.abort(error);
      }, context.options.timeout);
      context.options.signal = controller.signal;
    }
    try {
      context.response = await fetch(
        context.request,
        context.options
      );
    } catch (error) {
      context.error = error;
      if (context.options.onRequestError) {
        await callHooks$1(
          context,
          context.options.onRequestError
        );
      }
      return await onError(context);
    } finally {
      if (abortTimeout) {
        clearTimeout(abortTimeout);
      }
    }
    const hasBody = (context.response.body || // https://github.com/unjs/ofetch/issues/324
    // https://github.com/unjs/ofetch/issues/294
    // https://github.com/JakeChampion/fetch/issues/1454
    context.response._bodyInit) && !nullBodyResponses.has(context.response.status) && context.options.method !== "HEAD";
    if (hasBody) {
      const responseType = (context.options.parseResponse ? "json" : context.options.responseType) || detectResponseType(context.response.headers.get("content-type") || "");
      switch (responseType) {
        case "json": {
          const data = await context.response.text();
          const parseFunction = context.options.parseResponse || destr;
          context.response._data = parseFunction(data);
          break;
        }
        case "stream": {
          context.response._data = context.response.body || context.response._bodyInit;
          break;
        }
        default: {
          context.response._data = await context.response[responseType]();
        }
      }
    }
    if (context.options.onResponse) {
      await callHooks$1(
        context,
        context.options.onResponse
      );
    }
    if (!context.options.ignoreResponseError && context.response.status >= 400 && context.response.status < 600) {
      if (context.options.onResponseError) {
        await callHooks$1(
          context,
          context.options.onResponseError
        );
      }
      return await onError(context);
    }
    return context.response;
  };
  const $fetch = async function $fetch2(request, options) {
    const r = await $fetchRaw(request, options);
    return r._data;
  };
  $fetch.raw = $fetchRaw;
  $fetch.native = (...args) => fetch(...args);
  $fetch.create = (defaultOptions = {}, customGlobalOptions = {}) => createFetch({
    ...globalOptions,
    ...customGlobalOptions,
    defaults: {
      ...globalOptions.defaults,
      ...customGlobalOptions.defaults,
      ...defaultOptions
    }
  });
  return $fetch;
}

function createNodeFetch() {
  const useKeepAlive = JSON.parse(process.env.FETCH_KEEP_ALIVE || "false");
  if (!useKeepAlive) {
    return l$1;
  }
  const agentOptions = { keepAlive: true };
  const httpAgent = new http.Agent(agentOptions);
  const httpsAgent = new https.Agent(agentOptions);
  const nodeFetchOptions = {
    agent(parsedURL) {
      return parsedURL.protocol === "http:" ? httpAgent : httpsAgent;
    }
  };
  return function nodeFetchWithKeepAlive(input, init) {
    return l$1(input, { ...nodeFetchOptions, ...init });
  };
}
const fetch$1 = globalThis.fetch ? (...args) => globalThis.fetch(...args) : createNodeFetch();
const Headers$1 = globalThis.Headers || s;
const AbortController = globalThis.AbortController || i$1;
const ofetch = createFetch({ fetch: fetch$1, Headers: Headers$1, AbortController });
const $fetch$1 = ofetch;

function wrapToPromise(value) {
  if (!value || typeof value.then !== "function") {
    return Promise.resolve(value);
  }
  return value;
}
function asyncCall(function_, ...arguments_) {
  try {
    return wrapToPromise(function_(...arguments_));
  } catch (error) {
    return Promise.reject(error);
  }
}
function isPrimitive(value) {
  const type = typeof value;
  return value === null || type !== "object" && type !== "function";
}
function isPureObject(value) {
  const proto = Object.getPrototypeOf(value);
  return !proto || proto.isPrototypeOf(Object);
}
function stringify(value) {
  if (isPrimitive(value)) {
    return String(value);
  }
  if (isPureObject(value) || Array.isArray(value)) {
    return JSON.stringify(value);
  }
  if (typeof value.toJSON === "function") {
    return stringify(value.toJSON());
  }
  throw new Error("[unstorage] Cannot stringify value!");
}
const BASE64_PREFIX = "base64:";
function serializeRaw(value) {
  if (typeof value === "string") {
    return value;
  }
  return BASE64_PREFIX + base64Encode(value);
}
function deserializeRaw(value) {
  if (typeof value !== "string") {
    return value;
  }
  if (!value.startsWith(BASE64_PREFIX)) {
    return value;
  }
  return base64Decode(value.slice(BASE64_PREFIX.length));
}
function base64Decode(input) {
  if (globalThis.Buffer) {
    return Buffer.from(input, "base64");
  }
  return Uint8Array.from(
    globalThis.atob(input),
    (c) => c.codePointAt(0)
  );
}
function base64Encode(input) {
  if (globalThis.Buffer) {
    return Buffer.from(input).toString("base64");
  }
  return globalThis.btoa(String.fromCodePoint(...input));
}

const storageKeyProperties = [
  "has",
  "hasItem",
  "get",
  "getItem",
  "getItemRaw",
  "set",
  "setItem",
  "setItemRaw",
  "del",
  "remove",
  "removeItem",
  "getMeta",
  "setMeta",
  "removeMeta",
  "getKeys",
  "clear",
  "mount",
  "unmount"
];
function prefixStorage(storage, base) {
  base = normalizeBaseKey(base);
  if (!base) {
    return storage;
  }
  const nsStorage = { ...storage };
  for (const property of storageKeyProperties) {
    nsStorage[property] = (key = "", ...args) => (
      // @ts-ignore
      storage[property](base + key, ...args)
    );
  }
  nsStorage.getKeys = (key = "", ...arguments_) => storage.getKeys(base + key, ...arguments_).then((keys) => keys.map((key2) => key2.slice(base.length)));
  nsStorage.keys = nsStorage.getKeys;
  nsStorage.getItems = async (items, commonOptions) => {
    const prefixedItems = items.map(
      (item) => typeof item === "string" ? base + item : { ...item, key: base + item.key }
    );
    const results = await storage.getItems(prefixedItems, commonOptions);
    return results.map((entry) => ({
      key: entry.key.slice(base.length),
      value: entry.value
    }));
  };
  nsStorage.setItems = async (items, commonOptions) => {
    const prefixedItems = items.map((item) => ({
      key: base + item.key,
      value: item.value,
      options: item.options
    }));
    return storage.setItems(prefixedItems, commonOptions);
  };
  return nsStorage;
}
function normalizeKey$1(key) {
  if (!key) {
    return "";
  }
  return key.split("?")[0]?.replace(/[/\\]/g, ":").replace(/:+/g, ":").replace(/^:|:$/g, "") || "";
}
function joinKeys(...keys) {
  return normalizeKey$1(keys.join(":"));
}
function normalizeBaseKey(base) {
  base = normalizeKey$1(base);
  return base ? base + ":" : "";
}
function filterKeyByDepth(key, depth) {
  if (depth === void 0) {
    return true;
  }
  let substrCount = 0;
  let index = key.indexOf(":");
  while (index > -1) {
    substrCount++;
    index = key.indexOf(":", index + 1);
  }
  return substrCount <= depth;
}
function filterKeyByBase(key, base) {
  if (base) {
    return key.startsWith(base) && key[key.length - 1] !== "$";
  }
  return key[key.length - 1] !== "$";
}

function defineDriver$1(factory) {
  return factory;
}

const DRIVER_NAME$1 = "memory";
const memory = defineDriver$1(() => {
  const data = /* @__PURE__ */ new Map();
  return {
    name: DRIVER_NAME$1,
    getInstance: () => data,
    hasItem(key) {
      return data.has(key);
    },
    getItem(key) {
      return data.get(key) ?? null;
    },
    getItemRaw(key) {
      return data.get(key) ?? null;
    },
    setItem(key, value) {
      data.set(key, value);
    },
    setItemRaw(key, value) {
      data.set(key, value);
    },
    removeItem(key) {
      data.delete(key);
    },
    getKeys() {
      return [...data.keys()];
    },
    clear() {
      data.clear();
    },
    dispose() {
      data.clear();
    }
  };
});

function createStorage(options = {}) {
  const context = {
    mounts: { "": options.driver || memory() },
    mountpoints: [""],
    watching: false,
    watchListeners: [],
    unwatch: {}
  };
  const getMount = (key) => {
    for (const base of context.mountpoints) {
      if (key.startsWith(base)) {
        return {
          base,
          relativeKey: key.slice(base.length),
          driver: context.mounts[base]
        };
      }
    }
    return {
      base: "",
      relativeKey: key,
      driver: context.mounts[""]
    };
  };
  const getMounts = (base, includeParent) => {
    return context.mountpoints.filter(
      (mountpoint) => mountpoint.startsWith(base) || includeParent && base.startsWith(mountpoint)
    ).map((mountpoint) => ({
      relativeBase: base.length > mountpoint.length ? base.slice(mountpoint.length) : void 0,
      mountpoint,
      driver: context.mounts[mountpoint]
    }));
  };
  const onChange = (event, key) => {
    if (!context.watching) {
      return;
    }
    key = normalizeKey$1(key);
    for (const listener of context.watchListeners) {
      listener(event, key);
    }
  };
  const startWatch = async () => {
    if (context.watching) {
      return;
    }
    context.watching = true;
    for (const mountpoint in context.mounts) {
      context.unwatch[mountpoint] = await watch(
        context.mounts[mountpoint],
        onChange,
        mountpoint
      );
    }
  };
  const stopWatch = async () => {
    if (!context.watching) {
      return;
    }
    for (const mountpoint in context.unwatch) {
      await context.unwatch[mountpoint]();
    }
    context.unwatch = {};
    context.watching = false;
  };
  const runBatch = (items, commonOptions, cb) => {
    const batches = /* @__PURE__ */ new Map();
    const getBatch = (mount) => {
      let batch = batches.get(mount.base);
      if (!batch) {
        batch = {
          driver: mount.driver,
          base: mount.base,
          items: []
        };
        batches.set(mount.base, batch);
      }
      return batch;
    };
    for (const item of items) {
      const isStringItem = typeof item === "string";
      const key = normalizeKey$1(isStringItem ? item : item.key);
      const value = isStringItem ? void 0 : item.value;
      const options2 = isStringItem || !item.options ? commonOptions : { ...commonOptions, ...item.options };
      const mount = getMount(key);
      getBatch(mount).items.push({
        key,
        value,
        relativeKey: mount.relativeKey,
        options: options2
      });
    }
    return Promise.all([...batches.values()].map((batch) => cb(batch))).then(
      (r) => r.flat()
    );
  };
  const storage = {
    // Item
    hasItem(key, opts = {}) {
      key = normalizeKey$1(key);
      const { relativeKey, driver } = getMount(key);
      return asyncCall(driver.hasItem, relativeKey, opts);
    },
    getItem(key, opts = {}) {
      key = normalizeKey$1(key);
      const { relativeKey, driver } = getMount(key);
      return asyncCall(driver.getItem, relativeKey, opts).then(
        (value) => destr(value)
      );
    },
    getItems(items, commonOptions = {}) {
      return runBatch(items, commonOptions, (batch) => {
        if (batch.driver.getItems) {
          return asyncCall(
            batch.driver.getItems,
            batch.items.map((item) => ({
              key: item.relativeKey,
              options: item.options
            })),
            commonOptions
          ).then(
            (r) => r.map((item) => ({
              key: joinKeys(batch.base, item.key),
              value: destr(item.value)
            }))
          );
        }
        return Promise.all(
          batch.items.map((item) => {
            return asyncCall(
              batch.driver.getItem,
              item.relativeKey,
              item.options
            ).then((value) => ({
              key: item.key,
              value: destr(value)
            }));
          })
        );
      });
    },
    getItemRaw(key, opts = {}) {
      key = normalizeKey$1(key);
      const { relativeKey, driver } = getMount(key);
      if (driver.getItemRaw) {
        return asyncCall(driver.getItemRaw, relativeKey, opts);
      }
      return asyncCall(driver.getItem, relativeKey, opts).then(
        (value) => deserializeRaw(value)
      );
    },
    async setItem(key, value, opts = {}) {
      if (value === void 0) {
        return storage.removeItem(key);
      }
      key = normalizeKey$1(key);
      const { relativeKey, driver } = getMount(key);
      if (!driver.setItem) {
        return;
      }
      await asyncCall(driver.setItem, relativeKey, stringify(value), opts);
      if (!driver.watch) {
        onChange("update", key);
      }
    },
    async setItems(items, commonOptions) {
      await runBatch(items, commonOptions, async (batch) => {
        if (batch.driver.setItems) {
          return asyncCall(
            batch.driver.setItems,
            batch.items.map((item) => ({
              key: item.relativeKey,
              value: stringify(item.value),
              options: item.options
            })),
            commonOptions
          );
        }
        if (!batch.driver.setItem) {
          return;
        }
        await Promise.all(
          batch.items.map((item) => {
            return asyncCall(
              batch.driver.setItem,
              item.relativeKey,
              stringify(item.value),
              item.options
            );
          })
        );
      });
    },
    async setItemRaw(key, value, opts = {}) {
      if (value === void 0) {
        return storage.removeItem(key, opts);
      }
      key = normalizeKey$1(key);
      const { relativeKey, driver } = getMount(key);
      if (driver.setItemRaw) {
        await asyncCall(driver.setItemRaw, relativeKey, value, opts);
      } else if (driver.setItem) {
        await asyncCall(driver.setItem, relativeKey, serializeRaw(value), opts);
      } else {
        return;
      }
      if (!driver.watch) {
        onChange("update", key);
      }
    },
    async removeItem(key, opts = {}) {
      if (typeof opts === "boolean") {
        opts = { removeMeta: opts };
      }
      key = normalizeKey$1(key);
      const { relativeKey, driver } = getMount(key);
      if (!driver.removeItem) {
        return;
      }
      await asyncCall(driver.removeItem, relativeKey, opts);
      if (opts.removeMeta || opts.removeMata) {
        await asyncCall(driver.removeItem, relativeKey + "$", opts);
      }
      if (!driver.watch) {
        onChange("remove", key);
      }
    },
    // Meta
    async getMeta(key, opts = {}) {
      if (typeof opts === "boolean") {
        opts = { nativeOnly: opts };
      }
      key = normalizeKey$1(key);
      const { relativeKey, driver } = getMount(key);
      const meta = /* @__PURE__ */ Object.create(null);
      if (driver.getMeta) {
        Object.assign(meta, await asyncCall(driver.getMeta, relativeKey, opts));
      }
      if (!opts.nativeOnly) {
        const value = await asyncCall(
          driver.getItem,
          relativeKey + "$",
          opts
        ).then((value_) => destr(value_));
        if (value && typeof value === "object") {
          if (typeof value.atime === "string") {
            value.atime = new Date(value.atime);
          }
          if (typeof value.mtime === "string") {
            value.mtime = new Date(value.mtime);
          }
          Object.assign(meta, value);
        }
      }
      return meta;
    },
    setMeta(key, value, opts = {}) {
      return this.setItem(key + "$", value, opts);
    },
    removeMeta(key, opts = {}) {
      return this.removeItem(key + "$", opts);
    },
    // Keys
    async getKeys(base, opts = {}) {
      base = normalizeBaseKey(base);
      const mounts = getMounts(base, true);
      let maskedMounts = [];
      const allKeys = [];
      let allMountsSupportMaxDepth = true;
      for (const mount of mounts) {
        if (!mount.driver.flags?.maxDepth) {
          allMountsSupportMaxDepth = false;
        }
        const rawKeys = await asyncCall(
          mount.driver.getKeys,
          mount.relativeBase,
          opts
        );
        for (const key of rawKeys) {
          const fullKey = mount.mountpoint + normalizeKey$1(key);
          if (!maskedMounts.some((p) => fullKey.startsWith(p))) {
            allKeys.push(fullKey);
          }
        }
        maskedMounts = [
          mount.mountpoint,
          ...maskedMounts.filter((p) => !p.startsWith(mount.mountpoint))
        ];
      }
      const shouldFilterByDepth = opts.maxDepth !== void 0 && !allMountsSupportMaxDepth;
      return allKeys.filter(
        (key) => (!shouldFilterByDepth || filterKeyByDepth(key, opts.maxDepth)) && filterKeyByBase(key, base)
      );
    },
    // Utils
    async clear(base, opts = {}) {
      base = normalizeBaseKey(base);
      await Promise.all(
        getMounts(base, false).map(async (m) => {
          if (m.driver.clear) {
            return asyncCall(m.driver.clear, m.relativeBase, opts);
          }
          if (m.driver.removeItem) {
            const keys = await m.driver.getKeys(m.relativeBase || "", opts);
            return Promise.all(
              keys.map((key) => m.driver.removeItem(key, opts))
            );
          }
        })
      );
    },
    async dispose() {
      await Promise.all(
        Object.values(context.mounts).map((driver) => dispose(driver))
      );
    },
    async watch(callback) {
      await startWatch();
      context.watchListeners.push(callback);
      return async () => {
        context.watchListeners = context.watchListeners.filter(
          (listener) => listener !== callback
        );
        if (context.watchListeners.length === 0) {
          await stopWatch();
        }
      };
    },
    async unwatch() {
      context.watchListeners = [];
      await stopWatch();
    },
    // Mount
    mount(base, driver) {
      base = normalizeBaseKey(base);
      if (base && context.mounts[base]) {
        throw new Error(`already mounted at ${base}`);
      }
      if (base) {
        context.mountpoints.push(base);
        context.mountpoints.sort((a, b) => b.length - a.length);
      }
      context.mounts[base] = driver;
      if (context.watching) {
        Promise.resolve(watch(driver, onChange, base)).then((unwatcher) => {
          context.unwatch[base] = unwatcher;
        }).catch(console.error);
      }
      return storage;
    },
    async unmount(base, _dispose = true) {
      base = normalizeBaseKey(base);
      if (!base || !context.mounts[base]) {
        return;
      }
      if (context.watching && base in context.unwatch) {
        context.unwatch[base]?.();
        delete context.unwatch[base];
      }
      if (_dispose) {
        await dispose(context.mounts[base]);
      }
      context.mountpoints = context.mountpoints.filter((key) => key !== base);
      delete context.mounts[base];
    },
    getMount(key = "") {
      key = normalizeKey$1(key) + ":";
      const m = getMount(key);
      return {
        driver: m.driver,
        base: m.base
      };
    },
    getMounts(base = "", opts = {}) {
      base = normalizeKey$1(base);
      const mounts = getMounts(base, opts.parents);
      return mounts.map((m) => ({
        driver: m.driver,
        base: m.mountpoint
      }));
    },
    // Aliases
    keys: (base, opts = {}) => storage.getKeys(base, opts),
    get: (key, opts = {}) => storage.getItem(key, opts),
    set: (key, value, opts = {}) => storage.setItem(key, value, opts),
    has: (key, opts = {}) => storage.hasItem(key, opts),
    del: (key, opts = {}) => storage.removeItem(key, opts),
    remove: (key, opts = {}) => storage.removeItem(key, opts)
  };
  return storage;
}
function watch(driver, onChange, base) {
  return driver.watch ? driver.watch((event, key) => onChange(event, base + key)) : () => {
  };
}
async function dispose(driver) {
  if (typeof driver.dispose === "function") {
    await asyncCall(driver.dispose);
  }
}

const _assets = {

};

const normalizeKey = function normalizeKey(key) {
  if (!key) {
    return "";
  }
  return key.split("?")[0]?.replace(/[/\\]/g, ":").replace(/:+/g, ":").replace(/^:|:$/g, "") || "";
};

const assets$1 = {
  getKeys() {
    return Promise.resolve(Object.keys(_assets))
  },
  hasItem (id) {
    id = normalizeKey(id);
    return Promise.resolve(id in _assets)
  },
  getItem (id) {
    id = normalizeKey(id);
    return Promise.resolve(_assets[id] ? _assets[id].import() : null)
  },
  getMeta (id) {
    id = normalizeKey(id);
    return Promise.resolve(_assets[id] ? _assets[id].meta : {})
  }
};

function defineDriver(factory) {
  return factory;
}
function createError(driver, message, opts) {
  const err = new Error(`[unstorage] [${driver}] ${message}`, opts);
  if (Error.captureStackTrace) {
    Error.captureStackTrace(err, createError);
  }
  return err;
}
function createRequiredError(driver, name) {
  if (Array.isArray(name)) {
    return createError(
      driver,
      `Missing some of the required options ${name.map((n) => "`" + n + "`").join(", ")}`
    );
  }
  return createError(driver, `Missing required option \`${name}\`.`);
}

function ignoreNotfound(err) {
  return err.code === "ENOENT" || err.code === "EISDIR" ? null : err;
}
function ignoreExists(err) {
  return err.code === "EEXIST" ? null : err;
}
async function writeFile(path, data, encoding) {
  await ensuredir(dirname$1(path));
  return promises.writeFile(path, data, encoding);
}
function readFile(path, encoding) {
  return promises.readFile(path, encoding).catch(ignoreNotfound);
}
function unlink(path) {
  return promises.unlink(path).catch(ignoreNotfound);
}
function readdir(dir) {
  return promises.readdir(dir, { withFileTypes: true }).catch(ignoreNotfound).then((r) => r || []);
}
async function ensuredir(dir) {
  if (existsSync(dir)) {
    return;
  }
  await ensuredir(dirname$1(dir)).catch(ignoreExists);
  await promises.mkdir(dir).catch(ignoreExists);
}
async function readdirRecursive(dir, ignore, maxDepth) {
  if (ignore && ignore(dir)) {
    return [];
  }
  const entries = await readdir(dir);
  const files = [];
  await Promise.all(
    entries.map(async (entry) => {
      const entryPath = resolve$1(dir, entry.name);
      if (entry.isDirectory()) {
        if (maxDepth === void 0 || maxDepth > 0) {
          const dirFiles = await readdirRecursive(
            entryPath,
            ignore,
            maxDepth === void 0 ? void 0 : maxDepth - 1
          );
          files.push(...dirFiles.map((f) => entry.name + "/" + f));
        }
      } else {
        if (!(ignore && ignore(entry.name))) {
          files.push(entry.name);
        }
      }
    })
  );
  return files;
}
async function rmRecursive(dir) {
  const entries = await readdir(dir);
  await Promise.all(
    entries.map((entry) => {
      const entryPath = resolve$1(dir, entry.name);
      if (entry.isDirectory()) {
        return rmRecursive(entryPath).then(() => promises.rmdir(entryPath));
      } else {
        return promises.unlink(entryPath);
      }
    })
  );
}

const PATH_TRAVERSE_RE = /\.\.:|\.\.$/;
const DRIVER_NAME = "fs-lite";
const unstorage_47drivers_47fs_45lite = defineDriver((opts = {}) => {
  if (!opts.base) {
    throw createRequiredError(DRIVER_NAME, "base");
  }
  opts.base = resolve$1(opts.base);
  const r = (key) => {
    if (PATH_TRAVERSE_RE.test(key)) {
      throw createError(
        DRIVER_NAME,
        `Invalid key: ${JSON.stringify(key)}. It should not contain .. segments`
      );
    }
    const resolved = join(opts.base, key.replace(/:/g, "/"));
    return resolved;
  };
  return {
    name: DRIVER_NAME,
    options: opts,
    flags: {
      maxDepth: true
    },
    hasItem(key) {
      return existsSync(r(key));
    },
    getItem(key) {
      return readFile(r(key), "utf8");
    },
    getItemRaw(key) {
      return readFile(r(key));
    },
    async getMeta(key) {
      const { atime, mtime, size, birthtime, ctime } = await promises.stat(r(key)).catch(() => ({}));
      return { atime, mtime, size, birthtime, ctime };
    },
    setItem(key, value) {
      if (opts.readOnly) {
        return;
      }
      return writeFile(r(key), value, "utf8");
    },
    setItemRaw(key, value) {
      if (opts.readOnly) {
        return;
      }
      return writeFile(r(key), value);
    },
    removeItem(key) {
      if (opts.readOnly) {
        return;
      }
      return unlink(r(key));
    },
    getKeys(_base, topts) {
      return readdirRecursive(r("."), opts.ignore, topts?.maxDepth);
    },
    async clear() {
      if (opts.readOnly || opts.noClear) {
        return;
      }
      await rmRecursive(r("."));
    }
  };
});

const storage = createStorage({});

storage.mount('/assets', assets$1);

storage.mount('data', unstorage_47drivers_47fs_45lite({"driver":"fsLite","base":"./.data/kv"}));

function useStorage(base = "") {
  return base ? prefixStorage(storage, base) : storage;
}

function serialize$1(input) {
	if (typeof input === "string") return `'${input}'`;
	return new Serializer().serialize(input);
}
const asciiOrder = " _-,;:!?.'\"()[]{}@*/\\&#%`^+<=>|~$0123456789abcdefghijklmnopqrstuvwxyz";
const asciiWeights = /*@__PURE__*/ (function() {
	const weights = /* @__PURE__ */ new Uint8Array(128);
	for (let i = 0; i < 69; i++) weights[asciiOrder.charCodeAt(i)] = i + 1;
	for (let code = 65; code <= 90; code++) weights[code] = weights[code + 32];
	return weights;
})();
function compareStrings(a, b) {
	if (a === b) return 0;
	const length = Math.min(a.length, b.length);
	let tieBreaker = 0;
	for (let i = 0; i < length; i++) {
		const codeA = a.charCodeAt(i);
		const codeB = b.charCodeAt(i);
		if (codeA === codeB) continue;
		const weightA = codeA < 128 && asciiWeights[codeA] ? asciiWeights[codeA] : codeA + 128;
		const weightB = codeB < 128 && asciiWeights[codeB] ? asciiWeights[codeB] : codeB + 128;
		if (weightA !== weightB) return weightA < weightB ? -1 : 1;
		if (tieBreaker === 0) tieBreaker = codeA > codeB ? -1 : 1;
	}
	if (a.length !== b.length) return a.length < b.length ? -1 : 1;
	return tieBreaker;
}
const Serializer = /*@__PURE__*/ (function() {
	class Serializer {
		#context = /* @__PURE__ */ new Map();
		compare(a, b) {
			const typeA = typeof a;
			const typeB = typeof b;
			if (typeA === "string" && typeB === "string") return compareStrings(a, b);
			if (typeA === "number" && typeB === "number") return a - b;
			return compareStrings(this.serialize(a, true), this.serialize(b, true));
		}
		serialize(value, noQuotes) {
			if (value === null) return "null";
			switch (typeof value) {
				case "string": return noQuotes ? value : `'${value}'`;
				case "bigint": return `${value}n`;
				case "object": return this.$object(value);
				case "function": return this.$function(value);
			}
			return String(value);
		}
		serializeObject(object) {
			const objString = Object.prototype.toString.call(object);
			if (objString !== "[object Object]") return this.serializeBuiltInType(objString.length < 10 ? `unknown:${objString}` : objString.slice(8, -1), object);
			const constructor = object.constructor;
			const objName = constructor === Object || constructor === void 0 ? "" : constructor.name;
			if (objName !== "" && globalThis[objName] === constructor) return this.serializeBuiltInType(objName, object);
			if ("toJSON" in object && typeof object.toJSON === "function") {
				const json = object.toJSON();
				return objName + (json !== null && typeof json === "object" ? this.$object(json) : `(${this.serialize(json)})`);
			}
			const keys = Object.keys(object).sort(compareStrings);
			let content = `${objName}{`;
			for (let i = 0; i < keys.length; i++) {
				const key = keys[i];
				content += `${key}:${this.serialize(object[key])}`;
				if (i < keys.length - 1) content += ",";
			}
			return content + "}";
		}
		serializeBuiltInType(type, object) {
			const handler = this["$" + type];
			if (handler) return handler.call(this, object);
			if (typeof object.entries === "function") return this.serializeObjectEntries(type, object.entries());
			throw new Error(`Cannot serialize ${type}`);
		}
		serializeObjectEntries(type, entries) {
			const sortedEntries = Array.from(entries).sort((a, b) => this.compare(a[0], b[0]));
			let content = `${type}{`;
			for (let i = 0; i < sortedEntries.length; i++) {
				const [key, value] = sortedEntries[i];
				content += `${this.serialize(key, true)}:${this.serialize(value)}`;
				if (i < sortedEntries.length - 1) content += ",";
			}
			return content + "}";
		}
		$object(object) {
			let content = this.#context.get(object);
			if (content === void 0) {
				this.#context.set(object, `#${this.#context.size}`);
				content = this.serializeObject(object);
				this.#context.set(object, content);
			}
			return content;
		}
		$function(fn) {
			const fnStr = Function.prototype.toString.call(fn);
			if (fnStr.slice(-15) === "[native code] }") return `${fn.name || ""}()[native]`;
			return `${fn.name}(${fn.length})${fnStr.replace(/\s*\n\s*/g, "")}`;
		}
		$Array(arr) {
			let content = "[";
			for (let i = 0; i < arr.length; i++) {
				content += this.serialize(arr[i]);
				if (i < arr.length - 1) content += ",";
			}
			return content + "]";
		}
		$Date(date) {
			try {
				return `Date(${date.toISOString()})`;
			} catch {
				return `Date(null)`;
			}
		}
		$ArrayBuffer(arr) {
			return `ArrayBuffer[${new Uint8Array(arr).join(",")}]`;
		}
		$Set(set) {
			return `Set${this.$Array(Array.from(set).sort((a, b) => this.compare(a, b)))}`;
		}
		$Map(map) {
			return this.serializeObjectEntries("Map", map.entries());
		}
	}
	for (const type of [
		"Error",
		"RegExp",
		"URL"
	]) Serializer.prototype["$" + type] = function(val) {
		return `${type}(${val})`;
	};
	for (const type of [
		"Int8Array",
		"Uint8Array",
		"Uint8ClampedArray",
		"Int16Array",
		"Uint16Array",
		"Int32Array",
		"Uint32Array",
		"Float32Array",
		"Float64Array"
	]) Serializer.prototype["$" + type] = function(arr) {
		return `${type}[${arr.join(",")}]`;
	};
	for (const type of ["BigInt64Array", "BigUint64Array"]) Serializer.prototype["$" + type] = function(arr) {
		return `${type}[${arr.join("n,")}${arr.length > 0 ? "n" : ""}]`;
	};
	return Serializer;
})();
function isEqual(object1, object2) {
	if (object1 === object2) return true;
	if (serialize$1(object1) === serialize$1(object2)) return true;
	return false;
}

const fastHash = /*@__PURE__*/ (() => globalThis.process?.getBuiltinModule?.("crypto")?.hash)();
const algorithm = "sha256";
const encoding = "base64url";
function digest(data) {
	if (fastHash) return fastHash(algorithm, data, encoding);
	const h = createHash(algorithm).update(data);
	return globalThis.process?.versions?.webcontainer ? h.digest().toString(encoding) : h.digest(encoding);
}

function hash$1(input) {
	return digest(serialize$1(input));
}

const Hasher = /* @__PURE__ */ (() => {
  class Hasher2 {
    buff = "";
    #context = /* @__PURE__ */ new Map();
    write(str) {
      this.buff += str;
    }
    dispatch(value) {
      const type = value === null ? "null" : typeof value;
      return this[type](value);
    }
    object(object) {
      if (object && typeof object.toJSON === "function") {
        return this.object(object.toJSON());
      }
      const objString = Object.prototype.toString.call(object);
      let objType = "";
      const objectLength = objString.length;
      objType = objectLength < 10 ? "unknown:[" + objString + "]" : objString.slice(8, objectLength - 1);
      objType = objType.toLowerCase();
      let objectNumber = null;
      if ((objectNumber = this.#context.get(object)) === void 0) {
        this.#context.set(object, this.#context.size);
      } else {
        return this.dispatch("[CIRCULAR:" + objectNumber + "]");
      }
      if (typeof Buffer !== "undefined" && Buffer.isBuffer && Buffer.isBuffer(object)) {
        this.write("buffer:");
        return this.write(object.toString("utf8"));
      }
      if (objType !== "object" && objType !== "function" && objType !== "asyncfunction") {
        if (this[objType]) {
          this[objType](object);
        } else {
          this.unknown(object, objType);
        }
      } else {
        const keys = Object.keys(object).sort();
        const extraKeys = [];
        this.write("object:" + (keys.length + extraKeys.length) + ":");
        const dispatchForKey = (key) => {
          this.dispatch(key);
          this.write(":");
          this.dispatch(object[key]);
          this.write(",");
        };
        for (const key of keys) {
          dispatchForKey(key);
        }
        for (const key of extraKeys) {
          dispatchForKey(key);
        }
      }
    }
    array(arr, unordered) {
      unordered = unordered === void 0 ? false : unordered;
      this.write("array:" + arr.length + ":");
      if (!unordered || arr.length <= 1) {
        for (const entry of arr) {
          this.dispatch(entry);
        }
        return;
      }
      const contextAdditions = /* @__PURE__ */ new Map();
      const entries = arr.map((entry) => {
        const hasher = new Hasher2();
        hasher.dispatch(entry);
        for (const [key, value] of hasher.#context) {
          contextAdditions.set(key, value);
        }
        return hasher.toString();
      });
      this.#context = contextAdditions;
      entries.sort();
      return this.array(entries, false);
    }
    date(date) {
      return this.write("date:" + date.toJSON());
    }
    symbol(sym) {
      return this.write("symbol:" + sym.toString());
    }
    unknown(value, type) {
      this.write(type);
      if (!value) {
        return;
      }
      this.write(":");
      if (value && typeof value.entries === "function") {
        return this.array(
          [...value.entries()],
          true
          /* ordered */
        );
      }
    }
    error(err) {
      return this.write("error:" + err.toString());
    }
    boolean(bool) {
      return this.write("bool:" + bool);
    }
    string(string) {
      this.write("string:" + string.length + ":");
      this.write(string);
    }
    function(fn) {
      this.write("fn:");
      if (isNativeFunction(fn)) {
        this.dispatch("[native]");
      } else {
        this.dispatch(fn.toString());
      }
    }
    number(number) {
      return this.write("number:" + number);
    }
    null() {
      return this.write("Null");
    }
    undefined() {
      return this.write("Undefined");
    }
    regexp(regex) {
      return this.write("regex:" + regex.toString());
    }
    arraybuffer(arr) {
      this.write("arraybuffer:");
      return this.dispatch(new Uint8Array(arr));
    }
    url(url) {
      return this.write("url:" + url.toString());
    }
    map(map) {
      this.write("map:");
      const arr = [...map];
      return this.array(arr, false);
    }
    set(set) {
      this.write("set:");
      const arr = [...set];
      return this.array(arr, false);
    }
    bigint(number) {
      return this.write("bigint:" + number.toString());
    }
  }
  for (const type of [
    "uint8array",
    "uint8clampedarray",
    "unt8array",
    "uint16array",
    "unt16array",
    "uint32array",
    "unt32array",
    "float32array",
    "float64array"
  ]) {
    Hasher2.prototype[type] = function(arr) {
      this.write(type + ":");
      return this.array([...arr], false);
    };
  }
  function isNativeFunction(f) {
    if (typeof f !== "function") {
      return false;
    }
    return Function.prototype.toString.call(f).slice(
      -15
      /* "[native code] }".length */
    ) === "[native code] }";
  }
  return Hasher2;
})();
function serialize(object) {
  const hasher = new Hasher();
  hasher.dispatch(object);
  return hasher.buff;
}
function hash(value) {
  return digest(typeof value === "string" ? value : serialize(value)).replace(/[-_]/g, "").slice(0, 10);
}

function defaultCacheOptions() {
  return {
    name: "_",
    base: "/cache",
    swr: true,
    maxAge: 1
  };
}
function defineCachedFunction(fn, opts = {}) {
  opts = { ...defaultCacheOptions(), ...opts };
  const pending = {};
  const group = opts.group || "nitro/functions";
  const name = opts.name || fn.name || "_";
  const integrity = opts.integrity || hash([fn, opts]);
  const validate = opts.validate || ((entry) => entry.value !== void 0);
  async function get(key, resolver, shouldInvalidateCache, event) {
    const cacheKey = [opts.base, group, name, key + ".json"].filter(Boolean).join(":").replace(/:\/$/, ":index");
    let entry = await useStorage().getItem(cacheKey).catch((error) => {
      console.error(`[cache] Cache read error.`, error);
      useNitroApp().captureError(error, { event, tags: ["cache"] });
    }) || {};
    if (typeof entry !== "object") {
      entry = {};
      const error = new Error("Malformed data read from cache.");
      console.error("[cache]", error);
      useNitroApp().captureError(error, { event, tags: ["cache"] });
    }
    const ttl = (opts.maxAge ?? 0) * 1e3;
    if (ttl) {
      entry.expires = Date.now() + ttl;
    }
    const expired = shouldInvalidateCache || entry.integrity !== integrity || ttl && Date.now() - (entry.mtime || 0) > ttl || validate(entry) === false;
    const _resolve = async () => {
      const isPending = pending[key];
      if (!isPending) {
        if (entry.value !== void 0 && (opts.staleMaxAge || 0) >= 0 && opts.swr === false) {
          entry.value = void 0;
          entry.integrity = void 0;
          entry.mtime = void 0;
          entry.expires = void 0;
        }
        pending[key] = Promise.resolve(resolver());
      }
      try {
        entry.value = await pending[key];
      } catch (error) {
        if (!isPending) {
          delete pending[key];
        }
        throw error;
      }
      if (!isPending) {
        entry.mtime = Date.now();
        entry.integrity = integrity;
        delete pending[key];
        if (validate(entry) !== false) {
          let setOpts;
          if (opts.maxAge && !opts.swr) {
            setOpts = { ttl: opts.maxAge };
          }
          const promise = useStorage().setItem(cacheKey, entry, setOpts).catch((error) => {
            console.error(`[cache] Cache write error.`, error);
            useNitroApp().captureError(error, { event, tags: ["cache"] });
          });
          if (event?.waitUntil) {
            event.waitUntil(promise);
          }
        }
      }
    };
    const _resolvePromise = expired ? _resolve() : Promise.resolve();
    if (entry.value === void 0) {
      await _resolvePromise;
    } else if (expired && event && event.waitUntil) {
      event.waitUntil(_resolvePromise);
    }
    if (opts.swr && validate(entry) !== false) {
      _resolvePromise.catch((error) => {
        console.error(`[cache] SWR handler error.`, error);
        useNitroApp().captureError(error, { event, tags: ["cache"] });
      });
      return entry;
    }
    return _resolvePromise.then(() => entry);
  }
  return async (...args) => {
    const shouldBypassCache = await opts.shouldBypassCache?.(...args);
    if (shouldBypassCache) {
      return fn(...args);
    }
    const key = await (opts.getKey || getKey)(...args);
    const shouldInvalidateCache = await opts.shouldInvalidateCache?.(...args);
    const entry = await get(
      key,
      () => fn(...args),
      shouldInvalidateCache,
      args[0] && isEvent(args[0]) ? args[0] : void 0
    );
    let value = entry.value;
    if (opts.transform) {
      value = await opts.transform(entry, ...args) || value;
    }
    return value;
  };
}
function cachedFunction(fn, opts = {}) {
  return defineCachedFunction(fn, opts);
}
function getKey(...args) {
  return args.length > 0 ? hash(args) : "";
}
function escapeKey(key) {
  return String(key).replace(/\W/g, "");
}
function defineCachedEventHandler(handler, opts = defaultCacheOptions()) {
  const variableHeaderNames = (opts.varies || []).filter(Boolean).map((h) => h.toLowerCase()).sort();
  const _opts = {
    ...opts,
    getKey: async (event) => {
      const customKey = await opts.getKey?.(event);
      if (customKey) {
        return escapeKey(customKey);
      }
      const _path = event.node.req.originalUrl || event.node.req.url || event.path;
      let _pathname;
      try {
        _pathname = escapeKey(decodeURI(parseURL(_path).pathname)).slice(0, 16) || "index";
      } catch {
        _pathname = "-";
      }
      const _hashedPath = `${_pathname}.${hash(_path)}`;
      const _headers = variableHeaderNames.map((header) => [header, event.node.req.headers[header]]).map(([name, value]) => `${escapeKey(name)}.${hash(value)}`);
      return [_hashedPath, ..._headers].join(":");
    },
    validate: (entry) => {
      if (!entry.value) {
        return false;
      }
      if (entry.value.code >= 400) {
        return false;
      }
      if (entry.value.body === void 0) {
        return false;
      }
      if (entry.value.headers.etag === "undefined" || entry.value.headers["last-modified"] === "undefined") {
        return false;
      }
      return true;
    },
    group: opts.group || "nitro/handlers",
    integrity: opts.integrity || hash([handler, opts])
  };
  const _cachedHandler = cachedFunction(
    async (incomingEvent) => {
      const variableHeaders = {};
      for (const header of variableHeaderNames) {
        const value = incomingEvent.node.req.headers[header];
        if (value !== void 0) {
          variableHeaders[header] = value;
        }
      }
      const reqProxy = cloneWithProxy(incomingEvent.node.req, {
        headers: variableHeaders
      });
      const resHeaders = {};
      let _resSendBody;
      const resProxy = cloneWithProxy(incomingEvent.node.res, {
        statusCode: 200,
        writableEnded: false,
        writableFinished: false,
        headersSent: false,
        closed: false,
        getHeader(name) {
          return resHeaders[name];
        },
        setHeader(name, value) {
          resHeaders[name] = value;
          return this;
        },
        getHeaderNames() {
          return Object.keys(resHeaders);
        },
        hasHeader(name) {
          return name in resHeaders;
        },
        removeHeader(name) {
          delete resHeaders[name];
        },
        getHeaders() {
          return resHeaders;
        },
        end(chunk, arg2, arg3) {
          if (typeof chunk === "string") {
            _resSendBody = chunk;
          }
          if (typeof arg2 === "function") {
            arg2();
          }
          if (typeof arg3 === "function") {
            arg3();
          }
          return this;
        },
        write(chunk, arg2, arg3) {
          if (typeof chunk === "string") {
            _resSendBody = chunk;
          }
          if (typeof arg2 === "function") {
            arg2(void 0);
          }
          if (typeof arg3 === "function") {
            arg3();
          }
          return true;
        },
        writeHead(statusCode, headers2) {
          this.statusCode = statusCode;
          if (headers2) {
            if (Array.isArray(headers2) || typeof headers2 === "string") {
              throw new TypeError("Raw headers  is not supported.");
            }
            for (const header in headers2) {
              const value = headers2[header];
              if (value !== void 0) {
                this.setHeader(
                  header,
                  value
                );
              }
            }
          }
          return this;
        }
      });
      const event = createEvent(reqProxy, resProxy);
      event.fetch = (url, fetchOptions) => fetchWithEvent(event, url, fetchOptions, {
        fetch: useNitroApp().localFetch
      });
      event.$fetch = (url, fetchOptions) => fetchWithEvent(event, url, fetchOptions, {
        fetch: globalThis.$fetch
      });
      event.waitUntil = incomingEvent.waitUntil;
      event.context = incomingEvent.context;
      event.context.cache = {
        options: _opts
      };
      const body = await handler(event) || _resSendBody;
      const headers = event.node.res.getHeaders();
      headers.etag = String(
        headers.Etag || headers.etag || `W/"${hash(body)}"`
      );
      headers["last-modified"] = String(
        headers["Last-Modified"] || headers["last-modified"] || (/* @__PURE__ */ new Date()).toUTCString()
      );
      const cacheControl = [];
      if (opts.swr) {
        if (opts.maxAge) {
          cacheControl.push(`s-maxage=${opts.maxAge}`);
        }
        if (opts.staleMaxAge) {
          cacheControl.push(`stale-while-revalidate=${opts.staleMaxAge}`);
        } else {
          cacheControl.push("stale-while-revalidate");
        }
      } else if (opts.maxAge) {
        cacheControl.push(`max-age=${opts.maxAge}`);
      }
      if (cacheControl.length > 0) {
        headers["cache-control"] = cacheControl.join(", ");
      }
      const cacheEntry = {
        code: event.node.res.statusCode,
        headers,
        body
      };
      return cacheEntry;
    },
    _opts
  );
  return defineEventHandler(async (event) => {
    if (opts.headersOnly) {
      if (handleCacheHeaders(event, { maxAge: opts.maxAge })) {
        return;
      }
      return handler(event);
    }
    const response = await _cachedHandler(
      event
    );
    if (event.node.res.headersSent || event.node.res.writableEnded) {
      return response.body;
    }
    if (handleCacheHeaders(event, {
      modifiedTime: new Date(response.headers["last-modified"]),
      etag: response.headers.etag,
      maxAge: opts.maxAge
    })) {
      return;
    }
    event.node.res.statusCode = response.code;
    for (const name in response.headers) {
      const value = response.headers[name];
      if (name === "set-cookie") {
        event.node.res.appendHeader(
          name,
          splitCookiesString(value)
        );
      } else {
        if (value !== void 0) {
          event.node.res.setHeader(name, value);
        }
      }
    }
    return response.body;
  });
}
function cloneWithProxy(obj, overrides) {
  return new Proxy(obj, {
    get(target, property, receiver) {
      if (property in overrides) {
        return overrides[property];
      }
      return Reflect.get(target, property, receiver);
    },
    set(target, property, value, receiver) {
      if (property in overrides) {
        overrides[property] = value;
        return true;
      }
      return Reflect.set(target, property, value, receiver);
    }
  });
}
const cachedEventHandler = defineCachedEventHandler;

function klona(x) {
	if (typeof x !== 'object') return x;

	var k, tmp, str=Object.prototype.toString.call(x);

	if (str === '[object Object]') {
		if (x.constructor !== Object && typeof x.constructor === 'function') {
			tmp = new x.constructor();
			for (k in x) {
				if (x.hasOwnProperty(k) && tmp[k] !== x[k]) {
					tmp[k] = klona(x[k]);
				}
			}
		} else {
			tmp = {}; // null
			for (k in x) {
				if (k === '__proto__') {
					Object.defineProperty(tmp, k, {
						value: klona(x[k]),
						configurable: true,
						enumerable: true,
						writable: true,
					});
				} else {
					tmp[k] = klona(x[k]);
				}
			}
		}
		return tmp;
	}

	if (str === '[object Array]') {
		k = x.length;
		for (tmp=Array(k); k--;) {
			tmp[k] = klona(x[k]);
		}
		return tmp;
	}

	if (str === '[object Set]') {
		tmp = new Set;
		x.forEach(function (val) {
			tmp.add(klona(val));
		});
		return tmp;
	}

	if (str === '[object Map]') {
		tmp = new Map;
		x.forEach(function (val, key) {
			tmp.set(klona(key), klona(val));
		});
		return tmp;
	}

	if (str === '[object Date]') {
		return new Date(+x);
	}

	if (str === '[object RegExp]') {
		tmp = new RegExp(x.source, x.flags);
		tmp.lastIndex = x.lastIndex;
		return tmp;
	}

	if (str === '[object DataView]') {
		return new x.constructor( klona(x.buffer) );
	}

	if (str === '[object ArrayBuffer]') {
		return x.slice(0);
	}

	// ArrayBuffer.isView(x)
	// ~> `new` bcuz `Buffer.slice` => ref
	if (str.slice(-6) === 'Array]') {
		return new x.constructor(x);
	}

	return x;
}

const inlineAppConfig = {
  "nuxt": {},
  "ui": {
    "colors": {
      "primary": "green",
      "secondary": "blue",
      "success": "green",
      "info": "blue",
      "warning": "yellow",
      "error": "red",
      "neutral": "slate"
    },
    "icons": {
      "arrowDown": "i-lucide-arrow-down",
      "arrowLeft": "i-lucide-arrow-left",
      "arrowRight": "i-lucide-arrow-right",
      "arrowUp": "i-lucide-arrow-up",
      "caution": "i-lucide-circle-alert",
      "check": "i-lucide-check",
      "chevronDoubleLeft": "i-lucide-chevrons-left",
      "chevronDoubleRight": "i-lucide-chevrons-right",
      "chevronDown": "i-lucide-chevron-down",
      "chevronLeft": "i-lucide-chevron-left",
      "chevronRight": "i-lucide-chevron-right",
      "chevronUp": "i-lucide-chevron-up",
      "close": "i-lucide-x",
      "copy": "i-lucide-copy",
      "copyCheck": "i-lucide-copy-check",
      "dark": "i-lucide-moon",
      "drag": "i-lucide-grip-vertical",
      "ellipsis": "i-lucide-ellipsis",
      "error": "i-lucide-circle-x",
      "external": "i-lucide-arrow-up-right",
      "eye": "i-lucide-eye",
      "eyeOff": "i-lucide-eye-off",
      "file": "i-lucide-file",
      "folder": "i-lucide-folder",
      "folderOpen": "i-lucide-folder-open",
      "hash": "i-lucide-hash",
      "info": "i-lucide-info",
      "light": "i-lucide-sun",
      "loading": "i-lucide-loader-circle",
      "menu": "i-lucide-menu",
      "minus": "i-lucide-minus",
      "panelClose": "i-lucide-panel-left-close",
      "panelOpen": "i-lucide-panel-left-open",
      "plus": "i-lucide-plus",
      "reload": "i-lucide-rotate-ccw",
      "search": "i-lucide-search",
      "stop": "i-lucide-square",
      "star": "i-lucide-star",
      "success": "i-lucide-circle-check",
      "system": "i-lucide-monitor",
      "tip": "i-lucide-lightbulb",
      "upload": "i-lucide-upload",
      "warning": "i-lucide-triangle-alert"
    },
    "tv": {
      "twMergeConfig": {}
    }
  },
  "icon": {
    "provider": "server",
    "class": "",
    "aliases": {},
    "iconifyApiEndpoint": "https://api.iconify.design",
    "localApiEndpoint": "/api/_nuxt_icon",
    "fallbackToApi": true,
    "cssSelectorPrefix": "i-",
    "cssWherePseudo": true,
    "cssLayer": "base",
    "mode": "css",
    "attrs": {
      "aria-hidden": true
    },
    "collections": [
      "academicons",
      "akar-icons",
      "ant-design",
      "arcticons",
      "basil",
      "bi",
      "bitcoin-icons",
      "bpmn",
      "brandico",
      "bx",
      "bxl",
      "bxs",
      "bytesize",
      "carbon",
      "catppuccin",
      "cbi",
      "charm",
      "ci",
      "cib",
      "cif",
      "cil",
      "circle-flags",
      "circum",
      "clarity",
      "codex",
      "codicon",
      "covid",
      "cryptocurrency",
      "cryptocurrency-color",
      "cuida",
      "dashicons",
      "devicon",
      "devicon-plain",
      "dinkie-icons",
      "duo-icons",
      "ei",
      "el",
      "emojione",
      "emojione-monotone",
      "emojione-v1",
      "entypo",
      "entypo-social",
      "eos-icons",
      "ep",
      "et",
      "eva",
      "f7",
      "fa",
      "fa-brands",
      "fa-regular",
      "fa-solid",
      "fa6-brands",
      "fa6-regular",
      "fa6-solid",
      "fa7-brands",
      "fa7-regular",
      "fa7-solid",
      "fad",
      "famicons",
      "fe",
      "feather",
      "file-icons",
      "flag",
      "flagpack",
      "flat-color-icons",
      "flat-ui",
      "flowbite",
      "fluent",
      "fluent-color",
      "fluent-emoji",
      "fluent-emoji-flat",
      "fluent-emoji-high-contrast",
      "fluent-mdl2",
      "fontelico",
      "fontisto",
      "formkit",
      "foundation",
      "fxemoji",
      "gala",
      "game-icons",
      "garden",
      "geo",
      "gg",
      "gis",
      "gravity-ui",
      "gridicons",
      "grommet-icons",
      "guidance",
      "healthicons",
      "heroicons",
      "heroicons-outline",
      "heroicons-solid",
      "hugeicons",
      "humbleicons",
      "ic",
      "icomoon-free",
      "icon-park",
      "icon-park-outline",
      "icon-park-solid",
      "icon-park-twotone",
      "iconamoon",
      "iconoir",
      "icons8",
      "il",
      "ion",
      "iwwa",
      "ix",
      "jam",
      "la",
      "lets-icons",
      "line-md",
      "lineicons",
      "logos",
      "ls",
      "lsicon",
      "lucide",
      "lucide-lab",
      "mage",
      "majesticons",
      "maki",
      "map",
      "marketeq",
      "material-icon-theme",
      "material-symbols",
      "material-symbols-light",
      "mdi",
      "mdi-light",
      "medical-icon",
      "memory",
      "meteocons",
      "meteor-icons",
      "mi",
      "mingcute",
      "mono-icons",
      "mynaui",
      "nimbus",
      "nonicons",
      "noto",
      "noto-v1",
      "nrk",
      "octicon",
      "oi",
      "ooui",
      "openmoji",
      "oui",
      "pajamas",
      "pepicons",
      "pepicons-pencil",
      "pepicons-pop",
      "pepicons-print",
      "ph",
      "picon",
      "pixel",
      "pixelarticons",
      "prime",
      "proicons",
      "ps",
      "qlementine-icons",
      "quill",
      "radix-icons",
      "raphael",
      "ri",
      "rivet-icons",
      "roentgen",
      "si",
      "si-glyph",
      "sidekickicons",
      "simple-icons",
      "simple-line-icons",
      "skill-icons",
      "solar",
      "stash",
      "streamline",
      "streamline-block",
      "streamline-color",
      "streamline-cyber",
      "streamline-cyber-color",
      "streamline-emojis",
      "streamline-flex",
      "streamline-flex-color",
      "streamline-freehand",
      "streamline-freehand-color",
      "streamline-kameleon-color",
      "streamline-logos",
      "streamline-pixel",
      "streamline-plump",
      "streamline-plump-color",
      "streamline-sharp",
      "streamline-sharp-color",
      "streamline-stickies-color",
      "streamline-ultimate",
      "streamline-ultimate-color",
      "subway",
      "svg-spinners",
      "system-uicons",
      "tabler",
      "tdesign",
      "teenyicons",
      "temaki",
      "token",
      "token-branded",
      "topcoat",
      "twemoji",
      "typcn",
      "uil",
      "uim",
      "uis",
      "uit",
      "uiw",
      "unjs",
      "vaadin",
      "vs",
      "vscode-icons",
      "websymbol",
      "weui",
      "whh",
      "wi",
      "wpf",
      "zmdi",
      "zondicons"
    ],
    "fetchTimeout": 1500
  }
};



const appConfig = defuFn(inlineAppConfig);

const NUMBER_CHAR_RE = /\d/;
const STR_SPLITTERS = ["-", "_", "/", "."];
function isUppercase(char = "") {
  if (NUMBER_CHAR_RE.test(char)) {
    return void 0;
  }
  return char !== char.toLowerCase();
}
function splitByCase(str, separators) {
  const splitters = STR_SPLITTERS;
  const parts = [];
  if (!str || typeof str !== "string") {
    return parts;
  }
  let buff = "";
  let previousUpper;
  let previousSplitter;
  for (const char of str) {
    const isSplitter = splitters.includes(char);
    if (isSplitter === true) {
      parts.push(buff);
      buff = "";
      previousUpper = void 0;
      continue;
    }
    const isUpper = isUppercase(char);
    if (previousSplitter === false) {
      if (previousUpper === false && isUpper === true) {
        parts.push(buff);
        buff = char;
        previousUpper = isUpper;
        continue;
      }
      if (previousUpper === true && isUpper === false && buff.length > 1) {
        const lastChar = buff.at(-1);
        parts.push(buff.slice(0, Math.max(0, buff.length - 1)));
        buff = lastChar + char;
        previousUpper = isUpper;
        continue;
      }
    }
    buff += char;
    previousUpper = isUpper;
    previousSplitter = isSplitter;
  }
  parts.push(buff);
  return parts;
}
function kebabCase(str, joiner) {
  return str ? (Array.isArray(str) ? str : splitByCase(str)).map((p) => p.toLowerCase()).join(joiner) : "";
}
function snakeCase(str) {
  return kebabCase(str || "", "_");
}

function getEnv(key, opts) {
  const envKey = snakeCase(key).toUpperCase();
  return destr(
    process.env[opts.prefix + envKey] ?? process.env[opts.altPrefix + envKey]
  );
}
function _isObject(input) {
  return typeof input === "object" && !Array.isArray(input);
}
function applyEnv(obj, opts, parentKey = "") {
  for (const key in obj) {
    const subKey = parentKey ? `${parentKey}_${key}` : key;
    const envValue = getEnv(subKey, opts);
    if (_isObject(obj[key])) {
      if (_isObject(envValue)) {
        obj[key] = { ...obj[key], ...envValue };
        applyEnv(obj[key], opts, subKey);
      } else if (envValue === void 0) {
        applyEnv(obj[key], opts, subKey);
      } else {
        obj[key] = envValue ?? obj[key];
      }
    } else {
      obj[key] = envValue ?? obj[key];
    }
    if (opts.envExpansion && typeof obj[key] === "string") {
      obj[key] = _expandFromEnv(obj[key]);
    }
  }
  return obj;
}
const envExpandRx = /\{\{([^{}]*)\}\}/g;
function _expandFromEnv(value) {
  return value.replace(envExpandRx, (match, key) => {
    return process.env[key] || match;
  });
}

const _inlineRuntimeConfig = {
  "app": {
    "baseURL": "/",
    "buildId": "0efadd61-caf7-4506-b3ce-52c79f9d618e",
    "buildAssetsDir": "/_nuxt/",
    "cdnURL": ""
  },
  "nitro": {
    "envPrefix": "NUXT_",
    "routeRules": {
      "/__nuxt_error": {
        "cache": false
      },
      "/api/cron": {
        "swr": false,
        "cache": false
      },
      "/api/stripe/webhook": {
        "swr": false,
        "cache": false
      },
      "/_nuxt/builds/meta/**": {
        "headers": {
          "cache-control": "public, max-age=31536000, immutable"
        }
      },
      "/_nuxt/builds/**": {
        "headers": {
          "cache-control": "public, max-age=1, immutable"
        }
      },
      "/_fonts/**": {
        "headers": {
          "cache-control": "public, max-age=31536000, immutable"
        }
      },
      "/_nuxt/**": {
        "headers": {
          "cache-control": "public, max-age=31536000, immutable"
        }
      }
    }
  },
  "public": {
    "motion": {
      "directives": {
        "pop-bottom": {
          "initial": {
            "scale": 0,
            "opacity": 0,
            "y": 100
          },
          "visible": {
            "scale": 1,
            "opacity": 1,
            "y": 0
          }
        }
      }
    },
    "auth": {
      "loadStrategy": "server-first"
    },
    "googleAuth": {
      "clientId": "",
      "promptOneTap": false,
      "enableServerVerify": false
    },
    "notify": {
      "position": "top-right",
      "duration": 5000,
      "maxToasts": 5,
      "theme": "light",
      "showIcon": true
    },
    "qrcode": {
      "reader": {
        "autoImport": false,
        "formats": [
          "qr_code"
        ],
        "global": false
      },
      "global": false,
      "options": {
        "ecc": "L",
        "maskPattern": -1,
        "boostEcc": "",
        "minVersion": 1,
        "maxVersion": 40,
        "border": 1,
        "variant": "circle",
        "radius": 1,
        "blackColor": "var(--ui-text-highlighted, #000000)",
        "whiteColor": "var(--ui-bg, #FFFFFF)"
      }
    }
  },
  "session": {
    "name": "nuxt-session",
    "password": "",
    "cookie": {
      "sameSite": "lax"
    }
  },
  "hash": {
    "scrypt": {}
  },
  "webauthn": {
    "register": {},
    "authenticate": {}
  },
  "oauth": {
    "gitea": {
      "clientId": "",
      "clientSecret": "",
      "redirectURL": "",
      "baseURL": ""
    },
    "box": {
      "clientId": "",
      "clientSecret": "",
      "redirectURL": "",
      "scope": []
    },
    "github": {
      "clientId": "",
      "clientSecret": "",
      "redirectURL": ""
    },
    "gitlab": {
      "clientId": "",
      "clientSecret": "",
      "redirectURL": "",
      "baseURL": "https://gitlab.com"
    },
    "spotify": {
      "clientId": "",
      "clientSecret": "",
      "redirectURL": ""
    },
    "google": {
      "clientId": "",
      "clientSecret": "",
      "redirectURL": ""
    },
    "twitch": {
      "clientId": "",
      "clientSecret": "",
      "redirectURL": ""
    },
    "auth0": {
      "clientId": "",
      "clientSecret": "",
      "domain": "",
      "audience": "",
      "redirectURL": ""
    },
    "workos": {
      "clientId": "",
      "clientSecret": "",
      "connectionId": "",
      "screenHint": "",
      "redirectURL": ""
    },
    "microsoft": {
      "clientId": "",
      "clientSecret": "",
      "tenant": "",
      "scope": [],
      "authorizationURL": "",
      "tokenURL": "",
      "userURL": "",
      "redirectURL": ""
    },
    "azureb2c": {
      "clientId": "",
      "policy": "",
      "tenant": "",
      "scope": [],
      "authorizationURL": "",
      "tokenURL": "",
      "userURL": "",
      "redirectURL": ""
    },
    "discord": {
      "clientId": "",
      "clientSecret": "",
      "redirectURL": ""
    },
    "battledotnet": {
      "clientId": "",
      "clientSecret": "",
      "redirectURL": ""
    },
    "bluesky": {
      "clientMetadataFilename": "",
      "clientName": "",
      "clientUri": "",
      "logoUri": "",
      "policyUri": "",
      "tosUri": "",
      "scope": [
        "atproto"
      ],
      "grantTypes": [
        "authorization_code"
      ],
      "responseTypes": [
        "code"
      ],
      "applicationType": "web",
      "redirectUris": "",
      "dpopBoundAccessTokens": true,
      "tokenEndpointAuthMethod": "none"
    },
    "keycloak": {
      "clientId": "",
      "clientSecret": "",
      "serverUrl": "",
      "serverUrlInternal": "",
      "realm": "",
      "redirectURL": ""
    },
    "linear": {
      "clientId": "",
      "clientSecret": "",
      "redirectURL": ""
    },
    "linkedin": {
      "clientId": "",
      "clientSecret": "",
      "redirectURL": ""
    },
    "cognito": {
      "clientId": "",
      "clientSecret": "",
      "region": "",
      "userPoolId": "",
      "redirectURL": ""
    },
    "facebook": {
      "clientId": "",
      "clientSecret": "",
      "redirectURL": ""
    },
    "instagram": {
      "clientId": "",
      "clientSecret": "",
      "redirectURL": ""
    },
    "paypal": {
      "clientId": "",
      "clientSecret": "",
      "redirectURL": ""
    },
    "steam": {
      "apiKey": "",
      "redirectURL": ""
    },
    "x": {
      "clientId": "",
      "clientSecret": "",
      "redirectURL": ""
    },
    "xsuaa": {
      "clientId": "",
      "clientSecret": "",
      "domain": "",
      "redirectURL": ""
    },
    "vk": {
      "clientId": "",
      "clientSecret": "",
      "redirectURL": ""
    },
    "yandex": {
      "clientId": "",
      "clientSecret": "",
      "redirectURL": ""
    },
    "tiktok": {
      "clientKey": "",
      "clientSecret": "",
      "redirectURL": ""
    },
    "dropbox": {
      "clientId": "",
      "clientSecret": "",
      "redirectURL": ""
    },
    "polar": {
      "clientId": "",
      "clientSecret": "",
      "redirectURL": ""
    },
    "zitadel": {
      "clientId": "",
      "clientSecret": "",
      "domain": "",
      "redirectURL": ""
    },
    "authentik": {
      "clientId": "",
      "clientSecret": "",
      "domain": "",
      "redirectURL": ""
    },
    "seznam": {
      "clientId": "",
      "clientSecret": "",
      "redirectURL": ""
    },
    "strava": {
      "clientId": "",
      "clientSecret": "",
      "redirectURL": ""
    },
    "hubspot": {
      "clientId": "",
      "clientSecret": "",
      "redirectURL": ""
    },
    "line": {
      "clientId": "",
      "clientSecret": "",
      "redirectURL": ""
    },
    "atlassian": {
      "clientId": "",
      "clientSecret": "",
      "redirectURL": ""
    },
    "apple": {
      "teamId": "",
      "keyId": "",
      "privateKey": "",
      "redirectURL": "",
      "clientId": ""
    },
    "kick": {
      "clientId": "",
      "clientSecret": "",
      "redirectURL": ""
    },
    "livechat": {
      "clientId": "",
      "clientSecret": ""
    },
    "salesforce": {
      "clientId": "",
      "clientSecret": "",
      "redirectURL": "",
      "baseURL": "",
      "scope": ""
    },
    "slack": {
      "clientId": "",
      "clientSecret": "",
      "redirectURL": "",
      "scope": ""
    },
    "heroku": {
      "clientId": "",
      "clientSecret": "",
      "redirectURL": "",
      "scope": ""
    },
    "roblox": {
      "clientId": "",
      "clientSecret": "",
      "redirectURL": "",
      "scope": ""
    },
    "okta": {
      "clientId": "",
      "clientSecret": "",
      "domain": "",
      "audience": "",
      "scope": [],
      "redirectURL": ""
    },
    "ory": {
      "clientId": "",
      "clientSecret": "",
      "sdkURL": "",
      "redirectURL": "",
      "scope": [],
      "authorizationURL": "",
      "tokenURL": "",
      "userURL": ""
    },
    "shopifyCustomer": {
      "shopDomain": "",
      "clientId": "",
      "redirectURL": "",
      "scope": []
    },
    "oidc": {
      "clientId": "",
      "clientSecret": "",
      "openidConfig": "",
      "redirectURL": "",
      "scope": []
    },
    "osu": {
      "clientId": "",
      "clientSecret": "",
      "redirectURL": "",
      "scope": []
    },
    "riotgames": {
      "clientId": "",
      "clientSecret": "",
      "redirectURL": "",
      "scope": []
    }
  },
  "icon": {
    "serverKnownCssClasses": []
  },
  "ipx": {
    "baseURL": "/_ipx",
    "alias": {},
    "fs": {
      "dir": "../public"
    },
    "http": {
      "domains": []
    }
  }
};
const envOptions = {
  prefix: "NITRO_",
  altPrefix: _inlineRuntimeConfig.nitro.envPrefix ?? process.env.NITRO_ENV_PREFIX ?? "_",
  envExpansion: _inlineRuntimeConfig.nitro.envExpansion ?? process.env.NITRO_ENV_EXPANSION ?? false
};
const _sharedRuntimeConfig = _deepFreeze(
  applyEnv(klona(_inlineRuntimeConfig), envOptions)
);
function useRuntimeConfig(event) {
  if (!event) {
    return _sharedRuntimeConfig;
  }
  if (event.context.nitro.runtimeConfig) {
    return event.context.nitro.runtimeConfig;
  }
  const runtimeConfig = klona(_inlineRuntimeConfig);
  applyEnv(runtimeConfig, envOptions);
  event.context.nitro.runtimeConfig = runtimeConfig;
  return runtimeConfig;
}
_deepFreeze(klona(appConfig));
function _deepFreeze(object) {
  const propNames = Object.getOwnPropertyNames(object);
  for (const name of propNames) {
    const value = object[name];
    if (value && typeof value === "object") {
      _deepFreeze(value);
    }
  }
  return Object.freeze(object);
}
new Proxy(/* @__PURE__ */ Object.create(null), {
  get: (_, prop) => {
    console.warn(
      "Please use `useRuntimeConfig()` instead of accessing config directly."
    );
    const runtimeConfig = useRuntimeConfig();
    if (prop in runtimeConfig) {
      return runtimeConfig[prop];
    }
    return void 0;
  }
});

function createContext(opts = {}) {
  let currentInstance;
  let isSingleton = false;
  const checkConflict = (instance) => {
    if (currentInstance && currentInstance !== instance) {
      throw new Error("Context conflict");
    }
  };
  let als;
  if (opts.asyncContext) {
    const _AsyncLocalStorage = opts.AsyncLocalStorage || globalThis.AsyncLocalStorage;
    if (_AsyncLocalStorage) {
      als = new _AsyncLocalStorage();
    } else {
      console.warn("[unctx] `AsyncLocalStorage` is not provided.");
    }
  }
  const _getCurrentInstance = () => {
    if (als) {
      const instance = als.getStore();
      if (instance !== void 0) {
        return instance;
      }
    }
    return currentInstance;
  };
  return {
    use: () => {
      const _instance = _getCurrentInstance();
      if (_instance === void 0) {
        throw new Error("Context is not available");
      }
      return _instance;
    },
    tryUse: () => {
      return _getCurrentInstance();
    },
    set: (instance, replace) => {
      if (!replace) {
        checkConflict(instance);
      }
      currentInstance = instance;
      isSingleton = true;
    },
    unset: () => {
      currentInstance = void 0;
      isSingleton = false;
    },
    call: (instance, callback) => {
      checkConflict(instance);
      currentInstance = instance;
      try {
        return als ? als.run(instance, callback) : callback();
      } finally {
        if (!isSingleton) {
          currentInstance = void 0;
        }
      }
    },
    async callAsync(instance, callback) {
      currentInstance = instance;
      const onRestore = () => {
        currentInstance = instance;
      };
      const onLeave = () => currentInstance === instance ? onRestore : void 0;
      asyncHandlers.add(onLeave);
      try {
        const r = als ? als.run(instance, callback) : callback();
        if (!isSingleton) {
          currentInstance = void 0;
        }
        return await r;
      } finally {
        asyncHandlers.delete(onLeave);
      }
    }
  };
}
function createNamespace(defaultOpts = {}) {
  const contexts = {};
  return {
    get(key, opts = {}) {
      if (!contexts[key]) {
        contexts[key] = createContext({ ...defaultOpts, ...opts });
      }
      return contexts[key];
    }
  };
}
const _globalThis = typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : typeof global !== "undefined" ? global : {};
const globalKey = "__unctx__";
const defaultNamespace = _globalThis[globalKey] || (_globalThis[globalKey] = createNamespace());
const getContext = (key, opts = {}) => defaultNamespace.get(key, opts);
const asyncHandlersKey = "__unctx_async_handlers__";
const asyncHandlers = _globalThis[asyncHandlersKey] || (_globalThis[asyncHandlersKey] = /* @__PURE__ */ new Set());

getContext("nitro-app", {
  asyncContext: false,
  AsyncLocalStorage: void 0
});

function isPathInScope(pathname, base) {
  let canonical;
  try {
    const pre = pathname.replace(/%2f/gi, "/").replace(/%5c/gi, "\\");
    canonical = new URL(pre, "http://_").pathname;
  } catch {
    return false;
  }
  return !base || canonical === base || canonical.startsWith(base + "/");
}

const config = useRuntimeConfig();
const _routeRulesMatcher = toRouteMatcher(
  createRouter$1({ routes: config.nitro.routeRules })
);
function createRouteRulesHandler(ctx) {
  return eventHandler((event) => {
    const routeRules = getRouteRules(event);
    if (routeRules.headers) {
      setHeaders(event, routeRules.headers);
    }
    if (routeRules.redirect) {
      let target = routeRules.redirect.to;
      if (target.endsWith("/**")) {
        let targetPath = event.path;
        const strpBase = routeRules.redirect._redirectStripBase;
        if (strpBase) {
          if (!isPathInScope(event.path.split("?")[0], strpBase)) {
            throw createError$1({ statusCode: 400 });
          }
          targetPath = withoutBase(targetPath, strpBase);
        } else if (targetPath.startsWith("//")) {
          targetPath = targetPath.replace(/^\/+/, "/");
        }
        target = joinURL(target.slice(0, -3), targetPath);
      } else if (event.path.includes("?")) {
        const query = getQuery$1(event.path);
        target = withQuery(target, query);
      }
      return sendRedirect(event, target, routeRules.redirect.statusCode);
    }
    if (routeRules.proxy) {
      let target = routeRules.proxy.to;
      if (target.endsWith("/**")) {
        let targetPath = event.path;
        const strpBase = routeRules.proxy._proxyStripBase;
        if (strpBase) {
          if (!isPathInScope(event.path.split("?")[0], strpBase)) {
            throw createError$1({ statusCode: 400 });
          }
          targetPath = withoutBase(targetPath, strpBase);
        } else if (targetPath.startsWith("//")) {
          targetPath = targetPath.replace(/^\/+/, "/");
        }
        target = joinURL(target.slice(0, -3), targetPath);
      } else if (event.path.includes("?")) {
        const query = getQuery$1(event.path);
        target = withQuery(target, query);
      }
      return proxyRequest(event, target, {
        fetch: ctx.localFetch,
        ...routeRules.proxy
      });
    }
  });
}
function getRouteRules(event) {
  event.context._nitro = event.context._nitro || {};
  if (!event.context._nitro.routeRules) {
    event.context._nitro.routeRules = getRouteRulesForPath(
      withoutBase(event.path.split("?")[0], useRuntimeConfig().app.baseURL)
    );
  }
  return event.context._nitro.routeRules;
}
function getRouteRulesForPath(path) {
  return defu({}, ..._routeRulesMatcher.matchAll(path).reverse());
}

function _captureError(error, type) {
  console.error(`[${type}]`, error);
  useNitroApp().captureError(error, { tags: [type] });
}
function trapUnhandledNodeErrors() {
  process.on(
    "unhandledRejection",
    (error) => _captureError(error, "unhandledRejection")
  );
  process.on(
    "uncaughtException",
    (error) => _captureError(error, "uncaughtException")
  );
}
function joinHeaders(value) {
  return Array.isArray(value) ? value.join(", ") : String(value);
}
function normalizeFetchResponse(response) {
  if (!response.headers.has("set-cookie")) {
    return response;
  }
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: normalizeCookieHeaders(response.headers)
  });
}
function normalizeCookieHeader(header = "") {
  return splitCookiesString(joinHeaders(header));
}
function normalizeCookieHeaders(headers) {
  const outgoingHeaders = new Headers();
  for (const [name, header] of headers) {
    if (name === "set-cookie") {
      for (const cookie of normalizeCookieHeader(header)) {
        outgoingHeaders.append("set-cookie", cookie);
      }
    } else {
      outgoingHeaders.set(name, joinHeaders(header));
    }
  }
  return outgoingHeaders;
}

function isJsonRequest(event) {
	
	if (hasReqHeader(event, "accept", "text/html")) {
		return false;
	}
	return hasReqHeader(event, "accept", "application/json") || hasReqHeader(event, "user-agent", "curl/") || hasReqHeader(event, "user-agent", "httpie/") || hasReqHeader(event, "sec-fetch-mode", "cors") || event.path.startsWith("/api/") || event.path.endsWith(".json");
}
function hasReqHeader(event, name, includes) {
	const value = getRequestHeader(event, name);
	return !!(value && typeof value === "string" && value.toLowerCase().includes(includes));
}

const errorHandler$0 = (async function errorhandler(error, event, { defaultHandler }) {
	if (event.handled || isJsonRequest(event)) {
		
		return;
	}
	
	const defaultRes = await defaultHandler(error, event, { json: true });
	
	const status = error.status || error.statusCode || 500;
	if (status === 404 && defaultRes.status === 302) {
		setResponseHeaders(event, defaultRes.headers);
		setResponseStatus(event, defaultRes.status, defaultRes.statusText);
		return send(event, JSON.stringify(defaultRes.body, null, 2));
	}
	const errorObject = defaultRes.body;
	
	const url = new URL(errorObject.url);
	errorObject.url = withoutBase(url.pathname, useRuntimeConfig(event).app.baseURL) + url.search + url.hash;
	
	errorObject.message = error.unhandled ? errorObject.message || "Server Error" : error.message || errorObject.message || "Server Error";
	
	errorObject.data ||= error.data;
	errorObject.statusText ||= error.statusText || error.statusMessage;
	delete defaultRes.headers["content-type"];
	delete defaultRes.headers["content-security-policy"];
	setResponseHeaders(event, defaultRes.headers);
	
	const reqHeaders = getRequestHeaders(event);
	
	const isRenderingError = event.path.startsWith("/__nuxt_error") || !!reqHeaders["x-nuxt-error"];
	
	const res = isRenderingError ? null : await useNitroApp().localFetch(withQuery(joinURL(useRuntimeConfig(event).app.baseURL, "/__nuxt_error"), errorObject), {
		headers: {
			...reqHeaders,
			"x-nuxt-error": "true"
		},
		redirect: "manual"
	}).catch(() => null);
	if (event.handled) {
		return;
	}
	
	if (!res) {
		const { template } = await import('../_/error-500.mjs');
		setResponseHeader(event, "Content-Type", "text/html;charset=UTF-8");
		return send(event, template(errorObject));
	}
	const html = await res.text();
	for (const [header, value] of res.headers.entries()) {
		if (header === "set-cookie") {
			appendResponseHeader(event, header, value);
			continue;
		}
		setResponseHeader(event, header, value);
	}
	setResponseStatus(event, res.status && res.status !== 200 ? res.status : defaultRes.status, res.statusText || defaultRes.statusText);
	return send(event, html);
});

function defineNitroErrorHandler(handler) {
  return handler;
}

const errorHandler$1 = defineNitroErrorHandler(
  function defaultNitroErrorHandler(error, event) {
    const res = defaultHandler(error, event);
    setResponseHeaders(event, res.headers);
    setResponseStatus(event, res.status, res.statusText);
    return send(event, JSON.stringify(res.body, null, 2));
  }
);
function defaultHandler(error, event, opts) {
  const isSensitive = error.unhandled || error.fatal;
  const statusCode = error.statusCode || 500;
  const statusMessage = error.statusMessage || "Server Error";
  const url = getRequestURL(event, { xForwardedHost: true, xForwardedProto: true });
  if (statusCode === 404) {
    const baseURL = "/";
    if (/^\/[^/]/.test(baseURL) && !url.pathname.startsWith(baseURL)) {
      const redirectTo = `${baseURL}${url.pathname.slice(1)}${url.search}`;
      return {
        status: 302,
        statusText: "Found",
        headers: { location: redirectTo },
        body: `Redirecting...`
      };
    }
  }
  if (isSensitive && !opts?.silent) {
    const tags = [error.unhandled && "[unhandled]", error.fatal && "[fatal]"].filter(Boolean).join(" ");
    console.error(`[request error] ${tags} [${event.method}] ${url}
`, error);
  }
  const headers = {
    "content-type": "application/json",
    // Prevent browser from guessing the MIME types of resources.
    "x-content-type-options": "nosniff",
    // Prevent error page from being embedded in an iframe
    "x-frame-options": "DENY",
    // Prevent browsers from sending the Referer header
    "referrer-policy": "no-referrer",
    // Disable the execution of any js
    "content-security-policy": "script-src 'none'; frame-ancestors 'none';"
  };
  setResponseStatus(event, statusCode, statusMessage);
  if (statusCode === 404 || !getResponseHeader(event, "cache-control")) {
    headers["cache-control"] = "no-cache";
  }
  const body = {
    error: true,
    url: url.href,
    statusCode,
    statusMessage,
    message: isSensitive ? "Server Error" : error.message,
    data: isSensitive ? void 0 : error.data
  };
  return {
    status: statusCode,
    statusText: statusMessage,
    headers,
    body
  };
}

const errorHandlers = [errorHandler$0, errorHandler$1];

async function errorHandler(error, event) {
  for (const handler of errorHandlers) {
    try {
      await handler(error, event, { defaultHandler });
      if (event.handled) {
        return; // Response handled
      }
    } catch(error) {
      // Handler itself thrown, log and continue
      console.error(error);
    }
  }
  // H3 will handle fallback
}

const _72rdM3gRxjYczXChZls5i8aHxH1iSWd92H8wuXVceI = defineNitroPlugin((nitroApp) => {
  if (process.env.NUXT_OAUTH_FACEBOOK_CLIENT_ID && process.env.NUXT_OAUTH_FACEBOOK_CLIENT_SECRET || process.env.NUXT_OAUTH_INSTAGRAM_CLIENT_ID && process.env.NUXT_OAUTH_INSTAGRAM_CLIENT_SECRET) {
    nitroApp.hooks.hook("render:html", (html) => {
      html.head.unshift(`
      <script>
        if (window.location.hash === "#_=_"){
          history.replaceState
              ? history.replaceState(null, null, window.location.href.split("#")[0])
              : window.location.hash = "";
        }
      <\/script>
    `);
    });
  }
});

const script = "\"use strict\";(()=>{const t=window,e=document.documentElement,c=[\"dark\",\"light\"],n=getStorageValue(\"localStorage\",\"nuxt-color-mode\")||\"system\";let i=n===\"system\"?u():n;const r=e.getAttribute(\"data-color-mode-forced\");r&&(i=r),l(i),t[\"__NUXT_COLOR_MODE__\"]={preference:n,value:i,getColorScheme:u,addColorScheme:l,removeColorScheme:d};function l(o){const s=\"\"+o+\"\",a=\"theme\";e.classList?e.classList.add(s):e.className+=\" \"+s,a&&e.setAttribute(\"data-\"+a,o)}function d(o){const s=\"\"+o+\"\",a=\"theme\";e.classList?e.classList.remove(s):e.className=e.className.replace(new RegExp(s,\"g\"),\"\"),a&&e.removeAttribute(\"data-\"+a)}function f(o){return t.matchMedia(\"(prefers-color-scheme\"+o+\")\")}function u(){if(t.matchMedia&&f(\"\").media!==\"not all\"){for(const o of c)if(f(\":\"+o).matches)return o}return\"light\"}})();function getStorageValue(t,e){switch(t){case\"localStorage\":return window.localStorage.getItem(e);case\"sessionStorage\":return window.sessionStorage.getItem(e);case\"cookie\":return getCookie(e);default:return null}}function getCookie(t){const c=(\"; \"+window.document.cookie).split(\"; \"+t+\"=\");if(c.length===2)return c.pop()?.split(\";\").shift()}";

const __lNdKKPKR6mLiwFlPOsO8k6EkQYVEzOlLk2aywnkSnU = (function(nitro) {
  nitro.hooks.hook("render:html", (htmlContext) => {
    htmlContext.head.push(`<script>${script}<\/script>`);
  });
});

const plugins = [
  _72rdM3gRxjYczXChZls5i8aHxH1iSWd92H8wuXVceI,
__lNdKKPKR6mLiwFlPOsO8k6EkQYVEzOlLk2aywnkSnU
];

const assets = {
  "/favicon.ico": {
    "type": "image/vnd.microsoft.icon",
    "etag": "\"4a82-Cq74D5kyjiUvih5Pxl9gJIOqLII\"",
    "mtime": "2026-08-23T00:18:02.667Z",
    "size": 19074,
    "path": "../public/favicon.ico"
  },
  "/manifest.webmanifest": {
    "type": "application/manifest+json",
    "etag": "\"31c-NITbSR1r/+vEZ6vGOHRC9YLm8ig\"",
    "mtime": "2026-08-23T00:18:02.643Z",
    "size": 796,
    "path": "../public/manifest.webmanifest"
  },
  "/robots.txt": {
    "type": "text/plain; charset=utf-8",
    "etag": "\"41-FluGBVH9Oar1S8FXibDgHSdYMFM\"",
    "mtime": "2026-08-23T00:18:02.667Z",
    "size": 65,
    "path": "../public/robots.txt"
  },
  "/sw.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"100a-Kpmz+FWZ8gVRtMaaWV8q+ifjPSg\"",
    "mtime": "2026-08-23T00:18:03.657Z",
    "size": 4106,
    "path": "../public/sw.js"
  },
  "/_fonts/178SDQEgKlkYIwN3m_zkIjcMBXox4CVikxxdM0ZM8vo-jb38HpZEzI0_yhPLZ-Yy9g2MdhSlJbWEEPtE4J-7mA4.woff2": {
    "type": "font/woff2",
    "etag": "\"2998-n4Ng0qtMjpor9BjKimp6sLXh5BI\"",
    "mtime": "2026-08-23T00:18:02.646Z",
    "size": 10648,
    "path": "../public/_fonts/178SDQEgKlkYIwN3m_zkIjcMBXox4CVikxxdM0ZM8vo-jb38HpZEzI0_yhPLZ-Yy9g2MdhSlJbWEEPtE4J-7mA4.woff2"
  },
  "/_fonts/AIcocMSXl6nLNQXbUptJf69FjdmzotJy-Fioo4iy220-SB6HQ5Gm3Vcgx3qj0cg_Wze4ux2YBnw264Bp9JBOtqc.woff2": {
    "type": "font/woff2",
    "etag": "\"2f04-ntsyPpeWIrXM3hz1Nt0hG95RmwU\"",
    "mtime": "2026-08-23T00:18:02.646Z",
    "size": 12036,
    "path": "../public/_fonts/AIcocMSXl6nLNQXbUptJf69FjdmzotJy-Fioo4iy220-SB6HQ5Gm3Vcgx3qj0cg_Wze4ux2YBnw264Bp9JBOtqc.woff2"
  },
  "/_fonts/CFNPQVcnBImzX0EtDNVhm6rxBn1xmGUJ07BRlOI64c-AuN8M25eo79PWJa2sA8bcOzJYOX3pV7Xznm4ZDHm7L4.woff2": {
    "type": "font/woff2",
    "etag": "\"6afc-065UyE/loH4v/KPT2cqQjWbu2Yc\"",
    "mtime": "2026-08-23T00:18:02.647Z",
    "size": 27388,
    "path": "../public/_fonts/CFNPQVcnBImzX0EtDNVhm6rxBn1xmGUJ07BRlOI64c-AuN8M25eo79PWJa2sA8bcOzJYOX3pV7Xznm4ZDHm7L4.woff2"
  },
  "/_fonts/5M2MKUFWnEpuT8NeCYosby4H1wQsStpPWE7MBNFFD6Q-6gJALEDS7yNhRMCqenJPe8GZSicXSdryDX23b39FgW8.woff2": {
    "type": "font/woff2",
    "etag": "\"4e30-CJVl1taa8AaNO619z7s06dRAxFQ\"",
    "mtime": "2026-08-23T00:18:02.646Z",
    "size": 20016,
    "path": "../public/_fonts/5M2MKUFWnEpuT8NeCYosby4H1wQsStpPWE7MBNFFD6Q-6gJALEDS7yNhRMCqenJPe8GZSicXSdryDX23b39FgW8.woff2"
  },
  "/_fonts/ERDypvkxXdChOV_B5u1ryQXmRbXDEMV5qjyhhW3xYeU-k61Y5mwieeHUzISWavQeKX6iyBBLnhRtxyom_DNxZzo.woff2": {
    "type": "font/woff2",
    "etag": "\"4a64-m06OCqyGws0mpyGBBfmbbVtFPSU\"",
    "mtime": "2026-08-23T00:18:02.646Z",
    "size": 19044,
    "path": "../public/_fonts/ERDypvkxXdChOV_B5u1ryQXmRbXDEMV5qjyhhW3xYeU-k61Y5mwieeHUzISWavQeKX6iyBBLnhRtxyom_DNxZzo.woff2"
  },
  "/workbox-fdfec1f0.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"5b6d-3rd/N7QbM5KIdY0Q5H6EUvcK2EE\"",
    "mtime": "2026-08-23T00:18:03.658Z",
    "size": 23405,
    "path": "../public/workbox-fdfec1f0.js"
  },
  "/_fonts/HgJel4iAS5mDVqJaDUYKmxaMJg4zKHTGmyD1FQkOsTM-2hVuuQIZ4GSGMgNv6dvlqz7cfD6lr7xLohUph7OCgFg.woff2": {
    "type": "font/woff2",
    "etag": "\"bd30-HcBE9IJP1a9r/tZ/7ki+cPoGnz8\"",
    "mtime": "2026-08-23T00:18:02.647Z",
    "size": 48432,
    "path": "../public/_fonts/HgJel4iAS5mDVqJaDUYKmxaMJg4zKHTGmyD1FQkOsTM-2hVuuQIZ4GSGMgNv6dvlqz7cfD6lr7xLohUph7OCgFg.woff2"
  },
  "/_fonts/UzhR3nAaijOxr33OombACPQO7z-6yxLefOdxL2qrdkM-a0beAYA6HgY0fQ5vpHiCL_P_ChfPRJkoN6xel0ZbT_M.woff2": {
    "type": "font/woff2",
    "etag": "\"4938-N3S2eKZrRgCJpY2MefXWBufCQaA\"",
    "mtime": "2026-08-23T00:18:02.647Z",
    "size": 18744,
    "path": "../public/_fonts/UzhR3nAaijOxr33OombACPQO7z-6yxLefOdxL2qrdkM-a0beAYA6HgY0fQ5vpHiCL_P_ChfPRJkoN6xel0ZbT_M.woff2"
  },
  "/_fonts/ev87GAhzYOSqfvXc9scW-ZQJf7sUSUyGMr0CTeNoHF4-OPxwrsi67j0FWChFcXKyN9HLyQ7mKYh_4Vn2yBtMd_0.woff2": {
    "type": "font/woff2",
    "etag": "\"329c-pgjdqEJ/pRymFTiPlGRBo4a6JGc\"",
    "mtime": "2026-08-23T00:18:02.647Z",
    "size": 12956,
    "path": "../public/_fonts/ev87GAhzYOSqfvXc9scW-ZQJf7sUSUyGMr0CTeNoHF4-OPxwrsi67j0FWChFcXKyN9HLyQ7mKYh_4Vn2yBtMd_0.woff2"
  },
  "/_fonts/HhYBt2tJo2k_2FsC1MSJ02On6MHSDmuCPvumUmOm5zc-yFegZxCeG5mKQV3aepxTxPDsb0t6St8NI3MRVbeEMG4.woff2": {
    "type": "font/woff2",
    "etag": "\"9e70-0fSSZlKD7bJtOv0dU+bvhgiNq/c\"",
    "mtime": "2026-08-23T00:18:02.647Z",
    "size": 40560,
    "path": "../public/_fonts/HhYBt2tJo2k_2FsC1MSJ02On6MHSDmuCPvumUmOm5zc-yFegZxCeG5mKQV3aepxTxPDsb0t6St8NI3MRVbeEMG4.woff2"
  },
  "/_fonts/ez4lVSyRqqCUuKH6dN6OoXAdOd1Tig7Lx0sxWNqSyss-FAPjTJvN2otlgkrcoQlc70SE03hjkWoDwAr5QrM_lH4.woff2": {
    "type": "font/woff2",
    "etag": "\"2828-F3GDdFn8yIqL/ZsbzNDCHlQrmMo\"",
    "mtime": "2026-08-23T00:18:02.647Z",
    "size": 10280,
    "path": "../public/_fonts/ez4lVSyRqqCUuKH6dN6OoXAdOd1Tig7Lx0sxWNqSyss-FAPjTJvN2otlgkrcoQlc70SE03hjkWoDwAr5QrM_lH4.woff2"
  },
  "/_fonts/XBS0oYP4cksqAElU3IMxAgwpzDzoJIEwfkOV-ozb58o-GfiQeHg5K0elW9dt1_DFU0HCdwAzUNFfFmYXBrpZ7S0.woff2": {
    "type": "font/woff2",
    "etag": "\"2d10-e7FQEQbLCqMJBoSFzJ7HVEw7B/8\"",
    "mtime": "2026-08-23T00:18:02.647Z",
    "size": 11536,
    "path": "../public/_fonts/XBS0oYP4cksqAElU3IMxAgwpzDzoJIEwfkOV-ozb58o-GfiQeHg5K0elW9dt1_DFU0HCdwAzUNFfFmYXBrpZ7S0.woff2"
  },
  "/_fonts/ffbDlYcgTaEOnso-ipkZyoviU7H_qu1vdDKLzdRMiGk-z0cz_vXe9FMQpUr1XPibpV3rF_SBN35ESvr3xAG3hgg.woff2": {
    "type": "font/woff2",
    "etag": "\"2c08-0jmpRV2Mkkir4F2SgNetftT+X2g\"",
    "mtime": "2026-08-23T00:18:02.647Z",
    "size": 11272,
    "path": "../public/_fonts/ffbDlYcgTaEOnso-ipkZyoviU7H_qu1vdDKLzdRMiGk-z0cz_vXe9FMQpUr1XPibpV3rF_SBN35ESvr3xAG3hgg.woff2"
  },
  "/_fonts/KCD5gdyGvwD04J2YZVfG5P-c82WM-ESA68SM8qCokq0-VU4O6gA3mknWHXkXUMY7aShByLKqEZOCYay7MuxAVuU.woff2": {
    "type": "font/woff2",
    "etag": "\"c9b4-M34QudaP9GdXqIjZ6Tla/ROWz5M\"",
    "mtime": "2026-08-23T00:18:02.647Z",
    "size": 51636,
    "path": "../public/_fonts/KCD5gdyGvwD04J2YZVfG5P-c82WM-ESA68SM8qCokq0-VU4O6gA3mknWHXkXUMY7aShByLKqEZOCYay7MuxAVuU.woff2"
  },
  "/_fonts/gKY12I0xR6XlZGrxmgE6Ajg7dolnFcwq2-CgW16emfc-X7w6QUwy0G27X1sBOv3U2zKeLNfjYiwTzwCsHp_sD_I.woff2": {
    "type": "font/woff2",
    "etag": "\"5084-wzEMqHmSXhs0bT3Vh/Szi16YDd8\"",
    "mtime": "2026-08-23T00:18:02.648Z",
    "size": 20612,
    "path": "../public/_fonts/gKY12I0xR6XlZGrxmgE6Ajg7dolnFcwq2-CgW16emfc-X7w6QUwy0G27X1sBOv3U2zKeLNfjYiwTzwCsHp_sD_I.woff2"
  },
  "/_fonts/_Q-se7FdIUrHjDmNsUL0V1o4K296p_VatHM-Pv4kyIc-poDrWqUb4dHlPgVcAp1htO9EsFEw_Puw06dBCjRLmMs.woff2": {
    "type": "font/woff2",
    "etag": "\"b238-3zvpRFpuhxtq7yyHaRlbSb0N5E0\"",
    "mtime": "2026-08-23T00:18:02.647Z",
    "size": 45624,
    "path": "../public/_fonts/_Q-se7FdIUrHjDmNsUL0V1o4K296p_VatHM-Pv4kyIc-poDrWqUb4dHlPgVcAp1htO9EsFEw_Puw06dBCjRLmMs.woff2"
  },
  "/_fonts/IbbswF-_Vv86nKnoVzycaklhFj9_jJEnyisnqN6LmPo-m6Ab3Re0t4DnCyR1DwEHCEvwfevkTcA65xJQ4ZPG4co.woff2": {
    "type": "font/woff2",
    "etag": "\"166bc-r/t3z77mQ+DDMQr+Pkm5yR2/0FE\"",
    "mtime": "2026-08-23T00:18:02.647Z",
    "size": 91836,
    "path": "../public/_fonts/IbbswF-_Vv86nKnoVzycaklhFj9_jJEnyisnqN6LmPo-m6Ab3Re0t4DnCyR1DwEHCEvwfevkTcA65xJQ4ZPG4co.woff2"
  },
  "/_fonts/pZrE-slef2USYSteHMofh38tG-0x5V8w3-m5O8o55BA-2lkoGCOmO7jeyF1uZ0eej8W_w9soLdR904X6bIAsF0k.woff2": {
    "type": "font/woff2",
    "etag": "\"8ed0-eh/Gun7T5jVPFsV7DfQgO0ITAUc\"",
    "mtime": "2026-08-23T00:18:02.647Z",
    "size": 36560,
    "path": "../public/_fonts/pZrE-slef2USYSteHMofh38tG-0x5V8w3-m5O8o55BA-2lkoGCOmO7jeyF1uZ0eej8W_w9soLdR904X6bIAsF0k.woff2"
  },
  "/_fonts/hlBhAijgZdVxBjR74rbt7K71I0wV1mB3jH1hVBCHlKk-FRNF6Y0H_i7oP64VN4wUyVdHpXDaloc-0nVuax5BR6w.woff2": {
    "type": "font/woff2",
    "etag": "\"8368-LmGNgqQjbZky4QjuDYsGzoM544k\"",
    "mtime": "2026-08-23T00:18:02.648Z",
    "size": 33640,
    "path": "../public/_fonts/hlBhAijgZdVxBjR74rbt7K71I0wV1mB3jH1hVBCHlKk-FRNF6Y0H_i7oP64VN4wUyVdHpXDaloc-0nVuax5BR6w.woff2"
  },
  "/_fonts/zp_5eX_kcCb1NC9W_nqDxOyw80DU-fOCfH6vtlxk4Z8-noxSJKtVKEVnythGOQu3KozvszjDOTsJmBloptS0j1U.woff2": {
    "type": "font/woff2",
    "etag": "\"64f4-tK7ixsAzSz1n1+rZ0d41uh7QBHY\"",
    "mtime": "2026-08-23T00:18:02.648Z",
    "size": 25844,
    "path": "../public/_fonts/zp_5eX_kcCb1NC9W_nqDxOyw80DU-fOCfH6vtlxk4Z8-noxSJKtVKEVnythGOQu3KozvszjDOTsJmBloptS0j1U.woff2"
  },
  "/_fonts/zkQRrBN3g9v_dVJWVkYryI2HWN4gfl77yu_FVFWNDYY-dCKEZ5lgZTVD30ATELD5lKDbBeBCP_ph7B4YtZQnSns.woff2": {
    "type": "font/woff2",
    "etag": "\"14d18-Uh4k0XQeDHQ4ioQoYVD4qScmVZc\"",
    "mtime": "2026-08-23T00:18:02.648Z",
    "size": 85272,
    "path": "../public/_fonts/zkQRrBN3g9v_dVJWVkYryI2HWN4gfl77yu_FVFWNDYY-dCKEZ5lgZTVD30ATELD5lKDbBeBCP_ph7B4YtZQnSns.woff2"
  },
  "/_nuxt/1Lvgq1PF.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1394-pUFHV/RlXYK9jqsExwLbDFjHg+s\"",
    "mtime": "2026-08-23T00:18:02.654Z",
    "size": 5012,
    "path": "../public/_nuxt/1Lvgq1PF.js"
  },
  "/_nuxt/B9CRkeHT.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1876-8F+zm7LVUcG79NYlK01An3FhLuk\"",
    "mtime": "2026-08-23T00:18:02.654Z",
    "size": 6262,
    "path": "../public/_nuxt/B9CRkeHT.js"
  },
  "/_nuxt/BBnX5xw4.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1674-HyZL1eUl9QW4o4RCa0ogOE8HLCk\"",
    "mtime": "2026-08-23T00:18:02.654Z",
    "size": 5748,
    "path": "../public/_nuxt/BBnX5xw4.js"
  },
  "/_nuxt/BPui366z.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"194d-sn5MlxvrNIV2dncwXk1puS7ndvc\"",
    "mtime": "2026-08-23T00:18:02.655Z",
    "size": 6477,
    "path": "../public/_nuxt/BPui366z.js"
  },
  "/_nuxt/BP6xkuqf.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"2607-PuWR7p5Iyiw7tF0wc/jEvCH001I\"",
    "mtime": "2026-08-23T00:18:02.654Z",
    "size": 9735,
    "path": "../public/_nuxt/BP6xkuqf.js"
  },
  "/_nuxt/B_x6TUkB.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"230a-qhyRsSg7VCNKjF2F3L0apfzUs6s\"",
    "mtime": "2026-08-23T00:18:02.655Z",
    "size": 8970,
    "path": "../public/_nuxt/B_x6TUkB.js"
  },
  "/_nuxt/BaU_6_Np.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"117-/QF28V6e+389UVtL/J3huDszRbA\"",
    "mtime": "2026-08-23T00:18:02.655Z",
    "size": 279,
    "path": "../public/_nuxt/BaU_6_Np.js"
  },
  "/_nuxt/BcFWamNj.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1400-WR+6Wc59AKNo0XM/WjsJivlI9ww\"",
    "mtime": "2026-08-23T00:18:02.655Z",
    "size": 5120,
    "path": "../public/_nuxt/BcFWamNj.js"
  },
  "/_nuxt/Bf0eYNFJ.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"12f-sj+MG4kWpw13YaknhyEOEG+jW7E\"",
    "mtime": "2026-08-23T00:18:02.655Z",
    "size": 303,
    "path": "../public/_nuxt/Bf0eYNFJ.js"
  },
  "/_nuxt/Bf1w67Hz.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1033-r/9cOXOimGml796tP15CvNUhSXg\"",
    "mtime": "2026-08-23T00:18:02.655Z",
    "size": 4147,
    "path": "../public/_nuxt/Bf1w67Hz.js"
  },
  "/_nuxt/Bhy6askw.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"144c-IKcQUqfGkqVDX/jhQhYwsdnxuh8\"",
    "mtime": "2026-08-23T00:18:02.655Z",
    "size": 5196,
    "path": "../public/_nuxt/Bhy6askw.js"
  },
  "/_nuxt/Bl7HU-bt.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1303-V6T10Nx7IVchRSb1GkIo6yJeSGg\"",
    "mtime": "2026-08-23T00:18:02.655Z",
    "size": 4867,
    "path": "../public/_nuxt/Bl7HU-bt.js"
  },
  "/_nuxt/Br1Vu3Wp.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"3b7-wqm50yAwTVBaf7EmfuQg9c6knT0\"",
    "mtime": "2026-08-23T00:18:02.655Z",
    "size": 951,
    "path": "../public/_nuxt/Br1Vu3Wp.js"
  },
  "/_nuxt/Br6CG-0M.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"10dd9-tBE9RB85GWM6asXWgRbTtdmGocw\"",
    "mtime": "2026-08-23T00:18:02.655Z",
    "size": 69081,
    "path": "../public/_nuxt/Br6CG-0M.js"
  },
  "/_nuxt/B_TZdvg1.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"76e96-Ufdgqku5BmuX4fribb/Qovn/Z3E\"",
    "mtime": "2026-08-23T00:18:02.655Z",
    "size": 487062,
    "path": "../public/_nuxt/B_TZdvg1.js"
  },
  "/_nuxt/BxDnoh6j.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"92c7-vG6vOYtkkbZDLii2UTnzFg3touY\"",
    "mtime": "2026-08-23T00:18:02.655Z",
    "size": 37575,
    "path": "../public/_nuxt/BxDnoh6j.js"
  },
  "/_nuxt/By1RO8Ha.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"161b-BlxLjJaoB45ZMIuIuF04rASEhRQ\"",
    "mtime": "2026-08-23T00:18:02.655Z",
    "size": 5659,
    "path": "../public/_nuxt/By1RO8Ha.js"
  },
  "/_nuxt/CFSnuymY.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"eb7-UR2q/IEku+fLcI2cgnl7nvZVeZU\"",
    "mtime": "2026-08-23T00:18:02.655Z",
    "size": 3767,
    "path": "../public/_nuxt/CFSnuymY.js"
  },
  "/_nuxt/CIGz_Voq.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"39c0-zDdYYkMNG3tzv329Biey+ba8MnQ\"",
    "mtime": "2026-08-23T00:18:02.656Z",
    "size": 14784,
    "path": "../public/_nuxt/CIGz_Voq.js"
  },
  "/_nuxt/CIMf5X3V.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"3601-qskEFEYbjbkkzkq7y0/WDQAd5As\"",
    "mtime": "2026-08-23T00:18:02.656Z",
    "size": 13825,
    "path": "../public/_nuxt/CIMf5X3V.js"
  },
  "/_nuxt/CJ8D7aUY.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"3b1-j0x+UuZtuUpM4NJwMVGjeC7HTrE\"",
    "mtime": "2026-08-23T00:18:02.656Z",
    "size": 945,
    "path": "../public/_nuxt/CJ8D7aUY.js"
  },
  "/_nuxt/CRVoI9_M.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"eb9-RB2KTbm5Ui2sXCrj4dBYYw6gIVs\"",
    "mtime": "2026-08-23T00:18:02.656Z",
    "size": 3769,
    "path": "../public/_nuxt/CRVoI9_M.js"
  },
  "/_nuxt/CS2Uf3Fq.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"326a-7MraZRyMJhGYv60Dzf+mJzfjTrg\"",
    "mtime": "2026-08-23T00:18:02.656Z",
    "size": 12906,
    "path": "../public/_nuxt/CS2Uf3Fq.js"
  },
  "/_nuxt/Ca8V7yId.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"171-lUH5eaBbAcjC9R+pOrj4PoT55mA\"",
    "mtime": "2026-08-23T00:18:02.656Z",
    "size": 369,
    "path": "../public/_nuxt/Ca8V7yId.js"
  },
  "/_nuxt/CQwIRofc.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"15b561-5TupHPdnMMFTErdaiD+3ykH0P9Y\"",
    "mtime": "2026-08-23T00:18:02.657Z",
    "size": 1422689,
    "path": "../public/_nuxt/CQwIRofc.js"
  },
  "/_nuxt/Cpj98o6Y.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"ec-QtY1KaLA8vnMK3l2IvajpxyuPmY\"",
    "mtime": "2026-08-23T00:18:02.656Z",
    "size": 236,
    "path": "../public/_nuxt/Cpj98o6Y.js"
  },
  "/_nuxt/Ceu_I_o1.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"17e6-dB9qzWT3/CoMX4ytyQQgK/AHpVI\"",
    "mtime": "2026-08-23T00:18:02.656Z",
    "size": 6118,
    "path": "../public/_nuxt/Ceu_I_o1.js"
  },
  "/_nuxt/D7o2sT-C.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"300-G9wOROHahNLOdYmD65i6XmMCHrs\"",
    "mtime": "2026-08-23T00:18:02.656Z",
    "size": 768,
    "path": "../public/_nuxt/D7o2sT-C.js"
  },
  "/_nuxt/D4k11_F0.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"d1-HZnY3q6dPZouTgQpXm8JowVUA10\"",
    "mtime": "2026-08-23T00:18:02.656Z",
    "size": 209,
    "path": "../public/_nuxt/D4k11_F0.js"
  },
  "/_nuxt/CmvLzwoe.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"6bbc-KOqERr1kUyf41++/H7xiGT8VuMI\"",
    "mtime": "2026-08-23T00:18:02.656Z",
    "size": 27580,
    "path": "../public/_nuxt/CmvLzwoe.js"
  },
  "/_nuxt/DH2ib8BS.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"788c-7FBxjjV4X3Y885thJQctN4pW6Eg\"",
    "mtime": "2026-08-23T00:18:02.657Z",
    "size": 30860,
    "path": "../public/_nuxt/DH2ib8BS.js"
  },
  "/_nuxt/DE4I8KHD.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"d96-fy9iY+33KiMONCz+E1G+eJNXbuA\"",
    "mtime": "2026-08-23T00:18:02.656Z",
    "size": 3478,
    "path": "../public/_nuxt/DE4I8KHD.js"
  },
  "/_nuxt/DGDmzsDN.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"338-MILo6o8M9DMxjaaeQLy1r/0A7p8\"",
    "mtime": "2026-08-23T00:18:02.656Z",
    "size": 824,
    "path": "../public/_nuxt/DGDmzsDN.js"
  },
  "/_nuxt/DiATl6Db.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"23ca-U+6NTCtdvRr+4eaov52aTS1c/1A\"",
    "mtime": "2026-08-23T00:18:02.657Z",
    "size": 9162,
    "path": "../public/_nuxt/DiATl6Db.js"
  },
  "/_nuxt/DkubK7nf.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"27a-uoU9TJU6Fj8nYSV4gwkxKtmBb6I\"",
    "mtime": "2026-08-23T00:18:02.657Z",
    "size": 634,
    "path": "../public/_nuxt/DkubK7nf.js"
  },
  "/_nuxt/DlAUqK2U.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"5b-eFCz/UrraTh721pgAl0VxBNR1es\"",
    "mtime": "2026-08-23T00:18:02.657Z",
    "size": 91,
    "path": "../public/_nuxt/DlAUqK2U.js"
  },
  "/_nuxt/DvXkyWUv.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"5c0-PJCkhAVySodc5GTg299aDe0ZWN0\"",
    "mtime": "2026-08-23T00:18:02.658Z",
    "size": 1472,
    "path": "../public/_nuxt/DvXkyWUv.js"
  },
  "/_nuxt/DYK5QIg5.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"6bc8-88qwnSV/9gPddJpQQfMtO/e+ADE\"",
    "mtime": "2026-08-23T00:18:02.657Z",
    "size": 27592,
    "path": "../public/_nuxt/DYK5QIg5.js"
  },
  "/_nuxt/Dnwg_SMN.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"17c9-BenXf3/Auy5PyWEX4I6pcelk3jI\"",
    "mtime": "2026-08-23T00:18:02.657Z",
    "size": 6089,
    "path": "../public/_nuxt/Dnwg_SMN.js"
  },
  "/_nuxt/D_L1N4xU.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"8aeb-BOapy5YcLlzi+UJ1L+SDjtAoaPs\"",
    "mtime": "2026-08-23T00:18:02.657Z",
    "size": 35563,
    "path": "../public/_nuxt/D_L1N4xU.js"
  },
  "/_nuxt/DxqjbiQF.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"17d-2t2G1h2XTfrZBPjMIJQwh98LXaE\"",
    "mtime": "2026-08-23T00:18:02.658Z",
    "size": 381,
    "path": "../public/_nuxt/DxqjbiQF.js"
  },
  "/_nuxt/HKnxAzgM.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1381-dCxaNjHU2zFtXxpMSwBzMa/5Xb4\"",
    "mtime": "2026-08-23T00:18:02.658Z",
    "size": 4993,
    "path": "../public/_nuxt/HKnxAzgM.js"
  },
  "/_nuxt/LeadMessageComposer.Dz26N6Np.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"b1-rfNuZXz1IB88iaGkZxDoRNCzSXI\"",
    "mtime": "2026-08-23T00:18:02.658Z",
    "size": 177,
    "path": "../public/_nuxt/LeadMessageComposer.Dz26N6Np.css"
  },
  "/_nuxt/NhAuhtDz.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"2dd-OrH5b1+J/net0oIhUjMkoDvtHSw\"",
    "mtime": "2026-08-23T00:18:02.658Z",
    "size": 733,
    "path": "../public/_nuxt/NhAuhtDz.js"
  },
  "/_nuxt/Qp1GScqz.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"e315-opKS81/mEXEzfeP+UKySHA2GfCM\"",
    "mtime": "2026-08-23T00:18:02.658Z",
    "size": 58133,
    "path": "../public/_nuxt/Qp1GScqz.js"
  },
  "/_nuxt/ImcRSTA7.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"15e6a-sXSh4wY+XAEztyyQBsLaKfNFRUs\"",
    "mtime": "2026-08-23T00:18:02.658Z",
    "size": 89706,
    "path": "../public/_nuxt/ImcRSTA7.js"
  },
  "/_nuxt/TDtrdbi3.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"ef-6ksjCgqoQ3jaCb39TGNgg/+X0qI\"",
    "mtime": "2026-08-23T00:18:02.658Z",
    "size": 239,
    "path": "../public/_nuxt/TDtrdbi3.js"
  },
  "/_nuxt/U9A-_1dq.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"27ab-HS8u+Si1M5lba9nB3tPGoc6Drjg\"",
    "mtime": "2026-08-23T00:18:02.658Z",
    "size": 10155,
    "path": "../public/_nuxt/U9A-_1dq.js"
  },
  "/_nuxt/DTToT-jx.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"e4b51-kI4C5IhmNJtOONsnXSoEs4p6WWA\"",
    "mtime": "2026-08-23T00:18:02.657Z",
    "size": 936785,
    "path": "../public/_nuxt/DTToT-jx.js"
  },
  "/_nuxt/aI6UnYLD.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"72e8f-d/uPQbJixMF+6wCEaE3P+B4H2go\"",
    "mtime": "2026-08-23T00:18:02.659Z",
    "size": 470671,
    "path": "../public/_nuxt/aI6UnYLD.js"
  },
  "/_nuxt/authenticated.CHKVh1Xe.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"122-h1oG/JVbpMWuyPYIaHcVXBwhQKI\"",
    "mtime": "2026-08-23T00:18:02.659Z",
    "size": 290,
    "path": "../public/_nuxt/authenticated.CHKVh1Xe.css"
  },
  "/_nuxt/cBa1Yfb3.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"ec10-s26LMHQfsaU44TRPDaF986tBYsk\"",
    "mtime": "2026-08-23T00:18:02.659Z",
    "size": 60432,
    "path": "../public/_nuxt/cBa1Yfb3.js"
  },
  "/_nuxt/error-404.C3kT2QX-.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"97e-Xk26Nv4oQLpK3PtofolSggS9Z1M\"",
    "mtime": "2026-08-23T00:18:02.659Z",
    "size": 2430,
    "path": "../public/_nuxt/error-404.C3kT2QX-.css"
  },
  "/_nuxt/error-500.BW0Y54Of.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"773-NSoEX19gPmM2NozVKWotHuvxtho\"",
    "mtime": "2026-08-23T00:18:02.659Z",
    "size": 1907,
    "path": "../public/_nuxt/error-500.BW0Y54Of.css"
  },
  "/_nuxt/index.CUUpsSh1.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"a7-upkTySUd5AWvJjjSN+KVW8w/7Ts\"",
    "mtime": "2026-08-23T00:18:02.659Z",
    "size": 167,
    "path": "../public/_nuxt/index.CUUpsSh1.css"
  },
  "/_nuxt/index.Czu9rbBZ.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"b1-RlxBl2r9WyVWV9REEHTbJ8uESa8\"",
    "mtime": "2026-08-23T00:18:02.659Z",
    "size": 177,
    "path": "../public/_nuxt/index.Czu9rbBZ.css"
  },
  "/_nuxt/index.D7x8IlNW.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"6c2-jsaYWlqB/8+1+IO3QJokczqko8M\"",
    "mtime": "2026-08-23T00:18:02.659Z",
    "size": 1730,
    "path": "../public/_nuxt/index.D7x8IlNW.css"
  },
  "/_nuxt/index.Q22BTcA8.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"141-kes32QMvBTZGBl28WaP5MQa2NfI\"",
    "mtime": "2026-08-23T00:18:02.659Z",
    "size": 321,
    "path": "../public/_nuxt/index.Q22BTcA8.css"
  },
  "/_nuxt/jZNGenug.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"12ba-TKeIDk1dCEYO3HAKscIYa4SiVe4\"",
    "mtime": "2026-08-23T00:18:02.659Z",
    "size": 4794,
    "path": "../public/_nuxt/jZNGenug.js"
  },
  "/_nuxt/login.BsB2UeXh.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"a7-VoX7YoIiYSt8XdJZH106/PYRKkE\"",
    "mtime": "2026-08-23T00:18:02.659Z",
    "size": 167,
    "path": "../public/_nuxt/login.BsB2UeXh.css"
  },
  "/_nuxt/entry.C24y1vmd.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"3c6a4-CZNsBkPTAbL91tU3x4WDyzcaQBA\"",
    "mtime": "2026-08-23T00:18:02.659Z",
    "size": 247460,
    "path": "../public/_nuxt/entry.C24y1vmd.css"
  },
  "/_nuxt/rREvxMF-.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"b8a-a5+K08YD5Mnrz9iNxoacBHxAbpI\"",
    "mtime": "2026-08-23T00:18:02.659Z",
    "size": 2954,
    "path": "../public/_nuxt/rREvxMF-.js"
  },
  "/_nuxt/signup.CC22PnC-.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"2bb-ZFk5BOebEYdIFbOZu15GnnExBUU\"",
    "mtime": "2026-08-23T00:18:02.659Z",
    "size": 699,
    "path": "../public/_nuxt/signup.CC22PnC-.css"
  },
  "/_nuxt/o4NWtEvE.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"19dcf-no2Dq8t/XtJJFMU5+FfCeoEe8M4\"",
    "mtime": "2026-08-23T00:18:02.660Z",
    "size": 105935,
    "path": "../public/_nuxt/o4NWtEvE.js"
  },
  "/_nuxt/u5oA2vAu.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"2c9-4aLcTJH3uoSCIdSe+WdNt0ZB+Fo\"",
    "mtime": "2026-08-23T00:18:02.660Z",
    "size": 713,
    "path": "../public/_nuxt/u5oA2vAu.js"
  },
  "/_nuxt/y283U8c5.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"10a-Db2t2EoRABusrUWr4gVvmgyWB9g\"",
    "mtime": "2026-08-23T00:18:02.660Z",
    "size": 266,
    "path": "../public/_nuxt/y283U8c5.js"
  },
  "/images/logo-icon.webp": {
    "type": "image/webp",
    "etag": "\"4a82-Cq74D5kyjiUvih5Pxl9gJIOqLII\"",
    "mtime": "2026-08-23T00:18:02.667Z",
    "size": 19074,
    "path": "../public/images/logo-icon.webp"
  },
  "/_nuxt/builds/latest.json": {
    "type": "application/json",
    "etag": "\"47-IZp5XahqZYbKiy6R2Ob8rADzBZI\"",
    "mtime": "2026-08-23T00:18:02.642Z",
    "size": 71,
    "path": "../public/_nuxt/builds/latest.json"
  },
  "/images/mil.png": {
    "type": "image/png",
    "etag": "\"10776-rXNH1SRllJ7mDAxOd7BPoWAdctY\"",
    "mtime": "2026-08-23T00:18:02.667Z",
    "size": 67446,
    "path": "../public/images/mil.png"
  },
  "/_nuxt/mV32UKH1.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"758c4-1cS5JCpbfh2JBWx7sA3IRgwlEn8\"",
    "mtime": "2026-08-23T00:18:02.660Z",
    "size": 481476,
    "path": "../public/_nuxt/mV32UKH1.js"
  },
  "/_nuxt/builds/meta/0efadd61-caf7-4506-b3ce-52c79f9d618e.json": {
    "type": "application/json",
    "etag": "\"58-2Kylo7sgyJ8D0wqAUOgR90oFPX8\"",
    "mtime": "2026-08-23T00:18:02.639Z",
    "size": 88,
    "path": "../public/_nuxt/builds/meta/0efadd61-caf7-4506-b3ce-52c79f9d618e.json"
  },
  "/images/maskable-icon.png": {
    "type": "image/png",
    "etag": "\"59566-715Vg7XHhGtcCvxjiigx5q5wV/o\"",
    "mtime": "2026-08-23T00:18:02.668Z",
    "size": 365926,
    "path": "../public/images/maskable-icon.png"
  }
};

const _DRIVE_LETTER_START_RE = /^[A-Za-z]:\//;
function normalizeWindowsPath(input = "") {
  if (!input) {
    return input;
  }
  return input.replace(/\\/g, "/").replace(_DRIVE_LETTER_START_RE, (r) => r.toUpperCase());
}
const _IS_ABSOLUTE_RE = /^[/\\](?![/\\])|^[/\\]{2}(?!\.)|^[A-Za-z]:[/\\]/;
const _DRIVE_LETTER_RE = /^[A-Za-z]:$/;
function cwd() {
  if (typeof process !== "undefined" && typeof process.cwd === "function") {
    return process.cwd().replace(/\\/g, "/");
  }
  return "/";
}
const resolve = function(...arguments_) {
  arguments_ = arguments_.map((argument) => normalizeWindowsPath(argument));
  let resolvedPath = "";
  let resolvedAbsolute = false;
  for (let index = arguments_.length - 1; index >= -1 && !resolvedAbsolute; index--) {
    const path = index >= 0 ? arguments_[index] : cwd();
    if (!path || path.length === 0) {
      continue;
    }
    resolvedPath = `${path}/${resolvedPath}`;
    resolvedAbsolute = isAbsolute(path);
  }
  resolvedPath = normalizeString(resolvedPath, !resolvedAbsolute);
  if (resolvedAbsolute && !isAbsolute(resolvedPath)) {
    return `/${resolvedPath}`;
  }
  return resolvedPath.length > 0 ? resolvedPath : ".";
};
function normalizeString(path, allowAboveRoot) {
  let res = "";
  let lastSegmentLength = 0;
  let lastSlash = -1;
  let dots = 0;
  let char = null;
  for (let index = 0; index <= path.length; ++index) {
    if (index < path.length) {
      char = path[index];
    } else if (char === "/") {
      break;
    } else {
      char = "/";
    }
    if (char === "/") {
      if (lastSlash === index - 1 || dots === 1) ; else if (dots === 2) {
        if (res.length < 2 || lastSegmentLength !== 2 || res[res.length - 1] !== "." || res[res.length - 2] !== ".") {
          if (res.length > 2) {
            const lastSlashIndex = res.lastIndexOf("/");
            if (lastSlashIndex === -1) {
              res = "";
              lastSegmentLength = 0;
            } else {
              res = res.slice(0, lastSlashIndex);
              lastSegmentLength = res.length - 1 - res.lastIndexOf("/");
            }
            lastSlash = index;
            dots = 0;
            continue;
          } else if (res.length > 0) {
            res = "";
            lastSegmentLength = 0;
            lastSlash = index;
            dots = 0;
            continue;
          }
        }
        if (allowAboveRoot) {
          res += res.length > 0 ? "/.." : "..";
          lastSegmentLength = 2;
        }
      } else {
        if (res.length > 0) {
          res += `/${path.slice(lastSlash + 1, index)}`;
        } else {
          res = path.slice(lastSlash + 1, index);
        }
        lastSegmentLength = index - lastSlash - 1;
      }
      lastSlash = index;
      dots = 0;
    } else if (char === "." && dots !== -1) {
      ++dots;
    } else {
      dots = -1;
    }
  }
  return res;
}
const isAbsolute = function(p) {
  return _IS_ABSOLUTE_RE.test(p);
};
const dirname = function(p) {
  const segments = normalizeWindowsPath(p).replace(/\/$/, "").split("/").slice(0, -1);
  if (segments.length === 1 && _DRIVE_LETTER_RE.test(segments[0])) {
    segments[0] += "/";
  }
  return segments.join("/") || (isAbsolute(p) ? "/" : ".");
};

function readAsset (id) {
  const serverDir = dirname(fileURLToPath(globalThis._importMeta_.url));
  return promises.readFile(resolve(serverDir, assets[id].path))
}

const publicAssetBases = {"/_nuxt/builds/meta/":{"maxAge":31536000},"/_nuxt/builds/":{"maxAge":1},"/_fonts/":{"maxAge":31536000},"/_nuxt/":{"maxAge":31536000}};

function isPublicAssetURL(id = '') {
  if (assets[id]) {
    return true
  }
  for (const base in publicAssetBases) {
    if (id.startsWith(base)) { return true }
  }
  return false
}

function getAsset (id) {
  return assets[id]
}

const METHODS = /* @__PURE__ */ new Set(["HEAD", "GET"]);
const EncodingMap = { gzip: ".gz", br: ".br" };
const _3ugwHv = eventHandler((event) => {
  if (event.method && !METHODS.has(event.method)) {
    return;
  }
  let id = decodePath(
    withLeadingSlash(withoutTrailingSlash(parseURL(event.path).pathname))
  );
  let asset;
  const encodingHeader = String(
    getRequestHeader(event, "accept-encoding") || ""
  );
  const encodings = [
    ...encodingHeader.split(",").map((e) => EncodingMap[e.trim()]).filter(Boolean).sort(),
    ""
  ];
  for (const encoding of encodings) {
    for (const _id of [id + encoding, joinURL(id, "index.html" + encoding)]) {
      const _asset = getAsset(_id);
      if (_asset) {
        asset = _asset;
        id = _id;
        break;
      }
    }
  }
  if (!asset) {
    if (isPublicAssetURL(id)) {
      removeResponseHeader(event, "Cache-Control");
      throw createError$1({ statusCode: 404 });
    }
    return;
  }
  if (asset.encoding !== void 0) {
    appendResponseHeader(event, "Vary", "Accept-Encoding");
  }
  const ifNotMatch = getRequestHeader(event, "if-none-match") === asset.etag;
  if (ifNotMatch) {
    setResponseStatus(event, 304, "Not Modified");
    return "";
  }
  const ifModifiedSinceH = getRequestHeader(event, "if-modified-since");
  const mtimeDate = new Date(asset.mtime);
  if (ifModifiedSinceH && asset.mtime && new Date(ifModifiedSinceH) >= mtimeDate) {
    setResponseStatus(event, 304, "Not Modified");
    return "";
  }
  if (asset.type && !getResponseHeader(event, "Content-Type")) {
    setResponseHeader(event, "Content-Type", asset.type);
  }
  if (asset.etag && !getResponseHeader(event, "ETag")) {
    setResponseHeader(event, "ETag", asset.etag);
  }
  if (asset.mtime && !getResponseHeader(event, "Last-Modified")) {
    setResponseHeader(event, "Last-Modified", mtimeDate.toUTCString());
  }
  if (asset.encoding && !getResponseHeader(event, "Content-Encoding")) {
    setResponseHeader(event, "Content-Encoding", asset.encoding);
  }
  if (asset.size > 0 && !getResponseHeader(event, "Content-Length")) {
    setResponseHeader(event, "Content-Length", asset.size);
  }
  return readAsset(id);
});

function flatHooks(configHooks, hooks = {}, parentName) {
	for (const key in configHooks) {
		const subHook = configHooks[key];
		const name = parentName ? `${parentName}:${key}` : key;
		if (typeof subHook === "object" && subHook !== null) flatHooks(subHook, hooks, name);
		else if (typeof subHook === "function") hooks[name] = subHook;
	}
	return hooks;
}
const createTask = /* @__PURE__ */ (() => {
	if (console.createTask) return console.createTask;
	const defaultTask = { run: (fn) => fn() };
	return () => defaultTask;
})();
function callHooks(hooks, args, startIndex, task) {
	for (let i = startIndex; i < hooks.length; i += 1) try {
		const result = task ? task.run(() => hooks[i](...args)) : hooks[i](...args);
		if (result && typeof result.then === "function") return Promise.resolve(result).then(() => callHooks(hooks, args, i + 1, task));
	} catch (error) {
		return Promise.reject(error);
	}
}
function serialTaskCaller(hooks, args, name) {
	if (hooks.length > 0) return callHooks(hooks, args, 0, createTask(name));
}
function parallelTaskCaller(hooks, args, name) {
	if (hooks.length > 0) {
		const task = createTask(name);
		return Promise.all(hooks.map((hook) => task.run(() => hook(...args))));
	}
}
function callEachWith(callbacks, arg0) {
	for (const callback of [...callbacks]) callback(arg0);
}
var Hookable = class {
	_hooks;
	_before;
	_after;
	_deprecatedHooks;
	_deprecatedMessages;
	constructor() {
		this._hooks = {};
		this._before = void 0;
		this._after = void 0;
		this._deprecatedMessages = void 0;
		this._deprecatedHooks = {};
		this.hook = this.hook.bind(this);
		this.callHook = this.callHook.bind(this);
		this.callHookWith = this.callHookWith.bind(this);
	}
	hook(name, function_, options = {}) {
		if (!name || typeof function_ !== "function") return () => {};
		const originalName = name;
		let dep;
		while (this._deprecatedHooks[name]) {
			dep = this._deprecatedHooks[name];
			name = dep.to;
		}
		if (dep && !options.allowDeprecated) {
			let message = dep.message;
			if (!message) message = `${originalName} hook has been deprecated` + (dep.to ? `, please use ${dep.to}` : "");
			if (!this._deprecatedMessages) this._deprecatedMessages = /* @__PURE__ */ new Set();
			if (!this._deprecatedMessages.has(message)) {
				console.warn(message);
				this._deprecatedMessages.add(message);
			}
		}
		if (!function_.name) try {
			Object.defineProperty(function_, "name", {
				get: () => "_" + name.replace(/\W+/g, "_") + "_hook_cb",
				configurable: true
			});
		} catch {}
		this._hooks[name] = this._hooks[name] || [];
		this._hooks[name].push(function_);
		return () => {
			if (function_) {
				this.removeHook(name, function_);
				function_ = void 0;
			}
		};
	}
	hookOnce(name, function_) {
		let _unreg;
		let _function = (...arguments_) => {
			if (typeof _unreg === "function") _unreg();
			_unreg = void 0;
			_function = void 0;
			return function_(...arguments_);
		};
		_unreg = this.hook(name, _function);
		return _unreg;
	}
	removeHook(name, function_) {
		const hooks = this._hooks[name];
		if (hooks) {
			const index = hooks.indexOf(function_);
			if (index !== -1) hooks.splice(index, 1);
			if (hooks.length === 0) this._hooks[name] = void 0;
		}
	}
	clearHook(name) {
		this._hooks[name] = void 0;
	}
	deprecateHook(name, deprecated) {
		this._deprecatedHooks[name] = typeof deprecated === "string" ? { to: deprecated } : deprecated;
		const _hooks = this._hooks[name] || [];
		this._hooks[name] = void 0;
		for (const hook of _hooks) this.hook(name, hook);
	}
	deprecateHooks(deprecatedHooks) {
		for (const name in deprecatedHooks) this.deprecateHook(name, deprecatedHooks[name]);
	}
	addHooks(configHooks) {
		const hooks = flatHooks(configHooks);
		const removeFns = Object.keys(hooks).map((key) => this.hook(key, hooks[key]));
		return () => {
			for (const unreg of removeFns) unreg();
			removeFns.length = 0;
		};
	}
	removeHooks(configHooks) {
		const hooks = flatHooks(configHooks);
		for (const key in hooks) this.removeHook(key, hooks[key]);
	}
	removeAllHooks() {
		this._hooks = {};
	}
	callHook(name, ...args) {
		return this.callHookWith(serialTaskCaller, name, args);
	}
	callHookParallel(name, ...args) {
		return this.callHookWith(parallelTaskCaller, name, args);
	}
	callHookWith(caller, name, args) {
		const event = this._before || this._after ? {
			name,
			args,
			context: {}
		} : void 0;
		if (this._before) callEachWith(this._before, event);
		const result = caller(this._hooks[name] ? [...this._hooks[name]] : [], args, name);
		if (result instanceof Promise) return result.finally(() => {
			if (this._after && event) callEachWith(this._after, event);
		});
		if (this._after && event) callEachWith(this._after, event);
		return result;
	}
	beforeEach(function_) {
		this._before = this._before || [];
		this._before.push(function_);
		return () => {
			if (this._before !== void 0) {
				const index = this._before.indexOf(function_);
				if (index !== -1) this._before.splice(index, 1);
			}
		};
	}
	afterEach(function_) {
		this._after = this._after || [];
		this._after.push(function_);
		return () => {
			if (this._after !== void 0) {
				const index = this._after.indexOf(function_);
				if (index !== -1) this._after.splice(index, 1);
			}
		};
	}
};
function createHooks() {
	return new Hookable();
}

function defineNitroPlugin(def) {
  return def;
}

function defineRenderHandler(render) {
  const runtimeConfig = useRuntimeConfig();
  return eventHandler(async (event) => {
    const nitroApp = useNitroApp();
    const ctx = { event, render, response: void 0 };
    await nitroApp.hooks.callHook("render:before", ctx);
    if (!ctx.response) {
      if (event.path === `${runtimeConfig.app.baseURL}favicon.ico`) {
        setResponseHeader(event, "Content-Type", "image/x-icon");
        return send(
          event,
          "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
        );
      }
      ctx.response = await ctx.render(event);
      if (!ctx.response) {
        const _currentStatus = getResponseStatus(event);
        setResponseStatus(event, _currentStatus === 200 ? 500 : _currentStatus);
        return send(
          event,
          "No response returned from render handler: " + event.path
        );
      }
    }
    await nitroApp.hooks.callHook("render:response", ctx.response, ctx);
    if (ctx.response.headers) {
      setResponseHeaders(event, ctx.response.headers);
    }
    if (ctx.response.statusCode || ctx.response.statusMessage) {
      setResponseStatus(
        event,
        ctx.response.statusCode,
        ctx.response.statusMessage
      );
    }
    return ctx.response.body;
  });
}

function T(s){return Date.UTC(s.y,s.m-1,s.d,s.h,s.i,s.s)}function D(s,e){return s.y===e.y&&s.m===e.m&&s.d===e.d&&s.h===e.h&&s.i===e.i&&s.s===e.s}function A$1(s,e){let t=new Date(Date.parse(s));if(isNaN(t))throw new Error("Invalid ISO8601 passed to timezone parser.");let r=s.substring(9);return r.includes("Z")||r.includes("+")||r.includes("-")?b(t.getUTCFullYear(),t.getUTCMonth()+1,t.getUTCDate(),t.getUTCHours(),t.getUTCMinutes(),t.getUTCSeconds(),"Etc/UTC"):b(t.getFullYear(),t.getMonth()+1,t.getDate(),t.getHours(),t.getMinutes(),t.getSeconds(),e)}function v$1(s,e,t){return k$1(A$1(s,e),t)}function k$1(s,e){let t=new Date(T(s)),r=g(t,s.tz),n=T(s),i=T(r),a=n-i,o=new Date(t.getTime()+a),h=g(o,s.tz);if(D(h,s)){let u=new Date(o.getTime()-36e5),d=g(u,s.tz);return D(d,s)?u:o}let l=new Date(o.getTime()+T(s)-T(h)),y=g(l,s.tz);if(D(y,s))return l;if(e)throw new Error("Invalid date passed to fromTZ()");return o.getTime()>l.getTime()?o:l}function g(s,e){let t,r;try{t=new Intl.DateTimeFormat("en-US",{timeZone:e,year:"numeric",month:"numeric",day:"numeric",hour:"numeric",minute:"numeric",second:"numeric",hour12:!1}),r=t.formatToParts(s);}catch(i){let a=i instanceof Error?i.message:String(i);throw new RangeError(`toTZ: Invalid timezone '${e}' or date. Please provide a valid IANA timezone (e.g., 'America/New_York', 'Europe/Stockholm'). Original error: ${a}`)}let n={year:0,month:0,day:0,hour:0,minute:0,second:0};for(let i of r)(i.type==="year"||i.type==="month"||i.type==="day"||i.type==="hour"||i.type==="minute"||i.type==="second")&&(n[i.type]=parseInt(i.value,10));if(isNaN(n.year)||isNaN(n.month)||isNaN(n.day)||isNaN(n.hour)||isNaN(n.minute)||isNaN(n.second))throw new Error(`toTZ: Failed to parse all date components from timezone '${e}'. This may indicate an invalid date or timezone configuration. Parsed components: ${JSON.stringify(n)}`);return n.hour===24&&(n.hour=0),{y:n.year,m:n.month,d:n.day,h:n.hour,i:n.minute,s:n.second,tz:e}}function b(s,e,t,r,n,i,a){return {y:s,m:e,d:t,h:r,i:n,s:i,tz:a}}var O$1=[1,2,4,8,16],C=class{pattern;timezone;mode;alternativeWeekdays;sloppyRanges;second;minute;hour;day;month;dayOfWeek;year;lastDayOfMonth;lastWeekday;nearestWeekdays;starDOM;starDOW;starYear;useAndLogic;constructor(e,t,r){this.pattern=e,this.timezone=t,this.mode=r?.mode??"auto",this.alternativeWeekdays=r?.alternativeWeekdays??false,this.sloppyRanges=r?.sloppyRanges??false,this.second=Array(60).fill(0),this.minute=Array(60).fill(0),this.hour=Array(24).fill(0),this.day=Array(31).fill(0),this.month=Array(12).fill(0),this.dayOfWeek=Array(7).fill(0),this.year=Array(1e4).fill(0),this.lastDayOfMonth=false,this.lastWeekday=false,this.nearestWeekdays=Array(31).fill(0),this.starDOM=false,this.starDOW=false,this.starYear=false,this.useAndLogic=false,this.parse();}parse(){if(!(typeof this.pattern=="string"||this.pattern instanceof String))throw new TypeError("CronPattern: Pattern has to be of type string.");this.pattern.indexOf("@")>=0&&(this.pattern=this.handleNicknames(this.pattern).trim());let e=this.pattern.match(/\S+/g)||[""],t=e.length;if(e.length<5||e.length>7)throw new TypeError("CronPattern: invalid configuration format ('"+this.pattern+"'), exactly five, six, or seven space separated parts are required.");if(this.mode!=="auto"){let n;switch(this.mode){case "5-part":n=5;break;case "6-part":n=6;break;case "7-part":n=7;break;case "5-or-6-parts":n=[5,6];break;case "6-or-7-parts":n=[6,7];break;default:n=0;}if(!(Array.isArray(n)?n.includes(t):t===n)){let a=Array.isArray(n)?n.join(" or "):n.toString();throw new TypeError(`CronPattern: mode '${this.mode}' requires exactly ${a} parts, but pattern '${this.pattern}' has ${t} parts.`)}}if(e.length===5&&e.unshift("0"),e.length===6&&e.push("*"),e[3].toUpperCase()==="LW"?(this.lastWeekday=true,e[3]=""):e[3].toUpperCase().indexOf("L")>=0&&(e[3]=e[3].replace(/L/gi,""),this.lastDayOfMonth=true),e[3]=="*"&&(this.starDOM=true),e[6]=="*"&&(this.starYear=true),e[4].length>=3&&(e[4]=this.replaceAlphaMonths(e[4])),e[5].length>=3&&(e[5]=this.alternativeWeekdays?this.replaceAlphaDaysQuartz(e[5]):this.replaceAlphaDays(e[5])),e[5].startsWith("+")&&(this.useAndLogic=true,e[5]=e[5].substring(1),e[5]===""))throw new TypeError("CronPattern: Day-of-week field cannot be empty after '+' modifier.");switch(e[5]=="*"&&(this.starDOW=true),this.pattern.indexOf("?")>=0&&(e[0]=e[0].replace(/\?/g,"*"),e[1]=e[1].replace(/\?/g,"*"),e[2]=e[2].replace(/\?/g,"*"),e[3]=e[3].replace(/\?/g,"*"),e[4]=e[4].replace(/\?/g,"*"),e[5]=e[5].replace(/\?/g,"*"),e[6]&&(e[6]=e[6].replace(/\?/g,"*"))),this.mode){case "5-part":e[0]="0",e[6]="*";break;case "6-part":e[6]="*";break;case "5-or-6-parts":e[6]="*";break;}this.throwAtIllegalCharacters(e),this.partToArray("second",e[0],0,1),this.partToArray("minute",e[1],0,1),this.partToArray("hour",e[2],0,1),this.partToArray("day",e[3],-1,1),this.partToArray("month",e[4],-1,1);let r=this.alternativeWeekdays?-1:0;this.partToArray("dayOfWeek",e[5],r,63),this.partToArray("year",e[6],0,1),!this.alternativeWeekdays&&this.dayOfWeek[7]&&(this.dayOfWeek[0]=this.dayOfWeek[7]);}partToArray(e,t,r,n){let i=this[e],a=e==="day"&&this.lastDayOfMonth,o=e==="day"&&this.lastWeekday;if(t===""&&!a&&!o)throw new TypeError("CronPattern: configuration entry "+e+" ("+t+") is empty, check for trailing spaces.");if(t==="*")return i.fill(n);let h=t.split(",");if(h.length>1)for(let l=0;l<h.length;l++)this.partToArray(e,h[l],r,n);else t.indexOf("-")!==-1&&t.indexOf("/")!==-1?this.handleRangeWithStepping(t,e,r,n):t.indexOf("-")!==-1?this.handleRange(t,e,r,n):t.indexOf("/")!==-1?this.handleStepping(t,e,r,n):t!==""&&this.handleNumber(t,e,r,n);}throwAtIllegalCharacters(e){for(let t=0;t<e.length;t++)if((t===3?/[^/*0-9,\-WwLl]+/:t===5?/[^/*0-9,\-#Ll]+/:/[^/*0-9,\-]+/).test(e[t]))throw new TypeError("CronPattern: configuration entry "+t+" ("+e[t]+") contains illegal characters.")}handleNumber(e,t,r,n){let i=this.extractNth(e,t),a=e.toUpperCase().includes("W");if(t!=="day"&&a)throw new TypeError("CronPattern: Nearest weekday modifier (W) only allowed in day-of-month.");a&&(t="nearestWeekdays");let o=parseInt(i[0],10)+r;if(isNaN(o))throw new TypeError("CronPattern: "+t+" is not a number: '"+e+"'");this.setPart(t,o,i[1]||n);}setPart(e,t,r){if(!Object.prototype.hasOwnProperty.call(this,e))throw new TypeError("CronPattern: Invalid part specified: "+e);if(e==="dayOfWeek"){if(t===7&&(t=0),t<0||t>6)throw new RangeError("CronPattern: Invalid value for dayOfWeek: "+t);this.setNthWeekdayOfMonth(t,r);return}if(e==="second"||e==="minute"){if(t<0||t>=60)throw new RangeError("CronPattern: Invalid value for "+e+": "+t)}else if(e==="hour"){if(t<0||t>=24)throw new RangeError("CronPattern: Invalid value for "+e+": "+t)}else if(e==="day"||e==="nearestWeekdays"){if(t<0||t>=31)throw new RangeError("CronPattern: Invalid value for "+e+": "+t)}else if(e==="month"){if(t<0||t>=12)throw new RangeError("CronPattern: Invalid value for "+e+": "+t)}else if(e==="year"&&(t<1||t>=1e4))throw new RangeError("CronPattern: Invalid value for "+e+": "+t+" (supported range: 1-9999)");this[e][t]=r;}validateNotNaN(e,t){if(isNaN(e))throw new TypeError(t)}validateRange(e,t,r,n,i){if(e>t)throw new TypeError("CronPattern: From value is larger than to value: '"+i+"'");if(r!==void 0){if(r===0)throw new TypeError("CronPattern: Syntax error, illegal stepping: 0");if(r>this[n].length)throw new TypeError("CronPattern: Syntax error, steps cannot be greater than maximum value of part ("+this[n].length+")")}}handleRangeWithStepping(e,t,r,n){if(e.toUpperCase().includes("W"))throw new TypeError("CronPattern: Syntax error, W is not allowed in ranges with stepping.");let i=this.extractNth(e,t),a=i[0].match(/^(\d+)-(\d+)\/(\d+)$/);if(a===null)throw new TypeError("CronPattern: Syntax error, illegal range with stepping: '"+e+"'");let[,o,h,l]=a,y=parseInt(o,10)+r,u=parseInt(h,10)+r,d=parseInt(l,10);this.validateNotNaN(y,"CronPattern: Syntax error, illegal lower range (NaN)"),this.validateNotNaN(u,"CronPattern: Syntax error, illegal upper range (NaN)"),this.validateNotNaN(d,"CronPattern: Syntax error, illegal stepping: (NaN)"),this.validateRange(y,u,d,t,e);for(let c=y;c<=u;c+=d)this.setPart(t,c,i[1]||n);}extractNth(e,t){let r=e,n;if(r.includes("#")){if(t!=="dayOfWeek")throw new Error("CronPattern: nth (#) only allowed in day-of-week field");n=r.split("#")[1],r=r.split("#")[0];}else if(r.toUpperCase().endsWith("L")){if(t!=="dayOfWeek")throw new Error("CronPattern: L modifier only allowed in day-of-week field (use L alone for day-of-month)");n="L",r=r.slice(0,-1);}return [r,n]}handleRange(e,t,r,n){if(e.toUpperCase().includes("W"))throw new TypeError("CronPattern: Syntax error, W is not allowed in a range.");let i=this.extractNth(e,t),a=i[0].split("-");if(a.length!==2)throw new TypeError("CronPattern: Syntax error, illegal range: '"+e+"'");let o=parseInt(a[0],10)+r,h=parseInt(a[1],10)+r;this.validateNotNaN(o,"CronPattern: Syntax error, illegal lower range (NaN)"),this.validateNotNaN(h,"CronPattern: Syntax error, illegal upper range (NaN)"),this.validateRange(o,h,void 0,t,e);for(let l=o;l<=h;l++)this.setPart(t,l,i[1]||n);}handleStepping(e,t,r,n){if(e.toUpperCase().includes("W"))throw new TypeError("CronPattern: Syntax error, W is not allowed in parts with stepping.");let i=this.extractNth(e,t),a=i[0].split("/");if(a.length!==2)throw new TypeError("CronPattern: Syntax error, illegal stepping: '"+e+"'");if(this.sloppyRanges)a[0]===""&&(a[0]="*");else {if(a[0]==="")throw new TypeError("CronPattern: Syntax error, stepping with missing prefix ('"+e+"') is not allowed. Use wildcard (*/step) or range (min-max/step) instead.");if(a[0]!=="*")throw new TypeError("CronPattern: Syntax error, stepping with numeric prefix ('"+e+"') is not allowed. Use wildcard (*/step) or range (min-max/step) instead.")}let o=0;a[0]!=="*"&&(o=parseInt(a[0],10)+r);let h=parseInt(a[1],10);this.validateNotNaN(h,"CronPattern: Syntax error, illegal stepping: (NaN)"),this.validateRange(0,this[t].length-1,h,t,e);for(let l=o;l<this[t].length;l+=h)this.setPart(t,l,i[1]||n);}replaceAlphaDays(e){return e.replace(/-sun/gi,"-7").replace(/sun/gi,"0").replace(/mon/gi,"1").replace(/tue/gi,"2").replace(/wed/gi,"3").replace(/thu/gi,"4").replace(/fri/gi,"5").replace(/sat/gi,"6")}replaceAlphaDaysQuartz(e){return e.replace(/sun/gi,"1").replace(/mon/gi,"2").replace(/tue/gi,"3").replace(/wed/gi,"4").replace(/thu/gi,"5").replace(/fri/gi,"6").replace(/sat/gi,"7")}replaceAlphaMonths(e){return e.replace(/jan/gi,"1").replace(/feb/gi,"2").replace(/mar/gi,"3").replace(/apr/gi,"4").replace(/may/gi,"5").replace(/jun/gi,"6").replace(/jul/gi,"7").replace(/aug/gi,"8").replace(/sep/gi,"9").replace(/oct/gi,"10").replace(/nov/gi,"11").replace(/dec/gi,"12")}handleNicknames(e){let t=e.trim().toLowerCase();if(t==="@yearly"||t==="@annually")return "0 0 1 1 *";if(t==="@monthly")return "0 0 1 * *";if(t==="@weekly")return "0 0 * * 0";if(t==="@daily"||t==="@midnight")return "0 0 * * *";if(t==="@hourly")return "0 * * * *";if(t==="@reboot")throw new TypeError("CronPattern: @reboot is not supported in this environment. This is an event-based trigger that requires system startup detection.");return e}setNthWeekdayOfMonth(e,t){if(typeof t!="number"&&t.toUpperCase()==="L")this.dayOfWeek[e]=this.dayOfWeek[e]|32;else if(t===63)this.dayOfWeek[e]=63;else if(t<6&&t>0)this.dayOfWeek[e]=this.dayOfWeek[e]|O$1[t-1];else throw new TypeError(`CronPattern: nth weekday out of range, should be 1-5 or L. Value: ${t}, Type: ${typeof t}`)}};var P$1=[31,28,31,30,31,30,31,31,30,31,30,31],f=[["month","year",0],["day","month",-1],["hour","day",0],["minute","hour",0],["second","minute",0]],m$1=class s{tz;ms;second;minute;hour;day;month;year;constructor(e,t){if(this.tz=t,e&&e instanceof Date)if(!isNaN(e))this.fromDate(e);else throw new TypeError("CronDate: Invalid date passed to CronDate constructor");else if(e==null)this.fromDate(new Date);else if(e&&typeof e=="string")this.fromString(e);else if(e instanceof s)this.fromCronDate(e);else throw new TypeError("CronDate: Invalid type ("+typeof e+") passed to CronDate constructor")}getLastDayOfMonth(e,t){return t!==1?P$1[t]:new Date(Date.UTC(e,t+1,0)).getUTCDate()}getLastWeekday(e,t){let r=this.getLastDayOfMonth(e,t),i=new Date(Date.UTC(e,t,r)).getUTCDay();return i===0?r-2:i===6?r-1:r}getNearestWeekday(e,t,r){let n=this.getLastDayOfMonth(e,t);if(r>n)return  -1;let a=new Date(Date.UTC(e,t,r)).getUTCDay();return a===0?r===n?r-2:r+1:a===6?r===1?r+2:r-1:r}isNthWeekdayOfMonth(e,t,r,n){let a=new Date(Date.UTC(e,t,r)).getUTCDay(),o=0;for(let h=1;h<=r;h++)new Date(Date.UTC(e,t,h)).getUTCDay()===a&&o++;if(n&63&&O$1[o-1]&n)return  true;if(n&32){let h=this.getLastDayOfMonth(e,t);for(let l=r+1;l<=h;l++)if(new Date(Date.UTC(e,t,l)).getUTCDay()===a)return  false;return  true}return  false}fromDate(e){if(this.tz!==void 0)if(typeof this.tz=="number")this.ms=e.getUTCMilliseconds(),this.second=e.getUTCSeconds(),this.minute=e.getUTCMinutes()+this.tz,this.hour=e.getUTCHours(),this.day=e.getUTCDate(),this.month=e.getUTCMonth(),this.year=e.getUTCFullYear(),this.apply();else try{let t=g(e,this.tz);this.ms=e.getMilliseconds(),this.second=t.s,this.minute=t.i,this.hour=t.h,this.day=t.d,this.month=t.m-1,this.year=t.y;}catch(t){let r=t instanceof Error?t.message:String(t);throw new TypeError(`CronDate: Failed to convert date to timezone '${this.tz}'. This may happen with invalid timezone names or dates. Original error: ${r}`)}else this.ms=e.getMilliseconds(),this.second=e.getSeconds(),this.minute=e.getMinutes(),this.hour=e.getHours(),this.day=e.getDate(),this.month=e.getMonth(),this.year=e.getFullYear();}fromCronDate(e){this.tz=e.tz,this.year=e.year,this.month=e.month,this.day=e.day,this.hour=e.hour,this.minute=e.minute,this.second=e.second,this.ms=e.ms;}apply(){if(this.month>11||this.month<0||this.day>P$1[this.month]||this.day<1||this.hour>59||this.minute>59||this.second>59||this.hour<0||this.minute<0||this.second<0){let e=new Date(Date.UTC(this.year,this.month,this.day,this.hour,this.minute,this.second,this.ms));return this.ms=e.getUTCMilliseconds(),this.second=e.getUTCSeconds(),this.minute=e.getUTCMinutes(),this.hour=e.getUTCHours(),this.day=e.getUTCDate(),this.month=e.getUTCMonth(),this.year=e.getUTCFullYear(),true}else return  false}fromString(e){if(typeof this.tz=="number"){let t=v$1(e);this.ms=t.getUTCMilliseconds(),this.second=t.getUTCSeconds(),this.minute=t.getUTCMinutes(),this.hour=t.getUTCHours(),this.day=t.getUTCDate(),this.month=t.getUTCMonth(),this.year=t.getUTCFullYear(),this.apply();}else return this.fromDate(v$1(e,this.tz))}findNext(e,t,r,n){return this._findMatch(e,t,r,n,1)}_findMatch(e,t,r,n,i){let a=this[t],o;r.lastDayOfMonth&&(o=this.getLastDayOfMonth(this.year,this.month));let h=!r.starDOW&&t=="day"?new Date(Date.UTC(this.year,this.month,1,0,0,0,0)).getUTCDay():void 0,l=this[t]+n,y=i===1?u=>u<r[t].length:u=>u>=0;for(let u=l;y(u);u+=i){let d=r[t][u];if(t==="day"&&!d){for(let c=0;c<r.nearestWeekdays.length;c++)if(r.nearestWeekdays[c]){let M=this.getNearestWeekday(this.year,this.month,c-n);if(M===-1)continue;if(M===u-n){d=1;break}}}if(t==="day"&&r.lastWeekday){let c=this.getLastWeekday(this.year,this.month);u-n===c&&(d=1);}if(t==="day"&&r.lastDayOfMonth&&u-n==o&&(d=1),t==="day"&&!r.starDOW){let c=r.dayOfWeek[(h+(u-n-1))%7];if(c&&c&63)c=this.isNthWeekdayOfMonth(this.year,this.month,u-n,c)?1:0;else if(c)throw new Error(`CronDate: Invalid value for dayOfWeek encountered. ${c}`);r.useAndLogic?d=d&&c:!e.domAndDow&&!r.starDOM?d=d||c:d=d&&c;}if(d)return this[t]=u-n,a!==this[t]?2:1}return 3}recurse(e,t,r){if(r===0&&!e.starYear){if(this.year>=0&&this.year<e.year.length&&e.year[this.year]===0){let i=-1;for(let a=this.year+1;a<e.year.length&&a<1e4;a++)if(e.year[a]===1){i=a;break}if(i===-1)return null;this.year=i,this.month=0,this.day=1,this.hour=0,this.minute=0,this.second=0,this.ms=0;}if(this.year>=1e4)return null}let n=this.findNext(t,f[r][0],e,f[r][2]);if(n>1){let i=r+1;for(;i<f.length;)this[f[i][0]]=-f[i][2],i++;if(n===3){if(this[f[r][1]]++,this[f[r][0]]=-f[r][2],this.apply(),r===0&&!e.starYear){for(;this.year>=0&&this.year<e.year.length&&e.year[this.year]===0&&this.year<1e4;)this.year++;if(this.year>=1e4||this.year>=e.year.length)return null}return this.recurse(e,t,0)}else if(this.apply())return this.recurse(e,t,r-1)}return r+=1,r>=f.length?this:(e.starYear?this.year>=3e3:this.year>=1e4)?null:this.recurse(e,t,r)}increment(e,t,r){return this.second+=t.interval!==void 0&&t.interval>1&&r?t.interval:1,this.ms=0,this.apply(),this.recurse(e,t,0)}decrement(e,t){return this.second-=t.interval!==void 0&&t.interval>1?t.interval:1,this.ms=0,this.apply(),this.recurseBackward(e,t,0,0)}recurseBackward(e,t,r,n=0){if(n>1e4)return null;if(r===0&&!e.starYear){if(this.year>=0&&this.year<e.year.length&&e.year[this.year]===0){let a=-1;for(let o=this.year-1;o>=0;o--)if(e.year[o]===1){a=o;break}if(a===-1)return null;this.year=a,this.month=11,this.day=31,this.hour=23,this.minute=59,this.second=59,this.ms=0;}if(this.year<0)return null}let i=this.findPrevious(t,f[r][0],e,f[r][2]);if(i>1){let a=r+1;for(;a<f.length;){let o=f[a][0],h=f[a][2],l=this.getMaxPatternValue(o,e,h);this[o]=l,a++;}if(i===3){if(this[f[r][1]]--,r===0){let y=this.getLastDayOfMonth(this.year,this.month);this.day>y&&(this.day=y);}if(r===1)if(this.day<=0)this.day=1;else {let y=this.year,u=this.month;for(;u<0;)u+=12,y--;for(;u>11;)u-=12,y++;let d=u!==1?P$1[u]:new Date(Date.UTC(y,u+1,0)).getUTCDate();this.day>d&&(this.day=d);}this.apply();let o=f[r][0],h=f[r][2],l=this.getMaxPatternValue(o,e,h);if(o==="day"){let y=this.getLastDayOfMonth(this.year,this.month);this[o]=Math.min(l,y);}else this[o]=l;if(this.apply(),r===0){let y=f[1][2],u=this.getMaxPatternValue("day",e,y),d=this.getLastDayOfMonth(this.year,this.month),c=Math.min(u,d);c!==this.day&&(this.day=c,this.hour=this.getMaxPatternValue("hour",e,f[2][2]),this.minute=this.getMaxPatternValue("minute",e,f[3][2]),this.second=this.getMaxPatternValue("second",e,f[4][2]));}if(r===0&&!e.starYear){for(;this.year>=0&&this.year<e.year.length&&e.year[this.year]===0;)this.year--;if(this.year<0)return null}return this.recurseBackward(e,t,0,n+1)}else if(this.apply())return this.recurseBackward(e,t,r-1,n+1)}return r+=1,r>=f.length?this:this.year<0?null:this.recurseBackward(e,t,r,n+1)}getMaxPatternValue(e,t,r){if(e==="day"&&t.lastDayOfMonth)return this.getLastDayOfMonth(this.year,this.month);if(e==="day"&&!t.starDOW)return this.getLastDayOfMonth(this.year,this.month);for(let n=t[e].length-1;n>=0;n--)if(t[e][n])return n-r;return t[e].length-1-r}findPrevious(e,t,r,n){return this._findMatch(e,t,r,n,-1)}getDate(e){return e||this.tz===void 0?new Date(this.year,this.month,this.day,this.hour,this.minute,this.second,this.ms):typeof this.tz=="number"?new Date(Date.UTC(this.year,this.month,this.day,this.hour,this.minute-this.tz,this.second,this.ms)):k$1(b(this.year,this.month+1,this.day,this.hour,this.minute,this.second,this.tz),false)}getTime(){return this.getDate(false).getTime()}match(e,t){if(!e.starYear&&(this.year<0||this.year>=e.year.length||e.year[this.year]===0))return  false;for(let r=0;r<f.length;r++){let n=f[r][0],i=f[r][2],a=this[n];if(a+i<0||a+i>=e[n].length)return  false;let o=e[n][a+i];if(n==="day"){if(!o){for(let h=0;h<e.nearestWeekdays.length;h++)if(e.nearestWeekdays[h]){let l=this.getNearestWeekday(this.year,this.month,h-i);if(l!==-1&&l===a){o=1;break}}}if(e.lastWeekday){let h=this.getLastWeekday(this.year,this.month);a===h&&(o=1);}if(e.lastDayOfMonth){let h=this.getLastDayOfMonth(this.year,this.month);a===h&&(o=1);}if(!e.starDOW){let h=new Date(Date.UTC(this.year,this.month,1,0,0,0,0)).getUTCDay(),l=e.dayOfWeek[(h+(a-1))%7];l&&l&63&&(l=this.isNthWeekdayOfMonth(this.year,this.month,a,l)?1:0),e.useAndLogic?o=o&&l:!t.domAndDow&&!e.starDOM?o=o||l:o=o&&l;}}if(!o)return  false}return  true}};function R(s){if(s===void 0&&(s={}),delete s.name,s.legacyMode!==void 0&&s.domAndDow===void 0?s.domAndDow=!s.legacyMode:s.domAndDow===void 0&&(s.domAndDow=false),s.legacyMode=!s.domAndDow,s.paused=s.paused===void 0?false:s.paused,s.maxRuns=s.maxRuns===void 0?1/0:s.maxRuns,s.catch=s.catch===void 0?false:s.catch,s.interval=s.interval===void 0?0:parseInt(s.interval.toString(),10),s.utcOffset=s.utcOffset===void 0?void 0:parseInt(s.utcOffset.toString(),10),s.dayOffset=s.dayOffset===void 0?0:parseInt(s.dayOffset.toString(),10),s.unref=s.unref===void 0?false:s.unref,s.mode=s.mode===void 0?"auto":s.mode,s.alternativeWeekdays=s.alternativeWeekdays===void 0?false:s.alternativeWeekdays,s.sloppyRanges=s.sloppyRanges===void 0?false:s.sloppyRanges,!["auto","5-part","6-part","7-part","5-or-6-parts","6-or-7-parts"].includes(s.mode))throw new Error("CronOptions: mode must be one of 'auto', '5-part', '6-part', '7-part', '5-or-6-parts', or '6-or-7-parts'.");if(s.startAt&&(s.startAt=new m$1(s.startAt,s.timezone)),s.stopAt&&(s.stopAt=new m$1(s.stopAt,s.timezone)),s.interval!==null){if(isNaN(s.interval))throw new Error("CronOptions: Supplied value for interval is not a number");if(s.interval<0)throw new Error("CronOptions: Supplied value for interval can not be negative")}if(s.utcOffset!==void 0){if(isNaN(s.utcOffset))throw new Error("CronOptions: Invalid value passed for utcOffset, should be number representing minutes offset from UTC.");if(s.utcOffset<-870||s.utcOffset>870)throw new Error("CronOptions: utcOffset out of bounds.");if(s.utcOffset!==void 0&&s.timezone)throw new Error("CronOptions: Combining 'utcOffset' with 'timezone' is not allowed.")}if(s.unref!==true&&s.unref!==false)throw new Error("CronOptions: Unref should be either true, false or undefined(false).");if(s.dayOffset!==void 0&&s.dayOffset!==0&&isNaN(s.dayOffset))throw new Error("CronOptions: Invalid value passed for dayOffset, should be a number representing days to offset.");return s}function p$1(s){return Object.prototype.toString.call(s)==="[object Function]"||typeof s=="function"||s instanceof Function}function _(s){return p$1(s)}function x(s){typeof Deno<"u"&&typeof Deno.unrefTimer<"u"?Deno.unrefTimer(s):s&&typeof s.unref<"u"&&s.unref();}var W=30*1e3,w=[],E$1=class E{name;options;_states;fn;getTz(){return this.options.timezone||this.options.utcOffset}applyDayOffset(e){if(this.options.dayOffset!==void 0&&this.options.dayOffset!==0){let t=this.options.dayOffset*24*60*60*1e3;return new Date(e.getTime()+t)}return e}constructor(e,t,r){let n,i;if(p$1(t))i=t;else if(typeof t=="object")n=t;else if(t!==void 0)throw new Error("Cron: Invalid argument passed for optionsIn. Should be one of function, or object (options).");if(p$1(r))i=r;else if(typeof r=="object")n=r;else if(r!==void 0)throw new Error("Cron: Invalid argument passed for funcIn. Should be one of function, or object (options).");if(this.name=n?.name,this.options=R(n),this._states={kill:false,blocking:false,previousRun:void 0,currentRun:void 0,once:void 0,currentTimeout:void 0,maxRuns:n?n.maxRuns:void 0,paused:n?n.paused:false,pattern:new C("* * * * *",void 0,{mode:"auto"})},e&&(e instanceof Date||typeof e=="string"&&e.indexOf(":")>0)?this._states.once=new m$1(e,this.getTz()):this._states.pattern=new C(e,this.options.timezone,{mode:this.options.mode,alternativeWeekdays:this.options.alternativeWeekdays,sloppyRanges:this.options.sloppyRanges}),this.name){if(w.find(o=>o.name===this.name))throw new Error("Cron: Tried to initialize new named job '"+this.name+"', but name already taken.");w.push(this);}return i!==void 0&&_(i)&&(this.fn=i,this.schedule()),this}nextRun(e){let t=this._next(e);return t?this.applyDayOffset(t.getDate(false)):null}nextRuns(e,t){this._states.maxRuns!==void 0&&e>this._states.maxRuns&&(e=this._states.maxRuns);let r=t||this._states.currentRun||void 0;return this._enumerateRuns(e,r,"next")}previousRuns(e,t){return this._enumerateRuns(e,t||void 0,"previous")}_enumerateRuns(e,t,r){let n=[],i=t?new m$1(t,this.getTz()):null,a=r==="next"?this._next:this._previous;for(;e--;){let o=a.call(this,i);if(!o)break;let h=o.getDate(false);n.push(this.applyDayOffset(h)),i=o;}return n}match(e){if(this._states.once){let r=new m$1(e,this.getTz());r.ms=0;let n=new m$1(this._states.once,this.getTz());return n.ms=0,r.getTime()===n.getTime()}let t=new m$1(e,this.getTz());return t.ms=0,t.match(this._states.pattern,this.options)}getPattern(){if(!this._states.once)return this._states.pattern?this._states.pattern.pattern:void 0}getOnce(){return this._states.once?this._states.once.getDate():null}isRunning(){let e=this.nextRun(this._states.currentRun),t=!this._states.paused,r=this.fn!==void 0,n=!this._states.kill;return t&&r&&n&&e!==null}isStopped(){return this._states.kill}isBusy(){return this._states.blocking}currentRun(){return this._states.currentRun?this._states.currentRun.getDate():null}previousRun(){return this._states.previousRun?this._states.previousRun.getDate():null}msToNext(e){let t=this._next(e);return t?e instanceof m$1||e instanceof Date?t.getTime()-e.getTime():t.getTime()-new m$1(e).getTime():null}stop(){this._states.kill=true,this._states.currentTimeout&&clearTimeout(this._states.currentTimeout);let e=w.indexOf(this);e>=0&&w.splice(e,1);}pause(){return this._states.paused=true,!this._states.kill}resume(){return this._states.paused=false,!this._states.kill}schedule(e){if(e&&this.fn)throw new Error("Cron: It is not allowed to schedule two functions using the same Croner instance.");e&&(this.fn=e);let t=this.msToNext(),r=this.nextRun(this._states.currentRun);return t==null||isNaN(t)||r===null?this:(t>W&&(t=W),this._states.currentTimeout=setTimeout(()=>this._checkTrigger(r),t),this._states.currentTimeout&&this.options.unref&&x(this._states.currentTimeout),this)}async _trigger(e){this._states.blocking=true,this._states.currentRun=new m$1(void 0,this.getTz());try{if(this.options.catch)try{this.fn!==void 0&&await this.fn(this,this.options.context);}catch(t){if(p$1(this.options.catch))try{this.options.catch(t,this);}catch{}}else this.fn!==void 0&&await this.fn(this,this.options.context);}finally{this._states.previousRun=new m$1(e,this.getTz()),this._states.blocking=false;}}async trigger(){await this._trigger();}runsLeft(){return this._states.maxRuns}_checkTrigger(e){let t=new Date,r=!this._states.paused&&t.getTime()>=e.getTime(),n=this._states.blocking&&this.options.protect;r&&!n?(this._states.maxRuns!==void 0&&this._states.maxRuns--,this._trigger()):r&&n&&p$1(this.options.protect)&&setTimeout(()=>this.options.protect(this),0),this.schedule();}_next(e){let t=!!(e||this._states.currentRun),r=false;!e&&this.options.startAt&&this.options.interval&&([e,t]=this._calculatePreviousRun(e,t),r=!e),e=new m$1(e,this.getTz()),this.options.startAt&&e&&e.getTime()<this.options.startAt.getTime()&&(e=this.options.startAt);let n=this._states.once||new m$1(e,this.getTz());return !r&&n!==this._states.once&&(n=n.increment(this._states.pattern,this.options,t)),this._states.once&&this._states.once.getTime()<=e.getTime()||n===null||this._states.maxRuns!==void 0&&this._states.maxRuns<=0||this._states.kill||this.options.stopAt&&n.getTime()>=this.options.stopAt.getTime()?null:n}_previous(e){let t=new m$1(e,this.getTz());this.options.stopAt&&t.getTime()>this.options.stopAt.getTime()&&(t=this.options.stopAt);let r=new m$1(t,this.getTz());return this._states.once?this._states.once.getTime()<t.getTime()?this._states.once:null:(r=r.decrement(this._states.pattern,this.options),r===null||this.options.startAt&&r.getTime()<this.options.startAt.getTime()?null:r)}_calculatePreviousRun(e,t){let r=new m$1(void 0,this.getTz()),n=e;if(this.options.startAt.getTime()<=r.getTime()){n=this.options.startAt;let i=n.getTime()+this.options.interval*1e3;for(;i<=r.getTime();)n=new m$1(n,this.getTz()).increment(this._states.pattern,this.options,true),i=n.getTime()+this.options.interval*1e3;t=true;}return n===null&&(n=void 0),[n,t]}};

const e=globalThis.process?.env||Object.create(null),t=globalThis.process||{env:e},n=t!==void 0&&t.env&&t.env.NODE_ENV||void 0,r=[[`claude`,[`CLAUDECODE`,`CLAUDE_CODE`]],[`replit`,[`REPL_ID`]],[`gemini`,[`GEMINI_CLI`]],[`codex`,[`CODEX_SANDBOX`,`CODEX_THREAD_ID`]],[`opencode`,[`OPENCODE`]],[`pi`,[i(`PATH`,/\.pi[\\/]agent/)]],[`auggie`,[`AUGMENT_AGENT`]],[`goose`,[`GOOSE_PROVIDER`]],[`junie`,[`JUNIE_DATA`,`JUNIE_SHIM_PATH`]],[`devin`,[i(`EDITOR`,/devin/)]],[`cursor`,[`CURSOR_AGENT`]],[`kiro`,[i(`TERM_PROGRAM`,/kiro/,{noTTY:true})]]];function i(n,r,i){return ()=>{if(i?.noTTY&&t.stdout?.isTTY)return  false;let a=e[n];return a?r.test(a):false}}function a(){let t=e.AI_AGENT;if(t)return {name:t.toLowerCase()};for(let[t,n]of r)for(let r of n)if(typeof r==`string`?e[r]:r())return {name:t};return {}}const o=a();o.name;!!o.name;const l=[[`APPVEYOR`],[`AWS_AMPLIFY`,`AWS_APP_ID`,{ci:true}],[`AZURE_PIPELINES`,`SYSTEM_TEAMFOUNDATIONCOLLECTIONURI`],[`AZURE_STATIC`,`INPUT_AZURE_STATIC_WEB_APPS_API_TOKEN`],[`APPCIRCLE`,`AC_APPCIRCLE`],[`BAMBOO`,`bamboo_planKey`],[`BITBUCKET`,`BITBUCKET_COMMIT`],[`BITRISE`,`BITRISE_IO`],[`BUDDY`,`BUDDY_WORKSPACE_ID`],[`BUILDKITE`],[`CIRCLE`,`CIRCLECI`],[`CIRRUS`,`CIRRUS_CI`],[`CLOUDFLARE_PAGES`,`CF_PAGES`,{ci:true}],[`CLOUDFLARE_WORKERS`,`WORKERS_CI`,{ci:true}],[`GOOGLE_CLOUDRUN`,`K_SERVICE`],[`GOOGLE_CLOUDRUN_JOB`,`CLOUD_RUN_JOB`],[`CODEBUILD`,`CODEBUILD_BUILD_ARN`],[`CODEFRESH`,`CF_BUILD_ID`],[`DRONE`],[`DRONE`,`DRONE_BUILD_EVENT`],[`DSARI`],[`GITHUB_ACTIONS`],[`GITLAB`,`GITLAB_CI`],[`GITLAB`,`CI_MERGE_REQUEST_ID`],[`GOCD`,`GO_PIPELINE_LABEL`],[`LAYERCI`],[`JENKINS`,`JENKINS_URL`],[`HUDSON`,`HUDSON_URL`],[`MAGNUM`],[`NETLIFY`],[`NETLIFY`,`NETLIFY_LOCAL`,{ci:false}],[`NEVERCODE`],[`RENDER`],[`SAIL`,`SAILCI`],[`SEMAPHORE`],[`SCREWDRIVER`],[`SHIPPABLE`],[`SOLANO`,`TDDIUM`],[`STRIDER`],[`TEAMCITY`,`TEAMCITY_VERSION`],[`TRAVIS`],[`VERCEL`,`NOW_BUILDER`],[`VERCEL`,`VERCEL`,{ci:false}],[`VERCEL`,`VERCEL_ENV`,{ci:false}],[`APPCENTER`,`APPCENTER_BUILD_ID`],[`CODESANDBOX`,`CODESANDBOX_SSE`,{ci:false}],[`CODESANDBOX`,`CODESANDBOX_HOST`,{ci:false}],[`STACKBLITZ`],[`STORMKIT`],[`CLEAVR`],[`ZEABUR`],[`CODESPHERE`,`CODESPHERE_APP_ID`,{ci:true}],[`RAILWAY`,`RAILWAY_PROJECT_ID`],[`RAILWAY`,`RAILWAY_SERVICE_ID`],[`DENO-DEPLOY`,`DENO_DEPLOY`],[`DENO-DEPLOY`,`DENO_DEPLOYMENT_ID`],[`FIREBASE_APP_HOSTING`,`FIREBASE_APP_HOSTING`,{ci:true}],[`EDGEONE_PAGES`,`EO_PAGES_CI`,{ci:true}]];function u(){for(let t of l)if(e[t[1]||t[0]])return {name:t[0].toLowerCase(),...t[2]};return e.SHELL===`/bin/jsh`&&t.versions?.webcontainer?{name:`stackblitz`,ci:false}:{name:``,ci:false}}const d=u();d.name;const p=t.platform||``,m=!!e.CI||d.ci!==false,h=!!t.stdout?.isTTY;!!e.DEBUG;const v=n===`test`||!!e.TEST;n===`production`||e.MODE===`production`;n===`dev`||n===`development`||e.MODE===`development`;!!e.MINIMAL||m||v||!h;const S=/^win/i.test(p);!e.NO_COLOR&&(!!e.FORCE_COLOR||(h||S)&&e.TERM!==`dumb`||m);const E=(t.versions?.node||``).replace(/^v/,``)||null;Number(E?.split(`.`)[0])||null;const O=!!t?.versions?.node,k=`Bun`in globalThis,A=`Deno`in globalThis,j=`fastly`in globalThis,M=`Netlify`in globalThis,N=`EdgeRuntime`in globalThis,P=globalThis.navigator?.userAgent===`Cloudflare-Workers`,F=[[M,`netlify`],[N,`edge-light`],[P,`workerd`],[j,`fastly`],[A,`deno`],[k,`bun`],[O,`node`]];function I(){let e=F.find(e=>e[0]);if(e)return {name:e[1]}}const L=I();L?.name||``;

const scheduledTasks = [{"cron":"0 15 * * *","tasks":["lead:reminders"]}];

const tasks = {
  "lead:reminders": {
          meta: {
            description: "Processes custom individual queues and recurring marketing blasts",
          },
          resolve: () => import('../_/reminders.mjs').then(r => r.default || r),
        }
};

function defineTask(def) {
  if (typeof def.run !== "function") {
    def.run = () => {
      throw new TypeError("Task must implement a `run` method!");
    };
  }
  return def;
}
const __runningTasks__ = {};
async function runTask(name, {
  payload = {},
  context = {}
} = {}) {
  if (__runningTasks__[name]) {
    return __runningTasks__[name];
  }
  if (!(name in tasks)) {
    throw createError$1({
      message: `Task \`${name}\` is not available!`,
      statusCode: 404
    });
  }
  if (!tasks[name].resolve) {
    throw createError$1({
      message: `Task \`${name}\` is not implemented!`,
      statusCode: 501
    });
  }
  const handler = await tasks[name].resolve();
  const taskEvent = { name, payload, context };
  __runningTasks__[name] = handler.run(taskEvent);
  try {
    const res = await __runningTasks__[name];
    return res;
  } finally {
    delete __runningTasks__[name];
  }
}
function startScheduleRunner() {
  if (!scheduledTasks || scheduledTasks.length === 0 || v) {
    return;
  }
  const payload = {
    scheduledTime: Date.now()
  };
  for (const schedule of scheduledTasks) {
    new E$1(schedule.cron, async () => {
      await Promise.all(
        schedule.tasks.map(
          (name) => runTask(name, {
            payload,
            context: {}
          }).catch((error) => {
            console.error(
              `Error while running scheduled task "${name}"`,
              error
            );
          })
        )
      );
    });
  }
}

function baseURL() {
	
	return useRuntimeConfig().app.baseURL;
}
function buildAssetsDir() {
	
	return useRuntimeConfig().app.buildAssetsDir;
}
function buildAssetsURL(...path) {
	return joinRelativeURL(publicAssetsURL(), buildAssetsDir(), ...path);
}
function publicAssetsURL(...path) {
	
	const app = useRuntimeConfig().app;
	const publicBase = app.cdnURL || app.baseURL;
	return path.length ? joinRelativeURL(publicBase, ...path) : publicBase;
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});
async function useOpenAi(messages) {
  var _a, _b, _c;
  try {
    const res = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages
    });
    const text = (_c = (_b = (_a = res == null ? void 0 : res.choices) == null ? void 0 : _a[0]) == null ? void 0 : _b.message) == null ? void 0 : _c.content;
    return typeof text === "string" && text.trim() ? text.trim() : null;
  } catch (err) {
    console.error("OpenAI failed", err);
    return null;
  }
}

function buildPrompt$2(briefing) {
  const { totals, leads } = briefing;
  const sample = leads.slice(0, 5).map((l) => {
    const first = (l.name || "A lead").split(" ")[0];
    return `- ${first}: ${l.reason}`;
  });
  return [
    `You are a friendly real-estate assistant writing a one or two sentence morning briefing for a busy realtor.`,
    `Do not invent any leads or numbers. Use ONLY these facts.`,
    ``,
    `Counts today: ${totals.new} new, ${totals.overdue} overdue follow-ups, ${totals.cold} going cold (${totals.total} total needing attention).`,
    sample.length ? `Top items:
${sample.join("\n")}` : `No leads need attention today.`,
    ``,
    `Write an encouraging, concrete summary. No greeting, no sign-off, no markdown. Max 2 sentences.`
  ].join("\n");
}
async function narrateBriefing(briefing) {
  var _a;
  if (briefing.totals.total === 0) return null;
  return (_a = useOpenAi([{ role: "user", content: buildPrompt$2(briefing) }])) != null ? _a : null;
}

const leadSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
    index: true
    // Vital index for instant dashboard lookup grouping
  },
  company_name: String,
  // Attach company name to lead
  company_email: String,
  // Attach compnay email to lead
  source: String,
  name: String,
  age: Number,
  email: String,
  phone: String,
  // Kept as string to preserve leading zeros or symbols safely
  best_communication_method: String,
  address: String,
  want_to_move: String,
  buy_sell_both: String,
  price: Number,
  sqft: Number,
  bedrooms: Number,
  bathrooms: Number,
  budget: Number,
  notes: String,
  seeing_an_agent: String,
  ai_analysis: String,
  data_kind: String,
  status: { type: String, default: "new" },
  date: { type: String, default: () => (/* @__PURE__ */ new Date()).toISOString() },
  reminderSent: { type: Boolean, default: false },
  reminderStatus: {
    type: String,
    enum: ["none", "scheduled", "sent"],
    default: "none"
    // 'none' means automation is disabled for this specific lead
  },
  reminderScheduledAt: {
    type: Date,
    required: false
  },
  // ============================================================
  // Contact tracking — powers the daily "who to contact" briefing.
  // lastContactedAt is stamped every time we email a lead (manual
  // reminder, campaign blast) OR the realtor logs an outreach.
  // Older leads created before this field existed fall back to
  // createdAt / updatedAt inside the briefing engine.
  // ============================================================
  lastContactedAt: {
    type: Date,
    required: false,
    index: true
    // Indexed so cold-lead scans stay fast at volume
  },
  contactCount: {
    type: Number,
    default: 0
    // How many touches this lead has received from us
  }
}, { timestamps: true });
const schemaImport = mongoose.models.Lead || mongoose.model("Lead", leadSchema);

const LeadModel = schemaImport;
function resolveLastContact(lead) {
  if (lead.lastContactedAt) return new Date(lead.lastContactedAt);
  if (lead.contactCount && lead.contactCount > 0) {
    if (lead.updatedAt) return new Date(lead.updatedAt);
    if (lead.createdAt) return new Date(lead.createdAt);
  }
  return null;
}
function daysBetween(from, to) {
  const ms = to.getTime() - from.getTime();
  return Math.floor(ms / (1e3 * 60 * 60 * 24));
}
const HUMAN_DAY = (n) => n <= 0 ? "today" : n === 1 ? "1 day ago" : `${n} days ago`;
async function buildDailyBriefing(userId, opts = {}) {
  var _a, _b;
  const now = (_a = opts.now) != null ? _a : /* @__PURE__ */ new Date();
  const coldAfter = (_b = opts.cold_lead_after_days) != null ? _b : 14;
  const leads = await LeadModel.find({
    userId,
    status: { $nin: ["closed", "archive"] }
  }).select(
    "name email phone status best_communication_method lastContactedAt contactCount reminderStatus reminderScheduledAt createdAt updatedAt"
  ).lean();
  const result = [];
  for (const lead of leads) {
    const lastContact = resolveLastContact(lead);
    const neverContacted = lastContact === null;
    let bucket;
    let reason;
    let priorityScore;
    const daysSinceContact = lastContact ? daysBetween(lastContact, now) : null;
    const hasOverdueReminder = lead.reminderStatus === "scheduled" && lead.reminderScheduledAt && new Date(lead.reminderScheduledAt).getTime() <= now.getTime();
    if (hasOverdueReminder) {
      bucket = "overdue";
      const overdueDays = daysBetween(new Date(lead.reminderScheduledAt), now);
      reason = overdueDays <= 0 ? "Follow-up you scheduled is due today" : `Follow-up you scheduled is ${overdueDays} day${overdueDays === 1 ? "" : "s"} overdue`;
      priorityScore = 1e3 + overdueDays;
    } else if (neverContacted) {
      bucket = "new";
      const ageDays = lead.createdAt ? daysBetween(new Date(lead.createdAt), now) : 0;
      reason = ageDays <= 0 ? "New lead \u2014 reach out today" : `New lead, still uncontacted after ${ageDays} day${ageDays === 1 ? "" : "s"}`;
      priorityScore = 500 + Math.min(ageDays, 400);
    } else if (daysSinceContact !== null && daysSinceContact >= coldAfter) {
      bucket = "cold";
      reason = `No contact in ${daysSinceContact} days \u2014 time to check in`;
      priorityScore = 100 + Math.min(daysSinceContact, 399);
    } else {
      continue;
    }
    result.push({
      _id: String(lead._id),
      name: lead.name || "Unnamed lead",
      email: lead.email || "",
      phone: lead.phone || "",
      status: lead.status || "new",
      bucket,
      reason,
      daysSinceContact,
      lastContactLabel: daysSinceContact === null ? "Never contacted" : `Last contacted ${HUMAN_DAY(daysSinceContact)}`,
      priorityScore,
      best_communication_method: lead.best_communication_method
    });
  }
  result.sort((a, b) => b.priorityScore - a.priorityScore);
  const totals = {
    total: result.length,
    new: result.filter((l) => l.bucket === "new").length,
    overdue: result.filter((l) => l.bucket === "overdue").length,
    cold: result.filter((l) => l.bucket === "cold").length
  };
  return {
    generatedAt: now.toISOString(),
    totals,
    leads: result,
    headline: buildHeadline(totals)
  };
}
function buildHeadline(totals) {
  if (totals.total === 0) {
    return "You're all caught up \u2014 no leads need attention today. Nice work.";
  }
  const parts = [];
  if (totals.overdue > 0)
    parts.push(`${totals.overdue} overdue follow-up${totals.overdue === 1 ? "" : "s"}`);
  if (totals.new > 0)
    parts.push(`${totals.new} new lead${totals.new === 1 ? "" : "s"} to reach`);
  if (totals.cold > 0)
    parts.push(`${totals.cold} going cold`);
  let list;
  if (parts.length === 1) list = parts[0];
  else if (parts.length === 2) list = `${parts[0]} and ${parts[1]}`;
  else list = `${parts.slice(0, -1).join(", ")} and ${parts[parts.length - 1]}`;
  return `You have ${list} today.`;
}

function firstName(name) {
  if (!name) return "there";
  return name.split(" ")[0] || "there";
}
function money(n) {
  if (!n || n <= 0) return null;
  return "$" + n.toLocaleString("en-US");
}
function templateDraft(lead, channel) {
  const fn = firstName(lead.name);
  const agent = lead.agentName || "your agent";
  const budget = money(lead.budget) || money(lead.price);
  const intent = (lead.buy_sell_both || "").toLowerCase();
  const bits = [];
  if (budget) bits.push(`around ${budget}`);
  if (lead.bedrooms) bits.push(`${lead.bedrooms}-bed`);
  if (lead.want_to_move) bits.push(`a ${lead.want_to_move.toLowerCase()} timeline`);
  const detail = bits.length ? ` (${bits.join(", ")})` : "";
  if (channel === "sms") {
    if (intent.includes("sell")) {
      return `Hi ${fn}, it's ${agent}. Wanted to check in on your plans to sell${detail}. A couple of things are moving in the market right now \u2014 want me to pull a quick value estimate for you?`;
    }
    return `Hi ${fn}, it's ${agent}. Thinking about your home search${detail} \u2014 a few new options just came up that might be a fit. Want me to send them over?`;
  }
  const opener = intent.includes("sell") ? `I wanted to follow up on your plans to sell${detail}.` : `I wanted to follow up on your home search${detail}.`;
  return `Hi ${fn},

${opener} A few things have shifted in the local market recently and I think it's worth a quick catch-up.

Do you have a few minutes this week? Just reply here and we'll find a time.

Best,
${lead.agentName || ""}`;
}
function buildPrompt$1(lead, channel) {
  const facts = [];
  facts.push(`Lead first name: ${firstName(lead.name)}`);
  if (money(lead.budget)) facts.push(`Budget: ${money(lead.budget)}`);
  else if (money(lead.price)) facts.push(`Approx price point: ${money(lead.price)}`);
  if (lead.want_to_move) facts.push(`Timeline to move: ${lead.want_to_move}`);
  if (lead.buy_sell_both) facts.push(`Buying/selling: ${lead.buy_sell_both}`);
  if (lead.bedrooms) facts.push(`Bedrooms wanted: ${lead.bedrooms}`);
  facts.push(`Realtor's name: ${lead.agentName || "the agent"}`);
  const channelRule = channel === "sms" ? `Write it as a SHORT text message (under 40 words). No greeting line, no signature, no subject. Warm, direct, one clear question or call to action.` : `Write it as a brief email (under 90 words). Include a "Hi <name>," greeting and a short sign-off with the realtor's name. One clear call to action.`;
  return [
    `You are helping a real estate agent write a personal outreach message to a lead.`,
    `Use ONLY these facts. Do not invent listings, prices, or promises. Do not make guarantees about the market.`,
    ``,
    facts.join("\n"),
    ``,
    channelRule,
    `Sound like a real person, not a marketing blast. No markdown, no emojis. Return only the message text.`
  ].join("\n");
}
async function generateLeadDraft(lead, channel = "sms") {
  let aiText = null;
  aiText = await useOpenAi([{ role: "user", content: buildPrompt$1(lead, channel) }]);
  if (aiText) return { message: aiText, source: "ai" };
  return { message: templateDraft(lead, channel), source: "template" };
}

var _a;
const MONGO_URI = process.env.MONGO_URI;
const globalCache = globalThis;
const cached = (_a = globalCache._mongoose) != null ? _a : { conn: null, promise: null };
globalCache._mongoose = cached;
const connectDB = async () => {
  if (!MONGO_URI) {
    throw new Error("MONGO_URI is not set. Check your environment variables.");
  }
  if (cached.conn && mongoose.connection.readyState === 1) {
    return true;
  }
  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGO_URI, {
      // Don't queue operations forever if the connection is down; fail fast
      // so the caller gets a real error instead of hanging.
      bufferCommands: false,
      // Keep the pool small — serverless containers are short-lived and a
      // large pool per container exhausts the Atlas limit quickly.
      maxPoolSize: 10,
      minPoolSize: 0,
      serverSelectionTimeoutMS: 1e4,
      socketTimeoutMS: 45e3,
      // Retry a dropped write once rather than surfacing a transient blip.
      retryWrites: true
    });
  }
  try {
    cached.conn = await cached.promise;
  } catch (error) {
    cached.promise = null;
    console.error("[db] connection failed:", error == null ? void 0 : error.message);
    throw error;
  }
  return true;
};

const userSchema = new Schema({
  company: String,
  company_hashed: String,
  role: String,
  category: String,
  category_hashed: String,
  qr_code_slug: String,
  total_scans: { type: Number, default: 0 },
  leads_captured: { type: Number, default: 0 },
  name: String,
  email: { type: String, unique: true, required: true },
  email_hashed: String,
  phone: String,
  password: String,
  region: String,
  country: String,
  reset_password_token: String,
  privacy_policy: Boolean,
  paid: { type: Boolean, default: false },
  paid_tier: String,
  // Which plan they subscribed to ('shadow' | 'phantom'), set by the Stripe webhook.
  plan: { type: String, default: null },
  // Stripe subscription lifecycle - required so we can cancel on account deletion.
  stripeCustomerId: { type: String, default: null },
  stripeSubscriptionId: { type: String, default: null },
  subscriptionStatus: {
    type: String,
    // mirrors Stripe subscription statuses; 'none' = never subscribed
    enum: ["none", "active", "trialing", "past_due", "canceled", "incomplete", "incomplete_expired", "unpaid"],
    default: "none"
  },
  calendar_link: String,
  // IANA timezone (e.g. 'America/Denver'). Used so scheduled sends fire
  // at the realtor's local morning, not the server's UTC hour.
  // Falls back to 'America/Denver' when unset.
  timezone: { type: String, default: "America/Denver" },
  // How many days of silence before a lead is considered "cold" and
  // resurfaced in the daily briefing. Per-realtor tunable.
  cold_lead_after_days: { type: Number, default: 14 },
  // Whether the realtor has finished (or skipped) the guided tour.
  tour_completed: { type: Boolean, default: false },
  // ============================================================
  // Branding — used by outgoing emails AND the social card
  // generator. These belong to the REALTOR: a lead should never
  // see software branding they don't recognise.
  // ============================================================
  headshot_url: { type: String, default: "" },
  brand_color: { type: String, default: "#B5563A" },
  title_line: { type: String, default: "" },
  website: { type: String, default: "" },
  // Saved social-card look, so every card an agent makes matches the last one.
  // Consistency across a feed is the actual point of these graphics.
  cardStyle: {
    theme: { type: String, default: "light" },
    // light | dark | accent | custom
    bg: { type: String, default: "#F7F4EF" },
    fg: { type: String, default: "#1F1B16" },
    accent: { type: String, default: "#B5563A" },
    showAvatar: { type: Boolean, default: true },
    showBar: { type: Boolean, default: true },
    ratio: { type: String, default: "square" }
    // square | story | landscape
  },
  // ============================================================
  // Social voice profile — captured once, then used to make every
  // generated post sound like this specific realtor rather than
  // generic real-estate filler. Without it, AI posts all read the
  // same and agents stop using the feature.
  // ============================================================
  voice: {
    // How they talk: 'warm' | 'straight' | 'playful' | 'polished'
    tone: { type: String, default: "warm" },
    // Free text: "former teacher, two kids, obsessed with trail running"
    about: { type: String, default: "" },
    // What they want to be known for locally
    focus: { type: String, default: "" },
    // 'none' | 'some' | 'lots'
    emoji: { type: String, default: "some" },
    // 'none' | 'few' | 'many'
    hashtags: { type: String, default: "few" },
    // Words/phrases they actually use, and ones to avoid
    phrases: { type: String, default: "" },
    avoid: { type: String, default: "" },
    // Pasted samples of their real posts — by far the strongest signal
    samples: { type: String, default: "" }
  }
}, { timestamps: true });
const UserModelImport = mongoose.models.User || mongoose.model("User", userSchema);

const UserDoc = UserModelImport;
const ACTIVE_STATUSES = /* @__PURE__ */ new Set(["active", "trialing"]);
async function requirePaidUser(event) {
  await connectDB();
  const { user } = await requireUserSession(event);
  const email = user == null ? void 0 : user.email;
  const dbUser = await UserDoc.findOne({ email });
  if (!dbUser) {
    throw createError$1({ statusCode: 401, statusMessage: "User not found." });
  }
  const status = dbUser.subscriptionStatus;
  const isActive = ACTIVE_STATUSES.has(status) || dbUser.paid === true;
  if (!isActive) {
    throw createError$1({
      statusCode: 402,
      statusMessage: "An active subscription is required."
    });
  }
  return dbUser;
}

const TOPICS = {
  open_house: {
    label: "Open house this weekend",
    brief: "Invite people to an upcoming open house. Give a reason to show up beyond the address."
  },
  just_listed: {
    label: "New listing",
    brief: "Announce a new listing. Lead with what makes the home feel like a home, not a spec sheet."
  },
  just_sold: {
    label: "Just sold / closed",
    brief: "Celebrate a closing. Centre the clients, not the agent. No bragging about volume."
  },
  market_note: {
    label: "Local market note",
    brief: "Share one useful observation about the local market. Practical, not doom or hype."
  },
  tip: {
    label: "Advice for buyers or sellers",
    brief: "One genuinely useful tip. Specific enough that it could only come from someone who does this work."
  },
  personal: {
    label: "Something personal / local",
    brief: "A human post about life in the area. Builds familiarity. Real estate stays in the background."
  },
  testimonial: {
    label: "Client thank-you",
    brief: "Thank a client warmly and specifically, without naming private details."
  }
};
const PLATFORM_RULES = {
  facebook: "Facebook: conversational, 2-4 short paragraphs, can be up to ~120 words. Line breaks between thoughts. Ends with a question or an easy invitation to reply. Hashtags are unusual here \u2014 use none or one.",
  instagram: 'Instagram: written to sit under a photo. First line must work as a hook on its own, since the rest is hidden behind "more". 40-80 words. Hashtags go at the end, on their own line.',
  x: 'X: under 260 characters, single thought, no fluff. No "thread" language. At most one hashtag, often none.'
};
function toneLine(tone) {
  switch (tone) {
    case "straight":
      return "Plain and direct. No exclamation marks. Short sentences.";
    case "playful":
      return "Light and a bit funny. Never goofy or cringe.";
    case "polished":
      return "Composed and professional, but still human. No corporate stiffness.";
    default:
      return "Warm and neighbourly. Sounds like a person, not a brand.";
  }
}
function emojiLine(level) {
  if (level === "none") return "Use NO emoji at all.";
  if (level === "lots") return "Emoji are welcome \u2014 a few, placed naturally.";
  return "At most one emoji, and only if it genuinely adds something.";
}
function hashtagLine(level, platform) {
  if (level === "none") return "No hashtags.";
  if (level === "many") {
    return platform === "instagram" ? "Include 8-12 relevant hashtags on their own line at the end." : "Include 2-3 hashtags at the end.";
  }
  return platform === "instagram" ? "Include 3-5 relevant hashtags on their own line at the end." : "Include at most 1 hashtag, or none.";
}
function buildPrompt(platform, topicKey, ctx, details) {
  var _a;
  const v = ctx.voice || {};
  const topic = TOPICS[topicKey] || TOPICS.personal;
  const lines = [
    `You are ghostwriting a social media post for a real estate agent. It must sound like THEM, not like a marketing template.`,
    ``,
    `AGENT`,
    `- Name: ${ctx.agentName || "the agent"}`,
    ctx.company ? `- Brokerage: ${ctx.company}` : "",
    ctx.region ? `- Area they serve: ${ctx.region}` : "",
    v.about ? `- About them: ${v.about}` : "",
    v.focus ? `- What they want to be known for: ${v.focus}` : "",
    ``,
    `VOICE`,
    `- ${toneLine(v.tone)}`,
    `- ${emojiLine(v.emoji)}`,
    `- ${hashtagLine(v.hashtags, platform)}`,
    v.phrases ? `- Words and phrases they actually use: ${v.phrases}` : "",
    v.avoid ? `- NEVER use these words or phrases: ${v.avoid}` : "",
    ``
  ];
  if ((_a = v.samples) == null ? void 0 : _a.trim()) {
    lines.push(
      `THEIR REAL POSTS (match this rhythm and vocabulary closely \u2014 this is the strongest signal you have):`,
      v.samples.trim(),
      ``
    );
  }
  lines.push(
    `POST TO WRITE`,
    `- Topic: ${topic == null ? void 0 : topic.label}`,
    `- Goal: ${topic == null ? void 0 : topic.brief}`,
    details ? `- Specific details to use: ${details}` : "",
    ``,
    `PLATFORM`,
    `- ${PLATFORM_RULES[platform]}`,
    ``,
    `RULES`,
    `- Do NOT invent facts: no addresses, prices, square footage, dates, or statistics that weren't given to you.`,
    `- No fair-housing risk: never reference or imply a preferred race, religion, family status, nationality, disability, or "good schools"/"safe neighbourhood" as a proxy for those.`,
    `- Avoid realtor clich\xE9s: "Just Listed!!", "Your dream home awaits", "Don't miss out", "DM me".`,
    `- No fake urgency or guarantees about the market.`,
    ``,
    `Return ONLY JSON, no markdown fence:`,
    `{"body": "the post text", "hashtags": "space-separated hashtags or empty string", "imageIdea": "one short line describing the photo to pair with it"}`
  );
  return lines.filter(Boolean).join("\n");
}
function parseJson(raw) {
  try {
    const cleaned = raw.replace(/```json|```/g, "").trim();
    const start = cleaned.indexOf("{");
    const end = cleaned.lastIndexOf("}");
    if (start === -1 || end === -1) return null;
    const parsed = JSON.parse(cleaned.slice(start, end + 1));
    if (!(parsed == null ? void 0 : parsed.body)) return null;
    return {
      body: String(parsed.body).trim(),
      hashtags: String(parsed.hashtags || "").trim(),
      imageIdea: String(parsed.imageIdea || "").trim()
    };
  } catch {
    return null;
  }
}
function templatePost(platform, topicKey, ctx, details) {
  var _a;
  const area = ctx.region || "the area";
  const detail = details == null ? void 0 : details.trim();
  const bodies = {
    open_house: `Open house this weekend${detail ? ` \u2014 ${detail}` : ` in ${area}`}. Come by, have a look around, ask me anything. No pressure, no sign-in sheet you'll regret.`,
    just_listed: `New listing${detail ? `: ${detail}` : ` in ${area}`}. Happy to walk you through it or send over the details \u2014 just say the word.`,
    just_sold: `Keys handed over this week.${detail ? ` ${detail}` : ""} Always a good day when it all comes together for people who deserve it.`,
    market_note: `A quick note on the ${area} market${detail ? `: ${detail}` : "."} Happy to talk through what it means for your situation specifically.`,
    tip: detail || `One thing I'd tell anyone buying in ${area}: get your financing sorted before you fall in love with a house. It changes what you can move on.`,
    personal: detail || `One of the things I like about working in ${area} is that you run into people you know everywhere you go.`,
    testimonial: `Grateful for the folks who trusted me with this one.${detail ? ` ${detail}` : ""} It genuinely doesn't get old.`
  };
  let body = bodies[topicKey] || bodies.personal;
  if (platform === "x" && body.length > 255) body = body.slice(0, 252) + "\u2026";
  const tags = ((_a = ctx.voice) == null ? void 0 : _a.hashtags) === "none" ? "" : platform === "instagram" ? `#${area.replace(/[^a-zA-Z]/g, "")}RealEstate #MontanaHomes #LocalRealtor` : "";
  return {
    body,
    hashtags: tags,
    imageIdea: topicKey === "personal" ? "A real photo from your day \u2014 not a stock image." : "A bright, straight-on photo of the home or street."
  };
}
async function generateSocialPosts(platform, topicKey, ctx, opts = {}) {
  var _a;
  const count = Math.min(Math.max((_a = opts.count) != null ? _a : 3, 1), 5);
  const anthropicKey = process.env.ANTHROPIC_API_KEY;
  const openaiKey = process.env.OPENAI_API_KEY;
  if (anthropicKey || openaiKey) {
    const prompt = buildPrompt(platform, topicKey, ctx, opts.details);
    const results = [];
    for (let i = 0; i < count; i++) {
      const variation = i === 0 ? prompt : `${prompt}

Write a DIFFERENT post from the one you'd write first \u2014 a different angle or opening entirely.`;
      const raw = await useOpenAi([{ role: "user", content: variation }]);
      const parsed = raw ? parseJson(raw) : null;
      if (parsed) results.push(parsed);
    }
    if (results.length) return { posts: results, source: "ai" };
  }
  return {
    posts: [templatePost(platform, topicKey, ctx, opts.details)],
    source: "template"
  };
}

const PALETTE = {
  paper: "#F7F4EF",
  paperWarm: "#EFEAE0",
  ink: "#1F1B16",
  gray: "#8A847C",
  graySoft: "#A9A39A",
  rust: "#B5563A",
  hair: "#DDD6C9"
};
function welcomeHtml(firstName, domain) {
  const p = PALETTE;
  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:${p.paper};font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;color:${p.ink};">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${p.paper};padding:40px 16px;">
    <tr><td align="center">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:${p.paper};">

        <!-- Wordmark -->
        <tr><td style="padding-bottom:36px;">
          <span style="font-family:Georgia,'Times New Roman',serif;font-size:19px;font-weight:700;letter-spacing:-0.3px;color:${p.ink};">GhostForm</span>
        </td></tr>

        <!-- Headline -->
        <tr><td style="padding-bottom:18px;">
          <h1 style="margin:0;font-family:Georgia,'Times New Roman',serif;font-size:32px;line-height:1.15;font-weight:600;letter-spacing:-0.5px;color:${p.ink};">
            Welcome, ${firstName}.
          </h1>
        </td></tr>

        <tr><td style="padding-bottom:30px;">
          <p style="margin:0;font-size:16px;line-height:1.65;color:${p.gray};">
            You just did the thing most agents put off: you set up a system so the
            follow-up happens whether or not you remember it.
          </p>
        </td></tr>

        <!-- Why this was a good call -->
        <tr><td style="padding-bottom:12px;">
          <p style="margin:0;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#5A6349;font-weight:600;">
            Why this matters
          </p>
        </td></tr>

        <tr><td style="padding-bottom:30px;">
          <p style="margin:0 0 14px;font-size:15px;line-height:1.7;color:${p.ink};">
            Most leads aren't lost to competition. They're lost to silence \u2014 the
            buyer you meant to call back on Tuesday who signed with someone else
            by Friday.
          </p>
          <p style="margin:0;font-size:15px;line-height:1.7;color:${p.gray};">
            GhostForm exists to close that gap. Every morning it hands you a short
            list: who's new, who's gone quiet, and who you promised to follow up
            with. No spreadsheet to maintain, no CRM to babysit.
          </p>
        </td></tr>

        <!-- What you now have -->
        <tr><td style="padding-bottom:14px;border-top:1px solid ${p.hair};padding-top:30px;">
          <p style="margin:0;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#5A6349;font-weight:600;">
            What you now have
          </p>
        </td></tr>

        <tr><td style="padding-bottom:32px;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
            ${[
    ["A QR code for your open houses", "Guests sign in on their own phone. It works even with no cell signal \u2014 the leads sync once you\u2019re back in range."],
    ["Your morning call list", "New leads, cold leads, and overdue follow-ups, ranked so you start at the top."],
    ["Follow-ups that send themselves", "Set an email once and it goes out weekly, biweekly, or monthly to everyone at that stage."],
    ["Messages written for you", "One tap drafts a text or email using what that lead actually told you."]
  ].map(([title, body]) => `
            <tr><td style="padding-bottom:18px;">
              <p style="margin:0 0 4px;font-family:Georgia,serif;font-size:16px;font-weight:600;color:${p.ink};">${title}</p>
              <p style="margin:0;font-size:14px;line-height:1.6;color:${p.gray};">${body}</p>
            </td></tr>`).join("")}
          </table>
        </td></tr>

        <!-- The one action that matters -->
        <tr><td style="background:${p.paperWarm};border:1px solid ${p.hair};padding:28px;">
          <p style="margin:0 0 8px;font-family:Georgia,serif;font-size:18px;font-weight:600;color:${p.ink};">
            Start here: print one QR code
          </p>
          <p style="margin:0 0 20px;font-size:14px;line-height:1.65;color:${p.gray};">
            It takes about two minutes. Put it on the table at your next showing and
            let it collect a lead \u2014 that's the moment this stops being another tool
            you signed up for.
          </p>
          <a href="${domain}/dashboard/forms"
             style="display:inline-block;background:${p.rust};color:${p.paper};text-decoration:none;padding:14px 28px;font-size:11px;font-weight:600;letter-spacing:1.5px;text-transform:uppercase;">
            Get my QR code
          </a>
        </td></tr>

        <!-- Trial terms, stated plainly -->
        <tr><td style="padding-top:30px;">
          <p style="margin:0;font-size:13px;line-height:1.65;color:${p.graySoft};">
            You're on a 30-day free trial. Your card isn't charged until day 31, and
            you can cancel any time before then from your profile.
          </p>
        </td></tr>

        <!-- Personal sign-off -->
        <tr><td style="padding-top:30px;border-top:1px solid ${p.hair};margin-top:30px;">
          <p style="margin:24px 0 0;font-size:14px;line-height:1.7;color:${p.gray};">
            I built GhostForm myself in Kalispell Montana, and I read every reply to this
            address. If something's confusing or missing, tell me \u2014 I'd rather hear it
            than have you quietly stop using it.
          </p>
          <p style="margin:16px 0 0;font-size:14px;color:${p.ink};font-weight:500;">
            \u2014 White Raven Development
          </p>
        </td></tr>

        <tr><td style="padding-top:34px;">
          <p style="margin:0;font-size:11px;color:${p.graySoft};letter-spacing:0.3px;">
            GhostForm \xB7 Built in the Flathead Valley, Montana
          </p>
        </td></tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;
}
function welcomeText(firstName, domain) {
  return `Welcome, ${firstName}.

You just did the thing most agents put off: you set up a system so the follow-up
happens whether or not you remember it.

WHY THIS MATTERS
Most leads aren't lost to competition. They're lost to silence \u2014 the buyer you
meant to call back on Tuesday who signed with someone else by Friday. GhostForm
exists to close that gap. Every morning it hands you a short list: who's new,
who's gone quiet, and who you promised to follow up with.

WHAT YOU NOW HAVE
- A QR code for your open houses. Guests sign in on their own phone. Works with
  no cell signal; leads sync when you're back in range.
- Your morning call list. New, cold, and overdue follow-ups, ranked.
- Follow-ups that send themselves. Weekly, biweekly, or monthly.
- Messages written for you, using what that lead actually told you.

START HERE: PRINT ONE QR CODE
Two minutes. Put it on the table at your next showing and let it collect a lead.
${domain}/dashboard/forms

You're on a 30-day free trial. Your card isn't charged until day 31, and you can
cancel any time before then from your profile.

I built GhostForm myself in Kalispell, and I read every reply to this
address. If something's confusing or missing, tell me.

\u2014 White Raven Development Team

GhostForm \xB7 Built in the Flathead Valley, Montana`;
}
async function sendWelcomeEmail(email, company) {
  if (!email) return false;
  const key = process.env.RESEND_KEY;
  if (!key) {
    console.error("[welcome] RESEND_KEY not set \u2014 skipping welcome email.");
    return false;
  }
  const raw = (company || "").trim();
  const firstName = raw ? raw.charAt(0).toUpperCase() + raw.slice(1) : "there";
  const domain = (process.env.PROJECT_DOMAIN || "").replace(/\/$/, "");
  try {
    const resend = new Resend(key);
    await resend.emails.send({
      from: "Michael at GhostForm <hello@ascendpod.com>",
      to: [email],
      replyTo: "whiteravendev90@gmail.com",
      subject: "Welcome to GhostForm \u2014 start here",
      html: welcomeHtml(firstName, domain),
      text: welcomeText(firstName, domain)
    });
    return true;
  } catch (error) {
    console.error("[welcome] Send failed:", (error == null ? void 0 : error.message) || error);
    return false;
  }
}

const sessionHooks = createHooks();
async function getUserSession(event) {
  const session = await _useSession(event);
  return {
    ...session.data,
    id: session.id
  };
}
async function setUserSession(event, data, config) {
  const session = await _useSession(event, config);
  await session.update(defu(data, session.data));
  return session.data;
}
async function clearUserSession(event, config) {
  const session = await _useSession(event, config);
  await sessionHooks.callHookParallel("clear", session.data, event);
  await session.clear();
  return true;
}
async function requireUserSession(event, opts = {}) {
  const userSession = await getUserSession(event);
  if (!userSession.user) {
    if (isEvent(event)) {
      throw createError$1({
        statusCode: opts.statusCode || 401,
        message: opts.message || "Unauthorized"
      });
    } else {
      throw new Response(opts.message || "Unauthorized", {
        status: opts.statusCode || 401
      });
    }
  }
  return userSession;
}
let sessionConfig;
function _useSession(event, config = {}) {
  if (!sessionConfig) {
    const runtimeConfig = useRuntimeConfig(isEvent(event) ? event : void 0);
    const envSessionPassword = `${runtimeConfig.nitro?.envPrefix || "NUXT_"}SESSION_PASSWORD`;
    sessionConfig = defu({ password: process.env[envSessionPassword] }, runtimeConfig.session);
    if (!sessionConfig.password) {
      console.error(`[nuxt-auth-utils] ${envSessionPassword} environment variable or runtimeConfig.session.password was not set.`);
    }
  }
  const finalConfig = defu(config, sessionConfig);
  return useSession(event, finalConfig);
}

const _z1ZgpX = eventHandler(async (event) => {
  await clearUserSession(event);
  return { loggedOut: true };
});

const _QEBMFR = eventHandler(async (event) => {
  const session = await getUserSession(event);
  if (Object.keys(session).length > 0) {
    await sessionHooks.callHookParallel("fetch", session, event);
  }
  const { secure, ...data } = session;
  return data;
});

const options = {"iconifyApiEndpoint":"https://api.iconify.design"};

const collections = {
  'heroicons': () => import('../_/icons.mjs').then(m => m.default),
  'lucide': () => import('../_/icons2.mjs').then(m => m.default),
  'material-symbols': () => import('../_/icons3.mjs').then(m => m.default),
};

const _rPYuUS = defineCachedEventHandler(async (event) => {
  const collectionName = event.context.params?.collection?.replace(/\.json$/, "");
  const collection = collectionName && Object.hasOwn(collections, collectionName) ? await collections[collectionName]?.() : null;
  const apiEndPoint = options.iconifyApiEndpoint;
  const icons = String(parseQuery(parsePath(event.path).search).icons || "").split(",");
  if (!collectionName) return createError$1({ status: 400, message: "No collection specified" });
  if (!icons.length) return createError$1({ status: 400, message: "No icons specified" });
  if (collection) {
    const data = getIcons(
      collection,
      icons
    );
    consola.debug(`[Icon] serving ${icons.map((i) => "`" + collectionName + ":" + i + "`").join(",")} from bundled collection`);
    return data;
  }
  {
    const apiUrl = new URL(`./${collectionName}.json?icons=${icons.join(",")}`, apiEndPoint);
    consola.debug(`[Icon] fetching ${icons.map((i) => "`" + collectionName + ":" + i + "`").join(",")} from iconify api`);
    if (apiUrl.host !== new URL(apiEndPoint).host) {
      return createError$1({ status: 400, message: "Invalid icon request" });
    }
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        return response.status === 404 ? createError$1({ status: 404 }) : createError$1({ status: 500, message: "Failed to fetch fallback icon" });
      }
      return response.json();
    } catch (e) {
      consola.error(e);
      return createError$1({ status: 500, message: "Failed to fetch fallback icon" });
    }
  }
  return createError$1({ status: 404 });
}, {
  group: "nuxt",
  name: "icon",
  getKey(event) {
    const collection = event.context.params?.collection?.replace(/\.json$/, "") || "unknown";
    const icons = String(parseQuery(parsePath(event.path).search).icons || "").split(",");
    return `${collection}_${icons[0]}_${icons.length}_${hash$1(icons.join(","))}`;
  },
  swr: true,
  maxAge: 60 * 60 * 24 * 7
  // 1 week
});

const _SxA8c9 = defineEventHandler(() => {});

const _DGH2dc = lazyEventHandler(() => {
  const opts = useRuntimeConfig().ipx || {};
  const fsDir = opts?.fs?.dir ? (Array.isArray(opts.fs.dir) ? opts.fs.dir : [opts.fs.dir]).map((dir) => isAbsolute(dir) ? dir : fileURLToPath(new URL(dir, globalThis._importMeta_.url))) : void 0;
  const fsStorage = opts.fs?.dir ? ipxFSStorage({ ...opts.fs, dir: fsDir }) : void 0;
  const httpStorage = opts.http?.domains ? ipxHttpStorage({ ...opts.http }) : void 0;
  if (!fsStorage && !httpStorage) {
    throw new Error("IPX storage is not configured!");
  }
  const ipxOptions = {
    ...opts,
    storage: fsStorage || httpStorage,
    httpStorage
  };
  const ipx = createIPX(ipxOptions);
  const ipxHandler = createIPXH3Handler(ipx);
  return useBase(opts.baseURL, ipxHandler);
});

const _lazy_FaiDIZ = () => import('../routes/api/assets/headshot/_id_.get.mjs');
const _lazy_QAyDq3 = () => import('../routes/api/authentication/delete.delete.mjs');
const _lazy_M0BQ9P = () => import('../routes/api/authentication/forgot.post.mjs');
const _lazy_M4ndqB = () => import('../routes/api/authentication/login.post.mjs');
const _lazy_d8uRs7 = () => import('../routes/api/authentication/reset.mjs');
const _lazy_z7u2Qs = () => import('../routes/api/authentication/signup.post.mjs');
const _lazy_bz6IRH = () => import('../routes/api/index.get.mjs');
const _lazy_0YaBRe = () => import('../routes/api/index.delete.mjs');
const _lazy_Df3_bo = () => import('../routes/api/index2.get.mjs');
const _lazy_uu0vQv = () => import('../routes/api/campaigns/save.post.mjs');
const _lazy_6dQdG0 = () => import('../routes/api/campaigns/toggle.post.mjs');
const _lazy_vknMpb = () => import('../routes/api/campaigns/vary.post.mjs');
const _lazy_oJWXNf = () => import('../routes/api/charts/lead.get.mjs');
const _lazy_kQloHj = () => import('../routes/api/cron.mjs');
const _lazy_6aFyol = () => import('../routes/api/homes/create.post.mjs');
const _lazy_tq6B3q = () => import('../routes/api/homes/delete.post.mjs');
const _lazy_TuGNAE = () => import('../routes/api/index3.get.mjs');
const _lazy__fdLCf = () => import('../routes/api/homes/update.post.mjs');
const _lazy_0rvesM = () => import('../routes/api/leads/_id/contacted.post.mjs');
const _lazy_yBxanF = () => import('../routes/api/leads/_id/draft.post.mjs');
const _lazy_qc34eq = () => import('../routes/api/leads/index.delete.mjs');
const _lazy_i2f0Wa = () => import('../routes/api/leads/index.get.mjs');
const _lazy_f4xwzm = () => import('../routes/api/leads/index.put.mjs');
const _lazy_ygINZT = () => import('../routes/api/leads/_id/schedule.post.mjs');
const _lazy_lZmAO2 = () => import('../routes/api/leads/_id/send-message.post.mjs');
const _lazy_YUWevn = () => import('../routes/api/leads/create.post.mjs');
const _lazy_t9F3bu = () => import('../routes/api/index4.get.mjs');
const _lazy_0Doaks = () => import('../routes/api/leads/tiers.get.mjs');
const _lazy_i191PU = () => import('../routes/api/qr_code/_id_.get.mjs');
const _lazy_rfaZfx = () => import('../routes/api/social/generate.post.mjs');
const _lazy_Z1oZ9j = () => import('../routes/api/index2.delete.mjs');
const _lazy_W7kQn6 = () => import('../routes/api/index5.get.mjs');
const _lazy_YyhPdT = () => import('../routes/api/social/save.post.mjs');
const _lazy_PGwJYq = () => import('../routes/api/social/status.post.mjs');
const _lazy_UPg2Ir = () => import('../routes/api/stripe/subscribe.post.mjs');
const _lazy_pjRUBv = () => import('../routes/api/stripe/webhook.post.mjs');
const _lazy_JDeNrs = () => import('../routes/api/test-reminder.get.mjs');
const _lazy_zchBPt = () => import('../routes/api/user/card-style.post.mjs');
const _lazy_wZagNx = () => import('../routes/api/user/headshot.delete.mjs');
const _lazy_HddarY = () => import('../routes/api/user/headshot.post.mjs');
const _lazy_V0fc_M = () => import('../routes/api/index6.get.mjs');
const _lazy_24ztMZ = () => import('../routes/api/index.put.mjs');
const _lazy_q1wdXI = () => import('../routes/api/user/tour.post.mjs');
const _lazy_5mZRNa = () => import('../routes/api/user/voice.post.mjs');
const _lazy_mqdDEE = () => import('../routes/renderer.mjs').then(function (n) { return n.r; });

const handlers = [
  { route: '', handler: _3ugwHv, lazy: false, middleware: true, method: undefined },
  { route: '/api/assets/headshot/:id', handler: _lazy_FaiDIZ, lazy: true, middleware: false, method: "get" },
  { route: '/api/authentication/delete', handler: _lazy_QAyDq3, lazy: true, middleware: false, method: "delete" },
  { route: '/api/authentication/forgot', handler: _lazy_M0BQ9P, lazy: true, middleware: false, method: "post" },
  { route: '/api/authentication/login', handler: _lazy_M4ndqB, lazy: true, middleware: false, method: "post" },
  { route: '/api/authentication/reset', handler: _lazy_d8uRs7, lazy: true, middleware: false, method: undefined },
  { route: '/api/authentication/signup', handler: _lazy_z7u2Qs, lazy: true, middleware: false, method: "post" },
  { route: '/api/briefing', handler: _lazy_bz6IRH, lazy: true, middleware: false, method: "get" },
  { route: '/api/campaigns', handler: _lazy_0YaBRe, lazy: true, middleware: false, method: "delete" },
  { route: '/api/campaigns', handler: _lazy_Df3_bo, lazy: true, middleware: false, method: "get" },
  { route: '/api/campaigns/save', handler: _lazy_uu0vQv, lazy: true, middleware: false, method: "post" },
  { route: '/api/campaigns/toggle', handler: _lazy_6dQdG0, lazy: true, middleware: false, method: "post" },
  { route: '/api/campaigns/vary', handler: _lazy_vknMpb, lazy: true, middleware: false, method: "post" },
  { route: '/api/charts/lead', handler: _lazy_oJWXNf, lazy: true, middleware: false, method: "get" },
  { route: '/api/cron', handler: _lazy_kQloHj, lazy: true, middleware: false, method: undefined },
  { route: '/api/homes/create', handler: _lazy_6aFyol, lazy: true, middleware: false, method: "post" },
  { route: '/api/homes/delete', handler: _lazy_tq6B3q, lazy: true, middleware: false, method: "post" },
  { route: '/api/homes', handler: _lazy_TuGNAE, lazy: true, middleware: false, method: "get" },
  { route: '/api/homes/update', handler: _lazy__fdLCf, lazy: true, middleware: false, method: "post" },
  { route: '/api/leads/:id/contacted', handler: _lazy_0rvesM, lazy: true, middleware: false, method: "post" },
  { route: '/api/leads/:id/draft', handler: _lazy_yBxanF, lazy: true, middleware: false, method: "post" },
  { route: '/api/leads/:id', handler: _lazy_qc34eq, lazy: true, middleware: false, method: "delete" },
  { route: '/api/leads/:id', handler: _lazy_i2f0Wa, lazy: true, middleware: false, method: "get" },
  { route: '/api/leads/:id', handler: _lazy_f4xwzm, lazy: true, middleware: false, method: "put" },
  { route: '/api/leads/:id/schedule', handler: _lazy_ygINZT, lazy: true, middleware: false, method: "post" },
  { route: '/api/leads/:id/send-message', handler: _lazy_lZmAO2, lazy: true, middleware: false, method: "post" },
  { route: '/api/leads/create', handler: _lazy_YUWevn, lazy: true, middleware: false, method: "post" },
  { route: '/api/leads', handler: _lazy_t9F3bu, lazy: true, middleware: false, method: "get" },
  { route: '/api/leads/tiers', handler: _lazy_0Doaks, lazy: true, middleware: false, method: "get" },
  { route: '/api/qr_code/:id', handler: _lazy_i191PU, lazy: true, middleware: false, method: "get" },
  { route: '/api/social/generate', handler: _lazy_rfaZfx, lazy: true, middleware: false, method: "post" },
  { route: '/api/social', handler: _lazy_Z1oZ9j, lazy: true, middleware: false, method: "delete" },
  { route: '/api/social', handler: _lazy_W7kQn6, lazy: true, middleware: false, method: "get" },
  { route: '/api/social/save', handler: _lazy_YyhPdT, lazy: true, middleware: false, method: "post" },
  { route: '/api/social/status', handler: _lazy_PGwJYq, lazy: true, middleware: false, method: "post" },
  { route: '/api/stripe/subscribe', handler: _lazy_UPg2Ir, lazy: true, middleware: false, method: "post" },
  { route: '/api/stripe/webhook', handler: _lazy_pjRUBv, lazy: true, middleware: false, method: "post" },
  { route: '/api/test-reminder', handler: _lazy_JDeNrs, lazy: true, middleware: false, method: "get" },
  { route: '/api/user/card-style', handler: _lazy_zchBPt, lazy: true, middleware: false, method: "post" },
  { route: '/api/user/headshot', handler: _lazy_wZagNx, lazy: true, middleware: false, method: "delete" },
  { route: '/api/user/headshot', handler: _lazy_HddarY, lazy: true, middleware: false, method: "post" },
  { route: '/api/user', handler: _lazy_V0fc_M, lazy: true, middleware: false, method: "get" },
  { route: '/api/user', handler: _lazy_24ztMZ, lazy: true, middleware: false, method: "put" },
  { route: '/api/user/tour', handler: _lazy_q1wdXI, lazy: true, middleware: false, method: "post" },
  { route: '/api/user/voice', handler: _lazy_5mZRNa, lazy: true, middleware: false, method: "post" },
  { route: '/__nuxt_error', handler: _lazy_mqdDEE, lazy: true, middleware: false, method: undefined },
  { route: '/api/_auth/session', handler: _z1ZgpX, lazy: false, middleware: false, method: "delete" },
  { route: '/api/_auth/session', handler: _QEBMFR, lazy: false, middleware: false, method: "get" },
  { route: '/api/_nuxt_icon/:collection', handler: _rPYuUS, lazy: false, middleware: false, method: undefined },
  { route: '/__nuxt_island/**', handler: _SxA8c9, lazy: false, middleware: false, method: undefined },
  { route: '/_ipx/**', handler: _DGH2dc, lazy: false, middleware: false, method: undefined },
  { route: '/**', handler: _lazy_mqdDEE, lazy: true, middleware: false, method: undefined }
];

function createNitroApp() {
  const config = useRuntimeConfig();
  const hooks = createHooks$1();
  const captureError = (error, context = {}) => {
    const promise = hooks.callHookParallel("error", error, context).catch((error_) => {
      console.error("Error while capturing another error", error_);
    });
    if (context.event && isEvent(context.event)) {
      const errors = context.event.context.nitro?.errors;
      if (errors) {
        errors.push({ error, context });
      }
      if (context.event.waitUntil) {
        context.event.waitUntil(promise);
      }
    }
  };
  const h3App = createApp({
    debug: destr(false),
    onError: (error, event) => {
      captureError(error, { event, tags: ["request"] });
      return errorHandler(error, event);
    },
    onRequest: async (event) => {
      event.context.nitro = event.context.nitro || { errors: [] };
      const fetchContext = event.node.req?.__unenv__;
      if (fetchContext?._platform) {
        event.context = {
          _platform: fetchContext?._platform,
          // #3335
          ...fetchContext._platform,
          ...event.context
        };
      }
      if (!event.context.waitUntil && fetchContext?.waitUntil) {
        event.context.waitUntil = fetchContext.waitUntil;
      }
      event.fetch = (req, init) => fetchWithEvent(event, req, init, { fetch: localFetch });
      event.$fetch = (req, init) => fetchWithEvent(event, req, init, {
        fetch: $fetch
      });
      event.waitUntil = (promise) => {
        if (!event.context.nitro._waitUntilPromises) {
          event.context.nitro._waitUntilPromises = [];
        }
        event.context.nitro._waitUntilPromises.push(promise);
        if (event.context.waitUntil) {
          event.context.waitUntil(promise);
        }
      };
      event.captureError = (error, context) => {
        captureError(error, { event, ...context });
      };
      await nitroApp$1.hooks.callHook("request", event).catch((error) => {
        captureError(error, { event, tags: ["request"] });
      });
    },
    onBeforeResponse: async (event, response) => {
      await nitroApp$1.hooks.callHook("beforeResponse", event, response).catch((error) => {
        captureError(error, { event, tags: ["request", "response"] });
      });
    },
    onAfterResponse: async (event, response) => {
      await nitroApp$1.hooks.callHook("afterResponse", event, response).catch((error) => {
        captureError(error, { event, tags: ["request", "response"] });
      });
    }
  });
  const router = createRouter({
    preemptive: true
  });
  const nodeHandler = toNodeListener(h3App);
  const localCall = (aRequest) => b$1(
    nodeHandler,
    aRequest
  );
  const localFetch = (input, init) => {
    if (!input.toString().startsWith("/")) {
      return globalThis.fetch(input, init);
    }
    return C$1(
      nodeHandler,
      input,
      init
    ).then((response) => normalizeFetchResponse(response));
  };
  const $fetch = createFetch({
    fetch: localFetch,
    Headers: Headers$1,
    defaults: { baseURL: config.app.baseURL }
  });
  globalThis.$fetch = $fetch;
  h3App.use(createRouteRulesHandler({ localFetch }));
  for (const h of handlers) {
    let handler = h.lazy ? lazyEventHandler(h.handler) : h.handler;
    if (h.middleware || !h.route) {
      const middlewareBase = (config.app.baseURL + (h.route || "/")).replace(
        /\/+/g,
        "/"
      );
      h3App.use(middlewareBase, handler);
    } else {
      const routeRules = getRouteRulesForPath(
        h.route.replace(/:\w+|\*\*/g, "_")
      );
      if (routeRules.cache) {
        handler = cachedEventHandler(handler, {
          group: "nitro/routes",
          ...routeRules.cache
        });
      }
      router.use(h.route, handler, h.method);
    }
  }
  h3App.use(config.app.baseURL, router.handler);
  const app = {
    hooks,
    h3App,
    router,
    localCall,
    localFetch,
    captureError
  };
  return app;
}
function runNitroPlugins(nitroApp2) {
  for (const plugin of plugins) {
    try {
      plugin(nitroApp2);
    } catch (error) {
      nitroApp2.captureError(error, { tags: ["plugin"] });
      throw error;
    }
  }
}
const nitroApp$1 = createNitroApp();
function useNitroApp() {
  return nitroApp$1;
}
runNitroPlugins(nitroApp$1);

const debug = (...args) => {
};
function GracefulShutdown(server, opts) {
  opts = opts || {};
  const options = Object.assign(
    {
      signals: "SIGINT SIGTERM",
      timeout: 3e4,
      development: false,
      forceExit: true,
      onShutdown: (signal) => Promise.resolve(signal),
      preShutdown: (signal) => Promise.resolve(signal)
    },
    opts
  );
  let isShuttingDown = false;
  const connections = {};
  let connectionCounter = 0;
  const secureConnections = {};
  let secureConnectionCounter = 0;
  let failed = false;
  let finalRun = false;
  function onceFactory() {
    let called = false;
    return (emitter, events, callback) => {
      function call() {
        if (!called) {
          called = true;
          return Reflect.apply(callback, this, arguments);
        }
      }
      for (const e of events) {
        emitter.on(e, call);
      }
    };
  }
  const signals = options.signals.split(" ").map((s) => s.trim()).filter((s) => s.length > 0);
  const once = onceFactory();
  once(process, signals, (signal) => {
    debug("received shut down signal", signal);
    shutdown(signal).then(() => {
      if (options.forceExit) {
        process.exit(failed ? 1 : 0);
      }
    }).catch((error) => {
      debug("server shut down error occurred", error);
      process.exit(1);
    });
  });
  function isFunction(functionToCheck) {
    const getType = Object.prototype.toString.call(functionToCheck);
    return /^\[object\s([A-Za-z]+)?Function]$/.test(getType);
  }
  function destroy(socket, force = false) {
    if (socket._isIdle && isShuttingDown || force) {
      socket.destroy();
      if (socket.server instanceof http.Server) {
        delete connections[socket._connectionId];
      } else {
        delete secureConnections[socket._connectionId];
      }
    }
  }
  function destroyAllConnections(force = false) {
    debug("Destroy Connections : " + (force ? "forced close" : "close"));
    let counter = 0;
    let secureCounter = 0;
    for (const key of Object.keys(connections)) {
      const socket = connections[key];
      const serverResponse = socket._httpMessage;
      if (serverResponse && !force) {
        if (!serverResponse.headersSent) {
          serverResponse.setHeader("connection", "close");
        }
      } else {
        counter++;
        destroy(socket);
      }
    }
    debug("Connections destroyed : " + counter);
    debug("Connection Counter    : " + connectionCounter);
    for (const key of Object.keys(secureConnections)) {
      const socket = secureConnections[key];
      const serverResponse = socket._httpMessage;
      if (serverResponse && !force) {
        if (!serverResponse.headersSent) {
          serverResponse.setHeader("connection", "close");
        }
      } else {
        secureCounter++;
        destroy(socket);
      }
    }
    debug("Secure Connections destroyed : " + secureCounter);
    debug("Secure Connection Counter    : " + secureConnectionCounter);
  }
  server.on("request", (req, res) => {
    req.socket._isIdle = false;
    if (isShuttingDown && !res.headersSent) {
      res.setHeader("connection", "close");
    }
    res.on("finish", () => {
      req.socket._isIdle = true;
      destroy(req.socket);
    });
  });
  server.on("connection", (socket) => {
    if (isShuttingDown) {
      socket.destroy();
    } else {
      const id = connectionCounter++;
      socket._isIdle = true;
      socket._connectionId = id;
      connections[id] = socket;
      socket.once("close", () => {
        delete connections[socket._connectionId];
      });
    }
  });
  server.on("secureConnection", (socket) => {
    if (isShuttingDown) {
      socket.destroy();
    } else {
      const id = secureConnectionCounter++;
      socket._isIdle = true;
      socket._connectionId = id;
      secureConnections[id] = socket;
      socket.once("close", () => {
        delete secureConnections[socket._connectionId];
      });
    }
  });
  process.on("close", () => {
    debug("closed");
  });
  function shutdown(sig) {
    function cleanupHttp() {
      destroyAllConnections();
      debug("Close http server");
      return new Promise((resolve, reject) => {
        server.close((err) => {
          if (err) {
            return reject(err);
          }
          return resolve(true);
        });
      });
    }
    debug("shutdown signal - " + sig);
    if (options.development) {
      debug("DEV-Mode - immediate forceful shutdown");
      return process.exit(0);
    }
    function finalHandler() {
      if (!finalRun) {
        finalRun = true;
        if (options.finally && isFunction(options.finally)) {
          debug("executing finally()");
          options.finally();
        }
      }
      return Promise.resolve();
    }
    function waitForReadyToShutDown(totalNumInterval) {
      debug(`waitForReadyToShutDown... ${totalNumInterval}`);
      if (totalNumInterval === 0) {
        debug(
          `Could not close connections in time (${options.timeout}ms), will forcefully shut down`
        );
        return Promise.resolve(true);
      }
      const allConnectionsClosed = Object.keys(connections).length === 0 && Object.keys(secureConnections).length === 0;
      if (allConnectionsClosed) {
        debug("All connections closed. Continue to shutting down");
        return Promise.resolve(false);
      }
      debug("Schedule the next waitForReadyToShutdown");
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(waitForReadyToShutDown(totalNumInterval - 1));
        }, 250);
      });
    }
    if (isShuttingDown) {
      return Promise.resolve();
    }
    debug("shutting down");
    return options.preShutdown(sig).then(() => {
      isShuttingDown = true;
      cleanupHttp();
    }).then(() => {
      const pollIterations = options.timeout ? Math.round(options.timeout / 250) : 0;
      return waitForReadyToShutDown(pollIterations);
    }).then((force) => {
      debug("Do onShutdown now");
      if (force) {
        destroyAllConnections(force);
      }
      return options.onShutdown(sig);
    }).then(finalHandler).catch((error) => {
      const errString = typeof error === "string" ? error : JSON.stringify(error);
      debug(errString);
      failed = true;
      throw errString;
    });
  }
  function shutdownManual() {
    return shutdown("manual");
  }
  return shutdownManual;
}

function getGracefulShutdownConfig() {
  return {
    disabled: !!process.env.NITRO_SHUTDOWN_DISABLED,
    signals: (process.env.NITRO_SHUTDOWN_SIGNALS || "SIGTERM SIGINT").split(" ").map((s) => s.trim()),
    timeout: Number.parseInt(process.env.NITRO_SHUTDOWN_TIMEOUT || "", 10) || 3e4,
    forceExit: !process.env.NITRO_SHUTDOWN_NO_FORCE_EXIT
  };
}
function setupGracefulShutdown(listener, nitroApp) {
  const shutdownConfig = getGracefulShutdownConfig();
  if (shutdownConfig.disabled) {
    return;
  }
  GracefulShutdown(listener, {
    signals: shutdownConfig.signals.join(" "),
    timeout: shutdownConfig.timeout,
    forceExit: shutdownConfig.forceExit,
    onShutdown: async () => {
      await new Promise((resolve) => {
        const timeout = setTimeout(() => {
          console.warn("Graceful shutdown timeout, force exiting...");
          resolve();
        }, shutdownConfig.timeout);
        nitroApp.hooks.callHook("close").catch((error) => {
          console.error(error);
        }).finally(() => {
          clearTimeout(timeout);
          resolve();
        });
      });
    }
  });
}

const cert = process.env.NITRO_SSL_CERT;
const key = process.env.NITRO_SSL_KEY;
const nitroApp = useNitroApp();
const server = cert && key ? new Server({ key, cert }, toNodeListener(nitroApp.h3App)) : new Server$1(toNodeListener(nitroApp.h3App));
const port = destr(process.env.NITRO_PORT || process.env.PORT) || 3e3;
const host = process.env.NITRO_HOST || process.env.HOST;
const path = process.env.NITRO_UNIX_SOCKET;
const listener = server.listen(path ? { path } : { port, host }, (err) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  const protocol = cert && key ? "https" : "http";
  const addressInfo = listener.address();
  if (typeof addressInfo === "string") {
    console.log(`Listening on unix socket ${addressInfo}`);
    return;
  }
  const baseURL = (useRuntimeConfig().app.baseURL || "").replace(/\/$/, "");
  const url = `${protocol}://${addressInfo.family === "IPv6" ? `[${addressInfo.address}]` : addressInfo.address}:${addressInfo.port}${baseURL}`;
  console.log(`Listening on ${url}`);
});
trapUnhandledNodeErrors();
setupGracefulShutdown(listener, nitroApp);
{
  startScheduleRunner();
}
const nodeServer = {};

export { $fetch$1 as $, getQuery as A, destr as B, getRouteRules as C, getResponseStatusText as D, getResponseStatus as E, useNitroApp as F, serialize$1 as G, defu as H, hasProtocol as I, isScriptProtocol as J, joinURL as K, klona as L, isEqual as M, parseQuery as N, hash$1 as O, withQuery as P, sanitizeStatusCode as Q, parseURL as R, decodePath as S, appendResponseHeader as T, UserModelImport as U, defuFn as V, withTrailingSlash as W, withoutTrailingSlash as X, withLeadingSlash as Y, baseURL as Z, createHooks as _, defineEventHandler as a, encodeParam as a0, nodeServer as a1, createError$1 as b, connectDB as c, defineTask as d, setHeader as e, setUserSession as f, sendWelcomeEmail as g, buildDailyBriefing as h, requirePaidUser as i, readBody as j, getHeader as k, runTask as l, generateLeadDraft as m, narrateBriefing as n, getRouterParam as o, setResponseHeader as p, requireUserSession as q, readValidatedBody as r, schemaImport as s, generateSocialPosts as t, readRawBody as u, buildAssetsURL as v, publicAssetsURL as w, useRuntimeConfig as x, encodePath as y, defineRenderHandler as z };
//# sourceMappingURL=nitro.mjs.map
