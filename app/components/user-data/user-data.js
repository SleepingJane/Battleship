class UserData {
    constructor(el) {
        this.btn = el.querySelector('.js-start');
        this.name = el.querySelector('.js-input');
        this.form = el.querySelector('.js-data-form');

        this.setListeners();
    }

    setListeners() {
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.onFormSubmit();
        });
    }

    onFormSubmit() {
        if (this.name.value !== '') {
            this.showBoard();
        }
    }

    showBoard() {
        let hide = document.getElementById("hideContent");
        let show = document.getElementById("showContent");

        hide.style.display = "none";
        show.style.display = "block";
    }
}

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.js-data-user').forEach((item) => {
        new UserData(item);
    });
});