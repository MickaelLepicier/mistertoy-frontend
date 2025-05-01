import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import { toyService } from '../services/toy.service.remote'
import { saveToy } from '../store/toy/toyActions'

export function ToyEdit() {
  const [initialValues, setInitialValues] = useState(toyService.getEmptyToy())
  const [labels, setLabels] = useState([])
  const { toyId } = useParams()
  const navigate = useNavigate()

  const ToySchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    price: Yup.number().required('Price is required').min(1, 'Must be at least 1'),
    labels: Yup.array().of(Yup.string()),
    inStock: Yup.boolean()
  })

  useEffect(() => {
    loadToy()
    loadToyLabels()
  }, [])

  function loadToy() {
    if (!toyId) return
    toyService
      .getById(toyId)
      .then(setInitialValues)
      .catch((err) => {
        console.error('Error loading toy:', err)
        showErrorMsg('Toy not found')
        navigate('/toy')
      })
  }

  function loadToyLabels() {
    toyService
      .getToyLabels()
      .then(setLabels)
      .catch((err) => {
        console.error('Error loading labels:', err)
        showErrorMsg('Labels not found')
        navigate('/toy')
      })
  }

  function onSubmit(values) {
    saveToy(values)
      .then((savedToy) => {
        showSuccessMsg(`Toy ${savedToy._id} saved successfully`)
        navigate('/toy')
      })
      .catch(() => {
        showErrorMsg('Cannot save toy')
      })
  }

  return (
    <section className="toy-edit">
      <h2>{toyId ? 'Edit' : 'Add'} Toy</h2>
      <Formik initialValues={initialValues} enableReinitialize validationSchema={ToySchema} onSubmit={onSubmit}>
        {({ values, handleChange }) => (
          <Form>
            <div className="form-group">
              <label htmlFor="name">Name:</label>
              <Field type="text" id="name" name="name" />
              <ErrorMessage name="name" component="div" className="error" />
            </div>

            <div className="form-group">
              <label htmlFor="price">Price:</label>
              <Field type="number" id="price" name="price" />
              <ErrorMessage name="price" component="div" className="error" />
            </div>

            <div className="form-group">
              <label htmlFor="labels">Labels:</label>
              <Field as="select" id="labels" name="labels" multiple>
                {labels.map((label) => (
                  <option key={label} value={label}>
                    {label}
                  </option>
                ))}
              </Field>
              <ErrorMessage name="labels" component="div" className="error" />
            </div>

            {toyId && (
              <div className="form-group">
                <label>
                  <Field type="checkbox" name="inStock" />
                  In Stock
                </label>
              </div>
            )}

            <button type="submit">{toyId ? 'Update Toy' : 'Add Toy'}</button>
          </Form>
        )}
      </Formik>
    </section>
  )
}



// Without Formik and Yup
/*

import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import { toyService } from '../services/toy.service.remote'
import { saveToy } from '../store/toy/toyActions'

export function ToyEdit() {
  const [toyToEdit, setToyToEdit] = useState(toyService.getEmptyToy())
  const [labels, setLabels] = useState([])

  const { toyId } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    loadToy()
    loadToyLabels()
  }, [])

  function loadToy() {
    if (!toyId) return
    toyService
      .getById(toyId)
      .then(setToyToEdit)
      .catch((err) => {
        console.log('Had issues in toy edit:', err)
        navigate('/toy')
        showErrorMsg('Toy not found!')
      })
  }

  function loadToyLabels() {
    toyService
      .getToyLabels()
      .then(setLabels)
      .catch((err) => {
        console.log('Had issues in toy edit:', err)
        navigate('/toy')
        showErrorMsg('Toy not found!')
      })
  }

  function handleChange({ target }) {
    const { name, value, type, checked } = target

    let fieldValue = value
    if (type === 'checkbox') {
      fieldValue = checked
    } else if (type === 'number') {
      fieldValue = +value
    } else if (type === 'select-multiple') {
      // each click it adds
      // const isAlreadySelected = toyToEdit.labels.includes(value)
      // fieldValue = isAlreadySelected
      //   ? toyToEdit.labels.filter((label) => label !== value)
      //   : [...toyToEdit.labels, value]
      fieldValue = [...target.selectedOptions].map((option) => option.value)
    }

    console.log('fieldValue: ', fieldValue)
    setToyToEdit((prevToy) => ({
      ...prevToy,
      [name]: fieldValue
    }))
  }

  function onSaveToy(ev) {
    ev.preventDefault()
    saveToy(toyToEdit)
      .then((savedToy) => {
        showSuccessMsg(`Toy ${savedToy._id} saved successfully`)
        navigate('/toy')
      })
      .catch((err) => {
        showErrorMsg('Cannot save toy')
      })
  }

  const priceValidations = {
    min: '1',
    required: true
  }

  return (
    <section className="toy-edit">
      <h2>{toyToEdit._id ? 'Edit' : 'Add'} Toy</h2>
      <form onSubmit={onSaveToy}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={toyToEdit.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="price">Price:</label>
          <input
            type="number"
            id="price"
            name="price"
            value={toyToEdit.price || ''}
            {...priceValidations}
            // min="1"
            // required
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="labels">Labels:</label>
          <select
            id="labels"
            name="labels"
            multiple
            value={toyToEdit.labels}
            onChange={handleChange}
          >
            {labels.map((label) => (
              <option key={label} value={label}>
                {label}
              </option>
            ))}
          </select>
        </div>

        {toyToEdit._id && (
          <div className="form-group">
            <label>
              <input
                type="checkbox"
                name="inStock"
                checked={toyToEdit.inStock}
                onChange={handleChange}
              />
              In Stock
            </label>
          </div>
        )}

        <button>{toyToEdit._id ? 'Update Toy' : 'Add'}</button>
      </form>
    </section>
  )
}

*/