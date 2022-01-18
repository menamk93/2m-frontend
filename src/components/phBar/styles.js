const styles = theme => ({

    chartContainer: {
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        width: '90%',
    },
    root: {
        width: '100%',
        height: '38px',
        border: '2px solid #3A3A3A',
        borderRadius: '18px',
    },
    bar: {
        margin: '2%',
        backgroundColor: '#F4F4F4',
        borderRadius: '18px',
        width: '100%',
        position: 'relative',
    },
    progressBar: {
        height:'100%',
        width: '100%',  
        borderRadius: '18px',
        background: 'transparent linear-gradient(90deg, #DF4545 0%, #E96125 7%, #F8A429 14%, #F6CA1F 21%, #E2E43E 28%, #9DD142 36%, #4DB84B 44%, #129F4B 50%, #12AC5F 57%, #53B7B9 64%, #238FC6 71%, #3E63B1 79%, #5252B1 86%, #5444A1 94%, #453485 100%) 0% 0% no-repeat padding-box',
    },
    measureContainer: {
        width:'100%', 
        marginLeft: '6%', 
        marginRight: '3%',
        marginTop: '20px',
    },
    marker: {
        position: 'absolute',
        height: '100%',
        border: '2px solid #0C5456',
        borderRadius: '50px',
        alignSelft: 'flex-start',
    },
    label: {
        color: '#9D9D9C',
        width: '4.5%'
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
        paddingLeft: '5%',
        backgroundColor: '#fff',
    },
    percentage: {
        color: '#349698',
        fontWeight: '700',
    },
});

export default styles;