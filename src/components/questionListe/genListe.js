import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Delete from "@material-ui/icons/Delete";
class GenList extends React.Component {

    constructor(props){
        super(props);  
        this.state={
            nomUser:"",
            idUser:"",
            idQuestion:"",
            idLogin:"",
            userLoged: false,
            
        }
    }

    componentDidMount() {
        this.loadUtilisateur();
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


    render(){
        return (

            <Link to={"/accueil/"+this.props.question._id} style={{ textDecoration: 'none' }}>
              <div className="col-sm-12 border text-dark border-primary">
                <div className="row border border-secondary">
                    <div className="col-sm-9">
                        <b>{this.props.question.title}</b>
                    </div>
                    <div className="col-sm-3">
                        <div className="row border border-success">
                            <div>
                                {this.props.question.date}
                            </div>
                            <div>
                                {this.state.userLoged?<a onClick={()=> {this.props.deleteQuestion(this.props.question._id)}}><Delete /></a>:""}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row border border-primary">
                     {this.props.question.description}
                </div>
                <tr>
                    <td></td>
                    <td>{this.props.question.calification}</td>
                    {/* <td>{this.props.question.nomUtilisateur}</td> */}
                    <td>
                    {/* <Link to={"/edit/"+this.props.question._id}>édition</Link>  */}
                   
                    
                    </td>
                </tr>
               
            </div>
            <br/>
            </Link>
            
            
        )
    }
}
export default GenList;