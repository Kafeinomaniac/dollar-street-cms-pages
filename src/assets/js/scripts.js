setTimeout(function () {
    !function (a, b) {
        "use strict";
        "function" == typeof define && define.amd ? define(b) : "undefined" != typeof module && module.exports ? module.exports = b : a.showAngularStats = b()
    }(window, function () {
        "use strict";
        function a() {
            if (!z) {
                z = !0;
                var a = d(), b = Object.getPrototypeOf(a), c = b.$digest;
                b.$digest = function () {
                    var a = u();
                    c.apply(this, arguments);
                    var b = u() - a;
                    i(e(), b)
                }
            }
        }

        function b(a) {
            window.angular && d() ? c(a) : window.setTimeout(function () {
                b(a)
            }, 200)
        }

        function c(b) {
            function c(a, c) {
                var d = c || y, e = d > b.digestTimeThreshold ? "red" : "green";
                if (x = j(a) ? x : a, y = j(c) ? y : c, h.text(x + " | " + y.toFixed(2)).css({ color: e }), c) {
                    var f = k.getContext("2d");
                    g > 0 && (g = 0, f.fillStyle = "#333", f.fillRect(i.width - 1, 0, 1, i.height)), f.fillStyle = e, f.fillRect(i.width - 1, Math.max(0, i.height - d), 2, 2)
                }
            }

            function d() {
                if (e.active) {
                    window.setTimeout(d, 250);
                    var a = k.getContext("2d"), b = a.getImageData(1, 0, i.width - 1, i.height);
                    a.putImageData(b, 0, 0), a.fillStyle = g++ > 2 ? "black" : "#333", a.fillRect(i.width - 1, 0, 1, i.height)
                }
            }

            if (t && (t.$el && t.$el.remove(), t.active = !1, t = null), b === !1) return void sessionStorage.removeItem(s);
            b = angular.extend({ position: "top-left", digestTimeThreshold: 16, autoload: !1 }, b || {}), a();
            var e = t = { active: !0 };
            b.autoload ? sessionStorage.setItem(s, JSON.stringify(b)) : sessionStorage.removeItem(s);
            var f = angular.element(document.body), g = 0;
            e.$el = angular.element("<div><canvas></canvas><div></div></div>").css({
                position: "fixed",
                background: "black",
                borderBottom: "1px solid #666",
                borderRight: "1px solid #666",
                color: "red",
                fontFamily: "Courier",
                width: 130,
                zIndex: 9999,
                top: -1 == b.position.indexOf("top") ? null : 0,
                bottom: -1 == b.position.indexOf("bottom") ? null : 0,
                right: -1 == b.position.indexOf("right") ? null : 0,
                left: -1 == b.position.indexOf("left") ? null : 0,
                textAlign: "right"
            }), f.append(e.$el);
            var h = e.$el.find("div"), i = { width: 130, height: 40 }, k = e.$el.find("canvas").attr(i)[0];
            A.digestLength.push(function (a) {
                c(null, a)
            }), A.watchCount.push(function (a) {
                c(a)
            }), d(), r.$$phase || r.$digest()
        }

        function d() {
            if (r) return r;
            var a = document.querySelector(".ng-scope");
            return a ? r = angular.element(a).scope().$root : null
        }

        function e() {
            window.clearTimeout(w);
            var a = u();
            return a - v > 300 ? (v = a, x = k()) : w = window.setTimeout(function () {
                i(e())
            }, 350), x
        }

        function f(a) {
            var b = g(a);
            return k(b)
        }

        function g(a) {
            a = angular.element(a);
            var b = a.scope();
            return b || (a = angular.element(a.querySelector(".ng-scope")), b = a.scope()), b
        }

        function h(a) {
            return a && a.$$watchers ? a.$$watchers : []
        }

        function i(a, b) {
            j(a) || angular.forEach(A.watchCount, function (b) {
                b(a)
            }), j(b) || angular.forEach(A.digestLength, function (a) {
                a(b)
            })
        }

        function j(a) {
            return null === a || void 0 === a
        }

        function k(a) {
            var b = 0;
            return l(a, function (a) {
                b += h(a).length
            }), b
        }

        function l(a, b) {
            if ("function" == typeof a && (b = a, a = null), a = a || d(), a = p(a)) {
                var c = b(a);
                return c === !1 ? c : n(a, b)
            }
        }

        function m(a, b) {
            for (var c; (a = a.$$nextSibling) && (c = b(a), c !== !1) && (c = n(a, b), c !== !1););
            return c
        }

        function n(a, b) {
            for (var c; (a = a.$$childHead) && (c = b(a), c !== !1) && (c = m(a, b), c !== !1););
            return c
        }

        function o(a) {
            var b = null;
            return l(function (c) {
                return c.$id === a ? (b = c, !1) : void 0
            }), b
        }

        function p(a) {
            return q(a) && (a = o(a)), a
        }

        function q(a) {
            return "string" == typeof a || "number" == typeof a
        }

        var r, s = "showAngularStats_autoload", t = null, u = window.performance && window.performance.now ? function () {
            return window.performance.now()
        } : function () {
            return Date.now()
        }, v = u(), w = null, x = e() || 0, y = 0, z = !1, A = {
            digest: [],
            watchCount: [],
            digestLength: []
        }, B = sessionStorage[s];
        return B && b(JSON.parse(B)), angular.module("angularStats", []).directive("angularStats", function () {
            function b(a) {
                for (var b = a[0]; b.parentElement;)b = b.parentElement;
                return b
            }

            return {
                scope: {
                    digestLength: "@",
                    watchCount: "@",
                    watchCountRoot: "@",
                    onDigestLengthUpdate: "&?",
                    onWatchCountUpdate: "&?"
                }, link: function (c, d, e) {
                    if (a(), e.hasOwnProperty("digestLength")) {
                        var g = d;
                        e.digestLength && (g = angular.element(d[0].querySelector(e.digestLength))), A.digestLength.push(function (a) {
                            g.text((a || 0).toFixed(2))
                        })
                    }
                    if (e.hasOwnProperty("watchCount")) {
                        var h, i = d;
                        if (c.watchCount && (i = angular.element(d[0].querySelector(e.watchCount))), c.watchCountRoot) if ("this" === c.watchCountRoot) h = d; else {
                            var j;
                            if (j = e.hasOwnProperty("watchCountOfChild") ? d[0] : b(d), h = angular.element(j.querySelector(c.watchCountRoot)), !h.length) throw new Error("no element at selector: " + c.watchCountRoot)
                        }
                        A.watchCount.push(function (a) {
                            var b = a;
                            h && (b = f(h)), i.text(b)
                        })
                    }
                    c.onWatchCountUpdate && A.watchCount.push(function (a) {
                        c.onWatchCountUpdate({ watchCount: a })
                    }), c.onDigestLengthUpdate && A.digestLength.push(function (a) {
                        c.onDigestLengthUpdate({ digestLength: a })
                    })
                }
            }
        }), c
    });

    showAngularStats({ position: 'bottomright' });
}, 500);

