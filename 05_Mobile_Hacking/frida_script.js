// frida_script.js
// Chạy bằng lệnh: frida -U -f com.game.package -l frida_script.js

console.log("[*] Frida Script Started...");

Java.perform(function () {

    // --- BYPASS ROOT DETECTION ---
    // Tìm class thường dùng để check root
    try {
        var RootChecker = Java.use("com.security.RootChecker");

        // Hook hàm isDeviceRooted
        RootChecker.isDeviceRooted.implementation = function () {
            console.log("[+] Game asked: Is Device Rooted? -> Lie: NO");
            return false; // Luôn trả về False
        };
    } catch (e) {
        console.log("[-] RootChecker class not found (Ignore if not applicable)");
    }

    // --- NATIVE HOOKING (C++) ---
    // Hook vào các hàm trong thư viện .so (Unity / Cocos)

    // Lấy địa chỉ Base của thư viện
    var libName = "libil2cpp.so"; // Hoặc libcocos2djs.so
    var baseAddr = Module.findBaseAddress(libName);

    if (baseAddr) {
        console.log("[*] Found " + libName + " at: " + baseAddr);

        // Offset tìm được từ IDA Pro / Il2CppDumper
        var offsetPlayerHealth = 0x123456;
        var targetAddr = baseAddr.add(offsetPlayerHealth);

        Interceptor.attach(targetAddr, {
            onEnter: function (args) {
                // Khi hàm được gọi
                console.log("[*] SetHealth called!");

                // args[0] = `this` pointer
                // args[1] = tham số đầu tiên (ví dụ: int health)

                console.log("--> Original Health Arg: " + args[1].toInt32());

                // Hack: Sửa tham số thành 9999
                args[1] = ptr(9999);
                console.log("--> Modified Health Arg: 9999");
            },
            onLeave: function (retval) {
                // Khi hàm chạy xong
            }
        });

    } else {
        console.log("[-] Library " + libName + " not found (Game running?)");
    }
});
