const styles = theme => ({
    upperCards: {
        marginTop: theme.spacing(2),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        boxShadow: '3px 3px 8px #00000008',
        borderRadius: '6px',
    },

    cardTitle: {
        margin: '20px 0 0 40px',
        display:'flex', 
        flexDirection: 'row',
        height:'fit-content',
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
        width: '100%',
        margin: '0px 10px 0px 0px',
        display: 'flex',
        alignItems:'center',
    },
    button : {
        textTransform: 'none',
        fontFamily: 'hind',
        fontWeight: '100',
        width:'240px',
        height:'36px',
        marginTop:'10px',
    },
    buttonsContainer: {
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        justifyContent:'center',
        height: '100%',
    },
    lastUpdate : {
        color: '#9D9D9C',
        display: 'flex',
        alignItems:'flex-end',
        marginBottom:'20px',
    },
    
});

export default styles;