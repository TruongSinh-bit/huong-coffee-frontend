# Hệ thống Quản lý Quán Cà phê Thông minh - Hương Coffee

Chào mừng bạn đến với dự án **Hương Coffee** - giải pháp quản lý quán cà phê toàn diện từ khâu đặt món trực tuyến đến vận hành tại quầy.

---

## 🌟 Tính năng chính

### 1. Dành cho Khách hàng (Client)
*   **Đặt món trực tuyến:** Xem menu, giỏ hàng và đặt món dễ dàng.
*   **Thanh toán Online:** Tích hợp cổng thanh toán VNPay an toàn, tiện lợi.
*   **Quản lý tài khoản:** Đăng ký, đăng nhập bắt buộc để bảo mật thông tin đơn hàng.
*   **Khôi phục mật khẩu:** Hệ thống gửi link reset mật khẩu qua Email (đăng ký bằng email).
*   **Thông tin giao hàng:** Tự động lưu thông tin khách hàng (Tên, SĐT, Địa chỉ) cho các đơn hàng Online.

### 2. Dành cho Nhân viên & Quản lý (Admin)
*   **Quản lý Bán hàng:** Giao diện gọi món tại bàn, theo dõi trạng thái bàn (Trống, Đang dùng, Chờ thanh toán).
*   **Thông báo thời gian thực:** Nhận thông báo ngay lập tức khi có đơn hàng Online mới qua WebSocket.
*   **Quản lý Đơn hàng:** Xem chi tiết hóa đơn, bao gồm cả thông tin giao hàng của khách Online.
*   **Quản lý Menu:** Thêm, sửa, xóa các món ăn, đồ uống và danh mục dịch vụ.
*   **Quản lý Bàn:** Sơ đồ bàn trực quan, quản lý trạng thái và vị trí bàn.
*   **Báo cáo & Thống kê:** Biểu đồ doanh thu theo ngày/tháng, thống kê các món bán chạy nhất.
*   **Quản lý người dùng:** Phân quyền chi tiết (Admin, Manager, Employee, Customer).

---

## 🛠 Công nghệ sử dụng

*   **Frontend:** ReactJS, Vanilla CSS (Premium Dark Theme), Bootstrap, Axios, SockJS/Stomp (WebSocket).
*   **Backend:** Java 17, Spring Boot 3.x, Spring Security (JWT), Spring Data JPA.
*   **Cơ sở dữ liệu:** MySQL.
*   **Tích hợp:** VNPay (Thanh toán), Java Mail Sender (Gửi mail reset mật khẩu).

---

## 🚀 Hướng dẫn chạy dự án

### 1. Yêu cầu hệ thống
*   Java Development Kit (JDK) 17 trở lên.
*   Node.js và npm.
*   MySQL Server.

### 2. Cài đặt Backend
1.  Truy cập thư mục `smart_cafe_backend`.
2.  Cấu hình Database trong file `src/main/resources/application.properties`:
    ```properties
    spring.datasource.url=jdbc:mysql://localhost:3306/smart_cafe
    spring.datasource.username=YOUR_USERNAME
    spring.datasource.password=YOUR_PASSWORD
    ```
3.  Cấu hình Mail (để dùng chức năng quên mật khẩu):
    ```properties
    spring.mail.host=smtp.gmail.com
    spring.mail.username=your-email@gmail.com
    spring.mail.password=your-app-password
    ```
4.  Chạy ứng dụng bằng IDE (IntelliJ/Eclipse) hoặc lệnh:
    ```bash
    mvn spring-boot:run
    ```

### 3. Cài đặt Frontend
1.  Truy cập thư mục `smart_cafe_frontend`.
2.  Cài đặt các thư viện cần thiết:
    ```bash
    npm install
    ```
3.  Khởi động dự án:
    ```bash
    npm start
    ```
    Ứng dụng sẽ chạy tại: `http://localhost:3000`

---

## 🔑 Tài khoản thử nghiệm (Demo)

| Vai trò | Tên đăng nhập | Mật khẩu |
| :--- | :--- | :--- |
| **Admin** | `admin1` | `123456` |
| **Nhân viên** | `employee1` | `123456` |
| **Khách hàng** | (Tự đăng ký trên giao diện Client) | |

---

## 📧 Liên hệ
Nếu có bất kỳ câu hỏi nào, vui lòng liên hệ qua email: `mutdshop@gmail.com`
Hương Coffee - Mang hương vị cà phê đến tận tay bạn!
