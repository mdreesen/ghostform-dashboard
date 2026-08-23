import process from 'node:process';globalThis._importMeta_={url:import.meta.url,env:process.env};import { tmpdir } from 'node:os';
import { defineEventHandler, handleCacheHeaders, splitCookiesString, createEvent, fetchWithEvent, isEvent, eventHandler, setHeaders, createError, sendRedirect, proxyRequest, getRequestHeader, setResponseHeaders, setResponseStatus, send, getRequestHeaders, setResponseHeader, appendResponseHeader, getRequestURL, getResponseHeader, removeResponseHeader, getResponseStatus, useSession, getQuery as getQuery$1, readBody, lazyEventHandler, useBase, createApp, createRouter as createRouter$1, toNodeListener, getRouterParam, setHeader, readValidatedBody, getHeader, readRawBody, getResponseStatusText } from 'file:///Users/mdreesen/projects/ghostform-dashboard/node_modules/h3/dist/index.mjs';
import { Server } from 'node:http';
import { resolve, dirname, join } from 'node:path';
import crypto$1, { timingSafeEqual, createHmac } from 'node:crypto';
import { parentPort, threadId } from 'node:worker_threads';
import { escapeHtml } from 'file:///Users/mdreesen/projects/ghostform-dashboard/node_modules/@vue/shared/dist/shared.cjs.js';
import { Resend } from 'file:///Users/mdreesen/projects/ghostform-dashboard/node_modules/resend/dist/index.mjs';
import viteNodeEntry_mjs from 'file:///Users/mdreesen/projects/ghostform-dashboard/node_modules/@nuxt/vite-builder/dist/vite-node-entry.mjs';
import { viteNodeFetch } from 'file:///Users/mdreesen/projects/ghostform-dashboard/node_modules/@nuxt/vite-builder/dist/vite-node.mjs';
import Stripe from 'file:///Users/mdreesen/projects/ghostform-dashboard/node_modules/stripe/esm/stripe.esm.node.js';
import { z } from 'file:///Users/mdreesen/projects/ghostform-dashboard/node_modules/zod/index.js';
import { nanoid } from 'file:///Users/mdreesen/projects/ghostform-dashboard/node_modules/nanoid/index.js';
import bcrypt from 'file:///Users/mdreesen/projects/ghostform-dashboard/node_modules/bcrypt/bcrypt.js';
import { Cron } from 'file:///Users/mdreesen/projects/ghostform-dashboard/node_modules/croner/dist/croner.js';
import mongoose, { Schema } from 'file:///Users/mdreesen/projects/ghostform-dashboard/node_modules/mongoose/index.js';
import OpenAI from 'file:///Users/mdreesen/projects/ghostform-dashboard/node_modules/openai/index.mjs';
import { createRenderer, getRequestDependencies, getPreloadLinks, getPrefetchLinks } from 'file:///Users/mdreesen/projects/ghostform-dashboard/node_modules/vue-bundle-renderer/dist/runtime.mjs';
import { parseURL, withoutBase, joinURL, getQuery, withQuery, withTrailingSlash, decodePath, withLeadingSlash, withoutTrailingSlash, joinRelativeURL, parseQuery, parsePath, encodePath } from 'file:///Users/mdreesen/projects/ghostform-dashboard/node_modules/ufo/dist/index.mjs';
import destr, { destr as destr$1 } from 'file:///Users/mdreesen/projects/ghostform-dashboard/node_modules/destr/dist/index.mjs';
import { createHooks as createHooks$1 } from 'file:///Users/mdreesen/projects/ghostform-dashboard/node_modules/nitropack/node_modules/hookable/dist/index.mjs';
import { createFetch, Headers as Headers$1 } from 'file:///Users/mdreesen/projects/ghostform-dashboard/node_modules/ofetch/dist/node.mjs';
import { fetchNodeRequestHandler, callNodeRequestHandler } from 'file:///Users/mdreesen/projects/ghostform-dashboard/node_modules/node-mock-http/dist/index.mjs';
import { createStorage, defineDriver, prefixStorage } from 'file:///Users/mdreesen/projects/ghostform-dashboard/node_modules/unstorage/dist/index.mjs';
import unstorage_47drivers_47fs from 'file:///Users/mdreesen/projects/ghostform-dashboard/node_modules/unstorage/drivers/fs.mjs';
import fsDriver from 'file:///Users/mdreesen/projects/ghostform-dashboard/node_modules/unstorage/drivers/fs-lite.mjs';
import lruCache from 'file:///Users/mdreesen/projects/ghostform-dashboard/node_modules/unstorage/drivers/lru-cache.mjs';
import { digest, hash as hash$1 } from 'file:///Users/mdreesen/projects/ghostform-dashboard/node_modules/ohash/dist/index.mjs';
import { klona } from 'file:///Users/mdreesen/projects/ghostform-dashboard/node_modules/klona/dist/index.mjs';
import { snakeCase } from 'file:///Users/mdreesen/projects/ghostform-dashboard/node_modules/scule/dist/index.mjs';
import { getContext } from 'file:///Users/mdreesen/projects/ghostform-dashboard/node_modules/nitropack/node_modules/unctx/dist/index.mjs';
import { toRouteMatcher, createRouter } from 'file:///Users/mdreesen/projects/ghostform-dashboard/node_modules/radix3/dist/index.mjs';
import { readFile } from 'node:fs/promises';
import consola, { consola as consola$1 } from 'file:///Users/mdreesen/projects/ghostform-dashboard/node_modules/consola/dist/index.mjs';
import { ErrorParser } from 'file:///Users/mdreesen/projects/ghostform-dashboard/node_modules/youch-core/build/index.js';
import { Youch } from 'file:///Users/mdreesen/projects/ghostform-dashboard/node_modules/youch/build/index.js';
import { SourceMapConsumer } from 'file:///Users/mdreesen/projects/ghostform-dashboard/node_modules/source-map/source-map.js';
import { AsyncLocalStorage } from 'node:async_hooks';
import { stringify, uneval } from 'file:///Users/mdreesen/projects/ghostform-dashboard/node_modules/devalue/index.js';
import { getContext as getContext$1 } from 'file:///Users/mdreesen/projects/ghostform-dashboard/node_modules/@nuxt/nitro-server/node_modules/unctx/dist/index.mjs';
import { captureRawStackTrace, parseRawStackTrace } from 'file:///Users/mdreesen/projects/ghostform-dashboard/node_modules/errx/dist/index.mjs';
import { isVNode, isRef, toValue } from 'file:///Users/mdreesen/projects/ghostform-dashboard/node_modules/vue/index.mjs';
import _wH6JrtIxmaSoA8lCPWFnE9z4lQeXW6H5z3l5aymEQw from 'file:///Users/mdreesen/projects/ghostform-dashboard/node_modules/@nuxt/vite-builder/dist/fix-stacktrace.mjs';
import { promises } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname as dirname$1, resolve as resolve$1, isAbsolute } from 'file:///Users/mdreesen/projects/ghostform-dashboard/node_modules/pathe/dist/index.mjs';
import { createHooks } from 'file:///Users/mdreesen/projects/ghostform-dashboard/node_modules/hookable/dist/index.mjs';
import { getIcons } from 'file:///Users/mdreesen/projects/ghostform-dashboard/node_modules/@iconify/utils/lib/index.js';
import { collections } from 'file:///Users/mdreesen/projects/ghostform-dashboard/.nuxt/nuxt-icon-server-bundle.mjs';
import { createHead as createHead$1, propsToString, renderSSRHead } from 'file:///Users/mdreesen/projects/ghostform-dashboard/node_modules/unhead/dist/server.mjs';
import { renderToString } from 'file:///Users/mdreesen/projects/ghostform-dashboard/node_modules/vue/server-renderer/index.mjs';
import { walkResolver } from 'file:///Users/mdreesen/projects/ghostform-dashboard/node_modules/unhead/dist/utils.mjs';
import { ipxFSStorage, ipxHttpStorage, createIPX, createIPXH3Handler } from 'file:///Users/mdreesen/projects/ghostform-dashboard/node_modules/ipx/dist/index.mjs';

const serverAssets = [{"baseName":"server","dir":"/Users/mdreesen/projects/ghostform-dashboard/server/assets"}];

const assets$1 = createStorage();

for (const asset of serverAssets) {
  assets$1.mount(asset.baseName, unstorage_47drivers_47fs({ base: asset.dir, ignore: (asset?.ignore || []) }));
}

// @ts-check


/**
 * @param {string} item
 */
function normalizeFsKey (item) {
  const safe = item.replace(/[^\w.-]/g, '_');
  const prefix = safe.slice(0, 20);
  const hash = crypto$1.createHash('sha256').update(item).digest('hex');
  return `${prefix}-${hash}`
}

const _47Users_47mdreesen_47projects_47ghostform_45dashboard_47node_modules_47_64nuxt_47nitro_45server_47dist_47runtime_47utils_47cache_45driver_46js = defineDriver(
  /**
   * @param {{ base?: string }} opts
   */
  (opts) => {
    const fs = fsDriver({ base: opts.base });
    const lru = lruCache({ max: 1000 });

    return {
      ...fs, // fall back to file system - only the bottom three methods are used in renderer
      async setItem (key, value, opts) {
        await Promise.all([
          fs.setItem?.(normalizeFsKey(key), value, opts),
          lru.setItem?.(key, value, opts),
        ]);
      },
      async hasItem (key, opts) {
        return await lru.hasItem(key, opts) || await fs.hasItem(normalizeFsKey(key), opts)
      },
      async getItem (key, opts) {
        return await lru.getItem(key, opts) || await fs.getItem(normalizeFsKey(key), opts)
      },
    }
  },
);

const storage = createStorage({});

storage.mount('/assets', assets$1);

storage.mount('root', unstorage_47drivers_47fs({"driver":"fs","readOnly":true,"base":"/Users/mdreesen/projects/ghostform-dashboard","watchOptions":{"ignored":[null]}}));
storage.mount('src', unstorage_47drivers_47fs({"driver":"fs","readOnly":true,"base":"/Users/mdreesen/projects/ghostform-dashboard/server","watchOptions":{"ignored":[null]}}));
storage.mount('cache:nuxt:payload', _47Users_47mdreesen_47projects_47ghostform_45dashboard_47node_modules_47_64nuxt_47nitro_45server_47dist_47runtime_47utils_47cache_45driver_46js({"driver":"/Users/mdreesen/projects/ghostform-dashboard/node_modules/@nuxt/nitro-server/dist/runtime/utils/cache-driver.js","base":"/Users/mdreesen/projects/ghostform-dashboard/.nuxt/cache/nuxt/payload"}));
storage.mount('build', unstorage_47drivers_47fs({"driver":"fs","readOnly":false,"base":"/Users/mdreesen/projects/ghostform-dashboard/.nuxt"}));
storage.mount('cache', unstorage_47drivers_47fs({"driver":"fs","readOnly":false,"base":"/Users/mdreesen/projects/ghostform-dashboard/.nuxt/cache"}));
storage.mount('data', unstorage_47drivers_47fs({"driver":"fs","base":"/Users/mdreesen/projects/ghostform-dashboard/.data/kv"}));

