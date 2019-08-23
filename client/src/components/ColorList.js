import React, { useState } from 'react'
// import axios from "axios";
import { axiosWithAuth } from '../utils/axiosWithAuth'

const initialColor = {
  color: '',
  code: { hex: '' }
}

const ColorList = ({ colors, updateColors }) => {
  // console.log(colors)
  const [editing, setEditing] = useState(false)
  const [colorToEdit, setColorToEdit] = useState(initialColor)
  const [colorToAdd, setColorToAdd] = useState(initialColor)
  const [addError, setAddError] = useState('')

  const editColor = (color) => {
    setEditing(true)
    setColorToEdit(color)
  }

  const saveEdit = (e) => {
    e.preventDefault()

    axiosWithAuth()
      .put(`http://localhost:5001/api/colors/${colorToEdit.id}`, colorToEdit)
      .then((res) => {
        setColorToEdit(initialColor)
        setEditing(false)
      })
      .catch((err) => console.log('saveEdit error!', err.response))
  }

  const deleteColor = (e) => {
    e.preventDefault()

    axiosWithAuth()
      .delete(`http://localhost:5001/api/colors/${colorToAdd.id}`)
      .then((res) => {
        setColorToAdd(initialColor)
      })
      .catch((err) => console.log('deleteColor error!', err.response))
  }

  const addColor = (e) => {
    e.preventDefault()

    colors.filter((color) => colorToAdd.color === color.color).length > 0
      ? setAddError('Color name already exists!')
      : axiosWithAuth()
          .post('http://localhost:5001/api/colors', colorToAdd)
          .then((res) => {
            console.log('added color res', res)
          })
          .catch((err) => console.log('addColor error!', err.response))
  }

  return (
    <div className='colors-wrap'>
      <p>colors</p>
      <ul>
        {colors.map((color) => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span className='delete' onClick={() => deleteColor(color)}>
                x
              </span>{' '}
              {color.color}
            </span>
            <div
              className='color-box'
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={(e) =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={(e) =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className='button-row'>
            <button type='submit'>save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}

      <div className='new-color'>
        <form onSubmit={addColor}>
          {addError ? <p>{addError}</p> : null}
          <legend>Add color</legend>
          <label>
            color name:
            <input
              onChange={(e) => {
                setAddError('')
                setColorToAdd({ ...colorToAdd, color: e.target.value })
              }}
              value={colorToAdd.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={(e) =>
                setColorToAdd({
                  ...colorToAdd,
                  code: { hex: e.target.value }
                })
              }
              value={colorToAdd.code.hex}
            />
          </label>
          <div className='button-row'>
            <button type='submit'>save</button>
          </div>
        </form>
      </div>
      <div className='spacer' />
    </div>
  )
}

export default ColorList
