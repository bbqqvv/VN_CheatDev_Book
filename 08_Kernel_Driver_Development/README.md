# Chương 8: Kernel Driver Development (Đỉnh Cao Bảo Mật) 🛡️

*"Welcome to Ring 0. Nơi một dòng code sai làm màn hình xanh (BSOD)."*

Tại sao Hacker phải xuống Kernel?
Vì Anti-Cheat (EAC, Vanguard) đang ngồi ở đó. Nếu bạn ở User Mode (Ring 3), bạn là dân thường, Anti-Cheat là Cảnh sát. Cảnh sát có quyền khám xét, bắt giữ bạn.
Nếu bạn xuống Kernel (Ring 0), bạn là Đặc vụ ngầm. Bạn ngang hàng hoặc cao hơn Cảnh sát.

---

## 8.1. Kiến Trúc Windows (Ring Levels)
*   **Ring 3 (User Mode):** Ứng dụng bình thường. Bị giới hạn bởi các hàm API. Không thể đọc RAM của tiến trình System.
*   **Ring 0 (Kernel Mode):** Quyền năng tuyệt đối. Truy cập trực tiếp phần cứng, bộ nhớ vật lý.

Anti-Cheat dùng **ObRegisterCallbacks** trong Kernel để chặn quyền `OpenProcess` của Cheat Engine. Đó là lý do bạn bật CE lên nhưng không attach được vào game.

---

## 8.2. Viết Driver Cheat (.sys)
Để viết Driver, bạn cần **WDK (Windows Driver Kit)** và **Visual Studio**.

### Hàm quan trọng trong Driver:
1.  `DriverEntry`: Hàm Main của Driver.
2.  `MmCopyVirtualMemory`: Hàm copy RAM từ Process này sang Process khác (Đây là `ReadProcessMemory` phiên bản Kernel).
3.  `PsLookupProcessByProcessId`: Tìm Process Game trong Kernel.

### Giao tiếp IOCTL
App Hack (Client) ở User Mode không thể gọi hàm Kernel. Nó phải gửi "tín hiệu" qua cổng IOCTL.
1.  Scanner.exe (User) gửi lệnh: `IOCTL_READ_MEMORY` + `Address: 0x123` + `PID: Game`.
2.  Driver.sys (Kernel) nhận lệnh -> Thực hiện đọc RAM -> Trả kết quả về Scanner.

---

## 8.3. Load Driver (Vấn đề Chữ Ký)
Windows 10/11 bắt buộc mọi Driver phải có Chữ ký số (Digital Signature) của Microsoft (tốn hàng nghìn $).
Hacker lách luật bằng cách: **KDMapper (Intel Manual Map)**.
*   Lợi dụng một Driver cũ của Intel/Nvidia/Capcom có lỗ hổng bảo mật nhưng có chữ ký xịn.
*   Dùng Driver lỗi đó để "cõng" Driver hack của mình vào Kernel (Manual Map).
*   Sau khi vào xong, xóa dấu vết của Driver lỗi. Driver hack vẫn nằm trong RAM và chạy nhưng không có trong danh sách quản lý của Windows (Driverless).

---

## 8.4. Bypass Anti-Cheat (Cơ bản)
1.  **Handle Stripping:** Nếu tool hack của bạn lỡ mở Handle vào game, Anti-Cheat sẽ quét thấy. Driver cho phép bạn đọc/ghi mà không cần mở Handle.
2.  **CR3 Paging:** Anti-Cheat chặn truy cập bộ nhớ ảo? Driver đọc thẳng Bộ nhớ vật lý (Physical Memory) thông qua thanh ghi CR3 (Directory Table Base).

**Lưu ý:** Lập trình Kernel cực khó và nguy hiểm. Sai một ly đi một dặm (Blue Screen). Hãy test trên Máy ảo (VMware) trước.

[Tiếp theo: Chương 9 - Anti-Cheat Evasion](../09_AntiCheat_Evasion/README.md)
