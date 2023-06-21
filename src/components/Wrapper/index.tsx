import Header from "../Header"

export default function Wrapper({ children }: any) {
  return (
    <div className="flex flex-col w-screen h-screen bg-gray-100">
      <Header />
      {children}
    </div>
  )
}
