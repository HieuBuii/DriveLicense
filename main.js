// Lấy tất cả các phần tử có class là "footer-item"
const footerItems = document.querySelectorAll(".footer-item");

// Lặp qua từng phần tử footer-item
footerItems.forEach((item) => {
  // Lắng nghe sự kiện click trên mỗi phần tử footer-item
  item.addEventListener("click", function () {
    // Lấy tất cả các phần tử có class là "footer-item-top"
    const footerItemTops = document.querySelectorAll(".footer-item-top");

    // Lặp qua từng phần tử footer-item-top
    footerItemTops.forEach((top) => {
      // Xóa class "actived" khỏi tất cả các footer-item-top
      top.classList.remove("actived");
    });

    // Thêm class "actived" vào phần tử con của footer-item hiện tại có class là "footer-item-top"
    this.querySelector(".footer-item-top").classList.add("actived");
  });
});

const FormHandler = {
  init() {
    this.formContainer = document.getElementById("form-registor");
    this.formBookingContainer = document.getElementById("form-booking");
    this.modalContent = document.querySelector(".modal-body");
    this.myModal = new bootstrap.Modal(document.getElementById("mainModal"));

    this.setupEventListeners();
  },

  setupEventListeners() {
    if (this.formContainer) {
      this.formContainer.addEventListener("submit", (e) =>
        this.handleShowModal(e, false)
      );
    }

    if (this.formBookingContainer) {
      this.formBookingContainer.addEventListener("submit", (e) =>
        this.handleShowModal(e, true)
      );
    }
  },

  handleShowModal(e, isBooking) {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);

    this.modalContent.innerHTML = isBooking
      ? `KH ${data.username}, SĐT: ${data.phone}, đặt lịch hẹn đăng ký hạng ${
          data.rank
        } vào lúc ${this.formatDateTime(data.bookingTime)} tại cơ sở ${
          data.address
        }.<br><br>• Chú ý : Lịch hẹn đã được đặt lên hệ thống, A/C vui lòng đến đúng hẹn để công việc không bị gián đoạn. Xin cảm ơn !!!`
      : `Học viên ${data.username}, sinh ngày: ${this.formatDate(
          data.dataOfBirth
        )}, số CCCD ${data.idNumber}, đã đăng ký ${
          data.rank === "Renew"
            ? "cấp lại bằng"
            : `khóa thi bằng lái xe hạng ${data.rank}`
        } thành công. Mọi thông tin chi tiết về lịch học, thi, ký và bổ sung giấy tờ liên quan sẽ được thông báo qua SMS ${
          data.phone
        }. Xin cảm ơn!`;

    this.myModal.show();
  },

  formatDate(dateString) {
    if (!dateString) return "";
    const [date] = dateString.split("T");
    const [year, month, day] = date.split("-");
    return `${parseInt(day)}/${parseInt(month)}/${year}`;
  },

  formatDateTime(dateTimeString) {
    if (!dateTimeString) return "";

    // Tách chuỗi datetime thành các phần
    const [datePart, timePart] = dateTimeString.split("T");

    // Xử lý phần ngày
    const [_, month, day] = datePart.split("-");
    const formattedDay = parseInt(day);
    const formattedMonth = parseInt(month);

    // Xử lý phần giờ
    const [hour, minute] = timePart.split(":");
    const formattedHour = hour.padStart(2, "0");
    const formattedMinute = minute.padStart(2, "0");

    // Kết hợp thành định dạng mong muốn
    return `${formattedHour}H${formattedMinute} ngày ${formattedDay}/${formattedMonth}`;
  },
};

// Initialize the form handler
FormHandler.init();
