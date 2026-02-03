window.blazorShowToast = (toastId) => {
    const toastEl = document.getElementById(toastId);
    if (toastEl) {
        if (window.bootstrap && window.bootstrap.Toast) {
            const toast = bootstrap.Toast.getOrCreateInstance(toastEl);
            toast.show();
        } else if (window.$ && window.$.fn.toast) {
            window.$(toastEl).toast('show');
        }
    }
};
window.showMatchToast = (text, success) => {
    const toastEl = document.getElementById('matchToast');
    const body = document.getElementById('matchToastBody');

    body.innerText = text;

    toastEl.classList.remove('bg-success', 'bg-danger');
    toastEl.classList.add(success ? 'bg-success' : 'bg-danger');

    const toast = bootstrap.Toast.getOrCreateInstance(toastEl);
    toast.show();
};
