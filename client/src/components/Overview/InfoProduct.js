import React, { useEffect, useState } from "react";
import axios from "axios";

const InfoProduct = ({ productID }) => {
  const [productInfo, setProductInfo] = useState({});
  var arr = [];
  useEffect(() => {
    axios
      .get(
        `https://app-hrsei-api.herokuapp.com/api/fec2/hr-sfo/products/${productID}`,
        {
          headers: {
            Authorization: "THE_API_KEY",
          },
        }
      )
      .then((res) => {
        setProductInfo({
          category: res.data.category,
          name: res.data.name,
          price: res.data.default_price,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }, [productID]);

  return (
    <div>
      <span>{productInfo.category}</span>
      <h3 style={{ margin: "0px" }}>{productInfo.name}</h3>
      <span>{productInfo.price} $</span>
    </div>
  );
};

export default InfoProduct;
