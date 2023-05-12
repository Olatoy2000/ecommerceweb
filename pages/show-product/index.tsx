import React, { useContext, useEffect, useState } from "react";
import { NextPageX } from "@/types/next";
import HRDashboardLayout from "@/src/layouts/hrDashboard";
import { Table, TextInput } from "@mantine/core";
import { useStateValue } from "@/src/store/useGlobalState";
import { useForm } from "@mantine/form";
import { useApiData } from "@/src/hooks/useApiData";
import axios from "axios";
import { showNotification } from "@mantine/notifications";

// // useage
interface Get {
  _id: string,
  name: string,
  quantity: number,
  price: number,
  image: string,
}


const ShowProduct: NextPageX = () => {
//   const { state, setState } = useStateValue();
// console.log("state", state )



const form = useForm({
  initialValues: {
    quantity: 1,
    
  },
});


  //   const { data, isLoading, error } = useApiData<Get[]>(
  //   "localhost:5001/api/catalog/getProducts",
  //   "get"
  // );

  const [showProducts, setShowProducts] = useState([])


  const getProducts = () => {
    axios.get('http://localhost:5001/api/catalog/getProducts')
    .then(function (response) {
      console.log(response.data);
      setShowProducts(response.data.data)
    //  showNotification({
    //     title: "Dear user",
    //     message: "you are successfully logged in",
    //     color: "green",
    //   });

      // router.push("./show-product")
    })
    .catch(function (error) {
      console.log(error);
    //   showNotification({
    //     title: "Dear user",
    //     message: "Incorrect Password or Username",
    //     color: "red",
    //   });
    });
               
  }



  const addToCart = (productID: string, quantity: number) => {
    axios.post('http://localhost:5001/api/cart/add', {productID: productID, quantity: quantity})
    .then(function (response) {
      console.log(productID);
      setShowProducts(response.data.data)
     showNotification({
        title: "Dear user",
        message: "Product added successfully",
        color: "green",
      });

      // router.push("./show-product")
    })
    .catch(function (error) {
      console.log(error);
      showNotification({
        title: "Dear user",
        message: "Product not added",
        color: "red",
      });
    });
               
  }

  useEffect(() => {
    getProducts()
  }, [])

  const addCart = (productID: string, quantity: number) => {
    addToCart(productID, quantity);
  }


  const rows = showProducts.map((element, idx) => (
    <tr key={element['price']}>
      <td>{element['name']}</td>
      <td>{element['price']}</td>
      <td><img src={element["image"]} /></td>
      <td>{
      <div className="flex items-center gap-2">
        {element['quantity']} 
        <TextInput
          type="number"
          classNames={{
            root: "flex flex-col gap-2",
           
            input:
              "py-3 pl-4 !h-[30px] border border-solid rounded-xl",
          }}
       
          placeholder="quantity"
          {...form.getInputProps(`quantity${idx}`)}
        />
      </div>
      } </td>
      <td><button onClick={() => addCart(element['productID'], form.values.quantity)} className="bg-[#000] text-white px-2 py-1 rounded-md">Buy</button></td>
    </tr>

  ));
 
  return ( 
      <article className="flex-1 dark:bg-hrDarkMode-1 overflow-auto flex bg-xds-eneutral-2 p-6 flex-col">
        <Table horizontalSpacing="md" verticalSpacing="md" fontSize="lg">
      <thead>
        <tr className="font-bold text-[12px] leading-5">
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

ShowProduct.Layout = HRDashboardLayout;
ShowProduct.LayoutProps = { pageLabel: [
  {
    label: "Show Product",
    link: "/show-product"
  }
  ] 
};
export default ShowProduct;
