import React, {useState, useEffect, useRef} from "react";

const Dropdown= ({options, selected, onSelectChange, label})=>{
  
  const [open, setOpen] = useState(false)
  const ref = useRef()

  useEffect(()=>{

    const onBodyClick = (event)=>{
      if(ref.current.contains(event.target)){
        return
      }
      setOpen(false)
  }

    document.querySelector('body').addEventListener('click',onBodyClick, {capture: true});

    return ()=> {
      document.body.removeEventListener('click', onBodyClick, {capture: true});
    }
  }, []);

  const renderOptions= options.map((item)=>{
    if(item.value === selected.value){
      return null
    }

    return(
      <div key={item.value} className='item' onClick={()=>onSelectChange(item)}>
        {item.label}
      </div>
    )
  })
  
  
  return(
    <div ref={ref} className='ui form'>
      <div className='field'>
        <label className='label'>{label} </label>
        <div className={`ui selection dropdown ${open ? 'visible active': ''}`} onClick={()=>{setOpen(!open)}}>
          <i className='dropdown icon'></i>
          <div className='text'>{selected.label}</div>
          <div className={`menu ${open ? 'visible transition' : ''}`}>
            {renderOptions}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dropdown;