function useStorage(base = "") {
  return base ? prefixStorage(storage, base) : storage;
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
    "buildId": "dev",
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
      "/_fonts/**": {
        "headers": {
          "cache-control": "public, max-age=31536000, immutable"
        },
        "cache": {
          "maxAge": 31536000
        }
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
      "dir": [
        "/Users/mdreesen/projects/ghostform-dashboard/public"
      ]
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
  createRouter({ routes: config.nitro.routeRules })
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
            throw createError({ statusCode: 400 });
          }
          targetPath = withoutBase(targetPath, strpBase);
        } else if (targetPath.startsWith("//")) {
          targetPath = targetPath.replace(/^\/+/, "/");
        }
        target = joinURL(target.slice(0, -3), targetPath);
      } else if (event.path.includes("?")) {
        const query = getQuery(event.path);
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
            throw createError({ statusCode: 400 });
          }
          targetPath = withoutBase(targetPath, strpBase);
        } else if (targetPath.startsWith("//")) {
          targetPath = targetPath.replace(/^\/+/, "/");
        }
        target = joinURL(target.slice(0, -3), targetPath);
      } else if (event.path.includes("?")) {
        const query = getQuery(event.path);
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

const iframeStorageBridge = (nonce) => `
(function () {
  const NONCE = ${JSON.stringify(nonce)};
  const memoryStore = Object.create(null);

  const post = (type, payload) => {
    window.parent.postMessage({ type, nonce: NONCE, ...payload }, '*');
  };

  const isValid = (data) => data && data.nonce === NONCE;

  const mockStorage = {
    getItem(key) {
      return Object.hasOwn(memoryStore, key)
        ? memoryStore[key]
        : null;
    },
    setItem(key, value) {
      const v = String(value);
      memoryStore[key] = v;
      post('storage-set', { key, value: v });
    },
    removeItem(key) {
      delete memoryStore[key];
      post('storage-remove', { key });
    },
    clear() {
      for (const key of Object.keys(memoryStore))
        delete memoryStore[key];
      post('storage-clear', {});
    },
    key(index) {
      const keys = Object.keys(memoryStore);
      return keys[index] ?? null;
    },
    get length() {
      return Object.keys(memoryStore).length;
    }
  };

  const defineLocalStorage = () => {
    try {
      Object.defineProperty(window, 'localStorage', {
        value: mockStorage,
        writable: false,
        configurable: true
      });
    } catch {
      window.localStorage = mockStorage;
    }
  };

  defineLocalStorage();

  window.addEventListener('message', (event) => {
    const data = event.data;
    if (!isValid(data) || data.type !== 'storage-sync-data') return;

    const incoming = data.data || {};
    for (const key of Object.keys(incoming))
      memoryStore[key] = incoming[key];

    if (typeof window.initTheme === 'function')
      window.initTheme();
    window.dispatchEvent(new Event('storage-ready'));
  });

  // Clipboard API is unavailable in data: URL iframe, so we use postMessage
  document.addEventListener('DOMContentLoaded', function() {
    window.copyErrorMessage = function(button) {
      post('clipboard-copy', { text: button.dataset.errorText });
      button.classList.add('copied');
      setTimeout(function() { button.classList.remove('copied'); }, 2000);
    };
  });

  post('storage-sync-request', {});
})();
`;
const parentStorageBridge = (nonce) => `
(function () {
  const host = document.querySelector('nuxt-error-overlay');
  if (!host) return;

  const NONCE = ${JSON.stringify(nonce)};
  const isValid = (data) => data && data.nonce === NONCE;

  // Handle clipboard copy from iframe
  window.addEventListener('message', function(e) {
    if (isValid(e.data) && e.data.type === 'clipboard-copy') {
      navigator.clipboard.writeText(e.data.text).catch(function() {});
    }
  });

  const collectLocalStorage = () => {
    const all = {};
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (k != null) all[k] = localStorage.getItem(k);
    }
    return all;
  };

  const attachWhenReady = () => {
    const root = host.shadowRoot;
    if (!root)
      return false;
    const iframe = root.getElementById('frame');
    if (!iframe || !iframe.contentWindow)
      return false;

    const handlers = {
      'storage-set': (d) => localStorage.setItem(d.key, d.value),
      'storage-remove': (d) => localStorage.removeItem(d.key),
      'storage-clear': () => localStorage.clear(),
      'storage-sync-request': () => {
        iframe.contentWindow.postMessage({
          type: 'storage-sync-data',
          data: collectLocalStorage(),
          nonce: NONCE
        }, '*');
      }
    };

    window.addEventListener('message', (event) => {
      const data = event.data;
      if (!isValid(data)) return;
      const fn = handlers[data.type];
      if (fn) fn(data);
    });

    return true;
  };

  if (attachWhenReady())
    return;

  const obs = new MutationObserver(() => {
    if (attachWhenReady())
      obs.disconnect();
  });

  obs.observe(host, { childList: true, subtree: true });
})();
`;
const errorCSS = `
:host {
  --preview-width: 240px;
  --preview-height: 180px;
  --base-width: 1200px;
  --base-height: 900px;
  --z-base: 999999998;
  --error-pip-left: auto;
  --error-pip-top: auto;
  --error-pip-right: 5px;
  --error-pip-bottom: 5px;
  --error-pip-origin: bottom right;
  --app-preview-left: auto;
  --app-preview-top: auto;
  --app-preview-right: 5px;
  --app-preview-bottom: 5px;
  all: initial;
  display: contents;
}
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}
#frame {
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  border: none;
  z-index: var(--z-base);
}
#frame[inert] {
  left: var(--error-pip-left);
  top: var(--error-pip-top);
  right: var(--error-pip-right);
  bottom: var(--error-pip-bottom);
  width: var(--base-width);
  height: var(--base-height);
  transform: scale(calc(240 / 1200));
  transform-origin: var(--error-pip-origin);
  overflow: hidden;
  border-radius: calc(1200 * 8px / 240);
}
#preview {
  position: fixed;
  left: var(--app-preview-left);
  top: var(--app-preview-top);
  right: var(--app-preview-right);
  bottom: var(--app-preview-bottom);
  width: var(--preview-width);
  height: var(--preview-height);
  overflow: hidden;
  border-radius: 6px;
  pointer-events: none;
  z-index: var(--z-base);
  background: white;
  display: none;
}
#preview iframe {
  transform-origin: var(--error-pip-origin);
}
#frame:not([inert]) + #preview {
  display: block;
}
#toggle {
  position: fixed;
  left: var(--app-preview-left);
  top: var(--app-preview-top);
  right: calc(var(--app-preview-right) - 3px);
  bottom: calc(var(--app-preview-bottom) - 3px);
  width: var(--preview-width);
  height: var(--preview-height);
  background: none;
  border: 3px solid #00DC82;
  border-radius: 8px;
  cursor: pointer;
  opacity: 0.8;
  transition: opacity 0.2s, box-shadow 0.2s;
  z-index: calc(var(--z-base) + 1);
  display: flex;
  align-items: center;
  justify-content: center;
}
#toggle:hover,
#toggle:focus {
  opacity: 1;
  box-shadow: 0 0 20px rgba(0, 220, 130, 0.6);
}
#toggle:focus-visible {
  outline: 3px solid #00DC82;
  outline-offset: 0;
  box-shadow: 0 0 24px rgba(0, 220, 130, 0.8);
}
#frame[inert] ~ #toggle {
  left: var(--error-pip-left);
  top: var(--error-pip-top);
  right: calc(var(--error-pip-right) - 3px);
  bottom: calc(var(--error-pip-bottom) - 3px);
  cursor: grab;
}
:host(.dragging) #frame[inert] ~ #toggle {
  cursor: grabbing;
}
#frame:not([inert]) ~ #toggle,
#frame:not([inert]) + #preview {
  cursor: grab;
}
:host(.dragging-preview) #frame:not([inert]) ~ #toggle,
:host(.dragging-preview) #frame:not([inert]) + #preview {
  cursor: grabbing;
}

#pip-close {
  position: absolute;
  top: 6px;
  right: 6px;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  border: none;
  background: rgba(0, 0, 0, 0.75);
  color: #fff;
  font-size: 16px;
  line-height: 1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  pointer-events: auto;
}
#pip-close:focus-visible {
  outline: 2px solid #00DC82;
  outline-offset: 2px;
}

#pip-restore {
  position: fixed;
  right: 16px;
  bottom: 16px;
  padding: 8px 14px;
  border-radius: 999px;
  border: 2px solid #00DC82;
  background: #111;
  color: #fff;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif;
  font-size: 14px;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  z-index: calc(var(--z-base) + 2);
  cursor: grab;
}
#pip-restore:focus-visible {
  outline: 2px solid #00DC82;
  outline-offset: 2px;
}
:host(.dragging-restore) #pip-restore {
  cursor: grabbing;
}

#frame[hidden],
#toggle[hidden],
#preview[hidden],
#pip-restore[hidden],
#pip-close[hidden] {
  display: none !important;
}

@media (prefers-reduced-motion: reduce) {
  #toggle {
    transition: none;
  }
}
`;
function webComponentScript(base64HTML, startMinimized) {
	return `
(function () {
  try {
    // =========================
    // Host + Shadow
    // =========================
    const host = document.querySelector('nuxt-error-overlay');
    if (!host)
      return;
    const shadow = host.attachShadow({ mode: 'open' });

    // =========================
    // DOM helpers
    // =========================
    const el = (tag) => document.createElement(tag);
    const on = (node, type, fn, opts) => node.addEventListener(type, fn, opts);
    const hide = (node, v) => node.toggleAttribute('hidden', !!v);
    const setVar = (name, value) => host.style.setProperty(name, value);
    const unsetVar = (name) => host.style.removeProperty(name);

    // =========================
    // Create DOM
    // =========================
    const style = el('style');
    style.textContent = ${JSON.stringify(errorCSS)};

    const iframe = el('iframe');
    iframe.id = 'frame';
    iframe.src = 'data:text/html;base64,${base64HTML}';
    iframe.title = 'Detailed error stack trace';
    iframe.setAttribute('sandbox', 'allow-scripts allow-same-origin allow-top-navigation-by-user-activation');

    const preview = el('div');
    preview.id = 'preview';

    const toggle = el('div');
    toggle.id = 'toggle';
    toggle.setAttribute('aria-expanded', 'true');
    toggle.setAttribute('role', 'button');
    toggle.setAttribute('tabindex', '0');
    toggle.innerHTML = '<span class="sr-only">Toggle detailed error view</span>';

    const liveRegion = el('div');
    liveRegion.setAttribute('role', 'status');
    liveRegion.setAttribute('aria-live', 'polite');
    liveRegion.className = 'sr-only';

    const pipCloseButton = el('button');
    pipCloseButton.id = 'pip-close';
    pipCloseButton.setAttribute('type', 'button');
    pipCloseButton.setAttribute('aria-label', 'Hide error preview overlay');
    pipCloseButton.innerHTML = '&times;';
    pipCloseButton.hidden = true;
    toggle.appendChild(pipCloseButton);

    const pipRestoreButton = el('button');
    pipRestoreButton.id = 'pip-restore';
    pipRestoreButton.setAttribute('type', 'button');
    pipRestoreButton.setAttribute('aria-label', 'Show error overlay');
    pipRestoreButton.innerHTML = '<span aria-hidden="true">⟲</span><span>Show error overlay</span>';
    pipRestoreButton.hidden = true;

    // Order matters: #frame + #preview adjacency
    shadow.appendChild(style);
    shadow.appendChild(liveRegion);
    shadow.appendChild(iframe);
    shadow.appendChild(preview);
    shadow.appendChild(toggle);
    shadow.appendChild(pipRestoreButton);

    // =========================
    // Constants / keys
    // =========================
    const POS_KEYS = {
      position: 'nuxt-error-overlay:position',
      hiddenPretty: 'nuxt-error-overlay:error-pip:hidden',
      hiddenPreview: 'nuxt-error-overlay:app-preview:hidden'
    };

    const CSS_VARS = {
      pip: {
        left: '--error-pip-left',
        top: '--error-pip-top',
        right: '--error-pip-right',
        bottom: '--error-pip-bottom'
      },
      preview: {
        left: '--app-preview-left',
        top: '--app-preview-top',
        right: '--app-preview-right',
        bottom: '--app-preview-bottom'
      }
    };

    const MIN_GAP = 5;
    const DRAG_THRESHOLD = 2;

    // =========================
    // Local storage safe access + state
    // =========================
    let storageReady = true;
    let isPrettyHidden = false;
    let isPreviewHidden = false;

    const safeGet = (k) => {
      try {
        return localStorage.getItem(k);
      } catch {
        return null;
      }
    };

    const safeSet = (k, v) => {
      if (!storageReady) 
        return;
      try {
        localStorage.setItem(k, v);
      } catch {}
    };

    // =========================
    // Sizing helpers
    // =========================
    const vvSize = () => {
      const v = window.visualViewport;
      return v ? { w: v.width, h: v.height } : { w: window.innerWidth, h: window.innerHeight };
    };

    const previewSize = () => {
      const styles = getComputedStyle(host);
      const w = parseFloat(styles.getPropertyValue('--preview-width')) || 240;
      const h = parseFloat(styles.getPropertyValue('--preview-height')) || 180;
      return { w, h };
    };

    const sizeForTarget = (target) => {
      if (!target)
        return previewSize();
      const rect = target.getBoundingClientRect();
      if (rect.width && rect.height)
        return { w: rect.width, h: rect.height };
      return previewSize();
    };

    // =========================
    // Dock model + offset/alignment calculations
    // =========================
    const dock = { edge: null, offset: null, align: null, gap: null };

    const maxOffsetFor = (edge, size) => {
      const vv = vvSize();
      if (edge === 'left' || edge === 'right')
        return Math.max(MIN_GAP, vv.h - size.h - MIN_GAP);
      return Math.max(MIN_GAP, vv.w - size.w - MIN_GAP);
    };

    const clampOffset = (edge, value, size) => {
      const max = maxOffsetFor(edge, size);
      return Math.min(Math.max(value, MIN_GAP), max);
    };

    const updateDockAlignment = (size) => {
      if (!dock.edge || dock.offset == null)
        return;
      const max = maxOffsetFor(dock.edge, size);
      if (dock.offset <= max / 2) {
        dock.align = 'start';
        dock.gap = dock.offset;
      } else {
        dock.align = 'end';
        dock.gap = Math.max(0, max - dock.offset);
      }
    };

    const appliedOffsetFor = (size) => {
      if (!dock.edge || dock.offset == null)
        return null;
      const max = maxOffsetFor(dock.edge, size);

      if (dock.align === 'end' && typeof dock.gap === 'number') {
        return clampOffset(dock.edge, max - dock.gap, size);
      }
      if (dock.align === 'start' && typeof dock.gap === 'number') {
        return clampOffset(dock.edge, dock.gap, size);
      }
      return clampOffset(dock.edge, dock.offset, size);
    };

    const nearestEdgeAt = (x, y) => {
      const { w, h } = vvSize();
      const d = { left: x, right: w - x, top: y, bottom: h - y };
      return Object.keys(d).reduce((a, b) => (d[a] < d[b] ? a : b));
    };

    const cornerDefaultDock = () => {
      const vv = vvSize();
      const size = previewSize();
      const offset = Math.max(MIN_GAP, vv.w - size.w - MIN_GAP);
      return { edge: 'bottom', offset };
    };

    const currentTransformOrigin = () => {
      if (!dock.edge) return null;
      if (dock.edge === 'left' || dock.edge === 'top')
        return 'top left';
      if (dock.edge === 'right')
        return 'top right';
      return 'bottom left';
    };

    // =========================
    // Persist / load dock
    // =========================
    const loadDock = () => {
      const raw = safeGet(POS_KEYS.position);
      if (!raw)
        return;
      try {
        const parsed = JSON.parse(raw);
        const { edge, offset, align, gap } = parsed || {};
        if (!['left', 'right', 'top', 'bottom'].includes(edge))
          return;
        if (typeof offset !== 'number')
          return;

        dock.edge = edge;
        dock.offset = clampOffset(edge, offset, previewSize());
        dock.align = align === 'start' || align === 'end' ? align : null;
        dock.gap = typeof gap === 'number' ? gap : null;

        if (!dock.align || dock.gap == null)
          updateDockAlignment(previewSize());
      } catch {}
    };

    const persistDock = () => {
      if (!dock.edge || dock.offset == null)
        return; 
      safeSet(POS_KEYS.position, JSON.stringify({
        edge: dock.edge,
        offset: dock.offset,
        align: dock.align,
        gap: dock.gap
      }));
    };

    // =========================
    // Apply dock
    // =========================
    const dockToVars = (vars) => ({
      set: (side, v) => host.style.setProperty(vars[side], v),
      clear: (side) => host.style.removeProperty(vars[side])
    });

    const dockToEl = (node) => ({
      set: (side, v) => { node.style[side] = v; },
      clear: (side) => { node.style[side] = ''; }
    });

    const applyDock = (target, size, opts) => {
      if (!dock.edge || dock.offset == null) {
        target.clear('left');
        target.clear('top');
        target.clear('right');
        target.clear('bottom');
        return;
      }

      target.set('left', 'auto');
      target.set('top', 'auto');
      target.set('right', 'auto');
      target.set('bottom', 'auto');

      const applied = appliedOffsetFor(size);

      if (dock.edge === 'left') {
        target.set('left', MIN_GAP + 'px');
        target.set('top', applied + 'px');
      } else if (dock.edge === 'right') {
        target.set('right', MIN_GAP + 'px');
        target.set('top', applied + 'px');
      } else if (dock.edge === 'top') {
        target.set('top', MIN_GAP + 'px');
        target.set('left', applied + 'px');
      } else {
        target.set('bottom', MIN_GAP + 'px');
        target.set('left', applied + 'px');
      }

      if (!opts || opts.persist !== false)
        persistDock();
    };

    const applyDockAll = (opts) => {
      applyDock(dockToVars(CSS_VARS.pip), previewSize(), opts);
      applyDock(dockToVars(CSS_VARS.preview), previewSize(), opts);
      applyDock(dockToEl(pipRestoreButton), sizeForTarget(pipRestoreButton), opts);
    };

    const repaintToDock = () => {
      if (!dock.edge || dock.offset == null)
        return;
      const origin = currentTransformOrigin();
      if (origin)
        setVar('--error-pip-origin', origin);
      else 
        unsetVar('--error-pip-origin');
      applyDockAll({ persist: false });
    };

    // =========================
    // Hidden state + UI
    // =========================
    const loadHidden = () => {
      const rawPretty = safeGet(POS_KEYS.hiddenPretty);
      if (rawPretty != null)
        isPrettyHidden = rawPretty === '1' || rawPretty === 'true';
      const rawPreview = safeGet(POS_KEYS.hiddenPreview);
      if (rawPreview != null)
        isPreviewHidden = rawPreview === '1' || rawPreview === 'true';
    };

    const setPrettyHidden = (v) => {
      isPrettyHidden = !!v;
      safeSet(POS_KEYS.hiddenPretty, isPrettyHidden ? '1' : '0');
      updateUI();
    };

    const setPreviewHidden = (v) => {
      isPreviewHidden = !!v;
      safeSet(POS_KEYS.hiddenPreview, isPreviewHidden ? '1' : '0');
      updateUI();
    };

    const isMinimized = () => iframe.hasAttribute('inert');

    const setMinimized = (v) => {
      if (v) {
        iframe.setAttribute('inert', '');
        toggle.setAttribute('aria-expanded', 'false');
      } else {
        iframe.removeAttribute('inert');
        toggle.setAttribute('aria-expanded', 'true');
      }
    };

    const setRestoreLabel = (kind) => {
      if (kind === 'pretty') {
        pipRestoreButton.innerHTML = '<span aria-hidden="true">⟲</span><span>Show error overlay</span>';
        pipRestoreButton.setAttribute('aria-label', 'Show error overlay');
      } else {
        pipRestoreButton.innerHTML = '<span aria-hidden="true">⟲</span><span>Show error page</span>';
        pipRestoreButton.setAttribute('aria-label', 'Show error page');
      }
    };

    const updateUI = () => {
      const minimized = isMinimized();
      const showPiP = minimized && !isPrettyHidden;
      const showPreview = !minimized && !isPreviewHidden;
      const pipHiddenByUser = minimized && isPrettyHidden;
      const previewHiddenByUser = !minimized && isPreviewHidden;
      const showToggle = minimized ? showPiP : showPreview;
      const showRestore = pipHiddenByUser || previewHiddenByUser;

      hide(iframe, pipHiddenByUser);
      hide(preview, !showPreview);
      hide(toggle, !showToggle);
      hide(pipCloseButton, !showToggle);
      hide(pipRestoreButton, !showRestore);

      pipCloseButton.setAttribute('aria-label', minimized ? 'Hide error overlay' : 'Hide error page preview');

      if (pipHiddenByUser)
        setRestoreLabel('pretty');
      else if (previewHiddenByUser)
        setRestoreLabel('preview');

      host.classList.toggle('pip-hidden', isPrettyHidden);
      host.classList.toggle('preview-hidden', isPreviewHidden);
    };

    // =========================
    // Preview snapshot
    // =========================
    const updatePreview = () => {
      try {
        let previewIframe = preview.querySelector('iframe');
        if (!previewIframe) {
          previewIframe = el('iframe');
          previewIframe.style.cssText = 'width: 1200px; height: 900px; transform: scale(0.2); transform-origin: top left; border: none;';
          previewIframe.setAttribute('sandbox', 'allow-scripts allow-same-origin');
          preview.appendChild(previewIframe);
        }

        const doctype = document.doctype ? '<!DOCTYPE ' + document.doctype.name + '>' : '';
        const cleanedHTML = document.documentElement.outerHTML
          .replace(/<nuxt-error-overlay[^>]*>.*?<\\/nuxt-error-overlay>/gs, '')
          .replace(/<script[^>]*>.*?<\\/script>/gs, '');

        const iframeDoc = previewIframe.contentDocument || previewIframe.contentWindow.document;
        iframeDoc.open();
        iframeDoc.write(doctype + cleanedHTML);
        iframeDoc.close();
      } catch (err) {
        console.error('Failed to update preview:', err);
      }
    };

    // =========================
    // View toggling
    // =========================
    const toggleView = () => {
      if (isMinimized()) {
        updatePreview();
        setMinimized(false);
        liveRegion.textContent = 'Showing detailed error view';
        setTimeout(() => { 
          try { 
            iframe.contentWindow.focus();
          } catch {}
        }, 100);
      } else {
        setMinimized(true);
        liveRegion.textContent = 'Showing error page';
        repaintToDock();
        void iframe.offsetWidth;
      }
      updateUI();
    };

    // =========================
    // Dragging (unified, rAF throttled)
    // =========================
    let drag = null;
    let rafId = null;
    let suppressToggleClick = false;
    let suppressRestoreClick = false;

    const beginDrag = (e) => {
      if (drag) 
        return;

      if (!dock.edge || dock.offset == null) {
        const def = cornerDefaultDock();
        dock.edge = def.edge;
        dock.offset = def.offset;
        updateDockAlignment(previewSize());
      }

      const isRestoreTarget = e.currentTarget === pipRestoreButton;

      drag = {
        kind: isRestoreTarget ? 'restore' : (isMinimized() ? 'pip' : 'preview'),
        pointerId: e.pointerId,
        startX: e.clientX,
        startY: e.clientY,
        lastX: e.clientX,
        lastY: e.clientY,
        moved: false,
        target: e.currentTarget
      };

      drag.target.setPointerCapture(e.pointerId);

      if (drag.kind === 'restore')
        host.classList.add('dragging-restore');
      else 
        host.classList.add(drag.kind === 'pip' ? 'dragging' : 'dragging-preview');

      e.preventDefault();
    };

    const moveDrag = (e) => {
      if (!drag || drag.pointerId !== e.pointerId)
        return;

      drag.lastX = e.clientX;
      drag.lastY = e.clientY;
      
      const dx = drag.lastX - drag.startX;
      const dy = drag.lastY - drag.startY;

      if (!drag.moved && (Math.abs(dx) > DRAG_THRESHOLD || Math.abs(dy) > DRAG_THRESHOLD)) {
        drag.moved = true;
      }

      if (!drag.moved)
        return;
      if (rafId)
        return;

      rafId = requestAnimationFrame(() => {
        rafId = null;

        const edge = nearestEdgeAt(drag.lastX, drag.lastY);
        const size = sizeForTarget(drag.target);

        let offset;
        if (edge === 'left' || edge === 'right') {
          const top = drag.lastY - (size.h / 2);
          offset = clampOffset(edge, Math.round(top), size);
        } else {
          const left = drag.lastX - (size.w / 2);
          offset = clampOffset(edge, Math.round(left), size);
        }

        dock.edge = edge;
        dock.offset = offset;
        updateDockAlignment(size);

        const origin = currentTransformOrigin();
        setVar('--error-pip-origin', origin || 'bottom right');

        applyDockAll({ persist: false });
      });
    };

    const endDrag = (e) => {
      if (!drag || drag.pointerId !== e.pointerId)
        return;

      const endedKind = drag.kind;
      drag.target.releasePointerCapture(e.pointerId);

      if (endedKind === 'restore')
        host.classList.remove('dragging-restore');
      else 
        host.classList.remove(endedKind === 'pip' ? 'dragging' : 'dragging-preview');

      const didMove = drag.moved;
      drag = null;

      if (didMove) {
        persistDock();
        if (endedKind === 'restore')
          suppressRestoreClick = true;
        else 
          suppressToggleClick = true;
        e.preventDefault();
        e.stopPropagation();
      }
    };

    const bindDragTarget = (node) => {
      on(node, 'pointerdown', beginDrag);
      on(node, 'pointermove', moveDrag);
      on(node, 'pointerup', endDrag);
      on(node, 'pointercancel', endDrag);
    };

    bindDragTarget(toggle);
    bindDragTarget(pipRestoreButton);

    // =========================
    // Events (toggle / close / restore)
    // =========================
    on(toggle, 'click', (e) => {
      if (suppressToggleClick) {
        e.preventDefault();
        suppressToggleClick = false;
        return;
      }
      toggleView();
    });

    on(toggle, 'keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleView();
      }
    });

    on(pipCloseButton, 'click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (isMinimized())
        setPrettyHidden(true);
      else
        setPreviewHidden(true);
    });

    on(pipCloseButton, 'pointerdown', (e) => {
      e.stopPropagation();
    });

    on(pipRestoreButton, 'click', (e) => {
      if (suppressRestoreClick) {
        e.preventDefault();
        suppressRestoreClick = false;
        return;
      }
      e.preventDefault();
      e.stopPropagation();
      if (isMinimized()) 
        setPrettyHidden(false);
      else 
        setPreviewHidden(false);
    });

    // =========================
    // Lifecycle: load / sync / repaint
    // =========================
    const loadState = () => {
      loadDock();
      loadHidden();

      if (isPrettyHidden && !isMinimized())
        setMinimized(true);

      updateUI();
      repaintToDock();
    };

    loadState();

    on(window, 'storage-ready', () => {
      storageReady = true;
      loadState();
    });

    const onViewportChange = () => repaintToDock();

    on(window, 'resize', onViewportChange);

    if (window.visualViewport) {
      on(window.visualViewport, 'resize', onViewportChange);
      on(window.visualViewport, 'scroll', onViewportChange);
    }

    // initial preview
    setTimeout(updatePreview, 100);

    // initial minimized option
    if (${startMinimized}) {
      setMinimized(true);
      repaintToDock();
      void iframe.offsetWidth;
      updateUI();
    }
  } catch (err) {
    console.error('Failed to initialize Nuxt error overlay:', err);
  }
})();
`;
}
function generateErrorOverlayHTML(html, options) {
	const nonce = Array.from(crypto.getRandomValues(new Uint8Array(16)), (b) => b.toString(16).padStart(2, "0")).join("");
	const errorPage = html.replace("<head>", `<head><script>${iframeStorageBridge(nonce)}<\/script>`);
	const base64HTML = Buffer.from(errorPage, "utf8").toString("base64");
	return `
    <script>${parentStorageBridge(nonce)}<\/script>
    <nuxt-error-overlay></nuxt-error-overlay>
    <script>${webComponentScript(base64HTML, options?.startMinimized ?? false)}<\/script>
  `;
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
	if (typeof defaultRes.body !== "string" && Array.isArray(defaultRes.body.stack)) {
		
		defaultRes.body.stack = defaultRes.body.stack.join("\n");
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
		const { template } = await Promise.resolve().then(function () { return error500; });
		{
			
			errorObject.description = errorObject.message;
		}
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
	if (!globalThis._importMeta_.test && typeof html === "string") {
		const prettyResponse = await defaultHandler(error, event, { json: false });
		if (typeof prettyResponse.body === "string") {
			return send(event, html.replace("</body>", `${generateErrorOverlayHTML(prettyResponse.body, { startMinimized: 300 <= status && status < 500 })}</body>`));
		}
	}
	return send(event, html);
});

function defineNitroErrorHandler(handler) {
  return handler;
}

const errorHandler$1 = defineNitroErrorHandler(
  async function defaultNitroErrorHandler(error, event) {
    const res = await defaultHandler(error, event);
    if (!event.node?.res.headersSent) {
      setResponseHeaders(event, res.headers);
    }
    setResponseStatus(event, res.status, res.statusText);
    return send(
      event,
      typeof res.body === "string" ? res.body : JSON.stringify(res.body, null, 2)
    );
  }
);
async function defaultHandler(error, event, opts) {
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
  await loadStackTrace(error).catch(consola.error);
  const youch = new Youch();
  if (isSensitive && !opts?.silent) {
    const tags = [error.unhandled && "[unhandled]", error.fatal && "[fatal]"].filter(Boolean).join(" ");
    const ansiError = await (await youch.toANSI(error)).replaceAll(process.cwd(), ".");
    consola.error(
      `[request error] ${tags} [${event.method}] ${url}

`,
      ansiError
    );
  }
  const useJSON = opts?.json ?? !getRequestHeader(event, "accept")?.includes("text/html");
  const headers = {
    "content-type": useJSON ? "application/json" : "text/html",
    // Prevent browser from guessing the MIME types of resources.
    "x-content-type-options": "nosniff",
    // Prevent error page from being embedded in an iframe
    "x-frame-options": "DENY",
    // Prevent browsers from sending the Referer header
    "referrer-policy": "no-referrer",
    // Disable the execution of any js
    "content-security-policy": "script-src 'self' 'unsafe-inline'; object-src 'none'; base-uri 'self';"
  };
  if (statusCode === 404 || !getResponseHeader(event, "cache-control")) {
    headers["cache-control"] = "no-cache";
  }
  const body = useJSON ? {
    error: true,
    url,
    statusCode,
    statusMessage,
    message: error.message,
    data: error.data,
    stack: error.stack?.split("\n").map((line) => line.trim())
  } : await youch.toHTML(error, {
    request: {
      url: url.href,
      method: event.method,
      headers: getRequestHeaders(event)
    }
  });
  return {
    status: statusCode,
    statusText: statusMessage,
    headers,
    body
  };
}
async function loadStackTrace(error) {
  if (!(error instanceof Error)) {
    return;
  }
  const parsed = await new ErrorParser().defineSourceLoader(sourceLoader).parse(error);
  const stack = error.message + "\n" + parsed.frames.map((frame) => fmtFrame(frame)).join("\n");
  Object.defineProperty(error, "stack", { value: stack });
  if (error.cause) {
    await loadStackTrace(error.cause).catch(consola.error);
  }
}
async function sourceLoader(frame) {
  if (!frame.fileName || frame.fileType !== "fs" || frame.type === "native") {
    return;
  }
  if (frame.type === "app") {
    const rawSourceMap = await readFile(`${frame.fileName}.map`, "utf8").catch(() => {
    });
    if (rawSourceMap) {
      const consumer = await new SourceMapConsumer(rawSourceMap);
      const originalPosition = consumer.originalPositionFor({ line: frame.lineNumber, column: frame.columnNumber });
      if (originalPosition.source && originalPosition.line) {
        frame.fileName = resolve(dirname(frame.fileName), originalPosition.source);
        frame.lineNumber = originalPosition.line;
        frame.columnNumber = originalPosition.column || 0;
      }
    }
  }
  const contents = await readFile(frame.fileName, "utf8").catch(() => {
  });
  return contents ? { contents } : void 0;
}
function fmtFrame(frame) {
  if (frame.type === "native") {
    return frame.raw;
  }
  const src = `${frame.fileName || ""}:${frame.lineNumber}:${frame.columnNumber})`;
  return frame.functionName ? `at ${frame.functionName} (${src}` : `at ${src}`;
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

const script$1 = `
if (!window.__NUXT_DEVTOOLS_TIME_METRIC__) {
  Object.defineProperty(window, '__NUXT_DEVTOOLS_TIME_METRIC__', {
    value: {},
    enumerable: false,
    configurable: true,
  })
}
window.__NUXT_DEVTOOLS_TIME_METRIC__.appInit = Date.now()
`;

const _826jlzAE806pEJlcXzwwFiaQxXdiEyUB3grKTzQCljU = (function(nitro) {
  nitro.hooks.hook("render:html", (htmlContext) => {
    htmlContext.head.push(`<script>${script$1}<\/script>`);
  });
});

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

const rootDir = "/Users/mdreesen/projects/ghostform-dashboard";

const appHead = {"meta":[{"name":"viewport","content":"width=device-width, initial-scale=1"},{"charset":"utf-8"}],"link":[{"rel":"icon","type":"image/x-icon","href":"/favicon.ico"},{"rel":"preconnect","href":"https://fonts.googleapis.com"},{"rel":"preconnect","href":"https://fonts.gstatic.com","crossorigin":""},{"rel":"stylesheet","href":"https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,600;9..144,700&family=Inter:wght@400;500;600&display=swap"}],"style":[],"script":[{"src":"https://accounts.google.com/gsi/client","async":true,"defer":true}],"noscript":[],"title":"GhostForm Dashboard","htmlAttrs":{"lang":"en"}};

const appRootTag = "div";

const appRootAttrs = {"id":"__nuxt","class":"isolate"};

const appTeleportTag = "div";

const appTeleportAttrs = {"id":"teleports"};

const appSpaLoaderTag = "div";

const appSpaLoaderAttrs = {"id":"__nuxt-loader"};

const appId = "nuxt-app";

const devReducers = {
	VNode: (data) => isVNode(data) ? {
		type: data.type,
		props: data.props
	} : undefined,
	URL: (data) => data instanceof URL ? data.toString() : undefined,
	Symbol: (data) => typeof data === "symbol" ? data.description ?? "" : undefined
};
const asyncContext = getContext$1("nuxt-dev", {
	asyncContext: true,
	AsyncLocalStorage
});
const _1XTito1x6XnaVP7tVSwrA55jHf6SkzVI1YzEbrqpU = (nitroApp) => {
	const handler = nitroApp.h3App.handler;
	nitroApp.h3App.handler = (event) => {
		return asyncContext.callAsync({
			logs: [],
			event
		}, () => handler(event));
	};
	onConsoleLog((_log) => {
		const ctx = asyncContext.tryUse();
		if (!ctx) {
			return;
		}
		const rawStack = captureRawStackTrace();
		if (!rawStack || rawStack.includes("runtime/vite-node.mjs")) {
			return;
		}
		const trace = [];
		let filename = "";
		for (const entry of parseRawStackTrace(rawStack)) {
			if (entry.source === globalThis._importMeta_.url) {
				continue;
			}
			if (EXCLUDE_TRACE_RE.test(entry.source)) {
				continue;
			}
			filename ||= entry.source.replace(withTrailingSlash(rootDir), "");
			trace.push({
				...entry,
				source: entry.source.startsWith("file://") ? entry.source.replace("file://", "") : entry.source
			});
		}
		const log = {
			..._log,
			
			filename,
			
			stack: trace
		};
		
		ctx.logs.push(log);
	});
	nitroApp.hooks.hook("afterResponse", () => {
		const ctx = asyncContext.tryUse();
		if (!ctx) {
			return;
		}
		return nitroApp.hooks.callHook("dev:ssr-logs", {
			logs: ctx.logs,
			path: ctx.event.path
		});
	});
	
	nitroApp.hooks.hook("render:html", (htmlContext) => {
		const ctx = asyncContext.tryUse();
		if (!ctx) {
			return;
		}
		try {
			const reducers = Object.assign(Object.create(null), devReducers, ctx.event.context["~payloadReducers"]);
			htmlContext.bodyAppend.unshift(`<script type="application/json" data-nuxt-logs="${appId}">${stringify(ctx.logs, reducers)}<\/script>`);
		} catch (e) {
			const shortError = e instanceof Error && "toString" in e ? ` Received \`${e.toString()}\`.` : "";
			console.warn(`[nuxt] Failed to stringify dev server logs.${shortError} You can define your own reducer/reviver for rich types following the instructions in https://nuxt.com/docs/4.x/api/composables/use-nuxt-app#payload.`);
		}
	});
};
const EXCLUDE_TRACE_RE = /\/node_modules\/(?:.*\/)?(?:nuxt|nuxt-nightly|nuxt-edge|nuxt3|consola|@vue)\/|core\/runtime\/nitro/;
function onConsoleLog(callback) {
	consola$1.addReporter({ log(logObj) {
		callback(logObj);
	} });
	consola$1.wrapConsole();
}

const script = "\"use strict\";(()=>{const t=window,e=document.documentElement,c=[\"dark\",\"light\"],n=getStorageValue(\"localStorage\",\"nuxt-color-mode\")||\"system\";let i=n===\"system\"?u():n;const r=e.getAttribute(\"data-color-mode-forced\");r&&(i=r),l(i),t[\"__NUXT_COLOR_MODE__\"]={preference:n,value:i,getColorScheme:u,addColorScheme:l,removeColorScheme:d};function l(o){const s=\"\"+o+\"\",a=\"theme\";e.classList?e.classList.add(s):e.className+=\" \"+s,a&&e.setAttribute(\"data-\"+a,o)}function d(o){const s=\"\"+o+\"\",a=\"theme\";e.classList?e.classList.remove(s):e.className=e.className.replace(new RegExp(s,\"g\"),\"\"),a&&e.removeAttribute(\"data-\"+a)}function f(o){return t.matchMedia(\"(prefers-color-scheme\"+o+\")\")}function u(){if(t.matchMedia&&f(\"\").media!==\"not all\"){for(const o of c)if(f(\":\"+o).matches)return o}return\"light\"}})();function getStorageValue(t,e){switch(t){case\"localStorage\":return window.localStorage.getItem(e);case\"sessionStorage\":return window.sessionStorage.getItem(e);case\"cookie\":return getCookie(e);default:return null}}function getCookie(t){const c=(\"; \"+window.document.cookie).split(\"; \"+t+\"=\");if(c.length===2)return c.pop()?.split(\";\").shift()}";

const __lNdKKPKR6mLiwFlPOsO8k6EkQYVEzOlLk2aywnkSnU = (function(nitro) {
  nitro.hooks.hook("render:html", (htmlContext) => {
    htmlContext.head.push(`<script>${script}<\/script>`);
  });
});

const plugins = [
  _826jlzAE806pEJlcXzwwFiaQxXdiEyUB3grKTzQCljU,
_72rdM3gRxjYczXChZls5i8aHxH1iSWd92H8wuXVceI,
_1XTito1x6XnaVP7tVSwrA55jHf6SkzVI1YzEbrqpU,
__lNdKKPKR6mLiwFlPOsO8k6EkQYVEzOlLk2aywnkSnU,
_wH6JrtIxmaSoA8lCPWFnE9z4lQeXW6H5z3l5aymEQw
];

const assets = {
  "/index.mjs": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"436a6-iwhnmPMLKsM0NDI2YCGEMa730VY\"",
    "mtime": "2026-08-23T21:33:37.484Z",
    "size": 276134,
    "path": "index.mjs"
  },
  "/index.mjs.map": {
    "type": "application/json",
    "etag": "\"f5c56-k27sQWrtcgudmfLxooDSd5quFho\"",
    "mtime": "2026-08-23T21:33:37.485Z",
    "size": 1006678,
    "path": "index.mjs.map"
  }
};

function readAsset (id) {
  const serverDir = dirname$1(fileURLToPath(globalThis._importMeta_.url));
  return promises.readFile(resolve$1(serverDir, assets[id].path))
}

const publicAssetBases = {"/_nuxt/builds/meta/":{"maxAge":31536000},"/_nuxt/builds/":{"maxAge":1},"/_fonts/":{"maxAge":31536000}};

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
      throw createError({ statusCode: 404 });
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

const e=globalThis.process?.env||Object.create(null),t=globalThis.process||{env:e},n=t!==void 0&&t.env&&t.env.NODE_ENV||void 0,r=[[`claude`,[`CLAUDECODE`,`CLAUDE_CODE`]],[`replit`,[`REPL_ID`]],[`gemini`,[`GEMINI_CLI`]],[`codex`,[`CODEX_SANDBOX`,`CODEX_THREAD_ID`]],[`opencode`,[`OPENCODE`]],[`pi`,[i(`PATH`,/\.pi[\\/]agent/)]],[`auggie`,[`AUGMENT_AGENT`]],[`goose`,[`GOOSE_PROVIDER`]],[`junie`,[`JUNIE_DATA`,`JUNIE_SHIM_PATH`]],[`devin`,[i(`EDITOR`,/devin/)]],[`cursor`,[`CURSOR_AGENT`]],[`kiro`,[i(`TERM_PROGRAM`,/kiro/,{noTTY:true})]]];function i(n,r,i){return ()=>{if(i?.noTTY&&t.stdout?.isTTY)return  false;let a=e[n];return a?r.test(a):false}}function a(){let t=e.AI_AGENT;if(t)return {name:t.toLowerCase()};for(let[t,n]of r)for(let r of n)if(typeof r==`string`?e[r]:r())return {name:t};return {}}const o=a();o.name;!!o.name;const l=[[`APPVEYOR`],[`AWS_AMPLIFY`,`AWS_APP_ID`,{ci:true}],[`AZURE_PIPELINES`,`SYSTEM_TEAMFOUNDATIONCOLLECTIONURI`],[`AZURE_STATIC`,`INPUT_AZURE_STATIC_WEB_APPS_API_TOKEN`],[`APPCIRCLE`,`AC_APPCIRCLE`],[`BAMBOO`,`bamboo_planKey`],[`BITBUCKET`,`BITBUCKET_COMMIT`],[`BITRISE`,`BITRISE_IO`],[`BUDDY`,`BUDDY_WORKSPACE_ID`],[`BUILDKITE`],[`CIRCLE`,`CIRCLECI`],[`CIRRUS`,`CIRRUS_CI`],[`CLOUDFLARE_PAGES`,`CF_PAGES`,{ci:true}],[`CLOUDFLARE_WORKERS`,`WORKERS_CI`,{ci:true}],[`GOOGLE_CLOUDRUN`,`K_SERVICE`],[`GOOGLE_CLOUDRUN_JOB`,`CLOUD_RUN_JOB`],[`CODEBUILD`,`CODEBUILD_BUILD_ARN`],[`CODEFRESH`,`CF_BUILD_ID`],[`DRONE`],[`DRONE`,`DRONE_BUILD_EVENT`],[`DSARI`],[`GITHUB_ACTIONS`],[`GITLAB`,`GITLAB_CI`],[`GITLAB`,`CI_MERGE_REQUEST_ID`],[`GOCD`,`GO_PIPELINE_LABEL`],[`LAYERCI`],[`JENKINS`,`JENKINS_URL`],[`HUDSON`,`HUDSON_URL`],[`MAGNUM`],[`NETLIFY`],[`NETLIFY`,`NETLIFY_LOCAL`,{ci:false}],[`NEVERCODE`],[`RENDER`],[`SAIL`,`SAILCI`],[`SEMAPHORE`],[`SCREWDRIVER`],[`SHIPPABLE`],[`SOLANO`,`TDDIUM`],[`STRIDER`],[`TEAMCITY`,`TEAMCITY_VERSION`],[`TRAVIS`],[`VERCEL`,`NOW_BUILDER`],[`VERCEL`,`VERCEL`,{ci:false}],[`VERCEL`,`VERCEL_ENV`,{ci:false}],[`APPCENTER`,`APPCENTER_BUILD_ID`],[`CODESANDBOX`,`CODESANDBOX_SSE`,{ci:false}],[`CODESANDBOX`,`CODESANDBOX_HOST`,{ci:false}],[`STACKBLITZ`],[`STORMKIT`],[`CLEAVR`],[`ZEABUR`],[`CODESPHERE`,`CODESPHERE_APP_ID`,{ci:true}],[`RAILWAY`,`RAILWAY_PROJECT_ID`],[`RAILWAY`,`RAILWAY_SERVICE_ID`],[`DENO-DEPLOY`,`DENO_DEPLOY`],[`DENO-DEPLOY`,`DENO_DEPLOYMENT_ID`],[`FIREBASE_APP_HOSTING`,`FIREBASE_APP_HOSTING`,{ci:true}],[`EDGEONE_PAGES`,`EO_PAGES_CI`,{ci:true}]];function u(){for(let t of l)if(e[t[1]||t[0]])return {name:t[0].toLowerCase(),...t[2]};return e.SHELL===`/bin/jsh`&&t.versions?.webcontainer?{name:`stackblitz`,ci:false}:{name:``,ci:false}}const d=u();d.name;const p=t.platform||``,m=!!e.CI||d.ci!==false,h=!!t.stdout?.isTTY;!!e.DEBUG;const v=n===`test`||!!e.TEST;n===`production`||e.MODE===`production`;n===`dev`||n===`development`||e.MODE===`development`;!!e.MINIMAL||m||v||!h;const S=/^win/i.test(p);!e.NO_COLOR&&(!!e.FORCE_COLOR||(h||S)&&e.TERM!==`dumb`||m);const E=(t.versions?.node||``).replace(/^v/,``)||null;Number(E?.split(`.`)[0])||null;const O=!!t?.versions?.node,k=`Bun`in globalThis,A=`Deno`in globalThis,j=`fastly`in globalThis,M=`Netlify`in globalThis,N=`EdgeRuntime`in globalThis,P=globalThis.navigator?.userAgent===`Cloudflare-Workers`,F=[[M,`netlify`],[N,`edge-light`],[P,`workerd`],[j,`fastly`],[A,`deno`],[k,`bun`],[O,`node`]];function I(){let e=F.find(e=>e[0]);if(e)return {name:e[1]}}const L=I();L?.name||``;

const scheduledTasks = [{"cron":"0 15 * * *","tasks":["lead:reminders"]}];

const tasks = {
  "lead:reminders": {
          meta: {
            description: "Processes custom individual queues and recurring marketing blasts",
          },
          resolve: () => Promise.resolve().then(function () { return reminders$1; }).then(r => r.default || r),
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
    throw createError({
      message: `Task \`${name}\` is not available!`,
      statusCode: 404
    });
  }
  if (!tasks[name].resolve) {
    throw createError({
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
    new Cron(schedule.cron, async () => {
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

function buildPrompt$3(briefing) {
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
  return (_a = useOpenAi([{ role: "user", content: buildPrompt$3(briefing) }])) != null ? _a : null;
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
  // ── Qualification (the deep-dive questionnaire) ──────────────
  // Sent once a lead gets serious. Answers are keyed by question id
  // (q_timeline, q_financing, ...) — see server/utils/qualificationQuestions.ts
  qualification: {
    sentAt: Date,
    completedAt: Date,
    intent: String,
    // 'buy' | 'sell'
    answers: { type: Object, default: {} }
  },
  // Cached analysis so the dashboard doesn't re-run (and re-bill) the model
  // on every page view. Regenerated only when asked or on new answers.
  analysis: {
    readiness: Number,
    readinessLabel: String,
    financingRisk: String,
    signals: [String],
    gaps: [String],
    read: String,
    nextSteps: [String],
    source: String,
    generatedAt: Date
  },
  ai_analysis: String,
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

const LeadModel$a = schemaImport;
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
  const leads = await LeadModel$a.find({
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

const TIMELINE_SCORE = {
  "within 30 days": 30,
  "as soon as possible": 30,
  "1\u20133 months": 24,
  "3\u20136 months": 15,
  "6\u201312 months": 8,
  "just exploring": 2,
  "just considering": 2
};
const FINANCING_SCORE = {
  "paying cash": 30,
  "fully pre-approved": 28,
  "pre-qualified, not yet approved": 18,
  "talked to a lender, nothing formal": 9,
  "haven't started": 2
};
const norm = (v) => String(v != null ? v : "").trim().toLowerCase();
const has = (v) => String(v != null ? v : "").trim().length > 0;
function buildScorecard(a, intent) {
  var _a, _b, _c, _d, _e;
  const isSeller = norm(intent).includes("sell");
  let score = 0;
  const signals = [];
  const gaps = [];
  const t = norm(a.q_timeline);
  const tScore = (_a = TIMELINE_SCORE[t]) != null ? _a : 0;
  score += tScore;
  if (tScore >= 24) signals.push(`Moving fast \u2014 said "${a.q_timeline}".`);
  else if (tScore <= 2 && has(a.q_timeline)) signals.push("Exploratory timeline \u2014 not ready to transact yet.");
  if (!has(a.q_timeline)) gaps.push("No timeline given.");
  let financingRisk = "unknown";
  if (!isSeller) {
    const f = norm(a.q_financing);
    const fScore = (_b = FINANCING_SCORE[f]) != null ? _b : 0;
    score += fScore;
    if (fScore >= 28) {
      financingRisk = "low";
      signals.push("Financing is sorted \u2014 cash or fully pre-approved.");
    } else if (fScore >= 18) {
      financingRisk = "medium";
      signals.push("Pre-qualified only \u2014 not the same as approved.");
    } else if (has(a.q_financing)) {
      financingRisk = "high";
      signals.push("Financing not started or informal \u2014 the most likely thing to stall this.");
    } else gaps.push("Financing status unknown.");
    if (!has(a.q_lender) && financingRisk !== "low") {
      gaps.push("No lender named \u2014 an introduction would move this forward.");
    }
  } else {
    const expected = Number(a.q_price_expectation) || 0;
    const owed = Number(a.q_mortgage) || 0;
    if (expected > 0) {
      score += 18;
      signals.push(`Has a price in mind: $${expected.toLocaleString("en-US")}.`);
      if (owed > 0 && owed > expected * 0.9) {
        financingRisk = "high";
        signals.push("Owes close to (or more than) their expected price \u2014 equity may not support a sale.");
      } else if (owed > 0) {
        financingRisk = "low";
        score += 6;
      }
    } else {
      gaps.push("No price expectation given \u2014 that is the listing conversation.");
    }
    if (!has(a.q_price_basis)) gaps.push("Unclear where their price expectation comes from.");
  }
  const motivation = String((_d = (_c = a.q_reason) != null ? _c : a.q_motivation) != null ? _d : "");
  if (motivation.trim().length > 40) {
    score += 20;
    signals.push("Gave a detailed reason for moving \u2014 usually a sign of real intent.");
  } else if (motivation.trim().length > 0) {
    score += 10;
  } else {
    gaps.push("No stated reason for moving.");
  }
  const longAnswers = [a.q_must_haves, a.q_deal_breakers, a.q_seen_anything, a.q_condition, a.q_improvements, a.q_flexibility].filter((v) => String(v != null ? v : "").trim().length > 25).length;
  score += Math.min(20, longAnswers * 7);
  if (longAnswers >= 3) signals.push("Answered the open questions thoroughly \u2014 engaged, not just curious.");
  if (longAnswers === 0) gaps.push("Skipped most of the open-ended questions.");
  const situation = norm(a.q_current_situation);
  if (situation.includes("need to sell first")) {
    signals.push("Purchase depends on selling their current home \u2014 and that is a second listing for you.");
  }
  if (norm(a.q_listed_before).includes("expired")) {
    signals.push("Previously listed and expired \u2014 worth knowing why before the appointment.");
  }
  if (norm(a.q_buying_too).startsWith("yes")) {
    signals.push("Buying as well as selling \u2014 two transactions.");
  }
  if (has(a.q_decision) && !/^(no|none|just me|myself)/i.test(String(a.q_decision).trim())) {
    signals.push(`Someone else is involved in the decision: ${a.q_decision}.`);
  }
  if (has(a.q_concerns)) {
    signals.push("Raised a concern unprompted \u2014 address it directly on the next call.");
  }
  score = Math.max(0, Math.min(100, score));
  const readinessLabel = score >= 75 ? "Ready to transact" : score >= 50 ? "Getting serious" : score >= 25 ? "Early but real" : "Exploratory";
  return {
    readiness: score,
    readinessLabel,
    financingRisk,
    timelineBand: String((_e = a.q_timeline) != null ? _e : "Not given"),
    signals,
    gaps
  };
}
const FORBIDDEN = [
  // 'family' about PEOPLE is a protected-class reference; 'single-family' and
  // 'multi-family' are property types and must stay allowed.
  /(?<!\b(single|multi)[\s-])\bfamil(y|ies|ial)\b/i,
  /\bkids?\b/i,
  /\bchildren\b/i,
  /\bschool district/i,
  /\bmarried\b/i,
  /\bcouple\b/i,
  // 'single' only when it's about a PERSON — "single-story" and "single-family"
  // are standard architectural terms and must not be flagged.
  /\bsingle\b(?![\s-]*(story|storey|level|family|wide))/i,
  /\bethnic/i,
  /\brace\b/i,
  /\bracial/i,
  /\breligio/i,
  /\bchurch\b/i,
  /\bnationalit/i,
  /\bimmigran/i,
  /\bdisab/i,
  /\bhandicap/i,
  /\belderly\b/i,
  /\byoung professional/i,
  /\bretire(d|e|ment)\b/i,
  /\bpregnan/i,
  /\bsafe neighborhood/i,
  /\bgood area for\b/i
];
function violatesFairHousing(text) {
  for (const re of FORBIDDEN) {
    const m = text.match(re);
    if (m) return m[0];
  }
  return null;
}
function buildPrompt$2(a, intent, card, name) {
  const answered = Object.entries(a).filter(([, v]) => String(v != null ? v : "").trim().length > 0).map(([k, v]) => `${k.replace(/^q_/, "").replace(/_/g, " ")}: ${v}`).join("\n");
  return [
    `You are helping a real estate agent prepare for their next conversation with a lead.`,
    `The lead completed a qualification questionnaire. Their answers are below.`,
    ``,
    `LEAD: ${name || "the lead"}  (${intent || "unspecified intent"})`,
    `COMPUTED READINESS: ${card.readiness}/100 \u2014 ${card.readinessLabel}`,
    ``,
    `THEIR ANSWERS`,
    answered,
    ``,
    `WRITE`,
    `1. "read" \u2014 3-5 sentences on what is actually going on with this lead.`,
    `   Point out contradictions between answers (e.g. a budget that will not`,
    `   buy the must-haves, an urgent timeline with no financing started).`,
    `   Reference what they actually said. Be direct and useful, not flattering.`,
    `2. "nextSteps" \u2014 2-4 specific actions for the agent, in priority order.`,
    `   Concrete ("introduce a lender this week"), not vague ("build rapport").`,
    ``,
    `HARD RULES`,
    `- Use ONLY what is in their answers. Invent nothing \u2014 no prices, dates,`,
    `  or facts they did not give.`,
    `- NEVER mention or infer family status, children, marital status, age,`,
    `  race, ethnicity, national origin, religion, or disability. Do not`,
    `  reference schools, "family-friendly", "safe neighborhoods", or anything`,
    `  that stands in for those. This is a legal requirement, not a preference.`,
    `- Do not speculate about their personal circumstances beyond what the`,
    `  answers state about the transaction.`,
    ``,
    `Return ONLY JSON, no markdown fence:`,
    `{"read": "...", "nextSteps": ["...", "..."]}`
  ].join("\n");
}
async function callAnthropic(prompt, key) {
  var _a, _b, _c;
  try {
    const res = await $fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: { "x-api-key": key, "anthropic-version": "2023-06-01", "content-type": "application/json" },
      body: {
        model: process.env.ANTHROPIC_MODEL || "claude-haiku-4-5-20251001",
        max_tokens: 800,
        messages: [{ role: "user", content: prompt }]
      }
    });
    return (_c = (_b = (_a = res == null ? void 0 : res.content) == null ? void 0 : _a.find((b) => b.type === "text")) == null ? void 0 : _b.text) != null ? _c : null;
  } catch (err) {
    if (String(err).includes("404")) {
      console.error("[analysis] 404 from Anthropic \u2014 check ANTHROPIC_MODEL is a model this key can access.");
    } else {
      console.error("[analysis] Anthropic failed:", (err == null ? void 0 : err.message) || err);
    }
    return null;
  }
}
async function callOpenAI(prompt, key) {
  var _a, _b, _c, _d;
  try {
    const res = await $fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "content-type": "application/json" },
      body: { model: "gpt-4o-mini", max_tokens: 800, messages: [{ role: "user", content: prompt }] }
    });
    return (_d = (_c = (_b = (_a = res == null ? void 0 : res.choices) == null ? void 0 : _a[0]) == null ? void 0 : _b.message) == null ? void 0 : _c.content) != null ? _d : null;
  } catch (err) {
    console.error("[analysis] OpenAI failed:", (err == null ? void 0 : err.message) || err);
    return null;
  }
}
function parseJson$1(raw) {
  try {
    const cleaned = raw.replace(/```json|```/g, "").trim();
    const s = cleaned.indexOf("{"), e = cleaned.lastIndexOf("}");
    if (s === -1 || e === -1) return null;
    const p = JSON.parse(cleaned.slice(s, e + 1));
    if (!(p == null ? void 0 : p.read)) return null;
    return {
      read: String(p.read).trim(),
      nextSteps: Array.isArray(p.nextSteps) ? p.nextSteps.map((x) => String(x)).slice(0, 4) : []
    };
  } catch {
    return null;
  }
}
async function analyseLead(answers, intent, name = "") {
  const scorecard = buildScorecard(answers, intent);
  const base = {
    scorecard,
    read: null,
    nextSteps: [],
    source: "scorecard-only",
    generatedAt: (/* @__PURE__ */ new Date()).toISOString()
  };
  const anthropicKey = process.env.ANTHROPIC_API_KEY;
  const openaiKey = process.env.OPENAI_API_KEY;
  if (!anthropicKey && !openaiKey) return base;
  const prompt = buildPrompt$2(answers, intent, scorecard, name);
  const raw = anthropicKey ? await callAnthropic(prompt, anthropicKey) : await callOpenAI(prompt, openaiKey);
  if (!raw) return base;
  const parsed = parseJson$1(raw);
  if (!parsed) return base;
  const combined = [parsed.read, ...parsed.nextSteps].join(" ");
  const violation = violatesFairHousing(combined);
  if (violation) {
    console.error(`[analysis] Discarded AI read \u2014 protected-class language ("${violation}").`);
    return base;
  }
  return {
    ...base,
    read: parsed.read,
    nextSteps: parsed.nextSteps,
    source: "ai"
  };
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

const BUYER_QUESTIONS = [
  {
    id: "q_timeline",
    label: "When would you ideally like to be in a new place?",
    type: "choice",
    options: ["Within 30 days", "1\u20133 months", "3\u20136 months", "6\u201312 months", "Just exploring"],
    rationale: "The single strongest predictor of whether this closes."
  },
  {
    id: "q_financing",
    label: "Where are you at with financing?",
    type: "choice",
    options: [
      "Paying cash",
      "Fully pre-approved",
      "Pre-qualified, not yet approved",
      "Talked to a lender, nothing formal",
      "Haven't started"
    ],
    rationale: "Financing is the most common deal-killer. Knowing this early changes everything."
  },
  {
    id: "q_lender",
    label: "Who are you working with for the loan? (if anyone)",
    type: "text",
    rationale: "Tells you whether to introduce a lender, and how real the pre-approval is."
  },
  {
    id: "q_budget_max",
    label: "What is the most you would be comfortable spending?",
    type: "number",
    rationale: "Their ceiling, not their wish price. Different number than the capture form."
  },
  {
    id: "q_must_haves",
    label: "What are your absolute must-haves?",
    type: "long",
    rationale: "Separates real constraints from preferences. Drives what you send them."
  },
  {
    id: "q_deal_breakers",
    label: "What would rule a house out completely?",
    type: "long",
    rationale: "Saves showings. Most agents never ask this and waste weekends because of it."
  },
  {
    id: "q_current_situation",
    label: "What is your current living situation?",
    type: "choice",
    options: [
      "Renting \u2014 lease ends soon",
      "Renting \u2014 flexible",
      "Own, need to sell first",
      "Own, do not need to sell first",
      "Other"
    ],
    rationale: "A contingent sale is a completely different transaction. Also surfaces listing opportunities."
  },
  {
    id: "q_areas",
    label: "Which areas are you considering?",
    type: "text",
    rationale: "Grounds your search and tells you if expectations match the budget."
  },
  {
    id: "q_seen_anything",
    label: "Have you seen anything you liked so far?",
    type: "long",
    rationale: "Reveals how far along they are and what actually appeals to them."
  },
  {
    id: "q_decision",
    label: "Is anyone else involved in the decision?",
    type: "text",
    rationale: "Deals stall when the person you never met says no. Neutral phrasing \u2014 not a question about household composition."
  },
  {
    id: "q_motivation",
    label: "What is prompting the move?",
    type: "long",
    rationale: "Motivation strength predicts follow-through better than budget does."
  },
  {
    id: "q_concerns",
    label: "Anything worrying you about the process?",
    type: "long",
    rationale: "Surfaces objections early, while you can still address them."
  }
];
const SELLER_QUESTIONS = [
  {
    id: "q_timeline",
    label: "When would you like to have it sold?",
    type: "choice",
    options: ["As soon as possible", "1\u20133 months", "3\u20136 months", "6\u201312 months", "Just considering"],
    rationale: "Urgency drives pricing strategy and how hard you push."
  },
  {
    id: "q_reason",
    label: "What is prompting the sale?",
    type: "long",
    rationale: "A forced move and a maybe-move need completely different handling."
  },
  {
    id: "q_price_expectation",
    label: "What do you think the home is worth?",
    type: "number",
    rationale: "The most important number in the conversation. Gap vs market is the whole listing appointment."
  },
  {
    id: "q_price_basis",
    label: "What is that based on?",
    type: "text",
    rationale: "A Zillow estimate and a recent appraisal are very different starting points."
  },
  {
    id: "q_mortgage",
    label: "Roughly how much is still owed on the property?",
    type: "number",
    rationale: "Determines whether the sale is even viable at their expected price."
  },
  {
    id: "q_condition",
    label: "What condition is it in? Anything that needs work?",
    type: "long",
    rationale: "Sets expectations on price and prep before you walk in."
  },
  {
    id: "q_improvements",
    label: "What have you updated while you have owned it?",
    type: "long",
    rationale: "Ammunition for pricing, and it gets sellers talking positively."
  },
  {
    id: "q_listed_before",
    label: "Has it been listed before?",
    type: "choice",
    options: ["No", "Yes \u2014 expired", "Yes \u2014 withdrew it", "Yes \u2014 currently listed"],
    rationale: "A previously expired listing tells you a lot before you arrive."
  },
  {
    id: "q_buying_too",
    label: "Are you buying something else as well?",
    type: "choice",
    options: ["Yes, locally", "Yes, out of the area", "No", "Not sure yet"],
    rationale: "Doubles the transaction, and changes the timing conversation."
  },
  {
    id: "q_flexibility",
    label: "How flexible are you on timing and price?",
    type: "long",
    rationale: "Tells you whether this is a real listing or a test of the market."
  },
  {
    id: "q_decision",
    label: "Is anyone else involved in the decision?",
    type: "text",
    rationale: "Same reason as the buyer set \u2014 deals stall on the person you never met."
  },
  {
    id: "q_concerns",
    label: "Anything worrying you about selling?",
    type: "long",
    rationale: "Objections surfaced early are objections you can still answer."
  }
];
function questionsFor(intent) {
  const i = (intent).toLowerCase();
  if (i.includes("sell")) return SELLER_QUESTIONS;
  return BUYER_QUESTIONS;
}

function secret() {
  const s = process.env.QUALIFY_SECRET || process.env.NUXT_SESSION_PASSWORD;
  if (!s) throw new Error("QUALIFY_SECRET (or NUXT_SESSION_PASSWORD) must be set to sign questionnaire links.");
  return s;
}
function sign(payload) {
  return createHmac("sha256", secret()).update(payload).digest("base64url");
}
function createQualifyToken(leadId, days = 30) {
  const expiry = Date.now() + days * 864e5;
  const payload = `${leadId}.${expiry}`;
  return `${payload}.${sign(payload)}`;
}
function readQualifyToken(token) {
  if (!token || typeof token !== "string") return null;
  const parts = token.split(".");
  if (parts.length !== 3) return null;
  const [leadId, expiryRaw, providedSig] = parts;
  const payload = `${leadId}.${expiryRaw}`;
  const expectedSig = sign(payload);
  const a = Buffer.from(providedSig);
  const b = Buffer.from(expectedSig);
  if (a.length !== b.length || !timingSafeEqual(a, b)) return null;
  const expiry = Number(expiryRaw);
  if (!Number.isFinite(expiry) || Date.now() > expiry) return null;
  return { leadId };
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

const UserDoc$2 = UserModelImport;
const ACTIVE_STATUSES$1 = /* @__PURE__ */ new Set(["active", "trialing"]);
async function requirePaidUser(event) {
  await connectDB();
  const { user } = await requireUserSession(event);
  const email = user == null ? void 0 : user.email;
  const dbUser = await UserDoc$2.findOne({ email });
  if (!dbUser) {
    throw createError({ statusCode: 401, statusMessage: "User not found." });
  }
  const status = dbUser.subscriptionStatus;
  const isActive = ACTIVE_STATUSES$1.has(status) || dbUser.paid === true;
  if (!isActive) {
    throw createError({
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
      throw createError({
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

const warnOnceSet = /* @__PURE__ */ new Set();
const DEFAULT_ENDPOINT = "https://api.iconify.design";
function getInstallCommand(pkg) {
  const ua = process.env.npm_config_user_agent || "";
  if (ua.startsWith("pnpm")) return `pnpm add -D ${pkg}`;
  if (ua.startsWith("yarn")) return `yarn add -D ${pkg}`;
  if (ua.startsWith("bun")) return `bun add -D ${pkg}`;
  return `npm i -D ${pkg}`;
}
const _rPYuUS = defineCachedEventHandler(async (event) => {
  const collectionName = event.context.params?.collection?.replace(/\.json$/, "");
  const collection = collectionName && Object.hasOwn(collections, collectionName) ? await collections[collectionName]?.() : null;
  const apiEndPoint = options.iconifyApiEndpoint;
  const icons = String(parseQuery(parsePath(event.path).search).icons || "").split(",");
  if (!collectionName) return createError({ status: 400, message: "No collection specified" });
  if (!icons.length) return createError({ status: 400, message: "No icons specified" });
  if (!collection && true && !warnOnceSet.has(collectionName) && apiEndPoint === DEFAULT_ENDPOINT) {
    consola$1.warn([
      `[Icon] Collection \`${collectionName}\` is not found locally`,
      `We suggest to install it via \`${getInstallCommand(`@iconify-json/${collectionName}`)}\` to provide the best end-user experience.`
    ].join("\n"));
    warnOnceSet.add(collectionName);
  }
  if (collection) {
    const data = getIcons(
      collection,
      icons
    );
    consola$1.debug(`[Icon] serving ${icons.map((i) => "`" + collectionName + ":" + i + "`").join(",")} from bundled collection`);
    return data;
  }
  {
    const apiUrl = new URL(`./${collectionName}.json?icons=${icons.join(",")}`, apiEndPoint);
    consola$1.debug(`[Icon] fetching ${icons.map((i) => "`" + collectionName + ":" + i + "`").join(",")} from iconify api`);
    if (apiUrl.host !== new URL(apiEndPoint).host) {
      return createError({ status: 400, message: "Invalid icon request" });
    }
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        return response.status === 404 ? createError({ status: 404 }) : createError({ status: 500, message: "Failed to fetch fallback icon" });
      }
      return response.json();
    } catch (e) {
      consola$1.error(e);
      return createError({ status: 500, message: "Failed to fetch fallback icon" });
    }
  }
  return createError({ status: 404 });
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

const VueResolver = (_, value) => {
  return isRef(value) ? toValue(value) : value;
};

const headSymbol = "usehead";
// @__NO_SIDE_EFFECTS__
function vueInstall(head) {
  const plugin = {
    install(app) {
      app.config.globalProperties.$unhead = head;
      app.config.globalProperties.$head = head;
      app.provide(headSymbol, head);
    }
  };
  return plugin.install;
}

// @__NO_SIDE_EFFECTS__
function resolveUnrefHeadInput(input) {
  return walkResolver(input, VueResolver);
}

function filterIslandProps(props) {
  if (!props) {
    return {};
  }
  const out = {};
  for (const key in props) {
    if (!key.startsWith("data-v-")) {
      out[key] = props[key];
    }
  }
  return out;
}
function computeIslandHash(name, filteredProps, context, source) {
  return hash$1([name, filteredProps, context, source]).replace(/[-_]/g, "");
}

const NUXT_PAYLOAD_INLINE = false;

const payloadCache = useStorage("cache:nuxt:payload") ;

// @__NO_SIDE_EFFECTS__
function createHead(options = {}) {
  const head = createHead$1({
    ...options,
    propResolvers: [VueResolver]
  });
  head.install = vueInstall(head);
  return head;
}

const unheadOptions = {
  disableDefaults: true,
};

function encodeEventPath(path) {
	const queryIndex = path.indexOf("?");
	if (queryIndex === -1) {
		return encodePath(path);
	}
	return encodePath(path.slice(0, queryIndex)) + path.slice(queryIndex);
}
function createSSRContext(event) {
	const url = encodeEventPath(event.path);
	const ssrContext = {
		url,
		event,
		runtimeConfig: useRuntimeConfig(event),
		noSSR: event.context.nuxt?.noSSR || (false),
		head: createHead(unheadOptions),
		error: false,
		nuxt: undefined,
		payload: {},
		["~payloadReducers"]: Object.create(null),
		modules: new Set()
	};
	return ssrContext;
}
function setSSRError(ssrContext, error) {
	ssrContext.error = true;
	ssrContext.payload = { error };
	ssrContext.url = error.url;
}

// @ts-expect-error private property consumed by vite-generated url helpers
globalThis.__buildAssetsURL = buildAssetsURL;
// @ts-expect-error private property consumed by vite-generated url helpers
globalThis.__publicAssetsURL = publicAssetsURL;
const APP_ROOT_OPEN_TAG = `<${appRootTag}${propsToString(appRootAttrs)}>`;
const APP_ROOT_CLOSE_TAG = `</${appRootTag}>`;
// @ts-expect-error file will be produced after app build
const getServerEntry = () => Promise.resolve().then(function () { return server; }).then((r) => r.default || r);
// @ts-expect-error file will be produced after app build
const getClientManifest = () => Promise.resolve().then(function () { return client_manifest$1; }).then((r) => r.default || r).then((r) => typeof r === "function" ? r() : r);

const getSSRRenderer = lazyCachedFunction(async () => {
	
	const createSSRApp = await getServerEntry();
	if (!createSSRApp) {
		throw new Error("Server bundle is not available");
	}
	
	const precomputed = undefined ;
	
	const renderer = createRenderer(createSSRApp, {
		precomputed,
		manifest: await getClientManifest() ,
		renderToString: renderToString$1,
		buildAssetsURL
	});
	async function renderToString$1(input, context) {
		const html = await renderToString(input, context);
		
		
		if (process.env.NUXT_VITE_NODE_OPTIONS) {
			renderer.rendererContext.updateManifest(await getClientManifest());
		}
		return APP_ROOT_OPEN_TAG + html + APP_ROOT_CLOSE_TAG;
	}
	return renderer;
});

const getSPARenderer = lazyCachedFunction(async () => {
	const precomputed = undefined ;
	// @ts-expect-error virtual file
	const spaTemplate = await Promise.resolve().then(function () { return _virtual__spaTemplate; }).then((r) => r.template).catch(() => "").then((r) => {
		{
			const APP_SPA_LOADER_OPEN_TAG = `<${appSpaLoaderTag}${propsToString(appSpaLoaderAttrs)}>`;
			const APP_SPA_LOADER_CLOSE_TAG = `</${appSpaLoaderTag}>`;
			const appTemplate = APP_ROOT_OPEN_TAG + APP_ROOT_CLOSE_TAG;
			const loaderTemplate = r ? APP_SPA_LOADER_OPEN_TAG + r + APP_SPA_LOADER_CLOSE_TAG : "";
			return appTemplate + loaderTemplate;
		}
	});
	
	const renderer = createRenderer(() => () => {}, {
		precomputed,
		manifest: await getClientManifest() ,
		renderToString: () => spaTemplate,
		buildAssetsURL
	});
	const result = await renderer.renderToString({});
	const renderToString = (ssrContext) => {
		const config = useRuntimeConfig(ssrContext.event);
		ssrContext.modules ||= new Set();
		ssrContext.payload.serverRendered = false;
		ssrContext.config = {
			public: config.public,
			app: config.app
		};
		return Promise.resolve(result);
	};
	return {
		rendererContext: renderer.rendererContext,
		renderToString
	};
});
function lazyCachedFunction(fn) {
	let res = null;
	return () => {
		if (res === null) {
			res = fn().catch((err) => {
				res = null;
				throw err;
			});
		}
		return res;
	};
}
function getRenderer(ssrContext) {
	return ssrContext.noSSR ? getSPARenderer() : getSSRRenderer();
}
// @ts-expect-error file will be produced after app build
const getSSRStyles = lazyCachedFunction(() => Promise.resolve().then(function () { return styles$1; }).then((r) => r.default || r));

async function renderInlineStyles(usedModules) {
	const styleMap = await getSSRStyles();
	const inlinedStyles = new Set();
	for (const mod of usedModules) {
		if (mod in styleMap && styleMap[mod]) {
			for (const style of await styleMap[mod]()) {
				inlinedStyles.add(style);
			}
		}
	}
	return Array.from(inlinedStyles).map((style) => ({ innerHTML: style }));
}

// @ts-expect-error virtual file
const ROOT_NODE_REGEX = new RegExp(`^<${appRootTag}[^>]*>([\\s\\S]*)<\\/${appRootTag}>$`);

function getServerComponentHTML(body) {
	const match = body.match(ROOT_NODE_REGEX);
	return match?.[1] || body;
}
const SSR_SLOT_TELEPORT_MARKER = /^uid=([^;]*);slot=(.*)$/;
const SSR_CLIENT_TELEPORT_MARKER = /^uid=([^;]*);client=(.*)$/;
const SSR_CLIENT_SLOT_MARKER = /^island-slot=([^;]*);(.*)$/;
function getSlotIslandResponse(ssrContext) {
	if (!ssrContext.islandContext || !Object.keys(ssrContext.islandContext.slots).length) {
		return undefined;
	}
	const response = {};
	for (const [name, slot] of Object.entries(ssrContext.islandContext.slots)) {
		response[name] = {
			...slot,
			fallback: ssrContext.teleports?.[`island-fallback=${name}`]
		};
	}
	return response;
}
function getClientIslandResponse(ssrContext) {
	if (!ssrContext.islandContext || !Object.keys(ssrContext.islandContext.components).length) {
		return undefined;
	}
	const response = {};
	for (const [clientUid, component] of Object.entries(ssrContext.islandContext.components)) {
		
		const html = ssrContext.teleports?.[clientUid]?.replaceAll("<!--teleport start anchor-->", "") || "";
		response[clientUid] = {
			...component,
			html,
			slots: getComponentSlotTeleport(clientUid, ssrContext.teleports ?? {})
		};
	}
	return response;
}
function getComponentSlotTeleport(clientUid, teleports) {
	const entries = Object.entries(teleports);
	const slots = {};
	for (const [key, value] of entries) {
		const match = key.match(SSR_CLIENT_SLOT_MARKER);
		if (match) {
			const [, id, slot] = match;
			if (!slot || clientUid !== id) {
				continue;
			}
			slots[slot] = value;
		}
	}
	return slots;
}
function replaceIslandTeleports(ssrContext, html) {
	const { teleports, islandContext } = ssrContext;
	if (islandContext || !teleports) {
		return html;
	}
	for (const key in teleports) {
		const matchClientComp = key.match(SSR_CLIENT_TELEPORT_MARKER);
		if (matchClientComp) {
			const [, uid, clientId] = matchClientComp;
			if (!uid || !clientId) {
				continue;
			}
			html = html.replace(new RegExp(` data-island-uid="${uid}" data-island-component="${clientId}"[^>]*>`), (full) => {
				return full + teleports[key];
			});
			continue;
		}
		const matchSlot = key.match(SSR_SLOT_TELEPORT_MARKER);
		if (matchSlot) {
			const [, uid, slot] = matchSlot;
			if (!uid || !slot) {
				continue;
			}
			html = html.replace(new RegExp(` data-island-uid="${uid}" data-island-slot="${slot}"[^>]*>`), (full) => {
				return full + teleports[key];
			});
		}
	}
	return html;
}

const ISLAND_SUFFIX_RE = /\.json(?:\?.*)?$/;
const handler$1 = defineEventHandler(async (event) => {
	const nitroApp = useNitroApp();
	setResponseHeaders(event, {
		"content-type": "application/json;charset=utf-8",
		"x-powered-by": "Nuxt"
	});
	const islandContext = await getIslandContext(event);
	const ssrContext = {
		...createSSRContext(event),
		islandContext,
		noSSR: false,
		url: islandContext.url
	};
	
	const renderer = await getSSRRenderer();
	const renderResult = await renderer.renderToString(ssrContext).catch(async (err) => {
		if (ssrContext["~renderResponse"] && err?.message === "skipping render") {
			return {};
		}
		await ssrContext.nuxt?.hooks.callHook("app:error", err);
		throw err;
	});
	
	
	await ssrContext.nuxt?.hooks.callHook("app:rendered", {
		ssrContext,
		renderResult
	});
	if (ssrContext["~renderResponse"]) {
		const response = ssrContext["~renderResponse"];
		if (response.statusCode && response.statusCode >= 400) {
			throw createError({
				statusCode: response.statusCode,
				statusMessage: response.statusMessage
			});
		}
		return returnIslandResponse(event, response);
	}
	
	if (ssrContext.payload?.error) {
		throw ssrContext.payload.error;
	}
	const inlinedStyles = await renderInlineStyles(ssrContext.modules ?? []);
	if (inlinedStyles.length) {
		ssrContext.head.push({ style: inlinedStyles });
	}
	{
		const { styles } = getRequestDependencies(ssrContext, renderer.rendererContext);
		const link = [];
		for (const resource of Object.values(styles)) {
			
			if ("inline" in getQuery(resource.file)) {
				continue;
			}
			
			
			if (resource.file.includes("scoped") && !resource.file.includes("pages/")) {
				link.push({
					rel: "stylesheet",
					href: renderer.rendererContext.buildAssetsURL(resource.file),
					crossorigin: ""
				});
			}
		}
		if (link.length) {
			ssrContext.head.push({ link }, { mode: "server" });
		}
	}
	const islandHead = {};
	for (const entry of ssrContext.head.entries.values()) {
		
		for (const [key, value] of Object.entries(resolveUnrefHeadInput(entry.input))) {
			const currentValue = islandHead[key];
			if (Array.isArray(currentValue)) {
				currentValue.push(...value);
			} else {
				islandHead[key] = value;
			}
		}
	}
	const islandResponse = {
		id: islandContext.id,
		head: islandHead,
		html: getServerComponentHTML(renderResult.html),
		components: getClientIslandResponse(ssrContext),
		slots: getSlotIslandResponse(ssrContext)
	};
	await nitroApp.hooks.callHook("render:island", islandResponse, {
		event,
		islandContext
	});
	return islandResponse;
});
function returnIslandResponse(event, response) {
	for (const header in response.headers || {}) {
		setResponseHeader(event, header, response.headers[header]);
	}
	if (response.statusCode) {
		setResponseStatus(event, response.statusCode, response.statusMessage);
	}
	return response.body;
}
const ISLAND_PATH_PREFIX = "/__nuxt_island/";
const VALID_COMPONENT_NAME_RE = /^[a-z][\w.-]*$/i;
async function getIslandContext(event) {
	let url = event.path || "";
	url.replace(/\?.*$/, "");
	if (!url.startsWith(ISLAND_PATH_PREFIX)) {
		throw createError({
			statusCode: 400,
			statusMessage: "Invalid island request path"
		});
	}
	const componentParts = url.substring(ISLAND_PATH_PREFIX.length).replace(ISLAND_SUFFIX_RE, "").split("_");
	const hashId = componentParts.length > 1 ? componentParts.pop() : undefined;
	const componentName = componentParts.join("_");
	if (!componentName || !VALID_COMPONENT_NAME_RE.test(componentName)) {
		throw createError({
			statusCode: 400,
			statusMessage: "Invalid island component name"
		});
	}
	const rawContext = event.method === "GET" ? getQuery$1(event) : await readBody(event);
	const rawProps = destr$1(rawContext?.props) || {};
	const filteredProps = filterIslandProps(rawProps);
	
	
	const clientContext = {};
	if (rawContext && typeof rawContext === "object") {
		for (const key in rawContext) {
			if (key !== "props") {
				clientContext[key] = rawContext[key];
			}
		}
	}
	
	
	const expectedHash = computeIslandHash(componentName, filteredProps, clientContext, undefined);
	if (!hashId || hashId !== expectedHash) {
		throw createError({
			statusCode: 400,
			statusMessage: "Invalid island request hash"
		});
	}
	return {
		url: typeof rawContext?.url === "string" ? rawContext.url : "/",
		id: hashId,
		name: componentName,
		props: rawProps,
		slots: {},
		components: {}
	};
}

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

const _lazy_FaiDIZ = () => Promise.resolve().then(function () { return _id__get$3; });
const _lazy_QAyDq3 = () => Promise.resolve().then(function () { return delete_delete$1; });
const _lazy_M0BQ9P = () => Promise.resolve().then(function () { return forgot_post$1; });
const _lazy_M4ndqB = () => Promise.resolve().then(function () { return login_post$1; });
const _lazy_d8uRs7 = () => Promise.resolve().then(function () { return reset$1; });
const _lazy_z7u2Qs = () => Promise.resolve().then(function () { return signup_post$1; });
const _lazy_bz6IRH = () => Promise.resolve().then(function () { return index_get$d; });
const _lazy_0YaBRe = () => Promise.resolve().then(function () { return index_delete$5; });
const _lazy_Df3_bo = () => Promise.resolve().then(function () { return index_get$b; });
const _lazy_uu0vQv = () => Promise.resolve().then(function () { return save_post$3; });
const _lazy_6dQdG0 = () => Promise.resolve().then(function () { return toggle_post$1; });
const _lazy_vknMpb = () => Promise.resolve().then(function () { return vary_post$1; });
const _lazy_oJWXNf = () => Promise.resolve().then(function () { return lead_get$1; });
const _lazy_kQloHj = () => Promise.resolve().then(function () { return cron$1; });
const _lazy_6aFyol = () => Promise.resolve().then(function () { return create_post$3; });
const _lazy_tq6B3q = () => Promise.resolve().then(function () { return delete_post$1; });
const _lazy_TuGNAE = () => Promise.resolve().then(function () { return index_get$9; });
const _lazy__fdLCf = () => Promise.resolve().then(function () { return update_post$1; });
const _lazy_fhNUjB = () => Promise.resolve().then(function () { return analyse_post$1; });
const _lazy_0rvesM = () => Promise.resolve().then(function () { return contacted_post$1; });
const _lazy_yBxanF = () => Promise.resolve().then(function () { return draft_post$1; });
const _lazy_qc34eq = () => Promise.resolve().then(function () { return index_delete$3; });
const _lazy_i2f0Wa = () => Promise.resolve().then(function () { return index_get$7; });
const _lazy_f4xwzm = () => Promise.resolve().then(function () { return index_put$3; });
const _lazy_ygINZT = () => Promise.resolve().then(function () { return schedule_post$1; });
const _lazy_lZmAO2 = () => Promise.resolve().then(function () { return sendMessage_post$1; });
const _lazy_IxLe3T = () => Promise.resolve().then(function () { return sendQuestionnaire_post$1; });
const _lazy_YUWevn = () => Promise.resolve().then(function () { return create_post$1; });
const _lazy_t9F3bu = () => Promise.resolve().then(function () { return index_get$5; });
const _lazy_0Doaks = () => Promise.resolve().then(function () { return tiers_get$1; });
const _lazy_i191PU = () => Promise.resolve().then(function () { return _id__get$1; });
const _lazy_rVP_UB = () => Promise.resolve().then(function () { return _token__get$1; });
const _lazy_JYmLBo = () => Promise.resolve().then(function () { return _token__post$1; });
const _lazy_rfaZfx = () => Promise.resolve().then(function () { return generate_post$1; });
const _lazy_Z1oZ9j = () => Promise.resolve().then(function () { return index_delete$1; });
const _lazy_W7kQn6 = () => Promise.resolve().then(function () { return index_get$3; });
const _lazy_YyhPdT = () => Promise.resolve().then(function () { return save_post$1; });
const _lazy_PGwJYq = () => Promise.resolve().then(function () { return status_post$1; });
const _lazy_UPg2Ir = () => Promise.resolve().then(function () { return subscribe_post$1; });
const _lazy_pjRUBv = () => Promise.resolve().then(function () { return webhook_post$1; });
const _lazy_JDeNrs = () => Promise.resolve().then(function () { return testReminder_get$1; });
const _lazy_zchBPt = () => Promise.resolve().then(function () { return cardStyle_post$1; });
const _lazy_wZagNx = () => Promise.resolve().then(function () { return headshot_delete$1; });
const _lazy_HddarY = () => Promise.resolve().then(function () { return headshot_post$1; });
const _lazy_V0fc_M = () => Promise.resolve().then(function () { return index_get$1; });
const _lazy_24ztMZ = () => Promise.resolve().then(function () { return index_put$1; });
const _lazy_q1wdXI = () => Promise.resolve().then(function () { return tour_post$1; });
const _lazy_5mZRNa = () => Promise.resolve().then(function () { return voice_post$1; });
const _lazy_mqdDEE = () => Promise.resolve().then(function () { return renderer; });

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
  { route: '/api/leads/:id/analyse', handler: _lazy_fhNUjB, lazy: true, middleware: false, method: "post" },
  { route: '/api/leads/:id/contacted', handler: _lazy_0rvesM, lazy: true, middleware: false, method: "post" },
  { route: '/api/leads/:id/draft', handler: _lazy_yBxanF, lazy: true, middleware: false, method: "post" },
  { route: '/api/leads/:id', handler: _lazy_qc34eq, lazy: true, middleware: false, method: "delete" },
  { route: '/api/leads/:id', handler: _lazy_i2f0Wa, lazy: true, middleware: false, method: "get" },
  { route: '/api/leads/:id', handler: _lazy_f4xwzm, lazy: true, middleware: false, method: "put" },
  { route: '/api/leads/:id/schedule', handler: _lazy_ygINZT, lazy: true, middleware: false, method: "post" },
  { route: '/api/leads/:id/send-message', handler: _lazy_lZmAO2, lazy: true, middleware: false, method: "post" },
  { route: '/api/leads/:id/send-questionnaire', handler: _lazy_IxLe3T, lazy: true, middleware: false, method: "post" },
  { route: '/api/leads/create', handler: _lazy_YUWevn, lazy: true, middleware: false, method: "post" },
  { route: '/api/leads', handler: _lazy_t9F3bu, lazy: true, middleware: false, method: "get" },
  { route: '/api/leads/tiers', handler: _lazy_0Doaks, lazy: true, middleware: false, method: "get" },
  { route: '/api/qr_code/:id', handler: _lazy_i191PU, lazy: true, middleware: false, method: "get" },
  { route: '/api/qualify/:token', handler: _lazy_rVP_UB, lazy: true, middleware: false, method: "get" },
  { route: '/api/qualify/:token', handler: _lazy_JYmLBo, lazy: true, middleware: false, method: "post" },
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
  { route: '/__nuxt_island/**', handler: handler$1, lazy: false, middleware: false, method: undefined },
  { route: '/_ipx/**', handler: _DGH2dc, lazy: false, middleware: false, method: undefined },
  { route: '/_fonts/**', handler: _lazy_mqdDEE, lazy: true, middleware: false, method: undefined },
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
    debug: destr(true),
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
  const router = createRouter$1({
    preemptive: true
  });
  const nodeHandler = toNodeListener(h3App);
  const localCall = (aRequest) => callNodeRequestHandler(
    nodeHandler,
    aRequest
  );
  const localFetch = (input, init) => {
    if (!input.toString().startsWith("/")) {
      return globalThis.fetch(input, init);
    }
    return fetchNodeRequestHandler(
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

if (!globalThis.crypto) {
  globalThis.crypto = crypto$1.webcrypto;
}
const { NITRO_NO_UNIX_SOCKET, NITRO_DEV_WORKER_ID } = process.env;
trapUnhandledNodeErrors();
parentPort?.on("message", (msg) => {
  if (msg && msg.event === "shutdown") {
    shutdown();
  }
});
const nitroApp = useNitroApp();
const server$1 = new Server(toNodeListener(nitroApp.h3App));
let listener;
listen().catch(() => listen(
  true
  /* use random port */
)).catch((error) => {
  console.error("Dev worker failed to listen:", error);
  return shutdown();
});
nitroApp.router.get(
  "/_nitro/tasks",
  defineEventHandler(async (event) => {
    const _tasks = await Promise.all(
      Object.entries(tasks).map(async ([name, task]) => {
        const _task = await task.resolve?.();
        return [name, { description: _task?.meta?.description }];
      })
    );
    return {
      tasks: Object.fromEntries(_tasks),
      scheduledTasks
    };
  })
);
nitroApp.router.use(
  "/_nitro/tasks/:name",
  defineEventHandler(async (event) => {
    const name = getRouterParam(event, "name");
    const payload = {
      ...getQuery$1(event),
      ...await readBody(event).then((r) => r?.payload).catch(() => ({}))
    };
    return await runTask(name, { payload });
  })
);
{
  startScheduleRunner();
}
function listen(useRandomPort = Boolean(
  NITRO_NO_UNIX_SOCKET || process.versions.webcontainer || "Bun" in globalThis && process.platform === "win32"
)) {
  return new Promise((resolve, reject) => {
    try {
      listener = server$1.listen(useRandomPort ? 0 : getSocketAddress(), () => {
        const address = server$1.address();
        parentPort?.postMessage({
          event: "listen",
          address: typeof address === "string" ? { socketPath: address } : { host: "localhost", port: address?.port }
        });
        resolve();
      });
    } catch (error) {
      reject(error);
    }
  });
}
function getSocketAddress() {
  const socketName = `nitro-worker-${process.pid}-${threadId}-${NITRO_DEV_WORKER_ID}-${Math.round(Math.random() * 1e4)}.sock`;
  if (process.platform === "win32") {
    return join(String.raw`\\.\pipe`, socketName);
  }
  if (process.platform === "linux") {
    const nodeMajor = Number.parseInt(process.versions.node.split(".")[0], 10);
    if (nodeMajor >= 20) {
      return `\0${socketName}`;
    }
  }
  return join(tmpdir(), socketName);
}
async function shutdown() {
  server$1.closeAllConnections?.();
  await Promise.all([
    new Promise((resolve) => listener?.close(resolve)),
    nitroApp.hooks.callHook("close").catch(console.error)
  ]);
  parentPort?.postMessage({ event: "exit" });
}

const _messages = {
	"appName": "Nuxt",
	"status": 500,
	"statusText": "Internal server error",
	"description": "This page is temporarily unavailable.",
	"refresh": "Refresh this page"
};
const template$1 = (messages) => {
	messages = {
		..._messages,
		...messages
	};
	return "<!DOCTYPE html><html lang=\"en\"><head><title>" + escapeHtml(messages.status) + " - " + escapeHtml(messages.statusText) + " | " + escapeHtml(messages.appName) + "</title><meta charset=\"utf-8\"><meta content=\"width=device-width,initial-scale=1.0,minimum-scale=1.0\" name=\"viewport\"><script>!function(){const e=document.createElement(\"link\").relList;if(!(e&&e.supports&&e.supports(\"modulepreload\"))){for(const e of document.querySelectorAll('link[rel=\"modulepreload\"]'))r(e);new MutationObserver(e=>{for(const o of e)if(\"childList\"===o.type)for(const e of o.addedNodes)\"LINK\"===e.tagName&&\"modulepreload\"===e.rel&&r(e)}).observe(document,{childList:!0,subtree:!0})}function r(e){if(e.ep)return;e.ep=!0;const r=function(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),\"use-credentials\"===e.crossOrigin?r.credentials=\"include\":\"anonymous\"===e.crossOrigin?r.credentials=\"omit\":r.credentials=\"same-origin\",r}(e);fetch(e.href,r)}}();<\/script><style>*,:after,:before{box-sizing:border-box;border-width:0;border-style:solid;border-color:var(--un-default-border-color,#e5e7eb)}:after,:before{--un-content:\"\"}html{line-height:1.5;-webkit-text-size-adjust:100%;-moz-tab-size:4;tab-size:4;font-family:ui-sans-serif,system-ui,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji;font-feature-settings:normal;font-variation-settings:normal;-webkit-tap-highlight-color:transparent}body{margin:0;line-height:inherit}h1,h2{font-size:inherit;font-weight:inherit}h1,h2,p{margin:0}*,:after,:before{--un-rotate:0;--un-rotate-x:0;--un-rotate-y:0;--un-rotate-z:0;--un-scale-x:1;--un-scale-y:1;--un-scale-z:1;--un-skew-x:0;--un-skew-y:0;--un-translate-x:0;--un-translate-y:0;--un-translate-z:0;--un-pan-x: ;--un-pan-y: ;--un-pinch-zoom: ;--un-scroll-snap-strictness:proximity;--un-ordinal: ;--un-slashed-zero: ;--un-numeric-figure: ;--un-numeric-spacing: ;--un-numeric-fraction: ;--un-border-spacing-x:0;--un-border-spacing-y:0;--un-ring-offset-shadow:0 0 transparent;--un-ring-shadow:0 0 transparent;--un-shadow-inset: ;--un-shadow:0 0 transparent;--un-ring-inset: ;--un-ring-offset-width:0px;--un-ring-offset-color:#fff;--un-ring-width:0px;--un-ring-color:rgba(147,197,253,.5);--un-blur: ;--un-brightness: ;--un-contrast: ;--un-drop-shadow: ;--un-grayscale: ;--un-hue-rotate: ;--un-invert: ;--un-saturate: ;--un-sepia: ;--un-backdrop-blur: ;--un-backdrop-brightness: ;--un-backdrop-contrast: ;--un-backdrop-grayscale: ;--un-backdrop-hue-rotate: ;--un-backdrop-invert: ;--un-backdrop-opacity: ;--un-backdrop-saturate: ;--un-backdrop-sepia: }.grid{display:grid}.mb-2{margin-bottom:.5rem}.mb-4{margin-bottom:1rem}.max-w-520px{max-width:520px}.min-h-screen{min-height:100vh}.place-content-center{place-content:center}.overflow-hidden{overflow:hidden}.bg-white{--un-bg-opacity:1;background-color:rgb(255 255 255/var(--un-bg-opacity))}.px-2{padding-left:.5rem;padding-right:.5rem}.text-center{text-align:center}.text-\\[80px\\]{font-size:80px}.text-2xl{font-size:1.5rem;line-height:2rem}.text-\\[\\#020420\\]{--un-text-opacity:1;color:rgb(2 4 32/var(--un-text-opacity))}.text-\\[\\#64748B\\]{--un-text-opacity:1;color:rgb(100 116 139/var(--un-text-opacity))}.font-semibold{font-weight:600}.leading-none{line-height:1}.tracking-wide{letter-spacing:.025em}.font-sans{font-family:ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji}.tabular-nums{--un-numeric-spacing:tabular-nums;font-variant-numeric:var(--un-ordinal) var(--un-slashed-zero) var(--un-numeric-figure) var(--un-numeric-spacing) var(--un-numeric-fraction)}.antialiased{-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}@media(prefers-color-scheme:dark){.dark\\:bg-\\[\\#020420\\]{--un-bg-opacity:1;background-color:rgb(2 4 32/var(--un-bg-opacity))}.dark\\:text-white{--un-text-opacity:1;color:rgb(255 255 255/var(--un-text-opacity))}}@media(min-width:640px){.sm\\:text-\\[110px\\]{font-size:110px}.sm\\:text-3xl{font-size:1.875rem;line-height:2.25rem}}</style></head><body class=\"antialiased bg-white dark:bg-[#020420] dark:text-white font-sans grid min-h-screen overflow-hidden place-content-center text-[#020420] tracking-wide\"><div class=\"max-w-520px text-center\"><h1 class=\"font-semibold leading-none mb-4 sm:text-[110px] tabular-nums text-[80px]\">" + escapeHtml(messages.status) + "</h1><h2 class=\"font-semibold mb-2 sm:text-3xl text-2xl\">" + escapeHtml(messages.statusText) + "</h2><p class=\"mb-4 px-2 text-[#64748B] text-md\">" + escapeHtml(messages.description) + "</p></div></body></html>";
};

const error500 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  template: template$1
}, Symbol.toStringTag, { value: 'Module' }));

const campaignSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
    index: true
  },
  title: { type: String, required: true },
  targetStatus: { type: String, required: true },
  // 'new', 'appointment', 'active', etc.
  subject: { type: String, required: true },
  messageBody: { type: String, required: true },
  dayOfWeek: { type: Number, required: true, min: 0, max: 6 },
  // 0 = Sun, 1 = Mon, etc.
  // Cadence: how often the campaign repeats.
  //   4 = weekly, 2 = biweekly (every other week), 1 = monthly (every 4 weeks)
  // Kept the field name for backwards-compat with existing saved campaigns.
  timesPerMonth: { type: Number, required: true, enum: [1, 2, 4], default: 1 },
  // Whether this campaign is currently sending. Lets realtors pause a
  // sequence without deleting it.
  active: { type: Boolean, default: true },
  lastFiredAt: { type: Date, default: null }
}, { timestamps: true });
const CampaignModelImport = mongoose.models.Campaign || mongoose.model("Campaign", campaignSchema);

function useCleanString(str) {
  return str.replace(/[^a-zA-Z0-9]/g, "");
}

function email_by_status(status, lead_name, company_name) {
  const greeting = `Hi ${lead_name},

`;
  const signoff = `

Best,

${company_name}`;
  switch (status.toLowerCase()) {
    case "new":
      return greeting + `Thanks for checking out the property info details through our digital flyer.

I wanted to personally reach out and see if you had any quick questions about the home, the neighborhood, or local market trends that I can track down for you?

Just reply straight to this email whenever you have a second.` + signoff;
    case "appointment":
      return greeting + `I'm looking forward to our upcoming strategy session to go over your property goals.

Before we sync up, did any quick questions pop up about the neighborhood, local market data, or specific listings you've been tracking online?

Just reply straight to this email if there's anything specific you want me to pull ahead of time.` + signoff;
    case "active":
      return greeting + `We've been keeping a close eye on the market for you, and a few interesting shifts are happening locally.

As we keep sorting through inventory, do you have any quick questions about recent listings, pricing adjustments, or neighborhood trends?

Just reply straight to this email whenever you have a second and we can fine-tune our search.` + signoff;
    case "under contract":
      return greeting + `Things are moving along beautifully behind the scenes on your contract file.

I know there are a lot of moving parts right now during escrow. Did you have any quick questions about the inspection timelines, appraisal parameters, or next steps that I can clarify for you?

Just reply straight to this email whenever you have a second\u2014I'm tracking everything closely.` + signoff;
    case "closed":
      return greeting + `Congratulations again on your recent closing! I hope you are settling into the new space perfectly.

Now that the dust has settled, I wanted to reach out and see if you had any remaining questions about the home, local utility configurations, or contractors in the area?

Just reply straight to this email if anything comes up. I'm always here to help.` + signoff;
    case "archive":
      return greeting + `It's been a little while since we last touched base about your property search parameters.

I wanted to quickly check in and see if you had any new questions about the local market trends, or if your home buying timelines have shifted at all recently?

Just reply straight to this email whenever you have a second if you'd like to dive back in.` + signoff;
    default:
      return greeting + `I wanted to personally reach out and check in on your real estate goals.

Did you have any quick questions about current listings, neighborhood developments, or local market trends that I can track down for you?

Just reply straight to this email whenever you have a second.` + signoff;
  }
}

const LeadModel$9 = schemaImport;
const CampaignModel$1 = CampaignModelImport;
const resend$2 = new Resend(process.env.RESEND_KEY);
function localWeekday(tz, now) {
  var _a, _b, _c;
  try {
    const parts = new Intl.DateTimeFormat("en-US", {
      timeZone: tz,
      weekday: "short"
    }).formatToParts(now);
    const weekdayStr = (_b = (_a = parts.find((p) => p.type === "weekday")) == null ? void 0 : _a.value) != null ? _b : "";
    const dayMap = {
      Sun: 0,
      Mon: 1,
      Tue: 2,
      Wed: 3,
      Thu: 4,
      Fri: 5,
      Sat: 6
    };
    return (_c = dayMap[weekdayStr]) != null ? _c : now.getUTCDay();
  } catch {
    return now.getUTCDay();
  }
}
function minDaysBetweenFires(timesPerMonth) {
  switch (timesPerMonth) {
    case 4:
      return 6;
    // weekly
    case 2:
      return 13;
    // biweekly
    case 1:
      return 27;
    // monthly
    default:
      return 27;
  }
}
const reminders = defineTask({
  meta: {
    name: "lead:reminders",
    description: "Processes custom individual queues and recurring marketing blasts"
  },
  async run() {
    var _a;
    console.log("Orchestrating automated pipelines...");
    await connectDB();
    const now = /* @__PURE__ */ new Date();
    const startOfToday = new Date((/* @__PURE__ */ new Date()).setHours(0, 0, 0, 0));
    let individualSent = 0;
    let campaignsFired = 0;
    let campaignEmails = 0;
    try {
      const activeQueue = await LeadModel$9.find({
        reminderStatus: "scheduled",
        reminderScheduledAt: { $lte: now },
        email: { $ne: "", $exists: true }
      }).populate("userId");
      if (activeQueue.length > 0) {
        const individualOps = [];
        for (const lead of activeQueue) {
          const company_name = (lead == null ? void 0 : lead.company_name) || "Your Connected Realtor";
          const replyEmail = lead == null ? void 0 : lead.company_email;
          const lead_name = lead.name ? lead.name.split(" ")[0] : "there";
          const status = lead == null ? void 0 : lead.status;
          const useResponse = email_by_status(status, lead_name, company_name);
          await resend$2.emails.send({
            from: `${useCleanString(company_name)}@ascendpod.com`,
            to: lead.email,
            replyTo: replyEmail,
            subject: "Quick question regarding your property search",
            text: useResponse
          });
          individualSent++;
          individualOps.push({
            updateOne: {
              filter: { _id: lead._id },
              update: {
                $set: { reminderStatus: "sent", lastContactedAt: now },
                $inc: { contactCount: 1 },
                $unset: { reminderScheduledAt: "" }
              }
            }
          });
        }
        await LeadModel$9.bulkWrite(individualOps, { ordered: false });
      }
      const candidateCampaigns = await CampaignModel$1.find({
        active: { $ne: false },
        // treat missing 'active' as active (legacy rows)
        $or: [
          { lastFiredAt: null },
          { lastFiredAt: { $lt: startOfToday } }
        ]
      }).populate("userId");
      for (const campaign of candidateCampaigns) {
        const tz = ((_a = campaign.userId) == null ? void 0 : _a.timezone) || "America/Denver";
        const localDay = localWeekday(tz, now);
        if (campaign.dayOfWeek !== localDay) continue;
        if (campaign.lastFiredAt) {
          const daysSinceLastFire = (now.getTime() - new Date(campaign.lastFiredAt).getTime()) / (1e3 * 60 * 60 * 24);
          if (daysSinceLastFire < minDaysBetweenFires(campaign.timesPerMonth)) {
            continue;
          }
        }
        const targets = await LeadModel$9.find({
          userId: campaign.userId._id,
          status: campaign.targetStatus,
          email: { $ne: "", $exists: true }
        }).lean();
        if (targets.length > 0) {
          const agentName = campaign.userId.name || "Your Realtor";
          const batchPayload = targets.map((lead) => {
            const greetingName = lead.name ? lead.name.split(" ")[0] : "there";
            const personalizedText = campaign.messageBody.replace(/{{name}}/g, greetingName).replace(/{{agent}}/g, agentName);
            return {
              from: `${useCleanString(agentName)}@ascendpod.com`,
              to: lead.email,
              replyTo: campaign.userId.email || "whiteravendev90@gmail.com",
              subject: campaign.subject,
              text: personalizedText
            };
          });
          await resend$2.batch.send(batchPayload);
          campaignEmails += batchPayload.length;
          await LeadModel$9.updateMany(
            { _id: { $in: targets.map((t) => t._id) } },
            { $set: { lastContactedAt: now }, $inc: { contactCount: 1 } }
          );
        }
        campaign.lastFiredAt = now;
        await campaign.save();
        campaignsFired++;
      }
      const summary = {
        result: "All background delivery pipelines processed successfully.",
        individualSent,
        campaignsFired,
        campaignEmails
      };
      console.log("Pipeline summary:", summary);
      return summary;
    } catch (error) {
      console.error("Automation engine loop failed:", error);
      return { result: `Fault: ${error.message}` };
    }
  }
});

const reminders$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: reminders
}, Symbol.toStringTag, { value: 'Module' }));

const server = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: viteNodeEntry_mjs
}, Symbol.toStringTag, { value: 'Module' }));

const client_manifest = () => viteNodeFetch.getManifest();

const client_manifest$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: client_manifest
}, Symbol.toStringTag, { value: 'Module' }));

