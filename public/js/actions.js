document.addEventListener("DOMContentLoaded", function () {
    const productMenus = document.querySelectorAll(".product-menu");
    const modalWindows = document.querySelectorAll(".menu-modal-window");

    productMenus.forEach((menu, index) => {
        menu.addEventListener("click", () => {
            const modalWindow = modalWindows[index];
            if (modalWindow.style.display === "none" || !modalWindow.style.display) {
                modalWindow.style.display = "block";
            } else {
                modalWindow.style.display = "none";
            }
        });
    });

    // Закрытие модального окна при клике вне его
    document.addEventListener("click", function (event) {
        modalWindows.forEach(modal => {
            if (!modal.contains(event.target) && !event.target.closest(".product-menu")) {
                modal.style.display = "none";
            }
        });
    });
});


function deleteItem(id) {
    let result = axios.delete(`/delete/${id}`).then( res => location.reload())
    console.log(result)
}