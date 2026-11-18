(function () {
    "use strict";

    document.addEventListener("DOMContentLoaded", function () {
        // Scroll to top
        var scrollTop = document.getElementById("scrollTop");
        if (scrollTop) {
            window.addEventListener("scroll", function () {
                if (window.scrollY > 300) {
                    scrollTop.classList.add("show");
                } else {
                    scrollTop.classList.remove("show");
                }
            });
        }

        // Theme toggle
        var themeToggle = document.getElementById("themeToggle");
        if (themeToggle) {
            var themeIcon = themeToggle.querySelector("i");

            function refreshThemeIcon() {
                var dark = document.documentElement.getAttribute("data-bs-theme") === "dark";
                if (themeIcon) {
                    themeIcon.className = dark ? "fa fa-sun-o" : "fa fa-moon-o";
                }
                themeToggle.setAttribute("aria-label", dark ? "Switch to light mode" : "Switch to dark mode");
            }

            refreshThemeIcon();
            themeToggle.addEventListener("click", function () {
                var current = document.documentElement.getAttribute("data-bs-theme");
                var next = current === "dark" ? "light" : "dark";
                document.documentElement.setAttribute("data-bs-theme", next);
                localStorage.setItem("theme", next);
                refreshThemeIcon();
            });
        }

        // Mobile navbar: animated hamburger, body scroll lock, auto-close on link tap
        var collapse = document.getElementById("navbarResponsive");
        var toggler = document.querySelector("#mainNav .navbar-toggler");

        if (collapse && toggler) {
            var icon = toggler.querySelector("i");

            function setOpen(open) {
                if (icon) {
                    icon.className = open ? "fa fa-close" : "fa fa-bars";
                }
                document.body.classList.toggle("nav-open", open);
            }

            collapse.addEventListener("show.bs.collapse", function () { setOpen(true); });
            collapse.addEventListener("hide.bs.collapse", function () { setOpen(false); });
            collapse.addEventListener("hidden.bs.collapse", function () { setOpen(false); });

            collapse.querySelectorAll("a.nav-link").forEach(function (link) {
                link.addEventListener("click", function () {
                    if (collapse.classList.contains("show") && window.bootstrap) {
                        var bsCollapse = window.bootstrap.Collapse.getInstance(collapse);
                        if (bsCollapse) {
                            bsCollapse.hide();
                        }
                    }
                });
            });
        }
    });
})();

// Initialize AOS scroll animations. The library is loaded via script.min.js but
// never auto-starts, so without this every [data-aos] element stays at opacity:0.
if (window.AOS) {
    window.AOS.init({
        once: true,
        offset: 80,
        duration: 700,
        easing: "ease-out-cubic"
    });
}
