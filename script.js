/* =========================================================
   VISIONX WEB DEVELOPER — script.js
   Vanilla JS. No dependencies.
   ========================================================= */
(function(){
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------------------------------------------------------
     MEDIA HELPER
     Builds a placeholder-safe image block. If the file at `src`
     doesn't exist yet, the gradient + hint label show instead of
     a broken-image icon. Drop a real photo at the same path and
     it takes over automatically — no markup changes needed.
  --------------------------------------------------------- */
  function mediaHTML(src, alt, grad){
    var style = grad ? ' style="background:' + grad + '"' : '';
    return (
      '<div class="media"' + style + ' data-hint="' + src + '">' +
        '<img src="' + src + '" alt="' + (alt || '') + '" loading="lazy" ' +
          'onerror="this.parentElement.classList.add(\'no-image\')">' +
        '<span class="media-hint">Replace &mdash; ' + src + '</span>' +
      '</div>'
    );
  }

  /* ---------------------------------------------------------
     DATA
  --------------------------------------------------------- */
  var CATEGORIES = [
    { name: "Hotels & Resorts", key: "hotel", img: "assets/images/resort/hotels-resorts.webp", grad: "linear-gradient(160deg, rgba(31,58,61,.85), rgba(11,13,16,.9))", desc: "Turn rooms, views and hospitality into an unforgettable digital experience." },
    { name: "Lodges & Homestays", key: "lodge", img: "assets/images/lodge/lodges-homestays.webp", grad: "linear-gradient(160deg, rgba(44,74,52,.8), rgba(11,13,16,.9))", desc: "Bring the warmth of a stay online, from the first scroll to the final booking call." },
    { name: "Cafés & Restaurants", key: "cafe", img: "assets/images/cafe/cafes-restaurants.webp", grad: "linear-gradient(160deg, rgba(122,60,38,.7), rgba(11,13,16,.9))", desc: "Make your menu, atmosphere and brand impossible to scroll past." },
    { name: "Clinics", key: "clinic", img: "assets/images/clinic/clinics.webp", grad: "linear-gradient(160deg, rgba(52,92,96,.65), rgba(11,13,16,.9))", desc: "Build trust before your customer ever walks through the door." },
    { name: "Salons & Lifestyle", key: "other", img: "assets/images/business/salons-lifestyle.webp", grad: "linear-gradient(160deg, rgba(90,50,80,.6), rgba(11,13,16,.9))", desc: "Present your craft with the same polish your clients feel in the chair." },
    { name: "Local Businesses", key: "other", img: "assets/images/business/local-businesses.webp", grad: "linear-gradient(160deg, rgba(201,162,39,.4), rgba(11,13,16,.9))", desc: "Give a growing brand a home online that matches its ambition." }
  ];

  var PROJECTS = [
    {
      id: "forest-lodge", name: "The Forest Lodge", industry: "Hospitality &mdash; Lodge", layout: "hero",
      img: "assets/images/lodge/forest-lodge.webp", grad: "linear-gradient(160deg, #2c4a34, #14171c)",
      desc: "A premium lodge website concept focused on nature, rooms, gallery and location.",
      heroTag: "Concept Project &mdash; Hospitality", heroTitle: "Sleep among the trees.",
      heroImg: "assets/images/lodge/forest-lodge-hero.webp", heroGrad: "linear-gradient(160deg, #2c4a34, #16211a)",
      sections: [
        { label: "Rooms", imgs: ["assets/images/lodge/forest-lodge-room-1.webp","assets/images/lodge/forest-lodge-room-2.webp","assets/images/lodge/forest-lodge-room-3.webp"], grad: ["#3a5c43","#243a2a","#4a6b52"] },
        { label: "Gallery", imgs: ["assets/images/lodge/forest-lodge-gallery-1.webp","assets/images/lodge/forest-lodge-gallery-2.webp","assets/images/lodge/forest-lodge-gallery-3.webp"], grad: ["#243a2a","#4a6b52","#2c4a34"] }
      ],
      about: "The Forest Lodge concept explores a quiet, materials-led aesthetic &mdash; timber tones, soft light and generous imagery &mdash; built to make a remote stay feel reachable from the very first screen."
    },
    {
      id: "casa-cafe", name: "Casa Café", industry: "Café", layout: "split",
      img: "assets/images/cafe/casa-cafe.webp", grad: "linear-gradient(160deg, #7a3c26, #1c1210)",
      desc: "A modern café website concept featuring menu, atmosphere, gallery and contact.",
      heroTag: "Concept Project &mdash; Café", heroTitle: "Small cups, big mornings.",
      heroImg: "assets/images/cafe/casa-cafe-hero.webp", heroGrad: "linear-gradient(160deg, #7a3c26, #2a1a12)",
      sections: [
        { label: "Menu", imgs: ["assets/images/cafe/casa-cafe-menu-1.webp","assets/images/cafe/casa-cafe-menu-2.webp","assets/images/cafe/casa-cafe-menu-3.webp"], grad: ["#9a5a34","#3a241a","#c98a52"] },
        { label: "Atmosphere", imgs: ["assets/images/cafe/casa-cafe-atmosphere-1.webp","assets/images/cafe/casa-cafe-atmosphere-2.webp","assets/images/cafe/casa-cafe-atmosphere-3.webp"], grad: ["#3a241a","#c98a52","#7a3c26"] }
      ],
      about: "Casa Café leans on warm photography and a relaxed grid to bring the feeling of the room &mdash; the light, the counter, the regulars &mdash; onto the screen before a visitor ever orders."
    },
    {
      id: "aura-clinic", name: "Aura Clinic", industry: "Healthcare", layout: "clean",
      img: "assets/images/clinic/aura-clinic.webp", grad: "linear-gradient(160deg, #345c60, #14171c)",
      desc: "A professional clinic website concept focused on trust, services and contact information.",
      heroTag: "Concept Project &mdash; Healthcare", heroTitle: "Care that looks like care.",
      heroImg: "assets/images/clinic/aura-clinic-hero.webp", heroGrad: "linear-gradient(160deg, #345c60, #16232a)",
      sections: [
        { label: "Services", imgs: ["assets/images/clinic/aura-clinic-services-1.webp","assets/images/clinic/aura-clinic-services-2.webp","assets/images/clinic/aura-clinic-services-3.webp"], grad: ["#3f6d72","#1f3a3d","#5c9296"] },
        { label: "Team", imgs: ["assets/images/clinic/aura-clinic-team-1.webp","assets/images/clinic/aura-clinic-team-2.webp","assets/images/clinic/aura-clinic-team-3.webp"], grad: ["#1f3a3d","#5c9296","#345c60"] }
      ],
      about: "Aura Clinic is designed around clarity and calm &mdash; clean typography, ample whitespace and a straightforward path from concern to appointment, so trust is established before the first visit."
    },
    {
      id: "misty-hills", name: "Misty Hills Resort", industry: "Resort", layout: "wide",
      img: "assets/images/resort/misty-hills.webp", grad: "linear-gradient(160deg, #4a5a6b, #14171c)",
      desc: "A cinematic resort website concept built around destination and scale.",
      heroTag: "Concept Project &mdash; Resort", heroTitle: "Let the view do the talking.",
      heroImg: "assets/images/resort/misty-hills-hero.webp", heroGrad: "linear-gradient(160deg, #4a5a6b, #1a222a)",
      sections: [
        { label: "Experiences", imgs: ["assets/images/resort/misty-hills-experiences-1.webp","assets/images/resort/misty-hills-experiences-2.webp","assets/images/resort/misty-hills-experiences-3.webp"], grad: ["#5c7086","#2a343e","#8298ac"] },
        { label: "Location", imgs: ["assets/images/resort/misty-hills-location-1.webp","assets/images/resort/misty-hills-location-2.webp","assets/images/resort/misty-hills-location-3.webp"], grad: ["#2a343e","#8298ac","#4a5a6b"] }
      ],
      about: "Misty Hills is built as a full-bleed, cinematic experience &mdash; wide imagery, slow reveals and minimal copy &mdash; treating the destination itself as the hero of the site."
    },
    {
      id: "local-co", name: "Local & Co.", industry: "Small Business", layout: "layered",
      img: "assets/images/business/local-business.webp", grad: "linear-gradient(160deg, #c9a227, #1c1710)",
      desc: "A clean, confident business website concept for a growing local brand.",
      heroTag: "Concept Project &mdash; Small Business", heroTitle: "A local name, done properly.",
      heroImg: "assets/images/business/local-business-hero.webp", heroGrad: "linear-gradient(160deg, #c9a227, #241d10)",
      sections: [
        { label: "What We Do", imgs: ["assets/images/business/local-business-what-1.webp","assets/images/business/local-business-what-2.webp","assets/images/business/local-business-what-3.webp"], grad: ["#d9b64a","#4a3d1c","#c9a227"] },
        { label: "Get In Touch", imgs: ["assets/images/business/local-business-contact-1.webp","assets/images/business/local-business-contact-2.webp","assets/images/business/local-business-contact-3.webp"], grad: ["#4a3d1c","#c9a227","#d9b64a"] }
      ],
      about: "Local & Co. shows how a modest, single-location business can carry a premium presentation without needing a large catalogue of pages &mdash; just a clear story, told well."
    }
  ];

  var SELECTOR_OPTIONS = [
    { key: "hotel", label: "Hotel", img: "assets/images/resort/selector-hotel.webp", headline: "Rooms. Experiences. Location.\nAll in one digital experience.", copy: "A hotel site built around what guests actually decide with: room types, real photography, and how easy it is to reach you.", grad: "linear-gradient(160deg, #345c60, #14171c)", previewTitle: "Rooms with a view.", previewTag: "Hospitality" },
    { key: "cafe", label: "Café", img: "assets/images/cafe/selector-cafe.webp", headline: "Menu. Atmosphere. Story.\nMake customers want to visit.", copy: "A café site that leads with feeling &mdash; the menu, the space, the people behind the counter &mdash; not a generic contact page.", grad: "linear-gradient(160deg, #7a3c26, #1c1210)", previewTitle: "Your morning ritual.", previewTag: "Café" },
    { key: "resort", label: "Resort", img: "assets/images/resort/selector-resort.webp", headline: "Let your destination sell itself.", copy: "Large-format imagery and a slower pace of scroll, built for a place people are dreaming about before they book.", grad: "linear-gradient(160deg, #4a5a6b, #14171c)", previewTitle: "The view does the talking.", previewTag: "Resort" },
    { key: "clinic", label: "Clinic", img: "assets/images/clinic/selector-clinic.webp", headline: "Professional. Trustworthy. Accessible.", copy: "A calm, credible presentation of your services and team, designed to build confidence before the first appointment.", grad: "linear-gradient(160deg, #1f3a3d, #14171c)", previewTitle: "Care that looks like care.", previewTag: "Clinic" },
    { key: "lodge", label: "Lodge", img: "assets/images/lodge/selector-lodge.webp", headline: "A quiet stay, presented with care.", copy: "Natural tones and unhurried pacing that reflect what a lodge or homestay actually offers &mdash; a slower kind of hospitality.", grad: "linear-gradient(160deg, #2c4a34, #14171c)", previewTitle: "Sleep among the trees.", previewTag: "Lodge" },
    { key: "other", label: "Other", img: "assets/images/business/selector-other.webp", headline: "Your business, its own visual language.", copy: "Every VisionX site starts from your brand and audience, not a template &mdash; tell us about your business and we'll shape the direction together.", grad: "linear-gradient(160deg, #5b4a8a, #14171c)", previewTitle: "Your name, done properly.", previewTag: "Local Business" }
  ];

  /* ---------------------------------------------------------
     NAV: scroll state + mobile menu

     The mobile menu is BUILT from the real desktop navigation
     (.nav-links a + .nav-cta) at load time — there is no second,
     hand-authored copy of the link list anywhere. Whatever the
     desktop nav contains is exactly what the mobile menu contains,
     regardless of scroll position, header state, or anything else.
  --------------------------------------------------------- */
  var nav = document.getElementById("siteNav");
  var burger = document.getElementById("navBurger");
  var mobileMenu = document.getElementById("navMobile");
  var desktopNavLinks = document.querySelectorAll(".nav-links a");
  var desktopNavCta = document.querySelector(".nav-cta");

  function onScrollNav(){
    if(window.scrollY > 40){ nav.classList.add("scrolled"); }
    else{ nav.classList.remove("scrolled"); }
  }
  window.addEventListener("scroll", onScrollNav, { passive: true });
  onScrollNav();

  /* Build the mobile menu markup once, from the authoritative source,
     independent of scroll/observer/animation state entirely. The close
     button is the one piece that isn't derived from .nav-links — it's
     static UI, added as its own row above the list so it reads as a
     header-level control, not a nav item. */
  (function buildMobileMenu(){
    var itemsHtml = Array.prototype.map.call(desktopNavLinks, function(a, i){
      var num = String(i + 1).padStart(2, "0");
      return (
        '<a class="nmi" href="' + a.getAttribute("href") + '">' +
          '<span class="nmi-num">' + num + '</span>' +
          '<span class="nmi-label">' + a.textContent + '</span>' +
          '<span class="nmi-arrow" aria-hidden="true">&rarr;</span>' +
        '</a>'
      );
    }).join("");

    var ctaHtml = desktopNavCta ?
      '<a class="btn btn-primary nmi-cta" href="' + desktopNavCta.getAttribute("href") + '">' + desktopNavCta.textContent + '</a>' : '';

    mobileMenu.innerHTML =
      '<div class="nmi-head">' +
        '<button type="button" class="nmi-close" id="navClose" aria-label="Close menu">&times;</button>' +
      '</div>' +
      '<nav class="nmi-list" aria-label="Site navigation">' + itemsHtml + '</nav>' +
      '<div class="nmi-foot">' +
        ctaHtml +
        '<p class="nmi-tagline">Building digital experiences<br>for real businesses.</p>' +
      '</div>';
  })();

  var navClose = document.getElementById("navClose");

  var navMobileFocusable = 'a, button';
  function getNavMobileFocusable(){
    return Array.prototype.slice.call(mobileMenu.querySelectorAll(navMobileFocusable));
  }
  function openMobileMenu(){
    burger.classList.add("open");
    nav.classList.add("menu-open");
    mobileMenu.classList.add("open");
    mobileMenu.setAttribute("aria-hidden", "false");
    burger.setAttribute("aria-expanded", "true");
    document.body.style.overflow = "hidden";
    var focusables = getNavMobileFocusable();
    if(focusables.length) focusables[0].focus();
  }
  function closeMobileMenu(returnFocus){
    burger.classList.remove("open");
    nav.classList.remove("menu-open");
    mobileMenu.classList.remove("open");
    mobileMenu.setAttribute("aria-hidden", "true");
    burger.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
    if(returnFocus) burger.focus();
  }
  burger.addEventListener("click", function(){
    if(burger.classList.contains("open")) closeMobileMenu(false);
    else openMobileMenu();
  });
  navClose.addEventListener("click", function(){
    closeMobileMenu(true);
  });
  mobileMenu.addEventListener("click", function(e){
    if(e.target.closest("a")) closeMobileMenu(false);
  });
  document.addEventListener("keydown", function(e){
    if(!mobileMenu.classList.contains("open")) return;
    if(e.key === "Escape"){
      closeMobileMenu(true);
      return;
    }
    if(e.key === "Tab"){
      var focusables = getNavMobileFocusable();
      if(!focusables.length) return;
      var first = focusables[0], last = focusables[focusables.length - 1];
      if(e.shiftKey && document.activeElement === first){
        e.preventDefault();
        last.focus();
      } else if(!e.shiftKey && document.activeElement === last){
        e.preventDefault();
        first.focus();
      } else if(!mobileMenu.contains(document.activeElement)){
        e.preventDefault();
        first.focus();
      }
    }
  });

  /* Safety net: if the viewport crosses back to desktop width while
     the mobile menu happens to be open, close it so nothing is left
     in an inconsistent, unfocusable-but-visible state. */
  window.addEventListener("resize", function(){
    if(window.innerWidth > 768 && mobileMenu.classList.contains("open")){
      closeMobileMenu(false);
    }
  }, { passive: true });

  /* ---------------------------------------------------------
     SCROLL PROGRESS BAR
  --------------------------------------------------------- */
  var progressFill = document.getElementById("progressFill");
  function onScrollProgress(){
    var h = document.documentElement;
    var scrolled = h.scrollTop;
    var height = h.scrollHeight - h.clientHeight;
    progressFill.style.width = (height > 0 ? (scrolled / height) * 100 : 0) + "%";
  }
  window.addEventListener("scroll", onScrollProgress, { passive: true });
  onScrollProgress();

  /* ---------------------------------------------------------
     CURSOR — subtle desktop-only accent dot
  --------------------------------------------------------- */
  var cursorDot = document.getElementById("cursorDot");
  if(cursorDot && !reduceMotion && window.matchMedia("(hover:hover)").matches){
    window.addEventListener("mousemove", function(e){
      cursorDot.style.left = e.clientX + "px";
      cursorDot.style.top = e.clientY + "px";
      cursorDot.classList.add("show");
    }, { passive: true });
    document.querySelectorAll("a, button, .cat-card, .proj-card").forEach(function(el){
      el.addEventListener("mouseenter", function(){ cursorDot.classList.add("big"); });
      el.addEventListener("mouseleave", function(){ cursorDot.classList.remove("big"); });
    });
  }

  /* ---------------------------------------------------------
     HERO: word reveal + transformation stepper
  --------------------------------------------------------- */
  var heroSection = document.getElementById("hero");
  requestAnimationFrame(function(){
    requestAnimationFrame(function(){ heroSection.classList.add("loaded"); });
  });

  /* One controlled entrance — plays once as the hero comes into view,
     settles on the resolved website preview, and stops. No infinite loop. */
  var tCard = document.getElementById("transformCard");
  if(tCard && !reduceMotion){
    var setTCardStep = function(step){
      tCard.classList.remove("step-0","step-1","step-2");
      tCard.classList.add("step-" + step);
      tCard.parentElement.classList.toggle("step-2-active", step === 2);
    };
    setTCardStep(0);
    var tCardPlayed = false, tCardTimers = [];
    var tCardIO = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if(entry.isIntersecting && !tCardPlayed){
          tCardPlayed = true;
          tCardTimers.push(setTimeout(function(){ setTCardStep(1); }, 900));
          tCardTimers.push(setTimeout(function(){ setTCardStep(2); }, 1900));
          tCardIO.unobserve(entry.target);
        }
      });
    }, { threshold: 0.4 });
    tCardIO.observe(tCard);
  } else if(tCard){
    tCard.classList.add("step-2");
    tCard.parentElement.classList.add("step-2-active");
  }

  /* ---------------------------------------------------------
     TRUE SCROLL-LINKED PARALLAX
     Elements marked [data-parallax="<strength>"] get a continuous
     translateY tied to scroll position via requestAnimationFrame —
     not a CSS transition, so it tracks the scroll 1:1. Reserved for
     a handful of major cinematic moments. Disabled on touch/narrow
     viewports and when reduced motion is requested.
  --------------------------------------------------------- */
  var parallaxEnabled = !reduceMotion && window.matchMedia("(min-width: 769px)").matches;
  if(parallaxEnabled){
    var parallaxEls = Array.prototype.slice.call(document.querySelectorAll("[data-parallax]"));
    var pTicking = false;
    function updateParallax(){
      var vh = window.innerHeight;
      parallaxEls.forEach(function(el){
        var strength = parseFloat(el.getAttribute("data-parallax")) || 20;
        var rect = el.parentElement.getBoundingClientRect();
        var centerOffset = (rect.top + rect.height / 2) - vh / 2;
        var shift = (centerOffset / vh) * strength;
        el.style.transform = "translate3d(0," + shift.toFixed(2) + "px,0)";
      });
      pTicking = false;
    }
    function onParallaxScroll(){
      if(!pTicking){
        requestAnimationFrame(updateParallax);
        pTicking = true;
      }
    }
    window.addEventListener("scroll", onParallaxScroll, { passive: true });
    window.addEventListener("resize", onParallaxScroll, { passive: true });
    updateParallax();
  }

  /* ---------------------------------------------------------
     INTERSECTION OBSERVER — scroll reveals
  --------------------------------------------------------- */
  var revealTargets = document.querySelectorAll(".reveal-up, .reveal-group");
  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(entry){
      if(entry.isIntersecting){
        entry.target.classList.add("in-view");
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: "0px 0px -8% 0px" });
  revealTargets.forEach(function(el){ io.observe(el); });

  /* ---------------------------------------------------------
     SIGNATURE SCROLL MOMENT
     A business exists → ... → VisionX transforms that impression.

     The active step is still driven by the visitor's raw scroll
     position through this tall section (unchanged), but a fast
     wheel flick or swipe can move that raw position past several
     steps' worth of scroll distance in a single input event. Rather
     than snapping straight to whatever step that raw position maps
     to, we chase the target one step at a time with a short pacing
     interval between steps — so a hard, fast scroll still advances
     the sequence step-by-step (1 → 2 → 3 → 4 → 5) instead of jumping
     straight to whatever step the raw scroll distance lands on.
     Keeps native page scrolling (no preventDefault, no scroll-jacking)
     so wheel/trackpad/touch all keep working exactly as before.
  --------------------------------------------------------- */
  var momentSection = document.getElementById("moment");
  var momentSteps = document.querySelectorAll(".moment-step");
  var momentDots = document.getElementById("momentDots");
  if(momentSection && momentSteps.length){
    momentSteps.forEach(function(_, i){
      var dot = document.createElement("span");
      if(i === 0) dot.classList.add("is-active");
      momentDots.appendChild(dot);
    });
    var dotEls = momentDots.querySelectorAll("span");

    // Minimum time between advancing/retreating by one step. This is
    // what makes the sequence feel paced and cinematic instead of
    // instant, and is what stops a single fast scroll gesture from
    // visually skipping items — each step still gets its moment on
    // screen even if the visitor has already scrolled well past it.
    var MOMENT_STEP_INTERVAL = reduceMotion ? 0 : 220;
    var momentActiveIdx = 0;
    var momentTargetIdx = 0;
    var momentLastStepTime = 0;
    var momentRafId = null;

    function applyMomentStep(i){
      momentSteps.forEach(function(step, idx){
        step.classList.toggle("is-active", idx === i);
      });
      dotEls.forEach(function(d, idx){ d.classList.toggle("is-active", idx === i); });
    }

    function momentTick(now){
      momentRafId = null;
      if(momentActiveIdx === momentTargetIdx){ return; }
      if(now - momentLastStepTime >= MOMENT_STEP_INTERVAL){
        momentActiveIdx += momentTargetIdx > momentActiveIdx ? 1 : -1;
        momentLastStepTime = now;
        applyMomentStep(momentActiveIdx);
      }
      if(momentActiveIdx !== momentTargetIdx){
        momentRafId = requestAnimationFrame(momentTick);
      }
    }

    function updateMoment(){
      var rect = momentSection.getBoundingClientRect();
      var total = rect.height - window.innerHeight;
      var progress = total > 0 ? Math.min(1, Math.max(0, -rect.top / total)) : 0;
      momentTargetIdx = Math.min(momentSteps.length - 1, Math.floor(progress * momentSteps.length));
      if(reduceMotion){
        momentActiveIdx = momentTargetIdx;
        applyMomentStep(momentActiveIdx);
        return;
      }
      if(momentRafId === null){
        momentRafId = requestAnimationFrame(momentTick);
      }
    }
    window.addEventListener("scroll", updateMoment, { passive: true });
    updateMoment();
  }

  /* ---------------------------------------------------------
     "FIRST IMPRESSIONS" headline — crossfades to the payoff line
     once the section has been in view for a beat, then swaps back
     if the visitor scrolls away and returns.
  --------------------------------------------------------- */
  var impressionsHeadline = document.getElementById("impressionsHeadline");
  if(impressionsHeadline){
    var faceA = impressionsHeadline.querySelector('[data-face="a"]');
    var faceB = impressionsHeadline.querySelector('[data-face="b"]');
    var impressionsSection = document.getElementById("impressions");
    var swapped = false, swapTimer = null;
    var impIO = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if(entry.isIntersecting && entry.intersectionRatio > 0.6 && !swapped){
          swapTimer = setTimeout(function(){
            faceA.classList.remove("ih-in"); faceA.classList.add("ih-out");
            faceB.classList.remove("ih-out"); faceB.classList.add("ih-in");
            impressionsSection.classList.add("transformed");
            swapped = true;
          }, 900);
        } else if(!entry.isIntersecting){
          clearTimeout(swapTimer);
        }
      });
    }, { threshold: [0, 0.6, 1] });
    impIO.observe(impressionsSection);
  }

  /* ---------------------------------------------------------
     BUILD: category cards
  --------------------------------------------------------- */
  var catGrid = document.getElementById("catGrid");
  CATEGORIES.forEach(function(cat, i){
    var card = document.createElement("div");
    card.className = "cat-card";
    card.tabIndex = 0;
    card.innerHTML =
      mediaHTML(cat.img, cat.name, cat.grad) +
      '<div class="cat-scrim" aria-hidden="true"></div>' +
      '<div class="cat-body">' +
        '<span class="cat-index">0' + (i+1) + '</span>' +
        '<h3>' + cat.name + '</h3>' +
        '<p class="cat-desc">' + cat.desc + '</p>' +
        '<span class="cat-explore">Explore Concept &rarr;</span>' +
      '</div>';
    card.addEventListener("click", function(){ exploreCategory(cat); });
    card.addEventListener("keydown", function(e){
      if(e.key === "Enter" || e.key === " " || e.key === "Spacebar"){
        e.preventDefault();
        exploreCategory(cat);
      }
    });
    catGrid.appendChild(card);
  });

  /* Category cards ("Explore Concept") reuse the existing business
     selector below — this was previously wired with no click handler
     at all, so clicking a category card did nothing. */
  function exploreCategory(cat){
    selectBusiness(cat.key);
    var target = document.getElementById("services");
    if(target){ target.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" }); }
  }

  /* ---------------------------------------------------------
     BUILD: portfolio / concept project cards (editorial layout)
  --------------------------------------------------------- */
  var portfolioGrid = document.getElementById("portfolioGrid");
  PROJECTS.forEach(function(proj, i){
    var num = String(i+1).padStart(2,"0");
    var card = document.createElement("article");
    card.className = "proj-card";
    card.setAttribute("data-layout", proj.layout);
    card.tabIndex = 0;
    card.setAttribute("role","button");
    card.setAttribute("aria-label","View concept: " + proj.name);
    card.innerHTML =
      '<div class="proj-visual">' +
        '<div class="proj-chrome">' +
          '<span class="proj-dot"></span><span class="proj-dot"></span><span class="proj-dot"></span>' +
          '<span class="proj-chrome-url">visionxwebdeveloper.com/' + proj.id + '</span>' +
        '</div>' +
        '<div class="proj-media">' +
          mediaHTML(proj.img, proj.name, proj.grad) +
          '<div class="proj-media-scrim" aria-hidden="true"></div>' +
          '<div class="proj-mini">' +
            '<span class="proj-mini-eyebrow">' + proj.industry + '</span>' +
            '<span class="proj-mini-title">' + proj.heroTitle + '</span>' +
          '</div>' +
        '</div>' +
        '<span class="proj-tag">Concept Project</span>' +
        '<div class="proj-overlay"><span>View Concept &rarr;</span></div>' +
      '</div>' +
      '<div class="proj-body">' +
        '<p class="proj-industry">' + num + ' &mdash; ' + proj.industry + '</p>' +
        '<h3>' + proj.name + '</h3>' +
        '<p>' + proj.desc + '</p>' +
        '<span class="proj-cta">View Concept <svg width="14" height="10" viewBox="0 0 14 10"><path d="M0 5H13M13 5L9 1M13 5L9 9" stroke="currentColor" stroke-width="1.4" fill="none"/></svg></span>' +
      '</div>';
    card.addEventListener("click", function(){ openModal(proj); });
    card.addEventListener("keydown", function(e){
      if(e.key === "Enter" || e.key === " " || e.key === "Spacebar"){
        e.preventDefault();
        openModal(proj);
      }
    });
    portfolioGrid.appendChild(card);
  });

  /* per-project reveal — each layout's clip-path/scale treatment is
     defined in CSS by [data-layout]; this just triggers it once in view */
  var projIO = new IntersectionObserver(function(entries){
    entries.forEach(function(entry){
      if(entry.isIntersecting){
        entry.target.classList.add("revealed");
        projIO.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2, rootMargin: "0px 0px -10% 0px" });
  portfolioGrid.querySelectorAll(".proj-card").forEach(function(card){ projIO.observe(card); });

  /* ---------------------------------------------------------
     MODAL — live website preview
  --------------------------------------------------------- */
  var modal = document.getElementById("conceptModal");
  var modalPanel = document.querySelector(".modal-panel");
  var modalScroll = document.getElementById("modalScroll");
  var modalBackdrop = document.getElementById("modalBackdrop");
  var modalClose = document.getElementById("modalClose");
  var lastFocused = null;

  var FOCUSABLE_SELECTOR = 'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';
  function getFocusable(){
    return Array.prototype.slice.call(modalPanel.querySelectorAll(FOCUSABLE_SELECTOR))
      .filter(function(el){ return el.offsetParent !== null; });
  }

  function openModal(proj){
    var urlLabel = document.getElementById("modalChromeUrl");
    if(urlLabel) urlLabel.textContent = "visionxwebdeveloper.com/" + proj.id;
    modalScroll.innerHTML = buildPreviewMarkup(proj);
    modalScroll.scrollTop = 0;
    modal.classList.add("open");
    modal.setAttribute("aria-hidden","false");
    document.body.style.overflow = "hidden";
    lastFocused = document.activeElement;
    modalClose.focus();
  }
  function closeModal(){
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden","true");
    document.body.style.overflow = "";
    if(lastFocused) lastFocused.focus();
  }
  modalClose.addEventListener("click", closeModal);
  modalBackdrop.addEventListener("click", closeModal);
  /* The in-modal "Build Yours With VisionX" CTA points at #contact —
     close the modal first so body scroll is restored, then let the
     page scroll to the contact section. */
  modalScroll.addEventListener("click", function(e){
    var cta = e.target.closest && e.target.closest("[data-modal-cta]");
    if(!cta) return;
    e.preventDefault();
    closeModal();
    var target = document.getElementById("contact");
    if(target){
      setTimeout(function(){
        target.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
      }, 50);
    }
  });
  document.addEventListener("keydown", function(e){
    if(!modal.classList.contains("open")) return;

    if(e.key === "Escape"){ closeModal(); return; }

    if(e.key === "Tab"){
      var focusable = getFocusable();
      if(!focusable.length) return;
      var first = focusable[0], last = focusable[focusable.length - 1];
      if(e.shiftKey && document.activeElement === first){
        e.preventDefault();
        last.focus();
      } else if(!e.shiftKey && document.activeElement === last){
        e.preventDefault();
        first.focus();
      } else if(!modalPanel.contains(document.activeElement)){
        e.preventDefault();
        first.focus();
      }
    }
  });

  function buildPreviewMarkup(proj){
    var sectionsHtml = proj.sections.map(function(sec){
      return '<div class="mp-section">' +
        '<h4>' + sec.label + '</h4>' +
        '<div class="mp-grid">' +
          '<div class="mp-swatch">' + mediaHTML(sec.imgs[0], sec.label, sec.grad[0]) + '</div>' +
          '<div class="mp-swatch">' + mediaHTML(sec.imgs[1], sec.label, sec.grad[1]) + '</div>' +
          '<div class="mp-swatch">' + mediaHTML(sec.imgs[2], sec.label, sec.grad[2]) + '</div>' +
        '</div>' +
      '</div>';
    }).join("");

    var navLabels = proj.sections.map(function(s){ return s.label; }).concat(["Contact"]);

    return (
      '<div class="mp-nav">' +
        '<span class="mp-nav-brand">' + proj.name + '</span>' +
        '<span class="mp-nav-links">' + navLabels.map(function(l){ return '<span>' + l + '</span>'; }).join("") + '</span>' +
        '<span class="mp-nav-cta">Book Now</span>' +
      '</div>' +
      '<div class="mp-hero">' +
        mediaHTML(proj.heroImg, proj.heroTitle, proj.heroGrad) +
        '<div class="mp-hero-scrim" aria-hidden="true"></div>' +
        '<p class="mp-tag">' + proj.heroTag + '</p>' +
        '<h2>' + proj.heroTitle + '</h2>' +
      '</div>' +
      '<div class="mp-section">' +
        '<h4>About</h4>' +
        '<p class="mp-text">' + proj.about + '</p>' +
      '</div>' +
      sectionsHtml +
      '<div class="mp-convert">' +
        '<p>Want your business to look this good online?</p>' +
        '<a class="btn btn-primary magnetic" href="#contact" data-modal-cta>Build Yours With VisionX &rarr;</a>' +
      '</div>' +
      '<div class="mp-footer">' +
        '<span class="mp-footer-brand">' + proj.name + '</span>' +
        '<span class="mp-footer-copy">Concept preview by VisionX Web Developer</span>' +
      '</div>'
    );
  }

  /* ---------------------------------------------------------
     BUILD: business selector
  --------------------------------------------------------- */
  var selectorTabs = document.getElementById("selectorTabs");
  var selectorDisplay = document.getElementById("selectorDisplay");

  SELECTOR_OPTIONS.forEach(function(opt, i){
    var tab = document.createElement("button");
    tab.className = "sel-tab" + (i === 0 ? " active" : "");
    tab.textContent = opt.label;
    tab.type = "button";
    tab.setAttribute("role","tab");
    tab.setAttribute("aria-selected", i === 0 ? "true" : "false");
    tab.addEventListener("click", function(){ selectBusiness(opt.key); });
    selectorTabs.appendChild(tab);
  });

  function renderBusiness(opt){
    Array.from(selectorTabs.children).forEach(function(tab){
      var isActive = tab.textContent === opt.label;
      tab.classList.toggle("active", isActive);
      tab.setAttribute("aria-selected", isActive ? "true" : "false");
    });

    selectorDisplay.innerHTML =
      mediaHTML(opt.img, opt.label, opt.grad) +
      '<div class="selector-display-scrim" aria-hidden="true"></div>' +
      '<div class="sel-content">' +
        '<h3>' + opt.headline.replace(/\n/g,"<br>") + '</h3>' +
        '<p>' + opt.copy + '</p>' +
      '</div>' +
      '<div class="sel-visual">' +
        '<div class="sel-preview-chrome"><span></span><span></span><span></span></div>' +
        '<div class="sel-preview-hero">' +
          mediaHTML(opt.img, opt.label, opt.grad) +
          '<div class="sel-preview-scrim" aria-hidden="true"></div>' +
          '<span class="sel-preview-eyebrow">' + opt.previewTag + '</span>' +
          '<span class="sel-preview-title">' + opt.previewTitle + '</span>' +
          '<span class="sel-preview-btn">Explore</span>' +
        '</div>' +
      '</div>';
  }

  var selectorSwapTimer = null;
  function selectBusiness(key){
    var opt = SELECTOR_OPTIONS.find(function(o){ return o.key === key; });
    if(!opt) return;

    if(reduceMotion){
      renderBusiness(opt);
      return;
    }
    clearTimeout(selectorSwapTimer);
    selectorDisplay.classList.add("switching");
    selectorSwapTimer = setTimeout(function(){
      renderBusiness(opt);
      requestAnimationFrame(function(){ selectorDisplay.classList.remove("switching"); });
    }, 220);
  }
  renderBusiness(SELECTOR_OPTIONS[0]);

  /* ---------------------------------------------------------
     TIMELINE fill on scroll
  --------------------------------------------------------- */
  var tlFill = document.getElementById("tlFill");
  var timelineEl = document.querySelector(".timeline");
  if(tlFill && timelineEl){
    var tlObserver = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if(entry.isIntersecting){
          tlFill.style.width = "100%";
          tlObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.4 });
    tlObserver.observe(timelineEl);
  }

  /* ---------------------------------------------------------
     MAGNETIC BUTTONS (subtle, desktop only)
  --------------------------------------------------------- */
  if(!reduceMotion && window.matchMedia("(hover:hover)").matches){
    document.querySelectorAll(".magnetic").forEach(function(btn){
      btn.addEventListener("mousemove", function(e){
        var rect = btn.getBoundingClientRect();
        var x = (e.clientX - rect.left - rect.width/2) * 0.18;
        var y = (e.clientY - rect.top - rect.height/2) * 0.35;
        btn.style.transform = "translate(" + x + "px," + y + "px)";
      });
      btn.addEventListener("mouseleave", function(){ btn.style.transform = ""; });
    });
  }

  /* ---------------------------------------------------------
     CONTACT FORM — sends the inquiry to WhatsApp
  --------------------------------------------------------- */
  var form = document.getElementById("contactForm");
  var formNote = document.getElementById("formNote");
  var submitBtn = document.getElementById("submitBtn");
  var WHATSAPP_NUMBER = "919380914269";
  var DEFAULT_SUBMIT_LABEL = "Send Project Inquiry \u2192";

  form.addEventListener("submit", function(e){
    e.preventDefault();
    if(!form.checkValidity()){
      formNote.textContent = "Please fill in the required fields.";
      form.reportValidity();
      return;
    }

    var name = form.elements["name"].value.trim();
    var businessName = form.elements["businessName"].value.trim();
    var businessType = form.elements["businessType"].value.trim();
    var email = form.elements["email"].value.trim();
    var phone = form.elements["phone"].value.trim();
    var need = form.elements["need"].value.trim();
    var message = form.elements["message"].value.trim();

    var lines = [
      "Hello VisionX Web Developer,",
      "",
      "I would like to discuss a website project.",
      "",
      "Name: " + name,
      "Business Name: " + businessName,
      "Email: " + email
    ];
    if(phone){ lines.push("Phone: " + phone); }
    lines.push("Business Type: " + businessType);
    if(need){ lines.push("What They Need: " + need); }
    lines.push(
      "",
      "Project Details:",
      message,
      "",
      "Sent from:",
      "visionxwebdeveloper.com"
    );

    var whatsappMessage = lines.join("\n");
    var whatsappUrl = "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(whatsappMessage);

    submitBtn.disabled = true;
    submitBtn.textContent = "Opening WhatsApp\u2026";

    window.open(whatsappUrl, "_blank", "noopener,noreferrer");

    formNote.textContent = "WhatsApp is opening in a new tab with your inquiry pre-filled.";
    submitBtn.textContent = DEFAULT_SUBMIT_LABEL;
    submitBtn.disabled = false;
    form.reset();
  });

  /* ---------------------------------------------------------
     BACK TO TOP
  --------------------------------------------------------- */
  var toTop = document.getElementById("toTop");
  window.addEventListener("scroll", function(){
    toTop.classList.toggle("show", window.scrollY > 900);
  }, { passive: true });
  toTop.addEventListener("click", function(){
    window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
  });

  /* ---------------------------------------------------------
     FLOATING CHAT — small, honest, frontend-only assistant.
     No AI backend: a fixed set of VisionX questions and answers.
     Reuses WHATSAPP_NUMBER from the contact-form handler above.
  --------------------------------------------------------- */
  var chatToggle = document.getElementById("floatChatToggle");
  var chatPanel = document.getElementById("floatChatPanel");
  var chatClose = document.getElementById("floatChatClose");
  var chatMessages = document.getElementById("floatChatMessages");
  var chatQuestions = document.getElementById("floatChatQuestions");

  var CHAT_QA = [
    { q: "What does VisionX do?", a: "VisionX Web Developer designs and builds premium, responsive websites for hotels, resorts, cafés, restaurants, clinics, salons and growing local businesses." },
    { q: "Do you build hotel or resort websites?", a: "Yes \u2014 hospitality is one of our core focus areas, covering rooms, galleries, experiences and booking-style layouts." },
    { q: "Do you build café or restaurant websites?", a: "Yes \u2014 menu, atmosphere and gallery-led websites built to make your space impossible to scroll past." },
    { q: "Can I see your work?", a: "Definitely \u2014 scroll to the \u201cWeb Design Projects & Concepts\u201d section on this page, or tap Explore Concept on any card to open a full preview." },
    { q: "How can I contact VisionX?", a: "The fastest way is WhatsApp using the button right below this chat. You can also use the contact form, email hello@visionxwebdeveloper.com or call +91 93809 14269." }
  ];

  var chatOpen = false;
  var askedKeys = {};

  function addChatMessage(text, who){
    var row = document.createElement("div");
    row.className = "fcp-msg " + who;
    row.textContent = text;
    chatMessages.appendChild(row);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  function renderChatQuestions(){
    chatQuestions.innerHTML = "";
    CHAT_QA.forEach(function(item, i){
      if(askedKeys[i]) return;
      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = "fcp-q-btn";
      btn.textContent = item.q;
      btn.addEventListener("click", function(){
        addChatMessage(item.q, "user");
        askedKeys[i] = true;
        setTimeout(function(){
          addChatMessage(item.a, "bot");
          renderChatQuestions();
        }, 220);
      });
      chatQuestions.appendChild(btn);
    });
  }

  function openChat(){
    if(chatMessages.children.length === 0){
      addChatMessage("Hi! I'm the VisionX assistant. Ask me anything below \u2014 or use WhatsApp for a real conversation.", "bot");
      renderChatQuestions();
    }
    chatPanel.classList.add("open");
    chatPanel.setAttribute("aria-hidden", "false");
    chatToggle.setAttribute("aria-expanded", "true");
    chatToggle.classList.add("active");
    chatOpen = true;
  }
  function closeChat(){
    chatPanel.classList.remove("open");
    chatPanel.setAttribute("aria-hidden", "true");
    chatToggle.setAttribute("aria-expanded", "false");
    chatToggle.classList.remove("active");
    chatOpen = false;
  }

  if(chatToggle && chatPanel){
    chatToggle.addEventListener("click", function(){
      chatOpen ? closeChat() : openChat();
    });
    chatClose.addEventListener("click", closeChat);
    document.addEventListener("keydown", function(e){
      if(e.key === "Escape" && chatOpen) closeChat();
    });
    document.addEventListener("click", function(e){
      if(!chatOpen) return;
      var actions = document.getElementById("floatActions");
      if(actions && !actions.contains(e.target)) closeChat();
    });
  }

})();