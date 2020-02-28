import React, { useState} from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = props => {
  const { colors, updateColors } = props
  console.log(props);
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);

  //add color stretch goals
  const [add, setAdd] = useState(false);
  const [addColor, setAddColor] = useState(initialColor);

  const newColor = (e) => {
      e.preventDefault();
      axiosWithAuth()
        .post('/colors', addColor).then(res => {
        axiosWithAuth().get('/colors').then(res => updateColors(res.data))  
        setAddColor(initialColor)
        setAdd(false)
      })
      .catch(err => console.log(err));
  }
    
  
  
  
  
  
    const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = e => {
    // Make a put request to save your updated color
    // think about where will you get the id from...
    // where is is saved right now?
    e.preventDefault();
    axiosWithAuth()
    .put(`/colors/${colorToEdit.id}`, colorToEdit)
    .then(res => {
      axiosWithAuth()
        .get('/colors')
        .then( res => updateColors(res.data))
      setColorToEdit(initialColor)
      setEditing(false)
    })
    
    .catch(err => console.log(err))
  };

  const deleteColor = color => {
    // make a delete request to delete this color  
    axiosWithAuth()
    .delete(`/colors/${color.id}`)
    .then(axiosWithAuth().get('/colors')
    .then( res => updateColors(res.data)))
  };



  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span className="delete" onClick={e => {
                    e.stopPropagation();
                    deleteColor(color)
                  }
                }>
                  x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
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
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      <div>
      <form onSubmit={newColor}>
          <legend>Add a color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setAddColor({ ...addColor, color: e.target.value })
              }
              value={addColor.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setAddColor({
                  ...addColor,
                  code: { hex: e.target.value }
                })
              }
              value={addColor.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">Add Color</button>
            {/* <button onClick={() => setAdd(false)}>cancel</button> */}
          </div>
        </form>
      </div>

      <div className="spacer" />
      {/* stretch - build another form here to add a color */}

    </div>
  );
};

export default ColorList;
