import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Icon, Container, Content, Thumbnail, Header, Left, Right, Body } from 'native-base';
import CardComponent from '../Components/CardComponent';
 
export default class HomeTab extends Component {

    state = {
        feeds: [],
        followings: []
    }

    UNSAFE_componentWillMount(){
        this.fetchFeeds().then(feeds => {
            this.setState({
                feeds
            })
        });

        this.fetchFollowing().then(followings => {
            this.setState({
                followings
            })
        })
    }

    fetchFeeds() {
        const data = {
            id: 1,
            jsonrpc: "2.0",
            method: "call",
            params: [
              "database_api",
              "get_discussions_by_created",
              [{ tag: "kr", limit: 20 }]
            ]
        };
        return fetch('https://api.steemit.com', {
            method: 'POST',
            body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(res => res.result)
    }

    fetchFollowing(){
        const data = {
            id: 2,
            jsonrpc: "2.0",
            method: "call",
            params: [
                "follow_api",
                "get_following",
                ["anpigon","","blog",10]
            ]
        };
        return fetch('https://api.steemit.com',
        {
            method: 'POST',
            body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(res => res.result.map(({following}) => following))
    }

    static navigationOptions = {
        tabBarIcon: ({ tintColor }) => (
            <Icon name="ios-home" style={{color:tintColor}}/>
        )
    }

    render() {
        return (
            <Container style={style.container}>
                <Header style={{backgroundColor:'#fff', justifyContent:"center", alignContent:"center"}}>
                    <Left><Icon name='ios-camera' style={{paddingLeft:10}}/></Left>
                    <Body><Text>Instagram</Text></Body>
                    <Right><Icon name='ios-send' style={{paddingRight:10}}/></Right>
                </Header>
                <Content>
                    <View style={{height:50}}>
                        <View style={{flex:1, flexDirection: 'row', justifyContent: 'space-between', alignItems:'center', paddingHorizontal:7}}>
                            <Text style={{fontWeight:'bold'}}>Stories</Text>
                            <View style={{flexDirection:'row', alignItems:'center'}}>
                                <Icon name="md-play" style={{fontSize:14}}></Icon>
                                <Text style={{fontWeight:'bold'}}>Watch All</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{flex:3}}>
                        <ScrollView
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={{
                                alignItems:'center',
                                paddingStart:5,
                                paddingEnd:5
                            }}>
                            {
                                this.state.followings.map(following => <Thumbnail
                                style={style.thumbnail}
                                source={{uri:`https://steemitimages.com/u/${following}/avatar`}}/>)
                            }
                        </ScrollView>
                    </View>
                    {
                        this.state.feeds.map((feed, index) => <CardComponent data={feed} key={index}/>)
                    }
                </Content>
            </Container>
        );
    }
}
 
const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    thumbnail: {
        marginHorizontal: 5,
        borderColor: 'pink',
        borderWidth: 2
    }
});