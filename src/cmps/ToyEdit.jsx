import React from 'react'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import { getEmptyToy, toyService } from '../services/toy'
import { saveToy } from '../store/toy/toy.actions'
import { utilService } from '../services/util.service'
import { useTranslation } from 'react-i18next'

import {
  Button,
  TextField,
  useTheme,
  Box,
  OutlinedInput,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Chip
} from '@mui/material'

export function ToyEdit() {
  const { t } = useTranslation()

  const [initialValues, setInitialValues] = useState(getEmptyToy())
  const [labels, setLabels] = useState([])
  const { toyId } = useParams()
  const navigate = useNavigate()

  const ToySchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    price: Yup.number()
      .required('Price is required')
      .min(1, 'Must be at least 1'),
    labels: Yup.array().of(Yup.string()),
    inStock: Yup.boolean()
  })

  useEffect(() => {
    loadToy()
    loadToyLabels()
  }, [])

  async function loadToy() {
    if (!toyId) return

    try {
      const toy = await toyService.getById(toyId)
      setInitialValues(toy)
    } catch (err) {
      console.error('Error loading toy:', err)
      showErrorMsg('Toy not found')
      navigate('/toy')
    }
  }

  async function loadToyLabels() {
    try {
      const labels = await toyService.getToyLabels()
      setLabels(labels)
    } catch (err) {
      console.error('Error loading labels:', err)
      showErrorMsg('Labels not found')
      navigate('/toy')
    }
  }

  async function onSubmit(values) {
    try {
      const savedToy = await saveToy(values)
      showSuccessMsg(`Toy ${savedToy._id} saved successfully`)
      navigate('/toy')
    } catch (err) {
      showErrorMsg('Cannot save toy')
    }
  }

  function oninput(props) {
    const label = utilService.firstLetterUpperCase(props.name)
    return (
      <TextField
        {...props}
        id="standard-basic"
        label={label}
        variant="standard"
      />
    )
  }

  function MultipleSelectCheckmarks(props) {
    const ITEM_HEIGHT = 48
    const ITEM_PADDING_TOP = 8
    const MenuProps = {
      PaperProps: {
        style: {
          maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
          width: 250
        }
      }
    }

    const theme = useTheme()
    const [personName, setPersonName] = useState([])

    const handleChange = (event) => {
      const {
        target: { value }
      } = event
      setPersonName(typeof value === 'string' ? value.split(',') : value)
    }

    return (
      <div>
        <FormControl sx={{ m: 1, width: 300 }}>
          <InputLabel id="demo-multiple-chip-label">Chip</InputLabel>
          <Select
            labelId="demo-multiple-chip-label"
            id="demo-multiple-chip"
            multiple
            value={personName}
            onChange={handleChange}
            input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
            renderValue={(selected) => (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                {selected.map((value) => (
                  <Chip key={value} label={value} />
                ))}
              </Box>
            )}
            MenuProps={MenuProps}
            {...props}
          >
            {labels.map((name) => (
              <MenuItem
                key={name}
                value={name}
                style={getStyles(name, personName, theme)}
              >
                {name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
    )
  }

  function getStyles(name, personName, theme) {
    return {
      fontWeight: personName.includes(name)
        ? theme.typography.fontWeightMedium
        : theme.typography.fontWeightRegular
    }
  }

  return (
    <section className="toy-edit">
      <h2>{toyId ? 'Update' : 'Add'} Toy</h2>
      <Formik
        initialValues={initialValues}
        enableReinitialize
        validationSchema={ToySchema}
        onSubmit={onSubmit}
      >
        {({ values, handleChange }) => (
          <Form>
            <div className="form-group">
              <Field as={oninput} type="text" id="name" name="name" />
              <ErrorMessage name="name" component="div" className="error" />
            </div>

            <div className="form-group">
              <Field as={oninput} type="number" id="price" name="price" />
              <ErrorMessage name="price" component="div" className="error" />
            </div>

            <div className="form-group">
              <label htmlFor="labels">Labels:</label>
              <Field
                as={MultipleSelectCheckmarks}
                id="labels"
                name="labels"
                multiple
              >
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
                  {t('in_stock')}
                </label>
              </div>
            )}

            <Button variant="contained" type="submit">
              {toyId ? t('update_toy') : t('add_toy')}
            </Button>
          </Form>
        )}
      </Formik>
    </section>
  )
}
