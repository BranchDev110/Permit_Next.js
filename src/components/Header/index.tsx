import { signOut } from "next-auth/react"
import Image from "next/image"

export default function Header() {
  return (
    <header className="flex justify-between h-20 py-6 px-10 bg-white shadow-sm">
      <div className="logo">
        <Image
          src={
            "https://uploads-ssl.webflow.com/6388a088c0a35a9c812b566a/6388a089c0a35a020e2b5680_logo.svg"
          }
          alt="logo"
          width={200}
          height={50}
        />
      </div>
      <div className="avatar cursor-pointer" onClick={() => signOut({ callbackUrl: "/" })}>
        Sign Out
      </div>
    </header>
  )
}
