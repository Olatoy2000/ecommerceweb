import React, { useEffect, useState } from "react";
import { NextPageX } from "@/types/next";
import HRDashboardLayout from "@/src/layouts/hrDashboard";
import { Table, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import axios from "axios";
import { showNotification } from "@mantine/notifications";
import { useQueryClient } from "react-query";
import Loading from "@/src/component/loading";

interface Get {
  _id: string,
  name: string,
  quantity: number,
  price: number,
  image: string,
}


const ShowProduct: NextPageX = () => {

const form = useForm({
  initialValues: {
    quantity: 0,
    
  },
});




  const [showProducts, setShowProducts] = useState([])
  const [loading, setLoading] = useState(false);


  const getProducts = () => {
    axios.get('http://localhost:5001/api/catalog/getProducts')
    .then(function (response) {
      setShowProducts(response.data.data)
 
    })
    .catch(function (error) {
      console.log(error);
    });
               
  }



  const addToCart = (productID: string, quantity: number) => {
    axios.post('http://localhost:5001/api/cart/add', {productID: productID, quantity: quantity})
    .then(function (response) {
     showNotification({
        message: "Product successfully added to cart",
        color: "green",
      });
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



  const deleteProduct = (productID: string) => {
    axios.delete(`http://localhost:5001/api/catalog/deleteProduct/${productID}`)
    .then(function (response) {
      setLoading(true);
     showNotification({
        title: "Dear user",
        message: "Product removed successfully",
        color: "green",
      });
      setLoading(false)
      getProducts();
    })
    .catch(function (error) {
      console.log(error);
      showNotification({
        message: "Product not removed",
        color: "red",
      });
    });
               
  }



  const rows = showProducts.map((element, idx) => (
    <tr key={element['price']}>
      <td>{element['name']}</td>
      <td>{element['price']}</td>
      <td>
        <button>
          <img 
          className="w-20" src={element["image"]} />
        </button>
      </td>
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
      <td><button onClick={() => addCart(element['_id'], form.values.quantity)} className="bg-[#000] text-white px-2 py-1 rounded-md">Buy</button></td>
      <td><button onClick={() => deleteProduct(element['_id'])} className="bg-[#CC553D] flex items-center text-white p-2 rounded-md">Delete</button></td>
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
          <th>Delete Product</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </Table>
    <Loading loading={loading} />
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