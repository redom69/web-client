import React, { useState } from 'react'
import { Form } from 'semantic-ui-react'
import { useFormik } from 'formik'

import { initialValues, validatioSchema } from "./LoginForm.form"
import { Auth } from '../../../../api'
import { useAuth } from '../../../../hooks'
import "./LoginForm.scss"

const authController = new Auth();

export function LoginForm() {
    const { login } = useAuth()
    const [error, setError] = useState("")

    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: validatioSchema(),
        validateOnChange: false,
        onSubmit: async (formValue) => {
            try {
                setError("")
                const response = await authController.login(formValue)
                authController.setAccessToken(response.access)
                authController.setRefreshToken(response.refresh)
                login(response.access)
            } catch (error) {
                setError(error)
                console.error(error);
            }
        }
    })

    return (
        <Form onSubmit={formik.handleSubmit}>
            <Form.Input
                name="email"
                placeholder="Correo electronico"
                onChange={formik.handleChange}
                value={formik.values.email}
                error={formik.errors.email}
            />
            <Form.Input
                name="password"
                type='password'
                placeholder="Contraseña"
                onChange={formik.handleChange}
                value={formik.values.password}
                error={formik.errors.password}
            />
            <Form.Button type="submit" primary fluid loading={formik.isSubmitting}>
                Entrar
            </Form.Button>

            <p className='login-form__error'>{error.msg}</p>
        </Form>
    )
}
