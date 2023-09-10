import { useNavigate, Form, redirect } from "react-router-dom"
import { deleteCustomer } from "../data/customers"

export async function action({ params }) {
    await deleteCustomer(params.customerId)
    return redirect("/")
}

const Customer = ({ customer }) => {

    const navigate = useNavigate()
    const { nombre, empresa, email, telefono, id } = customer

    return (
        <tr className="border-b space-y-2">
            <td className="p-6">
                <p className="text-2xl text-gray-800">{nombre}</p>
                <p>{empresa}</p>
            </td>

            <td className="pd-6">
                <p className="text-gray-600"><span className="text-gray-800 uppercase font-bold">Email: </span>{email}</p>
                <p className="text-gray-600"><span className="text-gray-800 uppercase font-bold">Phone: </span>{telefono}</p>
            </td>

            <td className="p-6 flex gap-3">
                <button className="text-blue-600 hover:text-blue-700 uppercase font-bold text-xs" onClick={() => navigate(`/customers/${id}/edit`)}>Edit</button>
                <Form method="POST" action={`/customers/${id}/delete`} onSubmit={e => {
                    if (!confirm("Do you want delete this user?")) {
                        e.preventDefault()
                    }
                }}>
                    <button type="submit" className="text-red-600 hover:text-blue-700 uppercase font-bold text-xs">Delete</button>
                </Form>
            </td>
        </tr>
    )
}

export default Customer