class Comment extends React.Component {
	render() {
		return (
			<div>
				<div className="comment-body">
					{this.props.children}
				</div>
				<div className="comment-author">
					- {this.props.author}
				</div>
			</div>
		)
	}
}

class CommentList extends React.Component {
	render() {
		//迭代时指明一个唯一的可以，这样执行会更加高效
		var commentsNode = this.props.comments.map(function(comment, index) {
			return <Comment key={"comment-" + index} author={comment.author}>{comment.body}</Comment>
		}); 	
		return (
			<div className="comment-list">
				{commentsNode}	
			</div>		
		)
	}
}

class CommentForm extends React.Component {
	handleSubmit(e) {
		e.preventDefault();
		const author = this.refs.author.getDOMNode().value.trim();
		const body = this.refs.body.getDOMNode().value.trim();
		const form = this.refs.form.getDOMNode();

		this.props.onSubmit({author: author, body: body});	
		form.reset();
		// 输出this对象和当前触发事件
		// console.log(this, e);
	}
	render() {
		return (
			<form className="comment-form" ref="form" onSubmit={e => this.handleSubmit(e)}>
				<input type="text" placeholder="Your name" ref="author"/>
				<input type="text" placeholder="Input your comment" ref="body"/>
				<input type="submit" value="Add Comment"/> 
			</form>		
		)
	}
}


class CommendBox extends React.Component {

	constructor(props) {
		super();
		this.state = {
			comments: props.comments || []
		};
	}

	leadDataFromServer() {
		$.ajax({
			url: this.props.url,
			dataType: "json",
			// success: function(comments) {
			// 	// 这里的this应该是react组件对象，所以下边用bind重新指向this
			// 	this.setState({comments: comments});
			// }.bind(this)
			
			// 这里使用箭头函数后，里边的this就同上边bind的this了。当只有一个形参时，括号可以省去，如下边comments。
			success: comments => {
				this.setState({comments: comments});
			},
			error: (xhr, status, err) => {
				console.log(err.toString());
			}
		});
	}

	componentDidMount() {
		this.leadDataFromServer();
	}

	handleNewComment(comment) {
		
		/**
		 * 先假设ajax请求成功 在请求前我们自己渲染，然后等渲染后重复渲染。
		 * 根据react的渲染方式，请求成功后存在的内容是不会再次渲染的，这样就不用加转转转什么的了，很好的提高了交互速率。
		 * @type {[type]}
		 */
		const comments = this.state.comments;
		const newComments = comments.concat([comment]);
		this.setState({comments: newComments});

		setTimeout(() => {
			$.ajax({
				url: this.props.url,
				dataType: "json",
				type: "POST",
				data: comment,
				success: comments => {
					this.setState({comments: comments});	
				},
				error: (xhr, status, err) => {
					console.log(err.toString());

					//失败后回滚到之前的状态，但是速度有点慢啊
					this.setState({comments: comments});
				}
			});
		}, 2000);
		
	}
 	render() {
 		return (
 			<div className="comment-box">
 				<h1>Comments!</h1>
 				<CommentList comments={this.state.comments}/>
 				<CommentForm onSubmit={(comment) => this.handleNewComment(comment)}/>
	 		</div>
 		);
 	}
 }

 box = React.render(
 	<CommendBox url="comments.json"/>,
 	document.getElementById('content')
 );
