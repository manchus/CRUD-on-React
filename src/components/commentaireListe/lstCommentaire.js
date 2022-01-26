import React from 'react';
import axios from 'axios';
import GenList from './genListe';


    class LstCommentaire extends React.Component {
        constructor(props){
            super(props);  
            this.state={
            
                commentaires:[]
            }
        this.deleteCommentaire = this.deleteCommentaire.bind(this);
        }
    


        componentDidMount(){
         
        }
        
        componentDidUpdate() {
            this.loadQuestion();
        }
    
        loadQuestion(){
            axios.get('http://10.30.40.121:3437/lireCommentByQuestion/' +this.props.idq)
            //axios.get('http://localhost:3437/lireCommentByQuestion/' +this.props.idq)
                .then(response =>{
                    console.log(response.data);
                    //if(response.data.length>0){
                        this.setState({commentaires:response.data})
                    //}   
                }).catch((error)=>{
                    console.log(error);    
                })
                
        }



        deleteCommentaire(id){
            axios.delete('http://10.30.40.121:3437/supCommentaire/'+id)
            //axios.delete('http://localhost:3437/supCommentaire/'+id)
            .then(res=>console.log(res.data));
            this.setState({
                commentaires:this.state.commentaires.filter(el=>el._id !== id) 
            })
        }

        commentaireList(){
            return this.state.commentaires.map(commentaireCourant => {
            return <GenList commentaire={commentaireCourant} deleteCommentaire={this.deleteCommentaire} key={commentaireCourant.title}/>;
            })
        }

        
    render() {
        return (
            <div className="container">
                { this.state.commentaires.length?<h3>Liste des Commentaires</h3>:<h3></h3>}
                
                     {this.commentaireList()}
            </div>
        )
    }
}

export default LstCommentaire;