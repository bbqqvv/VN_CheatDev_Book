# Chương 9: Anti-Cheat Evasion (Nghệ Thuật Lẩn Trốn) 🥷

*"Không phải hack mạnh hay yếu. Quan trọng là không bị bắt."*

---

## 9.1. Các Loại Anti-Cheat (AC)
1.  **Server-Side:** (FairFight, VACNet). Phân tích thống kê. "Thằng này bắn 100 viên trúng đầu cả 100 -> Hack". Không quét máy, chỉ quét dữ liệu.
2.  **Client-Side:** (BattlEye, EAC, Vanguard). Quét bộ nhớ, quét file, quét tiến trình đang chạy trên máy bạn.

---

## 9.2. Kỹ Thuật Bypass Signature (Chữ ký)
Mỗi bản hack public đều có một mã Hash (chữ ký số). AC lưu danh sách đen các chữ ký này.
*   **Vấn đề:** Bạn tải hack trên mạng về, vừa bật lên là ăn ban ngay. Vì chữ ký của nó đã bị đánh dấu.
*   **Giải pháp:** **Polymorphism (Đa hình) & Junk Code**.
    *   Thêm code rác vào source.
    *   Đổi tên hàm, đổi thứ tự biến.
    *   Mã hóa các chuỗi string ("Hack Menu" -> "Xjask Lqwe").
    *   Biên dịch lại -> Ra file `.exe` hoàn toàn mới về mặt nhị phân -> Bypass Signature Scan.

---

## 9.3. Heuristic & Humanization (Giả Lập Hành Vi Người)
Aimbot dính tâm ngay lập tức (Snap) là hành vi máy.
*   **Smoothing:** Làm chậm tốc độ di chuyển tâm. Kéo từ từ chứ không nhảy cóc.
*   **Randomization:** Không bao giờ bắn vào cùng một điểm (VD: Giữa đầu). Random bắn trượt, bắn vào cổ, vai.
*   **Curve Path (Đường cong):** Người không bao giờ di chuột theo đường thẳng tắp. Aimbot xịn dùng thuật toán Bezier Curve để tạo đường cong tự nhiên.

---

## 9.4. HWID Spoofing (Giả Mạo Phần Cứng)
Game ban máy tính (Hardware Ban) dựa trên Serial của Ổ cứng, Mainboard, MAC Address.
**HWID Spoofer** hoạt động ở tầng Kernel (Driver):
*   Hook vào hàm hệ thống `IOCTL_STORAGE_QUERY_PROPERTY`.
*   Khi game hỏi "Số serial ổ cứng là gì?", Spoofer trả về một chuỗi ngẫu nhiên.
*   Game thấy serial mới -> Tưởng là máy mới -> Cho chơi tiếp.

[Tiếp theo: Chương 10 - Final Projects](../10_Final_Projects/README.md)
