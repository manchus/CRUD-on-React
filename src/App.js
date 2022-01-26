import React from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from './components/navbar';
import Accueil from './components/accueil';
import NewUtilisateur from './components/newUtilisateur';
import LoginUtilisateur from './components/loginUtilisateur';
import NewQuestion from './components/questionAdd/newQuestion';
import ReadQuestion from './components/questionRead/readQuestion';
import EdtCommentaire from './components/commentaireEdit/edit';
import AddUser from './components/utilisateurAdd/ajout';
import Edit from './components/utilisateurEdit/edit';

import LstQuestion from './components/questionListe/liste';
import AddCommentaire from './components/commentaireAdd/newCommentaire';
import LstCommentaire from './components/commentaireListe/lstCommentaire';




class App extends React.Component{
  render() {
    return (
    


      <Router>
      <Navbar/>
          <Route path="/accueil/:idq" component={Accueil} />
          <Route path="/new" component={NewUtilisateur} />
          <Route path="/login" component={LoginUtilisateur} />
         
          <Route exact path="/newquestion" component={NewQuestion} />
          <Route exact path="/readquestion/:idq" component={ReadQuestion} />
          <Route exact path="/ajoututilisateur" component={AddUser} />          
          <Route exact path="/Edit/:id" component={Edit} />

          <Route exact path="/edtcommentaire/:idq" component={EdtCommentaire} />          
          <Route exact path="/addcommentaire" component={AddCommentaire} />   
         <Route exact path="/lstcommentaire/:idq" component={LstCommentaire} />       
          {/* <Route exact path="/listequestion" component={LstQuestion} /> */}


      </Router>

    );
  }
  

}

export default App;
