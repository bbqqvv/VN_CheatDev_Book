#include <Windows.h>
#include <iostream>

// Đây là file DLL. Để biên dịch, bạn cần tạo Project DLL trong Visual Studio.
// Library cần thiết: MinHook (https://github.com/TsudaKageyu/minhook)

#include "MinHook.h" 

// Định nghĩa con trỏ hàm gốc (Prototype)
// Giả sử hàm trừ máu của game là: void TakeDamage(Player* p, int damage)
typedef void (__stdcall *TakeDamage_t)(void* player, int damage);
TakeDamage_t oTakeDamage = nullptr; // Biến lưu địa chỉ hàm gốc

// Hàm Hook (Fake Function) của chúng ta
void __stdcall hkTakeDamage(void* player, int damage) {
    // Logic Hack:
    // Nếu player là mình -> damage = 0 (God Mode)
    // Nếu player là địch -> damage = 9999 (One Hit)
    
    // Ở đây ta đơn giản hóa: Luôn luôn bất tử
    std::cout << "[INTERNAL] Game called TakeDamage with " << damage << " dmg -> Blocked!\n";
    damage = 0; 

    // Gọi lại hàm gốc để game không bị lỗi logic
    return oTakeDamage(player, damage);
}

// Luồng chính (Main Thread) chạy khi DLL được Inject vào
DWORD WINAPI MainThread(LPVOID lpParam) {
    // Mở Console để xem log (Debug Console)
    AllocConsole();
    FILE* f;
    freopen_s(&f, "CONOUT$", "w", stdout);
    std::cout << "=== INTERNAL HACK INJECTED ===\n";

    // 1. Khởi tạo MinHook
    if (MH_Initialize() != MH_OK) {
        std::cout << "MinHook Init Failed!\n";
        return 1;
    }

    // 2. Tìm địa chỉ hàm cần Hook
    // Trong thực tế, dùng AoB Scan (Array of Bytes) để tìm.
    // Ở đây giả sử ta đã tìm được qua IDA Pro.
    uintptr_t funcAddr = 0x12345678; // <--- THAY ĐỊA CHỈ THẬT VÀO ĐÂY
    std::cout << "Hooking Function at: 0x" << std::hex << funcAddr << "\n";

    // 3. Tạo Hook (Chuyển đường ray)
    if (MH_CreateHook((void*)funcAddr, &hkTakeDamage, (void**)&oTakeDamage) != MH_OK) {
        std::cout << "CreateHook Failed!\n";
        return 1;
    }

    // 4. Kích hoạt
    if (MH_EnableHook(MH_ALL_HOOKS) != MH_OK) {
        std::cout << "EnableHook Failed!\n";
        return 1;
    }

    std::cout << "Hook Enabled! God Mode Active.\n";
    std::cout << "Press END to Eject.\n";

    // Vòng lặp chờ nút bấm để thoát
    while (true) {
        if (GetAsyncKeyState(VK_END) & 1) break;
        Sleep(100);
    }

    // Dọn dẹp trước khi rút lui
    MH_DisableHook(MH_ALL_HOOKS);
    MH_Uninitialize();
    fclose(f);
    FreeConsole();
    FreeLibraryAndExitThread((HMODULE)lpParam, 0);
    return 0;
}

// Cổng vào của DLL
BOOL WINAPI DllMain(HINSTANCE hModule, DWORD dwReason, LPVOID lpReserved) {
    if (dwReason == DLL_PROCESS_ATTACH) {
        // Tạo thread mới để chạy code hack
        CreateThread(nullptr, 0, MainThread, hModule, 0, nullptr);
    }
    return TRUE;
}
