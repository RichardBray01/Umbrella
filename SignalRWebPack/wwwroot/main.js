/******/ (function(modules) { // webpackBootstrap
/******/ 	function hotDisposeChunk(chunkId) {
/******/ 		delete installedChunks[chunkId];
/******/ 	}
/******/ 	var parentHotUpdateCallback = window["webpackHotUpdate"];
/******/ 	window["webpackHotUpdate"] = // eslint-disable-next-line no-unused-vars
/******/ 	function webpackHotUpdateCallback(chunkId, moreModules) {
/******/ 		hotAddUpdateChunk(chunkId, moreModules);
/******/ 		if (parentHotUpdateCallback) parentHotUpdateCallback(chunkId, moreModules);
/******/ 	} ;
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadUpdateChunk(chunkId) {
/******/ 		var head = document.getElementsByTagName("head")[0];
/******/ 		var script = document.createElement("script");
/******/ 		script.charset = "utf-8";
/******/ 		script.src = __webpack_require__.p + "" + chunkId + "." + hotCurrentHash + ".hot-update.js";
/******/ 		if (null) script.crossOrigin = null;
/******/ 		head.appendChild(script);
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadManifest(requestTimeout) {
/******/ 		requestTimeout = requestTimeout || 10000;
/******/ 		return new Promise(function(resolve, reject) {
/******/ 			if (typeof XMLHttpRequest === "undefined") {
/******/ 				return reject(new Error("No browser support"));
/******/ 			}
/******/ 			try {
/******/ 				var request = new XMLHttpRequest();
/******/ 				var requestPath = __webpack_require__.p + "" + hotCurrentHash + ".hot-update.json";
/******/ 				request.open("GET", requestPath, true);
/******/ 				request.timeout = requestTimeout;
/******/ 				request.send(null);
/******/ 			} catch (err) {
/******/ 				return reject(err);
/******/ 			}
/******/ 			request.onreadystatechange = function() {
/******/ 				if (request.readyState !== 4) return;
/******/ 				if (request.status === 0) {
/******/ 					// timeout
/******/ 					reject(
/******/ 						new Error("Manifest request to " + requestPath + " timed out.")
/******/ 					);
/******/ 				} else if (request.status === 404) {
/******/ 					// no update available
/******/ 					resolve();
/******/ 				} else if (request.status !== 200 && request.status !== 304) {
/******/ 					// other failure
/******/ 					reject(new Error("Manifest request to " + requestPath + " failed."));
/******/ 				} else {
/******/ 					// success
/******/ 					try {
/******/ 						var update = JSON.parse(request.responseText);
/******/ 					} catch (e) {
/******/ 						reject(e);
/******/ 						return;
/******/ 					}
/******/ 					resolve(update);
/******/ 				}
/******/ 			};
/******/ 		});
/******/ 	}
/******/
/******/ 	var hotApplyOnUpdate = true;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentHash = "5ba611392d375be9c0ee";
/******/ 	var hotRequestTimeout = 10000;
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotCurrentChildModule;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParents = [];
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParentsTemp = [];
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateRequire(moduleId) {
/******/ 		var me = installedModules[moduleId];
/******/ 		if (!me) return __webpack_require__;
/******/ 		var fn = function(request) {
/******/ 			if (me.hot.active) {
/******/ 				if (installedModules[request]) {
/******/ 					if (installedModules[request].parents.indexOf(moduleId) === -1) {
/******/ 						installedModules[request].parents.push(moduleId);
/******/ 					}
/******/ 				} else {
/******/ 					hotCurrentParents = [moduleId];
/******/ 					hotCurrentChildModule = request;
/******/ 				}
/******/ 				if (me.children.indexOf(request) === -1) {
/******/ 					me.children.push(request);
/******/ 				}
/******/ 			} else {
/******/ 				console.warn(
/******/ 					"[HMR] unexpected require(" +
/******/ 						request +
/******/ 						") from disposed module " +
/******/ 						moduleId
/******/ 				);
/******/ 				hotCurrentParents = [];
/******/ 			}
/******/ 			return __webpack_require__(request);
/******/ 		};
/******/ 		var ObjectFactory = function ObjectFactory(name) {
/******/ 			return {
/******/ 				configurable: true,
/******/ 				enumerable: true,
/******/ 				get: function() {
/******/ 					return __webpack_require__[name];
/******/ 				},
/******/ 				set: function(value) {
/******/ 					__webpack_require__[name] = value;
/******/ 				}
/******/ 			};
/******/ 		};
/******/ 		for (var name in __webpack_require__) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(__webpack_require__, name) &&
/******/ 				name !== "e" &&
/******/ 				name !== "t"
/******/ 			) {
/******/ 				Object.defineProperty(fn, name, ObjectFactory(name));
/******/ 			}
/******/ 		}
/******/ 		fn.e = function(chunkId) {
/******/ 			if (hotStatus === "ready") hotSetStatus("prepare");
/******/ 			hotChunksLoading++;
/******/ 			return __webpack_require__.e(chunkId).then(finishChunkLoading, function(err) {
/******/ 				finishChunkLoading();
/******/ 				throw err;
/******/ 			});
/******/
/******/ 			function finishChunkLoading() {
/******/ 				hotChunksLoading--;
/******/ 				if (hotStatus === "prepare") {
/******/ 					if (!hotWaitingFilesMap[chunkId]) {
/******/ 						hotEnsureUpdateChunk(chunkId);
/******/ 					}
/******/ 					if (hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 						hotUpdateDownloaded();
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 		fn.t = function(value, mode) {
/******/ 			if (mode & 1) value = fn(value);
/******/ 			return __webpack_require__.t(value, mode & ~1);
/******/ 		};
/******/ 		return fn;
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateModule(moduleId) {
/******/ 		var hot = {
/******/ 			// private stuff
/******/ 			_acceptedDependencies: {},
/******/ 			_declinedDependencies: {},
/******/ 			_selfAccepted: false,
/******/ 			_selfDeclined: false,
/******/ 			_disposeHandlers: [],
/******/ 			_main: hotCurrentChildModule !== moduleId,
/******/
/******/ 			// Module API
/******/ 			active: true,
/******/ 			accept: function(dep, callback) {
/******/ 				if (dep === undefined) hot._selfAccepted = true;
/******/ 				else if (typeof dep === "function") hot._selfAccepted = dep;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._acceptedDependencies[dep[i]] = callback || function() {};
/******/ 				else hot._acceptedDependencies[dep] = callback || function() {};
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if (dep === undefined) hot._selfDeclined = true;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._declinedDependencies[dep[i]] = true;
/******/ 				else hot._declinedDependencies[dep] = true;
/******/ 			},
/******/ 			dispose: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			addDisposeHandler: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			removeDisposeHandler: function(callback) {
/******/ 				var idx = hot._disposeHandlers.indexOf(callback);
/******/ 				if (idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			// Management API
/******/ 			check: hotCheck,
/******/ 			apply: hotApply,
/******/ 			status: function(l) {
/******/ 				if (!l) return hotStatus;
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			addStatusHandler: function(l) {
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			removeStatusHandler: function(l) {
/******/ 				var idx = hotStatusHandlers.indexOf(l);
/******/ 				if (idx >= 0) hotStatusHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			//inherit from previous dispose call
/******/ 			data: hotCurrentModuleData[moduleId]
/******/ 		};
/******/ 		hotCurrentChildModule = undefined;
/******/ 		return hot;
/******/ 	}
/******/
/******/ 	var hotStatusHandlers = [];
/******/ 	var hotStatus = "idle";
/******/
/******/ 	function hotSetStatus(newStatus) {
/******/ 		hotStatus = newStatus;
/******/ 		for (var i = 0; i < hotStatusHandlers.length; i++)
/******/ 			hotStatusHandlers[i].call(null, newStatus);
/******/ 	}
/******/
/******/ 	// while downloading
/******/ 	var hotWaitingFiles = 0;
/******/ 	var hotChunksLoading = 0;
/******/ 	var hotWaitingFilesMap = {};
/******/ 	var hotRequestedFilesMap = {};
/******/ 	var hotAvailableFilesMap = {};
/******/ 	var hotDeferred;
/******/
/******/ 	// The update info
/******/ 	var hotUpdate, hotUpdateNewHash;
/******/
/******/ 	function toModuleId(id) {
/******/ 		var isNumber = +id + "" === id;
/******/ 		return isNumber ? +id : id;
/******/ 	}
/******/
/******/ 	function hotCheck(apply) {
/******/ 		if (hotStatus !== "idle") {
/******/ 			throw new Error("check() is only allowed in idle status");
/******/ 		}
/******/ 		hotApplyOnUpdate = apply;
/******/ 		hotSetStatus("check");
/******/ 		return hotDownloadManifest(hotRequestTimeout).then(function(update) {
/******/ 			if (!update) {
/******/ 				hotSetStatus("idle");
/******/ 				return null;
/******/ 			}
/******/ 			hotRequestedFilesMap = {};
/******/ 			hotWaitingFilesMap = {};
/******/ 			hotAvailableFilesMap = update.c;
/******/ 			hotUpdateNewHash = update.h;
/******/
/******/ 			hotSetStatus("prepare");
/******/ 			var promise = new Promise(function(resolve, reject) {
/******/ 				hotDeferred = {
/******/ 					resolve: resolve,
/******/ 					reject: reject
/******/ 				};
/******/ 			});
/******/ 			hotUpdate = {};
/******/ 			var chunkId = "main";
/******/ 			// eslint-disable-next-line no-lone-blocks
/******/ 			{
/******/ 				/*globals chunkId */
/******/ 				hotEnsureUpdateChunk(chunkId);
/******/ 			}
/******/ 			if (
/******/ 				hotStatus === "prepare" &&
/******/ 				hotChunksLoading === 0 &&
/******/ 				hotWaitingFiles === 0
/******/ 			) {
/******/ 				hotUpdateDownloaded();
/******/ 			}
/******/ 			return promise;
/******/ 		});
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotAddUpdateChunk(chunkId, moreModules) {
/******/ 		if (!hotAvailableFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
/******/ 			return;
/******/ 		hotRequestedFilesMap[chunkId] = false;
/******/ 		for (var moduleId in moreModules) {
/******/ 			if (Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				hotUpdate[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if (--hotWaitingFiles === 0 && hotChunksLoading === 0) {
/******/ 			hotUpdateDownloaded();
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotEnsureUpdateChunk(chunkId) {
/******/ 		if (!hotAvailableFilesMap[chunkId]) {
/******/ 			hotWaitingFilesMap[chunkId] = true;
/******/ 		} else {
/******/ 			hotRequestedFilesMap[chunkId] = true;
/******/ 			hotWaitingFiles++;
/******/ 			hotDownloadUpdateChunk(chunkId);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotUpdateDownloaded() {
/******/ 		hotSetStatus("ready");
/******/ 		var deferred = hotDeferred;
/******/ 		hotDeferred = null;
/******/ 		if (!deferred) return;
/******/ 		if (hotApplyOnUpdate) {
/******/ 			// Wrap deferred object in Promise to mark it as a well-handled Promise to
/******/ 			// avoid triggering uncaught exception warning in Chrome.
/******/ 			// See https://bugs.chromium.org/p/chromium/issues/detail?id=465666
/******/ 			Promise.resolve()
/******/ 				.then(function() {
/******/ 					return hotApply(hotApplyOnUpdate);
/******/ 				})
/******/ 				.then(
/******/ 					function(result) {
/******/ 						deferred.resolve(result);
/******/ 					},
/******/ 					function(err) {
/******/ 						deferred.reject(err);
/******/ 					}
/******/ 				);
/******/ 		} else {
/******/ 			var outdatedModules = [];
/******/ 			for (var id in hotUpdate) {
/******/ 				if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 					outdatedModules.push(toModuleId(id));
/******/ 				}
/******/ 			}
/******/ 			deferred.resolve(outdatedModules);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotApply(options) {
/******/ 		if (hotStatus !== "ready")
/******/ 			throw new Error("apply() is only allowed in ready status");
/******/ 		options = options || {};
/******/
/******/ 		var cb;
/******/ 		var i;
/******/ 		var j;
/******/ 		var module;
/******/ 		var moduleId;
/******/
/******/ 		function getAffectedStuff(updateModuleId) {
/******/ 			var outdatedModules = [updateModuleId];
/******/ 			var outdatedDependencies = {};
/******/
/******/ 			var queue = outdatedModules.slice().map(function(id) {
/******/ 				return {
/******/ 					chain: [id],
/******/ 					id: id
/******/ 				};
/******/ 			});
/******/ 			while (queue.length > 0) {
/******/ 				var queueItem = queue.pop();
/******/ 				var moduleId = queueItem.id;
/******/ 				var chain = queueItem.chain;
/******/ 				module = installedModules[moduleId];
/******/ 				if (!module || module.hot._selfAccepted) continue;
/******/ 				if (module.hot._selfDeclined) {
/******/ 					return {
/******/ 						type: "self-declined",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				if (module.hot._main) {
/******/ 					return {
/******/ 						type: "unaccepted",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				for (var i = 0; i < module.parents.length; i++) {
/******/ 					var parentId = module.parents[i];
/******/ 					var parent = installedModules[parentId];
/******/ 					if (!parent) continue;
/******/ 					if (parent.hot._declinedDependencies[moduleId]) {
/******/ 						return {
/******/ 							type: "declined",
/******/ 							chain: chain.concat([parentId]),
/******/ 							moduleId: moduleId,
/******/ 							parentId: parentId
/******/ 						};
/******/ 					}
/******/ 					if (outdatedModules.indexOf(parentId) !== -1) continue;
/******/ 					if (parent.hot._acceptedDependencies[moduleId]) {
/******/ 						if (!outdatedDependencies[parentId])
/******/ 							outdatedDependencies[parentId] = [];
/******/ 						addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 						continue;
/******/ 					}
/******/ 					delete outdatedDependencies[parentId];
/******/ 					outdatedModules.push(parentId);
/******/ 					queue.push({
/******/ 						chain: chain.concat([parentId]),
/******/ 						id: parentId
/******/ 					});
/******/ 				}
/******/ 			}
/******/
/******/ 			return {
/******/ 				type: "accepted",
/******/ 				moduleId: updateModuleId,
/******/ 				outdatedModules: outdatedModules,
/******/ 				outdatedDependencies: outdatedDependencies
/******/ 			};
/******/ 		}
/******/
/******/ 		function addAllToSet(a, b) {
/******/ 			for (var i = 0; i < b.length; i++) {
/******/ 				var item = b[i];
/******/ 				if (a.indexOf(item) === -1) a.push(item);
/******/ 			}
/******/ 		}
/******/
/******/ 		// at begin all updates modules are outdated
/******/ 		// the "outdated" status can propagate to parents if they don't accept the children
/******/ 		var outdatedDependencies = {};
/******/ 		var outdatedModules = [];
/******/ 		var appliedUpdate = {};
/******/
/******/ 		var warnUnexpectedRequire = function warnUnexpectedRequire() {
/******/ 			console.warn(
/******/ 				"[HMR] unexpected require(" + result.moduleId + ") to disposed module"
/******/ 			);
/******/ 		};
/******/
/******/ 		for (var id in hotUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 				moduleId = toModuleId(id);
/******/ 				/** @type {TODO} */
/******/ 				var result;
/******/ 				if (hotUpdate[id]) {
/******/ 					result = getAffectedStuff(moduleId);
/******/ 				} else {
/******/ 					result = {
/******/ 						type: "disposed",
/******/ 						moduleId: id
/******/ 					};
/******/ 				}
/******/ 				/** @type {Error|false} */
/******/ 				var abortError = false;
/******/ 				var doApply = false;
/******/ 				var doDispose = false;
/******/ 				var chainInfo = "";
/******/ 				if (result.chain) {
/******/ 					chainInfo = "\nUpdate propagation: " + result.chain.join(" -> ");
/******/ 				}
/******/ 				switch (result.type) {
/******/ 					case "self-declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of self decline: " +
/******/ 									result.moduleId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of declined dependency: " +
/******/ 									result.moduleId +
/******/ 									" in " +
/******/ 									result.parentId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "unaccepted":
/******/ 						if (options.onUnaccepted) options.onUnaccepted(result);
/******/ 						if (!options.ignoreUnaccepted)
/******/ 							abortError = new Error(
/******/ 								"Aborted because " + moduleId + " is not accepted" + chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "accepted":
/******/ 						if (options.onAccepted) options.onAccepted(result);
/******/ 						doApply = true;
/******/ 						break;
/******/ 					case "disposed":
/******/ 						if (options.onDisposed) options.onDisposed(result);
/******/ 						doDispose = true;
/******/ 						break;
/******/ 					default:
/******/ 						throw new Error("Unexception type " + result.type);
/******/ 				}
/******/ 				if (abortError) {
/******/ 					hotSetStatus("abort");
/******/ 					return Promise.reject(abortError);
/******/ 				}
/******/ 				if (doApply) {
/******/ 					appliedUpdate[moduleId] = hotUpdate[moduleId];
/******/ 					addAllToSet(outdatedModules, result.outdatedModules);
/******/ 					for (moduleId in result.outdatedDependencies) {
/******/ 						if (
/******/ 							Object.prototype.hasOwnProperty.call(
/******/ 								result.outdatedDependencies,
/******/ 								moduleId
/******/ 							)
/******/ 						) {
/******/ 							if (!outdatedDependencies[moduleId])
/******/ 								outdatedDependencies[moduleId] = [];
/******/ 							addAllToSet(
/******/ 								outdatedDependencies[moduleId],
/******/ 								result.outdatedDependencies[moduleId]
/******/ 							);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 				if (doDispose) {
/******/ 					addAllToSet(outdatedModules, [result.moduleId]);
/******/ 					appliedUpdate[moduleId] = warnUnexpectedRequire;
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Store self accepted outdated modules to require them later by the module system
/******/ 		var outdatedSelfAcceptedModules = [];
/******/ 		for (i = 0; i < outdatedModules.length; i++) {
/******/ 			moduleId = outdatedModules[i];
/******/ 			if (
/******/ 				installedModules[moduleId] &&
/******/ 				installedModules[moduleId].hot._selfAccepted
/******/ 			)
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 		}
/******/
/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		Object.keys(hotAvailableFilesMap).forEach(function(chunkId) {
/******/ 			if (hotAvailableFilesMap[chunkId] === false) {
/******/ 				hotDisposeChunk(chunkId);
/******/ 			}
/******/ 		});
/******/
/******/ 		var idx;
/******/ 		var queue = outdatedModules.slice();
/******/ 		while (queue.length > 0) {
/******/ 			moduleId = queue.pop();
/******/ 			module = installedModules[moduleId];
/******/ 			if (!module) continue;
/******/
/******/ 			var data = {};
/******/
/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for (j = 0; j < disposeHandlers.length; j++) {
/******/ 				cb = disposeHandlers[j];
/******/ 				cb(data);
/******/ 			}
/******/ 			hotCurrentModuleData[moduleId] = data;
/******/
/******/ 			// disable module (this disables requires from this module)
/******/ 			module.hot.active = false;
/******/
/******/ 			// remove module from cache
/******/ 			delete installedModules[moduleId];
/******/
/******/ 			// when disposing there is no need to call dispose handler
/******/ 			delete outdatedDependencies[moduleId];
/******/
/******/ 			// remove "parents" references from all children
/******/ 			for (j = 0; j < module.children.length; j++) {
/******/ 				var child = installedModules[module.children[j]];
/******/ 				if (!child) continue;
/******/ 				idx = child.parents.indexOf(moduleId);
/******/ 				if (idx >= 0) {
/******/ 					child.parents.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// remove outdated dependency from module children
/******/ 		var dependency;
/******/ 		var moduleOutdatedDependencies;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					for (j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 						dependency = moduleOutdatedDependencies[j];
/******/ 						idx = module.children.indexOf(dependency);
/******/ 						if (idx >= 0) module.children.splice(idx, 1);
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Not in "apply" phase
/******/ 		hotSetStatus("apply");
/******/
/******/ 		hotCurrentHash = hotUpdateNewHash;
/******/
/******/ 		// insert new code
/******/ 		for (moduleId in appliedUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}
/******/
/******/ 		// call accept handlers
/******/ 		var error = null;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					var callbacks = [];
/******/ 					for (i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 						dependency = moduleOutdatedDependencies[i];
/******/ 						cb = module.hot._acceptedDependencies[dependency];
/******/ 						if (cb) {
/******/ 							if (callbacks.indexOf(cb) !== -1) continue;
/******/ 							callbacks.push(cb);
/******/ 						}
/******/ 					}
/******/ 					for (i = 0; i < callbacks.length; i++) {
/******/ 						cb = callbacks[i];
/******/ 						try {
/******/ 							cb(moduleOutdatedDependencies);
/******/ 						} catch (err) {
/******/ 							if (options.onErrored) {
/******/ 								options.onErrored({
/******/ 									type: "accept-errored",
/******/ 									moduleId: moduleId,
/******/ 									dependencyId: moduleOutdatedDependencies[i],
/******/ 									error: err
/******/ 								});
/******/ 							}
/******/ 							if (!options.ignoreErrored) {
/******/ 								if (!error) error = err;
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Load self accepted modules
/******/ 		for (i = 0; i < outdatedSelfAcceptedModules.length; i++) {
/******/ 			var item = outdatedSelfAcceptedModules[i];
/******/ 			moduleId = item.module;
/******/ 			hotCurrentParents = [moduleId];
/******/ 			try {
/******/ 				__webpack_require__(moduleId);
/******/ 			} catch (err) {
/******/ 				if (typeof item.errorHandler === "function") {
/******/ 					try {
/******/ 						item.errorHandler(err);
/******/ 					} catch (err2) {
/******/ 						if (options.onErrored) {
/******/ 							options.onErrored({
/******/ 								type: "self-accept-error-handler-errored",
/******/ 								moduleId: moduleId,
/******/ 								error: err2,
/******/ 								originalError: err
/******/ 							});
/******/ 						}
/******/ 						if (!options.ignoreErrored) {
/******/ 							if (!error) error = err2;
/******/ 						}
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				} else {
/******/ 					if (options.onErrored) {
/******/ 						options.onErrored({
/******/ 							type: "self-accept-errored",
/******/ 							moduleId: moduleId,
/******/ 							error: err
/******/ 						});
/******/ 					}
/******/ 					if (!options.ignoreErrored) {
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if (error) {
/******/ 			hotSetStatus("fail");
/******/ 			return Promise.reject(error);
/******/ 		}
/******/
/******/ 		hotSetStatus("idle");
/******/ 		return new Promise(function(resolve) {
/******/ 			resolve(outdatedModules);
/******/ 		});
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {},
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: (hotCurrentParentsTemp = hotCurrentParents, hotCurrentParents = [], hotCurrentParentsTemp),
/******/ 			children: []
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return hotCreateRequire(0)(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/@aspnet/signalr/dist/esm/AbortController.js":
/*!******************************************************************!*\
  !*** ./node_modules/@aspnet/signalr/dist/esm/AbortController.js ***!
  \******************************************************************/
/*! exports provided: AbortController */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AbortController", function() { return AbortController; });
// Copyright (c) .NET Foundation. All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
// Rough polyfill of https://developer.mozilla.org/en-US/docs/Web/API/AbortController
// We don't actually ever use the API being polyfilled, we always use the polyfill because
// it's a very new API right now.
// Not exported from index.
/** @private */
var AbortController = /** @class */ (function () {
    function AbortController() {
        this.isAborted = false;
        this.onabort = null;
    }
    AbortController.prototype.abort = function () {
        if (!this.isAborted) {
            this.isAborted = true;
            if (this.onabort) {
                this.onabort();
            }
        }
    };
    Object.defineProperty(AbortController.prototype, "signal", {
        get: function () {
            return this;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AbortController.prototype, "aborted", {
        get: function () {
            return this.isAborted;
        },
        enumerable: true,
        configurable: true
    });
    return AbortController;
}());

//# sourceMappingURL=AbortController.js.map

/***/ }),

/***/ "./node_modules/@aspnet/signalr/dist/esm/DefaultHttpClient.js":
/*!********************************************************************!*\
  !*** ./node_modules/@aspnet/signalr/dist/esm/DefaultHttpClient.js ***!
  \********************************************************************/
/*! exports provided: DefaultHttpClient */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DefaultHttpClient", function() { return DefaultHttpClient; });
/* harmony import */ var _Errors__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Errors */ "./node_modules/@aspnet/signalr/dist/esm/Errors.js");
/* harmony import */ var _HttpClient__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./HttpClient */ "./node_modules/@aspnet/signalr/dist/esm/HttpClient.js");
/* harmony import */ var _XhrHttpClient__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./XhrHttpClient */ "./node_modules/@aspnet/signalr/dist/esm/XhrHttpClient.js");
// Copyright (c) .NET Foundation. All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();



var nodeHttpClientModule;
if (typeof XMLHttpRequest === "undefined") {
    // In order to ignore the dynamic require in webpack builds we need to do this magic
    // @ts-ignore: TS doesn't know about these names
    var requireFunc =  true ? require : undefined;
    nodeHttpClientModule = requireFunc("./NodeHttpClient");
}
/** Default implementation of {@link @aspnet/signalr.HttpClient}. */
var DefaultHttpClient = /** @class */ (function (_super) {
    __extends(DefaultHttpClient, _super);
    /** Creates a new instance of the {@link @aspnet/signalr.DefaultHttpClient}, using the provided {@link @aspnet/signalr.ILogger} to log messages. */
    function DefaultHttpClient(logger) {
        var _this = _super.call(this) || this;
        if (typeof XMLHttpRequest !== "undefined") {
            _this.httpClient = new _XhrHttpClient__WEBPACK_IMPORTED_MODULE_2__["XhrHttpClient"](logger);
        }
        else if (typeof nodeHttpClientModule !== "undefined") {
            _this.httpClient = new nodeHttpClientModule.NodeHttpClient(logger);
        }
        else {
            throw new Error("No HttpClient could be created.");
        }
        return _this;
    }
    /** @inheritDoc */
    DefaultHttpClient.prototype.send = function (request) {
        // Check that abort was not signaled before calling send
        if (request.abortSignal && request.abortSignal.aborted) {
            return Promise.reject(new _Errors__WEBPACK_IMPORTED_MODULE_0__["AbortError"]());
        }
        if (!request.method) {
            return Promise.reject(new Error("No method defined."));
        }
        if (!request.url) {
            return Promise.reject(new Error("No url defined."));
        }
        return this.httpClient.send(request);
    };
    DefaultHttpClient.prototype.getCookieString = function (url) {
        return this.httpClient.getCookieString(url);
    };
    return DefaultHttpClient;
}(_HttpClient__WEBPACK_IMPORTED_MODULE_1__["HttpClient"]));

//# sourceMappingURL=DefaultHttpClient.js.map

/***/ }),

/***/ "./node_modules/@aspnet/signalr/dist/esm/Errors.js":
/*!*********************************************************!*\
  !*** ./node_modules/@aspnet/signalr/dist/esm/Errors.js ***!
  \*********************************************************/
/*! exports provided: HttpError, TimeoutError, AbortError */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HttpError", function() { return HttpError; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TimeoutError", function() { return TimeoutError; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AbortError", function() { return AbortError; });
// Copyright (c) .NET Foundation. All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/** Error thrown when an HTTP request fails. */
var HttpError = /** @class */ (function (_super) {
    __extends(HttpError, _super);
    /** Constructs a new instance of {@link @aspnet/signalr.HttpError}.
     *
     * @param {string} errorMessage A descriptive error message.
     * @param {number} statusCode The HTTP status code represented by this error.
     */
    function HttpError(errorMessage, statusCode) {
        var _newTarget = this.constructor;
        var _this = this;
        var trueProto = _newTarget.prototype;
        _this = _super.call(this, errorMessage) || this;
        _this.statusCode = statusCode;
        // Workaround issue in Typescript compiler
        // https://github.com/Microsoft/TypeScript/issues/13965#issuecomment-278570200
        _this.__proto__ = trueProto;
        return _this;
    }
    return HttpError;
}(Error));

/** Error thrown when a timeout elapses. */
var TimeoutError = /** @class */ (function (_super) {
    __extends(TimeoutError, _super);
    /** Constructs a new instance of {@link @aspnet/signalr.TimeoutError}.
     *
     * @param {string} errorMessage A descriptive error message.
     */
    function TimeoutError(errorMessage) {
        var _newTarget = this.constructor;
        if (errorMessage === void 0) { errorMessage = "A timeout occurred."; }
        var _this = this;
        var trueProto = _newTarget.prototype;
        _this = _super.call(this, errorMessage) || this;
        // Workaround issue in Typescript compiler
        // https://github.com/Microsoft/TypeScript/issues/13965#issuecomment-278570200
        _this.__proto__ = trueProto;
        return _this;
    }
    return TimeoutError;
}(Error));

/** Error thrown when an action is aborted. */
var AbortError = /** @class */ (function (_super) {
    __extends(AbortError, _super);
    /** Constructs a new instance of {@link AbortError}.
     *
     * @param {string} errorMessage A descriptive error message.
     */
    function AbortError(errorMessage) {
        var _newTarget = this.constructor;
        if (errorMessage === void 0) { errorMessage = "An abort occurred."; }
        var _this = this;
        var trueProto = _newTarget.prototype;
        _this = _super.call(this, errorMessage) || this;
        // Workaround issue in Typescript compiler
        // https://github.com/Microsoft/TypeScript/issues/13965#issuecomment-278570200
        _this.__proto__ = trueProto;
        return _this;
    }
    return AbortError;
}(Error));

//# sourceMappingURL=Errors.js.map

/***/ }),

/***/ "./node_modules/@aspnet/signalr/dist/esm/HandshakeProtocol.js":
/*!********************************************************************!*\
  !*** ./node_modules/@aspnet/signalr/dist/esm/HandshakeProtocol.js ***!
  \********************************************************************/
/*! exports provided: HandshakeProtocol */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(Buffer) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HandshakeProtocol", function() { return HandshakeProtocol; });
/* harmony import */ var _TextMessageFormat__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./TextMessageFormat */ "./node_modules/@aspnet/signalr/dist/esm/TextMessageFormat.js");
/* harmony import */ var _Utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Utils */ "./node_modules/@aspnet/signalr/dist/esm/Utils.js");
// Copyright (c) .NET Foundation. All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.


/** @private */
var HandshakeProtocol = /** @class */ (function () {
    function HandshakeProtocol() {
    }
    // Handshake request is always JSON
    HandshakeProtocol.prototype.writeHandshakeRequest = function (handshakeRequest) {
        return _TextMessageFormat__WEBPACK_IMPORTED_MODULE_0__["TextMessageFormat"].write(JSON.stringify(handshakeRequest));
    };
    HandshakeProtocol.prototype.parseHandshakeResponse = function (data) {
        var responseMessage;
        var messageData;
        var remainingData;
        if (Object(_Utils__WEBPACK_IMPORTED_MODULE_1__["isArrayBuffer"])(data) || (typeof Buffer !== "undefined" && data instanceof Buffer)) {
            // Format is binary but still need to read JSON text from handshake response
            var binaryData = new Uint8Array(data);
            var separatorIndex = binaryData.indexOf(_TextMessageFormat__WEBPACK_IMPORTED_MODULE_0__["TextMessageFormat"].RecordSeparatorCode);
            if (separatorIndex === -1) {
                throw new Error("Message is incomplete.");
            }
            // content before separator is handshake response
            // optional content after is additional messages
            var responseLength = separatorIndex + 1;
            messageData = String.fromCharCode.apply(null, binaryData.slice(0, responseLength));
            remainingData = (binaryData.byteLength > responseLength) ? binaryData.slice(responseLength).buffer : null;
        }
        else {
            var textData = data;
            var separatorIndex = textData.indexOf(_TextMessageFormat__WEBPACK_IMPORTED_MODULE_0__["TextMessageFormat"].RecordSeparator);
            if (separatorIndex === -1) {
                throw new Error("Message is incomplete.");
            }
            // content before separator is handshake response
            // optional content after is additional messages
            var responseLength = separatorIndex + 1;
            messageData = textData.substring(0, responseLength);
            remainingData = (textData.length > responseLength) ? textData.substring(responseLength) : null;
        }
        // At this point we should have just the single handshake message
        var messages = _TextMessageFormat__WEBPACK_IMPORTED_MODULE_0__["TextMessageFormat"].parse(messageData);
        var response = JSON.parse(messages[0]);
        if (response.type) {
            throw new Error("Expected a handshake response from the server.");
        }
        responseMessage = response;
        // multiple messages could have arrived with handshake
        // return additional data to be parsed as usual, or null if all parsed
        return [remainingData, responseMessage];
    };
    return HandshakeProtocol;
}());

//# sourceMappingURL=HandshakeProtocol.js.map
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../buffer/index.js */ "./node_modules/buffer/index.js").Buffer))

/***/ }),

/***/ "./node_modules/@aspnet/signalr/dist/esm/HttpClient.js":
/*!*************************************************************!*\
  !*** ./node_modules/@aspnet/signalr/dist/esm/HttpClient.js ***!
  \*************************************************************/
/*! exports provided: HttpResponse, HttpClient */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HttpResponse", function() { return HttpResponse; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HttpClient", function() { return HttpClient; });
// Copyright (c) .NET Foundation. All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
var __assign = (undefined && undefined.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
/** Represents an HTTP response. */
var HttpResponse = /** @class */ (function () {
    function HttpResponse(statusCode, statusText, content) {
        this.statusCode = statusCode;
        this.statusText = statusText;
        this.content = content;
    }
    return HttpResponse;
}());

/** Abstraction over an HTTP client.
 *
 * This class provides an abstraction over an HTTP client so that a different implementation can be provided on different platforms.
 */
var HttpClient = /** @class */ (function () {
    function HttpClient() {
    }
    HttpClient.prototype.get = function (url, options) {
        return this.send(__assign({}, options, { method: "GET", url: url }));
    };
    HttpClient.prototype.post = function (url, options) {
        return this.send(__assign({}, options, { method: "POST", url: url }));
    };
    HttpClient.prototype.delete = function (url, options) {
        return this.send(__assign({}, options, { method: "DELETE", url: url }));
    };
    /** Gets all cookies that apply to the specified URL.
     *
     * @param url The URL that the cookies are valid for.
     * @returns {string} A string containing all the key-value cookie pairs for the specified URL.
     */
    // @ts-ignore
    HttpClient.prototype.getCookieString = function (url) {
        return "";
    };
    return HttpClient;
}());

//# sourceMappingURL=HttpClient.js.map

/***/ }),

/***/ "./node_modules/@aspnet/signalr/dist/esm/HttpConnection.js":
/*!*****************************************************************!*\
  !*** ./node_modules/@aspnet/signalr/dist/esm/HttpConnection.js ***!
  \*****************************************************************/
/*! exports provided: HttpConnection */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HttpConnection", function() { return HttpConnection; });
/* harmony import */ var _DefaultHttpClient__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./DefaultHttpClient */ "./node_modules/@aspnet/signalr/dist/esm/DefaultHttpClient.js");
/* harmony import */ var _ILogger__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ILogger */ "./node_modules/@aspnet/signalr/dist/esm/ILogger.js");
/* harmony import */ var _ITransport__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ITransport */ "./node_modules/@aspnet/signalr/dist/esm/ITransport.js");
/* harmony import */ var _LongPollingTransport__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./LongPollingTransport */ "./node_modules/@aspnet/signalr/dist/esm/LongPollingTransport.js");
/* harmony import */ var _ServerSentEventsTransport__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./ServerSentEventsTransport */ "./node_modules/@aspnet/signalr/dist/esm/ServerSentEventsTransport.js");
/* harmony import */ var _Utils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Utils */ "./node_modules/@aspnet/signalr/dist/esm/Utils.js");
/* harmony import */ var _WebSocketTransport__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./WebSocketTransport */ "./node_modules/@aspnet/signalr/dist/esm/WebSocketTransport.js");
// Copyright (c) .NET Foundation. All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};







var MAX_REDIRECTS = 100;
var WebSocketModule = null;
var EventSourceModule = null;
if (typeof window === "undefined" && "function" !== "undefined") {
    // In order to ignore the dynamic require in webpack builds we need to do this magic
    // @ts-ignore: TS doesn't know about these names
    var requireFunc =  true ? require : undefined;
    WebSocketModule = requireFunc("ws");
    EventSourceModule = requireFunc("eventsource");
}
/** @private */
var HttpConnection = /** @class */ (function () {
    function HttpConnection(url, options) {
        if (options === void 0) { options = {}; }
        this.features = {};
        _Utils__WEBPACK_IMPORTED_MODULE_5__["Arg"].isRequired(url, "url");
        this.logger = Object(_Utils__WEBPACK_IMPORTED_MODULE_5__["createLogger"])(options.logger);
        this.baseUrl = this.resolveUrl(url);
        options = options || {};
        options.logMessageContent = options.logMessageContent || false;
        var isNode = typeof window === "undefined";
        if (!isNode && typeof WebSocket !== "undefined" && !options.WebSocket) {
            options.WebSocket = WebSocket;
        }
        else if (isNode && !options.WebSocket) {
            if (WebSocketModule) {
                options.WebSocket = WebSocketModule;
            }
        }
        if (!isNode && typeof EventSource !== "undefined" && !options.EventSource) {
            options.EventSource = EventSource;
        }
        else if (isNode && !options.EventSource) {
            if (typeof EventSourceModule !== "undefined") {
                options.EventSource = EventSourceModule;
            }
        }
        this.httpClient = options.httpClient || new _DefaultHttpClient__WEBPACK_IMPORTED_MODULE_0__["DefaultHttpClient"](this.logger);
        this.connectionState = 2 /* Disconnected */;
        this.options = options;
        this.onreceive = null;
        this.onclose = null;
    }
    HttpConnection.prototype.start = function (transferFormat) {
        transferFormat = transferFormat || _ITransport__WEBPACK_IMPORTED_MODULE_2__["TransferFormat"].Binary;
        _Utils__WEBPACK_IMPORTED_MODULE_5__["Arg"].isIn(transferFormat, _ITransport__WEBPACK_IMPORTED_MODULE_2__["TransferFormat"], "transferFormat");
        this.logger.log(_ILogger__WEBPACK_IMPORTED_MODULE_1__["LogLevel"].Debug, "Starting connection with transfer format '" + _ITransport__WEBPACK_IMPORTED_MODULE_2__["TransferFormat"][transferFormat] + "'.");
        if (this.connectionState !== 2 /* Disconnected */) {
            return Promise.reject(new Error("Cannot start a connection that is not in the 'Disconnected' state."));
        }
        this.connectionState = 0 /* Connecting */;
        this.startPromise = this.startInternal(transferFormat);
        return this.startPromise;
    };
    HttpConnection.prototype.send = function (data) {
        if (this.connectionState !== 1 /* Connected */) {
            throw new Error("Cannot send data if the connection is not in the 'Connected' State.");
        }
        // Transport will not be null if state is connected
        return this.transport.send(data);
    };
    HttpConnection.prototype.stop = function (error) {
        return __awaiter(this, void 0, void 0, function () {
            var e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.connectionState = 2 /* Disconnected */;
                        // Set error as soon as possible otherwise there is a race between
                        // the transport closing and providing an error and the error from a close message
                        // We would prefer the close message error.
                        this.stopError = error;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.startPromise];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        e_1 = _a.sent();
                        return [3 /*break*/, 4];
                    case 4:
                        if (!this.transport) return [3 /*break*/, 6];
                        return [4 /*yield*/, this.transport.stop()];
                    case 5:
                        _a.sent();
                        this.transport = undefined;
                        _a.label = 6;
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    HttpConnection.prototype.startInternal = function (transferFormat) {
        return __awaiter(this, void 0, void 0, function () {
            var url, negotiateResponse, redirects, _loop_1, this_1, state_1, e_2;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = this.baseUrl;
                        this.accessTokenFactory = this.options.accessTokenFactory;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 12, , 13]);
                        if (!this.options.skipNegotiation) return [3 /*break*/, 5];
                        if (!(this.options.transport === _ITransport__WEBPACK_IMPORTED_MODULE_2__["HttpTransportType"].WebSockets)) return [3 /*break*/, 3];
                        // No need to add a connection ID in this case
                        this.transport = this.constructTransport(_ITransport__WEBPACK_IMPORTED_MODULE_2__["HttpTransportType"].WebSockets);
                        // We should just call connect directly in this case.
                        // No fallback or negotiate in this case.
                        return [4 /*yield*/, this.transport.connect(url, transferFormat)];
                    case 2:
                        // We should just call connect directly in this case.
                        // No fallback or negotiate in this case.
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3: throw Error("Negotiation can only be skipped when using the WebSocket transport directly.");
                    case 4: return [3 /*break*/, 11];
                    case 5:
                        negotiateResponse = null;
                        redirects = 0;
                        _loop_1 = function () {
                            var accessToken_1;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, this_1.getNegotiationResponse(url)];
                                    case 1:
                                        negotiateResponse = _a.sent();
                                        // the user tries to stop the connection when it is being started
                                        if (this_1.connectionState === 2 /* Disconnected */) {
                                            return [2 /*return*/, { value: void 0 }];
                                        }
                                        if (negotiateResponse.error) {
                                            throw Error(negotiateResponse.error);
                                        }
                                        if (negotiateResponse.ProtocolVersion) {
                                            throw Error("Detected a connection attempt to an ASP.NET SignalR Server. This client only supports connecting to an ASP.NET Core SignalR Server. See https://aka.ms/signalr-core-differences for details.");
                                        }
                                        if (negotiateResponse.url) {
                                            url = negotiateResponse.url;
                                        }
                                        if (negotiateResponse.accessToken) {
                                            accessToken_1 = negotiateResponse.accessToken;
                                            this_1.accessTokenFactory = function () { return accessToken_1; };
                                        }
                                        redirects++;
                                        return [2 /*return*/];
                                }
                            });
                        };
                        this_1 = this;
                        _a.label = 6;
                    case 6: return [5 /*yield**/, _loop_1()];
                    case 7:
                        state_1 = _a.sent();
                        if (typeof state_1 === "object")
                            return [2 /*return*/, state_1.value];
                        _a.label = 8;
                    case 8:
                        if (negotiateResponse.url && redirects < MAX_REDIRECTS) return [3 /*break*/, 6];
                        _a.label = 9;
                    case 9:
                        if (redirects === MAX_REDIRECTS && negotiateResponse.url) {
                            throw Error("Negotiate redirection limit exceeded.");
                        }
                        return [4 /*yield*/, this.createTransport(url, this.options.transport, negotiateResponse, transferFormat)];
                    case 10:
                        _a.sent();
                        _a.label = 11;
                    case 11:
                        if (this.transport instanceof _LongPollingTransport__WEBPACK_IMPORTED_MODULE_3__["LongPollingTransport"]) {
                            this.features.inherentKeepAlive = true;
                        }
                        this.transport.onreceive = this.onreceive;
                        this.transport.onclose = function (e) { return _this.stopConnection(e); };
                        // only change the state if we were connecting to not overwrite
                        // the state if the connection is already marked as Disconnected
                        this.changeState(0 /* Connecting */, 1 /* Connected */);
                        return [3 /*break*/, 13];
                    case 12:
                        e_2 = _a.sent();
                        this.logger.log(_ILogger__WEBPACK_IMPORTED_MODULE_1__["LogLevel"].Error, "Failed to start the connection: " + e_2);
                        this.connectionState = 2 /* Disconnected */;
                        this.transport = undefined;
                        throw e_2;
                    case 13: return [2 /*return*/];
                }
            });
        });
    };
    HttpConnection.prototype.getNegotiationResponse = function (url) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, headers, token, negotiateUrl, response, e_3;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!this.accessTokenFactory) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.accessTokenFactory()];
                    case 1:
                        token = _b.sent();
                        if (token) {
                            headers = (_a = {},
                                _a["Authorization"] = "Bearer " + token,
                                _a);
                        }
                        _b.label = 2;
                    case 2:
                        negotiateUrl = this.resolveNegotiateUrl(url);
                        this.logger.log(_ILogger__WEBPACK_IMPORTED_MODULE_1__["LogLevel"].Debug, "Sending negotiation request: " + negotiateUrl + ".");
                        _b.label = 3;
                    case 3:
                        _b.trys.push([3, 5, , 6]);
                        return [4 /*yield*/, this.httpClient.post(negotiateUrl, {
                                content: "",
                                headers: headers,
                            })];
                    case 4:
                        response = _b.sent();
                        if (response.statusCode !== 200) {
                            throw Error("Unexpected status code returned from negotiate " + response.statusCode);
                        }
                        return [2 /*return*/, JSON.parse(response.content)];
                    case 5:
                        e_3 = _b.sent();
                        this.logger.log(_ILogger__WEBPACK_IMPORTED_MODULE_1__["LogLevel"].Error, "Failed to complete negotiation with the server: " + e_3);
                        throw e_3;
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    HttpConnection.prototype.createConnectUrl = function (url, connectionId) {
        if (!connectionId) {
            return url;
        }
        return url + (url.indexOf("?") === -1 ? "?" : "&") + ("id=" + connectionId);
    };
    HttpConnection.prototype.createTransport = function (url, requestedTransport, negotiateResponse, requestedTransferFormat) {
        return __awaiter(this, void 0, void 0, function () {
            var connectUrl, transports, _i, transports_1, endpoint, transport, ex_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        connectUrl = this.createConnectUrl(url, negotiateResponse.connectionId);
                        if (!this.isITransport(requestedTransport)) return [3 /*break*/, 2];
                        this.logger.log(_ILogger__WEBPACK_IMPORTED_MODULE_1__["LogLevel"].Debug, "Connection was provided an instance of ITransport, using that directly.");
                        this.transport = requestedTransport;
                        return [4 /*yield*/, this.transport.connect(connectUrl, requestedTransferFormat)];
                    case 1:
                        _a.sent();
                        // only change the state if we were connecting to not overwrite
                        // the state if the connection is already marked as Disconnected
                        this.changeState(0 /* Connecting */, 1 /* Connected */);
                        return [2 /*return*/];
                    case 2:
                        transports = negotiateResponse.availableTransports || [];
                        _i = 0, transports_1 = transports;
                        _a.label = 3;
                    case 3:
                        if (!(_i < transports_1.length)) return [3 /*break*/, 9];
                        endpoint = transports_1[_i];
                        this.connectionState = 0 /* Connecting */;
                        transport = this.resolveTransport(endpoint, requestedTransport, requestedTransferFormat);
                        if (!(typeof transport === "number")) return [3 /*break*/, 8];
                        this.transport = this.constructTransport(transport);
                        if (!!negotiateResponse.connectionId) return [3 /*break*/, 5];
                        return [4 /*yield*/, this.getNegotiationResponse(url)];
                    case 4:
                        negotiateResponse = _a.sent();
                        connectUrl = this.createConnectUrl(url, negotiateResponse.connectionId);
                        _a.label = 5;
                    case 5:
                        _a.trys.push([5, 7, , 8]);
                        return [4 /*yield*/, this.transport.connect(connectUrl, requestedTransferFormat)];
                    case 6:
                        _a.sent();
                        this.changeState(0 /* Connecting */, 1 /* Connected */);
                        return [2 /*return*/];
                    case 7:
                        ex_1 = _a.sent();
                        this.logger.log(_ILogger__WEBPACK_IMPORTED_MODULE_1__["LogLevel"].Error, "Failed to start the transport '" + _ITransport__WEBPACK_IMPORTED_MODULE_2__["HttpTransportType"][transport] + "': " + ex_1);
                        this.connectionState = 2 /* Disconnected */;
                        negotiateResponse.connectionId = undefined;
                        return [3 /*break*/, 8];
                    case 8:
                        _i++;
                        return [3 /*break*/, 3];
                    case 9: throw new Error("Unable to initialize any of the available transports.");
                }
            });
        });
    };
    HttpConnection.prototype.constructTransport = function (transport) {
        switch (transport) {
            case _ITransport__WEBPACK_IMPORTED_MODULE_2__["HttpTransportType"].WebSockets:
                if (!this.options.WebSocket) {
                    throw new Error("'WebSocket' is not supported in your environment.");
                }
                return new _WebSocketTransport__WEBPACK_IMPORTED_MODULE_6__["WebSocketTransport"](this.httpClient, this.accessTokenFactory, this.logger, this.options.logMessageContent || false, this.options.WebSocket);
            case _ITransport__WEBPACK_IMPORTED_MODULE_2__["HttpTransportType"].ServerSentEvents:
                if (!this.options.EventSource) {
                    throw new Error("'EventSource' is not supported in your environment.");
                }
                return new _ServerSentEventsTransport__WEBPACK_IMPORTED_MODULE_4__["ServerSentEventsTransport"](this.httpClient, this.accessTokenFactory, this.logger, this.options.logMessageContent || false, this.options.EventSource);
            case _ITransport__WEBPACK_IMPORTED_MODULE_2__["HttpTransportType"].LongPolling:
                return new _LongPollingTransport__WEBPACK_IMPORTED_MODULE_3__["LongPollingTransport"](this.httpClient, this.accessTokenFactory, this.logger, this.options.logMessageContent || false);
            default:
                throw new Error("Unknown transport: " + transport + ".");
        }
    };
    HttpConnection.prototype.resolveTransport = function (endpoint, requestedTransport, requestedTransferFormat) {
        var transport = _ITransport__WEBPACK_IMPORTED_MODULE_2__["HttpTransportType"][endpoint.transport];
        if (transport === null || transport === undefined) {
            this.logger.log(_ILogger__WEBPACK_IMPORTED_MODULE_1__["LogLevel"].Debug, "Skipping transport '" + endpoint.transport + "' because it is not supported by this client.");
        }
        else {
            var transferFormats = endpoint.transferFormats.map(function (s) { return _ITransport__WEBPACK_IMPORTED_MODULE_2__["TransferFormat"][s]; });
            if (transportMatches(requestedTransport, transport)) {
                if (transferFormats.indexOf(requestedTransferFormat) >= 0) {
                    if ((transport === _ITransport__WEBPACK_IMPORTED_MODULE_2__["HttpTransportType"].WebSockets && !this.options.WebSocket) ||
                        (transport === _ITransport__WEBPACK_IMPORTED_MODULE_2__["HttpTransportType"].ServerSentEvents && !this.options.EventSource)) {
                        this.logger.log(_ILogger__WEBPACK_IMPORTED_MODULE_1__["LogLevel"].Debug, "Skipping transport '" + _ITransport__WEBPACK_IMPORTED_MODULE_2__["HttpTransportType"][transport] + "' because it is not supported in your environment.'");
                    }
                    else {
                        this.logger.log(_ILogger__WEBPACK_IMPORTED_MODULE_1__["LogLevel"].Debug, "Selecting transport '" + _ITransport__WEBPACK_IMPORTED_MODULE_2__["HttpTransportType"][transport] + "'.");
                        return transport;
                    }
                }
                else {
                    this.logger.log(_ILogger__WEBPACK_IMPORTED_MODULE_1__["LogLevel"].Debug, "Skipping transport '" + _ITransport__WEBPACK_IMPORTED_MODULE_2__["HttpTransportType"][transport] + "' because it does not support the requested transfer format '" + _ITransport__WEBPACK_IMPORTED_MODULE_2__["TransferFormat"][requestedTransferFormat] + "'.");
                }
            }
            else {
                this.logger.log(_ILogger__WEBPACK_IMPORTED_MODULE_1__["LogLevel"].Debug, "Skipping transport '" + _ITransport__WEBPACK_IMPORTED_MODULE_2__["HttpTransportType"][transport] + "' because it was disabled by the client.");
            }
        }
        return null;
    };
    HttpConnection.prototype.isITransport = function (transport) {
        return transport && typeof (transport) === "object" && "connect" in transport;
    };
    HttpConnection.prototype.changeState = function (from, to) {
        if (this.connectionState === from) {
            this.connectionState = to;
            return true;
        }
        return false;
    };
    HttpConnection.prototype.stopConnection = function (error) {
        this.transport = undefined;
        // If we have a stopError, it takes precedence over the error from the transport
        error = this.stopError || error;
        if (error) {
            this.logger.log(_ILogger__WEBPACK_IMPORTED_MODULE_1__["LogLevel"].Error, "Connection disconnected with error '" + error + "'.");
        }
        else {
            this.logger.log(_ILogger__WEBPACK_IMPORTED_MODULE_1__["LogLevel"].Information, "Connection disconnected.");
        }
        this.connectionState = 2 /* Disconnected */;
        if (this.onclose) {
            this.onclose(error);
        }
    };
    HttpConnection.prototype.resolveUrl = function (url) {
        // startsWith is not supported in IE
        if (url.lastIndexOf("https://", 0) === 0 || url.lastIndexOf("http://", 0) === 0) {
            return url;
        }
        if (typeof window === "undefined" || !window || !window.document) {
            throw new Error("Cannot resolve '" + url + "'.");
        }
        // Setting the url to the href propery of an anchor tag handles normalization
        // for us. There are 3 main cases.
        // 1. Relative  path normalization e.g "b" -> "http://localhost:5000/a/b"
        // 2. Absolute path normalization e.g "/a/b" -> "http://localhost:5000/a/b"
        // 3. Networkpath reference normalization e.g "//localhost:5000/a/b" -> "http://localhost:5000/a/b"
        var aTag = window.document.createElement("a");
        aTag.href = url;
        this.logger.log(_ILogger__WEBPACK_IMPORTED_MODULE_1__["LogLevel"].Information, "Normalizing '" + url + "' to '" + aTag.href + "'.");
        return aTag.href;
    };
    HttpConnection.prototype.resolveNegotiateUrl = function (url) {
        var index = url.indexOf("?");
        var negotiateUrl = url.substring(0, index === -1 ? url.length : index);
        if (negotiateUrl[negotiateUrl.length - 1] !== "/") {
            negotiateUrl += "/";
        }
        negotiateUrl += "negotiate";
        negotiateUrl += index === -1 ? "" : url.substring(index);
        return negotiateUrl;
    };
    return HttpConnection;
}());

function transportMatches(requestedTransport, actualTransport) {
    return !requestedTransport || ((actualTransport & requestedTransport) !== 0);
}
//# sourceMappingURL=HttpConnection.js.map

/***/ }),

/***/ "./node_modules/@aspnet/signalr/dist/esm/HubConnection.js":
/*!****************************************************************!*\
  !*** ./node_modules/@aspnet/signalr/dist/esm/HubConnection.js ***!
  \****************************************************************/
/*! exports provided: HubConnectionState, HubConnection */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HubConnectionState", function() { return HubConnectionState; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HubConnection", function() { return HubConnection; });
/* harmony import */ var _HandshakeProtocol__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./HandshakeProtocol */ "./node_modules/@aspnet/signalr/dist/esm/HandshakeProtocol.js");
/* harmony import */ var _IHubProtocol__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./IHubProtocol */ "./node_modules/@aspnet/signalr/dist/esm/IHubProtocol.js");
/* harmony import */ var _ILogger__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ILogger */ "./node_modules/@aspnet/signalr/dist/esm/ILogger.js");
/* harmony import */ var _Utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Utils */ "./node_modules/@aspnet/signalr/dist/esm/Utils.js");
// Copyright (c) .NET Foundation. All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};




var DEFAULT_TIMEOUT_IN_MS = 30 * 1000;
var DEFAULT_PING_INTERVAL_IN_MS = 15 * 1000;
/** Describes the current state of the {@link HubConnection} to the server. */
var HubConnectionState;
(function (HubConnectionState) {
    /** The hub connection is disconnected. */
    HubConnectionState[HubConnectionState["Disconnected"] = 0] = "Disconnected";
    /** The hub connection is connected. */
    HubConnectionState[HubConnectionState["Connected"] = 1] = "Connected";
})(HubConnectionState || (HubConnectionState = {}));
/** Represents a connection to a SignalR Hub. */
var HubConnection = /** @class */ (function () {
    function HubConnection(connection, logger, protocol) {
        var _this = this;
        _Utils__WEBPACK_IMPORTED_MODULE_3__["Arg"].isRequired(connection, "connection");
        _Utils__WEBPACK_IMPORTED_MODULE_3__["Arg"].isRequired(logger, "logger");
        _Utils__WEBPACK_IMPORTED_MODULE_3__["Arg"].isRequired(protocol, "protocol");
        this.serverTimeoutInMilliseconds = DEFAULT_TIMEOUT_IN_MS;
        this.keepAliveIntervalInMilliseconds = DEFAULT_PING_INTERVAL_IN_MS;
        this.logger = logger;
        this.protocol = protocol;
        this.connection = connection;
        this.handshakeProtocol = new _HandshakeProtocol__WEBPACK_IMPORTED_MODULE_0__["HandshakeProtocol"]();
        this.connection.onreceive = function (data) { return _this.processIncomingData(data); };
        this.connection.onclose = function (error) { return _this.connectionClosed(error); };
        this.callbacks = {};
        this.methods = {};
        this.closedCallbacks = [];
        this.id = 0;
        this.receivedHandshakeResponse = false;
        this.connectionState = HubConnectionState.Disconnected;
        this.cachedPingMessage = this.protocol.writeMessage({ type: _IHubProtocol__WEBPACK_IMPORTED_MODULE_1__["MessageType"].Ping });
    }
    /** @internal */
    // Using a public static factory method means we can have a private constructor and an _internal_
    // create method that can be used by HubConnectionBuilder. An "internal" constructor would just
    // be stripped away and the '.d.ts' file would have no constructor, which is interpreted as a
    // public parameter-less constructor.
    HubConnection.create = function (connection, logger, protocol) {
        return new HubConnection(connection, logger, protocol);
    };
    Object.defineProperty(HubConnection.prototype, "state", {
        /** Indicates the state of the {@link HubConnection} to the server. */
        get: function () {
            return this.connectionState;
        },
        enumerable: true,
        configurable: true
    });
    /** Starts the connection.
     *
     * @returns {Promise<void>} A Promise that resolves when the connection has been successfully established, or rejects with an error.
     */
    HubConnection.prototype.start = function () {
        return __awaiter(this, void 0, void 0, function () {
            var handshakeRequest, handshakePromise;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        handshakeRequest = {
                            protocol: this.protocol.name,
                            version: this.protocol.version,
                        };
                        this.logger.log(_ILogger__WEBPACK_IMPORTED_MODULE_2__["LogLevel"].Debug, "Starting HubConnection.");
                        this.receivedHandshakeResponse = false;
                        handshakePromise = new Promise(function (resolve, reject) {
                            _this.handshakeResolver = resolve;
                            _this.handshakeRejecter = reject;
                        });
                        return [4 /*yield*/, this.connection.start(this.protocol.transferFormat)];
                    case 1:
                        _a.sent();
                        this.logger.log(_ILogger__WEBPACK_IMPORTED_MODULE_2__["LogLevel"].Debug, "Sending handshake request.");
                        return [4 /*yield*/, this.sendMessage(this.handshakeProtocol.writeHandshakeRequest(handshakeRequest))];
                    case 2:
                        _a.sent();
                        this.logger.log(_ILogger__WEBPACK_IMPORTED_MODULE_2__["LogLevel"].Information, "Using HubProtocol '" + this.protocol.name + "'.");
                        // defensively cleanup timeout in case we receive a message from the server before we finish start
                        this.cleanupTimeout();
                        this.resetTimeoutPeriod();
                        this.resetKeepAliveInterval();
                        // Wait for the handshake to complete before marking connection as connected
                        return [4 /*yield*/, handshakePromise];
                    case 3:
                        // Wait for the handshake to complete before marking connection as connected
                        _a.sent();
                        this.connectionState = HubConnectionState.Connected;
                        return [2 /*return*/];
                }
            });
        });
    };
    /** Stops the connection.
     *
     * @returns {Promise<void>} A Promise that resolves when the connection has been successfully terminated, or rejects with an error.
     */
    HubConnection.prototype.stop = function () {
        this.logger.log(_ILogger__WEBPACK_IMPORTED_MODULE_2__["LogLevel"].Debug, "Stopping HubConnection.");
        this.cleanupTimeout();
        this.cleanupPingTimer();
        return this.connection.stop();
    };
    /** Invokes a streaming hub method on the server using the specified name and arguments.
     *
     * @typeparam T The type of the items returned by the server.
     * @param {string} methodName The name of the server method to invoke.
     * @param {any[]} args The arguments used to invoke the server method.
     * @returns {IStreamResult<T>} An object that yields results from the server as they are received.
     */
    HubConnection.prototype.stream = function (methodName) {
        var _this = this;
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var invocationDescriptor = this.createStreamInvocation(methodName, args);
        var subject = new _Utils__WEBPACK_IMPORTED_MODULE_3__["Subject"](function () {
            var cancelInvocation = _this.createCancelInvocation(invocationDescriptor.invocationId);
            var cancelMessage = _this.protocol.writeMessage(cancelInvocation);
            delete _this.callbacks[invocationDescriptor.invocationId];
            return _this.sendMessage(cancelMessage);
        });
        this.callbacks[invocationDescriptor.invocationId] = function (invocationEvent, error) {
            if (error) {
                subject.error(error);
                return;
            }
            else if (invocationEvent) {
                // invocationEvent will not be null when an error is not passed to the callback
                if (invocationEvent.type === _IHubProtocol__WEBPACK_IMPORTED_MODULE_1__["MessageType"].Completion) {
                    if (invocationEvent.error) {
                        subject.error(new Error(invocationEvent.error));
                    }
                    else {
                        subject.complete();
                    }
                }
                else {
                    subject.next((invocationEvent.item));
                }
            }
        };
        var message = this.protocol.writeMessage(invocationDescriptor);
        this.sendMessage(message)
            .catch(function (e) {
            subject.error(e);
            delete _this.callbacks[invocationDescriptor.invocationId];
        });
        return subject;
    };
    HubConnection.prototype.sendMessage = function (message) {
        this.resetKeepAliveInterval();
        return this.connection.send(message);
    };
    /** Invokes a hub method on the server using the specified name and arguments. Does not wait for a response from the receiver.
     *
     * The Promise returned by this method resolves when the client has sent the invocation to the server. The server may still
     * be processing the invocation.
     *
     * @param {string} methodName The name of the server method to invoke.
     * @param {any[]} args The arguments used to invoke the server method.
     * @returns {Promise<void>} A Promise that resolves when the invocation has been successfully sent, or rejects with an error.
     */
    HubConnection.prototype.send = function (methodName) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var invocationDescriptor = this.createInvocation(methodName, args, true);
        var message = this.protocol.writeMessage(invocationDescriptor);
        return this.sendMessage(message);
    };
    /** Invokes a hub method on the server using the specified name and arguments.
     *
     * The Promise returned by this method resolves when the server indicates it has finished invoking the method. When the promise
     * resolves, the server has finished invoking the method. If the server method returns a result, it is produced as the result of
     * resolving the Promise.
     *
     * @typeparam T The expected return type.
     * @param {string} methodName The name of the server method to invoke.
     * @param {any[]} args The arguments used to invoke the server method.
     * @returns {Promise<T>} A Promise that resolves with the result of the server method (if any), or rejects with an error.
     */
    HubConnection.prototype.invoke = function (methodName) {
        var _this = this;
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var invocationDescriptor = this.createInvocation(methodName, args, false);
        var p = new Promise(function (resolve, reject) {
            // invocationId will always have a value for a non-blocking invocation
            _this.callbacks[invocationDescriptor.invocationId] = function (invocationEvent, error) {
                if (error) {
                    reject(error);
                    return;
                }
                else if (invocationEvent) {
                    // invocationEvent will not be null when an error is not passed to the callback
                    if (invocationEvent.type === _IHubProtocol__WEBPACK_IMPORTED_MODULE_1__["MessageType"].Completion) {
                        if (invocationEvent.error) {
                            reject(new Error(invocationEvent.error));
                        }
                        else {
                            resolve(invocationEvent.result);
                        }
                    }
                    else {
                        reject(new Error("Unexpected message type: " + invocationEvent.type));
                    }
                }
            };
            var message = _this.protocol.writeMessage(invocationDescriptor);
            _this.sendMessage(message)
                .catch(function (e) {
                reject(e);
                // invocationId will always have a value for a non-blocking invocation
                delete _this.callbacks[invocationDescriptor.invocationId];
            });
        });
        return p;
    };
    /** Registers a handler that will be invoked when the hub method with the specified method name is invoked.
     *
     * @param {string} methodName The name of the hub method to define.
     * @param {Function} newMethod The handler that will be raised when the hub method is invoked.
     */
    HubConnection.prototype.on = function (methodName, newMethod) {
        if (!methodName || !newMethod) {
            return;
        }
        methodName = methodName.toLowerCase();
        if (!this.methods[methodName]) {
            this.methods[methodName] = [];
        }
        // Preventing adding the same handler multiple times.
        if (this.methods[methodName].indexOf(newMethod) !== -1) {
            return;
        }
        this.methods[methodName].push(newMethod);
    };
    HubConnection.prototype.off = function (methodName, method) {
        if (!methodName) {
            return;
        }
        methodName = methodName.toLowerCase();
        var handlers = this.methods[methodName];
        if (!handlers) {
            return;
        }
        if (method) {
            var removeIdx = handlers.indexOf(method);
            if (removeIdx !== -1) {
                handlers.splice(removeIdx, 1);
                if (handlers.length === 0) {
                    delete this.methods[methodName];
                }
            }
        }
        else {
            delete this.methods[methodName];
        }
    };
    /** Registers a handler that will be invoked when the connection is closed.
     *
     * @param {Function} callback The handler that will be invoked when the connection is closed. Optionally receives a single argument containing the error that caused the connection to close (if any).
     */
    HubConnection.prototype.onclose = function (callback) {
        if (callback) {
            this.closedCallbacks.push(callback);
        }
    };
    HubConnection.prototype.processIncomingData = function (data) {
        this.cleanupTimeout();
        if (!this.receivedHandshakeResponse) {
            data = this.processHandshakeResponse(data);
            this.receivedHandshakeResponse = true;
        }
        // Data may have all been read when processing handshake response
        if (data) {
            // Parse the messages
            var messages = this.protocol.parseMessages(data, this.logger);
            for (var _i = 0, messages_1 = messages; _i < messages_1.length; _i++) {
                var message = messages_1[_i];
                switch (message.type) {
                    case _IHubProtocol__WEBPACK_IMPORTED_MODULE_1__["MessageType"].Invocation:
                        this.invokeClientMethod(message);
                        break;
                    case _IHubProtocol__WEBPACK_IMPORTED_MODULE_1__["MessageType"].StreamItem:
                    case _IHubProtocol__WEBPACK_IMPORTED_MODULE_1__["MessageType"].Completion:
                        var callback = this.callbacks[message.invocationId];
                        if (callback != null) {
                            if (message.type === _IHubProtocol__WEBPACK_IMPORTED_MODULE_1__["MessageType"].Completion) {
                                delete this.callbacks[message.invocationId];
                            }
                            callback(message);
                        }
                        break;
                    case _IHubProtocol__WEBPACK_IMPORTED_MODULE_1__["MessageType"].Ping:
                        // Don't care about pings
                        break;
                    case _IHubProtocol__WEBPACK_IMPORTED_MODULE_1__["MessageType"].Close:
                        this.logger.log(_ILogger__WEBPACK_IMPORTED_MODULE_2__["LogLevel"].Information, "Close message received from server.");
                        // We don't want to wait on the stop itself.
                        // tslint:disable-next-line:no-floating-promises
                        this.connection.stop(message.error ? new Error("Server returned an error on close: " + message.error) : undefined);
                        break;
                    default:
                        this.logger.log(_ILogger__WEBPACK_IMPORTED_MODULE_2__["LogLevel"].Warning, "Invalid message type: " + message.type + ".");
                        break;
                }
            }
        }
        this.resetTimeoutPeriod();
    };
    HubConnection.prototype.processHandshakeResponse = function (data) {
        var _a;
        var responseMessage;
        var remainingData;
        try {
            _a = this.handshakeProtocol.parseHandshakeResponse(data), remainingData = _a[0], responseMessage = _a[1];
        }
        catch (e) {
            var message = "Error parsing handshake response: " + e;
            this.logger.log(_ILogger__WEBPACK_IMPORTED_MODULE_2__["LogLevel"].Error, message);
            var error = new Error(message);
            // We don't want to wait on the stop itself.
            // tslint:disable-next-line:no-floating-promises
            this.connection.stop(error);
            this.handshakeRejecter(error);
            throw error;
        }
        if (responseMessage.error) {
            var message = "Server returned handshake error: " + responseMessage.error;
            this.logger.log(_ILogger__WEBPACK_IMPORTED_MODULE_2__["LogLevel"].Error, message);
            this.handshakeRejecter(message);
            // We don't want to wait on the stop itself.
            // tslint:disable-next-line:no-floating-promises
            this.connection.stop(new Error(message));
            throw new Error(message);
        }
        else {
            this.logger.log(_ILogger__WEBPACK_IMPORTED_MODULE_2__["LogLevel"].Debug, "Server handshake complete.");
        }
        this.handshakeResolver();
        return remainingData;
    };
    HubConnection.prototype.resetKeepAliveInterval = function () {
        var _this = this;
        this.cleanupPingTimer();
        this.pingServerHandle = setTimeout(function () { return __awaiter(_this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!(this.connectionState === HubConnectionState.Connected)) return [3 /*break*/, 4];
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.sendMessage(this.cachedPingMessage)];
                    case 2:
                        _b.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        _a = _b.sent();
                        // We don't care about the error. It should be seen elsewhere in the client.
                        // The connection is probably in a bad or closed state now, cleanup the timer so it stops triggering
                        this.cleanupPingTimer();
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); }, this.keepAliveIntervalInMilliseconds);
    };
    HubConnection.prototype.resetTimeoutPeriod = function () {
        var _this = this;
        if (!this.connection.features || !this.connection.features.inherentKeepAlive) {
            // Set the timeout timer
            this.timeoutHandle = setTimeout(function () { return _this.serverTimeout(); }, this.serverTimeoutInMilliseconds);
        }
    };
    HubConnection.prototype.serverTimeout = function () {
        // The server hasn't talked to us in a while. It doesn't like us anymore ... :(
        // Terminate the connection, but we don't need to wait on the promise.
        // tslint:disable-next-line:no-floating-promises
        this.connection.stop(new Error("Server timeout elapsed without receiving a message from the server."));
    };
    HubConnection.prototype.invokeClientMethod = function (invocationMessage) {
        var _this = this;
        var methods = this.methods[invocationMessage.target.toLowerCase()];
        if (methods) {
            methods.forEach(function (m) { return m.apply(_this, invocationMessage.arguments); });
            if (invocationMessage.invocationId) {
                // This is not supported in v1. So we return an error to avoid blocking the server waiting for the response.
                var message = "Server requested a response, which is not supported in this version of the client.";
                this.logger.log(_ILogger__WEBPACK_IMPORTED_MODULE_2__["LogLevel"].Error, message);
                // We don't need to wait on this Promise.
                // tslint:disable-next-line:no-floating-promises
                this.connection.stop(new Error(message));
            }
        }
        else {
            this.logger.log(_ILogger__WEBPACK_IMPORTED_MODULE_2__["LogLevel"].Warning, "No client method with the name '" + invocationMessage.target + "' found.");
        }
    };
    HubConnection.prototype.connectionClosed = function (error) {
        var _this = this;
        var callbacks = this.callbacks;
        this.callbacks = {};
        this.connectionState = HubConnectionState.Disconnected;
        // if handshake is in progress start will be waiting for the handshake promise, so we complete it
        // if it has already completed this should just noop
        if (this.handshakeRejecter) {
            this.handshakeRejecter(error);
        }
        Object.keys(callbacks)
            .forEach(function (key) {
            var callback = callbacks[key];
            callback(null, error ? error : new Error("Invocation canceled due to connection being closed."));
        });
        this.cleanupTimeout();
        this.cleanupPingTimer();
        this.closedCallbacks.forEach(function (c) { return c.apply(_this, [error]); });
    };
    HubConnection.prototype.cleanupPingTimer = function () {
        if (this.pingServerHandle) {
            clearTimeout(this.pingServerHandle);
        }
    };
    HubConnection.prototype.cleanupTimeout = function () {
        if (this.timeoutHandle) {
            clearTimeout(this.timeoutHandle);
        }
    };
    HubConnection.prototype.createInvocation = function (methodName, args, nonblocking) {
        if (nonblocking) {
            return {
                arguments: args,
                target: methodName,
                type: _IHubProtocol__WEBPACK_IMPORTED_MODULE_1__["MessageType"].Invocation,
            };
        }
        else {
            var id = this.id;
            this.id++;
            return {
                arguments: args,
                invocationId: id.toString(),
                target: methodName,
                type: _IHubProtocol__WEBPACK_IMPORTED_MODULE_1__["MessageType"].Invocation,
            };
        }
    };
    HubConnection.prototype.createStreamInvocation = function (methodName, args) {
        var id = this.id;
        this.id++;
        return {
            arguments: args,
            invocationId: id.toString(),
            target: methodName,
            type: _IHubProtocol__WEBPACK_IMPORTED_MODULE_1__["MessageType"].StreamInvocation,
        };
    };
    HubConnection.prototype.createCancelInvocation = function (id) {
        return {
            invocationId: id,
            type: _IHubProtocol__WEBPACK_IMPORTED_MODULE_1__["MessageType"].CancelInvocation,
        };
    };
    return HubConnection;
}());

//# sourceMappingURL=HubConnection.js.map

/***/ }),

/***/ "./node_modules/@aspnet/signalr/dist/esm/HubConnectionBuilder.js":
/*!***********************************************************************!*\
  !*** ./node_modules/@aspnet/signalr/dist/esm/HubConnectionBuilder.js ***!
  \***********************************************************************/
/*! exports provided: HubConnectionBuilder */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HubConnectionBuilder", function() { return HubConnectionBuilder; });
/* harmony import */ var _HttpConnection__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./HttpConnection */ "./node_modules/@aspnet/signalr/dist/esm/HttpConnection.js");
/* harmony import */ var _HubConnection__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./HubConnection */ "./node_modules/@aspnet/signalr/dist/esm/HubConnection.js");
/* harmony import */ var _JsonHubProtocol__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./JsonHubProtocol */ "./node_modules/@aspnet/signalr/dist/esm/JsonHubProtocol.js");
/* harmony import */ var _Loggers__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Loggers */ "./node_modules/@aspnet/signalr/dist/esm/Loggers.js");
/* harmony import */ var _Utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Utils */ "./node_modules/@aspnet/signalr/dist/esm/Utils.js");
// Copyright (c) .NET Foundation. All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.





/** A builder for configuring {@link @aspnet/signalr.HubConnection} instances. */
var HubConnectionBuilder = /** @class */ (function () {
    function HubConnectionBuilder() {
    }
    HubConnectionBuilder.prototype.configureLogging = function (logging) {
        _Utils__WEBPACK_IMPORTED_MODULE_4__["Arg"].isRequired(logging, "logging");
        if (isLogger(logging)) {
            this.logger = logging;
        }
        else {
            this.logger = new _Utils__WEBPACK_IMPORTED_MODULE_4__["ConsoleLogger"](logging);
        }
        return this;
    };
    HubConnectionBuilder.prototype.withUrl = function (url, transportTypeOrOptions) {
        _Utils__WEBPACK_IMPORTED_MODULE_4__["Arg"].isRequired(url, "url");
        this.url = url;
        // Flow-typing knows where it's at. Since HttpTransportType is a number and IHttpConnectionOptions is guaranteed
        // to be an object, we know (as does TypeScript) this comparison is all we need to figure out which overload was called.
        if (typeof transportTypeOrOptions === "object") {
            this.httpConnectionOptions = transportTypeOrOptions;
        }
        else {
            this.httpConnectionOptions = {
                transport: transportTypeOrOptions,
            };
        }
        return this;
    };
    /** Configures the {@link @aspnet/signalr.HubConnection} to use the specified Hub Protocol.
     *
     * @param {IHubProtocol} protocol The {@link @aspnet/signalr.IHubProtocol} implementation to use.
     */
    HubConnectionBuilder.prototype.withHubProtocol = function (protocol) {
        _Utils__WEBPACK_IMPORTED_MODULE_4__["Arg"].isRequired(protocol, "protocol");
        this.protocol = protocol;
        return this;
    };
    /** Creates a {@link @aspnet/signalr.HubConnection} from the configuration options specified in this builder.
     *
     * @returns {HubConnection} The configured {@link @aspnet/signalr.HubConnection}.
     */
    HubConnectionBuilder.prototype.build = function () {
        // If httpConnectionOptions has a logger, use it. Otherwise, override it with the one
        // provided to configureLogger
        var httpConnectionOptions = this.httpConnectionOptions || {};
        // If it's 'null', the user **explicitly** asked for null, don't mess with it.
        if (httpConnectionOptions.logger === undefined) {
            // If our logger is undefined or null, that's OK, the HttpConnection constructor will handle it.
            httpConnectionOptions.logger = this.logger;
        }
        // Now create the connection
        if (!this.url) {
            throw new Error("The 'HubConnectionBuilder.withUrl' method must be called before building the connection.");
        }
        var connection = new _HttpConnection__WEBPACK_IMPORTED_MODULE_0__["HttpConnection"](this.url, httpConnectionOptions);
        return _HubConnection__WEBPACK_IMPORTED_MODULE_1__["HubConnection"].create(connection, this.logger || _Loggers__WEBPACK_IMPORTED_MODULE_3__["NullLogger"].instance, this.protocol || new _JsonHubProtocol__WEBPACK_IMPORTED_MODULE_2__["JsonHubProtocol"]());
    };
    return HubConnectionBuilder;
}());

function isLogger(logger) {
    return logger.log !== undefined;
}
//# sourceMappingURL=HubConnectionBuilder.js.map

/***/ }),

/***/ "./node_modules/@aspnet/signalr/dist/esm/IHubProtocol.js":
/*!***************************************************************!*\
  !*** ./node_modules/@aspnet/signalr/dist/esm/IHubProtocol.js ***!
  \***************************************************************/
/*! exports provided: MessageType */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MessageType", function() { return MessageType; });
// Copyright (c) .NET Foundation. All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
/** Defines the type of a Hub Message. */
var MessageType;
(function (MessageType) {
    /** Indicates the message is an Invocation message and implements the {@link @aspnet/signalr.InvocationMessage} interface. */
    MessageType[MessageType["Invocation"] = 1] = "Invocation";
    /** Indicates the message is a StreamItem message and implements the {@link @aspnet/signalr.StreamItemMessage} interface. */
    MessageType[MessageType["StreamItem"] = 2] = "StreamItem";
    /** Indicates the message is a Completion message and implements the {@link @aspnet/signalr.CompletionMessage} interface. */
    MessageType[MessageType["Completion"] = 3] = "Completion";
    /** Indicates the message is a Stream Invocation message and implements the {@link @aspnet/signalr.StreamInvocationMessage} interface. */
    MessageType[MessageType["StreamInvocation"] = 4] = "StreamInvocation";
    /** Indicates the message is a Cancel Invocation message and implements the {@link @aspnet/signalr.CancelInvocationMessage} interface. */
    MessageType[MessageType["CancelInvocation"] = 5] = "CancelInvocation";
    /** Indicates the message is a Ping message and implements the {@link @aspnet/signalr.PingMessage} interface. */
    MessageType[MessageType["Ping"] = 6] = "Ping";
    /** Indicates the message is a Close message and implements the {@link @aspnet/signalr.CloseMessage} interface. */
    MessageType[MessageType["Close"] = 7] = "Close";
})(MessageType || (MessageType = {}));
//# sourceMappingURL=IHubProtocol.js.map

/***/ }),

/***/ "./node_modules/@aspnet/signalr/dist/esm/ILogger.js":
/*!**********************************************************!*\
  !*** ./node_modules/@aspnet/signalr/dist/esm/ILogger.js ***!
  \**********************************************************/
/*! exports provided: LogLevel */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LogLevel", function() { return LogLevel; });
// Copyright (c) .NET Foundation. All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
// These values are designed to match the ASP.NET Log Levels since that's the pattern we're emulating here.
/** Indicates the severity of a log message.
 *
 * Log Levels are ordered in increasing severity. So `Debug` is more severe than `Trace`, etc.
 */
var LogLevel;
(function (LogLevel) {
    /** Log level for very low severity diagnostic messages. */
    LogLevel[LogLevel["Trace"] = 0] = "Trace";
    /** Log level for low severity diagnostic messages. */
    LogLevel[LogLevel["Debug"] = 1] = "Debug";
    /** Log level for informational diagnostic messages. */
    LogLevel[LogLevel["Information"] = 2] = "Information";
    /** Log level for diagnostic messages that indicate a non-fatal problem. */
    LogLevel[LogLevel["Warning"] = 3] = "Warning";
    /** Log level for diagnostic messages that indicate a failure in the current operation. */
    LogLevel[LogLevel["Error"] = 4] = "Error";
    /** Log level for diagnostic messages that indicate a failure that will terminate the entire application. */
    LogLevel[LogLevel["Critical"] = 5] = "Critical";
    /** The highest possible log level. Used when configuring logging to indicate that no log messages should be emitted. */
    LogLevel[LogLevel["None"] = 6] = "None";
})(LogLevel || (LogLevel = {}));
//# sourceMappingURL=ILogger.js.map

/***/ }),

/***/ "./node_modules/@aspnet/signalr/dist/esm/ITransport.js":
/*!*************************************************************!*\
  !*** ./node_modules/@aspnet/signalr/dist/esm/ITransport.js ***!
  \*************************************************************/
/*! exports provided: HttpTransportType, TransferFormat */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HttpTransportType", function() { return HttpTransportType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TransferFormat", function() { return TransferFormat; });
// Copyright (c) .NET Foundation. All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
// This will be treated as a bit flag in the future, so we keep it using power-of-two values.
/** Specifies a specific HTTP transport type. */
var HttpTransportType;
(function (HttpTransportType) {
    /** Specifies no transport preference. */
    HttpTransportType[HttpTransportType["None"] = 0] = "None";
    /** Specifies the WebSockets transport. */
    HttpTransportType[HttpTransportType["WebSockets"] = 1] = "WebSockets";
    /** Specifies the Server-Sent Events transport. */
    HttpTransportType[HttpTransportType["ServerSentEvents"] = 2] = "ServerSentEvents";
    /** Specifies the Long Polling transport. */
    HttpTransportType[HttpTransportType["LongPolling"] = 4] = "LongPolling";
})(HttpTransportType || (HttpTransportType = {}));
/** Specifies the transfer format for a connection. */
var TransferFormat;
(function (TransferFormat) {
    /** Specifies that only text data will be transmitted over the connection. */
    TransferFormat[TransferFormat["Text"] = 1] = "Text";
    /** Specifies that binary data will be transmitted over the connection. */
    TransferFormat[TransferFormat["Binary"] = 2] = "Binary";
})(TransferFormat || (TransferFormat = {}));
//# sourceMappingURL=ITransport.js.map

/***/ }),

/***/ "./node_modules/@aspnet/signalr/dist/esm/JsonHubProtocol.js":
/*!******************************************************************!*\
  !*** ./node_modules/@aspnet/signalr/dist/esm/JsonHubProtocol.js ***!
  \******************************************************************/
/*! exports provided: JsonHubProtocol */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "JsonHubProtocol", function() { return JsonHubProtocol; });
/* harmony import */ var _IHubProtocol__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./IHubProtocol */ "./node_modules/@aspnet/signalr/dist/esm/IHubProtocol.js");
/* harmony import */ var _ILogger__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ILogger */ "./node_modules/@aspnet/signalr/dist/esm/ILogger.js");
/* harmony import */ var _ITransport__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ITransport */ "./node_modules/@aspnet/signalr/dist/esm/ITransport.js");
/* harmony import */ var _Loggers__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Loggers */ "./node_modules/@aspnet/signalr/dist/esm/Loggers.js");
/* harmony import */ var _TextMessageFormat__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./TextMessageFormat */ "./node_modules/@aspnet/signalr/dist/esm/TextMessageFormat.js");
// Copyright (c) .NET Foundation. All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.





var JSON_HUB_PROTOCOL_NAME = "json";
/** Implements the JSON Hub Protocol. */
var JsonHubProtocol = /** @class */ (function () {
    function JsonHubProtocol() {
        /** @inheritDoc */
        this.name = JSON_HUB_PROTOCOL_NAME;
        /** @inheritDoc */
        this.version = 1;
        /** @inheritDoc */
        this.transferFormat = _ITransport__WEBPACK_IMPORTED_MODULE_2__["TransferFormat"].Text;
    }
    /** Creates an array of {@link @aspnet/signalr.HubMessage} objects from the specified serialized representation.
     *
     * @param {string} input A string containing the serialized representation.
     * @param {ILogger} logger A logger that will be used to log messages that occur during parsing.
     */
    JsonHubProtocol.prototype.parseMessages = function (input, logger) {
        // The interface does allow "ArrayBuffer" to be passed in, but this implementation does not. So let's throw a useful error.
        if (typeof input !== "string") {
            throw new Error("Invalid input for JSON hub protocol. Expected a string.");
        }
        if (!input) {
            return [];
        }
        if (logger === null) {
            logger = _Loggers__WEBPACK_IMPORTED_MODULE_3__["NullLogger"].instance;
        }
        // Parse the messages
        var messages = _TextMessageFormat__WEBPACK_IMPORTED_MODULE_4__["TextMessageFormat"].parse(input);
        var hubMessages = [];
        for (var _i = 0, messages_1 = messages; _i < messages_1.length; _i++) {
            var message = messages_1[_i];
            var parsedMessage = JSON.parse(message);
            if (typeof parsedMessage.type !== "number") {
                throw new Error("Invalid payload.");
            }
            switch (parsedMessage.type) {
                case _IHubProtocol__WEBPACK_IMPORTED_MODULE_0__["MessageType"].Invocation:
                    this.isInvocationMessage(parsedMessage);
                    break;
                case _IHubProtocol__WEBPACK_IMPORTED_MODULE_0__["MessageType"].StreamItem:
                    this.isStreamItemMessage(parsedMessage);
                    break;
                case _IHubProtocol__WEBPACK_IMPORTED_MODULE_0__["MessageType"].Completion:
                    this.isCompletionMessage(parsedMessage);
                    break;
                case _IHubProtocol__WEBPACK_IMPORTED_MODULE_0__["MessageType"].Ping:
                    // Single value, no need to validate
                    break;
                case _IHubProtocol__WEBPACK_IMPORTED_MODULE_0__["MessageType"].Close:
                    // All optional values, no need to validate
                    break;
                default:
                    // Future protocol changes can add message types, old clients can ignore them
                    logger.log(_ILogger__WEBPACK_IMPORTED_MODULE_1__["LogLevel"].Information, "Unknown message type '" + parsedMessage.type + "' ignored.");
                    continue;
            }
            hubMessages.push(parsedMessage);
        }
        return hubMessages;
    };
    /** Writes the specified {@link @aspnet/signalr.HubMessage} to a string and returns it.
     *
     * @param {HubMessage} message The message to write.
     * @returns {string} A string containing the serialized representation of the message.
     */
    JsonHubProtocol.prototype.writeMessage = function (message) {
        return _TextMessageFormat__WEBPACK_IMPORTED_MODULE_4__["TextMessageFormat"].write(JSON.stringify(message));
    };
    JsonHubProtocol.prototype.isInvocationMessage = function (message) {
        this.assertNotEmptyString(message.target, "Invalid payload for Invocation message.");
        if (message.invocationId !== undefined) {
            this.assertNotEmptyString(message.invocationId, "Invalid payload for Invocation message.");
        }
    };
    JsonHubProtocol.prototype.isStreamItemMessage = function (message) {
        this.assertNotEmptyString(message.invocationId, "Invalid payload for StreamItem message.");
        if (message.item === undefined) {
            throw new Error("Invalid payload for StreamItem message.");
        }
    };
    JsonHubProtocol.prototype.isCompletionMessage = function (message) {
        if (message.result && message.error) {
            throw new Error("Invalid payload for Completion message.");
        }
        if (!message.result && message.error) {
            this.assertNotEmptyString(message.error, "Invalid payload for Completion message.");
        }
        this.assertNotEmptyString(message.invocationId, "Invalid payload for Completion message.");
    };
    JsonHubProtocol.prototype.assertNotEmptyString = function (value, errorMessage) {
        if (typeof value !== "string" || value === "") {
            throw new Error(errorMessage);
        }
    };
    return JsonHubProtocol;
}());

//# sourceMappingURL=JsonHubProtocol.js.map

/***/ }),

/***/ "./node_modules/@aspnet/signalr/dist/esm/Loggers.js":
/*!**********************************************************!*\
  !*** ./node_modules/@aspnet/signalr/dist/esm/Loggers.js ***!
  \**********************************************************/
/*! exports provided: NullLogger */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NullLogger", function() { return NullLogger; });
// Copyright (c) .NET Foundation. All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
/** A logger that does nothing when log messages are sent to it. */
var NullLogger = /** @class */ (function () {
    function NullLogger() {
    }
    /** @inheritDoc */
    // tslint:disable-next-line
    NullLogger.prototype.log = function (_logLevel, _message) {
    };
    /** The singleton instance of the {@link @aspnet/signalr.NullLogger}. */
    NullLogger.instance = new NullLogger();
    return NullLogger;
}());

//# sourceMappingURL=Loggers.js.map

/***/ }),

/***/ "./node_modules/@aspnet/signalr/dist/esm/LongPollingTransport.js":
/*!***********************************************************************!*\
  !*** ./node_modules/@aspnet/signalr/dist/esm/LongPollingTransport.js ***!
  \***********************************************************************/
/*! exports provided: LongPollingTransport */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LongPollingTransport", function() { return LongPollingTransport; });
/* harmony import */ var _AbortController__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AbortController */ "./node_modules/@aspnet/signalr/dist/esm/AbortController.js");
/* harmony import */ var _Errors__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Errors */ "./node_modules/@aspnet/signalr/dist/esm/Errors.js");
/* harmony import */ var _ILogger__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ILogger */ "./node_modules/@aspnet/signalr/dist/esm/ILogger.js");
/* harmony import */ var _ITransport__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ITransport */ "./node_modules/@aspnet/signalr/dist/esm/ITransport.js");
/* harmony import */ var _Utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Utils */ "./node_modules/@aspnet/signalr/dist/esm/Utils.js");
// Copyright (c) .NET Foundation. All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};





// Not exported from 'index', this type is internal.
/** @private */
var LongPollingTransport = /** @class */ (function () {
    function LongPollingTransport(httpClient, accessTokenFactory, logger, logMessageContent) {
        this.httpClient = httpClient;
        this.accessTokenFactory = accessTokenFactory;
        this.logger = logger;
        this.pollAbort = new _AbortController__WEBPACK_IMPORTED_MODULE_0__["AbortController"]();
        this.logMessageContent = logMessageContent;
        this.running = false;
        this.onreceive = null;
        this.onclose = null;
    }
    Object.defineProperty(LongPollingTransport.prototype, "pollAborted", {
        // This is an internal type, not exported from 'index' so this is really just internal.
        get: function () {
            return this.pollAbort.aborted;
        },
        enumerable: true,
        configurable: true
    });
    LongPollingTransport.prototype.connect = function (url, transferFormat) {
        return __awaiter(this, void 0, void 0, function () {
            var pollOptions, token, pollUrl, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _Utils__WEBPACK_IMPORTED_MODULE_4__["Arg"].isRequired(url, "url");
                        _Utils__WEBPACK_IMPORTED_MODULE_4__["Arg"].isRequired(transferFormat, "transferFormat");
                        _Utils__WEBPACK_IMPORTED_MODULE_4__["Arg"].isIn(transferFormat, _ITransport__WEBPACK_IMPORTED_MODULE_3__["TransferFormat"], "transferFormat");
                        this.url = url;
                        this.logger.log(_ILogger__WEBPACK_IMPORTED_MODULE_2__["LogLevel"].Trace, "(LongPolling transport) Connecting.");
                        // Allow binary format on Node and Browsers that support binary content (indicated by the presence of responseType property)
                        if (transferFormat === _ITransport__WEBPACK_IMPORTED_MODULE_3__["TransferFormat"].Binary &&
                            (typeof XMLHttpRequest !== "undefined" && typeof new XMLHttpRequest().responseType !== "string")) {
                            throw new Error("Binary protocols over XmlHttpRequest not implementing advanced features are not supported.");
                        }
                        pollOptions = {
                            abortSignal: this.pollAbort.signal,
                            headers: {},
                            timeout: 100000,
                        };
                        if (transferFormat === _ITransport__WEBPACK_IMPORTED_MODULE_3__["TransferFormat"].Binary) {
                            pollOptions.responseType = "arraybuffer";
                        }
                        return [4 /*yield*/, this.getAccessToken()];
                    case 1:
                        token = _a.sent();
                        this.updateHeaderToken(pollOptions, token);
                        pollUrl = url + "&_=" + Date.now();
                        this.logger.log(_ILogger__WEBPACK_IMPORTED_MODULE_2__["LogLevel"].Trace, "(LongPolling transport) polling: " + pollUrl + ".");
                        return [4 /*yield*/, this.httpClient.get(pollUrl, pollOptions)];
                    case 2:
                        response = _a.sent();
                        if (response.statusCode !== 200) {
                            this.logger.log(_ILogger__WEBPACK_IMPORTED_MODULE_2__["LogLevel"].Error, "(LongPolling transport) Unexpected response code: " + response.statusCode + ".");
                            // Mark running as false so that the poll immediately ends and runs the close logic
                            this.closeError = new _Errors__WEBPACK_IMPORTED_MODULE_1__["HttpError"](response.statusText || "", response.statusCode);
                            this.running = false;
                        }
                        else {
                            this.running = true;
                        }
                        this.receiving = this.poll(this.url, pollOptions);
                        return [2 /*return*/];
                }
            });
        });
    };
    LongPollingTransport.prototype.getAccessToken = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.accessTokenFactory) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.accessTokenFactory()];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2: return [2 /*return*/, null];
                }
            });
        });
    };
    LongPollingTransport.prototype.updateHeaderToken = function (request, token) {
        if (!request.headers) {
            request.headers = {};
        }
        if (token) {
            // tslint:disable-next-line:no-string-literal
            request.headers["Authorization"] = "Bearer " + token;
            return;
        }
        // tslint:disable-next-line:no-string-literal
        if (request.headers["Authorization"]) {
            // tslint:disable-next-line:no-string-literal
            delete request.headers["Authorization"];
        }
    };
    LongPollingTransport.prototype.poll = function (url, pollOptions) {
        return __awaiter(this, void 0, void 0, function () {
            var token, pollUrl, response, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, , 8, 9]);
                        _a.label = 1;
                    case 1:
                        if (!this.running) return [3 /*break*/, 7];
                        return [4 /*yield*/, this.getAccessToken()];
                    case 2:
                        token = _a.sent();
                        this.updateHeaderToken(pollOptions, token);
                        _a.label = 3;
                    case 3:
                        _a.trys.push([3, 5, , 6]);
                        pollUrl = url + "&_=" + Date.now();
                        this.logger.log(_ILogger__WEBPACK_IMPORTED_MODULE_2__["LogLevel"].Trace, "(LongPolling transport) polling: " + pollUrl + ".");
                        return [4 /*yield*/, this.httpClient.get(pollUrl, pollOptions)];
                    case 4:
                        response = _a.sent();
                        if (response.statusCode === 204) {
                            this.logger.log(_ILogger__WEBPACK_IMPORTED_MODULE_2__["LogLevel"].Information, "(LongPolling transport) Poll terminated by server.");
                            this.running = false;
                        }
                        else if (response.statusCode !== 200) {
                            this.logger.log(_ILogger__WEBPACK_IMPORTED_MODULE_2__["LogLevel"].Error, "(LongPolling transport) Unexpected response code: " + response.statusCode + ".");
                            // Unexpected status code
                            this.closeError = new _Errors__WEBPACK_IMPORTED_MODULE_1__["HttpError"](response.statusText || "", response.statusCode);
                            this.running = false;
                        }
                        else {
                            // Process the response
                            if (response.content) {
                                this.logger.log(_ILogger__WEBPACK_IMPORTED_MODULE_2__["LogLevel"].Trace, "(LongPolling transport) data received. " + Object(_Utils__WEBPACK_IMPORTED_MODULE_4__["getDataDetail"])(response.content, this.logMessageContent) + ".");
                                if (this.onreceive) {
                                    this.onreceive(response.content);
                                }
                            }
                            else {
                                // This is another way timeout manifest.
                                this.logger.log(_ILogger__WEBPACK_IMPORTED_MODULE_2__["LogLevel"].Trace, "(LongPolling transport) Poll timed out, reissuing.");
                            }
                        }
                        return [3 /*break*/, 6];
                    case 5:
                        e_1 = _a.sent();
                        if (!this.running) {
                            // Log but disregard errors that occur after stopping
                            this.logger.log(_ILogger__WEBPACK_IMPORTED_MODULE_2__["LogLevel"].Trace, "(LongPolling transport) Poll errored after shutdown: " + e_1.message);
                        }
                        else {
                            if (e_1 instanceof _Errors__WEBPACK_IMPORTED_MODULE_1__["TimeoutError"]) {
                                // Ignore timeouts and reissue the poll.
                                this.logger.log(_ILogger__WEBPACK_IMPORTED_MODULE_2__["LogLevel"].Trace, "(LongPolling transport) Poll timed out, reissuing.");
                            }
                            else {
                                // Close the connection with the error as the result.
                                this.closeError = e_1;
                                this.running = false;
                            }
                        }
                        return [3 /*break*/, 6];
                    case 6: return [3 /*break*/, 1];
                    case 7: return [3 /*break*/, 9];
                    case 8:
                        this.logger.log(_ILogger__WEBPACK_IMPORTED_MODULE_2__["LogLevel"].Trace, "(LongPolling transport) Polling complete.");
                        // We will reach here with pollAborted==false when the server returned a response causing the transport to stop.
                        // If pollAborted==true then client initiated the stop and the stop method will raise the close event after DELETE is sent.
                        if (!this.pollAborted) {
                            this.raiseOnClose();
                        }
                        return [7 /*endfinally*/];
                    case 9: return [2 /*return*/];
                }
            });
        });
    };
    LongPollingTransport.prototype.send = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (!this.running) {
                    return [2 /*return*/, Promise.reject(new Error("Cannot send until the transport is connected"))];
                }
                return [2 /*return*/, Object(_Utils__WEBPACK_IMPORTED_MODULE_4__["sendMessage"])(this.logger, "LongPolling", this.httpClient, this.url, this.accessTokenFactory, data, this.logMessageContent)];
            });
        });
    };
    LongPollingTransport.prototype.stop = function () {
        return __awaiter(this, void 0, void 0, function () {
            var deleteOptions, token;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.logger.log(_ILogger__WEBPACK_IMPORTED_MODULE_2__["LogLevel"].Trace, "(LongPolling transport) Stopping polling.");
                        // Tell receiving loop to stop, abort any current request, and then wait for it to finish
                        this.running = false;
                        this.pollAbort.abort();
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, , 5, 6]);
                        return [4 /*yield*/, this.receiving];
                    case 2:
                        _a.sent();
                        // Send DELETE to clean up long polling on the server
                        this.logger.log(_ILogger__WEBPACK_IMPORTED_MODULE_2__["LogLevel"].Trace, "(LongPolling transport) sending DELETE request to " + this.url + ".");
                        deleteOptions = {
                            headers: {},
                        };
                        return [4 /*yield*/, this.getAccessToken()];
                    case 3:
                        token = _a.sent();
                        this.updateHeaderToken(deleteOptions, token);
                        return [4 /*yield*/, this.httpClient.delete(this.url, deleteOptions)];
                    case 4:
                        _a.sent();
                        this.logger.log(_ILogger__WEBPACK_IMPORTED_MODULE_2__["LogLevel"].Trace, "(LongPolling transport) DELETE request sent.");
                        return [3 /*break*/, 6];
                    case 5:
                        this.logger.log(_ILogger__WEBPACK_IMPORTED_MODULE_2__["LogLevel"].Trace, "(LongPolling transport) Stop finished.");
                        // Raise close event here instead of in polling
                        // It needs to happen after the DELETE request is sent
                        this.raiseOnClose();
                        return [7 /*endfinally*/];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    LongPollingTransport.prototype.raiseOnClose = function () {
        if (this.onclose) {
            var logMessage = "(LongPolling transport) Firing onclose event.";
            if (this.closeError) {
                logMessage += " Error: " + this.closeError;
            }
            this.logger.log(_ILogger__WEBPACK_IMPORTED_MODULE_2__["LogLevel"].Trace, logMessage);
            this.onclose(this.closeError);
        }
    };
    return LongPollingTransport;
}());

//# sourceMappingURL=LongPollingTransport.js.map

/***/ }),

/***/ "./node_modules/@aspnet/signalr/dist/esm/ServerSentEventsTransport.js":
/*!****************************************************************************!*\
  !*** ./node_modules/@aspnet/signalr/dist/esm/ServerSentEventsTransport.js ***!
  \****************************************************************************/
/*! exports provided: ServerSentEventsTransport */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ServerSentEventsTransport", function() { return ServerSentEventsTransport; });
/* harmony import */ var _ILogger__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ILogger */ "./node_modules/@aspnet/signalr/dist/esm/ILogger.js");
/* harmony import */ var _ITransport__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ITransport */ "./node_modules/@aspnet/signalr/dist/esm/ITransport.js");
/* harmony import */ var _Utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Utils */ "./node_modules/@aspnet/signalr/dist/esm/Utils.js");
// Copyright (c) .NET Foundation. All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};



/** @private */
var ServerSentEventsTransport = /** @class */ (function () {
    function ServerSentEventsTransport(httpClient, accessTokenFactory, logger, logMessageContent, eventSourceConstructor) {
        this.httpClient = httpClient;
        this.accessTokenFactory = accessTokenFactory;
        this.logger = logger;
        this.logMessageContent = logMessageContent;
        this.eventSourceConstructor = eventSourceConstructor;
        this.onreceive = null;
        this.onclose = null;
    }
    ServerSentEventsTransport.prototype.connect = function (url, transferFormat) {
        return __awaiter(this, void 0, void 0, function () {
            var token;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _Utils__WEBPACK_IMPORTED_MODULE_2__["Arg"].isRequired(url, "url");
                        _Utils__WEBPACK_IMPORTED_MODULE_2__["Arg"].isRequired(transferFormat, "transferFormat");
                        _Utils__WEBPACK_IMPORTED_MODULE_2__["Arg"].isIn(transferFormat, _ITransport__WEBPACK_IMPORTED_MODULE_1__["TransferFormat"], "transferFormat");
                        this.logger.log(_ILogger__WEBPACK_IMPORTED_MODULE_0__["LogLevel"].Trace, "(SSE transport) Connecting.");
                        // set url before accessTokenFactory because this.url is only for send and we set the auth header instead of the query string for send
                        this.url = url;
                        if (!this.accessTokenFactory) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.accessTokenFactory()];
                    case 1:
                        token = _a.sent();
                        if (token) {
                            url += (url.indexOf("?") < 0 ? "?" : "&") + ("access_token=" + encodeURIComponent(token));
                        }
                        _a.label = 2;
                    case 2: return [2 /*return*/, new Promise(function (resolve, reject) {
                            var opened = false;
                            if (transferFormat !== _ITransport__WEBPACK_IMPORTED_MODULE_1__["TransferFormat"].Text) {
                                reject(new Error("The Server-Sent Events transport only supports the 'Text' transfer format"));
                                return;
                            }
                            var eventSource;
                            if (typeof window !== "undefined") {
                                eventSource = new _this.eventSourceConstructor(url, { withCredentials: true });
                            }
                            else {
                                // Non-browser passes cookies via the dictionary
                                var cookies = _this.httpClient.getCookieString(url);
                                eventSource = new _this.eventSourceConstructor(url, { withCredentials: true, headers: { Cookie: cookies } });
                            }
                            try {
                                eventSource.onmessage = function (e) {
                                    if (_this.onreceive) {
                                        try {
                                            _this.logger.log(_ILogger__WEBPACK_IMPORTED_MODULE_0__["LogLevel"].Trace, "(SSE transport) data received. " + Object(_Utils__WEBPACK_IMPORTED_MODULE_2__["getDataDetail"])(e.data, _this.logMessageContent) + ".");
                                            _this.onreceive(e.data);
                                        }
                                        catch (error) {
                                            _this.close(error);
                                            return;
                                        }
                                    }
                                };
                                eventSource.onerror = function (e) {
                                    var error = new Error(e.data || "Error occurred");
                                    if (opened) {
                                        _this.close(error);
                                    }
                                    else {
                                        reject(error);
                                    }
                                };
                                eventSource.onopen = function () {
                                    _this.logger.log(_ILogger__WEBPACK_IMPORTED_MODULE_0__["LogLevel"].Information, "SSE connected to " + _this.url);
                                    _this.eventSource = eventSource;
                                    opened = true;
                                    resolve();
                                };
                            }
                            catch (e) {
                                reject(e);
                                return;
                            }
                        })];
                }
            });
        });
    };
    ServerSentEventsTransport.prototype.send = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (!this.eventSource) {
                    return [2 /*return*/, Promise.reject(new Error("Cannot send until the transport is connected"))];
                }
                return [2 /*return*/, Object(_Utils__WEBPACK_IMPORTED_MODULE_2__["sendMessage"])(this.logger, "SSE", this.httpClient, this.url, this.accessTokenFactory, data, this.logMessageContent)];
            });
        });
    };
    ServerSentEventsTransport.prototype.stop = function () {
        this.close();
        return Promise.resolve();
    };
    ServerSentEventsTransport.prototype.close = function (e) {
        if (this.eventSource) {
            this.eventSource.close();
            this.eventSource = undefined;
            if (this.onclose) {
                this.onclose(e);
            }
        }
    };
    return ServerSentEventsTransport;
}());

//# sourceMappingURL=ServerSentEventsTransport.js.map

/***/ }),

/***/ "./node_modules/@aspnet/signalr/dist/esm/TextMessageFormat.js":
/*!********************************************************************!*\
  !*** ./node_modules/@aspnet/signalr/dist/esm/TextMessageFormat.js ***!
  \********************************************************************/
/*! exports provided: TextMessageFormat */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TextMessageFormat", function() { return TextMessageFormat; });
// Copyright (c) .NET Foundation. All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
// Not exported from index
/** @private */
var TextMessageFormat = /** @class */ (function () {
    function TextMessageFormat() {
    }
    TextMessageFormat.write = function (output) {
        return "" + output + TextMessageFormat.RecordSeparator;
    };
    TextMessageFormat.parse = function (input) {
        if (input[input.length - 1] !== TextMessageFormat.RecordSeparator) {
            throw new Error("Message is incomplete.");
        }
        var messages = input.split(TextMessageFormat.RecordSeparator);
        messages.pop();
        return messages;
    };
    TextMessageFormat.RecordSeparatorCode = 0x1e;
    TextMessageFormat.RecordSeparator = String.fromCharCode(TextMessageFormat.RecordSeparatorCode);
    return TextMessageFormat;
}());

//# sourceMappingURL=TextMessageFormat.js.map

/***/ }),

/***/ "./node_modules/@aspnet/signalr/dist/esm/Utils.js":
/*!********************************************************!*\
  !*** ./node_modules/@aspnet/signalr/dist/esm/Utils.js ***!
  \********************************************************/
/*! exports provided: Arg, getDataDetail, formatArrayBuffer, isArrayBuffer, sendMessage, createLogger, Subject, SubjectSubscription, ConsoleLogger */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Arg", function() { return Arg; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getDataDetail", function() { return getDataDetail; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "formatArrayBuffer", function() { return formatArrayBuffer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isArrayBuffer", function() { return isArrayBuffer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sendMessage", function() { return sendMessage; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createLogger", function() { return createLogger; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Subject", function() { return Subject; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SubjectSubscription", function() { return SubjectSubscription; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ConsoleLogger", function() { return ConsoleLogger; });
/* harmony import */ var _ILogger__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ILogger */ "./node_modules/@aspnet/signalr/dist/esm/ILogger.js");
/* harmony import */ var _Loggers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Loggers */ "./node_modules/@aspnet/signalr/dist/esm/Loggers.js");
// Copyright (c) .NET Foundation. All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};


/** @private */
var Arg = /** @class */ (function () {
    function Arg() {
    }
    Arg.isRequired = function (val, name) {
        if (val === null || val === undefined) {
            throw new Error("The '" + name + "' argument is required.");
        }
    };
    Arg.isIn = function (val, values, name) {
        // TypeScript enums have keys for **both** the name and the value of each enum member on the type itself.
        if (!(val in values)) {
            throw new Error("Unknown " + name + " value: " + val + ".");
        }
    };
    return Arg;
}());

/** @private */
function getDataDetail(data, includeContent) {
    var detail = "";
    if (isArrayBuffer(data)) {
        detail = "Binary data of length " + data.byteLength;
        if (includeContent) {
            detail += ". Content: '" + formatArrayBuffer(data) + "'";
        }
    }
    else if (typeof data === "string") {
        detail = "String data of length " + data.length;
        if (includeContent) {
            detail += ". Content: '" + data + "'";
        }
    }
    return detail;
}
/** @private */
function formatArrayBuffer(data) {
    var view = new Uint8Array(data);
    // Uint8Array.map only supports returning another Uint8Array?
    var str = "";
    view.forEach(function (num) {
        var pad = num < 16 ? "0" : "";
        str += "0x" + pad + num.toString(16) + " ";
    });
    // Trim of trailing space.
    return str.substr(0, str.length - 1);
}
// Also in signalr-protocol-msgpack/Utils.ts
/** @private */
function isArrayBuffer(val) {
    return val && typeof ArrayBuffer !== "undefined" &&
        (val instanceof ArrayBuffer ||
            // Sometimes we get an ArrayBuffer that doesn't satisfy instanceof
            (val.constructor && val.constructor.name === "ArrayBuffer"));
}
/** @private */
function sendMessage(logger, transportName, httpClient, url, accessTokenFactory, content, logMessageContent) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, headers, token, responseType, response;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    if (!accessTokenFactory) return [3 /*break*/, 2];
                    return [4 /*yield*/, accessTokenFactory()];
                case 1:
                    token = _b.sent();
                    if (token) {
                        headers = (_a = {},
                            _a["Authorization"] = "Bearer " + token,
                            _a);
                    }
                    _b.label = 2;
                case 2:
                    logger.log(_ILogger__WEBPACK_IMPORTED_MODULE_0__["LogLevel"].Trace, "(" + transportName + " transport) sending data. " + getDataDetail(content, logMessageContent) + ".");
                    responseType = isArrayBuffer(content) ? "arraybuffer" : "text";
                    return [4 /*yield*/, httpClient.post(url, {
                            content: content,
                            headers: headers,
                            responseType: responseType,
                        })];
                case 3:
                    response = _b.sent();
                    logger.log(_ILogger__WEBPACK_IMPORTED_MODULE_0__["LogLevel"].Trace, "(" + transportName + " transport) request complete. Response status: " + response.statusCode + ".");
                    return [2 /*return*/];
            }
        });
    });
}
/** @private */
function createLogger(logger) {
    if (logger === undefined) {
        return new ConsoleLogger(_ILogger__WEBPACK_IMPORTED_MODULE_0__["LogLevel"].Information);
    }
    if (logger === null) {
        return _Loggers__WEBPACK_IMPORTED_MODULE_1__["NullLogger"].instance;
    }
    if (logger.log) {
        return logger;
    }
    return new ConsoleLogger(logger);
}
/** @private */
var Subject = /** @class */ (function () {
    function Subject(cancelCallback) {
        this.observers = [];
        this.cancelCallback = cancelCallback;
    }
    Subject.prototype.next = function (item) {
        for (var _i = 0, _a = this.observers; _i < _a.length; _i++) {
            var observer = _a[_i];
            observer.next(item);
        }
    };
    Subject.prototype.error = function (err) {
        for (var _i = 0, _a = this.observers; _i < _a.length; _i++) {
            var observer = _a[_i];
            if (observer.error) {
                observer.error(err);
            }
        }
    };
    Subject.prototype.complete = function () {
        for (var _i = 0, _a = this.observers; _i < _a.length; _i++) {
            var observer = _a[_i];
            if (observer.complete) {
                observer.complete();
            }
        }
    };
    Subject.prototype.subscribe = function (observer) {
        this.observers.push(observer);
        return new SubjectSubscription(this, observer);
    };
    return Subject;
}());

/** @private */
var SubjectSubscription = /** @class */ (function () {
    function SubjectSubscription(subject, observer) {
        this.subject = subject;
        this.observer = observer;
    }
    SubjectSubscription.prototype.dispose = function () {
        var index = this.subject.observers.indexOf(this.observer);
        if (index > -1) {
            this.subject.observers.splice(index, 1);
        }
        if (this.subject.observers.length === 0) {
            this.subject.cancelCallback().catch(function (_) { });
        }
    };
    return SubjectSubscription;
}());

/** @private */
var ConsoleLogger = /** @class */ (function () {
    function ConsoleLogger(minimumLogLevel) {
        this.minimumLogLevel = minimumLogLevel;
    }
    ConsoleLogger.prototype.log = function (logLevel, message) {
        if (logLevel >= this.minimumLogLevel) {
            switch (logLevel) {
                case _ILogger__WEBPACK_IMPORTED_MODULE_0__["LogLevel"].Critical:
                case _ILogger__WEBPACK_IMPORTED_MODULE_0__["LogLevel"].Error:
                    console.error("[" + new Date().toISOString() + "] " + _ILogger__WEBPACK_IMPORTED_MODULE_0__["LogLevel"][logLevel] + ": " + message);
                    break;
                case _ILogger__WEBPACK_IMPORTED_MODULE_0__["LogLevel"].Warning:
                    console.warn("[" + new Date().toISOString() + "] " + _ILogger__WEBPACK_IMPORTED_MODULE_0__["LogLevel"][logLevel] + ": " + message);
                    break;
                case _ILogger__WEBPACK_IMPORTED_MODULE_0__["LogLevel"].Information:
                    console.info("[" + new Date().toISOString() + "] " + _ILogger__WEBPACK_IMPORTED_MODULE_0__["LogLevel"][logLevel] + ": " + message);
                    break;
                default:
                    // console.debug only goes to attached debuggers in Node, so we use console.log for Trace and Debug
                    console.log("[" + new Date().toISOString() + "] " + _ILogger__WEBPACK_IMPORTED_MODULE_0__["LogLevel"][logLevel] + ": " + message);
                    break;
            }
        }
    };
    return ConsoleLogger;
}());

//# sourceMappingURL=Utils.js.map

/***/ }),

/***/ "./node_modules/@aspnet/signalr/dist/esm/WebSocketTransport.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@aspnet/signalr/dist/esm/WebSocketTransport.js ***!
  \*********************************************************************/
/*! exports provided: WebSocketTransport */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WebSocketTransport", function() { return WebSocketTransport; });
/* harmony import */ var _ILogger__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ILogger */ "./node_modules/@aspnet/signalr/dist/esm/ILogger.js");
/* harmony import */ var _ITransport__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ITransport */ "./node_modules/@aspnet/signalr/dist/esm/ITransport.js");
/* harmony import */ var _Utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Utils */ "./node_modules/@aspnet/signalr/dist/esm/Utils.js");
// Copyright (c) .NET Foundation. All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};



/** @private */
var WebSocketTransport = /** @class */ (function () {
    function WebSocketTransport(httpClient, accessTokenFactory, logger, logMessageContent, webSocketConstructor) {
        this.logger = logger;
        this.accessTokenFactory = accessTokenFactory;
        this.logMessageContent = logMessageContent;
        this.webSocketConstructor = webSocketConstructor;
        this.httpClient = httpClient;
        this.onreceive = null;
        this.onclose = null;
    }
    WebSocketTransport.prototype.connect = function (url, transferFormat) {
        return __awaiter(this, void 0, void 0, function () {
            var token;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _Utils__WEBPACK_IMPORTED_MODULE_2__["Arg"].isRequired(url, "url");
                        _Utils__WEBPACK_IMPORTED_MODULE_2__["Arg"].isRequired(transferFormat, "transferFormat");
                        _Utils__WEBPACK_IMPORTED_MODULE_2__["Arg"].isIn(transferFormat, _ITransport__WEBPACK_IMPORTED_MODULE_1__["TransferFormat"], "transferFormat");
                        this.logger.log(_ILogger__WEBPACK_IMPORTED_MODULE_0__["LogLevel"].Trace, "(WebSockets transport) Connecting.");
                        if (!this.accessTokenFactory) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.accessTokenFactory()];
                    case 1:
                        token = _a.sent();
                        if (token) {
                            url += (url.indexOf("?") < 0 ? "?" : "&") + ("access_token=" + encodeURIComponent(token));
                        }
                        _a.label = 2;
                    case 2: return [2 /*return*/, new Promise(function (resolve, reject) {
                            url = url.replace(/^http/, "ws");
                            var webSocket;
                            var cookies = _this.httpClient.getCookieString(url);
                            if (typeof window === "undefined" && cookies) {
                                // Only pass cookies when in non-browser environments
                                webSocket = new _this.webSocketConstructor(url, undefined, {
                                    headers: {
                                        Cookie: "" + cookies,
                                    },
                                });
                            }
                            if (!webSocket) {
                                // Chrome is not happy with passing 'undefined' as protocol
                                webSocket = new _this.webSocketConstructor(url);
                            }
                            if (transferFormat === _ITransport__WEBPACK_IMPORTED_MODULE_1__["TransferFormat"].Binary) {
                                webSocket.binaryType = "arraybuffer";
                            }
                            // tslint:disable-next-line:variable-name
                            webSocket.onopen = function (_event) {
                                _this.logger.log(_ILogger__WEBPACK_IMPORTED_MODULE_0__["LogLevel"].Information, "WebSocket connected to " + url + ".");
                                _this.webSocket = webSocket;
                                resolve();
                            };
                            webSocket.onerror = function (event) {
                                var error = null;
                                // ErrorEvent is a browser only type we need to check if the type exists before using it
                                if (typeof ErrorEvent !== "undefined" && event instanceof ErrorEvent) {
                                    error = event.error;
                                }
                                reject(error);
                            };
                            webSocket.onmessage = function (message) {
                                _this.logger.log(_ILogger__WEBPACK_IMPORTED_MODULE_0__["LogLevel"].Trace, "(WebSockets transport) data received. " + Object(_Utils__WEBPACK_IMPORTED_MODULE_2__["getDataDetail"])(message.data, _this.logMessageContent) + ".");
                                if (_this.onreceive) {
                                    _this.onreceive(message.data);
                                }
                            };
                            webSocket.onclose = function (event) { return _this.close(event); };
                        })];
                }
            });
        });
    };
    WebSocketTransport.prototype.send = function (data) {
        if (this.webSocket && this.webSocket.readyState === this.webSocketConstructor.OPEN) {
            this.logger.log(_ILogger__WEBPACK_IMPORTED_MODULE_0__["LogLevel"].Trace, "(WebSockets transport) sending data. " + Object(_Utils__WEBPACK_IMPORTED_MODULE_2__["getDataDetail"])(data, this.logMessageContent) + ".");
            this.webSocket.send(data);
            return Promise.resolve();
        }
        return Promise.reject("WebSocket is not in the OPEN state");
    };
    WebSocketTransport.prototype.stop = function () {
        if (this.webSocket) {
            // Clear websocket handlers because we are considering the socket closed now
            this.webSocket.onclose = function () { };
            this.webSocket.onmessage = function () { };
            this.webSocket.onerror = function () { };
            this.webSocket.close();
            this.webSocket = undefined;
            // Manually invoke onclose callback inline so we know the HttpConnection was closed properly before returning
            // This also solves an issue where websocket.onclose could take 18+ seconds to trigger during network disconnects
            this.close(undefined);
        }
        return Promise.resolve();
    };
    WebSocketTransport.prototype.close = function (event) {
        // webSocket will be null if the transport did not start successfully
        this.logger.log(_ILogger__WEBPACK_IMPORTED_MODULE_0__["LogLevel"].Trace, "(WebSockets transport) socket closed.");
        if (this.onclose) {
            if (event && (event.wasClean === false || event.code !== 1000)) {
                this.onclose(new Error("WebSocket closed with status code: " + event.code + " (" + event.reason + ")."));
            }
            else {
                this.onclose();
            }
        }
    };
    return WebSocketTransport;
}());

//# sourceMappingURL=WebSocketTransport.js.map

/***/ }),

/***/ "./node_modules/@aspnet/signalr/dist/esm/XhrHttpClient.js":
/*!****************************************************************!*\
  !*** ./node_modules/@aspnet/signalr/dist/esm/XhrHttpClient.js ***!
  \****************************************************************/
/*! exports provided: XhrHttpClient */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "XhrHttpClient", function() { return XhrHttpClient; });
/* harmony import */ var _Errors__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Errors */ "./node_modules/@aspnet/signalr/dist/esm/Errors.js");
/* harmony import */ var _HttpClient__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./HttpClient */ "./node_modules/@aspnet/signalr/dist/esm/HttpClient.js");
/* harmony import */ var _ILogger__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ILogger */ "./node_modules/@aspnet/signalr/dist/esm/ILogger.js");
// Copyright (c) .NET Foundation. All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();



var XhrHttpClient = /** @class */ (function (_super) {
    __extends(XhrHttpClient, _super);
    function XhrHttpClient(logger) {
        var _this = _super.call(this) || this;
        _this.logger = logger;
        return _this;
    }
    /** @inheritDoc */
    XhrHttpClient.prototype.send = function (request) {
        var _this = this;
        // Check that abort was not signaled before calling send
        if (request.abortSignal && request.abortSignal.aborted) {
            return Promise.reject(new _Errors__WEBPACK_IMPORTED_MODULE_0__["AbortError"]());
        }
        if (!request.method) {
            return Promise.reject(new Error("No method defined."));
        }
        if (!request.url) {
            return Promise.reject(new Error("No url defined."));
        }
        return new Promise(function (resolve, reject) {
            var xhr = new XMLHttpRequest();
            xhr.open(request.method, request.url, true);
            xhr.withCredentials = true;
            xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
            // Explicitly setting the Content-Type header for React Native on Android platform.
            xhr.setRequestHeader("Content-Type", "text/plain;charset=UTF-8");
            var headers = request.headers;
            if (headers) {
                Object.keys(headers)
                    .forEach(function (header) {
                    xhr.setRequestHeader(header, headers[header]);
                });
            }
            if (request.responseType) {
                xhr.responseType = request.responseType;
            }
            if (request.abortSignal) {
                request.abortSignal.onabort = function () {
                    xhr.abort();
                    reject(new _Errors__WEBPACK_IMPORTED_MODULE_0__["AbortError"]());
                };
            }
            if (request.timeout) {
                xhr.timeout = request.timeout;
            }
            xhr.onload = function () {
                if (request.abortSignal) {
                    request.abortSignal.onabort = null;
                }
                if (xhr.status >= 200 && xhr.status < 300) {
                    resolve(new _HttpClient__WEBPACK_IMPORTED_MODULE_1__["HttpResponse"](xhr.status, xhr.statusText, xhr.response || xhr.responseText));
                }
                else {
                    reject(new _Errors__WEBPACK_IMPORTED_MODULE_0__["HttpError"](xhr.statusText, xhr.status));
                }
            };
            xhr.onerror = function () {
                _this.logger.log(_ILogger__WEBPACK_IMPORTED_MODULE_2__["LogLevel"].Warning, "Error from HTTP request. " + xhr.status + ": " + xhr.statusText + ".");
                reject(new _Errors__WEBPACK_IMPORTED_MODULE_0__["HttpError"](xhr.statusText, xhr.status));
            };
            xhr.ontimeout = function () {
                _this.logger.log(_ILogger__WEBPACK_IMPORTED_MODULE_2__["LogLevel"].Warning, "Timeout from HTTP request.");
                reject(new _Errors__WEBPACK_IMPORTED_MODULE_0__["TimeoutError"]());
            };
            xhr.send(request.content || "");
        });
    };
    return XhrHttpClient;
}(_HttpClient__WEBPACK_IMPORTED_MODULE_1__["HttpClient"]));

//# sourceMappingURL=XhrHttpClient.js.map

/***/ }),

/***/ "./node_modules/@aspnet/signalr/dist/esm/index.js":
/*!********************************************************!*\
  !*** ./node_modules/@aspnet/signalr/dist/esm/index.js ***!
  \********************************************************/
/*! exports provided: VERSION, AbortError, HttpError, TimeoutError, HttpClient, HttpResponse, DefaultHttpClient, HubConnection, HubConnectionState, HubConnectionBuilder, MessageType, LogLevel, HttpTransportType, TransferFormat, NullLogger, JsonHubProtocol */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VERSION", function() { return VERSION; });
/* harmony import */ var _Errors__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Errors */ "./node_modules/@aspnet/signalr/dist/esm/Errors.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AbortError", function() { return _Errors__WEBPACK_IMPORTED_MODULE_0__["AbortError"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "HttpError", function() { return _Errors__WEBPACK_IMPORTED_MODULE_0__["HttpError"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TimeoutError", function() { return _Errors__WEBPACK_IMPORTED_MODULE_0__["TimeoutError"]; });

/* harmony import */ var _HttpClient__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./HttpClient */ "./node_modules/@aspnet/signalr/dist/esm/HttpClient.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "HttpClient", function() { return _HttpClient__WEBPACK_IMPORTED_MODULE_1__["HttpClient"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "HttpResponse", function() { return _HttpClient__WEBPACK_IMPORTED_MODULE_1__["HttpResponse"]; });

/* harmony import */ var _DefaultHttpClient__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./DefaultHttpClient */ "./node_modules/@aspnet/signalr/dist/esm/DefaultHttpClient.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DefaultHttpClient", function() { return _DefaultHttpClient__WEBPACK_IMPORTED_MODULE_2__["DefaultHttpClient"]; });

/* harmony import */ var _HubConnection__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./HubConnection */ "./node_modules/@aspnet/signalr/dist/esm/HubConnection.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "HubConnection", function() { return _HubConnection__WEBPACK_IMPORTED_MODULE_3__["HubConnection"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "HubConnectionState", function() { return _HubConnection__WEBPACK_IMPORTED_MODULE_3__["HubConnectionState"]; });

/* harmony import */ var _HubConnectionBuilder__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./HubConnectionBuilder */ "./node_modules/@aspnet/signalr/dist/esm/HubConnectionBuilder.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "HubConnectionBuilder", function() { return _HubConnectionBuilder__WEBPACK_IMPORTED_MODULE_4__["HubConnectionBuilder"]; });

/* harmony import */ var _IHubProtocol__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./IHubProtocol */ "./node_modules/@aspnet/signalr/dist/esm/IHubProtocol.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "MessageType", function() { return _IHubProtocol__WEBPACK_IMPORTED_MODULE_5__["MessageType"]; });

/* harmony import */ var _ILogger__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./ILogger */ "./node_modules/@aspnet/signalr/dist/esm/ILogger.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "LogLevel", function() { return _ILogger__WEBPACK_IMPORTED_MODULE_6__["LogLevel"]; });

/* harmony import */ var _ITransport__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./ITransport */ "./node_modules/@aspnet/signalr/dist/esm/ITransport.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "HttpTransportType", function() { return _ITransport__WEBPACK_IMPORTED_MODULE_7__["HttpTransportType"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TransferFormat", function() { return _ITransport__WEBPACK_IMPORTED_MODULE_7__["TransferFormat"]; });

/* harmony import */ var _Loggers__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./Loggers */ "./node_modules/@aspnet/signalr/dist/esm/Loggers.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "NullLogger", function() { return _Loggers__WEBPACK_IMPORTED_MODULE_8__["NullLogger"]; });

/* harmony import */ var _JsonHubProtocol__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./JsonHubProtocol */ "./node_modules/@aspnet/signalr/dist/esm/JsonHubProtocol.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "JsonHubProtocol", function() { return _JsonHubProtocol__WEBPACK_IMPORTED_MODULE_9__["JsonHubProtocol"]; });

// Copyright (c) .NET Foundation. All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
// Version token that will be replaced by the prepack command
/** The version of the SignalR client. */
var VERSION = "1.1.0";










//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./node_modules/ansi-html/index.js":
/*!*****************************************!*\
  !*** ./node_modules/ansi-html/index.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = ansiHTML

// Reference to https://github.com/sindresorhus/ansi-regex
var _regANSI = /(?:(?:\u001b\[)|\u009b)(?:(?:[0-9]{1,3})?(?:(?:;[0-9]{0,3})*)?[A-M|f-m])|\u001b[A-M]/

var _defColors = {
  reset: ['fff', '000'], // [FOREGROUD_COLOR, BACKGROUND_COLOR]
  black: '000',
  red: 'ff0000',
  green: '209805',
  yellow: 'e8bf03',
  blue: '0000ff',
  magenta: 'ff00ff',
  cyan: '00ffee',
  lightgrey: 'f0f0f0',
  darkgrey: '888'
}
var _styles = {
  30: 'black',
  31: 'red',
  32: 'green',
  33: 'yellow',
  34: 'blue',
  35: 'magenta',
  36: 'cyan',
  37: 'lightgrey'
}
var _openTags = {
  '1': 'font-weight:bold', // bold
  '2': 'opacity:0.5', // dim
  '3': '<i>', // italic
  '4': '<u>', // underscore
  '8': 'display:none', // hidden
  '9': '<del>' // delete
}
var _closeTags = {
  '23': '</i>', // reset italic
  '24': '</u>', // reset underscore
  '29': '</del>' // reset delete
}

;[0, 21, 22, 27, 28, 39, 49].forEach(function (n) {
  _closeTags[n] = '</span>'
})

/**
 * Converts text with ANSI color codes to HTML markup.
 * @param {String} text
 * @returns {*}
 */
function ansiHTML (text) {
  // Returns the text if the string has no ANSI escape code.
  if (!_regANSI.test(text)) {
    return text
  }

  // Cache opened sequence.
  var ansiCodes = []
  // Replace with markup.
  var ret = text.replace(/\033\[(\d+)*m/g, function (match, seq) {
    var ot = _openTags[seq]
    if (ot) {
      // If current sequence has been opened, close it.
      if (!!~ansiCodes.indexOf(seq)) { // eslint-disable-line no-extra-boolean-cast
        ansiCodes.pop()
        return '</span>'
      }
      // Open tag.
      ansiCodes.push(seq)
      return ot[0] === '<' ? ot : '<span style="' + ot + ';">'
    }

    var ct = _closeTags[seq]
    if (ct) {
      // Pop sequence
      ansiCodes.pop()
      return ct
    }
    return ''
  })

  // Make sure tags are closed.
  var l = ansiCodes.length
  ;(l > 0) && (ret += Array(l + 1).join('</span>'))

  return ret
}

/**
 * Customize colors.
 * @param {Object} colors reference to _defColors
 */
ansiHTML.setColors = function (colors) {
  if (typeof colors !== 'object') {
    throw new Error('`colors` parameter must be an Object.')
  }

  var _finalColors = {}
  for (var key in _defColors) {
    var hex = colors.hasOwnProperty(key) ? colors[key] : null
    if (!hex) {
      _finalColors[key] = _defColors[key]
      continue
    }
    if ('reset' === key) {
      if (typeof hex === 'string') {
        hex = [hex]
      }
      if (!Array.isArray(hex) || hex.length === 0 || hex.some(function (h) {
        return typeof h !== 'string'
      })) {
        throw new Error('The value of `' + key + '` property must be an Array and each item could only be a hex string, e.g.: FF0000')
      }
      var defHexColor = _defColors[key]
      if (!hex[0]) {
        hex[0] = defHexColor[0]
      }
      if (hex.length === 1 || !hex[1]) {
        hex = [hex[0]]
        hex.push(defHexColor[1])
      }

      hex = hex.slice(0, 2)
    } else if (typeof hex !== 'string') {
      throw new Error('The value of `' + key + '` property must be a hex string, e.g.: FF0000')
    }
    _finalColors[key] = hex
  }
  _setTags(_finalColors)
}

/**
 * Reset colors.
 */
ansiHTML.reset = function () {
  _setTags(_defColors)
}

/**
 * Expose tags, including open and close.
 * @type {Object}
 */
ansiHTML.tags = {}

if (Object.defineProperty) {
  Object.defineProperty(ansiHTML.tags, 'open', {
    get: function () { return _openTags }
  })
  Object.defineProperty(ansiHTML.tags, 'close', {
    get: function () { return _closeTags }
  })
} else {
  ansiHTML.tags.open = _openTags
  ansiHTML.tags.close = _closeTags
}

function _setTags (colors) {
  // reset all
  _openTags['0'] = 'font-weight:normal;opacity:1;color:#' + colors.reset[0] + ';background:#' + colors.reset[1]
  // inverse
  _openTags['7'] = 'color:#' + colors.reset[1] + ';background:#' + colors.reset[0]
  // dark grey
  _openTags['90'] = 'color:#' + colors.darkgrey

  for (var code in _styles) {
    var color = _styles[code]
    var oriColor = colors[color] || '000'
    _openTags[code] = 'color:#' + oriColor
    code = parseInt(code)
    _openTags[(code + 10).toString()] = 'background:#' + oriColor
  }
}

ansiHTML.reset()


/***/ }),

/***/ "./node_modules/ansi-regex/index.js":
/*!******************************************!*\
  !*** ./node_modules/ansi-regex/index.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = function () {
	return /[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-PRZcf-nqry=><]/g;
};


/***/ }),

/***/ "./node_modules/base64-js/index.js":
/*!*****************************************!*\
  !*** ./node_modules/base64-js/index.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.byteLength = byteLength
exports.toByteArray = toByteArray
exports.fromByteArray = fromByteArray

var lookup = []
var revLookup = []
var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array

var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
for (var i = 0, len = code.length; i < len; ++i) {
  lookup[i] = code[i]
  revLookup[code.charCodeAt(i)] = i
}

// Support decoding URL-safe base64 strings, as Node.js does.
// See: https://en.wikipedia.org/wiki/Base64#URL_applications
revLookup['-'.charCodeAt(0)] = 62
revLookup['_'.charCodeAt(0)] = 63

function getLens (b64) {
  var len = b64.length

  if (len % 4 > 0) {
    throw new Error('Invalid string. Length must be a multiple of 4')
  }

  // Trim off extra bytes after placeholder bytes are found
  // See: https://github.com/beatgammit/base64-js/issues/42
  var validLen = b64.indexOf('=')
  if (validLen === -1) validLen = len

  var placeHoldersLen = validLen === len
    ? 0
    : 4 - (validLen % 4)

  return [validLen, placeHoldersLen]
}

// base64 is 4/3 + up to two characters of the original data
function byteLength (b64) {
  var lens = getLens(b64)
  var validLen = lens[0]
  var placeHoldersLen = lens[1]
  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
}

function _byteLength (b64, validLen, placeHoldersLen) {
  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
}

function toByteArray (b64) {
  var tmp
  var lens = getLens(b64)
  var validLen = lens[0]
  var placeHoldersLen = lens[1]

  var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen))

  var curByte = 0

  // if there are placeholders, only get up to the last complete 4 chars
  var len = placeHoldersLen > 0
    ? validLen - 4
    : validLen

  for (var i = 0; i < len; i += 4) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 18) |
      (revLookup[b64.charCodeAt(i + 1)] << 12) |
      (revLookup[b64.charCodeAt(i + 2)] << 6) |
      revLookup[b64.charCodeAt(i + 3)]
    arr[curByte++] = (tmp >> 16) & 0xFF
    arr[curByte++] = (tmp >> 8) & 0xFF
    arr[curByte++] = tmp & 0xFF
  }

  if (placeHoldersLen === 2) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 2) |
      (revLookup[b64.charCodeAt(i + 1)] >> 4)
    arr[curByte++] = tmp & 0xFF
  }

  if (placeHoldersLen === 1) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 10) |
      (revLookup[b64.charCodeAt(i + 1)] << 4) |
      (revLookup[b64.charCodeAt(i + 2)] >> 2)
    arr[curByte++] = (tmp >> 8) & 0xFF
    arr[curByte++] = tmp & 0xFF
  }

  return arr
}

function tripletToBase64 (num) {
  return lookup[num >> 18 & 0x3F] +
    lookup[num >> 12 & 0x3F] +
    lookup[num >> 6 & 0x3F] +
    lookup[num & 0x3F]
}

function encodeChunk (uint8, start, end) {
  var tmp
  var output = []
  for (var i = start; i < end; i += 3) {
    tmp =
      ((uint8[i] << 16) & 0xFF0000) +
      ((uint8[i + 1] << 8) & 0xFF00) +
      (uint8[i + 2] & 0xFF)
    output.push(tripletToBase64(tmp))
  }
  return output.join('')
}

function fromByteArray (uint8) {
  var tmp
  var len = uint8.length
  var extraBytes = len % 3 // if we have 1 byte left, pad 2 bytes
  var parts = []
  var maxChunkLength = 16383 // must be multiple of 3

  // go through the array every three bytes, we'll deal with trailing stuff later
  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
    parts.push(encodeChunk(
      uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)
    ))
  }

  // pad the end with zeros, but make sure to not forget the extra bytes
  if (extraBytes === 1) {
    tmp = uint8[len - 1]
    parts.push(
      lookup[tmp >> 2] +
      lookup[(tmp << 4) & 0x3F] +
      '=='
    )
  } else if (extraBytes === 2) {
    tmp = (uint8[len - 2] << 8) + uint8[len - 1]
    parts.push(
      lookup[tmp >> 10] +
      lookup[(tmp >> 4) & 0x3F] +
      lookup[(tmp << 2) & 0x3F] +
      '='
    )
  }

  return parts.join('')
}


/***/ }),

/***/ "./node_modules/buffer/index.js":
/*!**************************************!*\
  !*** ./node_modules/buffer/index.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * @license  MIT
 */
/* eslint-disable no-proto */



var base64 = __webpack_require__(/*! base64-js */ "./node_modules/base64-js/index.js")
var ieee754 = __webpack_require__(/*! ieee754 */ "./node_modules/ieee754/index.js")
var isArray = __webpack_require__(/*! isarray */ "./node_modules/buffer/node_modules/isarray/index.js")

exports.Buffer = Buffer
exports.SlowBuffer = SlowBuffer
exports.INSPECT_MAX_BYTES = 50

/**
 * If `Buffer.TYPED_ARRAY_SUPPORT`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Use Object implementation (most compatible, even IE6)
 *
 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
 * Opera 11.6+, iOS 4.2+.
 *
 * Due to various browser bugs, sometimes the Object implementation will be used even
 * when the browser supports typed arrays.
 *
 * Note:
 *
 *   - Firefox 4-29 lacks support for adding new properties to `Uint8Array` instances,
 *     See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
 *
 *   - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
 *
 *   - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
 *     incorrect length in some situations.

 * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they
 * get the Object implementation, which is slower but behaves correctly.
 */
Buffer.TYPED_ARRAY_SUPPORT = global.TYPED_ARRAY_SUPPORT !== undefined
  ? global.TYPED_ARRAY_SUPPORT
  : typedArraySupport()

/*
 * Export kMaxLength after typed array support is determined.
 */
exports.kMaxLength = kMaxLength()

function typedArraySupport () {
  try {
    var arr = new Uint8Array(1)
    arr.__proto__ = {__proto__: Uint8Array.prototype, foo: function () { return 42 }}
    return arr.foo() === 42 && // typed array instances can be augmented
        typeof arr.subarray === 'function' && // chrome 9-10 lack `subarray`
        arr.subarray(1, 1).byteLength === 0 // ie10 has broken `subarray`
  } catch (e) {
    return false
  }
}

function kMaxLength () {
  return Buffer.TYPED_ARRAY_SUPPORT
    ? 0x7fffffff
    : 0x3fffffff
}

function createBuffer (that, length) {
  if (kMaxLength() < length) {
    throw new RangeError('Invalid typed array length')
  }
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = new Uint8Array(length)
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    if (that === null) {
      that = new Buffer(length)
    }
    that.length = length
  }

  return that
}

/**
 * The Buffer constructor returns instances of `Uint8Array` that have their
 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
 * returns a single octet.
 *
 * The `Uint8Array` prototype remains unmodified.
 */

function Buffer (arg, encodingOrOffset, length) {
  if (!Buffer.TYPED_ARRAY_SUPPORT && !(this instanceof Buffer)) {
    return new Buffer(arg, encodingOrOffset, length)
  }

  // Common case.
  if (typeof arg === 'number') {
    if (typeof encodingOrOffset === 'string') {
      throw new Error(
        'If encoding is specified then the first argument must be a string'
      )
    }
    return allocUnsafe(this, arg)
  }
  return from(this, arg, encodingOrOffset, length)
}

Buffer.poolSize = 8192 // not used by this implementation

// TODO: Legacy, not needed anymore. Remove in next major version.
Buffer._augment = function (arr) {
  arr.__proto__ = Buffer.prototype
  return arr
}

function from (that, value, encodingOrOffset, length) {
  if (typeof value === 'number') {
    throw new TypeError('"value" argument must not be a number')
  }

  if (typeof ArrayBuffer !== 'undefined' && value instanceof ArrayBuffer) {
    return fromArrayBuffer(that, value, encodingOrOffset, length)
  }

  if (typeof value === 'string') {
    return fromString(that, value, encodingOrOffset)
  }

  return fromObject(that, value)
}

/**
 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
 * if value is a number.
 * Buffer.from(str[, encoding])
 * Buffer.from(array)
 * Buffer.from(buffer)
 * Buffer.from(arrayBuffer[, byteOffset[, length]])
 **/
Buffer.from = function (value, encodingOrOffset, length) {
  return from(null, value, encodingOrOffset, length)
}

if (Buffer.TYPED_ARRAY_SUPPORT) {
  Buffer.prototype.__proto__ = Uint8Array.prototype
  Buffer.__proto__ = Uint8Array
  if (typeof Symbol !== 'undefined' && Symbol.species &&
      Buffer[Symbol.species] === Buffer) {
    // Fix subarray() in ES2016. See: https://github.com/feross/buffer/pull/97
    Object.defineProperty(Buffer, Symbol.species, {
      value: null,
      configurable: true
    })
  }
}

function assertSize (size) {
  if (typeof size !== 'number') {
    throw new TypeError('"size" argument must be a number')
  } else if (size < 0) {
    throw new RangeError('"size" argument must not be negative')
  }
}

function alloc (that, size, fill, encoding) {
  assertSize(size)
  if (size <= 0) {
    return createBuffer(that, size)
  }
  if (fill !== undefined) {
    // Only pay attention to encoding if it's a string. This
    // prevents accidentally sending in a number that would
    // be interpretted as a start offset.
    return typeof encoding === 'string'
      ? createBuffer(that, size).fill(fill, encoding)
      : createBuffer(that, size).fill(fill)
  }
  return createBuffer(that, size)
}

/**
 * Creates a new filled Buffer instance.
 * alloc(size[, fill[, encoding]])
 **/
Buffer.alloc = function (size, fill, encoding) {
  return alloc(null, size, fill, encoding)
}

function allocUnsafe (that, size) {
  assertSize(size)
  that = createBuffer(that, size < 0 ? 0 : checked(size) | 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) {
    for (var i = 0; i < size; ++i) {
      that[i] = 0
    }
  }
  return that
}

/**
 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
 * */
Buffer.allocUnsafe = function (size) {
  return allocUnsafe(null, size)
}
/**
 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
 */
Buffer.allocUnsafeSlow = function (size) {
  return allocUnsafe(null, size)
}

function fromString (that, string, encoding) {
  if (typeof encoding !== 'string' || encoding === '') {
    encoding = 'utf8'
  }

  if (!Buffer.isEncoding(encoding)) {
    throw new TypeError('"encoding" must be a valid string encoding')
  }

  var length = byteLength(string, encoding) | 0
  that = createBuffer(that, length)

  var actual = that.write(string, encoding)

  if (actual !== length) {
    // Writing a hex string, for example, that contains invalid characters will
    // cause everything after the first invalid character to be ignored. (e.g.
    // 'abxxcd' will be treated as 'ab')
    that = that.slice(0, actual)
  }

  return that
}

function fromArrayLike (that, array) {
  var length = array.length < 0 ? 0 : checked(array.length) | 0
  that = createBuffer(that, length)
  for (var i = 0; i < length; i += 1) {
    that[i] = array[i] & 255
  }
  return that
}

function fromArrayBuffer (that, array, byteOffset, length) {
  array.byteLength // this throws if `array` is not a valid ArrayBuffer

  if (byteOffset < 0 || array.byteLength < byteOffset) {
    throw new RangeError('\'offset\' is out of bounds')
  }

  if (array.byteLength < byteOffset + (length || 0)) {
    throw new RangeError('\'length\' is out of bounds')
  }

  if (byteOffset === undefined && length === undefined) {
    array = new Uint8Array(array)
  } else if (length === undefined) {
    array = new Uint8Array(array, byteOffset)
  } else {
    array = new Uint8Array(array, byteOffset, length)
  }

  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = array
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    that = fromArrayLike(that, array)
  }
  return that
}

function fromObject (that, obj) {
  if (Buffer.isBuffer(obj)) {
    var len = checked(obj.length) | 0
    that = createBuffer(that, len)

    if (that.length === 0) {
      return that
    }

    obj.copy(that, 0, 0, len)
    return that
  }

  if (obj) {
    if ((typeof ArrayBuffer !== 'undefined' &&
        obj.buffer instanceof ArrayBuffer) || 'length' in obj) {
      if (typeof obj.length !== 'number' || isnan(obj.length)) {
        return createBuffer(that, 0)
      }
      return fromArrayLike(that, obj)
    }

    if (obj.type === 'Buffer' && isArray(obj.data)) {
      return fromArrayLike(that, obj.data)
    }
  }

  throw new TypeError('First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.')
}

function checked (length) {
  // Note: cannot use `length < kMaxLength()` here because that fails when
  // length is NaN (which is otherwise coerced to zero.)
  if (length >= kMaxLength()) {
    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
                         'size: 0x' + kMaxLength().toString(16) + ' bytes')
  }
  return length | 0
}

function SlowBuffer (length) {
  if (+length != length) { // eslint-disable-line eqeqeq
    length = 0
  }
  return Buffer.alloc(+length)
}

Buffer.isBuffer = function isBuffer (b) {
  return !!(b != null && b._isBuffer)
}

Buffer.compare = function compare (a, b) {
  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
    throw new TypeError('Arguments must be Buffers')
  }

  if (a === b) return 0

  var x = a.length
  var y = b.length

  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
    if (a[i] !== b[i]) {
      x = a[i]
      y = b[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

Buffer.isEncoding = function isEncoding (encoding) {
  switch (String(encoding).toLowerCase()) {
    case 'hex':
    case 'utf8':
    case 'utf-8':
    case 'ascii':
    case 'latin1':
    case 'binary':
    case 'base64':
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      return true
    default:
      return false
  }
}

Buffer.concat = function concat (list, length) {
  if (!isArray(list)) {
    throw new TypeError('"list" argument must be an Array of Buffers')
  }

  if (list.length === 0) {
    return Buffer.alloc(0)
  }

  var i
  if (length === undefined) {
    length = 0
    for (i = 0; i < list.length; ++i) {
      length += list[i].length
    }
  }

  var buffer = Buffer.allocUnsafe(length)
  var pos = 0
  for (i = 0; i < list.length; ++i) {
    var buf = list[i]
    if (!Buffer.isBuffer(buf)) {
      throw new TypeError('"list" argument must be an Array of Buffers')
    }
    buf.copy(buffer, pos)
    pos += buf.length
  }
  return buffer
}

function byteLength (string, encoding) {
  if (Buffer.isBuffer(string)) {
    return string.length
  }
  if (typeof ArrayBuffer !== 'undefined' && typeof ArrayBuffer.isView === 'function' &&
      (ArrayBuffer.isView(string) || string instanceof ArrayBuffer)) {
    return string.byteLength
  }
  if (typeof string !== 'string') {
    string = '' + string
  }

  var len = string.length
  if (len === 0) return 0

  // Use a for loop to avoid recursion
  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'ascii':
      case 'latin1':
      case 'binary':
        return len
      case 'utf8':
      case 'utf-8':
      case undefined:
        return utf8ToBytes(string).length
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return len * 2
      case 'hex':
        return len >>> 1
      case 'base64':
        return base64ToBytes(string).length
      default:
        if (loweredCase) return utf8ToBytes(string).length // assume utf8
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}
Buffer.byteLength = byteLength

function slowToString (encoding, start, end) {
  var loweredCase = false

  // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
  // property of a typed array.

  // This behaves neither like String nor Uint8Array in that we set start/end
  // to their upper/lower bounds if the value passed is out of range.
  // undefined is handled specially as per ECMA-262 6th Edition,
  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
  if (start === undefined || start < 0) {
    start = 0
  }
  // Return early if start > this.length. Done here to prevent potential uint32
  // coercion fail below.
  if (start > this.length) {
    return ''
  }

  if (end === undefined || end > this.length) {
    end = this.length
  }

  if (end <= 0) {
    return ''
  }

  // Force coersion to uint32. This will also coerce falsey/NaN values to 0.
  end >>>= 0
  start >>>= 0

  if (end <= start) {
    return ''
  }

  if (!encoding) encoding = 'utf8'

  while (true) {
    switch (encoding) {
      case 'hex':
        return hexSlice(this, start, end)

      case 'utf8':
      case 'utf-8':
        return utf8Slice(this, start, end)

      case 'ascii':
        return asciiSlice(this, start, end)

      case 'latin1':
      case 'binary':
        return latin1Slice(this, start, end)

      case 'base64':
        return base64Slice(this, start, end)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return utf16leSlice(this, start, end)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = (encoding + '').toLowerCase()
        loweredCase = true
    }
  }
}

// The property is used by `Buffer.isBuffer` and `is-buffer` (in Safari 5-7) to detect
// Buffer instances.
Buffer.prototype._isBuffer = true

function swap (b, n, m) {
  var i = b[n]
  b[n] = b[m]
  b[m] = i
}

Buffer.prototype.swap16 = function swap16 () {
  var len = this.length
  if (len % 2 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 16-bits')
  }
  for (var i = 0; i < len; i += 2) {
    swap(this, i, i + 1)
  }
  return this
}

Buffer.prototype.swap32 = function swap32 () {
  var len = this.length
  if (len % 4 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 32-bits')
  }
  for (var i = 0; i < len; i += 4) {
    swap(this, i, i + 3)
    swap(this, i + 1, i + 2)
  }
  return this
}

Buffer.prototype.swap64 = function swap64 () {
  var len = this.length
  if (len % 8 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 64-bits')
  }
  for (var i = 0; i < len; i += 8) {
    swap(this, i, i + 7)
    swap(this, i + 1, i + 6)
    swap(this, i + 2, i + 5)
    swap(this, i + 3, i + 4)
  }
  return this
}

Buffer.prototype.toString = function toString () {
  var length = this.length | 0
  if (length === 0) return ''
  if (arguments.length === 0) return utf8Slice(this, 0, length)
  return slowToString.apply(this, arguments)
}

Buffer.prototype.equals = function equals (b) {
  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
  if (this === b) return true
  return Buffer.compare(this, b) === 0
}

Buffer.prototype.inspect = function inspect () {
  var str = ''
  var max = exports.INSPECT_MAX_BYTES
  if (this.length > 0) {
    str = this.toString('hex', 0, max).match(/.{2}/g).join(' ')
    if (this.length > max) str += ' ... '
  }
  return '<Buffer ' + str + '>'
}

Buffer.prototype.compare = function compare (target, start, end, thisStart, thisEnd) {
  if (!Buffer.isBuffer(target)) {
    throw new TypeError('Argument must be a Buffer')
  }

  if (start === undefined) {
    start = 0
  }
  if (end === undefined) {
    end = target ? target.length : 0
  }
  if (thisStart === undefined) {
    thisStart = 0
  }
  if (thisEnd === undefined) {
    thisEnd = this.length
  }

  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
    throw new RangeError('out of range index')
  }

  if (thisStart >= thisEnd && start >= end) {
    return 0
  }
  if (thisStart >= thisEnd) {
    return -1
  }
  if (start >= end) {
    return 1
  }

  start >>>= 0
  end >>>= 0
  thisStart >>>= 0
  thisEnd >>>= 0

  if (this === target) return 0

  var x = thisEnd - thisStart
  var y = end - start
  var len = Math.min(x, y)

  var thisCopy = this.slice(thisStart, thisEnd)
  var targetCopy = target.slice(start, end)

  for (var i = 0; i < len; ++i) {
    if (thisCopy[i] !== targetCopy[i]) {
      x = thisCopy[i]
      y = targetCopy[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
//
// Arguments:
// - buffer - a Buffer to search
// - val - a string, Buffer, or number
// - byteOffset - an index into `buffer`; will be clamped to an int32
// - encoding - an optional encoding, relevant is val is a string
// - dir - true for indexOf, false for lastIndexOf
function bidirectionalIndexOf (buffer, val, byteOffset, encoding, dir) {
  // Empty buffer means no match
  if (buffer.length === 0) return -1

  // Normalize byteOffset
  if (typeof byteOffset === 'string') {
    encoding = byteOffset
    byteOffset = 0
  } else if (byteOffset > 0x7fffffff) {
    byteOffset = 0x7fffffff
  } else if (byteOffset < -0x80000000) {
    byteOffset = -0x80000000
  }
  byteOffset = +byteOffset  // Coerce to Number.
  if (isNaN(byteOffset)) {
    // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
    byteOffset = dir ? 0 : (buffer.length - 1)
  }

  // Normalize byteOffset: negative offsets start from the end of the buffer
  if (byteOffset < 0) byteOffset = buffer.length + byteOffset
  if (byteOffset >= buffer.length) {
    if (dir) return -1
    else byteOffset = buffer.length - 1
  } else if (byteOffset < 0) {
    if (dir) byteOffset = 0
    else return -1
  }

  // Normalize val
  if (typeof val === 'string') {
    val = Buffer.from(val, encoding)
  }

  // Finally, search either indexOf (if dir is true) or lastIndexOf
  if (Buffer.isBuffer(val)) {
    // Special case: looking for empty string/buffer always fails
    if (val.length === 0) {
      return -1
    }
    return arrayIndexOf(buffer, val, byteOffset, encoding, dir)
  } else if (typeof val === 'number') {
    val = val & 0xFF // Search for a byte value [0-255]
    if (Buffer.TYPED_ARRAY_SUPPORT &&
        typeof Uint8Array.prototype.indexOf === 'function') {
      if (dir) {
        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset)
      } else {
        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset)
      }
    }
    return arrayIndexOf(buffer, [ val ], byteOffset, encoding, dir)
  }

  throw new TypeError('val must be string, number or Buffer')
}

function arrayIndexOf (arr, val, byteOffset, encoding, dir) {
  var indexSize = 1
  var arrLength = arr.length
  var valLength = val.length

  if (encoding !== undefined) {
    encoding = String(encoding).toLowerCase()
    if (encoding === 'ucs2' || encoding === 'ucs-2' ||
        encoding === 'utf16le' || encoding === 'utf-16le') {
      if (arr.length < 2 || val.length < 2) {
        return -1
      }
      indexSize = 2
      arrLength /= 2
      valLength /= 2
      byteOffset /= 2
    }
  }

  function read (buf, i) {
    if (indexSize === 1) {
      return buf[i]
    } else {
      return buf.readUInt16BE(i * indexSize)
    }
  }

  var i
  if (dir) {
    var foundIndex = -1
    for (i = byteOffset; i < arrLength; i++) {
      if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
        if (foundIndex === -1) foundIndex = i
        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize
      } else {
        if (foundIndex !== -1) i -= i - foundIndex
        foundIndex = -1
      }
    }
  } else {
    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength
    for (i = byteOffset; i >= 0; i--) {
      var found = true
      for (var j = 0; j < valLength; j++) {
        if (read(arr, i + j) !== read(val, j)) {
          found = false
          break
        }
      }
      if (found) return i
    }
  }

  return -1
}

Buffer.prototype.includes = function includes (val, byteOffset, encoding) {
  return this.indexOf(val, byteOffset, encoding) !== -1
}

Buffer.prototype.indexOf = function indexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, true)
}

Buffer.prototype.lastIndexOf = function lastIndexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, false)
}

function hexWrite (buf, string, offset, length) {
  offset = Number(offset) || 0
  var remaining = buf.length - offset
  if (!length) {
    length = remaining
  } else {
    length = Number(length)
    if (length > remaining) {
      length = remaining
    }
  }

  // must be an even number of digits
  var strLen = string.length
  if (strLen % 2 !== 0) throw new TypeError('Invalid hex string')

  if (length > strLen / 2) {
    length = strLen / 2
  }
  for (var i = 0; i < length; ++i) {
    var parsed = parseInt(string.substr(i * 2, 2), 16)
    if (isNaN(parsed)) return i
    buf[offset + i] = parsed
  }
  return i
}

function utf8Write (buf, string, offset, length) {
  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
}

function asciiWrite (buf, string, offset, length) {
  return blitBuffer(asciiToBytes(string), buf, offset, length)
}

function latin1Write (buf, string, offset, length) {
  return asciiWrite(buf, string, offset, length)
}

function base64Write (buf, string, offset, length) {
  return blitBuffer(base64ToBytes(string), buf, offset, length)
}

function ucs2Write (buf, string, offset, length) {
  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
}

Buffer.prototype.write = function write (string, offset, length, encoding) {
  // Buffer#write(string)
  if (offset === undefined) {
    encoding = 'utf8'
    length = this.length
    offset = 0
  // Buffer#write(string, encoding)
  } else if (length === undefined && typeof offset === 'string') {
    encoding = offset
    length = this.length
    offset = 0
  // Buffer#write(string, offset[, length][, encoding])
  } else if (isFinite(offset)) {
    offset = offset | 0
    if (isFinite(length)) {
      length = length | 0
      if (encoding === undefined) encoding = 'utf8'
    } else {
      encoding = length
      length = undefined
    }
  // legacy write(string, encoding, offset, length) - remove in v0.13
  } else {
    throw new Error(
      'Buffer.write(string, encoding, offset[, length]) is no longer supported'
    )
  }

  var remaining = this.length - offset
  if (length === undefined || length > remaining) length = remaining

  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
    throw new RangeError('Attempt to write outside buffer bounds')
  }

  if (!encoding) encoding = 'utf8'

  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'hex':
        return hexWrite(this, string, offset, length)

      case 'utf8':
      case 'utf-8':
        return utf8Write(this, string, offset, length)

      case 'ascii':
        return asciiWrite(this, string, offset, length)

      case 'latin1':
      case 'binary':
        return latin1Write(this, string, offset, length)

      case 'base64':
        // Warning: maxLength not taken into account in base64Write
        return base64Write(this, string, offset, length)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return ucs2Write(this, string, offset, length)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}

Buffer.prototype.toJSON = function toJSON () {
  return {
    type: 'Buffer',
    data: Array.prototype.slice.call(this._arr || this, 0)
  }
}

function base64Slice (buf, start, end) {
  if (start === 0 && end === buf.length) {
    return base64.fromByteArray(buf)
  } else {
    return base64.fromByteArray(buf.slice(start, end))
  }
}

function utf8Slice (buf, start, end) {
  end = Math.min(buf.length, end)
  var res = []

  var i = start
  while (i < end) {
    var firstByte = buf[i]
    var codePoint = null
    var bytesPerSequence = (firstByte > 0xEF) ? 4
      : (firstByte > 0xDF) ? 3
      : (firstByte > 0xBF) ? 2
      : 1

    if (i + bytesPerSequence <= end) {
      var secondByte, thirdByte, fourthByte, tempCodePoint

      switch (bytesPerSequence) {
        case 1:
          if (firstByte < 0x80) {
            codePoint = firstByte
          }
          break
        case 2:
          secondByte = buf[i + 1]
          if ((secondByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F)
            if (tempCodePoint > 0x7F) {
              codePoint = tempCodePoint
            }
          }
          break
        case 3:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F)
            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
              codePoint = tempCodePoint
            }
          }
          break
        case 4:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          fourthByte = buf[i + 3]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F)
            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
              codePoint = tempCodePoint
            }
          }
      }
    }

    if (codePoint === null) {
      // we did not generate a valid codePoint so insert a
      // replacement char (U+FFFD) and advance only 1 byte
      codePoint = 0xFFFD
      bytesPerSequence = 1
    } else if (codePoint > 0xFFFF) {
      // encode to utf16 (surrogate pair dance)
      codePoint -= 0x10000
      res.push(codePoint >>> 10 & 0x3FF | 0xD800)
      codePoint = 0xDC00 | codePoint & 0x3FF
    }

    res.push(codePoint)
    i += bytesPerSequence
  }

  return decodeCodePointsArray(res)
}

// Based on http://stackoverflow.com/a/22747272/680742, the browser with
// the lowest limit is Chrome, with 0x10000 args.
// We go 1 magnitude less, for safety
var MAX_ARGUMENTS_LENGTH = 0x1000

function decodeCodePointsArray (codePoints) {
  var len = codePoints.length
  if (len <= MAX_ARGUMENTS_LENGTH) {
    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
  }

  // Decode in chunks to avoid "call stack size exceeded".
  var res = ''
  var i = 0
  while (i < len) {
    res += String.fromCharCode.apply(
      String,
      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
    )
  }
  return res
}

function asciiSlice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i] & 0x7F)
  }
  return ret
}

function latin1Slice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i])
  }
  return ret
}

function hexSlice (buf, start, end) {
  var len = buf.length

  if (!start || start < 0) start = 0
  if (!end || end < 0 || end > len) end = len

  var out = ''
  for (var i = start; i < end; ++i) {
    out += toHex(buf[i])
  }
  return out
}

function utf16leSlice (buf, start, end) {
  var bytes = buf.slice(start, end)
  var res = ''
  for (var i = 0; i < bytes.length; i += 2) {
    res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256)
  }
  return res
}

Buffer.prototype.slice = function slice (start, end) {
  var len = this.length
  start = ~~start
  end = end === undefined ? len : ~~end

  if (start < 0) {
    start += len
    if (start < 0) start = 0
  } else if (start > len) {
    start = len
  }

  if (end < 0) {
    end += len
    if (end < 0) end = 0
  } else if (end > len) {
    end = len
  }

  if (end < start) end = start

  var newBuf
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    newBuf = this.subarray(start, end)
    newBuf.__proto__ = Buffer.prototype
  } else {
    var sliceLen = end - start
    newBuf = new Buffer(sliceLen, undefined)
    for (var i = 0; i < sliceLen; ++i) {
      newBuf[i] = this[i + start]
    }
  }

  return newBuf
}

/*
 * Need to make sure that buffer isn't trying to write out of bounds.
 */
function checkOffset (offset, ext, length) {
  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
}

Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }

  return val
}

Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    checkOffset(offset, byteLength, this.length)
  }

  var val = this[offset + --byteLength]
  var mul = 1
  while (byteLength > 0 && (mul *= 0x100)) {
    val += this[offset + --byteLength] * mul
  }

  return val
}

Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  return this[offset]
}

Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return this[offset] | (this[offset + 1] << 8)
}

Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return (this[offset] << 8) | this[offset + 1]
}

Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return ((this[offset]) |
      (this[offset + 1] << 8) |
      (this[offset + 2] << 16)) +
      (this[offset + 3] * 0x1000000)
}

Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] * 0x1000000) +
    ((this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    this[offset + 3])
}

Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var i = byteLength
  var mul = 1
  var val = this[offset + --i]
  while (i > 0 && (mul *= 0x100)) {
    val += this[offset + --i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  if (!(this[offset] & 0x80)) return (this[offset])
  return ((0xff - this[offset] + 1) * -1)
}

Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset] | (this[offset + 1] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset + 1] | (this[offset] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset]) |
    (this[offset + 1] << 8) |
    (this[offset + 2] << 16) |
    (this[offset + 3] << 24)
}

Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] << 24) |
    (this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    (this[offset + 3])
}

Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, true, 23, 4)
}

Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, false, 23, 4)
}

Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, true, 52, 8)
}

Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, false, 52, 8)
}

function checkInt (buf, value, offset, ext, max, min) {
  if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance')
  if (value > max || value < min) throw new RangeError('"value" argument is out of bounds')
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
}

Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var mul = 1
  var i = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var i = byteLength - 1
  var mul = 1
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  this[offset] = (value & 0xff)
  return offset + 1
}

function objectWriteUInt16 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; ++i) {
    buf[offset + i] = (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>>
      (littleEndian ? i : 1 - i) * 8
  }
}

Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

function objectWriteUInt32 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffffffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; ++i) {
    buf[offset + i] = (value >>> (littleEndian ? i : 3 - i) * 8) & 0xff
  }
}

Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset + 3] = (value >>> 24)
    this[offset + 2] = (value >>> 16)
    this[offset + 1] = (value >>> 8)
    this[offset] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = 0
  var mul = 1
  var sub = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = byteLength - 1
  var mul = 1
  var sub = 0
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  if (value < 0) value = 0xff + value + 1
  this[offset] = (value & 0xff)
  return offset + 1
}

Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
    this[offset + 2] = (value >>> 16)
    this[offset + 3] = (value >>> 24)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (value < 0) value = 0xffffffff + value + 1
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

function checkIEEE754 (buf, value, offset, ext, max, min) {
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
  if (offset < 0) throw new RangeError('Index out of range')
}

function writeFloat (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
  }
  ieee754.write(buf, value, offset, littleEndian, 23, 4)
  return offset + 4
}

Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
  return writeFloat(this, value, offset, true, noAssert)
}

Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
  return writeFloat(this, value, offset, false, noAssert)
}

function writeDouble (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
  }
  ieee754.write(buf, value, offset, littleEndian, 52, 8)
  return offset + 8
}

Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
  return writeDouble(this, value, offset, true, noAssert)
}

Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
  return writeDouble(this, value, offset, false, noAssert)
}

// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer.prototype.copy = function copy (target, targetStart, start, end) {
  if (!start) start = 0
  if (!end && end !== 0) end = this.length
  if (targetStart >= target.length) targetStart = target.length
  if (!targetStart) targetStart = 0
  if (end > 0 && end < start) end = start

  // Copy 0 bytes; we're done
  if (end === start) return 0
  if (target.length === 0 || this.length === 0) return 0

  // Fatal error conditions
  if (targetStart < 0) {
    throw new RangeError('targetStart out of bounds')
  }
  if (start < 0 || start >= this.length) throw new RangeError('sourceStart out of bounds')
  if (end < 0) throw new RangeError('sourceEnd out of bounds')

  // Are we oob?
  if (end > this.length) end = this.length
  if (target.length - targetStart < end - start) {
    end = target.length - targetStart + start
  }

  var len = end - start
  var i

  if (this === target && start < targetStart && targetStart < end) {
    // descending copy from end
    for (i = len - 1; i >= 0; --i) {
      target[i + targetStart] = this[i + start]
    }
  } else if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {
    // ascending copy from start
    for (i = 0; i < len; ++i) {
      target[i + targetStart] = this[i + start]
    }
  } else {
    Uint8Array.prototype.set.call(
      target,
      this.subarray(start, start + len),
      targetStart
    )
  }

  return len
}

// Usage:
//    buffer.fill(number[, offset[, end]])
//    buffer.fill(buffer[, offset[, end]])
//    buffer.fill(string[, offset[, end]][, encoding])
Buffer.prototype.fill = function fill (val, start, end, encoding) {
  // Handle string cases:
  if (typeof val === 'string') {
    if (typeof start === 'string') {
      encoding = start
      start = 0
      end = this.length
    } else if (typeof end === 'string') {
      encoding = end
      end = this.length
    }
    if (val.length === 1) {
      var code = val.charCodeAt(0)
      if (code < 256) {
        val = code
      }
    }
    if (encoding !== undefined && typeof encoding !== 'string') {
      throw new TypeError('encoding must be a string')
    }
    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
      throw new TypeError('Unknown encoding: ' + encoding)
    }
  } else if (typeof val === 'number') {
    val = val & 255
  }

  // Invalid ranges are not set to a default, so can range check early.
  if (start < 0 || this.length < start || this.length < end) {
    throw new RangeError('Out of range index')
  }

  if (end <= start) {
    return this
  }

  start = start >>> 0
  end = end === undefined ? this.length : end >>> 0

  if (!val) val = 0

  var i
  if (typeof val === 'number') {
    for (i = start; i < end; ++i) {
      this[i] = val
    }
  } else {
    var bytes = Buffer.isBuffer(val)
      ? val
      : utf8ToBytes(new Buffer(val, encoding).toString())
    var len = bytes.length
    for (i = 0; i < end - start; ++i) {
      this[i + start] = bytes[i % len]
    }
  }

  return this
}

// HELPER FUNCTIONS
// ================

var INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g

function base64clean (str) {
  // Node strips out invalid characters like \n and \t from the string, base64-js does not
  str = stringtrim(str).replace(INVALID_BASE64_RE, '')
  // Node converts strings with length < 2 to ''
  if (str.length < 2) return ''
  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
  while (str.length % 4 !== 0) {
    str = str + '='
  }
  return str
}

function stringtrim (str) {
  if (str.trim) return str.trim()
  return str.replace(/^\s+|\s+$/g, '')
}

function toHex (n) {
  if (n < 16) return '0' + n.toString(16)
  return n.toString(16)
}

function utf8ToBytes (string, units) {
  units = units || Infinity
  var codePoint
  var length = string.length
  var leadSurrogate = null
  var bytes = []

  for (var i = 0; i < length; ++i) {
    codePoint = string.charCodeAt(i)

    // is surrogate component
    if (codePoint > 0xD7FF && codePoint < 0xE000) {
      // last char was a lead
      if (!leadSurrogate) {
        // no lead yet
        if (codePoint > 0xDBFF) {
          // unexpected trail
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        } else if (i + 1 === length) {
          // unpaired lead
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        }

        // valid lead
        leadSurrogate = codePoint

        continue
      }

      // 2 leads in a row
      if (codePoint < 0xDC00) {
        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
        leadSurrogate = codePoint
        continue
      }

      // valid surrogate pair
      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000
    } else if (leadSurrogate) {
      // valid bmp char, but last char was a lead
      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
    }

    leadSurrogate = null

    // encode utf8
    if (codePoint < 0x80) {
      if ((units -= 1) < 0) break
      bytes.push(codePoint)
    } else if (codePoint < 0x800) {
      if ((units -= 2) < 0) break
      bytes.push(
        codePoint >> 0x6 | 0xC0,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x10000) {
      if ((units -= 3) < 0) break
      bytes.push(
        codePoint >> 0xC | 0xE0,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x110000) {
      if ((units -= 4) < 0) break
      bytes.push(
        codePoint >> 0x12 | 0xF0,
        codePoint >> 0xC & 0x3F | 0x80,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else {
      throw new Error('Invalid code point')
    }
  }

  return bytes
}

function asciiToBytes (str) {
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    // Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF)
  }
  return byteArray
}

function utf16leToBytes (str, units) {
  var c, hi, lo
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    if ((units -= 2) < 0) break

    c = str.charCodeAt(i)
    hi = c >> 8
    lo = c % 256
    byteArray.push(lo)
    byteArray.push(hi)
  }

  return byteArray
}

function base64ToBytes (str) {
  return base64.toByteArray(base64clean(str))
}

function blitBuffer (src, dst, offset, length) {
  for (var i = 0; i < length; ++i) {
    if ((i + offset >= dst.length) || (i >= src.length)) break
    dst[i + offset] = src[i]
  }
  return i
}

function isnan (val) {
  return val !== val // eslint-disable-line no-self-compare
}

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/buffer/node_modules/isarray/index.js":
/*!***********************************************************!*\
  !*** ./node_modules/buffer/node_modules/isarray/index.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};


/***/ }),

/***/ "./node_modules/html-entities/index.js":
/*!*********************************************!*\
  !*** ./node_modules/html-entities/index.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = {
  XmlEntities: __webpack_require__(/*! ./lib/xml-entities.js */ "./node_modules/html-entities/lib/xml-entities.js"),
  Html4Entities: __webpack_require__(/*! ./lib/html4-entities.js */ "./node_modules/html-entities/lib/html4-entities.js"),
  Html5Entities: __webpack_require__(/*! ./lib/html5-entities.js */ "./node_modules/html-entities/lib/html5-entities.js"),
  AllHtmlEntities: __webpack_require__(/*! ./lib/html5-entities.js */ "./node_modules/html-entities/lib/html5-entities.js")
};


/***/ }),

/***/ "./node_modules/html-entities/lib/html4-entities.js":
/*!**********************************************************!*\
  !*** ./node_modules/html-entities/lib/html4-entities.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var HTML_ALPHA = ['apos', 'nbsp', 'iexcl', 'cent', 'pound', 'curren', 'yen', 'brvbar', 'sect', 'uml', 'copy', 'ordf', 'laquo', 'not', 'shy', 'reg', 'macr', 'deg', 'plusmn', 'sup2', 'sup3', 'acute', 'micro', 'para', 'middot', 'cedil', 'sup1', 'ordm', 'raquo', 'frac14', 'frac12', 'frac34', 'iquest', 'Agrave', 'Aacute', 'Acirc', 'Atilde', 'Auml', 'Aring', 'Aelig', 'Ccedil', 'Egrave', 'Eacute', 'Ecirc', 'Euml', 'Igrave', 'Iacute', 'Icirc', 'Iuml', 'ETH', 'Ntilde', 'Ograve', 'Oacute', 'Ocirc', 'Otilde', 'Ouml', 'times', 'Oslash', 'Ugrave', 'Uacute', 'Ucirc', 'Uuml', 'Yacute', 'THORN', 'szlig', 'agrave', 'aacute', 'acirc', 'atilde', 'auml', 'aring', 'aelig', 'ccedil', 'egrave', 'eacute', 'ecirc', 'euml', 'igrave', 'iacute', 'icirc', 'iuml', 'eth', 'ntilde', 'ograve', 'oacute', 'ocirc', 'otilde', 'ouml', 'divide', 'oslash', 'ugrave', 'uacute', 'ucirc', 'uuml', 'yacute', 'thorn', 'yuml', 'quot', 'amp', 'lt', 'gt', 'OElig', 'oelig', 'Scaron', 'scaron', 'Yuml', 'circ', 'tilde', 'ensp', 'emsp', 'thinsp', 'zwnj', 'zwj', 'lrm', 'rlm', 'ndash', 'mdash', 'lsquo', 'rsquo', 'sbquo', 'ldquo', 'rdquo', 'bdquo', 'dagger', 'Dagger', 'permil', 'lsaquo', 'rsaquo', 'euro', 'fnof', 'Alpha', 'Beta', 'Gamma', 'Delta', 'Epsilon', 'Zeta', 'Eta', 'Theta', 'Iota', 'Kappa', 'Lambda', 'Mu', 'Nu', 'Xi', 'Omicron', 'Pi', 'Rho', 'Sigma', 'Tau', 'Upsilon', 'Phi', 'Chi', 'Psi', 'Omega', 'alpha', 'beta', 'gamma', 'delta', 'epsilon', 'zeta', 'eta', 'theta', 'iota', 'kappa', 'lambda', 'mu', 'nu', 'xi', 'omicron', 'pi', 'rho', 'sigmaf', 'sigma', 'tau', 'upsilon', 'phi', 'chi', 'psi', 'omega', 'thetasym', 'upsih', 'piv', 'bull', 'hellip', 'prime', 'Prime', 'oline', 'frasl', 'weierp', 'image', 'real', 'trade', 'alefsym', 'larr', 'uarr', 'rarr', 'darr', 'harr', 'crarr', 'lArr', 'uArr', 'rArr', 'dArr', 'hArr', 'forall', 'part', 'exist', 'empty', 'nabla', 'isin', 'notin', 'ni', 'prod', 'sum', 'minus', 'lowast', 'radic', 'prop', 'infin', 'ang', 'and', 'or', 'cap', 'cup', 'int', 'there4', 'sim', 'cong', 'asymp', 'ne', 'equiv', 'le', 'ge', 'sub', 'sup', 'nsub', 'sube', 'supe', 'oplus', 'otimes', 'perp', 'sdot', 'lceil', 'rceil', 'lfloor', 'rfloor', 'lang', 'rang', 'loz', 'spades', 'clubs', 'hearts', 'diams'];
var HTML_CODES = [39, 160, 161, 162, 163, 164, 165, 166, 167, 168, 169, 170, 171, 172, 173, 174, 175, 176, 177, 178, 179, 180, 181, 182, 183, 184, 185, 186, 187, 188, 189, 190, 191, 192, 193, 194, 195, 196, 197, 198, 199, 200, 201, 202, 203, 204, 205, 206, 207, 208, 209, 210, 211, 212, 213, 214, 215, 216, 217, 218, 219, 220, 221, 222, 223, 224, 225, 226, 227, 228, 229, 230, 231, 232, 233, 234, 235, 236, 237, 238, 239, 240, 241, 242, 243, 244, 245, 246, 247, 248, 249, 250, 251, 252, 253, 254, 255, 34, 38, 60, 62, 338, 339, 352, 353, 376, 710, 732, 8194, 8195, 8201, 8204, 8205, 8206, 8207, 8211, 8212, 8216, 8217, 8218, 8220, 8221, 8222, 8224, 8225, 8240, 8249, 8250, 8364, 402, 913, 914, 915, 916, 917, 918, 919, 920, 921, 922, 923, 924, 925, 926, 927, 928, 929, 931, 932, 933, 934, 935, 936, 937, 945, 946, 947, 948, 949, 950, 951, 952, 953, 954, 955, 956, 957, 958, 959, 960, 961, 962, 963, 964, 965, 966, 967, 968, 969, 977, 978, 982, 8226, 8230, 8242, 8243, 8254, 8260, 8472, 8465, 8476, 8482, 8501, 8592, 8593, 8594, 8595, 8596, 8629, 8656, 8657, 8658, 8659, 8660, 8704, 8706, 8707, 8709, 8711, 8712, 8713, 8715, 8719, 8721, 8722, 8727, 8730, 8733, 8734, 8736, 8743, 8744, 8745, 8746, 8747, 8756, 8764, 8773, 8776, 8800, 8801, 8804, 8805, 8834, 8835, 8836, 8838, 8839, 8853, 8855, 8869, 8901, 8968, 8969, 8970, 8971, 9001, 9002, 9674, 9824, 9827, 9829, 9830];

var alphaIndex = {};
var numIndex = {};

var i = 0;
var length = HTML_ALPHA.length;
while (i < length) {
    var a = HTML_ALPHA[i];
    var c = HTML_CODES[i];
    alphaIndex[a] = String.fromCharCode(c);
    numIndex[c] = a;
    i++;
}

/**
 * @constructor
 */
function Html4Entities() {}

/**
 * @param {String} str
 * @returns {String}
 */
Html4Entities.prototype.decode = function(str) {
    if (!str || !str.length) {
        return '';
    }
    return str.replace(/&(#?[\w\d]+);?/g, function(s, entity) {
        var chr;
        if (entity.charAt(0) === "#") {
            var code = entity.charAt(1).toLowerCase() === 'x' ?
                parseInt(entity.substr(2), 16) :
                parseInt(entity.substr(1));

            if (!(isNaN(code) || code < -32768 || code > 65535)) {
                chr = String.fromCharCode(code);
            }
        } else {
            chr = alphaIndex[entity];
        }
        return chr || s;
    });
};

/**
 * @param {String} str
 * @returns {String}
 */
Html4Entities.decode = function(str) {
    return new Html4Entities().decode(str);
};

/**
 * @param {String} str
 * @returns {String}
 */
Html4Entities.prototype.encode = function(str) {
    if (!str || !str.length) {
        return '';
    }
    var strLength = str.length;
    var result = '';
    var i = 0;
    while (i < strLength) {
        var alpha = numIndex[str.charCodeAt(i)];
        result += alpha ? "&" + alpha + ";" : str.charAt(i);
        i++;
    }
    return result;
};

/**
 * @param {String} str
 * @returns {String}
 */
Html4Entities.encode = function(str) {
    return new Html4Entities().encode(str);
};

/**
 * @param {String} str
 * @returns {String}
 */
Html4Entities.prototype.encodeNonUTF = function(str) {
    if (!str || !str.length) {
        return '';
    }
    var strLength = str.length;
    var result = '';
    var i = 0;
    while (i < strLength) {
        var cc = str.charCodeAt(i);
        var alpha = numIndex[cc];
        if (alpha) {
            result += "&" + alpha + ";";
        } else if (cc < 32 || cc > 126) {
            result += "&#" + cc + ";";
        } else {
            result += str.charAt(i);
        }
        i++;
    }
    return result;
};

/**
 * @param {String} str
 * @returns {String}
 */
Html4Entities.encodeNonUTF = function(str) {
    return new Html4Entities().encodeNonUTF(str);
};

/**
 * @param {String} str
 * @returns {String}
 */
Html4Entities.prototype.encodeNonASCII = function(str) {
    if (!str || !str.length) {
        return '';
    }
    var strLength = str.length;
    var result = '';
    var i = 0;
    while (i < strLength) {
        var c = str.charCodeAt(i);
        if (c <= 255) {
            result += str[i++];
            continue;
        }
        result += '&#' + c + ';';
        i++;
    }
    return result;
};

/**
 * @param {String} str
 * @returns {String}
 */
Html4Entities.encodeNonASCII = function(str) {
    return new Html4Entities().encodeNonASCII(str);
};

module.exports = Html4Entities;


/***/ }),

/***/ "./node_modules/html-entities/lib/html5-entities.js":
/*!**********************************************************!*\
  !*** ./node_modules/html-entities/lib/html5-entities.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var ENTITIES = [['Aacute', [193]], ['aacute', [225]], ['Abreve', [258]], ['abreve', [259]], ['ac', [8766]], ['acd', [8767]], ['acE', [8766, 819]], ['Acirc', [194]], ['acirc', [226]], ['acute', [180]], ['Acy', [1040]], ['acy', [1072]], ['AElig', [198]], ['aelig', [230]], ['af', [8289]], ['Afr', [120068]], ['afr', [120094]], ['Agrave', [192]], ['agrave', [224]], ['alefsym', [8501]], ['aleph', [8501]], ['Alpha', [913]], ['alpha', [945]], ['Amacr', [256]], ['amacr', [257]], ['amalg', [10815]], ['amp', [38]], ['AMP', [38]], ['andand', [10837]], ['And', [10835]], ['and', [8743]], ['andd', [10844]], ['andslope', [10840]], ['andv', [10842]], ['ang', [8736]], ['ange', [10660]], ['angle', [8736]], ['angmsdaa', [10664]], ['angmsdab', [10665]], ['angmsdac', [10666]], ['angmsdad', [10667]], ['angmsdae', [10668]], ['angmsdaf', [10669]], ['angmsdag', [10670]], ['angmsdah', [10671]], ['angmsd', [8737]], ['angrt', [8735]], ['angrtvb', [8894]], ['angrtvbd', [10653]], ['angsph', [8738]], ['angst', [197]], ['angzarr', [9084]], ['Aogon', [260]], ['aogon', [261]], ['Aopf', [120120]], ['aopf', [120146]], ['apacir', [10863]], ['ap', [8776]], ['apE', [10864]], ['ape', [8778]], ['apid', [8779]], ['apos', [39]], ['ApplyFunction', [8289]], ['approx', [8776]], ['approxeq', [8778]], ['Aring', [197]], ['aring', [229]], ['Ascr', [119964]], ['ascr', [119990]], ['Assign', [8788]], ['ast', [42]], ['asymp', [8776]], ['asympeq', [8781]], ['Atilde', [195]], ['atilde', [227]], ['Auml', [196]], ['auml', [228]], ['awconint', [8755]], ['awint', [10769]], ['backcong', [8780]], ['backepsilon', [1014]], ['backprime', [8245]], ['backsim', [8765]], ['backsimeq', [8909]], ['Backslash', [8726]], ['Barv', [10983]], ['barvee', [8893]], ['barwed', [8965]], ['Barwed', [8966]], ['barwedge', [8965]], ['bbrk', [9141]], ['bbrktbrk', [9142]], ['bcong', [8780]], ['Bcy', [1041]], ['bcy', [1073]], ['bdquo', [8222]], ['becaus', [8757]], ['because', [8757]], ['Because', [8757]], ['bemptyv', [10672]], ['bepsi', [1014]], ['bernou', [8492]], ['Bernoullis', [8492]], ['Beta', [914]], ['beta', [946]], ['beth', [8502]], ['between', [8812]], ['Bfr', [120069]], ['bfr', [120095]], ['bigcap', [8898]], ['bigcirc', [9711]], ['bigcup', [8899]], ['bigodot', [10752]], ['bigoplus', [10753]], ['bigotimes', [10754]], ['bigsqcup', [10758]], ['bigstar', [9733]], ['bigtriangledown', [9661]], ['bigtriangleup', [9651]], ['biguplus', [10756]], ['bigvee', [8897]], ['bigwedge', [8896]], ['bkarow', [10509]], ['blacklozenge', [10731]], ['blacksquare', [9642]], ['blacktriangle', [9652]], ['blacktriangledown', [9662]], ['blacktriangleleft', [9666]], ['blacktriangleright', [9656]], ['blank', [9251]], ['blk12', [9618]], ['blk14', [9617]], ['blk34', [9619]], ['block', [9608]], ['bne', [61, 8421]], ['bnequiv', [8801, 8421]], ['bNot', [10989]], ['bnot', [8976]], ['Bopf', [120121]], ['bopf', [120147]], ['bot', [8869]], ['bottom', [8869]], ['bowtie', [8904]], ['boxbox', [10697]], ['boxdl', [9488]], ['boxdL', [9557]], ['boxDl', [9558]], ['boxDL', [9559]], ['boxdr', [9484]], ['boxdR', [9554]], ['boxDr', [9555]], ['boxDR', [9556]], ['boxh', [9472]], ['boxH', [9552]], ['boxhd', [9516]], ['boxHd', [9572]], ['boxhD', [9573]], ['boxHD', [9574]], ['boxhu', [9524]], ['boxHu', [9575]], ['boxhU', [9576]], ['boxHU', [9577]], ['boxminus', [8863]], ['boxplus', [8862]], ['boxtimes', [8864]], ['boxul', [9496]], ['boxuL', [9563]], ['boxUl', [9564]], ['boxUL', [9565]], ['boxur', [9492]], ['boxuR', [9560]], ['boxUr', [9561]], ['boxUR', [9562]], ['boxv', [9474]], ['boxV', [9553]], ['boxvh', [9532]], ['boxvH', [9578]], ['boxVh', [9579]], ['boxVH', [9580]], ['boxvl', [9508]], ['boxvL', [9569]], ['boxVl', [9570]], ['boxVL', [9571]], ['boxvr', [9500]], ['boxvR', [9566]], ['boxVr', [9567]], ['boxVR', [9568]], ['bprime', [8245]], ['breve', [728]], ['Breve', [728]], ['brvbar', [166]], ['bscr', [119991]], ['Bscr', [8492]], ['bsemi', [8271]], ['bsim', [8765]], ['bsime', [8909]], ['bsolb', [10693]], ['bsol', [92]], ['bsolhsub', [10184]], ['bull', [8226]], ['bullet', [8226]], ['bump', [8782]], ['bumpE', [10926]], ['bumpe', [8783]], ['Bumpeq', [8782]], ['bumpeq', [8783]], ['Cacute', [262]], ['cacute', [263]], ['capand', [10820]], ['capbrcup', [10825]], ['capcap', [10827]], ['cap', [8745]], ['Cap', [8914]], ['capcup', [10823]], ['capdot', [10816]], ['CapitalDifferentialD', [8517]], ['caps', [8745, 65024]], ['caret', [8257]], ['caron', [711]], ['Cayleys', [8493]], ['ccaps', [10829]], ['Ccaron', [268]], ['ccaron', [269]], ['Ccedil', [199]], ['ccedil', [231]], ['Ccirc', [264]], ['ccirc', [265]], ['Cconint', [8752]], ['ccups', [10828]], ['ccupssm', [10832]], ['Cdot', [266]], ['cdot', [267]], ['cedil', [184]], ['Cedilla', [184]], ['cemptyv', [10674]], ['cent', [162]], ['centerdot', [183]], ['CenterDot', [183]], ['cfr', [120096]], ['Cfr', [8493]], ['CHcy', [1063]], ['chcy', [1095]], ['check', [10003]], ['checkmark', [10003]], ['Chi', [935]], ['chi', [967]], ['circ', [710]], ['circeq', [8791]], ['circlearrowleft', [8634]], ['circlearrowright', [8635]], ['circledast', [8859]], ['circledcirc', [8858]], ['circleddash', [8861]], ['CircleDot', [8857]], ['circledR', [174]], ['circledS', [9416]], ['CircleMinus', [8854]], ['CirclePlus', [8853]], ['CircleTimes', [8855]], ['cir', [9675]], ['cirE', [10691]], ['cire', [8791]], ['cirfnint', [10768]], ['cirmid', [10991]], ['cirscir', [10690]], ['ClockwiseContourIntegral', [8754]], ['clubs', [9827]], ['clubsuit', [9827]], ['colon', [58]], ['Colon', [8759]], ['Colone', [10868]], ['colone', [8788]], ['coloneq', [8788]], ['comma', [44]], ['commat', [64]], ['comp', [8705]], ['compfn', [8728]], ['complement', [8705]], ['complexes', [8450]], ['cong', [8773]], ['congdot', [10861]], ['Congruent', [8801]], ['conint', [8750]], ['Conint', [8751]], ['ContourIntegral', [8750]], ['copf', [120148]], ['Copf', [8450]], ['coprod', [8720]], ['Coproduct', [8720]], ['copy', [169]], ['COPY', [169]], ['copysr', [8471]], ['CounterClockwiseContourIntegral', [8755]], ['crarr', [8629]], ['cross', [10007]], ['Cross', [10799]], ['Cscr', [119966]], ['cscr', [119992]], ['csub', [10959]], ['csube', [10961]], ['csup', [10960]], ['csupe', [10962]], ['ctdot', [8943]], ['cudarrl', [10552]], ['cudarrr', [10549]], ['cuepr', [8926]], ['cuesc', [8927]], ['cularr', [8630]], ['cularrp', [10557]], ['cupbrcap', [10824]], ['cupcap', [10822]], ['CupCap', [8781]], ['cup', [8746]], ['Cup', [8915]], ['cupcup', [10826]], ['cupdot', [8845]], ['cupor', [10821]], ['cups', [8746, 65024]], ['curarr', [8631]], ['curarrm', [10556]], ['curlyeqprec', [8926]], ['curlyeqsucc', [8927]], ['curlyvee', [8910]], ['curlywedge', [8911]], ['curren', [164]], ['curvearrowleft', [8630]], ['curvearrowright', [8631]], ['cuvee', [8910]], ['cuwed', [8911]], ['cwconint', [8754]], ['cwint', [8753]], ['cylcty', [9005]], ['dagger', [8224]], ['Dagger', [8225]], ['daleth', [8504]], ['darr', [8595]], ['Darr', [8609]], ['dArr', [8659]], ['dash', [8208]], ['Dashv', [10980]], ['dashv', [8867]], ['dbkarow', [10511]], ['dblac', [733]], ['Dcaron', [270]], ['dcaron', [271]], ['Dcy', [1044]], ['dcy', [1076]], ['ddagger', [8225]], ['ddarr', [8650]], ['DD', [8517]], ['dd', [8518]], ['DDotrahd', [10513]], ['ddotseq', [10871]], ['deg', [176]], ['Del', [8711]], ['Delta', [916]], ['delta', [948]], ['demptyv', [10673]], ['dfisht', [10623]], ['Dfr', [120071]], ['dfr', [120097]], ['dHar', [10597]], ['dharl', [8643]], ['dharr', [8642]], ['DiacriticalAcute', [180]], ['DiacriticalDot', [729]], ['DiacriticalDoubleAcute', [733]], ['DiacriticalGrave', [96]], ['DiacriticalTilde', [732]], ['diam', [8900]], ['diamond', [8900]], ['Diamond', [8900]], ['diamondsuit', [9830]], ['diams', [9830]], ['die', [168]], ['DifferentialD', [8518]], ['digamma', [989]], ['disin', [8946]], ['div', [247]], ['divide', [247]], ['divideontimes', [8903]], ['divonx', [8903]], ['DJcy', [1026]], ['djcy', [1106]], ['dlcorn', [8990]], ['dlcrop', [8973]], ['dollar', [36]], ['Dopf', [120123]], ['dopf', [120149]], ['Dot', [168]], ['dot', [729]], ['DotDot', [8412]], ['doteq', [8784]], ['doteqdot', [8785]], ['DotEqual', [8784]], ['dotminus', [8760]], ['dotplus', [8724]], ['dotsquare', [8865]], ['doublebarwedge', [8966]], ['DoubleContourIntegral', [8751]], ['DoubleDot', [168]], ['DoubleDownArrow', [8659]], ['DoubleLeftArrow', [8656]], ['DoubleLeftRightArrow', [8660]], ['DoubleLeftTee', [10980]], ['DoubleLongLeftArrow', [10232]], ['DoubleLongLeftRightArrow', [10234]], ['DoubleLongRightArrow', [10233]], ['DoubleRightArrow', [8658]], ['DoubleRightTee', [8872]], ['DoubleUpArrow', [8657]], ['DoubleUpDownArrow', [8661]], ['DoubleVerticalBar', [8741]], ['DownArrowBar', [10515]], ['downarrow', [8595]], ['DownArrow', [8595]], ['Downarrow', [8659]], ['DownArrowUpArrow', [8693]], ['DownBreve', [785]], ['downdownarrows', [8650]], ['downharpoonleft', [8643]], ['downharpoonright', [8642]], ['DownLeftRightVector', [10576]], ['DownLeftTeeVector', [10590]], ['DownLeftVectorBar', [10582]], ['DownLeftVector', [8637]], ['DownRightTeeVector', [10591]], ['DownRightVectorBar', [10583]], ['DownRightVector', [8641]], ['DownTeeArrow', [8615]], ['DownTee', [8868]], ['drbkarow', [10512]], ['drcorn', [8991]], ['drcrop', [8972]], ['Dscr', [119967]], ['dscr', [119993]], ['DScy', [1029]], ['dscy', [1109]], ['dsol', [10742]], ['Dstrok', [272]], ['dstrok', [273]], ['dtdot', [8945]], ['dtri', [9663]], ['dtrif', [9662]], ['duarr', [8693]], ['duhar', [10607]], ['dwangle', [10662]], ['DZcy', [1039]], ['dzcy', [1119]], ['dzigrarr', [10239]], ['Eacute', [201]], ['eacute', [233]], ['easter', [10862]], ['Ecaron', [282]], ['ecaron', [283]], ['Ecirc', [202]], ['ecirc', [234]], ['ecir', [8790]], ['ecolon', [8789]], ['Ecy', [1069]], ['ecy', [1101]], ['eDDot', [10871]], ['Edot', [278]], ['edot', [279]], ['eDot', [8785]], ['ee', [8519]], ['efDot', [8786]], ['Efr', [120072]], ['efr', [120098]], ['eg', [10906]], ['Egrave', [200]], ['egrave', [232]], ['egs', [10902]], ['egsdot', [10904]], ['el', [10905]], ['Element', [8712]], ['elinters', [9191]], ['ell', [8467]], ['els', [10901]], ['elsdot', [10903]], ['Emacr', [274]], ['emacr', [275]], ['empty', [8709]], ['emptyset', [8709]], ['EmptySmallSquare', [9723]], ['emptyv', [8709]], ['EmptyVerySmallSquare', [9643]], ['emsp13', [8196]], ['emsp14', [8197]], ['emsp', [8195]], ['ENG', [330]], ['eng', [331]], ['ensp', [8194]], ['Eogon', [280]], ['eogon', [281]], ['Eopf', [120124]], ['eopf', [120150]], ['epar', [8917]], ['eparsl', [10723]], ['eplus', [10865]], ['epsi', [949]], ['Epsilon', [917]], ['epsilon', [949]], ['epsiv', [1013]], ['eqcirc', [8790]], ['eqcolon', [8789]], ['eqsim', [8770]], ['eqslantgtr', [10902]], ['eqslantless', [10901]], ['Equal', [10869]], ['equals', [61]], ['EqualTilde', [8770]], ['equest', [8799]], ['Equilibrium', [8652]], ['equiv', [8801]], ['equivDD', [10872]], ['eqvparsl', [10725]], ['erarr', [10609]], ['erDot', [8787]], ['escr', [8495]], ['Escr', [8496]], ['esdot', [8784]], ['Esim', [10867]], ['esim', [8770]], ['Eta', [919]], ['eta', [951]], ['ETH', [208]], ['eth', [240]], ['Euml', [203]], ['euml', [235]], ['euro', [8364]], ['excl', [33]], ['exist', [8707]], ['Exists', [8707]], ['expectation', [8496]], ['exponentiale', [8519]], ['ExponentialE', [8519]], ['fallingdotseq', [8786]], ['Fcy', [1060]], ['fcy', [1092]], ['female', [9792]], ['ffilig', [64259]], ['fflig', [64256]], ['ffllig', [64260]], ['Ffr', [120073]], ['ffr', [120099]], ['filig', [64257]], ['FilledSmallSquare', [9724]], ['FilledVerySmallSquare', [9642]], ['fjlig', [102, 106]], ['flat', [9837]], ['fllig', [64258]], ['fltns', [9649]], ['fnof', [402]], ['Fopf', [120125]], ['fopf', [120151]], ['forall', [8704]], ['ForAll', [8704]], ['fork', [8916]], ['forkv', [10969]], ['Fouriertrf', [8497]], ['fpartint', [10765]], ['frac12', [189]], ['frac13', [8531]], ['frac14', [188]], ['frac15', [8533]], ['frac16', [8537]], ['frac18', [8539]], ['frac23', [8532]], ['frac25', [8534]], ['frac34', [190]], ['frac35', [8535]], ['frac38', [8540]], ['frac45', [8536]], ['frac56', [8538]], ['frac58', [8541]], ['frac78', [8542]], ['frasl', [8260]], ['frown', [8994]], ['fscr', [119995]], ['Fscr', [8497]], ['gacute', [501]], ['Gamma', [915]], ['gamma', [947]], ['Gammad', [988]], ['gammad', [989]], ['gap', [10886]], ['Gbreve', [286]], ['gbreve', [287]], ['Gcedil', [290]], ['Gcirc', [284]], ['gcirc', [285]], ['Gcy', [1043]], ['gcy', [1075]], ['Gdot', [288]], ['gdot', [289]], ['ge', [8805]], ['gE', [8807]], ['gEl', [10892]], ['gel', [8923]], ['geq', [8805]], ['geqq', [8807]], ['geqslant', [10878]], ['gescc', [10921]], ['ges', [10878]], ['gesdot', [10880]], ['gesdoto', [10882]], ['gesdotol', [10884]], ['gesl', [8923, 65024]], ['gesles', [10900]], ['Gfr', [120074]], ['gfr', [120100]], ['gg', [8811]], ['Gg', [8921]], ['ggg', [8921]], ['gimel', [8503]], ['GJcy', [1027]], ['gjcy', [1107]], ['gla', [10917]], ['gl', [8823]], ['glE', [10898]], ['glj', [10916]], ['gnap', [10890]], ['gnapprox', [10890]], ['gne', [10888]], ['gnE', [8809]], ['gneq', [10888]], ['gneqq', [8809]], ['gnsim', [8935]], ['Gopf', [120126]], ['gopf', [120152]], ['grave', [96]], ['GreaterEqual', [8805]], ['GreaterEqualLess', [8923]], ['GreaterFullEqual', [8807]], ['GreaterGreater', [10914]], ['GreaterLess', [8823]], ['GreaterSlantEqual', [10878]], ['GreaterTilde', [8819]], ['Gscr', [119970]], ['gscr', [8458]], ['gsim', [8819]], ['gsime', [10894]], ['gsiml', [10896]], ['gtcc', [10919]], ['gtcir', [10874]], ['gt', [62]], ['GT', [62]], ['Gt', [8811]], ['gtdot', [8919]], ['gtlPar', [10645]], ['gtquest', [10876]], ['gtrapprox', [10886]], ['gtrarr', [10616]], ['gtrdot', [8919]], ['gtreqless', [8923]], ['gtreqqless', [10892]], ['gtrless', [8823]], ['gtrsim', [8819]], ['gvertneqq', [8809, 65024]], ['gvnE', [8809, 65024]], ['Hacek', [711]], ['hairsp', [8202]], ['half', [189]], ['hamilt', [8459]], ['HARDcy', [1066]], ['hardcy', [1098]], ['harrcir', [10568]], ['harr', [8596]], ['hArr', [8660]], ['harrw', [8621]], ['Hat', [94]], ['hbar', [8463]], ['Hcirc', [292]], ['hcirc', [293]], ['hearts', [9829]], ['heartsuit', [9829]], ['hellip', [8230]], ['hercon', [8889]], ['hfr', [120101]], ['Hfr', [8460]], ['HilbertSpace', [8459]], ['hksearow', [10533]], ['hkswarow', [10534]], ['hoarr', [8703]], ['homtht', [8763]], ['hookleftarrow', [8617]], ['hookrightarrow', [8618]], ['hopf', [120153]], ['Hopf', [8461]], ['horbar', [8213]], ['HorizontalLine', [9472]], ['hscr', [119997]], ['Hscr', [8459]], ['hslash', [8463]], ['Hstrok', [294]], ['hstrok', [295]], ['HumpDownHump', [8782]], ['HumpEqual', [8783]], ['hybull', [8259]], ['hyphen', [8208]], ['Iacute', [205]], ['iacute', [237]], ['ic', [8291]], ['Icirc', [206]], ['icirc', [238]], ['Icy', [1048]], ['icy', [1080]], ['Idot', [304]], ['IEcy', [1045]], ['iecy', [1077]], ['iexcl', [161]], ['iff', [8660]], ['ifr', [120102]], ['Ifr', [8465]], ['Igrave', [204]], ['igrave', [236]], ['ii', [8520]], ['iiiint', [10764]], ['iiint', [8749]], ['iinfin', [10716]], ['iiota', [8489]], ['IJlig', [306]], ['ijlig', [307]], ['Imacr', [298]], ['imacr', [299]], ['image', [8465]], ['ImaginaryI', [8520]], ['imagline', [8464]], ['imagpart', [8465]], ['imath', [305]], ['Im', [8465]], ['imof', [8887]], ['imped', [437]], ['Implies', [8658]], ['incare', [8453]], ['in', [8712]], ['infin', [8734]], ['infintie', [10717]], ['inodot', [305]], ['intcal', [8890]], ['int', [8747]], ['Int', [8748]], ['integers', [8484]], ['Integral', [8747]], ['intercal', [8890]], ['Intersection', [8898]], ['intlarhk', [10775]], ['intprod', [10812]], ['InvisibleComma', [8291]], ['InvisibleTimes', [8290]], ['IOcy', [1025]], ['iocy', [1105]], ['Iogon', [302]], ['iogon', [303]], ['Iopf', [120128]], ['iopf', [120154]], ['Iota', [921]], ['iota', [953]], ['iprod', [10812]], ['iquest', [191]], ['iscr', [119998]], ['Iscr', [8464]], ['isin', [8712]], ['isindot', [8949]], ['isinE', [8953]], ['isins', [8948]], ['isinsv', [8947]], ['isinv', [8712]], ['it', [8290]], ['Itilde', [296]], ['itilde', [297]], ['Iukcy', [1030]], ['iukcy', [1110]], ['Iuml', [207]], ['iuml', [239]], ['Jcirc', [308]], ['jcirc', [309]], ['Jcy', [1049]], ['jcy', [1081]], ['Jfr', [120077]], ['jfr', [120103]], ['jmath', [567]], ['Jopf', [120129]], ['jopf', [120155]], ['Jscr', [119973]], ['jscr', [119999]], ['Jsercy', [1032]], ['jsercy', [1112]], ['Jukcy', [1028]], ['jukcy', [1108]], ['Kappa', [922]], ['kappa', [954]], ['kappav', [1008]], ['Kcedil', [310]], ['kcedil', [311]], ['Kcy', [1050]], ['kcy', [1082]], ['Kfr', [120078]], ['kfr', [120104]], ['kgreen', [312]], ['KHcy', [1061]], ['khcy', [1093]], ['KJcy', [1036]], ['kjcy', [1116]], ['Kopf', [120130]], ['kopf', [120156]], ['Kscr', [119974]], ['kscr', [120000]], ['lAarr', [8666]], ['Lacute', [313]], ['lacute', [314]], ['laemptyv', [10676]], ['lagran', [8466]], ['Lambda', [923]], ['lambda', [955]], ['lang', [10216]], ['Lang', [10218]], ['langd', [10641]], ['langle', [10216]], ['lap', [10885]], ['Laplacetrf', [8466]], ['laquo', [171]], ['larrb', [8676]], ['larrbfs', [10527]], ['larr', [8592]], ['Larr', [8606]], ['lArr', [8656]], ['larrfs', [10525]], ['larrhk', [8617]], ['larrlp', [8619]], ['larrpl', [10553]], ['larrsim', [10611]], ['larrtl', [8610]], ['latail', [10521]], ['lAtail', [10523]], ['lat', [10923]], ['late', [10925]], ['lates', [10925, 65024]], ['lbarr', [10508]], ['lBarr', [10510]], ['lbbrk', [10098]], ['lbrace', [123]], ['lbrack', [91]], ['lbrke', [10635]], ['lbrksld', [10639]], ['lbrkslu', [10637]], ['Lcaron', [317]], ['lcaron', [318]], ['Lcedil', [315]], ['lcedil', [316]], ['lceil', [8968]], ['lcub', [123]], ['Lcy', [1051]], ['lcy', [1083]], ['ldca', [10550]], ['ldquo', [8220]], ['ldquor', [8222]], ['ldrdhar', [10599]], ['ldrushar', [10571]], ['ldsh', [8626]], ['le', [8804]], ['lE', [8806]], ['LeftAngleBracket', [10216]], ['LeftArrowBar', [8676]], ['leftarrow', [8592]], ['LeftArrow', [8592]], ['Leftarrow', [8656]], ['LeftArrowRightArrow', [8646]], ['leftarrowtail', [8610]], ['LeftCeiling', [8968]], ['LeftDoubleBracket', [10214]], ['LeftDownTeeVector', [10593]], ['LeftDownVectorBar', [10585]], ['LeftDownVector', [8643]], ['LeftFloor', [8970]], ['leftharpoondown', [8637]], ['leftharpoonup', [8636]], ['leftleftarrows', [8647]], ['leftrightarrow', [8596]], ['LeftRightArrow', [8596]], ['Leftrightarrow', [8660]], ['leftrightarrows', [8646]], ['leftrightharpoons', [8651]], ['leftrightsquigarrow', [8621]], ['LeftRightVector', [10574]], ['LeftTeeArrow', [8612]], ['LeftTee', [8867]], ['LeftTeeVector', [10586]], ['leftthreetimes', [8907]], ['LeftTriangleBar', [10703]], ['LeftTriangle', [8882]], ['LeftTriangleEqual', [8884]], ['LeftUpDownVector', [10577]], ['LeftUpTeeVector', [10592]], ['LeftUpVectorBar', [10584]], ['LeftUpVector', [8639]], ['LeftVectorBar', [10578]], ['LeftVector', [8636]], ['lEg', [10891]], ['leg', [8922]], ['leq', [8804]], ['leqq', [8806]], ['leqslant', [10877]], ['lescc', [10920]], ['les', [10877]], ['lesdot', [10879]], ['lesdoto', [10881]], ['lesdotor', [10883]], ['lesg', [8922, 65024]], ['lesges', [10899]], ['lessapprox', [10885]], ['lessdot', [8918]], ['lesseqgtr', [8922]], ['lesseqqgtr', [10891]], ['LessEqualGreater', [8922]], ['LessFullEqual', [8806]], ['LessGreater', [8822]], ['lessgtr', [8822]], ['LessLess', [10913]], ['lesssim', [8818]], ['LessSlantEqual', [10877]], ['LessTilde', [8818]], ['lfisht', [10620]], ['lfloor', [8970]], ['Lfr', [120079]], ['lfr', [120105]], ['lg', [8822]], ['lgE', [10897]], ['lHar', [10594]], ['lhard', [8637]], ['lharu', [8636]], ['lharul', [10602]], ['lhblk', [9604]], ['LJcy', [1033]], ['ljcy', [1113]], ['llarr', [8647]], ['ll', [8810]], ['Ll', [8920]], ['llcorner', [8990]], ['Lleftarrow', [8666]], ['llhard', [10603]], ['lltri', [9722]], ['Lmidot', [319]], ['lmidot', [320]], ['lmoustache', [9136]], ['lmoust', [9136]], ['lnap', [10889]], ['lnapprox', [10889]], ['lne', [10887]], ['lnE', [8808]], ['lneq', [10887]], ['lneqq', [8808]], ['lnsim', [8934]], ['loang', [10220]], ['loarr', [8701]], ['lobrk', [10214]], ['longleftarrow', [10229]], ['LongLeftArrow', [10229]], ['Longleftarrow', [10232]], ['longleftrightarrow', [10231]], ['LongLeftRightArrow', [10231]], ['Longleftrightarrow', [10234]], ['longmapsto', [10236]], ['longrightarrow', [10230]], ['LongRightArrow', [10230]], ['Longrightarrow', [10233]], ['looparrowleft', [8619]], ['looparrowright', [8620]], ['lopar', [10629]], ['Lopf', [120131]], ['lopf', [120157]], ['loplus', [10797]], ['lotimes', [10804]], ['lowast', [8727]], ['lowbar', [95]], ['LowerLeftArrow', [8601]], ['LowerRightArrow', [8600]], ['loz', [9674]], ['lozenge', [9674]], ['lozf', [10731]], ['lpar', [40]], ['lparlt', [10643]], ['lrarr', [8646]], ['lrcorner', [8991]], ['lrhar', [8651]], ['lrhard', [10605]], ['lrm', [8206]], ['lrtri', [8895]], ['lsaquo', [8249]], ['lscr', [120001]], ['Lscr', [8466]], ['lsh', [8624]], ['Lsh', [8624]], ['lsim', [8818]], ['lsime', [10893]], ['lsimg', [10895]], ['lsqb', [91]], ['lsquo', [8216]], ['lsquor', [8218]], ['Lstrok', [321]], ['lstrok', [322]], ['ltcc', [10918]], ['ltcir', [10873]], ['lt', [60]], ['LT', [60]], ['Lt', [8810]], ['ltdot', [8918]], ['lthree', [8907]], ['ltimes', [8905]], ['ltlarr', [10614]], ['ltquest', [10875]], ['ltri', [9667]], ['ltrie', [8884]], ['ltrif', [9666]], ['ltrPar', [10646]], ['lurdshar', [10570]], ['luruhar', [10598]], ['lvertneqq', [8808, 65024]], ['lvnE', [8808, 65024]], ['macr', [175]], ['male', [9794]], ['malt', [10016]], ['maltese', [10016]], ['Map', [10501]], ['map', [8614]], ['mapsto', [8614]], ['mapstodown', [8615]], ['mapstoleft', [8612]], ['mapstoup', [8613]], ['marker', [9646]], ['mcomma', [10793]], ['Mcy', [1052]], ['mcy', [1084]], ['mdash', [8212]], ['mDDot', [8762]], ['measuredangle', [8737]], ['MediumSpace', [8287]], ['Mellintrf', [8499]], ['Mfr', [120080]], ['mfr', [120106]], ['mho', [8487]], ['micro', [181]], ['midast', [42]], ['midcir', [10992]], ['mid', [8739]], ['middot', [183]], ['minusb', [8863]], ['minus', [8722]], ['minusd', [8760]], ['minusdu', [10794]], ['MinusPlus', [8723]], ['mlcp', [10971]], ['mldr', [8230]], ['mnplus', [8723]], ['models', [8871]], ['Mopf', [120132]], ['mopf', [120158]], ['mp', [8723]], ['mscr', [120002]], ['Mscr', [8499]], ['mstpos', [8766]], ['Mu', [924]], ['mu', [956]], ['multimap', [8888]], ['mumap', [8888]], ['nabla', [8711]], ['Nacute', [323]], ['nacute', [324]], ['nang', [8736, 8402]], ['nap', [8777]], ['napE', [10864, 824]], ['napid', [8779, 824]], ['napos', [329]], ['napprox', [8777]], ['natural', [9838]], ['naturals', [8469]], ['natur', [9838]], ['nbsp', [160]], ['nbump', [8782, 824]], ['nbumpe', [8783, 824]], ['ncap', [10819]], ['Ncaron', [327]], ['ncaron', [328]], ['Ncedil', [325]], ['ncedil', [326]], ['ncong', [8775]], ['ncongdot', [10861, 824]], ['ncup', [10818]], ['Ncy', [1053]], ['ncy', [1085]], ['ndash', [8211]], ['nearhk', [10532]], ['nearr', [8599]], ['neArr', [8663]], ['nearrow', [8599]], ['ne', [8800]], ['nedot', [8784, 824]], ['NegativeMediumSpace', [8203]], ['NegativeThickSpace', [8203]], ['NegativeThinSpace', [8203]], ['NegativeVeryThinSpace', [8203]], ['nequiv', [8802]], ['nesear', [10536]], ['nesim', [8770, 824]], ['NestedGreaterGreater', [8811]], ['NestedLessLess', [8810]], ['nexist', [8708]], ['nexists', [8708]], ['Nfr', [120081]], ['nfr', [120107]], ['ngE', [8807, 824]], ['nge', [8817]], ['ngeq', [8817]], ['ngeqq', [8807, 824]], ['ngeqslant', [10878, 824]], ['nges', [10878, 824]], ['nGg', [8921, 824]], ['ngsim', [8821]], ['nGt', [8811, 8402]], ['ngt', [8815]], ['ngtr', [8815]], ['nGtv', [8811, 824]], ['nharr', [8622]], ['nhArr', [8654]], ['nhpar', [10994]], ['ni', [8715]], ['nis', [8956]], ['nisd', [8954]], ['niv', [8715]], ['NJcy', [1034]], ['njcy', [1114]], ['nlarr', [8602]], ['nlArr', [8653]], ['nldr', [8229]], ['nlE', [8806, 824]], ['nle', [8816]], ['nleftarrow', [8602]], ['nLeftarrow', [8653]], ['nleftrightarrow', [8622]], ['nLeftrightarrow', [8654]], ['nleq', [8816]], ['nleqq', [8806, 824]], ['nleqslant', [10877, 824]], ['nles', [10877, 824]], ['nless', [8814]], ['nLl', [8920, 824]], ['nlsim', [8820]], ['nLt', [8810, 8402]], ['nlt', [8814]], ['nltri', [8938]], ['nltrie', [8940]], ['nLtv', [8810, 824]], ['nmid', [8740]], ['NoBreak', [8288]], ['NonBreakingSpace', [160]], ['nopf', [120159]], ['Nopf', [8469]], ['Not', [10988]], ['not', [172]], ['NotCongruent', [8802]], ['NotCupCap', [8813]], ['NotDoubleVerticalBar', [8742]], ['NotElement', [8713]], ['NotEqual', [8800]], ['NotEqualTilde', [8770, 824]], ['NotExists', [8708]], ['NotGreater', [8815]], ['NotGreaterEqual', [8817]], ['NotGreaterFullEqual', [8807, 824]], ['NotGreaterGreater', [8811, 824]], ['NotGreaterLess', [8825]], ['NotGreaterSlantEqual', [10878, 824]], ['NotGreaterTilde', [8821]], ['NotHumpDownHump', [8782, 824]], ['NotHumpEqual', [8783, 824]], ['notin', [8713]], ['notindot', [8949, 824]], ['notinE', [8953, 824]], ['notinva', [8713]], ['notinvb', [8951]], ['notinvc', [8950]], ['NotLeftTriangleBar', [10703, 824]], ['NotLeftTriangle', [8938]], ['NotLeftTriangleEqual', [8940]], ['NotLess', [8814]], ['NotLessEqual', [8816]], ['NotLessGreater', [8824]], ['NotLessLess', [8810, 824]], ['NotLessSlantEqual', [10877, 824]], ['NotLessTilde', [8820]], ['NotNestedGreaterGreater', [10914, 824]], ['NotNestedLessLess', [10913, 824]], ['notni', [8716]], ['notniva', [8716]], ['notnivb', [8958]], ['notnivc', [8957]], ['NotPrecedes', [8832]], ['NotPrecedesEqual', [10927, 824]], ['NotPrecedesSlantEqual', [8928]], ['NotReverseElement', [8716]], ['NotRightTriangleBar', [10704, 824]], ['NotRightTriangle', [8939]], ['NotRightTriangleEqual', [8941]], ['NotSquareSubset', [8847, 824]], ['NotSquareSubsetEqual', [8930]], ['NotSquareSuperset', [8848, 824]], ['NotSquareSupersetEqual', [8931]], ['NotSubset', [8834, 8402]], ['NotSubsetEqual', [8840]], ['NotSucceeds', [8833]], ['NotSucceedsEqual', [10928, 824]], ['NotSucceedsSlantEqual', [8929]], ['NotSucceedsTilde', [8831, 824]], ['NotSuperset', [8835, 8402]], ['NotSupersetEqual', [8841]], ['NotTilde', [8769]], ['NotTildeEqual', [8772]], ['NotTildeFullEqual', [8775]], ['NotTildeTilde', [8777]], ['NotVerticalBar', [8740]], ['nparallel', [8742]], ['npar', [8742]], ['nparsl', [11005, 8421]], ['npart', [8706, 824]], ['npolint', [10772]], ['npr', [8832]], ['nprcue', [8928]], ['nprec', [8832]], ['npreceq', [10927, 824]], ['npre', [10927, 824]], ['nrarrc', [10547, 824]], ['nrarr', [8603]], ['nrArr', [8655]], ['nrarrw', [8605, 824]], ['nrightarrow', [8603]], ['nRightarrow', [8655]], ['nrtri', [8939]], ['nrtrie', [8941]], ['nsc', [8833]], ['nsccue', [8929]], ['nsce', [10928, 824]], ['Nscr', [119977]], ['nscr', [120003]], ['nshortmid', [8740]], ['nshortparallel', [8742]], ['nsim', [8769]], ['nsime', [8772]], ['nsimeq', [8772]], ['nsmid', [8740]], ['nspar', [8742]], ['nsqsube', [8930]], ['nsqsupe', [8931]], ['nsub', [8836]], ['nsubE', [10949, 824]], ['nsube', [8840]], ['nsubset', [8834, 8402]], ['nsubseteq', [8840]], ['nsubseteqq', [10949, 824]], ['nsucc', [8833]], ['nsucceq', [10928, 824]], ['nsup', [8837]], ['nsupE', [10950, 824]], ['nsupe', [8841]], ['nsupset', [8835, 8402]], ['nsupseteq', [8841]], ['nsupseteqq', [10950, 824]], ['ntgl', [8825]], ['Ntilde', [209]], ['ntilde', [241]], ['ntlg', [8824]], ['ntriangleleft', [8938]], ['ntrianglelefteq', [8940]], ['ntriangleright', [8939]], ['ntrianglerighteq', [8941]], ['Nu', [925]], ['nu', [957]], ['num', [35]], ['numero', [8470]], ['numsp', [8199]], ['nvap', [8781, 8402]], ['nvdash', [8876]], ['nvDash', [8877]], ['nVdash', [8878]], ['nVDash', [8879]], ['nvge', [8805, 8402]], ['nvgt', [62, 8402]], ['nvHarr', [10500]], ['nvinfin', [10718]], ['nvlArr', [10498]], ['nvle', [8804, 8402]], ['nvlt', [60, 8402]], ['nvltrie', [8884, 8402]], ['nvrArr', [10499]], ['nvrtrie', [8885, 8402]], ['nvsim', [8764, 8402]], ['nwarhk', [10531]], ['nwarr', [8598]], ['nwArr', [8662]], ['nwarrow', [8598]], ['nwnear', [10535]], ['Oacute', [211]], ['oacute', [243]], ['oast', [8859]], ['Ocirc', [212]], ['ocirc', [244]], ['ocir', [8858]], ['Ocy', [1054]], ['ocy', [1086]], ['odash', [8861]], ['Odblac', [336]], ['odblac', [337]], ['odiv', [10808]], ['odot', [8857]], ['odsold', [10684]], ['OElig', [338]], ['oelig', [339]], ['ofcir', [10687]], ['Ofr', [120082]], ['ofr', [120108]], ['ogon', [731]], ['Ograve', [210]], ['ograve', [242]], ['ogt', [10689]], ['ohbar', [10677]], ['ohm', [937]], ['oint', [8750]], ['olarr', [8634]], ['olcir', [10686]], ['olcross', [10683]], ['oline', [8254]], ['olt', [10688]], ['Omacr', [332]], ['omacr', [333]], ['Omega', [937]], ['omega', [969]], ['Omicron', [927]], ['omicron', [959]], ['omid', [10678]], ['ominus', [8854]], ['Oopf', [120134]], ['oopf', [120160]], ['opar', [10679]], ['OpenCurlyDoubleQuote', [8220]], ['OpenCurlyQuote', [8216]], ['operp', [10681]], ['oplus', [8853]], ['orarr', [8635]], ['Or', [10836]], ['or', [8744]], ['ord', [10845]], ['order', [8500]], ['orderof', [8500]], ['ordf', [170]], ['ordm', [186]], ['origof', [8886]], ['oror', [10838]], ['orslope', [10839]], ['orv', [10843]], ['oS', [9416]], ['Oscr', [119978]], ['oscr', [8500]], ['Oslash', [216]], ['oslash', [248]], ['osol', [8856]], ['Otilde', [213]], ['otilde', [245]], ['otimesas', [10806]], ['Otimes', [10807]], ['otimes', [8855]], ['Ouml', [214]], ['ouml', [246]], ['ovbar', [9021]], ['OverBar', [8254]], ['OverBrace', [9182]], ['OverBracket', [9140]], ['OverParenthesis', [9180]], ['para', [182]], ['parallel', [8741]], ['par', [8741]], ['parsim', [10995]], ['parsl', [11005]], ['part', [8706]], ['PartialD', [8706]], ['Pcy', [1055]], ['pcy', [1087]], ['percnt', [37]], ['period', [46]], ['permil', [8240]], ['perp', [8869]], ['pertenk', [8241]], ['Pfr', [120083]], ['pfr', [120109]], ['Phi', [934]], ['phi', [966]], ['phiv', [981]], ['phmmat', [8499]], ['phone', [9742]], ['Pi', [928]], ['pi', [960]], ['pitchfork', [8916]], ['piv', [982]], ['planck', [8463]], ['planckh', [8462]], ['plankv', [8463]], ['plusacir', [10787]], ['plusb', [8862]], ['pluscir', [10786]], ['plus', [43]], ['plusdo', [8724]], ['plusdu', [10789]], ['pluse', [10866]], ['PlusMinus', [177]], ['plusmn', [177]], ['plussim', [10790]], ['plustwo', [10791]], ['pm', [177]], ['Poincareplane', [8460]], ['pointint', [10773]], ['popf', [120161]], ['Popf', [8473]], ['pound', [163]], ['prap', [10935]], ['Pr', [10939]], ['pr', [8826]], ['prcue', [8828]], ['precapprox', [10935]], ['prec', [8826]], ['preccurlyeq', [8828]], ['Precedes', [8826]], ['PrecedesEqual', [10927]], ['PrecedesSlantEqual', [8828]], ['PrecedesTilde', [8830]], ['preceq', [10927]], ['precnapprox', [10937]], ['precneqq', [10933]], ['precnsim', [8936]], ['pre', [10927]], ['prE', [10931]], ['precsim', [8830]], ['prime', [8242]], ['Prime', [8243]], ['primes', [8473]], ['prnap', [10937]], ['prnE', [10933]], ['prnsim', [8936]], ['prod', [8719]], ['Product', [8719]], ['profalar', [9006]], ['profline', [8978]], ['profsurf', [8979]], ['prop', [8733]], ['Proportional', [8733]], ['Proportion', [8759]], ['propto', [8733]], ['prsim', [8830]], ['prurel', [8880]], ['Pscr', [119979]], ['pscr', [120005]], ['Psi', [936]], ['psi', [968]], ['puncsp', [8200]], ['Qfr', [120084]], ['qfr', [120110]], ['qint', [10764]], ['qopf', [120162]], ['Qopf', [8474]], ['qprime', [8279]], ['Qscr', [119980]], ['qscr', [120006]], ['quaternions', [8461]], ['quatint', [10774]], ['quest', [63]], ['questeq', [8799]], ['quot', [34]], ['QUOT', [34]], ['rAarr', [8667]], ['race', [8765, 817]], ['Racute', [340]], ['racute', [341]], ['radic', [8730]], ['raemptyv', [10675]], ['rang', [10217]], ['Rang', [10219]], ['rangd', [10642]], ['range', [10661]], ['rangle', [10217]], ['raquo', [187]], ['rarrap', [10613]], ['rarrb', [8677]], ['rarrbfs', [10528]], ['rarrc', [10547]], ['rarr', [8594]], ['Rarr', [8608]], ['rArr', [8658]], ['rarrfs', [10526]], ['rarrhk', [8618]], ['rarrlp', [8620]], ['rarrpl', [10565]], ['rarrsim', [10612]], ['Rarrtl', [10518]], ['rarrtl', [8611]], ['rarrw', [8605]], ['ratail', [10522]], ['rAtail', [10524]], ['ratio', [8758]], ['rationals', [8474]], ['rbarr', [10509]], ['rBarr', [10511]], ['RBarr', [10512]], ['rbbrk', [10099]], ['rbrace', [125]], ['rbrack', [93]], ['rbrke', [10636]], ['rbrksld', [10638]], ['rbrkslu', [10640]], ['Rcaron', [344]], ['rcaron', [345]], ['Rcedil', [342]], ['rcedil', [343]], ['rceil', [8969]], ['rcub', [125]], ['Rcy', [1056]], ['rcy', [1088]], ['rdca', [10551]], ['rdldhar', [10601]], ['rdquo', [8221]], ['rdquor', [8221]], ['CloseCurlyDoubleQuote', [8221]], ['rdsh', [8627]], ['real', [8476]], ['realine', [8475]], ['realpart', [8476]], ['reals', [8477]], ['Re', [8476]], ['rect', [9645]], ['reg', [174]], ['REG', [174]], ['ReverseElement', [8715]], ['ReverseEquilibrium', [8651]], ['ReverseUpEquilibrium', [10607]], ['rfisht', [10621]], ['rfloor', [8971]], ['rfr', [120111]], ['Rfr', [8476]], ['rHar', [10596]], ['rhard', [8641]], ['rharu', [8640]], ['rharul', [10604]], ['Rho', [929]], ['rho', [961]], ['rhov', [1009]], ['RightAngleBracket', [10217]], ['RightArrowBar', [8677]], ['rightarrow', [8594]], ['RightArrow', [8594]], ['Rightarrow', [8658]], ['RightArrowLeftArrow', [8644]], ['rightarrowtail', [8611]], ['RightCeiling', [8969]], ['RightDoubleBracket', [10215]], ['RightDownTeeVector', [10589]], ['RightDownVectorBar', [10581]], ['RightDownVector', [8642]], ['RightFloor', [8971]], ['rightharpoondown', [8641]], ['rightharpoonup', [8640]], ['rightleftarrows', [8644]], ['rightleftharpoons', [8652]], ['rightrightarrows', [8649]], ['rightsquigarrow', [8605]], ['RightTeeArrow', [8614]], ['RightTee', [8866]], ['RightTeeVector', [10587]], ['rightthreetimes', [8908]], ['RightTriangleBar', [10704]], ['RightTriangle', [8883]], ['RightTriangleEqual', [8885]], ['RightUpDownVector', [10575]], ['RightUpTeeVector', [10588]], ['RightUpVectorBar', [10580]], ['RightUpVector', [8638]], ['RightVectorBar', [10579]], ['RightVector', [8640]], ['ring', [730]], ['risingdotseq', [8787]], ['rlarr', [8644]], ['rlhar', [8652]], ['rlm', [8207]], ['rmoustache', [9137]], ['rmoust', [9137]], ['rnmid', [10990]], ['roang', [10221]], ['roarr', [8702]], ['robrk', [10215]], ['ropar', [10630]], ['ropf', [120163]], ['Ropf', [8477]], ['roplus', [10798]], ['rotimes', [10805]], ['RoundImplies', [10608]], ['rpar', [41]], ['rpargt', [10644]], ['rppolint', [10770]], ['rrarr', [8649]], ['Rrightarrow', [8667]], ['rsaquo', [8250]], ['rscr', [120007]], ['Rscr', [8475]], ['rsh', [8625]], ['Rsh', [8625]], ['rsqb', [93]], ['rsquo', [8217]], ['rsquor', [8217]], ['CloseCurlyQuote', [8217]], ['rthree', [8908]], ['rtimes', [8906]], ['rtri', [9657]], ['rtrie', [8885]], ['rtrif', [9656]], ['rtriltri', [10702]], ['RuleDelayed', [10740]], ['ruluhar', [10600]], ['rx', [8478]], ['Sacute', [346]], ['sacute', [347]], ['sbquo', [8218]], ['scap', [10936]], ['Scaron', [352]], ['scaron', [353]], ['Sc', [10940]], ['sc', [8827]], ['sccue', [8829]], ['sce', [10928]], ['scE', [10932]], ['Scedil', [350]], ['scedil', [351]], ['Scirc', [348]], ['scirc', [349]], ['scnap', [10938]], ['scnE', [10934]], ['scnsim', [8937]], ['scpolint', [10771]], ['scsim', [8831]], ['Scy', [1057]], ['scy', [1089]], ['sdotb', [8865]], ['sdot', [8901]], ['sdote', [10854]], ['searhk', [10533]], ['searr', [8600]], ['seArr', [8664]], ['searrow', [8600]], ['sect', [167]], ['semi', [59]], ['seswar', [10537]], ['setminus', [8726]], ['setmn', [8726]], ['sext', [10038]], ['Sfr', [120086]], ['sfr', [120112]], ['sfrown', [8994]], ['sharp', [9839]], ['SHCHcy', [1065]], ['shchcy', [1097]], ['SHcy', [1064]], ['shcy', [1096]], ['ShortDownArrow', [8595]], ['ShortLeftArrow', [8592]], ['shortmid', [8739]], ['shortparallel', [8741]], ['ShortRightArrow', [8594]], ['ShortUpArrow', [8593]], ['shy', [173]], ['Sigma', [931]], ['sigma', [963]], ['sigmaf', [962]], ['sigmav', [962]], ['sim', [8764]], ['simdot', [10858]], ['sime', [8771]], ['simeq', [8771]], ['simg', [10910]], ['simgE', [10912]], ['siml', [10909]], ['simlE', [10911]], ['simne', [8774]], ['simplus', [10788]], ['simrarr', [10610]], ['slarr', [8592]], ['SmallCircle', [8728]], ['smallsetminus', [8726]], ['smashp', [10803]], ['smeparsl', [10724]], ['smid', [8739]], ['smile', [8995]], ['smt', [10922]], ['smte', [10924]], ['smtes', [10924, 65024]], ['SOFTcy', [1068]], ['softcy', [1100]], ['solbar', [9023]], ['solb', [10692]], ['sol', [47]], ['Sopf', [120138]], ['sopf', [120164]], ['spades', [9824]], ['spadesuit', [9824]], ['spar', [8741]], ['sqcap', [8851]], ['sqcaps', [8851, 65024]], ['sqcup', [8852]], ['sqcups', [8852, 65024]], ['Sqrt', [8730]], ['sqsub', [8847]], ['sqsube', [8849]], ['sqsubset', [8847]], ['sqsubseteq', [8849]], ['sqsup', [8848]], ['sqsupe', [8850]], ['sqsupset', [8848]], ['sqsupseteq', [8850]], ['square', [9633]], ['Square', [9633]], ['SquareIntersection', [8851]], ['SquareSubset', [8847]], ['SquareSubsetEqual', [8849]], ['SquareSuperset', [8848]], ['SquareSupersetEqual', [8850]], ['SquareUnion', [8852]], ['squarf', [9642]], ['squ', [9633]], ['squf', [9642]], ['srarr', [8594]], ['Sscr', [119982]], ['sscr', [120008]], ['ssetmn', [8726]], ['ssmile', [8995]], ['sstarf', [8902]], ['Star', [8902]], ['star', [9734]], ['starf', [9733]], ['straightepsilon', [1013]], ['straightphi', [981]], ['strns', [175]], ['sub', [8834]], ['Sub', [8912]], ['subdot', [10941]], ['subE', [10949]], ['sube', [8838]], ['subedot', [10947]], ['submult', [10945]], ['subnE', [10955]], ['subne', [8842]], ['subplus', [10943]], ['subrarr', [10617]], ['subset', [8834]], ['Subset', [8912]], ['subseteq', [8838]], ['subseteqq', [10949]], ['SubsetEqual', [8838]], ['subsetneq', [8842]], ['subsetneqq', [10955]], ['subsim', [10951]], ['subsub', [10965]], ['subsup', [10963]], ['succapprox', [10936]], ['succ', [8827]], ['succcurlyeq', [8829]], ['Succeeds', [8827]], ['SucceedsEqual', [10928]], ['SucceedsSlantEqual', [8829]], ['SucceedsTilde', [8831]], ['succeq', [10928]], ['succnapprox', [10938]], ['succneqq', [10934]], ['succnsim', [8937]], ['succsim', [8831]], ['SuchThat', [8715]], ['sum', [8721]], ['Sum', [8721]], ['sung', [9834]], ['sup1', [185]], ['sup2', [178]], ['sup3', [179]], ['sup', [8835]], ['Sup', [8913]], ['supdot', [10942]], ['supdsub', [10968]], ['supE', [10950]], ['supe', [8839]], ['supedot', [10948]], ['Superset', [8835]], ['SupersetEqual', [8839]], ['suphsol', [10185]], ['suphsub', [10967]], ['suplarr', [10619]], ['supmult', [10946]], ['supnE', [10956]], ['supne', [8843]], ['supplus', [10944]], ['supset', [8835]], ['Supset', [8913]], ['supseteq', [8839]], ['supseteqq', [10950]], ['supsetneq', [8843]], ['supsetneqq', [10956]], ['supsim', [10952]], ['supsub', [10964]], ['supsup', [10966]], ['swarhk', [10534]], ['swarr', [8601]], ['swArr', [8665]], ['swarrow', [8601]], ['swnwar', [10538]], ['szlig', [223]], ['Tab', [9]], ['target', [8982]], ['Tau', [932]], ['tau', [964]], ['tbrk', [9140]], ['Tcaron', [356]], ['tcaron', [357]], ['Tcedil', [354]], ['tcedil', [355]], ['Tcy', [1058]], ['tcy', [1090]], ['tdot', [8411]], ['telrec', [8981]], ['Tfr', [120087]], ['tfr', [120113]], ['there4', [8756]], ['therefore', [8756]], ['Therefore', [8756]], ['Theta', [920]], ['theta', [952]], ['thetasym', [977]], ['thetav', [977]], ['thickapprox', [8776]], ['thicksim', [8764]], ['ThickSpace', [8287, 8202]], ['ThinSpace', [8201]], ['thinsp', [8201]], ['thkap', [8776]], ['thksim', [8764]], ['THORN', [222]], ['thorn', [254]], ['tilde', [732]], ['Tilde', [8764]], ['TildeEqual', [8771]], ['TildeFullEqual', [8773]], ['TildeTilde', [8776]], ['timesbar', [10801]], ['timesb', [8864]], ['times', [215]], ['timesd', [10800]], ['tint', [8749]], ['toea', [10536]], ['topbot', [9014]], ['topcir', [10993]], ['top', [8868]], ['Topf', [120139]], ['topf', [120165]], ['topfork', [10970]], ['tosa', [10537]], ['tprime', [8244]], ['trade', [8482]], ['TRADE', [8482]], ['triangle', [9653]], ['triangledown', [9663]], ['triangleleft', [9667]], ['trianglelefteq', [8884]], ['triangleq', [8796]], ['triangleright', [9657]], ['trianglerighteq', [8885]], ['tridot', [9708]], ['trie', [8796]], ['triminus', [10810]], ['TripleDot', [8411]], ['triplus', [10809]], ['trisb', [10701]], ['tritime', [10811]], ['trpezium', [9186]], ['Tscr', [119983]], ['tscr', [120009]], ['TScy', [1062]], ['tscy', [1094]], ['TSHcy', [1035]], ['tshcy', [1115]], ['Tstrok', [358]], ['tstrok', [359]], ['twixt', [8812]], ['twoheadleftarrow', [8606]], ['twoheadrightarrow', [8608]], ['Uacute', [218]], ['uacute', [250]], ['uarr', [8593]], ['Uarr', [8607]], ['uArr', [8657]], ['Uarrocir', [10569]], ['Ubrcy', [1038]], ['ubrcy', [1118]], ['Ubreve', [364]], ['ubreve', [365]], ['Ucirc', [219]], ['ucirc', [251]], ['Ucy', [1059]], ['ucy', [1091]], ['udarr', [8645]], ['Udblac', [368]], ['udblac', [369]], ['udhar', [10606]], ['ufisht', [10622]], ['Ufr', [120088]], ['ufr', [120114]], ['Ugrave', [217]], ['ugrave', [249]], ['uHar', [10595]], ['uharl', [8639]], ['uharr', [8638]], ['uhblk', [9600]], ['ulcorn', [8988]], ['ulcorner', [8988]], ['ulcrop', [8975]], ['ultri', [9720]], ['Umacr', [362]], ['umacr', [363]], ['uml', [168]], ['UnderBar', [95]], ['UnderBrace', [9183]], ['UnderBracket', [9141]], ['UnderParenthesis', [9181]], ['Union', [8899]], ['UnionPlus', [8846]], ['Uogon', [370]], ['uogon', [371]], ['Uopf', [120140]], ['uopf', [120166]], ['UpArrowBar', [10514]], ['uparrow', [8593]], ['UpArrow', [8593]], ['Uparrow', [8657]], ['UpArrowDownArrow', [8645]], ['updownarrow', [8597]], ['UpDownArrow', [8597]], ['Updownarrow', [8661]], ['UpEquilibrium', [10606]], ['upharpoonleft', [8639]], ['upharpoonright', [8638]], ['uplus', [8846]], ['UpperLeftArrow', [8598]], ['UpperRightArrow', [8599]], ['upsi', [965]], ['Upsi', [978]], ['upsih', [978]], ['Upsilon', [933]], ['upsilon', [965]], ['UpTeeArrow', [8613]], ['UpTee', [8869]], ['upuparrows', [8648]], ['urcorn', [8989]], ['urcorner', [8989]], ['urcrop', [8974]], ['Uring', [366]], ['uring', [367]], ['urtri', [9721]], ['Uscr', [119984]], ['uscr', [120010]], ['utdot', [8944]], ['Utilde', [360]], ['utilde', [361]], ['utri', [9653]], ['utrif', [9652]], ['uuarr', [8648]], ['Uuml', [220]], ['uuml', [252]], ['uwangle', [10663]], ['vangrt', [10652]], ['varepsilon', [1013]], ['varkappa', [1008]], ['varnothing', [8709]], ['varphi', [981]], ['varpi', [982]], ['varpropto', [8733]], ['varr', [8597]], ['vArr', [8661]], ['varrho', [1009]], ['varsigma', [962]], ['varsubsetneq', [8842, 65024]], ['varsubsetneqq', [10955, 65024]], ['varsupsetneq', [8843, 65024]], ['varsupsetneqq', [10956, 65024]], ['vartheta', [977]], ['vartriangleleft', [8882]], ['vartriangleright', [8883]], ['vBar', [10984]], ['Vbar', [10987]], ['vBarv', [10985]], ['Vcy', [1042]], ['vcy', [1074]], ['vdash', [8866]], ['vDash', [8872]], ['Vdash', [8873]], ['VDash', [8875]], ['Vdashl', [10982]], ['veebar', [8891]], ['vee', [8744]], ['Vee', [8897]], ['veeeq', [8794]], ['vellip', [8942]], ['verbar', [124]], ['Verbar', [8214]], ['vert', [124]], ['Vert', [8214]], ['VerticalBar', [8739]], ['VerticalLine', [124]], ['VerticalSeparator', [10072]], ['VerticalTilde', [8768]], ['VeryThinSpace', [8202]], ['Vfr', [120089]], ['vfr', [120115]], ['vltri', [8882]], ['vnsub', [8834, 8402]], ['vnsup', [8835, 8402]], ['Vopf', [120141]], ['vopf', [120167]], ['vprop', [8733]], ['vrtri', [8883]], ['Vscr', [119985]], ['vscr', [120011]], ['vsubnE', [10955, 65024]], ['vsubne', [8842, 65024]], ['vsupnE', [10956, 65024]], ['vsupne', [8843, 65024]], ['Vvdash', [8874]], ['vzigzag', [10650]], ['Wcirc', [372]], ['wcirc', [373]], ['wedbar', [10847]], ['wedge', [8743]], ['Wedge', [8896]], ['wedgeq', [8793]], ['weierp', [8472]], ['Wfr', [120090]], ['wfr', [120116]], ['Wopf', [120142]], ['wopf', [120168]], ['wp', [8472]], ['wr', [8768]], ['wreath', [8768]], ['Wscr', [119986]], ['wscr', [120012]], ['xcap', [8898]], ['xcirc', [9711]], ['xcup', [8899]], ['xdtri', [9661]], ['Xfr', [120091]], ['xfr', [120117]], ['xharr', [10231]], ['xhArr', [10234]], ['Xi', [926]], ['xi', [958]], ['xlarr', [10229]], ['xlArr', [10232]], ['xmap', [10236]], ['xnis', [8955]], ['xodot', [10752]], ['Xopf', [120143]], ['xopf', [120169]], ['xoplus', [10753]], ['xotime', [10754]], ['xrarr', [10230]], ['xrArr', [10233]], ['Xscr', [119987]], ['xscr', [120013]], ['xsqcup', [10758]], ['xuplus', [10756]], ['xutri', [9651]], ['xvee', [8897]], ['xwedge', [8896]], ['Yacute', [221]], ['yacute', [253]], ['YAcy', [1071]], ['yacy', [1103]], ['Ycirc', [374]], ['ycirc', [375]], ['Ycy', [1067]], ['ycy', [1099]], ['yen', [165]], ['Yfr', [120092]], ['yfr', [120118]], ['YIcy', [1031]], ['yicy', [1111]], ['Yopf', [120144]], ['yopf', [120170]], ['Yscr', [119988]], ['yscr', [120014]], ['YUcy', [1070]], ['yucy', [1102]], ['yuml', [255]], ['Yuml', [376]], ['Zacute', [377]], ['zacute', [378]], ['Zcaron', [381]], ['zcaron', [382]], ['Zcy', [1047]], ['zcy', [1079]], ['Zdot', [379]], ['zdot', [380]], ['zeetrf', [8488]], ['ZeroWidthSpace', [8203]], ['Zeta', [918]], ['zeta', [950]], ['zfr', [120119]], ['Zfr', [8488]], ['ZHcy', [1046]], ['zhcy', [1078]], ['zigrarr', [8669]], ['zopf', [120171]], ['Zopf', [8484]], ['Zscr', [119989]], ['zscr', [120015]], ['zwj', [8205]], ['zwnj', [8204]]];

var alphaIndex = {};
var charIndex = {};

createIndexes(alphaIndex, charIndex);

/**
 * @constructor
 */
function Html5Entities() {}

/**
 * @param {String} str
 * @returns {String}
 */
Html5Entities.prototype.decode = function(str) {
    if (!str || !str.length) {
        return '';
    }
    return str.replace(/&(#?[\w\d]+);?/g, function(s, entity) {
        var chr;
        if (entity.charAt(0) === "#") {
            var code = entity.charAt(1) === 'x' ?
                parseInt(entity.substr(2).toLowerCase(), 16) :
                parseInt(entity.substr(1));

            if (!(isNaN(code) || code < -32768 || code > 65535)) {
                chr = String.fromCharCode(code);
            }
        } else {
            chr = alphaIndex[entity];
        }
        return chr || s;
    });
};

/**
 * @param {String} str
 * @returns {String}
 */
 Html5Entities.decode = function(str) {
    return new Html5Entities().decode(str);
 };

/**
 * @param {String} str
 * @returns {String}
 */
Html5Entities.prototype.encode = function(str) {
    if (!str || !str.length) {
        return '';
    }
    var strLength = str.length;
    var result = '';
    var i = 0;
    while (i < strLength) {
        var charInfo = charIndex[str.charCodeAt(i)];
        if (charInfo) {
            var alpha = charInfo[str.charCodeAt(i + 1)];
            if (alpha) {
                i++;
            } else {
                alpha = charInfo[''];
            }
            if (alpha) {
                result += "&" + alpha + ";";
                i++;
                continue;
            }
        }
        result += str.charAt(i);
        i++;
    }
    return result;
};

/**
 * @param {String} str
 * @returns {String}
 */
 Html5Entities.encode = function(str) {
    return new Html5Entities().encode(str);
 };

/**
 * @param {String} str
 * @returns {String}
 */
Html5Entities.prototype.encodeNonUTF = function(str) {
    if (!str || !str.length) {
        return '';
    }
    var strLength = str.length;
    var result = '';
    var i = 0;
    while (i < strLength) {
        var c = str.charCodeAt(i);
        var charInfo = charIndex[c];
        if (charInfo) {
            var alpha = charInfo[str.charCodeAt(i + 1)];
            if (alpha) {
                i++;
            } else {
                alpha = charInfo[''];
            }
            if (alpha) {
                result += "&" + alpha + ";";
                i++;
                continue;
            }
        }
        if (c < 32 || c > 126) {
            result += '&#' + c + ';';
        } else {
            result += str.charAt(i);
        }
        i++;
    }
    return result;
};

/**
 * @param {String} str
 * @returns {String}
 */
 Html5Entities.encodeNonUTF = function(str) {
    return new Html5Entities().encodeNonUTF(str);
 };

/**
 * @param {String} str
 * @returns {String}
 */
Html5Entities.prototype.encodeNonASCII = function(str) {
    if (!str || !str.length) {
        return '';
    }
    var strLength = str.length;
    var result = '';
    var i = 0;
    while (i < strLength) {
        var c = str.charCodeAt(i);
        if (c <= 255) {
            result += str[i++];
            continue;
        }
        result += '&#' + c + ';';
        i++
    }
    return result;
};

/**
 * @param {String} str
 * @returns {String}
 */
 Html5Entities.encodeNonASCII = function(str) {
    return new Html5Entities().encodeNonASCII(str);
 };

/**
 * @param {Object} alphaIndex Passed by reference.
 * @param {Object} charIndex Passed by reference.
 */
function createIndexes(alphaIndex, charIndex) {
    var i = ENTITIES.length;
    var _results = [];
    while (i--) {
        var e = ENTITIES[i];
        var alpha = e[0];
        var chars = e[1];
        var chr = chars[0];
        var addChar = (chr < 32 || chr > 126) || chr === 62 || chr === 60 || chr === 38 || chr === 34 || chr === 39;
        var charInfo;
        if (addChar) {
            charInfo = charIndex[chr] = charIndex[chr] || {};
        }
        if (chars[1]) {
            var chr2 = chars[1];
            alphaIndex[alpha] = String.fromCharCode(chr) + String.fromCharCode(chr2);
            _results.push(addChar && (charInfo[chr2] = alpha));
        } else {
            alphaIndex[alpha] = String.fromCharCode(chr);
            _results.push(addChar && (charInfo[''] = alpha));
        }
    }
}

module.exports = Html5Entities;


/***/ }),

/***/ "./node_modules/html-entities/lib/xml-entities.js":
/*!********************************************************!*\
  !*** ./node_modules/html-entities/lib/xml-entities.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var ALPHA_INDEX = {
    '&lt': '<',
    '&gt': '>',
    '&quot': '"',
    '&apos': '\'',
    '&amp': '&',
    '&lt;': '<',
    '&gt;': '>',
    '&quot;': '"',
    '&apos;': '\'',
    '&amp;': '&'
};

var CHAR_INDEX = {
    60: 'lt',
    62: 'gt',
    34: 'quot',
    39: 'apos',
    38: 'amp'
};

var CHAR_S_INDEX = {
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    '\'': '&apos;',
    '&': '&amp;'
};

/**
 * @constructor
 */
function XmlEntities() {}

/**
 * @param {String} str
 * @returns {String}
 */
XmlEntities.prototype.encode = function(str) {
    if (!str || !str.length) {
        return '';
    }
    return str.replace(/<|>|"|'|&/g, function(s) {
        return CHAR_S_INDEX[s];
    });
};

/**
 * @param {String} str
 * @returns {String}
 */
 XmlEntities.encode = function(str) {
    return new XmlEntities().encode(str);
 };

/**
 * @param {String} str
 * @returns {String}
 */
XmlEntities.prototype.decode = function(str) {
    if (!str || !str.length) {
        return '';
    }
    return str.replace(/&#?[0-9a-zA-Z]+;?/g, function(s) {
        if (s.charAt(1) === '#') {
            var code = s.charAt(2).toLowerCase() === 'x' ?
                parseInt(s.substr(3), 16) :
                parseInt(s.substr(2));

            if (isNaN(code) || code < -32768 || code > 65535) {
                return '';
            }
            return String.fromCharCode(code);
        }
        return ALPHA_INDEX[s] || s;
    });
};

/**
 * @param {String} str
 * @returns {String}
 */
 XmlEntities.decode = function(str) {
    return new XmlEntities().decode(str);
 };

/**
 * @param {String} str
 * @returns {String}
 */
XmlEntities.prototype.encodeNonUTF = function(str) {
    if (!str || !str.length) {
        return '';
    }
    var strLength = str.length;
    var result = '';
    var i = 0;
    while (i < strLength) {
        var c = str.charCodeAt(i);
        var alpha = CHAR_INDEX[c];
        if (alpha) {
            result += "&" + alpha + ";";
            i++;
            continue;
        }
        if (c < 32 || c > 126) {
            result += '&#' + c + ';';
        } else {
            result += str.charAt(i);
        }
        i++;
    }
    return result;
};

/**
 * @param {String} str
 * @returns {String}
 */
 XmlEntities.encodeNonUTF = function(str) {
    return new XmlEntities().encodeNonUTF(str);
 };

/**
 * @param {String} str
 * @returns {String}
 */
XmlEntities.prototype.encodeNonASCII = function(str) {
    if (!str || !str.length) {
        return '';
    }
    var strLenght = str.length;
    var result = '';
    var i = 0;
    while (i < strLenght) {
        var c = str.charCodeAt(i);
        if (c <= 255) {
            result += str[i++];
            continue;
        }
        result += '&#' + c + ';';
        i++;
    }
    return result;
};

/**
 * @param {String} str
 * @returns {String}
 */
 XmlEntities.encodeNonASCII = function(str) {
    return new XmlEntities().encodeNonASCII(str);
 };

module.exports = XmlEntities;


/***/ }),

/***/ "./node_modules/ieee754/index.js":
/*!***************************************!*\
  !*** ./node_modules/ieee754/index.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

exports.read = function (buffer, offset, isLE, mLen, nBytes) {
  var e, m
  var eLen = (nBytes * 8) - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var nBits = -7
  var i = isLE ? (nBytes - 1) : 0
  var d = isLE ? -1 : 1
  var s = buffer[offset + i]

  i += d

  e = s & ((1 << (-nBits)) - 1)
  s >>= (-nBits)
  nBits += eLen
  for (; nBits > 0; e = (e * 256) + buffer[offset + i], i += d, nBits -= 8) {}

  m = e & ((1 << (-nBits)) - 1)
  e >>= (-nBits)
  nBits += mLen
  for (; nBits > 0; m = (m * 256) + buffer[offset + i], i += d, nBits -= 8) {}

  if (e === 0) {
    e = 1 - eBias
  } else if (e === eMax) {
    return m ? NaN : ((s ? -1 : 1) * Infinity)
  } else {
    m = m + Math.pow(2, mLen)
    e = e - eBias
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
}

exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c
  var eLen = (nBytes * 8) - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)
  var i = isLE ? 0 : (nBytes - 1)
  var d = isLE ? 1 : -1
  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0

  value = Math.abs(value)

  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0
    e = eMax
  } else {
    e = Math.floor(Math.log(value) / Math.LN2)
    if (value * (c = Math.pow(2, -e)) < 1) {
      e--
      c *= 2
    }
    if (e + eBias >= 1) {
      value += rt / c
    } else {
      value += rt * Math.pow(2, 1 - eBias)
    }
    if (value * c >= 2) {
      e++
      c /= 2
    }

    if (e + eBias >= eMax) {
      m = 0
      e = eMax
    } else if (e + eBias >= 1) {
      m = ((value * c) - 1) * Math.pow(2, mLen)
      e = e + eBias
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
      e = 0
    }
  }

  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

  e = (e << mLen) | m
  eLen += mLen
  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

  buffer[offset + i - d] |= s * 128
}


/***/ }),

/***/ "./node_modules/konva/konva.js":
/*!*************************************!*\
  !*** ./node_modules/konva/konva.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {/*
 * Konva JavaScript Framework v2.5.1
 * http://konvajs.github.io/
 * Licensed under the MIT
 * Date: Thu Nov 08 2018
 *
 * Original work Copyright (C) 2011 - 2013 by Eric Rowell (KineticJS)
 * Modified work Copyright (C) 2014 - present by Anton Lavrenov (Konva)
 *
 * @license
 */

// runtime check for already included Konva
(function() {
  'use strict';
  /**
   * @namespace Konva
   */

  var PI_OVER_180 = Math.PI / 180;

  var Konva = {
    // public
    version: '2.5.1',

    // private
    stages: [],
    idCounter: 0,
    ids: {},
    names: {},
    shapes: {},
    listenClickTap: false,
    inDblClickWindow: false,

    isBrowser:
      typeof window !== 'undefined' &&
      // browser case
      ({}.toString.call(window) === '[object Window]' ||
        // electron case
        {}.toString.call(window) === '[object global]'),

    isUnminified: /comment/.test(function() {
      /* comment */
    }),

    // configurations
    enableTrace: false,
    traceArrMax: 100,
    dblClickWindow: 400,
    /**
     * Global pixel ratio configuration. KonvaJS automatically detect pixel ratio of current device.
     * But you may override such property, if you want to use your value.
     * @property pixelRatio
     * @default undefined
     * @memberof Konva
     * @example
     * Konva.pixelRatio = 1;
     */
    pixelRatio: undefined,
    /**
     * Drag distance property. If you start to drag a node you may want to wait until pointer is moved to some distance from start point,
     * only then start dragging. Default is 3px.
     * @property dragDistance
     * @default 0
     * @memberof Konva
     * @example
     * Konva.dragDistance = 10;
     */
    dragDistance: 3,
    /**
     * Use degree values for angle properties. You may set this property to false if you want to use radiant values.
     * @property angleDeg
     * @default true
     * @memberof Konva
     * @example
     * node.rotation(45); // 45 degrees
     * Konva.angleDeg = false;
     * node.rotation(Math.PI / 2); // PI/2 radian
     */
    angleDeg: true,
    /**
     * Show different warnings about errors or wrong API usage
     * @property showWarnings
     * @default true
     * @memberof Konva
     * @example
     * Konva.showWarnings = false;
     */
    showWarnings: true,

    /**
     * @namespace Filters
     * @memberof Konva
     */
    Filters: {},

    /**
     * returns whether or not drag and drop is currently active
     * @method
     * @memberof Konva
     */
    isDragging: function() {
      var dd = Konva.DD;

      // if DD is not included with the build, then
      // drag and drop is not even possible
      if (dd) {
        return dd.isDragging;
      }
      return false;
    },
    /**
     * returns whether or not a drag and drop operation is ready, but may
     *  not necessarily have started
     * @method
     * @memberof Konva
     */
    isDragReady: function() {
      var dd = Konva.DD;

      // if DD is not included with the build, then
      // drag and drop is not even possible
      if (dd) {
        return !!dd.node;
      }
      return false;
    },
    _addId: function(node, id) {
      if (!id) {
        return;
      }
      // do we need this warning?
      // if (this.ids[id]) {
      //   Konva.Util.warn(
      //     'Duplicate id "' +
      //       id +
      //       '". Please don not use same id several times. It may break find() method look up.'
      //   );
      // }
      this.ids[id] = node;
    },
    _removeId: function(id) {
      if (id !== undefined) {
        delete this.ids[id];
      }
    },
    _addName: function(node, name) {
      if (name) {
        if (!this.names[name]) {
          this.names[name] = [];
        }
        this.names[name].push(node);
      }
    },
    _removeName: function(name, _id) {
      if (!name) {
        return;
      }
      var nodes = this.names[name];
      if (!nodes) {
        return;
      }
      for (var n = 0; n < nodes.length; n++) {
        var no = nodes[n];
        if (no._id === _id) {
          nodes.splice(n, 1);
        }
      }
      if (nodes.length === 0) {
        delete this.names[name];
      }
    },
    getAngle: function(angle) {
      return this.angleDeg ? angle * PI_OVER_180 : angle;
    },
    _detectIE: function(ua) {
      var msie = ua.indexOf('msie ');
      if (msie > 0) {
        // IE 10 or older => return version number
        return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
      }

      var trident = ua.indexOf('trident/');
      if (trident > 0) {
        // IE 11 => return version number
        var rv = ua.indexOf('rv:');
        return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
      }

      var edge = ua.indexOf('edge/');
      if (edge > 0) {
        // Edge (IE 12+) => return version number
        return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
      }

      // other browser
      return false;
    },
    _parseUA: function(userAgent) {
      var ua = userAgent.toLowerCase(),
        // jQuery UA regex
        match =
          /(chrome)[ /]([\w.]+)/.exec(ua) ||
          /(webkit)[ /]([\w.]+)/.exec(ua) ||
          /(opera)(?:.*version|)[ /]([\w.]+)/.exec(ua) ||
          /(msie) ([\w.]+)/.exec(ua) ||
          (ua.indexOf('compatible') < 0 &&
            /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(ua)) ||
          [],
        // adding mobile flag as well
        mobile = !!userAgent.match(
          /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile/i
        ),
        ieMobile = !!userAgent.match(/IEMobile/i);

      return {
        browser: match[1] || '',
        version: match[2] || '0',
        isIE: Konva._detectIE(ua),
        // adding mobile flab
        mobile: mobile,
        ieMobile: ieMobile // If this is true (i.e., WP8), then Konva touch events are executed instead of equivalent Konva mouse events
      };
    },
    // user agent
    UA: undefined
  };

  var glob =
    typeof global !== 'undefined'
      ? global
      : typeof window !== 'undefined'
        ? window
        : typeof WorkerGlobalScope !== 'undefined'
          ? self
          : {};

  Konva.UA = Konva._parseUA((glob.navigator && glob.navigator.userAgent) || '');

  if (glob.Konva) {
    console.error(
      'Konva instance is already exist in current eviroment. ' +
        'Please use only one instance.'
    );
  }
  glob.Konva = Konva;
  Konva.global = glob;
  Konva.window = glob;
  Konva.document = glob.document;

  if (true) {
    module.exports = Konva;
  } else {}
})();

/*eslint-disable  eqeqeq, no-cond-assign, no-empty*/
(function() {
  'use strict';
  /**
   * Collection constructor.  Collection extends
   *  Array.  This class is used in conjunction with {@link Konva.Container#get}
   * @constructor
   * @memberof Konva
   */
  Konva.Collection = function() {
    var args = [].slice.call(arguments),
      length = args.length,
      i = 0;

    this.length = length;
    for (; i < length; i++) {
      this[i] = args[i];
    }
    return this;
  };
  Konva.Collection.prototype = [];
  /**
   * iterate through node array and run a function for each node.
   *  The node and index is passed into the function
   * @method
   * @memberof Konva.Collection.prototype
   * @param {Function} func
   * @example
   * // get all nodes with name foo inside layer, and set x to 10 for each
   * layer.get('.foo').each(function(shape, n) {
   *   shape.setX(10);
   * });
   */
  Konva.Collection.prototype.each = function(func) {
    for (var n = 0; n < this.length; n++) {
      func(this[n], n);
    }
  };
  /**
   * convert collection into an array
   * @method
   * @memberof Konva.Collection.prototype
   */
  Konva.Collection.prototype.toArray = function() {
    var arr = [],
      len = this.length,
      n;

    for (n = 0; n < len; n++) {
      arr.push(this[n]);
    }
    return arr;
  };
  /**
   * convert array into a collection
   * @method
   * @memberof Konva.Collection
   * @param {Array} arr
   */
  Konva.Collection.toCollection = function(arr) {
    var collection = new Konva.Collection(),
      len = arr.length,
      n;

    for (n = 0; n < len; n++) {
      collection.push(arr[n]);
    }
    return collection;
  };

  // map one method by it's name
  Konva.Collection._mapMethod = function(methodName) {
    Konva.Collection.prototype[methodName] = function() {
      var len = this.length,
        i;

      var args = [].slice.call(arguments);
      for (i = 0; i < len; i++) {
        this[i][methodName].apply(this[i], args);
      }

      return this;
    };
  };

  Konva.Collection.mapMethods = function(constructor) {
    var prot = constructor.prototype;
    for (var methodName in prot) {
      Konva.Collection._mapMethod(methodName);
    }
  };

  /*
    * Last updated November 2011
    * By Simon Sarris
    * www.simonsarris.com
    * sarris@acm.org
    *
    * Free to use and distribute at will
    * So long as you are nice to people, etc
    */

  /*
    * The usage of this class was inspired by some of the work done by a forked
    * project, KineticJS-Ext by Wappworks, which is based on Simon's Transform
    * class.  Modified by Eric Rowell
    */

  /**
   * Transform constructor. Transform object is a private class of Konva framework.
   * In most of the cases you don't need to use it in your app.
   * But there is a documentation for that class in case you still want
   * to make some manual calculations.
   * @constructor
   * @param {Array} [m] Optional six-element matrix
   * @memberof Konva
   */
  Konva.Transform = function(m) {
    this.m = (m && m.slice()) || [1, 0, 0, 1, 0, 0];
  };

  Konva.Transform.prototype = {
    /**
     * Copy Konva.Transform object
     * @method
     * @memberof Konva.Transform.prototype
     * @returns {Konva.Transform}
     */
    copy: function() {
      return new Konva.Transform(this.m);
    },
    /**
     * Transform point
     * @method
     * @memberof Konva.Transform.prototype
     * @param {Object} point 2D point(x, y)
     * @returns {Object} 2D point(x, y)
     */
    point: function(point) {
      var m = this.m;
      return {
        x: m[0] * point.x + m[2] * point.y + m[4],
        y: m[1] * point.x + m[3] * point.y + m[5]
      };
    },
    /**
     * Apply translation
     * @method
     * @memberof Konva.Transform.prototype
     * @param {Number} x
     * @param {Number} y
     * @returns {Konva.Transform}
     */
    translate: function(x, y) {
      this.m[4] += this.m[0] * x + this.m[2] * y;
      this.m[5] += this.m[1] * x + this.m[3] * y;
      return this;
    },
    /**
     * Apply scale
     * @method
     * @memberof Konva.Transform.prototype
     * @param {Number} sx
     * @param {Number} sy
     * @returns {Konva.Transform}
     */
    scale: function(sx, sy) {
      this.m[0] *= sx;
      this.m[1] *= sx;
      this.m[2] *= sy;
      this.m[3] *= sy;
      return this;
    },
    /**
     * Apply rotation
     * @method
     * @memberof Konva.Transform.prototype
     * @param {Number} rad  Angle in radians
     * @returns {Konva.Transform}
     */
    rotate: function(rad) {
      var c = Math.cos(rad);
      var s = Math.sin(rad);
      var m11 = this.m[0] * c + this.m[2] * s;
      var m12 = this.m[1] * c + this.m[3] * s;
      var m21 = this.m[0] * -s + this.m[2] * c;
      var m22 = this.m[1] * -s + this.m[3] * c;
      this.m[0] = m11;
      this.m[1] = m12;
      this.m[2] = m21;
      this.m[3] = m22;
      return this;
    },
    /**
     * Returns the translation
     * @method
     * @memberof Konva.Transform.prototype
     * @returns {Object} 2D point(x, y)
     */
    getTranslation: function() {
      return {
        x: this.m[4],
        y: this.m[5]
      };
    },
    /**
     * Apply skew
     * @method
     * @memberof Konva.Transform.prototype
     * @param {Number} sx
     * @param {Number} sy
     * @returns {Konva.Transform}
     */
    skew: function(sx, sy) {
      var m11 = this.m[0] + this.m[2] * sy;
      var m12 = this.m[1] + this.m[3] * sy;
      var m21 = this.m[2] + this.m[0] * sx;
      var m22 = this.m[3] + this.m[1] * sx;
      this.m[0] = m11;
      this.m[1] = m12;
      this.m[2] = m21;
      this.m[3] = m22;
      return this;
    },
    /**
     * Transform multiplication
     * @method
     * @memberof Konva.Transform.prototype
     * @param {Konva.Transform} matrix
     * @returns {Konva.Transform}
     */
    multiply: function(matrix) {
      var m11 = this.m[0] * matrix.m[0] + this.m[2] * matrix.m[1];
      var m12 = this.m[1] * matrix.m[0] + this.m[3] * matrix.m[1];

      var m21 = this.m[0] * matrix.m[2] + this.m[2] * matrix.m[3];
      var m22 = this.m[1] * matrix.m[2] + this.m[3] * matrix.m[3];

      var dx = this.m[0] * matrix.m[4] + this.m[2] * matrix.m[5] + this.m[4];
      var dy = this.m[1] * matrix.m[4] + this.m[3] * matrix.m[5] + this.m[5];

      this.m[0] = m11;
      this.m[1] = m12;
      this.m[2] = m21;
      this.m[3] = m22;
      this.m[4] = dx;
      this.m[5] = dy;
      return this;
    },
    /**
     * Invert the matrix
     * @method
     * @memberof Konva.Transform.prototype
     * @returns {Konva.Transform}
     */
    invert: function() {
      var d = 1 / (this.m[0] * this.m[3] - this.m[1] * this.m[2]);
      var m0 = this.m[3] * d;
      var m1 = -this.m[1] * d;
      var m2 = -this.m[2] * d;
      var m3 = this.m[0] * d;
      var m4 = d * (this.m[2] * this.m[5] - this.m[3] * this.m[4]);
      var m5 = d * (this.m[1] * this.m[4] - this.m[0] * this.m[5]);
      this.m[0] = m0;
      this.m[1] = m1;
      this.m[2] = m2;
      this.m[3] = m3;
      this.m[4] = m4;
      this.m[5] = m5;
      return this;
    },
    /**
     * return matrix
     * @method
     * @memberof Konva.Transform.prototype
     */
    getMatrix: function() {
      return this.m;
    },
    /**
     * set to absolute position via translation
     * @method
     * @memberof Konva.Transform.prototype
     * @returns {Konva.Transform}
     * @author ericdrowell
     */
    setAbsolutePosition: function(x, y) {
      var m0 = this.m[0],
        m1 = this.m[1],
        m2 = this.m[2],
        m3 = this.m[3],
        m4 = this.m[4],
        m5 = this.m[5],
        yt = (m0 * (y - m5) - m1 * (x - m4)) / (m0 * m3 - m1 * m2),
        xt = (x - m4 - m2 * yt) / m0;

      return this.translate(xt, yt);
    }
  };

  // CONSTANTS
  var CONTEXT_2D = '2d',
    OBJECT_ARRAY = '[object Array]',
    OBJECT_NUMBER = '[object Number]',
    OBJECT_STRING = '[object String]',
    OBJECT_BOOLEAN = '[object Boolean]',
    PI_OVER_DEG180 = Math.PI / 180,
    DEG180_OVER_PI = 180 / Math.PI,
    HASH = '#',
    EMPTY_STRING = '',
    ZERO = '0',
    KONVA_WARNING = 'Konva warning: ',
    KONVA_ERROR = 'Konva error: ',
    RGB_PAREN = 'rgb(',
    COLORS = {
      aliceblue: [240, 248, 255],
      antiquewhite: [250, 235, 215],
      aqua: [0, 255, 255],
      aquamarine: [127, 255, 212],
      azure: [240, 255, 255],
      beige: [245, 245, 220],
      bisque: [255, 228, 196],
      black: [0, 0, 0],
      blanchedalmond: [255, 235, 205],
      blue: [0, 0, 255],
      blueviolet: [138, 43, 226],
      brown: [165, 42, 42],
      burlywood: [222, 184, 135],
      cadetblue: [95, 158, 160],
      chartreuse: [127, 255, 0],
      chocolate: [210, 105, 30],
      coral: [255, 127, 80],
      cornflowerblue: [100, 149, 237],
      cornsilk: [255, 248, 220],
      crimson: [220, 20, 60],
      cyan: [0, 255, 255],
      darkblue: [0, 0, 139],
      darkcyan: [0, 139, 139],
      darkgoldenrod: [184, 132, 11],
      darkgray: [169, 169, 169],
      darkgreen: [0, 100, 0],
      darkgrey: [169, 169, 169],
      darkkhaki: [189, 183, 107],
      darkmagenta: [139, 0, 139],
      darkolivegreen: [85, 107, 47],
      darkorange: [255, 140, 0],
      darkorchid: [153, 50, 204],
      darkred: [139, 0, 0],
      darksalmon: [233, 150, 122],
      darkseagreen: [143, 188, 143],
      darkslateblue: [72, 61, 139],
      darkslategray: [47, 79, 79],
      darkslategrey: [47, 79, 79],
      darkturquoise: [0, 206, 209],
      darkviolet: [148, 0, 211],
      deeppink: [255, 20, 147],
      deepskyblue: [0, 191, 255],
      dimgray: [105, 105, 105],
      dimgrey: [105, 105, 105],
      dodgerblue: [30, 144, 255],
      firebrick: [178, 34, 34],
      floralwhite: [255, 255, 240],
      forestgreen: [34, 139, 34],
      fuchsia: [255, 0, 255],
      gainsboro: [220, 220, 220],
      ghostwhite: [248, 248, 255],
      gold: [255, 215, 0],
      goldenrod: [218, 165, 32],
      gray: [128, 128, 128],
      green: [0, 128, 0],
      greenyellow: [173, 255, 47],
      grey: [128, 128, 128],
      honeydew: [240, 255, 240],
      hotpink: [255, 105, 180],
      indianred: [205, 92, 92],
      indigo: [75, 0, 130],
      ivory: [255, 255, 240],
      khaki: [240, 230, 140],
      lavender: [230, 230, 250],
      lavenderblush: [255, 240, 245],
      lawngreen: [124, 252, 0],
      lemonchiffon: [255, 250, 205],
      lightblue: [173, 216, 230],
      lightcoral: [240, 128, 128],
      lightcyan: [224, 255, 255],
      lightgoldenrodyellow: [250, 250, 210],
      lightgray: [211, 211, 211],
      lightgreen: [144, 238, 144],
      lightgrey: [211, 211, 211],
      lightpink: [255, 182, 193],
      lightsalmon: [255, 160, 122],
      lightseagreen: [32, 178, 170],
      lightskyblue: [135, 206, 250],
      lightslategray: [119, 136, 153],
      lightslategrey: [119, 136, 153],
      lightsteelblue: [176, 196, 222],
      lightyellow: [255, 255, 224],
      lime: [0, 255, 0],
      limegreen: [50, 205, 50],
      linen: [250, 240, 230],
      magenta: [255, 0, 255],
      maroon: [128, 0, 0],
      mediumaquamarine: [102, 205, 170],
      mediumblue: [0, 0, 205],
      mediumorchid: [186, 85, 211],
      mediumpurple: [147, 112, 219],
      mediumseagreen: [60, 179, 113],
      mediumslateblue: [123, 104, 238],
      mediumspringgreen: [0, 250, 154],
      mediumturquoise: [72, 209, 204],
      mediumvioletred: [199, 21, 133],
      midnightblue: [25, 25, 112],
      mintcream: [245, 255, 250],
      mistyrose: [255, 228, 225],
      moccasin: [255, 228, 181],
      navajowhite: [255, 222, 173],
      navy: [0, 0, 128],
      oldlace: [253, 245, 230],
      olive: [128, 128, 0],
      olivedrab: [107, 142, 35],
      orange: [255, 165, 0],
      orangered: [255, 69, 0],
      orchid: [218, 112, 214],
      palegoldenrod: [238, 232, 170],
      palegreen: [152, 251, 152],
      paleturquoise: [175, 238, 238],
      palevioletred: [219, 112, 147],
      papayawhip: [255, 239, 213],
      peachpuff: [255, 218, 185],
      peru: [205, 133, 63],
      pink: [255, 192, 203],
      plum: [221, 160, 203],
      powderblue: [176, 224, 230],
      purple: [128, 0, 128],
      rebeccapurple: [102, 51, 153],
      red: [255, 0, 0],
      rosybrown: [188, 143, 143],
      royalblue: [65, 105, 225],
      saddlebrown: [139, 69, 19],
      salmon: [250, 128, 114],
      sandybrown: [244, 164, 96],
      seagreen: [46, 139, 87],
      seashell: [255, 245, 238],
      sienna: [160, 82, 45],
      silver: [192, 192, 192],
      skyblue: [135, 206, 235],
      slateblue: [106, 90, 205],
      slategray: [119, 128, 144],
      slategrey: [119, 128, 144],
      snow: [255, 255, 250],
      springgreen: [0, 255, 127],
      steelblue: [70, 130, 180],
      tan: [210, 180, 140],
      teal: [0, 128, 128],
      thistle: [216, 191, 216],
      transparent: [255, 255, 255, 0],
      tomato: [255, 99, 71],
      turquoise: [64, 224, 208],
      violet: [238, 130, 238],
      wheat: [245, 222, 179],
      white: [255, 255, 255],
      whitesmoke: [245, 245, 245],
      yellow: [255, 255, 0],
      yellowgreen: [154, 205, 5]
    },
    RGB_REGEX = /rgb\((\d{1,3}),(\d{1,3}),(\d{1,3})\)/;

  /**
   * @namespace Util
   * @memberof Konva
   */
  Konva.Util = {
    /*
    * cherry-picked utilities from underscore.js
    */
    _isElement: function(obj) {
      return !!(obj && obj.nodeType == 1);
    },
    _isFunction: function(obj) {
      return !!(obj && obj.constructor && obj.call && obj.apply);
    },
    _isObject: function(obj) {
      return !!obj && obj.constructor === Object;
    },
    _isArray: function(obj) {
      return Object.prototype.toString.call(obj) === OBJECT_ARRAY;
    },
    _isNumber: function(obj) {
      return (
        Object.prototype.toString.call(obj) === OBJECT_NUMBER &&
        !isNaN(obj) &&
        isFinite(obj)
      );
    },
    _isString: function(obj) {
      return Object.prototype.toString.call(obj) === OBJECT_STRING;
    },
    _isBoolean: function(obj) {
      return Object.prototype.toString.call(obj) === OBJECT_BOOLEAN;
    },
    // arrays are objects too
    isObject: function(val) {
      return val instanceof Object;
    },
    isValidSelector: function(selector) {
      if (typeof selector !== 'string') {
        return false;
      }
      var firstChar = selector[0];
      return (
        firstChar === '#' ||
        firstChar === '.' ||
        firstChar === firstChar.toUpperCase()
      );
    },
    _sign: function(number) {
      if (number === 0) {
        return 0;
      }
      if (number > 0) {
        return 1;
      } else {
        return -1;
      }
    },
    createCanvasElement: function() {
      var canvas = Konva.isBrowser
        ? Konva.document.createElement('canvas')
        : new Konva._nodeCanvas();
      // on some environments canvas.style is readonly
      try {
        canvas.style = canvas.style || {};
      } catch (e) {}
      return canvas;
    },
    _isInDocument: function(el) {
      while ((el = el.parentNode)) {
        if (el == Konva.document) {
          return true;
        }
      }
      return false;
    },
    _simplifyArray: function(arr) {
      var retArr = [],
        len = arr.length,
        util = Konva.Util,
        n,
        val;

      for (n = 0; n < len; n++) {
        val = arr[n];
        if (util._isNumber(val)) {
          val = Math.round(val * 1000) / 1000;
        } else if (!util._isString(val)) {
          val = val.toString();
        }

        retArr.push(val);
      }

      return retArr;
    },
    /*
    * arg can be an image object or image data
    */
    _getImage: function(arg, callback) {
      var imageObj, canvas;

      // if arg is null or undefined
      if (!arg) {
        callback(null);
      } else if (this._isElement(arg)) {
        // if arg is already an image object
        callback(arg);
      } else if (this._isString(arg)) {
        // if arg is a string, then it's a data url
        imageObj = new Konva.window.Image();
        imageObj.onload = function() {
          callback(imageObj);
        };
        imageObj.src = arg;
      } else if (arg.data) {
        //if arg is an object that contains the data property, it's an image object
        canvas = Konva.Util.createCanvasElement();
        canvas.width = arg.width;
        canvas.height = arg.height;
        var _context = canvas.getContext(CONTEXT_2D);
        _context.putImageData(arg, 0, 0);
        this._getImage(canvas.toDataURL(), callback);
      } else {
        callback(null);
      }
    },
    _getRGBAString: function(obj) {
      var red = obj.red || 0,
        green = obj.green || 0,
        blue = obj.blue || 0,
        alpha = obj.alpha || 1;

      return ['rgba(', red, ',', green, ',', blue, ',', alpha, ')'].join(
        EMPTY_STRING
      );
    },
    _rgbToHex: function(r, g, b) {
      return ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
    },
    _hexToRgb: function(hex) {
      hex = hex.replace(HASH, EMPTY_STRING);
      var bigint = parseInt(hex, 16);
      return {
        r: (bigint >> 16) & 255,
        g: (bigint >> 8) & 255,
        b: bigint & 255
      };
    },
    /**
     * return random hex color
     * @method
     * @memberof Konva.Util.prototype
     */
    getRandomColor: function() {
      var randColor = ((Math.random() * 0xffffff) << 0).toString(16);
      while (randColor.length < 6) {
        randColor = ZERO + randColor;
      }
      return HASH + randColor;
    },
    /**
     * return value with default fallback
     * @method
     * @memberof Konva.Util.prototype
     */
    get: function(val, def) {
      if (val === undefined) {
        return def;
      } else {
        return val;
      }
    },
    /**
     * get RGB components of a color
     * @method
     * @memberof Konva.Util.prototype
     * @param {String} color
     * @example
     * // each of the following examples return {r:0, g:0, b:255}
     * var rgb = Konva.Util.getRGB('blue');
     * var rgb = Konva.Util.getRGB('#0000ff');
     * var rgb = Konva.Util.getRGB('rgb(0,0,255)');
     */
    getRGB: function(color) {
      var rgb;
      // color string
      if (color in COLORS) {
        rgb = COLORS[color];
        return {
          r: rgb[0],
          g: rgb[1],
          b: rgb[2]
        };
      } else if (color[0] === HASH) {
        // hex
        return this._hexToRgb(color.substring(1));
      } else if (color.substr(0, 4) === RGB_PAREN) {
        // rgb string
        rgb = RGB_REGEX.exec(color.replace(/ /g, ''));
        return {
          r: parseInt(rgb[1], 10),
          g: parseInt(rgb[2], 10),
          b: parseInt(rgb[3], 10)
        };
      } else {
        // default
        return {
          r: 0,
          g: 0,
          b: 0
        };
      }
    },
    // convert any color string to RGBA object
    // from https://github.com/component/color-parser
    colorToRGBA: function(str) {
      str = str || 'black';
      return (
        Konva.Util._namedColorToRBA(str) ||
        Konva.Util._hex3ColorToRGBA(str) ||
        Konva.Util._hex6ColorToRGBA(str) ||
        Konva.Util._rgbColorToRGBA(str) ||
        Konva.Util._rgbaColorToRGBA(str)
      );
    },
    // Parse named css color. Like "green"
    _namedColorToRBA: function(str) {
      var c = COLORS[str.toLowerCase()];
      if (!c) {
        return null;
      }
      return {
        r: c[0],
        g: c[1],
        b: c[2],
        a: 1
      };
    },
    // Parse rgb(n, n, n)
    _rgbColorToRGBA: function(str) {
      if (str.indexOf('rgb(') === 0) {
        str = str.match(/rgb\(([^)]+)\)/)[1];
        var parts = str.split(/ *, */).map(Number);
        return {
          r: parts[0],
          g: parts[1],
          b: parts[2],
          a: 1
        };
      }
    },
    // Parse rgba(n, n, n, n)
    _rgbaColorToRGBA: function(str) {
      if (str.indexOf('rgba(') === 0) {
        str = str.match(/rgba\(([^)]+)\)/)[1];
        var parts = str.split(/ *, */).map(Number);
        return {
          r: parts[0],
          g: parts[1],
          b: parts[2],
          a: parts[3]
        };
      }
    },
    // Parse #nnnnnn
    _hex6ColorToRGBA: function(str) {
      if (str[0] === '#' && str.length === 7) {
        return {
          r: parseInt(str.slice(1, 3), 16),
          g: parseInt(str.slice(3, 5), 16),
          b: parseInt(str.slice(5, 7), 16),
          a: 1
        };
      }
    },
    // Parse #nnn
    _hex3ColorToRGBA: function(str) {
      if (str[0] === '#' && str.length === 4) {
        return {
          r: parseInt(str[1] + str[1], 16),
          g: parseInt(str[2] + str[2], 16),
          b: parseInt(str[3] + str[3], 16),
          a: 1
        };
      }
    },
    // o1 takes precedence over o2
    _merge: function(o1, o2) {
      var retObj = this._clone(o2);
      for (var key in o1) {
        if (this._isObject(o1[key])) {
          retObj[key] = this._merge(o1[key], retObj[key]);
        } else {
          retObj[key] = o1[key];
        }
      }
      return retObj;
    },
    trimRight: function(str) {
      return str.replace(/\s+$/, '');
    },
    trimLeft: function(str) {
      return str.replace(/^\s+/, '');
    },
    /**
     * check intersection of two client rectangles
     * @method
     * @memberof Konva.Util.prototype
     */
    haveIntersection: function(r1, r2) {
      return !(
        r2.x > r1.x + r1.width ||
        r2.x + r2.width < r1.x ||
        r2.y > r1.y + r1.height ||
        r2.y + r2.height < r1.y
      );
    },
    cloneObject: function(obj) {
      var retObj = {};
      for (var key in obj) {
        if (this._isObject(obj[key])) {
          retObj[key] = this.cloneObject(obj[key]);
        } else if (this._isArray(obj[key])) {
          retObj[key] = this.cloneArray(obj[key]);
        } else {
          retObj[key] = obj[key];
        }
      }
      return retObj;
    },
    cloneArray: function(arr) {
      return arr.slice(0);
    },
    _degToRad: function(deg) {
      return deg * PI_OVER_DEG180;
    },
    _radToDeg: function(rad) {
      return rad * DEG180_OVER_PI;
    },
    _capitalize: function(str) {
      return str.charAt(0).toUpperCase() + str.slice(1);
    },
    throw: function(str) {
      throw new Error(KONVA_ERROR + str);
    },
    error: function(str) {
      console.error(KONVA_ERROR + str);
    },
    warn: function(str) {
      /*
             * IE9 on Windows7 64bit will throw a JS error
             * if we don't use window.console in the conditional
             */
      if (Konva.global.console && console.warn && Konva.showWarnings) {
        console.warn(KONVA_WARNING + str);
      }
    },
    extend: function(child, parent) {
      function Ctor() {
        this.constructor = child;
      }
      Ctor.prototype = parent.prototype;
      var oldProto = child.prototype;
      child.prototype = new Ctor();
      for (var key in oldProto) {
        if (oldProto.hasOwnProperty(key)) {
          child.prototype[key] = oldProto[key];
        }
      }
      child.__super__ = parent.prototype;
      // create reference to parent
      child.super = parent;
    },
    /**
     * adds methods to a constructor prototype
     * @method
     * @memberof Konva.Util.prototype
     * @param {Function} constructor
     * @param {Object} methods
     */
    addMethods: function(constructor, methods) {
      var key;

      for (key in methods) {
        constructor.prototype[key] = methods[key];
      }
    },
    _getControlPoints: function(x0, y0, x1, y1, x2, y2, t) {
      var d01 = Math.sqrt(Math.pow(x1 - x0, 2) + Math.pow(y1 - y0, 2)),
        d12 = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2)),
        fa = t * d01 / (d01 + d12),
        fb = t * d12 / (d01 + d12),
        p1x = x1 - fa * (x2 - x0),
        p1y = y1 - fa * (y2 - y0),
        p2x = x1 + fb * (x2 - x0),
        p2y = y1 + fb * (y2 - y0);

      return [p1x, p1y, p2x, p2y];
    },
    _expandPoints: function(p, tension) {
      var len = p.length,
        allPoints = [],
        n,
        cp;

      for (n = 2; n < len - 2; n += 2) {
        cp = Konva.Util._getControlPoints(
          p[n - 2],
          p[n - 1],
          p[n],
          p[n + 1],
          p[n + 2],
          p[n + 3],
          tension
        );
        allPoints.push(cp[0]);
        allPoints.push(cp[1]);
        allPoints.push(p[n]);
        allPoints.push(p[n + 1]);
        allPoints.push(cp[2]);
        allPoints.push(cp[3]);
      }

      return allPoints;
    },
    _removeLastLetter: function(str) {
      return str.substring(0, str.length - 1);
    },
    each: function(obj, func) {
      for (var key in obj) {
        func(key, obj[key]);
      }
    },
    _inRange: function(val, left, right) {
      return left <= val && val < right;
    },
    _getProjectionToSegment: function(x1, y1, x2, y2, x3, y3) {
      var x, y, dist;

      var pd2 = (x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2);
      if (pd2 == 0) {
        x = x1;
        y = y1;
        dist = (x3 - x2) * (x3 - x2) + (y3 - y2) * (y3 - y2);
      } else {
        var u = ((x3 - x1) * (x2 - x1) + (y3 - y1) * (y2 - y1)) / pd2;
        if (u < 0) {
          x = x1;
          y = y1;
          dist = (x1 - x3) * (x1 - x3) + (y1 - y3) * (y1 - y3);
        } else if (u > 1.0) {
          x = x2;
          y = y2;
          dist = (x2 - x3) * (x2 - x3) + (y2 - y3) * (y2 - y3);
        } else {
          x = x1 + u * (x2 - x1);
          y = y1 + u * (y2 - y1);
          dist = (x - x3) * (x - x3) + (y - y3) * (y - y3);
        }
      }
      return [x, y, dist];
    },
    // line as array of points.
    // line might be closed
    _getProjectionToLine: function(pt, line, isClosed) {
      var pc = Konva.Util.cloneObject(pt);
      var dist = Number.MAX_VALUE;
      line.forEach(function(p1, i) {
        if (!isClosed && i === line.length - 1) {
          return;
        }
        var p2 = line[(i + 1) % line.length];
        var proj = Konva.Util._getProjectionToSegment(
          p1.x,
          p1.y,
          p2.x,
          p2.y,
          pt.x,
          pt.y
        );
        var px = proj[0],
          py = proj[1],
          pdist = proj[2];
        if (pdist < dist) {
          pc.x = px;
          pc.y = py;
          dist = pdist;
        }
      });
      return pc;
    },
    _prepareArrayForTween: function(startArray, endArray, isClosed) {
      var n,
        start = [],
        end = [];
      if (startArray.length > endArray.length) {
        var temp = endArray;
        endArray = startArray;
        startArray = temp;
      }
      for (n = 0; n < startArray.length; n += 2) {
        start.push({
          x: startArray[n],
          y: startArray[n + 1]
        });
      }
      for (n = 0; n < endArray.length; n += 2) {
        end.push({
          x: endArray[n],
          y: endArray[n + 1]
        });
      }

      var newStart = [];
      end.forEach(function(point) {
        var pr = Konva.Util._getProjectionToLine(point, start, isClosed);
        newStart.push(pr.x);
        newStart.push(pr.y);
      });
      return newStart;
    },
    _prepareToStringify: function(obj) {
      var desc;

      obj.visitedByCircularReferenceRemoval = true;

      for (var key in obj) {
        if (
          !(obj.hasOwnProperty(key) && obj[key] && typeof obj[key] == 'object')
        ) {
          continue;
        }
        desc = Object.getOwnPropertyDescriptor(obj, key);
        if (
          obj[key].visitedByCircularReferenceRemoval ||
          Konva.Util._isElement(obj[key])
        ) {
          if (desc.configurable) {
            delete obj[key];
          } else {
            return null;
          }
        } else if (Konva.Util._prepareToStringify(obj[key]) === null) {
          if (desc.configurable) {
            delete obj[key];
          } else {
            return null;
          }
        }
      }

      delete obj.visitedByCircularReferenceRemoval;

      return obj;
    }
  };
})();

(function() {
  'use strict';
  // calculate pixel ratio

  var _pixelRatio;
  function getDevicePixelRatio() {
    if (_pixelRatio) {
      return _pixelRatio;
    }
    var canvas = Konva.Util.createCanvasElement();
    var context = canvas.getContext('2d');
    _pixelRatio = (function() {
      var devicePixelRatio = Konva.window.devicePixelRatio || 1,
        backingStoreRatio =
          context.webkitBackingStorePixelRatio ||
          context.mozBackingStorePixelRatio ||
          context.msBackingStorePixelRatio ||
          context.oBackingStorePixelRatio ||
          context.backingStorePixelRatio ||
          1;
      return devicePixelRatio / backingStoreRatio;
    })();
    return _pixelRatio;
  }

  /**
   * Canvas Renderer constructor
   * @constructor
   * @abstract
   * @memberof Konva
   * @param {Object} config
   * @param {Number} config.width
   * @param {Number} config.height
   * @param {Number} config.pixelRatio KonvaJS automatically handles pixel ratio adjustments in order to render crisp drawings
   *  on all devices. Most desktops, low end tablets, and low end phones, have device pixel ratios
   *  of 1.  Some high end tablets and phones, like iPhones and iPads (not the mini) have a device pixel ratio
   *  of 2.  Some Macbook Pros, and iMacs also have a device pixel ratio of 2.  Some high end Android devices have pixel
   *  ratios of 2 or 3.  Some browsers like Firefox allow you to configure the pixel ratio of the viewport.  Unless otherwise
   *  specified, the pixel ratio will be defaulted to the actual device pixel ratio.  You can override the device pixel
   *  ratio for special situations, or, if you don't want the pixel ratio to be taken into account, you can set it to 1.
   */
  Konva.Canvas = function(config) {
    this.init(config);
  };

  Konva.Canvas.prototype = {
    init: function(config) {
      var conf = config || {};

      var pixelRatio =
        conf.pixelRatio || Konva.pixelRatio || getDevicePixelRatio();

      this.pixelRatio = pixelRatio;
      this._canvas = Konva.Util.createCanvasElement();

      // set inline styles
      this._canvas.style.padding = 0;
      this._canvas.style.margin = 0;
      this._canvas.style.border = 0;
      this._canvas.style.background = 'transparent';
      this._canvas.style.position = 'absolute';
      this._canvas.style.top = 0;
      this._canvas.style.left = 0;
    },
    /**
     * get canvas context
     * @method
     * @memberof Konva.Canvas.prototype
     * @returns {CanvasContext} context
     */
    getContext: function() {
      return this.context;
    },
    /**
     * get pixel ratio
     * @method
     * @memberof Konva.Canvas.prototype
     * @returns {Number} pixel ratio
     */
    getPixelRatio: function() {
      return this.pixelRatio;
    },
    /**
     * get pixel ratio
     * @method
     * @memberof Konva.Canvas.prototype
     * @param {Number} pixelRatio KonvaJS automatically handles pixel ratio adustments in order to render crisp drawings
     *  on all devices. Most desktops, low end tablets, and low end phones, have device pixel ratios
     *  of 1.  Some high end tablets and phones, like iPhones and iPads have a device pixel ratio
     *  of 2.  Some Macbook Pros, and iMacs also have a device pixel ratio of 2.  Some high end Android devices have pixel
     *  ratios of 2 or 3.  Some browsers like Firefox allow you to configure the pixel ratio of the viewport.  Unless otherwise
     *  specificed, the pixel ratio will be defaulted to the actual device pixel ratio.  You can override the device pixel
     *  ratio for special situations, or, if you don't want the pixel ratio to be taken into account, you can set it to 1.
     */
    setPixelRatio: function(pixelRatio) {
      var previousRatio = this.pixelRatio;
      this.pixelRatio = pixelRatio;
      this.setSize(
        this.getWidth() / previousRatio,
        this.getHeight() / previousRatio
      );
    },
    /**
     * set width
     * @method
     * @memberof Konva.Canvas.prototype
     * @param {Number} width
     */
    setWidth: function(width) {
      // take into account pixel ratio
      this.width = this._canvas.width = width * this.pixelRatio;
      this._canvas.style.width = width + 'px';

      var pixelRatio = this.pixelRatio,
        _context = this.getContext()._context;
      _context.scale(pixelRatio, pixelRatio);
    },
    /**
     * set height
     * @method
     * @memberof Konva.Canvas.prototype
     * @param {Number} height
     */
    setHeight: function(height) {
      // take into account pixel ratio
      this.height = this._canvas.height = height * this.pixelRatio;
      this._canvas.style.height = height + 'px';
      var pixelRatio = this.pixelRatio,
        _context = this.getContext()._context;
      _context.scale(pixelRatio, pixelRatio);
    },
    /**
     * get width
     * @method
     * @memberof Konva.Canvas.prototype
     * @returns {Number} width
     */
    getWidth: function() {
      return this.width;
    },
    /**
     * get height
     * @method
     * @memberof Konva.Canvas.prototype
     * @returns {Number} height
     */
    getHeight: function() {
      return this.height;
    },
    /**
     * set size
     * @method
     * @memberof Konva.Canvas.prototype
     * @param {Number} width
     * @param {Number} height
     */
    setSize: function(width, height) {
      this.setWidth(width);
      this.setHeight(height);
    },
    /**
     * to data url
     * @method
     * @memberof Konva.Canvas.prototype
     * @param {String} mimeType
     * @param {Number} quality between 0 and 1 for jpg mime types
     * @returns {String} data url string
     */
    toDataURL: function(mimeType, quality) {
      try {
        // If this call fails (due to browser bug, like in Firefox 3.6),
        // then revert to previous no-parameter image/png behavior
        return this._canvas.toDataURL(mimeType, quality);
      } catch (e) {
        try {
          return this._canvas.toDataURL();
        } catch (err) {
          Konva.Util.warn('Unable to get data URL. ' + err.message);
          return '';
        }
      }
    }
  };

  Konva.SceneCanvas = function(config) {
    var conf = config || {};
    var width = conf.width || 0,
      height = conf.height || 0;

    Konva.Canvas.call(this, conf);
    this.context = new Konva.SceneContext(this);
    this.setSize(width, height);
  };

  Konva.Util.extend(Konva.SceneCanvas, Konva.Canvas);

  Konva.HitCanvas = function(config) {
    var conf = config || {};
    var width = conf.width || 0,
      height = conf.height || 0;

    Konva.Canvas.call(this, conf);
    this.context = new Konva.HitContext(this);
    this.setSize(width, height);
    this.hitCanvas = true;
  };
  Konva.Util.extend(Konva.HitCanvas, Konva.Canvas);
})();

(function() {
  'use strict';
  var COMMA = ',',
    OPEN_PAREN = '(',
    CLOSE_PAREN = ')',
    OPEN_PAREN_BRACKET = '([',
    CLOSE_BRACKET_PAREN = '])',
    SEMICOLON = ';',
    DOUBLE_PAREN = '()',
    // EMPTY_STRING = '',
    EQUALS = '=',
    // SET = 'set',
    CONTEXT_METHODS = [
      'arc',
      'arcTo',
      'beginPath',
      'bezierCurveTo',
      'clearRect',
      'clip',
      'closePath',
      'createLinearGradient',
      'createPattern',
      'createRadialGradient',
      'drawImage',
      'fill',
      'fillText',
      'getImageData',
      'createImageData',
      'lineTo',
      'moveTo',
      'putImageData',
      'quadraticCurveTo',
      'rect',
      'restore',
      'rotate',
      'save',
      'scale',
      'setLineDash',
      'setTransform',
      'stroke',
      'strokeText',
      'transform',
      'translate'
    ];

  var CONTEXT_PROPERTIES = [
    'fillStyle',
    'strokeStyle',
    'shadowColor',
    'shadowBlur',
    'shadowOffsetX',
    'shadowOffsetY',
    'lineCap',
    'lineDashOffset',
    'lineJoin',
    'lineWidth',
    'miterLimit',
    'font',
    'textAlign',
    'textBaseline',
    'globalAlpha',
    'globalCompositeOperation'
  ];

  /**
   * Canvas Context constructor
   * @constructor
   * @abstract
   * @memberof Konva
   */
  Konva.Context = function(canvas) {
    this.init(canvas);
  };

  Konva.Context.prototype = {
    init: function(canvas) {
      this.canvas = canvas;
      this._context = canvas._canvas.getContext('2d');

      if (Konva.enableTrace) {
        this.traceArr = [];
        this._enableTrace();
      }
    },
    /**
     * fill shape
     * @method
     * @memberof Konva.Context.prototype
     * @param {Konva.Shape} shape
     */
    fillShape: function(shape) {
      if (shape.getFillEnabled()) {
        this._fill(shape);
      }
    },
    /**
     * stroke shape
     * @method
     * @memberof Konva.Context.prototype
     * @param {Konva.Shape} shape
     */
    strokeShape: function(shape) {
      if (shape.getStrokeEnabled()) {
        this._stroke(shape);
      }
    },
    /**
     * fill then stroke
     * @method
     * @memberof Konva.Context.prototype
     * @param {Konva.Shape} shape
     */
    fillStrokeShape: function(shape) {
      var fillEnabled = shape.getFillEnabled();
      if (fillEnabled) {
        this._fill(shape);
      }
      if (shape.getStrokeEnabled()) {
        this._stroke(shape);
      }
    },
    /**
     * get context trace if trace is enabled
     * @method
     * @memberof Konva.Context.prototype
     * @param {Boolean} relaxed if false, return strict context trace, which includes method names, method parameters
     *  properties, and property values.  If true, return relaxed context trace, which only returns method names and
     *  properites.
     * @returns {String}
     */
    getTrace: function(relaxed) {
      var traceArr = this.traceArr,
        len = traceArr.length,
        str = '',
        n,
        trace,
        method,
        args;

      for (n = 0; n < len; n++) {
        trace = traceArr[n];
        method = trace.method;

        // methods
        if (method) {
          args = trace.args;
          str += method;
          if (relaxed) {
            str += DOUBLE_PAREN;
          } else {
            if (Konva.Util._isArray(args[0])) {
              str +=
                OPEN_PAREN_BRACKET + args.join(COMMA) + CLOSE_BRACKET_PAREN;
            } else {
              str += OPEN_PAREN + args.join(COMMA) + CLOSE_PAREN;
            }
          }
        } else {
          // properties
          str += trace.property;
          if (!relaxed) {
            str += EQUALS + trace.val;
          }
        }

        str += SEMICOLON;
      }

      return str;
    },
    /**
     * clear trace if trace is enabled
     * @method
     * @memberof Konva.Context.prototype
     */
    clearTrace: function() {
      this.traceArr = [];
    },
    _trace: function(str) {
      var traceArr = this.traceArr,
        len;

      traceArr.push(str);
      len = traceArr.length;

      if (len >= Konva.traceArrMax) {
        traceArr.shift();
      }
    },
    /**
     * reset canvas context transform
     * @method
     * @memberof Konva.Context.prototype
     */
    reset: function() {
      var pixelRatio = this.getCanvas().getPixelRatio();
      this.setTransform(1 * pixelRatio, 0, 0, 1 * pixelRatio, 0, 0);
    },
    /**
     * get canvas
     * @method
     * @memberof Konva.Context.prototype
     * @returns {Konva.Canvas}
     */
    getCanvas: function() {
      return this.canvas;
    },
    /**
     * clear canvas
     * @method
     * @memberof Konva.Context.prototype
     * @param {Object} [bounds]
     * @param {Number} [bounds.x]
     * @param {Number} [bounds.y]
     * @param {Number} [bounds.width]
     * @param {Number} [bounds.height]
     */
    clear: function(bounds) {
      var canvas = this.getCanvas();

      if (bounds) {
        this.clearRect(
          bounds.x || 0,
          bounds.y || 0,
          bounds.width || 0,
          bounds.height || 0
        );
      } else {
        this.clearRect(
          0,
          0,
          canvas.getWidth() / canvas.pixelRatio,
          canvas.getHeight() / canvas.pixelRatio
        );
      }
    },
    _applyLineCap: function(shape) {
      var lineCap = shape.getLineCap();
      if (lineCap) {
        this.setAttr('lineCap', lineCap);
      }
    },
    _applyOpacity: function(shape) {
      var absOpacity = shape.getAbsoluteOpacity();
      if (absOpacity !== 1) {
        this.setAttr('globalAlpha', absOpacity);
      }
    },
    _applyLineJoin: function(shape) {
      var lineJoin = shape.getLineJoin();
      if (lineJoin) {
        this.setAttr('lineJoin', lineJoin);
      }
    },
    setAttr: function(attr, val) {
      this._context[attr] = val;
    },

    // context pass through methods
    arc: function() {
      var a = arguments;
      this._context.arc(a[0], a[1], a[2], a[3], a[4], a[5]);
    },
    beginPath: function() {
      this._context.beginPath();
    },
    bezierCurveTo: function() {
      var a = arguments;
      this._context.bezierCurveTo(a[0], a[1], a[2], a[3], a[4], a[5]);
    },
    clearRect: function() {
      var a = arguments;
      this._context.clearRect(a[0], a[1], a[2], a[3]);
    },
    clip: function() {
      this._context.clip();
    },
    closePath: function() {
      this._context.closePath();
    },
    createImageData: function() {
      var a = arguments;
      if (a.length === 2) {
        return this._context.createImageData(a[0], a[1]);
      } else if (a.length === 1) {
        return this._context.createImageData(a[0]);
      }
    },
    createLinearGradient: function() {
      var a = arguments;
      return this._context.createLinearGradient(a[0], a[1], a[2], a[3]);
    },
    createPattern: function() {
      var a = arguments;
      return this._context.createPattern(a[0], a[1]);
    },
    createRadialGradient: function() {
      var a = arguments;
      return this._context.createRadialGradient(
        a[0],
        a[1],
        a[2],
        a[3],
        a[4],
        a[5]
      );
    },
    drawImage: function() {
      var a = arguments,
        _context = this._context;

      if (a.length === 3) {
        _context.drawImage(a[0], a[1], a[2]);
      } else if (a.length === 5) {
        _context.drawImage(a[0], a[1], a[2], a[3], a[4]);
      } else if (a.length === 9) {
        _context.drawImage(
          a[0],
          a[1],
          a[2],
          a[3],
          a[4],
          a[5],
          a[6],
          a[7],
          a[8]
        );
      }
    },
    isPointInPath: function(x, y) {
      return this._context.isPointInPath(x, y);
    },
    fill: function() {
      this._context.fill();
    },
    fillRect: function(x, y, width, height) {
      this._context.fillRect(x, y, width, height);
    },
    strokeRect: function(x, y, width, height) {
      this._context.strokeRect(x, y, width, height);
    },
    fillText: function() {
      var a = arguments;
      this._context.fillText(a[0], a[1], a[2]);
    },
    measureText: function(text) {
      return this._context.measureText(text);
    },
    getImageData: function() {
      var a = arguments;
      return this._context.getImageData(a[0], a[1], a[2], a[3]);
    },
    lineTo: function() {
      var a = arguments;
      this._context.lineTo(a[0], a[1]);
    },
    moveTo: function() {
      var a = arguments;
      this._context.moveTo(a[0], a[1]);
    },
    rect: function() {
      var a = arguments;
      this._context.rect(a[0], a[1], a[2], a[3]);
    },
    putImageData: function() {
      var a = arguments;
      this._context.putImageData(a[0], a[1], a[2]);
    },
    quadraticCurveTo: function() {
      var a = arguments;
      this._context.quadraticCurveTo(a[0], a[1], a[2], a[3]);
    },
    restore: function() {
      this._context.restore();
    },
    rotate: function() {
      var a = arguments;
      this._context.rotate(a[0]);
    },
    save: function() {
      this._context.save();
    },
    scale: function() {
      var a = arguments;
      this._context.scale(a[0], a[1]);
    },
    setLineDash: function() {
      var a = arguments,
        _context = this._context;

      // works for Chrome and IE11
      if (this._context.setLineDash) {
        _context.setLineDash(a[0]);
      } else if ('mozDash' in _context) {
        // verified that this works in firefox
        _context.mozDash = a[0];
      } else if ('webkitLineDash' in _context) {
        // does not currently work for Safari
        _context.webkitLineDash = a[0];
      }

      // no support for IE9 and IE10
    },
    getLineDash: function() {
      return this._context.getLineDash();
    },
    setTransform: function() {
      var a = arguments;
      this._context.setTransform(a[0], a[1], a[2], a[3], a[4], a[5]);
    },
    stroke: function() {
      this._context.stroke();
    },
    strokeText: function() {
      var a = arguments;
      this._context.strokeText(a[0], a[1], a[2]);
    },
    transform: function() {
      var a = arguments;
      this._context.transform(a[0], a[1], a[2], a[3], a[4], a[5]);
    },
    translate: function() {
      var a = arguments;
      this._context.translate(a[0], a[1]);
    },
    _enableTrace: function() {
      var that = this,
        len = CONTEXT_METHODS.length,
        _simplifyArray = Konva.Util._simplifyArray,
        origSetter = this.setAttr,
        n,
        args;

      // to prevent creating scope function at each loop
      var func = function(methodName) {
        var origMethod = that[methodName],
          ret;

        that[methodName] = function() {
          args = _simplifyArray(Array.prototype.slice.call(arguments, 0));
          ret = origMethod.apply(that, arguments);

          that._trace({
            method: methodName,
            args: args
          });

          return ret;
        };
      };
      // methods
      for (n = 0; n < len; n++) {
        func(CONTEXT_METHODS[n]);
      }

      // attrs
      that.setAttr = function() {
        origSetter.apply(that, arguments);
        var prop = arguments[0];
        var val = arguments[1];
        if (
          prop === 'shadowOffsetX' ||
          prop === 'shadowOffsetY' ||
          prop === 'shadowBlur'
        ) {
          val = val / this.canvas.getPixelRatio();
        }
        that._trace({
          property: prop,
          val: val
        });
      };
    }
  };

  CONTEXT_PROPERTIES.forEach(function(prop) {
    Object.defineProperty(Konva.Context.prototype, prop, {
      get: function() {
        return this._context[prop];
      },
      set: function(val) {
        this._context[prop] = val;
      }
    });
  });

  Konva.SceneContext = function(canvas) {
    Konva.Context.call(this, canvas);
  };

  Konva.SceneContext.prototype = {
    _fillColor: function(shape) {
      var fill = shape.fill();

      this.setAttr('fillStyle', fill);
      shape._fillFunc(this);
    },
    _fillPattern: function(shape) {
      var fillPatternX = shape.getFillPatternX(),
        fillPatternY = shape.getFillPatternY(),
        fillPatternScale = shape.getFillPatternScale(),
        fillPatternRotation = Konva.getAngle(shape.getFillPatternRotation()),
        fillPatternOffset = shape.getFillPatternOffset();

      if (fillPatternX || fillPatternY) {
        this.translate(fillPatternX || 0, fillPatternY || 0);
      }
      if (fillPatternRotation) {
        this.rotate(fillPatternRotation);
      }
      if (fillPatternScale) {
        this.scale(fillPatternScale.x, fillPatternScale.y);
      }
      if (fillPatternOffset) {
        this.translate(-1 * fillPatternOffset.x, -1 * fillPatternOffset.y);
      }

      this.setAttr(
        'fillStyle',
        this.createPattern(
          shape.getFillPatternImage(),
          shape.getFillPatternRepeat() || 'repeat'
        )
      );
      this.fill();
    },
    _fillLinearGradient: function(shape) {
      var start = shape.getFillLinearGradientStartPoint(),
        end = shape.getFillLinearGradientEndPoint(),
        colorStops = shape.getFillLinearGradientColorStops(),
        grd = this.createLinearGradient(start.x, start.y, end.x, end.y);

      if (colorStops) {
        // build color stops
        for (var n = 0; n < colorStops.length; n += 2) {
          grd.addColorStop(colorStops[n], colorStops[n + 1]);
        }
        this.setAttr('fillStyle', grd);
        shape._fillFunc(this);
      }
    },
    _fillRadialGradient: function(shape) {
      var start = shape.getFillRadialGradientStartPoint(),
        end = shape.getFillRadialGradientEndPoint(),
        startRadius = shape.getFillRadialGradientStartRadius(),
        endRadius = shape.getFillRadialGradientEndRadius(),
        colorStops = shape.getFillRadialGradientColorStops(),
        grd = this.createRadialGradient(
          start.x,
          start.y,
          startRadius,
          end.x,
          end.y,
          endRadius
        );

      // build color stops
      for (var n = 0; n < colorStops.length; n += 2) {
        grd.addColorStop(colorStops[n], colorStops[n + 1]);
      }
      this.setAttr('fillStyle', grd);
      this.fill();
    },
    _fill: function(shape) {
      var hasColor = shape.fill(),
        fillPriority = shape.getFillPriority();

      // priority fills
      if (hasColor && fillPriority === 'color') {
        this._fillColor(shape);
        return;
      }

      var hasPattern = shape.getFillPatternImage();
      if (hasPattern && fillPriority === 'pattern') {
        this._fillPattern(shape);
        return;
      }

      var hasLinearGradient = shape.getFillLinearGradientColorStops();
      if (hasLinearGradient && fillPriority === 'linear-gradient') {
        this._fillLinearGradient(shape);
        return;
      }

      var hasRadialGradient = shape.getFillRadialGradientColorStops();
      if (hasRadialGradient && fillPriority === 'radial-gradient') {
        this._fillRadialGradient(shape);
        return;
      }

      // now just try and fill with whatever is available
      if (hasColor) {
        this._fillColor(shape);
      } else if (hasPattern) {
        this._fillPattern(shape);
      } else if (hasLinearGradient) {
        this._fillLinearGradient(shape);
      } else if (hasRadialGradient) {
        this._fillRadialGradient(shape);
      }
    },
    _strokeLinearGradient: function(shape) {
      var start = shape.getStrokeLinearGradientStartPoint(),
        end = shape.getStrokeLinearGradientEndPoint(),
        colorStops = shape.getStrokeLinearGradientColorStops(),
        grd = this.createLinearGradient(start.x, start.y, end.x, end.y);

      if (colorStops) {
        // build color stops
        for (var n = 0; n < colorStops.length; n += 2) {
          grd.addColorStop(colorStops[n], colorStops[n + 1]);
        }
        this.setAttr('strokeStyle', grd);
      }
    },
    _stroke: function(shape) {
      var dash = shape.dash(),
        // ignore strokeScaleEnabled for Text
        strokeScaleEnabled =
          shape.getStrokeScaleEnabled() || shape instanceof Konva.Text;

      if (shape.hasStroke()) {
        if (!strokeScaleEnabled) {
          this.save();
          this.setTransform(1, 0, 0, 1, 0, 0);
        }

        this._applyLineCap(shape);
        if (dash && shape.dashEnabled()) {
          this.setLineDash(dash);
          this.setAttr('lineDashOffset', shape.dashOffset());
        }

        this.setAttr('lineWidth', shape.strokeWidth());

        if (!shape.getShadowForStrokeEnabled()) {
          this.setAttr('shadowColor', 'rgba(0,0,0,0)');
        }

        // TODO - do we need to make like a fill function?

        var hasLinearGradient = shape.getStrokeLinearGradientColorStops();
        if (hasLinearGradient) {
          this._strokeLinearGradient(shape);
        } else {
          this.setAttr('strokeStyle', shape.stroke());
        }

        shape._strokeFunc(this);

        if (!strokeScaleEnabled) {
          this.restore();
        }
      }
    },
    _applyShadow: function(shape) {
      var util = Konva.Util,
        color = util.get(shape.getShadowRGBA(), 'black'),
        blur = util.get(shape.getShadowBlur(), 5),
        offset = util.get(shape.getShadowOffset(), {
          x: 0,
          y: 0
        }),
        scale = shape.getAbsoluteScale(),
        ratio = this.canvas.getPixelRatio(),
        scaleX = scale.x * ratio,
        scaleY = scale.y * ratio;

      this.setAttr('shadowColor', color);
      this.setAttr(
        'shadowBlur',
        blur * Math.min(Math.abs(scaleX), Math.abs(scaleY))
      );
      this.setAttr('shadowOffsetX', offset.x * scaleX);
      this.setAttr('shadowOffsetY', offset.y * scaleY);
    },
    _applyGlobalCompositeOperation: function(shape) {
      var globalCompositeOperation = shape.getGlobalCompositeOperation();
      if (globalCompositeOperation !== 'source-over') {
        this.setAttr('globalCompositeOperation', globalCompositeOperation);
      }
    }
  };
  Konva.Util.extend(Konva.SceneContext, Konva.Context);

  Konva.HitContext = function(canvas) {
    Konva.Context.call(this, canvas);
  };

  Konva.HitContext.prototype = {
    _fill: function(shape) {
      this.save();
      this.setAttr('fillStyle', shape.colorKey);
      shape._fillFuncHit(this);
      this.restore();
    },
    _stroke: function(shape) {
      if (shape.hasStroke() && shape.strokeHitEnabled()) {
        // ignore strokeScaleEnabled for Text
        var strokeScaleEnabled =
          shape.getStrokeScaleEnabled() || shape instanceof Konva.Text;
        if (!strokeScaleEnabled) {
          this.save();
          this.setTransform(1, 0, 0, 1, 0, 0);
        }
        this._applyLineCap(shape);
        this.setAttr('lineWidth', shape.strokeWidth());
        this.setAttr('strokeStyle', shape.colorKey);
        shape._strokeFuncHit(this);
        if (!strokeScaleEnabled) {
          this.restore();
        }
      }
    }
  };
  Konva.Util.extend(Konva.HitContext, Konva.Context);
})();

(function() {
  'use strict';
  // CONSTANTS
  var GET = 'get',
    SET = 'set';

  Konva.Factory = {
    addGetterSetter: function(constructor, attr, def, validator, after) {
      this.addGetter(constructor, attr, def);
      this.addSetter(constructor, attr, validator, after);
      this.addOverloadedGetterSetter(constructor, attr);
    },
    addGetter: function(constructor, attr, def) {
      var method = GET + Konva.Util._capitalize(attr);

      constructor.prototype[method] = function() {
        var val = this.attrs[attr];
        return val === undefined ? def : val;
      };
    },
    addSetter: function(constructor, attr, validator, after) {
      // if (!validator && validator !== null) {
      //   console.error(constructor, attr, 'has no validator.');
      // }
      var method = SET + Konva.Util._capitalize(attr);

      constructor.prototype[method] = function(val) {
        if (validator && val !== undefined && val !== null) {
          val = validator.call(this, val, attr);
        }

        this._setAttr(attr, val);

        if (after) {
          after.call(this);
        }

        return this;
      };
    },
    addComponentsGetterSetter: function(
      constructor,
      attr,
      components,
      validator,
      after
    ) {
      var len = components.length,
        capitalize = Konva.Util._capitalize,
        getter = GET + capitalize(attr),
        setter = SET + capitalize(attr),
        n,
        component;

      // getter
      constructor.prototype[getter] = function() {
        var ret = {};

        for (n = 0; n < len; n++) {
          component = components[n];
          ret[component] = this.getAttr(attr + capitalize(component));
        }

        return ret;
      };

      // setter
      constructor.prototype[setter] = function(val) {
        var oldVal = this.attrs[attr],
          key;

        if (validator) {
          val = validator.call(this, val);
        }

        for (key in val) {
          if (!val.hasOwnProperty(key)) {
            continue;
          }
          this._setAttr(attr + capitalize(key), val[key]);
        }

        this._fireChangeEvent(attr, oldVal, val);

        if (after) {
          after.call(this);
        }

        return this;
      };

      this.addOverloadedGetterSetter(constructor, attr);
    },
    addOverloadedGetterSetter: function(constructor, attr) {
      var capitalizedAttr = Konva.Util._capitalize(attr),
        setter = SET + capitalizedAttr,
        getter = GET + capitalizedAttr;

      constructor.prototype[attr] = function() {
        // setting
        if (arguments.length) {
          this[setter](arguments[0]);
          return this;
        }
        // getting
        return this[getter]();
      };
    },
    addDeprecatedGetterSetter: function(constructor, attr, def, validator) {
      Konva.Util.error('Adding deprecated ' + attr);

      var method = GET + Konva.Util._capitalize(attr);

      var message =
        attr +
        ' property is deprecated and will be removed soon. Look at Konva change log for more information.';
      constructor.prototype[method] = function() {
        Konva.Util.error(message);
        var val = this.attrs[attr];
        return val === undefined ? def : val;
      };
      this.addSetter(constructor, attr, validator, function() {
        Konva.Util.error(message);
      });
      this.addOverloadedGetterSetter(constructor, attr);
    },
    backCompat: function(constructor, methods) {
      Konva.Util.each(methods, function(oldMethodName, newMethodName) {
        var method = constructor.prototype[newMethodName];
        var oldGetter = GET + Konva.Util._capitalize(oldMethodName);
        var oldSetter = SET + Konva.Util._capitalize(oldMethodName);

        function deprecated() {
          method.apply(this, arguments);
          Konva.Util.error(
            '"' +
              oldMethodName +
              '" method is deprecated and will be removed soon. Use ""' +
              newMethodName +
              '" instead.'
          );
        }

        constructor.prototype[oldMethodName] = deprecated;
        constructor.prototype[oldGetter] = deprecated;
        constructor.prototype[oldSetter] = deprecated;
      });
    },
    afterSetFilter: function() {
      this._filterUpToDate = false;
    }
  };

  Konva.Validators = {
    /**
     * @return {number}
     */
    RGBComponent: function(val) {
      if (val > 255) {
        return 255;
      } else if (val < 0) {
        return 0;
      }
      return Math.round(val);
    },
    alphaComponent: function(val) {
      if (val > 1) {
        return 1;
      } else if (val < 0.0001) {
        // chrome does not honor alpha values of 0
        return 0.0001;
      }

      return val;
    },
    _formatValue: function(val) {
      if (Konva.Util._isString(val)) {
        return '"' + val + '"';
      }
      if (Object.prototype.toString.call(val) === '[object Number]') {
        return val;
      }
      if (Konva.Util._isBoolean(val)) {
        return val;
      }
      return Object.prototype.toString.call(val);
    },
    getNumberValidator: function() {
      if (Konva.isUnminified) {
        return function(val, attr) {
          if (!Konva.Util._isNumber(val)) {
            Konva.Util.warn(
              Konva.Validators._formatValue(val) +
                ' is a not valid value for "' +
                attr +
                '" attribute. The value should be a number.'
            );
          }
          return val;
        };
      }
    },
    getNumberOrAutoValidator: function() {
      if (Konva.isUnminified) {
        return function(val, attr) {
          var isNumber = Konva.Util._isNumber(val);
          var isAuto = val === 'auto';

          if (!(isNumber || isAuto)) {
            Konva.Util.warn(
              Konva.Validators._formatValue(val) +
                ' is a not valid value for "' +
                attr +
                '" attribute. The value should be a number or "auto".'
            );
          }
          return val;
        };
      }
    },
    getStringValidator: function() {
      if (Konva.isUnminified) {
        return function(val, attr) {
          if (!Konva.Util._isString(val)) {
            Konva.Util.warn(
              Konva.Validators._formatValue(val) +
                ' is a not valid value for "' +
                attr +
                '" attribute. The value should be a string.'
            );
          }
          return val;
        };
      }
    },
    getFunctionValidator: function() {
      if (Konva.isUnminified) {
        return function(val, attr) {
          if (!Konva.Util._isFunction(val)) {
            Konva.Util.warn(
              Konva.Validators._formatValue(val) +
                ' is a not valid value for "' +
                attr +
                '" attribute. The value should be a function.'
            );
          }
          return val;
        };
      }
    },
    getNumberArrayValidator: function() {
      if (Konva.isUnminified) {
        return function(val, attr) {
          if (!Konva.Util._isArray(val)) {
            Konva.Util.warn(
              Konva.Validators._formatValue(val) +
                ' is a not valid value for "' +
                attr +
                '" attribute. The value should be a array of numbers.'
            );
          } else {
            val.forEach(function(item) {
              if (!Konva.Util._isNumber(item)) {
                Konva.Util.warn(
                  '"' +
                    attr +
                    '" attribute has non numeric element ' +
                    item +
                    '. Make sure that all elements are numbers.'
                );
              }
            });
          }
          return val;
        };
      }
    },
    getBooleanValidator: function() {
      if (Konva.isUnminified) {
        return function(val, attr) {
          var isBool = val === true || val === false;
          if (!isBool) {
            Konva.Util.warn(
              Konva.Validators._formatValue(val) +
                ' is a not valid value for "' +
                attr +
                '" attribute. The value should be a boolean.'
            );
          }
          return val;
        };
      }
    }
  };
})();

(function(Konva) {
  'use strict';
  // CONSTANTS
  var ABSOLUTE_OPACITY = 'absoluteOpacity',
    ABSOLUTE_TRANSFORM = 'absoluteTransform',
    ABSOLUTE_SCALE = 'absoluteScale',
    CHANGE = 'Change',
    CHILDREN = 'children',
    DOT = '.',
    EMPTY_STRING = '',
    GET = 'get',
    ID = 'id',
    KONVA = 'konva',
    LISTENING = 'listening',
    MOUSEENTER = 'mouseenter',
    MOUSELEAVE = 'mouseleave',
    NAME = 'name',
    SET = 'set',
    SHAPE = 'Shape',
    SPACE = ' ',
    STAGE = 'stage',
    TRANSFORM = 'transform',
    UPPER_STAGE = 'Stage',
    VISIBLE = 'visible',
    CLONE_BLACK_LIST = ['id'],
    TRANSFORM_CHANGE_STR = [
      'xChange.konva',
      'yChange.konva',
      'scaleXChange.konva',
      'scaleYChange.konva',
      'skewXChange.konva',
      'skewYChange.konva',
      'rotationChange.konva',
      'offsetXChange.konva',
      'offsetYChange.konva',
      'transformsEnabledChange.konva'
    ].join(SPACE),
    SCALE_CHANGE_STR = ['scaleXChange.konva', 'scaleYChange.konva'].join(SPACE);

  /**
   * Node constructor. Nodes are entities that can be transformed, layered,
   * and have bound events. The stage, layers, groups, and shapes all extend Node.
   * @constructor
   * @memberof Konva
   * @abstract
   * @param {Object} config
   * @param {Number} [config.x]
     * @param {Number} [config.y]
     * @param {Number} [config.width]
     * @param {Number} [config.height]
     * @param {Boolean} [config.visible]
     * @param {Boolean} [config.listening] whether or not the node is listening for events
     * @param {String} [config.id] unique id
     * @param {String} [config.name] non-unique name
     * @param {Number} [config.opacity] determines node opacity.  Can be any number between 0 and 1
     * @param {Object} [config.scale] set scale
     * @param {Number} [config.scaleX] set scale x
     * @param {Number} [config.scaleY] set scale y
     * @param {Number} [config.rotation] rotation in degrees
     * @param {Object} [config.offset] offset from center point and rotation point
     * @param {Number} [config.offsetX] set offset x
     * @param {Number} [config.offsetY] set offset y
     * @param {Boolean} [config.draggable] makes the node draggable.  When stages are draggable, you can drag and drop
     *  the entire stage by dragging any portion of the stage
     * @param {Number} [config.dragDistance]
     * @param {Function} [config.dragBoundFunc]
   */
  Konva.Node = function(config) {
    this._init(config);
  };

  Konva.Util.addMethods(Konva.Node, {
    _init: function(config) {
      this._id = Konva.idCounter++;
      this.eventListeners = {};
      this.attrs = {};
      this._cache = {};
      this._filterUpToDate = false;
      this._isUnderCache = false;
      this.setAttrs(config);

      // event bindings for cache handling
      this.on(TRANSFORM_CHANGE_STR, function() {
        this._clearCache(TRANSFORM);
        this._clearSelfAndDescendantCache(ABSOLUTE_TRANSFORM);
      });

      this.on(SCALE_CHANGE_STR, function() {
        this._clearSelfAndDescendantCache(ABSOLUTE_SCALE);
      });

      this.on('visibleChange.konva', function() {
        this._clearSelfAndDescendantCache(VISIBLE);
      });
      this.on('listeningChange.konva', function() {
        this._clearSelfAndDescendantCache(LISTENING);
      });
      this.on('opacityChange.konva', function() {
        this._clearSelfAndDescendantCache(ABSOLUTE_OPACITY);
      });
    },
    _clearCache: function(attr) {
      if (attr) {
        delete this._cache[attr];
      } else {
        this._cache = {};
      }
    },
    _getCache: function(attr, privateGetter) {
      var cache = this._cache[attr];

      // if not cached, we need to set it using the private getter method.
      if (cache === undefined) {
        this._cache[attr] = privateGetter.call(this);
      }

      return this._cache[attr];
    },
    /*
         * when the logic for a cached result depends on ancestor propagation, use this
         * method to clear self and children cache
         */
    _clearSelfAndDescendantCache: function(attr) {
      this._clearCache(attr);

      if (this.children) {
        this.getChildren().each(function(node) {
          node._clearSelfAndDescendantCache(attr);
        });
      }
    },
    /**
     * clear cached canvas
     * @method
     * @memberof Konva.Node.prototype
     * @returns {Konva.Node}
     * @example
     * node.clearCache();
     */
    clearCache: function() {
      delete this._cache.canvas;
      this._filterUpToDate = false;
      return this;
    },
    /**
     *  cache node to improve drawing performance, apply filters, or create more accurate
     *  hit regions. For all basic shapes size of cache canvas will be automatically detected.
     *  If you need to cache your custom `Konva.Shape` instance you have to pass shape's bounding box
     *  properties. Look at [https://konvajs.github.io/docs/performance/Shape_Caching.html](link to demo page) for more information.
     * @method
     * @memberof Konva.Node.prototype
     * @param {Object} [config]
     * @param {Number} [config.x]
     * @param {Number} [config.y]
     * @param {Number} [config.width]
     * @param {Number} [config.height]
     * @param {Number} [config.offset]  increase canvas size by `offset` pixel in all directions.
     * @param {Boolean} [config.drawBorder] when set to true, a red border will be drawn around the cached
     *  region for debugging purposes
     * @param {Number} [config.pixelRatio] change quality (or pixel ratio) of cached image. pixelRatio = 2 will produce 2x sized cache.
     * @returns {Konva.Node}
     * @example
     * // cache a shape with the x,y position of the bounding box at the center and
     * // the width and height of the bounding box equal to the width and height of
     * // the shape obtained from shape.width() and shape.height()
     * image.cache();
     *
     * // cache a node and define the bounding box position and size
     * node.cache({
     *   x: -30,
     *   y: -30,
     *   width: 100,
     *   height: 200
     * });
     *
     * // cache a node and draw a red border around the bounding box
     * // for debugging purposes
     * node.cache({
     *   x: -30,
     *   y: -30,
     *   width: 100,
     *   height: 200,
     *   offset : 10,
     *   drawBorder: true
     * });
     */
    cache: function(config) {
      var conf = config || {};
      var rect = {};

      // don't call getClientRect if we have all attributes
      // it means call it only if have one undefined
      if (
        conf.x === undefined ||
        conf.y === undefined ||
        conf.width === undefined ||
        conf.height === undefined
      ) {
        rect = this.getClientRect({
          skipTransform: true,
          relativeTo: this.getParent()
        });
      }
      var width = conf.width || rect.width,
        height = conf.height || rect.height,
        pixelRatio = conf.pixelRatio,
        x = conf.x === undefined ? rect.x : conf.x,
        y = conf.y === undefined ? rect.y : conf.y,
        offset = conf.offset || 0,
        drawBorder = conf.drawBorder || false;

      if (!width || !height) {
        Konva.Util.error(
          'Can not cache the node. Width or height of the node equals 0. Caching is skipped.'
        );
        return;
      }

      width += offset * 2;
      height += offset * 2;

      x -= offset;
      y -= offset;

      var cachedSceneCanvas = new Konva.SceneCanvas({
          pixelRatio: pixelRatio,
          width: width,
          height: height
        }),
        cachedFilterCanvas = new Konva.SceneCanvas({
          pixelRatio: pixelRatio,
          width: width,
          height: height
        }),
        cachedHitCanvas = new Konva.HitCanvas({
          pixelRatio: 1,
          width: width,
          height: height
        }),
        sceneContext = cachedSceneCanvas.getContext(),
        hitContext = cachedHitCanvas.getContext();

      cachedHitCanvas.isCache = true;

      this.clearCache();

      sceneContext.save();
      hitContext.save();

      sceneContext.translate(-x, -y);
      hitContext.translate(-x, -y);

      // extra flag to skip on getAbsolute opacity calc
      this._isUnderCache = true;
      this._clearSelfAndDescendantCache(ABSOLUTE_OPACITY);
      this._clearSelfAndDescendantCache(ABSOLUTE_SCALE);

      this.drawScene(cachedSceneCanvas, this, true);
      this.drawHit(cachedHitCanvas, this, true);
      this._isUnderCache = false;

      sceneContext.restore();
      hitContext.restore();

      // this will draw a red border around the cached box for
      // debugging purposes
      if (drawBorder) {
        sceneContext.save();
        sceneContext.beginPath();
        sceneContext.rect(0, 0, width, height);
        sceneContext.closePath();
        sceneContext.setAttr('strokeStyle', 'red');
        sceneContext.setAttr('lineWidth', 5);
        sceneContext.stroke();
        sceneContext.restore();
      }

      this._cache.canvas = {
        scene: cachedSceneCanvas,
        filter: cachedFilterCanvas,
        hit: cachedHitCanvas,
        x: x,
        y: y
      };

      return this;
    },
    /**
     * Return client rectangle {x, y, width, height} of node. This rectangle also include all styling (strokes, shadows, etc).
     * The rectangle position is relative to parent container.
     * @method
     * @memberof Konva.Node.prototype
     * @param {Object} config
     * @param {Boolean} [config.skipTransform] should we apply transform to node for calculating rect?
     * @param {Boolean} [config.skipShadow] should we apply shadow to the node for calculating bound box?
     * @param {Object} [config.relativeTo] calculate client rect relative to one of the parents
     * @returns {Object} rect with {x, y, width, height} properties
     * @example
     * var rect = new Konva.Rect({
     *      width : 100,
     *      height : 100,
     *      x : 50,
     *      y : 50,
     *      strokeWidth : 4,
     *      stroke : 'black',
     *      offsetX : 50,
     *      scaleY : 2
     * });
     *
     * // get client rect without think off transformations (position, rotation, scale, offset, etc)
     * rect.getClientRect({ skipTransform: true});
     * // returns {
     * //     x : -2,   // two pixels for stroke / 2
     * //     y : -2,
     * //     width : 104, // increased by 4 for stroke
     * //     height : 104
     * //}
     *
     * // get client rect with transformation applied
     * rect.getClientRect();
     * // returns Object {x: -2, y: 46, width: 104, height: 208}
     */
    getClientRect: function() {
      // abstract method
      // redefine in Container and Shape
      throw new Error('abstract "getClientRect" method call');
    },
    _transformedRect: function(rect, top) {
      var points = [
        { x: rect.x, y: rect.y },
        { x: rect.x + rect.width, y: rect.y },
        { x: rect.x + rect.width, y: rect.y + rect.height },
        { x: rect.x, y: rect.y + rect.height }
      ];
      var minX, minY, maxX, maxY;
      var trans = this.getAbsoluteTransform(top);
      points.forEach(function(point) {
        var transformed = trans.point(point);
        if (minX === undefined) {
          minX = maxX = transformed.x;
          minY = maxY = transformed.y;
        }
        minX = Math.min(minX, transformed.x);
        minY = Math.min(minY, transformed.y);
        maxX = Math.max(maxX, transformed.x);
        maxY = Math.max(maxY, transformed.y);
      });
      return {
        x: minX,
        y: minY,
        width: maxX - minX,
        height: maxY - minY
      };
    },
    _drawCachedSceneCanvas: function(context) {
      context.save();
      context._applyOpacity(this);
      context._applyGlobalCompositeOperation(this);
      context.translate(this._cache.canvas.x, this._cache.canvas.y);

      var cacheCanvas = this._getCachedSceneCanvas();
      var ratio = cacheCanvas.pixelRatio;

      context.drawImage(
        cacheCanvas._canvas,
        0,
        0,
        cacheCanvas.width / ratio,
        cacheCanvas.height / ratio
      );
      context.restore();
    },
    _drawCachedHitCanvas: function(context) {
      var cachedCanvas = this._cache.canvas,
        hitCanvas = cachedCanvas.hit;
      context.save();
      context.translate(this._cache.canvas.x, this._cache.canvas.y);
      context.drawImage(hitCanvas._canvas, 0, 0);
      context.restore();
    },
    _getCachedSceneCanvas: function() {
      var filters = this.filters(),
        cachedCanvas = this._cache.canvas,
        sceneCanvas = cachedCanvas.scene,
        filterCanvas = cachedCanvas.filter,
        filterContext = filterCanvas.getContext(),
        len,
        imageData,
        n,
        filter;

      if (filters) {
        if (!this._filterUpToDate) {
          var ratio = sceneCanvas.pixelRatio;

          try {
            len = filters.length;
            filterContext.clear();

            // copy cached canvas onto filter context
            filterContext.drawImage(
              sceneCanvas._canvas,
              0,
              0,
              sceneCanvas.getWidth() / ratio,
              sceneCanvas.getHeight() / ratio
            );
            imageData = filterContext.getImageData(
              0,
              0,
              filterCanvas.getWidth(),
              filterCanvas.getHeight()
            );

            // apply filters to filter context
            for (n = 0; n < len; n++) {
              filter = filters[n];
              if (typeof filter !== 'function') {
                Konva.Util.error(
                  'Filter should be type of function, but got ' +
                    typeof filter +
                    ' insted. Please check correct filters'
                );
                continue;
              }
              filter.call(this, imageData);
              filterContext.putImageData(imageData, 0, 0);
            }
          } catch (e) {
            Konva.Util.error('Unable to apply filter. ' + e.message);
          }

          this._filterUpToDate = true;
        }

        return filterCanvas;
      }
      return sceneCanvas;
    },
    /**
     * bind events to the node. KonvaJS supports mouseover, mousemove,
     *  mouseout, mouseenter, mouseleave, mousedown, mouseup, wheel, contextmenu, click, dblclick, touchstart, touchmove,
     *  touchend, tap, dbltap, dragstart, dragmove, and dragend events. The Konva Stage supports
     *  contentMouseover, contentMousemove, contentMouseout, contentMousedown, contentMouseup, contentWheel, contentContextmenu
     *  contentClick, contentDblclick, contentTouchstart, contentTouchmove, contentTouchend, contentTap,
     *  and contentDblTap.  Pass in a string of events delimited by a space to bind multiple events at once
     *  such as 'mousedown mouseup mousemove'. Include a namespace to bind an
     *  event by name such as 'click.foobar'.
     * @method
     * @memberof Konva.Node.prototype
     * @param {String} evtStr e.g. 'click', 'mousedown touchstart', 'mousedown.foo touchstart.foo'
     * @param {Function} handler The handler function is passed an event object
     * @returns {Konva.Node}
     * @example
     * // add click listener
     * node.on('click', function() {
     *   console.log('you clicked me!');
     * });
     *
     * // get the target node
     * node.on('click', function(evt) {
     *   console.log(evt.target);
     * });
     *
     * // stop event propagation
     * node.on('click', function(evt) {
     *   evt.cancelBubble = true;
     * });
     *
     * // bind multiple listeners
     * node.on('click touchstart', function() {
     *   console.log('you clicked/touched me!');
     * });
     *
     * // namespace listener
     * node.on('click.foo', function() {
     *   console.log('you clicked/touched me!');
     * });
     *
     * // get the event type
     * node.on('click tap', function(evt) {
     *   var eventType = evt.type;
     * });
     *
     * // get native event object
     * node.on('click tap', function(evt) {
     *   var nativeEvent = evt.evt;
     * });
     *
     * // for change events, get the old and new val
     * node.on('xChange', function(evt) {
     *   var oldVal = evt.oldVal;
     *   var newVal = evt.newVal;
     * });
     *
     * // get event targets
     * // with event delegations
     * layer.on('click', 'Group', function(evt) {
     *   var shape = evt.target;
     *   var group = evtn.currentTarger;
     * });
     */
    on: function(evtStr, handler) {
      if (arguments.length === 3) {
        return this._delegate.apply(this, arguments);
      }
      var events = evtStr.split(SPACE),
        len = events.length,
        n,
        event,
        parts,
        baseEvent,
        name;

      /*
             * loop through types and attach event listeners to
             * each one.  eg. 'click mouseover.namespace mouseout'
             * will create three event bindings
             */
      for (n = 0; n < len; n++) {
        event = events[n];
        parts = event.split(DOT);
        baseEvent = parts[0];
        name = parts[1] || EMPTY_STRING;

        // create events array if it doesn't exist
        if (!this.eventListeners[baseEvent]) {
          this.eventListeners[baseEvent] = [];
        }

        this.eventListeners[baseEvent].push({
          name: name,
          handler: handler
        });
      }

      return this;
    },
    /**
     * remove event bindings from the node. Pass in a string of
     *  event types delimmited by a space to remove multiple event
     *  bindings at once such as 'mousedown mouseup mousemove'.
     *  include a namespace to remove an event binding by name
     *  such as 'click.foobar'. If you only give a name like '.foobar',
     *  all events in that namespace will be removed.
     * @method
     * @memberof Konva.Node.prototype
     * @param {String} evtStr e.g. 'click', 'mousedown touchstart', '.foobar'
     * @returns {Konva.Node}
     * @example
     * // remove listener
     * node.off('click');
     *
     * // remove multiple listeners
     * node.off('click touchstart');
     *
     * // remove listener by name
     * node.off('click.foo');
     */
    off: function(evtStr, callback) {
      var events = (evtStr || '').split(SPACE),
        len = events.length,
        n,
        t,
        event,
        parts,
        baseEvent,
        name;

      if (!evtStr) {
        // remove all events
        for (t in this.eventListeners) {
          this._off(t);
        }
      }
      for (n = 0; n < len; n++) {
        event = events[n];
        parts = event.split(DOT);
        baseEvent = parts[0];
        name = parts[1];

        if (baseEvent) {
          if (this.eventListeners[baseEvent]) {
            this._off(baseEvent, name, callback);
          }
        } else {
          for (t in this.eventListeners) {
            this._off(t, name, callback);
          }
        }
      }
      return this;
    },
    // some event aliases for third party integration like HammerJS
    dispatchEvent: function(evt) {
      var e = {
        target: this,
        type: evt.type,
        evt: evt
      };
      this.fire(evt.type, e);
      return this;
    },
    addEventListener: function(type, handler) {
      // we have to pass native event to handler
      this.on(type, function(evt) {
        handler.call(this, evt.evt);
      });
      return this;
    },
    removeEventListener: function(type) {
      this.off(type);
      return this;
    },
    // like node.on
    _delegate: function(event, selector, handler) {
      var stopNode = this;
      this.on(event, function(evt) {
        var targets = evt.target.findAncestors(selector, true, stopNode);
        for (var i = 0; i < targets.length; i++) {
          evt = Konva.Util.cloneObject(evt);
          evt.currentTarget = targets[i];
          handler.call(targets[i], evt);
        }
      });
    },
    /**
     * remove self from parent, but don't destroy. You can reuse node later.
     * @method
     * @memberof Konva.Node.prototype
     * @returns {Konva.Node}
     * @example
     * node.remove();
     */
    remove: function() {
      var parent = this.getParent();

      if (parent && parent.children) {
        parent.children.splice(this.index, 1);
        parent._setChildrenIndices();
        delete this.parent;
      }

      // every cached attr that is calculated via node tree
      // traversal must be cleared when removing a node
      this._clearSelfAndDescendantCache(STAGE);
      this._clearSelfAndDescendantCache(ABSOLUTE_TRANSFORM);
      this._clearSelfAndDescendantCache(VISIBLE);
      this._clearSelfAndDescendantCache(LISTENING);
      this._clearSelfAndDescendantCache(ABSOLUTE_OPACITY);

      return this;
    },
    /**
     * remove and destroy a node. Kill it forever! You should not reuse node after destroy().
     * @method
     * @memberof Konva.Node.prototype
     * @example
     * node.destroy();
     */
    destroy: function() {
      // remove from ids and names hashes
      Konva._removeId(this.getId());

      // remove all names
      var names = (this.getName() || '').split(/\s/g);
      for (var i = 0; i < names.length; i++) {
        var subname = names[i];
        Konva._removeName(subname, this._id);
      }

      this.remove();
      return this;
    },
    /**
     * get attr
     * @method
     * @memberof Konva.Node.prototype
     * @param {String} attr
     * @returns {Integer|String|Object|Array}
     * @example
     * var x = node.getAttr('x');
     */
    getAttr: function(attr) {
      var method = GET + Konva.Util._capitalize(attr);
      if (Konva.Util._isFunction(this[method])) {
        return this[method]();
      }
      // otherwise get directly
      return this.attrs[attr];
    },
    /**
     * get ancestors
     * @method
     * @memberof Konva.Node.prototype
     * @returns {Konva.Collection}
     * @example
     * shape.getAncestors().each(function(node) {
     *   console.log(node.getId());
     * })
     */
    getAncestors: function() {
      var parent = this.getParent(),
        ancestors = new Konva.Collection();

      while (parent) {
        ancestors.push(parent);
        parent = parent.getParent();
      }

      return ancestors;
    },
    /**
     * get attrs object literal
     * @method
     * @memberof Konva.Node.prototype
     * @returns {Object}
     */
    getAttrs: function() {
      return this.attrs || {};
    },
    /**
     * set multiple attrs at once using an object literal
     * @method
     * @memberof Konva.Node.prototype
     * @param {Object} config object containing key value pairs
     * @returns {Konva.Node}
     * @example
     * node.setAttrs({
     *   x: 5,
     *   fill: 'red'
     * });
     */
    setAttrs: function(config) {
      var key, method;

      if (!config) {
        return this;
      }
      for (key in config) {
        if (key === CHILDREN) {
          continue;
        }
        method = SET + Konva.Util._capitalize(key);
        // use setter if available
        if (Konva.Util._isFunction(this[method])) {
          this[method](config[key]);
        } else {
          // otherwise set directly
          this._setAttr(key, config[key]);
        }
      }
      return this;
    },
    /**
     * determine if node is listening for events by taking into account ancestors.
     *
     * Parent    | Self      | isListening
     * listening | listening |
     * ----------+-----------+------------
     * T         | T         | T
     * T         | F         | F
     * F         | T         | T
     * F         | F         | F
     * ----------+-----------+------------
     * T         | I         | T
     * F         | I         | F
     * I         | I         | T
     *
     * @method
     * @memberof Konva.Node.prototype
     * @returns {Boolean}
     */
    isListening: function() {
      return this._getCache(LISTENING, this._isListening);
    },
    _isListening: function() {
      var listening = this.getListening(),
        parent = this.getParent();

      // the following conditions are a simplification of the truth table above.
      // please modify carefully
      if (listening === 'inherit') {
        if (parent) {
          return parent.isListening();
        } else {
          return true;
        }
      } else {
        return listening;
      }
    },
    /**
     * determine if node is visible by taking into account ancestors.
     *
     * Parent    | Self      | isVisible
     * visible   | visible   |
     * ----------+-----------+------------
     * T         | T         | T
     * T         | F         | F
     * F         | T         | T
     * F         | F         | F
     * ----------+-----------+------------
     * T         | I         | T
     * F         | I         | F
     * I         | I         | T

      * @method
      * @memberof Konva.Node.prototype
      * @returns {Boolean}
      */
    isVisible: function() {
      return this._getCache(VISIBLE, this._isVisible);
    },
    _isVisible: function(relativeTo) {
      var visible = this.getVisible(),
        parent = this.getParent();

      if (relativeTo === parent && visible === 'inherit') {
        return true;
      } else if (relativeTo === parent) {
        return visible;
      }
      // the following conditions are a simplification of the truth table above.
      // please modify carefully
      if (visible === 'inherit') {
        if (parent) {
          return parent._isVisible(relativeTo);
        } else {
          return true;
        }
      } else {
        return visible;
      }
    },
    /**
     * determine if listening is enabled by taking into account descendants.  If self or any children
     * have _isListeningEnabled set to true, then self also has listening enabled.
     * @method
     * @memberof Konva.Node.prototype
     * @returns {Boolean}
     */
    shouldDrawHit: function() {
      var layer = this.getLayer();

      return (
        (!layer && this.isListening() && this.isVisible()) ||
        (layer &&
          layer.hitGraphEnabled() &&
          this.isListening() &&
          this.isVisible())
      );
    },
    /**
     * show node
     * @method
     * @memberof Konva.Node.prototype
     * @returns {Konva.Node}
     */
    show: function() {
      this.setVisible(true);
      return this;
    },
    /**
     * hide node.  Hidden nodes are no longer detectable
     * @method
     * @memberof Konva.Node.prototype
     * @returns {Konva.Node}
     */
    hide: function() {
      this.setVisible(false);
      return this;
    },
    /**
     * get zIndex relative to the node's siblings who share the same parent
     * @method
     * @memberof Konva.Node.prototype
     * @returns {Integer}
     */
    getZIndex: function() {
      return this.index || 0;
    },
    /**
     * get absolute z-index which takes into account sibling
     *  and ancestor indices
     * @method
     * @memberof Konva.Node.prototype
     * @returns {Integer}
     */
    getAbsoluteZIndex: function() {
      var depth = this.getDepth(),
        that = this,
        index = 0,
        nodes,
        len,
        n,
        child;

      function addChildren(children) {
        nodes = [];
        len = children.length;
        for (n = 0; n < len; n++) {
          child = children[n];
          index++;

          if (child.nodeType !== SHAPE) {
            nodes = nodes.concat(child.getChildren().toArray());
          }

          if (child._id === that._id) {
            n = len;
          }
        }

        if (nodes.length > 0 && nodes[0].getDepth() <= depth) {
          addChildren(nodes);
        }
      }
      if (that.nodeType !== UPPER_STAGE) {
        addChildren(that.getStage().getChildren());
      }

      return index;
    },
    /**
     * get node depth in node tree.  Returns an integer.
     *  e.g. Stage depth will always be 0.  Layers will always be 1.  Groups and Shapes will always
     *  be >= 2
     * @method
     * @memberof Konva.Node.prototype
     * @returns {Integer}
     */
    getDepth: function() {
      var depth = 0,
        parent = this.parent;

      while (parent) {
        depth++;
        parent = parent.parent;
      }
      return depth;
    },
    setPosition: function(pos) {
      this.setX(pos.x);
      this.setY(pos.y);
      return this;
    },
    getPosition: function() {
      return {
        x: this.getX(),
        y: this.getY()
      };
    },
    /**
     * get absolute position relative to the top left corner of the stage container div
     * or relative to passed node
     * @method
     * @param {Object} [top] optional parent node
     * @memberof Konva.Node.prototype
     * @returns {Object}
     */
    getAbsolutePosition: function(top) {
      var absoluteMatrix = this.getAbsoluteTransform(top).getMatrix(),
        absoluteTransform = new Konva.Transform(),
        offset = this.offset();

      // clone the matrix array
      absoluteTransform.m = absoluteMatrix.slice();
      absoluteTransform.translate(offset.x, offset.y);

      return absoluteTransform.getTranslation();
    },
    /**
     * set absolute position
     * @method
     * @memberof Konva.Node.prototype
     * @param {Object} pos
     * @param {Number} pos.x
     * @param {Number} pos.y
     * @returns {Konva.Node}
     */
    setAbsolutePosition: function(pos) {
      var origTrans = this._clearTransform(),
        it;

      // don't clear translation
      this.attrs.x = origTrans.x;
      this.attrs.y = origTrans.y;
      delete origTrans.x;
      delete origTrans.y;

      // unravel transform
      it = this.getAbsoluteTransform();

      it.invert();
      it.translate(pos.x, pos.y);
      pos = {
        x: this.attrs.x + it.getTranslation().x,
        y: this.attrs.y + it.getTranslation().y
      };

      this.setPosition({ x: pos.x, y: pos.y });
      this._setTransform(origTrans);

      return this;
    },
    _setTransform: function(trans) {
      var key;

      for (key in trans) {
        this.attrs[key] = trans[key];
      }

      this._clearCache(TRANSFORM);
      this._clearSelfAndDescendantCache(ABSOLUTE_TRANSFORM);
    },
    _clearTransform: function() {
      var trans = {
        x: this.getX(),
        y: this.getY(),
        rotation: this.getRotation(),
        scaleX: this.getScaleX(),
        scaleY: this.getScaleY(),
        offsetX: this.getOffsetX(),
        offsetY: this.getOffsetY(),
        skewX: this.getSkewX(),
        skewY: this.getSkewY()
      };

      this.attrs.x = 0;
      this.attrs.y = 0;
      this.attrs.rotation = 0;
      this.attrs.scaleX = 1;
      this.attrs.scaleY = 1;
      this.attrs.offsetX = 0;
      this.attrs.offsetY = 0;
      this.attrs.skewX = 0;
      this.attrs.skewY = 0;

      this._clearCache(TRANSFORM);
      this._clearSelfAndDescendantCache(ABSOLUTE_TRANSFORM);

      // return original transform
      return trans;
    },
    /**
     * move node by an amount relative to its current position
     * @method
     * @memberof Konva.Node.prototype
     * @param {Object} change
     * @param {Number} change.x
     * @param {Number} change.y
     * @returns {Konva.Node}
     * @example
     * // move node in x direction by 1px and y direction by 2px
     * node.move({
     *   x: 1,
     *   y: 2)
     * });
     */
    move: function(change) {
      var changeX = change.x,
        changeY = change.y,
        x = this.getX(),
        y = this.getY();

      if (changeX !== undefined) {
        x += changeX;
      }

      if (changeY !== undefined) {
        y += changeY;
      }

      this.setPosition({ x: x, y: y });
      return this;
    },
    _eachAncestorReverse: function(func, top) {
      var family = [],
        parent = this.getParent(),
        len,
        n;

      // if top node is defined, and this node is top node,
      // there's no need to build a family tree.  just execute
      // func with this because it will be the only node
      if (top && top._id === this._id) {
        func(this);
        return;
      }

      family.unshift(this);

      while (parent && (!top || parent._id !== top._id)) {
        family.unshift(parent);
        parent = parent.parent;
      }

      len = family.length;
      for (n = 0; n < len; n++) {
        func(family[n]);
      }
    },
    /**
     * rotate node by an amount in degrees relative to its current rotation
     * @method
     * @memberof Konva.Node.prototype
     * @param {Number} theta
     * @returns {Konva.Node}
     */
    rotate: function(theta) {
      this.setRotation(this.getRotation() + theta);
      return this;
    },
    /**
     * move node to the top of its siblings
     * @method
     * @memberof Konva.Node.prototype
     * @returns {Boolean}
     */
    moveToTop: function() {
      if (!this.parent) {
        Konva.Util.warn('Node has no parent. moveToTop function is ignored.');
        return false;
      }
      var index = this.index;
      this.parent.children.splice(index, 1);
      this.parent.children.push(this);
      this.parent._setChildrenIndices();
      return true;
    },
    /**
     * move node up
     * @method
     * @memberof Konva.Node.prototype
     * @returns {Boolean} flag is moved or not
     */
    moveUp: function() {
      if (!this.parent) {
        Konva.Util.warn('Node has no parent. moveUp function is ignored.');
        return false;
      }
      var index = this.index,
        len = this.parent.getChildren().length;
      if (index < len - 1) {
        this.parent.children.splice(index, 1);
        this.parent.children.splice(index + 1, 0, this);
        this.parent._setChildrenIndices();
        return true;
      }
      return false;
    },
    /**
     * move node down
     * @method
     * @memberof Konva.Node.prototype
     * @returns {Boolean}
     */
    moveDown: function() {
      if (!this.parent) {
        Konva.Util.warn('Node has no parent. moveDown function is ignored.');
        return false;
      }
      var index = this.index;
      if (index > 0) {
        this.parent.children.splice(index, 1);
        this.parent.children.splice(index - 1, 0, this);
        this.parent._setChildrenIndices();
        return true;
      }
      return false;
    },
    /**
     * move node to the bottom of its siblings
     * @method
     * @memberof Konva.Node.prototype
     * @returns {Boolean}
     */
    moveToBottom: function() {
      if (!this.parent) {
        Konva.Util.warn(
          'Node has no parent. moveToBottom function is ignored.'
        );
        return false;
      }
      var index = this.index;
      if (index > 0) {
        this.parent.children.splice(index, 1);
        this.parent.children.unshift(this);
        this.parent._setChildrenIndices();
        return true;
      }
      return false;
    },
    /**
     * set zIndex relative to siblings
     * @method
     * @memberof Konva.Node.prototype
     * @param {Integer} zIndex
     * @returns {Konva.Node}
     */
    setZIndex: function(zIndex) {
      if (!this.parent) {
        Konva.Util.warn('Node has no parent. zIndex parameter is ignored.');
        return false;
      }
      var index = this.index;
      this.parent.children.splice(index, 1);
      this.parent.children.splice(zIndex, 0, this);
      this.parent._setChildrenIndices();
      return this;
    },
    /**
     * get absolute opacity
     * @method
     * @memberof Konva.Node.prototype
     * @returns {Number}
     */
    getAbsoluteOpacity: function() {
      return this._getCache(ABSOLUTE_OPACITY, this._getAbsoluteOpacity);
    },
    _getAbsoluteOpacity: function() {
      var absOpacity = this.getOpacity();
      var parent = this.getParent();
      if (parent && !parent._isUnderCache) {
        absOpacity *= this.getParent().getAbsoluteOpacity();
      }
      return absOpacity;
    },
    /**
     * move node to another container
     * @method
     * @memberof Konva.Node.prototype
     * @param {Container} newContainer
     * @returns {Konva.Node}
     * @example
     * // move node from current layer into layer2
     * node.moveTo(layer2);
     */
    moveTo: function(newContainer) {
      // do nothing if new container is already parent
      if (this.getParent() !== newContainer) {
        // this.remove my be overrided by drag and drop
        // buy we need original
        (this.__originalRemove || this.remove).call(this);
        newContainer.add(this);
      }
      return this;
    },
    /**
     * convert Node into an object for serialization.  Returns an object.
     * @method
     * @memberof Konva.Node.prototype
     * @returns {Object}
     */
    toObject: function() {
      var obj = {},
        attrs = this.getAttrs(),
        key,
        val,
        getter,
        defaultValue;

      obj.attrs = {};

      for (key in attrs) {
        val = attrs[key];
        getter = typeof this[key] === 'function' && this[key];
        // remove attr value so that we can extract the default value from the getter
        delete attrs[key];
        defaultValue = getter ? getter.call(this) : null;
        // restore attr value
        attrs[key] = val;
        if (defaultValue !== val) {
          obj.attrs[key] = val;
        }
      }

      obj.className = this.getClassName();
      return Konva.Util._prepareToStringify(obj);
    },
    /**
     * convert Node into a JSON string.  Returns a JSON string.
     * @method
     * @memberof Konva.Node.prototype
     * @returns {String}}
     */
    toJSON: function() {
      return JSON.stringify(this.toObject());
    },
    /**
     * get parent container
     * @method
     * @memberof Konva.Node.prototype
     * @returns {Konva.Node}
     */
    getParent: function() {
      return this.parent;
    },
    /**
     * get all ancestros (parent then parent of the parent, etc) of the node
     * @method
     * @memberof Konva.Node.prototype
     * @param {String} [selector] selector for search
     * @param {Boolean} [includeSelf] show we think that node is ancestro itself?
     * @param {Konva.Node} [stopNode] optional node where we need to stop searching (one of ancestors)
     * @returns {Array} [ancestors]
     * @example
     * // get one of the parent group
     * var parentGroups = node.findAncestors('Group');
     */
    findAncestors: function(selector, includeSelf, stopNode) {
      var res = [];

      if (includeSelf && this._isMatch(selector)) {
        res.push(this);
      }
      var ancestor = this.parent;
      while (ancestor) {
        if (ancestor === stopNode) {
          return res;
        }
        if (ancestor._isMatch(selector)) {
          res.push(ancestor);
        }
        ancestor = ancestor.parent;
      }
      return res;
    },
    /**
     * get ancestor (parent or parent of the parent, etc) of the node that match passed selector
     * @method
     * @memberof Konva.Node.prototype
     * @param {String} [selector] selector for search
     * @param {Boolean} [includeSelf] show we think that node is ancestro itself?
     * @param {Konva.Node} [stopNode] optional node where we need to stop searching (one of ancestors)
     * @returns {Konva.Node} ancestor
     * @example
     * // get one of the parent group
     * var group = node.findAncestors('.mygroup');
     */
    findAncestor: function(selector, includeSelf, stopNode) {
      return this.findAncestors(selector, includeSelf, stopNode)[0];
    },
    // is current node match passed selector?
    _isMatch: function(selector) {
      if (!selector) {
        return false;
      }
      var selectorArr = selector.replace(/ /g, '').split(','),
        len = selectorArr.length,
        n,
        sel;

      for (n = 0; n < len; n++) {
        sel = selectorArr[n];
        if (!Konva.Util.isValidSelector(sel)) {
          Konva.Util.warn(
            'Selector "' +
              sel +
              '" is invalid. Allowed selectors examples are "#foo", ".bar" or "Group".'
          );
          Konva.Util.warn(
            'If you have a custom shape with such className, please change it to start with upper letter like "Triangle".'
          );
          Konva.Util.warn('Konva is awesome, right?');
        }
        // id selector
        if (sel.charAt(0) === '#') {
          if (this.id() === sel.slice(1)) {
            return true;
          }
        } else if (sel.charAt(0) === '.') {
          // name selector
          if (this.hasName(sel.slice(1))) {
            return true;
          }
        } else if (this._get(sel).length !== 0) {
          return true;
        }
      }
      return false;
    },
    /**
     * get layer ancestor
     * @method
     * @memberof Konva.Node.prototype
     * @returns {Konva.Layer}
     */
    getLayer: function() {
      var parent = this.getParent();
      return parent ? parent.getLayer() : null;
    },
    /**
     * get stage ancestor
     * @method
     * @memberof Konva.Node.prototype
     * @returns {Konva.Stage}
     */
    getStage: function() {
      return this._getCache(STAGE, this._getStage);
    },
    _getStage: function() {
      var parent = this.getParent();
      if (parent) {
        return parent.getStage();
      } else {
        return undefined;
      }
    },
    /**
     * fire event
     * @method
     * @memberof Konva.Node.prototype
     * @param {String} eventType event type.  can be a regular event, like click, mouseover, or mouseout, or it can be a custom event, like myCustomEvent
     * @param {Event} [evt] event object
     * @param {Boolean} [bubble] setting the value to false, or leaving it undefined, will result in the event
     *  not bubbling.  Setting the value to true will result in the event bubbling.
     * @returns {Konva.Node}
     * @example
     * // manually fire click event
     * node.fire('click');
     *
     * // fire custom event
     * node.fire('foo');
     *
     * // fire custom event with custom event object
     * node.fire('foo', {
     *   bar: 10
     * });
     *
     * // fire click event that bubbles
     * node.fire('click', null, true);
     */
    fire: function(eventType, evt, bubble) {
      evt = evt || {};
      evt.target = evt.target || this;
      // bubble
      if (bubble) {
        this._fireAndBubble(eventType, evt);
      } else {
        // no bubble
        this._fire(eventType, evt);
      }
      return this;
    },
    /**
     * get absolute transform of the node which takes into
     *  account its ancestor transforms
     * @method
     * @memberof Konva.Node.prototype
     * @returns {Konva.Transform}
     */
    getAbsoluteTransform: function(top) {
      // if using an argument, we can't cache the result.
      if (top) {
        return this._getAbsoluteTransform(top);
      } else {
        // if no argument, we can cache the result
        return this._getCache(ABSOLUTE_TRANSFORM, this._getAbsoluteTransform);
      }
    },
    _getAbsoluteTransform: function(top) {
      var at = new Konva.Transform();

      // start with stage and traverse downwards to self
      this._eachAncestorReverse(function(node) {
        var transformsEnabled = node.transformsEnabled();

        if (transformsEnabled === 'all') {
          at.multiply(node.getTransform());
        } else if (transformsEnabled === 'position') {
          at.translate(
            node.getX() - node.getOffsetX(),
            node.getY() - node.getOffsetY()
          );
        }
      }, top);
      return at;
    },
    /**
     * get absolute scale of the node which takes into
     *  account its ancestor scales
     * @method
     * @memberof Konva.Node.prototype
     * @returns {Konva.Transform}
     */
    getAbsoluteScale: function(top) {
      // if using an argument, we can't cache the result.
      if (top) {
        return this._getAbsoluteScale(top);
      } else {
        // if no argument, we can cache the result
        return this._getCache(ABSOLUTE_SCALE, this._getAbsoluteScale);
      }
    },
    _getAbsoluteScale: function(top) {
      // this is special logic for caching with some shapes with shadow
      var parent = this;
      while (parent) {
        if (parent._isUnderCache) {
          top = parent;
        }
        parent = parent.getParent();
      }

      var scaleX = 1,
        scaleY = 1;

      // start with stage and traverse downwards to self
      this._eachAncestorReverse(function(node) {
        scaleX *= node.scaleX();
        scaleY *= node.scaleY();
      }, top);
      return {
        x: scaleX,
        y: scaleY
      };
    },
    /**
     * get transform of the node
     * @method
     * @memberof Konva.Node.prototype
     * @returns {Konva.Transform}
     */
    getTransform: function() {
      return this._getCache(TRANSFORM, this._getTransform);
    },
    _getTransform: function() {
      var m = new Konva.Transform(),
        x = this.getX(),
        y = this.getY(),
        rotation = Konva.getAngle(this.getRotation()),
        scaleX = this.getScaleX(),
        scaleY = this.getScaleY(),
        skewX = this.getSkewX(),
        skewY = this.getSkewY(),
        offsetX = this.getOffsetX(),
        offsetY = this.getOffsetY();

      if (x !== 0 || y !== 0) {
        m.translate(x, y);
      }
      if (rotation !== 0) {
        m.rotate(rotation);
      }
      if (skewX !== 0 || skewY !== 0) {
        m.skew(skewX, skewY);
      }
      if (scaleX !== 1 || scaleY !== 1) {
        m.scale(scaleX, scaleY);
      }
      if (offsetX !== 0 || offsetY !== 0) {
        m.translate(-1 * offsetX, -1 * offsetY);
      }

      return m;
    },
    /**
     * clone node.  Returns a new Node instance with identical attributes.  You can also override
     *  the node properties with an object literal, enabling you to use an existing node as a template
     *  for another node
     * @method
     * @memberof Konva.Node.prototype
     * @param {Object} obj override attrs
     * @returns {Konva.Node}
     * @example
     * // simple clone
     * var clone = node.clone();
     *
     * // clone a node and override the x position
     * var clone = rect.clone({
     *   x: 5
     * });
     */
    clone: function(obj) {
      // instantiate new node
      var attrs = Konva.Util.cloneObject(this.attrs),
        key,
        allListeners,
        len,
        n,
        listener;
      // filter black attrs
      for (var i in CLONE_BLACK_LIST) {
        var blockAttr = CLONE_BLACK_LIST[i];
        delete attrs[blockAttr];
      }
      // apply attr overrides
      for (key in obj) {
        attrs[key] = obj[key];
      }

      var node = new this.constructor(attrs);
      // copy over listeners
      for (key in this.eventListeners) {
        allListeners = this.eventListeners[key];
        len = allListeners.length;
        for (n = 0; n < len; n++) {
          listener = allListeners[n];
          /*
                     * don't include konva namespaced listeners because
                     *  these are generated by the constructors
                     */
          if (listener.name.indexOf(KONVA) < 0) {
            // if listeners array doesn't exist, then create it
            if (!node.eventListeners[key]) {
              node.eventListeners[key] = [];
            }
            node.eventListeners[key].push(listener);
          }
        }
      }
      return node;
    },
    _toKonvaCanvas: function(config) {
      config = config || {};

      var box = this.getClientRect();

      var stage = this.getStage(),
        x = config.x !== undefined ? config.x : box.x,
        y = config.y !== undefined ? config.y : box.y,
        pixelRatio = config.pixelRatio || 1,
        canvas = new Konva.SceneCanvas({
          width: config.width || box.width || (stage ? stage.getWidth() : 0),
          height:
            config.height || box.height || (stage ? stage.getHeight() : 0),
          pixelRatio: pixelRatio
        }),
        context = canvas.getContext();

      context.save();

      if (x || y) {
        context.translate(-1 * x, -1 * y);
      }

      this.drawScene(canvas);
      context.restore();

      return canvas;
    },
    /**
     * converts node into an canvas element.
     * @method
     * @memberof Konva.Node.prototype
     * @param {Object} config
     * @param {Function} config.callback function executed when the composite has completed
     * @param {Number} [config.x] x position of canvas section
     * @param {Number} [config.y] y position of canvas section
     * @param {Number} [config.width] width of canvas section
     * @param {Number} [config.height] height of canvas section
     * @paremt {Number} [config.pixelRatio] pixelRatio of ouput image.  Default is 1.
     * @example
     * var canvas = node.toCanvas();
     */
    toCanvas: function(config) {
      return this._toKonvaCanvas(config)._canvas;
    },
    /**
     * Creates a composite data URL. If MIME type is not
     * specified, then "image/png" will result. For "image/jpeg", specify a quality
     * level as quality (range 0.0 - 1.0)
     * @method
     * @memberof Konva.Node.prototype
     * @param {Object} config
     * @param {String} [config.mimeType] can be "image/png" or "image/jpeg".
     *  "image/png" is the default
     * @param {Number} [config.x] x position of canvas section
     * @param {Number} [config.y] y position of canvas section
     * @param {Number} [config.width] width of canvas section
     * @param {Number} [config.height] height of canvas section
     * @param {Number} [config.quality] jpeg quality.  If using an "image/jpeg" mimeType,
     *  you can specify the quality from 0 to 1, where 0 is very poor quality and 1
     *  is very high quality
     * @param {Number} [config.pixelRatio] pixelRatio of output image url. Default is 1
     * @returns {String}
     */
    toDataURL: function(config) {
      config = config || {};
      var mimeType = config.mimeType || null,
        quality = config.quality || null;
      var url = this._toKonvaCanvas(config).toDataURL(mimeType, quality);
      if (config.callback) {
        config.callback(url);
      }
      return url;
    },
    /**
     * converts node into an image.  Since the toImage
     *  method is asynchronous, a callback is required.  toImage is most commonly used
     *  to cache complex drawings as an image so that they don't have to constantly be redrawn
     * @method
     * @memberof Konva.Node.prototype
     * @param {Object} config
     * @param {Function} config.callback function executed when the composite has completed
     * @param {String} [config.mimeType] can be "image/png" or "image/jpeg".
     *  "image/png" is the default
     * @param {Number} [config.x] x position of canvas section
     * @param {Number} [config.y] y position of canvas section
     * @param {Number} [config.width] width of canvas section
     * @param {Number} [config.height] height of canvas section
     * @param {Number} [config.quality] jpeg quality.  If using an "image/jpeg" mimeType,
     *  you can specify the quality from 0 to 1, where 0 is very poor quality and 1
     *  is very high quality
     * @paremt {Number} [config.pixelRatio] pixelRatio of ouput image.  Default is 1.
     * @example
     * var image = node.toImage({
     *   callback: function(img) {
     *     // do stuff with img
     *   }
     * });
     */
    toImage: function(config) {
      if (!config || !config.callback) {
        throw 'callback required for toImage method config argument';
      }
      var callback = config.callback;
      delete config.callback;
      Konva.Util._getImage(this.toDataURL(config), function(img) {
        callback(img);
      });
    },
    setSize: function(size) {
      this.setWidth(size.width);
      this.setHeight(size.height);
      return this;
    },
    getSize: function() {
      return {
        width: this.getWidth(),
        height: this.getHeight()
      };
    },
    getWidth: function() {
      return this.attrs.width || 0;
    },
    getHeight: function() {
      return this.attrs.height || 0;
    },
    /**
     * get class name, which may return Stage, Layer, Group, or shape class names like Rect, Circle, Text, etc.
     * @method
     * @memberof Konva.Node.prototype
     * @returns {String}
     */
    getClassName: function() {
      return this.className || this.nodeType;
    },
    /**
     * get the node type, which may return Stage, Layer, Group, or Node
     * @method
     * @memberof Konva.Node.prototype
     * @returns {String}
     */
    getType: function() {
      return this.nodeType;
    },
    getDragDistance: function() {
      // compare with undefined because we need to track 0 value
      if (this.attrs.dragDistance !== undefined) {
        return this.attrs.dragDistance;
      } else if (this.parent) {
        return this.parent.getDragDistance();
      } else {
        return Konva.dragDistance;
      }
    },
    _get: function(selector) {
      return this.className === selector || this.nodeType === selector
        ? [this]
        : [];
    },
    _off: function(type, name, callback) {
      var evtListeners = this.eventListeners[type],
        i,
        evtName,
        handler;

      for (i = 0; i < evtListeners.length; i++) {
        evtName = evtListeners[i].name;
        handler = evtListeners[i].handler;

        // the following two conditions must be true in order to remove a handler:
        // 1) the current event name cannot be konva unless the event name is konva
        //    this enables developers to force remove a konva specific listener for whatever reason
        // 2) an event name is not specified, or if one is specified, it matches the current event name
        if (
          (evtName !== 'konva' || name === 'konva') &&
          (!name || evtName === name) &&
          (!callback || callback === handler)
        ) {
          evtListeners.splice(i, 1);
          if (evtListeners.length === 0) {
            delete this.eventListeners[type];
            break;
          }
          i--;
        }
      }
    },
    _fireChangeEvent: function(attr, oldVal, newVal) {
      this._fire(attr + CHANGE, {
        oldVal: oldVal,
        newVal: newVal
      });
    },
    setId: function(id) {
      var oldId = this.getId();

      Konva._removeId(oldId);
      Konva._addId(this, id);
      this._setAttr(ID, id);
      return this;
    },
    setName: function(name) {
      var oldNames = (this.getName() || '').split(/\s/g);
      var newNames = (name || '').split(/\s/g);
      var subname, i;
      // remove all subnames
      for (i = 0; i < oldNames.length; i++) {
        subname = oldNames[i];
        if (newNames.indexOf(subname) === -1 && subname) {
          Konva._removeName(subname, this._id);
        }
      }

      // add new names
      for (i = 0; i < newNames.length; i++) {
        subname = newNames[i];
        if (oldNames.indexOf(subname) === -1 && subname) {
          Konva._addName(this, subname);
        }
      }

      this._setAttr(NAME, name);
      return this;
    },
    // naming methods
    /**
     * add name to node
     * @method
     * @memberof Konva.Node.prototype
     * @param {String} name
     * @returns {Konva.Node}
     * @example
     * node.name('red');
     * node.addName('selected');
     * node.name(); // return 'red selected'
     */
    addName: function(name) {
      if (!this.hasName(name)) {
        var oldName = this.name();
        var newName = oldName ? oldName + ' ' + name : name;
        this.setName(newName);
      }
      return this;
    },
    /**
     * check is node has name
     * @method
     * @memberof Konva.Node.prototype
     * @param {String} name
     * @returns {Boolean}
     * @example
     * node.name('red');
     * node.hasName('red');   // return true
     * node.hasName('selected'); // return false
     */
    hasName: function(name) {
      var names = (this.name() || '').split(/\s/g);
      return names.indexOf(name) !== -1;
    },
    /**
     * remove name from node
     * @method
     * @memberof Konva.Node.prototype
     * @param {String} name
     * @returns {Konva.Node}
     * @example
     * node.name('red selected');
     * node.removeName('selected');
     * node.hasName('selected'); // return false
     * node.name(); // return 'red'
     */
    removeName: function(name) {
      var names = (this.name() || '').split(/\s/g);
      var index = names.indexOf(name);
      if (index !== -1) {
        names.splice(index, 1);
        this.setName(names.join(' '));
      }
      return this;
    },
    /**
     * set attr
     * @method
     * @memberof Konva.Node.prototype
     * @param {String} attr
     * @param {*} val
     * @returns {Konva.Node}
     * @example
     * node.setAttr('x', 5);
     */
    setAttr: function(attr, val) {
      var method = SET + Konva.Util._capitalize(attr),
        func = this[method];

      if (Konva.Util._isFunction(func)) {
        func.call(this, val);
      } else {
        // otherwise set directly
        this._setAttr(attr, val);
      }
      return this;
    },
    _setAttr: function(key, val) {
      var oldVal;
      oldVal = this.attrs[key];
      var same = oldVal === val;
      if (same && !Konva.Util.isObject(val)) {
        return;
      }
      if (val === undefined || val === null) {
        delete this.attrs[key];
      } else {
        this.attrs[key] = val;
      }
      this._fireChangeEvent(key, oldVal, val);
    },
    _setComponentAttr: function(key, component, val) {
      var oldVal;
      if (val !== undefined) {
        oldVal = this.attrs[key];

        if (!oldVal) {
          // set value to default value using getAttr
          this.attrs[key] = this.getAttr(key);
        }

        this.attrs[key][component] = val;
        this._fireChangeEvent(key, oldVal, val);
      }
    },
    _fireAndBubble: function(eventType, evt, compareShape) {
      var okayToRun = true;

      if (evt && this.nodeType === SHAPE) {
        evt.target = this;
      }

      if (
        eventType === MOUSEENTER &&
        compareShape &&
        (this._id === compareShape._id ||
          (this.isAncestorOf && this.isAncestorOf(compareShape)))
      ) {
        okayToRun = false;
      } else if (
        eventType === MOUSELEAVE &&
        compareShape &&
        (this._id === compareShape._id ||
          (this.isAncestorOf && this.isAncestorOf(compareShape)))
      ) {
        okayToRun = false;
      }
      if (okayToRun) {
        this._fire(eventType, evt);

        // simulate event bubbling
        var stopBubble =
          (eventType === MOUSEENTER || eventType === MOUSELEAVE) &&
          (compareShape &&
            compareShape.isAncestorOf &&
            compareShape.isAncestorOf(this) &&
            !compareShape.isAncestorOf(this.parent));
        if (
          ((evt && !evt.cancelBubble) || !evt) &&
          this.parent &&
          this.parent.isListening() &&
          !stopBubble
        ) {
          if (compareShape && compareShape.parent) {
            this._fireAndBubble.call(
              this.parent,
              eventType,
              evt,
              compareShape.parent
            );
          } else {
            this._fireAndBubble.call(this.parent, eventType, evt);
          }
        }
      }
    },
    _fire: function(eventType, evt) {
      var events = this.eventListeners[eventType],
        i;

      evt = evt || {};
      evt.currentTarget = this;
      evt.type = eventType;

      if (events) {
        for (i = 0; i < events.length; i++) {
          events[i].handler.call(this, evt);
        }
      }
    },
    /**
     * draw both scene and hit graphs.  If the node being drawn is the stage, all of the layers will be cleared and redrawn
     * @method
     * @memberof Konva.Node.prototype
     * @returns {Konva.Node}
     */
    draw: function() {
      this.drawScene();
      this.drawHit();
      return this;
    }
  });

  /**
   * create node with JSON string or an Object.  De-serializtion does not generate custom
   *  shape drawing functions, images, or event handlers (this would make the
   *  serialized object huge).  If your app uses custom shapes, images, and
   *  event handlers (it probably does), then you need to select the appropriate
   *  shapes after loading the stage and set these properties via on(), setSceneFunc(),
   *  and setImage() methods
   * @method
   * @memberof Konva.Node
   * @param {String|Object} json string or object
   * @param {Element} [container] optional container dom element used only if you're
   *  creating a stage node
   */
  Konva.Node.create = function(data, container) {
    if (Konva.Util._isString(data)) {
      data = JSON.parse(data);
    }
    return this._createNode(data, container);
  };
  Konva.Node._createNode = function(obj, container) {
    var className = Konva.Node.prototype.getClassName.call(obj),
      children = obj.children,
      no,
      len,
      n;

    // if container was passed in, add it to attrs
    if (container) {
      obj.attrs.container = container;
    }

    no = new Konva[className](obj.attrs);
    if (children) {
      len = children.length;
      for (n = 0; n < len; n++) {
        no.add(this._createNode(children[n]));
      }
    }

    return no;
  };

  // =========================== add getters setters ===========================

  Konva.Factory.addOverloadedGetterSetter(Konva.Node, 'position');
  /**
   * get/set node position relative to parent
   * @name position
   * @method
   * @memberof Konva.Node.prototype
   * @param {Object} pos
   * @param {Number} pos.x
   * @param {Number} pos.y
   * @returns {Object}
   * @example
   * // get position
   * var position = node.position();
   *
   * // set position
   * node.position({
   *   x: 5
   *   y: 10
   * });
   */

  Konva.Factory.addGetterSetter(
    Konva.Node,
    'x',
    0,
    Konva.Validators.getNumberValidator()
  );

  /**
   * get/set x position
   * @name x
   * @method
   * @memberof Konva.Node.prototype
   * @param {Number} x
   * @returns {Object}
   * @example
   * // get x
   * var x = node.x();
   *
   * // set x
   * node.x(5);
   */

  Konva.Factory.addGetterSetter(
    Konva.Node,
    'y',
    0,
    Konva.Validators.getNumberValidator()
  );

  /**
   * get/set y position
   * @name y
   * @method
   * @memberof Konva.Node.prototype
   * @param {Number} y
   * @returns {Integer}
   * @example
   * // get y
   * var y = node.y();
   *
   * // set y
   * node.y(5);
   */

  Konva.Factory.addGetterSetter(
    Konva.Node,
    'globalCompositeOperation',
    'source-over',
    Konva.Validators.getStringValidator()
  );

  /**
   * get/set globalCompositeOperation of a shape
   * @name globalCompositeOperation
   * @method
   * @memberof Konva.Node.prototype
   * @param {String} type
   * @returns {String}
   * @example
   * // get globalCompositeOperation
   * var globalCompositeOperation = shape.globalCompositeOperation();
   *
   * // set globalCompositeOperation
   * shape.globalCompositeOperation('source-in');
   */
  Konva.Factory.addGetterSetter(
    Konva.Node,
    'opacity',
    1,
    Konva.Validators.getNumberValidator()
  );

  /**
   * get/set opacity.  Opacity values range from 0 to 1.
   *  A node with an opacity of 0 is fully transparent, and a node
   *  with an opacity of 1 is fully opaque
   * @name opacity
   * @method
   * @memberof Konva.Node.prototype
   * @param {Object} opacity
   * @returns {Number}
   * @example
   * // get opacity
   * var opacity = node.opacity();
   *
   * // set opacity
   * node.opacity(0.5);
   */

  Konva.Factory.addGetter(Konva.Node, 'name');
  Konva.Factory.addOverloadedGetterSetter(Konva.Node, 'name');

  /**
   * get/set name
   * @name name
   * @method
   * @memberof Konva.Node.prototype
   * @param {String} name
   * @returns {String}
   * @example
   * // get name
   * var name = node.name();
   *
   * // set name
   * node.name('foo');
   *
   * // also node may have multiple names (as css classes)
   * node.name('foo bar');
   */

  Konva.Factory.addGetter(Konva.Node, 'id');
  Konva.Factory.addOverloadedGetterSetter(Konva.Node, 'id');

  /**
   * get/set id. Id is global for whole page.
   * @name id
   * @method
   * @memberof Konva.Node.prototype
   * @param {String} id
   * @returns {String}
   * @example
   * // get id
   * var name = node.id();
   *
   * // set id
   * node.id('foo');
   */

  Konva.Factory.addGetterSetter(
    Konva.Node,
    'rotation',
    0,
    Konva.Validators.getNumberValidator()
  );

  /**
   * get/set rotation in degrees
   * @name rotation
   * @method
   * @memberof Konva.Node.prototype
   * @param {Number} rotation
   * @returns {Number}
   * @example
   * // get rotation in degrees
   * var rotation = node.rotation();
   *
   * // set rotation in degrees
   * node.rotation(45);
   */

  Konva.Factory.addComponentsGetterSetter(Konva.Node, 'scale', ['x', 'y']);

  /**
   * get/set scale
   * @name scale
   * @param {Object} scale
   * @param {Number} scale.x
   * @param {Number} scale.y
   * @method
   * @memberof Konva.Node.prototype
   * @returns {Object}
   * @example
   * // get scale
   * var scale = node.scale();
   *
   * // set scale
   * shape.scale({
   *   x: 2
   *   y: 3
   * });
   */

  Konva.Factory.addGetterSetter(
    Konva.Node,
    'scaleX',
    1,
    Konva.Validators.getNumberValidator()
  );

  /**
   * get/set scale x
   * @name scaleX
   * @param {Number} x
   * @method
   * @memberof Konva.Node.prototype
   * @returns {Number}
   * @example
   * // get scale x
   * var scaleX = node.scaleX();
   *
   * // set scale x
   * node.scaleX(2);
   */

  Konva.Factory.addGetterSetter(
    Konva.Node,
    'scaleY',
    1,
    Konva.Validators.getNumberValidator()
  );

  /**
   * get/set scale y
   * @name scaleY
   * @param {Number} y
   * @method
   * @memberof Konva.Node.prototype
   * @returns {Number}
   * @example
   * // get scale y
   * var scaleY = node.scaleY();
   *
   * // set scale y
   * node.scaleY(2);
   */

  Konva.Factory.addComponentsGetterSetter(Konva.Node, 'skew', ['x', 'y']);

  /**
   * get/set skew
   * @name skew
   * @param {Object} skew
   * @param {Number} skew.x
   * @param {Number} skew.y
   * @method
   * @memberof Konva.Node.prototype
   * @returns {Object}
   * @example
   * // get skew
   * var skew = node.skew();
   *
   * // set skew
   * node.skew({
   *   x: 20
   *   y: 10
   * });
   */

  Konva.Factory.addGetterSetter(
    Konva.Node,
    'skewX',
    0,
    Konva.Validators.getNumberValidator()
  );

  /**
   * get/set skew x
   * @name skewX
   * @param {Number} x
   * @method
   * @memberof Konva.Node.prototype
   * @returns {Number}
   * @example
   * // get skew x
   * var skewX = node.skewX();
   *
   * // set skew x
   * node.skewX(3);
   */

  Konva.Factory.addGetterSetter(
    Konva.Node,
    'skewY',
    0,
    Konva.Validators.getNumberValidator()
  );

  /**
   * get/set skew y
   * @name skewY
   * @param {Number} y
   * @method
   * @memberof Konva.Node.prototype
   * @returns {Number}
   * @example
   * // get skew y
   * var skewY = node.skewY();
   *
   * // set skew y
   * node.skewY(3);
   */

  Konva.Factory.addComponentsGetterSetter(Konva.Node, 'offset', ['x', 'y']);

  /**
   * get/set offset.  Offsets the default position and rotation point
   * @method
   * @memberof Konva.Node.prototype
   * @param {Object} offset
   * @param {Number} offset.x
   * @param {Number} offset.y
   * @returns {Object}
   * @example
   * // get offset
   * var offset = node.offset();
   *
   * // set offset
   * node.offset({
   *   x: 20
   *   y: 10
   * });
   */

  Konva.Factory.addGetterSetter(
    Konva.Node,
    'offsetX',
    0,
    Konva.Validators.getNumberValidator()
  );

  /**
   * get/set offset x
   * @name offsetX
   * @method
   * @memberof Konva.Node.prototype
   * @param {Number} x
   * @returns {Number}
   * @example
   * // get offset x
   * var offsetX = node.offsetX();
   *
   * // set offset x
   * node.offsetX(3);
   */

  Konva.Factory.addGetterSetter(
    Konva.Node,
    'offsetY',
    0,
    Konva.Validators.getNumberValidator()
  );

  /**
   * get/set offset y
   * @name offsetY
   * @method
   * @memberof Konva.Node.prototype
   * @param {Number} y
   * @returns {Number}
   * @example
   * // get offset y
   * var offsetY = node.offsetY();
   *
   * // set offset y
   * node.offsetY(3);
   */

  Konva.Factory.addSetter(
    Konva.Node,
    'dragDistance',
    Konva.Validators.getNumberValidator()
  );
  Konva.Factory.addOverloadedGetterSetter(Konva.Node, 'dragDistance');

  /**
   * get/set drag distance
   * @name dragDistance
   * @method
   * @memberof Konva.Node.prototype
   * @param {Number} distance
   * @returns {Number}
   * @example
   * // get drag distance
   * var dragDistance = node.dragDistance();
   *
   * // set distance
   * // node starts dragging only if pointer moved more then 3 pixels
   * node.dragDistance(3);
   * // or set globally
   * Konva.dragDistance = 3;
   */

  Konva.Factory.addSetter(
    Konva.Node,
    'width',
    Konva.Validators.getNumberValidator()
  );
  Konva.Factory.addOverloadedGetterSetter(Konva.Node, 'width');
  /**
   * get/set width
   * @name width
   * @method
   * @memberof Konva.Node.prototype
   * @param {Number} width
   * @returns {Number}
   * @example
   * // get width
   * var width = node.width();
   *
   * // set width
   * node.width(100);
   */

  Konva.Factory.addSetter(
    Konva.Node,
    'height',
    Konva.Validators.getNumberValidator()
  );
  Konva.Factory.addOverloadedGetterSetter(Konva.Node, 'height');
  /**
   * get/set height
   * @name height
   * @method
   * @memberof Konva.Node.prototype
   * @param {Number} height
   * @returns {Number}
   * @example
   * // get height
   * var height = node.height();
   *
   * // set height
   * node.height(100);
   */

  Konva.Factory.addGetterSetter(Konva.Node, 'listening', 'inherit', function(
    val
  ) {
    var isValid = val === true || val === false || val === 'inherit';
    if (!isValid) {
      Konva.Util.warn(
        val +
          ' is a not valid value for "listening" attribute. The value may be true, false or "inherit".'
      );
    }
    return val;
  });
  /**
   * get/set listenig attr.  If you need to determine if a node is listening or not
   *   by taking into account its parents, use the isListening() method
   * @name listening
   * @method
   * @memberof Konva.Node.prototype
   * @param {Boolean|String} listening Can be "inherit", true, or false.  The default is "inherit".
   * @returns {Boolean|String}
   * @example
   * // get listening attr
   * var listening = node.listening();
   *
   * // stop listening for events
   * node.listening(false);
   *
   * // listen for events
   * node.listening(true);
   *
   * // listen to events according to the parent
   * node.listening('inherit');
   */

  /**
   * get/set preventDefault
   * By default all shapes will prevent default behaviour
   * of a browser on a pointer move or tap.
   * that will prevent native scrolling when you are trying to drag&drop a node
   * but sometimes you may need to enable default actions
   * in that case you can set the property to false
   * @name preventDefault
   * @method
   * @memberof Konva.Node.prototype
   * @param {Number} preventDefault
   * @returns {Number}
   * @example
   * // get preventDefault
   * var shouldPrevent = shape.preventDefault();
   *
   * // set preventDefault
   * shape.preventDefault(false);
   */

  Konva.Factory.addGetterSetter(
    Konva.Node,
    'preventDefault',
    true,
    Konva.Validators.getBooleanValidator()
  );

  Konva.Factory.addGetterSetter(Konva.Node, 'filters', null, function(val) {
    this._filterUpToDate = false;
    return val;
  });
  /**
   * get/set filters.  Filters are applied to cached canvases
   * @name filters
   * @method
   * @memberof Konva.Node.prototype
   * @param {Array} filters array of filters
   * @returns {Array}
   * @example
   * // get filters
   * var filters = node.filters();
   *
   * // set a single filter
   * node.cache();
   * node.filters([Konva.Filters.Blur]);
   *
   * // set multiple filters
   * node.cache();
   * node.filters([
   *   Konva.Filters.Blur,
   *   Konva.Filters.Sepia,
   *   Konva.Filters.Invert
   * ]);
   */

  Konva.Factory.addGetterSetter(Konva.Node, 'visible', 'inherit', function(
    val
  ) {
    var isValid = val === true || val === false || val === 'inherit';
    if (!isValid) {
      Konva.Util.warn(
        val +
          ' is a not valid value for "visible" attribute. The value may be true, false or "inherit".'
      );
    }
    return val;
  });
  /**
   * get/set visible attr.  Can be "inherit", true, or false.  The default is "inherit".
   *   If you need to determine if a node is visible or not
   *   by taking into account its parents, use the isVisible() method
   * @name visible
   * @method
   * @memberof Konva.Node.prototype
   * @param {Boolean|String} visible
   * @returns {Boolean|String}
   * @example
   * // get visible attr
   * var visible = node.visible();
   *
   * // make invisible
   * node.visible(false);
   *
   * // make visible
   * node.visible(true);
   *
   * // make visible according to the parent
   * node.visible('inherit');
   */

  Konva.Factory.addGetterSetter(
    Konva.Node,
    'transformsEnabled',
    'all',
    Konva.Validators.getStringValidator()
  );

  /**
   * get/set transforms that are enabled.  Can be "all", "none", or "position".  The default
   *  is "all"
   * @name transformsEnabled
   * @method
   * @memberof Konva.Node.prototype
   * @param {String} enabled
   * @returns {String}
   * @example
   * // enable position transform only to improve draw performance
   * node.transformsEnabled('position');
   *
   * // enable all transforms
   * node.transformsEnabled('all');
   */

  /**
   * get/set node size
   * @name size
   * @method
   * @memberof Konva.Node.prototype
   * @param {Object} size
   * @param {Number} size.width
   * @param {Number} size.height
   * @returns {Object}
   * @example
   * // get node size
   * var size = node.size();
   * var x = size.x;
   * var y = size.y;
   *
   * // set size
   * node.size({
   *   width: 100,
   *   height: 200
   * });
   */
  Konva.Factory.addOverloadedGetterSetter(Konva.Node, 'size');

  Konva.Factory.backCompat(Konva.Node, {
    rotateDeg: 'rotate',
    setRotationDeg: 'setRotation',
    getRotationDeg: 'getRotation'
  });

  Konva.Collection.mapMethods(Konva.Node);
})(Konva);

(function() {
  'use strict';
  /**
   * Grayscale Filter
   * @function
   * @memberof Konva.Filters
   * @param {Object} imageData
   * @example
   * node.cache();
   * node.filters([Konva.Filters.Grayscale]);
   */
  Konva.Filters.Grayscale = function(imageData) {
    var data = imageData.data,
      len = data.length,
      i,
      brightness;

    for (i = 0; i < len; i += 4) {
      brightness = 0.34 * data[i] + 0.5 * data[i + 1] + 0.16 * data[i + 2];
      // red
      data[i] = brightness;
      // green
      data[i + 1] = brightness;
      // blue
      data[i + 2] = brightness;
    }
  };
})();

(function(Konva) {
  'use strict';
  /**
   * Brighten Filter.
   * @function
   * @memberof Konva.Filters
   * @param {Object} imageData
   * @example
   * node.cache();
   * node.filters([Konva.Filters.Brighten]);
   * node.brightness(0.8);
   */
  Konva.Filters.Brighten = function(imageData) {
    var brightness = this.brightness() * 255,
      data = imageData.data,
      len = data.length,
      i;

    for (i = 0; i < len; i += 4) {
      // red
      data[i] += brightness;
      // green
      data[i + 1] += brightness;
      // blue
      data[i + 2] += brightness;
    }
  };

  Konva.Factory.addGetterSetter(
    Konva.Node,
    'brightness',
    0,
    Konva.Validators.getNumberValidator(),
    Konva.Factory.afterSetFilter
  );
  /**
   * get/set filter brightness.  The brightness is a number between -1 and 1.&nbsp; Positive values
   *  brighten the pixels and negative values darken them. Use with {@link Konva.Filters.Brighten} filter.
   * @name brightness
   * @method
   * @memberof Konva.Node.prototype
   * @param {Number} brightness value between -1 and 1
   * @returns {Number}
   */
})(Konva);

(function() {
  'use strict';
  /**
   * Invert Filter
   * @function
   * @memberof Konva.Filters
   * @param {Object} imageData
   * @example
   * node.cache();
   * node.filters([Konva.Filters.Invert]);
   */
  Konva.Filters.Invert = function(imageData) {
    var data = imageData.data,
      len = data.length,
      i;

    for (i = 0; i < len; i += 4) {
      // red
      data[i] = 255 - data[i];
      // green
      data[i + 1] = 255 - data[i + 1];
      // blue
      data[i + 2] = 255 - data[i + 2];
    }
  };
})();

/*
 the Gauss filter
 master repo: https://github.com/pavelpower/kineticjsGaussFilter
*/
(function(Konva) {
  'use strict';
  /*

     StackBlur - a fast almost Gaussian Blur For Canvas

     Version:   0.5
     Author:    Mario Klingemann
     Contact:   mario@quasimondo.com
     Website:   http://www.quasimondo.com/StackBlurForCanvas
     Twitter:   @quasimondo

     In case you find this class useful - especially in commercial projects -
     I am not totally unhappy for a small donation to my PayPal account
     mario@quasimondo.de

     Or support me on flattr:
     https://flattr.com/thing/72791/StackBlur-a-fast-almost-Gaussian-Blur-Effect-for-CanvasJavascript

     Copyright (c) 2010 Mario Klingemann

     Permission is hereby granted, free of charge, to any person
     obtaining a copy of this software and associated documentation
     files (the "Software"), to deal in the Software without
     restriction, including without limitation the rights to use,
     copy, modify, merge, publish, distribute, sublicense, and/or sell
     copies of the Software, and to permit persons to whom the
     Software is furnished to do so, subject to the following
     conditions:

     The above copyright notice and this permission notice shall be
     included in all copies or substantial portions of the Software.

     THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
     EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
     OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
     NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
     HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
     WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
     FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
     OTHER DEALINGS IN THE SOFTWARE.
     */

  function BlurStack() {
    this.r = 0;
    this.g = 0;
    this.b = 0;
    this.a = 0;
    this.next = null;
  }

  var mul_table = [
    512,
    512,
    456,
    512,
    328,
    456,
    335,
    512,
    405,
    328,
    271,
    456,
    388,
    335,
    292,
    512,
    454,
    405,
    364,
    328,
    298,
    271,
    496,
    456,
    420,
    388,
    360,
    335,
    312,
    292,
    273,
    512,
    482,
    454,
    428,
    405,
    383,
    364,
    345,
    328,
    312,
    298,
    284,
    271,
    259,
    496,
    475,
    456,
    437,
    420,
    404,
    388,
    374,
    360,
    347,
    335,
    323,
    312,
    302,
    292,
    282,
    273,
    265,
    512,
    497,
    482,
    468,
    454,
    441,
    428,
    417,
    405,
    394,
    383,
    373,
    364,
    354,
    345,
    337,
    328,
    320,
    312,
    305,
    298,
    291,
    284,
    278,
    271,
    265,
    259,
    507,
    496,
    485,
    475,
    465,
    456,
    446,
    437,
    428,
    420,
    412,
    404,
    396,
    388,
    381,
    374,
    367,
    360,
    354,
    347,
    341,
    335,
    329,
    323,
    318,
    312,
    307,
    302,
    297,
    292,
    287,
    282,
    278,
    273,
    269,
    265,
    261,
    512,
    505,
    497,
    489,
    482,
    475,
    468,
    461,
    454,
    447,
    441,
    435,
    428,
    422,
    417,
    411,
    405,
    399,
    394,
    389,
    383,
    378,
    373,
    368,
    364,
    359,
    354,
    350,
    345,
    341,
    337,
    332,
    328,
    324,
    320,
    316,
    312,
    309,
    305,
    301,
    298,
    294,
    291,
    287,
    284,
    281,
    278,
    274,
    271,
    268,
    265,
    262,
    259,
    257,
    507,
    501,
    496,
    491,
    485,
    480,
    475,
    470,
    465,
    460,
    456,
    451,
    446,
    442,
    437,
    433,
    428,
    424,
    420,
    416,
    412,
    408,
    404,
    400,
    396,
    392,
    388,
    385,
    381,
    377,
    374,
    370,
    367,
    363,
    360,
    357,
    354,
    350,
    347,
    344,
    341,
    338,
    335,
    332,
    329,
    326,
    323,
    320,
    318,
    315,
    312,
    310,
    307,
    304,
    302,
    299,
    297,
    294,
    292,
    289,
    287,
    285,
    282,
    280,
    278,
    275,
    273,
    271,
    269,
    267,
    265,
    263,
    261,
    259
  ];

  var shg_table = [
    9,
    11,
    12,
    13,
    13,
    14,
    14,
    15,
    15,
    15,
    15,
    16,
    16,
    16,
    16,
    17,
    17,
    17,
    17,
    17,
    17,
    17,
    18,
    18,
    18,
    18,
    18,
    18,
    18,
    18,
    18,
    19,
    19,
    19,
    19,
    19,
    19,
    19,
    19,
    19,
    19,
    19,
    19,
    19,
    19,
    20,
    20,
    20,
    20,
    20,
    20,
    20,
    20,
    20,
    20,
    20,
    20,
    20,
    20,
    20,
    20,
    20,
    20,
    21,
    21,
    21,
    21,
    21,
    21,
    21,
    21,
    21,
    21,
    21,
    21,
    21,
    21,
    21,
    21,
    21,
    21,
    21,
    21,
    21,
    21,
    21,
    21,
    21,
    21,
    21,
    22,
    22,
    22,
    22,
    22,
    22,
    22,
    22,
    22,
    22,
    22,
    22,
    22,
    22,
    22,
    22,
    22,
    22,
    22,
    22,
    22,
    22,
    22,
    22,
    22,
    22,
    22,
    22,
    22,
    22,
    22,
    22,
    22,
    22,
    22,
    22,
    22,
    23,
    23,
    23,
    23,
    23,
    23,
    23,
    23,
    23,
    23,
    23,
    23,
    23,
    23,
    23,
    23,
    23,
    23,
    23,
    23,
    23,
    23,
    23,
    23,
    23,
    23,
    23,
    23,
    23,
    23,
    23,
    23,
    23,
    23,
    23,
    23,
    23,
    23,
    23,
    23,
    23,
    23,
    23,
    23,
    23,
    23,
    23,
    23,
    23,
    23,
    23,
    23,
    23,
    23,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24
  ];

  function filterGaussBlurRGBA(imageData, radius) {
    var pixels = imageData.data,
      width = imageData.width,
      height = imageData.height;

    var x,
      y,
      i,
      p,
      yp,
      yi,
      yw,
      r_sum,
      g_sum,
      b_sum,
      a_sum,
      r_out_sum,
      g_out_sum,
      b_out_sum,
      a_out_sum,
      r_in_sum,
      g_in_sum,
      b_in_sum,
      a_in_sum,
      pr,
      pg,
      pb,
      pa,
      rbs;

    var div = radius + radius + 1,
      widthMinus1 = width - 1,
      heightMinus1 = height - 1,
      radiusPlus1 = radius + 1,
      sumFactor = radiusPlus1 * (radiusPlus1 + 1) / 2,
      stackStart = new BlurStack(),
      stackEnd = null,
      stack = stackStart,
      stackIn = null,
      stackOut = null,
      mul_sum = mul_table[radius],
      shg_sum = shg_table[radius];

    for (i = 1; i < div; i++) {
      stack = stack.next = new BlurStack();
      if (i === radiusPlus1) {
        stackEnd = stack;
      }
    }

    stack.next = stackStart;

    yw = yi = 0;

    for (y = 0; y < height; y++) {
      r_in_sum = g_in_sum = b_in_sum = a_in_sum = r_sum = g_sum = b_sum = a_sum = 0;

      r_out_sum = radiusPlus1 * (pr = pixels[yi]);
      g_out_sum = radiusPlus1 * (pg = pixels[yi + 1]);
      b_out_sum = radiusPlus1 * (pb = pixels[yi + 2]);
      a_out_sum = radiusPlus1 * (pa = pixels[yi + 3]);

      r_sum += sumFactor * pr;
      g_sum += sumFactor * pg;
      b_sum += sumFactor * pb;
      a_sum += sumFactor * pa;

      stack = stackStart;

      for (i = 0; i < radiusPlus1; i++) {
        stack.r = pr;
        stack.g = pg;
        stack.b = pb;
        stack.a = pa;
        stack = stack.next;
      }

      for (i = 1; i < radiusPlus1; i++) {
        p = yi + ((widthMinus1 < i ? widthMinus1 : i) << 2);
        r_sum += (stack.r = pr = pixels[p]) * (rbs = radiusPlus1 - i);
        g_sum += (stack.g = pg = pixels[p + 1]) * rbs;
        b_sum += (stack.b = pb = pixels[p + 2]) * rbs;
        a_sum += (stack.a = pa = pixels[p + 3]) * rbs;

        r_in_sum += pr;
        g_in_sum += pg;
        b_in_sum += pb;
        a_in_sum += pa;

        stack = stack.next;
      }

      stackIn = stackStart;
      stackOut = stackEnd;
      for (x = 0; x < width; x++) {
        pixels[yi + 3] = pa = (a_sum * mul_sum) >> shg_sum;
        if (pa !== 0) {
          pa = 255 / pa;
          pixels[yi] = ((r_sum * mul_sum) >> shg_sum) * pa;
          pixels[yi + 1] = ((g_sum * mul_sum) >> shg_sum) * pa;
          pixels[yi + 2] = ((b_sum * mul_sum) >> shg_sum) * pa;
        } else {
          pixels[yi] = pixels[yi + 1] = pixels[yi + 2] = 0;
        }

        r_sum -= r_out_sum;
        g_sum -= g_out_sum;
        b_sum -= b_out_sum;
        a_sum -= a_out_sum;

        r_out_sum -= stackIn.r;
        g_out_sum -= stackIn.g;
        b_out_sum -= stackIn.b;
        a_out_sum -= stackIn.a;

        p = (yw + ((p = x + radius + 1) < widthMinus1 ? p : widthMinus1)) << 2;

        r_in_sum += stackIn.r = pixels[p];
        g_in_sum += stackIn.g = pixels[p + 1];
        b_in_sum += stackIn.b = pixels[p + 2];
        a_in_sum += stackIn.a = pixels[p + 3];

        r_sum += r_in_sum;
        g_sum += g_in_sum;
        b_sum += b_in_sum;
        a_sum += a_in_sum;

        stackIn = stackIn.next;

        r_out_sum += pr = stackOut.r;
        g_out_sum += pg = stackOut.g;
        b_out_sum += pb = stackOut.b;
        a_out_sum += pa = stackOut.a;

        r_in_sum -= pr;
        g_in_sum -= pg;
        b_in_sum -= pb;
        a_in_sum -= pa;

        stackOut = stackOut.next;

        yi += 4;
      }
      yw += width;
    }

    for (x = 0; x < width; x++) {
      g_in_sum = b_in_sum = a_in_sum = r_in_sum = g_sum = b_sum = a_sum = r_sum = 0;

      yi = x << 2;
      r_out_sum = radiusPlus1 * (pr = pixels[yi]);
      g_out_sum = radiusPlus1 * (pg = pixels[yi + 1]);
      b_out_sum = radiusPlus1 * (pb = pixels[yi + 2]);
      a_out_sum = radiusPlus1 * (pa = pixels[yi + 3]);

      r_sum += sumFactor * pr;
      g_sum += sumFactor * pg;
      b_sum += sumFactor * pb;
      a_sum += sumFactor * pa;

      stack = stackStart;

      for (i = 0; i < radiusPlus1; i++) {
        stack.r = pr;
        stack.g = pg;
        stack.b = pb;
        stack.a = pa;
        stack = stack.next;
      }

      yp = width;

      for (i = 1; i <= radius; i++) {
        yi = (yp + x) << 2;

        r_sum += (stack.r = pr = pixels[yi]) * (rbs = radiusPlus1 - i);
        g_sum += (stack.g = pg = pixels[yi + 1]) * rbs;
        b_sum += (stack.b = pb = pixels[yi + 2]) * rbs;
        a_sum += (stack.a = pa = pixels[yi + 3]) * rbs;

        r_in_sum += pr;
        g_in_sum += pg;
        b_in_sum += pb;
        a_in_sum += pa;

        stack = stack.next;

        if (i < heightMinus1) {
          yp += width;
        }
      }

      yi = x;
      stackIn = stackStart;
      stackOut = stackEnd;
      for (y = 0; y < height; y++) {
        p = yi << 2;
        pixels[p + 3] = pa = (a_sum * mul_sum) >> shg_sum;
        if (pa > 0) {
          pa = 255 / pa;
          pixels[p] = ((r_sum * mul_sum) >> shg_sum) * pa;
          pixels[p + 1] = ((g_sum * mul_sum) >> shg_sum) * pa;
          pixels[p + 2] = ((b_sum * mul_sum) >> shg_sum) * pa;
        } else {
          pixels[p] = pixels[p + 1] = pixels[p + 2] = 0;
        }

        r_sum -= r_out_sum;
        g_sum -= g_out_sum;
        b_sum -= b_out_sum;
        a_sum -= a_out_sum;

        r_out_sum -= stackIn.r;
        g_out_sum -= stackIn.g;
        b_out_sum -= stackIn.b;
        a_out_sum -= stackIn.a;

        p =
          (x +
            ((p = y + radiusPlus1) < heightMinus1 ? p : heightMinus1) *
              width) <<
          2;

        r_sum += r_in_sum += stackIn.r = pixels[p];
        g_sum += g_in_sum += stackIn.g = pixels[p + 1];
        b_sum += b_in_sum += stackIn.b = pixels[p + 2];
        a_sum += a_in_sum += stackIn.a = pixels[p + 3];

        stackIn = stackIn.next;

        r_out_sum += pr = stackOut.r;
        g_out_sum += pg = stackOut.g;
        b_out_sum += pb = stackOut.b;
        a_out_sum += pa = stackOut.a;

        r_in_sum -= pr;
        g_in_sum -= pg;
        b_in_sum -= pb;
        a_in_sum -= pa;

        stackOut = stackOut.next;

        yi += width;
      }
    }
  }

  /**
   * Blur Filter
   * @function
   * @name Blur
   * @memberof Konva.Filters
   * @param {Object} imageData
   * @example
   * node.cache();
   * node.filters([Konva.Filters.Blur]);
   * node.blurRadius(10);
   */
  Konva.Filters.Blur = function Blur(imageData) {
    var radius = Math.round(this.blurRadius());

    if (radius > 0) {
      filterGaussBlurRGBA(imageData, radius);
    }
  };

  Konva.Factory.addGetterSetter(
    Konva.Node,
    'blurRadius',
    0,
    Konva.Validators.getNumberValidator(),
    Konva.Factory.afterSetFilter
  );

  /**
   * get/set blur radius. Use with {@link Konva.Filters.Blur} filter
   * @name blurRadius
   * @method
   * @memberof Konva.Node.prototype
   * @param {Integer} radius
   * @returns {Integer}
   */
})(Konva);

/*eslint-disable  max-depth */
(function() {
  'use strict';
  function pixelAt(idata, x, y) {
    var idx = (y * idata.width + x) * 4;
    var d = [];
    d.push(
      idata.data[idx++],
      idata.data[idx++],
      idata.data[idx++],
      idata.data[idx++]
    );
    return d;
  }

  function rgbDistance(p1, p2) {
    return Math.sqrt(
      Math.pow(p1[0] - p2[0], 2) +
        Math.pow(p1[1] - p2[1], 2) +
        Math.pow(p1[2] - p2[2], 2)
    );
  }

  function rgbMean(pTab) {
    var m = [0, 0, 0];

    for (var i = 0; i < pTab.length; i++) {
      m[0] += pTab[i][0];
      m[1] += pTab[i][1];
      m[2] += pTab[i][2];
    }

    m[0] /= pTab.length;
    m[1] /= pTab.length;
    m[2] /= pTab.length;

    return m;
  }

  function backgroundMask(idata, threshold) {
    var rgbv_no = pixelAt(idata, 0, 0);
    var rgbv_ne = pixelAt(idata, idata.width - 1, 0);
    var rgbv_so = pixelAt(idata, 0, idata.height - 1);
    var rgbv_se = pixelAt(idata, idata.width - 1, idata.height - 1);

    var thres = threshold || 10;
    if (
      rgbDistance(rgbv_no, rgbv_ne) < thres &&
      rgbDistance(rgbv_ne, rgbv_se) < thres &&
      rgbDistance(rgbv_se, rgbv_so) < thres &&
      rgbDistance(rgbv_so, rgbv_no) < thres
    ) {
      // Mean color
      var mean = rgbMean([rgbv_ne, rgbv_no, rgbv_se, rgbv_so]);

      // Mask based on color distance
      var mask = [];
      for (var i = 0; i < idata.width * idata.height; i++) {
        var d = rgbDistance(mean, [
          idata.data[i * 4],
          idata.data[i * 4 + 1],
          idata.data[i * 4 + 2]
        ]);
        mask[i] = d < thres ? 0 : 255;
      }

      return mask;
    }
  }

  function applyMask(idata, mask) {
    for (var i = 0; i < idata.width * idata.height; i++) {
      idata.data[4 * i + 3] = mask[i];
    }
  }

  function erodeMask(mask, sw, sh) {
    var weights = [1, 1, 1, 1, 0, 1, 1, 1, 1];
    var side = Math.round(Math.sqrt(weights.length));
    var halfSide = Math.floor(side / 2);

    var maskResult = [];
    for (var y = 0; y < sh; y++) {
      for (var x = 0; x < sw; x++) {
        var so = y * sw + x;
        var a = 0;
        for (var cy = 0; cy < side; cy++) {
          for (var cx = 0; cx < side; cx++) {
            var scy = y + cy - halfSide;
            var scx = x + cx - halfSide;

            if (scy >= 0 && scy < sh && scx >= 0 && scx < sw) {
              var srcOff = scy * sw + scx;
              var wt = weights[cy * side + cx];

              a += mask[srcOff] * wt;
            }
          }
        }

        maskResult[so] = a === 255 * 8 ? 255 : 0;
      }
    }

    return maskResult;
  }

  function dilateMask(mask, sw, sh) {
    var weights = [1, 1, 1, 1, 1, 1, 1, 1, 1];
    var side = Math.round(Math.sqrt(weights.length));
    var halfSide = Math.floor(side / 2);

    var maskResult = [];
    for (var y = 0; y < sh; y++) {
      for (var x = 0; x < sw; x++) {
        var so = y * sw + x;
        var a = 0;
        for (var cy = 0; cy < side; cy++) {
          for (var cx = 0; cx < side; cx++) {
            var scy = y + cy - halfSide;
            var scx = x + cx - halfSide;

            if (scy >= 0 && scy < sh && scx >= 0 && scx < sw) {
              var srcOff = scy * sw + scx;
              var wt = weights[cy * side + cx];

              a += mask[srcOff] * wt;
            }
          }
        }

        maskResult[so] = a >= 255 * 4 ? 255 : 0;
      }
    }

    return maskResult;
  }

  function smoothEdgeMask(mask, sw, sh) {
    var weights = [
      1 / 9,
      1 / 9,
      1 / 9,
      1 / 9,
      1 / 9,
      1 / 9,
      1 / 9,
      1 / 9,
      1 / 9
    ];
    var side = Math.round(Math.sqrt(weights.length));
    var halfSide = Math.floor(side / 2);

    var maskResult = [];
    for (var y = 0; y < sh; y++) {
      for (var x = 0; x < sw; x++) {
        var so = y * sw + x;
        var a = 0;
        for (var cy = 0; cy < side; cy++) {
          for (var cx = 0; cx < side; cx++) {
            var scy = y + cy - halfSide;
            var scx = x + cx - halfSide;

            if (scy >= 0 && scy < sh && scx >= 0 && scx < sw) {
              var srcOff = scy * sw + scx;
              var wt = weights[cy * side + cx];

              a += mask[srcOff] * wt;
            }
          }
        }

        maskResult[so] = a;
      }
    }

    return maskResult;
  }

  /**
   * Mask Filter
   * @function
   * @name Mask
   * @memberof Konva.Filters
   * @param {Object} imageData
   * @example
   * node.cache();
   * node.filters([Konva.Filters.Mask]);
   * node.threshold(200);
   */
  Konva.Filters.Mask = function(imageData) {
    // Detect pixels close to the background color
    var threshold = this.threshold(),
      mask = backgroundMask(imageData, threshold);
    if (mask) {
      // Erode
      mask = erodeMask(mask, imageData.width, imageData.height);

      // Dilate
      mask = dilateMask(mask, imageData.width, imageData.height);

      // Gradient
      mask = smoothEdgeMask(mask, imageData.width, imageData.height);

      // Apply mask
      applyMask(imageData, mask);

      // todo : Update hit region function according to mask
    }

    return imageData;
  };

  Konva.Factory.addGetterSetter(
    Konva.Node,
    'threshold',
    0,
    Konva.Validators.getNumberValidator(),
    Konva.Factory.afterSetFilter
  );
})();

(function() {
  'use strict';
  /**
   * RGB Filter
   * @function
   * @name RGB
   * @memberof Konva.Filters
   * @param {Object} imageData
   * @author ippo615
   * @example
   * node.cache();
   * node.filters([Konva.Filters.RGB]);
   * node.blue(120);
   * node.green(200);
   */
  Konva.Filters.RGB = function(imageData) {
    var data = imageData.data,
      nPixels = data.length,
      red = this.red(),
      green = this.green(),
      blue = this.blue(),
      i,
      brightness;

    for (i = 0; i < nPixels; i += 4) {
      brightness =
        (0.34 * data[i] + 0.5 * data[i + 1] + 0.16 * data[i + 2]) / 255;
      data[i] = brightness * red; // r
      data[i + 1] = brightness * green; // g
      data[i + 2] = brightness * blue; // b
      data[i + 3] = data[i + 3]; // alpha
    }
  };

  Konva.Factory.addGetterSetter(Konva.Node, 'red', 0, function(val) {
    this._filterUpToDate = false;
    if (val > 255) {
      return 255;
    } else if (val < 0) {
      return 0;
    } else {
      return Math.round(val);
    }
  });
  /**
   * get/set filter red value. Use with {@link Konva.Filters.RGB} filter.
   * @name red
   * @method
   * @memberof Konva.Node.prototype
   * @param {Integer} red value between 0 and 255
   * @returns {Integer}
   */

  Konva.Factory.addGetterSetter(Konva.Node, 'green', 0, function(val) {
    this._filterUpToDate = false;
    if (val > 255) {
      return 255;
    } else if (val < 0) {
      return 0;
    } else {
      return Math.round(val);
    }
  });
  /**
   * get/set filter green value. Use with {@link Konva.Filters.RGB} filter.
   * @name green
   * @method
   * @memberof Konva.Node.prototype
   * @param {Integer} green value between 0 and 255
   * @returns {Integer}
   */

  Konva.Factory.addGetterSetter(
    Konva.Node,
    'blue',
    0,
    Konva.Validators.RGBComponent,
    Konva.Factory.afterSetFilter
  );
  /**
   * get/set filter blue value. Use with {@link Konva.Filters.RGB} filter.
   * @name blue
   * @method
   * @memberof Konva.Node.prototype
   * @param {Integer} blue value between 0 and 255
   * @returns {Integer}
   */
})();

(function() {
  'use strict';
  /**
   * RGBA Filter
   * @function
   * @name RGBA
   * @memberof Konva.Filters
   * @param {Object} imageData
   * @author codefo
   * @example
   * node.cache();
   * node.filters([Konva.Filters.RGBA]);
   * node.blue(120);
   * node.green(200);
   * node.alpha(0.3);
   */
  Konva.Filters.RGBA = function(imageData) {
    var data = imageData.data,
      nPixels = data.length,
      red = this.red(),
      green = this.green(),
      blue = this.blue(),
      alpha = this.alpha(),
      i,
      ia;

    for (i = 0; i < nPixels; i += 4) {
      ia = 1 - alpha;

      data[i] = red * alpha + data[i] * ia; // r
      data[i + 1] = green * alpha + data[i + 1] * ia; // g
      data[i + 2] = blue * alpha + data[i + 2] * ia; // b
    }
  };

  Konva.Factory.addGetterSetter(Konva.Node, 'red', 0, function(val) {
    this._filterUpToDate = false;
    if (val > 255) {
      return 255;
    } else if (val < 0) {
      return 0;
    } else {
      return Math.round(val);
    }
  });
  /**
   * get/set filter red value. Use with {@link Konva.Filters.RGBA} filter.
   * @name red
   * @method
   * @memberof Konva.Node.prototype
   * @param {Integer} red value between 0 and 255
   * @returns {Integer}
   */

  Konva.Factory.addGetterSetter(Konva.Node, 'green', 0, function(val) {
    this._filterUpToDate = false;
    if (val > 255) {
      return 255;
    } else if (val < 0) {
      return 0;
    } else {
      return Math.round(val);
    }
  });
  /**
   * get/set filter green value. Use with {@link Konva.Filters.RGBA} filter.
   * @name green
   * @method
   * @memberof Konva.Node.prototype
   * @param {Integer} green value between 0 and 255
   * @returns {Integer}
   */

  Konva.Factory.addGetterSetter(
    Konva.Node,
    'blue',
    0,
    Konva.Validators.RGBComponent,
    Konva.Factory.afterSetFilter
  );
  /**
   * get/set filter blue value. Use with {@link Konva.Filters.RGBA} filter.
   * @name blue
   * @method
   * @memberof Konva.Node.prototype
   * @param {Integer} blue value between 0 and 255
   * @returns {Integer}
   */

  Konva.Factory.addGetterSetter(Konva.Node, 'alpha', 1, function(val) {
    this._filterUpToDate = false;
    if (val > 1) {
      return 1;
    } else if (val < 0) {
      return 0;
    } else {
      return val;
    }
  });
  /**
   * get/set filter alpha value. Use with {@link Konva.Filters.RGBA} filter.
   * @name alpha
   * @method
   * @memberof Konva.Node.prototype
   * @param {Float} alpha value between 0 and 1
   * @returns {Float}
   */
})();

(function() {
  'use strict';
  /**
   * HSV Filter. Adjusts the hue, saturation and value
   * @function
   * @name HSV
   * @memberof Konva.Filters
   * @param {Object} imageData
   * @author ippo615
   * @example
   * image.filters([Konva.Filters.HSV]);
   * image.value(200);
   */

  Konva.Filters.HSV = function(imageData) {
    var data = imageData.data,
      nPixels = data.length,
      v = Math.pow(2, this.value()),
      s = Math.pow(2, this.saturation()),
      h = Math.abs(this.hue() + 360) % 360,
      i;

    // Basis for the technique used:
    // http://beesbuzz.biz/code/hsv_color_transforms.php
    // V is the value multiplier (1 for none, 2 for double, 0.5 for half)
    // S is the saturation multiplier (1 for none, 2 for double, 0.5 for half)
    // H is the hue shift in degrees (0 to 360)
    // vsu = V*S*cos(H*PI/180);
    // vsw = V*S*sin(H*PI/180);
    //[ .299V+.701vsu+.168vsw    .587V-.587vsu+.330vsw    .114V-.114vsu-.497vsw ] [R]
    //[ .299V-.299vsu-.328vsw    .587V+.413vsu+.035vsw    .114V-.114vsu+.292vsw ]*[G]
    //[ .299V-.300vsu+1.25vsw    .587V-.588vsu-1.05vsw    .114V+.886vsu-.203vsw ] [B]

    // Precompute the values in the matrix:
    var vsu = v * s * Math.cos(h * Math.PI / 180),
      vsw = v * s * Math.sin(h * Math.PI / 180);
    // (result spot)(source spot)
    var rr = 0.299 * v + 0.701 * vsu + 0.167 * vsw,
      rg = 0.587 * v - 0.587 * vsu + 0.33 * vsw,
      rb = 0.114 * v - 0.114 * vsu - 0.497 * vsw;
    var gr = 0.299 * v - 0.299 * vsu - 0.328 * vsw,
      gg = 0.587 * v + 0.413 * vsu + 0.035 * vsw,
      gb = 0.114 * v - 0.114 * vsu + 0.293 * vsw;
    var br = 0.299 * v - 0.3 * vsu + 1.25 * vsw,
      bg = 0.587 * v - 0.586 * vsu - 1.05 * vsw,
      bb = 0.114 * v + 0.886 * vsu - 0.2 * vsw;

    var r, g, b, a;

    for (i = 0; i < nPixels; i += 4) {
      r = data[i + 0];
      g = data[i + 1];
      b = data[i + 2];
      a = data[i + 3];

      data[i + 0] = rr * r + rg * g + rb * b;
      data[i + 1] = gr * r + gg * g + gb * b;
      data[i + 2] = br * r + bg * g + bb * b;
      data[i + 3] = a; // alpha
    }
  };

  Konva.Factory.addGetterSetter(
    Konva.Node,
    'hue',
    0,
    Konva.Validators.getNumberValidator(),
    Konva.Factory.afterSetFilter
  );
  /**
   * get/set hsv hue in degrees. Use with {@link Konva.Filters.HSV} or {@link Konva.Filters.HSL} filter.
   * @name hue
   * @method
   * @memberof Konva.Node.prototype
   * @param {Number} hue value between 0 and 359
   * @returns {Number}
   */

  Konva.Factory.addGetterSetter(
    Konva.Node,
    'saturation',
    0,
    Konva.Validators.getNumberValidator(),
    Konva.Factory.afterSetFilter
  );
  /**
   * get/set hsv saturation. Use with {@link Konva.Filters.HSV} or {@link Konva.Filters.HSL} filter.
   * @name saturation
   * @method
   * @memberof Konva.Node.prototype
   * @param {Number} saturation 0 is no change, -1.0 halves the saturation, 1.0 doubles, etc..
   * @returns {Number}
   */

  Konva.Factory.addGetterSetter(
    Konva.Node,
    'value',
    0,
    Konva.Validators.getNumberValidator(),
    Konva.Factory.afterSetFilter
  );
  /**
   * get/set hsv value. Use with {@link Konva.Filters.HSV} filter.
   * @name value
   * @method
   * @memberof Konva.Node.prototype
   * @param {Number} value 0 is no change, -1.0 halves the value, 1.0 doubles, etc..
   * @returns {Number}
   */
})();

(function() {
  'use strict';
  Konva.Factory.addGetterSetter(
    Konva.Node,
    'hue',
    0,
    Konva.Validators.getNumberValidator(),
    Konva.Factory.afterSetFilter
  );
  /**
   * get/set hsv hue in degrees. Use with {@link Konva.Filters.HSV} or {@link Konva.Filters.HSL} filter.
   * @name hue
   * @method
   * @memberof Konva.Node.prototype
   * @param {Number} hue value between 0 and 359
   * @returns {Number}
   */

  Konva.Factory.addGetterSetter(
    Konva.Node,
    'saturation',
    0,
    Konva.Validators.getNumberValidator(),
    Konva.Factory.afterSetFilter
  );
  /**
   * get/set hsv saturation. Use with {@link Konva.Filters.HSV} or {@link Konva.Filters.HSL} filter.
   * @name saturation
   * @method
   * @memberof Konva.Node.prototype
   * @param {Number} saturation 0 is no change, -1.0 halves the saturation, 1.0 doubles, etc..
   * @returns {Number}
   */

  Konva.Factory.addGetterSetter(
    Konva.Node,
    'luminance',
    0,
    Konva.Validators.getNumberValidator(),
    Konva.Factory.afterSetFilter
  );
  /**
   * get/set hsl luminance. Use with {@link Konva.Filters.HSL} filter.
   * @name value
   * @method
   * @memberof Konva.Node.prototype
   * @param {Number} value from -1 to 1
   * @returns {Number}
   */

  /**
   * HSL Filter. Adjusts the hue, saturation and luminance (or lightness)
   * @function
   * @memberof Konva.Filters
   * @param {Object} imageData
   * @author ippo615
   * @example
   * image.filters([Konva.Filters.HSL]);
   * image.luminance(200);
   */

  Konva.Filters.HSL = function(imageData) {
    var data = imageData.data,
      nPixels = data.length,
      v = 1,
      s = Math.pow(2, this.saturation()),
      h = Math.abs(this.hue() + 360) % 360,
      l = this.luminance() * 127,
      i;

    // Basis for the technique used:
    // http://beesbuzz.biz/code/hsv_color_transforms.php
    // V is the value multiplier (1 for none, 2 for double, 0.5 for half)
    // S is the saturation multiplier (1 for none, 2 for double, 0.5 for half)
    // H is the hue shift in degrees (0 to 360)
    // vsu = V*S*cos(H*PI/180);
    // vsw = V*S*sin(H*PI/180);
    //[ .299V+.701vsu+.168vsw    .587V-.587vsu+.330vsw    .114V-.114vsu-.497vsw ] [R]
    //[ .299V-.299vsu-.328vsw    .587V+.413vsu+.035vsw    .114V-.114vsu+.292vsw ]*[G]
    //[ .299V-.300vsu+1.25vsw    .587V-.588vsu-1.05vsw    .114V+.886vsu-.203vsw ] [B]

    // Precompute the values in the matrix:
    var vsu = v * s * Math.cos(h * Math.PI / 180),
      vsw = v * s * Math.sin(h * Math.PI / 180);
    // (result spot)(source spot)
    var rr = 0.299 * v + 0.701 * vsu + 0.167 * vsw,
      rg = 0.587 * v - 0.587 * vsu + 0.33 * vsw,
      rb = 0.114 * v - 0.114 * vsu - 0.497 * vsw;
    var gr = 0.299 * v - 0.299 * vsu - 0.328 * vsw,
      gg = 0.587 * v + 0.413 * vsu + 0.035 * vsw,
      gb = 0.114 * v - 0.114 * vsu + 0.293 * vsw;
    var br = 0.299 * v - 0.3 * vsu + 1.25 * vsw,
      bg = 0.587 * v - 0.586 * vsu - 1.05 * vsw,
      bb = 0.114 * v + 0.886 * vsu - 0.2 * vsw;

    var r, g, b, a;

    for (i = 0; i < nPixels; i += 4) {
      r = data[i + 0];
      g = data[i + 1];
      b = data[i + 2];
      a = data[i + 3];

      data[i + 0] = rr * r + rg * g + rb * b + l;
      data[i + 1] = gr * r + gg * g + gb * b + l;
      data[i + 2] = br * r + bg * g + bb * b + l;
      data[i + 3] = a; // alpha
    }
  };
})();

(function() {
  'use strict';
  /**
   * Emboss Filter.
   * Pixastic Lib - Emboss filter - v0.1.0
   * Copyright (c) 2008 Jacob Seidelin, jseidelin@nihilogic.dk, http://blog.nihilogic.dk/
   * License: [http://www.pixastic.com/lib/license.txt]
   * @function
   * @memberof Konva.Filters
   * @param {Object} imageData
   * @example
   * node.cache();
   * node.filters([Konva.Filters.Emboss]);
   * node.embossStrength(0.8);
   * node.embossWhiteLevel(0.3);
   * node.embossDirection('right');
   * node.embossBlend(true);
   */
  Konva.Filters.Emboss = function(imageData) {
    // pixastic strength is between 0 and 10.  I want it between 0 and 1
    // pixastic greyLevel is between 0 and 255.  I want it between 0 and 1.  Also,
    // a max value of greyLevel yields a white emboss, and the min value yields a black
    // emboss.  Therefore, I changed greyLevel to whiteLevel
    var strength = this.embossStrength() * 10,
      greyLevel = this.embossWhiteLevel() * 255,
      direction = this.embossDirection(),
      blend = this.embossBlend(),
      dirY = 0,
      dirX = 0,
      data = imageData.data,
      w = imageData.width,
      h = imageData.height,
      w4 = w * 4,
      y = h;

    switch (direction) {
      case 'top-left':
        dirY = -1;
        dirX = -1;
        break;
      case 'top':
        dirY = -1;
        dirX = 0;
        break;
      case 'top-right':
        dirY = -1;
        dirX = 1;
        break;
      case 'right':
        dirY = 0;
        dirX = 1;
        break;
      case 'bottom-right':
        dirY = 1;
        dirX = 1;
        break;
      case 'bottom':
        dirY = 1;
        dirX = 0;
        break;
      case 'bottom-left':
        dirY = 1;
        dirX = -1;
        break;
      case 'left':
        dirY = 0;
        dirX = -1;
        break;
      default:
        Konva.Util.error('Unknown emboss direction: ' + direction);
    }

    do {
      var offsetY = (y - 1) * w4;

      var otherY = dirY;
      if (y + otherY < 1) {
        otherY = 0;
      }
      if (y + otherY > h) {
        otherY = 0;
      }

      var offsetYOther = (y - 1 + otherY) * w * 4;

      var x = w;
      do {
        var offset = offsetY + (x - 1) * 4;

        var otherX = dirX;
        if (x + otherX < 1) {
          otherX = 0;
        }
        if (x + otherX > w) {
          otherX = 0;
        }

        var offsetOther = offsetYOther + (x - 1 + otherX) * 4;

        var dR = data[offset] - data[offsetOther];
        var dG = data[offset + 1] - data[offsetOther + 1];
        var dB = data[offset + 2] - data[offsetOther + 2];

        var dif = dR;
        var absDif = dif > 0 ? dif : -dif;

        var absG = dG > 0 ? dG : -dG;
        var absB = dB > 0 ? dB : -dB;

        if (absG > absDif) {
          dif = dG;
        }
        if (absB > absDif) {
          dif = dB;
        }

        dif *= strength;

        if (blend) {
          var r = data[offset] + dif;
          var g = data[offset + 1] + dif;
          var b = data[offset + 2] + dif;

          data[offset] = r > 255 ? 255 : r < 0 ? 0 : r;
          data[offset + 1] = g > 255 ? 255 : g < 0 ? 0 : g;
          data[offset + 2] = b > 255 ? 255 : b < 0 ? 0 : b;
        } else {
          var grey = greyLevel - dif;
          if (grey < 0) {
            grey = 0;
          } else if (grey > 255) {
            grey = 255;
          }

          data[offset] = data[offset + 1] = data[offset + 2] = grey;
        }
      } while (--x);
    } while (--y);
  };

  Konva.Factory.addGetterSetter(
    Konva.Node,
    'embossStrength',
    0.5,
    Konva.Validators.getNumberValidator(),
    Konva.Factory.afterSetFilter
  );
  /**
   * get/set emboss strength. Use with {@link Konva.Filters.Emboss} filter.
   * @name embossStrength
   * @method
   * @memberof Konva.Node.prototype
   * @param {Number} level between 0 and 1.  Default is 0.5
   * @returns {Number}
   */

  Konva.Factory.addGetterSetter(
    Konva.Node,
    'embossWhiteLevel',
    0.5,
    Konva.Validators.getNumberValidator(),
    Konva.Factory.afterSetFilter
  );
  /**
   * get/set emboss white level. Use with {@link Konva.Filters.Emboss} filter.
   * @name embossWhiteLevel
   * @method
   * @memberof Konva.Node.prototype
   * @param {Number} embossWhiteLevel between 0 and 1.  Default is 0.5
   * @returns {Number}
   */

  Konva.Factory.addGetterSetter(
    Konva.Node,
    'embossDirection',
    'top-left',
    null,
    Konva.Factory.afterSetFilter
  );
  /**
   * get/set emboss direction. Use with {@link Konva.Filters.Emboss} filter.
   * @name embossDirection
   * @method
   * @memberof Konva.Node.prototype
   * @param {String} embossDirection can be top-left, top, top-right, right, bottom-right, bottom, bottom-left or left
   *   The default is top-left
   * @returns {String}
   */

  Konva.Factory.addGetterSetter(
    Konva.Node,
    'embossBlend',
    false,
    null,
    Konva.Factory.afterSetFilter
  );
  /**
   * get/set emboss blend. Use with {@link Konva.Filters.Emboss} filter.
   * @name embossBlend
   * @method
   * @memberof Konva.Node.prototype
   * @param {Boolean} embossBlend
   * @returns {Boolean}
   */
})();

(function() {
  'use strict';
  function remap(fromValue, fromMin, fromMax, toMin, toMax) {
    // Compute the range of the data
    var fromRange = fromMax - fromMin,
      toRange = toMax - toMin,
      toValue;

    // If either range is 0, then the value can only be mapped to 1 value
    if (fromRange === 0) {
      return toMin + toRange / 2;
    }
    if (toRange === 0) {
      return toMin;
    }

    // (1) untranslate, (2) unscale, (3) rescale, (4) retranslate
    toValue = (fromValue - fromMin) / fromRange;
    toValue = toRange * toValue + toMin;

    return toValue;
  }

  /**
   * Enhance Filter. Adjusts the colors so that they span the widest
   *  possible range (ie 0-255). Performs w*h pixel reads and w*h pixel
   *  writes.
   * @function
   * @name Enhance
   * @memberof Konva.Filters
   * @param {Object} imageData
   * @author ippo615
   * @example
   * node.cache();
   * node.filters([Konva.Filters.Enhance]);
   * node.enhance(0.4);
   */
  Konva.Filters.Enhance = function(imageData) {
    var data = imageData.data,
      nSubPixels = data.length,
      rMin = data[0],
      rMax = rMin,
      r,
      gMin = data[1],
      gMax = gMin,
      g,
      bMin = data[2],
      bMax = bMin,
      b,
      i;

    // If we are not enhancing anything - don't do any computation
    var enhanceAmount = this.enhance();
    if (enhanceAmount === 0) {
      return;
    }

    // 1st Pass - find the min and max for each channel:
    for (i = 0; i < nSubPixels; i += 4) {
      r = data[i + 0];
      if (r < rMin) {
        rMin = r;
      } else if (r > rMax) {
        rMax = r;
      }
      g = data[i + 1];
      if (g < gMin) {
        gMin = g;
      } else if (g > gMax) {
        gMax = g;
      }
      b = data[i + 2];
      if (b < bMin) {
        bMin = b;
      } else if (b > bMax) {
        bMax = b;
      }
      //a = data[i + 3];
      //if (a < aMin) { aMin = a; } else
      //if (a > aMax) { aMax = a; }
    }

    // If there is only 1 level - don't remap
    if (rMax === rMin) {
      rMax = 255;
      rMin = 0;
    }
    if (gMax === gMin) {
      gMax = 255;
      gMin = 0;
    }
    if (bMax === bMin) {
      bMax = 255;
      bMin = 0;
    }

    var rMid,
      rGoalMax,
      rGoalMin,
      gMid,
      gGoalMax,
      gGoalMin,
      bMid,
      bGoalMax,
      bGoalMin;

    // If the enhancement is positive - stretch the histogram
    if (enhanceAmount > 0) {
      rGoalMax = rMax + enhanceAmount * (255 - rMax);
      rGoalMin = rMin - enhanceAmount * (rMin - 0);
      gGoalMax = gMax + enhanceAmount * (255 - gMax);
      gGoalMin = gMin - enhanceAmount * (gMin - 0);
      bGoalMax = bMax + enhanceAmount * (255 - bMax);
      bGoalMin = bMin - enhanceAmount * (bMin - 0);
      // If the enhancement is negative -   compress the histogram
    } else {
      rMid = (rMax + rMin) * 0.5;
      rGoalMax = rMax + enhanceAmount * (rMax - rMid);
      rGoalMin = rMin + enhanceAmount * (rMin - rMid);
      gMid = (gMax + gMin) * 0.5;
      gGoalMax = gMax + enhanceAmount * (gMax - gMid);
      gGoalMin = gMin + enhanceAmount * (gMin - gMid);
      bMid = (bMax + bMin) * 0.5;
      bGoalMax = bMax + enhanceAmount * (bMax - bMid);
      bGoalMin = bMin + enhanceAmount * (bMin - bMid);
    }

    // Pass 2 - remap everything, except the alpha
    for (i = 0; i < nSubPixels; i += 4) {
      data[i + 0] = remap(data[i + 0], rMin, rMax, rGoalMin, rGoalMax);
      data[i + 1] = remap(data[i + 1], gMin, gMax, gGoalMin, gGoalMax);
      data[i + 2] = remap(data[i + 2], bMin, bMax, bGoalMin, bGoalMax);
      //data[i + 3] = remap(data[i + 3], aMin, aMax, aGoalMin, aGoalMax);
    }
  };

  /**
   * get/set enhance. Use with {@link Konva.Filters.Enhance} filter. -1 to 1 values
   * @name enhance
   * @method
   * @memberof Konva.Node.prototype
   * @param {Float} amount
   * @returns {Float}
   */
  Konva.Factory.addGetterSetter(
    Konva.Node,
    'enhance',
    0,
    Konva.Validators.getNumberValidator(),
    Konva.Factory.afterSetFilter
  );
})();

(function() {
  'use strict';
  /**
   * Posterize Filter. Adjusts the channels so that there are no more
   *  than n different values for that channel. This is also applied
   *  to the alpha channel.
   * @function
   * @name Posterize
   * @author ippo615
   * @memberof Konva.Filters
   * @param {Object} imageData
   * @example
   * node.cache();
   * node.filters([Konva.Filters.Posterize]);
   * node.levels(0.8); // between 0 and 1
   */

  Konva.Filters.Posterize = function(imageData) {
    // level must be between 1 and 255
    var levels = Math.round(this.levels() * 254) + 1,
      data = imageData.data,
      len = data.length,
      scale = 255 / levels,
      i;

    for (i = 0; i < len; i += 1) {
      data[i] = Math.floor(data[i] / scale) * scale;
    }
  };

  Konva.Factory.addGetterSetter(
    Konva.Node,
    'levels',
    0.5,
    Konva.Validators.getNumberValidator(),
    Konva.Factory.afterSetFilter
  );

  /**
   * get/set levels.  Must be a number between 0 and 1.  Use with {@link Konva.Filters.Posterize} filter.
   * @name levels
   * @method
   * @memberof Konva.Node.prototype
   * @param {Number} level between 0 and 1
   * @returns {Number}
   */
})();

(function() {
  'use strict';
  /**
   * Noise Filter. Randomly adds or substracts to the color channels
   * @function
   * @name Noise
   * @memberof Konva.Filters
   * @param {Object} imageData
   * @author ippo615
   * @example
   * node.cache();
   * node.filters([Konva.Filters.Noise]);
   * node.noise(0.8);
   */
  Konva.Filters.Noise = function(imageData) {
    var amount = this.noise() * 255,
      data = imageData.data,
      nPixels = data.length,
      half = amount / 2,
      i;

    for (i = 0; i < nPixels; i += 4) {
      data[i + 0] += half - 2 * half * Math.random();
      data[i + 1] += half - 2 * half * Math.random();
      data[i + 2] += half - 2 * half * Math.random();
    }
  };

  Konva.Factory.addGetterSetter(
    Konva.Node,
    'noise',
    0.2,
    Konva.Validators.getNumberValidator(),
    Konva.Factory.afterSetFilter
  );
  /**
   * get/set noise amount.  Must be a value between 0 and 1. Use with {@link Konva.Filters.Noise} filter.
   * @name noise
   * @method
   * @memberof Konva.Node.prototype
   * @param {Number} noise
   * @returns {Number}
   */
})();

/*eslint-disable max-depth */
(function() {
  'use strict';
  /**
   * Pixelate Filter. Averages groups of pixels and redraws
   *  them as larger pixels
   * @function
   * @name Pixelate
   * @memberof Konva.Filters
   * @param {Object} imageData
   * @author ippo615
   * @example
   * node.cache();
   * node.filters([Konva.Filters.Pixelate]);
   * node.pixelSize(10);
   */

  Konva.Filters.Pixelate = function(imageData) {
    var pixelSize = Math.ceil(this.pixelSize()),
      width = imageData.width,
      height = imageData.height,
      x,
      y,
      i,
      //pixelsPerBin = pixelSize * pixelSize,
      red,
      green,
      blue,
      alpha,
      nBinsX = Math.ceil(width / pixelSize),
      nBinsY = Math.ceil(height / pixelSize),
      xBinStart,
      xBinEnd,
      yBinStart,
      yBinEnd,
      xBin,
      yBin,
      pixelsInBin;
    imageData = imageData.data;

    if (pixelSize <= 0) {
      Konva.Util.error('pixelSize value can not be <= 0');
      return;
    }

    for (xBin = 0; xBin < nBinsX; xBin += 1) {
      for (yBin = 0; yBin < nBinsY; yBin += 1) {
        // Initialize the color accumlators to 0
        red = 0;
        green = 0;
        blue = 0;
        alpha = 0;

        // Determine which pixels are included in this bin
        xBinStart = xBin * pixelSize;
        xBinEnd = xBinStart + pixelSize;
        yBinStart = yBin * pixelSize;
        yBinEnd = yBinStart + pixelSize;

        // Add all of the pixels to this bin!
        pixelsInBin = 0;
        for (x = xBinStart; x < xBinEnd; x += 1) {
          if (x >= width) {
            continue;
          }
          for (y = yBinStart; y < yBinEnd; y += 1) {
            if (y >= height) {
              continue;
            }
            i = (width * y + x) * 4;
            red += imageData[i + 0];
            green += imageData[i + 1];
            blue += imageData[i + 2];
            alpha += imageData[i + 3];
            pixelsInBin += 1;
          }
        }

        // Make sure the channels are between 0-255
        red = red / pixelsInBin;
        green = green / pixelsInBin;
        blue = blue / pixelsInBin;
        alpha = alpha / pixelsInBin;

        // Draw this bin
        for (x = xBinStart; x < xBinEnd; x += 1) {
          if (x >= width) {
            continue;
          }
          for (y = yBinStart; y < yBinEnd; y += 1) {
            if (y >= height) {
              continue;
            }
            i = (width * y + x) * 4;
            imageData[i + 0] = red;
            imageData[i + 1] = green;
            imageData[i + 2] = blue;
            imageData[i + 3] = alpha;
          }
        }
      }
    }
  };

  Konva.Factory.addGetterSetter(
    Konva.Node,
    'pixelSize',
    8,
    Konva.Validators.getNumberValidator(),
    Konva.Factory.afterSetFilter
  );
  /**
   * get/set pixel size. Use with {@link Konva.Filters.Pixelate} filter.
   * @name pixelSize
   * @method
   * @memberof Konva.Node.prototype
   * @param {Integer} pixelSize
   * @returns {Integer}
   */
})();

(function() {
  'use strict';
  /**
   * Threshold Filter. Pushes any value above the mid point to
   *  the max and any value below the mid point to the min.
   *  This affects the alpha channel.
   * @function
   * @name Threshold
   * @memberof Konva.Filters
   * @param {Object} imageData
   * @author ippo615
   * @example
   * node.cache();
   * node.filters([Konva.Filters.Threshold]);
   * node.threshold(0.1);
   */

  Konva.Filters.Threshold = function(imageData) {
    var level = this.threshold() * 255,
      data = imageData.data,
      len = data.length,
      i;

    for (i = 0; i < len; i += 1) {
      data[i] = data[i] < level ? 0 : 255;
    }
  };

  Konva.Factory.addGetterSetter(
    Konva.Node,
    'threshold',
    0.5,
    Konva.Validators.getNumberValidator(),
    Konva.Factory.afterSetFilter
  );
  /**
   * get/set threshold.  Must be a value between 0 and 1. Use with {@link Konva.Filters.Threshold} or {@link Konva.Filters.Mask} filter.
   * @name threshold
   * @method
   * @memberof Konva.Node.prototype
   * @param {Number} threshold
   * @returns {Number}
   */
})();

(function() {
  'use strict';
  /**
   * Sepia Filter
   * Based on: Pixastic Lib - Sepia filter - v0.1.0
   * Copyright (c) 2008 Jacob Seidelin, jseidelin@nihilogic.dk, http://blog.nihilogic.dk/
   * @function
   * @name Sepia
   * @memberof Konva.Filters
   * @param {Object} imageData
   * @author Jacob Seidelin <jseidelin@nihilogic.dk>
   * @license MPL v1.1 [http://www.pixastic.com/lib/license.txt]
   * @example
   * node.cache();
   * node.filters([Konva.Filters.Sepia]);
   */
  Konva.Filters.Sepia = function(imageData) {
    var data = imageData.data,
      w = imageData.width,
      y = imageData.height,
      w4 = w * 4,
      offsetY,
      x,
      offset,
      or,
      og,
      ob,
      r,
      g,
      b;

    do {
      offsetY = (y - 1) * w4;
      x = w;
      do {
        offset = offsetY + (x - 1) * 4;

        or = data[offset];
        og = data[offset + 1];
        ob = data[offset + 2];

        r = or * 0.393 + og * 0.769 + ob * 0.189;
        g = or * 0.349 + og * 0.686 + ob * 0.168;
        b = or * 0.272 + og * 0.534 + ob * 0.131;

        data[offset] = r > 255 ? 255 : r;
        data[offset + 1] = g > 255 ? 255 : g;
        data[offset + 2] = b > 255 ? 255 : b;
        data[offset + 3] = data[offset + 3];
      } while (--x);
    } while (--y);
  };
})();

(function() {
  'use strict';
  /**
   * Solarize Filter
   * Pixastic Lib - Solarize filter - v0.1.0
   * Copyright (c) 2008 Jacob Seidelin, jseidelin@nihilogic.dk, http://blog.nihilogic.dk/
   * License: [http://www.pixastic.com/lib/license.txt]
   * @function
   * @name Solarize
   * @memberof Konva.Filters
   * @param {Object} imageData
   * @example
   * node.cache();
   * node.filters([Konva.Filters.Solarize]);
   */
  Konva.Filters.Solarize = function(imageData) {
    var data = imageData.data,
      w = imageData.width,
      h = imageData.height,
      w4 = w * 4,
      y = h;

    do {
      var offsetY = (y - 1) * w4;
      var x = w;
      do {
        var offset = offsetY + (x - 1) * 4;
        var r = data[offset];
        var g = data[offset + 1];
        var b = data[offset + 2];

        if (r > 127) {
          r = 255 - r;
        }
        if (g > 127) {
          g = 255 - g;
        }
        if (b > 127) {
          b = 255 - b;
        }

        data[offset] = r;
        data[offset + 1] = g;
        data[offset + 2] = b;
      } while (--x);
    } while (--y);
  };
})();

(function() {
  'use strict';
  /*
   * ToPolar Filter. Converts image data to polar coordinates. Performs
   *  w*h*4 pixel reads and w*h pixel writes. The r axis is placed along
   *  what would be the y axis and the theta axis along the x axis.
   * @function
   * @author ippo615
   * @memberof Konva.Filters
   * @param {ImageData} src, the source image data (what will be transformed)
   * @param {ImageData} dst, the destination image data (where it will be saved)
   * @param {Object} opt
   * @param {Number} [opt.polarCenterX] horizontal location for the center of the circle,
   *  default is in the middle
   * @param {Number} [opt.polarCenterY] vertical location for the center of the circle,
   *  default is in the middle
   */

  var ToPolar = function(src, dst, opt) {
    var srcPixels = src.data,
      dstPixels = dst.data,
      xSize = src.width,
      ySize = src.height,
      xMid = opt.polarCenterX || xSize / 2,
      yMid = opt.polarCenterY || ySize / 2,
      i,
      x,
      y,
      r = 0,
      g = 0,
      b = 0,
      a = 0;

    // Find the largest radius
    var rad,
      rMax = Math.sqrt(xMid * xMid + yMid * yMid);
    x = xSize - xMid;
    y = ySize - yMid;
    rad = Math.sqrt(x * x + y * y);
    rMax = rad > rMax ? rad : rMax;

    // We'll be uisng y as the radius, and x as the angle (theta=t)
    var rSize = ySize,
      tSize = xSize,
      radius,
      theta;

    // We want to cover all angles (0-360) and we need to convert to
    // radians (*PI/180)
    var conversion = 360 / tSize * Math.PI / 180,
      sin,
      cos;

    // var x1, x2, x1i, x2i, y1, y2, y1i, y2i, scale;

    for (theta = 0; theta < tSize; theta += 1) {
      sin = Math.sin(theta * conversion);
      cos = Math.cos(theta * conversion);
      for (radius = 0; radius < rSize; radius += 1) {
        x = Math.floor(xMid + rMax * radius / rSize * cos);
        y = Math.floor(yMid + rMax * radius / rSize * sin);
        i = (y * xSize + x) * 4;
        r = srcPixels[i + 0];
        g = srcPixels[i + 1];
        b = srcPixels[i + 2];
        a = srcPixels[i + 3];

        // Store it
        //i = (theta * xSize  +  radius) * 4;
        i = (theta + radius * xSize) * 4;
        dstPixels[i + 0] = r;
        dstPixels[i + 1] = g;
        dstPixels[i + 2] = b;
        dstPixels[i + 3] = a;
      }
    }
  };

  /*
     * FromPolar Filter. Converts image data from polar coordinates back to rectangular.
     *  Performs w*h*4 pixel reads and w*h pixel writes.
     * @function
     * @author ippo615
     * @memberof Konva.Filters
     * @param {ImageData} src, the source image data (what will be transformed)
     * @param {ImageData} dst, the destination image data (where it will be saved)
     * @param {Object} opt
     * @param {Number} [opt.polarCenterX] horizontal location for the center of the circle,
     *  default is in the middle
     * @param {Number} [opt.polarCenterY] vertical location for the center of the circle,
     *  default is in the middle
     * @param {Number} [opt.polarRotation] amount to rotate the image counterclockwis,
     *  0 is no rotation, 360 degrees is a full rotation
     */

  var FromPolar = function(src, dst, opt) {
    var srcPixels = src.data,
      dstPixels = dst.data,
      xSize = src.width,
      ySize = src.height,
      xMid = opt.polarCenterX || xSize / 2,
      yMid = opt.polarCenterY || ySize / 2,
      i,
      x,
      y,
      dx,
      dy,
      r = 0,
      g = 0,
      b = 0,
      a = 0;

    // Find the largest radius
    var rad,
      rMax = Math.sqrt(xMid * xMid + yMid * yMid);
    x = xSize - xMid;
    y = ySize - yMid;
    rad = Math.sqrt(x * x + y * y);
    rMax = rad > rMax ? rad : rMax;

    // We'll be uisng x as the radius, and y as the angle (theta=t)
    var rSize = ySize,
      tSize = xSize,
      radius,
      theta,
      phaseShift = opt.polarRotation || 0;

    // We need to convert to degrees and we need to make sure
    // it's between (0-360)
    // var conversion = tSize/360*180/Math.PI;
    //var conversion = tSize/360*180/Math.PI;

    var x1, y1;

    for (x = 0; x < xSize; x += 1) {
      for (y = 0; y < ySize; y += 1) {
        dx = x - xMid;
        dy = y - yMid;
        radius = Math.sqrt(dx * dx + dy * dy) * rSize / rMax;
        theta = (Math.atan2(dy, dx) * 180 / Math.PI + 360 + phaseShift) % 360;
        theta = theta * tSize / 360;
        x1 = Math.floor(theta);
        y1 = Math.floor(radius);
        i = (y1 * xSize + x1) * 4;
        r = srcPixels[i + 0];
        g = srcPixels[i + 1];
        b = srcPixels[i + 2];
        a = srcPixels[i + 3];

        // Store it
        i = (y * xSize + x) * 4;
        dstPixels[i + 0] = r;
        dstPixels[i + 1] = g;
        dstPixels[i + 2] = b;
        dstPixels[i + 3] = a;
      }
    }
  };

  //Konva.Filters.ToPolar = Konva.Util._FilterWrapDoubleBuffer(ToPolar);
  //Konva.Filters.FromPolar = Konva.Util._FilterWrapDoubleBuffer(FromPolar);

  // create a temporary canvas for working - shared between multiple calls

  /*
     * Kaleidoscope Filter.
     * @function
     * @name Kaleidoscope
     * @author ippo615
     * @memberof Konva.Filters
     * @example
     * node.cache();
     * node.filters([Konva.Filters.Kaleidoscope]);
     * node.kaleidoscopePower(3);
     * node.kaleidoscopeAngle(45);
     */
  Konva.Filters.Kaleidoscope = function(imageData) {
    var xSize = imageData.width,
      ySize = imageData.height;

    var x, y, xoff, i, r, g, b, a, srcPos, dstPos;
    var power = Math.round(this.kaleidoscopePower());
    var angle = Math.round(this.kaleidoscopeAngle());
    var offset = Math.floor(xSize * (angle % 360) / 360);

    if (power < 1) {
      return;
    }

    // Work with our shared buffer canvas
    var tempCanvas = Konva.Util.createCanvasElement();
    tempCanvas.width = xSize;
    tempCanvas.height = ySize;
    var scratchData = tempCanvas
      .getContext('2d')
      .getImageData(0, 0, xSize, ySize);

    // Convert thhe original to polar coordinates
    ToPolar(imageData, scratchData, {
      polarCenterX: xSize / 2,
      polarCenterY: ySize / 2
    });

    // Determine how big each section will be, if it's too small
    // make it bigger
    var minSectionSize = xSize / Math.pow(2, power);
    while (minSectionSize <= 8) {
      minSectionSize = minSectionSize * 2;
      power -= 1;
    }
    minSectionSize = Math.ceil(minSectionSize);
    var sectionSize = minSectionSize;

    // Copy the offset region to 0
    // Depending on the size of filter and location of the offset we may need
    // to copy the section backwards to prevent it from rewriting itself
    var xStart = 0,
      xEnd = sectionSize,
      xDelta = 1;
    if (offset + minSectionSize > xSize) {
      xStart = sectionSize;
      xEnd = 0;
      xDelta = -1;
    }
    for (y = 0; y < ySize; y += 1) {
      for (x = xStart; x !== xEnd; x += xDelta) {
        xoff = Math.round(x + offset) % xSize;
        srcPos = (xSize * y + xoff) * 4;
        r = scratchData.data[srcPos + 0];
        g = scratchData.data[srcPos + 1];
        b = scratchData.data[srcPos + 2];
        a = scratchData.data[srcPos + 3];
        dstPos = (xSize * y + x) * 4;
        scratchData.data[dstPos + 0] = r;
        scratchData.data[dstPos + 1] = g;
        scratchData.data[dstPos + 2] = b;
        scratchData.data[dstPos + 3] = a;
      }
    }

    // Perform the actual effect
    for (y = 0; y < ySize; y += 1) {
      sectionSize = Math.floor(minSectionSize);
      for (i = 0; i < power; i += 1) {
        for (x = 0; x < sectionSize + 1; x += 1) {
          srcPos = (xSize * y + x) * 4;
          r = scratchData.data[srcPos + 0];
          g = scratchData.data[srcPos + 1];
          b = scratchData.data[srcPos + 2];
          a = scratchData.data[srcPos + 3];
          dstPos = (xSize * y + sectionSize * 2 - x - 1) * 4;
          scratchData.data[dstPos + 0] = r;
          scratchData.data[dstPos + 1] = g;
          scratchData.data[dstPos + 2] = b;
          scratchData.data[dstPos + 3] = a;
        }
        sectionSize *= 2;
      }
    }

    // Convert back from polar coordinates
    FromPolar(scratchData, imageData, { polarRotation: 0 });
  };

  /**
   * get/set kaleidoscope power. Use with {@link Konva.Filters.Kaleidoscope} filter.
   * @name kaleidoscopePower
   * @method
   * @memberof Konva.Node.prototype
   * @param {Integer} power of kaleidoscope
   * @returns {Integer}
   */
  Konva.Factory.addGetterSetter(
    Konva.Node,
    'kaleidoscopePower',
    2,
    Konva.Validators.getNumberValidator(),
    Konva.Factory.afterSetFilter
  );

  /**
   * get/set kaleidoscope angle. Use with {@link Konva.Filters.Kaleidoscope} filter.
   * @name kaleidoscopeAngle
   * @method
   * @memberof Konva.Node.prototype
   * @param {Integer} degrees
   * @returns {Integer}
   */
  Konva.Factory.addGetterSetter(
    Konva.Node,
    'kaleidoscopeAngle',
    0,
    Konva.Validators.getNumberValidator(),
    Konva.Factory.afterSetFilter
  );
})();

(function(Konva) {
  'use strict';
  /**
   * Contrast Filter.
   * @function
   * @memberof Konva.Filters
   * @param {Object} imageData
   * @example
   * node.cache();
   * node.filters([Konva.Filters.Contrast]);
   * node.contrast(10);
   */

  Konva.Filters.Contrast = function(imageData) {
    var adjust = Math.pow((parseInt(this.contrast()) + 100) / 100, 2);

    var data = imageData.data,
      nPixels = data.length,
      red = 150,
      green = 150,
      blue = 150,
      i;

    for (i = 0; i < nPixels; i += 4) {
      red = data[i];
      green = data[i + 1];
      blue = data[i + 2];

      //Red channel
      red /= 255;
      red -= 0.5;
      red *= adjust;
      red += 0.5;
      red *= 255;

      //Green channel
      green /= 255;
      green -= 0.5;
      green *= adjust;
      green += 0.5;
      green *= 255;

      //Blue channel
      blue /= 255;
      blue -= 0.5;
      blue *= adjust;
      blue += 0.5;
      blue *= 255;

      red = red < 0 ? 0 : red > 255 ? 255 : red;
      green = green < 0 ? 0 : green > 255 ? 255 : green;
      blue = blue < 0 ? 0 : blue > 255 ? 255 : blue;

      data[i] = red;
      data[i + 1] = green;
      data[i + 2] = blue;
    }
  };

  /**
   * get/set filter contrast.  The contrast is a number between -100 and 100.
   * Use with {@link Konva.Filters.Contrast} filter.
   * @name contrast
   * @method
   * @memberof Konva.Node.prototype
   * @param {Number} contrast value between -100 and 100
   * @returns {Number}
   */
  Konva.Factory.addGetterSetter(
    Konva.Node,
    'contrast',
    0,
    Konva.Validators.getNumberValidator(),
    Konva.Factory.afterSetFilter
  );
})(Konva);

(function() {
  'use strict';
  /**
   * Container constructor.&nbsp; Containers are used to contain nodes or other containers
   * @constructor
   * @memberof Konva
   * @augments Konva.Node
   * @abstract
   * @param {Object} config
   * @param {Number} [config.x]
     * @param {Number} [config.y]
     * @param {Number} [config.width]
     * @param {Number} [config.height]
     * @param {Boolean} [config.visible]
     * @param {Boolean} [config.listening] whether or not the node is listening for events
     * @param {String} [config.id] unique id
     * @param {String} [config.name] non-unique name
     * @param {Number} [config.opacity] determines node opacity.  Can be any number between 0 and 1
     * @param {Object} [config.scale] set scale
     * @param {Number} [config.scaleX] set scale x
     * @param {Number} [config.scaleY] set scale y
     * @param {Number} [config.rotation] rotation in degrees
     * @param {Object} [config.offset] offset from center point and rotation point
     * @param {Number} [config.offsetX] set offset x
     * @param {Number} [config.offsetY] set offset y
     * @param {Boolean} [config.draggable] makes the node draggable.  When stages are draggable, you can drag and drop
     *  the entire stage by dragging any portion of the stage
     * @param {Number} [config.dragDistance]
     * @param {Function} [config.dragBoundFunc]
   * * @param {Object} [config.clip] set clip
     * @param {Number} [config.clipX] set clip x
     * @param {Number} [config.clipY] set clip y
     * @param {Number} [config.clipWidth] set clip width
     * @param {Number} [config.clipHeight] set clip height
     * @param {Function} [config.clipFunc] set clip func

   */
  Konva.Container = function(config) {
    this.__init(config);
  };

  Konva.Util.addMethods(Konva.Container, {
    __init: function(config) {
      this.children = new Konva.Collection();
      Konva.Node.call(this, config);
    },
    /**
     * returns a {@link Konva.Collection} of direct descendant nodes
     * @method
     * @memberof Konva.Container.prototype
     * @param {Function} [filterFunc] filter function
     * @returns {Konva.Collection}
     * @example
     * // get all children
     * var children = layer.getChildren();
     *
     * // get only circles
     * var circles = layer.getChildren(function(node){
     *    return node.getClassName() === 'Circle';
     * });
     */
    getChildren: function(filterFunc) {
      if (!filterFunc) {
        return this.children;
      }

      var results = new Konva.Collection();
      this.children.each(function(child) {
        if (filterFunc(child)) {
          results.push(child);
        }
      });
      return results;
    },
    /**
     * determine if node has children
     * @method
     * @memberof Konva.Container.prototype
     * @returns {Boolean}
     */
    hasChildren: function() {
      return this.getChildren().length > 0;
    },
    /**
     * remove all children
     * @method
     * @memberof Konva.Container.prototype
     */
    removeChildren: function() {
      var children = Konva.Collection.toCollection(this.children);
      var child;
      for (var i = 0; i < children.length; i++) {
        child = children[i];
        // reset parent to prevent many _setChildrenIndices calls
        delete child.parent;
        child.index = 0;
        child.remove();
      }
      children = null;
      this.children = new Konva.Collection();
      return this;
    },
    /**
     * destroy all children
     * @method
     * @memberof Konva.Container.prototype
     */
    destroyChildren: function() {
      var children = Konva.Collection.toCollection(this.children);
      var child;
      for (var i = 0; i < children.length; i++) {
        child = children[i];
        // reset parent to prevent many _setChildrenIndices calls
        delete child.parent;
        child.index = 0;
        child.destroy();
      }
      children = null;
      this.children = new Konva.Collection();
      return this;
    },
    /**
     * Add node or nodes to container.
     * @method
     * @memberof Konva.Container.prototype
     * @param {...Konva.Node} child
     * @returns {Container}
     * @example
     * layer.add(shape1, shape2, shape3);
     */
    add: function(child) {
      if (arguments.length > 1) {
        for (var i = 0; i < arguments.length; i++) {
          this.add(arguments[i]);
        }
        return this;
      }
      if (child.getParent()) {
        child.moveTo(this);
        return this;
      }
      var children = this.children;
      this._validateAdd(child);
      child.index = children.length;
      child.parent = this;
      children.push(child);
      this._fire('add', {
        child: child
      });

      // if node under drag we need to update drag animation
      if (Konva.DD && child.isDragging()) {
        Konva.DD.anim.setLayers(child.getLayer());
      }

      // chainable
      return this;
    },
    destroy: function() {
      // destroy children
      if (this.hasChildren()) {
        this.destroyChildren();
      }
      // then destroy self
      Konva.Node.prototype.destroy.call(this);
      return this;
    },
    /**
     * return a {@link Konva.Collection} of nodes that match the selector.
     * You can provide a string with '#' for id selections and '.' for name selections.
     * Or a function that will return true/false when a node is passed through.  See example below.
     * With strings you can also select by type or class name. Pass multiple selectors
     * separated by a space.
     * @method
     * @memberof Konva.Container.prototype
     * @param {String | Function} selector
     * @returns {Collection}
     * @example
     *
     * Passing a string as a selector
     * // select node with id foo
     * var node = stage.find('#foo');
     *
     * // select nodes with name bar inside layer
     * var nodes = layer.find('.bar');
     *
     * // select all groups inside layer
     * var nodes = layer.find('Group');
     *
     * // select all rectangles inside layer
     * var nodes = layer.find('Rect');
     *
     * // select node with an id of foo or a name of bar inside layer
     * var nodes = layer.find('#foo, .bar');
     *
     * Passing a function as a selector
     *
     * // get all Groups
     * var groups = stage.find(node => {
     *  return node.getType() === 'Group';
     * });
     *
     * // get only Nodes with partial opacity
     * var alphaNodes = layer.find(node => {
     *  return node.getType() === 'Node' && node.getAbsoluteOpacity() < 1;
     * });
     */
    find: function(selector) {
      // protecting _generalFind to prevent user from accidentally adding
      // second argument and getting unexpected `findOne` result
      return this._generalFind(selector, false);
    },
    /**
     * return a first node from `find` method
     * @method
     * @memberof Konva.Container.prototype
     * @param {String | Function} selector
     * @returns {Konva.Node | Undefined}
     * @example
     * // select node with id foo
     * var node = stage.findOne('#foo');
     *
     * // select node with name bar inside layer
     * var nodes = layer.findOne('.bar');
     *
     * // select the first node to return true in a function
     * var node = stage.findOne(node => {
     *  return node.getType() === 'Shape'
     * })
     */
    findOne: function(selector) {
      var result = this._generalFind(selector, true);
      return result.length > 0 ? result[0] : undefined;
    },
    _generalFind: function(selector, findOne) {
      var retArr = [];

      if (typeof selector === 'string') {
        retArr = this._findByString(selector, findOne);
      } else if (typeof selector === 'function') {
        retArr = this._findByFunction(selector, findOne);
      }

      return Konva.Collection.toCollection(retArr);
    },
    _findByString: function(selector) {
      var retArr = [],
        selectorArr = selector.replace(/ /g, '').split(','),
        len = selectorArr.length,
        n,
        i,
        sel,
        arr,
        node,
        children,
        clen;

      for (n = 0; n < len; n++) {
        sel = selectorArr[n];
        if (!Konva.Util.isValidSelector(sel)) {
          var message =
            'Selector "' +
            sel +
            '" is invalid. Allowed selectors examples are "#foo", ".bar" or "Group".\n' +
            'If you have a custom shape with such className, please change it to start with upper letter like "Triangle".\n' +
            'Konva is awesome, right?';
          Konva.Util.warn(message);
        }
        // id selector
        if (sel.charAt(0) === '#') {
          node = this._getNodeById(sel.slice(1));
          if (node) {
            retArr.push(node);
          }
        } else if (sel.charAt(0) === '.') {
          // name selector
          arr = this._getNodesByName(sel.slice(1));
          retArr = retArr.concat(arr);
        } else {
          // unrecognized selector, pass to children
          children = this.getChildren();
          clen = children.length;
          for (i = 0; i < clen; i++) {
            retArr = retArr.concat(children[i]._get(sel));
          }
        }
      }

      return retArr;
    },
    // (fn: ((Node) => boolean, findOne?: boolean)
    _findByFunction: function(fn, findOne) {
      var retArr = [];

      var addItems = function(el) {
        // escape function if we've already found one.
        if (findOne && retArr.length > 0) {
          return;
        }

        var children = el.getChildren();
        var clen = children.length;

        if (fn(el)) {
          retArr = retArr.concat(el);
        }

        for (var i = 0; i < clen; i++) {
          addItems(children[i]);
        }
      };

      addItems(this);

      return retArr;
    },
    _getNodeById: function(key) {
      var node = Konva.ids[key];

      if (node !== undefined && this.isAncestorOf(node)) {
        return node;
      }
      return null;
    },
    _getNodesByName: function(key) {
      var arr = Konva.names[key] || [];
      return this._getDescendants(arr);
    },
    _get: function(selector) {
      var retArr = Konva.Node.prototype._get.call(this, selector);
      var children = this.getChildren();
      var len = children.length;
      for (var n = 0; n < len; n++) {
        retArr = retArr.concat(children[n]._get(selector));
      }
      return retArr;
    },
    // extenders
    toObject: function() {
      var obj = Konva.Node.prototype.toObject.call(this);

      obj.children = [];

      var children = this.getChildren();
      var len = children.length;
      for (var n = 0; n < len; n++) {
        var child = children[n];
        obj.children.push(child.toObject());
      }

      return obj;
    },
    _getDescendants: function(arr) {
      var retArr = [];
      var len = arr.length;
      for (var n = 0; n < len; n++) {
        var node = arr[n];
        if (this.isAncestorOf(node)) {
          retArr.push(node);
        }
      }

      return retArr;
    },
    /**
     * determine if node is an ancestor
     * of descendant
     * @method
     * @memberof Konva.Container.prototype
     * @param {Konva.Node} node
     */
    isAncestorOf: function(node) {
      var parent = node.getParent();
      while (parent) {
        if (parent._id === this._id) {
          return true;
        }
        parent = parent.getParent();
      }

      return false;
    },
    clone: function(obj) {
      // call super method
      var node = Konva.Node.prototype.clone.call(this, obj);

      this.getChildren().each(function(no) {
        node.add(no.clone());
      });
      return node;
    },
    /**
     * get all shapes that intersect a point.  Note: because this method must clear a temporary
     * canvas and redraw every shape inside the container, it should only be used for special sitations
     * because it performs very poorly.  Please use the {@link Konva.Stage#getIntersection} method if at all possible
     * because it performs much better
     * @method
     * @memberof Konva.Container.prototype
     * @param {Object} pos
     * @param {Number} pos.x
     * @param {Number} pos.y
     * @returns {Array} array of shapes
     */
    getAllIntersections: function(pos) {
      var arr = [];

      this.find('Shape').each(function(shape) {
        if (shape.isVisible() && shape.intersects(pos)) {
          arr.push(shape);
        }
      });

      return arr;
    },
    _setChildrenIndices: function() {
      this.children.each(function(child, n) {
        child.index = n;
      });
    },
    drawScene: function(can, top, caching) {
      var layer = this.getLayer(),
        canvas = can || (layer && layer.getCanvas()),
        context = canvas && canvas.getContext(),
        cachedCanvas = this._cache.canvas,
        cachedSceneCanvas = cachedCanvas && cachedCanvas.scene;

      if (this.isVisible() || caching) {
        if (!caching && cachedSceneCanvas) {
          context.save();
          layer._applyTransform(this, context, top);
          this._drawCachedSceneCanvas(context);
          context.restore();
        } else {
          this._drawChildren(canvas, 'drawScene', top, false, caching);
        }
      }
      return this;
    },
    drawHit: function(can, top, caching) {
      var layer = this.getLayer(),
        canvas = can || (layer && layer.hitCanvas),
        context = canvas && canvas.getContext(),
        cachedCanvas = this._cache.canvas,
        cachedHitCanvas = cachedCanvas && cachedCanvas.hit;

      if (this.shouldDrawHit(canvas) || caching) {
        if (layer) {
          layer.clearHitCache();
        }
        if (!caching && cachedHitCanvas) {
          context.save();
          layer._applyTransform(this, context, top);
          this._drawCachedHitCanvas(context);
          context.restore();
        } else {
          this._drawChildren(canvas, 'drawHit', top);
        }
      }
      return this;
    },
    _drawChildren: function(canvas, drawMethod, top, caching, skipBuffer) {
      var layer = this.getLayer(),
        context = canvas && canvas.getContext(),
        clipWidth = this.getClipWidth(),
        clipHeight = this.getClipHeight(),
        clipFunc = this.getClipFunc(),
        hasClip = (clipWidth && clipHeight) || clipFunc,
        clipX,
        clipY;

      if (hasClip && layer) {
        context.save();
        var transform = this.getAbsoluteTransform(top);
        var m = transform.getMatrix();
        context.transform(m[0], m[1], m[2], m[3], m[4], m[5]);
        context.beginPath();
        if (clipFunc) {
          clipFunc.call(this, context, this);
        } else {
          clipX = this.getClipX();
          clipY = this.getClipY();
          context.rect(clipX, clipY, clipWidth, clipHeight);
        }
        context.clip();
        m = transform
          .copy()
          .invert()
          .getMatrix();
        context.transform(m[0], m[1], m[2], m[3], m[4], m[5]);
      }

      this.children.each(function(child) {
        child[drawMethod](canvas, top, caching, skipBuffer);
      });

      if (hasClip) {
        context.restore();
      }
    },
    shouldDrawHit: function(canvas) {
      var layer = this.getLayer();
      var dd = Konva.DD;
      var layerUnderDrag =
        dd &&
        Konva.isDragging() &&
        Konva.DD.anim.getLayers().indexOf(layer) !== -1;
      return (
        (canvas && canvas.isCache) ||
        (layer &&
          layer.hitGraphEnabled() &&
          this.isVisible() &&
          !layerUnderDrag)
      );
    },
    getClientRect: function(attrs) {
      attrs = attrs || {};
      var skipTransform = attrs.skipTransform;
      var relativeTo = attrs.relativeTo;

      var minX, minY, maxX, maxY;
      var selfRect = {
        x: Infinity,
        y: Infinity,
        width: 0,
        height: 0
      };
      var that = this;
      this.children.each(function(child) {
        // skip invisible children
        if (!child.getVisible()) {
          return;
        }

        var rect = child.getClientRect({
          relativeTo: that,
          skipShadow: attrs.skipShadow
        });

        // skip invisible children (like empty groups)
        if (rect.width === 0 && rect.height === 0) {
          return;
        }

        if (minX === undefined) {
          // initial value for first child
          minX = rect.x;
          minY = rect.y;
          maxX = rect.x + rect.width;
          maxY = rect.y + rect.height;
        } else {
          minX = Math.min(minX, rect.x);
          minY = Math.min(minY, rect.y);
          maxX = Math.max(maxX, rect.x + rect.width);
          maxY = Math.max(maxY, rect.y + rect.height);
        }
      });

      // if child is group we need to make sure it has visible shapes inside
      var shapes = this.find('Shape');
      var hasVisible = false;
      for (var i = 0; i < shapes.length; i++) {
        var shape = shapes[i];
        if (shape._isVisible(this)) {
          hasVisible = true;
          break;
        }
      }

      if (hasVisible) {
        selfRect = {
          x: minX,
          y: minY,
          width: maxX - minX,
          height: maxY - minY
        };
      } else {
        selfRect = {
          x: 0,
          y: 0,
          width: 0,
          height: 0
        };
      }

      if (!skipTransform) {
        return this._transformedRect(selfRect, relativeTo);
      }
      return selfRect;
    }
  });

  Konva.Util.extend(Konva.Container, Konva.Node);
  // deprecated methods
  Konva.Container.prototype.get = Konva.Container.prototype.find;

  // add getters setters
  Konva.Factory.addComponentsGetterSetter(Konva.Container, 'clip', [
    'x',
    'y',
    'width',
    'height'
  ]);
  /**
   * get/set clip
   * @method
   * @name clip
   * @memberof Konva.Container.prototype
   * @param {Object} clip
   * @param {Number} clip.x
   * @param {Number} clip.y
   * @param {Number} clip.width
   * @param {Number} clip.height
   * @returns {Object}
   * @example
   * // get clip
   * var clip = container.clip();
   *
   * // set clip
   * container.setClip({
   *   x: 20,
   *   y: 20,
   *   width: 20,
   *   height: 20
   * });
   */

  Konva.Factory.addGetterSetter(
    Konva.Container,
    'clipX',
    undefined,
    Konva.Validators.getNumberValidator()
  );
  /**
   * get/set clip x
   * @name clipX
   * @method
   * @memberof Konva.Container.prototype
   * @param {Number} x
   * @returns {Number}
   * @example
   * // get clip x
   * var clipX = container.clipX();
   *
   * // set clip x
   * container.clipX(10);
   */

  Konva.Factory.addGetterSetter(
    Konva.Container,
    'clipY',
    undefined,
    Konva.Validators.getNumberValidator()
  );
  /**
   * get/set clip y
   * @name clipY
   * @method
   * @memberof Konva.Container.prototype
   * @param {Number} y
   * @returns {Number}
   * @example
   * // get clip y
   * var clipY = container.clipY();
   *
   * // set clip y
   * container.clipY(10);
   */

  Konva.Factory.addGetterSetter(
    Konva.Container,
    'clipWidth',
    undefined,
    Konva.Validators.getNumberValidator()
  );
  /**
   * get/set clip width
   * @name clipWidth
   * @method
   * @memberof Konva.Container.prototype
   * @param {Number} width
   * @returns {Number}
   * @example
   * // get clip width
   * var clipWidth = container.clipWidth();
   *
   * // set clip width
   * container.clipWidth(100);
   */

  Konva.Factory.addGetterSetter(
    Konva.Container,
    'clipHeight',
    undefined,
    Konva.Validators.getNumberValidator()
  );
  /**
   * get/set clip height
   * @name clipHeight
   * @method
   * @memberof Konva.Container.prototype
   * @param {Number} height
   * @returns {Number}
   * @example
   * // get clip height
   * var clipHeight = container.clipHeight();
   *
   * // set clip height
   * container.clipHeight(100);
   */

  Konva.Factory.addGetterSetter(Konva.Container, 'clipFunc');
  /**
   * get/set clip function
   * @name clipFunc
   * @method
   * @memberof Konva.Container.prototype
   * @param {Function} function
   * @returns {Function}
   * @example
   * // get clip function
   * var clipFunction = container.clipFunc();
   *
   * // set clip height
   * container.clipFunc(function(ctx) {
   *   ctx.rect(0, 0, 100, 100);
   * });
   */

  Konva.Collection.mapMethods(Konva.Container);
})();

(function(Konva) {
  'use strict';
  var HAS_SHADOW = 'hasShadow';
  var SHADOW_RGBA = 'shadowRGBA';

  function _fillFunc(context) {
    context.fill();
  }
  function _strokeFunc(context) {
    context.stroke();
  }
  function _fillFuncHit(context) {
    context.fill();
  }
  function _strokeFuncHit(context) {
    context.stroke();
  }

  function _clearHasShadowCache() {
    this._clearCache(HAS_SHADOW);
  }

  function _clearGetShadowRGBACache() {
    this._clearCache(SHADOW_RGBA);
  }

  /**
   * Shape constructor.  Shapes are primitive objects such as rectangles,
   *  circles, text, lines, etc.
   * @constructor
   * @memberof Konva
   * @augments Konva.Node
   * @param {Object} config
   * @param {String} [config.fill] fill color
     * @param {Image} [config.fillPatternImage] fill pattern image
     * @param {Number} [config.fillPatternX]
     * @param {Number} [config.fillPatternY]
     * @param {Object} [config.fillPatternOffset] object with x and y component
     * @param {Number} [config.fillPatternOffsetX] 
     * @param {Number} [config.fillPatternOffsetY] 
     * @param {Object} [config.fillPatternScale] object with x and y component
     * @param {Number} [config.fillPatternScaleX]
     * @param {Number} [config.fillPatternScaleY]
     * @param {Number} [config.fillPatternRotation]
     * @param {String} [config.fillPatternRepeat] can be "repeat", "repeat-x", "repeat-y", or "no-repeat".  The default is "no-repeat"
     * @param {Object} [config.fillLinearGradientStartPoint] object with x and y component
     * @param {Number} [config.fillLinearGradientStartPointX]
     * @param {Number} [config.fillLinearGradientStartPointY]
     * @param {Object} [config.fillLinearGradientEndPoint] object with x and y component
     * @param {Number} [config.fillLinearGradientEndPointX]
     * @param {Number} [config.fillLinearGradientEndPointY]
     * @param {Array} [config.fillLinearGradientColorStops] array of color stops
     * @param {Object} [config.fillRadialGradientStartPoint] object with x and y component
     * @param {Number} [config.fillRadialGradientStartPointX]
     * @param {Number} [config.fillRadialGradientStartPointY]
     * @param {Object} [config.fillRadialGradientEndPoint] object with x and y component
     * @param {Number} [config.fillRadialGradientEndPointX] 
     * @param {Number} [config.fillRadialGradientEndPointY] 
     * @param {Number} [config.fillRadialGradientStartRadius]
     * @param {Number} [config.fillRadialGradientEndRadius]
     * @param {Array} [config.fillRadialGradientColorStops] array of color stops
     * @param {Boolean} [config.fillEnabled] flag which enables or disables the fill.  The default value is true
     * @param {String} [config.fillPriority] can be color, linear-gradient, radial-graident, or pattern.  The default value is color.  The fillPriority property makes it really easy to toggle between different fill types.  For example, if you want to toggle between a fill color style and a fill pattern style, simply set the fill property and the fillPattern properties, and then use setFillPriority('color') to render the shape with a color fill, or use setFillPriority('pattern') to render the shape with the pattern fill configuration
     * @param {String} [config.stroke] stroke color
     * @param {Number} [config.strokeWidth] stroke width
     * @param {Boolean} [config.strokeHitEnabled] flag which enables or disables stroke hit region.  The default is true
     * @param {Boolean} [config.perfectDrawEnabled] flag which enables or disables using buffer canvas.  The default is true
     * @param {Boolean} [config.shadowForStrokeEnabled] flag which enables or disables shasow for stroke.  The default is true
     * @param {Boolean} [config.strokeScaleEnabled] flag which enables or disables stroke scale.  The default is true
     * @param {Boolean} [config.strokeEnabled] flag which enables or disables the stroke.  The default value is true
     * @param {String} [config.lineJoin] can be miter, round, or bevel.  The default
     *  is miter
     * @param {String} [config.lineCap] can be butt, round, or sqare.  The default
     *  is butt
     * @param {String} [config.shadowColor]
     * @param {Number} [config.shadowBlur]
     * @param {Object} [config.shadowOffset] object with x and y component
     * @param {Number} [config.shadowOffsetX]
     * @param {Number} [config.shadowOffsetY]
     * @param {Number} [config.shadowOpacity] shadow opacity.  Can be any real number
     *  between 0 and 1
     * @param {Boolean} [config.shadowEnabled] flag which enables or disables the shadow.  The default value is true
     * @param {Array} [config.dash]
     * @param {Boolean} [config.dashEnabled] flag which enables or disables the dashArray.  The default value is true
   * @param {Number} [config.x]
     * @param {Number} [config.y]
     * @param {Number} [config.width]
     * @param {Number} [config.height]
     * @param {Boolean} [config.visible]
     * @param {Boolean} [config.listening] whether or not the node is listening for events
     * @param {String} [config.id] unique id
     * @param {String} [config.name] non-unique name
     * @param {Number} [config.opacity] determines node opacity.  Can be any number between 0 and 1
     * @param {Object} [config.scale] set scale
     * @param {Number} [config.scaleX] set scale x
     * @param {Number} [config.scaleY] set scale y
     * @param {Number} [config.rotation] rotation in degrees
     * @param {Object} [config.offset] offset from center point and rotation point
     * @param {Number} [config.offsetX] set offset x
     * @param {Number} [config.offsetY] set offset y
     * @param {Boolean} [config.draggable] makes the node draggable.  When stages are draggable, you can drag and drop
     *  the entire stage by dragging any portion of the stage
     * @param {Number} [config.dragDistance]
     * @param {Function} [config.dragBoundFunc]
   * @example
   * var customShape = new Konva.Shape({
   *   x: 5,
   *   y: 10,
   *   fill: 'red',
   *   // a Konva.Canvas renderer is passed into the sceneFunc function
   *   sceneFunc: function(context, shape) {
   *     context.beginPath();
   *     context.moveTo(200, 50);
   *     context.lineTo(420, 80);
   *     context.quadraticCurveTo(300, 100, 260, 170);
   *     context.closePath();
   *     // Konva specific method
   *     context.fillStrokeShape(shape);
   *   }
   *});
   */
  Konva.Shape = function(config) {
    this.__init(config);
  };

  Konva.Util.addMethods(Konva.Shape, {
    __init: function(config) {
      this.nodeType = 'Shape';
      this._fillFunc = _fillFunc;
      this._strokeFunc = _strokeFunc;
      this._fillFuncHit = _fillFuncHit;
      this._strokeFuncHit = _strokeFuncHit;

      // set colorKey
      var shapes = Konva.shapes;
      var key;

      while (true) {
        key = Konva.Util.getRandomColor();
        if (key && !(key in shapes)) {
          break;
        }
      }

      this.colorKey = key;
      shapes[key] = this;

      // call super constructor
      Konva.Node.call(this, config);

      this.on(
        'shadowColorChange.konva shadowBlurChange.konva shadowOffsetChange.konva shadowOpacityChange.konva shadowEnabledChange.konva',
        _clearHasShadowCache
      );

      this.on(
        'shadowColorChange.konva shadowOpacityChange.konva shadowEnabledChange.konva',
        _clearGetShadowRGBACache
      );
    },
    hasChildren: function() {
      return false;
    },
    getChildren: function() {
      return [];
    },
    /**
     * get canvas context tied to the layer
     * @method
     * @memberof Konva.Shape.prototype
     * @returns {Konva.Context}
     */
    getContext: function() {
      return this.getLayer().getContext();
    },
    /**
     * get canvas renderer tied to the layer.  Note that this returns a canvas renderer, not a canvas element
     * @method
     * @memberof Konva.Shape.prototype
     * @returns {Konva.Canvas}
     */
    getCanvas: function() {
      return this.getLayer().getCanvas();
    },
    /**
     * returns whether or not a shadow will be rendered
     * @method
     * @memberof Konva.Shape.prototype
     * @returns {Boolean}
     */
    hasShadow: function() {
      return this._getCache(HAS_SHADOW, this._hasShadow);
    },
    _hasShadow: function() {
      return (
        this.getShadowEnabled() &&
        (this.getShadowOpacity() !== 0 &&
          !!(
            this.getShadowColor() ||
            this.getShadowBlur() ||
            this.getShadowOffsetX() ||
            this.getShadowOffsetY()
          ))
      );
    },
    getShadowRGBA: function() {
      return this._getCache(SHADOW_RGBA, this._getShadowRGBA);
    },
    _getShadowRGBA: function() {
      if (this.hasShadow()) {
        var rgba = Konva.Util.colorToRGBA(this.shadowColor());
        return (
          'rgba(' +
          rgba.r +
          ',' +
          rgba.g +
          ',' +
          rgba.b +
          ',' +
          rgba.a * (this.getShadowOpacity() || 1) +
          ')'
        );
      }
    },
    /**
     * returns whether or not the shape will be filled
     * @method
     * @memberof Konva.Shape.prototype
     * @returns {Boolean}
     */
    hasFill: function() {
      return !!(
        this.getFill() ||
        this.getFillPatternImage() ||
        this.getFillLinearGradientColorStops() ||
        this.getFillRadialGradientColorStops()
      );
    },
    /**
     * returns whether or not the shape will be stroked
     * @method
     * @memberof Konva.Shape.prototype
     * @returns {Boolean}
     */
    hasStroke: function() {
      return (
        this.strokeEnabled() &&
        !!(this.stroke() || this.getStrokeLinearGradientColorStops())
        // TODO: do we need radial gradient
        // this.getStrokeRadialGradientColorStops()
      );
    },
    /**
     * determines if point is in the shape, regardless if other shapes are on top of it.  Note: because
     *  this method clears a temporary canvas and then redraws the shape, it performs very poorly if executed many times
     *  consecutively.  Please use the {@link Konva.Stage#getIntersection} method if at all possible
     *  because it performs much better
     * @method
     * @memberof Konva.Shape.prototype
     * @param {Object} point
     * @param {Number} point.x
     * @param {Number} point.y
     * @returns {Boolean}
     */
    intersects: function(point) {
      var stage = this.getStage(),
        bufferHitCanvas = stage.bufferHitCanvas,
        p;

      bufferHitCanvas.getContext().clear();
      this.drawHit(bufferHitCanvas);
      p = bufferHitCanvas.context.getImageData(
        Math.round(point.x),
        Math.round(point.y),
        1,
        1
      ).data;
      return p[3] > 0;
    },
    // extends Node.prototype.destroy
    destroy: function() {
      Konva.Node.prototype.destroy.call(this);
      delete Konva.shapes[this.colorKey];
      return this;
    },
    _useBufferCanvas: function(caching) {
      return (
        (!caching &&
          (this.perfectDrawEnabled() &&
            this.getAbsoluteOpacity() !== 1 &&
            this.hasFill() &&
            this.hasStroke() &&
            this.getStage())) ||
        (this.perfectDrawEnabled() &&
          this.hasShadow() &&
          this.getAbsoluteOpacity() !== 1 &&
          this.hasFill() &&
          this.hasStroke() &&
          this.getStage())
      );
    },
    /**
     * return self rectangle (x, y, width, height) of shape.
     * This method are not taken into account transformation and styles.
     * @method
     * @memberof Konva.Shape.prototype
     * @returns {Object} rect with {x, y, width, height} properties
     * @example
     *
     * rect.getSelfRect();  // return {x:0, y:0, width:rect.width(), height:rect.height()}
     * circle.getSelfRect();  // return {x: - circle.width() / 2, y: - circle.height() / 2, width:circle.width(), height:circle.height()}
     *
     */
    getSelfRect: function() {
      var size = this.getSize();
      return {
        x: this._centroid ? Math.round(-size.width / 2) : 0,
        y: this._centroid ? Math.round(-size.height / 2) : 0,
        width: size.width,
        height: size.height
      };
    },
    getClientRect: function(attrs) {
      attrs = attrs || {};
      var skipTransform = attrs.skipTransform;

      var relativeTo = attrs.relativeTo;

      var fillRect = this.getSelfRect();

      var strokeWidth = (this.hasStroke() && this.strokeWidth()) || 0;
      var fillAndStrokeWidth = fillRect.width + strokeWidth;
      var fillAndStrokeHeight = fillRect.height + strokeWidth;

      var applyShadow = !attrs.skipShadow && this.hasShadow();
      var shadowOffsetX = applyShadow ? this.shadowOffsetX() : 0;
      var shadowOffsetY = applyShadow ? this.shadowOffsetY() : 0;

      var preWidth = fillAndStrokeWidth + Math.abs(shadowOffsetX);
      var preHeight = fillAndStrokeHeight + Math.abs(shadowOffsetY);

      var blurRadius = (applyShadow && this.shadowBlur()) || 0;

      var width = preWidth + blurRadius * 2;
      var height = preHeight + blurRadius * 2;

      // if stroke, for example = 3
      // we need to set x to 1.5, but after Math.round it will be 2
      // as we have additional offset we need to increase width and height by 1 pixel
      var roundingOffset = 0;
      if (Math.round(strokeWidth / 2) !== strokeWidth / 2) {
        roundingOffset = 1;
      }
      var rect = {
        width: width + roundingOffset,
        height: height + roundingOffset,
        x:
          -Math.round(strokeWidth / 2 + blurRadius) +
          Math.min(shadowOffsetX, 0) +
          fillRect.x,
        y:
          -Math.round(strokeWidth / 2 + blurRadius) +
          Math.min(shadowOffsetY, 0) +
          fillRect.y
      };
      if (!skipTransform) {
        return this._transformedRect(rect, relativeTo);
      }
      return rect;
    },
    drawScene: function(can, top, caching, skipBuffer) {
      var layer = this.getLayer(),
        canvas = can || layer.getCanvas(),
        context = canvas.getContext(),
        cachedCanvas = this._cache.canvas,
        drawFunc = this.sceneFunc(),
        hasShadow = this.hasShadow(),
        hasStroke = this.hasStroke(),
        stage,
        bufferCanvas,
        bufferContext;

      if (!this.isVisible() && !caching) {
        return this;
      }
      if (cachedCanvas) {
        context.save();
        layer._applyTransform(this, context, top);
        this._drawCachedSceneCanvas(context);
        context.restore();
        return this;
      }
      if (!drawFunc) {
        return this;
      }
      context.save();
      // if buffer canvas is needed
      if (this._useBufferCanvas(caching) && !skipBuffer) {
        stage = this.getStage();
        bufferCanvas = stage.bufferCanvas;
        bufferContext = bufferCanvas.getContext();
        bufferContext.clear();
        bufferContext.save();
        bufferContext._applyLineJoin(this);
        // layer might be undefined if we are using cache before adding to layer
        if (!caching) {
          if (layer) {
            layer._applyTransform(this, bufferContext, top);
          } else {
            var m = this.getAbsoluteTransform(top).getMatrix();
            context.transform(m[0], m[1], m[2], m[3], m[4], m[5]);
          }
        }

        drawFunc.call(this, bufferContext, this);
        bufferContext.restore();

        var ratio = bufferCanvas.pixelRatio;
        if (hasShadow && !canvas.hitCanvas) {
          context.save();

          context._applyShadow(this);
          context._applyOpacity(this);
          context._applyGlobalCompositeOperation(this);
          context.drawImage(
            bufferCanvas._canvas,
            0,
            0,
            bufferCanvas.width / ratio,
            bufferCanvas.height / ratio
          );
          context.restore();
        } else {
          context._applyOpacity(this);
          context._applyGlobalCompositeOperation(this);
          context.drawImage(
            bufferCanvas._canvas,
            0,
            0,
            bufferCanvas.width / ratio,
            bufferCanvas.height / ratio
          );
        }
      } else {
        // if buffer canvas is not needed
        context._applyLineJoin(this);
        // layer might be undefined if we are using cache before adding to layer
        if (!caching) {
          if (layer) {
            layer._applyTransform(this, context, top);
          } else {
            var o = this.getAbsoluteTransform(top).getMatrix();
            context.transform(o[0], o[1], o[2], o[3], o[4], o[5]);
          }
        }

        if (hasShadow && hasStroke && !canvas.hitCanvas) {
          context.save();
          // apply shadow
          if (!caching) {
            context._applyOpacity(this);
            context._applyGlobalCompositeOperation(this);
          }
          context._applyShadow(this);

          drawFunc.call(this, context, this);
          context.restore();
          // if shape has stroke we need to redraw shape
          // otherwise we will see a shadow under stroke (and over fill)
          // but I think this is unexpected behavior
          if (this.hasFill() && this.getShadowForStrokeEnabled()) {
            drawFunc.call(this, context, this);
          }
        } else if (hasShadow && !canvas.hitCanvas) {
          context.save();
          if (!caching) {
            context._applyOpacity(this);
            context._applyGlobalCompositeOperation(this);
          }
          context._applyShadow(this);
          drawFunc.call(this, context, this);
          context.restore();
        } else {
          if (!caching) {
            context._applyOpacity(this);
            context._applyGlobalCompositeOperation(this);
          }
          drawFunc.call(this, context, this);
        }
      }
      context.restore();
      return this;
    },
    drawHit: function(can, top, caching) {
      var layer = this.getLayer(),
        canvas = can || layer.hitCanvas,
        context = canvas.getContext(),
        drawFunc = this.hitFunc() || this.sceneFunc(),
        cachedCanvas = this._cache.canvas,
        cachedHitCanvas = cachedCanvas && cachedCanvas.hit;

      if (!this.shouldDrawHit(canvas) && !caching) {
        return this;
      }
      if (layer) {
        layer.clearHitCache();
      }
      if (cachedHitCanvas) {
        context.save();
        layer._applyTransform(this, context, top);
        this._drawCachedHitCanvas(context);
        context.restore();
        return this;
      }
      if (!drawFunc) {
        return this;
      }
      context.save();
      context._applyLineJoin(this);
      if (!caching) {
        if (layer) {
          layer._applyTransform(this, context, top);
        } else {
          var o = this.getAbsoluteTransform(top).getMatrix();
          context.transform(o[0], o[1], o[2], o[3], o[4], o[5]);
        }
      }
      drawFunc.call(this, context, this);
      context.restore();
      return this;
    },
    /**
     * draw hit graph using the cached scene canvas
     * @method
     * @memberof Konva.Shape.prototype
     * @param {Integer} alphaThreshold alpha channel threshold that determines whether or not
     *  a pixel should be drawn onto the hit graph.  Must be a value between 0 and 255.
     *  The default is 0
     * @returns {Konva.Shape}
     * @example
     * shape.cache();
     * shape.drawHitFromCache();
     */
    drawHitFromCache: function(alphaThreshold) {
      var threshold = alphaThreshold || 0,
        cachedCanvas = this._cache.canvas,
        sceneCanvas = this._getCachedSceneCanvas(),
        hitCanvas = cachedCanvas.hit,
        hitContext = hitCanvas.getContext(),
        hitWidth = hitCanvas.getWidth(),
        hitHeight = hitCanvas.getHeight(),
        hitImageData,
        hitData,
        len,
        rgbColorKey,
        i,
        alpha;

      hitContext.clear();
      hitContext.drawImage(sceneCanvas._canvas, 0, 0, hitWidth, hitHeight);

      try {
        hitImageData = hitContext.getImageData(0, 0, hitWidth, hitHeight);
        hitData = hitImageData.data;
        len = hitData.length;
        rgbColorKey = Konva.Util._hexToRgb(this.colorKey);

        // replace non transparent pixels with color key
        for (i = 0; i < len; i += 4) {
          alpha = hitData[i + 3];
          if (alpha > threshold) {
            hitData[i] = rgbColorKey.r;
            hitData[i + 1] = rgbColorKey.g;
            hitData[i + 2] = rgbColorKey.b;
            hitData[i + 3] = 255;
          } else {
            hitData[i + 3] = 0;
          }
        }
        hitContext.putImageData(hitImageData, 0, 0);
      } catch (e) {
        Konva.Util.error(
          'Unable to draw hit graph from cached scene canvas. ' + e.message
        );
      }

      return this;
    }
  });
  Konva.Util.extend(Konva.Shape, Konva.Node);

  // add getters and setters
  Konva.Factory.addGetterSetter(
    Konva.Shape,
    'stroke',
    undefined,
    Konva.Validators.getStringValidator()
  );

  /**
   * get/set stroke color
   * @name stroke
   * @method
   * @memberof Konva.Shape.prototype
   * @param {String} color
   * @returns {String}
   * @example
   * // get stroke color
   * var stroke = shape.stroke();
   *
   * // set stroke color with color string
   * shape.stroke('green');
   *
   * // set stroke color with hex
   * shape.stroke('#00ff00');
   *
   * // set stroke color with rgb
   * shape.stroke('rgb(0,255,0)');
   *
   * // set stroke color with rgba and make it 50% opaque
   * shape.stroke('rgba(0,255,0,0.5');
   */

  Konva.Factory.addGetterSetter(
    Konva.Shape,
    'strokeWidth',
    2,
    Konva.Validators.getNumberValidator()
  );

  /**
   * get/set stroke width
   * @name strokeWidth
   * @method
   * @memberof Konva.Shape.prototype
   * @param {Number} strokeWidth
   * @returns {Number}
   * @example
   * // get stroke width
   * var strokeWidth = shape.strokeWidth();
   *
   * // set stroke width
   * shape.strokeWidth();
   */

  Konva.Factory.addGetterSetter(
    Konva.Shape,
    'strokeHitEnabled',
    true,
    Konva.Validators.getBooleanValidator()
  );

  /**
   * get/set strokeHitEnabled property. Useful for performance optimization.
   * You may set `shape.strokeHitEnabled(false)`. In this case stroke will be no draw on hit canvas, so hit area
   * of shape will be decreased (by lineWidth / 2). Remember that non closed line with `strokeHitEnabled = false`
   * will be not drawn on hit canvas, that is mean line will no trigger pointer events (like mouseover)
   * Default value is true
   * @name strokeHitEnabled
   * @method
   * @memberof Konva.Shape.prototype
   * @param {Boolean} strokeHitEnabled
   * @returns {Boolean}
   * @example
   * // get strokeHitEnabled
   * var strokeHitEnabled = shape.strokeHitEnabled();
   *
   * // set strokeHitEnabled
   * shape.strokeHitEnabled();
   */

  Konva.Factory.addGetterSetter(
    Konva.Shape,
    'perfectDrawEnabled',
    true,
    Konva.Validators.getBooleanValidator()
  );

  /**
   * get/set perfectDrawEnabled. If a shape has fill, stroke and opacity you may set `perfectDrawEnabled` to false to improve performance.
   * See http://konvajs.github.io/docs/performance/Disable_Perfect_Draw.html for more information.
   * Default value is true
   * @name perfectDrawEnabled
   * @method
   * @memberof Konva.Shape.prototype
   * @param {Boolean} perfectDrawEnabled
   * @returns {Boolean}
   * @example
   * // get perfectDrawEnabled
   * var perfectDrawEnabled = shape.perfectDrawEnabled();
   *
   * // set perfectDrawEnabled
   * shape.perfectDrawEnabled();
   */

  Konva.Factory.addGetterSetter(
    Konva.Shape,
    'shadowForStrokeEnabled',
    true,
    Konva.Validators.getBooleanValidator()
  );

  /**
   * get/set shadowForStrokeEnabled. Useful for performance optimization.
   * You may set `shape.shadowForStrokeEnabled(false)`. In this case stroke will be no draw shadow for stroke.
   * Remember if you set `shadowForStrokeEnabled = false` for non closed line - that line with have no shadow!.
   * Default value is true
   * @name shadowForStrokeEnabled
   * @method
   * @memberof Konva.Shape.prototype
   * @param {Boolean} shadowForStrokeEnabled
   * @returns {Boolean}
   * @example
   * // get shadowForStrokeEnabled
   * var shadowForStrokeEnabled = shape.shadowForStrokeEnabled();
   *
   * // set shadowForStrokeEnabled
   * shape.shadowForStrokeEnabled();
   */

  Konva.Factory.addGetterSetter(Konva.Shape, 'lineJoin');

  /**
   * get/set line join.  Can be miter, round, or bevel.  The
   *  default is miter
   * @name lineJoin
   * @method
   * @memberof Konva.Shape.prototype
   * @param {String} lineJoin
   * @returns {String}
   * @example
   * // get line join
   * var lineJoin = shape.lineJoin();
   *
   * // set line join
   * shape.lineJoin('round');
   */

  Konva.Factory.addGetterSetter(Konva.Shape, 'lineCap');

  /**
   * get/set line cap.  Can be butt, round, or square
   * @name lineCap
   * @method
   * @memberof Konva.Shape.prototype
   * @param {String} lineCap
   * @returns {String}
   * @example
   * // get line cap
   * var lineCap = shape.lineCap();
   *
   * // set line cap
   * shape.lineCap('round');
   */

  Konva.Factory.addGetterSetter(Konva.Shape, 'sceneFunc');

  /**
   * get/set scene draw function
   * @name sceneFunc
   * @method
   * @memberof Konva.Shape.prototype
   * @param {Function} drawFunc drawing function
   * @returns {Function}
   * @example
   * // get scene draw function
   * var sceneFunc = shape.sceneFunc();
   *
   * // set scene draw function
   * shape.sceneFunc(function(context) {
   *   context.beginPath();
   *   context.rect(0, 0, this.width(), this.height());
   *   context.closePath();
   *   context.fillStrokeShape(this);
   * });
   */

  Konva.Factory.addGetterSetter(Konva.Shape, 'hitFunc');

  /**
   * get/set hit draw function
   * @name hitFunc
   * @method
   * @memberof Konva.Shape.prototype
   * @param {Function} drawFunc drawing function
   * @returns {Function}
   * @example
   * // get hit draw function
   * var hitFunc = shape.hitFunc();
   *
   * // set hit draw function
   * shape.hitFunc(function(context) {
   *   context.beginPath();
   *   context.rect(0, 0, this.width(), this.height());
   *   context.closePath();
   *   context.fillStrokeShape(this);
   * });
   */

  Konva.Factory.addGetterSetter(Konva.Shape, 'dash');

  /**
   * get/set dash array for stroke.
   * @name dash
   * @method
   * @memberof Konva.Shape.prototype
   * @param {Array} dash
   * @returns {Array}
   * @example
   *  // apply dashed stroke that is 10px long and 5 pixels apart
   *  line.dash([10, 5]);
   *  // apply dashed stroke that is made up of alternating dashed
   *  // lines that are 10px long and 20px apart, and dots that have
   *  // a radius of 5px and are 20px apart
   *  line.dash([10, 20, 0.001, 20]);
   */

  Konva.Factory.addGetterSetter(
    Konva.Shape,
    'dashOffset',
    0,
    Konva.Validators.getNumberValidator()
  );

  /**
   * get/set dash offset for stroke.
   * @name dash
   * @method
   * @memberof Konva.Shape.prototype
   * @param {Number} dash offset
   * @returns {Number}
   * @example
   *  // apply dashed stroke that is 10px long and 5 pixels apart with an offset of 5px
   *  line.dash([10, 5]);
   *  line.dashOffset(5);
   */

  Konva.Factory.addGetterSetter(
    Konva.Shape,
    'shadowColor',
    undefined,
    Konva.Validators.getStringValidator()
  );

  /**
   * get/set shadow color
   * @name shadowColor
   * @method
   * @memberof Konva.Shape.prototype
   * @param {String} color
   * @returns {String}
   * @example
   * // get shadow color
   * var shadow = shape.shadowColor();
   *
   * // set shadow color with color string
   * shape.shadowColor('green');
   *
   * // set shadow color with hex
   * shape.shadowColor('#00ff00');
   *
   * // set shadow color with rgb
   * shape.shadowColor('rgb(0,255,0)');
   *
   * // set shadow color with rgba and make it 50% opaque
   * shape.shadowColor('rgba(0,255,0,0.5');
   */

  Konva.Factory.addGetterSetter(
    Konva.Shape,
    'shadowBlur',
    0,
    Konva.Validators.getNumberValidator()
  );

  /**
   * get/set shadow blur
   * @name shadowBlur
   * @method
   * @memberof Konva.Shape.prototype
   * @param {Number} blur
   * @returns {Number}
   * @example
   * // get shadow blur
   * var shadowBlur = shape.shadowBlur();
   *
   * // set shadow blur
   * shape.shadowBlur(10);
   */

  Konva.Factory.addGetterSetter(
    Konva.Shape,
    'shadowOpacity',
    1,
    Konva.Validators.getNumberValidator()
  );

  /**
   * get/set shadow opacity.  must be a value between 0 and 1
   * @name shadowOpacity
   * @method
   * @memberof Konva.Shape.prototype
   * @param {Number} opacity
   * @returns {Number}
   * @example
   * // get shadow opacity
   * var shadowOpacity = shape.shadowOpacity();
   *
   * // set shadow opacity
   * shape.shadowOpacity(0.5);
   */

  Konva.Factory.addComponentsGetterSetter(Konva.Shape, 'shadowOffset', [
    'x',
    'y'
  ]);

  /**
   * get/set shadow offset
   * @name shadowOffset
   * @method
   * @memberof Konva.Shape.prototype
   * @param {Object} offset
   * @param {Number} offset.x
   * @param {Number} offset.y
   * @returns {Object}
   * @example
   * // get shadow offset
   * var shadowOffset = shape.shadowOffset();
   *
   * // set shadow offset
   * shape.shadowOffset({
   *   x: 20
   *   y: 10
   * });
   */

  Konva.Factory.addGetterSetter(
    Konva.Shape,
    'shadowOffsetX',
    0,
    Konva.Validators.getNumberValidator()
  );

  /**
   * get/set shadow offset x
   * @name shadowOffsetX
   * @method
   * @memberof Konva.Shape.prototype
   * @param {Number} x
   * @returns {Number}
   * @example
   * // get shadow offset x
   * var shadowOffsetX = shape.shadowOffsetX();
   *
   * // set shadow offset x
   * shape.shadowOffsetX(5);
   */

  Konva.Factory.addGetterSetter(
    Konva.Shape,
    'shadowOffsetY',
    0,
    Konva.Validators.getNumberValidator()
  );

  /**
   * get/set shadow offset y
   * @name shadowOffsetY
   * @method
   * @memberof Konva.Shape.prototype
   * @param {Number} y
   * @returns {Number}
   * @example
   * // get shadow offset y
   * var shadowOffsetY = shape.shadowOffsetY();
   *
   * // set shadow offset y
   * shape.shadowOffsetY(5);
   */

  Konva.Factory.addGetterSetter(Konva.Shape, 'fillPatternImage');

  /**
   * get/set fill pattern image
   * @name fillPatternImage
   * @method
   * @memberof Konva.Shape.prototype
   * @param {Image} image object
   * @returns {Image}
   * @example
   * // get fill pattern image
   * var fillPatternImage = shape.fillPatternImage();
   *
   * // set fill pattern image
   * var imageObj = new Image();
   * imageObj.onload = function() {
   *   shape.fillPatternImage(imageObj);
   * };
   * imageObj.src = 'path/to/image/jpg';
   */

  Konva.Factory.addGetterSetter(
    Konva.Shape,
    'fill',
    undefined,
    Konva.Validators.getStringValidator()
  );

  /**
   * get/set fill color
   * @name fill
   * @method
   * @memberof Konva.Shape.prototype
   * @param {String} color
   * @returns {String}
   * @example
   * // get fill color
   * var fill = shape.fill();
   *
   * // set fill color with color string
   * shape.fill('green');
   *
   * // set fill color with hex
   * shape.fill('#00ff00');
   *
   * // set fill color with rgb
   * shape.fill('rgb(0,255,0)');
   *
   * // set fill color with rgba and make it 50% opaque
   * shape.fill('rgba(0,255,0,0.5');
   *
   * // shape without fill
   * shape.fill(null);
   */

  Konva.Factory.addGetterSetter(
    Konva.Shape,
    'fillPatternX',
    0,
    Konva.Validators.getNumberValidator()
  );

  /**
   * get/set fill pattern x
   * @name fillPatternX
   * @method
   * @memberof Konva.Shape.prototype
   * @param {Number} x
   * @returns {Number}
   * @example
   * // get fill pattern x
   * var fillPatternX = shape.fillPatternX();
   * // set fill pattern x
   * shape.fillPatternX(20);
   */

  Konva.Factory.addGetterSetter(
    Konva.Shape,
    'fillPatternY',
    0,
    Konva.Validators.getNumberValidator()
  );

  /**
   * get/set fill pattern y
   * @name fillPatternY
   * @method
   * @memberof Konva.Shape.prototype
   * @param {Number} y
   * @returns {Number}
   * @example
   * // get fill pattern y
   * var fillPatternY = shape.fillPatternY();
   * // set fill pattern y
   * shape.fillPatternY(20);
   */

  Konva.Factory.addGetterSetter(Konva.Shape, 'fillLinearGradientColorStops');

  /**
   * get/set fill linear gradient color stops
   * @name fillLinearGradientColorStops
   * @method
   * @memberof Konva.Shape.prototype
   * @param {Array} colorStops
   * @returns {Array} colorStops
   * @example
   * // get fill linear gradient color stops
   * var colorStops = shape.fillLinearGradientColorStops();
   *
   * // create a linear gradient that starts with red, changes to blue
   * // halfway through, and then changes to green
   * shape.fillLinearGradientColorStops(0, 'red', 0.5, 'blue', 1, 'green');
   */

  Konva.Factory.addGetterSetter(Konva.Shape, 'strokeLinearGradientColorStops');

  /**
   * get/set stroke linear gradient color stops
   * @name strokeLinearGradientColorStops
   * @method
   * @memberof Konva.Shape.prototype
   * @param {Array} colorStops
   * @returns {Array} colorStops
   * @example
   * // get stroke linear gradient color stops
   * var colorStops = shape.strokeLinearGradientColorStops();
   *
   * // create a linear gradient that starts with red, changes to blue
   * // halfway through, and then changes to green
   * shape.strokeLinearGradientColorStops([0, 'red', 0.5, 'blue', 1, 'green']);
   */

  Konva.Factory.addGetterSetter(
    Konva.Shape,
    'fillRadialGradientStartRadius',
    0
  );

  /**
   * get/set fill radial gradient start radius
   * @name fillRadialGradientStartRadius
   * @method
   * @memberof Konva.Shape.prototype
   * @param {Number} radius
   * @returns {Number}
   * @example
   * // get radial gradient start radius
   * var startRadius = shape.fillRadialGradientStartRadius();
   *
   * // set radial gradient start radius
   * shape.fillRadialGradientStartRadius(0);
   */

  Konva.Factory.addGetterSetter(Konva.Shape, 'fillRadialGradientEndRadius', 0);

  /**
   * get/set fill radial gradient end radius
   * @name fillRadialGradientEndRadius
   * @method
   * @memberof Konva.Shape.prototype
   * @param {Number} radius
   * @returns {Number}
   * @example
   * // get radial gradient end radius
   * var endRadius = shape.fillRadialGradientEndRadius();
   *
   * // set radial gradient end radius
   * shape.fillRadialGradientEndRadius(100);
   */

  Konva.Factory.addGetterSetter(Konva.Shape, 'fillRadialGradientColorStops');

  /**
   * get/set fill radial gradient color stops
   * @name fillRadialGradientColorStops
   * @method
   * @memberof Konva.Shape.prototype
   * @param {Number} colorStops
   * @returns {Array}
   * @example
   * // get fill radial gradient color stops
   * var colorStops = shape.fillRadialGradientColorStops();
   *
   * // create a radial gradient that starts with red, changes to blue
   * // halfway through, and then changes to green
   * shape.fillRadialGradientColorStops(0, 'red', 0.5, 'blue', 1, 'green');
   */

  Konva.Factory.addGetterSetter(Konva.Shape, 'fillPatternRepeat', 'repeat');

  /**
   * get/set fill pattern repeat.  Can be 'repeat', 'repeat-x', 'repeat-y', or 'no-repeat'.  The default is 'repeat'
   * @name fillPatternRepeat
   * @method
   * @memberof Konva.Shape.prototype
   * @param {String} repeat
   * @returns {String}
   * @example
   * // get fill pattern repeat
   * var repeat = shape.fillPatternRepeat();
   *
   * // repeat pattern in x direction only
   * shape.fillPatternRepeat('repeat-x');
   *
   * // do not repeat the pattern
   * shape.fillPatternRepeat('no repeat');
   */

  Konva.Factory.addGetterSetter(Konva.Shape, 'fillEnabled', true);

  /**
   * get/set fill enabled flag
   * @name fillEnabled
   * @method
   * @memberof Konva.Shape.prototype
   * @param {Boolean} enabled
   * @returns {Boolean}
   * @example
   * // get fill enabled flag
   * var fillEnabled = shape.fillEnabled();
   *
   * // disable fill
   * shape.fillEnabled(false);
   *
   * // enable fill
   * shape.fillEnabled(true);
   */

  Konva.Factory.addGetterSetter(Konva.Shape, 'strokeEnabled', true);

  /**
   * get/set stroke enabled flag
   * @name strokeEnabled
   * @method
   * @memberof Konva.Shape.prototype
   * @param {Boolean} enabled
   * @returns {Boolean}
   * @example
   * // get stroke enabled flag
   * var strokeEnabled = shape.strokeEnabled();
   *
   * // disable stroke
   * shape.strokeEnabled(false);
   *
   * // enable stroke
   * shape.strokeEnabled(true);
   */

  Konva.Factory.addGetterSetter(Konva.Shape, 'shadowEnabled', true);

  /**
   * get/set shadow enabled flag
   * @name shadowEnabled
   * @method
   * @memberof Konva.Shape.prototype
   * @param {Boolean} enabled
   * @returns {Boolean}
   * @example
   * // get shadow enabled flag
   * var shadowEnabled = shape.shadowEnabled();
   *
   * // disable shadow
   * shape.shadowEnabled(false);
   *
   * // enable shadow
   * shape.shadowEnabled(true);
   */

  Konva.Factory.addGetterSetter(Konva.Shape, 'dashEnabled', true);

  /**
   * get/set dash enabled flag
   * @name dashEnabled
   * @method
   * @memberof Konva.Shape.prototype
   * @param {Boolean} enabled
   * @returns {Boolean}
   * @example
   * // get dash enabled flag
   * var dashEnabled = shape.dashEnabled();
   *
   * // disable dash
   * shape.dashEnabled(false);
   *
   * // enable dash
   * shape.dashEnabled(true);
   */

  Konva.Factory.addGetterSetter(Konva.Shape, 'strokeScaleEnabled', true);

  /**
   * get/set strokeScale enabled flag
   * @name strokeScaleEnabled
   * @method
   * @memberof Konva.Shape.prototype
   * @param {Boolean} enabled
   * @returns {Boolean}
   * @example
   * // get stroke scale enabled flag
   * var strokeScaleEnabled = shape.strokeScaleEnabled();
   *
   * // disable stroke scale
   * shape.strokeScaleEnabled(false);
   *
   * // enable stroke scale
   * shape.strokeScaleEnabled(true);
   */

  Konva.Factory.addGetterSetter(Konva.Shape, 'fillPriority', 'color');

  /**
   * get/set fill priority.  can be color, pattern, linear-gradient, or radial-gradient.  The default is color.
   *   This is handy if you want to toggle between different fill types.
   * @name fillPriority
   * @method
   * @memberof Konva.Shape.prototype
   * @param {String} priority
   * @returns {String}
   * @example
   * // get fill priority
   * var fillPriority = shape.fillPriority();
   *
   * // set fill priority
   * shape.fillPriority('linear-gradient');
   */

  Konva.Factory.addComponentsGetterSetter(Konva.Shape, 'fillPatternOffset', [
    'x',
    'y'
  ]);

  /**
   * get/set fill pattern offset
   * @name fillPatternOffset
   * @method
   * @memberof Konva.Shape.prototype
   * @param {Object} offset
   * @param {Number} offset.x
   * @param {Number} offset.y
   * @returns {Object}
   * @example
   * // get fill pattern offset
   * var patternOffset = shape.fillPatternOffset();
   *
   * // set fill pattern offset
   * shape.fillPatternOffset({
   *   x: 20
   *   y: 10
   * });
   */

  Konva.Factory.addGetterSetter(
    Konva.Shape,
    'fillPatternOffsetX',
    0,
    Konva.Validators.getNumberValidator()
  );

  /**
   * get/set fill pattern offset x
   * @name fillPatternOffsetX
   * @method
   * @memberof Konva.Shape.prototype
   * @param {Number} x
   * @returns {Number}
   * @example
   * // get fill pattern offset x
   * var patternOffsetX = shape.fillPatternOffsetX();
   *
   * // set fill pattern offset x
   * shape.fillPatternOffsetX(20);
   */

  Konva.Factory.addGetterSetter(
    Konva.Shape,
    'fillPatternOffsetY',
    0,
    Konva.Validators.getNumberValidator()
  );

  /**
   * get/set fill pattern offset y
   * @name fillPatternOffsetY
   * @method
   * @memberof Konva.Shape.prototype
   * @param {Number} y
   * @returns {Number}
   * @example
   * // get fill pattern offset y
   * var patternOffsetY = shape.fillPatternOffsetY();
   *
   * // set fill pattern offset y
   * shape.fillPatternOffsetY(10);
   */

  Konva.Factory.addComponentsGetterSetter(Konva.Shape, 'fillPatternScale', [
    'x',
    'y'
  ]);

  /**
   * get/set fill pattern scale
   * @name fillPatternScale
   * @method
   * @memberof Konva.Shape.prototype
   * @param {Object} scale
   * @param {Number} scale.x
   * @param {Number} scale.y
   * @returns {Object}
   * @example
   * // get fill pattern scale
   * var patternScale = shape.fillPatternScale();
   *
   * // set fill pattern scale
   * shape.fillPatternScale({
   *   x: 2
   *   y: 2
   * });
   */

  Konva.Factory.addGetterSetter(
    Konva.Shape,
    'fillPatternScaleX',
    1,
    Konva.Validators.getNumberValidator()
  );

  /**
   * get/set fill pattern scale x
   * @name fillPatternScaleX
   * @method
   * @memberof Konva.Shape.prototype
   * @param {Number} x
   * @returns {Number}
   * @example
   * // get fill pattern scale x
   * var patternScaleX = shape.fillPatternScaleX();
   *
   * // set fill pattern scale x
   * shape.fillPatternScaleX(2);
   */

  Konva.Factory.addGetterSetter(
    Konva.Shape,
    'fillPatternScaleY',
    1,
    Konva.Validators.getNumberValidator()
  );

  /**
   * get/set fill pattern scale y
   * @name fillPatternScaleY
   * @method
   * @memberof Konva.Shape.prototype
   * @param {Number} y
   * @returns {Number}
   * @example
   * // get fill pattern scale y
   * var patternScaleY = shape.fillPatternScaleY();
   *
   * // set fill pattern scale y
   * shape.fillPatternScaleY(2);
   */

  Konva.Factory.addComponentsGetterSetter(
    Konva.Shape,
    'fillLinearGradientStartPoint',
    ['x', 'y']
  );

  /**
   * get/set fill linear gradient start point
   * @name fillLinearGradientStartPoint
   * @method
   * @memberof Konva.Shape.prototype
   * @param {Object} startPoint
   * @param {Number} startPoint.x
   * @param {Number} startPoint.y
   * @returns {Object}
   * @example
   * // get fill linear gradient start point
   * var startPoint = shape.fillLinearGradientStartPoint();
   *
   * // set fill linear gradient start point
   * shape.fillLinearGradientStartPoint({
   *   x: 20
   *   y: 10
   * });
   */

  Konva.Factory.addComponentsGetterSetter(
    Konva.Shape,
    'strokeLinearGradientStartPoint',
    ['x', 'y']
  );

  /**
   * get/set stroke linear gradient start point
   * @name strokeLinearGradientStartPoint
   * @method
   * @memberof Konva.Shape.prototype
   * @param {Object} startPoint
   * @param {Number} startPoint.x
   * @param {Number} startPoint.y
   * @returns {Object}
   * @example
   * // get stroke linear gradient start point
   * var startPoint = shape.strokeLinearGradientStartPoint();
   *
   * // set stroke linear gradient start point
   * shape.strokeLinearGradientStartPoint({
   *   x: 20
   *   y: 10
   * });
   */

  Konva.Factory.addGetterSetter(
    Konva.Shape,
    'fillLinearGradientStartPointX',
    0
  );

  /**
   * get/set fill linear gradient start point x
   * @name fillLinearGradientStartPointX
   * @method
   * @memberof Konva.Shape.prototype
   * @param {Number} x
   * @returns {Number}
   * @example
   * // get fill linear gradient start point x
   * var startPointX = shape.fillLinearGradientStartPointX();
   *
   * // set fill linear gradient start point x
   * shape.fillLinearGradientStartPointX(20);
   */

  Konva.Factory.addGetterSetter(
    Konva.Shape,
    'strokeLinearGradientStartPointX',
    0
  );

  /**
   * get/set stroke linear gradient start point x
   * @name linearLinearGradientStartPointX
   * @method
   * @memberof Konva.Shape.prototype
   * @param {Number} x
   * @returns {Number}
   * @example
   * // get stroke linear gradient start point x
   * var startPointX = shape.strokeLinearGradientStartPointX();
   *
   * // set stroke linear gradient start point x
   * shape.strokeLinearGradientStartPointX(20);
   */

  Konva.Factory.addGetterSetter(
    Konva.Shape,
    'fillLinearGradientStartPointY',
    0
  );

  /**
   * get/set fill linear gradient start point y
   * @name fillLinearGradientStartPointY
   * @method
   * @memberof Konva.Shape.prototype
   * @param {Number} y
   * @returns {Number}
   * @example
   * // get fill linear gradient start point y
   * var startPointY = shape.fillLinearGradientStartPointY();
   *
   * // set fill linear gradient start point y
   * shape.fillLinearGradientStartPointY(20);
   */

  Konva.Factory.addGetterSetter(
    Konva.Shape,
    'strokeLinearGradientStartPointY',
    0
  );
  /**
   * get/set stroke linear gradient start point y
   * @name strokeLinearGradientStartPointY
   * @method
   * @memberof Konva.Shape.prototype
   * @param {Number} y
   * @returns {Number}
   * @example
   * // get stroke linear gradient start point y
   * var startPointY = shape.strokeLinearGradientStartPointY();
   *
   * // set stroke linear gradient start point y
   * shape.strokeLinearGradientStartPointY(20);
   */

  Konva.Factory.addComponentsGetterSetter(
    Konva.Shape,
    'fillLinearGradientEndPoint',
    ['x', 'y']
  );

  /**
   * get/set fill linear gradient end point
   * @name fillLinearGradientEndPoint
   * @method
   * @memberof Konva.Shape.prototype
   * @param {Object} endPoint
   * @param {Number} endPoint.x
   * @param {Number} endPoint.y
   * @returns {Object}
   * @example
   * // get fill linear gradient end point
   * var endPoint = shape.fillLinearGradientEndPoint();
   *
   * // set fill linear gradient end point
   * shape.fillLinearGradientEndPoint({
   *   x: 20
   *   y: 10
   * });
   */

  Konva.Factory.addComponentsGetterSetter(
    Konva.Shape,
    'strokeLinearGradientEndPoint',
    ['x', 'y']
  );

  /**
   * get/set stroke linear gradient end point
   * @name strokeLinearGradientEndPoint
   * @method
   * @memberof Konva.Shape.prototype
   * @param {Object} endPoint
   * @param {Number} endPoint.x
   * @param {Number} endPoint.y
   * @returns {Object}
   * @example
   * // get stroke linear gradient end point
   * var endPoint = shape.strokeLinearGradientEndPoint();
   *
   * // set stroke linear gradient end point
   * shape.strokeLinearGradientEndPoint({
   *   x: 20
   *   y: 10
   * });
   */

  Konva.Factory.addGetterSetter(Konva.Shape, 'fillLinearGradientEndPointX', 0);
  /**
   * get/set fill linear gradient end point x
   * @name fillLinearGradientEndPointX
   * @method
   * @memberof Konva.Shape.prototype
   * @param {Number} x
   * @returns {Number}
   * @example
   * // get fill linear gradient end point x
   * var endPointX = shape.fillLinearGradientEndPointX();
   *
   * // set fill linear gradient end point x
   * shape.fillLinearGradientEndPointX(20);
   */

  Konva.Factory.addGetterSetter(
    Konva.Shape,
    'strokeLinearGradientEndPointX',
    0
  );
  /**
   * get/set fill linear gradient end point x
   * @name strokeLinearGradientEndPointX
   * @method
   * @memberof Konva.Shape.prototype
   * @param {Number} x
   * @returns {Number}
   * @example
   * // get stroke linear gradient end point x
   * var endPointX = shape.strokeLinearGradientEndPointX();
   *
   * // set stroke linear gradient end point x
   * shape.strokeLinearGradientEndPointX(20);
   */

  Konva.Factory.addGetterSetter(Konva.Shape, 'fillLinearGradientEndPointY', 0);
  /**
   * get/set fill linear gradient end point y
   * @name fillLinearGradientEndPointY
   * @method
   * @memberof Konva.Shape.prototype
   * @param {Number} y
   * @returns {Number}
   * @example
   * // get fill linear gradient end point y
   * var endPointY = shape.fillLinearGradientEndPointY();
   *
   * // set fill linear gradient end point y
   * shape.fillLinearGradientEndPointY(20);
   */

  Konva.Factory.addGetterSetter(
    Konva.Shape,
    'strokeLinearGradientEndPointY',
    0
  );
  /**
   * get/set stroke linear gradient end point y
   * @name strokeLinearGradientEndPointY
   * @method
   * @memberof Konva.Shape.prototype
   * @param {Number} y
   * @returns {Number}
   * @example
   * // get stroke linear gradient end point y
   * var endPointY = shape.strokeLinearGradientEndPointY();
   *
   * // set stroke linear gradient end point y
   * shape.strokeLinearGradientEndPointY(20);
   */

  Konva.Factory.addComponentsGetterSetter(
    Konva.Shape,
    'fillRadialGradientStartPoint',
    ['x', 'y']
  );

  /**
   * get/set fill radial gradient start point
   * @name fillRadialGradientStartPoint
   * @method
   * @memberof Konva.Shape.prototype
   * @param {Object} startPoint
   * @param {Number} startPoint.x
   * @param {Number} startPoint.y
   * @returns {Object}
   * @example
   * // get fill radial gradient start point
   * var startPoint = shape.fillRadialGradientStartPoint();
   *
   * // set fill radial gradient start point
   * shape.fillRadialGradientStartPoint({
   *   x: 20
   *   y: 10
   * });
   */

  Konva.Factory.addGetterSetter(
    Konva.Shape,
    'fillRadialGradientStartPointX',
    0
  );
  /**
   * get/set fill radial gradient start point x
   * @name fillRadialGradientStartPointX
   * @method
   * @memberof Konva.Shape.prototype
   * @param {Number} x
   * @returns {Number}
   * @example
   * // get fill radial gradient start point x
   * var startPointX = shape.fillRadialGradientStartPointX();
   *
   * // set fill radial gradient start point x
   * shape.fillRadialGradientStartPointX(20);
   */

  Konva.Factory.addGetterSetter(
    Konva.Shape,
    'fillRadialGradientStartPointY',
    0
  );
  /**
   * get/set fill radial gradient start point y
   * @name fillRadialGradientStartPointY
   * @method
   * @memberof Konva.Shape.prototype
   * @param {Number} y
   * @returns {Number}
   * @example
   * // get fill radial gradient start point y
   * var startPointY = shape.fillRadialGradientStartPointY();
   *
   * // set fill radial gradient start point y
   * shape.fillRadialGradientStartPointY(20);
   */

  Konva.Factory.addComponentsGetterSetter(
    Konva.Shape,
    'fillRadialGradientEndPoint',
    ['x', 'y']
  );

  /**
   * get/set fill radial gradient end point
   * @name fillRadialGradientEndPoint
   * @method
   * @memberof Konva.Shape.prototype
   * @param {Object} endPoint
   * @param {Number} endPoint.x
   * @param {Number} endPoint.y
   * @returns {Object}
   * @example
   * // get fill radial gradient end point
   * var endPoint = shape.fillRadialGradientEndPoint();
   *
   * // set fill radial gradient end point
   * shape.fillRadialGradientEndPoint({
   *   x: 20
   *   y: 10
   * });
   */

  Konva.Factory.addGetterSetter(Konva.Shape, 'fillRadialGradientEndPointX', 0);
  /**
   * get/set fill radial gradient end point x
   * @name fillRadialGradientEndPointX
   * @method
   * @memberof Konva.Shape.prototype
   * @param {Number} x
   * @returns {Number}
   * @example
   * // get fill radial gradient end point x
   * var endPointX = shape.fillRadialGradientEndPointX();
   *
   * // set fill radial gradient end point x
   * shape.fillRadialGradientEndPointX(20);
   */

  Konva.Factory.addGetterSetter(Konva.Shape, 'fillRadialGradientEndPointY', 0);
  /**
   * get/set fill radial gradient end point y
   * @name fillRadialGradientEndPointY
   * @method
   * @memberof Konva.Shape.prototype
   * @param {Number} y
   * @returns {Number}
   * @example
   * // get fill radial gradient end point y
   * var endPointY = shape.fillRadialGradientEndPointY();
   *
   * // set fill radial gradient end point y
   * shape.fillRadialGradientEndPointY(20);
   */

  Konva.Factory.addGetterSetter(Konva.Shape, 'fillPatternRotation', 0);

  /**
   * get/set fill pattern rotation in degrees
   * @name fillPatternRotation
   * @method
   * @memberof Konva.Shape.prototype
   * @param {Number} rotation
   * @returns {Konva.Shape}
   * @example
   * // get fill pattern rotation
   * var patternRotation = shape.fillPatternRotation();
   *
   * // set fill pattern rotation
   * shape.fillPatternRotation(20);
   */

  Konva.Factory.backCompat(Konva.Shape, {
    dashArray: 'dash',
    getDashArray: 'getDash',
    setDashArray: 'getDash',

    drawFunc: 'sceneFunc',
    getDrawFunc: 'getSceneFunc',
    setDrawFunc: 'setSceneFunc',

    drawHitFunc: 'hitFunc',
    getDrawHitFunc: 'getHitFunc',
    setDrawHitFunc: 'setHitFunc'
  });

  Konva.Collection.mapMethods(Konva.Shape);
})(Konva);

(function() {
  'use strict';
  // CONSTANTS
  var STAGE = 'Stage',
    STRING = 'string',
    PX = 'px',
    MOUSEOUT = 'mouseout',
    MOUSELEAVE = 'mouseleave',
    MOUSEOVER = 'mouseover',
    MOUSEENTER = 'mouseenter',
    MOUSEMOVE = 'mousemove',
    MOUSEDOWN = 'mousedown',
    MOUSEUP = 'mouseup',
    CONTEXTMENU = 'contextmenu',
    CLICK = 'click',
    DBL_CLICK = 'dblclick',
    TOUCHSTART = 'touchstart',
    TOUCHEND = 'touchend',
    TAP = 'tap',
    DBL_TAP = 'dbltap',
    TOUCHMOVE = 'touchmove',
    WHEEL = 'wheel',
    CONTENT_MOUSEOUT = 'contentMouseout',
    CONTENT_MOUSEOVER = 'contentMouseover',
    CONTENT_MOUSEMOVE = 'contentMousemove',
    CONTENT_MOUSEDOWN = 'contentMousedown',
    CONTENT_MOUSEUP = 'contentMouseup',
    CONTENT_CONTEXTMENU = 'contentContextmenu',
    CONTENT_CLICK = 'contentClick',
    CONTENT_DBL_CLICK = 'contentDblclick',
    CONTENT_TOUCHSTART = 'contentTouchstart',
    CONTENT_TOUCHEND = 'contentTouchend',
    CONTENT_DBL_TAP = 'contentDbltap',
    CONTENT_TAP = 'contentTap',
    CONTENT_TOUCHMOVE = 'contentTouchmove',
    CONTENT_WHEEL = 'contentWheel',
    DIV = 'div',
    RELATIVE = 'relative',
    KONVA_CONTENT = 'konvajs-content',
    SPACE = ' ',
    UNDERSCORE = '_',
    CONTAINER = 'container',
    EMPTY_STRING = '',
    EVENTS = [
      MOUSEDOWN,
      MOUSEMOVE,
      MOUSEUP,
      MOUSEOUT,
      TOUCHSTART,
      TOUCHMOVE,
      TOUCHEND,
      MOUSEOVER,
      WHEEL,
      CONTEXTMENU
    ],
    // cached variables
    eventsLength = EVENTS.length;

  function addEvent(ctx, eventName) {
    ctx.content.addEventListener(
      eventName,
      function(evt) {
        ctx[UNDERSCORE + eventName](evt);
      },
      false
    );
  }

  /**
   * Stage constructor.  A stage is used to contain multiple layers
   * @constructor
   * @memberof Konva
   * @augments Konva.Container
   * @param {Object} config
   * @param {String|Element} config.container Container selector or DOM element
   * @param {Number} [config.x]
     * @param {Number} [config.y]
     * @param {Number} [config.width]
     * @param {Number} [config.height]
     * @param {Boolean} [config.visible]
     * @param {Boolean} [config.listening] whether or not the node is listening for events
     * @param {String} [config.id] unique id
     * @param {String} [config.name] non-unique name
     * @param {Number} [config.opacity] determines node opacity.  Can be any number between 0 and 1
     * @param {Object} [config.scale] set scale
     * @param {Number} [config.scaleX] set scale x
     * @param {Number} [config.scaleY] set scale y
     * @param {Number} [config.rotation] rotation in degrees
     * @param {Object} [config.offset] offset from center point and rotation point
     * @param {Number} [config.offsetX] set offset x
     * @param {Number} [config.offsetY] set offset y
     * @param {Boolean} [config.draggable] makes the node draggable.  When stages are draggable, you can drag and drop
     *  the entire stage by dragging any portion of the stage
     * @param {Number} [config.dragDistance]
     * @param {Function} [config.dragBoundFunc]
   * @example
   * var stage = new Konva.Stage({
   *   width: 500,
   *   height: 800,
   *   container: 'containerId' // or "#containerId" or ".containerClass"
   * });
   */
  Konva.Stage = function(config) {
    this.___init(config);
  };

  Konva.Util.addMethods(Konva.Stage, {
    ___init: function(config) {
      this.nodeType = STAGE;
      // call super constructor
      Konva.Container.call(this, config);
      this._id = Konva.idCounter++;
      this._buildDOM();
      this._bindContentEvents();
      this._enableNestedTransforms = false;
      Konva.stages.push(this);
    },
    _validateAdd: function(child) {
      if (child.getType() !== 'Layer') {
        Konva.Util.throw('You may only add layers to the stage.');
      }
    },
    /**
     * set container dom element which contains the stage wrapper div element
     * @method
     * @memberof Konva.Stage.prototype
     * @param {DomElement} container can pass in a dom element or id string
     */
    setContainer: function(container) {
      if (typeof container === STRING) {
        if (container.charAt(0) === '.') {
          var className = container.slice(1);
          container = Konva.document.getElementsByClassName(className)[0];
        } else {
          var id;
          if (container.charAt(0) !== '#') {
            id = container;
          } else {
            id = container.slice(1);
          }
          container = Konva.document.getElementById(id);
        }
        if (!container) {
          throw 'Can not find container in document with id ' + id;
        }
      }
      this._setAttr(CONTAINER, container);
      return this;
    },
    shouldDrawHit: function() {
      return true;
    },
    draw: function() {
      Konva.Node.prototype.draw.call(this);
      return this;
    },
    /**
     * draw layer scene graphs
     * @name draw
     * @method
     * @memberof Konva.Stage.prototype
     */

    /**
     * draw layer hit graphs
     * @name drawHit
     * @method
     * @memberof Konva.Stage.prototype
     */

    /**
     * set height
     * @method
     * @memberof Konva.Stage.prototype
     * @param {Number} height
     */
    setHeight: function(height) {
      Konva.Node.prototype.setHeight.call(this, height);
      this._resizeDOM();
      return this;
    },
    /**
     * set width
     * @method
     * @memberof Konva.Stage.prototype
     * @param {Number} width
     */
    setWidth: function(width) {
      Konva.Node.prototype.setWidth.call(this, width);
      this._resizeDOM();
      return this;
    },
    /**
     * clear all layers
     * @method
     * @memberof Konva.Stage.prototype
     */
    clear: function() {
      var layers = this.children,
        len = layers.length,
        n;

      for (n = 0; n < len; n++) {
        layers[n].clear();
      }
      return this;
    },
    clone: function(obj) {
      if (!obj) {
        obj = {};
      }
      obj.container = Konva.document.createElement(DIV);
      return Konva.Container.prototype.clone.call(this, obj);
    },
    /**
     * destroy stage
     * @method
     * @memberof Konva.Stage.prototype
     */
    destroy: function() {
      var content = this.content;
      Konva.Container.prototype.destroy.call(this);

      if (content && Konva.Util._isInDocument(content)) {
        this.getContainer().removeChild(content);
      }
      var index = Konva.stages.indexOf(this);
      if (index > -1) {
        Konva.stages.splice(index, 1);
      }
      return this;
    },
    /**
     * get pointer position which can be a touch position or mouse position
     * @method
     * @memberof Konva.Stage.prototype
     * @returns {Object}
     */
    getPointerPosition: function() {
      return this.pointerPos;
    },
    getStage: function() {
      return this;
    },
    /**
     * get stage content div element which has the
     *  the class name "konvajs-content"
     * @method
     * @memberof Konva.Stage.prototype
     */
    getContent: function() {
      return this.content;
    },
    _toKonvaCanvas: function(config) {
      config = config || {};

      var x = config.x || 0,
        y = config.y || 0,
        canvas = new Konva.SceneCanvas({
          width: config.width || this.getWidth(),
          height: config.height || this.getHeight(),
          pixelRatio: config.pixelRatio || 1
        }),
        _context = canvas.getContext()._context,
        layers = this.children;

      if (x || y) {
        _context.translate(-1 * x, -1 * y);
      }

      layers.each(function(layer) {
        if (!layer.isVisible()) {
          return;
        }
        var layerCanvas = layer._toKonvaCanvas(config);
        _context.drawImage(
          layerCanvas._canvas,
          x,
          y,
          layerCanvas.getWidth() / layerCanvas.getPixelRatio(),
          layerCanvas.getHeight() / layerCanvas.getPixelRatio()
        );
      });
      return canvas;
    },
    /**
     * converts stage into an image.
     * @method
     * @memberof Konva.Stage.prototype
     * @param {Object} config
     * @param {Function} config.callback function executed when the composite has completed
     * @param {String} [config.mimeType] can be "image/png" or "image/jpeg".
     *  "image/png" is the default
     * @param {Number} [config.x] x position of canvas section
     * @param {Number} [config.y] y position of canvas section
     * @param {Number} [config.width] width of canvas section
     * @param {Number} [config.height] height of canvas section
     * @param {Number} [config.quality] jpeg quality.  If using an "image/jpeg" mimeType,
     *  you can specify the quality from 0 to 1, where 0 is very poor quality and 1
     *  is very high quality
     */
    toImage: function(config) {
      var cb = config.callback;

      config.callback = function(dataUrl) {
        Konva.Util._getImage(dataUrl, function(img) {
          cb(img);
        });
      };
      this.toDataURL(config);
    },
    /**
     * get visible intersection shape. This is the preferred
     *  method for determining if a point intersects a shape or not
     * @method
     * @memberof Konva.Stage.prototype
     * @param {Object} pos
     * @param {Number} pos.x
     * @param {Number} pos.y
     * @param {String} [selector]
     * @returns {Konva.Node}
     * @example
     * var shape = stage.getIntersection({x: 50, y: 50});
     * // or if you interested in shape parent:
     * var group = stage.getIntersection({x: 50, y: 50}, 'Group');
     */
    getIntersection: function(pos, selector) {
      var layers = this.getChildren(),
        len = layers.length,
        end = len - 1,
        n,
        shape;

      for (n = end; n >= 0; n--) {
        shape = layers[n].getIntersection(pos, selector);
        if (shape) {
          return shape;
        }
      }

      return null;
    },
    _resizeDOM: function() {
      if (this.content) {
        var width = this.getWidth(),
          height = this.getHeight(),
          layers = this.getChildren(),
          len = layers.length,
          n,
          layer;

        // set content dimensions
        this.content.style.width = width + PX;
        this.content.style.height = height + PX;

        this.bufferCanvas.setSize(width, height);
        this.bufferHitCanvas.setSize(width, height);

        // set layer dimensions
        for (n = 0; n < len; n++) {
          layer = layers[n];
          layer.setSize(width, height);
          layer.draw();
        }
      }
    },
    /**
     * add layer or layers to stage
     * @method
     * @memberof Konva.Stage.prototype
     * @param {...Konva.Layer} layer
     * @example
     * stage.add(layer1, layer2, layer3);
     */
    add: function(layer) {
      if (arguments.length > 1) {
        for (var i = 0; i < arguments.length; i++) {
          this.add(arguments[i]);
        }
        return this;
      }
      Konva.Container.prototype.add.call(this, layer);
      layer._setCanvasSize(this.width(), this.height());

      // draw layer and append canvas to container
      layer.draw();

      if (Konva.isBrowser) {
        this.content.appendChild(layer.canvas._canvas);
      }

      // chainable
      return this;
    },
    getParent: function() {
      return null;
    },
    getLayer: function() {
      return null;
    },
    /**
     * returns a {@link Konva.Collection} of layers
     * @method
     * @memberof Konva.Stage.prototype
     */
    getLayers: function() {
      return this.getChildren();
    },
    _bindContentEvents: function() {
      if (!Konva.isBrowser) {
        return;
      }
      for (var n = 0; n < eventsLength; n++) {
        addEvent(this, EVENTS[n]);
      }
    },
    _mouseover: function(evt) {
      if (!Konva.UA.mobile) {
        this._setPointerPosition(evt);
        this._fire(CONTENT_MOUSEOVER, { evt: evt });
      }
    },
    _mouseout: function(evt) {
      if (!Konva.UA.mobile) {
        this._setPointerPosition(evt);
        var targetShape = this.targetShape;

        if (targetShape && !Konva.isDragging()) {
          targetShape._fireAndBubble(MOUSEOUT, { evt: evt });
          targetShape._fireAndBubble(MOUSELEAVE, { evt: evt });
          this.targetShape = null;
        }
        this.pointerPos = undefined;

        this._fire(CONTENT_MOUSEOUT, { evt: evt });
      }
    },
    _mousemove: function(evt) {
      // workaround for mobile IE to force touch event when unhandled pointer event elevates into a mouse event
      if (Konva.UA.ieMobile) {
        return this._touchmove(evt);
      }
      // workaround fake mousemove event in chrome browser https://code.google.com/p/chromium/issues/detail?id=161464
      if (
        (typeof evt.movementX !== 'undefined' ||
          typeof evt.movementY !== 'undefined') &&
        evt.movementY === 0 &&
        evt.movementX === 0
      ) {
        return null;
      }
      if (Konva.UA.mobile) {
        return null;
      }
      this._setPointerPosition(evt);
      var shape;

      if (!Konva.isDragging()) {
        shape = this.getIntersection(this.getPointerPosition());
        if (shape && shape.isListening()) {
          if (
            !Konva.isDragging() &&
            (!this.targetShape || this.targetShape._id !== shape._id)
          ) {
            if (this.targetShape) {
              this.targetShape._fireAndBubble(MOUSEOUT, { evt: evt }, shape);
              this.targetShape._fireAndBubble(MOUSELEAVE, { evt: evt }, shape);
            }
            shape._fireAndBubble(MOUSEOVER, { evt: evt }, this.targetShape);
            shape._fireAndBubble(MOUSEENTER, { evt: evt }, this.targetShape);
            this.targetShape = shape;
          } else {
            shape._fireAndBubble(MOUSEMOVE, { evt: evt });
          }
        } else {
          /*
                 * if no shape was detected, clear target shape and try
                 * to run mouseout from previous target shape
                 */
          if (this.targetShape && !Konva.isDragging()) {
            this.targetShape._fireAndBubble(MOUSEOUT, { evt: evt });
            this.targetShape._fireAndBubble(MOUSELEAVE, { evt: evt });
            this.targetShape = null;
          }
          this._fire(MOUSEMOVE, {
            evt: evt,
            target: this,
            currentTarget: this
          });
        }

        // content event
        this._fire(CONTENT_MOUSEMOVE, { evt: evt });
      }

      // always call preventDefault for desktop events because some browsers
      // try to drag and drop the canvas element
      if (evt.cancelable) {
        evt.preventDefault();
      }
    },
    _mousedown: function(evt) {
      // workaround for mobile IE to force touch event when unhandled pointer event elevates into a mouse event
      if (Konva.UA.ieMobile) {
        return this._touchstart(evt);
      }
      if (!Konva.UA.mobile) {
        this._setPointerPosition(evt);
        var shape = this.getIntersection(this.getPointerPosition());

        Konva.listenClickTap = true;

        if (shape && shape.isListening()) {
          this.clickStartShape = shape;
          shape._fireAndBubble(MOUSEDOWN, { evt: evt });
        } else {
          this._fire(MOUSEDOWN, {
            evt: evt,
            target: this,
            currentTarget: this
          });
        }

        // content event
        this._fire(CONTENT_MOUSEDOWN, { evt: evt });
      }

      // always call preventDefault for desktop events because some browsers
      // try to drag and drop the canvas element
      // TODO: if we preventDefault() it will cancel event detection outside of window inside iframe
      // but we need it for better drag&drop
      // can we disable native drag&drop somehow differently?
      // if (evt.cancelable) {
      // evt.preventDefault();
      // }
    },
    _mouseup: function(evt) {
      // workaround for mobile IE to force touch event when unhandled pointer event elevates into a mouse event
      if (Konva.UA.ieMobile) {
        return this._touchend(evt);
      }
      if (!Konva.UA.mobile) {
        this._setPointerPosition(evt);
        var shape = this.getIntersection(this.getPointerPosition()),
          clickStartShape = this.clickStartShape,
          clickEndShape = this.clickEndShape,
          fireDblClick = false,
          dd = Konva.DD;

        if (Konva.inDblClickWindow) {
          fireDblClick = true;
          clearTimeout(this.dblTimeout);
          // Konva.inDblClickWindow = false;
        } else if (!dd || !dd.justDragged) {
          // don't set inDblClickWindow after dragging
          Konva.inDblClickWindow = true;
          clearTimeout(this.dblTimeout);
        } else if (dd) {
          dd.justDragged = false;
        }

        this.dblTimeout = setTimeout(function() {
          Konva.inDblClickWindow = false;
        }, Konva.dblClickWindow);

        if (shape && shape.isListening()) {
          this.clickEndShape = shape;
          shape._fireAndBubble(MOUSEUP, { evt: evt });

          // detect if click or double click occurred
          if (
            Konva.listenClickTap &&
            clickStartShape &&
            clickStartShape._id === shape._id
          ) {
            shape._fireAndBubble(CLICK, { evt: evt });

            if (
              fireDblClick &&
              clickEndShape &&
              clickEndShape._id === shape._id
            ) {
              shape._fireAndBubble(DBL_CLICK, { evt: evt });
            }
          }
        } else {
          this._fire(MOUSEUP, { evt: evt, target: this, currentTarget: this });
          if (Konva.listenClickTap) {
            this._fire(CLICK, { evt: evt, target: this, currentTarget: this });
          }

          if (fireDblClick) {
            this._fire(DBL_CLICK, {
              evt: evt,
              target: this,
              currentTarget: this
            });
          }
        }
        // content events
        this._fire(CONTENT_MOUSEUP, { evt: evt });
        if (Konva.listenClickTap) {
          this._fire(CONTENT_CLICK, { evt: evt });
          if (fireDblClick) {
            this._fire(CONTENT_DBL_CLICK, { evt: evt });
          }
        }

        Konva.listenClickTap = false;
      }

      // always call preventDefault for desktop events because some browsers
      // try to drag and drop the canvas element
      if (evt.cancelable) {
        evt.preventDefault();
      }
    },
    _contextmenu: function(evt) {
      this._setPointerPosition(evt);
      var shape = this.getIntersection(this.getPointerPosition());

      if (shape && shape.isListening()) {
        shape._fireAndBubble(CONTEXTMENU, { evt: evt });
      } else {
        this._fire(CONTEXTMENU, {
          evt: evt,
          target: this,
          currentTarget: this
        });
      }
      this._fire(CONTENT_CONTEXTMENU, { evt: evt });
    },
    _touchstart: function(evt) {
      this._setPointerPosition(evt);
      var shape = this.getIntersection(this.getPointerPosition());

      Konva.listenClickTap = true;

      if (shape && shape.isListening()) {
        this.tapStartShape = shape;
        shape._fireAndBubble(TOUCHSTART, { evt: evt });

        // only call preventDefault if the shape is listening for events
        if (shape.isListening() && shape.preventDefault() && evt.cancelable) {
          evt.preventDefault();
        }
      } else {
        this._fire(TOUCHSTART, {
          evt: evt,
          target: this,
          currentTarget: this
        });
      }
      // content event
      this._fire(CONTENT_TOUCHSTART, { evt: evt });
    },
    _touchend: function(evt) {
      this._setPointerPosition(evt);
      var shape = this.getIntersection(this.getPointerPosition()),
        fireDblClick = false;

      if (Konva.inDblClickWindow) {
        fireDblClick = true;
        clearTimeout(this.dblTimeout);
        // Konva.inDblClickWindow = false;
      } else {
        Konva.inDblClickWindow = true;
        clearTimeout(this.dblTimeout);
      }

      this.dblTimeout = setTimeout(function() {
        Konva.inDblClickWindow = false;
      }, Konva.dblClickWindow);

      if (shape && shape.isListening()) {
        shape._fireAndBubble(TOUCHEND, { evt: evt });

        // detect if tap or double tap occurred
        if (
          Konva.listenClickTap &&
          this.tapStartShape &&
          shape._id === this.tapStartShape._id
        ) {
          shape._fireAndBubble(TAP, { evt: evt });

          if (fireDblClick) {
            shape._fireAndBubble(DBL_TAP, { evt: evt });
          }
        }
        // only call preventDefault if the shape is listening for events
        if (shape.isListening() && shape.preventDefault() && evt.cancelable) {
          evt.preventDefault();
        }
      } else {
        this._fire(TOUCHEND, { evt: evt, target: this, currentTarget: this });
        if (Konva.listenClickTap) {
          this._fire(TAP, { evt: evt, target: this, currentTarget: this });
        }
        if (fireDblClick) {
          this._fire(DBL_TAP, {
            evt: evt,
            target: this,
            currentTarget: this
          });
        }
      }
      // content events
      this._fire(CONTENT_TOUCHEND, { evt: evt });
      if (Konva.listenClickTap) {
        this._fire(CONTENT_TAP, { evt: evt });
        if (fireDblClick) {
          this._fire(CONTENT_DBL_TAP, { evt: evt });
        }
      }

      Konva.listenClickTap = false;
    },
    _touchmove: function(evt) {
      this._setPointerPosition(evt);
      var dd = Konva.DD,
        shape;
      if (!Konva.isDragging()) {
        shape = this.getIntersection(this.getPointerPosition());
        if (shape && shape.isListening()) {
          shape._fireAndBubble(TOUCHMOVE, { evt: evt });
          // only call preventDefault if the shape is listening for events
          if (shape.isListening() && shape.preventDefault() && evt.cancelable) {
            evt.preventDefault();
          }
        } else {
          this._fire(TOUCHMOVE, {
            evt: evt,
            target: this,
            currentTarget: this
          });
        }
        this._fire(CONTENT_TOUCHMOVE, { evt: evt });
      }
      if (dd) {
        if (
          Konva.isDragging() &&
          Konva.DD.node.preventDefault() &&
          evt.cancelable
        ) {
          evt.preventDefault();
        }
      }
    },
    _wheel: function(evt) {
      this._setPointerPosition(evt);
      var shape = this.getIntersection(this.getPointerPosition());

      if (shape && shape.isListening()) {
        shape._fireAndBubble(WHEEL, { evt: evt });
      } else {
        this._fire(WHEEL, {
          evt: evt,
          target: this,
          currentTarget: this
        });
      }
      this._fire(CONTENT_WHEEL, { evt: evt });
    },
    _setPointerPosition: function(evt) {
      var contentPosition = this._getContentPosition(),
        x = null,
        y = null;
      evt = evt ? evt : window.event;

      // touch events
      if (evt.touches !== undefined) {
        // currently, only handle one finger
        if (evt.touches.length > 0) {
          var touch = evt.touches[0];
          // get the information for finger #1
          x = touch.clientX - contentPosition.left;
          y = touch.clientY - contentPosition.top;
        }
      } else {
        // mouse events
        x = evt.clientX - contentPosition.left;
        y = evt.clientY - contentPosition.top;
      }
      if (x !== null && y !== null) {
        this.pointerPos = {
          x: x,
          y: y
        };
      }
    },
    _getContentPosition: function() {
      var rect = this.content.getBoundingClientRect
        ? this.content.getBoundingClientRect()
        : { top: 0, left: 0 };
      return {
        top: rect.top,
        left: rect.left
      };
    },
    _buildDOM: function() {
      // the buffer canvas pixel ratio must be 1 because it is used as an
      // intermediate canvas before copying the result onto a scene canvas.
      // not setting it to 1 will result in an over compensation
      this.bufferCanvas = new Konva.SceneCanvas();
      this.bufferHitCanvas = new Konva.HitCanvas({ pixelRatio: 1 });

      if (!Konva.isBrowser) {
        return;
      }
      var container = this.getContainer();
      if (!container) {
        throw 'Stage has no container. A container is required.';
      }
      // clear content inside container
      container.innerHTML = EMPTY_STRING;

      // content
      this.content = Konva.document.createElement(DIV);
      this.content.style.position = RELATIVE;
      this.content.style.userSelect = 'none';
      this.content.className = KONVA_CONTENT;

      this.content.setAttribute('role', 'presentation');

      container.appendChild(this.content);

      this._resizeDOM();
    },
    _onContent: function(typesStr, handler) {
      var types = typesStr.split(SPACE),
        len = types.length,
        n,
        baseEvent;

      for (n = 0; n < len; n++) {
        baseEvent = types[n];
        this.content.addEventListener(baseEvent, handler, false);
      }
    },
    // currently cache function is now working for stage, because stage has no its own canvas element
    // TODO: may be it is better to cache all children layers?
    cache: function() {
      Konva.Util.warn(
        'Cache function is not allowed for stage. You may use cache only for layers, groups and shapes.'
      );
    },
    clearCache: function() {}
  });
  Konva.Util.extend(Konva.Stage, Konva.Container);

  // add getters and setters
  Konva.Factory.addGetter(Konva.Stage, 'container');
  Konva.Factory.addOverloadedGetterSetter(Konva.Stage, 'container');

  /**
   * get container DOM element
   * @name container
   * @method
   * @memberof Konva.Stage.prototype
   * @returns {DomElement} container
   * @example
   * // get container
   * var container = stage.container();
   * // set container
   * var container = document.createElement('div');
   * body.appendChild(container);
   * stage.container(container);
   */
})();

(function(Konva) {
  'use strict';
  /**
   * BaseLayer constructor.
   * @constructor
   * @memberof Konva
   * @augments Konva.Container
   * @param {Object} config
   * @param {Boolean} [config.clearBeforeDraw] set this property to false if you don't want
   * to clear the canvas before each layer draw.  The default value is true.
   * @param {Number} [config.x]
     * @param {Number} [config.y]
     * @param {Number} [config.width]
     * @param {Number} [config.height]
     * @param {Boolean} [config.visible]
     * @param {Boolean} [config.listening] whether or not the node is listening for events
     * @param {String} [config.id] unique id
     * @param {String} [config.name] non-unique name
     * @param {Number} [config.opacity] determines node opacity.  Can be any number between 0 and 1
     * @param {Object} [config.scale] set scale
     * @param {Number} [config.scaleX] set scale x
     * @param {Number} [config.scaleY] set scale y
     * @param {Number} [config.rotation] rotation in degrees
     * @param {Object} [config.offset] offset from center point and rotation point
     * @param {Number} [config.offsetX] set offset x
     * @param {Number} [config.offsetY] set offset y
     * @param {Boolean} [config.draggable] makes the node draggable.  When stages are draggable, you can drag and drop
     *  the entire stage by dragging any portion of the stage
     * @param {Number} [config.dragDistance]
     * @param {Function} [config.dragBoundFunc]
   * * @param {Object} [config.clip] set clip
     * @param {Number} [config.clipX] set clip x
     * @param {Number} [config.clipY] set clip y
     * @param {Number} [config.clipWidth] set clip width
     * @param {Number} [config.clipHeight] set clip height
     * @param {Function} [config.clipFunc] set clip func

   */
  Konva.BaseLayer = function(config) {
    this.___init(config);
  };

  Konva.Util.addMethods(Konva.BaseLayer, {
    ___init: function(config) {
      this.nodeType = 'Layer';
      Konva.Container.call(this, config);
    },
    createPNGStream: function() {
      return this.canvas._canvas.createPNGStream();
    },
    /**
     * get layer canvas
     * @method
     * @memberof Konva.BaseLayer.prototype
     */
    getCanvas: function() {
      return this.canvas;
    },
    /**
     * get layer hit canvas
     * @method
     * @memberof Konva.BaseLayer.prototype
     */
    getHitCanvas: function() {
      return this.hitCanvas;
    },
    /**
     * get layer canvas context
     * @method
     * @memberof Konva.BaseLayer.prototype
     */
    getContext: function() {
      return this.getCanvas().getContext();
    },
    /**
     * clear scene and hit canvas contexts tied to the layer
     * @method
     * @memberof Konva.BaseLayer.prototype
     * @param {Object} [bounds]
     * @param {Number} [bounds.x]
     * @param {Number} [bounds.y]
     * @param {Number} [bounds.width]
     * @param {Number} [bounds.height]
     * @example
     * layer.clear();
     * layer.clear({
     *   x : 0,
     *   y : 0,
     *   width : 100,
     *   height : 100
     * });
     */
    clear: function(bounds) {
      this.getContext().clear(bounds);
      return this;
    },
    clearHitCache: function() {
      this._hitImageData = undefined;
    },
    // extend Node.prototype.setZIndex
    setZIndex: function(index) {
      Konva.Node.prototype.setZIndex.call(this, index);
      var stage = this.getStage();
      if (stage) {
        stage.content.removeChild(this.getCanvas()._canvas);

        if (index < stage.getChildren().length - 1) {
          stage.content.insertBefore(
            this.getCanvas()._canvas,
            stage.getChildren()[index + 1].getCanvas()._canvas
          );
        } else {
          stage.content.appendChild(this.getCanvas()._canvas);
        }
      }
      return this;
    },
    // extend Node.prototype.moveToTop
    moveToTop: function() {
      Konva.Node.prototype.moveToTop.call(this);
      var stage = this.getStage();
      if (stage) {
        stage.content.removeChild(this.getCanvas()._canvas);
        stage.content.appendChild(this.getCanvas()._canvas);
      }
      return this;
    },
    // extend Node.prototype.moveUp
    moveUp: function() {
      var moved = Konva.Node.prototype.moveUp.call(this);
      if (!moved) {
        return this;
      }
      var stage = this.getStage();
      if (!stage) {
        return this;
      }
      stage.content.removeChild(this.getCanvas()._canvas);

      if (this.index < stage.getChildren().length - 1) {
        stage.content.insertBefore(
          this.getCanvas()._canvas,
          stage.getChildren()[this.index + 1].getCanvas()._canvas
        );
      } else {
        stage.content.appendChild(this.getCanvas()._canvas);
      }
      return this;
    },
    // extend Node.prototype.moveDown
    moveDown: function() {
      if (Konva.Node.prototype.moveDown.call(this)) {
        var stage = this.getStage();
        if (stage) {
          var children = stage.getChildren();
          stage.content.removeChild(this.getCanvas()._canvas);
          stage.content.insertBefore(
            this.getCanvas()._canvas,
            children[this.index + 1].getCanvas()._canvas
          );
        }
      }
      return this;
    },
    // extend Node.prototype.moveToBottom
    moveToBottom: function() {
      if (Konva.Node.prototype.moveToBottom.call(this)) {
        var stage = this.getStage();
        if (stage) {
          var children = stage.getChildren();
          stage.content.removeChild(this.getCanvas()._canvas);
          stage.content.insertBefore(
            this.getCanvas()._canvas,
            children[1].getCanvas()._canvas
          );
        }
      }
      return this;
    },
    getLayer: function() {
      return this;
    },
    remove: function() {
      var _canvas = this.getCanvas()._canvas;

      Konva.Node.prototype.remove.call(this);

      if (_canvas && _canvas.parentNode && Konva.Util._isInDocument(_canvas)) {
        _canvas.parentNode.removeChild(_canvas);
      }
      return this;
    },
    getStage: function() {
      return this.parent;
    },
    setSize: function(width, height) {
      this.canvas.setSize(width, height);
      return this;
    },
    _toKonvaCanvas: function(config) {
      config = config || {};
      config.width = config.width || this.getWidth();
      config.height = config.height || this.getHeight();
      config.x = config.x !== undefined ? config.x : this.getX();
      config.y = config.y !== undefined ? config.y : this.getY();

      return Konva.Node.prototype._toKonvaCanvas.call(this, config);
    },
    /**
     * get/set width of layer.getter return width of stage. setter doing nothing.
     * if you want change width use `stage.width(value);`
     * @name width
     * @method
     * @memberof Konva.BaseLayer.prototype
     * @returns {Number}
     * @example
     * var width = layer.width();
     */
    getWidth: function() {
      if (this.parent) {
        return this.parent.getWidth();
      }
    },
    setWidth: function() {
      Konva.Util.warn(
        'Can not change width of layer. Use "stage.width(value)" function instead.'
      );
    },
    /**
     * get/set height of layer.getter return height of stage. setter doing nothing.
     * if you want change height use `stage.height(value);`
     * @name height
     * @method
     * @memberof Konva.BaseLayer.prototype
     * @returns {Number}
     * @example
     * var height = layer.height();
     */
    getHeight: function() {
      if (this.parent) {
        return this.parent.getHeight();
      }
    },
    setHeight: function() {
      Konva.Util.warn(
        'Can not change height of layer. Use "stage.height(value)" function instead.'
      );
    },
    // the apply transform method is handled by the Layer and FastLayer class
    // because it is up to the layer to decide if an absolute or relative transform
    // should be used
    _applyTransform: function(shape, context, top) {
      var m = shape.getAbsoluteTransform(top).getMatrix();
      context.transform(m[0], m[1], m[2], m[3], m[4], m[5]);
    }
  });
  Konva.Util.extend(Konva.BaseLayer, Konva.Container);

  // add getters and setters
  Konva.Factory.addGetterSetter(Konva.BaseLayer, 'clearBeforeDraw', true);
  /**
   * get/set clearBeforeDraw flag which determines if the layer is cleared or not
   *  before drawing
   * @name clearBeforeDraw
   * @method
   * @memberof Konva.BaseLayer.prototype
   * @param {Boolean} clearBeforeDraw
   * @returns {Boolean}
   * @example
   * // get clearBeforeDraw flag
   * var clearBeforeDraw = layer.clearBeforeDraw();
   *
   * // disable clear before draw
   * layer.clearBeforeDraw(false);
   *
   * // enable clear before draw
   * layer.clearBeforeDraw(true);
   */

  Konva.Collection.mapMethods(Konva.BaseLayer);
})(Konva);

(function() {
  'use strict';
  // constants
  var HASH = '#',
    BEFORE_DRAW = 'beforeDraw',
    DRAW = 'draw',
    /*
         * 2 - 3 - 4
         * |       |
         * 1 - 0   5
         *         |
         * 8 - 7 - 6
         */
    INTERSECTION_OFFSETS = [
      { x: 0, y: 0 }, // 0
      { x: -1, y: -1 }, // 2
      { x: 1, y: -1 }, // 4
      { x: 1, y: 1 }, // 6
      { x: -1, y: 1 } // 8
    ],
    INTERSECTION_OFFSETS_LEN = INTERSECTION_OFFSETS.length;

  /**
   * Layer constructor.  Layers are tied to their own canvas element and are used
   * to contain groups or shapes.
   * @constructor
   * @memberof Konva
   * @augments Konva.BaseLayer
   * @param {Object} config
   * @param {Boolean} [config.clearBeforeDraw] set this property to false if you don't want
   * to clear the canvas before each layer draw.  The default value is true.
   * @param {Number} [config.x]
     * @param {Number} [config.y]
     * @param {Number} [config.width]
     * @param {Number} [config.height]
     * @param {Boolean} [config.visible]
     * @param {Boolean} [config.listening] whether or not the node is listening for events
     * @param {String} [config.id] unique id
     * @param {String} [config.name] non-unique name
     * @param {Number} [config.opacity] determines node opacity.  Can be any number between 0 and 1
     * @param {Object} [config.scale] set scale
     * @param {Number} [config.scaleX] set scale x
     * @param {Number} [config.scaleY] set scale y
     * @param {Number} [config.rotation] rotation in degrees
     * @param {Object} [config.offset] offset from center point and rotation point
     * @param {Number} [config.offsetX] set offset x
     * @param {Number} [config.offsetY] set offset y
     * @param {Boolean} [config.draggable] makes the node draggable.  When stages are draggable, you can drag and drop
     *  the entire stage by dragging any portion of the stage
     * @param {Number} [config.dragDistance]
     * @param {Function} [config.dragBoundFunc]
   * * @param {Object} [config.clip] set clip
     * @param {Number} [config.clipX] set clip x
     * @param {Number} [config.clipY] set clip y
     * @param {Number} [config.clipWidth] set clip width
     * @param {Number} [config.clipHeight] set clip height
     * @param {Function} [config.clipFunc] set clip func

   * @example
   * var layer = new Konva.Layer();
   */
  Konva.Layer = function(config) {
    this.____init(config);
  };

  Konva.Util.addMethods(Konva.Layer, {
    ____init: function(config) {
      this.nodeType = 'Layer';
      this.canvas = new Konva.SceneCanvas();
      this.hitCanvas = new Konva.HitCanvas({
        pixelRatio: 1
      });
      // call super constructor
      Konva.BaseLayer.call(this, config);
    },
    _setCanvasSize: function(width, height) {
      this.canvas.setSize(width, height);
      this.hitCanvas.setSize(width, height);
    },
    _validateAdd: function(child) {
      var type = child.getType();
      if (type !== 'Group' && type !== 'Shape') {
        Konva.Util.throw('You may only add groups and shapes to a layer.');
      }
    },
    /**
     * get visible intersection shape. This is the preferred
     * method for determining if a point intersects a shape or not
     * also you may pass optional selector parametr to return ancestor of intersected shape
     * @method
     * @memberof Konva.Layer.prototype
     * @param {Object} pos
     * @param {Number} pos.x
     * @param {Number} pos.y
     * @param {String} [selector]
     * @returns {Konva.Node}
     * @example
     * var shape = layer.getIntersection({x: 50, y: 50});
     * // or if you interested in shape parent:
     * var group = layer.getIntersection({x: 50, y: 50}, 'Group');
     */
    getIntersection: function(pos, selector) {
      var obj, i, intersectionOffset, shape;

      if (!this.hitGraphEnabled() || !this.isVisible()) {
        return null;
      }
      // in some cases antialiased area may be bigger than 1px
      // it is possible if we will cache node, then scale it a lot
      // TODO: check { 0; 0 } point before loop, and remove it from INTERSECTION_OFFSETS.
      var spiralSearchDistance = 1;
      var continueSearch = false;
      while (true) {
        for (i = 0; i < INTERSECTION_OFFSETS_LEN; i++) {
          intersectionOffset = INTERSECTION_OFFSETS[i];
          obj = this._getIntersection({
            x: pos.x + intersectionOffset.x * spiralSearchDistance,
            y: pos.y + intersectionOffset.y * spiralSearchDistance
          });
          shape = obj.shape;
          if (shape && selector) {
            return shape.findAncestor(selector, true);
          } else if (shape) {
            return shape;
          }
          // we should continue search if we found antialiased pixel
          // that means our node somewhere very close
          continueSearch = !!obj.antialiased;
          // stop search if found empty pixel
          if (!obj.antialiased) {
            break;
          }
        }
        // if no shape, and no antialiased pixel, we should end searching
        if (continueSearch) {
          spiralSearchDistance += 1;
        } else {
          return null;
        }
      }
    },
    _getImageData: function(x, y) {
      var width = this.hitCanvas.width || 1,
        height = this.hitCanvas.height || 1,
        index = Math.round(y) * width + Math.round(x);

      if (!this._hitImageData) {
        this._hitImageData = this.hitCanvas.context.getImageData(
          0,
          0,
          width,
          height
        );
      }

      return [
        this._hitImageData.data[4 * index + 0], // Red
        this._hitImageData.data[4 * index + 1], // Green
        this._hitImageData.data[4 * index + 2], // Blue
        this._hitImageData.data[4 * index + 3] // Alpha
      ];
    },
    _getIntersection: function(pos) {
      var ratio = this.hitCanvas.pixelRatio;
      var p = this.hitCanvas.context.getImageData(
          Math.round(pos.x * ratio),
          Math.round(pos.y * ratio),
          1,
          1
        ).data,
        p3 = p[3],
        colorKey,
        shape;
      // fully opaque pixel
      if (p3 === 255) {
        colorKey = Konva.Util._rgbToHex(p[0], p[1], p[2]);
        shape = Konva.shapes[HASH + colorKey];
        if (shape) {
          return {
            shape: shape
          };
        }
        return {
          antialiased: true
        };
      } else if (p3 > 0) {
        // antialiased pixel
        return {
          antialiased: true
        };
      }
      // empty pixel
      return {};
    },
    drawScene: function(can, top) {
      var layer = this.getLayer(),
        canvas = can || (layer && layer.getCanvas());

      this._fire(BEFORE_DRAW, {
        node: this
      });

      if (this.getClearBeforeDraw()) {
        canvas.getContext().clear();
      }

      Konva.Container.prototype.drawScene.call(this, canvas, top);

      this._fire(DRAW, {
        node: this
      });

      return this;
    },
    drawHit: function(can, top) {
      var layer = this.getLayer(),
        canvas = can || (layer && layer.hitCanvas);

      if (layer && layer.getClearBeforeDraw()) {
        layer
          .getHitCanvas()
          .getContext()
          .clear();
      }

      Konva.Container.prototype.drawHit.call(this, canvas, top);
      this.imageData = null; // Clear imageData cache
      return this;
    },
    clear: function(bounds) {
      Konva.BaseLayer.prototype.clear.call(this, bounds);
      this.getHitCanvas()
        .getContext()
        .clear(bounds);
      this.imageData = null; // Clear getImageData cache
      return this;
    },
    // extend Node.prototype.setVisible
    setVisible: function(visible) {
      Konva.Node.prototype.setVisible.call(this, visible);
      if (visible) {
        this.getCanvas()._canvas.style.display = 'block';
        this.hitCanvas._canvas.style.display = 'block';
      } else {
        this.getCanvas()._canvas.style.display = 'none';
        this.hitCanvas._canvas.style.display = 'none';
      }
      return this;
    },
    /**
     * enable hit graph
     * @name enableHitGraph
     * @method
     * @memberof Konva.Layer.prototype
     * @returns {Layer}
     */
    enableHitGraph: function() {
      this.setHitGraphEnabled(true);
      return this;
    },
    /**
     * disable hit graph
     * @name disableHitGraph
     * @method
     * @memberof Konva.Layer.prototype
     * @returns {Layer}
     */
    disableHitGraph: function() {
      this.setHitGraphEnabled(false);
      return this;
    },
    setSize: function(width, height) {
      Konva.BaseLayer.prototype.setSize.call(this, width, height);
      this.hitCanvas.setSize(width, height);
      return this;
    }
  });
  Konva.Util.extend(Konva.Layer, Konva.BaseLayer);

  Konva.Factory.addGetterSetter(Konva.Layer, 'hitGraphEnabled', true);
  /**
   * get/set hitGraphEnabled flag.  Disabling the hit graph will greatly increase
   *  draw performance because the hit graph will not be redrawn each time the layer is
   *  drawn.  This, however, also disables mouse/touch event detection
   * @name hitGraphEnabled
   * @method
   * @memberof Konva.Layer.prototype
   * @param {Boolean} enabled
   * @returns {Boolean}
   * @example
   * // get hitGraphEnabled flag
   * var hitGraphEnabled = layer.hitGraphEnabled();
   *
   * // disable hit graph
   * layer.hitGraphEnabled(false);
   *
   * // enable hit graph
   * layer.hitGraphEnabled(true);
   */
  Konva.Collection.mapMethods(Konva.Layer);
})();

(function() {
  'use strict';
  /**
   * FastLayer constructor. Layers are tied to their own canvas element and are used
   * to contain shapes only.  If you don't need node nesting, mouse and touch interactions,
   * or event pub/sub, you should use FastLayer instead of Layer to create your layers.
   * It renders about 2x faster than normal layers.
   * @constructor
   * @memberof Konva
   * @augments Konva.BaseLayer
   * @param {Object} config
   * @param {Boolean} [config.clearBeforeDraw] set this property to false if you don't want
   * to clear the canvas before each layer draw.  The default value is true.
   * @param {Boolean} [config.visible]
   * @param {String} [config.id] unique id
   * @param {String} [config.name] non-unique name
   * @param {Number} [config.opacity] determines node opacity.  Can be any number between 0 and 1
   * * @param {Object} [config.clip] set clip
     * @param {Number} [config.clipX] set clip x
     * @param {Number} [config.clipY] set clip y
     * @param {Number} [config.clipWidth] set clip width
     * @param {Number} [config.clipHeight] set clip height
     * @param {Function} [config.clipFunc] set clip func

   * @example
   * var layer = new Konva.FastLayer();
   */
  Konva.FastLayer = function(config) {
    this.____init(config);
  };

  Konva.Util.addMethods(Konva.FastLayer, {
    ____init: function(config) {
      this.nodeType = 'Layer';
      this.canvas = new Konva.SceneCanvas();
      // call super constructor
      Konva.BaseLayer.call(this, config);
    },
    _validateAdd: function(child) {
      var type = child.getType();
      if (type !== 'Shape') {
        Konva.Util.throw('You may only add shapes to a fast layer.');
      }
    },
    _setCanvasSize: function(width, height) {
      this.canvas.setSize(width, height);
    },
    hitGraphEnabled: function() {
      return false;
    },
    getIntersection: function() {
      return null;
    },
    drawScene: function(can) {
      var layer = this.getLayer(),
        canvas = can || (layer && layer.getCanvas());

      if (this.getClearBeforeDraw()) {
        canvas.getContext().clear();
      }

      Konva.Container.prototype.drawScene.call(this, canvas);

      return this;
    },
    draw: function() {
      this.drawScene();
      return this;
    },
    // extend Node.prototype.setVisible
    setVisible: function(visible) {
      Konva.Node.prototype.setVisible.call(this, visible);
      if (visible) {
        this.getCanvas()._canvas.style.display = 'block';
      } else {
        this.getCanvas()._canvas.style.display = 'none';
      }
      return this;
    }
  });
  Konva.Util.extend(Konva.FastLayer, Konva.BaseLayer);

  Konva.Collection.mapMethods(Konva.FastLayer);
})();

(function() {
  'use strict';
  /**
   * Group constructor.  Groups are used to contain shapes or other groups.
   * @constructor
   * @memberof Konva
   * @augments Konva.Container
   * @param {Object} config
   * @param {Number} [config.x]
     * @param {Number} [config.y]
     * @param {Number} [config.width]
     * @param {Number} [config.height]
     * @param {Boolean} [config.visible]
     * @param {Boolean} [config.listening] whether or not the node is listening for events
     * @param {String} [config.id] unique id
     * @param {String} [config.name] non-unique name
     * @param {Number} [config.opacity] determines node opacity.  Can be any number between 0 and 1
     * @param {Object} [config.scale] set scale
     * @param {Number} [config.scaleX] set scale x
     * @param {Number} [config.scaleY] set scale y
     * @param {Number} [config.rotation] rotation in degrees
     * @param {Object} [config.offset] offset from center point and rotation point
     * @param {Number} [config.offsetX] set offset x
     * @param {Number} [config.offsetY] set offset y
     * @param {Boolean} [config.draggable] makes the node draggable.  When stages are draggable, you can drag and drop
     *  the entire stage by dragging any portion of the stage
     * @param {Number} [config.dragDistance]
     * @param {Function} [config.dragBoundFunc]
   * * @param {Object} [config.clip] set clip
     * @param {Number} [config.clipX] set clip x
     * @param {Number} [config.clipY] set clip y
     * @param {Number} [config.clipWidth] set clip width
     * @param {Number} [config.clipHeight] set clip height
     * @param {Function} [config.clipFunc] set clip func

   * @example
   * var group = new Konva.Group();
   */
  Konva.Group = function(config) {
    this.___init(config);
  };

  Konva.Util.addMethods(Konva.Group, {
    ___init: function(config) {
      this.nodeType = 'Group';
      // call super constructor
      Konva.Container.call(this, config);
    },
    _validateAdd: function(child) {
      var type = child.getType();
      if (type !== 'Group' && type !== 'Shape') {
        Konva.Util.throw('You may only add groups and shapes to groups.');
      }
    }
  });
  Konva.Util.extend(Konva.Group, Konva.Container);

  Konva.Collection.mapMethods(Konva.Group);
})();

(function(Konva) {
  'use strict';
  var now = (function() {
    if (Konva.global.performance && Konva.global.performance.now) {
      return function() {
        return Konva.global.performance.now();
      };
    }

    return function() {
      return new Date().getTime();
    };
  })();

  function FRAF(callback) {
    setTimeout(callback, 1000 / 60);
  }

  var RAF = (function() {
    return (
      Konva.global.requestAnimationFrame ||
      Konva.global.webkitRequestAnimationFrame ||
      Konva.global.mozRequestAnimationFrame ||
      Konva.global.oRequestAnimationFrame ||
      Konva.global.msRequestAnimationFrame ||
      FRAF
    );
  })();

  function requestAnimFrame() {
    return RAF.apply(Konva.global, arguments);
  }

  /**
   * Animation constructor.  A stage is used to contain multiple layers and handle
   * @constructor
   * @memberof Konva
   * @param {Function} func function executed on each animation frame.  The function is passed a frame object, which contains
   *  timeDiff, lastTime, time, and frameRate properties.  The timeDiff property is the number of milliseconds that have passed
   *  since the last animation frame.  The lastTime property is time in milliseconds that elapsed from the moment the animation started
   *  to the last animation frame.  The time property is the time in milliseconds that ellapsed from the moment the animation started
   *  to the current animation frame.  The frameRate property is the current frame rate in frames / second. Return false from function,
   *  if you don't need to redraw layer/layers on some frames.
   * @param {Konva.Layer|Array} [layers] layer(s) to be redrawn on each animation frame. Can be a layer, an array of layers, or null.
   *  Not specifying a node will result in no redraw.
   * @example
   * // move a node to the right at 50 pixels / second
   * var velocity = 50;
   *
   * var anim = new Konva.Animation(function(frame) {
   *   var dist = velocity * (frame.timeDiff / 1000);
   *   node.move(dist, 0);
   * }, layer);
   *
   * anim.start();
   */
  Konva.Animation = function(func, layers) {
    var Anim = Konva.Animation;
    this.func = func;
    this.setLayers(layers);
    this.id = Anim.animIdCounter++;
    this.frame = {
      time: 0,
      timeDiff: 0,
      lastTime: now()
    };
  };
  /*
     * Animation methods
     */
  Konva.Animation.prototype = {
    /**
     * set layers to be redrawn on each animation frame
     * @method
     * @memberof Konva.Animation.prototype
     * @param {Konva.Layer|Array} [layers] layer(s) to be redrawn.&nbsp; Can be a layer, an array of layers, or null.  Not specifying a node will result in no redraw.
     * @return {Konva.Animation} this
     */
    setLayers: function(layers) {
      var lays = [];
      // if passing in no layers
      if (!layers) {
        lays = [];
      } else if (layers.length > 0) {
        // if passing in an array of Layers
        // NOTE: layers could be an array or Konva.Collection.  for simplicity, I'm just inspecting
        // the length property to check for both cases
        lays = layers;
      } else {
        // if passing in a Layer
        lays = [layers];
      }

      this.layers = lays;
      return this;
    },
    /**
     * get layers
     * @method
     * @memberof Konva.Animation.prototype
     * @return {Array} Array of Konva.Layer
     */
    getLayers: function() {
      return this.layers;
    },
    /**
     * add layer.  Returns true if the layer was added, and false if it was not
     * @method
     * @memberof Konva.Animation.prototype
     * @param {Konva.Layer} layer to add
     * @return {Bool} true if layer is added to animation, otherwise false
     */
    addLayer: function(layer) {
      var layers = this.layers,
        len = layers.length,
        n;

      // don't add the layer if it already exists
      for (n = 0; n < len; n++) {
        if (layers[n]._id === layer._id) {
          return false;
        }
      }

      this.layers.push(layer);
      return true;
    },
    /**
     * determine if animation is running or not.  returns true or false
     * @method
     * @memberof Konva.Animation.prototype
     * @return {Bool} is animation running?
     */
    isRunning: function() {
      var a = Konva.Animation,
        animations = a.animations,
        len = animations.length,
        n;

      for (n = 0; n < len; n++) {
        if (animations[n].id === this.id) {
          return true;
        }
      }
      return false;
    },
    /**
     * start animation
     * @method
     * @memberof Konva.Animation.prototype
     * @return {Konva.Animation} this
     */
    start: function() {
      var Anim = Konva.Animation;
      this.stop();
      this.frame.timeDiff = 0;
      this.frame.lastTime = now();
      Anim._addAnimation(this);
      return this;
    },
    /**
     * stop animation
     * @method
     * @memberof Konva.Animation.prototype
     * @return {Konva.Animation} this
     */
    stop: function() {
      Konva.Animation._removeAnimation(this);
      return this;
    },
    _updateFrameObject: function(time) {
      this.frame.timeDiff = time - this.frame.lastTime;
      this.frame.lastTime = time;
      this.frame.time += this.frame.timeDiff;
      this.frame.frameRate = 1000 / this.frame.timeDiff;
    }
  };
  Konva.Animation.animations = [];
  Konva.Animation.animIdCounter = 0;
  Konva.Animation.animRunning = false;

  Konva.Animation._addAnimation = function(anim) {
    this.animations.push(anim);
    this._handleAnimation();
  };
  Konva.Animation._removeAnimation = function(anim) {
    var id = anim.id,
      animations = this.animations,
      len = animations.length,
      n;

    for (n = 0; n < len; n++) {
      if (animations[n].id === id) {
        this.animations.splice(n, 1);
        break;
      }
    }
  };

  Konva.Animation._runFrames = function() {
    var layerHash = {},
      animations = this.animations,
      anim,
      layers,
      func,
      n,
      i,
      layersLen,
      layer,
      key,
      needRedraw;
    /*
         * loop through all animations and execute animation
         *  function.  if the animation object has specified node,
         *  we can add the node to the nodes hash to eliminate
         *  drawing the same node multiple times.  The node property
         *  can be the stage itself or a layer
         */
    /*
         * WARNING: don't cache animations.length because it could change while
         * the for loop is running, causing a JS error
         */

    for (n = 0; n < animations.length; n++) {
      anim = animations[n];
      layers = anim.layers;
      func = anim.func;

      anim._updateFrameObject(now());
      layersLen = layers.length;

      // if animation object has a function, execute it
      if (func) {
        // allow anim bypassing drawing
        needRedraw = func.call(anim, anim.frame) !== false;
      } else {
        needRedraw = true;
      }
      if (!needRedraw) {
        continue;
      }
      for (i = 0; i < layersLen; i++) {
        layer = layers[i];

        if (layer._id !== undefined) {
          layerHash[layer._id] = layer;
        }
      }
    }

    for (key in layerHash) {
      if (!layerHash.hasOwnProperty(key)) {
        continue;
      }
      layerHash[key].draw();
    }
  };
  Konva.Animation._animationLoop = function() {
    var Anim = Konva.Animation;
    if (Anim.animations.length) {
      Anim._runFrames();
      requestAnimFrame(Anim._animationLoop);
    } else {
      Anim.animRunning = false;
    }
  };
  Konva.Animation._handleAnimation = function() {
    if (!this.animRunning) {
      this.animRunning = true;
      requestAnimFrame(this._animationLoop);
    }
  };

  /**
   * batch draw. this function will not do immediate draw
   * but it will schedule drawing to next tick (requestAnimFrame)
   * @method
   * @return {Konva.Layer} this
   * @memberof Konva.Base.prototype
   */
  Konva.BaseLayer.prototype.batchDraw = function() {
    var that = this,
      Anim = Konva.Animation;

    if (!this.batchAnim) {
      this.batchAnim = new Anim(function() {
        // stop animation after first tick
        that.batchAnim.stop();
      }, this);
    }

    if (!this.batchAnim.isRunning()) {
      this.batchAnim.start();
    }
    return this;
  };

  /**
   * batch draw
   * @method
   * @return {Konva.Stage} this
   * @memberof Konva.Stage.prototype
   */
  Konva.Stage.prototype.batchDraw = function() {
    this.getChildren().each(function(layer) {
      layer.batchDraw();
    });
    return this;
  };
})(Konva);

(function() {
  'use strict';
  var blacklist = {
      node: 1,
      duration: 1,
      easing: 1,
      onFinish: 1,
      yoyo: 1
    },
    PAUSED = 1,
    PLAYING = 2,
    REVERSING = 3,
    idCounter = 0,
    colorAttrs = ['fill', 'stroke', 'shadowColor'];

  var Tween = function(prop, propFunc, func, begin, finish, duration, yoyo) {
    this.prop = prop;
    this.propFunc = propFunc;
    this.begin = begin;
    this._pos = begin;
    this.duration = duration;
    this._change = 0;
    this.prevPos = 0;
    this.yoyo = yoyo;
    this._time = 0;
    this._position = 0;
    this._startTime = 0;
    this._finish = 0;
    this.func = func;
    this._change = finish - this.begin;
    this.pause();
  };
  /*
     * Tween methods
     */
  Tween.prototype = {
    fire: function(str) {
      var handler = this[str];
      if (handler) {
        handler();
      }
    },
    setTime: function(t) {
      if (t > this.duration) {
        if (this.yoyo) {
          this._time = this.duration;
          this.reverse();
        } else {
          this.finish();
        }
      } else if (t < 0) {
        if (this.yoyo) {
          this._time = 0;
          this.play();
        } else {
          this.reset();
        }
      } else {
        this._time = t;
        this.update();
      }
    },
    getTime: function() {
      return this._time;
    },
    setPosition: function(p) {
      this.prevPos = this._pos;
      this.propFunc(p);
      this._pos = p;
    },
    getPosition: function(t) {
      if (t === undefined) {
        t = this._time;
      }
      return this.func(t, this.begin, this._change, this.duration);
    },
    play: function() {
      this.state = PLAYING;
      this._startTime = this.getTimer() - this._time;
      this.onEnterFrame();
      this.fire('onPlay');
    },
    reverse: function() {
      this.state = REVERSING;
      this._time = this.duration - this._time;
      this._startTime = this.getTimer() - this._time;
      this.onEnterFrame();
      this.fire('onReverse');
    },
    seek: function(t) {
      this.pause();
      this._time = t;
      this.update();
      this.fire('onSeek');
    },
    reset: function() {
      this.pause();
      this._time = 0;
      this.update();
      this.fire('onReset');
    },
    finish: function() {
      this.pause();
      this._time = this.duration;
      this.update();
      this.fire('onFinish');
    },
    update: function() {
      this.setPosition(this.getPosition(this._time));
    },
    onEnterFrame: function() {
      var t = this.getTimer() - this._startTime;
      if (this.state === PLAYING) {
        this.setTime(t);
      } else if (this.state === REVERSING) {
        this.setTime(this.duration - t);
      }
    },
    pause: function() {
      this.state = PAUSED;
      this.fire('onPause');
    },
    getTimer: function() {
      return new Date().getTime();
    }
  };

  /**
   * Tween constructor.  Tweens enable you to animate a node between the current state and a new state.
   *  You can play, pause, reverse, seek, reset, and finish tweens.  By default, tweens are animated using
   *  a linear easing.  For more tweening options, check out {@link Konva.Easings}
   * @constructor
   * @memberof Konva
   * @example
   * // instantiate new tween which fully rotates a node in 1 second
   * var tween = new Konva.Tween({
   *   node: node,
   *   rotationDeg: 360,
   *   duration: 1,
   *   easing: Konva.Easings.EaseInOut
   * });
   *
   * // play tween
   * tween.play();
   *
   * // pause tween
   * tween.pause();
   */
  Konva.Tween = function(config) {
    var that = this,
      node = config.node,
      nodeId = node._id,
      duration,
      easing = config.easing || Konva.Easings.Linear,
      yoyo = !!config.yoyo,
      key;

    if (typeof config.duration === 'undefined') {
      duration = 0.3;
    } else if (config.duration === 0) {
      // zero is bad value for duration
      duration = 0.001;
    } else {
      duration = config.duration;
    }
    this.node = node;
    this._id = idCounter++;

    var layers =
      node.getLayer() ||
      (node instanceof Konva.Stage ? node.getLayers() : null);
    if (!layers) {
      Konva.Util.error(
        'Tween constructor have `node` that is not in a layer. Please add node into layer first.'
      );
    }
    this.anim = new Konva.Animation(function() {
      that.tween.onEnterFrame();
    }, layers);

    this.tween = new Tween(
      key,
      function(i) {
        that._tweenFunc(i);
      },
      easing,
      0,
      1,
      duration * 1000,
      yoyo
    );

    this._addListeners();

    // init attrs map
    if (!Konva.Tween.attrs[nodeId]) {
      Konva.Tween.attrs[nodeId] = {};
    }
    if (!Konva.Tween.attrs[nodeId][this._id]) {
      Konva.Tween.attrs[nodeId][this._id] = {};
    }
    // init tweens map
    if (!Konva.Tween.tweens[nodeId]) {
      Konva.Tween.tweens[nodeId] = {};
    }

    for (key in config) {
      if (blacklist[key] === undefined) {
        this._addAttr(key, config[key]);
      }
    }

    this.reset();

    // callbacks
    this.onFinish = config.onFinish;
    this.onReset = config.onReset;
  };

  // start/diff object = attrs.nodeId.tweenId.attr
  Konva.Tween.attrs = {};
  // tweenId = tweens.nodeId.attr
  Konva.Tween.tweens = {};

  Konva.Tween.prototype = {
    _addAttr: function(key, end) {
      var node = this.node,
        nodeId = node._id,
        start,
        diff,
        tweenId,
        n,
        len,
        trueEnd,
        trueStart,
        endRGBA;

      // remove conflict from tween map if it exists
      tweenId = Konva.Tween.tweens[nodeId][key];

      if (tweenId) {
        delete Konva.Tween.attrs[nodeId][tweenId][key];
      }

      // add to tween map
      start = node.getAttr(key);

      if (Konva.Util._isArray(end)) {
        diff = [];
        len = Math.max(end.length, start.length);

        if (key === 'points' && end.length !== start.length) {
          // before tweening points we need to make sure that start.length === end.length
          // Konva.Util._prepareArrayForTween thinking that end.length > start.length

          if (end.length > start.length) {
            // so in this case we will increase number of starting points
            trueStart = start;
            start = Konva.Util._prepareArrayForTween(start, end, node.closed());
          } else {
            // in this case we will increase number of eding points
            trueEnd = end;
            end = Konva.Util._prepareArrayForTween(end, start, node.closed());
          }
        }

        if (key.indexOf('fill') === 0) {
          for (n = 0; n < len; n++) {
            if (n % 2 === 0) {
              diff.push(end[n] - start[n]);
            } else {
              var startRGBA = Konva.Util.colorToRGBA(start[n]);
              endRGBA = Konva.Util.colorToRGBA(end[n]);
              start[n] = startRGBA;
              diff.push({
                r: endRGBA.r - startRGBA.r,
                g: endRGBA.g - startRGBA.g,
                b: endRGBA.b - startRGBA.b,
                a: endRGBA.a - startRGBA.a
              });
            }
          }
        } else {
          for (n = 0; n < len; n++) {
            diff.push(end[n] - start[n]);
          }
        }
      } else if (colorAttrs.indexOf(key) !== -1) {
        start = Konva.Util.colorToRGBA(start);
        endRGBA = Konva.Util.colorToRGBA(end);
        diff = {
          r: endRGBA.r - start.r,
          g: endRGBA.g - start.g,
          b: endRGBA.b - start.b,
          a: endRGBA.a - start.a
        };
      } else {
        diff = end - start;
      }

      Konva.Tween.attrs[nodeId][this._id][key] = {
        start: start,
        diff: diff,
        end: end,
        trueEnd: trueEnd,
        trueStart: trueStart
      };
      Konva.Tween.tweens[nodeId][key] = this._id;
    },
    _tweenFunc: function(i) {
      var node = this.node,
        attrs = Konva.Tween.attrs[node._id][this._id],
        key,
        attr,
        start,
        diff,
        newVal,
        n,
        len,
        end;

      for (key in attrs) {
        attr = attrs[key];
        start = attr.start;
        diff = attr.diff;
        end = attr.end;

        if (Konva.Util._isArray(start)) {
          newVal = [];
          len = Math.max(start.length, end.length);
          if (key.indexOf('fill') === 0) {
            for (n = 0; n < len; n++) {
              if (n % 2 === 0) {
                newVal.push((start[n] || 0) + diff[n] * i);
              } else {
                newVal.push(
                  'rgba(' +
                    Math.round(start[n].r + diff[n].r * i) +
                    ',' +
                    Math.round(start[n].g + diff[n].g * i) +
                    ',' +
                    Math.round(start[n].b + diff[n].b * i) +
                    ',' +
                    (start[n].a + diff[n].a * i) +
                    ')'
                );
              }
            }
          } else {
            for (n = 0; n < len; n++) {
              newVal.push((start[n] || 0) + diff[n] * i);
            }
          }
        } else if (colorAttrs.indexOf(key) !== -1) {
          newVal =
            'rgba(' +
            Math.round(start.r + diff.r * i) +
            ',' +
            Math.round(start.g + diff.g * i) +
            ',' +
            Math.round(start.b + diff.b * i) +
            ',' +
            (start.a + diff.a * i) +
            ')';
        } else {
          newVal = start + diff * i;
        }

        node.setAttr(key, newVal);
      }
    },
    _addListeners: function() {
      var that = this;

      // start listeners
      this.tween.onPlay = function() {
        that.anim.start();
      };
      this.tween.onReverse = function() {
        that.anim.start();
      };

      // stop listeners
      this.tween.onPause = function() {
        that.anim.stop();
      };
      this.tween.onFinish = function() {
        var node = that.node;

        // after tweening  points of line we need to set original end
        var attrs = Konva.Tween.attrs[node._id][that._id];
        if (attrs.points && attrs.points.trueEnd) {
          node.points(attrs.points.trueEnd);
        }

        if (that.onFinish) {
          that.onFinish.call(that);
        }
      };
      this.tween.onReset = function() {
        var node = that.node;
        // after tweening  points of line we need to set original start
        var attrs = Konva.Tween.attrs[node._id][that._id];
        if (attrs.points && attrs.points.trueStart) {
          node.points(attrs.points.trueStart);
        }

        if (that.onReset) {
          that.onReset();
        }
      };
    },
    /**
     * play
     * @method
     * @memberof Konva.Tween.prototype
     * @returns {Tween}
     */
    play: function() {
      this.tween.play();
      return this;
    },
    /**
     * reverse
     * @method
     * @memberof Konva.Tween.prototype
     * @returns {Tween}
     */
    reverse: function() {
      this.tween.reverse();
      return this;
    },
    /**
     * reset
     * @method
     * @memberof Konva.Tween.prototype
     * @returns {Tween}
     */
    reset: function() {
      this.tween.reset();
      return this;
    },
    /**
     * seek
     * @method
     * @memberof Konva.Tween.prototype
     * @param {Integer} t time in seconds between 0 and the duration
     * @returns {Tween}
     */
    seek: function(t) {
      this.tween.seek(t * 1000);
      return this;
    },
    /**
     * pause
     * @method
     * @memberof Konva.Tween.prototype
     * @returns {Tween}
     */
    pause: function() {
      this.tween.pause();
      return this;
    },
    /**
     * finish
     * @method
     * @memberof Konva.Tween.prototype
     * @returns {Tween}
     */
    finish: function() {
      this.tween.finish();
      return this;
    },
    /**
     * destroy
     * @method
     * @memberof Konva.Tween.prototype
     */
    destroy: function() {
      var nodeId = this.node._id,
        thisId = this._id,
        attrs = Konva.Tween.tweens[nodeId],
        key;

      this.pause();

      for (key in attrs) {
        delete Konva.Tween.tweens[nodeId][key];
      }

      delete Konva.Tween.attrs[nodeId][thisId];
    }
  };

  /**
   * Tween node properties. Shorter usage of {@link Konva.Tween} object.
   *
   * @method Konva.Node#to
   * @memberof Konva.Node
   * @param {Object} [params] tween params
   * @example
   *
   * circle.to({
   *  x : 50,
   *  duration : 0.5
   * });
   */
  Konva.Node.prototype.to = function(params) {
    var onFinish = params.onFinish;
    params.node = this;
    params.onFinish = function() {
      this.destroy();
      if (onFinish) {
        onFinish();
      }
    };
    var tween = new Konva.Tween(params);
    tween.play();
  };

  /*
    * These eases were ported from an Adobe Flash tweening library to JavaScript
    * by Xaric
    */

  /**
   * @namespace Easings
   * @memberof Konva
   */
  Konva.Easings = {
    /**
     * back ease in
     * @function
     * @memberof Konva.Easings
     */
    BackEaseIn: function(t, b, c, d) {
      var s = 1.70158;
      return c * (t /= d) * t * ((s + 1) * t - s) + b;
    },
    /**
     * back ease out
     * @function
     * @memberof Konva.Easings
     */
    BackEaseOut: function(t, b, c, d) {
      var s = 1.70158;
      return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
    },
    /**
     * back ease in out
     * @function
     * @memberof Konva.Easings
     */
    BackEaseInOut: function(t, b, c, d) {
      var s = 1.70158;
      if ((t /= d / 2) < 1) {
        return c / 2 * (t * t * (((s *= 1.525) + 1) * t - s)) + b;
      }
      return c / 2 * ((t -= 2) * t * (((s *= 1.525) + 1) * t + s) + 2) + b;
    },
    /**
     * elastic ease in
     * @function
     * @memberof Konva.Easings
     */
    ElasticEaseIn: function(t, b, c, d, a, p) {
      // added s = 0
      var s = 0;
      if (t === 0) {
        return b;
      }
      if ((t /= d) === 1) {
        return b + c;
      }
      if (!p) {
        p = d * 0.3;
      }
      if (!a || a < Math.abs(c)) {
        a = c;
        s = p / 4;
      } else {
        s = p / (2 * Math.PI) * Math.asin(c / a);
      }
      return (
        -(
          a *
          Math.pow(2, 10 * (t -= 1)) *
          Math.sin((t * d - s) * (2 * Math.PI) / p)
        ) + b
      );
    },
    /**
     * elastic ease out
     * @function
     * @memberof Konva.Easings
     */
    ElasticEaseOut: function(t, b, c, d, a, p) {
      // added s = 0
      var s = 0;
      if (t === 0) {
        return b;
      }
      if ((t /= d) === 1) {
        return b + c;
      }
      if (!p) {
        p = d * 0.3;
      }
      if (!a || a < Math.abs(c)) {
        a = c;
        s = p / 4;
      } else {
        s = p / (2 * Math.PI) * Math.asin(c / a);
      }
      return (
        a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) +
        c +
        b
      );
    },
    /**
     * elastic ease in out
     * @function
     * @memberof Konva.Easings
     */
    ElasticEaseInOut: function(t, b, c, d, a, p) {
      // added s = 0
      var s = 0;
      if (t === 0) {
        return b;
      }
      if ((t /= d / 2) === 2) {
        return b + c;
      }
      if (!p) {
        p = d * (0.3 * 1.5);
      }
      if (!a || a < Math.abs(c)) {
        a = c;
        s = p / 4;
      } else {
        s = p / (2 * Math.PI) * Math.asin(c / a);
      }
      if (t < 1) {
        return (
          -0.5 *
            (a *
              Math.pow(2, 10 * (t -= 1)) *
              Math.sin((t * d - s) * (2 * Math.PI) / p)) +
          b
        );
      }
      return (
        a *
          Math.pow(2, -10 * (t -= 1)) *
          Math.sin((t * d - s) * (2 * Math.PI) / p) *
          0.5 +
        c +
        b
      );
    },
    /**
     * bounce ease out
     * @function
     * @memberof Konva.Easings
     */
    BounceEaseOut: function(t, b, c, d) {
      if ((t /= d) < 1 / 2.75) {
        return c * (7.5625 * t * t) + b;
      } else if (t < 2 / 2.75) {
        return c * (7.5625 * (t -= 1.5 / 2.75) * t + 0.75) + b;
      } else if (t < 2.5 / 2.75) {
        return c * (7.5625 * (t -= 2.25 / 2.75) * t + 0.9375) + b;
      } else {
        return c * (7.5625 * (t -= 2.625 / 2.75) * t + 0.984375) + b;
      }
    },
    /**
     * bounce ease in
     * @function
     * @memberof Konva.Easings
     */
    BounceEaseIn: function(t, b, c, d) {
      return c - Konva.Easings.BounceEaseOut(d - t, 0, c, d) + b;
    },
    /**
     * bounce ease in out
     * @function
     * @memberof Konva.Easings
     */
    BounceEaseInOut: function(t, b, c, d) {
      if (t < d / 2) {
        return Konva.Easings.BounceEaseIn(t * 2, 0, c, d) * 0.5 + b;
      } else {
        return (
          Konva.Easings.BounceEaseOut(t * 2 - d, 0, c, d) * 0.5 + c * 0.5 + b
        );
      }
    },
    /**
     * ease in
     * @function
     * @memberof Konva.Easings
     */
    EaseIn: function(t, b, c, d) {
      return c * (t /= d) * t + b;
    },
    /**
     * ease out
     * @function
     * @memberof Konva.Easings
     */
    EaseOut: function(t, b, c, d) {
      return -c * (t /= d) * (t - 2) + b;
    },
    /**
     * ease in out
     * @function
     * @memberof Konva.Easings
     */
    EaseInOut: function(t, b, c, d) {
      if ((t /= d / 2) < 1) {
        return c / 2 * t * t + b;
      }
      return -c / 2 * (--t * (t - 2) - 1) + b;
    },
    /**
     * strong ease in
     * @function
     * @memberof Konva.Easings
     */
    StrongEaseIn: function(t, b, c, d) {
      return c * (t /= d) * t * t * t * t + b;
    },
    /**
     * strong ease out
     * @function
     * @memberof Konva.Easings
     */
    StrongEaseOut: function(t, b, c, d) {
      return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
    },
    /**
     * strong ease in out
     * @function
     * @memberof Konva.Easings
     */
    StrongEaseInOut: function(t, b, c, d) {
      if ((t /= d / 2) < 1) {
        return c / 2 * t * t * t * t * t + b;
      }
      return c / 2 * ((t -= 2) * t * t * t * t + 2) + b;
    },
    /**
     * linear
     * @function
     * @memberof Konva.Easings
     */
    Linear: function(t, b, c, d) {
      return c * t / d + b;
    }
  };
})();

(function() {
  'use strict';
  Konva.DD = {
    // properties
    anim: new Konva.Animation(function() {
      var b = this.dirty;
      this.dirty = false;
      return b;
    }),
    isDragging: false,
    justDragged: false,
    offset: {
      x: 0,
      y: 0
    },
    node: null,

    // methods
    _drag: function(evt) {
      var dd = Konva.DD,
        node = dd.node;
      if (node) {
        if (!dd.isDragging) {
          var pos = node.getStage().getPointerPosition();
          // it is possible that pos is undefined
          // reattach it
          if (!pos) {
            node.getStage()._setPointerPosition(evt);
            pos = node.getStage().getPointerPosition();
          }
          var dragDistance = node.dragDistance();
          var distance = Math.max(
            Math.abs(pos.x - dd.startPointerPos.x),
            Math.abs(pos.y - dd.startPointerPos.y)
          );
          if (distance < dragDistance) {
            return;
          }
        }

        node.getStage()._setPointerPosition(evt);
        if (!dd.isDragging) {
          dd.isDragging = true;
          node.fire(
            'dragstart',
            {
              type: 'dragstart',
              target: node,
              evt: evt
            },
            true
          );
          // a user can stop dragging inside `dragstart`
          if (!node.isDragging()) {
            return;
          }
        }
        node._setDragPosition(evt);

        // execute ondragmove if defined
        node.fire(
          'dragmove',
          {
            type: 'dragmove',
            target: node,
            evt: evt
          },
          true
        );
      }
    },
    _endDragBefore: function(evt) {
      var dd = Konva.DD,
        node = dd.node,
        layer;

      if (node) {
        layer = node.getLayer();
        dd.anim.stop();

        // only fire dragend event if the drag and drop
        // operation actually started.
        if (dd.isDragging) {
          dd.isDragging = false;
          dd.justDragged = true;
          Konva.listenClickTap = false;

          if (evt) {
            evt.dragEndNode = node;
          }
        }

        delete dd.node;

        if (node.getLayer() || layer || node instanceof Konva.Stage) {
          (layer || node).draw();
        }
      }
    },
    _endDragAfter: function(evt) {
      evt = evt || {};
      var dragEndNode = evt.dragEndNode;

      if (evt && dragEndNode) {
        dragEndNode.fire(
          'dragend',
          {
            type: 'dragend',
            target: dragEndNode,
            evt: evt
          },
          true
        );
      }
    }
  };

  // Node extenders

  /**
   * initiate drag and drop
   * @method
   * @memberof Konva.Node.prototype
   */
  Konva.Node.prototype.startDrag = function() {
    var dd = Konva.DD,
      stage = this.getStage(),
      layer = this.getLayer(),
      pos = stage.getPointerPosition(),
      ap = this.getAbsolutePosition();

    if (pos) {
      if (dd.node) {
        dd.node.stopDrag();
      }

      dd.node = this;
      dd.startPointerPos = pos;
      dd.offset.x = pos.x - ap.x;
      dd.offset.y = pos.y - ap.y;
      dd.anim.setLayers(layer || this.getLayers());
      dd.anim.start();

      this._setDragPosition();
    }
  };

  Konva.Node.prototype._setDragPosition = function(evt) {
    var dd = Konva.DD,
      pos = this.getStage().getPointerPosition(),
      dbf = this.getDragBoundFunc();
    if (!pos) {
      return;
    }
    var newNodePos = {
      x: pos.x - dd.offset.x,
      y: pos.y - dd.offset.y
    };

    if (dbf !== undefined) {
      newNodePos = dbf.call(this, newNodePos, evt);
    }
    this.setAbsolutePosition(newNodePos);

    if (
      !this._lastPos ||
      this._lastPos.x !== newNodePos.x ||
      this._lastPos.y !== newNodePos.y
    ) {
      dd.anim.dirty = true;
    }

    this._lastPos = newNodePos;
  };

  /**
   * stop drag and drop
   * @method
   * @memberof Konva.Node.prototype
   */
  Konva.Node.prototype.stopDrag = function() {
    var dd = Konva.DD,
      evt = {};
    dd._endDragBefore(evt);
    dd._endDragAfter(evt);
  };

  Konva.Node.prototype.setDraggable = function(draggable) {
    this._setAttr('draggable', draggable);
    this._dragChange();
  };

  var origRemove = Konva.Node.prototype.remove;

  Konva.Node.prototype.__originalRemove = origRemove;
  Konva.Node.prototype.remove = function() {
    var dd = Konva.DD;

    // stop DD
    if (dd.node && dd.node._id === this._id) {
      this.stopDrag();
    }

    origRemove.call(this);
  };

  /**
   * determine if node is currently in drag and drop mode
   * @method
   * @memberof Konva.Node.prototype
   */
  Konva.Node.prototype.isDragging = function() {
    var dd = Konva.DD;
    return !!(dd.node && dd.node._id === this._id && dd.isDragging);
  };

  Konva.Node.prototype._listenDrag = function() {
    var that = this;

    this._dragCleanup();

    if (this.getClassName() === 'Stage') {
      this.on('contentMousedown.konva contentTouchstart.konva', function(evt) {
        if (!Konva.DD.node) {
          that.startDrag(evt);
        }
      });
    } else {
      this.on('mousedown.konva touchstart.konva', function(evt) {
        // ignore right and middle buttons
        if (evt.evt.button === 1 || evt.evt.button === 2) {
          return;
        }
        if (!Konva.DD.node) {
          that.startDrag(evt);
        }
      });
    }

    // listening is required for drag and drop
    /*
        this._listeningEnabled = true;
        this._clearSelfAndAncestorCache('listeningEnabled');
        */
  };

  Konva.Node.prototype._dragChange = function() {
    if (this.attrs.draggable) {
      this._listenDrag();
    } else {
      // remove event listeners
      this._dragCleanup();

      /*
             * force drag and drop to end
             * if this node is currently in
             * drag and drop mode
             */
      var stage = this.getStage();
      var dd = Konva.DD;
      if (stage && dd.node && dd.node._id === this._id) {
        dd.node.stopDrag();
      }
    }
  };

  Konva.Node.prototype._dragCleanup = function() {
    if (this.getClassName() === 'Stage') {
      this.off('contentMousedown.konva');
      this.off('contentTouchstart.konva');
    } else {
      this.off('mousedown.konva');
      this.off('touchstart.konva');
    }
  };

  Konva.Factory.addGetterSetter(Konva.Node, 'dragBoundFunc');

  /**
   * get/set drag bound function.  This is used to override the default
   *  drag and drop position.
   * @name dragBoundFunc
   * @method
   * @memberof Konva.Node.prototype
   * @param {Function} dragBoundFunc
   * @returns {Function}
   * @example
   * // get drag bound function
   * var dragBoundFunc = node.dragBoundFunc();
   *
   * // create vertical drag and drop
   * node.dragBoundFunc(function(pos){
   *   // important pos - is absolute position of the node
   *   // you should return absolute position too
   *   return {
   *     x: this.getAbsolutePosition().x,
   *     y: pos.y
   *   };
   * });
   */

  Konva.Factory.addGetter(Konva.Node, 'draggable', false);
  Konva.Factory.addOverloadedGetterSetter(Konva.Node, 'draggable');

  /**
   * get/set draggable flag
   * @name draggable
   * @method
   * @memberof Konva.Node.prototype
   * @param {Boolean} draggable
   * @returns {Boolean}
   * @example
   * // get draggable flag
   * var draggable = node.draggable();
   *
   * // enable drag and drop
   * node.draggable(true);
   *
   * // disable drag and drop
   * node.draggable(false);
   */

  if (Konva.isBrowser) {
    window.addEventListener('mouseup', Konva.DD._endDragBefore, true);
    window.addEventListener('touchend', Konva.DD._endDragBefore, true);

    window.addEventListener('mousemove', Konva.DD._drag);
    window.addEventListener('touchmove', Konva.DD._drag);

    window.addEventListener('mouseup', Konva.DD._endDragAfter, false);
    window.addEventListener('touchend', Konva.DD._endDragAfter, false);
  }
})();

(function() {
  'use strict';
  /**
   * Rect constructor
   * @constructor
   * @memberof Konva
   * @augments Konva.Shape
   * @param {Object} config
   * @param {Number} [config.cornerRadius]
   * @param {String} [config.fill] fill color
     * @param {Image} [config.fillPatternImage] fill pattern image
     * @param {Number} [config.fillPatternX]
     * @param {Number} [config.fillPatternY]
     * @param {Object} [config.fillPatternOffset] object with x and y component
     * @param {Number} [config.fillPatternOffsetX] 
     * @param {Number} [config.fillPatternOffsetY] 
     * @param {Object} [config.fillPatternScale] object with x and y component
     * @param {Number} [config.fillPatternScaleX]
     * @param {Number} [config.fillPatternScaleY]
     * @param {Number} [config.fillPatternRotation]
     * @param {String} [config.fillPatternRepeat] can be "repeat", "repeat-x", "repeat-y", or "no-repeat".  The default is "no-repeat"
     * @param {Object} [config.fillLinearGradientStartPoint] object with x and y component
     * @param {Number} [config.fillLinearGradientStartPointX]
     * @param {Number} [config.fillLinearGradientStartPointY]
     * @param {Object} [config.fillLinearGradientEndPoint] object with x and y component
     * @param {Number} [config.fillLinearGradientEndPointX]
     * @param {Number} [config.fillLinearGradientEndPointY]
     * @param {Array} [config.fillLinearGradientColorStops] array of color stops
     * @param {Object} [config.fillRadialGradientStartPoint] object with x and y component
     * @param {Number} [config.fillRadialGradientStartPointX]
     * @param {Number} [config.fillRadialGradientStartPointY]
     * @param {Object} [config.fillRadialGradientEndPoint] object with x and y component
     * @param {Number} [config.fillRadialGradientEndPointX] 
     * @param {Number} [config.fillRadialGradientEndPointY] 
     * @param {Number} [config.fillRadialGradientStartRadius]
     * @param {Number} [config.fillRadialGradientEndRadius]
     * @param {Array} [config.fillRadialGradientColorStops] array of color stops
     * @param {Boolean} [config.fillEnabled] flag which enables or disables the fill.  The default value is true
     * @param {String} [config.fillPriority] can be color, linear-gradient, radial-graident, or pattern.  The default value is color.  The fillPriority property makes it really easy to toggle between different fill types.  For example, if you want to toggle between a fill color style and a fill pattern style, simply set the fill property and the fillPattern properties, and then use setFillPriority('color') to render the shape with a color fill, or use setFillPriority('pattern') to render the shape with the pattern fill configuration
     * @param {String} [config.stroke] stroke color
     * @param {Number} [config.strokeWidth] stroke width
     * @param {Boolean} [config.strokeHitEnabled] flag which enables or disables stroke hit region.  The default is true
     * @param {Boolean} [config.perfectDrawEnabled] flag which enables or disables using buffer canvas.  The default is true
     * @param {Boolean} [config.shadowForStrokeEnabled] flag which enables or disables shasow for stroke.  The default is true
     * @param {Boolean} [config.strokeScaleEnabled] flag which enables or disables stroke scale.  The default is true
     * @param {Boolean} [config.strokeEnabled] flag which enables or disables the stroke.  The default value is true
     * @param {String} [config.lineJoin] can be miter, round, or bevel.  The default
     *  is miter
     * @param {String} [config.lineCap] can be butt, round, or sqare.  The default
     *  is butt
     * @param {String} [config.shadowColor]
     * @param {Number} [config.shadowBlur]
     * @param {Object} [config.shadowOffset] object with x and y component
     * @param {Number} [config.shadowOffsetX]
     * @param {Number} [config.shadowOffsetY]
     * @param {Number} [config.shadowOpacity] shadow opacity.  Can be any real number
     *  between 0 and 1
     * @param {Boolean} [config.shadowEnabled] flag which enables or disables the shadow.  The default value is true
     * @param {Array} [config.dash]
     * @param {Boolean} [config.dashEnabled] flag which enables or disables the dashArray.  The default value is true
   * @param {Number} [config.x]
     * @param {Number} [config.y]
     * @param {Number} [config.width]
     * @param {Number} [config.height]
     * @param {Boolean} [config.visible]
     * @param {Boolean} [config.listening] whether or not the node is listening for events
     * @param {String} [config.id] unique id
     * @param {String} [config.name] non-unique name
     * @param {Number} [config.opacity] determines node opacity.  Can be any number between 0 and 1
     * @param {Object} [config.scale] set scale
     * @param {Number} [config.scaleX] set scale x
     * @param {Number} [config.scaleY] set scale y
     * @param {Number} [config.rotation] rotation in degrees
     * @param {Object} [config.offset] offset from center point and rotation point
     * @param {Number} [config.offsetX] set offset x
     * @param {Number} [config.offsetY] set offset y
     * @param {Boolean} [config.draggable] makes the node draggable.  When stages are draggable, you can drag and drop
     *  the entire stage by dragging any portion of the stage
     * @param {Number} [config.dragDistance]
     * @param {Function} [config.dragBoundFunc]
   * @example
   * var rect = new Konva.Rect({
   *   width: 100,
   *   height: 50,
   *   fill: 'red',
   *   stroke: 'black',
   *   strokeWidth: 5
   * });
   */
  Konva.Rect = function(config) {
    this.___init(config);
  };

  Konva.Rect.prototype = {
    ___init: function(config) {
      Konva.Shape.call(this, config);
      this.className = 'Rect';
      this.sceneFunc(this._sceneFunc);
    },
    _sceneFunc: function(context) {
      var cornerRadius = this.getCornerRadius(),
        width = this.getWidth(),
        height = this.getHeight();

      context.beginPath();

      if (!cornerRadius) {
        // simple rect - don't bother doing all that complicated maths stuff.
        context.rect(0, 0, width, height);
      } else {
        // arcTo would be nicer, but browser support is patchy (Opera)
        cornerRadius = Math.min(cornerRadius, width / 2, height / 2);
        context.moveTo(cornerRadius, 0);
        context.lineTo(width - cornerRadius, 0);
        context.arc(
          width - cornerRadius,
          cornerRadius,
          cornerRadius,
          Math.PI * 3 / 2,
          0,
          false
        );
        context.lineTo(width, height - cornerRadius);
        context.arc(
          width - cornerRadius,
          height - cornerRadius,
          cornerRadius,
          0,
          Math.PI / 2,
          false
        );
        context.lineTo(cornerRadius, height);
        context.arc(
          cornerRadius,
          height - cornerRadius,
          cornerRadius,
          Math.PI / 2,
          Math.PI,
          false
        );
        context.lineTo(0, cornerRadius);
        context.arc(
          cornerRadius,
          cornerRadius,
          cornerRadius,
          Math.PI,
          Math.PI * 3 / 2,
          false
        );
      }
      context.closePath();
      context.fillStrokeShape(this);
    }
  };

  Konva.Util.extend(Konva.Rect, Konva.Shape);

  Konva.Factory.addGetterSetter(
    Konva.Rect,
    'cornerRadius',
    0,
    Konva.Validators.getNumberValidator()
  );
  /**
   * get/set corner radius
   * @name cornerRadius
   * @method
   * @memberof Konva.Rect.prototype
   * @param {Number} cornerRadius
   * @returns {Number}
   * @example
   * // get corner radius
   * var cornerRadius = rect.cornerRadius();
   *
   * // set corner radius
   * rect.cornerRadius(10);
   */

  Konva.Collection.mapMethods(Konva.Rect);
})();

(function(Konva) {
  'use strict';
  // the 0.0001 offset fixes a bug in Chrome 27
  var PIx2 = Math.PI * 2 - 0.0001,
    CIRCLE = 'Circle';

  /**
   * Circle constructor
   * @constructor
   * @memberof Konva
   * @augments Konva.Shape
   * @param {Object} config
   * @param {Number} config.radius
   * @param {String} [config.fill] fill color
     * @param {Image} [config.fillPatternImage] fill pattern image
     * @param {Number} [config.fillPatternX]
     * @param {Number} [config.fillPatternY]
     * @param {Object} [config.fillPatternOffset] object with x and y component
     * @param {Number} [config.fillPatternOffsetX] 
     * @param {Number} [config.fillPatternOffsetY] 
     * @param {Object} [config.fillPatternScale] object with x and y component
     * @param {Number} [config.fillPatternScaleX]
     * @param {Number} [config.fillPatternScaleY]
     * @param {Number} [config.fillPatternRotation]
     * @param {String} [config.fillPatternRepeat] can be "repeat", "repeat-x", "repeat-y", or "no-repeat".  The default is "no-repeat"
     * @param {Object} [config.fillLinearGradientStartPoint] object with x and y component
     * @param {Number} [config.fillLinearGradientStartPointX]
     * @param {Number} [config.fillLinearGradientStartPointY]
     * @param {Object} [config.fillLinearGradientEndPoint] object with x and y component
     * @param {Number} [config.fillLinearGradientEndPointX]
     * @param {Number} [config.fillLinearGradientEndPointY]
     * @param {Array} [config.fillLinearGradientColorStops] array of color stops
     * @param {Object} [config.fillRadialGradientStartPoint] object with x and y component
     * @param {Number} [config.fillRadialGradientStartPointX]
     * @param {Number} [config.fillRadialGradientStartPointY]
     * @param {Object} [config.fillRadialGradientEndPoint] object with x and y component
     * @param {Number} [config.fillRadialGradientEndPointX] 
     * @param {Number} [config.fillRadialGradientEndPointY] 
     * @param {Number} [config.fillRadialGradientStartRadius]
     * @param {Number} [config.fillRadialGradientEndRadius]
     * @param {Array} [config.fillRadialGradientColorStops] array of color stops
     * @param {Boolean} [config.fillEnabled] flag which enables or disables the fill.  The default value is true
     * @param {String} [config.fillPriority] can be color, linear-gradient, radial-graident, or pattern.  The default value is color.  The fillPriority property makes it really easy to toggle between different fill types.  For example, if you want to toggle between a fill color style and a fill pattern style, simply set the fill property and the fillPattern properties, and then use setFillPriority('color') to render the shape with a color fill, or use setFillPriority('pattern') to render the shape with the pattern fill configuration
     * @param {String} [config.stroke] stroke color
     * @param {Number} [config.strokeWidth] stroke width
     * @param {Boolean} [config.strokeHitEnabled] flag which enables or disables stroke hit region.  The default is true
     * @param {Boolean} [config.perfectDrawEnabled] flag which enables or disables using buffer canvas.  The default is true
     * @param {Boolean} [config.shadowForStrokeEnabled] flag which enables or disables shasow for stroke.  The default is true
     * @param {Boolean} [config.strokeScaleEnabled] flag which enables or disables stroke scale.  The default is true
     * @param {Boolean} [config.strokeEnabled] flag which enables or disables the stroke.  The default value is true
     * @param {String} [config.lineJoin] can be miter, round, or bevel.  The default
     *  is miter
     * @param {String} [config.lineCap] can be butt, round, or sqare.  The default
     *  is butt
     * @param {String} [config.shadowColor]
     * @param {Number} [config.shadowBlur]
     * @param {Object} [config.shadowOffset] object with x and y component
     * @param {Number} [config.shadowOffsetX]
     * @param {Number} [config.shadowOffsetY]
     * @param {Number} [config.shadowOpacity] shadow opacity.  Can be any real number
     *  between 0 and 1
     * @param {Boolean} [config.shadowEnabled] flag which enables or disables the shadow.  The default value is true
     * @param {Array} [config.dash]
     * @param {Boolean} [config.dashEnabled] flag which enables or disables the dashArray.  The default value is true
   * @param {Number} [config.x]
     * @param {Number} [config.y]
     * @param {Number} [config.width]
     * @param {Number} [config.height]
     * @param {Boolean} [config.visible]
     * @param {Boolean} [config.listening] whether or not the node is listening for events
     * @param {String} [config.id] unique id
     * @param {String} [config.name] non-unique name
     * @param {Number} [config.opacity] determines node opacity.  Can be any number between 0 and 1
     * @param {Object} [config.scale] set scale
     * @param {Number} [config.scaleX] set scale x
     * @param {Number} [config.scaleY] set scale y
     * @param {Number} [config.rotation] rotation in degrees
     * @param {Object} [config.offset] offset from center point and rotation point
     * @param {Number} [config.offsetX] set offset x
     * @param {Number} [config.offsetY] set offset y
     * @param {Boolean} [config.draggable] makes the node draggable.  When stages are draggable, you can drag and drop
     *  the entire stage by dragging any portion of the stage
     * @param {Number} [config.dragDistance]
     * @param {Function} [config.dragBoundFunc]
   * @example
   * // create circle
   * var circle = new Konva.Circle({
   *   radius: 40,
   *   fill: 'red',
   *   stroke: 'black'
   *   strokeWidth: 5
   * });
   */
  Konva.Circle = function(config) {
    this.___init(config);
  };

  Konva.Circle.prototype = {
    _centroid: true,
    ___init: function(config) {
      // call super constructor
      Konva.Shape.call(this, config);
      this.className = CIRCLE;
      this.sceneFunc(this._sceneFunc);
    },
    _sceneFunc: function(context) {
      context.beginPath();
      context.arc(0, 0, this.getRadius(), 0, PIx2, false);
      context.closePath();
      context.fillStrokeShape(this);
    },
    // implements Shape.prototype.getWidth()
    getWidth: function() {
      return this.getRadius() * 2;
    },
    // implements Shape.prototype.getHeight()
    getHeight: function() {
      return this.getRadius() * 2;
    },
    // implements Shape.prototype.setWidth()
    setWidth: function(width) {
      Konva.Node.prototype.setWidth.call(this, width);
      if (this.radius() !== width / 2) {
        this.setRadius(width / 2);
      }
    },
    // implements Shape.prototype.setHeight()
    setHeight: function(height) {
      Konva.Node.prototype.setHeight.call(this, height);
      if (this.radius() !== height / 2) {
        this.setRadius(height / 2);
      }
    }
  };
  Konva.Util.extend(Konva.Circle, Konva.Shape);

  // add getters setters
  Konva.Factory.addGetterSetter(
    Konva.Circle,
    'radius',
    0,
    Konva.Validators.getNumberValidator()
  );
  Konva.Factory.addOverloadedGetterSetter(Konva.Circle, 'radius');

  /**
   * get/set radius
   * @name radius
   * @method
   * @memberof Konva.Circle.prototype
   * @param {Number} radius
   * @returns {Number}
   * @example
   * // get radius
   * var radius = circle.radius();
   *
   * // set radius
   * circle.radius(10);
   */

  Konva.Collection.mapMethods(Konva.Circle);
})(Konva);

(function() {
  'use strict';
  // the 0.0001 offset fixes a bug in Chrome 27
  var PIx2 = Math.PI * 2 - 0.0001,
    ELLIPSE = 'Ellipse';

  /**
   * Ellipse constructor
   * @constructor
   * @augments Konva.Shape
   * @param {Object} config
   * @param {Object} config.radius defines x and y radius
   * @param {String} [config.fill] fill color
     * @param {Image} [config.fillPatternImage] fill pattern image
     * @param {Number} [config.fillPatternX]
     * @param {Number} [config.fillPatternY]
     * @param {Object} [config.fillPatternOffset] object with x and y component
     * @param {Number} [config.fillPatternOffsetX] 
     * @param {Number} [config.fillPatternOffsetY] 
     * @param {Object} [config.fillPatternScale] object with x and y component
     * @param {Number} [config.fillPatternScaleX]
     * @param {Number} [config.fillPatternScaleY]
     * @param {Number} [config.fillPatternRotation]
     * @param {String} [config.fillPatternRepeat] can be "repeat", "repeat-x", "repeat-y", or "no-repeat".  The default is "no-repeat"
     * @param {Object} [config.fillLinearGradientStartPoint] object with x and y component
     * @param {Number} [config.fillLinearGradientStartPointX]
     * @param {Number} [config.fillLinearGradientStartPointY]
     * @param {Object} [config.fillLinearGradientEndPoint] object with x and y component
     * @param {Number} [config.fillLinearGradientEndPointX]
     * @param {Number} [config.fillLinearGradientEndPointY]
     * @param {Array} [config.fillLinearGradientColorStops] array of color stops
     * @param {Object} [config.fillRadialGradientStartPoint] object with x and y component
     * @param {Number} [config.fillRadialGradientStartPointX]
     * @param {Number} [config.fillRadialGradientStartPointY]
     * @param {Object} [config.fillRadialGradientEndPoint] object with x and y component
     * @param {Number} [config.fillRadialGradientEndPointX] 
     * @param {Number} [config.fillRadialGradientEndPointY] 
     * @param {Number} [config.fillRadialGradientStartRadius]
     * @param {Number} [config.fillRadialGradientEndRadius]
     * @param {Array} [config.fillRadialGradientColorStops] array of color stops
     * @param {Boolean} [config.fillEnabled] flag which enables or disables the fill.  The default value is true
     * @param {String} [config.fillPriority] can be color, linear-gradient, radial-graident, or pattern.  The default value is color.  The fillPriority property makes it really easy to toggle between different fill types.  For example, if you want to toggle between a fill color style and a fill pattern style, simply set the fill property and the fillPattern properties, and then use setFillPriority('color') to render the shape with a color fill, or use setFillPriority('pattern') to render the shape with the pattern fill configuration
     * @param {String} [config.stroke] stroke color
     * @param {Number} [config.strokeWidth] stroke width
     * @param {Boolean} [config.strokeHitEnabled] flag which enables or disables stroke hit region.  The default is true
     * @param {Boolean} [config.perfectDrawEnabled] flag which enables or disables using buffer canvas.  The default is true
     * @param {Boolean} [config.shadowForStrokeEnabled] flag which enables or disables shasow for stroke.  The default is true
     * @param {Boolean} [config.strokeScaleEnabled] flag which enables or disables stroke scale.  The default is true
     * @param {Boolean} [config.strokeEnabled] flag which enables or disables the stroke.  The default value is true
     * @param {String} [config.lineJoin] can be miter, round, or bevel.  The default
     *  is miter
     * @param {String} [config.lineCap] can be butt, round, or sqare.  The default
     *  is butt
     * @param {String} [config.shadowColor]
     * @param {Number} [config.shadowBlur]
     * @param {Object} [config.shadowOffset] object with x and y component
     * @param {Number} [config.shadowOffsetX]
     * @param {Number} [config.shadowOffsetY]
     * @param {Number} [config.shadowOpacity] shadow opacity.  Can be any real number
     *  between 0 and 1
     * @param {Boolean} [config.shadowEnabled] flag which enables or disables the shadow.  The default value is true
     * @param {Array} [config.dash]
     * @param {Boolean} [config.dashEnabled] flag which enables or disables the dashArray.  The default value is true
   * @param {Number} [config.x]
     * @param {Number} [config.y]
     * @param {Number} [config.width]
     * @param {Number} [config.height]
     * @param {Boolean} [config.visible]
     * @param {Boolean} [config.listening] whether or not the node is listening for events
     * @param {String} [config.id] unique id
     * @param {String} [config.name] non-unique name
     * @param {Number} [config.opacity] determines node opacity.  Can be any number between 0 and 1
     * @param {Object} [config.scale] set scale
     * @param {Number} [config.scaleX] set scale x
     * @param {Number} [config.scaleY] set scale y
     * @param {Number} [config.rotation] rotation in degrees
     * @param {Object} [config.offset] offset from center point and rotation point
     * @param {Number} [config.offsetX] set offset x
     * @param {Number} [config.offsetY] set offset y
     * @param {Boolean} [config.draggable] makes the node draggable.  When stages are draggable, you can drag and drop
     *  the entire stage by dragging any portion of the stage
     * @param {Number} [config.dragDistance]
     * @param {Function} [config.dragBoundFunc]
   * @example
   * var ellipse = new Konva.Ellipse({
   *   radius : {
   *     x : 50,
   *     y : 50
   *   },
   *   fill: 'red'
   * });
   */
  Konva.Ellipse = function(config) {
    this.___init(config);
  };

  Konva.Ellipse.prototype = {
    _centroid: true,
    ___init: function(config) {
      // call super constructor
      Konva.Shape.call(this, config);
      this.className = ELLIPSE;
      this.sceneFunc(this._sceneFunc);
    },
    _sceneFunc: function(context) {
      var rx = this.getRadiusX(),
        ry = this.getRadiusY();

      context.beginPath();
      context.save();
      if (rx !== ry) {
        context.scale(1, ry / rx);
      }
      context.arc(0, 0, rx, 0, PIx2, false);
      context.restore();
      context.closePath();
      context.fillStrokeShape(this);
    },
    // implements Shape.prototype.getWidth()
    getWidth: function() {
      return this.getRadiusX() * 2;
    },
    // implements Shape.prototype.getHeight()
    getHeight: function() {
      return this.getRadiusY() * 2;
    },
    // implements Shape.prototype.setWidth()
    setWidth: function(width) {
      Konva.Node.prototype.setWidth.call(this, width);
      this.setRadius({
        x: width / 2
      });
    },
    // implements Shape.prototype.setHeight()
    setHeight: function(height) {
      Konva.Node.prototype.setHeight.call(this, height);
      this.setRadius({
        y: height / 2
      });
    }
  };
  Konva.Util.extend(Konva.Ellipse, Konva.Shape);

  // add getters setters
  Konva.Factory.addComponentsGetterSetter(Konva.Ellipse, 'radius', ['x', 'y']);

  /**
   * get/set radius
   * @name radius
   * @method
   * @memberof Konva.Ellipse.prototype
   * @param {Object} radius
   * @param {Number} radius.x
   * @param {Number} radius.y
   * @returns {Object}
   * @example
   * // get radius
   * var radius = ellipse.radius();
   *
   * // set radius
   * ellipse.radius({
   *   x: 200,
   *   y: 100
   * });
   */

  Konva.Factory.addGetterSetter(
    Konva.Ellipse,
    'radiusX',
    0,
    Konva.Validators.getNumberValidator()
  );
  /**
   * get/set radius x
   * @name radiusX
   * @method
   * @memberof Konva.Ellipse.prototype
   * @param {Number} x
   * @returns {Number}
   * @example
   * // get radius x
   * var radiusX = ellipse.radiusX();
   *
   * // set radius x
   * ellipse.radiusX(200);
   */

  Konva.Factory.addGetterSetter(
    Konva.Ellipse,
    'radiusY',
    0,
    Konva.Validators.getNumberValidator()
  );
  /**
   * get/set radius y
   * @name radiusY
   * @method
   * @memberof Konva.Ellipse.prototype
   * @param {Number} y
   * @returns {Number}
   * @example
   * // get radius y
   * var radiusY = ellipse.radiusY();
   *
   * // set radius y
   * ellipse.radiusY(200);
   */

  Konva.Collection.mapMethods(Konva.Ellipse);
})();

(function() {
  'use strict';
  // the 0.0001 offset fixes a bug in Chrome 27
  var PIx2 = Math.PI * 2 - 0.0001;
  /**
   * Ring constructor
   * @constructor
   * @augments Konva.Shape
   * @param {Object} config
   * @param {Number} config.innerRadius
   * @param {Number} config.outerRadius
   * @param {Boolean} [config.clockwise]
   * @param {String} [config.fill] fill color
     * @param {Image} [config.fillPatternImage] fill pattern image
     * @param {Number} [config.fillPatternX]
     * @param {Number} [config.fillPatternY]
     * @param {Object} [config.fillPatternOffset] object with x and y component
     * @param {Number} [config.fillPatternOffsetX] 
     * @param {Number} [config.fillPatternOffsetY] 
     * @param {Object} [config.fillPatternScale] object with x and y component
     * @param {Number} [config.fillPatternScaleX]
     * @param {Number} [config.fillPatternScaleY]
     * @param {Number} [config.fillPatternRotation]
     * @param {String} [config.fillPatternRepeat] can be "repeat", "repeat-x", "repeat-y", or "no-repeat".  The default is "no-repeat"
     * @param {Object} [config.fillLinearGradientStartPoint] object with x and y component
     * @param {Number} [config.fillLinearGradientStartPointX]
     * @param {Number} [config.fillLinearGradientStartPointY]
     * @param {Object} [config.fillLinearGradientEndPoint] object with x and y component
     * @param {Number} [config.fillLinearGradientEndPointX]
     * @param {Number} [config.fillLinearGradientEndPointY]
     * @param {Array} [config.fillLinearGradientColorStops] array of color stops
     * @param {Object} [config.fillRadialGradientStartPoint] object with x and y component
     * @param {Number} [config.fillRadialGradientStartPointX]
     * @param {Number} [config.fillRadialGradientStartPointY]
     * @param {Object} [config.fillRadialGradientEndPoint] object with x and y component
     * @param {Number} [config.fillRadialGradientEndPointX] 
     * @param {Number} [config.fillRadialGradientEndPointY] 
     * @param {Number} [config.fillRadialGradientStartRadius]
     * @param {Number} [config.fillRadialGradientEndRadius]
     * @param {Array} [config.fillRadialGradientColorStops] array of color stops
     * @param {Boolean} [config.fillEnabled] flag which enables or disables the fill.  The default value is true
     * @param {String} [config.fillPriority] can be color, linear-gradient, radial-graident, or pattern.  The default value is color.  The fillPriority property makes it really easy to toggle between different fill types.  For example, if you want to toggle between a fill color style and a fill pattern style, simply set the fill property and the fillPattern properties, and then use setFillPriority('color') to render the shape with a color fill, or use setFillPriority('pattern') to render the shape with the pattern fill configuration
     * @param {String} [config.stroke] stroke color
     * @param {Number} [config.strokeWidth] stroke width
     * @param {Boolean} [config.strokeHitEnabled] flag which enables or disables stroke hit region.  The default is true
     * @param {Boolean} [config.perfectDrawEnabled] flag which enables or disables using buffer canvas.  The default is true
     * @param {Boolean} [config.shadowForStrokeEnabled] flag which enables or disables shasow for stroke.  The default is true
     * @param {Boolean} [config.strokeScaleEnabled] flag which enables or disables stroke scale.  The default is true
     * @param {Boolean} [config.strokeEnabled] flag which enables or disables the stroke.  The default value is true
     * @param {String} [config.lineJoin] can be miter, round, or bevel.  The default
     *  is miter
     * @param {String} [config.lineCap] can be butt, round, or sqare.  The default
     *  is butt
     * @param {String} [config.shadowColor]
     * @param {Number} [config.shadowBlur]
     * @param {Object} [config.shadowOffset] object with x and y component
     * @param {Number} [config.shadowOffsetX]
     * @param {Number} [config.shadowOffsetY]
     * @param {Number} [config.shadowOpacity] shadow opacity.  Can be any real number
     *  between 0 and 1
     * @param {Boolean} [config.shadowEnabled] flag which enables or disables the shadow.  The default value is true
     * @param {Array} [config.dash]
     * @param {Boolean} [config.dashEnabled] flag which enables or disables the dashArray.  The default value is true
   * @param {Number} [config.x]
     * @param {Number} [config.y]
     * @param {Number} [config.width]
     * @param {Number} [config.height]
     * @param {Boolean} [config.visible]
     * @param {Boolean} [config.listening] whether or not the node is listening for events
     * @param {String} [config.id] unique id
     * @param {String} [config.name] non-unique name
     * @param {Number} [config.opacity] determines node opacity.  Can be any number between 0 and 1
     * @param {Object} [config.scale] set scale
     * @param {Number} [config.scaleX] set scale x
     * @param {Number} [config.scaleY] set scale y
     * @param {Number} [config.rotation] rotation in degrees
     * @param {Object} [config.offset] offset from center point and rotation point
     * @param {Number} [config.offsetX] set offset x
     * @param {Number} [config.offsetY] set offset y
     * @param {Boolean} [config.draggable] makes the node draggable.  When stages are draggable, you can drag and drop
     *  the entire stage by dragging any portion of the stage
     * @param {Number} [config.dragDistance]
     * @param {Function} [config.dragBoundFunc]
   * @example
   * var ring = new Konva.Ring({
   *   innerRadius: 40,
   *   outerRadius: 80,
   *   fill: 'red',
   *   stroke: 'black',
   *   strokeWidth: 5
   * });
   */
  Konva.Ring = function(config) {
    this.___init(config);
  };

  Konva.Ring.prototype = {
    _centroid: true,
    ___init: function(config) {
      // call super constructor
      Konva.Shape.call(this, config);
      this.className = 'Ring';
      this.sceneFunc(this._sceneFunc);
    },
    _sceneFunc: function(context) {
      context.beginPath();
      context.arc(0, 0, this.getInnerRadius(), 0, PIx2, false);
      context.moveTo(this.getOuterRadius(), 0);
      context.arc(0, 0, this.getOuterRadius(), PIx2, 0, true);
      context.closePath();
      context.fillStrokeShape(this);
    },
    // implements Shape.prototype.getWidth()
    getWidth: function() {
      return this.getOuterRadius() * 2;
    },
    // implements Shape.prototype.getHeight()
    getHeight: function() {
      return this.getOuterRadius() * 2;
    },
    // implements Shape.prototype.setWidth()
    setWidth: function(width) {
      Konva.Node.prototype.setWidth.call(this, width);
      if (this.outerRadius() !== width / 2) {
        this.setOuterRadius(width / 2);
      }
    },
    // implements Shape.prototype.setHeight()
    setHeight: function(height) {
      Konva.Node.prototype.setHeight.call(this, height);
      if (this.outerRadius() !== height / 2) {
        this.setOuterRadius(height / 2);
      }
    },
    setOuterRadius: function(val) {
      this._setAttr('outerRadius', val);
      this.setWidth(val * 2);
      this.setHeight(val * 2);
    }
  };
  Konva.Util.extend(Konva.Ring, Konva.Shape);

  // add getters setters
  Konva.Factory.addGetterSetter(
    Konva.Ring,
    'innerRadius',
    0,
    Konva.Validators.getNumberValidator()
  );

  /**
   * get/set innerRadius
   * @name innerRadius
   * @method
   * @memberof Konva.Ring.prototype
   * @param {Number} innerRadius
   * @returns {Number}
   * @example
   * // get inner radius
   * var innerRadius = ring.innerRadius();
   *
   * // set inner radius
   * ring.innerRadius(20);
   */
  Konva.Factory.addGetter(
    Konva.Ring,
    'outerRadius',
    0,
    Konva.Validators.getNumberValidator()
  );
  Konva.Factory.addOverloadedGetterSetter(Konva.Ring, 'outerRadius');

  /**
   * get/set outerRadius
   * @name outerRadius
   * @method
   * @memberof Konva.Ring.prototype
   * @param {Number} outerRadius
   * @returns {Number}
   * @example
   * // get outer radius
   * var outerRadius = ring.outerRadius();
   *
   * // set outer radius
   * ring.outerRadius(20);
   */

  Konva.Collection.mapMethods(Konva.Ring);
})();

(function() {
  'use strict';
  /**
   * Wedge constructor
   * @constructor
   * @augments Konva.Shape
   * @param {Object} config
   * @param {Number} config.angle in degrees
   * @param {Number} config.radius
   * @param {Boolean} [config.clockwise]
   * @param {String} [config.fill] fill color
     * @param {Image} [config.fillPatternImage] fill pattern image
     * @param {Number} [config.fillPatternX]
     * @param {Number} [config.fillPatternY]
     * @param {Object} [config.fillPatternOffset] object with x and y component
     * @param {Number} [config.fillPatternOffsetX] 
     * @param {Number} [config.fillPatternOffsetY] 
     * @param {Object} [config.fillPatternScale] object with x and y component
     * @param {Number} [config.fillPatternScaleX]
     * @param {Number} [config.fillPatternScaleY]
     * @param {Number} [config.fillPatternRotation]
     * @param {String} [config.fillPatternRepeat] can be "repeat", "repeat-x", "repeat-y", or "no-repeat".  The default is "no-repeat"
     * @param {Object} [config.fillLinearGradientStartPoint] object with x and y component
     * @param {Number} [config.fillLinearGradientStartPointX]
     * @param {Number} [config.fillLinearGradientStartPointY]
     * @param {Object} [config.fillLinearGradientEndPoint] object with x and y component
     * @param {Number} [config.fillLinearGradientEndPointX]
     * @param {Number} [config.fillLinearGradientEndPointY]
     * @param {Array} [config.fillLinearGradientColorStops] array of color stops
     * @param {Object} [config.fillRadialGradientStartPoint] object with x and y component
     * @param {Number} [config.fillRadialGradientStartPointX]
     * @param {Number} [config.fillRadialGradientStartPointY]
     * @param {Object} [config.fillRadialGradientEndPoint] object with x and y component
     * @param {Number} [config.fillRadialGradientEndPointX] 
     * @param {Number} [config.fillRadialGradientEndPointY] 
     * @param {Number} [config.fillRadialGradientStartRadius]
     * @param {Number} [config.fillRadialGradientEndRadius]
     * @param {Array} [config.fillRadialGradientColorStops] array of color stops
     * @param {Boolean} [config.fillEnabled] flag which enables or disables the fill.  The default value is true
     * @param {String} [config.fillPriority] can be color, linear-gradient, radial-graident, or pattern.  The default value is color.  The fillPriority property makes it really easy to toggle between different fill types.  For example, if you want to toggle between a fill color style and a fill pattern style, simply set the fill property and the fillPattern properties, and then use setFillPriority('color') to render the shape with a color fill, or use setFillPriority('pattern') to render the shape with the pattern fill configuration
     * @param {String} [config.stroke] stroke color
     * @param {Number} [config.strokeWidth] stroke width
     * @param {Boolean} [config.strokeHitEnabled] flag which enables or disables stroke hit region.  The default is true
     * @param {Boolean} [config.perfectDrawEnabled] flag which enables or disables using buffer canvas.  The default is true
     * @param {Boolean} [config.shadowForStrokeEnabled] flag which enables or disables shasow for stroke.  The default is true
     * @param {Boolean} [config.strokeScaleEnabled] flag which enables or disables stroke scale.  The default is true
     * @param {Boolean} [config.strokeEnabled] flag which enables or disables the stroke.  The default value is true
     * @param {String} [config.lineJoin] can be miter, round, or bevel.  The default
     *  is miter
     * @param {String} [config.lineCap] can be butt, round, or sqare.  The default
     *  is butt
     * @param {String} [config.shadowColor]
     * @param {Number} [config.shadowBlur]
     * @param {Object} [config.shadowOffset] object with x and y component
     * @param {Number} [config.shadowOffsetX]
     * @param {Number} [config.shadowOffsetY]
     * @param {Number} [config.shadowOpacity] shadow opacity.  Can be any real number
     *  between 0 and 1
     * @param {Boolean} [config.shadowEnabled] flag which enables or disables the shadow.  The default value is true
     * @param {Array} [config.dash]
     * @param {Boolean} [config.dashEnabled] flag which enables or disables the dashArray.  The default value is true
   * @param {Number} [config.x]
     * @param {Number} [config.y]
     * @param {Number} [config.width]
     * @param {Number} [config.height]
     * @param {Boolean} [config.visible]
     * @param {Boolean} [config.listening] whether or not the node is listening for events
     * @param {String} [config.id] unique id
     * @param {String} [config.name] non-unique name
     * @param {Number} [config.opacity] determines node opacity.  Can be any number between 0 and 1
     * @param {Object} [config.scale] set scale
     * @param {Number} [config.scaleX] set scale x
     * @param {Number} [config.scaleY] set scale y
     * @param {Number} [config.rotation] rotation in degrees
     * @param {Object} [config.offset] offset from center point and rotation point
     * @param {Number} [config.offsetX] set offset x
     * @param {Number} [config.offsetY] set offset y
     * @param {Boolean} [config.draggable] makes the node draggable.  When stages are draggable, you can drag and drop
     *  the entire stage by dragging any portion of the stage
     * @param {Number} [config.dragDistance]
     * @param {Function} [config.dragBoundFunc]
   * @example
   * // draw a wedge that's pointing downwards
   * var wedge = new Konva.Wedge({
   *   radius: 40,
   *   fill: 'red',
   *   stroke: 'black'
   *   strokeWidth: 5,
   *   angleDeg: 60,
   *   rotationDeg: -120
   * });
   */
  Konva.Wedge = function(config) {
    this.___init(config);
  };

  Konva.Wedge.prototype = {
    _centroid: true,
    ___init: function(config) {
      // call super constructor
      Konva.Shape.call(this, config);
      this.className = 'Wedge';
      this.sceneFunc(this._sceneFunc);
    },
    _sceneFunc: function(context) {
      context.beginPath();
      context.arc(
        0,
        0,
        this.getRadius(),
        0,
        Konva.getAngle(this.getAngle()),
        this.getClockwise()
      );
      context.lineTo(0, 0);
      context.closePath();
      context.fillStrokeShape(this);
    },
    // implements Shape.prototype.getWidth()
    getWidth: function() {
      return this.getRadius() * 2;
    },
    // implements Shape.prototype.getHeight()
    getHeight: function() {
      return this.getRadius() * 2;
    },
    // implements Shape.prototype.setWidth()
    setWidth: function(width) {
      Konva.Node.prototype.setWidth.call(this, width);
      if (this.radius() !== width / 2) {
        this.setRadius(width / 2);
      }
    },
    // implements Shape.prototype.setHeight()
    setHeight: function(height) {
      Konva.Node.prototype.setHeight.call(this, height);
      if (this.radius() !== height / 2) {
        this.setRadius(height / 2);
      }
    }
  };
  Konva.Util.extend(Konva.Wedge, Konva.Shape);

  // add getters setters
  Konva.Factory.addGetterSetter(
    Konva.Wedge,
    'radius',
    0,
    Konva.Validators.getNumberValidator()
  );

  /**
   * get/set radius
   * @name radius
   * @method
   * @memberof Konva.Wedge.prototype
   * @param {Number} radius
   * @returns {Number}
   * @example
   * // get radius
   * var radius = wedge.radius();
   *
   * // set radius
   * wedge.radius(10);
   */

  Konva.Factory.addGetterSetter(
    Konva.Wedge,
    'angle',
    0,
    Konva.Validators.getNumberValidator()
  );

  /**
   * get/set angle in degrees
   * @name angle
   * @method
   * @memberof Konva.Wedge.prototype
   * @param {Number} angle
   * @returns {Number}
   * @example
   * // get angle
   * var angle = wedge.angle();
   *
   * // set angle
   * wedge.angle(20);
   */

  Konva.Factory.addGetterSetter(Konva.Wedge, 'clockwise', false);

  /**
   * get/set clockwise flag
   * @name clockwise
   * @method
   * @memberof Konva.Wedge.prototype
   * @param {Number} clockwise
   * @returns {Number}
   * @example
   * // get clockwise flag
   * var clockwise = wedge.clockwise();
   *
   * // draw wedge counter-clockwise
   * wedge.clockwise(false);
   *
   * // draw wedge clockwise
   * wedge.clockwise(true);
   */

  Konva.Factory.backCompat(Konva.Wedge, {
    angleDeg: 'angle',
    getAngleDeg: 'getAngle',
    setAngleDeg: 'setAngle'
  });

  Konva.Collection.mapMethods(Konva.Wedge);
})();

(function(Konva) {
  'use strict';
  /**
   * Arc constructor
   * @constructor
   * @augments Konva.Shape
   * @param {Object} config
   * @param {Number} config.angle in degrees
   * @param {Number} config.innerRadius
   * @param {Number} config.outerRadius
   * @param {Boolean} [config.clockwise]
   * @param {String} [config.fill] fill color
     * @param {Image} [config.fillPatternImage] fill pattern image
     * @param {Number} [config.fillPatternX]
     * @param {Number} [config.fillPatternY]
     * @param {Object} [config.fillPatternOffset] object with x and y component
     * @param {Number} [config.fillPatternOffsetX] 
     * @param {Number} [config.fillPatternOffsetY] 
     * @param {Object} [config.fillPatternScale] object with x and y component
     * @param {Number} [config.fillPatternScaleX]
     * @param {Number} [config.fillPatternScaleY]
     * @param {Number} [config.fillPatternRotation]
     * @param {String} [config.fillPatternRepeat] can be "repeat", "repeat-x", "repeat-y", or "no-repeat".  The default is "no-repeat"
     * @param {Object} [config.fillLinearGradientStartPoint] object with x and y component
     * @param {Number} [config.fillLinearGradientStartPointX]
     * @param {Number} [config.fillLinearGradientStartPointY]
     * @param {Object} [config.fillLinearGradientEndPoint] object with x and y component
     * @param {Number} [config.fillLinearGradientEndPointX]
     * @param {Number} [config.fillLinearGradientEndPointY]
     * @param {Array} [config.fillLinearGradientColorStops] array of color stops
     * @param {Object} [config.fillRadialGradientStartPoint] object with x and y component
     * @param {Number} [config.fillRadialGradientStartPointX]
     * @param {Number} [config.fillRadialGradientStartPointY]
     * @param {Object} [config.fillRadialGradientEndPoint] object with x and y component
     * @param {Number} [config.fillRadialGradientEndPointX] 
     * @param {Number} [config.fillRadialGradientEndPointY] 
     * @param {Number} [config.fillRadialGradientStartRadius]
     * @param {Number} [config.fillRadialGradientEndRadius]
     * @param {Array} [config.fillRadialGradientColorStops] array of color stops
     * @param {Boolean} [config.fillEnabled] flag which enables or disables the fill.  The default value is true
     * @param {String} [config.fillPriority] can be color, linear-gradient, radial-graident, or pattern.  The default value is color.  The fillPriority property makes it really easy to toggle between different fill types.  For example, if you want to toggle between a fill color style and a fill pattern style, simply set the fill property and the fillPattern properties, and then use setFillPriority('color') to render the shape with a color fill, or use setFillPriority('pattern') to render the shape with the pattern fill configuration
     * @param {String} [config.stroke] stroke color
     * @param {Number} [config.strokeWidth] stroke width
     * @param {Boolean} [config.strokeHitEnabled] flag which enables or disables stroke hit region.  The default is true
     * @param {Boolean} [config.perfectDrawEnabled] flag which enables or disables using buffer canvas.  The default is true
     * @param {Boolean} [config.shadowForStrokeEnabled] flag which enables or disables shasow for stroke.  The default is true
     * @param {Boolean} [config.strokeScaleEnabled] flag which enables or disables stroke scale.  The default is true
     * @param {Boolean} [config.strokeEnabled] flag which enables or disables the stroke.  The default value is true
     * @param {String} [config.lineJoin] can be miter, round, or bevel.  The default
     *  is miter
     * @param {String} [config.lineCap] can be butt, round, or sqare.  The default
     *  is butt
     * @param {String} [config.shadowColor]
     * @param {Number} [config.shadowBlur]
     * @param {Object} [config.shadowOffset] object with x and y component
     * @param {Number} [config.shadowOffsetX]
     * @param {Number} [config.shadowOffsetY]
     * @param {Number} [config.shadowOpacity] shadow opacity.  Can be any real number
     *  between 0 and 1
     * @param {Boolean} [config.shadowEnabled] flag which enables or disables the shadow.  The default value is true
     * @param {Array} [config.dash]
     * @param {Boolean} [config.dashEnabled] flag which enables or disables the dashArray.  The default value is true
   * @param {Number} [config.x]
     * @param {Number} [config.y]
     * @param {Number} [config.width]
     * @param {Number} [config.height]
     * @param {Boolean} [config.visible]
     * @param {Boolean} [config.listening] whether or not the node is listening for events
     * @param {String} [config.id] unique id
     * @param {String} [config.name] non-unique name
     * @param {Number} [config.opacity] determines node opacity.  Can be any number between 0 and 1
     * @param {Object} [config.scale] set scale
     * @param {Number} [config.scaleX] set scale x
     * @param {Number} [config.scaleY] set scale y
     * @param {Number} [config.rotation] rotation in degrees
     * @param {Object} [config.offset] offset from center point and rotation point
     * @param {Number} [config.offsetX] set offset x
     * @param {Number} [config.offsetY] set offset y
     * @param {Boolean} [config.draggable] makes the node draggable.  When stages are draggable, you can drag and drop
     *  the entire stage by dragging any portion of the stage
     * @param {Number} [config.dragDistance]
     * @param {Function} [config.dragBoundFunc]
   * @example
   * // draw a Arc that's pointing downwards
   * var arc = new Konva.Arc({
   *   innerRadius: 40,
   *   outerRadius: 80,
   *   fill: 'red',
   *   stroke: 'black'
   *   strokeWidth: 5,
   *   angle: 60,
   *   rotationDeg: -120
   * });
   */
  Konva.Arc = function(config) {
    this.___init(config);
  };

  Konva.Arc.prototype = {
    _centroid: true,
    ___init: function(config) {
      // call super constructor
      Konva.Shape.call(this, config);
      this.className = 'Arc';
      this.sceneFunc(this._sceneFunc);
    },
    _sceneFunc: function(context) {
      var angle = Konva.getAngle(this.angle()),
        clockwise = this.clockwise();

      context.beginPath();
      context.arc(0, 0, this.getOuterRadius(), 0, angle, clockwise);
      context.arc(0, 0, this.getInnerRadius(), angle, 0, !clockwise);
      context.closePath();
      context.fillStrokeShape(this);
    },
    // implements Shape.prototype.getWidth()
    getWidth: function() {
      return this.getOuterRadius() * 2;
    },
    // implements Shape.prototype.getHeight()
    getHeight: function() {
      return this.getOuterRadius() * 2;
    },
    // implements Shape.prototype.setWidth()
    setWidth: function(width) {
      Konva.Node.prototype.setWidth.call(this, width);
      if (this.getOuterRadius() !== width / 2) {
        this.setOuterRadius(width / 2);
      }
    },
    // implements Shape.prototype.setHeight()
    setHeight: function(height) {
      Konva.Node.prototype.setHeight.call(this, height);
      if (this.getOuterRadius() !== height / 2) {
        this.setOuterRadius(height / 2);
      }
    }
  };
  Konva.Util.extend(Konva.Arc, Konva.Shape);

  // add getters setters
  Konva.Factory.addGetterSetter(
    Konva.Arc,
    'innerRadius',
    0,
    Konva.Validators.getNumberValidator()
  );

  /**
   * get/set innerRadius
   * @name innerRadius
   * @method
   * @memberof Konva.Arc.prototype
   * @param {Number} innerRadius
   * @returns {Number}
   * @example
   * // get inner radius
   * var innerRadius = arc.innerRadius();
   *
   * // set inner radius
   * arc.innerRadius(20);
   */

  Konva.Factory.addGetterSetter(
    Konva.Arc,
    'outerRadius',
    0,
    Konva.Validators.getNumberValidator()
  );

  /**
   * get/set outerRadius
   * @name outerRadius
   * @method
   * @memberof Konva.Arc.prototype
   * @param {Number} outerRadius
   * @returns {Number}
   * @example
   * // get outer radius
   * var outerRadius = arc.outerRadius();
   *
   * // set outer radius
   * arc.outerRadius(20);
   */

  Konva.Factory.addGetterSetter(
    Konva.Arc,
    'angle',
    0,
    Konva.Validators.getNumberValidator()
  );

  /**
   * get/set angle in degrees
   * @name angle
   * @method
   * @memberof Konva.Arc.prototype
   * @param {Number} angle
   * @returns {Number}
   * @example
   * // get angle
   * var angle = arc.angle();
   *
   * // set angle
   * arc.angle(20);
   */

  Konva.Factory.addGetterSetter(Konva.Arc, 'clockwise', false);

  /**
   * get/set clockwise flag
   * @name clockwise
   * @method
   * @memberof Konva.Arc.prototype
   * @param {Boolean} clockwise
   * @returns {Boolean}
   * @example
   * // get clockwise flag
   * var clockwise = arc.clockwise();
   *
   * // draw arc counter-clockwise
   * arc.clockwise(false);
   *
   * // draw arc clockwise
   * arc.clockwise(true);
   */

  Konva.Collection.mapMethods(Konva.Arc);
})(Konva);

(function() {
  'use strict';
  // CONSTANTS
  var IMAGE = 'Image';

  /**
   * Image constructor
   * @constructor
   * @memberof Konva
   * @augments Konva.Shape
   * @param {Object} config
   * @param {Image} config.image
   * @param {Object} [config.crop]
   * @param {String} [config.fill] fill color
     * @param {Image} [config.fillPatternImage] fill pattern image
     * @param {Number} [config.fillPatternX]
     * @param {Number} [config.fillPatternY]
     * @param {Object} [config.fillPatternOffset] object with x and y component
     * @param {Number} [config.fillPatternOffsetX] 
     * @param {Number} [config.fillPatternOffsetY] 
     * @param {Object} [config.fillPatternScale] object with x and y component
     * @param {Number} [config.fillPatternScaleX]
     * @param {Number} [config.fillPatternScaleY]
     * @param {Number} [config.fillPatternRotation]
     * @param {String} [config.fillPatternRepeat] can be "repeat", "repeat-x", "repeat-y", or "no-repeat".  The default is "no-repeat"
     * @param {Object} [config.fillLinearGradientStartPoint] object with x and y component
     * @param {Number} [config.fillLinearGradientStartPointX]
     * @param {Number} [config.fillLinearGradientStartPointY]
     * @param {Object} [config.fillLinearGradientEndPoint] object with x and y component
     * @param {Number} [config.fillLinearGradientEndPointX]
     * @param {Number} [config.fillLinearGradientEndPointY]
     * @param {Array} [config.fillLinearGradientColorStops] array of color stops
     * @param {Object} [config.fillRadialGradientStartPoint] object with x and y component
     * @param {Number} [config.fillRadialGradientStartPointX]
     * @param {Number} [config.fillRadialGradientStartPointY]
     * @param {Object} [config.fillRadialGradientEndPoint] object with x and y component
     * @param {Number} [config.fillRadialGradientEndPointX] 
     * @param {Number} [config.fillRadialGradientEndPointY] 
     * @param {Number} [config.fillRadialGradientStartRadius]
     * @param {Number} [config.fillRadialGradientEndRadius]
     * @param {Array} [config.fillRadialGradientColorStops] array of color stops
     * @param {Boolean} [config.fillEnabled] flag which enables or disables the fill.  The default value is true
     * @param {String} [config.fillPriority] can be color, linear-gradient, radial-graident, or pattern.  The default value is color.  The fillPriority property makes it really easy to toggle between different fill types.  For example, if you want to toggle between a fill color style and a fill pattern style, simply set the fill property and the fillPattern properties, and then use setFillPriority('color') to render the shape with a color fill, or use setFillPriority('pattern') to render the shape with the pattern fill configuration
     * @param {String} [config.stroke] stroke color
     * @param {Number} [config.strokeWidth] stroke width
     * @param {Boolean} [config.strokeHitEnabled] flag which enables or disables stroke hit region.  The default is true
     * @param {Boolean} [config.perfectDrawEnabled] flag which enables or disables using buffer canvas.  The default is true
     * @param {Boolean} [config.shadowForStrokeEnabled] flag which enables or disables shasow for stroke.  The default is true
     * @param {Boolean} [config.strokeScaleEnabled] flag which enables or disables stroke scale.  The default is true
     * @param {Boolean} [config.strokeEnabled] flag which enables or disables the stroke.  The default value is true
     * @param {String} [config.lineJoin] can be miter, round, or bevel.  The default
     *  is miter
     * @param {String} [config.lineCap] can be butt, round, or sqare.  The default
     *  is butt
     * @param {String} [config.shadowColor]
     * @param {Number} [config.shadowBlur]
     * @param {Object} [config.shadowOffset] object with x and y component
     * @param {Number} [config.shadowOffsetX]
     * @param {Number} [config.shadowOffsetY]
     * @param {Number} [config.shadowOpacity] shadow opacity.  Can be any real number
     *  between 0 and 1
     * @param {Boolean} [config.shadowEnabled] flag which enables or disables the shadow.  The default value is true
     * @param {Array} [config.dash]
     * @param {Boolean} [config.dashEnabled] flag which enables or disables the dashArray.  The default value is true
   * @param {Number} [config.x]
     * @param {Number} [config.y]
     * @param {Number} [config.width]
     * @param {Number} [config.height]
     * @param {Boolean} [config.visible]
     * @param {Boolean} [config.listening] whether or not the node is listening for events
     * @param {String} [config.id] unique id
     * @param {String} [config.name] non-unique name
     * @param {Number} [config.opacity] determines node opacity.  Can be any number between 0 and 1
     * @param {Object} [config.scale] set scale
     * @param {Number} [config.scaleX] set scale x
     * @param {Number} [config.scaleY] set scale y
     * @param {Number} [config.rotation] rotation in degrees
     * @param {Object} [config.offset] offset from center point and rotation point
     * @param {Number} [config.offsetX] set offset x
     * @param {Number} [config.offsetY] set offset y
     * @param {Boolean} [config.draggable] makes the node draggable.  When stages are draggable, you can drag and drop
     *  the entire stage by dragging any portion of the stage
     * @param {Number} [config.dragDistance]
     * @param {Function} [config.dragBoundFunc]
   * @example
   * var imageObj = new Image();
   * imageObj.onload = function() {
   *   var image = new Konva.Image({
   *     x: 200,
   *     y: 50,
   *     image: imageObj,
   *     width: 100,
   *     height: 100
   *   });
   * };
   * imageObj.src = '/path/to/image.jpg'
   */
  Konva.Image = function(config) {
    this.___init(config);
  };

  Konva.Image.prototype = {
    ___init: function(config) {
      // call super constructor
      Konva.Shape.call(this, config);
      this.className = IMAGE;
      this.sceneFunc(this._sceneFunc);
      this.hitFunc(this._hitFunc);
    },
    _useBufferCanvas: function() {
      return (
        (this.hasShadow() || this.getAbsoluteOpacity() !== 1) &&
        this.hasStroke() &&
        this.getStage()
      );
    },
    _sceneFunc: function(context) {
      var width = this.getWidth(),
        height = this.getHeight(),
        image = this.getImage(),
        cropWidth,
        cropHeight,
        params;

      if (image) {
        cropWidth = this.getCropWidth();
        cropHeight = this.getCropHeight();
        if (cropWidth && cropHeight) {
          params = [
            image,
            this.getCropX(),
            this.getCropY(),
            cropWidth,
            cropHeight,
            0,
            0,
            width,
            height
          ];
        } else {
          params = [image, 0, 0, width, height];
        }
      }

      if (this.hasFill() || this.hasStroke()) {
        context.beginPath();
        context.rect(0, 0, width, height);
        context.closePath();
        context.fillStrokeShape(this);
      }

      if (image) {
        context.drawImage.apply(context, params);
      }
    },
    _hitFunc: function(context) {
      var width = this.getWidth(),
        height = this.getHeight();

      context.beginPath();
      context.rect(0, 0, width, height);
      context.closePath();
      context.fillStrokeShape(this);
    },
    getWidth: function() {
      var image = this.getImage();
      return this.attrs.width || (image ? image.width : 0);
    },
    getHeight: function() {
      var image = this.getImage();
      return this.attrs.height || (image ? image.height : 0);
    }
  };
  Konva.Util.extend(Konva.Image, Konva.Shape);

  // add getters setters
  Konva.Factory.addGetterSetter(Konva.Image, 'image');

  /**
   * set image
   * @name setImage
   * @method
   * @memberof Konva.Image.prototype
   * @param {Image} image
   */

  /**
   * get image
   * @name getImage
   * @method
   * @memberof Konva.Image.prototype
   * @returns {Image}
   */

  Konva.Factory.addComponentsGetterSetter(Konva.Image, 'crop', [
    'x',
    'y',
    'width',
    'height'
  ]);
  /**
   * get/set crop
   * @method
   * @name crop
   * @memberof Konva.Image.prototype
   * @param {Object} crop
   * @param {Number} crop.x
   * @param {Number} crop.y
   * @param {Number} crop.width
   * @param {Number} crop.height
   * @returns {Object}
   * @example
   * // get crop
   * var crop = image.crop();
   *
   * // set crop
   * image.crop({
   *   x: 20,
   *   y: 20,
   *   width: 20,
   *   height: 20
   * });
   */

  Konva.Factory.addGetterSetter(
    Konva.Image,
    'cropX',
    0,
    Konva.Validators.getNumberValidator()
  );
  /**
   * get/set crop x
   * @method
   * @name cropX
   * @memberof Konva.Image.prototype
   * @param {Number} x
   * @returns {Number}
   * @example
   * // get crop x
   * var cropX = image.cropX();
   *
   * // set crop x
   * image.cropX(20);
   */

  Konva.Factory.addGetterSetter(
    Konva.Image,
    'cropY',
    0,
    Konva.Validators.getNumberValidator()
  );
  /**
   * get/set crop y
   * @name cropY
   * @method
   * @memberof Konva.Image.prototype
   * @param {Number} y
   * @returns {Number}
   * @example
   * // get crop y
   * var cropY = image.cropY();
   *
   * // set crop y
   * image.cropY(20);
   */

  Konva.Factory.addGetterSetter(
    Konva.Image,
    'cropWidth',
    0,
    Konva.Validators.getNumberValidator()
  );
  /**
   * get/set crop width
   * @name cropWidth
   * @method
   * @memberof Konva.Image.prototype
   * @param {Number} width
   * @returns {Number}
   * @example
   * // get crop width
   * var cropWidth = image.cropWidth();
   *
   * // set crop width
   * image.cropWidth(20);
   */

  Konva.Factory.addGetterSetter(
    Konva.Image,
    'cropHeight',
    0,
    Konva.Validators.getNumberValidator()
  );
  /**
   * get/set crop height
   * @name cropHeight
   * @method
   * @memberof Konva.Image.prototype
   * @param {Number} height
   * @returns {Number}
   * @example
   * // get crop height
   * var cropHeight = image.cropHeight();
   *
   * // set crop height
   * image.cropHeight(20);
   */

  Konva.Collection.mapMethods(Konva.Image);

  /**
   * load image from given url and create `Konva.Image` instance
   * @method
   * @memberof Konva.Image
   * @param {String} url image source
   * @param {Function} callback with Konva.Image instance as first argument
   * @example
   *  Konva.Image.fromURL(imageURL, function(image){
   *    // image is Konva.Image instance
   *    layer.add(image);
   *    layer.draw();
   *  });
   */
  Konva.Image.fromURL = function(url, callback) {
    var img = new Image();
    img.onload = function() {
      var image = new Konva.Image({
        image: img
      });
      callback(image);
    };
    img.crossOrigin = 'Anonymous';
    img.src = url;
  };
})();

/*eslint-disable max-depth */
(function() {
  'use strict';
  // var isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
  // constants
  var AUTO = 'auto',
    //CANVAS = 'canvas',
    CENTER = 'center',
    JUSTIFY = 'justify',
    CHANGE_KONVA = 'Change.konva',
    CONTEXT_2D = '2d',
    DASH = '-',
    EMPTY_STRING = '',
    LEFT = 'left',
    TEXT = 'text',
    TEXT_UPPER = 'Text',
    TOP = 'top',
    BOTTOM = 'bottom',
    MIDDLE = 'middle',
    NORMAL = 'normal',
    PX_SPACE = 'px ',
    SPACE = ' ',
    RIGHT = 'right',
    WORD = 'word',
    CHAR = 'char',
    NONE = 'none',
    ELLIPSIS = '…',
    ATTR_CHANGE_LIST = [
      'fontFamily',
      'fontSize',
      'fontStyle',
      'fontVariant',
      'padding',
      'align',
      'verticalAlign',
      'lineHeight',
      'text',
      'width',
      'height',
      'wrap',
      'ellipsis',
      'letterSpacing'
    ],
    // cached variables
    attrChangeListLen = ATTR_CHANGE_LIST.length;
  var dummyContext;
  function getDummyContext() {
    if (dummyContext) {
      return dummyContext;
    }
    dummyContext = Konva.Util.createCanvasElement().getContext(CONTEXT_2D);
    return dummyContext;
  }

  /**
   * Text constructor
   * @constructor
   * @memberof Konva
   * @augments Konva.Shape
   * @param {Object} config
   * @param {String} [config.fontFamily] default is Arial
   * @param {Number} [config.fontSize] in pixels.  Default is 12
   * @param {String} [config.fontStyle] can be normal, bold, or italic.  Default is normal
   * @param {String} [config.fontVariant] can be normal or small-caps.  Default is normal
   * @param {String} config.text
   * @param {String} [config.align] can be left, center, or right
   * @param {String} [config.verticalAlign] can be top, middle or bottom
   * @param {Number} [config.padding]
   * @param {Number} [config.lineHeight] default is 1
   * @param {String} [config.wrap] can be word, char, or none. Default is word
   * @param {Boolean} [config.ellipsis] can be true or false. Default is false. if Konva.Text config is set to wrap="none" and ellipsis=true, then it will add "..." to the end
   * @param {String} [config.fill] fill color
     * @param {Image} [config.fillPatternImage] fill pattern image
     * @param {Number} [config.fillPatternX]
     * @param {Number} [config.fillPatternY]
     * @param {Object} [config.fillPatternOffset] object with x and y component
     * @param {Number} [config.fillPatternOffsetX] 
     * @param {Number} [config.fillPatternOffsetY] 
     * @param {Object} [config.fillPatternScale] object with x and y component
     * @param {Number} [config.fillPatternScaleX]
     * @param {Number} [config.fillPatternScaleY]
     * @param {Number} [config.fillPatternRotation]
     * @param {String} [config.fillPatternRepeat] can be "repeat", "repeat-x", "repeat-y", or "no-repeat".  The default is "no-repeat"
     * @param {Object} [config.fillLinearGradientStartPoint] object with x and y component
     * @param {Number} [config.fillLinearGradientStartPointX]
     * @param {Number} [config.fillLinearGradientStartPointY]
     * @param {Object} [config.fillLinearGradientEndPoint] object with x and y component
     * @param {Number} [config.fillLinearGradientEndPointX]
     * @param {Number} [config.fillLinearGradientEndPointY]
     * @param {Array} [config.fillLinearGradientColorStops] array of color stops
     * @param {Object} [config.fillRadialGradientStartPoint] object with x and y component
     * @param {Number} [config.fillRadialGradientStartPointX]
     * @param {Number} [config.fillRadialGradientStartPointY]
     * @param {Object} [config.fillRadialGradientEndPoint] object with x and y component
     * @param {Number} [config.fillRadialGradientEndPointX] 
     * @param {Number} [config.fillRadialGradientEndPointY] 
     * @param {Number} [config.fillRadialGradientStartRadius]
     * @param {Number} [config.fillRadialGradientEndRadius]
     * @param {Array} [config.fillRadialGradientColorStops] array of color stops
     * @param {Boolean} [config.fillEnabled] flag which enables or disables the fill.  The default value is true
     * @param {String} [config.fillPriority] can be color, linear-gradient, radial-graident, or pattern.  The default value is color.  The fillPriority property makes it really easy to toggle between different fill types.  For example, if you want to toggle between a fill color style and a fill pattern style, simply set the fill property and the fillPattern properties, and then use setFillPriority('color') to render the shape with a color fill, or use setFillPriority('pattern') to render the shape with the pattern fill configuration
     * @param {String} [config.stroke] stroke color
     * @param {Number} [config.strokeWidth] stroke width
     * @param {Boolean} [config.strokeHitEnabled] flag which enables or disables stroke hit region.  The default is true
     * @param {Boolean} [config.perfectDrawEnabled] flag which enables or disables using buffer canvas.  The default is true
     * @param {Boolean} [config.shadowForStrokeEnabled] flag which enables or disables shasow for stroke.  The default is true
     * @param {Boolean} [config.strokeScaleEnabled] flag which enables or disables stroke scale.  The default is true
     * @param {Boolean} [config.strokeEnabled] flag which enables or disables the stroke.  The default value is true
     * @param {String} [config.lineJoin] can be miter, round, or bevel.  The default
     *  is miter
     * @param {String} [config.lineCap] can be butt, round, or sqare.  The default
     *  is butt
     * @param {String} [config.shadowColor]
     * @param {Number} [config.shadowBlur]
     * @param {Object} [config.shadowOffset] object with x and y component
     * @param {Number} [config.shadowOffsetX]
     * @param {Number} [config.shadowOffsetY]
     * @param {Number} [config.shadowOpacity] shadow opacity.  Can be any real number
     *  between 0 and 1
     * @param {Boolean} [config.shadowEnabled] flag which enables or disables the shadow.  The default value is true
     * @param {Array} [config.dash]
     * @param {Boolean} [config.dashEnabled] flag which enables or disables the dashArray.  The default value is true
   * @param {Number} [config.x]
     * @param {Number} [config.y]
     * @param {Number} [config.width]
     * @param {Number} [config.height]
     * @param {Boolean} [config.visible]
     * @param {Boolean} [config.listening] whether or not the node is listening for events
     * @param {String} [config.id] unique id
     * @param {String} [config.name] non-unique name
     * @param {Number} [config.opacity] determines node opacity.  Can be any number between 0 and 1
     * @param {Object} [config.scale] set scale
     * @param {Number} [config.scaleX] set scale x
     * @param {Number} [config.scaleY] set scale y
     * @param {Number} [config.rotation] rotation in degrees
     * @param {Object} [config.offset] offset from center point and rotation point
     * @param {Number} [config.offsetX] set offset x
     * @param {Number} [config.offsetY] set offset y
     * @param {Boolean} [config.draggable] makes the node draggable.  When stages are draggable, you can drag and drop
     *  the entire stage by dragging any portion of the stage
     * @param {Number} [config.dragDistance]
     * @param {Function} [config.dragBoundFunc]
   * @example
   * var text = new Konva.Text({
   *   x: 10,
   *   y: 15,
   *   text: 'Simple Text',
   *   fontSize: 30,
   *   fontFamily: 'Calibri',
   *   fill: 'green'
   * });
   */
  Konva.Text = function(config) {
    this.___init(config);
  };
  function _fillFunc(context) {
    context.fillText(this.partialText, 0, 0);
  }
  function _strokeFunc(context) {
    context.strokeText(this.partialText, 0, 0);
  }

  Konva.Text.prototype = {
    ___init: function(config) {
      config = config || {};

      // set default color to black
      if (
        !config.fillLinearGradientColorStops &&
        !config.fillRadialGradientColorStops
      ) {
        config.fill = config.fill || 'black';
      }
      //
      // if (config.width === undefined) {
      //     config.width = AUTO;
      // }
      // if (config.height === undefined) {
      //     config.height = AUTO;
      // }

      // call super constructor
      Konva.Shape.call(this, config);

      this._fillFunc = _fillFunc;
      this._strokeFunc = _strokeFunc;
      this.className = TEXT_UPPER;

      // update text data for certain attr changes
      for (var n = 0; n < attrChangeListLen; n++) {
        this.on(ATTR_CHANGE_LIST[n] + CHANGE_KONVA, this._setTextData);
      }

      this._setTextData();
      this.sceneFunc(this._sceneFunc);
      this.hitFunc(this._hitFunc);
    },
    _sceneFunc: function(context) {
      var padding = this.getPadding(),
        textHeight = this.getTextHeight(),
        lineHeightPx = this.getLineHeight() * textHeight,
        textArr = this.textArr,
        textArrLen = textArr.length,
        verticalAlign = this.getVerticalAlign(),
        alignY = 0,
        align = this.getAlign(),
        totalWidth = this.getWidth(),
        letterSpacing = this.getLetterSpacing(),
        textDecoration = this.textDecoration(),
        fill = this.fill(),
        fontSize = this.fontSize(),
        n;

      context.setAttr('font', this._getContextFont());

      context.setAttr('textBaseline', MIDDLE);
      context.setAttr('textAlign', LEFT);

      // handle vertical alignment
      if (verticalAlign === MIDDLE) {
        alignY =
          (this.getHeight() - textArrLen * lineHeightPx - padding * 2) / 2;
      } else if (verticalAlign === BOTTOM) {
        alignY = this.getHeight() - textArrLen * lineHeightPx - padding * 2;
      }

      if (padding) {
        context.translate(padding, 0);
        context.translate(0, alignY + padding + lineHeightPx / 2);
      } else {
        context.translate(0, alignY + lineHeightPx / 2);
      }

      // draw text lines
      for (n = 0; n < textArrLen; n++) {
        var obj = textArr[n],
          text = obj.text,
          width = obj.width,
          lastLine = n !== textArrLen - 1,
          spacesNumber,
          oneWord,
          lineWidth;

        // horizontal alignment
        context.save();
        if (align === RIGHT) {
          context.translate(totalWidth - width - padding * 2, 0);
        } else if (align === CENTER) {
          context.translate((totalWidth - width - padding * 2) / 2, 0);
        }

        if (textDecoration.indexOf('underline') !== -1) {
          context.save();
          context.beginPath();

          context.moveTo(0, Math.round(lineHeightPx / 2));
          spacesNumber = text.split(' ').length - 1;
          oneWord = spacesNumber === 0;
          lineWidth =
            align === JUSTIFY && lastLine && !oneWord
              ? totalWidth - padding * 2
              : width;
          context.lineTo(Math.round(lineWidth), Math.round(lineHeightPx / 2));
          // TODO: I have no idea what is real ratio
          // just /15 looks good enough
          context.lineWidth = fontSize / 15;
          context.strokeStyle = fill;
          context.stroke();
          context.restore();
        }
        if (textDecoration.indexOf('line-through') !== -1) {
          context.save();
          context.beginPath();
          context.moveTo(0, 0);
          spacesNumber = text.split(' ').length - 1;
          oneWord = spacesNumber === 0;
          lineWidth =
            align === JUSTIFY && lastLine && !oneWord
              ? totalWidth - padding * 2
              : width;
          context.lineTo(Math.round(lineWidth), 0);
          context.lineWidth = fontSize / 15;
          context.strokeStyle = fill;
          context.stroke();
          context.restore();
        }
        if (letterSpacing !== 0 || align === JUSTIFY) {
          //   var words = text.split(' ');
          spacesNumber = text.split(' ').length - 1;
          for (var li = 0; li < text.length; li++) {
            var letter = text[li];
            // skip justify for the last line
            if (letter === ' ' && n !== textArrLen - 1 && align === JUSTIFY) {
              context.translate(
                Math.floor((totalWidth - padding * 2 - width) / spacesNumber),
                0
              );
            }
            this.partialText = letter;
            context.fillStrokeShape(this);
            context.translate(
              Math.round(this._getTextSize(letter).width) + letterSpacing,
              0
            );
          }
        } else {
          this.partialText = text;

          context.fillStrokeShape(this);
        }
        context.restore();
        if (textArrLen > 1) {
          context.translate(0, lineHeightPx);
        }
      }
    },
    _hitFunc: function(context) {
      var width = this.getWidth(),
        height = this.getHeight();

      context.beginPath();
      context.rect(0, 0, width, height);
      context.closePath();
      context.fillStrokeShape(this);
    },
    setText: function(text) {
      var str = Konva.Util._isString(text) ? text : (text || '').toString();
      this._setAttr(TEXT, str);
      return this;
    },
    /**
     * get width of text area, which includes padding
     * @method
     * @memberof Konva.Text.prototype
     * @returns {Number}
     */
    getWidth: function() {
      var isAuto = this.attrs.width === AUTO || this.attrs.width === undefined;
      return isAuto
        ? this.getTextWidth() + this.getPadding() * 2
        : this.attrs.width;
    },
    /**
     * get the height of the text area, which takes into account multi-line text, line heights, and padding
     * @method
     * @memberof Konva.Text.prototype
     * @returns {Number}
     */
    getHeight: function() {
      var isAuto =
        this.attrs.height === AUTO || this.attrs.height === undefined;
      return isAuto
        ? this.getTextHeight() * this.textArr.length * this.getLineHeight() +
            this.getPadding() * 2
        : this.attrs.height;
    },
    /**
     * get text width
     * @method
     * @memberof Konva.Text.prototype
     * @returns {Number}
     */
    getTextWidth: function() {
      return this.textWidth;
    },
    /**
     * get height of one line text
     * @method
     * @memberof Konva.Text.prototype
     * @returns {Number}
     */
    getTextHeight: function() {
      return this.textHeight;
    },
    _getTextSize: function(text) {
      var _context = getDummyContext(),
        fontSize = this.getFontSize(),
        metrics;

      _context.save();
      _context.font = this._getContextFont();

      metrics = _context.measureText(text);
      _context.restore();
      return {
        width: metrics.width,
        height: parseInt(fontSize, 10)
      };
    },
    _getContextFont: function() {
      // IE don't want to work with usual font style
      // bold was not working
      // removing font variant will solve
      // fix for: https://github.com/konvajs/konva/issues/94
      if (Konva.UA.isIE) {
        return (
          this.getFontStyle() +
          SPACE +
          this.getFontSize() +
          PX_SPACE +
          this.getFontFamily()
        );
      }
      return (
        this.getFontStyle() +
        SPACE +
        this.getFontVariant() +
        SPACE +
        this.getFontSize() +
        PX_SPACE +
        this.getFontFamily()
      );
    },
    _addTextLine: function(line) {
      if (this.align() === JUSTIFY) {
        line = line.trim();
      }
      var width = this._getTextWidth(line);
      return this.textArr.push({ text: line, width: width });
    },
    _getTextWidth: function(text) {
      var latterSpacing = this.getLetterSpacing();
      var length = text.length;
      return (
        getDummyContext().measureText(text).width +
        (length ? latterSpacing * (length - 1) : 0)
      );
    },
    _setTextData: function() {
      var lines = this.getText().split('\n'),
        fontSize = +this.getFontSize(),
        textWidth = 0,
        lineHeightPx = this.getLineHeight() * fontSize,
        width = this.attrs.width,
        height = this.attrs.height,
        fixedWidth = width !== AUTO,
        fixedHeight = height !== AUTO,
        padding = this.getPadding(),
        maxWidth = width - padding * 2,
        maxHeightPx = height - padding * 2,
        currentHeightPx = 0,
        wrap = this.getWrap(),
        // align = this.getAlign(),
        shouldWrap = wrap !== NONE,
        wrapAtWord = wrap !== CHAR && shouldWrap,
        shouldAddEllipsis = this.getEllipsis() && !shouldWrap;

      this.textArr = [];
      getDummyContext().font = this._getContextFont();
      for (var i = 0, max = lines.length; i < max; ++i) {
        var line = lines[i];
        var additionalWidth = shouldAddEllipsis
          ? this._getTextWidth(ELLIPSIS)
          : 0;

        var lineWidth = this._getTextWidth(line);
        if (fixedWidth && lineWidth > maxWidth) {
          /*
          * if width is fixed and line does not fit entirely
          * break the line into multiple fitting lines
          */
          while (line.length > 0) {
            /*
            * use binary search to find the longest substring that
            * that would fit in the specified width
            */
            var low = 0,
              high = line.length,
              match = '',
              matchWidth = 0;
            while (low < high) {
              var mid = (low + high) >>> 1,
                substr = line.slice(0, mid + 1),
                substrWidth = this._getTextWidth(substr) + additionalWidth;
              if (substrWidth <= maxWidth) {
                low = mid + 1;
                match = substr + (shouldAddEllipsis ? ELLIPSIS : '');
                matchWidth = substrWidth;
              } else {
                high = mid;
              }
            }
            /*
            * 'low' is now the index of the substring end
            * 'match' is the substring
            * 'matchWidth' is the substring width in px
            */
            if (match) {
              // a fitting substring was found
              if (wrapAtWord) {
                // try to find a space or dash where wrapping could be done
                var wrapIndex;
                var nextChar = line[match.length];
                var nextIsSpaceOrDash = nextChar === SPACE || nextChar === DASH;
                if (nextIsSpaceOrDash && matchWidth <= maxWidth) {
                  wrapIndex = match.length;
                } else {
                  wrapIndex =
                    Math.max(
                      match.lastIndexOf(SPACE),
                      match.lastIndexOf(DASH)
                    ) + 1;
                }
                if (wrapIndex > 0) {
                  // re-cut the substring found at the space/dash position
                  low = wrapIndex;
                  match = match.slice(0, low);
                  matchWidth = this._getTextWidth(match);
                }
              }
              // if (align === 'right') {
              match = Konva.Util.trimRight(match);
              // }
              this._addTextLine(match);
              textWidth = Math.max(textWidth, matchWidth);
              currentHeightPx += lineHeightPx;
              if (
                !shouldWrap ||
                (fixedHeight && currentHeightPx + lineHeightPx > maxHeightPx)
              ) {
                /*
                * stop wrapping if wrapping is disabled or if adding
                * one more line would overflow the fixed height
                */
                break;
              }
              line = line.slice(low);
              line = Konva.Util.trimLeft(line);
              if (line.length > 0) {
                // Check if the remaining text would fit on one line
                lineWidth = this._getTextWidth(line);
                if (lineWidth <= maxWidth) {
                  // if it does, add the line and break out of the loop
                  this._addTextLine(line);
                  currentHeightPx += lineHeightPx;
                  textWidth = Math.max(textWidth, lineWidth);
                  break;
                }
              }
            } else {
              // not even one character could fit in the element, abort
              break;
            }
          }
        } else {
          // element width is automatically adjusted to max line width
          this._addTextLine(line);
          currentHeightPx += lineHeightPx;
          textWidth = Math.max(textWidth, lineWidth);
        }
        // if element height is fixed, abort if adding one more line would overflow
        if (fixedHeight && currentHeightPx + lineHeightPx > maxHeightPx) {
          break;
        }
      }
      this.textHeight = fontSize;
      // var maxTextWidth = 0;
      // for(var j = 0; j < this.textArr.length; j++) {
      //     maxTextWidth = Math.max(maxTextWidth, this.textArr[j].width);
      // }
      this.textWidth = textWidth;
    }
  };
  Konva.Util.extend(Konva.Text, Konva.Shape);

  Konva.Factory.addSetter(
    Konva.Node,
    'width',
    Konva.Validators.getNumberOrAutoValidator()
  );

  Konva.Factory.addSetter(
    Konva.Node,
    'height',
    Konva.Validators.getNumberOrAutoValidator()
  );

  // add getters setters
  Konva.Factory.addGetterSetter(Konva.Text, 'fontFamily', 'Arial');

  /**
   * get/set font family
   * @name fontFamily
   * @method
   * @memberof Konva.Text.prototype
   * @param {String} fontFamily
   * @returns {String}
   * @example
   * // get font family
   * var fontFamily = text.fontFamily();
   *
   * // set font family
   * text.fontFamily('Arial');
   */

  Konva.Factory.addGetterSetter(
    Konva.Text,
    'fontSize',
    12,
    Konva.Validators.getNumberValidator()
  );

  /**
   * get/set font size in pixels
   * @name fontSize
   * @method
   * @memberof Konva.Text.prototype
   * @param {Number} fontSize
   * @returns {Number}
   * @example
   * // get font size
   * var fontSize = text.fontSize();
   *
   * // set font size to 22px
   * text.fontSize(22);
   */

  Konva.Factory.addGetterSetter(Konva.Text, 'fontStyle', NORMAL);

  /**
   * set font style.  Can be 'normal', 'italic', or 'bold'.  'normal' is the default.
   * @name fontStyle
   * @method
   * @memberof Konva.Text.prototype
   * @param {String} fontStyle
   * @returns {String}
   * @example
   * // get font style
   * var fontStyle = text.fontStyle();
   *
   * // set font style
   * text.fontStyle('bold');
   */

  Konva.Factory.addGetterSetter(Konva.Text, 'fontVariant', NORMAL);

  /**
   * set font variant.  Can be 'normal' or 'small-caps'.  'normal' is the default.
   * @name fontVariant
   * @method
   * @memberof Konva.Text.prototype
   * @param {String} fontVariant
   * @returns {String}
   * @example
   * // get font variant
   * var fontVariant = text.fontVariant();
   *
   * // set font variant
   * text.fontVariant('small-caps');
   */

  Konva.Factory.addGetterSetter(
    Konva.Text,
    'padding',
    0,
    Konva.Validators.getNumberValidator()
  );

  /**
   * set padding
   * @name padding
   * @method
   * @memberof Konva.Text.prototype
   * @param {Number} padding
   * @returns {Number}
   * @example
   * // get padding
   * var padding = text.padding();
   *
   * // set padding to 10 pixels
   * text.padding(10);
   */

  Konva.Factory.addGetterSetter(Konva.Text, 'align', LEFT);

  /**
   * get/set horizontal align of text.  Can be 'left', 'center', 'right' or 'justify'
   * @name align
   * @method
   * @memberof Konva.Text.prototype
   * @param {String} align
   * @returns {String}
   * @example
   * // get text align
   * var align = text.align();
   *
   * // center text
   * text.align('center');
   *
   * // align text to right
   * text.align('right');
   */

  Konva.Factory.addGetterSetter(Konva.Text, 'verticalAlign', TOP);

  /**
   * get/set vertical align of text.  Can be 'top', 'middle', 'bottom'.
   * @name verticalAlign
   * @method
   * @memberof Konva.Text.prototype
   * @param {String} verticalAlign
   * @returns {String}
   * @example
   * // get text vertical align
   * var verticalAlign = text.verticalAlign();
   *
   * // center text
   * text.verticalAlign('middle');
   */

  Konva.Factory.addGetterSetter(
    Konva.Text,
    'lineHeight',
    1,
    Konva.Validators.getNumberValidator()
  );

  /**
   * get/set line height.  The default is 1.
   * @name lineHeight
   * @method
   * @memberof Konva.Text.prototype
   * @param {Number} lineHeight
   * @returns {Number}
   * @example
   * // get line height
   * var lineHeight = text.lineHeight();
   *
   * // set the line height
   * text.lineHeight(2);
   */

  Konva.Factory.addGetterSetter(Konva.Text, 'wrap', WORD);

  /**
   * get/set wrap.  Can be word, char, or none. Default is word.
   * @name wrap
   * @method
   * @memberof Konva.Text.prototype
   * @param {String} wrap
   * @returns {String}
   * @example
   * // get wrap
   * var wrap = text.wrap();
   *
   * // set wrap
   * text.wrap('word');
   */

  Konva.Factory.addGetterSetter(Konva.Text, 'ellipsis', false);

  /**
   * get/set ellipsis.  Can be true or false. Default is false.
   * if Konva.Text config is set to wrap="none" and ellipsis=true, then it will add "..." to the end
   * @name ellipsis
   * @method
   * @memberof Konva.Text.prototype
   * @param {Boolean} ellipsis
   * @returns {Boolean}
   * @example
   * // get ellipsis
   * var ellipsis = text.ellipsis();
   *
   * // set ellipsis
   * text.ellipsis(true);
   */

  Konva.Factory.addGetterSetter(
    Konva.Text,
    'letterSpacing',
    0,
    Konva.Validators.getNumberValidator()
  );

  /**
   * set letter spacing property. Default value is 0.
   * @name letterSpacing
   * @method
   * @memberof Konva.TextPath.prototype
   * @param {Number} letterSpacing
   */

  Konva.Factory.addGetter(Konva.Text, 'text', EMPTY_STRING);
  Konva.Factory.addOverloadedGetterSetter(Konva.Text, 'text');

  /**
   * get/set text
   * @name getText
   * @method
   * @memberof Konva.Text.prototype
   * @param {String} text
   * @returns {String}
   * @example
   * // get text
   * var text = text.text();
   *
   * // set text
   * text.text('Hello world!');
   */

  Konva.Factory.addGetterSetter(Konva.Text, 'textDecoration', EMPTY_STRING);

  /**
   * get/set text decoration of a text.  Possible values are 'underline', 'line-through' or combination of these values separated by space
   * @name textDecoration
   * @method
   * @memberof Konva.Text.prototype
   * @param {String} textDecoration
   * @returns {String}
   * @example
   * // get text decoration
   * var textDecoration = text.textDecoration();
   *
   * // underline text
   * text.textDecoration('underline');
   *
   * // strike text
   * text.textDecoration('line-through');
   *
   * // underline and strike text
   * text.textDecoration('underline line-through');
   */

  Konva.Collection.mapMethods(Konva.Text);
})();

(function() {
  'use strict';
  /**
   * Line constructor.&nbsp; Lines are defined by an array of points and
   *  a tension
   * @constructor
   * @memberof Konva
   * @augments Konva.Shape
   * @param {Object} config
   * @param {Array} config.points Flat array of points coordinates. You should define them as [x1, y1, x2, y2, x3, y3].
   * @param {Number} [config.tension] Higher values will result in a more curvy line.  A value of 0 will result in no interpolation.
   *   The default is 0
   * @param {Boolean} [config.closed] defines whether or not the line shape is closed, creating a polygon or blob
   * @param {Boolean} [config.bezier] if no tension is provided but bezier=true, we draw the line as a bezier using the passed points
   * @param {String} [config.fill] fill color
     * @param {Image} [config.fillPatternImage] fill pattern image
     * @param {Number} [config.fillPatternX]
     * @param {Number} [config.fillPatternY]
     * @param {Object} [config.fillPatternOffset] object with x and y component
     * @param {Number} [config.fillPatternOffsetX] 
     * @param {Number} [config.fillPatternOffsetY] 
     * @param {Object} [config.fillPatternScale] object with x and y component
     * @param {Number} [config.fillPatternScaleX]
     * @param {Number} [config.fillPatternScaleY]
     * @param {Number} [config.fillPatternRotation]
     * @param {String} [config.fillPatternRepeat] can be "repeat", "repeat-x", "repeat-y", or "no-repeat".  The default is "no-repeat"
     * @param {Object} [config.fillLinearGradientStartPoint] object with x and y component
     * @param {Number} [config.fillLinearGradientStartPointX]
     * @param {Number} [config.fillLinearGradientStartPointY]
     * @param {Object} [config.fillLinearGradientEndPoint] object with x and y component
     * @param {Number} [config.fillLinearGradientEndPointX]
     * @param {Number} [config.fillLinearGradientEndPointY]
     * @param {Array} [config.fillLinearGradientColorStops] array of color stops
     * @param {Object} [config.fillRadialGradientStartPoint] object with x and y component
     * @param {Number} [config.fillRadialGradientStartPointX]
     * @param {Number} [config.fillRadialGradientStartPointY]
     * @param {Object} [config.fillRadialGradientEndPoint] object with x and y component
     * @param {Number} [config.fillRadialGradientEndPointX] 
     * @param {Number} [config.fillRadialGradientEndPointY] 
     * @param {Number} [config.fillRadialGradientStartRadius]
     * @param {Number} [config.fillRadialGradientEndRadius]
     * @param {Array} [config.fillRadialGradientColorStops] array of color stops
     * @param {Boolean} [config.fillEnabled] flag which enables or disables the fill.  The default value is true
     * @param {String} [config.fillPriority] can be color, linear-gradient, radial-graident, or pattern.  The default value is color.  The fillPriority property makes it really easy to toggle between different fill types.  For example, if you want to toggle between a fill color style and a fill pattern style, simply set the fill property and the fillPattern properties, and then use setFillPriority('color') to render the shape with a color fill, or use setFillPriority('pattern') to render the shape with the pattern fill configuration
     * @param {String} [config.stroke] stroke color
     * @param {Number} [config.strokeWidth] stroke width
     * @param {Boolean} [config.strokeHitEnabled] flag which enables or disables stroke hit region.  The default is true
     * @param {Boolean} [config.perfectDrawEnabled] flag which enables or disables using buffer canvas.  The default is true
     * @param {Boolean} [config.shadowForStrokeEnabled] flag which enables or disables shasow for stroke.  The default is true
     * @param {Boolean} [config.strokeScaleEnabled] flag which enables or disables stroke scale.  The default is true
     * @param {Boolean} [config.strokeEnabled] flag which enables or disables the stroke.  The default value is true
     * @param {String} [config.lineJoin] can be miter, round, or bevel.  The default
     *  is miter
     * @param {String} [config.lineCap] can be butt, round, or sqare.  The default
     *  is butt
     * @param {String} [config.shadowColor]
     * @param {Number} [config.shadowBlur]
     * @param {Object} [config.shadowOffset] object with x and y component
     * @param {Number} [config.shadowOffsetX]
     * @param {Number} [config.shadowOffsetY]
     * @param {Number} [config.shadowOpacity] shadow opacity.  Can be any real number
     *  between 0 and 1
     * @param {Boolean} [config.shadowEnabled] flag which enables or disables the shadow.  The default value is true
     * @param {Array} [config.dash]
     * @param {Boolean} [config.dashEnabled] flag which enables or disables the dashArray.  The default value is true
   * @param {Number} [config.x]
     * @param {Number} [config.y]
     * @param {Number} [config.width]
     * @param {Number} [config.height]
     * @param {Boolean} [config.visible]
     * @param {Boolean} [config.listening] whether or not the node is listening for events
     * @param {String} [config.id] unique id
     * @param {String} [config.name] non-unique name
     * @param {Number} [config.opacity] determines node opacity.  Can be any number between 0 and 1
     * @param {Object} [config.scale] set scale
     * @param {Number} [config.scaleX] set scale x
     * @param {Number} [config.scaleY] set scale y
     * @param {Number} [config.rotation] rotation in degrees
     * @param {Object} [config.offset] offset from center point and rotation point
     * @param {Number} [config.offsetX] set offset x
     * @param {Number} [config.offsetY] set offset y
     * @param {Boolean} [config.draggable] makes the node draggable.  When stages are draggable, you can drag and drop
     *  the entire stage by dragging any portion of the stage
     * @param {Number} [config.dragDistance]
     * @param {Function} [config.dragBoundFunc]
   * @example
   * var line = new Konva.Line({
   *   x: 100,
   *   y: 50,
   *   points: [73, 70, 340, 23, 450, 60, 500, 20],
   *   stroke: 'red',
   *   tension: 1
   * });
   */
  Konva.Line = function(config) {
    this.___init(config);
  };

  Konva.Line.prototype = {
    ___init: function(config) {
      // call super constructor
      Konva.Shape.call(this, config);
      this.className = 'Line';

      this.on(
        'pointsChange.konva tensionChange.konva closedChange.konva bezierChange.konva',
        function() {
          this._clearCache('tensionPoints');
        }
      );

      this.sceneFunc(this._sceneFunc);
    },
    _sceneFunc: function(context) {
      var points = this.getPoints(),
        length = points.length,
        tension = this.getTension(),
        closed = this.getClosed(),
        bezier = this.getBezier(),
        tp,
        len,
        n;

      if (!length) {
        return;
      }

      context.beginPath();
      context.moveTo(points[0], points[1]);

      // tension
      if (tension !== 0 && length > 4) {
        tp = this.getTensionPoints();
        len = tp.length;
        n = closed ? 0 : 4;

        if (!closed) {
          context.quadraticCurveTo(tp[0], tp[1], tp[2], tp[3]);
        }

        while (n < len - 2) {
          context.bezierCurveTo(
            tp[n++],
            tp[n++],
            tp[n++],
            tp[n++],
            tp[n++],
            tp[n++]
          );
        }

        if (!closed) {
          context.quadraticCurveTo(
            tp[len - 2],
            tp[len - 1],
            points[length - 2],
            points[length - 1]
          );
        }
      } else if (bezier) {
        // no tension but bezier
        n = 2;

        while (n < length) {
          context.bezierCurveTo(
            points[n++],
            points[n++],
            points[n++],
            points[n++],
            points[n++],
            points[n++]
          );
        }
      } else {
        // no tension
        for (n = 2; n < length; n += 2) {
          context.lineTo(points[n], points[n + 1]);
        }
      }

      // closed e.g. polygons and blobs
      if (closed) {
        context.closePath();
        context.fillStrokeShape(this);
      } else {
        // open e.g. lines and splines
        context.strokeShape(this);
      }
    },
    getTensionPoints: function() {
      return this._getCache('tensionPoints', this._getTensionPoints);
    },
    _getTensionPoints: function() {
      if (this.getClosed()) {
        return this._getTensionPointsClosed();
      } else {
        return Konva.Util._expandPoints(this.getPoints(), this.getTension());
      }
    },
    _getTensionPointsClosed: function() {
      var p = this.getPoints(),
        len = p.length,
        tension = this.getTension(),
        util = Konva.Util,
        firstControlPoints = util._getControlPoints(
          p[len - 2],
          p[len - 1],
          p[0],
          p[1],
          p[2],
          p[3],
          tension
        ),
        lastControlPoints = util._getControlPoints(
          p[len - 4],
          p[len - 3],
          p[len - 2],
          p[len - 1],
          p[0],
          p[1],
          tension
        ),
        middle = Konva.Util._expandPoints(p, tension),
        tp = [firstControlPoints[2], firstControlPoints[3]]
          .concat(middle)
          .concat([
            lastControlPoints[0],
            lastControlPoints[1],
            p[len - 2],
            p[len - 1],
            lastControlPoints[2],
            lastControlPoints[3],
            firstControlPoints[0],
            firstControlPoints[1],
            p[0],
            p[1]
          ]);

      return tp;
    },
    getWidth: function() {
      return this.getSelfRect().width;
    },
    getHeight: function() {
      return this.getSelfRect().height;
    },
    // overload size detection
    getSelfRect: function() {
      var points;
      if (this.getTension() !== 0) {
        points = this._getTensionPoints();
      } else {
        points = this.getPoints();
      }
      var minX = points[0];
      var maxX = points[0];
      var minY = points[1];
      var maxY = points[1];
      var x, y;
      for (var i = 0; i < points.length / 2; i++) {
        x = points[i * 2];
        y = points[i * 2 + 1];
        minX = Math.min(minX, x);
        maxX = Math.max(maxX, x);
        minY = Math.min(minY, y);
        maxY = Math.max(maxY, y);
      }
      return {
        x: Math.round(minX),
        y: Math.round(minY),
        width: Math.round(maxX - minX),
        height: Math.round(maxY - minY)
      };
    }
  };
  Konva.Util.extend(Konva.Line, Konva.Shape);

  // add getters setters
  Konva.Factory.addGetterSetter(Konva.Line, 'closed', false);

  /**
   * get/set closed flag.  The default is false
   * @name closed
   * @method
   * @memberof Konva.Line.prototype
   * @param {Boolean} closed
   * @returns {Boolean}
   * @example
   * // get closed flag
   * var closed = line.closed();
   *
   * // close the shape
   * line.closed(true);
   *
   * // open the shape
   * line.closed(false);
   */

  Konva.Factory.addGetterSetter(Konva.Line, 'bezier', false);

  /**
   * get/set bezier flag.  The default is false
   * @name bezier
   * @method
   * @memberof Konva.Line.prototype
   * @param {Boolean} bezier
   * @returns {Boolean}
   * @example
   * // get whether the line is a bezier
   * var isBezier = line.bezier();
   *
   * // set whether the line is a bezier
   * line.bezier(true);
   */

  Konva.Factory.addGetterSetter(
    Konva.Line,
    'tension',
    0,
    Konva.Validators.getNumberValidator()
  );

  /**
   * get/set tension
   * @name tension
   * @method
   * @memberof Konva.Line.prototype
   * @param {Number} Higher values will result in a more curvy line.  A value of 0 will result in no interpolation.
   *   The default is 0
   * @returns {Number}
   * @example
   * // get tension
   * var tension = line.tension();
   *
   * // set tension
   * line.tension(3);
   */

  Konva.Factory.addGetterSetter(
    Konva.Line,
    'points',
    [],
    Konva.Validators.getNumberArrayValidator()
  );
  /**
   * get/set points array
   * @name points
   * @method
   * @memberof Konva.Line.prototype
   * @param {Array} points
   * @returns {Array}
   * @example
   * // get points
   * var points = line.points();
   *
   * // set points
   * line.points([10, 20, 30, 40, 50, 60]);
   *
   * // push a new point
   * line.points(line.points().concat([70, 80]));
   */

  Konva.Collection.mapMethods(Konva.Line);
})();

(function() {
  'use strict';
  /**
   * Sprite constructor
   * @constructor
   * @memberof Konva
   * @augments Konva.Shape
   * @param {Object} config
   * @param {String} config.animation animation key
   * @param {Object} config.animations animation map
   * @param {Integer} [config.frameIndex] animation frame index
   * @param {Image} config.image image object
   * @param {Integer} [config.frameRate] animation frame rate
   * @param {String} [config.fill] fill color
     * @param {Image} [config.fillPatternImage] fill pattern image
     * @param {Number} [config.fillPatternX]
     * @param {Number} [config.fillPatternY]
     * @param {Object} [config.fillPatternOffset] object with x and y component
     * @param {Number} [config.fillPatternOffsetX] 
     * @param {Number} [config.fillPatternOffsetY] 
     * @param {Object} [config.fillPatternScale] object with x and y component
     * @param {Number} [config.fillPatternScaleX]
     * @param {Number} [config.fillPatternScaleY]
     * @param {Number} [config.fillPatternRotation]
     * @param {String} [config.fillPatternRepeat] can be "repeat", "repeat-x", "repeat-y", or "no-repeat".  The default is "no-repeat"
     * @param {Object} [config.fillLinearGradientStartPoint] object with x and y component
     * @param {Number} [config.fillLinearGradientStartPointX]
     * @param {Number} [config.fillLinearGradientStartPointY]
     * @param {Object} [config.fillLinearGradientEndPoint] object with x and y component
     * @param {Number} [config.fillLinearGradientEndPointX]
     * @param {Number} [config.fillLinearGradientEndPointY]
     * @param {Array} [config.fillLinearGradientColorStops] array of color stops
     * @param {Object} [config.fillRadialGradientStartPoint] object with x and y component
     * @param {Number} [config.fillRadialGradientStartPointX]
     * @param {Number} [config.fillRadialGradientStartPointY]
     * @param {Object} [config.fillRadialGradientEndPoint] object with x and y component
     * @param {Number} [config.fillRadialGradientEndPointX] 
     * @param {Number} [config.fillRadialGradientEndPointY] 
     * @param {Number} [config.fillRadialGradientStartRadius]
     * @param {Number} [config.fillRadialGradientEndRadius]
     * @param {Array} [config.fillRadialGradientColorStops] array of color stops
     * @param {Boolean} [config.fillEnabled] flag which enables or disables the fill.  The default value is true
     * @param {String} [config.fillPriority] can be color, linear-gradient, radial-graident, or pattern.  The default value is color.  The fillPriority property makes it really easy to toggle between different fill types.  For example, if you want to toggle between a fill color style and a fill pattern style, simply set the fill property and the fillPattern properties, and then use setFillPriority('color') to render the shape with a color fill, or use setFillPriority('pattern') to render the shape with the pattern fill configuration
     * @param {String} [config.stroke] stroke color
     * @param {Number} [config.strokeWidth] stroke width
     * @param {Boolean} [config.strokeHitEnabled] flag which enables or disables stroke hit region.  The default is true
     * @param {Boolean} [config.perfectDrawEnabled] flag which enables or disables using buffer canvas.  The default is true
     * @param {Boolean} [config.shadowForStrokeEnabled] flag which enables or disables shasow for stroke.  The default is true
     * @param {Boolean} [config.strokeScaleEnabled] flag which enables or disables stroke scale.  The default is true
     * @param {Boolean} [config.strokeEnabled] flag which enables or disables the stroke.  The default value is true
     * @param {String} [config.lineJoin] can be miter, round, or bevel.  The default
     *  is miter
     * @param {String} [config.lineCap] can be butt, round, or sqare.  The default
     *  is butt
     * @param {String} [config.shadowColor]
     * @param {Number} [config.shadowBlur]
     * @param {Object} [config.shadowOffset] object with x and y component
     * @param {Number} [config.shadowOffsetX]
     * @param {Number} [config.shadowOffsetY]
     * @param {Number} [config.shadowOpacity] shadow opacity.  Can be any real number
     *  between 0 and 1
     * @param {Boolean} [config.shadowEnabled] flag which enables or disables the shadow.  The default value is true
     * @param {Array} [config.dash]
     * @param {Boolean} [config.dashEnabled] flag which enables or disables the dashArray.  The default value is true
   * @param {Number} [config.x]
     * @param {Number} [config.y]
     * @param {Number} [config.width]
     * @param {Number} [config.height]
     * @param {Boolean} [config.visible]
     * @param {Boolean} [config.listening] whether or not the node is listening for events
     * @param {String} [config.id] unique id
     * @param {String} [config.name] non-unique name
     * @param {Number} [config.opacity] determines node opacity.  Can be any number between 0 and 1
     * @param {Object} [config.scale] set scale
     * @param {Number} [config.scaleX] set scale x
     * @param {Number} [config.scaleY] set scale y
     * @param {Number} [config.rotation] rotation in degrees
     * @param {Object} [config.offset] offset from center point and rotation point
     * @param {Number} [config.offsetX] set offset x
     * @param {Number} [config.offsetY] set offset y
     * @param {Boolean} [config.draggable] makes the node draggable.  When stages are draggable, you can drag and drop
     *  the entire stage by dragging any portion of the stage
     * @param {Number} [config.dragDistance]
     * @param {Function} [config.dragBoundFunc]
   * @example
   * var imageObj = new Image();
   * imageObj.onload = function() {
   *   var sprite = new Konva.Sprite({
   *     x: 200,
   *     y: 100,
   *     image: imageObj,
   *     animation: 'standing',
   *     animations: {
   *       standing: [
   *         // x, y, width, height (6 frames)
   *         0, 0, 49, 109,
   *         52, 0, 49, 109,
   *         105, 0, 49, 109,
   *         158, 0, 49, 109,
   *         210, 0, 49, 109,
   *         262, 0, 49, 109
   *       ],
   *       kicking: [
   *         // x, y, width, height (6 frames)
   *         0, 109, 45, 98,
   *         45, 109, 45, 98,
   *         95, 109, 63, 98,
   *         156, 109, 70, 98,
   *         229, 109, 60, 98,
   *         287, 109, 41, 98
   *       ]
   *     },
   *     frameRate: 7,
   *     frameIndex: 0
   *   });
   * };
   * imageObj.src = '/path/to/image.jpg'
   */
  Konva.Sprite = function(config) {
    this.___init(config);
  };

  Konva.Sprite.prototype = {
    ___init: function(config) {
      // call super constructor
      Konva.Shape.call(this, config);
      this.className = 'Sprite';

      this._updated = true;
      var that = this;
      this.anim = new Konva.Animation(function() {
        // if we don't need to redraw layer we should return false
        var updated = that._updated;
        that._updated = false;
        return updated;
      });
      this.on('animationChange.konva', function() {
        // reset index when animation changes
        this.frameIndex(0);
      });
      this.on('frameIndexChange.konva', function() {
        this._updated = true;
      });
      // smooth change for frameRate
      this.on('frameRateChange.konva', function() {
        if (!this.anim.isRunning()) {
          return;
        }
        clearInterval(this.interval);
        this._setInterval();
      });

      this.sceneFunc(this._sceneFunc);
      this.hitFunc(this._hitFunc);
    },
    _sceneFunc: function(context) {
      var anim = this.getAnimation(),
        index = this.frameIndex(),
        ix4 = index * 4,
        set = this.getAnimations()[anim],
        offsets = this.frameOffsets(),
        x = set[ix4 + 0],
        y = set[ix4 + 1],
        width = set[ix4 + 2],
        height = set[ix4 + 3],
        image = this.getImage();

      if (this.hasFill() || this.hasStroke()) {
        context.beginPath();
        context.rect(0, 0, width, height);
        context.closePath();
        context.fillStrokeShape(this);
      }

      if (image) {
        if (offsets) {
          var offset = offsets[anim],
            ix2 = index * 2;
          context.drawImage(
            image,
            x,
            y,
            width,
            height,
            offset[ix2 + 0],
            offset[ix2 + 1],
            width,
            height
          );
        } else {
          context.drawImage(image, x, y, width, height, 0, 0, width, height);
        }
      }
    },
    _hitFunc: function(context) {
      var anim = this.getAnimation(),
        index = this.frameIndex(),
        ix4 = index * 4,
        set = this.getAnimations()[anim],
        offsets = this.frameOffsets(),
        width = set[ix4 + 2],
        height = set[ix4 + 3];

      context.beginPath();
      if (offsets) {
        var offset = offsets[anim];
        var ix2 = index * 2;
        context.rect(offset[ix2 + 0], offset[ix2 + 1], width, height);
      } else {
        context.rect(0, 0, width, height);
      }
      context.closePath();
      context.fillShape(this);
    },
    _useBufferCanvas: function() {
      return (
        (this.hasShadow() || this.getAbsoluteOpacity() !== 1) &&
        this.hasStroke()
      );
    },
    _setInterval: function() {
      var that = this;
      this.interval = setInterval(function() {
        that._updateIndex();
      }, 1000 / this.getFrameRate());
    },
    /**
     * start sprite animation
     * @method
     * @memberof Konva.Sprite.prototype
     */
    start: function() {
      if (this.isRunning()) {
        return;
      }
      var layer = this.getLayer();

      /*
             * animation object has no executable function because
             *  the updates are done with a fixed FPS with the setInterval
             *  below.  The anim object only needs the layer reference for
             *  redraw
             */
      this.anim.setLayers(layer);
      this._setInterval();
      this.anim.start();
    },
    /**
     * stop sprite animation
     * @method
     * @memberof Konva.Sprite.prototype
     */
    stop: function() {
      this.anim.stop();
      clearInterval(this.interval);
    },
    /**
     * determine if animation of sprite is running or not.  returns true or false
     * @method
     * @memberof Konva.Animation.prototype
     * @returns {Boolean}
     */
    isRunning: function() {
      return this.anim.isRunning();
    },
    _updateIndex: function() {
      var index = this.frameIndex(),
        animation = this.getAnimation(),
        animations = this.getAnimations(),
        anim = animations[animation],
        len = anim.length / 4;

      if (index < len - 1) {
        this.frameIndex(index + 1);
      } else {
        this.frameIndex(0);
      }
    }
  };
  Konva.Util.extend(Konva.Sprite, Konva.Shape);

  // add getters setters
  Konva.Factory.addGetterSetter(Konva.Sprite, 'animation');

  /**
   * get/set animation key
   * @name animation
   * @method
   * @memberof Konva.Sprite.prototype
   * @param {String} anim animation key
   * @returns {String}
   * @example
   * // get animation key
   * var animation = sprite.animation();
   *
   * // set animation key
   * sprite.animation('kicking');
   */

  Konva.Factory.addGetterSetter(Konva.Sprite, 'animations');

  /**
   * get/set animations map
   * @name animations
   * @method
   * @memberof Konva.Sprite.prototype
   * @param {Object} animations
   * @returns {Object}
   * @example
   * // get animations map
   * var animations = sprite.animations();
   *
   * // set animations map
   * sprite.animations({
   *   standing: [
   *     // x, y, width, height (6 frames)
   *     0, 0, 49, 109,
   *     52, 0, 49, 109,
   *     105, 0, 49, 109,
   *     158, 0, 49, 109,
   *     210, 0, 49, 109,
   *     262, 0, 49, 109
   *   ],
   *   kicking: [
   *     // x, y, width, height (6 frames)
   *     0, 109, 45, 98,
   *     45, 109, 45, 98,
   *     95, 109, 63, 98,
   *     156, 109, 70, 98,
   *     229, 109, 60, 98,
   *     287, 109, 41, 98
   *   ]
   * });
   */

  Konva.Factory.addGetterSetter(Konva.Sprite, 'frameOffsets');

  /**
   * get/set offsets map
   * @name offsets
   * @method
   * @memberof Konva.Sprite.prototype
   * @param {Object} offsets
   * @returns {Object}
   * @example
   * // get offsets map
   * var offsets = sprite.offsets();
   *
   * // set offsets map
   * sprite.offsets({
   *   standing: [
   *     // x, y (6 frames)
   *     0, 0,
   *     0, 0,
   *     5, 0,
   *     0, 0,
   *     0, 3,
   *     2, 0
   *   ],
   *   kicking: [
   *     // x, y (6 frames)
   *     0, 5,
   *     5, 0,
   *     10, 0,
   *     0, 0,
   *     2, 1,
   *     0, 0
   *   ]
   * });
   */

  Konva.Factory.addGetterSetter(Konva.Sprite, 'image');

  /**
   * get/set image
   * @name image
   * @method
   * @memberof Konva.Sprite.prototype
   * @param {Image} image
   * @returns {Image}
   * @example
   * // get image
   * var image = sprite.image();
   *
   * // set image
   * sprite.image(imageObj);
   */

  Konva.Factory.addGetterSetter(
    Konva.Sprite,
    'frameIndex',
    0,
    Konva.Validators.getNumberValidator()
  );

  /**
   * set/set animation frame index
   * @name frameIndex
   * @method
   * @memberof Konva.Sprite.prototype
   * @param {Integer} frameIndex
   * @returns {Integer}
   * @example
   * // get animation frame index
   * var frameIndex = sprite.frameIndex();
   *
   * // set animation frame index
   * sprite.frameIndex(3);
   */

  Konva.Factory.addGetterSetter(
    Konva.Sprite,
    'frameRate',
    17,
    Konva.Validators.getNumberValidator()
  );

  /**
   * get/set frame rate in frames per second.  Increase this number to make the sprite
   *  animation run faster, and decrease the number to make the sprite animation run slower
   *  The default is 17 frames per second
   * @name frameRate
   * @method
   * @memberof Konva.Sprite.prototype
   * @param {Integer} frameRate
   * @returns {Integer}
   * @example
   * // get frame rate
   * var frameRate = sprite.frameRate();
   *
   * // set frame rate to 2 frames per second
   * sprite.frameRate(2);
   */

  Konva.Factory.backCompat(Konva.Sprite, {
    index: 'frameIndex',
    getIndex: 'getFrameIndex',
    setIndex: 'setFrameIndex'
  });

  Konva.Collection.mapMethods(Konva.Sprite);
})();

/*eslint-disable  no-shadow, max-len, max-depth */
(function() {
  'use strict';
  /**
   * Path constructor.
   * @author Jason Follas
   * @constructor
   * @memberof Konva
   * @augments Konva.Shape
   * @param {Object} config
   * @param {String} config.data SVG data string
   * @param {String} [config.fill] fill color
     * @param {Image} [config.fillPatternImage] fill pattern image
     * @param {Number} [config.fillPatternX]
     * @param {Number} [config.fillPatternY]
     * @param {Object} [config.fillPatternOffset] object with x and y component
     * @param {Number} [config.fillPatternOffsetX] 
     * @param {Number} [config.fillPatternOffsetY] 
     * @param {Object} [config.fillPatternScale] object with x and y component
     * @param {Number} [config.fillPatternScaleX]
     * @param {Number} [config.fillPatternScaleY]
     * @param {Number} [config.fillPatternRotation]
     * @param {String} [config.fillPatternRepeat] can be "repeat", "repeat-x", "repeat-y", or "no-repeat".  The default is "no-repeat"
     * @param {Object} [config.fillLinearGradientStartPoint] object with x and y component
     * @param {Number} [config.fillLinearGradientStartPointX]
     * @param {Number} [config.fillLinearGradientStartPointY]
     * @param {Object} [config.fillLinearGradientEndPoint] object with x and y component
     * @param {Number} [config.fillLinearGradientEndPointX]
     * @param {Number} [config.fillLinearGradientEndPointY]
     * @param {Array} [config.fillLinearGradientColorStops] array of color stops
     * @param {Object} [config.fillRadialGradientStartPoint] object with x and y component
     * @param {Number} [config.fillRadialGradientStartPointX]
     * @param {Number} [config.fillRadialGradientStartPointY]
     * @param {Object} [config.fillRadialGradientEndPoint] object with x and y component
     * @param {Number} [config.fillRadialGradientEndPointX] 
     * @param {Number} [config.fillRadialGradientEndPointY] 
     * @param {Number} [config.fillRadialGradientStartRadius]
     * @param {Number} [config.fillRadialGradientEndRadius]
     * @param {Array} [config.fillRadialGradientColorStops] array of color stops
     * @param {Boolean} [config.fillEnabled] flag which enables or disables the fill.  The default value is true
     * @param {String} [config.fillPriority] can be color, linear-gradient, radial-graident, or pattern.  The default value is color.  The fillPriority property makes it really easy to toggle between different fill types.  For example, if you want to toggle between a fill color style and a fill pattern style, simply set the fill property and the fillPattern properties, and then use setFillPriority('color') to render the shape with a color fill, or use setFillPriority('pattern') to render the shape with the pattern fill configuration
     * @param {String} [config.stroke] stroke color
     * @param {Number} [config.strokeWidth] stroke width
     * @param {Boolean} [config.strokeHitEnabled] flag which enables or disables stroke hit region.  The default is true
     * @param {Boolean} [config.perfectDrawEnabled] flag which enables or disables using buffer canvas.  The default is true
     * @param {Boolean} [config.shadowForStrokeEnabled] flag which enables or disables shasow for stroke.  The default is true
     * @param {Boolean} [config.strokeScaleEnabled] flag which enables or disables stroke scale.  The default is true
     * @param {Boolean} [config.strokeEnabled] flag which enables or disables the stroke.  The default value is true
     * @param {String} [config.lineJoin] can be miter, round, or bevel.  The default
     *  is miter
     * @param {String} [config.lineCap] can be butt, round, or sqare.  The default
     *  is butt
     * @param {String} [config.shadowColor]
     * @param {Number} [config.shadowBlur]
     * @param {Object} [config.shadowOffset] object with x and y component
     * @param {Number} [config.shadowOffsetX]
     * @param {Number} [config.shadowOffsetY]
     * @param {Number} [config.shadowOpacity] shadow opacity.  Can be any real number
     *  between 0 and 1
     * @param {Boolean} [config.shadowEnabled] flag which enables or disables the shadow.  The default value is true
     * @param {Array} [config.dash]
     * @param {Boolean} [config.dashEnabled] flag which enables or disables the dashArray.  The default value is true
   * @param {Number} [config.x]
     * @param {Number} [config.y]
     * @param {Number} [config.width]
     * @param {Number} [config.height]
     * @param {Boolean} [config.visible]
     * @param {Boolean} [config.listening] whether or not the node is listening for events
     * @param {String} [config.id] unique id
     * @param {String} [config.name] non-unique name
     * @param {Number} [config.opacity] determines node opacity.  Can be any number between 0 and 1
     * @param {Object} [config.scale] set scale
     * @param {Number} [config.scaleX] set scale x
     * @param {Number} [config.scaleY] set scale y
     * @param {Number} [config.rotation] rotation in degrees
     * @param {Object} [config.offset] offset from center point and rotation point
     * @param {Number} [config.offsetX] set offset x
     * @param {Number} [config.offsetY] set offset y
     * @param {Boolean} [config.draggable] makes the node draggable.  When stages are draggable, you can drag and drop
     *  the entire stage by dragging any portion of the stage
     * @param {Number} [config.dragDistance]
     * @param {Function} [config.dragBoundFunc]
   * @example
   * var path = new Konva.Path({
   *   x: 240,
   *   y: 40,
   *   data: 'M12.582,9.551C3.251,16.237,0.921,29.021,7.08,38.564l-2.36,1.689l4.893,2.262l4.893,2.262l-0.568-5.36l-0.567-5.359l-2.365,1.694c-4.657-7.375-2.83-17.185,4.352-22.33c7.451-5.338,17.817-3.625,23.156,3.824c5.337,7.449,3.625,17.813-3.821,23.152l2.857,3.988c9.617-6.893,11.827-20.277,4.935-29.896C35.591,4.87,22.204,2.658,12.582,9.551z',
   *   fill: 'green',
   *   scale: 2
   * });
   */
  Konva.Path = function(config) {
    this.___init(config);
  };

  Konva.Path.prototype = {
    ___init: function(config) {
      this.dataArray = [];
      var that = this;

      // call super constructor
      Konva.Shape.call(this, config);
      this.className = 'Path';

      this.dataArray = Konva.Path.parsePathData(this.getData());
      this.pathLength = 0;
      for (var i = 0; i < this.dataArray.length; ++i) {
        this.pathLength += this.dataArray[i].pathLength;
      }
      this.on('dataChange.konva', function() {
        that.dataArray = Konva.Path.parsePathData(this.getData());
        this.pathLength = 0;
        for (var i = 0; i < this.dataArray.length; ++i) {
          this.pathLength += this.dataArray[i].pathLength;
        }
      });

      this.sceneFunc(this._sceneFunc);
    },
    _sceneFunc: function(context) {
      var ca = this.dataArray;

      // context position
      context.beginPath();
      for (var n = 0; n < ca.length; n++) {
        var c = ca[n].command;
        var p = ca[n].points;
        switch (c) {
          case 'L':
            context.lineTo(p[0], p[1]);
            break;
          case 'M':
            context.moveTo(p[0], p[1]);
            break;
          case 'C':
            context.bezierCurveTo(p[0], p[1], p[2], p[3], p[4], p[5]);
            break;
          case 'Q':
            context.quadraticCurveTo(p[0], p[1], p[2], p[3]);
            break;
          case 'A':
            var cx = p[0],
              cy = p[1],
              rx = p[2],
              ry = p[3],
              theta = p[4],
              dTheta = p[5],
              psi = p[6],
              fs = p[7];

            var r = rx > ry ? rx : ry;
            var scaleX = rx > ry ? 1 : rx / ry;
            var scaleY = rx > ry ? ry / rx : 1;

            context.translate(cx, cy);
            context.rotate(psi);
            context.scale(scaleX, scaleY);
            context.arc(0, 0, r, theta, theta + dTheta, 1 - fs);
            context.scale(1 / scaleX, 1 / scaleY);
            context.rotate(-psi);
            context.translate(-cx, -cy);

            break;
          case 'z':
            context.closePath();
            break;
        }
      }

      context.fillStrokeShape(this);
    },
    getSelfRect: function() {
      var points = [];
      this.dataArray.forEach(function(data) {
        points = points.concat(data.points);
      });
      var minX = points[0];
      var maxX = points[0];
      var minY = points[1];
      var maxY = points[1];
      var x, y;
      for (var i = 0; i < points.length / 2; i++) {
        x = points[i * 2];
        y = points[i * 2 + 1];

        // skip bad values
        // TODO: prevent them from parsing function
        if (!isNaN(x)) {
          minX = Math.min(minX, x);
          maxX = Math.max(maxX, x);
        }
        if (!isNaN(y)) {
          minY = Math.min(minY, y);
          maxY = Math.max(maxY, y);
        }
      }
      return {
        x: Math.round(minX),
        y: Math.round(minY),
        width: Math.round(maxX - minX),
        height: Math.round(maxY - minY)
      };
    },
    /**
     * Return length of the path.
     * @method
     * @memberof Konva.Path.prototype
     * @returns {Number} length
     * @example
     * var length = path.getLength();
     */
    getLength: function() {
      return this.pathLength;
    },
    /**
     * Get point on path at specific length of the path
     * @method
     * @memberof Konva.Path.prototype
     * @param {Number} length length
     * @returns {Object} point {x,y} point
     * @example
     * var point = path.getPointAtLength(10);
     */
    getPointAtLength: function(length) {
      var point,
        i = 0,
        ii = this.dataArray.length;

      if (!ii) {
        return null;
      }

      while (i < ii && length > this.dataArray[i].pathLength) {
        length -= this.dataArray[i].pathLength;
        ++i;
      }

      if (i === ii) {
        point = this.dataArray[i - 1].points.slice(-2);
        return {
          x: point[0],
          y: point[1]
        };
      }

      if (length < 0.01) {
        point = this.dataArray[i].points.slice(0, 2);
        return {
          x: point[0],
          y: point[1]
        };
      }

      var cp = this.dataArray[i];
      var p = cp.points;
      switch (cp.command) {
        case 'L':
          return Konva.Path.getPointOnLine(
            length,
            cp.start.x,
            cp.start.y,
            p[0],
            p[1]
          );
        case 'C':
          return Konva.Path.getPointOnCubicBezier(
            length / cp.pathLength,
            cp.start.x,
            cp.start.y,
            p[0],
            p[1],
            p[2],
            p[3],
            p[4],
            p[5]
          );
        case 'Q':
          return Konva.Path.getPointOnQuadraticBezier(
            length / cp.pathLength,
            cp.start.x,
            cp.start.y,
            p[0],
            p[1],
            p[2],
            p[3]
          );
        case 'A':
          var cx = p[0],
            cy = p[1],
            rx = p[2],
            ry = p[3],
            theta = p[4],
            dTheta = p[5],
            psi = p[6];
          theta += dTheta * length / cp.pathLength;
          return Konva.Path.getPointOnEllipticalArc(cx, cy, rx, ry, theta, psi);
      }

      return null;
    }
  };
  Konva.Util.extend(Konva.Path, Konva.Shape);

  Konva.Path.getLineLength = function(x1, y1, x2, y2) {
    return Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
  };
  Konva.Path.getPointOnLine = function(dist, P1x, P1y, P2x, P2y, fromX, fromY) {
    if (fromX === undefined) {
      fromX = P1x;
    }
    if (fromY === undefined) {
      fromY = P1y;
    }

    var m = (P2y - P1y) / (P2x - P1x + 0.00000001);
    var run = Math.sqrt(dist * dist / (1 + m * m));
    if (P2x < P1x) {
      run *= -1;
    }
    var rise = m * run;
    var pt;

    if (P2x === P1x) {
      // vertical line
      pt = {
        x: fromX,
        y: fromY + rise
      };
    } else if ((fromY - P1y) / (fromX - P1x + 0.00000001) === m) {
      pt = {
        x: fromX + run,
        y: fromY + rise
      };
    } else {
      var ix, iy;

      var len = this.getLineLength(P1x, P1y, P2x, P2y);
      if (len < 0.00000001) {
        return undefined;
      }
      var u = (fromX - P1x) * (P2x - P1x) + (fromY - P1y) * (P2y - P1y);
      u = u / (len * len);
      ix = P1x + u * (P2x - P1x);
      iy = P1y + u * (P2y - P1y);

      var pRise = this.getLineLength(fromX, fromY, ix, iy);
      var pRun = Math.sqrt(dist * dist - pRise * pRise);
      run = Math.sqrt(pRun * pRun / (1 + m * m));
      if (P2x < P1x) {
        run *= -1;
      }
      rise = m * run;
      pt = {
        x: ix + run,
        y: iy + rise
      };
    }

    return pt;
  };

  Konva.Path.getPointOnCubicBezier = function(
    pct,
    P1x,
    P1y,
    P2x,
    P2y,
    P3x,
    P3y,
    P4x,
    P4y
  ) {
    function CB1(t) {
      return t * t * t;
    }
    function CB2(t) {
      return 3 * t * t * (1 - t);
    }
    function CB3(t) {
      return 3 * t * (1 - t) * (1 - t);
    }
    function CB4(t) {
      return (1 - t) * (1 - t) * (1 - t);
    }
    var x = P4x * CB1(pct) + P3x * CB2(pct) + P2x * CB3(pct) + P1x * CB4(pct);
    var y = P4y * CB1(pct) + P3y * CB2(pct) + P2y * CB3(pct) + P1y * CB4(pct);

    return {
      x: x,
      y: y
    };
  };
  Konva.Path.getPointOnQuadraticBezier = function(
    pct,
    P1x,
    P1y,
    P2x,
    P2y,
    P3x,
    P3y
  ) {
    function QB1(t) {
      return t * t;
    }
    function QB2(t) {
      return 2 * t * (1 - t);
    }
    function QB3(t) {
      return (1 - t) * (1 - t);
    }
    var x = P3x * QB1(pct) + P2x * QB2(pct) + P1x * QB3(pct);
    var y = P3y * QB1(pct) + P2y * QB2(pct) + P1y * QB3(pct);

    return {
      x: x,
      y: y
    };
  };
  Konva.Path.getPointOnEllipticalArc = function(cx, cy, rx, ry, theta, psi) {
    var cosPsi = Math.cos(psi),
      sinPsi = Math.sin(psi);
    var pt = {
      x: rx * Math.cos(theta),
      y: ry * Math.sin(theta)
    };
    return {
      x: cx + (pt.x * cosPsi - pt.y * sinPsi),
      y: cy + (pt.x * sinPsi + pt.y * cosPsi)
    };
  };
  /*
     * get parsed data array from the data
     *  string.  V, v, H, h, and l data are converted to
     *  L data for the purpose of high performance Path
     *  rendering
     */
  Konva.Path.parsePathData = function(data) {
    // Path Data Segment must begin with a moveTo
    //m (x y)+  Relative moveTo (subsequent points are treated as lineTo)
    //M (x y)+  Absolute moveTo (subsequent points are treated as lineTo)
    //l (x y)+  Relative lineTo
    //L (x y)+  Absolute LineTo
    //h (x)+    Relative horizontal lineTo
    //H (x)+    Absolute horizontal lineTo
    //v (y)+    Relative vertical lineTo
    //V (y)+    Absolute vertical lineTo
    //z (closepath)
    //Z (closepath)
    //c (x1 y1 x2 y2 x y)+ Relative Bezier curve
    //C (x1 y1 x2 y2 x y)+ Absolute Bezier curve
    //q (x1 y1 x y)+       Relative Quadratic Bezier
    //Q (x1 y1 x y)+       Absolute Quadratic Bezier
    //t (x y)+    Shorthand/Smooth Relative Quadratic Bezier
    //T (x y)+    Shorthand/Smooth Absolute Quadratic Bezier
    //s (x2 y2 x y)+       Shorthand/Smooth Relative Bezier curve
    //S (x2 y2 x y)+       Shorthand/Smooth Absolute Bezier curve
    //a (rx ry x-axis-rotation large-arc-flag sweep-flag x y)+     Relative Elliptical Arc
    //A (rx ry x-axis-rotation large-arc-flag sweep-flag x y)+  Absolute Elliptical Arc

    // return early if data is not defined
    if (!data) {
      return [];
    }

    // command string
    var cs = data;

    // command chars
    var cc = [
      'm',
      'M',
      'l',
      'L',
      'v',
      'V',
      'h',
      'H',
      'z',
      'Z',
      'c',
      'C',
      'q',
      'Q',
      't',
      'T',
      's',
      'S',
      'a',
      'A'
    ];
    // convert white spaces to commas
    cs = cs.replace(new RegExp(' ', 'g'), ',');
    // create pipes so that we can split the data
    for (var n = 0; n < cc.length; n++) {
      cs = cs.replace(new RegExp(cc[n], 'g'), '|' + cc[n]);
    }
    // create array
    var arr = cs.split('|');
    var ca = [];
    var coords = [];
    // init context point
    var cpx = 0;
    var cpy = 0;

    var re = /([-+]?((\d+\.\d+)|((\d+)|(\.\d+)))(?:e[-+]?\d+)?)/gi;
    var match;
    for (n = 1; n < arr.length; n++) {
      var str = arr[n];
      var c = str.charAt(0);
      str = str.slice(1);

      coords.length = 0;
      while ((match = re.exec(str))) {
        coords.push(match[0]);
      }

      // while ((match = re.exec(str))) {
      //   coords.push(match[0]);
      // }
      var p = [];

      for (var j = 0, jlen = coords.length; j < jlen; j++) {
        var parsed = parseFloat(coords[j]);
        if (!isNaN(parsed)) {
          p.push(parsed);
        } else {
          p.push(0);
        }
      }

      while (p.length > 0) {
        if (isNaN(p[0])) {
          // case for a trailing comma before next command
          break;
        }

        var cmd = null;
        var points = [];
        var startX = cpx,
          startY = cpy;
        // Move var from within the switch to up here (jshint)
        var prevCmd, ctlPtx, ctlPty; // Ss, Tt
        var rx, ry, psi, fa, fs, x1, y1; // Aa

        // convert l, H, h, V, and v to L
        switch (c) {
          // Note: Keep the lineTo's above the moveTo's in this switch
          case 'l':
            cpx += p.shift();
            cpy += p.shift();
            cmd = 'L';
            points.push(cpx, cpy);
            break;
          case 'L':
            cpx = p.shift();
            cpy = p.shift();
            points.push(cpx, cpy);
            break;
          // Note: lineTo handlers need to be above this point
          case 'm':
            var dx = p.shift();
            var dy = p.shift();
            cpx += dx;
            cpy += dy;
            cmd = 'M';
            // After closing the path move the current position
            // to the the first point of the path (if any).
            if (ca.length > 2 && ca[ca.length - 1].command === 'z') {
              for (var idx = ca.length - 2; idx >= 0; idx--) {
                if (ca[idx].command === 'M') {
                  cpx = ca[idx].points[0] + dx;
                  cpy = ca[idx].points[1] + dy;
                  break;
                }
              }
            }
            points.push(cpx, cpy);
            c = 'l';
            // subsequent points are treated as relative lineTo
            break;
          case 'M':
            cpx = p.shift();
            cpy = p.shift();
            cmd = 'M';
            points.push(cpx, cpy);
            c = 'L';
            // subsequent points are treated as absolute lineTo
            break;

          case 'h':
            cpx += p.shift();
            cmd = 'L';
            points.push(cpx, cpy);
            break;
          case 'H':
            cpx = p.shift();
            cmd = 'L';
            points.push(cpx, cpy);
            break;
          case 'v':
            cpy += p.shift();
            cmd = 'L';
            points.push(cpx, cpy);
            break;
          case 'V':
            cpy = p.shift();
            cmd = 'L';
            points.push(cpx, cpy);
            break;
          case 'C':
            points.push(p.shift(), p.shift(), p.shift(), p.shift());
            cpx = p.shift();
            cpy = p.shift();
            points.push(cpx, cpy);
            break;
          case 'c':
            points.push(
              cpx + p.shift(),
              cpy + p.shift(),
              cpx + p.shift(),
              cpy + p.shift()
            );
            cpx += p.shift();
            cpy += p.shift();
            cmd = 'C';
            points.push(cpx, cpy);
            break;
          case 'S':
            ctlPtx = cpx;
            ctlPty = cpy;
            prevCmd = ca[ca.length - 1];
            if (prevCmd.command === 'C') {
              ctlPtx = cpx + (cpx - prevCmd.points[2]);
              ctlPty = cpy + (cpy - prevCmd.points[3]);
            }
            points.push(ctlPtx, ctlPty, p.shift(), p.shift());
            cpx = p.shift();
            cpy = p.shift();
            cmd = 'C';
            points.push(cpx, cpy);
            break;
          case 's':
            ctlPtx = cpx;
            ctlPty = cpy;
            prevCmd = ca[ca.length - 1];
            if (prevCmd.command === 'C') {
              ctlPtx = cpx + (cpx - prevCmd.points[2]);
              ctlPty = cpy + (cpy - prevCmd.points[3]);
            }
            points.push(ctlPtx, ctlPty, cpx + p.shift(), cpy + p.shift());
            cpx += p.shift();
            cpy += p.shift();
            cmd = 'C';
            points.push(cpx, cpy);
            break;
          case 'Q':
            points.push(p.shift(), p.shift());
            cpx = p.shift();
            cpy = p.shift();
            points.push(cpx, cpy);
            break;
          case 'q':
            points.push(cpx + p.shift(), cpy + p.shift());
            cpx += p.shift();
            cpy += p.shift();
            cmd = 'Q';
            points.push(cpx, cpy);
            break;
          case 'T':
            ctlPtx = cpx;
            ctlPty = cpy;
            prevCmd = ca[ca.length - 1];
            if (prevCmd.command === 'Q') {
              ctlPtx = cpx + (cpx - prevCmd.points[0]);
              ctlPty = cpy + (cpy - prevCmd.points[1]);
            }
            cpx = p.shift();
            cpy = p.shift();
            cmd = 'Q';
            points.push(ctlPtx, ctlPty, cpx, cpy);
            break;
          case 't':
            ctlPtx = cpx;
            ctlPty = cpy;
            prevCmd = ca[ca.length - 1];
            if (prevCmd.command === 'Q') {
              ctlPtx = cpx + (cpx - prevCmd.points[0]);
              ctlPty = cpy + (cpy - prevCmd.points[1]);
            }
            cpx += p.shift();
            cpy += p.shift();
            cmd = 'Q';
            points.push(ctlPtx, ctlPty, cpx, cpy);
            break;
          case 'A':
            rx = p.shift();
            ry = p.shift();
            psi = p.shift();
            fa = p.shift();
            fs = p.shift();
            x1 = cpx;
            y1 = cpy;
            cpx = p.shift();
            cpy = p.shift();
            cmd = 'A';
            points = this.convertEndpointToCenterParameterization(
              x1,
              y1,
              cpx,
              cpy,
              fa,
              fs,
              rx,
              ry,
              psi
            );
            break;
          case 'a':
            rx = p.shift();
            ry = p.shift();
            psi = p.shift();
            fa = p.shift();
            fs = p.shift();
            x1 = cpx;
            y1 = cpy;
            cpx += p.shift();
            cpy += p.shift();
            cmd = 'A';
            points = this.convertEndpointToCenterParameterization(
              x1,
              y1,
              cpx,
              cpy,
              fa,
              fs,
              rx,
              ry,
              psi
            );
            break;
        }

        ca.push({
          command: cmd || c,
          points: points,
          start: {
            x: startX,
            y: startY
          },
          pathLength: this.calcLength(startX, startY, cmd || c, points)
        });
      }

      if (c === 'z' || c === 'Z') {
        ca.push({
          command: 'z',
          points: [],
          start: undefined,
          pathLength: 0
        });
      }
    }

    return ca;
  };
  Konva.Path.calcLength = function(x, y, cmd, points) {
    var len, p1, p2, t;
    var path = Konva.Path;

    switch (cmd) {
      case 'L':
        return path.getLineLength(x, y, points[0], points[1]);
      case 'C':
        // Approximates by breaking curve into 100 line segments
        len = 0.0;
        p1 = path.getPointOnCubicBezier(
          0,
          x,
          y,
          points[0],
          points[1],
          points[2],
          points[3],
          points[4],
          points[5]
        );
        for (t = 0.01; t <= 1; t += 0.01) {
          p2 = path.getPointOnCubicBezier(
            t,
            x,
            y,
            points[0],
            points[1],
            points[2],
            points[3],
            points[4],
            points[5]
          );
          len += path.getLineLength(p1.x, p1.y, p2.x, p2.y);
          p1 = p2;
        }
        return len;
      case 'Q':
        // Approximates by breaking curve into 100 line segments
        len = 0.0;
        p1 = path.getPointOnQuadraticBezier(
          0,
          x,
          y,
          points[0],
          points[1],
          points[2],
          points[3]
        );
        for (t = 0.01; t <= 1; t += 0.01) {
          p2 = path.getPointOnQuadraticBezier(
            t,
            x,
            y,
            points[0],
            points[1],
            points[2],
            points[3]
          );
          len += path.getLineLength(p1.x, p1.y, p2.x, p2.y);
          p1 = p2;
        }
        return len;
      case 'A':
        // Approximates by breaking curve into line segments
        len = 0.0;
        var start = points[4];
        // 4 = theta
        var dTheta = points[5];
        // 5 = dTheta
        var end = points[4] + dTheta;
        var inc = Math.PI / 180.0;
        // 1 degree resolution
        if (Math.abs(start - end) < inc) {
          inc = Math.abs(start - end);
        }
        // Note: for purpose of calculating arc length, not going to worry about rotating X-axis by angle psi
        p1 = path.getPointOnEllipticalArc(
          points[0],
          points[1],
          points[2],
          points[3],
          start,
          0
        );
        if (dTheta < 0) {
          // clockwise
          for (t = start - inc; t > end; t -= inc) {
            p2 = path.getPointOnEllipticalArc(
              points[0],
              points[1],
              points[2],
              points[3],
              t,
              0
            );
            len += path.getLineLength(p1.x, p1.y, p2.x, p2.y);
            p1 = p2;
          }
        } else {
          // counter-clockwise
          for (t = start + inc; t < end; t += inc) {
            p2 = path.getPointOnEllipticalArc(
              points[0],
              points[1],
              points[2],
              points[3],
              t,
              0
            );
            len += path.getLineLength(p1.x, p1.y, p2.x, p2.y);
            p1 = p2;
          }
        }
        p2 = path.getPointOnEllipticalArc(
          points[0],
          points[1],
          points[2],
          points[3],
          end,
          0
        );
        len += path.getLineLength(p1.x, p1.y, p2.x, p2.y);

        return len;
    }

    return 0;
  };
  Konva.Path.convertEndpointToCenterParameterization = function(
    x1,
    y1,
    x2,
    y2,
    fa,
    fs,
    rx,
    ry,
    psiDeg
  ) {
    // Derived from: http://www.w3.org/TR/SVG/implnote.html#ArcImplementationNotes
    var psi = psiDeg * (Math.PI / 180.0);
    var xp = Math.cos(psi) * (x1 - x2) / 2.0 + Math.sin(psi) * (y1 - y2) / 2.0;
    var yp =
      -1 * Math.sin(psi) * (x1 - x2) / 2.0 + Math.cos(psi) * (y1 - y2) / 2.0;

    var lambda = xp * xp / (rx * rx) + yp * yp / (ry * ry);

    if (lambda > 1) {
      rx *= Math.sqrt(lambda);
      ry *= Math.sqrt(lambda);
    }

    var f = Math.sqrt(
      (rx * rx * (ry * ry) - rx * rx * (yp * yp) - ry * ry * (xp * xp)) /
        (rx * rx * (yp * yp) + ry * ry * (xp * xp))
    );

    if (fa === fs) {
      f *= -1;
    }
    if (isNaN(f)) {
      f = 0;
    }

    var cxp = f * rx * yp / ry;
    var cyp = f * -ry * xp / rx;

    var cx = (x1 + x2) / 2.0 + Math.cos(psi) * cxp - Math.sin(psi) * cyp;
    var cy = (y1 + y2) / 2.0 + Math.sin(psi) * cxp + Math.cos(psi) * cyp;

    var vMag = function(v) {
      return Math.sqrt(v[0] * v[0] + v[1] * v[1]);
    };
    var vRatio = function(u, v) {
      return (u[0] * v[0] + u[1] * v[1]) / (vMag(u) * vMag(v));
    };
    var vAngle = function(u, v) {
      return (u[0] * v[1] < u[1] * v[0] ? -1 : 1) * Math.acos(vRatio(u, v));
    };
    var theta = vAngle([1, 0], [(xp - cxp) / rx, (yp - cyp) / ry]);
    var u = [(xp - cxp) / rx, (yp - cyp) / ry];
    var v = [(-1 * xp - cxp) / rx, (-1 * yp - cyp) / ry];
    var dTheta = vAngle(u, v);

    if (vRatio(u, v) <= -1) {
      dTheta = Math.PI;
    }
    if (vRatio(u, v) >= 1) {
      dTheta = 0;
    }
    if (fs === 0 && dTheta > 0) {
      dTheta = dTheta - 2 * Math.PI;
    }
    if (fs === 1 && dTheta < 0) {
      dTheta = dTheta + 2 * Math.PI;
    }
    return [cx, cy, rx, ry, theta, dTheta, psi, fs];
  };
  // add getters setters
  Konva.Factory.addGetterSetter(Konva.Path, 'data');

  /**
   * set SVG path data string.  This method
   *  also automatically parses the data string
   *  into a data array.  Currently supported SVG data:
   *  M, m, L, l, H, h, V, v, Q, q, T, t, C, c, S, s, A, a, Z, z
   * @name setData
   * @method
   * @memberof Konva.Path.prototype
   * @param {String} SVG path command string
   */

  /**
   * get SVG path data string
   * @name getData
   * @method
   * @memberof Konva.Path.prototype
   */

  Konva.Collection.mapMethods(Konva.Path);
})();

(function() {
  'use strict';
  var EMPTY_STRING = '',
    //CALIBRI = 'Calibri',
    NORMAL = 'normal';

  /**
   * Path constructor.
   * @author Jason Follas
   * @constructor
   * @memberof Konva
   * @augments Konva.Shape
   * @param {Object} config
   * @param {String} [config.fontFamily] default is Calibri
   * @param {Number} [config.fontSize] default is 12
   * @param {String} [config.fontStyle] can be normal, bold, or italic.  Default is normal
   * @param {String} [config.fontVariant] can be normal or small-caps.  Default is normal
   * @param {String} config.text
   * @param {String} config.data SVG data string
   * @param {Function} config.getKerning a getter for kerning values for the specified characters
   * @param {String} [config.fill] fill color
     * @param {Image} [config.fillPatternImage] fill pattern image
     * @param {Number} [config.fillPatternX]
     * @param {Number} [config.fillPatternY]
     * @param {Object} [config.fillPatternOffset] object with x and y component
     * @param {Number} [config.fillPatternOffsetX] 
     * @param {Number} [config.fillPatternOffsetY] 
     * @param {Object} [config.fillPatternScale] object with x and y component
     * @param {Number} [config.fillPatternScaleX]
     * @param {Number} [config.fillPatternScaleY]
     * @param {Number} [config.fillPatternRotation]
     * @param {String} [config.fillPatternRepeat] can be "repeat", "repeat-x", "repeat-y", or "no-repeat".  The default is "no-repeat"
     * @param {Object} [config.fillLinearGradientStartPoint] object with x and y component
     * @param {Number} [config.fillLinearGradientStartPointX]
     * @param {Number} [config.fillLinearGradientStartPointY]
     * @param {Object} [config.fillLinearGradientEndPoint] object with x and y component
     * @param {Number} [config.fillLinearGradientEndPointX]
     * @param {Number} [config.fillLinearGradientEndPointY]
     * @param {Array} [config.fillLinearGradientColorStops] array of color stops
     * @param {Object} [config.fillRadialGradientStartPoint] object with x and y component
     * @param {Number} [config.fillRadialGradientStartPointX]
     * @param {Number} [config.fillRadialGradientStartPointY]
     * @param {Object} [config.fillRadialGradientEndPoint] object with x and y component
     * @param {Number} [config.fillRadialGradientEndPointX] 
     * @param {Number} [config.fillRadialGradientEndPointY] 
     * @param {Number} [config.fillRadialGradientStartRadius]
     * @param {Number} [config.fillRadialGradientEndRadius]
     * @param {Array} [config.fillRadialGradientColorStops] array of color stops
     * @param {Boolean} [config.fillEnabled] flag which enables or disables the fill.  The default value is true
     * @param {String} [config.fillPriority] can be color, linear-gradient, radial-graident, or pattern.  The default value is color.  The fillPriority property makes it really easy to toggle between different fill types.  For example, if you want to toggle between a fill color style and a fill pattern style, simply set the fill property and the fillPattern properties, and then use setFillPriority('color') to render the shape with a color fill, or use setFillPriority('pattern') to render the shape with the pattern fill configuration
     * @param {String} [config.stroke] stroke color
     * @param {Number} [config.strokeWidth] stroke width
     * @param {Boolean} [config.strokeHitEnabled] flag which enables or disables stroke hit region.  The default is true
     * @param {Boolean} [config.perfectDrawEnabled] flag which enables or disables using buffer canvas.  The default is true
     * @param {Boolean} [config.shadowForStrokeEnabled] flag which enables or disables shasow for stroke.  The default is true
     * @param {Boolean} [config.strokeScaleEnabled] flag which enables or disables stroke scale.  The default is true
     * @param {Boolean} [config.strokeEnabled] flag which enables or disables the stroke.  The default value is true
     * @param {String} [config.lineJoin] can be miter, round, or bevel.  The default
     *  is miter
     * @param {String} [config.lineCap] can be butt, round, or sqare.  The default
     *  is butt
     * @param {String} [config.shadowColor]
     * @param {Number} [config.shadowBlur]
     * @param {Object} [config.shadowOffset] object with x and y component
     * @param {Number} [config.shadowOffsetX]
     * @param {Number} [config.shadowOffsetY]
     * @param {Number} [config.shadowOpacity] shadow opacity.  Can be any real number
     *  between 0 and 1
     * @param {Boolean} [config.shadowEnabled] flag which enables or disables the shadow.  The default value is true
     * @param {Array} [config.dash]
     * @param {Boolean} [config.dashEnabled] flag which enables or disables the dashArray.  The default value is true
   * @param {Number} [config.x]
     * @param {Number} [config.y]
     * @param {Number} [config.width]
     * @param {Number} [config.height]
     * @param {Boolean} [config.visible]
     * @param {Boolean} [config.listening] whether or not the node is listening for events
     * @param {String} [config.id] unique id
     * @param {String} [config.name] non-unique name
     * @param {Number} [config.opacity] determines node opacity.  Can be any number between 0 and 1
     * @param {Object} [config.scale] set scale
     * @param {Number} [config.scaleX] set scale x
     * @param {Number} [config.scaleY] set scale y
     * @param {Number} [config.rotation] rotation in degrees
     * @param {Object} [config.offset] offset from center point and rotation point
     * @param {Number} [config.offsetX] set offset x
     * @param {Number} [config.offsetY] set offset y
     * @param {Boolean} [config.draggable] makes the node draggable.  When stages are draggable, you can drag and drop
     *  the entire stage by dragging any portion of the stage
     * @param {Number} [config.dragDistance]
     * @param {Function} [config.dragBoundFunc]
   * @example
   * var kerningPairs = {
   *   'A': {
   *     ' ': -0.05517578125,
   *     'T': -0.07421875,
   *     'V': -0.07421875,
   *   },
   *   'V': {
   *     ',': -0.091796875,
   *     ":": -0.037109375,
   *     ";": -0.037109375,
   *     "A": -0.07421875,
   *   }
   * }
   * var textpath = new Konva.TextPath({
   *   x: 100,
   *   y: 50,
   *   fill: '#333',
   *   fontSize: '24',
   *   fontFamily: 'Arial',
   *   text: 'All the world\'s a stage, and all the men and women merely players.',
   *   data: 'M10,10 C0,0 10,150 100,100 S300,150 400,50',
   *   getKerning: function(leftChar, rightChar) {
   *     return kerningPairs.hasOwnProperty(leftChar) ? pairs[leftChar][rightChar] || 0 : 0
   *   }
   * });
   */
  Konva.TextPath = function(config) {
    this.___init(config);
  };

  function _fillFunc(context) {
    context.fillText(this.partialText, 0, 0);
  }
  function _strokeFunc(context) {
    context.strokeText(this.partialText, 0, 0);
  }

  Konva.TextPath.prototype = {
    ___init: function(config) {
      var that = this;
      this.dummyCanvas = Konva.Util.createCanvasElement();
      this.dataArray = [];
      this.getKerning = config && config.getKerning;

      // call super constructor
      Konva.Shape.call(this, config);

      // overrides
      // TODO: shouldn't this be on the prototype?
      this._fillFunc = _fillFunc;
      this._strokeFunc = _strokeFunc;
      this._fillFuncHit = _fillFunc;
      this._strokeFuncHit = _strokeFunc;

      this.className = 'TextPath';

      this.dataArray = Konva.Path.parsePathData(this.attrs.data);
      this.on('dataChange.konva', function() {
        that.dataArray = Konva.Path.parsePathData(this.attrs.data);
        that._setTextData();
      });

      // update text data for certain attr changes
      this.on(
        'textChange.konva alignChange.konva letterSpacingChange.konva',
        that._setTextData
      );
      that._setTextData();
      this.sceneFunc(this._sceneFunc);
      this.hitFunc(this._hitFunc);
    },
    _sceneFunc: function(context) {
      context.setAttr('font', this._getContextFont());
      context.setAttr('textBaseline', this.getTextBaseline());
      context.setAttr('textAlign', 'left');
      context.save();

      var textDecoration = this.textDecoration();
      var fill = this.fill();
      var fontSize = this.fontSize();

      var glyphInfo = this.glyphInfo;
      if (textDecoration === 'underline') {
        context.beginPath();
      }
      for (var i = 0; i < glyphInfo.length; i++) {
        context.save();

        var p0 = glyphInfo[i].p0;

        context.translate(p0.x, p0.y);
        context.rotate(glyphInfo[i].rotation);
        this.partialText = glyphInfo[i].text;

        context.fillStrokeShape(this);
        if (textDecoration === 'underline') {
          if (i === 0) {
            context.moveTo(0, fontSize / 2 + 1);
          }

          context.lineTo(fontSize, fontSize / 2 + 1);
        }
        context.restore();

        //// To assist with debugging visually, uncomment following
        //
        // if (i % 2)
        // context.strokeStyle = 'cyan';
        // else
        // context.strokeStyle = 'green';
        // var p1 = glyphInfo[i].p1;
        // context.moveTo(p0.x, p0.y);
        // context.lineTo(p1.x, p1.y);
        // context.stroke();
      }
      if (textDecoration === 'underline') {
        context.strokeStyle = fill;
        context.lineWidth = fontSize / 20;
        context.stroke();
      }

      context.restore();
    },
    _hitFunc: function(context) {
      context.beginPath();

      var glyphInfo = this.glyphInfo;
      if (glyphInfo.length >= 1) {
        var p0 = glyphInfo[0].p0;
        context.moveTo(p0.x, p0.y);
      }
      for (var i = 0; i < glyphInfo.length; i++) {
        var p1 = glyphInfo[i].p1;
        context.lineTo(p1.x, p1.y);
      }
      context.setAttr('lineWidth', this.getFontSize());
      context.setAttr('strokeStyle', this.colorKey);
      context.stroke();
    },
    /**
     * get text width in pixels
     * @method
     * @memberof Konva.TextPath.prototype
     */
    getTextWidth: function() {
      return this.textWidth;
    },
    /**
     * get text height in pixels
     * @method
     * @memberof Konva.TextPath.prototype
     */
    getTextHeight: function() {
      return this.textHeight;
    },
    /**
     * set text
     * @method
     * @memberof Konva.TextPath.prototype
     * @param {String} text
     */
    setText: function(text) {
      Konva.Text.prototype.setText.call(this, text);
    },
    _getTextSize: function(text) {
      var dummyCanvas = this.dummyCanvas;
      var _context = dummyCanvas.getContext('2d');

      _context.save();

      _context.font = this._getContextFont();
      var metrics = _context.measureText(text);

      _context.restore();

      return {
        width: metrics.width,
        height: parseInt(this.attrs.fontSize, 10)
      };
    },
    _setTextData: function() {
      var that = this;
      var size = this._getTextSize(this.attrs.text);
      var letterSpacing = this.getLetterSpacing();
      var align = this.align();

      this.textWidth = size.width;
      this.textHeight = size.height;

      var textFullWidth = Math.max(
        this.textWidth + ((this.attrs.text || '').length - 1) * letterSpacing,
        0
      );

      this.glyphInfo = [];

      var fullPathWidth = 0;
      for (var l = 0; l < that.dataArray.length; l++) {
        if (that.dataArray[l].pathLength > 0) {
          fullPathWidth += that.dataArray[l].pathLength;
        }
      }

      var offset = 0;
      if (align === 'center') {
        offset = Math.max(0, fullPathWidth / 2 - textFullWidth / 2);
      }
      if (align === 'right') {
        offset = Math.max(0, fullPathWidth - textFullWidth);
      }

      var charArr = this.getText().split('');
      var spacesNumber = this.getText().split(' ').length - 1;

      var p0, p1, pathCmd;

      var pIndex = -1;
      var currentT = 0;
      // var sumLength = 0;
      // for(var j = 0; j < that.dataArray.length; j++) {
      //   if(that.dataArray[j].pathLength > 0) {
      //
      //     if (sumLength + that.dataArray[j].pathLength > offset) {}
      //       fullPathWidth += that.dataArray[j].pathLength;
      //   }
      // }

      var getNextPathSegment = function() {
        currentT = 0;
        var pathData = that.dataArray;

        for (var j = pIndex + 1; j < pathData.length; j++) {
          if (pathData[j].pathLength > 0) {
            pIndex = j;

            return pathData[j];
          } else if (pathData[j].command === 'M') {
            p0 = {
              x: pathData[j].points[0],
              y: pathData[j].points[1]
            };
          }
        }

        return {};
      };

      var findSegmentToFitCharacter = function(c) {
        var glyphWidth = that._getTextSize(c).width + letterSpacing;

        if (c === ' ' && align === 'justify') {
          glyphWidth += (fullPathWidth - textFullWidth) / spacesNumber;
        }

        var currLen = 0;
        var attempts = 0;

        p1 = undefined;
        while (
          Math.abs(glyphWidth - currLen) / glyphWidth > 0.01 &&
          attempts < 25
        ) {
          attempts++;
          var cumulativePathLength = currLen;
          while (pathCmd === undefined) {
            pathCmd = getNextPathSegment();

            if (
              pathCmd &&
              cumulativePathLength + pathCmd.pathLength < glyphWidth
            ) {
              cumulativePathLength += pathCmd.pathLength;
              pathCmd = undefined;
            }
          }

          if (pathCmd === {} || p0 === undefined) {
            return undefined;
          }

          var needNewSegment = false;

          switch (pathCmd.command) {
            case 'L':
              if (
                Konva.Path.getLineLength(
                  p0.x,
                  p0.y,
                  pathCmd.points[0],
                  pathCmd.points[1]
                ) > glyphWidth
              ) {
                p1 = Konva.Path.getPointOnLine(
                  glyphWidth,
                  p0.x,
                  p0.y,
                  pathCmd.points[0],
                  pathCmd.points[1],
                  p0.x,
                  p0.y
                );
              } else {
                pathCmd = undefined;
              }
              break;
            case 'A':
              var start = pathCmd.points[4];
              // 4 = theta
              var dTheta = pathCmd.points[5];
              // 5 = dTheta
              var end = pathCmd.points[4] + dTheta;

              if (currentT === 0) {
                currentT = start + 0.00000001;
              } else if (glyphWidth > currLen) {
                // Just in case start is 0
                currentT += Math.PI / 180.0 * dTheta / Math.abs(dTheta);
              } else {
                currentT -= Math.PI / 360.0 * dTheta / Math.abs(dTheta);
              }

              // Credit for bug fix: @therth https://github.com/ericdrowell/KonvaJS/issues/249
              // Old code failed to render text along arc of this path: "M 50 50 a 150 50 0 0 1 250 50 l 50 0"
              if (
                (dTheta < 0 && currentT < end) ||
                (dTheta >= 0 && currentT > end)
              ) {
                currentT = end;
                needNewSegment = true;
              }
              p1 = Konva.Path.getPointOnEllipticalArc(
                pathCmd.points[0],
                pathCmd.points[1],
                pathCmd.points[2],
                pathCmd.points[3],
                currentT,
                pathCmd.points[6]
              );
              break;
            case 'C':
              if (currentT === 0) {
                if (glyphWidth > pathCmd.pathLength) {
                  currentT = 0.00000001;
                } else {
                  currentT = glyphWidth / pathCmd.pathLength;
                }
              } else if (glyphWidth > currLen) {
                currentT += (glyphWidth - currLen) / pathCmd.pathLength;
              } else {
                currentT -= (currLen - glyphWidth) / pathCmd.pathLength;
              }

              if (currentT > 1.0) {
                currentT = 1.0;
                needNewSegment = true;
              }
              p1 = Konva.Path.getPointOnCubicBezier(
                currentT,
                pathCmd.start.x,
                pathCmd.start.y,
                pathCmd.points[0],
                pathCmd.points[1],
                pathCmd.points[2],
                pathCmd.points[3],
                pathCmd.points[4],
                pathCmd.points[5]
              );
              break;
            case 'Q':
              if (currentT === 0) {
                currentT = glyphWidth / pathCmd.pathLength;
              } else if (glyphWidth > currLen) {
                currentT += (glyphWidth - currLen) / pathCmd.pathLength;
              } else {
                currentT -= (currLen - glyphWidth) / pathCmd.pathLength;
              }

              if (currentT > 1.0) {
                currentT = 1.0;
                needNewSegment = true;
              }
              p1 = Konva.Path.getPointOnQuadraticBezier(
                currentT,
                pathCmd.start.x,
                pathCmd.start.y,
                pathCmd.points[0],
                pathCmd.points[1],
                pathCmd.points[2],
                pathCmd.points[3]
              );
              break;
          }

          if (p1 !== undefined) {
            currLen = Konva.Path.getLineLength(p0.x, p0.y, p1.x, p1.y);
          }

          if (needNewSegment) {
            needNewSegment = false;
            pathCmd = undefined;
          }
        }
      };

      // fake search for offset, this is very bad approach
      // TODO: find other way to add offset from start (for align)
      var testChar = 'C';
      var glyphWidth = that._getTextSize(testChar).width + letterSpacing;
      for (var k = 0; k < offset / glyphWidth; k++) {
        findSegmentToFitCharacter(testChar);
        if (p0 === undefined || p1 === undefined) {
          break;
        }
        p0 = p1;
      }

      for (var i = 0; i < charArr.length; i++) {
        // Find p1 such that line segment between p0 and p1 is approx. width of glyph
        findSegmentToFitCharacter(charArr[i]);

        if (p0 === undefined || p1 === undefined) {
          break;
        }

        var width = Konva.Path.getLineLength(p0.x, p0.y, p1.x, p1.y);

        var kern = 0;
        if (this.getKerning) {
          try {
            // getKerning is a user provided getter. Make sure it never breaks our logic
            kern =
              this.getKerning(charArr[i - 1], charArr[i]) * this.fontSize();
          } catch (e) {
            kern = 0;
          }
        }

        p0.x += kern;
        p1.x += kern;
        this.textWidth += kern;

        var midpoint = Konva.Path.getPointOnLine(
          kern + width / 2.0,
          p0.x,
          p0.y,
          p1.x,
          p1.y
        );

        var rotation = Math.atan2(p1.y - p0.y, p1.x - p0.x);
        this.glyphInfo.push({
          transposeX: midpoint.x,
          transposeY: midpoint.y,
          text: charArr[i],
          rotation: rotation,
          p0: p0,
          p1: p1
        });
        p0 = p1;
      }
    },
    getSelfRect: function() {
      var points = [];

      this.glyphInfo.forEach(function(info) {
        points.push(info.p0.x);
        points.push(info.p0.y);
        points.push(info.p1.x);
        points.push(info.p1.y);
      });
      var minX = points[0];
      var maxX = points[0];
      var minY = points[0];
      var maxY = points[0];
      var x, y;
      for (var i = 0; i < points.length / 2; i++) {
        x = points[i * 2];
        y = points[i * 2 + 1];
        minX = Math.min(minX, x);
        maxX = Math.max(maxX, x);
        minY = Math.min(minY, y);
        maxY = Math.max(maxY, y);
      }
      var fontSize = this.fontSize();
      return {
        x: Math.round(minX) - fontSize / 2,
        y: Math.round(minY) - fontSize / 2,
        width: Math.round(maxX - minX) + fontSize,
        height: Math.round(maxY - minY) + fontSize
      };
    }
  };

  // map TextPath methods to Text
  Konva.TextPath.prototype._getContextFont =
    Konva.Text.prototype._getContextFont;

  Konva.Util.extend(Konva.TextPath, Konva.Shape);

  // add setters and getters
  Konva.Factory.addGetterSetter(Konva.TextPath, 'data');

  /**
   * set SVG path data string.  This method
   *  also automatically parses the data string
   *  into a data array.  Currently supported SVG data:
   *  M, m, L, l, H, h, V, v, Q, q, T, t, C, c, S, s, A, a, Z, z
   * @name setData
   * @method
   * @memberof Konva.TextPath.prototype
   * @param {String} SVG path command string
   */

  /**
   * get SVG path data string
   * @name getData
   * @method
   * @memberof Konva.TextPath.prototype
   */

  Konva.Factory.addGetterSetter(Konva.TextPath, 'fontFamily', 'Arial');

  /**
   * set font family
   * @name setFontFamily
   * @method
   * @memberof Konva.TextPath.prototype
   * @param {String} fontFamily
   */

  /**
   * get font family
   * @name getFontFamily
   * @method
   * @memberof Konva.TextPath.prototype
   */

  Konva.Factory.addGetterSetter(
    Konva.TextPath,
    'fontSize',
    12,
    Konva.Validators.getNumberValidator()
  );

  /**
   * set font size
   * @name setFontSize
   * @method
   * @memberof Konva.TextPath.prototype
   * @param {int} fontSize
   */

  /**
   * get font size
   * @name getFontSize
   * @method
   * @memberof Konva.TextPath.prototype
   */

  Konva.Factory.addGetterSetter(Konva.TextPath, 'fontStyle', NORMAL);

  /**
   * set font style.  Can be 'normal', 'italic', or 'bold'.  'normal' is the default.
   * @name setFontStyle
   * @method
   * @memberof Konva.TextPath.prototype
   * @param {String} fontStyle
   */
  Konva.Factory.addGetterSetter(Konva.TextPath, 'align', 'left');

  /**
   * get/set horizontal align of text.  Can be 'left', 'center', 'right' or 'justify'
   * @name align
   * @method
   * @memberof Konva.Text.prototype
   * @param {String} align
   * @returns {String}
   * @example
   * // get text align
   * var align = text.align();
   *
   * // center text
   * text.align('center');
   *
   * // align text to right
   * text.align('right');
   */

  Konva.Factory.addGetterSetter(
    Konva.TextPath,
    'letterSpacing',
    0,
    Konva.Validators.getNumberValidator()
  );

  /**
   * set letter spacing property. Default value is 0.
   * @name letterSpacing
   * @method
   * @memberof Konva.TextPath.prototype
   * @param {Number} letterSpacing
   */

  Konva.Factory.addGetterSetter(Konva.TextPath, 'textBaseline', 'middle');

  /**
   * set textBaseline property. Default value is 'middle'.
   * Can be 'top', 'bottom', 'middle', 'alphabetic', 'hanging'
   * @name textBaseline
   * @method
   * @memberof Konva.TextPath.prototype
   * @param {Number} textBaseline
   */

  /**
   * get font style
   * @name getFontStyle
   * @method
   * @memberof Konva.TextPath.prototype
   */

  Konva.Factory.addGetterSetter(Konva.TextPath, 'fontVariant', NORMAL);

  /**
   * set font variant.  Can be 'normal' or 'small-caps'.  'normal' is the default.
   * @name setFontVariant
   * @method
   * @memberof Konva.TextPath.prototype
   * @param {String} fontVariant
   */

  /**
   * @get font variant
   * @name getFontVariant
   * @method
   * @memberof Konva.TextPath.prototype
   */

  Konva.Factory.addGetter(Konva.TextPath, 'text', EMPTY_STRING);

  /**
   * get text
   * @name getText
   * @method
   * @memberof Konva.TextPath.prototype
   */

  Konva.Factory.addGetterSetter(Konva.TextPath, 'textDecoration', null);

  /**
   * get/set text decoration of a text.  Can be '' or 'underline'
   * @name textDecoration
   * @method
   * @memberof Konva.Text.prototype
   * @param {String} textDecoration
   * @returns {String}
   * @example
   * // get text decoration
   * var textDecoration = text.textDecoration();
   *
   * // center text
   * text.textDecoration('underline');
   */

  Konva.Collection.mapMethods(Konva.TextPath);
})();

(function() {
  'use strict';
  /**
   * RegularPolygon constructor.&nbsp; Examples include triangles, squares, pentagons, hexagons, etc.
   * @constructor
   * @memberof Konva
   * @augments Konva.Shape
   * @param {Object} config
   * @param {Number} config.sides
   * @param {Number} config.radius
   * @param {String} [config.fill] fill color
     * @param {Image} [config.fillPatternImage] fill pattern image
     * @param {Number} [config.fillPatternX]
     * @param {Number} [config.fillPatternY]
     * @param {Object} [config.fillPatternOffset] object with x and y component
     * @param {Number} [config.fillPatternOffsetX] 
     * @param {Number} [config.fillPatternOffsetY] 
     * @param {Object} [config.fillPatternScale] object with x and y component
     * @param {Number} [config.fillPatternScaleX]
     * @param {Number} [config.fillPatternScaleY]
     * @param {Number} [config.fillPatternRotation]
     * @param {String} [config.fillPatternRepeat] can be "repeat", "repeat-x", "repeat-y", or "no-repeat".  The default is "no-repeat"
     * @param {Object} [config.fillLinearGradientStartPoint] object with x and y component
     * @param {Number} [config.fillLinearGradientStartPointX]
     * @param {Number} [config.fillLinearGradientStartPointY]
     * @param {Object} [config.fillLinearGradientEndPoint] object with x and y component
     * @param {Number} [config.fillLinearGradientEndPointX]
     * @param {Number} [config.fillLinearGradientEndPointY]
     * @param {Array} [config.fillLinearGradientColorStops] array of color stops
     * @param {Object} [config.fillRadialGradientStartPoint] object with x and y component
     * @param {Number} [config.fillRadialGradientStartPointX]
     * @param {Number} [config.fillRadialGradientStartPointY]
     * @param {Object} [config.fillRadialGradientEndPoint] object with x and y component
     * @param {Number} [config.fillRadialGradientEndPointX] 
     * @param {Number} [config.fillRadialGradientEndPointY] 
     * @param {Number} [config.fillRadialGradientStartRadius]
     * @param {Number} [config.fillRadialGradientEndRadius]
     * @param {Array} [config.fillRadialGradientColorStops] array of color stops
     * @param {Boolean} [config.fillEnabled] flag which enables or disables the fill.  The default value is true
     * @param {String} [config.fillPriority] can be color, linear-gradient, radial-graident, or pattern.  The default value is color.  The fillPriority property makes it really easy to toggle between different fill types.  For example, if you want to toggle between a fill color style and a fill pattern style, simply set the fill property and the fillPattern properties, and then use setFillPriority('color') to render the shape with a color fill, or use setFillPriority('pattern') to render the shape with the pattern fill configuration
     * @param {String} [config.stroke] stroke color
     * @param {Number} [config.strokeWidth] stroke width
     * @param {Boolean} [config.strokeHitEnabled] flag which enables or disables stroke hit region.  The default is true
     * @param {Boolean} [config.perfectDrawEnabled] flag which enables or disables using buffer canvas.  The default is true
     * @param {Boolean} [config.shadowForStrokeEnabled] flag which enables or disables shasow for stroke.  The default is true
     * @param {Boolean} [config.strokeScaleEnabled] flag which enables or disables stroke scale.  The default is true
     * @param {Boolean} [config.strokeEnabled] flag which enables or disables the stroke.  The default value is true
     * @param {String} [config.lineJoin] can be miter, round, or bevel.  The default
     *  is miter
     * @param {String} [config.lineCap] can be butt, round, or sqare.  The default
     *  is butt
     * @param {String} [config.shadowColor]
     * @param {Number} [config.shadowBlur]
     * @param {Object} [config.shadowOffset] object with x and y component
     * @param {Number} [config.shadowOffsetX]
     * @param {Number} [config.shadowOffsetY]
     * @param {Number} [config.shadowOpacity] shadow opacity.  Can be any real number
     *  between 0 and 1
     * @param {Boolean} [config.shadowEnabled] flag which enables or disables the shadow.  The default value is true
     * @param {Array} [config.dash]
     * @param {Boolean} [config.dashEnabled] flag which enables or disables the dashArray.  The default value is true
   * @param {Number} [config.x]
     * @param {Number} [config.y]
     * @param {Number} [config.width]
     * @param {Number} [config.height]
     * @param {Boolean} [config.visible]
     * @param {Boolean} [config.listening] whether or not the node is listening for events
     * @param {String} [config.id] unique id
     * @param {String} [config.name] non-unique name
     * @param {Number} [config.opacity] determines node opacity.  Can be any number between 0 and 1
     * @param {Object} [config.scale] set scale
     * @param {Number} [config.scaleX] set scale x
     * @param {Number} [config.scaleY] set scale y
     * @param {Number} [config.rotation] rotation in degrees
     * @param {Object} [config.offset] offset from center point and rotation point
     * @param {Number} [config.offsetX] set offset x
     * @param {Number} [config.offsetY] set offset y
     * @param {Boolean} [config.draggable] makes the node draggable.  When stages are draggable, you can drag and drop
     *  the entire stage by dragging any portion of the stage
     * @param {Number} [config.dragDistance]
     * @param {Function} [config.dragBoundFunc]
   * @example
   * var hexagon = new Konva.RegularPolygon({
   *   x: 100,
   *   y: 200,
   *   sides: 6,
   *   radius: 70,
   *   fill: 'red',
   *   stroke: 'black',
   *   strokeWidth: 4
   * });
   */
  Konva.RegularPolygon = function(config) {
    this.___init(config);
  };

  Konva.RegularPolygon.prototype = {
    _centroid: true,
    ___init: function(config) {
      // call super constructor
      Konva.Shape.call(this, config);
      this.className = 'RegularPolygon';
      this.sceneFunc(this._sceneFunc);
    },
    _sceneFunc: function(context) {
      var sides = this.attrs.sides,
        radius = this.attrs.radius,
        n,
        x,
        y;

      context.beginPath();
      context.moveTo(0, 0 - radius);

      for (n = 1; n < sides; n++) {
        x = radius * Math.sin(n * 2 * Math.PI / sides);
        y = -1 * radius * Math.cos(n * 2 * Math.PI / sides);
        context.lineTo(x, y);
      }
      context.closePath();
      context.fillStrokeShape(this);
    },
    getWidth: function() {
      return this.getRadius() * 2;
    },
    // implements Shape.prototype.getHeight()
    getHeight: function() {
      return this.getRadius() * 2;
    },
    // implements Shape.prototype.setWidth()
    setWidth: function(width) {
      Konva.Node.prototype.setWidth.call(this, width);
      if (this.radius() !== width / 2) {
        this.setRadius(width / 2);
      }
    },
    // implements Shape.prototype.setHeight()
    setHeight: function(height) {
      Konva.Node.prototype.setHeight.call(this, height);
      if (this.radius() !== height / 2) {
        this.setRadius(height / 2);
      }
    }
  };
  Konva.Util.extend(Konva.RegularPolygon, Konva.Shape);

  // add getters setters
  Konva.Factory.addGetterSetter(
    Konva.RegularPolygon,
    'radius',
    0,
    Konva.Validators.getNumberValidator()
  );

  /**
   * set radius
   * @name setRadius
   * @method
   * @memberof Konva.RegularPolygon.prototype
   * @param {Number} radius
   */

  /**
   * get radius
   * @name getRadius
   * @method
   * @memberof Konva.RegularPolygon.prototype
   */

  Konva.Factory.addGetterSetter(
    Konva.RegularPolygon,
    'sides',
    0,
    Konva.Validators.getNumberValidator()
  );

  /**
   * set number of sides
   * @name setSides
   * @method
   * @memberof Konva.RegularPolygon.prototype
   * @param {int} sides
   */

  /**
   * get number of sides
   * @name getSides
   * @method
   * @memberof Konva.RegularPolygon.prototype
   */

  Konva.Collection.mapMethods(Konva.RegularPolygon);
})();

(function() {
  'use strict';
  /**
   * Star constructor
   * @constructor
   * @memberof Konva
   * @augments Konva.Shape
   * @param {Object} config
   * @param {Integer} config.numPoints
   * @param {Number} config.innerRadius
   * @param {Number} config.outerRadius
   * @param {String} [config.fill] fill color
     * @param {Image} [config.fillPatternImage] fill pattern image
     * @param {Number} [config.fillPatternX]
     * @param {Number} [config.fillPatternY]
     * @param {Object} [config.fillPatternOffset] object with x and y component
     * @param {Number} [config.fillPatternOffsetX] 
     * @param {Number} [config.fillPatternOffsetY] 
     * @param {Object} [config.fillPatternScale] object with x and y component
     * @param {Number} [config.fillPatternScaleX]
     * @param {Number} [config.fillPatternScaleY]
     * @param {Number} [config.fillPatternRotation]
     * @param {String} [config.fillPatternRepeat] can be "repeat", "repeat-x", "repeat-y", or "no-repeat".  The default is "no-repeat"
     * @param {Object} [config.fillLinearGradientStartPoint] object with x and y component
     * @param {Number} [config.fillLinearGradientStartPointX]
     * @param {Number} [config.fillLinearGradientStartPointY]
     * @param {Object} [config.fillLinearGradientEndPoint] object with x and y component
     * @param {Number} [config.fillLinearGradientEndPointX]
     * @param {Number} [config.fillLinearGradientEndPointY]
     * @param {Array} [config.fillLinearGradientColorStops] array of color stops
     * @param {Object} [config.fillRadialGradientStartPoint] object with x and y component
     * @param {Number} [config.fillRadialGradientStartPointX]
     * @param {Number} [config.fillRadialGradientStartPointY]
     * @param {Object} [config.fillRadialGradientEndPoint] object with x and y component
     * @param {Number} [config.fillRadialGradientEndPointX] 
     * @param {Number} [config.fillRadialGradientEndPointY] 
     * @param {Number} [config.fillRadialGradientStartRadius]
     * @param {Number} [config.fillRadialGradientEndRadius]
     * @param {Array} [config.fillRadialGradientColorStops] array of color stops
     * @param {Boolean} [config.fillEnabled] flag which enables or disables the fill.  The default value is true
     * @param {String} [config.fillPriority] can be color, linear-gradient, radial-graident, or pattern.  The default value is color.  The fillPriority property makes it really easy to toggle between different fill types.  For example, if you want to toggle between a fill color style and a fill pattern style, simply set the fill property and the fillPattern properties, and then use setFillPriority('color') to render the shape with a color fill, or use setFillPriority('pattern') to render the shape with the pattern fill configuration
     * @param {String} [config.stroke] stroke color
     * @param {Number} [config.strokeWidth] stroke width
     * @param {Boolean} [config.strokeHitEnabled] flag which enables or disables stroke hit region.  The default is true
     * @param {Boolean} [config.perfectDrawEnabled] flag which enables or disables using buffer canvas.  The default is true
     * @param {Boolean} [config.shadowForStrokeEnabled] flag which enables or disables shasow for stroke.  The default is true
     * @param {Boolean} [config.strokeScaleEnabled] flag which enables or disables stroke scale.  The default is true
     * @param {Boolean} [config.strokeEnabled] flag which enables or disables the stroke.  The default value is true
     * @param {String} [config.lineJoin] can be miter, round, or bevel.  The default
     *  is miter
     * @param {String} [config.lineCap] can be butt, round, or sqare.  The default
     *  is butt
     * @param {String} [config.shadowColor]
     * @param {Number} [config.shadowBlur]
     * @param {Object} [config.shadowOffset] object with x and y component
     * @param {Number} [config.shadowOffsetX]
     * @param {Number} [config.shadowOffsetY]
     * @param {Number} [config.shadowOpacity] shadow opacity.  Can be any real number
     *  between 0 and 1
     * @param {Boolean} [config.shadowEnabled] flag which enables or disables the shadow.  The default value is true
     * @param {Array} [config.dash]
     * @param {Boolean} [config.dashEnabled] flag which enables or disables the dashArray.  The default value is true
   * @param {Number} [config.x]
     * @param {Number} [config.y]
     * @param {Number} [config.width]
     * @param {Number} [config.height]
     * @param {Boolean} [config.visible]
     * @param {Boolean} [config.listening] whether or not the node is listening for events
     * @param {String} [config.id] unique id
     * @param {String} [config.name] non-unique name
     * @param {Number} [config.opacity] determines node opacity.  Can be any number between 0 and 1
     * @param {Object} [config.scale] set scale
     * @param {Number} [config.scaleX] set scale x
     * @param {Number} [config.scaleY] set scale y
     * @param {Number} [config.rotation] rotation in degrees
     * @param {Object} [config.offset] offset from center point and rotation point
     * @param {Number} [config.offsetX] set offset x
     * @param {Number} [config.offsetY] set offset y
     * @param {Boolean} [config.draggable] makes the node draggable.  When stages are draggable, you can drag and drop
     *  the entire stage by dragging any portion of the stage
     * @param {Number} [config.dragDistance]
     * @param {Function} [config.dragBoundFunc]
   * @example
   * var star = new Konva.Star({
   *   x: 100,
   *   y: 200,
   *   numPoints: 5,
   *   innerRadius: 70,
   *   outerRadius: 70,
   *   fill: 'red',
   *   stroke: 'black',
   *   strokeWidth: 4
   * });
   */
  Konva.Star = function(config) {
    this.___init(config);
  };

  Konva.Star.prototype = {
    _centroid: true,
    ___init: function(config) {
      // call super constructor
      Konva.Shape.call(this, config);
      this.className = 'Star';
      this.sceneFunc(this._sceneFunc);
    },
    _sceneFunc: function(context) {
      var innerRadius = this.innerRadius(),
        outerRadius = this.outerRadius(),
        numPoints = this.numPoints();

      context.beginPath();
      context.moveTo(0, 0 - outerRadius);

      for (var n = 1; n < numPoints * 2; n++) {
        var radius = n % 2 === 0 ? outerRadius : innerRadius;
        var x = radius * Math.sin(n * Math.PI / numPoints);
        var y = -1 * radius * Math.cos(n * Math.PI / numPoints);
        context.lineTo(x, y);
      }
      context.closePath();

      context.fillStrokeShape(this);
    },
    // implements Shape.prototype.getWidth()
    getWidth: function() {
      return this.getOuterRadius() * 2;
    },
    // implements Shape.prototype.getHeight()
    getHeight: function() {
      return this.getOuterRadius() * 2;
    },
    // implements Shape.prototype.setWidth()
    setWidth: function(width) {
      Konva.Node.prototype.setWidth.call(this, width);
      if (this.outerRadius() !== width / 2) {
        this.setOuterRadius(width / 2);
      }
    },
    // implements Shape.prototype.setHeight()
    setHeight: function(height) {
      Konva.Node.prototype.setHeight.call(this, height);
      if (this.outerRadius() !== height / 2) {
        this.setOuterRadius(height / 2);
      }
    }
  };
  Konva.Util.extend(Konva.Star, Konva.Shape);

  // add getters setters
  Konva.Factory.addGetterSetter(
    Konva.Star,
    'numPoints',
    5,
    Konva.Validators.getNumberValidator()
  );

  /**
   * set number of points
   * @name setNumPoints
   * @method
   * @memberof Konva.Star.prototype
   * @param {Integer} points
   */

  /**
   * get number of points
   * @name getNumPoints
   * @method
   * @memberof Konva.Star.prototype
   */

  Konva.Factory.addGetterSetter(
    Konva.Star,
    'innerRadius',
    0,
    Konva.Validators.getNumberValidator()
  );

  /**
   * set inner radius
   * @name setInnerRadius
   * @method
   * @memberof Konva.Star.prototype
   * @param {Number} radius
   */

  /**
   * get inner radius
   * @name getInnerRadius
   * @method
   * @memberof Konva.Star.prototype
   */

  Konva.Factory.addGetterSetter(
    Konva.Star,
    'outerRadius',
    0,
    Konva.Validators.getNumberValidator()
  );

  /**
   * set outer radius
   * @name setOuterRadius
   * @method
   * @memberof Konva.Star.prototype
   * @param {Number} radius
   */

  /**
   * get outer radius
   * @name getOuterRadius
   * @method
   * @memberof Konva.Star.prototype
   */

  Konva.Collection.mapMethods(Konva.Star);
})();

(function() {
  'use strict';
  // constants
  var ATTR_CHANGE_LIST = [
      'fontFamily',
      'fontSize',
      'fontStyle',
      'padding',
      'lineHeight',
      'text',
      'width'
    ],
    CHANGE_KONVA = 'Change.konva',
    NONE = 'none',
    UP = 'up',
    RIGHT = 'right',
    DOWN = 'down',
    LEFT = 'left',
    LABEL = 'Label',
    // cached variables
    attrChangeListLen = ATTR_CHANGE_LIST.length;

  /**
   * Label constructor.&nbsp; Labels are groups that contain a Text and Tag shape
   * @constructor
   * @memberof Konva
   * @param {Object} config
   * @param {Number} [config.x]
     * @param {Number} [config.y]
     * @param {Number} [config.width]
     * @param {Number} [config.height]
     * @param {Boolean} [config.visible]
     * @param {Boolean} [config.listening] whether or not the node is listening for events
     * @param {String} [config.id] unique id
     * @param {String} [config.name] non-unique name
     * @param {Number} [config.opacity] determines node opacity.  Can be any number between 0 and 1
     * @param {Object} [config.scale] set scale
     * @param {Number} [config.scaleX] set scale x
     * @param {Number} [config.scaleY] set scale y
     * @param {Number} [config.rotation] rotation in degrees
     * @param {Object} [config.offset] offset from center point and rotation point
     * @param {Number} [config.offsetX] set offset x
     * @param {Number} [config.offsetY] set offset y
     * @param {Boolean} [config.draggable] makes the node draggable.  When stages are draggable, you can drag and drop
     *  the entire stage by dragging any portion of the stage
     * @param {Number} [config.dragDistance]
     * @param {Function} [config.dragBoundFunc]
   * @example
   * // create label
   * var label = new Konva.Label({
   *   x: 100,
   *   y: 100,
   *   draggable: true
   * });
   *
   * // add a tag to the label
   * label.add(new Konva.Tag({
   *   fill: '#bbb',
   *   stroke: '#333',
   *   shadowColor: 'black',
   *   shadowBlur: 10,
   *   shadowOffset: [10, 10],
   *   shadowOpacity: 0.2,
   *   lineJoin: 'round',
   *   pointerDirection: 'up',
   *   pointerWidth: 20,
   *   pointerHeight: 20,
   *   cornerRadius: 5
   * }));
   *
   * // add text to the label
   * label.add(new Konva.Text({
   *   text: 'Hello World!',
   *   fontSize: 50,
   *   lineHeight: 1.2,
   *   padding: 10,
   *   fill: 'green'
   *  }));
   */
  Konva.Label = function(config) {
    this.____init(config);
  };

  Konva.Label.prototype = {
    ____init: function(config) {
      var that = this;

      Konva.Group.call(this, config);
      this.className = LABEL;

      this.on('add.konva', function(evt) {
        that._addListeners(evt.child);
        that._sync();
      });
    },
    /**
     * get Text shape for the label.  You need to access the Text shape in order to update
     * the text properties
     * @name getText
     * @method
     * @memberof Konva.Label.prototype
     */
    getText: function() {
      return this.find('Text')[0];
    },
    /**
     * get Tag shape for the label.  You need to access the Tag shape in order to update
     * the pointer properties and the corner radius
     * @name getTag
     * @method
     * @memberof Konva.Label.prototype
     */
    getTag: function() {
      return this.find('Tag')[0];
    },
    _addListeners: function(text) {
      var that = this,
        n;
      var func = function() {
        that._sync();
      };

      // update text data for certain attr changes
      for (n = 0; n < attrChangeListLen; n++) {
        text.on(ATTR_CHANGE_LIST[n] + CHANGE_KONVA, func);
      }
    },
    getWidth: function() {
      return this.getText().getWidth();
    },
    getHeight: function() {
      return this.getText().getHeight();
    },
    _sync: function() {
      var text = this.getText(),
        tag = this.getTag(),
        width,
        height,
        pointerDirection,
        pointerWidth,
        x,
        y,
        pointerHeight;

      if (text && tag) {
        width = text.getWidth();
        height = text.getHeight();
        pointerDirection = tag.getPointerDirection();
        pointerWidth = tag.getPointerWidth();
        pointerHeight = tag.getPointerHeight();
        x = 0;
        y = 0;

        switch (pointerDirection) {
          case UP:
            x = width / 2;
            y = -1 * pointerHeight;
            break;
          case RIGHT:
            x = width + pointerWidth;
            y = height / 2;
            break;
          case DOWN:
            x = width / 2;
            y = height + pointerHeight;
            break;
          case LEFT:
            x = -1 * pointerWidth;
            y = height / 2;
            break;
        }

        tag.setAttrs({
          x: -1 * x,
          y: -1 * y,
          width: width,
          height: height
        });

        text.setAttrs({
          x: -1 * x,
          y: -1 * y
        });
      }
    }
  };

  Konva.Util.extend(Konva.Label, Konva.Group);

  Konva.Collection.mapMethods(Konva.Label);

  /**
   * Tag constructor.&nbsp; A Tag can be configured
   *  to have a pointer element that points up, right, down, or left
   * @constructor
   * @memberof Konva
   * @param {Object} config
   * @param {String} [config.pointerDirection] can be up, right, down, left, or none; the default
   *  is none.  When a pointer is present, the positioning of the label is relative to the tip of the pointer.
   * @param {Number} [config.pointerWidth]
   * @param {Number} [config.pointerHeight]
   * @param {Number} [config.cornerRadius]
   */
  Konva.Tag = function(config) {
    this.___init(config);
  };

  Konva.Tag.prototype = {
    ___init: function(config) {
      Konva.Shape.call(this, config);
      this.className = 'Tag';
      this.sceneFunc(this._sceneFunc);
    },
    _sceneFunc: function(context) {
      var width = this.getWidth(),
        height = this.getHeight(),
        pointerDirection = this.getPointerDirection(),
        pointerWidth = this.getPointerWidth(),
        pointerHeight = this.getPointerHeight(),
        cornerRadius = Math.min(this.getCornerRadius(), width / 2, height / 2);

      context.beginPath();
      if (!cornerRadius) {
        context.moveTo(0, 0);
      } else {
        context.moveTo(cornerRadius, 0);
      }

      if (pointerDirection === UP) {
        context.lineTo((width - pointerWidth) / 2, 0);
        context.lineTo(width / 2, -1 * pointerHeight);
        context.lineTo((width + pointerWidth) / 2, 0);
      }

      if (!cornerRadius) {
        context.lineTo(width, 0);
      } else {
        context.lineTo(width - cornerRadius, 0);
        context.arc(
          width - cornerRadius,
          cornerRadius,
          cornerRadius,
          Math.PI * 3 / 2,
          0,
          false
        );
      }

      if (pointerDirection === RIGHT) {
        context.lineTo(width, (height - pointerHeight) / 2);
        context.lineTo(width + pointerWidth, height / 2);
        context.lineTo(width, (height + pointerHeight) / 2);
      }

      if (!cornerRadius) {
        context.lineTo(width, height);
      } else {
        context.lineTo(width, height - cornerRadius);
        context.arc(
          width - cornerRadius,
          height - cornerRadius,
          cornerRadius,
          0,
          Math.PI / 2,
          false
        );
      }

      if (pointerDirection === DOWN) {
        context.lineTo((width + pointerWidth) / 2, height);
        context.lineTo(width / 2, height + pointerHeight);
        context.lineTo((width - pointerWidth) / 2, height);
      }

      if (!cornerRadius) {
        context.lineTo(0, height);
      } else {
        context.lineTo(cornerRadius, height);
        context.arc(
          cornerRadius,
          height - cornerRadius,
          cornerRadius,
          Math.PI / 2,
          Math.PI,
          false
        );
      }

      if (pointerDirection === LEFT) {
        context.lineTo(0, (height + pointerHeight) / 2);
        context.lineTo(-1 * pointerWidth, height / 2);
        context.lineTo(0, (height - pointerHeight) / 2);
      }

      if (cornerRadius) {
        context.lineTo(0, cornerRadius);
        context.arc(
          cornerRadius,
          cornerRadius,
          cornerRadius,
          Math.PI,
          Math.PI * 3 / 2,
          false
        );
      }

      context.closePath();
      context.fillStrokeShape(this);
    },
    getSelfRect: function() {
      var x = 0,
        y = 0,
        pointerWidth = this.getPointerWidth(),
        pointerHeight = this.getPointerHeight(),
        direction = this.pointerDirection(),
        width = this.getWidth(),
        height = this.getHeight();

      if (direction === UP) {
        y -= pointerHeight;
        height += pointerHeight;
      } else if (direction === DOWN) {
        height += pointerHeight;
      } else if (direction === LEFT) {
        // ARGH!!! I have no idea why should I used magic 1.5!!!!!!!!!
        x -= pointerWidth * 1.5;
        width += pointerWidth;
      } else if (direction === RIGHT) {
        width += pointerWidth * 1.5;
      }
      return {
        x: x,
        y: y,
        width: width,
        height: height
      };
    }
  };

  Konva.Util.extend(Konva.Tag, Konva.Shape);
  Konva.Factory.addGetterSetter(Konva.Tag, 'pointerDirection', NONE);

  /**
   * set pointer Direction
   * @name setPointerDirection
   * @method
   * @memberof Konva.Tag.prototype
   * @param {String} pointerDirection can be up, right, down, left, or none.  The
   *  default is none
   */

  /**
   * get pointer Direction
   * @name getPointerDirection
   * @method
   * @memberof Konva.Tag.prototype
   */

  Konva.Factory.addGetterSetter(
    Konva.Tag,
    'pointerWidth',
    0,
    Konva.Validators.getNumberValidator()
  );

  /**
   * set pointer width
   * @name setPointerWidth
   * @method
   * @memberof Konva.Tag.prototype
   * @param {Number} pointerWidth
   */

  /**
   * get pointer width
   * @name getPointerWidth
   * @method
   * @memberof Konva.Tag.prototype
   */

  Konva.Factory.addGetterSetter(
    Konva.Tag,
    'pointerHeight',
    0,
    Konva.Validators.getNumberValidator()
  );

  /**
   * set pointer height
   * @name setPointerHeight
   * @method
   * @memberof Konva.Tag.prototype
   * @param {Number} pointerHeight
   */

  /**
   * get pointer height
   * @name getPointerHeight
   * @method
   * @memberof Konva.Tag.prototype
   */

  Konva.Factory.addGetterSetter(
    Konva.Tag,
    'cornerRadius',
    0,
    Konva.Validators.getNumberValidator()
  );

  /**
   * set corner radius
   * @name setCornerRadius
   * @method
   * @memberof Konva.Tag.prototype
   * @param {Number} corner radius
   */

  /**
   * get corner radius
   * @name getCornerRadius
   * @method
   * @memberof Konva.Tag.prototype
   */

  Konva.Collection.mapMethods(Konva.Tag);
})();

(function(Konva) {
  'use strict';
  /**
   * Arrow constructor
   * @constructor
   * @memberof Konva
   * @augments Konva.Shape
   * @param {Object} config
   * @param {Array} config.points Flat array of points coordinates. You should define them as [x1, y1, x2, y2, x3, y3].
   * @param {Number} [config.tension] Higher values will result in a more curvy line.  A value of 0 will result in no interpolation.
   *   The default is 0
   * @param {Number} config.pointerLength Arrow pointer length. Default value is 10.
   * @param {Number} config.pointerWidth Arrow pointer width. Default value is 10.
   * @param {Boolean} config.pointerAtBeginning Do we need to draw pointer on both sides?. Default false.
   * @param {String} [config.fill] fill color
     * @param {Image} [config.fillPatternImage] fill pattern image
     * @param {Number} [config.fillPatternX]
     * @param {Number} [config.fillPatternY]
     * @param {Object} [config.fillPatternOffset] object with x and y component
     * @param {Number} [config.fillPatternOffsetX] 
     * @param {Number} [config.fillPatternOffsetY] 
     * @param {Object} [config.fillPatternScale] object with x and y component
     * @param {Number} [config.fillPatternScaleX]
     * @param {Number} [config.fillPatternScaleY]
     * @param {Number} [config.fillPatternRotation]
     * @param {String} [config.fillPatternRepeat] can be "repeat", "repeat-x", "repeat-y", or "no-repeat".  The default is "no-repeat"
     * @param {Object} [config.fillLinearGradientStartPoint] object with x and y component
     * @param {Number} [config.fillLinearGradientStartPointX]
     * @param {Number} [config.fillLinearGradientStartPointY]
     * @param {Object} [config.fillLinearGradientEndPoint] object with x and y component
     * @param {Number} [config.fillLinearGradientEndPointX]
     * @param {Number} [config.fillLinearGradientEndPointY]
     * @param {Array} [config.fillLinearGradientColorStops] array of color stops
     * @param {Object} [config.fillRadialGradientStartPoint] object with x and y component
     * @param {Number} [config.fillRadialGradientStartPointX]
     * @param {Number} [config.fillRadialGradientStartPointY]
     * @param {Object} [config.fillRadialGradientEndPoint] object with x and y component
     * @param {Number} [config.fillRadialGradientEndPointX] 
     * @param {Number} [config.fillRadialGradientEndPointY] 
     * @param {Number} [config.fillRadialGradientStartRadius]
     * @param {Number} [config.fillRadialGradientEndRadius]
     * @param {Array} [config.fillRadialGradientColorStops] array of color stops
     * @param {Boolean} [config.fillEnabled] flag which enables or disables the fill.  The default value is true
     * @param {String} [config.fillPriority] can be color, linear-gradient, radial-graident, or pattern.  The default value is color.  The fillPriority property makes it really easy to toggle between different fill types.  For example, if you want to toggle between a fill color style and a fill pattern style, simply set the fill property and the fillPattern properties, and then use setFillPriority('color') to render the shape with a color fill, or use setFillPriority('pattern') to render the shape with the pattern fill configuration
     * @param {String} [config.stroke] stroke color
     * @param {Number} [config.strokeWidth] stroke width
     * @param {Boolean} [config.strokeHitEnabled] flag which enables or disables stroke hit region.  The default is true
     * @param {Boolean} [config.perfectDrawEnabled] flag which enables or disables using buffer canvas.  The default is true
     * @param {Boolean} [config.shadowForStrokeEnabled] flag which enables or disables shasow for stroke.  The default is true
     * @param {Boolean} [config.strokeScaleEnabled] flag which enables or disables stroke scale.  The default is true
     * @param {Boolean} [config.strokeEnabled] flag which enables or disables the stroke.  The default value is true
     * @param {String} [config.lineJoin] can be miter, round, or bevel.  The default
     *  is miter
     * @param {String} [config.lineCap] can be butt, round, or sqare.  The default
     *  is butt
     * @param {String} [config.shadowColor]
     * @param {Number} [config.shadowBlur]
     * @param {Object} [config.shadowOffset] object with x and y component
     * @param {Number} [config.shadowOffsetX]
     * @param {Number} [config.shadowOffsetY]
     * @param {Number} [config.shadowOpacity] shadow opacity.  Can be any real number
     *  between 0 and 1
     * @param {Boolean} [config.shadowEnabled] flag which enables or disables the shadow.  The default value is true
     * @param {Array} [config.dash]
     * @param {Boolean} [config.dashEnabled] flag which enables or disables the dashArray.  The default value is true
   * @param {Number} [config.x]
     * @param {Number} [config.y]
     * @param {Number} [config.width]
     * @param {Number} [config.height]
     * @param {Boolean} [config.visible]
     * @param {Boolean} [config.listening] whether or not the node is listening for events
     * @param {String} [config.id] unique id
     * @param {String} [config.name] non-unique name
     * @param {Number} [config.opacity] determines node opacity.  Can be any number between 0 and 1
     * @param {Object} [config.scale] set scale
     * @param {Number} [config.scaleX] set scale x
     * @param {Number} [config.scaleY] set scale y
     * @param {Number} [config.rotation] rotation in degrees
     * @param {Object} [config.offset] offset from center point and rotation point
     * @param {Number} [config.offsetX] set offset x
     * @param {Number} [config.offsetY] set offset y
     * @param {Boolean} [config.draggable] makes the node draggable.  When stages are draggable, you can drag and drop
     *  the entire stage by dragging any portion of the stage
     * @param {Number} [config.dragDistance]
     * @param {Function} [config.dragBoundFunc]
   * @example
   * var line = new Konva.Line({
   *   points: [73, 70, 340, 23, 450, 60, 500, 20],
   *   stroke: 'red',
   *   tension: 1,
   *   pointerLength : 10,
   *   pointerWidth : 12
   * });
   */
  Konva.Arrow = function(config) {
    this.____init(config);
  };

  Konva.Arrow.prototype = {
    ____init: function(config) {
      // call super constructor
      Konva.Line.call(this, config);
      this.className = 'Arrow';
    },
    _sceneFunc: function(ctx) {
      Konva.Line.prototype._sceneFunc.apply(this, arguments);
      var PI2 = Math.PI * 2;
      var points = this.points();

      var tp = points;
      var fromTension = this.getTension() !== 0 && points.length > 4;
      if (fromTension) {
        tp = this.getTensionPoints();
      }

      var n = points.length;

      var dx, dy;
      if (fromTension) {
        dx = points[n - 2] - tp[n - 2];
        dy = points[n - 1] - tp[n - 1];
      } else {
        dx = points[n - 2] - points[n - 4];
        dy = points[n - 1] - points[n - 3];
      }

      var radians = (Math.atan2(dy, dx) + PI2) % PI2;
      var length = this.pointerLength();
      var width = this.pointerWidth();

      ctx.save();
      ctx.beginPath();
      ctx.translate(points[n - 2], points[n - 1]);
      ctx.rotate(radians);
      ctx.moveTo(0, 0);
      ctx.lineTo(-length, width / 2);
      ctx.lineTo(-length, -width / 2);
      ctx.closePath();
      ctx.restore();

      if (this.pointerAtBeginning()) {
        ctx.save();
        ctx.translate(points[0], points[1]);
        if (fromTension) {
          dx = tp[0] - points[0];
          dy = tp[1] - points[1];
        } else {
          dx = points[2] - points[0];
          dy = points[3] - points[1];
        }

        ctx.rotate((Math.atan2(-dy, -dx) + PI2) % PI2);
        ctx.moveTo(0, 0);
        ctx.lineTo(-length, width / 2);
        ctx.lineTo(-length, -width / 2);
        ctx.closePath();
        ctx.restore();
      }

      // here is a tricky part
      // we need to disable dash for arrow pointers
      var isDashEnabled = this.dashEnabled();
      if (isDashEnabled) {
        // manually disable dash for head
        // it is better not to use setter here,
        // because it will trigger attr change event
        this.attrs.dashEnabled = false;
        ctx.setLineDash([]);
      }

      ctx.fillStrokeShape(this);

      // restore old value
      if (isDashEnabled) {
        this.attrs.dashEnabled = true;
      }
    }
  };

  Konva.Util.extend(Konva.Arrow, Konva.Line);
  /**
   * get/set pointerLength
   * @name pointerLength
   * @method
   * @memberof Konva.Arrow.prototype
   * @param {Number} Length of pointer of arrow.
   *   The default is 10.
   * @returns {Number}
   * @example
   * // get tension
   * var pointerLength = line.pointerLength();
   *
   * // set tension
   * line.pointerLength(15);
   */

  Konva.Factory.addGetterSetter(
    Konva.Arrow,
    'pointerLength',
    10,
    Konva.Validators.getNumberValidator()
  );
  /**
   * get/set pointerWidth
   * @name pointerWidth
   * @method
   * @memberof Konva.Arrow.prototype
   * @param {Number} Width of pointer of arrow.
   *   The default is 10.
   * @returns {Number}
   * @example
   * // get tension
   * var pointerWidth = line.pointerWidth();
   *
   * // set tension
   * line.pointerWidth(15);
   */

  Konva.Factory.addGetterSetter(
    Konva.Arrow,
    'pointerWidth',
    10,
    Konva.Validators.getNumberValidator()
  );
  /**
   * get/set pointerAtBeginning
   * @name pointerAtBeginning
   * @method
   * @memberof Konva.Arrow.prototype
   * @param {Number} Should pointer displayed at beginning of arrow.
   *   The default is false.
   * @returns {Boolean}
   * @example
   * // get tension
   * var pointerAtBeginning = line.pointerAtBeginning();
   *
   * // set tension
   * line.pointerAtBeginning(true);
   */

  Konva.Factory.addGetterSetter(Konva.Arrow, 'pointerAtBeginning', false);
  Konva.Collection.mapMethods(Konva.Arrow);
})(Konva);

(function(Konva) {
  'use strict';

  var ATTR_CHANGE_LIST = [
    'resizeEnabledChange',
    'rotateAnchorOffsetChange',
    'rotateEnabledChange',
    'enabledAnchorsChange',
    'anchorSizeChange',
    'borderEnabledChange',
    'borderStrokeChange',
    'borderStrokeWidthChange',
    'anchorStrokeChange',
    'anchorStrokeWidthChange',
    'anchorFillChange',
    'anchorCornerRadiusChange'
  ].join(' ');

  var NODE_RECT = 'nodeRect';

  var TRANSFORM_CHANGE_STR = [
    'xChange.resizer',
    'yChange.resizer',
    'widthChange.resizer',
    'heightChange.resizer',
    'scaleXChange.resizer',
    'scaleYChange.resizer',
    'skewXChange.resizer',
    'skewYChange.resizer',
    'rotationChange.resizer',
    'offsetXChange.resizer',
    'offsetYChange.resizer',
    'transformsEnabledChange.resizer'
  ].join(' ');

  var REDRAW_CHANGE_STR = [
    'widthChange.resizer',
    'heightChange.resizer',
    'scaleXChange.resizer',
    'scaleYChange.resizer',
    'skewXChange.resizer',
    'skewYChange.resizer',
    'rotationChange.resizer',
    'offsetXChange.resizer',
    'offsetYChange.resizer'
  ].join(' ');

  var ANGLES = {
    'top-left': -45,
    'top-center': 0,
    'top-right': 45,
    'middle-right': -90,
    'middle-left': 90,
    'bottom-left': -135,
    'bottom-center': 180,
    'bottom-right': 135
  };

  function getCursor(anchorName, rad, isMirrored) {
    if (anchorName === 'rotater') {
      return 'crosshair';
    }

    rad += Konva.Util._degToRad(ANGLES[anchorName] || 0);
    // If we are mirrored, we need to mirror the angle (this is not the same as
    // rotate).
    if (isMirrored) {
      rad *= -1;
    }
    var angle = (Konva.Util._radToDeg(rad) % 360 + 360) % 360;

    if (
      Konva.Util._inRange(angle, 315 + 22.5, 360) ||
      Konva.Util._inRange(angle, 0, 22.5)
    ) {
      // TOP
      return 'ns-resize';
    } else if (Konva.Util._inRange(angle, 45 - 22.5, 45 + 22.5)) {
      // TOP - RIGHT
      return 'nesw-resize';
    } else if (Konva.Util._inRange(angle, 90 - 22.5, 90 + 22.5)) {
      // RIGHT
      return 'ew-resize';
    } else if (Konva.Util._inRange(angle, 135 - 22.5, 135 + 22.5)) {
      // BOTTOM - RIGHT
      return 'nwse-resize';
    } else if (Konva.Util._inRange(angle, 180 - 22.5, 180 + 22.5)) {
      // BOTTOM
      return 'ns-resize';
    } else if (Konva.Util._inRange(angle, 225 - 22.5, 225 + 22.5)) {
      // BOTTOM - LEFT
      return 'nesw-resize';
    } else if (Konva.Util._inRange(angle, 270 - 22.5, 270 + 22.5)) {
      // RIGHT
      return 'ew-resize';
    } else if (Konva.Util._inRange(angle, 315 - 22.5, 315 + 22.5)) {
      // BOTTOM - RIGHT
      return 'nwse-resize';
    } else {
      // how can we can there?
      // TODO: throw error
      Konva.Util.error(
        'Transformer has unknown angle for cursor detection: ' + angle
      );
      return 'pointer';
    }
  }

  /**
   * Transformer constructor.  Transformer is a special type of group that allow you transform Konva
   * primitives and shapes. Transforming tool is not changing `width` and `height` properties of nodes
   * when you resize them. Instead it changes `scaleX` and `scaleY` properties.
   * @constructor
   * @memberof Konva
   * @param {Object} config
   * @param {Boolean} [config.resizeEnabled] Default is true
   * @param {Boolean} [config.rotateEnabled] Default is true
   * @param {Array} [config.rotationSnaps] Array of angles for rotation snaps. Default is []
   * @param {Number} [config.rotateAnchorOffset] Default is 50
   * @param {Number} [config.padding] Default is 0
   * @param {Boolean} [config.borderEnabled] Should we draw border? Default is true
   * @param {String} [config.borderStroke] Border stroke color
   * @param {Number} [config.borderStrokeWidth] Border stroke size
   * @param {Array} [config.borderDash] Array for border dash.
   * @param {String} [config.anchorFill] Anchor fill color
   * @param {String} [config.anchorStroke] Anchor stroke color
   * @param {String} [config.anchorCornerRadius] Anchor corner radius
   * @param {Number} [config.anchorStrokeWidth] Anchor stroke size
   * @param {Number} [config.anchorSize] Default is 10
   * @param {Boolean} [config.keepRatio] Should we keep ratio when we are moving edges? Default is true
   * @param {Boolean} [config.centeredScaling] Should we resize relative to node's center? Default is false
   * @param {Array} [config.enabledAnchors] Array of names of enabled handles
   * @param {Function} [config.boundBoxFunc] Bounding box function
   * @example
   * var transformer = new Konva.Transformer({
   *   node: rectangle,
   *   rotateAnchorOffset: 60,
   *   enabledAnchors: ['top-left', 'top-right', 'bottom-left', 'bottom-right']
   * });
   * layer.add(transformer);
   */

  Konva.Transformer = function(config) {
    this.____init(config);
  };

  var ANCHORS_NAMES = [
    'top-left',
    'top-center',
    'top-right',
    'middle-right',
    'middle-left',
    'bottom-left',
    'bottom-center',
    'bottom-right'
  ];

  Konva.Transformer.prototype = {
    _centroid: false,
    ____init: function(config) {
      // call super constructor
      Konva.Group.call(this, config);
      this.className = 'Transformer';
      this._createElements();

      // bindings
      this._handleMouseMove = this._handleMouseMove.bind(this);
      this._handleMouseUp = this._handleMouseUp.bind(this);
      this.update = this.update.bind(this);

      // update transformer data for certain attr changes
      this.on(ATTR_CHANGE_LIST, this.update);

      if (this.getNode()) {
        this.update();
      }
    },

    /**
     * alias to `setNode`
     * @method
     * @memberof Konva.Transformer.prototype
     * @returns {Konva.Transformer}
     * @example
     * transformer.attachTo(shape);
     */
    attachTo: function(node) {
      this.setNode(node);
    },

    /**
     * attach transformer to a Konva.Node. Transformer will adapt to its size and listen its events
     * @method
     * @memberof Konva.Transformer.prototype
     * @returns {Konva.Transformer}
     * @example
     * transformer.setNode(shape);
     */
    setNode: function(node) {
      if (this._node) {
        this.detach();
      }
      this._node = node;
      this._resetTransformCache();

      node.on(TRANSFORM_CHANGE_STR, this._resetTransformCache.bind(this));
      node.on(
        REDRAW_CHANGE_STR,
        function() {
          if (!this._transforming) {
            this.update();
          }
        }.bind(this)
      );

      // TODO: why do we need this?
      var elementsCreated = !!this.findOne('.top-left');
      if (elementsCreated) {
        this.update();
      }
      return this;
    },

    getNode: function() {
      return this._node;
    },

    /**
     * detach transformer from a attached node
     * @method
     * @memberof Konva.Transformer.prototype
     * @returns {Konva.Transformer}
     * @example
     * transformer.detach();
     */
    detach: function() {
      if (this.getNode()) {
        this.getNode().off('.resizer');
        this._node = undefined;
      }
      this._resetTransformCache();
    },

    _resetTransformCache: function() {
      this._clearCache(NODE_RECT);
      this._clearCache('transform');
      this._clearSelfAndDescendantCache('absoluteTransform');
    },

    _getNodeRect: function() {
      return this._getCache(NODE_RECT, this.__getNodeRect);
    },

    __getNodeRect: function() {
      var node = this.getNode();
      if (!node) {
        return {
          x: -Number.MAX_SAFE_INTEGER,
          y: -Number.MAX_SAFE_INTEGER,
          width: 0,
          height: 0,
          rotation: 0
        };
      }
      var rect = node.getClientRect({ skipTransform: true, skipShadow: true });
      var rotation = Konva.getAngle(node.rotation());

      var dx = rect.x * node.scaleX() - node.offsetX() * node.scaleX();
      var dy = rect.y * node.scaleY() - node.offsetY() * node.scaleY();

      return {
        x: node.x() + dx * Math.cos(rotation) + dy * Math.sin(-rotation),
        y: node.y() + dy * Math.cos(rotation) + dx * Math.sin(rotation),
        width: rect.width * node.scaleX(),
        height: rect.height * node.scaleY(),
        rotation: node.rotation()
      };
    },

    getX: function() {
      return this._getNodeRect().x;
    },

    getY: function() {
      return this._getNodeRect().y;
    },

    getRotation: function() {
      return this._getNodeRect().rotation;
    },

    getWidth: function() {
      return this._getNodeRect().width;
    },

    getHeight: function() {
      return this._getNodeRect().height;
    },

    _createElements: function() {
      this._createBack();

      ANCHORS_NAMES.forEach(
        function(name) {
          this._createAnchor(name);
        }.bind(this)
      );

      this._createAnchor('rotater');
    },

    _createAnchor: function(name) {
      var anchor = new Konva.Rect({
        stroke: 'rgb(0, 161, 255)',
        fill: 'white',
        strokeWidth: 1,
        name: name + ' _anchor',
        dragDistance: 0,
        draggable: true
      });
      var self = this;
      anchor.on('mousedown touchstart', function(e) {
        self._handleMouseDown(e);
      });
      anchor.on('dragstart', function(e) {
        e.cancelBubble = true;
      });
      anchor.on('dragmove', function(e) {
        e.cancelBubble = true;
      });
      anchor.on('dragend', function(e) {
        e.cancelBubble = true;
      });

      // add hover styling
      anchor.on('mouseenter', function() {
        var tr = this.getParent();

        var rad = Konva.getAngle(tr.rotation());

        var scale = tr.getNode().getAbsoluteScale();
        // If scale.y < 0 xor scale.x < 0 we need to flip (not rotate).
        var isMirrored = scale.y * scale.x < 0;
        var cursor = getCursor(name, rad, isMirrored);
        anchor.getStage().content.style.cursor = cursor;
        tr._cursorChange = true;
      });
      anchor.on('mouseout', function() {
        if (!anchor.getStage() || !this.getParent()) {
          return;
        }
        anchor.getStage().content.style.cursor = '';
        this.getParent()._cursorChange = false;
      });
      this.add(anchor);
    },

    _createBack: function() {
      var back = new Konva.Shape({
        name: 'back',
        width: 0,
        height: 0,
        listening: false,
        sceneFunc: function(ctx) {
          var tr = this.getParent();
          var padding = tr.getPadding();
          ctx.beginPath();
          ctx.rect(
            -padding,
            -padding,
            this.width() + padding * 2,
            this.height() + padding * 2
          );
          ctx.moveTo(this.width() / 2, -padding);
          if (tr.rotateEnabled()) {
            ctx.lineTo(
              this.width() / 2,
              -tr.rotateAnchorOffset() * Konva.Util._sign(this.height())
            );
          }

          ctx.fillStrokeShape(this);
        }
      });
      this.add(back);
    },

    _handleMouseDown: function(e) {
      this.movingResizer = e.target.name().split(' ')[0];

      // var node = this.getNode();
      var attrs = this._getNodeRect();
      var width = attrs.width;
      var height = attrs.height;
      var hypotenuse = Math.sqrt(Math.pow(width, 2) + Math.pow(height, 2));
      this.sin = height / hypotenuse;
      this.cos = width / hypotenuse;

      window.addEventListener('mousemove', this._handleMouseMove);
      window.addEventListener('touchmove', this._handleMouseMove);
      window.addEventListener('mouseup', this._handleMouseUp, true);
      window.addEventListener('touchend', this._handleMouseUp, true);

      this._transforming = true;

      this._fire('transformstart', { evt: e });
      this.getNode()._fire('transformstart', { evt: e });
    },

    _handleMouseMove: function(e) {
      var x, y, newHypotenuse;
      var resizerNode = this.findOne('.' + this.movingResizer);
      var stage = resizerNode.getStage();

      var box = stage.getContent().getBoundingClientRect();
      var zeroPoint = {
        x: box.left,
        y: box.top
      };
      var pointerPos = {
        left: e.clientX !== undefined ? e.clientX : e.touches[0].clientX,
        top: e.clientX !== undefined ? e.clientY : e.touches[0].clientY
      };
      var newAbsPos = {
        x: pointerPos.left - zeroPoint.x,
        y: pointerPos.top - zeroPoint.y
      };

      resizerNode.setAbsolutePosition(newAbsPos);

      var keepProportion = this.keepRatio() || e.shiftKey;

      // console.log(keepProportion);

      if (this.movingResizer === 'top-left') {
        if (keepProportion) {
          newHypotenuse = Math.sqrt(
            Math.pow(this.findOne('.bottom-right').x() - resizerNode.x(), 2) +
              Math.pow(this.findOne('.bottom-right').y() - resizerNode.y(), 2)
          );

          x = newHypotenuse * this.cos;
          y = newHypotenuse * this.sin;

          this.findOne('.top-left').x(this.findOne('.bottom-right').x() - x);
          this.findOne('.top-left').y(this.findOne('.bottom-right').y() - y);
        }
      } else if (this.movingResizer === 'top-center') {
        this.findOne('.top-left').y(resizerNode.y());
      } else if (this.movingResizer === 'top-right') {
        if (keepProportion) {
          newHypotenuse = Math.sqrt(
            Math.pow(this.findOne('.bottom-left').x() - resizerNode.x(), 2) +
              Math.pow(this.findOne('.bottom-left').y() - resizerNode.y(), 2)
          );

          x = newHypotenuse * this.cos;
          y = newHypotenuse * this.sin;

          this.findOne('.top-right').x(x);
          this.findOne('.top-right').y(this.findOne('.bottom-left').y() - y);
        }
        var pos = resizerNode.position();

        this.findOne('.top-left').y(pos.y);
        this.findOne('.bottom-right').x(pos.x);
      } else if (this.movingResizer === 'middle-left') {
        this.findOne('.top-left').x(resizerNode.x());
      } else if (this.movingResizer === 'middle-right') {
        this.findOne('.bottom-right').x(resizerNode.x());
      } else if (this.movingResizer === 'bottom-left') {
        if (keepProportion) {
          newHypotenuse = Math.sqrt(
            Math.pow(this.findOne('.top-right').x() - resizerNode.x(), 2) +
              Math.pow(this.findOne('.top-right').y() - resizerNode.y(), 2)
          );

          x = newHypotenuse * this.cos;
          y = newHypotenuse * this.sin;

          this.findOne('.bottom-left').x(this.findOne('.top-right').x() - x);
          this.findOne('.bottom-left').y(y);
        }

        pos = resizerNode.position();

        this.findOne('.top-left').x(pos.x);
        this.findOne('.bottom-right').y(pos.y);
      } else if (this.movingResizer === 'bottom-center') {
        this.findOne('.bottom-right').y(resizerNode.y());
      } else if (this.movingResizer === 'bottom-right') {
        if (keepProportion) {
          newHypotenuse = Math.sqrt(
            Math.pow(this.findOne('.bottom-right').x(), 2) +
              Math.pow(this.findOne('.bottom-right').y(), 2)
          );

          x = newHypotenuse * this.cos;
          y = newHypotenuse * this.sin;

          this.findOne('.bottom-right').x(x);
          this.findOne('.bottom-right').y(y);
        }
      } else if (this.movingResizer === 'rotater') {
        var padding = this.getPadding();
        var attrs = this._getNodeRect();
        x = resizerNode.x() - attrs.width / 2;
        y = -resizerNode.y() + attrs.height / 2;

        var dAlpha = Math.atan2(-y, x) + Math.PI / 2;

        if (attrs.height < 0) {
          dAlpha -= Math.PI;
        }

        var rot = Konva.getAngle(this.rotation());

        var newRotation =
          Konva.Util._radToDeg(rot) + Konva.Util._radToDeg(dAlpha);

        var alpha = Konva.getAngle(this.getNode().rotation());
        var newAlpha = Konva.Util._degToRad(newRotation);

        var snaps = this.rotationSnaps();
        var offset = 0.1;
        for (var i = 0; i < snaps.length; i++) {
          var angle = Konva.getAngle(snaps[i]);

          var dif =
            Math.abs(angle - Konva.Util._degToRad(newRotation)) % (Math.PI * 2);

          if (dif < offset) {
            newRotation = Konva.Util._radToDeg(angle);
            newAlpha = Konva.Util._degToRad(newRotation);
          }
        }

        var dx = padding;
        var dy = padding;

        this._fitNodeInto(
          {
            rotation: Konva.angleDeg
              ? newRotation
              : Konva.Util._degToRad(newRotation),
            x:
              attrs.x +
              (attrs.width / 2 + padding) *
                (Math.cos(alpha) - Math.cos(newAlpha)) +
              (attrs.height / 2 + padding) *
                (Math.sin(-alpha) - Math.sin(-newAlpha)) -
              (dx * Math.cos(rot) + dy * Math.sin(-rot)),
            y:
              attrs.y +
              (attrs.height / 2 + padding) *
                (Math.cos(alpha) - Math.cos(newAlpha)) +
              (attrs.width / 2 + padding) *
                (Math.sin(alpha) - Math.sin(newAlpha)) -
              (dy * Math.cos(rot) + dx * Math.sin(rot)),
            width: attrs.width + padding * 2,
            height: attrs.height + padding * 2
          },
          e
        );
      } else {
        console.error(
          new Error(
            'Wrong position argument of selection resizer: ',
            this.movingResizer
          )
        );
      }

      if (this.movingResizer === 'rotater') {
        return;
      }

      var absPos = this.findOne('.top-left').getAbsolutePosition(
        this.getParent()
      );

      var centeredScaling = this.getCenteredScaling() || e.altKey;
      if (centeredScaling) {
        var topLeft = this.findOne('.top-left');
        var bottomRight = this.findOne('.bottom-right');
        var topOffsetX = topLeft.x();
        var topOffsetY = topLeft.y();

        var bottomOffsetX = this.getWidth() - bottomRight.x();
        var bottomOffsetY = this.getHeight() - bottomRight.y();

        // console.log(topOffsetX, topOffsetY, bottomOffsetX, bottomOffsetY);

        bottomRight.move({
          x: -topOffsetX,
          y: -topOffsetY
        });

        topLeft.move({
          x: bottomOffsetX,
          y: bottomOffsetY
        });

        absPos = topLeft.getAbsolutePosition(this.getParent());
      }

      x = absPos.x;
      y = absPos.y;
      var width =
        this.findOne('.bottom-right').x() - this.findOne('.top-left').x();

      var height =
        this.findOne('.bottom-right').y() - this.findOne('.top-left').y();

      // console.log(x, y, width, height);

      this._fitNodeInto(
        {
          x: x + this.offsetX(),
          y: y + this.offsetY(),
          width: width,
          height: height
        },
        e
      );
    },

    _handleMouseUp: function(e) {
      this._removeEvents(e);
    },

    _removeEvents: function(e) {
      if (this._transforming) {
        this._transforming = false;
        window.removeEventListener('mousemove', this._handleMouseMove);
        window.removeEventListener('touchmove', this._handleMouseMove);
        window.removeEventListener('mouseup', this._handleMouseUp, true);
        window.removeEventListener('touchend', this._handleMouseUp, true);
        this._fire('transformend', { evt: e });
        var node = this.getNode();
        if (node) {
          node.fire('transformend', { evt: e });
        }
      }
    },

    _fitNodeInto: function(newAttrs, evt) {
      // waring! in this attrs padding may be included
      var boundBoxFunc = this.getBoundBoxFunc();
      if (boundBoxFunc) {
        var oldAttrs = this._getNodeRect();
        newAttrs = boundBoxFunc.call(this, oldAttrs, newAttrs);
      }
      this._settings = true;
      var node = this.getNode();
      if (newAttrs.rotation !== undefined) {
        this.getNode().rotation(newAttrs.rotation);
      }
      var pure = node.getClientRect({ skipTransform: true, skipShadow: true });
      var padding = this.getPadding();
      var scaleX = (newAttrs.width - padding * 2) / pure.width;
      var scaleY = (newAttrs.height - padding * 2) / pure.height;

      var rotation = Konva.getAngle(node.getRotation());
      var dx = pure.x * scaleX - padding - node.offsetX() * scaleX;
      var dy = pure.y * scaleY - padding - node.offsetY() * scaleY;

      this.getNode().setAttrs({
        scaleX: scaleX,
        scaleY: scaleY,
        x: newAttrs.x - (dx * Math.cos(rotation) + dy * Math.sin(-rotation)),
        y: newAttrs.y - (dy * Math.cos(rotation) + dx * Math.sin(rotation))
      });
      this._settings = false;

      this._fire('transform', { evt: evt });
      this.getNode()._fire('transform', { evt: evt });
      this.update();
      this.getLayer().batchDraw();
    },
    /**
     * force update of Konva.Transformer.
     * Use it when you updated attached Konva.Group and now you need to reset transformer size
     * @method
     * @memberof Konva.Transformer.prototype
     */
    forceUpdate: function() {
      this._resetTransformCache();
      this.update();
    },
    update: function() {
      var attrs = this._getNodeRect();
      var node = this.getNode();
      var scale = { x: 1, y: 1 };
      if (node && node.getParent()) {
        scale = node.getParent().getAbsoluteScale();
      }
      var invertedScale = {
        x: 1 / scale.x,
        y: 1 / scale.y
      };
      var width = attrs.width;
      var height = attrs.height;

      var enabledAnchors = this.enabledAnchors();
      var resizeEnabled = this.resizeEnabled();
      var padding = this.getPadding();

      var anchorSize = this.getAnchorSize();
      this.find('._anchor').setAttrs({
        width: anchorSize,
        height: anchorSize,
        offsetX: anchorSize / 2,
        offsetY: anchorSize / 2,
        stroke: this.getAnchorStroke(),
        strokeWidth: this.getAnchorStrokeWidth(),
        fill: this.getAnchorFill(),
        cornerRadius: this.getAnchorCornerRadius()
      });

      this.findOne('.top-left').setAttrs({
        x: -padding,
        y: -padding,
        scale: invertedScale,
        visible: resizeEnabled && enabledAnchors.indexOf('top-left') >= 0
      });
      this.findOne('.top-center').setAttrs({
        x: width / 2,
        y: -padding,
        scale: invertedScale,
        visible: resizeEnabled && enabledAnchors.indexOf('top-center') >= 0
      });
      this.findOne('.top-right').setAttrs({
        x: width + padding,
        y: -padding,
        scale: invertedScale,
        visible: resizeEnabled && enabledAnchors.indexOf('top-right') >= 0
      });
      this.findOne('.middle-left').setAttrs({
        x: -padding,
        y: height / 2,
        scale: invertedScale,
        visible: resizeEnabled && enabledAnchors.indexOf('middle-left') >= 0
      });
      this.findOne('.middle-right').setAttrs({
        x: width + padding,
        y: height / 2,
        scale: invertedScale,
        visible: resizeEnabled && enabledAnchors.indexOf('middle-right') >= 0
      });
      this.findOne('.bottom-left').setAttrs({
        x: -padding,
        y: height + padding,
        scale: invertedScale,
        visible: resizeEnabled && enabledAnchors.indexOf('bottom-left') >= 0
      });
      this.findOne('.bottom-center').setAttrs({
        x: width / 2,
        y: height + padding,
        scale: invertedScale,
        visible: resizeEnabled && enabledAnchors.indexOf('bottom-center') >= 0
      });
      this.findOne('.bottom-right').setAttrs({
        x: width + padding,
        y: height + padding,
        scale: invertedScale,
        visible: resizeEnabled && enabledAnchors.indexOf('bottom-right') >= 0
      });

      var scaledRotateAnchorOffset =
        -this.rotateAnchorOffset() * Math.abs(invertedScale.y);
      this.findOne('.rotater').setAttrs({
        x: width / 2,
        y: scaledRotateAnchorOffset * Konva.Util._sign(height),
        scale: invertedScale,
        visible: this.rotateEnabled()
      });

      this.findOne('.back').setAttrs({
        width: width * scale.x,
        height: height * scale.y,
        scale: invertedScale,
        visible: this.borderEnabled(),
        stroke: this.getBorderStroke(),
        strokeWidth: this.getBorderStrokeWidth(),
        dash: this.getBorderDash()
      });
    },
    /**
     * determine if transformer is in active transform
     * @method
     * @memberof Konva.Transformer.prototype
     * @returns {Boolean}
     */
    isTransforming: function() {
      return this._transforming;
    },
    /**
     * Stop active transform action
     * @method
     * @memberof Konva.Transformer.prototype
     * @returns {Boolean}
     */
    stopTransform: function() {
      if (this._transforming) {
        this._removeEvents();
        var resizerNode = this.findOne('.' + this.movingResizer);
        if (resizerNode) {
          resizerNode.stopDrag();
        }
      }
    },
    destroy: function() {
      // console.log(this.isTransforming() && this.getStage());
      if (this.getStage() && this._cursorChange) {
        this.getStage().content.style.cursor = '';
      }
      Konva.Group.prototype.destroy.call(this);
      this.detach();
      this._removeEvents();
    },
    // do not work as a container
    // we will recreate inner nodes manually
    toObject: function() {
      return Konva.Node.prototype.toObject.call(this);
    }
  };
  Konva.Util.extend(Konva.Transformer, Konva.Group);

  function validateResizers(val) {
    if (!(val instanceof Array)) {
      Konva.Util.warn('enabledAnchors value should be an array');
    }
    if (val instanceof Array) {
      val.forEach(function(name) {
        if (ANCHORS_NAMES.indexOf(name) === -1) {
          Konva.Util.warn(
            'Unknown anchor name: ' +
              name +
              '. Available names are: ' +
              ANCHORS_NAMES.join(', ')
          );
        }
      });
    }
    return val || [];
  }

  /**
   * get/set enabled handlers
   * @name enabledAnchors
   * @method
   * @memberof Konva.Transformer.prototype
   * @param {Array} array
   * @returns {Array}
   * @example
   * // get list of handlers
   * var enabledAnchors = transformer.enabledAnchors();
   *
   * // set handlers
   * transformer.enabledAnchors(['top-left', 'top-center', 'top-right', 'middle-right', 'middle-left', 'bottom-left', 'bottom-center', 'bottom-right']);
   */
  Konva.Factory.addGetterSetter(
    Konva.Transformer,
    'enabledAnchors',
    ANCHORS_NAMES,
    validateResizers
  );

  /**
   * get/set resize ability. If false it will automatically hide resizing handlers
   * @name resizeEnabled
   * @method
   * @memberof Konva.Transformer.prototype
   * @param {Array} array
   * @returns {Array}
   * @example
   * // get
   * var resizeEnabled = transformer.resizeEnabled();
   *
   * // set
   * transformer.resizeEnabled(false);
   */
  Konva.Factory.addGetterSetter(Konva.Transformer, 'resizeEnabled', true);
  /**
   * get/set anchor size. Default is 10
   * @name validateAnchors
   * @method
   * @memberof Konva.Transformer.prototype
   * @param {Number} 10
   * @returns {Number}
   * @example
   * // get
   * var anchorSize = transformer.anchorSize();
   *
   * // set
   * transformer.anchorSize(20)
   */
  Konva.Factory.addGetterSetter(
    Konva.Transformer,
    'anchorSize',
    10,
    Konva.Validators.getNumberValidator()
  );

  /**
   * get/set ability to rotate.
   * @name rotateEnabled
   * @method
   * @memberof Konva.Transformer.prototype
   * @param {Boolean} enabled
   * @returns {Boolean}
   * @example
   * // get
   * var rotateEnabled = transformer.rotateEnabled();
   *
   * // set
   * transformer.rotateEnabled(false);
   */
  Konva.Factory.addGetterSetter(Konva.Transformer, 'rotateEnabled', true);

  /**
   * get/set rotation snaps angles.
   * @name rotationSnaps
   * @method
   * @memberof Konva.Transformer.prototype
   * @param {Array} array
   * @returns {Array}
   * @example
   * // get
   * var rotationSnaps = transformer.rotationSnaps();
   *
   * // set
   * transformer.rotationSnaps([0, 90, 180, 270]);
   */
  Konva.Factory.addGetterSetter(Konva.Transformer, 'rotationSnaps', []);

  /**
   * get/set distance for rotation handler
   * @name rotateAnchorOffset
   * @method
   * @memberof Konva.Transformer.prototype
   * @param {Number} offset
   * @returns {Number}
   * @example
   * // get
   * var rotateAnchorOffset = transformer.rotateAnchorOffset();
   *
   * // set
   * transformer.rotateAnchorOffset(100);
   */
  Konva.Factory.addGetterSetter(
    Konva.Transformer,
    'rotateAnchorOffset',
    50,
    Konva.Validators.getNumberValidator()
  );

  /**
   * get/set visibility of border
   * @name borderEnabled
   * @method
   * @memberof Konva.Transformer.prototype
   * @param {Boolean} enabled
   * @returns {Boolean}
   * @example
   * // get
   * var borderEnabled = transformer.borderEnabled();
   *
   * // set
   * transformer.borderEnabled(false);
   */
  Konva.Factory.addGetterSetter(Konva.Transformer, 'borderEnabled', true);

  /**
   * get/set anchor stroke color
   * @name anchorStroke
   * @method
   * @memberof Konva.Transformer.prototype
   * @param {Boolean} enabled
   * @returns {Boolean}
   * @example
   * // get
   * var anchorStroke = transformer.anchorStroke();
   *
   * // set
   * transformer.anchorStroke('red');
   */
  Konva.Factory.addGetterSetter(
    Konva.Transformer,
    'anchorStroke',
    'rgb(0, 161, 255)'
  );

  /**
   * get/set anchor stroke width
   * @name anchorStrokeWidth
   * @method
   * @memberof Konva.Transformer.prototype
   * @param {Boolean} enabled
   * @returns {Boolean}
   * @example
   * // get
   * var anchorStrokeWidth = transformer.anchorStrokeWidth();
   *
   * // set
   * transformer.anchorStrokeWidth(3);
   */
  Konva.Factory.addGetterSetter(
    Konva.Transformer,
    'anchorStrokeWidth',
    1,
    Konva.Validators.getNumberValidator()
  );

  /**
   * get/set anchor fill color
   * @name anchorFill
   * @method
   * @memberof Konva.Transformer.prototype
   * @param {Boolean} enabled
   * @returns {Boolean}
   * @example
   * // get
   * var anchorFill = transformer.anchorFill();
   *
   * // set
   * transformer.anchorFill('red');
   */
  Konva.Factory.addGetterSetter(Konva.Transformer, 'anchorFill', 'white');

  /**
   * get/set anchor corner radius
   * @name anchorCornerRadius
   * @method
   * @memberof Konva.Transformer.prototype
   * @param {Number} enabled
   * @returns {Number}
   * @example
   * // get
   * var anchorCornerRadius = transformer.anchorCornerRadius();
   *
   * // set
   * transformer.anchorCornerRadius(3);
   */
  Konva.Factory.addGetterSetter(
    Konva.Transformer,
    'anchorCornerRadius',
    0,
    Konva.Validators.getNumberValidator()
  );

  /**
   * get/set border stroke color
   * @name borderStroke
   * @method
   * @memberof Konva.Transformer.prototype
   * @param {Boolean} enabled
   * @returns {Boolean}
   * @example
   * // get
   * var borderStroke = transformer.borderStroke();
   *
   * // set
   * transformer.borderStroke('red');
   */
  Konva.Factory.addGetterSetter(
    Konva.Transformer,
    'borderStroke',
    'rgb(0, 161, 255)'
  );

  /**
   * get/set border stroke width
   * @name borderStrokeWidth
   * @method
   * @memberof Konva.Transformer.prototype
   * @param {Boolean} enabled
   * @returns {Boolean}
   * @example
   * // get
   * var borderStrokeWidth = transformer.borderStrokeWidth();
   *
   * // set
   * transformer.borderStrokeWidth(3);
   */
  Konva.Factory.addGetterSetter(
    Konva.Transformer,
    'borderStrokeWidth',
    1,
    Konva.Validators.getNumberValidator()
  );

  /**
   * get/set border dash array
   * @name borderDash
   * @method
   * @memberof Konva.Transformer.prototype
   * @param {Boolean} enabled
   * @returns {Boolean}
   * @example
   * // get
   * var borderDash = transformer.borderDash();
   *
   * // set
   * transformer.borderDash([2, 2]);
   */
  Konva.Factory.addGetterSetter(Konva.Transformer, 'borderDash');

  /**
   * get/set should we keep ratio while resize anchors at corners
   * @name keepRatio
   * @method
   * @memberof Konva.Transformer.prototype
   * @param {Boolean} keepRatio
   * @returns {Boolean}
   * @example
   * // get
   * var keepRatio = transformer.keepRatio();
   *
   * // set
   * transformer.keepRatio(false);
   */
  Konva.Factory.addGetterSetter(Konva.Transformer, 'keepRatio', true);

  /**
   * get/set should we resize relative to node's center?
   * @name centeredScaling
   * @method
   * @memberof Konva.Transformer.prototype
   * @param {Boolean} centeredScaling
   * @returns {Boolean}
   * @example
   * // get
   * var centeredScaling = transformer.centeredScaling();
   *
   * // set
   * transformer.centeredScaling(true);
   */
  Konva.Factory.addGetterSetter(Konva.Transformer, 'centeredScaling', false);

  /**
   * get/set padding
   * @name padding
   * @method
   * @memberof Konva.Transformer.prototype
   * @param {Number} padding
   * @returns {Number}
   * @example
   * // get
   * var padding = transformer.padding();
   *
   * // set
   * transformer.padding(10);
   */
  Konva.Factory.addGetterSetter(
    Konva.Transformer,
    'padding',
    0,
    Konva.Validators.getNumberValidator()
  );

  Konva.Factory.addOverloadedGetterSetter(Konva.Transformer, 'node');

  /**
   * get/set bounding box function
   * @name boundBoxFunc
   * @method
   * @memberof Konva.Transformer.prototype
   * @param {Function} func
   * @returns {Function}
   * @example
   * // get
   * var boundBoxFunc = transformer.boundBoxFunc();
   *
   * // set
   * transformer.boundBoxFunc(function(oldBox, newBox) {
   *   if (newBox.width > 200) {
   *     return oldBox;
   *   }
   *   return newBox;
   * });
   */
  Konva.Factory.addGetterSetter(Konva.Transformer, 'boundBoxFunc');

  Konva.Factory.backCompat(Konva.Transformer, {
    lineEnabled: 'borderEnabled',
    rotateHandlerOffset: 'rotateAnchorOffset',
    enabledHandlers: 'enabledAnchors'
  });

  Konva.Collection.mapMethods(Konva.Transformer);
})(Konva);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/querystring-es3/decode.js":
/*!************************************************!*\
  !*** ./node_modules/querystring-es3/decode.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.



// If obj.hasOwnProperty has been overridden, then calling
// obj.hasOwnProperty(prop) will break.
// See: https://github.com/joyent/node/issues/1707
function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

module.exports = function(qs, sep, eq, options) {
  sep = sep || '&';
  eq = eq || '=';
  var obj = {};

  if (typeof qs !== 'string' || qs.length === 0) {
    return obj;
  }

  var regexp = /\+/g;
  qs = qs.split(sep);

  var maxKeys = 1000;
  if (options && typeof options.maxKeys === 'number') {
    maxKeys = options.maxKeys;
  }

  var len = qs.length;
  // maxKeys <= 0 means that we should not limit keys count
  if (maxKeys > 0 && len > maxKeys) {
    len = maxKeys;
  }

  for (var i = 0; i < len; ++i) {
    var x = qs[i].replace(regexp, '%20'),
        idx = x.indexOf(eq),
        kstr, vstr, k, v;

    if (idx >= 0) {
      kstr = x.substr(0, idx);
      vstr = x.substr(idx + 1);
    } else {
      kstr = x;
      vstr = '';
    }

    k = decodeURIComponent(kstr);
    v = decodeURIComponent(vstr);

    if (!hasOwnProperty(obj, k)) {
      obj[k] = v;
    } else if (isArray(obj[k])) {
      obj[k].push(v);
    } else {
      obj[k] = [obj[k], v];
    }
  }

  return obj;
};

var isArray = Array.isArray || function (xs) {
  return Object.prototype.toString.call(xs) === '[object Array]';
};


/***/ }),

/***/ "./node_modules/querystring-es3/encode.js":
/*!************************************************!*\
  !*** ./node_modules/querystring-es3/encode.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.



var stringifyPrimitive = function(v) {
  switch (typeof v) {
    case 'string':
      return v;

    case 'boolean':
      return v ? 'true' : 'false';

    case 'number':
      return isFinite(v) ? v : '';

    default:
      return '';
  }
};

module.exports = function(obj, sep, eq, name) {
  sep = sep || '&';
  eq = eq || '=';
  if (obj === null) {
    obj = undefined;
  }

  if (typeof obj === 'object') {
    return map(objectKeys(obj), function(k) {
      var ks = encodeURIComponent(stringifyPrimitive(k)) + eq;
      if (isArray(obj[k])) {
        return map(obj[k], function(v) {
          return ks + encodeURIComponent(stringifyPrimitive(v));
        }).join(sep);
      } else {
        return ks + encodeURIComponent(stringifyPrimitive(obj[k]));
      }
    }).join(sep);

  }

  if (!name) return '';
  return encodeURIComponent(stringifyPrimitive(name)) + eq +
         encodeURIComponent(stringifyPrimitive(obj));
};

var isArray = Array.isArray || function (xs) {
  return Object.prototype.toString.call(xs) === '[object Array]';
};

function map (xs, f) {
  if (xs.map) return xs.map(f);
  var res = [];
  for (var i = 0; i < xs.length; i++) {
    res.push(f(xs[i], i));
  }
  return res;
}

var objectKeys = Object.keys || function (obj) {
  var res = [];
  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) res.push(key);
  }
  return res;
};


/***/ }),

/***/ "./node_modules/querystring-es3/index.js":
/*!***********************************************!*\
  !*** ./node_modules/querystring-es3/index.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.decode = exports.parse = __webpack_require__(/*! ./decode */ "./node_modules/querystring-es3/decode.js");
exports.encode = exports.stringify = __webpack_require__(/*! ./encode */ "./node_modules/querystring-es3/encode.js");


/***/ }),

/***/ "./node_modules/strip-ansi/index.js":
/*!******************************************!*\
  !*** ./node_modules/strip-ansi/index.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var ansiRegex = __webpack_require__(/*! ansi-regex */ "./node_modules/ansi-regex/index.js")();

module.exports = function (str) {
	return typeof str === 'string' ? str.replace(ansiRegex, '') : str;
};


/***/ }),

/***/ "./node_modules/webpack-hot-middleware/client-overlay.js":
/*!**************************************************!*\
  !*** (webpack)-hot-middleware/client-overlay.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/*eslint-env browser*/

var clientOverlay = document.createElement('div');
clientOverlay.id = 'webpack-hot-middleware-clientOverlay';
var styles = {
  background: 'rgba(0,0,0,0.85)',
  color: '#E8E8E8',
  lineHeight: '1.2',
  whiteSpace: 'pre',
  fontFamily: 'Menlo, Consolas, monospace',
  fontSize: '13px',
  position: 'fixed',
  zIndex: 9999,
  padding: '10px',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  overflow: 'auto',
  dir: 'ltr',
  textAlign: 'left'
};

var ansiHTML = __webpack_require__(/*! ansi-html */ "./node_modules/ansi-html/index.js");
var colors = {
  reset: ['transparent', 'transparent'],
  black: '181818',
  red: 'E36049',
  green: 'B3CB74',
  yellow: 'FFD080',
  blue: '7CAFC2',
  magenta: '7FACCA',
  cyan: 'C3C2EF',
  lightgrey: 'EBE7E3',
  darkgrey: '6D7891'
};

var Entities = __webpack_require__(/*! html-entities */ "./node_modules/html-entities/index.js").AllHtmlEntities;
var entities = new Entities();

function showProblems(type, lines) {
  clientOverlay.innerHTML = '';
  lines.forEach(function(msg) {
    msg = ansiHTML(entities.encode(msg));
    var div = document.createElement('div');
    div.style.marginBottom = '26px';
    div.innerHTML = problemType(type) + ' in ' + msg;
    clientOverlay.appendChild(div);
  });
  if (document.body) {
    document.body.appendChild(clientOverlay);
  }
}

function clear() {
  if (document.body && clientOverlay.parentNode) {
    document.body.removeChild(clientOverlay);
  }
}

function problemType (type) {
  var problemColors = {
    errors: colors.red,
    warnings: colors.yellow
  };
  var color = problemColors[type] || colors.red;
  return (
    '<span style="background-color:#' + color + '; color:#fff; padding:2px 4px; border-radius: 2px">' +
      type.slice(0, -1).toUpperCase() +
    '</span>'
  );
}

module.exports = function(options) {
  for (var color in options.overlayColors) {
    if (color in colors) {
      colors[color] = options.overlayColors[color];
    }
    ansiHTML.setColors(colors);
  }

  for (var style in options.overlayStyles) {
    styles[style] = options.overlayStyles[style];
  }

  for (var key in styles) {
    clientOverlay.style[key] = styles[key];
  }

  return {
    showProblems: showProblems,
    clear: clear
  }
};

module.exports.clear = clear;
module.exports.showProblems = showProblems;


/***/ }),

/***/ "./node_modules/webpack-hot-middleware/client.js?path=__webpack_hmr&dynamicPublicPath=true":
/*!************************************************************************************!*\
  !*** (webpack)-hot-middleware/client.js?path=__webpack_hmr&dynamicPublicPath=true ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(__resourceQuery, module) {/*eslint-env browser*/
/*global __resourceQuery __webpack_public_path__*/

var options = {
  path: "/__webpack_hmr",
  timeout: 20 * 1000,
  overlay: true,
  reload: false,
  log: true,
  warn: true,
  name: '',
  autoConnect: true,
  overlayStyles: {},
  overlayWarnings: false,
  ansiColors: {}
};
if (true) {
  var querystring = __webpack_require__(/*! querystring */ "./node_modules/querystring-es3/index.js");
  var overrides = querystring.parse(__resourceQuery.slice(1));
  setOverrides(overrides);
}

if (typeof window === 'undefined') {
  // do nothing
} else if (typeof window.EventSource === 'undefined') {
  console.warn(
    "webpack-hot-middleware's client requires EventSource to work. " +
    "You should include a polyfill if you want to support this browser: " +
    "https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events#Tools"
  );
} else {
  if (options.autoConnect) {
    connect();
  }
}

/* istanbul ignore next */
function setOptionsAndConnect(overrides) {
  setOverrides(overrides);
  connect();
}

function setOverrides(overrides) {
  if (overrides.autoConnect) options.autoConnect = overrides.autoConnect == 'true';
  if (overrides.path) options.path = overrides.path;
  if (overrides.timeout) options.timeout = overrides.timeout;
  if (overrides.overlay) options.overlay = overrides.overlay !== 'false';
  if (overrides.reload) options.reload = overrides.reload !== 'false';
  if (overrides.noInfo && overrides.noInfo !== 'false') {
    options.log = false;
  }
  if (overrides.name) {
    options.name = overrides.name;
  }
  if (overrides.quiet && overrides.quiet !== 'false') {
    options.log = false;
    options.warn = false;
  }

  if (overrides.dynamicPublicPath) {
    options.path = __webpack_require__.p + options.path;
  }

  if (overrides.ansiColors) options.ansiColors = JSON.parse(overrides.ansiColors);
  if (overrides.overlayStyles) options.overlayStyles = JSON.parse(overrides.overlayStyles);

  if (overrides.overlayWarnings) {
    options.overlayWarnings = overrides.overlayWarnings == 'true';
  }
}

function EventSourceWrapper() {
  var source;
  var lastActivity = new Date();
  var listeners = [];

  init();
  var timer = setInterval(function() {
    if ((new Date() - lastActivity) > options.timeout) {
      handleDisconnect();
    }
  }, options.timeout / 2);

  function init() {
    source = new window.EventSource(options.path);
    source.onopen = handleOnline;
    source.onerror = handleDisconnect;
    source.onmessage = handleMessage;
  }

  function handleOnline() {
    if (options.log) console.log("[HMR] connected");
    lastActivity = new Date();
  }

  function handleMessage(event) {
    lastActivity = new Date();
    for (var i = 0; i < listeners.length; i++) {
      listeners[i](event);
    }
  }

  function handleDisconnect() {
    clearInterval(timer);
    source.close();
    setTimeout(init, options.timeout);
  }

  return {
    addMessageListener: function(fn) {
      listeners.push(fn);
    }
  };
}

function getEventSourceWrapper() {
  if (!window.__whmEventSourceWrapper) {
    window.__whmEventSourceWrapper = {};
  }
  if (!window.__whmEventSourceWrapper[options.path]) {
    // cache the wrapper for other entries loaded on
    // the same page with the same options.path
    window.__whmEventSourceWrapper[options.path] = EventSourceWrapper();
  }
  return window.__whmEventSourceWrapper[options.path];
}

function connect() {
  getEventSourceWrapper().addMessageListener(handleMessage);

  function handleMessage(event) {
    if (event.data == "\uD83D\uDC93") {
      return;
    }
    try {
      processMessage(JSON.parse(event.data));
    } catch (ex) {
      if (options.warn) {
        console.warn("Invalid HMR message: " + event.data + "\n" + ex);
      }
    }
  }
}

// the reporter needs to be a singleton on the page
// in case the client is being used by multiple bundles
// we only want to report once.
// all the errors will go to all clients
var singletonKey = '__webpack_hot_middleware_reporter__';
var reporter;
if (typeof window !== 'undefined') {
  if (!window[singletonKey]) {
    window[singletonKey] = createReporter();
  }
  reporter = window[singletonKey];
}

function createReporter() {
  var strip = __webpack_require__(/*! strip-ansi */ "./node_modules/strip-ansi/index.js");

  var overlay;
  if (typeof document !== 'undefined' && options.overlay) {
    overlay = __webpack_require__(/*! ./client-overlay */ "./node_modules/webpack-hot-middleware/client-overlay.js")({
      ansiColors: options.ansiColors,
      overlayStyles: options.overlayStyles
    });
  }

  var styles = {
    errors: "color: #ff0000;",
    warnings: "color: #999933;"
  };
  var previousProblems = null;
  function log(type, obj) {
    var newProblems = obj[type].map(function(msg) { return strip(msg); }).join('\n');
    if (previousProblems == newProblems) {
      return;
    } else {
      previousProblems = newProblems;
    }

    var style = styles[type];
    var name = obj.name ? "'" + obj.name + "' " : "";
    var title = "[HMR] bundle " + name + "has " + obj[type].length + " " + type;
    // NOTE: console.warn or console.error will print the stack trace
    // which isn't helpful here, so using console.log to escape it.
    if (console.group && console.groupEnd) {
      console.group("%c" + title, style);
      console.log("%c" + newProblems, style);
      console.groupEnd();
    } else {
      console.log(
        "%c" + title + "\n\t%c" + newProblems.replace(/\n/g, "\n\t"),
        style + "font-weight: bold;",
        style + "font-weight: normal;"
      );
    }
  }

  return {
    cleanProblemsCache: function () {
      previousProblems = null;
    },
    problems: function(type, obj) {
      if (options.warn) {
        log(type, obj);
      }
      if (overlay) {
        if (options.overlayWarnings || type === 'errors') {
          overlay.showProblems(type, obj[type]);
          return false;
        }
        overlay.clear();
      }
      return true;
    },
    success: function() {
      if (overlay) overlay.clear();
    },
    useCustomOverlay: function(customOverlay) {
      overlay = customOverlay;
    }
  };
}

var processUpdate = __webpack_require__(/*! ./process-update */ "./node_modules/webpack-hot-middleware/process-update.js");

var customHandler;
var subscribeAllHandler;
function processMessage(obj) {
  switch(obj.action) {
    case "building":
      if (options.log) {
        console.log(
          "[HMR] bundle " + (obj.name ? "'" + obj.name + "' " : "") +
          "rebuilding"
        );
      }
      break;
    case "built":
      if (options.log) {
        console.log(
          "[HMR] bundle " + (obj.name ? "'" + obj.name + "' " : "") +
          "rebuilt in " + obj.time + "ms"
        );
      }
      // fall through
    case "sync":
      if (obj.name && options.name && obj.name !== options.name) {
        return;
      }
      var applyUpdate = true;
      if (obj.errors.length > 0) {
        if (reporter) reporter.problems('errors', obj);
        applyUpdate = false;
      } else if (obj.warnings.length > 0) {
        if (reporter) {
          var overlayShown = reporter.problems('warnings', obj);
          applyUpdate = overlayShown;
        }
      } else {
        if (reporter) {
          reporter.cleanProblemsCache();
          reporter.success();
        }
      }
      if (applyUpdate) {
        processUpdate(obj.hash, obj.modules, options);
      }
      break;
    default:
      if (customHandler) {
        customHandler(obj);
      }
  }

  if (subscribeAllHandler) {
    subscribeAllHandler(obj);
  }
}

if (module) {
  module.exports = {
    subscribeAll: function subscribeAll(handler) {
      subscribeAllHandler = handler;
    },
    subscribe: function subscribe(handler) {
      customHandler = handler;
    },
    useCustomOverlay: function useCustomOverlay(customOverlay) {
      if (reporter) reporter.useCustomOverlay(customOverlay);
    },
    setOptionsAndConnect: setOptionsAndConnect
  };
}

/* WEBPACK VAR INJECTION */}.call(this, "?path=__webpack_hmr&dynamicPublicPath=true", __webpack_require__(/*! ./../webpack/buildin/module.js */ "./node_modules/webpack/buildin/module.js")(module)))

/***/ }),

/***/ "./node_modules/webpack-hot-middleware/process-update.js":
/*!**************************************************!*\
  !*** (webpack)-hot-middleware/process-update.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Based heavily on https://github.com/webpack/webpack/blob/
 *  c0afdf9c6abc1dd70707c594e473802a566f7b6e/hot/only-dev-server.js
 * Original copyright Tobias Koppers @sokra (MIT license)
 */

/* global window __webpack_hash__ */

if (false) {}

var hmrDocsUrl = "https://webpack.js.org/concepts/hot-module-replacement/"; // eslint-disable-line max-len

var lastHash;
var failureStatuses = { abort: 1, fail: 1 };
var applyOptions = { 				
  ignoreUnaccepted: true,
  ignoreDeclined: true,
  ignoreErrored: true,
  onUnaccepted: function(data) {
    console.warn("Ignored an update to unaccepted module " + data.chain.join(" -> "));
  },
  onDeclined: function(data) {
    console.warn("Ignored an update to declined module " + data.chain.join(" -> "));
  },
  onErrored: function(data) {
    console.error(data.error);
    console.warn("Ignored an error while updating module " + data.moduleId + " (" + data.type + ")");
  } 
}

function upToDate(hash) {
  if (hash) lastHash = hash;
  return lastHash == __webpack_require__.h();
}

module.exports = function(hash, moduleMap, options) {
  var reload = options.reload;
  if (!upToDate(hash) && module.hot.status() == "idle") {
    if (options.log) console.log("[HMR] Checking for updates on the server...");
    check();
  }

  function check() {
    var cb = function(err, updatedModules) {
      if (err) return handleError(err);

      if(!updatedModules) {
        if (options.warn) {
          console.warn("[HMR] Cannot find update (Full reload needed)");
          console.warn("[HMR] (Probably because of restarting the server)");
        }
        performReload();
        return null;
      }

      var applyCallback = function(applyErr, renewedModules) {
        if (applyErr) return handleError(applyErr);

        if (!upToDate()) check();

        logUpdates(updatedModules, renewedModules);
      };

      var applyResult = module.hot.apply(applyOptions, applyCallback);
      // webpack 2 promise
      if (applyResult && applyResult.then) {
        // HotModuleReplacement.runtime.js refers to the result as `outdatedModules`
        applyResult.then(function(outdatedModules) {
          applyCallback(null, outdatedModules);
        });
        applyResult.catch(applyCallback);
      }

    };

    var result = module.hot.check(false, cb);
    // webpack 2 promise
    if (result && result.then) {
        result.then(function(updatedModules) {
            cb(null, updatedModules);
        });
        result.catch(cb);
    }
  }

  function logUpdates(updatedModules, renewedModules) {
    var unacceptedModules = updatedModules.filter(function(moduleId) {
      return renewedModules && renewedModules.indexOf(moduleId) < 0;
    });

    if(unacceptedModules.length > 0) {
      if (options.warn) {
        console.warn(
          "[HMR] The following modules couldn't be hot updated: " +
          "(Full reload needed)\n" +
          "This is usually because the modules which have changed " +
          "(and their parents) do not know how to hot reload themselves. " +
          "See " + hmrDocsUrl + " for more details."
        );
        unacceptedModules.forEach(function(moduleId) {
          console.warn("[HMR]  - " + (moduleMap[moduleId] || moduleId));
        });
      }
      performReload();
      return;
    }

    if (options.log) {
      if(!renewedModules || renewedModules.length === 0) {
        console.log("[HMR] Nothing hot updated.");
      } else {
        console.log("[HMR] Updated modules:");
        renewedModules.forEach(function(moduleId) {
          console.log("[HMR]  - " + (moduleMap[moduleId] || moduleId));
        });
      }

      if (upToDate()) {
        console.log("[HMR] App is up to date.");
      }
    }
  }

  function handleError(err) {
    if (module.hot.status() in failureStatuses) {
      if (options.warn) {
        console.warn("[HMR] Cannot check for update (Full reload needed)");
        console.warn("[HMR] " + (err.stack || err.message));
      }
      performReload();
      return;
    }
    if (options.warn) {
      console.warn("[HMR] Update check failed: " + (err.stack || err.message));
    }
  }

  function performReload() {
    if (reload) {
      if (options.warn) console.warn("[HMR] Reloading page");
      window.location.reload();
    }
  }
};


/***/ }),

/***/ "./node_modules/webpack/buildin/global.js":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ "./node_modules/webpack/buildin/module.js":
/*!***********************************!*\
  !*** (webpack)/buildin/module.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function(module) {
	if (!module.webpackPolyfill) {
		module.deprecate = function() {};
		module.paths = [];
		// module.parent = undefined by default
		if (!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ }),

/***/ "./src/css/main.css":
/*!**************************!*\
  !*** ./src/css/main.css ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
__webpack_require__(/*! ./css/main.css */ "./src/css/main.css");
var signalR = __webpack_require__(/*! @aspnet/signalr */ "./node_modules/@aspnet/signalr/dist/esm/index.js");
var Konva = __webpack_require__(/*! konva */ "./node_modules/konva/konva.js");
var divMessages = document.querySelector("#divMessages");
var tbMessage = document.querySelector("#tbMessage");
var btnSend = document.querySelector("#btnSend");
var divCanvas = document.querySelector("#divCanvas");
var username = new Date().getTime();
var connection = new signalR.HubConnectionBuilder()
    .withUrl("/hub")
    .build();
connection.start().catch(function (err) { return document.write(err); });
connection.on("messageReceived", function (username, message) {
    console.log('connection.on START');
    var messageContainer = document.createElement("div");
    messageContainer.innerHTML =
        "<div class=\"message-author\">" + username + "</div><div>" + message + "</div>";
    divMessages.appendChild(messageContainer);
    divMessages.scrollTop = divMessages.scrollHeight;
    showGrid();
    console.log('connection.on END');
});
tbMessage.addEventListener("keyup", function (e) {
    if (e.keyCode === 13) {
        send();
    }
});
btnSend.addEventListener("click", send);
function send() {
    connection.send("newMessage", username, tbMessage.value)
        .then(function () { return tbMessage.value = ""; });
}
function showGrid() {
    var WIDTH = 3000;
    var HEIGHT = 3000;
    var NUMBER = 200;
    var stage = new Konva.Stage({
        container: 'container',
        width: window.innerWidth,
        height: window.innerHeight,
    });
    var layer = new Konva.Layer();
    stage.add(layer);
    function generateNode() {
        return new Konva.Circle({
            x: WIDTH * Math.random(),
            y: HEIGHT * Math.random(),
            radius: 50,
            fill: 'red',
            stroke: 'black'
        });
    }
    for (var i = 0; i < NUMBER; i++) {
        layer.add(generateNode());
    }
    layer.draw();
    var scrollContainer = document.getElementById('scroll-container');
    scrollContainer.addEventListener('scroll', function () {
        var dx = scrollContainer.scrollLeft;
        var dy = scrollContainer.scrollTop;
        stage.container().style.transform = 'translate(' + dx + 'px, ' + dy + 'px)';
        stage.x(-dx);
        stage.y(-dy);
        stage.batchDraw();
    });
}
function paintCanvas() {
    // first we need to create a stage
    var stage = new Konva.Stage({
        container: 'divCanvas',
        width: 500,
        height: 500
    });
    // then create layer
    var layer = new Konva.Layer();
    // create our shape
    var circle = new Konva.Circle({
        x: stage.getWidth() / 2,
        y: stage.getHeight() / 2,
        radius: 70,
        fill: 'yellow',
        stroke: 'black',
        strokeWidth: 4
    });
    // add the shape to the layer
    layer.add(circle);
    // add the layer to the stage
    stage.add(layer);
    // draw the image
    layer.draw();
}


/***/ }),

/***/ 0:
/*!****************************************************************************************************!*\
  !*** multi webpack-hot-middleware/client?path=__webpack_hmr&dynamicPublicPath=true ./src/index.ts ***!
  \****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! webpack-hot-middleware/client?path=__webpack_hmr&dynamicPublicPath=true */"./node_modules/webpack-hot-middleware/client.js?path=__webpack_hmr&dynamicPublicPath=true");
module.exports = __webpack_require__(/*! ./src/index.ts */"./src/index.ts");


/***/ })

/******/ });