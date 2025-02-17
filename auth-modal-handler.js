const AuthModalHandler = {
  init() {
    this.modal = new bootstrap.Modal(document.getElementById("mainModal"), {
      backdrop: "static",
      keyboard: false,
    });
    (this.CODE = "1234"),
      (this.modalTitle = document.querySelector("#mainModalLabel"));
    this.modalBody = document.querySelector(".modal-body");
    this.modalFooter = document.querySelector(".modal-footer");
    const check = localStorage.getItem("authCode") === this.CODE;
    if (!check) {
      // Ẩn tất cả content cần bảo vệ
      this.hideProtectedContent();
      // Show modal xác thực ngay khi load trang
      this.showAuthModal();
    }
  },

  hideProtectedContent() {
    // Thêm class 'd-none' vào các phần tử cần bảo vệ
    document.querySelectorAll(".protected-content").forEach((el) => {
      el.classList.add("d-none");
    });
  },

  showProtectedContent() {
    // Hiện các phần tử được bảo vệ
    document.querySelectorAll(".protected-content").forEach((el) => {
      el.classList.remove("d-none");
    });
  },

  showAuthModal() {
    this.modalTitle.textContent = "Xác minh";

    // Tạo form xác thực
    this.modalBody.innerHTML = `
            <div class="text-center">
                <p class="mb-3">Vui lòng nhập mã xác minh để tiếp tục</p>
                <input type="password" 
                       id="authCode" 
                       class="form-control text-center" 
                       placeholder="Nhập mã xác minh"
                       maxlength="10">
                <div class="invalid-feedback">Mã xác minh không đúng</div>
            </div>
        `;

    // Cập nhật footer
    this.modalFooter.innerHTML = `
            <button type="button" class="btn custom-btn" id="verifyBtn">
                Xác nhận
            </button>
        `;

    // Thêm event listeners
    const input = document.getElementById("authCode");
    const verifyBtn = document.getElementById("verifyBtn");

    input.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        this.verifyCode();
      }
    });

    verifyBtn.addEventListener("click", () => this.verifyCode());

    // Show modal
    this.modal.show();
  },

  verifyCode() {
    const input = document.getElementById("authCode");
    const code = input.value;

    if (code === this.CODE) {
      localStorage.setItem("authCode", code);
      this.showProtectedContent();
      this.modal.hide();
    } else {
      input.classList.add("is-invalid");
      input.addEventListener("change", () => {
        input.classList.remove("is-invalid");
      });
    }
  },
};

// Initialize khi document ready
document.addEventListener("DOMContentLoaded", () => {
  AuthModalHandler.init();
});
