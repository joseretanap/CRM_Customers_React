import { getCustomer, updateCustomer } from "../data/customers"
import { Form, useNavigate, useLoaderData, useActionData, redirect } from "react-router-dom"
import FormNewCustomer from "../components/FormNewCustomer"
import Error from "../components/Error"

export async function loader({ params }) {
  const customer = await getCustomer(params.customerId)
  if (Object.values(customer).length === 0) {
    throw new Rsponse("", {
      status: 404,
      statusText: "No results"
    })
  }
  return customer

}

export async function action({ request, params }) {
  const formData = await request.formData()
  const data = Object.fromEntries(formData)
  const email = formData.get('email')

  //Validation
  const errors = []

  if (Object.values(data).includes("")) {
    errors.push("Complete the information!")
  }

  let regex = new RegExp("([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\"\(\[\]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\[[\t -Z^-~]*])");
  if (!regex.test(email)) {
    errors.push("Use a correct email")
  }

  //Return data if we have errors
  if (Object.keys(errors).length) {
    return errors
  }

  //Update customer
  await updateCustomer(params.customerId, data)
  return redirect("/")
}

const EditCustomer = () => {

  const navigate = useNavigate()
  const customer = useLoaderData()
  const errors = useActionData()

  return (
    <>
      <h1 className="font-black text-4xl text-blue-900">Edit customer</h1>
      <p className="mt-3">Complete the information to edit a customer</p>

      <div className="flex justify-end">
        <button
          className="bg-blue-800 text-white px-3 py-1 font-bold uppercase"
          onClick={() => navigate(-1)}
        >
          Volver
        </button>
      </div>


      <div className='bg-white shadow rounded-md md:w-3/4 mx-auto px-5 py-10 mt-20'>

        {errors?.length && errors.map((error, i) => <Error key={i}>{error}</Error>)}

        <Form method='POST' noValidate>

          <FormNewCustomer customer={customer} />

          <input
            type="submit"
            className='mt-5 w-full bg-blue-800 p-3 uppercase font-bold text-white text-lg'
            value="SAVE"
          />
        </Form>
      </div>
    </>
  )
}

export default EditCustomer