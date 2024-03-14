

interface PrdProps {

    name: string;


}

export default function Cart({name}:PrdProps) {
  return (

   
    <div id="item2" className="flex flex-col gap-6 border py-4 px-4 rounded-2xl shadow-2xl bg-white item">

    <div id="img" className="border shadow" >
          <img src="photos/carrot.jpg" />
    </div>

    <div id="item-name" className="flex flex-col">
          <p className="text-gray-500">Fresho</p>
          <p >{name}</p>
    </div>

    <div className="flex flex-col gap-4">
    <div id="offer">
          <p className="text-red-500 bg-red-100 border border-red-500">Get it for &#8377;30.31!</p>
    </div>

    <div id="buy" className="flex flex-row gap-2">
          <img src="photos/save.jpg" className="save border border-black" title="Save for Later" /> <button className="bg-white border border-red-500 text-red-500 px-16 py-1 rounded-xl hover:bg-red-500 hover:text-white btn" >Add to Cart</button>
    </div>
  
    </div>

</div>



  )
}
