const styles = theme => ({
    container: {
        display: 'flex',
        justifyContent:'center',
        marginTop: '5%',
        marginLeft: '20px',
        marginRight: '20px',
        height: '100%',
    },
    bubbleContainer: {
        display:'flex',
        flexDirection:'column', 
        alignItems:'center',
    },
    speechBubble: {
        position: 'relative',
        background: '#C5C5C533',
        borderRadius: '.4em',
        width: '240px',
        height: '72px',
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
    },
    speechBubbleIndicator: {
        width: 0,
        height: 0,
        borderWidth:10,
        borderLeft: '20px solid transparent',
        borderRight: '20px solid transparent',
        borderBottom: '20px solid #C5C5C533',
    } ,
    text : {
        textAlign: 'center',
        margin: '5px 30px 5px 30px',
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
    },
    lastUpdate : {
        color: '#9D9D9C',
        display: 'flex',
        alignItems:'flex-end',
        marginBottom:'20px',
    },
    
});

export default styles;