"use client";
import { AuthService } from "@/services/auth.service";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function UserMenu() {
  const route = useRouter();

  const handleLogout = async () => {
    try {
      await AuthService.logout();
      toast.success("successfully logged out!");
      route.push("/login");
    } catch (err) {
      console.error("Logout failed:", err);
      toast.error("Failed to log out. Please try again.");
    }
  };

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button className="flex items-center gap-1 rounded-full p-1 hover:bg-gray-100 transition">
          <div className="w-6 h-6 rounded-full bg-gray-300" />{" "}
          <svg
            className="w-4 h-4 text-blue-500"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M5.23 7.21a.75.75 0 011.06.02L10 11.585l3.71-4.356a.75.75 0 111.14.976l-4.25 5a.75.75 0 01-1.14 0l-4.25-5a.75.75 0 01.02-1.06z" />
          </svg>
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Content
        className="bg-white shadow-md rounded-md px-2 py-1 w-32 text-sm"
        sideOffset={8}
        align="end"
      >
        <DropdownMenu.Item
          className="flex items-center gap-2 px-2 py-1 hover:bg-gray-100 cursor-pointer"
          onSelect={handleLogout}
        >
          <LogOut className="w-4 h-4" />
          Logout
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}
