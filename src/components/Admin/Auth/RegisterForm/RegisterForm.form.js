import * as Yup from "yup"

export function initialValues() {
    return {
        email: "",
        password: "",
        repeatPassword: "",
        conditionsAccepted: false
    }
}

export function validatioSchema() {
    return Yup.object({
        email: Yup.string().email("El email no es valido").required("Campo obligatorio"),
        password: Yup.string().required("Campo obligatorio"),
        repeatPassword: Yup.string().required("Campo obligatorio").oneOf([Yup.ref("password")], "Las contraseñas tienen que ser iguales"),
        conditionsAccepted: Yup.boolean().isTrue(true)
    })
}