const template = "";

const _virtual__spaTemplate = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  template: template
}, Symbol.toStringTag, { value: 'Module' }));

const styles = {};

const styles$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: styles
}, Symbol.toStringTag, { value: 'Module' }));

const assetSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
    index: true
  },
  kind: {
    type: String,
    enum: ["headshot", "logo"],
    default: "headshot",
    index: true
  },
  mime: { type: String, default: "image/jpeg" },
  /** Raw base64 (no data: prefix) */
  data: { type: String, required: true },
  bytes: { type: Number, default: 0 },
  width: { type: Number, default: 0 },
  height: { type: Number, default: 0 }
}, { timestamps: true });
assetSchema.index({ userId: 1, kind: 1 }, { unique: true });
const AssetModel = mongoose.models.Asset || mongoose.model("Asset", assetSchema);

const Asset$2 = AssetModel;
const _id__get$2 = defineEventHandler(async (event) => {
  var _a;
  const id = (_a = event.context.params) == null ? void 0 : _a.id;
  if (!id) throw createError({ statusCode: 400, message: "Missing id." });
  await connectDB();
  const asset = await Asset$2.findOne({ userId: id, kind: "headshot" }).lean();
  if (!(asset == null ? void 0 : asset.data)) {
    throw createError({ statusCode: 404, message: "No headshot." });
  }
  const buffer = Buffer.from(asset.data, "base64");
  setHeader(event, "Content-Type", asset.mime || "image/jpeg");
  setHeader(event, "Content-Length", buffer.length);
  setHeader(event, "Cache-Control", "public, max-age=31536000, immutable");
  return buffer;
});

