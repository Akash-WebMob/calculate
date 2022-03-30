import logo from './logo.svg';
import './App.css';
import React, { useState } from "react"
import { Container, Row, Col ,Card,Form,InputGroup, Button} from "react-bootstrap";

function App() {

  const [amount,setAmount] = useState('');
  const [period,setPeriod] = useState('');
  const [rate,setRate] = useState('');
  const [tier,setTier] = useState('');


  const [redeemAmount,setRedeemAmount] = useState('');


  const handleCalculate = () => {
    const anchorRate = 19.54;
    const x= amount*period;
    setRedeemAmount(x)
  }

  return (
    <div className="App-header">
    
        <Container className="py-5">
                            <Row className="my-1">
                                <Col md={8}>
                                   
                                    <h1 className="text-white font-weight-bold pb-3">
                                        Estimate your Yieldly rewards in seconds!
                                    </h1>
                                    <h4>Assuming anchor rate (1 aUST = 1.22 UST)</h4>
                                </Col>
                            </Row>
          </Container>
    
      <Row>
      <Col md="6">
                        <Card>
                            <Form>
                                <Form.Group controlId="tickets">
                                    <Form.Label 
                                        className="lead font-weight-bold">
                                        Amount Deposited
                                    </Form.Label>
                                    <InputGroup className="mb-2">
                                       
                                        <Form.Control
                                            size="lg"
                                            type="number"
                                            placeholder={ `Amount Deposited` }
                                            value ={amount}
                                            onChange={(e)=> setAmount(e.target.value)}
                                        />
                                    </InputGroup>
                                </Form.Group>
                                <Form.Group controlId="timePeriod">
                                    <Form.Label className="lead font-weight-bold">
                                        Time period in Days
                                    </Form.Label>
                                    <br/>
                                    <Form.Control
                                        size="lg"
                                        type="number"
                                        placeholder={ `Time period` }
                                        value={period}
                                        onChange={(e)=>setPeriod(e.target.value)}
                                    />
                                   
                                </Form.Group>
                                <select onChange={(e)=>setTier(e.target.value)}>
                                  <option value="Blue" >Blue</option>
                                  <option value="Gold">Gold</option>
                                  <option value="Emerald">Emerald</option>
                                  <option value="Diamond">Diamond</option>

                                </select>
                                <br/>
                                <Form.Group controlId="timePeriod">
                                    <Form.Label className="lead font-weight-bold">
                                        Interest Rate
                                    </Form.Label>
                                    <br/>
                                   {tier==="Blue" ? <h3>10%</h3>:<></>}
                                   {tier==="Gold" ? <h3>12%</h3>:<></>}
                                   {tier==="Emerald" ? <h3>14%</h3>:<></>}
                                   {tier==="Diamond" ? <h3>16%</h3>:<></>}
                                </Form.Group>
                            </Form>
                            
                            <Button onClick={handleCalculate}>Calculate</Button>
                            
                        </Card>
                    </Col>
      </Row>
    </div>
  );
}

export default App;
