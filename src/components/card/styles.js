const styles = theme => ({
    upperCards: {
        marginTop: theme.spacing(2),
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        boxShadow: '3px 3px 8px #00000008',
        borderRadius: '6px',
        backgroundColor:'white'
    },

    cardTitle: {
        margin: '20px 0 0 20px',
        display:'flex', 
        flexDirection: 'row',
        height:'fit-content',
        backgroundColor:'white'
    },

    cardBar: {
        width: '0px',
        height: "30px",
        border: "3px solid #349698",
        opacity: "1",
        borderRadius: '20px',
        marginRight: '10px'
    },

    cardContent: {
        height:'240px',
        width: '100%',
        margin: '0px 0px 0px 0px',
        display: 'flex',
        alignItems:'center',
    },
});

export default styles;