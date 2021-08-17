import React from 'react';
import { Card, Button, Container, Col, Row } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import './SearchResultsCard.css';

export default function SearchResultsCard(props) {

    const { productId, name, imageUrl, setName, url, marketPrice, lowPrice, foilMarketPrice, foilLowPrice } = props.searchResult;

    const dispatch = useDispatch();

    const addToBuylist = (productId) => {
        dispatch({ type: 'ADD_TO_BUYLIST', payload: productId });
    }


    return (
        <Card className='card-card'>
            <Card.Title className='card-title'>
                <a href={url} target="_blank" rel="noopener noreferrer">{name} </a>
            </Card.Title>
            <Container>
                <Row>
                    <Col className="card-image-col" xs={4}>
                        <img className="card-image" src={imageUrl} alt={name} />
                    </Col>
                    <Col xs={8}>
                        <Card.Body className="card-body">
                            <Card.Text>
                                <b>{setName}</b>
                            </Card.Text>
                            <Card.Text>
                                Low Price: {lowPrice}
                            </Card.Text>
                            <Card.Text>
                                Market Price: {marketPrice}
                            </Card.Text>
                            <Card.Text>
                                Foil Low Price: {foilLowPrice}
                            </Card.Text>
                            <Card.Text>
                                Foil Market Price: {foilMarketPrice}
                            </Card.Text>
                            <Button variant="primary" onClick={() => {
                                addToBuylist(productId)
                            }
                            }>Add to Buylist</Button>
                        </Card.Body>
                    </Col>
                </Row>
            </Container>
        </Card>
    )
}
