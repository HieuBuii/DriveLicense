const submitBtn = document.getElementById("btn-submit");
const myModal = new bootstrap.Modal(document.getElementById("mainModal"));
const formContainer = document.getElementById("form-registor");
const modalContent = document.getElementById("modal-content");

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

function formatDate(dateString) {
  if (!dateString) return "";
  // Chuyển đổi chuỗi thành đối tượng Date
  const date = new Date(dateString);

  // Lấy thông tin ngày, tháng và năm từ đối tượng Date
  const day = date.getDate().toString().padStart(2, "0"); // Pad 0 nếu số ngày chỉ có 1 chữ số
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Tháng bắt đầu từ 0, cần cộng thêm 1
  const year = date.getFullYear();

  // Kết hợp ngày, tháng và năm thành chuỗi định dạng "DD/MM/YYYY"
  const formattedDate = `${day}/${month}/${year}`;

  return formattedDate;
}

const handleShowModal = (e) => {
  e.preventDefault();
  let formData = new FormData(e.target);
  const data = Object.fromEntries(formData);
  modalContent.textContent = `
  Học viên ${data.username}, sinh ngày: ${formatDate(
    data.dataOfBirth
  )}, số CCCD ${data.idNumber}, đã đăng ký ${
    data.rank === "Renew"
      ? "cấp lại bằng"
      : `khóa thi bằng lái xe hạng ${data.rank}`
  }
  thành công. Mọi thông tin chi tiết về lịch học, thi, ký và bổ sung giấy tờ liên quan sẽ được thông báo qua SMS ${
    data.phone
  }. Xin cảm ơn!
  `;
  myModal.show();
};

formContainer.addEventListener("submit", handleShowModal);
