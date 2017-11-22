"use strict"
import React from "react"
import {Row, Well, Label, Col, Image, Panel} from "react-bootstrap";

class About extends React.Component{


  render(){

    return(
        <div>
          < Col xs={10} className="about-main">
            <Row>
              <Well>
                <h3>Om</h3>
              </Well>
            </Row>
            <Row>
              <Col xs ={6} sm={6} >
                <Well>
                  <p>Detta är en portal för webföreläsningar. Om du inte är registerad så kan du börja med att skapa ett konto. När du sedan loggar in på detta konto har du möjlighet att gå våra webföreläsningar! </p>
                  <br/>
                  <br/>
                  <p>Under profil kan du se dina framsteg; vilka föreläsningar du har gjort och hur långt du har kommit på påbörjade föreläsningar. </p>
                  <br/>
                  <br/>
                  <p>Som administrationsbehörig kan du dessutom skapa egna föreläsningar! Detta görs under filken skapa föreläsning. </p>
                  <br/>
                  <br/>
                  <p>Som supervisor kan du följa dina användares framgångar  </p>
                </Well>
              </Col>
              <Col xs={12} sm={6}>
                <Well>
                  <Image src="/images/ladda ned.jpeg" width="100%" />
                </Well>
              </Col>
            </Row>
          </Col>
        </div>
    )
  }
}


export default About;
