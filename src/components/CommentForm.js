import React, { Component } from 'react';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Row, Button, Modal, ModalHeader, ModalBody, Input, Col } from 'reactstrap'

const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);

export default class CommentForm extends Component {
  
  constructor(props) {
    super(props)
    this.state = {
      isModalOpen: false
    }
    this.toggleModal = this.toggleModal.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  toggleModal() {
    this.setState({
      isModalOpen: !this.state.isModalOpen
    })
  }

  handleSubmit(values) {
    this.props.addComment(this.props.dishId, values.rating, values.name, values.comment)
    this.toggleModal()
    // event.preventDefault();
  }

  render() {
    return(
      <div>
        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
            <ModalBody>
              <LocalForm onSubmit={(values) => this.handleSubmit(values)} >
                <p>Rating</p>
                <Col>
                  <Row className='form-group'> 
                    <Control.select model='.rating' name='rating' id='rating' className='form-control'>
                      <option>1</option>
                      <option>2</option>
                      <option>3</option>    
                      <option>4</option>
                      <option>5</option>
                    </Control.select>
                  </Row>
                </Col>

                <p>Your Name</p>
                <Col>
                  <Row className='form-group'>
                    <Control.text model='.name' name='name' id='name' placeholder='Your Name' className='form-control' validators={{
                      minLength: minLength(3),
                      maxLength: maxLength(15),
                    }} />
                    <Errors 
                      className='text-danger'
                      model='.name'
                      show='touched'
                      messages={{
                        minLength: 'Must be greater than 2 characters long',
                        maxLength: 'Mush be 15 characters or less',
                      }}
                    />
                  </Row>
                </Col>

                <p>Comment</p>
                <Col>
                  <Row className='form-group'>
                    <Control.textarea model='.comment' name='comment' id='comment' rows='6' className='form-control' />
                  </Row>
                </Col>

                <Col>
                  <Row className="form-group">
                    <Button type="submit" value='submit' color="primary">
                      Submit
                    </Button>
                  </Row>
                </Col>
              </LocalForm>
          </ModalBody>
  
        </Modal>
        <Button outline onClick={this.toggleModal}>  <span className='fa fa-pencil fa-lg'></span>Submit Comment</Button>
      </div>
    )

  }
}