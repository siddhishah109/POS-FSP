// import React ,{useState} from 'react'
// import './Billing.css'
// import Row from 'react-bootstrap/Row';



// const Billing = () => {
//   const [data, setData] = useState([
//     { barcode: 13442, productName: 'Mark', quantity: 1, totalPrice: 55 },
//     { barcode: 2432, productName: 'Jacob', quantity: 1, totalPrice: 2 },
//     { barcode: 3563, productName: 'Larry the Bird', quantity: 1, totalPrice: 5 }
//   ]);

//   const handleQuantityChange = (index, change) => {
//     const newData = [...data];
//     newData[index].quantity += change;
//     if (newData[index].quantity < 1) {
//       newData[index].quantity = 1;
//     }
//     setData(newData);
//   };


//   return (
//     <div className='body'>
//   <div  className='billing-tick-row'>
//        <div className='head-title'>
//        <div className='head-tile1'>Billing</div>
//        <div className='head-tile2'>
//         Ticket #0000001
//        </div>
//        </div>
//        <div className='table-billing'>
//         <table>
//         <thead>
//         <tr className="title-row">
//           <th className="d-flex align-items-start"><span className='span-th'>Barcode No.</span></th>
//           <th className=""><span className='span-th'>Product Name</span></th>
//           <th className=""><span className='span-th'>Qtty</span></th>
//           <th className="d-flex justify-content-end"><span className='span-th'>Total Price</span></th>
//         </tr>
//       </thead>
//       <tbody>
//       {data.map((item, index) => (
//                 <tr key={index}>
//                   <td>{item.barcode}</td>
//                   <td>{item.productName}</td>
//                   <td>
//                   <div className="quantity-container">
//                       <button className='button-quantity' onClick={() => handleQuantityChange(index, -1)}>-</button>
//                       <span>{item.quantity}</span>
//                       <button  className='button-quantityPlus' onClick={() => handleQuantityChange(index, 1)}>+</button>
//                     </div>
//                   </td>
//                   <td>{item.totalPrice}</td>
//                 </tr>
//               ))}
  
        
//       </tbody>
//         </table>
//        </div>
//    </div>
//    <Row className='button-row'>
//   <div className=' btn bg-danger billing-button' style={{marginBottom:'10vh'}}>Cancel</div>
//   <div className='btn bg-success billing-button'  style={{marginBottom:'10vh'}}>Cash</div>
//   <div className='btn bg-success billing-button' style={{marginBottom:'4vh'}}>GPay</div>
//   <div className='btn bg-success billing-button'>Split</div>
//    </Row>
//     </div>
//   )
// }

// export default Billing

import React, { useState } from 'react';
import './Billing.css';
import Row from 'react-bootstrap/Row';

const Billing = () => {
  const [data, setData] = useState([
  ]);

  const [inputCode, setInputCode] = useState('');

  const handleQuantityChange = (index, change) => {
    const newData = [...data];
    newData[index].quantity += change;
    if (newData[index].quantity < 1) {
      newData.splice(index, 1);
    }
    setData(newData);
  };

  const handleCodeInput = (event) => {
    setInputCode(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.keyCode === 13) {
      handleAddProduct();
    }
  };

  const handleAddProduct = () => {
    const product = getProductByCode(inputCode);
    if (product) {
      const newData = [...data, { ...product, quantity: 1 }];
      setData(newData);
      setInputCode(''); 
    } else {
      console.log(`Product not found for code: ${inputCode}`);
    }
  };

  const getProductByCode = (code) => {
    const products = {
      'A123': { barcode: 'A123', productName: 'Product X', totalPrice: 20 },
      'B456': { barcode: 'B456', productName: 'Product Y', totalPrice: 30 },
      'C789': { barcode: 'C789', productName: 'Product Z', totalPrice: 40 },
      'D101': { barcode: 'D101', productName: 'Product W', totalPrice: 25 },
      'E202': { barcode: 'E202', productName: 'Product V', totalPrice: 35 },
      'F303': { barcode: 'F303', productName: 'Product U', totalPrice: 45 },

    };

    return products[code];
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
            onChange={handleCodeInput}
            onKeyDown={handleKeyDown}
          />
          <div className='head-tile2'>
            Ticket #0000001
          </div>
        </div>
        <div className='table-billing'>
          <table>
            <thead>
              <tr className="title-row">
                <th className="d-flex align-items-start"><span className='span-th'>Barcode No.</span></th>
                <th className=""><span className='span-th'>Product Name</span></th>
                <th className=""><span className='span-th'>Qtty</span></th>
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
}

export default Billing;