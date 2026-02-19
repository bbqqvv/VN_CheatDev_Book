# Chương 4: Lập Trình Hack Internal (Nội Khoa) 🩺

*"Nguy hiểm hơn, mạnh mẽ hơn, nhanh hơn."*

External hack phải xin phép HĐH để đọc RAM (`ReadProcessMemory` rất chậm).
Internal hack chạy **ngay trong dòng máu của game**. Nó có thể truy cập mọi thứ không giới hạn.

---

## 4.1. DLL Injection (Tiêm Thuốc Độc)
File `.exe` không thể chạy trong bộ nhớ của tiến trình khác. Nhưng file `.dll` (Dynamic Link Library) thì có thể.
Kỹ thuật **DLL Injection** buộc game phải nạp file DLL của mình vào. Khi nạp xong, hàm `DllMain` của DLL sẽ chạy -> Hack kích hoạt.

### Các cách Inject
1.  **LoadLibrary (Cổ điển):**
    *   Tạo một Thread trong game (`CreateRemoteThread`).
    *   Bắt Thread đó gọi hàm `LoadLibraryA("Hack.dll")`.
    *   *Nhược điểm:* Game dễ dàng phát hiện vì DLL nằm trong danh sách Module (PEB Ldr).
2.  **Manual Mapping (Cao cấp):**
    *   Tự đọc file DLL từ đĩa.
    *   Tự giải mã và copy từng phần (Header, Sections) vào bộ nhớ game.
    *   Tự xử lý Relocation và Import Table.
    *   *Ưu điểm:* DLL không đăng ký với Windows -> Tàng hình. (Cheat Engine cũng dùng cách này).

---

## 4.2. Function Hooking (Móc Hàm) - Trái tim của Internal
Khi bạn ở bên trong, bạn có thể thay đổi cách game hoạt động.
Ví dụ: Hàm `TakeDamage(int dmg)` của game.
Chúng ta sẽ **Hook** nó: Khi game gọi `TakeDamage`, nó sẽ nhảy sang hàm `MyTakeDamage` của ta.

### Code mẫu Hook (Dùng thư viện MinHook)
```cpp
#include <Windows.h>
#include "MinHook.h" // Thư viện Hook nổi tiếng (Github: TsudaKageyu/minhook)

// 1. Định nghĩa khuôn mẫu hàm gốc
typedef void (__stdcall *TakeDamage_t)(void* player, int dmg);
TakeDamage_t oTakeDamage = nullptr; // Chỗ lưu hàm gốc (Gateway)

// 2. Hàm giả của mình
void __stdcall hkTakeDamage(void* player, int dmg) {
    if (IsMyPlayer(player)) {
        dmg = 0; // GOD MODE: Nếu là mình thì dmg = 0
    } else {
        dmg = 9999; // ONE HIT: Nếu là địch thì dmg = 9999
    }

    // Gọi lại hàm gốc để game không crash (nhưng với dmg đã sửa)
    return oTakeDamage(player, dmg);
}

// 3. Main Thread (Chạy khi Inject)
DWORD WINAPI MainThread(LPVOID lpParam) {
    MH_Initialize(); // Khởi tạo thư viện

    // Địa chỉ hàm gốc (Tìm bằng IDA Pro hoặc SigScan)
    uintptr_t funcAddr = 0x0045A2B0; 

    // Tạo Hook
    MH_CreateHook((void*)funcAddr, &hkTakeDamage, (void**)&oTakeDamage);
    
    // Kích hoạt
    MH_EnableHook(MH_ALL_HOOKS);

    return 0;
}
```

---

## 4.3. Menu ImGui (Giao diện Hack)
Hầu hết menu hack đẹp lung linh bạn thấy (CS2, Valorant) đều dùng thư viện **ImGui**.
Để vẽ được menu trong game, bạn phải Hook vào các hàm đồ họa:
*   **DirectX 9:** Hook `EndScene`.
*   **DirectX 11:** Hook `Present`.
*   **OpenGL:** Hook `wglSwapBuffers`.

Khi hook thành công, mỗi khung hình (frame) game vẽ ra, bạn chèn thêm lệnh vẽ Menu của mình vào trước khi nó hiện lên màn hình.

**[Bài Tập Lớn]:** 
Tải source code "Csgo-Simple" trên Github. Đây là base hack CS:GO nổi tiếng nhất. Đọc hiểu cách nó Hook `CreateMove` để làm Aimbot và BunnyHop.