const _id__get$3 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: _id__get$2
}, Symbol.toStringTag, { value: 'Module' }));

const User$a = UserModelImport;
const loggedInUser = defineEventHandler(async (event) => {
  await connectDB();
  const { user } = await requireUserSession(event);
  const userEmail = user == null ? void 0 : user.email;
  try {
    const findUser = await User$a.findOne({ email: userEmail });
    if (!findUser) {
      throw createError({ statusCode: 401, statusMessage: "Unauthorized" });
    }
    return findUser;
  } catch (error) {
    if (error == null ? void 0 : error.statusCode) throw error;
    console.error("loggedInUser lookup failed:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Something went wrong."
    });
  }
});

const homeSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
    index: true
  },
  name: { type: String, required: false },
  address: { type: String, required: true },
  owner: { type: String, required: false },
  notes: { type: String, required: false },
  // Lets a realtor keep sold listings for reference without them cluttering
  // the form dropdown.
  status: {
    type: String,
    enum: ["active", "pending", "sold"],
    default: "active",
    index: true
  }
}, { timestamps: true });
const HomeModel = mongoose.models.Home || mongoose.model("Home", homeSchema);

const UserDoc$1 = UserModelImport;
const Lead$7 = schemaImport;
const Campaign$5 = CampaignModelImport;
const Home$3 = HomeModel;
const stripe$2 = new Stripe(process.env.STRIPE_SECRET_KEY);
const delete_delete = defineEventHandler(async (event) => {
  try {
    const user = await loggedInUser(event);
    if (!(user == null ? void 0 : user._id)) {
      throw createError({ statusCode: 401, statusMessage: "Session expired." });
    }
    const stripeSubscriptionId = user == null ? void 0 : user.stripeSubscriptionId;
    if (stripeSubscriptionId) {
      try {
        await stripe$2.subscriptions.cancel(stripeSubscriptionId);
      } catch (err) {
        console.error("Stripe cancellation during account deletion failed:", err.message);
      }
    }
    await Promise.all([
      Lead$7.deleteMany({ userId: user._id }),
      Campaign$5.deleteMany({ userId: user._id }),
      Home$3.deleteMany({ userId: user._id })
    ]);
    await UserDoc$1.deleteOne({ _id: user._id });
  } catch (error) {
    console.log(error);
    throw createError({
      statusCode: 401,
      statusMessage: "Please try again."
    });
  }
});

