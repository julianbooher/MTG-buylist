import React from 'react';
import { Card, Button } from 'react-bootstrap';
import './SearchResultsCard.css';

export default function SearchResultsCard(props) {

    const { productId, cleanName, imageUrl, setName, url, marketPrice, lowPrice, foilMarketPrice, foilLowPrice } = props.searchResult;


    return (
        <Card style={{ width: '18rem' }}>
            <Card.Img className='card-image' variant="top" src={imageUrl} />
            <Card.Body>
                <Card.Title>{cleanName}</Card.Title>
                <Card.Text>
                    <p><b>Set: </b>{setName}</p>
                    <p><b>Market Price: </b>{marketPrice}</p>
                    <p><b>Foil Market Price:</b> {foilMarketPrice}</p>
                    <p><b>Low Price:</b> {lowPrice}</p>
                    <p><b>Foil Low Price:</b> {foilLowPrice}</p>
                </Card.Text>
                <Button variant="primary">Add to Buylist</Button>
            </Card.Body>
        </Card>
    )
}
