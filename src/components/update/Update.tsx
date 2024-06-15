import React from 'react'
import Input from '../input/Input'
import Button from '../button/Button'
import "./update.css"
import { UpdateCompProps } from '../../types'
const Update: React.FC<UpdateCompProps> = ({hideUpdateComp}) => {
  return (
<div className="gogo__update__container" onClick={hideUpdateComp}>
    <h1 className='gogo__update__title'>Update settings</h1>
                <Input className="gogo__update__input"/>
                <Button text="updated"className="gogo__update__button"/>
            </div>
  )
}

export default Update