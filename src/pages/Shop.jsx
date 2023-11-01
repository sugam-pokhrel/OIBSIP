import{useDispatch,useSelector} from 'react-redux'
import React from 'react'
import Breadcumbs from '../components/Breadcrumb'
import CustomPizzaModal from '../components/createOwn'
import Products from "../components/Product"
import DiscountProduct from '../components/DiscountProduct'
import { ToastContainer, toast } from 'react-toastify';
const Shop = () => {

  const [isModalOpen, setIsModalOpen] = React.useState(false);
  let [product,setProduct]=React.useState([])
  React.useEffect(()=>{
    fetch('http://localhost:5000/pizza1').then((res)=>{
      res.json().then((result)=>{
        setProduct(result)
      })
    })
  },[])
 

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const handlePizzaOrder = (orderData) => {
    console.log('Custom Pizza Order:', orderData);
  };

  const user = useSelector((state) => state.user);



if(!user){
  window.location.href="/Login"
}


  return (
    <>
   {/* <Breadcumbs label="Shop" url="shop"></Breadcumbs> */}
  <div className='shopSection grid grid-cols-4 m-10 gap-10'>
   

    {product.map((item,id)=>{
      return(
       
        <Products key={item._id} {...item}></Products>
      )
    })}
     <CustomPizzaModal />
  
     </div> 

     <ToastContainer />
    
     
    </>
  )
}

export default Shop