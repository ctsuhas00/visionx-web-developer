/* =========================================================
   VISIONX WEB DEVELOPER — script.js
   Vanilla JS. No dependencies.
   ========================================================= */
(function(){
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------------------------------------------------------
     DATA
  --------------------------------------------------------- */
  var CATEGORIES = [
    { name: "Hotels & Resorts", grad: "linear-gradient(160deg, rgba(31,58,61,.85), rgba(11,13,16,.9))", desc: "Turn rooms, views and hospitality into an unforgettable digital experience." },
    { name: "Lodges & Homestays", grad: "linear-gradient(160deg, rgba(75,64,34,.75), rgba(11,13,16,.9))", desc: "Bring the warmth of a stay online, from the first scroll to the final booking call." },
    { name: "Cafés & Restaurants", grad: "linear-gradient(160deg, rgba(120,58,38,.6), rgba(11,13,16,.9))", desc: "Make your menu, atmosphere and brand impossible to scroll past." },
    { name: "Clinics", grad: "linear-gradient(160deg, rgba(52,92,96,.55), rgba(11,13,16,.9))", desc: "Build trust before your customer ever walks through the door." },
    { name: "Salons & Lifestyle", grad: "linear-gradient(160deg, rgba(90,50,80,.55), rgba(11,13,16,.9))", desc: "Present your craft with the same polish your clients feel in the chair." },
    { name: "Local Businesses", grad: "linear-gradient(160deg, rgba(201,162,39,.35), rgba(11,13,16,.9))", desc: "Give a growing brand a home online that matches its ambition." }
  ];

  var PROJECTS = [
    {
      id: "forest-lodge", name: "The Forest Lodge", industry: "Hospitality &mdash; Lodge",
      swatch: "linear-gradient(160deg, #2c4a34, #14171c)",
      desc: "A premium lodge website concept focused on nature, rooms, gallery and location.",
      heroTag: "Concept Project &mdash; Hospitality", heroTitle: "Sleep among the trees.",
      heroGrad: "linear-gradient(160deg, #2c4a34, #16211a)",
      sections: [
        { label: "Rooms", grad: ["#3a5c43","#243a2a","#4a6b52"] },
        { label: "Gallery", grad: ["#243a2a","#4a6b52","#2c4a34"] }
      ],
      about: "The Forest Lodge concept explores a quiet, materials-led aesthetic &mdash; timber tones, soft light and generous imagery &mdash; built to make a remote stay feel reachable from the very first screen."
    },
    {
      id: "casa-cafe", name: "Casa Café", industry: "Café",
      swatch: "linear-gradient(160deg, #7a3c26, #1c1210)",
      desc: "A modern café website concept featuring menu, atmosphere, gallery and contact.",
      heroTag: "Concept Project &mdash; Café", heroTitle: "Small cups, big mornings.",
      heroGrad: "linear-gradient(160deg, #7a3c26, #2a1a12)",
      sections: [
        { label: "Menu", grad: ["#9a5a34","#3a241a","#c98a52"] },
        { label: "Atmosphere", grad: ["#3a241a","#c98a52","#7a3c26"] }
      ],
      about: "Casa Café leans on warm photography and a relaxed grid to bring the feeling of the room &mdash; the light, the counter, the regulars &mdash; onto the screen before a visitor ever orders."
    },
    {
      id: "aura-clinic", name: "Aura Clinic", industry: "Healthcare",
      swatch: "linear-gradient(160deg, #345c60, #14171c)",
      desc: "A professional clinic website concept focused on trust, services and contact information.",
      heroTag: "Concept Project &mdash; Healthcare", heroTitle: "Care that looks like care.",
      heroGrad: "linear-gradient(160deg, #345c60, #16232a)",
      sections: [
        { label: "Services", grad: ["#3f6d72","#1f3a3d","#5c9296"] },
        { label: "Team", grad: ["#1f3a3d","#5c9296","#345c60"] }
      ],
      about: "Aura Clinic is designed around clarity and calm &mdash; clean typography, ample whitespace and a straightforward path from concern to appointment, so trust is established before the first visit."
    },
    {
      id: "misty-hills", name: "Misty Hills Resort", industry: "Resort",
      swatch: "linear-gradient(160deg, #4a5a6b, #14171c)",
      desc: "A cinematic resort website concept built around destination and scale.",
      heroTag: "Concept Project &mdash; Resort", heroTitle: "Let the view do the talking.",
      heroGrad: "linear-gradient(160deg, #4a5a6b, #1a222a)",
      sections: [
        { label: "Experiences", grad: ["#5c7086","#2a343e","#8298ac"] },
        { label: "Location", grad: ["#2a343e","#8298ac","#4a5a6b"] }
      ],
      about: "Misty Hills is built as a full-bleed, cinematic experience &mdash; wide imagery, slow reveals and minimal copy &mdash; treating the destination itself as the hero of the site."
    },
    {
      id: "local-co", name: "Local & Co.", industry: "Small Business",
      swatch: "linear-gradient(160deg, #c9a227, #1c1710)",
      desc: "A clean, confident business website concept for a growing local brand.",
      heroTag: "Concept Project &mdash; Small Business", heroTitle: "A local name, done properly.",
      heroGrad: "linear-gradient(160deg, #c9a227, #241d10)",
      sections: [
        { label: "What We Do", grad: ["#d9b64a","#4a3d1c","#c9a227"] },
        { label: "Get In Touch", grad: ["#4a3d1c","#c9a227","#d9b64a"] }
      ],
      about: "Local & Co. shows how a modest, single-location business can carry a premium presentation without needing a large catalogue of pages &mdash; just a clear story, told well."
    }
  ];

  var SELECTOR_OPTIONS = [
    { key: "hotel", label: "Hotel", headline: "Rooms. Experiences. Location.\nAll in one digital experience.", copy: "A hotel site built around what guests actually decide with: room types, real photography, and how easy it is to reach you.", grad: "linear-gradient(160deg, #345c60, #14171c)" },
    { key: "cafe", label: "Café", headline: "Menu. Atmosphere. Story.\nMake customers want to visit.", copy: "A café site that leads with feeling &mdash; the menu, the space, the people behind the counter &mdash; not a generic contact page.", grad: "linear-gradient(160deg, #7a3c26, #1c1210)" },
    { key: "resort", label: "Resort", headline: "Let your destination sell itself.", copy: "Large-format imagery and a slower pace of scroll, built for a place people are dreaming about before they book.", grad: "linear-gradient(160deg, #4a5a6b, #14171c)" },
    { key: "clinic", label: "Clinic", headline: "Professional. Trustworthy. Accessible.", copy: "A calm, credible presentation of your services and team, designed to build confidence before the first appointment.", grad: "linear-gradient(160deg, #1f3a3d, #14171c)" },
    { key: "lodge", label: "Lodge", headline: "A quiet stay, presented with care.", copy: "Natural tones and unhurried pacing that reflect what a lodge or homestay actually offers &mdash; a slower kind of hospitality.", grad: "linear-gradient(160deg, #2c4a34, #14171c)" },
    { key: "other", label: "Other", headline: "Your business, its own visual language.", copy: "Every VisionX site starts from your brand and audience, not a template &mdash; tell us about your business and we'll shape the direction together.", grad: "linear-gradient(160deg, #5b4a8a, #14171c)" }
  ];

  /* ---------------------------------------------------------
     NAV: scroll state + mobile menu
  --------------------------------------------------------- */
  var nav = document.getElementById("siteNav");
  var burger = document.getElementById("navBurger");
  var mobileMenu = document.getElementById("navMobile");

  function onScrollNav(){
    if(window.scrollY > 40){ nav.classList.add("scrolled"); }
    else{ nav.classList.remove("scrolled"); }
  }
  window.addEventListener("scroll", onScrollNav, { passive: true });
  onScrollNav();

  burger.addEventListener("click", function(){
    var open = burger.classList.toggle("open");
    mobileMenu.classList.toggle("open", open);
    burger.setAttribute("aria-expanded", open ? "true" : "false");
    document.body.style.overflow = open ? "hidden" : "";
  });
  mobileMenu.querySelectorAll("a").forEach(function(a){
    a.addEventListener("click", function(){
      burger.classList.remove("open");
      mobileMenu.classList.remove("open");
      document.body.style.overflow = "";
    });
  });

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
     HERO: word reveal + transformation stepper
  --------------------------------------------------------- */
  var heroSection = document.getElementById("hero");
  requestAnimationFrame(function(){
    requestAnimationFrame(function(){ heroSection.classList.add("loaded"); });
  });

  var tCard = document.getElementById("transformCard");
  if(tCard && !reduceMotion){
    var step = 0;
    tCard.classList.add("step-0");
    setInterval(function(){
      step = (step + 1) % 3;
      tCard.classList.remove("step-0","step-1","step-2");
      tCard.classList.add("step-" + step);
      tCard.parentElement.classList.toggle("step-2-active", step === 2);
    }, 2200);
  } else if(tCard){
    tCard.classList.add("step-2");
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
     BUILD: category cards
  --------------------------------------------------------- */
  var catGrid = document.getElementById("catGrid");
  CATEGORIES.forEach(function(cat, i){
    var card = document.createElement("div");
    card.className = "cat-card";
    card.style.setProperty("--cat-grad", cat.grad);
    card.tabIndex = 0;
    card.innerHTML =
      '<span class="cat-index">0' + (i+1) + '</span>' +
      '<h3>' + cat.name + '</h3>' +
      '<p class="cat-desc">' + cat.desc + '</p>' +
      '<span class="cat-explore">Explore Concept &rarr;</span>';
    catGrid.appendChild(card);
  });

  /* ---------------------------------------------------------
     BUILD: portfolio / concept project cards
  --------------------------------------------------------- */
  var portfolioGrid = document.getElementById("portfolioGrid");
  PROJECTS.forEach(function(proj, i){
    var num = String(i+1).padStart(2,"0");
    var card = document.createElement("article");
    card.className = "proj-card";
    card.tabIndex = 0;
    card.setAttribute("role","button");
    card.setAttribute("aria-label","View concept: " + proj.name);
    card.innerHTML =
      '<div class="proj-visual">' +
        '<div class="proj-chrome">' +
          '<span class="proj-dot"></span><span class="proj-dot"></span><span class="proj-dot"></span>' +
          '<span class="proj-chrome-url">visionx.studio/' + proj.id + '</span>' +
        '</div>' +
        '<div class="proj-mini" style="background:' + proj.swatch + '">' +
          '<span class="proj-mini-eyebrow">' + proj.industry + '</span>' +
          '<span class="proj-mini-title">' + proj.heroTitle + '</span>' +
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
    card.addEventListener("keypress", function(e){ if(e.key === "Enter") openModal(proj); });
    portfolioGrid.appendChild(card);
  });

  /* ---------------------------------------------------------
     MODAL — live website preview
  --------------------------------------------------------- */
  var modal = document.getElementById("conceptModal");
  var modalScroll = document.getElementById("modalScroll");
  var modalBackdrop = document.getElementById("modalBackdrop");
  var modalClose = document.getElementById("modalClose");
  var lastFocused = null;

  function openModal(proj){
    var urlLabel = document.getElementById("modalChromeUrl");
    if(urlLabel) urlLabel.textContent = "visionx.studio/" + proj.id;
    modalScroll.innerHTML = buildPreviewMarkup(proj);
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
  document.addEventListener("keydown", function(e){
    if(e.key === "Escape" && modal.classList.contains("open")) closeModal();
  });

  function buildPreviewMarkup(proj){
    var sectionsHtml = proj.sections.map(function(sec){
      return '<div class="mp-section">' +
        '<h4>' + sec.label + '</h4>' +
        '<div class="mp-grid">' +
          '<div class="mp-swatch" style="background:' + sec.grad[0] + '"></div>' +
          '<div class="mp-swatch" style="background:' + sec.grad[1] + '"></div>' +
          '<div class="mp-swatch" style="background:' + sec.grad[2] + '"></div>' +
        '</div>' +
      '</div>';
    }).join("");

    return (
      '<div class="mp-hero" style="background:' + proj.heroGrad + '">' +
        '<p class="mp-tag">' + proj.heroTag + '</p>' +
        '<h2>' + proj.heroTitle + '</h2>' +
      '</div>' +
      '<div class="mp-section">' +
        '<h4>About</h4>' +
        '<p class="mp-text">' + proj.about + '</p>' +
      '</div>' +
      sectionsHtml +
      '<div class="mp-section">' +
        '<h4>Location &amp; Contact</h4>' +
        '<div class="mp-contact-grid">' +
          '<div><strong>Location</strong><br>Placeholder address line</div>' +
          '<div><strong>Contact</strong><br>Placeholder phone &amp; email</div>' +
        '</div>' +
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

  function selectBusiness(key){
    var opt = SELECTOR_OPTIONS.find(function(o){ return o.key === key; });
    if(!opt) return;

    Array.from(selectorTabs.children).forEach(function(tab){
      var isActive = tab.textContent === opt.label;
      tab.classList.toggle("active", isActive);
      tab.setAttribute("aria-selected", isActive ? "true" : "false");
    });

    selectorDisplay.style.background = "linear-gradient(160deg, rgba(201,162,39,.06), rgba(31,58,61,.14))";
    selectorDisplay.innerHTML =
      '<div class="sel-content">' +
        '<h3>' + opt.headline.replace(/\n/g,"<br>") + '</h3>' +
        '<p>' + opt.copy + '</p>' +
      '</div>' +
      '<div class="sel-visual" style="background:' + opt.grad + '"></div>';
  }
  selectBusiness(SELECTOR_OPTIONS[0].key);

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
     CONTACT FORM (no backend — front-end confirmation only)
  --------------------------------------------------------- */
  var form = document.getElementById("contactForm");
  var formNote = document.getElementById("formNote");
  var submitBtn = document.getElementById("submitBtn");

  form.addEventListener("submit", function(e){
    e.preventDefault();
    if(!form.checkValidity()){
      formNote.textContent = "Please fill in the required fields.";
      form.reportValidity();
      return;
    }
    submitBtn.disabled = true;
    submitBtn.textContent = "Sending…";
    setTimeout(function(){
      formNote.textContent = "Thanks — your inquiry has been noted. This form is a front-end demo and isn't connected to a live inbox yet.";
      submitBtn.textContent = "Send Project Inquiry \u2192";
      submitBtn.disabled = false;
      form.reset();
    }, 900);
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

})();