import { Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import router from "next/router";
import OpenLoginModal from "@/src/component/OpenConfirmModal"

interface Prop {
    opened: boolean;
    close: () => void;
    openOrg?: () => void;
  }

export default function OpenConfirmModal({ opened, close, openLogin }: any) {


   
    return (
        <Modal 
    opened={opened}
    onClose={() => {
        close()
      }}
    closeOnClickOutside={false}
    size="auto" 
    title=""
    transitionProps={{ transition: 'slide-left', duration: 300 }}>
    <div className="flex flex-col gap-5 px-4 py-2">
        <p>Your Account has been successfully created, you can now Login</p>
        <div className="flex items-center justify-between px-3">
            <button 
                onClick={() => {
                    close();
                    router.push("/register")
                }}
            className="bg-[#9ba7a8] px-3 py-1 rounded-md">Back</button>
            <button 
                onClick={() => {
                    openLogin();
                    close();
                }}
            className="bg-[#3851DD] px-3 py-1 text-white rounded-md">Login</button>
        </div>
       
    </div>
      
</Modal>

    )

}

