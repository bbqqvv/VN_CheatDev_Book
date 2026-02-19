#include <iostream>
#include <windows.h>
#include <string>
#include <vector>

// CLASS mô phỏng nhân vật trong game
// Cấu trúc này sẽ nằm trong Heap
struct Player {
    int id;             // Offset 0x00
    char name[32];      // Offset 0x04
    int health;         // Offset 0x24 (36 decimal)
    int ammo;           // Offset 0x28 (40 decimal)
    float posX, posY;   // Offset 0x2C, 0x30
};

// Hàm hỗ trợ in địa chỉ
void PrintDebugInfo(Player* p) {
    std::cout << "--------------------------------------------------\n";
    std::cout << "[DEBUG] Base Pointer (Stack):    0x" << std::hex << (uintptr_t)&p << "\n";
    std::cout << "[DEBUG] Player Object (Heap):    0x" << std::hex << (uintptr_t)p << "\n";
    std::cout << "[DEBUG] Health Address:          0x" << std::hex << (uintptr_t)&p->health << "\n";
    std::cout << "[DEBUG] Ammo Address:            0x" << std::hex << (uintptr_t)&p->ammo << "\n";
    std::cout << "--------------------------------------------------\n";
}

int main() {
    SetConsoleTitleA("Dummy Game for Hacking");
    
    std::cout << "Starting Dummy Game...\n";
    
    // Cấp phát động (Heap Allocation)
    // Game thật luôn dùng new/malloc
    Player* myPlayer = new Player();
    
    // Khởi tạo giá trị
    myPlayer->id = 1;
    strcpy_s(myPlayer->name, "HackerPro");
    myPlayer->health = 100;
    myPlayer->ammo = 30;
    myPlayer->posX = 100.5f;
    myPlayer->posY = 50.0f;

    PrintDebugInfo(myPlayer);

    std::cout << "Game Loop Running... (Press Ctrl+C to Exit)\n";

    while (true) {
        // In trạng thái hiện tại
        std::cout << "Player: " << myPlayer->name 
                  << " | Health: " << std::dec << myPlayer->health 
                  << " | Ammo: " << myPlayer->ammo 
                  << " | Pos: (" << myPlayer->posX << ", " << myPlayer->posY << ")\n";

        // Logic game: Tự động mất máu/hồi máu
        if (myPlayer->health > 0) {
            // Giả lập bị bắn
             myPlayer->health -= 1; 
        } else {
            std::cout << ">>> YOU DIED! <<<\n";
            // Checkpoint: Hồi sinh
            myPlayer->health = 100;
            std::cout << ">>> RESPAWNED! <<<\n";
        }
        
        Sleep(1000); // Chờ 1 giây
    }
    
    delete myPlayer;
    return 0;
}
