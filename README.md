# 📘 [VN] CheatDev Book: Từ Zero đến Hero

**Tác giả:** Antigravity (Google DeepMind) & User
**Nhà Xuất Bản:** VTech Digital Solution
**Phiên bản:** 1.0 (Legendary Edition)

Chào mừng bạn đến với cuốn sách giáo khoa toàn diện nhất về **Game Hacking**, **Reverse Engineering** và **An Ninh Mạng**.
Đây không chỉ là lý thuyết. Đây là bản đồ kho báu dẫn bạn đi từ những khái niệm cơ bản nhất của máy tính đến tận cùng của Kernel Hệ điều hành.

> ⚠️ **TUYÊN BỐ MIỄN TRỪ TRÁCH NHIỆM**
> Kiến thức trong sách này nhằm mục đích nghiên cứu bảo mật và giáo dục.
> Tác giả không chịu trách nhiệm cho bất kỳ hành vi vi phạm pháp luật nào của người đọc.

---

## 🏛️ LỜI NÓI ĐẦU (PREFACE)

Chào mừng bạn đến với thế giới của những con số Hexadecimal và những dòng lệnh Assembly.
Cuốn sách này được biên soạn với triết lý: **"Tư duy quan trọng hơn Công cụ"**.

Trong kỷ nguyên số, **Game Security** là một trong những lĩnh vực khó nhất của An toàn thông tin. Nó là cuộc đua không hồi kết giữa Hacker (Red Team) và Developer (Blue Team). Để chiến thắng, bạn không thể chỉ dựa vào tool có sẵn. Bạn phải hiểu tường tận từng bit, từng byte trong bộ nhớ.

Cuốn sách này sẽ dẫn bạn đi một hành trình dài:
1.  Từ **User Mode** xuống **Kernel Mode**.
2.  Từ **Code C++** bậc cao xuống **Assembly** bậc thấp.
3.  Từ **PC (x86)** sang **Mobile (ARM64)**.

Hãy chuẩn bị một cái đầu lạnh và một cốc cà phê nóng. Hành trình bắt đầu ngay bây giờ.

---

## 📑 MỤC LỤC (Table of Contents)

### 🧱 PHẦN 1: KHOA HỌC & NỀN TẢNG
*   **[Chương 1: Nền Tảng Tư Duy (The Mindset)](./01_Nen_Tang_Tu_Duy/README.md)**
    *   Cấu trúc bộ nhớ (RAM, Stack, Heap).
    *   Hệ thập lục phân (Hex) và Binary.
    *   Ngôn ngữ C/C++ và Con trỏ (Pointers).

*   **[Chương 2: Công Cụ Thần Thánh (The Tools)](./02_Cong_Cu_Than_Thanh/README.md)**
    *   Cheat Engine (Quét Memory).
    *   ReClass.NET (Phân tích Struct).
    *   x64dbg / IDA Pro (Cơ bản).

### ⚔️ PHẦN 2: KỸ THUẬT HACK CƠ BẢN (USER MODE)
*   **[Chương 3: External Hacking (Ngoại Khoa)](./03_Lap_Trinh_External/README.md)**
    *   Windows API (`ReadProcessMemory`, `WriteProcessMemory`).
    *   Vẽ Overlay ESP (World to Screen).

*   **[Chương 4: Internal Hacking (Nội Khoa)](./04_Lap_Trinh_Internal/README.md)**
    *   DLL Injection (Tiêm mã).
    *   Function Hooking (MinHook, Detours).
    *   DirectX/OpenGL Hooking (Menu ImGui).

### 📱 PHẦN 3: MOBILE SECURITY
*   **[Chương 5: Mobile Hacking (Android/iOS)](./05_Mobile_Hacking/README.md)**
    *   Cấu trúc APK, DEX, Native Library (`.so`).
    *   Modding Game Unity (IL2CPP) và Cocos2d-x.
    *   Sử dụng Frida để Hook Runtime.

### 🔬 PHẦN 4: PHÂN TÍCH CHUYÊN SÂU (REVERSE ENGINEERING)
*   **[Chương 6: Reverse Engineering Advanced](./06_Reverse_Engineering_Advanced/README.md)**
    *   Phân tích Tĩnh (Static) với IDA Pro / Ghidra.
    *   Phân tích Động (Dynamic) và Tracing.
    *   Unpacking (Gỡ rối) và Decryption.

### 🌐 PHẦN 5: NETWORK SECURITY
*   **[Chương 7: Networking & Packet Hacking](./07_Networking_Packet_Hacking/README.md)**
    *   Phân tích gói tin với Wireshark.
    *   Chặn và sửa gói tin (WPE Pro / MitM).
    *   Mã hóa và Bảo mật đường truyền.

### 🛡️ PHẦN 6: KERNEL & ANTI-CHEAT (GOD MODE)
*   **[Chương 8: Kernel Driver Development](./08_Kernel_Driver_Development/README.md)**
    *   Lập trình Driver (`.sys`) ở Ring 0.
    *   Giao tiếp IOCTL giữa User và Kernel.
    *   Đọc bộ nhớ vật lý.

*   **[Chương 9: Anti-Cheat Evasion](./09_AntiCheat_Evasion/README.md)**
    *   Cơ chế hoạt động của BattlEye, EAC, Vanguard.
    *   Bypass Signature và Heuristic Scan.
    *   HWID Spoofing (Giả mạo phần cứng).

### 🏆 PHẦN 7: THỰC CHIẾN (PROJECTS)
*   **[Chương 10: Final Projects](./10_Final_Projects/README.md)**
    *   Tổng hợp các bài tập lớn để tốt nghiệp.
    *   Xây dựng Mod Menu hoàn chỉnh.
    *   Viết Driver ẩn mình.

---
*"Stay Hungry. Stay Foolish. Stay Undetected."*
