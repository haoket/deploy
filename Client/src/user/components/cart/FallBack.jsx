import { BsFillCartXFill } from "react-icons/bs";

const CartFallback = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-2 p-3 rounded-[5px] text-[#c2c2c2] w-[20vw]  h-[10rem]">
      <BsFillCartXFill className="text-5xl" />
      <p>
        Chưa có sản phẩm nào trong giỏ hàng
      </p>
    </div>
  )
}

export default CartFallback