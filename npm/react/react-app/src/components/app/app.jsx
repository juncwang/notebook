import React, {Component} from "react";

import CommentAdd from "../comment-add/comment-add";
import CommentList from "../comment-list/comment-list";

class App extends Component {

    state = {
        comments: [
            {
                username: 'Tom',
                content: 'react 挺好的'
            },
            {
                username: 'Tom',
                content: 'react 挺好的'
            },
            {
                username: 'Tom',
                content: 'react 挺好的'
            },
        ]
    }

    // 添加评论
    addComment = (comment) => {
        const {comments} = this.state
        comments.unshift(comment)
        this.setState({comments})
    }

    // 删除评论
    deleteComment = (index) => {
        const {comments} = this.state
        comments.splice(index, 1)
        this.setState({comments})
    }

    render() {

        const {comments} = this.state
        const addComment = this.addComment
        const deleteComment = this.deleteComment

        return (
            <div>
                <header className="site-header jumbotron">
                    <div className="container">
                        <div className="row">
                            <div className="col-xs-12">
                                <h1>请发表对React的评论</h1>
                            </div>
                        </div>
                    </div>
                </header>
                <div className="container">
                    <CommentAdd addComment={addComment}/>
                    <CommentList comments={comments} deleteComment={deleteComment}/>
                </div>
            </div>
        )
    }
}

export default App