import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'

const validationSchema = Yup.object({
  descripcion: Yup.string().trim().min(3, 'Mínimo 3 caracteres').required('Requerido'),
  categoria: Yup.string().required('Requerido'),
  tipo: Yup.mixed().oneOf(['ingreso', 'gasto'], 'Selecciona ingreso o gasto').required('Requerido'),
  monto: Yup.number().typeError('Debe ser número').positive('Debe ser positivo').required('Requerido'),
  fecha: Yup.date()
    .max(new Date(), 'La fecha no puede ser futura')
    .required('Requerido')
})

const defaultValues = {
  descripcion: '',
  categoria: '',
  tipo: '',
  monto: '',
  fecha: ''
}

export default function MovimientoForm({ initialValues, onSubmit, onCancel }) {
  const init = initialValues || defaultValues
  return (
    <Formik
      initialValues={init}
      validationSchema={validationSchema}
      onSubmit={(values) => onSubmit({ ...values, monto: Number(values.monto) })}
      enableReinitialize
    >
      {() => (
        <Form className="form">
          <label>
            Descripción
            <Field name="descripcion" placeholder="Ej: Supermercado" />
            <ErrorMessage name="descripcion" component="small" className="error" />
          </label>

          <label>
            Categoría
            <Field as="select" name="categoria">
              <option value="">Seleccionar</option>
              <option>Alimentación</option>
              <option>Transporte</option>
              <option>Ocio</option>
              <option>Sueldo</option>
              <option>Servicios</option>
            </Field>
            <ErrorMessage name="categoria" component="small" className="error" />
          </label>

          <label>
            Tipo
            <Field as="select" name="tipo">
              <option value="">Seleccionar</option>
              <option value="ingreso">Ingreso</option>
              <option value="gasto">Gasto</option>
            </Field>
            <ErrorMessage name="tipo" component="small" className="error" />
          </label>

          <label>
            Monto
            <Field name="monto" type="number" />
            <ErrorMessage name="monto" component="small" className="error" />
          </label>

          <label>
            Fecha
            <Field name="fecha" type="date" />
            <ErrorMessage name="fecha" component="small" className="error" />
          </label>

          <div className="formActions">
            <button type="submit" className="btn">Guardar</button>
            <button type="button" className="btn" onClick={onCancel}>Cancelar</button>
          </div>
        </Form>
      )}
    </Formik>
  )
}
