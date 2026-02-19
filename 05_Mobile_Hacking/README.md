# Chương 5: Mobile Hacking (Android Specs) 📱

*"Thị trường tỷ đô, bảo mật lỏng lẻo."*

Game Mobile (Android) khác PC ở chỗ: Nó chạy trên máy ảo Java (Dalvik/ART) nhưng các game xịn (Unity, Unreal, Cocos) lại chạy Native C++.

---

## 5.1. Giải Phẫu APK
APK = File ZIP đổi đuôi.
1.  **classes.dex:** Code Java/Kotlin. (Logic UI, Đăng nhập). Dùng `JD-GUI` hoặc `JADX` để xem.
2.  **lib/arm64-v8a/libIL2CPP.so** (Unity) hoặc **libcocos2djs.so** (Cocos): Trái tim của game. Code C++ nằm ở đây.
3.  **assets/bin/Data:** Dữ liệu game (Unity).

---

## 5.2. Công Cụ Chiến Đấu (Mobile)
1.  **APKTool:**
    *   Decompile: `apktool d game.apk` -> Ra folder chứa code `smali`.
    *   Recompile: `apktool b folder` -> Đóng gói lại thành APK.
    *   *Smali:* Ngôn ngữ Assembly của Android Java. Khó đọc nhưng sửa được.
2.  **Frida (Vua của Mobile Hack):**
    *   Công cụ Dynamic Instrumentation.
    *   Cho phép viết script JavaScript trên PC, tiêm thẳng vào game trên điện thoại để Hook hàm Java hoặc Native.
    *   **Ví dụ Hook Java (Bypass Root Check):**
        ```js
        Java.perform(function() {
            var RootParams = Java.use("com.security.CheckRoot");
            RootParams.isRooted.implementation = function() {
                console.log("Game hoi may co Root ko -> Tra loi: KHONG");
                return false;
            };
        });
        ```
3.  **Il2CppDumper (Cho Unity):**
    *   Game Unity biên dịch ra C++, làm mất tên hàm.
    *   Tool này dùng file `global-metadata.dat` để khôi phục lại tên hàm và địa chỉ (Offset) cho bạn mod.

---

## 5.3. Quy trình Mod Menu Android (Lib Modding)
Đây là cách tạo ra các bản "Hack Map Liên Quân" hay "Free Fire Aimbot".
1.  Lấy địa chỉ Offset các hàm quan trọng (VD: `get_EnemyVisible` tại `0x123456`) bằng IDA Pro.
2.  Viết một file `.so` riêng (C++).
3.  Hook hàm `0x123456` của game bằng kỹ thuật **Inline Hook** trên ARM64.
4.  Chỉnh sửa file `AndroidManifest.xml` hoặc dùng `LGL Mod Menu` để load file `.so` hack của mình trước khi game chạy.

**[Thực Hành Dự Án Bida]:**
*   **Vấn đề:** Cocos2d-x dùng JavaScript (`main.js`) nhưng mã hóa thành Binary (`.jsc`).
*   **Giải pháp:**
    1.  Tìm Key giải mã XXTEA trong `libcocos2djs.so`.
    2.  Giải mã `main.jsc` -> `main.js`.
    3.  Chèn code vẽ Line (Laser).
    4.  Mã hóa lại và đóng gói vào APK.

[Tiếp theo: Chương 6 - Reverse Engineering Advanced](../06_Reverse_Engineering_Advanced/README.md)
