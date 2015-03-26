var Holder = Holder || {};
! function(t, e) {
    function n(t, e, n) {
        e = parseInt(e, 10), t = parseInt(t, 10);
        var r = Math.max(e, t),
            i = Math.min(e, t),
            o = 1 / 12,
            a = Math.min(.75 * i, .75 * r * o);
        return {
            height: Math.round(Math.max(n.size, a))
        }
    }

    function r(t) {
        var e = [];
        for (p in t) t.hasOwnProperty(p) && e.push(p + ":" + t[p]);
        return e.join(";")
    }

    function i(t) {
        var e = t.ctx,
            r = t.dimensions,
            i = t.template,
            o = t.ratio,
            a = t.holder,
            s = "literal" == a.textmode,
            u = "exact" == a.textmode,
            l = n(r.width, r.height, i),
            c = l.height,
            f = r.width * o,
            h = r.height * o,
            d = i.font ? i.font : "Arial,Helvetica,sans-serif";
        canvas.width = f, canvas.height = h, e.textAlign = "center", e.textBaseline = "middle", e.fillStyle = i.background, e.fillRect(0, 0, f, h), e.fillStyle = i.foreground, e.font = "bold " + c + "px " + d;
        var p = i.text ? i.text : Math.floor(r.width) + "x" + Math.floor(r.height);
        if (s) {
            var r = a.dimensions;
            p = r.width + "x" + r.height
        } else if (u && a.exact_dimensions) {
            var r = a.exact_dimensions;
            p = Math.floor(r.width) + "x" + Math.floor(r.height)
        }
        var g = e.measureText(p).width;
        return g / f >= .75 && (c = Math.floor(.75 * c * (f / g))), e.font = "bold " + c * o + "px " + d, e.fillText(p, f / 2, h / 2, f), canvas.toDataURL("image/png")
    }

    function o(t) {
        var e = t.dimensions,
            r = t.template,
            i = t.holder,
            o = "literal" == i.textmode,
            a = "exact" == i.textmode,
            s = n(e.width, e.height, r),
            u = s.height,
            l = e.width,
            c = e.height,
            f = r.font ? r.font : "Arial,Helvetica,sans-serif",
            h = r.text ? r.text : Math.floor(e.width) + "x" + Math.floor(e.height);
        if (o) {
            var e = i.dimensions;
            h = e.width + "x" + e.height
        } else if (a && i.exact_dimensions) {
            var e = i.exact_dimensions;
            h = Math.floor(e.width) + "x" + Math.floor(e.height)
        }
        var d = N({
            text: h,
            width: l,
            height: c,
            text_height: u,
            font: f,
            template: r
        });
        return "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(d)))
    }

    function a(t) {
        return v.use_canvas && !v.use_svg ? i(t) : o(t)
    }

    function s(t, e, n, r) {
        var i = n.dimensions,
            o = n.theme,
            s = n.text ? decodeURIComponent(n.text) : n.text,
            u = i.width + "x" + i.height;
        o = s ? g(o, {
            text: s
        }) : o, o = n.font ? g(o, {
            font: n.font
        }) : o, e.setAttribute("data-src", r), n.theme = o, e.holder_data = n, "image" == t ? (e.setAttribute("alt", s ? s : o.text ? o.text + " [" + u + "]" : u), (v.use_fallback || !n.auto) && (e.style.width = i.width + "px", e.style.height = i.height + "px"), v.use_fallback ? e.style.backgroundColor = o.background : (e.setAttribute("src", a({
            ctx: _,
            dimensions: i,
            template: o,
            ratio: M,
            holder: n
        })), n.textmode && "exact" == n.textmode && (w.push(e), c(e)))) : "background" == t ? v.use_fallback || (e.style.backgroundImage = "url(" + a({
            ctx: _,
            dimensions: i,
            template: o,
            ratio: M,
            holder: n
        }) + ")", e.style.backgroundSize = i.width + "px " + i.height + "px") : "fluid" == t && (e.setAttribute("alt", s ? s : o.text ? o.text + " [" + u + "]" : u), "%" == i.height.slice(-1) ? e.style.height = i.height : null != n.auto && n.auto || (e.style.height = i.height + "px"), "%" == i.width.slice(-1) ? e.style.width = i.width : null != n.auto && n.auto || (e.style.width = i.width + "px"), ("inline" == e.style.display || "" === e.style.display || "none" == e.style.display) && (e.style.display = "block"), l(e), v.use_fallback ? e.style.backgroundColor = o.background : (w.push(e), c(e)))
    }

    function u(t, e) {
        var n = {
            height: t.clientHeight,
            width: t.clientWidth
        };
        return n.height || n.width ? (t.removeAttribute("data-holder-invisible"), n) : (t.setAttribute("data-holder-invisible", !0), void e.call(this, t))
    }

    function l(e) {
        if (e.holder_data) {
            var n = u(e, t.invisible_error_fn(l));
            if (n) {
                var r = e.holder_data;
                r.initial_dimensions = n, r.fluid_data = {
                    fluid_height: "%" == r.dimensions.height.slice(-1),
                    fluid_width: "%" == r.dimensions.width.slice(-1),
                    mode: null
                }, r.fluid_data.fluid_width && !r.fluid_data.fluid_height ? (r.fluid_data.mode = "width", r.fluid_data.ratio = r.initial_dimensions.width / parseFloat(r.dimensions.height)) : !r.fluid_data.fluid_width && r.fluid_data.fluid_height && (r.fluid_data.mode = "height", r.fluid_data.ratio = parseFloat(r.dimensions.width) / r.initial_dimensions.height)
            }
        }
    }

    function c(e) {
        var n;
        n = null == e.nodeType ? w : [e];
        for (var r in n)
            if (n.hasOwnProperty(r)) {
                var i = n[r];
                if (i.holder_data) {
                    var o = i.holder_data,
                        s = u(i, t.invisible_error_fn(c));
                    if (s) {
                        if (o.fluid) {
                            if (o.auto) switch (o.fluid_data.mode) {
                                case "width":
                                    s.height = s.width / o.fluid_data.ratio;
                                    break;
                                case "height":
                                    s.width = s.height * o.fluid_data.ratio
                            }
                            i.setAttribute("src", a({
                                ctx: _,
                                dimensions: s,
                                template: o.theme,
                                ratio: M,
                                holder: o
                            }))
                        }
                        o.textmode && "exact" == o.textmode && (o.exact_dimensions = s, i.setAttribute("src", a({
                            ctx: _,
                            dimensions: o.dimensions,
                            template: o.theme,
                            ratio: M,
                            holder: o
                        })))
                    }
                }
            }
    }

    function f(e, n) {
        for (var r = {
                theme: g(k.themes.gray, {})
            }, i = !1, o = e.length, a = 0; o > a; a++) {
            var s = e[a];
            t.flags.dimensions.match(s) ? (i = !0, r.dimensions = t.flags.dimensions.output(s)) : t.flags.fluid.match(s) ? (i = !0, r.dimensions = t.flags.fluid.output(s), r.fluid = !0) : t.flags.textmode.match(s) ? r.textmode = t.flags.textmode.output(s) : t.flags.colors.match(s) ? r.theme = t.flags.colors.output(s) : n.themes[s] ? n.themes.hasOwnProperty(s) && (r.theme = g(n.themes[s], {})) : t.flags.font.match(s) ? r.font = t.flags.font.output(s) : t.flags.auto.match(s) ? r.auto = !0 : t.flags.text.match(s) && (r.text = t.flags.text.output(s))
        }
        return i ? r : !1
    }

    function h(t, e) {
        var n = "complete",
            r = "readystatechange",
            i = !1,
            o = i,
            a = !0,
            s = t.document,
            u = s.documentElement,
            l = s.addEventListener ? "addEventListener" : "attachEvent",
            c = s.addEventListener ? "removeEventListener" : "detachEvent",
            f = s.addEventListener ? "" : "on",
            h = function(a) {
                (a.type != r || s.readyState == n) && (("load" == a.type ? t : s)[c](f + a.type, h, i), !o && (o = !0) && e.call(t, null))
            },
            d = function() {
                try {
                    u.doScroll("left")
                } catch (t) {
                    return void setTimeout(d, 50)
                }
                h("poll")
            };
        if (s.readyState == n) e.call(t, "lazy");
        else {
            if (s.createEventObject && u.doScroll) {
                try {
                    a = !t.frameElement
                } catch (p) {}
                a && d()
            }
            s[l](f + "DOMContentLoaded", h, i), s[l](f + r, h, i), t[l](f + "load", h, i)
        }
    }

    function d(t, e) {
        var t = t.match(/^(\W)?(.*)/),
            e = e || document,
            n = e["getElement" + (t[1] ? "#" == t[1] ? "ById" : "sByClassName" : "sByTagName")],
            r = n.call(e, t[2]),
            i = [];
        return null !== r && (i = r.length || 0 === r.length ? r : [r]), i
    }

    function g(t, e) {
        var n = {};
        for (var r in t) t.hasOwnProperty(r) && (n[r] = t[r]);
        for (var r in e) e.hasOwnProperty(r) && (n[r] = e[r]);
        return n
    }
    var m = {
            use_svg: !1,
            use_canvas: !1,
            use_fallback: !1
        },
        v = {},
        y = !1;
    canvas = document.createElement("canvas");
    var b = 1,
        x = 1,
        w = [];
    if (canvas.getContext)
        if (canvas.toDataURL("image/png").indexOf("data:image/png") < 0) m.use_fallback = !0;
        else var _ = canvas.getContext("2d");
    else m.use_fallback = !0;
    document.createElementNS && document.createElementNS("http://www.w3.org/2000/svg", "svg").createSVGRect && (m.use_svg = !0, m.use_canvas = !1), m.use_fallback || (b = window.devicePixelRatio || 1, x = _.webkitBackingStorePixelRatio || _.mozBackingStorePixelRatio || _.msBackingStorePixelRatio || _.oBackingStorePixelRatio || _.backingStorePixelRatio || 1);
    var M = b / x,
        k = {
            domain: "holder.js",
            images: "img",
            bgnodes: ".holderjs",
            themes: {
                gray: {
                    background: "#eee",
                    foreground: "#aaa",
                    size: 12
                },
                social: {
                    background: "#3a5a97",
                    foreground: "#fff",
                    size: 12
                },
                industrial: {
                    background: "#434A52",
                    foreground: "#C2F200",
                    size: 12
                },
                sky: {
                    background: "#0D8FDB",
                    foreground: "#fff",
                    size: 12
                },
                vine: {
                    background: "#39DBAC",
                    foreground: "#1E292C",
                    size: 12
                },
                lava: {
                    background: "#F8591A",
                    foreground: "#1C2846",
                    size: 12
                }
            },
            stylesheet: ""
        };
    t.flags = {
        dimensions: {
            regex: /^(\d+)x(\d+)$/,
            output: function(t) {
                var e = this.regex.exec(t);
                return {
                    width: +e[1],
                    height: +e[2]
                }
            }
        },
        fluid: {
            regex: /^([0-9%]+)x([0-9%]+)$/,
            output: function(t) {
                var e = this.regex.exec(t);
                return {
                    width: e[1],
                    height: e[2]
                }
            }
        },
        colors: {
            regex: /#([0-9a-f]{3,})\:#([0-9a-f]{3,})/i,
            output: function(t) {
                var e = this.regex.exec(t);
                return {
                    size: k.themes.gray.size,
                    foreground: "#" + e[2],
                    background: "#" + e[1]
                }
            }
        },
        text: {
            regex: /text\:(.*)/,
            output: function(t) {
                return this.regex.exec(t)[1]
            }
        },
        font: {
            regex: /font\:(.*)/,
            output: function(t) {
                return this.regex.exec(t)[1]
            }
        },
        auto: {
            regex: /^auto$/
        },
        textmode: {
            regex: /textmode\:(.*)/,
            output: function(t) {
                return this.regex.exec(t)[1]
            }
        }
    };
    var N = function() {
        if (window.XMLSerializer) {
            var t = new XMLSerializer,
                e = "http://www.w3.org/2000/svg",
                n = document.createElementNS(e, "svg");
            n.webkitMatchesSelector && n.setAttribute("xmlns", "http://www.w3.org/2000/svg");
            var i = document.createElementNS(e, "rect"),
                o = document.createElementNS(e, "text"),
                a = document.createTextNode(null);
            return o.setAttribute("text-anchor", "middle"), o.appendChild(a), n.appendChild(i), n.appendChild(o),
                function(e) {
                    return n.setAttribute("width", e.width), n.setAttribute("height", e.height), i.setAttribute("width", e.width), i.setAttribute("height", e.height), i.setAttribute("fill", e.template.background), o.setAttribute("x", e.width / 2), o.setAttribute("y", e.height / 2), a.nodeValue = e.text, o.setAttribute("style", r({
                        fill: e.template.foreground,
                        "font-weight": "bold",
                        "font-size": e.text_height + "px",
                        "font-family": e.font,
                        "dominant-baseline": "central"
                    })), t.serializeToString(n)
                }
        }
    }();
    for (var C in t.flags) t.flags.hasOwnProperty(C) && (t.flags[C].match = function(t) {
        return t.match(this.regex)
    });
    t.invisible_error_fn = function(t) {
            return function(t) {
                if (t.hasAttribute("data-holder-invisible")) throw new Error("Holder: invisible placeholder")
            }
        }, t.add_theme = function(e, n) {
            return null != e && null != n && (k.themes[e] = n), t
        }, t.add_image = function(e, n) {
            var r = d(n);
            if (r.length)
                for (var i = 0, o = r.length; o > i; i++) {
                    var a = document.createElement("img");
                    a.setAttribute("data-src", e), r[i].appendChild(a)
                }
            return t
        }, t.run = function(e) {
            v = g({}, m), y = !0;
            var n = g(k, e),
                r = [],
                i = [],
                o = [];
            for (null != n.use_canvas && n.use_canvas && (v.use_canvas = !0, v.use_svg = !1), "string" == typeof n.images ? i = d(n.images) : window.NodeList && n.images instanceof window.NodeList ? i = n.images : window.Node && n.images instanceof window.Node ? i = [n.images] : window.HTMLCollection && n.images instanceof window.HTMLCollection && (i = n.images), "string" == typeof n.bgnodes ? o = d(n.bgnodes) : window.NodeList && n.elements instanceof window.NodeList ? o = n.bgnodes : window.Node && n.bgnodes instanceof window.Node && (o = [n.bgnodes]), c = 0, l = i.length; l > c; c++) r.push(i[c]);
            var a = document.getElementById("holderjs-style");
            a || (a = document.createElement("style"), a.setAttribute("id", "holderjs-style"), a.type = "text/css", document.getElementsByTagName("head")[0].appendChild(a)), n.nocss || (a.styleSheet ? a.styleSheet.cssText += n.stylesheet : n.stylesheet.length && a.appendChild(document.createTextNode(n.stylesheet)));
            for (var u = new RegExp(n.domain + '/(.*?)"?\\)'), l = o.length, c = 0; l > c; c++) {
                var h = window.getComputedStyle(o[c], null).getPropertyValue("background-image"),
                    p = h.match(u),
                    b = o[c].getAttribute("data-background-src");
                if (p) {
                    var x = f(p[1].split("/"), n);
                    x && s("background", o[c], x, h)
                } else if (null != b) {
                    var x = f(b.substr(b.lastIndexOf(n.domain) + n.domain.length + 1).split("/"), n);
                    x && s("background", o[c], x, h)
                }
            }
            for (l = r.length, c = 0; l > c; c++) {
                var w, _;
                _ = w = h = null;
                try {
                    _ = r[c].getAttribute("src"), attr_datasrc = r[c].getAttribute("data-src")
                } catch (M) {}
                if (null == attr_datasrc && _ && _.indexOf(n.domain) >= 0 ? h = _ : attr_datasrc && attr_datasrc.indexOf(n.domain) >= 0 && (h = attr_datasrc), h) {
                    var x = f(h.substr(h.lastIndexOf(n.domain) + n.domain.length + 1).split("/"), n);
                    x && (x.fluid ? s("fluid", r[c], x, h) : s("image", r[c], x, h))
                }
            }
            return t
        }, h(e, function() {
            window.addEventListener ? (window.addEventListener("resize", c, !1), window.addEventListener("orientationchange", c, !1)) : window.attachEvent("onresize", c), y || t.run({}), "object" == typeof window.Turbolinks && document.addEventListener("page:change", function() {
                t.run({})
            })
        }), "function" == typeof define && define.amd && define([], function() {
            return t
        }),
        function() {
            function t(t) {
                this.message = t
            }
            var e = "undefined" != typeof exports ? exports : this,
                n = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
            t.prototype = Error(), t.prototype.name = "InvalidCharacterError", e.btoa || (e.btoa = function(e) {
                for (var r, i, o = 0, a = n, s = ""; e.charAt(0 | o) || (a = "=", o % 1); s += a.charAt(63 & r >> 8 - 8 * (o % 1))) {
                    if (i = e.charCodeAt(o += .75), i > 255) throw new t("'btoa' failed");
                    r = r << 8 | i
                }
                return s
            }), e.atob || (e.atob = function(e) {
                if (e = e.replace(/=+$/, ""), 1 == e.length % 4) throw new t("'atob' failed");
                for (var r, i, o = 0, a = 0, s = ""; i = e.charAt(a++); ~i && (r = o % 4 ? 64 * r + i : i, o++ % 4) ? s += String.fromCharCode(255 & r >> (6 & -2 * o)) : 0) i = n.indexOf(i);
                return s
            })
        }(), document.getElementsByClassName || (document.getElementsByClassName = function(t) {
            var e = document,
                n, r, i, o = [];
            if (e.querySelectorAll) return e.querySelectorAll("." + t);
            if (e.evaluate)
                for (r = ".//*[contains(concat(' ', @class, ' '), ' " + t + " ')]", n = e.evaluate(r, e, null, 0, null); i = n.iterateNext();) o.push(i);
            else
                for (n = e.getElementsByTagName("*"), r = new RegExp("(^|\\s)" + t + "(\\s|$)"), i = 0; i < n.length; i++) r.test(n[i].className) && o.push(n[i]);
            return o
        }), window.getComputedStyle || (window.getComputedStyle = function(t) {
            return this.el = t, this.getPropertyValue = function(e) {
                var n = /(\-([a-z]){1})/g;
                return "float" == e && (e = "styleFloat"), n.test(e) && (e = e.replace(n, function() {
                    return arguments[2].toUpperCase()
                })), t.currentStyle[e] ? t.currentStyle[e] : null
            }, this
        }), Object.prototype.hasOwnProperty || (Object.prototype.hasOwnProperty = function(t) {
            var e = this.__proto__ || this.constructor.prototype;
            return t in this && (!(t in e) || e[t] !== this[t])
        })
}(Holder, window), ! function() {
    function t(t, e) {
        return e > t ? -1 : t > e ? 1 : t >= e ? 0 : 0 / 0
    }

    function e(t) {
        return null != t && !isNaN(t)
    }

    function n(t) {
        return {
            left: function(e, n, r, i) {
                for (arguments.length < 3 && (r = 0), arguments.length < 4 && (i = e.length); i > r;) {
                    var o = r + i >>> 1;
                    t(e[o], n) < 0 ? r = o + 1 : i = o
                }
                return r
            },
            right: function(e, n, r, i) {
                for (arguments.length < 3 && (r = 0), arguments.length < 4 && (i = e.length); i > r;) {
                    var o = r + i >>> 1;
                    t(e[o], n) > 0 ? i = o : r = o + 1
                }
                return r
            }
        }
    }

    function r(t) {
        return t.length
    }

    function i(t) {
        for (var e = 1; t * e % 1;) e *= 10;
        return e
    }

    function o(t, e) {
        try {
            for (var n in e) Object.defineProperty(t.prototype, n, {
                value: e[n],
                enumerable: !1
            })
        } catch (r) {
            t.prototype = e
        }
    }

    function a() {}

    function s(t) {
        return fs + t in this
    }

    function u(t) {
        return t = fs + t, t in this && delete this[t]
    }

    function l() {
        var t = [];
        return this.forEach(function(e) {
            t.push(e)
        }), t
    }

    function c() {
        var t = 0;
        for (var e in this) e.charCodeAt(0) === hs && ++t;
        return t
    }

    function f() {
        for (var t in this)
            if (t.charCodeAt(0) === hs) return !1;
        return !0
    }

    function h() {}

    function d(t, e, n) {
        return function() {
            var r = n.apply(e, arguments);
            return r === e ? t : r
        }
    }

    function p(t, e) {
        if (e in t) return e;
        e = e.charAt(0).toUpperCase() + e.substring(1);
        for (var n = 0, r = ds.length; r > n; ++n) {
            var i = ds[n] + e;
            if (i in t) return i
        }
    }

    function g() {}

    function m() {}

    function v(t) {
        function e() {
            for (var e = n, r = -1, i = e.length, o; ++r < i;)(o = e[r].on) && o.apply(this, arguments);
            return t
        }
        var n = [],
            r = new a;
        return e.on = function(e, i) {
            var o = r.get(e),
                a;
            return arguments.length < 2 ? o && o.on : (o && (o.on = null, n = n.slice(0, a = n.indexOf(o)).concat(n.slice(a + 1)), r.remove(e)), i && n.push(r.set(e, {
                on: i
            })), t)
        }, e
    }

    function y() {
        Qa.event.preventDefault()
    }

    function b() {
        for (var t = Qa.event, e; e = t.sourceEvent;) t = e;
        return t
    }

    function x(t) {
        for (var e = new m, n = 0, r = arguments.length; ++n < r;) e[arguments[n]] = v(e);
        return e.of = function(n, r) {
            return function(i) {
                try {
                    var o = i.sourceEvent = Qa.event;
                    i.target = t, Qa.event = i, e[i.type].apply(n, r)
                } finally {
                    Qa.event = o
                }
            }
        }, e
    }

    function w(t) {
        return gs(t, xs), t
    }

    function _(t) {
        return "function" == typeof t ? t : function() {
            return ms(t, this)
        }
    }

    function M(t) {
        return "function" == typeof t ? t : function() {
            return vs(t, this)
        }
    }

    function k(t, e) {
        function n() {
            this.removeAttribute(t)
        }

        function r() {
            this.removeAttributeNS(t.space, t.local)
        }

        function i() {
            this.setAttribute(t, e)
        }

        function o() {
            this.setAttributeNS(t.space, t.local, e)
        }

        function a() {
            var n = e.apply(this, arguments);
            null == n ? this.removeAttribute(t) : this.setAttribute(t, n)
        }

        function s() {
            var n = e.apply(this, arguments);
            null == n ? this.removeAttributeNS(t.space, t.local) : this.setAttributeNS(t.space, t.local, n)
        }
        return t = Qa.ns.qualify(t), null == e ? t.local ? r : n : "function" == typeof e ? t.local ? s : a : t.local ? o : i
    }

    function N(t) {
        return t.trim().replace(/\s+/g, " ")
    }

    function C(t) {
        return new RegExp("(?:^|\\s+)" + Qa.requote(t) + "(?:\\s+|$)", "g")
    }

    function E(t) {
        return t.trim().split(/^|\s+/)
    }

    function S(t, e) {
        function n() {
            for (var n = -1; ++n < i;) t[n](this, e)
        }

        function r() {
            for (var n = -1, r = e.apply(this, arguments); ++n < i;) t[n](this, r)
        }
        t = E(t).map(T);
        var i = t.length;
        return "function" == typeof e ? r : n
    }

    function T(t) {
        var e = C(t);
        return function(n, r) {
            if (i = n.classList) return r ? i.add(t) : i.remove(t);
            var i = n.getAttribute("class") || "";
            r ? (e.lastIndex = 0, e.test(i) || n.setAttribute("class", N(i + " " + t))) : n.setAttribute("class", N(i.replace(e, " ")))
        }
    }

    function A(t, e, n) {
        function r() {
            this.style.removeProperty(t)
        }

        function i() {
            this.style.setProperty(t, e, n)
        }

        function o() {
            var r = e.apply(this, arguments);
            null == r ? this.style.removeProperty(t) : this.style.setProperty(t, r, n)
        }
        return null == e ? r : "function" == typeof e ? o : i
    }

    function L(t, e) {
        function n() {
            delete this[t]
        }

        function r() {
            this[t] = e
        }

        function i() {
            var n = e.apply(this, arguments);
            null == n ? delete this[t] : this[t] = n
        }
        return null == e ? n : "function" == typeof e ? i : r
    }

    function j(t) {
        return "function" == typeof t ? t : (t = Qa.ns.qualify(t)).local ? function() {
            return this.ownerDocument.createElementNS(t.space, t.local)
        } : function() {
            return this.ownerDocument.createElementNS(this.namespaceURI, t)
        }
    }

    function D(t) {
        return {
            __data__: t
        }
    }

    function q(t) {
        return function() {
            return bs(this, t)
        }
    }

    function R(e) {
        return arguments.length || (e = t),
            function(t, n) {
                return t && n ? e(t.__data__, n.__data__) : !t - !n
            }
    }

    function z(t, e) {
        for (var n = 0, r = t.length; r > n; n++)
            for (var i = t[n], o = 0, a = i.length, s; a > o; o++)(s = i[o]) && e(s, o, n);
        return t
    }

    function I(t) {
        return gs(t, _s), t
    }

    function B(t) {
        var e, n;
        return function(r, i, o) {
            var a = t[o].update,
                s = a.length,
                u;
            for (o != n && (n = o, e = 0), i >= e && (e = i + 1); !(u = a[e]) && ++e < s;);
            return u
        }
    }

    function O() {
        var t = this.__transition__;
        t && ++t.active
    }

    function P(t, e, n) {
        function r() {
            var e = this[a];
            e && (this.removeEventListener(t, e, e.$), delete this[a])
        }

        function i() {
            var i = u(e, Ga(arguments));
            r.call(this), this.addEventListener(t, this[a] = i, i.$ = n), i._ = e
        }

        function o() {
            var e = new RegExp("^__on([^.]+)" + Qa.requote(t) + "$"),
                n;
            for (var r in this)
                if (n = r.match(e)) {
                    var i = this[r];
                    this.removeEventListener(n[1], i, i.$), delete this[r]
                }
        }
        var a = "__on" + t,
            s = t.indexOf("."),
            u = H;
        s > 0 && (t = t.substring(0, s));
        var l = ks.get(t);
        return l && (t = l, u = F), s ? e ? i : r : e ? g : o
    }

    function H(t, e) {
        return function(n) {
            var r = Qa.event;
            Qa.event = n, e[0] = this.__data__;
            try {
                t.apply(this, e)
            } finally {
                Qa.event = r
            }
        }
    }

    function F(t, e) {
        var n = H(t, e);
        return function(t) {
            var e = this,
                r = t.relatedTarget;
            r && (r === e || 8 & r.compareDocumentPosition(e)) || n.call(e, t)
        }
    }

    function U() {
        var t = ".dragsuppress-" + ++Cs,
            e = "click" + t,
            n = Qa.select(es).on("touchmove" + t, y).on("dragstart" + t, y).on("selectstart" + t, y);
        if (Ns) {
            var r = ts.style,
                i = r[Ns];
            r[Ns] = "none"
        }
        return function(o) {
            function a() {
                n.on(e, null)
            }
            n.on(t, null), Ns && (r[Ns] = i), o && (n.on(e, function() {
                y(), a()
            }, !0), setTimeout(a, 0))
        }
    }

    function W(t, e) {
        e.changedTouches && (e = e.changedTouches[0]);
        var n = t.ownerSVGElement || t;
        if (n.createSVGPoint) {
            var r = n.createSVGPoint();
            return r.x = e.clientX, r.y = e.clientY, r = r.matrixTransform(t.getScreenCTM().inverse()), [r.x, r.y]
        }
        var i = t.getBoundingClientRect();
        return [e.clientX - i.left - t.clientLeft, e.clientY - i.top - t.clientTop]
    }

    function V() {
        return Qa.event.changedTouches[0].identifier
    }

    function Z() {
        return Qa.event.target
    }

    function Y() {
        return es
    }

    function X(t) {
        return t > 0 ? 1 : 0 > t ? -1 : 0
    }

    function Q(t, e, n) {
        return (e[0] - t[0]) * (n[1] - t[1]) - (e[1] - t[1]) * (n[0] - t[0])
    }

    function K(t) {
        return t > 1 ? 0 : -1 > t ? Es : Math.acos(t)
    }

    function G(t) {
        return t > 1 ? Ts : -1 > t ? -Ts : Math.asin(t)
    }

    function J(t) {
        return ((t = Math.exp(t)) - 1 / t) / 2
    }

    function te(t) {
        return ((t = Math.exp(t)) + 1 / t) / 2
    }

    function ee(t) {
        return ((t = Math.exp(2 * t)) - 1) / (t + 1)
    }

    function ne(t) {
        return (t = Math.sin(t / 2)) * t
    }

    function re() {}

    function ie(t, e, n) {
        return new oe(t, e, n)
    }

    function oe(t, e, n) {
        this.h = t, this.s = e, this.l = n
    }

    function ae(t, e, n) {
        function r(t) {
            return t > 360 ? t -= 360 : 0 > t && (t += 360), 60 > t ? o + (a - o) * t / 60 : 180 > t ? a : 240 > t ? o + (a - o) * (240 - t) / 60 : o
        }

        function i(t) {
            return Math.round(255 * r(t))
        }
        var o, a;
        return t = isNaN(t) ? 0 : (t %= 360) < 0 ? t + 360 : t, e = isNaN(e) ? 0 : 0 > e ? 0 : e > 1 ? 1 : e, n = 0 > n ? 0 : n > 1 ? 1 : n, a = .5 >= n ? n * (1 + e) : n + e - n * e, o = 2 * n - a, be(i(t + 120), i(t), i(t - 120))
    }

    function se(t, e, n) {
        return new ue(t, e, n)
    }

    function ue(t, e, n) {
        this.h = t, this.c = e, this.l = n
    }

    function le(t, e, n) {
        return isNaN(t) && (t = 0), isNaN(e) && (e = 0), ce(n, Math.cos(t *= Ls) * e, Math.sin(t) * e)
    }

    function ce(t, e, n) {
        return new fe(t, e, n)
    }

    function fe(t, e, n) {
        this.l = t, this.a = e, this.b = n
    }

    function he(t, e, n) {
        var r = (t + 16) / 116,
            i = r + e / 500,
            o = r - n / 200;
        return i = pe(i) * Fs, r = pe(r) * Us, o = pe(o) * Ws, be(me(3.2404542 * i - 1.5371385 * r - .4985314 * o), me(-.969266 * i + 1.8760108 * r + .041556 * o), me(.0556434 * i - .2040259 * r + 1.0572252 * o))
    }

    function de(t, e, n) {
        return t > 0 ? se(Math.atan2(n, e) * js, Math.sqrt(e * e + n * n), t) : se(0 / 0, 0 / 0, t)
    }

    function pe(t) {
        return t > .206893034 ? t * t * t : (t - 4 / 29) / 7.787037
    }

    function ge(t) {
        return t > .008856 ? Math.pow(t, 1 / 3) : 7.787037 * t + 4 / 29
    }

    function me(t) {
        return Math.round(255 * (.00304 >= t ? 12.92 * t : 1.055 * Math.pow(t, 1 / 2.4) - .055))
    }

    function ve(t) {
        return be(t >> 16, t >> 8 & 255, 255 & t)
    }

    function ye(t) {
        return ve(t) + ""
    }

    function be(t, e, n) {
        return new xe(t, e, n)
    }

    function xe(t, e, n) {
        this.r = t, this.g = e, this.b = n
    }

    function we(t) {
        return 16 > t ? "0" + Math.max(0, t).toString(16) : Math.min(255, t).toString(16)
    }

    function _e(t, e, n) {
        var r = 0,
            i = 0,
            o = 0,
            a, s, u;
        if (a = /([a-z]+)\((.*)\)/i.exec(t)) switch (s = a[2].split(","), a[1]) {
            case "hsl":
                return n(parseFloat(s[0]), parseFloat(s[1]) / 100, parseFloat(s[2]) / 100);
            case "rgb":
                return e(Ce(s[0]), Ce(s[1]), Ce(s[2]))
        }
        return (u = Ys.get(t)) ? e(u.r, u.g, u.b) : (null == t || "#" !== t.charAt(0) || isNaN(u = parseInt(t.substring(1), 16)) || (4 === t.length ? (r = (3840 & u) >> 4, r = r >> 4 | r, i = 240 & u, i = i >> 4 | i, o = 15 & u, o = o << 4 | o) : 7 === t.length && (r = (16711680 & u) >> 16, i = (65280 & u) >> 8, o = 255 & u)), e(r, i, o))
    }

    function Me(t, e, n) {
        var r = Math.min(t /= 255, e /= 255, n /= 255),
            i = Math.max(t, e, n),
            o = i - r,
            a, s, u = (i + r) / 2;
        return o ? (s = .5 > u ? o / (i + r) : o / (2 - i - r), a = t == i ? (e - n) / o + (n > e ? 6 : 0) : e == i ? (n - t) / o + 2 : (t - e) / o + 4, a *= 60) : (a = 0 / 0, s = u > 0 && 1 > u ? 0 : a), ie(a, s, u)
    }

    function ke(t, e, n) {
        t = Ne(t), e = Ne(e), n = Ne(n);
        var r = ge((.4124564 * t + .3575761 * e + .1804375 * n) / Fs),
            i = ge((.2126729 * t + .7151522 * e + .072175 * n) / Us),
            o = ge((.0193339 * t + .119192 * e + .9503041 * n) / Ws);
        return ce(116 * i - 16, 500 * (r - i), 200 * (i - o))
    }

    function Ne(t) {
        return (t /= 255) <= .04045 ? t / 12.92 : Math.pow((t + .055) / 1.055, 2.4)
    }

    function Ce(t) {
        var e = parseFloat(t);
        return "%" === t.charAt(t.length - 1) ? Math.round(2.55 * e) : e
    }

    function Ee(t) {
        return "function" == typeof t ? t : function() {
            return t
        }
    }

    function Se(t) {
        return t
    }

    function Te(t) {
        return function(e, n, r) {
            return 2 === arguments.length && "function" == typeof n && (r = n, n = null), Ae(e, n, t, r)
        }
    }

    function Ae(t, e, n, r) {
        function i() {
            var t = u.status,
                e;
            if (!t && u.responseText || t >= 200 && 300 > t || 304 === t) {
                try {
                    e = n.call(o, u)
                } catch (r) {
                    return void a.error.call(o, r)
                }
                a.load.call(o, e)
            } else a.error.call(o, u)
        }
        var o = {},
            a = Qa.dispatch("beforesend", "progress", "load", "error"),
            s = {},
            u = new XMLHttpRequest,
            l = null;
        return !es.XDomainRequest || "withCredentials" in u || !/^(http(s)?:)?\/\//.test(t) || (u = new XDomainRequest), "onload" in u ? u.onload = u.onerror = i : u.onreadystatechange = function() {
            u.readyState > 3 && i()
        }, u.onprogress = function(t) {
            var e = Qa.event;
            Qa.event = t;
            try {
                a.progress.call(o, u)
            } finally {
                Qa.event = e
            }
        }, o.header = function(t, e) {
            return t = (t + "").toLowerCase(), arguments.length < 2 ? s[t] : (null == e ? delete s[t] : s[t] = e + "", o)
        }, o.mimeType = function(t) {
            return arguments.length ? (e = null == t ? null : t + "", o) : e
        }, o.responseType = function(t) {
            return arguments.length ? (l = t, o) : l
        }, o.response = function(t) {
            return n = t, o
        }, ["get", "post"].forEach(function(t) {
            o[t] = function() {
                return o.send.apply(o, [t].concat(Ga(arguments)))
            }
        }), o.send = function(n, r, i) {
            if (2 === arguments.length && "function" == typeof r && (i = r, r = null), u.open(n, t, !0), null == e || "accept" in s || (s.accept = e + ",*/*"), u.setRequestHeader)
                for (var c in s) u.setRequestHeader(c, s[c]);
            return null != e && u.overrideMimeType && u.overrideMimeType(e), null != l && (u.responseType = l), null != i && o.on("error", i).on("load", function(t) {
                i(null, t)
            }), a.beforesend.call(o, u), u.send(null == r ? null : r), o
        }, o.abort = function() {
            return u.abort(), o
        }, Qa.rebind(o, a, "on"), null == r ? o : o.get($e(r))
    }

    function $e(t) {
        return 1 === t.length ? function(e, n) {
            t(null == e ? n : null)
        } : t
    }

    function Le() {
        var t = je(),
            e = De() - t;
        e > 24 ? (isFinite(e) && (clearTimeout(Gs), Gs = setTimeout(Le, e)), Ks = 0) : (Ks = 1, tu(Le))
    }

    function je() {
        var t = Date.now();
        for (Js = Xs; Js;) t >= Js.t && (Js.f = Js.c(t - Js.t)), Js = Js.n;
        return t
    }

    function De() {
        for (var t, e = Xs, n = 1 / 0; e;) e.f ? e = t ? t.n = e.n : Xs = e.n : (e.t < n && (n = e.t), e = (t = e).n);
        return Qs = t, n
    }

    function qe(t, e) {
        return e - (t ? Math.ceil(Math.log(t) / Math.LN10) : 1)
    }

    function Re(t, e) {
        var n = Math.pow(10, 3 * cs(8 - e));
        return {
            scale: e > 8 ? function(t) {
                return t / n
            } : function(t) {
                return t * n
            },
            symbol: t
        }
    }

    function ze(t) {
        var e = t.decimal,
            n = t.thousands,
            r = t.grouping,
            i = t.currency,
            o = r ? function(t) {
                for (var e = t.length, i = [], o = 0, a = r[0]; e > 0 && a > 0;) i.push(t.substring(e -= a, e + a)), a = r[o = (o + 1) % r.length];
                return i.reverse().join(n)
            } : Se;
        return function(t) {
            var n = nu.exec(t),
                r = n[1] || " ",
                a = n[2] || ">",
                s = n[3] || "",
                u = n[4] || "",
                l = n[5],
                c = +n[6],
                f = n[7],
                h = n[8],
                d = n[9],
                p = 1,
                g = "",
                m = "",
                v = !1;
            switch (h && (h = +h.substring(1)), (l || "0" === r && "=" === a) && (l = r = "0", a = "=", f && (c -= Math.floor((c - 1) / 4))), d) {
                case "n":
                    f = !0, d = "g";
                    break;
                case "%":
                    p = 100, m = "%", d = "f";
                    break;
                case "p":
                    p = 100, m = "%", d = "r";
                    break;
                case "b":
                case "o":
                case "x":
                case "X":
                    "#" === u && (g = "0" + d.toLowerCase());
                case "c":
                case "d":
                    v = !0, h = 0;
                    break;
                case "s":
                    p = -1, d = "r"
            }
            "$" === u && (g = i[0], m = i[1]), "r" != d || h || (d = "g"), null != h && ("g" == d ? h = Math.max(1, Math.min(21, h)) : ("e" == d || "f" == d) && (h = Math.max(0, Math.min(20, h)))), d = ru.get(d) || Ie;
            var y = l && f;
            return function(t) {
                var n = m;
                if (v && t % 1) return "";
                var i = 0 > t || 0 === t && 0 > 1 / t ? (t = -t, "-") : s;
                if (0 > p) {
                    var u = Qa.formatPrefix(t, h);
                    t = u.scale(t), n = u.symbol + m
                } else t *= p;
                t = d(t, h);
                var b = t.lastIndexOf("."),
                    x = 0 > b ? t : t.substring(0, b),
                    w = 0 > b ? "" : e + t.substring(b + 1);
                !l && f && (x = o(x));
                var _ = g.length + x.length + w.length + (y ? 0 : i.length),
                    M = c > _ ? new Array(_ = c - _ + 1).join(r) : "";
                return y && (x = o(M + x)), i += g, t = x + w, ("<" === a ? i + t + M : ">" === a ? M + i + t : "^" === a ? M.substring(0, _ >>= 1) + i + t + M.substring(_) : i + (y ? t : M + t)) + n
            }
        }
    }

    function Ie(t) {
        return t + ""
    }

    function Be() {
        this._ = new Date(arguments.length > 1 ? Date.UTC.apply(this, arguments) : arguments[0])
    }

    function Oe(t, e, n) {
        function r(e) {
            var n = t(e),
                r = o(n, 1);
            return r - e > e - n ? n : r
        }

        function i(n) {
            return e(n = t(new ou(n - 1)), 1), n
        }

        function o(t, n) {
            return e(t = new ou(+t), n), t
        }

        function a(t, r, o) {
            var a = i(t),
                s = [];
            if (o > 1)
                for (; r > a;) n(a) % o || s.push(new Date(+a)), e(a, 1);
            else
                for (; r > a;) s.push(new Date(+a)), e(a, 1);
            return s
        }

        function s(t, e, n) {
            try {
                ou = Be;
                var r = new Be;
                return r._ = t, a(r, e, n)
            } finally {
                ou = Date
            }
        }
        t.floor = t, t.round = r, t.ceil = i, t.offset = o, t.range = a;
        var u = t.utc = Pe(t);
        return u.floor = u, u.round = Pe(r), u.ceil = Pe(i), u.offset = Pe(o), u.range = s, t
    }

    function Pe(t) {
        return function(e, n) {
            try {
                ou = Be;
                var r = new Be;
                return r._ = e, t(r, n)._
            } finally {
                ou = Date
            }
        }
    }

    function He(t) {
        function e(t) {
            function e(e) {
                for (var n = [], i = -1, o = 0, a, s, u; ++i < r;) 37 === t.charCodeAt(i) && (n.push(t.substring(o, i)), null != (s = su[a = t.charAt(++i)]) && (a = t.charAt(++i)), (u = S[a]) && (a = u(e, null == s ? "e" === a ? " " : "0" : s)), n.push(a), o = i + 1);
                return n.push(t.substring(o, i)), n.join("")
            }
            var r = t.length;
            return e.parse = function(e) {
                var r = {
                        y: 1900,
                        m: 0,
                        d: 1,
                        H: 0,
                        M: 0,
                        S: 0,
                        L: 0,
                        Z: null
                    },
                    i = n(r, t, e, 0);
                if (i != e.length) return null;
                "p" in r && (r.H = r.H % 12 + 12 * r.p);
                var o = null != r.Z && ou !== Be,
                    a = new(o ? Be : ou);
                return "j" in r ? a.setFullYear(r.y, 0, r.j) : "w" in r && ("W" in r || "U" in r) ? (a.setFullYear(r.y, 0, 1), a.setFullYear(r.y, 0, "W" in r ? (r.w + 6) % 7 + 7 * r.W - (a.getDay() + 5) % 7 : r.w + 7 * r.U - (a.getDay() + 6) % 7)) : a.setFullYear(r.y, r.m, r.d), a.setHours(r.H + Math.floor(r.Z / 100), r.M + r.Z % 100, r.S, r.L), o ? a._ : a
            }, e.toString = function() {
                return t
            }, e
        }

        function n(t, e, n, r) {
            for (var i, o, a, s = 0, u = e.length, l = n.length; u > s;) {
                if (r >= l) return -1;
                if (i = e.charCodeAt(s++), 37 === i) {
                    if (a = e.charAt(s++), o = T[a in su ? e.charAt(s++) : a], !o || (r = o(t, n, r)) < 0) return -1
                } else if (i != n.charCodeAt(r++)) return -1
            }
            return r
        }

        function r(t, e, n) {
            _.lastIndex = 0;
            var r = _.exec(e.substring(n));
            return r ? (t.w = M.get(r[0].toLowerCase()), n + r[0].length) : -1
        }

        function i(t, e, n) {
            x.lastIndex = 0;
            var r = x.exec(e.substring(n));
            return r ? (t.w = w.get(r[0].toLowerCase()), n + r[0].length) : -1
        }

        function o(t, e, n) {
            C.lastIndex = 0;
            var r = C.exec(e.substring(n));
            return r ? (t.m = E.get(r[0].toLowerCase()), n + r[0].length) : -1
        }

        function a(t, e, n) {
            k.lastIndex = 0;
            var r = k.exec(e.substring(n));
            return r ? (t.m = N.get(r[0].toLowerCase()), n + r[0].length) : -1
        }

        function s(t, e, r) {
            return n(t, S.c.toString(), e, r)
        }

        function u(t, e, r) {
            return n(t, S.x.toString(), e, r)
        }

        function l(t, e, r) {
            return n(t, S.X.toString(), e, r)
        }

        function c(t, e, n) {
            var r = b.get(e.substring(n, n += 2).toLowerCase());
            return null == r ? -1 : (t.p = r, n)
        }
        var f = t.dateTime,
            h = t.date,
            d = t.time,
            p = t.periods,
            g = t.days,
            m = t.shortDays,
            v = t.months,
            y = t.shortMonths;
        e.utc = function(t) {
            function n(t) {
                try {
                    ou = Be;
                    var e = new ou;
                    return e._ = t, r(e)
                } finally {
                    ou = Date
                }
            }
            var r = e(t);
            return n.parse = function(t) {
                try {
                    ou = Be;
                    var e = r.parse(t);
                    return e && e._
                } finally {
                    ou = Date
                }
            }, n.toString = r.toString, n
        }, e.multi = e.utc.multi = ln;
        var b = Qa.map(),
            x = Ue(g),
            w = We(g),
            _ = Ue(m),
            M = We(m),
            k = Ue(v),
            N = We(v),
            C = Ue(y),
            E = We(y);
        p.forEach(function(t, e) {
            b.set(t.toLowerCase(), e)
        });
        var S = {
                a: function(t) {
                    return m[t.getDay()]
                },
                A: function(t) {
                    return g[t.getDay()]
                },
                b: function(t) {
                    return y[t.getMonth()]
                },
                B: function(t) {
                    return v[t.getMonth()]
                },
                c: e(f),
                d: function(t, e) {
                    return Fe(t.getDate(), e, 2)
                },
                e: function(t, e) {
                    return Fe(t.getDate(), e, 2)
                },
                H: function(t, e) {
                    return Fe(t.getHours(), e, 2)
                },
                I: function(t, e) {
                    return Fe(t.getHours() % 12 || 12, e, 2)
                },
                j: function(t, e) {
                    return Fe(1 + iu.dayOfYear(t), e, 3)
                },
                L: function(t, e) {
                    return Fe(t.getMilliseconds(), e, 3)
                },
                m: function(t, e) {
                    return Fe(t.getMonth() + 1, e, 2)
                },
                M: function(t, e) {
                    return Fe(t.getMinutes(), e, 2)
                },
                p: function(t) {
                    return p[+(t.getHours() >= 12)]
                },
                S: function(t, e) {
                    return Fe(t.getSeconds(), e, 2)
                },
                U: function(t, e) {
                    return Fe(iu.sundayOfYear(t), e, 2)
                },
                w: function(t) {
                    return t.getDay()
                },
                W: function(t, e) {
                    return Fe(iu.mondayOfYear(t), e, 2)
                },
                x: e(h),
                X: e(d),
                y: function(t, e) {
                    return Fe(t.getFullYear() % 100, e, 2)
                },
                Y: function(t, e) {
                    return Fe(t.getFullYear() % 1e4, e, 4)
                },
                Z: sn,
                "%": function() {
                    return "%"
                }
            },
            T = {
                a: r,
                A: i,
                b: o,
                B: a,
                c: s,
                d: tn,
                e: tn,
                H: nn,
                I: nn,
                j: en,
                L: an,
                m: Je,
                M: rn,
                p: c,
                S: on,
                U: Ze,
                w: Ve,
                W: Ye,
                x: u,
                X: l,
                y: Qe,
                Y: Xe,
                Z: Ke,
                "%": un
            };
        return e
    }

    function Fe(t, e, n) {
        var r = 0 > t ? "-" : "",
            i = (r ? -t : t) + "",
            o = i.length;
        return r + (n > o ? new Array(n - o + 1).join(e) + i : i)
    }

    function Ue(t) {
        return new RegExp("^(?:" + t.map(Qa.requote).join("|") + ")", "i")
    }

    function We(t) {
        for (var e = new a, n = -1, r = t.length; ++n < r;) e.set(t[n].toLowerCase(), n);
        return e
    }

    function Ve(t, e, n) {
        uu.lastIndex = 0;
        var r = uu.exec(e.substring(n, n + 1));
        return r ? (t.w = +r[0], n + r[0].length) : -1
    }

    function Ze(t, e, n) {
        uu.lastIndex = 0;
        var r = uu.exec(e.substring(n));
        return r ? (t.U = +r[0], n + r[0].length) : -1
    }

    function Ye(t, e, n) {
        uu.lastIndex = 0;
        var r = uu.exec(e.substring(n));
        return r ? (t.W = +r[0], n + r[0].length) : -1
    }

    function Xe(t, e, n) {
        uu.lastIndex = 0;
        var r = uu.exec(e.substring(n, n + 4));
        return r ? (t.y = +r[0], n + r[0].length) : -1
    }

    function Qe(t, e, n) {
        uu.lastIndex = 0;
        var r = uu.exec(e.substring(n, n + 2));
        return r ? (t.y = Ge(+r[0]), n + r[0].length) : -1
    }

    function Ke(t, e, n) {
        return /^[+-]\d{4}$/.test(e = e.substring(n, n + 5)) ? (t.Z = -e, n + 5) : -1
    }

    function Ge(t) {
        return t + (t > 68 ? 1900 : 2e3)
    }

    function Je(t, e, n) {
        uu.lastIndex = 0;
        var r = uu.exec(e.substring(n, n + 2));
        return r ? (t.m = r[0] - 1, n + r[0].length) : -1
    }

    function tn(t, e, n) {
        uu.lastIndex = 0;
        var r = uu.exec(e.substring(n, n + 2));
        return r ? (t.d = +r[0], n + r[0].length) : -1
    }

    function en(t, e, n) {
        uu.lastIndex = 0;
        var r = uu.exec(e.substring(n, n + 3));
        return r ? (t.j = +r[0], n + r[0].length) : -1
    }

    function nn(t, e, n) {
        uu.lastIndex = 0;
        var r = uu.exec(e.substring(n, n + 2));
        return r ? (t.H = +r[0], n + r[0].length) : -1
    }

    function rn(t, e, n) {
        uu.lastIndex = 0;
        var r = uu.exec(e.substring(n, n + 2));
        return r ? (t.M = +r[0], n + r[0].length) : -1
    }

    function on(t, e, n) {
        uu.lastIndex = 0;
        var r = uu.exec(e.substring(n, n + 2));
        return r ? (t.S = +r[0], n + r[0].length) : -1
    }

    function an(t, e, n) {
        uu.lastIndex = 0;
        var r = uu.exec(e.substring(n, n + 3));
        return r ? (t.L = +r[0], n + r[0].length) : -1
    }

    function sn(t) {
        var e = t.getTimezoneOffset(),
            n = e > 0 ? "-" : "+",
            r = ~~(cs(e) / 60),
            i = cs(e) % 60;
        return n + Fe(r, "0", 2) + Fe(i, "0", 2)
    }

    function un(t, e, n) {
        lu.lastIndex = 0;
        var r = lu.exec(e.substring(n, n + 1));
        return r ? n + r[0].length : -1
    }

    function ln(t) {
        for (var e = t.length, n = -1; ++n < e;) t[n][0] = this(t[n][0]);
        return function(e) {
            for (var n = 0, r = t[n]; !r[1](e);) r = t[++n];
            return r[0](e)
        }
    }

    function cn() {}

    function fn(t, e, n) {
        var r = n.s = t + e,
            i = r - t,
            o = r - i;
        n.t = t - o + (e - i)
    }

    function hn(t, e) {
        t && du.hasOwnProperty(t.type) && du[t.type](t, e)
    }

    function dn(t, e, n) {
        var r = -1,
            i = t.length - n,
            o;
        for (e.lineStart(); ++r < i;) o = t[r], e.point(o[0], o[1], o[2]);
        e.lineEnd()
    }

    function pn(t, e) {
        var n = -1,
            r = t.length;
        for (e.polygonStart(); ++n < r;) dn(t[n], e, 1);
        e.polygonEnd()
    }

    function gn() {
        function t(t, e) {
            t *= Ls, e = e * Ls / 2 + Es / 4;
            var n = t - r,
                a = n >= 0 ? 1 : -1,
                s = a * n,
                u = Math.cos(e),
                l = Math.sin(e),
                c = o * l,
                f = i * u + c * Math.cos(s),
                h = c * a * Math.sin(s);
            gu.add(Math.atan2(h, f)), r = t, i = u, o = l
        }
        var e, n, r, i, o;
        mu.point = function(a, s) {
            mu.point = t, r = (e = a) * Ls, i = Math.cos(s = (n = s) * Ls / 2 + Es / 4), o = Math.sin(s)
        }, mu.lineEnd = function() {
            t(e, n)
        }
    }

    function mn(t) {
        var e = t[0],
            n = t[1],
            r = Math.cos(n);
        return [r * Math.cos(e), r * Math.sin(e), Math.sin(n)]
    }

    function vn(t, e) {
        return t[0] * e[0] + t[1] * e[1] + t[2] * e[2]
    }

    function yn(t, e) {
        return [t[1] * e[2] - t[2] * e[1], t[2] * e[0] - t[0] * e[2], t[0] * e[1] - t[1] * e[0]]
    }

    function bn(t, e) {
        t[0] += e[0], t[1] += e[1], t[2] += e[2]
    }

    function xn(t, e) {
        return [t[0] * e, t[1] * e, t[2] * e]
    }

    function wn(t) {
        var e = Math.sqrt(t[0] * t[0] + t[1] * t[1] + t[2] * t[2]);
        t[0] /= e, t[1] /= e, t[2] /= e
    }

    function _n(t) {
        return [Math.atan2(t[1], t[0]), G(t[2])]
    }

    function Mn(t, e) {
        return cs(t[0] - e[0]) < As && cs(t[1] - e[1]) < As
    }

    function kn(t, e) {
        t *= Ls;
        var n = Math.cos(e *= Ls);
        Nn(n * Math.cos(t), n * Math.sin(t), Math.sin(e))
    }

    function Nn(t, e, n) {
        ++vu, bu += (t - bu) / vu, xu += (e - xu) / vu, wu += (n - wu) / vu
    }

    function Cn() {
        function t(t, i) {
            t *= Ls;
            var o = Math.cos(i *= Ls),
                a = o * Math.cos(t),
                s = o * Math.sin(t),
                u = Math.sin(i),
                l = Math.atan2(Math.sqrt((l = n * u - r * s) * l + (l = r * a - e * u) * l + (l = e * s - n * a) * l), e * a + n * s + r * u);
            yu += l, _u += l * (e + (e = a)), Mu += l * (n + (n = s)), ku += l * (r + (r = u)), Nn(e, n, r)
        }
        var e, n, r;
        Su.point = function(i, o) {
            i *= Ls;
            var a = Math.cos(o *= Ls);
            e = a * Math.cos(i), n = a * Math.sin(i), r = Math.sin(o), Su.point = t, Nn(e, n, r)
        }
    }

    function En() {
        Su.point = kn
    }

    function Sn() {
        function t(t, e) {
            t *= Ls;
            var n = Math.cos(e *= Ls),
                a = n * Math.cos(t),
                s = n * Math.sin(t),
                u = Math.sin(e),
                l = i * u - o * s,
                c = o * a - r * u,
                f = r * s - i * a,
                h = Math.sqrt(l * l + c * c + f * f),
                d = r * a + i * s + o * u,
                p = h && -K(d) / h,
                g = Math.atan2(h, d);
            Nu += p * l, Cu += p * c, Eu += p * f, yu += g, _u += g * (r + (r = a)), Mu += g * (i + (i = s)), ku += g * (o + (o = u)), Nn(r, i, o)
        }
        var e, n, r, i, o;
        Su.point = function(a, s) {
            e = a, n = s, Su.point = t, a *= Ls;
            var u = Math.cos(s *= Ls);
            r = u * Math.cos(a), i = u * Math.sin(a), o = Math.sin(s), Nn(r, i, o)
        }, Su.lineEnd = function() {
            t(e, n), Su.lineEnd = En, Su.point = kn
        }
    }

    function Tn() {
        return !0
    }

    function An(t, e, n, r, i) {
        var o = [],
            a = [];
        if (t.forEach(function(t) {
                if (!((e = t.length - 1) <= 0)) {
                    var e, n = t[0],
                        r = t[e];
                    if (Mn(n, r)) {
                        i.lineStart();
                        for (var s = 0; e > s; ++s) i.point((n = t[s])[0], n[1]);
                        return void i.lineEnd()
                    }
                    var u = new Ln(n, t, null, !0),
                        l = new Ln(n, null, u, !1);
                    u.o = l, o.push(u), a.push(l), u = new Ln(r, t, null, !1), l = new Ln(r, null, u, !0), u.o = l, o.push(u), a.push(l)
                }
            }), a.sort(e), $n(o), $n(a), o.length) {
            for (var s = 0, u = n, l = a.length; l > s; ++s) a[s].e = u = !u;
            for (var c = o[0], f, h;;) {
                for (var d = c, p = !0; d.v;)
                    if ((d = d.n) === c) return;
                f = d.z, i.lineStart();
                do {
                    if (d.v = d.o.v = !0, d.e) {
                        if (p)
                            for (var s = 0, l = f.length; l > s; ++s) i.point((h = f[s])[0], h[1]);
                        else r(d.x, d.n.x, 1, i);
                        d = d.n
                    } else {
                        if (p) {
                            f = d.p.z;
                            for (var s = f.length - 1; s >= 0; --s) i.point((h = f[s])[0], h[1])
                        } else r(d.x, d.p.x, -1, i);
                        d = d.p
                    }
                    d = d.o, f = d.z, p = !p
                } while (!d.v);
                i.lineEnd()
            }
        }
    }

    function $n(t) {
        if (e = t.length) {
            for (var e, n = 0, r = t[0], i; ++n < e;) r.n = i = t[n], i.p = r, r = i;
            r.n = i = t[0], i.p = r
        }
    }

    function Ln(t, e, n, r) {
        this.x = t, this.z = e, this.o = n, this.e = r, this.v = !1, this.n = this.p = null
    }

    function jn(t, e, n, r) {
        return function(i, o) {
            function a(e, n) {
                var r = i(e, n);
                t(e = r[0], n = r[1]) && o.point(e, n)
            }

            function s(t, e) {
                var n = i(t, e);
                d.point(n[0], n[1])
            }

            function u() {
                g.point = s, d.lineStart()
            }

            function l() {
                g.point = a, d.lineEnd()
            }

            function c(t, e) {
                w.push([t, e]);
                var n = i(t, e);
                y.point(n[0], n[1])
            }

            function f() {
                y.lineStart(), w = []
            }

            function h() {
                c(w[0][0], w[0][1]), y.lineEnd();
                var t = y.clean(),
                    e = v.buffer(),
                    n, r = e.length;
                if (w.pop(), x.push(w), w = null, r)
                    if (1 & t) {
                        n = e[0];
                        var r = n.length - 1,
                            i = -1,
                            a;
                        if (r > 0) {
                            for (b || (o.polygonStart(), b = !0), o.lineStart(); ++i < r;) o.point((a = n[i])[0], a[1]);
                            o.lineEnd()
                        }
                    } else r > 1 && 2 & t && e.push(e.pop().concat(e.shift())), m.push(e.filter(Dn))
            }
            var d = e(o),
                p = i.invert(r[0], r[1]),
                g = {
                    point: a,
                    lineStart: u,
                    lineEnd: l,
                    polygonStart: function() {
                        g.point = c, g.lineStart = f, g.lineEnd = h, m = [], x = []
                    },
                    polygonEnd: function() {
                        g.point = a, g.lineStart = u, g.lineEnd = l, m = Qa.merge(m);
                        var t = zn(p, x);
                        m.length ? (b || (o.polygonStart(), b = !0), An(m, Rn, t, n, o)) : t && (b || (o.polygonStart(), b = !0), o.lineStart(), n(null, null, 1, o), o.lineEnd()), b && (o.polygonEnd(), b = !1), m = x = null
                    },
                    sphere: function() {
                        o.polygonStart(), o.lineStart(), n(null, null, 1, o), o.lineEnd(), o.polygonEnd()
                    }
                },
                m, v = qn(),
                y = e(v),
                b = !1,
                x, w;
            return g
        }
    }

    function Dn(t) {
        return t.length > 1
    }

    function qn() {
        var t = [],
            e;
        return {
            lineStart: function() {
                t.push(e = [])
            },
            point: function(t, n) {
                e.push([t, n])
            },
            lineEnd: g,
            buffer: function() {
                var n = t;
                return t = [], e = null, n
            },
            rejoin: function() {
                t.length > 1 && t.push(t.pop().concat(t.shift()))
            }
        }
    }

    function Rn(t, e) {
        return ((t = t.x)[0] < 0 ? t[1] - Ts - As : Ts - t[1]) - ((e = e.x)[0] < 0 ? e[1] - Ts - As : Ts - e[1])
    }

    function zn(t, e) {
        var n = t[0],
            r = t[1],
            i = [Math.sin(n), -Math.cos(n), 0],
            o = 0,
            a = 0;
        gu.reset();
        for (var s = 0, u = e.length; u > s; ++s) {
            var l = e[s],
                c = l.length;
            if (c)
                for (var f = l[0], h = f[0], d = f[1] / 2 + Es / 4, p = Math.sin(d), g = Math.cos(d), m = 1;;) {
                    m === c && (m = 0), t = l[m];
                    var v = t[0],
                        y = t[1] / 2 + Es / 4,
                        b = Math.sin(y),
                        x = Math.cos(y),
                        w = v - h,
                        _ = w >= 0 ? 1 : -1,
                        M = _ * w,
                        k = M > Es,
                        N = p * b;
                    if (gu.add(Math.atan2(N * _ * Math.sin(M), g * x + N * Math.cos(M))), o += k ? w + _ * Ss : w, k ^ h >= n ^ v >= n) {
                        var C = yn(mn(f), mn(t));
                        wn(C);
                        var E = yn(i, C);
                        wn(E);
                        var S = (k ^ w >= 0 ? -1 : 1) * G(E[2]);
                        (r > S || r === S && (C[0] || C[1])) && (a += k ^ w >= 0 ? 1 : -1)
                    }
                    if (!m++) break;
                    h = v, p = b, g = x, f = t
                }
        }
        return (-As > o || As > o && 0 > gu) ^ 1 & a
    }

    function In(t) {
        var e = 0 / 0,
            n = 0 / 0,
            r = 0 / 0,
            i;
        return {
            lineStart: function() {
                t.lineStart(), i = 1
            },
            point: function(o, a) {
                var s = o > 0 ? Es : -Es,
                    u = cs(o - e);
                cs(u - Es) < As ? (t.point(e, n = (n + a) / 2 > 0 ? Ts : -Ts), t.point(r, n), t.lineEnd(), t.lineStart(), t.point(s, n), t.point(o, n), i = 0) : r !== s && u >= Es && (cs(e - r) < As && (e -= r * As), cs(o - s) < As && (o -= s * As), n = Bn(e, n, o, a), t.point(r, n), t.lineEnd(), t.lineStart(), t.point(s, n), i = 0), t.point(e = o, n = a), r = s
            },
            lineEnd: function() {
                t.lineEnd(), e = n = 0 / 0
            },
            clean: function() {
                return 2 - i
            }
        }
    }

    function Bn(t, e, n, r) {
        var i, o, a = Math.sin(t - n);
        return cs(a) > As ? Math.atan((Math.sin(e) * (o = Math.cos(r)) * Math.sin(n) - Math.sin(r) * (i = Math.cos(e)) * Math.sin(t)) / (i * o * a)) : (e + r) / 2
    }

    function On(t, e, n, r) {
        var i;
        if (null == t) i = n * Ts, r.point(-Es, i), r.point(0, i), r.point(Es, i), r.point(Es, 0), r.point(Es, -i), r.point(0, -i), r.point(-Es, -i), r.point(-Es, 0), r.point(-Es, i);
        else if (cs(t[0] - e[0]) > As) {
            var o = t[0] < e[0] ? Es : -Es;
            i = n * o / 2, r.point(-o, i), r.point(0, i), r.point(o, i)
        } else r.point(e[0], e[1])
    }

    function Pn(t) {
        function e(t, e) {
            return Math.cos(t) * Math.cos(e) > o
        }

        function n(t) {
            var n, o, u, l, c;
            return {
                lineStart: function() {
                    l = u = !1, c = 1
                },
                point: function(f, h) {
                    var d = [f, h],
                        p, g = e(f, h),
                        m = a ? g ? 0 : i(f, h) : g ? i(f + (0 > f ? Es : -Es), h) : 0;
                    if (!n && (l = u = g) && t.lineStart(), g !== u && (p = r(n, d), (Mn(n, p) || Mn(d, p)) && (d[0] += As, d[1] += As, g = e(d[0], d[1]))), g !== u) c = 0, g ? (t.lineStart(), p = r(d, n), t.point(p[0], p[1])) : (p = r(n, d), t.point(p[0], p[1]), t.lineEnd()), n = p;
                    else if (s && n && a ^ g) {
                        var v;
                        m & o || !(v = r(d, n, !0)) || (c = 0, a ? (t.lineStart(), t.point(v[0][0], v[0][1]), t.point(v[1][0], v[1][1]), t.lineEnd()) : (t.point(v[1][0], v[1][1]), t.lineEnd(), t.lineStart(), t.point(v[0][0], v[0][1])))
                    }!g || n && Mn(n, d) || t.point(d[0], d[1]), n = d, u = g, o = m
                },
                lineEnd: function() {
                    u && t.lineEnd(), n = null
                },
                clean: function() {
                    return c | (l && u) << 1
                }
            }
        }

        function r(t, e, n) {
            var r = mn(t),
                i = mn(e),
                a = [1, 0, 0],
                s = yn(r, i),
                u = vn(s, s),
                l = s[0],
                c = u - l * l;
            if (!c) return !n && t;
            var f = o * u / c,
                h = -o * l / c,
                d = yn(a, s),
                p = xn(a, f),
                g = xn(s, h);
            bn(p, g);
            var m = d,
                v = vn(p, m),
                y = vn(m, m),
                b = v * v - y * (vn(p, p) - 1);
            if (!(0 > b)) {
                var x = Math.sqrt(b),
                    w = xn(m, (-v - x) / y);
                if (bn(w, p), w = _n(w), !n) return w;
                var _ = t[0],
                    M = e[0],
                    k = t[1],
                    N = e[1],
                    C;
                _ > M && (C = _, _ = M, M = C);
                var E = M - _,
                    S = cs(E - Es) < As,
                    T = S || As > E;
                if (!S && k > N && (C = k, k = N, N = C), T ? S ? k + N > 0 ^ w[1] < (cs(w[0] - _) < As ? k : N) : k <= w[1] && w[1] <= N : E > Es ^ (_ <= w[0] && w[0] <= M)) {
                    var A = xn(m, (-v + x) / y);
                    return bn(A, p), [w, _n(A)]
                }
            }
        }

        function i(e, n) {
            var r = a ? t : Es - t,
                i = 0;
            return -r > e ? i |= 1 : e > r && (i |= 2), -r > n ? i |= 4 : n > r && (i |= 8), i
        }
        var o = Math.cos(t),
            a = o > 0,
            s = cs(o) > As,
            u = gr(t, 6 * Ls);
        return jn(e, n, u, a ? [0, -t] : [-Es, t - Es])
    }

    function Hn(t, e, n, r) {
        return function(i) {
            var o = i.a,
                a = i.b,
                s = o.x,
                u = o.y,
                l = a.x,
                c = a.y,
                f = 0,
                h = 1,
                d = l - s,
                p = c - u,
                g;
            if (g = t - s, d || !(g > 0)) {
                if (g /= d, 0 > d) {
                    if (f > g) return;
                    h > g && (h = g)
                } else if (d > 0) {
                    if (g > h) return;
                    g > f && (f = g)
                }
                if (g = n - s, d || !(0 > g)) {
                    if (g /= d, 0 > d) {
                        if (g > h) return;
                        g > f && (f = g)
                    } else if (d > 0) {
                        if (f > g) return;
                        h > g && (h = g)
                    }
                    if (g = e - u, p || !(g > 0)) {
                        if (g /= p, 0 > p) {
                            if (f > g) return;
                            h > g && (h = g)
                        } else if (p > 0) {
                            if (g > h) return;
                            g > f && (f = g)
                        }
                        if (g = r - u, p || !(0 > g)) {
                            if (g /= p, 0 > p) {
                                if (g > h) return;
                                g > f && (f = g)
                            } else if (p > 0) {
                                if (f > g) return;
                                h > g && (h = g)
                            }
                            return f > 0 && (i.a = {
                                x: s + f * d,
                                y: u + f * p
                            }), 1 > h && (i.b = {
                                x: s + h * d,
                                y: u + h * p
                            }), i
                        }
                    }
                }
            }
        }
    }

    function Fn(t, e, n, r) {
        function i(r, i) {
            return cs(r[0] - t) < As ? i > 0 ? 0 : 3 : cs(r[0] - n) < As ? i > 0 ? 2 : 1 : cs(r[1] - e) < As ? i > 0 ? 1 : 0 : i > 0 ? 3 : 2
        }

        function o(t, e) {
            return a(t.x, e.x)
        }

        function a(t, e) {
            var n = i(t, 1),
                r = i(e, 1);
            return n !== r ? n - r : 0 === n ? e[1] - t[1] : 1 === n ? t[0] - e[0] : 2 === n ? t[1] - e[1] : e[0] - t[0]
        }
        return function(s) {
            function u(t) {
                for (var e = 0, n = b.length, r = t[1], i = 0; n > i; ++i)
                    for (var o = 1, a = b[i], s = a.length, u = a[0], l; s > o; ++o) l = a[o], u[1] <= r ? l[1] > r && Q(u, l, t) > 0 && ++e : l[1] <= r && Q(u, l, t) < 0 && --e, u = l;
                return 0 !== e
            }

            function l(o, s, u, l) {
                var c = 0,
                    f = 0;
                if (null == o || (c = i(o, u)) !== (f = i(s, u)) || a(o, s) < 0 ^ u > 0) {
                    do l.point(0 === c || 3 === c ? t : n, c > 1 ? r : e); while ((c = (c + u + 4) % 4) !== f)
                } else l.point(s[0], s[1])
            }

            function c(i, o) {
                return i >= t && n >= i && o >= e && r >= o
            }

            function f(t, e) {
                c(t, e) && s.point(t, e)
            }

            function h() {
                w.point = p, b && b.push(x = []), S = !0, E = !1, N = C = 0 / 0
            }

            function d() {
                y && (p(_, M), k && E && m.rejoin(), y.push(m.buffer())), w.point = f, E && s.lineEnd()
            }

            function p(t, e) {
                t = Math.max(-Au, Math.min(Au, t)), e = Math.max(-Au, Math.min(Au, e));
                var n = c(t, e);
                if (b && x.push([t, e]), S) _ = t, M = e, k = n, S = !1, n && (s.lineStart(), s.point(t, e));
                else if (n && E) s.point(t, e);
                else {
                    var r = {
                        a: {
                            x: N,
                            y: C
                        },
                        b: {
                            x: t,
                            y: e
                        }
                    };
                    v(r) ? (E || (s.lineStart(), s.point(r.a.x, r.a.y)), s.point(r.b.x, r.b.y), n || s.lineEnd(), T = !1) : n && (s.lineStart(), s.point(t, e), T = !1)
                }
                N = t, C = e, E = n
            }
            var g = s,
                m = qn(),
                v = Hn(t, e, n, r),
                y, b, x, w = {
                    point: f,
                    lineStart: h,
                    lineEnd: d,
                    polygonStart: function() {
                        s = m, y = [], b = [], T = !0
                    },
                    polygonEnd: function() {
                        s = g, y = Qa.merge(y);
                        var e = u([t, r]),
                            n = T && e,
                            i = y.length;
                        (n || i) && (s.polygonStart(), n && (s.lineStart(), l(null, null, 1, s), s.lineEnd()), i && An(y, o, e, l, s), s.polygonEnd()), y = b = x = null
                    }
                },
                _, M, k, N, C, E, S, T;
            return w
        }
    }

    function Un(t, e) {
        function n(n, r) {
            return n = t(n, r), e(n[0], n[1])
        }
        return t.invert && e.invert && (n.invert = function(n, r) {
            return n = e.invert(n, r), n && t.invert(n[0], n[1])
        }), n
    }

    function Wn(t) {
        var e = 0,
            n = Es / 3,
            r = sr(t),
            i = r(e, n);
        return i.parallels = function(t) {
            return arguments.length ? r(e = t[0] * Es / 180, n = t[1] * Es / 180) : [e / Es * 180, n / Es * 180]
        }, i
    }

    function Vn(t, e) {
        function n(t, e) {
            var n = Math.sqrt(o - 2 * i * Math.sin(e)) / i;
            return [n * Math.sin(t *= i), a - n * Math.cos(t)]
        }
        var r = Math.sin(t),
            i = (r + Math.sin(e)) / 2,
            o = 1 + r * (2 * i - r),
            a = Math.sqrt(o) / i;
        return n.invert = function(t, e) {
            var n = a - e;
            return [Math.atan2(t, n) / i, G((o - (t * t + n * n) * i * i) / (2 * i))]
        }, n
    }

    function Zn() {
        function t(t, e) {
            Lu += i * t - r * e, r = t, i = e
        }
        var e, n, r, i;
        ju.point = function(o, a) {
            ju.point = t, e = r = o, n = i = a
        }, ju.lineEnd = function() {
            t(e, n)
        }
    }

    function Yn(t, e) {
        Du > t && (Du = t), t > Ru && (Ru = t), qu > e && (qu = e), e > zu && (zu = e)
    }

    function Xn() {
        function t(t, e) {
            a.push("M", t, ",", e, o)
        }

        function e(t, e) {
            a.push("M", t, ",", e), s.point = n
        }

        function n(t, e) {
            a.push("L", t, ",", e)
        }

        function r() {
            s.point = t
        }

        function i() {
            a.push("Z")
        }
        var o = Qn(4.5),
            a = [],
            s = {
                point: t,
                lineStart: function() {
                    s.point = e
                },
                lineEnd: r,
                polygonStart: function() {
                    s.lineEnd = i
                },
                polygonEnd: function() {
                    s.lineEnd = r, s.point = t
                },
                pointRadius: function(t) {
                    return o = Qn(t), s
                },
                result: function() {
                    if (a.length) {
                        var t = a.join("");
                        return a = [], t
                    }
                }
            };
        return s
    }

    function Qn(t) {
        return "m0," + t + "a" + t + "," + t + " 0 1,1 0," + -2 * t + "a" + t + "," + t + " 0 1,1 0," + 2 * t + "z"
    }

    function Kn(t, e) {
        bu += t, xu += e, ++wu
    }

    function Gn() {
        function t(t, r) {
            var i = t - e,
                o = r - n,
                a = Math.sqrt(i * i + o * o);
            _u += a * (e + t) / 2, Mu += a * (n + r) / 2, ku += a, Kn(e = t, n = r)
        }
        var e, n;
        Bu.point = function(r, i) {
            Bu.point = t, Kn(e = r, n = i)
        }
    }

    function Jn() {
        Bu.point = Kn
    }

    function tr() {
        function t(t, e) {
            var n = t - r,
                o = e - i,
                a = Math.sqrt(n * n + o * o);
            _u += a * (r + t) / 2, Mu += a * (i + e) / 2, ku += a, a = i * t - r * e, Nu += a * (r + t), Cu += a * (i + e), Eu += 3 * a, Kn(r = t, i = e)
        }
        var e, n, r, i;
        Bu.point = function(o, a) {
            Bu.point = t, Kn(e = r = o, n = i = a)
        }, Bu.lineEnd = function() {
            t(e, n)
        }
    }

    function er(t) {
        function e(e, n) {
            t.moveTo(e, n), t.arc(e, n, a, 0, Ss)
        }

        function n(e, n) {
            t.moveTo(e, n), s.point = r
        }

        function r(e, n) {
            t.lineTo(e, n)
        }

        function i() {
            s.point = e
        }

        function o() {
            t.closePath()
        }
        var a = 4.5,
            s = {
                point: e,
                lineStart: function() {
                    s.point = n
                },
                lineEnd: i,
                polygonStart: function() {
                    s.lineEnd = o
                },
                polygonEnd: function() {
                    s.lineEnd = i, s.point = e
                },
                pointRadius: function(t) {
                    return a = t, s
                },
                result: g
            };
        return s
    }

    function nr(t) {
        function e(t) {
            return (s ? r : n)(t)
        }

        function n(e) {
            return or(e, function(n, r) {
                n = t(n, r), e.point(n[0], n[1])
            })
        }

        function r(e) {
            function n(n, r) {
                n = t(n, r), e.point(n[0], n[1])
            }

            function r() {
                b = 0 / 0, k.point = o, e.lineStart()
            }

            function o(n, r) {
                var o = mn([n, r]),
                    a = t(n, r);
                i(b, x, y, w, _, M, b = a[0], x = a[1], y = n, w = o[0], _ = o[1], M = o[2], s, e), e.point(b, x)
            }

            function a() {
                k.point = n, e.lineEnd()
            }

            function u() {
                r(), k.point = l, k.lineEnd = c
            }

            function l(t, e) {
                o(f = t, h = e), d = b, p = x, g = w, m = _, v = M, k.point = o
            }

            function c() {
                i(b, x, y, w, _, M, d, p, f, g, m, v, s, e), k.lineEnd = a, a()
            }
            var f, h, d, p, g, m, v, y, b, x, w, _, M, k = {
                point: n,
                lineStart: r,
                lineEnd: a,
                polygonStart: function() {
                    e.polygonStart(), k.lineStart = u
                },
                polygonEnd: function() {
                    e.polygonEnd(), k.lineStart = r
                }
            };
            return k
        }

        function i(e, n, r, s, u, l, c, f, h, d, p, g, m, v) {
            var y = c - e,
                b = f - n,
                x = y * y + b * b;
            if (x > 4 * o && m--) {
                var w = s + d,
                    _ = u + p,
                    M = l + g,
                    k = Math.sqrt(w * w + _ * _ + M * M),
                    N = Math.asin(M /= k),
                    C = cs(cs(M) - 1) < As || cs(r - h) < As ? (r + h) / 2 : Math.atan2(_, w),
                    E = t(C, N),
                    S = E[0],
                    T = E[1],
                    A = S - e,
                    L = T - n,
                    j = b * A - y * L;
                (j * j / x > o || cs((y * A + b * L) / x - .5) > .3 || a > s * d + u * p + l * g) && (i(e, n, r, s, u, l, S, T, C, w /= k, _ /= k, M, m, v), v.point(S, T), i(S, T, C, w, _, M, c, f, h, d, p, g, m, v))
            }
        }
        var o = .5,
            a = Math.cos(30 * Ls),
            s = 16;
        return e.precision = function(t) {
            return arguments.length ? (s = (o = t * t) > 0 && 16, e) : Math.sqrt(o)
        }, e
    }

    function rr(t) {
        var e = nr(function(e, n) {
            return t([e * js, n * js])
        });
        return function(t) {
            return ur(e(t))
        }
    }

    function ir(t) {
        this.stream = t
    }

    function or(t, e) {
        return {
            point: e,
            sphere: function() {
                t.sphere()
            },
            lineStart: function() {
                t.lineStart()
            },
            lineEnd: function() {
                t.lineEnd()
            },
            polygonStart: function() {
                t.polygonStart()
            },
            polygonEnd: function() {
                t.polygonEnd()
            }
        }
    }

    function ar(t) {
        return sr(function() {
            return t
        })()
    }

    function sr(t) {
        function e(t) {
            return t = s(t[0] * Ls, t[1] * Ls), [t[0] * l + v, y - t[1] * l]
        }

        function n(t) {
            return t = s.invert((t[0] - v) / l, (y - t[1]) / l), t && [t[0] * js, t[1] * js]
        }

        function r() {
            s = Un(a = fr(p, g, m), o);
            var t = o(h, d);
            return v = c - t[0] * l, y = f + t[1] * l, i()
        }

        function i() {
            return M && (M.valid = !1, M = null), e
        }
        var o, a, s, u = nr(function(t, e) {
                return t = o(t, e), [t[0] * l + v, y - t[1] * l]
            }),
            l = 150,
            c = 480,
            f = 250,
            h = 0,
            d = 0,
            p = 0,
            g = 0,
            m = 0,
            v, y, b = Tu,
            x = Se,
            w = null,
            _ = null,
            M;
        return e.stream = function(t) {
                return M && (M.valid = !1), M = ur(b(a, u(x(t)))), M.valid = !0, M
            }, e.clipAngle = function(t) {
                return arguments.length ? (b = null == t ? (w = t, Tu) : Pn((w = +t) * Ls), i()) : w
            }, e.clipExtent = function(t) {
                return arguments.length ? (_ = t, x = t ? Fn(t[0][0], t[0][1], t[1][0], t[1][1]) : Se, i()) : _
            }, e.scale = function(t) {
                return arguments.length ? (l = +t, r()) : l
            }, e.translate = function(t) {
                return arguments.length ? (c = +t[0], f = +t[1], r()) : [c, f]
            }, e.center = function(t) {
                return arguments.length ? (h = t[0] % 360 * Ls, d = t[1] % 360 * Ls, r()) : [h * js, d * js]
            }, e.rotate = function(t) {
                return arguments.length ? (p = t[0] % 360 * Ls, g = t[1] % 360 * Ls, m = t.length > 2 ? t[2] % 360 * Ls : 0, r()) : [p * js, g * js, m * js]
            }, Qa.rebind(e, u, "precision"),
            function() {
                return o = t.apply(this, arguments), e.invert = o.invert && n, r()
            }
    }

    function ur(t) {
        return or(t, function(e, n) {
            t.point(e * Ls, n * Ls)
        })
    }

    function lr(t, e) {
        return [t, e]
    }

    function cr(t, e) {
        return [t > Es ? t - Ss : -Es > t ? t + Ss : t, e]
    }

    function fr(t, e, n) {
        return t ? e || n ? Un(dr(t), pr(e, n)) : dr(t) : e || n ? pr(e, n) : cr
    }

    function hr(t) {
        return function(e, n) {
            return e += t, [e > Es ? e - Ss : -Es > e ? e + Ss : e, n]
        }
    }

    function dr(t) {
        var e = hr(t);
        return e.invert = hr(-t), e
    }

    function pr(t, e) {
        function n(t, e) {
            var n = Math.cos(e),
                s = Math.cos(t) * n,
                u = Math.sin(t) * n,
                l = Math.sin(e),
                c = l * r + s * i;
            return [Math.atan2(u * o - c * a, s * r - l * i), G(c * o + u * a)]
        }
        var r = Math.cos(t),
            i = Math.sin(t),
            o = Math.cos(e),
            a = Math.sin(e);
        return n.invert = function(t, e) {
            var n = Math.cos(e),
                s = Math.cos(t) * n,
                u = Math.sin(t) * n,
                l = Math.sin(e),
                c = l * o - u * a;
            return [Math.atan2(u * o + l * a, s * r + c * i), G(c * r - s * i)]
        }, n
    }

    function gr(t, e) {
        var n = Math.cos(t),
            r = Math.sin(t);
        return function(i, o, a, s) {
            var u = a * e;
            null != i ? (i = mr(n, i), o = mr(n, o), (a > 0 ? o > i : i > o) && (i += a * Ss)) : (i = t + a * Ss, o = t - .5 * u);
            for (var l, c = i; a > 0 ? c > o : o > c; c -= u) s.point((l = _n([n, -r * Math.cos(c), -r * Math.sin(c)]))[0], l[1])
        }
    }

    function mr(t, e) {
        var n = mn(e);
        n[0] -= t, wn(n);
        var r = K(-n[1]);
        return ((-n[2] < 0 ? -r : r) + 2 * Math.PI - As) % (2 * Math.PI)
    }

    function vr(t, e, n) {
        var r = Qa.range(t, e - As, n).concat(e);
        return function(t) {
            return r.map(function(e) {
                return [t, e]
            })
        }
    }

    function yr(t, e, n) {
        var r = Qa.range(t, e - As, n).concat(e);
        return function(t) {
            return r.map(function(e) {
                return [e, t]
            })
        }
    }

    function br(t) {
        return t.source
    }

    function xr(t) {
        return t.target
    }

    function wr(t, e, n, r) {
        var i = Math.cos(e),
            o = Math.sin(e),
            a = Math.cos(r),
            s = Math.sin(r),
            u = i * Math.cos(t),
            l = i * Math.sin(t),
            c = a * Math.cos(n),
            f = a * Math.sin(n),
            h = 2 * Math.asin(Math.sqrt(ne(r - e) + i * a * ne(n - t))),
            d = 1 / Math.sin(h),
            p = h ? function(t) {
                var e = Math.sin(t *= h) * d,
                    n = Math.sin(h - t) * d,
                    r = n * u + e * c,
                    i = n * l + e * f,
                    a = n * o + e * s;
                return [Math.atan2(i, r) * js, Math.atan2(a, Math.sqrt(r * r + i * i)) * js]
            } : function() {
                return [t * js, e * js]
            };
        return p.distance = h, p
    }

    function _r() {
        function t(t, i) {
            var o = Math.sin(i *= Ls),
                a = Math.cos(i),
                s = cs((t *= Ls) - e),
                u = Math.cos(s);
            Ou += Math.atan2(Math.sqrt((s = a * Math.sin(s)) * s + (s = r * o - n * a * u) * s), n * o + r * a * u), e = t, n = o, r = a
        }
        var e, n, r;
        Pu.point = function(i, o) {
            e = i * Ls, n = Math.sin(o *= Ls), r = Math.cos(o), Pu.point = t
        }, Pu.lineEnd = function() {
            Pu.point = Pu.lineEnd = g
        }
    }

    function Mr(t, e) {
        function n(e, n) {
            var r = Math.cos(e),
                i = Math.cos(n),
                o = t(r * i);
            return [o * i * Math.sin(e), o * Math.sin(n)]
        }
        return n.invert = function(t, n) {
            var r = Math.sqrt(t * t + n * n),
                i = e(r),
                o = Math.sin(i),
                a = Math.cos(i);
            return [Math.atan2(t * o, r * a), Math.asin(r && n * o / r)]
        }, n
    }

    function kr(t, e) {
        function n(t, e) {
            a > 0 ? -Ts + As > e && (e = -Ts + As) : e > Ts - As && (e = Ts - As);
            var n = a / Math.pow(i(e), o);
            return [n * Math.sin(o * t), a - n * Math.cos(o * t)]
        }
        var r = Math.cos(t),
            i = function(t) {
                return Math.tan(Es / 4 + t / 2)
            },
            o = t === e ? Math.sin(t) : Math.log(r / Math.cos(e)) / Math.log(i(e) / i(t)),
            a = r * Math.pow(i(t), o) / o;
        return o ? (n.invert = function(t, e) {
            var n = a - e,
                r = X(o) * Math.sqrt(t * t + n * n);
            return [Math.atan2(t, n) / o, 2 * Math.atan(Math.pow(a / r, 1 / o)) - Ts]
        }, n) : Cr
    }

    function Nr(t, e) {
        function n(t, e) {
            var n = o - e;
            return [n * Math.sin(i * t), o - n * Math.cos(i * t)]
        }
        var r = Math.cos(t),
            i = t === e ? Math.sin(t) : (r - Math.cos(e)) / (e - t),
            o = r / i + t;
        return cs(i) < As ? lr : (n.invert = function(t, e) {
            var n = o - e;
            return [Math.atan2(t, n) / i, o - X(i) * Math.sqrt(t * t + n * n)]
        }, n)
    }

    function Cr(t, e) {
        return [t, Math.log(Math.tan(Es / 4 + e / 2))]
    }

    function Er(t) {
        var e = ar(t),
            n = e.scale,
            r = e.translate,
            i = e.clipExtent,
            o;
        return e.scale = function() {
            var t = n.apply(e, arguments);
            return t === e ? o ? e.clipExtent(null) : e : t
        }, e.translate = function() {
            var t = r.apply(e, arguments);
            return t === e ? o ? e.clipExtent(null) : e : t
        }, e.clipExtent = function(t) {
            var a = i.apply(e, arguments);
            if (a === e) {
                if (o = null == t) {
                    var s = Es * n(),
                        u = r();
                    i([
                        [u[0] - s, u[1] - s],
                        [u[0] + s, u[1] + s]
                    ])
                }
            } else o && (a = null);
            return a
        }, e.clipExtent(null)
    }

    function Sr(t, e) {
        return [Math.log(Math.tan(Es / 4 + e / 2)), -t]
    }

    function Tr(t) {
        return t[0]
    }

    function Ar(t) {
        return t[1]
    }

    function $r(t) {
        for (var e = t.length, n = [0, 1], r = 2, i = 2; e > i; i++) {
            for (; r > 1 && Q(t[n[r - 2]], t[n[r - 1]], t[i]) <= 0;) --r;
            n[r++] = i
        }
        return n.slice(0, r)
    }

    function Lr(t, e) {
        return t[0] - e[0] || t[1] - e[1]
    }

    function jr(t, e, n) {
        return (n[0] - e[0]) * (t[1] - e[1]) < (n[1] - e[1]) * (t[0] - e[0])
    }

    function Dr(t, e, n, r) {
        var i = t[0],
            o = n[0],
            a = e[0] - i,
            s = r[0] - o,
            u = t[1],
            l = n[1],
            c = e[1] - u,
            f = r[1] - l,
            h = (s * (u - l) - f * (i - o)) / (f * a - s * c);
        return [i + h * a, u + h * c]
    }

    function qr(t) {
        var e = t[0],
            n = t[t.length - 1];
        return !(e[0] - n[0] || e[1] - n[1])
    }

    function Rr() {
        ri(this), this.edge = this.site = this.circle = null
    }

    function zr(t) {
        var e = Ku.pop() || new Rr;
        return e.site = t, e
    }

    function Ir(t) {
        Yr(t), Qu.remove(t), Ku.push(t), ri(t)
    }

    function Br(t) {
        var e = t.circle,
            n = e.x,
            r = e.cy,
            i = {
                x: n,
                y: r
            },
            o = t.P,
            a = t.N,
            s = [t];
        Ir(t);
        for (var u = o; u.circle && cs(n - u.circle.x) < As && cs(r - u.circle.cy) < As;) o = u.P, s.unshift(u), Ir(u), u = o;
        s.unshift(u), Yr(u);
        for (var l = a; l.circle && cs(n - l.circle.x) < As && cs(r - l.circle.cy) < As;) a = l.N, s.push(l), Ir(l), l = a;
        s.push(l), Yr(l);
        var c = s.length,
            f;
        for (f = 1; c > f; ++f) l = s[f], u = s[f - 1], ti(l.edge, u.site, l.site, i);
        u = s[0], l = s[c - 1], l.edge = Gr(u.site, l.site, null, i), Zr(u), Zr(l)
    }

    function Or(t) {
        for (var e = t.x, n = t.y, r, i, o, a, s = Qu._; s;)
            if (o = Pr(s, n) - e, o > As) s = s.L;
            else {
                if (a = e - Hr(s, n), !(a > As)) {
                    o > -As ? (r = s.P, i = s) : a > -As ? (r = s, i = s.N) : r = i = s;
                    break
                }
                if (!s.R) {
                    r = s;
                    break
                }
                s = s.R
            }
        var u = zr(t);
        if (Qu.insert(r, u), r || i) {
            if (r === i) return Yr(r), i = zr(r.site), Qu.insert(u, i), u.edge = i.edge = Gr(r.site, u.site), Zr(r), void Zr(i);
            if (!i) return void(u.edge = Gr(r.site, u.site));
            Yr(r), Yr(i);
            var l = r.site,
                c = l.x,
                f = l.y,
                h = t.x - c,
                d = t.y - f,
                p = i.site,
                g = p.x - c,
                m = p.y - f,
                v = 2 * (h * m - d * g),
                y = h * h + d * d,
                b = g * g + m * m,
                x = {
                    x: (m * y - d * b) / v + c,
                    y: (h * b - g * y) / v + f
                };
            ti(i.edge, l, p, x), u.edge = Gr(l, t, null, x), i.edge = Gr(t, p, null, x), Zr(r), Zr(i)
        }
    }

    function Pr(t, e) {
        var n = t.site,
            r = n.x,
            i = n.y,
            o = i - e;
        if (!o) return r;
        var a = t.P;
        if (!a) return -1 / 0;
        n = a.site;
        var s = n.x,
            u = n.y,
            l = u - e;
        if (!l) return s;
        var c = s - r,
            f = 1 / o - 1 / l,
            h = c / l;
        return f ? (-h + Math.sqrt(h * h - 2 * f * (c * c / (-2 * l) - u + l / 2 + i - o / 2))) / f + r : (r + s) / 2
    }

    function Hr(t, e) {
        var n = t.N;
        if (n) return Pr(n, e);
        var r = t.site;
        return r.y === e ? r.x : 1 / 0
    }

    function Fr(t) {
        this.site = t, this.edges = []
    }

    function Ur(t) {
        for (var e = t[0][0], n = t[1][0], r = t[0][1], i = t[1][1], o, a, s, u, l = Xu, c = l.length, f, h, d, p, g, m; c--;)
            if (f = l[c], f && f.prepare())
                for (d = f.edges, p = d.length, h = 0; p > h;) m = d[h].end(), s = m.x, u = m.y, g = d[++h % p].start(), o = g.x, a = g.y, (cs(s - o) > As || cs(u - a) > As) && (d.splice(h, 0, new ei(Jr(f.site, m, cs(s - e) < As && i - u > As ? {
                    x: e,
                    y: cs(o - e) < As ? a : i
                } : cs(u - i) < As && n - s > As ? {
                    x: cs(a - i) < As ? o : n,
                    y: i
                } : cs(s - n) < As && u - r > As ? {
                    x: n,
                    y: cs(o - n) < As ? a : r
                } : cs(u - r) < As && s - e > As ? {
                    x: cs(a - r) < As ? o : e,
                    y: r
                } : null), f.site, null)), ++p)
    }

    function Wr(t, e) {
        return e.angle - t.angle
    }

    function Vr() {
        ri(this), this.x = this.y = this.arc = this.site = this.cy = null
    }

    function Zr(t) {
        var e = t.P,
            n = t.N;
        if (e && n) {
            var r = e.site,
                i = t.site,
                o = n.site;
            if (r !== o) {
                var a = i.x,
                    s = i.y,
                    u = r.x - a,
                    l = r.y - s,
                    c = o.x - a,
                    f = o.y - s,
                    h = 2 * (u * f - l * c);
                if (!(h >= -$s)) {
                    var d = u * u + l * l,
                        p = c * c + f * f,
                        g = (f * d - l * p) / h,
                        m = (u * p - c * d) / h,
                        f = m + s,
                        v = tl.pop() || new Vr;
                    v.arc = t, v.site = i, v.x = g + a, v.y = f + Math.sqrt(g * g + m * m), v.cy = f, t.circle = v;
                    for (var y = null, b = Ju._; b;)
                        if (v.y < b.y || v.y === b.y && v.x <= b.x) {
                            if (!b.L) {
                                y = b.P;
                                break
                            }
                            b = b.L
                        } else {
                            if (!b.R) {
                                y = b;
                                break
                            }
                            b = b.R
                        }
                    Ju.insert(y, v), y || (Gu = v)
                }
            }
        }
    }

    function Yr(t) {
        var e = t.circle;
        e && (e.P || (Gu = e.N), Ju.remove(e), tl.push(e), ri(e), t.circle = null)
    }

    function Xr(t) {
        for (var e = Yu, n = Hn(t[0][0], t[0][1], t[1][0], t[1][1]), r = e.length, i; r--;) i = e[r], (!Qr(i, t) || !n(i) || cs(i.a.x - i.b.x) < As && cs(i.a.y - i.b.y) < As) && (i.a = i.b = null, e.splice(r, 1))
    }

    function Qr(t, e) {
        var n = t.b;
        if (n) return !0;
        var r = t.a,
            i = e[0][0],
            o = e[1][0],
            a = e[0][1],
            s = e[1][1],
            u = t.l,
            l = t.r,
            c = u.x,
            f = u.y,
            h = l.x,
            d = l.y,
            p = (c + h) / 2,
            g = (f + d) / 2,
            m, v;
        if (d === f) {
            if (i > p || p >= o) return;
            if (c > h) {
                if (r) {
                    if (r.y >= s) return
                } else r = {
                    x: p,
                    y: a
                };
                n = {
                    x: p,
                    y: s
                }
            } else {
                if (r) {
                    if (r.y < a) return
                } else r = {
                    x: p,
                    y: s
                };
                n = {
                    x: p,
                    y: a
                }
            }
        } else if (m = (c - h) / (d - f), v = g - m * p, -1 > m || m > 1)
            if (c > h) {
                if (r) {
                    if (r.y >= s) return
                } else r = {
                    x: (a - v) / m,
                    y: a
                };
                n = {
                    x: (s - v) / m,
                    y: s
                }
            } else {
                if (r) {
                    if (r.y < a) return
                } else r = {
                    x: (s - v) / m,
                    y: s
                };
                n = {
                    x: (a - v) / m,
                    y: a
                }
            } else if (d > f) {
            if (r) {
                if (r.x >= o) return
            } else r = {
                x: i,
                y: m * i + v
            };
            n = {
                x: o,
                y: m * o + v
            }
        } else {
            if (r) {
                if (r.x < i) return
            } else r = {
                x: o,
                y: m * o + v
            };
            n = {
                x: i,
                y: m * i + v
            }
        }
        return t.a = r, t.b = n, !0
    }

    function Kr(t, e) {
        this.l = t, this.r = e, this.a = this.b = null
    }

    function Gr(t, e, n, r) {
        var i = new Kr(t, e);
        return Yu.push(i), n && ti(i, t, e, n), r && ti(i, e, t, r), Xu[t.i].edges.push(new ei(i, t, e)), Xu[e.i].edges.push(new ei(i, e, t)), i
    }

    function Jr(t, e, n) {
        var r = new Kr(t, null);
        return r.a = e, r.b = n, Yu.push(r), r
    }

    function ti(t, e, n, r) {
        t.a || t.b ? t.l === n ? t.b = r : t.a = r : (t.a = r, t.l = e, t.r = n)
    }

    function ei(t, e, n) {
        var r = t.a,
            i = t.b;
        this.edge = t, this.site = e, this.angle = n ? Math.atan2(n.y - e.y, n.x - e.x) : t.l === e ? Math.atan2(i.x - r.x, r.y - i.y) : Math.atan2(r.x - i.x, i.y - r.y)
    }

    function ni() {
        this._ = null
    }

    function ri(t) {
        t.U = t.C = t.L = t.R = t.P = t.N = null
    }

    function ii(t, e) {
        var n = e,
            r = e.R,
            i = n.U;
        i ? i.L === n ? i.L = r : i.R = r : t._ = r, r.U = i, n.U = r, n.R = r.L, n.R && (n.R.U = n), r.L = n
    }

    function oi(t, e) {
        var n = e,
            r = e.L,
            i = n.U;
        i ? i.L === n ? i.L = r : i.R = r : t._ = r, r.U = i, n.U = r, n.L = r.R, n.L && (n.L.U = n), r.R = n
    }

    function ai(t) {
        for (; t.L;) t = t.L;
        return t
    }

    function si(t, e) {
        var n = t.sort(ui).pop(),
            r, i, o;
        for (Yu = [], Xu = new Array(t.length), Qu = new ni, Ju = new ni;;)
            if (o = Gu, n && (!o || n.y < o.y || n.y === o.y && n.x < o.x))(n.x !== r || n.y !== i) && (Xu[n.i] = new Fr(n), Or(n), r = n.x, i = n.y), n = t.pop();
            else {
                if (!o) break;
                Br(o.arc)
            }
        e && (Xr(e), Ur(e));
        var a = {
            cells: Xu,
            edges: Yu
        };
        return Qu = Ju = Yu = Xu = null, a
    }

    function ui(t, e) {
        return e.y - t.y || e.x - t.x
    }

    function li(t, e, n) {
        return (t.x - n.x) * (e.y - t.y) - (t.x - e.x) * (n.y - t.y)
    }

    function ci(t) {
        return t.x
    }

    function fi(t) {
        return t.y
    }

    function hi() {
        return {
            leaf: !0,
            nodes: [],
            point: null,
            x: null,
            y: null
        }
    }

    function di(t, e, n, r, i, o) {
        if (!t(e, n, r, i, o)) {
            var a = .5 * (n + i),
                s = .5 * (r + o),
                u = e.nodes;
            u[0] && di(t, u[0], n, r, a, s), u[1] && di(t, u[1], a, r, i, s), u[2] && di(t, u[2], n, s, a, o), u[3] && di(t, u[3], a, s, i, o)
        }
    }

    function pi(t, e) {
        t = Qa.rgb(t), e = Qa.rgb(e);
        var n = t.r,
            r = t.g,
            i = t.b,
            o = e.r - n,
            a = e.g - r,
            s = e.b - i;
        return function(t) {
            return "#" + we(Math.round(n + o * t)) + we(Math.round(r + a * t)) + we(Math.round(i + s * t))
        }
    }

    function gi(t, e) {
        var n = {},
            r = {},
            i;
        for (i in t) i in e ? n[i] = yi(t[i], e[i]) : r[i] = t[i];
        for (i in e) i in t || (r[i] = e[i]);
        return function(t) {
            for (i in n) r[i] = n[i](t);
            return r
        }
    }

    function mi(t, e) {
        return e -= t = +t,
            function(n) {
                return t + e * n
            }
    }

    function vi(t, e) {
        var n = nl.lastIndex = rl.lastIndex = 0,
            r, i, o, a = -1,
            s = [],
            u = [];
        for (t += "", e += "";
            (r = nl.exec(t)) && (i = rl.exec(e));)(o = i.index) > n && (o = e.substring(n, o), s[a] ? s[a] += o : s[++a] = o), (r = r[0]) === (i = i[0]) ? s[a] ? s[a] += i : s[++a] = i : (s[++a] = null, u.push({
            i: a,
            x: mi(r, i)
        })), n = rl.lastIndex;
        return n < e.length && (o = e.substring(n), s[a] ? s[a] += o : s[++a] = o), s.length < 2 ? u[0] ? (e = u[0].x, function(t) {
            return e(t) + ""
        }) : function() {
            return e
        } : (e = u.length, function(t) {
            for (var n = 0, r; e > n; ++n) s[(r = u[n]).i] = r.x(t);
            return s.join("")
        })
    }

    function yi(t, e) {
        for (var n = Qa.interpolators.length, r; --n >= 0 && !(r = Qa.interpolators[n](t, e)););
        return r
    }

    function bi(t, e) {
        var n = [],
            r = [],
            i = t.length,
            o = e.length,
            a = Math.min(t.length, e.length),
            s;
        for (s = 0; a > s; ++s) n.push(yi(t[s], e[s]));
        for (; i > s; ++s) r[s] = t[s];
        for (; o > s; ++s) r[s] = e[s];
        return function(t) {
            for (s = 0; a > s; ++s) r[s] = n[s](t);
            return r
        }
    }

    function xi(t) {
        return function(e) {
            return 0 >= e ? 0 : e >= 1 ? 1 : t(e)
        }
    }

    function wi(t) {
        return function(e) {
            return 1 - t(1 - e)
        }
    }

    function _i(t) {
        return function(e) {
            return .5 * (.5 > e ? t(2 * e) : 2 - t(2 - 2 * e))
        }
    }

    function Mi(t) {
        return t * t
    }

    function ki(t) {
        return t * t * t
    }

    function Ni(t) {
        if (0 >= t) return 0;
        if (t >= 1) return 1;
        var e = t * t,
            n = e * t;
        return 4 * (.5 > t ? n : 3 * (t - e) + n - .75)
    }

    function Ci(t) {
        return function(e) {
            return Math.pow(e, t)
        }
    }

    function Ei(t) {
        return 1 - Math.cos(t * Ts)
    }

    function Si(t) {
        return Math.pow(2, 10 * (t - 1))
    }

    function Ti(t) {
        return 1 - Math.sqrt(1 - t * t)
    }

    function Ai(t, e) {
        var n;
        return arguments.length < 2 && (e = .45), arguments.length ? n = e / Ss * Math.asin(1 / t) : (t = 1, n = e / 4),
            function(r) {
                return 1 + t * Math.pow(2, -10 * r) * Math.sin((r - n) * Ss / e)
            }
    }

    function $i(t) {
        return t || (t = 1.70158),
            function(e) {
                return e * e * ((t + 1) * e - t)
            }
    }

    function Li(t) {
        return 1 / 2.75 > t ? 7.5625 * t * t : 2 / 2.75 > t ? 7.5625 * (t -= 1.5 / 2.75) * t + .75 : 2.5 / 2.75 > t ? 7.5625 * (t -= 2.25 / 2.75) * t + .9375 : 7.5625 * (t -= 2.625 / 2.75) * t + .984375
    }

    function ji(t, e) {
        t = Qa.hcl(t), e = Qa.hcl(e);
        var n = t.h,
            r = t.c,
            i = t.l,
            o = e.h - n,
            a = e.c - r,
            s = e.l - i;
        return isNaN(a) && (a = 0, r = isNaN(r) ? e.c : r), isNaN(o) ? (o = 0, n = isNaN(n) ? e.h : n) : o > 180 ? o -= 360 : -180 > o && (o += 360),
            function(t) {
                return le(n + o * t, r + a * t, i + s * t) + ""
            }
    }

    function Di(t, e) {
        t = Qa.hsl(t), e = Qa.hsl(e);
        var n = t.h,
            r = t.s,
            i = t.l,
            o = e.h - n,
            a = e.s - r,
            s = e.l - i;
        return isNaN(a) && (a = 0, r = isNaN(r) ? e.s : r), isNaN(o) ? (o = 0, n = isNaN(n) ? e.h : n) : o > 180 ? o -= 360 : -180 > o && (o += 360),
            function(t) {
                return ae(n + o * t, r + a * t, i + s * t) + ""
            }
    }

    function qi(t, e) {
        t = Qa.lab(t), e = Qa.lab(e);
        var n = t.l,
            r = t.a,
            i = t.b,
            o = e.l - n,
            a = e.a - r,
            s = e.b - i;
        return function(t) {
            return he(n + o * t, r + a * t, i + s * t) + ""
        }
    }

    function Ri(t, e) {
        return e -= t,
            function(n) {
                return Math.round(t + e * n)
            }
    }

    function zi(t) {
        var e = [t.a, t.b],
            n = [t.c, t.d],
            r = Bi(e),
            i = Ii(e, n),
            o = Bi(Oi(n, e, -i)) || 0;
        e[0] * n[1] < n[0] * e[1] && (e[0] *= -1, e[1] *= -1, r *= -1, i *= -1), this.rotate = (r ? Math.atan2(e[1], e[0]) : Math.atan2(-n[0], n[1])) * js, this.translate = [t.e, t.f], this.scale = [r, o], this.skew = o ? Math.atan2(i, o) * js : 0
    }

    function Ii(t, e) {
        return t[0] * e[0] + t[1] * e[1]
    }

    function Bi(t) {
        var e = Math.sqrt(Ii(t, t));
        return e && (t[0] /= e, t[1] /= e), e
    }

    function Oi(t, e, n) {
        return t[0] += n * e[0], t[1] += n * e[1], t
    }

    function Pi(t, e) {
        var n = [],
            r = [],
            i, o = Qa.transform(t),
            a = Qa.transform(e),
            s = o.translate,
            u = a.translate,
            l = o.rotate,
            c = a.rotate,
            f = o.skew,
            h = a.skew,
            d = o.scale,
            p = a.scale;
        return s[0] != u[0] || s[1] != u[1] ? (n.push("translate(", null, ",", null, ")"), r.push({
                i: 1,
                x: mi(s[0], u[0])
            }, {
                i: 3,
                x: mi(s[1], u[1])
            })) : n.push(u[0] || u[1] ? "translate(" + u + ")" : ""), l != c ? (l - c > 180 ? c += 360 : c - l > 180 && (l += 360), r.push({
                i: n.push(n.pop() + "rotate(", null, ")") - 2,
                x: mi(l, c)
            })) : c && n.push(n.pop() + "rotate(" + c + ")"), f != h ? r.push({
                i: n.push(n.pop() + "skewX(", null, ")") - 2,
                x: mi(f, h)
            }) : h && n.push(n.pop() + "skewX(" + h + ")"), d[0] != p[0] || d[1] != p[1] ? (i = n.push(n.pop() + "scale(", null, ",", null, ")"), r.push({
                i: i - 4,
                x: mi(d[0], p[0])
            }, {
                i: i - 2,
                x: mi(d[1], p[1])
            })) : (1 != p[0] || 1 != p[1]) && n.push(n.pop() + "scale(" + p + ")"), i = r.length,
            function(t) {
                for (var e = -1, o; ++e < i;) n[(o = r[e]).i] = o.x(t);
                return n.join("")
            }
    }

    function Hi(t, e) {
        return e = e - (t = +t) ? 1 / (e - t) : 0,
            function(n) {
                return (n - t) * e
            }
    }

    function Fi(t, e) {
        return e = e - (t = +t) ? 1 / (e - t) : 0,
            function(n) {
                return Math.max(0, Math.min(1, (n - t) * e))
            }
    }

    function Ui(t) {
        for (var e = t.source, n = t.target, r = Vi(e, n), i = [e]; e !== r;) e = e.parent, i.push(e);
        for (var o = i.length; n !== r;) i.splice(o, 0, n), n = n.parent;
        return i
    }

    function Wi(t) {
        for (var e = [], n = t.parent; null != n;) e.push(t), t = n, n = n.parent;
        return e.push(t), e
    }

    function Vi(t, e) {
        if (t === e) return t;
        for (var n = Wi(t), r = Wi(e), i = n.pop(), o = r.pop(), a = null; i === o;) a = i, i = n.pop(), o = r.pop();
        return a
    }

    function Zi(t) {
        t.fixed |= 2
    }

    function Yi(t) {
        t.fixed &= -7
    }

    function Xi(t) {
        t.fixed |= 4, t.px = t.x, t.py = t.y
    }

    function Qi(t) {
        t.fixed &= -5
    }

    function Ki(t, e, n) {
        var r = 0,
            i = 0;
        if (t.charge = 0, !t.leaf)
            for (var o = t.nodes, a = o.length, s = -1, u; ++s < a;) u = o[s], null != u && (Ki(u, e, n), t.charge += u.charge, r += u.charge * u.cx, i += u.charge * u.cy);
        if (t.point) {
            t.leaf || (t.point.x += Math.random() - .5, t.point.y += Math.random() - .5);
            var l = e * n[t.point.index];
            t.charge += t.pointCharge = l, r += l * t.point.x, i += l * t.point.y
        }
        t.cx = r / t.charge, t.cy = i / t.charge
    }

    function Gi(t, e) {
        return Qa.rebind(t, e, "sort", "children", "value"), t.nodes = t, t.links = io, t
    }

    function Ji(t, e) {
        for (var n = [t]; null != (t = n.pop());)
            if (e(t), (i = t.children) && (r = i.length))
                for (var r, i; --r >= 0;) n.push(i[r])
    }

    function to(t, e) {
        for (var n = [t], r = []; null != (t = n.pop());)
            if (r.push(t), (a = t.children) && (o = a.length))
                for (var i = -1, o, a; ++i < o;) n.push(a[i]);
        for (; null != (t = r.pop());) e(t)
    }

    function eo(t) {
        return t.children
    }

    function no(t) {
        return t.value
    }

    function ro(t, e) {
        return e.value - t.value
    }

    function io(t) {
        return Qa.merge(t.map(function(t) {
            return (t.children || []).map(function(e) {
                return {
                    source: t,
                    target: e
                }
            })
        }))
    }

    function oo(t) {
        return t.x
    }

    function ao(t) {
        return t.y
    }

    function so(t, e, n) {
        t.y0 = e, t.y = n
    }

    function uo(t) {
        return Qa.range(t.length)
    }

    function lo(t) {
        for (var e = -1, n = t[0].length, r = []; ++e < n;) r[e] = 0;
        return r
    }

    function co(t) {
        for (var e = 1, n = 0, r = t[0][1], i, o = t.length; o > e; ++e)(i = t[e][1]) > r && (n = e, r = i);
        return n
    }

    function fo(t) {
        return t.reduce(ho, 0)
    }

    function ho(t, e) {
        return t + e[1]
    }

    function po(t, e) {
        return go(t, Math.ceil(Math.log(e.length) / Math.LN2 + 1))
    }

    function go(t, e) {
        for (var n = -1, r = +t[0], i = (t[1] - r) / e, o = []; ++n <= e;) o[n] = i * n + r;
        return o
    }

    function mo(t) {
        return [Qa.min(t), Qa.max(t)]
    }

    function vo(t, e) {
        return t.value - e.value
    }

    function yo(t, e) {
        var n = t._pack_next;
        t._pack_next = e, e._pack_prev = t, e._pack_next = n, n._pack_prev = e
    }

    function bo(t, e) {
        t._pack_next = e, e._pack_prev = t
    }

    function xo(t, e) {
        var n = e.x - t.x,
            r = e.y - t.y,
            i = t.r + e.r;
        return .999 * i * i > n * n + r * r
    }

    function wo(t) {
        function e(t) {
            r = Math.min(t.x - t.r, r), i = Math.max(t.x + t.r, i), o = Math.min(t.y - t.r, o), a = Math.max(t.y + t.r, a)
        }
        if ((n = t.children) && (d = n.length)) {
            var n, r = 1 / 0,
                i = -1 / 0,
                o = 1 / 0,
                a = -1 / 0,
                s, u, l, c, f, h, d;
            if (n.forEach(_o), s = n[0], s.x = -s.r, s.y = 0, e(s), d > 1 && (u = n[1], u.x = u.r, u.y = 0, e(u), d > 2))
                for (l = n[2], No(s, u, l), e(l), yo(s, l), s._pack_prev = l, yo(l, u), u = s._pack_next, c = 3; d > c; c++) {
                    No(s, u, l = n[c]);
                    var p = 0,
                        g = 1,
                        m = 1;
                    for (f = u._pack_next; f !== u; f = f._pack_next, g++)
                        if (xo(f, l)) {
                            p = 1;
                            break
                        }
                    if (1 == p)
                        for (h = s._pack_prev; h !== f._pack_prev && !xo(h, l); h = h._pack_prev, m++);
                    p ? (m > g || g == m && u.r < s.r ? bo(s, u = f) : bo(s = h, u), c--) : (yo(s, l), u = l, e(l))
                }
            var v = (r + i) / 2,
                y = (o + a) / 2,
                b = 0;
            for (c = 0; d > c; c++) l = n[c], l.x -= v, l.y -= y, b = Math.max(b, l.r + Math.sqrt(l.x * l.x + l.y * l.y));
            t.r = b, n.forEach(Mo)
        }
    }

    function _o(t) {
        t._pack_next = t._pack_prev = t
    }

    function Mo(t) {
        delete t._pack_next, delete t._pack_prev
    }

    function ko(t, e, n, r) {
        var i = t.children;
        if (t.x = e += r * t.x, t.y = n += r * t.y, t.r *= r, i)
            for (var o = -1, a = i.length; ++o < a;) ko(i[o], e, n, r)
    }

    function No(t, e, n) {
        var r = t.r + n.r,
            i = e.x - t.x,
            o = e.y - t.y;
        if (r && (i || o)) {
            var a = e.r + n.r,
                s = i * i + o * o;
            a *= a, r *= r;
            var u = .5 + (r - a) / (2 * s),
                l = Math.sqrt(Math.max(0, 2 * a * (r + s) - (r -= s) * r - a * a)) / (2 * s);
            n.x = t.x + u * i + l * o, n.y = t.y + u * o - l * i
        } else n.x = t.x + r, n.y = t.y
    }

    function Co(t, e) {
        return t.parent == e.parent ? 1 : 2
    }

    function Eo(t) {
        var e = t.children;
        return e.length ? e[0] : t.t
    }

    function So(t) {
        var e = t.children,
            n;
        return (n = e.length) ? e[n - 1] : t.t
    }

    function To(t, e, n) {
        var r = n / (e.i - t.i);
        e.c -= r, e.s += n, t.c += r, e.z += n, e.m += n
    }

    function Ao(t) {
        for (var e = 0, n = 0, r = t.children, i = r.length, o; --i >= 0;) o = r[i], o.z += e, o.m += e, e += o.s + (n += o.c)
    }

    function $o(t, e, n) {
        return t.a.parent === e.parent ? t.a : n
    }

    function Lo(t) {
        return 1 + Qa.max(t, function(t) {
            return t.y
        })
    }

    function jo(t) {
        return t.reduce(function(t, e) {
            return t + e.x
        }, 0) / t.length
    }

    function Do(t) {
        var e = t.children;
        return e && e.length ? Do(e[0]) : t
    }

    function qo(t) {
        var e = t.children,
            n;
        return e && (n = e.length) ? qo(e[n - 1]) : t
    }

    function Ro(t) {
        return {
            x: t.x,
            y: t.y,
            dx: t.dx,
            dy: t.dy
        }
    }

    function zo(t, e) {
        var n = t.x + e[3],
            r = t.y + e[0],
            i = t.dx - e[1] - e[3],
            o = t.dy - e[0] - e[2];
        return 0 > i && (n += i / 2, i = 0), 0 > o && (r += o / 2, o = 0), {
            x: n,
            y: r,
            dx: i,
            dy: o
        }
    }

    function Io(t) {
        var e = t[0],
            n = t[t.length - 1];
        return n > e ? [e, n] : [n, e]
    }

    function Bo(t) {
        return t.rangeExtent ? t.rangeExtent() : Io(t.range())
    }

    function Oo(t, e, n, r) {
        var i = n(t[0], t[1]),
            o = r(e[0], e[1]);
        return function(t) {
            return o(i(t))
        }
    }

    function Po(t, e) {
        var n = 0,
            r = t.length - 1,
            i = t[n],
            o = t[r],
            a;
        return i > o && (a = n, n = r, r = a, a = i, i = o, o = a), t[n] = e.floor(i), t[r] = e.ceil(o), t
    }

    function Ho(t) {
        return t ? {
            floor: function(e) {
                return Math.floor(e / t) * t
            },
            ceil: function(e) {
                return Math.ceil(e / t) * t
            }
        } : pl
    }

    function Fo(t, e, n, r) {
        var i = [],
            o = [],
            a = 0,
            s = Math.min(t.length, e.length) - 1;
        for (t[s] < t[0] && (t = t.slice().reverse(), e = e.slice().reverse()); ++a <= s;) i.push(n(t[a - 1], t[a])), o.push(r(e[a - 1], e[a]));
        return function(e) {
            var n = Qa.bisect(t, e, 1, s) - 1;
            return o[n](i[n](e))
        }
    }

    function Uo(t, e, n, r) {
        function i() {
            var i = Math.min(t.length, e.length) > 2 ? Fo : Oo,
                u = r ? Fi : Hi;
            return a = i(t, e, u, n), s = i(e, t, u, yi), o
        }

        function o(t) {
            return a(t)
        }
        var a, s;
        return o.invert = function(t) {
            return s(t)
        }, o.domain = function(e) {
            return arguments.length ? (t = e.map(Number), i()) : t
        }, o.range = function(t) {
            return arguments.length ? (e = t, i()) : e
        }, o.rangeRound = function(t) {
            return o.range(t).interpolate(Ri)
        }, o.clamp = function(t) {
            return arguments.length ? (r = t, i()) : r
        }, o.interpolate = function(t) {
            return arguments.length ? (n = t, i()) : n
        }, o.ticks = function(e) {
            return Yo(t, e)
        }, o.tickFormat = function(e, n) {
            return Xo(t, e, n)
        }, o.nice = function(e) {
            return Vo(t, e), i()
        }, o.copy = function() {
            return Uo(t, e, n, r)
        }, i()
    }

    function Wo(t, e) {
        return Qa.rebind(t, e, "range", "rangeRound", "interpolate", "clamp")
    }

    function Vo(t, e) {
        return Po(t, Ho(Zo(t, e)[2]))
    }

    function Zo(t, e) {
        null == e && (e = 10);
        var n = Io(t),
            r = n[1] - n[0],
            i = Math.pow(10, Math.floor(Math.log(r / e) / Math.LN10)),
            o = e / r * i;
        return .15 >= o ? i *= 10 : .35 >= o ? i *= 5 : .75 >= o && (i *= 2), n[0] = Math.ceil(n[0] / i) * i, n[1] = Math.floor(n[1] / i) * i + .5 * i, n[2] = i, n
    }

    function Yo(t, e) {
        return Qa.range.apply(Qa, Zo(t, e))
    }

    function Xo(t, e, n) {
        var r = Zo(t, e);
        if (n) {
            var i = nu.exec(n);
            if (i.shift(), "s" === i[8]) {
                var o = Qa.formatPrefix(Math.max(cs(r[0]), cs(r[1])));
                return i[7] || (i[7] = "." + Qo(o.scale(r[2]))), i[8] = "f", n = Qa.format(i.join("")),
                    function(t) {
                        return n(o.scale(t)) + o.symbol
                    }
            }
            i[7] || (i[7] = "." + Ko(i[8], r)), n = i.join("")
        } else n = ",." + Qo(r[2]) + "f";
        return Qa.format(n)
    }

    function Qo(t) {
        return -Math.floor(Math.log(t) / Math.LN10 + .01)
    }

    function Ko(t, e) {
        var n = Qo(e[2]);
        return t in gl ? Math.abs(n - Qo(Math.max(cs(e[0]), cs(e[1])))) + +("e" !== t) : n - 2 * ("%" === t)
    }

    function Go(t, e, n, r) {
        function i(t) {
            return (n ? Math.log(0 > t ? 0 : t) : -Math.log(t > 0 ? 0 : -t)) / Math.log(e)
        }

        function o(t) {
            return n ? Math.pow(e, t) : -Math.pow(e, -t)
        }

        function a(e) {
            return t(i(e))
        }
        return a.invert = function(e) {
            return o(t.invert(e))
        }, a.domain = function(e) {
            return arguments.length ? (n = e[0] >= 0, t.domain((r = e.map(Number)).map(i)), a) : r
        }, a.base = function(n) {
            return arguments.length ? (e = +n, t.domain(r.map(i)), a) : e
        }, a.nice = function() {
            var e = Po(r.map(i), n ? Math : vl);
            return t.domain(e), r = e.map(o), a
        }, a.ticks = function() {
            var t = Io(r),
                a = [],
                s = t[0],
                u = t[1],
                l = Math.floor(i(s)),
                c = Math.ceil(i(u)),
                f = e % 1 ? 2 : e;
            if (isFinite(c - l)) {
                if (n) {
                    for (; c > l; l++)
                        for (var h = 1; f > h; h++) a.push(o(l) * h);
                    a.push(o(l))
                } else
                    for (a.push(o(l)); l++ < c;)
                        for (var h = f - 1; h > 0; h--) a.push(o(l) * h);
                for (l = 0; a[l] < s; l++);
                for (c = a.length; a[c - 1] > u; c--);
                a = a.slice(l, c)
            }
            return a
        }, a.tickFormat = function(t, e) {
            if (!arguments.length) return ml;
            arguments.length < 2 ? e = ml : "function" != typeof e && (e = Qa.format(e));
            var r = Math.max(.1, t / a.ticks().length),
                s = n ? (u = 1e-12, Math.ceil) : (u = -1e-12, Math.floor),
                u;
            return function(t) {
                return t / o(s(i(t) + u)) <= r ? e(t) : ""
            }
        }, a.copy = function() {
            return Go(t.copy(), e, n, r)
        }, Wo(a, t)
    }

    function Jo(t, e, n) {
        function r(e) {
            return t(i(e))
        }
        var i = ta(e),
            o = ta(1 / e);
        return r.invert = function(e) {
            return o(t.invert(e))
        }, r.domain = function(e) {
            return arguments.length ? (t.domain((n = e.map(Number)).map(i)), r) : n
        }, r.ticks = function(t) {
            return Yo(n, t)
        }, r.tickFormat = function(t, e) {
            return Xo(n, t, e)
        }, r.nice = function(t) {
            return r.domain(Vo(n, t))
        }, r.exponent = function(a) {
            return arguments.length ? (i = ta(e = a), o = ta(1 / e), t.domain(n.map(i)), r) : e
        }, r.copy = function() {
            return Jo(t.copy(), e, n)
        }, Wo(r, t)
    }

    function ta(t) {
        return function(e) {
            return 0 > e ? -Math.pow(-e, t) : Math.pow(e, t)
        }
    }

    function ea(t, e) {
        function n(n) {
            return o[((i.get(n) || ("range" === e.t ? i.set(n, t.push(n)) : 0 / 0)) - 1) % o.length]
        }

        function r(e, n) {
            return Qa.range(t.length).map(function(t) {
                return e + n * t
            })
        }
        var i, o, s;
        return n.domain = function(r) {
            if (!arguments.length) return t;
            t = [], i = new a;
            for (var o = -1, s = r.length, u; ++o < s;) i.has(u = r[o]) || i.set(u, t.push(u));
            return n[e.t].apply(n, e.a)
        }, n.range = function(t) {
            return arguments.length ? (o = t, s = 0, e = {
                t: "range",
                a: arguments
            }, n) : o
        }, n.rangePoints = function(i, a) {
            arguments.length < 2 && (a = 0);
            var u = i[0],
                l = i[1],
                c = (l - u) / (Math.max(1, t.length - 1) + a);
            return o = r(t.length < 2 ? (u + l) / 2 : u + c * a / 2, c), s = 0, e = {
                t: "rangePoints",
                a: arguments
            }, n
        }, n.rangeBands = function(i, a, u) {
            arguments.length < 2 && (a = 0), arguments.length < 3 && (u = a);
            var l = i[1] < i[0],
                c = i[l - 0],
                f = i[1 - l],
                h = (f - c) / (t.length - a + 2 * u);
            return o = r(c + h * u, h), l && o.reverse(), s = h * (1 - a), e = {
                t: "rangeBands",
                a: arguments
            }, n
        }, n.rangeRoundBands = function(i, a, u) {
            arguments.length < 2 && (a = 0), arguments.length < 3 && (u = a);
            var l = i[1] < i[0],
                c = i[l - 0],
                f = i[1 - l],
                h = Math.floor((f - c) / (t.length - a + 2 * u)),
                d = f - c - (t.length - a) * h;
            return o = r(c + Math.round(d / 2), h), l && o.reverse(), s = Math.round(h * (1 - a)), e = {
                t: "rangeRoundBands",
                a: arguments
            }, n
        }, n.rangeBand = function() {
            return s
        }, n.rangeExtent = function() {
            return Io(e.a[0])
        }, n.copy = function() {
            return ea(t, e)
        }, n.domain(t)
    }

    function na(n, r) {
        function i() {
            var t = 0,
                e = r.length;
            for (a = []; ++t < e;) a[t - 1] = Qa.quantile(n, t / e);
            return o
        }

        function o(t) {
            return isNaN(t = +t) ? void 0 : r[Qa.bisect(a, t)]
        }
        var a;
        return o.domain = function(r) {
            return arguments.length ? (n = r.filter(e).sort(t), i()) : n
        }, o.range = function(t) {
            return arguments.length ? (r = t, i()) : r
        }, o.quantiles = function() {
            return a
        }, o.invertExtent = function(t) {
            return t = r.indexOf(t), 0 > t ? [0 / 0, 0 / 0] : [t > 0 ? a[t - 1] : n[0], t < a.length ? a[t] : n[n.length - 1]]
        }, o.copy = function() {
            return na(n, r)
        }, i()
    }

    function ra(t, e, n) {
        function r(e) {
            return n[Math.max(0, Math.min(a, Math.floor(o * (e - t))))]
        }

        function i() {
            return o = n.length / (e - t), a = n.length - 1, r
        }
        var o, a;
        return r.domain = function(n) {
            return arguments.length ? (t = +n[0], e = +n[n.length - 1], i()) : [t, e]
        }, r.range = function(t) {
            return arguments.length ? (n = t, i()) : n
        }, r.invertExtent = function(e) {
            return e = n.indexOf(e), e = 0 > e ? 0 / 0 : e / o + t, [e, e + 1 / o]
        }, r.copy = function() {
            return ra(t, e, n)
        }, i()
    }

    function ia(t, e) {
        function n(n) {
            return n >= n ? e[Qa.bisect(t, n)] : void 0
        }
        return n.domain = function(e) {
            return arguments.length ? (t = e, n) : t
        }, n.range = function(t) {
            return arguments.length ? (e = t, n) : e
        }, n.invertExtent = function(n) {
            return n = e.indexOf(n), [t[n - 1], t[n]]
        }, n.copy = function() {
            return ia(t, e)
        }, n
    }

    function oa(t) {
        function e(t) {
            return +t
        }
        return e.invert = e, e.domain = e.range = function(n) {
            return arguments.length ? (t = n.map(e), e) : t
        }, e.ticks = function(e) {
            return Yo(t, e)
        }, e.tickFormat = function(e, n) {
            return Xo(t, e, n)
        }, e.copy = function() {
            return oa(t)
        }, e
    }

    function aa(t) {
        return t.innerRadius
    }

    function sa(t) {
        return t.outerRadius
    }

    function ua(t) {
        return t.startAngle
    }

    function la(t) {
        return t.endAngle
    }

    function ca(t) {
        function e(e) {
            function a() {
                u.push("M", o(t(l), s))
            }
            for (var u = [], l = [], c = -1, f = e.length, h, d = Ee(n), p = Ee(r); ++c < f;) i.call(this, h = e[c], c) ? l.push([+d.call(this, h, c), +p.call(this, h, c)]) : l.length && (a(), l = []);
            return l.length && a(), u.length ? u.join("") : null
        }
        var n = Tr,
            r = Ar,
            i = Tn,
            o = fa,
            a = o.key,
            s = .7;
        return e.x = function(t) {
            return arguments.length ? (n = t, e) : n
        }, e.y = function(t) {
            return arguments.length ? (r = t, e) : r
        }, e.defined = function(t) {
            return arguments.length ? (i = t, e) : i
        }, e.interpolate = function(t) {
            return arguments.length ? (a = "function" == typeof t ? o = t : (o = kl.get(t) || fa).key, e) : a
        }, e.tension = function(t) {
            return arguments.length ? (s = t, e) : s
        }, e
    }

    function fa(t) {
        return t.join("L")
    }

    function ha(t) {
        return fa(t) + "Z"
    }

    function da(t) {
        for (var e = 0, n = t.length, r = t[0], i = [r[0], ",", r[1]]; ++e < n;) i.push("H", (r[0] + (r = t[e])[0]) / 2, "V", r[1]);
        return n > 1 && i.push("H", r[0]), i.join("")
    }

    function pa(t) {
        for (var e = 0, n = t.length, r = t[0], i = [r[0], ",", r[1]]; ++e < n;) i.push("V", (r = t[e])[1], "H", r[0]);
        return i.join("")
    }

    function ga(t) {
        for (var e = 0, n = t.length, r = t[0], i = [r[0], ",", r[1]]; ++e < n;) i.push("H", (r = t[e])[0], "V", r[1]);
        return i.join("")
    }

    function ma(t, e) {
        return t.length < 4 ? fa(t) : t[1] + ba(t.slice(1, t.length - 1), xa(t, e))
    }

    function va(t, e) {
        return t.length < 3 ? fa(t) : t[0] + ba((t.push(t[0]), t), xa([t[t.length - 2]].concat(t, [t[1]]), e))
    }

    function ya(t, e) {
        return t.length < 3 ? fa(t) : t[0] + ba(t, xa(t, e))
    }

    function ba(t, e) {
        if (e.length < 1 || t.length != e.length && t.length != e.length + 2) return fa(t);
        var n = t.length != e.length,
            r = "",
            i = t[0],
            o = t[1],
            a = e[0],
            s = a,
            u = 1;
        if (n && (r += "Q" + (o[0] - 2 * a[0] / 3) + "," + (o[1] - 2 * a[1] / 3) + "," + o[0] + "," + o[1], i = t[1], u = 2), e.length > 1) {
            s = e[1], o = t[u], u++, r += "C" + (i[0] + a[0]) + "," + (i[1] + a[1]) + "," + (o[0] - s[0]) + "," + (o[1] - s[1]) + "," + o[0] + "," + o[1];
            for (var l = 2; l < e.length; l++, u++) o = t[u], s = e[l], r += "S" + (o[0] - s[0]) + "," + (o[1] - s[1]) + "," + o[0] + "," + o[1]
        }
        if (n) {
            var c = t[u];
            r += "Q" + (o[0] + 2 * s[0] / 3) + "," + (o[1] + 2 * s[1] / 3) + "," + c[0] + "," + c[1]
        }
        return r
    }

    function xa(t, e) {
        for (var n = [], r = (1 - e) / 2, i, o = t[0], a = t[1], s = 1, u = t.length; ++s < u;) i = o, o = a, a = t[s], n.push([r * (a[0] - i[0]), r * (a[1] - i[1])]);
        return n
    }

    function wa(t) {
        if (t.length < 3) return fa(t);
        var e = 1,
            n = t.length,
            r = t[0],
            i = r[0],
            o = r[1],
            a = [i, i, i, (r = t[1])[0]],
            s = [o, o, o, r[1]],
            u = [i, ",", o, "L", Na(El, a), ",", Na(El, s)];
        for (t.push(t[n - 1]); ++e <= n;) r = t[e], a.shift(), a.push(r[0]), s.shift(), s.push(r[1]), Ca(u, a, s);
        return t.pop(), u.push("L", r), u.join("")
    }

    function _a(t) {
        if (t.length < 4) return fa(t);
        for (var e = [], n = -1, r = t.length, i, o = [0], a = [0]; ++n < 3;) i = t[n], o.push(i[0]), a.push(i[1]);
        for (e.push(Na(El, o) + "," + Na(El, a)), --n; ++n < r;) i = t[n], o.shift(), o.push(i[0]), a.shift(), a.push(i[1]), Ca(e, o, a);
        return e.join("")
    }

    function Ma(t) {
        for (var e, n = -1, r = t.length, i = r + 4, o, a = [], s = []; ++n < 4;) o = t[n % r], a.push(o[0]), s.push(o[1]);
        for (e = [Na(El, a), ",", Na(El, s)], --n; ++n < i;) o = t[n % r], a.shift(), a.push(o[0]), s.shift(), s.push(o[1]), Ca(e, a, s);
        return e.join("")
    }

    function ka(t, e) {
        var n = t.length - 1;
        if (n)
            for (var r = t[0][0], i = t[0][1], o = t[n][0] - r, a = t[n][1] - i, s = -1, u, l; ++s <= n;) u = t[s], l = s / n, u[0] = e * u[0] + (1 - e) * (r + l * o), u[1] = e * u[1] + (1 - e) * (i + l * a);
        return wa(t)
    }

    function Na(t, e) {
        return t[0] * e[0] + t[1] * e[1] + t[2] * e[2] + t[3] * e[3]
    }

    function Ca(t, e, n) {
        t.push("C", Na(Nl, e), ",", Na(Nl, n), ",", Na(Cl, e), ",", Na(Cl, n), ",", Na(El, e), ",", Na(El, n))
    }

    function Ea(t, e) {
        return (e[1] - t[1]) / (e[0] - t[0])
    }

    function Sa(t) {
        for (var e = 0, n = t.length - 1, r = [], i = t[0], o = t[1], a = r[0] = Ea(i, o); ++e < n;) r[e] = (a + (a = Ea(i = o, o = t[e + 1]))) / 2;
        return r[e] = a, r
    }

    function Ta(t) {
        for (var e = [], n, r, i, o, a = Sa(t), s = -1, u = t.length - 1; ++s < u;) n = Ea(t[s], t[s + 1]), cs(n) < As ? a[s] = a[s + 1] = 0 : (r = a[s] / n, i = a[s + 1] / n, o = r * r + i * i, o > 9 && (o = 3 * n / Math.sqrt(o), a[s] = o * r, a[s + 1] = o * i));
        for (s = -1; ++s <= u;) o = (t[Math.min(u, s + 1)][0] - t[Math.max(0, s - 1)][0]) / (6 * (1 + a[s] * a[s])), e.push([o || 0, a[s] * o || 0]);
        return e
    }

    function Aa(t) {
        return t.length < 3 ? fa(t) : t[0] + ba(t, Ta(t))
    }

    function $a(t) {
        for (var e, n = -1, r = t.length, i, o; ++n < r;) e = t[n], i = e[0], o = e[1] + _l, e[0] = i * Math.cos(o), e[1] = i * Math.sin(o);
        return t
    }

    function La(t) {
        function e(e) {
            function u() {
                h.push("M", s(t(p), f), c, l(t(d.reverse()), f), "Z")
            }
            for (var h = [], d = [], p = [], g = -1, m = e.length, v, y = Ee(n), b = Ee(i), x = n === r ? function() {
                    return _
                } : Ee(r), w = i === o ? function() {
                    return M
                } : Ee(o), _, M; ++g < m;) a.call(this, v = e[g], g) ? (d.push([_ = +y.call(this, v, g), M = +b.call(this, v, g)]), p.push([+x.call(this, v, g), +w.call(this, v, g)])) : d.length && (u(), d = [], p = []);
            return d.length && u(), h.length ? h.join("") : null
        }
        var n = Tr,
            r = Tr,
            i = 0,
            o = Ar,
            a = Tn,
            s = fa,
            u = s.key,
            l = s,
            c = "L",
            f = .7;
        return e.x = function(t) {
            return arguments.length ? (n = r = t, e) : r
        }, e.x0 = function(t) {
            return arguments.length ? (n = t, e) : n
        }, e.x1 = function(t) {
            return arguments.length ? (r = t, e) : r
        }, e.y = function(t) {
            return arguments.length ? (i = o = t, e) : o
        }, e.y0 = function(t) {
            return arguments.length ? (i = t, e) : i
        }, e.y1 = function(t) {
            return arguments.length ? (o = t, e) : o
        }, e.defined = function(t) {
            return arguments.length ? (a = t, e) : a
        }, e.interpolate = function(t) {
            return arguments.length ? (u = "function" == typeof t ? s = t : (s = kl.get(t) || fa).key, l = s.reverse || s, c = s.closed ? "M" : "L", e) : u
        }, e.tension = function(t) {
            return arguments.length ? (f = t, e) : f
        }, e
    }

    function ja(t) {
        return t.radius
    }

    function Da(t) {
        return [t.x, t.y]
    }

    function qa(t) {
        return function() {
            var e = t.apply(this, arguments),
                n = e[0],
                r = e[1] + _l;
            return [n * Math.cos(r), n * Math.sin(r)]
        }
    }

    function Ra() {
        return 64
    }

    function za() {
        return "circle"
    }

    function Ia(t) {
        var e = Math.sqrt(t / Es);
        return "M0," + e + "A" + e + "," + e + " 0 1,1 0," + -e + "A" + e + "," + e + " 0 1,1 0," + e + "Z"
    }

    function Ba(t, e) {
        return gs(t, $l), t.id = e, t
    }

    function Oa(t, e, n, r) {
        var i = t.id;
        return z(t, "function" == typeof n ? function(t, o, a) {
            t.__transition__[i].tween.set(e, r(n.call(t, t.__data__, o, a)))
        } : (n = r(n), function(t) {
            t.__transition__[i].tween.set(e, n)
        }))
    }

    function Pa(t) {
        return null == t && (t = ""),
            function() {
                this.textContent = t
            }
    }

    function Ha(t, e, n, r) {
        var i = t.__transition__ || (t.__transition__ = {
                active: 0,
                count: 0
            }),
            o = i[n];
        if (!o) {
            var s = r.time;
            o = i[n] = {
                tween: new a,
                time: s,
                ease: r.ease,
                delay: r.delay,
                duration: r.duration
            }, ++i.count, Qa.timer(function(r) {
                function a(r) {
                    return i.active > n ? l() : (i.active = n, o.event && o.event.start.call(t, c, e), o.tween.forEach(function(n, r) {
                        (r = r.call(t, c, e)) && g.push(r)
                    }), void Qa.timer(function() {
                        return p.c = u(r || 1) ? Tn : u, 1
                    }, 0, s))
                }

                function u(r) {
                    if (i.active !== n) return l();
                    for (var a = r / d, s = f(a), u = g.length; u > 0;) g[--u].call(t, s);
                    return a >= 1 ? (o.event && o.event.end.call(t, c, e), l()) : void 0
                }

                function l() {
                    return --i.count ? delete i[n] : delete t.__transition__, 1
                }
                var c = t.__data__,
                    f = o.ease,
                    h = o.delay,
                    d = o.duration,
                    p = Js,
                    g = [];
                return p.t = h + s, r >= h ? a(r - h) : void(p.c = a)
            }, 0, s)
        }
    }

    function Fa(t, e) {
        t.attr("transform", function(t) {
            return "translate(" + e(t) + ",0)"
        })
    }

    function Ua(t, e) {
        t.attr("transform", function(t) {
            return "translate(0," + e(t) + ")"
        })
    }

    function Wa(t) {
        return t.toISOString()
    }

    function Va(t, e, n) {
        function r(e) {
            return t(e)
        }

        function i(t, n) {
            var r = t[1] - t[0],
                i = r / n,
                o = Qa.bisect(Hl, i);
            return o == Hl.length ? [e.year, Zo(t.map(function(t) {
                return t / 31536e6
            }), n)[2]] : o ? e[i / Hl[o - 1] < Hl[o] / i ? o - 1 : o] : [Wl, Zo(t, n)[2]]
        }
        return r.invert = function(e) {
            return Za(t.invert(e))
        }, r.domain = function(e) {
            return arguments.length ? (t.domain(e), r) : t.domain().map(Za)
        }, r.nice = function(t, e) {
            function n(n) {
                return !isNaN(n) && !t.range(n, Za(+n + 1), e).length
            }
            var o = r.domain(),
                a = Io(o),
                s = null == t ? i(a, 10) : "number" == typeof t && i(a, t);
            return s && (t = s[0], e = s[1]), r.domain(Po(o, e > 1 ? {
                floor: function(e) {
                    for (; n(e = t.floor(e));) e = Za(e - 1);
                    return e
                },
                ceil: function(e) {
                    for (; n(e = t.ceil(e));) e = Za(+e + 1);
                    return e
                }
            } : t))
        }, r.ticks = function(t, e) {
            var n = Io(r.domain()),
                o = null == t ? i(n, 10) : "number" == typeof t ? i(n, t) : !t.range && [{
                    range: t
                }, e];
            return o && (t = o[0], e = o[1]), t.range(n[0], Za(+n[1] + 1), 1 > e ? 1 : e)
        }, r.tickFormat = function() {
            return n
        }, r.copy = function() {
            return Va(t.copy(), e, n)
        }, Wo(r, t)
    }

    function Za(t) {
        return new Date(t)
    }

    function Ya(t) {
        return JSON.parse(t.responseText)
    }

    function Xa(t) {
        var e = Ja.createRange();
        return e.selectNode(Ja.body), e.createContextualFragment(t.responseText)
    }
    var Qa = {
        version: "3.4.8"
    };
    Date.now || (Date.now = function() {
        return +new Date
    });
    var Ka = [].slice,
        Ga = function(t) {
            return Ka.call(t)
        },
        Ja = document,
        ts = Ja.documentElement,
        es = window;
    try {
        Ga(ts.childNodes)[0].nodeType
    } catch (ns) {
        Ga = function(t) {
            for (var e = t.length, n = new Array(e); e--;) n[e] = t[e];
            return n
        }
    }
    try {
        Ja.createElement("div").style.setProperty("opacity", 0, "")
    } catch (rs) {
        var is = es.Element.prototype,
            os = is.setAttribute,
            as = is.setAttributeNS,
            ss = es.CSSStyleDeclaration.prototype,
            us = ss.setProperty;
        is.setAttribute = function(t, e) {
            os.call(this, t, e + "")
        }, is.setAttributeNS = function(t, e, n) {
            as.call(this, t, e, n + "")
        }, ss.setProperty = function(t, e, n) {
            us.call(this, t, e + "", n)
        }
    }
    Qa.ascending = t, Qa.descending = function(t, e) {
        return t > e ? -1 : e > t ? 1 : e >= t ? 0 : 0 / 0
    }, Qa.min = function(t, e) {
        var n = -1,
            r = t.length,
            i, o;
        if (1 === arguments.length) {
            for (; ++n < r && !(null != (i = t[n]) && i >= i);) i = void 0;
            for (; ++n < r;) null != (o = t[n]) && i > o && (i = o)
        } else {
            for (; ++n < r && !(null != (i = e.call(t, t[n], n)) && i >= i);) i = void 0;
            for (; ++n < r;) null != (o = e.call(t, t[n], n)) && i > o && (i = o)
        }
        return i
    }, Qa.max = function(t, e) {
        var n = -1,
            r = t.length,
            i, o;
        if (1 === arguments.length) {
            for (; ++n < r && !(null != (i = t[n]) && i >= i);) i = void 0;
            for (; ++n < r;) null != (o = t[n]) && o > i && (i = o)
        } else {
            for (; ++n < r && !(null != (i = e.call(t, t[n], n)) && i >= i);) i = void 0;
            for (; ++n < r;) null != (o = e.call(t, t[n], n)) && o > i && (i = o)
        }
        return i
    }, Qa.extent = function(t, e) {
        var n = -1,
            r = t.length,
            i, o, a;
        if (1 === arguments.length) {
            for (; ++n < r && !(null != (i = a = t[n]) && i >= i);) i = a = void 0;
            for (; ++n < r;) null != (o = t[n]) && (i > o && (i = o), o > a && (a = o))
        } else {
            for (; ++n < r && !(null != (i = a = e.call(t, t[n], n)) && i >= i);) i = void 0;
            for (; ++n < r;) null != (o = e.call(t, t[n], n)) && (i > o && (i = o), o > a && (a = o))
        }
        return [i, a]
    }, Qa.sum = function(t, e) {
        var n = 0,
            r = t.length,
            i, o = -1;
        if (1 === arguments.length)
            for (; ++o < r;) isNaN(i = +t[o]) || (n += i);
        else
            for (; ++o < r;) isNaN(i = +e.call(t, t[o], o)) || (n += i);
        return n
    }, Qa.mean = function(t, n) {
        var r = 0,
            i = t.length,
            o, a = -1,
            s = i;
        if (1 === arguments.length)
            for (; ++a < i;) e(o = t[a]) ? r += o : --s;
        else
            for (; ++a < i;) e(o = n.call(t, t[a], a)) ? r += o : --s;
        return s ? r / s : void 0
    }, Qa.quantile = function(t, e) {
        var n = (t.length - 1) * e + 1,
            r = Math.floor(n),
            i = +t[r - 1],
            o = n - r;
        return o ? i + o * (t[r] - i) : i
    }, Qa.median = function(n, r) {
        return arguments.length > 1 && (n = n.map(r)), n = n.filter(e), n.length ? Qa.quantile(n.sort(t), .5) : void 0
    };
    var ls = n(t);
    Qa.bisectLeft = ls.left, Qa.bisect = Qa.bisectRight = ls.right, Qa.bisector = function(e) {
        return n(1 === e.length ? function(n, r) {
            return t(e(n), r)
        } : e)
    }, Qa.shuffle = function(t) {
        for (var e = t.length, n, r; e;) r = Math.random() * e-- | 0, n = t[e], t[e] = t[r], t[r] = n;
        return t
    }, Qa.permute = function(t, e) {
        for (var n = e.length, r = new Array(n); n--;) r[n] = t[e[n]];
        return r
    }, Qa.pairs = function(t) {
        for (var e = 0, n = t.length - 1, r, i = t[0], o = new Array(0 > n ? 0 : n); n > e;) o[e] = [r = i, i = t[++e]];
        return o
    }, Qa.zip = function() {
        if (!(o = arguments.length)) return [];
        for (var t = -1, e = Qa.min(arguments, r), n = new Array(e); ++t < e;)
            for (var i = -1, o, a = n[t] = new Array(o); ++i < o;) a[i] = arguments[i][t];
        return n
    }, Qa.transpose = function(t) {
        return Qa.zip.apply(Qa, t)
    }, Qa.keys = function(t) {
        var e = [];
        for (var n in t) e.push(n);
        return e
    }, Qa.values = function(t) {
        var e = [];
        for (var n in t) e.push(t[n]);
        return e
    }, Qa.entries = function(t) {
        var e = [];
        for (var n in t) e.push({
            key: n,
            value: t[n]
        });
        return e
    }, Qa.merge = function(t) {
        for (var e = t.length, n, r = -1, i = 0, o, a; ++r < e;) i += t[r].length;
        for (o = new Array(i); --e >= 0;)
            for (a = t[e], n = a.length; --n >= 0;) o[--i] = a[n];
        return o
    };
    var cs = Math.abs;
    Qa.range = function(t, e, n) {
        if (arguments.length < 3 && (n = 1, arguments.length < 2 && (e = t, t = 0)), (e - t) / n === 1 / 0) throw new Error("infinite range");
        var r = [],
            o = i(cs(n)),
            a = -1,
            s;
        if (t *= o, e *= o, n *= o, 0 > n)
            for (;
                (s = t + n * ++a) > e;) r.push(s / o);
        else
            for (;
                (s = t + n * ++a) < e;) r.push(s / o);
        return r
    }, Qa.map = function(t) {
        var e = new a;
        if (t instanceof a) t.forEach(function(t, n) {
            e.set(t, n)
        });
        else
            for (var n in t) e.set(n, t[n]);
        return e
    }, o(a, {
        has: s,
        get: function(t) {
            return this[fs + t]
        },
        set: function(t, e) {
            return this[fs + t] = e
        },
        remove: u,
        keys: l,
        values: function() {
            var t = [];
            return this.forEach(function(e, n) {
                t.push(n)
            }), t
        },
        entries: function() {
            var t = [];
            return this.forEach(function(e, n) {
                t.push({
                    key: e,
                    value: n
                })
            }), t
        },
        size: c,
        empty: f,
        forEach: function(t) {
            for (var e in this) e.charCodeAt(0) === hs && t.call(this, e.substring(1), this[e])
        }
    });
    var fs = "\x00",
        hs = fs.charCodeAt(0);
    Qa.nest = function() {
        function t(e, i, u) {
            if (u >= r.length) return s ? s.call(n, i) : o ? i.sort(o) : i;
            for (var l = -1, c = i.length, f = r[u++], h, d, p, g = new a, m; ++l < c;)(m = g.get(h = f(d = i[l]))) ? m.push(d) : g.set(h, [d]);
            return e ? (d = e(), p = function(n, r) {
                d.set(n, t(e, r, u))
            }) : (d = {}, p = function(n, r) {
                d[n] = t(e, r, u)
            }), g.forEach(p), d
        }

        function e(t, n) {
            if (n >= r.length) return t;
            var o = [],
                a = i[n++];
            return t.forEach(function(t, r) {
                o.push({
                    key: t,
                    values: e(r, n)
                })
            }), a ? o.sort(function(t, e) {
                return a(t.key, e.key)
            }) : o
        }
        var n = {},
            r = [],
            i = [],
            o, s;
        return n.map = function(e, n) {
            return t(n, e, 0)
        }, n.entries = function(n) {
            return e(t(Qa.map, n, 0), 0)
        }, n.key = function(t) {
            return r.push(t), n
        }, n.sortKeys = function(t) {
            return i[r.length - 1] = t, n
        }, n.sortValues = function(t) {
            return o = t, n
        }, n.rollup = function(t) {
            return s = t, n
        }, n
    }, Qa.set = function(t) {
        var e = new h;
        if (t)
            for (var n = 0, r = t.length; r > n; ++n) e.add(t[n]);
        return e
    }, o(h, {
        has: s,
        add: function(t) {
            return this[fs + t] = !0, t
        },
        remove: function(t) {
            return t = fs + t, t in this && delete this[t]
        },
        values: l,
        size: c,
        empty: f,
        forEach: function(t) {
            for (var e in this) e.charCodeAt(0) === hs && t.call(this, e.substring(1))
        }
    }), Qa.behavior = {}, Qa.rebind = function(t, e) {
        for (var n = 1, r = arguments.length, i; ++n < r;) t[i = arguments[n]] = d(t, e, e[i]);
        return t
    };
    var ds = ["webkit", "ms", "moz", "Moz", "o", "O"];
    Qa.dispatch = function() {
        for (var t = new m, e = -1, n = arguments.length; ++e < n;) t[arguments[e]] = v(t);
        return t
    }, m.prototype.on = function(t, e) {
        var n = t.indexOf("."),
            r = "";
        if (n >= 0 && (r = t.substring(n + 1), t = t.substring(0, n)), t) return arguments.length < 2 ? this[t].on(r) : this[t].on(r, e);
        if (2 === arguments.length) {
            if (null == e)
                for (t in this) this.hasOwnProperty(t) && this[t].on(r, null);
            return this
        }
    }, Qa.event = null, Qa.requote = function(t) {
        return t.replace(ps, "\\$&")
    };
    var ps = /[\\\^\$\*\+\?\|\[\]\(\)\.\{\}]/g,
        gs = {}.__proto__ ? function(t, e) {
            t.__proto__ = e
        } : function(t, e) {
            for (var n in e) t[n] = e[n]
        },
        ms = function(t, e) {
            return e.querySelector(t)
        },
        vs = function(t, e) {
            return e.querySelectorAll(t)
        },
        ys = ts[p(ts, "matchesSelector")],
        bs = function(t, e) {
            return ys.call(t, e)
        };
    "function" == typeof Sizzle && (ms = function(t, e) {
        return Sizzle(t, e)[0] || null
    }, vs = Sizzle, bs = Sizzle.matchesSelector), Qa.selection = function() {
        return Ms
    };
    var xs = Qa.selection.prototype = [];
    xs.select = function(t) {
        var e = [],
            n, r, i, o;
        t = _(t);
        for (var a = -1, s = this.length; ++a < s;) {
            e.push(n = []), n.parentNode = (i = this[a]).parentNode;
            for (var u = -1, l = i.length; ++u < l;)(o = i[u]) ? (n.push(r = t.call(o, o.__data__, u, a)), r && "__data__" in o && (r.__data__ = o.__data__)) : n.push(null)
        }
        return w(e)
    }, xs.selectAll = function(t) {
        var e = [],
            n, r;
        t = M(t);
        for (var i = -1, o = this.length; ++i < o;)
            for (var a = this[i], s = -1, u = a.length; ++s < u;)(r = a[s]) && (e.push(n = Ga(t.call(r, r.__data__, s, i))), n.parentNode = r);
        return w(e)
    };
    var ws = {
        svg: "http://www.w3.org/2000/svg",
        xhtml: "http://www.w3.org/1999/xhtml",
        xlink: "http://www.w3.org/1999/xlink",
        xml: "http://www.w3.org/XML/1998/namespace",
        xmlns: "http://www.w3.org/2000/xmlns/"
    };
    Qa.ns = {
        prefix: ws,
        qualify: function(t) {
            var e = t.indexOf(":"),
                n = t;
            return e >= 0 && (n = t.substring(0, e), t = t.substring(e + 1)), ws.hasOwnProperty(n) ? {
                space: ws[n],
                local: t
            } : t
        }
    }, xs.attr = function(t, e) {
        if (arguments.length < 2) {
            if ("string" == typeof t) {
                var n = this.node();
                return t = Qa.ns.qualify(t), t.local ? n.getAttributeNS(t.space, t.local) : n.getAttribute(t)
            }
            for (e in t) this.each(k(e, t[e]));
            return this
        }
        return this.each(k(t, e))
    }, xs.classed = function(t, e) {
        if (arguments.length < 2) {
            if ("string" == typeof t) {
                var n = this.node(),
                    r = (t = E(t)).length,
                    i = -1;
                if (e = n.classList) {
                    for (; ++i < r;)
                        if (!e.contains(t[i])) return !1
                } else
                    for (e = n.getAttribute("class"); ++i < r;)
                        if (!C(t[i]).test(e)) return !1;
                return !0
            }
            for (e in t) this.each(S(e, t[e]));
            return this
        }
        return this.each(S(t, e))
    }, xs.style = function(t, e, n) {
        var r = arguments.length;
        if (3 > r) {
            if ("string" != typeof t) {
                2 > r && (e = "");
                for (n in t) this.each(A(n, t[n], e));
                return this
            }
            if (2 > r) return es.getComputedStyle(this.node(), null).getPropertyValue(t);
            n = ""
        }
        return this.each(A(t, e, n))
    }, xs.property = function(t, e) {
        if (arguments.length < 2) {
            if ("string" == typeof t) return this.node()[t];
            for (e in t) this.each(L(e, t[e]));
            return this
        }
        return this.each(L(t, e))
    }, xs.text = function(t) {
        return arguments.length ? this.each("function" == typeof t ? function() {
            var e = t.apply(this, arguments);
            this.textContent = null == e ? "" : e
        } : null == t ? function() {
            this.textContent = ""
        } : function() {
            this.textContent = t
        }) : this.node().textContent
    }, xs.html = function(t) {
        return arguments.length ? this.each("function" == typeof t ? function() {
            var e = t.apply(this, arguments);
            this.innerHTML = null == e ? "" : e
        } : null == t ? function() {
            this.innerHTML = ""
        } : function() {
            this.innerHTML = t
        }) : this.node().innerHTML
    }, xs.append = function(t) {
        return t = j(t), this.select(function() {
            return this.appendChild(t.apply(this, arguments))
        })
    }, xs.insert = function(t, e) {
        return t = j(t), e = _(e), this.select(function() {
            return this.insertBefore(t.apply(this, arguments), e.apply(this, arguments) || null)
        })
    }, xs.remove = function() {
        return this.each(function() {
            var t = this.parentNode;
            t && t.removeChild(this)
        })
    }, xs.data = function(t, e) {
        function n(t, n) {
            var r, i = t.length,
                o = n.length,
                s = Math.min(i, o),
                f = new Array(o),
                h = new Array(o),
                d = new Array(i),
                p, g;
            if (e) {
                var m = new a,
                    v = new a,
                    y = [],
                    b;
                for (r = -1; ++r < i;) b = e.call(p = t[r], p.__data__, r), m.has(b) ? d[r] = p : m.set(b, p), y.push(b);
                for (r = -1; ++r < o;) b = e.call(n, g = n[r], r), (p = m.get(b)) ? (f[r] = p, p.__data__ = g) : v.has(b) || (h[r] = D(g)), v.set(b, g), m.remove(b);
                for (r = -1; ++r < i;) m.has(y[r]) && (d[r] = t[r])
            } else {
                for (r = -1; ++r < s;) p = t[r], g = n[r], p ? (p.__data__ = g, f[r] = p) : h[r] = D(g);
                for (; o > r; ++r) h[r] = D(n[r]);
                for (; i > r; ++r) d[r] = t[r]
            }
            h.update = f, h.parentNode = f.parentNode = d.parentNode = t.parentNode, u.push(h), l.push(f), c.push(d)
        }
        var r = -1,
            i = this.length,
            o, s;
        if (!arguments.length) {
            for (t = new Array(i = (o = this[0]).length); ++r < i;)(s = o[r]) && (t[r] = s.__data__);
            return t
        }
        var u = I([]),
            l = w([]),
            c = w([]);
        if ("function" == typeof t)
            for (; ++r < i;) n(o = this[r], t.call(o, o.parentNode.__data__, r));
        else
            for (; ++r < i;) n(o = this[r], t);
        return l.enter = function() {
            return u
        }, l.exit = function() {
            return c
        }, l
    }, xs.datum = function(t) {
        return arguments.length ? this.property("__data__", t) : this.property("__data__")
    }, xs.filter = function(t) {
        var e = [],
            n, r, i;
        "function" != typeof t && (t = q(t));
        for (var o = 0, a = this.length; a > o; o++) {
            e.push(n = []), n.parentNode = (r = this[o]).parentNode;
            for (var s = 0, u = r.length; u > s; s++)(i = r[s]) && t.call(i, i.__data__, s, o) && n.push(i)
        }
        return w(e)
    }, xs.order = function() {
        for (var t = -1, e = this.length; ++t < e;)
            for (var n = this[t], r = n.length - 1, i = n[r], o; --r >= 0;)(o = n[r]) && (i && i !== o.nextSibling && i.parentNode.insertBefore(o, i), i = o);
        return this
    }, xs.sort = function(t) {
        t = R.apply(this, arguments);
        for (var e = -1, n = this.length; ++e < n;) this[e].sort(t);
        return this.order()
    }, xs.each = function(t) {
        return z(this, function(e, n, r) {
            t.call(e, e.__data__, n, r)
        })
    }, xs.call = function(t) {
        var e = Ga(arguments);
        return t.apply(e[0] = this, e), this
    }, xs.empty = function() {
        return !this.node()
    }, xs.node = function() {
        for (var t = 0, e = this.length; e > t; t++)
            for (var n = this[t], r = 0, i = n.length; i > r; r++) {
                var o = n[r];
                if (o) return o
            }
        return null
    }, xs.size = function() {
        var t = 0;
        return this.each(function() {
            ++t
        }), t
    };
    var _s = [];
    Qa.selection.enter = I, Qa.selection.enter.prototype = _s, _s.append = xs.append, _s.empty = xs.empty, _s.node = xs.node, _s.call = xs.call, _s.size = xs.size, _s.select = function(t) {
        for (var e = [], n, r, i, o, a, s = -1, u = this.length; ++s < u;) {
            i = (o = this[s]).update, e.push(n = []), n.parentNode = o.parentNode;
            for (var l = -1, c = o.length; ++l < c;)(a = o[l]) ? (n.push(i[l] = r = t.call(o.parentNode, a.__data__, l, s)), r.__data__ = a.__data__) : n.push(null)
        }
        return w(e)
    }, _s.insert = function(t, e) {
        return arguments.length < 2 && (e = B(this)), xs.insert.call(this, t, e)
    }, xs.transition = function() {
        for (var t = jl || ++Ll, e = [], n, r, i = Dl || {
                time: Date.now(),
                ease: Ni,
                delay: 0,
                duration: 250
            }, o = -1, a = this.length; ++o < a;) {
            e.push(n = []);
            for (var s = this[o], u = -1, l = s.length; ++u < l;)(r = s[u]) && Ha(r, u, t, i), n.push(r)
        }
        return Ba(e, t)
    }, xs.interrupt = function() {
        return this.each(O)
    }, Qa.select = function(t) {
        var e = ["string" == typeof t ? ms(t, Ja) : t];
        return e.parentNode = ts, w([e])
    }, Qa.selectAll = function(t) {
        var e = Ga("string" == typeof t ? vs(t, Ja) : t);
        return e.parentNode = ts, w([e])
    };
    var Ms = Qa.select(ts);
    xs.on = function(t, e, n) {
        var r = arguments.length;
        if (3 > r) {
            if ("string" != typeof t) {
                2 > r && (e = !1);
                for (n in t) this.each(P(n, t[n], e));
                return this
            }
            if (2 > r) return (r = this.node()["__on" + t]) && r._;
            n = !1
        }
        return this.each(P(t, e, n))
    };
    var ks = Qa.map({
        mouseenter: "mouseover",
        mouseleave: "mouseout"
    });
    ks.forEach(function(t) {
        "on" + t in Ja && ks.remove(t)
    });
    var Ns = "onselectstart" in Ja ? null : p(ts.style, "userSelect"),
        Cs = 0;
    Qa.mouse = function(t) {
        return W(t, b())
    }, Qa.touches = function(t, e) {
        return arguments.length < 2 && (e = b().touches), e ? Ga(e).map(function(e) {
            var n = W(t, e);
            return n.identifier = e.identifier, n
        }) : []
    }, Qa.behavior.drag = function() {
        function t() {
            this.on("mousedown.drag", i).on("touchstart.drag", o)
        }

        function e(t, e, i, o, a) {
            return function() {
                function s() {
                    var t = e(f, p),
                        n, r;
                    t && (n = t[0] - b[0], r = t[1] - b[1], d |= n | r, b = t, h({
                        type: "drag",
                        x: t[0] + m[0],
                        y: t[1] + m[1],
                        dx: n,
                        dy: r
                    }))
                }

                function u() {
                    e(f, p) && (v.on(o + g, null).on(a + g, null), y(d && Qa.event.target === c), h({
                        type: "dragend"
                    }))
                }
                var l = this,
                    c = Qa.event.target,
                    f = l.parentNode,
                    h = n.of(l, arguments),
                    d = 0,
                    p = t(),
                    g = ".drag" + (null == p ? "" : "-" + p),
                    m, v = Qa.select(i()).on(o + g, s).on(a + g, u),
                    y = U(),
                    b = e(f, p);
                r ? (m = r.apply(l, arguments), m = [m.x - b[0], m.y - b[1]]) : m = [0, 0], h({
                    type: "dragstart"
                })
            }
        }
        var n = x(t, "drag", "dragstart", "dragend"),
            r = null,
            i = e(g, Qa.mouse, Y, "mousemove", "mouseup"),
            o = e(V, Qa.touch, Z, "touchmove", "touchend");
        return t.origin = function(e) {
            return arguments.length ? (r = e, t) : r
        }, Qa.rebind(t, n, "on")
    };
    var Es = Math.PI,
        Ss = 2 * Es,
        Ts = Es / 2,
        As = 1e-6,
        $s = As * As,
        Ls = Es / 180,
        js = 180 / Es,
        Ds = Math.SQRT2,
        qs = 2,
        Rs = 4;
    Qa.interpolateZoom = function(t, e) {
        function n(t) {
            var e = t * y;
            if (v) {
                var n = te(g),
                    a = o / (qs * h) * (n * ee(Ds * e + g) - J(g));
                return [r + a * l, i + a * c, o * n / te(Ds * e + g)]
            }
            return [r + t * l, i + t * c, o * Math.exp(Ds * e)]
        }
        var r = t[0],
            i = t[1],
            o = t[2],
            a = e[0],
            s = e[1],
            u = e[2],
            l = a - r,
            c = s - i,
            f = l * l + c * c,
            h = Math.sqrt(f),
            d = (u * u - o * o + Rs * f) / (2 * o * qs * h),
            p = (u * u - o * o - Rs * f) / (2 * u * qs * h),
            g = Math.log(Math.sqrt(d * d + 1) - d),
            m = Math.log(Math.sqrt(p * p + 1) - p),
            v = m - g,
            y = (v || Math.log(u / o)) / Ds;
        return n.duration = 1e3 * y, n
    }, Qa.behavior.zoom = function() {
        function t(t) {
            t.on(w, l).on(Bs + ".zoom", f).on(_, h).on("dblclick.zoom", d).on(N, c)
        }

        function e(t) {
            return [(t[0] - p.x) / p.k, (t[1] - p.y) / p.k]
        }

        function n(t) {
            return [t[0] * p.k + p.x, t[1] * p.k + p.y]
        }

        function r(t) {
            p.k = Math.max(b[0], Math.min(b[1], t))
        }

        function i(t, e) {
            e = n(e), p.x += t[0] - e[0], p.y += t[1] - e[1]
        }

        function o() {
            T && T.domain(S.range().map(function(t) {
                return (t - p.x) / p.k
            }).map(S.invert)), L && L.domain(A.range().map(function(t) {
                return (t - p.y) / p.k
            }).map(A.invert))
        }

        function a(t) {
            t({
                type: "zoomstart"
            })
        }

        function s(t) {
            o(), t({
                type: "zoom",
                scale: p.k,
                translate: [p.x, p.y]
            })
        }

        function u(t) {
            t({
                type: "zoomend"
            })
        }

        function l() {
            function t() {
                c = 1, i(Qa.mouse(r), d), s(l)
            }

            function n() {
                f.on(_, es === r ? h : null).on(M, null), p(c && Qa.event.target === o), u(l)
            }
            var r = this,
                o = Qa.event.target,
                l = E.of(r, arguments),
                c = 0,
                f = Qa.select(es).on(_, t).on(M, n),
                d = e(Qa.mouse(r)),
                p = U();
            O.call(r), a(l)
        }

        function c() {
            function t() {
                var t = Qa.touches(h);
                return v = p.k, t.forEach(function(t) {
                    t.identifier in g && (g[t.identifier] = e(t))
                }), t
            }

            function n() {
                var e = Qa.event.target;
                Qa.select(e).on(x, o).on(_, f), M.push(e);
                for (var n = Qa.event.changedTouches, a = 0, u = n.length; u > a; ++a) g[n[a].identifier] = null;
                var l = t(),
                    c = Date.now();
                if (1 === l.length) {
                    if (500 > c - C) {
                        var h = l[0],
                            v = g[h.identifier];
                        r(2 * p.k), i(h, v), y(), s(d)
                    }
                    C = c
                } else if (l.length > 1) {
                    var h = l[0],
                        b = l[1],
                        w = h[0] - b[0],
                        k = h[1] - b[1];
                    m = w * w + k * k
                }
            }

            function o() {
                for (var t = Qa.touches(h), e, n, o, a, u = 0, l = t.length; l > u; ++u, a = null)
                    if (o = t[u], a = g[o.identifier]) {
                        if (n) break;
                        e = o, n = a
                    }
                if (a) {
                    var c = (c = o[0] - e[0]) * c + (c = o[1] - e[1]) * c,
                        f = m && Math.sqrt(c / m);
                    e = [(e[0] + o[0]) / 2, (e[1] + o[1]) / 2], n = [(n[0] + a[0]) / 2, (n[1] + a[1]) / 2], r(f * v)
                }
                C = null, i(e, n), s(d)
            }

            function f() {
                if (Qa.event.touches.length) {
                    for (var e = Qa.event.changedTouches, n = 0, r = e.length; r > n; ++n) delete g[e[n].identifier];
                    for (var i in g) return void t()
                }
                Qa.selectAll(M).on(b, null), k.on(w, l).on(N, c), S(), u(d)
            }
            var h = this,
                d = E.of(h, arguments),
                g = {},
                m = 0,
                v, b = ".zoom-" + Qa.event.changedTouches[0].identifier,
                x = "touchmove" + b,
                _ = "touchend" + b,
                M = [],
                k = Qa.select(h).on(w, null).on(N, n),
                S = U();
            O.call(h), n(), a(d)
        }

        function f() {
            var t = E.of(this, arguments);
            k ? clearTimeout(k) : (O.call(this), a(t)), k = setTimeout(function() {
                k = null, u(t)
            }, 50), y();
            var n = m || Qa.mouse(this);
            g || (g = e(n)), r(Math.pow(2, .002 * Is()) * p.k), i(n, g), s(t)
        }

        function h() {
            g = null
        }

        function d() {
            var t = E.of(this, arguments),
                n = Qa.mouse(this),
                o = e(n),
                l = Math.log(p.k) / Math.LN2;
            a(t), r(Math.pow(2, Qa.event.shiftKey ? Math.ceil(l) - 1 : Math.floor(l) + 1)), i(n, o), s(t), u(t)
        }
        var p = {
                x: 0,
                y: 0,
                k: 1
            },
            g, m, v = [960, 500],
            b = zs,
            w = "mousedown.zoom",
            _ = "mousemove.zoom",
            M = "mouseup.zoom",
            k, N = "touchstart.zoom",
            C, E = x(t, "zoomstart", "zoom", "zoomend"),
            S, T, A, L;
        return t.event = function(t) {
            t.each(function() {
                var t = E.of(this, arguments),
                    e = p;
                jl ? Qa.select(this).transition().each("start.zoom", function() {
                    p = this.__chart__ || {
                        x: 0,
                        y: 0,
                        k: 1
                    }, a(t)
                }).tween("zoom:zoom", function() {
                    var n = v[0],
                        r = v[1],
                        i = n / 2,
                        o = r / 2,
                        a = Qa.interpolateZoom([(i - p.x) / p.k, (o - p.y) / p.k, n / p.k], [(i - e.x) / e.k, (o - e.y) / e.k, n / e.k]);
                    return function(e) {
                        var r = a(e),
                            u = n / r[2];
                        this.__chart__ = p = {
                            x: i - r[0] * u,
                            y: o - r[1] * u,
                            k: u
                        }, s(t)
                    }
                }).each("end.zoom", function() {
                    u(t)
                }) : (this.__chart__ = p, a(t), s(t), u(t))
            })
        }, t.translate = function(e) {
            return arguments.length ? (p = {
                x: +e[0],
                y: +e[1],
                k: p.k
            }, o(), t) : [p.x, p.y]
        }, t.scale = function(e) {
            return arguments.length ? (p = {
                x: p.x,
                y: p.y,
                k: +e
            }, o(), t) : p.k
        }, t.scaleExtent = function(e) {
            return arguments.length ? (b = null == e ? zs : [+e[0], +e[1]], t) : b
        }, t.center = function(e) {
            return arguments.length ? (m = e && [+e[0], +e[1]], t) : m
        }, t.size = function(e) {
            return arguments.length ? (v = e && [+e[0], +e[1]], t) : v
        }, t.x = function(e) {
            return arguments.length ? (T = e, S = e.copy(), p = {
                x: 0,
                y: 0,
                k: 1
            }, t) : T
        }, t.y = function(e) {
            return arguments.length ? (L = e, A = e.copy(), p = {
                x: 0,
                y: 0,
                k: 1
            }, t) : L
        }, Qa.rebind(t, E, "on")
    };
    var zs = [0, 1 / 0],
        Is, Bs = "onwheel" in Ja ? (Is = function() {
            return -Qa.event.deltaY * (Qa.event.deltaMode ? 120 : 1)
        }, "wheel") : "onmousewheel" in Ja ? (Is = function() {
            return Qa.event.wheelDelta
        }, "mousewheel") : (Is = function() {
            return -Qa.event.detail
        }, "MozMousePixelScroll");
    re.prototype.toString = function() {
        return this.rgb() + ""
    }, Qa.hsl = function(t, e, n) {
        return 1 === arguments.length ? t instanceof oe ? ie(t.h, t.s, t.l) : _e("" + t, Me, ie) : ie(+t, +e, +n)
    };
    var Os = oe.prototype = new re;
    Os.brighter = function(t) {
        return t = Math.pow(.7, arguments.length ? t : 1), ie(this.h, this.s, this.l / t)
    }, Os.darker = function(t) {
        return t = Math.pow(.7, arguments.length ? t : 1), ie(this.h, this.s, t * this.l)
    }, Os.rgb = function() {
        return ae(this.h, this.s, this.l)
    }, Qa.hcl = function(t, e, n) {
        return 1 === arguments.length ? t instanceof ue ? se(t.h, t.c, t.l) : t instanceof fe ? de(t.l, t.a, t.b) : de((t = ke((t = Qa.rgb(t)).r, t.g, t.b)).l, t.a, t.b) : se(+t, +e, +n)
    };
    var Ps = ue.prototype = new re;
    Ps.brighter = function(t) {
        return se(this.h, this.c, Math.min(100, this.l + Hs * (arguments.length ? t : 1)))
    }, Ps.darker = function(t) {
        return se(this.h, this.c, Math.max(0, this.l - Hs * (arguments.length ? t : 1)))
    }, Ps.rgb = function() {
        return le(this.h, this.c, this.l).rgb()
    }, Qa.lab = function(t, e, n) {
        return 1 === arguments.length ? t instanceof fe ? ce(t.l, t.a, t.b) : t instanceof ue ? le(t.l, t.c, t.h) : ke((t = Qa.rgb(t)).r, t.g, t.b) : ce(+t, +e, +n)
    };
    var Hs = 18,
        Fs = .95047,
        Us = 1,
        Ws = 1.08883,
        Vs = fe.prototype = new re;
    Vs.brighter = function(t) {
        return ce(Math.min(100, this.l + Hs * (arguments.length ? t : 1)), this.a, this.b)
    }, Vs.darker = function(t) {
        return ce(Math.max(0, this.l - Hs * (arguments.length ? t : 1)), this.a, this.b)
    }, Vs.rgb = function() {
        return he(this.l, this.a, this.b)
    }, Qa.rgb = function(t, e, n) {
        return 1 === arguments.length ? t instanceof xe ? be(t.r, t.g, t.b) : _e("" + t, be, ae) : be(~~t, ~~e, ~~n)
    };
    var Zs = xe.prototype = new re;
    Zs.brighter = function(t) {
        t = Math.pow(.7, arguments.length ? t : 1);
        var e = this.r,
            n = this.g,
            r = this.b,
            i = 30;
        return e || n || r ? (e && i > e && (e = i), n && i > n && (n = i), r && i > r && (r = i), be(Math.min(255, ~~(e / t)), Math.min(255, ~~(n / t)), Math.min(255, ~~(r / t)))) : be(i, i, i)
    }, Zs.darker = function(t) {
        return t = Math.pow(.7, arguments.length ? t : 1), be(~~(t * this.r), ~~(t * this.g), ~~(t * this.b))
    }, Zs.hsl = function() {
        return Me(this.r, this.g, this.b)
    }, Zs.toString = function() {
        return "#" + we(this.r) + we(this.g) + we(this.b)
    };
    var Ys = Qa.map({
        aliceblue: 15792383,
        antiquewhite: 16444375,
        aqua: 65535,
        aquamarine: 8388564,
        azure: 15794175,
        beige: 16119260,
        bisque: 16770244,
        black: 0,
        blanchedalmond: 16772045,
        blue: 255,
        blueviolet: 9055202,
        brown: 10824234,
        burlywood: 14596231,
        cadetblue: 6266528,
        chartreuse: 8388352,
        chocolate: 13789470,
        coral: 16744272,
        cornflowerblue: 6591981,
        cornsilk: 16775388,
        crimson: 14423100,
        cyan: 65535,
        darkblue: 139,
        darkcyan: 35723,
        darkgoldenrod: 12092939,
        darkgray: 11119017,
        darkgreen: 25600,
        darkgrey: 11119017,
        darkkhaki: 12433259,
        darkmagenta: 9109643,
        darkolivegreen: 5597999,
        darkorange: 16747520,
        darkorchid: 10040012,
        darkred: 9109504,
        darksalmon: 15308410,
        darkseagreen: 9419919,
        darkslateblue: 4734347,
        darkslategray: 3100495,
        darkslategrey: 3100495,
        darkturquoise: 52945,
        darkviolet: 9699539,
        deeppink: 16716947,
        deepskyblue: 49151,
        dimgray: 6908265,
        dimgrey: 6908265,
        dodgerblue: 2003199,
        firebrick: 11674146,
        floralwhite: 16775920,
        forestgreen: 2263842,
        fuchsia: 16711935,
        gainsboro: 14474460,
        ghostwhite: 16316671,
        gold: 16766720,
        goldenrod: 14329120,
        gray: 8421504,
        green: 32768,
        greenyellow: 11403055,
        grey: 8421504,
        honeydew: 15794160,
        hotpink: 16738740,
        indianred: 13458524,
        indigo: 4915330,
        ivory: 16777200,
        khaki: 15787660,
        lavender: 15132410,
        lavenderblush: 16773365,
        lawngreen: 8190976,
        lemonchiffon: 16775885,
        lightblue: 11393254,
        lightcoral: 15761536,
        lightcyan: 14745599,
        lightgoldenrodyellow: 16448210,
        lightgray: 13882323,
        lightgreen: 9498256,
        lightgrey: 13882323,
        lightpink: 16758465,
        lightsalmon: 16752762,
        lightseagreen: 2142890,
        lightskyblue: 8900346,
        lightslategray: 7833753,
        lightslategrey: 7833753,
        lightsteelblue: 11584734,
        lightyellow: 16777184,
        lime: 65280,
        limegreen: 3329330,
        linen: 16445670,
        magenta: 16711935,
        maroon: 8388608,
        mediumaquamarine: 6737322,
        mediumblue: 205,
        mediumorchid: 12211667,
        mediumpurple: 9662683,
        mediumseagreen: 3978097,
        mediumslateblue: 8087790,
        mediumspringgreen: 64154,
        mediumturquoise: 4772300,
        mediumvioletred: 13047173,
        midnightblue: 1644912,
        mintcream: 16121850,
        mistyrose: 16770273,
        moccasin: 16770229,
        navajowhite: 16768685,
        navy: 128,
        oldlace: 16643558,
        olive: 8421376,
        olivedrab: 7048739,
        orange: 16753920,
        orangered: 16729344,
        orchid: 14315734,
        palegoldenrod: 15657130,
        palegreen: 10025880,
        paleturquoise: 11529966,
        palevioletred: 14381203,
        papayawhip: 16773077,
        peachpuff: 16767673,
        peru: 13468991,
        pink: 16761035,
        plum: 14524637,
        powderblue: 11591910,
        purple: 8388736,
        red: 16711680,
        rosybrown: 12357519,
        royalblue: 4286945,
        saddlebrown: 9127187,
        salmon: 16416882,
        sandybrown: 16032864,
        seagreen: 3050327,
        seashell: 16774638,
        sienna: 10506797,
        silver: 12632256,
        skyblue: 8900331,
        slateblue: 6970061,
        slategray: 7372944,
        slategrey: 7372944,
        snow: 16775930,
        springgreen: 65407,
        steelblue: 4620980,
        tan: 13808780,
        teal: 32896,
        thistle: 14204888,
        tomato: 16737095,
        turquoise: 4251856,
        violet: 15631086,
        wheat: 16113331,
        white: 16777215,
        whitesmoke: 16119285,
        yellow: 16776960,
        yellowgreen: 10145074
    });
    Ys.forEach(function(t, e) {
        Ys.set(t, ve(e))
    }), Qa.functor = Ee, Qa.xhr = Te(Se), Qa.dsv = function(t, e) {
        function n(t, n, o) {
            arguments.length < 3 && (o = n, n = null);
            var a = Ae(t, e, null == n ? r : i(n), o);
            return a.row = function(t) {
                return arguments.length ? a.response(null == (n = t) ? r : i(t)) : n
            }, a
        }

        function r(t) {
            return n.parse(t.responseText)
        }

        function i(t) {
            return function(e) {
                return n.parse(e.responseText, t)
            }
        }

        function o(e) {
            return e.map(a).join(t)
        }

        function a(t) {
            return s.test(t) ? '"' + t.replace(/\"/g, '""') + '"' : t
        }
        var s = new RegExp('["' + t + "\n]"),
            u = t.charCodeAt(0);
        return n.parse = function(t, e) {
            var r;
            return n.parseRows(t, function(t, n) {
                if (r) return r(t, n - 1);
                var i = new Function("d", "return {" + t.map(function(t, e) {
                    return JSON.stringify(t) + ": d[" + e + "]"
                }).join(",") + "}");
                r = e ? function(t, n) {
                    return e(i(t), n)
                } : i
            })
        }, n.parseRows = function(t, e) {
            function n() {
                if (s >= a) return i;
                if (f) return f = !1, r;
                var e = s;
                if (34 === t.charCodeAt(e)) {
                    for (var n = e; n++ < a;)
                        if (34 === t.charCodeAt(n)) {
                            if (34 !== t.charCodeAt(n + 1)) break;
                            ++n
                        }
                    s = n + 2;
                    var o = t.charCodeAt(n + 1);
                    return 13 === o ? (f = !0, 10 === t.charCodeAt(n + 2) && ++s) : 10 === o && (f = !0), t.substring(e + 1, n).replace(/""/g, '"')
                }
                for (; a > s;) {
                    var o = t.charCodeAt(s++),
                        l = 1;
                    if (10 === o) f = !0;
                    else if (13 === o) f = !0, 10 === t.charCodeAt(s) && (++s, ++l);
                    else if (o !== u) continue;
                    return t.substring(e, s - l)
                }
                return t.substring(e)
            }
            for (var r = {}, i = {}, o = [], a = t.length, s = 0, l = 0, c, f;
                (c = n()) !== i;) {
                for (var h = []; c !== r && c !== i;) h.push(c), c = n();
                (!e || (h = e(h, l++))) && o.push(h)
            }
            return o
        }, n.format = function(e) {
            if (Array.isArray(e[0])) return n.formatRows(e);
            var r = new h,
                i = [];
            return e.forEach(function(t) {
                for (var e in t) r.has(e) || i.push(r.add(e))
            }), [i.map(a).join(t)].concat(e.map(function(e) {
                return i.map(function(t) {
                    return a(e[t])
                }).join(t)
            })).join("\n")
        }, n.formatRows = function(t) {
            return t.map(o).join("\n")
        }, n
    }, Qa.csv = Qa.dsv(",", "text/csv"), Qa.tsv = Qa.dsv("	", "text/tab-separated-values"), Qa.touch = function(t, e, n) {
        if (arguments.length < 3 && (n = e, e = b().changedTouches), e)
            for (var r = 0, i = e.length, o; i > r; ++r)
                if ((o = e[r]).identifier === n) return W(t, o)
    };
    var Xs, Qs, Ks, Gs, Js, tu = es[p(es, "requestAnimationFrame")] || function(t) {
        setTimeout(t, 17)
    };
    Qa.timer = function(t, e, n) {
        var r = arguments.length;
        2 > r && (e = 0), 3 > r && (n = Date.now());
        var i = n + e,
            o = {
                c: t,
                t: i,
                f: !1,
                n: null
            };
        Qs ? Qs.n = o : Xs = o, Qs = o, Ks || (Gs = clearTimeout(Gs), Ks = 1, tu(Le))
    }, Qa.timer.flush = function() {
        je(), De()
    }, Qa.round = function(t, e) {
        return e ? Math.round(t * (e = Math.pow(10, e))) / e : Math.round(t)
    };
    var eu = ["y", "z", "a", "f", "p", "n", "µ", "m", "", "k", "M", "G", "T", "P", "E", "Z", "Y"].map(Re);
    Qa.formatPrefix = function(t, e) {
        var n = 0;
        return t && (0 > t && (t *= -1), e && (t = Qa.round(t, qe(t, e))), n = 1 + Math.floor(1e-12 + Math.log(t) / Math.LN10), n = Math.max(-24, Math.min(24, 3 * Math.floor((n - 1) / 3)))), eu[8 + n / 3]
    };
    var nu = /(?:([^{])?([<>=^]))?([+\- ])?([$#])?(0)?(\d+)?(,)?(\.-?\d+)?([a-z%])?/i,
        ru = Qa.map({
            b: function(t) {
                return t.toString(2)
            },
            c: function(t) {
                return String.fromCharCode(t)
            },
            o: function(t) {
                return t.toString(8)
            },
            x: function(t) {
                return t.toString(16)
            },
            X: function(t) {
                return t.toString(16).toUpperCase()
            },
            g: function(t, e) {
                return t.toPrecision(e)
            },
            e: function(t, e) {
                return t.toExponential(e)
            },
            f: function(t, e) {
                return t.toFixed(e)
            },
            r: function(t, e) {
                return (t = Qa.round(t, qe(t, e))).toFixed(Math.max(0, Math.min(20, qe(t * (1 + 1e-15), e))))
            }
        }),
        iu = Qa.time = {},
        ou = Date;
    Be.prototype = {
        getDate: function() {
            return this._.getUTCDate()
        },
        getDay: function() {
            return this._.getUTCDay()
        },
        getFullYear: function() {
            return this._.getUTCFullYear()
        },
        getHours: function() {
            return this._.getUTCHours()
        },
        getMilliseconds: function() {
            return this._.getUTCMilliseconds()
        },
        getMinutes: function() {
            return this._.getUTCMinutes()
        },
        getMonth: function() {
            return this._.getUTCMonth()
        },
        getSeconds: function() {
            return this._.getUTCSeconds()
        },
        getTime: function() {
            return this._.getTime()
        },
        getTimezoneOffset: function() {
            return 0
        },
        valueOf: function() {
            return this._.valueOf()
        },
        setDate: function() {
            au.setUTCDate.apply(this._, arguments)
        },
        setDay: function() {
            au.setUTCDay.apply(this._, arguments)
        },
        setFullYear: function() {
            au.setUTCFullYear.apply(this._, arguments)
        },
        setHours: function() {
            au.setUTCHours.apply(this._, arguments)
        },
        setMilliseconds: function() {
            au.setUTCMilliseconds.apply(this._, arguments)
        },
        setMinutes: function() {
            au.setUTCMinutes.apply(this._, arguments)
        },
        setMonth: function() {
            au.setUTCMonth.apply(this._, arguments)
        },
        setSeconds: function() {
            au.setUTCSeconds.apply(this._, arguments)
        },
        setTime: function() {
            au.setTime.apply(this._, arguments)
        }
    };
    var au = Date.prototype;
    iu.year = Oe(function(t) {
        return t = iu.day(t), t.setMonth(0, 1), t
    }, function(t, e) {
        t.setFullYear(t.getFullYear() + e)
    }, function(t) {
        return t.getFullYear()
    }), iu.years = iu.year.range, iu.years.utc = iu.year.utc.range, iu.day = Oe(function(t) {
        var e = new ou(2e3, 0);
        return e.setFullYear(t.getFullYear(), t.getMonth(), t.getDate()), e
    }, function(t, e) {
        t.setDate(t.getDate() + e)
    }, function(t) {
        return t.getDate() - 1
    }), iu.days = iu.day.range, iu.days.utc = iu.day.utc.range, iu.dayOfYear = function(t) {
        var e = iu.year(t);
        return Math.floor((t - e - 6e4 * (t.getTimezoneOffset() - e.getTimezoneOffset())) / 864e5)
    }, ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"].forEach(function(t, e) {
        e = 7 - e;
        var n = iu[t] = Oe(function(t) {
            return (t = iu.day(t)).setDate(t.getDate() - (t.getDay() + e) % 7), t
        }, function(t, e) {
            t.setDate(t.getDate() + 7 * Math.floor(e))
        }, function(t) {
            var n = iu.year(t).getDay();
            return Math.floor((iu.dayOfYear(t) + (n + e) % 7) / 7) - (n !== e)
        });
        iu[t + "s"] = n.range, iu[t + "s"].utc = n.utc.range, iu[t + "OfYear"] = function(t) {
            var n = iu.year(t).getDay();
            return Math.floor((iu.dayOfYear(t) + (n + e) % 7) / 7)
        }
    }), iu.week = iu.sunday, iu.weeks = iu.sunday.range, iu.weeks.utc = iu.sunday.utc.range, iu.weekOfYear = iu.sundayOfYear;
    var su = {
            "-": "",
            _: " ",
            0: "0"
        },
        uu = /^\s*\d+/,
        lu = /^%/;
    Qa.locale = function(t) {
        return {
            numberFormat: ze(t),
            timeFormat: He(t)
        }
    };
    var cu = Qa.locale({
        decimal: ".",
        thousands: ",",
        grouping: [3],
        currency: ["$", ""],
        dateTime: "%a %b %e %X %Y",
        date: "%m/%d/%Y",
        time: "%H:%M:%S",
        periods: ["AM", "PM"],
        days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        shortDays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
        months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
        shortMonths: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    });
    Qa.format = cu.numberFormat, Qa.geo = {}, cn.prototype = {
        s: 0,
        t: 0,
        add: function(t) {
            fn(t, this.t, fu), fn(fu.s, this.s, this), this.s ? this.t += fu.t : this.s = fu.t
        },
        reset: function() {
            this.s = this.t = 0
        },
        valueOf: function() {
            return this.s
        }
    };
    var fu = new cn;
    Qa.geo.stream = function(t, e) {
        t && hu.hasOwnProperty(t.type) ? hu[t.type](t, e) : hn(t, e)
    };
    var hu = {
            Feature: function(t, e) {
                hn(t.geometry, e)
            },
            FeatureCollection: function(t, e) {
                for (var n = t.features, r = -1, i = n.length; ++r < i;) hn(n[r].geometry, e)
            }
        },
        du = {
            Sphere: function(t, e) {
                e.sphere()
            },
            Point: function(t, e) {
                t = t.coordinates, e.point(t[0], t[1], t[2])
            },
            MultiPoint: function(t, e) {
                for (var n = t.coordinates, r = -1, i = n.length; ++r < i;) t = n[r], e.point(t[0], t[1], t[2])
            },
            LineString: function(t, e) {
                dn(t.coordinates, e, 0)
            },
            MultiLineString: function(t, e) {
                for (var n = t.coordinates, r = -1, i = n.length; ++r < i;) dn(n[r], e, 0)
            },
            Polygon: function(t, e) {
                pn(t.coordinates, e)
            },
            MultiPolygon: function(t, e) {
                for (var n = t.coordinates, r = -1, i = n.length; ++r < i;) pn(n[r], e)
            },
            GeometryCollection: function(t, e) {
                for (var n = t.geometries, r = -1, i = n.length; ++r < i;) hn(n[r], e)
            }
        };
    Qa.geo.area = function(t) {
        return pu = 0, Qa.geo.stream(t, mu), pu
    };
    var pu, gu = new cn,
        mu = {
            sphere: function() {
                pu += 4 * Es
            },
            point: g,
            lineStart: g,
            lineEnd: g,
            polygonStart: function() {
                gu.reset(), mu.lineStart = gn
            },
            polygonEnd: function() {
                var t = 2 * gu;
                pu += 0 > t ? 4 * Es + t : t, mu.lineStart = mu.lineEnd = mu.point = g
            }
        };
    Qa.geo.bounds = function() {
        function t(t, e) {
            b.push(x = [c = t, h = t]), f > e && (f = e), e > d && (d = e)
        }

        function e(e, n) {
            var r = mn([e * Ls, n * Ls]);
            if (v) {
                var i = yn(v, r),
                    o = [i[1], -i[0], 0],
                    a = yn(o, i);
                wn(a), a = _n(a);
                var u = e - p,
                    l = u > 0 ? 1 : -1,
                    g = a[0] * js * l,
                    m = cs(u) > 180;
                if (m ^ (g > l * p && l * e > g)) {
                    var y = a[1] * js;
                    y > d && (d = y)
                } else if (g = (g + 360) % 360 - 180, m ^ (g > l * p && l * e > g)) {
                    var y = -a[1] * js;
                    f > y && (f = y)
                } else f > n && (f = n), n > d && (d = n);
                m ? p > e ? s(c, e) > s(c, h) && (h = e) : s(e, h) > s(c, h) && (c = e) : h >= c ? (c > e && (c = e), e > h && (h = e)) : e > p ? s(c, e) > s(c, h) && (h = e) : s(e, h) > s(c, h) && (c = e)
            } else t(e, n);
            v = r, p = e
        }

        function n() {
            w.point = e
        }

        function r() {
            x[0] = c, x[1] = h, w.point = t, v = null
        }

        function i(t, n) {
            if (v) {
                var r = t - p;
                y += cs(r) > 180 ? r + (r > 0 ? 360 : -360) : r
            } else g = t, m = n;
            mu.point(t, n), e(t, n)
        }

        function o() {
            mu.lineStart()
        }

        function a() {
            i(g, m), mu.lineEnd(), cs(y) > As && (c = -(h = 180)), x[0] = c, x[1] = h, v = null
        }

        function s(t, e) {
            return (e -= t) < 0 ? e + 360 : e
        }

        function u(t, e) {
            return t[0] - e[0]
        }

        function l(t, e) {
            return e[0] <= e[1] ? e[0] <= t && t <= e[1] : t < e[0] || e[1] < t
        }
        var c, f, h, d, p, g, m, v, y, b, x, w = {
            point: t,
            lineStart: n,
            lineEnd: r,
            polygonStart: function() {
                w.point = i, w.lineStart = o, w.lineEnd = a, y = 0, mu.polygonStart()
            },
            polygonEnd: function() {
                mu.polygonEnd(), w.point = t, w.lineStart = n, w.lineEnd = r, 0 > gu ? (c = -(h = 180), f = -(d = 90)) : y > As ? d = 90 : -As > y && (f = -90), x[0] = c, x[1] = h
            }
        };
        return function(t) {
            d = h = -(c = f = 1 / 0), b = [], Qa.geo.stream(t, w);
            var e = b.length;
            if (e) {
                b.sort(u);
                for (var n = 1, r = b[0], i, o = [r]; e > n; ++n) i = b[n], l(i[0], r) || l(i[1], r) ? (s(r[0], i[1]) > s(r[0], r[1]) && (r[1] = i[1]), s(i[0], r[1]) > s(r[0], r[1]) && (r[0] = i[0])) : o.push(r = i);
                for (var a = -1 / 0, p, e = o.length - 1, n = 0, r = o[e], i; e >= n; r = i, ++n) i = o[n], (p = s(r[1], i[0])) > a && (a = p, c = i[0], h = r[1])
            }
            return b = x = null, 1 / 0 === c || 1 / 0 === f ? [
                [0 / 0, 0 / 0],
                [0 / 0, 0 / 0]
            ] : [
                [c, f],
                [h, d]
            ]
        }
    }(), Qa.geo.centroid = function(t) {
        vu = yu = bu = xu = wu = _u = Mu = ku = Nu = Cu = Eu = 0, Qa.geo.stream(t, Su);
        var e = Nu,
            n = Cu,
            r = Eu,
            i = e * e + n * n + r * r;
        return $s > i && (e = _u, n = Mu, r = ku, As > yu && (e = bu, n = xu, r = wu), i = e * e + n * n + r * r, $s > i) ? [0 / 0, 0 / 0] : [Math.atan2(n, e) * js, G(r / Math.sqrt(i)) * js]
    };
    var vu, yu, bu, xu, wu, _u, Mu, ku, Nu, Cu, Eu, Su = {
            sphere: g,
            point: kn,
            lineStart: Cn,
            lineEnd: En,
            polygonStart: function() {
                Su.lineStart = Sn
            },
            polygonEnd: function() {
                Su.lineStart = Cn
            }
        },
        Tu = jn(Tn, In, On, [-Es, -Es / 2]),
        Au = 1e9;
    Qa.geo.clipExtent = function() {
        var t, e, n, r, i, o, a = {
            stream: function(t) {
                return i && (i.valid = !1), i = o(t), i.valid = !0, i
            },
            extent: function(s) {
                return arguments.length ? (o = Fn(t = +s[0][0], e = +s[0][1], n = +s[1][0], r = +s[1][1]), i && (i.valid = !1, i = null), a) : [
                    [t, e],
                    [n, r]
                ]
            }
        };
        return a.extent([
            [0, 0],
            [960, 500]
        ])
    }, (Qa.geo.conicEqualArea = function() {
        return Wn(Vn)
    }).raw = Vn, Qa.geo.albers = function() {
        return Qa.geo.conicEqualArea().rotate([96, 0]).center([-.6, 38.7]).parallels([29.5, 45.5]).scale(1070)
    }, Qa.geo.albersUsa = function() {
        function t(t) {
            var e = t[0],
                n = t[1];
            return i = null, a(e, n), i || (s(e, n), i) || u(e, n), i
        }
        var e = Qa.geo.albers(),
            n = Qa.geo.conicEqualArea().rotate([154, 0]).center([-2, 58.5]).parallels([55, 65]),
            r = Qa.geo.conicEqualArea().rotate([157, 0]).center([-3, 19.9]).parallels([8, 18]),
            i, o = {
                point: function(t, e) {
                    i = [t, e]
                }
            },
            a, s, u;
        return t.invert = function(t) {
            var i = e.scale(),
                o = e.translate(),
                a = (t[0] - o[0]) / i,
                s = (t[1] - o[1]) / i;
            return (s >= .12 && .234 > s && a >= -.425 && -.214 > a ? n : s >= .166 && .234 > s && a >= -.214 && -.115 > a ? r : e).invert(t)
        }, t.stream = function(t) {
            var i = e.stream(t),
                o = n.stream(t),
                a = r.stream(t);
            return {
                point: function(t, e) {
                    i.point(t, e), o.point(t, e), a.point(t, e)
                },
                sphere: function() {
                    i.sphere(), o.sphere(), a.sphere()
                },
                lineStart: function() {
                    i.lineStart(), o.lineStart(), a.lineStart()
                },
                lineEnd: function() {
                    i.lineEnd(), o.lineEnd(), a.lineEnd()
                },
                polygonStart: function() {
                    i.polygonStart(), o.polygonStart(), a.polygonStart()
                },
                polygonEnd: function() {
                    i.polygonEnd(), o.polygonEnd(), a.polygonEnd()
                }
            }
        }, t.precision = function(i) {
            return arguments.length ? (e.precision(i), n.precision(i), r.precision(i), t) : e.precision()
        }, t.scale = function(i) {
            return arguments.length ? (e.scale(i), n.scale(.35 * i), r.scale(i), t.translate(e.translate())) : e.scale()
        }, t.translate = function(i) {
            if (!arguments.length) return e.translate();
            var l = e.scale(),
                c = +i[0],
                f = +i[1];
            return a = e.translate(i).clipExtent([
                [c - .455 * l, f - .238 * l],
                [c + .455 * l, f + .238 * l]
            ]).stream(o).point, s = n.translate([c - .307 * l, f + .201 * l]).clipExtent([
                [c - .425 * l + As, f + .12 * l + As],
                [c - .214 * l - As, f + .234 * l - As]
            ]).stream(o).point, u = r.translate([c - .205 * l, f + .212 * l]).clipExtent([
                [c - .214 * l + As, f + .166 * l + As],
                [c - .115 * l - As, f + .234 * l - As]
            ]).stream(o).point, t
        }, t.scale(1070)
    };
    var $u, Lu, ju = {
            point: g,
            lineStart: g,
            lineEnd: g,
            polygonStart: function() {
                Lu = 0, ju.lineStart = Zn
            },
            polygonEnd: function() {
                ju.lineStart = ju.lineEnd = ju.point = g, $u += cs(Lu / 2)
            }
        },
        Du, qu, Ru, zu, Iu = {
            point: Yn,
            lineStart: g,
            lineEnd: g,
            polygonStart: g,
            polygonEnd: g
        },
        Bu = {
            point: Kn,
            lineStart: Gn,
            lineEnd: Jn,
            polygonStart: function() {
                Bu.lineStart = tr
            },
            polygonEnd: function() {
                Bu.point = Kn, Bu.lineStart = Gn, Bu.lineEnd = Jn
            }
        };
    Qa.geo.path = function() {
        function t(t) {
            return t && ("function" == typeof n && a.pointRadius(+n.apply(this, arguments)), s && s.valid || (s = o(a)), Qa.geo.stream(t, s)), a.result()
        }

        function e() {
            return s = null, t
        }
        var n = 4.5,
            r, i, o, a, s;
        return t.area = function(t) {
            return $u = 0, Qa.geo.stream(t, o(ju)), $u
        }, t.centroid = function(t) {
            return bu = xu = wu = _u = Mu = ku = Nu = Cu = Eu = 0, Qa.geo.stream(t, o(Bu)), Eu ? [Nu / Eu, Cu / Eu] : ku ? [_u / ku, Mu / ku] : wu ? [bu / wu, xu / wu] : [0 / 0, 0 / 0]
        }, t.bounds = function(t) {
            return Ru = zu = -(Du = qu = 1 / 0), Qa.geo.stream(t, o(Iu)), [
                [Du, qu],
                [Ru, zu]
            ]
        }, t.projection = function(t) {
            return arguments.length ? (o = (r = t) ? t.stream || rr(t) : Se, e()) : r
        }, t.context = function(t) {
            return arguments.length ? (a = null == (i = t) ? new Xn : new er(t), "function" != typeof n && a.pointRadius(n), e()) : i
        }, t.pointRadius = function(e) {
            return arguments.length ? (n = "function" == typeof e ? e : (a.pointRadius(+e), +e), t) : n
        }, t.projection(Qa.geo.albersUsa()).context(null)
    }, Qa.geo.transform = function(t) {
        return {
            stream: function(e) {
                var n = new ir(e);
                for (var r in t) n[r] = t[r];
                return n
            }
        }
    }, ir.prototype = {
        point: function(t, e) {
            this.stream.point(t, e)
        },
        sphere: function() {
            this.stream.sphere()
        },
        lineStart: function() {
            this.stream.lineStart()
        },
        lineEnd: function() {
            this.stream.lineEnd()
        },
        polygonStart: function() {
            this.stream.polygonStart()
        },
        polygonEnd: function() {
            this.stream.polygonEnd()
        }
    }, Qa.geo.projection = ar, Qa.geo.projectionMutator = sr, (Qa.geo.equirectangular = function() {
        return ar(lr)
    }).raw = lr.invert = lr, Qa.geo.rotation = function(t) {
        function e(e) {
            return e = t(e[0] * Ls, e[1] * Ls), e[0] *= js, e[1] *= js, e
        }
        return t = fr(t[0] % 360 * Ls, t[1] * Ls, t.length > 2 ? t[2] * Ls : 0), e.invert = function(e) {
            return e = t.invert(e[0] * Ls, e[1] * Ls), e[0] *= js, e[1] *= js, e
        }, e
    }, cr.invert = lr, Qa.geo.circle = function() {
        function t() {
            var t = "function" == typeof e ? e.apply(this, arguments) : e,
                n = fr(-t[0] * Ls, -t[1] * Ls, 0).invert,
                r = [];
            return i(null, null, 1, {
                point: function(t, e) {
                    r.push(t = n(t, e)), t[0] *= js, t[1] *= js
                }
            }), {
                type: "Polygon",
                coordinates: [r]
            }
        }
        var e = [0, 0],
            n, r = 6,
            i;
        return t.origin = function(n) {
            return arguments.length ? (e = n, t) : e
        }, t.angle = function(e) {
            return arguments.length ? (i = gr((n = +e) * Ls, r * Ls), t) : n
        }, t.precision = function(e) {
            return arguments.length ? (i = gr(n * Ls, (r = +e) * Ls), t) : r
        }, t.angle(90)
    }, Qa.geo.distance = function(t, e) {
        var n = (e[0] - t[0]) * Ls,
            r = t[1] * Ls,
            i = e[1] * Ls,
            o = Math.sin(n),
            a = Math.cos(n),
            s = Math.sin(r),
            u = Math.cos(r),
            l = Math.sin(i),
            c = Math.cos(i),
            f;
        return Math.atan2(Math.sqrt((f = c * o) * f + (f = u * l - s * c * a) * f), s * l + u * c * a)
    }, Qa.geo.graticule = function() {
        function t() {
            return {
                type: "MultiLineString",
                coordinates: e()
            }
        }

        function e() {
            return Qa.range(Math.ceil(o / h) * h, i, h).map(m).concat(Qa.range(Math.ceil(l / d) * d, u, d).map(v)).concat(Qa.range(Math.ceil(r / c) * c, n, c).filter(function(t) {
                return cs(t % h) > As
            }).map(p)).concat(Qa.range(Math.ceil(s / f) * f, a, f).filter(function(t) {
                return cs(t % d) > As
            }).map(g))
        }
        var n, r, i, o, a, s, u, l, c = 10,
            f = c,
            h = 90,
            d = 360,
            p, g, m, v, y = 2.5;
        return t.lines = function() {
            return e().map(function(t) {
                return {
                    type: "LineString",
                    coordinates: t
                }
            })
        }, t.outline = function() {
            return {
                type: "Polygon",
                coordinates: [m(o).concat(v(u).slice(1), m(i).reverse().slice(1), v(l).reverse().slice(1))]
            }
        }, t.extent = function(e) {
            return arguments.length ? t.majorExtent(e).minorExtent(e) : t.minorExtent()
        }, t.majorExtent = function(e) {
            return arguments.length ? (o = +e[0][0], i = +e[1][0], l = +e[0][1], u = +e[1][1], o > i && (e = o, o = i, i = e), l > u && (e = l, l = u, u = e), t.precision(y)) : [
                [o, l],
                [i, u]
            ]
        }, t.minorExtent = function(e) {
            return arguments.length ? (r = +e[0][0], n = +e[1][0], s = +e[0][1], a = +e[1][1], r > n && (e = r, r = n, n = e), s > a && (e = s, s = a, a = e), t.precision(y)) : [
                [r, s],
                [n, a]
            ]
        }, t.step = function(e) {
            return arguments.length ? t.majorStep(e).minorStep(e) : t.minorStep()
        }, t.majorStep = function(e) {
            return arguments.length ? (h = +e[0], d = +e[1], t) : [h, d]
        }, t.minorStep = function(e) {
            return arguments.length ? (c = +e[0], f = +e[1], t) : [c, f]
        }, t.precision = function(e) {
            return arguments.length ? (y = +e, p = vr(s, a, 90), g = yr(r, n, y), m = vr(l, u, 90), v = yr(o, i, y), t) : y
        }, t.majorExtent([
            [-180, -90 + As],
            [180, 90 - As]
        ]).minorExtent([
            [-180, -80 - As],
            [180, 80 + As]
        ])
    }, Qa.geo.greatArc = function() {
        function t() {
            return {
                type: "LineString",
                coordinates: [n || e.apply(this, arguments), i || r.apply(this, arguments)]
            }
        }
        var e = br,
            n, r = xr,
            i;
        return t.distance = function() {
            return Qa.geo.distance(n || e.apply(this, arguments), i || r.apply(this, arguments))
        }, t.source = function(r) {
            return arguments.length ? (e = r, n = "function" == typeof r ? null : r, t) : e
        }, t.target = function(e) {
            return arguments.length ? (r = e, i = "function" == typeof e ? null : e, t) : r
        }, t.precision = function() {
            return arguments.length ? t : 0
        }, t
    }, Qa.geo.interpolate = function(t, e) {
        return wr(t[0] * Ls, t[1] * Ls, e[0] * Ls, e[1] * Ls)
    }, Qa.geo.length = function(t) {
        return Ou = 0, Qa.geo.stream(t, Pu), Ou
    };
    var Ou, Pu = {
            sphere: g,
            point: g,
            lineStart: _r,
            lineEnd: g,
            polygonStart: g,
            polygonEnd: g
        },
        Hu = Mr(function(t) {
            return Math.sqrt(2 / (1 + t))
        }, function(t) {
            return 2 * Math.asin(t / 2)
        });
    (Qa.geo.azimuthalEqualArea = function() {
        return ar(Hu)
    }).raw = Hu;
    var Fu = Mr(function(t) {
        var e = Math.acos(t);
        return e && e / Math.sin(e)
    }, Se);
    (Qa.geo.azimuthalEquidistant = function() {
        return ar(Fu)
    }).raw = Fu, (Qa.geo.conicConformal = function() {
        return Wn(kr)
    }).raw = kr, (Qa.geo.conicEquidistant = function() {
        return Wn(Nr)
    }).raw = Nr;
    var Uu = Mr(function(t) {
        return 1 / t
    }, Math.atan);
    (Qa.geo.gnomonic = function() {
        return ar(Uu)
    }).raw = Uu, Cr.invert = function(t, e) {
        return [t, 2 * Math.atan(Math.exp(e)) - Ts]
    }, (Qa.geo.mercator = function() {
        return Er(Cr)
    }).raw = Cr;
    var Wu = Mr(function() {
        return 1
    }, Math.asin);
    (Qa.geo.orthographic = function() {
        return ar(Wu)
    }).raw = Wu;
    var Vu = Mr(function(t) {
        return 1 / (1 + t)
    }, function(t) {
        return 2 * Math.atan(t)
    });
    (Qa.geo.stereographic = function() {
        return ar(Vu)
    }).raw = Vu, Sr.invert = function(t, e) {
        return [-e, 2 * Math.atan(Math.exp(t)) - Ts]
    }, (Qa.geo.transverseMercator = function() {
        var t = Er(Sr),
            e = t.center,
            n = t.rotate;
        return t.center = function(t) {
            return t ? e([-t[1], t[0]]) : (t = e(), [-t[1], t[0]])
        }, t.rotate = function(t) {
            return t ? n([t[0], t[1], t.length > 2 ? t[2] + 90 : 90]) : (t = n(), [t[0], t[1], t[2] - 90])
        }, t.rotate([0, 0])
    }).raw = Sr, Qa.geom = {}, Qa.geom.hull = function(t) {
        function e(t) {
            if (t.length < 3) return [];
            var e = Ee(n),
                i = Ee(r),
                o, a = t.length,
                s = [],
                u = [];
            for (o = 0; a > o; o++) s.push([+e.call(this, t[o], o), +i.call(this, t[o], o), o]);
            for (s.sort(Lr), o = 0; a > o; o++) u.push([s[o][0], -s[o][1]]);
            var l = $r(s),
                c = $r(u),
                f = c[0] === l[0],
                h = c[c.length - 1] === l[l.length - 1],
                d = [];
            for (o = l.length - 1; o >= 0; --o) d.push(t[s[l[o]][2]]);
            for (o = +f; o < c.length - h; ++o) d.push(t[s[c[o]][2]]);
            return d
        }
        var n = Tr,
            r = Ar;
        return arguments.length ? e(t) : (e.x = function(t) {
            return arguments.length ? (n = t, e) : n
        }, e.y = function(t) {
            return arguments.length ? (r = t, e) : r
        }, e)
    }, Qa.geom.polygon = function(t) {
        return gs(t, Zu), t
    };
    var Zu = Qa.geom.polygon.prototype = [];
    Zu.area = function() {
        for (var t = -1, e = this.length, n, r = this[e - 1], i = 0; ++t < e;) n = r, r = this[t], i += n[1] * r[0] - n[0] * r[1];
        return .5 * i
    }, Zu.centroid = function(t) {
        var e = -1,
            n = this.length,
            r = 0,
            i = 0,
            o, a = this[n - 1],
            s;
        for (arguments.length || (t = -1 / (6 * this.area())); ++e < n;) o = a, a = this[e], s = o[0] * a[1] - a[0] * o[1], r += (o[0] + a[0]) * s, i += (o[1] + a[1]) * s;
        return [r * t, i * t]
    }, Zu.clip = function(t) {
        for (var e, n = qr(t), r = -1, i = this.length - qr(this), o, a, s = this[i - 1], u, l, c; ++r < i;) {
            for (e = t.slice(), t.length = 0, u = this[r], l = e[(a = e.length - n) - 1], o = -1; ++o < a;) c = e[o], jr(c, s, u) ? (jr(l, s, u) || t.push(Dr(l, c, s, u)), t.push(c)) : jr(l, s, u) && t.push(Dr(l, c, s, u)), l = c;
            n && t.push(t[0]), s = u
        }
        return t
    };
    var Yu, Xu, Qu, Ku = [],
        Gu, Ju, tl = [];
    Fr.prototype.prepare = function() {
        for (var t = this.edges, e = t.length, n; e--;) n = t[e].edge, n.b && n.a || t.splice(e, 1);
        return t.sort(Wr), t.length
    }, ei.prototype = {
        start: function() {
            return this.edge.l === this.site ? this.edge.a : this.edge.b
        },
        end: function() {
            return this.edge.l === this.site ? this.edge.b : this.edge.a
        }
    }, ni.prototype = {
        insert: function(t, e) {
            var n, r, i;
            if (t) {
                if (e.P = t, e.N = t.N, t.N && (t.N.P = e), t.N = e, t.R) {
                    for (t = t.R; t.L;) t = t.L;
                    t.L = e
                } else t.R = e;
                n = t
            } else this._ ? (t = ai(this._), e.P = null, e.N = t, t.P = t.L = e, n = t) : (e.P = e.N = null, this._ = e, n = null);
            for (e.L = e.R = null, e.U = n, e.C = !0, t = e; n && n.C;) r = n.U, n === r.L ? (i = r.R, i && i.C ? (n.C = i.C = !1, r.C = !0, t = r) : (t === n.R && (ii(this, n), t = n, n = t.U), n.C = !1, r.C = !0, oi(this, r))) : (i = r.L, i && i.C ? (n.C = i.C = !1, r.C = !0, t = r) : (t === n.L && (oi(this, n), t = n, n = t.U), n.C = !1, r.C = !0, ii(this, r))), n = t.U;
            this._.C = !1
        },
        remove: function(t) {
            t.N && (t.N.P = t.P), t.P && (t.P.N = t.N), t.N = t.P = null;
            var e = t.U,
                n, r = t.L,
                i = t.R,
                o, a;
            if (o = r ? i ? ai(i) : r : i, e ? e.L === t ? e.L = o : e.R = o : this._ = o, r && i ? (a = o.C, o.C = t.C, o.L = r, r.U = o, o !== i ? (e = o.U, o.U = t.U, t = o.R, e.L = t, o.R = i, i.U = o) : (o.U = e, e = o, t = o.R)) : (a = t.C, t = o), t && (t.U = e), !a) {
                if (t && t.C) return void(t.C = !1);
                do {
                    if (t === this._) break;
                    if (t === e.L) {
                        if (n = e.R, n.C && (n.C = !1, e.C = !0, ii(this, e), n = e.R), n.L && n.L.C || n.R && n.R.C) {
                            n.R && n.R.C || (n.L.C = !1, n.C = !0, oi(this, n), n = e.R), n.C = e.C, e.C = n.R.C = !1, ii(this, e), t = this._;
                            break
                        }
                    } else if (n = e.L, n.C && (n.C = !1, e.C = !0, oi(this, e), n = e.L), n.L && n.L.C || n.R && n.R.C) {
                        n.L && n.L.C || (n.R.C = !1, n.C = !0, ii(this, n), n = e.L), n.C = e.C, e.C = n.L.C = !1, oi(this, e), t = this._;
                        break
                    }
                    n.C = !0, t = e, e = e.U
                } while (!t.C);
                t && (t.C = !1)
            }
        }
    }, Qa.geom.voronoi = function(t) {
        function e(t) {
            var e = new Array(t.length),
                r = s[0][0],
                i = s[0][1],
                o = s[1][0],
                a = s[1][1];
            return si(n(t), s).cells.forEach(function(n, s) {
                var u = n.edges,
                    l = n.site,
                    c = e[s] = u.length ? u.map(function(t) {
                        var e = t.start();
                        return [e.x, e.y]
                    }) : l.x >= r && l.x <= o && l.y >= i && l.y <= a ? [
                        [r, a],
                        [o, a],
                        [o, i],
                        [r, i]
                    ] : [];
                c.point = t[s]
            }), e
        }

        function n(t) {
            return t.map(function(t, e) {
                return {
                    x: Math.round(o(t, e) / As) * As,
                    y: Math.round(a(t, e) / As) * As,
                    i: e
                }
            })
        }
        var r = Tr,
            i = Ar,
            o = r,
            a = i,
            s = el;
        return t ? e(t) : (e.links = function(t) {
            return si(n(t)).edges.filter(function(t) {
                return t.l && t.r
            }).map(function(e) {
                return {
                    source: t[e.l.i],
                    target: t[e.r.i]
                }
            })
        }, e.triangles = function(t) {
            var e = [];
            return si(n(t)).cells.forEach(function(n, r) {
                for (var i = n.site, o = n.edges.sort(Wr), a = -1, s = o.length, u, l, c = o[s - 1].edge, f = c.l === i ? c.r : c.l; ++a < s;) u = c, l = f, c = o[a].edge, f = c.l === i ? c.r : c.l, r < l.i && r < f.i && li(i, l, f) < 0 && e.push([t[r], t[l.i], t[f.i]])
            }), e
        }, e.x = function(t) {
            return arguments.length ? (o = Ee(r = t), e) : r
        }, e.y = function(t) {
            return arguments.length ? (a = Ee(i = t), e) : i
        }, e.clipExtent = function(t) {
            return arguments.length ? (s = null == t ? el : t, e) : s === el ? null : s
        }, e.size = function(t) {
            return arguments.length ? e.clipExtent(t && [
                [0, 0], t
            ]) : s === el ? null : s && s[1]
        }, e)
    };
    var el = [
        [-1e6, -1e6],
        [1e6, 1e6]
    ];
    Qa.geom.delaunay = function(t) {
        return Qa.geom.voronoi().triangles(t)
    }, Qa.geom.quadtree = function(t, e, n, r, i) {
        function o(t) {
            function o(t, e, n, r, i, o, a, s) {
                if (!isNaN(n) && !isNaN(r))
                    if (t.leaf) {
                        var u = t.x,
                            c = t.y;
                        if (null != u)
                            if (cs(u - n) + cs(c - r) < .01) l(t, e, n, r, i, o, a, s);
                            else {
                                var f = t.point;
                                t.x = t.y = t.point = null, l(t, f, u, c, i, o, a, s), l(t, e, n, r, i, o, a, s)
                            } else t.x = n, t.y = r, t.point = e
                    } else l(t, e, n, r, i, o, a, s)
            }

            function l(t, e, n, r, i, a, s, u) {
                var l = .5 * (i + s),
                    c = .5 * (a + u),
                    f = n >= l,
                    h = r >= c,
                    d = (h << 1) + f;
                t.leaf = !1, t = t.nodes[d] || (t.nodes[d] = hi()), f ? i = l : s = l, h ? a = c : u = c, o(t, e, n, r, i, a, s, u)
            }
            var c, f = Ee(a),
                h = Ee(s),
                d, p, g, m, v, y, b, x;
            if (null != e) v = e, y = n, b = r, x = i;
            else if (b = x = -(v = y = 1 / 0), d = [], p = [], m = t.length, u)
                for (g = 0; m > g; ++g) c = t[g], c.x < v && (v = c.x), c.y < y && (y = c.y), c.x > b && (b = c.x), c.y > x && (x = c.y), d.push(c.x), p.push(c.y);
            else
                for (g = 0; m > g; ++g) {
                    var w = +f(c = t[g], g),
                        _ = +h(c, g);
                    v > w && (v = w), y > _ && (y = _), w > b && (b = w), _ > x && (x = _), d.push(w), p.push(_)
                }
            var M = b - v,
                k = x - y;
            M > k ? x = y + M : b = v + k;
            var N = hi();
            if (N.add = function(t) {
                    o(N, t, +f(t, ++g), +h(t, g), v, y, b, x)
                }, N.visit = function(t) {
                    di(t, N, v, y, b, x)
                }, g = -1, null == e) {
                for (; ++g < m;) o(N, t[g], d[g], p[g], v, y, b, x);
                --g
            } else t.forEach(N.add);
            return d = p = t = c = null, N
        }
        var a = Tr,
            s = Ar,
            u;
        return (u = arguments.length) ? (a = ci, s = fi, 3 === u && (i = n, r = e, n = e = 0), o(t)) : (o.x = function(t) {
            return arguments.length ? (a = t, o) : a
        }, o.y = function(t) {
            return arguments.length ? (s = t, o) : s
        }, o.extent = function(t) {
            return arguments.length ? (null == t ? e = n = r = i = null : (e = +t[0][0], n = +t[0][1], r = +t[1][0], i = +t[1][1]), o) : null == e ? null : [
                [e, n],
                [r, i]
            ]
        }, o.size = function(t) {
            return arguments.length ? (null == t ? e = n = r = i = null : (e = n = 0, r = +t[0], i = +t[1]), o) : null == e ? null : [r - e, i - n]
        }, o)
    }, Qa.interpolateRgb = pi, Qa.interpolateObject = gi, Qa.interpolateNumber = mi, Qa.interpolateString = vi;
    var nl = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g,
        rl = new RegExp(nl.source, "g");
    Qa.interpolate = yi, Qa.interpolators = [function(t, e) {
        var n = typeof e;
        return ("string" === n ? Ys.has(e) || /^(#|rgb\(|hsl\()/.test(e) ? pi : vi : e instanceof re ? pi : Array.isArray(e) ? bi : "object" === n && isNaN(e) ? gi : mi)(t, e)
    }], Qa.interpolateArray = bi;
    var il = function() {
            return Se
        },
        ol = Qa.map({
            linear: il,
            poly: Ci,
            quad: function() {
                return Mi
            },
            cubic: function() {
                return ki
            },
            sin: function() {
                return Ei
            },
            exp: function() {
                return Si
            },
            circle: function() {
                return Ti
            },
            elastic: Ai,
            back: $i,
            bounce: function() {
                return Li
            }
        }),
        al = Qa.map({
            "in": Se,
            out: wi,
            "in-out": _i,
            "out-in": function(t) {
                return _i(wi(t))
            }
        });
    Qa.ease = function(t) {
        var e = t.indexOf("-"),
            n = e >= 0 ? t.substring(0, e) : t,
            r = e >= 0 ? t.substring(e + 1) : "in";
        return n = ol.get(n) || il, r = al.get(r) || Se, xi(r(n.apply(null, Ka.call(arguments, 1))))
    }, Qa.interpolateHcl = ji, Qa.interpolateHsl = Di, Qa.interpolateLab = qi, Qa.interpolateRound = Ri, Qa.transform = function(t) {
        var e = Ja.createElementNS(Qa.ns.prefix.svg, "g");
        return (Qa.transform = function(t) {
            if (null != t) {
                e.setAttribute("transform", t);
                var n = e.transform.baseVal.consolidate()
            }
            return new zi(n ? n.matrix : sl)
        })(t)
    }, zi.prototype.toString = function() {
        return "translate(" + this.translate + ")rotate(" + this.rotate + ")skewX(" + this.skew + ")scale(" + this.scale + ")"
    };
    var sl = {
        a: 1,
        b: 0,
        c: 0,
        d: 1,
        e: 0,
        f: 0
    };
    Qa.interpolateTransform = Pi, Qa.layout = {}, Qa.layout.bundle = function() {
        return function(t) {
            for (var e = [], n = -1, r = t.length; ++n < r;) e.push(Ui(t[n]));
            return e
        }
    }, Qa.layout.chord = function() {
        function t() {
            var t = {},
                n = [],
                f = Qa.range(a),
                h = [],
                d, p, g, m, v;
            for (r = [], i = [], d = 0, m = -1; ++m < a;) {
                for (p = 0, v = -1; ++v < a;) p += o[m][v];
                n.push(p), h.push(Qa.range(a)), d += p
            }
            for (u && f.sort(function(t, e) {
                    return u(n[t], n[e])
                }), l && h.forEach(function(t, e) {
                    t.sort(function(t, n) {
                        return l(o[e][t], o[e][n])
                    })
                }), d = (Ss - s * a) / d, p = 0, m = -1; ++m < a;) {
                for (g = p, v = -1; ++v < a;) {
                    var y = f[m],
                        b = h[y][v],
                        x = o[y][b],
                        w = p,
                        _ = p += x * d;
                    t[y + "-" + b] = {
                        index: y,
                        subindex: b,
                        startAngle: w,
                        endAngle: _,
                        value: x
                    }
                }
                i[y] = {
                    index: y,
                    startAngle: g,
                    endAngle: p,
                    value: (p - g) / d
                }, p += s
            }
            for (m = -1; ++m < a;)
                for (v = m - 1; ++v < a;) {
                    var M = t[m + "-" + v],
                        k = t[v + "-" + m];
                    (M.value || k.value) && r.push(M.value < k.value ? {
                        source: k,
                        target: M
                    } : {
                        source: M,
                        target: k
                    })
                }
            c && e()
        }

        function e() {
            r.sort(function(t, e) {
                return c((t.source.value + t.target.value) / 2, (e.source.value + e.target.value) / 2)
            })
        }
        var n = {},
            r, i, o, a, s = 0,
            u, l, c;
        return n.matrix = function(t) {
            return arguments.length ? (a = (o = t) && o.length, r = i = null, n) : o
        }, n.padding = function(t) {
            return arguments.length ? (s = t, r = i = null, n) : s
        }, n.sortGroups = function(t) {
            return arguments.length ? (u = t, r = i = null, n) : u
        }, n.sortSubgroups = function(t) {
            return arguments.length ? (l = t, r = null, n) : l
        }, n.sortChords = function(t) {
            return arguments.length ? (c = t, r && e(), n) : c
        }, n.chords = function() {
            return r || t(), r
        }, n.groups = function() {
            return i || t(), i
        }, n
    }, Qa.layout.force = function() {
        function t(t) {
            return function(e, n, r, i) {
                if (e.point !== t) {
                    var o = e.cx - t.x,
                        a = e.cy - t.y,
                        s = i - n,
                        u = o * o + a * a;
                    if (u > s * s / d) {
                        if (f > u) {
                            var l = e.charge / u;
                            t.px -= o * l, t.py -= a * l
                        }
                        return !0
                    }
                    if (e.point && u && f > u) {
                        var l = e.pointCharge / u;
                        t.px -= o * l, t.py -= a * l
                    }
                }
                return !e.charge
            }
        }

        function e(t) {
            t.px = Qa.event.x, t.py = Qa.event.y, n.resume()
        }
        var n = {},
            r = Qa.dispatch("start", "tick", "end"),
            i = [1, 1],
            o, a, s = .9,
            u = ul,
            l = ll,
            c = -30,
            f = cl,
            h = .1,
            d = .64,
            p = [],
            g = [],
            m, v, y;
        return n.tick = function() {
            if ((a *= .99) < .005) return r.end({
                type: "end",
                alpha: a = 0
            }), !0;
            var e = p.length,
                n = g.length,
                o, u, l, f, d, b, x, w, _;
            for (u = 0; n > u; ++u) l = g[u], f = l.source, d = l.target, w = d.x - f.x, _ = d.y - f.y, (b = w * w + _ * _) && (b = a * v[u] * ((b = Math.sqrt(b)) - m[u]) / b, w *= b, _ *= b, d.x -= w * (x = f.weight / (d.weight + f.weight)), d.y -= _ * x, f.x += w * (x = 1 - x), f.y += _ * x);
            if ((x = a * h) && (w = i[0] / 2, _ = i[1] / 2, u = -1, x))
                for (; ++u < e;) l = p[u], l.x += (w - l.x) * x, l.y += (_ - l.y) * x;
            if (c)
                for (Ki(o = Qa.geom.quadtree(p), a, y), u = -1; ++u < e;)(l = p[u]).fixed || o.visit(t(l));
            for (u = -1; ++u < e;) l = p[u], l.fixed ? (l.x = l.px, l.y = l.py) : (l.x -= (l.px - (l.px = l.x)) * s, l.y -= (l.py - (l.py = l.y)) * s);
            r.tick({
                type: "tick",
                alpha: a
            })
        }, n.nodes = function(t) {
            return arguments.length ? (p = t, n) : p
        }, n.links = function(t) {
            return arguments.length ? (g = t, n) : g
        }, n.size = function(t) {
            return arguments.length ? (i = t, n) : i
        }, n.linkDistance = function(t) {
            return arguments.length ? (u = "function" == typeof t ? t : +t, n) : u
        }, n.distance = n.linkDistance, n.linkStrength = function(t) {
            return arguments.length ? (l = "function" == typeof t ? t : +t, n) : l
        }, n.friction = function(t) {
            return arguments.length ? (s = +t, n) : s
        }, n.charge = function(t) {
            return arguments.length ? (c = "function" == typeof t ? t : +t, n) : c
        }, n.chargeDistance = function(t) {
            return arguments.length ? (f = t * t, n) : Math.sqrt(f)
        }, n.gravity = function(t) {
            return arguments.length ? (h = +t, n) : h
        }, n.theta = function(t) {
            return arguments.length ? (d = t * t, n) : Math.sqrt(d)
        }, n.alpha = function(t) {
            return arguments.length ? (t = +t, a ? a = t > 0 ? t : 0 : t > 0 && (r.start({
                type: "start",
                alpha: a = t
            }), Qa.timer(n.tick)), n) : a
        }, n.start = function() {
            function t(t, n) {
                if (!f) {
                    for (f = new Array(r), a = 0; r > a; ++a) f[a] = [];
                    for (a = 0; s > a; ++a) {
                        var i = g[a];
                        f[i.source.index].push(i.target), f[i.target.index].push(i.source)
                    }
                }
                for (var o = f[e], a = -1, s = o.length, u; ++a < s;)
                    if (!isNaN(u = o[a][t])) return u;
                return Math.random() * n
            }
            var e, r = p.length,
                o = g.length,
                a = i[0],
                s = i[1],
                f, h;
            for (e = 0; r > e; ++e)(h = p[e]).index = e, h.weight = 0;
            for (e = 0; o > e; ++e) h = g[e], "number" == typeof h.source && (h.source = p[h.source]), "number" == typeof h.target && (h.target = p[h.target]), ++h.source.weight, ++h.target.weight;
            for (e = 0; r > e; ++e) h = p[e], isNaN(h.x) && (h.x = t("x", a)), isNaN(h.y) && (h.y = t("y", s)), isNaN(h.px) && (h.px = h.x), isNaN(h.py) && (h.py = h.y);
            if (m = [], "function" == typeof u)
                for (e = 0; o > e; ++e) m[e] = +u.call(this, g[e], e);
            else
                for (e = 0; o > e; ++e) m[e] = u;
            if (v = [], "function" == typeof l)
                for (e = 0; o > e; ++e) v[e] = +l.call(this, g[e], e);
            else
                for (e = 0; o > e; ++e) v[e] = l;
            if (y = [], "function" == typeof c)
                for (e = 0; r > e; ++e) y[e] = +c.call(this, p[e], e);
            else
                for (e = 0; r > e; ++e) y[e] = c;
            return n.resume()
        }, n.resume = function() {
            return n.alpha(.1)
        }, n.stop = function() {
            return n.alpha(0)
        }, n.drag = function() {
            return o || (o = Qa.behavior.drag().origin(Se).on("dragstart.force", Zi).on("drag.force", e).on("dragend.force", Yi)), arguments.length ? void this.on("mouseover.force", Xi).on("mouseout.force", Qi).call(o) : o
        }, Qa.rebind(n, r, "on")
    };
    var ul = 20,
        ll = 1,
        cl = 1 / 0;
    Qa.layout.hierarchy = function() {
        function t(i) {
            var o = [i],
                a = [],
                s;
            for (i.depth = 0; null != (s = o.pop());)
                if (a.push(s), (l = n.call(t, s, s.depth)) && (u = l.length)) {
                    for (var u, l, c; --u >= 0;) o.push(c = l[u]), c.parent = s, c.depth = s.depth + 1;
                    r && (s.value = 0), s.children = l
                } else r && (s.value = +r.call(t, s, s.depth) || 0), delete s.children;
            return to(i, function(t) {
                var n, i;
                e && (n = t.children) && n.sort(e), r && (i = t.parent) && (i.value += t.value)
            }), a
        }
        var e = ro,
            n = eo,
            r = no;
        return t.sort = function(n) {
            return arguments.length ? (e = n, t) : e
        }, t.children = function(e) {
            return arguments.length ? (n = e, t) : n
        }, t.value = function(e) {
            return arguments.length ? (r = e, t) : r
        }, t.revalue = function(e) {
            return r && (Ji(e, function(t) {
                t.children && (t.value = 0)
            }), to(e, function(e) {
                var n;
                e.children || (e.value = +r.call(t, e, e.depth) || 0), (n = e.parent) && (n.value += e.value)
            })), e
        }, t
    }, Qa.layout.partition = function() {
        function t(e, n, r, i) {
            var o = e.children;
            if (e.x = n, e.y = e.depth * i, e.dx = r, e.dy = i, o && (s = o.length)) {
                var a = -1,
                    s, u, l;
                for (r = e.value ? r / e.value : 0; ++a < s;) t(u = o[a], n, l = u.value * r, i), n += l
            }
        }

        function e(t) {
            var n = t.children,
                r = 0;
            if (n && (o = n.length))
                for (var i = -1, o; ++i < o;) r = Math.max(r, e(n[i]));
            return 1 + r
        }

        function n(n, o) {
            var a = r.call(this, n, o);
            return t(a[0], 0, i[0], i[1] / e(a[0])), a
        }
        var r = Qa.layout.hierarchy(),
            i = [1, 1];
        return n.size = function(t) {
            return arguments.length ? (i = t, n) : i
        }, Gi(n, r)
    }, Qa.layout.pie = function() {
        function t(o) {
            var a = o.map(function(n, r) {
                    return +e.call(t, n, r)
                }),
                s = +("function" == typeof r ? r.apply(this, arguments) : r),
                u = (("function" == typeof i ? i.apply(this, arguments) : i) - s) / Qa.sum(a),
                l = Qa.range(o.length);
            null != n && l.sort(n === fl ? function(t, e) {
                return a[e] - a[t]
            } : function(t, e) {
                return n(o[t], o[e])
            });
            var c = [];
            return l.forEach(function(t) {
                var e;
                c[t] = {
                    data: o[t],
                    value: e = a[t],
                    startAngle: s,
                    endAngle: s += e * u
                }
            }), c
        }
        var e = Number,
            n = fl,
            r = 0,
            i = Ss;
        return t.value = function(n) {
            return arguments.length ? (e = n, t) : e
        }, t.sort = function(e) {
            return arguments.length ? (n = e, t) : n
        }, t.startAngle = function(e) {
            return arguments.length ? (r = e, t) : r
        }, t.endAngle = function(e) {
            return arguments.length ? (i = e, t) : i
        }, t
    };
    var fl = {};
    Qa.layout.stack = function() {
        function t(s, u) {
            var l = s.map(function(n, r) {
                    return e.call(t, n, r)
                }),
                c = l.map(function(e) {
                    return e.map(function(e, n) {
                        return [o.call(t, e, n), a.call(t, e, n)]
                    })
                }),
                f = n.call(t, c, u);
            l = Qa.permute(l, f), c = Qa.permute(c, f);
            var h = r.call(t, c, u),
                d = l.length,
                p = l[0].length,
                g, m, v;
            for (m = 0; p > m; ++m)
                for (i.call(t, l[0][m], v = h[m], c[0][m][1]), g = 1; d > g; ++g) i.call(t, l[g][m], v += c[g - 1][m][1], c[g][m][1]);
            return s
        }
        var e = Se,
            n = uo,
            r = lo,
            i = so,
            o = oo,
            a = ao;
        return t.values = function(n) {
            return arguments.length ? (e = n, t) : e
        }, t.order = function(e) {
            return arguments.length ? (n = "function" == typeof e ? e : hl.get(e) || uo, t) : n
        }, t.offset = function(e) {
            return arguments.length ? (r = "function" == typeof e ? e : dl.get(e) || lo, t) : r
        }, t.x = function(e) {
            return arguments.length ? (o = e, t) : o
        }, t.y = function(e) {
            return arguments.length ? (a = e, t) : a
        }, t.out = function(e) {
            return arguments.length ? (i = e, t) : i
        }, t
    };
    var hl = Qa.map({
            "inside-out": function(t) {
                var e = t.length,
                    n, r, i = t.map(co),
                    o = t.map(fo),
                    a = Qa.range(e).sort(function(t, e) {
                        return i[t] - i[e]
                    }),
                    s = 0,
                    u = 0,
                    l = [],
                    c = [];
                for (n = 0; e > n; ++n) r = a[n], u > s ? (s += o[r], l.push(r)) : (u += o[r], c.push(r));
                return c.reverse().concat(l)
            },
            reverse: function(t) {
                return Qa.range(t.length).reverse()
            },
            "default": uo
        }),
        dl = Qa.map({
            silhouette: function(t) {
                var e = t.length,
                    n = t[0].length,
                    r = [],
                    i = 0,
                    o, a, s, u = [];
                for (a = 0; n > a; ++a) {
                    for (o = 0, s = 0; e > o; o++) s += t[o][a][1];
                    s > i && (i = s), r.push(s)
                }
                for (a = 0; n > a; ++a) u[a] = (i - r[a]) / 2;
                return u
            },
            wiggle: function(t) {
                var e = t.length,
                    n = t[0],
                    r = n.length,
                    i, o, a, s, u, l, c, f, h, d = [];
                for (d[0] = f = h = 0, o = 1; r > o; ++o) {
                    for (i = 0, s = 0; e > i; ++i) s += t[i][o][1];
                    for (i = 0, u = 0, c = n[o][0] - n[o - 1][0]; e > i; ++i) {
                        for (a = 0, l = (t[i][o][1] - t[i][o - 1][1]) / (2 * c); i > a; ++a) l += (t[a][o][1] - t[a][o - 1][1]) / c;
                        u += l * t[i][o][1]
                    }
                    d[o] = f -= s ? u / s * c : 0, h > f && (h = f)
                }
                for (o = 0; r > o; ++o) d[o] -= h;
                return d
            },
            expand: function(t) {
                var e = t.length,
                    n = t[0].length,
                    r = 1 / e,
                    i, o, a, s = [];
                for (o = 0; n > o; ++o) {
                    for (i = 0, a = 0; e > i; i++) a += t[i][o][1];
                    if (a)
                        for (i = 0; e > i; i++) t[i][o][1] /= a;
                    else
                        for (i = 0; e > i; i++) t[i][o][1] = r
                }
                for (o = 0; n > o; ++o) s[o] = 0;
                return s
            },
            zero: lo
        });
    Qa.layout.histogram = function() {
        function t(t, o) {
            for (var a = [], s = t.map(n, this), u = r.call(this, s, o), l = i.call(this, u, s, o), c, o = -1, f = s.length, h = l.length - 1, d = e ? 1 : 1 / f, p; ++o < h;) c = a[o] = [], c.dx = l[o + 1] - (c.x = l[o]), c.y = 0;
            if (h > 0)
                for (o = -1; ++o < f;) p = s[o], p >= u[0] && p <= u[1] && (c = a[Qa.bisect(l, p, 1, h) - 1], c.y += d, c.push(t[o]));
            return a
        }
        var e = !0,
            n = Number,
            r = mo,
            i = po;
        return t.value = function(e) {
            return arguments.length ? (n = e, t) : n
        }, t.range = function(e) {
            return arguments.length ? (r = Ee(e), t) : r
        }, t.bins = function(e) {
            return arguments.length ? (i = "number" == typeof e ? function(t) {
                return go(t, e)
            } : Ee(e), t) : i
        }, t.frequency = function(n) {
            return arguments.length ? (e = !!n, t) : e
        }, t
    }, Qa.layout.pack = function() {
        function t(t, o) {
            var a = e.call(this, t, o),
                s = a[0],
                u = r[0],
                l = r[1],
                c = null == i ? Math.sqrt : "function" == typeof i ? i : function() {
                    return i
                };
            if (s.x = s.y = 0, to(s, function(t) {
                    t.r = +c(t.value)
                }), to(s, wo), n) {
                var f = n * (i ? 1 : Math.max(2 * s.r / u, 2 * s.r / l)) / 2;
                to(s, function(t) {
                    t.r += f
                }), to(s, wo), to(s, function(t) {
                    t.r -= f
                })
            }
            return ko(s, u / 2, l / 2, i ? 1 : 1 / Math.max(2 * s.r / u, 2 * s.r / l)), a
        }
        var e = Qa.layout.hierarchy().sort(vo),
            n = 0,
            r = [1, 1],
            i;
        return t.size = function(e) {
            return arguments.length ? (r = e, t) : r
        }, t.radius = function(e) {
            return arguments.length ? (i = null == e || "function" == typeof e ? e : +e, t) : i
        }, t.padding = function(e) {
            return arguments.length ? (n = +e, t) : n
        }, Gi(t, e)
    }, Qa.layout.tree = function() {
        function t(t, i) {
            var c = a.call(this, t, i),
                f = c[0],
                h = e(f);
            if (to(h, n), h.parent.m = -h.z, Ji(h, r), l) Ji(f, o);
            else {
                var d = f,
                    p = f,
                    g = f;
                Ji(f, function(t) {
                    t.x < d.x && (d = t), t.x > p.x && (p = t), t.depth > g.depth && (g = t)
                });
                var m = s(d, p) / 2 - d.x,
                    v = u[0] / (p.x + s(p, d) / 2 + m),
                    y = u[1] / (g.depth || 1);
                Ji(f, function(t) {
                    t.x = (t.x + m) * v, t.y = t.depth * y
                })
            }
            return c
        }

        function e(t) {
            for (var e = {
                    A: null,
                    children: [t]
                }, n = [e], r; null != (r = n.pop());)
                for (var i = r.children, o, a = 0, s = i.length; s > a; ++a) n.push((i[a] = o = {
                    _: i[a],
                    parent: r,
                    children: (o = i[a].children) && o.slice() || [],
                    A: null,
                    a: null,
                    z: 0,
                    m: 0,
                    c: 0,
                    s: 0,
                    t: null,
                    i: a
                }).a = o);
            return e.children[0]
        }

        function n(t) {
            var e = t.children,
                n = t.parent.children,
                r = t.i ? n[t.i - 1] : null;
            if (e.length) {
                Ao(t);
                var o = (e[0].z + e[e.length - 1].z) / 2;
                r ? (t.z = r.z + s(t._, r._), t.m = t.z - o) : t.z = o
            } else r && (t.z = r.z + s(t._, r._));
            t.parent.A = i(t, r, t.parent.A || n[0])
        }

        function r(t) {
            t._.x = t.z + t.parent.m, t.m += t.parent.m
        }

        function i(t, e, n) {
            if (e) {
                for (var r = t, i = t, o = e, a = r.parent.children[0], u = r.m, l = i.m, c = o.m, f = a.m, h; o = So(o), r = Eo(r), o && r;) a = Eo(a), i = So(i), i.a = t, h = o.z + c - r.z - u + s(o._, r._), h > 0 && (To($o(o, t, n), t, h), u += h, l += h), c += o.m, u += r.m, f += a.m, l += i.m;
                o && !So(i) && (i.t = o, i.m += c - l), r && !Eo(a) && (a.t = r, a.m += u - f, n = t)
            }
            return n
        }

        function o(t) {
            t.x *= u[0], t.y = t.depth * u[1]
        }
        var a = Qa.layout.hierarchy().sort(null).value(null),
            s = Co,
            u = [1, 1],
            l = null;
        return t.separation = function(e) {
            return arguments.length ? (s = e, t) : s
        }, t.size = function(e) {
            return arguments.length ? (l = null == (u = e) ? o : null, t) : l ? null : u
        }, t.nodeSize = function(e) {
            return arguments.length ? (l = null == (u = e) ? null : o, t) : l ? u : null
        }, Gi(t, a)
    }, Qa.layout.cluster = function() {
        function t(t, o) {
            var a = e.call(this, t, o),
                s = a[0],
                u, l = 0;
            to(s, function(t) {
                var e = t.children;
                e && e.length ? (t.x = jo(e), t.y = Lo(e)) : (t.x = u ? l += n(t, u) : 0, t.y = 0, u = t)
            });
            var c = Do(s),
                f = qo(s),
                h = c.x - n(c, f) / 2,
                d = f.x + n(f, c) / 2;
            return to(s, i ? function(t) {
                t.x = (t.x - s.x) * r[0], t.y = (s.y - t.y) * r[1]
            } : function(t) {
                t.x = (t.x - h) / (d - h) * r[0], t.y = (1 - (s.y ? t.y / s.y : 1)) * r[1]
            }), a
        }
        var e = Qa.layout.hierarchy().sort(null).value(null),
            n = Co,
            r = [1, 1],
            i = !1;
        return t.separation = function(e) {
            return arguments.length ? (n = e, t) : n
        }, t.size = function(e) {
            return arguments.length ? (i = null == (r = e), t) : i ? null : r
        }, t.nodeSize = function(e) {
            return arguments.length ? (i = null != (r = e), t) : i ? r : null
        }, Gi(t, e)
    }, Qa.layout.treemap = function() {
        function t(t, e) {
            for (var n = -1, r = t.length, i, o; ++n < r;) o = (i = t[n]).value * (0 > e ? 0 : e), i.area = isNaN(o) || 0 >= o ? 0 : o
        }

        function e(n) {
            var o = n.children;
            if (o && o.length) {
                var a = c(n),
                    s = [],
                    u = o.slice(),
                    l, f = 1 / 0,
                    h, p = "slice" === d ? a.dx : "dice" === d ? a.dy : "slice-dice" === d ? 1 & n.depth ? a.dy : a.dx : Math.min(a.dx, a.dy),
                    g;
                for (t(u, a.dx * a.dy / n.value), s.area = 0;
                    (g = u.length) > 0;) s.push(l = u[g - 1]), s.area += l.area, "squarify" !== d || (h = r(s, p)) <= f ? (u.pop(), f = h) : (s.area -= s.pop().area, i(s, p, a, !1), p = Math.min(a.dx, a.dy), s.length = s.area = 0, f = 1 / 0);
                s.length && (i(s, p, a, !0), s.length = s.area = 0), o.forEach(e)
            }
        }

        function n(e) {
            var r = e.children;
            if (r && r.length) {
                var o = c(e),
                    a = r.slice(),
                    s, u = [];
                for (t(a, o.dx * o.dy / e.value), u.area = 0; s = a.pop();) u.push(s), u.area += s.area, null != s.z && (i(u, s.z ? o.dx : o.dy, o, !a.length), u.length = u.area = 0);
                r.forEach(n)
            }
        }

        function r(t, e) {
            for (var n = t.area, r, i = 0, o = 1 / 0, a = -1, s = t.length; ++a < s;)(r = t[a].area) && (o > r && (o = r), r > i && (i = r));
            return n *= n, e *= e, n ? Math.max(e * i * p / n, n / (e * o * p)) : 1 / 0
        }

        function i(t, e, n, r) {
            var i = -1,
                o = t.length,
                a = n.x,
                u = n.y,
                l = e ? s(t.area / e) : 0,
                c;
            if (e == n.dx) {
                for ((r || l > n.dy) && (l = n.dy); ++i < o;) c = t[i], c.x = a, c.y = u, c.dy = l, a += c.dx = Math.min(n.x + n.dx - a, l ? s(c.area / l) : 0);
                c.z = !0, c.dx += n.x + n.dx - a, n.y += l, n.dy -= l
            } else {
                for ((r || l > n.dx) && (l = n.dx); ++i < o;) c = t[i], c.x = a, c.y = u, c.dx = l, u += c.dy = Math.min(n.y + n.dy - u, l ? s(c.area / l) : 0);
                c.z = !1, c.dy += n.y + n.dy - u, n.x += l, n.dx -= l
            }
        }

        function o(r) {
            var i = h || a(r),
                o = i[0];
            return o.x = 0, o.y = 0, o.dx = u[0], o.dy = u[1], h && a.revalue(o), t([o], o.dx * o.dy / o.value), (h ? n : e)(o), f && (h = i), i
        }
        var a = Qa.layout.hierarchy(),
            s = Math.round,
            u = [1, 1],
            l = null,
            c = Ro,
            f = !1,
            h, d = "squarify",
            p = .5 * (1 + Math.sqrt(5));
        return o.size = function(t) {
            return arguments.length ? (u = t, o) : u
        }, o.padding = function(t) {
            function e(e) {
                var n = t.call(o, e, e.depth);
                return null == n ? Ro(e) : zo(e, "number" == typeof n ? [n, n, n, n] : n)
            }

            function n(e) {
                return zo(e, t)
            }
            if (!arguments.length) return l;
            var r;
            return c = null == (l = t) ? Ro : "function" == (r = typeof t) ? e : "number" === r ? (t = [t, t, t, t], n) : n, o
        }, o.round = function(t) {
            return arguments.length ? (s = t ? Math.round : Number, o) : s != Number
        }, o.sticky = function(t) {
            return arguments.length ? (f = t, h = null, o) : f
        }, o.ratio = function(t) {
            return arguments.length ? (p = t, o) : p
        }, o.mode = function(t) {
            return arguments.length ? (d = t + "", o) : d
        }, Gi(o, a)
    }, Qa.random = {
        normal: function(t, e) {
            var n = arguments.length;
            return 2 > n && (e = 1), 1 > n && (t = 0),
                function() {
                    var n, r, i;
                    do n = 2 * Math.random() - 1, r = 2 * Math.random() - 1, i = n * n + r * r; while (!i || i > 1);
                    return t + e * n * Math.sqrt(-2 * Math.log(i) / i)
                }
        },
        logNormal: function() {
            var t = Qa.random.normal.apply(Qa, arguments);
            return function() {
                return Math.exp(t())
            }
        },
        bates: function(t) {
            var e = Qa.random.irwinHall(t);
            return function() {
                return e() / t
            }
        },
        irwinHall: function(t) {
            return function() {
                for (var e = 0, n = 0; t > n; n++) e += Math.random();
                return e
            }
        }
    }, Qa.scale = {};
    var pl = {
        floor: Se,
        ceil: Se
    };
    Qa.scale.linear = function() {
        return Uo([0, 1], [0, 1], yi, !1)
    };
    var gl = {
        s: 1,
        g: 1,
        p: 1,
        r: 1,
        e: 1
    };
    Qa.scale.log = function() {
        return Go(Qa.scale.linear().domain([0, 1]), 10, !0, [1, 10])
    };
    var ml = Qa.format(".0e"),
        vl = {
            floor: function(t) {
                return -Math.ceil(-t)
            },
            ceil: function(t) {
                return -Math.floor(-t)
            }
        };
    Qa.scale.pow = function() {
        return Jo(Qa.scale.linear(), 1, [0, 1])
    }, Qa.scale.sqrt = function() {
        return Qa.scale.pow().exponent(.5)
    }, Qa.scale.ordinal = function() {
        return ea([], {
            t: "range",
            a: [
                []
            ]
        })
    }, Qa.scale.category10 = function() {
        return Qa.scale.ordinal().range(yl)
    }, Qa.scale.category20 = function() {
        return Qa.scale.ordinal().range(bl)
    }, Qa.scale.category20b = function() {
        return Qa.scale.ordinal().range(xl)
    }, Qa.scale.category20c = function() {
        return Qa.scale.ordinal().range(wl)
    };
    var yl = [2062260, 16744206, 2924588, 14034728, 9725885, 9197131, 14907330, 8355711, 12369186, 1556175].map(ye),
        bl = [2062260, 11454440, 16744206, 16759672, 2924588, 10018698, 14034728, 16750742, 9725885, 12955861, 9197131, 12885140, 14907330, 16234194, 8355711, 13092807, 12369186, 14408589, 1556175, 10410725].map(ye),
        xl = [3750777, 5395619, 7040719, 10264286, 6519097, 9216594, 11915115, 13556636, 9202993, 12426809, 15186514, 15190932, 8666169, 11356490, 14049643, 15177372, 8077683, 10834324, 13528509, 14589654].map(ye),
        wl = [3244733, 7057110, 10406625, 13032431, 15095053, 16616764, 16625259, 16634018, 3253076, 7652470, 10607003, 13101504, 7695281, 10394312, 12369372, 14342891, 6513507, 9868950, 12434877, 14277081].map(ye);
    Qa.scale.quantile = function() {
        return na([], [])
    }, Qa.scale.quantize = function() {
        return ra(0, 1, [0, 1])
    }, Qa.scale.threshold = function() {
        return ia([.5], [0, 1])
    }, Qa.scale.identity = function() {
        return oa([0, 1])
    }, Qa.svg = {}, Qa.svg.arc = function() {
        function t() {
            var t = e.apply(this, arguments),
                o = n.apply(this, arguments),
                a = r.apply(this, arguments) + _l,
                s = i.apply(this, arguments) + _l,
                u = (a > s && (u = a, a = s, s = u), s - a),
                l = Es > u ? "0" : "1",
                c = Math.cos(a),
                f = Math.sin(a),
                h = Math.cos(s),
                d = Math.sin(s);
            return u >= Ml ? t ? "M0," + o + "A" + o + "," + o + " 0 1,1 0," + -o + "A" + o + "," + o + " 0 1,1 0," + o + "M0," + t + "A" + t + "," + t + " 0 1,0 0," + -t + "A" + t + "," + t + " 0 1,0 0," + t + "Z" : "M0," + o + "A" + o + "," + o + " 0 1,1 0," + -o + "A" + o + "," + o + " 0 1,1 0," + o + "Z" : t ? "M" + o * c + "," + o * f + "A" + o + "," + o + " 0 " + l + ",1 " + o * h + "," + o * d + "L" + t * h + "," + t * d + "A" + t + "," + t + " 0 " + l + ",0 " + t * c + "," + t * f + "Z" : "M" + o * c + "," + o * f + "A" + o + "," + o + " 0 " + l + ",1 " + o * h + "," + o * d + "L0,0Z"
        }
        var e = aa,
            n = sa,
            r = ua,
            i = la;
        return t.innerRadius = function(n) {
            return arguments.length ? (e = Ee(n), t) : e
        }, t.outerRadius = function(e) {
            return arguments.length ? (n = Ee(e), t) : n
        }, t.startAngle = function(e) {
            return arguments.length ? (r = Ee(e), t) : r
        }, t.endAngle = function(e) {
            return arguments.length ? (i = Ee(e), t) : i
        }, t.centroid = function() {
            var t = (e.apply(this, arguments) + n.apply(this, arguments)) / 2,
                o = (r.apply(this, arguments) + i.apply(this, arguments)) / 2 + _l;
            return [Math.cos(o) * t, Math.sin(o) * t]
        }, t
    };
    var _l = -Ts,
        Ml = Ss - As;
    Qa.svg.line = function() {
        return ca(Se)
    };
    var kl = Qa.map({
        linear: fa,
        "linear-closed": ha,
        step: da,
        "step-before": pa,
        "step-after": ga,
        basis: wa,
        "basis-open": _a,
        "basis-closed": Ma,
        bundle: ka,
        cardinal: ya,
        "cardinal-open": ma,
        "cardinal-closed": va,
        monotone: Aa
    });
    kl.forEach(function(t, e) {
        e.key = t, e.closed = /-closed$/.test(t)
    });
    var Nl = [0, 2 / 3, 1 / 3, 0],
        Cl = [0, 1 / 3, 2 / 3, 0],
        El = [0, 1 / 6, 2 / 3, 1 / 6];
    Qa.svg.line.radial = function() {
        var t = ca($a);
        return t.radius = t.x, delete t.x, t.angle = t.y, delete t.y, t
    }, pa.reverse = ga, ga.reverse = pa, Qa.svg.area = function() {
        return La(Se)
    }, Qa.svg.area.radial = function() {
        var t = La($a);
        return t.radius = t.x, delete t.x, t.innerRadius = t.x0, delete t.x0, t.outerRadius = t.x1, delete t.x1, t.angle = t.y, delete t.y, t.startAngle = t.y0, delete t.y0, t.endAngle = t.y1, delete t.y1, t
    }, Qa.svg.chord = function() {
        function t(t, s) {
            var u = e(this, o, t, s),
                l = e(this, a, t, s);
            return "M" + u.p0 + r(u.r, u.p1, u.a1 - u.a0) + (n(u, l) ? i(u.r, u.p1, u.r, u.p0) : i(u.r, u.p1, l.r, l.p0) + r(l.r, l.p1, l.a1 - l.a0) + i(l.r, l.p1, u.r, u.p0)) + "Z"
        }

        function e(t, e, n, r) {
            var i = e.call(t, n, r),
                o = s.call(t, i, r),
                a = u.call(t, i, r) + _l,
                c = l.call(t, i, r) + _l;
            return {
                r: o,
                a0: a,
                a1: c,
                p0: [o * Math.cos(a), o * Math.sin(a)],
                p1: [o * Math.cos(c), o * Math.sin(c)]
            }
        }

        function n(t, e) {
            return t.a0 == e.a0 && t.a1 == e.a1
        }

        function r(t, e, n) {
            return "A" + t + "," + t + " 0 " + +(n > Es) + ",1 " + e
        }

        function i(t, e, n, r) {
            return "Q 0,0 " + r
        }
        var o = br,
            a = xr,
            s = ja,
            u = ua,
            l = la;
        return t.radius = function(e) {
            return arguments.length ? (s = Ee(e), t) : s
        }, t.source = function(e) {
            return arguments.length ? (o = Ee(e), t) : o
        }, t.target = function(e) {
            return arguments.length ? (a = Ee(e), t) : a
        }, t.startAngle = function(e) {
            return arguments.length ? (u = Ee(e), t) : u
        }, t.endAngle = function(e) {
            return arguments.length ? (l = Ee(e), t) : l
        }, t
    }, Qa.svg.diagonal = function() {
        function t(t, i) {
            var o = e.call(this, t, i),
                a = n.call(this, t, i),
                s = (o.y + a.y) / 2,
                u = [o, {
                    x: o.x,
                    y: s
                }, {
                    x: a.x,
                    y: s
                }, a];
            return u = u.map(r), "M" + u[0] + "C" + u[1] + " " + u[2] + " " + u[3]
        }
        var e = br,
            n = xr,
            r = Da;
        return t.source = function(n) {
            return arguments.length ? (e = Ee(n), t) : e
        }, t.target = function(e) {
            return arguments.length ? (n = Ee(e), t) : n
        }, t.projection = function(e) {
            return arguments.length ? (r = e, t) : r
        }, t
    }, Qa.svg.diagonal.radial = function() {
        var t = Qa.svg.diagonal(),
            e = Da,
            n = t.projection;
        return t.projection = function(t) {
            return arguments.length ? n(qa(e = t)) : e
        }, t
    }, Qa.svg.symbol = function() {
        function t(t, r) {
            return (Sl.get(e.call(this, t, r)) || Ia)(n.call(this, t, r))
        }
        var e = za,
            n = Ra;
        return t.type = function(n) {
            return arguments.length ? (e = Ee(n), t) : e
        }, t.size = function(e) {
            return arguments.length ? (n = Ee(e), t) : n
        }, t
    };
    var Sl = Qa.map({
        circle: Ia,
        cross: function(t) {
            var e = Math.sqrt(t / 5) / 2;
            return "M" + -3 * e + "," + -e + "H" + -e + "V" + -3 * e + "H" + e + "V" + -e + "H" + 3 * e + "V" + e + "H" + e + "V" + 3 * e + "H" + -e + "V" + e + "H" + -3 * e + "Z"
        },
        diamond: function(t) {
            var e = Math.sqrt(t / (2 * Al)),
                n = e * Al;
            return "M0," + -e + "L" + n + ",0 0," + e + " " + -n + ",0Z"
        },
        square: function(t) {
            var e = Math.sqrt(t) / 2;
            return "M" + -e + "," + -e + "L" + e + "," + -e + " " + e + "," + e + " " + -e + "," + e + "Z"
        },
        "triangle-down": function(t) {
            var e = Math.sqrt(t / Tl),
                n = e * Tl / 2;
            return "M0," + n + "L" + e + "," + -n + " " + -e + "," + -n + "Z"
        },
        "triangle-up": function(t) {
            var e = Math.sqrt(t / Tl),
                n = e * Tl / 2;
            return "M0," + -n + "L" + e + "," + n + " " + -e + "," + n + "Z"
        }
    });
    Qa.svg.symbolTypes = Sl.keys();
    var Tl = Math.sqrt(3),
        Al = Math.tan(30 * Ls),
        $l = [],
        Ll = 0,
        jl, Dl;
    $l.call = xs.call, $l.empty = xs.empty, $l.node = xs.node, $l.size = xs.size, Qa.transition = function(t) {
        return arguments.length ? jl ? t.transition() : t : Ms.transition()
    }, Qa.transition.prototype = $l, $l.select = function(t) {
        var e = this.id,
            n = [],
            r, i, o;
        t = _(t);
        for (var a = -1, s = this.length; ++a < s;) {
            n.push(r = []);
            for (var u = this[a], l = -1, c = u.length; ++l < c;)(o = u[l]) && (i = t.call(o, o.__data__, l, a)) ? ("__data__" in o && (i.__data__ = o.__data__), Ha(i, l, e, o.__transition__[e]), r.push(i)) : r.push(null)
        }
        return Ba(n, e)
    }, $l.selectAll = function(t) {
        var e = this.id,
            n = [],
            r, i, o, a, s;
        t = M(t);
        for (var u = -1, l = this.length; ++u < l;)
            for (var c = this[u], f = -1, h = c.length; ++f < h;)
                if (o = c[f]) {
                    s = o.__transition__[e], i = t.call(o, o.__data__, f, u), n.push(r = []);
                    for (var d = -1, p = i.length; ++d < p;)(a = i[d]) && Ha(a, d, e, s), r.push(a)
                }
        return Ba(n, e)
    }, $l.filter = function(t) {
        var e = [],
            n, r, i;
        "function" != typeof t && (t = q(t));
        for (var o = 0, a = this.length; a > o; o++) {
            e.push(n = []);
            for (var r = this[o], s = 0, u = r.length; u > s; s++)(i = r[s]) && t.call(i, i.__data__, s, o) && n.push(i)
        }
        return Ba(e, this.id)
    }, $l.tween = function(t, e) {
        var n = this.id;
        return arguments.length < 2 ? this.node().__transition__[n].tween.get(t) : z(this, null == e ? function(e) {
            e.__transition__[n].tween.remove(t)
        } : function(r) {
            r.__transition__[n].tween.set(t, e)
        })
    }, $l.attr = function(t, e) {
        function n() {
            this.removeAttribute(s)
        }

        function r() {
            this.removeAttributeNS(s.space, s.local)
        }

        function i(t) {
            return null == t ? n : (t += "", function() {
                var e = this.getAttribute(s),
                    n;
                return e !== t && (n = a(e, t), function(t) {
                    this.setAttribute(s, n(t))
                })
            })
        }

        function o(t) {
            return null == t ? r : (t += "", function() {
                var e = this.getAttributeNS(s.space, s.local),
                    n;
                return e !== t && (n = a(e, t), function(t) {
                    this.setAttributeNS(s.space, s.local, n(t))
                })
            })
        }
        if (arguments.length < 2) {
            for (e in t) this.attr(e, t[e]);
            return this
        }
        var a = "transform" == t ? Pi : yi,
            s = Qa.ns.qualify(t);
        return Oa(this, "attr." + t, e, s.local ? o : i)
    }, $l.attrTween = function(t, e) {
        function n(t, n) {
            var r = e.call(this, t, n, this.getAttribute(i));
            return r && function(t) {
                this.setAttribute(i, r(t))
            }
        }

        function r(t, n) {
            var r = e.call(this, t, n, this.getAttributeNS(i.space, i.local));
            return r && function(t) {
                this.setAttributeNS(i.space, i.local, r(t))
            }
        }
        var i = Qa.ns.qualify(t);
        return this.tween("attr." + t, i.local ? r : n)
    }, $l.style = function(t, e, n) {
        function r() {
            this.style.removeProperty(t)
        }

        function i(e) {
            return null == e ? r : (e += "", function() {
                var r = es.getComputedStyle(this, null).getPropertyValue(t),
                    i;
                return r !== e && (i = yi(r, e), function(e) {
                    this.style.setProperty(t, i(e), n)
                })
            })
        }
        var o = arguments.length;
        if (3 > o) {
            if ("string" != typeof t) {
                2 > o && (e = "");
                for (n in t) this.style(n, t[n], e);
                return this
            }
            n = ""
        }
        return Oa(this, "style." + t, e, i)
    }, $l.styleTween = function(t, e, n) {
        function r(r, i) {
            var o = e.call(this, r, i, es.getComputedStyle(this, null).getPropertyValue(t));
            return o && function(e) {
                this.style.setProperty(t, o(e), n)
            }
        }
        return arguments.length < 3 && (n = ""), this.tween("style." + t, r)
    }, $l.text = function(t) {
        return Oa(this, "text", t, Pa)
    }, $l.remove = function() {
        return this.each("end.transition", function() {
            var t;
            this.__transition__.count < 2 && (t = this.parentNode) && t.removeChild(this)
        })
    }, $l.ease = function(t) {
        var e = this.id;
        return arguments.length < 1 ? this.node().__transition__[e].ease : ("function" != typeof t && (t = Qa.ease.apply(Qa, arguments)), z(this, function(n) {
            n.__transition__[e].ease = t
        }))
    }, $l.delay = function(t) {
        var e = this.id;
        return arguments.length < 1 ? this.node().__transition__[e].delay : z(this, "function" == typeof t ? function(n, r, i) {
            n.__transition__[e].delay = +t.call(n, n.__data__, r, i)
        } : (t = +t, function(n) {
            n.__transition__[e].delay = t
        }))
    }, $l.duration = function(t) {
        var e = this.id;
        return arguments.length < 1 ? this.node().__transition__[e].duration : z(this, "function" == typeof t ? function(n, r, i) {
            n.__transition__[e].duration = Math.max(1, t.call(n, n.__data__, r, i))
        } : (t = Math.max(1, t), function(n) {
            n.__transition__[e].duration = t
        }))
    }, $l.each = function(t, e) {
        var n = this.id;
        if (arguments.length < 2) {
            var r = Dl,
                i = jl;
            jl = n, z(this, function(e, r, i) {
                Dl = e.__transition__[n], t.call(e, e.__data__, r, i)
            }), Dl = r, jl = i
        } else z(this, function(r) {
            var i = r.__transition__[n];
            (i.event || (i.event = Qa.dispatch("start", "end"))).on(t, e)
        });
        return this
    }, $l.transition = function() {
        for (var t = this.id, e = ++Ll, n = [], r, i, o, a, s = 0, u = this.length; u > s; s++) {
            n.push(r = []);
            for (var i = this[s], l = 0, c = i.length; c > l; l++)(o = i[l]) && (a = Object.create(o.__transition__[t]), a.delay += a.duration, Ha(o, l, e, a)), r.push(o)
        }
        return Ba(n, e)
    }, Qa.svg.axis = function() {
        function t(t) {
            t.each(function() {
                var t = Qa.select(this),
                    l = this.__chart__ || e,
                    c = this.__chart__ = e.copy(),
                    f = null == s ? c.ticks ? c.ticks.apply(c, a) : c.domain() : s,
                    h = null == u ? c.tickFormat ? c.tickFormat.apply(c, a) : Se : u,
                    d = t.selectAll(".tick").data(f, c),
                    p = d.enter().insert("g", ".domain").attr("class", "tick").style("opacity", As),
                    g = Qa.transition(d.exit()).style("opacity", As).remove(),
                    m = Qa.transition(d.order()).style("opacity", 1),
                    v, y = Bo(c),
                    b = t.selectAll(".domain").data([0]),
                    x = (b.enter().append("path").attr("class", "domain"), Qa.transition(b));
                p.append("line"), p.append("text");
                var w = p.select("line"),
                    _ = m.select("line"),
                    M = d.select("text").text(h),
                    k = p.select("text"),
                    N = m.select("text");
                switch (n) {
                    case "bottom":
                        v = Fa, w.attr("y2", r), k.attr("y", Math.max(r, 0) + o), _.attr("x2", 0).attr("y2", r), N.attr("x", 0).attr("y", Math.max(r, 0) + o), M.attr("dy", ".71em").style("text-anchor", "middle"), x.attr("d", "M" + y[0] + "," + i + "V0H" + y[1] + "V" + i);
                        break;
                    case "top":
                        v = Fa, w.attr("y2", -r), k.attr("y", -(Math.max(r, 0) + o)), _.attr("x2", 0).attr("y2", -r), N.attr("x", 0).attr("y", -(Math.max(r, 0) + o)), M.attr("dy", "0em").style("text-anchor", "middle"), x.attr("d", "M" + y[0] + "," + -i + "V0H" + y[1] + "V" + -i);
                        break;
                    case "left":
                        v = Ua, w.attr("x2", -r), k.attr("x", -(Math.max(r, 0) + o)), _.attr("x2", -r).attr("y2", 0), N.attr("x", -(Math.max(r, 0) + o)).attr("y", 0), M.attr("dy", ".32em").style("text-anchor", "end"), x.attr("d", "M" + -i + "," + y[0] + "H0V" + y[1] + "H" + -i);
                        break;
                    case "right":
                        v = Ua, w.attr("x2", r), k.attr("x", Math.max(r, 0) + o), _.attr("x2", r).attr("y2", 0), N.attr("x", Math.max(r, 0) + o).attr("y", 0), M.attr("dy", ".32em").style("text-anchor", "start"), x.attr("d", "M" + i + "," + y[0] + "H0V" + y[1] + "H" + i)
                }
                if (c.rangeBand) {
                    var C = c,
                        E = C.rangeBand() / 2;
                    l = c = function(t) {
                        return C(t) + E
                    }
                } else l.rangeBand ? l = c : g.call(v, c);
                p.call(v, l), m.call(v, c)
            })
        }
        var e = Qa.scale.linear(),
            n = ql,
            r = 6,
            i = 6,
            o = 3,
            a = [10],
            s = null,
            u;
        return t.scale = function(n) {
            return arguments.length ? (e = n, t) : e
        }, t.orient = function(e) {
            return arguments.length ? (n = e in Rl ? e + "" : ql, t) : n
        }, t.ticks = function() {
            return arguments.length ? (a = arguments, t) : a
        }, t.tickValues = function(e) {
            return arguments.length ? (s = e, t) : s
        }, t.tickFormat = function(e) {
            return arguments.length ? (u = e, t) : u
        }, t.tickSize = function(e) {
            var n = arguments.length;
            return n ? (r = +e, i = +arguments[n - 1], t) : r
        }, t.innerTickSize = function(e) {
            return arguments.length ? (r = +e, t) : r
        }, t.outerTickSize = function(e) {
            return arguments.length ? (i = +e, t) : i
        }, t.tickPadding = function(e) {
            return arguments.length ? (o = +e, t) : o
        }, t.tickSubdivide = function() {
            return arguments.length && t
        }, t
    };
    var ql = "bottom",
        Rl = {
            top: 1,
            right: 1,
            bottom: 1,
            left: 1
        };
    Qa.svg.brush = function() {
        function t(o) {
            o.each(function() {
                var o = Qa.select(this).style("pointer-events", "all").style("-webkit-tap-highlight-color", "rgba(0,0,0,0)").on("mousedown.brush", i).on("touchstart.brush", i),
                    u = o.selectAll(".background").data([0]);
                u.enter().append("rect").attr("class", "background").style("visibility", "hidden").style("cursor", "crosshair"), o.selectAll(".extent").data([0]).enter().append("rect").attr("class", "extent").style("cursor", "move");
                var l = o.selectAll(".resize").data(p, Se);
                l.exit().remove(), l.enter().append("g").attr("class", function(t) {
                    return "resize " + t
                }).style("cursor", function(t) {
                    return zl[t]
                }).append("rect").attr("x", function(t) {
                    return /[ew]$/.test(t) ? -3 : null
                }).attr("y", function(t) {
                    return /^[ns]/.test(t) ? -3 : null
                }).attr("width", 6).attr("height", 6).style("visibility", "hidden"), l.style("display", t.empty() ? "none" : null);
                var c = Qa.transition(o),
                    f = Qa.transition(u),
                    h;
                a && (h = Bo(a), f.attr("x", h[0]).attr("width", h[1] - h[0]), n(c)), s && (h = Bo(s), f.attr("y", h[0]).attr("height", h[1] - h[0]), r(c)), e(c)
            })
        }

        function e(t) {
            t.selectAll(".resize").attr("transform", function(t) {
                return "translate(" + u[+/e$/.test(t)] + "," + l[+/^s/.test(t)] + ")"
            })
        }

        function n(t) {
            t.select(".extent").attr("x", u[0]), t.selectAll(".extent,.n>rect,.s>rect").attr("width", u[1] - u[0])
        }

        function r(t) {
            t.select(".extent").attr("y", l[0]), t.selectAll(".extent,.e>rect,.w>rect").attr("height", l[1] - l[0])
        }

        function i() {
            function i() {
                32 == Qa.event.keyCode && (C || (S = null, T[0] -= u[1], T[1] -= l[1], C = 2), y())
            }

            function p() {
                32 == Qa.event.keyCode && 2 == C && (T[0] += u[1], T[1] += l[1], C = 0, y())
            }

            function g() {
                var t = Qa.mouse(b),
                    i = !1;
                A && (t[0] += A[0], t[1] += A[1]), C || (Qa.event.altKey ? (S || (S = [(u[0] + u[1]) / 2, (l[0] + l[1]) / 2]), T[0] = u[+(t[0] < S[0])], T[1] = l[+(t[1] < S[1])]) : S = null), k && m(t, a, 0) && (n(_), i = !0), N && m(t, s, 1) && (r(_), i = !0), i && (e(_), w({
                    type: "brush",
                    mode: C ? "move" : "resize"
                }))
            }

            function m(t, e, n) {
                var r = Bo(e),
                    i = r[0],
                    o = r[1],
                    a = T[n],
                    s = n ? l : u,
                    p = s[1] - s[0],
                    g, m;
                return C && (i -= a, o -= p + a), g = (n ? d : h) ? Math.max(i, Math.min(o, t[n])) : t[n], C ? m = (g += a) + p : (S && (a = Math.max(i, Math.min(o, 2 * S[n] - g))), g > a ? (m = g, g = a) : m = a), s[0] != g || s[1] != m ? (n ? f = null : c = null, s[0] = g, s[1] = m, !0) : void 0
            }

            function v() {
                g(), _.style("pointer-events", "all").selectAll(".resize").style("display", t.empty() ? "none" : null), Qa.select("body").style("cursor", null), L.on("mousemove.brush", null).on("mouseup.brush", null).on("touchmove.brush", null).on("touchend.brush", null).on("keydown.brush", null).on("keyup.brush", null), E(), w({
                    type: "brushend"
                })
            }
            var b = this,
                x = Qa.select(Qa.event.target),
                w = o.of(b, arguments),
                _ = Qa.select(b),
                M = x.datum(),
                k = !/^(n|s)$/.test(M) && a,
                N = !/^(e|w)$/.test(M) && s,
                C = x.classed("extent"),
                E = U(),
                S, T = Qa.mouse(b),
                A, L = Qa.select(es).on("keydown.brush", i).on("keyup.brush", p);
            if (Qa.event.changedTouches ? L.on("touchmove.brush", g).on("touchend.brush", v) : L.on("mousemove.brush", g).on("mouseup.brush", v), _.interrupt().selectAll("*").interrupt(), C) T[0] = u[0] - T[0], T[1] = l[0] - T[1];
            else if (M) {
                var j = +/w$/.test(M),
                    D = +/^n/.test(M);
                A = [u[1 - j] - T[0], l[1 - D] - T[1]], T[0] = u[j], T[1] = l[D]
            } else Qa.event.altKey && (S = T.slice());
            _.style("pointer-events", "none").selectAll(".resize").style("display", null), Qa.select("body").style("cursor", x.style("cursor")), w({
                type: "brushstart"
            }), g()
        }
        var o = x(t, "brushstart", "brush", "brushend"),
            a = null,
            s = null,
            u = [0, 0],
            l = [0, 0],
            c, f, h = !0,
            d = !0,
            p = Il[0];
        return t.event = function(t) {
            t.each(function() {
                var t = o.of(this, arguments),
                    e = {
                        x: u,
                        y: l,
                        i: c,
                        j: f
                    },
                    n = this.__chart__ || e;
                this.__chart__ = e, jl ? Qa.select(this).transition().each("start.brush", function() {
                    c = n.i, f = n.j, u = n.x, l = n.y, t({
                        type: "brushstart"
                    })
                }).tween("brush:brush", function() {
                    var n = bi(u, e.x),
                        r = bi(l, e.y);
                    return c = f = null,
                        function(i) {
                            u = e.x = n(i), l = e.y = r(i), t({
                                type: "brush",
                                mode: "resize"
                            })
                        }
                }).each("end.brush", function() {
                    c = e.i, f = e.j, t({
                        type: "brush",
                        mode: "resize"
                    }), t({
                        type: "brushend"
                    })
                }) : (t({
                    type: "brushstart"
                }), t({
                    type: "brush",
                    mode: "resize"
                }), t({
                    type: "brushend"
                }))
            })
        }, t.x = function(e) {
            return arguments.length ? (a = e, p = Il[!a << 1 | !s], t) : a
        }, t.y = function(e) {
            return arguments.length ? (s = e, p = Il[!a << 1 | !s], t) : s
        }, t.clamp = function(e) {
            return arguments.length ? (a && s ? (h = !!e[0], d = !!e[1]) : a ? h = !!e : s && (d = !!e), t) : a && s ? [h, d] : a ? h : s ? d : null
        }, t.extent = function(e) {
            var n, r, i, o, h;
            return arguments.length ? (a && (n = e[0], r = e[1], s && (n = n[0], r = r[0]), c = [n, r], a.invert && (n = a(n), r = a(r)), n > r && (h = n, n = r, r = h), (n != u[0] || r != u[1]) && (u = [n, r])), s && (i = e[0], o = e[1], a && (i = i[1], o = o[1]), f = [i, o], s.invert && (i = s(i), o = s(o)), i > o && (h = i, i = o, o = h), (i != l[0] || o != l[1]) && (l = [i, o])), t) : (a && (c ? (n = c[0], r = c[1]) : (n = u[0], r = u[1], a.invert && (n = a.invert(n), r = a.invert(r)), n > r && (h = n, n = r, r = h))), s && (f ? (i = f[0], o = f[1]) : (i = l[0], o = l[1], s.invert && (i = s.invert(i), o = s.invert(o)), i > o && (h = i, i = o, o = h))), a && s ? [
                [n, i],
                [r, o]
            ] : a ? [n, r] : s && [i, o])
        }, t.clear = function() {
            return t.empty() || (u = [0, 0], l = [0, 0], c = f = null), t
        }, t.empty = function() {
            return !!a && u[0] == u[1] || !!s && l[0] == l[1]
        }, Qa.rebind(t, o, "on")
    };
    var zl = {
            n: "ns-resize",
            e: "ew-resize",
            s: "ns-resize",
            w: "ew-resize",
            nw: "nwse-resize",
            ne: "nesw-resize",
            se: "nwse-resize",
            sw: "nesw-resize"
        },
        Il = [
            ["n", "e", "s", "w", "nw", "ne", "se", "sw"],
            ["e", "w"],
            ["n", "s"],
            []
        ],
        Bl = iu.format = cu.timeFormat,
        Ol = Bl.utc,
        Pl = Ol("%Y-%m-%dT%H:%M:%S.%LZ");
    Bl.iso = Date.prototype.toISOString && +new Date("2000-01-01T00:00:00.000Z") ? Wa : Pl, Wa.parse = function(t) {
        var e = new Date(t);
        return isNaN(e) ? null : e
    }, Wa.toString = Pl.toString, iu.second = Oe(function(t) {
        return new ou(1e3 * Math.floor(t / 1e3))
    }, function(t, e) {
        t.setTime(t.getTime() + 1e3 * Math.floor(e))
    }, function(t) {
        return t.getSeconds()
    }), iu.seconds = iu.second.range, iu.seconds.utc = iu.second.utc.range, iu.minute = Oe(function(t) {
        return new ou(6e4 * Math.floor(t / 6e4))
    }, function(t, e) {
        t.setTime(t.getTime() + 6e4 * Math.floor(e))
    }, function(t) {
        return t.getMinutes()
    }), iu.minutes = iu.minute.range, iu.minutes.utc = iu.minute.utc.range, iu.hour = Oe(function(t) {
        var e = t.getTimezoneOffset() / 60;
        return new ou(36e5 * (Math.floor(t / 36e5 - e) + e))
    }, function(t, e) {
        t.setTime(t.getTime() + 36e5 * Math.floor(e))
    }, function(t) {
        return t.getHours()
    }), iu.hours = iu.hour.range, iu.hours.utc = iu.hour.utc.range, iu.month = Oe(function(t) {
        return t = iu.day(t), t.setDate(1), t
    }, function(t, e) {
        t.setMonth(t.getMonth() + e)
    }, function(t) {
        return t.getMonth()
    }), iu.months = iu.month.range, iu.months.utc = iu.month.utc.range;
    var Hl = [1e3, 5e3, 15e3, 3e4, 6e4, 3e5, 9e5, 18e5, 36e5, 108e5, 216e5, 432e5, 864e5, 1728e5, 6048e5, 2592e6, 7776e6, 31536e6],
        Fl = [
            [iu.second, 1],
            [iu.second, 5],
            [iu.second, 15],
            [iu.second, 30],
            [iu.minute, 1],
            [iu.minute, 5],
            [iu.minute, 15],
            [iu.minute, 30],
            [iu.hour, 1],
            [iu.hour, 3],
            [iu.hour, 6],
            [iu.hour, 12],
            [iu.day, 1],
            [iu.day, 2],
            [iu.week, 1],
            [iu.month, 1],
            [iu.month, 3],
            [iu.year, 1]
        ],
        Ul = Bl.multi([
            [".%L", function(t) {
                return t.getMilliseconds()
            }],
            [":%S", function(t) {
                return t.getSeconds()
            }],
            ["%I:%M", function(t) {
                return t.getMinutes()
            }],
            ["%I %p", function(t) {
                return t.getHours()
            }],
            ["%a %d", function(t) {
                return t.getDay() && 1 != t.getDate()
            }],
            ["%b %d", function(t) {
                return 1 != t.getDate()
            }],
            ["%B", function(t) {
                return t.getMonth()
            }],
            ["%Y", Tn]
        ]),
        Wl = {
            range: function(t, e, n) {
                return Qa.range(Math.ceil(t / n) * n, +e, n).map(Za)
            },
            floor: Se,
            ceil: Se
        };
    Fl.year = iu.year, iu.scale = function() {
        return Va(Qa.scale.linear(), Fl, Ul)
    };
    var Vl = Fl.map(function(t) {
            return [t[0].utc, t[1]]
        }),
        Zl = Ol.multi([
            [".%L", function(t) {
                return t.getUTCMilliseconds()
            }],
            [":%S", function(t) {
                return t.getUTCSeconds()
            }],
            ["%I:%M", function(t) {
                return t.getUTCMinutes()
            }],
            ["%I %p", function(t) {
                return t.getUTCHours()
            }],
            ["%a %d", function(t) {
                return t.getUTCDay() && 1 != t.getUTCDate()
            }],
            ["%b %d", function(t) {
                return 1 != t.getUTCDate()
            }],
            ["%B", function(t) {
                return t.getUTCMonth()
            }],
            ["%Y", Tn]
        ]);
    Vl.year = iu.year.utc, iu.scale.utc = function() {
        return Va(Qa.scale.linear(), Vl, Zl)
    }, Qa.text = Te(function(t) {
        return t.responseText
    }), Qa.json = function(t, e) {
        return Ae(t, "application/json", Ya, e)
    }, Qa.html = function(t, e) {
        return Ae(t, "text/html", Xa, e)
    }, Qa.xml = Te(function(t) {
        return t.responseXML
    }), "function" == typeof define && define.amd ? define(Qa) : "object" == typeof module && module.exports ? module.exports = Qa : this.d3 = Qa
}(),
function(t, e) {
    "object" == typeof module && "object" == typeof module.exports ? module.exports = t.document ? e(t, !0) : function(t) {
        if (!t.document) throw new Error("jQuery requires a window with a document");
        return e(t)
    } : e(t)
}("undefined" != typeof window ? window : this, function(t, e) {
    function n(t) {
        var e = t.length,
            n = te.type(t);
        return "function" === n || te.isWindow(t) ? !1 : 1 === t.nodeType && e ? !0 : "array" === n || 0 === e || "number" == typeof e && e > 0 && e - 1 in t
    }

    function r(t, e, n) {
        if (te.isFunction(e)) return te.grep(t, function(t, r) {
            return !!e.call(t, r, t) !== n
        });
        if (e.nodeType) return te.grep(t, function(t) {
            return t === e !== n
        });
        if ("string" == typeof e) {
            if (ue.test(e)) return te.filter(e, t, n);
            e = te.filter(e, t)
        }
        return te.grep(t, function(t) {
            return Z.call(e, t) >= 0 !== n
        })
    }

    function i(t, e) {
        for (;
            (t = t[e]) && 1 !== t.nodeType;);
        return t
    }

    function o(t) {
        var e = ge[t] = {};
        return te.each(t.match(pe) || [], function(t, n) {
            e[n] = !0
        }), e
    }

    function a() {
        G.removeEventListener("DOMContentLoaded", a, !1), t.removeEventListener("load", a, !1), te.ready()
    }

    function s() {
        Object.defineProperty(this.cache = {}, 0, {
            get: function() {
                return {}
            }
        }), this.expando = te.expando + Math.random()
    }

    function u(t, e, n) {
        var r;
        if (void 0 === n && 1 === t.nodeType)
            if (r = "data-" + e.replace(we, "-$1").toLowerCase(), n = t.getAttribute(r), "string" == typeof n) {
                try {
                    n = "true" === n ? !0 : "false" === n ? !1 : "null" === n ? null : +n + "" === n ? +n : xe.test(n) ? te.parseJSON(n) : n
                } catch (i) {}
                be.set(t, e, n)
            } else n = void 0;
        return n
    }

    function l() {
        return !0
    }

    function c() {
        return !1
    }

    function f() {
        try {
            return G.activeElement
        } catch (t) {}
    }

    function h(t, e) {
        return te.nodeName(t, "table") && te.nodeName(11 !== e.nodeType ? e : e.firstChild, "tr") ? t.getElementsByTagName("tbody")[0] || t.appendChild(t.ownerDocument.createElement("tbody")) : t
    }

    function d(t) {
        return t.type = (null !== t.getAttribute("type")) + "/" + t.type, t
    }

    function p(t) {
        var e = ze.exec(t.type);
        return e ? t.type = e[1] : t.removeAttribute("type"), t
    }

    function g(t, e) {
        for (var n = 0, r = t.length; r > n; n++) ye.set(t[n], "globalEval", !e || ye.get(e[n], "globalEval"))
    }

    function m(t, e) {
        var n, r, i, o, a, s, u, l;
        if (1 === e.nodeType) {
            if (ye.hasData(t) && (o = ye.access(t), a = ye.set(e, o), l = o.events)) {
                delete a.handle, a.events = {};
                for (i in l)
                    for (n = 0, r = l[i].length; r > n; n++) te.event.add(e, i, l[i][n])
            }
            be.hasData(t) && (s = be.access(t), u = te.extend({}, s), be.set(e, u))
        }
    }

    function v(t, e) {
        var n = t.getElementsByTagName ? t.getElementsByTagName(e || "*") : t.querySelectorAll ? t.querySelectorAll(e || "*") : [];
        return void 0 === e || e && te.nodeName(t, e) ? te.merge([t], n) : n
    }

    function y(t, e) {
        var n = e.nodeName.toLowerCase();
        "input" === n && Ne.test(t.type) ? e.checked = t.checked : ("input" === n || "textarea" === n) && (e.defaultValue = t.defaultValue)
    }

    function b(e, n) {
        var r, i = te(n.createElement(e)).appendTo(n.body),
            o = t.getDefaultComputedStyle && (r = t.getDefaultComputedStyle(i[0])) ? r.display : te.css(i[0], "display");
        return i.detach(), o
    }

    function x(t) {
        var e = G,
            n = Pe[t];
        return n || (n = b(t, e), "none" !== n && n || (Oe = (Oe || te("<iframe frameborder='0' width='0' height='0'/>")).appendTo(e.documentElement), e = Oe[0].contentDocument, e.write(), e.close(), n = b(t, e), Oe.detach()), Pe[t] = n), n
    }

    function w(t, e, n) {
        var r, i, o, a, s = t.style;
        return n = n || Ue(t), n && (a = n.getPropertyValue(e) || n[e]), n && ("" !== a || te.contains(t.ownerDocument, t) || (a = te.style(t, e)), Fe.test(a) && He.test(e) && (r = s.width, i = s.minWidth, o = s.maxWidth, s.minWidth = s.maxWidth = s.width = a, a = n.width, s.width = r, s.minWidth = i, s.maxWidth = o)), void 0 !== a ? a + "" : a
    }

    function _(t, e) {
        return {
            get: function() {
                return t() ? void delete this.get : (this.get = e).apply(this, arguments)
            }
        }
    }

    function M(t, e) {
        if (e in t) return e;
        for (var n = e[0].toUpperCase() + e.slice(1), r = e, i = Qe.length; i--;)
            if (e = Qe[i] + n, e in t) return e;
        return r
    }

    function k(t, e, n) {
        var r = Ve.exec(e);
        return r ? Math.max(0, r[1] - (n || 0)) + (r[2] || "px") : e
    }

    function N(t, e, n, r, i) {
        for (var o = n === (r ? "border" : "content") ? 4 : "width" === e ? 1 : 0, a = 0; 4 > o; o += 2) "margin" === n && (a += te.css(t, n + Me[o], !0, i)), r ? ("content" === n && (a -= te.css(t, "padding" + Me[o], !0, i)), "margin" !== n && (a -= te.css(t, "border" + Me[o] + "Width", !0, i))) : (a += te.css(t, "padding" + Me[o], !0, i), "padding" !== n && (a += te.css(t, "border" + Me[o] + "Width", !0, i)));
        return a
    }

    function C(t, e, n) {
        var r = !0,
            i = "width" === e ? t.offsetWidth : t.offsetHeight,
            o = Ue(t),
            a = "border-box" === te.css(t, "boxSizing", !1, o);
        if (0 >= i || null == i) {
            if (i = w(t, e, o), (0 > i || null == i) && (i = t.style[e]), Fe.test(i)) return i;
            r = a && (K.boxSizingReliable() || i === t.style[e]), i = parseFloat(i) || 0
        }
        return i + N(t, e, n || (a ? "border" : "content"), r, o) + "px"
    }

    function E(t, e) {
        for (var n, r, i, o = [], a = 0, s = t.length; s > a; a++) r = t[a], r.style && (o[a] = ye.get(r, "olddisplay"), n = r.style.display, e ? (o[a] || "none" !== n || (r.style.display = ""), "" === r.style.display && ke(r) && (o[a] = ye.access(r, "olddisplay", x(r.nodeName)))) : (i = ke(r), "none" === n && i || ye.set(r, "olddisplay", i ? n : te.css(r, "display"))));
        for (a = 0; s > a; a++) r = t[a], r.style && (e && "none" !== r.style.display && "" !== r.style.display || (r.style.display = e ? o[a] || "" : "none"));
        return t
    }

    function S(t, e, n, r, i) {
        return new S.prototype.init(t, e, n, r, i)
    }

    function T() {
        return setTimeout(function() {
            Ke = void 0
        }), Ke = te.now()
    }

    function A(t, e) {
        var n, r = 0,
            i = {
                height: t
            };
        for (e = e ? 1 : 0; 4 > r; r += 2 - e) n = Me[r], i["margin" + n] = i["padding" + n] = t;
        return e && (i.opacity = i.width = t), i
    }

    function L(t, e, n) {
        for (var r, i = (rn[e] || []).concat(rn["*"]), o = 0, a = i.length; a > o; o++)
            if (r = i[o].call(n, e, t)) return r
    }

    function j(t, e, n) {
        var r, i, o, a, s, u, l, c, f = this,
            h = {},
            d = t.style,
            p = t.nodeType && ke(t),
            g = ye.get(t, "fxshow");
        n.queue || (s = te._queueHooks(t, "fx"), null == s.unqueued && (s.unqueued = 0, u = s.empty.fire, s.empty.fire = function() {
            s.unqueued || u()
        }), s.unqueued++, f.always(function() {
            f.always(function() {
                s.unqueued--, te.queue(t, "fx").length || s.empty.fire()
            })
        })), 1 === t.nodeType && ("height" in e || "width" in e) && (n.overflow = [d.overflow, d.overflowX, d.overflowY], l = te.css(t, "display"), c = "none" === l ? ye.get(t, "olddisplay") || x(t.nodeName) : l, "inline" === c && "none" === te.css(t, "float") && (d.display = "inline-block")), n.overflow && (d.overflow = "hidden", f.always(function() {
            d.overflow = n.overflow[0], d.overflowX = n.overflow[1], d.overflowY = n.overflow[2]
        }));
        for (r in e)
            if (i = e[r], Je.exec(i)) {
                if (delete e[r], o = o || "toggle" === i, i === (p ? "hide" : "show")) {
                    if ("show" !== i || !g || void 0 === g[r]) continue;
                    p = !0
                }
                h[r] = g && g[r] || te.style(t, r)
            } else l = void 0;
        if (te.isEmptyObject(h)) "inline" === ("none" === l ? x(t.nodeName) : l) && (d.display = l);
        else {
            g ? "hidden" in g && (p = g.hidden) : g = ye.access(t, "fxshow", {}), o && (g.hidden = !p), p ? te(t).show() : f.done(function() {
                te(t).hide()
            }), f.done(function() {
                var e;
                ye.remove(t, "fxshow");
                for (e in h) te.style(t, e, h[e])
            });
            for (r in h) a = L(p ? g[r] : 0, r, f), r in g || (g[r] = a.start, p && (a.end = a.start, a.start = "width" === r || "height" === r ? 1 : 0))
        }
    }

    function D(t, e) {
        var n, r, i, o, a;
        for (n in t)
            if (r = te.camelCase(n), i = e[r], o = t[n], te.isArray(o) && (i = o[1], o = t[n] = o[0]), n !== r && (t[r] = o, delete t[n]), a = te.cssHooks[r], a && "expand" in a) {
                o = a.expand(o), delete t[r];
                for (n in o) n in t || (t[n] = o[n], e[n] = i)
            } else e[r] = i
    }

    function q(t, e, n) {
        var r, i, o = 0,
            a = nn.length,
            s = te.Deferred().always(function() {
                delete u.elem
            }),
            u = function() {
                if (i) return !1;
                for (var e = Ke || T(), n = Math.max(0, l.startTime + l.duration - e), r = n / l.duration || 0, o = 1 - r, a = 0, u = l.tweens.length; u > a; a++) l.tweens[a].run(o);
                return s.notifyWith(t, [l, o, n]), 1 > o && u ? n : (s.resolveWith(t, [l]), !1)
            },
            l = s.promise({
                elem: t,
                props: te.extend({}, e),
                opts: te.extend(!0, {
                    specialEasing: {}
                }, n),
                originalProperties: e,
                originalOptions: n,
                startTime: Ke || T(),
                duration: n.duration,
                tweens: [],
                createTween: function(e, n) {
                    var r = te.Tween(t, l.opts, e, n, l.opts.specialEasing[e] || l.opts.easing);
                    return l.tweens.push(r), r
                },
                stop: function(e) {
                    var n = 0,
                        r = e ? l.tweens.length : 0;
                    if (i) return this;
                    for (i = !0; r > n; n++) l.tweens[n].run(1);
                    return e ? s.resolveWith(t, [l, e]) : s.rejectWith(t, [l, e]), this
                }
            }),
            c = l.props;
        for (D(c, l.opts.specialEasing); a > o; o++)
            if (r = nn[o].call(l, t, c, l.opts)) return r;
        return te.map(c, L, l), te.isFunction(l.opts.start) && l.opts.start.call(t, l), te.fx.timer(te.extend(u, {
            elem: t,
            anim: l,
            queue: l.opts.queue
        })), l.progress(l.opts.progress).done(l.opts.done, l.opts.complete).fail(l.opts.fail).always(l.opts.always)
    }

    function R(t) {
        return function(e, n) {
            "string" != typeof e && (n = e, e = "*");
            var r, i = 0,
                o = e.toLowerCase().match(pe) || [];
            if (te.isFunction(n))
                for (; r = o[i++];) "+" === r[0] ? (r = r.slice(1) || "*", (t[r] = t[r] || []).unshift(n)) : (t[r] = t[r] || []).push(n)
        }
    }

    function z(t, e, n, r) {
        function i(s) {
            var u;
            return o[s] = !0, te.each(t[s] || [], function(t, s) {
                var l = s(e, n, r);
                return "string" != typeof l || a || o[l] ? a ? !(u = l) : void 0 : (e.dataTypes.unshift(l), i(l), !1)
            }), u
        }
        var o = {},
            a = t === Mn;
        return i(e.dataTypes[0]) || !o["*"] && i("*")
    }

    function I(t, e) {
        var n, r, i = te.ajaxSettings.flatOptions || {};
        for (n in e) void 0 !== e[n] && ((i[n] ? t : r || (r = {}))[n] = e[n]);
        return r && te.extend(!0, t, r), t
    }

    function B(t, e, n) {
        for (var r, i, o, a, s = t.contents, u = t.dataTypes;
            "*" === u[0];) u.shift(), void 0 === r && (r = t.mimeType || e.getResponseHeader("Content-Type"));
        if (r)
            for (i in s)
                if (s[i] && s[i].test(r)) {
                    u.unshift(i);
                    break
                }
        if (u[0] in n) o = u[0];
        else {
            for (i in n) {
                if (!u[0] || t.converters[i + " " + u[0]]) {
                    o = i;
                    break
                }
                a || (a = i)
            }
            o = o || a
        }
        return o ? (o !== u[0] && u.unshift(o), n[o]) : void 0
    }

    function O(t, e, n, r) {
        var i, o, a, s, u, l = {},
            c = t.dataTypes.slice();
        if (c[1])
            for (a in t.converters) l[a.toLowerCase()] = t.converters[a];
        for (o = c.shift(); o;)
            if (t.responseFields[o] && (n[t.responseFields[o]] = e), !u && r && t.dataFilter && (e = t.dataFilter(e, t.dataType)), u = o, o = c.shift())
                if ("*" === o) o = u;
                else if ("*" !== u && u !== o) {
            if (a = l[u + " " + o] || l["* " + o], !a)
                for (i in l)
                    if (s = i.split(" "), s[1] === o && (a = l[u + " " + s[0]] || l["* " + s[0]])) {
                        a === !0 ? a = l[i] : l[i] !== !0 && (o = s[0], c.unshift(s[1]));
                        break
                    }
            if (a !== !0)
                if (a && t["throws"]) e = a(e);
                else try {
                    e = a(e)
                } catch (f) {
                    return {
                        state: "parsererror",
                        error: a ? f : "No conversion from " + u + " to " + o
                    }
                }
        }
        return {
            state: "success",
            data: e
        }
    }

    function P(t, e, n, r) {
        var i;
        if (te.isArray(e)) te.each(e, function(e, i) {
            n || En.test(t) ? r(t, i) : P(t + "[" + ("object" == typeof i ? e : "") + "]", i, n, r)
        });
        else if (n || "object" !== te.type(e)) r(t, e);
        else
            for (i in e) P(t + "[" + i + "]", e[i], n, r)
    }

    function H(t) {
        return te.isWindow(t) ? t : 9 === t.nodeType && t.defaultView
    }
    var F = [],
        U = F.slice,
        W = F.concat,
        V = F.push,
        Z = F.indexOf,
        Y = {},
        X = Y.toString,
        Q = Y.hasOwnProperty,
        K = {},
        G = t.document,
        J = "2.1.1",
        te = function(t, e) {
            return new te.fn.init(t, e)
        },
        ee = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
        ne = /^-ms-/,
        re = /-([\da-z])/gi,
        ie = function(t, e) {
            return e.toUpperCase()
        };
    te.fn = te.prototype = {
        jquery: J,
        constructor: te,
        selector: "",
        length: 0,
        toArray: function() {
            return U.call(this)
        },
        get: function(t) {
            return null != t ? 0 > t ? this[t + this.length] : this[t] : U.call(this)
        },
        pushStack: function(t) {
            var e = te.merge(this.constructor(), t);
            return e.prevObject = this, e.context = this.context, e
        },
        each: function(t, e) {
            return te.each(this, t, e)
        },
        map: function(t) {
            return this.pushStack(te.map(this, function(e, n) {
                return t.call(e, n, e)
            }))
        },
        slice: function() {
            return this.pushStack(U.apply(this, arguments))
        },
        first: function() {
            return this.eq(0)
        },
        last: function() {
            return this.eq(-1)
        },
        eq: function(t) {
            var e = this.length,
                n = +t + (0 > t ? e : 0);
            return this.pushStack(n >= 0 && e > n ? [this[n]] : [])
        },
        end: function() {
            return this.prevObject || this.constructor(null)
        },
        push: V,
        sort: F.sort,
        splice: F.splice
    }, te.extend = te.fn.extend = function() {
        var t, e, n, r, i, o, a = arguments[0] || {},
            s = 1,
            u = arguments.length,
            l = !1;
        for ("boolean" == typeof a && (l = a, a = arguments[s] || {}, s++), "object" == typeof a || te.isFunction(a) || (a = {}), s === u && (a = this, s--); u > s; s++)
            if (null != (t = arguments[s]))
                for (e in t) n = a[e], r = t[e], a !== r && (l && r && (te.isPlainObject(r) || (i = te.isArray(r))) ? (i ? (i = !1, o = n && te.isArray(n) ? n : []) : o = n && te.isPlainObject(n) ? n : {}, a[e] = te.extend(l, o, r)) : void 0 !== r && (a[e] = r));
        return a
    }, te.extend({
        expando: "jQuery" + (J + Math.random()).replace(/\D/g, ""),
        isReady: !0,
        error: function(t) {
            throw new Error(t)
        },
        noop: function() {},
        isFunction: function(t) {
            return "function" === te.type(t)
        },
        isArray: Array.isArray,
        isWindow: function(t) {
            return null != t && t === t.window
        },
        isNumeric: function(t) {
            return !te.isArray(t) && t - parseFloat(t) >= 0
        },
        isPlainObject: function(t) {
            return "object" !== te.type(t) || t.nodeType || te.isWindow(t) ? !1 : t.constructor && !Q.call(t.constructor.prototype, "isPrototypeOf") ? !1 : !0
        },
        isEmptyObject: function(t) {
            var e;
            for (e in t) return !1;
            return !0
        },
        type: function(t) {
            return null == t ? t + "" : "object" == typeof t || "function" == typeof t ? Y[X.call(t)] || "object" : typeof t
        },
        globalEval: function(t) {
            var e, n = eval;
            t = te.trim(t), t && (1 === t.indexOf("use strict") ? (e = G.createElement("script"), e.text = t, G.head.appendChild(e).parentNode.removeChild(e)) : n(t))
        },
        camelCase: function(t) {
            return t.replace(ne, "ms-").replace(re, ie)
        },
        nodeName: function(t, e) {
            return t.nodeName && t.nodeName.toLowerCase() === e.toLowerCase()
        },
        each: function(t, e, r) {
            var i, o = 0,
                a = t.length,
                s = n(t);
            if (r) {
                if (s)
                    for (; a > o && (i = e.apply(t[o], r), i !== !1); o++);
                else
                    for (o in t)
                        if (i = e.apply(t[o], r), i === !1) break
            } else if (s)
                for (; a > o && (i = e.call(t[o], o, t[o]), i !== !1); o++);
            else
                for (o in t)
                    if (i = e.call(t[o], o, t[o]), i === !1) break;
            return t
        },
        trim: function(t) {
            return null == t ? "" : (t + "").replace(ee, "")
        },
        makeArray: function(t, e) {
            var r = e || [];
            return null != t && (n(Object(t)) ? te.merge(r, "string" == typeof t ? [t] : t) : V.call(r, t)), r
        },
        inArray: function(t, e, n) {
            return null == e ? -1 : Z.call(e, t, n)
        },
        merge: function(t, e) {
            for (var n = +e.length, r = 0, i = t.length; n > r; r++) t[i++] = e[r];
            return t.length = i, t
        },
        grep: function(t, e, n) {
            for (var r, i = [], o = 0, a = t.length, s = !n; a > o; o++) r = !e(t[o], o), r !== s && i.push(t[o]);
            return i
        },
        map: function(t, e, r) {
            var i, o = 0,
                a = t.length,
                s = n(t),
                u = [];
            if (s)
                for (; a > o; o++) i = e(t[o], o, r), null != i && u.push(i);
            else
                for (o in t) i = e(t[o], o, r), null != i && u.push(i);
            return W.apply([], u)
        },
        guid: 1,
        proxy: function(t, e) {
            var n, r, i;
            return "string" == typeof e && (n = t[e], e = t, t = n), te.isFunction(t) ? (r = U.call(arguments, 2), i = function() {
                return t.apply(e || this, r.concat(U.call(arguments)))
            }, i.guid = t.guid = t.guid || te.guid++, i) : void 0
        },
        now: Date.now,
        support: K
    }), te.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(t, e) {
        Y["[object " + e + "]"] = e.toLowerCase()
    });
    var oe = function(t) {
        function e(t, e, n, r) {
            var i, o, a, s, u, l, f, d, p, g;
            if ((e ? e.ownerDocument || e : P) !== j && L(e), e = e || j, n = n || [], !t || "string" != typeof t) return n;
            if (1 !== (s = e.nodeType) && 9 !== s) return [];
            if (q && !r) {
                if (i = be.exec(t))
                    if (a = i[1]) {
                        if (9 === s) {
                            if (o = e.getElementById(a), !o || !o.parentNode) return n;
                            if (o.id === a) return n.push(o), n
                        } else if (e.ownerDocument && (o = e.ownerDocument.getElementById(a)) && B(e, o) && o.id === a) return n.push(o), n
                    } else {
                        if (i[2]) return te.apply(n, e.getElementsByTagName(t)), n;
                        if ((a = i[3]) && w.getElementsByClassName && e.getElementsByClassName) return te.apply(n, e.getElementsByClassName(a)), n
                    }
                if (w.qsa && (!R || !R.test(t))) {
                    if (d = f = O, p = e, g = 9 === s && t, 1 === s && "object" !== e.nodeName.toLowerCase()) {
                        for (l = N(t), (f = e.getAttribute("id")) ? d = f.replace(we, "\\$&") : e.setAttribute("id", d), d = "[id='" + d + "'] ", u = l.length; u--;) l[u] = d + h(l[u]);
                        p = xe.test(t) && c(e.parentNode) || e, g = l.join(",")
                    }
                    if (g) try {
                        return te.apply(n, p.querySelectorAll(g)), n
                    } catch (m) {} finally {
                        f || e.removeAttribute("id")
                    }
                }
            }
            return E(t.replace(le, "$1"), e, n, r)
        }

        function n() {
            function t(n, r) {
                return e.push(n + " ") > _.cacheLength && delete t[e.shift()], t[n + " "] = r
            }
            var e = [];
            return t
        }

        function r(t) {
            return t[O] = !0, t
        }

        function i(t) {
            var e = j.createElement("div");
            try {
                return !!t(e)
            } catch (n) {
                return !1
            } finally {
                e.parentNode && e.parentNode.removeChild(e), e = null
            }
        }

        function o(t, e) {
            for (var n = t.split("|"), r = t.length; r--;) _.attrHandle[n[r]] = e
        }

        function a(t, e) {
            var n = e && t,
                r = n && 1 === t.nodeType && 1 === e.nodeType && (~e.sourceIndex || X) - (~t.sourceIndex || X);
            if (r) return r;
            if (n)
                for (; n = n.nextSibling;)
                    if (n === e) return -1;
            return t ? 1 : -1
        }

        function s(t) {
            return function(e) {
                var n = e.nodeName.toLowerCase();
                return "input" === n && e.type === t
            }
        }

        function u(t) {
            return function(e) {
                var n = e.nodeName.toLowerCase();
                return ("input" === n || "button" === n) && e.type === t
            }
        }

        function l(t) {
            return r(function(e) {
                return e = +e, r(function(n, r) {
                    for (var i, o = t([], n.length, e), a = o.length; a--;) n[i = o[a]] && (n[i] = !(r[i] = n[i]))
                })
            })
        }

        function c(t) {
            return t && typeof t.getElementsByTagName !== Y && t
        }

        function f() {}

        function h(t) {
            for (var e = 0, n = t.length, r = ""; n > e; e++) r += t[e].value;
            return r
        }

        function d(t, e, n) {
            var r = e.dir,
                i = n && "parentNode" === r,
                o = F++;
            return e.first ? function(e, n, o) {
                for (; e = e[r];)
                    if (1 === e.nodeType || i) return t(e, n, o)
            } : function(e, n, a) {
                var s, u, l = [H, o];
                if (a) {
                    for (; e = e[r];)
                        if ((1 === e.nodeType || i) && t(e, n, a)) return !0
                } else
                    for (; e = e[r];)
                        if (1 === e.nodeType || i) {
                            if (u = e[O] || (e[O] = {}), (s = u[r]) && s[0] === H && s[1] === o) return l[2] = s[2];
                            if (u[r] = l, l[2] = t(e, n, a)) return !0
                        }
            }
        }

        function p(t) {
            return t.length > 1 ? function(e, n, r) {
                for (var i = t.length; i--;)
                    if (!t[i](e, n, r)) return !1;
                return !0
            } : t[0]
        }

        function g(t, n, r) {
            for (var i = 0, o = n.length; o > i; i++) e(t, n[i], r);
            return r
        }

        function m(t, e, n, r, i) {
            for (var o, a = [], s = 0, u = t.length, l = null != e; u > s; s++)(o = t[s]) && (!n || n(o, r, i)) && (a.push(o), l && e.push(s));
            return a
        }

        function v(t, e, n, i, o, a) {
            return i && !i[O] && (i = v(i)), o && !o[O] && (o = v(o, a)), r(function(r, a, s, u) {
                var l, c, f, h = [],
                    d = [],
                    p = a.length,
                    v = r || g(e || "*", s.nodeType ? [s] : s, []),
                    y = !t || !r && e ? v : m(v, h, t, s, u),
                    b = n ? o || (r ? t : p || i) ? [] : a : y;
                if (n && n(y, b, s, u), i)
                    for (l = m(b, d), i(l, [], s, u), c = l.length; c--;)(f = l[c]) && (b[d[c]] = !(y[d[c]] = f));
                if (r) {
                    if (o || t) {
                        if (o) {
                            for (l = [], c = b.length; c--;)(f = b[c]) && l.push(y[c] = f);
                            o(null, b = [], l, u)
                        }
                        for (c = b.length; c--;)(f = b[c]) && (l = o ? ne.call(r, f) : h[c]) > -1 && (r[l] = !(a[l] = f))
                    }
                } else b = m(b === a ? b.splice(p, b.length) : b), o ? o(null, a, b, u) : te.apply(a, b)
            })
        }

        function y(t) {
            for (var e, n, r, i = t.length, o = _.relative[t[0].type], a = o || _.relative[" "], s = o ? 1 : 0, u = d(function(t) {
                    return t === e
                }, a, !0), l = d(function(t) {
                    return ne.call(e, t) > -1
                }, a, !0), c = [function(t, n, r) {
                    return !o && (r || n !== S) || ((e = n).nodeType ? u(t, n, r) : l(t, n, r))
                }]; i > s; s++)
                if (n = _.relative[t[s].type]) c = [d(p(c), n)];
                else {
                    if (n = _.filter[t[s].type].apply(null, t[s].matches), n[O]) {
                        for (r = ++s; i > r && !_.relative[t[r].type]; r++);
                        return v(s > 1 && p(c), s > 1 && h(t.slice(0, s - 1).concat({
                            value: " " === t[s - 2].type ? "*" : ""
                        })).replace(le, "$1"), n, r > s && y(t.slice(s, r)), i > r && y(t = t.slice(r)), i > r && h(t))
                    }
                    c.push(n)
                }
            return p(c)
        }

        function b(t, n) {
            var i = n.length > 0,
                o = t.length > 0,
                a = function(r, a, s, u, l) {
                    var c, f, h, d = 0,
                        p = "0",
                        g = r && [],
                        v = [],
                        y = S,
                        b = r || o && _.find.TAG("*", l),
                        x = H += null == y ? 1 : Math.random() || .1,
                        w = b.length;
                    for (l && (S = a !== j && a); p !== w && null != (c = b[p]); p++) {
                        if (o && c) {
                            for (f = 0; h = t[f++];)
                                if (h(c, a, s)) {
                                    u.push(c);
                                    break
                                }
                            l && (H = x)
                        }
                        i && ((c = !h && c) && d--, r && g.push(c))
                    }
                    if (d += p, i && p !== d) {
                        for (f = 0; h = n[f++];) h(g, v, a, s);
                        if (r) {
                            if (d > 0)
                                for (; p--;) g[p] || v[p] || (v[p] = G.call(u));
                            v = m(v)
                        }
                        te.apply(u, v), l && !r && v.length > 0 && d + n.length > 1 && e.uniqueSort(u)
                    }
                    return l && (H = x, S = y), g
                };
            return i ? r(a) : a
        }
        var x, w, _, M, k, N, C, E, S, T, A, L, j, D, q, R, z, I, B, O = "sizzle" + -new Date,
            P = t.document,
            H = 0,
            F = 0,
            U = n(),
            W = n(),
            V = n(),
            Z = function(t, e) {
                return t === e && (A = !0), 0
            },
            Y = "undefined",
            X = 1 << 31,
            Q = {}.hasOwnProperty,
            K = [],
            G = K.pop,
            J = K.push,
            te = K.push,
            ee = K.slice,
            ne = K.indexOf || function(t) {
                for (var e = 0, n = this.length; n > e; e++)
                    if (this[e] === t) return e;
                return -1
            },
            re = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
            ie = "[\\x20\\t\\r\\n\\f]",
            oe = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",
            ae = oe.replace("w", "w#"),
            se = "\\[" + ie + "*(" + oe + ")(?:" + ie + "*([*^$|!~]?=)" + ie + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + ae + "))|)" + ie + "*\\]",
            ue = ":(" + oe + ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" + se + ")*)|.*)\\)|)",
            le = new RegExp("^" + ie + "+|((?:^|[^\\\\])(?:\\\\.)*)" + ie + "+$", "g"),
            ce = new RegExp("^" + ie + "*," + ie + "*"),
            fe = new RegExp("^" + ie + "*([>+~]|" + ie + ")" + ie + "*"),
            he = new RegExp("=" + ie + "*([^\\]'\"]*?)" + ie + "*\\]", "g"),
            de = new RegExp(ue),
            pe = new RegExp("^" + ae + "$"),
            ge = {
                ID: new RegExp("^#(" + oe + ")"),
                CLASS: new RegExp("^\\.(" + oe + ")"),
                TAG: new RegExp("^(" + oe.replace("w", "w*") + ")"),
                ATTR: new RegExp("^" + se),
                PSEUDO: new RegExp("^" + ue),
                CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + ie + "*(even|odd|(([+-]|)(\\d*)n|)" + ie + "*(?:([+-]|)" + ie + "*(\\d+)|))" + ie + "*\\)|)", "i"),
                bool: new RegExp("^(?:" + re + ")$", "i"),
                needsContext: new RegExp("^" + ie + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + ie + "*((?:-\\d)?\\d*)" + ie + "*\\)|)(?=[^-]|$)", "i")
            },
            me = /^(?:input|select|textarea|button)$/i,
            ve = /^h\d$/i,
            ye = /^[^{]+\{\s*\[native \w/,
            be = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
            xe = /[+~]/,
            we = /'|\\/g,
            _e = new RegExp("\\\\([\\da-f]{1,6}" + ie + "?|(" + ie + ")|.)", "ig"),
            Me = function(t, e, n) {
                var r = "0x" + e - 65536;
                return r !== r || n ? e : 0 > r ? String.fromCharCode(r + 65536) : String.fromCharCode(r >> 10 | 55296, 1023 & r | 56320)
            };
        try {
            te.apply(K = ee.call(P.childNodes), P.childNodes), K[P.childNodes.length].nodeType
        } catch (ke) {
            te = {
                apply: K.length ? function(t, e) {
                    J.apply(t, ee.call(e))
                } : function(t, e) {
                    for (var n = t.length, r = 0; t[n++] = e[r++];);
                    t.length = n - 1
                }
            }
        }
        w = e.support = {}, k = e.isXML = function(t) {
            var e = t && (t.ownerDocument || t).documentElement;
            return e ? "HTML" !== e.nodeName : !1
        }, L = e.setDocument = function(t) {
            var e, n = t ? t.ownerDocument || t : P,
                r = n.defaultView;
            return n !== j && 9 === n.nodeType && n.documentElement ? (j = n, D = n.documentElement, q = !k(n), r && r !== r.top && (r.addEventListener ? r.addEventListener("unload", function() {
                L()
            }, !1) : r.attachEvent && r.attachEvent("onunload", function() {
                L()
            })), w.attributes = i(function(t) {
                return t.className = "i", !t.getAttribute("className")
            }), w.getElementsByTagName = i(function(t) {
                return t.appendChild(n.createComment("")), !t.getElementsByTagName("*").length
            }), w.getElementsByClassName = ye.test(n.getElementsByClassName) && i(function(t) {
                return t.innerHTML = "<div class='a'></div><div class='a i'></div>", t.firstChild.className = "i", 2 === t.getElementsByClassName("i").length
            }), w.getById = i(function(t) {
                return D.appendChild(t).id = O, !n.getElementsByName || !n.getElementsByName(O).length
            }), w.getById ? (_.find.ID = function(t, e) {
                if (typeof e.getElementById !== Y && q) {
                    var n = e.getElementById(t);
                    return n && n.parentNode ? [n] : []
                }
            }, _.filter.ID = function(t) {
                var e = t.replace(_e, Me);
                return function(t) {
                    return t.getAttribute("id") === e
                }
            }) : (delete _.find.ID, _.filter.ID = function(t) {
                var e = t.replace(_e, Me);
                return function(t) {
                    var n = typeof t.getAttributeNode !== Y && t.getAttributeNode("id");
                    return n && n.value === e
                }
            }), _.find.TAG = w.getElementsByTagName ? function(t, e) {
                return typeof e.getElementsByTagName !== Y ? e.getElementsByTagName(t) : void 0
            } : function(t, e) {
                var n, r = [],
                    i = 0,
                    o = e.getElementsByTagName(t);
                if ("*" === t) {
                    for (; n = o[i++];) 1 === n.nodeType && r.push(n);
                    return r
                }
                return o
            }, _.find.CLASS = w.getElementsByClassName && function(t, e) {
                return typeof e.getElementsByClassName !== Y && q ? e.getElementsByClassName(t) : void 0
            }, z = [], R = [], (w.qsa = ye.test(n.querySelectorAll)) && (i(function(t) {
                t.innerHTML = "<select msallowclip=''><option selected=''></option></select>", t.querySelectorAll("[msallowclip^='']").length && R.push("[*^$]=" + ie + "*(?:''|\"\")"), t.querySelectorAll("[selected]").length || R.push("\\[" + ie + "*(?:value|" + re + ")"), t.querySelectorAll(":checked").length || R.push(":checked")
            }), i(function(t) {
                var e = n.createElement("input");
                e.setAttribute("type", "hidden"), t.appendChild(e).setAttribute("name", "D"), t.querySelectorAll("[name=d]").length && R.push("name" + ie + "*[*^$|!~]?="), t.querySelectorAll(":enabled").length || R.push(":enabled", ":disabled"), t.querySelectorAll("*,:x"), R.push(",.*:")
            })), (w.matchesSelector = ye.test(I = D.matches || D.webkitMatchesSelector || D.mozMatchesSelector || D.oMatchesSelector || D.msMatchesSelector)) && i(function(t) {
                w.disconnectedMatch = I.call(t, "div"), I.call(t, "[s!='']:x"), z.push("!=", ue)
            }), R = R.length && new RegExp(R.join("|")), z = z.length && new RegExp(z.join("|")), e = ye.test(D.compareDocumentPosition), B = e || ye.test(D.contains) ? function(t, e) {
                var n = 9 === t.nodeType ? t.documentElement : t,
                    r = e && e.parentNode;
                return t === r || !(!r || 1 !== r.nodeType || !(n.contains ? n.contains(r) : t.compareDocumentPosition && 16 & t.compareDocumentPosition(r)))
            } : function(t, e) {
                if (e)
                    for (; e = e.parentNode;)
                        if (e === t) return !0;
                return !1
            }, Z = e ? function(t, e) {
                if (t === e) return A = !0, 0;
                var r = !t.compareDocumentPosition - !e.compareDocumentPosition;
                return r ? r : (r = (t.ownerDocument || t) === (e.ownerDocument || e) ? t.compareDocumentPosition(e) : 1, 1 & r || !w.sortDetached && e.compareDocumentPosition(t) === r ? t === n || t.ownerDocument === P && B(P, t) ? -1 : e === n || e.ownerDocument === P && B(P, e) ? 1 : T ? ne.call(T, t) - ne.call(T, e) : 0 : 4 & r ? -1 : 1)
            } : function(t, e) {
                if (t === e) return A = !0, 0;
                var r, i = 0,
                    o = t.parentNode,
                    s = e.parentNode,
                    u = [t],
                    l = [e];
                if (!o || !s) return t === n ? -1 : e === n ? 1 : o ? -1 : s ? 1 : T ? ne.call(T, t) - ne.call(T, e) : 0;
                if (o === s) return a(t, e);
                for (r = t; r = r.parentNode;) u.unshift(r);
                for (r = e; r = r.parentNode;) l.unshift(r);
                for (; u[i] === l[i];) i++;
                return i ? a(u[i], l[i]) : u[i] === P ? -1 : l[i] === P ? 1 : 0
            }, n) : j
        }, e.matches = function(t, n) {
            return e(t, null, null, n)
        }, e.matchesSelector = function(t, n) {
            if ((t.ownerDocument || t) !== j && L(t), n = n.replace(he, "='$1']"), !(!w.matchesSelector || !q || z && z.test(n) || R && R.test(n))) try {
                var r = I.call(t, n);
                if (r || w.disconnectedMatch || t.document && 11 !== t.document.nodeType) return r
            } catch (i) {}
            return e(n, j, null, [t]).length > 0
        }, e.contains = function(t, e) {
            return (t.ownerDocument || t) !== j && L(t), B(t, e)
        }, e.attr = function(t, e) {
            (t.ownerDocument || t) !== j && L(t);
            var n = _.attrHandle[e.toLowerCase()],
                r = n && Q.call(_.attrHandle, e.toLowerCase()) ? n(t, e, !q) : void 0;
            return void 0 !== r ? r : w.attributes || !q ? t.getAttribute(e) : (r = t.getAttributeNode(e)) && r.specified ? r.value : null
        }, e.error = function(t) {
            throw new Error("Syntax error, unrecognized expression: " + t)
        }, e.uniqueSort = function(t) {
            var e, n = [],
                r = 0,
                i = 0;
            if (A = !w.detectDuplicates, T = !w.sortStable && t.slice(0), t.sort(Z), A) {
                for (; e = t[i++];) e === t[i] && (r = n.push(i));
                for (; r--;) t.splice(n[r], 1)
            }
            return T = null, t
        }, M = e.getText = function(t) {
            var e, n = "",
                r = 0,
                i = t.nodeType;
            if (i) {
                if (1 === i || 9 === i || 11 === i) {
                    if ("string" == typeof t.textContent) return t.textContent;
                    for (t = t.firstChild; t; t = t.nextSibling) n += M(t)
                } else if (3 === i || 4 === i) return t.nodeValue
            } else
                for (; e = t[r++];) n += M(e);
            return n
        }, _ = e.selectors = {
            cacheLength: 50,
            createPseudo: r,
            match: ge,
            attrHandle: {},
            find: {},
            relative: {
                ">": {
                    dir: "parentNode",
                    first: !0
                },
                " ": {
                    dir: "parentNode"
                },
                "+": {
                    dir: "previousSibling",
                    first: !0
                },
                "~": {
                    dir: "previousSibling"
                }
            },
            preFilter: {
                ATTR: function(t) {
                    return t[1] = t[1].replace(_e, Me), t[3] = (t[3] || t[4] || t[5] || "").replace(_e, Me), "~=" === t[2] && (t[3] = " " + t[3] + " "), t.slice(0, 4)
                },
                CHILD: function(t) {
                    return t[1] = t[1].toLowerCase(), "nth" === t[1].slice(0, 3) ? (t[3] || e.error(t[0]), t[4] = +(t[4] ? t[5] + (t[6] || 1) : 2 * ("even" === t[3] || "odd" === t[3])), t[5] = +(t[7] + t[8] || "odd" === t[3])) : t[3] && e.error(t[0]), t
                },
                PSEUDO: function(t) {
                    var e, n = !t[6] && t[2];
                    return ge.CHILD.test(t[0]) ? null : (t[3] ? t[2] = t[4] || t[5] || "" : n && de.test(n) && (e = N(n, !0)) && (e = n.indexOf(")", n.length - e) - n.length) && (t[0] = t[0].slice(0, e), t[2] = n.slice(0, e)), t.slice(0, 3))
                }
            },
            filter: {
                TAG: function(t) {
                    var e = t.replace(_e, Me).toLowerCase();
                    return "*" === t ? function() {
                        return !0
                    } : function(t) {
                        return t.nodeName && t.nodeName.toLowerCase() === e
                    }
                },
                CLASS: function(t) {
                    var e = U[t + " "];
                    return e || (e = new RegExp("(^|" + ie + ")" + t + "(" + ie + "|$)")) && U(t, function(t) {
                        return e.test("string" == typeof t.className && t.className || typeof t.getAttribute !== Y && t.getAttribute("class") || "")
                    })
                },
                ATTR: function(t, n, r) {
                    return function(i) {
                        var o = e.attr(i, t);
                        return null == o ? "!=" === n : n ? (o += "", "=" === n ? o === r : "!=" === n ? o !== r : "^=" === n ? r && 0 === o.indexOf(r) : "*=" === n ? r && o.indexOf(r) > -1 : "$=" === n ? r && o.slice(-r.length) === r : "~=" === n ? (" " + o + " ").indexOf(r) > -1 : "|=" === n ? o === r || o.slice(0, r.length + 1) === r + "-" : !1) : !0
                    }
                },
                CHILD: function(t, e, n, r, i) {
                    var o = "nth" !== t.slice(0, 3),
                        a = "last" !== t.slice(-4),
                        s = "of-type" === e;
                    return 1 === r && 0 === i ? function(t) {
                        return !!t.parentNode
                    } : function(e, n, u) {
                        var l, c, f, h, d, p, g = o !== a ? "nextSibling" : "previousSibling",
                            m = e.parentNode,
                            v = s && e.nodeName.toLowerCase(),
                            y = !u && !s;
                        if (m) {
                            if (o) {
                                for (; g;) {
                                    for (f = e; f = f[g];)
                                        if (s ? f.nodeName.toLowerCase() === v : 1 === f.nodeType) return !1;
                                    p = g = "only" === t && !p && "nextSibling"
                                }
                                return !0
                            }
                            if (p = [a ? m.firstChild : m.lastChild], a && y) {
                                for (c = m[O] || (m[O] = {}), l = c[t] || [], d = l[0] === H && l[1], h = l[0] === H && l[2], f = d && m.childNodes[d]; f = ++d && f && f[g] || (h = d = 0) || p.pop();)
                                    if (1 === f.nodeType && ++h && f === e) {
                                        c[t] = [H, d, h];
                                        break
                                    }
                            } else if (y && (l = (e[O] || (e[O] = {}))[t]) && l[0] === H) h = l[1];
                            else
                                for (;
                                    (f = ++d && f && f[g] || (h = d = 0) || p.pop()) && ((s ? f.nodeName.toLowerCase() !== v : 1 !== f.nodeType) || !++h || (y && ((f[O] || (f[O] = {}))[t] = [H, h]), f !== e)););
                            return h -= i, h === r || h % r === 0 && h / r >= 0
                        }
                    }
                },
                PSEUDO: function(t, n) {
                    var i, o = _.pseudos[t] || _.setFilters[t.toLowerCase()] || e.error("unsupported pseudo: " + t);
                    return o[O] ? o(n) : o.length > 1 ? (i = [t, t, "", n], _.setFilters.hasOwnProperty(t.toLowerCase()) ? r(function(t, e) {
                        for (var r, i = o(t, n), a = i.length; a--;) r = ne.call(t, i[a]), t[r] = !(e[r] = i[a])
                    }) : function(t) {
                        return o(t, 0, i)
                    }) : o
                }
            },
            pseudos: {
                not: r(function(t) {
                    var e = [],
                        n = [],
                        i = C(t.replace(le, "$1"));
                    return i[O] ? r(function(t, e, n, r) {
                        for (var o, a = i(t, null, r, []), s = t.length; s--;)(o = a[s]) && (t[s] = !(e[s] = o))
                    }) : function(t, r, o) {
                        return e[0] = t, i(e, null, o, n), !n.pop()
                    }
                }),
                has: r(function(t) {
                    return function(n) {
                        return e(t, n).length > 0
                    }
                }),
                contains: r(function(t) {
                    return function(e) {
                        return (e.textContent || e.innerText || M(e)).indexOf(t) > -1
                    }
                }),
                lang: r(function(t) {
                    return pe.test(t || "") || e.error("unsupported lang: " + t), t = t.replace(_e, Me).toLowerCase(),
                        function(e) {
                            var n;
                            do
                                if (n = q ? e.lang : e.getAttribute("xml:lang") || e.getAttribute("lang")) return n = n.toLowerCase(), n === t || 0 === n.indexOf(t + "-");
                            while ((e = e.parentNode) && 1 === e.nodeType);
                            return !1
                        }
                }),
                target: function(e) {
                    var n = t.location && t.location.hash;
                    return n && n.slice(1) === e.id
                },
                root: function(t) {
                    return t === D
                },
                focus: function(t) {
                    return t === j.activeElement && (!j.hasFocus || j.hasFocus()) && !!(t.type || t.href || ~t.tabIndex)
                },
                enabled: function(t) {
                    return t.disabled === !1
                },
                disabled: function(t) {
                    return t.disabled === !0
                },
                checked: function(t) {
                    var e = t.nodeName.toLowerCase();
                    return "input" === e && !!t.checked || "option" === e && !!t.selected
                },
                selected: function(t) {
                    return t.parentNode && t.parentNode.selectedIndex, t.selected === !0
                },
                empty: function(t) {
                    for (t = t.firstChild; t; t = t.nextSibling)
                        if (t.nodeType < 6) return !1;
                    return !0
                },
                parent: function(t) {
                    return !_.pseudos.empty(t)
                },
                header: function(t) {
                    return ve.test(t.nodeName)
                },
                input: function(t) {
                    return me.test(t.nodeName)
                },
                button: function(t) {
                    var e = t.nodeName.toLowerCase();
                    return "input" === e && "button" === t.type || "button" === e
                },
                text: function(t) {
                    var e;
                    return "input" === t.nodeName.toLowerCase() && "text" === t.type && (null == (e = t.getAttribute("type")) || "text" === e.toLowerCase())
                },
                first: l(function() {
                    return [0]
                }),
                last: l(function(t, e) {
                    return [e - 1]
                }),
                eq: l(function(t, e, n) {
                    return [0 > n ? n + e : n]
                }),
                even: l(function(t, e) {
                    for (var n = 0; e > n; n += 2) t.push(n);
                    return t
                }),
                odd: l(function(t, e) {
                    for (var n = 1; e > n; n += 2) t.push(n);
                    return t
                }),
                lt: l(function(t, e, n) {
                    for (var r = 0 > n ? n + e : n; --r >= 0;) t.push(r);
                    return t
                }),
                gt: l(function(t, e, n) {
                    for (var r = 0 > n ? n + e : n; ++r < e;) t.push(r);
                    return t
                })
            }
        }, _.pseudos.nth = _.pseudos.eq;
        for (x in {
                radio: !0,
                checkbox: !0,
                file: !0,
                password: !0,
                image: !0
            }) _.pseudos[x] = s(x);
        for (x in {
                submit: !0,
                reset: !0
            }) _.pseudos[x] = u(x);
        return f.prototype = _.filters = _.pseudos, _.setFilters = new f, N = e.tokenize = function(t, n) {
            var r, i, o, a, s, u, l, c = W[t + " "];
            if (c) return n ? 0 : c.slice(0);
            for (s = t, u = [], l = _.preFilter; s;) {
                (!r || (i = ce.exec(s))) && (i && (s = s.slice(i[0].length) || s), u.push(o = [])), r = !1, (i = fe.exec(s)) && (r = i.shift(), o.push({
                    value: r,
                    type: i[0].replace(le, " ")
                }), s = s.slice(r.length));
                for (a in _.filter) !(i = ge[a].exec(s)) || l[a] && !(i = l[a](i)) || (r = i.shift(), o.push({
                    value: r,
                    type: a,
                    matches: i
                }), s = s.slice(r.length));
                if (!r) break
            }
            return n ? s.length : s ? e.error(t) : W(t, u).slice(0)
        }, C = e.compile = function(t, e) {
            var n, r = [],
                i = [],
                o = V[t + " "];
            if (!o) {
                for (e || (e = N(t)), n = e.length; n--;) o = y(e[n]), o[O] ? r.push(o) : i.push(o);
                o = V(t, b(i, r)), o.selector = t
            }
            return o
        }, E = e.select = function(t, e, n, r) {
            var i, o, a, s, u, l = "function" == typeof t && t,
                f = !r && N(t = l.selector || t);
            if (n = n || [], 1 === f.length) {
                if (o = f[0] = f[0].slice(0), o.length > 2 && "ID" === (a = o[0]).type && w.getById && 9 === e.nodeType && q && _.relative[o[1].type]) {
                    if (e = (_.find.ID(a.matches[0].replace(_e, Me), e) || [])[0], !e) return n;
                    l && (e = e.parentNode), t = t.slice(o.shift().value.length)
                }
                for (i = ge.needsContext.test(t) ? 0 : o.length; i-- && (a = o[i], !_.relative[s = a.type]);)
                    if ((u = _.find[s]) && (r = u(a.matches[0].replace(_e, Me), xe.test(o[0].type) && c(e.parentNode) || e))) {
                        if (o.splice(i, 1), t = r.length && h(o), !t) return te.apply(n, r), n;
                        break
                    }
            }
            return (l || C(t, f))(r, e, !q, n, xe.test(t) && c(e.parentNode) || e), n
        }, w.sortStable = O.split("").sort(Z).join("") === O, w.detectDuplicates = !!A, L(), w.sortDetached = i(function(t) {
            return 1 & t.compareDocumentPosition(j.createElement("div"))
        }), i(function(t) {
            return t.innerHTML = "<a href='#'></a>", "#" === t.firstChild.getAttribute("href")
        }) || o("type|href|height|width", function(t, e, n) {
            return n ? void 0 : t.getAttribute(e, "type" === e.toLowerCase() ? 1 : 2)
        }), w.attributes && i(function(t) {
            return t.innerHTML = "<input/>", t.firstChild.setAttribute("value", ""), "" === t.firstChild.getAttribute("value")
        }) || o("value", function(t, e, n) {
            return n || "input" !== t.nodeName.toLowerCase() ? void 0 : t.defaultValue
        }), i(function(t) {
            return null == t.getAttribute("disabled")
        }) || o(re, function(t, e, n) {
            var r;
            return n ? void 0 : t[e] === !0 ? e.toLowerCase() : (r = t.getAttributeNode(e)) && r.specified ? r.value : null
        }), e
    }(t);
    te.find = oe, te.expr = oe.selectors, te.expr[":"] = te.expr.pseudos, te.unique = oe.uniqueSort, te.text = oe.getText, te.isXMLDoc = oe.isXML, te.contains = oe.contains;
    var ae = te.expr.match.needsContext,
        se = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
        ue = /^.[^:#\[\.,]*$/;
    te.filter = function(t, e, n) {
        var r = e[0];
        return n && (t = ":not(" + t + ")"), 1 === e.length && 1 === r.nodeType ? te.find.matchesSelector(r, t) ? [r] : [] : te.find.matches(t, te.grep(e, function(t) {
            return 1 === t.nodeType
        }))
    }, te.fn.extend({
        find: function(t) {
            var e, n = this.length,
                r = [],
                i = this;
            if ("string" != typeof t) return this.pushStack(te(t).filter(function() {
                for (e = 0; n > e; e++)
                    if (te.contains(i[e], this)) return !0
            }));
            for (e = 0; n > e; e++) te.find(t, i[e], r);
            return r = this.pushStack(n > 1 ? te.unique(r) : r), r.selector = this.selector ? this.selector + " " + t : t, r
        },
        filter: function(t) {
            return this.pushStack(r(this, t || [], !1))
        },
        not: function(t) {
            return this.pushStack(r(this, t || [], !0))
        },
        is: function(t) {
            return !!r(this, "string" == typeof t && ae.test(t) ? te(t) : t || [], !1).length
        }
    });
    var le, ce = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,
        fe = te.fn.init = function(t, e) {
            var n, r;
            if (!t) return this;
            if ("string" == typeof t) {
                if (n = "<" === t[0] && ">" === t[t.length - 1] && t.length >= 3 ? [null, t, null] : ce.exec(t), !n || !n[1] && e) return !e || e.jquery ? (e || le).find(t) : this.constructor(e).find(t);
                if (n[1]) {
                    if (e = e instanceof te ? e[0] : e, te.merge(this, te.parseHTML(n[1], e && e.nodeType ? e.ownerDocument || e : G, !0)), se.test(n[1]) && te.isPlainObject(e))
                        for (n in e) te.isFunction(this[n]) ? this[n](e[n]) : this.attr(n, e[n]);
                    return this
                }
                return r = G.getElementById(n[2]), r && r.parentNode && (this.length = 1, this[0] = r), this.context = G, this.selector = t, this
            }
            return t.nodeType ? (this.context = this[0] = t, this.length = 1, this) : te.isFunction(t) ? "undefined" != typeof le.ready ? le.ready(t) : t(te) : (void 0 !== t.selector && (this.selector = t.selector, this.context = t.context), te.makeArray(t, this))
        };
    fe.prototype = te.fn, le = te(G);
    var he = /^(?:parents|prev(?:Until|All))/,
        de = {
            children: !0,
            contents: !0,
            next: !0,
            prev: !0
        };
    te.extend({
        dir: function(t, e, n) {
            for (var r = [], i = void 0 !== n;
                (t = t[e]) && 9 !== t.nodeType;)
                if (1 === t.nodeType) {
                    if (i && te(t).is(n)) break;
                    r.push(t)
                }
            return r
        },
        sibling: function(t, e) {
            for (var n = []; t; t = t.nextSibling) 1 === t.nodeType && t !== e && n.push(t);
            return n
        }
    }), te.fn.extend({
        has: function(t) {
            var e = te(t, this),
                n = e.length;
            return this.filter(function() {
                for (var t = 0; n > t; t++)
                    if (te.contains(this, e[t])) return !0
            })
        },
        closest: function(t, e) {
            for (var n, r = 0, i = this.length, o = [], a = ae.test(t) || "string" != typeof t ? te(t, e || this.context) : 0; i > r; r++)
                for (n = this[r]; n && n !== e; n = n.parentNode)
                    if (n.nodeType < 11 && (a ? a.index(n) > -1 : 1 === n.nodeType && te.find.matchesSelector(n, t))) {
                        o.push(n);
                        break
                    }
            return this.pushStack(o.length > 1 ? te.unique(o) : o)
        },
        index: function(t) {
            return t ? "string" == typeof t ? Z.call(te(t), this[0]) : Z.call(this, t.jquery ? t[0] : t) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1
        },
        add: function(t, e) {
            return this.pushStack(te.unique(te.merge(this.get(), te(t, e))))
        },
        addBack: function(t) {
            return this.add(null == t ? this.prevObject : this.prevObject.filter(t))
        }
    }), te.each({
        parent: function(t) {
            var e = t.parentNode;
            return e && 11 !== e.nodeType ? e : null
        },
        parents: function(t) {
            return te.dir(t, "parentNode")
        },
        parentsUntil: function(t, e, n) {
            return te.dir(t, "parentNode", n)
        },
        next: function(t) {
            return i(t, "nextSibling")
        },
        prev: function(t) {
            return i(t, "previousSibling")
        },
        nextAll: function(t) {
            return te.dir(t, "nextSibling")
        },
        prevAll: function(t) {
            return te.dir(t, "previousSibling")
        },
        nextUntil: function(t, e, n) {
            return te.dir(t, "nextSibling", n)
        },
        prevUntil: function(t, e, n) {
            return te.dir(t, "previousSibling", n)
        },
        siblings: function(t) {
            return te.sibling((t.parentNode || {}).firstChild, t)
        },
        children: function(t) {
            return te.sibling(t.firstChild)
        },
        contents: function(t) {
            return t.contentDocument || te.merge([], t.childNodes)
        }
    }, function(t, e) {
        te.fn[t] = function(n, r) {
            var i = te.map(this, e, n);
            return "Until" !== t.slice(-5) && (r = n), r && "string" == typeof r && (i = te.filter(r, i)), this.length > 1 && (de[t] || te.unique(i), he.test(t) && i.reverse()), this.pushStack(i)
        }
    });
    var pe = /\S+/g,
        ge = {};
    te.Callbacks = function(t) {
        t = "string" == typeof t ? ge[t] || o(t) : te.extend({}, t);
        var e, n, r, i, a, s, u = [],
            l = !t.once && [],
            c = function(o) {
                for (e = t.memory && o, n = !0, s = i || 0, i = 0, a = u.length, r = !0; u && a > s; s++)
                    if (u[s].apply(o[0], o[1]) === !1 && t.stopOnFalse) {
                        e = !1;
                        break
                    }
                r = !1, u && (l ? l.length && c(l.shift()) : e ? u = [] : f.disable())
            },
            f = {
                add: function() {
                    if (u) {
                        var n = u.length;
                        ! function o(e) {
                            te.each(e, function(e, n) {
                                var r = te.type(n);
                                "function" === r ? t.unique && f.has(n) || u.push(n) : n && n.length && "string" !== r && o(n)
                            })
                        }(arguments), r ? a = u.length : e && (i = n, c(e))
                    }
                    return this
                },
                remove: function() {
                    return u && te.each(arguments, function(t, e) {
                        for (var n;
                            (n = te.inArray(e, u, n)) > -1;) u.splice(n, 1), r && (a >= n && a--, s >= n && s--)
                    }), this
                },
                has: function(t) {
                    return t ? te.inArray(t, u) > -1 : !(!u || !u.length)
                },
                empty: function() {
                    return u = [], a = 0, this
                },
                disable: function() {
                    return u = l = e = void 0, this
                },
                disabled: function() {
                    return !u
                },
                lock: function() {
                    return l = void 0, e || f.disable(), this
                },
                locked: function() {
                    return !l
                },
                fireWith: function(t, e) {
                    return !u || n && !l || (e = e || [], e = [t, e.slice ? e.slice() : e], r ? l.push(e) : c(e)), this
                },
                fire: function() {
                    return f.fireWith(this, arguments), this
                },
                fired: function() {
                    return !!n
                }
            };
        return f
    }, te.extend({
        Deferred: function(t) {
            var e = [
                    ["resolve", "done", te.Callbacks("once memory"), "resolved"],
                    ["reject", "fail", te.Callbacks("once memory"), "rejected"],
                    ["notify", "progress", te.Callbacks("memory")]
                ],
                n = "pending",
                r = {
                    state: function() {
                        return n
                    },
                    always: function() {
                        return i.done(arguments).fail(arguments), this
                    },
                    then: function() {
                        var t = arguments;
                        return te.Deferred(function(n) {
                            te.each(e, function(e, o) {
                                var a = te.isFunction(t[e]) && t[e];
                                i[o[1]](function() {
                                    var t = a && a.apply(this, arguments);
                                    t && te.isFunction(t.promise) ? t.promise().done(n.resolve).fail(n.reject).progress(n.notify) : n[o[0] + "With"](this === r ? n.promise() : this, a ? [t] : arguments)
                                })
                            }), t = null
                        }).promise()
                    },
                    promise: function(t) {
                        return null != t ? te.extend(t, r) : r
                    }
                },
                i = {};
            return r.pipe = r.then, te.each(e, function(t, o) {
                var a = o[2],
                    s = o[3];
                r[o[1]] = a.add, s && a.add(function() {
                    n = s
                }, e[1 ^ t][2].disable, e[2][2].lock), i[o[0]] = function() {
                    return i[o[0] + "With"](this === i ? r : this, arguments), this
                }, i[o[0] + "With"] = a.fireWith
            }), r.promise(i), t && t.call(i, i), i
        },
        when: function(t) {
            var e = 0,
                n = U.call(arguments),
                r = n.length,
                i = 1 !== r || t && te.isFunction(t.promise) ? r : 0,
                o = 1 === i ? t : te.Deferred(),
                a = function(t, e, n) {
                    return function(r) {
                        e[t] = this, n[t] = arguments.length > 1 ? U.call(arguments) : r, n === s ? o.notifyWith(e, n) : --i || o.resolveWith(e, n)
                    }
                },
                s, u, l;
            if (r > 1)
                for (s = new Array(r), u = new Array(r), l = new Array(r); r > e; e++) n[e] && te.isFunction(n[e].promise) ? n[e].promise().done(a(e, l, n)).fail(o.reject).progress(a(e, u, s)) : --i;
            return i || o.resolveWith(l, n), o.promise()
        }
    });
    var me;
    te.fn.ready = function(t) {
        return te.ready.promise().done(t), this
    }, te.extend({
        isReady: !1,
        readyWait: 1,
        holdReady: function(t) {
            t ? te.readyWait++ : te.ready(!0)
        },
        ready: function(t) {
            (t === !0 ? --te.readyWait : te.isReady) || (te.isReady = !0, t !== !0 && --te.readyWait > 0 || (me.resolveWith(G, [te]), te.fn.triggerHandler && (te(G).triggerHandler("ready"), te(G).off("ready"))))
        }
    }), te.ready.promise = function(e) {
        return me || (me = te.Deferred(), "complete" === G.readyState ? setTimeout(te.ready) : (G.addEventListener("DOMContentLoaded", a, !1), t.addEventListener("load", a, !1))), me.promise(e)
    }, te.ready.promise();
    var ve = te.access = function(t, e, n, r, i, o, a) {
        var s = 0,
            u = t.length,
            l = null == n;
        if ("object" === te.type(n)) {
            i = !0;
            for (s in n) te.access(t, e, s, n[s], !0, o, a)
        } else if (void 0 !== r && (i = !0, te.isFunction(r) || (a = !0), l && (a ? (e.call(t, r), e = null) : (l = e, e = function(t, e, n) {
                return l.call(te(t), n)
            })), e))
            for (; u > s; s++) e(t[s], n, a ? r : r.call(t[s], s, e(t[s], n)));
        return i ? t : l ? e.call(t) : u ? e(t[0], n) : o
    };
    te.acceptData = function(t) {
        return 1 === t.nodeType || 9 === t.nodeType || !+t.nodeType
    }, s.uid = 1, s.accepts = te.acceptData, s.prototype = {
        key: function(t) {
            if (!s.accepts(t)) return 0;
            var e = {},
                n = t[this.expando];
            if (!n) {
                n = s.uid++;
                try {
                    e[this.expando] = {
                        value: n
                    }, Object.defineProperties(t, e)
                } catch (r) {
                    e[this.expando] = n, te.extend(t, e)
                }
            }
            return this.cache[n] || (this.cache[n] = {}), n
        },
        set: function(t, e, n) {
            var r, i = this.key(t),
                o = this.cache[i];
            if ("string" == typeof e) o[e] = n;
            else if (te.isEmptyObject(o)) te.extend(this.cache[i], e);
            else
                for (r in e) o[r] = e[r];
            return o
        },
        get: function(t, e) {
            var n = this.cache[this.key(t)];
            return void 0 === e ? n : n[e]
        },
        access: function(t, e, n) {
            var r;
            return void 0 === e || e && "string" == typeof e && void 0 === n ? (r = this.get(t, e), void 0 !== r ? r : this.get(t, te.camelCase(e))) : (this.set(t, e, n), void 0 !== n ? n : e)
        },
        remove: function(t, e) {
            var n, r, i, o = this.key(t),
                a = this.cache[o];
            if (void 0 === e) this.cache[o] = {};
            else {
                te.isArray(e) ? r = e.concat(e.map(te.camelCase)) : (i = te.camelCase(e), e in a ? r = [e, i] : (r = i, r = r in a ? [r] : r.match(pe) || [])), n = r.length;
                for (; n--;) delete a[r[n]]
            }
        },
        hasData: function(t) {
            return !te.isEmptyObject(this.cache[t[this.expando]] || {})
        },
        discard: function(t) {
            t[this.expando] && delete this.cache[t[this.expando]]
        }
    };
    var ye = new s,
        be = new s,
        xe = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
        we = /([A-Z])/g;
    te.extend({
        hasData: function(t) {
            return be.hasData(t) || ye.hasData(t)
        },
        data: function(t, e, n) {
            return be.access(t, e, n)
        },
        removeData: function(t, e) {
            be.remove(t, e)
        },
        _data: function(t, e, n) {
            return ye.access(t, e, n)
        },
        _removeData: function(t, e) {
            ye.remove(t, e)
        }
    }), te.fn.extend({
        data: function(t, e) {
            var n, r, i, o = this[0],
                a = o && o.attributes;
            if (void 0 === t) {
                if (this.length && (i = be.get(o), 1 === o.nodeType && !ye.get(o, "hasDataAttrs"))) {
                    for (n = a.length; n--;) a[n] && (r = a[n].name, 0 === r.indexOf("data-") && (r = te.camelCase(r.slice(5)), u(o, r, i[r])));
                    ye.set(o, "hasDataAttrs", !0)
                }
                return i
            }
            return "object" == typeof t ? this.each(function() {
                be.set(this, t)
            }) : ve(this, function(e) {
                var n, r = te.camelCase(t);
                if (o && void 0 === e) {
                    if (n = be.get(o, t), void 0 !== n) return n;
                    if (n = be.get(o, r), void 0 !== n) return n;
                    if (n = u(o, r, void 0), void 0 !== n) return n
                } else this.each(function() {
                    var n = be.get(this, r);
                    be.set(this, r, e), -1 !== t.indexOf("-") && void 0 !== n && be.set(this, t, e)
                })
            }, null, e, arguments.length > 1, null, !0)
        },
        removeData: function(t) {
            return this.each(function() {
                be.remove(this, t)
            })
        }
    }), te.extend({
        queue: function(t, e, n) {
            var r;
            return t ? (e = (e || "fx") + "queue", r = ye.get(t, e), n && (!r || te.isArray(n) ? r = ye.access(t, e, te.makeArray(n)) : r.push(n)), r || []) : void 0
        },
        dequeue: function(t, e) {
            e = e || "fx";
            var n = te.queue(t, e),
                r = n.length,
                i = n.shift(),
                o = te._queueHooks(t, e),
                a = function() {
                    te.dequeue(t, e)
                };
            "inprogress" === i && (i = n.shift(), r--), i && ("fx" === e && n.unshift("inprogress"), delete o.stop, i.call(t, a, o)), !r && o && o.empty.fire()
        },
        _queueHooks: function(t, e) {
            var n = e + "queueHooks";
            return ye.get(t, n) || ye.access(t, n, {
                empty: te.Callbacks("once memory").add(function() {
                    ye.remove(t, [e + "queue", n])
                })
            })
        }
    }), te.fn.extend({
        queue: function(t, e) {
            var n = 2;
            return "string" != typeof t && (e = t, t = "fx", n--), arguments.length < n ? te.queue(this[0], t) : void 0 === e ? this : this.each(function() {
                var n = te.queue(this, t, e);
                te._queueHooks(this, t), "fx" === t && "inprogress" !== n[0] && te.dequeue(this, t)
            })
        },
        dequeue: function(t) {
            return this.each(function() {
                te.dequeue(this, t)
            })
        },
        clearQueue: function(t) {
            return this.queue(t || "fx", [])
        },
        promise: function(t, e) {
            var n, r = 1,
                i = te.Deferred(),
                o = this,
                a = this.length,
                s = function() {
                    --r || i.resolveWith(o, [o])
                };
            for ("string" != typeof t && (e = t, t = void 0), t = t || "fx"; a--;) n = ye.get(o[a], t + "queueHooks"), n && n.empty && (r++, n.empty.add(s));
            return s(), i.promise(e)
        }
    });
    var _e = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
        Me = ["Top", "Right", "Bottom", "Left"],
        ke = function(t, e) {
            return t = e || t, "none" === te.css(t, "display") || !te.contains(t.ownerDocument, t)
        },
        Ne = /^(?:checkbox|radio)$/i;
    ! function() {
        var t = G.createDocumentFragment(),
            e = t.appendChild(G.createElement("div")),
            n = G.createElement("input");
        n.setAttribute("type", "radio"), n.setAttribute("checked", "checked"), n.setAttribute("name", "t"), e.appendChild(n), K.checkClone = e.cloneNode(!0).cloneNode(!0).lastChild.checked, e.innerHTML = "<textarea>x</textarea>", K.noCloneChecked = !!e.cloneNode(!0).lastChild.defaultValue
    }();
    var Ce = "undefined";
    K.focusinBubbles = "onfocusin" in t;
    var Ee = /^key/,
        Se = /^(?:mouse|pointer|contextmenu)|click/,
        Te = /^(?:focusinfocus|focusoutblur)$/,
        Ae = /^([^.]*)(?:\.(.+)|)$/;
    te.event = {
        global: {},
        add: function(t, e, n, r, i) {
            var o, a, s, u, l, c, f, h, d, p, g, m = ye.get(t);
            if (m)
                for (n.handler && (o = n, n = o.handler, i = o.selector), n.guid || (n.guid = te.guid++), (u = m.events) || (u = m.events = {}), (a = m.handle) || (a = m.handle = function(e) {
                        return typeof te !== Ce && te.event.triggered !== e.type ? te.event.dispatch.apply(t, arguments) : void 0
                    }), e = (e || "").match(pe) || [""], l = e.length; l--;) s = Ae.exec(e[l]) || [], d = g = s[1], p = (s[2] || "").split(".").sort(), d && (f = te.event.special[d] || {}, d = (i ? f.delegateType : f.bindType) || d, f = te.event.special[d] || {}, c = te.extend({
                    type: d,
                    origType: g,
                    data: r,
                    handler: n,
                    guid: n.guid,
                    selector: i,
                    needsContext: i && te.expr.match.needsContext.test(i),
                    namespace: p.join(".")
                }, o), (h = u[d]) || (h = u[d] = [], h.delegateCount = 0, f.setup && f.setup.call(t, r, p, a) !== !1 || t.addEventListener && t.addEventListener(d, a, !1)), f.add && (f.add.call(t, c), c.handler.guid || (c.handler.guid = n.guid)), i ? h.splice(h.delegateCount++, 0, c) : h.push(c), te.event.global[d] = !0)
        },
        remove: function(t, e, n, r, i) {
            var o, a, s, u, l, c, f, h, d, p, g, m = ye.hasData(t) && ye.get(t);
            if (m && (u = m.events)) {
                for (e = (e || "").match(pe) || [""], l = e.length; l--;)
                    if (s = Ae.exec(e[l]) || [], d = g = s[1], p = (s[2] || "").split(".").sort(), d) {
                        for (f = te.event.special[d] || {}, d = (r ? f.delegateType : f.bindType) || d, h = u[d] || [], s = s[2] && new RegExp("(^|\\.)" + p.join("\\.(?:.*\\.|)") + "(\\.|$)"), a = o = h.length; o--;) c = h[o], !i && g !== c.origType || n && n.guid !== c.guid || s && !s.test(c.namespace) || r && r !== c.selector && ("**" !== r || !c.selector) || (h.splice(o, 1), c.selector && h.delegateCount--, f.remove && f.remove.call(t, c));
                        a && !h.length && (f.teardown && f.teardown.call(t, p, m.handle) !== !1 || te.removeEvent(t, d, m.handle), delete u[d])
                    } else
                        for (d in u) te.event.remove(t, d + e[l], n, r, !0);
                te.isEmptyObject(u) && (delete m.handle, ye.remove(t, "events"))
            }
        },
        trigger: function(e, n, r, i) {
            var o, a, s, u, l, c, f, h = [r || G],
                d = Q.call(e, "type") ? e.type : e,
                p = Q.call(e, "namespace") ? e.namespace.split(".") : [];
            if (a = s = r = r || G, 3 !== r.nodeType && 8 !== r.nodeType && !Te.test(d + te.event.triggered) && (d.indexOf(".") >= 0 && (p = d.split("."), d = p.shift(), p.sort()), l = d.indexOf(":") < 0 && "on" + d, e = e[te.expando] ? e : new te.Event(d, "object" == typeof e && e), e.isTrigger = i ? 2 : 3, e.namespace = p.join("."), e.namespace_re = e.namespace ? new RegExp("(^|\\.)" + p.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, e.result = void 0, e.target || (e.target = r), n = null == n ? [e] : te.makeArray(n, [e]), f = te.event.special[d] || {}, i || !f.trigger || f.trigger.apply(r, n) !== !1)) {
                if (!i && !f.noBubble && !te.isWindow(r)) {
                    for (u = f.delegateType || d, Te.test(u + d) || (a = a.parentNode); a; a = a.parentNode) h.push(a), s = a;
                    s === (r.ownerDocument || G) && h.push(s.defaultView || s.parentWindow || t)
                }
                for (o = 0;
                    (a = h[o++]) && !e.isPropagationStopped();) e.type = o > 1 ? u : f.bindType || d, c = (ye.get(a, "events") || {})[e.type] && ye.get(a, "handle"), c && c.apply(a, n), c = l && a[l], c && c.apply && te.acceptData(a) && (e.result = c.apply(a, n), e.result === !1 && e.preventDefault());
                return e.type = d, i || e.isDefaultPrevented() || f._default && f._default.apply(h.pop(), n) !== !1 || !te.acceptData(r) || l && te.isFunction(r[d]) && !te.isWindow(r) && (s = r[l], s && (r[l] = null), te.event.triggered = d, r[d](), te.event.triggered = void 0, s && (r[l] = s)), e.result
            }
        },
        dispatch: function(t) {
            t = te.event.fix(t);
            var e, n, r, i, o, a = [],
                s = U.call(arguments),
                u = (ye.get(this, "events") || {})[t.type] || [],
                l = te.event.special[t.type] || {};
            if (s[0] = t, t.delegateTarget = this, !l.preDispatch || l.preDispatch.call(this, t) !== !1) {
                for (a = te.event.handlers.call(this, t, u), e = 0;
                    (i = a[e++]) && !t.isPropagationStopped();)
                    for (t.currentTarget = i.elem, n = 0;
                        (o = i.handlers[n++]) && !t.isImmediatePropagationStopped();)(!t.namespace_re || t.namespace_re.test(o.namespace)) && (t.handleObj = o, t.data = o.data, r = ((te.event.special[o.origType] || {}).handle || o.handler).apply(i.elem, s), void 0 !== r && (t.result = r) === !1 && (t.preventDefault(), t.stopPropagation()));
                return l.postDispatch && l.postDispatch.call(this, t), t.result
            }
        },
        handlers: function(t, e) {
            var n, r, i, o, a = [],
                s = e.delegateCount,
                u = t.target;
            if (s && u.nodeType && (!t.button || "click" !== t.type))
                for (; u !== this; u = u.parentNode || this)
                    if (u.disabled !== !0 || "click" !== t.type) {
                        for (r = [], n = 0; s > n; n++) o = e[n], i = o.selector + " ", void 0 === r[i] && (r[i] = o.needsContext ? te(i, this).index(u) >= 0 : te.find(i, this, null, [u]).length), r[i] && r.push(o);
                        r.length && a.push({
                            elem: u,
                            handlers: r
                        })
                    }
            return s < e.length && a.push({
                elem: this,
                handlers: e.slice(s)
            }), a
        },
        props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
        fixHooks: {},
        keyHooks: {
            props: "char charCode key keyCode".split(" "),
            filter: function(t, e) {
                return null == t.which && (t.which = null != e.charCode ? e.charCode : e.keyCode), t
            }
        },
        mouseHooks: {
            props: "button buttons clientX clientY offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
            filter: function(t, e) {
                var n, r, i, o = e.button;
                return null == t.pageX && null != e.clientX && (n = t.target.ownerDocument || G, r = n.documentElement, i = n.body, t.pageX = e.clientX + (r && r.scrollLeft || i && i.scrollLeft || 0) - (r && r.clientLeft || i && i.clientLeft || 0), t.pageY = e.clientY + (r && r.scrollTop || i && i.scrollTop || 0) - (r && r.clientTop || i && i.clientTop || 0)), t.which || void 0 === o || (t.which = 1 & o ? 1 : 2 & o ? 3 : 4 & o ? 2 : 0), t
            }
        },
        fix: function(t) {
            if (t[te.expando]) return t;
            var e, n, r, i = t.type,
                o = t,
                a = this.fixHooks[i];
            for (a || (this.fixHooks[i] = a = Se.test(i) ? this.mouseHooks : Ee.test(i) ? this.keyHooks : {}), r = a.props ? this.props.concat(a.props) : this.props, t = new te.Event(o), e = r.length; e--;) n = r[e], t[n] = o[n];
            return t.target || (t.target = G), 3 === t.target.nodeType && (t.target = t.target.parentNode), a.filter ? a.filter(t, o) : t
        },
        special: {
            load: {
                noBubble: !0
            },
            focus: {
                trigger: function() {
                    return this !== f() && this.focus ? (this.focus(), !1) : void 0
                },
                delegateType: "focusin"
            },
            blur: {
                trigger: function() {
                    return this === f() && this.blur ? (this.blur(), !1) : void 0
                },
                delegateType: "focusout"
            },
            click: {
                trigger: function() {
                    return "checkbox" === this.type && this.click && te.nodeName(this, "input") ? (this.click(), !1) : void 0
                },
                _default: function(t) {
                    return te.nodeName(t.target, "a")
                }
            },
            beforeunload: {
                postDispatch: function(t) {
                    void 0 !== t.result && t.originalEvent && (t.originalEvent.returnValue = t.result)
                }
            }
        },
        simulate: function(t, e, n, r) {
            var i = te.extend(new te.Event, n, {
                type: t,
                isSimulated: !0,
                originalEvent: {}
            });
            r ? te.event.trigger(i, null, e) : te.event.dispatch.call(e, i), i.isDefaultPrevented() && n.preventDefault()
        }
    }, te.removeEvent = function(t, e, n) {
        t.removeEventListener && t.removeEventListener(e, n, !1)
    }, te.Event = function(t, e) {
        return this instanceof te.Event ? (t && t.type ? (this.originalEvent = t, this.type = t.type, this.isDefaultPrevented = t.defaultPrevented || void 0 === t.defaultPrevented && t.returnValue === !1 ? l : c) : this.type = t, e && te.extend(this, e), this.timeStamp = t && t.timeStamp || te.now(), void(this[te.expando] = !0)) : new te.Event(t, e)
    }, te.Event.prototype = {
        isDefaultPrevented: c,
        isPropagationStopped: c,
        isImmediatePropagationStopped: c,
        preventDefault: function() {
            var t = this.originalEvent;
            this.isDefaultPrevented = l, t && t.preventDefault && t.preventDefault()
        },
        stopPropagation: function() {
            var t = this.originalEvent;
            this.isPropagationStopped = l, t && t.stopPropagation && t.stopPropagation()
        },
        stopImmediatePropagation: function() {
            var t = this.originalEvent;
            this.isImmediatePropagationStopped = l, t && t.stopImmediatePropagation && t.stopImmediatePropagation(), this.stopPropagation()
        }
    }, te.each({
        mouseenter: "mouseover",
        mouseleave: "mouseout",
        pointerenter: "pointerover",
        pointerleave: "pointerout"
    }, function(t, e) {
        te.event.special[t] = {
            delegateType: e,
            bindType: e,
            handle: function(t) {
                var n, r = this,
                    i = t.relatedTarget,
                    o = t.handleObj;
                return (!i || i !== r && !te.contains(r, i)) && (t.type = o.origType, n = o.handler.apply(this, arguments), t.type = e), n
            }
        }
    }), K.focusinBubbles || te.each({
        focus: "focusin",
        blur: "focusout"
    }, function(t, e) {
        var n = function(t) {
            te.event.simulate(e, t.target, te.event.fix(t), !0)
        };
        te.event.special[e] = {
            setup: function() {
                var r = this.ownerDocument || this,
                    i = ye.access(r, e);
                i || r.addEventListener(t, n, !0), ye.access(r, e, (i || 0) + 1)
            },
            teardown: function() {
                var r = this.ownerDocument || this,
                    i = ye.access(r, e) - 1;
                i ? ye.access(r, e, i) : (r.removeEventListener(t, n, !0), ye.remove(r, e))
            }
        }
    }), te.fn.extend({
        on: function(t, e, n, r, i) {
            var o, a;
            if ("object" == typeof t) {
                "string" != typeof e && (n = n || e, e = void 0);
                for (a in t) this.on(a, e, n, t[a], i);
                return this
            }
            if (null == n && null == r ? (r = e, n = e = void 0) : null == r && ("string" == typeof e ? (r = n, n = void 0) : (r = n, n = e, e = void 0)), r === !1) r = c;
            else if (!r) return this;
            return 1 === i && (o = r, r = function(t) {
                return te().off(t), o.apply(this, arguments)
            }, r.guid = o.guid || (o.guid = te.guid++)), this.each(function() {
                te.event.add(this, t, r, n, e)
            })
        },
        one: function(t, e, n, r) {
            return this.on(t, e, n, r, 1)
        },
        off: function(t, e, n) {
            var r, i;
            if (t && t.preventDefault && t.handleObj) return r = t.handleObj, te(t.delegateTarget).off(r.namespace ? r.origType + "." + r.namespace : r.origType, r.selector, r.handler), this;
            if ("object" == typeof t) {
                for (i in t) this.off(i, e, t[i]);
                return this
            }
            return (e === !1 || "function" == typeof e) && (n = e, e = void 0), n === !1 && (n = c), this.each(function() {
                te.event.remove(this, t, n, e)
            })
        },
        trigger: function(t, e) {
            return this.each(function() {
                te.event.trigger(t, e, this)
            })
        },
        triggerHandler: function(t, e) {
            var n = this[0];
            return n ? te.event.trigger(t, e, n, !0) : void 0
        }
    });
    var $e = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
        Le = /<([\w:]+)/,
        je = /<|&#?\w+;/,
        De = /<(?:script|style|link)/i,
        qe = /checked\s*(?:[^=]|=\s*.checked.)/i,
        Re = /^$|\/(?:java|ecma)script/i,
        ze = /^true\/(.*)/,
        Ie = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,
        Be = {
            option: [1, "<select multiple='multiple'>", "</select>"],
            thead: [1, "<table>", "</table>"],
            col: [2, "<table><colgroup>", "</colgroup></table>"],
            tr: [2, "<table><tbody>", "</tbody></table>"],
            td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
            _default: [0, "", ""]
        };
    Be.optgroup = Be.option, Be.tbody = Be.tfoot = Be.colgroup = Be.caption = Be.thead, Be.th = Be.td, te.extend({
        clone: function(t, e, n) {
            var r, i, o, a, s = t.cloneNode(!0),
                u = te.contains(t.ownerDocument, t);
            if (!(K.noCloneChecked || 1 !== t.nodeType && 11 !== t.nodeType || te.isXMLDoc(t)))
                for (a = v(s), o = v(t), r = 0, i = o.length; i > r; r++) y(o[r], a[r]);
            if (e)
                if (n)
                    for (o = o || v(t), a = a || v(s), r = 0, i = o.length; i > r; r++) m(o[r], a[r]);
                else m(t, s);
            return a = v(s, "script"), a.length > 0 && g(a, !u && v(t, "script")), s
        },
        buildFragment: function(t, e, n, r) {
            for (var i, o, a, s, u, l, c = e.createDocumentFragment(), f = [], h = 0, d = t.length; d > h; h++)
                if (i = t[h], i || 0 === i)
                    if ("object" === te.type(i)) te.merge(f, i.nodeType ? [i] : i);
                    else if (je.test(i)) {
                for (o = o || c.appendChild(e.createElement("div")), a = (Le.exec(i) || ["", ""])[1].toLowerCase(), s = Be[a] || Be._default, o.innerHTML = s[1] + i.replace($e, "<$1></$2>") + s[2], l = s[0]; l--;) o = o.lastChild;
                te.merge(f, o.childNodes), o = c.firstChild, o.textContent = ""
            } else f.push(e.createTextNode(i));
            for (c.textContent = "", h = 0; i = f[h++];)
                if ((!r || -1 === te.inArray(i, r)) && (u = te.contains(i.ownerDocument, i), o = v(c.appendChild(i), "script"), u && g(o), n))
                    for (l = 0; i = o[l++];) Re.test(i.type || "") && n.push(i);
            return c
        },
        cleanData: function(t) {
            for (var e, n, r, i, o = te.event.special, a = 0; void 0 !== (n = t[a]); a++) {
                if (te.acceptData(n) && (i = n[ye.expando], i && (e = ye.cache[i]))) {
                    if (e.events)
                        for (r in e.events) o[r] ? te.event.remove(n, r) : te.removeEvent(n, r, e.handle);
                    ye.cache[i] && delete ye.cache[i]
                }
                delete be.cache[n[be.expando]]
            }
        }
    }), te.fn.extend({
        text: function(t) {
            return ve(this, function(t) {
                return void 0 === t ? te.text(this) : this.empty().each(function() {
                    (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) && (this.textContent = t)
                })
            }, null, t, arguments.length)
        },
        append: function() {
            return this.domManip(arguments, function(t) {
                if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                    var e = h(this, t);
                    e.appendChild(t)
                }
            })
        },
        prepend: function() {
            return this.domManip(arguments, function(t) {
                if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                    var e = h(this, t);
                    e.insertBefore(t, e.firstChild)
                }
            })
        },
        before: function() {
            return this.domManip(arguments, function(t) {
                this.parentNode && this.parentNode.insertBefore(t, this)
            })
        },
        after: function() {
            return this.domManip(arguments, function(t) {
                this.parentNode && this.parentNode.insertBefore(t, this.nextSibling)
            })
        },
        remove: function(t, e) {
            for (var n, r = t ? te.filter(t, this) : this, i = 0; null != (n = r[i]); i++) e || 1 !== n.nodeType || te.cleanData(v(n)), n.parentNode && (e && te.contains(n.ownerDocument, n) && g(v(n, "script")), n.parentNode.removeChild(n));
            return this
        },
        empty: function() {
            for (var t, e = 0; null != (t = this[e]); e++) 1 === t.nodeType && (te.cleanData(v(t, !1)), t.textContent = "");
            return this
        },
        clone: function(t, e) {
            return t = null == t ? !1 : t, e = null == e ? t : e, this.map(function() {
                return te.clone(this, t, e)
            })
        },
        html: function(t) {
            return ve(this, function(t) {
                var e = this[0] || {},
                    n = 0,
                    r = this.length;
                if (void 0 === t && 1 === e.nodeType) return e.innerHTML;
                if ("string" == typeof t && !De.test(t) && !Be[(Le.exec(t) || ["", ""])[1].toLowerCase()]) {
                    t = t.replace($e, "<$1></$2>");
                    try {
                        for (; r > n; n++) e = this[n] || {}, 1 === e.nodeType && (te.cleanData(v(e, !1)), e.innerHTML = t);
                        e = 0
                    } catch (i) {}
                }
                e && this.empty().append(t)
            }, null, t, arguments.length)
        },
        replaceWith: function() {
            var t = arguments[0];
            return this.domManip(arguments, function(e) {
                t = this.parentNode, te.cleanData(v(this)), t && t.replaceChild(e, this)
            }), t && (t.length || t.nodeType) ? this : this.remove()
        },
        detach: function(t) {
            return this.remove(t, !0)
        },
        domManip: function(t, e) {
            t = W.apply([], t);
            var n, r, i, o, a, s, u = 0,
                l = this.length,
                c = this,
                f = l - 1,
                h = t[0],
                g = te.isFunction(h);
            if (g || l > 1 && "string" == typeof h && !K.checkClone && qe.test(h)) return this.each(function(n) {
                var r = c.eq(n);
                g && (t[0] = h.call(this, n, r.html())), r.domManip(t, e)
            });
            if (l && (n = te.buildFragment(t, this[0].ownerDocument, !1, this), r = n.firstChild, 1 === n.childNodes.length && (n = r), r)) {
                for (i = te.map(v(n, "script"), d), o = i.length; l > u; u++) a = n, u !== f && (a = te.clone(a, !0, !0), o && te.merge(i, v(a, "script"))), e.call(this[u], a, u);
                if (o)
                    for (s = i[i.length - 1].ownerDocument, te.map(i, p), u = 0; o > u; u++) a = i[u], Re.test(a.type || "") && !ye.access(a, "globalEval") && te.contains(s, a) && (a.src ? te._evalUrl && te._evalUrl(a.src) : te.globalEval(a.textContent.replace(Ie, "")))
            }
            return this
        }
    }), te.each({
        appendTo: "append",
        prependTo: "prepend",
        insertBefore: "before",
        insertAfter: "after",
        replaceAll: "replaceWith"
    }, function(t, e) {
        te.fn[t] = function(t) {
            for (var n, r = [], i = te(t), o = i.length - 1, a = 0; o >= a; a++) n = a === o ? this : this.clone(!0), te(i[a])[e](n), V.apply(r, n.get());
            return this.pushStack(r)
        }
    });
    var Oe, Pe = {},
        He = /^margin/,
        Fe = new RegExp("^(" + _e + ")(?!px)[a-z%]+$", "i"),
        Ue = function(t) {
            return t.ownerDocument.defaultView.getComputedStyle(t, null)
        };
    ! function() {
        function e() {
            a.style.cssText = "-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;display:block;margin-top:1%;top:1%;border:1px;padding:1px;width:4px;position:absolute", a.innerHTML = "", i.appendChild(o);
            var e = t.getComputedStyle(a, null);
            n = "1%" !== e.top, r = "4px" === e.width, i.removeChild(o)
        }
        var n, r, i = G.documentElement,
            o = G.createElement("div"),
            a = G.createElement("div");
        a.style && (a.style.backgroundClip = "content-box", a.cloneNode(!0).style.backgroundClip = "", K.clearCloneStyle = "content-box" === a.style.backgroundClip, o.style.cssText = "border:0;width:0;height:0;top:0;left:-9999px;margin-top:1px;position:absolute", o.appendChild(a), t.getComputedStyle && te.extend(K, {
            pixelPosition: function() {
                return e(), n
            },
            boxSizingReliable: function() {
                return null == r && e(), r
            },
            reliableMarginRight: function() {
                var e, n = a.appendChild(G.createElement("div"));
                return n.style.cssText = a.style.cssText = "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:0", n.style.marginRight = n.style.width = "0", a.style.width = "1px", i.appendChild(o), e = !parseFloat(t.getComputedStyle(n, null).marginRight), i.removeChild(o), e
            }
        }))
    }(), te.swap = function(t, e, n, r) {
        var i, o, a = {};
        for (o in e) a[o] = t.style[o], t.style[o] = e[o];
        i = n.apply(t, r || []);
        for (o in e) t.style[o] = a[o];
        return i
    };
    var We = /^(none|table(?!-c[ea]).+)/,
        Ve = new RegExp("^(" + _e + ")(.*)$", "i"),
        Ze = new RegExp("^([+-])=(" + _e + ")", "i"),
        Ye = {
            position: "absolute",
            visibility: "hidden",
            display: "block"
        },
        Xe = {
            letterSpacing: "0",
            fontWeight: "400"
        },
        Qe = ["Webkit", "O", "Moz", "ms"];
    te.extend({
        cssHooks: {
            opacity: {
                get: function(t, e) {
                    if (e) {
                        var n = w(t, "opacity");
                        return "" === n ? "1" : n
                    }
                }
            }
        },
        cssNumber: {
            columnCount: !0,
            fillOpacity: !0,
            flexGrow: !0,
            flexShrink: !0,
            fontWeight: !0,
            lineHeight: !0,
            opacity: !0,
            order: !0,
            orphans: !0,
            widows: !0,
            zIndex: !0,
            zoom: !0
        },
        cssProps: {
            "float": "cssFloat"
        },
        style: function(t, e, n, r) {
            if (t && 3 !== t.nodeType && 8 !== t.nodeType && t.style) {
                var i, o, a, s = te.camelCase(e),
                    u = t.style;
                return e = te.cssProps[s] || (te.cssProps[s] = M(u, s)), a = te.cssHooks[e] || te.cssHooks[s], void 0 === n ? a && "get" in a && void 0 !== (i = a.get(t, !1, r)) ? i : u[e] : (o = typeof n, "string" === o && (i = Ze.exec(n)) && (n = (i[1] + 1) * i[2] + parseFloat(te.css(t, e)), o = "number"), null != n && n === n && ("number" !== o || te.cssNumber[s] || (n += "px"), K.clearCloneStyle || "" !== n || 0 !== e.indexOf("background") || (u[e] = "inherit"), a && "set" in a && void 0 === (n = a.set(t, n, r)) || (u[e] = n)), void 0)
            }
        },
        css: function(t, e, n, r) {
            var i, o, a, s = te.camelCase(e);
            return e = te.cssProps[s] || (te.cssProps[s] = M(t.style, s)), a = te.cssHooks[e] || te.cssHooks[s], a && "get" in a && (i = a.get(t, !0, n)), void 0 === i && (i = w(t, e, r)), "normal" === i && e in Xe && (i = Xe[e]), "" === n || n ? (o = parseFloat(i), n === !0 || te.isNumeric(o) ? o || 0 : i) : i
        }
    }), te.each(["height", "width"], function(t, e) {
        te.cssHooks[e] = {
            get: function(t, n, r) {
                return n ? We.test(te.css(t, "display")) && 0 === t.offsetWidth ? te.swap(t, Ye, function() {
                    return C(t, e, r)
                }) : C(t, e, r) : void 0
            },
            set: function(t, n, r) {
                var i = r && Ue(t);
                return k(t, n, r ? N(t, e, r, "border-box" === te.css(t, "boxSizing", !1, i), i) : 0)
            }
        }
    }), te.cssHooks.marginRight = _(K.reliableMarginRight, function(t, e) {
        return e ? te.swap(t, {
            display: "inline-block"
        }, w, [t, "marginRight"]) : void 0
    }), te.each({
        margin: "",
        padding: "",
        border: "Width"
    }, function(t, e) {
        te.cssHooks[t + e] = {
            expand: function(n) {
                for (var r = 0, i = {}, o = "string" == typeof n ? n.split(" ") : [n]; 4 > r; r++) i[t + Me[r] + e] = o[r] || o[r - 2] || o[0];
                return i
            }
        }, He.test(t) || (te.cssHooks[t + e].set = k)
    }), te.fn.extend({
        css: function(t, e) {
            return ve(this, function(t, e, n) {
                var r, i, o = {},
                    a = 0;
                if (te.isArray(e)) {
                    for (r = Ue(t), i = e.length; i > a; a++) o[e[a]] = te.css(t, e[a], !1, r);
                    return o
                }
                return void 0 !== n ? te.style(t, e, n) : te.css(t, e)
            }, t, e, arguments.length > 1)
        },
        show: function() {
            return E(this, !0)
        },
        hide: function() {
            return E(this)
        },
        toggle: function(t) {
            return "boolean" == typeof t ? t ? this.show() : this.hide() : this.each(function() {
                ke(this) ? te(this).show() : te(this).hide()
            })
        }
    }), te.Tween = S, S.prototype = {
        constructor: S,
        init: function(t, e, n, r, i, o) {
            this.elem = t, this.prop = n, this.easing = i || "swing", this.options = e, this.start = this.now = this.cur(), this.end = r, this.unit = o || (te.cssNumber[n] ? "" : "px")
        },
        cur: function() {
            var t = S.propHooks[this.prop];
            return t && t.get ? t.get(this) : S.propHooks._default.get(this)
        },
        run: function(t) {
            var e, n = S.propHooks[this.prop];
            return this.pos = e = this.options.duration ? te.easing[this.easing](t, this.options.duration * t, 0, 1, this.options.duration) : t, this.now = (this.end - this.start) * e + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), n && n.set ? n.set(this) : S.propHooks._default.set(this), this
        }
    }, S.prototype.init.prototype = S.prototype, S.propHooks = {
        _default: {
            get: function(t) {
                var e;
                return null == t.elem[t.prop] || t.elem.style && null != t.elem.style[t.prop] ? (e = te.css(t.elem, t.prop, ""), e && "auto" !== e ? e : 0) : t.elem[t.prop]
            },
            set: function(t) {
                te.fx.step[t.prop] ? te.fx.step[t.prop](t) : t.elem.style && (null != t.elem.style[te.cssProps[t.prop]] || te.cssHooks[t.prop]) ? te.style(t.elem, t.prop, t.now + t.unit) : t.elem[t.prop] = t.now
            }
        }
    }, S.propHooks.scrollTop = S.propHooks.scrollLeft = {
        set: function(t) {
            t.elem.nodeType && t.elem.parentNode && (t.elem[t.prop] = t.now)
        }
    }, te.easing = {
        linear: function(t) {
            return t
        },
        swing: function(t) {
            return .5 - Math.cos(t * Math.PI) / 2
        }
    }, te.fx = S.prototype.init, te.fx.step = {};
    var Ke, Ge, Je = /^(?:toggle|show|hide)$/,
        tn = new RegExp("^(?:([+-])=|)(" + _e + ")([a-z%]*)$", "i"),
        en = /queueHooks$/,
        nn = [j],
        rn = {
            "*": [function(t, e) {
                var n = this.createTween(t, e),
                    r = n.cur(),
                    i = tn.exec(e),
                    o = i && i[3] || (te.cssNumber[t] ? "" : "px"),
                    a = (te.cssNumber[t] || "px" !== o && +r) && tn.exec(te.css(n.elem, t)),
                    s = 1,
                    u = 20;
                if (a && a[3] !== o) {
                    o = o || a[3], i = i || [], a = +r || 1;
                    do s = s || ".5", a /= s, te.style(n.elem, t, a + o); while (s !== (s = n.cur() / r) && 1 !== s && --u)
                }
                return i && (a = n.start = +a || +r || 0, n.unit = o, n.end = i[1] ? a + (i[1] + 1) * i[2] : +i[2]), n
            }]
        };
    te.Animation = te.extend(q, {
            tweener: function(t, e) {
                te.isFunction(t) ? (e = t, t = ["*"]) : t = t.split(" ");
                for (var n, r = 0, i = t.length; i > r; r++) n = t[r], rn[n] = rn[n] || [], rn[n].unshift(e)
            },
            prefilter: function(t, e) {
                e ? nn.unshift(t) : nn.push(t)
            }
        }), te.speed = function(t, e, n) {
            var r = t && "object" == typeof t ? te.extend({}, t) : {
                complete: n || !n && e || te.isFunction(t) && t,
                duration: t,
                easing: n && e || e && !te.isFunction(e) && e
            };
            return r.duration = te.fx.off ? 0 : "number" == typeof r.duration ? r.duration : r.duration in te.fx.speeds ? te.fx.speeds[r.duration] : te.fx.speeds._default, (null == r.queue || r.queue === !0) && (r.queue = "fx"), r.old = r.complete, r.complete = function() {
                te.isFunction(r.old) && r.old.call(this), r.queue && te.dequeue(this, r.queue)
            }, r
        }, te.fn.extend({
            fadeTo: function(t, e, n, r) {
                return this.filter(ke).css("opacity", 0).show().end().animate({
                    opacity: e
                }, t, n, r)
            },
            animate: function(t, e, n, r) {
                var i = te.isEmptyObject(t),
                    o = te.speed(e, n, r),
                    a = function() {
                        var e = q(this, te.extend({}, t), o);
                        (i || ye.get(this, "finish")) && e.stop(!0)
                    };
                return a.finish = a, i || o.queue === !1 ? this.each(a) : this.queue(o.queue, a)
            },
            stop: function(t, e, n) {
                var r = function(t) {
                    var e = t.stop;
                    delete t.stop, e(n)
                };
                return "string" != typeof t && (n = e, e = t, t = void 0), e && t !== !1 && this.queue(t || "fx", []), this.each(function() {
                    var e = !0,
                        i = null != t && t + "queueHooks",
                        o = te.timers,
                        a = ye.get(this);
                    if (i) a[i] && a[i].stop && r(a[i]);
                    else
                        for (i in a) a[i] && a[i].stop && en.test(i) && r(a[i]);
                    for (i = o.length; i--;) o[i].elem !== this || null != t && o[i].queue !== t || (o[i].anim.stop(n), e = !1, o.splice(i, 1));
                    (e || !n) && te.dequeue(this, t)
                })
            },
            finish: function(t) {
                return t !== !1 && (t = t || "fx"), this.each(function() {
                    var e, n = ye.get(this),
                        r = n[t + "queue"],
                        i = n[t + "queueHooks"],
                        o = te.timers,
                        a = r ? r.length : 0;
                    for (n.finish = !0, te.queue(this, t, []), i && i.stop && i.stop.call(this, !0), e = o.length; e--;) o[e].elem === this && o[e].queue === t && (o[e].anim.stop(!0), o.splice(e, 1));
                    for (e = 0; a > e; e++) r[e] && r[e].finish && r[e].finish.call(this);
                    delete n.finish
                })
            }
        }), te.each(["toggle", "show", "hide"], function(t, e) {
            var n = te.fn[e];
            te.fn[e] = function(t, r, i) {
                return null == t || "boolean" == typeof t ? n.apply(this, arguments) : this.animate(A(e, !0), t, r, i)
            }
        }), te.each({
            slideDown: A("show"),
            slideUp: A("hide"),
            slideToggle: A("toggle"),
            fadeIn: {
                opacity: "show"
            },
            fadeOut: {
                opacity: "hide"
            },
            fadeToggle: {
                opacity: "toggle"
            }
        }, function(t, e) {
            te.fn[t] = function(t, n, r) {
                return this.animate(e, t, n, r)
            }
        }), te.timers = [], te.fx.tick = function() {
            var t, e = 0,
                n = te.timers;
            for (Ke = te.now(); e < n.length; e++) t = n[e], t() || n[e] !== t || n.splice(e--, 1);
            n.length || te.fx.stop(), Ke = void 0
        }, te.fx.timer = function(t) {
            te.timers.push(t), t() ? te.fx.start() : te.timers.pop()
        }, te.fx.interval = 13, te.fx.start = function() {
            Ge || (Ge = setInterval(te.fx.tick, te.fx.interval))
        }, te.fx.stop = function() {
            clearInterval(Ge), Ge = null
        }, te.fx.speeds = {
            slow: 600,
            fast: 200,
            _default: 400
        }, te.fn.delay = function(t, e) {
            return t = te.fx ? te.fx.speeds[t] || t : t, e = e || "fx", this.queue(e, function(e, n) {
                var r = setTimeout(e, t);
                n.stop = function() {
                    clearTimeout(r)
                }
            })
        },
        function() {
            var t = G.createElement("input"),
                e = G.createElement("select"),
                n = e.appendChild(G.createElement("option"));
            t.type = "checkbox", K.checkOn = "" !== t.value, K.optSelected = n.selected, e.disabled = !0, K.optDisabled = !n.disabled, t = G.createElement("input"), t.value = "t", t.type = "radio", K.radioValue = "t" === t.value
        }();
    var on, an, sn = te.expr.attrHandle;
    te.fn.extend({
        attr: function(t, e) {
            return ve(this, te.attr, t, e, arguments.length > 1)
        },
        removeAttr: function(t) {
            return this.each(function() {
                te.removeAttr(this, t)
            })
        }
    }), te.extend({
        attr: function(t, e, n) {
            var r, i, o = t.nodeType;
            if (t && 3 !== o && 8 !== o && 2 !== o) return typeof t.getAttribute === Ce ? te.prop(t, e, n) : (1 === o && te.isXMLDoc(t) || (e = e.toLowerCase(), r = te.attrHooks[e] || (te.expr.match.bool.test(e) ? an : on)), void 0 === n ? r && "get" in r && null !== (i = r.get(t, e)) ? i : (i = te.find.attr(t, e), null == i ? void 0 : i) : null !== n ? r && "set" in r && void 0 !== (i = r.set(t, n, e)) ? i : (t.setAttribute(e, n + ""), n) : void te.removeAttr(t, e))
        },
        removeAttr: function(t, e) {
            var n, r, i = 0,
                o = e && e.match(pe);
            if (o && 1 === t.nodeType)
                for (; n = o[i++];) r = te.propFix[n] || n, te.expr.match.bool.test(n) && (t[r] = !1), t.removeAttribute(n)
        },
        attrHooks: {
            type: {
                set: function(t, e) {
                    if (!K.radioValue && "radio" === e && te.nodeName(t, "input")) {
                        var n = t.value;
                        return t.setAttribute("type", e), n && (t.value = n), e
                    }
                }
            }
        }
    }), an = {
        set: function(t, e, n) {
            return e === !1 ? te.removeAttr(t, n) : t.setAttribute(n, n), n
        }
    }, te.each(te.expr.match.bool.source.match(/\w+/g), function(t, e) {
        var n = sn[e] || te.find.attr;
        sn[e] = function(t, e, r) {
            var i, o;
            return r || (o = sn[e], sn[e] = i, i = null != n(t, e, r) ? e.toLowerCase() : null, sn[e] = o), i
        }
    });
    var un = /^(?:input|select|textarea|button)$/i;
    te.fn.extend({
        prop: function(t, e) {
            return ve(this, te.prop, t, e, arguments.length > 1)
        },
        removeProp: function(t) {
            return this.each(function() {
                delete this[te.propFix[t] || t]
            })
        }
    }), te.extend({
        propFix: {
            "for": "htmlFor",
            "class": "className"
        },
        prop: function(t, e, n) {
            var r, i, o, a = t.nodeType;
            if (t && 3 !== a && 8 !== a && 2 !== a) return o = 1 !== a || !te.isXMLDoc(t), o && (e = te.propFix[e] || e, i = te.propHooks[e]), void 0 !== n ? i && "set" in i && void 0 !== (r = i.set(t, n, e)) ? r : t[e] = n : i && "get" in i && null !== (r = i.get(t, e)) ? r : t[e]
        },
        propHooks: {
            tabIndex: {
                get: function(t) {
                    return t.hasAttribute("tabindex") || un.test(t.nodeName) || t.href ? t.tabIndex : -1
                }
            }
        }
    }), K.optSelected || (te.propHooks.selected = {
        get: function(t) {
            var e = t.parentNode;
            return e && e.parentNode && e.parentNode.selectedIndex, null
        }
    }), te.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function() {
        te.propFix[this.toLowerCase()] = this
    });
    var ln = /[\t\r\n\f]/g;
    te.fn.extend({
        addClass: function(t) {
            var e, n, r, i, o, a, s = "string" == typeof t && t,
                u = 0,
                l = this.length;
            if (te.isFunction(t)) return this.each(function(e) {
                te(this).addClass(t.call(this, e, this.className))
            });
            if (s)
                for (e = (t || "").match(pe) || []; l > u; u++)
                    if (n = this[u], r = 1 === n.nodeType && (n.className ? (" " + n.className + " ").replace(ln, " ") : " ")) {
                        for (o = 0; i = e[o++];) r.indexOf(" " + i + " ") < 0 && (r += i + " ");
                        a = te.trim(r), n.className !== a && (n.className = a)
                    }
            return this
        },
        removeClass: function(t) {
            var e, n, r, i, o, a, s = 0 === arguments.length || "string" == typeof t && t,
                u = 0,
                l = this.length;
            if (te.isFunction(t)) return this.each(function(e) {
                te(this).removeClass(t.call(this, e, this.className))
            });
            if (s)
                for (e = (t || "").match(pe) || []; l > u; u++)
                    if (n = this[u], r = 1 === n.nodeType && (n.className ? (" " + n.className + " ").replace(ln, " ") : "")) {
                        for (o = 0; i = e[o++];)
                            for (; r.indexOf(" " + i + " ") >= 0;) r = r.replace(" " + i + " ", " ");
                        a = t ? te.trim(r) : "", n.className !== a && (n.className = a)
                    }
            return this
        },
        toggleClass: function(t, e) {
            var n = typeof t;
            return "boolean" == typeof e && "string" === n ? e ? this.addClass(t) : this.removeClass(t) : this.each(te.isFunction(t) ? function(n) {
                te(this).toggleClass(t.call(this, n, this.className, e), e)
            } : function() {
                if ("string" === n)
                    for (var e, r = 0, i = te(this), o = t.match(pe) || []; e = o[r++];) i.hasClass(e) ? i.removeClass(e) : i.addClass(e);
                else(n === Ce || "boolean" === n) && (this.className && ye.set(this, "__className__", this.className), this.className = this.className || t === !1 ? "" : ye.get(this, "__className__") || "")
            })
        },
        hasClass: function(t) {
            for (var e = " " + t + " ", n = 0, r = this.length; r > n; n++)
                if (1 === this[n].nodeType && (" " + this[n].className + " ").replace(ln, " ").indexOf(e) >= 0) return !0;
            return !1
        }
    });
    var cn = /\r/g;
    te.fn.extend({
        val: function(t) {
            var e, n, r, i = this[0]; {
                if (arguments.length) return r = te.isFunction(t), this.each(function(n) {
                    var i;
                    1 === this.nodeType && (i = r ? t.call(this, n, te(this).val()) : t, null == i ? i = "" : "number" == typeof i ? i += "" : te.isArray(i) && (i = te.map(i, function(t) {
                        return null == t ? "" : t + ""
                    })), e = te.valHooks[this.type] || te.valHooks[this.nodeName.toLowerCase()], e && "set" in e && void 0 !== e.set(this, i, "value") || (this.value = i))
                });
                if (i) return e = te.valHooks[i.type] || te.valHooks[i.nodeName.toLowerCase()], e && "get" in e && void 0 !== (n = e.get(i, "value")) ? n : (n = i.value, "string" == typeof n ? n.replace(cn, "") : null == n ? "" : n)
            }
        }
    }), te.extend({
        valHooks: {
            option: {
                get: function(t) {
                    var e = te.find.attr(t, "value");
                    return null != e ? e : te.trim(te.text(t))
                }
            },
            select: {
                get: function(t) {
                    for (var e, n, r = t.options, i = t.selectedIndex, o = "select-one" === t.type || 0 > i, a = o ? null : [], s = o ? i + 1 : r.length, u = 0 > i ? s : o ? i : 0; s > u; u++)
                        if (n = r[u], !(!n.selected && u !== i || (K.optDisabled ? n.disabled : null !== n.getAttribute("disabled")) || n.parentNode.disabled && te.nodeName(n.parentNode, "optgroup"))) {
                            if (e = te(n).val(), o) return e;
                            a.push(e)
                        }
                    return a
                },
                set: function(t, e) {
                    for (var n, r, i = t.options, o = te.makeArray(e), a = i.length; a--;) r = i[a], (r.selected = te.inArray(r.value, o) >= 0) && (n = !0);
                    return n || (t.selectedIndex = -1), o
                }
            }
        }
    }), te.each(["radio", "checkbox"], function() {
        te.valHooks[this] = {
            set: function(t, e) {
                return te.isArray(e) ? t.checked = te.inArray(te(t).val(), e) >= 0 : void 0
            }
        }, K.checkOn || (te.valHooks[this].get = function(t) {
            return null === t.getAttribute("value") ? "on" : t.value
        })
    }), te.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function(t, e) {
        te.fn[e] = function(t, n) {
            return arguments.length > 0 ? this.on(e, null, t, n) : this.trigger(e)
        }
    }), te.fn.extend({
        hover: function(t, e) {
            return this.mouseenter(t).mouseleave(e || t)
        },
        bind: function(t, e, n) {
            return this.on(t, null, e, n)
        },
        unbind: function(t, e) {
            return this.off(t, null, e)
        },
        delegate: function(t, e, n, r) {
            return this.on(e, t, n, r)
        },
        undelegate: function(t, e, n) {
            return 1 === arguments.length ? this.off(t, "**") : this.off(e, t || "**", n)
        }
    });
    var fn = te.now(),
        hn = /\?/;
    te.parseJSON = function(t) {
        return JSON.parse(t + "")
    }, te.parseXML = function(t) {
        var e, n;
        if (!t || "string" != typeof t) return null;
        try {
            n = new DOMParser, e = n.parseFromString(t, "text/xml")
        } catch (r) {
            e = void 0
        }
        return (!e || e.getElementsByTagName("parsererror").length) && te.error("Invalid XML: " + t), e
    };
    var dn, pn, gn = /#.*$/,
        mn = /([?&])_=[^&]*/,
        vn = /^(.*?):[ \t]*([^\r\n]*)$/gm,
        yn = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
        bn = /^(?:GET|HEAD)$/,
        xn = /^\/\//,
        wn = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,
        _n = {},
        Mn = {},
        kn = "*/".concat("*");
    try {
        pn = location.href
    } catch (Nn) {
        pn = G.createElement("a"), pn.href = "", pn = pn.href
    }
    dn = wn.exec(pn.toLowerCase()) || [], te.extend({
        active: 0,
        lastModified: {},
        etag: {},
        ajaxSettings: {
            url: pn,
            type: "GET",
            isLocal: yn.test(dn[1]),
            global: !0,
            processData: !0,
            async: !0,
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            accepts: {
                "*": kn,
                text: "text/plain",
                html: "text/html",
                xml: "application/xml, text/xml",
                json: "application/json, text/javascript"
            },
            contents: {
                xml: /xml/,
                html: /html/,
                json: /json/
            },
            responseFields: {
                xml: "responseXML",
                text: "responseText",
                json: "responseJSON"
            },
            converters: {
                "* text": String,
                "text html": !0,
                "text json": te.parseJSON,
                "text xml": te.parseXML
            },
            flatOptions: {
                url: !0,
                context: !0
            }
        },
        ajaxSetup: function(t, e) {
            return e ? I(I(t, te.ajaxSettings), e) : I(te.ajaxSettings, t)
        },
        ajaxPrefilter: R(_n),
        ajaxTransport: R(Mn),
        ajax: function(t, e) {
            function n(t, e, n, a) {
                var u, c, v, y, x, _ = e;
                2 !== b && (b = 2, s && clearTimeout(s), r = void 0, o = a || "", w.readyState = t > 0 ? 4 : 0, u = t >= 200 && 300 > t || 304 === t, n && (y = B(f, w, n)), y = O(f, y, w, u), u ? (f.ifModified && (x = w.getResponseHeader("Last-Modified"), x && (te.lastModified[i] = x), x = w.getResponseHeader("etag"), x && (te.etag[i] = x)), 204 === t || "HEAD" === f.type ? _ = "nocontent" : 304 === t ? _ = "notmodified" : (_ = y.state, c = y.data, v = y.error, u = !v)) : (v = _, (t || !_) && (_ = "error", 0 > t && (t = 0))), w.status = t, w.statusText = (e || _) + "", u ? p.resolveWith(h, [c, _, w]) : p.rejectWith(h, [w, _, v]), w.statusCode(m), m = void 0, l && d.trigger(u ? "ajaxSuccess" : "ajaxError", [w, f, u ? c : v]), g.fireWith(h, [w, _]), l && (d.trigger("ajaxComplete", [w, f]), --te.active || te.event.trigger("ajaxStop")))
            }
            "object" == typeof t && (e = t, t = void 0), e = e || {};
            var r, i, o, a, s, u, l, c, f = te.ajaxSetup({}, e),
                h = f.context || f,
                d = f.context && (h.nodeType || h.jquery) ? te(h) : te.event,
                p = te.Deferred(),
                g = te.Callbacks("once memory"),
                m = f.statusCode || {},
                v = {},
                y = {},
                b = 0,
                x = "canceled",
                w = {
                    readyState: 0,
                    getResponseHeader: function(t) {
                        var e;
                        if (2 === b) {
                            if (!a)
                                for (a = {}; e = vn.exec(o);) a[e[1].toLowerCase()] = e[2];
                            e = a[t.toLowerCase()]
                        }
                        return null == e ? null : e
                    },
                    getAllResponseHeaders: function() {
                        return 2 === b ? o : null
                    },
                    setRequestHeader: function(t, e) {
                        var n = t.toLowerCase();
                        return b || (t = y[n] = y[n] || t, v[t] = e), this
                    },
                    overrideMimeType: function(t) {
                        return b || (f.mimeType = t), this
                    },
                    statusCode: function(t) {
                        var e;
                        if (t)
                            if (2 > b)
                                for (e in t) m[e] = [m[e], t[e]];
                            else w.always(t[w.status]);
                        return this
                    },
                    abort: function(t) {
                        var e = t || x;
                        return r && r.abort(e), n(0, e), this
                    }
                };
            if (p.promise(w).complete = g.add, w.success = w.done, w.error = w.fail, f.url = ((t || f.url || pn) + "").replace(gn, "").replace(xn, dn[1] + "//"), f.type = e.method || e.type || f.method || f.type, f.dataTypes = te.trim(f.dataType || "*").toLowerCase().match(pe) || [""], null == f.crossDomain && (u = wn.exec(f.url.toLowerCase()), f.crossDomain = !(!u || u[1] === dn[1] && u[2] === dn[2] && (u[3] || ("http:" === u[1] ? "80" : "443")) === (dn[3] || ("http:" === dn[1] ? "80" : "443")))), f.data && f.processData && "string" != typeof f.data && (f.data = te.param(f.data, f.traditional)), z(_n, f, e, w), 2 === b) return w;
            l = f.global, l && 0 === te.active++ && te.event.trigger("ajaxStart"), f.type = f.type.toUpperCase(), f.hasContent = !bn.test(f.type), i = f.url, f.hasContent || (f.data && (i = f.url += (hn.test(i) ? "&" : "?") + f.data, delete f.data), f.cache === !1 && (f.url = mn.test(i) ? i.replace(mn, "$1_=" + fn++) : i + (hn.test(i) ? "&" : "?") + "_=" + fn++)), f.ifModified && (te.lastModified[i] && w.setRequestHeader("If-Modified-Since", te.lastModified[i]), te.etag[i] && w.setRequestHeader("If-None-Match", te.etag[i])), (f.data && f.hasContent && f.contentType !== !1 || e.contentType) && w.setRequestHeader("Content-Type", f.contentType), w.setRequestHeader("Accept", f.dataTypes[0] && f.accepts[f.dataTypes[0]] ? f.accepts[f.dataTypes[0]] + ("*" !== f.dataTypes[0] ? ", " + kn + "; q=0.01" : "") : f.accepts["*"]);
            for (c in f.headers) w.setRequestHeader(c, f.headers[c]);
            if (f.beforeSend && (f.beforeSend.call(h, w, f) === !1 || 2 === b)) return w.abort();
            x = "abort";
            for (c in {
                    success: 1,
                    error: 1,
                    complete: 1
                }) w[c](f[c]);
            if (r = z(Mn, f, e, w)) {
                w.readyState = 1, l && d.trigger("ajaxSend", [w, f]), f.async && f.timeout > 0 && (s = setTimeout(function() {
                    w.abort("timeout")
                }, f.timeout));
                try {
                    b = 1, r.send(v, n)
                } catch (_) {
                    if (!(2 > b)) throw _;
                    n(-1, _)
                }
            } else n(-1, "No Transport");
            return w
        },
        getJSON: function(t, e, n) {
            return te.get(t, e, n, "json")
        },
        getScript: function(t, e) {
            return te.get(t, void 0, e, "script")
        }
    }), te.each(["get", "post"], function(t, e) {
        te[e] = function(t, n, r, i) {
            return te.isFunction(n) && (i = i || r, r = n, n = void 0), te.ajax({
                url: t,
                type: e,
                dataType: i,
                data: n,
                success: r
            })
        }
    }), te.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function(t, e) {
        te.fn[e] = function(t) {
            return this.on(e, t)
        }
    }), te._evalUrl = function(t) {
        return te.ajax({
            url: t,
            type: "GET",
            dataType: "script",
            async: !1,
            global: !1,
            "throws": !0
        })
    }, te.fn.extend({
        wrapAll: function(t) {
            var e;
            return te.isFunction(t) ? this.each(function(e) {
                te(this).wrapAll(t.call(this, e))
            }) : (this[0] && (e = te(t, this[0].ownerDocument).eq(0).clone(!0), this[0].parentNode && e.insertBefore(this[0]), e.map(function() {
                for (var t = this; t.firstElementChild;) t = t.firstElementChild;
                return t
            }).append(this)), this)
        },
        wrapInner: function(t) {
            return this.each(te.isFunction(t) ? function(e) {
                te(this).wrapInner(t.call(this, e))
            } : function() {
                var e = te(this),
                    n = e.contents();
                n.length ? n.wrapAll(t) : e.append(t)
            })
        },
        wrap: function(t) {
            var e = te.isFunction(t);
            return this.each(function(n) {
                te(this).wrapAll(e ? t.call(this, n) : t)
            })
        },
        unwrap: function() {
            return this.parent().each(function() {
                te.nodeName(this, "body") || te(this).replaceWith(this.childNodes)
            }).end()
        }
    }), te.expr.filters.hidden = function(t) {
        return t.offsetWidth <= 0 && t.offsetHeight <= 0
    }, te.expr.filters.visible = function(t) {
        return !te.expr.filters.hidden(t)
    };
    var Cn = /%20/g,
        En = /\[\]$/,
        Sn = /\r?\n/g,
        Tn = /^(?:submit|button|image|reset|file)$/i,
        An = /^(?:input|select|textarea|keygen)/i;
    te.param = function(t, e) {
        var n, r = [],
            i = function(t, e) {
                e = te.isFunction(e) ? e() : null == e ? "" : e, r[r.length] = encodeURIComponent(t) + "=" + encodeURIComponent(e)
            };
        if (void 0 === e && (e = te.ajaxSettings && te.ajaxSettings.traditional), te.isArray(t) || t.jquery && !te.isPlainObject(t)) te.each(t, function() {
            i(this.name, this.value)
        });
        else
            for (n in t) P(n, t[n], e, i);
        return r.join("&").replace(Cn, "+")
    }, te.fn.extend({
        serialize: function() {
            return te.param(this.serializeArray())
        },
        serializeArray: function() {
            return this.map(function() {
                var t = te.prop(this, "elements");
                return t ? te.makeArray(t) : this
            }).filter(function() {
                var t = this.type;
                return this.name && !te(this).is(":disabled") && An.test(this.nodeName) && !Tn.test(t) && (this.checked || !Ne.test(t))
            }).map(function(t, e) {
                var n = te(this).val();
                return null == n ? null : te.isArray(n) ? te.map(n, function(t) {
                    return {
                        name: e.name,
                        value: t.replace(Sn, "\r\n")
                    }
                }) : {
                    name: e.name,
                    value: n.replace(Sn, "\r\n")
                }
            }).get()
        }
    }), te.ajaxSettings.xhr = function() {
        try {
            return new XMLHttpRequest
        } catch (t) {}
    };
    var $n = 0,
        Ln = {},
        jn = {
            0: 200,
            1223: 204
        },
        Dn = te.ajaxSettings.xhr();
    t.ActiveXObject && te(t).on("unload", function() {
        for (var t in Ln) Ln[t]()
    }), K.cors = !!Dn && "withCredentials" in Dn, K.ajax = Dn = !!Dn, te.ajaxTransport(function(t) {
        var e;
        return K.cors || Dn && !t.crossDomain ? {
            send: function(n, r) {
                var i, o = t.xhr(),
                    a = ++$n;
                if (o.open(t.type, t.url, t.async, t.username, t.password), t.xhrFields)
                    for (i in t.xhrFields) o[i] = t.xhrFields[i];
                t.mimeType && o.overrideMimeType && o.overrideMimeType(t.mimeType), t.crossDomain || n["X-Requested-With"] || (n["X-Requested-With"] = "XMLHttpRequest");
                for (i in n) o.setRequestHeader(i, n[i]);
                e = function(t) {
                    return function() {
                        e && (delete Ln[a], e = o.onload = o.onerror = null, "abort" === t ? o.abort() : "error" === t ? r(o.status, o.statusText) : r(jn[o.status] || o.status, o.statusText, "string" == typeof o.responseText ? {
                            text: o.responseText
                        } : void 0, o.getAllResponseHeaders()))
                    }
                }, o.onload = e(), o.onerror = e("error"), e = Ln[a] = e("abort");
                try {
                    o.send(t.hasContent && t.data || null)
                } catch (s) {
                    if (e) throw s
                }
            },
            abort: function() {
                e && e()
            }
        } : void 0
    }), te.ajaxSetup({
        accepts: {
            script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
        },
        contents: {
            script: /(?:java|ecma)script/
        },
        converters: {
            "text script": function(t) {
                return te.globalEval(t), t
            }
        }
    }), te.ajaxPrefilter("script", function(t) {
        void 0 === t.cache && (t.cache = !1), t.crossDomain && (t.type = "GET")
    }), te.ajaxTransport("script", function(t) {
        if (t.crossDomain) {
            var e, n;
            return {
                send: function(r, i) {
                    e = te("<script>").prop({
                        async: !0,
                        charset: t.scriptCharset,
                        src: t.url
                    }).on("load error", n = function(t) {
                        e.remove(), n = null, t && i("error" === t.type ? 404 : 200, t.type)
                    }), G.head.appendChild(e[0])
                },
                abort: function() {
                    n && n()
                }
            }
        }
    });
    var qn = [],
        Rn = /(=)\?(?=&|$)|\?\?/;
    te.ajaxSetup({
        jsonp: "callback",
        jsonpCallback: function() {
            var t = qn.pop() || te.expando + "_" + fn++;
            return this[t] = !0, t
        }
    }), te.ajaxPrefilter("json jsonp", function(e, n, r) {
        var i, o, a, s = e.jsonp !== !1 && (Rn.test(e.url) ? "url" : "string" == typeof e.data && !(e.contentType || "").indexOf("application/x-www-form-urlencoded") && Rn.test(e.data) && "data");
        return s || "jsonp" === e.dataTypes[0] ? (i = e.jsonpCallback = te.isFunction(e.jsonpCallback) ? e.jsonpCallback() : e.jsonpCallback, s ? e[s] = e[s].replace(Rn, "$1" + i) : e.jsonp !== !1 && (e.url += (hn.test(e.url) ? "&" : "?") + e.jsonp + "=" + i), e.converters["script json"] = function() {
            return a || te.error(i + " was not called"), a[0]
        }, e.dataTypes[0] = "json", o = t[i], t[i] = function() {
            a = arguments
        }, r.always(function() {
            t[i] = o, e[i] && (e.jsonpCallback = n.jsonpCallback, qn.push(i)), a && te.isFunction(o) && o(a[0]), a = o = void 0
        }), "script") : void 0
    }), te.parseHTML = function(t, e, n) {
        if (!t || "string" != typeof t) return null;
        "boolean" == typeof e && (n = e, e = !1), e = e || G;
        var r = se.exec(t),
            i = !n && [];
        return r ? [e.createElement(r[1])] : (r = te.buildFragment([t], e, i), i && i.length && te(i).remove(), te.merge([], r.childNodes))
    };
    var zn = te.fn.load;
    te.fn.load = function(t, e, n) {
        if ("string" != typeof t && zn) return zn.apply(this, arguments);
        var r, i, o, a = this,
            s = t.indexOf(" ");
        return s >= 0 && (r = te.trim(t.slice(s)), t = t.slice(0, s)), te.isFunction(e) ? (n = e, e = void 0) : e && "object" == typeof e && (i = "POST"), a.length > 0 && te.ajax({
            url: t,
            type: i,
            dataType: "html",
            data: e
        }).done(function(t) {
            o = arguments, a.html(r ? te("<div>").append(te.parseHTML(t)).find(r) : t)
        }).complete(n && function(t, e) {
            a.each(n, o || [t.responseText, e, t])
        }), this
    }, te.expr.filters.animated = function(t) {
        return te.grep(te.timers, function(e) {
            return t === e.elem
        }).length
    };
    var In = t.document.documentElement;
    te.offset = {
        setOffset: function(t, e, n) {
            var r, i, o, a, s, u, l, c = te.css(t, "position"),
                f = te(t),
                h = {};
            "static" === c && (t.style.position = "relative"), s = f.offset(), o = te.css(t, "top"), u = te.css(t, "left"), l = ("absolute" === c || "fixed" === c) && (o + u).indexOf("auto") > -1, l ? (r = f.position(), a = r.top, i = r.left) : (a = parseFloat(o) || 0, i = parseFloat(u) || 0), te.isFunction(e) && (e = e.call(t, n, s)), null != e.top && (h.top = e.top - s.top + a), null != e.left && (h.left = e.left - s.left + i), "using" in e ? e.using.call(t, h) : f.css(h)
        }
    }, te.fn.extend({
        offset: function(t) {
            if (arguments.length) return void 0 === t ? this : this.each(function(e) {
                te.offset.setOffset(this, t, e)
            });
            var e, n, r = this[0],
                i = {
                    top: 0,
                    left: 0
                },
                o = r && r.ownerDocument;
            if (o) return e = o.documentElement, te.contains(e, r) ? (typeof r.getBoundingClientRect !== Ce && (i = r.getBoundingClientRect()), n = H(o), {
                top: i.top + n.pageYOffset - e.clientTop,
                left: i.left + n.pageXOffset - e.clientLeft
            }) : i
        },
        position: function() {
            if (this[0]) {
                var t, e, n = this[0],
                    r = {
                        top: 0,
                        left: 0
                    };
                return "fixed" === te.css(n, "position") ? e = n.getBoundingClientRect() : (t = this.offsetParent(), e = this.offset(), te.nodeName(t[0], "html") || (r = t.offset()), r.top += te.css(t[0], "borderTopWidth", !0), r.left += te.css(t[0], "borderLeftWidth", !0)), {
                    top: e.top - r.top - te.css(n, "marginTop", !0),
                    left: e.left - r.left - te.css(n, "marginLeft", !0)
                }
            }
        },
        offsetParent: function() {
            return this.map(function() {
                for (var t = this.offsetParent || In; t && !te.nodeName(t, "html") && "static" === te.css(t, "position");) t = t.offsetParent;
                return t || In
            })
        }
    }), te.each({
        scrollLeft: "pageXOffset",
        scrollTop: "pageYOffset"
    }, function(e, n) {
        var r = "pageYOffset" === n;
        te.fn[e] = function(i) {
            return ve(this, function(e, i, o) {
                var a = H(e);
                return void 0 === o ? a ? a[n] : e[i] : void(a ? a.scrollTo(r ? t.pageXOffset : o, r ? o : t.pageYOffset) : e[i] = o)
            }, e, i, arguments.length, null)
        }
    }), te.each(["top", "left"], function(t, e) {
        te.cssHooks[e] = _(K.pixelPosition, function(t, n) {
            return n ? (n = w(t, e), Fe.test(n) ? te(t).position()[e] + "px" : n) : void 0
        })
    }), te.each({
        Height: "height",
        Width: "width"
    }, function(t, e) {
        te.each({
            padding: "inner" + t,
            content: e,
            "": "outer" + t
        }, function(n, r) {
            te.fn[r] = function(r, i) {
                var o = arguments.length && (n || "boolean" != typeof r),
                    a = n || (r === !0 || i === !0 ? "margin" : "border");
                return ve(this, function(e, n, r) {
                    var i;
                    return te.isWindow(e) ? e.document.documentElement["client" + t] : 9 === e.nodeType ? (i = e.documentElement, Math.max(e.body["scroll" + t], i["scroll" + t], e.body["offset" + t], i["offset" + t], i["client" + t])) : void 0 === r ? te.css(e, n, a) : te.style(e, n, r, a)
                }, e, o ? r : void 0, o, null)
            }
        })
    }), te.fn.size = function() {
        return this.length
    }, te.fn.andSelf = te.fn.addBack, "function" == typeof define && define.amd && define("jquery", [], function() {
        return te
    });
    var Bn = t.jQuery,
        On = t.$;
    return te.noConflict = function(e) {
        return t.$ === te && (t.$ = On), e && t.jQuery === te && (t.jQuery = Bn), te
    }, typeof e === Ce && (t.jQuery = t.$ = te), te
}), ! function($) {
    var t = '[data-dismiss="alert"]',
        e = function(e) {
            $(e).on("click", t, this.close)
        };
    e.prototype.close = function(t) {
        function e() {
            i.trigger("closed").remove()
        }
        var n = $(this),
            r = n.attr("data-target"),
            i;
        r || (r = n.attr("href"), r = r && r.replace(/.*(?=#[^\s]*$)/, "")), i = $(r), t && t.preventDefault(), i.length || (i = n.hasClass("alert") ? n : n.parent()), i.trigger(t = $.Event("close")), t.isDefaultPrevented() || (i.removeClass("in"), $.support.transition && i.hasClass("fade") ? i.on($.support.transition.end, e) : e())
    };
    var n = $.fn.alert;
    $.fn.alert = function(t) {
        return this.each(function() {
            var n = $(this),
                r = n.data("alert");
            r || n.data("alert", r = new e(this)), "string" == typeof t && r[t].call(n)
        })
    }, $.fn.alert.Constructor = e, $.fn.alert.noConflict = function() {
        return $.fn.alert = n, this
    }, $(document).on("click.alert.data-api", t, e.prototype.close)
}(window.jQuery);
var post_to_url_in_background = function(t) {
        t.preventDefault();
        var e = $(this).attr("href"),
            n = $(this).attr("action");
        "undefined" != typeof e && e !== !1 && $.get(e, function(t, e) {});
        var r = $(this).attr("notification");
        if ("undefined" != typeof r && r !== !1) {
            var r = decodeURIComponent(r),
                i = $("span#dynamicNotification");
            i.html(r)
        }
    },
    multi_link_exploder = function() {
        var t = $(this).siblings("ul.dropdown-menu").children("li");
        t.each(function(t) {
            var e = $(this).children("a").attr("href");
            window.open(e, "_blank")
        })
    };
$(function() {
    $(document.body).on("click", "a.postInBackground", post_to_url_in_background), $("div.objectLinkExploder").on("click", "button:first", multi_link_exploder)
});
var ra_sex2degrees = function(t) {
        t = t.replace(/ /g, ":"), t = t.replace(/h/g, ":"), t = t.replace(/m/g, ":"), t = t.replace(/s/g, "");
        var e = t.split(":"),
            n = 15 * parseInt(e[0], 10),
            r = 15 * parseInt(e[1], 10),
            i = 15 * parseFloat(e[2], 10),
            o = n + r / 60 + i / 3600;
        return o
    },
    dec_sex2degrees = function(t) {
        var e;
        t = t.replace(/ /g, ":"), t = t.replace(/d/g, ":"), t = t.replace(/m/g, ":"), t = t.replace(/s/g, "");
        var n = t.split(":");
        e = "-" == n[0][0] ? -1 : 1;
        var r = parseInt(n[0], 10),
            i = parseInt(n[1], 10),
            o = parseFloat(n[2], 10);
        r = Math.abs(r);
        var a = (r + i / 60 + o / 3600) * e;
        return a
    },
    fade_and_hide = function(t) {
        t.animate({
            opacity: .25
        }, 150), t.delay(600).slideUp(300)
    },
    show_and_unfade = function(t) {
        t.animate({
            opacity: 1
        }, 150), t.delay(600).slideDown(300)
    };
! function($) {
    var t = function(t, e) {
        this.$element = $(t), this.options = $.extend({}, $.fn.collapse.defaults, e), this.options.parent && (this.$parent = $(this.options.parent)), this.options.toggle && this.toggle()
    };
    t.prototype = {
        constructor: t,
        dimension: function() {
            var t = this.$element.hasClass("width");
            return t ? "width" : "height"
        },
        show: function() {
            var t, e, n, r;
            if (!this.transitioning && !this.$element.hasClass("in")) {
                if (t = this.dimension(), e = $.camelCase(["scroll", t].join("-")), n = this.$parent && this.$parent.find("> .accordion-group > .in"), n && n.length) {
                    if (r = n.data("collapse"), r && r.transitioning) return;
                    n.collapse("hide"), r || n.data("collapse", null)
                }
                this.$element[t](0), this.transition("addClass", $.Event("show"), "shown"), $.support.transition && this.$element[t](this.$element[0][e])
            }
        },
        hide: function() {
            var t;
            !this.transitioning && this.$element.hasClass("in") && (t = this.dimension(), this.reset(this.$element[t]()), this.transition("removeClass", $.Event("hide"), "hidden"), this.$element[t](0))
        },
        reset: function(t) {
            var e = this.dimension();
            return this.$element.removeClass("collapse")[e](t || "auto")[0].offsetWidth, this.$element[null !== t ? "addClass" : "removeClass"]("collapse"), this
        },
        transition: function(t, e, n) {
            var r = this,
                i = function() {
                    "show" == e.type && r.reset(), r.transitioning = 0, r.$element.trigger(n)
                };
            this.$element.trigger(e), e.isDefaultPrevented() || (this.transitioning = 1, this.$element[t]("in"), $.support.transition && this.$element.hasClass("collapse") ? this.$element.one($.support.transition.end, i) : i())
        },
        toggle: function() {
            this[this.$element.hasClass("in") ? "hide" : "show"]()
        }
    };
    var e = $.fn.collapse;
    $.fn.collapse = function(e) {
        return this.each(function() {
            var n = $(this),
                r = n.data("collapse"),
                i = $.extend({}, $.fn.collapse.defaults, n.data(), "object" == typeof e && e);
            r || n.data("collapse", r = new t(this, i)), "string" == typeof e && r[e]()
        })
    }, $.fn.collapse.defaults = {
        toggle: !0
    }, $.fn.collapse.Constructor = t, $.fn.collapse.noConflict = function() {
        return $.fn.collapse = e, this
    }, $(document).on("click.collapse.data-api", "[data-toggle=collapse]", function(t) {
        var e = $(this),
            n, r = e.attr("data-target") || t.preventDefault() || (n = e.attr("href")) && n.replace(/.*(?=#[^\s]+$)/, ""),
            i = $(r).data("collapse") ? "toggle" : e.data();
        e[$(r).hasClass("in") ? "addClass" : "removeClass"]("collapsed"), $(r).collapse(i)
    })
}(window.jQuery), ! function($) {
    $(function() {
        $.support.transition = function() {
            var t = function() {
                var t = document.createElement("bootstrap"),
                    e = {
                        WebkitTransition: "webkitTransitionEnd",
                        MozTransition: "transitionend",
                        OTransition: "oTransitionEnd otransitionend",
                        transition: "transitionend"
                    },
                    n;
                for (n in e)
                    if (void 0 !== t.style[n]) return e[n]
            }();
            return t && {
                end: t
            }
        }()
    })
}(window.jQuery), ! function($) {
    var t = function(t, e) {
        this.$element = $(t), this.options = $.extend({}, $.fn.button.defaults, e)
    };
    t.prototype.setState = function(t) {
        var e = "disabled",
            n = this.$element,
            r = n.data(),
            i = n.is("input") ? "val" : "html";
        t += "Text", r.resetText || n.data("resetText", n[i]()), n[i](r[t] || this.options[t]), setTimeout(function() {
            "loadingText" == t ? n.addClass(e).attr(e, e) : n.removeClass(e).removeAttr(e)
        }, 0)
    }, t.prototype.toggle = function() {
        var t = this.$element.closest('[data-toggle="buttons-radio"]');
        t && t.find(".active").removeClass("active"), this.$element.toggleClass("active")
    };
    var e = $.fn.button;
    $.fn.button = function(e) {
        return this.each(function() {
            var n = $(this),
                r = n.data("button"),
                i = "object" == typeof e && e;
            r || n.data("button", r = new t(this, i)), "toggle" == e ? r.toggle() : e && r.setState(e)
        })
    }, $.fn.button.defaults = {
        loadingText: "loading..."
    }, $.fn.button.Constructor = t, $.fn.button.noConflict = function() {
        return $.fn.button = e, this
    }, $(document).on("click.button.data-api", "[data-toggle^=button]", function(t) {
        var e = $(t.target);
        e.hasClass("btn") || (e = e.closest(".btn")), e.button("toggle")
    })
}(window.jQuery), ! function($) {
    function t() {
        $(n).each(function() {
            e($(this)).removeClass("open")
        })
    }

    function e(t) {
        var e = t.attr("data-target"),
            n;
        return e || (e = t.attr("href"), e = e && /#/.test(e) && e.replace(/.*(?=#[^\s]*$)/, "")), n = e && $(e), n && n.length || (n = t.parent()), n
    }
    var n = "[data-toggle=dropdown]",
        r = function(t) {
            var e = $(t).on("click.dropdown.data-api", this.toggle);
            $("html").on("click.dropdown.data-api", function() {
                e.closest(":not(span)").removeClass("open")
            })
        };
    r.prototype = {
        constructor: r,
        toggle: function(n) {
            var r = $(this),
                i, o;
            if (!r.is(".disabled, :disabled")) return i = e(r), o = i.hasClass("open"), t(), o || i.toggleClass("open"), r.focus(), !1
        },
        keydown: function(t) {
            var r, i, o, a, s, u;
            if (/(38|40|27)/.test(t.keyCode) && (r = $(this), t.preventDefault(), t.stopPropagation(), !r.is(".disabled, :disabled"))) {
                if (a = e(r), s = a.hasClass("open"), !s || s && 27 == t.keyCode) return 27 == t.which && a.find(n).focus(), r.click();
                i = $("[role=menu] li:not(.divider):visible a", a), i.length && (u = i.index(i.filter(":focus")), 38 == t.keyCode && u > 0 && u--, 40 == t.keyCode && u < i.length - 1 && u++, ~u || (u = 0), i.eq(u).focus())
            }
        }
    };
    var i = $.fn.dropdown;
    $.fn.dropdown = function(t) {
        return this.each(function() {
            var e = $(this),
                n = e.data("dropdown");
            n || e.data("dropdown", n = new r(this)), "string" == typeof t && n[t].call(e)
        })
    }, $.fn.dropdown.Constructor = r, $.fn.dropdown.noConflict = function() {
        return $.fn.dropdown = i, this
    }, $(document).on("click.dropdown.data-api", t).on("click.dropdown.data-api", ".dropdown form", function(t) {
        t.stopPropagation()
    }).on("click.dropdown-menu", function(t) {
        t.stopPropagation()
    }).on("click.dropdown.data-api", n, r.prototype.toggle).on("keydown.dropdown.data-api", n + ", [role=menu]", r.prototype.keydown)
}(window.jQuery);
var _markdownwiki_move_page_form = function() {
        var t = $("form[action*='change_parent_id_of_md_page']"),
            e = t.find("select[branch=0]"),
            n = e.closest("div.control-group"),
            r = void 0,
            i = void 0,
            o = void 0,
            a = void 0,
            s = void 0,
            u = void 0,
            l = void 0,
            c = void 0,
            f = new Array,
            h = "";
        t.on("change", "select[branch]", function() {
            r = $(this).attr("branch"), $(this).attr("name", "parentId"), parentId = $(this).find("option:selected").attr("value"), u = $(this).find("option:selected").text(), $("select[branch]").each(function(t) {
                $(this).attr("branch") > r && (console.log("this branch > last. branch no: " + $(this).attr("branch")), $(this).closest(".controls").fadeOut(200, function() {
                    $(this).remove()
                }))
            }), $("p.textAlert").fadeOut(200, function() {
                $("p.textAlert").remove()
            }), o = "select distinct title, pageId from base_md_pages where pageId in (select * from (select distinct pageId from base_md_pages where parentPageId = " + parentId + ") as alais) order by pageId, revisionNumber desc;", o = encodeURIComponent(o), h = window.location.toString();
            var n = h.split("/apollo/");
            n.length > 1 ? h = "/apollo/assets/scripts/dryxScripts/sql_to_json.py?sqlQuery=" : (h = "/assets/scripts/dryxScripts/sql_to_json.py?sqlQuery=", console.log("window.location: " + window.location)), a = $.ajax({
                url: h + o,
                success: function(n) {
                    0 === n.length ? (text = '<p class="textAlert text-center text-info"><em>`' + u + "`</em> has no sub-pages</p>", t.append(text), $("p.textAlert").hide().fadeIn(200)) : (l = e.closest(".control-group").clone(), l.find(".control-label").remove(), i = l.find("select[branch]"), i.html(""), i.attr("branch", r + 1).hide().fadeIn(200), i.attr("name", "unselected"), thisOption = '<option value="none">select a sub-page</option>', i.append(thisOption), f = [], $.each(n, function(t, e) {
                        -1 === $.inArray(n[t].pageId, f) ? (thisOption = '<option value="' + n[t].pageId + '">' + n[t].title + "</option>", i.append(thisOption), f.push(n[t].pageId), console.log("pageId: " + n[t].pageId)) : console.log("nope!: " + n[t].pageId)
                    }), t.append(l))
                }
            })
        })
    }(),
    _no_project_status_selection_form = function() {
        var t = $("a.projectStatus");
        return t.bind("click", function(t) {
            var e = $(this).closest("tr");
            fade_and_hide(e)
        }), {}
    }();
! function($) {
    var t = function(t, e) {
        this.$element = $(t), this.options = $.extend({}, $.fn.typeahead.defaults, e), this.matcher = this.options.matcher || this.matcher, this.sorter = this.options.sorter || this.sorter, this.highlighter = this.options.highlighter || this.highlighter, this.updater = this.options.updater || this.updater, this.source = this.options.source, this.$menu = $(this.options.menu), this.shown = !1, this.listen()
    };
    t.prototype = {
        constructor: t,
        select: function() {
            var t = this.$menu.find(".active").attr("data-value");
            return this.$element.val(this.updater(t)).change(), this.hide()
        },
        updater: function(t) {
            return t
        },
        show: function() {
            var t = $.extend({}, this.$element.position(), {
                height: this.$element[0].offsetHeight
            });
            return this.$menu.insertAfter(this.$element).css({
                top: t.top + t.height,
                left: t.left
            }).show(), this.shown = !0, this
        },
        hide: function() {
            return this.$menu.hide(), this.shown = !1, this
        },
        lookup: function(t) {
            var e;
            return this.query = this.$element.val(), !this.query || this.query.length < this.options.minLength ? this.shown ? this.hide() : this : (e = $.isFunction(this.source) ? this.source(this.query, $.proxy(this.process, this)) : this.source, e ? this.process(e) : this)
        },
        process: function(t) {
            var e = this;
            return t = $.grep(t, function(t) {
                return e.matcher(t)
            }), t = this.sorter(t), t.length ? this.render(t.slice(0, this.options.items)).show() : this.shown ? this.hide() : this
        },
        matcher: function(t) {
            return ~t.toLowerCase().indexOf(this.query.toLowerCase())
        },
        sorter: function(t) {
            for (var e = [], n = [], r = [], i; i = t.shift();) i.toLowerCase().indexOf(this.query.toLowerCase()) ? ~i.indexOf(this.query) ? n.push(i) : r.push(i) : e.push(i);
            return e.concat(n, r)
        },
        highlighter: function(t) {
            var e = this.query.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&");
            return t.replace(new RegExp("(" + e + ")", "ig"), function(t, e) {
                return "<strong>" + e + "</strong>"
            })
        },
        render: function(t) {
            var e = this;
            return t = $(t).map(function(t, n) {
                return t = $(e.options.item).attr("data-value", n), t.find("a").html(e.highlighter(n)), t[0]
            }), t.first().addClass("active"), this.$menu.html(t), this
        },
        next: function(t) {
            var e = this.$menu.find(".active").removeClass("active"),
                n = e.next();
            n.length || (n = $(this.$menu.find("li")[0])), n.addClass("active")
        },
        prev: function(t) {
            var e = this.$menu.find(".active").removeClass("active"),
                n = e.prev();
            n.length || (n = this.$menu.find("li").last()), n.addClass("active")
        },
        listen: function() {
            this.$element.on("focus", $.proxy(this.focus, this)).on("blur", $.proxy(this.blur, this)).on("keypress", $.proxy(this.keypress, this)).on("keyup", $.proxy(this.keyup, this)), this.eventSupported("keydown") && this.$element.on("keydown", $.proxy(this.keydown, this)), this.$menu.on("click", $.proxy(this.click, this)).on("mouseenter", "li", $.proxy(this.mouseenter, this)).on("mouseleave", "li", $.proxy(this.mouseleave, this))
        },
        eventSupported: function(t) {
            var e = t in this.$element;
            return e || (this.$element.setAttribute(t, "return;"), e = "function" == typeof this.$element[t]), e
        },
        move: function(t) {
            if (this.shown) {
                switch (t.keyCode) {
                    case 9:
                    case 13:
                    case 27:
                        t.preventDefault();
                        break;
                    case 38:
                        t.preventDefault(), this.prev();
                        break;
                    case 40:
                        t.preventDefault(), this.next()
                }
                t.stopPropagation()
            }
        },
        keydown: function(t) {
            this.suppressKeyPressRepeat = ~$.inArray(t.keyCode, [40, 38, 9, 13, 27]), this.move(t)
        },
        keypress: function(t) {
            this.suppressKeyPressRepeat || this.move(t)
        },
        keyup: function(t) {
            switch (t.keyCode) {
                case 40:
                case 38:
                case 16:
                case 17:
                case 18:
                    break;
                case 9:
                case 13:
                    if (!this.shown) return;
                    this.select();
                    break;
                case 27:
                    if (!this.shown) return;
                    this.hide();
                    break;
                default:
                    this.lookup()
            }
            t.stopPropagation(), t.preventDefault()
        },
        focus: function(t) {
            this.focused = !0
        },
        blur: function(t) {
            this.focused = !1, !this.mousedover && this.shown && this.hide()
        },
        click: function(t) {
            t.stopPropagation(), t.preventDefault(), this.select(), this.$element.focus()
        },
        mouseenter: function(t) {
            this.mousedover = !0, this.$menu.find(".active").removeClass("active"), $(t.currentTarget).addClass("active")
        },
        mouseleave: function(t) {
            this.mousedover = !1, !this.focused && this.shown && this.hide()
        }
    };
    var e = $.fn.typeahead;
    $.fn.typeahead = function(e) {
        return this.each(function() {
            var n = $(this),
                r = n.data("typeahead"),
                i = "object" == typeof e && e;
            r || n.data("typeahead", r = new t(this, i)), "string" == typeof e && r[e]()
        })
    }, $.fn.typeahead.defaults = {
        source: [],
        items: 8,
        menu: '<ul class="typeahead dropdown-menu"></ul>',
        item: '<li><a href="#"></a></li>',
        minLength: 1
    }, $.fn.typeahead.Constructor = t, $.fn.typeahead.noConflict = function() {
        return $.fn.typeahead = e, this
    }, $(document).on("focus.typeahead.data-api", '[data-provide="typeahead"]', function(t) {
        var e = $(this);
        e.data("typeahead") || e.typeahead(e.data())
    })
}(window.jQuery), ! function($) {
    var t = function(t, e) {
        this.$element = $(t), this.$indicators = this.$element.find(".carousel-indicators"), this.options = e, "hover" == this.options.pause && this.$element.on("mouseenter", $.proxy(this.pause, this)).on("mouseleave", $.proxy(this.cycle, this))
    };
    t.prototype = {
        cycle: function(t) {
            return t || (this.paused = !1), this.interval && clearInterval(this.interval), this.options.interval && !this.paused && (this.interval = setInterval($.proxy(this.next, this), this.options.interval)), this
        },
        getActiveIndex: function() {
            return this.$active = this.$element.find(".item.active"), this.$items = this.$active.parent().children(), this.$items.index(this.$active)
        },
        to: function(t) {
            var e = this.getActiveIndex(),
                n = this;
            if (!(t > this.$items.length - 1 || 0 > t)) return this.sliding ? this.$element.one("slid", function() {
                n.to(t)
            }) : e == t ? this.pause().cycle() : this.slide(t > e ? "next" : "prev", $(this.$items[t]))
        },
        pause: function(t) {
            return t || (this.paused = !0), this.$element.find(".next, .prev").length && $.support.transition.end && (this.$element.trigger($.support.transition.end), this.cycle(!0)), clearInterval(this.interval), this.interval = null, this
        },
        next: function() {
            return this.sliding ? void 0 : this.slide("next")
        },
        prev: function() {
            return this.sliding ? void 0 : this.slide("prev")
        },
        slide: function(t, e) {
            var n = this.$element.find(".item.active"),
                r = e || n[t](),
                i = this.interval,
                o = "next" == t ? "left" : "right",
                a = "next" == t ? "first" : "last",
                s = this,
                u;
            if (this.sliding = !0, i && this.pause(), r = r.length ? r : this.$element.find(".item")[a](), u = $.Event("slide", {
                    relatedTarget: r[0],
                    direction: o
                }), !r.hasClass("active")) {
                if (this.$indicators.length && (this.$indicators.find(".active").removeClass("active"), this.$element.one("slid", function() {
                        var t = $(s.$indicators.children()[s.getActiveIndex()]);
                        t && t.addClass("active")
                    })), $.support.transition && this.$element.hasClass("slide")) {
                    if (this.$element.trigger(u), u.isDefaultPrevented()) return;
                    r.addClass(t), r[0].offsetWidth, n.addClass(o), r.addClass(o), this.$element.one($.support.transition.end, function() {
                        r.removeClass([t, o].join(" ")).addClass("active"), n.removeClass(["active", o].join(" ")), s.sliding = !1, setTimeout(function() {
                            s.$element.trigger("slid")
                        }, 0)
                    })
                } else {
                    if (this.$element.trigger(u), u.isDefaultPrevented()) return;
                    n.removeClass("active"), r.addClass("active"), this.sliding = !1, this.$element.trigger("slid")
                }
                return i && this.cycle(), this
            }
        }
    };
    var e = $.fn.carousel;
    $.fn.carousel = function(e) {
        return this.each(function() {
            var n = $(this),
                r = n.data("carousel"),
                i = $.extend({}, $.fn.carousel.defaults, "object" == typeof e && e),
                o = "string" == typeof e ? e : i.slide;
            r || n.data("carousel", r = new t(this, i)), "number" == typeof e ? r.to(e) : o ? r[o]() : i.interval && r.pause().cycle()
        })
    }, $.fn.carousel.defaults = {
        interval: 5e3,
        pause: "hover"
    }, $.fn.carousel.Constructor = t, $.fn.carousel.noConflict = function() {
        return $.fn.carousel = e, this
    }, $(document).on("click.carousel.data-api", "[data-slide], [data-slide-to]", function(t) {
        var e = $(this),
            n, r = $(e.attr("data-target") || (n = e.attr("href")) && n.replace(/.*(?=#[^\s]+$)/, "")),
            i = $.extend({}, r.data(), e.data()),
            o;
        r.carousel(i), (o = e.attr("data-slide-to")) && r.data("carousel").pause().to(o).cycle(), t.preventDefault()
    })
}(window.jQuery), ! function($) {
    var t = function(t, e) {
        this.options = $.extend({}, $.fn.affix.defaults, e), this.$window = $(window).on("scroll.affix.data-api", $.proxy(this.checkPosition, this)).on("click.affix.data-api", $.proxy(function() {
            setTimeout($.proxy(this.checkPosition, this), 1)
        }, this)), this.$element = $(t), this.checkPosition()
    };
    t.prototype.checkPosition = function() {
        if (this.$element.is(":visible")) {
            var t = $(document).height(),
                e = this.$window.scrollTop(),
                n = this.$element.offset(),
                r = this.options.offset,
                i = r.bottom,
                o = r.top,
                a = "affix affix-top affix-bottom",
                s;
            "object" != typeof r && (i = o = r), "function" == typeof o && (o = r.top()), "function" == typeof i && (i = r.bottom()), s = null != this.unpin && e + this.unpin <= n.top ? !1 : null != i && n.top + this.$element.height() >= t - i ? "bottom" : null != o && o >= e ? "top" : !1, this.affixed !== s && (this.affixed = s, this.unpin = "bottom" == s ? n.top - e : null, this.$element.removeClass(a).addClass("affix" + (s ? "-" + s : "")))
        }
    };
    var e = $.fn.affix;
    $.fn.affix = function(e) {
        return this.each(function() {
            var n = $(this),
                r = n.data("affix"),
                i = "object" == typeof e && e;
            r || n.data("affix", r = new t(this, i)), "string" == typeof e && r[e]()
        })
    }, $.fn.affix.Constructor = t, $.fn.affix.defaults = {
        offset: 0
    }, $.fn.affix.noConflict = function() {
        return $.fn.affix = e, this
    }, $(window).on("load", function() {
        $('[data-spy="affix"]').each(function() {
            var t = $(this),
                e = t.data();
            e.offset = e.offset || {}, e.offsetBottom && (e.offset.bottom = e.offsetBottom), e.offsetTop && (e.offset.top = e.offsetTop), t.affix(e)
        })
    })
}(window.jQuery), ! function($) {
    function t(t, e) {
        var n = $.proxy(this.process, this),
            r = $($(t).is("body") ? window : t),
            i;
        this.options = $.extend({}, $.fn.scrollspy.defaults, e), this.$scrollElement = r.on("scroll.scroll-spy.data-api", n), this.selector = (this.options.target || (i = $(t).attr("href")) && i.replace(/.*(?=#[^\s]+$)/, "") || "") + " .nav li > a", this.$body = $("body"), this.refresh(), this.process()
    }
    t.prototype = {
        constructor: t,
        refresh: function() {
            var t = this,
                e;
            this.offsets = $([]), this.targets = $([]), e = this.$body.find(this.selector).map(function() {
                var e = $(this),
                    n = e.data("target") || e.attr("href"),
                    r = /^#\w/.test(n) && $(n);
                return r && r.length && [
                    [r.position().top + (!$.isWindow(t.$scrollElement.get(0)) && t.$scrollElement.scrollTop()), n]
                ] || null
            }).sort(function(t, e) {
                return t[0] - e[0]
            }).each(function() {
                t.offsets.push(this[0]), t.targets.push(this[1])
            })
        },
        process: function() {
            var t = this.$scrollElement.scrollTop() + this.options.offset,
                e = this.$scrollElement[0].scrollHeight || this.$body[0].scrollHeight,
                n = e - this.$scrollElement.height(),
                r = this.offsets,
                i = this.targets,
                o = this.activeTarget,
                a;
            if (t >= n) return o != (a = i.last()[0]) && this.activate(a);
            for (a = r.length; a--;) o != i[a] && t >= r[a] && (!r[a + 1] || t <= r[a + 1]) && this.activate(i[a])
        },
        activate: function(t) {
            var e, n;
            this.activeTarget = t, $(this.selector).parent(".active").removeClass("active"), n = this.selector + '[data-target="' + t + '"],' + this.selector + '[href="' + t + '"]', e = $(n).parent("li").addClass("active"), e.parent(".dropdown-menu").length && (e = e.closest("li.dropdown").addClass("active")), e.trigger("activate")
        }
    };
    var e = $.fn.scrollspy;
    $.fn.scrollspy = function(e) {
        return this.each(function() {
            var n = $(this),
                r = n.data("scrollspy"),
                i = "object" == typeof e && e;
            r || n.data("scrollspy", r = new t(this, i)), "string" == typeof e && r[e]()
        })
    }, $.fn.scrollspy.Constructor = t, $.fn.scrollspy.defaults = {
        offset: 10
    }, $.fn.scrollspy.noConflict = function() {
        return $.fn.scrollspy = e, this
    }, $(window).on("load", function() {
        $('[data-spy="scroll"]').each(function() {
            var t = $(this);
            t.scrollspy(t.data())
        })
    })
}(window.jQuery), ! function($) {
    var t = function(t) {
        this.element = $(t)
    };
    t.prototype = {
        constructor: t,
        show: function() {
            var t = this.element,
                e = t.closest("ul:not(.dropdown-menu)"),
                n = t.attr("data-target"),
                r, i, o;
            n || (n = t.attr("href"), n = n && n.replace(/.*(?=#[^\s]*$)/, "")), t.parent("li").hasClass("active") || (r = e.find(".active:last a")[0], o = $.Event("show", {
                relatedTarget: r
            }), t.trigger(o), o.isDefaultPrevented() || (i = $(n), this.activate(t.parent("li"), e), this.activate(i, i.parent(), function() {
                t.trigger({
                    type: "shown",
                    relatedTarget: r
                })
            })))
        },
        activate: function(t, e, n) {
            function r() {
                i.removeClass("active").find("> .dropdown-menu > .active").removeClass("active"), t.addClass("active"), o ? (t[0].offsetWidth, t.addClass("in")) : t.removeClass("fade"), t.parent(".dropdown-menu") && t.closest("li.dropdown").addClass("active"), n && n()
            }
            var i = e.find("> .active"),
                o = n && $.support.transition && i.hasClass("fade");
            o ? i.one($.support.transition.end, r) : r(), i.removeClass("in")
        }
    };
    var e = $.fn.tab;
    $.fn.tab = function(e) {
        return this.each(function() {
            var n = $(this),
                r = n.data("tab");
            r || n.data("tab", r = new t(this)), "string" == typeof e && r[e]()
        })
    }, $.fn.tab.Constructor = t, $.fn.tab.noConflict = function() {
        return $.fn.tab = e, this
    }, $(document).on("click.tab.data-api", '[data-toggle="tab"], [data-toggle="pill"]', function(t) {
        t.preventDefault(), $(this).tab("show")
    })
}(window.jQuery), $(function() {
    var t = $("div#leftSidebar");
    $(window).innerWidth() > 1040 && $(window).innerHeight() > 1.2 * t.height() && $("div#leftSidebar").affix({
        offset: {
            top: 170,
            bottom: 100
        }
    })
});
var submit_modal_forms = function() {
    var t = $("button[formId]"),
        e = void 0,
        n = void 0;
    return t.bind("click", function(t) {
        n = $(this).attr("formId"), e = $("#" + n), e.submit()
    }), {}
}();
! function($) {
    var t = function(t, e) {
        this.options = e, this.$element = $(t).delegate('[data-dismiss="modal"]', "click.dismiss.modal", $.proxy(this.hide, this)), this.options.remote && this.$element.find(".modal-body").load(this.options.remote)
    };
    t.prototype = {
        constructor: t,
        toggle: function() {
            return this[this.isShown ? "hide" : "show"]()
        },
        show: function() {
            var t = this,
                e = $.Event("show");
            this.$element.trigger(e), this.isShown && console.log("this is shown already"), e.isDefaultPrevented() && console.log("event prevented"), this.isShown || e.isDefaultPrevented() || (this.isShown = !0, this.escape(), this.backdrop(function() {
                var e = $.support.transition && t.$element.hasClass("fade");
                t.$element.parent().length || t.$element.appendTo(document.body), t.$element.show(), e && t.$element[0].offsetWidth, t.$element.addClass("in").attr("aria-hidden", !1), t.enforceFocus(), e ? t.$element.one($.support.transition.end, function() {
                    t.$element.focus().trigger("shown")
                }) : t.$element.focus().trigger("shown")
            }))
        },
        hide: function(t) {
            t && t.preventDefault();
            var e = this;
            t = $.Event("hide"), this.$element.trigger(t), this.isShown && !t.isDefaultPrevented() && (this.isShown = !1, this.escape(), $(document).off("focusin.modal"), this.$element.removeClass("in").attr("aria-hidden", !0), $.support.transition && this.$element.hasClass("fade") ? this.hideWithTransition() : this.hideModal())
        },
        enforceFocus: function() {
            var t = this;
            $(document).on("focusin.modal", function(e) {
                t.$element[0] === e.target || t.$element.has(e.target).length || t.$element.focus()
            })
        },
        escape: function() {
            var t = this;
            this.isShown && this.options.keyboard ? this.$element.on("keyup.dismiss.modal", function(e) {
                27 == e.which && t.hide()
            }) : this.isShown || this.$element.off("keyup.dismiss.modal")
        },
        hideWithTransition: function() {
            var t = this,
                e = setTimeout(function() {
                    t.$element.off($.support.transition.end), t.hideModal()
                }, 500);
            this.$element.one($.support.transition.end, function() {
                clearTimeout(e), t.hideModal()
            })
        },
        hideModal: function() {
            var t = this;
            this.$element.hide(), this.backdrop(function() {
                t.removeBackdrop(), t.$element.trigger("hidden")
            })
        },
        removeBackdrop: function() {
            this.$backdrop && this.$backdrop.remove(), this.$backdrop = null
        },
        backdrop: function(t) {
            var e = this,
                n = this.$element.hasClass("fade") ? "fade" : "";
            if (this.isShown && this.options.backdrop) {
                var r = $.support.transition && n;
                if (this.$backdrop = $('<div class="modal-backdrop ' + n + '" />').appendTo(document.body), this.$backdrop.click("static" == this.options.backdrop ? $.proxy(this.$element[0].focus, this.$element[0]) : $.proxy(this.hide, this)), r && this.$backdrop[0].offsetWidth, this.$backdrop.addClass("in"), !t) return;
                r ? this.$backdrop.one($.support.transition.end, t) : t()
            } else !this.isShown && this.$backdrop ? (this.$backdrop.removeClass("in"), $.support.transition && this.$element.hasClass("fade") ? this.$backdrop.one($.support.transition.end, t) : t()) : t && t()
        }
    };
    var e = $.fn.modal;
    $.fn.modal = function(e) {
        return this.each(function() {
            var n = $(this),
                r = n.data("modal"),
                i = $.extend({}, $.fn.modal.defaults, n.data(), "object" == typeof e && e);
            r || n.data("modal", r = new t(this, i)), "string" == typeof e ? r[e]() : i.show && r.show()
        })
    }, $.fn.modal.defaults = {
        backdrop: !0,
        keyboard: !0,
        show: !0
    }, $.fn.modal.Constructor = t, $.fn.modal.noConflict = function() {
        return $.fn.modal = e, this
    }, $(document).on("click.modal.data-api", '[data-toggle="modal"]', function(t) {
        var e = $(this),
            n = e.attr("href"),
            r = $(e.attr("data-target") || n && n.replace(/.*(?=#[^\s]+$)/, "")),
            i = r.data("modal") ? "toggle" : $.extend({
                remote: !/#/.test(n) && n
            }, r.data(), e.data());
        t.preventDefault(), r.modal(i).one("hide", function() {
            e.focus()
        })
    })
}(window.jQuery), ! function($) {
    var t = function(t, e) {
        this.init("tooltip", t, e)
    };
    t.prototype = {
        constructor: t,
        init: function(t, e, n) {
            var r, i, o, a, s;
            for (this.type = t, this.$element = $(e), this.options = this.getOptions(n), this.enabled = !0, o = this.options.trigger.split(" "), s = o.length; s--;) a = o[s], "click" == a ? this.$element.on("click." + this.type, this.options.selector, $.proxy(this.toggle, this)) : "manual" != a && (r = "hover" == a ? "mouseenter" : "focus", i = "hover" == a ? "mouseleave" : "blur", this.$element.on(r + "." + this.type, this.options.selector, $.proxy(this.enter, this)), this.$element.on(i + "." + this.type, this.options.selector, $.proxy(this.leave, this)));
            this.options.selector ? this._options = $.extend({}, this.options, {
                trigger: "manual",
                selector: ""
            }) : this.fixTitle()
        },
        getOptions: function(t) {
            return t = $.extend({}, $.fn[this.type].defaults, this.$element.data(), t), t.delay && "number" == typeof t.delay && (t.delay = {
                show: t.delay,
                hide: t.delay
            }), t
        },
        enter: function(t) {
            var e = $.fn[this.type].defaults,
                n = {},
                r;
            return this._options && $.each(this._options, function(t, r) {
                e[t] != r && (n[t] = r)
            }, this), r = $(t.currentTarget)[this.type](n).data(this.type), r.options.delay && r.options.delay.show ? (clearTimeout(this.timeout), r.hoverState = "in", void(this.timeout = setTimeout(function() {
                "in" == r.hoverState && r.show()
            }, r.options.delay.show))) : r.show()
        },
        leave: function(t) {
            var e = $(t.currentTarget)[this.type](this._options).data(this.type);
            return this.timeout && clearTimeout(this.timeout), e.options.delay && e.options.delay.hide ? (e.hoverState = "out", void(this.timeout = setTimeout(function() {
                "out" == e.hoverState && e.hide()
            }, e.options.delay.hide))) : e.hide()
        },
        show: function() {
            var t, e, n, r, i, o, a = $.Event("show");
            if (this.hasContent() && this.enabled) {
                if (this.$element.trigger(a), a.isDefaultPrevented()) return;
                switch (t = this.tip(), this.setContent(), this.options.animation && t.addClass("fade"), i = "function" == typeof this.options.placement ? this.options.placement.call(this, t[0], this.$element[0]) : this.options.placement, t.detach().css({
                    top: 0,
                    left: 0,
                    display: "block"
                }), this.options.container ? t.appendTo(this.options.container) : t.insertBefore(this.$element), e = this.getPosition(), n = t[0].offsetWidth, r = t[0].offsetHeight, i) {
                    case "bottom":
                        o = {
                            top: e.top + e.height,
                            left: e.left + e.width / 2 - n / 2
                        };
                        break;
                    case "top":
                        o = {
                            top: e.top - r,
                            left: e.left + e.width / 2 - n / 2
                        };
                        break;
                    case "left":
                        o = {
                            top: e.top + e.height / 2 - r / 2,
                            left: e.left - n
                        };
                        break;
                    case "right":
                        o = {
                            top: e.top + e.height / 2 - r / 2,
                            left: e.left + e.width
                        }
                }
                this.applyPlacement(o, i), this.$element.trigger("shown")
            }
        },
        applyPlacement: function(t, e) {
            var n = this.tip(),
                r = n[0].offsetWidth,
                i = n[0].offsetHeight,
                o, a, s, u;
            n.offset(t).addClass(e).addClass("in"), o = n[0].offsetWidth, a = n[0].offsetHeight, "top" == e && a != i && (t.top = t.top + i - a, u = !0), "bottom" == e || "top" == e ? (s = 0, t.left < 0 && (s = -2 * t.left, t.left = 0, n.offset(t), o = n[0].offsetWidth, a = n[0].offsetHeight), this.replaceArrow(s - r + o, o, "left")) : this.replaceArrow(a - i, a, "top"), u && n.offset(t)
        },
        replaceArrow: function(t, e, n) {
            this.arrow().css(n, t ? 50 * (1 - t / e) + "%" : "")
        },
        setContent: function() {
            var t = this.tip(),
                e = this.getTitle();
            t.find(".tooltip-inner")[this.options.html ? "html" : "text"](e), t.removeClass("fade in top bottom left right")
        },
        hide: function() {
            function t() {
                var t = setTimeout(function() {
                    n.off($.support.transition.end).detach()
                }, 500);
                n.one($.support.transition.end, function() {
                    clearTimeout(t), n.detach()
                })
            }
            var e = this,
                n = this.tip(),
                r = $.Event("hide");
            return this.$element.trigger(r), r.isDefaultPrevented() ? void 0 : (n.removeClass("in"), $.support.transition && this.$tip.hasClass("fade") ? t() : n.detach(), this.$element.trigger("hidden"), this)
        },
        fixTitle: function() {
            var t = this.$element;
            (t.attr("title") || "string" != typeof t.attr("data-original-title")) && t.attr("data-original-title", t.attr("title") || "").attr("title", "")
        },
        hasContent: function() {
            return this.getTitle()
        },
        getPosition: function() {
            var t = this.$element[0];
            return $.extend({}, "function" == typeof t.getBoundingClientRect ? t.getBoundingClientRect() : {
                width: t.offsetWidth,
                height: t.offsetHeight
            }, this.$element.offset())
        },
        getTitle: function() {
            var t, e = this.$element,
                n = this.options;
            return t = e.attr("data-original-title") || ("function" == typeof n.title ? n.title.call(e[0]) : n.title)
        },
        tip: function() {
            return this.$tip = this.$tip || $(this.options.template)
        },
        arrow: function() {
            return this.$arrow = this.$arrow || this.tip().find(".tooltip-arrow")
        },
        validate: function() {
            this.$element[0].parentNode || (this.hide(), this.$element = null, this.options = null)
        },
        enable: function() {
            this.enabled = !0
        },
        disable: function() {
            this.enabled = !1
        },
        toggleEnabled: function() {
            this.enabled = !this.enabled
        },
        toggle: function(t) {
            var e = t ? $(t.currentTarget)[this.type](this._options).data(this.type) : this;
            e.tip().hasClass("in") ? e.hide() : e.show()
        },
        destroy: function() {
            this.hide().$element.off("." + this.type).removeData(this.type)
        }
    };
    var e = $.fn.tooltip;
    $.fn.tooltip = function(e) {
        return this.each(function() {
            var n = $(this),
                r = n.data("tooltip"),
                i = "object" == typeof e && e;
            r || n.data("tooltip", r = new t(this, i)), "string" == typeof e && r[e]()
        })
    }, $.fn.tooltip.Constructor = t, $.fn.tooltip.defaults = {
        animation: !0,
        placement: "top",
        selector: !1,
        template: '<div class="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
        trigger: "hover focus",
        title: "",
        delay: 0,
        html: !1,
        container: !1
    }, $.fn.tooltip.noConflict = function() {
        return $.fn.tooltip = e, this
    }
}(window.jQuery), ! function($) {
    var t = function(t, e) {
        this.init("popover", t, e)
    };
    t.prototype = $.extend({}, $.fn.tooltip.Constructor.prototype, {
        constructor: t,
        setContent: function() {
            var t = this.tip(),
                e = this.getTitle(),
                n = this.getContent();
            t.find(".popover-title")[this.options.html ? "html" : "text"](e), t.find(".popover-content")[this.options.html ? "html" : "text"](n), t.removeClass("fade top bottom left right in")
        },
        hasContent: function() {
            return this.getTitle() || this.getContent()
        },
        getContent: function() {
            var t, e = this.$element,
                n = this.options;
            return t = ("function" == typeof n.content ? n.content.call(e[0]) : n.content) || e.attr("data-content")
        },
        tip: function() {
            return this.$tip || (this.$tip = $(this.options.template)), this.$tip
        },
        destroy: function() {
            this.hide().$element.off("." + this.type).removeData(this.type)
        }
    });
    var e = $.fn.popover;
    $.fn.popover = function(e) {
        return this.each(function() {
            var n = $(this),
                r = n.data("popover"),
                i = "object" == typeof e && e;
            r || n.data("popover", r = new t(this, i)), "string" == typeof e && r[e]()
        })
    }, $.fn.popover.Constructor = t;
    var n = $.fn.popover.Constructor.prototype.leave;
    $.fn.popover.Constructor.prototype.leave = function(t) {
        var e, r;
        return r = $(t.currentTarget)[this.type](this._options).data(this.type), n.call(this, t), t.currentTarget ? (e = $(".popover"), e.one("mouseenter", function() {
            return clearTimeout(r.timeout), e.one("mouseleave", function() {
                return n.call(r, t)
            })
        })) : void 0
    }, $.fn.popover.defaults = $.extend({}, $.fn.tooltip.defaults, {
        placement: "right",
        trigger: "click",
        content: "",
        template: '<div class="popover"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
    }), $.fn.popover.noConflict = function() {
        return $.fn.popover = e, this
    }, $("[rel='tooltip']").tooltip(), $("[rel='popover']").popover()
}(window.jQuery), ! function($) {
    $(document.body).on("click", "th.link", function(t) {
        href = $(this).attr("href"), window.location = href
    }), $(document.body).on("click", "tr.link > td", function(t) {
        t.target === this && (href = $(this).closest("tr.link").attr("href"), window.location = href)
    })
}(window.jQuery),
function() {
    for (var t, e = function() {}, n = ["assert", "clear", "count", "debug", "dir", "dirxml", "error", "exception", "group", "groupCollapsed", "groupEnd", "info", "log", "markTimeline", "profile", "profileEnd", "table", "time", "timeEnd", "timeStamp", "trace", "warn"], r = n.length, i = window.console = window.console || {}; r--;) t = n[r], i[t] || (i[t] = e)
}();
var pause = function(t) {
        var e = new Date,
            n = null;
        do n = new Date; while (t > n - e)
    },
    chartCanvas = function() {
        var t = null,
            e = null,
            n = null,
            r = null,
            i = null,
            o = null,
            a = null,
            s = null,
            u = null,
            l = {
                top: null,
                right: null,
                bottom: null,
                left: null
            },
            c = null,
            f = function(t) {
                return s = t, c = $(s), n = d3.select(s), x(n, c), n = n.append("g").attr("transform", "translate(" + l.left + "," + l.top + ")"), {
                    canvas: n,
                    width: o,
                    height: a,
                    update_settings: h
                }
            },
            h = function(t) {
                return void 0 !== t.axes && (d(t.axes), p(t.axes)), void 0 !== t.dataline && void 0 !== t.dataline.dataline && void 0 !== t.dataline.dataline.line && v(t.dataline), void 0 !== t.dataline && void 0 !== t.dataline.dataline && void 0 !== t.dataline.dataline.area && y(t.dataline), void 0 !== t.axes && (g(t.axes.xGridlines), m(t.axes.yGridlines)), void 0 !== t.chartTitle && b(t.chartTitle), {
                    canvas: n,
                    width: o,
                    height: a,
                    update_settings: h
                }
            },
            d = function(t) {
                update_chart_element.update({
                    element_type: "g",
                    element_selector: "g.xaxis",
                    element_class: "xaxis axis",
                    element_call: t.xAxis,
                    parent_element: n,
                    transform: "translate(0," + _() + ")"
                }), void 0 !== t.xLabelsRotate && n.select("g.xaxis").selectAll("text").style("text-anchor", "end").attr("dx", "-.8em").attr("dy", ".15em").attr("transform", function(e) {
                    return "rotate(" + t.xLabelsRotate + ")"
                })
            },
            p = function(t) {
                update_chart_element.update({
                    element_type: "g",
                    element_selector: "g.yaxis",
                    element_class: "yaxis axis",
                    element_call: t.yAxis,
                    parent_element: n,
                    update_if: void 0 !== t.dataline
                }), void 0 !== t.yLabelsRotate && n.select("g.yaxis").selectAll("text").style("text-anchor", "end").attr("dx", "-.1em").attr("dy", ".7em").attr("transform", function(e) {
                    return "rotate(" + t.yLabelsRotate + ")"
                })
            },
            g = function(t) {
                update_chart_element.update({
                    element_type: "g",
                    element_selector: "g.xgrid",
                    element_class: "grid xgrid",
                    element_call: t,
                    parent_element: n,
                    transform: "translate(0," + _() + ")",
                    update_if: !0
                })
            },
            m = function(t) {
                update_chart_element.update({
                    element_type: "g",
                    element_selector: "g.ygrid",
                    element_class: "grid ygrid",
                    element_call: t,
                    parent_element: n,
                    transform: void 0,
                    update_if: !0
                })
            },
            v = function(t) {
                update_chart_element.update({
                    element_type: "path",
                    element_selector: "path#line" + t.dataline.id,
                    element_class: "line " + t.dataline.color,
                    element_id: "line" + t.dataline.id,
                    element_call: void 0,
                    element_data: {
                        data: t.data,
                        attr: t.dataline.line
                    },
                    parent_element: n,
                    transform: void 0
                })
            },
            y = function(t) {
                update_chart_element.update({
                    element_type: "path",
                    element_selector: "path#area" + t.dataline.id,
                    element_class: "area " + t.dataline.color,
                    element_id: "area" + t.dataline.id,
                    element_call: void 0,
                    element_data: {
                        data: t.data,
                        attr: t.dataline.area
                    },
                    parent_element: n,
                    transform: void 0
                })
            },
            b = function(t) {
                update_chart_element.update({
                    element_type: "text",
                    element_selector: "text.chartTitle",
                    element_class: "text chartTitle",
                    extras: {
                        attr: [{
                            attr: "x",
                            value: r / 3
                        }, {
                            attr: "y",
                            value: 0 - l.top / 2
                        }],
                        text: [t]
                    },
                    parent_element: n,
                    transform: void 0
                })
            },
            x = function(t, e) {
                r = e.width(), t.attr("width", r), i = e.height(), t.attr("height", i), l.top = .1 * i, l.bottom = .2 * i, l.left = .1 * r, l.right = .1 * r, o = w(), a = _()
            },
            w = function() {
                return o = r - l.left - l.right
            },
            _ = function() {
                return a = i - l.top - l.bottom
            },
            M = function(t) {
                d(t.xAxis), p(t.yAxis), g(t.xGridlines), m(t.yGridlines)
            };
        return {
            set_canvas_element: f
        }
    }(),
    chartAxes = function() {
        var t = void 0,
            e = void 0,
            n = void 0,
            r = void 0,
            i = void 0,
            o = void 0,
            a = void 0,
            s = void 0,
            u = void 0,
            l = void 0,
            c = void 0,
            f = function(e) {
                return t = e, {
                    y: d(),
                    x: h(),
                    yAxis: x(),
                    xAxis: b(),
                    yGridlines: _(),
                    xGridlines: w(),
                    xLabelsRotate: o,
                    yLabelsRotate: a,
                    update_settings: p
                }
            },
            h = function() {
                return l = d3.time.scale().range([0, t.width])
            },
            d = function() {
                return c = d3.scale.linear().range([t.height, 0])
            },
            p = function(t) {
                void 0 !== t.xRange && g(t.xRange), void 0 !== t.yRange && m(t.yRange), void 0 !== t.xTitle && v(t.xTitle), void 0 !== t.yTitle && y(t.yTitle), void 0 !== t.xLabelsRotate && (t.axes.xLabelsRotate = +t.xLabelsRotate), void 0 !== t.yLabelsRotate && (t.axes.yLabelsRotate = +t.yLabelsRotate), void 0 !== t.yTickFormat && t.axes.yAxis.tickFormat(t.yTickFormat), void 0 !== t.xTickFormat && t.axes.xAxis.tickFormat(t.xTickFormat)
            },
            g = function(t) {
                l.domain(t)
            },
            m = function(t) {
                c.domain(t)
            },
            v = function(e) {
                update_chart_element.update({
                    element_type: "text",
                    element_selector: "text.xTitle",
                    element_class: "text xTitle",
                    extras: {
                        attr: [{
                            attr: "x",
                            value: t.width / 2
                        }, {
                            attr: "y",
                            value: 1.15 * t.height
                        }],
                        text: [e]
                    },
                    parent_element: t.canvas,
                    transform: void 0
                })
            },
            y = function(e) {
                update_chart_element.update({
                    element_type: "text",
                    element_selector: "text.yTitle",
                    element_class: "text yTitle",
                    extras: {
                        attr: [{
                            attr: "x",
                            value: 0 - t.height / 2
                        }, {
                            attr: "y",
                            value: 0 - .07 * t.width
                        }, {
                            attr: "dy",
                            value: "1em"
                        }],
                        text: [e]
                    },
                    parent_element: t.canvas,
                    transform: "rotate(-90)"
                })
            },
            b = function() {
                return xAxis = d3.svg.axis().scale(l).orient("bottom").ticks(5), xAxis
            },
            x = function() {
                return yAxis = d3.svg.axis().scale(c).orient("left").ticks(5), yAxis
            },
            w = function() {
                return r = d3.svg.axis().scale(l).orient("bottom").ticks(5).tickSize(-t.height, 0, 0).tickFormat("")
            },
            _ = function() {
                return i = d3.svg.axis().scale(c).orient("left").ticks(5).tickSize(-t.width, 0, 0).tickFormat("")
            };
        return {
            initialise_axes_for_chart: f
        }
    }(),
    chartLine = function() {
        var t = null,
            e = null,
            n = function(t) {
                return e = o(t), {
                    line: i(t),
                    area: e,
                    xValues: t.xValues,
                    yValues: t.yValues,
                    id: t.id,
                    color: t.color
                }
            },
            r = function(t) {},
            i = function(t) {
                return valueline = d3.svg.line().interpolate("basis").x(function(e) {
                    return t.axes.x(e[t.xValues])
                }).y(function(e) {
                    return t.axes.y(e[t.yValues])
                }), valueline
            },
            o = function(t) {
                return e = d3.svg.area().interpolate("basis").x(function(e) {
                    return t.axes.x(e[t.xValues])
                }).y0(t.chart.height).y1(function(e) {
                    return t.axes.y(e[t.yValues])
                })
            };
        return {
            initialise_path: n
        }
    }(),
    update_chart_element = function() {
        var t = function(t) {
            var e = t.parent_element,
                n = e.select(t.element_selector);
            n.empty() || void 0 !== t.remove_if && (n.remove(), n = e.select(t.element_selector));
            var r = !0;
            if (n.empty()) var n = e.append(t.element_type).attr("class", t.element_class);
            else {
                var e = t.parent_element.transition(),
                    n = e.select(t.element_selector).duration(750);
                r = !1
            }
            if (void 0 !== t.element_id && n.attr("id", t.element_id), void 0 !== t.transform && n.attr("transform", t.transform), void 0 !== t.element_call && n.call(t.element_call), void 0 !== t.element_data && void 0 !== t.element_data.data && (r && n.data([t.element_data.data]), n.attr("d", t.element_data.attr)), void 0 !== t.extras) {
                if (void 0 !== t.extras.attr) {
                    var i = t.extras.attr;
                    for (aa = 0; aa < i.length; aa++) {
                        var o = i[aa];
                        n.attr(o.attr, o.value)
                    }
                }
                if (void 0 !== t.extras.text) {
                    var a = t.extras.text;
                    for (ta = 0; ta < a.length; ta++) {
                        var s = a[ta];
                        n.text(s)
                    }
                }
            }
        };
        return {
            update: t
        }
    }(),
    initialise_chart = function() {
        alert("ok"), console.log("setUpChart function triggered");
        var t = {
                top: 20,
                right: 70,
                bottom: 60,
                left: 70
            },
            e = 960 - t.left - t.right,
            n = 500 - t.top - t.bottom,
            r = function(t) {
                return t.ra
            },
            i = d3.scale.linear().range([0, e]),
            o = function(t) {
                return i(r(t))
            },
            a = d3.svg.axis().scale(i).orient("bottom"),
            s = function(t) {
                return t.dec
            },
            u = d3.scale.linear().range([n, 0]),
            l = function(t) {
                return u(s(t))
            },
            c = d3.svg.axis().scale(u).orient("left"),
            f = function(t) {
                return t.Manufacturer
            },
            h = d3.scale.category10(),
            d = d3.select("svg.chart").attr("width", e + t.left + t.right).attr("height", n + t.top + t.bottom).append("g").attr("transform", "translate(" + t.left + "," + t.top + ")"),
            p = d3.select("body").append("div").attr("class", "tooltip").style("opacity", 0);
        d3.csv("raw_fits_coordinates.tsv", function(t, o) {
            o.forEach(function(t) {
                t.ra = +t.ra, t.dec = +t.dec
            }), i.domain([d3.min(o, r) - .5, d3.max(o, r) + .5]), u.domain([d3.min(o, s) - .2, d3.max(o, s) + .2]), d.append("g").attr("class", "x axis").attr("transform", "translate(0," + n + ")").call(a).append("text").attr("class", "label").attr("x", e).attr("y", -6).style("text-anchor", "end").text("ra"), d.append("g").attr("class", "y axis").call(c).append("text").attr("class", "label").attr("transform", "rotate(-90)").attr("y", 6).attr("dy", ".71em").style("text-anchor", "end").text("dec"), d.selectAll(".dot").data(o).enter().append("rect").attr("width", 100).attr("height", 100).attr("stroke", "black").attr("fill", "white").style("fill", "#dc322f").on("mouseover", function(t) {
                p.transition().duration(200).style("opacity", .9), p.html(t.name + "<br/> (" + r(t) + ", " + s(t) + ")").style("left", d3.event.pageX + 5 + "px").style("top", d3.event.pageY - 28 + "px")
            }).on("mouseout", function(t) {
                p.transition().duration(500).style("opacity", 0)
            });
            var l = d.selectAll(".legend").data(h.domain()).enter().append("g").attr("class", "legend").attr("transform", function(t, e) {
                return "translate(0," + 20 * e + ")"
            });
            l.append("rect").attr("x", e - 18).attr("width", 18).attr("height", 18).style("fill", h), l.append("text").attr("x", e - 24).attr("y", 9).attr("dy", ".35em").style("text-anchor", "end").text(function(t) {
                return t
            })
        })
    },
    example01 = function() {
        if (0 !== $("svg.example02").length) {
            var t = {
                    top: 20,
                    right: 20,
                    bottom: 70,
                    left: 40
                },
                e = 600 - t.left - t.right,
                n = 300 - t.top - t.bottom,
                r = d3.time.format("%Y-%m").parse,
                i = d3.scale.ordinal().rangeRoundBands([0, e], .05),
                o = d3.scale.linear().range([n, 0]),
                a = d3.svg.axis().scale(i).orient("bottom").tickFormat(d3.time.format("%Y-%m")),
                s = d3.svg.axis().scale(o).orient("left").ticks(10),
                u = d3.select("svg.example02").attr("width", e + t.left + t.right).attr("height", n + t.top + t.bottom).append("g").attr("transform", "translate(" + t.left + "," + t.top + ")");
            return d3.csv("data/bar-data.csv", function(t, e) {
                e.forEach(function(t) {
                    t.date = r(t.date), t.value = +t.value
                }), i.domain(e.map(function(t) {
                    return t.date
                })), o.domain([0, d3.max(e, function(t) {
                    return t.value
                })]), u.append("g").attr("class", "x axis").attr("transform", "translate(0," + n + ")").call(a).selectAll("text").style("text-anchor", "end").attr("dx", "-.8em").attr("dy", "-.55em").attr("transform", "rotate(-90)"), u.append("g").attr("class", "y axis").call(s).append("text").attr("transform", "rotate(-90)").attr("y", 6).attr("dy", ".71em").style("text-anchor", "end").text("Value ($)"), u.selectAll("bar").data(e).enter().append("rect").style("fill", "steelblue").attr("x", function(t) {
                    return i(t.date)
                }).attr("width", i.rangeBand()).attr("y", function(t) {
                    return o(t.value)
                }).attr("height", function(t) {
                    return n - o(t.value)
                })
            }), {}
        }
    }(),
    example28 = function() {
        if (0 !== $("svg.example28").length) {
            var t = 900,
                e = 900,
                n = Math.min(t, e) / 3,
                r = d3.scale.category20c(),
                i = d3.svg.arc().outerRadius(n - 10).innerRadius(n - 200),
                o = d3.svg.arc().outerRadius(1.25 * n - 10).innerRadius(1.25 * n - 70),
                a = d3.layout.pie().sort(null).value(function(t) {
                    return t.count
                }),
                s = d3.select("svg.example28").attr("width", t).attr("height", e).append("g").attr("transform", "translate(" + t / 2 + "," + e / 2 + ")"),
                u = ["classification", "count"],
                l = d3.select("div.example28Extras").append("table").attr("class", "table"),
                c = l.append("thead"),
                f = l.append("tbody");
            return d3.csv("/assets/csv/pessto_classification_breakdown.csv", function(t, e) {
                totalCount = 0, e.forEach(function(t) {
                    t.count = +t.count, totalCount += t.count
                });
                var n = s.selectAll(".arc").data(a(e)).enter().append("g").attr("class", "arc"),
                    l = function(t) {
                        return r(t.data.classification)
                    },
                    h = function(t) {
                        return r(t.data.classification)
                    };
                n.append("path").attr("d", i).style("fill", l), n.append("text").attr("transform", function(t) {
                    return "translate(" + o.centroid(t) + ")"
                }).attr("dy", ".35em").style("text-anchor", "middle").text(function(t) {
                    return t.data.count > totalCount / 80 ? t.data.classification : void 0
                }), e.push({
                    classification: "TOTAL",
                    count: totalCount
                }), c.append("tr").selectAll("th").data(u).enter().append("th").text(function(t) {
                    return t
                });
                var d = f.selectAll("tr").data(e).enter().append("tr").style("background-color", function(t) {
                        return "TOTAL" === t.classification ? "#D2D1D1" : r(t.classification)
                    }),
                    p = d.selectAll("td").data(function(t) {
                        return u.map(function(e) {
                            return {
                                column: e,
                                value: t[e]
                            }
                        })
                    }).enter().append("td").text(function(t) {
                        return t.value
                    }).style("color", "black")
            }), {}
        }
    }(),
    example29 = function() {
        if (0 !== $("svg.example29").length) {
            var t = 900,
                e = 900,
                n = Math.min(t, e) / 3,
                r = d3.scale.category20c(),
                i = d3.svg.arc().outerRadius(n - 10).innerRadius(n - 200),
                o = d3.svg.arc().outerRadius(1.25 * n - 10).innerRadius(1.25 * n - 70),
                a = d3.layout.pie().sort(null).value(function(t) {
                    return t.count
                }),
                s = d3.select("svg.example29").attr("width", t).attr("height", e).append("g").attr("transform", "translate(" + t / 2 + "," + e / 2 + ")"),
                u = ["classification", "count"],
                l = d3.select("div.example29Extras").append("table").attr("class", "table"),
                c = l.append("thead"),
                f = l.append("tbody");
            return d3.csv("/assets/csv/pessto_followup_classification_breakdown.csv", function(t, e) {
                totalCount = 0, e.forEach(function(t) {
                    t.count = +t.count, totalCount += t.count
                });
                var n = s.selectAll(".arc").data(a(e)).enter().append("g").attr("class", "arc"),
                    l = function(t) {
                        return r(t.data.classification)
                    },
                    h = function(t) {
                        return r(t.data.classification)
                    };
                n.append("path").attr("d", i).style("fill", l), n.append("text").attr("transform", function(t) {
                    return "translate(" + o.centroid(t) + ")"
                }).attr("dy", ".35em").style("text-anchor", "middle").text(function(t) {
                    return t.data.count > 1 ? t.data.classification : void 0
                }), e.push({
                    classification: "TOTAL",
                    count: totalCount
                }), c.append("tr").selectAll("th").data(u).enter().append("th").text(function(t) {
                    return t
                });
                var d = f.selectAll("tr").data(e).enter().append("tr").style("background-color", function(t) {
                        return "TOTAL" === t.classification ? "#D2D1D1" : r(t.classification)
                    }),
                    p = d.selectAll("td").data(function(t) {
                        return u.map(function(e) {
                            return {
                                column: e,
                                value: t[e]
                            }
                        })
                    }).enter().append("td").text(function(t) {
                        return t.value
                    }).style("color", "black")
            }), {}
        }
    }(),
    example30 = function() {
        if (0 !== $("svg.example30").length) {
            var t = {
                    top: 20,
                    right: 20,
                    bottom: 70,
                    left: 40
                },
                e = 600 - t.left - t.right,
                n = 300 - t.top - t.bottom,
                r = d3.scale.ordinal().rangeRoundBands([0, e], .05),
                i = d3.scale.linear().range([n, 0]),
                o = d3.svg.axis().scale(r).orient("bottom"),
                a = d3.svg.axis().scale(i).orient("left").ticks(10),
                s = d3.select("svg.example30").attr("width", e + t.left + t.right).attr("height", n + t.top + t.bottom).append("g").attr("transform", "translate(" + t.left + "," + t.top + ")");
            return d3.csv("/assets/csv/sofi_imaging_fwhm_binned_J_band.csv", function(t, u) {
                u.forEach(function(t) {
                    t.bin = +t.bin, t.count = +t.count
                }), r.domain(u.map(function(t) {
                    return t.bin
                })), i.domain([0, d3.max(u, function(t) {
                    return t.count
                })]), s.append("g").attr("class", "x axis").attr("transform", "translate(0," + n + ")").call(o).selectAll("text").style("text-anchor", "end").attr("dx", "+.2em").attr("dy", "+0.8em").attr("transform", "rotate(-30)"), s.select("g.x").append("text").attr("x", .8 * e).attr("dy", .25 * n).text("FWHM (arcsec)"), s.append("g").attr("class", "y axis").call(a).append("text").attr("transform", "rotate(-90)").attr("y", 6).attr("dy", ".71em").style("text-anchor", "end").text("Number of Images"), s.select("g.y").append("text").attr("dy", .05 * -n).attr("x", .9 * e).text("J Band"), s.selectAll("bar").data(u).enter().append("rect").style("fill", "#b58900").attr("x", function(t) {
                    return r(t.bin)
                }).attr("width", r.rangeBand()).attr("y", function(t) {
                    return i(t.count)
                }).attr("height", function(t) {
                    return n - i(t.count)
                })
            }), {}
        }
    }(),
    example31 = function() {
        if (0 !== $("svg.example31").length) {
            var t = {
                    top: 20,
                    right: 20,
                    bottom: 70,
                    left: 40
                },
                e = 600 - t.left - t.right,
                n = 300 - t.top - t.bottom,
                r = d3.scale.ordinal().rangeRoundBands([0, e], .05),
                i = d3.scale.linear().range([n, 0]),
                o = d3.svg.axis().scale(r).orient("bottom"),
                a = d3.svg.axis().scale(i).orient("left").ticks(10),
                s = d3.select("svg.example31").attr("width", e + t.left + t.right).attr("height", n + t.top + t.bottom).append("g").attr("transform", "translate(" + t.left + "," + t.top + ")");
            return d3.csv("/assets/csv/sofi_imaging_fwhm_binned_H_band.csv", function(t, u) {
                u.forEach(function(t) {
                    t.bin = +t.bin, t.count = +t.count
                }), r.domain(u.map(function(t) {
                    return t.bin
                })), i.domain([0, d3.max(u, function(t) {
                    return t.count
                })]), s.append("g").attr("class", "x axis").attr("transform", "translate(0," + n + ")").call(o).selectAll("text").style("text-anchor", "end").attr("dx", "+.2em").attr("dy", "+0.8em").attr("transform", "rotate(-30)"), s.select("g.x").append("text").attr("x", .8 * e).attr("dy", .25 * n).text("FWHM (arcsec)"), s.append("g").attr("class", "y axis").call(a).append("text").attr("transform", "rotate(-90)").attr("y", 6).attr("dy", ".71em").style("text-anchor", "end").text("Number of Images"), s.select("g.y").append("text").attr("dy", .05 * -n).attr("x", .9 * e).text("H Band"), s.selectAll("bar").data(u).enter().append("rect").style("fill", "#cb4b16").attr("x", function(t) {
                    return r(t.bin)
                }).attr("width", r.rangeBand()).attr("y", function(t) {
                    return i(t.count)
                }).attr("height", function(t) {
                    return n - i(t.count)
                })
            }), {}
        }
    }(),
    example32 = function() {
        if (0 !== $("svg.example32").length) {
            var t = {
                    top: 20,
                    right: 20,
                    bottom: 70,
                    left: 40
                },
                e = 600 - t.left - t.right,
                n = 300 - t.top - t.bottom,
                r = d3.scale.ordinal().rangeRoundBands([0, e], .05),
                i = d3.scale.linear().range([n, 0]),
                o = d3.svg.axis().scale(r).orient("bottom"),
                a = d3.svg.axis().scale(i).orient("left").ticks(10),
                s = d3.select("svg.example32").attr("width", e + t.left + t.right).attr("height", n + t.top + t.bottom).append("g").attr("transform", "translate(" + t.left + "," + t.top + ")");
            return d3.csv("/assets/csv/sofi_imaging_fwhm_binned_Ks_band.csv", function(t, u) {
                u.forEach(function(t) {
                    t.bin = +t.bin, t.count = +t.count
                }), r.domain(u.map(function(t) {
                    return t.bin
                })), i.domain([0, d3.max(u, function(t) {
                    return t.count
                })]), s.append("g").attr("class", "x axis").attr("transform", "translate(0," + n + ")").call(o).selectAll("text").style("text-anchor", "end").attr("dx", "+.2em").attr("dy", "+0.8em").attr("transform", "rotate(-30)"), s.select("g.x").append("text").attr("x", .8 * e).attr("dy", .25 * n).text("FWHM (arcsec)"), s.append("g").attr("class", "y axis").call(a).append("text").attr("transform", "rotate(-90)").attr("y", 6).attr("dy", ".71em").style("text-anchor", "end").text("Number of Images"), s.select("g.y").append("text").attr("dy", .05 * -n).attr("x", .9 * e).text("Ks Band"), s.selectAll("bar").data(u).enter().append("rect").style("fill", "#dc322f").attr("x", function(t) {
                    return r(t.bin)
                }).attr("width", r.rangeBand()).attr("y", function(t) {
                    return i(t.count)
                }).attr("height", function(t) {
                    return n - i(t.count)
                })
            }), {}
        }
    }(),
    example33 = function() {
        if (0 !== $("svg.example33").length) {
            var t = {
                    top: 20,
                    right: 20,
                    bottom: 70,
                    left: 40
                },
                e = 600 - t.left - t.right,
                n = 300 - t.top - t.bottom,
                r = d3.scale.ordinal().rangeRoundBands([0, e], .05),
                i = d3.scale.linear().range([n, 0]),
                o = d3.svg.axis().scale(r).orient("bottom"),
                a = d3.svg.axis().scale(i).orient("left").ticks(10),
                s = d3.select("svg.example33").attr("width", e + t.left + t.right).attr("height", n + t.top + t.bottom).append("g").attr("transform", "translate(" + t.left + "," + t.top + ")");
            return d3.csv("/assets/csv/efosc_imaging_fwhm_binned_B639_band.csv", function(t, u) {
                u.forEach(function(t) {
                    t.bin = +t.bin, t.count = +t.count
                }), r.domain(u.map(function(t) {
                    return t.bin
                })), i.domain([0, d3.max(u, function(t) {
                    return t.count
                })]), s.append("g").attr("class", "x axis").attr("transform", "translate(0," + n + ")").call(o).selectAll("text").style("text-anchor", "end").attr("dx", "+.2em").attr("dy", "+0.8em").attr("transform", "rotate(-30)"), s.select("g.x").append("text").attr("x", .8 * e).attr("dy", .25 * n).text("FWHM (arcsec)"), s.append("g").attr("class", "y axis").call(a).append("text").attr("transform", "rotate(-90)").attr("y", 6).attr("dy", ".71em").style("text-anchor", "end").text("Number of Images"), s.select("g.y").append("text").attr("dy", .05 * -n).attr("x", .9 * e).text("B Band"), s.selectAll("bar").data(u).enter().append("rect").style("fill", "#268bd2").attr("x", function(t) {
                    return r(t.bin)
                }).attr("width", r.rangeBand()).attr("y", function(t) {
                    return i(t.count)
                }).attr("height", function(t) {
                    return n - i(t.count)
                })
            }), {}
        }
    }(),
    example34 = function() {
        if (0 !== $("svg.example34").length) {
            var t = {
                    top: 20,
                    right: 20,
                    bottom: 70,
                    left: 40
                },
                e = 600 - t.left - t.right,
                n = 300 - t.top - t.bottom,
                r = d3.scale.ordinal().rangeRoundBands([0, e], .05),
                i = d3.scale.linear().range([n, 0]),
                o = d3.svg.axis().scale(r).orient("bottom"),
                a = d3.svg.axis().scale(i).orient("left").ticks(10),
                s = d3.select("svg.example34").attr("width", e + t.left + t.right).attr("height", n + t.top + t.bottom).append("g").attr("transform", "translate(" + t.left + "," + t.top + ")");
            return d3.csv("/assets/csv/efosc_imaging_fwhm_binned_V641_band.csv", function(t, u) {
                u.forEach(function(t) {
                    t.bin = +t.bin, t.count = +t.count
                }), r.domain(u.map(function(t) {
                    return t.bin
                })), i.domain([0, d3.max(u, function(t) {
                    return t.count
                })]), s.append("g").attr("class", "x axis").attr("transform", "translate(0," + n + ")").call(o).selectAll("text").style("text-anchor", "end").attr("dx", "+.2em").attr("dy", "+0.8em").attr("transform", "rotate(-30)"), s.select("g.x").append("text").attr("x", .8 * e).attr("dy", .25 * n).text("FWHM (arcsec)"), s.append("g").attr("class", "y axis").call(a).append("text").attr("transform", "rotate(-90)").attr("y", 6).attr("dy", ".71em").style("text-anchor", "end").text("Number of Images"), s.select("g.y").append("text").attr("dy", .05 * -n).attr("x", .9 * e).text("V Band"), s.selectAll("bar").data(u).enter().append("rect").style("fill", "#859900").attr("x", function(t) {
                    return r(t.bin)
                }).attr("width", r.rangeBand()).attr("y", function(t) {
                    return i(t.count)
                }).attr("height", function(t) {
                    return n - i(t.count)
                })
            }), {}
        }
    }(),
    example35 = function() {
        if (0 !== $("svg.example35").length) {
            var t = {
                    top: 20,
                    right: 20,
                    bottom: 70,
                    left: 40
                },
                e = 600 - t.left - t.right,
                n = 300 - t.top - t.bottom,
                r = d3.scale.ordinal().rangeRoundBands([0, e], .05),
                i = d3.scale.linear().range([n, 0]),
                o = d3.svg.axis().scale(r).orient("bottom"),
                a = d3.svg.axis().scale(i).orient("left").ticks(10),
                s = d3.select("svg.example35").attr("width", e + t.left + t.right).attr("height", n + t.top + t.bottom).append("g").attr("transform", "translate(" + t.left + "," + t.top + ")");
            return d3.csv("/assets/csv/efosc_imaging_fwhm_binned_R642_band.csv", function(t, u) {
                u.forEach(function(t) {
                    t.bin = +t.bin, t.count = +t.count
                }), r.domain(u.map(function(t) {
                    return t.bin
                })), i.domain([0, d3.max(u, function(t) {
                    return t.count
                })]), s.append("g").attr("class", "x axis").attr("transform", "translate(0," + n + ")").call(o).selectAll("text").style("text-anchor", "end").attr("dx", "+.2em").attr("dy", "+0.8em").attr("transform", "rotate(-30)"), s.select("g.x").append("text").attr("x", .8 * e).attr("dy", .25 * n).text("FWHM (arcsec)"), s.append("g").attr("class", "y axis").call(a).append("text").attr("transform", "rotate(-90)").attr("y", 6).attr("dy", ".71em").style("text-anchor", "end").text("Number of Images"), s.select("g.y").append("text").attr("dy", .05 * -n).attr("x", .9 * e).text("R Band"), s.selectAll("bar").data(u).enter().append("rect").style("fill", "#cb4b16").attr("x", function(t) {
                    return r(t.bin)
                }).attr("width", r.rangeBand()).attr("y", function(t) {
                    return i(t.count)
                }).attr("height", function(t) {
                    return n - i(t.count)
                })
            }), {}
        }
    }(),
    example36 = function() {
        if (0 !== $("svg.example36").length) {
            var t = {
                    top: 20,
                    right: 20,
                    bottom: 70,
                    left: 40
                },
                e = 600 - t.left - t.right,
                n = 300 - t.top - t.bottom,
                r = d3.scale.ordinal().rangeRoundBands([0, e], .05),
                i = d3.scale.linear().range([n, 0]),
                o = d3.svg.axis().scale(r).orient("bottom"),
                a = d3.svg.axis().scale(i).orient("left").ticks(10),
                s = d3.select("svg.example36").attr("width", e + t.left + t.right).attr("height", n + t.top + t.bottom).append("g").attr("transform", "translate(" + t.left + "," + t.top + ")");
            return d3.csv("/assets/csv/efosc_imaging_fwhm_binned_i705_band.csv", function(t, u) {
                u.forEach(function(t) {
                    t.bin = +t.bin, t.count = +t.count
                }), r.domain(u.map(function(t) {
                    return t.bin
                })), i.domain([0, d3.max(u, function(t) {
                    return t.count
                })]), s.append("g").attr("class", "x axis").attr("transform", "translate(0," + n + ")").call(o).selectAll("text").style("text-anchor", "end").attr("dx", "+.2em").attr("dy", "+0.8em").attr("transform", "rotate(-30)"), s.select("g.x").append("text").attr("x", .8 * e).attr("dy", .25 * n).text("FWHM (arcsec)"), s.append("g").attr("class", "y axis").call(a).append("text").attr("transform", "rotate(-90)").attr("y", 6).attr("dy", ".71em").style("text-anchor", "end").text("Number of Images"), s.select("g.y").append("text").attr("dy", .05 * -n).attr("x", .9 * e).text("i Band"), s.selectAll("bar").data(u).enter().append("rect").style("fill", "#dc322f").attr("x", function(t) {
                    return r(t.bin)
                }).attr("width", r.rangeBand()).attr("y", function(t) {
                    return i(t.count)
                }).attr("height", function(t) {
                    return n - i(t.count)
                })
            }), {}
        }
    }();
$(function() {
    $("svg.chart").length > 0
});
var hljs = new function() {
    function t(t) {
        return t.replace(/&/gm, "&amp;").replace(/</gm, "&lt;").replace(/>/gm, "&gt;")
    }

    function e(t) {
        return t.nodeName.toLowerCase()
    }

    function n(t, e) {
        var n = t && t.exec(e);
        return n && 0 == n.index
    }

    function r(t) {
        return Array.prototype.map.call(t.childNodes, function(t) {
            return 3 == t.nodeType ? y.useBR ? t.nodeValue.replace(/\n/g, "") : t.nodeValue : "br" == e(t) ? "\n" : r(t)
        }).join("")
    }

    function i(t) {
        var e = (t.className + " " + (t.parentNode ? t.parentNode.className : "")).split(/\s+/);
        return e = e.map(function(t) {
            return t.replace(/^language-/, "")
        }), e.filter(function(t) {
            return v(t) || "no-highlight" == t
        })[0]
    }

    function o(t, e) {
        var n = {};
        for (var r in t) n[r] = t[r];
        if (e)
            for (var r in e) n[r] = e[r];
        return n
    }

    function a(t) {
        var n = [];
        return function r(t, i) {
            for (var o = t.firstChild; o; o = o.nextSibling) 3 == o.nodeType ? i += o.nodeValue.length : "br" == e(o) ? i += 1 : 1 == o.nodeType && (n.push({
                event: "start",
                offset: i,
                node: o
            }), i = r(o, i), n.push({
                event: "stop",
                offset: i,
                node: o
            }));
            return i
        }(t, 0), n
    }

    function s(n, r, i) {
        function o() {
            return n.length && r.length ? n[0].offset != r[0].offset ? n[0].offset < r[0].offset ? n : r : "start" == r[0].event ? n : r : n.length ? n : r
        }

        function a(n) {
            function r(e) {
                return " " + e.nodeName + '="' + t(e.value) + '"'
            }
            c += "<" + e(n) + Array.prototype.map.call(n.attributes, r).join("") + ">"
        }

        function s(t) {
            c += "</" + e(t) + ">"
        }

        function u(t) {
            ("start" == t.event ? a : s)(t.node)
        }
        for (var l = 0, c = "", f = []; n.length || r.length;) {
            var h = o();
            if (c += t(i.substr(l, h[0].offset - l)), l = h[0].offset, h == n) {
                f.reverse().forEach(s);
                do u(h.splice(0, 1)[0]), h = o(); while (h == n && h.length && h[0].offset == l);
                f.reverse().forEach(a)
            } else "start" == h[0].event ? f.push(h[0].node) : f.pop(), u(h.splice(0, 1)[0])
        }
        return c + t(i.substr(l))
    }

    function u(t) {
        function e(t) {
            return t && t.source || t
        }

        function n(n, r) {
            return RegExp(e(n), "m" + (t.cI ? "i" : "") + (r ? "g" : ""))
        }

        function r(i, a) {
            function s(e, n) {
                t.cI && (n = n.toLowerCase()), n.split(" ").forEach(function(t) {
                    var n = t.split("|");
                    u[n[0]] = [e, n[1] ? Number(n[1]) : 1]
                })
            }
            if (!i.compiled) {
                if (i.compiled = !0, i.k = i.k || i.bK, i.k) {
                    var u = {};
                    "string" == typeof i.k ? s("keyword", i.k) : Object.keys(i.k).forEach(function(t) {
                        s(t, i.k[t])
                    }), i.k = u
                }
                i.lR = n(i.l || /\b[A-Za-z0-9_]+\b/, !0), a && (i.bK && (i.b = i.bK.split(" ").join("|")), i.b || (i.b = /\B|\b/), i.bR = n(i.b), i.e || i.eW || (i.e = /\B|\b/), i.e && (i.eR = n(i.e)), i.tE = e(i.e) || "", i.eW && a.tE && (i.tE += (i.e ? "|" : "") + a.tE)), i.i && (i.iR = n(i.i)), void 0 === i.r && (i.r = 1), i.c || (i.c = []);
                var l = [];
                i.c.forEach(function(t) {
                    t.v ? t.v.forEach(function(e) {
                        l.push(o(t, e))
                    }) : l.push("self" == t ? i : t)
                }), i.c = l, i.c.forEach(function(t) {
                    r(t, i)
                }), i.starts && r(i.starts, a);
                var c = i.c.map(function(t) {
                    return t.bK ? "\\.?\\b(" + t.b + ")\\b\\.?" : t.b
                }).concat([i.tE]).concat([i.i]).map(e).filter(Boolean);
                i.t = c.length ? n(c.join("|"), !0) : {
                    exec: function(t) {
                        return null
                    }
                }, i.continuation = {}
            }
        }
        r(t)
    }

    function l(e, r, i, o) {
        function a(t, e) {
            for (var r = 0; r < e.c.length; r++)
                if (n(e.c[r].bR, t)) return e.c[r]
        }

        function s(t, e) {
            return n(t.eR, e) ? t : t.eW ? s(t.parent, e) : void 0
        }

        function f(t, e) {
            return !i && n(e.iR, t)
        }

        function h(t, e) {
            var n = _.cI ? e[0].toLowerCase() : e[0];
            return t.k.hasOwnProperty(n) && t.k[n]
        }

        function d(t, e, n, r) {
            var i = r ? "" : y.classPrefix,
                o = '<span class="' + i,
                a = n ? "" : "</span>";
            return o += t + '">', o + e + a
        }

        function p() {
            var e = t(C);
            if (!M.k) return e;
            var n = "",
                r = 0;
            M.lR.lastIndex = 0;
            for (var i = M.lR.exec(e); i;) {
                n += e.substr(r, i.index - r);
                var o = h(M, i);
                o ? (E += o[1], n += d(o[0], i[0])) : n += i[0], r = M.lR.lastIndex, i = M.lR.exec(e)
            }
            return n + e.substr(r)
        }

        function g() {
            if (M.sL && !b[M.sL]) return t(C);
            var e = M.sL ? l(M.sL, C, !0, M.continuation.top) : c(C);
            return M.r > 0 && (E += e.r), "continuous" == M.subLanguageMode && (M.continuation.top = e.top), d(e.language, e.value, !1, !0)
        }

        function m() {
            return void 0 !== M.sL ? g() : p()
        }

        function x(e, n) {
            var r = e.cN ? d(e.cN, "", !0) : "";
            e.rB ? (k += r, C = "") : e.eB ? (k += t(n) + r, C = "") : (k += r, C = n), M = Object.create(e, {
                parent: {
                    value: M
                }
            })
        }

        function w(e, n) {
            if (C += e, void 0 === n) return k += m(), 0;
            var r = a(n, M);
            if (r) return k += m(), x(r, n), r.rB ? 0 : n.length;
            var i = s(M, n);
            if (i) {
                var o = M;
                o.rE || o.eE || (C += n), k += m();
                do M.cN && (k += "</span>"), E += M.r, M = M.parent; while (M != i.parent);
                return o.eE && (k += t(n)), C = "", i.starts && x(i.starts, ""), o.rE ? 0 : n.length
            }
            if (f(n, M)) throw new Error('Illegal lexeme "' + n + '" for mode "' + (M.cN || "<unnamed>") + '"');
            return C += n, n.length || 1
        }
        var _ = v(e);
        if (!_) throw new Error('Unknown language: "' + e + '"');
        u(_);
        for (var M = o || _, k = "", N = M; N != _; N = N.parent) N.cN && (k = d(N.cN, k, !0));
        var C = "",
            E = 0;
        try {
            for (var S, T, A = 0;;) {
                if (M.t.lastIndex = A, S = M.t.exec(r), !S) break;
                T = w(r.substr(A, S.index - A), S[0]), A = S.index + T
            }
            w(r.substr(A));
            for (var N = M; N.parent; N = N.parent) N.cN && (k += "</span>");
            return {
                r: E,
                value: k,
                language: e,
                top: M
            }
        } catch (L) {
            if (-1 != L.message.indexOf("Illegal")) return {
                r: 0,
                value: t(r)
            };
            throw L
        }
    }

    function c(e, n) {
        n = n || y.languages || Object.keys(b);
        var r = {
                r: 0,
                value: t(e)
            },
            i = r;
        return n.forEach(function(t) {
            if (v(t)) {
                var n = l(t, e, !1);
                n.language = t, n.r > i.r && (i = n), n.r > r.r && (i = r, r = n)
            }
        }), i.language && (r.second_best = i), r
    }

    function f(t) {
        return y.tabReplace && (t = t.replace(/^((<[^>]+>|\t)+)/gm, function(t, e, n, r) {
            return e.replace(/\t/g, y.tabReplace)
        })), y.useBR && (t = t.replace(/\n/g, "<br>")), t
    }

    function h(t) {
        var e = r(t),
            n = i(t);
        if ("no-highlight" != n) {
            var o = n ? l(n, e, !0) : c(e),
                u = a(t);
            if (u.length) {
                var h = document.createElementNS("http://www.w3.org/1999/xhtml", "pre");
                h.innerHTML = o.value, o.value = s(u, a(h), e)
            }
            o.value = f(o.value), t.innerHTML = o.value, t.className += " hljs " + (!n && o.language || ""), t.result = {
                language: o.language,
                re: o.r
            }, o.second_best && (t.second_best = {
                language: o.second_best.language,
                re: o.second_best.r
            })
        }
    }

    function d(t) {
        y = o(y, t)
    }

    function p() {
        if (!p.called) {
            p.called = !0;
            var t = document.querySelectorAll("pre code");
            Array.prototype.forEach.call(t, h)
        }
    }

    function g() {
        addEventListener("DOMContentLoaded", p, !1), addEventListener("load", p, !1)
    }

    function m(t, e) {
        var n = b[t] = e(this);
        n.aliases && n.aliases.forEach(function(e) {
            x[e] = t
        })
    }

    function v(t) {
        return b[t] || b[x[t]]
    }
    var y = {
            classPrefix: "hljs-",
            tabReplace: null,
            useBR: !1,
            languages: void 0
        },
        b = {},
        x = {};
    this.highlight = l, this.highlightAuto = c, this.fixMarkup = f, this.highlightBlock = h, this.configure = d, this.initHighlighting = p, this.initHighlightingOnLoad = g, this.registerLanguage = m, this.getLanguage = v, this.inherit = o, this.IR = "[a-zA-Z][a-zA-Z0-9_]*", this.UIR = "[a-zA-Z_][a-zA-Z0-9_]*", this.NR = "\\b\\d+(\\.\\d+)?", this.CNR = "(\\b0[xX][a-fA-F0-9]+|(\\b\\d+(\\.\\d*)?|\\.\\d+)([eE][-+]?\\d+)?)", this.BNR = "\\b(0b[01]+)", this.RSR = "!|!=|!==|%|%=|&|&&|&=|\\*|\\*=|\\+|\\+=|,|-|-=|/=|/|:|;|<<|<<=|<=|<|===|==|=|>>>=|>>=|>=|>>>|>>|>|\\?|\\[|\\{|\\(|\\^|\\^=|\\||\\|=|\\|\\||~", this.BE = {
        b: "\\\\[\\s\\S]",
        r: 0
    }, this.ASM = {
        cN: "string",
        b: "'",
        e: "'",
        i: "\\n",
        c: [this.BE]
    }, this.QSM = {
        cN: "string",
        b: '"',
        e: '"',
        i: "\\n",
        c: [this.BE]
    }, this.CLCM = {
        cN: "comment",
        b: "//",
        e: "$"
    }, this.CBLCLM = {
        cN: "comment",
        b: "/\\*",
        e: "\\*/"
    }, this.HCM = {
        cN: "comment",
        b: "#",
        e: "$"
    }, this.NM = {
        cN: "number",
        b: this.NR,
        r: 0
    }, this.CNM = {
        cN: "number",
        b: this.CNR,
        r: 0
    }, this.BNM = {
        cN: "number",
        b: this.BNR,
        r: 0
    }, this.REGEXP_MODE = {
        cN: "regexp",
        b: /\//,
        e: /\/[gim]*/,
        i: /\n/,
        c: [this.BE, {
            b: /\[/,
            e: /\]/,
            r: 0,
            c: [this.BE]
        }]
    }, this.TM = {
        cN: "title",
        b: this.IR,
        r: 0
    }, this.UTM = {
        cN: "title",
        b: this.UIR,
        r: 0
    }
};
hljs.registerLanguage("bash", function(t) {
    var e = {
            cN: "variable",
            v: [{
                b: /\$[\w\d#@][\w\d_]*/
            }, {
                b: /\$\{(.*?)\}/
            }]
        },
        n = {
            cN: "string",
            b: /"/,
            e: /"/,
            c: [t.BE, e, {
                cN: "variable",
                b: /\$\(/,
                e: /\)/,
                c: [t.BE]
            }]
        },
        r = {
            cN: "string",
            b: /'/,
            e: /'/
        };
    return {
        l: /-?[a-z\.]+/,
        k: {
            keyword: "if then else elif fi for break continue while in do done exit return set declare case esac export exec",
            literal: "true false",
            built_in: "printf echo read cd pwd pushd popd dirs let eval unset typeset readonly getopts source shopt caller type hash bind help sudo",
            operator: "-ne -eq -lt -gt -f -d -e -s -l -a"
        },
        c: [{
            cN: "shebang",
            b: /^#![^\n]+sh\s*$/,
            r: 10
        }, {
            cN: "function",
            b: /\w[\w\d_]*\s*\(\s*\)\s*\{/,
            rB: !0,
            c: [t.inherit(t.TM, {
                b: /\w[\w\d_]*/
            })],
            r: 0
        }, t.HCM, t.NM, n, r, e]
    }
}), hljs.registerLanguage("cs", function(t) {
    var e = "abstract as base bool break byte case catch char checked const continue decimal default delegate do double else enum event explicit extern false finally fixed float for foreach goto if implicit in int interface internal is lock long new null object operator out override params private protected public readonly ref return sbyte sealed short sizeof stackalloc static string struct switch this throw true try typeof uint ulong unchecked unsafe ushort using virtual volatile void while async await ascending descending from get group into join let orderby partial select set value var where yield";
    return {
        k: e,
        c: [{
            cN: "comment",
            b: "///",
            e: "$",
            rB: !0,
            c: [{
                cN: "xmlDocTag",
                b: "///|<!--|-->"
            }, {
                cN: "xmlDocTag",
                b: "</?",
                e: ">"
            }]
        }, t.CLCM, t.CBLCLM, {
            cN: "preprocessor",
            b: "#",
            e: "$",
            k: "if else elif endif define undef warning error line region endregion pragma checksum"
        }, {
            cN: "string",
            b: '@"',
            e: '"',
            c: [{
                b: '""'
            }]
        }, t.ASM, t.QSM, t.CNM, {
            bK: "protected public private internal",
            e: /[{;=]/,
            k: e,
            c: [{
                bK: "class namespace interface",
                starts: {
                    c: [t.TM]
                }
            }, {
                b: t.IR + "\\s*\\(",
                rB: !0,
                c: [t.TM]
            }]
        }]
    }
}), hljs.registerLanguage("ruby", function(t) {
    var e = "[a-zA-Z_]\\w*[!?=]?|[-+~]\\@|<<|>>|=~|===?|<=>|[<>]=?|\\*\\*|[-/+%^&*~`|]|\\[\\]=?",
        n = "and false then defined module in return redo if BEGIN retry end for true self when next until do begin unless END rescue nil else break undef not super class case require yield alias while ensure elsif or include attr_reader attr_writer attr_accessor",
        r = {
            cN: "yardoctag",
            b: "@[A-Za-z]+"
        },
        i = {
            cN: "comment",
            v: [{
                b: "#",
                e: "$",
                c: [r]
            }, {
                b: "^\\=begin",
                e: "^\\=end",
                c: [r],
                r: 10
            }, {
                b: "^__END__",
                e: "\\n$"
            }]
        },
        o = {
            cN: "subst",
            b: "#\\{",
            e: "}",
            k: n
        },
        a = {
            cN: "string",
            c: [t.BE, o],
            v: [{
                b: /'/,
                e: /'/
            }, {
                b: /"/,
                e: /"/
            }, {
                b: "%[qw]?\\(",
                e: "\\)"
            }, {
                b: "%[qw]?\\[",
                e: "\\]"
            }, {
                b: "%[qw]?{",
                e: "}"
            }, {
                b: "%[qw]?<",
                e: ">",
                r: 10
            }, {
                b: "%[qw]?/",
                e: "/",
                r: 10
            }, {
                b: "%[qw]?%",
                e: "%",
                r: 10
            }, {
                b: "%[qw]?-",
                e: "-",
                r: 10
            }, {
                b: "%[qw]?\\|",
                e: "\\|",
                r: 10
            }, {
                b: /\B\?(\\\d{1,3}|\\x[A-Fa-f0-9]{1,2}|\\u[A-Fa-f0-9]{4}|\\?\S)\b/
            }]
        },
        s = {
            cN: "params",
            b: "\\(",
            e: "\\)",
            k: n
        },
        u = [a, i, {
            cN: "class",
            bK: "class module",
            e: "$|;",
            i: /=/,
            c: [t.inherit(t.TM, {
                b: "[A-Za-z_]\\w*(::\\w+)*(\\?|\\!)?"
            }), {
                cN: "inheritance",
                b: "<\\s*",
                c: [{
                    cN: "parent",
                    b: "(" + t.IR + "::)?" + t.IR
                }]
            }, i]
        }, {
            cN: "function",
            bK: "def",
            e: " |$|;",
            r: 0,
            c: [t.inherit(t.TM, {
                b: e
            }), s, i]
        }, {
            cN: "constant",
            b: "(::)?(\\b[A-Z]\\w*(::)?)+",
            r: 0
        }, {
            cN: "symbol",
            b: ":",
            c: [a, {
                b: e
            }],
            r: 0
        }, {
            cN: "symbol",
            b: t.UIR + "(\\!|\\?)?:",
            r: 0
        }, {
            cN: "number",
            b: "(\\b0[0-7_]+)|(\\b0x[0-9a-fA-F_]+)|(\\b[1-9][0-9_]*(\\.[0-9_]+)?)|[0_]\\b",
            r: 0
        }, {
            cN: "variable",
            b: "(\\$\\W)|((\\$|\\@\\@?)(\\w+))"
        }, {
            b: "(" + t.RSR + ")\\s*",
            c: [i, {
                cN: "regexp",
                c: [t.BE, o],
                i: /\n/,
                v: [{
                    b: "/",
                    e: "/[a-z]*"
                }, {
                    b: "%r{",
                    e: "}[a-z]*"
                }, {
                    b: "%r\\(",
                    e: "\\)[a-z]*"
                }, {
                    b: "%r!",
                    e: "![a-z]*"
                }, {
                    b: "%r\\[",
                    e: "\\][a-z]*"
                }]
            }],
            r: 0
        }];
    return o.c = u, s.c = u, {
        k: n,
        c: u
    }
}), hljs.registerLanguage("diff", function(t) {
    return {
        c: [{
            cN: "chunk",
            r: 10,
            v: [{
                b: /^\@\@ +\-\d+,\d+ +\+\d+,\d+ +\@\@$/
            }, {
                b: /^\*\*\* +\d+,\d+ +\*\*\*\*$/
            }, {
                b: /^\-\-\- +\d+,\d+ +\-\-\-\-$/
            }]
        }, {
            cN: "header",
            v: [{
                b: /Index: /,
                e: /$/
            }, {
                b: /=====/,
                e: /=====$/
            }, {
                b: /^\-\-\-/,
                e: /$/
            }, {
                b: /^\*{3} /,
                e: /$/
            }, {
                b: /^\+\+\+/,
                e: /$/
            }, {
                b: /\*{5}/,
                e: /\*{5}$/
            }]
        }, {
            cN: "addition",
            b: "^\\+",
            e: "$"
        }, {
            cN: "deletion",
            b: "^\\-",
            e: "$"
        }, {
            cN: "change",
            b: "^\\!",
            e: "$"
        }]
    }
}), hljs.registerLanguage("javascript", function(t) {
    return {
        aliases: ["js"],
        k: {
            keyword: "in if for while finally var new function do return void else break catch instanceof with throw case default try this switch continue typeof delete let yield const class",
            literal: "true false null undefined NaN Infinity",
            built_in: "eval isFinite isNaN parseFloat parseInt decodeURI decodeURIComponent encodeURI encodeURIComponent escape unescape Object Function Boolean Error EvalError InternalError RangeError ReferenceError StopIteration SyntaxError TypeError URIError Number Math Date String RegExp Array Float32Array Float64Array Int16Array Int32Array Int8Array Uint16Array Uint32Array Uint8Array Uint8ClampedArray ArrayBuffer DataView JSON Intl arguments require"
        },
        c: [{
            cN: "pi",
            b: /^\s*('|")use strict('|")/,
            r: 10
        }, t.ASM, t.QSM, t.CLCM, t.CBLCLM, t.CNM, {
            b: "(" + t.RSR + "|\\b(case|return|throw)\\b)\\s*",
            k: "return throw case",
            c: [t.CLCM, t.CBLCLM, t.REGEXP_MODE, {
                b: /</,
                e: />;/,
                r: 0,
                sL: "xml"
            }],
            r: 0
        }, {
            cN: "function",
            bK: "function",
            e: /\{/,
            c: [t.inherit(t.TM, {
                b: /[A-Za-z$_][0-9A-Za-z$_]*/
            }), {
                cN: "params",
                b: /\(/,
                e: /\)/,
                c: [t.CLCM, t.CBLCLM],
                i: /["'\(]/
            }],
            i: /\[|%/
        }, {
            b: /\$[(.]/
        }, {
            b: "\\." + t.IR,
            r: 0
        }]
    }
}), hljs.registerLanguage("xml", function(t) {
    var e = "[A-Za-z0-9\\._:-]+",
        n = {
            b: /<\?(php)?(?!\w)/,
            e: /\?>/,
            sL: "php",
            subLanguageMode: "continuous"
        },
        r = {
            eW: !0,
            i: /</,
            r: 0,
            c: [n, {
                cN: "attribute",
                b: e,
                r: 0
            }, {
                b: "=",
                r: 0,
                c: [{
                    cN: "value",
                    v: [{
                        b: /"/,
                        e: /"/
                    }, {
                        b: /'/,
                        e: /'/
                    }, {
                        b: /[^\s\/>]+/
                    }]
                }]
            }]
        };
    return {
        aliases: ["html"],
        cI: !0,
        c: [{
            cN: "doctype",
            b: "<!DOCTYPE",
            e: ">",
            r: 10,
            c: [{
                b: "\\[",
                e: "\\]"
            }]
        }, {
            cN: "comment",
            b: "<!--",
            e: "-->",
            r: 10
        }, {
            cN: "cdata",
            b: "<\\!\\[CDATA\\[",
            e: "\\]\\]>",
            r: 10
        }, {
            cN: "tag",
            b: "<style(?=\\s|>|$)",
            e: ">",
            k: {
                title: "style"
            },
            c: [r],
            starts: {
                e: "</style>",
                rE: !0,
                sL: "css"
            }
        }, {
            cN: "tag",
            b: "<script(?=\\s|>|$)",
            e: ">",
            k: {
                title: "script"
            },
            c: [r],
            starts: {
                e: "</script>",
                rE: !0,
                sL: "javascript"
            }
        }, {
            b: "<%",
            e: "%>",
            sL: "vbscript"
        }, n, {
            cN: "pi",
            b: /<\?\w+/,
            e: /\?>/,
            r: 10
        }, {
            cN: "tag",
            b: "</?",
            e: "/?>",
            c: [{
                cN: "title",
                b: "[^ /><]+",
                r: 0
            }, r]
        }]
    }
}), hljs.registerLanguage("markdown", function(t) {
    return {
        c: [{
            cN: "header",
            v: [{
                b: "^#{1,6}",
                e: "$"
            }, {
                b: "^.+?\\n[=-]{2,}$"
            }]
        }, {
            b: "<",
            e: ">",
            sL: "xml",
            r: 0
        }, {
            cN: "bullet",
            b: "^([*+-]|(\\d+\\.))\\s+"
        }, {
            cN: "strong",
            b: "[*_]{2}.+?[*_]{2}"
        }, {
            cN: "emphasis",
            v: [{
                b: "\\*.+?\\*"
            }, {
                b: "_.+?_",
                r: 0
            }]
        }, {
            cN: "blockquote",
            b: "^>\\s+",
            e: "$"
        }, {
            cN: "code",
            v: [{
                b: "`.+?`"
            }, {
                b: "^( {4}|	)",
                e: "$",
                r: 0
            }]
        }, {
            cN: "horizontal_rule",
            b: "^[-\\*]{3,}",
            e: "$"
        }, {
            b: "\\[.+?\\][\\(\\[].+?[\\)\\]]",
            rB: !0,
            c: [{
                cN: "link_label",
                b: "\\[",
                e: "\\]",
                eB: !0,
                rE: !0,
                r: 0
            }, {
                cN: "link_url",
                b: "\\]\\(",
                e: "\\)",
                eB: !0,
                eE: !0
            }, {
                cN: "link_reference",
                b: "\\]\\[",
                e: "\\]",
                eB: !0,
                eE: !0
            }],
            r: 10
        }, {
            b: "^\\[.+\\]:",
            e: "$",
            rB: !0,
            c: [{
                cN: "link_reference",
                b: "\\[",
                e: "\\]",
                eB: !0,
                eE: !0
            }, {
                cN: "link_url",
                b: "\\s",
                e: "$"
            }]
        }]
    }
}), hljs.registerLanguage("css", function(t) {
    var e = "[a-zA-Z-][a-zA-Z0-9_-]*",
        n = {
            cN: "function",
            b: e + "\\(",
            e: "\\)",
            c: ["self", t.NM, t.ASM, t.QSM]
        };
    return {
        cI: !0,
        i: "[=/|']",
        c: [t.CBLCLM, {
            cN: "id",
            b: "\\#[A-Za-z0-9_-]+"
        }, {
            cN: "class",
            b: "\\.[A-Za-z0-9_-]+",
            r: 0
        }, {
            cN: "attr_selector",
            b: "\\[",
            e: "\\]",
            i: "$"
        }, {
            cN: "pseudo",
            b: ":(:)?[a-zA-Z0-9\\_\\-\\+\\(\\)\\\"\\']+"
        }, {
            cN: "at_rule",
            b: "@(font-face|page)",
            l: "[a-z-]+",
            k: "font-face page"
        }, {
            cN: "at_rule",
            b: "@",
            e: "[{;]",
            c: [{
                cN: "keyword",
                b: /\S+/
            }, {
                b: /\s/,
                eW: !0,
                eE: !0,
                r: 0,
                c: [n, t.ASM, t.QSM, t.NM]
            }]
        }, {
            cN: "tag",
            b: e,
            r: 0
        }, {
            cN: "rules",
            b: "{",
            e: "}",
            i: "[^\\s]",
            r: 0,
            c: [t.CBLCLM, {
                cN: "rule",
                b: "[^\\s]",
                rB: !0,
                e: ";",
                eW: !0,
                c: [{
                    cN: "attribute",
                    b: "[A-Z\\_\\.\\-]+",
                    e: ":",
                    eE: !0,
                    i: "[^\\s]",
                    starts: {
                        cN: "value",
                        eW: !0,
                        eE: !0,
                        c: [n, t.NM, t.QSM, t.ASM, t.CBLCLM, {
                            cN: "hexcolor",
                            b: "#[0-9A-Fa-f]+"
                        }, {
                            cN: "important",
                            b: "!important"
                        }]
                    }
                }]
            }]
        }]
    }
}), hljs.registerLanguage("profile", function(t) {
    return {
        c: [t.CNM, {
            cN: "built_in",
            b: "{",
            e: "}$",
            eB: !0,
            eE: !0,
            c: [t.ASM, t.QSM],
            r: 0
        }, {
            cN: "filename",
            b: "[a-zA-Z_][\\da-zA-Z_]+\\.[\\da-zA-Z_]{1,3}",
            e: ":",
            eE: !0
        }, {
            cN: "header",
            b: "(ncalls|tottime|cumtime)",
            e: "$",
            k: "ncalls tottime|10 cumtime|10 filename",
            r: 10
        }, {
            cN: "summary",
            b: "function calls",
            e: "$",
            c: [t.CNM],
            r: 10
        }, t.ASM, t.QSM, {
            cN: "function",
            b: "\\(",
            e: "\\)$",
            c: [t.UTM],
            r: 0
        }]
    }
}), hljs.registerLanguage("http", function(t) {
    return {
        i: "\\S",
        c: [{
            cN: "status",
            b: "^HTTP/[0-9\\.]+",
            e: "$",
            c: [{
                cN: "number",
                b: "\\b\\d{3}\\b"
            }]
        }, {
            cN: "request",
            b: "^[A-Z]+ (.*?) HTTP/[0-9\\.]+$",
            rB: !0,
            e: "$",
            c: [{
                cN: "string",
                b: " ",
                e: " ",
                eB: !0,
                eE: !0
            }]
        }, {
            cN: "attribute",
            b: "^\\w",
            e: ": ",
            eE: !0,
            i: "\\n|\\s|=",
            starts: {
                cN: "string",
                e: "$"
            }
        }, {
            b: "\\n\\n",
            starts: {
                sL: "",
                eW: !0
            }
        }]
    }
}), hljs.registerLanguage("java", function(t) {
    var e = "false synchronized int abstract float private char boolean static null if const for true while long throw strictfp finally protected import native final return void enum else break transient new catch instanceof byte super volatile case assert short package default double public try this switch continue throws";
    return {
        k: e,
        i: /<\//,
        c: [{
            cN: "javadoc",
            b: "/\\*\\*",
            e: "\\*/",
            c: [{
                cN: "javadoctag",
                b: "(^|\\s)@[A-Za-z]+"
            }],
            r: 10
        }, t.CLCM, t.CBLCLM, t.ASM, t.QSM, {
            bK: "protected public private",
            e: /[{;=]/,
            k: e,
            c: [{
                cN: "class",
                bK: "class interface",
                eW: !0,
                i: /[:"<>]/,
                c: [{
                    bK: "extends implements",
                    r: 10
                }, t.UTM]
            }, {
                b: t.UIR + "\\s*\\(",
                rB: !0,
                c: [t.UTM]
            }]
        }, t.CNM, {
            cN: "annotation",
            b: "@[A-Za-z]+"
        }]
    }
}), hljs.registerLanguage("php", function(t) {
    var e = {
            cN: "variable",
            b: "\\$+[a-zA-Z_-ÿ][a-zA-Z0-9_-ÿ]*"
        },
        n = {
            cN: "preprocessor",
            b: /<\?(php)?|\?>/
        },
        r = {
            cN: "string",
            c: [t.BE, n],
            v: [{
                b: 'b"',
                e: '"'
            }, {
                b: "b'",
                e: "'"
            }, t.inherit(t.ASM, {
                i: null
            }), t.inherit(t.QSM, {
                i: null
            })]
        },
        i = {
            v: [t.BNM, t.CNM]
        };
    return {
        cI: !0,
        k: "and include_once list abstract global private echo interface as static endswitch array null if endwhile or const for endforeach self var while isset public protected exit foreach throw elseif include __FILE__ empty require_once do xor return parent clone use __CLASS__ __LINE__ else break print eval new catch __METHOD__ case exception default die require __FUNCTION__ enddeclare final try switch continue endfor endif declare unset true false trait goto instanceof insteadof __DIR__ __NAMESPACE__ yield finally",
        c: [t.CLCM, t.HCM, {
            cN: "comment",
            b: "/\\*",
            e: "\\*/",
            c: [{
                cN: "phpdoc",
                b: "\\s@[A-Za-z]+"
            }, n]
        }, {
            cN: "comment",
            b: "__halt_compiler.+?;",
            eW: !0,
            k: "__halt_compiler",
            l: t.UIR
        }, {
            cN: "string",
            b: "<<<['\"]?\\w+['\"]?$",
            e: "^\\w+;",
            c: [t.BE]
        }, n, e, {
            cN: "function",
            bK: "function",
            e: /[;{]/,
            i: "\\$|\\[|%",
            c: [t.UTM, {
                cN: "params",
                b: "\\(",
                e: "\\)",
                c: ["self", e, t.CBLCLM, r, i]
            }]
        }, {
            cN: "class",
            bK: "class interface",
            e: "{",
            i: /[:\(\$"]/,
            c: [{
                bK: "extends implements",
                r: 10
            }, t.UTM]
        }, {
            bK: "namespace",
            e: ";",
            i: /[\.']/,
            c: [t.UTM]
        }, {
            bK: "use",
            e: ";",
            c: [t.UTM]
        }, {
            b: "=>"
        }, r, i]
    }
}), hljs.registerLanguage("python", function(t) {
    var e = {
            cN: "prompt",
            b: /^(>>>|\.\.\.) /
        },
        n = {
            cN: "string",
            c: [t.BE],
            v: [{
                b: /(u|b)?r?'''/,
                e: /'''/,
                c: [e],
                r: 10
            }, {
                b: /(u|b)?r?"""/,
                e: /"""/,
                c: [e],
                r: 10
            }, {
                b: /(u|r|ur)'/,
                e: /'/,
                r: 10
            }, {
                b: /(u|r|ur)"/,
                e: /"/,
                r: 10
            }, {
                b: /(b|br)'/,
                e: /'/
            }, {
                b: /(b|br)"/,
                e: /"/
            }, t.ASM, t.QSM]
        },
        r = {
            cN: "number",
            r: 0,
            v: [{
                b: t.BNR + "[lLjJ]?"
            }, {
                b: "\\b(0o[0-7]+)[lLjJ]?"
            }, {
                b: t.CNR + "[lLjJ]?"
            }]
        },
        i = {
            cN: "params",
            b: /\(/,
            e: /\)/,
            c: ["self", e, r, n]
        },
        o = {
            e: /:/,
            i: /[${=;\n]/,
            c: [t.UTM, i]
        };
    return {
        k: {
            keyword: "and elif is global as in if from raise for except finally print import pass return exec else break not with class assert yield try while continue del or def lambda nonlocal|10 None True False",
            built_in: "Ellipsis NotImplemented"
        },
        i: /(<\/|->|\?)/,
        c: [e, r, n, t.HCM, t.inherit(o, {
            cN: "function",
            bK: "def",
            r: 10
        }), t.inherit(o, {
            cN: "class",
            bK: "class"
        }), {
            cN: "decorator",
            b: /@/,
            e: /$/
        }, {
            b: /\b(print|exec)\(/
        }]
    }
}), hljs.registerLanguage("tex", function(t) {
    var e = {
            cN: "command",
            b: "\\\\[a-zA-Zа-яА-я]+[\\*]?"
        },
        n = {
            cN: "command",
            b: "\\\\[^a-zA-Zа-яА-я0-9]"
        },
        r = {
            cN: "special",
            b: "[{}\\[\\]\\&#~]",
            r: 0
        };
    return {
        c: [{
            b: "\\\\[a-zA-Zа-яА-я]+[\\*]? *= *-?\\d*\\.?\\d+(pt|pc|mm|cm|in|dd|cc|ex|em)?",
            rB: !0,
            c: [e, n, {
                cN: "number",
                b: " *=",
                e: "-?\\d*\\.?\\d+(pt|pc|mm|cm|in|dd|cc|ex|em)?",
                eB: !0
            }],
            r: 10
        }, e, n, r, {
            cN: "formula",
            b: "\\$\\$",
            e: "\\$\\$",
            c: [e, n, r],
            r: 0
        }, {
            cN: "formula",
            b: "\\$",
            e: "\\$",
            c: [e, n, r],
            r: 0
        }, {
            cN: "comment",
            b: "%",
            e: "$",
            r: 0
        }]
    }
}), hljs.registerLanguage("sql", function(t) {
    return {
        cI: !0,
        i: /[<>]/,
        c: [{
            cN: "operator",
            b: "\\b(begin|end|start|commit|rollback|savepoint|lock|alter|create|drop|rename|call|delete|do|handler|insert|load|replace|select|truncate|update|set|show|pragma|grant|merge)\\b(?!:)",
            e: ";",
            eW: !0,
            k: {
                keyword: "all partial global month current_timestamp using go revoke smallint indicator end-exec disconnect zone with character assertion to add current_user usage input local alter match collate real then rollback get read timestamp session_user not integer bit unique day minute desc insert execute like ilike|2 level decimal drop continue isolation found where constraints domain right national some module transaction relative second connect escape close system_user for deferred section cast current sqlstate allocate intersect deallocate numeric public preserve full goto initially asc no key output collation group by union session both last language constraint column of space foreign deferrable prior connection unknown action commit view or first into float year primary cascaded except restrict set references names table outer open select size are rows from prepare distinct leading create only next inner authorization schema corresponding option declare precision immediate else timezone_minute external varying translation true case exception join hour default double scroll value cursor descriptor values dec fetch procedure delete and false int is describe char as at in varchar null trailing any absolute current_time end grant privileges when cross check write current_date pad begin temporary exec time update catalog user sql date on identity timezone_hour natural whenever interval work order cascade diagnostics nchar having left call do handler load replace truncate start lock show pragma exists number trigger if before after each row merge matched database",
                aggregate: "count sum min max avg"
            },
            c: [{
                cN: "string",
                b: "'",
                e: "'",
                c: [t.BE, {
                    b: "''"
                }]
            }, {
                cN: "string",
                b: '"',
                e: '"',
                c: [t.BE, {
                    b: '""'
                }]
            }, {
                cN: "string",
                b: "`",
                e: "`",
                c: [t.BE]
            }, t.CNM]
        }, t.CBLCLM, {
            cN: "comment",
            b: "--",
            e: "$"
        }]
    }
}), hljs.registerLanguage("ini", function(t) {
    return {
        cI: !0,
        i: /\S/,
        c: [{
            cN: "comment",
            b: ";",
            e: "$"
        }, {
            cN: "title",
            b: "^\\[",
            e: "\\]"
        }, {
            cN: "setting",
            b: "^[a-z0-9\\[\\]_-]+[ \\t]*=[ \\t]*",
            e: "$",
            c: [{
                cN: "value",
                eW: !0,
                k: "on off true false yes no",
                c: [t.QSM, t.NM],
                r: 0
            }]
        }]
    }
}), hljs.registerLanguage("perl", function(t) {
    var e = "getpwent getservent quotemeta msgrcv scalar kill dbmclose undef lc ma syswrite tr send umask sysopen shmwrite vec qx utime local oct semctl localtime readpipe do return format read sprintf dbmopen pop getpgrp not getpwnam rewinddir qqfileno qw endprotoent wait sethostent bless s|0 opendir continue each sleep endgrent shutdown dump chomp connect getsockname die socketpair close flock exists index shmgetsub for endpwent redo lstat msgctl setpgrp abs exit select print ref gethostbyaddr unshift fcntl syscall goto getnetbyaddr join gmtime symlink semget splice x|0 getpeername recv log setsockopt cos last reverse gethostbyname getgrnam study formline endhostent times chop length gethostent getnetent pack getprotoent getservbyname rand mkdir pos chmod y|0 substr endnetent printf next open msgsnd readdir use unlink getsockopt getpriority rindex wantarray hex system getservbyport endservent int chr untie rmdir prototype tell listen fork shmread ucfirst setprotoent else sysseek link getgrgid shmctl waitpid unpack getnetbyname reset chdir grep split require caller lcfirst until warn while values shift telldir getpwuid my getprotobynumber delete and sort uc defined srand accept package seekdir getprotobyname semop our rename seek if q|0 chroot sysread setpwent no crypt getc chown sqrt write setnetent setpriority foreach tie sin msgget map stat getlogin unless elsif truncate exec keys glob tied closedirioctl socket readlink eval xor readline binmode setservent eof ord bind alarm pipe atan2 getgrent exp time push setgrent gt lt or ne m|0 break given say state when",
        n = {
            cN: "subst",
            b: "[$@]\\{",
            e: "\\}",
            k: e
        },
        r = {
            b: "->{",
            e: "}"
        },
        i = {
            cN: "variable",
            v: [{
                b: /\$\d/
            }, {
                b: /[\$\%\@\*](\^\w\b|#\w+(\:\:\w+)*|{\w+}|\w+(\:\:\w*)*)/
            }, {
                b: /[\$\%\@\*][^\s\w{]/,
                r: 0
            }]
        },
        o = {
            cN: "comment",
            b: "^(__END__|__DATA__)",
            e: "\\n$",
            r: 5
        },
        a = [t.BE, n, i],
        s = [i, t.HCM, o, {
            cN: "comment",
            b: "^\\=\\w",
            e: "\\=cut",
            eW: !0
        }, r, {
            cN: "string",
            c: a,
            v: [{
                b: "q[qwxr]?\\s*\\(",
                e: "\\)",
                r: 5
            }, {
                b: "q[qwxr]?\\s*\\[",
                e: "\\]",
                r: 5
            }, {
                b: "q[qwxr]?\\s*\\{",
                e: "\\}",
                r: 5
            }, {
                b: "q[qwxr]?\\s*\\|",
                e: "\\|",
                r: 5
            }, {
                b: "q[qwxr]?\\s*\\<",
                e: "\\>",
                r: 5
            }, {
                b: "qw\\s+q",
                e: "q",
                r: 5
            }, {
                b: "'",
                e: "'",
                c: [t.BE]
            }, {
                b: '"',
                e: '"'
            }, {
                b: "`",
                e: "`",
                c: [t.BE]
            }, {
                b: "{\\w+}",
                c: [],
                r: 0
            }, {
                b: "-?\\w+\\s*\\=\\>",
                c: [],
                r: 0
            }]
        }, {
            cN: "number",
            b: "(\\b0[0-7_]+)|(\\b0x[0-9a-fA-F_]+)|(\\b[1-9][0-9_]*(\\.[0-9_]+)?)|[0_]\\b",
            r: 0
        }, {
            b: "(\\/\\/|" + t.RSR + "|\\b(split|return|print|reverse|grep)\\b)\\s*",
            k: "split return print reverse grep",
            r: 0,
            c: [t.HCM, o, {
                cN: "regexp",
                b: "(s|tr|y)/(\\\\.|[^/])*/(\\\\.|[^/])*/[a-z]*",
                r: 10
            }, {
                cN: "regexp",
                b: "(m|qr)?/",
                e: "/[a-z]*",
                c: [t.BE],
                r: 0
            }]
        }, {
            cN: "sub",
            bK: "sub",
            e: "(\\s*\\(.*?\\))?[;{]",
            r: 5
        }, {
            cN: "operator",
            b: "-\\w\\b",
            r: 0
        }];
    return n.c = s, r.c = s, {
        k: e,
        c: s
    }
}), hljs.registerLanguage("objectivec", function(t) {
    var e = {
            keyword: "int float while char export sizeof typedef const struct for union unsigned long volatile static bool mutable if do return goto void enum else break extern asm case short default double register explicit signed typename this switch continue wchar_t inline readonly assign self synchronized id nonatomic super unichar IBOutlet IBAction strong weak @private @protected @public @try @property @end @throw @catch @finally @synthesize @dynamic @selector @optional @required",
            literal: "false true FALSE TRUE nil YES NO NULL",
            built_in: "NSString NSDictionary CGRect CGPoint UIButton UILabel UITextView UIWebView MKMapView UISegmentedControl NSObject UITableViewDelegate UITableViewDataSource NSThread UIActivityIndicator UITabbar UIToolBar UIBarButtonItem UIImageView NSAutoreleasePool UITableView BOOL NSInteger CGFloat NSException NSLog NSMutableString NSMutableArray NSMutableDictionary NSURL NSIndexPath CGSize UITableViewCell UIView UIViewController UINavigationBar UINavigationController UITabBarController UIPopoverController UIPopoverControllerDelegate UIImage NSNumber UISearchBar NSFetchedResultsController NSFetchedResultsChangeType UIScrollView UIScrollViewDelegate UIEdgeInsets UIColor UIFont UIApplication NSNotFound NSNotificationCenter NSNotification UILocalNotification NSBundle NSFileManager NSTimeInterval NSDate NSCalendar NSUserDefaults UIWindow NSRange NSArray NSError NSURLRequest NSURLConnection UIInterfaceOrientation MPMoviePlayerController dispatch_once_t dispatch_queue_t dispatch_sync dispatch_async dispatch_once"
        },
        n = /[a-zA-Z@][a-zA-Z0-9_]*/,
        r = "@interface @class @protocol @implementation";
    return {
        k: e,
        l: n,
        i: "</",
        c: [t.CLCM, t.CBLCLM, t.CNM, t.QSM, {
            cN: "string",
            b: "'",
            e: "[^\\\\]'",
            i: "[^\\\\][^']"
        }, {
            cN: "preprocessor",
            b: "#import",
            e: "$",
            c: [{
                cN: "title",
                b: '"',
                e: '"'
            }, {
                cN: "title",
                b: "<",
                e: ">"
            }]
        }, {
            cN: "preprocessor",
            b: "#",
            e: "$"
        }, {
            cN: "class",
            b: "(" + r.split(" ").join("|") + ")\\b",
            e: "({|$)",
            k: r,
            l: n,
            c: [t.UTM]
        }, {
            cN: "variable",
            b: "\\." + t.UIR,
            r: 0
        }]
    }
}), hljs.registerLanguage("coffeescript", function(t) {
    var e = {
            keyword: "in if for while finally new do return else break catch instanceof throw try this switch continue typeof delete debugger super then unless until loop of by when and or is isnt not",
            literal: "true false null undefined yes no on off",
            reserved: "case default function var void with const let enum export import native __hasProp __extends __slice __bind __indexOf",
            built_in: "npm require console print module exports global window document"
        },
        n = "[A-Za-z$_][0-9A-Za-z$_]*",
        r = t.inherit(t.TM, {
            b: n
        }),
        i = {
            cN: "subst",
            b: /#\{/,
            e: /}/,
            k: e
        },
        o = [t.BNM, t.inherit(t.CNM, {
            starts: {
                e: "(\\s*/)?",
                r: 0
            }
        }), {
            cN: "string",
            v: [{
                b: /'''/,
                e: /'''/,
                c: [t.BE]
            }, {
                b: /'/,
                e: /'/,
                c: [t.BE]
            }, {
                b: /"""/,
                e: /"""/,
                c: [t.BE, i]
            }, {
                b: /"/,
                e: /"/,
                c: [t.BE, i]
            }]
        }, {
            cN: "regexp",
            v: [{
                b: "///",
                e: "///",
                c: [i, t.HCM]
            }, {
                b: "//[gim]*",
                r: 0
            }, {
                b: "/\\S(\\\\.|[^\\n])*?/[gim]*(?=\\s|\\W|$)"
            }]
        }, {
            cN: "property",
            b: "@" + n
        }, {
            b: "`",
            e: "`",
            eB: !0,
            eE: !0,
            sL: "javascript"
        }];
    return i.c = o, {
        k: e,
        c: o.concat([{
            cN: "comment",
            b: "###",
            e: "###"
        }, t.HCM, {
            cN: "function",
            b: "(" + n + "\\s*=\\s*)?(\\(.*\\))?\\s*\\B[-=]>",
            e: "[-=]>",
            rB: !0,
            c: [r, {
                cN: "params",
                b: "\\(",
                rB: !0,
                c: [{
                    b: /\(/,
                    e: /\)/,
                    k: e,
                    c: ["self"].concat(o)
                }]
            }]
        }, {
            cN: "class",
            bK: "class",
            e: "$",
            i: /[:="\[\]]/,
            c: [{
                bK: "extends",
                eW: !0,
                i: /[:="\[\]]/,
                c: [r]
            }, r]
        }, {
            cN: "attribute",
            b: n + ":",
            e: ":",
            rB: !0,
            eE: !0,
            r: 0
        }])
    }
}), hljs.registerLanguage("nginx", function(t) {
    var e = {
            cN: "variable",
            v: [{
                b: /\$\d+/
            }, {
                b: /\$\{/,
                e: /}/
            }, {
                b: "[\\$\\@]" + t.UIR
            }]
        },
        n = {
            eW: !0,
            l: "[a-z/_]+",
            k: {
                built_in: "on off yes no true false none blocked debug info notice warn error crit select break last permanent redirect kqueue rtsig epoll poll /dev/poll"
            },
            r: 0,
            i: "=>",
            c: [t.HCM, {
                cN: "string",
                c: [t.BE, e],
                v: [{
                    b: /"/,
                    e: /"/
                }, {
                    b: /'/,
                    e: /'/
                }]
            }, {
                cN: "url",
                b: "([a-z]+):/",
                e: "\\s",
                eW: !0,
                eE: !0
            }, {
                cN: "regexp",
                c: [t.BE, e],
                v: [{
                    b: "\\s\\^",
                    e: "\\s|{|;",
                    rE: !0
                }, {
                    b: "~\\*?\\s+",
                    e: "\\s|{|;",
                    rE: !0
                }, {
                    b: "\\*(\\.[a-z\\-]+)+"
                }, {
                    b: "([a-z\\-]+\\.)+\\*"
                }]
            }, {
                cN: "number",
                b: "\\b\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}(:\\d{1,5})?\\b"
            }, {
                cN: "number",
                b: "\\b\\d+[kKmMgGdshdwy]*\\b",
                r: 0
            }, e]
        };
    return {
        c: [t.HCM, {
            b: t.UIR + "\\s",
            e: ";|{",
            rB: !0,
            c: [t.inherit(t.UTM, {
                starts: n
            })],
            r: 0
        }],
        i: "[^\\s\\}]"
    }
}), hljs.registerLanguage("json", function(t) {
    var e = {
            literal: "true false null"
        },
        n = [t.QSM, t.CNM],
        r = {
            cN: "value",
            e: ",",
            eW: !0,
            eE: !0,
            c: n,
            k: e
        },
        i = {
            b: "{",
            e: "}",
            c: [{
                cN: "attribute",
                b: '\\s*"',
                e: '"\\s*:\\s*',
                eB: !0,
                eE: !0,
                c: [t.BE],
                i: "\\n",
                starts: r
            }],
            i: "\\S"
        },
        o = {
            b: "\\[",
            e: "\\]",
            c: [t.inherit(r, {
                cN: null
            })],
            i: "\\S"
        };
    return n.splice(n.length, 0, i, o), {
        c: n,
        k: e,
        i: "\\S"
    }
}), hljs.registerLanguage("apache", function(t) {
    var e = {
        cN: "number",
        b: "[\\$%]\\d+"
    };
    return {
        cI: !0,
        c: [t.HCM, {
            cN: "tag",
            b: "</?",
            e: ">"
        }, {
            cN: "keyword",
            b: /\w+/,
            r: 0,
            k: {
                common: "order deny allow setenv rewriterule rewriteengine rewritecond documentroot sethandler errordocument loadmodule options header listen serverroot servername"
            },
            starts: {
                e: /$/,
                r: 0,
                k: {
                    literal: "on off all"
                },
                c: [{
                    cN: "sqbracket",
                    b: "\\s\\[",
                    e: "\\]$"
                }, {
                    cN: "cbracket",
                    b: "[\\$%]\\{",
                    e: "\\}",
                    c: ["self", e]
                }, e, t.QSM]
            }
        }],
        i: /\S/
    }
}), hljs.registerLanguage("scss", function(t) {
    var e = "[a-zA-Z-][a-zA-Z0-9_-]*",
        n = {
            cN: "function",
            b: e + "\\(",
            e: "\\)",
            c: ["self", t.NM, t.ASM, t.QSM]
        },
        r = {
            cN: "hexcolor",
            b: "#[0-9A-Fa-f]+"
        },
        i = {
            cN: "attribute",
            b: "[A-Z\\_\\.\\-]+",
            e: ":",
            eE: !0,
            i: "[^\\s]",
            starts: {
                cN: "value",
                eW: !0,
                eE: !0,
                c: [n, r, t.NM, t.QSM, t.ASM, t.CBLCLM, {
                    cN: "important",
                    b: "!important"
                }]
            }
        };
    return {
        cI: !0,
        i: "[=/|']",
        c: [t.CLCM, t.CBLCLM, {
            cN: "function",
            b: e + "\\(",
            e: "\\)",
            c: ["self", t.NM, t.ASM, t.QSM]
        }, {
            cN: "id",
            b: "\\#[A-Za-z0-9_-]+",
            r: 0
        }, {
            cN: "class",
            b: "\\.[A-Za-z0-9_-]+",
            r: 0
        }, {
            cN: "attr_selector",
            b: "\\[",
            e: "\\]",
            i: "$"
        }, {
            cN: "tag",
            b: "\\b(a|abbr|acronym|address|area|article|aside|audio|b|base|big|blockquote|body|br|button|canvas|caption|cite|code|col|colgroup|command|datalist|dd|del|details|dfn|div|dl|dt|em|embed|fieldset|figcaption|figure|footer|form|frame|frameset|(h[1-6])|head|header|hgroup|hr|html|i|iframe|img|input|ins|kbd|keygen|label|legend|li|link|map|mark|meta|meter|nav|noframes|noscript|object|ol|optgroup|option|output|p|param|pre|progress|q|rp|rt|ruby|samp|script|section|select|small|span|strike|strong|style|sub|sup|table|tbody|td|textarea|tfoot|th|thead|time|title|tr|tt|ul|var|video)\\b",
            r: 0
        }, {
            cN: "pseudo",
            b: ":(visited|valid|root|right|required|read-write|read-only|out-range|optional|only-of-type|only-child|nth-of-type|nth-last-of-type|nth-last-child|nth-child|not|link|left|last-of-type|last-child|lang|invalid|indeterminate|in-range|hover|focus|first-of-type|first-line|first-letter|first-child|first|enabled|empty|disabled|default|checked|before|after|active)"
        }, {
            cN: "pseudo",
            b: "::(after|before|choices|first-letter|first-line|repeat-index|repeat-item|selection|value)"
        }, {
            cN: "attribute",
            b: "\\b(z-index|word-wrap|word-spacing|word-break|width|widows|white-space|visibility|vertical-align|unicode-bidi|transition-timing-function|transition-property|transition-duration|transition-delay|transition|transform-style|transform-origin|transform|top|text-underline-position|text-transform|text-shadow|text-rendering|text-overflow|text-indent|text-decoration-style|text-decoration-line|text-decoration-color|text-decoration|text-align-last|text-align|tab-size|table-layout|right|resize|quotes|position|pointer-events|perspective-origin|perspective|page-break-inside|page-break-before|page-break-after|padding-top|padding-right|padding-left|padding-bottom|padding|overflow-y|overflow-x|overflow-wrap|overflow|outline-width|outline-style|outline-offset|outline-color|outline|orphans|order|opacity|object-position|object-fit|normal|none|nav-up|nav-right|nav-left|nav-index|nav-down|min-width|min-height|max-width|max-height|mask|marks|margin-top|margin-right|margin-left|margin-bottom|margin|list-style-type|list-style-position|list-style-image|list-style|line-height|letter-spacing|left|justify-content|initial|inherit|ime-mode|image-orientation|image-resolution|image-rendering|icon|hyphens|height|font-weight|font-variant-ligatures|font-variant|font-style|font-stretch|font-size-adjust|font-size|font-language-override|font-kerning|font-feature-settings|font-family|font|float|flex-wrap|flex-shrink|flex-grow|flex-flow|flex-direction|flex-basis|flex|filter|empty-cells|display|direction|cursor|counter-reset|counter-increment|content|column-width|column-span|column-rule-width|column-rule-style|column-rule-color|column-rule|column-gap|column-fill|column-count|columns|color|clip-path|clip|clear|caption-side|break-inside|break-before|break-after|box-sizing|box-shadow|box-decoration-break|bottom|border-width|border-top-width|border-top-style|border-top-right-radius|border-top-left-radius|border-top-color|border-top|border-style|border-spacing|border-right-width|border-right-style|border-right-color|border-right|border-radius|border-left-width|border-left-style|border-left-color|border-left|border-image-width|border-image-source|border-image-slice|border-image-repeat|border-image-outset|border-image|border-color|border-collapse|border-bottom-width|border-bottom-style|border-bottom-right-radius|border-bottom-left-radius|border-bottom-color|border-bottom|border|background-size|background-repeat|background-position|background-origin|background-image|background-color|background-clip|background-attachment|background|backface-visibility|auto|animation-timing-function|animation-play-state|animation-name|animation-iteration-count|animation-fill-mode|animation-duration|animation-direction|animation-delay|animation|align-self|align-items|align-content)\\b",
            i: "[^\\s]"
        }, {
            cN: "value",
            b: "\\b(whitespace|wait|w-resize|visible|vertical-text|vertical-ideographic|uppercase|upper-roman|upper-alpha|underline|transparent|top|thin|thick|text|text-top|text-bottom|tb-rl|table-header-group|table-footer-group|sw-resize|super|strict|static|square|solid|small-caps|separate|se-resize|scroll|s-resize|rtl|row-resize|ridge|right|repeat|repeat-y|repeat-x|relative|progress|pointer|overline|outside|outset|oblique|nowrap|not-allowed|normal|none|nw-resize|no-repeat|no-drop|newspaper|ne-resize|n-resize|move|middle|medium|ltr|lr-tb|lowercase|lower-roman|lower-alpha|loose|list-item|line|line-through|line-edge|lighter|left|keep-all|justify|italic|inter-word|inter-ideograph|inside|inset|inline|inline-block|inherit|inactive|ideograph-space|ideograph-parenthesis|ideograph-numeric|ideograph-alpha|horizontal|hidden|help|hand|groove|fixed|ellipsis|e-resize|double|dotted|distribute|distribute-space|distribute-letter|distribute-all-lines|disc|disabled|default|decimal|dashed|crosshair|collapse|col-resize|circle|char|center|capitalize|break-word|break-all|bottom|both|bolder|bold|block|bidi-override|below|baseline|auto|always|all-scroll|absolute|table|table-cell)\\b"
        }, {
            cN: "value",
            b: ":",
            e: ";",
            c: [r, t.NM, t.QSM, t.ASM, {
                cN: "important",
                b: "!important"
            }]
        }, {
            cN: "at_rule",
            b: "@",
            e: "[{;]",
            k: "mixin include extend for if else each while charset import debug media page content font-face namespace warn",
            c: [n, t.QSM, t.ASM, r, t.NM, {
                cN: "preprocessor",
                b: "\\s[A-Za-z0-9_.-]+",
                r: 0
            }]
        }]
    }
}), hljs.registerLanguage("applescript", function(t) {
    var e = t.inherit(t.QSM, {
            i: ""
        }),
        n = {
            cN: "params",
            b: "\\(",
            e: "\\)",
            c: ["self", t.CNM, e]
        },
        r = [{
            cN: "comment",
            b: "--",
            e: "$"
        }, {
            cN: "comment",
            b: "\\(\\*",
            e: "\\*\\)",
            c: ["self", {
                b: "--",
                e: "$"
            }]
        }, t.HCM];
    return {
        k: {
            keyword: "about above after against and around as at back before beginning behind below beneath beside between but by considering contain contains continue copy div does eighth else end equal equals error every exit fifth first for fourth from front get given global if ignoring in into is it its last local me middle mod my ninth not of on onto or over prop property put ref reference repeat returning script second set seventh since sixth some tell tenth that the then third through thru timeout times to transaction try until where while whose with without",
            constant: "AppleScript false linefeed return pi quote result space tab true",
            type: "alias application boolean class constant date file integer list number real record string text",
            command: "activate beep count delay launch log offset read round run say summarize write",
            property: "character characters contents day frontmost id item length month name paragraph paragraphs rest reverse running time version weekday word words year"
        },
        c: [e, t.CNM, {
            cN: "type",
            b: "\\bPOSIX file\\b"
        }, {
            cN: "command",
            b: "\\b(clipboard info|the clipboard|info for|list (disks|folder)|mount volume|path to|(close|open for) access|(get|set) eof|current date|do shell script|get volume settings|random number|set volume|system attribute|system info|time to GMT|(load|run|store) script|scripting components|ASCII (character|number)|localized string|choose (application|color|file|file name|folder|from list|remote application|URL)|display (alert|dialog))\\b|^\\s*return\\b"
        }, {
            cN: "constant",
            b: "\\b(text item delimiters|current application|missing value)\\b"
        }, {
            cN: "keyword",
            b: "\\b(apart from|aside from|instead of|out of|greater than|isn't|(doesn't|does not) (equal|come before|come after|contain)|(greater|less) than( or equal)?|(starts?|ends|begins?) with|contained by|comes (before|after)|a (ref|reference))\\b"
        }, {
            cN: "property",
            b: "\\b(POSIX path|(date|time) string|quoted form)\\b"
        }, {
            cN: "function_start",
            bK: "on",
            i: "[${=;\\n]",
            c: [t.UTM, n]
        }].concat(r),
        i: "//"
    }
}), hljs.registerLanguage("cpp", function(t) {
    var e = {
        keyword: "false int float while private char catch export virtual operator sizeof dynamic_cast|10 typedef const_cast|10 const struct for static_cast|10 union namespace unsigned long throw volatile static protected bool template mutable if public friend do return goto auto void enum else break new extern using true class asm case typeid short reinterpret_cast|10 default double register explicit signed typename try this switch continue wchar_t inline delete alignof char16_t char32_t constexpr decltype noexcept nullptr static_assert thread_local restrict _Bool complex _Complex _Imaginary",
        built_in: "std string cin cout cerr clog stringstream istringstream ostringstream auto_ptr deque list queue stack vector map set bitset multiset multimap unordered_set unordered_map unordered_multiset unordered_multimap array shared_ptr abort abs acos asin atan2 atan calloc ceil cosh cos exit exp fabs floor fmod fprintf fputs free frexp fscanf isalnum isalpha iscntrl isdigit isgraph islower isprint ispunct isspace isupper isxdigit tolower toupper labs ldexp log10 log malloc memchr memcmp memcpy memset modf pow printf putchar puts scanf sinh sin snprintf sprintf sqrt sscanf strcat strchr strcmp strcpy strcspn strlen strncat strncmp strncpy strpbrk strrchr strspn strstr tanh tan vfprintf vprintf vsprintf"
    };
    return {
        aliases: ["c"],
        k: e,
        i: "</",
        c: [t.CLCM, t.CBLCLM, t.QSM, {
            cN: "string",
            b: "'\\\\?.",
            e: "'",
            i: "."
        }, {
            cN: "number",
            b: "\\b(\\d+(\\.\\d*)?|\\.\\d+)(u|U|l|L|ul|UL|f|F)"
        }, t.CNM, {
            cN: "preprocessor",
            b: "#",
            e: "$",
            c: [{
                b: "include\\s*<",
                e: ">",
                i: "\\n"
            }, t.CLCM]
        }, {
            cN: "stl_container",
            b: "\\b(deque|list|queue|stack|vector|map|set|bitset|multiset|multimap|unordered_map|unordered_set|unordered_multiset|unordered_multimap|array)\\s*<",
            e: ">",
            k: e,
            r: 10,
            c: ["self"]
        }]
    }
}), hljs.registerLanguage("makefile", function(t) {
    var e = {
        cN: "variable",
        b: /\$\(/,
        e: /\)/,
        c: [t.BE]
    };
    return {
        c: [t.HCM, {
            b: /^\w+\s*\W*=/,
            rB: !0,
            r: 0,
            starts: {
                cN: "constant",
                e: /\s*\W*=/,
                eE: !0,
                starts: {
                    e: /$/,
                    r: 0,
                    c: [e]
                }
            }
        }, {
            cN: "title",
            b: /^[\w]+:\s*$/
        }, {
            cN: "phony",
            b: /^\.PHONY:/,
            e: /$/,
            k: ".PHONY",
            l: /[\.\w]+/
        }, {
            b: /^\t+/,
            e: /$/,
            c: [t.QSM, e]
        }]
    }
}), hljs.initHighlightingOnLoad(), $(function() {
    $("select#sortBy").change(function(t) {
        var e = $("#ticketTableSortingForm");
        $("input#sortDesc").attr("value", "False"), e.submit()
    }), $("button#sortDescendingButton").bind("click", function(t) {
        var e = $("#ticketTableSortingForm");
        $("input#sortDesc").attr("value", "True"), e.submit()
    }), $("button#sortAscendingButton").bind("click", function(t) {
        var e = $("#ticketTableSortingForm");
        $("input#sortDesc").attr("value", "False"), e.submit()
    })
}), $(function() {
    $(document.body).on("click", "a.changePriorityLink", function() {
        var t = $(this).closest("div.singleTicket"),
            e = t.attr("class"),
            n = $(this).text(),
            r = $(this).closest(".dropdown-menu");
        r.find("li.hidden").toggleClass("hidden"), $(this).closest("li").toggleClass("hidden"), e.indexOf("border-red") >= 0 ? (t.toggleClass("border-red"), t.find(".priorityLabel").toggleClass("red")) : e.indexOf("border-yellow") >= 0 ? (t.toggleClass("border-yellow"), t.find(".priorityLabel").toggleClass("yellow")) : e.indexOf("border-green") >= 0 ? (t.toggleClass("border-green"), t.find(".priorityLabel").toggleClass("green")) : e.indexOf("border-blue") >= 0 && (t.toggleClass("border-blue"), t.find(".priorityLabel").toggleClass("blue")), n.indexOf("critical") >= 0 ? (t.toggleClass("border-green"), t.find(".priorityLabel").toggleClass("green"), t.find(".priorityLabel").html("<strong>CRITICAL</strong>")) : n.indexOf("important") >= 0 ? (t.toggleClass("border-yellow"), t.find(".priorityLabel").toggleClass("yellow"), t.find(".priorityLabel").html("<strong>IMPORTANT</strong>")) : n.indexOf("useful") >= 0 ? (t.toggleClass("border-red"), t.find(".priorityLabel").toggleClass("red"), t.find(".priorityLabel").html("<strong>USEFUL</strong>")) : n.indexOf("high") >= 0 ? (t.toggleClass("border-green"), t.find(".priorityLabel").toggleClass("green"), t.find(".priorityLabel").html("<strong>HIGH</strong>")) : n.indexOf("medium") >= 0 ? (t.toggleClass("border-yellow"), t.find(".priorityLabel").toggleClass("yellow"), t.find(".priorityLabel").html("<strong>MEDIUM</strong>")) : n.indexOf("low") >= 0 ? (t.toggleClass("border-red"), t.find(".priorityLabel").toggleClass("red"), t.find(".priorityLabel").html("<strong>LOW</strong>")) : n.indexOf("none") >= 0 && (t.toggleClass("border-blue"), t.find(".priorityLabel").toggleClass("blue"), t.find(".priorityLabel").html("NONE"))
    })
}), $(function() {
    $(document.body).on("focusout", "input[name='currentMag']", function() {
        var t = $(this).val();
        return t > 20.5 ? (alert("current magnitude must brighter than 20.5 mag"), $(this).val(20.5), !1) : void 0
    }), $(document.body).on("click", "button.generateOBSubmitButton", function() {
        var t = $(this).attr("id");
        setTimeout(function() {
            t = "#" + t, $(t).modal("hide"), $(this).off()
        }, 500)
    })
}), $(function() {
    $(".classificationForm").on("change", "select#clsClassificationWRTMax", function() {
        var t = $(this).val(),
            e = $(this).closest("form").find("#clsClassificationPhase"),
            n = e.closest("div.input-prepend").find("span.add-on");
        if ("post-max" == t || "pre-max" == t) e.removeAttr("disabled"), n.html("post-max" == t ? "+" : "-");
        else {
            var e = $(this).closest("form").find("#clsClassificationPhase");
            e.attr("disabled", !0), n.html("?")
        }
    })
}), $(function() {
    $(".classificationForm").on("change", "select[name='clsClassificationWRTMax']", function() {
        var t = $(this).val(),
            e = $(this).closest("form").find("input[name='clsClassificationPhase']"),
            n = e.closest("div.input-prepend").find("span.add-on");
        "post-max" == t || "pre-max" == t ? (e.removeAttr("disabled"), n.html("post-max" == t ? "+" : "-")) : (e.attr("disabled", !0), n.html("at-max" == t ? "" : "?"))
    })
}), $(function() {
    $(".classificationForm").on("change", "select[name='clsType']", function() {
        var t = $(this).val(),
            e = $(this).closest("form").find("select[name='clsSnClassification']"),
            n = $(this).closest("form").find("input[name='clsPeculiar']");
        "supernova" == t ? (e.removeAttr("disabled"), n.removeAttr("disabled")) : (e.attr("disabled", !0), n.attr("disabled", !0))
    })
});
var _pessto_create_new_ticket_form = function() {
    var t = $("input[name='objectRa']");
    t.blur(function() {
        var e = t.val();
        e.indexOf(":") >= 0 && (e = ra_sex2degrees(e)), $.isNumeric(e) && t.val(e)
    });
    var e = $("input[name='objectDec']");
    e.blur(function() {
        var t = e.val();
        t.indexOf(":") >= 0 && (t = dec_sex2degrees(t)), $.isNumeric(t) && e.val(t)
    })
}();
$(function() {
document.URL.indexOf("/transients") > -1 && (console.log("updating sidebar list counts"), $.post("/marshall/actions/refresh_sidebar_list_counts?method=put"))
}), $(function() {
//   console.log("move to links"), $("a.ticketMoveToLink").bind("click", function(t) {
var e = $(this).attr("notification"),
    e = decodeURIComponent(e),
    n = $("span#dynamicNotification");
n.html(e);
var r = $(this).closest("div.singleTicket");
fade_and_hide(r), $.post("/marshall/actions/refresh_sidebar_list_counts?method=put")
}), $(document.body).on("click", "a.ticketMoveToLinkUndo", function(t) {
var e = $(this).attr("id"),
    n = $("div#" + e);
show_and_unfade(n);
var r = $("span#dynamicNotification");
setTimeout(function() {
    r.show().html("")
}, 200), $.post("/marshall/actions/refresh_sidebar_list_counts?method=put")
})
});
//# sourceMappingURL=./main-min.js.map
