# 🩸 Chương 3: External Hacking (First Blood)

> *"Dùng Cheat Engine là đi mượn kiếm. Tự code Trainer là tự rèn kiếm cho riêng mình."*

---

## 🛑 SỨ MỆNH (MISSION BRIEFING)
Bạn đã biết tìm địa chỉ bằng Cheat Engine. Nhưng bạn không thể bắt khách hàng của mình tải Cheat Engine về rồi làm thủ công từng bước được.
Bạn cần đóng gói kỹ thuật đó vào một file `.exe` duy nhất. Bấm 1 nút -> Hack xong.

Đó gọi là **External Hacking**: Viết một phần mềm chạy *bên ngoài* game, dùng quyền Admin thò tay vào sửa RAM của game.

**Mục tiêu:**
1.  Hiểu quy trình **OpenProcess**.
2.  Sử dụng thuần thục 2 hàm WinAPI thần thánh: `ReadProcessMemory` (RPM) và `WriteProcessMemory` (WPM).
3.  Code một **Trainer C++** hoàn chỉnh hack `DummyGame`.

---

## 3.1. Quy Trình Xâm Nhập (Infiltration Flow) 🕵️‍♂️
Windows bảo vệ các Process rất nghiêm ngặt. Process A không thể tự tiện sửa Process B.
Để làm được điều đó, Hacker phải xin một cái "Chìa khóa" (Handle) từ hệ điều hành.

![API Flow Diagram](images/api_flow.png)

1.  **Find Window:** Tìm cửa sổ game để lấy `Process ID` (PID).
2.  **OpenProcess:** Dùng PID để xin Windows cấp quyền truy cập (`PROCESS_ALL_ACCESS`).
3.  **Read/Write:** Dùng Handle đã xin được để Đọc/Ghi RAM.

---

## 3.2. Vũ Khí C++ (The Arsenal) 🧰

### `FindWindowA`
Tìm cửa sổ game bằng tên Class hoặc tên Title.
```cpp
HWND hwnd = FindWindowA(NULL, "Dummy Game for Hacking");
```

### `GetWindowThreadProcessId`
Lấy số chứng minh thư (PID) của game.
```cpp
DWORD pid;
GetWindowThreadProcessId(hwnd, &pid);
```

### `OpenProcess`
Xin chìa khóa vào nhà.
```cpp
HANDLE hProcess = OpenProcess(PROCESS_ALL_ACCESS, FALSE, pid);
```

### `WriteProcessMemory` (WPM)
Cú đấm quyết định. Ghi đè giá trị mới vào địa chỉ cũ.
```cpp
int newHealth = 9999;
WriteProcessMemory(hProcess, (LPVOID)0xDEADBEEF, &newHealth, sizeof(newHealth), NULL);
```

---

## 3.3. Thực Hành: Code Trainer Đầu Tiên (Project: FirstBlood) 🩸
Hãy tạo một project C++ mới tên là `SimpleTrainer`.

**Yêu cầu:** Đã chạy `DummyGame.exe` và dùng Cheat Engine tìm ra địa chỉ Health (Ví dụ: `0x00EFF690` - *Lưu ý: Địa chỉ máy bạn sẽ khác, hãy thay thế vào code*).

```cpp
#include <iostream>
#include <windows.h> // Thư viện chứa các hàm WinAPI

int main() {
    SetConsoleTitleA("Simple External Trainer");
    std::cout << ">>> WAITING FOR GAME... <<<" << std::endl;

    // 1. Tìm cửa sổ Game
    HWND hwnd = FindWindowA(NULL, "Dummy Game - Targeted by VTech");
    if (hwnd == NULL) {
        std::cout << "[-] Khong tim thay game! Hay bat DummyGame.exe truoc." << std::endl;
        return 0;
    }
    std::cout << "[+] Da tim thay cua so Game!" << std::endl;

    // 2. Lấy PID
    DWORD pid;
    GetWindowThreadProcessId(hwnd, &pid);
    std::cout << "[+] Process ID: " << pid << std::endl;

    // 3. Mở Process (Xin quyền truy cập)
    HANDLE hProcess = OpenProcess(PROCESS_ALL_ACCESS, FALSE, pid);
    if (hProcess == NULL) {
        std::cout << "[-] Khong the mo Process. Hay chay Admin!" << std::endl;
        return 0;
    }
    std::cout << "[+] OpenProcess Success! Handle: " << hProcess << std::endl;

    // 4. Hack Loop
    // Thay địa chỉ này bằng địa chỉ bạn tìm được từ Cheat Engine!!
    uintptr_t healthAddr = 0x00EFF690; 
    int cheatVal = 9999;

    while (true) {
        if (GetAsyncKeyState(VK_F1) & 1) { // Nếu bấm F1
            // Ghi đè máu
            WriteProcessMemory(hProcess, (LPVOID)healthAddr, &cheatVal, sizeof(cheatVal), NULL);
            std::cout << "[!] HACKED: Set Health -> 9999" << std::endl;
            Beep(1000, 100); // Kêu Bíp cho ngầu
        }
        Sleep(50); // Nghỉ nhẹ để đỡ ngốn CPU
    }

    CloseHandle(hProcess);
    return 0;
}
```

---

## 🛑 NHIỆM VỤ (TOP SECRET)
1.  Code lại ví dụ trên.
2.  Thay địa chỉ `healthAddr` đúng với máy của bạn.
3.  Chạy Trainer và bấm **F1** để xem `DummyGame` có hồi máu không.
4.  **Thử thách:** Thêm tính năng Hack Ammo (Đạn) vào phím **F2**.

---

[Tiếp theo: Chương 4 - Internal Hacking (Tiêm DLL - Kỹ thuật thượng thừa)](../04_Lap_Trinh_Internal/README.md)
