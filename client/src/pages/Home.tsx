import { Component } from "react";
import Nft from '../contracts/Nft.json'

export interface State  {
   account: string;
   contract: any;
   totalSupply: number;
   colors: Color[];
}

export interface Color {
   id: string;
   value: string
}

export interface Contract {
   id: string;
   value: string
}

export default class Home extends Component {

   color = {} as Color | null;
   state = {} as State;

 

   constructor(props: Color) {
      super(props)
      this.state= {
        account: '',
        contract: Nft,
        totalSupply: 0,
        colors: []
      } as State;  
   };

  /* async loadBlockchainData() {
      const web3 = window.web3
      // Load account
      const accounts = await web3.eth.getAccounts()
      this.setState({ account: accounts[0] })
  
      const networkId = await web3.eth.net.getId()
      const networkData = Nft.networks[networkId]
      if(networkData) {
        const abi = Nft.abi
        const address = networkData.address
        const contract = new web3.eth.Contract(abi, address)
        this.setState({ contract })
        const totalSupply = await contract.methods.totalSupply().call()
        this.setState({ totalSupply })
        // Load Colors
        for (var i = 1; i <= totalSupply; i++) {
          const color = await contract.methods.colors(i - 1).call()
          this.setState({
            colors: [...this.state.colors, color]
          })
        }
      } else {
        window.alert('Smart contract not deployed to detected network.')
      }
   };*/

   generateColor = () => {
      return `#${(Math.random() * 0xfffff * 1000000).toString(16).slice(0, 6)}`;
   };

   mint = (color: string) => {
      this.state.contract.methods.mint(color).send({ from: this.state.account })
      .once('receipt', (receipt: string) => {
        this.setState({
          colors: [...this.state.colors, color]
        })
      })
   };
  


   render() {
      return (
        <div>
          <div className="container-fluid mt-5">
            <div className="row">
              <main role="main" className="col-lg-12 d-flex text-center">
                <div className="content mr-auto ml-auto">
                  <h1>Issue Token</h1>
                  <form onSubmit={(event) => {
                    event.preventDefault()
                    const color = this.color?.value
                    color ? this.mint(color): this.mint(this.generateColor())
                  }}>
                    <input
                      type='text'
                      className='form-control mb-1'
                      placeholder='e.g. #FFFFFF'
                      ref={(input) => { this.color = input }}
                    />
                    <input
                      type='submit'
                      className='btn btn-block btn-primary'
                      value='MINT'
                    />
                  </form>
                </div>
              </main>
            </div>
            <hr/>
            <div className="row text-center">
              { this.state.colors.map((color, key) => {
                return(
                  <div key={key} className="col-md-3 mb-3">
                    <div className="token" style={{ backgroundColor: color.value }}></div>
                    <div>{color}</div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      );
}
}