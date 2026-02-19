# ☠️ Chương 8: Kernel Driver (Vùng Đất Cấm)

> *"Ở Ring 3, nếu bạn sai, chương trình Crash. Ở Ring 0, nếu bạn sai, cả hệ điều hành sụp đổ (Blue Screen of Death)."*

---

## 🛑 SỨ MỆNH (MISSION BRIEFING)
Tại sao chúng ta phải mạo hiểm xuống Kernel?
Vì **Anti-Cheat** (Vanguard, EasyAntiCheat, BattlEye) đều nằm ở đó.
Khi bạn dùng `ReadProcessMemory` ở User Mode (Ring 3), Anti-Cheat ở Kernel (Ring 0) sẽ nhìn thấy và chặn ngay lập tức. "Mày tuổi gì mà đòi sờ vào game của tao?".

Muốn đánh bại Anti-Cheat, bạn phải ngang hàng với nó. Bạn phải viết **Kernel Driver**.

**Mục tiêu:**
1.  Hiểu kiến trúc **Ring 0 vs Ring 3**.
2.  Hiểu sự nguy hiểm của **BSOD**.
3.  Viết một **Driver Hello World** đơn giản.

---

## 8.1. Kiến Trúc Ring (The Hierarchy) 👑
CPU Intel/AMD chia quyền lực thành 4 vòng tròn (Rings). Windows chỉ dùng 2 vòng:

![Kernel Ring Diagram](images/kernel_ring.png)

*   **Ring 3 (User Mode):** Nơi ở của dân thường (Chrome, Word, Game, và các tool hack gà mờ). Bạn làm gì ở đây cũng bị Ring 0 giám sát.
*   **Ring 0 (Kernel Mode):** Nơi ở của Thượng đế (Windows Kernel, Drivers card màn hình, và Anti-Cheat). Ở đây, bạn có thể truy cập **mọi địa chỉ RAM** của bất kỳ process nào mà không cần xin phép.

**Anti-Cheat hoạt động thế nào?**
Nó cài một Driver (.sys) vào Ring 0. Nó đăng ký các hàm Callback:
> *"Bất kỳ ai (Ring 3) định mở Handle vào process Game, hãy báo cho tao. Tao sẽ tước quyền ngay lập tức."*
User Mode Hacker -> ☠️ Bất lực.

---

## 8.2. Rủi Ro (The Blue Screen of Death) 🟦
Quyền lực càng lớn, trách nhiệm càng cao.
Trong Ring 3, nếu code bạn lỗi (`Null Pointer`), chỉ có tool của bạn tắt ngúm.
Trong Ring 0, nếu code bạn lỗi, **Windows sẽ dừng hoạt động ngay lập tức** để bảo vệ phần cứng. Màn hình xanh chết chóc (BSOD) hiện ra. Máy khởi động lại.

> **Quy tắc số 1:** Test Driver trên máy ảo (VMware/VirtualBox) trước khi chạy thật. Đừng bao giờ code Driver trên máy chính nếu không muốn mất dữ liệu.

---

## 8.3. Chế Tạo Driver Đầu Tiên (Hello World .sys) 🚗
Bạn cần cài đặt **Visual Studio** và **WDK (Windows Driver Kit)**.

Tạo Project: `Kernel Mode Driver, Empty (KMDF)`.

**Code `Driver.c`:**

```c
#include <ntddk.h>

// Hàm dọn dẹp khi tắt Driver (Bắt buộc phải có, nếu không sẽ không tắt được Driver)
void DriverUnload(PDRIVER_OBJECT pDriverObject) {
    UNREFERENCED_PARAMETER(pDriverObject);
    DbgPrint(">>> Hacker: Bye bye Kernel! Safe landing. <<<\n");
}

// Hàm chính (Giống main() trong C++)
NTSTATUS DriverEntry(PDRIVER_OBJECT pDriverObject, PUNICODE_STRING pRegistryPath) {
    UNREFERENCED_PARAMETER(pRegistryPath);

    pDriverObject->DriverUnload = DriverUnload;

    DbgPrint(">>> Hacker: HELLO RING 0! Power Overwhelming! <<<\n");

    return STATUS_SUCCESS;
}
```

**Biên dịch:** Bấm Build -> Bạn sẽ nhận được file `MyDriver.sys`.
File này **không thể chạy bằng cách double click**.

---

## 8.4. Load Driver (Nhập Tịch Ring 0) 🛡️
Windows 10/11 mặc định cấm load Driver không có chữ ký số (Unsigned Driver) để chống virus.
Để load driver "cây nhà lá vườn" của chúng ta, bạn phải bật chế độ **Test Mode**.

1.  Mở CMD (Admin).
2.  Gõ: `bcdedit /set testsigning on`
3.  Restart máy. (Bạn sẽ thấy chữ "Test Mode" ở góc màn hình).

**Dùng Tool load:**
Sử dụng **OSR Loader** hoặc **KDU** để load file `.sys` vào hệ thống.
Sau khi load, dùng **DebugView** (của Sysinternals) để xem dòng log `>>> Hacker: HELLO RING 0!`.

Nếu thấy nó -> Chúc mừng, bạn đã đặt chân vào thánh địa Kernel!

---

## 🛑 Cảnh Báo Cuối Cùng
Viết Driver Hack Game là vi phạm EULA nghiêm trọng và có thể bị kiện.
Kiến thức này chỉ để học tập và hiểu về OS Internals.
Các Anti-Cheat hiện tại (Vanguard) chạy ngay từ khi boot máy. Cuộc chiến ở Ring 0 rất khốc liệt và đẫm máu (BSOD liên tục).

---

[Tiếp theo: Chương 9 - Anti-Cheat Evasion (Trốn Tìm)](../09_Anti_Cheat_Evasion/README.md)
