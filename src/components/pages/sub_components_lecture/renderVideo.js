import React from "react";
import {Row, Media, Well, Col} from "react-bootstrap";

class RenderVideo extends React.Component{

  handleEndedVideo(){
    console.log("video ended")
  }

render(){
  return(
    <Media>
      <Row>
        <Col xs={12}>
          <Well>
            <video width="100%" controls onEnded={this.handleEndedVideo.bind(this)}>
              <source src={this.props.videoUrl} type="video/mp4"/>
            </video>
          </Well>
        </Col>
      </Row>
    </Media>)
}

handleEndedVideo(){
  console.log("video has ended")
}

}


export default RenderVideo;
