# 💉 Chương 4: Internal Hacking (Gián Điệp Kiểu Mẫu)

> *"External Hacker giống như lính bắn tỉa: An toàn nhưng bị giới hạn. Internal Hacker giống như điệp viên: Nguy hiểm, nằm ngay trong lòng địch, nhưng quyền lực là vô hạn."*

---

## 🛑 SỨ MỆNH (MISSION BRIEFING)
Ở Chương 3, bạn đã làm Trainer External. Nhưng External có điểm yếu:
1.  **Chậm:** Phải dùng `ReadProcessMemory` liên tục (giao tiếp giữa 2 process tốn thời gian).
2.  **Hạn chế:** Không thể vẽ Menu lên màn hình game (ESP), không thể sửa đổi logic game phức tạp (Hook).

Giải pháp: **Internal Hacking**.
Chúng ta sẽ không đứng ngoài nữa. Chúng ta sẽ chui tọt vào bên trong Game.

**Mục tiêu:**
1.  Hiểu cơ chế **DLL Injection** (Tiêm thuốc độc).
2.  Tự viết một **Injector** đơn giản.
3.  Tự viết một **DLL Hack** đầu tiên (MessageBox "Hello World" từ bên trong Game).

---

## 4.1. Giải Phẫu DLL Injection 🧬
Làm thế nào để nhét code của mình (C++) vào trong file Game (`.exe`) đang chạy mà không cần source code game?
Windows cung cấp một cửa hậu: **LoadLibrary**.

![DLL Injection Diagram](images/dll_injection.png)

1.  **Injector (Bác sĩ):** Tool do chúng ta viết.
2.  **Target (Bệnh nhân):** Game process.
3.  **DLL (Thuốc):** Code hack của chúng ta, được biên dịch thành file `.dll` (Dynamic Link Library).

**Quy trình tiêm:**
Injector sẽ dùng quyền Admin, trỏ súng vào đầu Game và ra lệnh: *"Ê, tao vừa copy cái file `hack.dll` vào bộ nhớ của mày đấy. Chạy nó ngay cho tao!"* (thông qua hàm `CreateRemoteThread`).

---

## 4.2. Chế Tạo Thuốc (DLL Payload) 💊
Tạo Project mới trong Visual Studio: `Dynamic-Link Library (DLL)`.

**Code `dllmain.cpp`:**
Đây là nơi code sẽ chạy ngay lập tức khi tiêm thành công.

```cpp
#include <windows.h>
#include <iostream>

// Luồng hack chính (Chạy song song với Game)
DWORD WINAPI HackThread(LPVOID lpParam) {
    // 1. Mở Console để debug (Sướng hơn External nhiều!)
    AllocConsole();
    FILE* f;
    freopen_s(&f, "CONOUT$", "w", stdout);

    std::cout << ">>> INTERNAL HACK INJECTED! <<<" << std::endl;
    std::cout << "Ban dang o trong long dich (In-Process Memory)." << std::endl;
    std::cout << "Base Address: 0x" << std::hex << (uintptr_t)GetModuleHandle(NULL) << std::endl;

    // 2. Hack Loop (Truy cập trực tiếp, không cần ReadProcessMemory!)
    // Giả sử địa chỉ Máu là con trỏ: 0x123456 (Thay cái này bằng Pointer xịn nhé)
    int* pHealth = (int*)0x00EFF690; 

    while (true) {
        if (GetAsyncKeyState(VK_END) & 1) { // Bấm END để thoát
            break;
        }

        if (GetAsyncKeyState(VK_F1) & 1) {
            *pHealth = 9999; // Gán trực tiếp! Siêu nhanh!
            std::cout << "[!] Health set to 9999" << std::endl;
        }
        
        Sleep(10);
    }

    // 3. Dọn dẹp & Rút quân
    fclose(f);
    FreeConsole();
    FreeLibraryAndExitThread((HMODULE)lpParam, 0);
    return 0;
}

// Cửa ngõ của DLL
BOOL APIENTRY DllMain(HMODULE hModule, DWORD  ul_reason_for_call, LPVOID lpReserved) {
    switch (ul_reason_for_call) {
    case DLL_PROCESS_ATTACH:
        // Khi vừa tiêm vào, tạo ngay 1 luồng riêng để chạy hack
        CreateThread(nullptr, 0, HackThread, hModule, 0, nullptr);
        break;
    case DLL_PROCESS_DETACH:
        break;
    }
    return TRUE;
}
```

