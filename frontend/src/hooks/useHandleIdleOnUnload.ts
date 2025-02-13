import { useEffect } from "react";
import { useChatStore } from "@/stores/useChatStore";

const useHandleIdleOnUnload = () => {
  useEffect(() => {
    const handleUnload = () => {
      const socket = useChatStore.getState().socket;
      if (socket.auth) {
        socket.emit("update_activity", {
          userId: socket.auth.userId,
          activity: "Idle",
        });
      }
    };

    window.addEventListener("beforeunload", handleUnload);
    return () => window.removeEventListener("beforeunload", handleUnload);
  }, []);
};

export default useHandleIdleOnUnload;
