import React from 'react';
import axios from 'axios';
import GenList from './genListe';


    class LstQuestion extends React.Component {
        constructor(props){
            super(props);  
            this.state={
                questions:[]
            }
        this.deleteQuestion = this.deleteQuestion.bind(this);
        }
    

        componentDidMount(){
            //this.setState({utilisateurts:utils})
            axios.get('http://10.30.40.121:3437/lireQuestion')
            //axios.get('http://localhost:3437/lireQuestion')
            .then(response =>{
                console.log(response.data);
                if(response.data.length>0){
                    this.setState({questions:response.data})
                }
            })
            .catch((error)=>{
                console.log(error);
            })
        }
        componentWillUnmount(){

        }

        deleteQuestion(id){
            axios.delete('http://10.30.40.121:3437/delQuestion/'+id)
            //axios.delete('http://localhost:3437/delQuestion/'+id)
            .then(res=>console.log(res.data));
            this.setState({
                questions:this.state.questions.filter(el=>el._id !== id) 
            })
        }

        questionList(){
            return this.state.questions.map(questionCourant => {
            return <GenList question={questionCourant} deleteQuestion={this.deleteQuestion} key={questionCourant.title}/>;
            })
        }

        
    render() {
        return (
            <div className="container">
                <h3>Nos questions</h3>
                {this.questionList()}
            </div>
        )
    }
}

export default LstQuestion;