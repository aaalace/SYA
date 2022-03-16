import React from "react"

function SocialInform() {

    const container = {
        width: '100%',
        height: '100px',
        backgroundColor: 'white',
        marginTop: '20px',
        borderRadius: '5px 5px 5px 15px'
    }

    const user_rel_container = {
        width: '90%',
        margin: '0 auto'
    }

    const user_line = {
        width: '100%',
        margin: '0 auto',
        backgroundColor: ''
    }

    const data_switcher = {
        width: '100%',
        margin: '0 auto',
        backgroundColor: ''
    }

    const user_rel = {
        width: '90%',
        margin: '0 auto'
    }

    return (
        <div style={container}>
            <div style={user_rel_container}>
                <div style={data_switcher}>
                    <p></p>
                    <p></p>
                </div>
                <div style={user_rel}>
                    <div style={user_line}>Name</div>
                </div>
            </div>
            <div className="tags-prof-container">
                
            </div>
        </div>
    )
}

export default SocialInform