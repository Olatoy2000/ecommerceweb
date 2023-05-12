import { PasswordInput, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import React from 'react';
import { IconLock } from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';
import OpenConfirmModal from '@/src/component/OpenConfirmModal';
import OpenLoginModal from '@/src/component/OpenLoginModal';
import { useSignUp } from '@/src/signup';
import axios from 'axios';

const register = () => {

  const [opened, { open, close }] = useDisclosure(false);
     useDisclosure(false);
     const [loginOpened, { open: openLogin, close: closeLogin }] = useDisclosure(false);




    const newUserInformationForm = useForm({
        initialValues: {
          name: "",
          address: "",
          password: "",
          username: ""
        },
      });

      const registerUser = () => {
        axios.post('http://localhost:5001/api/users/register', newUserInformationForm.values)
        .then(function (response) {
          console.log(response);
          open()

        })
        .catch(function (error) {
          console.log(error);
        });           
      }

      



  return (
    <section className="flex flex-col pt-10 gap-[80px]">
        <div className='justify-center self-center text-[30px] font-semibold'>Register Now to gain access into our Ecommerce website</div>
        <form
        className="flex flex-col gap-8 h-[750px]"
        onSubmit={(e) => {
          e.preventDefault();
          registerUser()
        }}
      >
        <article className="flex flex-col w-[40%] mx-auto items-center self-end gap-4 py-4">
        <TextInput
            required
            classNames={{
              root: "flex flex-col w-full gap-2",
              label: "text-[14px] text-xds-eneutral-9 ",
              input:
                "py-1 pl-4 !h-[55px] bg-white  border border-solid border-[#DADADD]rounded-[8px]",
            }}
            label="Username"
            placeholder="Enter your username"
            {...newUserInformationForm.getInputProps("username")}
          />
           <PasswordInput
           classNames={{
            root: "flex flex-col w-full gap-2",
            label: "text-[14px] text-xds-eneutral-9",
            input:
              "py-1 pl-4 !h-[55px] bg-white  border border-solid border-[#DADADD] rounded-[8px]",
              innerInput: "pt-[20px]"
          }}
           required
           label="Password"
           placeholder="Your password"
           icon={<IconLock size="1rem" />}
           {...newUserInformationForm.getInputProps("password")}
            />
            
         <TextInput
      
            classNames={{
              root: "flex flex-col w-full gap-2",
              label: "text-[14px] text-xds-eneutral-9  ",
              input:
                "py-1 pl-4 !h-[55px] bg-white  border border-solid border-[#DADADD]rounded-[8px]",
            }}
            label="Full Name"
            placeholder="Enter Name"
            {...newUserInformationForm.getInputProps("name")}
          />
         <TextInput
            classNames={{
              root: "flex flex-col w-full gap-2",
              label: "text-[14px] text-xds-eneutral-9 ",
              input:
                "py-1 pl-4 !h-[55px] bg-white  border border-solid border-[#DADADD]rounded-[8px]",
            }}
            label="Address"
            placeholder="Enter Address"
            {...newUserInformationForm.getInputProps("address")}
          />
         
        </article>
        <button className='flex w-fit self-center rounded-md bg-[#45cc11] px-2 py-2'
        // onClick={() => {
        //   open()
        // }}
        >Submit</button>
      </form>
      <OpenConfirmModal 
         opened={opened}
         close={close} 
         openLogin={openLogin}
      />
      <OpenLoginModal
      loginOpened={loginOpened}
      closeLogin={closeLogin}
      />
    </section>
  )
}

export default register