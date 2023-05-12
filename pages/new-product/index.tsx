import React, { useContext, useEffect, useState } from "react";
import { NextPageX } from "@/types/next";
import HRDashboardLayout from "@/src/layouts/hrDashboard";
import axios from "axios";
import { showNotification } from "@mantine/notifications";
import router from "next/router";
import { useStateValue } from "@/src/store/useGlobalState";
import { useForm } from "@mantine/form";
import { Modal, TextInput } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import NewProductModal from "@/src/component/NewProductModal";
import { Add } from "iconsax-react";


const NewProduct: NextPageX = () => {

    const [newProductOpened, { open: openNewProduct, close: closeNewProduct }] = useDisclosure(false);

    const { state, setState } = useStateValue();
    


 



 
  return (
    <article className="flex flex-col flex-1 bg-white gap-8 shadow-md items-center justify-center"> 
        <h1 className="text-[16px] bg-slate-200 p-4 -tracking rounded-md font-bold leading-5 text-center w-[450px]">
        You can now add New Product here and it will reflect on the Show Product page  
        </h1>
        <img src="./new-product-photo.jpeg" alt="" className="w-40" />
        <button
        onClick={() => openNewProduct()}
        className="flex items-center justify-between px-3 py-2  text-white bg-[#0362a9]">
        <Add size="16" color="#fff" />
            Add New Product</button>
    <NewProductModal newProductOpened={newProductOpened} closeNewProduct={closeNewProduct} />
    </article>
  );
};
NewProduct.Layout = HRDashboardLayout;
NewProduct.LayoutProps = { pageLabel: [
  {
    label: "Show Cart",
    link: "/show-cart"
  }
  ] 
};
export default NewProduct;


