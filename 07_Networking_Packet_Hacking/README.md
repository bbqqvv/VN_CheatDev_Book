# 📡 Chương 7: Networking & Packet Hacking (Bắt Cóc Tin Nhắn)

> *"Trên PC, RAM là vua. Trên Internet, Packet (Gói tin) là chúa. Ai kiểm soát được Packet, người đó kiểm soát thực tại."*

---

## 🛑 SỨ MỆNH (MISSION BRIEFING)
Hack RAM (Client-side) chỉ có tác dụng với những thứ hiển thị trên máy bạn (Wallhack, NoRecoil).
Nhưng Tiền, Level, Vật phẩm... đều nằm trên **Server**. Bạn sửa RAM máy bạn thành 1 tỷ vàng, Server nó cười vào mặt bạn rồi reload lại số cũ.

Để hack được tài sản, bạn phải tấn công đường truyền.
Bạn phải chặn đứng lá thư (Packet) gửi đi từ máy bạn, sửa nội dung bức thư đó, rồi mới gửi cho Server.

**Mục tiêu:**
1.  Hiểu mô hình **Client-Server**.
2.  Thực hiện kỹ thuật **Man-In-The-Middle (MITM)**.
3.  Sử dụng **Wireshark** và **WPE Pro** để bắt và sửa gói tin.

---

## 7.1. Kiến Trúc Mạng (The Matrix Grid) 🌐
Khi bạn chơi game online, máy tính của bạn (Client) và máy chủ (Server) nói chuyện với nhau liên tục bằng các gói tin (Packet).

*   **Client:** "Tao vừa bắn thằng kia." (Gửi Packet).
*   **Server:** "Để tao check... Ừ đúng, nó chết rồi." (Trả Packet).
*   **Client:** "Ok, tao hiện animation nó ngã xuống."

Nếu Hacker chặn được Packet đầu tiên và sửa thành *"Tao vừa bắn thằng kia Headshot"* -> Server sẽ tin sái cổ (nếu không check kỹ).

![MITM Attack Diagram](images/mitm_attack.png)

---

## 7.2. Wireshark - Máy X-Quang Gói Tin 🦴
Wireshark không dùng để hack, nó dùng để **NHÌN**.
Nó bắt toàn bộ dữ liệu đi qua card mạng của bạn.

**Quy trình soi:**
1.  Mở Wireshark -> Chọn mạng (Ethernet/WiFi).
2.  Vào game, thực hiện hành động (VD: Mua một bình máu).
3.  Ra Wireshark, dừng bắt (Stop).
4.  Lọc packet: `ip.addr == [IP Server Game]`.
5.  Tìm packet nào chứa dữ liệu khả nghi.

**Vấn đề:** Game hiện đại dùng **HTTPS/SSL** hoặc mã hóa gói tin (Encryption). Wireshark sẽ chỉ thấy một đống giun dế vô nghĩa.
-> Lúc này cần MITM Proxy.

---

## 7.3. WPE Pro / Winsock Packet Editor (Huyền Thoại Cổ Đại) ⚔️
Đây là tool hack packet "quốc dân" thời Mu Online, Gunbound, Võ Lâm.
Nó không bắt ở card mạng. Nó móc (Hook) vào hàm `send()` và `recv()` của API Windows ngay trong game.
Do đó, nó bắt được gói tin **TRƯỚC KHI** bị mã hóa (đối với một số game cũ/cùi bắp).

**Kỹ thuật Filter:**
*   Tìm chuỗi byte đại diện cho hành động bắn súng. Ví dụ: `0A 01 00`.
*   Tạo Filter: Cứ thấy `0A 01 00` thì tự động đổi thành `0A 02 00` (Skill mạnh hơn).
*   Vào game bắn thường -> Server nhận được Skill cuối.

---

## 7.4. Man-In-The-Middle (MITM) Hiện Đại 🕵️‍♂️
Với game mobile (Android/iOS) dùng HTTPS, chúng ta dùng **Charles Proxy** hoặc **Fiddler**.

1.  Cài Charles Proxy trên PC.
2.  Trên điện thoại, set Wifi Proxy trỏ về IP của PC.
3.  Cài Certificate của Charles lên điện thoại để giải mã HTTPS.
4.  Vào game. Charles sẽ hiện rõ mồn một các API game gọi lên server.
    *   `POST /api/buy_item`
    *   `{"item_id": 101, "price": 500}`
5.  **Breakpoint:** Chuột phải vào request -> Breakpoints.
6.  Vào game mua lại. Charles sẽ dừng request đó lại trước khi gửi đi.
7.  Sửa `price: 500` thành `price: 1`.
8.  Execute.
9.  -> Nếu Server ngu ngơ, bạn vừa mua đồ xịn với giá 1 đồng. 💸

---

## 🛑 BÀI TẬP THỰC TẾ (LAB 7)
1.  Tải **Fiddler Classic** (PC).
2.  Mở một web game đơn giản (HTML5) hoặc client game cũ.
3.  Thử bắt gói tin đăng nhập (Login packet).
4.  Xem bạn có thấy Username/Password của mình dưới dạng Plaintext không? (Nếu có, game đó bảo mật kém).

---

[Tiếp theo: Chương 8 - Kernel Driver (Vùng Đất Cấm)](../08_Kernel_Driver_Development/README.md)
