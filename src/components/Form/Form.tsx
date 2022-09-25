import React from "react"

import axios from "axios"

import { Button } from "@lib/Button/Button"

import s from "./Form.module.scss"

interface IForm {
   name: string,
   email: string,
   message: string
}

const initialState: IForm = {
   name: "",
   email: "",
   message: ""
}

export const Form: React.FC = (): JSX.Element => {
   
   const ref = React.useRef<HTMLButtonElement>(null)

   const [form, setForm] = React.useState<IForm>(initialState)
   const [loading, setLoading] = React.useState<boolean>(false)
   const [error, setError] = React.useState<string>("")
   const [success, setSuccess] = React.useState<string>("")

   const handleInputChange = (event: React.SyntheticEvent): void => {
      const target = event.target as HTMLInputElement
      const {
         name,
         value
      } = target

      setForm({
         ...form,
         [name]: value
      })
   }

   const handleFormSubmit = async (event: React.SyntheticEvent): Promise<void> => {
      event.preventDefault()
      setLoading(true)

      await axios.post("api/contact", form)

         .then(res => {
            setLoading(false)
            setError("")
            if (res.status === 200) {
               setSuccess("Email sent successfully")

               setTimeout(() => {
                  setForm(initialState)
                  setSuccess("")
               }, 2500)

            } else {
               setError("Unexpected response")
            }

         })

         .catch(err => {
            setError(err.response.message)
         })

      ref.current && ref.current.blur()
   }
   
   return (
      <form className={s.form} data-aos="fade-down" onSubmit={handleFormSubmit}>
         <input required name="name" placeholder="Name"
                type="text" value={form.name}
                onChange={handleInputChange}/>
         <input required name="email" placeholder="Email address"
                type="email" value={form.email}
                onChange={handleInputChange}/>
         <textarea required name="message" placeholder="Write your message here"
                   rows={3} value={form.message}
                   onChange={handleInputChange}></textarea>
         <Button ref={ref} ariaLabel="email-us" error={error}
                 loading={loading} success={success}
                 variant="primary">
            Send us an email
         </Button>
      </form>
   )
}