import { useLoaderData } from "react-router-dom"
import {getCustomers} from '../data/customers'
import Customer from "../components/Customer"

export function loader() {
  const customers = getCustomers()

  return customers
}

function Index() {

  const customers = useLoaderData()

  return (
    <>
      <h1 className="font-black text-4xl text-blue-900 ml-7">Customers</h1>
      <p className="mt-3 ml-7">Manage your customers</p>

      {customers.length ? (
        <table className="w-full bg-white shadow mt-5 table-auto ml-7 mr-7">
          <thead className="bg-blue-800 text-white">
            <tr>
              <th className="p-2">Customer</th>
              <th className="p-2">Contact</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {customers.map(customer => (
              <Customer customer={customer} key={customer.id}/>
            ))}
          </tbody>

        </table>
      ) : (
        <p className="text-center mt-10">You don't have customers</p>
      )}
    </>
  )
}

export default Index