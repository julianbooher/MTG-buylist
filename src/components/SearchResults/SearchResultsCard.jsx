import React from 'react';
import { Card, Button } from 'react-bootstrap';
import './SearchResultsCard.css';

export default function SearchResultsCard(props) {

    const { productId, name, imageUrl, setName, url, marketPrice, lowPrice, foilMarketPrice, foilLowPrice } = props.searchResult;


    return (
        <Card className='card-card'>
            <Card.Title className='card-title'>
                <a href={url} target="_blank">{name}</a>
            </Card.Title>
            <Card.Img className='card-image' variant="top" src={imageUrl} />
            <Card.Body>
                <Card.Text>
                    Set: {setName}
                </Card.Text>
                <Card.Text>
                    Market Price: {marketPrice}
                </Card.Text>
                <Card.Text>
                    Foil Market Price: {foilMarketPrice}
                </Card.Text>
                <Card.Text>
                    Low Price: {lowPrice}
                </Card.Text>
                <Card.Text>
                    Foil Low Price: {foilLowPrice}
                </Card.Text>
                <Button variant="primary">Add to Buylist</Button>
            </Card.Body>
        </Card>
    )
}
