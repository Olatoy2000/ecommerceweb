import React, { useContext, useEffect, useState } from "react";
import { NextPageX } from "@/types/next";
import HRDashboardLayout from "@/src/layouts/hrDashboard";
import { Table, TextInput } from "@mantine/core";
import { useStateValue } from "@/src/store/useGlobalState";
import { useForm } from "@mantine/form";
import { useApiData } from "@/src/hooks/useApiData";
import axios from "axios";
import moment from "moment";

interface Get {
  _id: string,
  name: string,
  quantity: number,
  price: number,
  image: string,
}


const ViewOrder: NextPageX = () => {
  const { state, setState } = useStateValue();
console.log("state", state )



const form = useForm({
  initialValues: {
    quantity: 1,
    
  },
});

  const [viewOrder, setViewOrder] = useState([])

  const getProducts = () => {
    axios.get('http://localhost:5001/api/catalog/getOrders')
    .then(function (response) {
      console.log(response.data);
      setViewOrder(response.data.data)

    })
    .catch(function (error) {
      console.log(error);
  
    });
               
  }


  useEffect(() => {
    getProducts()
  }, [])


  const rows = viewOrder.map((element, idx) => (
    <tr key={element['price']}>
      <td>{element['customerName']}</td>
      <td>{element['productID'].name}</td>
      <td><img src={element["image"] ?? "--"}  /> </td>
      <td>{element['price']}</td>
      <td>{element['quantity']}</td>
      <td>{moment(element['saleDate']).format('llll')} </td>
      <td>{element['status']}</td>
    </tr>

  ));
 
  return ( 
      <article className="flex-1 dark:bg-hrDarkMode-1 overflow-auto flex bg-xds-eneutral-2 p-6 flex-col">
        <Table horizontalSpacing="md" verticalSpacing="md" fontSize="lg">
      <thead>
        <tr className="font-bold text-[12px] leading-5">
          <th>Customer Name</th>
          <th>Product Name</th>
          <th>Picture</th>
          <th>Price</th>
          <th>Quantity</th>
          <th>Date Purchased</th>
          <th>Shipping Status</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </Table>
      </article>
  );
};

 ViewOrder.Layout = HRDashboardLayout;
    ViewOrder.LayoutProps = { pageLabel: [
  {
    label: "View Order ",
    link: "/view-order"
  }
  ] 
};
export default ViewOrder;
