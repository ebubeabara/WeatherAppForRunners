class Combobox extends React.Component {    
  render() {
    return (
      <div className="combobox-wrapper">
        <select name={this.props.name} className="form-control">
          {
            this.props.combolist.map(function(item, i) {
              return (
                <option key={i} value={item.name}>
                  {item.name}
                </option> 
              ) 
            })
          }
        </select>
      </div>
    );
  }
}

class App extends React.Component {
  constructor() {
    super();
    this.submit = this.submit.bind(this);
  }
  
  submit(event){
    event.preventDefault();
    console.log(this.refs.form.mySelect.value)
  } 
  
  render() {
    var comboList = [{name: 'Self'},{name: 'Mother'},
               {name: 'Father'},{name: 'Domestic Partner'}];
    return (
      <div>
        <h1>Get Value from REF</h1>
        <form ref="form" onSubmit={this.submit}>
          <Combobox name="mySelect" combolist={comboList} />
          <button type="submit" 
            className="btn btn-primary">Submit</button>
        </form>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));