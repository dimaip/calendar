/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type * as broadcasts from "../broadcasts.js";
import type * as habitTracker from "../habitTracker.js";
import type * as lib_admin from "../lib/admin.js";
import type * as lib_broadcastSchedule from "../lib/broadcastSchedule.js";
import type * as lib_broadcastValidators from "../lib/broadcastValidators.js";
import type * as updates from "../updates.js";

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";

declare const fullApi: ApiFromModules<{
  broadcasts: typeof broadcasts;
  habitTracker: typeof habitTracker;
  "lib/admin": typeof lib_admin;
  "lib/broadcastSchedule": typeof lib_broadcastSchedule;
  "lib/broadcastValidators": typeof lib_broadcastValidators;
  updates: typeof updates;
}>;

/**
 * A utility for referencing Convex functions in your app's public API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;

/**
 * A utility for referencing Convex functions in your app's internal API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = internal.myModule.myFunction;
 * ```
 */
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;

export declare const components: {};
