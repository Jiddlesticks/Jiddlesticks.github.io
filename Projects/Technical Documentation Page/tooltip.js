// JavaScript to handle tooltip positioning
document.addEventListener("DOMContentLoaded", function () {
    const tooltips = document.querySelectorAll(".tooltip-container");
    const specialTooltip = document.querySelector(".special-tooltip");

    tooltips.forEach((tooltip) => {
        tooltip.addEventListener("mouseenter", () => {
            const tooltipElement = tooltip.querySelector(".tooltip");
            const rect = tooltip.getBoundingClientRect();

            if (tooltip.classList.contains("special-tooltip")) {
                // Adjust positioning for the special tooltip
                // You can set custom rules here
                tooltipElement.style.left = "0";
                tooltipElement.style.right = "auto"; // Adjust as needed
            } else if (rect.right + tooltipElement.offsetWidth > window.innerWidth) {
                tooltipElement.style.left = "auto";
                tooltipElement.style.right = "0";
            } else if (rect.left - tooltipElement.offsetWidth < 0) {
                tooltipElement.style.left = "0";
                tooltipElement.style.right = "auto";
            } else {
                tooltipElement.style.left = "0";
                tooltipElement.style.right = "auto";
            }
        });

        tooltip.addEventListener("mouseleave", () => {
            const tooltipElement = tooltip.querySelector(".tooltip");
            tooltipElement.style.left = "0";
            tooltipElement.style.right = "auto";
        });
    });
});