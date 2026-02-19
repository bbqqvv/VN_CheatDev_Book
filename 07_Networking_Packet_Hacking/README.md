# Chương 7: Networking & Packet Hacking (Hack Mạng) 🌐

*"Đừng tin Client. Server mới là Chúa."*

Trong game Online (MMORPG, FPS), mọi thứ bạn thấy trên màn hình chỉ là ảo ảnh. Server nắm giữ sự thật. Hack RAM (Client-side) chỉ có tác dụng cục bộ.
Muốn hack vàng, item? Bạn phải lừa Server.

---

## 7.1. Giao Thức Mạng Game (Game Protocol)
Game thường dùng:
*   **TCP:** Cho Chat, Đăng nhập, Giao dịch (Cần tin cậy, không mất gói).
*   **UDP:** Cho di chuyển, bắn súng (Cần tốc độ, mất 1-2 gói không sao).

Gói tin (Packet) thường có cấu trúc:
`[Header (Độ dài, Loại gói)] + [Body (Dữ liệu đã mã hóa)]`

---

## 7.2. Wireshark & Phân Tích Gói Tin
Wireshark giúp bạn bắt tất cả gói tin ra/vào card mạng.
Tuy nhiên, dữ liệu thường bị mã hóa (hiện toàn rác).
**Nhiệm vụ:** Tìm cấu trúc gói tin.
Ví dụ: Bạn đi 1 bước. Gói tin dài 20 byte gửi đi.
Bạn đi 2 bước. Gói tin dài 20 byte gửi đi, chỉ khác byte số 5.
-> Byte số 5 là Tọa độ.

---

## 7.3. WPE Pro & MitM (Man-in-the-Middle)
WPE Pro (hoặc các tool hiện đại như **Echo Mirage**) cho phép bạn đứng giữa Game và Server.
1.  **Filter (Bộ lọc):** Tự động thay đổi gói tin.
    *   Ví dụ: Mỗi khi game gửi gói tin "Mua Máu (ID: 01)", WPE tự sửa thành "Mua Kiếm Rồng (ID: 99)".
2.  **Send (Gửi lại):** Ghi âm lại gói tin "Nhận thưởng nhiệm vụ" và gửi lại nó 1000 lần (Exploit).

---

## 7.4. Bypass SSL Pinning (Mobile)
Game mobile dùng HTTPS (SSL) để bảo mật. Nó cài sẵn Chứng chỉ (Certificate) trong App để chống giả mạo.
Nếu bạn dùng Fiddler/Charles Proxy để bắt gói tin, game sẽ báo lỗi mạng.
**Giải pháp:** Dùng **Frida** + Script `ssl-pinning-bypass.js`.
Script này sẽ Hook vào hàm kiểm tra chứng chỉ của Android và luôn trả về `True`.

**[Bài Tập]:**
Tải game web đơn giản hoặc game private server cũ (không mã hóa mạnh). Dùng WPE Pro bắt gói tin chat, sửa nội dung chat của mình trước khi nó hiện lên màn hình người khác.
