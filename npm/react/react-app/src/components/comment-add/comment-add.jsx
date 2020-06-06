import React, {Component} from 'react'
import PropTypes from 'prop-types'

class CommentAdd extends Component {

    state = {
        username: '',
        content: ''
    }

    static propTypes = {
        addComment: PropTypes.func.isRequired
    }

    handleSubmit = () => {
        const comment = this.state
        if(comment.username&&comment.content) {
            const {addComment} = this.props
            addComment(comment)
            this.setState({username: '', content: ''})
        }else {
            alert("请填写作者及内容")
        }
    }

    handleUsername = (event) => {
        const username = event.target.value
        this.setState({username})
    }

    handleContent = (event) => {
        const content = event.target.value
        this.setState({content})
    }

    render() {

        const {username, content} = this.state

        return (
            <div className="col-md-4">
                <form className="form-horizontal">
                    <div className="form-group">
                        <label>用户名</label>
                        <input type="text" className="form-control" placeholder="用户名" value={username} onChange={this.handleUsername}/>
                    </div>
                    <div className="form-group">
                        <label>评论内容</label>
                        <textarea className="form-control" rows="6" placeholder="评论内容" value={content} onChange={this.handleContent}></textarea>
                    </div>
                    <div className="form-group">
                        <div className="col-sm-offset-2 col-sm-10">
                            <button type="button" className="btn btn-default pull-right" onClick={this.handleSubmit}>提交</button>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

export default CommentAdd