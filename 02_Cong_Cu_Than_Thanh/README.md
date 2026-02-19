# Chương 2: Công Cụ Thần Thánh (God's Toys) 🛠️

*"Người thợ giỏi không đổ lỗi cho công cụ, nhưng người thợ tồi thì không biết dùng công cụ."*

Để hack game, bạn cần những đôi mắt nhìn xuyên thấu RAM. Đây là bộ công cụ tiêu chuẩn của ngành.

---

## 2.1. Cheat Engine (CE) - Huyền Thoại
Nếu bạn chưa cài Cheat Engine, hãy cài ngay. Đừng tải bản crack, bản gốc miễn phí và mã nguồn mở.

### Các kỹ thuật quét (Scan Types)
1.  **Exact Value (Giá trị chính xác):** Bạn biết rõ số máu là 100. Quét 100. Bị bắn còn 90. Next Scan 90. -> Tìm ra ngay.
2.  **Unknown Initial Value (Giá trị khởi đầu không rõ):** Dùng cho thanh máu không hiện số (chỉ có thanh đỏ).
    *   Bắt đầu quét: "Unknown Initial Value".
    *   Mất máu -> Scan "Decreased Value" (Giá trị giảm).
    *   Hồi máu -> Scan "Increased Value" (Giá trị tăng).
    *   Đứng yên -> Scan "Unchanged Value" (Không đổi).
    *   Lặp lại đến khi còn ít kết quả.

### Pointer Scan (Tìm địa chỉ gốc)
Khi bạn tìm được địa chỉ Máu (VD: `0x12345678`), reset game nó sẽ mất. Bạn cần tìm Pointer.
1.  Chuột phải vào địa chỉ Máu -> **"Pointer scan for this address"**.
2.  CE sẽ lưu lại một bản đồ bộ nhớ (snapshot).
3.  Tắt game, mở lại. Tìm lại địa chỉ Máu mới (VD: `0x22222222`).
4.  Vào cửa sổ Pointer Scan -> **"Rescan memory"** -> Nhập địa chỉ mới `0x22222222`.
5.  CE sẽ so sánh 2 lần quét và chỉ giữ lại những đường dẫn trỏ đúng tới cả 2 địa chỉ. Đó là **Multi-level Pointer** bạn cần.

---

## 2.2. ReClass.NET - Kính Hiển Vi Cấu Trúc
Cheat Engine giúp tìm 1 giá trị. ReClass giúp bạn nhìn thấy **cả một khu phố**.

### Tại sao cần ReClass?
Lập trình viên Game thiết kế nhân vật theo **Class**:
```cpp
class Soldier {
    char pad[4];
    int Health;      // Offset 4
    int Armor;       // Offset 8
    Vector3 Position;// Offset 12 (X, Y, Z)
};
```
Trong bộ nhớ, các biến này nằm sát nhau.
Nếu bạn tìm được `Health`, chắc chắn `Armor` nằm ngay sau nó, và `Position` nằm sau `Armor`.
**ReClass** cho phép bạn nhập địa chỉ `Health` vào, và nó sẽ hiển thị các byte xung quanh dưới dạng bảng. Bạn có thể đoán ra các biến khác mà không cần tìm kiếm.

---

## 2.3. x64dbg & IDA Pro (Dành cho dân chuyên)
*   **x64dbg:** Trình gỡ lỗi (Debugger). Dùng để đặt Breakpoint. Ví dụ: Bạn muốn biết dòng code nào trừ tiền của bạn?
    *   Tìm địa chỉ Tiền.
    *   Đặt **Hardware Breakpoint on Write** (Dừng khi có ghi).
    *   Vào game mua đồ.
    *   Game sẽ "đóng băng" ngay lập tức tại dòng codeAssembly thực hiện việc trừ tiền (`SUB EAX, EBX`).
    *   Bạn có thể sửa lệnh đó thành `NOP` (No Operation - Không làm gì cả) -> Mua đồ không mất tiền.

*   **IDA Pro:** Trình phân tích tĩnh. Dùng để đọc file `.exe` hoặc `.so` khi chưa chạy game. Nó vẽ ra sơ đồ luồng đi (Flowchart) của các hàm logic.

---

## 2.4. Bài Tập Thực Hành (Lab 2)
Sử dụng `DummyGame.exe` (đã biên dịch ở Chương 1).

**Nhiệm vụ 1: Hack Máu**
1.  Dùng CE tìm địa chỉ Máu.
2.  Đóng băng (Freeze) nó cở 999.
3.  Chờ xem console có báo "YOU DIED" không.

**Nhiệm vụ 2: Tìm Offset Đạn (Ammo)**
1.  Bạn đã có địa chỉ Máu (Ví dụ: `0x00EFF964`).
2.  Trong code C++ chương 1, `Health` khai báo trước, `Ammo` khai báo sau. Cả 2 là `int` (4 byte).
3.  Theo logic: Địa chỉ Đạn = Địa chỉ Máu + 4 (`0x00EFF968`).
4.  Thử vào CE, "Add Address Manually", nhập `Địa chỉ Máu + 4`. Xem giá trị đó có phải là 30 (số đạn) không?
5.  Nếu đúng, chúc mừng bạn đã hiểu về **Struct Offset**!

[Tiếp theo: Chương 3 - External Hacking](../03_Lap_Trinh_External/README.md)
