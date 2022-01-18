const margin = { top: 0, right: 200, bottom: 0, left: 0 };

const styles = {
    root: {
      fontFamily: "consolas, sans-serif",
      textAlign: "center",
      position: "relative",
      width: '100%',
      height: '60%',
      display:'flex',
      justifyItens:'center',
    },
    overlay: {
      position: "absolute",
      top: 0,
      bottom: 0,
      left: margin.left,
      right: margin.right,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center",
      // This is important to preserve the chart interactivity
      pointerEvents: "none"
    },
    totalLabel: {
      fontSize: 24
    },
    insideGrid: {
        borderRadius: '50%',
        border: '',
        borderWidth: '15px',
        borderColor: '#C5C5C533',
        fontSize: '36px',
        fontWeight:'bold',
        color:'#0C5456',
        backgroundColor: '#C5C5C533',
        width: '90px',
        height: '90px',
        display:'flex',
        justifyContent:'center',
        alignItems: 'center',
    } 
};

const colors = [ "#0C5456", "#349698", "#53B7B9", "#60B565", "#8AD68E",'#97e3d5'];

export {styles, margin, colors};