import React, { Component } from 'react';

class MainContent extends Component {
    state = {
        response: '',
        listItems: []
    };

    componentDidMount() {
        this.callApi()
            .then(res => this.setState({ response: res.express }))
            .catch(err => console.log(err));


    }

    callApi = async () => {
        const response = await fetch('/products/list/json');
        const body = await response.json();

        if (response.status !== 200) throw Error(body.message);
        this.setState({ listItems: body });

    };

    render() {
        return (
            <div className="main_content" >
                <h3>Headphones</h3>
                {this.state.listItems.map(item => (
                    <div className="card" key={item.id}>
                        <div className="card_img">
                            <img src={item.thumb} />
                        </div>
                        <div className="card_header">
                            <h2>{item.product_name}</h2>
                            <p>{item.description}</p>
                            <p className="price">{item.price}<span>{item.currency}</span></p>
                            <div className="btn">Ver detalhes</div>
                        </div>
                    </div>
                ))}
            </div>
        )
    }
}
export default MainContent;
