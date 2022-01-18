const styles = theme => ({
    root: {
        width: '80%',
        height: '38px',
        border: '2px solid #3A3A3A',
        borderRadius: '18px',
        marginTop: 'auto',
    },
    bar: {
        margin: '2%',
        backgroundColor: '#F4F4F4',
        borderRadius: '18px',
        width: '100%',
    },
    progressBar: {
        height:'100%',
        borderRadius: '18px',
        
        background: 'linear-gradient(-90deg, #60B565 , #349698)',
    },
    measureContainer: {
        width:'80%', 
        marginLeft: '11%', 
        marginRight: '10%'
    },
    measure: {
        width: '100%',
        border: '1px solid #9D9D9C',
        height: '12px',
        borderBottom: 'none',
        marginTop: 'auto', 
        marginLeft: '1%', 
        marginRight: '3%' 
    },
    description: {
        marginTop: '20px',
    },
    percentage: {
        color: '#349698',
        fontWeight: '700',
    },
});

export default styles;