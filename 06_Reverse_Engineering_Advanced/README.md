# 🧩 Chương 6: Reverse Engineering (Giải Mã Ma Trận)

> *"Lập trình viên viết Code để tạo ra phần mềm. Reverse Engineer đọc phần mềm để tìm lại Code. Chúng ta là những kẻ đi ngược thời gian."*

---

## 🛑 SỨ MỆNH (MISSION BRIEFING)
Đến lúc này, bạn đã biết hack những game đơn giản có sẵn mã nguồn hoặc không bị mã hóa.
Nhưng thế giới thực khốc liệt hơn nhiều. Game online xịn (PUBG, Valorant) không bao giờ đưa source code cho bạn. Chúng chỉ đưa cho bạn một file `.exe` cục mịch.

Nhiệm vụ của bạn: **Dịch ngược (Reverse)** file `.exe` đó trở lại thành logic mà con người hiểu được, để tìm lỗ hổng.

**Mục tiêu:**
1.  Hiểu quy trình **Disassembly** và **Decompilation**.
2.  Đọc hiểu sơ đẳng **Assembly (x64)** - Ngôn ngữ mẹ đẻ của CPU.
3.  Làm quen với **IDA Pro** - "Thánh khí" của giới Reverse.

---

## 6.1. Quy Trình Dịch Ngược (The Pipeline) 🔄
Máy tính không hiểu C++/C#/Python. Nó chỉ hiểu **Machine Code** (0 và 1).
Khi lập trình viên bấm "Build", Code C++ sẽ bị xay nát thành Machine Code.
Reverse Engineering là quá trình cố gắng "ráp" đống vụn vặt đó lại nguyên hình.

![Reverse Engineering Process Diagram](images/re_process.png)

*   **Assembly (ASM):** Là bản dịch thô của Machine Code. Rất dài dòng, khó hiểu, nhưng chính xác 100%.
*   **Pseudocode (C++ giả):** Là phỏng đoán của Tool (IDA Hex-Rays) về logic gốc. Dễ đọc hơn ASM nhiều, nhưng có thể sai.

---

## 6.2. Nhập Môn Assembly x64 (Ngôn Ngữ Của Chúa) 📜
Đừng sợ. Bạn không cần phải viết ASM, bạn chỉ cần **đọc hiểu** nó.

### Các Thanh Ghi (Registers) - "Túi đồ của CPU"
CPU không có RAM. Nó chỉ có các hộc tủ nhỏ gọi là Register để tính toán cho nhanh.
*   `RAX`: Thanh ghi chính (Chứa kết quả trả về của hàm, kết quả cộng trừ...).
*   `RCX, RDX, R8, R9`: Chứa 4 tham số đầu tiên gửi vào hàm (Theo chuẩn Windows x64).
*   `RIP`: Con trỏ lệnh (Instruction Pointer) - Chỉ vào dòng lệnh sắp chạy tiếp theo. **Hack luồng game là sửa cái này.**
*   `RSP`: Con trỏ Stack.

### Các Lệnh Cơ Bản (Instructions)
1.  `MOV A, B` 👉 **Copy**: Chép giá trị B vào A. (A = B)
2.  `ADD A, B` 👉 **Cộng**: A = A + B.
3.  `SUB A, B` 👉 **Trừ**: A = A - B.
4.  `CMP A, B` 👉 **So sánh**: So A với B xem bằng hay lớn hơn.
5.  `JE Address` 👉 **Nhảy nếu bằng (Jump Equal)**: Nếu phép so sánh trên là Bằng, nhảy tới Address.
6.  `JNE Address` 👉 **Nhảy nếu không bằng (Jump Not Equal)**.
7.  `CALL Address` 👉 **Gọi hàm**.

**Ví dụ thực tế:**
Logic Game (C++):
```cpp
if (Health <= 0) {
    Die();
}
```

Dịch sang Assembly:
```asm
CMP [Health], 0    ; So sánh Máu với 0
JG  Living         ; Jump Greater: Nếu lớn hơn 0 thì nhảy tới nhãn "Living" (Sống tiếp)
CALL Die           ; Nếu không nhảy -> Gọi hàm Chết
Living:
...
```

> **Mẹo Hack:** Hacker sẽ sửa lệnh `JG` (Jump Greater) thành `JMP` (Jump Always - Luôn luôn nhảy).
> -> Kết quả: Dù máu = 0 hay -100, game vẫn nhảy tới "Sống tiếp" -> **BẤT TỬ.** 🧛‍♂️

---

## 6.3. IDA Pro - Kính Chiếu Yêu 🧿
IDA Pro là phần mềm đắt đỏ và mạnh mẽ nhất thế giới RE.
(Nhưng chắc bạn sẽ dùng bản "thuốc" thôi, tôi biết mà).

**Các phím tắt sinh tồn trong IDA:**
*   **SPACE:** Chuyển đổi giữa chế độ Text (Code thuần) và Graph (Sơ đồ khối). **Luôn dùng Graph** để dễ nhìn luồng đi (Flowchart).
*   **F5:** Thần chú! Tự động dịch Assembly sang C++ giả (Pseudocode). Giúp bạn hiểu hàm này làm gì trong 1 nốt nhạc.
*   **X (Xref):** Tìm xem hàm/biến này được gọi ở đâu. (Ví dụ: Tìm xem chỗ nào gọi hàm `TruTien` để chặn lại).
*   **N:** Đổi tên hàm/biến (Rename). Đặt tên gợi nhớ (VD: `sub_401000` -> `CheckPassword`) để đỡ bị rối.

---

## 6.4. Bài Tập Thực Hành (Lab 3) 🕵️
**Mục tiêu:** Crack chương trình `CrackMe.exe` đơn giản (Tự code hoặc tải trên mạng).

1.  Viết một chương trình C++ nhỏ yêu cầu nhập Password. Nếu đúng in "Success", sai in "Fail".
2.  Mở file `.exe` đó bằng IDA Pro.
3.  Tìm chuỗi "Fail" (Shift + F12 để mở bảng Strings).
4.  Double click vào chuỗi "Fail" để nhảy tới vùng nhớ chứa nó.
5.  Bấm `X` để xem lệnh nào đang sử dụng chuỗi này.
6.  Nhìn lên trên lệnh đó, bạn sẽ thấy lệnh `CMP` (So sánh pass) và `JZ/JNZ` (Nhảy).
7.  **Patch:** Sửa lệnh Nhảy đó để dù nhập sai nó vẫn nhảy vào nhánh "Success".
    *   (Trong IDA Pro: Edit -> Patch program -> Assemble).

---

## 6.5. ARM Assembly (Mobile) - Khác Biệt Nhỏ 📱
Trên Mobile (Android/iOS), chip ARM dùng tập lệnh khác xíu:
*   `R0 - R15`: Các thanh ghi (Thay vì RAX, RBX).
*   `MOV`, `ADD`, `SUB`: Giống PC.
*   `B` (Branch): Giống `JMP` (Nhảy).
*   `BL` (Branch with Link): Giống `CALL` (Gọi hàm).

Tuy khác tên, nhưng tư duy Logic (So sánh -> Nhảy) là y hệt.

---

[Tiếp theo: Chương 7 - Networking & Packet Hacking (Hack Game Online)](../07_Networking_Packet_Hacking/README.md)
