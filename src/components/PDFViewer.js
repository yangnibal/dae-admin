import React from 'react'

class PDFViewer extends React.Component{
    constructor(props){
        super(props)
        this.viewerRef = React.createRef();
        this.backend = new props.backend();
        console.log(props)
    }

    componentDidMount() {
        const { src } = this.props;
        const element = this.viewerRef.current;
    
        this.backend.init(src, element);
        
    }

    render(){
        return(
            <div ref={this.viewerRef} style={{width: "100%", height: "100%"}}></div>
        )
    }
}

export default PDFViewer