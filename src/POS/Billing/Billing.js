import React, { useState, useEffect } from 'react';
import './Billing.css';
import Row from 'react-bootstrap/Row';
import axios from '../../config/axios';

const Billing = () => {
  const [data, setData] = useState([]);
  const [inputCode, setInputCode] = useState('');
  const [words, setWords] = useState([]);
  useEffect(() => {
    const handleKeyDown = (event) => {
      const { key } = event;

      if (isAlphanumeric(key)) {
        setInputCode((prevInput) => prevInput + key);
              } else {
        // if (inputCode.trim() !== '') {
        //   setWords((prevWords) => [...prevWords, inputCode]);
        //   setInputCode('');
        // }
        handleAddProduct();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    handleAddProduct();
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [inputCode]);

  const isAlphanumeric = (input) => /^[a-zA-Z0-9]$/.test(input);
  const handleQuantityChange = (index, change) => {
    const newData = [...data];
    newData[index].quantity += change;
    if (newData[index].quantity < 1) {
      newData.splice(index, 1);
    }
    setData(newData);
  };
    const getProductByCode = async (code) => {
      try {
        const response = await axios.get(`pos/get_pos_store/PANVEL1`);
        const products = response.data.products;
        const product = products.find((p) => p.productBarcode === code);
    
        if (product) {
          return {
            barcode: product.productBarcode,
            productName: product.productName,
            offer: product.productOffer,
            totalPrice: product.sellingPrice, 
          };
        } else {
          console.log(`Product not found for code: ${code}`);
          return null;
        }
      } catch (error) {
        console.error('Error fetching products:', error);
        return null;
      }
    };
  const handleAddProduct = async () => {
    const product = await getProductByCode(inputCode);
    if (product) {
      console.log('Product:', product);
      console.log('DAATA:', data);

      const existingProductIndex = data.findIndex((item) => item.barcode === product.barcode);
  
      if (existingProductIndex !== -1) {
        const newData = [...data];
        console.log(newData);
        console.log('Before update:', newData);
        newData[existingProductIndex].quantity ++;
        console.log('After update:', newData);
        setData(newData);
        console.log(newData);
      } else {
        const newData = [...data, { ...product, quantity: 1 }];
        setData(newData);
      }
  
      setInputCode('');
    } else {
      console.log(`Product not found for code: ${inputCode}`);
    }
  };

  const calculateTotalPrice = (item) => {
    if (item.offer === 'NOPR') {
      return item.quantity * item.totalPrice; // No discount
    } else if (item.offer.startsWith('F')) {
      const discountPercentage = parseInt(item.offer.substring(1), 10);
      const discountedPrice = item.totalPrice * (1 - discountPercentage / 100);
      return item.quantity * discountedPrice;
    } 
    
    // else if (item.offer.startsWith('B')) {
    //   const [, buyCount, getCount] = item.offer.match(/B(\d+)G(\d+)/) || [];
    //   if (buyCount && getCount) {
    //     const totalItemCount = parseInt(buyCount, 10) + parseInt(getCount, 10);
    //     const setsOfOffer = Math.floor(item.quantity / totalItemCount);
    //     const remainingItems = item.quantity % totalItemCount;
  
    //     const fullPriceItemCount = setsOfOffer * parseInt(buyCount, 10);
    //     const discountedItemCount = Math.min(remainingItems, parseInt(buyCount, 10));
    //     const discountedPrice = item.totalPrice * (1 - (fullPriceItemCount * item.totalPrice) / (item.quantity * item.totalPrice));
  
    //     return discountedItemCount * discountedPrice + (remainingItems - discountedItemCount) * item.totalPrice;
    //   }
    // }
  };


  return (
    <div className='body'>
      <div className='billing-tick-row'>
        <div className='head-title'>
          <div className='head-tile1'>Billing</div>
          <input
            type='text'
            placeholder='Enter alphanumeric code'
            value={inputCode}
          />
          <div className='head-tile2'>Ticket #0000001</div>
        </div>
        <div className='table-billing'>
          <table>
            <thead>
              <tr className="title-row">
                <th className="d-flex align-items-start"><span className='span-th'>Barcode No.</span></th>
                <th className=""><span className='span-th'>Product Name</span></th>
                <th className=""><span className='span-th'>Qtty</span>
                </th><th className=""><span className='span-th'>Rate</span></th>
                <th className=""><span className='span-th'>Offer</span></th>
                <th className="d-flex justify-content-end"><span className='span-th'>Total Price</span></th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={index}>
                  <td>{item.barcode}</td>
                  <td>{item.productName}</td>
                  <td>
                    <div className="quantity-container">
                      <button className='button-quantity' onClick={() => handleQuantityChange(index, -1)}>-</button>
                      <span>{item.quantity}</span>
                      <button className='button-quantityPlus' onClick={() => handleQuantityChange(index, 1)}>+</button>
                    </div>
                  </td>
                  <td>{item.totalPrice}</td>
                  <td>{item.offer}</td>
                  <td>{calculateTotalPrice(item)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Row className='button-row'>
        <div className=' btn bg-danger billing-button' style={{ marginBottom: '10vh' }}>Cancel</div>
        <div className='btn bg-success billing-button' style={{ marginBottom: '10vh' }}>Cash</div>
        <div className='btn bg-success billing-button' style={{ marginBottom: '4vh' }}>GPay</div>
        <div className='btn bg-success billing-button'>Split</div>
      </Row>
    </div>
  );
};

export default Billing;