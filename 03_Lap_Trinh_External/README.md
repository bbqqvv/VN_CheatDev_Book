# Chương 3: Lập Trình Hack External (Ngoại Khoa) 💉

*"An toàn, không đau, không xâm lấn."*

Sau khi đã chơi chán với Cheat Engine, bạn muốn tự động hóa mọi thứ? Bạn muốn một tool bấm F1 là đầy máu chứ không phải Alt-Tab ra ngoài tìm giá trị?
Chào mừng đến với **Lập trình External**.

External Hack là một chương trình `.exe` riêng biệt, chạy song song với game và dùng quyền Admin để "thò tay" vào bộ nhớ game.

---

## 3.1. Các Hàm Windows API Quyền Lực
Thư viện `<windows.h>` cung cấp 4 hàm thần thánh:

1.  `FindWindowA(NULL, "Tên Cửa Sổ Game")`: Tìm cửa sổ game đang chạy. Trả về `HWND`.
2.  `GetWindowThreadProcessId(hwnd, &pid)`: Từ cửa sổ, lấy ra ID của tiến trình (PID).
3.  `OpenProcess(PROCESS_ALL_ACCESS, FALSE, pid)`: Mở cửa vào nhà game với quyền cao nhất. Trả về `HANDLE`.
4.  `ReadProcessMemory (RPM)` / `WriteProcessMemory (WPM)`: Đọc và Ghi dữ liệu.

---

## 3.2. Code Mẫu Full: External Trainer (C++)
Đây là một Trainer hoàn chỉnh cho `DummyGame.exe` (Chương 1).

### `Trainer.cpp`
```cpp
#include <iostream>
#include <windows.h>
#include <string>
#include <vector>

// Hàm giúp lấy Module Base Address (Vùng bắt đầu của file .exe trong RAM)
// Cần thiết để tìm địa chỉ tĩnh (Static Address)
uintptr_t GetModuleBaseAddress(DWORD procId, const wchar_t* modName) {
    uintptr_t modBaseAddr = 0;
    HANDLE hSnap = CreateToolhelp32Snapshot(TH32CS_SNAPMODULE | TH32CS_SNAPMODULE32, procId);
    if (hSnap != INVALID_HANDLE_VALUE) {
        MODULEENTRY32 modEntry;
        modEntry.dwSize = sizeof(modEntry);
        if (Module32First(hSnap, &modEntry)) {
            do {
                if (!_wcsicmp(modEntry.szModule, modName)) {
                    modBaseAddr = (uintptr_t)modEntry.modBaseAddr;
                    break;
                }
            } while (Module32Next(hSnap, &modEntry));
        }
    }
    CloseHandle(hSnap);
    return modBaseAddr;
}

int main() {
    std::cout << "--- EXTERNAL TRAINER v1.0 ---\n";
    std::cout << "Dang tim game...\n";

    // 1. Tìm Game
    HWND hwnd = FindWindowA(NULL, "Dummy Game for Hacking");
    if (!hwnd) {
        std::cout << "Khong thay game! Hay mo DummyGame.exe truoc.\n";
        system("pause");
        return 0;
    }

    // 2. Lấy PID
    DWORD pid;
    GetWindowThreadProcessId(hwnd, &pid);
    
    // 3. Mở Process
    HANDLE hProcess = OpenProcess(PROCESS_ALL_ACCESS, FALSE, pid);
    if (!hProcess) {
        std::cout << "Khong the mo process! (Chay duoi quyen Admin?)\n";
        return 0;
    }
    
    std::cout << "Da ket noi toi Process ID: " << pid << "\n";

    // 4. Tìm Pointer Chain
    // Giả sử (từ bài tập trước), bạn tìm ra:
    // Health Address = [AddressOfPlayer] + 0x24
    // AddressOfPlayer nam tai: 0x00EFF964 (Ví dụ - Số này thay đổi mỗi lần chạy nếu bạn không tìm Base Address)
    
    // Ở bài này, tôi sẽ nhập địa chỉ Máu thủ công (bạn copy từ Cheat Engine sang)
    uintptr_t healthAddr; 
    std::cout << "Nhap Dia Chi Mau (Hex, vd: 00EFF964): ";
    std::cin >> std::hex >> healthAddr;

    // 5. Vòng lặp Hack
    std::cout << "[F1] Hack Mau (999)\n[F2] Hack Dan (999)\n[Insert] Thoat\n";
    
    while (true) {
        // Nếu bấm F1
        if (GetAsyncKeyState(VK_F1) & 1) {
            int newHealth = 999;
            WriteProcessMemory(hProcess, (BYTE*)healthAddr, &newHealth, sizeof(newHealth), nullptr);
            std::cout << "-> Da Hack Mau!\n";
        }

        // Nếu bấm F2 (Ammo là Health + 4)
        if (GetAsyncKeyState(VK_F2) & 1) {
            int newAmmo = 999;
            uintptr_t ammoAddr = healthAddr + 0x04; // Offset Struct
            WriteProcessMemory(hProcess, (BYTE*)ammoAddr, &newAmmo, sizeof(newAmmo), nullptr);
            std::cout << "-> Da Hack Dan!\n";
        }

        if (GetAsyncKeyState(VK_INSERT) & 1) break;
        Sleep(10);
    }

    CloseHandle(hProcess);
    return 0;
}
```

---

## 3.3. Vẽ Overlay (ESP)
Hack "nhìn xuyên tường" thực chất là vẽ các hình chữ nhật lên màn hình.
Để làm được điều này từ External:
1.  Tạo một cửa sổ trong suốt, luôn nằm trên cùng (Topmost), kích thước bằng màn hình game.
2.  Dùng DirectX hoặc GDI để vẽ lên cửa sổ đó.
3.  Tính toán tọa độ:
    *   Đọc tọa độ địch (X, Y, Z) trong game.
    *   Dùng công thức **WorldToScreen** (biến đổi ma trận ViewMatrix) để đổi tọa độ 3D thành tọa độ 2D trên màn hình (Pixel X, Pixel Y).
    *   Vẽ hình chữ nhật tại (Pixel X, Pixel Y).

**[Bài Tập]:**
1.  Biên dịch `Trainer.cpp`.
2.  Chạy `DummyGame.exe`.
3.  Lấy địa chỉ Máu từ Cheat Engine.
4.  Nhập vào Trainer và bấm F1 xem máu có nhảy lên 999 không.
