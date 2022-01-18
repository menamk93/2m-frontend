const styles = theme => ({
    root: {
        width: '40px',
        height: '40px',
        border: '2px solid #3A3A3A',
        borderRadius: '50%',
        borderTop: '2px transparent '
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
    description: {
        marginTop: '20px',
    },
    percentage: {
        color: '#349698',
        fontWeight: '700',
    },
});

export default styles;