const delete_delete$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: delete_delete
}, Symbol.toStringTag, { value: 'Module' }));

const User$9 = UserModelImport;
const bodySchema$m = z.object({
  email: z.email(),
  question: z.string()
});
const forgot_post = defineEventHandler(async (event) => {
  const { email, question } = await readValidatedBody(event, bodySchema$m.parse);
  const token = nanoid(32);
  const htmlBody = `
    <div>
        <h1>Welcome to GhostForm</h1>
        <a href="${process.env.PROJECT_DOMAIN}/${token}/resetpassword">Click here to reset password</a>
    </div>
    `;
  try {
    await connectDB();
    if (question !== "7") throw createError({ statusCode: 401, statusMessage: "Try again" });
    else {
      const userFound = await User$9.findOne({ email });
      if (!userFound) throw createError({ statusCode: 401, statusMessage: "Wrong credentials" });
      const resend = new Resend(`${process.env.RESEND_KEY}`);
      await resend.emails.send({
        from: "NoReply@ascendpod.com",
        to: [email],
        subject: "Reset your password",
        // Subject line
        html: htmlBody
      });
      await User$9.findOneAndUpdate({ email: email.toLowerCase().trim() }, { resetPasswordToken: token });
    }
  } catch (error) {
    console.log(error);
    throw createError({
      statusCode: 401,
      message: "Please try again"
    });
  }
});

