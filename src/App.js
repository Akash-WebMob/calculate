import './App.css';
import React, { useState } from "react"
//import BN from 'bn.js';
import { Container, Row, Col ,Card,Form,InputGroup, Button} from "react-bootstrap";

function App() {

  const [amount,setAmount] = useState('');
  const [dailyRate,setDailyRate] = useState('');
  const [anchorDailyRate,setAnchorDailyRate] = useState('');
  const [anchorRate,setAnchorRate] = useState('');

  const [period,setPeriod] = useState('');
  //const [rate,setRate] = useState('')
  const [tier,setTier] = useState('Blue');
  const [factor,setFactor] = useState('');

  const [tax,setTax] = useState('');

  const [conversionRate,setConversionRate] = useState('')
  const [dailyConversionRate,setDailyConversionRate] = useState('')

  const [tokenMinted,setTokenMinted] = useState('')

  const [anchorRedeemAmount,setAnchorRedeemAmount] = useState('');
 


  const [redeemAmount,setRedeemAmount] = useState('');

  const calculateDailyRate = (rate) => {
    const temp = ((rate/100) + 1);
    const daily_rate =(Math.pow(temp,1/365)-1)*100;
    return daily_rate;
  }

//   const deduct_tax = (amount) => {
//     const DECIMAL_FRACTION = new BN("1000000000000000000");
//     const tax = Math.min(
//       amount -
//       new BN(amount)
//         .mul(DECIMAL_FRACTION)
//         .div(DECIMAL_FRACTION.div(new BN(1000)).add(DECIMAL_FRACTION))
//         .toNumber(),
//       1000000
//     );
//     return amount - tax;
//   }

  // 1kbust = 0.99 aust
  // 1asut = 1.23 ust
  //1kbust = 0.99 *1.23 ust = 1.21
  //100/1.21 =


  const handleCalculate = () => {

      const daily_rate = calculateDailyRate(interestMap[tier])
      setDailyRate(daily_rate)
      const actual_amount = amount - tax //deduct_tax(amount)
      //console.log('actual',actual_amount)

      const redeem_amount = actual_amount*Math.pow((1+ daily_rate/100),period)
      setRedeemAmount(redeem_amount)

      const daily_anchor_rate = calculateDailyRate(anchorRate)
      setAnchorDailyRate(daily_anchor_rate)
      //console.log(daily_anchor_rate)
      const anchor_redeem_amount = actual_amount*Math.pow((1+ daily_anchor_rate/100),period)

      setAnchorRedeemAmount(anchor_redeem_amount)
      
      const conversion_rate = (1+ daily_rate/100)/(1 + daily_anchor_rate/100)
      setDailyConversionRate(conversion_rate)

      setConversionRate(conversion_rate**period)

      setTokenMinted(actual_amount/(conversion_rate*1.245171296747347647))

  }

  const interestMap = {
    'Blue': 10,
    'Gold': 12,
    'Emerald': 14,
    'Diamond': 16
  };


 

  return (
    <div className="App-header">
    
        <Container className="py-5">
                            <Row className="my-1">
                                <Col md={8}>
                                   
                                    <h1 >
                                        Estimate your  Rewards/Interests in seconds!
                                    </h1>
                                    <h5 style={{color : 'greenyellow'}}>daily_rate = ((annual rate)/100 +1)^(1/365) -1)*100</h5>
                                    <h5>actual_amount = amount_deposited - tax</h5>
                                    <h5 style={{color : 'cyan'}}>redeem_amount = actual_amount*[(1+ daily_rate/100)^period]</h5>
                                    <h5>conversion_rate = [(1+ daily_rate/100)/(1 + daily_anchor_rate/100)]^period</h5>
                                    <h5>conversion_factor = aUST to Ust</h5>
                                    <h5 style={{color : 'orange'}}>token minted = actual_amount/(conversion_rate*(conversion_factor))</h5>
                                </Col>
                            </Row>
          </Container>
    
      <Row>
      <Col md="6">
                        <Card>
                            <Form>
                                <h4>Assumed Parameters :</h4>
                                <Form.Group controlId="timePeriod">
                                    <Form.Label className="lead font-weight-bold">
                                        Tax 
                                    </Form.Label>
                                    <br/>
                                    <Form.Control
                                        size="lg"
                                        type="number"
                                        placeholder={ `Tax` }
                                        value={tax}
                                        onChange={(e)=>setTax(e.target.value)}
                                    />
                                   
                                </Form.Group>
                                <Form.Group controlId="timePeriod">
                                    <Form.Label className="lead font-weight-bold">
                                        Conversion Factor
                                    </Form.Label>
                                    <br/>
                                    <Form.Control
                                        size="lg"
                                        type="number"
                                        placeholder={ `conversion factor` }
                                        value={factor}
                                        onChange={(e)=>setFactor(e.target.value)}
                                    />
                                   
                                </Form.Group>
                                <Form.Group controlId="timePeriod">
                                    <Form.Label className="lead font-weight-bold">
                                        Annual Anchor Rate
                                    </Form.Label>
                                    <br/>
                                    <Form.Control
                                        size="lg"
                                        type="number"
                                        placeholder={ `annual rate` }
                                        value={anchorRate}
                                        onChange={(e)=>setAnchorRate(e.target.value)}

                                    />

                                </Form.Group>
                                <h4>Actual Parameters : </h4>
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
                                        value={interestMap[tier]}
                                        //onChange={(e)=>setRate(e.target.value)}
                                        disabled

                                    />

                                </Form.Group>
                                
                            </Form>
                            
                            <Button onClick={handleCalculate}>Calculate</Button>
                            <h5>Daily Rate = {dailyRate}</h5>
                            <h5>Anchor Daily Rate = {anchorDailyRate}</h5>
                            <h5>Daily Conversion Rate of {tier} =  {dailyConversionRate}</h5>
                            <h3>Token Minted at time of deposit(Day 0) = {tokenMinted}</h3>
                            <h3>redeem_amount = {redeemAmount}</h3>
                            <h3>anchor_amount = {anchorRedeemAmount}</h3>
                            <h3>amount in pool = {anchorRedeemAmount-redeemAmount}</h3>
                            <h3>Conversion Rate of {tier} at end of {period} days = {conversionRate*factor} UST</h3>
                        </Card>
                    </Col>
      </Row>
    </div>
  );
}

export default App;
