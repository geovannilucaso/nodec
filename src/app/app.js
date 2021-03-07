
import { model, Mongoose } from 'mongoose';
import React, {Component} from 'react';

class App extends Component{

    constructor(){
        super();
        this.state = 
            {
                cars:[],
                description:"",
                make : "",
                model : "",
                estimatedate : "",
                id : 0,
                image:"",
                _id:"",
                km:0, 
                maintenance:false,
                person:""
             };
             
        this.addCar = this.addCar.bind(this);
       
        this.handleChange = this.handleChange.bind(this);
        this.handleCheckBox = this.handleCheckBox.bind(this);
    }
    editCar(id){

        fetch(`api/cars/${id}`)
        .then(res => res.json())
        .then(data=>{
            this.setState({
                _id:data._id,
                description:data.description,
                make : data.make,
                model : data.model,
                estimatedate : data.estimatedate,
                id : data.id,
                image:data.image,
                km:data.km, 
                maintenance: data.maintenance,
                person:data.person
            });
        });
        
   
    }
    deleteCar(id){

        if(confirm('Seguro de eliminar')){
            fetch(`/api/cars/${id}`,
        {
            method:"DELETE",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
          .then(data=> {
            console.log(data);
            M.toast({html:'Car Deleted'});
            this.fetchCars();
          });
        }

        
    }
    addCar(e){
    
        if(this.state._id){
            fetch(`/api/cars/${this.state._id}`,{
                method:"PUT",
                body: JSON.stringify(this.state),
                headers: { 'Accept':'application/json', 'Content-Type':'application/json' }
            }).then(res=>res.json())
              .then(data=>{
                  M.toast({html: 'Car Updated'});
                  this.setState({
                    description:"",
                    make : "",
                    model : "",
                    estimatedate : "",
                    id : 0,
                    _id:"",
                    image:"",
                    km:0, 
                    maintenance:false,
                    person:""
                });
                this,this.fetchCars();
              });
        }

        
        e.preventDefault();
    }
    handleCheckBox(e){
        var checked = e.target.checked;
        this.setState({
            maintenance: checked
        });
    }
    handleChange(e){
        const {name, value} = e.target;
       
             this.setState({
                [name]:value
            });
      
       

    }
    componentDidMount(){
        this.fetchCars();
    }
    fetchCars(){
        fetch('/api/cars')
        .then(res=>res.json())
        .then(data=>{
            console.log(data);
            this.setState({cars:data});
        });
    }
    
    render(){
        return(
            <div>
                <nav className="light-blue darken-4">
                    <div className="container">
                        <a className="brand-logo" href="/">Inicio</a>
                    </div>
                </nav>
            
                <div className="container">
                    <div className="row">
                        <div className="col s6">
                            <div className="card">
                                <div className="card-content">
                                    <form onSubmit={this.addCar}>
                                        <div className="row">
                                            <div className="input-field col s12">
                                                <label>ID: {this.state.id}</label>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="input-field col s12">
                                                <label>Make: {this.state.make}</label>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="input-field col s12">
                                                <label>Model: {this.state.model}</label>
                                            </div>
                                        </div>
                                        <div className="row">
                                        <div className="input-field col s12">
                                                <input id="km" type="Number" value={this.state.km} onChange={this.handleChange} name="km" placeholder="KM"></input>
                                                <label htmlFor="km">KM</label>
                                            </div>
                                        </div>
                                        
                                        <div className="row">
                                            <div className="input-field col s12">
                                                <textarea id="description" value={this.state.description} onChange={this.handleChange} name="description" className="materialize-textarea" placeholder="Problem Description"></textarea>
                                                <label htmlFor="description">Description</label>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="input-field col s12">
                                                <input type="Date" id="estimatedate" value={this.state.estimatedate} onChange={this.handleChange} name="estimatedate"></input>
                                                <label htmlFor="estimatedate">Estimated Date</label>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="input-field col s12">
                                                <input id="person" value={this.state.person} onChange={this.handleChange} name="person" placeholder="Person" type="text"></input>
                                                <label htmlFor="person">Person</label>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="input-field col s12">
                                            <label>
                                                <input type="checkbox" onChange={this.handleCheckBox}  checked={this.state.maintenance} name="maintenance"  />
                                                <span>In Maintenance</span>
                                            </label>
                                            </div>
                                        </div>
                                        <button type="submit" className="btn light-blue darken-4">Save</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="col s6"style={{maxHeight: "600px", overflowY:"auto"}} >
                            <h3>Cars</h3>
                            {
                                this.state.cars.map((car)=>{
                                    return(
                                    <div className="card" key={car._id}>
                                        <div className="card-image">
                                        <img  src={car.image} />
                                        
                                        
                                            <button onClick={() => this.editCar(car._id)} className="btn-floating halfway-fab waves-effect waves-light red"><i className="material-icons">edit</i></button>
                                        </div>
                                        <div className="card-content" style={car.maintenance? {backgroundColor: "#FFBEBB"}:{backgroundColor: "#D1FFBB"}}>
                                        <span className="card-title" style={{color: "black", fontWeight:"bold"}}>{car.id} | {car.make} / {car.model}</span>
                                        <p>{car.maintenance?"In Maintance":"Maintance Finished"}</p>
                                        <p><span style={{ fontWeight:"bold"}}>KM: </span> {car.km}</p>
                                        <p><span style={{ fontWeight:"bold"}}>Estimated Date: </span> {car.estimatedate}</p>
                                        <p><span style={{ fontWeight:"bold"},{marginBottom:"3px"}}>Person: </span>{car.person}</p>
                                        <p>{car.description}</p>
                                        </div>
                                    </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default App;