const forgot_post$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: forgot_post
}, Symbol.toStringTag, { value: 'Module' }));

const User$8 = UserModelImport;
const bodySchema$l = z.object({
  email: z.email(),
  password: z.string().min(8)
});
const login_post = defineEventHandler(async (event) => {
  var _a;
  const { email, password } = await readValidatedBody(event, bodySchema$l.parse);
  try {
    await connectDB();
    const user = await User$8.findOne({ email });
    const passwordMatches = bcrypt.compare(password, (_a = user == null ? void 0 : user.password) != null ? _a : "");
    if (await passwordMatches) {
      await setUserSession(event, {
        user: {
          _id: user == null ? void 0 : user._id,
          company: (user == null ? void 0 : user.company) || "",
          company_hashed: (user == null ? void 0 : user.company_hashed) || "",
          role: (user == null ? void 0 : user.role) || "",
          category: (user == null ? void 0 : user.category) || "",
          category_hashed: (user == null ? void 0 : user.category_hashed) || "",
          qr_code_slug: (user == null ? void 0 : user.qr_code_slug) || "",
          total_scans: (user == null ? void 0 : user.total_scans) || "",
          leads_captured: (user == null ? void 0 : user.leads_captured) || "",
          first_name: (user == null ? void 0 : user.first_name) || "",
          last_name: (user == null ? void 0 : user.last_name) || "",
          email: (user == null ? void 0 : user.email) || "",
          email_hashed: (user == null ? void 0 : user.email_hashed) || "",
          phone: (user == null ? void 0 : user.phone) || "",
          password: (user == null ? void 0 : user.password) || "",
          street_address: (user == null ? void 0 : user.street_address) || "",
          city: (user == null ? void 0 : user.city) || "",
          country: (user == null ? void 0 : user.country) || "",
          postal_code: (user == null ? void 0 : user.postal_code) || "",
          reset_password_token: (user == null ? void 0 : user.reset_password_token) || "",
          privacy_policy: (user == null ? void 0 : user.privacy_policy) || "",
          paid: (user == null ? void 0 : user.paid) || "",
          paid_tier: (user == null ? void 0 : user.paid_tier) || "",
          // leads: [lead] || '',
          createdAt: (user == null ? void 0 : user.createdAt) || "",
          updatedAt: (user == null ? void 0 : user.updatedAt) || ""
        }
      });
    } else {
      throw createError({ statusCode: 401, statusMessage: "Wrong credentials" });
    }
  } catch (error) {
    console.log(error);
    throw createError({
      statusCode: 401,
      message: "Please try again"
    });
  }
});

const login_post$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: login_post
}, Symbol.toStringTag, { value: 'Module' }));

const User$7 = UserModelImport;
const bodySchema$k = z.object({
  password: z.string(),
  confirm_password: z.string(),
  token: z.string()
});
const reset = defineEventHandler(async (event) => {
  const { password, confirm_password, token } = await readValidatedBody(event, bodySchema$k.parse);
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    await connectDB();
    if (password !== confirm_password) throw createError({ statusCode: 401, statusMessage: "Try again" });
    await User$7.findOneAndUpdate({ resetPasswordToken: token }, {
      password: hashedPassword
    });
  } catch (error) {
    console.log(error);
    throw createError({
      statusCode: 401,
      message: "Please try again"
    });
  }
});

const reset$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: reset
}, Symbol.toStringTag, { value: 'Module' }));

const User$6 = UserModelImport;
const bodySchema$j = z.object({
  company: z.string(),
  category: z.string(),
  email: z.email(),
  password: z.string().min(8),
  confirm_password: z.string().min(8),
  privacy_policy: z.boolean()
});
const signup_post = defineEventHandler(async (event) => {
  const { company, category, email, password, confirm_password, privacy_policy } = await readValidatedBody(event, bodySchema$j.parse);
  try {
    await connectDB();
    const user = await User$6.findOne({ email });
    const hashedPassword = await bcrypt.hash(password, 10);
    const hashedEmail = await bcrypt.hash(email, 15);
    const hashedCompany = await bcrypt.hash(company, 15);
    const hashedCategory = await bcrypt.hash(category, 15);
    if (!password) throw createError({ statusCode: 401, statusMessage: "Please insert password.", data: { errorMessage: "The requested item could not be found." } });
    if (!password && !confirm_password) throw createError({ statusCode: 401, statusMessage: "Please insert password.", data: { errorMessage: "The requested item could not be found." } });
    if (password !== confirm_password) throw createError({ statusCode: 401, statusMessage: "Passwords do not match.", data: { errorMessage: "The requested item could not be found." } });
    if (user) throw createError({ statusCode: 401, statusMessage: "User already registered.", data: { errorMessage: "The requested item could not be found." } });
    const registerUser = new User$6({
      company: company.toLowerCase(),
      company_hashed: hashedCompany.trim(),
      category: category.toLowerCase(),
      category_hashed: hashedCategory.trim(),
      email: email.toLowerCase().trim(),
      email_hashed: hashedEmail.trim(),
      password: hashedPassword,
      privacy_policy
    });
    await registerUser.save();
    const sent = await sendWelcomeEmail(email.toLowerCase().trim(), company);
    if (!sent) {
      console.error("[signup] Account created but welcome email did not send:", email);
    }
  } catch (error) {
    console.log(error);
    throw createError({
      statusCode: 401,
      statusMessage: "Please try again."
    });
  }
});

const signup_post$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: signup_post
}, Symbol.toStringTag, { value: 'Module' }));

const index_get$c = defineEventHandler(async (event) => {
  var _a;
  const user = await loggedInUser(event);
  if (!(user == null ? void 0 : user._id)) {
    throw createError({ statusCode: 401, message: "Session trace missing or expired." });
  }
  const briefing = await buildDailyBriefing(String(user._id), {
    cold_lead_after_days: (_a = user.cold_lead_after_days) != null ? _a : 14
  });
  const narrated = await narrateBriefing(briefing);
  if (narrated) briefing.headline = narrated;
  return briefing;
});

const index_get$d = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: index_get$c
}, Symbol.toStringTag, { value: 'Module' }));

const Campaign$4 = CampaignModelImport;
const bodySchema$i = z.object({
  _id: z.string()
});
const index_delete$4 = defineEventHandler(async (event) => {
  try {
    const body = await readValidatedBody(event, bodySchema$i.parse);
    await Campaign$4.deleteOne({ _id: body._id });
  } catch (error) {
    console.log(error);
    throw createError({
      statusCode: 500,
      statusMessage: "Something went wrong."
    });
  }
});

const index_delete$5 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: index_delete$4
}, Symbol.toStringTag, { value: 'Module' }));

const Campaign$3 = CampaignModelImport;
const index_get$a = defineEventHandler(async (event) => {
  const user = await requirePaidUser(event);
  const data = await Campaign$3.find({ userId: user == null ? void 0 : user._id }).sort({ createdAt: -1 }).lean();
  return data;
});

const index_get$b = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: index_get$a
}, Symbol.toStringTag, { value: 'Module' }));

const Campaign$2 = CampaignModelImport;
const save_post$2 = defineEventHandler(async (event) => {
  const body = await readBody(event);
  const user = await loggedInUser(event);
  if (!(user == null ? void 0 : user._id)) {
    throw createError({
      statusCode: 401,
      message: "Session trace missing or expired."
    });
  }
  const { title, targetStatus, subject, messageBody, dayOfWeek, timesPerMonth, varyWording } = body;
  if (!targetStatus || !subject || !messageBody || dayOfWeek === void 0 || !timesPerMonth) {
    throw createError({
      statusCode: 400,
      message: "Missing required automated workflow properties."
    });
  }
  try {
    const campaign = await Campaign$2.create({
      userId: user._id,
      title: title || `${targetStatus.toUpperCase()} Automated Loop`,
      targetStatus,
      subject,
      messageBody,
      dayOfWeek: Number(dayOfWeek),
      timesPerMonth: Number(timesPerMonth),
      // Default ON: repeated identical copy reads as a robot and hurts
      // deliverability. Realtors can opt out per campaign.
      varyWording: varyWording !== false,
      lastFiredAt: null
      // Explicitly initialize as empty queue window ready to fire
    });
    return {
      success: true,
      campaignId: campaign._id,
      message: "Dynamic workflow successfully written to tracking database."
    };
  } catch (error) {
    console.error("Campaign creation failed:", error);
    throw createError({
      statusCode: 500,
      message: error.message || "Failed to instantiate database configuration profile."
    });
  }
});

const save_post$3 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: save_post$2
}, Symbol.toStringTag, { value: 'Module' }));

const Campaign$1 = CampaignModelImport;
const bodySchema$h = z.object({
  _id: z.string(),
  active: z.boolean()
});
const toggle_post = defineEventHandler(async (event) => {
  const user = await loggedInUser(event);
  if (!(user == null ? void 0 : user._id)) {
    throw createError({ statusCode: 401, message: "Session trace missing or expired." });
  }
  const body = await readValidatedBody(event, bodySchema$h.parse);
  try {
    await Campaign$1.updateOne(
      { _id: body._id, userId: user._id },
      { $set: { active: body.active } }
    );
    return { success: true, active: body.active };
  } catch (error) {
    throw createError({ statusCode: 500, message: "Failed to update campaign state." });
  }
});

const toggle_post$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: toggle_post
}, Symbol.toStringTag, { value: 'Module' }));

const Campaign = CampaignModelImport;
const bodySchema$g = z.object({
  _id: z.string(),
  varyWording: z.boolean()
});
const vary_post = defineEventHandler(async (event) => {
  const user = await loggedInUser(event);
  if (!(user == null ? void 0 : user._id)) throw createError({ statusCode: 401, message: "Session expired." });
  const { _id, varyWording } = await readValidatedBody(event, bodySchema$g.parse);
  const res = await Campaign.updateOne(
    { _id, userId: user._id },
    { $set: { varyWording } }
  );
  if (res.matchedCount === 0) {
    throw createError({ statusCode: 404, message: "Campaign not found." });
  }
  return { success: true, varyWording };
});

const vary_post$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: vary_post
}, Symbol.toStringTag, { value: 'Module' }));

function month(date2) {
  const dateObj = new Date(date2);
  return dateObj.toLocaleString("default", { month: "long" });
}

const Lead$6 = schemaImport;
const lead_get = defineEventHandler(async (event) => {
  const user = await requirePaidUser(event);
  const leads = await Lead$6.find({ userId: user == null ? void 0 : user._id }).lean();
  const leadByMonth = leads == null ? void 0 : leads.map((item) => {
    const createdDate = item == null ? void 0 : item.date;
    return month(createdDate);
  });
  const leadCountsByMonth = leadByMonth == null ? void 0 : leadByMonth.reduce((acc, month2) => {
    if (month2 === "Invalid Date" || !month2) return acc;
    acc[month2] = (acc[month2] || 0) + 1;
    return acc;
  }, {});
  const useMonthlyData = Object.entries(leadCountsByMonth != null ? leadCountsByMonth : {}).map(([month2, count]) => {
    return {
      month: month2,
      count
    };
  });
  return {
    monthly: useMonthlyData
  };
});

const lead_get$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: lead_get
}, Symbol.toStringTag, { value: 'Module' }));

const cron = defineEventHandler(async (event) => {
  const authHeader = getHeader(event, "Authorization");
  if (!authHeader || authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    throw createError({
      statusCode: 401,
      message: "Unauthorized system execution footprint."
    });
  }
  try {
    console.log("Vercel Cron triggered: Executing background task engine...");
    const taskResult = await runTask("lead:reminders");
    return {
      success: true,
      executedAt: (/* @__PURE__ */ new Date()).toISOString(),
      ...taskResult
    };
  } catch (error) {
    console.error("Vercel Cron automation step crashed:", error);
    throw createError({
      statusCode: 500,
      message: error.message || "Internal task handler fault."
    });
  }
});

const cron$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: cron
}, Symbol.toStringTag, { value: 'Module' }));

const Lead$5 = HomeModel;
const bodySchema$f = z.object({
  name: z.string().nullish(),
  // The address is the only field that genuinely matters — it's what gets
  // attached to a captured lead so the realtor knows which listing it came from.
  address: z.string().min(1, "An address is required."),
  owner: z.string().nullish(),
  notes: z.string().nullish(),
  status: z.enum(["active", "pending", "sold"]).optional()
});
const create_post$2 = defineEventHandler(async (event) => {
  const body = await readValidatedBody(event, bodySchema$f.parse);
  const user = await loggedInUser(event);
  try {
    const created = await Lead$5.create({ userId: user == null ? void 0 : user._id, ...body });
    return { success: true, _id: String(created._id) };
  } catch (error) {
    console.error("Something went wrong", error);
    throw createError({
      statusCode: 500,
      message: error.message || "Database execution fault."
    });
  }
});

const create_post$3 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: create_post$2
}, Symbol.toStringTag, { value: 'Module' }));

const Home$2 = HomeModel;
const bodySchema$e = z.object({ _id: z.string() });
const delete_post = defineEventHandler(async (event) => {
  const user = await loggedInUser(event);
  if (!(user == null ? void 0 : user._id)) throw createError({ statusCode: 401, message: "Session expired." });
  const { _id } = await readValidatedBody(event, bodySchema$e.parse);
  const res = await Home$2.deleteOne({ _id, userId: user._id });
  if (res.deletedCount === 0) {
    throw createError({ statusCode: 404, message: "Property not found." });
  }
  return { success: true };
});

const delete_post$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: delete_post
}, Symbol.toStringTag, { value: 'Module' }));

const Home$1 = HomeModel;
const index_get$8 = defineEventHandler(async (event) => {
  const user = await loggedInUser(event);
  const data = await Home$1.find({ userId: user == null ? void 0 : user._id }).sort({ createdAt: -1 }).lean();
  return data;
});

const index_get$9 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: index_get$8
}, Symbol.toStringTag, { value: 'Module' }));

const Home = HomeModel;
const bodySchema$d = z.object({
  _id: z.string(),
  name: z.string().nullish(),
  address: z.string().min(1),
  owner: z.string().nullish(),
  notes: z.string().nullish(),
  status: z.enum(["active", "pending", "sold"]).optional()
});
const update_post = defineEventHandler(async (event) => {
  const user = await loggedInUser(event);
  if (!(user == null ? void 0 : user._id)) throw createError({ statusCode: 401, message: "Session expired." });
  const { _id, ...fields } = await readValidatedBody(event, bodySchema$d.parse);
  const res = await Home.updateOne({ _id, userId: user._id }, { $set: fields });
  if (res.matchedCount === 0) {
    throw createError({ statusCode: 404, message: "Property not found." });
  }
  return { success: true };
});

const update_post$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: update_post
}, Symbol.toStringTag, { value: 'Module' }));

const LeadModel$8 = schemaImport;
const analyse_post = defineEventHandler(async (event) => {
  var _a, _b, _c, _d;
  const leadId = (_a = event.context.params) == null ? void 0 : _a.id;
  const user = await loggedInUser(event);
  if (!(user == null ? void 0 : user._id)) throw createError({ statusCode: 401, message: "Session expired." });
  const lead = await LeadModel$8.findOne({ _id: leadId, userId: user._id }).lean();
  if (!lead) throw createError({ statusCode: 404, message: "Lead not found." });
  const answers = (_c = (_b = lead == null ? void 0 : lead.qualification) == null ? void 0 : _b.answers) != null ? _c : {};
  const answered = Object.values(answers).filter((v) => String(v != null ? v : "").trim()).length;
  if (answered < 4) {
    throw createError({
      statusCode: 400,
      message: "Not enough information yet. Send the questionnaire first \u2014 analysis needs real answers to be worth anything."
    });
  }
  const intent = ((_d = lead == null ? void 0 : lead.qualification) == null ? void 0 : _d.intent) || (lead == null ? void 0 : lead.buy_sell_both) || "buy";
  const result = await analyseLead(answers, intent, (lead == null ? void 0 : lead.name) || "");
  await LeadModel$8.updateOne({ _id: leadId, userId: user._id }, {
    $set: {
      analysis: {
        readiness: result.scorecard.readiness,
        readinessLabel: result.scorecard.readinessLabel,
        financingRisk: result.scorecard.financingRisk,
        signals: result.scorecard.signals,
        gaps: result.scorecard.gaps,
        read: result.read,
        nextSteps: result.nextSteps,
        source: result.source,
        generatedAt: new Date(result.generatedAt)
      }
    }
  });
  return result;
});

const analyse_post$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: analyse_post
}, Symbol.toStringTag, { value: 'Module' }));

const LeadModel$7 = schemaImport;
const contacted_post = defineEventHandler(async (event) => {
  var _a;
  const leadId = (_a = event.context.params) == null ? void 0 : _a.id;
  const user = await loggedInUser(event);
  if (!(user == null ? void 0 : user._id)) {
    throw createError({ statusCode: 401, message: "Session expired." });
  }
  try {
    const now = /* @__PURE__ */ new Date();
    const result = await LeadModel$7.updateOne(
      { _id: leadId, userId: user._id },
      // scoped so a realtor can only touch their own leads
      {
        $set: { lastContactedAt: now, reminderStatus: "none" },
        $inc: { contactCount: 1 },
        $unset: { reminderScheduledAt: "" }
      }
    );
    if (result.matchedCount === 0) {
      throw createError({ statusCode: 404, message: "Lead not found." });
    }
    return { success: true, lastContactedAt: now.toISOString() };
  } catch (error) {
    if (error == null ? void 0 : error.statusCode) throw error;
    throw createError({ statusCode: 500, message: "Could not update contact status." });
  }
});

