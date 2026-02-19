# 👻 Chương 9: Anti-Cheat Evasion (Nghệ Thuật Tàng Hình)

> *"Hack đuợc game là Dũng. Hack mà không bị ban là Trí. Vừa hack vừa không bị ban suốt 10 năm là Thánh."*

---

## 🛑 SỨ MỆNH (MISSION BRIEFING)
Bạn đã có súng (Cheat Engine), có kiếm (Internal Hook), có xe tăng (Kernel Driver).
Nhưng kẻ địch (Anti-Cheat) có Radar.
Nếu bạn bật hack lên và 5 phút sau tài khoản "bay màu", thì mọi kỹ thuật bạn học đều vô nghĩa.

**Mục tiêu:**
1.  Hiểu cơ chế phát hiện của Anti-Cheat (Static, Dynamic, Behavioral).
2.  Học cách làm rối mã (Obfuscation) để chống quét tĩnh.
3.  Học cách giả lập hành vi người thật (Humanizer) để chống quét hành vi.

---

## 9.1. Anti-Cheat Hoạt Động Thế Nào? 🛡️
Anti-Cheat (AC) không phải phép thuật. Nó là một chương trình máy tính, và nó hoạt động dựa trên các quy tắc.

![Anti-Cheat Architecture Diagram](images/ac_architecture.png)

1.  **Static Analysis (Quét Tĩnh):** AC đọc file `.exe` hoặc `.dll` hack của bạn trên đĩa. Nó so sánh mã hash (MD5/SHA256) hoặc tìm các chuỗi ký tự đặc trưng (String Scanning).
    *   *Ví dụ:* Nếu trong file hack của bạn có chữ "Cheat Engine" -> BAN.
2.  **Dynamic Analysis (Quét Động):** AC quét RAM khi game đang chạy. Nó tìm các cửa sổ lạ, các luồng (Thread) lạ, hoặc các đoạn code bị tiêm vào (Injection Detect).
3.  **Behavioral Analysis (Hành Vi):** AC (Server-side) theo dõi thống kê.
    *   *Ví dụ:* Tỉ lệ Headshot của bạn là 99%? -> BAN. Chuột của bạn di chuyển một đường thẳng tắp (Aimbot)? -> BAN.

---

## 9.2. Kỹ Thuật Né Tránh (Evasion Arts) 🥷

### 1. Junk Code & Polymorphism (Biến Hình)
Để chống Static Scan (Signature), mỗi lần build hack, file `.exe` phải khác nhau hoàn toàn.
*   **Junk Code:** Chèn thêm các đoạn code vô nghĩa vào.
    ```cpp
    // Code rác
    int a = 123;
    for(int i=0; i<100; i++) a += i;
    // Code hack thật
    HackHealth();
    ```
*   **VMProtect / Themida:** Dùng các phần mềm Packer thương mại để mã hóa file hack mỗi lần một khác.

### 2. String Encryption (Giấu Chữ)
Tuyệt đối không để chuỗi "Hack", "Trainer", "Health" dạng Plaintext trong file.
*   **Xấu:** `FindWindowA(NULL, "Counter-Strike")`
*   **Tốt:** Mã hóa chuỗi "Counter-Strike" thành `XorStr("Nbujufs-Strjlf")`. Khi chạy mới giải mã ra.

### 3. Humanizer (Giả Người)
Để chống Behavioral Scan (Aimbot), đừng bao giờ aim thẳng vào đầu ngay lập tức (Snap).
*   **Smoothing:** Di chuyển tâm từ từ.
*   **Random Bone:** Lúc bắn đầu, lúc bắn ngực, lúc bắn trượt (quan trọng!).
*   **Reaction Time:** Thêm độ trễ. Người thường cần 200ms để phản xạ, đừng bắn ngay 1ms sau khi địch xuất hiện.

---

## 9.3. HWID Spoofer (Đường Lui Cuối Cùng) 🎭
Nếu lỡ bị Ban, AC thường Ban luôn phần cứng (HWID: Mainboard, HDD, MAC Address).
Để chơi lại, bạn cần **Spoofer**.
*   Spoofer là một Kernel Driver làm giả thông tin phần cứng trả về cho AC.
*   Hỏi Serial ổ cứng? -> Trả về số Random.
*   Hỏi MAC Address? -> Trả về số Random.

---

## 🛑 BÀI TẬP TƯ DUY (MIND GAME)
Hãy tưởng tượng bạn là lập trình viên Anti-Cheat.
Làm sao để phát hiện một người chơi đang dùng Wallhack (nhìn xuyên tường)?
1.  Chụp ảnh màn hình (Screenshot) máy người chơi gửi về Server? -> Hacker sẽ vẽ Wallhack lên lớp phủ (Overlay) không bị chụp.
2.  Kiểm tra xem người chơi có ngắm vào địch đang núp sau tường không? -> Nếu aiming xuyên tường quá nhiều lần -> Flag.

Hãy luôn tư duy hai chiều: **Hacker vs Security Dev.**

---

[Tiếp theo: Chương 10 - The Road Ahead (Lời Kết & Tài Nguyên)](../10_Loi_Ket/README.md)
