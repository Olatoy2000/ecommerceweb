import { Table } from '@mantine/core'
import { showNotification } from '@mantine/notifications'
import axios from 'axios'
import router from 'next/router'
import React, { useEffect, useState } from 'react'

const ProductViewList = () => {
    const [NewProducts, setNewProducts] = useState([])
  const getNewProducts = () => {
    axios.post('localhost:5001/api/catalog/newProduct')
    .then(function (response) {
      console.log(response.data);
      setNewProducts(response.data.data)
     showNotification({
        title: "Dear user",
        message: "product added successfully",
        color: "green",
      });

      router.push("./show-product")
    })
    .catch(function (error) {
      console.log(error);
    });
  }
  useEffect(() => {
    getNewProducts()
  }, [])



  const rows = NewProducts.map((element) => (
    <tr key={element['name']}>
      <td>{element['price']}</td>
      <td>{<img src={element["image"]} />}</td>
      <td>{element['quantity']}</td>
    </tr>

  ));
 
  return ( 
      <article className="flex-1 dark:bg-hrDarkMode-1 overflow-auto flex gap-5 bg-xds-eneutral-2 p-6 flex-col">   
      </article>
  );
}

export default ProductViewList