const contacted_post$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: contacted_post
}, Symbol.toStringTag, { value: 'Module' }));

const LeadModel$6 = schemaImport;
const draft_post = defineEventHandler(async (event) => {
  var _a;
  const leadId = (_a = event.context.params) == null ? void 0 : _a.id;
  const user = await loggedInUser(event);
  if (!(user == null ? void 0 : user._id)) {
    throw createError({ statusCode: 401, message: "Session expired." });
  }
  const body = await readBody(event).catch(() => ({}));
  const channel = (body == null ? void 0 : body.channel) === "email" ? "email" : "sms";
  const lead = await LeadModel$6.findOne({ _id: leadId, userId: user._id }).lean();
  if (!lead) {
    throw createError({ statusCode: 404, message: "Lead not found." });
  }
  const draft = await generateLeadDraft(
    {
      name: lead.name,
      budget: lead.budget,
      price: lead.price,
      want_to_move: lead.want_to_move,
      buy_sell_both: lead.buy_sell_both,
      bedrooms: lead.bedrooms,
      address: lead.address,
      status: lead.status,
      lastContactedAt: lead.lastContactedAt,
      agentName: user.name || user.company || "Your agent"
    },
    channel
  );
  return { channel, ...draft };
});

const draft_post$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: draft_post
}, Symbol.toStringTag, { value: 'Module' }));

const Lead$4 = schemaImport;
const index_delete$2 = defineEventHandler(async (event) => {
  try {
    const id = getRouterParam(event, "id");
    await Lead$4.deleteOne({ _id: id });
  } catch (error) {
    console.log(error);
    throw createError({
      statusCode: 500,
      statusMessage: "Something went wrong."
    });
  }
});

const index_delete$3 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: index_delete$2
}, Symbol.toStringTag, { value: 'Module' }));

const Lead$3 = schemaImport;
const index_get$6 = defineEventHandler(async (event) => {
  try {
    const id = getRouterParam(event, "id");
    const data = await Lead$3.findById(id).lean();
    return data;
  } catch (error) {
    console.log(error);
    throw createError({
      statusCode: 500,
      statusMessage: "Something went wrong."
    });
  }
});

const index_get$7 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: index_get$6
}, Symbol.toStringTag, { value: 'Module' }));

const Lead$2 = schemaImport;
const bodySchema$c = z.object({
  _id: z.string(),
  source: z.string().nullable(),
  name: z.string().nullable(),
  age: z.number().nullable(),
  email: z.string().nullable(),
  phone: z.string().nullable(),
  date: z.string().nullable(),
  status: z.string().nullable(),
  best_communication_method: z.string().nullable(),
  address: z.string().nullable(),
  want_to_move: z.string().nullable(),
  buy_sell_both: z.string().nullable(),
  price: z.number().nullable(),
  sqft: z.number().nullable(),
  bedrooms: z.number().nullable(),
  bathrooms: z.number().nullable(),
  budget: z.number().nullable(),
  notes: z.string().nullable(),
  seeing_an_agent: z.string().nullable(),
  ai_analysis: z.string().nullable()
});
const index_put$2 = defineEventHandler(async (event) => {
  const body = await readValidatedBody(event, bodySchema$c.parse);
  try {
    const existing = await Lead$2.findById(body._id).select("status").lean();
    const statusChanged = !!body.status && (existing == null ? void 0 : existing.status) !== body.status;
    const update = { ...body };
    if (statusChanged) {
      update.lastContactedAt = /* @__PURE__ */ new Date();
      update.$inc = { contactCount: 1 };
    }
    const { $inc, ...setFields } = update;
    const mongoUpdate = { $set: setFields };
    if ($inc) mongoUpdate.$inc = $inc;
    await Lead$2.findOneAndUpdate(
      { _id: body._id },
      mongoUpdate,
      { new: true }
    );
  } catch (error) {
    console.log(error);
    throw createError({
      statusCode: 401,
      message: "Please try again"
    });
  }
});

const index_put$3 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: index_put$2
}, Symbol.toStringTag, { value: 'Module' }));

const LeadModel$5 = schemaImport;
const schedule_post = defineEventHandler(async (event) => {
  var _a;
  const leadId = (_a = event.context.params) == null ? void 0 : _a.id;
  const body = await readBody(event);
  const user = await loggedInUser(event);
  if (!(user == null ? void 0 : user._id)) {
    throw createError({ statusCode: 401, message: "Session trace expired." });
  }
  const { scheduledTime } = body;
  try {
    const queryFilter = { _id: leadId, userId: user._id };
    if (!scheduledTime) {
      await LeadModel$5.updateOne(queryFilter, {
        $set: { reminderStatus: "none" },
        $unset: { reminderScheduledAt: "" }
      });
      return { success: true, message: "Automation sequence disabled for this client." };
    }
    await LeadModel$5.updateOne(queryFilter, {
      $set: {
        reminderStatus: "scheduled",
        reminderScheduledAt: new Date(scheduledTime)
      }
    });
    return { success: true, message: "Custom reminder window logged to pipeline queue." };
  } catch (error) {
    throw createError({ statusCode: 500, message: "Queue allocation transaction aborted." });
  }
});

const schedule_post$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: schedule_post
}, Symbol.toStringTag, { value: 'Module' }));

const LeadModel$4 = schemaImport;
const resend$1 = new Resend(process.env.RESEND_KEY);
const bodySchema$b = z.object({
  // The (possibly realtor-edited) message body to send.
  message: z.string().min(1),
  // Optional custom subject; defaults to a friendly follow-up line.
  subject: z.string().optional()
});
const sendMessage_post = defineEventHandler(async (event) => {
  var _a, _b;
  const leadId = (_a = event.context.params) == null ? void 0 : _a.id;
  const user = await loggedInUser(event);
  if (!(user == null ? void 0 : user._id)) {
    throw createError({ statusCode: 401, message: "Session expired." });
  }
  const { message, subject } = await readValidatedBody(event, bodySchema$b.parse);
  const lead = await LeadModel$4.findOne({ _id: leadId, userId: user._id }).lean();
  if (!lead) {
    throw createError({ statusCode: 404, message: "Lead not found." });
  }
  if (!lead.email) {
    throw createError({ statusCode: 400, message: "This lead has no email address on file." });
  }
  const agentName = user.name || user.company || "Your Realtor";
  const replyTo = user.email || void 0;
  try {
    const response = await resend$1.emails.send({
      from: `${useCleanString(agentName)}@ascendpod.com`,
      to: lead.email,
      replyTo,
      subject: subject || "Following up on your property search",
      text: message
    });
    const now = /* @__PURE__ */ new Date();
    await LeadModel$4.updateOne(
      { _id: lead._id, userId: user._id },
      {
        $set: { lastContactedAt: now, reminderStatus: "none" },
        $inc: { contactCount: 1 },
        $unset: { reminderScheduledAt: "" }
      }
    );
    return { success: true, id: (_b = response.data) == null ? void 0 : _b.id, lastContactedAt: now.toISOString() };
  } catch (error) {
    console.error("Failed to send lead message:", error == null ? void 0 : error.message);
    throw createError({ statusCode: 502, message: "Message could not be sent. Please try again." });
  }
});

const sendMessage_post$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: sendMessage_post
}, Symbol.toStringTag, { value: 'Module' }));

function ghostFormUrl(useCategory, useSource, useId, useName, useEmail, useCalendar, options) {
  const base = "https://ghostform-zeta.vercel.app/";
  const stripHash = (c) => (c || "").replace(/^#/, "");
  const params = new URLSearchParams();
  if (useCategory) params.set("category", useCategory);
  params.set("source", useSource);
  if (useCategory && useId) params.set("id", useId);
  if (useName) params.set("company_name", useName);
  if (useEmail) params.set("company_email", useEmail);
  if (useCalendar) params.set("calendar", useCalendar);
  params.set("background_color", stripHash(void 0 ) || "F7F4EF");
  params.set("font_color", stripHash(void 0 ) || "1F1B16");
  return `${base}?${params.toString()}`;
}

const LeadModel$3 = schemaImport;
const bodySchema$a = z.object({
  intent: z.enum(["buy", "sell"]).optional()
});
const sendQuestionnaire_post = defineEventHandler(async (event) => {
  var _a;
  const leadId = (_a = event.context.params) == null ? void 0 : _a.id;
  const user = await loggedInUser(event);
  if (!(user == null ? void 0 : user._id)) throw createError({ statusCode: 401, message: "Session expired." });
  const { intent } = await readValidatedBody(event, bodySchema$a.parse);
  const lead = await LeadModel$3.findOne({ _id: leadId, userId: user._id }).lean();
  if (!lead) throw createError({ statusCode: 404, message: "Lead not found." });
  if (!lead.email) throw createError({ statusCode: 400, message: "This lead has no email address." });
  const resolvedIntent = intent || (String(lead.buy_sell_both || "").toLowerCase().includes("sell") ? "sell" : "buy");
  const token = createQualifyToken(String(lead._id));
  const useGhostFormUrl = ghostFormUrl(user.category, "qualify", user == null ? void 0 : user._id, user.company_hashed, user.email_hashed, user == null ? void 0 : user.calendar_link);
  const link = `${useGhostFormUrl}/&t=${encodeURIComponent(token)}`;
  const u = user;
  const agentName = u.name || u.company || "Your agent";
  const firstName = String(lead.name || "").split(" ")[0] || "there";
  const accent = /^#[0-9A-Fa-f]{6}$/.test(u.brand_color || "") ? u.brand_color : "#B5563A";
  const subject = resolvedIntent === "sell" ? "A few questions before we talk about listing" : "A few questions to narrow down your search";
  const body = resolvedIntent === "sell" ? `Hi ${firstName},

Before we sit down, it would help to know a bit more about the property and what you're hoping for. It takes about five minutes, and it means our conversation starts somewhere useful instead of at the beginning.` : `Hi ${firstName},

To make sure I'm only sending you places worth your time, it would help to know a bit more about what you're after. It takes about five minutes and saves us both a lot of back and forth.`;
  const html = `<!DOCTYPE html><html><body style="margin:0;background:#EFEAE0;font-family:-apple-system,Segoe UI,Helvetica,Arial,sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="padding:32px 16px;"><tr><td align="center">
    <table role="presentation" width="100%" style="max-width:520px;background:#F7F4EF;border:1px solid #DDD6C9;">
      <tr><td style="height:4px;background:${accent};font-size:0;line-height:0;">&nbsp;</td></tr>
      <tr><td style="padding:30px 34px 0;">
        <p style="margin:0;font-family:Georgia,serif;font-size:17px;font-weight:600;color:#1F1B16;">${u.company || agentName}</p>
      </td></tr>
      <tr><td style="padding:24px 34px 0;">
        ${body.split("\n\n").map((p) => `<p style="margin:0 0 16px;font-size:16px;line-height:1.7;color:#1F1B16;">${p.replace(/\n/g, "<br>")}</p>`).join("")}
      </td></tr>
      <tr><td style="padding:10px 34px 34px;">
        <a href="${link}" style="display:inline-block;background:${accent};color:#F7F4EF;text-decoration:none;padding:14px 30px;font-size:12px;font-weight:600;letter-spacing:1.2px;text-transform:uppercase;">Answer the questions</a>
        <p style="margin:22px 0 0;font-size:13px;line-height:1.7;color:#8A847C;">\u2014 ${agentName}</p>
      </td></tr>
    </table>
  </td></tr></table></body></html>`;
  try {
    const resend = new Resend(process.env.RESEND_KEY);
    await resend.emails.send({
      from: `${String(agentName).replace(/[^a-zA-Z0-9]/g, "").toLowerCase() || "noreply"}@ascendpod.com`,
      to: [lead.email],
      replyTo: u.email,
      subject,
      html,
      text: `${body}

${link}

\u2014 ${agentName}`
    });
  } catch (error) {
    console.error("[qualify] send failed:", error == null ? void 0 : error.message);
    throw createError({ statusCode: 502, message: "Could not send the email. Please try again." });
  }
  await LeadModel$3.updateOne({ _id: lead._id, userId: user._id }, {
    $set: { "qualification.sentAt": /* @__PURE__ */ new Date(), "qualification.intent": resolvedIntent }
  });
  return { success: true, link };
});

const sendQuestionnaire_post$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: sendQuestionnaire_post
}, Symbol.toStringTag, { value: 'Module' }));

const Lead$1 = schemaImport;
const bodySchema$9 = z.object({
  source: z.string().nullable(),
  name: z.string().nullable(),
  age: z.number().nullable(),
  email: z.string().nullable(),
  phone: z.string().nullable(),
  date: z.string().nullable(),
  status: z.string().nullable(),
  best_communication_method: z.string().nullable(),
  address: z.string().nullable(),
  want_to_move: z.string().nullable(),
  buy_sell_both: z.string().nullable(),
  price: z.number().nullable(),
  sqft: z.number().nullable(),
  bedrooms: z.number().nullable(),
  bathrooms: z.number().nullable(),
  budget: z.number().nullable(),
  notes: z.string().nullable(),
  seeing_an_agent: z.string().nullable()
});
const create_post = defineEventHandler(async (event) => {
  const body = await readValidatedBody(event, bodySchema$9.parse);
  const user = await loggedInUser(event);
  try {
    await Lead$1.create({ userId: user == null ? void 0 : user._id, ...body });
  } catch (error) {
    console.error("Something went wrong", error);
    throw createError({
      statusCode: 500,
      message: error.message || "Database execution fault."
    });
  }
});

const create_post$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: create_post
}, Symbol.toStringTag, { value: 'Module' }));

const selection_status_lead = [
  { label: "lead (new)", value: "new" },
  { label: "appointment", value: "appointment" },
  { label: "active", value: "active" },
  { label: "under contract", value: "under contract" },
  { label: "closed", value: "closed" },
  { label: "archive", value: "archive" }
];

const Lead = schemaImport;
const index_get$4 = defineEventHandler(async (event) => {
  const user = await requirePaidUser(event);
  const leads = await Lead.find({ userId: user == null ? void 0 : user._id }).sort({ createdAt: -1 }).lean();
  const findLeadStatus = selection_status_lead.map((item) => {
    const status = item.value;
    const filterLeads = leads == null ? void 0 : leads.filter((lead) => {
      var _a;
      return (_a = lead == null ? void 0 : lead.status) == null ? void 0 : _a.includes(status);
    });
    return { label: item.value, leads: filterLeads };
  });
  return {
    all: leads,
    status: findLeadStatus
  };
});

const index_get$5 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: index_get$4
}, Symbol.toStringTag, { value: 'Module' }));

const tiers_get = defineEventHandler(async (event) => {
  var _a;
  const user = await requirePaidUser(event);
  const findTiers = (_a = user == null ? void 0 : user.leads) == null ? void 0 : _a.map((item) => {
    const tierOne = item.ai_analysis.includes("Tier 1") || item.ai_analysis.includes("Tier one");
    const tierTwo = item.ai_analysis.includes("Tier 2") || item.ai_analysis.includes("Tier two");
    const tierThree = item.ai_analysis.includes("Tier 3") || item.ai_analysis.includes("Tier three");
    return {
      tierOne,
      tierTwo,
      tierThree
    };
  });
  return {
    totalTiers: findTiers
  };
});

const tiers_get$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: tiers_get
}, Symbol.toStringTag, { value: 'Module' }));

const _id__get = defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");
  const scanUrl = `https://ghostform.com/capture?ref=${id}`;
  const QRCode = require("qrcode");
  try {
    const pngBuffer = await QRCode.toBuffer(scanUrl, {
      color: {
        dark: "#30cf43",
        // Ghost Green
        light: "#0a0a0c",
        // Ghost Dark
        margin: 2
      }
    });
    setResponseHeader(event, "Content-Type", "image/png");
    return pngBuffer;
  } catch (err) {
    throw createError({ statusCode: 500, message: "QR Generation Failed" });
  }
});

const _id__get$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: _id__get
}, Symbol.toStringTag, { value: 'Module' }));

const LeadModel$2 = schemaImport;
const _token__get = defineEventHandler(async (event) => {
  var _a, _b, _c;
  setHeader(event, "Access-Control-Allow-Origin", "*");
  setHeader(event, "Access-Control-Allow-Headers", "content-type");
  if (event.method === "OPTIONS") return "";
  const token = ((_a = event.context.params) == null ? void 0 : _a.token) || "";
  const parsed = readQualifyToken(token);
  if (!parsed) {
    throw createError({ statusCode: 401, message: "This link is not valid or has expired." });
  }
  await connectDB();
  const lead = await LeadModel$2.findById(parsed.leadId).lean();
  if (!lead) throw createError({ statusCode: 404, message: "We could not find that record." });
  const intent = ((_b = lead == null ? void 0 : lead.qualification) == null ? void 0 : _b.intent) || (lead == null ? void 0 : lead.buy_sell_both) || "buy";
  return {
    firstName: String(lead.name || "").split(" ")[0] || "",
    intent,
    // Already done? The capture app shows a "thanks, already received" state
    // rather than letting them fill it in twice.
    completed: Boolean((_c = lead == null ? void 0 : lead.qualification) == null ? void 0 : _c.completedAt),
    questions: questionsFor(intent).map((q) => {
      var _a2;
      return {
        id: q.id,
        label: q.label,
        type: q.type,
        options: (_a2 = q.options) != null ? _a2 : null
      };
    })
  };
});

const _token__get$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: _token__get
}, Symbol.toStringTag, { value: 'Module' }));

const LeadModel$1 = schemaImport;
const bodySchema$8 = z.object({
  answers: z.record(z.string(), z.union([z.string(), z.number()]))
});
const _token__post = defineEventHandler(async (event) => {
  var _a, _b;
  setHeader(event, "Access-Control-Allow-Origin", "*");
  setHeader(event, "Access-Control-Allow-Headers", "content-type");
  if (event.method === "OPTIONS") return "";
  const token = ((_a = event.context.params) == null ? void 0 : _a.token) || "";
  const parsed = readQualifyToken(token);
  if (!parsed) {
    throw createError({ statusCode: 401, message: "This link is not valid or has expired." });
  }
  const { answers } = await readValidatedBody(event, bodySchema$8.parse);
  await connectDB();
  const lead = await LeadModel$1.findById(parsed.leadId);
  if (!lead) throw createError({ statusCode: 404, message: "We could not find that record." });
  const intent = ((_b = lead == null ? void 0 : lead.qualification) == null ? void 0 : _b.intent) || (lead == null ? void 0 : lead.buy_sell_both) || "buy";
  const now = /* @__PURE__ */ new Date();
  await LeadModel$1.updateOne({ _id: lead._id }, {
    $set: {
      "qualification.answers": answers,
      "qualification.completedAt": now,
      "qualification.intent": intent
    }
  });
  try {
    const result = await analyseLead(answers, intent, lead.name || "");
    await LeadModel$1.updateOne({ _id: lead._id }, {
      $set: {
        analysis: {
          readiness: result.scorecard.readiness,
          readinessLabel: result.scorecard.readinessLabel,
          financingRisk: result.scorecard.financingRisk,
          signals: result.scorecard.signals,
          gaps: result.scorecard.gaps,
          read: result.read,
          nextSteps: result.nextSteps,
          source: result.source,
          generatedAt: new Date(result.generatedAt)
        }
      }
    });
  } catch (err) {
    console.error("[qualify] answers saved, analysis failed:", err);
  }
  return { success: true };
});

const _token__post$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: _token__post
}, Symbol.toStringTag, { value: 'Module' }));

const bodySchema$7 = z.object({
  platform: z.enum(["facebook", "instagram", "x"]),
  topic: z.string().default("personal"),
  details: z.string().optional(),
  count: z.number().min(1).max(5).optional()
});
const generate_post = defineEventHandler(async (event) => {
  const user = await loggedInUser(event);
  if (!(user == null ? void 0 : user._id)) throw createError({ statusCode: 401, message: "Session expired." });
  const { platform, topic, details, count } = await readValidatedBody(event, bodySchema$7.parse);
  const { posts, source } = await generateSocialPosts(
    platform,
    topic,
    {
      agentName: user.name || user.company,
      company: user.company,
      region: user.region,
      voice: user.voice
    },
    { count, details }
  );
  return { platform, topic, source, posts };
});

const generate_post$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: generate_post
}, Symbol.toStringTag, { value: 'Module' }));

const socialPostSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
    index: true
  },
  platform: {
    type: String,
    enum: ["facebook", "instagram", "x"],
    required: true
  },
  // What prompted this post — lets us avoid regenerating the same angle twice
  // and lets the UI group by theme.
  topic: { type: String, default: "general" },
  body: { type: String, required: true },
  hashtags: { type: String, default: "" },
  // Suggestion for what image to pair with it (we don't generate images).
  imageIdea: { type: String, default: "" },
  status: {
    type: String,
    enum: ["draft", "approved", "posted", "discarded"],
    default: "draft",
    index: true
  },
  // Set when the realtor marks it posted (manually today, automatically later).
  postedAt: { type: Date, default: null },
  // Optional: when they intend to post it.
  scheduledFor: { type: Date, default: null }
}, { timestamps: true });
const SocialPostModel = mongoose.models.SocialPost || mongoose.model("SocialPost", socialPostSchema);

const Social = SocialPostModel;
const bodySchema$6 = z.object({
  _id: z.string()
});
const index_delete = defineEventHandler(async (event) => {
  try {
    const body = await readValidatedBody(event, bodySchema$6.parse);
    await Social.deleteOne({ _id: body._id });
  } catch (error) {
    console.log(error);
    throw createError({
      statusCode: 500,
      statusMessage: "Something went wrong."
    });
  }
});

const index_delete$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: index_delete
}, Symbol.toStringTag, { value: 'Module' }));

const SocialPost$2 = SocialPostModel;
const index_get$2 = defineEventHandler(async (event) => {
  const user = await loggedInUser(event);
  if (!(user == null ? void 0 : user._id)) throw createError({ statusCode: 401, message: "Session expired." });
  const all = await SocialPost$2.find({
    userId: user._id,
    status: { $ne: "discarded" }
  }).sort({ createdAt: -1 }).limit(60).lean();
  return {
    approved: all.filter((p) => p.status === "approved"),
    drafts: all.filter((p) => p.status === "draft"),
    posted: all.filter((p) => p.status === "posted").slice(0, 15)
  };
});

const index_get$3 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: index_get$2
}, Symbol.toStringTag, { value: 'Module' }));

const SocialPost$1 = SocialPostModel;
const bodySchema$5 = z.object({
  platform: z.enum(["facebook", "instagram", "x"]),
  topic: z.string().default("general"),
  body: z.string().min(1),
  hashtags: z.string().optional(),
  imageIdea: z.string().optional(),
  status: z.enum(["draft", "approved"]).default("approved")
});
const save_post = defineEventHandler(async (event) => {
  const user = await loggedInUser(event);
  if (!(user == null ? void 0 : user._id)) throw createError({ statusCode: 401, message: "Session expired." });
  const data = await readValidatedBody(event, bodySchema$5.parse);
  const created = await SocialPost$1.create({ userId: user._id, ...data });
  return { success: true, _id: String(created._id) };
});

const save_post$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: save_post
}, Symbol.toStringTag, { value: 'Module' }));

