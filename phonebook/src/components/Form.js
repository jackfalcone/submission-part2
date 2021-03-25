import React from 'react'

const InputName = (props) => (
    <div>
        Name:
        <input 
        value={props.value} 
        onChange={props.onChange} 
        />
    </div>
)

const InputNumber = (props) => (
    <div>
        Number:
         <input
            value={props.value}
            onChange={props.onChange}
        />
    </div>
)

const Submit = ({ text }) => (
    <div>
        <button type="submit">
            {text}
        </button>
    </div>
)

const Form = (props) => (
    <div>
        <form onSubmit={props.onSubmit}>
            <div>
                <InputName value={props.valueName} onChange={props.onChangeName} />
            </div>
            <div>
                <InputNumber value={props.valueNumber} onChange={props.onChangeNumber} />
            </div>
            <div>
                <Submit text="add" />
            </div>
        </form>
    </div>
)

export default Form