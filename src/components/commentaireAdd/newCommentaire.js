import React from 'react';
import axios from 'axios';


class NewCommentaire extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            description:'',
            titleQuestion: '',
            date: '',
            notePositive:'',
            noteNegative: '',

            nomUser:"",
            idUser:"",
            idQuestion:"",
            idLogin:"",
        
        
        
        };

        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeTitleQuestion = this.onChangeTitleQuestion.bind(this); //Linking between actionListener and field
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onChangeNomUser = this.onChangeNomUser.bind(this);
        this.onChangeNotePositive = this.onChangeNotePositive.bind(this);
        this.onChangeNoteNegative = this.onChangeNoteNegative.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount(){
               
    }

    componentDidUpdate() {
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
 


    onChangeDescription(e){
        this.setState({
            description:e.target.value
        })
    }
    onChangeTitleQuestion(e){
        this.setState({
            titleQuestion:e.target.value
        })
    }
    onChangeDate(e){
        this.setState({
            date:e.target.value
        })
    }
    onChangeNomUser(e){
        this.setState({
            nomUser:e.target.value
        })
    }
    onChangeNotePositive(e){
        this.setState({
            notePositive:e.target.value
        })
    }
    onChangeNoteNegative(e){
        this.setState({
            noteNegative:e.target.value
        })
    }


    onSubmit(e){
        e.preventDefault();
        var day = new Date();
        var date = day.getDate()+'-'+(day.getMonth()+1)+'-'+day.getFullYear();

        const util = {
            description: this.state.description,
            titleQuestion: this.props.idq,
            date: date,
            nomUser: this.state.nomUser,
            notePositive: '0',
            noteNegative: '0',
                
        }
        console.log(util);
        axios.post('http://10.30.40.121:3437/ecrireCommentaire',util)
       //axios.post('http://localhost:3437/ecrireCommentaire',util)
        .then(res=>{console.log(res.data)
            this.setState({
                 description:'',
                titleQuestion: '',
                date: '',
                nomUser:'',
                notePositive:'',
                noteNegative: ''
            });
//            window.location.replace('/liste');
        });
    }
    
    render() {
        
        if(this.state.nomUser.length > 0)
        return (
            <div className="container">
                <h4>Ajouter votre response</h4>
                <div className="col-md-6">
                <form onSubmit={this.onSubmit}>

    
                        
                        <div className="form-group">
                        <label>Ecrire ice votre question</label>
                        <textarea
                        placeholder="Écrivez votre idée, suggestion ou réponse ici.."
                        required 
                        className="form-control"
                        rows="3"
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
        else
        return (
            <div className="container">
                <h3>Vous devez vous inscrire pour répondre</h3>
            </div>
        )
    }
}
export default NewCommentaire;