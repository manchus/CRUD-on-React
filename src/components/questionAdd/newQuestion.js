import React from 'react';
import axios from 'axios';


class NewQuestion extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            description:'',
            calification:'',
            date: '',
            nomUtilisateur: '',

            nomUser:"",
            idUser:"",
            idQuestion:"",
            idLogin:"",

            login:[]



                
        };

        this.onChangeTitle = this.onChangeTitle.bind(this); //Linking between actionListener and field
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeNomUtilisateur = this.onChangeNomUtilisateur.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount(){
       
        this.loadUtilisateur();
    }

    loadUtilisateur(){
        if(!this.state.userLoged){
            //axios.get('http:///10.30.40.121:3437/lireLogin')
            axios.get('http://localhost:3437/lireLogin')
            .then(response =>{
            //  console.log(response.data);
                if(response.data.length>0){
                    this.setState({
                        nomUser : response.data[0].nomUser,
                        idUser: response.data[0].idUser,
                        idQuestion : "",
                        idLogin: response.data[0]._id,
                    })
                }
            })
            .catch((error)=>{
                console.log(error);
            })
        }
    }

    onChangeTitle(e){
        this.setState({
            title:e.target.value
        })
    }
    onChangeDescription(e){
        this.setState({
            description:e.target.value
        })
    }

    onChangeNomUtilisateur(e){
        this.setState({
            nomUtilisateur:e.target.value
        })
    }


    onSubmit(e){
        e.preventDefault();
        var day = new Date();
        var date = day.getDate()+'-'+(day.getMonth()+1)+'-'+day.getFullYear();

        const util = {
            title: this.state.title,
            description: this.state.description,
            calification: '0',
            date: date,
            nomUtilisateur: this.state.idUser,
        }
        console.log(util);
        axios.post('http://10.30.40.121:3437/ecrireQuestion',util)
       //axios.post('http://localhost:3437/ecrireQuestion',util)
        .then(res=>{console.log(res.data)
            this.setState({
                title: '',
                description:'',
                calification:'',
                date: '',
                nomUtilisateur: ''
            });
            window.location.replace('/accueil/1');
        });
    }
    
    render() {
        
        return (
            <div className="container">
                <h3>Ajouter une question</h3>
                <div className="col-md-11">
                <form onSubmit={this.onSubmit}>

                    <div className="form-group">
                        <label>Ecrire ice votre question</label>
                        <input type="text"
                        required 
                        placeholder="Question?"
                        className="form-control"
                        value={this.state.title}
                        onChange={this.onChangeTitle}
                        />
                    </div>
           
                        
                        <div className="form-group">
                        <label>Ecrire ice votre question</label>
                        <textarea
                        placeholder="Ecrire ici les details de votre question."
                        required 
                        className="form-control"
                        rows="4"
                        value={this.state.description}
                        onChange={this.onChangeDescription}
                        />
                        </div>
                    
                    

                    <div className="form-group">
                        <input type="submit" value="Ajout" className="btn btn-primary"/>
                    </div>
                </form>
                </div>
            </div>
        )
    }
}
export default NewQuestion;