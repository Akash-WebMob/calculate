import './App.css';
import React, { useState } from "react"
import BN from 'bn.js';
import { Container, Row, Col ,Card,Form,InputGroup, Button} from "react-bootstrap";

function App() {

  const [amount,setAmount] = useState('');
  const [period,setPeriod] = useState('');
  const [rate,setRate] = useState('')
  const [tier,setTier] = useState('Blue');
  const [conversionRate,setConversionRate] = useState('')
  const [tokenMinted,setTokenMinted] = useState('')

  const [anchorRedeemAmount,setAnchorRedeemAmount] = useState('');
 


  const [redeemAmount,setRedeemAmount] = useState('');

  const calculateDailyRate = (rate) => {
    const temp = ((rate/100) + 1);
    const daily_rate =(Math.pow(temp,1/365)-1)*100;
    return daily_rate;
  }

  const deduct_tax = (amount) => {
    const DECIMAL_FRACTION = new BN("1000000000000000000");
    const tax = Math.min(
      amount -
      new BN(amount)
        .mul(DECIMAL_FRACTION)
        .div(DECIMAL_FRACTION.div(new BN(1000)).add(DECIMAL_FRACTION))
        .toNumber(),
      1000000
    );
    return amount - tax;
  }


  const handleCalculate = () => {

      const daily_rate = calculateDailyRate(rate)
      const actual_amount = deduct_tax(amount)

      const redeem_amount = actual_amount*Math.pow((1+ daily_rate/100),period)
      setRedeemAmount(redeem_amount)
      const anchorRate = 19.49;

      const daily_anchor_rate = calculateDailyRate(anchorRate)
      const anchor_redeem_amount =  actual_amount*Math.pow((1+ daily_anchor_rate/100),period)

      setAnchorRedeemAmount(anchor_redeem_amount)
      
      const conversion_rate = (1+ daily_rate/100)/(1 + daily_anchor_rate/100)

      setConversionRate(conversion_rate**365)

      setTokenMinted(actual_amount/(conversion_rate*1.222))

  }

 

  return (
    <div className="App-header">
    
        <Container className="py-5">
                            <Row className="my-1">
                                <Col md={8}>
                                   
                                    <h1 className="text-white font-weight-bold pb-3">
                                        Estimate your  Rewards/Interests in seconds!
                                    </h1>
                                    <h4>Assuming anchor rate (1 aUST = 1.222 UST) and APY = 19.49%</h4>
                                    <h6>daily_rate = ((annual rate)/100 +1)**(1/365) -1)*100</h6>
                                    <h6>actual_amount = amount_deposited - tax</h6>
                                    <h6>redeem_amount = actual_amount*Math.pow((1+ daily_rate/100),period)</h6>
                                    <h6>annual conversion_rate = ((1+ daily_rate/100)/(1 + daily_anchor_rate/100))**365</h6>
                                    <h6>token minted = actual_amount/(annual_conversion_rate*1.222)</h6>
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
                                        Annual Interest Rate
                                    </Form.Label>
                                    <br/>
                                    <Form.Control
                                        size="lg"
                                        type="number"
                                        placeholder={ `annual rate` }
                                        value={rate}
                                        onChange={(e)=>setRate(e.target.value)}
                                    />

                                </Form.Group>
                            </Form>
                            
                            <Button onClick={handleCalculate}>Calculate</Button>
                            <h3>Token Minted at time of deposit(Day 0) = {tokenMinted}</h3>
                            <h3>redeem_amount = {redeemAmount}</h3>
                            <h3>anchor_amount = {anchorRedeemAmount}</h3>
                            <h3>amount in pool = {anchorRedeemAmount-redeemAmount}</h3>
                            <h3>annual conversion_rate of {tier} = {conversionRate*1.222} UST</h3>
                        </Card>
                    </Col>
      </Row>
    </div>
  );
}

export default App;
