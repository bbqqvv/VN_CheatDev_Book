# 🏴‍☠️ Chương 1: Tư Duy Hacker (The Mindset)

> *"Tôi không dạy bạn cách dùng tool. Tôi dạy bạn cách máy tính suy nghĩ. Khi bạn hiểu máy tính, bạn là Chúa."*

---

## 🛑 SỨ MỆNH (MISSION BRIEFING)
Chào mừng tân binh. Bạn đang đứng trước cánh cổng của thế giới ngầm (Underground).
Nhiệm vụ của chương này không phải là hack game ngay. Nhiệm vụ của bạn là **"Mở Mắt"**.
Bạn phải nhìn thấy ma trận số (Matrix) đằng sau những hình ảnh đồ họa lung linh.

**Mục tiêu:**
1.  Hiểu **RAM** hoạt động như thế nào (Chiến trường chính).
2.  Đọc hiểu **Hexadecimal** (Ngôn ngữ của máy).
3.  Nắm vững **Con Trỏ (Pointer)** (Bản đồ kho báu).
4.  Tự tay code một **Dummy Game** để làm chuột bạch thí nghiệm.

---

## 1.1. Kho Vũ Khí (Weaponry Setup) 🛠️
Đi đánh trận mà tay không thì chỉ có "Feed mạng". Cài đặt ngay bộ 3 hủy diệt này:

1.  **Visual Studio 2022 (Community)**:
    *   *Là gì:* Lò rèn vũ khí. Nơi chúng ta viết code C/C++.
    *   *Link:* [Download](https://visualstudio.microsoft.com/vs/community/)
    *   *Lưu ý:* Khi cài nhớ tích chọn **"Desktop development with C++"**. Đừng cài nhầm VS Code (đó chỉ là Text Editor).

2.  **Cheat Engine (Bản mới nhất)**:
    *   *Là gì:* Kính hiển vi soi RAM.
    *   *Link:* [Download](https://www.cheatengine.org/)
    *   *Cảnh báo:* Antivirus sẽ la làng là virus. Kệ nó, tắt Antivirus đi. Hacker mà sợ virus à?

3.  **Process Hacker 2**:
    *   *Là gì:* Task Manager phiên bản "ngầu". Dùng để soi các tiến trình ẩn, tắt Anti-cheat.

---

## 1.2. Chiến Trường RAM (The Battlefield) 💾
Khi bạn bật game (CS2, LoL...), toàn bộ Game được load từ ổ cứng lên **RAM**.
Hacker không tấn công ổ cứng. Hacker tấn công **RAM**.

Hãy tưởng tượng **RAM** là một **Thành Phố Khổng Lồ**:
*   Mỗi **Byte** là một ngôi nhà.
*   Mỗi ngôi nhà có một **Số nhà (Address)** duy nhất. Ví dụ: `0x00400000`.
*   Bên trong ngôi nhà chứa **Cư dân (Value)**. Cư dân có thể là số Máu, số Đạn, hoặc tên nhân vật.

### 🗺️ Bản Đồ Thành Phố (Memory Layout)
Thành phố này được quy hoạch thành 4 quận chính. Bạn bắt buộc phải nhớ:

![Memory Layout Diagram](images/memory_layout.png)

> **🧠 Ghi nhớ cốt tử:**
> *   Hack Máu/Đạn/Tiền: Chúng ta lùng sục ở **Heap**.
> *   Hack Bất tử/Nhìn xuyên tường (Logic): Chúng ta sửa đổi **Code (.text)**.

---

## 1.3. Ngôn Ngữ Của Máy (Hexadecimal) 🤖
Tại sao Hacker luôn viết `0xDEADBEEF` mà không viết số thường?

*   Bạn dùng hệ 10 (0-9).
*   Máy tính dùng hệ 2 (0-1).
*   **Hệ 16 (Hex)** là cầu nối hoàn hảo. 1 chữ số Hex đại diện chính xác cho 4 bit nhị phân. Gọn gàng, sexy.

**Bảng Chuyển Đổi Nhanh:**

| Thập phân (Dec) | Hex (0x) | Nhị phân (Bin) | Ý nghĩa |
| :--- | :--- | :--- | :--- |
| 0 | 0 | 0000 | Rỗng |
| 10 | A | 1010 | |
| 15 | F | 1111 | Full 4-bit |
| 255 | FF | 1111 1111 | Full 1 Byte (Max) |

> **Quy ước:** Bất cứ khi nào thấy tiền tố `0x`, hãy hiểu đó là số Hex.
> Ví dụ: Địa chỉ `0x123` không phải là một trăm hai mươi ba, mà là `1*256 + 2*16 + 3`.

---

## 1.4. Nhận Diện Mục Tiêu (Data Types) 🎯
Máy tính không biết "Máu" hay "Mana". Nó chỉ biết các ô nhớ vô hồn.
Để tìm được kẻ địch, bạn phải biết hắn trông như thế nào.

1.  **Byte (1 byte)**:
    *   *Dùng cho:* Levell, Team ID (1=Terrorist, 2=Counter), Boolean (0=False, 1=True).
    *   *Range:* 0 - 255.
2.  **Integer (4 bytes)**: **⚠️ QUAN TRỌNG NHẤT**
    *   *Dùng cho:* Máu, Đạn, Tiền, Giáp.
    *   *Range:* -2 tỷ đến +2 tỷ.
3.  **Float (4 bytes)**:
    *   *Dùng cho:* **Tọa độ (X, Y, Z)**, Tốc độ di chuyển, Góc nhìn.
    *   *Đặc điểm:* Có dấu chấm động (VD: `100.5f`).
4.  **Double (8 bytes)**:
    *   *Dùng cho:* Game Engine đời mới (Unreal 5) hoặc Game Web (JavaScript).
5.  **String**:
    *   *Dùng cho:* Tên nhân vật, Chat log.

---

## 1.5. Con Trỏ (Pointers) - Bản Đồ Kho Báu 🗺️
Đây là "Trùm Cuối" của mớ lý thuyết. Nếu vượt qua được nó, bạn đã thắng 50% game.

**Vấn đề:**
Game hiện đại có cơ chế **ASLR** (Address Space Layout Randomization).
Mỗi lần khởi động game, Windows sẽ tráo đổi vị trí các ngôi nhà trên RAM.
Hôm nay địa chỉ Máu là `0x1000`, mai nó nhảy sang `0x9999`.

**Giải pháp:**
Game cũng sợ lạc mất Máu. Nên Game luôn giữ một tờ giấy ghi địa chỉ Máu hiện tại. Tờ giấy đó gọi là **Con Trỏ (Pointer)**.
Con trỏ thường nằm ở một vị trí **Tĩnh (Static)** không bao giờ đổi (thường là trong file `.exe` hoặc `.dll`).

**Mô hình truy tìm kho báu:**
![Pointer Chain Diagram](images/pointer_chain.png)

Hacker dùng Cheat Engine để **Pointer Scan** - Dò ngược từ Kho báu về Tòa thị chính để tìm ra con đường này.

---

## 1.6. Nhiệm Vụ Thực Hành: Tạo Dummy Game 🎮
Bạn không thể hack nếu không biết game được tạo ra thế nào.
Hãy code một con game giả lập bằng C++ để làm "bao cát" cho chúng ta tập luyện.

### Bước 1: Code `DummyGame.cpp`
Copy đoạn code này vào Visual Studio và chạy (F5).

```cpp
#include <iostream>
#include <windows.h>
#include <vector>

// Cấu trúc nhân vật trong game
struct Player {
    int id;             // 4 bytes
    char name[32];      // 32 bytes
    int health;         // 4 bytes (Mục tiêu của chúng ta!)
    int ammo;           // 4 bytes
    float posX, posY;   // 8 bytes
};

int main() {
    SetConsoleTitleA("Dummy Game - Targeted by VTech");
    std::cout << ">>> GAME INIT... <<<" << std::endl;

    // Cấp phát nhân vật trên HEAP (Vùng nhớ động)
    // Đây là lý do địa chỉ thay đổi mỗi lần chạy
    Player* myPlayer = new Player();
    
    // Gán chỉ số ban đầu
    myPlayer->id = 777;
    strcpy_s(myPlayer->name, "Neo");
    myPlayer->health = 100;
    myPlayer->ammo = 30;
    myPlayer->posX = 150.5f;

    // In địa chỉ ra để "nhá hàng" (Game thật không bao giờ có dòng này!)
    std::cout << "[DEBUG] Player Struct Address: 0x" << std::hex << (uintptr_t)myPlayer << std::endl;
    std::cout << "[DEBUG] Health Address:        0x" << std::hex << (uintptr_t)&myPlayer->health << std::endl;
    std::cout << "------------------------------------------------" << std::endl;

    while (true) {
        // Game Loop
        std::cout << "Player: " << myPlayer->name 
                  << " | HP: " << std::dec << myPlayer->health 
                  << " | Ammo: " << myPlayer->ammo 
                  << " | Pos: " << myPlayer->posX << std::endl;

        // Logic game: Tự mất máu theo thời gian
        if (myPlayer->health > 0) {
            myPlayer->health -= 1; 
        } else {
            std::cout << ">>> GAME OVER (YOU DIED) <<<" << std::endl;
            // Hồi sinh
            std::cout << "Respawning..." << std::endl;
            myPlayer->health = 100;
        }

        Sleep(1000); // Nghỉ 1 giây
    }
    
    delete myPlayer;
    return 0;
}
```

### Bước 2: Thử Nghiệm
1.  Chạy `DummyGame.exe`.
2.  Mở **Cheat Engine**.
3.  Kết nối vào Process `DummyGame.exe`.
4.  Thử tìm giá trị `health` xem nào? (Nó bắt đầu từ 100 và giảm dần).

> **Gợi ý:** Nếu bạn tìm ra, hãy thử "Freeze" (Đóng băng) nó. Nếu Console của game cứ in ra `HP: 100` mãi mãi mặc dù game đang trừ máu -> **BẠN ĐÃ THÀNH CÔNG!** 🎉

---

[Tiếp theo: Chương 2 - Hacker's Swiss Knife (Cheat Engine)](../02_Cong_Cu_Than_Thanh/README.md)