---

## 4.3. Chế Tạo Kim Tiêm (The Injector) 💉
Tạo Project mới: `Console App (C++)`.

```cpp
#include <iostream>
#include <windows.h>
#include <TlHelp32.h>

// Hàm lấy PID theo tên Game
DWORD GetProcId(const char* procName) {
    DWORD procId = 0;
    HANDLE hSnap = CreateToolhelp32Snapshot(TH32CS_SNAPPROCESS, 0);
    if (hSnap != INVALID_HANDLE_VALUE) {
        PROCESSENTRY32 procEntry;
        procEntry.dwSize = sizeof(procEntry);
        if (Process32First(hSnap, &procEntry)) {
            do {
                if (!_stricmp(procEntry.szExeFile, procName)) {
                    procId = procEntry.th32ProcessID;
                    break;
                }
            } while (Process32Next(hSnap, &procEntry));
        }
    }
    CloseHandle(hSnap);
    return procId;
}

int main() {
    const char* dllPath = "D:\\MyHacks\\SimpleHack.dll"; // Sửa đường dẫn này!
    const char* procName = "DummyGame.exe";
    
    // 1. Lấy PID
    DWORD procId = 0;
    while (!procId) {
        procId = GetProcId(procName);
        std::cout << "Waiting for game..." << std::endl;
        Sleep(1000);
    }

    // 2. Mở Process
    HANDLE hProc = OpenProcess(PROCESS_ALL_ACCESS, 0, procId);
    if (hProc && hProc != INVALID_HANDLE_VALUE) {
        // 3. Cấp phát bộ nhớ trong Game để chứa đường dẫn DLL
        void* loc = VirtualAllocEx(hProc, 0, MAX_PATH, MEM_COMMIT | MEM_RESERVE, PAGE_READWRITE);
        
        // 4. Ghi đường dẫn DLL vào đó
        WriteProcessMemory(hProc, loc, dllPath, strlen(dllPath) + 1, 0);
        
        // 5. Ép Game gọi LoadLibraryA để load DLL
        CreateRemoteThread(hProc, 0, 0, (LPTHREAD_START_ROUTINE)LoadLibraryA, loc, 0, 0);
        
        std::cout << ">>> INJECTED SUCCESSFULLY! <<<" << std::endl;
        CloseHandle(hProc);
    }
    return 0;
}
```

---

## 4.4. Hooking - Nghệ Thuật Đánh Tráo (Advanced) 🎣
Tiêm được DLL vào rồi thì làm gì? Hack máu chỉ là trò trẻ con.
Cao thủ sẽ dùng **Hooking**.

**Nguyên lý:**
Game có hàm `DrawPlayer()`. 
Hacker sẽ sửa code của hàm đó, chèn thêm lệnh `DrawBox()` của mình vào.
-> Kết quả: Game vừa vẽ nhân vật, vừa vẽ thêm cái khung hình chữ nhật bao quanh (Wallhack/ESP).

Thư viện nổi tiếng nhất: **MinHook**. (Chúng ta sẽ học sâu ở chương sau).

---

## 🛑 NHIỆM VỤ (MISSION)
1.  Build file `.dll` hack (nhớ chọn đúng x86/x64 khớp với game).
2.  Build file `.exe` injector.
3.  Chạy Game -> Chạy Injector.
4.  Nếu thấy cửa sổ Console đen hiện lên **bên trong game** -> Chúc mừng, bạn đã trở thành Internal Hacker!

---

[Tiếp theo: Chương 5 - Mobile Hacking (Android/iOS)](../05_Mobile_Hacking/README.md)
