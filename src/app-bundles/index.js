import {
  composeBundles,
  createCacheBundle,
  createUrlBundle,
} from "redux-bundler";

import createNestedUrlBundle from "./create-nested-url-bundle";
import createAuthBundle from "./create-auth-bundle";
import pkg from "../../package.json";

import routeBundle from "./routes-bundle";

import cache from "./../cache.js";

export default composeBundles(
  createAuthBundle({
    appId: "ff3437e4-f2fc-432f-8175-7dd70f9bda44",
    redirectOnLogout: pkg.homepage,
  }),
  createCacheBundle({
    cacheFn: cache.set,
  }),
  createUrlBundle(),
  createNestedUrlBundle({
    pkg: pkg,
    redirectOnLogout: pkg.homepage,
  }),
  routeBundle
);
