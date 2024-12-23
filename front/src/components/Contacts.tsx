import { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import SidebarSkeleton from "./skeletons/SidebarSkeleton";
import { Users } from "lucide-react";
import { t } from "i18next";
import { useAuthStore } from "../store/useAuthStore";

const Contacts = () => {
  const { getUsers, users, selectedUser, setSelectedUser, setSelectedCommunity, isUsersLoading } =
    useChatStore();

  const { onlineUsers } = useAuthStore();

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  return (
    <>
      {isUsersLoading ? (
        <SidebarSkeleton />
      ) : (
        <div className="overflow-y-auto w-full py-3">
            {/* titulo */}
            <div className="flex items-center justify-center gap-2 p-3 border-b border-primary/30">
                <Users className="size-6" />
                <h1 className="text-lg font-bold">{t('contacts')}</h1>
            </div>
          {users.map((user) => (
            <button
              type="button"
              key={user._id}
              onClick={() => {
                setSelectedUser(user)
                setSelectedCommunity(null)
              }}
              className={`w-full p-3 flex items-center gap-3 hover:bg-base-300 transition-colors ${
                selectedUser?._id === user._id
                  ? "bg-base-300 ring-1 ring-base-300"
                  : ""
              }`}
            >
              <div className="relative mx-auto lg:mx-0">
                <img
                  src={user.profilePic || "/avatar.png"}
                  alt={user.fullName}
                  className="rounded-full size-12 object-cover"
                />
                {onlineUsers.includes(user._id) && (
                  <span className="absolute bottom-0 right-0 size-3 bg-green-500 rounded-full ring-2 ring-zinc-900" />
                )}
              </div>

              <div className="hidden lg:block text-left min-w-0">
                <div className="font-medium truncate">{user.fullName}</div>
                <div className="text-sm text-zinc-400">
                  {onlineUsers.includes(user._id) ? "Online" : "Offline"}
                </div>
              </div>
            </button>
          ))}
        </div>
      )}
    </>
  );
};

export default Contacts;
