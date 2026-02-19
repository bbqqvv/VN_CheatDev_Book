#include <iostream>
#include <windows.h>
#include <tlhelp32.h>
#include <string>

// Hướng dẫn biên dịch:
// Dùng Visual Studio hoặc g++: g++ ExternalTrainer.cpp -o Trainer.exe

// Hàm lấy Base Address của Module (File .exe trong RAM)
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
    std::cout << "=== EXTERNAL TRAINER FOR DUMMY GAME ===\n";
    std::cout << "Waiting for game window...\n";

    // 1. Tìm cửa sổ Game
    HWND hwnd = FindWindowA(NULL, "Dummy Game for Hacking");
    while (!hwnd) {
        hwnd = FindWindowA(NULL, "Dummy Game for Hacking");
        Sleep(100);
    }
    std::cout << "Found Game Window!\n";

    // 2. Lấy Process ID
    DWORD pid = 0;
    GetWindowThreadProcessId(hwnd, &pid);
    std::cout << "Process ID: " << pid << "\n";

    // 3. Mở Process quyền cao nhất (All Access)
    HANDLE hProcess = OpenProcess(PROCESS_ALL_ACCESS, FALSE, pid);
    if (!hProcess) {
        std::cout << "Failed to open process! Run as Admin maybe?\n";
        system("pause");
        return 1;
    }

    // 4. Nhập địa chỉ cần hack (Lấy từ Cheat Engine)
    // Trong thực tế, ta sẽ dùng Pointer Chain (Base + Offset) để tự tìm.
    // Ở bài Lab cơ bản này, ta nhập tay để hiểu cơ chế.
    uintptr_t healthAddr = 0;
    std::cout << "Enter Health Address (HEX) from Cheat Engine (e.g., 00B1F20): ";
    std::cin >> std::hex >> healthAddr;

    std::cout << "--- HACK ACTIVATED ---\n";
    std::cout << "[F1] Set Health to 999\n";
    std::cout << "[F2] Set Ammo to 999 (Offset Logic)\n";
    std::cout << "[F3] Exit\n";

    while (true) {
        // Nút F1: Ghi đè máu
        if (GetAsyncKeyState(VK_F1) & 1) {
            int newHealth = 999;
            // WriteProcessMemory(Handle, Addr, Buffer, Size, BytesWritten)
            WriteProcessMemory(hProcess, (BYTE*)healthAddr, &newHealth, sizeof(newHealth), nullptr);
            std::cout << "-> Health Hacked!\n";
        }

        // Nút F2: Ghi đè đạn (Dựa trên Offset +4)
        if (GetAsyncKeyState(VK_F2) & 1) {
            int newAmmo = 999;
            // Địa chỉ Đạn luôn nằm sau Máu 4 byte (trong struct Player)
            uintptr_t ammoAddr = healthAddr + 0x04; 
            WriteProcessMemory(hProcess, (BYTE*)ammoAddr, &newAmmo, sizeof(newAmmo), nullptr);
            std::cout << "-> Ammo Hacked (via Offset)!\n";
        }

        if (GetAsyncKeyState(VK_F3) & 1) break;
        Sleep(10);
    }

    CloseHandle(hProcess);
    return 0;
}
