import React from 'react'
import { Modal } from 'react-bootstrap'
import CommentGIFs from './CommentGIFs'
import '../components/Grid.css'

const GIFModal = (props) => {
    return (
        <Modal
            {...props}
            //show={props.modalShow}
            // onHide={props.onHide}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    GIF Search
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <CommentGIFs
                    {...props}
                    // modalShow={this.props.modalShow}
                    // setModalShow={this.props.setModalShow}
                    // gifURL={this.props.gifURL}
                    // setgifURL={this.props.setgifURL}
                />
            </Modal.Body>
            {/* <Modal.Footer>
            <Button onClick={props.onHide}>Close</Button>
          </Modal.Footer> */}
        </Modal>
    )
}

export default GIFModal
