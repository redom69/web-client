import React, { useCallback } from 'react';
import { Form, Image, Portal } from 'semantic-ui-react';
import { useFormik } from 'formik';
import { useDropzone } from 'react-dropzone';
import { Editor } from '@tinymce/tinymce-react';

import './PostForm.scss';
import { Post } from '../../../../api';
import { ENV } from '../../../../utils';
import { useAuth } from '../../../../hooks';
import { initialValues, validationSchema } from './PostForm.form';

const postController = new Post();

export function PostForm(props) {
    const { post, onClose, onReload } = props;
    const { accessToken } = useAuth();

    const formik = useFormik({
        initialValues: initialValues(post),
        validationSchema: validationSchema(),
        validateOnChange: false,
        onSubmit: async (formValue) => {
            try {
                if (post) {
                    await postController.updatePost(accessToken, post._id, formValue);
                } else {
                    await postController.createPost(accessToken, formValue);
                }
                onReload();
                onClose();
            } catch (error) {
                throw error;
            }
        }
    })

    const onDrop = useCallback((acceptedFiles) => {
        const file = acceptedFiles[0];
        formik.setFieldValue("miniature", URL.createObjectURL(file));
        formik.setFieldValue("file", file);
    })

    const { getRootProps, getInputProps } = useDropzone({
        accept: {
            'image/*': ['.jpeg', '.jpg', '.png'],
        },
        onDrop
    })

    const getMiniature = () => {
        if (formik.values.file) {
            return formik.values.miniature;
        } else if (formik.values.miniature) {
            return `${ENV.BASE_PATH}/${formik.values.miniature}`;
        }
        return null;
    };

    return (
        <Form className='post-form' onSubmit={formik.handleSubmit}>
            <Form.Group widths='equal' >
                <Form.Input
                    name='title'
                    placeholder='Titulo del post'
                    onChange={formik.handleChange}
                    value={formik.values.title}
                    error={formik.errors.title}
                />
                <Form.Input
                    name='path'
                    placeholder='Path del post'
                    onChange={formik.handleChange}
                    value={formik.values.path}
                    error={formik.errors.path}
                />
            </Form.Group>

            <Editor
                init={{
                    height: 500,
                    menubar: false,
                    plugins: ["advlist", "autolink", "lists", "link", "image", "charmap", "print", "preview", "anchor", "searchreplace", "visualblocks", "code", "fullscreen", "insertdatetime", "media", "table", "paste", "code", "help", "wordcount"],
                    toolbar: 'undo redo | formatselect | ' +
                        'bold italic backcolor | alignleft aligncenter ' +
                        'alignright alignjustify | bullist numlist outdent indent | ' +
                        'removeformat | help',
                    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                }}
                initialValue={formik.values.content}
                onBlur={(e) => formik.setFieldValue('content', e.target.getContent())}
            />

            <div className='post-form__miniature'{...getRootProps()}>
                <input {...getInputProps()} />
                {getMiniature() ? (
                    <Image size='small' src={getMiniature()} />
                ) : (
                    <div>
                        <span>Arrastra tu miniatura</span>
                    </div>
                )}
            </div>
            <Form.Button type='submit' primary fluid loading={formik.isSubmitting}>
                {post ? 'Actualizar post' : 'Crear post'}
            </Form.Button>
        </Form>

    )
}
