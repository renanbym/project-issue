import React, { Component } from "react";
import IssueList from "./IssueList";

class App extends Component {

  state = {
    selectedIssues: []
  };

  markIssue = issue => {
   
  };

  render() {

    return (
      <div className="App">
        <div className="ui container">
          <IssueList onIssueClick={this.markIssue} />
        </div>
      </div>
    );
  }


}

export default App;
