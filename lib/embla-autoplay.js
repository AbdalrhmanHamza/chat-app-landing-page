!(function (n, t) {
  "object" == typeof exports && "undefined" != typeof module
    ? (module.exports = t())
    : "function" == typeof define && define.amd
    ? define(t)
    : ((n =
        "undefined" != typeof globalThis
          ? globalThis
          : n || self).EmblaCarouselAutoplay = t());
})(this, function () {
  "use strict";
  const n = {
    active: !0,
    breakpoints: {},
    delay: 4e3,
    jump: !1,
    playOnInit: !0,
    stopOnFocusIn: !0,
    stopOnInteraction: !0,
    stopOnMouseEnter: !1,
    stopOnLastSnap: !1,
    rootNode: null,
  };
  function t(o = {}) {
    let e,
      i,
      s,
      l,
      r = null,
      u = 0,
      a = !1,
      c = !1,
      p = !1,
      f = !1;
    function d() {
      s ||
        (g()
          ? (p = !0)
          : (a || i.emit("autoplay:play"),
            (function () {
              const { ownerWindow: n } = i.internalEngine();
              n.clearTimeout(u),
                (u = n.setTimeout(E, l[i.selectedScrollSnap()])),
                (r = new Date().getTime()),
                i.emit("autoplay:timerset");
            })(),
            (a = !0)));
    }
    function m() {
      s ||
        (a && i.emit("autoplay:stop"),
        (function () {
          const { ownerWindow: n } = i.internalEngine();
          n.clearTimeout(u),
            (u = 0),
            (r = null),
            i.emit("autoplay:timerstopped");
        })(),
        (a = !1));
    }
    function y() {
      if (g()) return (p = a), m();
      p && d();
    }
    function g() {
      const { ownerDocument: n } = i.internalEngine();
      return "hidden" === n.visibilityState;
    }
    function O() {
      c || m();
    }
    function S() {
      c || d();
    }
    function w() {
      (c = !0), m();
    }
    function b() {
      (c = !1), d();
    }
    function E() {
      const { index: n } = i.internalEngine(),
        t = n.clone().add(1).get(),
        o = i.scrollSnapList().length - 1,
        s = e.stopOnLastSnap && t === o;
      if (
        (i.canScrollNext() ? i.scrollNext(f) : i.scrollTo(0, f),
        i.emit("autoplay:select"),
        s)
      )
        return m();
      d();
    }
    return {
      name: "autoplay",
      options: o,
      init: function (r, u) {
        i = r;
        const { mergeOptions: a, optionsAtMedia: c } = u,
          p = a(n, t.globalOptions),
          g = a(p, o);
        if (((e = c(g)), i.scrollSnapList().length <= 1)) return;
        (f = e.jump),
          (s = !1),
          (l = (function (n, t) {
            const o = n.scrollSnapList();
            return "number" == typeof t ? o.map(() => t) : t(o, n);
          })(i, e.delay));
        const { eventStore: E, ownerDocument: I } = i.internalEngine(),
          h = !!i.internalEngine().options.watchDrag,
          T = (function (n, t) {
            const o = n.rootNode();
            return (t && t(o)) || o;
          })(i, e.rootNode);
        E.add(I, "visibilitychange", y),
          h && i.on("pointerDown", O),
          h && !e.stopOnInteraction && i.on("pointerUp", S),
          e.stopOnMouseEnter && E.add(T, "mouseenter", w),
          e.stopOnMouseEnter &&
            !e.stopOnInteraction &&
            E.add(T, "mouseleave", b),
          e.stopOnFocusIn && i.on("slideFocusStart", m),
          e.stopOnFocusIn &&
            !e.stopOnInteraction &&
            E.add(i.containerNode(), "focusout", d),
          e.playOnInit && d();
      },
      destroy: function () {
        i.off("pointerDown", O).off("pointerUp", S).off("slideFocusStart", m),
          m(),
          (s = !0),
          (a = !1);
      },
      play: function (n) {
        void 0 !== n && (f = n), d();
      },
      stop: function () {
        a && m();
      },
      reset: function () {
        a && d();
      },
      isPlaying: function () {
        return a;
      },
      timeUntilNext: function () {
        return r
          ? l[i.selectedScrollSnap()] - (new Date().getTime() - r)
          : null;
      },
    };
  }
  return (t.globalOptions = void 0), t;
});
