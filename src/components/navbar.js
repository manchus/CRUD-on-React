import React from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import {NavDropdown} from 'react-bootstrap';

class Navbar extends React.Component {
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

    deleteLogin(){
        axios.delete('http://10.30.40.121:3437/supLogin/'+this.state.idLogin)
        //axios.delete('http://localhost:3437/supLogin/'+this.state.idLogin)
        .then(res=>console.log(res.data));
        this.setState({
            nomUser : "",
            idUser: "",
            idQuestion : "",
            idLogin: "",
            userLoged : false,
        })
        window.location.replace('/accueil/1');
    }

    render() {
        return (
            <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
                
                <Link to="/" className="navbar-brand">Bienvenue</Link>
                <div className="navbar-collapse">
                    <ul className="navbar-nav mr-auto">
                    <li className="navbar-item">
                            <Link to="/newquestion" className="nav-link">Nouvelle Question</Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/accueil/1" className="nav-link">Des Questions</Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/new" className="nav-link">{this.state.userLoged?"":"Ouvrir une session"}</Link>
                        </li>
                         <li>
                            <Link to="#" className="nav-link" onClick={()=> {this.deleteLogin()}}>{this.state.userLoged?"Sortir":""}</Link>
                        </li>
                    </ul>
                    <span className="navbar-text">
                          <h3>{this.state.userLoged?this.state.nomUser:"Sans Identifier"}</h3>
                    </span>
                </div>
                
            </nav>
            
        )
    }
}

export default Navbar;