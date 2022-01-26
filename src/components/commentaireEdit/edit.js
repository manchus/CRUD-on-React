import React from 'react';
import axios from 'axios';


class EditCommentaire extends React.Component {
    constructor(props) {
        super(props);

        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeTitleQuestion = this.onChangeTitleQuestion.bind(this); //Linking between actionListener and field
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onChangeNomUser = this.onChangeNomUser.bind(this);
        this.onChangeNotePositive = this.onChangeNotePositive.bind(this);
        this.onChangeNoteNegative = this.onChangeNoteNegative.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = {
            description:'',
            titleQuestion: '',
            date: '',
            nomUser:'',
            notePositive:'',
            noteNegative: '',
        }

        this.state={
            commentaires:[]
        }; 
    }

    componentDidMount(){
        this.loadDep(); 
        this.loadQuestion();
}

loadQuestion = ()=>{
    //axios.get('http://10.30.40.121:3437/lireUneQuestion/' +this.props.match.params.id)
    axios.get('http://localhost:3437/lireUneQuestion/' +this.props.match.params.id)
        .then(response =>{
            console.log(response.data);

             this.setState({
                 description: response.data.description,
                 titleQuestion: response.data.titleQuestion,
                 date: response.data.date,
                 nomUser: response.data.nomUser,
                 notePositive: response.data.notePositive,
                 noteNegative: response.data.noteNegative,
                 id:this.props.match.params.id
             })
            
        }).catch((error)=>{
            console.log(error);    
        })
        
}


loadDep = ()=>{
    //axios.get('http://10.30.40.121:3437/lireCommentaire')
    axios.get('http://localhost:3437/lireCommentaire')
    .then(response =>{
        console.log(response.data);
        if(response.data.length>0){
            this.setState({commentaires:response.data})          
        }
        this.setState({lcom: this.state.commentaires.map(comme=>comme.description)});
        this.setState({lcom: this.state.lcom.filter(comme=>comme!==undefined)});            
        //console.log(this.state.ldep);
    })
    .catch((error)=>{
        console.log(error);
    })
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
        const util = {
            description: this.state.description,
            titleQuestion: this.state.titleQuestion,
            date: this.state.date,
            nomUser: this.state.nomUser,
            notePositive: this.state.notePositive,
            noteNegative: this.state.noteNegative
        }
        console.log(util);
        //axios.post('http://10.30.40.121:3437/updCommentaire/'+this.props.match.params.id,util)
        axios.post('http://localhost:3437/updCommentaire/'+this.props.match.params.id,util)
        .then(res=>{
            //console.log(res.data)
            //console.log(this.state)
            //window.location = "/Liste";
            window.location.replace('/Liste');
        });

    }


  


    displayComm= (commtlist) =>{
        if(typeof commtlist !== 'undefined'){
             if(!commtlist.length) return null;
             return commtlist.map(commentaire => <option key={commentaire._id} value={commentaire.description} >{commentaire.description}</option>)
         }
     }


    render() {
        return (
            <div className="container">
                <h3>Éditer un Commentaire</h3>
                <form onSubmit={this.onSubmit}>

                    <div className="form-group">
                        <label>Commentaires:</label>
                        <select className="form-control" options={this.state.description} 
                        value={this.state.description?this.state.description:"Any"} onChange={this.onChangeDep}>
                        {this.displayComm(this.state.commentaires)}
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Title Question:</label>
                        <input type="text"
                        required 
                        className="form-control"
                        value={this.state.titleQuestion}
                        onChange={this.onChangeTitleQuestion}
                        />
                    </div>
                    <div className="form-group">
                        <label>Date:</label>
                        <input type="text"
                        required 
                        className="form-control"
                        value={this.state.date}
                        onChange={this.onChangeDate}
                        />
                    </div>
                    <div className="form-group">
                        <label>Nom User:</label>
                        <input type="text"
                        required 
                        className="form-control"
                        value={this.state.nomUser}
                        onChange={this.onChangeNomUser}
                        />
                    </div>
                    <div className="form-group">
                        <label>Note Positive:</label>
                        <input type="text"
                        required 
                        className="form-control"
                        value={this.state.notePositive}
                        onChange={this.onChangeNotePositive}
                        />
                    </div>
                    <div className="form-group">
                        <label>Note Negative:</label>
                        <input type="text"
                        required 
                        className="form-control"
                        value={this.state.noteNegative}
                        onChange={this.onChangeNoteNegative}
                        />
                    </div>
                    
                    <div className="form-group">
                        <input type="submit" value="Mettre à jour" className="btn btn-primary"/>
                    </div>
                </form>
            </div>
        )
    }
}
export default EditCommentaire;