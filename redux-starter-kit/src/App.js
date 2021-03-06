import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as counterActions from "./modules/counter";


class App extends Component {
    
    componentDidMount() {
        const {number} = this.props;
        this.getPost(number)
    }

    componentWillReceiveProps(nextProps) {
        if(this.props.number !== nextProps.number ) {
            this.getPost(nextProps.number)
        }
    }

    getPost = async (id) => {
        const {PostActions} = this.props;

        try {
            await PostActions.getPost(id);
            console.log('요청이 완료된 다음 시작')
        } catch(e) {
            console.log('에러발생',e)
        }
    }

    render() {
        const { CounterActions, number, loading, error, post, } = this.props;
        
        return (
            <div>
                <h1>{number}</h1>
                <button onClick={() => CounterActions.incrementAsync()}>+</button>
                <button onClick={() => CounterActions.decrementAsync()}>-</button>
                {/* {
                    loading &&
                    <h2>로딩중</h2>
                }
                {
                    error ?
                            <h1>에러발생</h1>
                        :
                            <div>
                                <div>
                                    <h1>{post.title}</h1>
                                    <h1>{post.data}</h1>
                                </div>
                            </div>
                        
                } */}
            </div>
        );
    }
}

export default connect(
    (state) => ({
        number: state.counter,
        // post: state.post.data
    }),
    (dispatch) => ({
        CounterActions: bindActionCreators(counterActions, dispatch)
    })
)(App);