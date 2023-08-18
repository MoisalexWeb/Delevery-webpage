const $menu = document.querySelector(".nav__menu"),
	$nav = document.querySelector(".nav"),
	$body = document.body,
	$scrollButton = document.querySelector(".scroll__button"),
	$sectionsScrollSpy = [...document.querySelectorAll("[data-section]")];

const navStyle = () => {
	if (scrollY >= 100) $nav.classList.add("nav-2")
	else $nav.classList.remove("nav-2")
}

const showScrollButton = () => {
	if (scrollY >= 600) $scrollButton.classList.add("show-button")
	else $scrollButton.classList.remove("show-button")
}


// Remove styles menu when view port witd is at less 768px
const responsiveStylesMenu = () => {
	const breakpoint = window.matchMedia("(min-width: 768px)")

	const responsive = e => {
		if (e.matches) {
			$menu.classList.remove("show-menu")
			$menu.removeAttribute("style")
		}
	}

	breakpoint.addListener(responsive)
	responsive(breakpoint)
}

// Save theme in localStorage
const darkMode = () => {
	if (localStorage.getItem("mode") === "dark") $body.classList.add("dark-mode")
}

// Scroll spy
const scrollSpy = () => {
	const scrollY = window.pageYOffset

    $sectionsScrollSpy.forEach(section => {
        const sectionHeight = section.offsetHeight,
            sectionTop = section.offsetTop - 50,
            sectionId = section.id,
            sectionLink = document.querySelector(`.nav a[href="#${sectionId}"]`);

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        	sectionLink.classList.add('active-section')
        } else sectionLink.classList.remove('active-section');
    });
}

document.addEventListener('click', e => {
	// Show or hide Menu
	if (e.target.matches(".nav__hamburger")) {
		$menu.classList.toggle("show-menu")
		$menu.setAttribute('style', 'transition: transform 0.2s ease')
	}

	// Hide menu
	else if (e.target.matches(".nav__menu__ul-link")) {
		$menu.classList.remove("show-menu")
	}

	// Dark / light mode
	else if (e.target.matches(".nav__menu__theme")) {
		$body.classList.toggle("dark-mode")
		if ($body.classList.contains("dark-mode")) localStorage.setItem("mode", "dark")
		else localStorage.setItem("mode", "light")
	}

	// Scroll button
	else if (e.target === $scrollButton) window.scrollTo(0,0)
})

document.addEventListener('DOMContentLoaded', () => {
	navStyle();
	showScrollButton()
	responsiveStylesMenu()
	darkMode()
	scrollSpy()

})

window.addEventListener('scroll', () => {
	navStyle()
	showScrollButton()
	scrollSpy()
})