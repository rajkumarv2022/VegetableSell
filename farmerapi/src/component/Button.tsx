
interface ButtonProps {

    name:string;

}

export default function Button({name}:ButtonProps) {
  return (

    <button className='bg-green-500 px-8 py-2 text-white rounded-md sticky'>{name}</button>

  )
}
