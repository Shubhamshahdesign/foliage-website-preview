/* Foliage Cafe — small enhancements, no dependencies. */
(function () {
  "use strict";

  /* ------------------------------------------------------------------
     Edit here
     NOTICE: one line shown in the yellow bar at the top of the page.
             Leave empty to hide it. Good for Christmas hours,
             bank holidays or a new seasonal special.
     HOURS:  opening hours by weekday (0 = Sunday). null = closed.
     ------------------------------------------------------------------ */
  var NOTICE = "";

  var HOURS = {
    0: ["08:00", "17:00"],
    1: ["08:00", "16:00"],
    2: ["08:00", "16:00"],
    3: ["08:00", "16:00"],
    4: ["08:00", "16:00"],
    5: ["08:00", "16:00"],
    6: ["08:00", "17:00"]
  };

  /* ---------- notice bar ---------- */
  var notice = document.getElementById("notice");
  if (notice && NOTICE.trim()) {
    document.getElementById("notice-text").textContent = NOTICE;
    notice.hidden = false;
    notice.querySelector(".notice__close").addEventListener("click", function () {
      notice.hidden = true;
    });
  }

  /* ---------- mobile nav ---------- */
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("nav");

  function setNav(open) {
    toggle.setAttribute("aria-expanded", String(open));
    nav.classList.toggle("is-open", open);
  }
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      setNav(toggle.getAttribute("aria-expanded") !== "true");
    });
    nav.addEventListener("click", function (e) {
      if (e.target.closest("a")) setNav(false);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") setNav(false);
    });
    window.matchMedia("(min-width: 900px)").addEventListener("change", function () { setNav(false); });
  }

  /* ---------- header border on scroll ---------- */
  var header = document.querySelector(".site-header");
  function onScroll() { header.classList.toggle("is-scrolled", window.scrollY > 8); }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- open / closed, in UK time ---------- */
  function londonNow() {
    var parts = new Intl.DateTimeFormat("en-GB", {
      timeZone: "Europe/London", weekday: "short", hour: "2-digit", minute: "2-digit", hour12: false
    }).formatToParts(new Date());
    var get = function (t) { return (parts.find(function (p) { return p.type === t; }) || {}).value; };
    var days = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };
    return { day: days[get("weekday")], mins: (+get("hour") % 24) * 60 + (+get("minute")) };
  }
  function toMins(hhmm) { var p = hhmm.split(":"); return +p[0] * 60 + +p[1]; }

  var now = londonNow();
  var status = document.getElementById("status");
  if (status) {
    var today = HOURS[now.day];
    var text = status.querySelector(".status__text");
    if (today && now.mins >= toMins(today[0]) && now.mins < toMins(today[1])) {
      status.classList.add("is-open");
      text.innerHTML = "<strong>Open now</strong> &middot; until " + today[1];
    } else {
      status.classList.add("is-closed");
      var next = null;
      if (today && now.mins < toMins(today[0])) next = "today at " + today[0];
      else {
        for (var i = 1; i <= 7; i++) {
          var d = (now.day + i) % 7;
          if (HOURS[d]) { next = (i === 1 ? "tomorrow" : ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"][d]) + " at " + HOURS[d][0]; break; }
        }
      }
      text.innerHTML = "<strong>Closed now</strong>" + (next ? " &middot; opens " + next : "");
    }
  }

  var row = document.querySelector('#hours-body tr[data-day="' + now.day + '"]');
  if (row) row.classList.add("is-today");

  /* ---------- menu filter ---------- */
  var tabs = document.querySelectorAll(".tab");
  var dishes = document.querySelectorAll(".dish");
  tabs.forEach(function (tab) {
    tab.addEventListener("click", function () {
      var f = tab.getAttribute("data-filter");
      tabs.forEach(function (t) {
        var on = t === tab;
        t.classList.toggle("is-active", on);
        t.setAttribute("aria-selected", String(on));
      });
      dishes.forEach(function (d) {
        d.hidden = !(f === "all" || d.getAttribute("data-cat") === f);
      });
    });
  });

  /* ---------- current section in nav ---------- */
  var links = Array.prototype.slice.call(document.querySelectorAll(".nav__list a"));
  if ("IntersectionObserver" in window) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        links.forEach(function (a) {
          a.classList.toggle("is-current", a.getAttribute("href") === "#" + en.target.id);
        });
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    links.forEach(function (a) {
      var sec = document.querySelector(a.getAttribute("href"));
      if (sec) spy.observe(sec);
    });

    /* ---------- gentle reveal ---------- */
    var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!reduce) {
      var targets = document.querySelectorAll(".section-head, .menu-card, .gallery__item, .about__media, .about__copy, .counter__copy, .counter__media, .visit__info, .visit__map");
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) { en.target.classList.add("is-visible"); io.unobserve(en.target); }
        });
      }, { rootMargin: "0px 0px -8% 0px" });
      targets.forEach(function (el) { el.classList.add("reveal"); io.observe(el); });
    }
  }

  /* ---------- year ---------- */
  var y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();
})();

