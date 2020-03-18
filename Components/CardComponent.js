import React, { Component } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Card, CardItem, Thumbnail, Body, Left, Right, Button, Icon } from 'native-base';

export default class CardComponent extends Component {
    render(){

        const { data } = this.props;
        const { image } = JSON.parse(data.json_metadata);
        
        return (
            <Card>
                <CardItem>
                    <Left>
                        <Thumbnail source={{uri:`https://steemitimages.com/u/${data.author}/avatar`}}/>
                        <Body>
                            <Text>{data.author}</Text>
                            <Text>{new Date(data.created).toDateString()}</Text>
                        </Body>
                    </Left>
                </CardItem>
                {
                    image && image.length ?
                    <CardItem cardBody>
                        <Image
                            source={{uri: image[0] }}
                            style={{height:200, width:null, flex:1}}
                        />
                    </CardItem> : null
                }
                <CardItem style={{height:20}}>
                    <Text>{data.active_votes.length} likes</Text>
                </CardItem>
                <CardItem>
                    <Text>
                        <Text style={{fontWeight: '900'}}>{data.title}</Text>
                    </Text>
                </CardItem>
                <CardItem>
                    <Text>
                        <Text>{data.body.replace(/\n/g,' ').slice(0, 200)}</Text>
                    </Text>
                </CardItem>
                <CardItem style={{height:45}}>
                    <Left>
                        <Button transparent>
                            <Icon name='ios-heart' style={{color:'#000', marginRight: 5}} />
                            <Text>{data.active_votes.length}</Text>
                        </Button>
                        <Button transparent>
                            <Icon name='ios-chatbubbles' style={{color:'#000', marginRight: 5}} />
                            <Text>{data.children}</Text>
                        </Button>
                        <Button transparent>
                            <Icon name='ios-send' style={{color:'#000'}} />
                        </Button>
                    </Left>
                    <Right>
                        <Text>{data.pending_payout_value}</Text>
                    </Right>
                </CardItem>
            </Card>
        );
    }
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        alignContent: "center",
        justifyContent: "center"
    }
})