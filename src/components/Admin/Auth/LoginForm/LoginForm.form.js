import * as Yup from "yup"

export function initialValues() {
    return {
        email: "",
        password: "",
    }
}

export function validatioSchema() {
    return Yup.object({
        email: Yup.string().email("El email no es valido").required("Campo obligatorio"),
        password: Yup.string().required("Campo obligatorio"),
    })
}