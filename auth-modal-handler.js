const AuthModalHandler = {
  init() {
    const style = document.createElement("style");
    style.textContent = `
      .form-control.is-invalid {
        background-image: none !important;
      }
    `;
    document.head.appendChild(style);

    const mainModal = document.getElementById("mainModal");
    if (!mainModal) return;

    // Prevent closing modal when clicking outside
    mainModal.setAttribute("data-bs-backdrop", "static");
    mainModal.setAttribute("data-bs-keyboard", "false");

    this.CODE = "1191";
    this.modalTitle = mainModal.querySelector(".modal-title");
    this.modalBody = mainModal.querySelector(".modal-body");
    this.modalFooter = mainModal.querySelector(".modal-footer");

    const check = localStorage.getItem("authCode") === this.CODE;
    if (!check) {
      this.hideProtectedContent();
      this.showAuthModal();
    }
  },

  hideProtectedContent() {
    document.querySelectorAll(".protected-content").forEach((el) => {
      el.classList.add("d-none");
    });
  },

  showProtectedContent() {
    document.querySelectorAll(".protected-content").forEach((el) => {
      el.classList.remove("d-none");
    });
  },

  showAuthModal() {
    if (!this.modalTitle || !this.modalBody || !this.modalFooter) return;

    this.modalTitle.textContent = "Xác minh";

    this.modalBody.innerHTML = `
            <div class="text-center">
                <p class="mb-3">Vui lòng nhập mã xác minh để tiếp tục</p>
                <div class="position-relative">
                    <input type="password" 
                           id="authCode" 
                           class="form-control text-center" 
                           placeholder="Nhập mã xác minh"
                           maxlength="10">
                    <button type="button" 
                            class="btn btn-link position-absolute top-5 end-0 translate-middle-y text-decoration-none p-0"
                            id="togglePassword"
                            style="width: 46px;">
                        <i class="bi bi-eye-slash"></i>
                    </button>
                    <div class="invalid-feedback">Mã xác minh không đúng</div>
                </div>
            </div>
        `;

    this.modalFooter.innerHTML = `
            <button type="button" class="btn custom-btn" id="verifyBtn">
                Xác nhận
            </button>
        `;

    const input = document.getElementById("authCode");
    const verifyBtn = document.getElementById("verifyBtn");
    const toggleBtn = document.getElementById("togglePassword");

    toggleBtn.addEventListener("click", () => {
      const type =
        input.getAttribute("type") === "password" ? "text" : "password";
      input.setAttribute("type", type);

      const icon = toggleBtn.querySelector("i");
      if (type === "text") {
        icon.classList.remove("bi-eye-slash");
        icon.classList.add("bi-eye");
      } else {
        icon.classList.remove("bi-eye");
        icon.classList.add("bi-eye-slash");
      }
    });

    input.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        this.verifyCode();
      }
    });

    input.addEventListener("input", () => {
      input.classList.remove("is-invalid");
    });

    verifyBtn.addEventListener("click", () => this.verifyCode());

    // Initialize modal with static backdrop
    const bsModal = new bootstrap.Modal(document.getElementById("mainModal"), {
      backdrop: "static",
      keyboard: false,
    });
    bsModal.show();
  },

  verifyCode() {
    const input = document.getElementById("authCode");
    if (!input) return;
    const code = input.value;

    if (code === this.CODE) {
      localStorage.setItem("authCode", code);
      this.showProtectedContent();
      const mainModal = document.getElementById("mainModal");
      if (mainModal) {
        const bsModal = bootstrap.Modal.getInstance(mainModal);
        if (bsModal) {
          bsModal.hide();
        }
      }
    } else {
      input.classList.add("is-invalid");
    }
  },
};

document.addEventListener("DOMContentLoaded", () => {
  AuthModalHandler.init();
});
