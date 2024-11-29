const menuCheckbox = document.getElementById("check");
const menu = document.getElementById("menu");

const handleCheckboxChange = () => {
    if (menuCheckbox.checked) {
        menu.classList.remove("cs-container-menu-inactivo");
        menu.classList.add("cs-container-menu-activo");
    } else {
        menu.classList.remove("cs-container-menu-activo");
        menu.classList.add("cs-container-menu-inactivo");
    }
};

menuCheckbox.addEventListener("change", handleCheckboxChange);