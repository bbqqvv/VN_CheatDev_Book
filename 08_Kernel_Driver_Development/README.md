# Chương 8: Kernel Driver Development (Đỉnh Cao Bảo Mật) 🛡️

*"Welcome to Ring 0. Nơi một dòng code sai làm màn hình xanh (BSOD)."*

Tại sao Hacker phải xuống Kernel?
Vì Anti-Cheat (EAC, Vanguard) đang ngồi ở đó. Nếu bạn ở User Mode (Ring 3), bạn là dân thường, Anti-Cheat là Cảnh sát. Cảnh sát có quyền khám xét, bắt giữ bạn.
Nếu bạn xuống Kernel (Ring 0), bạn là Đặc vụ ngầm. Bạn ngang hàng hoặc cao hơn Cảnh sát.

---

## 8.1. Kiến Trúc Windows (Ring Levels)

```mermaid
graph TD
    subgraph Ring3 [User Mode (Ring 3)]
        App[Game.exe] -- Read Virtual Memory --> WindowsAPI[Windows API]
        Cheat[Cheat.exe] -- OpenHandle --> WindowsAPI
    end
    
    subgraph Ring0 [Kernel Mode (Ring 0)]
        WindowsAPI -- Syscall --> Kernel[NTOSKRNL.EXE]
        Kernel --> Driver1[Anti-Cheat.sys]
        Kernel --> Driver2[MyCheat.sys]
        Driver2 -- Direct Access --> RAM[Physical Memory]
    end
    
    style Ring3 fill:#e6f7ff,stroke:#1890ff,stroke-width:2px
    style Ring0 fill:#fff1f0,stroke:#ff4d4f,stroke-width:2px
    style Driver2 fill:#black,color:#00ff41,stroke:#00ff41
```

*   **Ring 3 (User Mode):** Ứng dụng bình thường. Bị giới hạn bởi các hàm API. Không thể đọc RAM của tiến trình System.
*   **Ring 0 (Kernel Mode):** Quyền năng tuyệt đối. Truy cập trực tiếp phần cứng, bộ nhớ vật lý.

Anti-Cheat dùng **ObRegisterCallbacks** trong Kernel để chặn quyền `OpenProcess` của Cheat Engine. Đó là lý do bạn bật CE lên nhưng không attach được vào game.

---

## 8.2. Viết Driver Cheat (.sys) "Hello World"
Để viết Driver, bạn cần tải **WDK (Windows Driver Kit)** về cài vào Visual Studio.

Chúng ta sẽ không viết lý thuyết suông. Đây là code cho một Driver đơn giản nhất: In ra dòng chữ "Hello Kernel" khi được load.

### Code: `HelloDriver.c`
```c
#include <ntddk.h>

// Hàm này chạy khi Driver bị gỡ bỏ (Unload)
// Nếu không có hàm này, bạn không thể stop driver mà phải reboot máy!
void DriverUnload(PDRIVER_OBJECT pDriverObject) {
    UNREFERENCED_PARAMETER(pDriverObject);
    DbgPrint("Bye Bye Kernel from CheatDev!\n");
}

// Hàm Main (Entry Point)
NTSTATUS DriverEntry(PDRIVER_OBJECT pDriverObject, PUNICODE_STRING pRegistryPath) {
    UNREFERENCED_PARAMETER(pRegistryPath);

    pDriverObject->DriverUnload = DriverUnload;

    // DbgPrint giống như printf, nhưng in vào DebugView (Kernel Log)
    DbgPrint("Hello World! I am running in Ring 0!\n");

    return STATUS_SUCCESS;
}
```

### Cách Test Driver:
1.  Compile code trên ra file `MyDriver.sys`.
2.  Tải tool **DebugView** (của Sysinternals) để xem log.
3.  Tải tool **KDMapper** hoặc bật chế độ **Test Signing** (`bcdedit /set testsigning on`) để load driver (Vì driver này chưa có chữ ký số).
4.  Khi load xong, DebugView sẽ hiện dòng: `Hello World! I am running in Ring 0!`.

---

## 8.3. Kỹ Thuật Giao Tiếp IOCTL
Driver nằm ở Ring 0, Cheat Tool nằm ở Ring 3. Chúng làm sao nói chuyện?
Chúng ta dùng **IOCTL (Input/Output Control)**.

1.  Scanner.exe (User) gửi lệnh: `IOCTL_READ_MEMORY` + `Address: 0x123` + `PID: Game`.
2.  Driver.sys (Kernel) nhận lệnh -> Thực hiện đọc RAM -> Trả kết quả về Scanner.

---

## 8.4. Load Driver (Vấn đề Chữ Ký)
Windows 10/11 bắt buộc mọi Driver phải có Chữ ký số (Digital Signature) của Microsoft (tốn hàng nghìn $).
Hacker lách luật bằng cách: **KDMapper (Intel Manual Map)**.
*   Lợi dụng một Driver cũ của Intel/Nvidia/Capcom có lỗ hổng bảo mật nhưng có chữ ký xịn.
*   Dùng Driver lỗi đó để "cõng" Driver hack của mình vào Kernel (Manual Map).
*   Sau khi vào xong, xóa dấu vết của Driver lỗi. Driver hack vẫn nằm trong RAM và chạy nhưng không có trong danh sách quản lý của Windows (Driverless).

---

## 8.5. Bypass Anti-Cheat (Cơ bản)
1.  **Handle Stripping:** Nếu tool hack của bạn lỡ mở Handle vào game, Anti-Cheat sẽ quét thấy. Driver cho phép bạn đọc/ghi mà không cần mở Handle.
2.  **CR3 Paging:** Anti-Cheat chặn truy cập bộ nhớ ảo? Driver đọc thẳng Bộ nhớ vật lý (Physical Memory) thông qua thanh ghi CR3 (Directory Table Base).

**Lưu ý:** Lập trình Kernel cực khó và nguy hiểm. Sai một ly đi một dặm (Blue Screen). Hãy test trên Máy ảo (VMware) trước.

[Tiếp theo: Chương 9 - Anti-Cheat Evasion](../09_AntiCheat_Evasion/README.md)
