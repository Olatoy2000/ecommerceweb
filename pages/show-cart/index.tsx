import React, { useContext, useEffect, useState } from "react";
import { NextPageX } from "@/types/next";
import HRDashboardLayout from "@/src/layouts/hrDashboard";

import Link from "next/link";
import { Table } from "@mantine/core";
import axios from "axios";


const ShowCart: NextPageX = () => {

  const [showCart, setShowCart] = useState([])


  const getCarts = () => {
    axios.get('http://localhost:5001/api/cart')
    .then(function (response) {
      console.log(response.data);
      setShowCart(response.data.data)
    })
    .catch(function (error) {
      console.log(error);
   
    });
               
  }

  useEffect(() => {
    getCarts()
  }, [])




  const rows = showCart.map((element) => (
    <tr key={element['name']}>
      <td>{element['price']}</td>
      <td>{element['image']}</td>
      <td>{element['quantity']}</td>
    </tr>

  ));
 
  return ( 
      <article className="flex-1 dark:bg-hrDarkMode-1 overflow-auto flex gap-5 bg-xds-eneutral-2 p-6 flex-col">
        <p className="font-bold text-[18px]">Shopping Cart</p>
        <Table horizontalSpacing="md" verticalSpacing="md" fontSize="lg">
      <thead>
        <tr>
          <th>Product Name</th>
          <th>Price</th>
          <th>Picture</th>
          <th>Quantity</th>
          <th>Buy Button</th>
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
