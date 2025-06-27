import { Link } from 'react-router-dom'
import react from '../assets/react.svg'
function SingleProduct({ product }) {
    return (
        <>
        <Link
        to="/view-product"
        state={product}
        >
            <div className='card my-2 mx-2 h-20 cursor-pointer card-xs shadow-sm '>
               <div className='flex flex-row justify-center'>
                <figure className='w-10 mx-1 my-1'>
                        <img
                            src={react}
                            alt="Shoes" />
                    </figure>
                <div className='card-body'>
                    <h1 className='card-title text-xl'>{product.title}</h1>
                    <h4 className='text-1'>{product.hookLine}</h4>
                </div>
                <div className='flex flex-col items-center mx-2'>
                   <h1> ⬆️</h1>
                {product.upvotes}
                </div>
                </div>
                
            </div>
            </Link>
        </>
    )
}

export default SingleProduct