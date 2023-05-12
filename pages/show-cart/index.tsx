import React, { useContext, useEffect, useState } from "react";
import { NextPageX } from "@/types/next";
import HRDashboardLayout from "@/src/layouts/hrDashboard";

import Link from "next/link";
import { Table, TextInput } from "@mantine/core";
import axios from "axios";
import { useForm } from "@mantine/form";
import { showNotification } from "@mantine/notifications";


const ShowCart: NextPageX = () => {

  const [showCart, setShowCart] = useState([])
  const form = useForm({
    initialValues: {
      quantity: 1,
      
    },
  });


  const getCarts = () => {
    axios.get('http://localhost:5001/api/cart')
    .then(function (response) {
      setShowCart(response.data.data)
    })
    .catch(function (error) {
      console.log(error);
   
    });
               
  }

  useEffect(() => {
    getCarts()
  }, [])

  const deleteCartProduct = (productID: string) => {
    axios.delete(`http://localhost:5001/api/cart/items/${productID}`)
    .then(function (response) {
      console.log(response)
      setLoading(true);
     showNotification({
        title: "Dear user",
        message: "Product removed from cart successfully",
        color: "green",
      });
      setLoading(false)
      getCarts();
    })
    .catch(function (error) {
      console.log(error);
      showNotification({
        message: "Product not removed",
        color: "red",
      });
    });
               
  }




  const rows = showCart.map((element) => (
    <tr key={element['name']}>
      <td>{element['cartid']}</td>
      <td>{element['name']}</td>
      <td>{element['productID']}</td>
      <td>{element['price']}</td>
      <td>{
      <div className="flex items-center gap-2">
        <button onClick={() => deleteCartProduct(element['_id'])} className="bg-[#CC553D] p-2 rounded-md text-white">Delete</button>
      </div>
      } </td>
      <td>
      <button>
          <img className="w-20" src={element["image"]} />
        </button>
      </td>
      <td>{element['quantity']}</td>
    </tr>

  ));
 
  return ( 
      <article className="flex-1 dark:bg-hrDarkMode-1 overflow-auto flex gap-5 bg-xds-eneutral-2 p-6 flex-col">
        <p className="font-bold text-[18px]">Shopping Cart</p>
        <Table horizontalSpacing="md" verticalSpacing="md" fontSize="lg">
      <thead>
        <tr>
          <th>Card ID</th>
          <th>Product Name</th>
          <th>Product ID</th>
          <th>Price</th>
          <th>Delete</th>
          <th>Picture</th>
          <th>Quantity</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </Table>
      </article>
  );
};
ShowCart.Layout = HRDashboardLayout;
ShowCart.LayoutProps = { pageLabel: [
  {
    label: "Show Cart",
    link: "/show-cart"
  }
  ] 
};
export default ShowCart;
function setLoading(arg0: boolean) {
  throw new Error("Function not implemented.");
}

