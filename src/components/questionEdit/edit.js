import React from 'react';
import axios from 'axios';


class EditQuestion extends React.Component {
    constructor(props) {
        super(props);

        this.onChangeTitle = this.onChangeTitle.bind(this); //Linking between actionListener and field
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeNomUtilisateur = this.onChangeNomUtilisateur.bind(this);
        this.state = {
            title: '',
            description:'',
            calification:'',
            date: '',
            nomUtilisateur: '',

        }

        this.state={
            commentaires:[]
        }; 
    }

    componentDidMount(){
        this.loadCommentaire(); 
        this.loadQuestion();
}

loadQuestion = ()=>{
    axios.get('http://10.30.40.121:3437/lireUneQuestion/' +this.props.match.params.id)
    //axios.get('http://localhost:3437/lireUneQuestion/' +this.props.match.params.id)
        .then(response =>{
            console.log(response.data);

             this.setState({
                 title: response.data.title,
                 description: response.data.description,
                 calification: response.data.calification,
                 date: response.data.date,
                 nomUtilisateur: response.data.nomUtilisateur,
                 id:this.props.match.params.id
             })
            
        }).catch((error)=>{
            console.log(error);    
        })
        
}


loadCommentaire = ()=>{
    //axios.get('http://10.30.40.121:3437/lireCommentByQuestion/'+this.props.match.params.id)
    axios.get('http://localhost:3437/lireCommentByQuestion/'+this.props.match.params.id)
    .then(response =>{
        console.log(response.data);
        if(response.data.length>0){
            this.setState({departements:response.data})          
        }
        this.setState({ldep: this.state.departements.map(dep2=>dep2.dep)});
        this.setState({ldep: this.state.ldep.filter(dep2=>dep2!==undefined)});            
        //console.log(this.state.ldep);
    })
    .catch((error)=>{
        console.log(error);
    })
}

    onChangeCode(e){
        this.setState({
            code:e.target.value
        })
    }

    onChangeNom(e){
        this.setState({
            nom:e.target.value
        })
    }
    onChangePrenom(e){
        this.setState({
            prenom:e.target.value
        })
    }

    onChangeDep(e){
        this.setState({
            dep:e.target.value
        })
    }


    onSubmit(e){
        e.preventDefault();
        const util = {
            code: this.state.code,
            nom: this.state.nom,
            prenom: this.state.prenom,
            dep: this.state.dep
        }
        console.log(util);
        axios.post('http://10.30.40.121:3437/upUtil/'+this.props.match.params.id,util)
        //axios.post('http://localhost:3437/upUtil/'+this.props.match.params.id,util)
        .then(res=>{
            //console.log(res.data)
            //console.log(this.state)
            //window.location = "/Liste";
            window.location.replace('/Liste');
        });

    }


  


    displayDep= (deptlist) =>{
        if(typeof deptlist !== 'undefined'){
             if(!deptlist.length) return null;
             return deptlist.map(departement => <option key={departement._id} value={departement.dep} >{departement.dep}</option>)
         }
     }


    render() {
        return (
            <div className="container">
                <h3>Éditer une Question</h3>
                <form onSubmit={this.onSubmit}>

                    <div className="form-group">
                        <label>Commentaires:</label>
                        <select className="form-control" options={this.state.dep} 
                        value={this.state.dep?this.state.dep:"Any"} onChange={this.onChangeDep}>
                        {this.displayDep(this.state.departements)}
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Nom:</label>
                        <input type="text"
                        required 
                        className="form-control"
                        value={this.state.nom}
                        onChange={this.onChangeNom}
                        />
                    </div>
                    <div className="form-group">
                        <label>Prénom:</label>
                        <input type="text"
                        required 
                        className="form-control"
                        value={this.state.prenom}
                        onChange={this.onChangePrenom}
                        />
                    </div>
                    <div className="form-group">
                        <label>Code:</label>
                        <input type="text"
                        required 
                        className="form-control"
                        value={this.state.code}
                        onChange={this.onChangeCode}
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
export default EditQuestion;