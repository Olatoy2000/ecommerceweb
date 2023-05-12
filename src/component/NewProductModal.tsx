import { Modal, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import axios from "axios";
import router from "next/router";
import { SetStateAction, useState } from "react";
import { useStateValue } from "../store/useGlobalState";
import  DropPictureZone  from "./DropZone";


export default function NewProductModal({ newProductOpened, closeNewProduct, openNewProduct }: any) {


const { state, setState } = useStateValue();
const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState<File | null>(null);
// const newProductDetailsForm = useForm({
//   initialValues: {
//     name: "",
//     quantity: Number,
//     price: Number,
//     image: null,
//   },
// });



const handleChange = (e: { target: { id: string; value: SetStateAction<string>; }; }) => {
    if (e.target.id === 'name') {
      setName(e.target.value);
    } else if (e.target.id === 'quantity') {
      setQuantity(e.target.value);
    }else if (e.target.id === 'price') {
        setPrice(e.target.value);
  };
}

const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
    console.log({ name, price, quantity, image });
    let form_data = new FormData();
    form_data.append('image', image ? image : '', image ? image.name : '');
    form_data.append('name', name);
    form_data.append('quantity', quantity);
    form_data.append('price', price);
    let url = 'http://localhost:5001/api/cart/add';
    axios.post(url, form_data, {
      headers: {
        'content-type': 'multipart/form-data'
      }
    })
        .then(res => {
          console.log(res.data);
            showNotification({
            title: "Dear user",
            message: "product added successfully",
            color: "green",
            });
            router.push("./show-product")
        })
        .catch(err => console.log(err))
    } 


// const getNewProducts = () => {
// axios.post('http://localhost:5001/api/cart/add', newProductDetailsForm.values)
// .then(function (response) {
//   console.log(response.data);
 
//  showNotification({
//     title: "Dear user",
//     message: "product added successfully",
//     color: "green",
//   });

//   router.push("./show-product")
// })
// .catch(function (error: any) {
//   console.log(error);
//   showNotification({
//     title: "Dear user",
//     message: "Some information are required",
//     color: "red",
//   });
// });
           
// }

return (
    <>
      <Modal 
      opened={newProductOpened} 
      onClose={() => {
        closeNewProduct();
        }} 
      title="Add New Product"
      centered
      closeOnClickOutside={false}
      transitionProps={{ transition: 'slide-left', duration: 500 }}
      >
     
         <div className="flex flex-col gap-12 items-center">
            <form onSubmit={(e) => {
                e.preventDefault();
                handleSubmit(e);
                }}
                className="flex flex-col gap-10">
                <label htmlFor="name">
                    Name:
                <input type="text"  placeholder='Name' id='name' value={name} onChange={handleChange} 
                className="py-1 pl-4 !h-[55px] w-full bg-white border border-solid border-[#DADADD]rounded-[8px]"
                />
                </label>
                <label>
                    Quantity:
                    <input 
                    className="py-1 pl-4 !h-[55px] w-full bg-white border border-solid border-[#DADADD]rounded-[8px]"
                    type="number" placeholder='quantity' id='quantity' value={quantity} onChange={handleChange} required/>

                </label>
                <label>
                    Price:
                    <input 
                    className="py-1 pl-4 !h-[55px] w-full bg-white border border-solid border-[#DADADD]rounded-[8px]"
                    type="number" placeholder='price' id='price' value={price} onChange={handleChange} required/>
                </label>
                <label>
                    Image:
                    <input 
                    className="py-1 pl-4 !h-[55px] w-full bg-white border border-solid border-[#DADADD]rounded-[8px]"
                    type="file" id="image" accept="image/png, image/jpeg"  onChange={handleImageChange} />
                </label>
                <input type="submit" />
            </form>
        </div>
        <button            
        className='flex mt-5 text-center justify-center rounded-md text-white bg-[#3851dd] px-2 items-center w-full py-2'>Add Product</button>   
      </Modal>
    </>
) 
}
