
export const scrollToTop = (smooth = false) => {
    if (smooth) {
        window.scrollTo({
        top: 0,
        behavior: "smooth",
        });
    } else {
        document.documentElement.scrollTop = 0;
    }
};