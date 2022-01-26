import React from 'react';
import axios from 'axios';


class ReadQuestion extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            description:'',
            calification:'',
            date: '',
            nomUtilisateur: '',
            idq: '',
        
            nomUser:"",
            idUser:"",
            idQuestion:"",
            idLogin:"",
        };

    }

    componentDidMount(){
        
    }
    componentDidUpdate() {
        
        this.loadQuestion();
        this.loadUtilisateur();
    }

    loadUtilisateur(){
        if(!this.state.userLoged){
            axios.get('http:///10.30.40.121:3437/lireLogin')
            //axios.get('http://localhost:3437/lireLogin')
            .then(response =>{
            //  console.log(response.data);
                if(response.data.length>0){
                    this.setState({
                        nomUser : response.data[0].nomUser,
                        idUser: response.data[0].idUser,
                        idQuestion : "",
                        idLogin: response.data[0]._id,
                        userLoged : true,
                    })
                }
            })
            .catch((error)=>{
                console.log(error);
            })
        }
    }




    loadQuestion(){
        axios.get('http://10.30.40.121:3437/lireUneQuestion/' +this.props.idq)
        //axios.get('http://localhost:3437/lireUneQuestion/' +this.props.idq)
            .then(response =>{
                console.log(response.data);
    
                 this.setState({
                     title: response.data.title,
                     description: response.data.description,
                     calification: response.data.calification,
                     date: response.data.date,
                     nomUtilisateur: response.data.nomUtilisateur,
                     id:this.props.idq
                     //id:this.props.match.params.id
                 })
                
            }).catch((error)=>{
                console.log(error);    
            })
            
    }

       
    render() {
        
        return (
            <div className="container">
                <br/>
                { this.state.date.length? <h1>{this.state.nomUser} a demandé:</h1>:<h1>Sélectionnez une question</h1>}
                { this.state.date.length?    <h6>Date:  {this.state.date}</h6>:<h6></h6>}
                    <div className="col-md-11">
                    <h1 class="display-4">{this.state.title}</h1>
                    <h3>{this.state.description}</h3> <br/>      
                </div>
            </div>
        )
    }
}
export default ReadQuestion;