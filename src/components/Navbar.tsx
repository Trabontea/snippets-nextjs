import Link from "next/link"
export default function Navbar() {
  return (<div>
    <nav className="p-3 bg-lime-600 shadow-lg">
      <ul className="flex item-center justify-center">
        <li className="ml-3 text-orange-100">
          <Link href="/" className="hover:text-rose-500 transition ease-in-out delay-150">Home</Link>
        </li>
        <li className="ml-3 text-orange-100 ">
        <Link href="/snippets/new" className="hover:text-rose-500 transition ease-in-out delay-350">Add snippet</Link>
        </li>
      </ul>
    </nav>
  </div>)
}