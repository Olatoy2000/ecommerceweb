import { Modal } from "@mantine/core";
import { showNotification } from "@mantine/notifications";

import axios from "axios";
import config from "next/config";
import { useRouter } from "next/router";
import { SetStateAction, useState } from "react";
import { useStateValue } from "../store/useGlobalState";




interface NewProductData {
    name: string;
    quantity: string;
    price: string;
    image: string;
  }


  export default function NewProductModal({
    newProductOpened,
    closeNewProduct,
  }: {
    newProductOpened: boolean;
    closeNewProduct: () => void;
  }) {
    const { state } = useStateValue();
    const [newProductData, setNewProductData] = useState<NewProductData>({
      name: "",
      quantity: "",
      price: "",
      image: "",
    });

    const router = useRouter();



    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setNewProductData((prev) => ({
          ...prev,
          [id]: value 
        }));
      };
    
    // axios.request(config)
   
  const handleSubmit = async () => {
    try {
        const data = {
            "name": newProductData.name,
            "quantity": newProductData.quantity,
            "price": newProductData.price,
             image: newProductData.image
             }
      const response = await axios.post("http://localhost:5001/api/catalog/newProduct", data, {
        headers: { "Content-Type": "application/json" },
      });
      console.log(response.data);
      showNotification({
        title: "Product added!",
        message: "The new product has been added to the catalog.",
        color: "teal",
      });
      closeNewProduct();
      router.push("/new-product");
    } catch (error) {
      console.error(error);
      showNotification({
        title: "An error occurred",
        message: "The product could not be added to the catalog.",
        color: "red",
      });
      closeNewProduct();
    }
  };


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
                handleSubmit();
                
                }}
                className="flex flex-col gap-10">
                <label htmlFor="name">
                    Name:
                <input type="text"  placeholder='Name' id='name' value={newProductData.name}   onChange={handleChange}
                className="py-1 pl-4 !h-[55px] w-full bg-white border border-solid border-[#DADADD]rounded-[8px]"
                />
                </label>
                <label>
                    Quantity:
                    <input 
                    className="py-1 pl-4 !h-[55px] w-full bg-white border border-solid border-[#DADADD]rounded-[8px]"
                    type="number" placeholder='quantity' id='quantity' value={newProductData.quantity}  onChange={handleChange} required/>

                </label>
                <label>
                    Price:
                    <input 
                    className="py-1 pl-4 !h-[55px] w-full bg-white border border-solid border-[#DADADD]rounded-[8px]"
                    type="number" placeholder='price' id='price' onChange={handleChange} value={newProductData.price} required/>
                </label>
                <label>
                    Image:
                    <input 
                    className="py-1 pl-4 !h-[55px] w-full bg-white border border-solid border-[#DADADD]rounded-[8px]"
                    type="text" id="image" value={newProductData.image} onChange={handleChange} />
                </label>
                <button            
        className='flex mt-5 text-center justify-center rounded-md text-white bg-[#3851dd] px-2 items-center w-full py-2'>Add Product</button>
            </form>
        </div>
           
      </Modal>
    </>
) 
}