const SocialPost = SocialPostModel;
const bodySchema$4 = z.object({
  _id: z.string(),
  status: z.enum(["draft", "approved", "posted", "discarded"]),
  body: z.string().optional()
});
const status_post = defineEventHandler(async (event) => {
  const user = await loggedInUser(event);
  if (!(user == null ? void 0 : user._id)) throw createError({ statusCode: 401, message: "Session expired." });
  const { _id, status, body } = await readValidatedBody(event, bodySchema$4.parse);
  const update = { status };
  if (typeof body === "string" && body.trim()) update.body = body.trim();
  if (status === "posted") update.postedAt = /* @__PURE__ */ new Date();
  const res = await SocialPost.updateOne({ _id, userId: user._id }, { $set: update });
  if (res.matchedCount === 0) {
    throw createError({ statusCode: 404, message: "Post not found." });
  }
  return { success: true };
});

const status_post$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: status_post
}, Symbol.toStringTag, { value: 'Module' }));

const stripe$1 = new Stripe(process.env.STRIPE_SECRET_KEY);
const subscribe_post = defineEventHandler(async (event) => {
  const body = await readBody(event);
  const user = {
    userId: body == null ? void 0 : body.id,
    // Tie this to your MongoDB User ID
    userEmail: body == null ? void 0 : body.email
  };
  const session = await stripe$1.checkout.sessions.create({
    customer_email: body == null ? void 0 : body.email,
    line_items: [
      {
        price: body.priceId,
        // Your Price ID from Stripe
        quantity: 1
      }
    ],
    mode: "subscription",
    success_url: `${process.env.PROJECT_DOMAIN}/dashboard`,
    cancel_url: `${process.env.PROJECT_DOMAIN}/pricing`,
    metadata: { ...user },
    subscription_data: {
      metadata: { ...user }
    }
  });
  return { url: session.url };
});

const subscribe_post$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: subscribe_post
}, Symbol.toStringTag, { value: 'Module' }));

const UserDoc = UserModelImport;
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const ACTIVE_STATUSES = /* @__PURE__ */ new Set(["active", "trialing"]);
const PRICE_TO_PLAN = {
  [process.env.STRIPE_PRICE_SHADOW || ""]: "shadow",
  [process.env.STRIPE_PRICE_PHANTOM || ""]: "phantom"
};
function planFromSubscription(sub) {
  var _a, _b, _c, _d;
  const priceId = ((_d = (_c = (_b = (_a = sub.items) == null ? void 0 : _a.data) == null ? void 0 : _b[0]) == null ? void 0 : _c.price) == null ? void 0 : _d.id) || "";
  return PRICE_TO_PLAN[priceId] || "phantom";
}
const webhook_post = defineEventHandler(async (event) => {
  var _a, _b, _c;
  await connectDB();
  const signature = getHeader(event, "stripe-signature");
  const rawBody = await readRawBody(event);
  let stripeEvent;
  try {
    stripeEvent = stripe.webhooks.constructEvent(
      rawBody,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error("Stripe webhook signature verification failed:", err.message);
    throw createError({ statusCode: 400, message: `Webhook Error: ${err.message}` });
  }
  const applyToUser = async (userId, fields) => {
    if (!userId) {
      console.error("Stripe event had no user reference; cannot map to a user.");
      return;
    }
    await UserDoc.updateOne({ _id: userId }, { $set: fields });
  };
  switch (stripeEvent.type) {
    // Fires when the hosted Payment Link / Checkout completes successfully.
    case "checkout.session.completed": {
      const session = stripeEvent.data.object;
      const userId = session.client_reference_id;
      const customerId = session.customer;
      const subscriptionId = session.subscription;
      let plan = "phantom";
      let status = "active";
      if (subscriptionId) {
        try {
          const sub = await stripe.subscriptions.retrieve(subscriptionId);
          plan = planFromSubscription(sub);
          status = sub.status;
          if (userId && !((_a = sub.metadata) == null ? void 0 : _a.userId)) {
            await stripe.subscriptions.update(subscriptionId, {
              metadata: { userId }
            });
          }
        } catch (err) {
          console.error("Could not retrieve subscription on checkout:", err.message);
        }
      }
      await applyToUser(userId, {
        paid: ACTIVE_STATUSES.has(status),
        plan,
        paid_tier: plan,
        stripeCustomerId: customerId,
        stripeSubscriptionId: subscriptionId,
        subscriptionStatus: status
      });
      break;
    }
    // Fires on renewals, plan changes, past_due, etc. Keeps our state in sync.
    case "customer.subscription.created":
    case "customer.subscription.updated": {
      const sub = stripeEvent.data.object;
      const userId = (_b = sub.metadata) == null ? void 0 : _b.userId;
      const plan = planFromSubscription(sub);
      await applyToUser(userId, {
        paid: ACTIVE_STATUSES.has(sub.status),
        plan,
        paid_tier: plan,
        stripeCustomerId: sub.customer,
        stripeSubscriptionId: sub.id,
        subscriptionStatus: sub.status
      });
      break;
    }
    // Fires when a subscription is cancelled (by us on account deletion, by the
    // customer, or by Stripe for non-payment). Revoke access.
    case "customer.subscription.deleted": {
      const sub = stripeEvent.data.object;
      const userId = (_c = sub.metadata) == null ? void 0 : _c.userId;
      await applyToUser(userId, {
        paid: false,
        subscriptionStatus: "canceled"
      });
      break;
    }
  }
  return { received: true };
});

const webhook_post$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: webhook_post
}, Symbol.toStringTag, { value: 'Module' }));

const LeadModel = schemaImport;
const CampaignModel = CampaignModelImport;
const resend = new Resend(process.env.RESEND_KEY);
const testReminder_get = defineEventHandler(async (event) => {
  var _a;
  try {
    console.log("Forcing bypass execution of recurring batch marketing loops...");
    const testCampaign = await CampaignModel.findOne().sort({ createdAt: -1 }).populate("userId");
    if (!testCampaign) {
      return { success: false, message: "No campaign templates found to test. Create one on the marketing page first." };
    }
    const targets = await LeadModel.find({
      userId: testCampaign.userId._id,
      status: testCampaign.targetStatus,
      email: { $ne: "", $exists: true }
    }).lean();
    if (targets.length === 0) {
      return {
        success: false,
        message: `No leads found matching status: "${testCampaign.targetStatus}" for this realtor. Add a test lead with this status first!`
      };
    }
    const batchPayload = targets.map((lead) => {
      var _a2;
      const greetingName = lead.name ? lead.name.split(" ")[0] : "there";
      const company_name = (_a2 = lead == null ? void 0 : lead.company_name) != null ? _a2 : "Your connected realtor";
      const personalizedText = testCampaign.messageBody.replace(/{{name}}/g, greetingName).replace(/{{agent}}/g, company_name);
      return {
        from: `${useCleanString(company_name)}@ascendpod.com`,
        to: lead.email,
        replyTo: testCampaign.userId.email,
        subject: testCampaign.subject,
        text: personalizedText
      };
    });
    const response = await resend.batch.create(batchPayload);
    return {
      success: true,
      message: `Successfully executed batch blast mock run. Sent ${targets.length} emails.`,
      batchId: (_a = response.data) == null ? void 0 : _a.id,
      recipients: targets.map((t) => t.email)
    };
  } catch (error) {
    return { success: false, error: error.message };
  }
});

const testReminder_get$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: testReminder_get
}, Symbol.toStringTag, { value: 'Module' }));

const User$5 = UserModelImport;
const hex = z.string().regex(/^#[0-9A-Fa-f]{6}$/);
const bodySchema$3 = z.object({
  theme: z.enum(["light", "dark", "accent", "custom"]).optional(),
  bg: hex.optional(),
  fg: hex.optional(),
  accent: hex.optional(),
  showAvatar: z.boolean().optional(),
  showBar: z.boolean().optional(),
  ratio: z.enum(["square", "story", "landscape"]).optional()
});
const cardStyle_post = defineEventHandler(async (event) => {
  const user = await loggedInUser(event);
  if (!(user == null ? void 0 : user._id)) throw createError({ statusCode: 401, message: "Session expired." });
  const style = await readValidatedBody(event, bodySchema$3.parse);
  await User$5.updateOne(
    { _id: user._id },
    { $set: Object.fromEntries(Object.entries(style).map(([k, v]) => [`cardStyle.${k}`, v])) }
  );
  return { success: true };
});

const cardStyle_post$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: cardStyle_post
}, Symbol.toStringTag, { value: 'Module' }));

const Asset$1 = AssetModel;
const User$4 = UserModelImport;
const headshot_delete = defineEventHandler(async (event) => {
  const user = await loggedInUser(event);
  if (!(user == null ? void 0 : user._id)) throw createError({ statusCode: 401, message: "Session expired." });
  await Asset$1.deleteOne({ userId: user._id, kind: "headshot" });
  await User$4.updateOne({ _id: user._id }, { $set: { headshot_url: "" } });
  return { success: true };
});

const headshot_delete$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: headshot_delete
}, Symbol.toStringTag, { value: 'Module' }));

const Asset = AssetModel;
const User$3 = UserModelImport;
const MAX_BASE64 = 4e5;
const bodySchema$2 = z.object({
  // data URL from the client-side canvas compressor
  image: z.string().min(50),
  width: z.number().optional(),
  height: z.number().optional()
});
const headshot_post = defineEventHandler(async (event) => {
  const user = await loggedInUser(event);
  if (!(user == null ? void 0 : user._id)) throw createError({ statusCode: 401, message: "Session expired." });
  const { image, width, height } = await readValidatedBody(event, bodySchema$2.parse);
  const match = /^data:(image\/(?:jpeg|png|webp));base64,(.+)$/.exec(image);
  if (!match) {
    throw createError({
      statusCode: 400,
      message: "Unsupported image. Use a JPEG, PNG or WebP."
    });
  }
  const [, mime, data] = match;
  if (data.length > MAX_BASE64) {
    throw createError({
      statusCode: 413,
      message: "That image is too large even after compression. Try a smaller one."
    });
  }
  await Asset.findOneAndUpdate(
    { userId: user._id, kind: "headshot" },
    {
      userId: user._id,
      kind: "headshot",
      mime,
      data,
      bytes: Math.round(data.length * 0.75),
      width: width != null ? width : 0,
      height: height != null ? height : 0
    },
    { upsert: true, new: true }
  );
  const url = `/api/assets/headshot/${String(user._id)}?v=${Date.now()}`;
  await User$3.updateOne({ _id: user._id }, { $set: { headshot_url: url } });
  return { success: true, url };
});

const headshot_post$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: headshot_post
}, Symbol.toStringTag, { value: 'Module' }));

const index_get = defineEventHandler(async (event) => {
  try {
    const user = await loggedInUser(event);
    return user;
  } catch (error) {
    console.log(error);
    throw createError({
      statusCode: 500,
      statusMessage: "Something went wrong."
    });
  }
});

const index_get$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: index_get
}, Symbol.toStringTag, { value: 'Module' }));

const User$2 = UserModelImport;
const bodySchema$1 = z.object({
  name: z.string().nullable(),
  company: z.string().nullable(),
  phone: z.string().nullable(),
  email: z.string().nullable(),
  region: z.string().nullable(),
  calendar_link: z.string().nullable(),
  cold_lead_after_days: z.string().nullable()
});
const index_put = defineEventHandler(async (event) => {
  const { name, company, phone, email, region, calendar_link, cold_lead_after_days } = await readValidatedBody(event, bodySchema$1.parse);
  console.log(typeof cold_lead_after_days);
  const obj = {
    name,
    company,
    phone,
    email,
    region,
    calendar_link,
    cold_lead_after_days: Number(cold_lead_after_days)
  };
  try {
    const user = await loggedInUser(event);
    await User$2.findOneAndUpdate(
      { _id: user == null ? void 0 : user._id },
      { ...obj },
      { new: true }
    );
  } catch (error) {
    console.log(error);
    throw createError({
      statusCode: 401,
      message: "Please try again"
    });
  }
});

const index_put$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: index_put
}, Symbol.toStringTag, { value: 'Module' }));

const User$1 = UserModelImport;
const tour_post = defineEventHandler(async (event) => {
  const user = await loggedInUser(event);
  if (!(user == null ? void 0 : user._id)) {
    throw createError({ statusCode: 401, message: "Session expired." });
  }
  await User$1.updateOne({ _id: user._id }, { $set: { tour_completed: true } });
  return { success: true };
});

const tour_post$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: tour_post
}, Symbol.toStringTag, { value: 'Module' }));

const User = UserModelImport;
const bodySchema = z.object({
  tone: z.enum(["warm", "straight", "playful", "polished"]).optional(),
  about: z.string().max(500).optional(),
  focus: z.string().max(300).optional(),
  emoji: z.enum(["none", "some", "lots"]).optional(),
  hashtags: z.enum(["none", "few", "many"]).optional(),
  phrases: z.string().max(400).optional(),
  avoid: z.string().max(400).optional(),
  samples: z.string().max(4e3).optional()
});
const voice_post = defineEventHandler(async (event) => {
  const user = await loggedInUser(event);
  if (!(user == null ? void 0 : user._id)) throw createError({ statusCode: 401, message: "Session expired." });
  const voice = await readValidatedBody(event, bodySchema.parse);
  await User.updateOne(
    { _id: user._id },
    { $set: Object.fromEntries(Object.entries(voice).map(([k, v]) => [`voice.${k}`, v])) }
  );
  return { success: true };
});

const voice_post$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: voice_post
}, Symbol.toStringTag, { value: 'Module' }));

function renderPayloadResponse(ssrContext) {
	return {
		body: encodeForwardSlashes(stringify(splitPayload(ssrContext).payload, ssrContext["~payloadReducers"])) ,
		statusCode: getResponseStatus(ssrContext.event),
		statusMessage: getResponseStatusText(ssrContext.event),
		headers: {
			"content-type": "application/json;charset=utf-8" ,
			"x-powered-by": "Nuxt"
		}
	};
}
function renderPayloadJsonScript(opts) {
	const contents = opts.data ? encodeForwardSlashes(stringify(opts.data, opts.ssrContext["~payloadReducers"])) : "";
	const payload = {
		"type": "application/json",
		"innerHTML": contents,
		"data-nuxt-data": appId,
		"data-ssr": !(opts.ssrContext.noSSR)
	};
	{
		payload.id = "__NUXT_DATA__";
	}
	if (opts.src) {
		payload["data-src"] = opts.src;
	}
	const config = uneval(opts.ssrContext.config);
	return [payload, { innerHTML: `window.__NUXT__={};window.__NUXT__.config=${config}` }];
}

function encodeForwardSlashes(str) {
	return str.replaceAll("/", "\\u002F");
}
function splitPayload(ssrContext) {
	const { data, prerenderedAt, ...initial } = ssrContext.payload;
	return {
		initial: {
			...initial,
			prerenderedAt
		},
		payload: {
			data,
			prerenderedAt
		}
	};
}

const renderSSRHeadOptions = {"omitLineBreaks":true};

// @ts-expect-error private property consumed by vite-generated url helpers
globalThis.__buildAssetsURL = buildAssetsURL;
// @ts-expect-error private property consumed by vite-generated url helpers
globalThis.__publicAssetsURL = publicAssetsURL;
const HAS_APP_TELEPORTS = !!(appTeleportAttrs.id);
const APP_TELEPORT_OPEN_TAG = HAS_APP_TELEPORTS ? `<${appTeleportTag}${propsToString(appTeleportAttrs)}>` : "";
const APP_TELEPORT_CLOSE_TAG = HAS_APP_TELEPORTS ? `</${appTeleportTag}>` : "";
const PAYLOAD_URL_RE = /^[^?]*\/_payload.json(?:\?.*)?$/ ;
const PAYLOAD_FILENAME = "_payload.json" ;
const handler = defineRenderHandler((event) => {
	
	const ssrError = event.path.startsWith("/__nuxt_error") ? getQuery$1(event) : null;
	if (ssrError && !("__unenv__" in event.node.req)) {
		throw createError({
			status: 404,
			statusText: "Page Not Found: /__nuxt_error",
			message: "Page Not Found: /__nuxt_error"
		});
	}
	return renderRoute(event, ssrError);
});
async function renderRoute(event, ssrError) {
	const nitroApp = useNitroApp();
	
	const ssrContext = createSSRContext(event);
	
	const headEntryOptions = { mode: "server" };
	ssrContext.head.push(appHead, headEntryOptions);
	if (ssrError) {
		
		const status = ssrError.status || ssrError.statusCode;
		if (status) {
			
			ssrError.status = ssrError.statusCode = Number.parseInt(status);
		}
		if (typeof ssrError.data === "string") {
			try {
				ssrError.data = destr(ssrError.data);
			} catch {}
		}
		setSSRError(ssrContext, ssrError);
	}
	
	const routeOptions = getRouteRules(event);
	if (routeOptions.ssr === false) {
		ssrContext.noSSR = true;
	}
	
	const _PAYLOAD_EXTRACTION = !ssrContext.noSSR && ((routeOptions.isr || routeOptions.cache));
	
	
	
	const _PAYLOAD_INLINE = !_PAYLOAD_EXTRACTION || NUXT_PAYLOAD_INLINE;
	const isRenderingPayload = (_PAYLOAD_EXTRACTION || routeOptions.prerender) && PAYLOAD_URL_RE.test(ssrContext.url);
	if (isRenderingPayload) {
		const url = ssrContext.url.substring(0, ssrContext.url.lastIndexOf("/")) || "/";
		ssrContext.url = url;
		event._path = event.node.req.url = url;
		if (payloadCache && await payloadCache.hasItem(url + ".json")) {
			return payloadCache.getItem(url + ".json");
		}
	}
	const payloadURL = _PAYLOAD_EXTRACTION ? joinURL(ssrContext.runtimeConfig.app.cdnURL || ssrContext.runtimeConfig.app.baseURL, ssrContext.url.replace(/\?.*$/, ""), PAYLOAD_FILENAME) + "?" + ssrContext.runtimeConfig.app.buildId : undefined;
	
	const renderer = await getRenderer(ssrContext);
	const _rendered = await renderer.renderToString(ssrContext).catch(async (error) => {
		
		
		if ((ssrContext["~renderResponse"] || ssrContext._renderResponse) && error.message === "skipping render") {
			return {};
		}
		
		const _err = !ssrError && ssrContext.payload?.error || error;
		await ssrContext.nuxt?.hooks.callHook("app:error", _err);
		throw _err;
	});
	
	
	const inlinedStyles = [];
	await ssrContext.nuxt?.hooks.callHook("app:rendered", {
		ssrContext,
		renderResult: _rendered
	});
	if (ssrContext["~renderResponse"] || ssrContext._renderResponse) {
		
		return ssrContext["~renderResponse"] || ssrContext._renderResponse;
	}
	
	if (ssrContext.payload?.error && !ssrError) {
		throw ssrContext.payload.error;
	}
	
	if (isRenderingPayload) {
		const response = renderPayloadResponse(ssrContext);
		if (payloadCache) {
			await payloadCache.setItem(ssrContext.url + ".json", response);
		}
		return response;
	}
	if (_PAYLOAD_EXTRACTION) {
		
		
		if (payloadCache) {
			await payloadCache.setItem((ssrContext.url === "/" ? "/" : ssrContext.url.replace(/\/$/, "")) + ".json", renderPayloadResponse(ssrContext));
		}
	}
	const NO_SCRIPTS = routeOptions.noScripts;
	
	const { styles, scripts } = getRequestDependencies(ssrContext, renderer.rendererContext);
	
	
	if (_PAYLOAD_EXTRACTION && !_PAYLOAD_INLINE && !NO_SCRIPTS) {
		ssrContext.head.push({ link: [{
			rel: "preload",
			as: "fetch",
			crossorigin: "anonymous",
			href: payloadURL
		} ] }, headEntryOptions);
	}
	
	if (inlinedStyles.length) {
		ssrContext.head.push({ style: inlinedStyles });
	}
	const link = [];
	for (const resource of Object.values(styles)) {
		
		if ("inline" in getQuery(resource.file)) {
			continue;
		}
		
		
		
		link.push({
			rel: "stylesheet",
			href: renderer.rendererContext.buildAssetsURL(resource.file),
			crossorigin: ""
		});
	}
	if (link.length) {
		ssrContext.head.push({ link }, headEntryOptions);
	}
	if (!NO_SCRIPTS) {
		
		
		
		if (ssrContext["~lazyHydratedModules"]) {
			for (const id of ssrContext["~lazyHydratedModules"]) {
				ssrContext.modules?.delete(id);
			}
		}
		ssrContext.head.push({ link: getPreloadLinks(ssrContext, renderer.rendererContext) }, headEntryOptions);
		ssrContext.head.push({ link: getPrefetchLinks(ssrContext, renderer.rendererContext) }, headEntryOptions);
		
		ssrContext.head.push({ script: _PAYLOAD_INLINE ? renderPayloadJsonScript({
			ssrContext,
			data: ssrContext.payload
		})  : renderPayloadJsonScript({
			ssrContext,
			data: splitPayload(ssrContext).initial,
			src: payloadURL
		})  }, {
			...headEntryOptions,
			
			tagPosition: "bodyClose",
			tagPriority: "high"
		});
	}
	
	if (!routeOptions.noScripts) {
		const tagPosition = "head";
		ssrContext.head.push({ script: Object.values(scripts).map((resource) => ({
			type: resource.module ? "module" : null,
			src: renderer.rendererContext.buildAssetsURL(resource.file),
			defer: resource.module ? null : true,
			
			
			tagPosition,
			crossorigin: ""
		})) }, headEntryOptions);
	}
	const { headTags, bodyTags, bodyTagsOpen, htmlAttrs, bodyAttrs } = await renderSSRHead(ssrContext.head, renderSSRHeadOptions);
	
	const htmlContext = {
		htmlAttrs: htmlAttrs ? [htmlAttrs] : [],
		head: normalizeChunks([headTags]),
		bodyAttrs: bodyAttrs ? [bodyAttrs] : [],
		bodyPrepend: normalizeChunks([bodyTagsOpen, ssrContext.teleports?.body]),
		body: [replaceIslandTeleports(ssrContext, _rendered.html) , APP_TELEPORT_OPEN_TAG + (HAS_APP_TELEPORTS ? joinTags([ssrContext.teleports?.[`#${appTeleportAttrs.id}`]]) : "") + APP_TELEPORT_CLOSE_TAG],
		bodyAppend: [bodyTags]
	};
	
	await nitroApp.hooks.callHook("render:html", htmlContext, { event });
	
	return {
		body: renderHTMLDocument(htmlContext),
		statusCode: getResponseStatus(event),
		statusMessage: getResponseStatusText(event),
		headers: {
			"content-type": "text/html;charset=utf-8",
			"x-powered-by": "Nuxt"
		}
	};
}
function normalizeChunks(chunks) {
	const result = [];
	for (const _chunk of chunks) {
		const chunk = _chunk?.trim();
		if (chunk) {
			result.push(chunk);
		}
	}
	return result;
}
function joinTags(tags) {
	return tags.join("");
}
function joinAttrs(chunks) {
	if (chunks.length === 0) {
		return "";
	}
	return " " + chunks.join(" ");
}
function renderHTMLDocument(html) {
	return "<!DOCTYPE html>" + `<html${joinAttrs(html.htmlAttrs)}>` + `<head>${joinTags(html.head)}</head>` + `<body${joinAttrs(html.bodyAttrs)}>${joinTags(html.bodyPrepend)}${joinTags(html.body)}${joinTags(html.bodyAppend)}</body>` + "</html>";
}

const renderer = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: handler
}, Symbol.toStringTag, { value: 'Module' }));
//# sourceMappingURL=index.mjs.map
