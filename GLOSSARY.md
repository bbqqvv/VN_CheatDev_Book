# 📖 Từ Điển Thuật Ngữ (Glossary)

Dành cho những thuật ngữ chuyên ngành được sử dụng trong sách **[VN] CheatDev Book**.

## A
*   **Address (Địa chỉ):** Vị trí cụ thể của dữ liệu trong RAM (VD: `0x00400000`).
*   **ASLR (Address Space Layout Randomization):** Cơ chế bảo mật của HĐH, ngẫu nhiên hóa vị trí module mỗi khi chạy game để chống hack cứng (Hardcoded Address).
*   **Assembly (ASM):** Ngôn ngữ lập trình bậc thấp, ánh xạ trực tiếp với mã máy.

## B
*   **Base Address:** Địa chỉ bắt đầu của một Module (file .exe hoặc .dll) trong bộ nhớ.
*   **Breakpoint:** Điểm dừng. Lệnh cho Debugger dừng chương trình lại tại một dòng code để kiểm tra.

## C
*   **Class:** Khuôn mẫu dữ liệu trong lập trình hướng đối tượng (C++).
*   **Code Cave:** Các vùng trống trong bộ nhớ (do căn chỉnh bộ nhớ) mà Hacker có thể chèn code vào.

## D
*   **DLL Injection:** Kỹ thuật tiêm một file Dynamic Link Library (.dll) vào tiến trình game để chạy code của mình trong đó.
*   **DMA (Dynamic Memory Allocation):** Cấp phát bộ nhớ động (Heap). Nơi chứa dữ liệu thay đổi liên tục.

## E
*   **ESP (Extra Sensory Perception):** Hack nhìn xuyên tường. Hiển thị thông tin (Máu, Tên, Khung xương) lên màn hình.
*   **External Hack:** Tool hack chạy như một tiến trình riêng biệt, dùng Windows API để đọc/ghi bộ nhớ game.

## H
*   **Heap:** Vùng nhớ dùng để chứa các biến động (Object, Nhân vật) được cấp phát bằng `new` hoặc `malloc`.
*   **Hexadecimal (Hex):** Hệ thập lục phân (cơ số 16), dùng để biểu diễn địa chỉ bộ nhớ ngắn gọn.
*   **Hooking:** Kỹ thuật chặn và chuyển hướng dòng lệnh của một hàm trong game sang hàm của Hacker.

## I
*   **IDA Pro:** Trình Disassembler chuyên nghiệp nhất thế giới, dùng để phân tích tĩnh (Static Analysis).
*   **IL2CPP (Intermediate Language to C++):** Công nghệ của Unity, chuyển code C# sang C++ để tăng hiệu năng (và làm khó Hacker).
*   **Internal Hack:** Code hack chạy bên trong bộ nhớ game (thường là DLL).

## K
*   **Kernel (Ring 0):** Nhân hệ điều hành. Nơi có quyền hạn cao nhất. Anti-Cheat thường chạy ở đây.

## O
*   **Offset:** Khoảng cách từ vị trí bắt đầu (Base) đến vị trí cần tìm. VD: `Address = Base + Offset`.
*   **Overlay:** Một cửa sổ trong suốt nằm đè lên game để vẽ ESP.

## P
*   **Pointer (Con trỏ):** Một biến chứa địa chỉ của biến khác.
*   **Pointer Chain:** Một chuỗi các con trỏ trỏ đến nhau (A trỏ B, B trỏ C, C trỏ Máu). Dùng để tìm địa chỉ thật sau mỗi lần game restart.

## R
*   **ReClass:** Công cụ giúp khôi phục cấu trúc Class (Struct) từ bộ nhớ thô.
*   **RPM (ReadProcessMemory):** Hàm Windows API để đọc RAM.

## S
*   **Signature Scanning (SigScan):** Kỹ thuật tìm vị trí hàm trong bộ nhớ dựa trên một chuỗi byte đặc trưng (Pattern) thay vì địa chỉ cố định.
*   **Stack:** Vùng nhớ ngăn xếp, chứa biến cục bộ và địa chỉ trả về của hàm.

## W
*   **WPM (WriteProcessMemory):** Hàm Windows API để ghi đè RAM.
