import { useNavigate, Form, useActionData, redirect } from "react-router-dom"
import FormNewCustomer from "../components/FormNewCustomer"
import Error from "../components/Error"
import { addCustomer } from "../data/customers"

export async function action({ request }) {
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

  await addCustomer(data)
  return redirect("/")
}

const NewCustomer = () => {

  const errors = useActionData()
  const navigate = useNavigate()

  return (
    <>
      <h1 className="font-black text-4xl text-blue-900">New Customer</h1>
      <p className="mt-3">Complete the information to add a new customer</p>

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
          
          <FormNewCustomer />

          <input
            type="submit"
            className='mt-5 w-full bg-blue-800 p-3 uppercase font-bold text-white text-lg'
            value="Add new customer"
          />
        </Form>
      </div>
    </>
  )
}

export default NewCustomer