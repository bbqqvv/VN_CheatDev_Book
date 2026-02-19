# ⚔️ Chương 2: Làm Chủ Cheat Engine (Weapon Mastery)

> *"Cheat Engine không chỉ là tool hack. Nó là kính hiển vi, là dao mổ, và là khẩu súng bắn tỉa của mọi Game Hacker."*

---

## 🛑 SỨ MỆNH (MISSION BRIEFING)
Ở Chương 1, bạn đã biết RAM là chiến trường.
Ở Chương này, bạn sẽ học cách sử dụng vũ khí tối thượng: **Cheat Engine (CE)**.

Đừng lầm tưởng CE chỉ dùng để chỉnh tiền game offline. Các kỹ thuật `Scan`, `Debugger`, `Disassembler` của nó là nền tảng cho mọi tool hack cao cấp sau này (kể cả hack game online).

**Mục tiêu:**
1.  Hiểu cơ chế **Lọc (Filtering)** của CE.
2.  Thành thạo 3 kỹ thuật Scan tử thần: **Exact Value**, **Unknown Initial Value**, **Floating Point**.
3.  Biết cách tạo **Cheat Table (.CT)** để lưu trữ chiến công.

---

## 2.1. Cơ Chế Hoạt Động (The Logic) 🧠
Làm sao CE tìm được đúng địa chỉ máu trong đống hỗn độn hàng tỷ byte của RAM?
Nó dùng phương pháp **LOẠI TRỪ (Elimination)**.

![Scanning Logic Diagram](images/scanning_logic.png)

1.  **First Scan:** Quét toàn bộ RAM xem ai có giá trị `100` (giả sử máu là 100). Có thể tìm ra 1 triệu kết quả.
2.  **Change:** Bạn vào game, để quái đánh còn `90` máu.
3.  **Next Scan:** Bảo CE "Trong 1 triệu thằng kia, thằng nào giờ biến thành 90?".
4.  **Repeat:** Lặp lại cho đến khi chỉ còn 1 kẻ sống sót. Đó là địa chỉ máu.

---

## 2.2. Kỹ Thuật 1: Exact Value Scan (Xạ Thủ) 🔫
Dùng khi bạn **nhìn thấy số cụ thể** trên màn hình (Máu, Đạn, Tiền).

**Bài Tập:** Hack Đạn trong `DummyGame` (hoặc Tutorial Step 2 của CE).

**Quy Trình Tác Chiến:**
1.  **Nhập số đạn hiện tại** (VD: 30) vào ô `Value`.
2.  Chọn `Scan Type` = **Exact Value**.
3.  Chọn `Value Type` = **4 Bytes** (Chuẩn công nghiệp).
4.  Bấm **First Scan**. (Kết quả: Hàng ngàn địa chỉ).
5.  Vào game bắn 1 viên (Đạn còn 29).
6.  Nhập `29` vào ô `Value` -> Bấm **Next Scan**.
7.  Lặp lại cho đến khi còn dưới 5 địa chỉ.
8.  Kéo xuống dưới (Cheat Table), sửa Value thành `9999`.
9.  Vào game bắn thử. Nếu đạn không giảm hoặc tăng lên 9999 -> **HEADSHOT!** 🎯

---

## 2.3. Kỹ Thuật 2: Unknown Initial Value (Truy Vết) 👣
Dùng khi bạn **không biết số cụ thể** (Thanh máu dạng thanh trượt, không hiện số).

**Quy Trình Tác Chiến:**
1.  Chọn `Scan Type` = **Unknown initial value**.
2.  Bấm **First Scan**. (CE sẽ ghi nhớ toàn bộ RAM hiện tại).
3.  Vào game, để mất một ít máu.
4.  Chọn `Scan Type` = **Decreased value** (Giá trị đã giảm).
5.  Bấm **Next Scan**.
6.  Vào game, đứng yên hồi máu (hoặc bơm máu).
7.  Chọn `Scan Type` = **Increased value**.
8.  Bấm **Next Scan**.
9.  Lặp lại (Decreased/Increased/Unchanged) cho đến khi tìm ra.

> **Mẹo:** Nếu thanh máu đầy, quét Scan Type = **Changed value** liên tục cũng là một cách hay.

---

## 2.4. Kỹ Thuật 3: Floating Point (Bắn Tỉa Tọa Độ) 📡
Dùng cho **Máu (dạng %)** hoặc **Tọa độ (X, Y, Z)**.
Máy tính lưu số thực (có dấu chấm) khác hoàn toàn số nguyên.

**Quy Trình:**
*   Đổi `Value Type` từ `4 Bytes` sang **Float**.
*   Các bước Scan y hệt như Exact Value.
*   **Lưu ý:** Nếu Scan Float không ra, hãy thử **Double**. (Game xịn thường dùng Double cho tọa độ để bản đồ rộng không bị lỗi).

---

## 2.5. Memory Viewer & Pointers (Thâm Nhập Sâu) 🕵️‍♂️
Tìm được địa chỉ chưa phải là xong. Khởi động lại game là mất.
Chúng ta cần tìm **Con Trỏ (Pointer)** để hack vĩnh viễn.

1.  Chuột phải vào địa chỉ hack được -> **Pointer Scan for this address**.
2.  Chọn **Max Level** = 5 (Đừng tham quá, 5 tầng là đủ sâu).
3.  Bấm OK và chờ đợi.
4.  Sau khi Scan xong, tắt game bật lại.
5.  Vào bảng Pointer Scan -> **Rescan memory** -> Chọn process game mới.
6.  Những pointer nào vẫn trỏ đúng về máu -> Đó là **Pointer Xịn**.

---

## 🛑 NHIỆM VỤ VỀ NHÀ (HOMEWORK)
1.  Hoàn thành **Tutorial 1 đến 5** của Cheat Engine (Vào Help -> Cheat Engine Tutorial).
2.  Dùng `DummyGame.exe` ở chương 1:
    *   Hack `Health` thành 99999.
    *   Hack `Ammo` thành vô hạn.
    *   Tìm Pointer của `Health` (Level nâng cao).

---

[Tiếp theo: Chương 3 - External Hacking (C++ Project đầu tiên)](../03_Lap_Trinh_External/README.md)
