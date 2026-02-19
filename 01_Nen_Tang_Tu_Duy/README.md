# Chương 1: Nền Tảng Tư Duy (The Mindset) 🧠

*"Để hack được Matrix, bạn phải nhìn thấy Matrix."*

Chào mừng đến với chương đầu tiên. Ở đây, chúng ta sẽ không học cách dùng tool hack ngay. Chúng ta sẽ học cách **máy tính suy nghĩ**.

---

## 1.0. Chuẩn Bị Trang Bị (Setup Môi Trường) 🛠️
Trước khi ra chiến trường, bạn cần vũ khí. Hãy tải và cài đặt ngay:

1.  **Visual Studio Community (2022)**: IDE lập trình C++ tốt nhất trên Windows.
    *   *Link:* [visualstudio.microsoft.com](https://visualstudio.microsoft.com/vs/community/)
    *   *Lưu ý:* Khi cài đặt, nhớ tích vào ô **"Desktop development with C++"**.
2.  **Cheat Engine (8.x)**: "Dao mổ" để soi RAM game.
    *   *Link:* [cheatengine.org](https://www.cheatengine.org/)

---

## 1.1. Bộ Nhớ Máy Tính (RAM) - Chiến Trường Chính
Khi một game chạy (ví dụ: CS2, LoL, GTA), toàn bộ dữ liệu của nó (Máu, Đạn, Tọa độ, Tên nhân vật) đều phải được nạp vào **RAM**.
Hacker không thể sửa đổi đĩa cứng để hack máu tức thì. Hacker sửa **RAM**.

### Cấu trúc của RAM
Hãy tưởng tượng RAM là một thành phố khổng lồ.
*   Mỗi ngôi nhà là một **Byte**.
*   Mỗi ngôi nhà có một số nhà duy nhất gọi là **Địa chỉ (Address)**. Ví dụ: `0x00400000`.
*   Bên trong ngôi nhà chứa **Giá trị (Value)**.

### Sơ Đồ Bộ Nhớ (Memory Segment Visualization)

Hãy xem cách Game phân bổ bộ nhớ:

```mermaid
graph TD
    subgraph RAM_Layout ["RAM Address Space (4GB Virtual Memory for 32-bit Game)"]
        direction TB
        Stack["🟧 STACK (Ngăn Xếp)<br/>Biến cục bộ, Param hàm<br/>(Sinh ra/Mất đi liên tục)"]
        Heap["🟦 HEAP (Vùng Nhớ Động)<br/>Player, Enemy, Item, Xe cộ<br/>(Nơi Hacker tấn công)"]
        BSS["🟨 .BSS / .DATA<br/>Biến toàn cục (Global)<br/>Static Variables"]
        Text["🟩 .TEXT (Code Segment)<br/>Mã lệnh Assembly của Game<br/>(Read-Only / Execute)"]
    end
    
    style Stack fill:#ff9900,stroke:#333,stroke-width:2px,color:white
    style Heap fill:#0066cc,stroke:#333,stroke-width:2px,color:white
    style BSS fill:#ffcc00,stroke:#333,stroke-width:2px,color:black
    style Text fill:#00cc66,stroke:#333,stroke-width:2px,color:black
```

1.  **Code Segment (.text):** Chứa mã lệnh của game (Assembly). Đây là nơi chứa logic "Nếu hết máu thì chết". Hacker sửa ở đây gọi là **Code Injection**.
2.  **Data Segment (.data):** Chứa các biến toàn cục (Global variables) cố định.
3.  **Stack:** Vùng nhớ ngăn xếp, dùng cho các biến cục bộ (Local variables) trong hàm. Nó sinh ra và mất đi liên tục.
4.  **Heap:** Vùng nhớ động. Đây là nơi chứa Nhân vật, Xe cộ, Item. **99% dữ liệu game nằm ở đây**.

---

## 1.2. Hệ Thập Lục Phân (Hexadecimal)
Tại sao Hacker luôn dùng `0x`?
*   Con người dùng hệ 10 (0-9).
*   Máy tính dùng hệ 2 (0-1).
*   Hệ 16 (Hex) là cách viết tắt hoàn hảo cho hệ 2. Một ký tự Hex đại diện cho 4 bit.

**Bảng quy đổi:**
| Dec | Hex | Binary | Ghi chú |
| :--- | :--- | :--- | :--- |
| 0 | 0 | 0000 | |
| 10 | A | 1010 | |
| 15 | F | 1111 | Max 4-bit |
| 16 | 10 | 0001 0000 | |
| 255 | FF | 1111 1111 | Max 8-bit (1 Byte) |

**Quy tắc:** Mọi địa chỉ bộ nhớ đều viết dưới dạng Hex (VD: `0xDEADBEEF`).

---

## 1.3. Kiểu Dữ Liệu (Data Types)
Máy tính không biết "Máu" là gì. Nó chỉ biết các ô nhớ. Bạn phải biết game dùng kiểu dữ liệu gì để quét cho đúng.

1.  **Byte (1 byte):** Số nhỏ (0-255). Thường dùng cho `Team ID` (1=CT, 2=T), `Level`.
2.  **Word / Short (2 bytes):** Số vừa (-32k đến 32k). Ít dùng.
3.  **Integer / Dword (4 bytes):** Số nguyên (-2 tỷ đến 2 tỷ). **Đa số Máu, Đạn, Tiền dùng kiểu này.**
4.  **Float (4 bytes):** Số thực có dấu phẩy (100.5). **Tọa độ (X, Y, Z) luôn luôn là Float.**
5.  **Double (8 bytes):** Số thực siêu lớn. Dùng trong game Engine xịn (Unreal 5) hoặc game Web (JS).

---

## 1.4. Con Trỏ (Pointers) - Bản Đồ Kho Báu
Đây là khái niệm giết chết 90% người mới học. Hãy chú ý.

Trong lập trình hiện đại, biến Máu **không bao giờ** nằm yên một chỗ. Mỗi lần bạn mở game, Windows sẽ cấp cho Máu một địa chỉ nhà mới (cơ chế ASLR - Address Space Layout Randomization).
Nếu bạn tìm ra địa chỉ Máu hôm nay, ngày mai nó sẽ sai.

**Giải pháp:** Game phải lưu lại địa chỉ mới đó vào một chỗ cố định. Chỗ đó gọi là **Con Trỏ (Pointer)**.
Con trỏ là một biến đặc biệt: Giá trị của nó không phải là số lượng, mà là **địa chỉ của biến khác**.

```mermaid
graph LR
    Base[Static Base Address<br/>0x00400000] -- trỏ tới --> P1[Player Pointer<br/>0x1539A020]
    P1 -- trỏ tới --> Entity[Player Entity<br/>0x29B1C000]
    Entity -- offset 0x100 --> Health[Health Value<br/>100 HP]
```

**Chuỗi Pointer (Pointer Chain):**
Game thường giấu dữ liệu qua nhiều tầng trỏ:
`Module Base Address` -> `World Pointer` -> `Player Array` -> `My Player` -> `Health`.
Hacker phải dùng Cheat Engine để lần ngược (Reverse) chuỗi này (Pointer Scan).

---

## 1.5. Bài Tập Thực Hành (Lab 1)
Bạn không thể hack game nếu không biết tạo ra game. Hãy viết một "Game giả" bằng C++ để làm chuột bạch.

### Code: `DummyGame.cpp`
```cpp
#include <iostream>
#include <windows.h>
#include <string>

// Một Class mô phỏng nhân vật game
struct Player {
    int id;
    char name[32];
    int health; // Máu (Offset 0x24)
    int ammo;   // Đạn (Offset 0x28)
};

int main() {
    SetConsoleTitleA("Dummy Game for Hacking");
    
    // Cấp phát động (Heap) - Mô phỏng game thật
    Player* myPlayer = new Player();
    myPlayer->id = 1;
    strcpy_s(myPlayer->name, "HackMePlz"); // Dùng strcpy_s an toàn hơn
    myPlayer->health = 100;
    myPlayer->ammo = 30;

    // In ra địa chỉ để người học đối chiếu (Trong thực tế Game sẽ không in cái này!)
    std::cout << "--- DEBUG INFO ---" << std::endl;
    std::cout << "Base Pointer (Stack):    0x" << std::hex << (uintptr_t)&myPlayer << std::endl;
    std::cout << "Player Address (Heap):   0x" << std::hex << (uintptr_t)myPlayer << std::endl;
    std::cout << "Health Address (Actual): 0x" << std::hex << (uintptr_t)&myPlayer->health << std::endl;
    std::cout << "------------------" << std::endl;

    while (true) {
        std::cout << "Game Loop: Health = " << std::dec << myPlayer->health 
                  << " | Ammo = " << myPlayer->ammo << std::endl;

        // Giả lập logic game: Hồi máu nếu thấp, mất máu nếu > 0
        if (myPlayer->health > 0) myPlayer->health--;
        if (myPlayer->health <= 0) std::cout << "YOU DIED!" << std::endl;
        
        Sleep(1000); // Nghỉ 1 giây
    }
    
    return 0;
}
```

### Hướng Dẫn Compile & Chạy (Step-by-Step):

1.  **Bước 1:** Mở Visual Studio 2022. Chọn **"Create a new project"**.
2.  **Bước 2:** Chọn **"Empty Project (C++)"** -> Next -> Đặt tên `DummyGame` -> Create.
3.  **Bước 3:** Ở cửa sổ bên phải (Solution Explorer), chuột phải vào **Source Files** -> **Add** -> **New Item**.
4.  **Bước 4:** Chọn **C++ File (.cpp)**, đặt tên `DummyGame.cpp` -> Add.
5.  **Bước 5:** Copy toàn bộ code ở trên dán vào.
6.  **Bước 6:** Bấm **F5** (hoặc nút Play xanh lá ▶️) để chạy.
7.  **Kết quả:** Một cửa sổ đen xì (Console) hiện lên với dòng chữ "Game Loop...". Chúc mừng, bạn đã tạo ra con game đầu tiên để hack!

---

👉 **Bài tập về nhà:** Mở Cheat Engine lên, Attach vào Process `DummyGame.exe` và thử tìm giá trị `health` trước khi nó tụt về 0!
