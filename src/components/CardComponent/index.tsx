import Image from "next/image"
import { useState } from "react"

interface CardProps {
  name: string
  type: string
  permit: number
  assets: string
}

export default function CardComponent({
  data,
  addPermit,
  removePermit,
}: {
  data: CardProps
  addPermit: (permit: number) => void
  removePermit: (permit: number) => void
}) {
  const [isSelected, setIsSelected] = useState(false)
  const updateSelect = () => {
    if (!isSelected) addPermit(data.permit)
    else removePermit(data.permit)
    setIsSelected(!isSelected)
  }
  const handleClick = () => {
    updateSelect()
  }
  return (
    <div
      className={`flex flex-col bg-white m-3 ease-in duration-300 shadow-[0_0_30px_-10px_rgba(0,0,0,0.1)] rounded-lg py-3 px-5 hover:shadow-[0_0_30px_-5px_rgba(0,0,0,0.2)] border cursor-pointer ${
        isSelected && "border-sky-500"
      }`}
      onClick={handleClick}
    >
      <div className="flex justify-between items-center">
        <h5 className="py-3 text-md tracking-wide tracking-tight text-gray-500">{data.name}</h5>
        {/* <div className="mb-[0.125rem] block min-h-[1.25rem] pl-[1.25rem] bg-gray-200 rounded relative">
          {isSelected && (
            <div className="checkbox before:absolute before:h-[0.5rem] before:w-[0.5rem] before:bg-transparent before:border-t-2 before:rotate-45 before:border-black before:content-[''] before:top-[11px] before:left-0 after:absolute after:top-0 after:z-[1] after:left-[2.25px] after:border-b-2 after:border-black after:rotate-[-45deg] after: after:w-[0.85rem] after:h-[0.85rem] after:content-['']"></div>
          )}
        </div> */}
        <div className="mb-[0.125rem] block min-h-[1.5rem] pl-[1.5rem]">
          <input
            className="checked:bg-sky-500 relative float-left -ml-[1.5rem] mr-[6px] mt-[0.15rem] h-[1.125rem] w-[1.125rem] appearance-none rounded-[0.25rem] border-[0.125rem] border-solid border-neutral-300 outline-none before:pointer-events-none before:absolute before:h-[0.875rem] before:w-[0.875rem] before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] checked:border-primary checked:bg-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:-mt-px checked:after:ml-[0.25rem] checked:after:block checked:after:h-[0.8125rem] checked:after:w-[0.375rem] checked:after:rotate-45 checked:after:border-[0.125rem] checked:after:border-l-0 checked:after:border-t-0 checked:after:border-solid checked:after:border-transparent checked:after:bg-red checked:after:content-[''] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] shadow-none transition-[border-color_0.2s] before:scale-100 before:opacity-[0.12] before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] before:transition-[box-shadow_0.2s,transform_0.2s] after:absolute after:z-[1] after:block after:h-[0.875rem] after:w-[0.875rem] after:rounded-[0.125rem] after:content-[''] checked:before:scale-100 checked:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:before:transition-[box-shadow_0.2s,transform_0.2s] checked:after:-mt-px checked:after:ml-[0.25rem] checked:after:h-[0.8125rem] checked:after:w-[0.375rem] checked:after:rotate-45 checked:after:rounded-none checked:after:border-[0.125rem] checked:after:border-l-0 checked:after:border-t-0 checked:after:border-solid checked:after:border-white checked:after:bg-transparent"
            type="checkbox"
            id="checkboxCheckedNoLabel"
            value=""
            aria-label="..."
            checked={isSelected}
            onChange={updateSelect}
          />
        </div>
      </div>
      <Image className="rounded-lg" src={data.assets} alt="" width={300} height={200}></Image>
    </div>
  )
}
