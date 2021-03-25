import React from 'react'

const Notification = ({ message }) => {
    const successStyle = {
        backgroundColor: 'lightgrey',
        color: 'green',
        fontSize: 16,
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10
    }
    const failStyle = {
        backgroundColor: 'lightgrey',
        color: 'red',
        fontSize: 16,
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10
    }
    if (message === null) {
        return null
    }
    if (message[1] === 'success') {
        return (
            <div style={successStyle}>
                {message[0]}
            </div>
        )
    }
    return (
        <div style={failStyle}>
            {message[0]}
        </div>
    )
    
}

export default Notification