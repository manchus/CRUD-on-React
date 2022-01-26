import React from 'react';
import LstQuestion from './questionListe/liste';
import ReadQuestion from './questionRead/readQuestion';
import NewCommentaire from './commentaireAdd/newCommentaire'
import LstCommentaire from './commentaireListe/lstCommentaire'

class Accueil extends React.Component{

    render(){

        return(
            <div className="container-fluid">
                <br/>
                <div className="row">
                    <div className="col-sm-4">
                        <LstQuestion/>
                    </div>
                    <div className="col-sm-8">
                        <div className="row">
                            <ReadQuestion  idq={this.props.match.params.idq}/>
                        </div>
                        <div className="row">
                            <NewCommentaire  idq={this.props.match.params.idq}/> 
                        </div>
                        <div className="row">
                             <LstCommentaire idq={this.props.match.params.idq}/> 
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Accueil;