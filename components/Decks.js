import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { connect } from 'react-redux';
import DeckRow from './DeckRow';
import { fetchInitData } from '../actions/shared';

class Decks extends React.Component {
    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(fetchInitData());
    }

    onRowPressed = (rowId) => {
        this.props.navigation.navigate('deckDetails', {
            deckId: rowId
        });
    }

    _renderItem = ({ item }) => {
        const { decks } = this.props;
        return <DeckRow key={item} deck={decks[item]} onRowPressed={this.onRowPressed}></DeckRow>
    };

    render() {
        const { decks } = this.props;
        return  (
            <FlatList
                data={Object.keys(decks)}
                renderItem={this._renderItem}
                keyExtractor={(item, index) => `${item}`}
            >
                <Text>Decks view</Text>
            </FlatList>
        );
    }
}

const mapStateToProps = ({decks}) => {
    return {
        decks
    }
};
export default connect(mapStateToProps)(Decks);