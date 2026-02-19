# Chương 6: Reverse Engineering Advanced (Phân Tích Chuyên Sâu) 🔬

*"Code là sự thật trần trụi."*

Khi bạn đối mặt với Game 3A hoặc Anti-Cheat, code không còn là C++ trong sáng nữa. Nó đã bị nén, mã hóa, làm rối. Ở đây, **IDA Pro** là người bạn thân nhất.

---

## 6.1. IDA Pro - The Disassembler
IDA (Interactive Disassembler) biến mã máy (`0x55 0x8B...`) thành Assembly và giả mã C.

### Các Phím Tắt Buộc Phải Nhớ:
*   **Space:** Chuyển đổi giữa chế độ Text (Code) và Graph (Sơ đồ khối). Luôn dùng Graph để dễ nhìn logic `IF/ELSE`.
*   **F5 (Decompile):** Thần thánh. Biến Assembly khó hiểu thành code C dễ hiểu.
*   **X (Xref):** Tìm xem hàm này được ai gọi. Ví dụ: Bạn tìm thấy chuỗi "Cheat Detect!", bấm X để xem hàm nào in ra dòng đó -> Đó chính là hàm Anti-Cheat.
*   **N (Name):** Đổi tên hàm/biến. Đừng để `sub_401000`, hãy đổi thành `Check_Health`.

---

## 6.2. Phân Tích Cấu Trúc (Reconstructing Structs)
Trong code C giả lập (F5), bạn sẽ thấy rất nhiều `*(_DWORD *)(a1 + 404)`.
*   `a1`: Là con trỏ `Player`.
*   `404` (0x194): Là Offset.
*   IDA không biết `404` là gì. Bạn phải nói cho nó biết.

**Quy trình:**
1.  Vào tab **Structures** (Shift + F9).
2.  Tạo Struct mới `PlayerStruct`.
3.  Thêm các thành phần (Member) vào cho đến khi đủ 404 byte.
4.  Quay lại cửa sổ code, chuột phải vào `a1`, chọn **Convert to struct pointer** -> `PlayerStruct*`.
5.  Code sẽ tự động đổi thành `Player->Health`. Đẹp như mơ!

---

## 6.3. Unpacking (Gỡ Rối & Giải Nén)
Game để tránh bị crack thường dùng Packer (UPX, Themida, VMProtect).
Packer làm 2 việc: Nén file exe nhỏ lại và Mã hóa code.
Khi chạy, Packer sẽ tự giải nén code thật vào RAM rồi mới nhảy (Jump) đến code thật (OEP - Original Entry Point).

**Kỹ thuật Dump:**
1.  Dùng **x64dbg** chạy game.
2.  Để game chạy đến OEP (Lúc đã giải nén xong).
3.  Dùng plugin **Scylla** để "chụp ảnh" (Dump) vùng nhớ chứa code thật ra file.
4.  Sửa lại bảng IAT (Import Address Table) để file dump chạy được.

---

## 6.4. Tìm Key Mã Hóa (Encryption Keys)
Game dùng Crypto (Mã hóa) để bảo vệ Save game, Packet mạng.
*   **Hàm chuẩn:** Tìm các hàm thư viện như `AES_Encrypt`, `XOR`.
*   **Hằng số đặc trưng:** Mỗi thuật toán có các con số đặc trưng (Magic Constants).
    *   MD5: `0x67452301`...
    *   AES: S-Box table.
    *   TEA: `0x9E3779B9` (Golden Ratio).
*   Dùng plugin **FindCrypt** trong IDA để tự động quét các hằng số này -> Ra ngay thuật toán.

[Tiếp theo: Chương 7 - Networking](../07_Networking_Packet_Hacking/README.md)
