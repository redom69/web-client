import React, { useCallback } from 'react'
import { Form, Image } from 'semantic-ui-react';
import { useFormik } from 'formik';
import { useDropzone } from 'react-dropzone';

import { ENV } from '../../../../utils';
import { User } from "../../../../api"
import { useAuth } from "../../../../hooks"
import { image } from "../../../../assets"
import { initialValues, validationSchema } from './UserForm.form';
import "./UserForm.scss"

const userController = new User();

export function UserForm(props) {
    const { close, onReload, user } = props;
    const { accessToken } = useAuth();

    const formik = useFormik({
        initialValues: initialValues(user),
        validationSchema: validationSchema(user),
        validateOnChange: false,
        onSubmit: async (formValue) => {
            try {
                if (!user) {
                    await userController.createUser(accessToken, formValue);
                } else {
                    await userController.updateUser(accessToken, user._id, formValue)
                }
                onReload();
                close();
            } catch (error) {
                throw error;
            }
        }
    })

    const onDrop = useCallback((acceptedFiles) => {
        const file = acceptedFiles[0];
        formik.setFieldValue("avatar", URL.createObjectURL(file));
        formik.setFieldValue("fileAvatar", file);
    })

    const { getRootProps, getInputProps } = useDropzone({
        accept: {
            'image/*': ['.jpeg', '.jpg', '.png'],
        },
        onDrop
    })

    const getAvatar = () => {
        if (formik.values.fileAvatar) {
            return formik.values.avatar
        } else if (formik.values.avatar) {
            return `${ENV.BASE_PATH}/${formik.values.avatar}`
        }
        return image.noAvatar
    }

    return (
        <Form className='user-form' onSubmit={formik.handleSubmit}>
            <div className='user-form__avatar'{...getRootProps()}>
                <input{...getInputProps()} />
                <Image avatar size='small' src={getAvatar()} />
            </div>
            <Form.Group widths="equal">
                <Form.Input
                    name="firstName"
                    placeholder="Nombre"
                    onChange={formik.handleChange}
                    value={formik.values.firstName}
                    error={formik.errors.firstName}
                />
                <Form.Input
                    name="lastName"
                    placeholder="Apellido"
                    onChange={formik.handleChange}
                    value={formik.values.lastName}
                    error={formik.errors.lastName}
                />
            </Form.Group>
            <Form.Group widths="equal">
                <Form.Input
                    name="email"
                    placeholder="Correo electronico"
                    onChange={formik.handleChange}
                    value={formik.values.email}
                    error={formik.errors.email}
                />
                <Form.Dropdown
                    placeholder='Selecciona un rol'
                    options={roleOptions}
                    selection
                    onChange={(_, data) => formik.setFieldValue("role", data.value)}
                    value={formik.values.role}
                    error={formik.errors.role}
                />
            </Form.Group>

            <Form.Input
                type='password'
                placeholder="Contraseña"
                name="password"
                onChange={formik.handleChange}
                value={formik.values.password}
                error={formik.errors.password}
            />
            <Form.Button type='submit' primary fluid loading={formik.isSubmitting}>
                {user ? "Actualizar usuario" : "Crear usuario"}
            </Form.Button>
        </Form>
    )
}

const roleOptions = [
    {
        key: "user",
        text: "Usuario",
        value: "user"
    },
    {
        key: "admin",
        text: "Administrador",
        value: "admin"
    }
]
