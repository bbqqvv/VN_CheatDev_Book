# 📱 Chương 5: Mobile Hacking (Chiến Trường Bỏ Túi)

> *"PC là pháo đài. Mobile là chiến trường du kích. Nhỏ hơn, chật hẹp hơn, nhưng khốc liệt gấp đôi."*

---

## 🛑 SỨ MỆNH (MISSION BRIEFING)
Thời đại của PC vẫn còn đó, nhưng Mobile mới là mỏ vàng (PUBG Mobile, Liên Quân, Free Fire).
Hack trên mobile có 2 trường phái:
1.  **Non-Root (Mod Menu):** Sửa file `.apk`/`.ipa` rồi cài lại. Dành cho người dùng phổ thông.
2.  **Root/Jailbreak:** Can thiệp sâu vào hệ thống, dùng GameGuardian hoặc Tweak. Dành cho Hacker thực thụ.

**Mục tiêu:**
1.  Hiểu kiến trúc **ARM** (Khác hoàn toàn x86 trên PC).
2.  Làm chủ **GameGuardian** (Cheat Engine phiên bản Mobile).
3.  Làm quen với **Frida** (Vua của Dynamic Instrumentation).

---

## 5.1. Chiến Trường Mobile (The Architecture) 🗺️
Khác với PC (dùng chip Intel/AMD x86), điện thoại dùng chip **ARM** (Advanced RISC Machine).
Tập lệnh Assembly của nó khác. Cách quản lý bộ nhớ cũng khác.

![Mobile Architecture Diagram](images/mobile_arch.png)

*   **Root (Android) / Jailbreak (iOS):** Điều kiện tiên quyết để can thiệp sâu. Nếu không có quyền này, bạn chỉ là "khách" trên chính thiết bị của mình.
*   **GameGuardian (GG):** Một ứng dụng nhưng lại có quyền truy cập RAM của ứng dụng khác (Game). Nó hoạt động y hệt Cheat Engine.
*   **Server-Side Check:** Game Mobile thường online 100%. Hack Máu/Tiền thường là **Fake** (chỉ mình thấy, server không nhận). Hack Tọa độ/Wallhack/Aimbot (Client-side) mới là chân ái.

---

## 5.2. GameGuardian - Vũ Khí Du Kích 👾
Đây là công cụ mạnh nhất trên Android.

**Quy trình tác chiến:**
1.  **Select Process:** Chọn game đang chạy (Lưu ý: Game mobile hay có nhiều process con, chọn cái nào nặng MB nhất).
2.  **Select Memory Range:** Chọn `Ca` (C++ alloc) và `A` (Anonymous). Đây là nơi chứa dữ liệu Game (Heap). Bỏ qua `Video`, `Code App`.
3.  **Search:**
    *   **Dword:** Máu, Đạn.
    *   **Float:** Tọa độ (X, Y, Z).
    *   **Encrypted (Xor):** Nhiều game mã hóa giá trị (VD: Máu thật là 100, nhưng trong RAM nó lưu là `100 ^ Key`). GG có chế độ Search Encrypted để tự dò Key.

**Scripting (Lua):**
GameGuardian hỗ trợ viết script bằng **Lua**. Bạn có thể viết một script tự động:
*   Tìm địa chỉ máu.
*   Sửa thành 9999.
*   Vẽ menu UI đơn giản ngay trên màn hình game.

---

## 5.3. Modding APK/IPA (Phẫu Thuật Thẩm Mỹ) 💉
Nếu không muốn Root máy, bạn phải sửa file cài đặt.

**Android (APK):**
1.  **Decompile:** Dùng `APKTool` để bung file `.apk` ra thành code `Smali` (một dạng Assembly của Java) và tài nguyên.
2.  **Inject Lib:** Chép file `hack.so` (C++) của mình vào thư mục `lib/`.
3.  **Hook Load:** Sửa file `MainActivity.smali` để gọi lệnh `System.loadLibrary("hack")` khi khởi động.
4.  **Recompile & Sign:** Đóng gói lại thành APK mới và ký chữ ký số (Sign).

**iOS (IPA):**
1.  Tương tự nhưng phức tạp hơn vì cơ chế bảo mật của Apple cực gắt.
2.  Thường dùng **Theos** để viết Tweak (`.dylib`) rồi tiêm vào IPA bằng `Azule` hoặc `Sideloadly`.

---

## 5.4. Frida - Vua Của Dynamic Hacking 👑
Nếu PC có Cheat Engine, thì Mobile có **Frida**.
Nó cho phép bạn viết code **JavaScript** trên PC để điều khiển logic game trên điện thoại theo thời gian thực (qua cáp USB).

**Ví dụ Script Frida (.js):**
```javascript
Java.perform(function() {
    // Tìm hàm get_Health trong class Player
    var PlayerClass = Java.use("com.game.Player");
    
    PlayerClass.get_Health.implementation = function() {
        console.log("[Frida] Game đang lấy chỉ số máu...");
        return 99999; // Trả về máu ảo luôn!
    };
});
```
-> Chạy script này phát, vào game auto bất tử. Không cần compile lại APK, không cần restart game.

---

## 🛑 NHIỆM VỤ (MISSION)
1.  Cài đặt giả lập **LDPlayer** hoặc **Bluestacks** (đã Root).
2.  Cài **GameGuardian**.
3.  Tải một game offline nhẹ (VD: Hill Climb Racing).
4.  Dùng GameGuardian hack tiền (Coins) trong game đó.

---

[Tiếp theo: Chương 6 - Reverse Engineering Advanced (Dịch ngược nâng cao)](../06_Reverse_Engineering_Advanced/README.md)
