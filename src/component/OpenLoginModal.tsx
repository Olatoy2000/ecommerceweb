import { useDisclosure } from '@mantine/hooks';
import { Modal, PasswordInput, TextInput } from '@mantine/core';
import { IconLock } from '@tabler/icons-react';
import { useForm } from '@mantine/form';
import router from 'next/router';
import axios from 'axios';
import { showNotification } from '@mantine/notifications';
import { useStateValue } from '../store/useGlobalState';

export default function OpenLoginModal({ loginOpened, closeLogin}: any) {
  const { state, setState } = useStateValue();
  const userLoginDetailsForm = useForm({
    initialValues: {
      password: "",
      username: ""
    },
  });
  const logInUser = () => {
    axios.post('http://localhost:5001/api/users/login', userLoginDetailsForm.values)
    .then(function (response) {
      console.log("response", response)
      setState({isAdmin: response?.data?.data?.is_admin})
     showNotification({
        title: "Dear user",
        message: "you are successfully logged in",
        color: "green",
      });

      router.push("./show-product")
    })
    .catch(function (error) {
      console.log(error);
      showNotification({
        title: "Dear user",
        message: "Incorrect Password or Username",
        color: "red",
      });
    });
               
  }

  return (
    <>
      <Modal 
      opened={loginOpened} 
      onClose={() => {
        closeLogin();
    
    }} 
      title="Login Access"
      centered
      closeOnClickOutside={false}
      transitionProps={{ transition: 'slide-left', duration: 300 }}
      >
        <form
        className="flex flex-col gap-8"
        onSubmit={(e) => {
          e.preventDefault();
          logInUser();

        }}>
        <TextInput
            required
            classNames={{
              root: "flex flex-col gap-2",
              label: "text-[14px]",
              input:
                "py-1 pl-4 !h-[55px] bg-white border border-solid border-[#DADADD]rounded-[8px]",
            }}
            label="Username"
            placeholder="Enter your username"
            {...userLoginDetailsForm.getInputProps("username")}
          />
           <PasswordInput
           required
           classNames={{
            root: "flex flex-col w-full gap-2",
            label: "text-[14px] text-xds-eneutral-9 ",
            input:
              "py-1 pl-4 !h-[55px] bg-white dark:text-white border border-solid border-[#DADADD] rounded-[8px]",
              innerInput: "pt-[20px]"
          }}
           label="Password"
           placeholder="Your password"
           icon={<IconLock size="1rem" />}
           {...userLoginDetailsForm.getInputProps("password")}
            />
        <button 
           
        className='flex text-center justify-center rounded-md text-white bg-[#3851dd] px-2 items-center w-full py-2'>Login</button>
      </form>
   
      </Modal>
    </>
  );
}