window.NREUM || (NREUM = {}), __nr_require = function (t, e, n) {
    function r(n) {
        if (!e[n]) {
            var o = e[n] = { exports: {} };
            t[n][0].call(o.exports, function (e) {
                var o = t[n][1][e];
                return r(o ? o : e)
            }, o, o.exports)
        }
        return e[n].exports
    }

    if ("function" == typeof __nr_require) return __nr_require;
    for (var o = 0; o < n.length; o++)r(n[o]);
    return r
}({
    QJf3ax: [function (t, e) {
        function n(t) {
            function e(e, n, a) {
                t && t(e, n, a), a || (a = {});
                for (var c = s(e), f = c.length, u = i(a, o, r), d = 0; f > d; d++)c[d].apply(u, n);
                return u
            }

            function a(t, e) {
                f[t] = s(t).concat(e)
            }

            function s(t) {
                return f[t] || []
            }

            function c() {
                return n(e)
            }

            var f = {};
            return { on: a, emit: e, create: c, listeners: s, _events: f }
        }

        function r() {
            return {}
        }

        var o = "nr@context", i = t("gos");
        e.exports = n()
    }, { gos: "7eSDFh" }], ee: [function (t, e) {
        e.exports = t("QJf3ax")
    }, {}], 3: [function (t) {
        function e(t) {
            try {
                i.console && console.log(t)
            } catch (e) {
            }
        }

        var n, r = t("ee"), o = t(1), i = {};
        try {
            n = localStorage.getItem("__nr_flags").split(","), console && "function" == typeof console.log && (i.console = !0, -1 !== n.indexOf("dev") && (i.dev = !0), -1 !== n.indexOf("nr_dev") && (i.nrDev = !0))
        } catch (a) {
        }
        i.nrDev && r.on("internal-error", function (t) {
            e(t.stack)
        }), i.dev && r.on("fn-err", function (t, n, r) {
            e(r.stack)
        }), i.dev && (e("NR AGENT IN DEVELOPMENT MODE"), e("flags: " + o(i, function (t) {
            return t
        }).join(", ")))
    }, { 1: 22, ee: "QJf3ax" }], 4: [function (t) {
        function e(t, e, n, i, s) {
            try {
                c ? c -= 1 : r("err", [s || new UncaughtException(t, e, n)])
            } catch (f) {
                try {
                    r("ierr", [f, (new Date).getTime(), !0])
                } catch (u) {
                }
            }
            return "function" == typeof a ? a.apply(this, o(arguments)) : !1
        }

        function UncaughtException(t, e, n) {
            this.message = t || "Uncaught error with no additional information", this.sourceURL = e, this.line = n
        }

        function n(t) {
            r("err", [t, (new Date).getTime()])
        }

        var r = t("handle"), o = t(6), i = t("ee"), a = window.onerror, s = !1, c = 0;
        t("loader").features.err = !0, t(5), window.onerror = e;
        try {
            throw new Error
        } catch (f) {
            "stack" in f && (t(1), t(2), "addEventListener" in window && t(3), window.XMLHttpRequest && XMLHttpRequest.prototype && XMLHttpRequest.prototype.addEventListener && window.XMLHttpRequest && XMLHttpRequest.prototype && XMLHttpRequest.prototype.addEventListener && !/CriOS/.test(navigator.userAgent) && t(4), s = !0)
        }
        i.on("fn-start", function () {
            s && (c += 1)
        }), i.on("fn-err", function (t, e, r) {
            s && (this.thrown = !0, n(r))
        }), i.on("fn-end", function () {
            s && !this.thrown && c > 0 && (c -= 1)
        }), i.on("internal-error", function (t) {
            r("ierr", [t, (new Date).getTime(), !0])
        })
    }, { 1: 9, 2: 8, 3: 6, 4: 10, 5: 3, 6: 23, ee: "QJf3ax", handle: "D5DuLP", loader: "G9z0Bl" }], 5: [function (t) {
        function e() {
        }

        if (window.performance && window.performance.timing && window.performance.getEntriesByType) {
            var n = t("ee"), r = t("handle"), o = t(1), i = t(2);
            t("loader").features.stn = !0, t(3), n.on("fn-start", function (t) {
                var e = t[0];
                e instanceof Event && (this.bstStart = Date.now())
            }), n.on("fn-end", function (t, e) {
                var n = t[0];
                n instanceof Event && r("bst", [n, e, this.bstStart, Date.now()])
            }), o.on("fn-start", function (t, e, n) {
                this.bstStart = Date.now(), this.bstType = n
            }), o.on("fn-end", function (t, e) {
                r("bstTimer", [e, this.bstStart, Date.now(), this.bstType])
            }), i.on("fn-start", function () {
                this.bstStart = Date.now()
            }), i.on("fn-end", function (t, e) {
                r("bstTimer", [e, this.bstStart, Date.now(), "requestAnimationFrame"])
            }), n.on("pushState-start", function () {
                this.time = Date.now(), this.startPath = location.pathname + location.hash
            }), n.on("pushState-end", function () {
                r("bstHist", [location.pathname + location.hash, this.startPath, this.time])
            }), "addEventListener" in window.performance && (window.performance.addEventListener("webkitresourcetimingbufferfull", function () {
                r("bstResource", [window.performance.getEntriesByType("resource")]), window.performance.webkitClearResourceTimings()
            }, !1), window.performance.addEventListener("resourcetimingbufferfull", function () {
                r("bstResource", [window.performance.getEntriesByType("resource")]), window.performance.clearResourceTimings()
            }, !1)), document.addEventListener("scroll", e, !1), document.addEventListener("keypress", e, !1), document.addEventListener("click", e, !1)
        }
    }, { 1: 9, 2: 8, 3: 7, ee: "QJf3ax", handle: "D5DuLP", loader: "G9z0Bl" }], 6: [function (t, e) {
        function n(t) {
            i.inPlace(t, ["addEventListener", "removeEventListener"], "-", r)
        }

        function r(t) {
            return t[1]
        }

        var o = (t(1), t("ee").create()), i = t(2)(o), a = t("gos");
        if (e.exports = o, n(window), "getPrototypeOf" in Object) {
            for (var s = document; s && !s.hasOwnProperty("addEventListener");)s = Object.getPrototypeOf(s);
            s && n(s);
            for (var c = XMLHttpRequest.prototype; c && !c.hasOwnProperty("addEventListener");)c = Object.getPrototypeOf(c);
            c && n(c)
        } else XMLHttpRequest.prototype.hasOwnProperty("addEventListener") && n(XMLHttpRequest.prototype);
        o.on("addEventListener-start", function (t) {
            if (t[1]) {
                var e = t[1];
                "function" == typeof e ? this.wrapped = t[1] = a(e, "nr@wrapped", function () {
                    return i(e, "fn-", null, e.name || "anonymous")
                }) : "function" == typeof e.handleEvent && i.inPlace(e, ["handleEvent"], "fn-")
            }
        }), o.on("removeEventListener-start", function (t) {
            var e = this.wrapped;
            e && (t[1] = e)
        })
    }, { 1: 23, 2: 24, ee: "QJf3ax", gos: "7eSDFh" }], 7: [function (t, e) {
        var n = (t(2), t("ee").create()), r = t(1)(n);
        e.exports = n, r.inPlace(window.history, ["pushState"], "-")
    }, { 1: 24, 2: 23, ee: "QJf3ax" }], 8: [function (t, e) {
        var n = (t(2), t("ee").create()), r = t(1)(n);
        e.exports = n, r.inPlace(window, ["requestAnimationFrame", "mozRequestAnimationFrame", "webkitRequestAnimationFrame", "msRequestAnimationFrame"], "raf-"), n.on("raf-start", function (t) {
            t[0] = r(t[0], "fn-")
        })
    }, { 1: 24, 2: 23, ee: "QJf3ax" }], 9: [function (t, e) {
        function n(t, e, n) {
            t[0] = o(t[0], "fn-", null, n)
        }

        var r = (t(2), t("ee").create()), o = t(1)(r);
        e.exports = r, o.inPlace(window, ["setTimeout", "setInterval", "setImmediate"], "setTimer-"), r.on("setTimer-start", n)
    }, { 1: 24, 2: 23, ee: "QJf3ax" }], 10: [function (t, e) {
        function n() {
            f.inPlace(this, p, "fn-")
        }

        function r(t, e) {
            f.inPlace(e, ["onreadystatechange"], "fn-")
        }

        function o(t, e) {
            return e
        }

        function i(t, e) {
            for (var n in t) e[n] = t[n];
            return e
        }

        var a = t("ee").create(), s = t(1), c = t(2), f = c(a), u = c(s), d = window.XMLHttpRequest, p = ["onload", "onerror", "onabort", "onloadstart", "onloadend", "onprogress", "ontimeout"];
        e.exports = a, window.XMLHttpRequest = function (t) {
            var e = new d(t);
            try {
                a.emit("new-xhr", [], e), u.inPlace(e, ["addEventListener", "removeEventListener"], "-", o), e.addEventListener("readystatechange", n, !1)
            } catch (r) {
                try {
                    a.emit("internal-error", [r])
                } catch (i) {
                }
            }
            return e
        }, i(d, XMLHttpRequest), XMLHttpRequest.prototype = d.prototype, f.inPlace(XMLHttpRequest.prototype, ["open", "send"], "-xhr-", o), a.on("send-xhr-start", r), a.on("open-xhr-start", r)
    }, { 1: 6, 2: 24, ee: "QJf3ax" }], 11: [function (t) {
        function e(t) {
            var e = this.params, r = this.metrics;
            if (!this.ended) {
                this.ended = !0;
                for (var i = 0; c > i; i++)t.removeEventListener(s[i], this.listener, !1);
                if (!e.aborted) {
                    if (r.duration = (new Date).getTime() - this.startTime, 4 === t.readyState) {
                        e.status = t.status;
                        var a = t.responseType, f = "arraybuffer" === a || "blob" === a || "json" === a ? t.response : t.responseText, u = n(f);
                        if (u && (r.rxSize = u), this.sameOrigin) {
                            var d = t.getResponseHeader("X-NewRelic-App-Data");
                            d && (e.cat = d.split(", ").pop())
                        }
                    } else e.status = 0;
                    r.cbTime = this.cbTime, o("xhr", [e, r, this.startTime])
                }
            }
        }

        function n(t) {
            if ("string" == typeof t && t.length) return t.length;
            if ("object" != typeof t) return void 0;
            if ("undefined" != typeof ArrayBuffer && t instanceof ArrayBuffer && t.byteLength) return t.byteLength;
            if ("undefined" != typeof Blob && t instanceof Blob && t.size) return t.size;
            if ("undefined" != typeof FormData && t instanceof FormData) return void 0;
            try {
                return JSON.stringify(t).length
            } catch (e) {
                return void 0
            }
        }

        function r(t, e) {
            var n = i(e), r = t.params;
            r.host = n.hostname + ":" + n.port, r.pathname = n.pathname, t.sameOrigin = n.sameOrigin
        }

        if (window.XMLHttpRequest && XMLHttpRequest.prototype && XMLHttpRequest.prototype.addEventListener && !/CriOS/.test(navigator.userAgent)) {
            t("loader").features.xhr = !0;
            var o = t("handle"), i = t(2), a = t("ee"), s = ["load", "error", "abort", "timeout"], c = s.length, f = t(1);
            t(4), t(3), a.on("new-xhr", function () {
                this.totalCbs = 0, this.called = 0, this.cbTime = 0, this.end = e, this.ended = !1, this.xhrGuids = {}
            }), a.on("open-xhr-start", function (t) {
                this.params = { method: t[0] }, r(this, t[1]), this.metrics = {}
            }), a.on("open-xhr-end", function (t, e) {
                "loader_config" in NREUM && "xpid" in NREUM.loader_config && this.sameOrigin && e.setRequestHeader("X-NewRelic-ID", NREUM.loader_config.xpid)
            }), a.on("send-xhr-start", function (t, e) {
                var r = this.metrics, o = t[0], i = this;
                if (r && o) {
                    var f = n(o);
                    f && (r.txSize = f)
                }
                this.startTime = (new Date).getTime(), this.listener = function (t) {
                    try {
                        "abort" === t.type && (i.params.aborted = !0), ("load" !== t.type || i.called === i.totalCbs && (i.onloadCalled || "function" != typeof e.onload)) && i.end(e)
                    } catch (n) {
                        try {
                            a.emit("internal-error", [n])
                        } catch (r) {
                        }
                    }
                };
                for (var u = 0; c > u; u++)e.addEventListener(s[u], this.listener, !1)
            }), a.on("xhr-cb-time", function (t, e, n) {
                this.cbTime += t, e ? this.onloadCalled = !0 : this.called += 1, this.called !== this.totalCbs || !this.onloadCalled && "function" == typeof n.onload || this.end(n)
            }), a.on("xhr-load-added", function (t, e) {
                var n = "" + f(t) + !!e;
                this.xhrGuids && !this.xhrGuids[n] && (this.xhrGuids[n] = !0, this.totalCbs += 1)
            }), a.on("xhr-load-removed", function (t, e) {
                var n = "" + f(t) + !!e;
                this.xhrGuids && this.xhrGuids[n] && (delete this.xhrGuids[n], this.totalCbs -= 1)
            }), a.on("addEventListener-end", function (t, e) {
                e instanceof XMLHttpRequest && "load" === t[0] && a.emit("xhr-load-added", [t[1], t[2]], e)
            }), a.on("removeEventListener-end", function (t, e) {
                e instanceof XMLHttpRequest && "load" === t[0] && a.emit("xhr-load-removed", [t[1], t[2]], e)
            }), a.on("fn-start", function (t, e, n) {
                e instanceof XMLHttpRequest && ("onload" === n && (this.onload = !0), ("load" === (t[0] && t[0].type) || this.onload) && (this.xhrCbStart = (new Date).getTime()))
            }), a.on("fn-end", function (t, e) {
                this.xhrCbStart && a.emit("xhr-cb-time", [(new Date).getTime() - this.xhrCbStart, this.onload, e], e)
            })
        }
    }, { 1: "XL7HBI", 2: 12, 3: 10, 4: 6, ee: "QJf3ax", handle: "D5DuLP", loader: "G9z0Bl" }], 12: [function (t, e) {
        e.exports = function (t) {
            var e = document.createElement("a"), n = window.location, r = {};
            e.href = t, r.port = e.port;
            var o = e.href.split("://");
            return !r.port && o[1] && (r.port = o[1].split("/")[0].split("@").pop().split(":")[1]), r.port && "0" !== r.port || (r.port = "https" === o[0] ? "443" : "80"), r.hostname = e.hostname || n.hostname, r.pathname = e.pathname, r.protocol = o[0], "/" !== r.pathname.charAt(0) && (r.pathname = "/" + r.pathname), r.sameOrigin = !e.hostname || e.hostname === document.domain && e.port === n.port && e.protocol === n.protocol, r
        }
    }, {}], 13: [function (t, e) {
        function n(t) {
            return function () {
                r(t, [(new Date).getTime()].concat(i(arguments)))
            }
        }

        var r = t("handle"), o = t(1), i = t(2);
        "undefined" == typeof window.newrelic && (newrelic = window.NREUM);
        var a = ["setPageViewName", "addPageAction", "setCustomAttribute", "finished", "addToTrace", "inlineHit", "noticeError"];
        o(a, function (t, e) {
            window.NREUM[e] = n("api-" + e)
        }), e.exports = window.NREUM
    }, { 1: 22, 2: 23, handle: "D5DuLP" }], "7eSDFh": [function (t, e) {
        function n(t, e, n) {
            if (r.call(t, e)) return t[e];
            var o = n();
            if (Object.defineProperty && Object.keys) try {
                return Object.defineProperty(t, e, { value: o, writable: !0, enumerable: !1 }), o
            } catch (i) {
            }
            return t[e] = o, o
        }

        var r = Object.prototype.hasOwnProperty;
        e.exports = n
    }, {}], gos: [function (t, e) {
        e.exports = t("7eSDFh")
    }, {}], handle: [function (t, e) {
        e.exports = t("D5DuLP")
    }, {}], D5DuLP: [function (t, e) {
        function n(t, e, n) {
            return r.listeners(t).length ? r.emit(t, e, n) : (o[t] || (o[t] = []), void o[t].push(e))
        }

        var r = t("ee").create(), o = {};
        e.exports = n, n.ee = r, r.q = o
    }, { ee: "QJf3ax" }], id: [function (t, e) {
        e.exports = t("XL7HBI")
    }, {}], XL7HBI: [function (t, e) {
        function n(t) {
            var e = typeof t;
            return !t || "object" !== e && "function" !== e ? -1 : t === window ? 0 : i(t, o, function () {
                return r++
            })
        }

        var r = 1, o = "nr@id", i = t("gos");
        e.exports = n
    }, { gos: "7eSDFh" }], G9z0Bl: [function (t, e) {
        function n() {
            var t = p.info = NREUM.info, e = f.getElementsByTagName("script")[0];
            if (t && t.licenseKey && t.applicationID && e) {
                s(d, function (e, n) {
                    e in t || (t[e] = n)
                });
                var n = "https" === u.split(":")[0] || t.sslForHttp;
                p.proto = n ? "https://" : "http://", a("mark", ["onload", i()]);
                var r = f.createElement("script");
                r.src = p.proto + t.agent, e.parentNode.insertBefore(r, e)
            }
        }

        function r() {
            "complete" === f.readyState && o()
        }

        function o() {
            a("mark", ["domContent", i()])
        }

        function i() {
            return (new Date).getTime()
        }

        var a = t("handle"), s = t(1), c = (t(2), window), f = c.document, u = ("" + location).split("?")[0], d = {
            beacon: "bam.nr-data.net",
            errorBeacon: "bam.nr-data.net",
            agent: "js-agent.newrelic.com/nr-632.min.js"
        }, p = e.exports = { offset: i(), origin: u, features: {} };
        f.addEventListener ? (f.addEventListener("DOMContentLoaded", o, !1), c.addEventListener("load", n, !1)) : (f.attachEvent("onreadystatechange", r), c.attachEvent("onload", n)), a("mark", ["firstbyte", i()])
    }, { 1: 22, 2: 13, handle: "D5DuLP" }], loader: [function (t, e) {
        e.exports = t("G9z0Bl")
    }, {}], 22: [function (t, e) {
        function n(t, e) {
            var n = [], o = "", i = 0;
            for (o in t) r.call(t, o) && (n[i] = e(o, t[o]), i += 1);
            return n
        }

        var r = Object.prototype.hasOwnProperty;
        e.exports = n
    }, {}], 23: [function (t, e) {
        function n(t, e, n) {
            e || (e = 0), "undefined" == typeof n && (n = t ? t.length : 0);
            for (var r = -1, o = n - e || 0, i = Array(0 > o ? 0 : o); ++r < o;)i[r] = t[e + r];
            return i
        }

        e.exports = n
    }, {}], 24: [function (t, e) {
        function n(t) {
            return !(t && "function" == typeof t && t.apply && !t[i])
        }

        var r = t("ee"), o = t(1), i = "nr@wrapper", a = Object.prototype.hasOwnProperty;
        e.exports = function (t) {
            function e(t, e, r, a) {
                function nrWrapper() {
                    var n, i, s, f;
                    try {
                        i = this, n = o(arguments), s = r && r(n, i) || {}
                    } catch (d) {
                        u([d, "", [n, i, a], s])
                    }
                    c(e + "start", [n, i, a], s);
                    try {
                        return f = t.apply(i, n)
                    } catch (p) {
                        throw c(e + "err", [n, i, p], s), p
                    } finally {
                        c(e + "end", [n, i, f], s)
                    }
                }

                return n(t) ? t : (e || (e = ""), nrWrapper[i] = !0, f(t, nrWrapper), nrWrapper)
            }

            function s(t, r, o, i) {
                o || (o = "");
                var a, s, c, f = "-" === o.charAt(0);
                for (c = 0; c < r.length; c++)s = r[c], a = t[s], n(a) || (t[s] = e(a, f ? s + o : o, i, s))
            }

            function c(e, n, r) {
                try {
                    t.emit(e, n, r)
                } catch (o) {
                    u([o, e, n, r])
                }
            }

            function f(t, e) {
                if (Object.defineProperty && Object.keys) try {
                    var n = Object.keys(t);
                    return n.forEach(function (n) {
                        Object.defineProperty(e, n, {
                            get: function () {
                                return t[n]
                            }, set: function (e) {
                                return t[n] = e, e
                            }
                        })
                    }), e
                } catch (r) {
                    u([r])
                }
                for (var o in t) a.call(t, o) && (e[o] = t[o]);
                return e
            }

            function u(e) {
                try {
                    t.emit("internal-error", e)
                } catch (n) {
                }
            }

            return t || (t = r), e.inPlace = s, e.flag = i, e
        }
    }, { 1: 23, ee: "QJf3ax" }]
}, {}, ["G9z0Bl", 4, 11, 5]);
;
NREUM.info = {
    beacon: "bam.nr-data.net",
    errorBeacon: "bam.nr-data.net",
    licenseKey: "d1bbf1c89e",
    applicationID: "9137023",
    sa: 1,
    agent: "js-agent.newrelic.com/nr-632.min.js"
}